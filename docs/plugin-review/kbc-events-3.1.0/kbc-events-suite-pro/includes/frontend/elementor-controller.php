<?php
if (!defined('ABSPATH')) {
    exit;
}

function kbc_events_suite_page_uses_event_controls() {
    if (is_admin() || is_feed() || wp_doing_ajax() || (defined('REST_REQUEST') && REST_REQUEST)) {
        return false;
    }

    $should_load = is_singular(kbc_events_suite_event_post_type())
        || is_post_type_archive(kbc_events_suite_event_post_type())
        || is_tax(kbc_events_suite_taxonomy());

    $queried_id = absint(get_queried_object_id());
    if (!$should_load && $queried_id) {
        $content = (string) get_post_field('post_content', $queried_id, 'raw');
        $elementor_data = (string) get_post_meta($queried_id, '_elementor_data', true);
        $haystack = $content . "\n" . $elementor_data;
        $needles = array(
            'loop-grid',
            'kbc_event_loop_date_filters',
            'kbc_events_loop_date_filters',
            ltrim(kbc_events_suite_get_elementor_selector('secure_selector'), '.'),
            ltrim(kbc_events_suite_get_elementor_selector('details_selector'), '.'),
        );

        foreach ($needles as $needle) {
            if ($needle !== '' && stripos($haystack, $needle) !== false) {
                $should_load = true;
                break;
            }
        }
    }

    return (bool) apply_filters('kbc_events_suite_should_load_event_controls', $should_load, $queried_id);
}

function kbc_events_suite_elementor_loop_footer_controller() {
    if (get_option('kbc_events_suite_elementor_loop_enabled', 'yes') !== 'yes') {
        return;
    }

    if (!kbc_events_suite_page_uses_event_controls()) {
        return;
    }

    wp_enqueue_script(
        'kbc-events-suite-elementor-controller',
        kbc_events_suite_asset_url('assets/js/elementor-controller.js'),
        array(),
        KBC_EVENTS_SUITE_VERSION,
        true
    );

    wp_localize_script('kbc-events-suite-elementor-controller', 'KBCEventsSuiteElementorController', array(
        'debug'                    => isset($_GET['kbc_events_debug']) && current_user_can('manage_options'),
        'cardSelector'             => kbc_events_suite_get_elementor_selector('card_selector'),
        'secureSelector'           => kbc_events_suite_get_elementor_selector('secure_selector'),
        'detailsSelector'          => kbc_events_suite_get_elementor_selector('details_selector'),
        'highlightsButtonSelector' => kbc_events_suite_get_elementor_selector('highlights_button_selector'),
        'highlightsUrlSelector'    => kbc_events_suite_get_elementor_selector('highlights_url_selector'),
        'eventTimingOverrides'     => kbc_events_suite_get_frontend_event_timing_map(),
        'labels'                   => array(
            'open'       => kbc_events_suite_get_button_label('open'),
            'details'    => kbc_events_suite_get_button_label('details'),
            'closed'     => kbc_events_suite_get_button_label('closed'),
            'highlights' => kbc_events_suite_get_button_label('highlights'),
        ),
    ));
}
add_action('wp_enqueue_scripts', 'kbc_events_suite_elementor_loop_footer_controller', 99);

function kbc_events_suite_registration_url_key($url) {
    $url = html_entity_decode((string) $url, ENT_QUOTES, get_bloginfo('charset') ?: 'UTF-8');
    $parts = wp_parse_url($url);
    if (!is_array($parts) || empty($parts['host'])) {
        return '';
    }

    $host = strtolower((string) $parts['host']);
    $port = !empty($parts['port']) ? ':' . absint($parts['port']) : '';
    $path = isset($parts['path']) ? rawurldecode((string) $parts['path']) : '/';
    $path = untrailingslashit($path) ?: '/';

    return $host . $port . $path;
}

function kbc_events_suite_get_blocked_registration_links() {
    $blocked = array();
    $map = kbc_events_suite_get_frontend_event_timing_map();

    foreach ((array) ($map['events'] ?? array()) as $event_id => $event_data) {
        $state = isset($event_data['state']) ? sanitize_key($event_data['state']) : 'open';
        if ($state === 'open') {
            continue;
        }

        $urls = array(
            kbc_events_suite_get_url_meta(absint($event_id), 'booking_url'),
            get_post_meta(absint($event_id), '_kbc_eventbrite_url', true),
        );

        foreach ($urls as $url) {
            $key = kbc_events_suite_registration_url_key($url);
            if (!$key) {
                continue;
            }

            $blocked[$key] = array(
                'state'         => $state,
                'highlightsUrl' => isset($event_data['highlightsUrl']) ? esc_url_raw($event_data['highlightsUrl']) : '',
            );
        }
    }

    return $blocked;
}

/**
 * Remove closed Eventbrite links from the server-rendered HTML. JavaScript only
 * improves presentation; it is no longer the enforcement layer.
 */
function kbc_events_suite_filter_closed_registration_links($html) {
    if (!is_string($html) || stripos($html, '<a') === false) {
        return $html;
    }

    $blocked = isset($GLOBALS['kbc_events_suite_blocked_registration_links'])
        ? (array) $GLOBALS['kbc_events_suite_blocked_registration_links']
        : array();

    if (!$blocked) {
        return $html;
    }

    return preg_replace_callback('/<a\b[^>]*>/i', function ($matches) use ($blocked) {
        $tag = $matches[0];
        if (!preg_match('/\shref\s*=\s*(?:(["\'])(.*?)\1|([^\s>]+))/i', $tag, $href_match)) {
            return $tag;
        }

        $href = isset($href_match[2]) && $href_match[2] !== '' ? $href_match[2] : ($href_match[3] ?? '');
        $key = kbc_events_suite_registration_url_key($href);
        if (!$key || !isset($blocked[$key])) {
            return $tag;
        }

        $record = $blocked[$key];
        $state = isset($record['state']) ? sanitize_key($record['state']) : 'closed';
        $tag = preg_replace('/\s+(?:href|target|onclick|data-kbc-original-href)\s*=\s*(?:"[^"]*"|\'[^\']*\'|[^\s>]+)/i', '', $tag);
        $tag = preg_replace('/\s+aria-disabled\s*=\s*(?:"[^"]*"|\'[^\']*\'|[^\s>]+)/i', '', $tag);

        $attributes = ' data-kbc-server-state="' . esc_attr($state) . '"';
        if ($state === 'ended' && !empty($record['highlightsUrl'])) {
            $attributes .= ' href="' . esc_url($record['highlightsUrl']) . '"';
        } else {
            $attributes .= ' aria-disabled="true"';
        }

        return preg_replace('/>$/', $attributes . '>', $tag, 1);
    }, $html);
}

function kbc_events_suite_start_registration_link_guard() {
    if (get_option('kbc_events_suite_elementor_loop_enabled', 'yes') !== 'yes') {
        return;
    }

    if (!kbc_events_suite_page_uses_event_controls()) {
        return;
    }

    $blocked = kbc_events_suite_get_blocked_registration_links();
    if (!$blocked) {
        return;
    }

    $GLOBALS['kbc_events_suite_blocked_registration_links'] = $blocked;
    ob_start('kbc_events_suite_filter_closed_registration_links');
}
add_action('template_redirect', 'kbc_events_suite_start_registration_link_guard', 20);
