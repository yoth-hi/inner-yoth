import { Register, html } from "../components/DOM.js"
const _template = html`
<div id="container" aria-label="{{data.accessibility.label}}">
  <div id="thumbnail">
    <a id="thumbnail" on-click="handleLink" aria-hidden="true" tabindex="-1" rel="nofollow" href="/watch?v=test">
      <img alt="" style="width:100%;position: absolute;inset:0;background: #000" src=""/>
      <div id="overlays">
        <app-thumbnail-overlay-time overlay-style="{{data.thumbnailOverlays.style}}">
          <span>
             {{data.thumbnailOverlays.text}}
          </span>
        </app-thumbnail-overlay-time>
      </div>
    </a>
  </div>
  <div class="details">
    <div class="metadata">
      <a rel="nofollow" on-click="handleLink"  href="/watch?v=test">
        <h3 class="metadata-title">
          <span id="video-title" title="{{data.title}}">
            {{data.title}}
          </span>
        </h3>
        <div class="secondary-metadata">
          <div class="channel-name">
            <span id="text" title="Ismeiow" dir="auto" style="text-align: left;">{{data.owner.title}}</span>
            <app-paper-tooltip role="tooltip" tabindex="-1">{{data.owner.title}}</app-paper-tooltip>
          </div>
          <div id="metadata-line">
            <span class="inline-metadata-item">{{data.viewCount.text}}</span>
            <span class="inline-metadata-item"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`


class App {
  constructor(){
    
  }
  attached(){
    this.callback = () => {
      this.isShow = true
    }
  }
  static get properties() {
    return {
      data: {
        type: Object
      },
      callback: {
        type: Function
      },
      isShow: {
        type: Function,
        reflectToAttribute: true
      },
    }
  }
}

Register(App, "app-card-video-column", _template)