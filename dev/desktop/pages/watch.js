import {
  Register,
  html
} from "../components/DOM.js"
import { get as storeGet } from "../components/config.store.js"
import { getEventNameFullScreenChange,getFullScreenElement} from "../components/utils.js"
const _template = html`
<div id="container">
  <div id="full-player">
  </div>
  <div id="column">
    <div id="primaty">
      <div id="player--c">
        <app-player get-player="{{getPlayer}}"></app-player>
      </div>
      <div id="primaty-detalis">
        <div id="primaty-information-v2">
          <div class="">
            <h2 role="text" class="video-information-title">
              [ᴘʟᴀʏʟɪsᴛ] 뉴진스가 말아주는 6월 케이팝 노동요 🚨 | 뉴진스, 아이브 여돌 플레이리스트 kpop playlist
            </h2>
            <div>
              <span class="text-information">
                <app-text-number number="0"></app-text-number>
                <span> • </span>
                <span>Viewers</span>
              </span>
            </div>
          </div>
        </div>
        <div id="primaty-information">
          <div class="">
          
          </div>
        </div>
        <div id="dscription-information">
          Introducing the ultimate web test tool that will revolutionize the way you conduct website evaluations. Our advanced platform utilizes cutting-edge technology to provide comprehensive analysis and reporting features, making it easier than ever to assess the performance and functionality of your website. With customizable testing parameters and real-time results, you can quickly identify areas for improvement and optimize your site for maximum success. Say goodbye to manual testing methods and welcome a new era of web evaluation with our innovative tool
        </div>
        <div id="column-mode-content"></div>
        <div>...</div>
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
    this.listen(document,getEventNameFullScreenChange(document),()=>{
      this.fullscreen = !!getFullScreenElement(false)
    })
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
      fullscreen:{
        type: Boolean,
        reflectToAttribute: true,
      },
      fullPlayerActive:{
        type: Boolean,
        reflectToAttribute: true,
        computed:"computedIsFullMode(fullscreen)",
        observer:"toFullPlayer"
      }
    }
  }
  toFullPlayer(is){
    const playerFull = this.hostElement.querySelector("#full-player")
    const playerContent = this.hostElement.querySelector("#player--c");
    const playerPrimatry = this.hostElement.querySelector("#column>#primaty");
    if(is){
      playerFull.appendChild(playerContent)
    }else {
      playerPrimatry.insertBefore(playerContent,playerPrimatry.firstChild)
      
    }
  }
  computedIsFullMode(full,tha){
    storeGet
    return full||tha
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
  getPlayer(){
    const _get = ()=>{
      const element = lsd ?? (lsd = document.querySelector(".html5-video-player"))
      const _player = {
        element
      }
      return element&&_player
    }
    return _get()
  }
}
let lsd = void 0
Register(Watch, "app-watch", _template)