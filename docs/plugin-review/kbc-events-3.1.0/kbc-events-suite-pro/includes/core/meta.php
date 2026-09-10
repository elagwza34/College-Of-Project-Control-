<?php
if (!defined('ABSPATH')) {
    exit;
}

function kbc_events_suite_get_meta($post_id, $key, $default = '') {
    $key = sanitize_key($key);
    $storage_key = function_exists('kbc_events_suite_storage_field_name')
        ? kbc_events_suite_storage_field_name($key)
        : $key;

    $keys_to_try = array_values(array_unique(array_filter(array($storage_key, $key))));

    foreach ($keys_to_try as $meta_key) {
        $value = get_post_meta($post_id, $meta_key, true);
        if ($value !== '' && $value !== null) {
            return $value;
        }

        if (function_exists('get_field')) {
            $acf_value = get_field($meta_key, $post_id);
            if ($acf_value !== '' && $acf_value !== null) {
                return $acf_value;
            }
        }
    }

    return $default;
}

function kbc_events_suite_normalise_url_value($value) {
    if (is_array($value)) {
        foreach (array('url', 'link', 'href') as $key) {
            if (!empty($value[$key])) {
                $value = $value[$key];
                break;
            }
        }
    }

    if (!is_scalar($value)) {
        return '';
    }

    $value = trim((string) $value);

    return $value && wp_http_validate_url($value) ? esc_url_raw($value) : '';
}

function kbc_events_suite_normalise_text_value($value) {
    if (is_array($value)) {
        foreach (array('address', 'name', 'label', 'title', 'text') as $key) {
            if (isset($value[$key]) && is_scalar($value[$key])) {
                return trim((string) $value[$key]);
            }
        }

        return '';
    }

    return is_scalar($value) ? trim((string) $value) : '';
}

function kbc_events_suite_get_url_meta($post_id, $key, $default = '') {
    $url = kbc_events_suite_normalise_url_value(kbc_events_suite_get_meta($post_id, $key));

    return $url ?: $default;
}

function kbc_events_suite_get_text_meta($post_id, $key, $default = '') {
    $text = kbc_events_suite_normalise_text_value(kbc_events_suite_get_meta($post_id, $key));

    return $text !== '' ? $text : $default;
}

function kbc_events_suite_meta_value_is_empty($value) {
    return $value === '' || $value === null || $value === array();
}

function kbc_events_suite_normalise_compare_value($value) {
    if (is_array($value)) {
        $normalised = array();
        foreach ($value as $key => $item) {
            $normalised[(string) $key] = kbc_events_suite_normalise_compare_value($item);
        }
        ksort($normalised);
        return $normalised;
    }

    if (is_object($value)) {
        return kbc_events_suite_normalise_compare_value(get_object_vars($value));
    }

    if (is_bool($value)) {
        return $value ? '1' : '0';
    }

    if ($value === null) {
        return '';
    }

    if (is_scalar($value)) {
        $value = str_replace(array("\r\n", "\r"), "\n", (string) $value);
        return trim($value);
    }

    return (string) $value;
}

function kbc_events_suite_values_equal($left, $right) {
    return kbc_events_suite_normalise_compare_value($left) === kbc_events_suite_normalise_compare_value($right);
}

function kbc_events_suite_eventbrite_source_meta_key($field_name) {
    return '_kbc_eventbrite_source_' . sanitize_key($field_name);
}

function kbc_events_suite_get_eventbrite_source_value($post_id, $field_name, $default = '', &$exists = null) {
    $meta_key = kbc_events_suite_eventbrite_source_meta_key($field_name);
    $exists = metadata_exists('post', $post_id, $meta_key);

    return $exists ? get_post_meta($post_id, $meta_key, true) : $default;
}

function kbc_events_suite_store_eventbrite_source_value($post_id, $field_name, $value) {
    /* update_post_meta() unslashes values internally; re-slash exact HTML/backslashes. */
    update_post_meta($post_id, kbc_events_suite_eventbrite_source_meta_key($field_name), wp_slash($value));
}

function kbc_events_suite_get_manual_overrides($post_id) {
    $overrides = get_post_meta($post_id, '_kbc_eventbrite_manual_overrides', true);
    if (!is_array($overrides)) {
        return array();
    }

    return array_values(array_unique(array_filter(array_map('sanitize_key', $overrides))));
}

function kbc_events_suite_set_manual_override($post_id, $field_name, $is_manual = true) {
    $field_name = sanitize_key($field_name);
    if (!$field_name) {
        return;
    }

    $overrides = kbc_events_suite_get_manual_overrides($post_id);

    if ($is_manual && !in_array($field_name, $overrides, true)) {
        $overrides[] = $field_name;
    } elseif (!$is_manual) {
        $overrides = array_values(array_diff($overrides, array($field_name)));
    }

    if ($overrides) {
        sort($overrides);
        update_post_meta($post_id, '_kbc_eventbrite_manual_overrides', $overrides);
    } else {
        delete_post_meta($post_id, '_kbc_eventbrite_manual_overrides');
    }
}

/** Pure decision helper used by the sync layer and regression tests. */
function kbc_events_suite_should_apply_synced_value(
    $current,
    $incoming,
    $previous_source,
    $has_previous_source,
    $manual_override,
    $hard_protected,
    $preserve_manual,
    $is_new,
    $force
) {
    if ($is_new || $force) {
        return true;
    }

    if ($hard_protected && !kbc_events_suite_meta_value_is_empty($current)) {
        return false;
    }

    if (!$preserve_manual) {
        return true;
    }

    if ($manual_override) {
        return false;
    }

    if ($has_previous_source) {
        return kbc_events_suite_values_equal($current, $previous_source);
    }

    /* Safe migration: a pre-existing different value is assumed manual. */
    if (!kbc_events_suite_meta_value_is_empty($current) && !kbc_events_suite_values_equal($current, $incoming)) {
        return false;
    }

    return true;
}

function kbc_events_suite_decide_synced_value($post_id, $field_name, $current, $incoming, $context = array()) {
    $field_name = sanitize_key($field_name);
    $context = wp_parse_args($context, array(
        'is_new'       => false,
        'force'        => false,
        'store_source' => true,
    ));

    $previous_source = kbc_events_suite_get_eventbrite_source_value($post_id, $field_name, '', $has_previous_source);
    $overrides = kbc_events_suite_get_manual_overrides($post_id);
    $protected = kbc_events_suite_do_not_overwrite_fields();
    $manual_override = in_array($field_name, $overrides, true);
    $hard_protected = in_array($field_name, $protected, true);

    $apply = kbc_events_suite_should_apply_synced_value(
        $current,
        $incoming,
        $previous_source,
        $has_previous_source,
        $manual_override,
        $hard_protected,
        kbc_events_suite_preserve_manual_edits(),
        !empty($context['is_new']),
        !empty($context['force'])
    );

    $reason = 'source_unchanged';

    if (!$apply) {
        if ($hard_protected && !kbc_events_suite_meta_value_is_empty($current)) {
            $reason = 'hard_protected';
        } elseif ($manual_override) {
            $reason = 'manual_override';
        } else {
            $reason = $has_previous_source ? 'manual_change_detected' : 'legacy_value_preserved';
            kbc_events_suite_set_manual_override($post_id, $field_name, true);
        }
    } elseif (!$hard_protected && kbc_events_suite_values_equal($current, $incoming)) {
        kbc_events_suite_set_manual_override($post_id, $field_name, false);
    }

    /* Store the latest remote source even when the visible local value is preserved. */
    if (!empty($context['store_source'])) {
        kbc_events_suite_store_eventbrite_source_value($post_id, $field_name, $incoming);
    }

    return array(
        'apply'  => $apply,
        'reason' => $reason,
    );
}

function kbc_events_suite_begin_syncing_post($post_id) {
    $post_id = absint($post_id);
    if (!$post_id) {
        return;
    }

    if (!isset($GLOBALS['kbc_events_suite_syncing_posts'])) {
        $GLOBALS['kbc_events_suite_syncing_posts'] = array();
    }

    $GLOBALS['kbc_events_suite_syncing_posts'][$post_id] = true;
}

function kbc_events_suite_end_syncing_post($post_id) {
    unset($GLOBALS['kbc_events_suite_syncing_posts'][absint($post_id)]);
}

function kbc_events_suite_is_syncing_post($post_id) {
    return !empty($GLOBALS['kbc_events_suite_syncing_posts'][absint($post_id)]);
}

function kbc_events_suite_write_acf_or_meta($post_id, $field_name, $value) {
    $storage_field_name = function_exists('kbc_events_suite_storage_field_name')
        ? kbc_events_suite_storage_field_name($field_name)
        : sanitize_key($field_name);

    if ($storage_field_name === '') {
        return;
    }

    $started_guard = !kbc_events_suite_is_syncing_post($post_id);
    if ($started_guard) {
        kbc_events_suite_begin_syncing_post($post_id);
    }

    try {
        $has_acf_field = function_exists('get_field_object')
            ? (bool) get_field_object($storage_field_name, $post_id, false, false)
            : false;

        if ($has_acf_field && function_exists('update_field')) {
            update_field($storage_field_name, $value, $post_id);
            return;
        }

        update_post_meta($post_id, $storage_field_name, wp_slash($value));
    } finally {
        if ($started_guard) {
            kbc_events_suite_end_syncing_post($post_id);
        }
    }
}

/**
 * Mirror a protected native WordPress value into its duplicate ACF/meta field
 * when that duplicate is empty or still owned by Eventbrite.
 */
function kbc_events_suite_mirror_manual_native_value($post_id, $duplicate_field, $manual_value, $incoming_source = '', $source_available = true) {
    $current = kbc_events_suite_get_meta($post_id, $duplicate_field);
    $previous_source = kbc_events_suite_get_eventbrite_source_value($post_id, $duplicate_field, '', $has_source);

    $source_owned = kbc_events_suite_meta_value_is_empty($current)
        || ($has_source && kbc_events_suite_values_equal($current, $previous_source))
        || (!$has_source && $source_available && kbc_events_suite_values_equal($current, $incoming_source));

    if ($source_owned && !kbc_events_suite_values_equal($current, $manual_value)) {
        kbc_events_suite_write_acf_or_meta($post_id, $duplicate_field, $manual_value);
    }

    kbc_events_suite_set_manual_override($post_id, $duplicate_field, true);
    if ($source_available) {
        kbc_events_suite_store_eventbrite_source_value($post_id, $duplicate_field, $incoming_source);
    }

    return $source_owned;
}

function kbc_events_suite_update_acf_or_meta($post_id, $field_name, $value, $context = array()) {
    $current = kbc_events_suite_get_meta($post_id, $field_name);
    $decision = kbc_events_suite_decide_synced_value($post_id, $field_name, $current, $value, $context);

    if ($decision['apply']) {
        kbc_events_suite_write_acf_or_meta($post_id, $field_name, $value);
    }

    return $decision;
}

/**
 * Decide whether a stored map value is still owned by Eventbrite and may be
 * removed so ACF can supply the field's configured default value.
 */
function kbc_events_suite_should_clear_synced_map_value(
    $stored_exists,
    $stored_value,
    $previous_source,
    $has_previous_source,
    $incoming_source,
    $has_incoming_source,
    $manual_override
) {
    if (!$stored_exists || kbc_events_suite_meta_value_is_empty($stored_value)) {
        return true;
    }

    if ($manual_override) {
        return false;
    }

    if ($has_previous_source && kbc_events_suite_values_equal($stored_value, $previous_source)) {
        return true;
    }

    if ($has_incoming_source && kbc_events_suite_values_equal($stored_value, $incoming_source)) {
        return true;
    }

    return false;
}

/**
 * Stop managing the ACF `map` field from Eventbrite.
 *
 * Source-owned values are deleted, not replaced with an empty string. This is
 * important because an absent value allows ACF to return its configured
 * default. A manually entered map value is left untouched.
 */
function kbc_events_suite_release_map_field_to_acf_default($post_id, $incoming_source = '') {
    $post_id = absint($post_id);
    if (!$post_id) {
        return array('released' => false, 'cleared' => false, 'preserved' => false);
    }

    $map_storage_field = function_exists('kbc_events_suite_storage_field_name')
        ? kbc_events_suite_storage_field_name('map')
        : 'map';
    $has_incoming_source = func_num_args() >= 2;
    $marker_key = '_kbc_events_suite_map_uses_acf_default';

    if (get_post_meta($post_id, $marker_key, true) === '1') {
        delete_post_meta($post_id, kbc_events_suite_eventbrite_source_meta_key('map'));
        kbc_events_suite_set_manual_override($post_id, 'map', false);

        return array('released' => true, 'cleared' => false, 'preserved' => false);
    }

    $stored_exists = metadata_exists('post', $post_id, $map_storage_field);
    $stored_value = $stored_exists ? get_post_meta($post_id, $map_storage_field, true) : '';
    $previous_source = kbc_events_suite_get_eventbrite_source_value($post_id, 'map', '', $has_previous_source);
    $manual_override = in_array('map', kbc_events_suite_get_manual_overrides($post_id), true);

    /*
     * Without a stored source, an incoming value or an explicit manual flag,
     * a non-empty legacy value cannot be classified safely. Leave it alone
     * until the next Eventbrite sync supplies the comparison value.
     */
    $can_classify = !$stored_exists
        || kbc_events_suite_meta_value_is_empty($stored_value)
        || $manual_override
        || $has_previous_source
        || $has_incoming_source;

    if (!$can_classify) {
        return array('released' => false, 'cleared' => false, 'preserved' => true);
    }

    $clear_value = kbc_events_suite_should_clear_synced_map_value(
        $stored_exists,
        $stored_value,
        $previous_source,
        $has_previous_source,
        $incoming_source,
        $has_incoming_source,
        $manual_override
    );

    $started_guard = !kbc_events_suite_is_syncing_post($post_id);
    if ($started_guard) {
        kbc_events_suite_begin_syncing_post($post_id);
    }

    try {
        if ($clear_value) {
            /* Do not save an empty value: delete it so ACF's default applies. */
            delete_post_meta($post_id, $map_storage_field);
        }

        delete_post_meta($post_id, kbc_events_suite_eventbrite_source_meta_key('map'));
        kbc_events_suite_set_manual_override($post_id, 'map', false);
        update_post_meta($post_id, $marker_key, '1');
    } finally {
        if ($started_guard) {
            kbc_events_suite_end_syncing_post($post_id);
        }
    }

    return array(
        'released'  => true,
        'cleared'   => $clear_value,
        'preserved' => !$clear_value && $stored_exists,
    );
}

function kbc_events_suite_track_manual_post_edits($post_id, $post, $update) {
    if (!$update || !$post || $post->post_type !== kbc_events_suite_event_post_type()) {
        return;
    }

    if (kbc_events_suite_is_syncing_post($post_id) || wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    $pairs = array(
        'post_title'   => $post->post_title,
        'post_content' => $post->post_content,
        'post_excerpt' => $post->post_excerpt,
    );

    foreach ($pairs as $field_name => $current) {
        $source = kbc_events_suite_get_eventbrite_source_value($post_id, $field_name, '', $has_source);
        if (!$has_source) {
            continue;
        }

        kbc_events_suite_set_manual_override(
            $post_id,
            $field_name,
            !kbc_events_suite_values_equal($current, $source)
        );
    }

    /* Keep duplicate ACF display fields aligned when only native WP fields were edited. */
    $title_source = kbc_events_suite_get_eventbrite_source_value($post_id, 'event_title', '', $has_event_title_source);
    $event_title = kbc_events_suite_get_meta($post_id, 'event_title');
    $post_title_source = kbc_events_suite_get_eventbrite_source_value($post_id, 'post_title', '', $has_post_title_source);

    if (
        $has_event_title_source &&
        $has_post_title_source &&
        !kbc_events_suite_values_equal($post->post_title, $post_title_source) &&
        kbc_events_suite_values_equal($event_title, $title_source)
    ) {
        kbc_events_suite_write_acf_or_meta($post_id, 'event_title', $post->post_title);
        kbc_events_suite_set_manual_override($post_id, 'event_title', true);
    }

    $description_source = kbc_events_suite_get_eventbrite_source_value($post_id, 'description', '', $has_description_source);
    $description = kbc_events_suite_get_meta($post_id, 'description');
    $content_source = kbc_events_suite_get_eventbrite_source_value($post_id, 'post_content', '', $has_content_source);

    if (
        $has_description_source &&
        $has_content_source &&
        !kbc_events_suite_values_equal($post->post_content, $content_source) &&
        kbc_events_suite_values_equal($description, $description_source)
    ) {
        kbc_events_suite_write_acf_or_meta($post_id, 'description', $post->post_content);
        kbc_events_suite_set_manual_override($post_id, 'description', true);
    }

    $summary_source = kbc_events_suite_get_eventbrite_source_value($post_id, 'short_description', '', $has_summary_source);
    $short_description = kbc_events_suite_get_meta($post_id, 'short_description');
    $excerpt_source = kbc_events_suite_get_eventbrite_source_value($post_id, 'post_excerpt', '', $has_excerpt_source);

    if (
        $has_summary_source &&
        $has_excerpt_source &&
        !kbc_events_suite_values_equal($post->post_excerpt, $excerpt_source) &&
        kbc_events_suite_values_equal($short_description, $summary_source)
    ) {
        kbc_events_suite_write_acf_or_meta($post_id, 'short_description', $post->post_excerpt);
        kbc_events_suite_set_manual_override($post_id, 'short_description', true);
    }
}
add_action('save_post', 'kbc_events_suite_track_manual_post_edits', 999, 3);

function kbc_events_suite_track_manual_meta_edit($meta_id, $post_id, $meta_key, $meta_value = null) {
    $post_id = absint($post_id);
    if (!$post_id || kbc_events_suite_is_syncing_post($post_id) || get_post_type($post_id) !== kbc_events_suite_event_post_type()) {
        return;
    }

    $field_map = array(
        'event_title'         => 'event_title',
        'description'         => 'description',
        'short_description'   => 'short_description',
        'event_start_date'    => 'event_start_date',
        'start_time'          => 'start_time',
        'end_event_date_copy' => 'end_event_date_copy',
        'end_time'            => 'end_time',
        'location'            => 'location',
        'map'                 => 'map',
        'event_status'        => 'event_status',
        'booking_url'         => 'booking_url',
        'category_'           => 'category_',
        'image'               => 'image',
        'view_highlights'     => 'view_highlights',
        'view_gallery_'       => 'view_gallery_',
        '_thumbnail_id'       => 'featured_image',
    );

    if (function_exists('kbc_events_suite_event_field_defaults') && function_exists('kbc_events_suite_field_key')) {
        foreach (kbc_events_suite_event_field_defaults() as $logical_field => $default_key) {
            $configured_key = kbc_events_suite_field_key($logical_field);
            if ($configured_key) {
                $field_map[$configured_key] = sanitize_key($default_key);
            }
        }
    }

    if (!isset($field_map[$meta_key])) {
        return;
    }

    $field_name = $field_map[$meta_key];
    $source = kbc_events_suite_get_eventbrite_source_value($post_id, $field_name, '', $has_source);
    if (!$has_source) {
        return;
    }

    $current = $field_name === 'featured_image'
        ? get_post_thumbnail_id($post_id)
        : kbc_events_suite_get_meta($post_id, $field_name);

    kbc_events_suite_set_manual_override(
        $post_id,
        $field_name,
        !kbc_events_suite_values_equal($current, $source)
    );
}
add_action('added_post_meta', 'kbc_events_suite_track_manual_meta_edit', 999, 4);
add_action('updated_post_meta', 'kbc_events_suite_track_manual_meta_edit', 999, 4);
add_action('deleted_post_meta', 'kbc_events_suite_track_manual_meta_edit', 999, 4);
