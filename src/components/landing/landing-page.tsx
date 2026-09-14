import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MoveUpRight, Check, LockKeyhole, FileCheck2, History, Camera } from "lucide-react";
import styles from "./landing-page.module.css";
import { ExpansionMap } from "./expansion-map";

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
      <nav aria-label="Presentation"><a href="#framing">Problem</a><a href="#questions">Questions</a><a href="#assumptions">Assumptions</a><a href="#decisions">Process</a><a href="#journey">Solution</a></nav>
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
          <div><p>The supervisor’s work decision depends on evidence the crew captures at the pole. They share responsibility, but see the evidence at different times. Missing or late evidence delays review and the instruction back to the crew.</p><span>A design goal to test, not a measured result.</span></div>
        </div>
      </div>


      <section className={`${styles.section} ${styles.framing}`} id="framing" aria-labelledby="framing-heading">
        <div className={styles.sectionIntro}><div><p className={styles.chapter}>01 / Problem framing</p><h2 id="framing-heading">One work decision.<br />Two different moments.</h2></div><p>Crews collect evidence on site. Supervisors usually review it later. The goal is to shorten that gap so a concern gets an accountable decision while the crew can still inspect the pole.</p></div>
        <div className={styles.peopleRows}>
          <article><Image className={styles.personaImage} src="/assets/persona-field.png" alt="" width={1254} height={1254} sizes="180px" /><span>Core user</span><h3 className={styles.personaName}>Field crew</h3><h4>A clear next step at the pole.</h4><p>Capture useful evidence with little extra effort. Unfamiliar species, poor photos or weak connectivity should not force a confident answer.</p></article>
          <article><Image className={styles.personaImage} src="/assets/persona-supervisor.png" alt="" width={1254} height={1254} sizes="180px" /><span>Core user</span><h3 className={styles.personaName}>Supervisor</h3><h4>Evidence to make and explain the call.</h4><p>Distinguish AI suggestions from observations, record who decided what and why, and return a clear work instruction.</p></article>
          <article><Image className={styles.personaImage} src="/assets/persona-audubon.png" alt="" width={1254} height={1254} sizes="180px" /><span>Secondary user</span><h3 className={styles.personaName}>Audubon partner</h3><h4>Usable sightings, with their context.</h4><p>Receive approved imagery, location, identification source and uncertainty. Conservation sharing follows the immediate work decision.</p></article>
        </div>
        <div className={styles.designTension}><p className={styles.chapter}>The design tension</p><h3>The office owns a decision whose evidence the crew collects.</h3><p>Speed competes with evidence quality. False alarms compete with missed nesting. A bird in frame does not prove nesting, and “nothing flagged” does not imply clearance.</p></div>
        <section className={styles.anchorSection} aria-labelledby="anchors-heading"><h2 id="anchors-heading">Three anchors guide the design.</h2><div className={styles.anchorBand}><div><span>01 / AI</span><strong>Uncertainty, reversibility & latency</strong></div><div><span>02 / Work decision</span><strong>Ownership & verifiability</strong></div><div><span>03 / Experience</span><strong>Simplicity</strong></div></div></section>
      </section>
      <section className={`${styles.section} ${styles.questions}`} id="questions" aria-labelledby="questions-heading">
        <div className={styles.sectionIntro}><div><p className={styles.chapter}>02 / Questions</p><h2 id="questions-heading">Start with<br />what we don’t know.</h2></div><p>These are the five questions from my submitted framing, with the research methods summarized below.</p></div>
          <div className={styles.questionList}><ul>
            <li><strong>Can review happen before contact with the pole?</strong><br />Observe capture-to-work timing and reviewer coverage. Move review earlier if photography is too late; test delayed review and escalation when coverage is unavailable.</li>
            <li><strong>Who owns the pause, reporting and release?</strong><br />Walk through false alarms and nesting concerns with operations and a compliance specialist. Establish reviewers, recipients, completion evidence and release authority.</li>
            <li><strong>What can crews reliably observe?</strong><br />Test representative photos with experienced and less-experienced crews. Watch for false certainty, comparison bias and whether “Can’t tell” works under pressure.</li>
            <li><strong>What survives weak connectivity or a poor image?</strong><br />Test capture quality, device analysis, delayed uploads and returned instructions. Evaluate office analysis as a fallback; distinguish synced from reviewed.</li>
            <li><strong>What can we share with Audubon?</strong><br />Review a sample package with the utility data owner and partner data steward. Agree permitted data, redaction, format and approval; direct partner review depends on permissions.</li>
          </ul></div>
      </section>
      <section className={`${styles.section} ${styles.assumptions}`} id="assumptions" aria-labelledby="assumptions-heading">
        <div className={styles.sectionIntro}><div><p className={styles.chapter}>03 / Assumptions</p><h2 id="assumptions-heading">Make the conditions<br />visible.</h2></div><p>These assumptions carry the design forward and need validation with crews, supervisors and utility data owners.</p></div>
          <div className={styles.assumptionStories}>
            <article className={styles.captureStory}>
              <Image src="/assets/v1-assumptions-corridor.png" alt="Illustrative utility corridor from the original concept" fill sizes="(max-width: 767px) 100vw, 600px" />
              <div className={styles.storyCopy}><span className={styles.storyIndex}>01 / Timing</span><h3>Capture before work.</h3><p>Useful device analysis, local saving and later sync need validation.</p></div>
              <div className={styles.captureReceipt}><Camera size={19} /><div><strong>Evidence captured</strong><span>Saved on device · Sync pending</span></div><Check size={17} /></div>
              <small className={styles.storyImageNote}>Illustrative scenery · Original concept</small>
            </article>
            <article className={styles.pauseStory}>
              <div className={styles.storyCopy}><span className={styles.storyIndex}>02 / Scope of the hold</span><h3>Pause the affected pole.</h3><p>Unresolved nesting or insufficient evidence keeps this pole on hold. We assume crews can work on other independent, available poles without pausing the entire work order.</p></div>
              <div className={styles.poleDiagram} aria-label="Affected pole held; other poles assessed independently"><div><span>023</span><i /><small>Prior pole</small></div><div className={styles.heldPole}><span>024</span><i /><small>On hold</small></div><div><span>025</span><i /><small>Assess separately</small></div></div>
            </article>
            <article className={styles.authorityStory}>
              <div className={styles.storyCopy}><span className={styles.storyIndex}>03 / Accountability</span><h3>Named release authority.</h3><p>The supervisor places, maintains or releases the hold and records the reason. Releasing a false alarm requires review; confirmed nesting follows the applicable procedure.</p></div>
              <div className={styles.authorityReceipt}><FileCheck2 size={25} strokeWidth={1.4} /><strong>Supervisor decision</strong><span>Named reviewer</span><span>Recorded reason</span><span>Instruction received</span></div>
            </article>
            <article className={styles.recordStory}>
              <div className={styles.storyCopy}><span className={styles.storyIndex}>04 / Evidence history</span><h3>Reversible, attributed records.</h3><p>Record who captured the evidence, who reviewed it, who made the work decision and who exported the data. Preserve original evidence and later corrections.</p></div>
              <div className={styles.recordStack}><div><History size={18} /><strong>Original evidence retained</strong></div><div><span>Captured by crew</span><span>Reviewed by supervisor</span><span>Export attributed to sender</span></div></div>
            </article>
            <article className={styles.privateStory}>
              <div className={styles.storyCopy}><span className={styles.storyIndex}>05 / Responsible sharing</span><h3>Private utility data.</h3><p>We assume captured data stays under utility control. Selected records need preparation and approval before export to Audubon for historical sightings and migration research.</p></div>
              <div className={styles.privatePacket}><LockKeyhole size={25} strokeWidth={1.4} /><strong>Selected observations</strong><div aria-hidden="true"><i /><i /><i /></div><span>Approval before sharing</span></div>
            </article>
          </div>
      </section>

      <section className={`${styles.section} ${styles.direction}`} id="decisions" aria-labelledby="decisions-heading">
        <div className={styles.sectionIntro}><div><p className={styles.chapter}>04 / Design process</p><h2 id="decisions-heading">From framing<br />to a working prototype.</h2></div><p>I used the submitted framing to prioritize the crew and supervisor, mapped their handoffs, then built and reviewed the selected touchpoints in code.</p></div>

        
        <ol className={styles.buildProcess}>
          <li><span>01 / Ground the direction</span><p>Review the exercise, IKE reference screens and identification guidance. Keep unanswered questions and assumptions visible.</p></li>
          <li><span>02 / Map the handoffs</span><p>Use FigJam to connect roles, evidence and decisions. Separate the service journey from the proposed review-state model.</p></li>
          <li><span>03 / Build the touchpoints</span><p>Create the clickable code prototype around one shared record. Keep the field interaction small and the supervisor assessment in context.</p></li>
          <li><span>04 / Review and refine</span><p>Check interactions, state tests and rendered layouts. Capture stable designs in editable Figma frames for further exploration.</p></li>
        </ol>
        <div className={styles.bento}>
          <article className={styles.bentoOffice}><div className={styles.bentoCopy}><span className={styles.principleLabel}>Office pole review</span><h3>Review the evidence.<br />Record the decision.</h3><p>Open a notification or photo badge to reach the same review modal. Inspect the original photo, correct the suggestion and record a work decision.</p></div><ProductScene variant="office" /></article>
          <article className={styles.bentoField}><div className={styles.bentoCopy}><span className={styles.principleLabel}>IKE field capture</span><h3>Flag a concern<br />during capture.</h3><p>The crew flags concerns; the supervisor verifies or corrects the assessment. One large action limits interruption. Glove use, sunlight and completion time still need field testing.</p></div><ProductScene variant="field" /></article>
          <article className={styles.bentoLatency}><div className={styles.bentoCopy}><span className={styles.principleLabel}>Evidence return</span><h3>Request photos.<br />Retain the hold.</h3><p>The supervisor sends a photo request with the work status. The crew adds evidence to the same pole; the hold remains during review.</p><div className={styles.latencySteps}><span>Saved on device</span><ArrowRight size={16} aria-hidden="true" /><span>Delivered to office</span><ArrowRight size={16} aria-hidden="true" /><strong>Human review</strong></div></div></article>
          <article className={styles.bentoOwnership}><div className={styles.bentoCopy}><span className={styles.principleLabel}>Compliance record</span><h3>Review a flag.<br />Export its record.</h3><p>Collect flagged poles in one table. Each record opens the same review modal. Approved observations can support Audubon later.</p><span className={styles.bentoNote}>Export prepares evidence. It does not complete reporting.</span></div><ProductScene variant="compliance" /></article>
        </div>
        <section className={styles.cycleSection} aria-labelledby="cycle-heading">
          <div className={styles.cycleIntro}><div><p className={styles.chapter}>Process artifact / State model</p><h3 id="cycle-heading">The proposed<br />review-state model.</h3></div><p>Five states connect the evidence to a supervisor’s decision. Requests for more evidence return to review while the affected pole stays on hold.</p></div>
          <figure className={styles.cycleFigure}><a href="/assets/review-state-cycle.png" target="_blank" rel="noreferrer" aria-label="Open full-size five-state review diagram"><Image src="/assets/review-state-cycle.png" width={1660} height={880} alt="Evidence captured leads to Review needed. More evidence needed loops back to review. The supervisor confirms Work stoppage or releases the hold. Message delivery is tracked separately." sizes="(max-width: 767px) 100vw, 1142px" /></a><figcaption><span>Evidence can change the assessment. Only a recorded work decision changes the instruction.</span><a href="https://www.figma.com/board/qdbKTuDN054FcmO2aOxauJ?node-id=15-349" target="_blank" rel="noreferrer">Open in FigJam <MoveUpRight size={14} aria-hidden="true" /></a></figcaption></figure>
        </section>
        <section className={styles.cycleSection} aria-labelledby="journey-exploration-heading"><div className={styles.cycleIntro}><div><p className={styles.chapter}>Process artifact / User journey exploration</p><h3 id="journey-exploration-heading">Explore the paths<br />into review.</h3></div><p>The FigJam flows connect field capture to supervisor review and a returned instruction. Office planning explores a later entry point into the same review.</p></div><figure className={styles.cycleFigure}><a href="/assets/journey-flows-final.png" target="_blank" rel="noreferrer" aria-label="Open full-size user journey exploration"><Image src="/assets/journey-flows-final.png" alt="FigJam user journey exploration showing field capture and a proposed office-planning path into supervisor review." width={5680} height={1730} sizes="(max-width:767px) 100vw, 1142px" /></a><figcaption><span>Field capture: current prototype · Office planning: phase-two exploration</span><a href="https://www.figma.com/board/qdbKTuDN054FcmO2aOxauJ?node-id=1-3" target="_blank" rel="noreferrer">Explore in FigJam <MoveUpRight size={14} aria-hidden="true" /></a></figcaption></figure></section>
        <div className={styles.researchFindings}><h3>Evidence behind the direction</h3><p>FWS guidance covers nests with eggs, chicks or dependent young. A photo with no visible adult cannot settle nest status. <a href="https://www.fws.gov/story/bird-nests">FWS nest guidance ↗</a></p><p>Eagle nests receive protection even when unoccupied. We keep species and nesting separate; the fictional scenario does not encode legal clearance. <a href="https://www.fws.gov/program/eagle-management/eagle-nest-removal-permits">FWS eagle guidance ↗</a></p><p>Visible system status helps people understand what happened. Upload, analysis and crew receipt therefore stay separate. <a href="https://www.nngroup.com/articles/ten-usability-heuristics/">NN/g usability heuristics ↗</a></p></div>
      </section>
      <section className={`${styles.section} ${styles.next}`} id="journey" aria-labelledby="journey-heading">
        <div className={styles.sectionIntro}><div><p className={styles.chapter}>05 / Proposed solution</p><h2 id="journey-heading">Your turn<br />to make the call.</h2></div><p>Switch between crew and supervisor to follow the same concern through the selected touchpoints.</p></div>
        <div className={styles.prototypeEmbed}>
          <div className={styles.embedHeader}><div><h3>Field capture & office review</h3><p>Interactive concept · Simulated analysis and delivery</p></div><Link href="/prototype" className={styles.embedLink}>Open full view <MoveUpRight size={16} aria-hidden="true" /></Link></div>
          <iframe src="/prototype?embed=1" title="Interactive ikeGPS prototype: field capture and office review" className={styles.prototypeFrame} loading="lazy" />
          <div className={styles.embedFoot}><span>Switch between crew and supervisor perspectives.</span><a href="#sources">Sources & next questions <ArrowRight size={14} aria-hidden="true" /></a></div>
        </div>
<section className={styles.expansion} id="expansion" aria-labelledby="expansion-heading"><div className={styles.sectionIntro}><div><p className={styles.chapter}>06 / Further exploration</p><h2 id="expansion-heading">Earlier review.<br />Longer-term value.</h2></div><p>Two additional entry points could reuse the same assessment. Conservation views could give approved observations a life beyond the work order.</p></div>
          <div className={styles.expansionEntries}><article><span>Proposed Office Pro setting</span><h3>Analyze new photos<br />in the background.</h3><p>Check eligible new or updated photos in an authorized utility dataset, including photos outside a work order. A possible finding notifies the supervisor and opens the same pole review.</p><small>A concern belongs to the pole. A hold applies to associated work.</small><Link className={styles.expansionDemoLink} href="/analysis-entry-points?path=background">Try the photo-update trigger ↗</Link></article><article><span>Proposed Office Pro setting</span><h3>Check existing photos<br />during planning.</h3><p>At work-order creation, analyze available corridor photos. Show capture date and uncertainty; request fresh evidence when the images cannot support a current assessment.</p><small>Validate entity triggers, analysis scope, recipients and duplicate handling.</small><Link className={styles.expansionDemoLink} href="/analysis-entry-points?path=planning">Try the work-order trigger ↗</Link></article></div>
          <p className={styles.triggerNote}>Proposed automation: run when eligible photos change or a work order is created. Reuse an existing analysis when the photo and model version are unchanged; validate batching and queue limits before claiming resource savings.</p><div className={styles.conservationExpansion}><div><p className={styles.chapter}>Secondary user / Audubon partner</p><h3>See observations<br />across years.</h3><p>Explore species and nesting observations over time. Year colors distinguish when sightings were recorded, while preserving identification uncertainty.</p><p>Changing coverage or collection effort can also change the pattern. Migration analysis would need additional data and expert interpretation.</p><Link className={styles.primaryLink} href="/conservation">Explore the conservation prototype <MoveUpRight size={15} aria-hidden="true" /></Link><a href="https://science.ebird.org/en/atlasnc/status-and-trends" target="_blank" rel="noreferrer">eBird Status and Trends reference ↗</a></div><ExpansionMap /></div>
          <details className={styles.sharingProposal}><summary>What would a shared view reveal?</summary><div><p><strong>Private by default.</strong> Export or a public link would use a separately prepared, approved dataset. The current prototype does not publish records.</p><p><strong>Share selected observations.</strong> Approved species, broad region, year and uncertainty could remain. Exclude work-order and pole identifiers, crew or customer details, internal notes and precise sensitive nest locations.</p><p><strong>Review the whole package.</strong> Photos can reveal infrastructure and location even after metadata removal. Omit or redact imagery and embedded metadata before sharing.</p><p><strong>Preview, approve, then share.</strong> A proposed sharing flow would show included fields and location precision, record the approver, and support revoking a link. Downloaded copies cannot be recalled.</p><a href="https://www.inaturalist.org/pages/geoprivacy" target="_blank" rel="noreferrer">iNaturalist geoprivacy reference ↗</a></div></details>
          <p className={styles.expansionBoundary}>Phase-two concepts · Synthetic map data · Analysis triggers, conservation filters and sharing preview are simulated. No AI jobs or public-sharing service run in this prototype.</p>
        </section>
<div id="sources" className={styles.artifacts}>
          <div className={styles.processHeading}><h3>Artifacts of the journey</h3><p className={styles.artifactFlow} aria-label="Design process">Framing <ArrowRight size={14} aria-hidden="true" /> Research <ArrowRight size={14} aria-hidden="true" /> Prototype <ArrowRight size={14} aria-hidden="true" /> Review</p></div>
          <p className={styles.artifactIntro}>You can review the framing and follow the decisions through the working prototype.</p>
          <details className={styles.resources}><summary>Explore artifacts and sources</summary><div className={styles.resourceGrid}>
            <div><h4>Framing & working prototype</h4><a href="https://perch-ikegps.vercel.app/documents/endangered-species-problem-framing.pdf" target="_blank" rel="noreferrer">Submitted two-page framing ↗</a><a href="https://ikegps-species-review-v2.vercel.app/" target="_blank" rel="noreferrer">Live V2 presentation ↗</a><a href="https://ikegps-species-review-v2.vercel.app/prototype" target="_blank" rel="noreferrer">Live V2 prototype ↗</a><a href="https://github.com/cellfade/ikegps-species-review-v2" target="_blank" rel="noreferrer">GitHub repository · Private access ↗</a></div>
            <div><h4>Editable design & process</h4><a href="https://www.figma.com/design/CWE5aV1sWv7v6H3N5rtLug/?node-id=53-20" target="_blank" rel="noreferrer">Figma · Office review ↗</a><a href="https://www.figma.com/design/CWE5aV1sWv7v6H3N5rtLug/?node-id=53-304" target="_blank" rel="noreferrer">Figma · Presentation ↗</a><a href="https://www.figma.com/board/qdbKTuDN054FcmO2aOxauJ/?node-id=15-349" target="_blank" rel="noreferrer">FigJam · Five review moments ↗</a><a href="https://www.figma.com/board/qdbKTuDN054FcmO2aOxauJ/?node-id=3-85" target="_blank" rel="noreferrer">FigJam · Service blueprint ↗</a></div>
            <div><h4>Planning & review notes</h4><a href="/documents/review-feedback-resolution.md">Review feedback resolution · Markdown</a><a href="/documents/phase-two-entry-points.md">Phase two entry points · Markdown</a><a href="/documents/prototype-v2-plan.md">V2 plan · Markdown</a><a href="/documents/phase-one-terminology.md">Journey terminology · Markdown</a><a href="/documents/current-refinement-qa.md">Current refinement QA · Markdown</a><a href="/documents/design-exercise-alignment.md">Design exercise alignment · Markdown</a><a href="/documents/landing-source-alignment.md">Submitted-source alignment · Markdown</a><a href="/documents/reviewer-identification-guidance.md">Identification guidance · Markdown</a><a href="/documents/landing-comparative-taste-audit.md">Comparative design audit · Markdown</a></div>
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
