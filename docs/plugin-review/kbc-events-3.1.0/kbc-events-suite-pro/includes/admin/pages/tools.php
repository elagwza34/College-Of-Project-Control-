<?php
if (!defined('ABSPATH')) {
    exit;
}

function kbc_events_suite_render_tools_page() {
    if (!current_user_can('manage_options')) {
        return;
    }

    $message = '';

    if (isset($_POST['kbc_events_suite_recalculate_terms'])) {
        check_admin_referer('kbc_events_suite_tools_action', 'kbc_events_suite_tools_nonce');
        $posts = get_posts(array(
            'post_type'      => kbc_events_suite_event_post_type(),
            'posts_per_page' => -1,
            'post_status'    => array('publish', 'draft', 'pending', 'future', 'private'),
        ));

        $count = 0;
        foreach ($posts as $post) {
            $cat_name = kbc_events_suite_get_meta($post->ID, 'category_');
            kbc_events_suite_assign_category_from_eventbrite($post->ID, $cat_name, '', get_the_title($post));
            $count++;
        }

        $message = 'Recalculated categories for ' . $count . ' events.';
    }
    ?>
    <div class="wrap">
        <h1>Events Suite Tools</h1>
        <?php if ($message) : ?><div class="notice notice-success is-dismissible"><p><?php echo esc_html($message); ?></p></div><?php endif; ?>
        <form method="post">
            <?php wp_nonce_field('kbc_events_suite_tools_action', 'kbc_events_suite_tools_nonce'); ?>
            <h2>Recalculate Categories</h2>
            <p>Re-applies Eventbrite category and keyword mapping to all events.</p>
            <p><button type="submit" name="kbc_events_suite_recalculate_terms" class="button button-primary">Recalculate Event Categories</button></p>
        </form>
        <h2>Shortcode Builder Examples</h2>
        <p><code>[kbc_events_grid category="marketing" columns="3" limit="6"]</code></p>
        <p><code>[kbc_events_grid category="project-controls" show_past="yes" filters="yes" columns="3"]</code></p>
        <p><code>[kbc_events_grid categories="marketing,project-controls" pagination="yes" per_page="6"]</code></p>
    </div>
    <?php
}
