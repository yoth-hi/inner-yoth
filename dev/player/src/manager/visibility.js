import{EventTargt}from"../utils/EventTargetCustom.js"
export default class extends EventTargt {
  _fullscreen = 0;
  _isFullscreen(){
    return this._fullscreen !== 0
  }
  _setFullscreen(newFull){
    if(this._fullscreen !== newFull){
      this._fullscreen = newFull;
      this._update()
    }
  }
  _update(){
    this._dispatch("visibilitychange")
  }
}