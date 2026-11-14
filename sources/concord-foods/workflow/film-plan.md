# Film plan

The animated film (about 3:26) is built here in small steps. This plan is the work tracker: which step is next and what each step reads and produces. The story itself is in `../1 story/film brief.md`; this file never repeats it.

Layout: `hyperframes/` holds only the installed video tool. Each version of the film has its own folder (`v01/`, later `v02/`), containing its look (`style.md`), segment sources (`frames-01-03/` and so on), `renders/` and `feedback/`. Paths below are inside the current version, `v01/`.

The film is split into six parts, A to F, one build session each (table below). Three things tie them together:
- **Rough cut.** `renders/rough cut.mp4` is always the full film. Each part shows its own render once it has one, otherwise a placeholder card per frame. `rough cut/film parts.js` lists the parts, frames, timings and status; `rough cut/build rough cut.mjs` joins them; `rough cut/index.html` is the placeholder composition (re-render it only when the storyboard changes).
- **Review page.** `review page.html` plays the rough cut, jumps to any frame and groups Aman's timestamped notes by part, ready to paste into that part's session.
- **Shared model.** `shared/` holds the 3D twin model and Three.js used by every part. Only the look step (3a) changes it. A part folder reaches it through a folder link, because HyperFrames cannot read files outside the part folder. Create the link from `v01` in PowerShell: `New-Item -ItemType Junction -Path "<part folder>\shared" -Target "$PWD\shared"`, then import `../shared/...` from the part's `lib/`. Never copy the model into a part. For a part that loads a GLB, render from the part folder with `hyperframes render .. --composition "frames-01-03/index.html"` (using the installed wrapper), so `v01` is the asset root. The renderer rejects a shared GLB through an outside-root junction; checks and snapshots accept it.

Each step runs in its own fresh session and ends with something Aman reviews (an MP4 or PNG). Building everything in one session fills the context window and the output gets worse.

## Rules for every step

1. Fresh session per step. Read `../README.md`, `../agents.md`, this plan and only the inputs listed for the step.
2. Do one step, then stop and ask Aman to review. Do not start the next step.
3. Before ending, update the status table, add one line to the decision log and keep the step's `notes.md` current. A part step also sets its status, render file and frame start times in `rough cut/film parts.js` and runs `node "rough cut/build rough cut.mjs"` from `v01`, so Aman reviews the part inside the full film.
3a. A part session may take several rounds of Aman's notes. It stays on its own frames. Notes about the whole film or the joins between parts go to the main film session.
4. Aman reviews renders, never code. Save his words unchanged in `v01/feedback/` before acting on them. Give him 3 or 4 plain yes/no questions to answer.
5. A rejected step is redone. Nothing downstream starts on a rejected look.

## Look (approved)

Dark stage. A well-lit 3D twin of the line is the hero; whole machines glow green (running), yellow (waiting) or red (local fault). Product screens are dark glass panels floating over the twin, with large type and few words. Camera views appear only inside a camera-feed frame. One small "Illustrative" tag; no per-frame small print, no startup branding. Colours, fonts and decisions: [v01/style.md](v01/style.md). Reference renders: `v01/renders/01-style-*.png`.

## Steps

| # | Step | Read | Output | Status |
| --- | --- | --- | --- | --- |
| 1 | Style frames | | `renders/01-style-*.png` | Approved 2026-11-13 |
| 2 | Rough cut, review page and shared model folder | | `renders/rough cut.mp4`, `review page.html`, `rough cut/`, `shared/` | Done 2026-11-14 |
| 3 | Part A · Frame 1: cold open on the real floor (real machine colours, no state colours) | `style.md`, brief "Film-wide rules" | `renders/part A cold open.mp4`, source `frames-01-03/` | **Draft 7 approved by Aman 2026-11-14.** Yellow CS3/CS5 exclamation symbols and clearer captions identify startup supply waiting before the separate tip and HMI stop, repair and restart. Part A is 20 s. The 3:26 rough cut includes it with retimed placeholder cards. Check passed with zero errors and all 24 contrast checks. Startup has no clock or wait-duration claim. Old twin-colour draft kept until Aman OKs deleting it |
| 3a | Add the real-floor look and the consulting layer (eyebrows, action titles, P1/P2 colours, missing-piece pills, illustrated founders) to `style.md`, with one sample still each | Brief "Film-wide rules", Nashuba film `../../../nashuba bakery/Shiftwork-for-John.mp4` (watch locally only) | `style.md` sections, `renders/03a-*.png`, source `look samples/` | Approved 2026-11-14 as a starting point; Aman will refine it from the part videos |
| 3b | **Competitor visual reference board.** Open the best assets linked in the playbook ("Exact assets to browse"): Cerrion, Invisible AI, Factbird, Retrocausal, Fabrico, MachineMetrics, Augury, L2L, and the rotary-filler videos in `footage search.md`. Capture 2–4 real frames each with timestamp and technique. Map them to Frames 2–12 | `../2 research/competitor playbook.md`, `../2 research/footage search.md`, `../1 story/film brief.md` (storyboard only) | `reference/board.png` (contact sheet) and `reference/board.md` (frame → reference → what to borrow) | **Paused, not approved.** Board built (27 frames); Aman stopped it to save usage. Part sessions may borrow from it. Review: `feedback/step3b-reference board review.md` |
| 4 | Part B · Frames 2–4: founders and agenda, P1 visibility (real 53%), P2 learning (three shifts) | Brief storyboard, board | `renders/04-problems.mp4` | In progress in a separate Part B chat. Frames 2 to 4, 46 s at film time 0:20 to 1:06. Stop for Aman to review the render |
| 5 | Part C · Frames 5–7: bridge, real-floor-to-twin reveal, flow and buffer drain, shift report with cursor click | Brief storyboard, "Full-shift flow and report contract", "Whole-machine supply-chain presentation", board | `renders/05-twin-report.mp4` | Pending |
| 6 | Part D · Frames 8–9: camera learns the fix (E-014), ask the factory | Brief storyboard, ledger, identity contract, sample questions, board | `renders/06-learn-chat.mp4` | Pending |
| 6b | **Story detail pass for Frames 10–12** with Aman, in a story session (not a build session) | Brief storyboard | Updated brief | Pending. Aman asked for more detail before these are built |
| 7 | Part E · Frames 10a–10d: non-intrusive, tacit knowledge codification, easy retrieval, you own it | Brief after 6b, handwritten page 3, board | `renders/07-how-it-works.mp4` | Pending |
| 8 | Part F · Frames 11–12: after several shifts, the ask | Brief after 6b, board | `renders/08-results-ask.mp4` | Pending |
| 9 | Assembly and sound: join approved parts (the rough cut, at delivery quality), narration from `../1 story/narration script.md`, voice (Aman's recording or local TTS), free-licence music, end card, 1080p | All renders | `renders/final.mp4` | Pending |

Segments are built silent to the brief's provisional timings. Keep every beat as a named timeline label (see `v01/frames-01-03/notes.md`, "How retiming works") so Step 9 can retime to the voice by changing numbers. Reference frames are for borrowing patterns (composition, pacing, reveal technique), never another company's footage, UI or branding.

## Tools

| Tool | State |
| --- | --- |
| HyperFrames 0.9.43 | Installed in `hyperframes/` (`package.json`, `package-lock.json`, `node_modules`) and nothing else lives there. From a segment folder such as `v01/frames-01-03`, run it by path in PowerShell: `& "..\..\hyperframes\node_modules\.bin\hyperframes.cmd" check`. Do not use plain `npx hyperframes`; it would fetch a different version. Telemetry off. Skills installed for Claude Code. Rendering needs internet (GSAP and fonts load from CDNs) |
| HyperFrames registry | About 450 ready-made transitions, chart animations, titles and camera moves. Search it (`hyperframes-registry` skill) before hand-building an effect |
| Three.js | The 3D twin. Model code in `v01/shared/factory-model.js` |
| Node.js 26, FFmpeg 9 | Installed with winget |
| Blender | Not installed. Only if one hero shot needs better lighting after Step 5 |

Never use `hyperframes publish`, `share`, `cloud` or `auth`; they upload to HeyGen. No paid tools, stock or AI video.

## Decision log

- 2026-11-14: Aman said "okay this looks good. we can move ahead" and explicitly requested handoff to the director to create a session for further frames. Part A draft 7 is approved. Raw words are saved in the opening feedback file.

- 2026-11-14: At Aman's request, added yellow exclamation symbols on CS3 and CS5 during the cooking camera view and clearer waiting captions. Part A draft 7 and the 3:26 rough cut are updated. Timing is unchanged and render approval remains pending.

- 2026-11-14: Aman accepted the startup proposal with "okay". Implemented the six-second supply-waiting lead-in and rendered Part A draft 6 at 20 s. Rebuilt the 3:26 rough cut with synchronized placeholders. Render approval remains pending.

- 2026-11-14: Verified upstream-product startup waiting in the October 16 original transcript, lines 267 to 275 and 533. Proposed about 6 s of startup waiting before the separate tipping example. Draft 5 remains current and unapproved; no render changes made.

- 2026-11-14: At Aman's request, replaced the post-tip pause with an earlier tip and HMI stop, repair and HMI restart sequence. Added an accessible illustrative shared HMI and checked the near-side route. Part A draft 5 and the 3:20 rough cut are rendered; approval remains pending. Frame 1 in the brief reflects this requested sequence.

- 2026-11-14: Applied Aman's draft 3 notes and follow-up. Moved the operator to the near side without walking, fixed hands down at frame zero, added contrasting CS3/CS5 labels and filled the frame with shop floor. Rendered Part A draft 4 and rebuilt the 3:20 rough cut. Approval remains pending.

- 2026-11-14: Aman replied "ok" to the exact free asset and r170 loader download request. Added the local CC0 operator and incorporated the separately authorized comparison changes in Part A draft 3. Rendered at 1080p30 and rebuilt the 3:20 rough cut for review; approval remains pending.

- 2026-11-14: Confirmed the existing shared supply belt and style rules; made shared filler-infeed jugs empty and uncapped in both looks. Quaternius Standard character and animation packs verified as CC0, listed at 122 MB and 15 MB; downloads await Aman's yes.

- 2026-11-13: Film built step by step in fresh sessions, at Aman's request.
- 2026-11-13: Voice and music moved to the last step; segments are silent.
- 2026-11-13: Look approved (Step 1). Aman accepted that the camera image is brighter than the dark twin.
- 2026-11-13: Opening built as one continuous 3D shot. Aman prefers it to a cut made from the v04 photos, which he rejected (bottles slid as one pasted image, operator was a silhouette).
- 2026-11-13: Local AI video (FramePack) tested and rejected: melting jugs, 832x480, about 20 minutes per second of video, no control of story beats. Deleted.
- 2026-11-14: Hyper-realistic footage ruled out (no plant footage; free stock and YouTube clips unsuitable or copyrighted). Goal is the best possible animated film.
- 2026-11-14: Added Step 3b. The competitor research was captured as text and never turned into visual references, so build sessions invented their own look.
- 2026-11-14: Correction. The opening was wrongly logged as approved; Aman has not approved it. Step 3 awaits his review.
- 2026-11-14: Folder restructured into `1 story`, `2 research`, `3 film`, `old prototype`; change logs removed from all documents.
- 2026-11-14: `3 film` split into `hyperframes/` (tool only) and `v01/` (this version of the film) so later versions get their own folder.
- 2026-11-14: Story approved by Aman ("Approved, save it"): cold open, two problems (P1 visibility, P2 learning), solution, how it works, results, ask. About 3:20. Best-practices research in `../2 research/storytelling best practices.md`.
- 2026-11-14: Two looks. The opening shows the real floor in real machine colours; the twin's state colours start at a scan-line reveal in Frame 6. The current opening render must be redone.
- 2026-11-14: Consulting layer added at Aman's request: P1/P2 eyebrows, action titles, missing-piece pills that flip from ? to ✓, patterns borrowed from Aman's Nashuba Bakery film.
- 2026-11-14: Founders appear as illustrated characters (Nashuba style), not phone video. Voice-over removed for now; lines written later.
- 2026-11-14: The real 53% recorded filler downtime (ILFA2 analysis, 23 shifts) replaces the authored 81.7% OEE. Always "downtime recorded", never OEE. Its split by reason is illustrative.
- 2026-11-14: The operator no longer types the cause. The camera learns the fix from video and marks it "Learned from video".
- 2026-11-14: SOP/EHS frame cut. Early-tip alert moved into Frame 11; step check is one line in Frame 10c.
- 2026-11-14: How-it-works expanded to four beats: non-intrusive (PLC, sensors, OEM drivers ruled out), tacit knowledge codification, easy retrieval, "you own it". Aman kept "You own all of it"; check against Adarsh's data workstream before sending.
- 2026-11-14: Frames 10–12 approved in outline; Aman wants a detail pass before they are built (Step 6b).
- 2026-11-14: Film split into Parts A to F, one session each, at Aman's request. A full-length rough cut with placeholders and a local review page let him comment on any moment; parts swap in as they render. Two or three parts in flight at a time, after the look (3a) is approved.
- 2026-11-14: 3D twin model moved to `v01/shared/`, reached from each part by a folder link, so parallel part sessions use one copy.
- 2026-11-14: Step 3a approved by Aman as a starting point ("to begin with, this is okay. Let's start working on this"). He will give look feedback on the part videos, since stills alone tell him little. Raw words in `v01/feedback/step3a-look review.md`.
- 2026-11-14: Step 3b board built (`v01/reference/`) and paused, not approved. Aman: "let's stop it for now ... They can just borrow from it." Part sessions may use it as optional input.
- 2026-11-14: Part A redone on the real floor (shared model, look 'real'). J-017 now falls forward toward the filler so it reads without a detection box; the stop is shown by the turret stopping and the queue, not by colour.
- 2026-11-14: Part A draft 2 at Aman's request: machine labels on the wide shots, empty jugs into the filler, filler stack light green then red. The last two are exceptions to the real-floor 'no status colours' rule, asked for by Aman. Empty-jug supply and a more real operator need shared/ changes, raised with the main film session.

- 2026-11-14: Compared the two local opening renders using extracted frames and 0.2 s action sequences, without real-time playback. Proposed camera, lighting and action-visibility changes only; Aman has not approved either opening or these suggestions. Operator work remains with its existing chat.

- 2026-11-14: Aman said, word for word, "yes lets incorporate the good things". The four comparison changes are authorized for incorporation. Coordination with the active operator chat is pending; no render approval is implied.

- 2026-11-14: Aman explicitly permitted the relay with "Yes, send the changes". Sent his exact incorporation words and the four camera, lighting and pacing changes to the active operator chat for its next Part A render. Render approval remains pending.

- 2026-11-14: At Aman's request, the director opened a separate Part B build chat for Frames 2 to 4 after the Part A handoff. Part A remains unchanged. Part B must stop for render review.
