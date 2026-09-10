<?php
if (!defined('ABSPATH')) { exit; }

function kbc_events_suite_export_registrations_csv() {
    if (!current_user_can('manage_options')) { wp_die(esc_html__('You do not have permission.','kbc-events-suite-pro')); }
    check_admin_referer('kbc_export_registrations');
    global $wpdb;
    $rows = $wpdb->get_results('SELECT * FROM ' . kbc_events_suite_registrations_table() . ' ORDER BY registered_at DESC', ARRAY_A);
    nocache_headers();
    header('Content-Type: text/csv; charset=UTF-8');
    header('Content-Disposition: attachment; filename="kbc-event-registrations-' . gmdate('Y-m-d') . '.csv"');
    $out = fopen('php://output', 'w');
    fwrite($out, "\xEF\xBB\xBF");
    fputcsv($out, array('First name','Last name','Email','Phone','Event','Ticket','Status','Marketing consent','Registered at','Eventbrite attendee ID','Eventbrite order ID'));
    foreach ($rows as $row) {
        fputcsv($out, array($row['first_name'],$row['last_name'],$row['email'],$row['phone'],get_the_title($row['wordpress_event_id']),$row['ticket_name'],$row['registration_status'],$row['marketing_consent']?'Yes':'No',$row['registered_at'],$row['eventbrite_attendee_id'],$row['eventbrite_order_id']));
    }
    fclose($out); exit;
}
add_action('admin_post_kbc_export_registrations', 'kbc_events_suite_export_registrations_csv');

function kbc_events_suite_render_registrations_page() {
    if (!current_user_can('manage_options')) { wp_die(esc_html__('You do not have permission.','kbc-events-suite-pro')); }
    global $wpdb;
    $message = '';
    $manual_registration_id = absint($_GET['manual_email'] ?? $_POST['manual_registration_id'] ?? 0);
    if (isset($_POST['kbc_send_manual_email'])) {
        check_admin_referer('kbc_manual_email_' . $manual_registration_id, 'kbc_manual_email_nonce');
        $sent = kbc_events_suite_send_manual_registration_email(
            $manual_registration_id,
            wp_unslash($_POST['manual_subject'] ?? ''),
            wp_unslash($_POST['manual_message'] ?? '')
        );
        $message = is_wp_error($sent) ? $sent->get_error_message() : __('Manual email sent successfully.','kbc-events-suite-pro');
        if (!is_wp_error($sent)) { $manual_registration_id = 0; }
    }
    if (isset($_POST['kbc_sync_attendees'])) {
        check_admin_referer('kbc_registrations_action','kbc_registrations_nonce');
        $result = kbc_events_suite_sync_attendees(true);
        $message = is_wp_error($result) ? $result->get_error_message() : sprintf(__('Sync complete: %1$d created, %2$d updated, %3$d unchanged.','kbc-events-suite-pro'),$result['created'],$result['updated'],$result['skipped']);
    }
    if (isset($_POST['kbc_process_email_queue'])) {
        check_admin_referer('kbc_registrations_action','kbc_registrations_nonce');
        kbc_events_suite_process_email_queue(); $message = __('Due email queue processed.','kbc-events-suite-pro');
    }
    if (isset($_POST['kbc_delete_registration'])) {
        check_admin_referer('kbc_delete_registration_' . absint($_POST['registration_id'] ?? 0));
        kbc_events_suite_delete_registration(absint($_POST['registration_id'] ?? 0)); $message = __('Registration deleted locally. Eventbrite may restore it on the next sync.','kbc-events-suite-pro');
    }
    $search = sanitize_text_field(wp_unslash($_GET['s'] ?? ''));
    $event_id = absint($_GET['event_id'] ?? 0);
    $status = sanitize_key(wp_unslash($_GET['registration_status'] ?? ''));
    $where = array('1=1'); $values = array();
    if ($search) { $where[] = '(first_name LIKE %s OR last_name LIKE %s OR email LIKE %s)'; $like='%'.$wpdb->esc_like($search).'%'; array_push($values,$like,$like,$like); }
    if ($event_id) { $where[]='wordpress_event_id=%d'; $values[]=$event_id; }
    if ($status) { $where[]='registration_status=%s'; $values[]=$status; }
    $sql = 'SELECT * FROM ' . kbc_events_suite_registrations_table() . ' WHERE ' . implode(' AND ',$where) . ' ORDER BY registered_at DESC LIMIT 300';
    $rows = $values ? $wpdb->get_results($wpdb->prepare($sql,$values),ARRAY_A) : $wpdb->get_results($sql,ARRAY_A);
    $events = kbc_events_suite_eventbrite_attendee_event_ids();
    $queue_counts = $wpdb->get_results("SELECT registration_id, status, COUNT(*) total FROM " . kbc_events_suite_email_queue_table() . " GROUP BY registration_id,status",ARRAY_A);
    $counts=array(); foreach($queue_counts as $count){$counts[$count['registration_id']][$count['status']]=absint($count['total']);}
    ?>
    <div class="wrap"><h1><?php esc_html_e('Event Registrations','kbc-events-suite-pro'); ?></h1>
    <?php if($message): ?><div class="notice notice-info is-dismissible"><p><?php echo esc_html($message); ?></p></div><?php endif; ?>
    <p><?php esc_html_e('Attendees imported from Eventbrite and their automatic-email status.','kbc-events-suite-pro'); ?></p>
    <?php if($manual_registration_id): $manual_registration=kbc_events_suite_registration_row($manual_registration_id); if($manual_registration): ?>
    <div class="postbox" style="padding:18px;max-width:900px"><h2 style="margin-top:0"><?php echo esc_html(sprintf(__('Send manual email to %s','kbc-events-suite-pro'),trim($manual_registration['first_name'].' '.$manual_registration['last_name']))); ?></h2>
      <p><strong><?php echo esc_html($manual_registration['email']); ?></strong> — <?php echo esc_html(get_the_title($manual_registration['wordpress_event_id'])); ?></p>
      <form method="post"><?php wp_nonce_field('kbc_manual_email_'.$manual_registration_id,'kbc_manual_email_nonce'); ?><input type="hidden" name="manual_registration_id" value="<?php echo absint($manual_registration_id); ?>">
        <p><label><strong><?php esc_html_e('Subject','kbc-events-suite-pro'); ?></strong><br><input class="large-text" name="manual_subject" required value="<?php echo esc_attr(wp_unslash($_POST['manual_subject']??('Information about {{event_title}}'))); ?>"></label></p>
        <p><label><strong><?php esc_html_e('Message','kbc-events-suite-pro'); ?></strong><br><textarea class="large-text" rows="9" name="manual_message" required><?php echo esc_textarea(wp_unslash($_POST['manual_message']??"Hi {{first_name}},\n\n")); ?></textarea></label></p>
        <p><button class="button button-primary" name="kbc_send_manual_email"><?php esc_html_e('Send Email Now','kbc-events-suite-pro'); ?></button> <a class="button" href="<?php echo esc_url(admin_url('edit.php?post_type='.kbc_events_suite_event_post_type().'&page=kbc-events-suite-registrations')); ?>"><?php esc_html_e('Cancel','kbc-events-suite-pro'); ?></a></p>
      </form><p class="description"><?php esc_html_e('This sends immediately and is independent of all automation switches. Template variables are supported.','kbc-events-suite-pro'); ?></p>
    </div><?php endif; endif; ?>
    <form method="post" style="display:inline-block;margin-right:8px"><?php wp_nonce_field('kbc_registrations_action','kbc_registrations_nonce'); ?><button class="button button-primary" name="kbc_sync_attendees"><?php esc_html_e('Sync Registrations Now','kbc-events-suite-pro'); ?></button> <button class="button" name="kbc_process_email_queue"><?php esc_html_e('Process Due Emails','kbc-events-suite-pro'); ?></button></form>
    <a class="button" href="<?php echo esc_url(wp_nonce_url(admin_url('admin-post.php?action=kbc_export_registrations'),'kbc_export_registrations')); ?>"><?php esc_html_e('Export CSV','kbc-events-suite-pro'); ?></a>
    <p><strong><?php esc_html_e('Last sync:','kbc-events-suite-pro'); ?></strong> <?php echo esc_html(get_option('kbc_events_suite_attendees_last_sync',__('Never','kbc-events-suite-pro'))); ?></p>
    <form method="get"><input type="hidden" name="post_type" value="<?php echo esc_attr(kbc_events_suite_event_post_type()); ?>"><input type="hidden" name="page" value="kbc-events-suite-registrations">
      <input type="search" name="s" value="<?php echo esc_attr($search); ?>" placeholder="<?php esc_attr_e('Name or email','kbc-events-suite-pro'); ?>">
      <select name="event_id"><option value="0"><?php esc_html_e('All events','kbc-events-suite-pro'); ?></option><?php foreach($events as $id): ?><option value="<?php echo absint($id); ?>" <?php selected($event_id,$id); ?>><?php echo esc_html(get_the_title($id)); ?></option><?php endforeach; ?></select>
      <select name="registration_status"><option value=""><?php esc_html_e('All statuses','kbc-events-suite-pro'); ?></option><?php foreach(array('attending','cancelled','refunded') as $item): ?><option <?php selected($status,$item); ?>><?php echo esc_html(ucfirst($item)); ?></option><?php endforeach; ?></select>
      <button class="button"><?php esc_html_e('Filter','kbc-events-suite-pro'); ?></button>
    </form>
    <table class="widefat striped" style="margin-top:15px"><thead><tr><th><?php esc_html_e('Attendee','kbc-events-suite-pro'); ?></th><th><?php esc_html_e('Email / Phone','kbc-events-suite-pro'); ?></th><th><?php esc_html_e('Event','kbc-events-suite-pro'); ?></th><th><?php esc_html_e('Ticket','kbc-events-suite-pro'); ?></th><th><?php esc_html_e('Status','kbc-events-suite-pro'); ?></th><th><?php esc_html_e('Registered','kbc-events-suite-pro'); ?></th><th><?php esc_html_e('Emails','kbc-events-suite-pro'); ?></th><th></th></tr></thead><tbody>
    <?php if(!$rows): ?><tr><td colspan="8"><?php esc_html_e('No registrations found. Run the first synchronization.','kbc-events-suite-pro'); ?></td></tr><?php endif; ?>
    <?php foreach($rows as $row): $c=$counts[$row['id']]??array(); ?><tr>
      <td><strong><?php echo esc_html(trim($row['first_name'].' '.$row['last_name'])); ?></strong><br><small>ID: <?php echo esc_html($row['eventbrite_attendee_id']); ?></small></td>
      <td><a href="mailto:<?php echo esc_attr($row['email']); ?>"><?php echo esc_html($row['email']); ?></a><br><?php echo esc_html($row['phone']); ?></td>
      <td><?php if($row['wordpress_event_id']): ?><a href="<?php echo esc_url(get_edit_post_link($row['wordpress_event_id'])); ?>"><?php echo esc_html(get_the_title($row['wordpress_event_id'])); ?></a><?php else: esc_html_e('Not linked','kbc-events-suite-pro'); endif; ?></td>
      <td><?php echo esc_html($row['ticket_name']); ?></td><td><?php echo esc_html(ucfirst($row['registration_status'])); ?><?php if($row['checked_in']): ?><br><small><?php esc_html_e('Checked in','kbc-events-suite-pro'); ?></small><?php endif; ?></td>
      <td><?php echo esc_html($row['registered_at']); ?></td><td><?php echo esc_html(sprintf('Pending: %d | Sent: %d | Failed: %d',$c['pending']??0,$c['sent']??0,$c['failed']??0)); ?></td>
      <td><a class="button button-small" href="<?php echo esc_url(add_query_arg(array('post_type'=>kbc_events_suite_event_post_type(),'page'=>'kbc-events-suite-registrations','manual_email'=>absint($row['id'])),admin_url('edit.php'))); ?>"><?php esc_html_e('Send Email','kbc-events-suite-pro'); ?></a><form method="post" style="margin-top:8px" onsubmit="return confirm('Delete this local registration?');"><?php wp_nonce_field('kbc_delete_registration_'.$row['id']); ?><input type="hidden" name="registration_id" value="<?php echo absint($row['id']); ?>"><button class="button-link-delete" name="kbc_delete_registration"><?php esc_html_e('Delete','kbc-events-suite-pro'); ?></button></form></td>
    </tr><?php endforeach; ?></tbody></table></div><?php
}
