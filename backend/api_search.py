from .database import SQLC



def SEARCH(query, lang):
  querys_content = [];
  reels = []
  items_finded = SQLC("""
  SELECT 'VIDEO' as type, title from video
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
    
    if(type_ == "VIDEO"):
      data["title"] = item[1]
      
    querys_content.append(data)
  return querys_content