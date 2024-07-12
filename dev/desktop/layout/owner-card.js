import { Register, html } from "../components/DOM.js"
import { renderList } from "../components/list.js"
const _template = html`
<div class="contenter">
  <app-image aria-hidden="true" data="{{getImageAvatar(data)}}"></app-image>
  <div class="details">
    <div>
      <span class="name" role="text">{{data.title}}</span>
    </div>
    <div class="metadata">
      <app-text-number number="0"></app-text-number>
      <span role="text" class="subtext">Subscrivers</span>
    </div>
  </div>
  <div id="actions">
    
  </div>
</div>
`


class App {
  actionsElements = [];
  constructor(){
    
  }
  static get properties() {
    return {
      data: {
        type: Object,
        observer: "onChengeData"
      },
      actionsData: {
        type: Array,
        observer: "onChengeActionsData"
      },
    }
  }
  onChengeActionsData(arr){
    renderList("app-button-customer", this.$["actions"], arr,(a,data,m)=>{
      a.setAttribute("role","tab");
      a["data"] = data
    },this.actionsElements)
  }
  attached(){
    this.hostElement.setAttribute("role","group");
  }
  onChengeData(data){
    this.actionsData = data?.actions ?? []
  }
  getImageAvatar(A){
    return {
      src:""
    }
  }
}

Register(App, "app-card-owner", _template)