import Fetch from"./fetch.js";
import { dispatch } from "./Event.js"
import { getQueryParameter } from "./utils.js"

import { EVENT_NAME_ON_NAVEGATE_START,EVENT_NAME_ON_NAVEGATE_FINISH } from "./vars.js"
import { getDataBodyRequest } from "./load.page.main.layout.js"
export const Load = async function Load(data,url="/v1/browse"){
  const body = {...data,...getDataBodyRequest()};
  const req = new Fetch(url,{
    method:"POST",
    body:JSON.stringify(body)
  })
  return req 
}
const log = (a)=>console.error(a)
export default function (pageId, onLoad,err=log,context={}) {
  dispatch(document,EVENT_NAME_ON_NAVEGATE_START)
  const data_ =  {
    pageId
  }
  if(pageId==="SEARCH"){
    const loc = window.location.href
    data_.query = getQueryParameter(loc,"search_"+"query")||getQueryParameter(loc,"v")
  }
  const a = Load(data_).then(onLoad, err).finally(()=>{
    dispatch(document,EVENT_NAME_ON_NAVEGATE_FINISH)
  })
  return a
}
export const loadNextPage = function(videoId){
  return Load({
    videoId
  },"/v1/detalis_PLayer".toLowerCase())
}