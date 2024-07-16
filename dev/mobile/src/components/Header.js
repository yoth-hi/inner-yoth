import"./Header.css"
import Logo from "./logo.js"
import on from "../events.store.js"
import {
  useState,
  useEffect
} from "react";


export default function() {
  const [isVisible,
    setIsVisible] = useState(true);
  useEffect(()=>{
    return on("set-visible-header",is=>{
      setIsVisible(is)
    })
  },[])
  return(<>
    <div className={"header-contanter"+(isVisible ? "": " out")}>
      <header className="header-topbar">
        <Logo />
      </header>
    </div>
  </>
  )
}