<?php
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Render date filters for an existing Elementor Loop Grid.
 *
 * This shortcode does not render event cards. It only filters the cards that
 * already exist in the target Elementor Loop Grid.
 *
 * Examples:
 * [kbc_event_loop_date_filters]
 * [kbc_event_loop_date_filters target=".events-loop-marketing"]
 * [kbc_event_loop_date_filters upcoming_empty="No upcoming events found." ended_empty="No ended events found."]
 */
function kbc_events_suite_loop_date_filters_shortcode($atts) {
    $atts = shortcode_atts(
        array(
            'active'         => 'upcoming',
            'target'         => '',
            'category'       => '',
            'categories'     => '',
            'term'           => '',
            'terms'          => '',
            'taxonomy'       => '',
            'card_selector'  => '.e-loop-item, .elementor-loop-item',
            'start_selector' => get_option(
                'kbc_events_suite_elementor_date_selector',
                '.event-start-date'
            ),
            'end_selector'   => get_option(
                'kbc_events_suite_elementor_end_date_selector',
                '.event-end-date'
            ),
            'upcoming_label' => get_option('kbc_events_suite_upcoming_label', __('Upcoming Events', 'kbc-events-suite-pro')),
            'ended_label'    => get_option('kbc_events_suite_ended_label', __('Ended Events', 'kbc-events-suite-pro')),
            'upcoming_empty' => __('No upcoming events found.', 'kbc-events-suite-pro'),
            'ended_empty'    => __('No ended events found.', 'kbc-events-suite-pro'),
        ),
        $atts,
        'kbc_event_loop_date_filters'
    );

    $active = sanitize_key($atts['active']);

    if (!in_array($active, array('upcoming', 'ended'), true)) {
        $active = 'upcoming';
    }

    $taxonomy = sanitize_key($atts['taxonomy']) ?: kbc_events_suite_taxonomy();
    $terms = array_merge(
        kbc_events_suite_parse_slug_list($atts['category']),
        kbc_events_suite_parse_slug_list($atts['categories']),
        kbc_events_suite_parse_slug_list($atts['term']),
        kbc_events_suite_parse_slug_list($atts['terms'])
    );
    $terms = array_values(array_unique($terms));

    kbc_events_suite_enqueue_frontend_assets(true);

    ob_start();
    ?>
    <div
        class="kbc-events-filters kbc-loop-date-filters"
        data-kbc-loop-date-filters="yes"
        data-target-selector="<?php echo esc_attr($atts['target']); ?>"
        data-taxonomy="<?php echo esc_attr($taxonomy); ?>"
        data-terms="<?php echo esc_attr(implode(' ', $terms)); ?>"
        data-card-selector="<?php echo esc_attr($atts['card_selector']); ?>"
        data-start-selector="<?php echo esc_attr($atts['start_selector']); ?>"
        data-end-selector="<?php echo esc_attr($atts['end_selector']); ?>"
        data-upcoming-empty="<?php echo esc_attr($atts['upcoming_empty']); ?>"
        data-ended-empty="<?php echo esc_attr($atts['ended_empty']); ?>"
        role="tablist"
        aria-label="<?php echo esc_attr__('Filter events by date', 'kbc-events-suite-pro'); ?>"
    >
        <button
            type="button"
            class="kbc-events-filter-btn kbc-loop-date-filter-btn <?php echo $active === 'upcoming' ? 'is-active' : ''; ?>"
            data-loop-date-filter="upcoming"
            role="tab"
            aria-selected="<?php echo $active === 'upcoming' ? 'true' : 'false'; ?>"
        >
            <?php echo esc_html($atts['upcoming_label']); ?>
        </button>

        <button
            type="button"
            class="kbc-events-filter-btn kbc-loop-date-filter-btn <?php echo $active === 'ended' ? 'is-active' : ''; ?>"
            data-loop-date-filter="ended"
            role="tab"
            aria-selected="<?php echo $active === 'ended' ? 'true' : 'false'; ?>"
        >
            <?php echo esc_html($atts['ended_label']); ?>
        </button>
    </div>
    <?php

    return ob_get_clean();
}

add_shortcode(
    'kbc_event_loop_date_filters',
    'kbc_events_suite_loop_date_filters_shortcode'
);

add_shortcode(
    'kbc_events_loop_date_filters',
    'kbc_events_suite_loop_date_filters_shortcode'
);
