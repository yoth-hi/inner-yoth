import XHR from "../controllers/xml.ping.js"
import { getReferrer, getValue } from "../../../desktop/components/data.config.js"
import _URL from "../controllers/URL.js"
const K_ = function(a, b, c, d) {
  var e = a._querys[c]; e || (e = [], a._querys[c] = e); e.push(b.toFixed(3)+":"+d.join(":"))};
export default function(scope) {
  clearInterval(scope._idI288);
  Ma(scope) || (scope._idI288 = setInterval(()=>Ma(scope), 100))
}
  export const timing = class {
    timeStamp = NaN
    mediaTime = 0
    _start = .001
  }
  const is = function(a, b) {
    return b > a.mediaTime + a._start && b < a.mediaTime + 5
  }
  let t;
  function Ma(scope) {
    const media = scope._mediaElement;
    const b = media
    setTimeout(()=>{
      t = false
    },100)
    if (media &&
      b._getDuration() > 0 &&
      (!b._isPaused() || t) &&
      !b._isSeeking() &&
      !is(scope._timeded, b._getCurrentTime())
    ) {
      MM(scope._getDataWatchtime())
      t = true
      return true
    }
  }
  const watchtime = "/v1/watchtime"
  function MM(scope) {
    const media = scope._mediaElement;
    const url = new _URL(watchtime, UFG(scope))
    const g = media._getCurrentTime()
    if (g > 2) {
      url.set("len", media._getDuration())
      JF(url, media, scope._timeded.mediaTime, scope)

      new XHR( {
        _url: url._getUrl()
      })
    }
  }
  const JF = function(a, c, b, scope) {
    const d = +c._getCurrentTime(c)
    a.set("cmt", d.toFixed(3))
    a.set("sid", scope._getSessionId())
    // K_(a,b,"cmt",[d.toFixed(3)]);
  }
  const UFG = function(scope) {
    const media = scope._mediaElement;
    const store = scope._store$297 ??= {};
    const storePlayer = scope._store$018 ??= {};
    const g = media._getCurrentTime()
    if (
      find(storePlayer, "st", []).length === 0
    ) {
      (storePlayer["st"] ??= []).push(scope._timeded.mediaTime);
      (storePlayer["ed"] ??= []).push(g)
    }
    if (
      find(storePlayer, "st", []).length >
      find(storePlayer, "ed", []).length
    ) {
      (storePlayer["ed"] ??= []).push(g)
    }
    scope._timeded.mediaTime = g
    const q = {};
    Object.assign(q, UF3(scope))
    j(store, "volume", q, [media._getVolume()*100])
    j(store, "st", q, find(storePlayer, "st", []))
    j(store, "ed", q, find(storePlayer, "ed", []))
    j(store, "muted", q, [media._getMuted()?"1": "0"])
    q.referrer = getReferrer()
    q.status = getStatus(media)
    scope._store$018 = {}
    scope._store$297 = {}
    return q
  }
  function j(a, b, c, d, m = []) {
    const af = a[b] ?? d;
    c[b] = [af,
      ...m]
    a[b] = d;
  }
  function find(obj, name, ifIsNull) {
    return obj[name] ??= ifIsNull
  }
  function UF3(scope) {
    const {
      videoId,
      list
    } = scope._api._getVideoData()
    const {
      _hl,
      _hostLanguage,
      _region
    } = scope._api._getPlayerConfig()
    var g = {}
    g["vid"] = videoId
    g["hl"] = _hl
    ggg(g)
    g["cr"] = _region
    list && (g["list"] = list)
    return g
  }
  function ggg(a){
    a["cp"] = getValue("CLEINT_NAME",null)
    a["c"] = "web"
  }
  function getStatus(mediaElement){
    const isPaused = mediaElement._isPaused();
    const isEnded = mediaElement._isEnded();
    return isEnded ? "ended" : (isPaused ? "paused":"playing")
  }