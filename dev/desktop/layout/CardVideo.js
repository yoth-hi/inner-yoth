import {
  Register,
  html
} from "../components/DOM.js"
import {
  renderList
} from "../components/list.js"

const _template = html`
<div>
  <div class="app-card-video-thumbnail"></div>
</div>
<div class="details">
  <div>
    <a href="{{data.owner.endpoint.url}}" class="image-avatar-link">
      <div class="image-avatar">
        <img role="img" src="" />
      </div>
    </a>
  </div>
  <div>
    <h3>
      <a href="/watch?v=28">
        <span>{{data.title}}</span>
      </a>
    </h3>
    <div class="meta">
      <a href="{{data.owner.endpoint.url}}">
        <div>{{data.owner.title}}</div>
      <a>
    </div>
    <div class="meta">
      <div>{{data.viewCount.text}}</div>
    </div>
  </div>
</div>
`

class App {
  constructor() {}

  ready() {}

  static get properties() {
    return {
      data: {
        type: Object,
        observer: "onChengeData"
      }
    }
  }

  attached() {
  }

  onChengeData(number) {}

  createText(i, index) {}
}
Register(App, "app-card-video", _template);