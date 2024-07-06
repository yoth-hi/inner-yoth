import {
  Element,
  html,
  register
} from "../components/element.js"
const Size = 360
class Ug{
  constructor(sc,n){
    this._name= n
    this._scope = sc
    this._start()
  }
  _updateColumn(c){
    c = c < 1 ? 1 : c
    this._scope.style.setProperty(this._name+"-column",String(c))
    this._scope.style.setProperty(this._name+"-max-width",String(Size*c)+"px")
  }
  _start(){
    let call ;
    const resizeObserver = new ResizeObserver( call = ()=>{
      if(this._scope.isActive){
        let w = this._scope.offsetWidth
        w = w < 6 ? 6 : w;
        this._updateColumn(parseInt(w/Size))
      }
    });
    resizeObserver.observe(this._scope)
    window.addEventListener("resize", call)
  }
}
class App extends Element {
  constructor() {
    super()
  }
  firstUpdated(){
    this._controller = new Ug(this, "--app-home-grid")
  }
  static properties = {
    data: {
      type: Object,
      attribute: false
    },
  };
  render() {
    return html`
    <div class="content-home">
      <ul>
        <div class="content-home-grid">${this.data?.content?.results?.map(data_=>html`<app-card-video .data="${data_}"></app-card-video>`)}</div>
      </ul>
      <app-spiner>
      </app-spiner>
    </div>
    `
  }
}
register(App, "app-home")