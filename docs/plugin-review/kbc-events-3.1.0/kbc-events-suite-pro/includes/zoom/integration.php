<?php
if (!defined('ABSPATH')) { exit; }

function kbc_events_suite_zoom_credentials() {
    return array(
        'account_id' => trim((string) get_option('kbc_events_suite_zoom_account_id', '')),
        'client_id' => trim((string) get_option('kbc_events_suite_zoom_client_id', '')),
        'client_secret' => trim((string) get_option('kbc_events_suite_zoom_client_secret', '')),
        'user_id' => trim((string) get_option('kbc_events_suite_zoom_user_id', 'me')) ?: 'me',
    );
}

function kbc_events_suite_zoom_is_configured() {
    $credentials = kbc_events_suite_zoom_credentials();
    return get_option('kbc_events_suite_zoom_enabled', 'no') === 'yes'
        && $credentials['account_id'] && $credentials['client_id'] && $credentials['client_secret'];
}

function kbc_events_suite_zoom_access_token($force = false) {
    if (!kbc_events_suite_zoom_is_configured()) {
        return new WP_Error('zoom_not_configured', __('Zoom integration is not configured.', 'kbc-events-suite-pro'));
    }
    if (!$force) {
        $cached = get_transient('kbc_events_suite_zoom_access_token');
        if (is_string($cached) && $cached !== '') { return $cached; }
    }
    $credentials = kbc_events_suite_zoom_credentials();
    $response = wp_remote_post('https://zoom.us/oauth/token', array(
        'timeout' => 20,
        'headers' => array(
            'Authorization' => 'Basic ' . base64_encode($credentials['client_id'] . ':' . $credentials['client_secret']),
            'Content-Type' => 'application/x-www-form-urlencoded',
        ),
        'body' => array('grant_type' => 'account_credentials', 'account_id' => $credentials['account_id']),
    ));
    if (is_wp_error($response)) { return $response; }
    $status = wp_remote_retrieve_response_code($response);
    $json = json_decode(wp_remote_retrieve_body($response), true);
    if ($status < 200 || $status >= 300 || empty($json['access_token'])) {
        $message = sanitize_text_field((string) ($json['reason'] ?? $json['message'] ?? __('Zoom authentication failed.', 'kbc-events-suite-pro')));
        return new WP_Error('zoom_auth_failed', $message, array('status' => $status));
    }
    $expires = max(60, absint($json['expires_in'] ?? 3600) - 120);
    set_transient('kbc_events_suite_zoom_access_token', (string) $json['access_token'], $expires);
    return (string) $json['access_token'];
}

function kbc_events_suite_zoom_request($path, $args = array(), $retry = true) {
    $token = kbc_events_suite_zoom_access_token();
    if (is_wp_error($token)) { return $token; }
    $path = '/' . ltrim((string) $path, '/');
    $defaults = array('method' => 'GET', 'timeout' => 20, 'headers' => array());
    $args = wp_parse_args($args, $defaults);
    $args['headers']['Authorization'] = 'Bearer ' . $token;
    $args['headers']['Accept'] = 'application/json';
    if (!empty($args['body']) && is_array($args['body'])) {
        $args['headers']['Content-Type'] = 'application/json';
        $args['body'] = wp_json_encode($args['body']);
    }
    $response = wp_remote_request('https://api.zoom.us/v2' . $path, $args);
    if (is_wp_error($response)) { return $response; }
    $status = wp_remote_retrieve_response_code($response);
    $json = json_decode(wp_remote_retrieve_body($response), true);
    if ($status === 401 && $retry) {
        delete_transient('kbc_events_suite_zoom_access_token');
        $fresh = kbc_events_suite_zoom_access_token(true);
        if (is_wp_error($fresh)) { return $fresh; }
        return kbc_events_suite_zoom_request($path, $args, false);
    }
    if ($status < 200 || $status >= 300) {
        $message = sanitize_text_field((string) ($json['message'] ?? __('Zoom API request failed.', 'kbc-events-suite-pro')));
        return new WP_Error('zoom_api_error', $message, array('status' => $status, 'response' => $json));
    }
    return is_array($json) ? $json : array();
}

function kbc_events_suite_zoom_list_meetings($force = false) {
    if (!$force) {
        $cached = get_transient('kbc_events_suite_zoom_meetings');
        if (is_array($cached)) { return $cached; }
    }
    $credentials = kbc_events_suite_zoom_credentials();
    $path = '/users/' . rawurlencode($credentials['user_id']) . '/meetings?type=upcoming&page_size=100';
    $response = kbc_events_suite_zoom_request($path);
    if (is_wp_error($response)) { return $response; }
    $meetings = array();
    foreach ((array) ($response['meetings'] ?? array()) as $meeting) {
        if (empty($meeting['id'])) { continue; }
        $meetings[] = array(
            'id' => sanitize_text_field((string) $meeting['id']),
            'uuid' => sanitize_text_field((string) ($meeting['uuid'] ?? '')),
            'topic' => sanitize_text_field((string) ($meeting['topic'] ?? 'Untitled meeting')),
            'start_time' => sanitize_text_field((string) ($meeting['start_time'] ?? '')),
            'timezone' => sanitize_text_field((string) ($meeting['timezone'] ?? '')),
        );
    }
    set_transient('kbc_events_suite_zoom_meetings', $meetings, 5 * MINUTE_IN_SECONDS);
    return $meetings;
}

function kbc_events_suite_zoom_get_meeting($meeting_id) {
    $meeting_id = preg_replace('/[^0-9]/', '', (string) $meeting_id);
    if (!$meeting_id) { return new WP_Error('zoom_missing_meeting', __('Choose a Zoom meeting.', 'kbc-events-suite-pro')); }
    return kbc_events_suite_zoom_request('/meetings/' . rawurlencode($meeting_id));
}

function kbc_events_suite_zoom_event_url($event_id) {
    return esc_url_raw((string) get_post_meta(absint($event_id), '_kbc_zoom_join_url', true));
}

function kbc_events_suite_render_zoom_event_box($post) {
    wp_nonce_field('kbc_events_suite_save_zoom_event', 'kbc_events_suite_zoom_event_nonce');
    $selected = (string) get_post_meta($post->ID, '_kbc_zoom_meeting_id', true);
    $join_url = kbc_events_suite_zoom_event_url($post->ID);
    $topic = (string) get_post_meta($post->ID, '_kbc_zoom_meeting_topic', true);
    if (!kbc_events_suite_zoom_is_configured()) {
        $url = admin_url('edit.php?post_type=' . kbc_events_suite_event_post_type() . '&page=kbc-events-suite-zoom');
        echo '<p>' . esc_html__('Configure Zoom first, then return to select the meeting for this event.', 'kbc-events-suite-pro') . '</p>';
        echo '<p><a class="button" href="' . esc_url($url) . '">' . esc_html__('Open Zoom settings', 'kbc-events-suite-pro') . '</a></p>';
        return;
    }
    $meetings = kbc_events_suite_zoom_list_meetings();
    if (is_wp_error($meetings)) {
        echo '<p style="color:#b32d2e">' . esc_html($meetings->get_error_message()) . '</p>';
    } else {
        echo '<p><label for="kbc_zoom_meeting_id"><strong>' . esc_html__('Meeting for this Eventbrite event', 'kbc-events-suite-pro') . '</strong></label></p>';
        echo '<select name="kbc_zoom_meeting_id" id="kbc_zoom_meeting_id" style="width:100%">';
        echo '<option value="">' . esc_html__('— No Zoom meeting —', 'kbc-events-suite-pro') . '</option>';
        $found = false;
        foreach ($meetings as $meeting) {
            $found = $found || (string) $meeting['id'] === $selected;
            $label = $meeting['topic'];
            if ($meeting['start_time']) { $label .= ' — ' . $meeting['start_time']; }
            echo '<option value="' . esc_attr($meeting['id']) . '" ' . selected($selected, $meeting['id'], false) . '>' . esc_html($label) . '</option>';
        }
        if ($selected && !$found) {
            echo '<option value="' . esc_attr($selected) . '" selected>' . esc_html(($topic ?: __('Current Zoom meeting', 'kbc-events-suite-pro')) . ' — ' . $selected) . '</option>';
        }
        echo '</select>';
        echo '<p class="description">' . esc_html__('Saving fetches the public attendee join URL directly from Zoom.', 'kbc-events-suite-pro') . '</p>';
    }
    if ($selected) { echo '<p><strong>' . esc_html__('Meeting ID:', 'kbc-events-suite-pro') . '</strong><br><code>' . esc_html($selected) . '</code></p>'; }
    if ($join_url) { echo '<p><strong>' . esc_html__('Saved join URL:', 'kbc-events-suite-pro') . '</strong><br><a href="' . esc_url($join_url) . '" target="_blank" rel="noopener">' . esc_html__('Open Zoom link', 'kbc-events-suite-pro') . '</a></p>'; }
}

function kbc_events_suite_save_zoom_event($post_id, $post) {
    if (!$post || $post->post_type !== kbc_events_suite_event_post_type()) { return; }
    if (!isset($_POST['kbc_events_suite_zoom_event_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['kbc_events_suite_zoom_event_nonce'])), 'kbc_events_suite_save_zoom_event')) { return; }
    if (!current_user_can('edit_post', $post_id) || wp_is_post_revision($post_id) || (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE)) { return; }
    $meeting_id = preg_replace('/[^0-9]/', '', (string) wp_unslash($_POST['kbc_zoom_meeting_id'] ?? ''));
    if (!$meeting_id) {
        delete_post_meta($post_id, '_kbc_zoom_meeting_id');
        delete_post_meta($post_id, '_kbc_zoom_meeting_uuid');
        delete_post_meta($post_id, '_kbc_zoom_meeting_topic');
        delete_post_meta($post_id, '_kbc_zoom_join_url');
        delete_post_meta($post_id, '_kbc_zoom_last_synced');
        return;
    }
    $meeting = kbc_events_suite_zoom_get_meeting($meeting_id);
    if (is_wp_error($meeting) || empty($meeting['join_url'])) {
        set_transient('kbc_events_suite_zoom_event_error_' . get_current_user_id(), is_wp_error($meeting) ? $meeting->get_error_message() : __('Zoom did not return a join URL.', 'kbc-events-suite-pro'), 60);
        return;
    }
    update_post_meta($post_id, '_kbc_zoom_meeting_id', sanitize_text_field((string) $meeting['id']));
    update_post_meta($post_id, '_kbc_zoom_meeting_uuid', sanitize_text_field((string) ($meeting['uuid'] ?? '')));
    update_post_meta($post_id, '_kbc_zoom_meeting_topic', sanitize_text_field((string) ($meeting['topic'] ?? '')));
    update_post_meta($post_id, '_kbc_zoom_join_url', esc_url_raw((string) $meeting['join_url']));
    update_post_meta($post_id, '_kbc_zoom_last_synced', current_time('mysql'));
}
add_action('save_post', 'kbc_events_suite_save_zoom_event', 30, 2);

function kbc_events_suite_zoom_event_notice() {
    $key = 'kbc_events_suite_zoom_event_error_' . get_current_user_id();
    $message = get_transient($key);
    if (!$message) { return; }
    delete_transient($key);
    echo '<div class="notice notice-error is-dismissible"><p><strong>' . esc_html__('Zoom link was not saved:', 'kbc-events-suite-pro') . '</strong> ' . esc_html($message) . '</p></div>';
}
add_action('admin_notices', 'kbc_events_suite_zoom_event_notice');

