import { SrcManagerMediaSource } from "../utils/SrcManagerMediaSource.js"

export const ManagerMedia = class ManagerMedia {
    constructor() {}
    _activate(data) {
        const src = data && data._resource;
        if (!this._getSrc() || src) {
            if (src && src !== this._getSrc()) {
                this._setSrc(src);
                !window.MediaSource &&
                    window.ManagedMediaSource &&
                    this._setDisableRemotePlayback(
                        !(null == data || !data._loaded)
                    );
                data && (data._loaded || this._load());
            }
        }
    }
    _start() {
        const mediaSource = window.MediaSource
            ? new SrcManagerMediaSource(this, new window.MediaSource(), false)
            : window.ManagedMediaSource
            ? new SrcManagerMediaSource(this, new window.ManagedMediaSource(), false)
            : window.WebKitMediaSource
            ? new SrcManagerMediaSource(this, new window.WebKitMediaSource(), false)
            : new SrcManagerMediaSource(this, void 0, false);
        this._activate(mediaSource._src);
        this._mediaSource = mediaSource;
        return mediaSource;
    }
    _getResource() {
        return this._resource;
    }
    _playVideo(){
      const aw = this._play();
      return aw;
    }
    _pauseVideo(){
      this._pause();
    }
};
