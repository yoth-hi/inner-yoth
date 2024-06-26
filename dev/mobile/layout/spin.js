import {
  Element,
  html,
  register
} from "../components/element.js"
import"./spin.css"
class App extends Element {
  constructor() {
    super()
  }
  render() {
    return html`
    <svg class="circular" viewBox="25 25 50 50">
    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
    </svg>
    `
  }
}
register(App, "app-spiner")