import{a as Y,b as J}from"./chunk-NHA7HQU4.js";import"./chunk-C6EVMWWI.js";import"./chunk-VGCEYYDW.js";import{L as Z,Z as q,_ as G}from"./chunk-SXOTAUVO.js";import{b as $,c as V,d as H,e as U,f as W,i as X,l as y}from"./chunk-XHZKNT62.js";import"./chunk-AESYL7IM.js";import{Gb as h,Hb as u,Ib as g,Pc as k,R as C,Ra as N,Yc as B,cc as T,cd as z,da as I,fb as j,ga as a,gb as x,ha as c,ib as A,kb as F,la as w,m as b,ma as M,mb as R,oc as E,pc as O,ra as m,sa as p,ub as P,va as S,vb as D,xb as L}from"./chunk-W6ACBSJJ.js";var K=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=m({type:e,selectors:[["app-not-found"]],decls:2,vars:0,template:function(i,n){i&1&&(h(0,"p"),T(1,"not-found works!"),u())}});let o=e;return o})();var ne=[{path:"dashboard",component:Y,loadChildren:()=>import("./chunk-OBC465NJ.js").then(o=>o.DashboardModule)},{path:"**",redirectTo:"dashboard/home"},{path:"404",component:K}],Q=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=p({type:e}),e.\u0275inj=c({imports:[y.forRoot(ne),y]});let o=e;return o})();var f=(()=>{let e=class e{showLoading(){this.isLoadingSubject.next(!0)}hideLoading(){this.isLoadingSubject.next(!1)}constructor(){this.isLoadingSubject=new b(!1),this.isLoading$=this.isLoadingSubject.asObservable()}};e.\u0275fac=function(i){return new(i||e)},e.\u0275prov=a({token:e,factory:e.\u0275fac,providedIn:"root"});let o=e;return o})();function se(o,e){o&1&&(h(0,"div",1),g(1,"mat-spinner"),u())}var ee=(()=>{let e=class e{constructor(t){this.loadingService=t,this.title="ecommerce",this.onIsLoading$=this.loadingService.isLoading$}};e.\u0275fac=function(i){return new(i||e)(j(f))},e.\u0275cmp=m({type:e,selectors:[["app-root"]],decls:3,vars:3,consts:[["class","loading",4,"ngIf"],[1,"loading"]],template:function(i,n){i&1&&(P(0,se,2,0,"div",0),E(1,"async"),g(2,"router-outlet")),i&2&&L("ngIf",O(1,1,n.onIsLoading$))},dependencies:[B,X,q,z],styles:[".loading[_ngcontent-%COMP%]{z-index:1001;background-color:#00000080;width:100%;height:100vh;position:fixed;display:flex;justify-content:center;align-items:center}"]});let o=e;return o})();var ae="@",de=(()=>{let e=class e{constructor(t,i,n,s,l){this.doc=t,this.delegate=i,this.zone=n,this.animationType=s,this.moduleImpl=l,this._rendererFactoryPromise=null,this.scheduler=M(A,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){return(this.moduleImpl??import("./chunk-XAUOLQYH.js")).catch(i=>{throw new I(5300,!1)}).then(({\u0275createEngine:i,\u0275AnimationRendererFactory:n})=>{this._engine=i(this.animationType,this.doc,this.scheduler);let s=new n(this.delegate,this._engine,this.zone);return this.delegate=s,s})}createRenderer(t,i){let n=this.delegate.createRenderer(t,i);if(n.\u0275type===0)return n;typeof n.throwOnSyntheticProps=="boolean"&&(n.throwOnSyntheticProps=!1);let s=new v(n);return i?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(l=>{let re=l.createRenderer(t,i);s.use(re)}).catch(l=>{s.use(n)}),s}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}};e.\u0275fac=function(i){x()},e.\u0275prov=a({token:e,factory:e.\u0275fac});let o=e;return o})(),v=class{constructor(e){this.delegate=e,this.replay=[],this.\u0275type=1}use(e){if(this.delegate=e,this.replay!==null){for(let r of this.replay)r(e);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(e,r){return this.delegate.createElement(e,r)}createComment(e){return this.delegate.createComment(e)}createText(e){return this.delegate.createText(e)}get destroyNode(){return this.delegate.destroyNode}appendChild(e,r){this.delegate.appendChild(e,r)}insertBefore(e,r,t,i){this.delegate.insertBefore(e,r,t,i)}removeChild(e,r,t){this.delegate.removeChild(e,r,t)}selectRootElement(e,r){return this.delegate.selectRootElement(e,r)}parentNode(e){return this.delegate.parentNode(e)}nextSibling(e){return this.delegate.nextSibling(e)}setAttribute(e,r,t,i){this.delegate.setAttribute(e,r,t,i)}removeAttribute(e,r,t){this.delegate.removeAttribute(e,r,t)}addClass(e,r){this.delegate.addClass(e,r)}removeClass(e,r){this.delegate.removeClass(e,r)}setStyle(e,r,t,i){this.delegate.setStyle(e,r,t,i)}removeStyle(e,r,t){this.delegate.removeStyle(e,r,t)}setProperty(e,r,t){this.shouldReplay(r)&&this.replay.push(i=>i.setProperty(e,r,t)),this.delegate.setProperty(e,r,t)}setValue(e,r){this.delegate.setValue(e,r)}listen(e,r,t){return this.shouldReplay(r)&&this.replay.push(i=>i.listen(e,r,t)),this.delegate.listen(e,r,t)}shouldReplay(e){return this.replay!==null&&e.startsWith(ae)}};function te(o="animations"){return R("NgAsyncAnimations"),S([{provide:F,useFactory:(e,r,t)=>new de(e,r,t,o),deps:[k,H,D]},{provide:N,useValue:o==="noop"?"NoopAnimations":"BrowserAnimations"}])}var ie=(()=>{let e=class e{constructor(t){this.loadingService=t}intercept(t,i){return this.loadingService.showLoading(),i.handle(t).pipe(C(()=>this.loadingService.hideLoading()))}};e.\u0275fac=function(i){return new(i||e)(w(f))},e.\u0275prov=a({token:e,factory:e.\u0275fac});let o=e;return o})();var oe=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=p({type:e,bootstrap:[ee]}),e.\u0275inj=c({providers:[te(),{provide:$,useClass:ie,multi:!0}],imports:[W,Q,J,G,V,Z]});let o=e;return o})();U().bootstrapModule(oe).catch(o=>console.error(o));
