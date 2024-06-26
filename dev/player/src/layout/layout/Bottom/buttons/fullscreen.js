import { Dom, Element, appendChildInTemplate } from "../../../../utils/Dom.js";
import { getSwitchIconPlay, Anime } from "../../../icons.js";
import { formatTextWithKey } from "../../../../utils/utils.js";
export default class extends Dom {
    constructor(api) {
        super({
            _tag: "button",
            _classList: ["player-button"],
            _attrs: {
                title: "{{title}}",
                "aria-keyshortcuts": "f",
                "data-title-no-tooltip": "{{data-title-no-tooltip}}"
            },
            _content: "{{icon}}"
        });
        this._api = api;
        this._listen("click", this._onClick);
        this._on(this._api, "fullscreentoggled", this._onFullscreenToggled);
        this._onFullscreenToggled(this._api._isFullscreen());
    }
    _onClick() {
      this._api._toggleFullscreen()
    }
    _onFullscreenToggled(isFullScreean) {
        let icon;
        let title;
        if (isFullScreean) {
            icon = {
                _tag: "svg",
                _attrs: {
                    height: "100%",
                    version: "1.1",
                    viewBox: "0 0 36 36",
                    width: "100%"
                },
                _childs: [
                    {
                        _tag: "g",
                        _className: "app-fullscreen-button-corner-2",
                        _childs: [
                            {
                                _tag: "path",
                                zc: !0,
                                _className: "app-svg-fill",
                                _attrs: {
                                    d: "m 14,14 -4,0 0,2 6,0 0,-6 -2,0 0,4 0,0 z"
                                }
                            }
                        ]
                    },
                    {
                        _tag: "g",
                        _className: "app-fullscreen-button-corner-3",
                        _childs: [
                            {
                                _tag: "path",
                                zc: !0,
                                _className: "app-svg-fill",
                                _attrs: {
                                    d: "m 22,14 0,-4 -2,0 0,6 6,0 0,-2 -4,0 0,0 z"
                                }
                            }
                        ]
                    },
                    {
                        _tag: "g",
                        _className: "app-fullscreen-button-corner-0",
                        _childs: [
                            {
                                _tag: "path",
                                zc: !0,
                                _className: "app-svg-fill",
                                _attrs: {
                                    d: "m 20,26 2,0 0,-4 4,0 0,-2 -6,0 0,6 0,0 z"
                                }
                            }
                        ]
                    },
                    {
                        _tag: "g",
                        _className: "app-fullscreen-button-corner-1",
                        _childs: [
                            {
                                _tag: "path",
                                zc: !0,
                                _className: "app-svg-fill",
                                _attrs: {
                                    d: "m 10,22 4,0 0,4 2,0 0,-6 -6,0 0,2 0,0 z"
                                }
                            }
                        ]
                    }
                ]
            };
            document.activeElement === this.element &&
                this._api._getRootNode().focus();
        } else {
            icon = {
                _tag: "svg",
                _attrs: {
                    height: "100%",
                    version: "1.1",
                    viewBox: "0 0 36 36",
                    width: "100%"
                },
                _childs: [
                    {
                        _tag: "g",
                        _className: "app-fullscreen-button-corner-0",
                        _childs: [
                            {
                                _tag: "path",
                                zc: !0,
                                _className: "app-svg-fill",
                                _attrs: {
                                    d: "m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z"
                                }
                            }
                        ]
                    },
                    {
                        _tag: "g",
                        _className: "app-fullscreen-button-corner-1",
                        _childs: [
                            {
                                _tag: "path",
                                zc: !0,
                                _className: "app-svg-fill",
                                _attrs: {
                                    d: "m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z"
                                }
                            }
                        ]
                    },
                    {
                        _tag: "g",
                        _className: "app-fullscreen-button-corner-2",
                        _childs: [
                            {
                                _tag: "path",
                                zc: !0,
                                _className: "app-svg-fill",
                                _attrs: {
                                    d: "m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z"
                                }
                            }
                        ]
                    },
                    {
                        _tag: "g",
                        _className: "app-fullscreen-button-corner-3",
                        _childs: [
                            {
                                _tag: "path",
                                zc: !0,
                                _className: "app-svg-fill",
                                _attrs: {
                                    d: "M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z"
                                }
                            }
                        ]
                    }
                ]
            };
        }
        this._update({ icon, title });
    }
}
