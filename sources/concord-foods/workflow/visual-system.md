# Film look (approved style)

The look of every frame: the dark twin, the real floor and the consulting layer. Which frame uses which look is in `../../1 story/film brief.md` ("Film-wide rules").

Status: dark twin approved by Aman on 2026-11-13 (raw review in `feedback/step1-style review.md`). Real-floor look and consulting layer (sections at the end) approved by Aman on 2026-11-14 as a starting point; he will refine them from the part videos (raw review in `feedback/step3a-look review.md`).

## Carry-forwards for Step 3 onward

- Aman noticed the photoreal camera image is brightly lit while the twin is dark. He accepted it. Keep the camera feed inside its dark frame and make the cut between feed and twin feel intentional (for example a push into the framed feed), rather than darkening the photo.
- Phone readability is still unchecked. Check a frame at phone width (`snapshot --review` makes a phone strip) at each review.

## Outputs

| File | What it shows |
| --- | --- |
| `renders/01-style-twin.png` | Dark-stage 3D twin of the accepted v01 layout. All machines glow green, the ILFA-2 filler glows red (local fault), the capper glows yellow (starved). Jugs back up on the infeed. The filler-to-capper belt is empty. Downstream jugs still drain |
| `renders/01-style-camera.png` | The v04 synthetic infeed still inside a camera-feed frame. CAM-01 label, 08:42:10 timestamp, detection box on J-017, event toast "Filler stopped E-014" |
| `renders/01-style-ui.png` | Shift report panel over the dimmed twin. OEE 81.7%, line stops by origin: filler 15m, upstream 9m, packer 6m, total 30 min |

All values are authored examples from the v04 execution brief. The infeed photo is a synthetic still, not plant footage.

## The visual system

| Token | Value | Use |
| --- | --- | --- |
| Stage | `#05080c`, floor `#0a0d11` | Background of every frame |
| Ink | `#f2f6fa`, secondary `#9fb0c2` | Text |
| Running | `#2fe39a` | Machine body glow, legend |
| Starved | `#ffc53d` | Waiting because of another machine |
| Fault | `#ff4d5a` | Local fault, top loss bar |
| Product accent | `#5cc8ff` | What the system sees or records: detection box, IDs, material flow |
| Glass panel | `rgba(12,18,26,0.78)`, 1px border `rgba(160,190,220,0.16)`, blur 14px | Every chip, pill, toast and panel |
| Corners | 20px panels, 12px chips, full-round pills | Same in all three frames |
| Glow | Status colour as outer shadow on chips, emissive tint plus floor glow under machines | Same three colours everywhere |

Fonts: Inter (titles 46px, panel numbers up to 150px, body never below 26px except the corner tag) and JetBrains Mono for IDs and timestamps. Both are fetched by the HyperFrames compiler from Google Fonts and cached locally. Free.

Caveat: one small "Illustrative" pill bottom right. No per-frame small print.

## Decisions

1. Photoreal appears only inside the camera-feed frame. The twin is a 3D render. Panels are flat UI. This is the v05 direction proposal under test.
2. Red is the filler (local fault). Yellow is the capper, starved because the filler stopped. Only the origin is red, so propagated waiting is not double counted visually.
3. Cyan is reserved for the product's own eye and records, so it never reads as a machine status.
4. The twin restyles the v01 model at load: dark floor, back walls and overhead pipes hidden, machine bodies tinted by status. `frames-01-03/lib/opening.js` does this itself. New parts use `createFactory(THREE, { look: 'twin' })`, which applies the same material values, and add the status glow themselves.
5. Loss bars: only the top origin (filler) is coloured. The others are neutral grey, so the eye goes to one answer.
6. One project renders all three stills at t = 0.5, 1.5 and 2.5 s with `npx hyperframes snapshot --at 0.5,1.5,2.5 --no-end`. It is a style test, not the film structure. From Step 3 each scene becomes its own sub-composition (the check warns about nested frames here, which is expected for a still test).

## Known limits

- No true bloom. The glow is emissive tint, coloured lights and additive floor discs. Real bloom would need extra Three.js add-on files.
- The twin hero leaves empty floor bottom left. Shot framing will be set per scene in the motion steps.
- The filler is drawn as a rotary turret. Inline versus rotary is still unresolved in the brief.
- The infeed still is the v04 synthetic image. It reads photoreal but it is not Concord footage.

The Step 1 source project was removed in the 2026-11-14 cleanup. The twin model lives in `shared/`; each part reaches it through a folder link (see `../plan.md`). Render new stills from a segment project with `npx.cmd hyperframes snapshot`.

## Real-floor look (Step 3a)

"The plant today." Used in Frames 1 and 4, in camera clips inside a camera-feed frame, and as the start of the Frame 6 reveal. Sample: `renders/03a-real-floor.png` (ILFA-2 infeed, J-017 leaning toward the filler, operator behind the belt).

| Part | Real floor | Dark twin, for contrast |
| --- | --- | --- |
| Machines | Stainless steel, grey frames, blue motors and control boxes | Dark glass bodies with status glow |
| Belts | Black | Dark blue-grey |
| Jugs | Empty before the filler: frosted white, no cap. Filled after it: white shoulder, handle and neck, see-through body showing amber syrup. Blue cap from the capper on | White, lit from inside |
| Empty-jug supply | Plain conveyor bringing empty jugs in from the left edge of the floor onto the infeed. Concord's real empty-jug source is unknown [UNVERIFIED], so no machine is drawn at its start | Same belt in twin colours |
| Floor | Mottled concrete, yellow floor tape around the filler. Crop inside the process area with no exposed cutaway slab edge | Near black, faint grid |
| Safety | Yellow guard rails on the walkway behind the line and along the front aisle, yellow bollards | None |
| Light | Warm overhead light (warm white key, ceiling fittings), soft shadows, warm grey haze in the distance | Dark stage, cool rim light |
| People | Operator in white coat, hairnet, dark trousers, black boots, blue gloves | Small markers or none |
| Text | "At startup" then "During production" top left. The ILFA-2 clock appears only during the separate tipping example. White type with a soft shadow on a light top gradient. On wide shots, neutral cream nameplates with dark charcoal type and thin leaders identify the machines. Aman asked for stronger contrast and clearer placement. Use CS3 and CS5 for the two cooking stations. Place Empty jugs in over open floor. No glass panels, no status dots | Glass panels, chips, glow |

Rules:
1. No product status colours on the real floor. Machine-control exceptions: the ILFA-2 filler has a stack light, green while it runs and red when it stops (Aman asked for it, so the tipped jug visibly stops the filler). The illustrative HMI also has red STOP and green START touch areas, at Aman's request for a manual stop and restart. At Aman's request, yellow exclamation symbols above CS3 and CS5 identify the illustrative cooking-supply wait during the startup camera view. Pair them with Product not ready and clear them when product arrives. They are narrative overlays, not confirmed machine alarms. Nothing else glows; other machine lamps are plain white. The twin's whole-machine status glow starts only at the Frame 6 reveal.
2. No product on the real floor: no rate tags, no detection boxes, no observation cameras (hidden with `showCameras: false`).
3. Same machine geometry and camera space as the twin, so Frame 6 can wipe one into the other.

How to build it: `createFactory(THREE, { look: 'real' })` plus `realFloorStage(THREE, scene, renderer)` for the lights, and `await createOperator(THREE, { rigged: true })` for the local CC0 operator (all in `shared/factory-model.js`). The rigged operator loads `shared/operator/operator.glb` through the matching Three.js r170 `GLTFLoader.js` and `BufferGeometryUtils.js`. Its licence and source links are beside the asset in `shared/operator/License.txt`. The free Standard character pack contains only superhero proportions, so this local clothing variant uses a narrower build. It remains stylized. Call `operator.pose()` from timeline time for repeatable seeking. The original synchronous `createOperator(THREE)` remains available for the existing look sample. The extra real-floor props (rails, bollards, floor tape, light fittings) sit in `factory.realProps`, so the reveal can fade them. The supply belt's jugs are `factory.supplyJugs`; `factory.placeSupply(travel)` spaces them along `factory.supplyPath` moved forward by `travel` metres, ending at the infeed start (-1.4, -2). `factory.makeEmpty(jug)` turns any jug empty and uncapped. The filler stack light is built in `frames-01-03/lib/opening.js`. The startup beat holds the turret and empty jugs until product arrives, with no visible clock or claimed waiting duration. Its HMI wording and first fill are illustrative. The shared filler HMI sits on the front-left face for the illustrated stop and restart route. Its position and STOP/START screen are proposed, not a confirmed Concord control layout. Part A draws the screen locally, with the stop and restart tied to the operator's touches. For the Frame 6 scan line, build one factory per look in two scenes, render both from the same camera and wipe between them. The `twin` look has not been rendered yet; Part C checks it lines up. The sample's source is `look samples/`.

## Consulting layer (Step 3a)

Built like a consulting deck, from Frame 2 on, over the twin's dark palette. Samples: `renders/03a-consulting-layer.png` (Frame 3) and `renders/03a-founders.png` (Frame 2).

Pattern source: Aman's Nashuba Bakery film (`../../../nashuba bakery/Shiftwork-for-John.mp4`). Viewed on 2026-11-14 as frames extracted locally with FFmpeg (one every 3 s, plus close crops of the founders and the pill screens), kept in the session scratchpad and deleted with it. Never uploaded. Audio not reviewed. Patterns taken:

| Nashuba pattern | How Concord uses it |
| --- | --- |
| Small-caps eyebrow with a short rule ("ONE · COST PER LOAF") above every title | `P1 · VISIBILITY`, `P2 · LEARNING`, `HOW IT WORKS`, `RESULTS`, `NEXT STEP` |
| One-sentence action title, top left, key words underlined | Same. Inter instead of Nashuba's serif, to stay inside the approved twin type |
| Formula pills, dashed when missing with a "?" badge, solid with a ✓ badge when video fills them | "What a stop record needs" card |
| One big number beside the chart ("5.6×") | One big callout per data screen |
| A plain line at the bottom ("What's missing: ...") | One takeaway line per screen |
| Cartoon founders with name tags, standing at left beside the agenda | Aman and Adarsh, Frames 2, 5 and 12 |
| Numbered agenda items with small icons appearing one by one | Frame 2 |

Not taken: the cream paper background and brown/gold palette (Concord graphics use the dark twin palette), the bakery photo backdrop, and the company name on the end card.

| Token | Value | Use |
| --- | --- | --- |
| P1 accent | `#6f8cff` (blue) | P1 eyebrow, underlines, P1 pills and badges, takeaway rule on P1 screens |
| P2 accent | `#b28cff` (purple) | Same for P2 |
| Eyebrow | 26 px, bold, letter spacing 0.2em, capitals, 40 px rule before it | Above every title |
| Action title | 56 px Inter semibold, one line where possible, typed on word by word. Key words underlined with a 5 px bar in the section accent | Every screen from Frame 2 |
| Big callout | 200 px number, 38 px label, 26 px source line in secondary ink | One per data screen |
| Pill | 62 px tall, full round. Missing: dashed border, "?" in an outlined circle. Filled: solid accent border, ✓ in a filled accent circle | Stop-record card |
| Takeaway | 40 px semibold, 56 px accent rule before it, 70 px from the bottom | One per screen |

Rules:
1. P1 and P2 accents are never green, yellow or red, and never the product cyan `#5cc8ff`, so they never read as machine status or as what the system sees.
2. A pill flips from ? to ✓ with a short scale pop as the badge fills, in the frame the brief gives.
3. Red stop ticks appear in Frame 3 only, as the brief asks. The one "Illustrative" pill sits bottom right, below the card.
4. Reading only the action titles should tell the whole story.

Founders. Flat cartoon style with a soft floor shadow, drawn as SVG in `look samples/index.html`. Aman: cream patterned shirt, grey trousers, sunglasses pushed up on his hair, holding a syrup jug. Adarsh: maroon polo, navy trousers, waving toward the agenda. Name tags "AMAN" and "ADARSH" only. No logo, no company name. A faint light pool under them separates them from the dark background.
