<?php
if (!defined('ABSPATH')) {
    exit;
}

$GLOBALS['kbc_events_suite_registered_post_types'] = array();
$GLOBALS['kbc_events_suite_post_type_conflicts'] = array();


function kbc_events_suite_register_main_event_post_type() {
    $post_type = kbc_events_suite_event_post_type();

    if (post_type_exists($post_type) || !kbc_events_suite_should_register_event_post_type()) {
        return;
    }

    $labels = kbc_events_suite_event_post_type_labels();
    $singular = $labels['singular'];
    $plural = $labels['plural'];

    register_post_type($post_type, array(
        'labels' => array(
            'name'               => $plural,
            'singular_name'      => $singular,
            'add_new'            => __('Add New', 'kbc-events-suite-pro'),
            'add_new_item'       => sprintf(__('Add New %s', 'kbc-events-suite-pro'), $singular),
            'edit_item'          => sprintf(__('Edit %s', 'kbc-events-suite-pro'), $singular),
            'new_item'           => sprintf(__('New %s', 'kbc-events-suite-pro'), $singular),
            'view_item'          => sprintf(__('View %s', 'kbc-events-suite-pro'), $singular),
            'search_items'       => sprintf(__('Search %s', 'kbc-events-suite-pro'), $plural),
            'not_found'          => sprintf(__('No %s found', 'kbc-events-suite-pro'), strtolower($plural)),
            'not_found_in_trash' => sprintf(__('No %s found in Trash', 'kbc-events-suite-pro'), strtolower($plural)),
            'menu_name'          => $plural,
        ),
        'public'        => true,
        'show_ui'       => true,
        'show_in_menu'  => true,
        'show_in_rest'  => true,
        'has_archive'   => true,
        'hierarchical'  => false,
        'menu_icon'     => 'dashicons-calendar-alt',
        'supports'      => array('title', 'editor', 'excerpt', 'thumbnail', 'custom-fields', 'revisions'),
        'rewrite'       => array('slug' => kbc_events_suite_event_archive_slug(), 'with_front' => false),
    ));

    $GLOBALS['kbc_events_suite_registered_post_types'][$post_type] = true;
}
add_action('init', 'kbc_events_suite_register_main_event_post_type', 999);

function kbc_events_suite_register_taxonomy() {
    $taxonomy = kbc_events_suite_taxonomy();
    $event_post_type = kbc_events_suite_event_post_type();

    if (taxonomy_exists($taxonomy)) {
        register_taxonomy_for_object_type($taxonomy, $event_post_type);
        return;
    }

    register_taxonomy($taxonomy, array($event_post_type), array(
        'labels' => array(
            'name'              => __('Event Categories', 'kbc-events-suite-pro'),
            'singular_name'     => __('Event Category', 'kbc-events-suite-pro'),
            'search_items'      => __('Search Event Categories', 'kbc-events-suite-pro'),
            'all_items'         => __('All Event Categories', 'kbc-events-suite-pro'),
            'edit_item'         => __('Edit Event Category', 'kbc-events-suite-pro'),
            'update_item'       => __('Update Event Category', 'kbc-events-suite-pro'),
            'add_new_item'      => __('Add New Event Category', 'kbc-events-suite-pro'),
            'new_item_name'     => __('New Event Category Name', 'kbc-events-suite-pro'),
            'menu_name'         => __('Event Categories', 'kbc-events-suite-pro'),
        ),
        'public'            => true,
        'hierarchical'      => true,
        'show_ui'           => true,
        'show_admin_column' => true,
        'show_in_rest'      => true,
        'rewrite'           => array('slug' => kbc_events_suite_taxonomy_rewrite_slug(), 'with_front' => false),
    ));
}
add_action('init', 'kbc_events_suite_register_taxonomy', 1000);

function kbc_events_suite_register_auxiliary_post_type($post_type, $args) {
    if (post_type_exists($post_type)) {
        if (empty($GLOBALS['kbc_events_suite_registered_post_types'][$post_type])) {
            $GLOBALS['kbc_events_suite_post_type_conflicts'][$post_type] = true;
        }
        return;
    }

    register_post_type($post_type, $args);
    $GLOBALS['kbc_events_suite_registered_post_types'][$post_type] = true;
}

function kbc_events_suite_auxiliary_post_type_args($kind) {
    $menu = 'edit.php?post_type=' . kbc_events_suite_event_post_type();
    $common = array(
        'public'              => false,
        'publicly_queryable'  => false,
        'exclude_from_search' => true,
        'has_archive'         => false,
        'rewrite'             => false,
        'query_var'           => false,
        'show_ui'             => true,
        'show_in_menu'        => $menu,
        'supports'            => array('title'),
        'show_in_rest'        => true,
    );

    if ($kind === 'track') {
        return array_merge($common, array(
            'labels' => array(
                'name'               => __('Agenda Tracks', 'kbc-events-suite-pro'),
                'singular_name'      => __('Agenda Track', 'kbc-events-suite-pro'),
                'add_new'            => __('Add New Track', 'kbc-events-suite-pro'),
                'add_new_item'       => __('Add New Track', 'kbc-events-suite-pro'),
                'edit_item'          => __('Edit Track', 'kbc-events-suite-pro'),
                'new_item'           => __('New Track', 'kbc-events-suite-pro'),
                'view_item'          => __('View Track', 'kbc-events-suite-pro'),
                'search_items'       => __('Search Tracks', 'kbc-events-suite-pro'),
                'not_found'          => __('No tracks found', 'kbc-events-suite-pro'),
                'not_found_in_trash' => __('No tracks found in Trash', 'kbc-events-suite-pro'),
            ),
            'menu_icon' => 'dashicons-index-card',
        ));
    }

    if ($kind === 'session') {
        return array_merge($common, array(
            'labels' => array(
                'name'               => __('Agenda Sessions', 'kbc-events-suite-pro'),
                'singular_name'      => __('Agenda Session', 'kbc-events-suite-pro'),
                'add_new'            => __('Add New Session', 'kbc-events-suite-pro'),
                'add_new_item'       => __('Add New Session', 'kbc-events-suite-pro'),
                'edit_item'          => __('Edit Session', 'kbc-events-suite-pro'),
                'new_item'           => __('New Session', 'kbc-events-suite-pro'),
                'view_item'          => __('View Session', 'kbc-events-suite-pro'),
                'search_items'       => __('Search Sessions', 'kbc-events-suite-pro'),
                'not_found'          => __('No sessions found', 'kbc-events-suite-pro'),
                'not_found_in_trash' => __('No sessions found in Trash', 'kbc-events-suite-pro'),
            ),
            'menu_icon' => 'dashicons-clock',
        ));
    }

    return array_merge($common, array(
        'labels' => array(
            'name'               => __('Event Partners', 'kbc-events-suite-pro'),
            'singular_name'      => __('Event Partner', 'kbc-events-suite-pro'),
            'add_new'            => __('Add New Partner', 'kbc-events-suite-pro'),
            'add_new_item'       => __('Add New Partner', 'kbc-events-suite-pro'),
            'edit_item'          => __('Edit Partner', 'kbc-events-suite-pro'),
            'new_item'           => __('New Partner', 'kbc-events-suite-pro'),
            'view_item'          => __('View Partner', 'kbc-events-suite-pro'),
            'search_items'       => __('Search Partners', 'kbc-events-suite-pro'),
            'not_found'          => __('No partners found', 'kbc-events-suite-pro'),
            'not_found_in_trash' => __('No partners found in Trash', 'kbc-events-suite-pro'),
        ),
        'menu_icon' => 'dashicons-groups',
    ));
}

function kbc_events_suite_register_post_types() {
    kbc_events_suite_register_auxiliary_post_type('kbc_agenda_track', kbc_events_suite_auxiliary_post_type_args('track'));
    kbc_events_suite_register_auxiliary_post_type('kbc_agenda_session', kbc_events_suite_auxiliary_post_type_args('session'));
    kbc_events_suite_register_auxiliary_post_type('kbc_event_partner', kbc_events_suite_auxiliary_post_type_args('partner'));
}
add_action('init', 'kbc_events_suite_register_post_types', 1000);

function kbc_events_suite_post_type_configuration_notice() {
    if (!current_user_can('manage_options')) {
        return;
    }

    $messages = array();
    $event_post_type = kbc_events_suite_event_post_type();
    if (!post_type_exists($event_post_type)) {
        $messages[] = sprintf(
            /* translators: %s: configured post type slug. */
            __('The configured event post type "%s" is not registered. Enable automatic event post type registration or choose an existing post type slug.', 'kbc-events-suite-pro'),
            $event_post_type
        );
    }

    if (!taxonomy_exists(kbc_events_suite_taxonomy())) {
        $messages[] = sprintf(
            /* translators: %s: configured taxonomy slug. */
            __('The configured event taxonomy "%s" could not be registered.', 'kbc-events-suite-pro'),
            kbc_events_suite_taxonomy()
        );
    }

    $conflicts = array_keys(array_filter((array) $GLOBALS['kbc_events_suite_post_type_conflicts']));
    if ($conflicts) {
        $messages[] = sprintf(
            /* translators: %s: comma-separated post type slugs. */
            __('Another component registered these reserved Events Suite post types first: %s. Their configuration was left untouched.', 'kbc-events-suite-pro'),
            implode(', ', $conflicts)
        );
    }

    foreach ($messages as $message) {
        echo '<div class="notice notice-error"><p><strong>' . esc_html__('Events Suite Pro:', 'kbc-events-suite-pro') . '</strong> ' . esc_html($message) . '</p></div>';
    }
}
add_action('admin_notices', 'kbc_events_suite_post_type_configuration_notice');
