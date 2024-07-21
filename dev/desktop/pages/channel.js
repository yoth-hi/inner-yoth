import {
  Register,
  html
} from "../components/DOM.js"
import {
  renderList
} from "../components/list.js"

const _template = html`
  <div class="content">
    <div id="page-header">
      <div class="page-header-contenter">
        <div class="avatar-content">
          <div class="avatar">
            <img/>
          </div>
        </div>
        <div>
          <div class="title-large">
            <h1>
              <span>Title</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
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
Register(App, "app-channel", _template);