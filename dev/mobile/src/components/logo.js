import { useState, useEffect } from "react";
import on, { dispatch } from "../events.store.js"

export default function() {
  const [data,setData] = useState({})
  useEffect(()=>{
    return on("on-update-data",newData=>{
      setData(newData?.header?.logo||{})
    })
  },[])
  return (
    <a href={data.endpoint?.url} onClick={e=>{
      e.preventDefault()
      dispatch("link",data.endpoint?.url??"/")
    }}>
      {data.icon?.img?<img alt={data.accessibility} src={data.icon.img}/>:<div style={{marginLeft:"16px",fontSize:"16px"}}>Yoth</div>}
    </a>
  )
}