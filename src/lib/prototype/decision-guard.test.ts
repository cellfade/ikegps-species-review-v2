import test from 'node:test';
import assert from 'node:assert/strict';
import { decisionPrerequisite } from './decision-guard.ts';
const ready={photoAvailable:true,reviewed:true,dirty:false,nesting:'No nesting observed'};
test('release requires saved no-nesting evidence, not merely a crew message',()=>{
  assert.notEqual(decisionPrerequisite('continue',{...ready,reviewed:false}),'');
  assert.notEqual(decisionPrerequisite('continue',{...ready,dirty:true}),'');
  assert.notEqual(decisionPrerequisite('continue',{...ready,photoAvailable:false}),'');
  assert.notEqual(decisionPrerequisite('continue',{...ready,nesting:'Uncertain: more evidence needed'}),'');
  assert.equal(decisionPrerequisite('continue',ready),'');
});
test('confirmation requires nesting; keeping hold and requesting evidence remain available',()=>{
  assert.notEqual(decisionPrerequisite('confirm',ready),'');
  assert.equal(decisionPrerequisite('confirm',{...ready,nesting:'Nesting observed'}),'');
  for(const action of ['hold','request']) assert.equal(decisionPrerequisite(action,{...ready,reviewed:false,photoAvailable:false,dirty:true}),'');
});

test('assessment distinguishes missing choices, uncertainty and conflicting observation',async()=>{
  const {assessmentProblem}=await import('./decision-guard.ts');
  assert.match(assessmentProblem({bird:'Not yet reviewed',species:'Unknown',reason:'Unclear image'}),/Bird visibility/);
  assert.match(assessmentProblem({bird:'Not visible',species:'Not yet verified',reason:'Bag'}),/Species assessment/);
  assert.match(assessmentProblem({bird:'Visible',species:'No bird: non-animal object',reason:'Bag'}),/disagree/);
  assert.equal(assessmentProblem({bird:'Uncertain',species:'Unknown',reason:'Image unclear'}),'');
  assert.equal(assessmentProblem({bird:'Not visible',species:'Unknown',reason:'Nest without visible adult'}),'');
});

test('confirmed hold still delivers an actionable evidence request', async()=>{
  const {crewDecision}=await import('./decision-guard.ts');
  assert.equal(crewDecision('request',true),'request');
  assert.equal(crewDecision('hold',true),'stopped');
  assert.equal(crewDecision('hold',false),'hold');
  assert.equal(crewDecision('continue',false),'continue');
});

test('revised assessment supersedes only an unreceived decision',async()=>{
 const {shouldSupersedeDecision}=await import('./decision-guard.ts');
 assert.equal(shouldSupersedeDecision('Sent · Awaiting crew receipt',true),true);
 assert.equal(shouldSupersedeDecision('Sent · Awaiting crew receipt',false),false);
 assert.equal(shouldSupersedeDecision('Received by crew',true),false);
 assert.equal(shouldSupersedeDecision('No new work decision sent',true),false);
});
test('corridor navigation visits every demonstration pole without a self-loop',async()=>{
 const {nextCorridorPole}=await import('./decision-guard.ts');
 assert.deepEqual(['023','024','025'].map(nextCorridorPole),['024','025','023']);
});
