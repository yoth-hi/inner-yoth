import {
  Register,
  html
} from "../components/DOM.js"

const _template = html`
<div id="container">
  <div id="full-player">
  jsjd
  </div>
  <div id="column">
    <div id="primaty">
      <div id="player">
      ff
      </div>
      <div id="primaty-detalis">
        <div id="primaty-information-v2">
          <div class="">
            <h2 role="text" class="video-information-title">
              [ᴘʟᴀʏʟɪsᴛ] 뉴진스가 말아주는 6월 케이팝 노동요 🚨 | 뉴진스, 아이브 여돌 플레이리스트 kpop playlist
            </h2>
          </div>
        </div>
        <div id="primaty-information">
          <div class="">
            <h2 role="text" class="video-information-title">
              [ᴘʟᴀʏʟɪsᴛ] 뉴진스가 말아주는 6월 케이팝 노동요 🚨 | 뉴진스, 아이브 여돌 플레이리스트 kpop playlist
            </h2>
          </div>
        </div>
        <div id="primaty-information">
          <div class="">
            <h2 role="text" class="video-information-title">
              [ᴘʟᴀʏʟɪsᴛ] 뉴진스가 말아주는 6월 케이팝 노동요 🚨 | 뉴진스, 아이브 여돌 플레이리스트 kpop playlist
            </h2>
          </div>
        </div>
        <div id="column-mode-content"></div>
      </div>
    </div>
    <div id="secondary">
      <div id="secondary-content">
        <list-card-video-column></list-card-video-column>
      </div>
    </div>
  </div>
</div>
`



class Watch {
  constructor() {
    this.resizeObserver = new ResizeObserver((entries) => this.resize(entries))
  }
  ready() {
    this.resize()
  }
  attached(){
    this.resizeObserver.observe(this.hostElement)
  }
  detached(){
    this.resizeObserver.observe(this.hostElement)
  }
  static get properties() {
    return {
      isRow:{
        type: Boolean,
        reflectToAttribute: true
      },
      fullPlayerActive:{
        type: Boolean,
        reflectToAttribute: true
      }
    }
  }
  resize(){
    const is = this.hostElement.clientWidth < 800
    if(this.isRow == is){
      return;
    }
    const column = this.hostElement.querySelector("#column-mode-content");
    const left = this.hostElement.querySelector("#secondary-content");
    const secondary = this.hostElement.querySelector("#secondary");
    if(left&&secondary&&column){
      if(is){
        column.appendChild(left)
      }else {
        secondary.appendChild(left)
      }
      this.isRow = is
    }
  }
}

Register(Watch, "app-watch", _template)