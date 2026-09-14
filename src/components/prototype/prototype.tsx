'use client';
import { useReducer, useState } from 'react';
import { journeyReducer, seedScene, type Scene } from '@/lib/prototype/state';
import Link from 'next/link';
import { RotateCcw, Smartphone, Monitor, ChevronDown } from 'lucide-react';
import { DeviceView } from './device-view';
import { OfficeView } from './office-view';
import { Button } from '@/components/ui/button';
import styles from './prototype.module.css';
const scenes:{id:Scene,label:string,description:string}[]=[
{id:'unflagged',label:'Nothing flagged',description:'Completed analysis produced no flag. This is not a safety clearance. Normal field checks remain necessary; moving to the next pole does not release any hold.'},
{id:'capture',label:'Capture a pole',description:'The existing capture workflow. A concern starts with the photo the crew already takes.'},
{id:'analysis',label:'Analysis pending',description:'The photo is saved but analysis is not complete. Await review before work on this pole under our proposed pre-work assumption.'},
{id:'finding',label:'A possible concern',description:'AI suggests an identity. The crew flags the concern without needing to identify the bird.'},
{id:'hold',label:'Review needed',description:'This pole stays on hold. The crew can continue to subsequent poles under our stated assumption.'},
{id:'request',label:'More evidence needed',description:'The supervisor keeps the hold and asks for another view. The crew receives one specific task.'},
{id:'sent',label:'New evidence delivered',description:'Additional photos join the same concern. The hold remains while the office reviews them.'},
{id:'stopped',label:'Work stoppage confirmed',description:'A reviewed nesting concern keeps this pole stopped. A supervisor instruction has been received.'},
{id:'continue',label:'Hold released',description:'The supervisor has resolved a false alarm and recorded a reason to continue work.'},
{id:'offline',label:'Connection unavailable',description:'The concern is saved on the device. The pole remains held while delivery is pending.'}];
const journeySteps: { label: string; scene: Scene; surface: 'field' | 'office' }[] = [
  { label: 'Evidence captured', scene: 'analysis', surface: 'field' },
  { label: 'Review needed', scene: 'hold', surface: 'office' },
  { label: 'More evidence needed', scene: 'request', surface: 'field' },
  { label: 'Work stoppage confirmed', scene: 'stopped', surface: 'field' },
  { label: 'Hold released', scene: 'continue', surface: 'field' },
];
export function Prototype(){
const [resetKey,setResetKey]=useState(0);
const [selectedDemoScene,setSelectedDemoScene]=useState<Scene>('finding');
const [surface,setSurface]=useState<'field'|'office'>('field');
const [{scene,pole,message,photoCount,photoCount024,analysisReady024,evidenceDelivered024,evidenceFailureCount024,queuedEvidenceFailure024},dispatch]=useReducer(journeyReducer,undefined,()=>seedScene());
const selectScene=(next:Scene)=>{dispatch({type:'scene',scene:next});setSelectedDemoScene(next);setResetKey(n=>n+1);};
const current=scenes.find(x=>x.id===scene)!;
const activeStep=scene==='continue'?4:scene==='stopped'?3:scene==='request'?2:['finding','hold','sent'].includes(scene)?1:0;
return <div className={styles.shell}>
<div className={styles.toolbar}>
<Link className={styles.backLink} href="/" target="_top" aria-label="Back to case study">← Case study</Link>
<div className={styles.roleTabs} role="tablist" aria-label="View perspective">{(['field','office'] as const).map(role=><button key={role} id={`role-${role}`} role="tab" aria-selected={surface===role} aria-controls={`panel-${role}`} tabIndex={surface===role?0:-1} onClick={()=>setSurface(role)} onKeyDown={event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const target=event.key==='Home'?'field':event.key==='End'?'office':role==='field'?'office':'field';setSurface(target);document.getElementById(`role-${target}`)?.focus();}}}>{role==='field'?<Smartphone size={16} aria-hidden="true"/>:<Monitor size={16} aria-hidden="true"/>}{role==='field'?'Field crew':'Office supervisor'}</button>)}</div>
<Button className={styles.reset} variant="ghost" onClick={()=>{dispatch({type:'reset'});setSelectedDemoScene('finding');setResetKey(n=>n+1)}}><RotateCcw data-icon="inline-start" aria-hidden="true"/>Reset</Button>
</div>
<div id="panel-field" role="tabpanel" aria-labelledby="role-field" hidden={surface!=='field'} tabIndex={0}>
<main className={styles.stage}><section className={styles.deviceStage} aria-label="Interactive IKE device"><DeviceView scene={scene} poleNumber={pole} photoCount={photoCount} feedback={message} onCapture={()=>dispatch({type:'capture'})} onFlag={()=>dispatch({type:'flag'})} onAddPhoto={()=>dispatch({type:'add-photo'})} onNextPole={()=>dispatch({type:'next-pole'})} onUnable={()=>dispatch({type:'unable'})}/><p className={styles.deviceCaption}>IKE Field · Android capture concept</p></section></main>
</div>
<div className={styles.officeStage} id="panel-office" role="tabpanel" aria-labelledby="role-office" hidden={surface!=='office'} tabIndex={0}><OfficeView evidenceFailureCount={evidenceFailureCount024} noFinding={selectedDemoScene==='unflagged'} key={resetKey} initialScene={selectedDemoScene} analysisReady={analysisReady024} evidenceDelivered={evidenceDelivered024} photoCount={photoCount024} onInstruction={(instruction,reason)=>dispatch({type:'instruction-received',instruction,reason})}/></div>
<footer className={styles.journeyBar}>
{queuedEvidenceFailure024 && <Button variant="outline" size="sm" onClick={()=>dispatch({type:"deliver-queued-failure"})}>Simulate queued update delivery</Button>}
<div className={styles.journeyInner}>

<nav className={styles.steps} aria-label="Journey moments">{journeySteps.map((step,index)=><button key={step.label} aria-current={activeStep===index?'step':undefined} onClick={()=>{selectScene(step.scene);setSurface(step.surface);}}><span className={styles.stepTrack}/><span>{step.label}</span></button>)}</nav>
<label className={styles.scenarioLabel}><span>Scenario</span><select value={scene} onChange={event=>selectScene(event.target.value as Scene)}>{scenes.map(item=><option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
</div>
<details className={styles.context}><summary>About this demo <ChevronDown size={14} aria-hidden="true"/></summary><div><strong>{current.label}</strong><p>{current.description}</p><p>Photos, analysis, timing, and delivery are simulated. Selecting a journey moment or scenario loads an example; switching roles preserves the current review. Scenario selection resets both perspectives.</p></div></details>
</footer>
</div>}
