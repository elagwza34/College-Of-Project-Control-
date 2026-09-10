<?php
if (!defined('ABSPATH')) {
    exit;
}

function kbc_events_suite_admin_menu() {
    $parent = 'edit.php?post_type=' . kbc_events_suite_event_post_type();

    add_submenu_page($parent, 'Eventbrite Sync', 'Eventbrite Sync', 'manage_options', 'kbc-events-suite-eventbrite-sync', 'kbc_events_suite_render_eventbrite_settings_page');
    add_submenu_page($parent, 'Event Registrations', 'Registrations', 'manage_options', 'kbc-events-suite-registrations', 'kbc_events_suite_render_registrations_page');
    add_submenu_page($parent, 'Email Automations', 'Email Automations', 'manage_options', 'kbc-events-suite-email-automations', 'kbc_events_suite_render_email_automations_page');
    add_submenu_page($parent, 'Zoom Integration', 'Zoom Integration', 'manage_options', 'kbc-events-suite-zoom', 'kbc_events_suite_render_zoom_settings_page');
    add_submenu_page($parent, 'Re-order Events', 'Re-order', 'manage_options', 'kbc-events-suite-reorder', 'kbc_events_suite_render_reorder_page');
    add_submenu_page($parent, 'Events Suite Settings', 'Suite Settings', 'manage_options', 'kbc-events-suite-settings', 'kbc_events_suite_render_settings_page');
    add_submenu_page($parent, 'Events Suite Logs', 'Suite Logs', 'manage_options', 'kbc-events-suite-logs', 'kbc_events_suite_render_logs_page');
    add_submenu_page($parent, 'Events Suite Tools', 'Suite Tools', 'manage_options', 'kbc-events-suite-tools', 'kbc_events_suite_render_tools_page');
    add_submenu_page($parent, 'Events Suite Help', 'Events Suite', 'manage_options', 'kbc-events-suite-help', 'kbc_events_suite_render_help_page');
}
add_action('admin_menu', 'kbc_events_suite_admin_menu');
