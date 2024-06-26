//import"./LOG.js";
import Disposable, { CreateDisposeCallback } from "./utils/Disposable.js";
import { CreateDataConfigManager } from "./manager/DataConfig.js";
import { PlayerContextConfigManager } from "./manager/PlayerContextConfig.js";
import { StartPrepareInitialPlayback } from "./utils/Playback_utils.js";
import Template from "./layout/template.js";
import Visibility from "./manager/visibility.js";
import EventMediaElement from "./manager/event.media.js";
import { init as DataManager } from "./manager/dataManager.js";
import { EventTargt } from "./utils/EventTargetCustom.js";
import { init as Chrome } from "./layout/layout/chome.js";
import {
    getEventNameFullScreenChange,
    exitFullscreen,
    getFullScreenElement,
    requestFullscreen
} from "./utils/utils.js";
/* PLAYERS[key: strung ] = Player */
const PLAYERS = {};

export default class Player extends Disposable {
    _mediaElement = null;
    constructor(parent, config, c, d) {
        super();
        this.config = CreateDataConfigManager(config || {});
        const args = this.config.args || {};
        this._visibility = new Visibility();
        this._playerContextConfig = new PlayerContextConfigManager(args);
        this._dataManagerPlayer = DataManager(this);
        this._events = new EventTargt(this);
        CreateDisposeCallback(this, this._playerContextConfig);
        CreateDisposeCallback(this, this._events);
        this._template = new Template(this);
        parent.appendChild(this._template.element);
        this._controller = new EventMediaElement(this);
        CreateDisposeCallback(this, this._template);
        this._chrome = new Chrome(this);
        StartPrepareInitialPlayback(this);
        this._init();
    }
    static create(a, config, c, d) {
        const name = "1";
        if (PLAYERS[name]) {
            try {
                PLAYERS[name].dispose();
            } catch (e) {
                console.error("{dispose}", e);
            }
            delete PLAYERS[name];
        }
        const player = new Player(a, config, c, d);
        player.addOnDisposeCallback(function () {
            delete PLAYERS[name];
            //		h.d0 && h.d0()
        });
        return (PLAYERS[name] = player);
    }
    _getVideoData() {
        return this._dataManagerPlayer;
    }
    _getPlayerConfig() {
        return this._playerContextConfig;
    }
    addEventListener(name, callback) {
        this._events._listen(name, callback);
    }
    _dispatch(name, data) {
        this._events._dispatch(name, data);
    }
    _getTemplate() {
        return this._template;
    }
    _getRootNode() {
        return this._getTemplate().element;
    }
    _init() {
        this._visibility._listen(
            "visibilitychange",
            this._onVisibilityChange.bind(this)
        );
        this._onVisibilityChange();
        let fullNeme;
        if ((fullNeme = getEventNameFullScreenChange(this._getElementFullscreen()))) {
            this._getTemplate()._on(this._getElementFullscreen(),fullNeme, () => {
                this._updateFullscreen();
            });
        }
        this._resize();
        this._onChangePresentingPlayerStateChange(0)
    }
    _initChrome(){
        this._chrome._init();
    }
    _updateFullscreen() {
        const is = getFullScreenElement(false);
        this._setFullscreen(!!is ? 1 : 0);
    }
    _setFullscreen(isFullscreen) {
        this._visibility._setFullscreen(isFullscreen);
    }
    _playVideo() {
        return this._mediaElement._playVideo();
    }
    _getElementFullscreen(){
      return false ? this._getRootNode() : document.documentElement
    }
    _resize(){
      this._template._resize()
    }
    _toggleFullscreen() {
      const element = this._getElementFullscreen()
        this._isFullscreen()
            ? exitFullscreen(element)
            : requestFullscreen(element);
    }
    _isPaused() {
        return this._mediaElement._isPaused();
    }
    _pauseVideo() {
        this._mediaElement._pauseVideo();
    }
    _onChangePresentingPlayerStateChange(a) {
        3 !== this.getPresentingPlayerType() &&
            this._dispatch("presentingplayerstatechange", a);
            this._1 = a
    }
    getPresentingPlayerType() {
        return this._1;
    }
    _isFullscreen() {
        return this._visibility._isFullscreen();
    }
    _onVisibilityChange() {
        const store = (this._store$186 ??= {});
        if (store._isFullscreen !== this._isFullscreen()) {
            if (store._isFullscreen !== null) {
                this._dispatch("fullscreentoggled", this._isFullscreen());
            }
            store._isFullscreen = this._isFullscreen();
        }
    }
}
