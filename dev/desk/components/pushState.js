const pushState = window.history.pushState;
export const history = class {
  _list = []
  _ons = []
  pushState(url){
    this._list.push(url);
    pushState.apply(window.history, [null,null, url])
    for(const item of this._ons){
      item()
    }
  }
  onpush(call){
    this._ons.push(call)
  }
}