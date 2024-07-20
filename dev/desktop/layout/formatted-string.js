import {
  Register,
  html
} from "../components/DOM.js"
const _template = html``


class App {
  constructor() {}
  attached() {}
  static get properties() {
    return {
      "text": {
        type: Object,
        "observer":'_onChengeText'
      },
      "isDarkTheme": {
        "reflectToAttribute": true,
        type: Boolean
      },
      "ariaLabel": {
        "reflectToAttribute": true,
        "computed": "computeAriaLabel_(text.accessibility.accessibilityData.label)",
        "readOnly": true
      },
      "isEmpty": {
        "reflectToAttribute": true
      },
      "emojiSize": {
        "value": 16
      }
    }
  }
  _onChengeText(text){
    for(;this.hostElement.childNodes.length;){
      this.hostElement.childNodes[0].remove()
    }
    const listText = text.runs || [];
    for(const item of listText){
      const element = document.createElement("span");
      element.textContent = item.text
      if(item.bold){
        element.classList.add("bold")
      }
      this.hostElement.appendChild(element)
    }
  }
  computeAriaLabel_(text){
    return text
  }
}

Register(App, "app-formatted-string", _template)