import {
  ElementMixin
} from 
 //"https://unpkg.com/@polymer/polymer@3.5.1/lib/mixins/element-mixin.js?module"
  "@polymer/polymer/lib/mixins/element-mixin.js"

var Upb = ["disabled", "disable-upgrade"]
export function Register (call, is, html) {
  call.prototype.is = is;
  var t;
  call = call
  const m =
  call.properties ||
  call.prototype.properties || {}
  class GG extends ElementMixin(call) {
    get _template() {
      return t ??= html()
    }
    set _template(a) {
      return t = a
    }
    _attachDom(a) {
      return ((a = a && this.hostElement.appendChild(a)),QSP(this.hostElement),a)
    }
    connectedCallback() {
      super.connectedCallback()
      call.prototype.attached?.apply(this)
    }
    disconnectedCallback() {
      super.disconnectedCallback()
      call.prototype.detached?.apply(this)
    }
    ready() {
      super.ready()
      call.prototype.ready?.apply(this)
    }
    static get properties() {
      return m
    }
    $$(a){return this.hostElement.querySelector(a)}
    handleLink(a){
      const url = a.currentTarget.href||void 0
      a.preventDefault();
      this.hundlePagePush(url)
    }
    hundlePagePush(url){
      
    }
    listen(a,b,c){
      a.addEventListener(b,(e)=>{
        let a = isCustomEvent(e)
        if(a){
          a = e.detail
        }
        if(typeof c === "string"){
          this[c](e,a)
        } else {
          c(e,a,this)
        }
      })
    }
  }
  var observedAttributes = [...Upb,
    ...Object.keys(m)]
    GG = jGR(GG)
  SUPER( {
    create(hostElement) {
      var t = new GG;
      KG(t, hostElement, observedAttributes)
      t.hostElement = hostElement;
      return t
    },
    observedAttributes
  }, is)
}
function isCustomEvent(obj) {
    return obj instanceof CustomEvent;
}
function KG(a, b, c) {
  
  const HH = {}
  c.forEach(k => {
    //debugger
    b[k]&&(a[k] = b[k])
    HH[k] = {
      configurable: false, enumerable: false,
      get: function() {
        return a[k]
      },
      set: function(m) {
        a[k] = m
      }
    }
  })
  Object.defineProperties(b, HH);




}
function SUPER( {
  create, observedAttributes
}, is) {
  class Element_ extends HTMLElement {
    constructor() {
      super();
      this.inst = create(this)
    }
    connectedCallback() {
      this.inst.connectedCallback()
      this.inst.isConnected = true
    }
    disconnectedCallback() {
      this.inst.disconnectedCallback()
      this.inst.isConnected = false
    }
    static get observedAttributes() {
      return observedAttributes
    }
    attributeChangedCallback(z,A,D){this.inst.attributeChangedCallback(z,A,D)};
    forwardDynamicProps() {
      arguments
      debugger
    }
    get is() {
      return is
    }
  }
  customElements.define(is, Element_);
}

export const html = function(html_) {
  var _template;
  return function() {
    if (_template)return;
    _template = document.createElement("template")
    _template.innerHTML = html_
    return _template
  }
}
function QSP(doc = document) {
  const a = doc.querySelectorAll("slot");
  if (a.length) {
    a.forEach((m)=> {
      const t = doc.querySelector(`[slot="${m.name}"]`)
      if (t) {
        m.parentElement.insertBefore(t, m)
        m.remove()
      }
    })
  }
}

setInterval(QSP, 16)

function jGR(a){
  return class extends a{
  _propertyToAttribute(property, attribute, value) {
      this.__serializing = true;
      value = arguments.length < 3 ? this[property] : value;
      this._valueToNodeAttribute(this.hostElement??this, value,
      attribute || this.constructor.attributeNameForProperty(property));
      this.__serializing = false;
    }}
}