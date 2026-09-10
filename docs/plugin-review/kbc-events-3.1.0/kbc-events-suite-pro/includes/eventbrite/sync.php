<?php
if (!defined('ABSPATH')) {
    exit;
}

add_action('kbc_events_suite_eventbrite_sync_cron', 'kbc_events_suite_eventbrite_sync_events');

function kbc_events_suite_schedule_sync() {
    if (get_option('kbc_events_suite_eventbrite_auto_sync', 'yes') !== 'yes') {
        return;
    }

    if (wp_next_scheduled('kbc_events_suite_eventbrite_sync_cron')) {
        return;
    }

    $interval = get_option('kbc_events_suite_eventbrite_sync_interval', 'hourly');
    if (!in_array($interval, array('hourly', 'twicedaily', 'daily'), true)) {
        $interval = 'hourly';
    }

    wp_schedule_event(time() + 300, $interval, 'kbc_events_suite_eventbrite_sync_cron');
}

function kbc_events_suite_clear_schedule() {
    $timestamp = wp_next_scheduled('kbc_events_suite_eventbrite_sync_cron');

    while ($timestamp) {
        wp_unschedule_event($timestamp, 'kbc_events_suite_eventbrite_sync_cron');
        $timestamp = wp_next_scheduled('kbc_events_suite_eventbrite_sync_cron');
    }
}

function kbc_events_suite_reschedule_sync() {
    kbc_events_suite_clear_schedule();
    kbc_events_suite_schedule_sync();
}

function kbc_events_suite_maybe_schedule_sync() {
    if (get_option('kbc_events_suite_eventbrite_auto_sync', 'yes') === 'yes' && !wp_next_scheduled('kbc_events_suite_eventbrite_sync_cron')) {
        kbc_events_suite_schedule_sync();
    }
}
add_action('init', 'kbc_events_suite_maybe_schedule_sync');

function kbc_events_suite_get_eventbrite_credentials() {
    $token = get_option('kbc_events_suite_eventbrite_token', '');
    $organization_id = get_option('kbc_events_suite_eventbrite_organization_id', '');

    if (defined('KBC_EVENTS_SUITE_EVENTBRITE_TOKEN') && KBC_EVENTS_SUITE_EVENTBRITE_TOKEN) {
        $token = KBC_EVENTS_SUITE_EVENTBRITE_TOKEN;
    }

    if (defined('KBC_EVENTS_SUITE_EVENTBRITE_ORGANIZATION_ID') && KBC_EVENTS_SUITE_EVENTBRITE_ORGANIZATION_ID) {
        $organization_id = KBC_EVENTS_SUITE_EVENTBRITE_ORGANIZATION_ID;
    }

    return array(
        'token'           => trim((string) $token),
        'organization_id' => trim((string) $organization_id),
    );
}

/**
 * Acquire a cross-request lock so cron, manual and single-event syncs cannot
 * write the same posts at the same time.
 */
function kbc_events_suite_acquire_eventbrite_sync_lock($owner = 'bulk') {
    $option = 'kbc_events_suite_eventbrite_sync_lock';
    $now = time();
    $existing = get_option($option, array());

    if (is_array($existing) && !empty($existing['expires']) && absint($existing['expires']) <= $now) {
        delete_option($option);
        $existing = array();
    }

    if ($existing) {
        return new WP_Error(
            'kbc_events_suite_sync_locked',
            __('Another Eventbrite sync is already running.', 'kbc-events-suite-pro')
        );
    }

    $token = function_exists('wp_generate_uuid4') ? wp_generate_uuid4() : uniqid('kbc-sync-', true);
    $lock = array(
        'token'   => $token,
        'owner'   => sanitize_key($owner),
        'created' => $now,
        'expires' => $now + (20 * MINUTE_IN_SECONDS),
    );

    if (!add_option($option, $lock, '', 'no')) {
        return new WP_Error(
            'kbc_events_suite_sync_locked',
            __('Another Eventbrite sync is already running.', 'kbc-events-suite-pro')
        );
    }

    return $token;
}

function kbc_events_suite_refresh_eventbrite_sync_lock($token) {
    $option = 'kbc_events_suite_eventbrite_sync_lock';
    $lock = get_option($option, array());

    if (!is_array($lock) || empty($lock['token']) || !hash_equals((string) $lock['token'], (string) $token)) {
        return false;
    }

    $lock['expires'] = time() + (20 * MINUTE_IN_SECONDS);
    update_option($option, $lock, false);

    return true;
}

function kbc_events_suite_release_eventbrite_sync_lock($token) {
    $option = 'kbc_events_suite_eventbrite_sync_lock';
    $lock = get_option($option, array());

    if (is_array($lock) && !empty($lock['token']) && hash_equals((string) $lock['token'], (string) $token)) {
        delete_option($option);
    }
}

function kbc_events_suite_eventbrite_error_message($code, $body) {
    $message = sprintf(
        /* translators: %d: HTTP status code. */
        __('Eventbrite API request failed (HTTP %d).', 'kbc-events-suite-pro'),
        absint($code)
    );

    if (is_array($body)) {
        foreach (array('error_description', 'error', 'status_code_description') as $key) {
            if (!empty($body[$key]) && is_scalar($body[$key])) {
                $message .= ' ' . sanitize_text_field((string) $body[$key]);
                break;
            }
        }
    }

    return $message;
}

/**
 * Resilient Eventbrite GET request. Returns response metadata and decoded JSON.
 */
function kbc_events_suite_eventbrite_request($url, $token, $query_args = array(), $accept = 'application/json') {
    $url = esc_url_raw($url);
    if (!$url || !$token) {
        return new WP_Error('kbc_events_suite_invalid_request', __('Invalid Eventbrite request.', 'kbc-events-suite-pro'));
    }

    if ($query_args) {
        $url = add_query_arg($query_args, $url);
    }

    $last_error = null;

    for ($attempt = 0; $attempt < 3; $attempt++) {
        $response = wp_remote_get($url, array(
            'timeout'     => 35,
            'redirection' => 3,
            'headers'     => array(
                'Authorization' => 'Bearer ' . $token,
                'Accept'        => $accept,
            ),
        ));

        if (is_wp_error($response)) {
            $last_error = $response;
            if ($attempt < 2) {
                usleep((250000 * ($attempt + 1)));
                continue;
            }

            return $response;
        }

        $code = absint(wp_remote_retrieve_response_code($response));
        $raw = (string) wp_remote_retrieve_body($response);
        $json = json_decode($raw, true);
        $json = is_array($json) ? $json : null;

        if ($code >= 200 && $code < 300) {
            return array(
                'code'    => $code,
                'raw'     => $raw,
                'json'    => $json,
                'headers' => wp_remote_retrieve_headers($response),
            );
        }

        $error = new WP_Error(
            'kbc_events_suite_eventbrite_http_' . $code,
            kbc_events_suite_eventbrite_error_message($code, $json),
            array('status' => $code, 'body' => $json)
        );

        if (($code === 429 || $code >= 500) && $attempt < 2) {
            $retry_after = absint(wp_remote_retrieve_header($response, 'retry-after'));
            $delay = $retry_after ? min(2, $retry_after) : ($attempt + 1);
            usleep($delay * 500000);
            $last_error = $error;
            continue;
        }

        return $error;
    }

    return $last_error instanceof WP_Error
        ? $last_error
        : new WP_Error('kbc_events_suite_eventbrite_unknown', __('Unknown Eventbrite API error.', 'kbc-events-suite-pro'));
}

function kbc_events_suite_find_eventbrite_post_id($eventbrite_id) {
    $eventbrite_id = sanitize_text_field((string) $eventbrite_id);
    if (!$eventbrite_id) {
        return 0;
    }

    $ids = get_posts(array(
        'post_type'              => kbc_events_suite_event_post_type(),
        'posts_per_page'         => 1,
        'post_status'            => array('publish', 'draft', 'pending', 'future', 'private', 'trash'),
        'fields'                 => 'ids',
        'no_found_rows'          => true,
        'update_post_meta_cache' => false,
        'update_post_term_cache' => false,
        'meta_query'             => array(
            'relation' => 'OR',
            array('key' => '_kbc_eventbrite_event_id', 'value' => $eventbrite_id, 'compare' => '='),
            array('key' => '_eventbrite_event_id', 'value' => $eventbrite_id, 'compare' => '='),
        ),
    ));

    return $ids ? absint($ids[0]) : 0;
}

function kbc_events_suite_eventbrite_remote_hash($eventbrite_event) {
    if (!is_array($eventbrite_event)) {
        return '';
    }

    $copy = $eventbrite_event;
    foreach (array_keys($copy) as $key) {
        if (strpos((string) $key, '_kbc_') === 0) {
            unset($copy[$key]);
        }
    }

    return md5((string) wp_json_encode($copy));
}

function kbc_events_suite_eventbrite_retry_due($post_id) {
    $now = time();
    foreach (array('_kbc_eventbrite_description_retry_after', '_kbc_eventbrite_image_retry_after') as $key) {
        $retry_after = absint(get_post_meta($post_id, $key, true));
        if ($retry_after && $retry_after <= $now) {
            return true;
        }
    }

    return false;
}

function kbc_events_suite_eventbrite_event_is_unchanged($post_id, $remote_hash) {
    if (!$post_id || !$remote_hash || absint(get_post_meta($post_id, '_kbc_eventbrite_source_schema', true)) < 260) {
        return false;
    }

    /* Run one real sync after 2.6.1 so the map field is released to ACF. */
    if (get_post_meta($post_id, '_kbc_events_suite_map_uses_acf_default', true) !== '1') {
        return false;
    }

    if (kbc_events_suite_eventbrite_retry_due($post_id)) {
        return false;
    }

    return hash_equals((string) get_post_meta($post_id, '_kbc_eventbrite_remote_hash', true), (string) $remote_hash);
}

function kbc_events_suite_eventbrite_empty_sync_result() {
    return array(
        'created'      => 0,
        'updated'      => 0,
        'skipped'      => 0,
        'failed'       => 0,
        'reconciled'   => 0,
        'unpublished'  => 0,
        'missing'      => 0,
        'pages'        => 0,
        'partial'      => false,
        'resumed'      => false,
    );
}

function kbc_events_suite_eventbrite_sync_events($manual = false) {
    $credentials = kbc_events_suite_get_eventbrite_credentials();
    $token = $credentials['token'];
    $organization_id = $credentials['organization_id'];

    if (!$token) {
        $error = new WP_Error('kbc_events_suite_missing_token', __('Missing Eventbrite private token.', 'kbc-events-suite-pro'));
        update_option('kbc_events_suite_eventbrite_last_error', $error->get_error_message());
        return $error;
    }

    if (!$organization_id) {
        $error = new WP_Error('kbc_events_suite_missing_org', __('Missing Eventbrite Organization ID.', 'kbc-events-suite-pro'));
        update_option('kbc_events_suite_eventbrite_last_error', $error->get_error_message());
        return $error;
    }

    $lock_token = kbc_events_suite_acquire_eventbrite_sync_lock($manual ? 'manual' : 'cron');
    if (is_wp_error($lock_token)) {
        return $lock_token;
    }

    try {
        $state = get_option('kbc_events_suite_eventbrite_scan_state', array());
        $state_is_valid = is_array($state)
            && !empty($state['started_at'])
            && (time() - absint($state['started_at'])) < DAY_IN_SECONDS
            && isset($state['organization_id'])
            && (string) $state['organization_id'] === (string) $organization_id;

        if (!$state_is_valid) {
            $state = array(
                'started_at'      => time(),
                'organization_id' => $organization_id,
                'continuation'    => '',
                'seen'            => array(),
                'result'          => kbc_events_suite_eventbrite_empty_sync_result(),
            );
        } else {
            $state['result']['resumed'] = true;
        }

        if (!is_array($state['seen'])) {
            $state['seen'] = array();
        }
        if (!is_array($state['result'])) {
            $state['result'] = kbc_events_suite_eventbrite_empty_sync_result();
        }
        $state['result'] = array_merge(kbc_events_suite_eventbrite_empty_sync_result(), $state['result']);

        $max_pages = max(1, min(50, absint(get_option('kbc_events_suite_eventbrite_max_pages', 20))));
        $has_more = true;
        $pages_this_run = 0;

        while ($has_more && $pages_this_run < $max_pages) {
            $endpoint = trailingslashit(KBC_EVENTS_SUITE_API_BASE) . 'organizations/' . rawurlencode($organization_id) . '/events/';
            $query_args = array(
                'status'      => 'live',
                'time_filter' => 'current_future',
                'expand'      => 'venue,organizer,category,logo',
                'page_size'   => 50,
            );

            if (!empty($state['continuation'])) {
                $query_args['continuation'] = sanitize_text_field($state['continuation']);
            }

            $response = kbc_events_suite_eventbrite_request($endpoint, $token, $query_args);
            if (is_wp_error($response)) {
                update_option('kbc_events_suite_eventbrite_scan_state', $state, false);
                update_option('kbc_events_suite_eventbrite_last_error', $response->get_error_message());
                return $response;
            }

            $body = $response['json'];
            if (!is_array($body)) {
                $error = new WP_Error('kbc_events_suite_invalid_eventbrite_json', __('Eventbrite returned invalid JSON.', 'kbc-events-suite-pro'));
                update_option('kbc_events_suite_eventbrite_scan_state', $state, false);
                update_option('kbc_events_suite_eventbrite_last_error', $error->get_error_message());
                return $error;
            }

            $events = !empty($body['events']) && is_array($body['events']) ? $body['events'] : array();
            foreach ($events as $eventbrite_event) {
                if (!is_array($eventbrite_event) || empty($eventbrite_event['id'])) {
                    $state['result']['failed']++;
                    continue;
                }

                $eventbrite_id = sanitize_text_field((string) $eventbrite_event['id']);
                $state['seen'][$eventbrite_id] = 1;
                $post_id = kbc_events_suite_find_eventbrite_post_id($eventbrite_id);
                $remote_hash = kbc_events_suite_eventbrite_remote_hash($eventbrite_event);

                if ($post_id && kbc_events_suite_eventbrite_event_is_unchanged($post_id, $remote_hash)) {
                    update_post_meta($post_id, '_kbc_eventbrite_last_seen', time());
                    update_post_meta($post_id, '_kbc_eventbrite_last_sync', current_time('mysql'));
                    $state['result']['skipped']++;
                    continue;
                }

                $description = kbc_events_suite_get_eventbrite_full_description_html(
                    $eventbrite_id,
                    $token,
                    isset($eventbrite_event['modified']) ? (string) $eventbrite_event['modified'] : ''
                );

                if ($description === null) {
                    $eventbrite_event['_kbc_description_available'] = false;
                } else {
                    $eventbrite_event['_kbc_description_available'] = true;
                    $eventbrite_event['_kbc_full_description_html'] = $description;
                }

                $result = kbc_events_suite_eventbrite_upsert_event($eventbrite_event, array(
                    'post_id'     => $post_id,
                    'remote_hash' => $remote_hash,
                    'force'       => false,
                ));

                if (isset($state['result'][$result])) {
                    $state['result'][$result]++;
                } elseif ($result === 'reconciled') {
                    $state['result']['reconciled']++;
                } else {
                    $state['result']['failed']++;
                }
            }

            $pages_this_run++;
            $state['result']['pages']++;
            $has_more = !empty($body['pagination']['has_more_items']);
            $state['continuation'] = !empty($body['pagination']['continuation'])
                ? sanitize_text_field((string) $body['pagination']['continuation'])
                : '';

            if (!$state['continuation']) {
                $has_more = false;
            }

            kbc_events_suite_refresh_eventbrite_sync_lock($lock_token);
        }

        if ($has_more) {
            $state['result']['partial'] = true;
            update_option('kbc_events_suite_eventbrite_scan_state', $state, false);
            update_option('kbc_events_suite_eventbrite_last_sync', current_time('mysql'));
            update_option('kbc_events_suite_eventbrite_last_result', $state['result']);
            update_option('kbc_events_suite_eventbrite_last_error', '');
            kbc_events_suite_log('Eventbrite sync paused at page limit', $state['result'], 'info');
            return $state['result'];
        }

        $state['result']['partial'] = false;
        if (get_option('kbc_events_suite_eventbrite_reconcile', 'yes') === 'yes') {
            $reconcile = kbc_events_suite_reconcile_eventbrite_events(array_keys($state['seen']), $token, $lock_token);
            foreach (array('reconciled', 'unpublished', 'missing', 'failed', 'updated', 'skipped') as $key) {
                if (isset($reconcile[$key])) {
                    $state['result'][$key] += absint($reconcile[$key]);
                }
            }
        }

        delete_option('kbc_events_suite_eventbrite_scan_state');
        update_option('kbc_events_suite_eventbrite_last_sync', current_time('mysql'));
        update_option('kbc_events_suite_eventbrite_last_result', $state['result']);
        update_option('kbc_events_suite_eventbrite_last_error', '');
        kbc_events_suite_log('Eventbrite sync completed', $state['result'], 'info');

        return $state['result'];
    } finally {
        kbc_events_suite_release_eventbrite_sync_lock($lock_token);
    }
}

/**
 * Returns sanitised HTML, including an intentional empty string. Null means the
 * request failed and existing local content must not be cleared.
 */
function kbc_events_suite_get_eventbrite_full_description_html($eventbrite_id, $token, $modified = '') {
    $eventbrite_id = sanitize_text_field((string) $eventbrite_id);
    if (!$eventbrite_id || !$token) {
        return null;
    }

    $cache_key = 'kbc_eb_desc_' . md5($eventbrite_id . '|' . (string) $modified);
    $cached = get_transient($cache_key);
    if (is_array($cached) && array_key_exists('html', $cached)) {
        return (string) $cached['html'];
    }

    $url = trailingslashit(KBC_EVENTS_SUITE_API_BASE) . 'events/' . rawurlencode($eventbrite_id) . '/description/';
    $response = kbc_events_suite_eventbrite_request($url, $token, array(), 'application/json,text/html');
    if (is_wp_error($response)) {
        return null;
    }

    $html = '';
    $json = $response['json'];
    if (is_array($json)) {
        if (isset($json['description']['html'])) {
            $html = (string) $json['description']['html'];
        } elseif (isset($json['description']) && is_string($json['description'])) {
            $html = $json['description'];
        } elseif (isset($json['html'])) {
            $html = (string) $json['html'];
        } elseif (isset($json['text'])) {
            $html = wpautop((string) $json['text']);
        }
    } else {
        $html = (string) $response['raw'];
    }

    $html = wp_kses_post($html);
    set_transient($cache_key, array('html' => $html), DAY_IN_SECONDS);

    return $html;
}

function kbc_events_suite_eventbrite_extract_description($eventbrite_event, &$available = null) {
    $available = false;

    if (array_key_exists('_kbc_description_available', $eventbrite_event)) {
        $available = (bool) $eventbrite_event['_kbc_description_available'];
        if (!$available) {
            return '';
        }
    }

    if (array_key_exists('_kbc_full_description_html', $eventbrite_event)) {
        $available = true;
        return wp_kses_post((string) $eventbrite_event['_kbc_full_description_html']);
    }

    if (isset($eventbrite_event['description']['html'])) {
        $available = true;
        return wp_kses_post((string) $eventbrite_event['description']['html']);
    }

    if (isset($eventbrite_event['description']['text'])) {
        $available = true;
        return wp_kses_post(wpautop((string) $eventbrite_event['description']['text']));
    }

    return '';
}

function kbc_events_suite_eventbrite_post_status_for_new_event() {
    $status = sanitize_key(get_option('kbc_events_suite_eventbrite_new_post_status', 'publish'));
    return in_array($status, array('publish', 'draft', 'pending', 'private'), true) ? $status : 'publish';
}

function kbc_events_suite_eventbrite_add_preserved_field(&$preserved, $field_name, $decision) {
    if (is_array($decision) && empty($decision['apply'])) {
        $preserved[] = sanitize_key($field_name);
    }
}

function kbc_events_suite_eventbrite_upsert_event($eventbrite_event, $args = array()) {
    if (!is_array($eventbrite_event)) {
        return 'failed';
    }

    $args = wp_parse_args($args, array(
        'post_id'     => 0,
        'remote_hash' => '',
        'force'       => false,
    ));

    $eventbrite_id = isset($eventbrite_event['id']) ? sanitize_text_field((string) $eventbrite_event['id']) : '';
    if (!$eventbrite_id) {
        return 'failed';
    }

    $remote_status = isset($eventbrite_event['status']) ? sanitize_key((string) $eventbrite_event['status']) : 'live';
    $post_id = absint($args['post_id']);
    if (!$post_id) {
        $post_id = kbc_events_suite_find_eventbrite_post_id($eventbrite_id);
    }

    if (in_array($remote_status, array('canceled', 'cancelled', 'deleted', 'draft'), true)) {
        if (!$post_id) {
            return 'skipped';
        }

        kbc_events_suite_apply_remote_event_status(
            $post_id,
            $remote_status,
            kbc_events_suite_sanitise_remote_event_action(get_option('kbc_events_suite_eventbrite_cancelled_action', 'draft'), 'draft'),
            'remote-status'
        );
        return 'reconciled';
    }

    $is_existing = $post_id > 0;
    $is_new = !$is_existing;
    $force = !empty($args['force']);
    $context = array('is_new' => $is_new, 'force' => $force);
    $preserved = array();

    $title = !empty($eventbrite_event['name']['text'])
        ? sanitize_text_field((string) $eventbrite_event['name']['text'])
        : __('Untitled Event', 'kbc-events-suite-pro');

    $description = kbc_events_suite_eventbrite_extract_description($eventbrite_event, $description_available);
    $summary = isset($eventbrite_event['summary']) ? sanitize_textarea_field((string) $eventbrite_event['summary']) : '';
    if ($summary === '' && $description_available && $description !== '') {
        $summary = wp_trim_words(wp_strip_all_tags($description), 32);
    }

    $native_decisions = array();

    if ($is_existing) {
        $post = get_post($post_id);
        if (!$post || $post->post_type !== kbc_events_suite_event_post_type()) {
            return 'failed';
        }

        $native_incoming = array(
            'post_title'   => $title,
            'post_excerpt' => $summary,
        );
        if ($description_available) {
            $native_incoming['post_content'] = $description;
        }

        $post_data = array('ID' => $post_id);
        foreach ($native_incoming as $field_name => $incoming) {
            $current = (string) $post->{$field_name};
            $native_decisions[$field_name] = kbc_events_suite_decide_synced_value(
                $post_id,
                $field_name,
                $current,
                $incoming,
                array('is_new' => false, 'force' => $force, 'store_source' => false)
            );

            kbc_events_suite_eventbrite_add_preserved_field($preserved, $field_name, $native_decisions[$field_name]);
            if ($native_decisions[$field_name]['apply'] && !kbc_events_suite_values_equal($current, $incoming)) {
                $post_data[$field_name] = $incoming;
            }
        }

        if (count($post_data) > 1) {
            kbc_events_suite_begin_syncing_post($post_id);
            try {
                $saved = wp_update_post(wp_slash($post_data), true);
            } finally {
                kbc_events_suite_end_syncing_post($post_id);
            }

            if (is_wp_error($saved) || !$saved) {
                return 'failed';
            }
        }

        foreach ($native_incoming as $field_name => $incoming) {
            kbc_events_suite_store_eventbrite_source_value($post_id, $field_name, $incoming);
        }
    } else {
        $post_data = array(
            'post_type'    => kbc_events_suite_event_post_type(),
            'post_title'   => $title,
            'post_content' => $description_available ? $description : '',
            'post_excerpt' => $summary,
            'post_status'  => kbc_events_suite_eventbrite_post_status_for_new_event(),
        );

        kbc_events_suite_begin_syncing_post(0);
        try {
            $saved = wp_insert_post(wp_slash($post_data), true);
        } finally {
            kbc_events_suite_end_syncing_post(0);
        }

        if (is_wp_error($saved) || !$saved) {
            return 'failed';
        }

        $post_id = absint($saved);
        kbc_events_suite_store_eventbrite_source_value($post_id, 'post_title', $title);
        if ($description_available) {
            kbc_events_suite_store_eventbrite_source_value($post_id, 'post_content', $description);
        }
        kbc_events_suite_store_eventbrite_source_value($post_id, 'post_excerpt', $summary);
    }

    kbc_events_suite_begin_syncing_post($post_id);
    try {
        update_post_meta($post_id, '_kbc_eventbrite_event_id', $eventbrite_id);
        update_post_meta($post_id, '_eventbrite_event_id', $eventbrite_id);
        update_post_meta($post_id, '_kbc_eventbrite_status', $remote_status);
        update_post_meta($post_id, '_kbc_eventbrite_last_sync', current_time('mysql'));
        update_post_meta($post_id, '_kbc_eventbrite_last_seen', time());

        if (!empty($eventbrite_event['modified'])) {
            update_post_meta($post_id, '_kbc_eventbrite_modified', sanitize_text_field((string) $eventbrite_event['modified']));
        }

        $remote_hash = $args['remote_hash'] ? sanitize_text_field((string) $args['remote_hash']) : kbc_events_suite_eventbrite_remote_hash($eventbrite_event);
        if ($remote_hash) {
            update_post_meta($post_id, '_kbc_eventbrite_remote_hash', $remote_hash);
        }
        update_post_meta($post_id, '_kbc_eventbrite_source_schema', 260);

        if ($description_available) {
            delete_post_meta($post_id, '_kbc_eventbrite_description_retry_after');
        } else {
            update_post_meta($post_id, '_kbc_eventbrite_description_retry_after', time() + (6 * HOUR_IN_SECONDS));
        }

        $native_title_preserved = $is_existing && isset($native_decisions['post_title']) && empty($native_decisions['post_title']['apply']);
        if ($native_title_preserved) {
            kbc_events_suite_mirror_manual_native_value($post_id, 'event_title', (string) get_post_field('post_title', $post_id, 'raw'), $title, true);
            $preserved[] = 'event_title';
        } else {
            $decision = kbc_events_suite_update_acf_or_meta($post_id, 'event_title', $title, $context);
            kbc_events_suite_eventbrite_add_preserved_field($preserved, 'event_title', $decision);
        }

        if ($description_available) {
            $native_content_preserved = $is_existing && isset($native_decisions['post_content']) && empty($native_decisions['post_content']['apply']);
            if ($native_content_preserved) {
                kbc_events_suite_mirror_manual_native_value($post_id, 'description', (string) get_post_field('post_content', $post_id, 'raw'), $description, true);
                $preserved[] = 'description';
            } else {
                $decision = kbc_events_suite_update_acf_or_meta($post_id, 'description', $description, $context);
                kbc_events_suite_eventbrite_add_preserved_field($preserved, 'description', $decision);
            }
        }

        $native_excerpt_preserved = $is_existing && isset($native_decisions['post_excerpt']) && empty($native_decisions['post_excerpt']['apply']);
        if ($native_excerpt_preserved) {
            kbc_events_suite_mirror_manual_native_value($post_id, 'short_description', (string) get_post_field('post_excerpt', $post_id, 'raw'), $summary, true);
            $preserved[] = 'short_description';
        } else {
            $decision = kbc_events_suite_update_acf_or_meta($post_id, 'short_description', $summary, $context);
            kbc_events_suite_eventbrite_add_preserved_field($preserved, 'short_description', $decision);
        }

        $decision = kbc_events_suite_update_acf_or_meta($post_id, 'event_status', $remote_status ?: 'live', $context);
        kbc_events_suite_eventbrite_add_preserved_field($preserved, 'event_status', $decision);

        $booking_url = !empty($eventbrite_event['url']) ? esc_url_raw((string) $eventbrite_event['url']) : '';
        update_post_meta($post_id, '_kbc_eventbrite_url', $booking_url);
        $decision = kbc_events_suite_update_acf_or_meta($post_id, 'booking_url', $booking_url, $context);
        kbc_events_suite_eventbrite_add_preserved_field($preserved, 'booking_url', $decision);

        /* Structured Eventbrite source data used by schema and diagnostics. */
        update_post_meta($post_id, '_kbc_eventbrite_online_event', !empty($eventbrite_event['online_event']) ? 1 : 0);
        update_post_meta($post_id, '_kbc_eventbrite_venue_name', !empty($eventbrite_event['venue']['name']) ? sanitize_text_field((string) $eventbrite_event['venue']['name']) : '');
        update_post_meta($post_id, '_kbc_eventbrite_venue_address', !empty($eventbrite_event['venue']['address']['localized_address_display']) ? sanitize_text_field((string) $eventbrite_event['venue']['address']['localized_address_display']) : '');
        update_post_meta($post_id, '_kbc_eventbrite_organizer_name', !empty($eventbrite_event['organizer']['name']) ? sanitize_text_field((string) $eventbrite_event['organizer']['name']) : '');
        update_post_meta($post_id, '_kbc_eventbrite_organizer_url', !empty($eventbrite_event['organizer']['url']) ? esc_url_raw((string) $eventbrite_event['organizer']['url']) : '');

        $timezone = '';
        if (!empty($eventbrite_event['start']['timezone'])) {
            $timezone = sanitize_text_field((string) $eventbrite_event['start']['timezone']);
        } elseif (!empty($eventbrite_event['end']['timezone'])) {
            $timezone = sanitize_text_field((string) $eventbrite_event['end']['timezone']);
        }
        if ($timezone && in_array($timezone, timezone_identifiers_list(), true)) {
            update_post_meta($post_id, '_kbc_eventbrite_timezone', $timezone);
        }

        if (!empty($eventbrite_event['start']['local'])) {
            $start = kbc_events_suite_parse_eventbrite_local_datetime($eventbrite_event['start']['local'], $timezone);
            if ($start) {
                foreach (array('event_start_date' => $start['date'], 'start_time' => $start['time']) as $field => $value) {
                    $decision = kbc_events_suite_update_acf_or_meta($post_id, $field, $value, $context);
                    kbc_events_suite_eventbrite_add_preserved_field($preserved, $field, $decision);
                }
            }
        }

        if (!empty($eventbrite_event['end']['local'])) {
            $end = kbc_events_suite_parse_eventbrite_local_datetime($eventbrite_event['end']['local'], $timezone);
            if ($end) {
                foreach (array('end_event_date_copy' => $end['date'], 'end_time' => $end['time']) as $field => $value) {
                    $decision = kbc_events_suite_update_acf_or_meta($post_id, $field, $value, $context);
                    kbc_events_suite_eventbrite_add_preserved_field($preserved, $field, $decision);
                }
            }
        }

        $online = !empty($eventbrite_event['online_event']) ? '1' : '0';
        update_post_meta($post_id, '_kbc_eventbrite_online_event', $online);

        $location = kbc_events_suite_build_location_string($eventbrite_event);
        $decision = kbc_events_suite_update_acf_or_meta($post_id, 'location', $location, $context);
        kbc_events_suite_eventbrite_add_preserved_field($preserved, 'location', $decision);

        /*
         * The map field is intentionally not imported from Eventbrite. Remove
         * only a value previously owned by Eventbrite so an unsaved ACF field
         * can return its configured default; preserve genuine manual values.
         */
        $map_text = kbc_events_suite_build_map_text($eventbrite_event);
        $map_release = kbc_events_suite_release_map_field_to_acf_default($post_id, $map_text);
        if (!empty($map_release['preserved'])) {
            $preserved[] = 'map';
        }

        $category_name = !empty($eventbrite_event['category']['name']) ? sanitize_text_field((string) $eventbrite_event['category']['name']) : '';
        $category_id = !empty($eventbrite_event['category']['id']) ? sanitize_text_field((string) $eventbrite_event['category']['id']) : '';
        $category_decision = kbc_events_suite_update_acf_or_meta($post_id, 'category_', $category_name, $context);
        kbc_events_suite_eventbrite_add_preserved_field($preserved, 'category_', $category_decision);
        if (!empty($category_decision['apply'])) {
            kbc_events_suite_assign_category_from_eventbrite($post_id, $category_name, $category_id, $title);
        }

        $logo_url = kbc_events_suite_get_eventbrite_logo_url($eventbrite_event);
        update_post_meta($post_id, '_kbc_eventbrite_remote_logo_url', $logo_url);
        if ($logo_url) {
            $attachment_id = kbc_events_suite_import_event_image($post_id, $logo_url, $title);
            if ($attachment_id) {
                delete_post_meta($post_id, '_kbc_eventbrite_image_retry_after');
                $decision = kbc_events_suite_update_acf_or_meta($post_id, 'image', $attachment_id, $context);
                kbc_events_suite_eventbrite_add_preserved_field($preserved, 'image', $decision);
                $decision = kbc_events_suite_sync_featured_image($post_id, $attachment_id, $context);
                kbc_events_suite_eventbrite_add_preserved_field($preserved, 'featured_image', $decision);
            } else {
                update_post_meta($post_id, '_kbc_eventbrite_image_retry_after', time() + (6 * HOUR_IN_SECONDS));
            }
        } else {
            delete_post_meta($post_id, '_kbc_eventbrite_image_retry_after');
        }

        kbc_events_suite_update_event_date_indexes($post_id);
        if (function_exists('kbc_events_suite_assign_missing_event_order')) {
            kbc_events_suite_assign_missing_event_order($post_id);
        } elseif (function_exists('kbc_events_suite_initialize_missing_event_order')) {
            kbc_events_suite_initialize_missing_event_order(true);
        }
        kbc_events_suite_clear_frontend_event_timing_map_cache();
    } finally {
        kbc_events_suite_end_syncing_post($post_id);
    }

    $preserved = array_values(array_unique(array_filter($preserved)));
    if ($preserved) {
        kbc_events_suite_log('Manual event edits preserved during Eventbrite sync', array(
            'post_id'       => $post_id,
            'eventbrite_id' => $eventbrite_id,
            'fields'        => $preserved,
        ), 'info');
    }

    return $is_existing ? 'updated' : 'created';
}

function kbc_events_suite_parse_eventbrite_local_datetime($value, $timezone = '') {
    if (!$value) {
        return false;
    }

    try {
        $tz = $timezone && in_array($timezone, timezone_identifiers_list(), true)
            ? new DateTimeZone($timezone)
            : wp_timezone();
        $datetime = new DateTimeImmutable((string) $value, $tz);
    } catch (Exception $e) {
        return false;
    }

    return array(
        'date' => $datetime->format('Ymd'),
        'time' => $datetime->format('H:i:s'),
    );
}

function kbc_events_suite_build_location_string($eventbrite_event) {
    if (!empty($eventbrite_event['online_event'])) {
        return __('Online event', 'kbc-events-suite-pro');
    }

    $venue_name = !empty($eventbrite_event['venue']['name']) ? sanitize_text_field((string) $eventbrite_event['venue']['name']) : '';
    $address = !empty($eventbrite_event['venue']['address']['localized_address_display'])
        ? sanitize_text_field((string) $eventbrite_event['venue']['address']['localized_address_display'])
        : '';

    if ($venue_name && $address) {
        return $venue_name . ', ' . $address;
    }

    return $venue_name ?: $address;
}

function kbc_events_suite_build_map_text($eventbrite_event) {
    if (!empty($eventbrite_event['venue']['address']['localized_address_display'])) {
        return sanitize_text_field((string) $eventbrite_event['venue']['address']['localized_address_display']);
    }

    if (!empty($eventbrite_event['venue']['name'])) {
        return sanitize_text_field((string) $eventbrite_event['venue']['name']);
    }

    if (!empty($eventbrite_event['online_event'])) {
        return __('Online event', 'kbc-events-suite-pro');
    }

    return '';
}

function kbc_events_suite_get_eventbrite_logo_url($eventbrite_event) {
    foreach (array(
        isset($eventbrite_event['logo']['original']['url']) ? $eventbrite_event['logo']['original']['url'] : '',
        isset($eventbrite_event['logo']['url']) ? $eventbrite_event['logo']['url'] : '',
        isset($eventbrite_event['logo']['crop_mask']['url']) ? $eventbrite_event['logo']['crop_mask']['url'] : '',
    ) as $url) {
        $url = kbc_events_suite_normalise_url_value($url);
        if ($url) {
            return $url;
        }
    }

    return '';
}

function kbc_events_suite_apply_remote_event_status($post_id, $remote_status, $action, $reason = '') {
    $post_id = absint($post_id);
    if (!$post_id || get_post_type($post_id) !== kbc_events_suite_event_post_type()) {
        return 'failed';
    }

    $remote_status = sanitize_key($remote_status);
    $action = kbc_events_suite_sanitise_remote_event_action($action, 'draft');

    kbc_events_suite_begin_syncing_post($post_id);
    try {
        update_post_meta($post_id, '_kbc_eventbrite_status', $remote_status);
        update_post_meta($post_id, '_kbc_eventbrite_remote_action_reason', sanitize_key($reason));
        update_post_meta($post_id, '_kbc_eventbrite_last_reconcile_check', time());
        kbc_events_suite_update_acf_or_meta($post_id, 'event_status', $remote_status, array('is_new' => false, 'force' => false));

        $current_status = get_post_status($post_id);
        if ($action === 'keep' || in_array($current_status, array('draft', 'private', 'trash'), true)) {
            kbc_events_suite_clear_frontend_event_timing_map_cache();
            return 'kept';
        }

        if ($action === 'trash') {
            $changed = wp_trash_post($post_id);
        } else {
            $changed = wp_update_post(array('ID' => $post_id, 'post_status' => $action), true);
        }

        if (is_wp_error($changed) || !$changed) {
            return 'failed';
        }

        kbc_events_suite_clear_frontend_event_timing_map_cache();
        return 'unpublished';
    } finally {
        kbc_events_suite_end_syncing_post($post_id);
    }
}

function kbc_events_suite_reconcile_eventbrite_events($seen_eventbrite_ids, $token, $lock_token = '') {
    $result = array(
        'reconciled'  => 0,
        'unpublished' => 0,
        'missing'     => 0,
        'failed'      => 0,
        'updated'     => 0,
        'skipped'     => 0,
    );

    $seen = array_fill_keys(array_map('strval', (array) $seen_eventbrite_ids), true);
    $limit = max(1, min(100, absint(get_option('kbc_events_suite_eventbrite_reconcile_limit', 30))));
    $ids = get_posts(array(
        'post_type'              => kbc_events_suite_event_post_type(),
        'post_status'            => array('publish', 'future', 'draft', 'pending', 'private'),
        'posts_per_page'         => -1,
        'fields'                 => 'ids',
        'no_found_rows'          => true,
        'update_post_meta_cache' => true,
        'update_post_term_cache' => false,
        'meta_query'             => array(
            'relation' => 'OR',
            array('key' => '_kbc_eventbrite_event_id', 'compare' => 'EXISTS'),
            array('key' => '_eventbrite_event_id', 'compare' => 'EXISTS'),
        ),
    ));

    $checked = 0;
    foreach ($ids as $post_id) {
        if ($checked >= $limit) {
            break;
        }

        $eventbrite_id = (string) (get_post_meta($post_id, '_kbc_eventbrite_event_id', true) ?: get_post_meta($post_id, '_eventbrite_event_id', true));
        if (!$eventbrite_id || isset($seen[$eventbrite_id])) {
            continue;
        }

        $timezone = kbc_events_suite_event_timezone($post_id);
        $today = (new DateTimeImmutable('now', $timezone))->format('Ymd');
        $end = (string) get_post_meta($post_id, '_kbc_event_end_ymd', true);
        if ($end && $end < $today) {
            continue;
        }

        $last_check = absint(get_post_meta($post_id, '_kbc_eventbrite_last_reconcile_check', true));
        if ($last_check && (time() - $last_check) < (12 * HOUR_IN_SECONDS)) {
            continue;
        }

        $checked++;
        update_post_meta($post_id, '_kbc_eventbrite_last_reconcile_check', time());
        $url = trailingslashit(KBC_EVENTS_SUITE_API_BASE) . 'events/' . rawurlencode($eventbrite_id) . '/';
        $response = kbc_events_suite_eventbrite_request($url, $token, array('expand' => 'venue,organizer,category,logo'));

        if (is_wp_error($response)) {
            $data = $response->get_error_data();
            $http_status = is_array($data) && isset($data['status']) ? absint($data['status']) : 0;
            if (in_array($http_status, array(404, 410), true)) {
                $action_result = kbc_events_suite_apply_remote_event_status(
                    $post_id,
                    'missing',
                    kbc_events_suite_sanitise_remote_event_action(get_option('kbc_events_suite_eventbrite_missing_action', 'draft'), 'draft'),
                    'missing'
                );
                $result['missing']++;
                $result['reconciled']++;
                if ($action_result === 'unpublished') {
                    $result['unpublished']++;
                } elseif ($action_result === 'failed') {
                    $result['failed']++;
                }
            } else {
                $result['failed']++;
            }
            continue;
        }

        $event = $response['json'];
        if (!is_array($event) || empty($event['id'])) {
            $result['failed']++;
            continue;
        }

        $remote_status = isset($event['status']) ? sanitize_key((string) $event['status']) : '';
        if (in_array($remote_status, array('canceled', 'cancelled', 'deleted', 'draft'), true)) {
            $action_result = kbc_events_suite_apply_remote_event_status(
                $post_id,
                $remote_status,
                kbc_events_suite_sanitise_remote_event_action(get_option('kbc_events_suite_eventbrite_cancelled_action', 'draft'), 'draft'),
                'cancelled'
            );
            $result['reconciled']++;
            if ($action_result === 'unpublished') {
                $result['unpublished']++;
            } elseif ($action_result === 'failed') {
                $result['failed']++;
            }
            continue;
        }

        $remote_hash = kbc_events_suite_eventbrite_remote_hash($event);
        if (kbc_events_suite_eventbrite_event_is_unchanged($post_id, $remote_hash)) {
            $result['skipped']++;
            continue;
        }

        $description = kbc_events_suite_get_eventbrite_full_description_html(
            $eventbrite_id,
            $token,
            isset($event['modified']) ? (string) $event['modified'] : ''
        );
        if ($description === null) {
            $event['_kbc_description_available'] = false;
        } else {
            $event['_kbc_description_available'] = true;
            $event['_kbc_full_description_html'] = $description;
        }

        $upsert = kbc_events_suite_eventbrite_upsert_event($event, array(
            'post_id'     => $post_id,
            'remote_hash' => $remote_hash,
            'force'       => false,
        ));
        if ($upsert === 'updated') {
            $result['updated']++;
            $result['reconciled']++;
        } elseif ($upsert === 'skipped') {
            $result['skipped']++;
        } else {
            $result['failed']++;
        }

        if ($lock_token) {
            kbc_events_suite_refresh_eventbrite_sync_lock($lock_token);
        }
    }

    return $result;
}

function kbc_events_suite_sync_single_event($post_id) {
    $post_id = absint($post_id);
    if (!$post_id || get_post_type($post_id) !== kbc_events_suite_event_post_type()) {
        return new WP_Error('invalid_event', __('Invalid event.', 'kbc-events-suite-pro'));
    }

    $eventbrite_id = get_post_meta($post_id, '_kbc_eventbrite_event_id', true) ?: get_post_meta($post_id, '_eventbrite_event_id', true);
    if (!$eventbrite_id) {
        return new WP_Error('missing_eventbrite_id', __('This event is not linked to an Eventbrite ID.', 'kbc-events-suite-pro'));
    }

    $credentials = kbc_events_suite_get_eventbrite_credentials();
    $token = $credentials['token'];
    if (!$token) {
        return new WP_Error('missing_token', __('Missing Eventbrite token.', 'kbc-events-suite-pro'));
    }

    $lock_token = kbc_events_suite_acquire_eventbrite_sync_lock('single');
    if (is_wp_error($lock_token)) {
        return $lock_token;
    }

    try {
        $url = trailingslashit(KBC_EVENTS_SUITE_API_BASE) . 'events/' . rawurlencode((string) $eventbrite_id) . '/';
        $response = kbc_events_suite_eventbrite_request($url, $token, array('expand' => 'venue,organizer,category,logo'));
        if (is_wp_error($response)) {
            $data = $response->get_error_data();
            $status = is_array($data) && isset($data['status']) ? absint($data['status']) : 0;
            if (in_array($status, array(404, 410), true)) {
                kbc_events_suite_apply_remote_event_status(
                    $post_id,
                    'missing',
                    kbc_events_suite_sanitise_remote_event_action(get_option('kbc_events_suite_eventbrite_missing_action', 'draft'), 'draft'),
                    'missing'
                );
            }
            return $response;
        }

        $event = $response['json'];
        if (!is_array($event) || empty($event['id'])) {
            return new WP_Error('eventbrite_single_error', __('Could not retrieve the Eventbrite event.', 'kbc-events-suite-pro'));
        }

        $description = kbc_events_suite_get_eventbrite_full_description_html(
            (string) $eventbrite_id,
            $token,
            isset($event['modified']) ? (string) $event['modified'] : ''
        );
        if ($description === null) {
            $event['_kbc_description_available'] = false;
        } else {
            $event['_kbc_description_available'] = true;
            $event['_kbc_full_description_html'] = $description;
        }

        $result = kbc_events_suite_eventbrite_upsert_event($event, array(
            'post_id'     => $post_id,
            'remote_hash' => kbc_events_suite_eventbrite_remote_hash($event),
            'force'       => false,
        ));

        kbc_events_suite_log('Single event synced', array(
            'post_id'       => $post_id,
            'eventbrite_id' => $eventbrite_id,
            'result'        => $result,
        ), 'info');

        return $result;
    } finally {
        kbc_events_suite_release_eventbrite_sync_lock($lock_token);
    }
}
