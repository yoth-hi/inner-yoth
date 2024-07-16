export default async function(scope) {
  let isOnLine;
  return scope.networkRequestPromise ??= new Promise(async(ok, rej)=> {
    const abort = window.AbortController ? new window.AbortController: void 0;
    const {
      signal
    } = abort?? {};
    const req = fetch("/generate_204", {
      method: "HEAD",
      signal
    }).then(()=> {
      isOnLine = true;
    }).catch(()=> {
      isOnLine = false;
    }).finally(()=> {
      scope.isOnline = isOnLine;
      scope.networkRequestPromise = null
      if (isOnLine) {
        scope.dispatchEvent("networkstatus-online");
      } else {
        scope.dispatchEvent("networkstatus-offline");
      }
      ok(isOnLine)
    })
  })
}