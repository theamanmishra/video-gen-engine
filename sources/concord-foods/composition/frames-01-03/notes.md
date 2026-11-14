# Part A cold open

These notes explain the current source, evidence, checks and local rendering. The story lives in `../../../1 story/film brief.md` and the look in `../style.md`.

Status is **draft 7 approved by Aman on 2026-11-14**. He said "okay this looks good. we can move ahead" and explicitly asked to send the result to the director chat, which will create the session for further frames. His complete words are saved unchanged in `../feedback/step3-opening review.md`. Part A work is complete. The director owns the next part.

Output is `../renders/part A cold open.mp4`. It is 20.000 s at 1920 by 1080, 30 fps and 600 frames, with no audio. The full rough cut is 206 s. Parts B to F remain placeholder cards. The earlier twin-colour sample and unused still remain until Aman permits deletion.

## What happens

| Beat | Seconds | On screen |
| --- | --- | --- |
| Startup | 0 to 2.1 | Filler and empty uncapped jugs wait. Operator stands at the illustrative HMI with hands down. Waiting for cooking supply |
| Cooking view | 2.1 to 4.4 | Camera moves toward cooking and transfer while the operator looks upstream. Yellow exclamation symbols identify CS3 and CS5 with Product not ready |
| Product arrives | 4.4 to 6 | HMI changes to Product ready. Operator touches START around 4.95. Filling begins at 5.05 and the operator returns to the infeed |
| Production | 6 | A separate production view begins. During production distinguishes the second example |
| Push and lean | 8.1 and 8.8 | Camera settles on the infeed and accessible HMI before J-017 leans |
| Tip and land | 9.2 and 9.43 | Empty uncapped J-017 tips. The filler still runs |
| React and stop reach | 9.4 to 10.9 | Operator immediately follows the near aisle to the HMI |
| Stop | 11.18 | Left hand touches STOP. Turret decelerates and stack light turns red |
| Stop caption and fast-forward | 11.3 and 11.38 | Stopped at the HMI. Clock advances through the illustrative 54 s stop |
| Return and reach | 11.45 to 12.95 | Operator returns to the jug along the clear route |
| Upright and repair end | 13.12 to 13.75 | Jug rises and operator lowers their hands |
| Return to HMI | 13.85 to 15.35 | Operator goes back to restart without an idle pause |
| Start touch and resume | 15.65 and 15.75 | Right hand touches START. Filler restarts and stack light turns green |
| Fixed | 16 | Fixed. 54 s. Clock reaches 08:43:04 |
| Pullback and labels | 16.7 to 20 | Camera returns to the process view. CS3, CS5 and other machine labels return |

## Evidence and limits

The October 16 original plant-visit transcript confirms startup waiting for upstream product. Tim describes a 07:00 shift with product around 09:30 and says the causes and intermediate arrival times need investigation. Cooking not keeping up is also one possible stop cause. See `../../../2 research/customer and plant context.md`, source C2, original Adarsh transcript lines 267 to 275 and 533. A crunched bottle at line 543 does not establish a tipping incident.

Yellow exclamation symbols identify the cooking-supply wait during the cooking camera view and clear at product arrival. They are illustrative story cues rather than machine alarms. Their screen positions follow the machines and they hide near frame edges or the heading. The local registry had no suitable warning symbol, so these are simple editable SVGs in the existing overlay.

The startup scene has no clock, wait duration, percentage or savings claim. It does not assign a fault to CS3 or CS5. Its HMI position, screen and manual start action are illustrative and do not establish an OEM interlock or operating procedure. At startup and During production separate the two moments. The E-014 identity and 54 s clock belong only to the tipping example. The Illustrative tag remains visible.

## Source choices

All beat times live in `window.BEATS` in `index.html`. The GSAP timeline and `lib/opening.js` read the same object. Every clip spans 20 s. Retiming requires updating the beat times and composition durations together.

The single shared factory and operator remain in `../shared/`. Part A reaches them through its junction. The real-floor look uses warm concrete, stainless machines, a neutral infeed edge light and a darker rear wall. The camera fills the frame with the process floor. The side wall is hidden to avoid apparent jug collisions and exposed slab edges.

Cream nameplates with charcoal 34 px type label CS3 and CS5 separately. Empty jugs in sits over open floor. Machine names are visible on the production wide views. Captions are 64 px, clock 38 px and the Illustrative tag 28 px. Whole-machine state colours begin in Frame 6. Part A only uses the user-requested machine stack light and HMI controls.

The near-side route passes the filler front-left corner through x/z points (1.02, -1.39), (0.8, -0.95), (0.8, 0.5) and (2, 0.5). The startup journey reverses this same route. The operator starts at the HMI, then returns to the infeed after supply arrives. The later stop, repair and restart use the same clear aisle, away from rear pipes.

Bone tracks, hand targets, machine states and clocks are sampled directly from time. The operator is the local CC0 rigged human with a locally added coat, hairnet and gloves. The walk uses selected animation tracks. Both hands follow the jug during repair and one hand touches each HMI control. Licence and source details sit beside the shared GLB. No private images or customer details were uploaded.

Before startup, the turret is stationary and its jugs are empty. The outfeed is empty. Filled uncapped jugs appear after startup, then the capper adds caps. The six-second cut introduces a separate running production moment. Supply waiting does not cause the later tip.

## Checks

The current scene check passed with zero runtime or layout errors and all 24 contrast checks passing. Five nested-structure warnings remain for overlay groups. The film_silent warning is expected because segments stay silent until Step 9.

Startup state checks at 0.5, 3.3 and 4.95 s found no turret rotation, no filled turret jugs and no visible clock. By 5.5 s the turret was moving and jugs were filling. At 6.5 s During production and its clock were visible. Stop and restart clocks match 08:42:10 and 08:43:04. Out-of-order seeking returned identical bone matrices and canvas pixels.

The cooking cues were inspected in full-resolution source frames at 2.7, 3.3 and 4.1 s, with disappearance checked at 4.6 s. The final encoded 3.3 s frame confirms both yellow symbols and Product not ready. The updated Part A remains 20.000 s at 1080p30 with 600 frames and no audio. The rebuilt rough cut remains 206.000 s. The preceding full sequence also had beat and 360 px phone sheets inspected. Encoded waiting, supply/start and restart frames at 1.5, 5.5 and 15.65 s were inspected. Hardware GPU screenshot capture produced the verified 20 s MP4. No real-time playback, audio listening or physical-phone review was done. The HMI lettering is small at phone size, so large captions explain the action.

The rebuilt rough cut was verified at 206.000 s, 1920 by 1080, 30 fps and 6180 frames with no audio. Decoded frames confirm Frame 2 begins at 20 s and Frame 12 remains present at 205 s, with synchronized burned-in clocks.

The unchanged near-side route was previously sampled at 0.02 s intervals against the filler body expanded by 0.23 m, with zero root-position crossings. This is a coarse body-clearance check rather than full skeletal collision simulation.

## Known limits

The human and coat are stylized. Jug transfer into the turret is partly hidden by the guard and is not mechanically simulated. Inline versus rotary remains unresolved in the brief. The actual HMI position and controls are unconfirmed. The scene illustrates the reported supply-waiting issue without claiming a measured mid-run starvation event.

## Local rendering

From `3 film/v01/frames-01-03` in PowerShell, use the installed wrapper.

```
& "..\..\hyperframes\node_modules\.bin\hyperframes.cmd" check --json --timeout 30000
& "..\..\hyperframes\node_modules\.bin\hyperframes.cmd" snapshot --review -o <session scratch folder>
& "..\..\hyperframes\node_modules\.bin\hyperframes.cmd" render .. --composition "frames-01-03/index.html" -q delivery -o "..\renders\part A cold open.mp4"
```

The renderer needs `v01` as its asset root because its file server rejects a GLB through a junction outside the part root. This preserves the single shared asset. A missing root index warning can appear while recording tool history, but the explicit composition renders correctly. GSAP and fonts load from their existing CDNs.

When storyboard durations change, update `../rough cut/film parts.js`, update the placeholder composition duration and regenerate `../renders/rough cut placeholders.mp4`. Then run `node "rough cut/build rough cut.mjs"` from `v01`. This keeps placeholder clocks and chapter offsets synchronized. Tool state stays in `.hyperframes/`. Do not remove it without Aman's OK.
