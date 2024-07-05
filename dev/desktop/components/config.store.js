const store = new Map
export default store


export const get = function(key){
  return store.get(key)
}  
export const set = function(key, value){
  return store.set(key, value)
}  