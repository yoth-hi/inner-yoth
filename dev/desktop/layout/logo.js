import { Register, html } from "../components/DOM.js"

const _template = html`
<a on-click="handleLink">YOTH</a>
`


class App {
  constructor(){
    
  }
  attached(){
    
  }
}

Register(App, "app-logo", _template)