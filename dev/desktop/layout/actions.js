import { Register, html } from "../components/DOM.js"
import "./actionsButton.js"
const _template = html`

`

class App {
  constructor(){
    
  }
  static get properties() {
    return {
      data: {
        type: Object,
        observer: "onChengeData"
      }
    }
  }
  onChengeData({ actions = [], menu = null }){
    this.renderActions(actions)
  }
  reset(){
    const content = this.hostElement;
    for(;content.firstChild;){
      content.firstChild.remove()
    }
  }
  renderActions(list=[]){
    this.reset()
    const content = this.hostElement;
    for(const item of list){
      const element = document.createElement("app-action-button");
      element.data = item
      element._click = () => {}
      content.appendChild(element)
    }
  }
  attached(){
    
  }
}

Register(App, "app-actions", _template)