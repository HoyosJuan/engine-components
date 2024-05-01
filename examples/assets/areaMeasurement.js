var x=Object.defineProperty;var M=(a,n,e)=>n in a?x(a,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[n]=e;var i=(a,n,e)=>(M(a,typeof n!="symbol"?n+"":n,e),e);import{k as C,h as y,V as v,g as D,n as S,o as B,l as T,A as W,d as I,e as R,b as V}from"./unzipit.module-DoMll51G.js";import{S as K}from"./stats.min-GTpOrGrX.js";import{D as l,i as N,Q as z}from"./N8AO-DNqyA7wK.js";import{S as U}from"./index-CLyahKVC.js";import{M as F}from"./mark-CFP8TpRZ.js";import{D as G}from"./types-BHr6GdIp.js";import{P as Q}from"./index-DfGhfuKi.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./serializer-mvlfGVOZ.js";import"./stream-serializer-CIKXTIZE.js";class ${constructor(n,e,t){i(this,"enabled",!0);i(this,"visible",!0);i(this,"points",[]);i(this,"workingPlane",null);i(this,"labelMarker");i(this,"world");i(this,"components");i(this,"onDisposed",new l);i(this,"_rotationMatrix",null);i(this,"_dimensionLines",[]);i(this,"_defaultLineMaterial",new C({color:"red"}));i(this,"onAreaComputed",new l);i(this,"onWorkingPlaneComputed",new l);i(this,"onPointAdded",new l);i(this,"onPointRemoved",new l);this.world=e,this.components=n;const s=document.createElement("div");s.className=G,this.labelMarker=new F(e,s),this.labelMarker.visible=!1,this.onPointAdded.add(r=>{this.points.length===3&&!this._dimensionLines[2]&&(this.addDimensionLine(r,this.points[0]),this.labelMarker.visible=!0)}),t==null||t.forEach(r=>this.setPoint(r))}setPoint(n,e){let t;if(e?t=e:t=this.points.length===0?0:this.points.length,t===0){this.points[0]=n;return}if(t<0||t>this.points.length)return;const s=this.points.length>t;this.points[t]=n,this.onPointAdded.trigger(n),s||this.addDimensionLine(this.points[t-1],n);const{previousLine:r,nextLine:c}=this.getLinesBetweenIndex(t);r&&(r.endPoint=n),c&&(c.startPoint=n)}removePoint(n){if(this.points.length===3)return;this.points.splice(n,1);const{previousLine:e,nextLine:t}=this.getLinesBetweenIndex(n);t&&(e.endPoint=t.endPoint),t==null||t.dispose(),this._dimensionLines.splice(n,1),this.onPointRemoved.trigger()}toggleLabel(){this.labelMarker.toggleVisibility()}addDimensionLine(n,e){const t=document.createElement("div");t.className="w-2 h-2 bg-red-600 rounded-full";const s=new U(this.components,this.world,{start:n,end:e,lineMaterial:this._defaultLineMaterial,endpointElement:t});return s.toggleLabel(),this._dimensionLines.length>1?this._dimensionLines.splice(this._dimensionLines.length-1,0,s):this._dimensionLines.push(s),s}getLinesBetweenIndex(n){const e=n===0?this._dimensionLines.length-1:n-1,t=this._dimensionLines[e],s=this._dimensionLines[n];return{previousLine:t,nextLine:s}}computeWorkingPlane(){this.workingPlane=new y().setFromCoplanarPoints(this.points[0],this.points[1],this.points[2]);const n=new v(0,1,0),e=this.workingPlane.normal.angleTo(n),t=new v().crossVectors(this.workingPlane.normal,n).normalize();this._rotationMatrix=new D().makeRotationAxis(t,e),this.onWorkingPlaneComputed.trigger(this.workingPlane)}computeArea(){if(!(this._rotationMatrix&&this.workingPlane))return this.onAreaComputed.trigger(0),0;let n=0,e=0;const t=this._rotationMatrix,s=this.points.map(c=>{const P=c.clone().applyMatrix4(t),u=new S(P.x,P.z);return n+=u.x,e+=u.y,u}),r=Math.abs(B.area(s));return this.labelMarker.three.element.textContent=`${r.toFixed(2)} m²`,this.labelMarker.three.position.set(n/s.length,-this.workingPlane.constant,e/s.length).applyMatrix4(t.clone().invert()),this.onAreaComputed.trigger(r),r}dispose(){this.onAreaComputed.reset(),this.onWorkingPlaneComputed.reset(),this.onPointAdded.reset(),this.onPointRemoved.reset();for(const n of this._dimensionLines)n.dispose();this.labelMarker.dispose(),this._dimensionLines=[],this.points=[],this._rotationMatrix=null,this.workingPlane=null,this._defaultLineMaterial.dispose(),this.onDisposed.trigger(),this.onDisposed.reset()}get(){return{points:this.points,workingPlane:this.workingPlane,area:this.computeArea()}}}const d=class d extends N{constructor(e){super(e);i(this,"onDisposed",new l);i(this,"list",[]);i(this,"world");i(this,"_enabled",!1);i(this,"_vertexPicker");i(this,"_currentAreaElement",null);i(this,"_clickCount",0);i(this,"create",()=>{if(!this.enabled)return;if(!this.world)throw new Error("World not defined for the area measurement!");const e=this._vertexPicker.get(this.world);if(e){if(!this._currentAreaElement){const t=new $(this.components,this.world);t.onPointAdded.add(()=>{this._clickCount===3&&!t.workingPlane&&(t.computeWorkingPlane(),this._vertexPicker.workingPlane=t.workingPlane)}),t.onPointRemoved.add(()=>this._clickCount--),this._currentAreaElement=t}this._currentAreaElement.setPoint(e,this._clickCount),this._currentAreaElement.computeArea(),this._clickCount++}});i(this,"onMouseMove",()=>{if(!this.world){console.log("No world given for the area measurement!");return}const e=this._vertexPicker.get(this.world);e&&this._currentAreaElement&&(this._currentAreaElement.setPoint(e,this._clickCount),this._currentAreaElement.computeArea())});i(this,"onKeydown",e=>{this.enabled&&(e.key==="z"&&e.ctrlKey&&this._currentAreaElement&&this._currentAreaElement.removePoint(this._clickCount-1),e.key==="Enter"&&this._currentAreaElement&&this.endCreation(),e.key==="Escape"&&(this._clickCount===0&&!this._currentAreaElement?this.enabled=!1:this.cancelCreation()))});this.components.add(d.uuid,this),this._vertexPicker=new z(e)}set enabled(e){this._enabled=e,this._vertexPicker.enabled=e,this.setupEvents(e),e||this.cancelCreation()}get enabled(){return this._enabled}set workingPlane(e){this._vertexPicker.workingPlane=e}get workingPlane(){return this._vertexPicker.workingPlane}dispose(){this.setupEvents(!1),this._vertexPicker.dispose(),this._currentAreaElement&&this._currentAreaElement.dispose();for(const e of this.list)e.dispose();this.components=null,this.onDisposed.trigger(d.uuid),this.onDisposed.reset()}delete(){}deleteAll(){for(const e of this.list)e.dispose();this.list=[]}endCreation(){this._currentAreaElement&&(this.list.push(this._currentAreaElement),this._currentAreaElement.removePoint(this._clickCount),this._currentAreaElement.computeWorkingPlane(),this._currentAreaElement.computeArea(),this._currentAreaElement=null),this._vertexPicker.workingPlane=null,this._clickCount=0}cancelCreation(){this._currentAreaElement&&(this._currentAreaElement.dispose(),this._currentAreaElement=null),this._vertexPicker.workingPlane=null,this._clickCount=0}setupEvents(e){if(!this.world)throw new Error("The area measurement needs a world to work!");if(!this.world.renderer)throw new Error("The world of the area measurement needs a renderer!");const s=this.world.renderer.three.domElement.parentElement;e?(s.addEventListener("click",this.create),s.addEventListener("mousemove",this.onMouseMove),window.addEventListener("keydown",this.onKeydown)):(s.removeEventListener("click",this.create),s.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("keydown",this.onKeydown))}};i(d,"uuid","c453a99e-f054-4781-9060-33df617db4a5");let p=d;const w=document.getElementById("container"),o=new(void 0),E=new(void 0)(o);E.setup();o.scene=E;const g=new Q(o,w);o.renderer=g;const A=new(void 0)(o);o.camera=A;o.raycaster=new(void 0)(o);o.init();const f=o.scene.get();A.controls.setLookAt(10,10,10,0,0,0);const k=new T;k.position.set(5,10,3);k.intensity=.5;f.add(k);const L=new W;L.intensity=.5;f.add(L);new(void 0)(o);const j=new I(3,3,3),q=new R({color:"#6528D7"}),_=new V(j,q);_.position.set(0,1.5,0);f.add(_);o.meshes.add(_);const m=new p(o);m.enabled=!0;w.ondblclick=()=>m.create();w.oncontextmenu=()=>m.endCreation();window.onkeydown=a=>{a.code==="Delete"||a.code};const b=new(void 0)(o,{name:"Main Toolbar",position:"bottom"});b.addChild(m.uiElement.get("main"));o.ui.addToolbar(b);const h=new K;h.showPanel(2);document.body.append(h.dom);h.dom.style.left="0px";g.onBeforeUpdate.add(()=>h.begin());g.onAfterUpdate.add(()=>h.end());
