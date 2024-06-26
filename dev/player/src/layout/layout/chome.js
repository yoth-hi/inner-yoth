import { Dom, Element, appendChildInTemplate } from "../../utils/Dom.js";
import { Title } from "./top/title.js";
import PlayButton from "./Bottom/buttons/play.js"
import FullScreenButton from "./Bottom/buttons/fullscreen.js"
import Disposable, { CreateDisposeCallback } from "../../utils/Disposable.js";
/*class Chrome extends Dom {
  constructor(app){
    super({
      _tag:"div",
      _className:"html5-player",
      _childs:[{
        _tag:"div",
        _className:"video-contenter"
      }]
    })
    this._videoContenter = this._getElementByClass("video-contenter")
  }
}*/

export const init = class extends Disposable {
    _chrome = null;
    constructor(player) {
        super();
        this._player = player;
        if (this._player._getPlayerConfig()._isPreview) {
            this._chrome = new Chrome(this._player);
        } else {
            this._chrome = new ChromeContructor(this._player);
        }
        CreateDisposeCallback(this, this._chrome);
    }
    _init() {
        this._chrome._init();
    }
};

class Chrome extends Disposable {
  _isPreview = false;
    constructor(player) {
        super();
        this._api = player;
        this._placeholder  = new Placeholder(this._api, this)
        CreateDisposeCallback(this, this._placeholder);
        appendChildInTemplate(this._api, this._placeholder.element, 1);
        
        this._resizeObserver = new ResizeObserver((a)=>this._resize(a))
        this._resizeObserver.observe(this._api._getRootNode())
    }
    _init() {
        const root = this._api._getRootNode();
        const template = this._api._getTemplate();
        this._isPreview =  this._api._getPlayerConfig()._isPreview;
        if(!this._isPreview){
          template._listen("dblclick",this._dblclick,this)
        }
    }
    _dblclick(){
      this._api._toggleFullscreen()
    }
    _resize(data){
      this._api._dispatch("playeresize", data)
    }
}
class ChromeContructor extends Chrome {
    constructor(player) {
        super(player);
    }
    _init() {
        this._title = new Title(this._api);
        this._chromeTop = new Element({
            _tag: "div",
            _className: "app-chrome-top"
        });
        CreateDisposeCallback(this, this._chromeTop);
        CreateDisposeCallback(this, this._title);
        appendChildInTemplate(this._api, this._chromeTop.element, 1);
        this._title._appendTo(this._chromeTop.element);
        super._init();
        this._T = new IY(this);
        CreateDisposeCallback(this, this._T);
    }
}
import Placeholder from "../placeholder.js"
class IY extends Disposable {
    constructor(chrome) {
      super()
        this._chrome = chrome;
        this._api = chrome._api;

        this._chromeBottom = new Dom({
            _tag: "div",
            _className: "app-chrome-bottom",
            _childs: [
                {
                    _tag: "div",
                    _className: "app-chrome-controls"
                }
            ]
        });

        CreateDisposeCallback(this, this._chromeBottom);
        appendChildInTemplate(this._chrome._api, this._chromeBottom.element, 2);
        this._chromeControls = this._chromeBottom.element.children[0];
        
        const left = new Element({ _tag:"div", _className:"app-left-controls" })
        CreateDisposeCallback(this, left);
        left._appendTo(this._chromeControls)
        
        this._backButtom = new PlayButton(this._api, false)
        CreateDisposeCallback(this, this._backButtom);
        this._backButtom._appendTo(left.element)
        
        this._playButtom = new PlayButton(this._api)
        CreateDisposeCallback(this, this._playButtom);
        this._playButtom._appendTo(left.element)
        
        this._nextButtom = new PlayButton(this._api, true)
        CreateDisposeCallback(this, this._nextButtom);
        this._nextButtom._appendTo(left.element)
        
        this._muteButtom = new PlayButton(this._api)
        CreateDisposeCallback(this, this._muteButtom);
        
        
        const right = new Element({ _tag:"div", _className:"app-right-controls" })
        CreateDisposeCallback(this, right);
        right._appendTo(this._chromeControls)
        
        
        this._playButtom = new PlayButton(this._api)
        CreateDisposeCallback(this, this._playButtom);
        this._playButtom._appendTo(right.element)
        
        this._playButtom = new PlayButton(this._api)
        CreateDisposeCallback(this, this._playButtom);
        this._playButtom._appendTo(right.element)
        
        this._fullscreanButtom = new FullScreenButton(this._api)
        CreateDisposeCallback(this, this._fullscreanButtom);
        this._fullscreanButtom._appendTo(right.element)
        
        this._api.addEventListener("playeresize", (a)=>this._resize(a))
    }
    _resize([w]){
      console.log(w)
      const ws = w.contentRect?.width ??  this._api._getRootNode().offsetWidth;
      const margin = ws > 1080 ? 20 : 15;
      this._chromeBottom.element.style.width = `${ws-margin * 2}px`
      this._chromeBottom.element.style.left = `${margin}px`
    }
}
