import {
  Register,
  html
} from "../components/DOM.js"
import {
  renderList
} from "../components/list.js"

const _template = html`
<div id="contenter">
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
Register(App, "app-results", _template);