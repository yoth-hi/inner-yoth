import {
  Dom,
  Element
} from "../../../utils/Dom.js";
import {
  CreateDisposeCallback
} from "../../../utils/Disposable.js";
const createJustMout = function(a, b) {
  for (; a._inst.length > b.length;)a._inst.pop().dispose();
  for (let j = 0; b.length > j; j++) {
    if (a._inst.length < b.length) {
      var g = new ProgressItem;
      a._inst.push(g);
      CreateDisposeCallback(a, g);
      g._appendTo(a._aa, 0)
    }
    a._inst[j].startTime = 0;
    a._inst[j].title = ""
  }
};
const createJustOne = function(a) {
  if (a._inst.length === 0) {
    var b = new ProgressItem(a._app);
    a._inst.push(b);
    CreateDisposeCallback(a, b);
    b._appendTo(a._aa, 0)

  }
  for (; a._inst.length > 1;)a._inst.pop().dispose();
  //  DW(a.j[0], "100%");
  a._inst[0].startTime = 0;
  a._inst[0].title = ""
};
class ProgressItem extends Dom {
  constructor(api) {
    super({
      _tag: "div",
      _className: "app-chapter-hover-container", _childs: [{
        _tag: "div", _className: "app-progress-bar-padding"
      }, {
        _tag: "div", _className: "app-progress-list", _childs: [{
          _tag: "div", _classList: ["app-play-progress", "app-swatch-background-color"]}, {
          _tag: "div", _className: "app-progress-linear-live-buffer"
        }, {
          _tag: "div", _className: "app-load-progress"
        }, {
          _tag: "div", _className: "app-hover-progress"
        },
        {
          _tag: "div", _className: "app-ad-progress-list"
        },
        {
          _tag: "svg", _className: "app-avg",
            _attrs:{
              width:"{{width}}",
              viewBox:"{{viewBox}}"
            },
          _childs:[{
            _tag:"path",
            _attrs:{
              d:"{{dataSvg}}"
            }
          }]
        },
        ]
        
      }]});
    this.startTime = NaN;
    this.title = "";
    this.index = NaN
    this.width = 0;
    this._D = this._getElementByClass("app-progress-linear-live-buffer");
    this._C = this._getElementByClass("app-ad-progress-list");
    this._G = this._getElementByClass("app-load-progress");
    this._K = this._getElementByClass("app-play-progress");
    this._B = this._getElementByClass("app-hover-progress");
    this._j = this._getElementByClass("app-chapter-hover-container")
    this._K.style.transform = "scale(1)"
    this._listen("mouseover", this._over)
    this._listen("mouseout", this._out)
    this._listen("touchstart", this._over)
    this._listen("touchend", this._out)
    this._listen("click", this._out)
    this._api = api._api
    this._onHover()
  }
  _over(){
    this.hover = true
    this._onHover()
  }
  _out(){
    this.hover = false
    this._onHover()
  }
  _getElement(a) {
    let t;
    switch (a) {
      case "PLAY":
        t = this._K
        break;
    }
    return t;
  }
  _onHover(){
    if(this.hover)this.element.classList.add("hover")
    else this.element.classList.remove("hover")
    var { timewatched = [] } = this._api._getVideoData()
    let list = []
    for(const item of timewatched){
      list.push(item*30)
    }
    let dataSvg = `M0,${(50-list.pop())}`;

    let width = this.element.offsetWidth; // Largura total do SVG
    let height = 100; // Altura total do SVG
    let step = width / (list.length - 1); // Espaço entre cada ponto
    
    for (let i = 0; i < list.length - 1; i++) {
      let x1 = i * step;
      let y1 = 50 - list[i];
      let x2 = (i + 1) * step;
      let y2 = 50 - list[i + 1];
      let cx1 = x1 + step / 2;
      let cy1 = y1;
      let cx2 = x2 - step / 2;
      let cy2 = y2;
      dataSvg += `C${cx1},${cy1} ${cx2},${cy2} ${x2},${y2} `;
    }
    
    dataSvg += `L${width},50 L0,50 Z`; // Fecha o caminho
    
    let viewBox = "0 0 1440 50";
    this._update({ viewBox, dataSvg });
  }
}
export default class extends Dom {
  _inst = [];
  _data = void 0;
  constructor(app) {
    super({
      _tag: "div",
      _className: "app-progress-bar-container",
      _attrs: {
        "aria-disabled": "true"
      },
      _childs: [{
        _tag: "div", _classList: ["app-heat-map-container"], _childs: [{
          _tag: "div", _className: "app-heat-map-edu"
        }]}, {
        _tag: "div", _classList: ["app-progress-bar"], _attrs: {
          tabindex: "0", role: "slider", "aria-label": "Bot\u00e3o deslizante de busca", "aria-valuemin": "{{ariamin}}", "aria-valuemax": "{{ariamax}}", "aria-valuenow": "{{arianow}}", "aria-valuetext": "{{arianowtext}}"
        }, _childs: [{
            _tag: "div", _className: "app-chapters-container"
          }, {
            _tag: "div", _className: "app-timed-markers-container"
          }, {
            _tag: "div",
            _className: "app-clip-start-exclude"
          }, {
            _tag: "div", _className: "app-clip-end-exclude"
          }, {
            _tag: "div", _className: "app-scrubber-container", _childs: [{
              _tag: "div", _classList: ["app-scrubber-button", "app-swatch-background-color"], _childs: [{
                _tag: "div", _className: "app-scrubber-pull-indicator"
              }]}]}]}, {
        _tag: "div", _classList: ["app-fine-scrubbing-container"], _childs: [{
          _tag: "div", _className: "app-fine-scrubbing-edu"
        }]}, {
        _tag: "div", _className: "app-bound-time-left", _content: "{{boundTimeLeft}}"
      }, {
        _tag: "div", _className: "app-bound-time-right", _content: "{{boundTimeRight}}"
      }, {
        _tag: "div", _className: "app-clip-start", _attrs: {
          title: "{{clipstarttitle}}"
        }, _content: "{{clipstarticon}}"
      },
        {
          _tag: "div", _className: "app-clip-end", _attrs: {
            title: "{{clipendtitle}}"
          }, _content: "{{clipendicon}}"
        }]})
    this._aa = this._getElementByClass("app-chapters-container")
    this._app = app
    createJustOne(this)
  }
  _setData(a) {
    this._data = a;
    if (a?.length) {
      createJustMout(this, a)
    } else createJustOne(this)
  }
  _onUpdateCurrentTime([_, a]) {
    const w = this._hover?this._hovering: a;
    this._updateSel(w??a, "PLAY")
  }
  _updateSel(a, b) {
    let st = 0
    for (let t = 0; t < this._inst.length; t++) {
      const MM = this._inst[t]._getElement(b)
      const size = this._data?.[t].scale
      MM.style.transform = "scaleX("+a+")"

      if (st => a) {
        //  ? MM.style.transform = "scaleX("+0+")"
      }
      st += size??1
      if (st <= a) {
        //? MM.style.transform = "scaleX("+1+")"
      }
    }
  }
  
}