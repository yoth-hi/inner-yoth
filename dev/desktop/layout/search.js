import {
  Register,
  html
} from "../components/DOM.js"

import SugestionBox from "./sugestionBox.js"
import {getI18n} from "../components/data.config.js"
import {NAME_SEARCH_QUERY} from "../components/vars.js"


const _template = html`
<form id="search-form" on-submit="onSubmit" action="/search">
  <div id="container" on-click="onClick">
    <app-icon is-ecm="true" id="search-icon" icon="[[icon]]" on-mousedown="focusInput" ></app-icon>
    <slot name="search-input"></slot>
    <div id="search-clear-button" on-click="clearSearch" hidden="[[!isClearButtonVisible]]"></div>
  </div>
  <div id="sugestion-container" ></div>
</form>
<button on-click="onSubmit" id="search-icon-legacy" aria-label$="[[placeholder]]" >
<app-icon icon="[[icon]]" is-ecm="."></app-icon>
<app-paper-tooltip prefix="" >[[placeholder]]</app-paper-tooltip></button>
`

const to = "/search"
class App {
  constructor() {
    this.onFindSlot()
  }
  ready() {
    const input = document.querySelector("app-masthead input")
    const boxContent = document.querySelector("app-masthead #sugestion-container")
    SugestionBox(boxContent, this)
    if (input) {
      this.searchInput = input
    }
    this.inicializeInput()
  }
  attached(){
    this.hostElement.hasAttribute("role") || this.hostElement.setAttribute("role", "search");
      
  }
  static get properties() {
    return {
      data: {
        observer: "onChengeData",
        type: Object
      },
      hasInput: {
        type: Boolean,
        value: false
      },
      parent: {
        type: HTMLElement
      },
      searchInput: {
        type: HTMLElement
      },
      placeholder: {
        type: String,
        observer: "onChengePlaceholder",
        computed:"onComputedPlaceholder(searchInput)"
      },
      icon: {
        type: String,
        value:"SEARCH"
      },
      focusing: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        observer: "onChengeFocusing"
      },
      isClearButtonVisible: {
        type: Boolean,
        value: false
      },
    }
  }
  onChengeFocusing(isFocusing){
  //  this.parent.isFocusedSearchBar = isFocusing
  }

  onClick(){
    
  }
  onChengeData(data){
   // this.placeholder = data?.inputData?.placeholder
  }
  onChengePlaceholder(a){
  }
  onComputedPlaceholder(a){
    const label = getI18n("SEARCH_PLACEHOLDER");
  //  if(label){
      this.searchInput.placeholder = label
     return this.searchInput["aria-label"] = label
  //  }
  }
  inicializeInput(a) {
    if (!this.hasEvents && this.searchInput) {
      this.searchInput.removeAttribute("hidden")
      this.listen(this.searchInput, "keyup", "onChengeInput")
      this.listen(this.searchInput, "focus", ()=>(this.onChengeInput(),setTimeout(()=>this.focusing=true,16)))
      this.listen(this.searchInput, "blur", ()=>(setTimeout(()=>this.focusing=false,16)))
      this.hasEvents = true
    }
  }
  focusInput(a) {
    a?.preventDefault();
    this.searchInput.focus()
  }
  onChengeInput() {
    this._sugestionBox.onChengeInput(this.searchInput.value,this.searchInput)
    if (this.searchInput)this.hasInput = this.isClearButtonVisible = this.searchInput.value !== ""
  }
  _onResize(){
    this._sugestionBox._onResize()
  }
  clearSearch(a) {
    this._sugestionBox.onChengeInput("",this.searchInput)
    a.preventDefault();;
    this.searchInput.value = "";
    this.hasInput = this.isClearButtonVisible=!1;
    this.focusInput()
  };
  onSubmit(a){
    a.preventDefault?.();
    const V = typeof a == "string" ? a:this.searchInput.value
    if(V!==this.searchInput.value){
      this.searchInput.value = V
    }
    this.searchInput.blur()
    if(!this.hasInput)return;
    const url = to + "?"+NAME_SEARCH_QUERY+"=" + encodeURIComponent(V).replace(/%20/g,"+")
    this.hundlePagePush(url)
  }
  onFindSlot(x){
    const a = 
    x?.querySelector('input')||
    document.querySelector('input')
    if(a){
      this.searchInput = a
      this.inicializeInput(a)
    } else {
      setTimeout((x)=>this.onFindSlot(x),5)
    }
  }
}

Register(App, "app-search", _template)