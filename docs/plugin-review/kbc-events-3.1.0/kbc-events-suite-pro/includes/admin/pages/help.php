<?php
if (!defined('ABSPATH')) {
    exit;
}

function kbc_events_suite_render_help_page() {
    ?>
    <div class="wrap">
        <h1>Events Suite</h1>
        <p>This plugin combines Eventbrite sync, event categories, category-filtered grids, event agenda sessions, event partners, and registration/highlights behaviour.</p>
        <h2>Useful Shortcodes</h2>
        <ul style="list-style:disc;margin-left:22px;">
            <li><code>[kbc_events_grid]</code></li>
            <li><code>[kbc_events_grid category="marketing"]</code></li>
            <li><code>[kbc_events_grid categories="marketing,project-controls" limit="6"]</code></li>
            <li><code>[kbc_events_grid category="marketing" orderby="manual"]</code></li>
            <li><code>[kbc_event_agenda]</code></li>
            <li><code>[kbc_event_speakers]</code></li>
            <li><code>[kbc_event_partners]</code></li>
        </ul>
        <h2>Folder Map</h2>
        <p>The plugin is now split by feature:</p>
        <ul style="list-style:disc;margin-left:22px;">
            <li><code>includes/eventbrite/</code> - Eventbrite sync and category mapping.</li>
            <li><code>includes/admin/pages/</code> - admin settings pages.</li>
            <li><code>includes/shortcodes/</code> - grid, agenda, speakers and partners shortcodes.</li>
            <li><code>includes/frontend/</code> - frontend assets and Elementor button controller.</li>
            <li><code>assets/css/</code> and <code>assets/js/</code> - editable styling and scripts.</li>
        </ul>
    </div>
    <?php
}
