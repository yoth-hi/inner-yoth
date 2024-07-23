import { Register, html } from "../components/DOM.js"

const _template = html`
<button class="button-action" on-click="onClick" aria-label="{{data.accessibility}}">
  <div class="content">
    <app-icon hidden="[[!data.icon]]" icon="{{data.icon}}"></app-icon>
  </div>
</button>
`

class App {
  constructor(){
    
  }
  static get properties() {
    return {
      _click: Function,
      data: {
        type: Object,
        observer: "onChengeData"
      },
      icon: {
        type: String,
      },
      isActive_: {
        type: Boolean,
        reflectToAttribute: true,
        observer: "onChengeActive"
      }
    }
  }
  onChengeData(data){
    this.updateLayoutItem_(data)
    this.hostElement.dataset.type = data.type
    if(data.isActive===false||data.isActive===true){
      this.isActive_ = data.isActive
      return
    }
    getUpdate(this.current, data.renderType, data.actionNumberShow??data)
  }
  onChengeActive(a){
    const data = this.data;
    
    getUpdate(this.current, data.renderType, data.actionNumberShow??data,a?"active_title":"title")
  }
  updateLayoutItem_(data){
    if(this.currentId !== data.renderType){
      this.current?.remove();
      this.currentId = data.renderType;
      this.current = document.createElement(getType(this.currentId));
      this.$$(".content").appendChild(this.current)
    }
  }
  onClick(){
    this._click(this.data)
  }
  attached(){
    
  }
}
const getType = function(type){
  if(type==="number"){
    return "app-text-number"
  }
  return "span"
}
const getUpdate = function(element, type, data,M="*"){
  if(type==="number"){
    element.number = data
  } else {
    element.innerText = data[M]??data.text??data.title??data
  }
}
Register(App, "app-action-button", _template)