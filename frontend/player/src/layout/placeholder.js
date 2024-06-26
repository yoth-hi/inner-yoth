import { Dom, Element } from "../utils/Dom.js";
import{ play }from"./icons.js"
export default class placeholder extends Dom {
    constructor(api, chrome) {
        super({
            _tag: "div",
            _classList: ["{{showClass}}"],
            _childs: [
                {
                    _tag: "div",
                    _className: "app-placeholder-img"
                },
                {
                  _tag:"div",
                  _className: "app-placeholder-icon",
                  _childs:["{{_iconPlay}}"]
                }
            ]
        });
        this._isShow = true
        this._api = api
        this._chrome = chrome
        this._img = this._getElementByClass("app-placeholder-img")
        this._on(this._api, "presentingplayerstatechange", this._onChengeState);
        this._onChengeData()
        let GR;
        this._listen("click", GR = ()=>{
          
          this._api._initChrome()
          this._api._playVideo()
        })
        
        setTimeout(GR, 400);
    }
    _setImg(src){
      const _iconPlay = play()
      this._update({ _iconPlay })
      this._img.style.backgroundImage = `url(${src})`
    }
    _onChengeState(kk){
      const state = kk?.state ?? kk ?? 0;
      state === 0 ? this._show() : this._hide()
      this._isShow = state === 0;
      setTimeout(this._onChengeData.bind(this),400)
    }
    _onChengeData(){
      const data = this._api._getVideoData()
      const img = `https://i.ytimg.com/vi/${data.videoId}/maxresdefault.jpg`
      this._setImg(this._isShow?img:"")
    }
    _hide(){
      this._update({ showClass: "app-placeholder-hidden"})
    }
    _show(){
      this._update({ showClass: "app-placeholder-show"})
    }
}
