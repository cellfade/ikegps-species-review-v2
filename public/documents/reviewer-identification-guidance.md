Public reading copy. Local paths generalized; original working document preserved.

# Optional reviewer identification help

## Brief provenance

Read all four pages and hyperlink annotations of `Source archive/Product Designer - Candidate Finalist - Design Scenario.pdf`. Page 2 names **iNaturalist** and **Merlin Bird ID** as examples of capable but imperfect photo identification. They are plain text, not embedded links. The PDF’s actual URI annotations are email contacts only. The following are independently located official product sources, not “exact URLs supplied by the brief.” IKEstrel is fictional; no source establishes its field marks or supports real identification of it.

## Small optional interaction

Keep **Identification help** collapsed beside the assessment. Opening it should retain the captured photo and reveal three short prompts:

1. **Inspect the evidence:** full photo / detail crop, image date and pole association. A crop is labeled “Detail of Photo 1,” never another capture. Check whether the subject is large and clear enough to assess.
2. **Compare possible matches:** optional references with source attribution. Preserve **Different species**, **No bird visible**, and **Cannot determine**. Rejecting the suggested species does not mean there is no nesting concern. Avoid scored trait checklists or percentages that manufacture confidence.
3. **Review nesting separately:** record visible bird, nest-like material, and any visible activity; **Cannot determine from this photo** remains available. Request another view when needed, without implying that approaching or disturbing a nest is required.

Keep the work instruction separate: identification help does not release a hold. Save the reviewer’s reason alongside the original suggestion. A reference link opens reference material; do not imply Merlin/iNaturalist is integrated or uploads happen automatically.

These are design inferences from the sources, not validated workflows.

## Primary sources checked

- [Cornell Merlin Photo ID](https://merlin.allaboutbirds.org/photo-id/) offers a short list of possible matches. This supports optional comparison rather than one asserted answer.
- [Cornell Photo ID help](https://support.ebird.org/en/support/solutions/articles/48000966224) advises checking date/location and trying a different crop when suggestions do not fit. This supports evidence/context inspection. Its dated species-coverage figure differs from the main page; do not put coverage numbers in the prototype.
- [iNaturalist computer vision overview](https://www.inaturalist.org/pages/computer_vision_demo) explains candidate suggestions and broader taxonomic recommendations when species coverage is incomplete. The article describes historical model development, not current accuracy guarantees. Use broader or unknown identification when evidence cannot support species-level certainty.
- [U.S. Fish & Wildlife Service nest guidance](https://www.fws.gov/story/bird-nests) distinguishes birds, eggs/chicks, nest use, and hard-to-observe nests, and notes expert consultation in uncertain cases. This supports keeping activity assessment separate from species identity; it is not a universal clearance checklist. FWS is supplementary research, not one of the brief’s named ID products.

## Existing asset inventory

| Asset path | What is actually available | Use / limitation |
| --- | --- | --- |
| `V2 workspace/app/public/assets/pole-nest.png` | One illustrative pole-and-nest source, 1024 × 1536 | The current evidence image. Wider and tighter CSS crops remain the same photograph. |
| `V1 workspace/public/assets/pole-nest-illustrative.png` and `src/assets/pole-nest-illustrative.png` | Byte-identical to V2 pole-nest.png | SHA-256 for all three: `5a8fa1994e69cd645e7ff97ee9893475bc71000a2746655a9f96ca63bfa9ebeb`. Not additional evidence. |
| `V1 workspace/public/assets/evidence-ui-crop.png` | Cropped version of the same scene, with old Bird/Possible nest UI labels | Visually inspected; unsuitable as a new captured photo or clean source. |
| `V1 workspace/public/assets/corridor-editorial.png` | Distinct wide illustrative corridor scene with several poles, no visible nest on foreground crossarm | Visually inspected. Could support a clearly seeded other-pole/context scene, not a second angle of Pole 024. No real capture metadata. |
| `V2 workspace/app/public/assets/v1-closing-corridor-illustrative.png` | Different illustrative landscape with bird/nest on foreground pole | Marketing scene already inspected; not a geometrically consistent alternate angle of current evidence. |
| `V1 workspace/public/assets/fictional-bird-reference-views.png` | Two illustrated fictional bird views on a neutral background | Visually inspected; can only be labeled “Fictional scenario reference,” never a verified species guide or captured photo. Prefer primary-source links until reference provenance is suitable. |
| V2 `device-verified.png`, `office-verified.png`, `compliance-verified.png` | Product screenshots containing existing imagery | Presentation evidence, not distinct field photographs. |
| V2 mineral/dimensional/editorial environment images; V1 field/office/hero persona composites | Marketing environments and approximate product scenes | Not pole evidence or new captures. |

## Minimum honest photo-strip plan

Currently there is **one evidence-ready source for Pole 024**, not a multi-angle photo set. Immediately support “Full photo” and “Detail crop” as view modes of Photo 1. For the requested realistic strip, obtain distinct, coherent illustrative captures of the same pole: full structure, crossarm close-up, and second viewing angle, all explicitly simulated. Root should coordinate generation and visual consistency review. Do not silently relabel the landscape illustration as another view of Pole 024.

Other-pole browsing may use a clearly separate seeded corridor image, with its own pole identifier and independent review/work status. It cannot inherit Pole 024’s clearance or evidence. Adding a screenshot crop must not increment a capture count.
