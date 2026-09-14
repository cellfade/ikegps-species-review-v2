import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Camera, ClipboardCheck, ImageIcon, MoveUpRight, Search } from "lucide-react";
import styles from "./landing-page.module.css";

// Editorial IKE direction: variance 6, motion 2, density 4.
// Image slots deliberately remain explicit until product UI is visually verified.
function ImageSlot({ title, description, kind = "wide" }: { title: string; description: string; kind?: "wide" | "device" | "office" }) {
  return <figure className={`${styles.imageSlot} ${styles[kind]}`}>
    <div className={styles.slotCenter}><ImageIcon size={26} strokeWidth={1.5} aria-hidden="true" /><strong>{title}</strong><span>{description}</span></div>
    <figcaption>Product image placeholder · Verified UI to follow</figcaption>
  </figure>;
}

export function LandingPage() {
  return <div className={styles.page}>
    <a href="#main-content" className={styles.skip}>Skip to content</a>
    <header className={styles.header}>
      <a href="#overview" className={styles.brand} aria-label="ikeGPS design concept, overview">ike<span>GPS</span></a>
      <span className={styles.projectName}>Endangered species identification</span>
      <nav aria-label="Presentation"><a href="#decisions">Approach</a><a href="#journey">Journey</a><a href="#next">What’s next <ArrowRight size={14} aria-hidden="true" /></a></nav>
    </header>
    <main id="main-content">
      <section className={styles.hero} id="overview" aria-labelledby="hero-heading">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>An ikeGPS design exercise · Andrew Miller</p>
          <h1 id="hero-heading">Less waiting.<br /><span>Clearer decisions.</span></h1>
          <p className={styles.lede}>Bring potential nesting concerns to the right reviewer. Get a clear work instruction back to the crew.</p>
          <a className={styles.textLink} href="#journey">Follow the finding <ArrowRight size={18} aria-hidden="true" /></a>
        </div>
        <ImageSlot title="From field capture to office review" description="IKE device beside the shared pole review in Office Pro." />
        <div className={styles.problem}>
          <p>Photos arrive.<br /><strong>Decisions can take hours.</strong></p>
          <div><p>The opportunity is to reduce avoidable work-stoppage time between finding a concern, verifying the evidence, and returning an instruction.</p><span>A design goal to test, not a measured result.</span></div>
        </div>
      </section>

      <section className={styles.section} id="decisions" aria-labelledby="decisions-heading">
        <div className={styles.sectionIntro}><h2 id="decisions-heading">Make the next<br />decision clear.</h2><p>Three anchors shape the experience, from a small device screen to a deeper office assessment.</p></div>
        <div className={styles.principles}>
          <article><span className={styles.principleLabel}>Uncertainty & reversibility</span><h3>AI suggests.<br /> People verify.</h3><p>Keep the original suggestion visible. Let the reviewer correct it, reject it, or leave identity unresolved.</p></article>
          <article><span className={styles.principleLabel}>Ownership & verifiability</span><h3>A decision with<br /> someone behind it.</h3><p>A named supervisor records the work instruction, reason, and next action against the pole’s evidence.</p></article>
          <article><span className={styles.principleLabel}>Simplicity & latency</span><h3>The right detail.<br /> In the right place.</h3><p>One clear next action in the field. Richer identification in the office. Pending analysis never reads as clearance.</p></article>
        </div>
        <aside className={styles.assumption}><span>Working assumption</span><p><strong>Hold this pole. Keep the wider job moving.</strong> The crew may work on subsequent poles while this concern awaits review. Work-order dependencies could change that assumption.</p></aside>
      </section>

      <section className={`${styles.section} ${styles.journey}`} id="journey" aria-labelledby="journey-heading">
        <div className={styles.sectionIntro}><h2 id="journey-heading">One finding.<br />A connected review.</h2><p>Depth at the moments that matter. Selected touchpoints show the journey without recreating every screen in between.</p></div>
        <div className={styles.touchpoints}>
          <article className={styles.fieldTouchpoint}>
            <div className={styles.touchpointHeading}><Camera size={21} strokeWidth={1.5} aria-hidden="true" /><span>In the field</span></div>
            <h3>Capture and flag.</h3><p>Use the photos crews already collect. Surface a possible species, an existing concern, or a request for more evidence.</p>
            <ImageSlot kind="device" title="IKE capture touchpoint" description="A minimal concern strip and the crew’s next action." />
          </article>
          <article className={styles.officeTouchpoint}>
            <div className={styles.touchpointHeading}><Search size={21} strokeWidth={1.5} aria-hidden="true" /><span>In Office Pro</span></div>
            <h3>Notify. Verify. Decide.</h3><p>Open the pole’s evidence from a notification, work order, or compliance record. Correct the assessment and record hold or continue.</p>
            <ImageSlot kind="office" title="Shared pole review" description="Evidence and AI suggestions, with the work decision at the top." />
          </article>
        </div>
        <div className={styles.flow} aria-label="Example pole state flow">
          <div><span>Evidence captured</span><small>Upload or analysis may be pending</small></div><ArrowRight size={20} aria-hidden="true" />
          <div><span>Concern under review</span><small>Flagged pole stays on hold</small></div><ArrowRight size={20} aria-hidden="true" />
          <div><span>Instruction received</span><small>Maintain hold or authorize continuation</small></div>
        </div>
        <div className={styles.loop}><span>When evidence is incomplete</span><p>Request photos <ArrowRight size={14} aria-hidden="true" /> Add evidence <ArrowRight size={14} aria-hidden="true" /> Review again.</p><strong>The hold remains.</strong></div>
        <p className={styles.timing}>Analysis may happen at capture, if supported, or after upload. Office review can happen hours later; sent and received remain distinct.</p>
        <article className={styles.conservation}>
          <div><ClipboardCheck size={23} strokeWidth={1.5} aria-hidden="true" /><h3>Record once.<br />Make the evidence useful.</h3><p>The compliance table gathers flagged poles and opens the same review. Selected, approved observations form the proposed Audubon handoff.</p><span>Export prepares evidence; it does not complete reporting.</span></div>
          <ImageSlot title="Compliance and conservation output" description="Flagged records and a preview of the selected observation export." />
        </article>
      </section>

      <section className={`${styles.section} ${styles.next}`} id="next" aria-labelledby="next-heading">
        <div className={styles.sectionIntro}><h2 id="next-heading">Test the handoffs.<br />Then go earlier.</h2><p>The concept makes its assumptions visible so the next conversation can challenge them.</p></div>
        <div className={styles.research}>
          <div><h3>What we need to learn</h3><ul><li>Do crews understand pending analysis and pole-specific instructions?</li><li>Do notifications help supervisors reach a verified decision sooner?</li><li>Can crews obtain additional photos through the existing capture workflow?</li><li>Who approves Audubon sharing, and what data is useful?</li></ul></div>
          <aside><span>Future opportunity</span><h3>Review before dispatch.</h3><p>Explore existing corridor photos during work-order planning, using the same review interface. Image quality and age need validation.</p><p className={styles.small}>Historical evidence is context, not current clearance.</p></aside>
        </div>
        <details className={styles.supporting}><summary>Research approach and supporting artifacts</summary><p>Test the field instructions with crews, walk through uncertain findings with supervisors, and validate reporting needs with conservation partners. Measure time to review, decision, and instruction receipt against a baseline.</p><p><a href="https://www.figma.com/board/qdbKTuDN054FcmO2aOxauJ/IKE-V2-Concern-record-journey?node-id=3-85" target="_blank" rel="noreferrer">Service blueprint</a> · <a href="https://www.nngroup.com/articles/ten-usability-heuristics/" target="_blank" rel="noreferrer">NN/g usability heuristics</a> · <a href="https://baymard.com/blog/trigger-indicators" target="_blank" rel="noreferrer">Baymard: clear interaction cues</a></p><p>These sources inform the design. The proposed workflow still needs validation.</p></details><div className={styles.landscapeClose}>
          <Image className={styles.landscapeImage} src="/assets/v1-closing-corridor-illustrative.png" alt="Illustrative mountain utility corridor with a bird and nest on a pole, reused from the original design concept" fill sizes="100vw" />
          <div className={styles.landscapeShade} />
          <div className={styles.closeContent}>
            <div className={styles.handoff}><div><h3>A clearer call.<br />A crew that knows what’s next.</h3><p>Explore the field finding, office review, and instruction back to the crew.</p></div><Link className={styles.primaryLink} href="/prototype">Explore the prototype <MoveUpRight size={18} aria-hidden="true" /></Link></div>
            <footer className={styles.footer}><a href="#overview" className={styles.footerBrand}>ikeGPS</a><span>Andrew Miller · Product design<br />Independent design exercise · Illustrative landscape</span><span>Proposed workflows.<br />Simulated AI.</span></footer>
          </div>
        </div>
      </section>
    </main>
  </div>;
}
