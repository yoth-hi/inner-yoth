import {
  Element,
  html,
  register
} from "../components/element.js"
import {
  pushState,
  on
} from "../components/navegete.js"
import {
  getIdPage,
  getPageElement
} from "./__config.js"

import"./home.js"
import"./watch.js"
class App extends Element {
  constructor() {
    super()
    this._stoteElement = new Map;
    this._currentPage = void 0;
  }
  static properties = {
    pageId: {
      type: String,
      attribute: false
    },
    data: {
      type: Object,
      attribute: false
    },
  };
  firstUpdated() {
    this._container = this.$$("#container");
  }
  render() {
    return html`<div id="container"></div>`
  }
  _appendPage(child) {
    const parent = this._container || this;
    parent.appendChild(child)
  }
  _onChengeData(data) {
    if(this._currentPage){
      this._currentPage.data = data
      this.isLoaded = true;
    } else {
      data && setTimeout(this._onChengeData.apply(this, arguments), 5)
    }
    
  }
  static observers = ["_onChengePage(pageId)","_onChengeData(data)"]
  _onChengePage(id) {
    if (id) {
      const element = getPageElement(this, id)
      this._preparePage(element)
    }
  }
  _preparePage(element) {
    window.scrollTo(0, 0);
    element.removeAttribute("hidden")
    element.isActive = true;
    if (element === this._currentPage) {
      this._currentPage?.removeAttribute("hidden")
      this._currentPage.isActive = true;
    } else {
      if (this._currentPage) {
        this._currentPage.setAttribute("hidden", "")
        this._currentPage.isActive = false;
      }

      this._currentPage = element
      this._appendPage(element)
    }
  }
}
register(App, "app-page-manager")