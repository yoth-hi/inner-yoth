import { Element  ,html,register } from "../components/element.js"
class App extends Element {
  constructor(){
    super()
  }
  render(){
    return html`
      <app-icon></app-icon>
    `
  }
}
register(App,"app-icon-button")