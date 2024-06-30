import { Register, html } from "../components/DOM.js"
import { renderList } from "../components/list.js"
const _template = html`
<div id="items"></div>
`


class App {
  constructor(){
    this._items = []
  }
  ready(){
    this.onChengeData([
      { accessibilityLabel:"label@test", title:"title@test" },
      { accessibilityLabel:"label@test", title:"title@test" },
      { accessibilityLabel:"label@test", title:"title@test" },
      { accessibilityLabel:"label@test", title:"title@test" },
      { accessibilityLabel:"label@test", title:"title@test" },
    ])
  }
  static get properties(){
    return{
      data:{}
    }
  }
  attached(){
    
    this.hostElement.setAttribute("role","navigation")
  }
  onChengeData(arr){
    renderList("app-mini-drower-item", this.$["items"], arr,(a,data,m)=>{
      a.setAttribute("role","tab");
      a["data"] = data
      this._items = m
      this._updateSelected()
    })
  }
  _updateSelected(){
    const currentIndex = 0
    this._items.forEach((el,index)=>{
      el.setAttribute("aria-selected",String(index == currentIndex))
    })
  }
}

Register(App, "app-mini-drower", _template)