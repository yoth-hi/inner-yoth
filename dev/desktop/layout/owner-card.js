import { Register, html } from "../components/DOM.js"

const _template = html`
<div class="contenter">
  <app-image data="{{getImageAvatar(data)}}"></app-image>
  <div class="details">
    <div>
      <span class="name" role="text">**NAME</span>
    </div>
    <div class="metadata">
      <app-text-number number="0"></app-text-number>
      <span role="text" class="subtext">Subscrivers</span>
    </div>
  </div>
  <div><!--slot--></div>
</div>
`


class App {
  constructor(){
    
  }
  attached(){
  }
  getImageAvatar(){
    return {
      src:""
    }
  }
}

Register(App, "app-card-owner", _template)