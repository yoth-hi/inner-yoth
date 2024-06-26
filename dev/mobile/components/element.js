import {
    LitElement,
    html,
    css
} from "lit";
 // "https://cdn.jsdelivr.net/npm/lit-element/+esm?modules";
import"../styles.css";
import { pushState } from "./navegete.js"

export function register(a, b) {
    class G extends a {
        get is() {
            return b;
        }
        $$(selector) {
            return this.querySelector(selector);
        }
        $$$(selector) {
            return this.querySelectorAll(selector);
        }
        _onClickLink(link,title="",C = {}){
          return(a)=>{a?.preventDefault();pushState(link,title)}
        }
    }
    customElements.define(b, G);
}
const GR = function(a){
  a.observers_ = {}
  return a.constructor.observers
}
class Element extends LitElement {
    constructor() {
        super();
        const observers = GR(this)
        if (observers) {
            for (let i = 0; i < observers.length; i++) {
                const t = observers[i];
                const [h, g, l] = t.match(/([\w\$]+)\(([\,\w]+)\)/);
                const li = l.split(",");
                li.forEach(a => {
                    this.observers_[a] = n => {
                        const j = li.map(a => this[a]);
                        const m = this[g].apply(this, j)
                    };
                    this[a] && this.observers_[a](this[a]);
                });
            }
        }

        // HGv(, this.observers_, this)
    }
    updated(changedProperties) {
        // if (changedProperties.has(icon)) {
        //   const newIcon = changedProperties.get(icon);
        //   const oldIcon = changedProperties.get(icon);
        // }
        changedProperties.forEach((value, key) => {
            const t = this.observers_;
            this.observers_[key]?.(value);
        });
    }
    createRenderRoot() {
        return this;
    }
    listen(element, event, fnNameOrFn){
      const fn = typeof fnNameOrFn == "string" ? this[fnNameOrFn] : fnNameOrFn
      element.addEventListener(event, (event)=>{
        fn.apply(this, [event])
      })
    }
}
export { Element, css, html };

export const renderSlot = function (component, slotName, idTarget = slotName) {
    // Find the slotted element within the shadow DOM or regular DOM
    const a = component.querySelector(`[slot="${slotName}"]`);

    // Ensure b is a child of the parent of a (component)
    const b = component.querySelector(`#${idTarget}`); //<
    if (a && b) {
        // const n = document.createElement("div")
        // Replace b with a if b is a direct child of component
        b.appendChild(a, b);
        //n.appendChild(a)
    } else {
        // Handle cases where a or b is not found, or b is not a child of component
        console.error("Failed to replace child:", a, b);
    }
    return b;
};

export const Resize = class {
    isAttached = true;
    constructor(scope, callback) {
        callback = callback.bind(scope);
        this._resizeObserver = new ResizeObserver(argument => {
            this.isAttached && callback(argument);
        });
        this.observe(scope);
    }
    observe(obj) {
        this._resizeObserver.observe(obj);
    }
    detached() {
        this._resizeObserver.disconnect();
        this.isAttached = false;
    }
    
};
