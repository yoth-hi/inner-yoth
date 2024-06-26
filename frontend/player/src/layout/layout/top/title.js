import { Dom, Element } from "../../../utils/Dom.js";
var H3 = {},
    aY =
        ((H3.CHANNEL_NAME = "app-title-channel-name"),
        (H3.FULLERSCREEN_LINK = "app-title-fullerscreen-link"),
        (H3.LINK = "app-title-link"),
        (H3.SESSIONLINK = "yt-uix-sessionlink"),
        (H3.SUBTEXT = "app-title-subtext"),
        (H3.TEXT = "app-title-text"),
        (H3.TITLE = "app-title"),
        H3);

export const Title = class extends Dom {
    constructor(api) {
        super({
            _tag: "div",
            _className: aY.TITLE,
            _childs: [
                {
                    _tag: "div",
                    _className: aY.TEXT,
                    _childs: [
                        {
                            _tag: "a",
                            _classList: [aY.LINK, aY.SESSIONLINK],
                            _attrs: {
                                target: "", //a.U().W,
                                href: "{{url}}",
                                "data-sessionlink": "feature=player-title",
                                tabIndex: "{{channelTitleFocusable}}"
                            },
                            _content: "{{title}}"
                        },
                        {
                            _tag: "div",
                            _className: aY.SUBTEXT,
                            _content: "{{subtextElement}}"
                        }
                    ]
                }
            ]
        });
        this._api = api;
        this._on(api, "videodatachange", this._onChengeData);
        //	this.T(a, "videoplayerreset", this.Sa);
        this._onChengeData();
    }
    _onChengeData() {
        reset(this);
        const data = this._api._getVideoData();
        const config = this._api._getPlayerConfig();
        this._updateValue("title", data.title);
        let subtextElement = {
            _tag: "a",
            _className: aY.CHANNEL_NAME,
            _attrs: {
                href: "{{channelLink}}",
                target: "_blank"
            },
            _content: "{{channelName}}"
        };
        config._isEmbed &&
            (subtextElement = {
                _tag: "span",
                _className: aY.CHANNEL_NAME,
                _content: "{{channelName}}",
                _attrs: {
                    tabIndex: "{{channelSubtextFocusable}}"
                }
            });
        this._updateValue("subtextElement", subtextElement);
        this._updateValue("channelName", data.author);
        if (!config._isEmbed) {
            this._updateValue("channelLink", data.channelLink);
        }
    }
};
function reset(scope) {
    scope._updateValue("channelLink", "");
    scope._updateValue("channelName", "");
    if (scope._api._getPlayerConfig()._isEmbed) {
        scope._updateValue("channelTitleFocusable", "0");
    } else {
        scope._updateValue("channelTitleFocusable", "-1");
    }
}
