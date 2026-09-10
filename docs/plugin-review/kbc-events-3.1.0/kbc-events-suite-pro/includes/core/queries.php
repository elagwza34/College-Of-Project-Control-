<?php
if (!defined('ABSPATH')) {
    exit;
}

function kbc_events_suite_get_events() {
    return get_posts(array(
        'post_type'      => kbc_events_suite_event_post_type(),
        'posts_per_page' => -1,
        'post_status'    => array('publish', 'draft', 'pending', 'future', 'private'),
        'orderby'        => 'title',
        'order'          => 'ASC',
    ));
}

function kbc_events_suite_get_agenda_tracks($event_id = 0) {
    $args = array(
        'post_type'      => 'kbc_agenda_track',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'meta_key'       => '_kbc_track_order',
        'orderby'        => array(
            'meta_value_num' => 'ASC',
            'title'          => 'ASC',
        ),
        'order'          => 'ASC',
    );

    if ($event_id) {
        $args['meta_query'] = array(
            array(
                'key'     => '_kbc_track_event_id',
                'value'   => absint($event_id),
                'compare' => '=',
            ),
        );
    }

    return get_posts($args);
}

function kbc_events_suite_get_track_data_from_session($session) {
    $track_id = absint(get_post_meta($session->ID, '_kbc_track_id', true));

    if ($track_id && get_post($track_id)) {
        return array(
            'id'       => $track_id,
            'title'    => get_the_title($track_id),
            'subtitle' => get_post_meta($track_id, '_kbc_track_subtitle', true),
            'color'    => get_post_meta($track_id, '_kbc_track_color', true) ?: '#E2AF6D',
            'order'    => absint(get_post_meta($track_id, '_kbc_track_order', true)),
            'key'      => 'track-' . $track_id,
        );
    }

    $title = get_post_meta($session->ID, '_kbc_track_title', true) ?: 'Agenda';
    $subtitle = get_post_meta($session->ID, '_kbc_track_subtitle', true);
    $color = get_post_meta($session->ID, '_kbc_track_color', true) ?: '#E2AF6D';

    return array(
        'id'       => 0,
        'title'    => $title,
        'subtitle' => $subtitle,
        'color'    => $color,
        'order'    => 999,
        'key'      => sanitize_title($title . '-' . $subtitle . '-' . $color),
    );
}

function kbc_events_suite_get_category_terms_for_filters($taxonomy = '', $include_slugs = array()) {
    $taxonomy = $taxonomy ? sanitize_key($taxonomy) : kbc_events_suite_taxonomy();
    $include_slugs = function_exists('kbc_events_suite_parse_slug_list')
        ? kbc_events_suite_parse_slug_list($include_slugs)
        : array_filter(array_map('sanitize_title', (array) $include_slugs));

    if (!$taxonomy || !taxonomy_exists($taxonomy)) {
        return array();
    }

    $args = array(
        'taxonomy'   => $taxonomy,
        'hide_empty' => true,
    );

    if ($include_slugs) {
        $args['slug'] = $include_slugs;
    }

    $terms = get_terms($args);
    if (is_wp_error($terms) || empty($terms)) {
        return array();
    }

    if ($include_slugs) {
        $position = array_flip($include_slugs);
        usort($terms, function ($a, $b) use ($position) {
            return ($position[$a->slug] ?? 9999) <=> ($position[$b->slug] ?? 9999);
        });
    }

    return $terms;
}
