"use client";

import { useState } from "react";
import Image from "next/image";
import { Bell, ChevronRight, Download, Camera, Clock3, Check, ShieldCheck, Send, Pause, ArrowUpRight, ListChecks, FolderOpen, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import styles from "./office-view.module.css";

type Instruction = "hold" | "continue" | "request";
type Props = { photoCount?: number; onInstruction?: (instruction: Instruction, reason: string) => void };
export function OfficeView({ onInstruction, photoCount = 1 }: Props) {
  const [view, setView] = useState<"review" | "compliance">("review");
  const [notification, setNotification] = useState(true);
  const [instruction, setInstruction] = useState<Instruction>("hold");
  const [assessment, setAssessment] = useState("Not yet verified");
  const [draftAssessment, setDraftAssessment] = useState("Not yet verified");
  const [draftNesting, setDraftNesting] = useState("Uncertain — more evidence needed");
  const [latestReason, setLatestReason] = useState("");
  const [nesting, setNesting] = useState("Uncertain — more evidence needed");
  const [dialog, setDialog] = useState<Instruction | "assessment" | "export" | null>(null);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [delivery, setDelivery] = useState("No new instruction sent");
  const [history, setHistory] = useState(["09:44 · AI analysis completed · Review needed", "09:43 · Photo received · Captured at 09:41", "09:41 · Crew flagged pole · Work held"]);
  const [selected, setSelected] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [zoom, setZoom] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const openReview = () => { setView("review"); setNotification(false); };
  const begin = (action: Instruction | "assessment") => { setNotification(false); setDraftAssessment(assessment); setDraftNesting(nesting); setDialog(action); setReason(""); setError(""); };
  const submit = () => {
    if (!reason.trim()) { setError("Add a reason to keep this decision verifiable."); return; }
    if (dialog === "assessment") {
      if (draftAssessment === "Not yet verified") { setError("Choose an assessment, including Unknown when identification is uncertain."); return; }
      setAssessment(draftAssessment); setNesting(draftNesting);
      setHistory(h => [`Review updated by Alex Morgan · ${draftAssessment}; ${draftNesting} · ${reason}`, ...h]);
      setReviewed(true); setFeedback("Assessment saved. Work instruction is unchanged.");
    } else if (dialog === "hold" || dialog === "continue" || dialog === "request") {
      if (dialog === "continue" && (assessment === "Not yet verified" || nesting !== "No nesting observed")) { setError("Review the evidence and record a no-nesting assessment before authorizing continuation."); return; }
      setInstruction(dialog); setDelivery("Sent · Awaiting crew receipt");
      const label = dialog === "continue" ? "Continue work authorized" : dialog === "request" ? "More photos requested · Hold maintained" : "Hold maintained";
      setHistory(h => [`${label} by Alex Morgan · ${reason}`, ...h]);
      setFeedback(`${label}. Instruction sent; receipt pending.`); setLatestReason(reason.trim());
    }
    setDialog(null);
  };
  const exportCsv = () => {
    const rows = [["Work order","Pole","AI suggestion","Reviewed species","Nesting assessment","Work instruction","Owner","Photo count","Captured","Instruction delivery","External procedure"],["WO-1084","024","Possible IKEstrel",assessment,nesting,instruction === "continue" ? "Continue authorized" : "On hold","Alex Morgan",String(photoCount),"2026-09-14 09:41",delivery,"Not recorded as complete"]];
    const csv = rows.map(row => row.map(cell => `"${cell.replaceAll('"','""')}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8;"})); const link = document.createElement("a"); link.href=url; link.download="cedar-ridge-compliance-024.csv"; link.click(); URL.revokeObjectURL(url);
    setDialog(null); setFeedback("One compliance record exported. External procedure remains outstanding.");
  };
  return <section className={styles.office} aria-label="IKE Office Pro review prototype">
    <header className={styles.header}><strong>ike<span>OFFICE PRO</span></strong><span className={styles.organization}>Cedar Ridge Utility</span><span className={styles.person}>AM</span></header>
    <nav className={styles.navigation} aria-label="Office sections"><Button variant="ghost" aria-pressed={view === "review"} onClick={() => setView("review")}><FolderOpen data-icon="inline-start"/>Work orders</Button><Button variant="ghost" aria-pressed={view === "compliance"} onClick={() => setView("compliance")}><ListChecks data-icon="inline-start"/>Compliance</Button><span>Alex Morgan · Supervisor</span></nav>
    {notification && <button className={styles.notification} onClick={openReview}><Bell/><span><strong>Possible nesting needs your review</strong><small>WO-1084 · Pole 024 · Analysis complete at 09:44 · Work on hold</small></span><span className={styles.notificationAction}>Review finding <ArrowUpRight/></span></button>}
    {feedback && <div className={styles.feedback} role="status">{feedback}</div>}
    {view === "compliance" ? <main className={styles.compliance}>
      <div className={styles.tableHeading}><div><p className={styles.eyebrow}>COMPLIANCE RECORDS</p><h1>Every concern. One record.</h1><p>Evidence, review and work instructions across your work orders.</p></div><Button disabled={!selected} onClick={() => setDialog("export")}><Download data-icon="inline-start"/>Export selected (1)</Button></div>
      <div className={styles.tableGroup}><FolderOpen/> Cedar Ridge <span>WO-1084 · 1 concern</span></div>
      <Table><TableHeader><TableRow><TableHead>Select</TableHead><TableHead>Pole</TableHead><TableHead>Evidence</TableHead><TableHead>Assessment</TableHead><TableHead>Work instruction</TableHead><TableHead>Review owner</TableHead><TableHead>Next step</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell><input type="checkbox" aria-label="Select pole 024 record" checked={selected} onChange={e => setSelected(e.target.checked)}/></TableCell><TableCell><Button variant="link" onClick={openReview}>Pole 024 <ArrowUpRight data-icon="inline-end"/></Button></TableCell><TableCell>{photoCount} photo{photoCount === 1 ? "" : "s"} · 09:41</TableCell><TableCell>{assessment === "Not yet verified" ? "Possible IKEstrel" : assessment}<small className={styles.cellDetail}>{reviewed ? "Assessment recorded" : "Review needed"}</small></TableCell><TableCell><Badge variant="outline">{instruction === "continue" ? "Continue authorized" : "On hold"}</Badge></TableCell><TableCell>Alex Morgan</TableCell><TableCell>{instruction === "request" ? "Collect evidence" : instruction === "continue" ? (delivery.startsWith("Received") ? "Receipt confirmed" : "Confirm crew receipt") : "Review / external procedure"}</TableCell></TableRow></TableBody></Table>
      <p className={styles.exportNote}>Export prepares a record. It does not file a report or complete an external procedure.</p>
    </main> : <div className={styles.workspace}>
      <aside className={styles.sidebar}><p className={styles.eyebrow}>WORK ORDER</p><h2>Cedar Ridge</h2><p className={styles.muted}>WO-1084</p><div className={styles.listLabel}>POLES <span>3 in this demo</span></div><div className={styles.staticPole}><span>023</span><small>Capture complete</small></div><button className={styles.activePole} onClick={openReview}><span>024 <ChevronRight/></span><small>{instruction === "continue" ? "Continue authorized" : "On hold · Review concern"}</small></button><div className={styles.staticPole}><span>025</span><small>Crew continuing here</small></div><div className={styles.sidebarNote}><ShieldCheck/><p>This concern belongs to Pole 024. Other poles remain available to the crew.</p></div></aside>
      <main className={styles.review}>
        <div className={styles.poleHeading}><div><p className={styles.eyebrow}>CEDAR RIDGE / WO-1084</p><h1>Pole 024</h1></div><Badge variant="outline" className={instruction === "continue" ? styles.clearBadge : styles.holdBadge}>{instruction === "continue" ? "Continue authorized" : "Work on hold"}</Badge></div>
        <div className={styles.instructionBar}><div><strong>{instruction === "request" ? "More evidence requested" : instruction === "continue" ? "Supervisor authorized continuation" : "Awaiting a verified work decision"}</strong><small>{instruction === "continue" ? "Authorization recorded by Alex Morgan" : "Keep this pole on hold while the concern is reviewed."}</small></div><div className={styles.actions}><Button variant="outline" onClick={() => begin("hold")}><Pause data-icon="inline-start"/>Maintain hold</Button><Button onClick={() => begin("continue")}>Continue work <ChevronRight data-icon="inline-end"/></Button></div></div>
        <div className={styles.evidenceGrid}><div className={styles.evidence}>
          <div className={styles.photoHeader}><span><Camera/> Evidence · {photoCount} photo{photoCount === 1 ? "" : "s"}</span><Button size="icon-sm" variant="ghost" aria-label={zoom ? "Show full photo" : "Enlarge photo"} onClick={() => setZoom(!zoom)}><ZoomIn/></Button></div>
          <div className={`${styles.photo} ${zoom ? styles.zoomed : ""}`}><Image src="/assets/pole-nest.png" alt="Illustrative pole photograph showing a bird and possible nesting material near the crossarm" fill sizes="(max-width: 900px) 90vw, 48vw" priority/><span className={styles.photoFlag}>AI finding · Unverified</span></div>
          <div className={styles.photoMeta}><span>IKEphoto · Crew capture</span><span>Captured 09:41 · Received 09:43</span></div>
          <div className={styles.crewNote}><span className={styles.eyebrow}>CREW OBSERVATION</span><p>“Bird near the crossarm. Flagged for office review.”</p></div>
        </div><aside className={styles.details}>
          <div className={styles.analysis}><div className={styles.sectionHeading}><span className={styles.eyebrow}>AI ANALYSIS</span><Badge variant="secondary">Unverified</Badge></div><h2>Possible IKEstrel</h2><p>Possible nesting</p><small>Identification is tentative. Review the visible evidence before making a work decision.</small><div className={styles.analysisTime}><Check/>Analysis complete · 09:44</div></div>
          <div className={styles.assessment}><div className={styles.sectionHeading}><span className={styles.eyebrow}>YOUR ASSESSMENT</span><Button variant="link" onClick={() => begin("assessment")}>{reviewed ? "Revise" : "Review"}</Button></div><strong>{assessment}</strong><p>{reviewed ? nesting : "Confirm, correct or leave the identification unknown."}</p><Button variant="outline" onClick={() => begin("request")}><Camera data-icon="inline-start"/>Request more photos</Button></div>
          <div className={styles.delivery}><span className={styles.eyebrow}>INSTRUCTION TO CREW</span><p><Send/>{delivery}</p><small>Alex Morgan owns the decision.</small>{delivery === "Sent · Awaiting crew receipt" && <Button variant="outline" className={styles.receiptDemo} onClick={() => { setDelivery("Received by crew · Demo event"); setFeedback("Crew received the latest instruction. Receipt recorded in history."); setHistory(h => ["Crew received latest instruction · Simulated receipt", ...h]); onInstruction?.(instruction, latestReason); }}>Simulate crew receipt</Button>}</div>
        </aside></div>
        <details className={styles.history}><summary><Clock3/>Record history <span>{history.length} events</span></summary><ol>{history.map((item,index) => <li key={`${index}-${item}`}>{item}</li>)}</ol></details>
      </main>
    </div>}
    <footer className={styles.footer}>Proposed IKE Office Pro extension · Illustrative evidence · Local demonstration</footer>
    <Dialog open={dialog !== null} onOpenChange={open => { if(!open) setDialog(null); }}><DialogContent className={styles.dialog}><DialogHeader><DialogTitle>{dialog === "assessment" ? "Record your assessment" : dialog === "export" ? "Export one compliance record" : dialog === "request" ? "Request evidence · Keep hold" : dialog === "continue" ? "Authorize work on Pole 024" : "Maintain hold on Pole 024"}</DialogTitle><DialogDescription>{dialog === "export" ? "WO-1084 · Pole 024. CSV includes evidence context, assessment, instruction and owner. External filing remains outstanding." : dialog === "assessment" ? "The original AI suggestion stays in the record. Changing this assessment does not change the work instruction." : dialog === "request" ? "Describe the missing view. Collect from an appropriate existing observation position without approaching or disturbing the bird." : "Your reason and name will be recorded. The instruction will be sent to the crew; receipt is tracked separately."}</DialogDescription></DialogHeader>
      {dialog === "assessment" && <><Field><FieldLabel htmlFor="species-assessment">Species assessment</FieldLabel><Select value={draftAssessment} onValueChange={setDraftAssessment}><SelectTrigger id="species-assessment"><SelectValue/></SelectTrigger><SelectContent><SelectGroup>{["Not yet verified","IKEstrel","Other bird — AI suggestion rejected","Unknown","No bird observed"].map(v => <SelectItem value={v} key={v}>{v}</SelectItem>)}</SelectGroup></SelectContent></Select></Field><Field><FieldLabel htmlFor="nest-assessment">Nesting assessment</FieldLabel><Select value={draftNesting} onValueChange={setDraftNesting}><SelectTrigger id="nest-assessment"><SelectValue/></SelectTrigger><SelectContent><SelectGroup>{["Uncertain — more evidence needed","Nesting observed","No nesting observed"].map(v => <SelectItem value={v} key={v}>{v}</SelectItem>)}</SelectGroup></SelectContent></Select></Field></>}
      {dialog !== "export" && <Field data-invalid={!!error}><FieldLabel htmlFor="decision-reason">{dialog === "request" ? "Photos needed" : "Reason / evidence"}</FieldLabel><Textarea id="decision-reason" value={reason} onChange={e => {setReason(e.target.value);setError("");}} placeholder={dialog === "request" ? "Describe the detail needed to assess nesting…" : "What evidence supports your decision?"} aria-invalid={!!error}/>{error && <p role="alert" className={styles.error}>{error}</p>}</Field>}
      <DialogFooter><Button variant="outline" onClick={() => setDialog(null)}>Cancel</Button><Button onClick={dialog === "export" ? exportCsv : submit}>{dialog === "export" ? "Download CSV" : dialog === "assessment" ? "Save assessment" : dialog === "request" ? "Send request · Keep hold" : dialog === "continue" ? "Authorize & send" : "Record hold & send"}</Button></DialogFooter>
    </DialogContent></Dialog>
  </section>;
}
