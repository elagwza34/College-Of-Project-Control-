<?php
if (!defined('ABSPATH')) {
    exit;
}

function kbc_events_suite_event_schema_status($event_id) {
    $status = strtolower((string) get_post_meta($event_id, '_kbc_eventbrite_status', true));

    if (in_array($status, array('canceled', 'cancelled', 'deleted', 'missing'), true)) {
        return 'https://schema.org/EventCancelled';
    }

    if ($status === 'postponed') {
        return 'https://schema.org/EventPostponed';
    }

    return 'https://schema.org/EventScheduled';
}

function kbc_events_suite_event_schema_location($event_id) {
    $online = (bool) absint(get_post_meta($event_id, '_kbc_eventbrite_online_event', true));
    $booking_url = kbc_events_suite_get_url_meta($event_id, 'booking_url');
    $venue_name = kbc_events_suite_get_text_meta($event_id, '_kbc_eventbrite_venue_name');
    $venue_address = kbc_events_suite_get_text_meta($event_id, '_kbc_eventbrite_venue_address');
    $location_text = kbc_events_suite_get_text_meta($event_id, 'location');
    $map_text = kbc_events_suite_get_text_meta($event_id, 'map');

    if ($online || stripos($location_text, 'online') !== false) {
        return array(
            'location' => array(
                '@type' => 'VirtualLocation',
                'url'   => $booking_url ?: get_permalink($event_id),
            ),
            'mode' => 'https://schema.org/OnlineEventAttendanceMode',
        );
    }

    $address = $venue_address ?: $map_text ?: $location_text;
    $name = $venue_name ?: $location_text;
    if (!$name && !$address) {
        return array(
            'location' => array(
                '@type' => 'Place',
                'name'  => get_bloginfo('name'),
                'url'   => home_url('/'),
            ),
            'mode' => 'https://schema.org/OfflineEventAttendanceMode',
        );
    }

    $place = array('@type' => 'Place');
    if ($name) {
        $place['name'] = $name;
    }
    if ($address) {
        $place['address'] = array(
            '@type'        => 'PostalAddress',
            'streetAddress' => $address,
        );
    }

    return array(
        'location' => $place,
        'mode'     => 'https://schema.org/OfflineEventAttendanceMode',
    );
}

function kbc_events_suite_event_schema_organizer($event_id) {
    $name = kbc_events_suite_get_text_meta($event_id, '_kbc_eventbrite_organizer_name');
    $url = kbc_events_suite_get_url_meta($event_id, '_kbc_eventbrite_organizer_url');

    if (!$name) {
        $name = get_bloginfo('name');
    }
    if (!$url) {
        $url = home_url('/');
    }

    return array(
        '@type' => 'Organization',
        '@id'   => trailingslashit($url) . '#organization',
        'name'  => $name,
        'url'   => $url,
    );
}

function kbc_events_suite_partner_schema($partner, $event_url) {
    $partner_id = absint($partner->ID);
    $name = trim((string) get_the_title($partner_id));
    if (!$partner_id || !$name) {
        return array();
    }

    $schema = array(
        '@type' => 'Organization',
        '@id'   => trailingslashit($event_url) . '#partner-' . $partner_id,
        'name'  => $name,
    );

    $alternate_name = kbc_events_suite_get_text_meta($partner_id, '_kbc_partner_alternate_name');
    $description = wp_strip_all_tags((string) get_post_meta($partner_id, '_kbc_partner_description', true));
    $website = kbc_events_suite_get_url_meta($partner_id, '_kbc_partner_website');
    $instagram = kbc_events_suite_get_url_meta($partner_id, '_kbc_partner_instagram');
    $linkedin = kbc_events_suite_get_url_meta($partner_id, '_kbc_partner_linkedin');
    $email = sanitize_email((string) get_post_meta($partner_id, '_kbc_partner_email', true));
    $logo_id = absint(get_post_meta($partner_id, '_kbc_partner_logo_id', true));
    $logo_url = $logo_id && wp_attachment_is_image($logo_id) ? wp_get_attachment_image_url($logo_id, 'full') : '';
    $same_as = array_values(array_filter(array($instagram, $linkedin)));

    if ($alternate_name) {
        $schema['alternateName'] = $alternate_name;
    }
    if ($website) {
        $schema['url'] = $website;
    }
    if ($description) {
        $schema['description'] = $description;
    }
    if ($logo_url) {
        $schema['logo'] = array('@type' => 'ImageObject', 'url' => esc_url_raw($logo_url));
    }
    if ($same_as) {
        $schema['sameAs'] = $same_as;
    }
    if ($email) {
        $schema['contactPoint'] = array(
            '@type'       => 'ContactPoint',
            'contactType' => 'General enquiries',
            'email'       => $email,
        );
    }

    return $schema;
}

function kbc_events_suite_event_partners_schema() {
    if (get_option('kbc_events_suite_schema_enabled', 'yes') !== 'yes' || !is_singular(kbc_events_suite_event_post_type())) {
        return;
    }

    $event_id = absint(get_queried_object_id());
    if (!$event_id || get_post_status($event_id) !== 'publish') {
        return;
    }

    /**
     * SEO plugins can return false here when they already emit a complete Event
     * object. This avoids duplicate graphs without coupling to one vendor.
     */
    if (!apply_filters('kbc_events_suite_schema_should_output', true, $event_id)) {
        return;
    }

    $start_date = kbc_events_suite_get_event_iso_datetime($event_id, 'start');
    if (!$start_date) {
        /* startDate is essential for a useful Event object. */
        return;
    }

    $event_url = get_permalink($event_id);
    $title = kbc_events_suite_get_event_title($event_id) ?: get_the_title($event_id);
    $description = trim((string) get_post_field('post_excerpt', $event_id, 'raw'));
    if (!$description) {
        $description = wp_trim_words(wp_strip_all_tags((string) get_post_field('post_content', $event_id, 'raw')), 55, '');
    }

    $location = kbc_events_suite_event_schema_location($event_id);
    $organizer = kbc_events_suite_event_schema_organizer($event_id);
    $image_url = kbc_events_suite_get_event_image_url($event_id, 'full');
    $end_date = kbc_events_suite_get_event_iso_datetime($event_id, 'end');

    $event_schema = array(
        '@context'            => 'https://schema.org',
        '@type'               => 'Event',
        '@id'                 => trailingslashit($event_url) . '#event',
        'name'                => $title,
        'url'                 => $event_url,
        'startDate'           => $start_date,
        'eventStatus'         => kbc_events_suite_event_schema_status($event_id),
        'eventAttendanceMode' => $location['mode'],
        'location'            => $location['location'],
        'organizer'           => $organizer,
    );

    if ($end_date) {
        $event_schema['endDate'] = $end_date;
    }
    if ($description) {
        $event_schema['description'] = $description;
    }
    if ($image_url) {
        $event_schema['image'] = array($image_url);
    }

    $booking_url = kbc_events_suite_get_url_meta($event_id, 'booking_url');
    if ($booking_url && kbc_events_suite_get_event_button_state($event_id) === 'open') {
        $event_schema['offers'] = array(
            '@type'        => 'Offer',
            'url'          => $booking_url,
            'availability' => 'https://schema.org/InStock',
            'validFrom'    => get_the_date(DateTimeInterface::ATOM, $event_id),
        );
    }

    $partners = function_exists('kbc_events_suite_get_event_partners')
        ? kbc_events_suite_get_event_partners($event_id)
        : array();
    $sponsors = array();
    foreach ($partners as $partner) {
        $partner_schema = kbc_events_suite_partner_schema($partner, $event_url);
        if ($partner_schema) {
            $sponsors[] = $partner_schema;
        }
    }
    if ($sponsors) {
        $event_schema['sponsor'] = $sponsors;
    }

    $event_schema = apply_filters('kbc_events_suite_event_schema', $event_schema, $event_id);
    if (!$event_schema || !is_array($event_schema)) {
        return;
    }

    echo "\n<script type=\"application/ld+json\" id=\"kbc-events-suite-schema\">\n";
    echo wp_json_encode($event_schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    echo "\n</script>\n";
}
add_action('wp_head', 'kbc_events_suite_event_partners_schema', 30);
