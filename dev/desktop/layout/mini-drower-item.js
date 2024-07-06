import { Register, html } from "../components/DOM.js"
import { renderList } from "../components/list.js"
const _template = html`
<a href="/" on-click="handleLink" aria-label="{{data.accessibility.label}}">
  <app-icon class="icon"></app-icon>
  <span class="title" role="text">{{data.title}}</span>
</a>
`


class App {
  constructor(){
    
  }
  static get properties(){
    return{
      data: {
        type: Object,
        observer: "onChengeData"
      },
      
    }
  }
  onChengeData(a){
    const title = a?.accessibilityLabel
    title&&this.hostElement.setAttribute("aria-label",title)
  }
  ready(){
    
  }
  attached(){
  }
}

Register(App, "app-mini-drower-item", _template)