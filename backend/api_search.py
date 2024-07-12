from .database import SQLC



def SEARCH(query, lang):
  querys_content = [];
  querys_content = SQLC(f"""
  SELECT 'VIDEO' as type, title from video
  UNION
  SELECT 'CHANNEL' as type, name from "video.channel"
  """)
  
  return querys_content