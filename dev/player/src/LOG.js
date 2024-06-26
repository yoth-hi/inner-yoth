var g = SourceBuffer.prototype.appendBuffer
SourceBuffer.prototype.appendBuffer = function(a) {
  log("appendBuffer",""+a.byteOffset+"-"+a.byteLength+"")
  return g.apply(this, arguments)
}
let s = Date.now();
function log(type, d){
  let h;
  return console.log(h = `${((Date.now() - s)/1000)} ${type}: ${d}`) || (s = Date.now(), h)
}