import { Register, html } from "../components/DOM.js"
import { getMainDataFTLayout, target } from "../components/load.page.main.layout.js"
const _template = html`
<div id="container" >
  <div id="start" >
    <app-logo></app-logo>
  </div>
  <div id="center" >
    <app-button-icon on-click="blurSearchBar" is-round="." class="back button-header-commun" icon="HOME" is-ecm=".">
      <app-paper-tooltip>Back</app-paper-tooltip>
    </app-button-icon>
    <app-search parent="{{_hostElement}}" data="{{data.searchBox}}"></app-search>
  </div>
  <div id="end" >
    <app-button-icon on-click="focusSearchBar" is-round="." class="search button-header-commun" icon="SEARCH" is-ecm=".">
      <app-paper-tooltip>{{data.searchBox.inputData.placeholder}}</app-paper-tooltip>
    </app-button-icon>
    end
  </div>
</div>
`


class App {
  constructor(){
    this._ro = new ResizeObserver((a)=>this._onResize(a));
    this.listen(window,"resize","_onResize")
  }
  static get properties() {
    return {
      data: {
        type: Object
      },
      _hostElement: {
        type: HTMLElement
      },
      isMobile: {
        type: Boolean,
        reflectToAttribute: true
      },
      isFocusedSearchBar: {
        type: Boolean,
        reflectToAttribute: true
      },
    }
  }
  blurSearchBar(){
    this.isFocusedSearchBar = false
  }
  ready(){
    getMainDataFTLayout()
  }
  attached(){
    this._hostElement = this.hostElement
    this._ro.observe(this.hostElement)
  }
  detached(){
  //  this._ro.unobserve(this.hostElement)
  }
  _onResize(){
    const width = this.hostElement.offsetWidth
    this.isMobile = width < 600
    this.hostElement.querySelector("app-search")?.inst._onResize()
  }
  focusSearchBar(){
    this.isFocusedSearchBar = true
    const g = this.hostElement.querySelector("app-search input")
    g.focus()
  }
}

Register(App, "app-masthead", _template)
