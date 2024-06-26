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
      <div class="player-size player-placeholder" style></div>
      <app-slim-video-information-renderer></app-slim-video-information-renderer>
    </div>
    `
  }
}
register(Watch, "app-watch")