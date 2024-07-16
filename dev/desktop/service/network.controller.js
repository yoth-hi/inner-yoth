import Ping from "./ping.server.js"
let store;
export default function() {
  return store ??= new App
}
class App extends EventTarget {
  constructor() {
    super()
    this.isOnline = window.navigator?.onLine ?? !0;
    this.onNavigatorChange = async () => {
      return await Ping(this)
    }
    window.addEventListener("offline", this.onNavigatorChange);
    window.addEventListener("online", this.onNavigatorChange);
  }
  dispatchEvent(name) {
    super.dispatchEvent(new Event(name))
  }
}