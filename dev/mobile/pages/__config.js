export function getIdPage(path) {
  let id;
  switch (path) {
    case "":
    case "/":
      id = "HOME"
      break
    case "/watch":
      id = "WATCH"
      break
  }
  return id
}
export function getPageElement({ _stoteElement }, id){
  let el = _stoteElement.get(id)
  if(!el){
    let nodeName = void 0;
    switch (id) {
      case "HOME":
        nodeName = "app-home"
        break
      case "WATCH":
        nodeName = "app-watch"
        break
    }
    if(nodeName){
      el = document.createElement(nodeName)
      _stoteElement.set(id, el)
    }
  }
  return el
}