/*
  The list of film parts and their frames. The rough cut, its build script and the review page
  all read this one file. The story itself lives in 1 story/film brief.md; this file only holds
  the frame names, short placeholder beats and timings.

  When a part session renders a new version of its part:
    1. set its status to "draft" (or "approved" once Aman approves it in his own words),
    2. set render to the file name in v01/renders/,
    3. set each frame's "at" to the second it starts inside that render,
    4. run:  node "rough cut/build rough cut.mjs"   (from the v01 folder).
  Status "placeholder" means the rough cut shows the placeholder card for that part.
*/
var FILM_PARTS = [
  {
    id: "A", name: "Cold open", step: "3", status: "approved", render: "part A cold open.mp4",
    note: "Real-floor draft 7. Yellow cooking-station exclamations and clearer startup waiting captions, then a separate illustrative production tip and HMI stop, repair and restart. Silent. Approved by Aman 2026-11-14. Proceed through the director for further frames.",
    frames: [
      { id: "1", name: "Cold open", eyebrow: "TODAY", look: "Real floor", at: 0, dur: 20,
        title: "First, waiting for product. Later, a jug tips.",
        beats: ["At startup, the filler waits for upstream product", "Product arrives and the operator starts filling", "During production, J-017 tips and the operator stops at the HMI", "Operator straightens the jug and restarts. Fixed. 54 s."] }
    ]
  },
  {
    id: "B", name: "The two problems", step: "4", status: "placeholder", render: null,
    frames: [
      { id: "2", name: "Founders and agenda", eyebrow: "AGENDA", look: "Graphics", at: 0, dur: 10,
        title: "Two problems we saw on ILFA-2",
        beats: ["Illustrated founders at left", "ONE · Visibility: why does ILFA-2 stop?", "TWO · Learning: why does every shift relearn the fix?"] },
      { id: "3", name: "P1 Visibility", eyebrow: "P1 · VISIBILITY", look: "Graphics", at: 10, dur: 18,
        title: "53% of shift time is recorded as downtime, with no reasons",
        beats: ["Shift timeline fills with red stop ticks and ?", "Counter climbs to 53% (23 shifts, real counter)", "One number. No reasons.", "Reason bars stay empty: where do you focus first?", "Bottom line: Counted. Not explained."] },
      { id: "4", name: "P2 Learning", eyebrow: "P2 · LEARNING", look: "Real floor", at: 28, dur: 18,
        title: "Every shift relearns the same fix",
        beats: ["Day, Swing, Night: the same jug tips", "Day operator's fix leaves with him", "Swing and Night: ? and longer stops", "Lessons saved: 0", "Bottom line: Fixed. Never learned."] }
    ]
  },
  {
    id: "C", name: "Twin and shift report", step: "5", status: "placeholder", render: null,
    frames: [
      { id: "5", name: "Bridge", eyebrow: "SOLUTION", look: "Graphics", at: 0, dur: 5,
        title: "What this could look like on ILFA-2",
        beats: ["Founders, both problem badges unticked", "Illustrative"] },
      { id: "6", name: "Digital twin", eyebrow: "P1 · VISIBILITY", look: "Real floor to twin", at: 5, dur: 20,
        title: "See every machine live, and where each stop starts",
        beats: ["Scan line turns the real floor into the twin", "Linked machines, live rate tags", "Feed stops, buffer drains, downstream turns yellow", "Separate local filler fault turns red"] },
      { id: "7", name: "Shift report and stop log", eyebrow: "P1 · VISIBILITY", look: "Twin", at: 25, dur: 18,
        title: "Every stop now has a reason. Focus on bottle tipping first",
        beats: ["Frame 3's empty bars fill (illustrative split)", "Callout: bottle tipping, most frequent stop", "Pill \"Why it stopped\" flips to ✓", "Cursor clicks the filler, stop log opens, clicks E-014"] }
    ]
  },
  {
    id: "D", name: "Learn the fix, ask the factory", step: "6", status: "placeholder", render: null,
    frames: [
      { id: "8", name: "Camera learns the fix", eyebrow: "P2 · LEARNING", look: "Twin + camera clip", at: 0, dur: 20,
        title: "The camera captures the fix, so it stays with the plant",
        beats: ["E-014 clip: lean, tip, operator adjusts the guide", "Labels build: Seen... Seen... Flow back in 54 s", "\"Fix that worked\", Learned from video", "Lessons saved: 1. Pill \"What fixed it\" ✓"] },
      { id: "9", name: "Ask the factory", eyebrow: "P2 · LEARNING", look: "Twin + chat", at: 20, dur: 20,
        title: "Any shift can find the fix in seconds",
        beats: ["Night operator asks: what do I check?", "Answer: seen before E-014, fix, demo checklist, clip", "Pill \"Who knows it\" ✓ every shift", "Manager asks why downtime was 53%"] }
    ]
  },
  {
    id: "E", name: "How it works", step: "7", status: "placeholder", render: null,
    note: "Story detail pass (Step 6b) needed before build.",
    frames: [
      { id: "10a", name: "Non-intrusive", eyebrow: "HOW IT WORKS", look: "Graphics", at: 0, dur: 10,
        title: "Non-intrusive: nothing touches your machines",
        beats: ["The usual way: sensors, PLC, OEM drivers. RULED OUT", "Our pick: one camera on a pole", "Mount. Point. Watch."] },
      { id: "10b", name: "Tacit knowledge", eyebrow: "HOW IT WORKS", look: "Twin graphics", at: 10, dur: 10,
        title: "Tacit knowledge codification",
        beats: ["E-014 becomes a node in a knowledge graph", "Nodes light up across the plant", "Lessons saved: 1 → 140 (illustrative)"] },
      { id: "10c", name: "Easy retrieval", eyebrow: "HOW IT WORKS", look: "Twin graphics", at: 20, dur: 5,
        title: "Easy retrieval: just ask",
        beats: ["Graph funnels into one chat box", "Questions from four roles flash past"] },
      { id: "10d", name: "You own it", eyebrow: "HOW IT WORKS", look: "Twin graphics", at: 25, dur: 5,
        title: "Your data. Your company brain. Your moat.",
        beats: ["Graph folds into a brain with a lock", "You own all of it. It grows every shift."] }
    ]
  },
  {
    id: "F", name: "Results and the ask", step: "8", status: "placeholder", render: null,
    note: "Story detail pass (Step 6b) needed before build.",
    frames: [
      { id: "11", name: "After several shifts", eyebrow: "RESULTS", look: "Twin", at: 0, dur: 12,
        title: "Both problems shrink shift by shift",
        beats: ["Shift 1 vs Shift 10, split screen", "Early tip caught before the filler", "90% explained ✓  ·  Lessons saved: 24 ✓", "Illustrative. Not a promised result."] },
      { id: "12", name: "The ask", eyebrow: "NEXT STEP", look: "Graphics", at: 12, dur: 15,
        title: "How a pilot would work",
        beats: ["Three pilot steps on ILFA-2", "Stop-record card, all pills ✓", "Can we run a pilot on ILFA-2?", "Thank you, Andrea and Mike."] }
    ]
  }
];
if (typeof module !== "undefined") module.exports = FILM_PARTS;
