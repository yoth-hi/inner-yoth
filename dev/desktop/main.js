
/* network control */
import NetControl from "./service/network.controller.js"

/* Logger */
import Logger from "./components/logger/signals.js"

import"./layout/index.js"
import{ManagerHistory}from"./components/DOM.js"
import { set as storeSet } from "./components/config.store.js"
import("./pages/index.js")
import { Register, html } from "./components/DOM.js"
import{isDark}from"./utils/thame.js"
import{getPagesIdByPath}from"./components/pages.config.js"
import{getController}from"./utils/cookie_simple.js"
const _template = html`
<div id="contenter">
  <div id="header-contenter">
    <app-progress>
    </app-progress>
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
    
    this.network = NetControl()
    
    storeSet("root",this)
    this.listen(window,"popstate","_onChengePage")
    ManagerHistory.onpush(this._onChengePage.bind(this))
    
    this.boundOnTouchStart = this.onTouchStart.bind(this)
    
  }
  attached(){
    
    /* create miniplayer component */
    const miniplayer = document.createElement("app-miniplayer");
    const miniplayerParent = this.hostElement;
    miniplayerParent.insertBefore(miniplayer, miniplayerParent.firstChild)
    
    
    Logger().processSignal("ci")
    
    this.hostElement.addEventListener("touchstart",this.boundOnTouchStart)
    
    const hasDarkTyped = window.matchMedia("(prefers-color-scheme: dark)")
    if(hasDarkTyped){
      hasDarkTyped.addEventListener?.("change",this.onDeviceThemeChanged.bind(this))
    }
    this.onDeviceThemeChanged()
  }
  onTouchStart(){
    
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
    if(this.pageId){
      this.pageId = void 0
    }
    this.pageId = id
  }
  _setIsTransparentHeader(isHeaderTransparent){
    this.hostElement.querySelector("app-masthead").isTransparent = !!isHeaderTransparent
  }
  _setIsVisibleHeader(is){
    is?this.hostElement.removeAttribute('hidden-mastheader'):
    this.hostElement.setAttribute('hidden-mastheader',"")
  }
}

Register(App, "yo-app", _template)