
let lest = Date.now();

export const signalsTypes = new Set(["ci","cr","carml"])


class Signals {
  signals = []
  inProgressSignals = new Set;
  processSignal(key){
    if(signalsTypes.has(key)){
      this.inProgressSignals.add(key)
    } else this.inProgressSignals.delete(key)
    this.signals.push(key);
    console.debug(`${Date.now() - lest}ms`,this)
    lest = Date.now()
  }
}

export default function() {
  Signals.instance || (Signals.instance = new Signals);
  return Signals.instance
};