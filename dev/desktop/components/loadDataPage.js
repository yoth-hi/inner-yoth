import Fetch from"./fetch.js";
import { dispatch } from "./Event.js"
import { EVENT_NAME_ON_NAVEGATE_START,EVENT_NAME_ON_NAVEGATE_FINISH } from "./vars.js"
import { getDataBodyRequest } from "./load.page.main.layout.js"
async function Load(data,url="/v1/browse"){
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
  const a = Load({
    pageId
  }).then(onLoad, err).finally(()=>{
    dispatch(document,EVENT_NAME_ON_NAVEGATE_FINISH)
  })
}
export const loadNextPage = function(videoId){
  return Load({
    videoId
  },"/v1/detalis_PLayer".toLowerCase())
}