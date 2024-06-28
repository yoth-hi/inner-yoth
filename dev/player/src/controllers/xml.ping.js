export default class XML_PING {
  constructor({
    _method = "GET", _body, _isPing, _url
  }) {
    this._xhr = new XMLHttpRequest;
    this._xhr.open(_method, _url)
    if (this._isPing) {
      this._send()} else {
      this._send(_body)}
  }
  _send(body) {
    this._xhr.send(body)
  }
}