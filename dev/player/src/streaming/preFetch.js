import Xhr from "./fetch.js"
import _URL from "../controllers/URL.js"
export default class {
  constructor(a,b, c, id){
    this._url = new _URL(a._getUrl())
    this._timing = c
    this._xhr = new Xhr(this._url,this._timing,b, id);
  }
}