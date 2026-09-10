<?php
if (!defined('ABSPATH')) {
    exit;
}

function kbc_events_suite_enqueue_frontend_assets($include_event_map = false) {
    static $assets_enqueued = false;
    static $map_localised = false;

    if (!$assets_enqueued) {
        $assets_enqueued = true;

        $primary = kbc_events_suite_hex_or_default(get_option('kbc_events_suite_primary_colour', '#E2AF6D'), '#E2AF6D');
        $secondary = kbc_events_suite_hex_or_default(get_option('kbc_events_suite_secondary_colour', '#E2AF6D'), '#E2AF6D');
        $accent = kbc_events_suite_hex_or_default(get_option('kbc_events_suite_accent_colour', '#E2AF6D'), '#E2AF6D');

        wp_enqueue_style('kbc-events-suite-frontend', kbc_events_suite_asset_url('assets/css/frontend.css'), array(), KBC_EVENTS_SUITE_VERSION);
        wp_add_inline_style('kbc-events-suite-frontend', ":root{--kbc-events-primary:{$primary};--kbc-events-secondary:{$secondary};--kbc-events-accent:{$accent};}");
        wp_enqueue_script('kbc-events-suite-frontend', kbc_events_suite_asset_url('assets/js/frontend.js'), array(), KBC_EVENTS_SUITE_VERSION, true);
    }

    if ($include_event_map && !$map_localised) {
        $map_localised = true;
        wp_localize_script('kbc-events-suite-frontend', 'KBCEventsSuitePublicEvents', kbc_events_suite_get_frontend_event_timing_map());
    }
}
