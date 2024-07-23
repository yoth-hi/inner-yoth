import { Register, html } from "../components/DOM.js"
import { renderList } from "../components/list.js"
import { createModal } from "./Modal.js"
import { RequestActionButton  } from "../service/Api.js"

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
    renderList("app-action-button", this.$["actions"], arr,(a,data,m)=>{
      a.setAttribute("role","tab");
      a["data"] = data
      let lest = data.isActive
      a._click = (event) => {
        if(data.hasRequireLoginFirst){
          createModal(data.menu,{
            get x(){
              return 38
            }
          })
          return;
        }
        a.isActive_ = !lest;
        
        this.onClickAction_(data, event).then(K=>{
          lest = a.isActive_
        }).catch(k=>{
          a.isActive_ = data.isActive = lest;
        })
        data.isActive = a.isActive_
      }
    },this.actionsElements)
  }
  async onClickAction_(data, event){
    const api = data.isActive ? (data.action?.active_api||data.action?.api) : data.action?.api
    return await RequestActionButton(api, data, data.action?.requestContext||{})
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