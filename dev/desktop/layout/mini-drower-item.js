import { Register, html } from "../components/DOM.js"
import { renderList } from "../components/list.js"
const _template = html`
<a href="/" on-tab="handleLink" on-click="handleLink" aria-label="{{data.accessibility.label}}">
  <app-icon class="icon" icon="{{getIcon(data.icon,isSelected)}}"></app-icon>
  <span class="title" role="text">{{data.title}}</span>
</a>
`


class App {
  constructor(){
  }
  static get properties(){
    return{
      isSelected: Boolean,
      data: {
        type: Object,
        observer: "onChengeData"
      },
      
    }
  }
  attached(){
    this.hostElement.setAttribute("role","tab")
  }
  onChengeData(a){
    const title = a?.accessibility?.label
    title&&this.hostElement.setAttribute("aria-label",title)
  }
  ready(){
    
  }
  getIcon(icon, is){
    return(is?"SELECTED_":"")+icon 
  }
}

Register(App, "app-mini-drower-item", _template)