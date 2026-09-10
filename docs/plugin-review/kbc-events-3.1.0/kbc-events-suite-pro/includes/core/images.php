<?php
if (!defined('ABSPATH')) {
    exit;
}

function kbc_events_suite_valid_image_attachment_id($attachment_id) {
    $attachment_id = absint($attachment_id);

    return $attachment_id && wp_attachment_is_image($attachment_id) ? $attachment_id : 0;
}

function kbc_events_suite_image_url_from_acf_or_id($image, $size = 'large') {
    if (empty($image)) {
        return '';
    }

    if (is_array($image)) {
        if (!empty($image['sizes'][$size])) {
            return esc_url_raw($image['sizes'][$size]);
        }
        if (!empty($image['url'])) {
            return esc_url_raw($image['url']);
        }
        if (!empty($image['ID'])) {
            return wp_get_attachment_image_url((int) $image['ID'], $size);
        }
        if (!empty($image['id'])) {
            return wp_get_attachment_image_url((int) $image['id'], $size);
        }
    }

    if (is_numeric($image)) {
        return wp_get_attachment_image_url((int) $image, $size);
    }

    return kbc_events_suite_normalise_url_value($image);
}

function kbc_events_suite_get_event_image_url($event_id, $size = 'large') {
    $event_id = absint($event_id);
    if (!$event_id) {
        return '';
    }

    $priority_raw = get_option('kbc_events_suite_image_priority', 'acf,featured,eventbrite,remote,fallback');
    $priority = array_filter(array_map('sanitize_key', explode(',', $priority_raw)));

    if (!$priority) {
        $priority = array('acf', 'featured', 'eventbrite', 'remote', 'fallback');
    }

    $manual_overrides = kbc_events_suite_get_manual_overrides($event_id);
    $manual_image_owner = (bool) array_intersect(array('image', 'featured_image'), $manual_overrides);

    foreach ($priority as $source) {
        if ($manual_image_owner && in_array($source, array('eventbrite', 'remote', 'fallback'), true)) {
            continue;
        }

        if ($source === 'acf') {
            $image_url = kbc_events_suite_image_url_from_acf_or_id(kbc_events_suite_get_meta($event_id, 'image'), $size);
            if ($image_url) {
                return $image_url;
            }
        }

        if ($source === 'featured' && has_post_thumbnail($event_id)) {
            $image_url = get_the_post_thumbnail_url($event_id, $size);
            if ($image_url) {
                return esc_url_raw($image_url);
            }
        }

        if ($source === 'eventbrite') {
            $attachment_id = absint(get_post_meta($event_id, '_kbc_eventbrite_logo_attachment_id', true));
            if ($attachment_id) {
                $image_url = wp_get_attachment_image_url($attachment_id, $size);
                if ($image_url) {
                    return esc_url_raw($image_url);
                }
            }
        }

        if ($source === 'remote') {
            $remote_url = kbc_events_suite_normalise_url_value(get_post_meta($event_id, '_kbc_eventbrite_logo_url', true));
            if ($remote_url) {
                return $remote_url;
            }
        }

        if ($source === 'fallback') {
            $fallback = kbc_events_suite_get_fallback_image_url($size);
            if ($fallback) {
                return $fallback;
            }
        }
    }

    return '';
}

function kbc_events_suite_find_imported_image_by_url($image_url) {
    $ids = get_posts(array(
        'post_type'      => 'attachment',
        'post_status'    => 'inherit',
        'posts_per_page' => 1,
        'fields'         => 'ids',
        'meta_key'       => '_kbc_eventbrite_source_url',
        'meta_value'     => $image_url,
        'no_found_rows'  => true,
    ));

    return $ids ? absint($ids[0]) : 0;
}

function kbc_events_suite_import_event_image($post_id, $image_url, $title = '') {
    $post_id = absint($post_id);
    $image_url = kbc_events_suite_normalise_url_value($image_url);

    if (!$post_id || !$image_url) {
        return 0;
    }

    $previous_url = get_post_meta($post_id, '_kbc_eventbrite_logo_url', true);
    $existing_attachment_id = absint(get_post_meta($post_id, '_kbc_eventbrite_logo_attachment_id', true));

    if ($previous_url === $image_url && $existing_attachment_id && get_post($existing_attachment_id)) {
        return $existing_attachment_id;
    }

    $reusable_attachment_id = kbc_events_suite_find_imported_image_by_url($image_url);
    if ($reusable_attachment_id) {
        update_post_meta($post_id, '_kbc_eventbrite_logo_url', $image_url);
        update_post_meta($post_id, '_kbc_eventbrite_logo_attachment_id', $reusable_attachment_id);
        return $reusable_attachment_id;
    }

    require_once ABSPATH . 'wp-admin/includes/file.php';
    require_once ABSPATH . 'wp-admin/includes/media.php';
    require_once ABSPATH . 'wp-admin/includes/image.php';

    $tmp = download_url($image_url, 25);
    if (is_wp_error($tmp)) {
        update_post_meta($post_id, '_kbc_eventbrite_logo_import_error', $tmp->get_error_message());
        return 0;
    }

    $path = wp_parse_url($image_url, PHP_URL_PATH);
    $extension = $path ? strtolower(pathinfo($path, PATHINFO_EXTENSION)) : '';
    $allowed_extensions = array('jpg', 'jpeg', 'png', 'gif', 'webp');

    if (!$extension || !in_array($extension, $allowed_extensions, true)) {
        $checked = wp_check_filetype_and_ext($tmp, basename((string) $path));
        $extension = !empty($checked['ext']) && in_array($checked['ext'], $allowed_extensions, true)
            ? $checked['ext']
            : 'jpg';
    }

    $safe_title = $title ? sanitize_title($title) : 'eventbrite-event-image';
    $file_array = array(
        'name'     => $safe_title . '-' . substr(md5($image_url), 0, 12) . '.' . $extension,
        'tmp_name' => $tmp,
    );

    $attachment_id = media_handle_sideload($file_array, $post_id, $title);
    if (is_wp_error($attachment_id)) {
        @unlink($tmp);
        update_post_meta($post_id, '_kbc_eventbrite_logo_import_error', $attachment_id->get_error_message());
        return 0;
    }

    delete_post_meta($post_id, '_kbc_eventbrite_logo_import_error');
    update_post_meta($post_id, '_kbc_eventbrite_logo_url', $image_url);
    update_post_meta($post_id, '_kbc_eventbrite_logo_attachment_id', absint($attachment_id));
    update_post_meta($attachment_id, '_kbc_eventbrite_source_url', $image_url);

    return absint($attachment_id);
}

function kbc_events_suite_sync_featured_image($post_id, $attachment_id, $context = array()) {
    $current = get_post_thumbnail_id($post_id);
    $incoming = absint($attachment_id);
    $decision = kbc_events_suite_decide_synced_value($post_id, 'featured_image', $current, $incoming, $context);

    if ($decision['apply']) {
        $started_guard = !kbc_events_suite_is_syncing_post($post_id);
        if ($started_guard) {
            kbc_events_suite_begin_syncing_post($post_id);
        }

        try {
            if ($incoming) {
                set_post_thumbnail($post_id, $incoming);
            } else {
                delete_post_thumbnail($post_id);
            }
        } finally {
            if ($started_guard) {
                kbc_events_suite_end_syncing_post($post_id);
            }
        }
    }

    return $decision;
}
