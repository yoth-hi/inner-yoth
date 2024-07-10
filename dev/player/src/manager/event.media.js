import { EventTargt } from "../utils/EventTargetCustom.js";
import Streaming from "../streaming/index.js";
import Promise from "../utils/Promise.js";
import WatchTime, { timing } from "./WatchTime.js"
export const VIDEO = "sv";
export const AUDIO = "av";
// sv = video type
// av = audio type
const djh = function (mediaElement) {
    const lengthTotalVideoInMilliseconds =
        (mediaElement._getDuration() || 0) * 1000;
    const bufferArray = new Array(
        Math.ceil(lengthTotalVideoInMilliseconds)
    ).fill(false);
    const buffered = mediaElement._getBuffered();

    for (let i = 0; i < buffered.length; i++) {
        const start = Math.floor(buffered.start(i) * 1000);
        const end = Math.ceil(buffered.end(i) * 1000);
        for (let j = start; j < end; j++) {
            bufferArray[j] = true;
        }
    }
    return bufferArray;
};
let G = 1;
const JG = function (sc) {
    const h = djh(sc._mediaElement);
    const s = sc._mediaElement._getCurrentTime();
    console.log(h[parseInt(s * 1000)]);
    let j = false;
    if (h[parseInt(s * 1000)] && h[parseInt(s * 1000 * G)]) {
        j = true;
    } else if (!sc._isFetched) {
        const { videoTrack, audioTrack } = sc._getCurrentDataPlayer();

        sc._streaming = new Streaming(
            sc,
            [s * 1000, s * 1000 + 1000 * G],
            () => {
                if (audioTrack) {
                    sc._streaming = new Streaming(
                        sc,
                        [parseInt(s * 1000), parseInt(s * 1000 + 1000 * G)],
                        () => {
                            sc._isFetched = false;
                        },
                        audioTrack,
                        AUDIO
                    );
                } else {
                //    sc._isFetched = false;
                }
            },
            videoTrack,
            VIDEO
        );
        sc._isFetched = true;
    }
    return j;
};

const addEventsMedia = function (scope) {
    const events =
        "loadstart loadedmetadata play playing progress pause ended suspend seeking seeked timeupdate durationchange ratechange error waiting resize".split(
            " "
        );
    events.forEach(key => {
        scope._mediaElement._addEventListener(key, function (event) {
            scope._on(event);
        });
    });
    //for (var b =
    //	a.X.Jl && a.mediaElement.Ou() && (a.JB.T(a.mediaElement, "webkitplaybacktargetavailabilitychanged", a.s8, a), a.JB.T(a.mediaElement, "webkitcurrentplaybacktargetiswirelesschanged", a.t8, a))
};
const SourceBufferController = class extends EventTargt {
    _appendWindowStart = 0;
    _timestampOffset = 0;
    _list = []
    constructor(sourceBuffer, elementMedia, id, containerType, e, f) {
        super();
        this._sourceBuffer = sourceBuffer;
        this._containerType = containerType;
        this._elementMedia = elementMedia;
        this._id = id;
        this._on = event => {
            this._dispatch(event.type, this);
        };
        this._listen("error", console.error);
        if (this._sourceBuffer?.addEventListener) {
            this._sourceBuffer.addEventListener("updateend", this._on);
            this._sourceBuffer.addEventListener("error", this._on);
        }
    }
    _appendBuffer(buffer, b, c) {
        // this.PC = !1;
        c && (this.hE = c);
        if (buffer.length) {
            this._sourceBuffer?.appendBuffer
                ? this._sourceBuffer.appendBuffer(buffer)
                : this._sourceBuffer
                ? this._sourceBuffer.append(buffer)
                : this._elementMedia &&
                  this._elementMedia.webkitSourceAppend(this._id, buffer);
        }
    }
    _isUpdating() {
        return this._sourceBuffer?.updating ?? false;
    }
};
export const getIdType = function (a) {
    return 0 <= a.indexOf("/mp4")
        ? 1
        : 0 <= a.indexOf("/webm")
        ? 2
        : 0 <= a.indexOf("/x-flv")
        ? 3
        : 0 <= a.indexOf("/vtt")
        ? 4
        : 0;
};
function loadSource(
    mediaSourceClassObjectController,
    videoTrack,
    audioTrack,
    scope
) {
    const { mimeType } = videoTrack;
    const { _mediaSource } = mediaSourceClassObjectController;
    const videoBuffer = _mediaSource.addSourceBuffer(mimeType);

    mediaSourceClassObjectController._elementMedia &&
        mediaSourceClassObjectController._elementMedia.webkitSourceAddId(
            "0",
            mimeType
        ) /*, a._elementMedia.webkitSourceAddId("1", d)*/;
    const videoBufferController = new SourceBufferController(
        videoBuffer,
        mediaSourceClassObjectController._elementMedia,
        "0",
        getIdType(mimeType),
        videoTrack,
        false
    );
    Hfv(scope, videoBufferController, null, mediaSourceClassObjectController);
    //	d = new SourceBufferController(f, a._elementMedia, "1", getIdType(d), b, !0);
}
const Hfv = function (scope, vdo, ado, mso) {
    scope._videoBufferController = vdo;
    scope._audioBufferController = ado;
    [vdo, ado].forEach(controllerSourceBuffer => {
        if (controllerSourceBuffer) {
            Object.entries(mso._eventsSourceBuffer).forEach(([key, value]) => {
                controllerSourceBuffer._listen(key, value);
            });
        }
    });
};
export function setCallback(scope, call) {
    scope._callback = function () {
        call.apply(this, arguments);
    };
}
export const getStatusMediaSource = function (a) {
    if (a._mediaSource) return a._mediaSource.readyState;
    switch (a._elementMedia.webkitSourceState) {
        case a._elementMedia.SOURCE_OPEN:
            return "open";
        case a._elementMedia.SOURCE_ENDED:
            return "ended";
        default:
            return "closed";
    }
};
const init = function (mediaElement, mediaSourceClassObjectController, scope) {
    if (mediaElement._mediaSource === mediaSourceClassObjectController) {
        var d = mediaElement._getDuration();
        !d && (d = 25200);
        if (mediaSourceClassObjectController) {
            var e = d;
            console.log(
                "Set media source duration to " + e + ", video duration " + d
            );
            e > (mediaSourceClassObjectController._getDuration() || 0) &&
                mediaSourceClassObjectController._setDuration(e);
            //  EBa(b, (d ? d.info.j : a.videoTrack.j).info, (e ? e.info.j : a.audioTrack.j).info, a.policy.nh)
            scope._load();
        }
    }
};
function needsData(videoElement) {
    // Verifica se o vídeo está pronto para rodar
    if (videoElement._readyState() < 2) {
        console.log('O vídeo ainda não está pronto.');
        return;
    }

    const currentTime = videoElement._getCurrentTime();
    const futureTime = currentTime + 5;

    // Verifica se há dados disponíveis na posição de tempo futura
    const buffered = videoElement._getBuffered();
    for (let i = 0; i < buffered.length; i++) {
        if (buffered.start(i) <= futureTime && buffered.end(i) >= futureTime) {
            console.log('Dados disponíveis até', buffered.end(i), 'segundos.');
            return false; // Dados estão disponíveis
        }
    }

    console.log('Faltam dados para o tempo futuro:', futureTime, 'segundos.');
    return true; // Dados estão faltando
}
export default class {
    _loop = false;
    _playbackRate = 1;
    _mediaElement = void 0;
    _startLavelId = 5;
    _requestNumber = 0;
    _store$018 = {};
    _videoData = {};
    _joinBuff = [];
    _controller = new KF(this)
    _timeded = new timing(this)
    _rc = {}
    _mediaTimeToLoad = 0;
    constructor(api) {
      this._controller._callback = this._on276.bind(this)
      this._api=api
    }
    _on276(){
      if(true/**/){
        if(!this.t_||needsData(this._mediaElement)){
          const { videoTrack } = this._getCurrentDataPlayer();
          Streaming(this, videoTrack)
        }
      }
      this.t_ = true
    }
    _getSessionId(){
      return this._api._ID
    }
    _loadedBuffer(arr,t){
      this._appendBuffer(arr,t)
    }
    _setMediaElement(mediaElement) {
        if (mediaElement) {
            this._mediaElement = mediaElement;
            addEventsMedia(this);
            this._mediaElement._play()
            this._mediaElement._controller = this;
            this._mediaElement._setPlaybackRate(this._playbackRate);
            mediaElement._start();
            this._setCallback(mediaElement);
            this._mediaElement._setSrc(this._getCurrentDataPlayer().videoTrack.url)
            this._mediaElement._setMuted(true)
            this._onCheckNeedBuffer();
        }
    }
    _setCallback(mediaElement) {
        const onOpen = mediaSourceClassObjectController => {
            init(mediaElement, mediaSourceClassObjectController, this);
        };
        const mediaSourceClassObjectController = mediaElement._mediaSource;
        "open" === getStatusMediaSource(mediaSourceClassObjectController)
            ? onOpen(mediaSourceClassObjectController)
            : setCallback(mediaSourceClassObjectController, onOpen);
    }
    _createDataBuff(){
      const dataVideo ={
    "itag": 399,
    "url": "https://firebasestorage.googleapis.com/v0/b/yoth-service.appspot.com/o/try%20not%20to%20laugh%20at%20impossible%20memes.mp4?alt=media&token=dff4913c-b36f-4708-ab4b-dc7854457546",
               "mimeType": 'video/webm; codecs="vp9"',
    "bitrate": 1500000,
    "width": 1920,
    "height": 1080,
    "initRange": {
        "start": "0",
        "end": "699"
    },
    "indexRange": {
        "start": "700",
        "end": "3863"
    },
    "lastModified": "1716974939608731",
    "contentLength": "187605009",
    "quality": "hd1080",
    "fps": 60,
    "qualityLabel": "1080p60",
    "projectionType": "RECTANGULAR",
    "averageBitrate": 1163151,
    "colorInfo": {
        "primaries": "COLOR_PRIMARIES_BT709",
        "transferCharacteristics": "COLOR_TRANSFER_CHARACTERISTICS_BT709",
        "matrixCoefficients": "COLOR_MATRIX_COEFFICIENTS_BT709"
    },
    "approxDurationMs": "1290322"
}
      this._videoData.videoTrack ??= new CreateTack(this,dataVideo);
      
      return this._videoData
    }
    _getCurrentDataPlayer() {
      const { videoTrack } = this._createDataBuff()
      return {
          videoTrack
      };
    }
    _load() {
        const mediaSourceClassObjectController =
            this._mediaElement._mediaSource;
        const data = this._getCurrentDataPlayer();
        const video = data.videoTrack;
        loadSource(mediaSourceClassObjectController, video, null, this);
    }
    _appendBuffer(buffer, type) {
        buffer = "object" === typeof buffer ? buffer : [buffer];
        let t;
        switch (type) {
            case "VIDEO":
            case VIDEO:
                t = this._videoBufferController;
                break;
            default:
                t = void 0;
        }
        if (t) {
            Hfu(this, buffer, t);
        }
    }
    _on(a) {
      const d = this._mediaElement
        switch (a.type) {
            case "progress":
            case "suspend":
              this._onCheckNeedBuffer();
            break;
            case "loadstart":
                WatchTime(this)
                break;
            case "loadedmetadata":
                WatchTime(this)
                break;
            case "durationchange":
                //JG(this);
                break;
            case "timeupdate":
                const isIn0Time =
                    this._mediaElement && !this._mediaElement._getCurrentTime();
                //JG(this);
                const h = this._mediaElement._getCurrentTime()
                this._api._dispatch("timeupdate", [h,h/this._mediaElement._getDuration()])
                WatchTime(this)
                if(!this._isSeeking()){
                  this._START_SEEK = this._mediaElement._getCurrentTime()
                }
                this._onCheckNeedBuffer();
                break;
            case "pause":
                this._onChangePresentingPlayerStateChange(1)
              var f=d._getCurrentTime();
                break;
            case "play":
              var f=d._getCurrentTime();
              this._onChangePresentingPlayerStateChange(2)
                break;
            case "resize":
                this._api._resize()
                break;
            case "seeking":
                var f=d._getCurrentTime();
                var j=this._START_SEEK
                if(!this._proms){
                  this._proms = new Promise;
                  this._proms.then((a)=>{
                    this._proms = void 0
                    this._mediaTimeToLoad = a;
                    let st = Math.min(f,j)
                    let ed = Math.max(j,f);
                    (this._store$018["ed"] ??= []).push(ed);
                    (this._store$018["st"] ??= []).push(st)
                  })
                }
                break;
            case "seeked":
                this._proms?.resolve(this._mediaElement._getCurrentTime())
                break;
        }
    }
    _onChangePresentingPlayerStateChange(state){
      this._api._onChangePresentingPlayerStateChange({ state })
    }
    _getDataWatchtime(){
      return this
    }
    _isSeeking(){
      return this._mediaElement._isSeeking()
    }
    _onCheckNeedBuffer(){
      if(this._mediaElement){
        const currentTime = this._mediaElement._getCurrentTime();
        this._mediaTime = currentTime
        
        UE(this, currentTime)
        currentTime > 5 && (this._rc._currentTime = currentTime);
        let t;
        const fx = () => {
          if(this._mediaElement&&!t){
            t = true;
          }
        }
        this._mediaElement._getPlayed().length===0?setTimeout(fx,100):setTimeout(fx,500)
      }
    }
    _getCurrentTime(){
      return 0 
    }
    _getMediaTimeToLoad(){
      return this._mediaTimeToLoad
    }
}
const add = function (scope, buffer, t) {
  
  
    if (t._isUpdating()) {
        return false;
    } else {
      
//const h = scope._joinBuff.shift();
        const h = buffer.shift();
        h && t._appendBuffer(h);
        return true;
    }
};
const Hfu = function (scope, buffer, t) {
    clearInterval(scope.__iiid);
    add(scope, buffer, t) ||
        (scope.__iiid = setInterval(() => {
            return add(scope, buffer, t);
        }),1);
};

function UE(a,currentTime){
  currentTime -= isNaN(a.timestampOffset) ? 0 : a.timestampOffset;
  YF(a._controller)
}
function YF(a){
  //a type KF
  a._isActive() || a._start()
}
class KF{
  _timeoutId = 0;
  _time = 1000;
  _call = this._on.bind(this);
  _callback = void 0;
  _isActive(){
    return this._timeoutId != 0
  }
  _start(){
    this._stop()
    this._timeoutId = setTimeout(this._call,this._time)
  }
  _stop(){
    clearTimeout(this._timeoutId)
    this._timeoutId = 0;
  }
  _on(){
    this._timeoutId = 0;
    this._callback?.()
  }
}

class CreateTack{
  _mbps = 1;
  _bitrate = 0;
  mimeType;
  constructor(scope, data){
    this._data = data;
    this.url = data?.url;
    if(data){
      this._bitrate = (data.bitrate ?? 0);
      this.mimeType = data.mimeType
    }
    scope._api.addEventListener("videodatachange", this._onChengeData);
  }
  _getBitrate(){
    return this._bitrate
  }
  _onChengeData(){
    const data = this._api._getVideoData();
    const config = this._api._getPlayerConfig();
    debugger
  }
}