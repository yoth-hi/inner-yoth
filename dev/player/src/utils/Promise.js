export default class Promise_ {
  _resolve = void 0;
  constructor(){
    this._promise = new Promise((resolve,error) => {
      this._resolve = resolve
      this._error = error
    })
  }
  async get(){
    return await new Promise((a,b)=>{ 
      return this.then(a,b)
    })
  }
  then(then_, catch_){
    this._promise.then(then_, catch_)
  }
  resolve(a){
    this._resolve?.(a)
  }
}