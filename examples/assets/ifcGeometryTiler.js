var Et=Object.defineProperty;var _t=(d,t,e)=>t in d?Et(d,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):d[t]=e;var y=(d,t,e)=>(_t(d,typeof t!="symbol"?t+"":t,e),e);import{V as w,t as Ct,P as Tt,T as Dt,ab as k,a as B,al as bt,X as Pt,ac as At,am as Gt,an as kt,ao as Vt,h as Lt,ap as Nt}from"./web-ifc-api-BFxa4VQ4.js";import{S as Ut}from"./stats.min-GTpOrGrX.js";import{k as qt,C as Bt,b as Ht}from"./index-CA2cPfXk.js";import{a as jt,E as H,C as Ot}from"./index-2WRq2SpB.js";import{W as Rt,S as Wt,a as $t,b as Xt}from"./index-BSY2u5SV.js";import{G as Jt}from"./index-5vXSe8tN.js";import{I as Kt}from"./streaming-settings-BBmEUEWT.js";import{S as Qt,I as Yt,C as Zt}from"./ifc-metadata-reader-ySVcvkNZ.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./ifc-fragment-settings-DrbKNZeA.js";const tt=0,te=1,ee=new w,vt=new Ct,rt=new Tt,Ft=new w,Z=new Dt;class se{constructor(){this.tolerance=-1,this.faces=[],this.newFaces=[],this.assigned=new St,this.unassigned=new St,this.vertices=[]}setFromPoints(t){if(t.length>=4){this.makeEmpty();for(let e=0,s=t.length;e<s;e++)this.vertices.push(new ne(t[e]));this.compute()}return this}setFromObject(t){const e=[];return t.updateMatrixWorld(!0),t.traverse(function(s){const i=s.geometry;if(i!==void 0){const n=i.attributes.position;if(n!==void 0)for(let a=0,o=n.count;a<o;a++){const c=new w;c.fromBufferAttribute(n,a).applyMatrix4(s.matrixWorld),e.push(c)}}}),this.setFromPoints(e)}containsPoint(t){const e=this.faces;for(let s=0,i=e.length;s<i;s++)if(e[s].distanceToPoint(t)>this.tolerance)return!1;return!0}intersectRay(t,e){const s=this.faces;let i=-1/0,n=1/0;for(let a=0,o=s.length;a<o;a++){const c=s[a],r=c.distanceToPoint(t.origin),u=c.normal.dot(t.direction);if(r>0&&u>=0)return null;const f=u!==0?-r/u:0;if(!(f<=0)&&(u>0?n=Math.min(f,n):i=Math.max(f,i),i>n))return null}return i!==-1/0?t.at(i,e):t.at(n,e),e}intersectsRay(t){return this.intersectRay(t,ee)!==null}makeEmpty(){return this.faces=[],this.vertices=[],this}addVertexToFace(t,e){return t.face=e,e.outside===null?this.assigned.append(t):this.assigned.insertBefore(e.outside,t),e.outside=t,this}removeVertexFromFace(t,e){return t===e.outside&&(t.next!==null&&t.next.face===e?e.outside=t.next:e.outside=null),this.assigned.remove(t),this}removeAllVerticesFromFace(t){if(t.outside!==null){const e=t.outside;let s=t.outside;for(;s.next!==null&&s.next.face===t;)s=s.next;return this.assigned.removeSubList(e,s),e.prev=s.next=null,t.outside=null,e}}deleteFaceVertices(t,e){const s=this.removeAllVerticesFromFace(t);if(s!==void 0)if(e===void 0)this.unassigned.appendChain(s);else{let i=s;do{const n=i.next;e.distanceToPoint(i.point)>this.tolerance?this.addVertexToFace(i,e):this.unassigned.append(i),i=n}while(i!==null)}return this}resolveUnassignedPoints(t){if(this.unassigned.isEmpty()===!1){let e=this.unassigned.first();do{const s=e.next;let i=this.tolerance,n=null;for(let a=0;a<t.length;a++){const o=t[a];if(o.mark===tt){const c=o.distanceToPoint(e.point);if(c>i&&(i=c,n=o),i>1e3*this.tolerance)break}}n!==null&&this.addVertexToFace(e,n),e=s}while(e!==null)}return this}computeExtremes(){const t=new w,e=new w,s=[],i=[];for(let n=0;n<3;n++)s[n]=i[n]=this.vertices[0];t.copy(this.vertices[0].point),e.copy(this.vertices[0].point);for(let n=0,a=this.vertices.length;n<a;n++){const o=this.vertices[n],c=o.point;for(let r=0;r<3;r++)c.getComponent(r)<t.getComponent(r)&&(t.setComponent(r,c.getComponent(r)),s[r]=o);for(let r=0;r<3;r++)c.getComponent(r)>e.getComponent(r)&&(e.setComponent(r,c.getComponent(r)),i[r]=o)}return this.tolerance=3*Number.EPSILON*(Math.max(Math.abs(t.x),Math.abs(e.x))+Math.max(Math.abs(t.y),Math.abs(e.y))+Math.max(Math.abs(t.z),Math.abs(e.z))),{min:s,max:i}}computeInitialHull(){const t=this.vertices,e=this.computeExtremes(),s=e.min,i=e.max;let n=0,a=0;for(let h=0;h<3;h++){const l=i[h].point.getComponent(h)-s[h].point.getComponent(h);l>n&&(n=l,a=h)}const o=s[a],c=i[a];let r,u;n=0,vt.set(o.point,c.point);for(let h=0,l=this.vertices.length;h<l;h++){const m=t[h];if(m!==o&&m!==c){vt.closestPointToPoint(m.point,!0,Ft);const p=Ft.distanceToSquared(m.point);p>n&&(n=p,r=m)}}n=-1,rt.setFromCoplanarPoints(o.point,c.point,r.point);for(let h=0,l=this.vertices.length;h<l;h++){const m=t[h];if(m!==o&&m!==c&&m!==r){const p=Math.abs(rt.distanceToPoint(m.point));p>n&&(n=p,u=m)}}const f=[];if(rt.distanceToPoint(u.point)<0){f.push(E.create(o,c,r),E.create(u,c,o),E.create(u,r,c),E.create(u,o,r));for(let h=0;h<3;h++){const l=(h+1)%3;f[h+1].getEdge(2).setTwin(f[0].getEdge(l)),f[h+1].getEdge(1).setTwin(f[l+1].getEdge(0))}}else{f.push(E.create(o,r,c),E.create(u,o,c),E.create(u,c,r),E.create(u,r,o));for(let h=0;h<3;h++){const l=(h+1)%3;f[h+1].getEdge(2).setTwin(f[0].getEdge((3-h)%3)),f[h+1].getEdge(0).setTwin(f[l+1].getEdge(1))}}for(let h=0;h<4;h++)this.faces.push(f[h]);for(let h=0,l=t.length;h<l;h++){const m=t[h];if(m!==o&&m!==c&&m!==r&&m!==u){n=this.tolerance;let p=null;for(let F=0;F<4;F++){const z=this.faces[F].distanceToPoint(m.point);z>n&&(n=z,p=this.faces[F])}p!==null&&this.addVertexToFace(m,p)}}return this}reindexFaces(){const t=[];for(let e=0;e<this.faces.length;e++){const s=this.faces[e];s.mark===tt&&t.push(s)}return this.faces=t,this}nextVertexToAdd(){if(this.assigned.isEmpty()===!1){let t,e=0;const s=this.assigned.first().face;let i=s.outside;do{const n=s.distanceToPoint(i.point);n>e&&(e=n,t=i),i=i.next}while(i!==null&&i.face===s);return t}}computeHorizon(t,e,s,i){this.deleteFaceVertices(s),s.mark=te;let n;e===null?n=e=s.getEdge(0):n=e.next;do{const a=n.twin,o=a.face;o.mark===tt&&(o.distanceToPoint(t)>this.tolerance?this.computeHorizon(t,a,o,i):i.push(n)),n=n.next}while(n!==e);return this}addAdjoiningFace(t,e){const s=E.create(t,e.tail(),e.head());return this.faces.push(s),s.getEdge(-1).setTwin(e.twin),s.getEdge(0)}addNewFaces(t,e){this.newFaces=[];let s=null,i=null;for(let n=0;n<e.length;n++){const a=e[n],o=this.addAdjoiningFace(t,a);s===null?s=o:o.next.setTwin(i),this.newFaces.push(o.face),i=o}return s.next.setTwin(i),this}addVertexToHull(t){const e=[];return this.unassigned.clear(),this.removeVertexFromFace(t,t.face),this.computeHorizon(t.point,null,t.face,e),this.addNewFaces(t,e),this.resolveUnassignedPoints(this.newFaces),this}cleanup(){return this.assigned.clear(),this.unassigned.clear(),this.newFaces=[],this}compute(){let t;for(this.computeInitialHull();(t=this.nextVertexToAdd())!==void 0;)this.addVertexToHull(t);return this.reindexFaces(),this.cleanup(),this}}class E{constructor(){this.normal=new w,this.midpoint=new w,this.area=0,this.constant=0,this.outside=null,this.mark=tt,this.edge=null}static create(t,e,s){const i=new E,n=new ct(t,i),a=new ct(e,i),o=new ct(s,i);return n.next=o.prev=a,a.next=n.prev=o,o.next=a.prev=n,i.edge=n,i.compute()}getEdge(t){let e=this.edge;for(;t>0;)e=e.next,t--;for(;t<0;)e=e.prev,t++;return e}compute(){const t=this.edge.tail(),e=this.edge.head(),s=this.edge.next.head();return Z.set(t.point,e.point,s.point),Z.getNormal(this.normal),Z.getMidpoint(this.midpoint),this.area=Z.getArea(),this.constant=this.normal.dot(this.midpoint),this}distanceToPoint(t){return this.normal.dot(t)-this.constant}}class ct{constructor(t,e){this.vertex=t,this.prev=null,this.next=null,this.twin=null,this.face=e}head(){return this.vertex}tail(){return this.prev?this.prev.vertex:null}length(){const t=this.head(),e=this.tail();return e!==null?e.point.distanceTo(t.point):-1}lengthSquared(){const t=this.head(),e=this.tail();return e!==null?e.point.distanceToSquared(t.point):-1}setTwin(t){return this.twin=t,t.twin=this,this}}class ne{constructor(t){this.point=t,this.prev=null,this.next=null,this.face=null}}class St{constructor(){this.head=null,this.tail=null}first(){return this.head}last(){return this.tail}clear(){return this.head=this.tail=null,this}insertBefore(t,e){return e.prev=t.prev,e.next=t,e.prev===null?this.head=e:e.prev.next=e,t.prev=e,this}insertAfter(t,e){return e.prev=t,e.next=t.next,e.next===null?this.tail=e:e.next.prev=e,t.next=e,this}append(t){return this.head===null?this.head=t:this.tail.next=t,t.prev=this.tail,t.next=null,this.tail=t,this}appendChain(t){for(this.head===null?this.head=t:this.tail.next=t,t.prev=this.tail;t.next!==null;)t=t.next;return this.tail=t,this}remove(t){return t.prev===null?this.head=t.next:t.prev.next=t.next,t.next===null?this.tail=t.prev:t.next.prev=t.prev,this}removeSubList(t,e){return t.prev===null?this.head=e.next:t.prev.next=e.next,e.next===null?this.tail=t.prev:e.next.prev=t.prev,this}isEmpty(){return this.head===null}}const lt=[2,2,1],ht=[1,0,0];function _(d,t){return d*3+t}function ie(d){const t=d.elements;let e=0;for(let s=0;s<9;s++)e+=t[s]*t[s];return Math.sqrt(e)}function oe(d){const t=d.elements;let e=0;for(let s=0;s<3;s++){const i=t[_(lt[s],ht[s])];e+=2*i*i}return Math.sqrt(e)}function ae(d,t){let e=0,s=1;const i=d.elements;for(let r=0;r<3;r++){const u=Math.abs(i[_(lt[r],ht[r])]);u>e&&(e=u,s=r)}let n=1,a=0;const o=ht[s],c=lt[s];if(Math.abs(i[_(c,o)])>Number.EPSILON){const r=i[_(c,c)],u=i[_(o,o)],f=i[_(c,o)],h=(r-u)/2/f;let l;h<0?l=-1/(-h+Math.sqrt(1+h*h)):l=1/(h+Math.sqrt(1+h*h)),n=1/Math.sqrt(1+l*l),a=l*n}return t.identity(),t.elements[_(o,o)]=n,t.elements[_(c,c)]=n,t.elements[_(c,o)]=a,t.elements[_(o,c)]=-a,t}function re(d,t){let e=0,s=0;const i=10;t.unitary.identity(),t.diagonal.copy(d);const n=t.unitary,a=t.diagonal,o=new k,c=new k,r=Number.EPSILON*ie(a);for(;s<i&&oe(a)>r;)ae(a,o),c.copy(o).transpose(),a.multiply(o),a.premultiply(c),n.multiply(o),++e>2&&(s++,e=0);return t}function ce(d){const t=[];for(let b=0;b<d.length-2;b+=3){const T=d[b],x=d[b+1],G=d[b+2];t.push(new w(T,x,G))}const e=new se;e.setFromPoints(t);const s={unitary:new k,diagonal:new k},i=e.faces,n=[],a=[];for(let b=0,T=i.length;b<T;b++){const x=i[b];let G=x.edge;n.length=0;do n.push(G),G=G.next;while(G!==x.edge);const zt=n.length-2;for(let Y=1,Mt=zt;Y<=Mt;Y++){const it=n[0].vertex,ot=n[Y+0].vertex,at=n[Y+1].vertex;a.push(it.point.x,it.point.y,it.point.z),a.push(ot.point.x,ot.point.y,ot.point.z),a.push(at.point.x,at.point.y,at.point.z)}}const o=new w,c=new w,r=new w,u=new w,f=new w,h=new w,l=new w,m=new w;let p=0,F=0,z=0,g=0,I=0,S=0,M=0;for(let b=0,T=a.length;b<T;b+=9){o.fromArray(a,b),c.fromArray(a,b+3),r.fromArray(a,b+6),l.set(0,0,0),l.add(o).add(c).add(r).divideScalar(3),u.subVectors(c,o),f.subVectors(r,o);const x=h.crossVectors(u,f).length()/2;m.add(h.copy(l).multiplyScalar(x)),p+=x,F+=(9*l.x*l.x+o.x*o.x+c.x*c.x+r.x*r.x)*(x/12),z+=(9*l.x*l.y+o.x*o.y+c.x*c.y+r.x*r.y)*(x/12),g+=(9*l.x*l.z+o.x*o.z+c.x*c.z+r.x*r.z)*(x/12),I+=(9*l.y*l.y+o.y*o.y+c.y*c.y+r.y*r.y)*(x/12),S+=(9*l.y*l.z+o.y*o.z+c.y*c.z+r.y*r.z)*(x/12),M+=(9*l.z*l.z+o.z*o.z+c.z*c.z+r.z*r.z)*(x/12)}m.divideScalar(p),F/=p,z/=p,g/=p,I/=p,S/=p,M/=p,F-=m.x*m.x,z-=m.x*m.y,g-=m.x*m.z,I-=m.y*m.y,S-=m.y*m.z,M-=m.z*m.z;const v=new k;v.elements[0]=F,v.elements[1]=z,v.elements[2]=g,v.elements[3]=z,v.elements[4]=I,v.elements[5]=S,v.elements[6]=g,v.elements[7]=S,v.elements[8]=M,re(v,s);const R=s.unitary,V=new w,L=new w,N=new w;R.extractBasis(V,L,N);let W=-1/0,$=-1/0,X=-1/0,J=1/0,K=1/0,Q=1/0;for(let b=0,T=t.length;b<T;b++){const x=t[b];W=Math.max(V.dot(x),W),$=Math.max(L.dot(x),$),X=Math.max(N.dot(x),X),J=Math.min(V.dot(x),J),K=Math.min(L.dot(x),K),Q=Math.min(N.dot(x),Q)}V.multiplyScalar(.5*(J+W)),L.multiplyScalar(.5*(K+$)),N.multiplyScalar(.5*(Q+X));const U=new w,A=new w,nt=new k;U.add(V).add(L).add(N),A.x=W-J,A.y=$-K,A.z=X-Q,A.multiplyScalar(.5),nt.copy(R);const{x:ft,y:pt,z:gt}=A,wt=new B;wt.makeScale(ft*2,pt*2,gt*2);const xt=new B;xt.makeTranslation(-ft,-pt,-gt);const yt=new B;yt.makeTranslation(U.x,U.y,U.z);const It=new B;It.setFromMatrix3(nt);const q=new B;return q.multiply(yt),q.multiply(It),q.multiply(xt),q.multiply(wt),{center:U,halfSizes:A,rotation:nt,transformation:q}}function le(d,t,e){const s=[d[0]-t[0],d[1]-t[1],d[2]-t[2]];return e[0]*s[0]+e[1]*s[1]+e[2]*s[2]>0}const st=class st extends jt{constructor(e){super(e);y(this,"onGeometryStreamed",new H);y(this,"onAssetStreamed",new H);y(this,"onProgress",new H);y(this,"onIfcLoaded",new H);y(this,"onDisposed",new H);y(this,"settings",new Kt);y(this,"enabled",!0);y(this,"webIfc",new bt);y(this,"_spatialTree",new Qt);y(this,"_metaData",new Yt);y(this,"_visitedGeometries",new Map);y(this,"_streamSerializer",new Pt);y(this,"_geometries",new Map);y(this,"_geometryCount",0);y(this,"_civil",new Zt);y(this,"_groupSerializer",new At);y(this,"_assets",[]);y(this,"_meshesWithHoles",new Set);this.components.add(st.uuid,this),this.settings.excludedCategories.add(Gt)}dispose(){this.onIfcLoaded.reset(),this.onGeometryStreamed.reset(),this.onAssetStreamed.reset(),this.webIfc=null,this.onDisposed.trigger(),this.onDisposed.reset()}async streamFromBuffer(e){const s=performance.now();await this.readIfcFile(e),await this.streamAllGeometries(),this.cleanUp(),console.log(`Streaming the IFC took ${performance.now()-s} ms!`)}async streamFromCallBack(e){const s=performance.now();await this.streamIfcFile(e),await this.streamAllGeometries(),this.cleanUp(),console.log(`Streaming the IFC took ${performance.now()-s} ms!`)}async readIfcFile(e){const{path:s,absolute:i,logLevel:n}=this.settings.wasm;this.webIfc.SetWasmPath(s,i),await this.webIfc.Init(),n&&this.webIfc.SetLogLevel(n),this.webIfc.OpenModel(e,this.settings.webIfc)}async streamIfcFile(e){const{path:s,absolute:i,logLevel:n}=this.settings.wasm;this.webIfc.SetWasmPath(s,i),await this.webIfc.Init(),n&&this.webIfc.SetLogLevel(n),this.webIfc.OpenModelFromCallback(e,this.settings.webIfc)}async streamAllGeometries(){const{minGeometrySize:e,minAssetsSize:s}=this.settings;this._spatialTree.setUp(this.webIfc);const i=this.webIfc.GetIfcEntityList(0),n=[[]],a=new kt,{FILE_NAME:o,FILE_DESCRIPTION:c}=Nt;a.ifcMetadata={name:this._metaData.get(this.webIfc,o),description:this._metaData.get(this.webIfc,c),schema:this.webIfc.GetModelSchema(0)||"IFC2X3",maxExpressID:this.webIfc.GetMaxExpressID(0)};let r=0,u=0;for(const g of i){if(!this.webIfc.IsIfcElement(g)&&g!==Vt||this.settings.excludedCategories.has(g))continue;const I=this.webIfc.GetLineIDsWithType(0,g),S=I.size();console.log(S);for(let M=0;M<S;M++){r>e&&(r=0,u++,n.push([]));const v=I.get(M);n[u].push(v);const R=this._spatialTree.itemsByFloor[v]||0;a.data.set(v,[[],[R,g]]),r++}}this._spatialTree.cleanUp();let f=.01,h=0;for(const g of n){h++,this.webIfc.StreamMeshes(0,g,S=>{this.getMesh(this.webIfc,S,a)}),this._geometryCount>e&&await this.streamGeometries(),this._assets.length>s&&await this.streamAssets();const I=h/n.length;I>f&&(f+=.01,f=Math.max(f,I),this.onProgress.trigger(Math.round(f*100)/100))}this._geometryCount&&await this.streamGeometries(),this._assets.length&&await this.streamAssets();const{opaque:l,transparent:m}=a.geometryIDs;for(const[g,{index:I,uuid:S}]of this._visitedGeometries)a.keyFragments.set(I,S),(g>1?l:m).set(g,I);const p=a.data.keys();for(const g of p){const[I]=a.data.get(g);I.length||a.data.delete(g)}const F=this.webIfc.GetCoordinationMatrix(0);a.coordinationMatrix.fromArray(F),a.civilData=this._civil.read(this.webIfc);const z=this._groupSerializer.export(a);this.onIfcLoaded.trigger(z),a.dispose(!0)}cleanUp(){this.webIfc=null,this.webIfc=new bt,this._visitedGeometries.clear(),this._geometries.clear(),this._assets=[],this._meshesWithHoles.clear()}getMesh(e,s,i){const n=s.geometries.size(),a=s.expressID,o={id:a,geometries:[]};for(let c=0;c<n;c++){const r=s.geometries.get(c),u=r.geometryExpressID,f=r.color.w===1?1:-1,h=u*f;if(!this._visitedGeometries.has(h)){this._visitedGeometries.has(u)||this.getGeometry(e,u);const M=this._visitedGeometries.size,v=Lt.generateUUID();this._visitedGeometries.set(h,{uuid:v,index:M})}const l=this._visitedGeometries.get(h);if(l===void 0)throw new Error("Error getting geometry data for streaming!");const m=i.data.get(a);if(!m)throw new Error("Data not found!");m[0].push(l.index);const{x:p,y:F,z,w:g}=r.color,I=[p,F,z,g],S=r.flatTransformation;o.geometries.push({color:I,geometryID:u,transformation:S})}this._assets.push(o)}getGeometry(e,s){const i=e.GetGeometry(0,s),n=e.GetIndexArray(i.GetIndexData(),i.GetIndexDataSize()),a=e.GetVertexArray(i.GetVertexData(),i.GetVertexDataSize()),o=new Float32Array(a.length/2),c=new Float32Array(a.length/2);for(let l=0;l<a.length;l+=6)o[l/2]=a[l],o[l/2+1]=a[l+1],o[l/2+2]=a[l+2],c[l/2]=a[l+3],c[l/2+1]=a[l+4],c[l/2+2]=a[l+5];const r=ce(o),u=new Float32Array(r.transformation.elements),f=[r.center.x,r.center.y,r.center.z];let h=!1;for(let l=0;l<o.length-2;l+=3){const m=o[l],p=o[l+1],F=o[l+2],z=c[l],g=c[l+1],I=c[l+2];if(le(f,[m,p,F],[z,g,I])){h=!0;break}}this._geometries.set(s,{position:o,normal:c,index:n,boundingBox:u,hasHoles:h}),i.delete(),this._geometryCount++}async streamAssets(){await this.onAssetStreamed.trigger(this._assets),this._assets=null,this._assets=[]}async streamGeometries(){let e=this._streamSerializer.export(this._geometries),s={};for(const[i,{boundingBox:n,hasHoles:a}]of this._geometries)s[i]={boundingBox:n,hasHoles:a};this.onGeometryStreamed.trigger({data:s,buffer:e}),s=null,e=null,this._geometries.clear(),this._geometryCount=0}};y(st,"uuid","d9999a00-e1f5-4d3f-8cfe-c56e08609764");let dt=st;const he=document.getElementById("container"),D=new Ot,de=D.get(Rt),P=de.create();P.scene=new Wt(D);P.renderer=new $t(D,he);P.camera=new Xt(D);D.init();P.camera.controls.setLookAt(12,6,8,0,0,-10);const me=D.get(Jt);me.create(P);const ue={path:"https://unpkg.com/web-ifc@0.0.53/",absolute:!0},C=new dt(D);C.settings.wasm=ue;C.settings.minGeometrySize=20;C.settings.minAssetsSize=1e3;let j=[],mt={},ut=1;C.onGeometryStreamed.add(d=>{const{buffer:t,data:e}=d,s=`small.ifc-processed-geometries-${ut}`;for(const i in e){const n=e[i];n.geometryFile=s,mt[i]=n}j.push({name:s,bits:[t]}),ut++});let et=[];C.onAssetStreamed.add(d=>{et=[...et,...d]});C.onIfcLoaded.add(d=>{j.push({name:"small.ifc-processed-global",bits:[d]})});function fe(d,...t){const e=new File(t,d),s=document.createElement("a"),i=URL.createObjectURL(e);s.href=i,s.download=e.name,s.click(),URL.revokeObjectURL(i)}async function pe(d){for(const{name:t,bits:e}of d)fe(t,...e),await new Promise(s=>{setTimeout(s,100)})}C.onProgress.add(d=>{d===1&&setTimeout(async()=>{const t={geometries:mt,assets:et,globalDataFileId:"small.ifc-processed-global"};j.push({name:"small.ifc-processed.json",bits:[JSON.stringify(t)]}),await pe(j),et=[],mt={},j=[],ut=1})});async function ge(){const t=await(await fetch("../../../../../resources/small.ifc")).arrayBuffer(),e=new Uint8Array(t);await C.streamFromBuffer(e)}qt.registerComponents();const we=Bt.create(()=>Ht`
    <bim-panel active label="IFC Geometry Tiler Tutorial" 
      style="position: fixed; top: 5px; right: 5px">
      
      <bim-panel-section style="padding-top: 12px;">
      
        <bim-button label="Load IFC"
          @click="${()=>{ge()}}">
        </bim-button>  
      
      </bim-panel-section>
      
    </bim-panel>
  `);document.body.append(we);const O=new Ut;O.showPanel(2);document.body.append(O.dom);O.dom.style.left="0px";P.renderer.onBeforeUpdate.add(()=>O.begin());P.renderer.onAfterUpdate.add(()=>O.end());
