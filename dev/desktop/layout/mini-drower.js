import { Register, html } from "../components/DOM.js"
import { renderList } from "../components/list.js"
import { target } from "../components/load.page.main.layout.js";
import { EVENT_NAME_ON_CHENGE_DATA_HEADER_AND_GUIDE } from "../components/vars.js";
const _template = html`
<div id="items"></div>
`


class App {
  constructor(){
    this._items = []
    this.listen(target,EVENT_NAME_ON_CHENGE_DATA_HEADER_AND_GUIDE,"onChengeLayoutData")
  }
  ready(){
    
  }
  static get properties(){
    return{
      data:{
        type: Object,
      },
      layout_data:{
        type: Object,
        observer:"updateLayout"
      },
      index:{
        type: Number,
        value: 0,
        observer:"updateIndex"
      },
    }
  }
  attached(){
    this.hostElement.setAttribute("role","navigation")
  }
  updateLayout(a){
    const data = this.layout_data;
    this.onChengeData(data.guideItems)
  }
  updateIndex(currentIndex){
    this._items.forEach((el,index)=>{
      el.isSelected = index == currentIndex
      el.setAttribute("aria-selected",String(index == currentIndex))
    })
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
    this.updateIndex(this.index)
  }
  onChengeLayoutData(_,data){
    data&&(this.layout_data = data)
  }
}

Register(App, "app-mini-drower", _template)