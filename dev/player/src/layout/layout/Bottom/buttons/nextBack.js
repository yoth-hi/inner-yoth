import { Dom, Element } from "../../../../utils/Dom.js";
import { next, back } from "../../../icons.js";
import { updateButtonNextOrBack } from "./nextBack.utils.js";
export default class extends Dom {
    playlist
    videoData
    constructor(api, isNext) {
        super({
          _tag:"a",
          _classList: ["player-button"],
          _attrs:{
            role:"button",
            title:"{{title}}",
            href:"{{url}}",
            "data-preview":"{{preview}}",
            "data-tooltip-text":"{{text}}",
            "data-duration":"{{duration}}",
            "aria-disabled":"{{disabled}}",
            "data-next":"{{next}}",
            "data-prev":"{{prev}}",
            "data-title-no-tooltip":"{{data-title-no-tooltip}}",
            "aria-keyshortcuts":"{{aria-keyshortcuts}}"
          },
          _childs:[isNext?next():back()]
        })
        this._api = api;
        this._isNext = isNext
        this._on(this._api, "videodatachange", this._onChengeData);
        this._listen("click", this._onClick);
        this._onChengeData()
    }
    _onClick(event){
      if(event.type === "click"){
        this.element.blur()
      }
    }
    _onChengeData(){
      const data = null
      updateButtonNextOrBack(this)
    }
}