import{ManagerHistory}from"./components/DOM.js"
import { set as storeSet } from "./components/config.store.js"
import"./layout/index.js"
import"./pages/index.js"
import { Register, html } from "./components/DOM.js"
import{isDark}from"./utils/thame.js"
import{getPagesIdByPath}from"./components/pages.config.js"
import{getController}from"./utils/cookie_simple.js"
const _template = html`
<div>
  <div id="header-contenter">
    <slot name="header"></slot>
  </div>
  <div>
    <app-mini-drower></app-mini-drower>
    <page-manager page-id="{{pageId}}" data="{{data}}" id="page-manager"></page-manager>
  </div>
</div>
`


class App {
  constructor(){
    storeSet("root",this)
    this.listen(window,"popstate","_onChengePage")
    ManagerHistory.onpush(this._onChengePage.bind(this))
  }
  attached(){
    const hasDarkTyped = window.matchMedia("(prefers-color-scheme: dark)")
    if(hasDarkTyped){
      hasDarkTyped.addEventListener?.("change",this.onDeviceThemeChanged.bind(this))
    }
    this.onDeviceThemeChanged()
  }
  static get properties() {
    return {
      data: {
        type: Object
      },
      pageId: String,
      isWatchPage: String,
      response:{
        type:Object,
        observer:"onChengeResponce"
      }
    }
  }
  onChengeResponce({ data, pageId }={}){
    this.data = data;
    this.pageId = pageId;
    const header = document.querySelector("app-masthead");
    header.data = data&&data.header||{};
  }
  onDeviceThemeChanged(){
    const dark = isDark()
    getController().save({ dark })
  }
  _onChengePage(){
    const id = getPagesIdByPath(location.pathname)
    this.pageId = id
  }
}

Register(App, "yo-app", _template)