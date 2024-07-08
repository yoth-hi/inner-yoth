import {
  Register,
  html
} from "../components/DOM.js"
import {
  renderList
} from "../components/list.js"

const _template = html`
<div id="items">
    <app-grid-card-video _scope="{{hostElement}}" data="{{data.content.results}}"></app-grid-card-video>
</div>
`

class App {
  constructor() {
    
  }

  ready() {
  }

  static get properties() {
    return {
      data: {
        type: Object,
        observer: "onChengeData"
      },
      isActive: {
        type: Boolean
      }
    }
  }

  attached() {}

  onChengeData(data) {
    
  }
}
Register(App, "app-home", _template);