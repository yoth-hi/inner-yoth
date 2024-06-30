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
        this._createSessionId()
    }
    _updateData(newData){
      if(newData){
        const data = ConstructorObjectData(this, newData);
        this._createSessionId()
        this._api._dispatch("videodatachange", data)
      }
    }
    _createSessionId(){
        this._api._ID = makeid(26)
    }
}

export const init = function (scope) {
    const b = new DataManager(scope._playerContextConfig, scope.config.args, scope);
    return b;
};
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}