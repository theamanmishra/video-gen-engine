// Part A, Frame 1 cold open: the real floor ("the plant today"). One 3D scene, with separate startup and production moments.
// Shared model with look 'real': real machine colours, no status colours, no product on screen.
// Deterministic: every frame is a pure function of timeline time t. Beat times come from window.BEATS.
import * as THREE from '../shared/three.module.js';
import { createFactory, realFloorStage, createOperator } from '../shared/factory-model.js';

const B = window.BEATS;
const W = 1920, H = 1080;

// ---------- small maths ----------
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const lerp = (a, b, f) => a + (b - a) * f;
const ramp = (t, a, b) => clamp01((t - a) / (b - a));
const sine = (f) => 0.5 - 0.5 * Math.cos(Math.PI * f);
const inOut3 = (f) => (f < 0.5 ? 4 * f * f * f : 1 - Math.pow(-2 * f + 2, 3) / 2);
const out3 = (f) => 1 - Math.pow(1 - f, 3);
const in2 = (f) => f * f;

// ---------- renderer, scene, real-floor look ----------
const canvas = document.getElementById('floor-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(1);
renderer.setSize(W, H, false);
const scene = new THREE.Scene();
realFloorStage(THREE, scene, renderer);
const factory = createFactory(THREE, { look: 'real' });
scene.add(factory.group);
factory.update(0, { activeFeed: 'CS3', showCameras: false });
// Shot lighting from the approved local comparison. Keep the warm room and steel.
// A quieter back wall and a neutral rear edge make the white infeed jugs legible.
const backWall=factory.group.getObjectByName('Cutaway back wall');
if(backWall){backWall.material=backWall.material.clone();backWall.material.color.set(0x79746b);}
const infeedEdge=new THREE.DirectionalLight(0xf1f3f2,.85);
infeedEdge.position.set(-2,6,-6);infeedEdge.target.position.set(.1,1.2,-2);
scene.add(infeedEdge,infeedEdge.target);
factory.jamJug.visible = false;
// Frame the process on continuous shop-floor ground, without the cutaway slab edge.
const floor=factory.group.getObjectByName('Factory floor');
if(floor)floor.scale.set(160,.4,160);
const sideWall=factory.group.getObjectByName('Cutaway service wall');
if(sideWall)sideWall.visible=false;


// ---------- jugs ----------
// The model's own loose jugs are hidden; this file places every jug itself.
const loose = factory.group.children.filter((o) => o.userData.jug && Math.abs(o.scale.x - 0.83) < 0.005);
const proto = loose[0];
loose.forEach((j) => (j.visible = false));
const cloneJug = () => { const j = proto.clone(); j.visible = false; factory.group.add(j); return j; };
// Jug parts: children[3] is the cap, the child named 'Syrup' is the fill (look 'real').
// Empty jugs reach the filler with no syrup and no cap; the capper downstream adds the cap.
const setJug = (j, { filled, capped }) => { j.children[3].visible = capped; const f = j.getObjectByName('Syrup'); if (f) f.visible = filled; };
// Empties get a frosted body so they read as white jugs; filled jugs keep the clear body that shows the syrup.
const frosted = proto.children[0].material.clone(); frosted.opacity = 0.78; frosted.roughness = 0.4; frosted.color.set(0xf4f3ee);
const makeEmpty = (j) => { j.children[0].material = frosted; setJug(j, { filled: false, capped: false }); return j; };
const emptyJug = () => makeEmpty(cloneJug());
// Empty turret jugs wait at startup. The arriving product fills the first jugs after Start.
const rotorJugs=[];
factory.rotor.traverse(o=>{if(o.userData.jug)rotorJugs.push({jug:o,filledMaterial:o.children[0].material});});
function placeRotorJugs(t){
  rotorJugs.forEach(({jug,filledMaterial},i)=>{
    const filled=t>=B.production || t>=B.supplyStart+.18+i*.06;
    jug.children[0].material=filled?filledMaterial:frosted;
    setJug(jug,{filled,capped:false});
  });
}

// Infeed: the belt keeps running, jugs queue up behind the tipped jug.
const V_IN = 0.5, GAP = 0.38, GAP_PACKED = 0.3;
const X_START = -1.35, X_ENTER = 1.42, X_JAM = 0.85, IN_Z = -2, BELT_Y = 1.15;
const K = 20; // stream index of J-017
const X0 = 0.8 + K * GAP - V_IN * B.tip; // J-017 is at x = 0.8 when it falls
const inPool = Array.from({ length: 12 }, emptyJug);
// The supply belt holds up to about 44 jugs when the queue packs, more than the model's 34, so Part A uses its own pool.
const supplyPool = Array.from({ length: 60 }, emptyJug);
// J-017 sits in a pivot at its leading bottom edge, so it falls forward toward the filler and lies
// along the belt, side-on to the camera (as in the approved Step 3a still).
const jPivot = new THREE.Group(); factory.group.add(jPivot);
const j017 = proto.clone(); j017.visible = true; jPivot.add(j017); makeEmpty(j017);
const D = 0.1; // half the jug's depth along the belt
j017.position.set(-D, 0, 0); j017.rotation.y = Math.PI / 2;

function j017Tilt(t) {
  // lean with a small wobble, fall, a little bounce, lie tipped until set upright.
  if (t < B.lean) return 0;
  if (t < B.tip) { const f = ramp(t, B.lean, B.tip); return 0.22 * sine(f) + 0.05 * Math.sin(f * Math.PI * 3) * f; }
  const land = B.land;
  if (t < land) return lerp(0.24, Math.PI / 2, in2(ramp(t, B.tip, land)));
  if (t < B.land + 0.18) { const f = ramp(t, land, B.land + 0.18); return Math.PI / 2 - 0.12 * Math.sin(f * Math.PI); }
  if (t < B.upright) return Math.PI / 2;
  return Math.PI / 2 * (1 - inOut3(ramp(t, B.upright, B.upright + 0.5)));
}
const infeedTime=t=>t<B.production?B.production-.4+.4*out3(ramp(t,B.supplyStart,B.production)):t;
function j017X(t) {
  const free = X0 + V_IN * infeedTime(t) - K * GAP;
  if (t < B.tip) return free;
  const xTip = X0 + V_IN * B.tip - K * GAP;
  if (t < B.resume) return Math.max(xTip, Math.min(X_JAM, free));
  return X_JAM + V_IN * (t - B.resume);
}
function placeInfeed(t) {
  const tilt = j017Tilt(t);
  const xj = j017X(t);
  jPivot.position.set(xj + D, BELT_Y, IN_Z);
  // fall forward, twisting a little toward the camera so the cap and handle stay readable
  jPivot.rotation.set(0, -0.5 * (tilt / (Math.PI / 2)), -tilt, 'YZX');
  jPivot.visible = xj < X_ENTER;
  inPool.forEach((j) => (j.visible = false));
  let ahead = xj, aheadGap = GAP_PACKED;
  factory.supplyJugs.forEach((j) => (j.visible = false));
  supplyPool.forEach((j) => (j.visible = false));
  for (let k = K - 4; k <= K + 64; k++) {
    if (k === K) continue;
    let x = X0 + V_IN * infeedTime(t) - k * GAP;
    if (k > K && t >= B.tip) {
      // queue behind J-017; after the restart J-017 moves on and the queue follows it in.
      // The queue backs up past the infeed onto the supply belt.
      x = Math.min(x, ahead - aheadGap);
      ahead = x; aheadGap = GAP_PACKED;
    }
    if (x > X_ENTER) continue;
    if (x < X_START) {
      // On the shared supply belt: the same stream, measured back from where it joins the infeed.
      const sAlong = SUPPLY_LEN - (X_START - x);
      if (sAlong < 0) continue;
      const q = alongPath(SUPPLY, sAlong);
      const j = supplyPool[((k % 60) + 60) % 60];
      j.visible = true; j.position.set(q.x, BELT_Y, q.z); j.rotation.set(0, q.rot, 0);
      continue;
    }
    const j = inPool[((k % 12) + 12) % 12];
    j.visible = true; j.position.set(x, BELT_Y, IN_Z); j.rotation.set(0, Math.PI / 2, 0);
  }
}
// Shared empty-jug supply belt (factory.supplyPath), ending where the infeed starts.
const SUPPLY = factory.supplyPath.map((p) => p.slice());
SUPPLY[SUPPLY.length - 1] = [X_START, IN_Z];
const SUPPLY_LEN = SUPPLY.slice(1).reduce((a, q, i) => a + Math.hypot(q[0] - SUPPLY[i][0], q[1] - SUPPLY[i][1]), 0);
function alongPath(path, d) {
  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i], b = path[i + 1], l = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (d <= l || i === path.length - 2) { const f = Math.min(1, d / l); return { x: lerp(a[0], b[0], f), z: lerp(a[1], b[1], f), rot: Math.atan2(b[0] - a[0], b[1] - a[1]) }; }
    d -= l;
  }
}

// Filler throughput drives the output belt: jugs only leave the filler while it runs.
const V_OUT = 0.82, RATE = V_IN / GAP;
const outPath = [[4.7, -2], [7.2, -2], [7.2, 1], [4.5, 1], [4.5, 4], [11.8, 4]];
const segs = []; let outLen = 0;
for (let i = 0; i < outPath.length - 1; i++) { const a = outPath[i], b = outPath[i + 1], l = Math.hypot(b[0] - a[0], b[1] - a[1]); segs.push({ a, b, l, s: outLen }); outLen += l; }
function alongOut(d) {
  for (const sg of segs) if (d <= sg.s + sg.l) { const f = (d - sg.s) / sg.l; return { x: lerp(sg.a[0], sg.b[0], f), z: lerp(sg.a[1], sg.b[1], f), rot: Math.atan2(sg.b[0] - sg.a[0], sg.b[1] - sg.a[1]) }; }
  return null;
}
const productionSpeed = (t) => {
  if (t < B.stop) return 1;
  if (t < B.resume) return 1 - ramp(t, B.stop, B.stop + 0.35);
  return out3(ramp(t, B.resume, B.resume + 0.6));
};
const fillerSpeed=t=>t<B.production?(t<B.supplyStart?0:out3(ramp(t,B.supplyStart,B.supplyStart+.45))):productionSpeed(t);
const emit = []; // emit[i] = time the i-th jug leaves the filler, precomputed on a fixed grid
{
  const dt = 1 / 600; let count = 0, next = 0;
  for (let t = -40; t <= B.end + 1; t += dt) { count += RATE * productionSpeed(t) * dt; while (count >= next) { emit.push(t); next++; } }
}
const outPool = Array.from({ length: 48 }, cloneJug);
const D_CAPPER = 3.5; // distance along the outfeed where the capper puts the cap on
function placeOutfeed(t) {
  outPool.forEach((j) => (j.visible = false));
  for (let i = 0; i < emit.length; i++) {
    const te = emit[i]; if (te > t) break;
    if(t<B.production && te<B.supplyStart)continue;
    const d = V_OUT * (t - te); if (d > outLen) continue;
    const p = alongOut(d); if (!p) continue;
    const j = outPool[i % outPool.length]; j.visible = true; j.position.set(p.x, BELT_Y, p.z); j.rotation.set(0, p.rot, 0);
    setJug(j, { filled: true, capped: d > D_CAPPER });
  }
}
const rotorAngle = (() => {
  const dt = 1 / 600, w = (2 * Math.PI * RATE) / 12, table = [];
  let a = 0; for (let t = 0; t <= B.end + 1; t += dt) { table.push(a); a += w * fillerSpeed(t) * dt; }
  return (t) => table[Math.min(table.length - 1, Math.max(0, Math.round(t * 600)))];
})();
const robot = factory.group.children.find((o) => o.name === 'Illustrative robotic pack-out');

// ---------- filler stack light ----------
// A plain machine tower light on the filler (Aman's review, 2026-11-14): green while it runs, red when it stops.
// It is the machine's own lamp, not the product. Local to Part A; shared/ is not edited.
const stack = new THREE.Group(); stack.name = 'Filler stack light (illustrative)'; scene.add(stack);
stack.position.set(3, 2.72, -2); // on top of the filler crown, in view in every close shot
{
  const pole = new THREE.MeshStandardMaterial({ color: 0x9aa5a9, roughness: 0.4, metalness: 0.6 });
  const p = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.2, 12), pole); p.position.y = 0.1; stack.add(p);
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.04, 20), pole); cap.position.y = 0.72; stack.add(cap);
}
const lamp = (col, y) => {
  const m = new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0, roughness: 0.3, transparent: true, opacity: 0.92 });
  m.toneMapped = false; // keep a lit lamp its true colour (tone mapping turns bright red orange)
  const l = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.17, 20), m); l.position.y = y; stack.add(l); return m;
};
const lampRed = lamp(0xff0a0a, 0.61), lampAmber = lamp(0xffa21a, 0.43), lampGreen = lamp(0x22c55e, 0.25);
// Unlit lenses read as dull grey with a faint tint; only the lit one shows its colour.
for (const m of [lampRed, lampAmber, lampGreen]) m.color.lerp(new THREE.Color(0x8a8f92), 0.9);
const redGlow = new THREE.PointLight(0xff3020, 0, 3.5, 2); redGlow.position.set(0, 0.75, 0.6); stack.add(redGlow);
const RED_OFF = lampRed.color.clone(), RED_ON = new THREE.Color(0xff0a0a);
function placeStack(t) {
  const stopped = t >= B.stop && t < B.resume;
  const blink = stopped ? (Math.sin((t - B.stop) * Math.PI * 3) > -0.3 ? 1 : 0.25) : 0;
  lampRed.emissiveIntensity = 1.1 * blink; redGlow.intensity = 2.5 * blink;
  lampGreen.emissiveIntensity = stopped || t<B.supplyStart ? 0 : 0.8;
  lampRed.color.copy(stopped ? RED_ON : RED_OFF);
}

// ---------- operator ----------
// Short repeated route on the clear near aisle. It goes around the left/front corner.
const op = await createOperator(THREE, { rigged: true });scene.add(op.group);
const repairPlace=[1.02,-1.39],controlPlace=[2,.50];
const routePoints=[[1.02,-1.39],[.80,-.95],[.80,.50],[2,.50]];
const toControl=new THREE.CatmullRomCurve3(routePoints.map(([x,z])=>new THREE.Vector3(x,0,z)),false,'centripetal');
const toJug=new THREE.CatmullRomCurve3([...routePoints].reverse().map(([x,z])=>new THREE.Vector3(x,0,z)),false,'centripetal');
const routeLength=toControl.getLength();
const turn=(a,b,f)=>a+Math.atan2(Math.sin(b-a),Math.cos(b-a))*f;
const press=(t,start,contact,end)=>t<start||t>end?0:t<contact?sine(ramp(t,start,contact)):1-sine(ramp(t,end-.12,end));
function placeOperator(t) {
  let place=repairPlace,face=Math.PI,walkWeight=0,walkTime=0,reach=0,handTarget=null,activeHand='both';
  let journey=null;
  if(t<B.startupReturn){
    place=controlPlace;
    const look=sine(ramp(t,1.7,2.5))*(1-sine(ramp(t,3.7,4.35)));
    face=turn(Math.PI,Math.atan2(-11,-4.5),look);
    reach=press(t,B.supplyPress,B.supplyStart-.10,B.startupReturn-.02);activeHand='r';
    handTarget=new THREE.Vector3(2.19,1.52,.04);
  } else if(t<B.startupReturnEnd)journey=[toJug,B.startupReturn,B.startupReturnEnd];
  else if(t>=B.react&&t<B.stopReach)journey=[toControl,B.react,B.stopReach];
  else if(t>=B.return&&t<B.reach)journey=[toJug,B.return,B.reach];
  else if(t>=B.startWalk&&t<B.startReach)journey=[toControl,B.startWalk,B.startReach];
  else if(t>=B.stopReach&&t<B.return || t>=B.startReach)place=controlPlace;
  if(journey){
    const [path,start,end]=journey,u=ramp(t,start,end),p=path.getPointAt(u),dir=path.getTangentAt(u);
    place=[p.x,p.z];const heading=Math.atan2(dir.x,dir.z);
    face=turn(Math.PI,heading,sine(ramp(t,start,start+.16)));
    face=turn(face,Math.PI,sine(ramp(t,end-.16,end)));
    walkWeight=Math.min(ramp(t,start,start+.12),1-ramp(t,end-.12,end));
    walkTime=u*routeLength/1.05*(4/3);
  } else if(t>=B.stopReach&&t<B.return){
    reach=press(t,B.stopReach,B.stop,B.return-.04);activeHand='l';
    handTarget=new THREE.Vector3(1.81,1.52,.04);
  } else if(t>=B.reach&&t<B.startWalk){
    reach=press(t,B.reach,B.upright,B.repairEnd);activeHand='both';
    j017.updateWorldMatrix(true,false);handTarget=j017.localToWorld(new THREE.Vector3(.10,.42,0));
  } else if(t>=B.startReach){
    reach=press(t,B.startReach,B.startTouch,B.resume+.18);activeHand='r';
    handTarget=new THREE.Vector3(2.19,1.52,.04);
  }
  op.group.position.set(place[0],0,place[1]);op.group.rotation.y=face;
  op.pose({time:t,walkTime,walkWeight,reach,handTarget,activeHand});
}

// The screen is a proposed illustration, not a Concord/OEM screen or operating procedure.
const screenCanvas=document.createElement('canvas');screenCanvas.width=512;screenCanvas.height=320;
const screenContext=screenCanvas.getContext('2d');const hmiTexture=new THREE.CanvasTexture(screenCanvas);hmiTexture.colorSpace=THREE.SRGBColorSpace;
factory.hmiScreen.material=new THREE.MeshBasicMaterial({map:hmiTexture,toneMapped:false});
function placeHMI(t){
  const c=screenContext,stopped=t>=B.stop&&t<B.resume;
  c.fillStyle='#142329';c.fillRect(0,0,512,320);
  c.textAlign='center';c.fillStyle='#eef2ec';c.font='bold 32px sans-serif';c.fillText('FILLER',256,44);
  c.font='24px sans-serif';c.fillText(t<B.product?'WAITING FOR PRODUCT':t<B.supplyStart?'PRODUCT READY':stopped?'STOPPED':'RUNNING',256,83);
  const stopPress=Math.abs(t-B.stop)<.14,startPress=Math.abs(t-B.startTouch)<.14 || Math.abs(t-(B.supplyStart-.10))<.14;
  c.fillStyle=stopPress?'#ff6b60':'#b73b35';c.fillRect(24,114,220,172);
  c.fillStyle=startPress?'#8be0b0':'#266849';c.fillRect(268,114,220,172);
  c.font='bold 44px sans-serif';c.fillStyle='#ffffff';c.fillText('STOP',134,216);c.fillText('START',378,216);
  hmiTexture.needsUpdate=true;
}

// ---------- camera ----------
const camera = new THREE.PerspectiveCamera(31, W / H, 0.1, 160);
const actionShot={pos:[4.7,5.9,6.9],look:[1.7,1.2,-1.0],fov:35};
const shot = {
  startup: {pos:[4.7,5.9,6.9],look:[1.7,1.2,-1.0],fov:35},
  cooking: {pos:[-.5,10.0,13.0],look:[-3.0,1.4,-2.0],fov:42},
  wide: { pos: [2.0, 18.0, 18.0], look: [0.8, 0.9, -0.6], fov: 35 },
  mid: actionShot, midIn: actionShot, midIn2: actionShot, op: actionShot,
  out: { pos: [2.4, 18.5, 18.5], look: [0.8, 0.9, -0.6], fov: 35 },
};
shot.wide0={pos:[2.4,18.5,18.5],look:[.8,.9,-.6],fov:35};
// Settle above the front rail before the lean, then hold the action continuously.
const keys = [
  [B.f01, 'wide0'], [B.push, 'wide', sine], [B.lean-.1, 'mid', inOut3],
  [B.pull, 'op', sine], [B.relabel, 'out', inOut3], [B.end, 'out', sine],
];
const mix = (a, b, f) => a.map((v, i) => lerp(v, b[i], f));
function setCamera(t) {
  if(t<B.production){
    let a=shot.startup,b=shot.cooking,f=0;
    if(t<3.2)f=sine(ramp(t,B.startupPan,3.2));
    else if(t<3.7)f=1;
    else f=1-sine(ramp(t,3.7,4.7));
    camera.fov=lerp(a.fov,b.fov,f);camera.updateProjectionMatrix();
    camera.position.set(...mix(a.pos,b.pos,f));camera.lookAt(...mix(a.look,b.look,f));camera.updateMatrixWorld();return;
  }
  let c = shot[keys[keys.length - 1][1]];
  for (let i = 1; i < keys.length; i++) {
    const [t1, n1, ease] = keys[i], [t0, n0] = keys[i - 1];
    if (t < t1) { const a = shot[n0], b = shot[n1], f = ease(ramp(t, t0, t1)); c = { pos: mix(a.pos, b.pos, f), look: mix(a.look, b.look, f), fov: lerp(a.fov, b.fov, f) }; break; }
  }
  camera.fov = c.fov; camera.updateProjectionMatrix();
  camera.position.set(...c.pos); camera.lookAt(...c.look); camera.updateMatrixWorld();
}

// ---------- clock: real time, then a fast-forward across the 54 s stop ----------
const T0 = 8 * 3600 + 42 * 60 + 10; // 08:42:10 at B.stop
const T1 = T0 + 54;                  // 08:43:04 at B.resume
function clockAt(t) {
  if (t < B.ff) return T0 + (t - B.stop);
  if (t < B.resume) { const a = T0 + (B.ff - B.stop); return lerp(a, T1, sine(ramp(t, B.ff, B.resume))); }
  return T1 + (t - B.resume);
}
const fmt = (s) => { s = Math.floor(s + 1e-6); const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60; return [h, m, x].map((n) => String(n).padStart(2, '0')).join(':'); };

// ---------- machine labels, projected from the model ----------
const v = new THREE.Vector3();
const LABELS = {
  cs3:{point:[-9,3.6,-4],screen:[350,215]},
  cs5:{point:[-9,3.6,3],screen:[245,610]},
  buffer:{point:[-2,3.0,-3],screen:[815,245]},
  feed:{point:[-6,1.2,-1.2],screen:[650,755]},
  filler:{point:[3,2.8,-2],screen:[1100,300]},
  capper:{point:[7,2.3,-1],screen:[1510,410]},
  cool:{point:[7,2.1,4],screen:[1200,800]},
  pack:{point:[11,2.6,4],screen:[1640,680]},
};
function placeLabels() {
  for(const [id,point] of [['cs3',[-9,2.7,-4]],['cs5',[-9,2.7,3]]]){
    const el=document.getElementById('wait-'+id);
    v.set(...point).project(camera);
    const x=(v.x*.5+.5)*W,y=(-v.y*.5+.5)*H;
    el.style.left=x+'px';el.style.top=y+'px';
    el.style.visibility=x<145||x>W-145||y<245?'hidden':'visible';
  }
  for (const [id, item] of Object.entries(LABELS)) {
    const el=document.getElementById('a-'+id),line=document.getElementById('line-'+id);
    if(!el || !line)continue;
    const [x,y]=item.screen;el.style.left=x+'px';el.style.top=y+'px';
    v.set(...item.point).project(camera);
    const tx=(v.x*.5+.5)*W,ty=(-v.y*.5+.5)*H;
    const label=el.querySelector('.mname');
    line.setAttribute('x1',x);line.setAttribute('y1',y);
    line.setAttribute('x2',tx);line.setAttribute('y2',ty);
    line.style.opacity=label.style.opacity || '0';
  }
}

function renderAt(t) {
  setCamera(t);
  factory.rotor.rotation.y = rotorAngle(t);
  if (robot) robot.rotation.y = t<B.supplyStart?0:0.35*Math.sin((t-B.supplyStart)*1.3);
  placeInfeed(t);
  placeOutfeed(t);
  placeRotorJugs(t);
  placeOperator(t);
  placeStack(t);
  placeHMI(t);
  renderer.render(scene, camera);
  placeLabels();
  const c = document.getElementById('clock'); if (c) c.textContent = fmt(clockAt(t));
  const stage=document.getElementById('today');if(stage)stage.textContent=t<B.production?'At startup':'During production';
}

window.addEventListener('hf-seek', (e) => renderAt(e.detail.time));
renderAt(0);
window.__floor = { renderAt, camera, THREE, shot, op, factory, routePoints, routeLength };
window.__floorReady && window.__floorReady();
