import {
  Element,
  html,
  register
} from "../components/element.js"

class Watch extends Element {
  constructor() {
    super()
  }
  static properties = {
    data: {
      type: Object,
      attribute: false
    },
  }
  render() {
    return html`
    <div class="content-watch">
      <div class="player-size player-placeholder"></div>
      <app-slim-video-information-renderer .data="${this.data?.playerOverlays?.videoDetalis}"></app-slim-video-information-renderer>
    </div>
    `
  }
}
register(Watch, "app-watch")