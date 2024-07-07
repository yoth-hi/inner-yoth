import { Register, html } from "../components/DOM.js"
import { renderList } from "../components/list.js"
const _template = html`
<a href$="{{getHref(data)}}" on-tab="handleLink_" on-click="handleLink_" aria-label="{{data.accessibility.label}}">
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
  handleLink_(a){
    const render = this.data?.endpoint?.render
    const href = this.data?.endpoint?.url
    if(render){
      console.log("RENDER `"+render+"` PAGE")
      return;
    }
    this.handleLink(null,href)
  }
  getIcon(icon, is){
    return(is?"SELECTED_":"")+icon 
  }
  getHref(){
    return data?.endpoint?.url
  }
}

Register(App, "app-mini-drower-item", _template)