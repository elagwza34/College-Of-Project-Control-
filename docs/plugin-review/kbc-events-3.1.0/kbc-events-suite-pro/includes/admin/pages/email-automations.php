<?php
if (!defined('ABSPATH')) { exit; }

function kbc_events_suite_render_email_automations_page() {
    if (!current_user_can('manage_options')) { wp_die(esc_html__('You do not have permission.','kbc-events-suite-pro')); }
    $message='';
    $message_type='success';
    if(isset($_POST['kbc_save_email_automations']) || isset($_POST['kbc_test_dedicated_email'])){
        check_admin_referer('kbc_email_automations_action','kbc_email_automations_nonce');
        $welcome_was_enabled = get_option('kbc_events_suite_welcome_enabled', 'no') === 'yes';
        $welcome_enabled = isset($_POST['kbc_welcome_enabled']) ? 'yes' : 'no';
        update_option('kbc_events_suite_welcome_enabled', $welcome_enabled, false);
        if ($welcome_enabled === 'yes' && !$welcome_was_enabled) {
            update_option('kbc_events_suite_welcome_new_after', time(), false);
        }
        update_option('kbc_events_suite_reminders_enabled', isset($_POST['kbc_reminders_enabled']) ? 'yes' : 'no', false);
        update_option('kbc_events_suite_email_from_name', sanitize_text_field(wp_unslash($_POST['kbc_email_from_name'] ?? get_bloginfo('name'))), false);
        $from_email = sanitize_email(wp_unslash($_POST['kbc_email_from_address'] ?? get_option('admin_email')));
        $reply_to = sanitize_email(wp_unslash($_POST['kbc_email_reply_to'] ?? $from_email));
        update_option('kbc_events_suite_email_from_address', $from_email ?: get_option('admin_email'), false);
        update_option('kbc_events_suite_email_reply_to', $reply_to ?: $from_email, false);
        $transport = sanitize_key(wp_unslash($_POST['kbc_email_transport'] ?? 'wordpress'));
        if (!in_array($transport, array('wordpress','google_smtp'), true)) { $transport = 'wordpress'; }
        update_option('kbc_events_suite_email_transport', $transport, false);
        update_option('kbc_events_suite_smtp_username', sanitize_email(wp_unslash($_POST['kbc_smtp_username'] ?? '')), false);
        $smtp_password = trim((string) wp_unslash($_POST['kbc_smtp_password'] ?? ''));
        if ($smtp_password !== '') {
            $encrypted = kbc_events_suite_encrypt_email_secret(str_replace(' ', '', $smtp_password));
            if (is_wp_error($encrypted)) {
                $message = $encrypted->get_error_message();
                $message_type = 'error';
            } else {
                update_option('kbc_events_suite_smtp_password_encrypted', $encrypted, false);
            }
        }
        update_option('kbc_events_suite_welcome_template', array(
            'subject'=>sanitize_text_field(wp_unslash($_POST['kbc_welcome_subject'] ?? '')),
            'message'=>wp_kses_post(wp_unslash($_POST['kbc_welcome_message'] ?? '')),
        ), false);
        $saved=array();
        foreach(range(1,3) as $i){
            $unit=sanitize_key(wp_unslash($_POST['automation'][$i]['unit']??'days'));
            if(!in_array($unit,array('minutes','hours','days','weeks'),true)){$unit='days';}
            $saved[$i]=array(
                'enabled'=>isset($_POST['automation'][$i]['enabled'])?'yes':'no',
                'amount'=>max(1,min(365,absint($_POST['automation'][$i]['amount']??1))),
                'unit'=>$unit,
                'subject'=>sanitize_text_field(wp_unslash($_POST['automation'][$i]['subject']??'')),
                'message'=>wp_kses_post(wp_unslash($_POST['automation'][$i]['message']??'')),
            );
        }
        update_option('kbc_events_suite_email_automations',$saved,false);
        if (isset($_POST['kbc_test_dedicated_email']) && $message_type !== 'error') {
            $test_recipient = sanitize_email(wp_unslash($_POST['kbc_smtp_test_recipient'] ?? get_option('admin_email')));
            $test_result = kbc_events_suite_send_email(
                $test_recipient,
                __('KBC Events email test', 'kbc-events-suite-pro'),
                wpautop(__('The dedicated event email connection is working. This transport is used only by Events Suite Pro.', 'kbc-events-suite-pro'))
            );
            if (is_wp_error($test_result)) {
                $message = $test_result->get_error_message();
                $message_type = 'error';
            } else {
                $message = sprintf(__('Test email sent successfully to %s.', 'kbc-events-suite-pro'), $test_recipient);
            }
        } elseif ($message_type !== 'error') {
            $count=kbc_events_suite_reschedule_all_registration_emails();
            $message=sprintf(__('Settings saved and emails rescheduled for %d registrations.','kbc-events-suite-pro'),$count);
        }
    }
    $automations=kbc_events_suite_get_email_automations();
    $welcome=wp_parse_args((array)get_option('kbc_events_suite_welcome_template',array()),kbc_events_suite_welcome_defaults());
    $webhook=kbc_events_suite_webhook_url();
    ?>
    <div class="wrap"><h1><?php esc_html_e('Email Automations','kbc-events-suite-pro'); ?></h1>
    <?php if($message): ?><div class="notice notice-<?php echo esc_attr($message_type); ?> is-dismissible"><p><?php echo esc_html($message); ?></p></div><?php endif; ?>
    <p><?php esc_html_e('Configure the welcome email, sender identity and three independent reminders.','kbc-events-suite-pro'); ?></p>
    <form method="post"><?php wp_nonce_field('kbc_email_automations_action','kbc_email_automations_nonce'); ?>
    <div class="postbox" style="padding:18px;max-width:950px"><h2 style="margin-top:0"><?php esc_html_e('Sender Settings','kbc-events-suite-pro'); ?></h2>
      <p><label><strong><?php esc_html_e('From name','kbc-events-suite-pro'); ?></strong><br><input class="regular-text" name="kbc_email_from_name" value="<?php echo esc_attr(get_option('kbc_events_suite_email_from_name',get_bloginfo('name'))); ?>"></label></p>
      <p><label><strong><?php esc_html_e('From email','kbc-events-suite-pro'); ?></strong><br><input type="email" class="regular-text" name="kbc_email_from_address" value="<?php echo esc_attr(get_option('kbc_events_suite_email_from_address',get_option('admin_email'))); ?>"></label></p>
      <p><label><strong><?php esc_html_e('Reply-to email','kbc-events-suite-pro'); ?></strong><br><input type="email" class="regular-text" name="kbc_email_reply_to" value="<?php echo esc_attr(get_option('kbc_events_suite_email_reply_to',get_option('admin_email'))); ?>"></label></p>
      <p class="description"><?php esc_html_e('These values identify the sender. Choose the dedicated connection below to keep event delivery isolated from all other WordPress email.','kbc-events-suite-pro'); ?></p>
    </div>
    <div class="postbox" style="padding:18px;max-width:950px"><h2 style="margin-top:0"><?php esc_html_e('Dedicated Event Email Connection','kbc-events-suite-pro'); ?></h2>
      <p class="description"><?php esc_html_e('This optional connection is used only by Events Suite Pro. It does not change wp_mail, WordPress password emails, contact forms, WooCommerce, or any other plugin.','kbc-events-suite-pro'); ?></p>
      <p><label><strong><?php esc_html_e('Email transport','kbc-events-suite-pro'); ?></strong><br><select name="kbc_email_transport"><option value="wordpress" <?php selected(get_option('kbc_events_suite_email_transport','wordpress'),'wordpress'); ?>><?php esc_html_e('WordPress mail (existing behaviour)','kbc-events-suite-pro'); ?></option><option value="google_smtp" <?php selected(get_option('kbc_events_suite_email_transport','wordpress'),'google_smtp'); ?>><?php esc_html_e('Dedicated Google Workspace SMTP','kbc-events-suite-pro'); ?></option></select></label></p>
      <p><label><strong><?php esc_html_e('Google Workspace email','kbc-events-suite-pro'); ?></strong><br><input type="email" class="regular-text" name="kbc_smtp_username" value="<?php echo esc_attr(get_option('kbc_events_suite_smtp_username','events@kentbusinesscollege.org')); ?>" autocomplete="off"></label></p>
      <p><label><strong><?php esc_html_e('Google App Password','kbc-events-suite-pro'); ?></strong><br><input type="password" class="regular-text" name="kbc_smtp_password" value="" autocomplete="new-password" placeholder="<?php echo esc_attr(get_option('kbc_events_suite_smtp_password_encrypted','') ? __('Saved — leave blank to keep it','kbc-events-suite-pro') : __('16-character App Password','kbc-events-suite-pro')); ?>"></label></p>
      <p class="description"><?php esc_html_e('The App Password is encrypted before storage. Do not enter the normal Google account password.','kbc-events-suite-pro'); ?></p>
      <p><label><strong><?php esc_html_e('Send test to','kbc-events-suite-pro'); ?></strong><br><input type="email" class="regular-text" name="kbc_smtp_test_recipient" value="<?php echo esc_attr(get_option('admin_email')); ?>"></label></p>
      <p><button class="button" name="kbc_test_dedicated_email" value="1"><?php esc_html_e('Save Settings and Send Test','kbc-events-suite-pro'); ?></button></p>
    </div>
    <div class="postbox" style="padding:18px;max-width:950px"><h2 style="margin-top:0"><?php esc_html_e('Welcome Email — New Registrations Only','kbc-events-suite-pro'); ?></h2>
      <p><label><input type="checkbox" name="kbc_welcome_enabled" value="yes" <?php checked(get_option('kbc_events_suite_welcome_enabled','no'),'yes'); ?>> <strong><?php esc_html_e('Enable welcome email','kbc-events-suite-pro'); ?></strong></label></p>
      <p class="description"><?php esc_html_e('When enabled, only attendees who register after activation receive this email. Existing attendees imported during backfill are excluded.','kbc-events-suite-pro'); ?></p>
      <p><label><strong><?php esc_html_e('Welcome subject','kbc-events-suite-pro'); ?></strong><br><input class="large-text" name="kbc_welcome_subject" value="<?php echo esc_attr($welcome['subject']); ?>"></label></p>
      <p><label><strong><?php esc_html_e('Welcome message','kbc-events-suite-pro'); ?></strong><br><textarea class="large-text" rows="8" name="kbc_welcome_message"><?php echo esc_textarea($welcome['message']); ?></textarea></label></p>
    </div>
    <div class="postbox" style="padding:18px;max-width:950px"><h2 style="margin-top:0"><?php esc_html_e('Reminder Master Switch','kbc-events-suite-pro'); ?></h2>
      <label><input type="checkbox" name="kbc_reminders_enabled" value="yes" <?php checked(get_option('kbc_events_suite_reminders_enabled','no'),'yes'); ?>> <strong><?php esc_html_e('Enable all reminder automations','kbc-events-suite-pro'); ?></strong></label>
      <p class="description"><?php esc_html_e('Turning this off cancels pending reminders but does not affect the welcome email or manual messages.','kbc-events-suite-pro'); ?></p>
    </div>
    <?php foreach($automations as $i=>$automation): ?><div class="postbox" style="padding:18px;max-width:950px"><h2 style="margin-top:0"><?php echo esc_html(sprintf(__('Reminder %d','kbc-events-suite-pro'),$i)); ?></h2>
      <p><label><input type="checkbox" name="automation[<?php echo absint($i); ?>][enabled]" value="yes" <?php checked($automation['enabled'],'yes'); ?>> <?php esc_html_e('Enable this reminder','kbc-events-suite-pro'); ?></label></p>
      <p><label><strong><?php esc_html_e('Send before event:','kbc-events-suite-pro'); ?></strong> <input type="number" min="1" max="365" name="automation[<?php echo absint($i); ?>][amount]" value="<?php echo absint($automation['amount']); ?>" style="width:90px"> <select name="automation[<?php echo absint($i); ?>][unit]"><?php foreach(array('minutes'=>'Minutes','hours'=>'Hours','days'=>'Days','weeks'=>'Weeks') as $value=>$label): ?><option value="<?php echo esc_attr($value); ?>" <?php selected($automation['unit'],$value); ?>><?php echo esc_html__($label,'kbc-events-suite-pro'); ?></option><?php endforeach; ?></select></label></p>
      <p><label><strong><?php esc_html_e('Email subject','kbc-events-suite-pro'); ?></strong><br><input class="large-text" name="automation[<?php echo absint($i); ?>][subject]" value="<?php echo esc_attr($automation['subject']); ?>"></label></p>
      <p><label><strong><?php esc_html_e('Email message','kbc-events-suite-pro'); ?></strong><br><textarea class="large-text" rows="8" name="automation[<?php echo absint($i); ?>][message]"><?php echo esc_textarea($automation['message']); ?></textarea></label></p>
    </div><?php endforeach; ?>
    <p><strong><?php esc_html_e('Available variables:','kbc-events-suite-pro'); ?></strong> <code>{{first_name}}</code> <code>{{last_name}}</code> <code>{{email}}</code> <code>{{event_title}}</code> <code>{{event_date}}</code> <code>{{event_time}}</code> <code>{{event_location}}</code> <code>{{event_url}}</code> <code>{{zoom_url}}</code> <code>{{ticket_name}}</code> <code>{{booking_reference}}</code></p>
    <p><button class="button button-primary" name="kbc_save_email_automations"><?php esc_html_e('Save and Reschedule Emails','kbc-events-suite-pro'); ?></button></p></form>
    <hr><h2><?php esc_html_e('Eventbrite Webhook','kbc-events-suite-pro'); ?></h2><p><?php esc_html_e('Add this URL as the Eventbrite webhook delivery URL for attendee and order updates:','kbc-events-suite-pro'); ?></p><input class="large-text code" readonly value="<?php echo esc_attr($webhook); ?>" onclick="this.select()">
    <p class="description"><?php esc_html_e('Keep this URL private because it contains the webhook secret.','kbc-events-suite-pro'); ?></p></div><?php
}
