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
