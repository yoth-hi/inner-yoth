const data = window.config || {};
const i18n = window.I18n || {};
const Yoth = window.yoth||(window.yoth = {})

export const getReferrer = function(){
  return window.location.href
}
export const getValue = function (key, or) {
  return data[key] || or
}
export const getI18n= function (key, or) {
  return i18n[key] || or
}

export { data }