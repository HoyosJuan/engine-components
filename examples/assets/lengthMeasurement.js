import{l as D,A as g,d as C,e as y,b as L,C as A}from"./unzipit.module-DoMll51G.js";import{S as M}from"./stats.min-GTpOrGrX.js";import{g as k}from"./lil-gui.module.min-Bc0DeA9g.js";import"./N8AO-DNqyA7wK.js";import{L as B}from"./index-HOyTyDmT.js";import{P as F}from"./index-DfGhfuKi.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./serializer-mvlfGVOZ.js";import"./stream-serializer-CIKXTIZE.js";import"./index-CLyahKVC.js";import"./types-BHr6GdIp.js";import"./mark-CFP8TpRZ.js";const l=document.getElementById("container"),e=new(void 0),m=new(void 0)(e);m.setup();e.scene=m;const i=new F(e,l);e.renderer=i;const p=new(void 0)(e);e.camera=p;e.raycaster=new(void 0)(e);e.init();const d=e.scene.get();p.controls.setLookAt(10,10,10,0,0,0);const a=new D;a.position.set(5,10,3);a.intensity=.5;d.add(a);const u=new g;u.intensity=.5;d.add(u);new(void 0)(e);const S=new C(3,3,3),v=new y({color:"#6528D7"}),r=new L(S,v);r.position.set(0,1.5,0);d.add(r);e.meshes.add(r);const n=new B(e);n.enabled=!0;n.snapDistance=1;l.ondblclick=()=>n.create();window.onkeydown=t=>{(t.code==="Delete"||t.code==="Backspace")&&n.delete()};const w=new(void 0)(e,{name:"Main Toolbar",position:"bottom"});w.addChild(n.uiElement.get("main"));e.ui.addToolbar(w);const o=new M;o.showPanel(2);document.body.append(o.dom);o.dom.style.left="0px";i.onBeforeUpdate.add(()=>o.begin());i.onAfterUpdate.add(()=>o.end());const b=new k,f=b.addFolder("Shortcuts"),h={"Create dimension":"Double click","Delete dimension":"Delete"};f.add(h,"Create dimension");f.add(h,"Delete dimension");const s=b.addFolder("Actions");s.add(n,"enabled").name("Dimensions enabled");s.add(n,"visible").name("Dimensions visible");const x={value:0},c=new A;s.addColor(x,"value").name("Dimensions color").onChange(t=>{c.setHex(t),n.color=c});const P={"Delete all dimensions":()=>{n.deleteAll()}};s.add(P,"Delete all dimensions");
