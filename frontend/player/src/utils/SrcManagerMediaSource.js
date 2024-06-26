export const SrcManagerMediaSource = class {
    _callback = void 0;
    constructor(mediaElement, mediaSource) {
        this._mediaElement = mediaElement;
        this._mediaSource = mediaSource;
        this._mediaSource ||
            (this._elementMedia = this._mediaElement._getElement());
        this._src = new Resource(
            this._mediaSource
                ? window.URL.createObjectURL(this._mediaSource)
                : this._elementMedia.webkitMediaSourceURL,
            true
        );
        const resep = this._mediaSource || this._elementMedia;
        addEventList(
            resep,
            ["sourceopen", "webkitsourceopen"],
            this._open,
            this
        );
        addEventList(
            resep,
            ["sourceclose", "webkitsourceclose"],
            this._close,
            this
        );
        this._eventsSourceBuffer = {
            updateend: this._updateend
        };
    }
    _updateend() {
        
        
    }
    _close() {}
    _open() {
        if (this._callback) {
            this._callback(this);
            delete this._callback;
        }
    }
    _getDuration() {
        var a;
        return (
            this._mediaSource?.duration || this._dur
        );
    }
    _setDuration(dur) {
        try {
            this._mediaSource
                ? (this._mediaSource.duration = dur)
                : ((this._dur = dur),
                  this._elementMedia.webkitSourceSetDuration(dur));
        } catch (b) {}
    }
};
export class Resource {
    constructor(src, loaded) {
        this._resource = src;
        this._loaded = loaded ?? false;
        //this.B = !1
    }
}

function addEventList(target, arrayEvent, callback, bind) {
    while (arrayEvent.length) {
        target.addEventListener(arrayEvent.pop(), function () {
            callback.apply(bind ?? this, arguments);
        });
    }
}
