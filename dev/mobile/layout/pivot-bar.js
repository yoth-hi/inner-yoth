import {
  Element,
  html,
  register
} from "../components/element.js"
import { pushState, on } from "../components/navegete.js"
class App extends Element {
  constructor() {
    super();
    this.hasAttribute("rule") || this.setAttribute("rule", "tablist")
    this._index = 0
    this._lists = [{
      title: "Home",
      href:"/",
      icon:"HOME"
    },
      {
        title: "Reels",
        href:"/reels/",
        icon:"REELS"
      },
      {
        title: "Trending",
        href:"/feed/trending",
        icon:"TRENDING"
      },
      {
        title: "Followrs",
        href:"#",
        icon:""
      },
      {
        title: "Libary",
        href:"/feed/libary",
        icon:""
      },
      ];
    on(this._onChangePage.bind(this))
  }
  static properties = {
    _lists: {
      type: Array,
      attribute: false
    },
    _index: {
      type: Number,
      attribute: false
    },
  };
  _onChangePage(a,b){
    let n = 0;
    const h = this._lists.find((c,j)=>(T(c.href,a.pathname)&&((n = j),true)))
    if(h){
      this._index = n
    }
  }
  render() {
    return html`
    ${this._lists.map((data, i) => html`
      <app-pivot-bar-item ._isSelected="${this._index === i}" .data="${data}"></app-pivot-bar-item>
      `)}
    `;
  }
}

class List extends Element {
  constructor() {
    super();
  }

  static properties = {
    data: {
      type: Object,
      attribute: true
    } ,
    _isSelected: {
      type: String,
      attribute: true
    }
  };

  render() {
    return html`
    <div role="tab" @click="${this._onClick}" class="pivot-bar-item-tab" aria-selected="${this._isSelected?"true":"false"}">
      <span>
        <span data-type-selected>
          <app-icon icon="${("SELECTED_"+this.data?.icon)}"></app-icon>
        </span>
        <span data-type-no-selected>
          <app-icon icon="${this.data?.icon}"></app-icon>
        </span>
      </span>
      <span class="pivot-bar-item-tab-text">${this.data.title}</span>
    </div>
    `;
  }
  _onClick(_){
    pushState(this.data?.href, this.data?.title)
  }
}

register(App, "app-pivot-bar")
register(List, "app-pivot-bar-item")
function T(a,b){
 return a.replace(/^\//,"") == b.replace(/^\//,"")
}