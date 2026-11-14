# Plant process notes: what the two plant images show

This brief answers what the first editable 3D model can credibly show. Source inspection and the user's latest production request are dated 2026-11-12. The model is a provisional visual reconstruction, with generic machine geometry. It is not a dimensioned engineering twin.

## Core product to preserve

The original core remains a digital twin factory view where a user can select equipment, inspect downtime intervals and their explanations and open the relevant evidence. The three supporting advantages are camera-first low-intrusion entry, capture and codification of tacit expertise and chatbot retrieval for less-experienced operators. Those advantages should strengthen the machine-and-event experience.

## Sources actually inspected

| Source | What it establishes | What it does not establish |
|---|---|---|
| [Whiteboard viewing copy](<plant process whiteboard.png>), decoded from Concord's original `IMG_3383.HEIC` | A simple left-to-right sketch of feed/preparation vessels, tall cooker, receiving/transfer vessel, another small vessel and a filler | Exact dimensions, geographical orientation, room layout, capacities, named equipment or active routing |
| [Ignition viewing copy](<plant ignition screen.png>), decoded from original `IMG_3384.HEIC` | Ingredient manifolds, a T6100 mixing kettle, T6200 Breddo, paired tall PH6100/CV6100 heat equipment and partially cropped downstream vessels. Product, steam, water and CIP pipe categories are visibly distinct | Mapping these 6xxx tags to CS3 and CS5, actual machinery dimensions or the complete syrup route. The alarm banner mentions CS6 |
| Existing Product Demo compiler, C3 and source decision log | Aman confirmed CS3 and CS5 both supply ILFA-2 | Which one is active for a run, whether their feeds overlap, recipes or transfer lag |
| October 16 plant-visit account by Adarsh, lines 451 and 453 | Visit discussion distinguishes the juice rotary from an inline filler. Peppermint is piped from processing across the way to inline metal detection, filling, sealing, lay-down conveyor, cooling and case packing with robotic pack-out | Exact installed OEM, complete validated P&ID or reliable dimensions. Transcribed equipment terms may contain recognition errors |
| Latest direct user description | This line makes sugar syrup in peppermint and unflavoured variants. Aman remembers a rotating multi-head filler and wants a standard-machine visual approximation | Verified exact filler architecture or manufacturer |

Both viewing copies were visually inspected during this source audit. The original HEIC files remain unchanged. No separately named or dimensioned P&ID PDF was found in the Concord folder inventory. The supplied process drawing available here is the whiteboard sketch. That distinction belongs in the production notes, without blocking a useful first pass.

The original source files relative to the Product Demo folder are `../IMG_3383.HEIC` and `../IMG_3384.HEIC`. The October visit source is `../../notion-mirror/Meetings/Meeting with Tim and Adam - Brockton Concord Food (Sugar Foods) - 16 Oct 2026 vAdarsh.md`. Essential source substance is embedded here so these optional neighbouring links are not prerequisites for modeling.

## Actionable first-pass topology

Use a clean process arrangement with two cook-station modules, labelled CS3 and CS5, feeding a selectable common product-transfer path. Include a mixing/feed vessel and a tall heating/cooking skid within each module, a shared holding or buffer vessel, an inline product-inspection segment, ILFA-2 filler, capping/sealing, a short lay-down/cooling section and case packing/robotic pack-out.

This combines broad source-supported stages into a practical illustrative scene. The two source modules and common downstream filler have evidence. Their detailed internals, exact vessel count and spatial arrangement are modeling assumptions. Treat the shared holding vessel and manifold as an explanatory abstraction rather than a surveyed pipe design.

Only one upstream route should be highlighted as active in the demonstrated run, with the other available route subdued. Do not depict both CS3 and CS5 simultaneously feeding merely because both can supply the filler. Preserve a small buffer/transfer interval in any illustrative upstream-starvation sequence so the filler does not stop instantly from a remote event without a physical explanation.

The model can use stainless cylindrical agitated vessels, legs, top-mounted drives, hygienic pipework, a compact pumping skid and a guarded filler enclosure as generic class-based geometry. These are illustrative equipment cues, not claims about exact installed machines. Use half-gallon jug-like containers because that format appears in the plant-visit record. Avoid a generic slim beverage can or small PET bottle as the exact Concord package.

## Filler conflict and decision for this draft

The visit transcript at line 451 says the juice line is rotary and the discussed filler is inline. Aman's latest memory describes a rotating multi-head filler. Preserve this conflict once in the assumption log. Follow the latest user direction for the first visible model by using a generic rotary multi-head filler, clearly recorded as provisional. Keep it as a separate editable component so a linear-head inline filler can replace it after refinement.

Do not claim that a circular filling head alone verifies the plant's OEM. A rotary visual can show a turning carousel, surrounding fill heads, a central product bowl and infeed/outfeed transfers without inventing a serial number, rated capacity or exact head count as a plant fact. The chosen count is a modeling parameter.

## Spatial and event limits

No source provides wall positions, floor dimensions, aisle spacing, camera locations, full machine footprints or safety-zone geometry. Lay the scene out for visual explanation with reasonable clearances and label it as an illustrative reconstruction in the production materials. The whiteboard is process order, not floor coordinates.

No synchronized original incident video or approved physical RCA was established in the analysis folder. A tipped jug, an upstream waiting episode and their event times remain illustrative scenarios. The movie should retain evidence states and let an operator review an explanation. A camera may show an event and visible recovery; the expert's reason or deeper physical mechanism may need narration, records or a test.

The current 52.8% is a selected reconstructed counter fraction across 23 shifts. The earlier approximately 75% is a different gross population. Neither should become physical stopped time, OEE or a savings claim. An illustrative dashboard can use coherent example values if their status is clear.
