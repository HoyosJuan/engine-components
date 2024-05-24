var B=Object.defineProperty;var A=(f,x,t)=>x in f?B(f,x,{enumerable:!0,configurable:!0,writable:!0,value:t}):f[x]=t;var h=(f,x,t)=>(A(f,typeof x!="symbol"?x+"":x,t),t);import{V as p,p as g,y as S,B as D,M as E,a as I,J as U,I as V}from"./web-ifc-api-BC8YMRiS.js";import{S as N}from"./stats.min-GTpOrGrX.js";import{p as F,a as L,m as T}from"./index-DyM33b1I.js";import{C as X,E as C,D as G,a as W,W as v,S as P,b as k,c as J}from"./index-BY1If8xF.js";import{G as R}from"./index-DE4WfR4J.js";import{F as Y}from"./index-CqfCnTh7.js";import"./_commonjsHelpers-Cpj98o6Y.js";const u=class u extends X{constructor(t){super(t);h(this,"enabled",!0);h(this,"onDisposed",new C);h(this,"_absoluteMin");h(this,"_absoluteMax");h(this,"_meshes",[]);this.components.add(u.uuid,this),this._absoluteMin=u.newBound(!0),this._absoluteMax=u.newBound(!1)}static getDimensions(t){const{min:e,max:a}=t,r=Math.abs(a.x-e.x),n=Math.abs(a.y-e.y),s=Math.abs(a.z-e.z),c=new p;return c.subVectors(a,e).divideScalar(2).add(e),{width:r,height:n,depth:s,center:c}}static newBound(t){const e=t?1:-1;return new p(e*Number.MAX_VALUE,e*Number.MAX_VALUE,e*Number.MAX_VALUE)}static getBounds(t,e,a){const r=a||this.newBound(!1),n=e||this.newBound(!0);for(const s of t)s.x<n.x&&(n.x=s.x),s.y<n.y&&(n.y=s.y),s.z<n.z&&(n.z=s.z),s.x>r.x&&(r.x=s.x),s.y>r.y&&(r.y=s.y),s.z>r.z&&(r.z=s.z);return new g(e,a)}dispose(){const t=this.components.get(G);for(const e of this._meshes)t.destroy(e);this._meshes=[],this.onDisposed.trigger(u.uuid),this.onDisposed.reset()}get(){const t=this._absoluteMin.clone(),e=this._absoluteMax.clone();return new g(t,e)}getSphere(){const t=this._absoluteMin.clone(),e=this._absoluteMax.clone(),a=Math.abs((e.x-t.x)/2),r=Math.abs((e.y-t.y)/2),n=Math.abs((e.z-t.z)/2),s=new p(t.x+a,t.y+r,t.z+n),c=s.distanceTo(t);return new S(s,c)}getMesh(){const t=new g(this._absoluteMin,this._absoluteMax),e=u.getDimensions(t),{width:a,height:r,depth:n,center:s}=e,c=new D(a,r,n),d=new E(c);return this._meshes.push(d),d.position.copy(s),d}reset(){this._absoluteMin=u.newBound(!0),this._absoluteMax=u.newBound(!1)}add(t){for(const e of t.items)this.addMesh(e.mesh)}addMesh(t,e){if(!t.geometry.index)return;const a=u.getFragmentBounds(t);t.updateMatrixWorld();const r=t.matrixWorld,n=new I,s=t instanceof V,c=new Set;if(e&&t instanceof U)for(const d of e){const o=t.fragment.getInstancesIDs(d);if(o)for(const i of o)c.add(i)}else c.add(0);for(const d of c){const o=a.min.clone(),i=a.max.clone();s&&(t.getMatrixAt(d,n),o.applyMatrix4(n),i.applyMatrix4(n)),o.applyMatrix4(r),i.applyMatrix4(r),o.x<this._absoluteMin.x&&(this._absoluteMin.x=o.x),o.y<this._absoluteMin.y&&(this._absoluteMin.y=o.y),o.z<this._absoluteMin.z&&(this._absoluteMin.z=o.z),o.x>this._absoluteMax.x&&(this._absoluteMax.x=o.x),o.y>this._absoluteMax.y&&(this._absoluteMax.y=o.y),o.z>this._absoluteMax.z&&(this._absoluteMax.z=o.z),i.x>this._absoluteMax.x&&(this._absoluteMax.x=i.x),i.y>this._absoluteMax.y&&(this._absoluteMax.y=i.y),i.z>this._absoluteMax.z&&(this._absoluteMax.z=i.z),i.x<this._absoluteMin.x&&(this._absoluteMin.x=i.x),i.y<this._absoluteMin.y&&(this._absoluteMin.y=i.y),i.z<this._absoluteMin.z&&(this._absoluteMin.z=i.z)}}static getFragmentBounds(t){const e=t.geometry.attributes.position,a=Number.MAX_VALUE,r=-a,n=new p(a,a,a),s=new p(r,r,r);if(!t.geometry.index)throw new Error("Geometry must be indexed!");const c=Array.from(t.geometry.index.array);for(let d=0;d<c.length;d++){if(d%3===0&&c[d]===0&&c[d+1]===0&&c[d+2]===0){d+=2;continue}const o=c[d],i=e.getX(o),M=e.getY(o),y=e.getZ(o);i<n.x&&(n.x=i),M<n.y&&(n.y=M),y<n.z&&(n.z=y),i>s.x&&(s.x=i),M>s.y&&(s.y=M),y>s.z&&(s.z=y)}return new g(n,s)}};h(u,"uuid","d1444724-dba6-4cdd-a0c7-68ee1450d166");let w=u;const Z=document.getElementById("container"),m=new W,$=m.get(v),l=$.create();l.scene=new P(m);l.renderer=new k(m,Z);l.camera=new J(m);m.init();l.camera.controls.setLookAt(12,6,8,0,0,-10);l.scene.setup();const j=m.get(R);j.create(l);const q=new Y(m),H=await fetch("https://thatopen.github.io/engine_components/resources/small.frag"),K=await H.arrayBuffer(),O=new Uint8Array(K),z=q.load(O);l.scene.three.add(z);const _=m.get(w);_.add(z);const Q=_.getMesh();_.reset();F.init();const tt=L.create(()=>T`
    <bim-panel active label="Bounding Boxes Tutorial" 
      style="position: fixed; top: 5px; right: 5px">
      <bim-panel-section style="padding-top: 10px;">
         
        <bim-button 
          label="Fit BIM model" 
          @click="${()=>{l.camera.controls.fitToSphere(Q,!0)}}">  
        </bim-button>  

      </bim-panel-section>
    </bim-panel>
    `);document.body.append(tt);const b=new N;b.showPanel(2);document.body.append(b.dom);b.dom.style.left="0px";b.dom.style.right="auto";l.renderer.onBeforeUpdate.add(()=>b.begin());l.renderer.onAfterUpdate.add(()=>b.end());
