const FETCH = class {
  constructor(url, option) {
    const R = new Request(url, option);
    return fetch(R)
    .then(a => this.toJson(a))
  }
  toJson(a) {
    return a.json();
  }
}
export default FETCH