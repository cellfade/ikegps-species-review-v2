import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MoveUpRight } from "lucide-react";
import styles from "./landing-page.module.css";

// Original screenshots stay proportional and unwarped over generated environments.
function ProductScene({ variant }: { variant: 'hero' | 'field' | 'office' | 'compliance' }) {
  const environment = variant === 'field' ? 'dimensional' : variant === 'compliance' ? 'editorial' : 'mineral';
  const source = variant === 'field' ? 'device' : variant === 'compliance' ? 'compliance' : variant === 'office' ? 'office-modal' : 'office';
  const label = variant === 'hero' ? 'Field capture and shared office review' : variant === 'field' ? 'IKE field capture with a possible nesting concern' : variant === 'office' ? 'Office pole review with evidence and work decisions' : 'Compliance record for the flagged pole';
  return <figure className={`${styles.productScene} ${styles[`scene${variant}`]}`}>
    <Image src={`/assets/${environment}-environment.png`} alt="" fill sizes="(max-width: 767px) 100vw, 1140px" className={styles.environment} priority={variant==='hero'} />
    <a className={styles.uiPlane} href={`/assets/${source}-verified.png`} target="_blank" rel="noreferrer" aria-label={`Enlarge ${label.toLowerCase()}`}><Image src={`/assets/${source}-verified.png`} alt={label} width={source==='device'?358:source==='compliance'?1280:1289} height={source==='device'?636:source==='compliance'?1040:1226} sizes={variant==='hero'?'(max-width: 767px) 90vw, 820px':'(max-width: 767px) 90vw, 700px'} unoptimized priority={variant==='hero'} /></a>
    {variant==='hero' && <a className={styles.heroDevice} href="/assets/device-verified.png" target="_blank" rel="noreferrer" aria-label="Enlarge IKE field capture"><Image src="/assets/device-verified.png" alt="IKE capture view with a flag-for-office action" width={358} height={636} sizes="(max-width: 767px) 35vw, 270px" unoptimized priority /></a>}
    <figcaption className={styles.sceneCaption}><span>Prototype UI · Illustrative evidence</span><a href={`/assets/${source}-verified.png`} target="_blank" rel="noreferrer" aria-label={`View full-size ${label.toLowerCase()}`}>View full size <MoveUpRight size={12} aria-hidden="true" /></a></figcaption>
  </figure>;
}

export function LandingPage() {
  return <div className={styles.page}>
    <a href="#main-content" className={styles.skip}>Skip to content</a>
    <header className={styles.header}>
      <a href="#overview" className={styles.brand} aria-label="ikeGPS design concept, overview">ike<span>GPS</span></a>
      <span className={styles.projectName}>Endangered species identification</span>
      <nav aria-label="Presentation"><a href="#questions">Questions</a><a href="#assumptions">Assumptions</a><a href="#decisions">Direction</a><a href="#journey">Prototype</a></nav>
    </header>
    <main id="main-content">
      <div className={styles.hero} id="overview" aria-labelledby="hero-heading">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>An ikeGPS design exercise · Andrew Miller</p>
          <h1 id="hero-heading">Less waiting.<br /><span>Clearer decisions.</span></h1>
          <div className={styles.heroAction}><p className={styles.lede}>Bring potential nesting concerns to the right reviewer. Return a clear work instruction to the crew.</p>
          <a className={styles.primaryLink} href="#journey">Explore the prototype <ArrowRight size={18} aria-hidden="true" /></a><span className={styles.heroNote}>Field capture → Office review → Crew instruction</span></div>
        </div>
        <ProductScene variant="hero" />
        <div className={styles.problem}>
          <p>Photos arrive.<br /><strong>Decisions can take hours.</strong></p>
          <div><p>The opportunity is to reduce avoidable work-stoppage time between finding a concern, verifying the evidence, and returning an instruction.</p><span>A design goal to test, not a measured result.</span></div>
        </div>
      </div>


      <section className={`${styles.section} ${styles.questions}`} id="questions" aria-labelledby="questions-heading">
        <div className={styles.sectionIntro}><div><p className={styles.chapter}>01 / Questions</p><h2 id="questions-heading">Start with<br />what we don’t know.</h2></div><p>These are the five questions from my submitted framing, with the research methods summarized below.</p></div>
          <div className={styles.questionList}><ul>
            <li><strong>Can review happen before contact with the pole?</strong><br />Observe capture-to-work timing and reviewer coverage. Move review earlier if photography is too late; test delayed review and escalation when coverage is unavailable.</li>
            <li><strong>Who owns the pause, reporting and release?</strong><br />Walk through false alarms and nesting concerns with operations and a compliance specialist. Establish reviewers, recipients, completion evidence and release authority.</li>
            <li><strong>What can crews reliably observe?</strong><br />Test representative photos with experienced and less-experienced crews. Watch for false certainty, comparison bias and whether “Can’t tell” works under pressure.</li>
            <li><strong>What survives weak connectivity or a poor image?</strong><br />Test capture quality, device analysis, delayed uploads and returned instructions. Evaluate office analysis as a fallback; distinguish synced from reviewed.</li>
            <li><strong>What can we share with Audubon?</strong><br />Review a sample package with the utility data owner and partner data steward. Agree permitted data, redaction, format and approval; direct partner review depends on permissions.</li>
          </ul></div>
      </section>
      <section className={`${styles.section} ${styles.assumptions}`} id="assumptions" aria-labelledby="assumptions-heading">
        <div className={styles.sectionIntro}><div><p className={styles.chapter}>02 / Assumptions</p><h2 id="assumptions-heading">Make the conditions<br />visible.</h2></div><p>These assumptions carry the design forward and need validation with crews, supervisors and utility data owners.</p></div>
          <div className={styles.assumptionList}>
            <div className={styles.assumptionPhoto}><Image src="/assets/v1-assumptions-corridor.png" alt="Illustrative utility corridor reused from the original design concept" fill sizes="(max-width: 767px) 100vw, 760px" /><span>Illustrative scenery · Original concept</span></div>
            <p><strong>Capture before work.</strong> Useful device analysis, local saving and later sync need validation.</p>
            <p><strong>Pause the affected pole.</strong> Unresolved nesting or inability to assess keeps it paused. Another pole must be independent and accessible.</p>
            <p><strong>Named release authority.</strong> An authorized supervisor may resolve a false alarm with a reason. IKEstrel nesting follows the applicable procedure; elapsed time never authorizes work.</p>
            <p><strong>Reversible, attributed records.</strong> Retain observations and edits alongside original AI output. Crew and admin species suggestions are not automatic ground truth.</p>
            <p><strong>Private utility data.</strong> Select records, redact sensitive details and obtain approval before export or sharing. This is an assumption, not verified IKE policy.</p>
          </div>
      </section>
        <div className={styles.anchorBand} aria-label="Three design anchors"><div><span>01 / AI</span><strong>Uncertainty, reversibility & latency</strong></div><div><span>02 / Work decision</span><strong>Ownership & verifiability</strong></div><div><span>03 / Experience</span><strong>Simplicity</strong></div></div>
      <section className={`${styles.section} ${styles.direction}`} id="decisions" aria-labelledby="decisions-heading">
        <div className={styles.sectionIntro}><div><p className={styles.chapter}>03 / Design direction</p><h2 id="decisions-heading">Simple in the field.<br />Accountable in the office.</h2></div><p>Prioritize the crew and supervisor’s shared work decision. Show who owns the decision, where the evidence is uncertain and whether the instruction has reached the crew.</p></div>

        <div className={styles.bento}>
          <article className={styles.bentoOffice}><div className={styles.bentoCopy}><span className={styles.principleLabel}>Office pole review</span><h3>Review the evidence.<br />Record the decision.</h3><p>Open a notification or photo badge to reach the same review modal. Inspect the original photo, correct the suggestion and record a work decision.</p></div><ProductScene variant="office" /></article>
          <article className={styles.bentoField}><div className={styles.bentoCopy}><span className={styles.principleLabel}>IKE field capture</span><h3>Flag a concern<br />during capture.</h3><p>Keep the species suggestion and flag action inside capture. Show the pole’s work status and any request for more photos.</p></div><ProductScene variant="field" /></article>
          <article className={styles.bentoLatency}><div className={styles.bentoCopy}><span className={styles.principleLabel}>Evidence return</span><h3>Request photos.<br />Retain the hold.</h3><p>The supervisor sends a photo request with the work status. The crew adds evidence to the same pole; the hold remains during review.</p><div className={styles.latencySteps}><span>Saved on device</span><ArrowRight size={16} aria-hidden="true" /><span>Delivered to office</span><ArrowRight size={16} aria-hidden="true" /><strong>Human review</strong></div></div></article>
          <article className={styles.bentoOwnership}><div className={styles.bentoCopy}><span className={styles.principleLabel}>Compliance record</span><h3>Review a flag.<br />Export its record.</h3><p>Collect flagged poles in one table. Each record opens the same review modal. Approved observations can support Audubon later.</p><span className={styles.bentoNote}>Export prepares evidence. It does not complete reporting.</span></div><ProductScene variant="compliance" /></article>
        </div>
        <div className={styles.processHeading}><h3>One concern. Five review moments.</h3><a className={styles.embedLink} href="https://www.figma.com/board/qdbKTuDN054FcmO2aOxauJ/IKE-V2-Concern-record-journey?node-id=3-85" target="_blank" rel="noreferrer">Explore the journey map <MoveUpRight size={15} aria-hidden="true" /></a></div>
        <div className={styles.flow} aria-label="Example pole state flow">
          <div><span>Evidence captured</span><small>Upload or analysis may be pending</small></div><ArrowRight size={20} aria-hidden="true" />
          <div><span>Review needed</span><small>Affected pole stays on hold</small></div><ArrowRight size={20} aria-hidden="true" />
          <div><small>Reviewer decision</small><span>Work stoppage confirmed</span><small>or</small><span>Hold released</span></div>
        </div>
        <div className={styles.loop}><span>Evidence loop</span><p style={{ flexWrap: "wrap" }}>Review needed <ArrowRight size={14} aria-hidden="true" /> More evidence needed <ArrowRight size={14} aria-hidden="true" /> Review needed</p><strong>The hold remains.</strong></div>
        <p className={styles.timing}>Analysis may be pending after evidence is captured. Office review can happen hours later. A recorded or sent instruction is separate from one received by the crew.</p>
      </section>
      <section className={`${styles.section} ${styles.next}`} id="journey" aria-labelledby="journey-heading">
        <div className={styles.sectionIntro}><div><p className={styles.chapter}>04 / Prototype</p><h2 id="journey-heading">Your turn<br />to make the call.</h2></div><p>Switch between crew and supervisor to follow the same concern through the selected touchpoints.</p></div>
        <div className={styles.prototypeEmbed}>
          <div className={styles.embedHeader}><div><h3>Field capture & office review</h3><p>Interactive concept · Simulated analysis and delivery</p></div><Link href="/prototype" className={styles.embedLink}>Open full view <MoveUpRight size={16} aria-hidden="true" /></Link></div>
          <iframe src="/prototype?embed=1" title="Interactive ikeGPS prototype: field capture and office review" className={styles.prototypeFrame} loading="lazy" />
          <div className={styles.embedFoot}><span>Switch between crew and supervisor perspectives.</span><a href="#sources">Sources & next questions <ArrowRight size={14} aria-hidden="true" /></a></div>
        </div>
<div id="sources" className={styles.artifacts}>
          <div className={styles.processHeading}><h3>Artifacts of the journey</h3><p className={styles.artifactFlow} aria-label="Design process">Framing <ArrowRight size={14} aria-hidden="true" /> Research <ArrowRight size={14} aria-hidden="true" /> Prototype <ArrowRight size={14} aria-hidden="true" /> Review</p></div>
          <p className={styles.artifactIntro}>You can review the framing and follow the decisions through the working prototype.</p>
          <details className={styles.resources}><summary>Explore artifacts and sources</summary><div className={styles.resourceGrid}>
            <div><h4>Framing & working prototype</h4><a href="https://perch-ikegps.vercel.app/documents/endangered-species-problem-framing.pdf" target="_blank" rel="noreferrer">Submitted two-page framing ↗</a><a href="https://ikegps-species-review-v2.vercel.app/" target="_blank" rel="noreferrer">Live V2 presentation ↗</a><a href="https://ikegps-species-review-v2.vercel.app/prototype" target="_blank" rel="noreferrer">Live V2 prototype ↗</a><a href="https://github.com/cellfade/ikegps-species-review-v2" target="_blank" rel="noreferrer">GitHub repository · Private access ↗</a></div>
            <div><h4>Editable design & process</h4><a href="https://www.figma.com/design/CWE5aV1sWv7v6H3N5rtLug/?node-id=53-20" target="_blank" rel="noreferrer">Figma · Office review ↗</a><a href="https://www.figma.com/design/CWE5aV1sWv7v6H3N5rtLug/?node-id=53-304" target="_blank" rel="noreferrer">Figma · Presentation ↗</a><a href="https://www.figma.com/board/qdbKTuDN054FcmO2aOxauJ/?node-id=15-349" target="_blank" rel="noreferrer">FigJam · Five review moments ↗</a><a href="https://www.figma.com/board/qdbKTuDN054FcmO2aOxauJ/?node-id=3-85" target="_blank" rel="noreferrer">FigJam · Service blueprint ↗</a></div>
            <div><h4>Planning & review notes</h4><a href="/documents/prototype-v2-plan.md">V2 plan · Markdown</a><a href="/documents/phase-one-terminology.md">Journey terminology · Markdown</a><a href="/documents/current-refinement-qa.md">Current refinement QA · Markdown</a><a href="/documents/design-exercise-alignment.md">Design exercise alignment · Markdown</a><a href="/documents/landing-source-alignment.md">Submitted-source alignment · Markdown</a><a href="/documents/reviewer-identification-guidance.md">Identification guidance · Markdown</a><a href="/documents/landing-comparative-taste-audit.md">Comparative design audit · Markdown</a></div>
            <div><h4>Research & design references</h4><a href="https://merlin.allaboutbirds.org/photo-id/" target="_blank" rel="noreferrer">Cornell · Merlin Photo ID ↗</a><a href="https://www.inaturalist.org/pages/computer_vision_demo" target="_blank" rel="noreferrer">iNaturalist · Computer vision ↗</a><a href="https://ikegps.com/ike-office-pro/" target="_blank" rel="noreferrer">IKE Office Pro ↗</a><a href="https://www.nngroup.com/articles/ten-usability-heuristics/" target="_blank" rel="noreferrer">NN/g · Usability heuristics ↗</a><a href="https://baymard.com/blog/trigger-indicators" target="_blank" rel="noreferrer">Baymard · Interaction cues ↗</a><a href="https://support.ikegps.com/hc/en-us/articles/46602577345037-How-to-Conduct-Data-Quality-Reviews-in-IKE-Office-Pro" target="_blank" rel="noreferrer">IKE · Data-quality review training ↗</a><a href="https://www.allaboutbirds.org/news/top-three-signs-that-birds-are-nesting-near-you/" target="_blank" rel="noreferrer">Cornell · Signs of nesting ↗</a><a href="https://www.fws.gov/story/bird-nests" target="_blank" rel="noreferrer">FWS · Bird nest guidance ↗</a><a href="https://www.nngroup.com/articles/service-blueprints-definition/" target="_blank" rel="noreferrer">NN/g · Service blueprints ↗</a><a href="https://stripe.com/billing" target="_blank" rel="noreferrer">Stripe Billing · Visual reference ↗</a><a href="https://linear.app/" target="_blank" rel="noreferrer">Linear · Product reference ↗</a><a href="https://www.tasteskill.dev/" target="_blank" rel="noreferrer">Taste Skill · Design reference ↗</a></div>
          </div><p className={styles.artifactIntro}>References inform this proposed workflow. IKEstrel is fictional; no integration, user-validation or performance outcome is claimed. Design files may require access.</p>
          <p className={styles.artifactIntro}>Next: test notifications and additional-photo requests; measure review and instruction-receipt time. Explore pre-dispatch imagery only after validating quality, age and pole association.</p></details>
        </div><div className={styles.landscapeClose}>
          <Image className={styles.landscapeImage} src="/assets/v1-closing-corridor-illustrative.png" alt="Illustrative mountain utility corridor with a bird and nest on a pole, reused from the original design concept" fill sizes="100vw" />
          <div className={styles.landscapeShade} />
          <div className={styles.closeContent}>
            <div className={styles.handoff}><div><h3>A clearer call.<br />A crew that knows what’s next.</h3><p>Explore the field finding, office review, and instruction back to the crew.</p></div><Link className={styles.primaryLink} href="/prototype">Explore the prototype <MoveUpRight size={18} aria-hidden="true" /></Link></div>
            <footer className={styles.footer}><a href="#overview" className={styles.footerBrand}>ikeGPS</a><span>Andrew Miller · Product design<br />Independent design exercise · Illustrative scenery</span><span>Proposed workflows.<br />Simulated AI.</span></footer>
          </div>
        </div>
      </section>
    </main>
  </div>;
}
