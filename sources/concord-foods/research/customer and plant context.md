# Customer and plant context

Who Andrea and Mike are, what they said they need, what is known about the plant and line, what data exists and its limits, and the source map. Competitor research lives in competitor playbook.md; the film story lives in ../1 story/film brief.md.

**Private project context. Research and local source snapshot dated 2026-11-12.**

This file contains the context needed to continue Shiftwork's Sugar Foods / Concord Foods product-demo project without the originating chat or a particular AI environment. It combines the user's brief, dated customer records, the current data-analysis position, competitor evidence and possible demonstration ingredients. An agent should use the status of each claim rather than treat all content as approved product scope.

## Project brief

**User objective.** Aman wants a very impactful, visually beautiful customer demonstration video, initially for the ILFA-2 line at Sugar Foods / Concord Foods. He wants to show it to Andrea and Mike and test whether they would pay for the proposed product. Willingness to pay is the immediate commercial question. A debate about defensible competitive differentiation is not the immediate deliverable.

**Working startup name.** Shiftwork. Aman and his co-founder Adarsh Kumar are developing a manufacturing-intelligence proposition. The exact customer-facing product name has not been settled. Earlier assistant labels such as AI operations manager, AI operations consultant and AI production loss analyst are descriptive suggestions, not adopted branding. Source U1 and C1 below.

**Core product and three user-stated advantages.** The main experience is a digital shop-floor twin where selecting a machine exposes its downtime intervals, causes and supporting evidence. Cameras offer a non-intrusive observation path across legacy equipment. Operator expertise is captured and codified so it remains useful when a person leaves or forgets an episode. Easy chat retrieval lets operators with different skill levels ask specific questions of the same factory knowledge. These advantages support the twin rather than replace it. Reduced loss and useful production remain intended outcomes, not verified delivery claims. Source U1 and Aman's subsequent production clarifications on this date.

**Latest manufacturing description and model assumption.** Aman describes sugar syrup on this line, including peppermint and unflavoured variants, and remembers a rotating multi-head filler. The October visit account instead distinguishes a rotary juice line from the inline filler. The first model follows the latest rotary recollection provisionally and keeps that component editable. The available process drawing is a whiteboard sketch rather than a dimensioned P&ID. Source facts, conflict and generic equipment references are embedded in the [production source brief](<plant process notes.md>).

## The plant and the audience

### Who the audience is and what they asked for

The October 2, 2026 meeting summary records **Andrea Brulli as president and CEO** and **Mike Harrison as COO** of Sugar Foods. These are dated meeting-record roles, not independently reverified current biographies. Source C1.

The same record says the company has substantial operating data and is good at performance and cost reporting. Its gaps are fast root-cause analysis, the action that should follow and prevention rather than repeated firefighting. Microstops were becoming countable without becoming explainable. The operation relied heavily on institutional knowledge and was beginning a stronger documentation effort. These are recorded customer statements, not results independently tested by Shiftwork. Source C1.

The October 16 plant records describe an existing Ignition effort using available machine tags and PLCs after the previous Redzone relationship ended. Staff wanted feedback about what to fix, train or focus on, with less manual reconstruction. Existing machine data is an asset to use where appropriate. The camera-first ambition does not require pretending that useful Ignition data is absent. Source C2.

An inline filler discussed on that visit was running **half-gallon jugs**. Product and cooking requirements affect its rate. Avoid a generic small PET-bottle or can line being presented as an exact replica. The desired operating outcome includes more saleable output, better first-time-right performance and less recurrence, rather than more charts alone. Source C2.

### What is established about the process

Aman confirmed that **CS3 and CS5 both supply ILFA-2**. Same products was explicitly an initial assumption. The active cooking station for a run, recipe, routing, possible feed overlap and transfer delay remain unresolved. Do not animate both supply paths as simultaneously active without evidence. Source C3.

The whiteboard photo supports a broad preparation or vessel, cooking, intermediate holding or transfer and filling sequence. The Ignition photo includes 6xxx equipment identifiers and utilities or CIP controls. The exact mapping from that image to CS3, CS5 and the exported tags has not been established. Capacities and ambiguous control values must not be invented. Source C3 and original photos in the source map.

Startup waiting for product arrival is explicitly discussed in the original October 16 plant-visit record. In the Adarsh transcript, lines 267 to 275, Tim describes a 07:00 shift start and product reaching the filler around 09:30. He says the elapsed time may include normal processing or waiting for raw materials. He proposes tracking arrival at each kettle and the cooking apparatus, with 08:30 as a possible target if materials, timing and equipment readiness align. These are interview statements, not verified stop-duration measurements or a proven hour of recoverable loss. At line 533, cooking not keeping up is also listed among possible causes of a stop. The record does not establish a specific measured mid-run starvation event or assign the delay to CS3 or CS5. Line 543 mentions a crunched bottle and spill, which does not establish that a jug tipped. Tipping in the film remains illustrative. A lower rate may be appropriate for a SKU or cooking condition. Source C2.

### Current recorded-downtime analysis

**Authoritative local handoff.** The analysis is now consolidated in `concord foods/ILFA DT Data Analysis/README.md` and `ILFA2 shift review.xlsx` (outside this folder). Older separate decoding notes, baseline notes, charts and derived CSVs were removed during user-approved consolidation. Do not send a new agent looking for those old files. Source C3.

| Measure | Current meaning and result |
|---|---|
| Current selected population | 23 shifts after the agreed missing-data, anomaly and low-rate exclusions |
| Current selected fraction | 5,781.0028306 reconstructed counter minutes / 10,950 elapsed minutes = 52.7945464%, usually displayed as 52.8% |
| Earlier gross comparison | 16,866.8260071 / 22,530 = 74.8638527% across 47 complete non-anomalous shifts, before the later low-rate exclusions |
| Superseded intermediate result | 58.0% across 26 shifts, replaced after three additional shifts were excluded |
| What the workbook's rate means | Peak exported rate in the shift, not average output or sustainable machine capacity |

The review covers 60 possible shifts from October 22 through November 10, 2026. The exclusive treatment groups are eight missing or partial downtime windows, five counter-anomaly overlaps, nine negative exported peak-rate shifts, fifteen other shifts with at least 90% counter fraction and peak rate at or below 3 bpm and twenty-three included shifts. Missing rate coverage falls within the missing-downtime group in this dataset. Do not count it twice. Source C3.

Both percentages describe reconstructed counter accumulation over full elapsed shift time in selected populations. Neither establishes physical stopped time, scheduled unplanned downtime, runtime, OEE or recoverable savings. The selected population is not a production calendar. The opening film claim should not convert either fraction into a proven addressable loss. Source C3.

The analysis assumes historical shift starts of 07:00, 15:30 and 23:00, with ordinary lengths of 510, 450 and 480 minutes. No breaks or cleaning periods were deducted. The night beginning October 31 includes the extra clock-fallback hour. Actual run schedules and clock alignment remain unconfirmed. Source C3.

### Data available and its limits

The November 10 exports contain a filler accumulating-counter tag, a separate pack-out counter, a rate-like field, tank-level-like readings and an allow-flash flag. Their meanings and logic are not fully confirmed. Do not add filler and pack-out counters. Do not treat an allow-flash permission as actual fault or stopped state. The cooking exports add CS3 and CS5 measurements and a coarse bottle counter. Source C3.

| Data property | Consequence for the demonstration |
|---|---|
| Paired rows with regular timestamp grids | Strongly consistent with MinMax export windows, although exact export configuration is unconfirmed |
| Different signals' extrema within a window | They need not occur simultaneously; paired values do not establish a physical sequence |
| One-day cooking grids | About 4 minutes 48 seconds between labels over November 3 to 4 |
| Month cooking grids | About 2 hours 24 minutes between labels over roughly October 5 to November 4 |
| Counter resets, plateaus and possible ceiling | Reconstructed fractions depend on modelling choices and unknown counter logic |
| Negative and near-zero rate behaviour | Units, interpolation and data-quality interpretation remain unresolved |
| Missing event evidence | No synchronized footage, verified stop-reason log, alarm history, approved SOP or SKU run history was established in the supplied analysis folder |

These exports support coarse investigation selection. They cannot supply frame-level incident timing, a complete microstop inventory or confirmed physical causes. Finer synchronized history and a known event are required for empirical demonstrations of those claims. Source C3 and [Ignition history documentation](https://www.docs.inductiveautomation.com/docs/8.1/ignition-modules/vision/binding-types-in-vision/tag-history-bindings-in-vision).

## What Andrea and Mike asked for (requirement register)

This register was added from the original local conversations on 2026-11-12. These are recorded customer statements and attributed interpretations. They are not measured Shiftwork results. Source IDs C4 through C7 resolve in the source map below. Keep the essential substance here so the review does not depend on the parent folders.

Andrea asks, "Is deterministic AI available today, though, or is it still somewhat in development?" Source C4, line 172. She also says, "What we're not great at is really understanding root cause and the required action fast enough" at line 97 and "we don't need more colorful dashboards" at line 118.

The distinction matters. Adarsh introduces generated code as deterministic at lines 157 through 160 and claims 95% determinism at line 176. Those are founder statements, not Andrea's requested threshold or validated technical performance. The existing source register also flags those claims as unvalidated. A deterministic calculation can be repeatable while using an incorrect observation or causal premise. A repeated answer is not proof of correctness.

| ID | Recorded customer need | What a borrowed element should help demonstrate | Source |
|---|---|---|---|
| SF-01 | Andrea wants faster RCA and required action, with less leadership time reconstructing episodes | Reach a specific operating decision with the evidence already assembled | C4, lines 89 to 97 |
| SF-02 | Mike wants the reasons behind microstops and prevention; both want forward-looking action | Connect recurring incidents to a preventive action and verify whether recurrence improves | C4, lines 99 to 118 |
| SF-03 | Andrea asks how the proposition differs from Claude, Copilot and ChatGPT | Show plant-specific context and an actionable answer that opens its source evidence | C4, line 152 |
| SF-04 | Andrea asks whether deterministic AI is available today | Make accepted observations, repeatable computations and uncertain interpretations distinguishable | C4, line 172 |
| SF-05 | Andrea recognizes reliance on institutional knowledge and the burden of documentation and gathering OEM manuals | Capture a useful explanation with little effort, review it and make it accessible during work | C4, lines 140 to 147 |
| CF-06 | Product and cooking conditions affect the appropriate filler rate | Keep SKU, production mode and relevant target visible before labelling a loss | C2, Adarsh account, line 36 |
| CF-07 | The plant seeks output, first-time-right performance and gains that hold | Follow a corrective action into recurrence, good output or material-variance verification | C2, Adarsh account, lines 535 to 539 |
| CF-08 | Existing fault information may identify the location without the reason; categorization takes operator effort | Ask for the missing explanation and avoid making operators relabel every event | C2, Adarsh account, line 443 |
| HB-01 | Logan distinguishes running from running well, including carton shape, closure and glue quality | Continue the recovery story through acceptable product quality | C7, lines 96 to 97 |
| HB-02 | Logan says there is no good cause-and-fix log despite downtime data | Retain symptom, evidence, action taken and observed result as a reusable incident | C7, lines 136 to 145 |
| HB-03 | Last-can-to-first-can changeover measurement misses later low-efficiency operation | Show setup, first output, adjustment and return to sustained good output | C6, line 471 |
| HB-04 | Old cartoner settings do not reliably work under changed physical conditions; adjustment amounts are not quantified | Retrieve condition-matched guidance and observable references without inventing knob settings | C6, lines 315 to 327 and 361; C7, lines 116 to 135 |
| HB-05 | Staff already use phone video and slow-motion playback for troubleshooting | Show faster incident selection, explanation capture and later reuse beyond ordinary playback | C6, line 321; C7, line 174 |
| HB-06 | The first Hendler call asks whether live PLC access could interact with the physical world if it went wrong | Make observation, recommendation and machine control visibly separate | C5, line 163 |
| HB-07 | The site-visit representative asks about the cost of continuously monitoring video with AI | Make setup, processing and review effort assessable without invented unit economics | C6, line 484 |

Hendler's current troubleshooting concerns the cartoner stages of erection, flap closure, can insertion, gluing and compression. Logan's response to which adjustment fixes a symptom is context dependent. He suggests multiple viewpoints because stages and adjustments differ. Do not turn this into a proven one-to-one symptom-to-setting mapping. His rough cartoner attribution is an assumption rather than labelled ground truth. Source C7, lines 89 through 145 and 162 through 164.

The brewery site-visit record connects packaging improvement to capacity within the existing operation. Its representative says there is no appetite for another can line and describes SKU mix as making a universal high-OEE target inappropriate. Treat those as interview statements, not a Shiftwork capacity forecast. Source C6, lines 88 through 92. The local November 11 Hendler folder contains run/changeover media and control photographs, but those files were inventoried rather than inspected in this task.

Source qualifications travel with the register. C7's filename says October 28 while its frontmatter says October 31. C6 has generic speaker labels, so use brewery representative where identity is unresolved. C5 merges some founder and customer remarks under one speaker label; do not attribute the subsequent database-abstraction proposal confidently to the customer. These details are requirements context, not instructions to reproduce brewery geometry in the Concord film.

**Proposed trust demonstration for Andrea.** Open one episode's footage, relevant machine history and accepted event boundaries. Show the defined calculation and its version. Re-run that validated calculation on the same frozen inputs and obtain the same numerical result. Separately expose the evidence for any visual classification or causal hypothesis, unknowns and a review path. This is our design inference, not a test Andrea prescribed. It demonstrates bounded repeatability. A separate qualified explanation must say which parts of the proposed system can be deterministic today and which still use model judgment. Even repeatable visual inference can classify incorrectly. Do not confuse consistent output with validated accuracy.

## Proposition, evidence and capability boundaries

The two pillars are Aman's chosen product direction. The following interpretation translates them into demonstrable behaviours without claiming the product already exists.

| Pillar | What a demonstration could make tangible | What remains to establish |
|---|---|---|
| Camera-first, low-intrusion entry | Show the camera view, the monitored region, the first useful detected event and the amount of setup actually needed | Coverage, placement, lighting, object visibility, compute, network, model setup and any context or existing signals required |
| Retained operator expertise | Capture visible work plus the expert's cues, rationale and exceptions; produce reviewed guidance; let another shift retrieve the exact relevant step | Reliability of extraction, the teaching or review burden, appropriate operating conditions and whether another person can use it effectively |
| Improved plant outcomes | Connect one incident to line impact, an owned corrective action and subsequent recurrence or output | Valid baseline, correct line attribution, quality and product context, comparable follow-up and actual commercial value |

Keep these capability levels separate. Retrieving a clip is different from counting objects. Counting is different from recognizing a work sequence. Recognizing a sequence is different from establishing the initiating line event. Identifying the visible trigger is different from proving the physical mechanism. A product can be valuable at several levels without silently claiming all of them.

The camera example preserves event memory and visible recovery practice. The reason an expert selected that response may still require narration, a targeted question, approved documents, maintenance evidence or a test. Camera observation and deliberate expert capture can complement each other. That is a proposed implementation approach rather than a user-approved technical architecture.

## Candidate demonstration ingredients

This is an ingredient library derived from the brief and research. It is not the final storyboard or a prioritized product backlog.

| Capability | Concrete proposed behaviour | Customer question answered |
|---|---|---|
| Recognizable plant view | Navigate known stages and equipment, with camera views explicitly connected to monitored areas | Where is the issue in our operation? |
| Contextual machine state and rate | Show current state, rate against the current product's target and relevant buffers | Is this slower operation legitimate or a loss? |
| Event capture | Record visible interruptions, microstops and manual interventions with evidence | What happened that our generic stop code missed? |
| Time allocation | Separate production, setup, changeover, waiting, cleaning and unexplained periods where supported | Where did the shift time go? |
| Episode reconstruction | Align precursor, stop, response, correction, restart and return to stable output | What started the interruption and how was it resolved? |
| Line attribution | Trace an initiating event through blocked or starved neighbours and buffer effects | Was the loss local to ILFA-2 or caused elsewhere? |
| Pattern discovery | Connect related stop labels, repeated episodes and rate losses across shifts or products | Which recurring problem deserves attention? |
| Condition-matched comparison | Retrieve successful runs or recoveries with relevant product and operating conditions visible | Why is this reference useful now? |
| Standard-work comparison | Compare observed activities with an approved sequence; let an expert correct the interpretation | What differed, and did that difference matter? |
| Knowledge capture and review | Combine event footage, a short expert explanation and supporting documents into reviewed steps | What does the experienced person know that we should retain? |
| Knowledge retrieval | Answer a symptom-specific question with the exact supporting step, clip and applicable conditions | What should the next operator check? |
| Knowledge-gap resolution | Show insufficient evidence or no approved answer, route a focused question to an expert and retain the reviewed response | How does the plant memory get better? |
| Observation reliability | Detect an obscured view, missing stream, inadequate image or clock mismatch and identify the affected evidence interval | Which conclusions can we trust from the available observations? |
| Shift handover | Carry unresolved issues, evidence and chosen actions into the incoming shift | What does the next team need to know? |
| Action and verification | Attach an owner and follow-up measure; compare recurrence and output after the intervention | Did the change work and hold? |

Specific question candidates include the following. They are examples for design, not claims that the available files can answer them.

| Proposed question | Useful answer format |
|---|---|
| How much ILFA-2 waiting began upstream, which station was supplying it and which incidents explain most of it? | Defined time window, loss partition, active-feed context and linked episodes |
| Did a new product format or a shift change explain the performance decline? | Matched comparison, alternative explanations and the evidence supporting each |
| Which brief stops repeated across the last three shifts, and what happened before restart? | Grouped events, total verified loss, representative clips and recovery observations |
| Why does this changeover take longer than comparable successful ones? | Relevant reference runs, aligned steps, the extra wait or activity and expert commentary |
| What resolved this symptom last time under the same conditions? | Source incident, reviewed method, operating conditions, date and observed outcome |
| Did the last corrective action reduce repeat losses? | Comparable periods, recurrence, line impact and limits of the attribution |

## Earlier technical and validation proposals

These ideas were recovered from the earlier technical-scoping response in this conversation. They had not all survived the first condensation. They remain recommendations, not an approved implementation or production requirement. Source U1.

The proposed acquisition design combined cameras with useful existing Ignition signals. A local rolling video buffer would retain the period before and after an event. Lightweight visual detectors or existing machine events would select episodes for deeper video analysis. More expensive reasoning would run on those episodes, followed by structured event records and review. Event selection must not silently make unrecognized incidents disappear from the evaluation.

Placement, field of view, lighting, exposure and object motion matter alongside frame rate. A camera cannot infer a hidden condition simply because footage exists. Poor images, occlusion, lost streams and clock mismatch should be treated as evidence-quality issues. [Basler image-quality guidance](https://docs.baslerweb.com/optimizing-image-quality)

The proposed first technical proof was whether video explains a useful share of losses that machine records leave unexplained. Compare with operator logs and simple synchronized playback. Review randomly selected production intervals as well as flagged clips so missed events can be measured. Assess event coverage, reason accuracy, false alerts, review time, operator burden and whether the finding changes an action. For retained knowledge, test whether another person can retrieve and use the reviewed method under appropriate conditions. These are evaluation ideas, not accepted pilot success thresholds.

The earlier stack review also named Cerrion's OPC UA, MQTT and relay interfaces. They matter for integration or physical response and should not be mistaken for a camera-only intervention path. Broader disclosures and their limits are preserved in the company reports. [Cerrion deployment](https://www.cerrion.com/deployment), [beverage solution](https://www.cerrion.com/solutions/beverage-and-filling)

## What remains open before production

| Question | Current status and implication |
|---|---|
| Exact plant representation | Broad stages and two upstream supply stations are known. Geometry, equipment mapping, camera positions and active routes are not confirmed. |
| Demonstration incident | The tipped-container story is illustrative. Select a customer-approved real episode or explicitly label a synthetic scenario. |
| Available footage | Access was discussed. No synchronized production video has been established in the supplied analysis material. Confirm the usable assets and permissions before upload or reproduction. |
| Expert explanation and standard | No approved event-specific explanation or SOP is bundled. Visible actions do not supply all the operator's reasoning. |
| Product and schedule context | SKU history, appropriate target rates, actual operating periods and clock alignment remain unresolved. |
| Technical architecture | Camera placement, compute, model design, storage, review workflow and optional use of existing signals are unchosen. Vendor stacks are references, not the selected stack. |
| Product scope and commercial offer | No final name, runtime, script, price, pilot package or willingness-to-pay question set has been approved. |
| Production tool | No particular video model, rendering tool or paid service has been selected. Choose it to fit the approved deliverable and available assets. |

These gaps do not prevent proposing a compelling architecture. They do prevent presenting an exact plant replica, a verified causal diagnosis or a measured improvement as established fact.

## Source map and optional original evidence

Essential facts are embedded above. All local paths below are relative to this folder's intended home inside `concord foods/Product Demo`. They are optional evidence references. If only this folder is copied elsewhere, these links may be unavailable without preventing an agent from understanding the project. Obtain the relevant originals before empirical analysis or faithful media production.

| Source ID | Original and scope |
|---|---|
| U1 | Aman's product-demo discussion and supplied co-founder screenshot, compiled on 2026-11-12. The substantive instructions and screenshot contents are embedded in this file. The temporary attachment is not a project dependency. |
| C1 | [First meeting with Sugar Foods, October 2](<../../../notion-mirror/Meetings/First meeting with Sugar Foods (Andrea and Michael).md>). Source for the dated Andrea and Mike roles, customer problems and expectation of Sugar Foods vetting before publication. |
| C2 | October 16 plant-visit accounts by [Adarsh](<../../../notion-mirror/Meetings/Meeting with Tim and Adam - Brockton Concord Food (Sugar Foods) - 16 Oct 2026 vAdarsh.md>) and [Aman](<../../../notion-mirror/Meetings/Meeting with Tim Ryan and Adam - Brockton Concord Foods (Sugar Foods) - 16 Oct 2026 vAman.md>). Source for the half-gallon jugs, product-dependent operation, Ignition work, operational feedback need and camera discussion. Adarsh's account records a signed NDA. |
| C3 | [Current analysis handoff](<../../ILFA DT Data Analysis/README.md>), [shift-review workbook](<../../ILFA DT Data Analysis/ILFA2 shift review.xlsx>), [source register](../../../manu-data-layer/mdl-sources.md) and [decision log](../../../manu-data-layer/mdl-decision-log.md), especially D19 through D23. Source for the current selected population, superseded comparisons, tag limits and Aman's CS3/CS5 confirmation. |
| C4 | [Linked Sugar Foods raw transcript](../../../manu-data-layer/competitive-consolidation-2026-10-24/sugar-foods-linked-transcript.txt). Speaker-labelled source for Andrea's deterministic-AI question, actionable-RCA need, familiar-assistant comparison and documentation burden, plus Mike's microstop/prevention asks. Uses line locations rather than usable timestamps. Founder technical claims at lines 157 to 179 are not validated results. |
| C5 | [Sam Hendler first call, October 8](<../../../notion-mirror/Meetings/Meeting with Sam Hendler (Hendler Family Brewing Co) - 8 Oct 2026.md>). Source for the physical-control concern. Some speaker labels merge founder and customer statements. |
| C6 | [Hendler site visit, October 22](<../../../notion-mirror/Meetings/Meeting with Sam Handler - 22 Oct 2026.md>). Source for effective changeover, changing settings, current phone-video use, existing-capacity needs and video-monitoring cost question. Generic speaker labels limit individual attribution. |
| C7 | [Logan cartoner conversation](<../../../notion-mirror/Meetings/Meeting with Logan (Jack Abbey) - 28 Oct 2026.md>). Source for running well, carton quality, cause-and-fix memory and multiple-view constraints. Filename says October 28 and frontmatter says October 31; date conflict remains unresolved. |

| Optional original | What it contains |
|---|---|
| Whiteboard photograph, recorded filename IMG_3383.HEIC | Broad process sketch. Original is unavailable at the earlier parent-folder path. Use the retained [process source brief](<plant process notes.md>) for the captured interpretation. Exact tag and asset mappings remain unresolved. |
| Ignition photograph, recorded filename IMG_3384.HEIC | Original is unavailable at the earlier parent-folder path. The retained [process source brief](<plant process notes.md>) captures the equipment interpretation. Do not infer capacities or routes from ambiguous labels. |
| [November 10 exports](<../../Data 10 Nov 2026>) | Four original files named `10-13 to 10-27 ILF A Downtime.xlsx`, `10-13 to 10-27 ILF A.xlsx`, `10-28 to 11-10 Downtime ILF A.xlsx` and `Oct 28 to Nov 10 ILF A.xlsx`. |
| [November 4 exports](<../../Data 4 Nov 2026>) | Cooking and counter files named `cs3-1.xlsx`, `cs3-30.xlsx`, `cs5-1.xlsx`, `cs5-30.xlsx`, `bc-30.xlsx`, `dt-30.xlsx` and `temp-30.xlsx`. |
| [Earlier manufacturing-video package](<../../../manufacturing brain video/manufacturing-brain-video>) | An inventory found older briefs, prompts and scripts. Their content and applicability were not reviewed for this handoff. They are not approved instructions for this customer demo. |

The existing source repository distinguishes private meeting material from other files. Do not assume this new folder is excluded from version control. No commit, push, public sharing, external upload or customer delivery is part of creating this handoff.
