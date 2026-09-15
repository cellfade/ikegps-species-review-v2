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

test('a received hold does not silently upload offline evidence on the next capture',()=>{
  const first=journeyReducer(seedScene('offline'),{type:'add-photo'});
  const instructed=journeyReducer(first,{type:'instruction-received',instruction:'hold',reason:'Keep this pole held while upload is pending'});
  const second=journeyReducer(instructed,{type:'add-photo'});
  assert.equal(second.localPhotoCount024,3);
  assert.equal(second.photoCount024,0,'receipt is not evidence delivery');
  assert.equal(second.evidenceDelivered024,false);
  assert.equal(second.analysisReady024,false);
  assert.equal(second.instruction,'hold');
  assert.match(second.message,/Upload pending/);
});

test('repeated evidence requests preserve the concern and accumulate photos without clearance',()=>{
  let current=seedScene('hold');
  for(const reason of ['Show the crossarm from farther away','Add another view of the object']) {
    current=journeyReducer(current,{type:'instruction-received',instruction:'request',reason});
    assert.equal(current.scene,'request');
    current=journeyReducer(current,{type:'add-photo'});
    assert.equal(current.scene,'sent');
    assert.equal(current.instruction,'hold');
    assert.equal(current.concernId,'concern-024');
  }
  assert.equal(current.photoCount024,3);
  assert.equal(current.localPhotoCount024,3);
  const release=journeyReducer(current,{type:'instruction-received',instruction:'continue',reason:'Object verified as debris, no nesting observed'});
  assert.equal(release.scene,'continue');
  assert.equal(release.photoCount024,3);
  assert.equal(release.concernId,'concern-024');
});

test('an inability followed by a successful evidence retry preserves the failure record',()=>{
  let current=journeyReducer(seedScene('request'),{type:'unable'});
  current=journeyReducer(current,{type:'instruction-received',instruction:'request',reason:'Try the wider view from the existing observation point'});
  current=journeyReducer(current,{type:'add-photo'});
  assert.equal(current.scene,'sent');
  assert.equal(current.evidenceFailureCount024,1);
  assert.equal(current.photoCount024,2);
  assert.equal(current.instruction,'hold');
});

test('reset clears queued updates and stale decisions before a fresh rehearsal',()=>{
  const queued=journeyReducer(journeyReducer(seedScene('offline'),{type:'add-photo'}),{type:'unable'});
  const reset=journeyReducer(queued,{type:'reset'});
  assert.equal(reset.scene,'finding');
  assert.equal(reset.queuedEvidenceFailure024,false);
  assert.equal(reset.evidenceFailureCount024,0);
  assert.equal(reset.localPhotoCount024,1);
  assert.equal(reset.photoCount024,1);
  assert.equal(reset.message,'');
  assert.equal(reset.instruction,'await-review');
  assert.equal(journeyReducer(reset,{type:'deliver-queued-failure'}),reset);
});

test('scenario selection clears the previous pole decision and evidence history',()=>{
  const released=journeyReducer(journeyReducer(seedScene('request'),{type:'add-photo'}),{type:'instruction-received',instruction:'continue',reason:'Incorrect flag verified'});
  const clean=journeyReducer(released,{type:'scene',scene:'unflagged'});
  assert.equal(clean.concernId,'');
  assert.equal(clean.instruction,'await-review');
  assert.equal(clean.message,'');
  assert.equal(clean.photoCount024,1);
  const offline=journeyReducer(clean,{type:'scene',scene:'offline'});
  assert.equal(offline.concernId,'concern-024');
  assert.equal(offline.instruction,'hold');
  assert.equal(offline.photoCount024,0);
  assert.equal(offline.evidenceDelivered024,false);
});

test('request receipt does not convert a pending-upload capture into delivered evidence',()=>{
  const requested=journeyReducer(seedScene('offline'),{type:'instruction-received',instruction:'request',reason:'Add the wider view once possible'});
  const captured=journeyReducer(requested,{type:'add-photo'});
  assert.equal(captured.scene,'request','keep the request visible while the new photo awaits upload');
  assert.equal(captured.photoCount,2);
  assert.equal(captured.photoCount024,0);
  assert.equal(captured.evidenceDelivered024,false);
  assert.equal(captured.instruction,'hold');
  assert.match(captured.message,/Upload pending/);
});

test('failure after an offline request receipt remains queued until explicitly delivered',()=>{
  const requested=journeyReducer(seedScene('offline'),{type:'instruction-received',instruction:'request',reason:'Please collect an additional view'});
  const failed=journeyReducer(requested,{type:'unable'});
  assert.equal(failed.scene,'offline');
  assert.equal(failed.evidenceFailureCount024,0);
  assert.equal(failed.queuedEvidenceFailure024,true);
  assert.equal(failed.instruction,'hold');
  assert.match(failed.message,/office delivery pending/);
  const delivered=journeyReducer(failed,{type:'deliver-queued-failure'});
  assert.equal(delivered.evidenceFailureCount024,1);
  assert.equal(delivered.queuedEvidenceFailure024,false);
  assert.equal(delivered.photoCount024,0);
  assert.equal(delivered.evidenceDelivered024,false);
  assert.equal(journeyReducer(delivered,{type:'deliver-queued-failure'}),delivered);
});

test('the latest instruction remains available when photo and failure feedback changes',()=>{
  const text='Photograph the crossarm from the current observation point';
  const requested=journeyReducer(seedScene('offline'),{type:'instruction-received',instruction:'request',reason:`  ${text}  `});
  assert.equal(requested.instructionReason,text);
  const captured=journeyReducer(requested,{type:'add-photo'});
  assert.equal(captured.instructionReason,text);
  assert.match(captured.message,/Upload pending/);
  const failed=journeyReducer(captured,{type:'unable'});
  assert.equal(failed.instructionReason,text);
  const delivered=journeyReducer(failed,{type:'deliver-queued-failure'});
  assert.equal(delivered.instructionReason,text);
  const revised=journeyReducer(delivered,{type:'instruction-received',instruction:'hold',reason:'Wait for the supervisor to review the available evidence'});
  assert.equal(revised.instructionReason,'Wait for the supervisor to review the available evidence');
  assert.equal(journeyReducer(revised,{type:'reset'}).instructionReason,'');
  assert.equal(journeyReducer(revised,{type:'scene',scene:'request'}).instructionReason,'');
});
