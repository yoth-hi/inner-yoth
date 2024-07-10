import {
  Renge
} from "../streaming/index.js"
const VP = function(a) {
  if (!a)return new Renge(0, 0); var b = Number(a.start); a = Number(a.end); if (!isNaN(b)&&!isNaN(a) && (b = new Renge(b, a), b._length > 0))return b
};

const tXa = function(a, b) {
  if (b.length === 0)return null;
  // uS(a,"html5_enable_cobalt_experimental_vp9_decoder")&&(zUa=!0);
  var c = a.qe;
  var d = a.lengthSeconds,
  e = a.isLivePlayback,
  f = a.le,
  h = a.Da,
  l = iUa(b);
  console.log(l)
  /*
  if (e || f) {
    h = new sQ("", h.experiments, !0); h.B=!f; h.hc=!0; h.isManifestless=!0; h.isLive=!f; h.le = f; b = g.v(b); for (d = b.next(); !d.done; d = b.next()) {
      var m = d.value; d = tQ(m, c); e = gP(m); e = uQ(e.fE || m.url || "", e.wH, e.s); (l = e.get("id")) && l.includes("%7E") && (h.ra=!0); l = Number(m.targetDurationSec || 5); m = Number(m.maxDvrDurationSec || 14400);
      var n = Number(e.get("mindsq") || e.get("min_sq") || "0"),
      p = Number(e.get("maxdsq") || e.get("max_sq") || "0") || Infinity; h.df = h.df || n; h.Ji = h.Ji || p; var q=!VJ(d.mimeType); e && rQ(h, new jQ(e, d, {
        Oj: l, Fn: q, wr: m, df: n, Ji: p, eB: 300, le: f
      }))}c = h
  } else if (l === "FORMAT_STREAM_TYPE_OTF") {
    d = d === void 0?0: d; f = new sQ("", h.experiments, !1); f.duration = d || 0; h = g.v(b); for (b = h.next(); !b.done; b = h.next())b = b.value,
    d = tQ(b, c, f.duration),
    e = gP(b),
    (e = uQ(e.fE || b.url || "", e.wH, e.s)) && (d.streamType === "FORMAT_STREAM_TYPE_OTF"?rQ(f, new kQ(e, d, "sq/0")):
      rQ(f, new pQ(e, d, VP(b.initRange), VP(b.indexRange)))); f.isOtf=!0; c = f
  } else {*/
  f = new sQ("", h?.experiments, !1)
  d = d ?? 0
  f.duration = d || 0;
  /*
    h = g.v(b);
    for (b = h.next(); !b.done; b = h.next())l = b.value,
    b = tQ(l, c, f.duration),
    d = VP(l.initRange),
    e = VP(l.indexRange),
    m = gP(l),
    (l = uQ(m.fE || l.url || "", m.wH, m.s)) && rQ(f, new pQ(l, b, d, e));
    */
  for (const item of b) {
    const indexRange = VP(item.indexRange);
    const initRange = VP(item.initRange);
    console.log(initRange, indexRange)

  }
  c = f
  /*}
  f = a.isLivePlayback&&!a.le&&!a.Ya&&!a.isPremiere;
  a.L("html5_live_head_playable") && (!wS(a) && f && a.ma("missingLiveHeadPlayable", {}), a.Da.qa === "yt" && (c.bb=!0));
  c.Wa = xS(a);
  */
  return c
};
const at = Array.prototype.some?function(a, b) {
  return Array.prototype.some.call(a, b, void 0)}:function(a, b) {
  for (var c = a.length, d = typeof a === "string"?a.split(""): a, e = 0; e < c; e++)if (e in d && b.call(void 0, d[e], e, a))return!0;
  return!1
};
const iUa = function(a) {
  return at(a, function(b) {
    return"FORMAT_STREAM_TYPE_OTF" === b.type
  })?"FORMAT_STREAM_TYPE_OTF": "FORMAT_STREAM_TYPE_UNKNOWN"
};
export const ConstructorObjectData = function (scopeData, data = {}) {
  const store = scopeData.__store ?? {};
  const {
    response = store
  } = data;
  const {
    videoDetails,
    streamingData,
    playbackTracking
  } = response;

  const formats = streamingData?.adaptiveFormats || []
  if (formats.length > 0) {
    var Si = tXa(videoDetails, formats);
    console.log(Si)
  }
  if (playbackTracking) {
    const timewatched = [];
    const timewatched_ = playbackTracking.timewatched||[]
    const max = Math.max(...timewatched_)
    for(const item of timewatched_){
      timewatched.push(Math.max(item/max,.01))
    }
    scopeData.timewatched = timewatched;
  }
  if (videoDetails) {
    if (videoDetails.title) {
      store.title = videoDetails.title;
      scopeData.title = videoDetails.title;
    }
    if (videoDetails.lengthSeconds) {
      store.lengthSeconds = videoDetails.lengthSeconds;
      scopeData.lengthSeconds = Number(videoDetails.lengthSeconds);
    }
    if (videoDetails.author) {
      store.author = videoDetails.author;
      scopeData.author = videoDetails.author;
    }
    if (videoDetails.videoId) {
      store.videoId = videoDetails.videoId;
      scopeData.videoId = videoDetails.videoId;
    }
    if (null !== videoDetails.isPrivate) {
      scopeData.isPrivate = videoDetails.isPrivate;
    }
    if (null !== videoDetails.isLive) {
      scopeData.isLivePlayback = !!videoDetails.isLive;
    }
  }
  scopeData._playerResponse = response;
  return (scopeData.__store = store);
};

class sQ {
  duration=0;
  isLive=false;
  _status=0;
  isLiveHeadPlayable=false;
  _endTime=false;
  constructor(url = "", isLivePlayback = false) {
    this.sourceUrl = url
    this.isLivePlayback = isLivePlayback;
  }
  isLoading(){return this._state===1};
}