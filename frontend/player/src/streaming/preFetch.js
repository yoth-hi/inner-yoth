import Xhr from "./fetch.js"
export default class {
  constructor(a,b, c, id){
    this._url = yF(a)
    this._timing = c
    this._xhr = new Xhr(this._url,this._timing,b, id);
  }
}
function yF(config) {
  const renge = config._renge.toString();
  config._url._set("range", renge)
  return config._url
}