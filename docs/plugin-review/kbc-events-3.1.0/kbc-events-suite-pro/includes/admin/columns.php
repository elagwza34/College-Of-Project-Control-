<?php
if (!defined('ABSPATH')) {
    exit;
}

function kbc_events_suite_track_columns($columns) {
    return array(
        'cb'       => isset($columns['cb']) ? $columns['cb'] : '',
        'title'    => 'Track',
        'event'    => 'Event',
        'subtitle' => 'Subtitle',
        'color'    => 'Color',
        'order'    => 'Order',
        'date'     => isset($columns['date']) ? $columns['date'] : 'Date',
    );
}
add_filter('manage_kbc_agenda_track_posts_columns', 'kbc_events_suite_track_columns');

function kbc_events_suite_track_column_content($column, $post_id) {
    if ($column === 'event') {
        $event_id = get_post_meta($post_id, '_kbc_track_event_id', true);
        echo $event_id ? esc_html(get_the_title($event_id)) : '-';
    }

    if ($column === 'subtitle') {
        echo esc_html(get_post_meta($post_id, '_kbc_track_subtitle', true));
    }

    if ($column === 'color') {
        $color = get_post_meta($post_id, '_kbc_track_color', true) ?: '#E2AF6D';
        echo '<span style="display:inline-block;width:18px;height:18px;border-radius:50%;background:' . esc_attr($color) . ';border:1px solid #ccc;"></span> ' . esc_html($color);
    }

    if ($column === 'order') {
        echo esc_html(get_post_meta($post_id, '_kbc_track_order', true));
    }
}
add_action('manage_kbc_agenda_track_posts_custom_column', 'kbc_events_suite_track_column_content', 10, 2);

function kbc_events_suite_session_columns($columns) {
    return array(
        'cb'      => $columns['cb'],
        'title'   => 'Session Title',
        'event'   => 'Event',
        'track'   => 'Track',
        'time'    => 'Time',
        'speaker' => 'Speaker',
        'order'   => 'Order',
        'date'    => $columns['date'],
    );
}
add_filter('manage_kbc_agenda_session_posts_columns', 'kbc_events_suite_session_columns');

function kbc_events_suite_session_column_content($column, $post_id) {
    if ($column === 'event') echo esc_html(get_the_title(get_post_meta($post_id, '_kbc_event_id', true)) ?: '-');
    if ($column === 'track') {
        $track_id = kbc_events_suite_valid_related_post_id(get_post_meta($post_id, '_kbc_track_id', true), 'kbc_agenda_track');
        $track_label = $track_id
            ? trim(get_the_title($track_id) . ' ' . get_post_meta($track_id, '_kbc_track_subtitle', true))
            : trim(get_post_meta($post_id, '_kbc_track_title', true) . ' ' . get_post_meta($post_id, '_kbc_track_subtitle', true));
        echo esc_html($track_label ?: '-');
    }
    if ($column === 'time') echo esc_html(get_post_meta($post_id, '_kbc_session_time', true));
    if ($column === 'speaker') echo esc_html(get_post_meta($post_id, '_kbc_speaker_name', true));
    if ($column === 'order') echo esc_html(get_post_meta($post_id, '_kbc_session_order', true));
}
add_action('manage_kbc_agenda_session_posts_custom_column', 'kbc_events_suite_session_column_content', 10, 2);

function kbc_events_suite_partner_columns($columns) {
    return array(
        'cb'    => $columns['cb'],
        'title' => 'Partner',
        'event' => 'Event',
        'role'  => 'Role',
        'email' => 'Email',
        'order' => 'Order',
        'date'  => $columns['date'],
    );
}
add_filter('manage_kbc_event_partner_posts_columns', 'kbc_events_suite_partner_columns');

function kbc_events_suite_partner_column_content($column, $post_id) {
    if ($column === 'event') echo esc_html(get_the_title(get_post_meta($post_id, '_kbc_partner_event_id', true)) ?: '-');
    if ($column === 'role') echo esc_html(get_post_meta($post_id, '_kbc_partner_role', true));
    if ($column === 'email') echo esc_html(get_post_meta($post_id, '_kbc_partner_email', true));
    if ($column === 'order') echo esc_html(get_post_meta($post_id, '_kbc_partner_order', true));
}
add_action('manage_kbc_event_partner_posts_custom_column', 'kbc_events_suite_partner_column_content', 10, 2);

function kbc_events_suite_event_columns($columns) {
    $new = array();
    $new['cb'] = $columns['cb'] ?? '';
    $new['title'] = 'Event';
    $new['event_date'] = 'Event Date';
    $new['event_category'] = 'Category';
    $new['button_state'] = 'Button State';
    $new['button_timing'] = 'Button Timing';
    $new['manual_order'] = 'Order';
    $new['eventbrite_id'] = 'Eventbrite ID';
    $new['has_image'] = 'Image';
    $new['last_sync'] = 'Last Sync';
    $new['date'] = $columns['date'] ?? 'Date';

    return $new;
}
add_filter('manage_' . kbc_events_suite_event_post_type() . '_posts_columns', 'kbc_events_suite_event_columns');

function kbc_events_suite_event_column_content($column, $post_id) {
    if ($column === 'event_date') {
        echo esc_html(kbc_events_suite_format_acf_date(kbc_events_suite_get_meta($post_id, 'event_start_date')) ?: '-');
    }

    if ($column === 'event_category') {
        $terms = get_the_terms($post_id, kbc_events_suite_taxonomy());
        echo (!is_wp_error($terms) && $terms) ? esc_html(implode(', ', wp_list_pluck($terms, 'name'))) : '-';
    }

    if ($column === 'button_state') {
        echo esc_html(kbc_events_suite_get_event_button_state($post_id));
    }

    if ($column === 'button_timing') {
        $overrides = kbc_events_suite_get_event_timing_overrides($post_id);
        $close_days = kbc_events_suite_get_event_close_registration_days($post_id);
        $highlights_days = kbc_events_suite_get_event_highlights_after_days($post_id);

        $close_suffix = $overrides['close_source'] === 'global' ? ' (global)' : '';
        $highlights_suffix = $overrides['highlights_source'] === 'global' ? ' (global)' : '';

        echo '<span>Close: ' . esc_html($close_days) . 'd before' . esc_html($close_suffix) . '</span><br>';
        echo '<span>Highlights: ' . esc_html($highlights_days) . 'd after' . esc_html($highlights_suffix) . '</span>';
    }

    if ($column === 'manual_order') {
        $order = get_post_meta($post_id, kbc_events_suite_event_order_meta_key(), true);
        echo $order !== '' ? esc_html($order) : '-';
    }

    if ($column === 'eventbrite_id') {
        $id = get_post_meta($post_id, '_kbc_eventbrite_event_id', true) ?: get_post_meta($post_id, '_eventbrite_event_id', true);
        echo $id ? '<code>' . esc_html($id) . '</code>' : '-';
    }

    if ($column === 'has_image') {
        echo kbc_events_suite_get_event_image_url($post_id, 'thumbnail') ? 'Yes' : 'No';
    }

    if ($column === 'last_sync') {
        echo esc_html(get_post_meta($post_id, '_kbc_eventbrite_last_sync', true) ?: '-');
    }
}
add_action('manage_' . kbc_events_suite_event_post_type() . '_posts_custom_column', 'kbc_events_suite_event_column_content', 10, 2);

function kbc_events_suite_event_sortable_columns($columns) {
    $columns['manual_order'] = 'manual_order';
    $columns['event_date'] = 'event_start_date';

    return $columns;
}
add_filter('manage_edit-' . kbc_events_suite_event_post_type() . '_sortable_columns', 'kbc_events_suite_event_sortable_columns');

function kbc_events_suite_event_columns_orderby($query) {
    if (!is_admin() || !$query->is_main_query()) {
        return;
    }

    if ($query->get('post_type') !== kbc_events_suite_event_post_type()) {
        return;
    }

    $orderby = $query->get('orderby');

    if ($orderby === 'manual_order') {
        $query->set('meta_key', kbc_events_suite_event_order_meta_key());
        $query->set('orderby', 'meta_value_num');
    }

    if ($orderby === 'event_start_date') {
        $query->set('meta_key', '_kbc_event_start_ymd');
        $query->set('orderby', 'meta_value');
    }
}
add_action('pre_get_posts', 'kbc_events_suite_event_columns_orderby');
