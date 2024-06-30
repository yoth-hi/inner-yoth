const can = true
function can_() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme)").matches
}
export function isDark() {
  return can_() && window.matchMedia("(prefers-color-scheme: dark)").matches
}

