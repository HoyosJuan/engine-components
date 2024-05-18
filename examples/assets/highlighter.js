var z=Object.defineProperty;var L=(f,l,e)=>l in f?z(f,l,{enumerable:!0,configurable:!0,writable:!0,value:e}):f[l]=e;var o=(f,l,e)=>(L(f,typeof l!="symbol"?l+"":l,e),e);import{C as T,i as R,j as A,k as B}from"./web-ifc-api-BFxa4VQ4.js";import{S as _}from"./stats.min-GTpOrGrX.js";import{i as k,U as v,H as j,I as G,u as P,J,t as Z,k as K,O as $}from"./import-wrapper-prod-BtIvq9o4.js";import"./_commonjsHelpers-Cpj98o6Y.js";const S=class S extends k{constructor(e){super(e);o(this,"onDisposed",new v);o(this,"onBeforeUpdate",new v);o(this,"onAfterUpdate",new v);o(this,"onSetup",new v);o(this,"isSetup",!1);o(this,"enabled",!0);o(this,"events",{});o(this,"multiple","ctrlKey");o(this,"zoomFactor",1.5);o(this,"zoomToSelection",!1);o(this,"selection",{});o(this,"config",{selectName:"select",hoverName:"hover",selectionColor:new T("#BCF124"),hoverColor:new T("#6528D7"),autoHighlightOnClick:!0,world:null});o(this,"colors",new Map);o(this,"_mouseState",{down:!1,moved:!1});o(this,"clearHover",()=>{this.selection[this.config.hoverName]={}});o(this,"onMouseDown",()=>{this.enabled&&(this._mouseState.down=!0)});o(this,"onMouseUp",async e=>{const t=this.config.world;if(!t)throw new Error("No world found!");if(!t.renderer)throw new Error("This world doesn't have a renderer!");if(this.enabled&&e.target===t.renderer.three.domElement){if(this._mouseState.down=!1,this._mouseState.moved||e.button!==0){this._mouseState.moved=!1;return}if(this._mouseState.moved=!1,this.config.autoHighlightOnClick){const s=this.multiple==="none"?!0:!e[this.multiple];await this.highlight(this.config.selectName,s,this.zoomToSelection)}}});o(this,"onMouseMove",async()=>{if(!this.enabled)return;if(this._mouseState.moved){this.clear(this.config.hoverName);return}this._mouseState.moved=this._mouseState.down;const e=this.selection[this.config.selectName];await this.highlight(this.config.hoverName,!0,!1,e)});this.components.add(S.uuid,this)}async dispose(){this.setupEvents(!1),this.onBeforeUpdate.reset(),this.onAfterUpdate.reset(),this.selection={};for(const e in this.events)this.events[e].onClear.reset(),this.events[e].onHighlight.reset();this.onSetup.reset(),this.events={},this.onDisposed.trigger(S.uuid),this.onDisposed.reset()}add(e,t){if(this.selection[e]||this.colors.has(e))throw new Error("A selection with that name already exists!");this.colors.set(e,t),this.selection[e]={},this.events[e]={onHighlight:new v,onClear:new v}}async highlight(e,t=!0,s=this.zoomToSelection,u={}){if(!this.enabled)return null;if(!this.config.world)throw new Error("No world found in config!");const h=this.config.world;if(!this.selection[e])throw new Error(`Selection ${e} does not exist.`);const n=this.components.get(void 0).meshes,c=this.components.get(j).get(h).castRay(n);if(!c||!c.face)return this.clear(e),null;const w=c.object,b=w.geometry,y=c.instanceId;if(!b||y===void 0)return null;const E=w.fragment.getItemID(y);if(E===null)throw new Error("Item ID not found!");const D=w.fragment.group;if(!D)throw new Error("Fragment must belong to a FragmentsGroup!");const p=D.getFragmentMap([E]),g={};for(const m in p){const U=p[m],O=u[m];for(const F of U)(!O||!O.has(F))&&(g[m]||(g[m]=new Set),g[m].add(F))}return await this.highlightByID(e,g,t,s),{id:E,fragments:p}}async highlightByID(e,t,s=!0,u=this.zoomToSelection){if(!this.enabled)return;s&&this.clear(e);const h=this.components.get(void 0),i=this.colors.get(e);if(!i)throw new Error("Color for selection not found!");for(const n in t){const r=h.list.get(n);if(!r)continue;this.selection[e][n]||(this.selection[e][n]=new Set);const I=t[n];for(const c of I)this.selection[e][n].add(c),r.setColor(i,[c])}this.events[e].onHighlight.trigger(this.selection[e]),u&&await this.zoomSelection(e)}clear(e){const t=e?[e]:Object.keys(this.selection);for(const s of t){const u=this.components.get(void 0),h=this.selection[s];for(const i in this.selection[s]){const n=u.list.get(i);if(!n)continue;const r=h[i];r&&n.resetColor(r)}this.events[s].onClear.trigger(null),this.selection[s]={}}}setup(e){this.config={...this.config,...e},this.add(this.config.selectName,this.config.selectionColor),this.add(this.config.hoverName,this.config.hoverColor),this.setupEvents(!0),this.enabled=!0,this.isSetup=!0,this.onSetup.trigger(this)}async zoomSelection(e){if(!this.config.world)throw new Error("No world found in config!");const t=this.config.world;if(!t.camera.hasCameraControls())return;const s=this.components.get(void 0),u=this.components.get(void 0);s.reset();const h=this.selection[e];if(!Object.keys(h).length)return;for(const p in h){const g=u.list.get(p);if(!g)continue;const m=h[p];s.addMesh(g.mesh,m)}const i=s.getSphere(),n=1/0,r=-1/0,{x:I,y:c,z:w}=i.center,b=i.radius===n||I===n||c===n||w===n,y=i.radius===r||I===r||c===r||w===r,E=i.radius===0;if(b||y||E)return;i.radius*=this.zoomFactor,await t.camera.controls.fitToSphere(i,!0)}setupEvents(e){if(!this.config.world)throw new Error("No world found while setting up events!");if(!this.config.world.renderer)throw new Error("The given world doesn't have a renderer!");const t=this.config.world.renderer.three.domElement,s=this.events[this.config.selectName].onHighlight;s.remove(this.clearHover),t.removeEventListener("mousedown",this.onMouseDown),t.removeEventListener("mouseup",this.onMouseUp),t.removeEventListener("mousemove",this.onMouseMove),e&&(s.add(this.clearHover),t.addEventListener("mousedown",this.onMouseDown),t.addEventListener("mouseup",this.onMouseUp),t.addEventListener("mousemove",this.onMouseMove))}};o(S,"uuid","cb8a76f2-654a-4b50-80c6-66fd83cafd77");let M=S;const q=document.getElementById("container"),d=new G,Q=d.get(P),a=Q.create();a.scene=new J(d);a.renderer=new Z(d,q);a.camera=new K(d);d.init();a.camera.controls.setLookAt(12,6,8,0,0,-10);a.scene.setup();const V=d.get($);V.create(a);const C=d.get(void 0);await C.setup();const W=[R,A,B];for(const f of W)C.settings.excludedCategories.add(f);C.settings.webIfc.COORDINATE_TO_ORIGIN=!0;C.settings.webIfc.OPTIMIZE_PROFILES=!0;const X=await fetch("../../../../../resources/small.ifc"),Y=await X.arrayBuffer(),ee=new Uint8Array(Y),x=await C.load(ee);x.name="example";a.scene.three.add(x);const H=d.get(M);H.setup({world:a});H.zoomToSelection=!0;const N=new _;N.showPanel(2);document.body.append(N.dom);N.dom.style.left="0px";a.renderer.onBeforeUpdate.add(()=>N.begin());a.renderer.onAfterUpdate.add(()=>N.end());
