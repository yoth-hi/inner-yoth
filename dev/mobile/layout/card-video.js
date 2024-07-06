import {
Element,
html,
register
} from "../components/element.js"
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
  return html`
  <li class="ClipCardV2_list_item__BUsI8 ClipCardV2_in_home_chipcloud__wh0rI ClipCardV2_column5__EMBmN">
    <a class="ClipCardV2_link_thumbnail__NWYf1" data-nlog-area="chip.video" data-nlog-code="Mnavertv.home" data-nlog-gdid-send="category" @click="${this._onClickLink("/watch?v=56373481")}" href="/watch?v=56373481">
      <div class="card-video-preview-area">
        <span style="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: absolute; inset: 0px;">
          <img alt="${this.data?.accessibility?.label}" src="https://phinf.pstatic.net/tvcast/20240623_215/Pedtd_1719149195989Syvfz_JPEG/20240623_221603_444_1.jpg?type=now720" decoding="async" data-nimg="fill" style="background-image: url(&quot;https://phinf.pstatic.net/tvcast/20240201_160/IvphT_1706779482293Jj6jn_PNG/1706779482286.png?type=now480&quot;); background-size: cover; background-repeat: no-repeat; position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%;">
          <noscript></noscript>
        </span>
        <div class="ClipCardV2_badge_area__xbzT3"></div>
        <span class="card-video-playtime">${this.data?.thumbnailOverlays?.text}</span>
      </div>
    </a>
    <div class="card-video-details">
      <div class="card-video-channel-emblem">
        <a class="card-video-link-emblem" data-nlog-area="chip.chhome" data-nlog-code="Mnavertv.home" data-nlog-gdid-send="category" @click="${this._onClickLink("/jtbc.missnightandday")}" href="/jtbc.missnightandday"><span style="box-sizing: border-box; display: inline-block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative; max-width: 100%;"><span style="box-sizing: border-box; display: block; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; max-width: 100%;"><img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2734%27%20height=%2734%27/%3e" style="display: block; max-width: 100%; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px;"></span><img alt="낮과 밤이 다른 그녀 로고" src="https://phinf.pstatic.net/tvcast/20240516_129/r0iu7_1715822248664LwOxN_PNG/20240516_101424_276.png?type=round_64_64" decoding="async" data-nimg="intrinsic" style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%;"><noscript></noscript></span></a>
      </div>
      <div class="card-video-text-details">
        <div class="card-video-title-area">
          <a class="card-video-link-text" data-nlog-area="chip.video" data-nlog-code="Mnavertv.home" data-nlog-gdid-send="category" href="/watch?v=56373481" @click="${this._onClickLink("/watch?v=56373481")} "aria-label="${this.data?.accessibility?.label}">${this.data?.title}</a>
          <div class="card-video-option">
            <a href="#" role="button" aria-expanded="false" class="card-video-button-option _nlog" data-nlog-area="chip.morebtn" data-nlog-code="Mnavertv.home" data-nlog-gdid-send="category"><svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" width="15" height="15"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM7.5 15a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" fill="currentColor"></path></svg><span class="blind">옵션 더보기</span></a>
          </div>
        </div>
        <div class="card-video-sub-details">
          <span class="card-video-item6"><a class="card-video-link-channel-text" data-nlog-area="chip.chhome" data-nlog-code="Mnavertv.home" data-nlog-gdid-send="category" href="/jtbc.missnightandday"><span class="blind">채널</span>낮과 밤이 다른 그녀</a></span><span class="card-video-item6"><span class="card-video-icon-play"><svg viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" width="9" height="12"><path d="M1 10.4V1.6A.8.8 0 0 1 2.28.96l5.867 4.4a.8.8 0 0 1 0 1.28l-5.867 4.4A.8.8 0 0 1 1 10.4Z" stroke="currentColor"></path></svg><span class="blind">재생수</span></span><span class="ClipCardV2_text__hR1bT">${this.data?.viewCount?.text}</span></span><span class="card-video-item6"><span class="blind">등록일</span>12시간 전</span>
        </div>
      </div>
    </div>
  </li>
  `
  }
}
register(App, "app-card-video")