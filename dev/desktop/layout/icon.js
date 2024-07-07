import { Register, html } from "../components/DOM.js"
import { GetIcon } from "../components/Icons.js"
const _template = html`
<div style="width: 100%; height: 100%; display: block; fill: currentcolor;"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="{{viewbox}}" width="24" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path></path></svg></div>
`

class App {
  constructor(){
    
  }
  static get properties() {
    return {
      viewbox: String,
      icon: {
        type: String,
        observer: "onChengeIcon"
      },
      "is-ecm": {
        type: Boolean,
        observer: "onChengeisEcm"
      }
    }
  }
  onChengeisEcm(a){
    const j = this.hostElement.querySelector("path")
    if(a){
      j.setAttribute("fill-rule","evenodd")
      j.setAttribute("clip-rule","evenodd")
    } else {
      j.removeAttribute("fill-rule","evenodd")
      j.removeAttribute("clip-rule","evenodd")
      
    }
  }
  onChengeIcon(icon){
    const { data, width, viewBox } = GetIcon(icon);
    const j = this.hostElement.querySelector("path")
    j.setAttribute("d",data??"")
    this.viewbox = viewBox
  }
  attached(){
    
  }
}

Register(App, "app-icon", _template)