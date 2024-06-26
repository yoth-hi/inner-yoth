import { Element  ,html,register } from "../components/element.js"
class App extends Element {
  constructor(){
    super()
  }
  render(){
    return html`
      [T]
    `
  }
}
register(App,"app-icon")