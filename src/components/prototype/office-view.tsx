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
import { IdentificationHelp } from "./identification-help";

type Instruction = "hold" | "continue" | "request";
type Scene = "capture" | "analysis" | "finding" | "hold" | "request" | "sent" | "stopped" | "continue" | "offline";
type Props = { analysisReady?: boolean; evidenceDelivered?: boolean; initialScene?: Scene; photoCount?: number; onInstruction?: (instruction: Instruction | "stopped", reason: string) => void };
export function OfficeView({ onInstruction, photoCount = 1, initialScene = "finding", analysisReady, evidenceDelivered }: Props) {
  const pendingAnalysis = analysisReady === undefined ? initialScene === "analysis" || initialScene === "capture" || initialScene === "offline" : !analysisReady;
  const photoAvailable = evidenceDelivered ?? (initialScene !== "capture" && initialScene !== "offline");
  const reviewEntryRef = useRef<HTMLButtonElement>(null);
  const actionEntryRef = useRef<HTMLElement | null>(null);
  const [workspacePole, setWorkspacePole] = useState("024");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [view, setView] = useState<"review" | "compliance">("review");
  const [notification, setNotification] = useState(initialScene !== "continue" && initialScene !== "request" && initialScene !== "stopped");
  const [instruction, setInstruction] = useState<Instruction>(initialScene === "continue" ? "continue" : initialScene === "request" || initialScene === "sent" ? "request" : "hold");
  const [assessment, setAssessment] = useState(initialScene === "continue" ? "Other bird: AI suggestion rejected" : initialScene === "stopped" ? "IKEstrel" : "Not yet verified");
  const [draftAssessment, setDraftAssessment] = useState(assessment);
  const [draftNesting, setDraftNesting] = useState(initialScene === "continue" ? "No nesting observed" : initialScene === "stopped" ? "Nesting observed" : "Uncertain: more evidence needed");
  const [latestReason, setLatestReason] = useState("");
  const [nesting, setNesting] = useState(initialScene === "continue" ? "No nesting observed" : initialScene === "stopped" ? "Nesting observed" : "Uncertain: more evidence needed");
  const [dialog, setDialog] = useState<Instruction | "confirm" | "export" | null>(null);
  const [requestEvidence, setRequestEvidence] = useState(false);
  const [confirmedStoppage, setConfirmedStoppage] = useState(initialScene === "stopped");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [delivery, setDelivery] = useState(initialScene === "continue" || initialScene === "request" || initialScene === "sent" || initialScene === "stopped" ? "Received by crew · Demo event" : "No new work decision sent");
  const [history, setHistory] = useState<string[]>(initialScene === "stopped" ? ["Crew received confirmed work stoppage · Demonstration", "Alex Morgan confirmed work stoppage · Nesting observed after review"] : initialScene === "continue" ? ["Crew received continuation instruction · Demonstration", "Alex Morgan authorized continuation · False alarm resolved after evidence review", "Assessment corrected · No nesting observed"] : initialScene === "offline" ? ["Device upload pending · New evidence unavailable to office"] : initialScene === "capture" ? ["Awaiting crew photo upload"] : initialScene === "analysis" ? ["Photo received · Analysis pending"] : initialScene === "request" || initialScene === "sent" ? [initialScene === "sent" ? "Additional evidence received · Re-review needed" : "Crew received evidence request · Hold maintained", "Alex Morgan requested a clearer view of nesting material"] : ["09:44 · AI analysis completed · Review needed", "09:43 · Photo received · Captured at 09:41", "09:41 · Crew flagged pole · Work held"]);
  const [selected, setSelected] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<"wide" | "detail">("wide");
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
  const [reviewed, setReviewed] = useState(initialScene === "continue" || initialScene === "stopped");
  const [observedPhotoCount, setObservedPhotoCount] = useState(photoCount);
  const [newEvidence, setNewEvidence] = useState(initialScene === "sent");
  // Reconcile only a changed delivered count. This guarded render update avoids an effect cascade.
  if (observedPhotoCount !== photoCount) {
    setObservedPhotoCount(photoCount);
    if (photoCount > observedPhotoCount && photoAvailable) {
      setNewEvidence(true);
      setNotification(true);
      setFeedback("");
      setReviewed(false);
      setHistory(items => [`Additional evidence received · ${photoCount} photos attached · Re-review needed; work instruction unchanged`, ...items]);
    }
  }
  const [assessmentReason, setAssessmentReason] = useState("");
  const [savedAssessmentReason, setSavedAssessmentReason] = useState("");
  const [assessmentError, setAssessmentError] = useState("");
  const assessmentDirty = draftAssessment !== assessment || draftNesting !== nesting || draftBirdPresence !== birdPresence || assessmentReason !== savedAssessmentReason;
  const saveAssessment = () => {
    if(draftAssessment === "Not yet verified" || !assessmentReason.trim()){setAssessmentError("Choose an assessment and add supporting evidence.");return;}
    setAssessment(draftAssessment);setNesting(draftNesting);setBirdPresence(draftBirdPresence);setSavedAssessmentReason(assessmentReason);setAssessmentError("");setReviewed(true);
    setHistory(h=>[`Review updated by Alex Morgan · ${draftBirdPresence}; ${draftAssessment}; ${draftNesting} · ${assessmentReason.trim()}`,...h]);
    setFeedback("Assessment recorded. Work status is unchanged.");
  };
  const openReview = () => { setWorkspacePole("024"); setView("review"); setNotification(false); setReviewOpen(true); };
  const begin = (action: Instruction | "confirm") => { actionEntryRef.current = document.activeElement as HTMLElement; setNotification(false); setDialog(action); setRequestEvidence(false); setReason(""); setError(""); };
  const submit = () => {
    if ((dialog === "continue" || dialog === "confirm") && assessmentDirty) { setError("Save your assessment changes before recording this work decision."); return; }
    if (!reason.trim()) { setError("Add a reason to keep this decision verifiable."); return; }
    if (dialog === "hold" || dialog === "continue" || dialog === "request" || dialog === "confirm") {
      if (dialog === "continue" && (!reviewed || assessmentDirty || assessment === "Not yet verified" || nesting !== "No nesting observed")) { setError("Review the evidence and record a no-nesting assessment before authorizing continuation."); return; }
      if (dialog === "confirm" && (!reviewed || assessmentDirty || nesting !== "Nesting observed")) { setError("Record a reviewed nesting observation before confirming work stoppage."); return; }
      const nextInstruction: Instruction = dialog === "confirm" ? "hold" : dialog === "hold" && requestEvidence ? "request" : dialog;
      setConfirmedStoppage(dialog === "confirm");
      setNewEvidence(false); setInstruction(nextInstruction); setDelivery("Sent · Awaiting crew receipt");
      const label = dialog === "confirm" ? "Work stoppage confirmed · Nesting observed" : dialog === "continue" ? "Hold released" : nextInstruction === "request" ? "More photos requested · Hold maintained" : "Hold maintained";
      setHistory(h => [`${label} by Alex Morgan · ${reason}`, ...h]);
      setFeedback(`${label}. Instruction sent; receipt pending.`); setLatestReason(reason.trim());
    }
    setDialog(null);
  };
  const exportCsv = () => {
    const rows = [["Work order","Pole","AI suggestion","Reviewed species","Bird visibility","Nesting assessment","Work instruction","Owner","Photo count","Captured","Instruction delivery","External procedure"],["WO-1084","024","Possible IKEstrel",assessment,birdPresence,nesting,instruction === "continue" ? "Hold released" : "On hold","Alex Morgan",String(photoCount),"2026-09-14 09:41",delivery,"Not recorded as complete"]];
    const csv = rows.map(row => row.map(cell => `"${cell.replaceAll('"','""')}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8;"})); const link = document.createElement("a"); link.href=url; link.download="cedar-ridge-compliance-024.csv"; link.click(); URL.revokeObjectURL(url);
    setDialog(null); setFeedback("One compliance record exported. External procedure remains outstanding.");
  };
  return <section className={styles.office} aria-label="IKE Office Pro review prototype">
    <nav className={styles.navigation} aria-label="Office sections"><Button variant="ghost" aria-pressed={view === "review"} onClick={() => setView("review")}><FolderOpen data-icon="inline-start"/>Office workspace</Button><Button variant="ghost" aria-pressed={view === "compliance"} onClick={() => setView("compliance")}><ListChecks data-icon="inline-start"/>Compliance</Button><span>Office Pro layout · Proposed species extension</span></nav>
    {view === "review" && <div className={styles.poleSwitcher}><span>WO-1084</span><div role="group" aria-label="Select a demonstration pole">{["023","024","025"].map(pole=><Button key={pole} variant="ghost" size="sm" aria-pressed={workspacePole===pole} onClick={()=>setWorkspacePole(pole)}>Pole {pole}</Button>)}</div><small>{workspacePole === "024" ? "Evidence review available" : "Awaiting capture"}</small></div>}
    {feedback && workspacePole === "024" && <div className={styles.feedback} role="status">{feedback}</div>}
    {view === "compliance" ? <main className={styles.compliance}>
      <div className={styles.tableHeading}><div><p className={styles.eyebrow}>COMPLIANCE RECORDS</p><h1>Every concern. One record.</h1><p>Evidence, review and work instructions across your work orders.</p></div><Button disabled={!selected || pendingAnalysis} onClick={() => setDialog("export")}><Download data-icon="inline-start"/>Export selected (1)</Button></div>
      <div className={styles.tableGroup}><FolderOpen/> Cedar Ridge <span>WO-1084 · 1 concern</span></div>
      <Table><TableHeader><TableRow><TableHead>Select</TableHead><TableHead>Pole</TableHead><TableHead>Evidence</TableHead><TableHead>Assessment</TableHead><TableHead>Work instruction</TableHead><TableHead>Review owner</TableHead><TableHead>Next step</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell><input type="checkbox" aria-label="Select pole 024 record" checked={selected} onChange={e => setSelected(e.target.checked)}/></TableCell><TableCell><Button variant="link" onClick={openReview}>Pole 024 <ArrowUpRight data-icon="inline-end"/></Button></TableCell><TableCell>{photoAvailable ? photoCount : 0} photo{photoCount === 1 ? "" : "s"} · 09:41</TableCell><TableCell>{pendingAnalysis ? "Awaiting analysis" : assessment === "Not yet verified" ? "Possible IKEstrel" : assessment}<small className={styles.cellDetail}>{reviewed ? "Assessment recorded" : "Review needed"}</small></TableCell><TableCell><Badge variant="outline">{instruction === "continue" ? "Hold released" : "On hold"}</Badge></TableCell><TableCell>Alex Morgan</TableCell><TableCell>{instruction === "request" ? (newEvidence ? "Review new evidence" : "Collect evidence") : instruction === "continue" ? (delivery.startsWith("Received") ? "Receipt confirmed" : "Confirm crew receipt") : "Review / external procedure"}</TableCell></TableRow></TableBody></Table>
      <p className={styles.exportNote}>Export prepares a record. It does not file a report or complete an external procedure.</p>
    </main> : <div className={styles.literalWorkspace}>
      <svg viewBox="0 0 1515 782" role="img" aria-label="Office Pro training reference with proposed Pole 024 photo overlay"><image href="/references/office-pro-training-frame.png" width="1515" height="782"/><rect x="475" y="32" width="563" height="750" fill="#e8ede7"/>{workspacePole === "024" && photoAvailable ? <svg x="475" y="32" width="563" height="750" viewBox="0 0 1024 1536" preserveAspectRatio="xMidYMid meet"><image href={selectedPhoto === "detail" ? "/assets/pole-nest-detail-illustrative.png" : "/assets/pole-nest.png"} width="1024" height="1536"/>{!pendingAnalysis && selectedPhoto === "wide" && <g className={styles.detectionOutline}><path d="M397 494 L417 468 L429 451 L437 437 L450 426 L461 419 L475 417 L484 423 L487 430 L479 433 L476 447 L467 461 L457 473 L438 481 L425 487 L416 496 Z"/><path d="M379 493 L398 479 L429 461 L452 456 L482 454 L502 440 L520 447 L537 457 L563 450 L587 458 L596 479 L590 506 L604 529 L591 548 L591 574 L578 589 L573 611 L558 593 L534 583 L511 585 L492 569 L468 557 L453 536 L433 519 L408 516 Z"/><path d="M500 461H670"/><rect x="667" y="433" width="295" height="54" fill="#fffdf4" stroke="#e832c3"/><text x="681" y="466" fill="#70405f" stroke="none" fontSize="23">Possible nest · Unverified</text></g>}</svg> : <text x="756" y="370" textAnchor="middle" fill="#788571" fontSize="18">Pole {workspacePole} · Awaiting capture</text>}
      <rect x="17" y="78" width="234" height="22" fill="#f9faf5"/><text x="28" y="94" fontSize="13" fill="#45533e">{workspacePole}</text><rect x="1280" y="33" width="90" height="21" fill="#f3f7ef"/><text x="1295" y="48" fontSize="13" fill="#45533e">{workspacePole}</text><rect x="1223" y="289" width="70" height="23" fill="#f9fcf5"/><text x="1233" y="305" fontSize="13" fill="#68735e">{workspacePole}</text></svg>
      <button ref={reviewEntryRef} className={styles.literalNotification} onClick={openReview}><Bell size={14}/><span>Pole 024 · {pendingAnalysis ? "Analysis pending" : newEvidence ? "New evidence" : notification ? "Review needed" : "Species review"}</span><ArrowUpRight size={13}/></button>
      {workspacePole === "024" && photoAvailable && !pendingAnalysis && <button className={styles.literalPhotoBadge} onClick={openReview}><Bell size={14}/><span><strong>Possible bird · Possible nest</strong><small>{reviewed ? "Assessment recorded" : "AI suggestion · Review needed"}</small></span><ArrowUpRight size={13}/></button>}
    </div>}
    <Dialog open={reviewOpen} onOpenChange={setReviewOpen}><DialogContent className={styles.reviewModal} onCloseAutoFocus={event=>{event.preventDefault();reviewEntryRef.current?.focus();}}><DialogHeader className={styles.modalHeader}><DialogTitle>Species review</DialogTitle><DialogDescription>Review the evidence and record a work instruction.</DialogDescription></DialogHeader>      <div className={styles.review}>
        <div className={styles.poleHeading}><div><p className={styles.eyebrow}>CEDAR RIDGE / WO-1084</p><h1>Pole 024</h1></div><Badge variant="outline" className={instruction === "continue" ? styles.clearBadge : styles.holdBadge}>{instruction === "continue" ? "Hold released" : confirmedStoppage ? "Work stoppage confirmed" : "Work on hold"}</Badge></div>
        <div className={styles.instructionBar}><div><strong>{newEvidence ? (reviewed ? "Evidence reviewed · Work decision needed" : "New evidence ready for review") : confirmedStoppage ? "Work stoppage confirmed · Nesting observed" : instruction === "request" ? "More evidence needed" : instruction === "continue" ? "Hold released" : "Review needed"}</strong>{instruction === "continue" && <small>Authorization recorded by Alex Morgan</small>}</div><div className={styles.actions}><Button variant="outline" onClick={() => begin("hold")}><Pause data-icon="inline-start"/>Keep hold</Button><Button disabled={pendingAnalysis} onClick={() => begin("continue")}>Release hold <ChevronRight data-icon="inline-end"/></Button><Button variant="outline" disabled={pendingAnalysis} onClick={() => begin("confirm")}>Confirm work stoppage</Button></div></div>
        <div className={styles.evidenceGrid}><div className={styles.evidence}>
          {photoAvailable && <div className={styles.photoRail} aria-label="Evidence photographs"><button aria-pressed={selectedPhoto === "wide"} onClick={()=>{setSelectedPhoto("wide");fitPhoto();}}><svg viewBox="0 0 1024 1536" aria-hidden="true"><image href="/assets/pole-nest.png" width="1024" height="1536"/></svg><span>Pole view</span></button>{photoCount>=2 && <button aria-pressed={selectedPhoto === "detail"} onClick={()=>{setSelectedPhoto("detail");fitPhoto();}}><svg viewBox="0 0 1024 1536" aria-hidden="true"><image href="/assets/pole-nest-detail-illustrative.png" width="1024" height="1536"/></svg><span>Detail view</span></button>}{photoCount>2 && <small>Two illustrative views available</small>}</div>}
          <div className={styles.photoHeader}><span><Camera/> Evidence · {photoAvailable ? photoCount : 0} photo{photoCount === 1 ? "" : "s"}</span><div className={styles.viewerControls}><Button disabled={!photoAvailable || zoom<=1} size="icon-sm" variant="ghost" aria-label="Zoom out" onClick={()=>changeZoom(zoom-.5)}><ZoomOut/></Button><output aria-label="Zoom level">{Math.round(zoom*100)}%</output><Button disabled={!photoAvailable || zoom>=4} size="icon-sm" variant="ghost" aria-label="Zoom in" onClick={()=>changeZoom(zoom+.5)}><ZoomIn/></Button><Button disabled={!photoAvailable} size="icon-sm" variant="ghost" aria-label="Fit entire photo" onClick={fitPhoto}><Maximize2/></Button><Button disabled={!photoAvailable || pendingAnalysis || selectedPhoto === "detail"} size="icon-sm" variant="ghost" aria-label={markings ? "Hide AI markings" : "Show AI markings"} aria-pressed={markings} onClick={()=>setMarkings(!markings)}>{markings?<Eye/>:<EyeOff/>}</Button></div></div>
          <div ref={viewerRef} className={`${styles.photo} ${zoom>1 ? styles.pannable : ""}`} tabIndex={photoAvailable?0:-1} role="region" aria-label="Photo viewer. Plus and minus zoom, arrow keys pan, zero fits the photo." onKeyDown={event=>{if(!photoAvailable)return; if(["+","=","-","0","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(event.key)){event.preventDefault();if(event.key==="+"||event.key==="=")changeZoom(zoom+.5);else if(event.key==="-")changeZoom(zoom-.5);else if(event.key==="0")fitPhoto();else setPan(constrainPan(pan.x+(event.key==="ArrowLeft"?35:event.key==="ArrowRight"?-35:0),pan.y+(event.key==="ArrowUp"?35:event.key==="ArrowDown"?-35:0)));}}} onPointerDown={event=>{if(zoom<=1||!photoAvailable)return;event.currentTarget.setPointerCapture(event.pointerId);dragRef.current={x:event.clientX,y:event.clientY,panX:pan.x,panY:pan.y};}} onPointerMove={event=>{const drag=dragRef.current;if(drag)setPan(constrainPan(drag.panX+event.clientX-drag.x,drag.panY+event.clientY-drag.y));}} onPointerUp={()=>{dragRef.current=null;}} onPointerCancel={()=>{dragRef.current=null;}}>{photoAvailable ? <svg className={styles.annotatedPhoto} style={{transform:`translate(${pan.x}px, ${pan.y}px) scale(${zoom})`}} viewBox="0 0 1024 1536" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Illustrative pole photograph; bird and nest markings are manually placed demonstration annotations"><image href={selectedPhoto === "detail" ? "/assets/pole-nest-detail-illustrative.png" : "/assets/pole-nest.png"} width="1024" height="1536"/>{selectedPhoto === "wide" && !pendingAnalysis && markings && <g className={styles.detectionOutline} style={{strokeWidth:2.5/zoom}}>{birdMark && <g><title>Bird · Unverified</title><path d="M397 494 L417 468 L429 451 L437 437 L450 426 L461 419 L475 417 L484 423 L487 430 L479 433 L476 447 L467 461 L457 473 L438 481 L425 487 L416 496 Z"/><text x="397" y="401" className={styles.markLabel}>Bird · Unverified</text></g>}{nestMark && <g><title>Possible nest · Unverified</title><path d="M379 493 L398 479 L429 461 L452 456 L482 454 L502 440 L520 447 L537 457 L563 450 L587 458 L596 479 L590 506 L604 529 L591 548 L591 574 L578 589 L573 611 L558 593 L534 583 L511 585 L492 569 L468 557 L453 536 L433 519 L408 516 Z"/><text x="490" y="641" className={styles.markLabel}>Possible nest</text></g>}</g>}</svg> : <div className={styles.awaitingPhoto}><Camera/><strong>Photo not yet available</strong><span>{initialScene === "offline" ? "Upload pending · Device is offline" : "Awaiting capture and upload"}</span></div>}{photoAvailable && <span className={styles.photoFlag}>{selectedPhoto === "detail" ? "Additional evidence · Unreviewed" : pendingAnalysis ? "Awaiting analysis" : "AI suggestion · Unverified"}</span>}</div>
          {selectedPhoto === "wide" && !pendingAnalysis && photoAvailable && <div className={styles.markingOptions}><span>Markings</span><label><input type="checkbox" checked={birdMark} disabled={!markings} onChange={e=>setBirdMark(e.target.checked)}/>Bird</label><label><input type="checkbox" checked={nestMark} disabled={!markings} onChange={e=>setNestMark(e.target.checked)}/>Possible nest</label></div>}
          <details className={styles.evidenceDetails}><summary>Capture details & crew note</summary><div className={styles.photoMeta}><span>IKEphoto · Crew capture</span><span>{photoAvailable ? "Captured 09:41 · Received 09:43" : "Not received"}</span></div><p>{pendingAnalysis ? "No crew observation received." : "Crew: Bird near the crossarm. Flagged for office review."}</p></details>
        </div><aside className={styles.details}>
          <div className={styles.analysis}><div className={styles.sectionHeading}><span className={styles.eyebrow}>AI ANALYSIS</span><Badge variant="secondary">Unverified</Badge></div><h2>{pendingAnalysis ? "Awaiting analysis" : "Possible IKEstrel"}</h2><p>{pendingAnalysis ? "No identification available yet" : "Possible nesting"}</p><details className={styles.analysisNote}><summary>About this suggestion</summary><p>AI suggestions need human review. A bird near a nest does not establish which species owns it.</p><div className={styles.analysisTime}><Check/>{pendingAnalysis ? (photoAvailable ? "Photo received · Analysis pending" : "Awaiting photo upload") : "Analysis complete · 09:44"}</div></details></div>
          <form className={styles.inlineAssessment} onSubmit={event=>{event.preventDefault();saveAssessment();}}><div className={styles.sectionHeading}><span className={styles.eyebrow}>YOUR ASSESSMENT</span><Badge variant="outline">{assessmentDirty ? "Unsaved changes" : reviewed ? "Recorded" : "Review needed"}</Badge></div><Field><FieldLabel htmlFor="bird-presence">Bird visibility</FieldLabel><Select value={draftBirdPresence} onValueChange={setDraftBirdPresence}><SelectTrigger id="bird-presence"><SelectValue/></SelectTrigger><SelectContent><SelectGroup>{["Not yet reviewed","Visible","Not visible","Uncertain"].map(v=><SelectItem value={v} key={v}>{v}</SelectItem>)}</SelectGroup></SelectContent></Select></Field><Field><FieldLabel htmlFor="species-assessment">Species assessment</FieldLabel><Select value={draftAssessment} onValueChange={setDraftAssessment}><SelectTrigger id="species-assessment"><SelectValue/></SelectTrigger><SelectContent><SelectGroup>{["Not yet verified","IKEstrel","Other bird: AI suggestion rejected","Unknown"].map(v => <SelectItem value={v} key={v}>{v}</SelectItem>)}</SelectGroup></SelectContent></Select></Field><Field><FieldLabel htmlFor="nest-assessment">Nesting assessment</FieldLabel><Select value={draftNesting} onValueChange={setDraftNesting}><SelectTrigger id="nest-assessment"><SelectValue/></SelectTrigger><SelectContent><SelectGroup>{["Uncertain: more evidence needed","Nesting observed","No nesting observed"].map(v => <SelectItem value={v} key={v}>{v}</SelectItem>)}</SelectGroup></SelectContent></Select></Field><Field><FieldLabel htmlFor="assessment-reason">Evidence / reason</FieldLabel><Textarea id="assessment-reason" rows={2} value={assessmentReason} onChange={event=>{setAssessmentReason(event.target.value);setAssessmentError("");}} placeholder="What supports your assessment?"/></Field>{assessmentError && <p className={styles.error} role="alert">{assessmentError}</p>}<div className={styles.assessmentSave}><small>Work status stays unchanged.</small><Button type="submit" size="sm" disabled={!photoAvailable}>Save assessment</Button></div></form>
          <IdentificationHelp/>
          <div className={styles.delivery}><span className={styles.eyebrow}>WORK DECISION DELIVERY</span><p><Send/>{delivery.replace(" · Demo event", "")}</p><small>Alex Morgan owns the decision.</small></div>
        </aside></div>
        <details className={styles.history}><summary><Clock3/>Record history <span>{history.length} events</span></summary><ol>{history.map((item,index) => <li key={`${index}-${item}`}>{item.replace(" · Demonstration", "").replace(" · Simulated receipt", "")}</li>)}</ol></details>
      </div></DialogContent></Dialog>
    <div className={styles.externalDemo}>{delivery === "Sent · Awaiting crew receipt" && <Button variant="outline" className={styles.receiptDemo} onClick={() => { setDelivery("Received by crew · Demo event"); setFeedback("Crew received the latest instruction. Receipt recorded in history."); setHistory(h => ["Crew received latest instruction · Simulated receipt", ...h]); onInstruction?.(confirmedStoppage ? "stopped" : instruction, latestReason); }}>Simulate work decision receipt</Button>}</div>
    <Dialog open={dialog !== null} onOpenChange={open => { if(!open) setDialog(null); }}><DialogContent className={styles.dialog} onCloseAutoFocus={event=>{if(reviewOpen){event.preventDefault();actionEntryRef.current?.focus();}}}><DialogHeader><DialogTitle>{dialog === "export" ? "Export one compliance record" : dialog === "request" ? "Request evidence · Keep hold" : dialog === "continue" ? "Release hold on Pole 024" : dialog === "confirm" ? "Confirm work stoppage" : "Keep hold on Pole 024"}</DialogTitle><DialogDescription>{dialog === "export" ? "WO-1084 · Pole 024. CSV includes evidence context, assessment, instruction and owner. External filing remains outstanding." : dialog === "request" ? "Describe the missing view. Collect from an appropriate existing observation position without approaching or disturbing the bird." : "Your reason and name will be recorded. The instruction will be sent to the crew; receipt is tracked separately."}</DialogDescription></DialogHeader>

      {dialog === "hold" && <label className={styles.requestChoice}><input type="checkbox" checked={requestEvidence} onChange={event=>setRequestEvidence(event.target.checked)}/>Request additional photos</label>}
      {dialog !== "export" && <Field data-invalid={!!error}><FieldLabel htmlFor="decision-reason">{dialog === "request" || (dialog === "hold" && requestEvidence) ? "Photos needed · Message to crew" : "Decision reason · Message to crew"}</FieldLabel><Textarea id="decision-reason" value={reason} onChange={e => {setReason(e.target.value);setError("");}} placeholder={dialog === "request" ? "Describe the detail needed to assess nesting…" : "What evidence supports your decision?"} aria-invalid={!!error}/>{error && <p role="alert" className={styles.error}>{error}</p>}</Field>}
      <DialogFooter><Button variant="outline" onClick={() => setDialog(null)}>Cancel</Button><Button onClick={dialog === "export" ? exportCsv : submit}>{dialog === "export" ? "Download CSV" : dialog === "request" ? "Send request · Keep hold" : dialog === "continue" ? "Release hold & send" : dialog === "confirm" ? "Confirm stoppage & send" : requestEvidence ? "Request photos & keep hold" : "Keep hold & send"}</Button></DialogFooter>
    </DialogContent></Dialog>
  </section>;
}
