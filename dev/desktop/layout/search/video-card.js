import { Register, html } from "../../components/DOM.js"
      // <li class="tag-item">
      //   <a class="ClipHorizontalCardV2_link_tag__M_p6z" data-nlog-area="resultvideo.hashtag" data-nlog-rank="1" data-nlog-code="navertv.search" href="/search?query=%EC%95%84%EC%9D%BC%EB%A6%BF">#아일릿</a>
      // </li>
const _template = html`
<a id="thumbnail-link" on-click="handleLink" href$="/watch?v={{data.videoId}}">
  <div id="thumbnail-preview-area">
    <span style="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: absolute; inset: 0px;">
      <img alt="{{data.title}}" decoding="async" style="background-color:#000;background-size: cover; background-repeat: no-repeat; position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover;">
    </span>
    <app-thumbnail-overlay-time>02:51</app-thumbnail-overlay-time>
  </div>
</a>
<div class="information-area">
  <div class="">
    <a class="link-title" on-click="handleLink" href$="/watch?v={{data.videoId}}">
      <strong class="title">{{data.title}}</strong>
      <p class="text-description">{{data.description}}</p>
    </a>
    <ul class="tag-list"> </ul>
    <div class="">
      <span class="">
        <a class="" href="#">---</a>
      </span>
      <span class="">--</span>
      <span class="">
        <span class=""><svg viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" width="9" height="12"><path d="M1 10.4V1.6A.8.8 0 0 1 2.28.96l5.867 4.4a.8.8 0 0 1 0 1.28l-5.867 4.4A.8.8 0 0 1 1 10.4Z" stroke="currentColor"></path></svg><span class="blind">재생수</span>
      </span>
      <span class="">{{data.viewCount.text}}</span>
    </div>
    <a class="link-channel" on-click="handleLink" href="#">
      <span class="channel-emblem"><span style="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: absolute; inset: 0px;"><img alt="" decoding="async"  style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%;background:#000"><noscript></noscript></span></span>
      <span class="">---</span>
    </a>
  </div>
  <div class="">
    <button type="button" aria-expanded="false" class=""><svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" width="15" height="15"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM7.5 15a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" fill="currentColor"></path></svg><span class="blind">옵션 더보기</span></button>
  </div>
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

Register(App, "app-search-card-video", _template)