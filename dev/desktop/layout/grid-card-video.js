import {
  Register,
  html
} from "../components/DOM.js"
import {
  renderList
} from "../components/list.js"
const Size = 300
const _template = html`
<div id="items" role="list" >
</div>
`

class App {
  constructor() {}

  ready() {
    
    this._start()
  }

  static get properties() {
    return {
      data: {
        type: Array,
        observer: "onChengeData"
      },
      _scope: {
        type: HTMLElement,
        observer: "_start"
      },
    }
  }
  _updateColumn(c) {
    c = c < 1 ? 1: c
    this.hostElement.style.setProperty("--app-grid-items-per-row", String(c))
    this.hostElement.style.setProperty("--app-max-width", String(Size*c)+"px")
  }
  attached() {

  }
  _start(a) {
    let call;
    const resizeObserver =this._resizeObserver= new ResizeObserver(call = ()=> {
     // if (this._scope.isActive) {
        let w = this._scope.offsetWidth
        w = w < 6 ? 6: w;
        this._updateColumn(parseInt(w/Size))
    //  }
    });
    resizeObserver.observe(this._scope)
    window.addEventListener("resize",
      call)
  }
  onChengeData(data = []) {
    renderList("app-card-video",
      this.$["items"],
      data,
      (a, data, m)=> {
        a.setAttribute("role", "listitem");
        a["data"] = data

      })
  }
}

Register(App, "app-grid-card-video", _template);