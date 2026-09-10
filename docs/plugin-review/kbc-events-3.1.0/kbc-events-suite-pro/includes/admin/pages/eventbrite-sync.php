<?php
if (!defined('ABSPATH')) {
    exit;
}

function kbc_events_suite_eventbrite_settings_result_message($result) {
    $message = sprintf(
        /* translators: 1: created count, 2: updated count, 3: skipped count, 4: failed count. */
        __('Sync finished. Created: %1$d. Updated: %2$d. Skipped: %3$d. Failed: %4$d.', 'kbc-events-suite-pro'),
        absint($result['created'] ?? 0),
        absint($result['updated'] ?? 0),
        absint($result['skipped'] ?? 0),
        absint($result['failed'] ?? 0)
    );

    $message .= ' ' . sprintf(
        /* translators: 1: reconciled count, 2: unpublished count, 3: missing count. */
        __('Reconciled: %1$d. Unpublished: %2$d. Missing: %3$d.', 'kbc-events-suite-pro'),
        absint($result['reconciled'] ?? 0),
        absint($result['unpublished'] ?? 0),
        absint($result['missing'] ?? 0)
    );

    if (!empty($result['partial'])) {
        $message .= ' ' . __('The page limit was reached; the continuation was saved and the next run will resume automatically.', 'kbc-events-suite-pro');
    } elseif (!empty($result['resumed'])) {
        $message .= ' ' . __('This run resumed a previously paused scan.', 'kbc-events-suite-pro');
    }

    return $message;
}

function kbc_events_suite_save_eventbrite_settings_from_request() {
    $token_defined = defined('KBC_EVENTS_SUITE_EVENTBRITE_TOKEN') && KBC_EVENTS_SUITE_EVENTBRITE_TOKEN;
    $organization_defined = defined('KBC_EVENTS_SUITE_EVENTBRITE_ORGANIZATION_ID') && KBC_EVENTS_SUITE_EVENTBRITE_ORGANIZATION_ID;

    if (!$token_defined) {
        if (!empty($_POST['kbc_events_suite_eventbrite_clear_token'])) {
            delete_option('kbc_events_suite_eventbrite_token');
        } elseif (isset($_POST['kbc_events_suite_eventbrite_token'])) {
            $token = trim(sanitize_text_field(wp_unslash($_POST['kbc_events_suite_eventbrite_token'])));
            /* A blank secret means "keep the stored value", not "erase it". */
            if ($token !== '') {
                update_option('kbc_events_suite_eventbrite_token', $token, false);
            }
        }
    }

    if (!$organization_defined) {
        if (!empty($_POST['kbc_events_suite_eventbrite_clear_organization_id'])) {
            delete_option('kbc_events_suite_eventbrite_organization_id');
        } elseif (isset($_POST['kbc_events_suite_eventbrite_organization_id'])) {
            $organization_id = trim(sanitize_text_field(wp_unslash($_POST['kbc_events_suite_eventbrite_organization_id'])));
            /* A blank value preserves the existing ID, mirroring secret handling. */
            if ($organization_id !== '') {
                update_option('kbc_events_suite_eventbrite_organization_id', $organization_id, false);
            }
        }
    }

    $interval = isset($_POST['kbc_events_suite_eventbrite_sync_interval'])
        ? sanitize_key(wp_unslash($_POST['kbc_events_suite_eventbrite_sync_interval']))
        : 'hourly';
    if (!in_array($interval, array('hourly', 'twicedaily', 'daily'), true)) {
        $interval = 'hourly';
    }

    $new_post_status = isset($_POST['kbc_events_suite_eventbrite_new_post_status'])
        ? sanitize_key(wp_unslash($_POST['kbc_events_suite_eventbrite_new_post_status']))
        : 'publish';
    if (!in_array($new_post_status, array('publish', 'draft', 'pending', 'private'), true)) {
        $new_post_status = 'publish';
    }

    update_option('kbc_events_suite_eventbrite_auto_sync', isset($_POST['kbc_events_suite_eventbrite_auto_sync']) ? 'yes' : 'no');
    update_option('kbc_events_suite_eventbrite_sync_interval', $interval);
    update_option(
        'kbc_events_suite_eventbrite_category_mapping',
        isset($_POST['kbc_events_suite_eventbrite_category_mapping'])
            ? sanitize_textarea_field(wp_unslash($_POST['kbc_events_suite_eventbrite_category_mapping']))
            : ''
    );
    update_option('kbc_events_suite_eventbrite_auto_create_terms', isset($_POST['kbc_events_suite_eventbrite_auto_create_terms']) ? 'yes' : 'no');
    update_option('kbc_events_suite_eventbrite_max_pages', max(1, min(50, absint($_POST['kbc_events_suite_eventbrite_max_pages'] ?? 20))));
    update_option('kbc_events_suite_eventbrite_reconcile', isset($_POST['kbc_events_suite_eventbrite_reconcile']) ? 'yes' : 'no');
    update_option('kbc_events_suite_eventbrite_reconcile_limit', max(1, min(100, absint($_POST['kbc_events_suite_eventbrite_reconcile_limit'] ?? 30))));
    update_option(
        'kbc_events_suite_eventbrite_cancelled_action',
        kbc_events_suite_sanitise_remote_event_action(
            isset($_POST['kbc_events_suite_eventbrite_cancelled_action']) ? wp_unslash($_POST['kbc_events_suite_eventbrite_cancelled_action']) : 'draft',
            'draft'
        )
    );
    update_option(
        'kbc_events_suite_eventbrite_missing_action',
        kbc_events_suite_sanitise_remote_event_action(
            isset($_POST['kbc_events_suite_eventbrite_missing_action']) ? wp_unslash($_POST['kbc_events_suite_eventbrite_missing_action']) : 'draft',
            'draft'
        )
    );
    update_option('kbc_events_suite_eventbrite_new_post_status', $new_post_status);

    kbc_events_suite_reschedule_sync();
}

function kbc_events_suite_render_eventbrite_settings_page() {
    if (!current_user_can('manage_options')) {
        return;
    }

    $message = '';
    $message_type = 'success';

    if (isset($_POST['kbc_events_suite_save_settings']) || isset($_POST['kbc_events_suite_run_sync'])) {
        check_admin_referer('kbc_events_suite_eventbrite_settings_action', 'kbc_events_suite_eventbrite_settings_nonce');
        kbc_events_suite_save_eventbrite_settings_from_request();
        $message = __('Settings saved.', 'kbc-events-suite-pro');
    }

    if (isset($_POST['kbc_events_suite_run_sync'])) {
        $result = kbc_events_suite_eventbrite_sync_events(true);
        if (is_wp_error($result)) {
            $message = $result->get_error_message();
            $message_type = 'error';
        } else {
            $message = kbc_events_suite_eventbrite_settings_result_message($result);
        }
    }

    $credentials = kbc_events_suite_get_eventbrite_credentials();
    $token_defined = defined('KBC_EVENTS_SUITE_EVENTBRITE_TOKEN') && KBC_EVENTS_SUITE_EVENTBRITE_TOKEN;
    $organization_defined = defined('KBC_EVENTS_SUITE_EVENTBRITE_ORGANIZATION_ID') && KBC_EVENTS_SUITE_EVENTBRITE_ORGANIZATION_ID;
    $stored_token_present = trim((string) get_option('kbc_events_suite_eventbrite_token', '')) !== '';
    $stored_organization_id = trim((string) get_option('kbc_events_suite_eventbrite_organization_id', ''));

    $auto_sync = get_option('kbc_events_suite_eventbrite_auto_sync', 'yes');
    $interval = get_option('kbc_events_suite_eventbrite_sync_interval', 'hourly');
    $category_mapping = get_option('kbc_events_suite_eventbrite_category_mapping', "Business & Professional|marketing\nMarketing|marketing\nPCP|pcp\nProject Control|pcp\nPMP|pmp\nProject Management|pmp");
    $auto_create_terms = get_option('kbc_events_suite_eventbrite_auto_create_terms', 'yes');
    $max_pages = max(1, min(50, absint(get_option('kbc_events_suite_eventbrite_max_pages', 20))));
    $reconcile = get_option('kbc_events_suite_eventbrite_reconcile', 'yes');
    $reconcile_limit = max(1, min(100, absint(get_option('kbc_events_suite_eventbrite_reconcile_limit', 30))));
    $cancelled_action = kbc_events_suite_sanitise_remote_event_action(get_option('kbc_events_suite_eventbrite_cancelled_action', 'draft'), 'draft');
    $missing_action = kbc_events_suite_sanitise_remote_event_action(get_option('kbc_events_suite_eventbrite_missing_action', 'draft'), 'draft');
    $new_post_status = sanitize_key(get_option('kbc_events_suite_eventbrite_new_post_status', 'publish'));
    $last_sync = get_option('kbc_events_suite_eventbrite_last_sync', '');
    $last_result = get_option('kbc_events_suite_eventbrite_last_result', array());
    $last_error = get_option('kbc_events_suite_eventbrite_last_error', '');
    $scan_state = get_option('kbc_events_suite_eventbrite_scan_state', array());
    ?>
    <div class="wrap">
        <h1><?php esc_html_e('Eventbrite Sync', 'kbc-events-suite-pro'); ?></h1>
        <?php if ($message) : ?>
            <div class="notice notice-<?php echo esc_attr($message_type); ?> is-dismissible"><p><?php echo esc_html($message); ?></p></div>
        <?php endif; ?>

        <p><?php esc_html_e('Imports live current/future Eventbrite events. Existing WordPress titles, content, excerpts, images, categories and statuses are protected when they have been manually changed.', 'kbc-events-suite-pro'); ?></p>

        <form method="post">
            <?php wp_nonce_field('kbc_events_suite_eventbrite_settings_action', 'kbc_events_suite_eventbrite_settings_nonce'); ?>
            <table class="form-table" role="presentation">
                <tr>
                    <th scope="row"><label for="kbc_events_suite_eventbrite_token"><?php esc_html_e('Eventbrite Private Token', 'kbc-events-suite-pro'); ?></label></th>
                    <td>
                        <?php if ($token_defined) : ?>
                            <input type="password" value="********" class="regular-text" disabled>
                            <p class="description"><?php esc_html_e('Configured by KBC_EVENTS_SUITE_EVENTBRITE_TOKEN in wp-config.php.', 'kbc-events-suite-pro'); ?></p>
                        <?php else : ?>
                            <input type="password" id="kbc_events_suite_eventbrite_token" name="kbc_events_suite_eventbrite_token" value="" class="regular-text" autocomplete="new-password" placeholder="<?php echo esc_attr($stored_token_present ? __('Token is saved — leave blank to keep it', 'kbc-events-suite-pro') : __('Paste a private token', 'kbc-events-suite-pro')); ?>">
                            <p class="description"><?php esc_html_e('The saved token is never displayed. Leave this field blank to keep it.', 'kbc-events-suite-pro'); ?></p>
                            <?php if ($stored_token_present) : ?>
                                <label><input type="checkbox" name="kbc_events_suite_eventbrite_clear_token" value="1"> <?php esc_html_e('Delete the saved token', 'kbc-events-suite-pro'); ?></label>
                            <?php endif; ?>
                        <?php endif; ?>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="kbc_events_suite_eventbrite_organization_id"><?php esc_html_e('Eventbrite Organization ID', 'kbc-events-suite-pro'); ?></label></th>
                    <td>
                        <?php if ($organization_defined) : ?>
                            <input type="text" value="<?php echo esc_attr($credentials['organization_id']); ?>" class="regular-text" disabled>
                            <p class="description"><?php esc_html_e('Configured by KBC_EVENTS_SUITE_EVENTBRITE_ORGANIZATION_ID in wp-config.php.', 'kbc-events-suite-pro'); ?></p>
                        <?php else : ?>
                            <input type="text" id="kbc_events_suite_eventbrite_organization_id" name="kbc_events_suite_eventbrite_organization_id" value="" class="regular-text" autocomplete="off" placeholder="<?php echo esc_attr($stored_organization_id ? sprintf(__('Saved ID: %s — leave blank to keep it', 'kbc-events-suite-pro'), $stored_organization_id) : __('Enter the organization ID', 'kbc-events-suite-pro')); ?>">
                            <p class="description"><?php esc_html_e('Leave blank to preserve the saved Organization ID.', 'kbc-events-suite-pro'); ?></p>
                            <?php if ($stored_organization_id) : ?>
                                <label><input type="checkbox" name="kbc_events_suite_eventbrite_clear_organization_id" value="1"> <?php esc_html_e('Delete the saved Organization ID', 'kbc-events-suite-pro'); ?></label>
                            <?php endif; ?>
                        <?php endif; ?>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('Automatic Sync', 'kbc-events-suite-pro'); ?></th>
                    <td><label><input type="checkbox" name="kbc_events_suite_eventbrite_auto_sync" value="yes" <?php checked($auto_sync, 'yes'); ?>> <?php esc_html_e('Enable automatic sync', 'kbc-events-suite-pro'); ?></label></td>
                </tr>
                <tr>
                    <th scope="row"><label for="kbc_events_suite_eventbrite_sync_interval"><?php esc_html_e('Sync Interval', 'kbc-events-suite-pro'); ?></label></th>
                    <td><select id="kbc_events_suite_eventbrite_sync_interval" name="kbc_events_suite_eventbrite_sync_interval"><option value="hourly" <?php selected($interval, 'hourly'); ?>><?php esc_html_e('Hourly', 'kbc-events-suite-pro'); ?></option><option value="twicedaily" <?php selected($interval, 'twicedaily'); ?>><?php esc_html_e('Twice daily', 'kbc-events-suite-pro'); ?></option><option value="daily" <?php selected($interval, 'daily'); ?>><?php esc_html_e('Daily', 'kbc-events-suite-pro'); ?></option></select></td>
                </tr>
                <tr>
                    <th scope="row"><label for="kbc_events_suite_eventbrite_new_post_status"><?php esc_html_e('New Event Status', 'kbc-events-suite-pro'); ?></label></th>
                    <td><select id="kbc_events_suite_eventbrite_new_post_status" name="kbc_events_suite_eventbrite_new_post_status"><option value="publish" <?php selected($new_post_status, 'publish'); ?>><?php esc_html_e('Published', 'kbc-events-suite-pro'); ?></option><option value="draft" <?php selected($new_post_status, 'draft'); ?>><?php esc_html_e('Draft', 'kbc-events-suite-pro'); ?></option><option value="pending" <?php selected($new_post_status, 'pending'); ?>><?php esc_html_e('Pending review', 'kbc-events-suite-pro'); ?></option><option value="private" <?php selected($new_post_status, 'private'); ?>><?php esc_html_e('Private', 'kbc-events-suite-pro'); ?></option></select><p class="description"><?php esc_html_e('This applies only when creating a new local event. Sync never republishes an existing draft, private, pending or trashed event.', 'kbc-events-suite-pro'); ?></p></td>
                </tr>
                <tr>
                    <th scope="row"><label for="kbc_events_suite_eventbrite_max_pages"><?php esc_html_e('Pages per Run', 'kbc-events-suite-pro'); ?></label></th>
                    <td><input type="number" min="1" max="50" id="kbc_events_suite_eventbrite_max_pages" name="kbc_events_suite_eventbrite_max_pages" value="<?php echo esc_attr($max_pages); ?>"><p class="description"><?php esc_html_e('Large scans are paused safely and resumed on the next run.', 'kbc-events-suite-pro'); ?></p></td>
                </tr>
                <tr>
                    <th scope="row"><label for="kbc_events_suite_eventbrite_category_mapping"><?php esc_html_e('Eventbrite Category Mapping', 'kbc-events-suite-pro'); ?></label></th>
                    <td><textarea id="kbc_events_suite_eventbrite_category_mapping" name="kbc_events_suite_eventbrite_category_mapping" rows="8" class="large-text code"><?php echo esc_textarea($category_mapping); ?></textarea><p class="description"><?php esc_html_e('One mapping per line: Eventbrite category name or ID|local-event-category-slug. Editorial categories are retained.', 'kbc-events-suite-pro'); ?></p></td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('Auto-create Missing Terms', 'kbc-events-suite-pro'); ?></th>
                    <td><label><input type="checkbox" name="kbc_events_suite_eventbrite_auto_create_terms" value="yes" <?php checked($auto_create_terms, 'yes'); ?>> <?php esc_html_e('Create a mapped local term when it does not exist', 'kbc-events-suite-pro'); ?></label></td>
                </tr>
            </table>

            <h2><?php esc_html_e('Cancelled and Missing Events', 'kbc-events-suite-pro'); ?></h2>
            <table class="form-table" role="presentation">
                <tr>
                    <th scope="row"><?php esc_html_e('Reconciliation', 'kbc-events-suite-pro'); ?></th>
                    <td><label><input type="checkbox" name="kbc_events_suite_eventbrite_reconcile" value="yes" <?php checked($reconcile, 'yes'); ?>> <?php esc_html_e('Check linked local events that were absent from the live Eventbrite list', 'kbc-events-suite-pro'); ?></label></td>
                </tr>
                <tr>
                    <th scope="row"><label for="kbc_events_suite_eventbrite_reconcile_limit"><?php esc_html_e('Checks per Run', 'kbc-events-suite-pro'); ?></label></th>
                    <td><input type="number" min="1" max="100" id="kbc_events_suite_eventbrite_reconcile_limit" name="kbc_events_suite_eventbrite_reconcile_limit" value="<?php echo esc_attr($reconcile_limit); ?>"></td>
                </tr>
                <tr>
                    <th scope="row"><label for="kbc_events_suite_eventbrite_cancelled_action"><?php esc_html_e('Cancelled Event Action', 'kbc-events-suite-pro'); ?></label></th>
                    <td><?php kbc_events_suite_render_eventbrite_action_select('kbc_events_suite_eventbrite_cancelled_action', $cancelled_action); ?></td>
                </tr>
                <tr>
                    <th scope="row"><label for="kbc_events_suite_eventbrite_missing_action"><?php esc_html_e('Deleted/Missing Event Action', 'kbc-events-suite-pro'); ?></label></th>
                    <td><?php kbc_events_suite_render_eventbrite_action_select('kbc_events_suite_eventbrite_missing_action', $missing_action); ?><p class="description"><?php esc_html_e('Existing draft, private and trashed events are never republished by these actions.', 'kbc-events-suite-pro'); ?></p></td>
                </tr>
            </table>

            <p><button type="submit" name="kbc_events_suite_save_settings" class="button button-primary"><?php esc_html_e('Save Settings', 'kbc-events-suite-pro'); ?></button> <button type="submit" name="kbc_events_suite_run_sync" class="button button-secondary"><?php esc_html_e('Sync Now', 'kbc-events-suite-pro'); ?></button></p>
        </form>

        <hr>
        <h2><?php esc_html_e('Last Sync', 'kbc-events-suite-pro'); ?></h2>
        <p><strong><?php esc_html_e('Credentials:', 'kbc-events-suite-pro'); ?></strong> <?php echo ($credentials['token'] && $credentials['organization_id']) ? esc_html__('configured', 'kbc-events-suite-pro') : esc_html__('incomplete', 'kbc-events-suite-pro'); ?></p>
        <p><strong><?php esc_html_e('Last sync:', 'kbc-events-suite-pro'); ?></strong> <?php echo $last_sync ? esc_html($last_sync) : esc_html__('Never', 'kbc-events-suite-pro'); ?></p>
        <?php if (is_array($scan_state) && !empty($scan_state['started_at'])) : ?><p><strong><?php esc_html_e('Scan state:', 'kbc-events-suite-pro'); ?></strong> <?php esc_html_e('A continuation is saved and will resume on the next run.', 'kbc-events-suite-pro'); ?></p><?php endif; ?>
        <?php if ($last_error) : ?><div class="notice notice-error"><p><strong><?php esc_html_e('Last error:', 'kbc-events-suite-pro'); ?></strong> <?php echo esc_html($last_error); ?></p></div><?php endif; ?>
        <?php if (!empty($last_result) && is_array($last_result)) : ?>
            <p><?php echo esc_html(kbc_events_suite_eventbrite_settings_result_message($last_result)); ?></p>
        <?php endif; ?>
    </div>
    <?php
}

function kbc_events_suite_render_eventbrite_action_select($name, $value) {
    $actions = array(
        'keep'    => __('Keep published but mark registration closed', 'kbc-events-suite-pro'),
        'draft'   => __('Move to draft', 'kbc-events-suite-pro'),
        'private' => __('Make private', 'kbc-events-suite-pro'),
        'trash'   => __('Move to trash', 'kbc-events-suite-pro'),
    );
    ?>
    <select id="<?php echo esc_attr($name); ?>" name="<?php echo esc_attr($name); ?>">
        <?php foreach ($actions as $action => $label) : ?>
            <option value="<?php echo esc_attr($action); ?>" <?php selected($value, $action); ?>><?php echo esc_html($label); ?></option>
        <?php endforeach; ?>
    </select>
    <?php
}
