const PG = "preference-page"
let y ={}
const get_ = (a) => {
  const p = /*localStorage.getItem(a)*/y[a] || "{}";
  try {
    return JSON.parce(p)
  } catch(_) {}
  return {}
}
const set_ = (a, b = {}) => {
  return /*localStorage.setItem(a,*/y[a] = (JSON.stringify(b))
}
export const controller = class {
  constructor() {
    this.preference_ = get_(PG)
  }
  save(a) {
    Object.assign(this.preference_, a)
    set_(PG, this.preference_)
  }
}
var h;
export const getController = function() {
  return h ??= new controller
}