<?php
if (!defined('ABSPATH')) {
    exit;
}


function kbc_events_suite_event_field_defaults() {
    $defaults = array(
        'title'          => 'event_title',
        'description'    => 'description',
        'summary'        => 'short_description',
        'start_date'     => 'event_start_date',
        'end_date'       => 'end_event_date_copy',
        'start_time'     => 'start_time',
        'end_time'       => 'end_time',
        'location'       => 'location',
        'map'            => 'map',
        'status'         => 'event_status',
        'booking_url'    => 'booking_url',
        'category_name'  => 'category_',
        'image'          => 'image',
        'highlights_url' => 'view_highlights',
        'gallery_url'    => 'view_gallery_',
    );

    return apply_filters('kbc_events_suite_event_field_defaults', $defaults);
}

function kbc_events_suite_event_field_labels() {
    return array(
        'title'          => __('Event title field', 'kbc-events-suite-pro'),
        'description'    => __('Description field', 'kbc-events-suite-pro'),
        'summary'        => __('Short description field', 'kbc-events-suite-pro'),
        'start_date'     => __('Start date field', 'kbc-events-suite-pro'),
        'end_date'       => __('End date field', 'kbc-events-suite-pro'),
        'start_time'     => __('Start time field', 'kbc-events-suite-pro'),
        'end_time'       => __('End time field', 'kbc-events-suite-pro'),
        'location'       => __('Location field', 'kbc-events-suite-pro'),
        'map'            => __('Map/address field', 'kbc-events-suite-pro'),
        'status'         => __('Status field', 'kbc-events-suite-pro'),
        'booking_url'    => __('Registration URL field', 'kbc-events-suite-pro'),
        'category_name'  => __('Imported category text field', 'kbc-events-suite-pro'),
        'image'          => __('Image field', 'kbc-events-suite-pro'),
        'highlights_url' => __('Highlights URL field', 'kbc-events-suite-pro'),
        'gallery_url'    => __('Gallery URL field', 'kbc-events-suite-pro'),
    );
}

function kbc_events_suite_legacy_event_field_map() {
    return array(
        'event_title'         => 'title',
        'description'         => 'description',
        'short_description'   => 'summary',
        'event_start_date'    => 'start_date',
        'end_event_date_copy' => 'end_date',
        'start_time'          => 'start_time',
        'end_time'            => 'end_time',
        'location'            => 'location',
        'map'                 => 'map',
        'event_status'        => 'status',
        'booking_url'         => 'booking_url',
        'category_'           => 'category_name',
        'image'               => 'image',
        'view_highlights'     => 'highlights_url',
        'view_gallery_'       => 'gallery_url',
    );
}

function kbc_events_suite_field_key($logical_field) {
    $logical_field = sanitize_key($logical_field);
    $defaults = kbc_events_suite_event_field_defaults();

    if (!isset($defaults[$logical_field])) {
        return '';
    }

    $field_key = sanitize_key((string) get_option('kbc_events_suite_field_' . $logical_field, $defaults[$logical_field]));

    return $field_key !== '' ? $field_key : $defaults[$logical_field];
}

function kbc_events_suite_storage_field_name($field_name) {
    $field_name = sanitize_key($field_name);
    if ($field_name === '') {
        return '';
    }

    $legacy_map = kbc_events_suite_legacy_event_field_map();
    if (isset($legacy_map[$field_name])) {
        return kbc_events_suite_field_key($legacy_map[$field_name]);
    }

    return $field_name;
}

function kbc_events_suite_field_source_name($field_name) {
    $field_name = sanitize_key($field_name);
    if ($field_name === '') {
        return '';
    }

    $legacy_map = kbc_events_suite_legacy_event_field_map();
    if (isset($legacy_map[$field_name])) {
        return $field_name;
    }

    foreach (kbc_events_suite_event_field_defaults() as $logical => $default_key) {
        if ($field_name === kbc_events_suite_field_key($logical)) {
            return sanitize_key($default_key);
        }
    }

    return $field_name;
}

function kbc_events_suite_parse_slug_list($value) {
    if (is_array($value)) {
        $items = $value;
    } else {
        $items = preg_split('/[\s,|]+/', (string) $value);
    }

    $slugs = array();
    foreach ((array) $items as $item) {
        $slug = sanitize_title(trim((string) $item));
        if ($slug !== '') {
            $slugs[] = $slug;
        }
    }

    return array_values(array_unique($slugs));
}

function kbc_events_suite_get_register_event_post_type_mode() {
    $mode = sanitize_key((string) get_option('kbc_events_suite_register_event_post_type', 'auto'));

    return in_array($mode, array('auto', 'yes', 'no'), true) ? $mode : 'auto';
}

function kbc_events_suite_should_register_event_post_type() {
    return kbc_events_suite_get_register_event_post_type_mode() !== 'no';
}

function kbc_events_suite_event_post_type_labels() {
    $singular = trim((string) get_option('kbc_events_suite_event_singular_label', __('Event', 'kbc-events-suite-pro')));
    $plural = trim((string) get_option('kbc_events_suite_event_plural_label', __('Events', 'kbc-events-suite-pro')));

    return array(
        'singular' => $singular !== '' ? $singular : __('Event', 'kbc-events-suite-pro'),
        'plural'   => $plural !== '' ? $plural : __('Events', 'kbc-events-suite-pro'),
    );
}

function kbc_events_suite_event_archive_slug() {
    $slug = sanitize_title((string) get_option('kbc_events_suite_event_archive_slug', 'events'));

    return $slug !== '' ? $slug : 'events';
}

function kbc_events_suite_taxonomy_rewrite_slug() {
    $slug = sanitize_title((string) get_option('kbc_events_suite_taxonomy_rewrite_slug', 'event-category'));

    return $slug !== '' ? $slug : 'event-category';
}

function kbc_events_suite_normalise_date_scope($scope, $fallback = 'upcoming') {
    $scope = sanitize_key($scope);
    if ($scope === 'past') {
        $scope = 'ended';
    }
    if ($scope === 'future') {
        $scope = 'upcoming';
    }

    return in_array($scope, array('upcoming', 'ended', 'all'), true) ? $scope : $fallback;
}

function kbc_events_suite_date_scope_meta_query($scope, $today_ymd = '') {
    $scope = kbc_events_suite_normalise_date_scope($scope, 'all');
    $today_ymd = $today_ymd ?: current_datetime()->format('Ymd');

    if ($scope === 'ended') {
        return array(
            'relation' => 'OR',
            array(
                'key'     => '_kbc_event_end_ymd',
                'value'   => $today_ymd,
                'compare' => '<',
                'type'    => 'NUMERIC',
            ),
            array(
                'relation' => 'AND',
                array('key' => '_kbc_event_end_ymd', 'compare' => 'NOT EXISTS'),
                array(
                    'key'     => '_kbc_event_start_ymd',
                    'value'   => $today_ymd,
                    'compare' => '<',
                    'type'    => 'NUMERIC',
                ),
            ),
        );
    }

    if ($scope === 'upcoming') {
        return array(
            'relation' => 'OR',
            array(
                'key'     => '_kbc_event_end_ymd',
                'value'   => $today_ymd,
                'compare' => '>=',
                'type'    => 'NUMERIC',
            ),
            array(
                'relation' => 'AND',
                array('key' => '_kbc_event_end_ymd', 'compare' => 'NOT EXISTS'),
                array(
                    'key'     => '_kbc_event_start_ymd',
                    'value'   => $today_ymd,
                    'compare' => '>=',
                    'type'    => 'NUMERIC',
                ),
            ),
        );
    }

    return array();
}

function kbc_events_suite_event_post_type() {
    $post_type = get_option('kbc_events_suite_event_post_type', KBC_EVENTS_SUITE_EVENT_POST_TYPE);
    $post_type = sanitize_key($post_type);

    return $post_type ? $post_type : KBC_EVENTS_SUITE_EVENT_POST_TYPE;
}

function kbc_events_suite_taxonomy() {
    $taxonomy = get_option('kbc_events_suite_taxonomy', KBC_EVENTS_SUITE_TAXONOMY);
    $taxonomy = sanitize_key($taxonomy);

    return $taxonomy ? $taxonomy : KBC_EVENTS_SUITE_TAXONOMY;
}

function kbc_events_suite_get_setting($key, $default = '') {
    $value = get_option('kbc_events_suite_' . $key, null);

    return $value === null ? $default : $value;
}

function kbc_events_suite_get_int_setting($key, $default = 0) {
    return absint(kbc_events_suite_get_setting($key, $default));
}

function kbc_events_suite_asset_url($path) {
    return KBC_EVENTS_SUITE_URL . ltrim($path, '/');
}

function kbc_events_suite_get_button_label($state) {
    $defaults = array(
        'open'       => __('Secure Your Seat', 'kbc-events-suite-pro'),
        'details'    => __('More Details', 'kbc-events-suite-pro'),
        'closed'     => __('Registration Closed', 'kbc-events-suite-pro'),
        'highlights' => __('See Event Highlights', 'kbc-events-suite-pro'),
    );

    $labels = get_option('kbc_events_suite_button_labels', array());
    if (!is_array($labels)) {
        $labels = array();
    }

    return isset($labels[$state]) && $labels[$state] !== ''
        ? $labels[$state]
        : ($defaults[$state] ?? __('View Event', 'kbc-events-suite-pro'));
}

function kbc_events_suite_get_highlights_target($event_id) {
    $event_id = absint($event_id);

    return get_permalink($event_id);
}

function kbc_events_suite_get_fallback_image_url($size = 'large') {
    $attachment_id = absint(get_option('kbc_events_suite_fallback_image_id', 0));
    if ($attachment_id) {
        $url = wp_get_attachment_image_url($attachment_id, $size);
        if ($url) {
            return esc_url_raw($url);
        }
    }

    return kbc_events_suite_normalise_url_value(get_option('kbc_events_suite_fallback_image_url', ''));
}

function kbc_events_suite_do_not_overwrite_fields() {
    $fields = get_option('kbc_events_suite_do_not_overwrite_fields', array());

    return is_array($fields) ? array_values(array_unique(array_map('sanitize_key', $fields))) : array();
}

function kbc_events_suite_preserve_manual_edits() {
    return get_option('kbc_events_suite_preserve_manual_edits', 'yes') === 'yes';
}

function kbc_events_suite_elementor_selector_defaults() {
    return array(
        'card_selector'              => '.e-loop-item, .elementor-loop-item, article',
        'date_selector'              => '.event-start-date',
        'start_time_selector'        => '.event-start-time',
        'end_date_selector'          => '.event-end-date',
        'end_time_selector'          => '.event-end-time',
        'secure_selector'            => '.Secure-Seat',
        'details_selector'           => '.Event-View',
        'highlights_url_selector'    => '.event-highlights-url',
        'highlights_button_selector' => '.Event-Highlights, .event-highlights-button, .kbc-event-highlights-button',
    );
}

function kbc_events_suite_get_elementor_selector($key) {
    $key = sanitize_key($key);
    $defaults = kbc_events_suite_elementor_selector_defaults();
    if (!isset($defaults[$key])) {
        return '';
    }

    $value = trim((string) get_option('kbc_events_suite_elementor_' . $key, $defaults[$key]));

    return $value !== '' ? $value : $defaults[$key];
}

/**
 * Legacy compatibility helper. New Eventbrite writes use the source-aware
 * protection layer in includes/core/meta.php.
 */
function kbc_events_suite_should_update_field($post_id, $field_name, $value) {
    $field_name = sanitize_key($field_name);
    $protected_fields = kbc_events_suite_do_not_overwrite_fields();

    if (!in_array($field_name, $protected_fields, true)) {
        return true;
    }

    $existing = kbc_events_suite_get_meta($post_id, $field_name);

    return kbc_events_suite_meta_value_is_empty($existing);
}

function kbc_events_suite_get_design_class() {
    $preset = sanitize_key(get_option('kbc_events_suite_design_preset', 'gold'));

    return 'kbc-design-' . ($preset ?: 'gold');
}

function kbc_events_suite_hex_or_default($value, $default) {
    $value = sanitize_hex_color($value);

    return $value ? $value : $default;
}

function kbc_events_suite_sanitise_remote_event_action($value, $default = 'draft') {
    $value = sanitize_key($value);
    $allowed = array('keep', 'draft', 'private', 'trash');

    return in_array($value, $allowed, true) ? $value : $default;
}

function kbc_events_suite_get_event_title($event_id) {
    $event_id = absint($event_id);
    if (!$event_id) {
        return '';
    }

    $post_title = (string) get_post_field('post_title', $event_id, 'raw');
    $event_title = kbc_events_suite_get_meta($event_id, 'event_title');
    $source_title = kbc_events_suite_get_eventbrite_source_value($event_id, 'post_title', null, $has_source);

    /* A manually edited native WordPress title is canonical. */
    if ($has_source && !kbc_events_suite_values_equal($post_title, $source_title)) {
        return $post_title;
    }

    return $event_title !== '' ? kbc_events_suite_normalise_text_value($event_title) : $post_title;
}
