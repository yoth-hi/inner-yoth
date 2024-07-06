import setHeader from "../../../desktop/components/client.headers.js"
export default class XML_PING {
  constructor({
    _method = "GET", _body, _isPing, _url,
    header = {}
  }) {
    this._xhr = new XMLHttpRequest;
    this._xhr.open(_method, _url)
    JG(this._xhr, setHeader(header))
    if (this._isPing) {
      this._send()} else {
      this._send(_body)}
  }
  _send(body) {
    this._xhr.send(body)
  }
}
  const JG = function(xhr, header) {
    for (let [key, value] of Object.entries(header)) {
      xhr.setRequestHeader(key, value)
    }
  }