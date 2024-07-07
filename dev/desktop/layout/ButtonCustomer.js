import { Register, html } from "../components/DOM.js"
// <app-icon icon="[[icon]]"></app-icon>
const _template = html`
<span>{{text}}</span>
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
      text: {
        type: String
      },
      data: {
        type: Object,
        observer:"onChengeData"
      },
      isRow: {
        type: Object,
        reflectToAttribute: true
      },
      isFull: {
        type: Object,
        reflectToAttribute: true
      },
      isBorder: {
        type: Object,
        reflectToAttribute: true
      },
    }
  }
  onChengeData(a){
    if(a){
      this.icon = a.icon
      this.text = a.text
      this.isRow = !!a.isRow
      this.isFull = !!a.isFull
      this.isBorder = !!a.isBorder
    }
  }
}

Register(App, "app-button-customer", _template)