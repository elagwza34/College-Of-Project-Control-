<?php
/**
 * Events Suite Pro uninstall cleanup.
 *
 * Event posts, agenda content, partners, media and editorial metadata are kept
 * deliberately. Only plugin configuration, credentials, locks, logs and
 * transients are removed.
 */

if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

function kbc_events_suite_uninstall_current_site() {
    global $wpdb;

    wp_clear_scheduled_hook('kbc_events_suite_eventbrite_sync_cron');
    wp_clear_scheduled_hook('kbc_events_suite_process_upgrade_batch');
    wp_clear_scheduled_hook('kbc_events_suite_attendee_sync_cron');
    wp_clear_scheduled_hook('kbc_events_suite_email_queue_cron');

    $plugin_prefix = $wpdb->esc_like('kbc_events_suite_') . '%';
    $description_transient = $wpdb->esc_like('_transient_kbc_eb_desc_') . '%';
    $description_timeout = $wpdb->esc_like('_transient_timeout_kbc_eb_desc_') . '%';
    $plugin_transient = $wpdb->esc_like('_transient_kbc_events_suite_') . '%';
    $plugin_timeout = $wpdb->esc_like('_transient_timeout_kbc_events_suite_') . '%';

    $wpdb->query($wpdb->prepare("DELETE FROM {$wpdb->options} WHERE option_name LIKE %s", $plugin_prefix));
    $wpdb->query($wpdb->prepare("DELETE FROM {$wpdb->options} WHERE option_name LIKE %s", $description_transient));
    $wpdb->query($wpdb->prepare("DELETE FROM {$wpdb->options} WHERE option_name LIKE %s", $description_timeout));
    $wpdb->query($wpdb->prepare("DELETE FROM {$wpdb->options} WHERE option_name LIKE %s", $plugin_transient));
    $wpdb->query($wpdb->prepare("DELETE FROM {$wpdb->options} WHERE option_name LIKE %s", $plugin_timeout));

    wp_cache_flush();

    /* Registrations contain personal data and are removed on uninstall. */
    $wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}kbc_event_email_queue");
    $wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}kbc_event_registrations");
}

if (is_multisite()) {
    $site_ids = get_sites(array('fields' => 'ids', 'number' => 0));
    foreach ($site_ids as $site_id) {
        switch_to_blog($site_id);
        kbc_events_suite_uninstall_current_site();
        restore_current_blog();
    }
} else {
    kbc_events_suite_uninstall_current_site();
}
