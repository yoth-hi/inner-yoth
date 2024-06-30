export const renderList = function(is, parent, array, onCreate = ()=> void 0) {
  let element = [];
  for (var i = 0; i < parent.children.length; i++) {
    const el = parent.children[i]
    if (el.localName != is) {
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
    const el = element[j] || document.createElement(is)
    parent.appendChild(el)
    y.push(el)
    onCreate(el, a,y)
  })
}