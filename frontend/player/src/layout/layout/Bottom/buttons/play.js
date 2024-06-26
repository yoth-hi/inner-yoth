import { Dom, Element, appendChildInTemplate } from "../../../../utils/Dom.js";
import { getSwitchIconPlay, Anime } from "../../../icons.js";
export default class extends Dom {
    constructor(api) {
        super({
            _tag: "button",
            _classList: ["player-button"],
            _attrs: {
                title: "{{title}}",
                "aria-keyshortcuts": "k",
                "data-title-no-tooltip": "{{data-title-no-tooltip}}"
            },
            _content: "{{icon}}"
        });
        this._api = api;
        this._listen("click", this._onClick);
        this._on(this._api, "presentingplayerstatechange", this._onChengeState);
    }
    _onClick() {
        if (this._api._isPaused()) {
            this._api._playVideo();
        } else {
            this._api._pauseVideo();
        }
    }
    get id() {
        return "super.play";
    }
    _onChengeState({ state }) {
        let title = "";
        switch (state) {
            case 1:
                title = xU(this.J, "Reproduzir", "k");
                this._update({
                    "data-title-no-tooltip": "Reproduzir"
                });
                break;
            case 2:
                title = xU(this.J, "Pausa", "k");
                this._update({
                    "data-title-no-tooltip": "Pausa"
                });
                break;
            case 3:
                title = "Reiniciar";
                this._update({
                    "data-title-no-tooltip": "Reiniciar"
                });
                break;
            case 4:
                title = "Interromper reprodu\u00e7\u00e3o ao vivo";
                this._update({
                    "data-title-no-tooltip":
                        "Interromper reprodu\u00e7\u00e3o ao vivo"
                });
        }
        if (getSwitchIconPlay(state) && state !== 0)
            if (state === 3) {
                this._isS = true;
                this._update({
                    title,
                    icon: getSwitchIconPlay(state)
                });
            } else {
                this._update({ title });
                Anime(this, this.element, getSwitchIconPlay(state), this._isS);
                this._isS = false;
            }
    }
}
const xU = function (sc, value, key) {
    const t = document.dir == "rtl" ? 1 : 0;
    let text = value;
    switch (t) {
        case 0:
            text = `${value} (${key})`;
            break;
        case 1:
            text = `(${key}) ${value}`;
            break;
    }
    return text;
};
