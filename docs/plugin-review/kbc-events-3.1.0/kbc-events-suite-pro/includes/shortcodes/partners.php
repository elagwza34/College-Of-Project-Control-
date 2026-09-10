<?php
if (!defined('ABSPATH')) {
    exit;
}

function kbc_events_suite_get_event_partners($event_id) {
    return get_posts(array(
        'post_type'      => 'kbc_event_partner',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'meta_query'     => array(array('key' => '_kbc_partner_event_id', 'value' => absint($event_id), 'compare' => '=')),
        'meta_key'       => '_kbc_partner_order',
        'orderby'        => array('meta_value_num' => 'ASC', 'title' => 'ASC'),
        'order'          => 'ASC',
    ));
}

function kbc_events_suite_event_partners_shortcode($atts) {
    $atts = shortcode_atts(array('id' => get_the_ID(), 'title' => 'Partner Spotlight', 'empty' => ''), $atts, 'kbc_event_partners');
    $event_id = absint($atts['id']);
    if (!$event_id) {
        return '';
    }

    $partners = kbc_events_suite_get_event_partners($event_id);
    if (!$partners) {
        return $atts['empty'] !== '' ? '<div class="kbc-event-partners-empty">' . esc_html($atts['empty']) . '</div>' : '';
    }

    kbc_events_suite_enqueue_frontend_assets();

    ob_start();
    ?>
    <section class="kbc-event-partners-section"><div class="kbc-event-partners-inner">
        <?php if ($atts['title'] !== '') : ?><h2 class="kbc-event-partners-title"><?php echo esc_html($atts['title']); ?></h2><?php endif; ?>
        <div class="kbc-event-partners-grid">
            <?php foreach ($partners as $partner) :
                $partner_id = $partner->ID;
                $name = get_the_title($partner_id);
                $label = get_post_meta($partner_id, '_kbc_partner_label', true) ?: 'Partner Spotlight';
                $role = get_post_meta($partner_id, '_kbc_partner_role', true) ?: 'Official partner';
                $description = get_post_meta($partner_id, '_kbc_partner_description', true);
                $logo_id = get_post_meta($partner_id, '_kbc_partner_logo_id', true);
                $logo_url = $logo_id ? wp_get_attachment_image_url($logo_id, 'medium') : '';
                $website = get_post_meta($partner_id, '_kbc_partner_website', true);
                $instagram = get_post_meta($partner_id, '_kbc_partner_instagram', true);
                $linkedin = get_post_meta($partner_id, '_kbc_partner_linkedin', true);
                $email = get_post_meta($partner_id, '_kbc_partner_email', true);
                $founder_name = get_post_meta($partner_id, '_kbc_partner_founder_name', true);
                $founder_job_title = get_post_meta($partner_id, '_kbc_partner_founder_job_title', true);
                $initial = $name ? substr($name, 0, 1) : 'P';
                ?>
                <article class="kbc-event-partner-card">
                    <div class="kbc-event-partner-logo-wrap"><?php if ($logo_url) : ?><img src="<?php echo esc_url($logo_url); ?>" alt="<?php echo esc_attr($name); ?>"><?php else : ?><div class="kbc-event-partner-placeholder" aria-hidden="true"><?php echo esc_html($initial); ?></div><?php endif; ?></div>
                    <div class="kbc-event-partner-content">
                        <?php if ($label) : ?><p class="kbc-event-partner-label"><?php echo esc_html($label); ?></p><?php endif; ?>
                        <h3 class="kbc-event-partner-name"><?php echo esc_html($name); ?></h3>
                        <?php if ($role) : ?><p class="kbc-event-partner-role"><?php echo esc_html($role); ?></p><?php endif; ?>
                        <?php if ($description) : ?><div class="kbc-event-partner-description"><?php echo wp_kses_post(wpautop($description)); ?></div><?php endif; ?>
                        <?php if ($founder_name) : ?><p class="kbc-event-partner-founder"><strong>Founder:</strong> <?php echo esc_html($founder_name); ?><?php if ($founder_job_title) : ?> - <?php echo esc_html($founder_job_title); ?><?php endif; ?></p><?php endif; ?>
                        <?php if ($website || $instagram || $linkedin || $email) : ?><div class="kbc-event-partner-links"><?php if ($website) : ?><a href="<?php echo esc_url($website); ?>" target="_blank" rel="noopener noreferrer">Website</a><?php endif; ?><?php if ($instagram) : ?><a href="<?php echo esc_url($instagram); ?>" target="_blank" rel="noopener noreferrer">Instagram</a><?php endif; ?><?php if ($linkedin) : ?><a href="<?php echo esc_url($linkedin); ?>" target="_blank" rel="noopener noreferrer">LinkedIn</a><?php endif; ?><?php if ($email) : ?><a href="<?php echo esc_url('mailto:' . $email); ?>">Email</a><?php endif; ?></div><?php endif; ?>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    </div></section>
    <?php
    return ob_get_clean();
}
add_shortcode('kbc_event_partners', 'kbc_events_suite_event_partners_shortcode');
add_shortcode('kbc_event_partner', 'kbc_events_suite_event_partners_shortcode');
