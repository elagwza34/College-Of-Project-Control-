<?php
if (!defined('ABSPATH')) {
    exit;
}

function kbc_events_suite_sync_single_event_admin_action() {
    $post_id = isset($_GET['post_id']) ? absint($_GET['post_id']) : 0;
    if (!$post_id || get_post_type($post_id) !== kbc_events_suite_event_post_type()) {
        wp_die(esc_html__('Invalid event.', 'kbc-events-suite-pro'));
    }

    if (!current_user_can('edit_post', $post_id)) {
        wp_die(esc_html__('Permission denied.', 'kbc-events-suite-pro'));
    }

    check_admin_referer('kbc_events_suite_sync_single_event_' . $post_id);

    $result = kbc_events_suite_sync_single_event($post_id);
    $redirect = get_edit_post_link($post_id, 'raw');

    if (is_wp_error($result)) {
        kbc_events_suite_log('Single event sync failed', array(
            'post_id' => $post_id,
            'error'   => $result->get_error_message(),
        ), 'error');
        $redirect = add_query_arg('kbc_sync_error', rawurlencode($result->get_error_message()), $redirect);
    } else {
        $redirect = add_query_arg('kbc_sync_done', '1', $redirect);
    }

    wp_safe_redirect($redirect);
    exit;
}
add_action('admin_post_kbc_events_suite_sync_single_event', 'kbc_events_suite_sync_single_event_admin_action');

add_action('admin_notices', function () {
    if (!empty($_GET['kbc_sync_done'])) {
        echo '<div class="notice notice-success is-dismissible"><p>' . esc_html__('Event synced from Eventbrite. Manual edits were preserved.', 'kbc-events-suite-pro') . '</p></div>';
    }

    if (!empty($_GET['kbc_sync_error'])) {
        echo '<div class="notice notice-error is-dismissible"><p>' . esc_html__('Eventbrite sync error:', 'kbc-events-suite-pro') . ' ' . esc_html(wp_unslash($_GET['kbc_sync_error'])) . '</p></div>';
    }
});
