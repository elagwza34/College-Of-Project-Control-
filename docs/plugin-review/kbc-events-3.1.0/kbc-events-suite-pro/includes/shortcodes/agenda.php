<?php
if (!defined('ABSPATH')) {
    exit;
}

function kbc_events_suite_event_agenda_shortcode($atts) {
    $atts = shortcode_atts(array(
        'id'     => get_the_ID(),
        'height' => '',
    ), $atts, 'kbc_event_agenda');

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
        'orderby'        => array('meta_value_num' => 'ASC', 'title' => 'ASC'),
        'order'          => 'ASC',
    ));

    if (!$sessions) {
        return '<div class="kbc-empty-agenda">No agenda sessions found for this event.</div>';
    }

    $tracks = array();
    foreach ($sessions as $session) {
        $track = kbc_events_suite_get_track_data_from_session($session);
        $key = $track['key'];

        if (!isset($tracks[$key])) {
            $tracks[$key] = array(
                'id'       => $track['id'],
                'title'    => $track['title'],
                'subtitle' => $track['subtitle'],
                'color'    => $track['color'],
                'order'    => $track['order'],
                'sessions' => array(),
            );
        }

        $tracks[$key]['sessions'][] = $session;
    }

    uasort($tracks, function ($a, $b) {
        $ao = isset($a['order']) ? (int) $a['order'] : 999;
        $bo = isset($b['order']) ? (int) $b['order'] : 999;

        if ($ao === $bo) {
            return strcasecmp($a['title'], $b['title']);
        }

        return $ao <=> $bo;
    });

    $tracks = array_values($tracks);
    $uid = 'kbc-agenda-tabs-' . wp_rand(1000, 999999);
    $height_style = '';

    if ($atts['height'] !== '') {
        $height = preg_replace('/[^0-9pxvhrem%]/', '', $atts['height']);
        if ($height) {
            $height_style = 'height:' . esc_attr($height) . ';max-height:' . esc_attr($height) . ';';
        }
    }

    ob_start();
    ?>
    <section class="kbc-agenda-tabs" id="<?php echo esc_attr($uid); ?>">
        <div class="kbc-agenda-tabs-nav" role="tablist" aria-label="Event agenda tracks">
            <?php foreach ($tracks as $index => $track) :
                $tab_key = $uid . '-tab-' . $index;
                ?>
                <button type="button" class="kbc-agenda-tab-btn <?php echo $index === 0 ? 'is-active' : ''; ?>" data-kbc-agenda-tab="<?php echo esc_attr($tab_key); ?>" style="--kbc-track-color: <?php echo esc_attr($track['color']); ?>;" role="tab" aria-selected="<?php echo $index === 0 ? 'true' : 'false'; ?>">
                    <?php echo esc_html($track['title']); ?><?php if (!empty($track['subtitle'])) : ?><span> <?php echo esc_html($track['subtitle']); ?></span><?php endif; ?>
                </button>
            <?php endforeach; ?>
        </div>

        <div class="kbc-agenda-tabs-panels">
            <?php foreach ($tracks as $index => $track) :
                $tab_key = $uid . '-tab-' . $index;
                ?>
                <div class="kbc-agenda-panel <?php echo $index === 0 ? 'is-active' : ''; ?>" data-kbc-agenda-panel="<?php echo esc_attr($tab_key); ?>" style="--kbc-track-color: <?php echo esc_attr($track['color']); ?>;<?php echo $height_style; ?>" role="tabpanel">
                    <div class="kbc-sessions">
                        <?php foreach ($track['sessions'] as $session) :
                            $session_time = get_post_meta($session->ID, '_kbc_session_time', true);
                            $speaker_name = get_post_meta($session->ID, '_kbc_speaker_name', true);
                            $speaker_job = get_post_meta($session->ID, '_kbc_speaker_job_title', true);
                            $speaker_image_id = get_post_meta($session->ID, '_kbc_speaker_image_id', true);
                            $session_description = get_post_meta($session->ID, '_kbc_session_description', true);
                            $speaker_image_url = $speaker_image_id ? wp_get_attachment_image_url($speaker_image_id, 'thumbnail') : '';
                            ?>
                            <article class="kbc-session-card">
                                <?php if ($session_time) : ?><div class="kbc-session-time"><span class="kbc-clock" aria-hidden="true"></span><span><?php echo esc_html($session_time); ?></span></div><?php endif; ?>
                                <div class="kbc-speaker-row">
                                    <?php if ($speaker_image_url) : ?><img src="<?php echo esc_url($speaker_image_url); ?>" alt="<?php echo esc_attr($speaker_name); ?>" class="kbc-speaker-img"><?php else : ?><div class="kbc-speaker-placeholder" aria-hidden="true"></div><?php endif; ?>
                                    <div><?php if ($speaker_name) : ?><h3><?php echo esc_html($speaker_name); ?></h3><?php endif; ?><?php if ($speaker_job) : ?><div class="kbc-speaker-job"><?php echo esc_html($speaker_job); ?></div><?php endif; ?></div>
                                </div>
                                <button class="kbc-session-toggle" type="button" aria-expanded="false"><span class="kbc-session-plus">+</span><span><?php echo esc_html(get_the_title($session->ID)); ?></span></button>
                                <?php if ($session_description) : ?><div class="kbc-session-desc"><?php echo wp_kses_post(wpautop($session_description)); ?></div><?php endif; ?>
                            </article>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </section>
    <?php
    return ob_get_clean();
}
add_shortcode('kbc_event_agenda', 'kbc_events_suite_event_agenda_shortcode');
