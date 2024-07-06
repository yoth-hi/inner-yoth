import {
  Register,
  html
} from "../components/DOM.js"

const _template = html``

const to = "/results"
class App {
  constructor() {}
  attached() {
    this.listen(this.hostElement.parentElement, "mouseover", "onIn")
    this.listen(this.hostElement.parentElement, "touchstart", "onIn")
    this.listen(this.hostElement.parentElement, "touchend", "onOut")
    this.listen(this.hostElement.parentElement, "mouseout", "onOut")
  }
  onOut() {
    this.hover = false
  }
  onIn() {
    this.hover = true
  }
  static get properties() {
    return {
      prefix: {
        //  observer: "onChengeData",
        type: String
      },
      hover: {
        type: String,
        reflectToAttribute: true,
      }
    }
  }
}

Register(App, "app-paper-tooltip", _template)