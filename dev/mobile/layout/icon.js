import {
  Element,
  html,
  register
} from "../components/element.js"
import { GetIcon } from "../../desktop/components/Icons.js"
class App extends Element {
  constructor() {
    super()
  }
  onChengeIcon(icon) {
    const {
      data,
      width,
      viewBox
    } = GetIcon(icon);
    const j = this.querySelector("path")
    j.setAttribute("d", data??"")
    this.viewbox = viewBox
  }
  static properties = {
    viewbox: {
      type: String
    },
    icon: {
      type: String,
      observer: "onChengeIcon"
    },
    "is-ecm": {
      type: Boolean,
      observer: "onChengeisEcm"
    }

  }
  static observers = ["onChengeIcon(icon)"]
  render() {
    return html`
    <div style="width: 100%; height: 100%; display: block; fill: currentcolor;"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="${this.viewbox}" width="24" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path></path></svg></div>
    `
  }
}
register(App, "app-icon")