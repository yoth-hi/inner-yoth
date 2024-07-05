import {
  Register,
  html
} from "../components/DOM.js"
import {
  renderList
} from "../components/list.js"
const _template = html`
<div id="items"></div>
`


class App {
  constructor() {
    this._items = []
  }
  ready() {}
  static get properties() {
    return {
      number: {
        type: Number,
        observer: "onChengeData"
      }
    }
  }
  attached() {
    this.hostElement.setAttribute("role", "text")
  }
  onChengeData(number) {
    const w = String(number).length;
    for (let i = 0; i < w; i++) {
      const y = this.createText(i, +String(number)[i]);
    }
    setTimeout(()=> {
      this.onChengeData(number+parseInt(100009*Math.random()))
    }, 2000)
  }
  createText(i, index) {
    const k = this._items[i];
    if (!k) {
      const items = [];
      const parent = document.createElement("span")
      for (let i = 0; i < 10; i++) {
        const f = document.createElement("span")
        f.innerHTML = String(i)
        parent.appendChild(f)
        items.push(f)
      }
      this._items.push({
        parent,
        items,
        index
      })
      this.hostElement.appendChild(parent)
    } else {
      k.parent.style.display = ""
    }
    Gf(
      this._items[i].index, index,
      (index)=> {
        // for (let e = 0; e < 10; e++) {
        //   this._items[i].items[e].style.transform = `scale(${e == index?1: .9})`

        // }
        this._items[i].parent.style.transform = "translateY("+-(index*100)+"%)"
        this._items[i].index = index;
      },
      i)
  }
}
function Gf(t, n, on, k) {
  let af = t;
  let y = () => {
    on(af);
    // if(af > n){
    //   setTimeout(y, k*15)
    // }
    if (af === n) {
      clearInterval(h);
      return;
    }
    af++;
    if (af > 9) {
      af = 0;
    }
  }
  const h = setInterval(y,k * 16);
}
Register(App, "app-text-number", _template)