import"./layout/index.js"
import {
  Element,
  html,
  register
} from "./components/element.js"
import { pushState, on } from "./components/navegete.js"
import { getIdPage, getPageElement } from "./pages/__config.js"
class App extends Element {
  constructor() {
    super()
    on(this._onChengePageId.bind(this))
  }
  _isDarkMode() {
    return document.documentElement.hasAttribute("dark")
  }
  static properties = {
    data: {
      type: Object,
      attribute: false
    },
    response: {
      type: Object,
      attribute: false
    },
    pageId: {
      type: String,
      attribute: false
    },
  };
  static observers = [
    "_onChengeResponse(response)",
    "_onChengePageId(response)",
  ]
  _onChengePageId(a){
    const id = a.pageId ?? getIdPage(a.pathname)
    id&&(this.pageId = id)
  }
  _onChengeResponse(response){
    if(response){
      const { data, pageId } = response
      this.data = data
      this.pageId = pageId
    }
  }
  render() {
    return html`
    <div id="content">
      <app-header .data="${this.data?.header}"></app-header>
      <app-page-manager .pageId="${this.pageId}" .data="${this.data}"></app-page-manager>
      <app-pivot-bar .data="${this.data?.navegation}"></app-pivot-bar>
    </div>
    `
  }
}
register(App, "yo-app")