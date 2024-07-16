import Home from "./home.js"
export default function() {
  const pageId = "FEED_HOME";
  
  return(<>
    <div>
      {pageId == "FEED_HOME" ? <Home />: void 0}
    </div>
  </>)
}