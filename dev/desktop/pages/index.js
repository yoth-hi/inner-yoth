import {
  Register,
  html
} from "../components/DOM.js"
const _template = html`<div id="content"></div>`
import"./watch.js"
import"./home.js"
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
  constructor() {}
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
    if (
      pageId == "WATCH"
    ) {
      this.setPage(pageId)
    } else {
      //(data) =>{ on load data
      this.setPage(pageId)
      //}
    }
    if(!this.isStart){
      this.currentPage.data = this.data 
      this.isStart = false
    }
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