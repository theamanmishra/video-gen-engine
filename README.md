# Video generation engine learning set

This repository contains a curated learning set from two completed or in-progress video projects.

The Nashoba Bakery package shows a finished product film and the timestamped customer conversation that informed it. The Concord Foods package shows a more structured production system, from research and story design through visual rules, feedback, HyperFrames source, 3D assets and renders.

The material is reference data for building an automated video generation engine. It is not a claim that the customer measurements, plant layout or illustrative events are generally true.

## What to learn from this set

The examples cover story extraction from a transcript, storyboard design, action titles, pacing, visual style systems, reusable scene composition, 3D scene construction, review-driven iteration and assembly with placeholders.

The most useful contrast is between the finished Nashoba film and the Concord production workspace. Nashoba demonstrates the intended consulting-film language. Concord exposes the intermediate artifacts and decisions needed to reproduce that language programmatically.

## Repository map

`sources/nashoba-bakery/` contains the cleaned transcript and the existing-packages research page Adarsh used while generating the film.

`outputs/nashoba-bakery/` contains the generated reference film.

`sources/concord-foods/story/` contains the film brief and narration contract.

`sources/concord-foods/research/` contains the source research used to shape the story.

`sources/concord-foods/workflow/` contains the production plan and visual system.

`sources/concord-foods/feedback/` contains review evidence and decisions.

`sources/concord-foods/composition/` contains a working HyperFrames composition, the Part A source and the rough-cut assembly logic.

`sources/concord-foods/shared/` contains the reusable Three.js factory model and the local operator asset with its license files.

`outputs/concord-foods/` contains style references, a Part A render and the current rough cut.

`manifest.json` records the intended role of each resource, its provenance and important caveats.

## Suggested engine tasks

1. Parse the bakery transcript into a scene brief with claims, people, process steps, numbers, questions and unresolved points.
2. Generate a consulting-style storyboard whose action titles alone explain the argument.
3. Compile the storyboard into a timed scene plan with named beats and replaceable placeholders.
4. Apply a visual system consistently across charts, title cards, characters, machine scenes and camera-feed inserts.
5. Use review notes to produce a bounded revision without changing approved story constraints.
6. Keep illustrative values, observed facts, proposals and unresolved assumptions separate in the generated output.

## Provenance and handling

The source projects were created locally by Aman Mishra. The Nashoba transcript is automated and speaker identities are not verified. The Concord film marks authored numbers and events as illustrative. Some research and media are customer-related and should be handled as restricted training material unless the project owner explicitly approves wider publication.

