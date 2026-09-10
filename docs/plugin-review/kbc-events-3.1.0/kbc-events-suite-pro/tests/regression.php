<?php
/**
 * Lightweight, standalone regression checks for the pure protection/state
 * decisions. Run with: php tests/regression.php
 */

define('ABSPATH', __DIR__ . '/');

function add_action() {}
function add_filter() {}
function sanitize_key($value) {
    return preg_replace('/[^a-z0-9_\-]/', '', strtolower((string) $value));
}
function absint($value) {
    return abs((int) $value);
}

require_once dirname(__DIR__) . '/includes/core/meta.php';
require_once dirname(__DIR__) . '/includes/core/dates.php';

$failures = array();

function kbc_test_assert($condition, $message) {
    global $failures;
    if (!$condition) {
        $failures[] = $message;
    }
}

/* Manual WordPress title/content edits must survive incoming remote changes. */
kbc_test_assert(
    kbc_events_suite_should_apply_synced_value(
        'Manual title',
        'New Eventbrite title',
        'Old Eventbrite title',
        true,
        false,
        false,
        true,
        false,
        false
    ) === false,
    'A manually edited title was not preserved.'
);

kbc_test_assert(
    kbc_events_suite_should_apply_synced_value(
        '<p>Manual body</p>',
        '<p>New remote body</p>',
        '<p>Old remote body</p>',
        true,
        false,
        false,
        true,
        false,
        false
    ) === false,
    'Manually edited content was not preserved.'
);

/* Source-owned values may update normally. */
kbc_test_assert(
    kbc_events_suite_should_apply_synced_value(
        'Old Eventbrite title',
        'New Eventbrite title',
        'Old Eventbrite title',
        true,
        false,
        false,
        true,
        false,
        false
    ) === true,
    'An unedited Eventbrite-owned title did not update.'
);

/* Safe first-sync migration: unexplained existing values are assumed manual. */
kbc_test_assert(
    kbc_events_suite_should_apply_synced_value(
        'Existing editorial title',
        'Remote title',
        '',
        false,
        false,
        false,
        true,
        false,
        false
    ) === false,
    'A pre-upgrade local value was not protected on first sync.'
);

/* Empty old fields and newly created posts still receive remote data. */
kbc_test_assert(
    kbc_events_suite_should_apply_synced_value('', 'Remote value', '', false, false, false, true, false, false) === true,
    'An empty field did not accept remote data.'
);
kbc_test_assert(
    kbc_events_suite_should_apply_synced_value('', 'Remote value', '', false, false, true, true, true, false) === true,
    'A new event did not accept remote data.'
);

/* Permanent locks are stronger than automatic ownership detection. */
kbc_test_assert(
    kbc_events_suite_should_apply_synced_value('Locked', 'Remote', 'Locked', true, false, true, true, false, false) === false,
    'A permanently locked field was overwritten.'
);

/* Registration must not re-open between event end and highlights day. */
kbc_test_assert(
    kbc_events_suite_resolve_button_state('20260612', '20260610', '20260610', 1, 7, 'live') === 'closed',
    'Registration re-opened after the event ended.'
);
kbc_test_assert(
    kbc_events_suite_resolve_button_state('20260617', '20260610', '20260610', 1, 7, 'live') === 'ended',
    'Highlights state did not begin on the configured day.'
);
kbc_test_assert(
    kbc_events_suite_resolve_button_state('20260601', '20260610', '20260612', 1, 1, 'live') === 'open',
    'A future event was not open before the close day.'
);
kbc_test_assert(
    kbc_events_suite_resolve_button_state('20260601', '20260610', '20260612', 1, 1, 'cancelled') === 'closed',
    'A cancelled event was not closed.'
);

/* Eventbrite-owned map values are removed so ACF can use its default. */
kbc_test_assert(
    kbc_events_suite_should_clear_synced_map_value(true, 'Remote address', 'Remote address', true, 'New address', true, false) === true,
    'An Eventbrite-owned map value was not released to the ACF default.'
);
kbc_test_assert(
    kbc_events_suite_should_clear_synced_map_value(true, 'Manual map', 'Remote address', true, 'New address', true, true) === false,
    'A manually edited map value was not preserved.'
);
kbc_test_assert(
    kbc_events_suite_should_clear_synced_map_value(false, '', '', false, 'Remote address', true, false) === true,
    'An unsaved map field was not left available for the ACF default.'
);

if ($failures) {
    fwrite(STDERR, "Regression checks failed:\n- " . implode("\n- ", $failures) . "\n");
    exit(1);
}

echo "All Events Suite regression checks passed.\n";
