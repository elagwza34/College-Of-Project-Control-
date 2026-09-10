<?php
if (!defined('ABSPATH')) {
    exit;
}

function kbc_events_suite_render_logs_page() {
    if (!current_user_can('manage_options')) {
        return;
    }

    if (isset($_POST['kbc_events_suite_clear_logs'])) {
        check_admin_referer('kbc_events_suite_logs_action', 'kbc_events_suite_logs_nonce');
        kbc_events_suite_clear_logs();
        echo '<div class="notice notice-success is-dismissible"><p>Logs cleared.</p></div>';
    }

    $logs = kbc_events_suite_get_logs();
    ?>
    <div class="wrap">
        <h1>Events Suite Logs</h1>
        <form method="post">
            <?php wp_nonce_field('kbc_events_suite_logs_action', 'kbc_events_suite_logs_nonce'); ?>
            <p><button name="kbc_events_suite_clear_logs" class="button">Clear Logs</button></p>
        </form>
        <table class="widefat striped">
            <thead><tr><th>Time</th><th>Level</th><th>Message</th><th>Context</th></tr></thead>
            <tbody>
            <?php if (!$logs) : ?>
                <tr><td colspan="4">No logs yet.</td></tr>
            <?php else : foreach ($logs as $log) : ?>
                <tr><td><?php echo esc_html($log['time'] ?? ''); ?></td><td><?php echo esc_html($log['level'] ?? ''); ?></td><td><?php echo esc_html($log['message'] ?? ''); ?></td><td><code><?php echo esc_html($log['context'] ?? ''); ?></code></td></tr>
            <?php endforeach; endif; ?>
            </tbody>
        </table>
    </div>
    <?php
}
