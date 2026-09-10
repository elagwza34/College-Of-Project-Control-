<?php
/**
 * Plugin Name: Events Suite Pro
 * Description: Universal events management suite with configurable post type, taxonomy, field mapping, Eventbrite sync, date/category event grids, agenda, speakers, partners, Elementor Loop compatibility and SEO schema.
 * Version: 3.1.0
 * Requires at least: 5.8
 * Requires PHP: 7.4
 * Author: Eng-Mahmoud-abdelaal
 * Text Domain: kbc-events-suite-pro
 * Domain Path: /languages
 * Update URI: kbc-events-suite-pro
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!defined('KBC_EVENTS_SUITE_EVENT_POST_TYPE')) {
    define('KBC_EVENTS_SUITE_EVENT_POST_TYPE', 'event');
}

if (!defined('KBC_EVENTS_SUITE_TAXONOMY')) {
    define('KBC_EVENTS_SUITE_TAXONOMY', 'event_category');
}

if (!defined('KBC_EVENTS_SUITE_API_BASE')) {
    define('KBC_EVENTS_SUITE_API_BASE', 'https://www.eventbriteapi.com/v3');
}

if (!defined('KBC_EVENTS_SUITE_VERSION')) {
    define('KBC_EVENTS_SUITE_VERSION', '3.1.0');
}

define('KBC_EVENTS_SUITE_FILE', __FILE__);
define('KBC_EVENTS_SUITE_DIR', plugin_dir_path(__FILE__));
define('KBC_EVENTS_SUITE_URL', plugin_dir_url(__FILE__));

$GLOBALS['kbc_events_suite_missing_files'] = array();

function kbc_events_suite_require($relative_path) {
    $relative_path = ltrim((string) $relative_path, '/');
    $file = KBC_EVENTS_SUITE_DIR . $relative_path;

    if (!is_readable($file)) {
        $GLOBALS['kbc_events_suite_missing_files'][] = $relative_path;
        return false;
    }

    require_once $file;
    return true;
}

function kbc_events_suite_load_textdomain() {
    load_plugin_textdomain(
        'kbc-events-suite-pro',
        false,
        dirname(plugin_basename(KBC_EVENTS_SUITE_FILE)) . '/languages'
    );
}
add_action('plugins_loaded', 'kbc_events_suite_load_textdomain');

$kbc_events_suite_files = array(
    'includes/core/settings.php',
    'includes/core/logs.php',
    'includes/core/meta.php',
    'includes/core/dates.php',
    'includes/core/images.php',
    'includes/core/queries.php',
    'includes/core/post-types.php',
    'includes/core/upgrade.php',
    'includes/eventbrite/category-mapping.php',
    'includes/eventbrite/sync.php',
    'includes/zoom/integration.php',
    'includes/registrations/database.php',
    'includes/registrations/sync.php',
    'includes/registrations/webhook.php',
    'includes/email/automations.php',
    'includes/core/activation.php',
    'includes/admin/menu.php',
    'includes/admin/meta-boxes.php',
    'includes/admin/assets.php',
    'includes/admin/reorder.php',
    'includes/admin/pages/eventbrite-sync.php',
    'includes/admin/pages/settings.php',
    'includes/admin/pages/logs.php',
    'includes/admin/pages/tools.php',
    'includes/admin/pages/help.php',
    'includes/admin/pages/registrations.php',
    'includes/admin/pages/email-automations.php',
    'includes/admin/pages/zoom-settings.php',
    'includes/admin/columns.php',
    'includes/admin/single-sync.php',
    'includes/frontend/assets.php',
    'includes/frontend/elementor-controller.php',
    'includes/shortcodes/events-grid.php',
    'includes/shortcodes/agenda.php',
    'includes/shortcodes/speakers.php',
    'includes/shortcodes/partners.php',
    'includes/shortcodes/loop-date-filters.php',
    'includes/schema/partners.php',
);

foreach ($kbc_events_suite_files as $kbc_events_suite_file) {
    kbc_events_suite_require($kbc_events_suite_file);
}

function kbc_events_suite_missing_file_notice() {
    $missing = array_values(array_unique((array) $GLOBALS['kbc_events_suite_missing_files']));

    if (!$missing || !current_user_can('activate_plugins')) {
        return;
    }

    echo '<div class="notice notice-error"><p><strong>';
    echo esc_html__('Events Suite Pro is incomplete.', 'kbc-events-suite-pro');
    echo '</strong> ';
    echo esc_html__('Reinstall the plugin. Missing files:', 'kbc-events-suite-pro') . ' ';
    echo '<code>' . esc_html(implode(', ', $missing)) . '</code></p></div>';
}
add_action('admin_notices', 'kbc_events_suite_missing_file_notice');
