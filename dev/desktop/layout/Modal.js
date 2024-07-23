import { Register, html } from "../components/DOM.js"
import { Load } from "../components/loadDataPage.js"

let hosted;
export const createModal = function(data, positions){
  hosted ??= document.querySelector("app-popup-contenter");
  // hosted.data = data
  // hosted.isActive_ = true
  // hosted.position = positions
}
const template = html`<div id="content">

<app-spanner></app-spanner>
</div>
<div>
`
class App {
  constructor(){
    
  }
  attached(){
  }
  static get properties() {
    return {
      data: {
        type: Object,
        observer:"onChengeData"
      },
      renderdata_: {
        type: Object,
        observer:"onChengeRenderData"
      },
      isLoading: {
        type: Boolean,
        reflectToAttribute: true,
      },
      isActive_: {
        type: Boolean,
        observer:"onChengeActive",
        reflectToAttribute: true,
      },
      position: {
        type: Object,
        observer:"onChengePosition"
      },
    }
  }
  async onChengeData(a){
    this.isActive_ = true
    this.isLoading = true
    this._27 = false
    if(a.randerDataInServer){
     const aw = await F()
     this.renderdata_ = (aw)
    } else {
     this.renderdata_ = (a)
    }
    this._27 = true
  }
  ready(){
    this.listen(window,"click","_click")
  }
  onChengeRenderData(a){
    this.isLoading = false
    debugger
  }
  _click({ target }){
    if(!this.isActive_)return;
    if(!this.hostElement.contains(target) && target!==this.hostElement) {
      setTimeout(()=>this._close(),16)
    }
  }
  _close(){
    this.isActive_ = false;
  }
  onChengePosition({ x, y, height, width }){
    const offsetWidth = this.hostElement.offsetWidth
    const left = Math.min(innerWidth - offsetWidth - 36, x)
    this.setStyle("left",`${left}px`)
    this.setStyle("top",`${Math.max(y, 48)}px`)
  }
  setStyle(key, value){
    this.hostElement.style[key] = value
  }
  onChengeActive(){
    this.abort?.abort();
    this.abort = void 0;
    debugger
  }
}


async function F() {
  // const data = await Load({
    
  // },"/v1/popup/user_menu")
}
Register(App, "app-popup-contenter", template)