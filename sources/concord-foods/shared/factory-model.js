// Illustrative Concord syrup line. Dimensions and equipment bodies are provisional.
// Machines are editable local geometry. The optional rigged operator uses local CC0 Quaternius assets.
//
// Looks. createFactory(THREE, { look }) builds the same geometry in one of three looks:
//   (no look)  the accepted v01 model, unchanged. frames-01-03 uses this and restyles it itself.
//   'real'     the plant today (Frames 1 and 4, camera clips): stainless steel, grey and blue frames,
//              black belts, white jugs with amber syrup, concrete floor, yellow safety rails.
//              No status colours. Pair with realFloorStage() for warm overhead light.
//   'twin'     the dark-stage product look, same restyle as frames-01-03/lib/opening.js.
//              Status glow stays in each part.
// Machines, positions and jugs are identical in every look, so a 'real' and a 'twin' factory line
// up exactly under one camera (the Frame 6 scan-line reveal). Only 'real' adds props (safety rails,
// bollards, light fittings), all inside factory.realProps, so a reveal can fade them.
export function createFactory(THREE, opts = {}) {
  const look = opts.look || 'model';
  const group = new THREE.Group();
  group.name = 'Concord syrup line - illustrative geometry';
  group.userData = { illustrative: true, units: 'illustrative metres', version: '1.0' };
  const machines = {};
  const statusLights = {};
  const selectionRings = {};
  const flowOverlays = {};
  const animateItems = [];
  const TAU = Math.PI * 2;
  const metal = new THREE.MeshStandardMaterial({ color: 0xaebfc4, metalness: .8, roughness: .28 });
  const polished = new THREE.MeshStandardMaterial({ color: 0xd4dfe2, metalness: .9, roughness: .19 });
  const brushed = new THREE.MeshStandardMaterial({ color: 0x778e98, metalness: .75, roughness: .4 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x21323b, metalness: .4, roughness: .49 });
  const beltMat = new THREE.MeshStandardMaterial({ color: 0x304b53, metalness: .18, roughness: .65 });
  const teal = new THREE.MeshStandardMaterial({ color: 0x19b49e, metalness: .4, roughness: .32 });
  const amber = new THREE.MeshStandardMaterial({ color: 0xe9ab4a, metalness: .3, roughness: .38 });
  const floorMat = new THREE.MeshStandardMaterial({ color: 0xd9e1e2, roughness: .82, metalness: .05 });
  const wallMat = new THREE.MeshStandardMaterial({ color: 0xe7edec, roughness: .92 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0xc2edf0, metalness: .02, roughness: .12, transparent: true, opacity: .16, depthWrite: false, side: THREE.DoubleSide });
  const jugMat = new THREE.MeshStandardMaterial({ color: 0xf0f3e5, roughness: .45, metalness: 0 });
  const syrupMat = new THREE.MeshStandardMaterial({ color: 0xb77b31, roughness: .3, metalness: .1 });
  const jugBodyMat = look==='real' ? jugMat.clone() : jugMat; // 'real': see-through body shows the syrup
  const caseMat = new THREE.MeshStandardMaterial({ color: 0xb89566, roughness: .85 });
  const blue = new THREE.MeshStandardMaterial({ color: 0x407b93, roughness: .38, metalness: .35 });
  const laneMat = new THREE.MeshBasicMaterial({ color: 0xd7b84f });
  const flowMat = new THREE.MeshBasicMaterial({ color: 0x3bd4b5 });
  const floorLineMat = new THREE.LineBasicMaterial({ color: 0xb9c7c9, transparent: true, opacity: .4 });
  const unitBox = new THREE.BoxGeometry(1, 1, 1);
  const cylCache = new Map();

  function mesh(geo, mat, parent = group, name = '') {
    const m = new THREE.Mesh(geo, mat);
    m.name = name;
    m.castShadow = true; m.receiveShadow = true;
    parent.add(m); return m;
  }
  function box(parent, x, y, z, w, h, d, mat = metal, name = '') {
    const m = mesh(unitBox, mat, parent, name); m.position.set(x, y, z); m.scale.set(w, h, d); return m;
  }
  function cylinder(parent, x, y, z, top, bottom, h, mat = metal, segments = 28) {
    const key = [top, bottom, h, segments].join(',');
    if (!cylCache.has(key)) cylCache.set(key, new THREE.CylinderGeometry(top, bottom, h, segments));
    const m = mesh(cylCache.get(key), mat, parent); m.position.set(x, y, z); return m;
  }
  function ball(parent, x, y, z, r, mat = polished, scale = [1,1,1]) {
    const m = mesh(new THREE.SphereGeometry(r, 24, 12), mat, parent); m.position.set(x,y,z); m.scale.set(...scale); return m;
  }
  function bar(parent, a, b, radius, mat = metal) {
    const va = new THREE.Vector3(...a), vb = new THREE.Vector3(...b);
    const m = cylinder(parent, 0,0,0,radius,radius,va.distanceTo(vb),mat,10);
    m.position.copy(va).add(vb).multiplyScalar(.5);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),vb.sub(va).normalize());
    return m;
  }
  function torus(parent, x,y,z, radius, tube, mat = polished, rotation = [Math.PI/2,0,0]) {
    const m = mesh(new THREE.TorusGeometry(radius,tube,8,36),mat,parent); m.position.set(x,y,z);m.rotation.set(...rotation);return m;
  }
  function makeMachine(id, name, x, z, radius = 1.8, centerY = 1.4) {
    const m = new THREE.Group(); m.name = name; m.position.set(x,0,z); group.add(m);
    machines[id] = { group: m, center: [x,centerY,z], name };
    const r = mesh(new THREE.RingGeometry(radius-.045,radius+.045,64),new THREE.MeshBasicMaterial({color:0x24c8ac,transparent:true,opacity:.85,side:THREE.DoubleSide,depthWrite:false}),group);
    r.rotation.x = -Math.PI/2; r.position.set(x,.025,z); r.visible = false; r.name = id + ' selection'; selectionRings[id] = r;
    const light = ball(m, radius*.66, 2.7, -.3,.07,new THREE.MeshStandardMaterial({color:0x2cd2ad,emissive:0x0a735c,emissiveIntensity:.65,roughness:.25}));
    statusLights[id] = light;
    return m;
  }
  function roundedPath(points, corner = .25) {
    const pts = points.map(p=>new THREE.Vector3(...p));
    const path = new THREE.CurvePath(); let start = pts[0];
    for(let i=1;i<pts.length-1;i++) {
      const prev=pts[i-1], p=pts[i], next=pts[i+1];
      const reach=Math.min(corner,p.distanceTo(prev)*.35,p.distanceTo(next)*.35);
      const before=p.clone().add(prev.clone().sub(p).normalize().multiplyScalar(reach));
      const after=p.clone().add(next.clone().sub(p).normalize().multiplyScalar(reach));
      path.add(new THREE.LineCurve3(start,before));path.add(new THREE.QuadraticBezierCurve3(before,p,after));start=after;
    }
    path.add(new THREE.LineCurve3(start,pts[pts.length-1]));return path;
  }
  function pipe(parent, points, radius=.085, mat=polished) {
    return mesh(new THREE.TubeGeometry(roundedPath(points),Math.max(12,points.length*8),radius,8,false),mat,parent);
  }
  function flange(parent,x,y,z,r=.15) {
    cylinder(parent,x,y,z,r,r,.08,polished,20);
    for(let i=0;i<6;i++){const a=i*TAU/6; cylinder(parent,x+Math.cos(a)*r*.75,y+.05,z+Math.sin(a)*r*.75,.017,.017,.035,dark,6);}
  }
  function valve(parent,x,y,z,orientation='x') {
    const body=box(parent,x,y,z,.22,.18,.18,brushed); 
    bar(parent,[x,y,z],[x,y+.3,z],.025,polished);
    const wheel=torus(parent,x,y+.32,z,.13,.018,teal);
    bar(parent,[x-.13,y+.32,z],[x+.13,y+.32,z],.012,teal);
    bar(parent,[x,y+.32,z-.13],[x,y+.32,z+.13],.012,teal);
    return body;
  }

  // A cutaway floor, structure and restrained service aisle markings.
  box(group,0,-.22,0,30,.4,19,floorMat,'Factory floor');
  for(let x=-14;x<=14;x+=2){const g=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x,.006,-9),new THREE.Vector3(x,.006,9)]);group.add(new THREE.Line(g,floorLineMat));}
  for(let z=-8;z<=8;z+=2){const g=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-14.5,.006,z),new THREE.Vector3(14.5,.006,z)]);group.add(new THREE.Line(g,floorLineMat));}
  box(group,0,.02,7.8,27,.018,.055,laneMat);box(group,0,.02,8.7,27,.018,.055,laneMat);
  for(let x=-13;x<14;x+=1.7) box(group,x,.023,8.25,.5,.019,.035,laneMat);
  box(group,0,.85,-9.22,30,1.7,.18,wallMat,'Cutaway back wall');
  box(group,-14.8,.85,-3.8,.16,1.7,10.7,wallMat,'Cutaway service wall');
  for(let x of [-13.7,-5,4,13.7]) {
    box(group,x,2.6,-8.75,.19,5.2,.2,brushed);
    box(group,x,.06,-8.75,.48,.12,.48,brushed);
  }
  bar(group,[-13.7,5.13,-8.75],[13.7,5.13,-8.75],.09,brushed);
  pipe(group,[[-13,4.5,-8.4],[13,4.5,-8.4]],.06,polished);
  pipe(group,[[-13,4.28,-8.4],[13,4.28,-8.4]],.045,blue);

  function tank(parent, cx, cz, r, h, motor=true) {
    cylinder(parent,cx,1.1+h*.5,cz,r,r,h,metal,40);
    ball(parent,cx,1.1+h,cz,r,polished,[1,.26,1]);
    cylinder(parent,cx,.82,cz,r,.2,.56,polished,40);
    torus(parent,cx,1.16,cz,r+.025,.04,polished);
    torus(parent,cx,1.1+h-.02,cz,r+.025,.035,polished);
    for(let a of [.25,Math.PI*.75,Math.PI*1.25,Math.PI*1.75]) {
      const px=cx+Math.cos(a)*r*.78,pz=cz+Math.sin(a)*r*.78;
      bar(parent,[px,.08,pz],[px,1.3,pz],.065,brushed);box(parent,px,.065,pz,.24,.08,.24,polished);
    }
    cylinder(parent,cx,.37,cz,.13,.13,.4,polished,16);flange(parent,cx,.22,cz,.19);
    // Front manway and its clamp hardware.
    const port=cylinder(parent,cx,1.8,cz+r,.31,.31,.1,polished,32);port.rotation.x=Math.PI/2;
    torus(parent,cx,1.8,cz+r+.07,.27,.025,brushed,[0,0,0]);
    for(let j=0;j<8;j++){const a=j*TAU/8;ball(parent,cx+Math.cos(a)*.28,1.8+Math.sin(a)*.28,cz+r+.08,.022,dark);}
    // Sight glass is a narrow physical gauge, not a transparent whole tank.
    cylinder(parent,cx+r*.79,2,cz+r*.66,.047,.047,1.35,glass,12);
    cylinder(parent,cx+r*.79,1.72,cz+r*.66,.027,.027,.8,syrupMat,12);
    if(motor){
      box(parent,cx,1.1+h+.34,cz,.46,.16,.43,brushed);
      cylinder(parent,cx,1.1+h+.61,cz,.16,.16,.45,blue,20);
      bar(parent,[cx,1.1+h+.2,cz],[cx,1.1+h+.45,cz],.06,polished);
    }
    // Upper service nozzle and small instrument head.
    pipe(parent,[[cx+r*.5,1.1+h+.05,cz],[cx+r*.5,1.1+h+.5,cz],[cx+r*.5+.4,1.1+h+.5,cz]],.045,polished);
    ball(parent,cx+r*.5+.4,1.1+h+.5,cz,.09,brushed);
  }

  function cookModule(id,x,z) {
    const m=makeMachine(id,id+' cooking station',x,z,2.35,2.1);
    tank(m,0,0,1.05,2.45,true);
    // Short premix vessel and a tall thermal-treatment column make the process legible.
    tank(m,-2.05,-.3,.57,1.15,true);
    cylinder(m,.35,.5,-1.6,.36,.22,.8,brushed,24);
    cylinder(m,.35,2.33,-1.6,.36,.36,2.85,metal,28);
    ball(m,.35,3.76,-1.6,.36,polished,[1,.42,1]);
    torus(m,.35,1.4,-1.6,.38,.025,polished);torus(m,.35,3.3,-1.6,.38,.025,polished);
    pipe(m,[[-2.05,.38,-.3],[-1.3,.38,-.3],[-1.3,1.3,-1.6],[.35,1.3,-1.6]],.08,polished);
    pipe(m,[[.35,3.6,-1.6],[1.15,3.6,-1.6],[1.15,1,0],[1.8,1,0]],.095,polished);
    valve(m,1.35,1,0);
    // An access platform, ladder and handrails.
    box(m,-.05,2.85,-2.12,2.1,.09,.75,brushed);
    for(let xx of [-1.02,.96])for(let zz of [-2.42,-1.8])bar(m,[xx,0,zz],[xx,2.85,zz],.04,brushed);
    for(let xx of [-1.02,.96])bar(m,[xx,2.85,-2.4],[xx,3.45,-2.4],.025,metal);
    bar(m,[-1.02,3.45,-2.4],[.96,3.45,-2.4],.025,metal);
    for(let xx of [-1.45,-.93])bar(m,[xx,.15,-1.7],[xx,2.85,-1.7],.027,polished);
    for(let yy=.3;yy<2.9;yy+=.3)bar(m,[-1.45,yy,-1.7],[-.93,yy,-1.7],.024,polished);
    const hmi=box(m,1.45,1.8,.65,.42,.48,.1,dark);hmi.rotation.y=-.3;
    box(m,1.45,1.82,.71,.32,.28,.012,teal);
    for(let i=0;i<3;i++)box(m,1.34+i*.1,1.58,.72,.045,.03,.015,i===0?teal:amber);
    return m;
  }
  cookModule('CS3',-9,-4);cookModule('CS5',-9,3);

  const buffer=makeMachine('BUFFER','Holding / transfer vessel',-2,-3,1.7,1.7);
  tank(buffer,0,0,.85,1.65,true);
  box(buffer,1.05,1.35,.45,.4,.8,.3,brushed);
  box(buffer,1.05,1.52,.61,.26,.3,.012,teal);
  pipe(buffer,[[0,.25,0],[1.3,.25,0],[1.3,1.18,0],[2.4,1.18,0]],.095,polished);
  valve(buffer,1.65,1.18,0);
  // Both possible feeds are modeled; update() illuminates only the selected route.
  const routes={
    CS3:[[-7.2,1,-4],[-5.6,1,-4],[-5.6,2.6,-4],[-3.7,2.6,-4],[-3.7,2.6,-3],[-2.7,2.6,-3]],
    CS5:[[-7.2,1,3],[-5.6,1,3],[-5.6,2.6,3],[-5.6,2.6,-3],[-2.7,2.6,-3]]
  };
  for(const [id,pts] of Object.entries(routes)) {
    pipe(group,pts,.105,brushed);
    flowOverlays[id]=pipe(group,pts,.048,flowMat);flowOverlays[id].visible=id==='CS3';
    for(let x of [-5.6,-3.7])bar(group,[x,.05,-3],[x,2.5,-3],.035,brushed);
  }
  pipe(group,[[.4,1.18,-3],[.9,1.18,-3],[.9,2.9,-3],[3,2.9,-3],[3,2.9,-2]],.105,polished);

  // Shared half-gallon jug geometry. The broad body, shoulder and handle distinguish it from PET bottles.
  const bodyShape=new THREE.Shape();
  const jw=.29,jh=.37,jr=.045;
  bodyShape.moveTo(-jw/2+jr,0);bodyShape.lineTo(jw/2-jr,0);bodyShape.quadraticCurveTo(jw/2,0,jw/2,jr);
  bodyShape.lineTo(jw/2,jh-jr);bodyShape.quadraticCurveTo(jw/2,jh,jw/2-jr,jh);
  bodyShape.lineTo(-jw/2+jr,jh);bodyShape.quadraticCurveTo(-jw/2,jh,-jw/2,jh-jr);
  bodyShape.lineTo(-jw/2,jr);bodyShape.quadraticCurveTo(-jw/2,0,-jw/2+jr,0);
  const jugBodyGeo=new THREE.ExtrudeGeometry(bodyShape,{depth:.23,bevelEnabled:true,bevelSegments:1,steps:1,bevelSize:.012,bevelThickness:.012,curveSegments:3});jugBodyGeo.translate(0,0,-.115);
  const shoulderShape=new THREE.Shape();shoulderShape.moveTo(-.145,0);shoulderShape.lineTo(.145,0);shoulderShape.lineTo(.095,.14);shoulderShape.lineTo(-.075,.14);shoulderShape.closePath();
  const jugShoulderGeo=new THREE.ExtrudeGeometry(shoulderShape,{depth:.225,bevelEnabled:true,bevelSegments:1,bevelSize:.009,bevelThickness:.009,steps:1});jugShoulderGeo.translate(0,0,-.1125);
  const handleGeo=new THREE.TorusGeometry(.063,.016,6,12);
  const syrupFillGeo=new THREE.BoxGeometry(.25,.3,.2);
  function jug(parent,x,y,z,scale=1) {
    const j=new THREE.Group();parent.add(j);j.position.set(x,y,z);j.scale.setScalar(scale);
    mesh(jugBodyGeo,jugBodyMat,j);const shoulder=mesh(jugShoulderGeo,jugMat,j);shoulder.position.y=.37;
    cylinder(j,-.035,.54,0,.052,.052,.09,jugMat,12);cylinder(j,-.035,.594,0,.057,.057,.032,teal,12).name='Cap';
    const handle=mesh(handleGeo,jugMat,j);handle.position.set(.125,.435,0);handle.scale.set(1,1.18,1);
    if(look==='real'){const fill=mesh(syrupFillGeo,syrupMat,j,'Syrup');fill.position.y=.17;fill.castShadow=false;}
    j.userData.jug=true;
    return j;
  }

  function conveyor(parent, pts, width=.62, height=1.05) {
    for(let i=0;i<pts.length-1;i++){
      const a=new THREE.Vector3(pts[i][0],height,pts[i][1]);const b=new THREE.Vector3(pts[i+1][0],height,pts[i+1][1]);
      const len=a.distanceTo(b),mid=a.clone().add(b).multiplyScalar(.5);
      const dir=b.clone().sub(a).normalize();const angle=Math.atan2(dir.x,dir.z);
      const seg=new THREE.Group();parent.add(seg);seg.position.copy(mid);seg.rotation.y=angle;
      box(seg,0,0,0,width,.13,len,brushed);box(seg,0,.085,0,width-.09,.04,len,beltMat);
      for(let sign of [-1,1]) {
        bar(seg,[sign*(width*.5-.015),.29,-len*.5],[sign*(width*.5-.015),.29,len*.5],.025,polished);
        for(let zz=-len*.5+.25;zz<len*.5;zz+=1.2){
          bar(seg,[sign*(width*.5-.04),-.95,zz],[sign*(width*.5-.04),0,zz],.035,brushed);
          box(seg,sign*(width*.5-.04),-height+.06,zz,.18,.08,.22,polished);
        }
      }
      for(let zz=-len*.5+.1;zz<len*.5;zz+=.28){const roller=cylinder(seg,0,-.025,zz,.038,.038,width-.1,polished,8);roller.rotation.z=Math.PI/2;}
    }
  }

  const filler=makeMachine('ILFA2','ILFA-2 filler',3,-2,2.15,1.7);
  box(filler,0,.77,0,3.45,.26,3.2,brushed);
  for(let x of [-1.45,1.45])for(let z of [-1.25,1.25]){bar(filler,[x,.06,z],[x,.7,z],.065,brushed);box(filler,x,.06,z,.23,.1,.23,polished);}
  cylinder(filler,0,1.05,0,1.48,1.48,.19,metal,48);
  const rotor=new THREE.Group();rotor.name='Provisional rotary filling turret';filler.add(rotor);
  cylinder(rotor,0,1.18,0,1.28,1.28,.12,dark,48);
  cylinder(rotor,0,2.55,0,.95,.95,.27,polished,48);ball(rotor,0,2.7,0,.95,metal,[1,.13,1]);
  cylinder(filler,0,1.82,0,.13,.13,1.42,brushed,20);
  for(let i=0;i<12;i++){
    const a=i*TAU/12,x=Math.cos(a)*1.06,z=Math.sin(a)*1.06;
    bar(rotor,[x,2.39,z],[x,1.9,z],.034,polished);
    cylinder(rotor,x,1.87,z,.052,.022,.12,metal,12);
    const j=jug(rotor,x,1.24,z,.86);j.rotation.y=-a;
  }
  for(let a of [Math.PI*.15,Math.PI*.65,Math.PI*1.15,Math.PI*1.65]){
    const x=Math.cos(a)*1.64,z=Math.sin(a)*1.64;
    bar(filler,[x,.88,z],[x,2.96,z],.037,polished);
  }
  const guard=mesh(new THREE.CylinderGeometry(1.62,1.62,1.7,48,1,true,0,Math.PI*1.65),glass,filler);guard.position.y=1.86;
  torus(filler,0,2.76,0,1.65,.04,brushed);torus(filler,0,1.08,0,1.65,.035,metal);
  // Provisional filler HMI on the accessible front-left face, consistent in both looks.
  const fillerHMI=new THREE.Group();fillerHMI.name='Illustrative filler HMI';
  fillerHMI.position.set(-1,0,1.95);filler.add(fillerHMI);
  box(fillerHMI,0,.79,0,.12,1.58,.12,brushed);
  box(fillerHMI,0,.08,0,.36,.10,.30,brushed);
  box(fillerHMI,0,1.58,0,.90,.64,.12,dark);
  const hmiScreen=box(fillerHMI,0,1.60,.075,.78,.48,.015,teal);
  hmiScreen.name='Filler HMI screen';
  animateItems.push({kind:'rotor',object:rotor});

  conveyor(group,[[-1.4,-2],[1.5,-2]],.65);
  // Empty-jug supply: a plain conveyor that brings empty, uncapped jugs in from the left edge of the
  // floor, between the two cooking stations and in front of the transfer vessel, onto the infeed.
  // Concord's real empty-jug source is unknown [UNVERIFIED], so no machine is drawn at its start.
  const supplyPath=[[-14.3,-1.2],[-2.3,-1.2],[-1.4,-2]];
  conveyor(group,supplyPath,.65);
  conveyor(group,[[4.55,-2],[7.2,-2],[7.2,1],[4.5,1],[4.5,4],[11.8,4]],.65);

  const capper=makeMachine('CAPPER','Cap / seal station',7,-1,1.35,1.4);
  box(capper,0,1.03,0,1.1,.18,1.8,metal);
  for(let x of [-.46,.46])for(let z of [-.7,.7])bar(capper,[x,.06,z],[x,2.3,z],.04,brushed);
  cylinder(capper,0,1.9,0,.32,.32,.45,blue,24);
  cylinder(capper,0,1.54,0,.12,.08,.28,polished,20);
  cylinder(capper,-.55,2.4,-.45,.47,.3,.35,metal,32);
  pipe(capper,[[-.55,2.55,-.45],[-.55,2.7,0],[0,2.7,0],[0,2.1,0]],.045,teal);
  box(capper,0,1.8,-.81,.9,1.2,.015,glass);

  const cooling=makeMachine('COOLING','Cooling tunnel',7,4,2.2,1.35);
  box(cooling,0,1.42,0,3.4,1.2,1.55,brushed);
  box(cooling,0,2.07,0,3.5,.12,1.65,metal);
  for(let x of [-1.15,0,1.15]){
    box(cooling,x,1.63,.79,.83,.55,.026,glass);
    box(cooling,x,1.56,-.79,.83,.68,.03,metal);
    bar(cooling,[x,.06,-.62],[x,.85,-.62],.05,brushed);bar(cooling,[x,.06,.62],[x,.85,.62],.05,brushed);
    cylinder(cooling,x,2.18,0,.23,.23,.15,dark,20);
    torus(cooling,x,2.27,0,.2,.014,polished);
  }
  pipe(cooling,[[-1.5,1.1,-.85],[-1.5,2.3,-.85],[1.5,2.3,-.85],[1.5,1.1,-.85]],.052,blue);
  box(cooling,-1.78,1.55,0,.03,.68,1.35,dark);box(cooling,1.78,1.55,0,.03,.68,1.35,dark);

  const packer=makeMachine('PACKER','Case packing',11,4,1.85,1.5);
  box(packer,0,.58,0,2.6,.12,2.1,metal);box(packer,0,1.17,0,2.55,.16,2,dark);
  for(let x of [-1.2,1.2])for(let z of [-.95,.95]){bar(packer,[x,.06,z],[x,2.65,z],.065,brushed);}
  box(packer,0,2.66,0,2.65,.15,2.15,metal);
  box(packer,0,2.1,-1.03,2.3,.9,.02,glass);box(packer,0,2.1,1.03,2.3,.9,.02,glass);
  box(packer,0,2.3,0,1.8,.16,.22,teal);box(packer,0,1.95,0,.27,.7,.27,brushed);
  for(let x of [-.7,.1,.85])box(packer,x,1.5,0,.62,.55,.82,caseMat);
  box(packer,1.42,1.94,.55,.12,.56,.42,dark);box(packer,1.5,1.97,.55,.015,.36,.3,teal);
  conveyor(group,[[12.35,4],[13.7,4],[13.7,6.5]],.8,1.05);

  // Compact robotic pack-out and pallet establish the endpoint without crowding the filler.
  const robot=new THREE.Group();robot.name='Illustrative robotic pack-out';robot.position.set(11.9,0,6.8);group.add(robot);
  cylinder(robot,0,.3,0,.43,.5,.6,dark,20);cylinder(robot,0,.8,0,.25,.3,.45,teal,20);
  ball(robot,0,1.1,0,.23,brushed);bar(robot,[0,1.1,0],[-.45,2.2,.1],.17,teal);
  ball(robot,-.45,2.2,.1,.22,brushed);bar(robot,[-.45,2.2,.1],[.9,2.15,.2],.13,teal);
  ball(robot,.9,2.15,.2,.16,brushed);bar(robot,[.9,2.15,.2],[1.25,1.8,.2],.1,teal);
  box(robot,1.25,1.65,.2,.62,.13,.55,dark);
  box(group,13.7,.17,7.2,1.5,.26,1.4,caseMat);
  for(let yy of [.58,1.12])for(let xx of [13.35,14.03])for(let zz of [6.88,7.55])box(group,xx,yy,zz,.62,.5,.6,caseMat);

  // Moving jugs on visible conveyor segments.
  const linePath=[[-1.3,-2],[1.45,-2]];
  const outputPath=[[4.7,-2],[7.2,-2],[7.2,1],[4.5,1],[4.5,4],[5.25,4]];
  function pathSample(points,u) {
    let total=0;const lengths=[];
    for(let i=0;i<points.length-1;i++){const l=Math.hypot(points[i+1][0]-points[i][0],points[i+1][1]-points[i][1]);lengths.push(l);total+=l;}
    let at=((u%1)+1)%1*total;
    for(let i=0;i<lengths.length;i++){
      if(at<=lengths[i]||i===lengths.length-1){const f=at/lengths[i];return{x:points[i][0]+(points[i+1][0]-points[i][0])*f,z:points[i][1]+(points[i+1][1]-points[i][1])*f,rot:Math.atan2(points[i+1][0]-points[i][0],points[i+1][1]-points[i][1])};}at-=lengths[i];
    }
  }
  const inJugs=[],outJugs=[];
  for(let i=0;i<7;i++){const j=jug(group,0,1.15,0,.83);inJugs.push(j);}
  for(let i=0;i<17;i++){const j=jug(group,0,1.15,0,.83);outJugs.push(j);}
  const jamJug=jug(group,-.3,1.19,-2,.84);jamJug.name='Illustrative tipped jug';jamJug.visible=false;
  // Empty jugs on the supply conveyor: no syrup, no cap. Placed by placeSupply().
  const emptyBodyMat=jugBodyMat===jugMat?jugMat:jugBodyMat.clone();
  function makeEmpty(j){j.getObjectByName('Cap').visible=false;const f=j.getObjectByName('Syrup');if(f)f.visible=false;if(look==='real')j.children[0].material=emptyBodyMat;j.userData.empty=true;return j;}
  // The supply remains empty and uncapped through the filler infeed in every look.
  inJugs.forEach(makeEmpty);
  const supplyJugs=[];
  for(let i=0;i<34;i++){const j=makeEmpty(jug(group,0,1.15,0,.83));j.userData.supply=true;supplyJugs.push(j);}
  const supplyLen=supplyPath.slice(1).reduce((a,q,i)=>a+Math.hypot(q[0]-supplyPath[i][0],q[1]-supplyPath[i][1]),0);
  // Jugs evenly spaced along the supply belt, moved forward by `travel` metres. Jug 0 leads.
  // The infeed takes over at the belt's end, (-1.4, -2).
  function placeSupply(travel=0,gap=.38){
    supplyJugs.forEach((j,i)=>{
      const s=((travel-i*gap)%supplyLen+supplyLen)%supplyLen;
      const q=pathSample(supplyPath,s/supplyLen);j.position.set(q.x,1.15,q.z);j.rotation.set(0,q.rot,0);j.visible=true;
    });
  }

  // Two visible camera housings make camera-first observation concrete.
  const cameras=[];
  function observationCamera(x,z,aim) {
    const c=new THREE.Group();c.name='Illustrative observation camera';c.position.set(x,0,z);group.add(c);
    cylinder(c,0,1.7,0,.045,.045,3.4,dark,10);bar(c,[0,3.4,0],[.45,3.4,0],.04,dark);
    const device=new THREE.Group();device.position.set(.45,3.4,0);device.rotation.y=aim;c.add(device);
    box(device,0,0,0,.32,.22,.46,wallMat);box(device,0,-.02,.245,.21,.14,.035,dark);
    const lens=cylinder(device,0,-.02,.28,.055,.055,.07,blue,16);lens.rotation.x=Math.PI/2;
    cameras.push(c);return c;
  }
  observationCamera(1.2,-5.3,.45);observationCamera(9.4,1.5,-.6);

  const realProps=new THREE.Group();realProps.name='Real floor props';
  if(look==='real')applyRealLook();
  if(look==='twin')applyTwinLook();

  function applyRealLook() {
    // The plant today: real materials, no glow, no status colours.
    floorMat.color.set(0x8c877d);floorMat.roughness=.86;floorMat.metalness=0;
    const tex=concreteTexture();if(tex){floorMat.map=tex;floorMat.color.set(0xffffff);}
    wallMat.color.set(0xd8d2c4);
    metal.color.set(0xc3cbcd);metal.roughness=.3;
    polished.color.set(0xdfe4e5);
    brushed.color.set(0x9aa5a9);brushed.roughness=.42;
    dark.color.set(0x4b525a);dark.metalness=.3;dark.roughness=.55;
    beltMat.color.set(0x161718);beltMat.roughness=.72;beltMat.metalness=.05;
    teal.color.set(0x2c5f93);teal.metalness=.25;teal.roughness=.45;
    blue.color.set(0x2c5f93);blue.metalness=.25;blue.roughness=.45;
    laneMat.color.set(0xf0c419);
    flowMat.color.set(0xc9d1d3);
    jugMat.color.set(0xf7f6f1);jugMat.roughness=.45;
    jugBodyMat.color.set(0xfbfaf6);jugBodyMat.transparent=true;jugBodyMat.opacity=.34;jugBodyMat.roughness=.25;jugBodyMat.depthWrite=false;
    emptyBodyMat.color.set(0xf4f3ee);emptyBodyMat.transparent=true;emptyBodyMat.opacity=.78;emptyBodyMat.roughness=.4;emptyBodyMat.depthWrite=false;
    syrupMat.color.set(0xa0520a);syrupMat.roughness=.18;syrupMat.emissive=new THREE.Color(0x5a2603);syrupMat.emissiveIntensity=.5;
    floorLineMat.opacity=0;group.traverse(o=>{if(o.isLine)o.visible=false;});
    for(const l of Object.values(statusLights)){l.material.color.set(0xd9dee0);l.material.emissive.set(0x000000);}
    // Yellow safety rails along the front aisle, bollards at its ends, warm light fittings overhead.
    const railMat=new THREE.MeshStandardMaterial({color:0xf2c418,roughness:.5,metalness:.15});
    const fixMat=new THREE.MeshStandardMaterial({color:0xfff3dc,emissive:0xffd9a0,emissiveIntensity:1.4,roughness:.5});
    group.add(realProps);
    for(const [x0,x1] of [[-13.5,-6.2],[-4.4,2.6],[4.2,13.2]]){
      for(const y of [.55,1.05])bar(realProps,[x0,y,7.25],[x1,y,7.25],.045,railMat);
      const n=Math.max(1,Math.round((x1-x0)/2.2));
      for(let i=0;i<=n;i++){const x=x0+(x1-x0)*i/n;bar(realProps,[x,0,7.25],[x,1.08,7.25],.05,railMat);box(realProps,x,.03,7.25,.22,.06,.22,railMat);}
    }
    for(const x of [-14.2,-5.3,3.4,13.9])cylinder(realProps,x,.55,7.25,.13,.13,1.1,railMat,16);
    // Rail on the walkway behind the infeed and filler, and yellow floor tape around the filler.
    for(const y of [.55,1.05])bar(realProps,[-1.2,y,-4.45],[5.6,y,-4.45],.045,railMat);
    for(let i=0;i<=4;i++){const x=-1.2+6.8*i/4;bar(realProps,[x,0,-4.45],[x,1.08,-4.45],.05,railMat);}
    for(const [cx,cz,w,d] of [[3,-2,4.9,4.6]]){box(realProps,cx,.012,cz-d/2,w,.01,.09,laneMat);box(realProps,cx,.012,cz+d/2,w,.01,.09,laneMat);box(realProps,cx-w/2,.012,cz,.09,.01,d,laneMat);box(realProps,cx+w/2,.012,cz,.09,.01,d,laneMat);}
    for(let x=-11;x<=12;x+=5.5){
      box(realProps,x,6.4,-1,.35,.08,2.4,fixMat);
      bar(realProps,[x,6.44,-1.9],[x,8,-1.9],.012,dark);bar(realProps,[x,6.44,-.1],[x,8,-.1],.012,dark);
    }
  }
  function applyTwinLook() {
    // Same values as the Step 1 restyle in frames-01-03/lib/opening.js, so parts match.
    floorMat.color.set(0x0a0d11);floorMat.roughness=.92;floorMat.metalness=0;
    wallMat.color.set(0x1a232d);wallMat.roughness=.8;
    beltMat.color.set(0x1c2a33);
    teal.color.set(0x3a5466);teal.metalness=.5;
    flowMat.color.set(0x5cc8ff);
    laneMat.color.set(0x3a4652);
    jugMat.color.set(0xf4f7fa);jugMat.emissive.set(0x9fb4c8);jugMat.emissiveIntensity=.18;
    metal.roughness=.38;metal.metalness=.75;polished.roughness=.3;polished.metalness=.85;
    floorLineMat.color.set(0x5cc8ff);floorLineMat.opacity=.07;
    group.traverse(o=>{if(o.name.startsWith('Cutaway'))o.visible=false;});
    for(const o of group.children){if(!o.isMesh)continue;const b=new THREE.Box3().setFromObject(o);if((b.min.z+b.max.z)/2<-8)o.visible=false;}
  }
  function concreteTexture() {
    // Seeded mottled concrete, drawn locally so every render is identical.
    if(typeof document==='undefined')return null;
    const c=document.createElement('canvas');c.width=c.height=512;const g=c.getContext('2d');
    g.fillStyle='#8f8a80';g.fillRect(0,0,512,512);
    let seed=17;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
    for(let i=0;i<2600;i++){const v=120+Math.floor(rnd()*60);g.fillStyle=`rgba(${v},${v-4},${v-10},${.05+rnd()*.08})`;const x=rnd()*512,y=rnd()*512,r=4+rnd()*26;for(const dx of [-512,0,512])for(const dy of [-512,0,512]){g.beginPath();g.arc(x+dx,y+dy,r,0,Math.PI*2);g.fill();}}
    for(let i=0;i<9000;i++){const v=rnd()<.5?70:200;g.fillStyle=`rgba(${v},${v},${v},.12)`;g.fillRect(rnd()*512,rnd()*512,1.5,1.5);}
    const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(6,4);t.colorSpace=THREE.SRGBColorSpace;return t;
  }

  // Consistent pick IDs on each machine's complete subtree.
  for(const [id,m] of Object.entries(machines))m.group.traverse(o=>{o.userData.machineId=id;});
  const extents=new THREE.Box3().setFromObject(group);
  let meshCount=0;group.traverse(o=>{if(o.isMesh)meshCount++;});
  group.userData.meshCount=meshCount;
  group.userData.bounds={min:extents.min.toArray(),max:extents.max.toArray()};

  function update(time=0,state={}) {
    const selected=state.selected||null,down=!!state.down;
    const motionTime=Number.isFinite(state.motionTime)?state.motionTime:(down?Math.min(time,state.stoppedAt??26):time);
    rotor.rotation.y=motionTime*.32;
    const feed=state.activeFeed||'CS3';
    flowOverlays.CS3.visible=feed==='CS3'&&state.flow!==false;
    flowOverlays.CS5.visible=feed==='CS5'&&state.flow!==false;
    for(const [id,r] of Object.entries(selectionRings)) {
      r.visible=id===selected;r.material.opacity=.55+.25*Math.sin(time*2.4);
      r.material.color.set(id==='ILFA2'&&down?0xf0a953:0x20caae);
    }
    if(look!=='real')for(const [id,l] of Object.entries(statusLights)) {
      const isDown=(id==='ILFA2'&&down)||(id===state.downMachine);
      l.material.color.set(isDown?0xf2a24c:0x29c9a6);l.material.emissive.set(isDown?0x9a3e0c:0x0a735c);
      l.material.emissiveIntensity=isDown?.65+.25*Math.sin(time*3):.55;
    }
    placeSupply(motionTime*.065*(linePath[1][0]-linePath[0][0]));
    inJugs.forEach((j,i)=>{const p=pathSample(linePath,i/inJugs.length+motionTime*.065);j.position.set(p.x,1.15,p.z);j.rotation.y=p.rot;});
    outJugs.forEach((j,i)=>{const p=pathSample(outputPath,i/outJugs.length+motionTime*.025);j.position.set(p.x,1.15,p.z);j.rotation.y=p.rot;});
    jamJug.visible=down;jamJug.rotation.z=down?-Math.PI/2:0;
    if(down)jamJug.position.set(-.15,1.32,-2);
    if(state.showCameras!==undefined)cameras.forEach(c=>{c.visible=!!state.showCameras;});
    return {selected,down,activeFeed:feed,meshCount};
  }
  update(0,{activeFeed:'CS3'});
  return {group,machines,update,cameras,selectionRings,rotor,fillerHMI,hmiScreen,flowOverlays,jamJug,meshCount,look,realProps,makeJug:(parent=group)=>jug(parent,0,1.15,0,.83),makeEmpty,supplyPath,supplyLen,supplyJugs,placeSupply};
}

// Warm overhead plant lighting for the 'real' look. Call once on the scene that holds a real factory.
export function realFloorStage(THREE, scene, renderer) {
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.0;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  scene.background=new THREE.Color(0x4a453d);scene.fog=new THREE.Fog(0x4a453d,34,72);
  const pmrem=new THREE.PMREMGenerator(renderer);const env=new THREE.Scene();
  env.add(new THREE.Mesh(new THREE.SphereGeometry(50,32,16),new THREE.MeshBasicMaterial({color:0x4a4339,side:THREE.BackSide})));
  for(const [x,y,z,w,h,c] of [[0,30,0,60,10,0xfff0d8],[-40,10,-10,8,24,0xd9e2ea],[40,10,20,8,24,0xffe6c8]]){
    const s=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:c,side:THREE.DoubleSide}));s.position.set(x,y,z);s.lookAt(0,0,0);env.add(s);
  }
  scene.environment=pmrem.fromScene(env,.04).texture;scene.environmentIntensity=.75;
  const lights=new THREE.Group();lights.name='Real floor lights';scene.add(lights);
  lights.add(new THREE.HemisphereLight(0xfff1dc,0x6a6158,1.1));
  const key=new THREE.DirectionalLight(0xffe4bd,2.3);key.position.set(4,22,12);key.castShadow=true;key.shadow.mapSize.set(2048,2048);
  Object.assign(key.shadow.camera,{left:-20,right:20,top:20,bottom:-20,near:1,far:70});key.shadow.bias=-.0004;lights.add(key);
  const fill=new THREE.DirectionalLight(0xdfe8f0,.7);fill.position.set(-16,9,18);lights.add(fill);
  for(let x=-11;x<=12;x+=5.5){const p=new THREE.PointLight(0xffd6a0,22,13,1.6);p.position.set(x,6.1,-1);lights.add(p);}
  return lights;
}

// Line operator for the 'real' look: white coat, hairnet, dark trousers, black safety boots, blue gloves.
// Returns {group, legs, arms, torso}. Rotate legs and arms on x to walk or reach, as frames-01-03 does.
export function createOperator(THREE, opts = {}) {
  if (opts.rigged) return createRiggedOperator(THREE);
  const group=new THREE.Group();group.name='Operator (illustrative)';
  const coat=new THREE.MeshStandardMaterial({color:0xf3f2ee,roughness:.75});
  const net=new THREE.MeshStandardMaterial({color:0xeef1f5,roughness:.9,transparent:true,opacity:.9});
  const hair=new THREE.MeshStandardMaterial({color:0x2a1d14,roughness:.8});
  const skin=new THREE.MeshStandardMaterial({color:0xb98462,roughness:.6});
  const trousers=new THREE.MeshStandardMaterial({color:0x2c3440,roughness:.8});
  const boots=new THREE.MeshStandardMaterial({color:0x111214,roughness:.7});
  const gloves=new THREE.MeshStandardMaterial({color:0x3f7fc4,roughness:.5});
  const part=(geo,mat,parent,x,y,z)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;};
  const legs=[-.11,.11].map(x=>{const hip=new THREE.Group();hip.position.set(x,.92,0);group.add(hip);part(new THREE.CapsuleGeometry(.08,.72,4,10),trousers,hip,0,-.44,0);part(new THREE.BoxGeometry(.15,.1,.3),boots,hip,0,-.87,.05);return hip;});
  const torso=new THREE.Group();group.add(torso);
  part(new THREE.CapsuleGeometry(.2,.52,6,14),coat,torso,0,1.3,0).scale.set(1,1,.72);
  part(new THREE.CylinderGeometry(.21,.27,.5,18,1,true),coat,torso,0,.86,0).scale.set(1,1,.78);
  part(new THREE.SphereGeometry(.13,16,12),skin,torso,0,1.78,0);
  part(new THREE.SphereGeometry(.137,16,10,0,Math.PI*2,0,Math.PI*.55),hair,torso,0,1.79,-.01);
  part(new THREE.SphereGeometry(.15,18,10,0,Math.PI*2,0,Math.PI*.4),net,torso,0,1.8,-.03).scale.set(1,.95,1.08);
  const arms=[-.27,.27].map(x=>{const sh=new THREE.Group();sh.position.set(x,1.58,0);torso.add(sh);part(new THREE.CapsuleGeometry(.068,.56,4,10),coat,sh,0,-.33,0);part(new THREE.SphereGeometry(.062,10,8),gloves,sh,0,-.68,0);return sh;});
  return {group,legs,arms,torso};
}


// Local CC0 human variant for the real floor. Legacy callers above remain synchronous.
// Await createOperator(THREE, {rigged: true}), then call pose() at each sought time.
async function createRiggedOperator(THREE) {
  const { GLTFLoader } = await import('./GLTFLoader.js');
  const gltf = await new GLTFLoader().loadAsync(new URL('./operator/operator.glb', import.meta.url).href);
  const group = new THREE.Group(); group.name = 'Operator, local CC0 human';
  const model = gltf.scene; group.add(model);
  model.updateMatrixWorld(true);
  const bones = {}; let body;
  model.traverse(o => {
    if (o.isBone) bones[o.name] = o;
    if (o.isSkinnedMesh && o.name === 'SuperHero_Male') body = o;
    if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; o.frustumCulled = false; }
  });
  if (!body) throw new Error('Operator body missing from local GLB');
  const coat = new THREE.MeshStandardMaterial({color:0xf1f1eb, roughness:.86, side:THREE.DoubleSide});
  const seam = new THREE.MeshStandardMaterial({color:0xced2d0, roughness:.95});
  const net = new THREE.MeshStandardMaterial({color:0xdde9eb, roughness:.98, transparent:true, opacity:.88});
  const attach = (bone, mesh) => { model.add(mesh); mesh.updateMatrixWorld(); bones[bone].attach(mesh); mesh.castShadow = true; return mesh; };
  const box = (bone, xyz, size, mat=coat) => { const m=new THREE.Mesh(new THREE.BoxGeometry(...size),mat);m.position.set(...xyz);return attach(bone,m); };
  // A split coat hem uses the same skeleton, so it follows the hips and each thigh.
  const positions=[], indices=[], skinIndices=[], skinWeights=[];
  const pelvis=body.skeleton.bones.indexOf(bones.pelvis);
  for (let half=0;half<2;half++) {
    const thigh=body.skeleton.bones.indexOf(bones[half===0?'thigh_l':'thigh_r']);
    for(let row=0;row<2;row++) for(let i=0;i<=12;i++) {
      const a=(half===0?.06:Math.PI+.06)+i*(Math.PI-.12)/12;
      positions.push(Math.sin(a)*(row?.255:.205),row?.69:1.08,Math.cos(a)*(row?.155:.145));
      skinIndices.push(pelvis,thigh,0,0);skinWeights.push(row?.55:1,row?.45:0,0,0);
    }
    const start=half*26;for(let i=0;i<12;i++){const a=start+i,b=a+13;indices.push(a,b,a+1,b,b+1,a+1);}
  }
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  geo.setAttribute('skinIndex',new THREE.Uint16BufferAttribute(skinIndices,4));geo.setAttribute('skinWeight',new THREE.Float32BufferAttribute(skinWeights,4));geo.setIndex(indices);geo.computeVertexNormals();
  const hem=new THREE.SkinnedMesh(geo,coat);body.parent.add(hem);hem.bind(body.skeleton,body.bindMatrix);hem.frustumCulled=false;hem.castShadow=true;
  // Collar, lapels, breast pocket and front buttons make the white layer read as a coat.
  for(const side of [-1,1]) {
    const lapel=box('spine_03',[side*.065,1.43,.124],[.075,.20,.018]);lapel.rotateZ(side*.30);
    box('neck_01',[side*.064,1.535,.025],[.055,.06,.10]);
    box('pelvis',[side*.135,.91,.151],[.105,.105,.014]);
    box('pelvis',[side*.135,.962,.162],[.108,.009,.009],seam);
  }
  box('spine_03',[-.125,1.35,.131],[.085,.08,.013]);
  for(let i=0;i<4;i++)box(i<2?'spine_02':'pelvis',[.014,1.28-i*.105,.156],[.014,.014,.009],seam);
  const hairnet=new THREE.Mesh(new THREE.SphereGeometry(.122,24,14,0,Math.PI*2,0,Math.PI*.68),net);
  hairnet.position.set(0,1.735,-.012);hairnet.scale.set(.92,.84,1.08);attach('Head',hairnet);
  const rim=new THREE.Mesh(new THREE.TorusGeometry(.112,.006,6,32),coat);rim.rotation.x=Math.PI/2;rim.position.set(0,1.686,-.012);attach('Head',rim);
  const bootMat=new THREE.MeshStandardMaterial({color:0x12151a,roughness:.82});
  const bootMeshes=[];
  for(const side of [-1,1]) {
    const boot=new THREE.Mesh(new THREE.CapsuleGeometry(.061,.13,6,12),bootMat);boot.rotation.x=Math.PI/2;boot.scale.set(1,.8,.8);boot.position.set(side*.106,.073,.037);attach(side>0?'foot_l':'foot_r',boot);bootMeshes.push(boot);
  }
  // Regularize the broad free-pack body without changing bone lengths or animation timing.
  model.scale.set(.86,1.04,.98); model.position.y=.012;
  // Sample bone tracks directly. Mixer write caching conflicts with a seek function
  // that resets and solves bones, especially when the exact same time is requested twice.
  const rest=Object.values(bones).map(b=>[b,b.quaternion.clone()]);
  const prepare=(name)=>{
    const clip=gltf.animations.find(c=>c.name===name);
    return {duration:clip.duration,tracks:clip.tracks.map(track=>{
      const binding=THREE.PropertyBinding.parseTrackName(track.name);
      const bone=model.getObjectByName(binding.nodeName)||model.getObjectByProperty('uuid',binding.nodeName);
      if(!bone || binding.propertyName!=='quaternion')throw new Error('Unexpected operator animation track '+track.name);
      return {bone,sample:track.createInterpolant(new Float32Array(4))};
    })};
  };
  const idle=prepare('Idle_Loop'),walk=prepare('Walk_Loop');
  function pose({time=0,walkTime=0,walkWeight=0,reach=0,handTarget=null,activeHand='both'}={}) {
    model.position.y=.012;
    for(const [b,q] of rest)b.quaternion.copy(q);
    for(const track of idle.tracks)track.bone.quaternion.fromArray(track.sample.evaluate((time+.6)%idle.duration));
    if(walkWeight>0)for(const track of walk.tracks){const q=new THREE.Quaternion().fromArray(track.sample.evaluate(walkTime%walk.duration));track.bone.quaternion.slerp(q,walkWeight);}
    group.updateMatrixWorld(true);
    const floorY=group.getWorldPosition(new THREE.Vector3()).y;
    const feetY=Math.min(...bootMeshes.map(m=>new THREE.Box3().setFromObject(m).min.y));
    model.position.y-=feetY-floorY;group.updateMatrixWorld(true);
    // Solve the last reach against the visible jug, after evaluating the authored pose.
    // Resetting to the sampled pose each call makes out-of-order seeking reproducible.
    for(const side of ['r','l']) {
      const swing=Math.sin(walkTime/walk.duration*Math.PI*2)*(side==='l'?1:-1)*.20*walkWeight;
      const target=group.localToWorld(new THREE.Vector3(side==='l'?.22:-.22,.91,.03+swing));
      if(handTarget && reach>0 && (activeHand==='both'||activeHand===side)){const grip=handTarget.clone();if(side==='l' && activeHand==='both')grip.add(new THREE.Vector3(-.10,-.06,-.035));target.lerp(grip,reach);if(activeHand==='both')target.y+=.20*Math.sin(Math.PI*reach);}
      const chain=[bones['lowerarm_'+side],bones['upperarm_'+side]];

      for(let i=0;i<8;i++) for(const joint of chain) {
        group.updateMatrixWorld(true);
        const origin=joint.getWorldPosition(new THREE.Vector3());
        const hand=bones['hand_'+side].getWorldPosition(new THREE.Vector3());
        const from=hand.sub(origin).normalize(),to=target.clone().sub(origin).normalize();
        const delta=new THREE.Quaternion().setFromUnitVectors(from,to);
        const world=joint.getWorldQuaternion(new THREE.Quaternion()).premultiply(delta);
        const parent=joint.parent.getWorldQuaternion(new THREE.Quaternion()).invert();
        joint.quaternion.copy(parent.multiply(world));
      }

    }
    group.updateMatrixWorld(true);
  }
  pose();
  return {group,model,bones,pose};
}
