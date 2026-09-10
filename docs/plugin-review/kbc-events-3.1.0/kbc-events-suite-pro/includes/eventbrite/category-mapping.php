<?php
if (!defined('ABSPATH')) {
    exit;
}

function kbc_events_suite_get_category_mapping() {
    $raw = get_option('kbc_events_suite_eventbrite_category_mapping', '');
    $map = array();
    $lines = preg_split('/\r\n|\r|\n/', (string) $raw);

    foreach ($lines as $line) {
        $line = trim($line);
        if (!$line || strpos($line, '|') === false) {
            continue;
        }

        list($source, $target) = array_map('trim', explode('|', $line, 2));
        if (!$source || !$target) {
            continue;
        }

        $map[strtolower($source)] = sanitize_title($target);
    }

    return $map;
}

function kbc_events_suite_get_keyword_category_mapping() {
    $raw = get_option(
        'kbc_events_suite_keyword_category_mapping',
        "Marketing|marketing\nPCP|pcp\nProject Control|pcp\nPMP|pmp\nProject Management|pmp\nLeadership|leadership"
    );
    $map = array();

    foreach (preg_split('/\r\n|\r|\n/', (string) $raw) as $line) {
        $line = trim($line);
        if (!$line || strpos($line, '|') === false) {
            continue;
        }

        list($keyword, $slug) = array_map('trim', explode('|', $line, 2));
        $slug = sanitize_title($slug);
        if ($keyword && $slug) {
            $map[$keyword] = $slug;
        }
    }

    return $map;
}

function kbc_events_suite_resolve_eventbrite_category_slug($category_name = '', $category_id = '', $event_title = '') {
    $mapping = kbc_events_suite_get_category_mapping();
    $category_name = trim((string) $category_name);
    $category_id = trim((string) $category_id);
    $event_title = trim((string) $event_title);

    if ($category_id && isset($mapping[strtolower($category_id)])) {
        return $mapping[strtolower($category_id)];
    }

    if ($category_name && isset($mapping[strtolower($category_name)])) {
        return $mapping[strtolower($category_name)];
    }

    /* Title keyword mapping works even when Eventbrite has no category. */
    if ($event_title) {
        foreach (kbc_events_suite_get_keyword_category_mapping() as $keyword => $slug) {
            if (stripos($event_title, $keyword) !== false) {
                return $slug;
            }
        }
    }

    return $category_name ? sanitize_title($category_name) : '';
}

/**
 * Maintain only the one term owned by Eventbrite. Editorial terms are never
 * replaced, and a changed mapping removes only the previously managed term.
 */
function kbc_events_suite_assign_category_from_eventbrite($post_id, $category_name, $category_id = '', $event_title = '') {
    $post_id = absint($post_id);
    $taxonomy = kbc_events_suite_taxonomy();
    if (!$post_id || !taxonomy_exists($taxonomy)) {
        return false;
    }

    $target_slug = kbc_events_suite_resolve_eventbrite_category_slug($category_name, $category_id, $event_title);
    $previous_slug = sanitize_title((string) get_post_meta($post_id, '_kbc_eventbrite_mapped_category_slug', true));

    if ($previous_slug && $previous_slug !== $target_slug) {
        $previous_term = get_term_by('slug', $previous_slug, $taxonomy);
        if ($previous_term && !is_wp_error($previous_term)) {
            wp_remove_object_terms($post_id, array((int) $previous_term->term_id), $taxonomy);
        }
        delete_post_meta($post_id, '_kbc_eventbrite_mapped_category_slug');
    }

    if (!$target_slug) {
        return true;
    }

    $term = get_term_by('slug', $target_slug, $taxonomy);
    if (!$term || is_wp_error($term)) {
        if (get_option('kbc_events_suite_eventbrite_auto_create_terms', 'yes') !== 'yes') {
            return false;
        }

        $term_name = ucwords(str_replace('-', ' ', $target_slug));
        $created = wp_insert_term($term_name, $taxonomy, array('slug' => $target_slug));
        if (is_wp_error($created)) {
            return false;
        }

        $term_id = absint($created['term_id']);
    } else {
        $term_id = absint($term->term_id);
    }

    /* Append rather than replace: preserve all manually assigned categories. */
    $assigned = wp_set_object_terms($post_id, array($term_id), $taxonomy, true);
    if (is_wp_error($assigned)) {
        return false;
    }

    update_post_meta($post_id, '_kbc_eventbrite_mapped_category_slug', $target_slug);
    return true;
}
