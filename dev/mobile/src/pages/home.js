import { useState, useEffect } from "react";
import on from "../events.store.js"
import ItemGrid from "../components/Item-grid-rich.js"


export default function(){
  const [data,setData] = useState([])
  useEffect(()=>{
    return on("on-update-data",newData=>{
      setData(newData)
    })
  },[])
  return(<>
    {data?.content?.results?.map((item, index)=>(
      <ItemGrid key={index} data={item}/>
    ))}
  </>)
}