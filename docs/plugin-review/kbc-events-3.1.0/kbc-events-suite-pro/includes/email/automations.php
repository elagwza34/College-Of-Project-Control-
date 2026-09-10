<?php
if (!defined('ABSPATH')) { exit; }

function kbc_events_suite_email_defaults() {
    return array(
        1 => array('enabled'=>'yes','amount'=>7,'unit'=>'days','subject'=>'Reminder: {{event_title}} is in one week','message'=>"Hi {{first_name}},\n\nThis is a reminder that {{event_title}} takes place on {{event_date}} at {{event_time}}.\n\nLocation: {{event_location}}\nEvent details: {{event_url}}"),
        2 => array('enabled'=>'yes','amount'=>1,'unit'=>'days','subject'=>'Reminder: {{event_title}} is tomorrow','message'=>"Hi {{first_name}},\n\n{{event_title}} starts tomorrow at {{event_time}}.\n\nLocation: {{event_location}}\nEvent details: {{event_url}}"),
        3 => array('enabled'=>'yes','amount'=>2,'unit'=>'hours','subject'=>'Starting soon: {{event_title}}','message'=>"Hi {{first_name}},\n\n{{event_title}} starts in 2 hours.\n\nLocation: {{event_location}}\nEvent details: {{event_url}}"),
    );
}

function kbc_events_suite_welcome_defaults() {
    return array(
        'subject' => 'Registration confirmed: {{event_title}}',
        'message' => "Hi {{first_name}},\n\nThank you for registering for {{event_title}}.\n\nDate: {{event_date}}\nTime: {{event_time}}\nLocation: {{event_location}}\n\nEvent details: {{event_url}}",
    );
}

function kbc_events_suite_get_email_automations() {
    $saved = get_option('kbc_events_suite_email_automations', array());
    $defaults = kbc_events_suite_email_defaults();
    foreach ($defaults as $key => $default) { $defaults[$key] = wp_parse_args((array) ($saved[$key] ?? array()), $default); }
    return $defaults;
}

function kbc_events_suite_automation_seconds($automation) {
    $multipliers = array('minutes'=>MINUTE_IN_SECONDS,'hours'=>HOUR_IN_SECONDS,'days'=>DAY_IN_SECONDS,'weeks'=>WEEK_IN_SECONDS);
    $unit = sanitize_key((string) ($automation['unit'] ?? 'days'));
    return max(1, absint($automation['amount'] ?? 1)) * ($multipliers[$unit] ?? DAY_IN_SECONDS);
}

function kbc_events_suite_registration_row($registration_id) {
    global $wpdb;
    return $wpdb->get_row($wpdb->prepare('SELECT * FROM ' . kbc_events_suite_registrations_table() . ' WHERE id=%d', absint($registration_id)), ARRAY_A);
}

function kbc_events_suite_email_template_vars($registration) {
    $event_id = absint($registration['wordpress_event_id'] ?? 0);
    return array(
        '{{first_name}}' => (string) ($registration['first_name'] ?? ''), '{{last_name}}' => (string) ($registration['last_name'] ?? ''),
        '{{email}}' => (string) ($registration['email'] ?? ''), '{{ticket_name}}' => (string) ($registration['ticket_name'] ?? ''),
        '{{event_title}}' => $event_id ? kbc_events_suite_get_event_title($event_id) : '',
        '{{event_date}}' => $event_id ? kbc_events_suite_format_acf_date(kbc_events_suite_get_meta($event_id, 'event_start_date')) : '',
        '{{event_time}}' => $event_id ? kbc_events_suite_format_acf_time(kbc_events_suite_get_meta($event_id, 'start_time')) : '',
        '{{event_location}}' => $event_id ? kbc_events_suite_get_text_meta($event_id, 'location') : '',
        '{{event_url}}' => $event_id ? get_permalink($event_id) : '',
        '{{zoom_url}}' => $event_id && function_exists('kbc_events_suite_zoom_event_url') ? kbc_events_suite_zoom_event_url($event_id) : '',
        '{{booking_reference}}' => (string) ($registration['eventbrite_order_id'] ?? ''),
    );
}

function kbc_events_suite_render_email_template($template, $registration) {
    return strtr((string) $template, kbc_events_suite_email_template_vars($registration));
}

function kbc_events_suite_append_zoom_url($message, $registration) {
    if (get_option('kbc_events_suite_zoom_append_email', 'yes') !== 'yes') { return $message; }
    $event_id = absint($registration['wordpress_event_id'] ?? 0);
    $zoom_url = $event_id && function_exists('kbc_events_suite_zoom_event_url') ? kbc_events_suite_zoom_event_url($event_id) : '';
    if (!$zoom_url || strpos((string) $message, $zoom_url) !== false) { return $message; }
    return rtrim((string) $message) . "\n\nJoin this event on Zoom:\n" . esc_url_raw($zoom_url);
}

function kbc_events_suite_email_headers() {
    $from_name = sanitize_text_field((string) get_option('kbc_events_suite_email_from_name', get_bloginfo('name')));
    $from_email = sanitize_email((string) get_option('kbc_events_suite_email_from_address', get_option('admin_email')));
    $reply_to = sanitize_email((string) get_option('kbc_events_suite_email_reply_to', $from_email));
    $headers = array('Content-Type: text/html; charset=UTF-8');
    if ($from_email) { $headers[] = 'From: ' . ($from_name ?: get_bloginfo('name')) . ' <' . $from_email . '>'; }
    if ($reply_to) { $headers[] = 'Reply-To: ' . $reply_to; }
    return $headers;
}

function kbc_events_suite_encrypt_email_secret($plain_text) {
    $plain_text = trim((string) $plain_text);
    if ($plain_text === '') { return ''; }
    if (!function_exists('openssl_encrypt') || !defined('AUTH_KEY')) {
        return new WP_Error('email_encryption_unavailable', __('Secure credential encryption is unavailable on this server.', 'kbc-events-suite-pro'));
    }
    try { $iv = random_bytes(12); }
    catch (Exception $e) { return new WP_Error('email_random_unavailable', __('Secure random generation is unavailable.', 'kbc-events-suite-pro')); }
    $key = hash('sha256', AUTH_KEY . wp_salt('auth'), true);
    $tag = '';
    $cipher_text = openssl_encrypt($plain_text, 'aes-256-gcm', $key, OPENSSL_RAW_DATA, $iv, $tag);
    if ($cipher_text === false || $tag === '') {
        return new WP_Error('email_encryption_failed', __('The email credential could not be encrypted.', 'kbc-events-suite-pro'));
    }
    return base64_encode(wp_json_encode(array(
        'v' => 1,
        'iv' => base64_encode($iv),
        'tag' => base64_encode($tag),
        'data' => base64_encode($cipher_text),
    )));
}

function kbc_events_suite_decrypt_email_secret($stored) {
    $stored = trim((string) $stored);
    if ($stored === '' || !function_exists('openssl_decrypt') || !defined('AUTH_KEY')) { return ''; }
    $decoded = json_decode((string) base64_decode($stored, true), true);
    if (!is_array($decoded) || absint($decoded['v'] ?? 0) !== 1) { return ''; }
    $iv = base64_decode((string) ($decoded['iv'] ?? ''), true);
    $tag = base64_decode((string) ($decoded['tag'] ?? ''), true);
    $data = base64_decode((string) ($decoded['data'] ?? ''), true);
    if ($iv === false || $tag === false || $data === false) { return ''; }
    $key = hash('sha256', AUTH_KEY . wp_salt('auth'), true);
    $plain_text = openssl_decrypt($data, 'aes-256-gcm', $key, OPENSSL_RAW_DATA, $iv, $tag);
    return is_string($plain_text) ? $plain_text : '';
}

function kbc_events_suite_dedicated_email_configured() {
    if (get_option('kbc_events_suite_email_transport', 'wordpress') !== 'google_smtp') { return false; }
    $username = sanitize_email((string) get_option('kbc_events_suite_smtp_username', ''));
    $password = kbc_events_suite_decrypt_email_secret(get_option('kbc_events_suite_smtp_password_encrypted', ''));
    return $username && $password;
}

function kbc_events_suite_load_phpmailer() {
    if (class_exists('PHPMailer\\PHPMailer\\PHPMailer')) { return true; }
    $base = ABSPATH . WPINC . '/PHPMailer/';
    foreach (array('Exception.php', 'PHPMailer.php', 'SMTP.php') as $file) {
        if (!is_readable($base . $file)) {
            return new WP_Error('phpmailer_missing', __('WordPress PHPMailer files are missing.', 'kbc-events-suite-pro'));
        }
        require_once $base . $file;
    }
    return class_exists('PHPMailer\\PHPMailer\\PHPMailer') ? true : new WP_Error('phpmailer_unavailable', __('PHPMailer could not be loaded.', 'kbc-events-suite-pro'));
}

function kbc_events_suite_send_email($to, $subject, $html_body) {
    $to = sanitize_email((string) $to);
    if (!is_email($to)) { return new WP_Error('invalid_recipient', __('The recipient email is invalid.', 'kbc-events-suite-pro')); }
    if (get_option('kbc_events_suite_email_transport', 'wordpress') !== 'google_smtp') {
        return wp_mail($to, $subject, $html_body, kbc_events_suite_email_headers())
            ? true
            : new WP_Error('wp_mail_failed', __('WordPress could not send the email.', 'kbc-events-suite-pro'));
    }
    if (!kbc_events_suite_dedicated_email_configured()) {
        return new WP_Error('smtp_not_configured', __('Dedicated Google SMTP is not fully configured.', 'kbc-events-suite-pro'));
    }
    $loaded = kbc_events_suite_load_phpmailer();
    if (is_wp_error($loaded)) { return $loaded; }
    $username = sanitize_email((string) get_option('kbc_events_suite_smtp_username', ''));
    $password = kbc_events_suite_decrypt_email_secret(get_option('kbc_events_suite_smtp_password_encrypted', ''));
    $from_email = sanitize_email((string) get_option('kbc_events_suite_email_from_address', $username)) ?: $username;
    $from_name = sanitize_text_field((string) get_option('kbc_events_suite_email_from_name', get_bloginfo('name')));
    $reply_to = sanitize_email((string) get_option('kbc_events_suite_email_reply_to', $from_email));
    try {
        $mailer = new PHPMailer\PHPMailer\PHPMailer(true);
        $mailer->isSMTP();
        $mailer->Host = 'smtp.gmail.com';
        $mailer->SMTPAuth = true;
        $mailer->Username = $username;
        $mailer->Password = $password;
        $mailer->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        $mailer->Port = 587;
        $mailer->Timeout = 20;
        $mailer->CharSet = 'UTF-8';
        $mailer->setFrom($from_email, $from_name ?: get_bloginfo('name'));
        if ($reply_to) { $mailer->addReplyTo($reply_to); }
        $mailer->addAddress($to);
        $mailer->isHTML(true);
        $mailer->Subject = (string) $subject;
        $mailer->Body = (string) $html_body;
        $mailer->AltBody = wp_strip_all_tags((string) $html_body);
        $mailer->send();
        return true;
    } catch (Exception $e) {
        $message = isset($mailer) && $mailer->ErrorInfo ? $mailer->ErrorInfo : $e->getMessage();
        return new WP_Error('dedicated_smtp_failed', sanitize_text_field((string) $message));
    }
}

function kbc_events_suite_queue_welcome_email($registration) {
    global $wpdb;
    if (get_option('kbc_events_suite_welcome_enabled', 'no') !== 'yes') { return; }
    $cutoff = absint(get_option('kbc_events_suite_welcome_new_after', 0));
    $registered_ts = 0;
    if (!empty($registration['registered_at'])) {
        try { $registered_ts = (new DateTimeImmutable($registration['registered_at'], wp_timezone()))->getTimestamp(); }
        catch (Exception $e) { $registered_ts = 0; }
    }
    if (!$cutoff || !$registered_ts || $registered_ts < $cutoff || empty($registration['email']) || !empty($registration['cancelled']) || !empty($registration['refunded'])) { return; }
    $template = wp_parse_args((array) get_option('kbc_events_suite_welcome_template', array()), kbc_events_suite_welcome_defaults());
    $data = array(
        'registration_id'=>absint($registration['id']), 'wordpress_event_id'=>absint($registration['wordpress_event_id']),
        'automation_key'=>'welcome', 'recipient_email'=>sanitize_email($registration['email']),
        'subject'=>sanitize_text_field(kbc_events_suite_render_email_template($template['subject'], $registration)),
        'message'=>wp_kses_post(kbc_events_suite_append_zoom_url(kbc_events_suite_render_email_template($template['message'], $registration), $registration)),
        'scheduled_at'=>current_time('mysql'), 'status'=>'pending', 'attempts'=>0, 'last_error'=>'', 'created_at'=>current_time('mysql'),
    );
    $table = kbc_events_suite_email_queue_table();
    $existing = $wpdb->get_row($wpdb->prepare("SELECT id,status FROM {$table} WHERE registration_id=%d AND automation_key='welcome'", $data['registration_id']), ARRAY_A);
    if ($existing && $existing['status'] === 'sent') { return; }
    if ($existing) { $wpdb->update($table, $data, array('id'=>absint($existing['id']))); }
    else { $wpdb->insert($table, $data); }
}

function kbc_events_suite_schedule_registration_emails($registration_id) {
    global $wpdb;
    $registration = kbc_events_suite_registration_row($registration_id);
    if (!$registration) { return; }
    $queue = kbc_events_suite_email_queue_table();
    if (get_option('kbc_events_suite_welcome_enabled', 'no') !== 'yes') {
        $wpdb->update($queue, array('status'=>'cancelled'), array('registration_id'=>absint($registration_id),'automation_key'=>'welcome','status'=>'pending'));
    }
    if (empty($registration['email']) || empty($registration['wordpress_event_id']) || !empty($registration['cancelled']) || !empty($registration['refunded'])) {
        $wpdb->update($queue, array('status'=>'cancelled'), array('registration_id'=>absint($registration_id),'status'=>'pending'));
        return;
    }
    kbc_events_suite_queue_welcome_email($registration);
    if (get_option('kbc_events_suite_reminders_enabled', 'no') !== 'yes') {
        $wpdb->query($wpdb->prepare("UPDATE {$queue} SET status='cancelled' WHERE registration_id=%d AND automation_key LIKE 'reminder_%%' AND status='pending'", absint($registration_id)));
        return;
    }
    $event_id = absint($registration['wordpress_event_id']);
    $event_ts = kbc_events_suite_get_event_start_timestamp($event_id);
    if (!$event_ts) { return; }
    foreach (kbc_events_suite_get_email_automations() as $index => $automation) {
        $key = 'reminder_' . absint($index);
        if (($automation['enabled'] ?? 'no') !== 'yes') {
            $wpdb->update($queue, array('status'=>'cancelled'), array('registration_id'=>absint($registration_id),'automation_key'=>$key,'status'=>'pending'));
            continue;
        }
        $scheduled_ts = $event_ts - kbc_events_suite_automation_seconds($automation);
        if ($scheduled_ts <= time()) { continue; }
        $data = array(
            'registration_id'=>absint($registration_id), 'wordpress_event_id'=>$event_id, 'automation_key'=>$key,
            'recipient_email'=>sanitize_email($registration['email']),
            'subject'=>sanitize_text_field(kbc_events_suite_render_email_template($automation['subject'], $registration)),
            'message'=>wp_kses_post(kbc_events_suite_append_zoom_url(kbc_events_suite_render_email_template($automation['message'], $registration), $registration)),
            'scheduled_at'=>wp_date('Y-m-d H:i:s', $scheduled_ts, wp_timezone()), 'status'=>'pending', 'attempts'=>0,
            'last_error'=>'', 'created_at'=>current_time('mysql'),
        );
        $existing = $wpdb->get_row($wpdb->prepare("SELECT id,status FROM {$queue} WHERE registration_id=%d AND automation_key=%s", $registration_id, $key), ARRAY_A);
        /* A sent occurrence is immutable: syncs and edits must never send it twice. */
        if ($existing && $existing['status'] === 'sent') { continue; }
        if ($existing) { $wpdb->update($queue, $data, array('id'=>absint($existing['id']))); }
        else { $wpdb->insert($queue, $data); }
    }
}

function kbc_events_suite_reschedule_all_registration_emails() {
    global $wpdb;
    $ids = $wpdb->get_col('SELECT id FROM ' . kbc_events_suite_registrations_table() . ' WHERE cancelled=0 AND refunded=0');
    foreach ($ids as $id) { kbc_events_suite_schedule_registration_emails($id); }
    return count($ids);
}

function kbc_events_suite_email_cron_schedules($schedules) {
    $schedules['kbc_every_five_minutes'] = array('interval'=>5 * MINUTE_IN_SECONDS,'display'=>__('Every five minutes','kbc-events-suite-pro'));
    return $schedules;
}
add_filter('cron_schedules', 'kbc_events_suite_email_cron_schedules');

function kbc_events_suite_fix_email_schedule() {
    $timestamp = wp_next_scheduled('kbc_events_suite_email_queue_cron');
    if ($timestamp) { wp_unschedule_event($timestamp, 'kbc_events_suite_email_queue_cron'); }
    wp_schedule_event(time() + 60, 'kbc_every_five_minutes', 'kbc_events_suite_email_queue_cron');
}

function kbc_events_suite_process_email_queue() {
    global $wpdb;
    $queue = kbc_events_suite_email_queue_table();
    $now = current_time('mysql');
    $rows = $wpdb->get_results($wpdb->prepare("SELECT * FROM {$queue} WHERE status='pending' AND scheduled_at<=%s ORDER BY scheduled_at ASC LIMIT 25", $now), ARRAY_A);
    foreach ($rows as $row) {
        $registration = kbc_events_suite_registration_row($row['registration_id']);
        if (!$registration || !empty($registration['cancelled']) || !empty($registration['refunded']) || !is_email($row['recipient_email'])) {
            $wpdb->update($queue, array('status'=>'cancelled','last_error'=>'Registration inactive or email invalid'), array('id'=>$row['id']));
            continue;
        }
        $claimed = $wpdb->query($wpdb->prepare("UPDATE {$queue} SET status='sending', attempts=attempts+1 WHERE id=%d AND status='pending'", $row['id']));
        if (!$claimed) { continue; }
        $live_message = kbc_events_suite_render_email_template($row['message'], $registration);
        $live_message = kbc_events_suite_append_zoom_url($live_message, $registration);
        $body = wpautop($live_message);
        $send_result = kbc_events_suite_send_email($row['recipient_email'], $row['subject'], $body);
        $sent = !is_wp_error($send_result);
        $last_error = $sent ? '' : $send_result->get_error_message();
        $wpdb->update($queue, $sent ? array('status'=>'sent','sent_at'=>current_time('mysql'),'last_error'=>'') : array('status'=>((int)$row['attempts'] >= 2 ? 'failed' : 'pending'),'last_error'=>$last_error), array('id'=>$row['id']));
    }
}
add_action('kbc_events_suite_email_queue_cron', 'kbc_events_suite_process_email_queue');

function kbc_events_suite_send_manual_registration_email($registration_id, $subject, $message) {
    global $wpdb;
    $registration = kbc_events_suite_registration_row($registration_id);
    if (!$registration || !is_email($registration['email'])) { return new WP_Error('invalid_recipient', __('The registration email is invalid.','kbc-events-suite-pro')); }
    $subject = sanitize_text_field(kbc_events_suite_render_email_template($subject, $registration));
    $message = wp_kses_post(kbc_events_suite_render_email_template($message, $registration));
    if (!$subject || !$message) { return new WP_Error('empty_email', __('Subject and message are required.','kbc-events-suite-pro')); }
    $send_result = kbc_events_suite_send_email($registration['email'], $subject, wpautop($message));
    $sent = !is_wp_error($send_result);
    $wpdb->insert(kbc_events_suite_email_queue_table(), array(
        'registration_id'=>absint($registration_id), 'wordpress_event_id'=>absint($registration['wordpress_event_id']),
        'automation_key'=>'manual_' . time() . '_' . wp_rand(100,999), 'recipient_email'=>$registration['email'], 'subject'=>$subject, 'message'=>$message,
        'scheduled_at'=>current_time('mysql'), 'sent_at'=>$sent ? current_time('mysql') : null,
        'status'=>$sent ? 'sent' : 'failed', 'attempts'=>1, 'last_error'=>$sent ? '' : $send_result->get_error_message(), 'created_at'=>current_time('mysql'),
    ));
    return $sent ? true : $send_result;
}

function kbc_events_suite_reschedule_on_event_save($post_id, $post) {
    if (!$post || $post->post_type !== kbc_events_suite_event_post_type() || wp_is_post_revision($post_id)) { return; }
    global $wpdb;
    $ids = $wpdb->get_col($wpdb->prepare('SELECT id FROM ' . kbc_events_suite_registrations_table() . ' WHERE wordpress_event_id=%d', $post_id));
    foreach ($ids as $id) { kbc_events_suite_schedule_registration_emails($id); }
}
add_action('save_post', 'kbc_events_suite_reschedule_on_event_save', 1100, 2);
