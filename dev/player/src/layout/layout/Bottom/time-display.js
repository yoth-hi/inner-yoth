import {
  Dom,
  Element
} from "../../../utils/Dom.js";
import {
  CreateDisposeCallback
} from "../../../utils/Disposable.js";
import {
  formateTime
} from "../../../utils/utils.js";

export default class extends Dom {
  _isPremiere = false
  constructor(api) {
    super({
      _tag: "div",
      _classList: ["app-time-display", "notranslate"],
      _childs: [
        {
          _tag: "span", 
          _className: "app-time-clip-icon", 
          _content: "{{clipicon}}"
        },
        {
          _tag: "span", 
          _childs: [
            {
              _tag: "span",
              _className: "app-time-current",
              _content: "{{currenttime}}"
            },
            {
              _tag: "span", 
              _className: "app-time-separator", 
              _content: " / "
            },
            {
              _tag: "span",
              _className: "app-time-duration",
              _content: "{{duration}}"
            }
          ]
        },
        {
          _tag: "span", _className: "app-clip-watch-full-video-button-separator", _content: "\u2022"
        },
        {
          _tag: "span", _className: "app-clip-watch-full-video-button", _content: "{{watchfullvideo}}"
        }
      ]
    });
    this._api = api;
    this._liveBadge = new Dom({
      _tag: "button",
      _classList: ["app-live-badge", "player-button"],
      _attrs: {
        disabled: "true"
      },
      _content: "{{content}}"
    });
    this._clipWatchFull = this._getElementByClass("app-clip-watch-full-video-button");
    this._liveBadge._content("@(live)");
    CreateDisposeCallback(this, this._liveBadge);
    this._liveBadge._appendTo(this.element);

    this._listen("click", this._onClick);
    this._on(this._clipWatchFull, "click", this._clickClipWatchFull);
    this._on(api, "presentingplayerstatechange", this._onUpdateState);
    // this._on(api, "appresize", this.Uc);
    //  this._on(api, "onLoopRangeChange", this.onLoopRangeChange);
    this._on(api, "videodatachange", this._onVideoDataChange);
    // (b = api.getVideoData()) && this.updateVideoData(b);
  }
  _onClick() {}
  _onUpdateState() {}
  _clickClipWatchFull() {}
  _onVideoDataChange() {}
  _updateTime() {
    const c = formateTime(this._api._getCurrentTime()||0)
    this.C !== c && (this._updateValue("currenttime", c), this.C = c);
    const b = formateTime(this._api._getDuration())
    this.D !== b && (this._updateValue("duration", b), this.D = b)
    
    const liveBadge = this._liveBadge;
    liveBadge.element.disabled = true;
    
    
    let isLive_;
    let isLive = false;
    
    if(isLive){
      this._liveBadge.element.disabled = true;
      if(this._storeIsLive!==isLive){
        this._liveBadge._show()
      }
    } else {
      if(this._storeIsLive!==isLive){
        this._liveBadge._hide()
      }
    }
    this._storeIsLive = isLive
}}