<?php
if (!defined('ABSPATH')) {
    exit;
}


function kbc_events_suite_valid_related_post_id($post_id, $expected_post_type) {
    $post_id = absint($post_id);
    if (!$post_id || get_post_type($post_id) !== $expected_post_type) {
        return 0;
    }

    $status = get_post_status($post_id);
    return $status && $status !== 'trash' ? $post_id : 0;
}

function kbc_events_suite_meta_box_save_allowed($post_id, $nonce_name, $nonce_action, $expected_post_type) {
    if (!isset($_POST[$nonce_name])) {
        return false;
    }

    if (!wp_verify_nonce(sanitize_text_field(wp_unslash($_POST[$nonce_name])), $nonce_action)) {
        return false;
    }

    if ((defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) || wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) {
        return false;
    }

    return get_post_type($post_id) === $expected_post_type && current_user_can('edit_post', $post_id);
}

function kbc_events_suite_add_meta_boxes() {
    add_meta_box('kbc_events_suite_eventbrite_box', 'Eventbrite Sync', 'kbc_events_suite_render_eventbrite_event_box', kbc_events_suite_event_post_type(), 'side', 'default');
    add_meta_box('kbc_events_suite_zoom_box', 'Zoom Meeting', 'kbc_events_suite_render_zoom_event_box', kbc_events_suite_event_post_type(), 'side', 'high');
    add_meta_box('kbc_events_suite_shortcodes_box', 'Event Shortcodes', 'kbc_events_suite_render_event_shortcode_box', kbc_events_suite_event_post_type(), 'side', 'high');
    add_meta_box('kbc_events_suite_button_timing_box', 'Event Button Timing', 'kbc_events_suite_render_event_button_timing_box', kbc_events_suite_event_post_type(), 'side', 'default');
    add_meta_box('kbc_events_suite_track_details', 'Track Details', 'kbc_events_suite_render_track_meta_box', 'kbc_agenda_track', 'normal', 'high');
    add_meta_box('kbc_events_suite_agenda_details', 'Session Details', 'kbc_events_suite_render_session_meta_box', 'kbc_agenda_session', 'normal', 'high');
    add_meta_box('kbc_events_suite_partner_details', 'Partner Details', 'kbc_events_suite_render_partner_meta_box', 'kbc_event_partner', 'normal', 'high');
}
add_action('add_meta_boxes', 'kbc_events_suite_add_meta_boxes');

function kbc_events_suite_render_event_shortcode_box($post) {
    $event_id = absint($post->ID);
    ?>
    <p><strong>Event Grid by category:</strong></p>
    <input type="text" readonly value='[kbc_events_grid category="marketing"]' style="width:100%;">

    <p><strong>Agenda inside this Event:</strong></p>
    <input type="text" readonly value="[kbc_event_agenda]" style="width:100%;">

    <p><strong>Agenda anywhere:</strong></p>
    <input type="text" readonly value='[kbc_event_agenda id="<?php echo esc_attr($event_id); ?>"]' style="width:100%;">

    <p><strong>Speakers inside this Event:</strong></p>
    <input type="text" readonly value='[kbc_event_speakers title="Speakers"]' style="width:100%;">

    <p><strong>Partners inside this Event:</strong></p>
    <input type="text" readonly value="[kbc_event_partners]" style="width:100%;">
    <?php
}

function kbc_events_suite_render_event_button_timing_box($post) {
    wp_nonce_field('kbc_events_suite_save_event_button_timing', 'kbc_events_suite_event_button_timing_nonce');

    $close_override = get_post_meta($post->ID, '_kbc_registration_close_days_before', true);
    $highlights_override = get_post_meta($post->ID, '_kbc_highlights_show_days_after', true);
    $timing = kbc_events_suite_get_event_timing_overrides($post->ID);

    $global_close = absint(get_option('kbc_events_suite_close_registration_days', 1));
    $global_highlights = absint(get_option('kbc_events_suite_highlights_after_days', 1));

    $effective_close = kbc_events_suite_get_event_close_registration_days($post->ID);
    $effective_highlights = kbc_events_suite_get_event_highlights_after_days($post->ID);

    $source_labels = array(
        'event'  => 'Event override',
        'acf'    => 'ACF field',
        'global' => 'Global setting',
    );
    ?>
    <p>
        Leave a field blank to use the global value from <strong>Events &gt; Suite Settings</strong>.
        A value of <code>0</code> is valid.
    </p>

    <p>
        <label for="kbc_registration_close_days_before"><strong>Close registration</strong></label><br>
        <input
            type="number"
            min="0"
            step="1"
            id="kbc_registration_close_days_before"
            name="kbc_registration_close_days_before"
            value="<?php echo esc_attr($close_override); ?>"
            placeholder="Global: <?php echo esc_attr($global_close); ?>"
            style="width:100%;"
        >
        <span class="description">Day(s) before the event start date.</span>
    </p>

    <p>
        <label for="kbc_highlights_show_days_after"><strong>Show highlights</strong></label><br>
        <input
            type="number"
            min="0"
            step="1"
            id="kbc_highlights_show_days_after"
            name="kbc_highlights_show_days_after"
            value="<?php echo esc_attr($highlights_override); ?>"
            placeholder="Global: <?php echo esc_attr($global_highlights); ?>"
            style="width:100%;"
        >
        <span class="description">Day(s) after the event end date.</span>
    </p>

    <hr>

    <p style="margin-bottom:0;">
        <strong>Effective rules</strong><br>
        Registration closes: <?php echo esc_html($effective_close); ?> day(s) before
        <em>(<?php echo esc_html($source_labels[$timing['close_source']] ?? 'Global setting'); ?>)</em><br>
        Highlights appear: <?php echo esc_html($effective_highlights); ?> day(s) after
        <em>(<?php echo esc_html($source_labels[$timing['highlights_source']] ?? 'Global setting'); ?>)</em>
    </p>
    <?php
}

function kbc_events_suite_save_event_button_timing($post_id, $post) {
    if (!$post || $post->post_type !== kbc_events_suite_event_post_type()) {
        return;
    }

    if (!isset($_POST['kbc_events_suite_event_button_timing_nonce'])) {
        return;
    }

    if (!wp_verify_nonce(
        sanitize_text_field(wp_unslash($_POST['kbc_events_suite_event_button_timing_nonce'])),
        'kbc_events_suite_save_event_button_timing'
    )) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (wp_is_post_revision($post_id) || !current_user_can('edit_post', $post_id)) {
        return;
    }

    $fields = array(
        'kbc_registration_close_days_before' => '_kbc_registration_close_days_before',
        'kbc_highlights_show_days_after'      => '_kbc_highlights_show_days_after',
    );

    foreach ($fields as $request_key => $meta_key) {
        $raw_value = isset($_POST[$request_key])
            ? trim((string) wp_unslash($_POST[$request_key]))
            : '';

        if ($raw_value === '') {
            delete_post_meta($post_id, $meta_key);
        } else {
            update_post_meta($post_id, $meta_key, absint($raw_value));
        }
    }

    clean_post_cache($post_id);
    kbc_events_suite_clear_frontend_event_timing_map_cache();

    /* Purge only the edited event when LiteSpeed Cache is available. */
    do_action('litespeed_purge_post', $post_id);
}
add_action('save_post', 'kbc_events_suite_save_event_button_timing', 20, 2);

function kbc_events_suite_render_eventbrite_event_box($post) {
    $eventbrite_id = get_post_meta($post->ID, '_kbc_eventbrite_event_id', true) ?: get_post_meta($post->ID, '_eventbrite_event_id', true);
    $last_sync = get_post_meta($post->ID, '_kbc_eventbrite_last_sync', true);
    $eventbrite_url = get_post_meta($post->ID, '_kbc_eventbrite_url', true);
    $manual_overrides = kbc_events_suite_get_manual_overrides($post->ID);
    ?>
    <p><strong><?php esc_html_e('Eventbrite ID:', 'kbc-events-suite-pro'); ?></strong><br><code><?php echo $eventbrite_id ? esc_html($eventbrite_id) : esc_html__('Not linked', 'kbc-events-suite-pro'); ?></code></p>
    <p><strong><?php esc_html_e('Last synced:', 'kbc-events-suite-pro'); ?></strong><br><?php echo $last_sync ? esc_html($last_sync) : esc_html__('Never', 'kbc-events-suite-pro'); ?></p>
    <?php if ($manual_overrides) : ?>
        <p><strong><?php esc_html_e('Protected manual fields:', 'kbc-events-suite-pro'); ?></strong><br><code><?php echo esc_html(implode(', ', $manual_overrides)); ?></code></p>
        <p class="description"><?php esc_html_e('Eventbrite updates are stored separately and will not replace these local edits.', 'kbc-events-suite-pro'); ?></p>
    <?php endif; ?>
    <?php if ($eventbrite_url) : ?>
        <p><a href="<?php echo esc_url($eventbrite_url); ?>" target="_blank" rel="noopener">View on Eventbrite</a></p>
    <?php endif; ?>
    <?php if ($eventbrite_id) :
        $url = wp_nonce_url(admin_url('admin-post.php?action=kbc_events_suite_sync_single_event&post_id=' . absint($post->ID)), 'kbc_events_suite_sync_single_event_' . absint($post->ID));
        ?>
        <p><a href="<?php echo esc_url($url); ?>" class="button button-secondary">Sync This Event Now</a></p>
    <?php endif;
}

function kbc_events_suite_admin_meta_box_styles() {
    ?>
    <style>
        .kbc-admin-field{margin-bottom:18px}.kbc-admin-field label{display:block;font-weight:700;margin-bottom:6px}.kbc-admin-field input,.kbc-admin-field select,.kbc-admin-field textarea{width:100%;max-width:650px}.kbc-admin-help{color:#666;margin-top:4px;font-size:13px}.kbc-admin-section-title{margin:24px 0 12px;padding:10px 12px;background:#f0f0f1;border-left:4px solid #E2AF6D;font-weight:700}.kbc-image-actions{display:flex;gap:8px;align-items:center}.kbc-legacy-track-box{background:#fff8ee;border:1px solid #eed7b8;padding:12px;max-width:650px;border-radius:6px}
    </style>
    <?php
}

function kbc_events_suite_render_track_meta_box($post) {
    wp_nonce_field('kbc_events_suite_save_track', 'kbc_events_suite_track_nonce');
    kbc_events_suite_admin_meta_box_styles();

    $event_id = get_post_meta($post->ID, '_kbc_track_event_id', true);
    $subtitle = get_post_meta($post->ID, '_kbc_track_subtitle', true);
    $color = get_post_meta($post->ID, '_kbc_track_color', true) ?: '#E2AF6D';
    $order = get_post_meta($post->ID, '_kbc_track_order', true);
    $events = kbc_events_suite_get_events();
    ?>
    <div class="kbc-admin-section-title">Track Relation</div>
    <div class="kbc-admin-field">
        <label for="kbc_track_event_id">Related Event *</label>
        <select name="kbc_track_event_id" id="kbc_track_event_id" required>
            <option value="">Select Event</option>
            <?php foreach ($events as $event) : ?>
                <option value="<?php echo esc_attr($event->ID); ?>" <?php selected((int) $event_id, (int) $event->ID); ?>><?php echo esc_html($event->post_title); ?></option>
            <?php endforeach; ?>
        </select>
        <div class="kbc-admin-help">This track will appear as a tab in the selected event agenda.</div>
    </div>

    <div class="kbc-admin-section-title">Track Display</div>
    <div class="kbc-admin-field"><label for="kbc_track_subtitle">Track Subtitle</label><input type="text" name="kbc_track_subtitle" id="kbc_track_subtitle" value="<?php echo esc_attr($subtitle); ?>" placeholder="L4, L6, Employer Forum"></div>
    <div class="kbc-admin-field"><label for="kbc_track_color">Track Accent Color</label><input type="color" name="kbc_track_color" id="kbc_track_color" value="<?php echo esc_attr($color); ?>"></div>
    <div class="kbc-admin-field"><label for="kbc_track_order">Track Order</label><input type="number" name="kbc_track_order" id="kbc_track_order" value="<?php echo esc_attr($order); ?>" placeholder="1"><div class="kbc-admin-help">Use 1, 2, 3 to control the tab order.</div></div>
    <p><strong>Important:</strong> The track title is the main post title above.</p>
    <?php
}

function kbc_events_suite_save_track_meta($post_id) {
    if (!kbc_events_suite_meta_box_save_allowed($post_id, 'kbc_events_suite_track_nonce', 'kbc_events_suite_save_track', 'kbc_agenda_track')) {
        return;
    }

    $event_id = kbc_events_suite_valid_related_post_id(
        isset($_POST['kbc_track_event_id']) ? absint($_POST['kbc_track_event_id']) : 0,
        kbc_events_suite_event_post_type()
    );
    $color = isset($_POST['kbc_track_color']) ? sanitize_hex_color(wp_unslash($_POST['kbc_track_color'])) : '';

    update_post_meta($post_id, '_kbc_track_event_id', $event_id);
    update_post_meta($post_id, '_kbc_track_subtitle', isset($_POST['kbc_track_subtitle']) ? sanitize_text_field(wp_unslash($_POST['kbc_track_subtitle'])) : '');
    update_post_meta($post_id, '_kbc_track_color', $color ?: '#E2AF6D');
    update_post_meta($post_id, '_kbc_track_order', isset($_POST['kbc_track_order']) ? absint($_POST['kbc_track_order']) : 0);
}
add_action('save_post_kbc_agenda_track', 'kbc_events_suite_save_track_meta');

function kbc_events_suite_render_session_meta_box($post) {
    wp_nonce_field('kbc_events_suite_save_session', 'kbc_events_suite_session_nonce');
    kbc_events_suite_admin_meta_box_styles();

    $event_id = get_post_meta($post->ID, '_kbc_event_id', true);
    $selected_track_id = get_post_meta($post->ID, '_kbc_track_id', true);
    $legacy_track_title = get_post_meta($post->ID, '_kbc_track_title', true);
    $legacy_track_subtitle = get_post_meta($post->ID, '_kbc_track_subtitle', true);
    $legacy_track_color = get_post_meta($post->ID, '_kbc_track_color', true);
    $session_time = get_post_meta($post->ID, '_kbc_session_time', true);
    $session_order = get_post_meta($post->ID, '_kbc_session_order', true);
    $session_description = get_post_meta($post->ID, '_kbc_session_description', true);
    $speaker_name = get_post_meta($post->ID, '_kbc_speaker_name', true);
    $speaker_job_title = get_post_meta($post->ID, '_kbc_speaker_job_title', true);
    $speaker_linkedin = get_post_meta($post->ID, '_kbc_speaker_linkedin_url', true);
    $speaker_image_id = get_post_meta($post->ID, '_kbc_speaker_image_id', true);
    $speaker_image_url = $speaker_image_id ? wp_get_attachment_image_url($speaker_image_id, 'thumbnail') : '';
    $events = kbc_events_suite_get_events();
    $tracks = kbc_events_suite_get_agenda_tracks();
    $add_track_url = admin_url('post-new.php?post_type=kbc_agenda_track');
    ?>
    <style>.kbc-speaker-preview{width:90px;height:90px;border-radius:50%;object-fit:cover;display:<?php echo $speaker_image_url ? 'block' : 'none'; ?>;margin-bottom:10px;background:#ddd}</style>

    <div class="kbc-admin-section-title">Event Relation</div>
    <div class="kbc-admin-field">
        <label for="kbc_event_id">Related Event *</label>
        <select name="kbc_event_id" id="kbc_event_id" required>
            <option value="">Select Event</option>
            <?php foreach ($events as $event) : ?>
                <option value="<?php echo esc_attr($event->ID); ?>" <?php selected((int) $event_id, (int) $event->ID); ?>><?php echo esc_html($event->post_title); ?></option>
            <?php endforeach; ?>
        </select>
    </div>

    <div class="kbc-admin-section-title">Agenda Track / Tab</div>
    <div class="kbc-admin-field">
        <label for="kbc_track_id">Select Track *</label>
        <select name="kbc_track_id" id="kbc_track_id">
            <option value="">Select Track</option>
            <?php foreach ($tracks as $track) :
                $track_event_id = get_post_meta($track->ID, '_kbc_track_event_id', true);
                $track_subtitle = get_post_meta($track->ID, '_kbc_track_subtitle', true);
                $track_label = trim($track->post_title . ($track_subtitle ? ' - ' . $track_subtitle : ''));
                ?>
                <option value="<?php echo esc_attr($track->ID); ?>" data-event-id="<?php echo esc_attr($track_event_id); ?>" <?php selected((int) $selected_track_id, (int) $track->ID); ?>><?php echo esc_html($track_label); ?></option>
            <?php endforeach; ?>
        </select>
        <div class="kbc-admin-help">The dropdown filters by the selected event. Add tracks from Events &gt; Agenda Tracks.</div>
        <p><a class="button button-secondary" href="<?php echo esc_url($add_track_url); ?>" target="_blank">+ Add New Track</a></p>
    </div>

    <?php if (!$selected_track_id && ($legacy_track_title || $legacy_track_subtitle)) : ?>
        <div class="kbc-admin-field kbc-legacy-track-box">
            <strong>Legacy track data found:</strong>
            <p>Title: <?php echo esc_html($legacy_track_title ?: '-'); ?><br>Subtitle: <?php echo esc_html($legacy_track_subtitle ?: '-'); ?><br>Color: <?php echo esc_html($legacy_track_color ?: '-'); ?></p>
            <div class="kbc-admin-help">For the new tabs system, create/select an Agenda Track. The old data will still be used as fallback until a track is selected.</div>
        </div>
    <?php endif; ?>

    <div class="kbc-admin-section-title">Session Details</div>
    <div class="kbc-admin-field"><label for="kbc_session_time">Session Time</label><input type="text" name="kbc_session_time" id="kbc_session_time" value="<?php echo esc_attr($session_time); ?>" placeholder="09:00"></div>
    <div class="kbc-admin-field"><label for="kbc_session_order">Session Order</label><input type="number" name="kbc_session_order" id="kbc_session_order" value="<?php echo esc_attr($session_order); ?>" placeholder="1"></div>
    <div class="kbc-admin-field"><label for="kbc_session_description">Session Description</label><textarea name="kbc_session_description" id="kbc_session_description" rows="5"><?php echo esc_textarea($session_description); ?></textarea></div>

    <div class="kbc-admin-section-title">Speaker Details</div>
    <div class="kbc-admin-field"><label for="kbc_speaker_name">Speaker Name</label><input type="text" name="kbc_speaker_name" id="kbc_speaker_name" value="<?php echo esc_attr($speaker_name); ?>"></div>
    <div class="kbc-admin-field"><label for="kbc_speaker_job_title">Speaker Job Title</label><input type="text" name="kbc_speaker_job_title" id="kbc_speaker_job_title" value="<?php echo esc_attr($speaker_job_title); ?>"></div>
    <div class="kbc-admin-field"><label for="kbc_speaker_linkedin_url">Speaker LinkedIn URL</label><input type="url" name="kbc_speaker_linkedin_url" id="kbc_speaker_linkedin_url" value="<?php echo esc_url($speaker_linkedin); ?>"></div>
    <div class="kbc-admin-field"><label>Speaker Image</label><img src="<?php echo esc_url($speaker_image_url); ?>" class="kbc-speaker-preview" id="kbc_speaker_preview" alt=""><input type="hidden" name="kbc_speaker_image_id" id="kbc_speaker_image_id" value="<?php echo esc_attr($speaker_image_id); ?>"><div class="kbc-image-actions"><button type="button" class="button" id="kbc_upload_speaker_image">Upload / Choose Image</button><button type="button" class="button" id="kbc_remove_speaker_image">Remove Image</button></div></div>
    <p><strong>Important:</strong> The session title is the main post title above.</p>
    <?php
}

function kbc_events_suite_save_session_meta($post_id) {
    if (!kbc_events_suite_meta_box_save_allowed($post_id, 'kbc_events_suite_session_nonce', 'kbc_events_suite_save_session', 'kbc_agenda_session')) {
        return;
    }

    $event_id = kbc_events_suite_valid_related_post_id(
        isset($_POST['kbc_event_id']) ? absint($_POST['kbc_event_id']) : 0,
        kbc_events_suite_event_post_type()
    );
    $track_id = kbc_events_suite_valid_related_post_id(
        isset($_POST['kbc_track_id']) ? absint($_POST['kbc_track_id']) : 0,
        'kbc_agenda_track'
    );

    /* A session cannot point to a track owned by a different event. */
    if ($track_id && (!$event_id || absint(get_post_meta($track_id, '_kbc_track_event_id', true)) !== $event_id)) {
        $track_id = 0;
    }

    $speaker_image_id = kbc_events_suite_valid_image_attachment_id(
        isset($_POST['kbc_speaker_image_id']) ? absint($_POST['kbc_speaker_image_id']) : 0
    );

    $fields = array(
        '_kbc_event_id'             => $event_id,
        '_kbc_track_id'             => $track_id,
        '_kbc_session_time'         => isset($_POST['kbc_session_time']) ? sanitize_text_field(wp_unslash($_POST['kbc_session_time'])) : '',
        '_kbc_session_order'        => isset($_POST['kbc_session_order']) ? absint($_POST['kbc_session_order']) : 0,
        '_kbc_session_description'  => isset($_POST['kbc_session_description']) ? sanitize_textarea_field(wp_unslash($_POST['kbc_session_description'])) : '',
        '_kbc_speaker_name'         => isset($_POST['kbc_speaker_name']) ? sanitize_text_field(wp_unslash($_POST['kbc_speaker_name'])) : '',
        '_kbc_speaker_job_title'    => isset($_POST['kbc_speaker_job_title']) ? sanitize_text_field(wp_unslash($_POST['kbc_speaker_job_title'])) : '',
        '_kbc_speaker_linkedin_url' => isset($_POST['kbc_speaker_linkedin_url']) ? esc_url_raw(wp_unslash($_POST['kbc_speaker_linkedin_url'])) : '',
        '_kbc_speaker_image_id'     => $speaker_image_id,
    );

    if ($track_id) {
        $fields['_kbc_track_title'] = get_the_title($track_id);
        $fields['_kbc_track_subtitle'] = get_post_meta($track_id, '_kbc_track_subtitle', true);
        $fields['_kbc_track_color'] = sanitize_hex_color(get_post_meta($track_id, '_kbc_track_color', true)) ?: '#E2AF6D';
    } else {
        /* Do not leave a stale cached track after an invalid relation is removed. */
        $fields['_kbc_track_title'] = '';
        $fields['_kbc_track_subtitle'] = '';
        $fields['_kbc_track_color'] = '';
    }

    foreach ($fields as $key => $value) {
        update_post_meta($post_id, $key, $value);
    }
}
add_action('save_post_kbc_agenda_session', 'kbc_events_suite_save_session_meta');

function kbc_events_suite_render_partner_meta_box($post) {
    wp_nonce_field('kbc_events_suite_save_partner', 'kbc_events_suite_partner_nonce');
    kbc_events_suite_admin_meta_box_styles();

    $event_id = get_post_meta($post->ID, '_kbc_partner_event_id', true);
    $partner_label = get_post_meta($post->ID, '_kbc_partner_label', true);
    $partner_role = get_post_meta($post->ID, '_kbc_partner_role', true);
    $partner_alternate_name = get_post_meta($post->ID, '_kbc_partner_alternate_name', true);
    $partner_description = get_post_meta($post->ID, '_kbc_partner_description', true);
    $partner_website = get_post_meta($post->ID, '_kbc_partner_website', true);
    $partner_instagram = get_post_meta($post->ID, '_kbc_partner_instagram', true);
    $partner_linkedin = get_post_meta($post->ID, '_kbc_partner_linkedin', true);
    $partner_email = get_post_meta($post->ID, '_kbc_partner_email', true);
    $founder_name = get_post_meta($post->ID, '_kbc_partner_founder_name', true);
    $founder_job_title = get_post_meta($post->ID, '_kbc_partner_founder_job_title', true);
    $partner_logo_id = get_post_meta($post->ID, '_kbc_partner_logo_id', true);
    $partner_order = get_post_meta($post->ID, '_kbc_partner_order', true);
    $partner_logo_url = $partner_logo_id ? wp_get_attachment_image_url($partner_logo_id, 'medium') : '';
    $events = kbc_events_suite_get_events();
    ?>
    <style>.kbc-partner-logo-preview{width:150px;height:100px;object-fit:contain;display:<?php echo $partner_logo_url ? 'block' : 'none'; ?>;margin-bottom:10px;background:#f6f7f7;border:1px solid #dcdcde;padding:8px}</style>
    <div class="kbc-admin-section-title">Event Relation</div>
    <div class="kbc-admin-field"><label for="kbc_partner_event_id">Related Event *</label><select name="kbc_partner_event_id" id="kbc_partner_event_id" required><option value="">Select Event</option><?php foreach ($events as $event) : ?><option value="<?php echo esc_attr($event->ID); ?>" <?php selected((int) $event_id, (int) $event->ID); ?>><?php echo esc_html($event->post_title); ?></option><?php endforeach; ?></select></div>
    <div class="kbc-admin-section-title">Partner Content</div>
    <div class="kbc-admin-field"><label for="kbc_partner_label">Section Label</label><input type="text" name="kbc_partner_label" id="kbc_partner_label" value="<?php echo esc_attr($partner_label); ?>" placeholder="Partner Spotlight"></div>
    <div class="kbc-admin-field"><label for="kbc_partner_role">Partner Role</label><input type="text" name="kbc_partner_role" id="kbc_partner_role" value="<?php echo esc_attr($partner_role); ?>" placeholder="Official production partner"></div>
    <div class="kbc-admin-field"><label for="kbc_partner_alternate_name">Alternative Name</label><input type="text" name="kbc_partner_alternate_name" id="kbc_partner_alternate_name" value="<?php echo esc_attr($partner_alternate_name); ?>"></div>
    <div class="kbc-admin-field"><label for="kbc_partner_description">Partner Description</label><textarea name="kbc_partner_description" id="kbc_partner_description" rows="6"><?php echo esc_textarea($partner_description); ?></textarea></div>
    <div class="kbc-admin-section-title">Partner Logo</div>
    <div class="kbc-admin-field"><img src="<?php echo esc_url($partner_logo_url); ?>" class="kbc-partner-logo-preview" id="kbc_partner_logo_preview" alt=""><input type="hidden" name="kbc_partner_logo_id" id="kbc_partner_logo_id" value="<?php echo esc_attr($partner_logo_id); ?>"><div class="kbc-image-actions"><button type="button" class="button" id="kbc_upload_partner_logo">Upload / Choose Logo</button><button type="button" class="button" id="kbc_remove_partner_logo">Remove Logo</button></div></div>
    <div class="kbc-admin-section-title">Partner Links</div>
    <div class="kbc-admin-field"><label for="kbc_partner_website">Website URL</label><input type="url" name="kbc_partner_website" id="kbc_partner_website" value="<?php echo esc_url($partner_website); ?>"></div>
    <div class="kbc-admin-field"><label for="kbc_partner_instagram">Instagram URL</label><input type="url" name="kbc_partner_instagram" id="kbc_partner_instagram" value="<?php echo esc_url($partner_instagram); ?>"></div>
    <div class="kbc-admin-field"><label for="kbc_partner_linkedin">LinkedIn URL</label><input type="url" name="kbc_partner_linkedin" id="kbc_partner_linkedin" value="<?php echo esc_url($partner_linkedin); ?>"></div>
    <div class="kbc-admin-field"><label for="kbc_partner_email">Email</label><input type="email" name="kbc_partner_email" id="kbc_partner_email" value="<?php echo esc_attr($partner_email); ?>"></div>
    <div class="kbc-admin-section-title">Founder Details</div>
    <div class="kbc-admin-field"><label for="kbc_partner_founder_name">Founder Name</label><input type="text" name="kbc_partner_founder_name" id="kbc_partner_founder_name" value="<?php echo esc_attr($founder_name); ?>"></div>
    <div class="kbc-admin-field"><label for="kbc_partner_founder_job_title">Founder Job Title</label><input type="text" name="kbc_partner_founder_job_title" id="kbc_partner_founder_job_title" value="<?php echo esc_attr($founder_job_title); ?>"></div>
    <div class="kbc-admin-section-title">Display Settings</div>
    <div class="kbc-admin-field"><label for="kbc_partner_order">Display Order</label><input type="number" name="kbc_partner_order" id="kbc_partner_order" value="<?php echo esc_attr($partner_order); ?>" placeholder="1"></div>
    <?php
}

function kbc_events_suite_save_partner_meta($post_id) {
    if (!kbc_events_suite_meta_box_save_allowed($post_id, 'kbc_events_suite_partner_nonce', 'kbc_events_suite_save_partner', 'kbc_event_partner')) {
        return;
    }

    $event_id = kbc_events_suite_valid_related_post_id(
        isset($_POST['kbc_partner_event_id']) ? absint($_POST['kbc_partner_event_id']) : 0,
        kbc_events_suite_event_post_type()
    );
    $logo_id = kbc_events_suite_valid_image_attachment_id(
        isset($_POST['kbc_partner_logo_id']) ? absint($_POST['kbc_partner_logo_id']) : 0
    );

    $fields = array(
        '_kbc_partner_event_id'          => $event_id,
        '_kbc_partner_label'             => isset($_POST['kbc_partner_label']) ? sanitize_text_field(wp_unslash($_POST['kbc_partner_label'])) : '',
        '_kbc_partner_role'              => isset($_POST['kbc_partner_role']) ? sanitize_text_field(wp_unslash($_POST['kbc_partner_role'])) : '',
        '_kbc_partner_alternate_name'    => isset($_POST['kbc_partner_alternate_name']) ? sanitize_text_field(wp_unslash($_POST['kbc_partner_alternate_name'])) : '',
        '_kbc_partner_description'       => isset($_POST['kbc_partner_description']) ? wp_kses_post(wp_unslash($_POST['kbc_partner_description'])) : '',
        '_kbc_partner_website'           => isset($_POST['kbc_partner_website']) ? esc_url_raw(wp_unslash($_POST['kbc_partner_website'])) : '',
        '_kbc_partner_instagram'         => isset($_POST['kbc_partner_instagram']) ? esc_url_raw(wp_unslash($_POST['kbc_partner_instagram'])) : '',
        '_kbc_partner_linkedin'          => isset($_POST['kbc_partner_linkedin']) ? esc_url_raw(wp_unslash($_POST['kbc_partner_linkedin'])) : '',
        '_kbc_partner_email'             => isset($_POST['kbc_partner_email']) ? sanitize_email(wp_unslash($_POST['kbc_partner_email'])) : '',
        '_kbc_partner_founder_name'      => isset($_POST['kbc_partner_founder_name']) ? sanitize_text_field(wp_unslash($_POST['kbc_partner_founder_name'])) : '',
        '_kbc_partner_founder_job_title' => isset($_POST['kbc_partner_founder_job_title']) ? sanitize_text_field(wp_unslash($_POST['kbc_partner_founder_job_title'])) : '',
        '_kbc_partner_logo_id'           => $logo_id,
        '_kbc_partner_order'             => isset($_POST['kbc_partner_order']) ? absint($_POST['kbc_partner_order']) : 0,
    );

    foreach ($fields as $key => $value) {
        update_post_meta($post_id, $key, $value);
    }
}
add_action('save_post_kbc_event_partner', 'kbc_events_suite_save_partner_meta');
