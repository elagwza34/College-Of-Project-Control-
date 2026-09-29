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
