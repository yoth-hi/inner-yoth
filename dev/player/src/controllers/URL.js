export default class {
  _querys = {}
  constructor(url = location.href) {
    const [all,
      query] = url.split("?")
    query?.split("&").forEach((a)=> {
      const [key, value = ""] = a.split("=");
      this._querys[key] = value
    });
    const [origin,
      ...a] = all.split("/")
    this._pathname = "/"+ a.join("/")
    if(/^http/.test(origin)){
      this._origin = origin
    } else {
      this._origin = location.origin
    }
  }
  set(key, value){
    this._querys[key] = value
  }
  _getUrl(){
    return this._origin + this._pathname + this._getAll()
  }
  _getAll(){
    const entries = Object.entries(this._querys)
    let t = "?"
    entries.forEach(([ key, value])=>{
      t += t.length > 1 ? "&" : ""
      t += key + "=" + encodeURIComponent(value)
    })
    return t
  }
}