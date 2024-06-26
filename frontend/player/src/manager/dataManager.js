import {ConstructorObjectData} from "./dataManager.contructor.js"
class DataManager {
    _adModule = false;
    _ariaLabel = "";
    _clipStart = 0;
    _clipEnd = Infinity;
    _captionTracks = [];
    _slotPosition = -1;
    _suggestions = null;
    _shortDescription = "";
    _keywords = {};
    _isLiveHeadPlayable = false;
    _isLivePlayback = false;
    _isPrivate = false;
    _isListed = false;
    _loading = !1;
    _mutedAutoplay = false;
    constructor(n, data, api) {
      this._api = api;
      ConstructorObjectData(this, data)
    }
    _updateData(newData){
      if(newData){
        const data = ConstructorObjectData(this, newData);
        this._api._dispatch("videodatachange", data)
      }
    }
}

export const init = function (scope) {
    const b = new DataManager(scope._playerContextConfig, scope.config.args, scope);
    return b;
};
