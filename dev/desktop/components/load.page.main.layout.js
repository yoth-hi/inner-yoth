import FETCH from "./fetch.js";
import { data } from "./data.config.js";
import { dispatch } from "./Event.js";
import { EVENT_NAME_ON_CHENGE_DATA_HEADER_AND_GUIDE } from "./vars.js";
const get_ = function(){
  return data["CONTEXT"]
}
export const target = new EventTarget
export const getMainDataFTLayout = async function() {
  const body = JSON.stringify(get_());
  const yy = await new FETCH("/v1/guide",{
    method:"POST",
    body
  })
  dispatch(target,EVENT_NAME_ON_CHENGE_DATA_HEADER_AND_GUIDE,yy)
}