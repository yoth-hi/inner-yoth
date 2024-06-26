import { ManagerMedia } from "../controllers/media.js";

export class Media extends ManagerMedia {
    _events = {};
    _controller = void 0;
    constructor(el) {
        super();
        this._element = el;
    }
    _getElement() {
        return this._element;
    }
    _getSrc() {
        return this._element.src;
    }
    _getDuration() {
        return this._element.duration;
    }
    _getCurrentTime() {
        return this._element.currentTime;
    }
    _setSrc(src) {
        this._element.src = src;
    }
    _setMuted(Val) {
        this._element.muted = Val;
    }
    _load() {
        return this._element.load();
    }
    _setDisableRemotePlayback(val) {
        this._element.disableRemotePlayback = val;
    }
    _getPlaybackRate() {
        try {
            return 0 <= this._element.playbackRate
                ? this._element.playbackRate
                : 1;
        } catch (a) {
            return 1;
        }
    }
    _setPlaybackRate(val) {
        if (this._getPlaybackRate() !== val) {
            this._element.playbackRate = val;
        }
    }
    _addEventListener(key, callback) {
        this._element.addEventListener(key, callback);
    }
    _getBuffered() {
        try {
            var a = this._element.buffered;
        } catch (b) {}
        return a || rL([], []);
    }
    _play() {
        return this._element.play()?.catch(() => {});
    }
    _pause() {
       this._element.pause()
    }
    _isPaused(){
      return this._element.paused
    }
}
const rL = function (a, b) {
    return {
        start: function (c) {
            return a[c];
        },
        end: function (c) {
            return b[c];
        },
        length: a.length
    };
};
