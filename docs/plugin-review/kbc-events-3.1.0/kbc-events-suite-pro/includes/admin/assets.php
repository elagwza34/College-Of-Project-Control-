<?php
if (!defined('ABSPATH')) {
    exit;
}

function kbc_events_suite_admin_scripts($hook) {
    $screen = function_exists('get_current_screen') ? get_current_screen() : null;
    if (!$screen || !in_array($screen->post_type, array('kbc_agenda_session', 'kbc_agenda_track', 'kbc_event_partner'), true)) {
        return;
    }

    wp_enqueue_media();
    wp_enqueue_script('kbc-events-suite-admin-media', kbc_events_suite_asset_url('assets/js/admin-media.js'), array('jquery'), KBC_EVENTS_SUITE_VERSION, true);
}
add_action('admin_enqueue_scripts', 'kbc_events_suite_admin_scripts');
