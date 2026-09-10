<?php
if (!defined('ABSPATH')) { exit; }

function kbc_events_suite_registrations_table() {
    global $wpdb;
    return $wpdb->prefix . 'kbc_event_registrations';
}

function kbc_events_suite_email_queue_table() {
    global $wpdb;
    return $wpdb->prefix . 'kbc_event_email_queue';
}

function kbc_events_suite_install_registration_tables() {
    global $wpdb;
    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    $charset = $wpdb->get_charset_collate();
    $registrations = kbc_events_suite_registrations_table();
    $queue = kbc_events_suite_email_queue_table();

    dbDelta("CREATE TABLE {$registrations} (
        id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        eventbrite_attendee_id varchar(64) NOT NULL,
        eventbrite_order_id varchar(64) NOT NULL DEFAULT '',
        eventbrite_event_id varchar(64) NOT NULL DEFAULT '',
        wordpress_event_id bigint(20) unsigned NOT NULL DEFAULT 0,
        first_name varchar(190) NOT NULL DEFAULT '',
        last_name varchar(190) NOT NULL DEFAULT '',
        email varchar(190) NOT NULL DEFAULT '',
        phone varchar(80) NOT NULL DEFAULT '',
        ticket_class_id varchar(64) NOT NULL DEFAULT '',
        ticket_name varchar(190) NOT NULL DEFAULT '',
        quantity smallint unsigned NOT NULL DEFAULT 1,
        registration_status varchar(40) NOT NULL DEFAULT 'attending',
        checked_in tinyint(1) NOT NULL DEFAULT 0,
        refunded tinyint(1) NOT NULL DEFAULT 0,
        cancelled tinyint(1) NOT NULL DEFAULT 0,
        marketing_consent tinyint(1) NOT NULL DEFAULT 0,
        consent_source varchar(120) NOT NULL DEFAULT '',
        registered_at datetime NULL,
        remote_updated_at datetime NULL,
        last_synced_at datetime NOT NULL,
        raw_hash char(64) NOT NULL DEFAULT '',
        PRIMARY KEY  (id),
        UNIQUE KEY attendee (eventbrite_attendee_id),
        KEY event (eventbrite_event_id),
        KEY wp_event (wordpress_event_id),
        KEY email (email),
        KEY status (registration_status)
    ) {$charset};");

    dbDelta("CREATE TABLE {$queue} (
        id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        registration_id bigint(20) unsigned NOT NULL,
        wordpress_event_id bigint(20) unsigned NOT NULL DEFAULT 0,
        automation_key varchar(40) NOT NULL,
        recipient_email varchar(190) NOT NULL,
        subject text NOT NULL,
        message longtext NOT NULL,
        scheduled_at datetime NOT NULL,
        sent_at datetime NULL,
        status varchar(20) NOT NULL DEFAULT 'pending',
        attempts tinyint unsigned NOT NULL DEFAULT 0,
        last_error text NULL,
        created_at datetime NOT NULL,
        PRIMARY KEY  (id),
        UNIQUE KEY occurrence (registration_id,automation_key),
        KEY due (status,scheduled_at),
        KEY event (wordpress_event_id)
    ) {$charset};");

    update_option('kbc_events_suite_registrations_db_version', '1.0', false);
    if (!get_option('kbc_events_suite_webhook_secret')) {
        update_option('kbc_events_suite_webhook_secret', wp_generate_password(32, false, false), false);
    }
}

function kbc_events_suite_maybe_install_registration_tables() {
    if (get_option('kbc_events_suite_registrations_db_version') !== '1.0') {
        kbc_events_suite_install_registration_tables();
    }
}
add_action('admin_init', 'kbc_events_suite_maybe_install_registration_tables');

function kbc_events_suite_delete_registration($registration_id) {
    global $wpdb;
    $registration_id = absint($registration_id);
    if (!$registration_id) { return false; }
    $wpdb->delete(kbc_events_suite_email_queue_table(), array('registration_id' => $registration_id), array('%d'));
    return false !== $wpdb->delete(kbc_events_suite_registrations_table(), array('id' => $registration_id), array('%d'));
}
