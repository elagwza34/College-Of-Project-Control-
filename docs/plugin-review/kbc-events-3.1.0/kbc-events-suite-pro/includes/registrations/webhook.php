<?php
if (!defined('ABSPATH')) { exit; }

function kbc_events_suite_register_eventbrite_webhook_route() {
    register_rest_route('kbc-events-suite/v1', '/eventbrite/(?P<secret>[A-Za-z0-9_-]{20,80})', array(
        'methods' => 'POST',
        'callback' => 'kbc_events_suite_receive_eventbrite_webhook',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'kbc_events_suite_register_eventbrite_webhook_route');

function kbc_events_suite_receive_eventbrite_webhook(WP_REST_Request $request) {
    $saved = (string) get_option('kbc_events_suite_webhook_secret', '');
    $provided = (string) $request->get_param('secret');
    if (!$saved || !$provided || !hash_equals($saved, $provided)) {
        return new WP_Error('kbc_webhook_forbidden', __('Invalid webhook secret.', 'kbc-events-suite-pro'), array('status' => 403));
    }
    $payload = $request->get_json_params();
    if (!is_array($payload)) { return new WP_Error('kbc_webhook_invalid', __('Invalid JSON payload.', 'kbc-events-suite-pro'), array('status' => 400)); }
    $action = sanitize_key(str_replace('.', '_', (string) ($payload['config']['action'] ?? $payload['action'] ?? 'unknown')));
    $api_url = esc_url_raw((string) ($payload['api_url'] ?? ''));
    $host = $api_url ? strtolower((string) wp_parse_url($api_url, PHP_URL_HOST)) : '';
    if (!$api_url || !in_array($host, array('www.eventbriteapi.com','eventbriteapi.com'), true)) {
        return new WP_Error('kbc_webhook_url', __('Webhook API URL is not an Eventbrite API URL.', 'kbc-events-suite-pro'), array('status' => 400));
    }
    $token = kbc_events_suite_get_eventbrite_credentials()['token'];
    $response = kbc_events_suite_eventbrite_request($api_url, $token, strpos($action, 'order_') === 0 ? array('expand'=>'attendees') : array());
    if (is_wp_error($response)) { return $response; }
    $resource = (array) ($response['json'] ?? array());

    if (strpos($action, 'attendee_') === 0) {
        $state = kbc_events_suite_upsert_attendee($resource);
    } elseif (strpos($action, 'order_') === 0) {
        $state = 'skipped';
        foreach ((array) ($resource['attendees'] ?? array()) as $attendee) {
            kbc_events_suite_upsert_attendee($attendee, 0, (string) ($resource['event_id'] ?? ''));
            $state = 'updated';
        }
    } else {
        $state = 'ignored';
    }
    kbc_events_suite_log('Eventbrite registration webhook processed', array('action'=>$action,'state'=>$state), 'info');
    return new WP_REST_Response(array('ok'=>true,'action'=>$action,'state'=>$state), 200);
}

function kbc_events_suite_webhook_url() {
    $secret = (string) get_option('kbc_events_suite_webhook_secret', '');
    return $secret ? rest_url('kbc-events-suite/v1/eventbrite/' . rawurlencode($secret)) : '';
}
