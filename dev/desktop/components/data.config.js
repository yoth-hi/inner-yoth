const data = window.config || {};
export const getValue = function (key, or) {
  return data[key] || or
}