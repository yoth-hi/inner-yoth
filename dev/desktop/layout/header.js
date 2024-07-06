import { Register, html } from "../components/DOM.js"

const _template = html`
<div id="container" >
  <div id="start" >
    <app-logo></app-logo>
  </div>
  <div id="center" >
    <app-search data="{{data.searchBox}}"></app-search>
  </div>
  <div id="end" >end</div>
</div>
`


class App {
  constructor(){
    
  }
  static get properties() {
    return {
      data: {
        type: Object
      },
    }
  }
  attached(){
    
  }
}

Register(App, "app-masthead", _template)