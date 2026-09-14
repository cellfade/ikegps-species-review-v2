Public reading copy. Local paths generalized; original working document preserved.

# Landing comparative taste audit

September 14, 2026. Bounded refinement of the four-section V2 presentation, with code as the source of truth.

Design read: a product designer’s case study for a hiring panel, with an editorial, product-led language. Preserve Instrument Sans, IKE indigo, mineral surfaces and orange actions. Taste dials: variance 6, motion 2, density 4. Native CSS implementation; references are aesthetic influences, not claimed design-system integrations.

## What the comparison actually showed

| Before | After | Reason and source |
| --- | --- | --- |
| Desktop hero stacked all copy at left, leaving its upper-right area empty and pushing the product image down. | Split headline and action block; larger orange primary action; shorter supporting sentence. | V1 pairs its large headline with supporting copy and a primary action. The revised hero brings product evidence earlier without reducing its scale. |
| Three equal principle columns used the same orange top border and headline/body structure. They felt like generic feature marketing rather than reasoned design decisions. | One clear introduction at left, three numbered decisions in a continuous reading column at right. | Customer.io activation reference makes sequence and next action explicit. Adapt the reading logic, not the dense application styling. |
| Section headings and descriptions always stacked, repeating the hero’s rhythm. | Journey and validation introductions pair heading and explanation on desktop; stack naturally on mobile. | V1 and Stripe use varied editorial alignments around broad media. This reduces repetitive vertical lead-ins. |
| Device and office started on the same baseline despite markedly different image proportions; the field tile left a conspicuous blank shelf below. | Field story begins slightly later on desktop, producing a deliberate stagger. | V1’s field/office story varies the media rhythm. The stagger is removed on mobile to preserve reading order. |
| Image enlargement existed on the screenshot, but the caption merely said “Open image to inspect”; mobile hid that cue. | Every caption includes an actual “View full size” link on desktop and mobile. | Tiny full-desktop captures cannot communicate detailed decisions at phone width. Explicit enlargement is more honest than pretending all screenshot text is readable. |

## References inspected

- [V1 live landing](https://perch-ikegps.vercel.app/): browser screenshot and page structure inspected. Read its local `docs/design/DESIGN.md`. Borrowed the split hero and preserved its type/palette. Did not reuse the generated hardware/UI imagery because it depicts older, approximate interfaces.
- [Stripe Billing](https://stripe.com/billing): official source content and desktop browser screenshot inspected. Strong action hierarchy, large product demonstration and varied section roles. Its animated media was between frames during capture; no claim to have inspected every animation state. No borrowed assets or Stripe colors.
- [Taste Skill](https://www.tasteskill.dev/): desktop screenshot and official page content inspected; local design-taste-frontend skill read. Material backgrounds and overlapping UI create depth. Retained that principle while keeping the actual screenshot pixels proportional and unwarped.
- [Linear](https://linear.app/): official homepage content read through web. The browser redirected to account login, so this audit does **not** claim a current visual inspection of its marketing homepage. No decision rests on an unobserved layout.
- Customer.io local reference: read `customerio-activation-lab/README.md` and `src/styles/tokens.css`; visually inspected `customerio-activation-desktop.png`. This path is an activation/conversion product prototype, **not a marketing landing**. Its strongest relevant trait is clear sequencing and a singular next action. A bounded search did not locate a separate Customer.io marketing landing source; this is a reference limitation.

## Retained deliberately

Four sections, open embedded prototype, selected touchpoints, evidence-request loop, pole-specific hold assumption, supervisor ownership, qualified AI claims, and photographic close. No invented research outcomes, UI, or extra sections. No new motion; existing reduced-motion rule retained. The photographic footer remains the previously approved V1 treatment, an explicit preservation exception to the skill’s default single-theme preference.

## Remaining judgment

The imagery now feels cohesive, but the office view appears twice. Use a fresh compact review-modal capture for the dedicated office detail while keeping the broader work-order context in the hero. That would add information rather than repeat the same screenshot. Root is coordinating that refresh; no assets changed in this pass. Avoid adding more generated decoration. Product evidence is the strongest visual material.

The mobile office and compliance images remain summaries. Their full-size links are necessary. The field capture is legible at its natural product proportions.

## Verification

- Scoped ESLint passes for `landing-page.tsx`.
- Desktop hero, principles, closing composition and mobile hero/principles/product caption inspected visually in Chrome.
- Mobile document width equals scroll width (375 CSS px in final capture), four top-level sections, all images loaded after visiting lower page content.
- Embedded prototype still loads automatically with role controls; its implementation is unchanged by this pass.
- No asset, global, prototype, dependency, or Figma edits.

Desktop after (workspace reference) · Mobile after (workspace reference)

Earlier comparison evidence: Desktop before (workspace reference) · Mobile before (workspace reference).
