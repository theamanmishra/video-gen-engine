# Step 3 opening, Aman's review

Raw comments, saved word for word.

## Shared model instructions, 2026-11-14

> Shared model, realistic operator: I chose "Free human model". A Quaternius CC0 human model plus an animation set (two files, about 137 MB total) was proposed. Before downloading, show me the exact file names, source links, licence and size, and wait for my yes. Use GLB/glTF only, no installers or accounts. Keep the licence file next to it in shared/. Add Three.js GLTFLoader at the same version as three.module.js. Keep frames-01-03 rendering.

## On the first render (3D-twin cut, now `3 film/v01/renders/03-sample-opening.mp4`), 2026-11-13

> this is decent but wait - for the first shot, we were going to use real factory image - go through the working html in v4 which I created with chatgpt

## On the photoreal cut (deleted in the 2026-11-14 cleanup)

Questions asked:
1. Is it clear which jug tipped and which machine stopped?
2. Does the motion feel smooth and real enough?
3. Is it clear that the operator fixed it and the line started again?
4. Is any text too small, or on screen too briefly to read?

Aman's reply, 2026-11-13 (he answered in his own words instead of the four questions):

> Okay, so the realistic video that you created is absolutely shit. See, I can tell you what's wrong with it. The movement of bottles is like one image pasted over there, and that image is moving. That's it. It's really bad. The person that you have showcased is a black silhouette. This is not a real person over there. I like the animated video that you created. It has all the elements, like it's zooming in correctly, showcasing machines. The person comes and tips it over, but the realistic video is very bad. Are we using the wrong tool to do this, or what's missing?

## Decision after the FramePack AI test, 2026-11-13

Relayed from Aman by the parent session, word for word:

> I think we should stop it. Give this instruction to step 3.

Meaning: stop FramePack.

**Correction, 2026-11-14.** The parent session wrongly added "approve the 3D cut and close Step 3" when relaying this. Aman did not approve the opening: "Wait, I have not approved the opening yet. That has been incorrectly captured." He said he likes the animated cut better than the photo cut; that is a preference, not approval. Step 3 awaits his review.

Why the AI test was rejected (assistant summary of the parent session's review of `../ai-tests/test01-wide-running-3.5s.mp4`, the last 3.5 s of a 5 s job from the v04 wide photo):
- Good: the camera pan and the robot arm motion.
- The jugs on the right conveyor melt into a white foamy strip.
- Low resolution, 832x480.
- Slow: about 70 minutes for 3.5 s, roughly 20 minutes per second of video on the RTX 3060 Laptop (6 GB).
- No control over story beats: no way to make J-017 tip at the filler or have the same operator fix it.

## On Part A draft 1 (real floor, `renders/part A cold open.mp4`), 2026-11-14

Pasted from the review page, unchanged:

> My review notes on Part A · Cold open (rough cut built 2026-11-14 19:21). Times are in 3 film/v01/renders/rough cut.mp4; extract that frame to see the spot.
> - Frame 1 at 0:00 in the rough cut (exact 0.0 s; 0.0 s into Part A), at the spot bottom-left (19% from left, 67% from top): Each machine needs to be labelled - what exactly is that machine
> - Frame 1 at 0:00 in the rough cut (exact 0.0 s; 0.0 s into Part A), at the spot centre (47% from left, 52% from top): right now this doesn't show where the empty bottles are coming from - can we add that? the bottles should be empty before entreing the filler - they are filled beforehand.
> - Frame 1 at 0:00 in the rough cut (exact 0.0 s; 0.0 s into Part A), at the spot centre (64% from left, 34% from top): we need to add a machine light here which turns red when that bottle tips over.
> - Frame 1 at 0:00 in the rough cut (exact 0.0 s; 0.0 s into Part A), at the spot centre (50% from left, 37% from top): this person is looking very kiddish and cartoonish - any way to make this a bit more real?

## Download request in Part A chat

Asked for the two Quaternius Standard ZIP packs and matching Three.js r170 GLTFLoader dependencies. Aman's reply follows unchanged.

ok

## Local opening comparison request, 2026-11-14

okay also - for the video clip created till now - I think we should take inspiration from "D:\Tinkering\Startup-Research\concord foods\Product Demo\3 film\v01\renders\03-sample-opening.mp4" this video was generated earlier but some elements might be useful - please launch a sub session for this.


## On the local comparison recommendations

yes lets incorporate the good things


## Permission to relay the comparison changes

Yes, send the changes



## On Part A draft 3

My review notes on Part A · Cold open (rough cut built 2026-11-14 21:07). Times are in 3 film/v01/renders/rough cut.mp4; extract that frame to see the spot.\
\- Frame 1 at 0:00 in the rough cut (exact 0.0 s; 0.0 s into Part A), at the spot centre (53% from left, 39% from top): the guy is starting with his hands wide apart in frame 1 - i think he should start with hands down. also this guy is faced back and turns - i think we should make it start with facing the other way itself.\
\- Frame 1 at 0:01 in the rough cut (exact 1.1 s; 1.1 s into Part A), at the spot centre (41% from left, 38% from top): The text descriptions of machines are not clear to read. for example this is not contrasting with the background. Please use better colour scheme, also, do better placement, for example empty jugs in can be written at the the empty space of shop-floor floor.\
\- Frame 1 at 0:01 in the rough cut (exact 1.1 s; 1.1 s into Part A), at the spot top-left (25% from left, 29% from top): I think we can name actual Concord food machine names like CS3 and CS5.\
\- Frame 1 at 0:01 in the rough cut (exact 1.1 s; 1.1 s into Part A), at the spot bottom-left (17% from left, 79% from top): This empty space is looking non-professsional - can we keep the camera angle such that we are only showing the shop-floor.\
\- Frame 1 at 0:01 in the rough cut (exact 1.1 s; 1.1 s into Part A), at the spot middle-left (26% from left, 35% from top): the jugs are collliding with the wall here - we can simply bypass this using the other comment I made - only focus on the process area: these discontinuities can be avoided if we don't even show this.

## Operator position follow-up

sorry before you do that - an even easier solution is if we make the operator stand on the other side of conveyer. that way he is facing opposite but doesn't have ot walk - because right now when he walks - he is passing through the pipes and all.

## On Part A draft 4 pacing

okay looks much better - though we need not have that long pause after the jug tips over - it is a bit awkward. if we want that happening there we would need the operator to be doing something in that duration - maybe he stops the machine with HMI. we can have the jug tipping over a bit earlier he sees it and rushes to stop the machine via HMI - stops it then comes back and makes it upright and then goes back to the HMI to start the machine;


## Upstream supply verification and opening question

okay, as you know this problem of tipping over was not explicitly mentioned in our conversation with Sugar foods calls. however, a problem that Tim mentioned was that the filler gets starved for sometime because the cooking stations didn't feed in time. Please go through our call transcripts and verify this. If this is true, I would want to show another issue in this starting clip which would be operator not being able to start and waiting on the cooking station to send the supply. so that atlease this problem resonates with them. how do we incorporate this issue as well in this?


## Response to the 20-second startup proposal

okay


## Cooking supply waiting cue

looks good, just that it is not very clear that he was waiting for product in the beginning - will it be better if we make a yellow exclamation mark symbol as well on the cooking stations when the camera goes to them?


## Approval and director handoff

okay this looks good. we can move ahead. i think you can send this to the director and that session will spawn a new session for the further frames
