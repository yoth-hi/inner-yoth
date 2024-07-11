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
  _store = {}
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
              preserveAspectRatio:"none",
              width:"100%",
              height:"320px",
              viewBox:"0 0 1000 100"
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
    this._update({ dataSvg:this._updateY() });
  }
  _updateY(){
    var { timewatched = [], videoId } = this._api._getVideoData()
    if(this._store[videoId]){
      return this._store[videoId]
    }
    const data = []
    const slep = 1E3 / timewatched.length
    let dataSvg = "";
    const minHeightDp = 4
    const maxHeightDp = 40
    data.push({
      x:0,
      y:100
    })
    for(let index = 0; index < timewatched.length;index++){
      const dataValue = timewatched[index]
      const keep = (index + .5) * slep
      const val = 100 - Math.min(Math.max(dataValue * 100, minHeightDp / 321 * 100), maxHeightDp * 321 * 100)
      if(index == 0){
        data.push({
          x:0,
          y:val
        })
      }
      data.push({
        x:keep,
        y:val
      })
      if(index === timewatched.length - 1 ){
        data.push({
          x:1E3,
          y:val
        })
      }
    }
    data.push({
      x:1E3,
      y:100
    })
    for(let index2 = 0; index2 < data.length;index2++){
      const info = data[index2]
      if(index2 === 0){
        dataSvg = `M ${info.x.toFixed(1)},${info.y.toFixed(1)}`
      } else {
        const info2 = rect(data[index2 - 1], data[index2 - 2], info);
        const info3 = rect(info,data[index2 - 1], data[index2 + 1], true);
        dataSvg += ` C`
        dataSvg += ` ${info2.x.toFixed(1)},${info2.y.toFixed(1)}`
        dataSvg += ` ${info3.x.toFixed(1)},${info3.y.toFixed(1)}`
        dataSvg += ` ${info.x.toFixed(1)},${info.y.toFixed(1)}`
      }
    }
    return this._store[videoId] = dataSvg
  }
}
function rect(a,b,c,d=false){
  const eqlz = (function(a,b){
    const data = {
      _val2:0,
      _val1:0
    }
    data._val2 = b.x - a.x
    data._val1 = b.y - a.y
    return data;
  })(b || a,c||a)
  return{
    x:a.x + (d? eqlz._val2 * -1 : eqlz._val2)*.2,
    y:a.y + (d? eqlz._val1 * -1 : eqlz._val1) *.2
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