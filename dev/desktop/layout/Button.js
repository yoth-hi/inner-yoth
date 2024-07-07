import { Register, html } from "../components/DOM.js"
const _template = html`
<app-icon is-ecm="[[isEcm]]" icon="[[icon]]">
</app-icon>
`


class App {
  constructor(){
    
  }
  attached(){
  }
  static get properties() {
    return {
      icon: {
        type: String,
        reflectToAttribute: true
      },
      "is-round": {
        type: Boolean,
        reflectToAttribute: true
      },
      "is-ecm": {
        type: Boolean
      },
    }
  }
}

Register(App, "app-button-icon", _template)