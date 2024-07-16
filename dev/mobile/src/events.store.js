const all = {};
const saved = {};


export default function(key, call) {
  const events = (all[key] ??= [])
  
  const id = events.push(call) - 1
  console.log(id, events)
  saved[key]&&call(saved[key])
  return () => {
    events[id] = null
  }
}

export const dispatch = (key, data) => {
  const events = (all[key] ??= [])
  for(const item of events){
    item?.(data)
  }
  saved[key] = data
}