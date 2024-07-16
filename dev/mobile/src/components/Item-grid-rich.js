import VideoCardGridItem from "./grid-item-video.js";
import { useState, useRef, useEffect } from "react";
import { debounce } from "../utils.js";

export default function({ data }) {
  const host = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(debounce(() => {
      if (host.current) {
        const row = Math.max(1,Math.floor(host.current.clientWidth / 320))
        host.current.style.setProperty("--row", row);
        host.current.classList[row > 1? "add" : "remove"]("has-margin-row")
        
      }
    }));

    if (host.current) {
      resizeObserver.observe(host.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  let element;
  if (!data.type || data.type == "CARD_VIDEO") {
    element = <VideoCardGridItem data={data} />;
  } else if (/* other elements */ false) {
    // handle other types if needed
  }

  return <div className="grid-item" ref={host}>{element}</div>;
}
