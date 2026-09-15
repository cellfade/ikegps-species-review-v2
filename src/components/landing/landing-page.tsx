import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MoveUpRight, Check, LockKeyhole, FileCheck2, History, Camera } from "lucide-react";
import styles from "./landing-page.module.css";
import { ExpansionMap } from "./expansion-map";

// Original screenshots stay proportional and unwarped over generated environments.
function ProductScene({ variant }: { variant: 'hero' | 'field' | 'office' | 'compliance' }) {
  const environment = variant === 'hero' ? 'review-v2' : variant === 'field' ? 'dimensional' : variant === 'compliance' ? 'editorial' : 'mineral';
  const source = variant === 'field' ? 'device' : variant === 'compliance' ? 'compliance' : variant === 'office' ? 'office-corrected' : 'office-map';
  const label = variant === 'hero' ? 'Field capture and shared office review' : variant === 'field' ? 'IKE field capture with a possible nesting concern' : variant === 'office' ? 'Supervisor corrects a false flag and releases the hold' : 'Compliance record for the flagged pole';
  return <figure className={`${styles.productScene} ${styles[`scene${variant}`]}`}>
    <Image src={`/assets/${environment}-environment.png`} alt="" fill sizes="(max-width: 767px) 100vw, 1140px" className={styles.environment} priority={variant==='hero'} />
    <a className={styles.uiPlane} href={`/assets/${source}-verified.png`} target="_blank" rel="noreferrer" aria-label={`Enlarge ${label.toLowerCase()}`}><Image src={`/assets/${source}-verified.png`} alt={label} width={source==='office-map'?1265:source==='device'?358:source==='compliance'||source==='office-corrected'?1280:1289} height={source==='office-map'?961:source==='device'?636:source==='office-corrected'?1049:source==='compliance'?1040:1226} sizes={variant==='hero'?'(max-width: 767px) 90vw, 820px':'(max-width: 767px) 90vw, 700px'} unoptimized priority={variant==='hero'} /></a>
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
          <div><p>The supervisor’s decision depends on evidence the crew captures at the pole. They share responsibility at different moments. Missing or late evidence delays the instruction back.</p><span>A design goal to test, not a measured result.</span></div>
        </div>
      </div>


      <section className={`${styles.section} ${styles.framing}`} id="framing" aria-labelledby="framing-heading">
        <div className={styles.sectionIntro}><div><p className={styles.chapter}>01 / Problem framing</p><h2 id="framing-heading">One work decision.<br />Two different moments.</h2></div><p>Shorten the wait for a supervisor’s decision while the crew can still inspect the pole.</p></div>
        <aside className={styles.briefContext} aria-label="Context supplied in the design exercise">
          <p className={styles.chapter}>From the exercise brief</p>
          <div><p><strong>5–20 poles</strong><span>per work order</span></p><p><strong>3–5 work orders</strong><span>on a busy crew’s day</span></p><p><strong>48 hours</strong><span>notification constraint in the scenario</span></p></div>
          <p>At this scale, delayed evidence can compound waiting. The design targets avoidable review delay; it does not shorten a required notification period. These are supplied scenario facts, not measured results or legal guidance.</p>
        </aside>
        <div className={styles.peopleRows}>
          <article><Image className={styles.personaImage} src="/assets/persona-field.png" alt="" width={1254} height={1254} sizes="180px" /><span>Core user</span><h3 className={styles.personaName}>Field crew</h3><h4>A clear next step at the pole.</h4><p>Capture useful evidence with little extra effort. Unfamiliar species, poor photos or weak connectivity should not force a confident answer.</p></article>
          <article><Image className={styles.personaImage} src="/assets/persona-supervisor.png" alt="" width={1254} height={1254} sizes="180px" /><span>Core user</span><h3 className={styles.personaName}>Supervisor</h3><h4>Evidence to make and explain the call.</h4><p>Distinguish AI suggestions from observations, record who decided what and why, and return a clear work instruction.</p></article>
          <article><Image className={styles.personaImage} src="/assets/persona-audubon.png" alt="" width={1254} height={1254} sizes="180px" /><span>Secondary user</span><h3 className={styles.personaName}>Audubon partner</h3><h4>Usable sightings, with their context.</h4><p>Receive approved imagery, location, identification source and uncertainty. Conservation sharing follows the immediate work decision.</p></article>
        </div>
        <div className={styles.designTension}><p className={styles.chapter}>The design tension</p><h3>The office owns a decision whose evidence the crew collects.</h3><p>Speed competes with evidence quality. False alarms compete with missed nesting. A bird in frame does not prove nesting, and “nothing flagged” does not imply clearance.</p></div>
        <section className={styles.anchorSection} aria-labelledby="anchors-heading"><div className={styles.anchorIntro}><span>My design anchors</span><h2 id="anchors-heading">Three anchors.<br />One clear direction.</h2></div><div className={styles.anchorBand}><div><span>01 / AI behavior</span><h3>Uncertainty</h3><p>Reversibility &amp; latency</p></div><div><span>02 / Work decisions</span><h3>Clear ownership</h3><p>Verifiable decisions</p></div><div><span>03 / Experience</span><h3>Simplicity</h3><p>One clear next action</p></div></div></section>
      </section>
      <section className={`${styles.section} ${styles.questions}`} id="questions" aria-labelledby="questions-heading">
        <div className={styles.sectionIntro}><div><p className={styles.chapter}>02 / Questions</p><h2 id="questions-heading">Start with<br />what we don’t know.</h2></div><p>Five questions from my submitted framing, with methods to investigate them.</p></div>
          <div className={styles.questionList}><ul>
            <li><strong>Can review happen before contact with the pole?</strong><br />Observe capture timing and reviewer coverage, including delayed review and escalation.</li>
            <li><strong>Who owns the pause, reporting and release?</strong><br />Walk through false alarms and nesting concerns with operations to establish reporting and release authority.</li>
            <li><strong>What can crews reliably observe?</strong><br />Test representative photos with crews of different experience, including whether “Can’t tell” works under pressure.</li>
            <li><strong>What survives weak connectivity or a poor image?</strong><br />Test poor images, delayed uploads and office analysis; check that crews distinguish synced from reviewed.</li>
            <li><strong>What can we share with Audubon?</strong><br />Review a sample package with the data owner and partner steward to agree permissions, redaction and approval.</li>
          </ul></div>
      </section>
      <section className={`${styles.section} ${styles.assumptions}`} id="assumptions" aria-labelledby="assumptions-heading">
        <div className={styles.sectionIntro}><div><p className={styles.chapter}>03 / Assumptions</p><h2 id="assumptions-heading">Make the conditions<br />visible.</h2></div><p>Validate these assumptions with crews, supervisors and utility data owners.</p></div>
          <div className={styles.assumptionStories}>
            <article className={styles.captureStory}>
              <Image src="/assets/v1-assumptions-corridor.png" alt="Illustrative utility corridor from the original concept" fill sizes="(max-width: 767px) 100vw, 600px" />
              <div className={styles.storyCopy}><span className={styles.storyIndex}>01 / Timing</span><h3>Capture before work.</h3><p>Useful device analysis, local saving and later sync need validation.</p></div>
              <div className={styles.captureReceipt}><Camera size={19} /><div><strong>Evidence captured</strong><span>Saved on device · Sync pending</span></div><Check size={17} /></div>
              <small className={styles.storyImageNote}>Illustrative scenery · Original concept</small>
            </article>
            <article className={styles.pauseStory}>
              <div className={styles.storyCopy}><span className={styles.storyIndex}>02 / Scope of the hold</span><h3>Pause the affected pole.</h3><p>Unresolved nesting or insufficient evidence keeps this pole on hold. We assume crews can continue on other independent, available poles.</p></div>
              <Image className={styles.holdPhoto} src="/assets/hold-corridor-highlight.png" alt="Illustrative corridor with an orange silhouette highlighting one pole, bird and nest; neighboring poles remain unmarked" fill sizes="(max-width: 767px) 100vw, 50vw" />
              <div className={styles.holdPhotoCaption}><span>Pole-level hold</span><strong>One pole, not necessarily<br />the whole work order.</strong><small>Illustrative scenery · Assumption to validate</small></div>
            </article>
            <article className={styles.authorityStory}>
              <div className={styles.storyCopy}><span className={styles.storyIndex}>03 / Accountability</span><h3>Named release authority.</h3><p>The supervisor places, maintains or releases the hold and records the reason. Releasing a false alarm requires review; confirmed nesting follows the applicable procedure.</p></div>
              <div className={styles.authorityReceipt}><div className={styles.receiptHeading}><span>Work decision</span><FileCheck2 size={22} strokeWidth={1.4} /></div><strong>A person owns<br />the call.</strong><div className={styles.receiptSignature}><span>Authorized by</span><b>Named supervisor</b></div><div className={styles.receiptFooter}><Check size={14} /><span>Reason recorded</span></div></div>
            </article>
            <article className={styles.recordStory}>
              <div className={styles.storyCopy}><span className={styles.storyIndex}>04 / Evidence history</span><h3>Reversible, attributed records.</h3><p>Attribute captures, reviews, work decisions and exports. Preserve original evidence and later corrections.</p></div>
              <div className={styles.recordStack}><div className={styles.recordHeading}><History size={17} /><strong>A traceable history</strong></div><ol><li><span>01</span><div><strong>Capture</strong><small>Crew · Original retained</small></div></li><li><span>02</span><div><strong>Review &amp; correct</strong><small>Supervisor · Reason recorded</small></div></li><li><span>03</span><div><strong>Export</strong><small>Sender · Package recorded</small></div></li></ol><div className={styles.recordCaption}>New decisions add to the record.</div></div>
            </article>
            <article className={styles.privateStory}>
              <div className={styles.storyCopy}><span className={styles.storyIndex}>05 / Responsible sharing</span><h3>Private utility data.</h3><p>We assume utility control of captured data. Prepare and approve selected records before export to Audubon for historical sightings and migration research.</p></div>
              <div className={styles.privatePacket}><div className={styles.packetHeading}><LockKeyhole size={18} strokeWidth={1.4} /><span>Prepared for sharing</span></div><strong>Selected<br />observations.</strong><div className={styles.packetRows}><span>Species &amp; sighting<Check size={13} /></span><span>Private details<i aria-label="Redacted" /></span><span>Internal records<i aria-label="Redacted" /></span></div><div className={styles.packetSeal}>Review <ArrowRight size={13} /> Approve <ArrowRight size={13} /> Export</div></div>
            </article>
          </div>
      </section>

      <section className={`${styles.section} ${styles.direction}`} id="decisions" aria-labelledby="decisions-heading">
        <div className={styles.sectionIntro}><div><p className={styles.chapter}>04 / Design process</p><h2 id="decisions-heading">From framing<br />to a working prototype.</h2></div><p>I prioritized crew and supervisor touchpoints, mapped their handoffs, then built and reviewed the code prototype. I ruled out automatic AI clearance: uncertain findings need a recorded supervisor decision.</p></div>

        
        <ol className={styles.buildProcess}>
          <li><span>01 / Ground the direction</span><p>Review the exercise, IKE reference screens and identification guidance. Keep unanswered questions and assumptions visible.</p></li>
          <li><span>02 / Map the handoffs</span><p>Use FigJam to connect roles, evidence and decisions. Separate the service journey from the proposed review-state model.</p></li>
          <li><span>03 / Build the touchpoints</span><p>Create the clickable code prototype around one shared record. Keep the field interaction small and the supervisor assessment in context.</p></li>
          <li><span>04 / Review and refine</span><p>Check interactions, state tests and rendered layouts. Capture stable designs in editable Figma frames for further exploration.</p></li>
        </ol>
        <div className={styles.bento}>
          <article className={styles.bentoOffice}><div className={styles.bentoCopy}><span className={styles.principleLabel}>Office pole review</span><h3>Review the evidence.<br />Record the decision.</h3><p>A notification or photo badge opens the same review. Inspect evidence, correct AI and record the decision.</p></div><ProductScene variant="office" /></article>
          <article className={styles.bentoField}><div className={styles.bentoCopy}><span className={styles.principleLabel}>IKE field capture</span><h3>Flag a concern<br />during capture.</h3><p>The crew flags concerns; the supervisor verifies or corrects the assessment. One large action is intended to limit interruption. Glove use, sunlight and completion time still need field testing.</p></div><ProductScene variant="field" /></article>
          <article className={styles.bentoLatency}><div className={styles.bentoCopy}><span className={styles.principleLabel}>Evidence return</span><h3>Request photos.<br />Retain the hold.</h3><p>Request evidence on the same pole while its hold remains in place.</p><div className={styles.latencySteps}><span>Saved on device</span><ArrowRight size={16} aria-hidden="true" /><span>Delivered to office</span><ArrowRight size={16} aria-hidden="true" /><strong>Human review</strong></div></div></article>
          <article className={styles.bentoOwnership}><div className={styles.bentoCopy}><span className={styles.principleLabel}>Compliance record</span><h3>Review a flag.<br />Export its record.</h3><p>Find flagged poles in one table. Open the shared review or export the record.</p><span className={styles.bentoNote}>Export prepares evidence. It does not complete reporting.</span></div><ProductScene variant="compliance" /></article>
        </div>
        <section className={styles.cycleSection} aria-labelledby="cycle-heading">
          <div className={styles.cycleIntro}><div><p className={styles.chapter}>Process artifact / State model</p><h3 id="cycle-heading">The proposed<br />review-state model.</h3></div><p>Five states connect the evidence to a supervisor’s decision. Requests for more evidence return to review while the affected pole stays on hold.</p></div>
          <figure className={styles.cycleFigure}><a href="/assets/review-state-cycle.png" target="_blank" rel="noreferrer" aria-label="Open full-size five-state review diagram"><Image src="/assets/review-state-cycle.png" width={1660} height={880} alt="Evidence captured leads to Review needed. More evidence needed loops back to review. The supervisor confirms Work stoppage or releases the hold. Message delivery is tracked separately." sizes="(max-width: 767px) 100vw, 1142px" /></a><figcaption><span>Evidence can change the assessment. Only a recorded work decision changes the instruction.</span><a href="https://www.figma.com/board/qdbKTuDN054FcmO2aOxauJ?node-id=15-349" target="_blank" rel="noreferrer">Open in FigJam <MoveUpRight size={14} aria-hidden="true" /></a></figcaption></figure>
        </section>
        <details className={styles.optionalJourney}><summary>Explore the user journey flows</summary><section className={styles.cycleSection} aria-labelledby="journey-exploration-heading"><div className={styles.cycleIntro}><div><p className={styles.chapter}>Process artifact / User journey exploration</p><h3 id="journey-exploration-heading">Explore the paths<br />into review.</h3></div><p>The FigJam flows connect field capture to supervisor review and a returned instruction. Office planning explores an additional entry point before dispatch.</p></div><figure className={styles.cycleFigure}><a href="/assets/journey-flows-final.png" target="_blank" rel="noreferrer" aria-label="Open full-size user journey exploration"><Image src="/assets/journey-flows-final.png" alt="FigJam user journey exploration showing field capture and a proposed office-planning path into supervisor review." width={5680} height={1730} sizes="(max-width:767px) 100vw, 1142px" /></a><figcaption><span>Field capture: current prototype · Office planning: phase-two exploration</span><a href="https://www.figma.com/board/qdbKTuDN054FcmO2aOxauJ?node-id=1-3" target="_blank" rel="noreferrer">Explore in FigJam <MoveUpRight size={14} aria-hidden="true" /></a></figcaption></figure></section></details>
        <div className={styles.researchFindings}><h3>Research informing the decisions</h3><p>FWS guidance covers nests with eggs, chicks or dependent young. A photo with no visible adult cannot settle nest status. <a href="https://www.fws.gov/story/bird-nests">FWS nest guidance ↗</a></p><p>Eagle nests receive protection even when unoccupied. We keep species and nesting separate; the fictional scenario does not encode legal clearance. <a href="https://www.fws.gov/program/eagle-management/eagle-nest-removal-permits">FWS eagle guidance ↗</a></p><p>Visible system status helps people understand what happened. Upload, analysis and crew receipt therefore stay separate. <a href="https://www.nngroup.com/articles/ten-usability-heuristics/">NN/g usability heuristics ↗</a></p></div>
      </section>
      <aside className={styles.scopeChoices} aria-labelledby="scope-choices-heading">
        <div><p className={styles.chapter}>Deliberate scope</p><h3 id="scope-choices-heading">What I chose<br />not to build.</h3><p>I focused on the crew-to-supervisor interface to reduce avoidable work-stoppage delays. I stopped before designing downstream reporting and partner operations.</p></div>
        <ul>
          <li><strong>Automatic AI clearance.</strong> A suggestion cannot authorize work; the supervisor records the decision.</li>
          <li><strong>Mandatory field species identification.</strong> Crews collect evidence and flag concerns, keeping the field task short.</li>
          <li><strong>A legal rules engine or reporting service.</strong> The prototype prepares a record for an external procedure; export does not complete it.</li>
          <li><strong>A production conservation portal.</strong> Synthetic filters and a sharing preview explore the partner need; access, approval and publication remain undesigned.</li>
        </ul>
      </aside>
      <section className={`${styles.section} ${styles.next}`} id="journey" aria-labelledby="journey-heading">
        <div className={styles.sectionIntro}><div><p className={styles.chapter}>05 / Proposed solution</p><h2 id="journey-heading">Your turn<br />to make the call.</h2></div><p>Switch between crew and supervisor to follow the same concern through the selected touchpoints.</p></div>
        <div className={styles.prototypeEmbed}>
          <div className={styles.embedHeader}><div><h3>Field capture & office review</h3><p>Interactive concept · Simulated analysis and delivery</p></div><Link href="/prototype" className={styles.embedLink}>Open full view <MoveUpRight size={16} aria-hidden="true" /></Link></div>
          <iframe src="/prototype?embed=1" title="Interactive ikeGPS prototype: field capture and office review" className={styles.prototypeFrame} loading="lazy" />
          <div className={styles.embedFoot}><span>Switch between crew and supervisor perspectives.</span><a href="#sources">Research & artifacts <ArrowRight size={14} aria-hidden="true" /></a></div>
        </div>
</section>
      <section className={`${styles.section} ${styles.expansion}`} id="expansion" aria-labelledby="expansion-heading"><div className={styles.sectionIntro}><div><p className={styles.chapter}>06 / Further exploration</p><h2 id="expansion-heading">Where I stopped.<br />What could come next.</h2></div><p>I cut scope at the crew-to-supervisor work decision. These exploratory sketches show promising directions to investigate next, including an end-to-end partner workflow that remains undesigned.</p></div>
          <div className={styles.expansionEntries}><article><span>Proposed Office Pro setting</span><h3>Analyze new photos<br />in the background.</h3><p>New or updated photos can trigger analysis and notify the supervisor, including outside a work order.</p><small>A concern belongs to the pole. A hold applies to associated work.</small><Link className={styles.expansionDemoLink} href="/analysis-entry-points?path=background">Try the photo-update trigger ↗</Link></article><article><span>Proposed Office Pro setting</span><h3>Check existing photos<br />during planning.</h3><p>Check existing corridor photos when a work order is created. Request fresh evidence when older images are insufficient.</p><small>Validate entity triggers, analysis scope, recipients and duplicate handling.</small><Link className={styles.expansionDemoLink} href="/analysis-entry-points?path=planning">Try the work-order trigger ↗</Link></article></div>
          <details className={styles.automationDetail}><summary>Analysis scope and resource use</summary><p>Photo changes and work-order creation are proposed triggers. Reuse results when the photo and model are unchanged; validate queue limits and resource use.</p></details><div className={styles.conservationExpansion}><div><p className={styles.chapter}>Secondary user / Audubon partner</p><h3>See observations<br />across years.</h3><p>Compare observations by species and year, with identification uncertainty retained.</p><p>Changing coverage or collection effort can also change the pattern. Migration analysis would need additional data and expert interpretation.</p><Link className={styles.primaryLink} href="/conservation">Explore the conservation prototype <MoveUpRight size={15} aria-hidden="true" /></Link><a href="https://science.ebird.org/en/atlasnc/status-and-trends" target="_blank" rel="noreferrer">eBird Status and Trends reference ↗</a></div><ExpansionMap /></div>
          <details className={styles.sharingProposal}><summary>What would a shared view reveal?</summary><div><p><strong>Private by default.</strong> Export or a public link would use a separately prepared, approved dataset. The current prototype does not publish records.</p><p><strong>Share selected observations.</strong> Approved species, broad region, year and uncertainty could remain. Exclude work-order and pole identifiers, crew or customer details, internal notes and precise sensitive nest locations.</p><p><strong>Review the whole package.</strong> Photos can reveal infrastructure and location even after metadata removal. Omit or redact imagery and embedded metadata before sharing.</p><p><strong>Preview, approve, then share.</strong> A proposed sharing flow would show included fields and location precision, record the approver, and support revoking a link. Downloaded copies cannot be recalled.</p><a href="https://www.inaturalist.org/pages/geoprivacy" target="_blank" rel="noreferrer">iNaturalist geoprivacy reference ↗</a></div></details>
          <p className={styles.expansionBoundary}>Phase-two concepts · Synthetic map data · Analysis triggers, conservation filters and sharing preview are simulated. No AI jobs or public-sharing service run in this prototype.</p>
        </section>
<section id="sources" className={`${styles.section} ${styles.artifacts}`} aria-labelledby="artifacts-heading">
          <p className={styles.chapter}>Supporting evidence / Research & artifacts</p><div className={styles.processHeading}><h2 id="artifacts-heading">Artifacts of the journey</h2><p className={styles.artifactFlow} aria-label="Design process">Framing <ArrowRight size={14} aria-hidden="true" /> Research <ArrowRight size={14} aria-hidden="true" /> Prototype <ArrowRight size={14} aria-hidden="true" /> Review</p></div>
          <p className={styles.artifactIntro}>Explore the submitted framing, editable designs, QA notes and sources behind the concept.</p>
          <details className={styles.resources}><summary>Design artifacts & review notes</summary><div className={styles.resourceGrid}>
            <div><h3>Framing & working prototype</h3><a href="https://perch-ikegps.vercel.app/documents/endangered-species-problem-framing.pdf" target="_blank" rel="noreferrer">Submitted two-page framing ↗</a><a href="https://ikegps-species-review.vercel.app/" target="_blank" rel="noreferrer">Live case study ↗</a><a href="https://ikegps-species-review.vercel.app/prototype" target="_blank" rel="noreferrer">Live prototype ↗</a><a href="https://github.com/cellfade/ikegps-species-review" target="_blank" rel="noreferrer">GitHub repository · Public ↗</a></div>
            <div><h3>Editable design & process</h3><a href="https://www.figma.com/design/CWE5aV1sWv7v6H3N5rtLug/?node-id=53-20" target="_blank" rel="noreferrer">Figma · Office review ↗</a><a href="https://www.figma.com/design/CWE5aV1sWv7v6H3N5rtLug/?node-id=53-304" target="_blank" rel="noreferrer">Figma · Presentation ↗</a><a href="https://www.figma.com/board/qdbKTuDN054FcmO2aOxauJ/?node-id=15-349" target="_blank" rel="noreferrer">FigJam · Five review moments ↗</a><a href="https://www.figma.com/board/qdbKTuDN054FcmO2aOxauJ/?node-id=3-85" target="_blank" rel="noreferrer">FigJam · Service blueprint ↗</a></div>
            <div><h3>Planning & review notes</h3><a href="/documents/review-feedback-resolution.md">Review feedback resolution · Markdown</a><a href="/documents/phase-two-entry-points.md">Phase two entry points · Markdown</a><a href="/documents/prototype-v2-plan.md">Prototype plan · Markdown</a><a href="/documents/phase-one-terminology.md">Journey terminology · Markdown</a><a href="/documents/current-refinement-qa.md">Current refinement QA · Markdown</a><a href="/documents/design-exercise-alignment.md">Design exercise alignment · Markdown</a><a href="/documents/landing-source-alignment.md">Submitted-source alignment · Markdown</a><a href="/documents/reviewer-identification-guidance.md">Identification guidance · Markdown</a><a href="/documents/landing-comparative-taste-audit.md">Comparative design audit · Markdown</a></div>

          </div><p className={styles.artifactIntro}>References inform this proposed workflow. IKEstrel is fictional; no integration, user-validation or performance outcome is claimed. Design files may require access.</p>
          <p className={styles.artifactIntro}>Next: test notifications and additional-photo requests; measure review and instruction-receipt time. Validate image quality, age and pole association before taking the pre-dispatch concept beyond simulation.</p></details>
          <details className={styles.resources}><summary>Research & reference library</summary><div className={styles.resourceGrid}><div><h3>Identification & nesting</h3><a href="https://merlin.allaboutbirds.org/photo-id/" target="_blank" rel="noreferrer">Cornell · Merlin Photo ID ↗</a><a href="https://www.inaturalist.org/pages/computer_vision_demo" target="_blank" rel="noreferrer">iNaturalist · Computer vision ↗</a><a href="https://www.allaboutbirds.org/news/top-three-signs-that-birds-are-nesting-near-you/" target="_blank" rel="noreferrer">Cornell · Signs of nesting ↗</a><a href="https://www.fws.gov/story/bird-nests" target="_blank" rel="noreferrer">FWS · Bird nest guidance ↗</a></div><div><h3>IKE product context</h3><a href="https://ikegps.com/ike-office-pro/" target="_blank" rel="noreferrer">IKE Office Pro ↗</a><a href="https://support.ikegps.com/hc/en-us/articles/46602577345037-How-to-Conduct-Data-Quality-Reviews-in-IKE-Office-Pro" target="_blank" rel="noreferrer">IKE · Data-quality review training ↗</a></div><div><h3>UX methods & interaction</h3><a href="https://www.nngroup.com/articles/ten-usability-heuristics/" target="_blank" rel="noreferrer">NN/g · Usability heuristics ↗</a><a href="https://baymard.com/blog/trigger-indicators" target="_blank" rel="noreferrer">Baymard · Interaction cues ↗</a><a href="https://www.nngroup.com/articles/service-blueprints-definition/" target="_blank" rel="noreferrer">NN/g · Service blueprints ↗</a></div><div><h3>Visual inspiration</h3><a href="https://stripe.com/billing" target="_blank" rel="noreferrer">Stripe Billing · Visual reference ↗</a><a href="https://linear.app/" target="_blank" rel="noreferrer">Linear · Product reference ↗</a><a href="https://www.tasteskill.dev/" target="_blank" rel="noreferrer">Taste Skill · Design reference ↗</a></div></div><p className={styles.artifactIntro}>Published guidance and product references informed the concept. These sources do not replace validation with crews, supervisors and utility data owners.</p></details>
        </section><div className={styles.landscapeClose}>
          <Image className={styles.landscapeImage} src="/assets/v1-closing-corridor-illustrative.png" alt="Illustrative mountain utility corridor with a bird and nest on a pole, reused from the original design concept" fill sizes="100vw" />
          <div className={styles.landscapeShade} />
          <div className={styles.closeContent}>
            <div className={styles.handoff}><div><h3>A clearer call.<br />A crew that knows what’s next.</h3><p>Explore the field finding, office review, and instruction back to the crew.</p></div><Link className={styles.primaryLink} href="/prototype">Explore the prototype <MoveUpRight size={18} aria-hidden="true" /></Link></div>
            <footer className={styles.footer}><a href="#overview" className={styles.footerBrand}>ikeGPS</a><span>Andrew Miller · Product design<br />Independent design exercise · Illustrative scenery</span><span>Proposed workflows.<br />Simulated AI.</span></footer>
          </div>
        </div>
    </main>
  </div>;
}
