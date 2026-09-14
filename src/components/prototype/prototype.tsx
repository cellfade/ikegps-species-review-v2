'use client';
import { useReducer, useState } from 'react';
import { journeyReducer, seedScene, type Scene } from '@/lib/prototype/state';
import Link from 'next/link';
import { ArrowRight, RotateCcw, Smartphone, Monitor, ChevronDown } from 'lucide-react';
import { DeviceView } from './device-view';
import { OfficeView } from './office-view';
import { Button } from '@/components/ui/button';
import styles from './prototype.module.css';
const scenes:{id:Scene,label:string,description:string}[]=[
{id:'capture',label:'Capture a pole',description:'The existing capture workflow. A concern starts with the photo the crew already takes.'},
{id:'analysis',label:'Analysis pending',description:'The photo is saved but analysis is not complete. Await review before work on this pole under our proposed pre-work assumption.'},
{id:'finding',label:'A possible concern',description:'AI suggests an identity. The crew flags the concern without needing to identify the bird.'},
{id:'hold',label:'Awaiting office review',description:'This pole stays on hold. The crew can continue to subsequent poles under our stated assumption.'},
{id:'request',label:'More photos requested',description:'The supervisor keeps the hold and asks for another view. The crew receives one specific task.'},
{id:'sent',label:'New evidence delivered',description:'Additional photos join the same concern. The hold remains while the office reviews them.'},
{id:'continue',label:'Decision received',description:'The supervisor has resolved a false alarm and recorded a reason to continue work.'},
{id:'offline',label:'Connection unavailable',description:'The concern is saved on the device. The pole remains held while delivery is pending.'}];
export function Prototype(){const [resetKey,setResetKey]=useState(0);const [surface,setSurface]=useState<'field'|'office'>('field');const [{scene,pole,message,photoCount,photoCount024},dispatch]=useReducer(journeyReducer,undefined,()=>seedScene());
const current=scenes.find(x=>x.id===scene)!;
return <div className={styles.shell}>
<header className={styles.header}><Link className={styles.brand} href="/prototype"><span className={styles.brandMark}>ike</span><span className={styles.productName}>Endangered species identification</span></Link><span className={styles.concept}>Design exploration · Andrew Miller</span></header>
<div className={styles.toolbar}><div className={styles.surface}><Smartphone size={17}/><strong>{surface==='field'?'IKE device':'Office Pro'}</strong><span>{surface==='field'?'Field capture':'Supervisor review'}</span></div><div className={styles.toolbarActions}><Button variant="ghost" onClick={()=>{dispatch({type:'reset'});setResetKey(n=>n+1)}}><RotateCcw data-icon="inline-start"/>Reset</Button><Button variant="outline" onClick={()=>setSurface(surface==='field'?'office':'field')}><Monitor data-icon="inline-start"/>{surface==='field'?'Office review':'Back to device'}<ArrowRight data-icon="inline-end"/></Button></div></div>
<div hidden={surface!=='field'}><main className={styles.stage}>
<aside className={styles.story}><span className={styles.eyebrow}>01 / FIELD TOUCHPOINT</span><h1>A concern.<br/>A clear next step.</h1><p className={styles.intro}>Keep the crew focused on capture. Put the assessment with the office.</p><div className={styles.sceneList} aria-label="Demonstration scenes">{scenes.map((item,i)=><button key={item.id} onClick={()=>dispatch({type:'scene',scene:item.id})} aria-pressed={scene===item.id} className={scene===item.id?styles.activeScene:styles.scene}><span>{String(i+1).padStart(2,'0')}</span>{item.label}{scene===item.id&&<ArrowRight size={16}/>}</button>)}</div><p className={styles.demoNote}>Selectable moments in one journey. Photos and AI suggestions are illustrative; time and delivery states are simulated.</p></aside>
<section className={styles.deviceStage} aria-label="Interactive IKE device"><div className={styles.deviceHeading}><span>Cedar Ridge / Work order 1084</span><strong>Pole {pole}</strong></div><DeviceView scene={scene} poleNumber={pole} photoCount={photoCount} feedback={message} onCapture={()=>dispatch({type:'capture'})} onFlag={()=>dispatch({type:'flag'})} onAddPhoto={()=>dispatch({type:'add-photo'})} onNextPole={()=>dispatch({type:'next-pole'})} onUnable={()=>dispatch({type:'unable'})}/><p className={styles.deviceCaption}>IKE Field · Android capture concept</p></section>
<aside className={styles.context}><span className={styles.eyebrow}>THIS MOMENT</span><h2>{current.label}</h2><p>{current.description}</p><div className={styles.rule}/><h3>One pole. One concern.</h3><p>Evidence and office requests stay attached to the pole. A new photo never silently releases the hold.</p><details><summary>What is proposed <ChevronDown size={15}/></summary><p>The concern UI extends the published IKE capture pattern. The surrounding device controls are simplified for this demonstration.</p></details><div role="status" className={styles.feedback}>{message}</div></aside>
</main></div><div hidden={surface!=='office'}><OfficeView key={resetKey} photoCount={photoCount024} onInstruction={(instruction,reason)=>dispatch({type:'instruction-received',instruction,reason})}/></div><footer className={styles.footer}><span>Capture → Review → Record</span><Link href="/">Back to case study</Link></footer></div>}
