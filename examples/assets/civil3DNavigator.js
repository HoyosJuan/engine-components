import{I as p,y as l}from"./web-ifc-api-BC8YMRiS.js";import{f as m,p as h,s as f,k as g,N as u,u as w,C as v}from"./index-DQ59awSV.js";import{p as y}from"./index-DyM33b1I.js";import{Z as C,C as b}from"./index-CbpeNpX6.js";import{S as A}from"./stats.min-GTpOrGrX.js";import{R as U}from"./renderer-with-2d-BWBYTINn.js";import"./import-wrapper-prod-LhqN7JJy.js";import"./Line2-7GsqoD5b.js";import"./mark-C2WpAUb-.js";import"./_commonjsHelpers-Cpj98o6Y.js";y.init();C.init();const d=document.getElementById("container"),t=new m,P=t.get(h),e=P.create();e.scene=new f(t);e.renderer=new U(t,d);e.camera=new g(t);t.init();e.scene.setup();e.camera.controls.setLookAt(5,5,5,0,0,0);d.appendChild(e.renderer.three2D.domElement);const S=t.get(u);S.create(e);const k=t.get(w),B=await fetch("https://thatopen.github.io/engine_components/resources/road.frag"),D=await B.arrayBuffer(),E=new Uint8Array(D),s=await k.load(E);e.scene.three.add(s);const I=await fetch("https://thatopen.github.io/engine_components/resources/road.json");s.setLocalProperties(await I.json());const r=t.get(b);r.world=e;r.draw(s);const L=t.get(v),i=L.create(e);i.threshold=10;for(const o of s.children)o instanceof p&&i.add(o);i.needsUpdate=!0;e.camera.controls.addEventListener("sleep",()=>{i.needsUpdate=!0});r.highlighter.hoverCurve.material.color.set(1,1,1);const{material:a}=r.highlighter.hoverPoints;if(Array.isArray(a)){const o=a[0];"color"in o&&o.color.set(1,1,1)}else"color"in a&&a.color.set(1,1,1);const c=new l(void 0,20);r.onHighlight.add(({point:o})=>{c.center.copy(o),e.camera.controls.fitToSphere(c,!0)});const n=new A;n.showPanel(2);document.body.append(n.dom);n.dom.style.left="0px";e.renderer.onBeforeUpdate.add(()=>n.begin());e.renderer.onAfterUpdate.add(()=>n.end());
