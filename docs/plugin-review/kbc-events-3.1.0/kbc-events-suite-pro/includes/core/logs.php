<?php
if (!defined('ABSPATH')) {
    exit;
}

function kbc_events_suite_log($message, $context = array(), $level = 'info') {
    $logs = get_option('kbc_events_suite_logs', array());
    if (!is_array($logs)) {
        $logs = array();
    }

    $logs[] = array(
        'time'    => current_time('mysql'),
        'level'   => sanitize_key($level),
        'message' => sanitize_text_field($message),
        'context' => is_array($context) ? wp_json_encode($context) : sanitize_text_field((string) $context),
    );

    $max = absint(get_option('kbc_events_suite_log_limit', 150));
    if ($max < 25) {
        $max = 25;
    }

    if (count($logs) > $max) {
        $logs = array_slice($logs, -1 * $max);
    }

    update_option('kbc_events_suite_logs', $logs, false);
}

function kbc_events_suite_get_logs() {
    $logs = get_option('kbc_events_suite_logs', array());

    return is_array($logs) ? array_reverse($logs) : array();
}

function kbc_events_suite_clear_logs() {
    update_option('kbc_events_suite_logs', array(), false);
}
