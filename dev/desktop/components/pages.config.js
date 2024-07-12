export const getPagesIdByPath = function(path){
  if(path === "/"){
    return "FEED_HOME"
  } else if(path.startsWith("/reel/")){
    return "FEED_REEL"
  } else if(path === "/feed/trending"){
    return"TRENDING"
  } else if(path === "/watch"){
    return"WATCH"
  } else if(path === "/results"){
    return"SEARCH"
  }
}