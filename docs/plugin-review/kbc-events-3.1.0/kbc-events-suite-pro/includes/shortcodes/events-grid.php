<?php
if (!defined('ABSPATH')) {
    exit;
}

function kbc_events_suite_events_grid_shortcode($atts) {
    $default_date_scope = get_option('kbc_events_suite_default_date_scope', 'upcoming');
    $atts = shortcode_atts(array(
        'category'       => '',
        'categories'     => '',
        'term'           => '',
        'terms'          => '',
        'taxonomy'       => '',
        'filter_terms'   => '',
        'limit'          => get_option('kbc_events_suite_default_limit', '6'),
        'per_page'       => '',
        'show_past'      => 'no',
        'date_scope'     => $default_date_scope,
        'date_tabs'      => get_option('kbc_events_suite_default_date_tabs', 'no'),
        'active_tab'     => get_option('kbc_events_suite_default_active_tab', 'upcoming'),
        'upcoming_label' => get_option('kbc_events_suite_upcoming_label', __('Upcoming Events', 'kbc-events-suite-pro')),
        'ended_label'    => get_option('kbc_events_suite_ended_label', __('Ended Events', 'kbc-events-suite-pro')),
        'orderby'        => get_option('kbc_events_suite_default_orderby', 'start_date'),
        'order'          => 'ASC',
        'empty'          => __('No events found.', 'kbc-events-suite-pro'),
        'columns'        => get_option('kbc_events_suite_default_columns', '3'),
        'image'          => 'yes',
        'excerpt'        => get_option('kbc_events_suite_show_excerpt', 'yes'),
        'category_badge' => get_option('kbc_events_suite_show_category_badge', 'yes'),
        'filters'        => 'no',
        'pagination'     => 'no',
        'image_height'   => get_option('kbc_events_suite_image_height', '240'),
    ), $atts, 'kbc_events_grid');

    kbc_events_suite_enqueue_frontend_assets();

    $limit = intval($atts['per_page'] ?: $atts['limit']);
    if ($limit <= 0) {
        $limit = 6;
    }

    $columns = max(1, min(4, absint($atts['columns'])));
    $image_height = max(140, min(420, absint($atts['image_height'])));
    $taxonomy = sanitize_key($atts['taxonomy']) ?: kbc_events_suite_taxonomy();

    $tax_slugs = array_merge(
        kbc_events_suite_parse_slug_list($atts['category']),
        kbc_events_suite_parse_slug_list($atts['categories']),
        kbc_events_suite_parse_slug_list($atts['term']),
        kbc_events_suite_parse_slug_list($atts['terms'])
    );
    $tax_slugs = array_values(array_unique($tax_slugs));

    $date_scope = kbc_events_suite_normalise_date_scope($atts['date_scope'], $default_date_scope ?: 'upcoming');
    if ($atts['show_past'] === 'yes' && $atts['date_scope'] === $default_date_scope) {
        $date_scope = 'all';
    }

    $date_tabs_enabled = $atts['date_tabs'] === 'yes';
    $active_tab = kbc_events_suite_normalise_date_scope($atts['active_tab'], 'upcoming');
    if ($active_tab === 'all') {
        $active_tab = 'upcoming';
    }

    $paged = 1;
    if ($atts['pagination'] === 'yes' && !$date_tabs_enabled) {
        $request_page = isset($_GET['kbc_events_page']) ? absint($_GET['kbc_events_page']) : 1;
        $paged = max(1, absint(get_query_var('paged') ?: get_query_var('page') ?: $request_page));
    }

    $orderby = sanitize_key($atts['orderby']);
    $order = strtoupper($atts['order']) === 'DESC' ? 'DESC' : 'ASC';

    $args = array(
        'post_type'           => kbc_events_suite_event_post_type(),
        'posts_per_page'      => $limit,
        'post_status'         => 'publish',
        'order'               => $order,
        'paged'               => $paged,
        'ignore_sticky_posts' => true,
        'no_found_rows'       => $atts['pagination'] !== 'yes' || $date_tabs_enabled,
    );

    if ($orderby === 'manual' && get_option('kbc_events_suite_upgrade_260_pending', 'no') !== 'yes') {
        $args['meta_key'] = kbc_events_suite_event_order_meta_key();
        $args['orderby'] = array('meta_value_num' => $order, 'title' => 'ASC');
    } elseif ($orderby === 'title') {
        $args['orderby'] = 'title';
    } elseif ($orderby === 'published') {
        $args['orderby'] = 'date';
    } else {
        $args['meta_key'] = '_kbc_event_start_ymd';
        $args['orderby'] = array('meta_value' => $order, 'title' => 'ASC');
    }

    if ($taxonomy && taxonomy_exists($taxonomy) && $tax_slugs) {
        $args['tax_query'] = array(array(
            'taxonomy' => $taxonomy,
            'field'    => 'slug',
            'terms'    => $tax_slugs,
        ));
    }

    $query_date_scope = $date_tabs_enabled ? 'all' : $date_scope;
    if ($query_date_scope !== 'all' && get_option('kbc_events_suite_upgrade_260_pending', 'no') !== 'yes') {
        $date_meta_query = kbc_events_suite_date_scope_meta_query($query_date_scope);
        if ($date_meta_query) {
            $args['meta_query'] = $date_meta_query;
        }
    }

    if ($atts['filters'] === 'yes' || $date_tabs_enabled) {
        $filter_limit = max(1, min(500, absint(get_option('kbc_events_suite_filter_result_limit', 100))));
        $args['posts_per_page'] = $filter_limit;
        $args['no_found_rows'] = true;
        unset($args['paged']);
    }

    $q = new WP_Query($args);
    if (!$q->have_posts()) {
        return '<div class="kbc-events-empty">' . esc_html($atts['empty']) . '</div>';
    }

    $filter_include_slugs = kbc_events_suite_parse_slug_list($atts['filter_terms']);
    if (!$filter_include_slugs && $tax_slugs) {
        $filter_include_slugs = $tax_slugs;
    }

    ob_start();
    $wrap_style = '--kbc-events-columns:' . esc_attr($columns) . ';--kbc-events-image-height:' . esc_attr($image_height) . 'px;';
    ?>
    <div class="kbc-events-suite-wrap <?php echo esc_attr(kbc_events_suite_get_design_class()); ?>" style="<?php echo esc_attr($wrap_style); ?>" data-kbc-grid="yes">
        <?php if ($date_tabs_enabled) : ?>
            <div class="kbc-events-filters kbc-events-date-filters" aria-label="<?php echo esc_attr__('Event date filters', 'kbc-events-suite-pro'); ?>" role="tablist">
                <button type="button" class="kbc-events-filter-btn kbc-events-date-filter-btn <?php echo $active_tab === 'upcoming' ? 'is-active' : ''; ?>" data-date-filter="upcoming" role="tab" aria-selected="<?php echo $active_tab === 'upcoming' ? 'true' : 'false'; ?>"><?php echo esc_html($atts['upcoming_label']); ?></button>
                <button type="button" class="kbc-events-filter-btn kbc-events-date-filter-btn <?php echo $active_tab === 'ended' ? 'is-active' : ''; ?>" data-date-filter="ended" role="tab" aria-selected="<?php echo $active_tab === 'ended' ? 'true' : 'false'; ?>"><?php echo esc_html($atts['ended_label']); ?></button>
            </div>
        <?php endif; ?>

        <?php if ($atts['filters'] === 'yes') :
            $filter_terms = kbc_events_suite_get_category_terms_for_filters($taxonomy, $filter_include_slugs);
            if ($filter_terms) : ?>
                <div class="kbc-events-filters kbc-events-category-filters" aria-label="<?php echo esc_attr__('Event category filters', 'kbc-events-suite-pro'); ?>">
                    <button type="button" class="kbc-events-filter-btn is-active" data-filter="all"><?php esc_html_e('All', 'kbc-events-suite-pro'); ?></button>
                    <?php foreach ($filter_terms as $term) : ?>
                        <button type="button" class="kbc-events-filter-btn" data-filter="<?php echo esc_attr($term->slug); ?>"><?php echo esc_html($term->name); ?></button>
                    <?php endforeach; ?>
                </div>
            <?php endif;
        endif; ?>

        <div class="kbc-events-grid">
            <?php while ($q->have_posts()) : $q->the_post();
                $event_id = get_the_ID();
                $title = kbc_events_suite_get_event_title($event_id);
                $summary = kbc_events_suite_get_meta($event_id, 'short_description');
                $image_url = kbc_events_suite_get_event_image_url($event_id, 'large');
                $start_date = kbc_events_suite_get_meta($event_id, 'event_start_date');
                $end_date = kbc_events_suite_get_meta($event_id, 'end_event_date_copy');
                $start_time = kbc_events_suite_get_meta($event_id, 'start_time');
                $end_time = kbc_events_suite_get_meta($event_id, 'end_time');
                $location = kbc_events_suite_get_text_meta($event_id, 'location');
                $booking_url = kbc_events_suite_get_url_meta($event_id, 'booking_url');
                $highlights_url = kbc_events_suite_get_highlights_target($event_id);
                $terms = ($taxonomy && taxonomy_exists($taxonomy)) ? get_the_terms($event_id, $taxonomy) : array();
                $term_label = (!is_wp_error($terms) && !empty($terms)) ? $terms[0]->name : kbc_events_suite_get_meta($event_id, 'category_');
                $term_slugs = (!is_wp_error($terms) && !empty($terms)) ? implode(' ', wp_list_pluck($terms, 'slug')) : '';
                $date_display = kbc_events_suite_format_acf_date($start_date);
                $end_date_display = kbc_events_suite_format_acf_date($end_date);
                $time_display = trim(kbc_events_suite_format_acf_time($start_time) . ($end_time ? ' - ' . kbc_events_suite_format_acf_time($end_time) : ''));
                $button_state = kbc_events_suite_get_event_button_state($event_id);
                $date_state = kbc_events_suite_get_event_date_state($event_id);
                $event_close_days = kbc_events_suite_get_event_close_registration_days($event_id);
                $event_highlights_after_days = kbc_events_suite_get_event_highlights_after_days($event_id);
                $initially_visible = !$date_tabs_enabled || $date_state === $active_tab;
                ?>
                <article class="kbc-event-card" data-kbc-event-id="<?php echo esc_attr($event_id); ?>" data-event-state="<?php echo esc_attr($button_state); ?>" data-kbc-date-state="<?php echo esc_attr($date_state); ?>" data-event-categories="<?php echo esc_attr($term_slugs); ?>" data-kbc-close-days="<?php echo esc_attr($event_close_days); ?>" data-kbc-highlights-after-days="<?php echo esc_attr($event_highlights_after_days); ?>" <?php echo $initially_visible ? '' : 'hidden aria-hidden="true"'; ?>>
                    <?php if ($atts['image'] === 'yes') : ?>
                        <a class="kbc-event-card-image" href="<?php echo esc_url(get_permalink($event_id)); ?>">
                            <?php if ($image_url) : ?><img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($title); ?>" loading="lazy"><?php else : ?><span class="kbc-event-card-image-placeholder"><?php esc_html_e('Event Image', 'kbc-events-suite-pro'); ?></span><?php endif; ?>
                        </a>
                    <?php endif; ?>
                    <div class="kbc-event-card-body">
                        <?php if ($atts['category_badge'] === 'yes' && $term_label) : ?><span class="kbc-event-card-category"><?php echo esc_html($term_label); ?></span><?php endif; ?>
                        <h3 class="kbc-event-card-title"><a href="<?php echo esc_url(get_permalink($event_id)); ?>"><?php echo esc_html($title); ?></a></h3>
                        <div class="kbc-event-card-meta">
                            <?php if ($date_display) : ?><span class="event-start-date"><?php esc_html_e('Date:', 'kbc-events-suite-pro'); ?> <?php echo esc_html($date_display); ?><?php echo ($end_date_display && $end_date_display !== $date_display) ? ' - ' . esc_html($end_date_display) : ''; ?></span><?php endif; ?>
                            <?php if ($time_display) : ?><span class="event-start-time"><?php esc_html_e('Time:', 'kbc-events-suite-pro'); ?> <?php echo esc_html($time_display); ?></span><?php endif; ?>
                            <?php if ($location) : ?><span><?php esc_html_e('Location:', 'kbc-events-suite-pro'); ?> <?php echo esc_html($location); ?></span><?php endif; ?>
                        </div>
                        <?php if ($atts['excerpt'] === 'yes' && $summary) : ?><p class="kbc-event-card-excerpt"><?php echo esc_html(wp_trim_words($summary, 22)); ?></p><?php endif; ?>
                        <div class="kbc-event-card-actions">
                            <?php if ($button_state === 'ended') : ?>
                                <a class="kbc-ended-purple-button" href="<?php echo esc_url($highlights_url); ?>"><?php echo esc_html(kbc_events_suite_get_button_label('highlights')); ?></a>
                            <?php elseif ($button_state === 'closed') : ?>
                                <span class="registration-closed-message"><?php echo esc_html(kbc_events_suite_get_button_label('closed')); ?></span>
                                <a class="kbc-more-details-button" href="<?php echo esc_url(get_permalink($event_id)); ?>"><?php echo esc_html(kbc_events_suite_get_button_label('details')); ?></a>
                            <?php else : ?>
                                <?php if ($booking_url) : ?><a class="kbc-secure-seat-button" href="<?php echo esc_url($booking_url); ?>" target="_blank" rel="noopener noreferrer"><?php echo esc_html(kbc_events_suite_get_button_label('open')); ?></a><?php endif; ?>
                                <a class="kbc-more-details-button" href="<?php echo esc_url(get_permalink($event_id)); ?>"><?php echo esc_html(kbc_events_suite_get_button_label('details')); ?></a>
                            <?php endif; ?>
                        </div>
                    </div>
                </article>
            <?php endwhile; wp_reset_postdata(); ?>
        </div>

        <div class="kbc-events-empty kbc-events-filter-empty" role="status" aria-live="polite" hidden><?php echo esc_html($atts['empty']); ?></div>

        <?php if (!$date_tabs_enabled && $atts['pagination'] === 'yes' && $q->max_num_pages > 1) : ?>
            <nav class="kbc-events-pagination" aria-label="<?php echo esc_attr__('Events pagination', 'kbc-events-suite-pro'); ?>"><?php echo wp_kses_post(paginate_links(array('total' => $q->max_num_pages, 'current' => $paged))); ?></nav>
        <?php endif; ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('kbc_events_grid', 'kbc_events_suite_events_grid_shortcode');
