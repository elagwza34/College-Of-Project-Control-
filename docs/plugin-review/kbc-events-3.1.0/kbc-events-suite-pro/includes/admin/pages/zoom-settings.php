<?php
if (!defined('ABSPATH')) { exit; }

function kbc_events_suite_render_zoom_settings_page() {
    if (!current_user_can('manage_options')) { wp_die(esc_html__('You do not have permission.', 'kbc-events-suite-pro')); }
    $notice = '';
    $notice_type = 'success';
    if (isset($_POST['kbc_save_zoom_settings']) || isset($_POST['kbc_test_zoom_connection'])) {
        check_admin_referer('kbc_zoom_settings_action', 'kbc_zoom_settings_nonce');
        update_option('kbc_events_suite_zoom_enabled', isset($_POST['kbc_zoom_enabled']) ? 'yes' : 'no', false);
        update_option('kbc_events_suite_zoom_account_id', sanitize_text_field(wp_unslash($_POST['kbc_zoom_account_id'] ?? '')), false);
        update_option('kbc_events_suite_zoom_client_id', sanitize_text_field(wp_unslash($_POST['kbc_zoom_client_id'] ?? '')), false);
        $secret = trim((string) wp_unslash($_POST['kbc_zoom_client_secret'] ?? ''));
        if ($secret !== '') { update_option('kbc_events_suite_zoom_client_secret', sanitize_text_field($secret), false); }
        update_option('kbc_events_suite_zoom_user_id', sanitize_text_field(wp_unslash($_POST['kbc_zoom_user_id'] ?? 'me')) ?: 'me', false);
        update_option('kbc_events_suite_zoom_append_email', isset($_POST['kbc_zoom_append_email']) ? 'yes' : 'no', false);
        delete_transient('kbc_events_suite_zoom_access_token');
        delete_transient('kbc_events_suite_zoom_meetings');
        if (isset($_POST['kbc_save_zoom_settings'])) {
            $notice = __('Zoom settings saved.', 'kbc-events-suite-pro');
        }
    }
    if (isset($_POST['kbc_test_zoom_connection'])) {
        check_admin_referer('kbc_zoom_settings_action', 'kbc_zoom_settings_nonce');
        delete_transient('kbc_events_suite_zoom_access_token');
        delete_transient('kbc_events_suite_zoom_meetings');
        $meetings = kbc_events_suite_zoom_list_meetings(true);
        if (is_wp_error($meetings)) {
            $notice = $meetings->get_error_message();
            $notice_type = 'error';
        } else {
            $notice = sprintf(__('Zoom connection successful. %d upcoming meeting(s) found.', 'kbc-events-suite-pro'), count($meetings));
        }
    }
    $credentials = kbc_events_suite_zoom_credentials();
    ?>
    <div class="wrap">
      <h1><?php esc_html_e('Zoom Integration', 'kbc-events-suite-pro'); ?></h1>
      <?php if ($notice) : ?><div class="notice notice-<?php echo esc_attr($notice_type); ?> is-dismissible"><p><?php echo esc_html($notice); ?></p></div><?php endif; ?>
      <p><?php esc_html_e('Connect the Zoom account that owns your event meetings. Then open each WordPress event and select its matching Zoom meeting.', 'kbc-events-suite-pro'); ?></p>
      <form method="post">
        <?php wp_nonce_field('kbc_zoom_settings_action', 'kbc_zoom_settings_nonce'); ?>
        <div class="postbox" style="padding:18px;max-width:950px">
          <h2 style="margin-top:0"><?php esc_html_e('Server-to-Server OAuth', 'kbc-events-suite-pro'); ?></h2>
          <p><label><input type="checkbox" name="kbc_zoom_enabled" value="yes" <?php checked(get_option('kbc_events_suite_zoom_enabled', 'no'), 'yes'); ?>> <strong><?php esc_html_e('Enable Zoom integration', 'kbc-events-suite-pro'); ?></strong></label></p>
          <table class="form-table" role="presentation">
            <tr><th><label for="kbc_zoom_account_id"><?php esc_html_e('Account ID', 'kbc-events-suite-pro'); ?></label></th><td><input id="kbc_zoom_account_id" name="kbc_zoom_account_id" class="regular-text code" autocomplete="off" value="<?php echo esc_attr($credentials['account_id']); ?>"></td></tr>
            <tr><th><label for="kbc_zoom_client_id"><?php esc_html_e('Client ID', 'kbc-events-suite-pro'); ?></label></th><td><input id="kbc_zoom_client_id" name="kbc_zoom_client_id" class="regular-text code" autocomplete="off" value="<?php echo esc_attr($credentials['client_id']); ?>"></td></tr>
            <tr><th><label for="kbc_zoom_client_secret"><?php esc_html_e('Client Secret', 'kbc-events-suite-pro'); ?></label></th><td><input type="password" id="kbc_zoom_client_secret" name="kbc_zoom_client_secret" class="regular-text code" autocomplete="new-password" placeholder="<?php echo esc_attr(get_option('kbc_events_suite_zoom_client_secret', '') ? __('Saved — leave blank to keep it', 'kbc-events-suite-pro') : ''); ?>"></td></tr>
            <tr><th><label for="kbc_zoom_user_id"><?php esc_html_e('Zoom host email or user ID', 'kbc-events-suite-pro'); ?></label></th><td><input id="kbc_zoom_user_id" name="kbc_zoom_user_id" class="regular-text" value="<?php echo esc_attr($credentials['user_id']); ?>"><p class="description"><?php esc_html_e('Use the email of the Zoom user who owns the meetings. You can use “me” for the account owner.', 'kbc-events-suite-pro'); ?></p></td></tr>
          </table>
          <p><label><input type="checkbox" name="kbc_zoom_append_email" value="yes" <?php checked(get_option('kbc_events_suite_zoom_append_email', 'yes'), 'yes'); ?>> <strong><?php esc_html_e('Automatically append the event Zoom link to automated emails', 'kbc-events-suite-pro'); ?></strong></label></p>
          <p class="description"><?php esc_html_e('You can also place {{zoom_url}} exactly where you want it in any email template.', 'kbc-events-suite-pro'); ?></p>
          <p><button class="button button-primary" name="kbc_save_zoom_settings" value="1"><?php esc_html_e('Save Zoom Settings', 'kbc-events-suite-pro'); ?></button> <button class="button" name="kbc_test_zoom_connection" value="1"><?php esc_html_e('Test Connection', 'kbc-events-suite-pro'); ?></button></p>
        </div>
      </form>
      <div class="postbox" style="padding:18px;max-width:950px">
        <h2 style="margin-top:0"><?php esc_html_e('Required Zoom scopes', 'kbc-events-suite-pro'); ?></h2>
        <p><code>meeting:read:admin</code> <?php esc_html_e('or the equivalent granular scopes that allow viewing users’ meetings and meeting details.', 'kbc-events-suite-pro'); ?></p>
        <p><?php esc_html_e('After the test succeeds, edit every Eventbrite-synced event and choose its Zoom meeting in the Zoom Meeting box.', 'kbc-events-suite-pro'); ?></p>
      </div>
    </div>
    <?php
}
