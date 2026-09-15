"""Bounded local retrieval. Only staff-published sources enter the model context."""
import math
import re
from collections import Counter
from .models import KnowledgeSource

STOP = set('a an the of for and or to in on at is are was be it i my me we you your can do does how what which with have has this that about please tell would like'.split())


def terms(text):
    text = text.lower().replace('l4', 'level 4').replace('l6', 'level 6')
    text = re.sub(r'\b(fees?|costs?|funded|funding|pay|payment)\b', ' funding ', text)
    text = re.sub(r'\b(eligible|eligibility|qualify|qualification|requirements?)\b', ' eligibility ', text)
    text = re.sub(r'\b(book|booking|consultation|adviser|advisor|appointment)\b', ' consultation ', text)
    return [word for word in re.findall(r'[a-z0-9]+', text) if word not in STOP]


def retrieve(message, history, limit=7):
    chunks = []
    for source in KnowledgeSource.objects.filter(is_active=True).iterator():
        words = source.content.split()
        for start in range(0, len(words), 180):
            text = ' '.join(words[start:start + 240])
            tokens = Counter(terms(source.title + ' ' + text))
            chunks.append({'source': source, 'text': text, 'tokens': tokens})
    if not chunks:
        return []
    query = Counter(terms(message))
    # User history helps resolve follow-up questions; assistant claims are not evidence.
    for turn in history[-4:]:
        if turn['role'] == 'user':
            for token in set(terms(turn['content'])):
                query[token] += 0.25
    frequencies = Counter(token for chunk in chunks for token in chunk['tokens'])
    for chunk in chunks:
        length = sum(chunk['tokens'].values())
        chunk['score'] = sum(weight * math.log(1 + len(chunks) / frequencies[token]) *
                             (chunk['tokens'][token] / (chunk['tokens'][token] + 1.2 * (0.25 + 0.75 * length / 200)))
                             for token, weight in query.items() if token in chunk['tokens'])
    ranked = sorted(chunks, key=lambda item: item['score'], reverse=True)
    selected, counts = [], Counter()
    for chunk in ranked:
        pk = chunk['source'].pk
        if chunk['score'] <= 0 or counts[pk] >= 2:
            continue
        selected.append({'id': str(len(selected) + 1), 'title': chunk['source'].title,
                         'path': chunk['source'].reference_path, 'text': chunk['text']})
        counts[pk] += 1
        if len(selected) == limit:
            break
    return selected

