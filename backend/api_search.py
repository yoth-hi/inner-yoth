from .database import SQLC
from .utils import getViewFormate


def SEARCH(query, lang):
  if(not query):
    return[];
  querys_content = [];
  reels = []
  items_finded = SQLC("""
  SELECT 'VIDEO_RESULT_SEARCH' as type, title, description, id,  (SELECT COUNT(*) FROM viewers WHERE video_id = video.id) AS viewer_count from video
  UNION 
  SELECT 'CHANNEL_RESULT_SEARCH' as type, name, description, profile_url, 0 as K from "video.channel"
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
    
    if(type_ == "VIDEO_RESULT_SEARCH"):
      description = (item[2] or "")[:128]
      
      data["title"] = item[1]
      data["description"] = {
        "runs": [
            {
                "text": description + (len(item[2]) > 128 and "..." or "")
            }
        ]
    }
      data["videoId"] = item[3]
      data["viewCount"] = {
        "text": getViewFormate(item[4],lang),
        "count": item[4]
      }
      
    elif type_ == "CHANNEL_RESULT_SEARCH":
      data["name"] = item[1]
      data["description"] = {
        "runs": [
            {
                "text": (item[2] or "")[:128] + (len(item[2]) > 128 and "..." or "")
            }
        ]
    }
      
    querys_content.append(data)
  return querys_content