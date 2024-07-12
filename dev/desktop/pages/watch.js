import {
  Register,
  html
} from "../components/DOM.js"
import {
  get as storeGet
} from "../components/config.store.js"
import {
  getEventNameFullScreenChange,
  getQueryParameter,
  getFullScreenElement
} from "../components/utils.js"
import {
  Load
,
  loadNextPage
}from"../components/loadDataPage.js"
import {
  EVENT_NAME_ON_NAVEGATE_START,
  EVENT_NAME_ON_NAVEGATE_FINISH
} from "../components/vars.js"

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
<div class="skeleton-info">
  <div class="color-skeleton title" hidden="[[data.playerOverlays.videoDetalis.title]]"></div>
</div>
<div id="primaty-information-v2">
<div class="">
<h2 role="text" class="video-information-title">
{{data.playerOverlays.videoDetalis.title}}
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
  <app-card-owner data="{{data.playerOverlays.owner}}"></app-card-owner>
</div>
</div>
<app-description>
</app-description>
<div id="column-mode-content"></div>
<div>...</div>
</div>
</div>
<div id="secondary">
<div id="secondary-content">
<list-card-video-column data="{{data.content.results}}"></list-card-video-column>
</div>
</div>
</div>
</div>
`


const fetchPlayerData = async (videoId) => {
  return await Load({ videoId },"/v1/player")
}
class Watch {
  constructor() {
    this.resizeObserver = new ResizeObserver((entries) => this.resize(entries))
    this.listen(document, getEventNameFullScreenChange(document), ()=> {
      this.fullscreen = !!getFullScreenElement(false)
    })
    this.listen(document, EVENT_NAME_ON_NAVEGATE_FINISH, "onFinishNavegate")
  }
  onFinishNavegate() {
    const id = getQueryParameter(location.href, "v")
    if(this.videoId !== id){
      this.videoId = id
    }
  }
  ready() {
    this.resize()
  }
  attached() {
    this.resizeObserver.observe(this.hostElement)
  }
  detached() {
    this.resizeObserver.observe(this.hostElement)
  }
  static get properties() {
    return {
      isRow: {
        type: Boolean,
        reflectToAttribute: true
      },
      videoId: {
        type: String,
        reflectToAttribute: true,
        observer: "onChengeVideoId"
      },
      fullscreen: {
        type: Boolean,
        reflectToAttribute: true,
      },
      data: {
        type: Object,
        observer: "onChengeData"
      },
      prodata: {
        type: Object,
        observer: "onChengeProData"
      },
      fullPlayerActive: {
        type: Boolean,
        reflectToAttribute: true,
        computed: "computedIsFullMode(fullscreen)",
        observer: "toFullPlayer"
      },
      isStart: Boolean
    }
  }
  async onChengeVideoId(a,k) {
     if(this.isStart){
       return
     };
      if(this.videoId&&this.data?.playerOverlays?.videoId!==this.videoId){
        fetchPlayerData(this.videoId).then(data=>this.updateDataPlayer(data))
    if (
      (/^\/live\//.test(location.pathname) ||
        location.pathname === "/watch") && a
    ) {
      const y = await loadNextPage(a)
      this.can__ = true
      this.data = y
    }
      }
  }
  onChengeData(data) {
    if(this.can__){
      this.can__ = false;
      return
    }
    if (!this.videoId) {
      this.can = false
      this.videoId = data.playerOverlays?.videoId
    }
    if (data.playerOverlays?.videoId == this.videoId) {
      this.prodata = data;
    } else {
      this.videoId = data.playerOverlays?.videoId
      /* fetch data next */
    }

  }
  toFullPlayer(is) {
    const playerFull = this.hostElement.querySelector("#full-player")
    const playerContent = this.hostElement.querySelector("#player--c");
    const playerPrimatry = this.hostElement.querySelector("#column>#primaty");
    if (is) {
      playerFull.appendChild(playerContent)
    } else {
      playerPrimatry.insertBefore(playerContent, playerPrimatry.firstChild)

    }
  }
  computedIsFullMode(full, tha) {
    storeGet
    return full || tha
  }
  resize() {
    const is = this.hostElement.clientWidth < 800
    if (this.isRow == is) {
      return;
    }
    const column = this.hostElement.querySelector("#column-mode-content");
    const left = this.hostElement.querySelector("#secondary-content");
    const secondary = this.hostElement.querySelector("#secondary");
    if (left && secondary && column) {
      if (is) {
        column.appendChild(left)
      } else {
        secondary.appendChild(left)
      }
      this.isRow = is
    }
  }
  getPlayer(M=this) {
    const _get = ()=> {
      let element = lsd ?? (lsd = document.querySelector(".html5-video-player"))
      if (!element ) {
        const player = window.player.create(M.hostElement, {}, {});
        lsd = M.hostElement.querySelector(".html5-video-player")
        element = lsd;
      }
      const _player = {
        element
      }
      return element && _player
    }
    return _get()
  }
  updateDataPlayer(data){
    const { element } = this.getPlayer()
    element.updateData(data)
  }
}
let lsd = void 0
Register(Watch, "app-watch", _template)