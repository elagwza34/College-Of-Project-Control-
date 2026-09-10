<?php
if (!defined('ABSPATH')) {
    exit;
}

function kbc_events_suite_render_settings_page() {
    if (!current_user_can('manage_options')) {
        return;
    }

    $message = '';

    if (isset($_POST['kbc_events_suite_save_suite_settings'])) {
        check_admin_referer('kbc_events_suite_settings_action', 'kbc_events_suite_settings_nonce');

        $post_type = sanitize_key(wp_unslash($_POST['kbc_events_suite_event_post_type'] ?? 'event'));
        $taxonomy = sanitize_key(wp_unslash($_POST['kbc_events_suite_taxonomy'] ?? 'event_category'));
        update_option('kbc_events_suite_event_post_type', $post_type ?: 'event');
        update_option('kbc_events_suite_taxonomy', $taxonomy ?: 'event_category');

        $register_mode = sanitize_key(wp_unslash($_POST['kbc_events_suite_register_event_post_type'] ?? 'auto'));
        if (!in_array($register_mode, array('auto', 'yes', 'no'), true)) {
            $register_mode = 'auto';
        }
        update_option('kbc_events_suite_register_event_post_type', $register_mode);
        update_option('kbc_events_suite_event_singular_label', sanitize_text_field(wp_unslash($_POST['kbc_events_suite_event_singular_label'] ?? 'Event')));
        update_option('kbc_events_suite_event_plural_label', sanitize_text_field(wp_unslash($_POST['kbc_events_suite_event_plural_label'] ?? 'Events')));

        $event_archive_slug = sanitize_title(wp_unslash($_POST['kbc_events_suite_event_archive_slug'] ?? 'events'));
        update_option('kbc_events_suite_event_archive_slug', $event_archive_slug ?: 'events');

        $taxonomy_rewrite_slug = sanitize_title(wp_unslash($_POST['kbc_events_suite_taxonomy_rewrite_slug'] ?? 'event-category'));
        update_option('kbc_events_suite_taxonomy_rewrite_slug', $taxonomy_rewrite_slug ?: 'event-category');

        foreach (kbc_events_suite_event_field_defaults() as $logical_field => $default_key) {
            $field_key = sanitize_key(wp_unslash($_POST['kbc_events_suite_field_' . $logical_field] ?? $default_key));
            update_option('kbc_events_suite_field_' . $logical_field, $field_key ?: $default_key);
        }

        update_option('kbc_events_suite_close_registration_days', absint($_POST['kbc_events_suite_close_registration_days'] ?? 1));
        update_option('kbc_events_suite_highlights_after_days', absint($_POST['kbc_events_suite_highlights_after_days'] ?? 1));

        $highlights_target = sanitize_key(wp_unslash($_POST['kbc_events_suite_highlights_target'] ?? 'acf'));
        if (!in_array($highlights_target, array('acf', 'single', 'gallery', 'fallback'), true)) {
            $highlights_target = 'acf';
        }
        update_option('kbc_events_suite_highlights_target', $highlights_target);
        update_option('kbc_events_suite_highlights_fallback_url', esc_url_raw(wp_unslash($_POST['kbc_events_suite_highlights_fallback_url'] ?? '')));

        update_option('kbc_events_suite_fallback_image_url', esc_url_raw(wp_unslash($_POST['kbc_events_suite_fallback_image_url'] ?? '')));
        update_option('kbc_events_suite_fallback_image_id', absint($_POST['kbc_events_suite_fallback_image_id'] ?? 0));
        update_option('kbc_events_suite_image_priority', sanitize_text_field(wp_unslash($_POST['kbc_events_suite_image_priority'] ?? 'acf,featured,eventbrite,remote,fallback')));

        update_option('kbc_events_suite_default_columns', max(1, min(4, absint($_POST['kbc_events_suite_default_columns'] ?? 3))));
        update_option('kbc_events_suite_default_limit', max(1, min(100, absint($_POST['kbc_events_suite_default_limit'] ?? 6))));
        $orderby = sanitize_key(wp_unslash($_POST['kbc_events_suite_default_orderby'] ?? 'start_date'));
        if (!in_array($orderby, array('start_date', 'manual', 'title', 'published'), true)) {
            $orderby = 'start_date';
        }
        update_option('kbc_events_suite_default_orderby', $orderby);
        update_option('kbc_events_suite_filter_result_limit', max(1, min(500, absint($_POST['kbc_events_suite_filter_result_limit'] ?? 100))));
        update_option('kbc_events_suite_image_height', max(140, min(420, absint($_POST['kbc_events_suite_image_height'] ?? 240))));
        update_option('kbc_events_suite_show_excerpt', isset($_POST['kbc_events_suite_show_excerpt']) ? 'yes' : 'no');
        update_option('kbc_events_suite_show_category_badge', isset($_POST['kbc_events_suite_show_category_badge']) ? 'yes' : 'no');

        $default_date_scope = kbc_events_suite_normalise_date_scope(wp_unslash($_POST['kbc_events_suite_default_date_scope'] ?? 'upcoming'), 'upcoming');
        update_option('kbc_events_suite_default_date_scope', $default_date_scope);
        update_option('kbc_events_suite_default_date_tabs', isset($_POST['kbc_events_suite_default_date_tabs']) ? 'yes' : 'no');

        $default_active_tab = kbc_events_suite_normalise_date_scope(wp_unslash($_POST['kbc_events_suite_default_active_tab'] ?? 'upcoming'), 'upcoming');
        if ($default_active_tab === 'all') {
            $default_active_tab = 'upcoming';
        }
        update_option('kbc_events_suite_default_active_tab', $default_active_tab);
        update_option('kbc_events_suite_upcoming_label', sanitize_text_field(wp_unslash($_POST['kbc_events_suite_upcoming_label'] ?? 'Upcoming Events')));
        update_option('kbc_events_suite_ended_label', sanitize_text_field(wp_unslash($_POST['kbc_events_suite_ended_label'] ?? 'Ended Events')));

        update_option('kbc_events_suite_preserve_manual_edits', isset($_POST['kbc_events_suite_preserve_manual_edits']) ? 'yes' : 'no');
        update_option('kbc_events_suite_schema_enabled', isset($_POST['kbc_events_suite_schema_enabled']) ? 'yes' : 'no');

        update_option('kbc_events_suite_elementor_loop_enabled', isset($_POST['kbc_events_suite_elementor_loop_enabled']) ? 'yes' : 'no');
        $selector_defaults = kbc_events_suite_elementor_selector_defaults();
        foreach ($selector_defaults as $selector_key => $selector_default) {
            $option_key = 'kbc_events_suite_elementor_' . $selector_key;
            $posted_key = $option_key;
            update_option($option_key, sanitize_text_field(wp_unslash($_POST[$posted_key] ?? $selector_default)));
        }

        $design_preset = sanitize_key(wp_unslash($_POST['kbc_events_suite_design_preset'] ?? 'gold'));
        if (!in_array($design_preset, array('purple', 'gold', 'minimal'), true)) {
            $design_preset = 'gold';
        }
        update_option('kbc_events_suite_design_preset', $design_preset);
        update_option('kbc_events_suite_primary_colour', kbc_events_suite_hex_or_default(wp_unslash($_POST['kbc_events_suite_primary_colour'] ?? '#E2AF6D'), '#E2AF6D'));
        update_option('kbc_events_suite_secondary_colour', kbc_events_suite_hex_or_default(wp_unslash($_POST['kbc_events_suite_secondary_colour'] ?? '#E2AF6D'), '#E2AF6D'));
        update_option('kbc_events_suite_accent_colour', kbc_events_suite_hex_or_default(wp_unslash($_POST['kbc_events_suite_accent_colour'] ?? '#E2AF6D'), '#E2AF6D'));
        update_option('kbc_events_suite_keyword_category_mapping', sanitize_textarea_field(wp_unslash($_POST['kbc_events_suite_keyword_category_mapping'] ?? '')));
        update_option('kbc_events_suite_log_limit', max(25, min(5000, absint($_POST['kbc_events_suite_log_limit'] ?? 150))));

        $labels = array(
            'open'       => sanitize_text_field(wp_unslash($_POST['kbc_events_suite_button_open'] ?? 'Secure Your Seat')),
            'details'    => sanitize_text_field(wp_unslash($_POST['kbc_events_suite_button_details'] ?? 'More Details')),
            'closed'     => sanitize_text_field(wp_unslash($_POST['kbc_events_suite_button_closed'] ?? 'Registration Closed')),
            'highlights' => sanitize_text_field(wp_unslash($_POST['kbc_events_suite_button_highlights'] ?? 'See Event Highlights')),
        );
        update_option('kbc_events_suite_button_labels', $labels);

        $allowed_protected = array(
            'post_title', 'post_content', 'post_excerpt', 'featured_image',
            'event_title', 'description', 'short_description', 'event_start_date',
            'end_event_date_copy', 'start_time', 'end_time', 'location', 'map',
            'event_status', 'booking_url', 'category_', 'image', 'view_highlights', 'view_gallery_',
        );
        $protected = isset($_POST['kbc_events_suite_do_not_overwrite_fields']) && is_array($_POST['kbc_events_suite_do_not_overwrite_fields'])
            ? array_map('sanitize_key', wp_unslash($_POST['kbc_events_suite_do_not_overwrite_fields']))
            : array();
        $protected = array_values(array_intersect($allowed_protected, $protected));
        update_option('kbc_events_suite_do_not_overwrite_fields', $protected);

        kbc_events_suite_clear_frontend_event_timing_map_cache();
        kbc_events_suite_log('Suite settings saved', array(), 'info');
        $message = __('Settings saved. If you changed the post type or taxonomy slug, open Settings > Permalinks and click Save Changes.', 'kbc-events-suite-pro');
    }

    $labels = get_option('kbc_events_suite_button_labels', array());
    if (!is_array($labels)) {
        $labels = array();
    }

    $protected = kbc_events_suite_do_not_overwrite_fields();
    $protectable = array(
        'post_title'         => __('WordPress title', 'kbc-events-suite-pro'),
        'post_content'       => __('WordPress content', 'kbc-events-suite-pro'),
        'post_excerpt'       => __('WordPress excerpt', 'kbc-events-suite-pro'),
        'featured_image'     => __('Featured image', 'kbc-events-suite-pro'),
        'event_title'        => __('ACF event title', 'kbc-events-suite-pro'),
        'description'        => __('ACF description', 'kbc-events-suite-pro'),
        'short_description'  => __('ACF short description', 'kbc-events-suite-pro'),
        'event_start_date'   => __('Start date', 'kbc-events-suite-pro'),
        'end_event_date_copy'=> __('End date', 'kbc-events-suite-pro'),
        'start_time'         => __('Start time', 'kbc-events-suite-pro'),
        'end_time'           => __('End time', 'kbc-events-suite-pro'),
        'location'           => __('Location', 'kbc-events-suite-pro'),
        'map'                => __('Map', 'kbc-events-suite-pro'),
        'event_status'       => __('Event status', 'kbc-events-suite-pro'),
        'booking_url'        => __('Booking URL', 'kbc-events-suite-pro'),
        'category_'          => __('Eventbrite category field', 'kbc-events-suite-pro'),
        'image'              => __('ACF event image', 'kbc-events-suite-pro'),
        'view_highlights'    => __('Highlights URL', 'kbc-events-suite-pro'),
        'view_gallery_'      => __('Gallery URL', 'kbc-events-suite-pro'),
    );
    $selector_defaults = kbc_events_suite_elementor_selector_defaults();
    $field_labels = kbc_events_suite_event_field_labels();
    $field_defaults = kbc_events_suite_event_field_defaults();
    $event_type_labels = kbc_events_suite_event_post_type_labels();
    ?>
    <div class="wrap">
        <h1><?php esc_html_e('Events Suite Settings', 'kbc-events-suite-pro'); ?></h1>
        <?php if ($message) : ?><div class="notice notice-success is-dismissible"><p><?php echo esc_html($message); ?></p></div><?php endif; ?>
        <form method="post">
            <?php wp_nonce_field('kbc_events_suite_settings_action', 'kbc_events_suite_settings_nonce'); ?>

            <h2><?php esc_html_e('Manual Edit Protection', 'kbc-events-suite-pro'); ?></h2>
            <div class="notice notice-info inline" style="margin-left:0;max-width:980px;">
                <p><strong><?php esc_html_e('Recommended: keep this enabled.', 'kbc-events-suite-pro'); ?></strong> <?php esc_html_e('The plugin stores the last Eventbrite value separately. If an editor changes the WordPress title, content, excerpt, image, category or a synced field, later syncs keep the local edit and only refresh the hidden Eventbrite source snapshot.', 'kbc-events-suite-pro'); ?></p>
            </div>
            <table class="form-table" role="presentation">
                <tr><th scope="row"><?php esc_html_e('Automatic Protection', 'kbc-events-suite-pro'); ?></th><td><label><input type="checkbox" name="kbc_events_suite_preserve_manual_edits" value="yes" <?php checked(kbc_events_suite_preserve_manual_edits()); ?>> <strong><?php esc_html_e('Preserve all detected manual edits after every Eventbrite sync', 'kbc-events-suite-pro'); ?></strong></label></td></tr>
            </table>
            <h3><?php esc_html_e('Permanent Field Locks', 'kbc-events-suite-pro'); ?></h3>
            <p><?php esc_html_e('These optional locks never let Eventbrite replace a non-empty local value, even when it was not changed after the previous sync.', 'kbc-events-suite-pro'); ?></p>
            <fieldset>
                <?php foreach ($protectable as $field => $field_label) : ?>
                    <label style="display:inline-block;margin:0 18px 10px 0;"><input type="checkbox" name="kbc_events_suite_do_not_overwrite_fields[]" value="<?php echo esc_attr($field); ?>" <?php checked(in_array($field, $protected, true)); ?>> <?php echo esc_html($field_label); ?> <code><?php echo esc_html($field); ?></code></label>
                <?php endforeach; ?>
            </fieldset>

            <h2><?php esc_html_e('General', 'kbc-events-suite-pro'); ?></h2>
            <table class="form-table" role="presentation">
                <tr><th scope="row"><label for="kbc_events_suite_event_post_type"><?php esc_html_e('Event Post Type Slug', 'kbc-events-suite-pro'); ?></label></th><td><input id="kbc_events_suite_event_post_type" name="kbc_events_suite_event_post_type" value="<?php echo esc_attr(kbc_events_suite_event_post_type()); ?>" class="regular-text"><p class="description"><?php esc_html_e('Use your site event post type, for example event, events, tribe_events, training, course, or webinar.', 'kbc-events-suite-pro'); ?></p></td></tr>
                <tr><th scope="row"><?php esc_html_e('Register Event Post Type', 'kbc-events-suite-pro'); ?></th><td><select name="kbc_events_suite_register_event_post_type"><option value="auto" <?php selected(kbc_events_suite_get_register_event_post_type_mode(), 'auto'); ?>><?php esc_html_e('Auto-register if missing', 'kbc-events-suite-pro'); ?></option><option value="yes" <?php selected(kbc_events_suite_get_register_event_post_type_mode(), 'yes'); ?>><?php esc_html_e('Always register when slug is free', 'kbc-events-suite-pro'); ?></option><option value="no" <?php selected(kbc_events_suite_get_register_event_post_type_mode(), 'no'); ?>><?php esc_html_e('Never register; use an existing post type only', 'kbc-events-suite-pro'); ?></option></select><p class="description"><?php esc_html_e('Use Auto for most websites. Choose Never when another plugin or theme owns the event post type.', 'kbc-events-suite-pro'); ?></p></td></tr>
                <tr><th scope="row"><label for="kbc_events_suite_event_singular_label"><?php esc_html_e('Event Singular Label', 'kbc-events-suite-pro'); ?></label></th><td><input id="kbc_events_suite_event_singular_label" name="kbc_events_suite_event_singular_label" value="<?php echo esc_attr($event_type_labels['singular']); ?>" class="regular-text"></td></tr>
                <tr><th scope="row"><label for="kbc_events_suite_event_plural_label"><?php esc_html_e('Event Plural Label', 'kbc-events-suite-pro'); ?></label></th><td><input id="kbc_events_suite_event_plural_label" name="kbc_events_suite_event_plural_label" value="<?php echo esc_attr($event_type_labels['plural']); ?>" class="regular-text"></td></tr>
                <tr><th scope="row"><label for="kbc_events_suite_event_archive_slug"><?php esc_html_e('Event Archive URL Slug', 'kbc-events-suite-pro'); ?></label></th><td><input id="kbc_events_suite_event_archive_slug" name="kbc_events_suite_event_archive_slug" value="<?php echo esc_attr(kbc_events_suite_event_archive_slug()); ?>" class="regular-text"><p class="description"><?php esc_html_e('Used only when this plugin registers the event post type.', 'kbc-events-suite-pro'); ?></p></td></tr>
                <tr><th scope="row"><label for="kbc_events_suite_taxonomy"><?php esc_html_e('Event Taxonomy Slug', 'kbc-events-suite-pro'); ?></label></th><td><input id="kbc_events_suite_taxonomy" name="kbc_events_suite_taxonomy" value="<?php echo esc_attr(kbc_events_suite_taxonomy()); ?>" class="regular-text"><p class="description"><?php esc_html_e('Category taxonomy used for grid filters, for example event_category, tribe_events_cat, category, or course_category.', 'kbc-events-suite-pro'); ?></p></td></tr>
                <tr><th scope="row"><label for="kbc_events_suite_taxonomy_rewrite_slug"><?php esc_html_e('Taxonomy URL Slug', 'kbc-events-suite-pro'); ?></label></th><td><input id="kbc_events_suite_taxonomy_rewrite_slug" name="kbc_events_suite_taxonomy_rewrite_slug" value="<?php echo esc_attr(kbc_events_suite_taxonomy_rewrite_slug()); ?>" class="regular-text"><p class="description"><?php esc_html_e('Used only when this plugin registers the taxonomy.', 'kbc-events-suite-pro'); ?></p></td></tr>
                <tr><th scope="row"><?php esc_html_e('Event Schema', 'kbc-events-suite-pro'); ?></th><td><label><input type="checkbox" name="kbc_events_suite_schema_enabled" value="yes" <?php checked(get_option('kbc_events_suite_schema_enabled', 'yes'), 'yes'); ?>> <?php esc_html_e('Output Event JSON-LD on single published event pages', 'kbc-events-suite-pro'); ?></label></td></tr>
            </table>

            <h2><?php esc_html_e('Field Mapping', 'kbc-events-suite-pro'); ?></h2>
            <p><?php esc_html_e('Map the plugin to your site meta or ACF field names. The defaults preserve the original field names from this plugin.', 'kbc-events-suite-pro'); ?></p>
            <table class="form-table" role="presentation">
                <?php foreach ($field_defaults as $logical_field => $default_key) : ?>
                    <?php $field_option_name = 'kbc_events_suite_field_' . $logical_field; ?>
                    <tr>
                        <th scope="row"><label for="<?php echo esc_attr($field_option_name); ?>"><?php echo esc_html($field_labels[$logical_field] ?? $logical_field); ?></label></th>
                        <td>
                            <input id="<?php echo esc_attr($field_option_name); ?>" name="<?php echo esc_attr($field_option_name); ?>" value="<?php echo esc_attr(kbc_events_suite_field_key($logical_field)); ?>" class="regular-text code">
                            <p class="description"><?php printf(esc_html__('Default: %s', 'kbc-events-suite-pro'), '<code>' . esc_html($default_key) . '</code>'); ?></p>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </table>

            <h2><?php esc_html_e('Button Rules', 'kbc-events-suite-pro'); ?></h2>
            <table class="form-table" role="presentation">
                <tr><th scope="row"><?php esc_html_e('Close registration', 'kbc-events-suite-pro'); ?></th><td><input type="number" min="0" name="kbc_events_suite_close_registration_days" value="<?php echo esc_attr(get_option('kbc_events_suite_close_registration_days', 1)); ?>"> <?php esc_html_e('day(s) before the event', 'kbc-events-suite-pro'); ?></td></tr>
                <tr><th scope="row"><?php esc_html_e('Show highlights', 'kbc-events-suite-pro'); ?></th><td><input type="number" min="0" name="kbc_events_suite_highlights_after_days" value="<?php echo esc_attr(get_option('kbc_events_suite_highlights_after_days', 1)); ?>"> <?php esc_html_e('day(s) after the event end date', 'kbc-events-suite-pro'); ?></td></tr>
                <tr><th scope="row"><?php esc_html_e('Open Event Label', 'kbc-events-suite-pro'); ?></th><td><input name="kbc_events_suite_button_open" value="<?php echo esc_attr($labels['open'] ?? __('Secure Your Seat', 'kbc-events-suite-pro')); ?>" class="regular-text"></td></tr>
                <tr><th scope="row"><?php esc_html_e('Details Label', 'kbc-events-suite-pro'); ?></th><td><input name="kbc_events_suite_button_details" value="<?php echo esc_attr($labels['details'] ?? __('More Details', 'kbc-events-suite-pro')); ?>" class="regular-text"></td></tr>
                <tr><th scope="row"><?php esc_html_e('Closed Label', 'kbc-events-suite-pro'); ?></th><td><input name="kbc_events_suite_button_closed" value="<?php echo esc_attr($labels['closed'] ?? __('Registration Closed', 'kbc-events-suite-pro')); ?>" class="regular-text"></td></tr>
                <tr><th scope="row"><?php esc_html_e('Highlights Label', 'kbc-events-suite-pro'); ?></th><td><input name="kbc_events_suite_button_highlights" value="<?php echo esc_attr($labels['highlights'] ?? __('See Event Highlights', 'kbc-events-suite-pro')); ?>" class="regular-text"></td></tr>
                <tr><th scope="row"><?php esc_html_e('Highlights Link Target', 'kbc-events-suite-pro'); ?></th><td><select name="kbc_events_suite_highlights_target"><option value="acf" <?php selected(get_option('kbc_events_suite_highlights_target', 'acf'), 'acf'); ?>><?php esc_html_e('ACF highlights URL, then fallbacks', 'kbc-events-suite-pro'); ?></option><option value="single" <?php selected(get_option('kbc_events_suite_highlights_target', 'acf'), 'single'); ?>><?php esc_html_e('Single event page', 'kbc-events-suite-pro'); ?></option><option value="gallery" <?php selected(get_option('kbc_events_suite_highlights_target', 'acf'), 'gallery'); ?>><?php esc_html_e('ACF gallery URL', 'kbc-events-suite-pro'); ?></option><option value="fallback" <?php selected(get_option('kbc_events_suite_highlights_target', 'acf'), 'fallback'); ?>><?php esc_html_e('Custom fallback URL', 'kbc-events-suite-pro'); ?></option></select></td></tr>
                <tr><th scope="row"><?php esc_html_e('Highlights Fallback URL', 'kbc-events-suite-pro'); ?></th><td><input type="url" name="kbc_events_suite_highlights_fallback_url" value="<?php echo esc_attr(get_option('kbc_events_suite_highlights_fallback_url', '')); ?>" class="regular-text"></td></tr>
            </table>

            <h2><?php esc_html_e('Grid Display', 'kbc-events-suite-pro'); ?></h2>
            <table class="form-table" role="presentation">
                <tr><th scope="row"><?php esc_html_e('Default Columns', 'kbc-events-suite-pro'); ?></th><td><input type="number" min="1" max="4" name="kbc_events_suite_default_columns" value="<?php echo esc_attr(get_option('kbc_events_suite_default_columns', 3)); ?>"></td></tr>
                <tr><th scope="row"><?php esc_html_e('Default Initial Limit', 'kbc-events-suite-pro'); ?></th><td><input type="number" min="1" max="100" name="kbc_events_suite_default_limit" value="<?php echo esc_attr(get_option('kbc_events_suite_default_limit', 6)); ?>"></td></tr>
                <tr><th scope="row"><?php esc_html_e('Maximum Filter Results', 'kbc-events-suite-pro'); ?></th><td><input type="number" min="1" max="500" name="kbc_events_suite_filter_result_limit" value="<?php echo esc_attr(get_option('kbc_events_suite_filter_result_limit', 100)); ?>"><p class="description"><?php esc_html_e('Prevents date/category filters from running an unlimited query.', 'kbc-events-suite-pro'); ?></p></td></tr>
                <tr><th scope="row"><?php esc_html_e('Default Order', 'kbc-events-suite-pro'); ?></th><td><select name="kbc_events_suite_default_orderby"><option value="start_date" <?php selected(get_option('kbc_events_suite_default_orderby', 'start_date'), 'start_date'); ?>><?php esc_html_e('Event start date', 'kbc-events-suite-pro'); ?></option><option value="manual" <?php selected(get_option('kbc_events_suite_default_orderby', 'start_date'), 'manual'); ?>><?php esc_html_e('Manual order', 'kbc-events-suite-pro'); ?></option><option value="title" <?php selected(get_option('kbc_events_suite_default_orderby', 'start_date'), 'title'); ?>><?php esc_html_e('Title', 'kbc-events-suite-pro'); ?></option><option value="published" <?php selected(get_option('kbc_events_suite_default_orderby', 'start_date'), 'published'); ?>><?php esc_html_e('Published date', 'kbc-events-suite-pro'); ?></option></select></td></tr>
                <tr><th scope="row"><?php esc_html_e('Default Date Scope', 'kbc-events-suite-pro'); ?></th><td><select name="kbc_events_suite_default_date_scope"><option value="upcoming" <?php selected(get_option('kbc_events_suite_default_date_scope', 'upcoming'), 'upcoming'); ?>><?php esc_html_e('Upcoming only', 'kbc-events-suite-pro'); ?></option><option value="ended" <?php selected(get_option('kbc_events_suite_default_date_scope', 'upcoming'), 'ended'); ?>><?php esc_html_e('Ended only', 'kbc-events-suite-pro'); ?></option><option value="all" <?php selected(get_option('kbc_events_suite_default_date_scope', 'upcoming'), 'all'); ?>><?php esc_html_e('All events', 'kbc-events-suite-pro'); ?></option></select><p class="description"><?php esc_html_e('Upcoming uses the end date. If an event has no end date, the start date is used.', 'kbc-events-suite-pro'); ?></p></td></tr>
                <tr><th scope="row"><?php esc_html_e('Default Date Tabs', 'kbc-events-suite-pro'); ?></th><td><label><input type="checkbox" name="kbc_events_suite_default_date_tabs" value="yes" <?php checked(get_option('kbc_events_suite_default_date_tabs', 'no'), 'yes'); ?>> <?php esc_html_e('Show Upcoming / Ended tabs on event grids by default', 'kbc-events-suite-pro'); ?></label><p class="description"><?php esc_html_e('You can override this per shortcode with date_tabs="yes" or date_tabs="no".', 'kbc-events-suite-pro'); ?></p></td></tr>
                <tr><th scope="row"><?php esc_html_e('Default Active Tab', 'kbc-events-suite-pro'); ?></th><td><select name="kbc_events_suite_default_active_tab"><option value="upcoming" <?php selected(get_option('kbc_events_suite_default_active_tab', 'upcoming'), 'upcoming'); ?>><?php esc_html_e('Upcoming', 'kbc-events-suite-pro'); ?></option><option value="ended" <?php selected(get_option('kbc_events_suite_default_active_tab', 'upcoming'), 'ended'); ?>><?php esc_html_e('Ended', 'kbc-events-suite-pro'); ?></option></select></td></tr>
                <tr><th scope="row"><?php esc_html_e('Upcoming Tab Label', 'kbc-events-suite-pro'); ?></th><td><input name="kbc_events_suite_upcoming_label" value="<?php echo esc_attr(get_option('kbc_events_suite_upcoming_label', __('Upcoming Events', 'kbc-events-suite-pro'))); ?>" class="regular-text"></td></tr>
                <tr><th scope="row"><?php esc_html_e('Ended Tab Label', 'kbc-events-suite-pro'); ?></th><td><input name="kbc_events_suite_ended_label" value="<?php echo esc_attr(get_option('kbc_events_suite_ended_label', __('Ended Events', 'kbc-events-suite-pro'))); ?>" class="regular-text"><p class="description"><?php esc_html_e('Example: [kbc_events_grid category="pcp" date_tabs="yes"] shows Upcoming and Ended PCP events only.', 'kbc-events-suite-pro'); ?></p></td></tr>
                <tr><th scope="row"><?php esc_html_e('Image Height', 'kbc-events-suite-pro'); ?></th><td><input type="number" min="140" max="420" name="kbc_events_suite_image_height" value="<?php echo esc_attr(get_option('kbc_events_suite_image_height', 240)); ?>"> px</td></tr>
                <tr><th scope="row"><?php esc_html_e('Show Excerpt', 'kbc-events-suite-pro'); ?></th><td><label><input type="checkbox" name="kbc_events_suite_show_excerpt" value="yes" <?php checked(get_option('kbc_events_suite_show_excerpt', 'yes'), 'yes'); ?>> <?php esc_html_e('Yes', 'kbc-events-suite-pro'); ?></label></td></tr>
                <tr><th scope="row"><?php esc_html_e('Show Category Badge', 'kbc-events-suite-pro'); ?></th><td><label><input type="checkbox" name="kbc_events_suite_show_category_badge" value="yes" <?php checked(get_option('kbc_events_suite_show_category_badge', 'yes'), 'yes'); ?>> <?php esc_html_e('Yes', 'kbc-events-suite-pro'); ?></label></td></tr>
            </table>

            <h2><?php esc_html_e('Elementor Loop Compatibility', 'kbc-events-suite-pro'); ?></h2>
            <table class="form-table" role="presentation">
                <tr><th scope="row"><?php esc_html_e('Enable Compatibility', 'kbc-events-suite-pro'); ?></th><td><label><input type="checkbox" name="kbc_events_suite_elementor_loop_enabled" value="yes" <?php checked(get_option('kbc_events_suite_elementor_loop_enabled', 'yes'), 'yes'); ?>> <?php esc_html_e('Control buttons inside Elementor Loop Grid cards', 'kbc-events-suite-pro'); ?></label></td></tr>
                <?php
                $selector_labels = array(
                    'card_selector' => __('Card Selector', 'kbc-events-suite-pro'),
                    'date_selector' => __('Start Date Selector (legacy)', 'kbc-events-suite-pro'),
                    'start_time_selector' => __('Start Time Selector (legacy)', 'kbc-events-suite-pro'),
                    'end_date_selector' => __('End Date Selector (legacy)', 'kbc-events-suite-pro'),
                    'end_time_selector' => __('End Time Selector (legacy)', 'kbc-events-suite-pro'),
                    'secure_selector' => __('Secure Button Selector', 'kbc-events-suite-pro'),
                    'details_selector' => __('Details Button Selector', 'kbc-events-suite-pro'),
                    'highlights_url_selector' => __('Highlights URL Selector', 'kbc-events-suite-pro'),
                    'highlights_button_selector' => __('Highlights Button Selector', 'kbc-events-suite-pro'),
                );
                foreach ($selector_defaults as $selector_key => $selector_default) :
                    $option_name = 'kbc_events_suite_elementor_' . $selector_key;
                    ?>
                    <tr><th scope="row"><label for="<?php echo esc_attr($option_name); ?>"><?php echo esc_html($selector_labels[$selector_key]); ?></label></th><td><input id="<?php echo esc_attr($option_name); ?>" name="<?php echo esc_attr($option_name); ?>" value="<?php echo esc_attr(get_option($option_name, $selector_default)); ?>" class="<?php echo in_array($selector_key, array('card_selector', 'highlights_button_selector'), true) ? 'large-text' : 'regular-text'; ?>"></td></tr>
                <?php endforeach; ?>
            </table>

            <h2><?php esc_html_e('Images', 'kbc-events-suite-pro'); ?></h2>
            <table class="form-table" role="presentation">
                <tr><th scope="row"><?php esc_html_e('Image Priority', 'kbc-events-suite-pro'); ?></th><td><input name="kbc_events_suite_image_priority" value="<?php echo esc_attr(get_option('kbc_events_suite_image_priority', 'acf,featured,eventbrite,remote,fallback')); ?>" class="large-text"><p class="description"><code>acf,featured,eventbrite,remote,fallback</code></p></td></tr>
                <tr><th scope="row"><?php esc_html_e('Fallback Image ID', 'kbc-events-suite-pro'); ?></th><td><input type="number" min="0" name="kbc_events_suite_fallback_image_id" value="<?php echo esc_attr(get_option('kbc_events_suite_fallback_image_id', 0)); ?>"></td></tr>
                <tr><th scope="row"><?php esc_html_e('Fallback Image URL', 'kbc-events-suite-pro'); ?></th><td><input type="url" name="kbc_events_suite_fallback_image_url" value="<?php echo esc_attr(get_option('kbc_events_suite_fallback_image_url', '')); ?>" class="regular-text"></td></tr>
            </table>

            <h2><?php esc_html_e('Category Mapping by Title Keyword', 'kbc-events-suite-pro'); ?></h2>
            <table class="form-table" role="presentation"><tr><th scope="row"><?php esc_html_e('Keyword Mapping', 'kbc-events-suite-pro'); ?></th><td><textarea name="kbc_events_suite_keyword_category_mapping" rows="7" class="large-text code"><?php echo esc_textarea(get_option('kbc_events_suite_keyword_category_mapping', "Marketing|marketing\nPCP|pcp\nProject Control|pcp\nPMP|pmp\nProject Management|pmp\nLeadership|leadership")); ?></textarea><p class="description"><?php esc_html_e('One per line: keyword|local-category-slug.', 'kbc-events-suite-pro'); ?></p></td></tr></table>

            <h2><?php esc_html_e('Design and Logs', 'kbc-events-suite-pro'); ?></h2>
            <table class="form-table" role="presentation">
                <tr><th scope="row"><?php esc_html_e('Preset', 'kbc-events-suite-pro'); ?></th><td><select name="kbc_events_suite_design_preset"><option value="purple" <?php selected(get_option('kbc_events_suite_design_preset', 'gold'), 'purple'); ?>><?php esc_html_e('Purple', 'kbc-events-suite-pro'); ?></option><option value="gold" <?php selected(get_option('kbc_events_suite_design_preset', 'gold'), 'gold'); ?>><?php esc_html_e('Gold', 'kbc-events-suite-pro'); ?></option><option value="minimal" <?php selected(get_option('kbc_events_suite_design_preset', 'gold'), 'minimal'); ?>><?php esc_html_e('Minimal', 'kbc-events-suite-pro'); ?></option></select></td></tr>
                <tr><th scope="row"><?php esc_html_e('Primary Colour', 'kbc-events-suite-pro'); ?></th><td><input type="color" name="kbc_events_suite_primary_colour" value="<?php echo esc_attr(get_option('kbc_events_suite_primary_colour', '#E2AF6D')); ?>"></td></tr>
                <tr><th scope="row"><?php esc_html_e('Secondary Colour', 'kbc-events-suite-pro'); ?></th><td><input type="color" name="kbc_events_suite_secondary_colour" value="<?php echo esc_attr(get_option('kbc_events_suite_secondary_colour', '#E2AF6D')); ?>"></td></tr>
                <tr><th scope="row"><?php esc_html_e('Accent Colour', 'kbc-events-suite-pro'); ?></th><td><input type="color" name="kbc_events_suite_accent_colour" value="<?php echo esc_attr(get_option('kbc_events_suite_accent_colour', '#E2AF6D')); ?>"></td></tr>
                <tr><th scope="row"><?php esc_html_e('Log Limit', 'kbc-events-suite-pro'); ?></th><td><input type="number" min="25" max="5000" name="kbc_events_suite_log_limit" value="<?php echo esc_attr(get_option('kbc_events_suite_log_limit', 150)); ?>"></td></tr>
            </table>

            <p><button type="submit" name="kbc_events_suite_save_suite_settings" class="button button-primary"><?php esc_html_e('Save Suite Settings', 'kbc-events-suite-pro'); ?></button></p>
        </form>
    </div>
    <?php
}
