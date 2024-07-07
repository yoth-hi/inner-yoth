import {
  Register,
  html
} from "../components/DOM.js"

const _template = html`
<form id="search-form" on-submit="onSubmit" action="/results">
  <div id="container" on-click="onClick">
    <app-icon is-ecm="true" id="search-icon" icon="[[icon]]" on-mousedown="focusInput" ></app-icon>
    <slot name="search-input"></slot>
    <div id="search-clear-button" on-click="clearSearch" hidden="[[!isClearButtonVisible]]" >X</div>
  </div>
  <slot name="search-container" ></slot>
</form>
<button on-click="onSubmit" id="search-icon-legacy" aria-label$="[[placeholder]]" >
<app-icon icon="[[icon]]" is-ecm="true"></app-icon>  <app-paper-tooltip prefix="" >[[placeholder]]</app-paper-tooltip></button>
`

const to = "/results"
class App {
  constructor() {
    this.inicializeInput()
  }
  attached() {
    const input = document.querySelector("app-masthead input")
    if (input) {
      this.searchInput = input
    }
    this.inicializeInput()
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
      placeholder: {
        type: String,
        observer: "onChengePlaceholder"
      },
      icon: {
        type: String,
        value:"SEARCH"
      },
      focusing: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      isClearButtonVisible: {
        type: Boolean,
        value: false
      },
    }
  }
  onClick(){
    
  }
  onChengeData(data){
    this.placeholder = data?.inputData?.placeholder
  }
  onChengePlaceholder(a){
    const h = () => {
      this.searchInput.placeholder = a
      this.searchInput["aria-label"] = a
    }
    if(a){
      if(this.searchInput)h()
      else {
        setTimeout(()=>(this.inicializeInput(a),this.onChengePlaceholder(a)),0)
      }
    }
  }
  inicializeInput(a) {
    if (!this.hasEvents && this.searchInput) {
      this.searchInput.removeAttribute("hidden")
      this.listen(this.searchInput, "keyup", "onChengeInput")
      this.listen(this.searchInput, "focus", ()=>(this.focusing=true))
      this.listen(this.searchInput, "blur", ()=>(this.focusing=false))
      this.hasEvents = true
    } else {
      setTimeout(()=>this.inicializeInput(a),10)
    }
  }
  focusInput(a) {
    a?.preventDefault();
    this.searchInput.focus()
  }
  onChengeInput() {
    if (this.searchInput)this.hasInput = this.isClearButtonVisible = this.searchInput.value !== ""
  }
  clearSearch(a) {
    a.preventDefault();;
    this.searchInput.value = "";
    this.hasInput = this.isClearButtonVisible=!1;
    this.focusInput()
  };
  onSubmit(a){
    a.preventDefault();
    this.searchInput.blur()
    if(!this.hasInput)return;
    const url = to + "?search_query=" + encodeURIComponent(this.searchInput.value).replace(/%20/g,"+")
    this.hundlePagePush(to)
  }
}

Register(App, "app-search", _template)