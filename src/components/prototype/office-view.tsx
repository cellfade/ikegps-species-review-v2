"use client";

import { useRef, useState } from "react";
import { Bell, ChevronRight, Download, Camera, Clock3, Check, Send, Pause, ArrowUpRight, ListChecks, FolderOpen, ZoomIn, ZoomOut, Maximize2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import styles from "./office-view.module.css";

type Instruction = "hold" | "continue" | "request";
type Scene = "capture" | "analysis" | "finding" | "hold" | "request" | "sent" | "continue" | "offline";
type Props = { analysisReady?: boolean; evidenceDelivered?: boolean; initialScene?: Scene; photoCount?: number; onInstruction?: (instruction: Instruction, reason: string) => void };
export function OfficeView({ onInstruction, photoCount = 1, initialScene = "finding", analysisReady, evidenceDelivered }: Props) {
  const pendingAnalysis = analysisReady === undefined ? initialScene === "analysis" || initialScene === "capture" || initialScene === "offline" : !analysisReady;
  const photoAvailable = evidenceDelivered ?? (initialScene !== "capture" && initialScene !== "offline");
  const reviewEntryRef = useRef<HTMLButtonElement>(null);
  const actionEntryRef = useRef<HTMLElement | null>(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [view, setView] = useState<"review" | "compliance">("review");
  const [notification, setNotification] = useState(initialScene !== "continue" && initialScene !== "request");
  const [instruction, setInstruction] = useState<Instruction>(initialScene === "continue" ? "continue" : initialScene === "request" || initialScene === "sent" ? "request" : "hold");
  const [assessment, setAssessment] = useState(initialScene === "continue" ? "Other bird — AI suggestion rejected" : "Not yet verified");
  const [draftAssessment, setDraftAssessment] = useState("Not yet verified");
  const [draftNesting, setDraftNesting] = useState("Uncertain — more evidence needed");
  const [latestReason, setLatestReason] = useState("");
  const [nesting, setNesting] = useState(initialScene === "continue" ? "No nesting observed" : "Uncertain — more evidence needed");
  const [dialog, setDialog] = useState<Instruction | "assessment" | "export" | null>(null);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [delivery, setDelivery] = useState(initialScene === "continue" || initialScene === "request" || initialScene === "sent" ? "Received by crew · Demo event" : "No new instruction sent");
  const [history, setHistory] = useState<string[]>(initialScene === "continue" ? ["Crew received continuation instruction · Demonstration", "Alex Morgan authorized continuation · False alarm resolved after evidence review", "Assessment corrected · No nesting observed"] : initialScene === "offline" ? ["Device upload pending · New evidence unavailable to office"] : initialScene === "capture" ? ["Awaiting crew photo upload"] : initialScene === "analysis" ? ["Photo received · Analysis pending"] : initialScene === "request" || initialScene === "sent" ? [initialScene === "sent" ? "Additional evidence received · Re-review needed" : "Crew received evidence request · Hold maintained", "Alex Morgan requested a clearer view of nesting material"] : ["09:44 · AI analysis completed · Review needed", "09:43 · Photo received · Captured at 09:41", "09:41 · Crew flagged pole · Work held"]);
  const [selected, setSelected] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [markings, setMarkings] = useState(true);
  const [birdMark, setBirdMark] = useState(true);
  const [nestMark, setNestMark] = useState(true);
  const [birdPresence, setBirdPresence] = useState("Not yet reviewed");
  const [draftBirdPresence, setDraftBirdPresence] = useState("Not yet reviewed");
  const viewerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{x:number;y:number;panX:number;panY:number} | null>(null);
  const constrainPan = (x:number,y:number,scale=zoom) => {
    const frame=viewerRef.current?.getBoundingClientRect();
    if(!frame) return {x:0,y:0};
    const fit=Math.min(frame.width/1024,frame.height/1536);
    const limitX=Math.max(0,(1024*fit*scale-frame.width)/2);
    const limitY=Math.max(0,(1536*fit*scale-frame.height)/2);
    return {x:Math.max(-limitX,Math.min(limitX,x)),y:Math.max(-limitY,Math.min(limitY,y))};
  };
  const changeZoom = (value:number) => {const scale=Math.max(1,Math.min(4,value));setZoom(scale);setPan(constrainPan(pan.x,pan.y,scale));};
  const fitPhoto = () => {setZoom(1);setPan({x:0,y:0});};
  const [reviewed, setReviewed] = useState(initialScene === "continue");
  const [observedPhotoCount, setObservedPhotoCount] = useState(photoCount);
  const [newEvidence, setNewEvidence] = useState(initialScene === "sent");
  // Reconcile only a changed delivered count. This guarded render update avoids an effect cascade.
  if (observedPhotoCount !== photoCount) {
    setObservedPhotoCount(photoCount);
    if (photoCount > observedPhotoCount && photoAvailable && instruction === "request") {
      setNewEvidence(true);
      setNotification(true);
      setFeedback("");
      setReviewed(false);
      setHistory(items => [`Additional evidence received · ${photoCount} photos attached · Re-review needed; hold maintained`, ...items]);
    }
  }
  const openReview = () => { setView("review"); setNotification(false); setReviewOpen(true); };
  const begin = (action: Instruction | "assessment") => { actionEntryRef.current = document.activeElement as HTMLElement; setNotification(false); setDraftAssessment(assessment); setDraftNesting(nesting); setDraftBirdPresence(birdPresence); setDialog(action); setReason(""); setError(""); };
  const submit = () => {
    if (!reason.trim()) { setError("Add a reason to keep this decision verifiable."); return; }
    if (dialog === "assessment") {
      if (draftAssessment === "Not yet verified") { setError("Choose an assessment, including Unknown when identification is uncertain."); return; }
      setAssessment(draftAssessment); setNesting(draftNesting); setBirdPresence(draftBirdPresence);
      setHistory(h => [`Review updated by Alex Morgan · ${draftBirdPresence}; ${draftAssessment}; ${draftNesting} · ${reason}`, ...h]);
      setReviewed(true); setFeedback("Assessment saved. Work instruction is unchanged.");
    } else if (dialog === "hold" || dialog === "continue" || dialog === "request") {
      if (dialog === "continue" && (!reviewed || assessment === "Not yet verified" || nesting !== "No nesting observed")) { setError("Review the evidence and record a no-nesting assessment before authorizing continuation."); return; }
      setNewEvidence(false); setInstruction(dialog); setDelivery("Sent · Awaiting crew receipt");
      const label = dialog === "continue" ? "Continue work authorized" : dialog === "request" ? "More photos requested · Hold maintained" : "Hold maintained";
      setHistory(h => [`${label} by Alex Morgan · ${reason}`, ...h]);
      setFeedback(`${label}. Instruction sent; receipt pending.`); setLatestReason(reason.trim());
    }
    setDialog(null);
  };
  const exportCsv = () => {
    const rows = [["Work order","Pole","AI suggestion","Reviewed species","Bird visibility","Nesting assessment","Work instruction","Owner","Photo count","Captured","Instruction delivery","External procedure"],["WO-1084","024","Possible IKEstrel",assessment,birdPresence,nesting,instruction === "continue" ? "Continue authorized" : "On hold","Alex Morgan",String(photoCount),"2026-09-14 09:41",delivery,"Not recorded as complete"]];
    const csv = rows.map(row => row.map(cell => `"${cell.replaceAll('"','""')}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8;"})); const link = document.createElement("a"); link.href=url; link.download="cedar-ridge-compliance-024.csv"; link.click(); URL.revokeObjectURL(url);
    setDialog(null); setFeedback("One compliance record exported. External procedure remains outstanding.");
  };
  return <section className={styles.office} aria-label="IKE Office Pro review prototype">
    <header className={styles.header}><strong>ike<span>OFFICE PRO</span></strong><span className={styles.organization}>Cedar Ridge Utility</span><span className={styles.person}>AM</span></header>
    <nav className={styles.navigation} aria-label="Office sections"><Button variant="ghost" aria-pressed={view === "review"} onClick={() => setView("review")}><FolderOpen data-icon="inline-start"/>Work orders</Button><Button variant="ghost" aria-pressed={view === "compliance"} onClick={() => setView("compliance")}><ListChecks data-icon="inline-start"/>Compliance</Button><span>Alex Morgan · Supervisor</span></nav>
    {notification && !pendingAnalysis && <button className={styles.notification} onClick={openReview}><Bell/><span><strong>{newEvidence ? "New evidence ready for review" : "Possible nesting needs your review"}</strong><small>WO-1084 · Pole 024 · {newEvidence ? `${photoCount} photos received · Hold maintained` : "Analysis complete at 09:44 · Work on hold"}</small></span><span className={styles.notificationAction}>Review finding <ArrowUpRight/></span></button>}
    {feedback && <div className={styles.feedback} role="status">{feedback}</div>}
    {view === "compliance" ? <main className={styles.compliance}>
      <div className={styles.tableHeading}><div><p className={styles.eyebrow}>COMPLIANCE RECORDS</p><h1>Every concern. One record.</h1><p>Evidence, review and work instructions across your work orders.</p></div><Button disabled={!selected || pendingAnalysis} onClick={() => setDialog("export")}><Download data-icon="inline-start"/>Export selected (1)</Button></div>
      <div className={styles.tableGroup}><FolderOpen/> Cedar Ridge <span>WO-1084 · 1 concern</span></div>
      <Table><TableHeader><TableRow><TableHead>Select</TableHead><TableHead>Pole</TableHead><TableHead>Evidence</TableHead><TableHead>Assessment</TableHead><TableHead>Work instruction</TableHead><TableHead>Review owner</TableHead><TableHead>Next step</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell><input type="checkbox" aria-label="Select pole 024 record" checked={selected} onChange={e => setSelected(e.target.checked)}/></TableCell><TableCell><Button variant="link" onClick={openReview}>Pole 024 <ArrowUpRight data-icon="inline-end"/></Button></TableCell><TableCell>{photoAvailable ? photoCount : 0} photo{photoCount === 1 ? "" : "s"} · 09:41</TableCell><TableCell>{pendingAnalysis ? "Awaiting analysis" : assessment === "Not yet verified" ? "Possible IKEstrel" : assessment}<small className={styles.cellDetail}>{reviewed ? "Assessment recorded" : "Review needed"}</small></TableCell><TableCell><Badge variant="outline">{instruction === "continue" ? "Continue authorized" : "On hold"}</Badge></TableCell><TableCell>Alex Morgan</TableCell><TableCell>{instruction === "request" ? (newEvidence ? "Review new evidence" : "Collect evidence") : instruction === "continue" ? (delivery.startsWith("Received") ? "Receipt confirmed" : "Confirm crew receipt") : "Review / external procedure"}</TableCell></TableRow></TableBody></Table>
      <p className={styles.exportNote}>Export prepares a record. It does not file a report or complete an external procedure.</p>
    </main> : <div className={styles.workspace}>
      <aside className={styles.sidebar}><p className={styles.eyebrow}>WORK ORDER</p><h2>Cedar Ridge</h2><p className={styles.muted}>WO-1084</p><div className={styles.listLabel}>POLES <span>3 poles</span></div><div className={styles.staticPole}><span>023</span><small>Capture complete</small></div><button className={styles.activePole} onClick={openReview}><span>024 <ChevronRight/></span><small>{instruction === "continue" ? "Continue authorized" : "On hold · Review concern"}</small></button><div className={styles.staticPole}><span>025</span><small>Crew continuing here</small></div></aside>
      <main className={styles.workspaceMain}><div className={styles.workspaceHeading}><div><span className={styles.eyebrow}>CEDAR RIDGE / WO-1084</span><h1>Pole 024</h1></div><Badge variant="outline">{instruction === "continue" ? "Continue authorized" : "On hold"}</Badge></div><div className={styles.originalWorkspace}><div><div className={styles.photoHeader}><span><Camera/>IKEphoto</span><span>{photoAvailable ? `${photoCount} received` : "Awaiting upload"}</span></div><div className={styles.workspacePhoto}>{photoAvailable ? <svg viewBox="0 0 1024 1536" role="img" aria-label="Pole 024 photo" preserveAspectRatio="xMidYMid meet"><image href="/assets/pole-nest.png" width="1024" height="1536"/></svg> : <div className={styles.awaitingPhoto}>Photo awaiting upload</div>}{!pendingAnalysis && <button className={styles.concernEntry} onClick={openReview}><Bell/><span><strong>{newEvidence ? "New evidence to review" : "Species review"}</strong><small>{reviewed ? assessment : "Possible bird · Possible nest"}</small></span><ChevronRight/></button>}</div></div><aside className={styles.workspaceDetails}><h2>Pole details</h2><dl><dt>Work order</dt><dd>WO-1084</dd><dt>Pole number</dt><dd>024</dd><dt>Capture</dt><dd>{photoAvailable ? "Received · 09:43" : "Awaiting upload"}</dd><dt>Work instruction</dt><dd>{instruction === "continue" ? "Continue authorized" : "On hold"}</dd><dt>Reviewer</dt><dd>Alex Morgan</dd></dl><Button ref={reviewEntryRef} variant="outline" onClick={openReview}>Open species review <ArrowUpRight data-icon="inline-end"/></Button></aside></div></main>

    </div>}
    <Dialog open={reviewOpen} onOpenChange={setReviewOpen}><DialogContent className={styles.reviewModal} onCloseAutoFocus={event=>{event.preventDefault();reviewEntryRef.current?.focus();}}><DialogHeader className={styles.modalHeader}><DialogTitle>Species review</DialogTitle><DialogDescription>Review the evidence and record a work instruction.</DialogDescription></DialogHeader>      <div className={styles.review}>
        <div className={styles.poleHeading}><div><p className={styles.eyebrow}>CEDAR RIDGE / WO-1084</p><h1>Pole 024</h1></div><Badge variant="outline" className={instruction === "continue" ? styles.clearBadge : styles.holdBadge}>{instruction === "continue" ? "Continue authorized" : "Work on hold"}</Badge></div>
        <div className={styles.instructionBar}><div><strong>{newEvidence ? (reviewed ? "Evidence reviewed · Work decision needed" : "New evidence ready for review") : instruction === "request" ? "More evidence requested" : instruction === "continue" ? "Supervisor authorized continuation" : "Awaiting a verified work decision"}</strong>{instruction === "continue" && <small>Authorization recorded by Alex Morgan</small>}</div><div className={styles.actions}><Button variant="outline" onClick={() => begin("hold")}><Pause data-icon="inline-start"/>Maintain hold</Button><Button disabled={pendingAnalysis} onClick={() => begin("continue")}>Continue work <ChevronRight data-icon="inline-end"/></Button></div></div>
        <div className={styles.evidenceGrid}><div className={styles.evidence}>
          <div className={styles.photoHeader}><span><Camera/> Evidence · {photoAvailable ? photoCount : 0} photo{photoCount === 1 ? "" : "s"}</span><div className={styles.viewerControls}><Button disabled={!photoAvailable || zoom<=1} size="icon-sm" variant="ghost" aria-label="Zoom out" onClick={()=>changeZoom(zoom-.5)}><ZoomOut/></Button><output aria-label="Zoom level">{Math.round(zoom*100)}%</output><Button disabled={!photoAvailable || zoom>=4} size="icon-sm" variant="ghost" aria-label="Zoom in" onClick={()=>changeZoom(zoom+.5)}><ZoomIn/></Button><Button disabled={!photoAvailable} size="icon-sm" variant="ghost" aria-label="Fit entire photo" onClick={fitPhoto}><Maximize2/></Button><Button disabled={!photoAvailable || pendingAnalysis} size="icon-sm" variant="ghost" aria-label={markings ? "Hide AI markings" : "Show AI markings"} aria-pressed={markings} onClick={()=>setMarkings(!markings)}>{markings?<Eye/>:<EyeOff/>}</Button></div></div>
          <div ref={viewerRef} className={`${styles.photo} ${zoom>1 ? styles.pannable : ""}`} tabIndex={photoAvailable?0:-1} role="region" aria-label="Photo viewer. Plus and minus zoom, arrow keys pan, zero fits the photo." onKeyDown={event=>{if(!photoAvailable)return; if(["+","=","-","0","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(event.key)){event.preventDefault();if(event.key==="+"||event.key==="=")changeZoom(zoom+.5);else if(event.key==="-")changeZoom(zoom-.5);else if(event.key==="0")fitPhoto();else setPan(constrainPan(pan.x+(event.key==="ArrowLeft"?35:event.key==="ArrowRight"?-35:0),pan.y+(event.key==="ArrowUp"?35:event.key==="ArrowDown"?-35:0)));}}} onPointerDown={event=>{if(zoom<=1||!photoAvailable)return;event.currentTarget.setPointerCapture(event.pointerId);dragRef.current={x:event.clientX,y:event.clientY,panX:pan.x,panY:pan.y};}} onPointerMove={event=>{const drag=dragRef.current;if(drag)setPan(constrainPan(drag.panX+event.clientX-drag.x,drag.panY+event.clientY-drag.y));}} onPointerUp={()=>{dragRef.current=null;}} onPointerCancel={()=>{dragRef.current=null;}}>{photoAvailable ? <svg className={styles.annotatedPhoto} style={{transform:`translate(${pan.x}px, ${pan.y}px) scale(${zoom})`}} viewBox="0 0 1024 1536" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Illustrative pole photograph; bird and nest markings are manually placed demonstration annotations"><image href="/assets/pole-nest.png" width="1024" height="1536"/>{!pendingAnalysis && markings && <g className={styles.detectionOutline} style={{strokeWidth:2.5/zoom}}>{birdMark && <g><title>Bird · Unverified</title><path d="M397 494 L417 468 L429 451 L437 437 L450 426 L461 419 L475 417 L484 423 L487 430 L479 433 L476 447 L467 461 L457 473 L438 481 L425 487 L416 496 Z"/><text x="397" y="401" className={styles.markLabel}>Bird · Unverified</text></g>}{nestMark && <g><title>Possible nest · Unverified</title><path d="M379 493 L398 479 L429 461 L452 456 L482 454 L502 440 L520 447 L537 457 L563 450 L587 458 L596 479 L590 506 L604 529 L591 548 L591 574 L578 589 L573 611 L558 593 L534 583 L511 585 L492 569 L468 557 L453 536 L433 519 L408 516 Z"/><text x="490" y="641" className={styles.markLabel}>Possible nest</text></g>}</g>}</svg> : <div className={styles.awaitingPhoto}><Camera/><strong>Photo not yet available</strong><span>{initialScene === "offline" ? "Upload pending · Device is offline" : "Awaiting capture and upload"}</span></div>}{photoAvailable && <span className={styles.photoFlag}>{pendingAnalysis ? "Awaiting analysis" : "AI suggestion · Unverified"}</span>}</div>
          {!pendingAnalysis && photoAvailable && <div className={styles.markingOptions}><span>Markings</span><label><input type="checkbox" checked={birdMark} disabled={!markings} onChange={e=>setBirdMark(e.target.checked)}/>Bird</label><label><input type="checkbox" checked={nestMark} disabled={!markings} onChange={e=>setNestMark(e.target.checked)}/>Possible nest</label></div>}
          <details className={styles.evidenceDetails}><summary>Capture details & crew note</summary><div className={styles.photoMeta}><span>IKEphoto · Crew capture</span><span>{photoAvailable ? "Captured 09:41 · Received 09:43" : "Not received"}</span></div><p>{pendingAnalysis ? "No crew observation received." : "Crew: Bird near the crossarm. Flagged for office review."}</p></details>
        </div><aside className={styles.details}>
          <div className={styles.analysis}><div className={styles.sectionHeading}><span className={styles.eyebrow}>AI ANALYSIS</span><Badge variant="secondary">Unverified</Badge></div><h2>{pendingAnalysis ? "Awaiting analysis" : "Possible IKEstrel"}</h2><p>{pendingAnalysis ? "No identification available yet" : "Possible nesting"}</p><details className={styles.analysisNote}><summary>About this suggestion</summary><p>AI suggestions need human review. A bird near a nest does not establish which species owns it.</p><div className={styles.analysisTime}><Check/>{pendingAnalysis ? (photoAvailable ? "Photo received · Analysis pending" : "Awaiting photo upload") : "Analysis complete · 09:44"}</div></details></div>
          <div className={styles.assessment}><div className={styles.sectionHeading}><span className={styles.eyebrow}>YOUR ASSESSMENT</span><Button disabled={!photoAvailable} variant="link" onClick={() => begin("assessment")}>{reviewed ? "Revise" : "Review"}</Button></div><strong>{assessment}</strong>{reviewed && <small className={styles.visibilityAssessment}>Bird visibility · {birdPresence}</small>}<p>{reviewed ? nesting : "Identification needs review."}</p><Button variant="outline" onClick={() => begin("request")}><Camera data-icon="inline-start"/>Request more photos</Button></div>
          <div className={styles.delivery}><span className={styles.eyebrow}>INSTRUCTION TO CREW</span><p><Send/>{delivery.replace(" · Demo event", "")}</p><small>Alex Morgan owns the decision.</small></div>
        </aside></div>
        <details className={styles.history}><summary><Clock3/>Record history <span>{history.length} events</span></summary><ol>{history.map((item,index) => <li key={`${index}-${item}`}>{item.replace(" · Demonstration", "").replace(" · Simulated receipt", "")}</li>)}</ol></details>
      </div></DialogContent></Dialog>
    <div className={styles.externalDemo}>{delivery === "Sent · Awaiting crew receipt" && <Button variant="outline" className={styles.receiptDemo} onClick={() => { setDelivery("Received by crew · Demo event"); setFeedback("Crew received the latest instruction. Receipt recorded in history."); setHistory(h => ["Crew received latest instruction · Simulated receipt", ...h]); onInstruction?.(instruction, latestReason); }}>Simulate crew receipt</Button>}</div>
    <Dialog open={dialog !== null} onOpenChange={open => { if(!open) setDialog(null); }}><DialogContent className={styles.dialog} onCloseAutoFocus={event=>{if(reviewOpen){event.preventDefault();actionEntryRef.current?.focus();}}}><DialogHeader><DialogTitle>{dialog === "assessment" ? "Record your assessment" : dialog === "export" ? "Export one compliance record" : dialog === "request" ? "Request evidence · Keep hold" : dialog === "continue" ? "Authorize work on Pole 024" : "Maintain hold on Pole 024"}</DialogTitle><DialogDescription>{dialog === "export" ? "WO-1084 · Pole 024. CSV includes evidence context, assessment, instruction and owner. External filing remains outstanding." : dialog === "assessment" ? "The original AI suggestion stays in the record. Changing this assessment does not change the work instruction." : dialog === "request" ? "Describe the missing view. Collect from an appropriate existing observation position without approaching or disturbing the bird." : "Your reason and name will be recorded. The instruction will be sent to the crew; receipt is tracked separately."}</DialogDescription></DialogHeader>
      {dialog === "assessment" && <><Field><FieldLabel htmlFor="bird-presence">Bird visibility</FieldLabel><Select value={draftBirdPresence} onValueChange={setDraftBirdPresence}><SelectTrigger id="bird-presence"><SelectValue/></SelectTrigger><SelectContent><SelectGroup>{["Not yet reviewed","Visible","Not visible","Uncertain"].map(v=><SelectItem value={v} key={v}>{v}</SelectItem>)}</SelectGroup></SelectContent></Select></Field><Field><FieldLabel htmlFor="species-assessment">Species assessment</FieldLabel><Select value={draftAssessment} onValueChange={setDraftAssessment}><SelectTrigger id="species-assessment"><SelectValue/></SelectTrigger><SelectContent><SelectGroup>{["Not yet verified","IKEstrel","Other bird — AI suggestion rejected","Unknown"].map(v => <SelectItem value={v} key={v}>{v}</SelectItem>)}</SelectGroup></SelectContent></Select></Field><Field><FieldLabel htmlFor="nest-assessment">Nesting assessment</FieldLabel><Select value={draftNesting} onValueChange={setDraftNesting}><SelectTrigger id="nest-assessment"><SelectValue/></SelectTrigger><SelectContent><SelectGroup>{["Uncertain — more evidence needed","Nesting observed","No nesting observed"].map(v => <SelectItem value={v} key={v}>{v}</SelectItem>)}</SelectGroup></SelectContent></Select></Field></>}
      {dialog !== "export" && <Field data-invalid={!!error}><FieldLabel htmlFor="decision-reason">{dialog === "request" ? "Photos needed" : "Reason / evidence"}</FieldLabel><Textarea id="decision-reason" value={reason} onChange={e => {setReason(e.target.value);setError("");}} placeholder={dialog === "request" ? "Describe the detail needed to assess nesting…" : "What evidence supports your decision?"} aria-invalid={!!error}/>{error && <p role="alert" className={styles.error}>{error}</p>}</Field>}
      <DialogFooter><Button variant="outline" onClick={() => setDialog(null)}>Cancel</Button><Button onClick={dialog === "export" ? exportCsv : submit}>{dialog === "export" ? "Download CSV" : dialog === "assessment" ? "Save assessment" : dialog === "request" ? "Send request · Keep hold" : dialog === "continue" ? "Authorize & send" : "Record hold & send"}</Button></DialogFooter>
    </DialogContent></Dialog>
  </section>;
}
