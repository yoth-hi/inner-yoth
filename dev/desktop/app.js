import"./layout/index.js"
import"./pages/index.js"
import { Register, html } from "./components/DOM.js"
import{isDark}from"./utils/thame.js"
import{getController}from"./utils/cookie_simple.js"
const _template = html`
<div>
  <div id="header-contenter">
    <slot name="header"></slot>
  </div>
  <div>
    <app-mini-drower></app-mini-drower>
    <page-manager id="page-manager"></page-manager>
  </div>
</div>
`


class App {
  constructor(){
    
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
      response:{
        type:Object,
        observer:"onChengeResponce"
      }
    }
  }
  onChengeResponce({ data, pageId }={}){
    this.data = data;
    const header = document.querySelector("app-masthead");
    header.data = data&&data.header||{};
  }
  onDeviceThemeChanged(){
    const dark = isDark()
    getController().save({ dark })
  }
}

Register(App, "yo-app", _template)