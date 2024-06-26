import { Element  ,html,register } from "../components/element.js"
class App extends Element {
  constructor(){
    super()
  }
  render(){
    return html`
      <div class="container">
        <div class="start">
          <h1>
            <span class="text-logo">YOTH TV</span>
          </h1>
        </div>
        <div class="center"></div>
        <div class="end">
          <app-icon-button></app-icon-button>
        </div>
      </div>
    `
  }
}
register(App,"app-header")