import fetch from "../components/fetch.js"
import { getValue } from "../components/data.config.js"
import { debounce } from "../components/utils.js"
class sugestionBox {
  _items = [];
  constructor(parent, host, data){
    this.value_  =""
    this.parent = parent;
    //this.data_ = data;
    this.subparent = document.createElement("ul")
    this.subparent.setAttribute("role","listbox")
    this.subparent.setAttribute("id","suggestions-box")
    this.host = host;
    this.hei = 56;
    this._onResize()
    this._preRender([]).catch(()=>0)
    this.call = debounce(value => {
      this._preRender(value.split(" ").map((a)=>[a,a])).catch(()=>0)
    },64)
    this.parent.appendChild(this.subparent)
  }
  onChengeInput(value, input){
    this.value_ = value
    const is = !!this.value_.trim()
    this.call(value)
    input.setAttribute("aria-expanded",String(is))
    input.setAttribute("aria-autocomplete",String(is?"list":"off"))
    if(is){
      input.setAttribute("aria-controls","suggestions-box")
    } else input.removeAttribute("aria-controls")
    this._onResize()
  }
  async _preRender(arr){
    const v = this.value_.trim()
    if(this.y === v){
      return
    }
    if (v.length < 1) {
      this.parent.style.display = "none"
      this._renderItems([])
    }else {
      this._controller?.abort();
      this._controller = new AbortController();
      const { signal } = this._controller
      const h = await new fetch("/v1/sugestions?q="+encodeURIComponent(v)+"&hl="+getValue("HL","en"),{
        signal
      })
      this.parent.style.display = "block"
      this._controller = null;
      this._renderItems(h);
      if(h.length < 1){
        this.parent.style.display = "none"
      }
      
    }
    this.y = v
  }
  _onResize(){
    const host = this.host.hostElement
    this.parent.style.top = `${this.hei}px`
    this.parent.style.left = `${host.offsetLeft}px`
    this.parent.style.width = `${host.offsetWidth}px`
  }
  _renderItems(data){
    if(data.length > 26){
      return;
    }
    let i = 0;
    for(const [text, href] of data){
      const element = this._items[i] || this.createElement()
      element.hide()
      element.setId(`suggestions-${i}`)
      i++
      element.updateText(text)
      element.setHref(href)
      element.show()
    }
    for(let t = i; t < this._items.length;t++){
      const d = this._items[t]
      d?.hide()
    }
  }
  createElement(){
    let href = ""
    const element = document.createElement("li")
    element.className = "sugestion-text-box"
    element.setAttribute("role","option")
    const text = document.createElement("span");
    text.setAttribute("role","text")
    this.subparent.appendChild(element)
  
     this.host.listen(element,"click",()=>{
        this.host.onSubmit(href)
  })
    element.appendChild(text)
    const t = {
      updateText(v){
        text.innerText= v
      },
      hide(){
        element.style.display = "none"
      },
      show(){
        element.style.display = ""
      },
      setId(id){
        element.id = id??""
      },
      element,
      setHref(A){
        href = A??""
      }
    };
    this._items.push(t)
    return t
  }
}
export default function(parent, scope){
  scope._sugestionBox ??= new sugestionBox(parent, scope);
  
}