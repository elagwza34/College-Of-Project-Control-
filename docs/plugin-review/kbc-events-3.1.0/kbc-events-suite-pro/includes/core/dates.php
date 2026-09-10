<?php
if (!defined('ABSPATH')) {
    exit;
}

function kbc_events_suite_event_timezone($event_id = 0) {
    $timezone_name = $event_id ? get_post_meta($event_id, '_kbc_eventbrite_timezone', true) : '';

    if ($timezone_name) {
        try {
            return new DateTimeZone($timezone_name);
        } catch (Exception $e) {
            // Fall back to the WordPress site timezone.
        }
    }

    return wp_timezone();
}

function kbc_events_suite_normalise_event_time($time_raw = '', $timezone = null) {
    $time_raw = trim((string) $time_raw);

    if ($time_raw === '') {
        return '00:00:00';
    }

    $time_raw = preg_replace('/^(start|starts|end|ends)\s*(at)?\s*/i', '', $time_raw);
    $time_raw = trim($time_raw);
    $timezone = $timezone instanceof DateTimeZone ? $timezone : wp_timezone();

    $formats = array('H:i:s', 'H:i', 'G:i', 'g:i A', 'g:i a', 'h:i A', 'h:i a', 'g A', 'g a');

    foreach ($formats as $format) {
        $dt = DateTimeImmutable::createFromFormat('!' . $format, $time_raw, $timezone);
        if ($dt instanceof DateTimeImmutable) {
            $errors = DateTimeImmutable::getLastErrors();
            if ($errors === false || ((int) $errors['warning_count'] === 0 && (int) $errors['error_count'] === 0)) {
                return $dt->format('H:i:s');
            }
        }
    }

    try {
        $dt = new DateTimeImmutable($time_raw, $timezone);
        return $dt->format('H:i:s');
    } catch (Exception $e) {
        return '00:00:00';
    }
}

function kbc_events_suite_normalise_date_ymd($date_raw, $timezone = null) {
    if (is_array($date_raw)) {
        foreach (array('date', 'value', 'start', 'end') as $key) {
            if (!empty($date_raw[$key])) {
                $date_raw = $date_raw[$key];
                break;
            }
        }
    }

    $date_raw = trim((string) $date_raw);
    if ($date_raw === '') {
        return '';
    }

    $timezone = $timezone instanceof DateTimeZone ? $timezone : wp_timezone();
    $date_formats = array('Ymd', 'Y-m-d', 'd/m/Y', 'd-m-Y', 'd.m.Y', 'm/d/Y', 'm-d-Y', 'F j, Y', 'j F Y');

    foreach ($date_formats as $format) {
        $dt = DateTimeImmutable::createFromFormat('!' . $format, $date_raw, $timezone);
        if ($dt instanceof DateTimeImmutable) {
            $errors = DateTimeImmutable::getLastErrors();
            if ($errors === false || ((int) $errors['warning_count'] === 0 && (int) $errors['error_count'] === 0)) {
                return $dt->format('Ymd');
            }
        }
    }

    try {
        return (new DateTimeImmutable($date_raw, $timezone))->format('Ymd');
    } catch (Exception $e) {
        return '';
    }
}

function kbc_events_suite_event_datetime($date_raw, $time_raw = '', $timezone = null) {
    $timezone = $timezone instanceof DateTimeZone ? $timezone : wp_timezone();
    $date_ymd = kbc_events_suite_normalise_date_ymd($date_raw, $timezone);

    if (!$date_ymd) {
        return false;
    }

    $time = kbc_events_suite_normalise_event_time($time_raw ?: '00:00:00', $timezone);
    $dt = DateTimeImmutable::createFromFormat('!Ymd H:i:s', $date_ymd . ' ' . $time, $timezone);

    return $dt instanceof DateTimeImmutable ? $dt : false;
}

function kbc_events_suite_event_datetime_timestamp($date_raw, $time_raw = '', $timezone = null) {
    $dt = kbc_events_suite_event_datetime($date_raw, $time_raw, $timezone);

    return $dt ? $dt->getTimestamp() : 0;
}

function kbc_events_suite_get_event_start_timestamp($event_id) {
    $date_raw = kbc_events_suite_get_meta($event_id, 'event_start_date');
    $time_raw = kbc_events_suite_get_meta($event_id, 'start_time');

    return kbc_events_suite_event_datetime_timestamp(
        $date_raw,
        $time_raw ?: '00:00:00',
        kbc_events_suite_event_timezone($event_id)
    );
}

function kbc_events_suite_format_acf_date($date_raw, $format = 'd/m/Y') {
    $date_ymd = kbc_events_suite_normalise_date_ymd($date_raw);
    if (!$date_ymd) {
        return is_scalar($date_raw) ? (string) $date_raw : '';
    }

    $date = DateTimeImmutable::createFromFormat('!Ymd', $date_ymd, wp_timezone());

    return $date ? $date->format($format) : '';
}

function kbc_events_suite_format_acf_time($time_raw, $format = 'g:i A') {
    if (!$time_raw) {
        return '';
    }

    $normalised = kbc_events_suite_normalise_event_time($time_raw);
    $time = DateTimeImmutable::createFromFormat('!H:i:s', $normalised, wp_timezone());

    return $time ? $time->format($format) : (string) $time_raw;
}

function kbc_events_suite_update_event_date_indexes($post_id) {
    $post_id = absint($post_id);
    if (!$post_id || get_post_type($post_id) !== kbc_events_suite_event_post_type()) {
        return;
    }

    $timezone = kbc_events_suite_event_timezone($post_id);
    $start = kbc_events_suite_normalise_date_ymd(kbc_events_suite_get_meta($post_id, 'event_start_date'), $timezone);
    $end = kbc_events_suite_normalise_date_ymd(kbc_events_suite_get_meta($post_id, 'end_event_date_copy'), $timezone);

    if ($start) {
        update_post_meta($post_id, '_kbc_event_start_ymd', $start);
    } else {
        delete_post_meta($post_id, '_kbc_event_start_ymd');
    }

    if ($end || $start) {
        update_post_meta($post_id, '_kbc_event_end_ymd', $end ?: $start);
    } else {
        delete_post_meta($post_id, '_kbc_event_end_ymd');
    }
}

function kbc_events_suite_update_event_date_indexes_after_save($post_id, $post) {
    if (!$post || $post->post_type !== kbc_events_suite_event_post_type()) {
        return;
    }

    if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) {
        return;
    }

    kbc_events_suite_update_event_date_indexes($post_id);
    kbc_events_suite_clear_frontend_event_timing_map_cache();
}
add_action('save_post', 'kbc_events_suite_update_event_date_indexes_after_save', 1000, 2);

function kbc_events_suite_backfill_event_date_indexes() {
    $ids = get_posts(array(
        'post_type'      => kbc_events_suite_event_post_type(),
        'post_status'    => array('publish', 'future', 'draft', 'pending', 'private'),
        'posts_per_page' => -1,
        'fields'         => 'ids',
        'no_found_rows'  => true,
    ));

    foreach ($ids as $post_id) {
        kbc_events_suite_update_event_date_indexes($post_id);
    }

    return count($ids);
}

/**
 * Return per-event timing overrides. A value of 0 is valid; null means global.
 */
function kbc_events_suite_get_event_timing_overrides($event_id) {
    $event_id = absint($event_id);

    $result = array(
        'close_days'            => null,
        'close_source'          => 'global',
        'highlights_after_days' => null,
        'highlights_source'     => 'global',
    );

    if (!$event_id) {
        return $result;
    }

    $close_meta = get_post_meta($event_id, '_kbc_registration_close_days_before', true);
    if ($close_meta !== '') {
        $result['close_days'] = absint($close_meta);
        $result['close_source'] = 'event';
    }

    $highlights_meta = get_post_meta($event_id, '_kbc_highlights_show_days_after', true);
    if ($highlights_meta !== '') {
        $result['highlights_after_days'] = absint($highlights_meta);
        $result['highlights_source'] = 'event';
    }

    if (function_exists('get_field')) {
        if ($result['close_days'] === null) {
            foreach (array('registration_close_days_before', 'event_registration_close_days_before', 'close_registration_days') as $field_name) {
                $value = get_field($field_name, $event_id);
                if ($value !== '' && $value !== null && $value !== false) {
                    $result['close_days'] = absint($value);
                    $result['close_source'] = 'acf';
                    break;
                }
            }
        }

        if ($result['highlights_after_days'] === null) {
            foreach (array('highlights_show_days_after', 'event_highlights_show_days_after', 'highlights_after_days') as $field_name) {
                $value = get_field($field_name, $event_id);
                if ($value !== '' && $value !== null && $value !== false) {
                    $result['highlights_after_days'] = absint($value);
                    $result['highlights_source'] = 'acf';
                    break;
                }
            }
        }
    }

    return $result;
}

function kbc_events_suite_get_event_close_registration_days($event_id) {
    $overrides = kbc_events_suite_get_event_timing_overrides($event_id);

    return $overrides['close_days'] !== null
        ? absint($overrides['close_days'])
        : absint(get_option('kbc_events_suite_close_registration_days', 1));
}

function kbc_events_suite_get_event_highlights_after_days($event_id) {
    $overrides = kbc_events_suite_get_event_timing_overrides($event_id);

    return $overrides['highlights_after_days'] !== null
        ? absint($overrides['highlights_after_days'])
        : absint(get_option('kbc_events_suite_highlights_after_days', 1));
}

/** Pure day-level state resolver. */
function kbc_events_suite_resolve_button_state($today_ymd, $start_ymd, $end_ymd, $close_days, $highlights_after_days, $remote_status = '') {
    $remote_status = strtolower(trim((string) $remote_status));
    if (in_array($remote_status, array('canceled', 'cancelled', 'deleted', 'draft', 'missing'), true)) {
        return 'closed';
    }

    $today = DateTimeImmutable::createFromFormat('!Ymd', (string) $today_ymd, new DateTimeZone('UTC'));
    $start = DateTimeImmutable::createFromFormat('!Ymd', (string) $start_ymd, new DateTimeZone('UTC'));
    $end = DateTimeImmutable::createFromFormat('!Ymd', (string) ($end_ymd ?: $start_ymd), new DateTimeZone('UTC'));

    if (!$today || !$start) {
        return 'open';
    }

    if (!$end) {
        $end = $start;
    }

    $close_day = $start->modify('-' . absint($close_days) . ' day');
    $highlights_day = $end->modify('+' . absint($highlights_after_days) . ' day');

    if ($today >= $highlights_day) {
        return 'ended';
    }

    /* Once registration closes it never re-opens before highlights. */
    if ($today >= $close_day) {
        return 'closed';
    }

    return 'open';
}

function kbc_events_suite_get_event_button_state($event_id) {
    $event_id = absint($event_id);
    $timezone = kbc_events_suite_event_timezone($event_id);
    $today_ymd = (new DateTimeImmutable('now', $timezone))->format('Ymd');
    $start_ymd = get_post_meta($event_id, '_kbc_event_start_ymd', true);
    $end_ymd = get_post_meta($event_id, '_kbc_event_end_ymd', true);

    if (!$start_ymd) {
        $start_ymd = kbc_events_suite_normalise_date_ymd(kbc_events_suite_get_meta($event_id, 'event_start_date'), $timezone);
    }

    if (!$end_ymd) {
        $end_ymd = kbc_events_suite_normalise_date_ymd(kbc_events_suite_get_meta($event_id, 'end_event_date_copy'), $timezone) ?: $start_ymd;
    }

    return kbc_events_suite_resolve_button_state(
        $today_ymd,
        $start_ymd,
        $end_ymd,
        kbc_events_suite_get_event_close_registration_days($event_id),
        kbc_events_suite_get_event_highlights_after_days($event_id),
        get_post_meta($event_id, '_kbc_eventbrite_status', true)
    );
}


function kbc_events_suite_get_event_date_state($event_id) {
    $event_id = absint($event_id);
    if (!$event_id) {
        return 'upcoming';
    }

    $timezone = kbc_events_suite_event_timezone($event_id);
    $today_ymd = (new DateTimeImmutable('now', $timezone))->format('Ymd');
    $end_ymd = (string) get_post_meta($event_id, '_kbc_event_end_ymd', true);

    if (!$end_ymd) {
        $end_ymd = kbc_events_suite_normalise_date_ymd(kbc_events_suite_get_meta($event_id, 'end_event_date_copy'), $timezone);
    }

    if (!$end_ymd) {
        $end_ymd = (string) get_post_meta($event_id, '_kbc_event_start_ymd', true);
    }

    if (!$end_ymd) {
        $end_ymd = kbc_events_suite_normalise_date_ymd(kbc_events_suite_get_meta($event_id, 'event_start_date'), $timezone);
    }

    return ($end_ymd && $end_ymd < $today_ymd) ? 'ended' : 'upcoming';
}

function kbc_events_suite_get_event_term_slugs($event_id, $taxonomy = '') {
    $event_id = absint($event_id);
    $taxonomy = $taxonomy ? sanitize_key($taxonomy) : (function_exists('kbc_events_suite_taxonomy') ? kbc_events_suite_taxonomy() : '');

    if (!$event_id || !$taxonomy || !taxonomy_exists($taxonomy)) {
        return array();
    }

    $terms = get_the_terms($event_id, $taxonomy);
    if (is_wp_error($terms) || empty($terms)) {
        return array();
    }

    return array_values(array_unique(array_map('sanitize_title', wp_list_pluck($terms, 'slug'))));
}

function kbc_events_suite_get_event_iso_datetime($event_id, $which = 'start') {
    $timezone = kbc_events_suite_event_timezone($event_id);
    $is_end = $which === 'end';
    $date = kbc_events_suite_get_meta($event_id, $is_end ? 'end_event_date_copy' : 'event_start_date');
    $time = kbc_events_suite_get_meta($event_id, $is_end ? 'end_time' : 'start_time');
    $dt = kbc_events_suite_event_datetime($date, $time ?: ($is_end ? '23:59:59' : '00:00:00'), $timezone);

    return $dt ? $dt->format(DateTimeInterface::ATOM) : '';
}

function kbc_events_suite_clear_frontend_event_timing_map_cache() {
    foreach (array('v5', 'v4', 'v3', 'v2', '') as $version) {
        $suffix = $version ? '_' . $version : '';
        delete_transient('kbc_events_suite_frontend_event_timing_map' . $suffix);
        wp_cache_delete('frontend_event_timing_map' . $suffix, 'kbc_events_suite');
    }
}

/** Compact public-only state map for Elementor fallback templates. */
function kbc_events_suite_get_frontend_event_timing_map() {
    $cached = wp_cache_get('frontend_event_timing_map_v5', 'kbc_events_suite');
    if (is_array($cached)) {
        return $cached;
    }

    $cached = get_transient('kbc_events_suite_frontend_event_timing_map_v5');
    if (is_array($cached)) {
        wp_cache_set('frontend_event_timing_map_v5', $cached, 'kbc_events_suite', HOUR_IN_SECONDS);
        return $cached;
    }

    $map = array(
        'events' => array(),
        'byPath' => array(),
    );

    $event_ids = get_posts(array(
        'post_type'              => kbc_events_suite_event_post_type(),
        'post_status'            => 'publish',
        'posts_per_page'         => -1,
        'fields'                 => 'ids',
        'no_found_rows'          => true,
        'orderby'                => 'ID',
        'order'                  => 'ASC',
        'update_post_meta_cache' => true,
        'update_post_term_cache' => false,
    ));

    foreach ($event_ids as $event_id) {
        $event_id = absint($event_id);
        $permalink = get_permalink($event_id);
        if (!$permalink) {
            continue;
        }

        $timezone = kbc_events_suite_event_timezone($event_id);
        $today_ymd = (new DateTimeImmutable('now', $timezone))->format('Ymd');
        $end_ymd = (string) get_post_meta($event_id, '_kbc_event_end_ymd', true);
        if (!$end_ymd) {
            $end_ymd = kbc_events_suite_normalise_date_ymd(
                kbc_events_suite_get_meta($event_id, 'end_event_date_copy'),
                $timezone
            );
        }
        if (!$end_ymd) {
            $end_ymd = (string) get_post_meta($event_id, '_kbc_event_start_ymd', true);
        }

        $configured_taxonomy = function_exists('kbc_events_suite_taxonomy') ? kbc_events_suite_taxonomy() : '';
        $taxonomies = function_exists('get_object_taxonomies') ? get_object_taxonomies(kbc_events_suite_event_post_type(), 'names') : array();
        $taxonomies = is_array($taxonomies) ? array_values(array_filter(array_map('sanitize_key', $taxonomies))) : array();
        if ($configured_taxonomy && !in_array($configured_taxonomy, $taxonomies, true)) {
            array_unshift($taxonomies, $configured_taxonomy);
        }

        $taxonomy_terms = array();
        $all_term_slugs = array();
        foreach (array_values(array_unique($taxonomies)) as $taxonomy) {
            if (!$taxonomy || !taxonomy_exists($taxonomy)) {
                continue;
            }

            $slugs = kbc_events_suite_get_event_term_slugs($event_id, $taxonomy);
            $taxonomy_terms[$taxonomy] = $slugs;
            $all_term_slugs = array_merge($all_term_slugs, $slugs);
        }
        $all_term_slugs = array_values(array_unique($all_term_slugs));

        $map['events'][(string) $event_id] = array(
            'state'         => kbc_events_suite_get_event_button_state($event_id),
            'dateState'     => kbc_events_suite_get_event_date_state($event_id),
            'url'           => $permalink,
            'highlightsUrl' => kbc_events_suite_get_highlights_target($event_id),
            'terms'         => $all_term_slugs,
            'taxonomies'    => $taxonomy_terms,
        );

        $path = wp_parse_url($permalink, PHP_URL_PATH);
        if ($path !== null && $path !== false) {
            $path = untrailingslashit($path) ?: '/';
            $map['byPath'][$path] = (string) $event_id;
        }
    }

    set_transient('kbc_events_suite_frontend_event_timing_map_v5', $map, HOUR_IN_SECONDS);
    wp_cache_set('frontend_event_timing_map_v5', $map, 'kbc_events_suite', HOUR_IN_SECONDS);

    return $map;
}

add_action('update_option_kbc_events_suite_close_registration_days', 'kbc_events_suite_clear_frontend_event_timing_map_cache');
add_action('update_option_kbc_events_suite_highlights_after_days', 'kbc_events_suite_clear_frontend_event_timing_map_cache');

function kbc_events_suite_refresh_date_indexes_after_field_change() {
    if (function_exists('kbc_events_suite_backfill_event_date_indexes')) {
        kbc_events_suite_backfill_event_date_indexes();
    }
    kbc_events_suite_clear_frontend_event_timing_map_cache();
}
add_action('update_option_kbc_events_suite_field_start_date', 'kbc_events_suite_refresh_date_indexes_after_field_change');
add_action('update_option_kbc_events_suite_field_end_date', 'kbc_events_suite_refresh_date_indexes_after_field_change');
add_action('update_option_kbc_events_suite_field_start_time', 'kbc_events_suite_clear_frontend_event_timing_map_cache');
add_action('update_option_kbc_events_suite_field_end_time', 'kbc_events_suite_clear_frontend_event_timing_map_cache');

function kbc_events_suite_maybe_clear_timing_map_on_meta_change($meta_id, $object_id, $meta_key, $meta_value = null) {
    $watched = array(
        '_kbc_registration_close_days_before',
        '_kbc_highlights_show_days_after',
        'registration_close_days_before',
        'event_registration_close_days_before',
        'close_registration_days',
        'highlights_show_days_after',
        'event_highlights_show_days_after',
        'highlights_after_days',
        'event_start_date',
        'end_event_date_copy',
        'start_time',
        'end_time',
        '_kbc_eventbrite_status',
        '_kbc_eventbrite_timezone',
    );

    if (function_exists('kbc_events_suite_event_field_defaults') && function_exists('kbc_events_suite_field_key')) {
        foreach (array('start_date', 'end_date', 'start_time', 'end_time', 'booking_url', 'highlights_url', 'gallery_url') as $logical_field) {
            $configured_key = kbc_events_suite_field_key($logical_field);
            if ($configured_key) {
                $watched[] = $configured_key;
            }
        }
    }

    if (in_array((string) $meta_key, array_values(array_unique($watched)), true)) {
        kbc_events_suite_clear_frontend_event_timing_map_cache();
    }
}
add_action('added_post_meta', 'kbc_events_suite_maybe_clear_timing_map_on_meta_change', 10, 4);
add_action('updated_post_meta', 'kbc_events_suite_maybe_clear_timing_map_on_meta_change', 10, 4);
add_action('deleted_post_meta', 'kbc_events_suite_maybe_clear_timing_map_on_meta_change', 10, 4);

function kbc_events_suite_clear_timing_map_on_status_change($new_status, $old_status, $post) {
    if ($post && $post->post_type === kbc_events_suite_event_post_type() && $new_status !== $old_status) {
        kbc_events_suite_clear_frontend_event_timing_map_cache();
    }
}
add_action('transition_post_status', 'kbc_events_suite_clear_timing_map_on_status_change', 10, 3);
