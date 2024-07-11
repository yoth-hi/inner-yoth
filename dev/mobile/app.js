import { setProps, Dom } from "./components/DOM.js"

class App extends Dom {
  onChengeResponce(response){
    debugger
  }
}
setProps(App, "response", "onChengeResponce")
console.log(App)