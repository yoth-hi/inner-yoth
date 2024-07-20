import { Register, html } from "../../components/DOM.js"
      // <li class="tag-item">
      //   <a class="ClipHorizontalCardV2_link_tag__M_p6z" data-nlog-area="resultvideo.hashtag" data-nlog-rank="1" data-nlog-code="navertv.search" href="/search?query=%EC%95%84%EC%9D%BC%EB%A6%BF">#아일릿</a>
      // </li>
const _template = html`
<div id="content-section">
  <div id="avatar-section">
    <a class="channel-link" href="/???">
      <div id="avatar" class="">
        <img decoding="async" id="avatar-img" draggable="false" alt="" width="136" height="136">
      </div>
    </a>
  </div>
  <div id="info-section" class="">
    <a class="channel-link" href="???">
      <div id="info" class="">
        <div id="channel-title" wrap-text="" class="">
          <div id="container" class="style-scope ytd-channel-name">
            <div id="text-container" class="style-scope ytd-channel-name">
              <span title="" dir="auto" style="text-align: left;">{{data.name}}</span>
            </div>
          </div>
        </div>
        <app-formatted-string id="description" text="{{data.description}}"></app-formatted-string>
      </div>
    </a>
    <div id="buttons" class="">
      <div id="purchase-button" class="" hidden=""></div>
      <div id="subscribe-button" class="">
        <app-button-renderer data="{{data.action}}">
          <yt-button-shape>
            <a class="yt-spec-button-shape-next yt-spec-button-shape-next--filled yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m" aria-label="Subscribe" title="" href="" target="" force-new-state="true" style=""><div class="yt-spec-button-shape-next__button-text-content"><span class="yt-core-attributed-string yt-core-attributed-string--white-space-no-wrap" role="text">Subscribe</span></div><yt-touch-feedback-shape style="border-radius: inherit;"><div class="yt-spec-touch-feedback-shape yt-spec-touch-feedback-shape--touch-response-inverse" aria-hidden="true"><div class="yt-spec-touch-feedback-shape__stroke" style=""></div><div class="yt-spec-touch-feedback-shape__fill" style=""></div></div></yt-touch-feedback-shape></a></yt-button-shape><tp-yt-paper-tooltip offset="8" disable-upgrade=""></tp-yt-paper-tooltip></app-button-renderer></div></div><div id="channel-memberships-button" class="" hidden=""></div></div>
      </div>
`


class App {
constructor(){

}
attached(){
}
static get properties() {
return {
data: {
type: Object
}
}
}
}

Register(App, "app-channel-card", _template)