"use client";

import { Aperture, ArrowRight, BatteryFull, Check, Circle, Crosshair, Eye, ImageIcon, MapPin, Minus, Plus, Settings, Square, Triangle, Wifi, WifiOff, AlertTriangle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "./device-view.module.css";

type DeviceScene = "capture" | "analysis" | "finding" | "hold" | "request" | "sent" | "stopped" | "continue" | "offline";
export type DeviceViewProps = {
  scene: DeviceScene;
  onCapture: () => void;
  onFlag: () => void;
  onAddPhoto: () => void;
  onNextPole: () => void;
  onUnable: () => void;
  poleNumber?: string;
  photoCount?: number;
  feedback?: string;
};

export function DeviceView({ scene, onCapture, onFlag, onAddPhoto, onNextPole, onUnable, poleNumber = "024", photoCount = 1, feedback }: DeviceViewProps) {
  const nextPole = poleNumber !== "024";
  const camera = !nextPole && (scene === "capture" || scene === "finding");
  const title = scene === "analysis" ? "Wait before work on this pole" : scene === "stopped" ? "Work stoppage confirmed" : scene === "continue" ? "Hold released" : scene === "offline" ? "Saved on device" : scene === "request" ? "More evidence needed" : scene === "sent" ? "Photos sent to office" : "Review needed · On hold";
  return <section className={styles.device} aria-label={`IKE device, pole ${poleNumber}`}>
    <div className={styles.status} aria-hidden="true"><span><Crosshair/><Plus/><Eye/></span><span>{scene === "offline" ? <WifiOff/> : <Wifi/>}<MapPin/><BatteryFull/><b>12:15</b></span></div>
    {nextPole ? <div className={styles.form}><header className={styles.formHeader}><div><span>Pole {poleNumber}</span><small>WO-1084 · Cedar Ridge</small></div></header><div className={styles.concern}><h3>Next pole reached</h3><p>The walkthrough continues with Pole 024 in office review.</p><small>Pole 024 keeps its latest work instruction. Capture at the next pole is outside this demonstration.</small></div></div> : camera ? <div className={styles.camera}>
      {/* This is seeded demonstration imagery; no live camera or sensor readings. */}
      <svg className={styles.photo} viewBox="0 0 1024 1536" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Demonstration photo of a bird and possible nest on a utility pole; outlines are illustrative"><image href="/assets/pole-nest.png" width="1024" height="1536"/>{scene === "finding" && <g className={styles.detectionOutline}><path d="M397 494 L417 468 L429 451 L437 437 L450 426 L461 419 L475 417 L484 423 L487 430 L479 433 L476 447 L467 461 L457 473 L438 481 L425 487 L416 496 Z"/><path d="M379 493 L398 479 L429 461 L452 456 L482 454 L502 440 L520 447 L537 457 L563 450 L587 458 L596 479 L590 506 L604 529 L591 548 L591 574 L578 589 L573 611 L558 593 L534 583 L511 585 L492 569 L468 557 L453 536 L433 519 L408 516 Z"/></g>}</svg>
      <div className={styles.cameraContext}>Pole {poleNumber}<small>IKEphoto · Capture preview</small></div>
      <div className={styles.guides} aria-hidden="true"/><div className={styles.reticle} aria-hidden="true"/>
      <div className={styles.adjustment} aria-hidden="true"><Plus/><span/><Minus/></div>
      {scene === "finding" && <div className={styles.finding} role="status"><div><AlertTriangle size={18}/><strong>Possible IKEstrel</strong></div><p>Possible nesting · Not yet reviewed</p>{feedback && <small className={styles.feedback} role="status">{feedback}</small>}<Button onClick={onFlag} className={styles.primary}>Flag for office <ArrowRight size={16}/></Button></div>}
      <div className={styles.captureControls}><div className={styles.cameraSettings} aria-hidden="true"><Settings/><span><i/></span><Settings/></div><button className={styles.shutter} aria-label={scene === "finding" ? "Add photo" : "Capture photo"} onClick={scene === "finding" ? onAddPhoto : onCapture}><Aperture size={28}/></button></div>
    </div> : <div className={styles.form}>
      <header className={styles.formHeader}><div><span>Pole {poleNumber}</span><small>WO-1084 · Cedar Ridge</small></div></header>
      <div className={styles.location}><MapPin size={17}/><strong>Location</strong><span>Recorded with photo</span></div>
      <div className={styles.concern}>
        <div className={`${styles.concernTitle} ${scene === "continue" ? styles.released : ""}`}>{scene === "continue" ? <Check size={19}/> : scene === "request" ? <MessageSquare size={19}/> : scene === "offline" ? <WifiOff size={19}/> : <AlertTriangle size={19}/>}<h3>{title}</h3></div>
        {scene === "analysis" ? <><p>Photo uploaded. Species analysis is pending.</p><small className={styles.byline}>You can work on other poles.</small></> : scene === "request" ? <><p>Keep work on hold. {feedback?.startsWith('Supervisor instruction received:') ? feedback.replace('Supervisor instruction received: ', '') : 'Add a wider photo of the pole and another view of the nest.'}</p><small className={styles.byline}>Requested by office reviewer</small></> : scene === "continue" ? <p>The supervisor authorized work on this pole. The decision is recorded.</p> : scene === "stopped" ? <p>The supervisor confirmed the work stoppage. Do not work on this pole.</p> : scene === "offline" ? <p>This pole stays on hold. The flag will send when connected.</p> : scene === "sent" ? <p>This pole stays on hold while the office reviews the new evidence.</p> : <p>Flag delivered. Awaiting office review. You can work on other poles.</p>}
        <Button className={styles.primary} onClick={scene === "request" ? onAddPhoto : onNextPole}>{scene === "request" ? "Take photos" : "Continue to next pole"}{scene === "request" ? <Aperture size={17}/> : <ArrowRight size={17}/>}</Button>
        {scene === "request" && <button className={styles.textAction} onClick={onUnable}>Unable to collect these photos</button>}
      </div>
      {/* Proposed extra-evidence action; the parent simulates capture without changing work status. */}
      <div className={styles.recordRow}><ImageIcon size={19}/><strong>IKEphoto</strong><span>{photoCount}</span><button className={styles.addPhoto} onClick={onAddPhoto} aria-label="Add photo to this pole"><Plus size={17}/><span>Add photo</span></button></div>
      {feedback && <div className={styles.feedback} role="status">{feedback}</div>}
      <div className={styles.evidence}><div className={styles.thumbnail} role="img" aria-label="Captured pole evidence"/><div><strong>{scene === "analysis" ? "Photo received" : "Possible IKEstrel"}</strong><p>{scene === "analysis" ? "Analysis pending" : "Possible nesting"}</p><small>{scene === "offline" ? "Pending upload" : "Evidence attached to this pole"}</small></div></div>
      <div className={styles.recordRow}><MessageSquare size={19}/><strong>Review</strong><span>{scene === "analysis" ? "Awaiting analysis" : scene === "continue" || scene === "stopped" ? "Recorded" : "Review needed"}</span></div>
    </div>}
    <div className={styles.android} aria-hidden="true"><Triangle/><Circle/><Square/></div>
  </section>;
}
