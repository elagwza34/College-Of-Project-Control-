import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
async function moduleFrom(path) {
  const { outputText } = ts.transpileModule(readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
  return import('data:text/javascript;base64,' + Buffer.from(outputText).toString('base64'));
}
const { resolveDestination } = await moduleFrom('src/router/navigation.ts');
const { validateStep, calculateEligibility } = await moduleFrom('src/pages/apprenticeship-eligibility-checker/eligibilityEngine.ts');
const { getHomepageEventDisplayTitle } = await moduleFrom('src/components/feature/homepageEventTitle.ts');
const policy = await moduleFrom('src/data/apprenticeshipFundingPolicy.ts');
const facts = await moduleFrom('src/data/programmeFacts.ts');
test('legacy CTAs resolve to implemented journeys', () => {
  assert.equal(resolveDestination('#consultation'), '/book-a-session');
  assert.equal(resolveDestination('/employers#process'), '/employers#how-it-works');
  assert.equal(resolveDestination('/project-controls-professional-level-6#routes'), '/project-controls-professional-level-6#pathways');
  assert.equal(resolveDestination('javascript:alert(1)'), '/contact');
  assert.equal(resolveDestination('java\nscript:alert(1)'), '/contact');
  assert.equal(resolveDestination('https://example.com/event'), 'https://example.com/event');
});
test('required answers reject whitespace while optional questions remain optional', () => {
  const step = { questions: [{ id: 'required', required: true }, { id: 'optional', required: false }] };
  assert.deepEqual(validateStep(step, { required: '  ' }), ['required']);
  assert.deepEqual(validateStep(step, { required: 'yes' }), []);
});
test('eligibility blockers override otherwise favourable indicators', () => {
  assert.equal(calculateEligibility({ age_16: 'no', previous_learning: 'no' }).status, 'not_suitable');
});
test('uncertain eligibility and prior learning are routed to review', () => {
  assert.equal(calculateEligibility({ workplace_england: 'not_sure', previous_learning: 'no' }).status, 'review');
  assert.equal(calculateEligibility({ previous_learning: 'yes' }).status, 'review');
});
test('favourable answers produce only an indicative result, never confirmation', () => {
  const result = calculateEligibility({ age_16: 'yes', full_time_education: 'no', workplace_england: 'yes', employment_situation: 'employed', employer_support: 'yes', employment_contract: 'yes', right_to_work: 'yes', previous_learning: 'no', residency_status: 'uk', interest_area: 'pcp' });
  assert.equal(result.status, 'likely'); assert.match(result.label, /review/i); assert.doesNotMatch(result.message, /confirmed|approved|booked/i);
});
test('homepage event titles drop a leading funding prefix without touching the rest of the title', () => {
  // Exact live source titles, including the double space in the ChPP record.
  assert.equal(getHomepageEventDisplayTitle('Fully Funded Project Control with  APM Chartered Project Professional(ChPP)'), 'Project Control with APM Chartered Project Professional(ChPP)');
  assert.equal(getHomepageEventDisplayTitle('The London Masterclass'), 'The London Masterclass');
  assert.equal(getHomepageEventDisplayTitle('Fully Funded Project Management Professional with AI Dashboards and Agents'), 'Project Management Professional with AI Dashboards and Agents');
  assert.equal(getHomepageEventDisplayTitle('Fully-funded Project Controls Intensive'), 'Project Controls Intensive');
  assert.equal(getHomepageEventDisplayTitle('100% Funded Planning Masterclass'), 'Planning Masterclass');
  assert.equal(getHomepageEventDisplayTitle('DfE funded Risk Masterclass'), 'Risk Masterclass');
});
test('homepage event title normalisation is anchored to the start and never empties a title', () => {
  // Funding mentioned inside the title is content, not a prefix.
  assert.equal(getHomepageEventDisplayTitle('Project Controls: Fully Funded Routes Explained'), 'Project Controls: Fully Funded Routes Explained');
  assert.equal(getHomepageEventDisplayTitle('Earned Value and Fully Funded Options'), 'Earned Value and Fully Funded Options');
  // A title that is only a prefix stays usable instead of rendering blank.
  assert.equal(getHomepageEventDisplayTitle('Fully Funded'), 'Fully Funded');
  assert.equal(getHomepageEventDisplayTitle(''), '');
  // Repeated whitespace is collapsed everywhere.
  assert.equal(getHomepageEventDisplayTitle('The   London    Masterclass'), 'The London Masterclass');
});

/* ── Apprenticeship funding policy (regulatory facts) ── */

test('apprenticeship funding bands are owned by programme facts, not retyped in pages', () => {
  const apm = facts.programmeById('apm-l4');
  const pcp = facts.programmeById('pcp-l6');
  assert.equal(apm.standard.code, 'ST0310');
  assert.equal(apm.standard.version, 'v1.5');
  assert.equal(apm.level, 4);
  assert.equal(apm.fundingBandMaximum, 7000);
  assert.equal(pcp.standard.code, 'ST0845');
  assert.equal(pcp.standard.version, 'v1.1');
  assert.equal(pcp.level, 6);
  assert.equal(pcp.fundingBandMaximum, 27000);
  // The professional offer is not an apprenticeship and has no funding band.
  assert.equal(facts.programmeById('pmo-l6').fundingBandMaximum, undefined);
});

test('the funding year window is declared once', () => {
  const p = policy.apprenticeshipFundingPolicy;
  assert.equal(p.fundingYear, '2026/27');
  assert.equal(p.appliesFrom, '2026-08-01');
  assert.equal(p.appliesTo, '2027-07-31');
  assert.equal(policy.fundingWindowPhrase(), 'from 1 August 2026 to 31 July 2027');
});

test('contribution percentages follow the approved funding rules', () => {
  const older = policy.AGE_25_PLUS;
  // Non-levy, apprentice 25+
  assert.equal(policy.fundingContributionPercent('non-levy', older), 95);
  assert.equal(policy.employerContributionPercent('non-levy', older), 5);
  // Levy-paying with insufficient account funds, apprentice 25+
  assert.equal(policy.fundingContributionPercent('levy-insufficient', older), 75);
  assert.equal(policy.employerContributionPercent('levy-insufficient', older), 25);
  // A contribution always sums to a full split.
  for (const id of ['non-levy', 'levy-insufficient']) {
    const gov = policy.fundingContributionPercent(id, older);
    const emp = policy.employerContributionPercent(id, older);
    assert.equal(gov + emp, 100, `${id} must split the full cost`);
  }
});

test('younger eligible apprentices are funded to the band maximum, not a percentage', () => {
  const younger = policy.AGE_16_TO_24;
  for (const id of ['levy-sufficient', 'levy-insufficient', 'non-levy']) {
    assert.equal(policy.fundsUpToBandMaximum(id, younger), true, `${id}/${younger}`);
    assert.equal(policy.fundingContributionPercent(id, younger), undefined, `${id}/${younger} has no fixed split`);
  }
});

test('levy-funded starts are never described as 100% government funded', () => {
  // Sufficient levy funds are the employer's own account money, so the policy
  // must not express them as a government percentage.
  for (const band of [policy.AGE_16_TO_24, policy.AGE_25_PLUS]) {
    assert.equal(policy.fundingContributionPercent('levy-sufficient', band), undefined);
    assert.equal(policy.employerContributionPercent('levy-sufficient', band), undefined);
    assert.equal(policy.fundsUpToBandMaximum('levy-sufficient', band), true);
  }
});

test('funding policy exposes exactly the three employer situations, each with both age bands', () => {
  assert.deepEqual(policy.fundingRoutes.map(r => r.id), ['levy-sufficient', 'levy-insufficient', 'non-levy']);
  for (const route of policy.fundingRoutes) {
    assert.deepEqual(route.contributions.map(c => c.ageBandLabel), [policy.AGE_16_TO_24, policy.AGE_25_PLUS]);
  }
});

test('funding policy lookups fail loudly rather than returning undefined silently', () => {
  assert.throws(() => policy.fundingContributionPercent('non-levy', 'Age 30+'));
  assert.throws(() => policy.routeById('not-a-route'));
});

test('currency and percentage formatting derive from the canonical numbers', () => {
  assert.equal(policy.formatGBP(27000), '£27,000');
  assert.equal(policy.formatGBP(7000), '£7,000');
  assert.equal(policy.formatGBP(34000), '£34,000');
  assert.equal(policy.formatPercent(95), '95%');
  assert.equal(policy.formatPercent(5), '5%');
});
