const pushState_ = history.pushState.bind(history)
const Navegete = class {
  _list = []
  _listEvent = []
  constructor() {
    let J;
    this.pushState = (a,b,c)=>{
      pushState_(a,b,c)
      J(arguments)
    }
    window.addEventListener("popstate", J =  (event) => {
      this._listEvent.forEach((a)=> {
        a(window.location, this, event)
      })
    });
  }
  _pushState(url, title) {
    this._list.push(arguments)
    this.pushState({}, null, url)
  }
  _listenOnChengePage(call) {
    this._listEvent.push(call)
  }
}
let nav = new Navegete;
export const pushState = function(url, title) {
  nav._pushState(url, title)
}
export const on = function(call){
  nav._listenOnChengePage(call)
}