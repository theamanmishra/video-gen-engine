# Learning notes

This file translates the project artifacts into behaviors an automated engine should learn.

## Source to story

The transcript is not treated as a script. The useful intermediate representation is a claim ledger with a source timestamp, speaker confidence, process entity, event, consequence, evidence type and unresolved question. The engine should preserve uncertainty instead of smoothing it away.

The Concord brief shows a second intermediate representation. It turns a messy operational problem into a sequence of frames, each with a takeaway, visual state, action, on-screen text, timing and constraint. That frame contract should exist before code generation.

## Visual grammar

The Nashoba film supplies a consulting grammar. A small eyebrow establishes the section, an action title states the point, a large number or diagram carries the evidence and a short bottom line closes the beat. Characters can anchor the story while the process remains visible.

Concord makes the grammar explicit as tokens and rules. Machine colors have meanings. Cyan is reserved for what the system sees. Red means the local stop started there. Yellow means waiting on another machine. Blue and purple are section accents and must not be confused with machine state.

## Time and assembly

Concord uses named timeline beats and a rough cut with placeholders. This lets a reviewer evaluate the whole story while different parts are still being built. The engine should support partial renders, stable frame IDs, replacement of one part and a final assembly pass.

## Review-driven generation

The review files are training examples for constrained revision. A note can change camera position, contrast, timing or action visibility without changing the approved story. Approval is explicit and remains separate from a preference or a suggestion.

## Integrity rules

The engine should label illustrative numbers and proposed UI. It should not turn a camera observation into a confirmed root cause. It should not claim hidden process values from visible footage. It should keep customer facts, authored examples and unresolved assumptions in separate fields.

