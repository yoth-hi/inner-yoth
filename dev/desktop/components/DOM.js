import { history } from "./pushState.js";
import { ElementMixin } from "./_dev.js"; // of polymerjs

export const ManagerHistory = new history();
const Upb = ["disabled", "disable-upgrade"];

export function Register(call, is, html) {
    call.prototype.is = is;
    let template;

    const properties = call.properties || call.prototype.properties || {};

    class GG extends ElementMixin(call) {
        get _template() {
            return template ??= html?.();
        }

        set _template(value) {
            template = value;
        }

        _attachDom(element) {
            element = element && this.hostElement.appendChild(element);
            QSP(this.hostElement);
            return element;
        }

        connectedCallback() {
            super.connectedCallback();
            call.prototype.attached?.apply(this);
        }

        disconnectedCallback() {
            super.disconnectedCallback();
            call.prototype.detached?.apply(this);
        }

        ready() {
            super.ready();
            call.prototype.ready?.apply(this);
        }

        static get properties() {
            return properties;
        }

        onFindSlot(slot) {
            call.prototype.onFindSlot?.apply(this, arguments);
        }

        $$(selector) {
            return this.hostElement.querySelector(selector);
        }

        handleLink(event, fallback = "") {
            const url = event?.currentTarget?.href || fallback;
            event?.preventDefault();
            this.hundlePagePush(url);
        }

        hundlePagePush(url) {
            ManagerHistory.pushState(url);
        }

        listen(element, eventType, callback) {
            element.addEventListener(eventType, (event) => {
                let detail = isCustomEvent(event) ? event.detail : null;
                if (typeof callback === "string") {
                    this[callback](event, detail);
                } else {
                    callback(event, detail, this);
                }
            });
        }
    }

    const observedAttributes = [...Upb, ...Object.keys(properties)];
    GG = jGR(GG);

    SUPER({
        create(hostElement) {
            const instance = new GG();
            KG(instance, hostElement, observedAttributes);
            instance.hostElement = hostElement;
            return instance;
        },
        observedAttributes
    }, is);
}

function isCustomEvent(obj) {
    return obj instanceof CustomEvent;
}

function KG(instance, hostElement, attributes) {
    const propertyMap = {};
    attributes.forEach(attr => {
        if (hostElement[attr]) {
            instance[attr] = hostElement[attr];
        }
        if (instance[attr]) {
            hostElement[attr] = instance[attr];
        }
        propertyMap[attr] = {
            configurable: false,
            enumerable: false,
            get: () => instance[attr],
            set: (value) => { instance[attr] = value; }
        };
    });
    Object.defineProperties(hostElement, propertyMap);
}

function SUPER({ create, observedAttributes }, is) {
    class Element_ extends HTMLElement {
        constructor() {
            super();
            this.inst = create(this);
        }

        connectedCallback() {
            this.inst.connectedCallback();
            this.inst.isConnected = true;
        }

        disconnectedCallback() {
            this.inst.disconnectedCallback();
            this.inst.isConnected = false;
        }

        static get observedAttributes() {
            return observedAttributes;
        }

        attributeChangedCallback(name, oldValue, newValue) {
            this.inst.attributeChangedCallback(name, oldValue, newValue);
        }

        forwardDynamicProps() {
            // Implement as needed
        }

        get is() {
            return is;
        }
    }
    customElements.define(is, Element_);
}

export const html = function(htmlString) {
    let template;
    return function() {
        if (!template) {
            template = document.createElement("template");
            template.innerHTML = htmlString;
        }
        return template;
    };
};

function QSP(document = window.document) {
    document.querySelectorAll("slot").forEach(slot => {
        const target = document.querySelector(`[slot="${slot.name}"]`);
        if (target) {
            slot.parentElement.insertBefore(target, slot);
            const dataHost = slot.parentElement.__dataHost;
            if (dataHost) {
                dataHost.onFindSlot(target);
            }
            slot.remove();
        }
    });
}

function observeDOMChanges() {
    const observer = new MutationObserver(() => {
        QSP();
    });
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true
    });
}

observeDOMChanges();

function jGR(BaseClass) {
    return class extends BaseClass {
        _propertyToAttribute(property, attribute, value) {
            this.__serializing = true;
            value = arguments.length < 3 ? this[property] : value;
            this._valueToNodeAttribute(this.hostElement ?? this, value,
                attribute || this.constructor.attributeNameForProperty(property));
            this.__serializing = false;
        }
    };
}
