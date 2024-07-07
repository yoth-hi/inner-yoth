import { Register, html } from "../components/DOM.js"
const _template = html``


class App {
  _items = [];
  constructor(){
    
  }
  attached(){
    
  }
  static get properties() {
    return {
      data: {
        type: Object,
        value: [
          {},{},{},{},{},
          {},{},{},{},{},
        ],
        observer:"onChengeData"
      },
    }
  }
  onChengeData(data){
    for(;data.length < this._items;){
      this._items.pop().remove();
    }
    const list = [];
    data.forEach((data,index)=>{
      const element = this._items[index] || document.createElement("app-card-video-column");
      this.hostElement.appendChild(element)
      list.push(()=>{
        element.isShow = true
      })
    })
    ;(function r(){
      list.shift()()
      if(list.length){
        setTimeout(r,40)
      }
    })()
  }
}

Register(App, "list-card-video-column", _template)