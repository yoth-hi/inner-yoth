import {
  Element,
  html,
  register
} from "../components/element.js"
import"./slim-video-information-renderer.css"
class App extends Element {
  constructor() {
    super()
  }
  static properties = {
    data: {
      type: Object,
      attribute: false
    },
  }
  render() {
    return html`<div class="slim-video-metadata-header"><div class="slim-video-information-content slim-video-information-empty-badge"><div class="slim-video-information-title-and-badges"><h1 class="slim-video-information-title  slim-video-metadata-title-modern"><span class="yt-core-attributed-string" role="text">${this.data?.title}</span></h1><div class="modern-panel-with-inline-badge-subtitle"><span class="secondary-text"><span class="yt-core-attributed-string" aria-label="2.080.538 visualizações · Transmitido há 2 dias" role="text">2&nbsp;mi de visualizações · Transmitido há 2 dias</span><span class="slim-video-metadata-information-inline-badge"><ytm-standalone-collection-badge-renderer><ytm-badge class="standalone-collection-badge standalone-collection-badge-inline" data-type="STYLE_PLAIN"><span class="yt-core-attributed-string"><a class="yt-core-attributed-string__link yt-core-attributed-string__link--call-to-action-color" tabindex="0" href="/hashtag/ishowspeed" rel="nofollow" target="" force-new-state="true">#ishowspeed</a></span></ytm-badge></ytm-standalone-collection-badge-renderer></span></span><button aria-label="Mostrar mais" class="slim-video-information-show-more"><span role="text">...mais</span></button></div></div></div></div>`
  }
}

register(App, "app-slim-video-information-renderer")