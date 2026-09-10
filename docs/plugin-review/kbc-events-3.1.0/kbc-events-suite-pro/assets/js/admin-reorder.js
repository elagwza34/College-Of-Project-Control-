jQuery(function ($) {
    'use strict';

    var list = $('#kbc-events-reorder-list');
    var status = $('#kbc-events-reorder-status');
    var cfg = window.kbcEventsSuiteReorder || {};

    if (list.length) {
        list.sortable({
            handle: '.kbc-reorder-handle',
            placeholder: 'kbc-reorder-placeholder',
            forcePlaceholderSize: true,
            tolerance: 'pointer'
        });
    }

    $('#kbc-events-save-order').on('click', function (event) {
        event.preventDefault();

        var button = $(this);
        var order = [];
        list.find('.kbc-reorder-item').each(function () {
            order.push(parseInt($(this).attr('data-id'), 10));
        });

        status.removeClass('is-success is-error').text(cfg.saving || 'Saving…');
        button.prop('disabled', true);

        $.ajax({
            url: cfg.ajaxUrl,
            method: 'POST',
            dataType: 'json',
            data: {
                action: 'kbc_events_suite_save_event_order',
                nonce: cfg.nonce,
                order: order
            }
        }).done(function (response) {
            if (response && response.success) {
                var data = response.data || {};
                var orders = data.orders || {};
                status.addClass('is-success').text(data.message || cfg.saved || 'Order saved.');
                list.find('.kbc-reorder-item').each(function () {
                    var item = $(this);
                    var id = String(item.attr('data-id'));
                    if (Object.prototype.hasOwnProperty.call(orders, id)) {
                        item.find('code').first().text(orders[id]);
                    }
                });
            } else {
                var message = response && response.data && response.data.message ? response.data.message : (cfg.error || 'Could not save order.');
                status.addClass('is-error').text(message);
            }
        }).fail(function () {
            status.addClass('is-error').text(cfg.error || 'Could not save order.');
        }).always(function () {
            button.prop('disabled', false);
        });
    });
});
