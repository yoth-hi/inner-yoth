import {
  Register,
  html
} from "../components/DOM.js"
const _template = html`<div id="content"></div>`
import"./watch.js"
import { get as storeGet } from "../components/config.store.js"
const getPage = function(arr, is){
  let element = arr.get(is)
  let name;
  if(!element){
    switch(is){
      case "WATCH":
        name = "app-watch"
        break;
      case "HOME":
        name = "app-home"
        break;
    }
    element = document.createElement(name);
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
      
    this.renderPage("WATCH")
    //},1000)
    //this._content = this.querySelector("#content");
  }
  renderPage(pageId) {
    if (
      pageId == "WATCH"
    ) {
      this.setPage(pageId)
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