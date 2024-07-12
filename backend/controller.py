import json
from urllib.parse import parse_qs, urlparse
from .database import SQL, createConn, SQLC
import requests
import xml.etree.ElementTree as ET
from functools import lru_cache

from .api.watchtime import WATCHTIME
from .utils import getConfig, parse_accept_language_header, getI18n, getTypeNumberI18n, getViewFormate
from .api_search import SEARCH

translations = {}
with open('backend/translations.json', 'r') as f:
  translations = json.load(f)

def getI18nQSP(lang):
  data = {
    "SEARCH_PLACEHOLDER":getI18n("search",lang)
  }
  return toTextData(data) or "{}";
def renderSuperDataApi(lang, self_, context,data={}):
  pageId = context.get("pageId")
  if(not data.get("content")):
    data["content"] = MainConstructor_contentPage()
  if(context.get("pageId") == "FEED_HOME"):
    data["content"]["results"] = getDataHomePage_ListItems(lang)
  elif(context.get("pageId") == "SEARCH"):
    query = context.get("query")
    data["content"]["results"] = SEARCH(query, lang)
    
  
  return data;
## host
def renderContextPage(parsed_path, self_, is_mobile):
  linksPre = "";
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
  context["getI18nQSP"] = getI18nQSP
  context["query"] = query.get("q") or query.get("search_query")
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
        data["playerOverlays"] = MainConstructor_playerOverlays(playerData,lang)
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
  renderSuperDataApi(lang,self_,context,data)
  if(iswatch and id_):
    data["content"]["results"] = getDataWatchPage_ListItems(id_)
    #
  #if isMobile:
  context["pivotBar"] = getPivotBar(lang, context,self_)
  playerData = getVideoPlayerData(playerData)
  context["data"] = toTextData(data)
  context["playerData"] = toTextData(playerData)
  context["isMobule"] = (not istv and not isMobile) and isdev
  context["static_app"] += "jsbin/"
  g = context.get("static_app")
  linksPre += f"<{g}/app.js>; rel=preload; as=script"
  self_.send_header('Link', f"{linksPre}")
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
  elif(path == "results"):
    _id = "SEARCH"
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
    path == "/results" or
    path == "/tv" or
    path == "/feed/trending"
  );
def isPageApi(path,type_="GET"):
  _NOAPI = (
    path == "/opensearch"
  )
  if(_NOAPI and type_ == "GET"):
    return _NOAPI
  if not path.startswith("/v1/"):
    return False
  path = path[3:]
  
  GETS = (
    path == "/sugestions" or
    path == "/watchtime"
  )
  POST = (
    path == "/detalis_player" or
    path == "/browse" or
    path == "/like/like" or
    path == "/guide" or
    path == "/player" or
    path == "/like/deslike"
  )
  if(type_=="GET"):
    return GETS
  else:
    return POST

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
          "title":getI18n("sign_up",lang),
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
def MainConstructor_playerOverlays(playerData,lang):
  title = playerData.get("title")
  description = playerData.get("description","")
  id_ = playerData.get("id")
  channelName = playerData.get("channelName")
  channelId = playerData.get("channelId")
  return{
    "videoId":id_,
    "videoDetalis":{
      "title": title,
      "description": description
    },
    "owner":{
      "endpoint":EndPoint(None,{
        "channel_id": channelId
      }),
      "title":channelName,
      "actions":[
        {
          "title":getI18n("subscribe", lang),
          "style":"BUTTON_SUBSCRIBE"
        }
      ]
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
      "status": 403
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
    query_params.get('hl', ["en"])[0]
  )
  strJson = toTextData(data or []) or "[]"
  return{
    "status":200,
    "data":f"{strJson}".encode('utf-8')
  }
def BROWSE(context, self_, createConn):
  body = getBodyRequest(self_) or {};
  lang = body.get("client",{}).get("hl")
  data = {}
  renderSuperDataApi(lang, self_, body,data)
  data = toTextData(data) or "{}"
  return{
    "data":f"{data}".encode('utf-8')
  }
def GET_DATAILS_PLAYER(context, self_, createConn):
  body = getBodyRequest(self_) or {};
  lang = body.get("client",{}).get("hl")
  id_ = "test"
  data = {}
  data["content"] = MainConstructor_contentPage()
  data["content"]["results"] = getDataWatchPage_ListItems(id_)
  playerData = getDataVideo()
  title = "Yoth"
  if(playerData):
    data["playerOverlays"] = MainConstructor_playerOverlays(playerData,lang)
    title += " - "
    title += playerData.get("title")
  data["headerupdate"] = {
    "title":title
  }
  data = toTextData(data) or "{}"
  return{
    "data":f"{data}".encode('utf-8')
  }
def PLAYER(context, self_, createConn):
  body = getBodyRequest(self_) or {};
  lang = body.get("client",{}).get("hl")
  id_ = "test"
  data = getVideoPlayerData(None,id_)
  data = toTextData(data) or "{}"
  return{
    "data":f"{data}".encode('utf-8')
  }
def opensearch(context, self_, createConn):
  text = """<?xml version="1.0" encoding="UTF-8"?><OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/"><ShortName>Yoth</ShortName><Description>Search for videos</Description><Tags>Yoth video</Tags><Image height="16" width="16" type="image/vnd.microsoft.icon">/favicon.ico</Image><Url type="text/html" template="/results?search_query={searchTerms}&amp;page={startPage?}&amp;utm_source=opensearch"></Url><Query role="example" searchTerms="cat"></Query></OpenSearchDescription>"""
  return{
    "data":f"{text}".encode('utf-8'),
    "contentType":"text/xml"
  }

## API MANAGER
APIS = {
  "watchtime": WATCHTIME,
  "guide": GUIDE,
  "sugestions": SUGESTIONS,
  "browse": BROWSE,
  "detalis_player": GET_DATAILS_PLAYER,
  "player": PLAYER,
  "opensearch": opensearch,
}

def RenderApi(path, self_, parsed_path):
  context = {}
  status = 200
  contentType = "text/plain"
  apath = path
  path = path[3:]
  context["path"] = path
  context["parsed_path"] = parsed_path
  call = APIS.get(path[1:]) or APIS.get(apath[1:])
  print(call)
  data = call(context, self_, createConn)
  if(data.get("status")):
    status = data.get("status")
  if(data.get("contentType")):
    contentType = data.get("contentType")
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

def format_string(template, **kwargs):
    return template.format(**kwargs)

def getVideoPlayerData(playerData=None,id_=None):
  if not playerData:
    playerData = getDataVideo()
  id_ = playerData.get("id")
  title = playerData.get("title")
  description = playerData.get("description")
  channelName = playerData.get("channelName")
  viewCount = playerData.get("viewCount")
  keywords = playerData.get("keywords",[])
  P = SQLC(f"""SELECT used FROM watchtime WHERE video_id = %s ORDER BY time_id""",(id_,))
  timewatched = []
  for g in P:
    timewatched.append(g[0])
  return{
    "playbackTracking":{
      "timewatched":timewatched
    },
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



URL_GOOGLE = "https://suggestqueries-clients6.youtube.com/complete/search?ds=yt&client=firefox&hl={hl}&q={q}&gl=ko"
#https://suggestqueries-clients6.youtube.com/complete/search?client=youtube&hl=pt&gl=br&gs_rn=64&gs_ri=youtube&ds=yt&cp=1&gs_id=2&q=r&xhr=t&xssi=t
@lru_cache(maxsize=128)
def getSugestion(q, lang):
    url = URL_GOOGLE.format(hl=lang, q=q)
    suggestions = []
    print("response:suggestions")
    response = requests.get(url)
    print(response)
    if response.status_code == 200:
        data = response.json()
        # The second element in the response JSON is the list of suggestions
        suggestions = [[item, item] for item in data[1]]
    return suggestions