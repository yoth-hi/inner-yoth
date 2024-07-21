import { Register, html } from "../components/DOM.js"
import { createModal } from "./Modal.js"
// <app-icon icon="[[icon]]"></app-icon>
const _template = html`
<span id="content">{{text}}</span>
`

function parceUrl(url,obj){
  const list = Object.keys(obj);
  for(const it of list) {
    url = url.replace("{"+it+"}", obj[it])
  }
  return url
}
class App {
  constructor(){
    
  }
  attached(){
  }
  static get properties() {
    return {
      icon: {
        type: String,
        reflectToAttribute: true
      },
      text: {
        type: String
      },
      data: {
        type: Object,
        observer:"onChengeData"
      },
      isRow: {
        type: Object,
        reflectToAttribute: true
      },
      isFull: {
        type: Object,
        reflectToAttribute: true
      },
      isBorder: {
        type: Object,
        reflectToAttribute: true
      },
    }
  }
  onChengeData(a){
    if(a){
      this.icon = a.icon
      this.text = a.title
      if(a.style){
        switch(a.style){
          case "BUTTON_SUBSCRIBE":
            a.isFull = true
          break;
          case "BUTTON_PROFILE":
            a.isFull = false
          break;
        }
        this.hostElement.setAttribute("data-style",a.style)
      }
      this.isRow = !!a.isRow
      this.isFull = !!a.isFull
      this.isBorder = !!a.isBorder;
      if(a.image){
        this.getImg().src = a.image
      }
      this.render_(a.endpoint?"a":"button",a.endpoint)
    }
    
  }
  getImg(){
    const img = this.img ??= document.createElement("img");
    this.hostElement.appendChild(img);
    return img
  }
  _click(){
    if(this._url){
      this.current?.setAttribute("href", this._get());
    } else {
      const host = this.hostElement;

     if(this.data.action?.open){
        createModal(this.data.action,{
          get x(){
            return host.offsetLeft
          },
          get y(){
            return host.offsetTop
          },
        })
     }
    }
  }
  render_(name="button",data={}){
    const g = this.bst ??= {};
    if(!g[name]){
      g[name] = document.createElement(name);
      this.listen(g[name],"click","_click")
    }
    const element = (g[name]);
    this.current = element
    const content = this.hostElement.querySelector("#content");
    this.hostElement.appendChild(element);
    element.appendChild(content);
    this._url = void 0
    if(data.url){
      this._url = data.url
      element.setAttribute("href", this._get());
    }
  }
  _get(){
    return parceUrl(this._url,{ location:encodeURIComponent(location.href) })
  }
}

Register(App, "app-button-customer", _template)