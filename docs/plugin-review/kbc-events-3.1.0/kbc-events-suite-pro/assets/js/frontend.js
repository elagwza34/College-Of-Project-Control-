function kbcEventsSuiteSafeQueryAll(selector, context) {
    if (!selector) return [];

    try {
        return Array.prototype.slice.call((context || document).querySelectorAll(selector));
    } catch (e) {
        return [];
    }
}

function kbcEventsSuiteNormalisePath(url) {
    if (!url) return '';

    try {
        var parsed = new URL(url, window.location.href);
        return parsed.pathname.replace(/\/+$/, '') || '/';
    } catch (e) {
        return '';
    }
}


function kbcEventsSuitePublicEventMap() {
    if (window.KBCEventsSuitePublicEvents) {
        return window.KBCEventsSuitePublicEvents;
    }

    if (window.KBCEventsSuiteElementorController && window.KBCEventsSuiteElementorController.eventTimingOverrides) {
        return window.KBCEventsSuiteElementorController.eventTimingOverrides;
    }

    return { events: {}, byPath: {} };
}

function kbcEventsSuiteParseTermList(value) {
    return String(value || '').split(/[\s,|]+/).map(function (term) {
        return term.trim().toLowerCase();
    }).filter(Boolean).filter(function (term, index, list) {
        return list.indexOf(term) === index;
    });
}

function kbcEventsSuiteEventTermSlugs(eventData, taxonomy) {
    if (!eventData) return [];
    var taxonomies = eventData.taxonomies || {};
    if (taxonomy && taxonomies[taxonomy]) return taxonomies[taxonomy] || [];
    return eventData.terms || [];
}

function kbcEventsSuiteCardTermSlugs(card, taxonomy, eventData) {
    var slugs = kbcEventsSuiteEventTermSlugs(eventData, taxonomy).slice(0);
    var attrTerms = kbcEventsSuiteParseTermList(card.getAttribute('data-event-categories') || card.getAttribute('data-kbc-terms'));
    attrTerms.forEach(function (term) {
        if (slugs.indexOf(term) === -1) slugs.push(term);
    });

    (card.getAttribute('class') || '').split(/\s+/).forEach(function (className) {
        className = className.toLowerCase();
        if (className && slugs.indexOf(className) === -1) slugs.push(className);
    });

    return slugs;
}

function kbcEventsSuiteCardMatchesRequiredTerms(card, filters, eventData) {
    var required = kbcEventsSuiteParseTermList(filters ? filters.getAttribute('data-terms') : '');
    if (!required.length) return true;

    var taxonomy = filters ? (filters.getAttribute('data-taxonomy') || '') : '';
    var slugs = kbcEventsSuiteCardTermSlugs(card, taxonomy, eventData);

    return required.some(function (term) {
        return slugs.indexOf(term) !== -1;
    });
}

function kbcEventsSuiteResolveLoopEvent(card) {
    var map = kbcEventsSuitePublicEventMap();
    var events = map.events || {};
    var byPath = map.byPath || {};
    var id = card.getAttribute('data-kbc-event-id') || '';

    if (!id) {
        var className = card.getAttribute('class') || '';
        var classMatch = className.match(/(?:e-loop-item-|post-)(\d+)/);
        if (classMatch) id = classMatch[1];
    }

    if (id && events[String(id)]) {
        return events[String(id)];
    }

    var anchors = kbcEventsSuiteSafeQueryAll('a[href]', card);
    for (var i = 0; i < anchors.length; i++) {
        var path = kbcEventsSuiteNormalisePath(anchors[i].getAttribute('href'));
        var mappedId = path && byPath[path] ? String(byPath[path]) : '';
        if (mappedId && events[mappedId]) {
            card.setAttribute('data-kbc-event-id', mappedId);
            return events[mappedId];
        }
    }

    return null;
}

function kbcEventsSuiteGetLoopCards(filters) {
    var cardSelector = filters.getAttribute('data-card-selector') || '.e-loop-item, .elementor-loop-item';
    var targetSelector = filters.getAttribute('data-target-selector') || '';
    var cards = [];

    if (targetSelector) {
        kbcEventsSuiteSafeQueryAll(targetSelector, document).forEach(function (target) {
            cards = cards.concat(kbcEventsSuiteSafeQueryAll(cardSelector, target));
        });

        return cards.filter(function (card, index) {
            return cards.indexOf(card) === index;
        });
    }

    var root = filters.parentElement;
    while (root && root !== document.body) {
        cards = kbcEventsSuiteSafeQueryAll(cardSelector, root).filter(function (card) {
            return !filters.contains(card);
        });

        if (cards.length) return cards;
        root = root.parentElement;
    }

    return kbcEventsSuiteSafeQueryAll(cardSelector, document);
}

function kbcEventsSuiteGetLoopCardDateState(card) {
    var explicit = card.getAttribute('data-kbc-date-state');
    if (explicit === 'ended' || explicit === 'upcoming') return explicit;

    var eventData = kbcEventsSuiteResolveLoopEvent(card);
    if (eventData && (eventData.dateState === 'ended' || eventData.dateState === 'upcoming')) {
        card.setAttribute('data-kbc-date-state', eventData.dateState);
        return eventData.dateState;
    }

    /* Server state is authoritative; never recalculate with the visitor timezone. */
    return card.getAttribute('data-event-state') === 'ended' ? 'ended' : 'upcoming';
}

function kbcEventsSuiteGetLoopEmptyMessage(filters) {
    if (!filters) return null;

    var messageId = filters.getAttribute('data-kbc-empty-message-id');
    var emptyMessage = messageId ? document.getElementById(messageId) : null;
    if (emptyMessage) return emptyMessage;

    emptyMessage = document.createElement('div');
    messageId = 'kbc-loop-date-empty-' + Math.random().toString(36).slice(2, 10);
    emptyMessage.id = messageId;
    emptyMessage.className = 'kbc-loop-date-empty';
    emptyMessage.setAttribute('role', 'status');
    emptyMessage.setAttribute('aria-live', 'polite');
    emptyMessage.hidden = true;

    filters.setAttribute('data-kbc-empty-message-id', messageId);
    filters.insertAdjacentElement('afterend', emptyMessage);
    return emptyMessage;
}

function kbcEventsSuiteApplyLoopDateFilter(filters) {
    if (!filters) return;

    var active = filters.querySelector('.kbc-loop-date-filter-btn.is-active');
    var selected = active ? (active.getAttribute('data-loop-date-filter') || 'upcoming') : 'upcoming';
    var cards = kbcEventsSuiteGetLoopCards(filters);
    var visibleCount = 0;

    cards.forEach(function (card) {
        var eventData = kbcEventsSuiteResolveLoopEvent(card);
        var state = kbcEventsSuiteGetLoopCardDateState(card);
        var matchesTerms = kbcEventsSuiteCardMatchesRequiredTerms(card, filters, eventData);
        var isVisible = selected === state && matchesTerms;
        card.setAttribute('data-kbc-loop-date-state', state);
        card.hidden = !isVisible;
        card.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
        if (isVisible) visibleCount++;
    });

    var emptyMessage = kbcEventsSuiteGetLoopEmptyMessage(filters);
    if (!emptyMessage) return;

    if (visibleCount === 0) {
        var message = selected === 'ended'
            ? filters.getAttribute('data-ended-empty')
            : filters.getAttribute('data-upcoming-empty');
        emptyMessage.textContent = message || 'No events found.';
        emptyMessage.hidden = false;
        emptyMessage.classList.add('is-visible');
    } else {
        emptyMessage.hidden = true;
        emptyMessage.classList.remove('is-visible');
        emptyMessage.textContent = '';
    }
}

function kbcEventsSuiteObserveLoopDateFilter(filters) {
    if (!window.MutationObserver || filters.dataset.kbcObserverReady === 'yes') return;
    filters.dataset.kbcObserverReady = 'yes';

    var targetSelector = filters.getAttribute('data-target-selector') || '';
    var roots = targetSelector ? kbcEventsSuiteSafeQueryAll(targetSelector, document) : [];
    if (!roots.length && filters.parentElement) roots = [filters.parentElement];

    roots.forEach(function (root) {
        var timer = null;
        new MutationObserver(function (mutations) {
            var relevant = mutations.some(function (mutation) {
                return mutation.addedNodes && mutation.addedNodes.length;
            });
            if (!relevant) return;
            window.clearTimeout(timer);
            timer = window.setTimeout(function () {
                kbcEventsSuiteApplyLoopDateFilter(filters);
            }, 120);
        }).observe(root, { childList: true, subtree: true });
    });
}

function kbcEventsSuiteInitLoopDateFilters() {
    document.querySelectorAll('[data-kbc-loop-date-filters="yes"]').forEach(function (filters) {
        kbcEventsSuiteApplyLoopDateFilter(filters);
        kbcEventsSuiteObserveLoopDateFilter(filters);
    });
}

function kbcEventsSuiteApplyGridFilters(wrap) {
    if (!wrap) return;

    var activeDate = wrap.querySelector('.kbc-events-date-filter-btn.is-active');
    var selectedDate = activeDate ? (activeDate.getAttribute('data-date-filter') || '') : '';
    var activeCategory = wrap.querySelector('.kbc-events-category-filters .kbc-events-filter-btn.is-active[data-filter]');
    var selectedCategory = activeCategory ? (activeCategory.getAttribute('data-filter') || 'all') : 'all';
    var visibleCount = 0;

    wrap.querySelectorAll('.kbc-event-card').forEach(function (card) {
        var dateState = card.getAttribute('data-kbc-date-state') || card.getAttribute('data-kbc-loop-date-state') || 'upcoming';
        var categories = kbcEventsSuiteParseTermList(card.getAttribute('data-event-categories') || '');
        var matchesDate = !selectedDate || selectedDate === dateState;
        var matchesCategory = selectedCategory === 'all' || categories.indexOf(selectedCategory) !== -1;
        var isVisible = matchesDate && matchesCategory;

        card.hidden = !isVisible;
        card.style.display = isVisible ? '' : 'none';
        card.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
        if (isVisible) visibleCount++;
    });

    var emptyMessage = wrap.querySelector('.kbc-events-filter-empty');
    if (emptyMessage) {
        emptyMessage.hidden = visibleCount !== 0;
        emptyMessage.classList.toggle('is-visible', visibleCount === 0);
    }
}

function kbcEventsSuiteInitGridFilters() {
    document.querySelectorAll('[data-kbc-grid="yes"]').forEach(kbcEventsSuiteApplyGridFilters);
}

function kbcEventsSuiteInitFrontendFilters() {
    kbcEventsSuiteInitLoopDateFilters();
    kbcEventsSuiteInitGridFilters();
}

document.addEventListener('click', function (e) {
    var button = e.target.closest('.kbc-session-toggle');
    if (button) {
        var card = button.closest('.kbc-session-card');
        if (!card) return;
        card.classList.toggle('is-open');
        button.setAttribute('aria-expanded', card.classList.contains('is-open') ? 'true' : 'false');
    }

    var loopDateFilter = e.target.closest('.kbc-loop-date-filter-btn');
    if (loopDateFilter) {
        var loopDateFilters = loopDateFilter.closest('[data-kbc-loop-date-filters="yes"]');
        if (!loopDateFilters) return;

        loopDateFilters.querySelectorAll('.kbc-loop-date-filter-btn').forEach(function (btn) {
            var isActive = btn === loopDateFilter;

            btn.classList.toggle('is-active', isActive);
            btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        kbcEventsSuiteApplyLoopDateFilter(loopDateFilters);
        return;
    }

    var dateFilter = e.target.closest('.kbc-events-date-filter-btn');
    if (dateFilter) {
        var dateWrap = dateFilter.closest('.kbc-events-suite-wrap');
        var dateGroup = dateFilter.closest('.kbc-events-date-filters');
        if (!dateWrap || !dateGroup) return;

        dateGroup.querySelectorAll('.kbc-events-date-filter-btn').forEach(function (btn) {
            var isActive = btn === dateFilter;
            btn.classList.toggle('is-active', isActive);
            btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        kbcEventsSuiteApplyGridFilters(dateWrap);
        return;
    }

    var filter = e.target.closest('.kbc-events-category-filters .kbc-events-filter-btn[data-filter]');
    if (filter) {
        var wrap = filter.closest('.kbc-events-suite-wrap');
        var group = filter.closest('.kbc-events-category-filters');
        if (!wrap || !group) return;

        group.querySelectorAll('.kbc-events-filter-btn[data-filter]').forEach(function (btn) {
            btn.classList.toggle('is-active', btn === filter);
        });

        kbcEventsSuiteApplyGridFilters(wrap);
    }

    var tab = e.target.closest('.kbc-agenda-tab-btn');
    if (tab) {
        var wrapper = tab.closest('.kbc-agenda-tabs');
        if (!wrapper) return;

        var target = tab.getAttribute('data-kbc-agenda-tab');

        wrapper.querySelectorAll('.kbc-agenda-tab-btn').forEach(function (btn) {
            var active = btn === tab;
            btn.classList.toggle('is-active', active);
            btn.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        wrapper.querySelectorAll('.kbc-agenda-panel').forEach(function (panel) {
            var active = panel.getAttribute('data-kbc-agenda-panel') === target;
            panel.classList.toggle('is-active', active);
            if (active) panel.scrollTop = 0;
        });
    }
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', kbcEventsSuiteInitFrontendFilters);
} else {
    kbcEventsSuiteInitFrontendFilters();
}

window.addEventListener('load', kbcEventsSuiteInitFrontendFilters);

(function () {
    var mobileQuery = window.matchMedia('(max-width: 680px)');
    var tabletQuery = window.matchMedia('(max-width: 900px)');
    var reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    function getVisibleSpeakerCount(grid) {
        return 1;
    }

    function getCarouselStep(grid) {
        var card = grid.querySelector('.kbc-speaker-card');

        if (!card) {
            return grid.clientWidth;
        }

        var style = window.getComputedStyle(grid);
        var gap = parseFloat(style.columnGap || style.gap || 0) || 0;

        return (card.getBoundingClientRect().width + gap) * getVisibleSpeakerCount(grid);
    }

    function setupSpeakersCarousel(grid) {
        if (!grid || grid.dataset.kbcSpeakersCarouselReady === 'yes') {
            return;
        }

        grid.dataset.kbcSpeakersCarouselReady = 'yes';

        var interval = null;
        var resumeTimeout = null;
        var userPaused = false;

        function canAutoPlay() {
            return (mobileQuery.matches || grid.classList.contains('kbc-speakers-carousel')) &&
                !reduceMotionQuery.matches &&
                grid.scrollWidth > grid.clientWidth + 8;
        }

        function stop() {
            if (interval) {
                window.clearInterval(interval);
                interval = null;
            }
        }

        function next() {
            if (!canAutoPlay() || userPaused) {
                return;
            }

            var maxScroll = grid.scrollWidth - grid.clientWidth;

            if (maxScroll <= 0) {
                return;
            }

            if (grid.scrollLeft >= maxScroll - 12) {
                grid.scrollTo({ left: 0, behavior: 'smooth' });
                return;
            }

            grid.scrollTo({
                left: Math.min(grid.scrollLeft + getCarouselStep(grid), maxScroll),
                behavior: 'smooth'
            });
        }

        function start() {
            stop();

            if (canAutoPlay()) {
                interval = window.setInterval(next, 3500);
            }
        }

        function pauseTemporarily() {
            userPaused = true;
            stop();

            if (resumeTimeout) {
                window.clearTimeout(resumeTimeout);
            }

            resumeTimeout = window.setTimeout(function () {
                userPaused = false;
                start();
            }, 5000);
        }

        grid.addEventListener('touchstart', pauseTemporarily, { passive: true });
        grid.addEventListener('pointerdown', pauseTemporarily);
        grid.addEventListener('wheel', pauseTemporarily, { passive: true });
        grid.addEventListener('focusin', pauseTemporarily);

        window.addEventListener('resize', start);

        if (mobileQuery.addEventListener) {
            mobileQuery.addEventListener('change', start);
            tabletQuery.addEventListener('change', start);
            reduceMotionQuery.addEventListener('change', start);
        }

        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                stop();
            } else {
                start();
            }
        });

        grid.kbcSpeakersCarouselStart = start;
        start();
    }

    function initSpeakersCarousels() {
        document.querySelectorAll('.kbc-speakers-grid').forEach(function (grid) {
            setupSpeakersCarousel(grid);

            if (typeof grid.kbcSpeakersCarouselStart === 'function') {
                grid.kbcSpeakersCarouselStart();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSpeakersCarousels);
    } else {
        initSpeakersCarousels();
    }

    window.addEventListener('load', initSpeakersCarousels);
    window.setTimeout(initSpeakersCarousels, 500);

    function observeSpeakersRegions() {
        if (!window.MutationObserver) return;

        var roots = [];
        document.querySelectorAll('.kbc-speakers-grid').forEach(function (grid) {
            var root = grid.closest('.kbc-event-speakers-section, .elementor-widget, .elementor') || grid.parentElement;
            if (root && roots.indexOf(root) === -1 && root.dataset.kbcSpeakersObserverReady !== 'yes') {
                roots.push(root);
                root.dataset.kbcSpeakersObserverReady = 'yes';
                new MutationObserver(function (mutations) {
                    var relevant = mutations.some(function (mutation) {
                        return Array.prototype.some.call(mutation.addedNodes || [], function (node) {
                            return node.nodeType === 1 && (node.matches('.kbc-speakers-grid') || node.querySelector('.kbc-speakers-grid'));
                        });
                    });
                    if (!relevant) return;
                    window.clearTimeout(root.kbcSpeakersCarouselMutationTimer);
                    root.kbcSpeakersCarouselMutationTimer = window.setTimeout(initSpeakersCarousels, 200);
                }).observe(root, { childList: true, subtree: true });
            }
        });
    }

    observeSpeakersRegions();
})();
