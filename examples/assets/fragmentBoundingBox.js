var A=Object.defineProperty;var B=(f,x,t)=>x in f?A(f,x,{enumerable:!0,configurable:!0,writable:!0,value:t}):f[x]=t;var m=(f,x,t)=>(B(f,typeof x!="symbol"?x+"":x,t),t);import{V as b,B as w,w as S,d as E,b as D,g as U,I as V}from"./unzipit.module-DoMll51G.js";import{g as N}from"./lil-gui.module.min-Bc0DeA9g.js";import{S as T}from"./stats.min-GTpOrGrX.js";import{b as L,E as X,D as C,C as G,S as I,a as W}from"./simple-camera-DjovITmo.js";import{W as F,S as P}from"./index-BTVbFBsP.js";import{G as v}from"./index-B2ugE8fu.js";import{F as k}from"./index-gcktSdaB.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./serializer-mvlfGVOZ.js";const d=class d extends L{constructor(t){super(t);m(this,"enabled",!0);m(this,"onDisposed",new X);m(this,"_absoluteMin");m(this,"_absoluteMax");m(this,"_meshes",[]);this.components.add(d.uuid,this),this._absoluteMin=d.newBound(!0),this._absoluteMax=d.newBound(!1)}static getDimensions(t){const{min:e,max:a}=t,i=Math.abs(a.x-e.x),n=Math.abs(a.y-e.y),s=Math.abs(a.z-e.z),c=new b;return c.subVectors(a,e).divideScalar(2).add(e),{width:i,height:n,depth:s,center:c}}static newBound(t){const e=t?1:-1;return new b(e*Number.MAX_VALUE,e*Number.MAX_VALUE,e*Number.MAX_VALUE)}static getBounds(t,e,a){const i=a||this.newBound(!1),n=e||this.newBound(!0);for(const s of t)s.x<n.x&&(n.x=s.x),s.y<n.y&&(n.y=s.y),s.z<n.z&&(n.z=s.z),s.x>i.x&&(i.x=s.x),s.y>i.y&&(i.y=s.y),s.z>i.z&&(i.z=s.z);return new w(e,a)}dispose(){const t=this.components.get(C);for(const e of this._meshes)t.destroy(e);this._meshes=[],this.onDisposed.trigger(d.uuid),this.onDisposed.reset()}get(){const t=this._absoluteMin.clone(),e=this._absoluteMax.clone();return new w(t,e)}getSphere(){const t=this._absoluteMin.clone(),e=this._absoluteMax.clone(),a=Math.abs((e.x-t.x)/2),i=Math.abs((e.y-t.y)/2),n=Math.abs((e.z-t.z)/2),s=new b(t.x+a,t.y+i,t.z+n),c=s.distanceTo(t);return new S(s,c)}getMesh(){const t=new w(this._absoluteMin,this._absoluteMax),e=d.getDimensions(t),{width:a,height:i,depth:n,center:s}=e,c=new E(a,i,n),o=new D(c);return this._meshes.push(o),o.position.copy(s),o}reset(){this._absoluteMin=d.newBound(!0),this._absoluteMax=d.newBound(!1)}add(t){for(const e of t.items)this.addMesh(e.mesh)}addMesh(t){if(!t.geometry.index)return;const e=d.getFragmentBounds(t);t.updateMatrixWorld();const a=t.matrixWorld,i=new U,n=t instanceof V,s=n?t.count:1;for(let c=0;c<s;c++){const o=e.min.clone(),r=e.max.clone();n&&(t.getMatrixAt(c,i),o.applyMatrix4(i),r.applyMatrix4(i)),o.applyMatrix4(a),r.applyMatrix4(a),o.x<this._absoluteMin.x&&(this._absoluteMin.x=o.x),o.y<this._absoluteMin.y&&(this._absoluteMin.y=o.y),o.z<this._absoluteMin.z&&(this._absoluteMin.z=o.z),o.x>this._absoluteMax.x&&(this._absoluteMax.x=o.x),o.y>this._absoluteMax.y&&(this._absoluteMax.y=o.y),o.z>this._absoluteMax.z&&(this._absoluteMax.z=o.z),r.x>this._absoluteMax.x&&(this._absoluteMax.x=r.x),r.y>this._absoluteMax.y&&(this._absoluteMax.y=r.y),r.z>this._absoluteMax.z&&(this._absoluteMax.z=r.z),r.x<this._absoluteMin.x&&(this._absoluteMin.x=r.x),r.y<this._absoluteMin.y&&(this._absoluteMin.y=r.y),r.z<this._absoluteMin.z&&(this._absoluteMin.z=r.z)}}static getFragmentBounds(t){const e=t.geometry.attributes.position,a=Number.MAX_VALUE,i=-a,n=new b(a,a,a),s=new b(i,i,i);if(!t.geometry.index)throw new Error("Geometry must be indexed!");const c=Array.from(t.geometry.index.array);for(let o=0;o<c.length;o++){if(o%3===0&&c[o]===0&&c[o+1]===0&&c[o+2]===0){o+=2;continue}const r=c[o],M=e.getX(r),y=e.getY(r),p=e.getZ(r);M<n.x&&(n.x=M),y<n.y&&(n.y=y),p<n.z&&(n.z=p),M>s.x&&(s.x=M),y>s.y&&(s.y=y),p>s.z&&(s.z=p)}return new w(n,s)}};m(d,"uuid","d1444724-dba6-4cdd-a0c7-68ee1450d166");let g=d;const R=document.getElementById("container"),l=new G,Y=l.get(F),u=Y.create();u.scene=new I(l);u.renderer=new P(l,R);u.camera=new W(l);l.init();u.camera.controls.setLookAt(12,6,8,0,0,-10);u.scene.setup();const Z=l.get(v);Z.create(u);const j=new k(l),q=await fetch("../../../../../resources/small.frag"),H=await q.arrayBuffer(),J=new Uint8Array(H),_=j.load(J);u.scene.three.add(_);const z=l.get(g);z.add(_);const K=z.getMesh();z.reset();const O={fitToModel:()=>u.camera.controls.fitToSphere(K,!0)},Q=new N;Q.add(O,"fitToModel").name("Fit to model");const h=new T;h.showPanel(2);document.body.append(h.dom);h.dom.style.left="0px";h.dom.style.right="auto";u.renderer.onBeforeUpdate.add(()=>h.begin());u.renderer.onAfterUpdate.add(()=>h.end());
