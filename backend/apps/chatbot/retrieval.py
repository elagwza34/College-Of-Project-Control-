"""Bounded local retrieval. Only staff-published sources enter the model context."""
import math
import re
from collections import Counter
from django.core.cache import cache
from django.db.models import Count, Max
from .models import KnowledgeSource

STOP = set('a an the of for and or to in on at is are was be it i my me we you your can do does how what which with have has this that about please tell would like'.split())
INDEX_CACHE_KEY = 'chatbot:knowledge-index:v1'
INDEX_CACHE_TTL = 900


def terms(text):
    text = text.lower().replace('l4', 'level 4').replace('l6', 'level 6')
    text = re.sub(r'\b(fees?|costs?|funded|funding|pay|payment)\b', ' funding ', text)
    text = re.sub(r'\b(eligible|eligibility|qualify|qualification|requirements?)\b', ' eligibility ', text)
    text = re.sub(r'\b(book|booking|consultation|adviser|advisor|appointment)\b', ' consultation ', text)
    return [word for word in re.findall(r'[a-z0-9]+', text) if word not in STOP]


def _index_signature():
    """Cheap fingerprint of the published knowledge set.

    Two aggregate columns are enough to detect any add, remove or edit, so a stale
    index is only ever possible inside one request, never across two.
    """
    row = KnowledgeSource.objects.filter(is_active=True).aggregate(
        total=Count('id'), newest=Max('updated_at')
    )
    return (row['total'], row['newest'].isoformat() if row['newest'] else '')


def _build_index():
    index = []
    for source in KnowledgeSource.objects.filter(is_active=True).order_by('pk').iterator():
        words = source.content.split()
        for start in range(0, len(words), 180):
            text = ' '.join(words[start:start + 240])
            tokens = Counter(terms(source.title + ' ' + text))
            index.append({'pk': source.pk, 'title': source.title,
                          'path': source.reference_path, 'text': text, 'tokens': dict(tokens)})
    return index


def knowledge_index():
    """Return the tokenised knowledge chunks, rebuilding only when the set changes.

    Previously every chat message re-read and re-tokenised every active source, so the
    cost of one question grew linearly with the size of the knowledge base.
    """
    signature = _index_signature()
    cached = cache.get(INDEX_CACHE_KEY)
    if cached and cached['signature'] == signature:
        return cached['index']
    index = _build_index()
    cache.set(INDEX_CACHE_KEY, {'signature': signature, 'index': index}, INDEX_CACHE_TTL)
    return index


def retrieve(message, history, limit=7):
    chunks = knowledge_index()
    if not chunks:
        return []
    query = Counter(terms(message))
    # User history helps resolve follow-up questions; assistant claims are not evidence.
    for turn in history[-4:]:
        if turn['role'] == 'user':
            for token in set(terms(turn['content'])):
                query[token] += 0.25
    frequencies = Counter()
    for chunk in chunks:
        frequencies.update(chunk['tokens'])
    for chunk in chunks:
        length = sum(chunk['tokens'].values())
        chunk['score'] = sum(weight * math.log(1 + len(chunks) / frequencies[token]) *
                             (chunk['tokens'][token] / (chunk['tokens'][token] + 1.2 * (0.25 + 0.75 * length / 200)))
                             for token, weight in query.items() if token in chunk['tokens'])
    ranked = sorted(chunks, key=lambda item: item['score'], reverse=True)
    selected, counts = [], Counter()
    for chunk in ranked:
        pk = chunk['pk']
        if chunk['score'] <= 0 or counts[pk] >= 2:
            continue
        selected.append({'id': str(len(selected) + 1), 'title': chunk['title'],
                         'path': chunk['path'], 'text': chunk['text']})
        counts[pk] += 1
        if len(selected) == limit:
            break
    return selected

