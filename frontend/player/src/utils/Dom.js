import {
    createElement,
    createTextNode,
    binSearch,
    insertBefore,
    removeChildAll
} from "./utils.js";
import Disposable from "./Disposable.js";
const Iter = function (scope, isElObj) {
    const childs = [];
    if (!isElObj) return childs;
    for (let i = 0; i < isElObj.length; i++) {
        const data = isElObj[i];
        if (data) {
            var e = data.nodeType;
            1 === e || 3 === e
                ? childs.push(data)
                : data && "string" === typeof data._tag
                ? childs.push(scope._createElement(data))
                : data.element
                ? childs.push(data.element)
                : "string" === typeof data && -1 !== data.indexOf("\n")
                ? data.split("\n").forEach(function (f, h) {
                      0 < h && childs.push(createElement("BR"));
                      childs.push(createTextNode(f));
                  })
                : childs.push(createTextNode(data));
        }
    }
    return childs;
};
const registerDymamicValue = function (scope, element, type, value) {
    if ("{{" === value.substr(0, 2))
        scope._dynamicValue[value] = [element, type];
    else return value;
};
const setPreValue = function (scope, element, type, value) {
    if (type == "child") {
        removeChildAll(element);
        let data;
        if (void 0 !== value) {
            data =
                !Array.isArray(value) ||
                (value && "string" === typeof value._tag)
                    ? [value]
                    : value;
        }
        const arrChild = Iter(scope, data);
        while (arrChild.length) {
            element.appendChild(arrChild.shift());
        }
    } else {
        if (type === "style") {
            value = /* parce css */ value;
        }
        if (value) {
            element.setAttribute(type, value);
        } else {
            element.removeAttribute(type, value);
        }
    }
};
export class Element extends Disposable {
    _dynamicValue = {};
    _elements = {};
    _refs = {};
    constructor(options) {
        super();
        this.element = this._createElement(options);
    }
    _createElement(
        { _tag, _childs, _ref,_props,_attrs, _className, _classList, _content },
        isSvg
    ) {
        isSvg ??= _tag === "svg";
        let element;
        if (isSvg) {
            element = document.createElementNS(
                "http://www.w3.org/2000/svg",
                _tag
            );
        } else {
            element = createElement(_tag);
        }
        if (_className) {
            if (registerDymamicValue(this, element, "class", _className)) {
                setPreValue(this, element, "class", _className);
                this._elements[_className] = element;
            }
        } else if (_classList) {
            for (let i = 0; i < _classList.length; i++) {
                const _className = _classList[i];
                if (registerDymamicValue(this, element, "class", _className)) {
                    setPreValue(this, element, "class", _className);
                    this._elements[_className] = element;
                }
            }
        }
        if (_content) {
            if (registerDymamicValue(this, element, "child", _content)) {
                setPreValue(this, element, "child", _content);
            }
        } else if (_childs) {
            for (let i = 0; i < _childs.length; i++) {
                const _child = _childs[i];
                if (typeof _child == "string") {
                    if (registerDymamicValue(this, element, "child", _child)) {
                        setPreValue(this, element, "child", _child);
                    }
                } else {
                    const h = isSvg ?? _childs._tag == "svg";
                    const element_ = this._createElement(_child, h);
                    element.appendChild(element_);
                }
            }
        }
        if (_attrs) {
            const st = Object.entries(_attrs);
            for (let i = 0; i < st.length; i++) {
                const [key, value] = st[i];
                setPreValue(
                    this,
                    element,
                    key,
                    "string" === typeof value
                        ? registerDymamicValue(this, element, key, value)
                        : value
                );
            }
        }
        _props&&(element._props = _props)
        if(_ref){
          this._refs[_ref] = [this,element]
        }
        return element;
    }
    _getRef(ref){
      const j = this._refs[ref] 
      if(j&&(j.length>1)){
        return j
      }
    }
    _getElementByClass(class_) {
        return this._elements[class_];
    }
    _appendTo(parent) {
        parent.appendChild(this.element);
    }
    _listen(name, call, bind) {
        this._on(this.element, name, call, bind);
    }
    _on(element, name, call, bind) {
        element.addEventListener(name, event => {
            if (bind) {
                call.apply(bind, [event, element, this]);
            } else {
                call.apply(this, [event, element, this]);
            }
        });
    }
    _update(obj) {
        const keys = Object.keys(obj);
        keys.forEach(key => {
            this._updateValue(key, obj[key]);
        });
    }
    _updateValue(key, value) {
        const isD = this._dynamicValue["{{" + key + "}}"];
        if (isD) {
            setPreValue(this, isD[0], isD[1], value);
        }
    }
}
export class Dom extends Element {
    constructor(options) {
        super(options);
    }
    _hide() {
        this.element.style.display = "none";
    }
    _show() {
        this.element.style.display = "";
    }
}
export const appendChildInTemplate = function (api, child, index) {
    const element = api._getTemplate().element;
    var d = binSearch(element.children, function (e) {
        e = Number(e.getAttribute("data-layer"));
        return index - e || 1;
    });
    0 > d && (d = -(d + 1));
    insertBefore(element, child, d);
    child.setAttribute("data-layer", String(index));
};
