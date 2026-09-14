# IKE species review — V2 design prototype

Independent design exercise with simulated AI and local state.

## Run

`npm install` then `npm run dev -- --port 3200`.

- `/`: presentation landing page
- `/prototype`: field and office review

## Check

`npm run lint`, `npx tsc --noEmit`, `node --test src/lib/prototype/state.test.ts`, `npm run build`.

## Scope

Demonstrates pending analysis, concern flagging, supervisor assessment, reasoned hold/continue decisions, evidence requests, explicit simulated crew receipt and CSV export. No live AI, field-device connection or external reporting. Product imagery placeholders remain on the landing page.

The prototype and landing page are co-primary deliverables. Existing submitted framing materials are not part of this repository.
