"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Bell, Check, ImagePlus, FolderPlus } from 'lucide-react';
import { OfficeView } from '@/components/prototype/office-view';
import styles from './page.module.css';
type Stage = 'idle' | 'queued' | 'analysis' | 'finding';
export function AnalysisEntryPoints({initialPath = "background"}:{initialPath?:string}) {
  const [source,setSource] = useState<'photo'|'workorder'>(initialPath==='planning'?'workorder':'photo');
  const [photoEnabled,setPhotoEnabled] = useState(true);
  const [orderEnabled,setOrderEnabled] = useState(true);
  const [stage,setStage] = useState<Stage>('idle');
  const [review,setReview] = useState(false);
  const enabled = source === 'photo' ? photoEnabled : orderEnabled;
  function reset(next:'photo'|'workorder') {setSource(next);setStage('idle');setReview(false);}
  return <main className={styles.page}>
    <header><Link href="/">← Case study</Link><span>Phase two exploration · Simulated events</span><Link href="/prototype">Core prototype ↗</Link></header>
    <div className={styles.heading}><p>Analysis entry points</p><h1>A concern can surface<br/>before a work order.</h1><div>Explore two proposed event triggers. Existing photos keep their capture date; a new analysis does not make old evidence current.</div></div>
    <div className={styles.layout}>
      <aside className={styles.config}><h2>Trigger configuration</h2><span className={styles.mode}>Run mode · Event-driven</span><label><input type="checkbox" checked={photoEnabled} onChange={e=>setPhotoEnabled(e.target.checked)} disabled={stage!=='idle'}/>Photo added or updated</label><label><input type="checkbox" checked={orderEnabled} onChange={e=>setOrderEnabled(e.target.checked)} disabled={stage!=='idle'}/>Work order created</label><p>These settings apply to this demo session. Events enter a queue when their trigger is enabled.</p><details><summary>Proposed processing policy</summary><p>Use photo identity, content version and model version to avoid duplicate analysis. Reuse eligible results, queue changed evidence and limit concurrent work. Validate cost, retry and freshness rules before implementation.</p></details></aside>
      <section className={styles.workspace} aria-labelledby="event-heading"><div className={styles.tabs} role="group" aria-label="Event to simulate"><button onClick={()=>reset('photo')} aria-pressed={source==='photo'}><ImagePlus size={17}/>Photo library</button><button onClick={()=>reset('workorder')} aria-pressed={source==='workorder'}><FolderPlus size={17}/>New work order</button></div>
        <div className={styles.event}><p className={styles.kicker}>Example event</p><h2 id="event-heading">{source==='photo'?'A photo changes outside a work order':'A work order checks existing photos'}</h2><p>{source==='photo'?'A utility photo library receives a new or updated image. This example has no work-order association.':'Creating the illustrative work order discovers existing pole photos and checks whether each needs analysis.'}</p><dl><div><dt>Association</dt><dd>{source==='photo'?'Unassigned · No work order':'Illustrative WO-1084 · Pole 024'}</dd></div><div><dt>Photo captured</dt><dd>02 September 2026 · 14:20</dd></div><div><dt>Event received</dt><dd>14 September 2026 · 09:40</dd></div><div><dt>Work status</dt><dd>{source==='photo'?'Not applicable · No work hold created':'Requires current assessment before work'}</dd></div></dl></div>
        <ol className={styles.progress} aria-label="Simulated analysis progress">{['Queued','Analysis','Finding notification'].map((label,index)=><li key={label} data-active={['queued','analysis','finding'].indexOf(stage)>=index}>{label}<ArrowRight size={15}/></li>)}</ol>
        <div className={styles.run} aria-live="polite">{stage==='idle'?<><p>{enabled?'Ready to simulate the selected event.':'This trigger is disabled. Enable it to queue this event.'}</p><button disabled={!enabled} onClick={()=>setStage('queued')}>Simulate event <ArrowRight size={16}/></button></>:stage==='queued'?<><p><Check size={17}/>Event queued. Photo version is ready for the eligibility check.</p><button onClick={()=>setStage('analysis')}>Start simulated analysis <ArrowRight size={16}/></button></>:stage==='analysis'?<><p>Analysis in progress. No clearance or work decision has been issued.</p><button onClick={()=>setStage('finding')}>Complete simulated analysis <ArrowRight size={16}/></button></>:<><p><Bell size={17}/>Review needed · Possible bird or nesting concern</p><span>Analysis completed 14 September 2026 · 09:42. The photo remains twelve days old. Request current evidence before relying on it for work.</span>{source==='photo'?<div className={styles.unassigned}><strong>Unassigned concern recorded</strong><p>No work hold was created. An owner must establish the pole and work context before making a work decision.</p><Link href="/prototype">Explore shared review in an illustrative associated work order ↗</Link></div>:<button onClick={()=>setReview(true)}>Open existing office review <ArrowRight size={16}/></button>}</>}</div>
        {stage!=='idle'&&<button className={styles.reset} onClick={()=>reset(source)}>Reset example</button>}
      </section>
    </div>
    {review&&source==='workorder'&&<section className={styles.review}><div><h2>Existing shared office review</h2><p>Illustrative associated-work-order scene. Its seeded evidence and history demonstrate the existing review controls; they are separate from the historical photo event above.</p><button onClick={()=>setReview(false)}>Close review example</button></div><OfficeView initialScene="finding"/></section>}
    <footer>No real upload, model call, background service or persistent configuration. Each processing step advances only when selected.</footer>
  </main>;
}
