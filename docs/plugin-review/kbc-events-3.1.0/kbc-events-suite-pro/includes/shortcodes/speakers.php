<?php
if (!defined('ABSPATH')) {
    exit;
}

function kbc_events_suite_event_speakers_shortcode($atts) {
    $atts = shortcode_atts(array('id' => get_the_ID(), 'title' => 'Speakers'), $atts, 'kbc_event_speakers');
    $event_id = absint($atts['id']);
    if (!$event_id) {
        return '';
    }

    kbc_events_suite_enqueue_frontend_assets();

    $sessions = get_posts(array(
        'post_type'      => 'kbc_agenda_session',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'meta_query'     => array(array('key' => '_kbc_event_id', 'value' => $event_id, 'compare' => '=')),
        'meta_key'       => '_kbc_session_order',
        'orderby'        => 'meta_value_num',
        'order'          => 'ASC',
    ));

    if (!$sessions) {
        return '<div class="kbc-speakers-empty">No speakers found for this event.</div>';
    }

    $speakers = array();
    foreach ($sessions as $session) {
        $name = get_post_meta($session->ID, '_kbc_speaker_name', true);
        if (!$name) {
            continue;
        }

        $key = sanitize_title($name);
        if (!isset($speakers[$key])) {
            $speakers[$key] = array(
                'name'      => $name,
                'job_title' => get_post_meta($session->ID, '_kbc_speaker_job_title', true),
                'linkedin'  => get_post_meta($session->ID, '_kbc_speaker_linkedin_url', true),
                'image_id'  => get_post_meta($session->ID, '_kbc_speaker_image_id', true),
            );
        }
    }

    if (!$speakers) {
        return '<div class="kbc-speakers-empty">No speakers found for this event.</div>';
    }

    $speaker_count = count($speakers);
    $grid_classes = array('kbc-speakers-grid');

    if ($speaker_count > 6) {
        $grid_classes[] = 'kbc-speakers-carousel';
    }

    ob_start();
    ?>
    <section class="kbc-speakers-section">
        <?php if ($atts['title'] !== '') : ?><h2 class="kbc-speakers-title"><?php echo esc_html($atts['title']); ?></h2><?php endif; ?>
        <div class="<?php echo esc_attr(implode(' ', $grid_classes)); ?>" data-speaker-count="<?php echo esc_attr($speaker_count); ?>">
            <?php foreach ($speakers as $speaker) :
                $img = $speaker['image_id'] ? wp_get_attachment_image_url($speaker['image_id'], 'medium') : '';
                $tag = $speaker['linkedin'] ? 'a' : 'div';
                ?>
                <<?php echo esc_html($tag); ?> class="kbc-speaker-card" <?php if ($speaker['linkedin']) : ?>href="<?php echo esc_url($speaker['linkedin']); ?>" target="_blank" rel="noopener noreferrer"<?php endif; ?>>
                    <?php if ($img) : ?><img src="<?php echo esc_url($img); ?>" alt="<?php echo esc_attr($speaker['name']); ?>"><?php else : ?><div class="kbc-speaker-card-placeholder" aria-hidden="true"></div><?php endif; ?>
                    <h3 class="kbc-speaker-card-name"><?php echo esc_html($speaker['name']); ?></h3>
                    <?php if ($speaker['job_title']) : ?><p class="kbc-speaker-card-job"><?php echo esc_html($speaker['job_title']); ?></p><?php endif; ?>
                </<?php echo esc_html($tag); ?>>
            <?php endforeach; ?>
        </div>
    </section>
    <?php
    return ob_get_clean();
}
add_shortcode('kbc_event_speakers', 'kbc_events_suite_event_speakers_shortcode');
