import{D as I,A as S,C as u,B as v,b as A,M as h,d as l,L as w}from"./web-ifc-api-BFxa4VQ4.js";import{S as F}from"./stats.min-GTpOrGrX.js";import{g as k}from"./lil-gui.module.min-Bc0DeA9g.js";import"./import-wrapper-prod-BtIvq9o4.js";import{E as z}from"./index-DDeTVJ4t.js";import{P as R}from"./index-BneKMXsD.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-Czb5ZY1a.js";const g=document.getElementById("container"),e=new(void 0),M=new(void 0)(e);M.setup();e.scene=M;const i=new R(e,g);e.renderer=i;const b=new(void 0)(e);e.camera=b;e.raycaster=new(void 0)(e);e.init();i.postproduction.enabled=!0;i.postproduction.customEffects.outlineEnabled=!0;b.controls.setLookAt(10,10,10,0,0,0);const r=e.scene.get(),p=new I;p.position.set(5,10,3);p.intensity=.5;r.add(p);const f=new S;f.intensity=.5;r.add(f);const O=new(void 0)(e,new u(6710886));i.postproduction.customEffects.excludedMeshes.push(O.get());const y=new v(3,3,3),x=new A({color:"#6528D7"}),n=new h(y,x);n.position.set(-2,1.5,0);r.add(n);e.meshes.add(n);const o=new h(y,x);o.position.set(2,1.5,0);r.add(o);e.meshes.add(o);const t=new z(e);t.enabled=!0;const G=new l({color:"lightblue",side:2}),T=new w({color:"blue"}),P=new l({color:"blue",opacity:.2,side:2,transparent:!0});t.styles.create("Red lines",new Set([n]),T,G,P);const U=new l({color:"salmon",side:2}),W=new w({color:"red"}),C=new l({color:"red",opacity:.2,side:2,transparent:!0});t.styles.create("Blue lines",new Set([o]),W,U,C);g.ondblclick=()=>t.create();window.onkeydown=s=>{(s.code==="Delete"||s.code==="Backspace")&&t.delete(),s.code==="KeyP"&&console.log(t)};const d=new F;d.showPanel(2);document.body.append(d.dom);d.dom.style.left="0px";i.onBeforeUpdate.add(()=>d.begin());i.onAfterUpdate.add(()=>d.end());const D=new k,L=D.addFolder("Shortcuts"),B={"Create clipping plane":"Double click","Delete clipping plane":"Delete"};L.add(B,"Create clipping plane");L.add(B,"Delete clipping plane");const a=D.addFolder("Actions");a.add(t,"visible").name("Toggle clipping planes visible");a.add(t,"enabled").name("Toggle clipping planes enabled");const H={value:0},m=new u;a.addColor(H,"value").name("Plane color").onChange(s=>{m.setHex(s),"lineMaterial"in t.material&&(t.material.lineMaterial=m)});a.add(t,"size").name("Plane Size").min(0).max(15);a.add(t.material,"opacity").name("Plane Opacity").min(0).max(1);const c={value:.2};a.add(c,"value").name("Lines width").step(.1).min(.1).max(1).onChange(()=>{P.opacity=c.value,C.opacity=c.value});const E={"Delete all planes":()=>{t.deleteAll()},"Rotate cube":()=>{n.rotation.x=2*Math.PI*Math.random(),n.rotation.y=2*Math.PI*Math.random(),n.rotation.z=2*Math.PI*Math.random(),n.updateMatrix(),n.updateMatrixWorld(),o.rotation.x=2*Math.PI*Math.random(),o.rotation.y=2*Math.PI*Math.random(),o.rotation.z=2*Math.PI*Math.random(),o.updateMatrix(),o.updateMatrixWorld(),t.updateEdges()}};a.add(E,"Rotate cube");a.add(E,"Delete all planes");
