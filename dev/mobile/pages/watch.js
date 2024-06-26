import {
  Element,
  html,
  register
} from "../components/element.js"

class Watch extends Element {
  constructor() {
    super()
  }
  render() {
    return html`
    <div class="content-watch">
      hdhdhff y y yy ydhdhd
    </div>
    `
  }
}
register(Watch, "app-watch")