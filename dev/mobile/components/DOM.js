export const setProps = function(class_, key, observer, startValue, isAtt) {
  let value = startValue
  Object.defineProperties(class_.prototype, {
    [key]: {
      configurable: false,
      enumerable: false,
      get: function() {
        return value
      },
      set: function(x) {
        value = x
        this[observer]?.(value)
      },
    }
  })
}
export const Dom = class{}