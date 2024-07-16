import FETCH from "./fetch.js";
import { data } from "./data.config.js";
import { dispatch } from "./Event.js";
import { EVENT_NAME_ON_CHENGE_DATA_HEADER_AND_GUIDE } from "./vars.js";
export const getDataBodyRequest = function(){
  return data["CONTEXT"] || window.config?.CONTEXT
}


export const store = {};


class on extends EventTarget {}


export const target = new on
export const getMainDataFTLayout = async function() {
  const body = JSON.stringify(getDataBodyRequest());
  const yy = await new FETCH("/v1/guide",{
    method:"POST",
    body
  })
  dispatch(target,EVENT_NAME_ON_CHENGE_DATA_HEADER_AND_GUIDE,yy)
  store[EVENT_NAME_ON_CHENGE_DATA_HEADER_AND_GUIDE] = yy
}

export const getDataIfExists = function(key, callback){
  return store[key]&&callback(void 0, store[key])
}