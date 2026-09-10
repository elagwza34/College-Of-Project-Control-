<?php
if (!defined('ABSPATH')) {
    exit;
}

function kbc_events_suite_activate() {
    if (function_exists('kbc_events_suite_install_registration_tables')) {
        kbc_events_suite_install_registration_tables();
    }
    if (function_exists('kbc_events_suite_register_main_event_post_type')) {
        kbc_events_suite_register_main_event_post_type();
    }
    kbc_events_suite_register_taxonomy();
    kbc_events_suite_register_post_types();

    if (function_exists('kbc_events_suite_schedule_sync')) {
        kbc_events_suite_schedule_sync();
    }
    if (function_exists('kbc_events_suite_schedule_registration_jobs')) {
        kbc_events_suite_schedule_registration_jobs();
    }

    if (function_exists('kbc_events_suite_initialize_missing_event_order')) {
        kbc_events_suite_initialize_missing_event_order(true);
    }

    flush_rewrite_rules();
}
register_activation_hook(KBC_EVENTS_SUITE_FILE, 'kbc_events_suite_activate');

function kbc_events_suite_deactivate() {
    if (function_exists('kbc_events_suite_clear_schedule')) {
        kbc_events_suite_clear_schedule();
    }

    wp_clear_scheduled_hook('kbc_events_suite_process_upgrade_batch');
    wp_clear_scheduled_hook('kbc_events_suite_attendee_sync_cron');
    wp_clear_scheduled_hook('kbc_events_suite_email_queue_cron');
    delete_option('kbc_events_suite_eventbrite_sync_lock');
    delete_transient('kbc_events_suite_upgrade_260_lock');
    flush_rewrite_rules();
}
register_deactivation_hook(KBC_EVENTS_SUITE_FILE, 'kbc_events_suite_deactivate');
