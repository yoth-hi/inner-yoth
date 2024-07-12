from .database import SQLC



def SEARCH(query, lang):
  querys_content = [];
  reels = []
  items_finded = SQLC("""
  SELECT 'VIDEO_RENDERER' as type, title from video
  UNION
  SELECT 'CHANNEL' as type, name from "video.channel"
  """)
  
  for item in items_finded:
    type_ = item[0]
    # if ...
    # else:
    data = {
      "type": type_
    }
    data["sqr"] = item
    print(item)
    if(type_ == "VIDEO_RENDERER"):
      data["title"] = item[1]
      #data["videoId"] = item[2]
      
    querys_content.append(data)
  return querys_content