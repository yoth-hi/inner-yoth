export const renderList = function(is, parent, array, onCreate = ()=> void 0) {
  let element = [];
  for (var i = 0; i < parent.children.length; i++) {
    const H = typeof is == "string" ? is : is(array[i])
    const el = parent.children[i]
    if (el.localName != H) {
      el.remove()
    } else {
      element.push(el)
    }
  }
  for (; array.length < element.length;) {
    element.pop().remove()
  }
  let y = []
  array.forEach((a, j)=> {
    const H = typeof is == "string" ? is : is(array[i])
    const el = element[j] || document.createElement(H)
    parent.appendChild(el)
    y.push(el)
    onCreate(el, a,y)
  })
}