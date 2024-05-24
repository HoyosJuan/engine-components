var _=Object.defineProperty;var C=(i,l,e)=>l in i?_(i,l,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[l]=e;var c=(i,l,e)=>(C(i,typeof l!="symbol"?l+"":l,e),e);import{M as f,c as E,d as S,e as A,I,T as N}from"./web-ifc-api-BC8YMRiS.js";import{S as j}from"./stats.min-GTpOrGrX.js";import{J as K,U as z,H as x,_ as L,f as D,p as H,s as O,k as U,N as R,u as V}from"./index-DQ59awSV.js";import"./import-wrapper-prod-LhqN7JJy.js";import{P as G}from"./index-CvD1WrkP.js";import{M as J}from"./mark-C2WpAUb-.js";import{n as q}from"./dimension-mark-BiAWnjiH.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./renderer-with-2d-BWBYTINn.js";const y=class y extends K{constructor(e){super(e);c(this,"selection",[]);c(this,"preview",new f(new E,new S({side:2,depthTest:!1,transparent:!0,opacity:.25,color:"#BCF124"})));c(this,"selectionMaterial",new S({side:2,depthTest:!1,transparent:!0,color:"#BCF124",opacity:.75}));c(this,"world");c(this,"onDisposed",new z);c(this,"_enabled",!1);c(this,"_currentSelelection",null);c(this,"create",()=>{if(!this.world)throw new Error("No world given to the face measurement!");if(!this.enabled||!this._currentSelelection)return;const e=this.world.scene.three,o=new E,t=new f(o,this.selectionMaterial);o.setAttribute("position",this.preview.geometry.attributes.position),e.add(t),o.computeBoundingSphere();const{area:s,perimeter:r}=this._currentSelelection,n=this.newLabel(o,s);t.add(n.three),this.selection.push({area:s,perimeter:r,mesh:t,label:n})});c(this,"onMouseMove",()=>{if(!this.world)throw new Error("The face measurement needs a world to work!");if(!this.enabled){this.unselect();return}const t=this.components.get(x).get(this.world).castRay();if(!t||!t.object||t.faceIndex===void 0){this.unselect();return}const{object:s,faceIndex:r}=t;s instanceof f||s instanceof I?this.updateSelection(s,r,t.instanceId):this.unselect()});c(this,"onKeydown",e=>{});this.components.add(y.uuid,this),this.preview.frustumCulled=!1}set enabled(e){if(!this.world)throw new Error("No world given for the Face measurement!");this._enabled=e,this.setupEvents(e),e?this.world.scene.three.add(this.preview):(this.preview.removeFromParent(),this.cancelCreation()),this.setVisibility(e)}get enabled(){return this._enabled}dispose(){this.setupEvents(!1),this.deleteAll(),this.preview.removeFromParent(),this.preview.material.dispose(),this.preview.geometry.dispose(),this.selectionMaterial.dispose(),this.onDisposed.trigger(),this.onDisposed.reset(),this.components=null}delete(){if(!this.world)throw new Error("No world given to the face measurement!");const e=this.selection.map(a=>a.mesh),s=this.components.get(x).get(this.world).castRay(e);if(!s||!s.object)return;const r=this.selection.find(a=>a.mesh===s.object);if(!r)return;r.mesh.removeFromParent(),r.mesh.geometry.dispose(),r.label.dispose();const n=this.selection.indexOf(r);this.selection.splice(n,1)}deleteAll(){for(const e of this.selection)e.mesh.removeFromParent(),e.mesh.geometry.dispose(),e.label.dispose();this.selection=[]}endCreation(){}cancelCreation(){}get(){const e=[];for(const o of this.selection){const t=o.mesh.geometry,{area:s,perimeter:r}=o,n=t.attributes.position.array;e.push({position:n,area:s,perimeter:r})}return e}set(e){if(!this.world)throw new Error("No world given to the face measurement!");const o=this.world.scene.three;for(const t of e){const s=new E,r=new f(s,this.selectionMaterial);o.add(r);const n=new A(t.position,3);s.setAttribute("position",n),s.computeBoundingSphere();const{area:a,perimeter:m}=t,w=this.newLabel(s,a);r.add(w.three),this.selection.push({area:a,perimeter:m,mesh:r,label:w})}}setupEvents(e){if(!this.world)throw new Error("The face measurement needs a world to work!");if(!this.world.renderer)throw new Error("The world of the face measurement needs a renderer!");const t=this.world.renderer.three.domElement.parentElement;t.removeEventListener("click",this.create),t.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("keydown",this.onKeydown),e&&(t.addEventListener("click",this.create),t.addEventListener("mousemove",this.onMouseMove),window.addEventListener("keydown",this.onKeydown))}setVisibility(e){if(!this.world)throw new Error("The face measurement needs a world to work!");const o=this.world.scene.three;for(const t of this.selection){const s=t.label.three;e?(o.add(t.mesh),t.mesh.add(s)):(t.mesh.removeFromParent(),s.removeFromParent())}}unselect(){this.preview.removeFromParent(),this._currentSelelection=null}updateSelection(e,o,t){if(!this.world)throw new Error("The face measurement needs a world to work!");this.world.scene.three.add(this.preview);const n=this.components.get(L).getFace(e,o,t);if(n===null)return;const a=this.regenerateHighlight(e,n.indices,t);let m=0;for(const{distance:w}of n.edges)m+=w;this._currentSelelection={perimeter:m,area:a}}newLabel(e,o){if(!e.boundingSphere)throw new Error("Error computing area geometry");if(!this.world)throw new Error("The face measurement needs a world to work!");const{center:t}=e.boundingSphere,s=q(),r=Math.trunc(o*100)/100;s.textContent=r.toString();const n=new J(this.world,s);return n.three.position.copy(t),n}regenerateHighlight(e,o,t){const s=[],r=[];let n=0,a=0;const m=new N,w=this.components.get(L);for(const P of o){const{p1:g,p2:b,p3:v}=w.getVerticesAndNormal(e,P,t);s.push(g.x,g.y,g.z),s.push(b.x,b.y,b.z),s.push(v.x,v.y,v.z),m.set(g,b,v),a+=m.getArea(),r.push(n,n+1,n+2),n+=3}const B=new Float32Array(s),F=new A(B,3);return this.preview.geometry.setAttribute("position",F),this.preview.geometry.setIndex(r),a}};c(y,"uuid","30279548-1309-44f6-aa97-ce26eed73522");let k=y;const Q=document.getElementById("container"),h=new D,W=h.get(H),d=W.create();d.scene=new O(h);d.renderer=new G(h,Q);d.camera=new U(h);h.init();d.camera.controls.setLookAt(5,5,5,0,0,0);d.scene.setup();const X=h.get(R);X.create(d);const p=new k(h);p.world=d;p.enabled=!0;const Y=new V(h),Z=await fetch("https://thatopen.github.io/engine_components/resources/small.frag"),$=await Z.arrayBuffer(),ee=new Uint8Array($),T=Y.load(ee);d.scene.three.add(T);for(const i of T.children)i instanceof f&&d.meshes.add(i);let M;window.addEventListener("keydown",i=>{i.code==="KeyO"?p.delete():i.code==="KeyS"?(M=p.get(),p.deleteAll()):i.code==="KeyL"&&M&&p.set(M)});const u=new j;u.showPanel(2);document.body.append(u.dom);u.dom.style.left="0px";d.renderer.onBeforeUpdate.add(()=>u.begin());d.renderer.onAfterUpdate.add(()=>u.end());
