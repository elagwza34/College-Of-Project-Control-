<?php
if (!defined('ABSPATH')) { exit; }

add_action('kbc_events_suite_attendee_sync_cron', 'kbc_events_suite_sync_attendees');

function kbc_events_suite_schedule_registration_jobs() {
    if (!wp_next_scheduled('kbc_events_suite_attendee_sync_cron')) {
        wp_schedule_event(time() + 600, 'hourly', 'kbc_events_suite_attendee_sync_cron');
    }
    if (!wp_next_scheduled('kbc_events_suite_email_queue_cron')) {
        wp_schedule_event(time() + 120, 'kbc_every_five_minutes', 'kbc_events_suite_email_queue_cron');
    }
}
add_action('init', 'kbc_events_suite_schedule_registration_jobs');

function kbc_events_suite_eventbrite_attendee_event_ids() {
    return get_posts(array(
        'post_type' => kbc_events_suite_event_post_type(), 'post_status' => array('publish','draft','pending','private'),
        'posts_per_page' => -1, 'fields' => 'ids', 'no_found_rows' => true,
        'meta_query' => array('relation' => 'OR',
            array('key' => '_kbc_eventbrite_event_id', 'compare' => 'EXISTS'),
            array('key' => '_eventbrite_event_id', 'compare' => 'EXISTS'),
        ),
    ));
}

function kbc_events_suite_sync_attendees($manual = false) {
    $credentials = kbc_events_suite_get_eventbrite_credentials();
    if (empty($credentials['token'])) {
        return new WP_Error('missing_token', __('Missing Eventbrite token.', 'kbc-events-suite-pro'));
    }
    $result = array('events' => 0, 'created' => 0, 'updated' => 0, 'skipped' => 0, 'failed' => 0);
    foreach (kbc_events_suite_eventbrite_attendee_event_ids() as $post_id) {
        $one = kbc_events_suite_sync_event_attendees($post_id, $credentials['token']);
        $result['events']++;
        if (is_wp_error($one)) { $result['failed']++; continue; }
        foreach (array('created','updated','skipped','failed') as $key) { $result[$key] += absint($one[$key] ?? 0); }
    }
    update_option('kbc_events_suite_attendees_last_sync', current_time('mysql'), false);
    update_option('kbc_events_suite_attendees_last_result', $result, false);
    kbc_events_suite_log('Eventbrite attendees sync completed', $result, $result['failed'] ? 'warning' : 'info');
    return $result;
}

function kbc_events_suite_sync_event_attendees($post_id, $token = '') {
    $post_id = absint($post_id);
    $eventbrite_id = get_post_meta($post_id, '_kbc_eventbrite_event_id', true) ?: get_post_meta($post_id, '_eventbrite_event_id', true);
    if (!$post_id || !$eventbrite_id) { return new WP_Error('missing_event', __('Eventbrite event ID is missing.', 'kbc-events-suite-pro')); }
    if (!$token) { $token = kbc_events_suite_get_eventbrite_credentials()['token']; }
    $url = trailingslashit(KBC_EVENTS_SUITE_API_BASE) . 'events/' . rawurlencode((string) $eventbrite_id) . '/attendees/';
    $continuation = '';
    $pages = 0;
    $result = array('created'=>0,'updated'=>0,'skipped'=>0,'failed'=>0);
    do {
        $args = array('page_size' => 100, 'status' => 'attending');
        if ($continuation) { $args['continuation'] = $continuation; }
        $response = kbc_events_suite_eventbrite_request($url, $token, $args);
        if (is_wp_error($response)) { return $response; }
        $json = $response['json'];
        foreach ((array) ($json['attendees'] ?? array()) as $attendee) {
            $state = kbc_events_suite_upsert_attendee($attendee, $post_id, $eventbrite_id);
            isset($result[$state]) ? $result[$state]++ : $result['failed']++;
        }
        $pagination = (array) ($json['pagination'] ?? array());
        $continuation = !empty($pagination['has_more_items']) ? sanitize_text_field((string) ($pagination['continuation'] ?? '')) : '';
        $pages++;
    } while ($continuation && $pages < 50);
    return $result;
}

function kbc_events_suite_attendee_consent($attendee) {
    foreach ((array) ($attendee['answers'] ?? array()) as $answer) {
        $question = strtolower((string) ($answer['question'] ?? ''));
        $value = strtolower(trim((string) ($answer['answer'] ?? '')));
        if ((strpos($question, 'marketing') !== false || strpos($question, 'email') !== false || strpos($question, 'consent') !== false)
            && in_array($value, array('yes','y','true','1','i agree','opt in'), true)) { return 1; }
    }
    return 0;
}

function kbc_events_suite_mysql_datetime($value) {
    if (!$value) { return null; }
    try { return (new DateTimeImmutable((string) $value))->setTimezone(wp_timezone())->format('Y-m-d H:i:s'); }
    catch (Exception $e) { return null; }
}

function kbc_events_suite_upsert_attendee($attendee, $post_id = 0, $eventbrite_event_id = '') {
    global $wpdb;
    if (!is_array($attendee) || empty($attendee['id'])) { return 'failed'; }
    $profile = (array) ($attendee['profile'] ?? array());
    $barcodes = (array) ($attendee['barcodes'] ?? array());
    $status = sanitize_key((string) ($attendee['status'] ?? 'attending')) ?: 'attending';
    $cancelled = in_array($status, array('cancelled','canceled','deleted'), true) ? 1 : 0;
    $refunded = !empty($attendee['refunded']) || $status === 'refunded' ? 1 : 0;
    $eventbrite_event_id = sanitize_text_field((string) ($eventbrite_event_id ?: ($attendee['event_id'] ?? '')));
    if (!$post_id && $eventbrite_event_id) { $post_id = kbc_events_suite_find_eventbrite_post_id($eventbrite_event_id); }
    $data = array(
        'eventbrite_attendee_id' => sanitize_text_field((string) $attendee['id']),
        'eventbrite_order_id' => sanitize_text_field((string) ($attendee['order_id'] ?? '')),
        'eventbrite_event_id' => $eventbrite_event_id,
        'wordpress_event_id' => absint($post_id),
        'first_name' => sanitize_text_field((string) ($profile['first_name'] ?? '')),
        'last_name' => sanitize_text_field((string) ($profile['last_name'] ?? '')),
        'email' => sanitize_email((string) ($profile['email'] ?? '')),
        'phone' => sanitize_text_field((string) ($profile['cell_phone'] ?? ($profile['home_phone'] ?? ''))),
        'ticket_class_id' => sanitize_text_field((string) ($attendee['ticket_class_id'] ?? '')),
        'ticket_name' => sanitize_text_field((string) ($attendee['ticket_class_name'] ?? '')),
        'quantity' => max(1, absint($attendee['quantity'] ?? 1)),
        'registration_status' => $status,
        'checked_in' => !empty($barcodes[0]['status']) && $barcodes[0]['status'] === 'used' ? 1 : 0,
        'refunded' => $refunded,
        'cancelled' => $cancelled,
        'marketing_consent' => kbc_events_suite_attendee_consent($attendee),
        'consent_source' => 'eventbrite_question',
        'registered_at' => kbc_events_suite_mysql_datetime($attendee['created'] ?? ''),
        'remote_updated_at' => kbc_events_suite_mysql_datetime($attendee['changed'] ?? ''),
    );
    $data['raw_hash'] = hash('sha256', wp_json_encode($data));
    $data['last_synced_at'] = current_time('mysql');
    $table = kbc_events_suite_registrations_table();
    $existing = $wpdb->get_row($wpdb->prepare("SELECT id, raw_hash FROM {$table} WHERE eventbrite_attendee_id=%s", $data['eventbrite_attendee_id']), ARRAY_A);
    if ($existing && hash_equals((string) $existing['raw_hash'], $data['raw_hash'])) { return 'skipped'; }
    if ($existing) {
        $wpdb->update($table, $data, array('id' => absint($existing['id'])));
        kbc_events_suite_schedule_registration_emails(absint($existing['id']));
        return 'updated';
    }
    $wpdb->insert($table, $data);
    $registration_id = absint($wpdb->insert_id);
    if ($registration_id) { kbc_events_suite_schedule_registration_emails($registration_id); return 'created'; }
    return 'failed';
}
