import { EventTargt } from "../utils/EventTargetCustom.js";
import Streaming from "../streaming/index.js";
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
const Nab = function (sc) {
    clearInterval(sc._tid);
    JG(sc) ||
        (sc._tid = setInterval(function () {
            return JG(sc);
        }, 100));
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
        // c && (this.hE = c);
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
export default class {
    _loop = false;
    _playbackRate = 1;
    _mediaElement = void 0;
    _startLavelId = 5;
    _requestNumber = 0;
    _joinBuff = [];
    constructor(api) {
      this._api=api
    }
    _setMediaElement(mediaElement) {
        if (mediaElement) {
            this._mediaElement = mediaElement;
            addEventsMedia(this);
            this._mediaElement._controller = this;
            this._mediaElement._setPlaybackRate(this._playbackRate);
            mediaElement._start();
            this._setCallback(mediaElement);
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
    _getCurrentDataPlayer() {
        return {
            videoTrack: {
                itag: 251,
                url: "http://localhost:3000/?",
                mimeType: 'audio/webm; codecs="opus"',
                bitrate: 165862,
                initRange: {
                    start: "0",
                    end: "269"
                },
                indexRange: {
                    start: "270",
                    end: "31392"
                },
                lastModified: "1718424813100834",
                contentLength: "250991283",
                quality: "tiny",
                projectionType: "RECTANGULAR",
                averageBitrate: 115951,
                audioQuality: "AUDIO_QUALITY_MEDIUM",
                approxDurationMs: "17317021",
                audioSampleRate: "48000",
                audioChannels: 2,
                loudnessDb: -2.1700001
            }
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
        buffer = "object" === buffer ? buffer : [buffer];
        let t;
        switch (type) {
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
        switch (a.type) {
            case "loadstart":
                Nab(this);
                break;
            case "loadedmetadata":
                Nab(this);
                break;
            case "durationchange":
                JG(this);

                break;
            case "timeupdate":
                const isIn0Time =
                    this.mediaElement && !this.mediaElement.getCurrentTime();
                JG(this);
                break;
            case "pause":
                this._onChangePresentingPlayerStateChange(1)
                break;
            case "play":
                this._onChangePresentingPlayerStateChange(2)
                break;
            case "resize":
                this._api._resize()
                break;
        }
    }
    _onChangePresentingPlayerStateChange(state){
      this._api._onChangePresentingPlayerStateChange({ state })
    }
}
const add = function (scope, buffer, t) {
    scope._joinBuff.push(...buffer);
    if (t._isUpdating()) {
        return false;
    } else {
        const h = scope._joinBuff.shift();
        h && t._appendBuffer(h);
        return true;
    }
};
const Hfu = function (scope, buffer, t) {
    clearInterval(scope.__iiid);
    add(scope, buffer, t) ||
        (scope.__iiid = setInterval(() => {
            return add(scope, buffer, t);
        }));
};
