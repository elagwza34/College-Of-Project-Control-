<?php
if (!defined('ABSPATH')) {
    exit;
}

function kbc_events_suite_add_default_options_260() {
    $defaults = array(
        'kbc_events_suite_preserve_manual_edits'                => 'yes',
        'kbc_events_suite_filter_result_limit'                  => 100,
        'kbc_events_suite_schema_enabled'                       => 'yes',
        'kbc_events_suite_eventbrite_max_pages'                 => 20,
        'kbc_events_suite_eventbrite_reconcile'                 => 'yes',
        'kbc_events_suite_eventbrite_reconcile_limit'           => 30,
        'kbc_events_suite_eventbrite_cancelled_action'          => 'draft',
        'kbc_events_suite_eventbrite_missing_action'            => 'draft',
        'kbc_events_suite_eventbrite_new_post_status'           => 'publish',
        'kbc_events_suite_eventbrite_auto_create_terms'         => 'yes',
        'kbc_events_suite_elementor_loop_enabled'               => 'yes',
        'kbc_events_suite_elementor_card_selector'              => '.e-loop-item, .elementor-loop-item, article',
        'kbc_events_suite_elementor_date_selector'              => '.event-start-date',
        'kbc_events_suite_elementor_start_time_selector'        => '.event-start-time',
        'kbc_events_suite_elementor_end_date_selector'          => '.event-end-date',
        'kbc_events_suite_elementor_end_time_selector'          => '.event-end-time',
        'kbc_events_suite_elementor_secure_selector'            => '.Secure-Seat',
        'kbc_events_suite_elementor_details_selector'           => '.Event-View',
        'kbc_events_suite_elementor_highlights_url_selector'    => '.event-highlights-url',
        'kbc_events_suite_elementor_highlights_button_selector' => '.Event-Highlights, .event-highlights-button, .kbc-event-highlights-button',
    );

    foreach ($defaults as $option => $value) {
        add_option($option, $value);
    }
}

function kbc_events_suite_add_default_options_270() {
    $defaults = array(
        'kbc_events_suite_register_event_post_type' => 'auto',
        'kbc_events_suite_event_singular_label'     => 'Event',
        'kbc_events_suite_event_plural_label'       => 'Events',
        'kbc_events_suite_event_archive_slug'       => 'events',
        'kbc_events_suite_taxonomy_rewrite_slug'    => 'event-category',
        'kbc_events_suite_default_date_scope'       => 'upcoming',
        'kbc_events_suite_default_date_tabs'        => 'no',
        'kbc_events_suite_default_active_tab'       => 'upcoming',
        'kbc_events_suite_upcoming_label'           => 'Upcoming Events',
        'kbc_events_suite_ended_label'              => 'Ended Events',
    );

    foreach (kbc_events_suite_event_field_defaults() as $logical_field => $default_key) {
        $defaults['kbc_events_suite_field_' . $logical_field] = $default_key;
    }

    foreach ($defaults as $option => $value) {
        add_option($option, $value);
    }
}

function kbc_events_suite_maybe_run_upgrade() {
    $installed = get_option('kbc_events_suite_installed_version', '0.0.0');

    if (version_compare($installed, KBC_EVENTS_SUITE_VERSION, '>=')) {
        return;
    }

    if (version_compare($installed, '2.3.0', '<')) {
        $gold = '#E2AF6D';

        $primary = strtolower((string) get_option('kbc_events_suite_primary_colour', ''));
        $secondary = strtolower((string) get_option('kbc_events_suite_secondary_colour', ''));
        $accent = strtolower((string) get_option('kbc_events_suite_accent_colour', ''));

        if (!$primary || in_array($primary, array('#5b16df', '#6b2cf5', '#7a3cff'), true)) {
            update_option('kbc_events_suite_primary_colour', $gold);
        }

        if (!$secondary || in_array($secondary, array('#7a3cff', '#5b16df', '#6b2cf5'), true)) {
            update_option('kbc_events_suite_secondary_colour', $gold);
        }

        if (!$accent || in_array($accent, array('#d9a85f', '#e6b260'), true)) {
            update_option('kbc_events_suite_accent_colour', $gold);
        }

        update_option('kbc_events_suite_design_preset', 'gold');
        add_option('kbc_events_suite_highlights_after_days', 1);
    }

    if (version_compare($installed, '2.6.0', '<')) {
        kbc_events_suite_add_default_options_260();

        /*
         * Existing sites are migrated in small admin/cron batches. Source
         * snapshots are intentionally not created here: first sync safely
         * treats unexplained local differences as manual edits.
         */
        update_option('kbc_events_suite_upgrade_260_pending', 'yes', false);
        delete_transient('kbc_events_suite_event_order_checked');
        kbc_events_suite_clear_frontend_event_timing_map_cache();
        kbc_events_suite_schedule_upgrade_batch();
    }

    if (version_compare($installed, '2.7.0', '<')) {
        kbc_events_suite_add_default_options_270();
        kbc_events_suite_clear_frontend_event_timing_map_cache();
    }

    if (version_compare($installed, '2.8.0', '<')) {
        kbc_events_suite_install_registration_tables();
        kbc_events_suite_schedule_registration_jobs();
    }

    if (version_compare($installed, '2.9.0', '<')) {
        add_option('kbc_events_suite_welcome_enabled', 'no');
        add_option('kbc_events_suite_reminders_enabled', 'no');
        add_option('kbc_events_suite_email_from_name', get_bloginfo('name'));
        add_option('kbc_events_suite_email_from_address', get_option('admin_email'));
        add_option('kbc_events_suite_email_reply_to', get_option('admin_email'));
    }

    if (version_compare($installed, '3.0.0', '<')) {
        add_option('kbc_events_suite_zoom_enabled', 'no');
        add_option('kbc_events_suite_zoom_user_id', 'me');
        add_option('kbc_events_suite_zoom_append_email', 'yes');
    }

    if (version_compare($installed, '3.1.0', '<')) {
        add_option('kbc_events_suite_email_transport', 'wordpress');
        add_option('kbc_events_suite_smtp_username', 'events@kentbusinesscollege.org');
        add_option('kbc_events_suite_smtp_password_encrypted', '');
    }

    update_option('kbc_events_suite_installed_version', KBC_EVENTS_SUITE_VERSION);
}
add_action('init', 'kbc_events_suite_maybe_run_upgrade', 1);

function kbc_events_suite_schedule_upgrade_batch() {
    if (!wp_next_scheduled('kbc_events_suite_process_upgrade_batch')) {
        wp_schedule_single_event(time() + 10, 'kbc_events_suite_process_upgrade_batch');
    }
}

function kbc_events_suite_process_upgrade_batch() {
    if (get_option('kbc_events_suite_upgrade_260_pending', 'no') !== 'yes') {
        return;
    }

    if (get_transient('kbc_events_suite_upgrade_260_lock')) {
        return;
    }

    set_transient('kbc_events_suite_upgrade_260_lock', 1, 2 * MINUTE_IN_SECONDS);

    try {
        $ids = get_posts(array(
            'post_type'      => kbc_events_suite_event_post_type(),
            'post_status'    => array('publish', 'future', 'draft', 'pending', 'private'),
            'posts_per_page' => 100,
            'fields'         => 'ids',
            'no_found_rows'  => true,
            'orderby'        => 'ID',
            'order'          => 'ASC',
            'meta_query'     => array(array(
                'key'     => '_kbc_events_suite_260_indexed',
                'compare' => 'NOT EXISTS',
            )),
        ));

        foreach ($ids as $post_id) {
            kbc_events_suite_update_event_date_indexes($post_id);
            if (function_exists('kbc_events_suite_assign_missing_event_order')) {
                kbc_events_suite_assign_missing_event_order($post_id);
            }
            update_post_meta($post_id, '_kbc_events_suite_260_indexed', 1);
        }

        if (count($ids) < 100) {
            delete_option('kbc_events_suite_upgrade_260_pending');
            kbc_events_suite_clear_frontend_event_timing_map_cache();
        } else {
            kbc_events_suite_schedule_upgrade_batch();
        }
    } finally {
        delete_transient('kbc_events_suite_upgrade_260_lock');
    }
}
add_action('kbc_events_suite_process_upgrade_batch', 'kbc_events_suite_process_upgrade_batch');

function kbc_events_suite_maybe_process_upgrade_batch_in_admin() {
    if (get_option('kbc_events_suite_upgrade_260_pending', 'no') === 'yes') {
        kbc_events_suite_process_upgrade_batch();
    }
}
add_action('admin_init', 'kbc_events_suite_maybe_process_upgrade_batch_in_admin', 20);
