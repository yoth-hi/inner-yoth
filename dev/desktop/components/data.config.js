const data = window.config || {};
const i18n = window.I18n || {};
export const getValue = function (key, or) {
  return data[key] || or
}
export const getI18n= function (key, or) {
  return i18n[key] || or
}

export { data }