import {
  Register,
  html
} from "../components/DOM.js"
import {
  renderList
} from "../components/list.js"
const _template = html`
<div id="items"></div>
`


class App {
  constructor() {
    this._items = []
  }
  ready() {}
  static get properties() {
    return {
      data: {
        type: Number,
        observer: "onChengeData"
      },
      getPlayer: {
        type: Function,
        observer: "onChengeFunction"
      },
    }
  }
  attached() {
    this.hostElement.setAttribute("role", "application")
  }
  onChengeData(data) {
    
  }
  onChengeFunction(a){
    this.player = a(this)
    const t = this.player.element.parentElement;
    t!==this.hostElement&&(t.remove())
    this.hostElement.appendChild(this.player.element)
  }
}

Register(App, "app-player", _template)