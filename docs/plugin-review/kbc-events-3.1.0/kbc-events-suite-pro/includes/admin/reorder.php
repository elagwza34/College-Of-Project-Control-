<?php
if (!defined('ABSPATH')) {
    exit;
}

function kbc_events_suite_event_order_meta_key() {
    return '_kbc_event_order';
}

function kbc_events_suite_can_write_event_order() {
    return is_admin()
        || wp_doing_cron()
        || (defined('WP_CLI') && WP_CLI);
}

function kbc_events_suite_event_order_sort_ids_by_date($ids) {
    $ids = array_values(array_unique(array_map('absint', (array) $ids)));

    usort($ids, function ($a, $b) {
        $a_date = (string) get_post_meta($a, '_kbc_event_start_ymd', true);
        $b_date = (string) get_post_meta($b, '_kbc_event_start_ymd', true);

        if ($a_date !== $b_date) {
            if ($a_date === '') return 1;
            if ($b_date === '') return -1;
            return strcmp($a_date, $b_date);
        }

        $title_compare = strcasecmp(kbc_events_suite_get_event_title($a), kbc_events_suite_get_event_title($b));
        return $title_compare !== 0 ? $title_compare : ($a <=> $b);
    });

    return $ids;
}

function kbc_events_suite_assign_missing_event_order($post_id) {
    $post_id = absint($post_id);
    if (!$post_id || get_post_type($post_id) !== kbc_events_suite_event_post_type()) {
        return 0;
    }

    $meta_key = kbc_events_suite_event_order_meta_key();
    $existing = get_post_meta($post_id, $meta_key, true);
    if ($existing !== '') {
        return absint($existing);
    }

    global $wpdb;
    $max_order = (int) $wpdb->get_var($wpdb->prepare(
        "SELECT MAX(CAST(meta_value AS UNSIGNED)) FROM {$wpdb->postmeta} WHERE meta_key = %s",
        $meta_key
    ));
    $order = max(10, $max_order + 10);
    add_post_meta($post_id, $meta_key, $order, true);

    return absint(get_post_meta($post_id, $meta_key, true));
}

function kbc_events_suite_initialize_missing_event_order($force = false) {
    /* Never write to the database merely because a visitor opened a page. */
    if (!kbc_events_suite_can_write_event_order()) {
        return;
    }

    if (!$force && get_transient('kbc_events_suite_event_order_checked')) {
        return;
    }

    $ids = get_posts(array(
        'post_type'              => kbc_events_suite_event_post_type(),
        'post_status'            => array('publish', 'future', 'draft', 'pending', 'private'),
        'posts_per_page'         => -1,
        'fields'                 => 'ids',
        'no_found_rows'          => true,
        'update_post_meta_cache' => true,
        'update_post_term_cache' => false,
        'meta_query'             => array(array(
            'key'     => kbc_events_suite_event_order_meta_key(),
            'compare' => 'NOT EXISTS',
        )),
    ));

    foreach (kbc_events_suite_event_order_sort_ids_by_date($ids) as $post_id) {
        kbc_events_suite_assign_missing_event_order($post_id);
    }

    set_transient('kbc_events_suite_event_order_checked', 1, DAY_IN_SECONDS);
}

function kbc_events_suite_get_all_ordered_event_ids() {
    kbc_events_suite_initialize_missing_event_order();

    return get_posts(array(
        'post_type'              => kbc_events_suite_event_post_type(),
        'post_status'            => array('publish', 'future', 'draft', 'pending', 'private'),
        'posts_per_page'         => -1,
        'fields'                 => 'ids',
        'no_found_rows'          => true,
        'meta_key'               => kbc_events_suite_event_order_meta_key(),
        'orderby'                => array('meta_value_num' => 'ASC', 'ID' => 'ASC'),
        'order'                  => 'ASC',
        'update_post_meta_cache' => true,
        'update_post_term_cache' => false,
    ));
}

function kbc_events_suite_get_reorder_event_ids($category_slug = '') {
    $args = array(
        'post_type'              => kbc_events_suite_event_post_type(),
        'post_status'            => array('publish', 'future', 'draft', 'pending', 'private'),
        'posts_per_page'         => -1,
        'fields'                 => 'ids',
        'no_found_rows'          => true,
        'meta_key'               => kbc_events_suite_event_order_meta_key(),
        'orderby'                => array('meta_value_num' => 'ASC', 'title' => 'ASC'),
        'order'                  => 'ASC',
        'update_post_meta_cache' => true,
        'update_post_term_cache' => true,
    );

    kbc_events_suite_initialize_missing_event_order();

    if ($category_slug) {
        $args['tax_query'] = array(array(
            'taxonomy' => kbc_events_suite_taxonomy(),
            'field'    => 'slug',
            'terms'    => sanitize_title($category_slug),
        ));
    }

    return get_posts($args);
}

/** Replace only the selected slots while keeping a single global order. */
function kbc_events_suite_merge_event_order_subset($global_ids, $ordered_subset) {
    $global_ids = array_values(array_unique(array_map('absint', (array) $global_ids)));
    $ordered_subset = array_values(array_intersect(
        array_values(array_unique(array_map('absint', (array) $ordered_subset))),
        $global_ids
    ));

    if (!$ordered_subset) {
        return $global_ids;
    }

    $subset_lookup = array_fill_keys($ordered_subset, true);
    $cursor = 0;
    foreach ($global_ids as $index => $post_id) {
        if (isset($subset_lookup[$post_id])) {
            $global_ids[$index] = $ordered_subset[$cursor];
            $cursor++;
        }
    }

    return $global_ids;
}

function kbc_events_suite_save_global_event_order($ids) {
    $orders = array();
    foreach (array_values(array_unique(array_map('absint', (array) $ids))) as $index => $post_id) {
        if (get_post_type($post_id) !== kbc_events_suite_event_post_type()) {
            continue;
        }

        $order = ($index + 1) * 10;
        update_post_meta($post_id, kbc_events_suite_event_order_meta_key(), $order);
        $orders[(string) $post_id] = $order;
    }

    delete_transient('kbc_events_suite_event_order_checked');
    return $orders;
}

function kbc_events_suite_reset_manual_order($category_slug = '') {
    $global_ids = kbc_events_suite_get_all_ordered_event_ids();

    if ($category_slug) {
        $selected_ids = get_posts(array(
            'post_type'      => kbc_events_suite_event_post_type(),
            'post_status'    => array('publish', 'future', 'draft', 'pending', 'private'),
            'posts_per_page' => -1,
            'fields'         => 'ids',
            'no_found_rows'  => true,
            'tax_query'      => array(array(
                'taxonomy' => kbc_events_suite_taxonomy(),
                'field'    => 'slug',
                'terms'    => sanitize_title($category_slug),
            )),
        ));
        $selected_ids = kbc_events_suite_event_order_sort_ids_by_date($selected_ids);
        $global_ids = kbc_events_suite_merge_event_order_subset($global_ids, $selected_ids);
        kbc_events_suite_save_global_event_order($global_ids);
        return count($selected_ids);
    }

    $global_ids = kbc_events_suite_event_order_sort_ids_by_date($global_ids);
    kbc_events_suite_save_global_event_order($global_ids);
    return count($global_ids);
}

function kbc_events_suite_render_reorder_page() {
    if (!current_user_can('manage_options')) {
        return;
    }

    $selected_category = isset($_GET['event_category']) ? sanitize_title(wp_unslash($_GET['event_category'])) : '';
    $message = '';

    if (isset($_POST['kbc_events_suite_reset_order'])) {
        check_admin_referer('kbc_events_suite_reorder_action', 'kbc_events_suite_reorder_nonce');
        $selected_category = isset($_POST['kbc_events_suite_reorder_category']) ? sanitize_title(wp_unslash($_POST['kbc_events_suite_reorder_category'])) : '';
        $count = kbc_events_suite_reset_manual_order($selected_category);
        $message = sprintf(
            /* translators: %d: event count. */
            __('Global manual order reset by event date for %d event(s).', 'kbc-events-suite-pro'),
            absint($count)
        );
    }

    $terms = get_terms(array('taxonomy' => kbc_events_suite_taxonomy(), 'hide_empty' => false));
    $event_ids = kbc_events_suite_get_reorder_event_ids($selected_category);
    ?>
    <div class="wrap kbc-events-suite-reorder-page">
        <h1><?php esc_html_e('Re-order Events', 'kbc-events-suite-pro'); ?></h1>
        <?php if ($message) : ?><div class="notice notice-success is-dismissible"><p><?php echo esc_html($message); ?></p></div><?php endif; ?>
        <p><?php esc_html_e('Drag and drop events, then save. Category filters edit the selected events inside one collision-free global order.', 'kbc-events-suite-pro'); ?></p>

        <form method="get" class="kbc-reorder-filter-form">
            <input type="hidden" name="post_type" value="<?php echo esc_attr(kbc_events_suite_event_post_type()); ?>">
            <input type="hidden" name="page" value="kbc-events-suite-reorder">
            <label><strong><?php esc_html_e('Filter by category', 'kbc-events-suite-pro'); ?></strong><br><select name="event_category"><option value=""><?php esc_html_e('All event categories', 'kbc-events-suite-pro'); ?></option><?php if (!is_wp_error($terms)) : foreach ($terms as $term) : ?><option value="<?php echo esc_attr($term->slug); ?>" <?php selected($selected_category, $term->slug); ?>><?php echo esc_html($term->name); ?></option><?php endforeach; endif; ?></select></label>
            <button type="submit" class="button"><?php esc_html_e('Filter', 'kbc-events-suite-pro'); ?></button>
        </form>

        <form method="post" class="kbc-reorder-reset-form">
            <?php wp_nonce_field('kbc_events_suite_reorder_action', 'kbc_events_suite_reorder_nonce'); ?>
            <input type="hidden" name="kbc_events_suite_reorder_category" value="<?php echo esc_attr($selected_category); ?>">
            <button type="submit" name="kbc_events_suite_reset_order" class="button"><?php esc_html_e('Reset current order by event date', 'kbc-events-suite-pro'); ?></button>
        </form>

        <div class="kbc-reorder-toolbar"><button type="button" class="button button-primary" id="kbc-events-save-order"><?php esc_html_e('Save Order', 'kbc-events-suite-pro'); ?></button><span id="kbc-events-reorder-status" aria-live="polite"></span></div>

        <?php if (!$event_ids) : ?>
            <div class="notice notice-warning"><p><?php esc_html_e('No events found for this filter.', 'kbc-events-suite-pro'); ?></p></div>
        <?php else : ?>
            <ul id="kbc-events-reorder-list" class="kbc-events-reorder-list">
                <?php foreach ($event_ids as $event_id) :
                    $title = kbc_events_suite_get_event_title($event_id);
                    $date_display = kbc_events_suite_format_acf_date(kbc_events_suite_get_meta($event_id, 'event_start_date'));
                    $image_url = kbc_events_suite_get_event_image_url($event_id, 'thumbnail');
                    $terms_for_event = get_the_terms($event_id, kbc_events_suite_taxonomy());
                    $term_names = (!is_wp_error($terms_for_event) && $terms_for_event) ? implode(', ', wp_list_pluck($terms_for_event, 'name')) : __('Uncategorised', 'kbc-events-suite-pro');
                    $manual_order = get_post_meta($event_id, kbc_events_suite_event_order_meta_key(), true);
                    ?>
                    <li class="kbc-reorder-item" data-id="<?php echo esc_attr($event_id); ?>">
                        <span class="kbc-reorder-handle" aria-hidden="true">=</span>
                        <span class="kbc-reorder-thumb"><?php if ($image_url) : ?><img src="<?php echo esc_url($image_url); ?>" alt=""><?php else : ?><span><?php esc_html_e('No image', 'kbc-events-suite-pro'); ?></span><?php endif; ?></span>
                        <span class="kbc-reorder-main"><strong><?php echo esc_html($title); ?></strong><small><?php esc_html_e('Date:', 'kbc-events-suite-pro'); ?> <?php echo esc_html($date_display ?: '-'); ?> | <?php esc_html_e('Category:', 'kbc-events-suite-pro'); ?> <?php echo esc_html($term_names); ?> | <?php esc_html_e('Order:', 'kbc-events-suite-pro'); ?> <code><?php echo esc_html($manual_order !== '' ? $manual_order : '-'); ?></code></small></span>
                        <span class="kbc-reorder-links"><a href="<?php echo esc_url(get_edit_post_link($event_id)); ?>"><?php esc_html_e('Edit', 'kbc-events-suite-pro'); ?></a> | <a href="<?php echo esc_url(get_permalink($event_id)); ?>" target="_blank" rel="noopener"><?php esc_html_e('View', 'kbc-events-suite-pro'); ?></a></span>
                    </li>
                <?php endforeach; ?>
            </ul>
        <?php endif; ?>
    </div>
    <?php
}

function kbc_events_suite_reorder_admin_assets($hook) {
    if (empty($_GET['page']) || sanitize_key(wp_unslash($_GET['page'])) !== 'kbc-events-suite-reorder') {
        return;
    }

    wp_enqueue_script('jquery-ui-sortable');
    wp_enqueue_style('kbc-events-suite-reorder-admin', kbc_events_suite_asset_url('assets/css/admin-reorder.css'), array(), KBC_EVENTS_SUITE_VERSION);
    wp_enqueue_script('kbc-events-suite-reorder-admin', kbc_events_suite_asset_url('assets/js/admin-reorder.js'), array('jquery', 'jquery-ui-sortable'), KBC_EVENTS_SUITE_VERSION, true);
    wp_localize_script('kbc-events-suite-reorder-admin', 'kbcEventsSuiteReorder', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce'   => wp_create_nonce('kbc_events_suite_reorder_action'),
        'saving'  => __('Saving…', 'kbc-events-suite-pro'),
        'saved'   => __('Order saved.', 'kbc-events-suite-pro'),
        'error'   => __('Could not save order.', 'kbc-events-suite-pro'),
    ));
}
add_action('admin_enqueue_scripts', 'kbc_events_suite_reorder_admin_assets');

function kbc_events_suite_ajax_save_event_order() {
    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => __('Permission denied.', 'kbc-events-suite-pro')));
    }

    check_ajax_referer('kbc_events_suite_reorder_action', 'nonce');

    $requested = isset($_POST['order']) && is_array($_POST['order'])
        ? array_values(array_filter(array_unique(array_map('absint', wp_unslash($_POST['order'])))))
        : array();

    $requested = array_values(array_filter($requested, function ($post_id) {
        return get_post_type($post_id) === kbc_events_suite_event_post_type();
    }));

    if (!$requested) {
        wp_send_json_error(array('message' => __('No valid events received.', 'kbc-events-suite-pro')));
    }

    $global_ids = kbc_events_suite_get_all_ordered_event_ids();
    $merged = kbc_events_suite_merge_event_order_subset($global_ids, $requested);
    $orders = kbc_events_suite_save_global_event_order($merged);

    kbc_events_suite_log('Manual event order saved', array('count' => count($requested)), 'info');

    wp_send_json_success(array(
        'message' => sprintf(
            /* translators: %d: event count. */
            __('Order saved for %d event(s).', 'kbc-events-suite-pro'),
            count($requested)
        ),
        'orders' => $orders,
    ));
}
add_action('wp_ajax_kbc_events_suite_save_event_order', 'kbc_events_suite_ajax_save_event_order');
