import"./pivot-bar.css"
import { useState, useEffect } from "react";
import { store } from "../store/global.js"
let data, isFetched;
const getDataGuide = async function(){
  if(isFetched){
    return data
  }
  isFetched = true
  const req = void 0
  return data = req
}

export default function() {
  const [ data, setData ] = useState([{}]);
  useEffect(()=>{
    getDataGuide().then(console.log)
  },[])
  if(data&&data.length){
    store["root"].setAttribute("pivot-bar-visible","")
  }
  return(<div role="tablist" className="pivot-bar-contenter">hhd</div>)
}