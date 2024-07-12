import {
  Register,
  html
} from "../components/DOM.js"


const _template = html`
<div class="contenter">
  <button type="button" class="button-close">
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" width="28" height="28">
      <path d="m9.462 9.462 9.075 9.075M18.537 9.462l-9.075 9.075" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
    </svg>
  </button>
</div>
`/*
<div class="ArticleSection_layer_title_wrap__Ag84f">
  <h3 class="ArticleSection_layer_title__yTm2L">영상 정보</h3>
</div>
  <div class="ArticleSection_scroll_wrap__ZaUDW">
    <p>
      <button class="button-seek">00:00<span class="blind">A</span></button> test
      <a href="https://tving.onelink.me/xHqC/1vihef6r" target="_blank" rel="noreferrer" class="button-link">https://tving.onelink.me/xHqC/1vihef6r</a>
    </p>
    <ul class="hashtag-contenter">
      <li class="button-hashtag"><a href="/search?query=%EB%86%80%EC%95%84%EC%A3%BC%EB%8A%94%EC%97%AC%EC%9E%90" class="button-hashtag-link">#놀아주는여자</a></li>
      <li class="button-hashtag"><a href="/search?query=%EB%86%80%EC%95%84%EC%A3%BC%EB%8A%94%EC%97%AC%EC%9E%90%ED%95%98%EC%9D%B4%EB%9D%BC%EC%9D%B4%ED%8A%B8" class="button-hashtag-link">#놀아주는여자하이라이트</a></li>
      <li class="button-hashtag"><a href="/search?query=%EC%97%84%ED%83%9C%EA%B5%AC" class="button-hashtag-link">#엄태구</a></li>
      <li class="button-hashtag"><a href="/search?query=%ED%95%9C%EC%84%A0%ED%99%94" class="button-hashtag-link">#한선화</a></li>
      <li class="button-hashtag"><a href="/search?query=%EA%B6%8C%EC%9C%A8" class="button-hashtag-link">#권율</a></li>
      <li class="button-hashtag"><a href="/search?query=JTBC%EB%86%80%EC%95%84%EC%A3%BC%EB%8A%94%EC%97%AC%EC%9E%90" class="button-hashtag-link">#JTBC놀아주는여자</a></li>
      <li class="button-hashtag"><a href="/search?query=%EB%86%80%EC%95%84%EC%A3%BC%EB%8A%94%EC%97%AC%EC%9E%9010%ED%9A%8C" class="button-hashtag-link">#놀아주는여자10회</a></li>
      <li class="button-hashtag"><a href="/search?query=JTBC%EB%93%9C%EB%9D%BC%EB%A7%88" class="button-hashtag-link">#JTBC드라마</a></li>
      <li class="button-hashtag"><a href="/search?query=%EC%88%98%EB%AA%A9%EB%93%9C%EB%9D%BC%EB%A7%88" class="button-hashtag-link">#수목드라마</a></li>
      <li class="button-hashtag"><a href="/search?query=%ED%8F%89%EC%9D%BC%EB%93%9C%EB%9D%BC%EB%A7%88" class="button-hashtag-link">#평일드라마</a></li>
      <li class="button-hashtag"><a href="/search?query=JTBC%ED%8F%89%EC%9D%BC%EB%93%9C%EB%9D%BC%EB%A7%88" class="button-hashtag-link">#JTBC평일드라마</a></li>
      <li class="button-hashtag"><a href="/search?query=%EC%97%84%ED%83%9C%EA%B5%AC%EB%86%80%EC%95%84%EC%A3%BC%EB%8A%94%EC%97%AC%EC%9E%90" class="button-hashtag-link">#엄태구놀아주는여자</a></li>
      <li class="button-hashtag"><a href="/search?query=%ED%95%9C%EC%84%A0%ED%99%94%EB%86%80%EC%95%84%EC%A3%BC%EB%8A%94%EC%97%AC%EC%9E%90" class="button-hashtag-link">#한선화놀아주는여자</a></li>
      <li class="button-hashtag"><a href="/search?query=%EB%86%80%EC%95%84%EC%A3%BC%EB%8A%94%EC%97%AC%EC%9E%90%EA%B3%B5%EC%8B%9D%EC%98%81%EC%83%81" class="button-hashtag-link">#놀아주는여자공식영상</a></li>
      <li class="button-hashtag"><a href="/search?query=%EB%93%9C%EB%9D%BC%EB%A7%88%ED%95%98%EC%9D%B4%EB%9D%BC%EC%9D%B4%ED%8A%B8" class="button-hashtag-link">#드라마하이라이트</a></li>
      <li class="button-hashtag"><a href="/search?query=%EB%86%80%EC%95%84%EC%A3%BC%EB%8A%94%EC%97%AC%EC%9E%90%EB%9F%AC%EB%B8%8C%EB%9D%BC%EC%9D%B8" class="button-hashtag-link">#놀아주는여자러브라인</a></li>
      <li class="button-hashtag"><a href="/search?query=%EC%97%84%ED%83%9C%EA%B5%AC%ED%95%9C%EC%84%A0%ED%99%94" class="button-hashtag-link">#엄태구한선화</a></li>
      <li class="button-hashtag"><a href="/search?query=%EB%93%9C%EB%9D%BC%EB%A7%88%EB%9F%AC%EB%B8%8C%EB%9D%BC%EC%9D%B8" class="button-hashtag-link">#드라마러브라인</a></li>
    </ul>
  <ul class="ArticleSection_summary_list__SbKno"><li class="button-hashtag"><span class="ArticleSection_title__ScA5X">등록일</span><span>2024.07.11</span></li><li class="button-hashtag"><span class="ArticleSection_title__ScA5X">카테고리</span><span>드라마</span></li><li class="button-hashtag"><span class="ArticleSection_title__ScA5X">영상물 등급</span><span>15세 이상 시청가</span></li><li class="button-hashtag"><span class="ArticleSection_title__ScA5X">방영일</span><span>2024.07.11</span></li><li class="button-hashtag"><span class="ArticleSection_title__ScA5X">회차</span><span>10</span></li></ul></div>
 
 </div>
`
*/
class App {
  constructor() {
    
  }

  ready() {}

  static get properties() {
    return {
      show: {
        type: Boolean,
        reflectToAttribute: true
      },
      progress: {
        type: String,
        observer: "onChengeProgress"
      },
    }
  }
  attached() {
    
  }
}
Register(App, "app-description", _template);