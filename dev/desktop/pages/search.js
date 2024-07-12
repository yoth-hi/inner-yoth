import {
  Register,
  html
} from "../components/DOM.js"
import {
  renderList
} from "../components/list.js"



const _template = html`
<div id="contenter">
<ul id="items">

</ul>
</div>
`

class App {

  _acumulateItems = [];
  constructor() {}

  ready() {}

  static get properties() {
    return {
      data: {
        type: Object,
        observer: "onChengeData"
      },
      isActive: {
        type: Boolean
      }
    }
  }

  attached() {}
  renderListItems_(dataArray = []) {
    for(;this._acumulateItems.length;){
      this._acumulateItems.pop().remove()
    }
    renderList(a=> {
      return getIdElement(a.type)
    }, this.$["items"], dataArray, (a, data, m)=> {
      a.setAttribute("role", "tab");
      a["data"] = data

    }, this._acumulateItems)
  }
  onChengeData(data = {}) {
    this.renderListItems_(data.content?.results)
  }
}
Register(App, "app-results", _template);


function getIdElement(type){
  let nodeName;
  switch(type){
    case "CHANNEL_RESULT_SEARCH":
      nodeName = "app-channel-card"
      break;
    case "VIDEO_RESULT_SEARCH":
      nodeName = "app-search-card-video"
      break;
  }
  return nodeName
}