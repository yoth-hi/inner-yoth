import { Register, html } from "../components/DOM.js"
const _template = html`
<div class="thumbnail">

</div>
<div clsss≈"datails">datails...</div>
`


class App {
  constructor(){
    
  }
  attached(){
    this.callback = () => {
      this.isShow = true
    }
  }
  static get properties() {
    return {
      callback: {
        type: Function
      },
      isShow: {
        type: Function,
        reflectToAttribute: true
      },
    }
  }
}

Register(App, "app-card-video-column", _template)