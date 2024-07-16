import {
  Register,
  html
} from "../components/DOM.js";

const _template = html`
<div id="blocking-container" hidden=\"[[!disabledState]]\" on-click=\"onDisabledTap\" class=\"style-scope ytd-miniplayer\">
  <yt-icon-button aria-label$=\"[[computeDisabledStateCloseButtonLabel()]]\" on-click=\"onCloseMiniplayer\" class=\"style-scope ytd-miniplayer\">
    <yt-icon id=\"close-icon\" icon=\"yt-icons:close\" class=\"style-scope ytd-miniplayer\"></yt-icon>
  </yt-icon-button>
</div>
<div class="miniplayer style-scope ytd-miniplayer" role="dialog">
  <div id="card" hidden=\"[[modern]]\" class=\"style-scope ytd-miniplayer\">
    <div id=\"video-container\" class=\"style-scope ytd-miniplayer\">
      <div class=\"video style-scope ytd-miniplayer\">
        <div id=\"player-container\" class=\"style-scope ytd-miniplayer\"></div>
      </div>
      <div id=\"info-bar\" on-click=\"onPlaylistExpandTap\" class=\"style-scope ytd-miniplayer\">
        <div class=\"metadata style-scope ytd-miniplayer\">
          <h1 aria-label$=\"[[getSimpleString(data.miniplayerTitle)]]\" class=\"title meta style-scope ytd-miniplayer\" hidden=\"[[!active]]\" role=\"heading\">
            <a tabindex="0" on-keydown=\"onMetadataKeydown\" on-click=\"onMetadataTap\" class=\"style-scope ytd-miniplayer\">
              <span>title...</span>
            </a>
          </h1>
          <div class=\"channel style-scope ytd-miniplayer\">
            <ytd-badge-supported-renderer class=\"premium-badges style-scope ytd-miniplayer\" badges=\"[[premiumBadges]]\" disable-upgrade$=\"[[!premiumBadges.length]]\" hidden=\"[[!premiumBadges.length]]\">\n            </ytd-badge-supported-renderer>\n            <yt-formatted-string id=\"owner-name\" no-endpoints=\"\" text=\"[[data.miniplayerSubtitle]]\" class=\"style-scope ytd-miniplayer\">\n            </yt-formatted-string>\n            <div class=\"index-message style-scope ytd-miniplayer\" hidden=\"[[computePlaylistIndexHidden(playlistIndexMessage, readyToResume)]]\">\n              <span class=\"text-divider style-scope ytd-miniplayer\">\u2022</span>\n              <span class=\"style-scope ytd-miniplayer\">[[playlistIndexMessage]]</span>\n            </div>\n          </div>\n        </div>\n        <div class=\"expander style-scope ytd-miniplayer\" hidden=\"[[computeExpandButtonHidden(hasPlaylistData, active, disabledState)]]\">\n          <yt-icon-button label=\"[[computeExpandButtonLabel(expanded)]]\" class=\"style-scope ytd-miniplayer\">\n            <yt-icon icon=\"[[getExpandIcon(expanded)]]\" class=\"style-scope ytd-miniplayer\"></yt-icon>\n          </yt-icon-button>\n        </div>\n      </div>\n    </div>\n    <ytd-playlist-panel-renderer id=\"playlist\" data=\"[[playlistData]]\" hidden=\"[[!expanded]]\" hide-header-text=\"\" within-miniplayer=\"\" class=\"style-scope ytd-miniplayer\">\n    </ytd-playlist-panel-renderer>\n    <div id=\"expander-space\" class=\"style-scope ytd-miniplayer\"></div>\n    <ytd-miniplayer-toast id=\"toast\" class=\"style-scope ytd-miniplayer\"></ytd-miniplayer-toast>\n  </div>\n  <div id=\"modern-card\" hidden=\"[[!modern]]\" class=\"style-scope ytd-miniplayer\">\n    <div id=\"draggable\" class=\"style-scope ytd-miniplayer\">\n      <div id=\"modern-video-container\" class=\"style-scope ytd-miniplayer\">\n        <div class=\"video style-scope ytd-miniplayer\">\n          <div id=\"modern-player-container\" class=\"style-scope ytd-miniplayer\"></div>\n        </div>\n        <ytd-badge-supported-renderer class=\"premium-badges overlay style-scope ytd-miniplayer\" badges=\"[[premiumBadges]]\" disable-upgrade$=\"[[!premiumBadges.length]]\" hidden=\"[[!showOverlayPremiumBadges]]\">\n        </ytd-badge-supported-renderer>\n      </div>\n      <div id=\"modern-info-bar\" on-click=\"onPlaylistExpandTap\" hidden=\"[[!showInfoBar]]\" class=\"style-scope ytd-miniplayer\">\n        <div class=\"metadata style-scope ytd-miniplayer\">\n          <h1 aria-label$=\"[[getSimpleString(data.miniplayerTitle)]]\" class=\"title meta style-scope ytd-miniplayer\" hidden=\"[[!active]]\" role=\"heading\">\n            <yt-formatted-string class=\"miniplayer-title style-scope ytd-miniplayer\" ellipsis-truncate=\"\" text=\"[[data.miniplayerTitle]]\">\n            </yt-formatted-string>\n          </h1>\n          <div class=\"channel style-scope ytd-miniplayer\">\n            <ytd-badge-supported-renderer class=\"premium-badges style-scope ytd-miniplayer\" badges=\"[[premiumBadges]]\" disable-upgrade$=\"[[!premiumBadges.length]]\" hidden=\"[[!premiumBadges.length]]\">\n            </ytd-badge-supported-renderer>\n            <yt-formatted-string id=\"modern-owner-name\" no-endpoints=\"\" text=\"[[data.miniplayerSubtitle]]\" class=\"style-scope ytd-miniplayer\">\n            </yt-formatted-string>\n            <div class=\"index-message style-scope ytd-miniplayer\" hidden=\"[[computePlaylistIndexHidden(playlistIndexMessage, readyToResume)]]\">\n              <span class=\"text-divider style-scope ytd-miniplayer\">\u2022</span>\n              <span class=\"style-scope ytd-miniplayer\">[[playlistIndexMessage]]</span>\n            </div>\n          </div>\n        </div>\n        <div class=\"expander style-scope ytd-miniplayer\" hidden=\"[[computeExpandButtonHidden(hasPlaylistData, active, disabledState)]]\">\n          <yt-icon-button label=\"[[computeExpandButtonLabel(expanded)]]\" class=\"style-scope ytd-miniplayer\">\n            <yt-icon icon=\"[[getExpandIcon(expanded)]]\" class=\"style-scope ytd-miniplayer\"></yt-icon>\n          </yt-icon-button>\n        </div>\n      </div>\n    </div>\n    <ytd-playlist-panel-renderer id=\"modern-playlist\" data=\"[[playlistData]]\" hidden=\"[[!expanded]]\" hide-header-text=\"\" picture-in-picture=\"[[pictureInPicture]]\" within-miniplayer=\"\" class=\"style-scope ytd-miniplayer\">\n    </ytd-playlist-panel-renderer>\n    <ytd-miniplayer-toast id=\"modern-toast\" class=\"style-scope ytd-miniplayer\"></ytd-miniplayer-toast>\n  </div>\n  <div id=\"resize-container\" hidden=\"[[!modern]]\" class=\"style-scope ytd-miniplayer\">\n    \n    <div class=\"resizer style-scope ytd-miniplayer\" alignment=\"north\"></div>\n    <div class=\"resizer style-scope ytd-miniplayer\" alignment=\"east\"></div>\n    <div class=\"resizer style-scope ytd-miniplayer\" alignment=\"south\"></div>\n    <div class=\"resizer style-scope ytd-miniplayer\" alignment=\"west\"></div>\n  </div>\n</div>\n"
`
class Miniplayer {
  attached(){
    this.listen(this.hostElement,"track","onTrack")
  }
  onTrack(){
    debugger
  }
}

//Register(Miniplayer, "app-miniplayer", _template);