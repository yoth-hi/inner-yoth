import {
  Register,
  html
} from "../components/DOM.js"
const _template = html``


class App {
  _items = [];
  constructor() {}
  attached() {}
  static get properties() {
    return {
      data: {
        type: Object,
        value: void 0,
        observer: "onChengeData"
      },
    }
  }
  onChengeData(data=[]) {
    
    for (; data.length < this._items;) {
      this._items.pop().remove();
    }
    const list = [];
    data.forEach((data, index)=> {
      let h;
      const element = this._items[index] || (
        (h = document.createElement("app-card-video-column")),
        this._items.push(h), h
      );
      this.hostElement.appendChild(element)
      element.data = data
      list.push(()=> {
        element.isShow = true
      })
    }); 
    (function r() {
      const g = list.shift()
      g()
      if (list.length) {
        setTimeout(r, 40)
      }
    })()
  }
}

Register(App, "list-card-video-column", _template)