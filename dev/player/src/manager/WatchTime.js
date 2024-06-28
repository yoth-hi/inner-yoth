import XHR from "../controllers/xml.ping.js"
import _URL from "../controllers/URL.js"
export default function(scope) {
  clearInterval(scope._idInterval);
  Ma(scope) || (scope._idInterval = setInterval(()=>Ma(scope), 100))
}
  export const timing = class {
    timeStamp = NaN
    mediaTime = 0
    _start = .001
  }
  const is = function(a, b) {
    return b > a.mediaTime + a._start && b < a.mediaTime + 5
  }
  function Ma(scope) {
    const media = scope._mediaElement;
    const b = media
    if (media &&
      b._getDuration() > 0 &&
      !b._isPaused() &&
      !is(scope._timeded, b._getCurrentTime())
    ) {
      MM(scope._getDataWatchtime())
      return true
    }
  }
  const watchtime = "/v1/watchtime"
  function MM(scope) {
    const media = scope._mediaElement;
    const url = new _URL(watchtime)
    url.set("st", scope._timeded.mediaTime)
    const g = media._getCurrentTime()
    if (g > 2) {
      url.set("ed", g)
      scope._timeded.mediaTime = g
      url.set("dur", media._getDuration())
      new XHR( {
        _url: url._getUrl()
      })
    }
  }