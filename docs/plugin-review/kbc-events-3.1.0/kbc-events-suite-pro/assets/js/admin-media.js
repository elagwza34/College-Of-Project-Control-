jQuery(function ($) {
    var frame;

    function openMedia(targetField, targetPreview, title, buttonText, sizeKey) {
        if (frame) {
            frame.open();
            return;
        }

        frame = wp.media({ title: title, button: { text: buttonText }, multiple: false });
        frame.on('select', function () {
            var attachment = frame.state().get('selection').first().toJSON();
            $(targetField).val(attachment.id);
            var imageUrl = attachment.sizes && attachment.sizes[sizeKey] ? attachment.sizes[sizeKey].url : attachment.url;
            $(targetPreview).attr('src', imageUrl).show();
            frame = null;
        });
        frame.open();
    }

    $('#kbc_upload_speaker_image').on('click', function (e) {
        e.preventDefault();
        openMedia('#kbc_speaker_image_id', '#kbc_speaker_preview', 'Choose Speaker Image', 'Use this image', 'thumbnail');
    });

    $('#kbc_remove_speaker_image').on('click', function (e) {
        e.preventDefault();
        $('#kbc_speaker_image_id').val('');
        $('#kbc_speaker_preview').attr('src', '').hide();
    });

    $('#kbc_upload_partner_logo').on('click', function (e) {
        e.preventDefault();
        openMedia('#kbc_partner_logo_id', '#kbc_partner_logo_preview', 'Choose Partner Logo', 'Use this logo', 'medium');
    });

    $('#kbc_remove_partner_logo').on('click', function (e) {
        e.preventDefault();
        $('#kbc_partner_logo_id').val('');
        $('#kbc_partner_logo_preview').attr('src', '').hide();
    });

    function kbcFilterTracksByEvent() {
        var eventId = $('#kbc_event_id').val();

        $('#kbc_track_id option').each(function () {
            var option = $(this);
            var optionEventId = option.data('event-id');

            if (!option.val()) {
                option.show();
                return;
            }

            if (!eventId || String(optionEventId) === String(eventId)) {
                option.show();
            } else {
                option.hide();
            }
        });

        var selected = $('#kbc_track_id option:selected');
        if (selected.length && selected.val() && selected.is(':hidden')) {
            $('#kbc_track_id').val('');
        }
    }

    kbcFilterTracksByEvent();
    $('#kbc_event_id').on('change', kbcFilterTracksByEvent);
});
