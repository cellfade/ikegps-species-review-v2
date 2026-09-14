import test from 'node:test';
import assert from 'node:assert/strict';
import { journeyReducer, seedScene } from './state.ts';

test('additional evidence retains identity and hold, including offline',()=>{
  for(const scene of ['hold','request','offline'] as const){
    const before=seedScene(scene);const after=journeyReducer(before,{type:'add-photo'});
    assert.equal(after.instruction,'hold');assert.equal(after.concernId,before.concernId);assert.equal(after.photoCount,2);
  }
});
test('analysis pending never implies permission to work',()=>assert.equal(seedScene('analysis').instruction,'await-review'));
test('release requires an explicit reasoned received instruction',()=>{
  const held=seedScene('hold');assert.equal(journeyReducer(held,{type:'instruction-received',instruction:'continue',reason:''}),held);
  assert.equal(journeyReducer(held,{type:'instruction-received',instruction:'continue',reason:'False alarm resolved'}).instruction,'continue');
});
test('next pole starts with its own evidence and no inherited clearance',()=>{
  const next=journeyReducer(seedScene('continue'),{type:'next-pole'});
  assert.equal(next.pole,'025');assert.equal(next.photoCount,0);assert.equal(next.instruction,'await-review');
});

test('offline captures stay local and do not enter office evidence',()=>{
  const offline=journeyReducer(seedScene('offline'),{type:'add-photo'});
  assert.equal(offline.photoCount,2);
  assert.equal(offline.localPhotoCount024,2);
  assert.equal(offline.photoCount024,0);
  const next=journeyReducer(offline,{type:'next-pole'});
  const returned=journeyReducer(next,{type:'instruction-received',instruction:'hold',reason:'Review pending'});
  assert.equal(returned.photoCount,2);
  assert.equal(returned.photoCount024,0);
});

test('next-pole checkpoint cannot submit an unsupported second concern',()=>{
  const next=journeyReducer(seedScene('hold'),{type:'next-pole'});
  for(const type of ['capture','flag','add-photo','next-pole'] as const){
    assert.equal(journeyReducer(next,{type}),next);
  }
});


test('confirmed stoppage reaches the crew as a held outcome',()=>{
 const before=seedScene('hold');
 const after=journeyReducer(before,{type:'instruction-received',instruction:'stopped',reason:'Nesting observed'});
 assert.equal(after.scene,'stopped');assert.equal(after.instruction,'hold');
 assert.equal(seedScene('stopped').instruction,'hold');
});

test('nothing flagged is a result, not a hold release',()=>{
  const result=seedScene('unflagged');
  assert.equal(result.analysisReady024,true);
  assert.equal(result.concernId,'');
  assert.notEqual(result.instruction,'continue');
  const next=journeyReducer(result,{type:'next-pole'});
  assert.equal(next.pole,'025');
  assert.equal(next.instruction,'await-review');
  assert.match(next.message,/Normal field checks/);
});


test('unable-to-collect update reaches office once while preserving hold and evidence',()=>{
  const requested=seedScene('request');
  const failed=journeyReducer(requested,{type:'unable'});
  assert.equal(failed.instruction,'hold');
  assert.equal(failed.evidenceFailureCount024,1);
  assert.equal(failed.queuedEvidenceFailure024,false);
  assert.equal(failed.photoCount024,requested.photoCount024);
  assert.match(failed.message,/Office received/);
  assert.equal(journeyReducer(failed,{type:'deliver-queued-failure'}),failed);
});

test('offline inability stays queued until explicit delivery without uploading photos or releasing hold',()=>{
  const failed=journeyReducer(seedScene('offline'),{type:'unable'});
  assert.equal(failed.scene,'offline');
  assert.equal(failed.instruction,'hold');
  assert.equal(failed.evidenceFailureCount024,0);
  assert.equal(failed.queuedEvidenceFailure024,true);
  assert.match(failed.message,/office delivery pending/);
  const delivered=journeyReducer(failed,{type:'deliver-queued-failure'});
  assert.equal(delivered.evidenceFailureCount024,1);
  assert.equal(delivered.queuedEvidenceFailure024,false);
  assert.equal(delivered.instruction,'hold');
  assert.equal(delivered.photoCount024,0);
  assert.equal(delivered.evidenceDelivered024,false);
  assert.equal(journeyReducer(delivered,{type:'deliver-queued-failure'}),delivered);
});
