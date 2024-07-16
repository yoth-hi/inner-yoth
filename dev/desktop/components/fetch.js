const FETCH = class {
  constructor(url, option) {
    return this.fetch(url, option).then(a => this.toJson(a))
  }
  async fetch(url, option){
    const R = new Request(url, option);
    return await new Promise((ok, rej)=>{
      fetch(R).catch(rej).then(ok)
    })
  }
  toJson(a) {
    return a.json();
  }
}
export default FETCH