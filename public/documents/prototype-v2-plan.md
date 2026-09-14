Public reading copy. Local paths generalized; original working document preserved.

# ikeGPS prototype V2 — planning proposal

September 14, 2026 · Prepared for Andrew Miller

**Status: implementation authorized September 14.** Code prototype is the first priority, the presentation landing page is co-primary, and editable Figma frames follow completed code touchpoints. V1 and the submitted Part 1 PDF/Google Doc remain frozen. Creation/deployment status is tracked separately.

## Scope clarification — touchpoint depth, journey breadth

Andrew's latest direction governs the scope: **think through the journey end to end, but prototype selected high-value touchpoints deeply.** A complete navigable application, every intermediate screen, and a fully functioning asynchronous state machine are nice-to-haves, not the acceptance threshold.

Prioritize the field worker's capture/concern and returned photo-request touchpoints; the office worker's pole-photo review and work decision; the compliance record as a second entry into that review; and a concise downstream Audubon touchpoint. Field and office receive the most depth. Conservation remains lower priority.

Use a short journey overview or presenter-controlled scene selection to bridge omitted steps. Seeded scenarios can represent different times in the same concern's life. Label these as demonstration states rather than implying real-time synchronization or a live backend. Build only the local interactions needed to inspect, understand, and discuss each consequential decision.

**Required coherence:** the same pole, evidence, assessment, and work instruction must agree across the scenes shown. Corrections should visibly preserve the original suggestion; a photo request should visibly retain the hold. These can be demonstrated locally without implementing a complete delivery service, event store, or state machine.

**Proposed interaction bar:** retain a clickable prototype, as requested by the brief. Let the audience inspect an AI suggestion, change an assessment, record a work decision, and see an example crew instruction. Scene navigation may bridge the rest. Confirm the precise interactive depth during touchpoint design.

The detailed state rules below remain a design-consistency checklist. Implementation phases are an optional menu to be reduced to the selected touchpoints; they are not a commitment to build every transition. Prioritize rendered touchpoint quality and a coherent walkthrough over infrastructure completeness.

## 1. The experience we are designing

Help a crew and its office supervisor determine whether work on a specific pole remains on hold or may continue, using imperfect AI species identification, field observations, and a recorded human review. Capture the resulting evidence and follow-up work in an accessible compliance record, then demonstrate how selected observations can support conservation use.

The core office experience lives **inside the work order, at the specific pole and its photographs**. A separate compliance table gathers flagged records across work orders and opens the **same pole-review interface**. It is a second entry point, not a replacement for normal work-order review.

AI should clearly attempt species identification and flag probable nesting. The work decision remains the primary action. Strong identification assistance and clear operational decisions are complementary.

## 2. Agreed direction and priority

| Priority | Touchpoint | What it must demonstrate |
| --- | --- | --- |
| Core | IKE device capture and concern | Photo evidence, suggested identity when available, possible nesting, direct human-reported concern, visible work instruction, and request-review action. |
| Core | IKE Office Pro work order → pole → photos | Incoming uploaded photos, prominent AI analysis, correction and notes, uncertainty, and hold-or-continue review actions at the top. |
| Core | Work order compliance table | Flagged records grouped by work order and pole, evidence access, ownership, next action, filtering, and selected-record export. Clicking a record opens the shared pole review. |
| Supporting | Reporting and conservation handoff | Authority evidence preparation and a distinct, approved selection of conservation observations for Audubon. |
| Lower priority | Historical observations map | Species and date filters, mapped observations over time, and access to the underlying evidence and assessment. |
| Optional | Contractor mobile concept | A secondary capture touchpoint for a worker without an IKE device, only after the primary story works. |

Andrew's latest correction governs the architecture: **two office entry points, one review experience and one shared record.**

## 3. Office structure and shared review

### Work-order entry

The supervisor opens a work order, selects a pole, and reviews photographs as they become available through upload. Show capture time and receipt time so delayed photos do not imply a live feed. Offline photos remain unavailable to the office until delivered.

The pole review contains:

- Pole title with previous/next navigation on the same line; work-order context directly underneath.
- Current work instruction, primary **Release hold / Keep hold / Confirm work stoppage** actions, responsible reviewer, and next action in the initial viewport.
- A clear AI-suggested species and a separate probable-nesting assessment, each grounded in the photograph and expressed with uncertainty.
- Photo viewer and photo selection, following verified IKE product references.
- Optional comparison/reference support, correction or rejection of the suggestion, and reviewer notes.
- Original AI output, crew observation, reviewed assessment, decision reason, author, and history kept distinct.
- Delivery and acknowledgment of the instruction back to the crew.

Species correction does not silently change the work instruction. A changed assessment requires a separate, reasoned work decision. Revising a decision appends history and issues an updated instruction.

### Compliance-table entry

The table collects AI-flagged and human-reported concerns. Group by work order, with pole-level records within each group. Confirm whether “order” is a separate parent entity in Office Pro before adding another hierarchy level.

Suggested columns: work order/pole, evidence thumbnail and count, capture date, suggested or reviewed species, nesting assessment, work instruction, review status, owner, and next action. Keep the default columns readable; secondary detail can live in the opened record.

Support useful filters: work order, review status, work instruction, species, date, and owner. Resolved concerns remain available for audit. Multiple photos can support one concern without producing duplicate table rows for each image.

Selecting a row opens the exact same pole-review component used inside a work order, preserving its originating context for return navigation. Changes made through either route update both views and the history.

Export selected or filtered records with explicit scope and a preview. An export records what was prepared; it does not mark external reporting complete.

## 4. Smallest end-to-end demonstration

1. A crew captures a pole photo on the IKE device. AI suggests a possible IKEstrel and flags possible nesting. The crew sees the work instruction and can add an observation or request review without scrolling to find the action.
2. Demonstrate intermittent connectivity: the concern is saved locally, with delivery pending. Reconnection delivers the evidence; office acknowledgment is a separate event.
3. In the work order, a supervisor opens the pole's photos, sees the suggested species and nesting evidence, takes ownership, and records **Keep hold** with a reason and next action.
4. The crew receives the instruction. The compliance table shows the same record, owner, and outstanding reporting task. Opening it returns to the same review experience.
5. Prepare an authority evidence package. The external procedure remains outstanding after download.
6. Demonstrate a separate false-alarm branch: the reviewer corrects an AI suggestion and records a reasoned continuation decision under the explicit authority assumption below.
7. Demonstrate a missed-detection branch: the crew reports a visible concern even when AI flags nothing. It enters the same review and compliance workflow.
8. Close with a selected conservation export; if the core is complete, show the historical map of shareable observations.

The main story should remain short. Edge cases are selectable demonstration states, not a requirement to navigate every branch during the presentation.

### Required evidence-request loop — planning refinement

Keep added device UI minimal. A compact concern strip shows the tentative species, current instruction, and one contextual primary action. Detailed identification comparison, rejection/correction, uncertainty review, and notes belong primarily in Office Pro.

With good connectivity and an available reviewer: crew flags a concern → photos upload → supervisor reviews the pole → supervisor maintains or issues a hold and requests specific additional photos → crew captures and uploads them → supervisor reviews the new evidence and records the next decision. This timely scenario complements the delayed/offline scenario; it does not establish guaranteed real-time review.

On desktop, **Request more photos** is a supporting action that can accompany **Keep hold**. The request specifies the missing evidence and remains attached to the pole's existing concern. On the device, a possible compact presentation is **Work on hold · Office requested photos**, a short instruction, and **Take photos**. Provide a secondary way to report that the requested view cannot be obtained. Do not require the crew to browse species references or complete an identification assessment to respond.

Requests should describe useful evidence obtainable from an appropriate existing observation position, rather than instruct crews to approach or disturb a bird/nest. New photos append to the existing evidence set; they do not overwrite earlier evidence or automatically resolve the request. Distinguish request sent, delivered, acknowledged, evidence uploaded, and office re-review. Uploading photos never releases the hold.

If the pole already has an open concern from previous photos, surface that concern and its latest received instruction, then add fresh evidence to it. Historical photos are context, not current clearance. Once a concern is flagged, the prototype assumes the affected pole remains on hold pending review while the crew may continue to subsequent poles. Whether an AI suggestion alone triggers the hold before the crew flags it remains a separate policy detail.

**Additional acceptance checks:** the same request appears through both office entry points; the crew can capture in response without leaving the pole context; offline request/evidence delivery is accurately represented; new evidence triggers re-review while the hold persists; inability to obtain evidence leaves a visible next step.

**Initial identification research, verified September 14:** [Cornell's Merlin Photo ID](https://merlin.allaboutbirds.org/photo-id/) returns a short list of possible matches. [iNaturalist's photo-similarity update](https://www.inaturalist.org/blog/106449-better-image-matches-photo-similarity-update-to-computer-vision-suggestions) uses visually relevant reference photos, including variation in life stage and appearance. These are useful precedents for optional desktop comparison, not validation of accuracy on utility captures or evidence of an available integration. Our proposed separation of tentative identity, editable assessment, and work instruction is a design inference to test. Further research should examine uncertain/unknown results, correction history, and evidence-quality guidance before finalizing the review UI.

## 5. State and responsibility rules

| Dimension | Distinctions to preserve |
| --- | --- |
| Evidence delivery | Saved locally → delivered; failed delivery remains visible. |
| Review | Awaiting acknowledgment → acknowledged → reviewed; missing evidence and outstanding next actions remain explicit. |
| Identification | Original AI suggestion, crew observation, reviewer assessment, and unknown/unassessable cases. |
| Nesting | Possible nesting evidence is separate from species identity and external confirmation. |
| Work instruction | Hold or continue, with reason, author, timestamp, and revision history. AI confidence never grants permission. |
| Instruction delivery | Decision recorded, delivered to crew, and crew acknowledgment are separate. An offline device must not display an undelivered update. |
| External procedure | Required action, responsible person, and pending follow-up. Preparing/downloading evidence is not filing or approval. |
| Partner sharing | Selected, previewed, and approved conservation output, distinct from utility-internal records and authority reporting. |

Avoid putting all dimensions into competing status badges. Prioritize work instruction and next action; reveal supporting state where useful.

## 6. Historical map and conservation endpoint

The map is a lower-priority reuse of the observation records, with species and date-range filters. Selecting a point reveals capture date, evidence, and whether the identity is an AI suggestion or a reviewed assessment. Repeated sightings remain observations, not inferred counts of unique birds or population trends. Historical evidence never establishes present work clearance.

An internal utility map alone does not complete the Audubon touchpoint. Show a partner-output preview and a downloadable selection that excludes private utility details and uses an explicitly chosen location precision. The prototype should demonstrate these safeguards before describing them as available.

A small static preview of the partner's selected dataset is enough. A partner login system or full conservation portal is outside the proposed scope. All map locations and records should use synthetic demonstration data.

## 7. Alternative considered: review before dispatch

| Approach | Value | Constraint |
| --- | --- | --- |
| Work-order review with owned concerns — selected planning direction | Fits capture and office review, exposes delayed/unacknowledged work, and provides two entry points into the same decision. | Requires an accountable reviewer and a defined fallback when the crew cannot obtain a timely response. |
| Pre-dispatch review — discussion alternative | Could identify scheduling and reporting needs before a crew arrives. | Requires useful earlier evidence or an earlier inspection, neither established by the brief; new field concerns still require a response. |

Pre-dispatch can later consume the same open-concern records. It does not replace stronger species analysis. Retain it as a rationale comparison rather than building another full workflow now.

## 8. Assumptions and evidence still needed

- **Decision authority — confirmed prototype assumption:** Andrew confirms that the supervisor can resolve a false alarm and authorize work to continue on that pole. Record the reason and preserve the original assessment. Unresolved or confirmed nesting concerns remain held pending the required external process. This models the exercise assumption, not verified utility policy.
- **Pole-specific hold and onward work — confirmed working assumption:** Andrew confirms that the affected pole stays on hold while review is pending and the crew can continue working on subsequent poles in the series. Show a concise instruction such as “This pole on hold · Continue to next pole” in the relevant demonstration state. This is an assumption for the exercise, not verified utility procedure or a claim that every subsequent pole is clear. Discuss whether dependencies, access, or work-order rules would instead require holding a larger scope; if challenged, adapt the instruction and hold scope.
- **Offline behavior remains an assumption:** flagged concerns retain the pole-specific hold and onward-work instruction while awaiting delivery. Whether AI itself runs locally or waits for connectivity needs explicit treatment; simulate “analysis unavailable” rather than imply offline inference is established.
- **Product placement — layout reference verified:** the public Office Pro reference check (workspace reference) documents actual pole/photo/form layouts inspected in IKE's 2026 training video. Use these to ground the proposed integration. Andrew authorizes an IKE-branded shadcn desktop concept for missing details; exact existing-product fidelity is not required or claimed.
- **Ownership and timing need validation:** identify the accountable role, coverage when absent, and what the crew does when review takes hours.
- **Sharing needs validation:** utility approval, permitted fields, location sensitivity, and Audubon's useful import format. Use a clearly labeled prototype export format meanwhile.
- **Scenario facts stay labeled:** IKEstrel and the brief's notification requirements belong to the fictional exercise. Do not generalize them into universal legal rules.

These are research questions for the design rationale, not claims of verified operational policy. No new question needs to block delivery of this plan.

## 9. Design and implementation plan after review

The detailed execution process is in V2 agent orchestration and design quality (workspace reference). It governs agent assignments, touchpoint sequencing, quality checks, and editable Figma synchronization. Begin with the device touchpoint once implementation is authorized. Andrew's review anchors are AI uncertainty/reversibility/latency; clear ownership and verifiable work decisions; and simple, understandable UI.

Use Next.js, TypeScript, Tailwind, and shadcn. Code is the design source of truth. Use IKE branding and descriptive “Endangered species identification” naming; no standalone Perch wordmark. The device is the primary field surface. Keep overlays inside its frame and the office experience full-page.

Use existing brand/reference assets as the starting point. Apply the design-taste and relevant frontend, accessibility, and testing skills when implementation starts. Inspect rendered results, including constrained device dimensions, keyboard interaction, and reduced-motion behavior where motion is used.

Proposed local application root: `app/` within this V2 workspace. The paths below are provisional implementation targets relative to that root; they do not exist yet.

| Phase | Deliverable and proposed files | Verification |
| --- | --- | --- |
| 1. Reference and flow validation | `docs/design-decisions.md`, `docs/acceptance.md`; inspect actual Office Pro/device reference images and storyboard both office entry points. | Trace every core requirement to a state or interaction; distinguish verified product patterns from proposed additions. |
| 2. Device touchpoint and small scene contract | `src/components/device-capture.tsx`, `src/app/field/page.tsx`, `src/lib/types.ts`, `src/lib/demo-data.ts`; minimum synthetic data needed for the chosen scenes. | Rendered device review first; mark interactions as working, seeded, or omitted. Verify minimal UI and the hold/photo-request instructions. |
| 3. Primary pole review | `src/components/pole-review.tsx`, `src/app/work-orders/[workOrderId]/poles/[poleId]/page.tsx`; add only the local shared state needed by demonstrated interactions. | Both primary actions visible on load; correction retains provenance and cannot silently release a hold. |
| 4. Figma checkpoint and cross-touchpoint coherence | Editable device and office frames on the dedicated V2 page; local synchronization manifest. | Verify editable text/components and screenshots against matching code scenes; preserve Andrew's canvas edits. |
| 5. Compliance and exports | `src/app/compliance/page.tsx`, `src/components/compliance-table.tsx`, `src/lib/exports.ts`; reuse pole review and the shared store. | Opening from either route gives the same evidence/state; selected exports contain the intended rows; export leaves reporting pending. |
| 6. Conservation endpoint and optional map | `src/components/partner-export-preview.tsx`, optional `src/app/observations/page.tsx`. | Inspect actual export fields and location precision; filters and selected observations agree. |
| 7. Presentation landing page and product imagery | `src/app/page.tsx`, `src/components/presentation/`, `public/images/`; a new V2 page retaining useful content with substantially improved marketing-style presentation. | Review Stripe/Linear references visually; iterate on hero and representative section; use verified UI for imagery; sync editable layout into Figma. |
| 8. QA and walkthrough | `tests/review-flow.spec.ts`, `docs/qa.md`, `docs/walkthrough.md`. | Run configured lint, type check, build, and focused browser tests; visually inspect local and deployed flows and presentation page. |

Configure standard scripts during scaffolding, then run `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, and `npm run test:e2e` as appropriate. Tests should exercise consequential behavior, not mirror every visual component.

Use bounded agent orchestration after the shared record contract and interface boundaries are settled: an independent reference review, isolated surface implementation where safe, and a separate acceptance/visual QA pass. Keep one owner responsible for shared state and integration.

## 10. Repository and deployment isolation

After the plan is reviewed and implementation is authorized:

1. Check authenticated GitHub and Vercel account identities.
2. Create a **new private GitHub repository**, provisionally `ikegps-species-review-v2`; verify availability before naming it final.
3. Create a **new Vercel project** associated only with that repository. Verify project identity before deployment.
4. Publish a reviewable deployment using synthetic data and approved assets. Keep the confidential source brief and private research out of public assets.
5. Verify the live application, route behavior, shared review state, export behavior, and repository/project links before declaring completion.

Do not overwrite, reconnect, or modify the V1 repository or Vercel project. Do not modify the already-submitted Part 1 document. No email or other external messaging is part of this work.

## 11. Coverage against the brief

| Requirement or criterion | Planned evidence |
| --- | --- |
| Detect birds/animals in existing capture | Photo finding and direct human-reported concern within device capture. |
| Identify species and possible nesting | Prominent, distinct AI assessments with uncertainty and correction. |
| Inform crews before touching a pole | Visible instruction and hold/escalation behavior when review or connectivity is unavailable. |
| Supervisor compliance tracking | Work-order pole review plus cross-order table, responsibility, history, evidence, and unresolved external tasks. |
| Audubon conservation records | Selected, approved conservation export; lower-priority species/date map. |
| Problem framing | Shared work decision and accountable follow-through, with timing limits stated. |
| End-to-end thinking | Wrong AI, missed detection, delayed upload, instruction delivery, and external procedure boundaries. |
| Design rationale | Explain the two office entry points, secondary identification tools, and conditional pre-dispatch alternative. |
| Communication and adaptation | Concise walkthrough with explicit assumptions and selectable branches for discussion. |

The original brief specifies a 60-minute session split into 20-minute process, prototype, and Q&A segments, and a 2–4 hour total exercise expectation. Prioritize these high-value touchpoints; the historical map and additional polish should not displace the core flow.

### Requirements recheck after touchpoint-scope clarification

Re-read the original brief on September 14 after Andrew clarified prototype depth. The selected-touchpoint approach is aligned: the brief asks for a clickable demonstration of key flows and decisions, explicitly permits omitted screens, and excludes a complete product or technically feasible AI implementation from evaluation.

The presentation must still make the following understandable even where transitions are simulated:

1. **Timing:** the crew knows what to do before touching the pole. Immediate office response is one scenario, not the default assumption; the brief explicitly allows hours-later review. Show or explain the awaiting-response instruction and who owns the next step.
2. **Imperfect AI:** show one correction and one direct crew-reported concern; rejecting an identity does not by itself establish that work may continue.
3. **Connectivity and pressure:** include a compact saved-locally/awaiting-delivery example and a clear crew next action. No functional network simulator is required.
4. **Compliance:** show what is recorded and what external work remains outstanding. Downloading a table or report is not completed compliance.
5. **Conservation:** demonstrate the data Audubon receives and its usefulness. A utility-only historical map does not alone establish delivery to that stakeholder.

The strongest presentation rationale is deliberate prioritization: depth at the crew/office decision and evidence handoff; a concise downstream conservation endpoint; explicit explanation of omitted transitions. Avoid adding screens merely to imply completeness. Andrew has settled the pending-review behavior for this prototype: hold the affected pole and continue to subsequent poles, under an explicit assumption to validate and discuss with the hiring team.

## 12. Source basis and review checkpoint

Sources read for this plan:

- Original candidate brief PDF and its four rendered pages.
- `prototype-v2-handoff.md`, September 14, 2026.
- `version-two-decision-review.md`, September 14, 2026.
- `ikeGPS-UI-Reference-2026-09-13.md`, treated as historical research requiring visual/current verification before implementation. Its older positioning and broad legal/product assertions are not adopted as established facts here.
- Andrew's current planning discussion, especially the correction that work-order pole review is core and the compliance table opens that same UI.

**Review checkpoint:** confirm or revise this scope before building. The planning document is the only new deliverable at this stage.


## Analysis timing and return to crew — review addition

AI may run at capture if supported (on-device capability remains an assumption), or in the cloud after photos upload to Office Pro. Low connectivity may defer upload and therefore analysis. Cloud analysis can detect a concern before the supervisor opens the photos and mark the pole record as needing review. A crew flag is not a prerequisite for this late-detection route.

Keep upload state, analysis state, review state, and work instruction separate. Awaiting analysis does not mean no concern found. The supervisor verifies the finding and can send a hold instruction or evidence request back to the crew; delivery must be distinguishable from receipt. Additional evidence returns to the same concern for review. Automatic hold behavior for a newly detected cloud concern remains an open policy assumption; do not imply it has been settled. Existing flagged holds remain in force.


## Notification-driven review — core touchpoint

Design goal: shorten the waiting between capture, analysis, human review, and delivery of the work instruction, reducing avoidable pole hold time. This is a proposed benefit to test, not a measured improvement or a guarantee of instantaneous processing.

When analysis completes and identifies a potential concern, Office Pro creates an actionable in-system notification for the responsible supervisor / office admin. Show the work order, pole, tentative concern, current work status, and event time. Opening it takes the reviewer directly into the same pole evidence / species review UI used by the work-order view and compliance table. This is another entry point, not a separate review workflow. Unreviewed concerns remain discoverable after the notification is dismissed.

Track separate states: captured / saved; upload pending / delivered; analysis pending / complete / failed; review needed / reviewed; instruction recorded / sent / received. A received notification is not a completed review. Analysis completion is not verification. An instruction sent is not necessarily received by the crew. Existing holds remain until explicitly changed by the authorized supervisor.

The supervisor can maintain hold, request evidence, or resolve a false alarm and authorize continuation. Notify the crew when an instruction or evidence request is available, preserving attribution and delivery status. Analysis may run during capture if supported or after upload; both routes lead to the same review entry.

Evaluation candidates: analysis-ready to review-start time; review-start to decision time; instruction-to-crew receipt time; duration of avoidable hold; missed/unreviewed concerns and identification corrections. Establish a baseline before claiming reductions. Notification recipient assignment and escalation timing remain implementation assumptions to validate.


## Primary outcome: reduce work-stoppage duration

Reducing work-stoppage time is a high-priority product outcome. The prototype should demonstrate a shorter path from a concern to a verified, accountable work decision reaching the crew: prompt office notification, direct evidence review, focused requests for missing evidence, and clear return instructions. Preserve appropriate holds while eliminating avoidable waiting. Evaluate the workflow by time to review, time to decision, and time until the crew receives that decision; do not claim measured gains without validation.


## Deferred opportunity: pre-dispatch corridor review

After the first implementation pass, consider an office-led entry during work-order planning: select a pole corridor, inspect previously collected pole imagery, surface potential nesting concerns, and open the same shared pole evidence / species review UI. This intersects the existing journey at review; it does not introduce a separate assessment or decision workflow.

Keep this out of the initial implementation scope. Candidate image sources include prior field capture and potentially drone or satellite imagery; suitability for nesting identification has not been established. Validate image resolution, viewing angle, capture date, pole association, and whether evidence reflects current nesting activity before relying on it. Historical observations should not automatically imply current clearance or current active nesting.

Design implication for the first pass: the shared review must be usable independently of a live field capture session. Preserve evidence source and capture time so a later planning entry can reuse it. No drone, satellite, corridor-planning, or ingestion integration is authorized for the first pass by this addition.


Latest priority correction: the clickable prototype AND the visual presentation landing page are primary deliverables. Figma follows stable code UI. The page must visibly cover assumptions, research questions, design rationale, and pole-state transitions governing work. Parallel contributors are authorized; use screenshot review, code checks, and interaction QA for both deliverables.


## Phase-one terminology checkpoint

Use [phase-one-terminology.md](phase-one-terminology.md) for current action labels and the five-state presentation journey. Keep review state, work status, and instruction delivery separate. Earlier dated QA and the submitted Part 1 document remain historical/source records; they are not rewritten to match revised UI terminology.
