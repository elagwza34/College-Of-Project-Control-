(function () {
    'use strict';

    var cfg = window.KBCEventsSuiteElementorController || {};
    var mutationTimer = null;

    function log() {
        if (!cfg.debug || !window.console) return;
        var args = Array.prototype.slice.call(arguments);
        args.unshift('[Events Suite]');
        console.log.apply(console, args);
    }

    function safeQSA(selector, context) {
        if (!selector) return [];
        try {
            return Array.prototype.slice.call((context || document).querySelectorAll(selector));
        } catch (error) {
            log('Invalid selector:', selector, error);
            return [];
        }
    }

    function safeQS(selector, context) {
        return safeQSA(selector, context)[0] || null;
    }

    function getButton(widget) {
        if (!widget) return null;
        return widget.matches && (widget.matches('a') || widget.matches('button'))
            ? widget
            : (widget.querySelector('a') || widget.querySelector('button') || widget);
    }

    function show(element) {
        if (!element) return;
        element.hidden = false;
        element.style.display = '';
        element.removeAttribute('aria-hidden');
    }

    function hide(element) {
        if (!element) return;
        element.hidden = true;
        element.style.display = 'none';
        element.setAttribute('aria-hidden', 'true');
    }

    function setText(widget, text) {
        var button = getButton(widget);
        if (!button || !text) return;
        var textElement = button.querySelector('.elementor-button-text') || button.querySelector('span');
        if (textElement) textElement.textContent = text;
        else button.textContent = text;
        button.setAttribute('aria-label', text);
    }

    function disableLink(widget) {
        var button = getButton(widget);
        if (!button) return;
        if (button.tagName && button.tagName.toLowerCase() === 'a') {
            button.removeAttribute('href');
            button.removeAttribute('target');
            button.removeAttribute('onclick');
        }
        button.setAttribute('aria-disabled', 'true');
    }

    function enableLinkState(widget) {
        var button = getButton(widget);
        if (button) button.removeAttribute('aria-disabled');
    }

    function normalisePath(url) {
        if (!url) return '';
        try {
            var parsed = new URL(url, window.location.href);
            return parsed.pathname.replace(/\/+$/, '') || '/';
        } catch (error) {
            return '';
        }
    }

    function findCard(element) {
        if (!element) return null;
        var selectors = [cfg.cardSelector, '.e-loop-item', '.elementor-loop-item', '.kbc-event-card', 'article'].filter(Boolean);
        for (var i = 0; i < selectors.length; i++) {
            try {
                var card = element.closest(selectors[i]);
                if (card) return card;
            } catch (error) {}
        }
        return element.parentElement;
    }

    function getCardPostId(card) {
        if (!card) return '';
        var attributes = ['data-kbc-event-id', 'data-post-id', 'data-event-id', 'data-id'];
        for (var i = 0; i < attributes.length; i++) {
            var value = card.getAttribute(attributes[i]);
            if (value && /^\d+$/.test(value)) return value;
        }

        var classMatch = String(card.className || '').match(/(?:post-|e-loop-item-)(\d+)/);
        if (classMatch) return classMatch[1];

        var child = safeQS('[data-kbc-event-id], [data-post-id], [data-event-id]', card);
        if (child) {
            var childId = child.getAttribute('data-kbc-event-id') || child.getAttribute('data-post-id') || child.getAttribute('data-event-id');
            if (childId && /^\d+$/.test(childId)) return childId;
        }
        return '';
    }

    function resolveEvent(card) {
        var map = cfg.eventTimingOverrides || {};
        var events = map.events || {};
        var byPath = map.byPath || {};
        var postId = getCardPostId(card);
        if (postId && events[String(postId)]) {
            card.setAttribute('data-kbc-event-id', String(postId));
            return events[String(postId)];
        }

        var links = safeQSA('a[href]', card);
        for (var i = 0; i < links.length; i++) {
            var path = normalisePath(links[i].getAttribute('href'));
            var mappedId = path && byPath[path] ? String(byPath[path]) : '';
            if (mappedId && events[mappedId]) {
                card.setAttribute('data-kbc-event-id', mappedId);
                return events[mappedId];
            }
        }

        var currentPath = normalisePath(window.location.href);
        var currentId = currentPath && byPath[currentPath] ? String(byPath[currentPath]) : '';
        return currentId && events[currentId] ? events[currentId] : null;
    }

    function getHighlightsWidget(card, secure, details) {
        var widget = safeQS(cfg.highlightsButtonSelector || '.Event-Highlights', card);
        return widget && widget !== secure && widget !== details ? widget : null;
    }

    function setHighlightsHref(widget, eventData, card) {
        var button = getButton(widget);
        if (!button || !button.tagName || button.tagName.toLowerCase() !== 'a') return;

        var href = eventData && eventData.highlightsUrl ? eventData.highlightsUrl : '';
        if (!href && cfg.highlightsUrlSelector) {
            var source = safeQS(cfg.highlightsUrlSelector, card);
            if (source) href = source.getAttribute('href') || source.getAttribute('data-url') || '';
        }
        if (href) {
            button.setAttribute('href', href);
            button.removeAttribute('aria-disabled');
        }
    }

    function process(card) {
        if (!card || card.nodeType !== 1) return;

        var secure = safeQS(cfg.secureSelector || '.Secure-Seat', card);
        var details = safeQS(cfg.detailsSelector || '.Event-View', card);
        if (!secure && !details) return;

        var highlights = getHighlightsWidget(card, secure, details);
        var eventData = resolveEvent(card);
        var state = eventData && eventData.state ? eventData.state : (card.getAttribute('data-event-state') || 'open');
        if (state !== 'open' && state !== 'closed' && state !== 'ended') state = 'closed';

        card.classList.remove('kbc-events-suite-state-open', 'kbc-events-suite-state-closed', 'kbc-events-suite-state-highlights');
        card.classList.add('kbc-events-suite-state-' + (state === 'ended' ? 'highlights' : state));
        card.setAttribute('data-kbc-event-state', state);

        if (state === 'open') {
            show(secure);
            show(details);
            hide(highlights);
            setText(secure, cfg.labels && cfg.labels.open ? cfg.labels.open : 'Secure Your Seat');
            setText(details, cfg.labels && cfg.labels.details ? cfg.labels.details : 'More Details');
            enableLinkState(secure);
            enableLinkState(details);
            return;
        }

        if (state === 'closed') {
            show(secure);
            show(details);
            hide(highlights);
            setText(secure, cfg.labels && cfg.labels.closed ? cfg.labels.closed : 'Registration Closed');
            setText(details, cfg.labels && cfg.labels.details ? cfg.labels.details : 'More Details');
            disableLink(secure);
            enableLinkState(details);
            return;
        }

        hide(secure);
        if (highlights) {
            hide(details);
            show(highlights);
            setText(highlights, cfg.labels && cfg.labels.highlights ? cfg.labels.highlights : 'Event Highlights');
            setHighlightsHref(highlights, eventData, card);
        } else if (details) {
            show(details);
            setText(details, cfg.labels && cfg.labels.highlights ? cfg.labels.highlights : 'Event Highlights');
            setHighlightsHref(details, eventData, card);
        }
    }

    function collectCards() {
        var cards = [];
        function add(element) {
            var card = findCard(element);
            if (card && cards.indexOf(card) === -1) cards.push(card);
        }
        safeQSA(cfg.secureSelector || '.Secure-Seat').forEach(add);
        safeQSA(cfg.detailsSelector || '.Event-View').forEach(add);
        return cards;
    }

    function run() {
        var cards = collectCards();
        log('Cards found:', cards.length);
        cards.forEach(process);
    }

    function scheduleRun() {
        window.clearTimeout(mutationTimer);
        mutationTimer = window.setTimeout(run, 100);
    }

    window.KBCEventsSuiteRunButtonController = run;

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
    else run();
    window.addEventListener('load', run);
    document.addEventListener('kbc-events-updated', run);

    if (window.MutationObserver) {
        var roots = safeQSA('.elementor-widget-loop-grid, .elementor-loop-container, main');
        if (!roots.length) roots = [document.documentElement];
        roots.slice(0, 8).forEach(function (root) {
            new MutationObserver(function (mutations) {
                var relevant = mutations.some(function (mutation) {
                    return mutation.addedNodes && mutation.addedNodes.length;
                });
                if (relevant) scheduleRun();
            }).observe(root, { childList: true, subtree: true });
        });
    }
})();
