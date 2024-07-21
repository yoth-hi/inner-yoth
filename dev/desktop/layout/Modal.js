import { Register, html } from "../components/DOM.js"

let hosted;
export const createModal = function(data, positions){
  hosted ??= document.querySelector("app-popup-contenter");
  hosted.data = data
  hosted.position = positions
}
const template = html`<div id="content"></div>`
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

      position: {
        type: Object,
        observer:"onChengePosition"
      },
    }
  }
  onChengeData(a){
    
  }
  onChengePosition({ x, y }){
    
  }
}

Register(App, "app-popup-contenter", template)