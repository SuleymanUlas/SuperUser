export const __webpack_id__=1;export const __webpack_ids__=[1];export const __webpack_modules__={5001:(e,s,t)=>{t.r(s),t.d(s,{BrowserWebSocketTransport:()=>n});class n{static create(e){return new Promise(((s,t)=>{const o=new WebSocket(e);o.addEventListener("open",(()=>s(new n(o)))),o.addEventListener("error",t)}))}#e;onmessage;onclose;constructor(e){this.#e=e,this.#e.addEventListener("message",(e=>{this.onmessage&&this.onmessage.call(null,e.data)})),this.#e.addEventListener("close",(()=>{this.onclose&&this.onclose.call(null)})),this.#e.addEventListener("error",(()=>{}))}send(e){this.#e.send(e)}close(){this.#e.close()}}}};