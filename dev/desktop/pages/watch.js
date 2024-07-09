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
<app-card-owner></app-card-owner>
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
    this.listen(document, getEventNameFullScreenChange(document), ()=> {
      this.fullscreen = !!getFullScreenElement(false)
    })
    this.listen(document, EVENT_NAME_ON_NAVEGATE_FINISH, "onFinishNavegate")
  }
  onFinishNavegate() {
    const id = getQueryParameter(location.href, "v")
    this.videoId = id
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
      }
    }
  }
  async onChengeVideoId(a) {
    //   if(!this.isStart){return};
    if (
      (/^\/live\//.test(location.pathname) ||
        location.pathname === "/watch") && a
    ) {
      const y = await loadNextPage(a)
      this.data = y
    }
  }
  onChengeData(data) {
    if (!this.videoId) {
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
  getPlayer(M) {
    const _get = ()=> {
      let element = lsd ?? (lsd = document.querySelector(".html5-video-player"))
      if (!element) {
        element = lsd = window.player.create(M.hostElement, {}, {})
      }
      const _player = {
        element
      }
      return element && _player
    }
    return _get()
  }
}
let lsd = void 0
Register(Watch, "app-watch", _template)