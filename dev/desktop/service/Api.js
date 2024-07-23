import { Load } from "../components/loadDataPage.js"
export const baseApi = "v1"
export const RequestActionButton = async function(path, data, context) {
  const url = join(location.origin,baseApi,path)
  const timeStart = Date.now()
  return await new Promise(async(resolve, reject)=> {
    const fetch = Load(context, url).catch(reject);
    const data = await fetch
    const time = Date.now() - timeStart
    resolve({ data, time })
  })
}

function join(...arr){return arr.join("/")}