import { Register, html } from "../components/DOM.js"
import { Load } from "../components/loadDataPage.js"

let hosted;
export const createModal = function(data, positions){
  hosted ??= document.querySelector("app-popup-contenter");
  hosted.data = data
  hosted.position = positions
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
      isLoading: {
        type: Boolean,
        reflectToAttribute: true,
        value: true
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
  onChengeData(a){
    this.isActive_ = true
    this.isLoading = true
     //const aw = await F()
  }
  ready(){
    this.listen(window,"click","_click")
  }
  _click({ target }){
    if(!this.isActive_)return;
    if(!this.hostElement.contains(target) && target!==this.hostElement) {
      this._close()
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
  }
}


async function F() {
  // const data = await Load({
    
  // },"/v1/popup/user_menu")
}
Register(App, "app-popup-contenter", template)