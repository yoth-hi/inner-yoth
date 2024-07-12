import {
  Register,
  html
} from "../components/DOM.js"
import toLoad from "../components/loadDataPage.js"
const _template = html`<div id="content"></div>`
import"./home.js"
import"./watch.js"
import"./search.js"
import { dispatch } from "../components/Event.js"
import { EVENT_NAME_ON_NAVEGATE_START,EVENT_NAME_ON_NAVEGATE_FINISH } from "../components/vars.js"
import { get as storeGet } from "../components/config.store.js"
const getPage = function(arr, is){
  let element = arr.get(is)
  
  let name;
  if(!element){
    switch(is){
      case "WATCH":
        name = "app-watch"
        break;
      case "FEED_HOME":
        name = "app-home"
        break;
     case "SEARCH":
        name = "app-results"
      break;
    }
    element = document.createElement(name);
    if(!element.inst){
      element.innerHTML = "<span>This page is in development</span>"
    }
    arr.set(is, element)
  }
  return element
}

class App {
  currentPage = void 0;
  pages = new Map
  constructor() {
    
  }
  attached() {
    //setTimeout(()=>{
      
    //},1000)
    //this._content = this.querySelector("#content");
  }
  static get properties() {
    return {
      data: {
        type: Object
      },
      pageId: {
        type:String,
        observer:"renderPage"
      }
    }
  }
  renderPage(pageId) {
    if(!pageId)return;
    const hasPageCurrent = !!this.currentPage
    if (
      pageId == "WATCH"
    ) {
      this.setPage(pageId)
      this.currentPage.isStart = hasPageCurrent
      if(!hasPageCurrent && !this.currentPage.data){
        this.currentPage.data = this.data
      }
      this.currentPage.isStart = !hasPageCurrent
      dispatch(document,EVENT_NAME_ON_NAVEGATE_FINISH,void 0)
    } else {
      if(this.is2pg){
        toLoad(pageId,(data) => {
          this.setPage(pageId)
          this.data = data
          this.currentPage.data = this.data 
        })
      } else {
          this.setPage(pageId)
          this.currentPage.data = this.data 
      }
    }
    this.is2pg = true
    storeGet("root").isWatchPage = pageId == "WATCH"
  }
  setPage(a){
    this.setActivePage(getPage(this.pages,a))
  }
  isOnWatch() {
    return (this.currentPage)?.is === "app-watch"
  };
  setActivePage(a) {
    var c = this.isOnWatch(),
    d = this.currentPage;
    if (!a) {} else if (a !== this.currentPage) {
      if (d) {
        d.hidden=!0;
        d.active=!1;
        d.removeAttribute("role")
        
        
      }
      this.currentPage = a;
      a.hidden=!1;
      this.attachPage(a);
      a.active=!0;
      a.setAttribute("role", "main");
    }
    //this.hostElement.removeChild(d)
  }

  attachPage(a) {
    this.hostElement.appendChild(a)
  }
}

Register(App, "page-manager", _template)