import json
from urllib.parse import parse_qs
from .database import SQL, createConn, SQLC

from .api.watchtime import WATCHTIME
from .utils import getConfig, parse_accept_language_header

translations = {}
with open('backend/translations.json', 'r') as f:
  translations = json.load(f)


## host
def renderContextPage(parsed_path, self_):
  lang = "en"
  title = "Yoth"
  description = ""
  host = self_.headers.get('Host')
  lang__ = parse_accept_language_header(self_.headers.get("Accept-Language","en-US,en;q=1"))
  print(self_.headers)
  data = None
  context = {};
  path = parsed_path.path
  query = parseQuery(parsed_path.query)
  context["pageId"] = getPageIdByPath(path)
  isMobile = not query.get("app") == "desktop"
  isembed = context["pageId"] == "EMBED"
  iswatch = context["pageId"] == "WATCH"
  isdev = context["isdev"] = host == "localhost:8080"
  istv = context["pageId"] == "LAYOUT_TV"
  context["iswatch"] = iswatch
  context["istv"] = istv
  context["path"] = path
  context["host"] = host
  context["hl"] = lang__
  context["lang"] = (lang__[0][0] or "en-US")
  if not istv or not isembed:
    notificationCount = 0
    data = {
      "content":{}
    };
    if iswatch:
      playerData = getVideoPlayerData()
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
    data["content"]["results"] = getDataHomePage_ListItems()
    #
  context["data"] = toTextData(data)
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
  elif(path == "tv"):
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
  return path == "/" or "/watch" == path or path == "/tv"
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
    }
  }

## entrypoint
def EndPoint(path, context={}):
  return {
    'url':path,
    "context": {
      "pageId": getPageIdByPath(path)
    }
  }


def MainConstructor_contentPage():
  return{}
def ConstructorCardVideo(data):
  title = data.get("title")
  id_ = data.get("id")
  duration = int(+data.get("duration"))
  view_count = int(+data.get("viewCount"))
  return{
    "accessibility":{
      "label":title
    },
    "title":title,
    "videoId": id_,
    "viewCount":{
      "text": i18n_view(view_count),
      "count":view_count
    },
    "thumbnailOverlays":{
      "accessibility":{
        "label":""
      },
      "style":"DEFAULT",
      "text":convert_seconds(duration)
    }
  }
def MainConstructor_playerOverlays(playerData):
  title = playerData.get("title")
  return{
    "videoDetalis":{
      "title": title
    }
  }
## get - data player -
def getVideoPlayerData():
    id_ = "test"
    try:
      resp = SQLC(f"""SELECT
    v.title,
    v.description,
    v.id,
    (SELECT COUNT(*) FROM viewers WHERE video_id = v.id) AS viewer_count
FROM
    video v
WHERE id = %s
LIMIT 1;
      """,(id_,),0)
      print(resp)
      if resp:
        data = resp[0]
        return {
          "title": data[0],
          "description": data[1]
        }
      else:
        print("Nenhum vídeo encontrado.")
        return None
    except Exception as e:
        print(f"Erro ao buscar dados do vídeo: {e}")
        return None
## get - data browse -
def getData_ListItemsRecommeded(filters={}):
  bytag = filters.get("keywords",None)
  limit = filters.get("limit",5)
  resp = SQLC(f"""
    SELECT v.title, v.description, v.id, v.duration,
    (SELECT COUNT(*) FROM viewers WHERE id = v.id)
    FROM video v
    WHERE status = 'public'
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
    })
  return data

def getDataHomePage_ListItems():
  rdata = getData_ListItemsRecommeded();
  data = [];
  for item in rdata:
    data.append(ConstructorCardVideo(item))
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
  print(65,post_data)
  return json.loads(post_data)
  
GUIDE_ITEMS_SIMPLE = ["HOME"]
GUIDE_ITEMS_SIMPLE_ENDPOINT = ["/"]
def GUIDE(context, self_, createConn):
  data = getBodyRequest(self_) or {};
  print(data)
  client = data.get("client", None);
  if(not client):
    return {
      status: 403
    }
  lang = client.get("hl","en")
  guideItems = []
  itemsPaths = GUIDE_ITEMS_SIMPLE_ENDPOINT
  index = 0;
  for item in GUIDE_ITEMS_SIMPLE:
    guideItems.append({
      "accessibility":{
        "label":"t"
      },
      "title":getI18n(item.lower(), lang),
      "endpoint": EndPoint(itemsPaths[index])
    })
    index += 1
  data = {
    "user":{},
    "guideItems": guideItems
  }
  return{
    "data":f"{toTextData(data)}".encode('utf-8')
  }



## API MANAGER
APIS = {
  "watchtime": WATCHTIME,
  "guide": GUIDE
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
def getI18n(key,lang="en",param={}):
  t = translations.get(lang) or translations.get(lang.split("-")[0])  or translations["en"]
  return t.get(key)
def format_string(template, **kwargs):
    return template.format(**kwargs)
