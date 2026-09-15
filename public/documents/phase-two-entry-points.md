# Phase two: additional entry points

Phase two reuses the pole evidence and supervisor review interface.

## Background analysis

A new or updated photo triggers analysis after upload. A finding identifies the pole and photo version, then notifies the responsible reviewer. Duplicate events must not produce duplicate concerns. New evidence reopens review without silently releasing a hold.

## Work-order planning

Creating a corridor work order starts a review of its available photos. Flagged evidence opens the existing assessment. The supervisor can hold the pole or assign an evidence-collection task before dispatch.

## Questions before implementation

- What photo age and image quality are acceptable?
- How is each image associated with the correct pole and corridor?
- Who receives notifications, and who covers an unavailable supervisor?
- How are older results invalidated when photos change?
- What should crews see when analysis is incomplete or a task was assigned before dispatch?

Begin with one background notification and one work-order planning entry. Both converge on the current review and status-linked instruction flow. Drone and satellite imagery remain research options.

## Conservation prototype and expansion presentation

The landing includes a Further exploration section describing two proposed configurable triggers: eligible photo additions/updates in an authorized utility dataset, and work-order creation using existing corridor imagery. These are future settings, not running analysis services. Findings should reuse the pole concern, include capture and analysis dates, and avoid duplicate alerts. A concern outside a work order does not itself describe a work stoppage.

A separate conservation concept uses synthetic regional observations, with species/year filters and a sharing preview. Colors represent observation year. It does not establish migration, abundance or population trends. Compare collection coverage and effort before interpreting spatial differences.

Public sharing would require a separately prepared and approved dataset: broad location, approved identification and uncertainty; exclude private utility identifiers, personal information, internal notes and exact sensitive nest coordinates. Inspect imagery for visual identifiers as well as embedded metadata. A revocable link cannot recall downloaded copies. No public sharing backend is implemented.

References: [iNaturalist geoprivacy](https://www.inaturalist.org/pages/geoprivacy), [eBird Status and Trends](https://science.ebird.org/en/atlasnc/status-and-trends).

## Evaluation and model escalation: rehearsal decisions

These are proposed validation steps and assumptions, not measured results or implemented AI services.

- **Outcome:** measure time from a flagged concern to a decision received by the crew, alongside incorrect releases. Request IKE’s current review and stoppage-duration baseline before claiming improvement.
- **Reviewer correction rate:** record how often people change AI assessments, separating false flags from missed concerns. Disagreement alone is not accuracy; an independently checked sample is needed to establish correctness.
- **Existing workflow baseline:** double-wood detection may reveal useful review volumes, correction patterns and delays. Its accuracy does not establish nesting-detection performance.
- **Missed concerns:** qualified reviewers should independently inspect a sample of unflagged photos. Allow “cannot determine” for inadequate evidence, and retain normal field checks. IKE must identify who is qualified to validate these assessments.
- **Deeper background assessment:** explore a frontier or other more capable model as a second pass, selected through measured nesting performance, latency and cost. More processing or a different model does not guarantee a correct result; models may share blind spots.
- **Reanalysis triggers:** new evidence or an improved model may justify another pass. Repeating unchanged analysis is not an independent validation method. Record photo version, model version, analysis time and the reason for rerunning.
- **Disagreement:** the proposed default is to route conflicting model assessments to supervisor review. Preserve prior results and the work instruction; model agreement or disagreement cannot automatically release held work. Without associated work, create a review item rather than a work hold.

Before implementation, validate notification thresholds, duplicate handling, reviewer capacity, evaluation sample design and who resolves disputed assessments. Compare additional misses caught against additional false flags, review workload and processing cost.

Presentation wording: “We could explore a deeper background check, while keeping human verification and measuring whether it catches additional misses.”
