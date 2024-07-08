import json
from urllib.parse import parse_qs, urlparse
from .database import SQL, createConn, SQLC
import requests
import xml.etree.ElementTree as ET

from .api.watchtime import WATCHTIME
from .utils import getConfig, parse_accept_language_header

translations = {}
with open('backend/translations.json', 'r') as f:
  translations = json.load(f)


## host
def renderContextPage(parsed_path, self_, is_mobile):
  lang = "en"
  title = "Yoth"
  description = ""
  host = self_.headers.get('Host')
  lang__ = parse_accept_language_header(self_.headers.get("Accept-Language","en-US,en;q=1"))
  print(self_.headers)
  data = None
  playerData = None
  context = {};
  path = parsed_path.path
  query = parseQuery(parsed_path.query)
  context["pageId"] = getPageIdByPath(path)
  isMobile = not not is_mobile #not query.get("app") == "desktop"
  isembed = context["pageId"] == "EMBED"
  iswatch = context["pageId"] == "WATCH"
  isdev = context["isdev"] = host == "localhost:8080"
  istv = context["pageId"] == "LAYOUT_TV"
  id_ = "text"
  context["iswatch"] = iswatch
  context["istv"] = istv
  context["path"] = path
  context["host"] = host
  context["hl"] = lang__
  context["lang"] =lang= (lang__[0][0] or "en-US")
  if not istv or not isembed:
    notificationCount = 0
    data = {
      "content":{}
    };
    if iswatch:
      playerData = getDataVideo()
      if(playerData):
        data["playerOverlays"] = MainConstructor_playerOverlays(playerData)
        title += " - "
        title = playerData.get("title")
        description = playerData.get("description")
    data["content"] = MainConstructor_contentPage()
    if isMobile:
      data["header"] = HeaderMobileWeb()
    else:
      if notificationCount != 0:
        title += " (" + notificationCount + ")"
      data["header"] = HeaderDasktopWeb(context)
    
  context["title"] = title
  context["description"] = title
  context["isMobile"] = isMobile
  
  context["static_app"] = "/s/desktop/";
  if(istv):
    context["static_app"] = "/s/tv/"
  if(not istv and isMobile):
    context["static_app"] = "/s/mobile/"
  if(context["pageId"] == "FEED_HOME"):
    data["content"]["results"] = getDataHomePage_ListItems(lang)
  elif(iswatch and id_):
    data["content"]["results"] = getDataWatchPage_ListItems(id_)
    #
  #if isMobile:
  context["pivotBar"] = getPivotBar(lang, context,self_)
  playerData = getVideoPlayerData(playerData)
  context["data"] = toTextData(data)
  context["playerData"] = toTextData(playerData)
  context["isMobule"] = (not istv and not isMobile) and isdev
  context["static_app"] += "jsbin/"
  context["config"] = toTextData(getConfig(context,self_))
  print(path, context)
  return context;

## utils
def getPageIdByPath(path):
  _id = "";
  if(path.startswith('/')):
    path = path[1:]
  if(path == ""):
    _id = "FEED_HOME"
  elif(
    path.startswith('/channel') or
    path.startswith('/@')
  ):
    _id = "CHANNEL"
  elif(path == ""):
    _id = "LAYOUT_TV"
  elif(path == "watch"):
    _id = "WATCH"
  return _id
def toTextData(dataJson):
  text = None;
  if dataJson:
    text = json.dumps(dataJson)
  return text
def isPageHtml(path):
  return (
    path == "/" or
    path == "/watch" or
    path == "/tv" or
    path == "/feed/trending"
  );
def isPageApi(path):
  if not path.startswith("/v1/"):
    return False
  path = path[3:]
  return (
    path == "/watchtime" or
    path == "/next" or
    path == "/browse" or
    path == "/like/like" or
    path == "/guide" or
    path == "/sugestions" or
    path == "/header" or
    path == "/like/deslike"
  )
def parseQuery(query_string = ""):
  query_params = parse_qs(query_string)
  return {key: value[0] for key, value in query_params.items()}

## logo
def LogoType():
  logo = "YOTH_LOGO";
  Event_ = getPageEventOrTheme()
  isEvent = not not Event_;
  img = None;
  if isEvent:
    logo = Event_.get("type");
    img = Event_.get("img");
  return{
    "accessibility": "",
    "icon":{
      "logo":logo,
      "isEvent":isEvent,
      "img":img
    },
    "endpoint": EndPoint("/")
  }
def getPageEventOrTheme():
  eventOrTheme = None
  return eventOrTheme

## header
def HeaderMobileWeb():
  isLoggad = False
  
  #getI18n("$APPNAME_HOME",[])
  return{
    "logo": LogoType()
  }
def HeaderDasktopWeb(ctx):
  isLoggad = False
  lang = ctx["lang"]
  #getI18n("$APPNAME_HOME",[])
  return{
    "logo": LogoType(),
    "searchBox":{
      "inputData":{
        "placeholder":getI18n("search", lang)
      }
    },
    "headerEndItems":{
      "isLoggad":False,
      "items":[
        {
          "type":"BUTTON_CUSTOMER",
          "text":getI18n("sign_up",lang),
          "accessibility":{
            "label":getI18n("sign_up",lang)
          },
          "icon":"USER",
          "isFull":False,
          "isRow":True,
          "isBorder":False,
          "endpoint":EndPoint_2("https://yonix.vercel.app/login")
        }
      ]
    }
  }

## entrypoint
def EndPoint(path, context={}):
  channel_id = context.get("channel_id")
  path = path or ""
  if(channel_id):
    path = "/channel/" + channel_id
  return {
    'url':path,
    "context": {
      "pageId": getPageIdByPath(path)
    }
  }
def EndPoint_2(url, context={}):
  type_ = context.get("target","_blank")
  return {
    'url':url,
    "context": {
      "target": type_
    }
  }


def MainConstructor_contentPage():
  return{}
def ConstructorCardVideo(data,lang):
  title = data.get("title")
  id_ = data.get("id")
  duration = int(+data.get("duration"))
  view_count = int(+data.get("viewCount"))
  channelName = data.get("channelName")
  channelId = data.get("channelId")
  return{
    "accessibility":{
      "label":title
    },
    "title":title,
    "videoId": id_,
    "viewCount":{
      "text": getViewFormate(view_count,lang),
      "count":view_count
    },
    "thumbnailOverlays":{
      "accessibility":{
        "label":""
      },
      "style":"DEFAULT",
      "text":convert_seconds(duration)
    },
    "owner":{
      "endpoint":EndPoint(None,{
        "channel_id": channelId
      }),
      "title":channelName
    }
  }
def MainConstructor_playerOverlays(playerData):
  title = playerData.get("title")
  description = playerData.get("description","")
  id_ = playerData.get("id")
  return{
    "videoId":id_,
    "videoDetalis":{
      "title": title,
      "description": description
    }
  }
## get - data player -
def getDataVideo():
    id_ = "test"
    try:
      resp = SQLC(f"""SELECT
    v.title,
    v.description,
    v.id,
    (SELECT COUNT(*) FROM viewers WHERE video_id = v.id) AS viewer_count,
    c.name AS channel_name,
    c.id AS channel_id,
    v.keywords
FROM video v
JOIN "video.channel" c ON v.channel_id = c.id
WHERE v.id = %s
LIMIT 1;
      """,(id_,),0)
      print(resp)
      if resp:
        data = resp[0]
        return {
          "title": data[0],
          "description": data[1],
          "id": data[2],
          "viewCount": data[3],
          "channelName": data[4],
          "keywords": data[6],
        }
      else:
        print(f"No videos found. id:{id_}")
        return None
    except Exception as e:
        print(f"\n\nError fetching video data: {e}\n\n")
        return None
## get - data browse -
def getData_ListItemsRecommeded(filters={}):
  bytag = filters.get("keywords",None)
  limit = filters.get("limit",5)
  resp = SQLC(f"""
    SELECT v.title, v.description, v.id, v.duration,
       (SELECT COUNT(*) FROM viewers vw WHERE vw.video_id = v.id) AS viewer_count,
       c.name AS channel_name,
       c.id AS channel_name
FROM video v
JOIN "video.channel" c ON v.channel_id = c.id
WHERE v.status = 'public'
LIMIT %s;
  """,(limit,))
  print(resp)
  data = []
  for i in resp:
    data.append({
      "title": i[0],
      "description": i[1],
      "id": i[2],
      "duration": i[3],
      "viewCount": i[4],
      "channelName": i[5],
      "channelId": i[6],
    })
  return data

def getDataHomePage_ListItems(lang):
  rdata = getData_ListItemsRecommeded();
  data = [];
  for item in rdata:
    data.append(ConstructorCardVideo(item,lang))
  return data;
def getDataWatchPage_ListItems(id_):
  rdata = getData_ListItemsRecommeded();
  data = [];
  for item in rdata:
    data.append(ConstructorCardVideo(item,"en"))
  return data;

def NEXT(context, self_):
  return {
    "data":b"{ ?? }"
  }
def Y(arr):
  if(arr):
    return arr[0].split(",")
## API
def getBodyRequest(self_):
  content_length = int(self_.headers['Content-Length'])
  post_data = self_.rfile.read(content_length)
  return json.loads(post_data)
  
GUIDE_ITEMS_SIMPLE = [
  "HOME",
  "REELS",
  "TRENDING"
]
GUIDE_ITEMS_SIMPLE_ENDPOINT = [
  "/",
  None,
  "/feed/trending"
]
def getGuideListItems(self_, lang,context):
  guideItems = []
  itemsPaths = GUIDE_ITEMS_SIMPLE_ENDPOINT
  index = 0;
  for item in GUIDE_ITEMS_SIMPLE:
    title = getI18n(item.lower(), lang),
    if(itemsPaths[index]):
      endpoint = EndPoint(itemsPaths[index])
    else:
      endpoint = {
        "render":item
      }
    guideItems.append({
      "accessibility":{
        "label": title
      },
      "title":title,
      "endpoint": endpoint,
      "icon": item
    })
    index += 1
  return guideItems
  
def GUIDE(context, self_, createConn=None):
  data = getBodyRequest(self_) or {};
  print(data)
  client = data.get("client", None);
  lang = client.get("hl","en")
  if(not client):
    return {
      status: 403
    }
  
  data = {
    "user":{},
    "guideItems": getGuideListItems(self_,lang, context)
  }
  return{
    "data":f"{toTextData(data)}".encode('utf-8')
  }
def SUGESTIONS(context, self_, createConn=None):
  parsed_path = urlparse(self_.path)
  query_params = parse_qs(parsed_path.query)
  data = getSugestion(
    query_params.get('q', [None])[0],
    query_params.get('lang', ["en"])[0]
  )
  return{
    "status":200,
    "data":f"{toTextData(data)}".encode('utf-8')
  }


## API MANAGER
APIS = {
  "watchtime": WATCHTIME,
  "guide": GUIDE,
  "sugestions": SUGESTIONS
}

def RenderApi(path, self_, parsed_path):
  if not path.startswith("/v1/"):
    self_.send_response(404)
    self_.send_header('Content-type', 'text/plain')
    self_.end_headers()
    return False
  context = {}
  status = 200
  contentType = "text/plain"
  path = path[3:]
  context["path"] = path
  context["parsed_path"] = parsed_path
  call = APIS[path[1:]]
  data = call(context, self_, createConn)
  if(data.get("status")):
    status = data.get("status")
  self_.send_response(status)
  self_.send_header('Content-type', contentType)
  self_.end_headers()
  if(data.get("data")):
    self_.wfile.write(data.get("data"))
  return 
def convert_seconds(total_seconds):
    hours = total_seconds // 3600
    remaining_seconds = total_seconds % 3600
    minutes = remaining_seconds // 60
    seconds = remaining_seconds % 60

    if hours > 0:
        return f"{hours}:{minutes:02}:{seconds:02}"
    else:
        return f"{minutes}:{seconds:02}"
def i18n_view(viewer=0):
    return f"{viewer:,}"
def getI18n(key,lang="en",**kwargs):
  t = translations.get(lang) or translations.get(lang.split("-")[0])  or translations["en"]
  return t.get(key,"").format(**kwargs)
def format_string(template, **kwargs):
    return template.format(**kwargs)

def getVideoPlayerData(playerData=None):
  if not playerData:
    playerData = getDataVideo()
  id_ = playerData.get("id")
  title = playerData.get("title")
  description = playerData.get("description")
  channelName = playerData.get("channelName")
  viewCount = playerData.get("viewCount")
  keywords = playerData.get("keywords",[])
  print(61,playerData)
  return{
    "videoDetails": {
      "videoId": id_,
      "title": title,
      "lengthSeconds": -1,
      "keywords":keywords,
      "channelId": None,
      "isOwnerViewing": None,
      "shortDescription":description,
      "isCrawlable": None,
      "thumbnail": None,
      "allowRatings": None,
      "viewCount": f"{viewCount}",
      "author": channelName,
      "isPrivate": False,
      "isLiveContent": False
    }
  }

def getPivotBar(lang, context, self_):
  items = getGuideListItems(context,"en" ,self_)
  return{
    "items":items
  }
def getTypeNumberI18n(number):
  with_ = ""
  if number > 1:
    with_ = "s"  
  return with_
def getViewFormate(number, lang):
  t = getTypeNumberI18n(number);
  h = getI18n(f"$COUNT_view{t}",lang,COUNT=number)
  return h

URL_GOOGLE = "https://suggestqueries.google.com/complete/search?output=toolbar&hl={hl}&q={q}&gl=in"
def getSugestion(q,lang):
  url = format_string(URL_GOOGLE,hl=lang,q=q)
  response = requests.get(url)
  suggestions = []
  root = ET.fromstring(response.content)
  for suggestion in root.findall(".//suggestion"):
      data = suggestion.get('data');
      suggestions.append([data,data])
  return suggestions