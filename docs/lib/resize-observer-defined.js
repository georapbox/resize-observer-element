/*!
 * @georapbox/resize-observer-element
 * A custom element that offers a declarative interface to the ResizeObserver API.
 *
 * @version 2.0.1
 * @homepage https://github.com/georapbox/resize-observer-element#readme
 * @author George Raptis <georapbox@gmail.com>
 * @license MIT
 */
var d=":host { display: contents; }",o=document.createElement("template");o.innerHTML=`
  <style>${d}</style>
  <slot></slot>
`;var s=class n extends HTMLElement{#e=null;#t=null;#s=[];constructor(){super(),this.shadowRoot||this.attachShadow({mode:"open"}).appendChild(o.content.cloneNode(!0)),this.#e=this.shadowRoot?.querySelector("slot")??null}static get observedAttributes(){return["disabled"]}attributeChangedCallback(e,t,i){e==="disabled"&&t!==i&&(this.disabled?this.#o():this.#i())}connectedCallback(){this.#d("disabled"),"ResizeObserver"in window&&(this.#t=new ResizeObserver(e=>{this.dispatchEvent(new CustomEvent("resize-observer:resize",{bubbles:!0,composed:!0,detail:{entries:e}}))}),this.disabled||this.#i(),this.#e?.addEventListener("slotchange",this.#n))}disconnectedCallback(){this.#o(),this.#e?.removeEventListener("slotchange",this.#n)}get disabled(){return this.hasAttribute("disabled")}set disabled(e){this.toggleAttribute("disabled",!!e)}#i(){!this.#e||!this.#t||(this.#s.forEach(e=>this.#t?.unobserve(e)),this.#s=[],this.#e.assignedElements().forEach(e=>{this.#t?.observe(e),this.#s.push(e)}))}#o(){this.#t?.disconnect()}#n=()=>{this.disabled||this.#i()};#d(e){let t=this;if(Object.prototype.hasOwnProperty.call(t,e)){let i=t[e];delete t[e],t[e]=i}}static defineCustomElement(e="resize-observer"){typeof window<"u"&&!window.customElements.get(e)&&window.customElements.define(e,n)}};s.defineCustomElement();export{s as ResizeObserverElement};
