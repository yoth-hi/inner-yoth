import Disposable from "./Disposable.js";
export const EventTargt = class extends Disposable {
    _list = {};
    constructor(){
      super()
    }
    _listen(name, callback) {
        const evlist = this._list[name] || (this._list[name] = []);
        evlist.push(callback);
    }
    _dispatch(name, data) {
        const evlist = this._list[name] || []
        for (let i = 0; i < evlist.length; i++) {
            evlist[i](data, this);
        }
    }
    _executeCallbacks(){
      this._list = {};
      super._executeCallbacks()
    }
};
