import json
from urllib.parse import parse_qs
from .database import SQL, createConn

from .api.watchtime import WATCHTIME



## host
def renderContextPage(parsed_path, self_):
  lang = "en"
  title = "Yoth"
  host = self_.headers.get('Host')
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
  context["lang"] = lang
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
        title += playerData.get("title")
      data["content"] = MainConstructor_contentPage()
    if isMobile:
      data["header"] = HeaderMobileWeb()
      data["content"]["results"] = [{},{},{},{}]
    elif notificationCount != 0:
      title += " (" + notificationCount + ")"
  context["title"] = title
  context["isMobile"] = isMobile
  
  context["static_app"] = "/s/desktop/";
  if(istv):
    context["static_app"] = "/s/tv/"
  if(not istv and isMobile):
    context["static_app"] = "/s/mobile/"
  context["data"] = toTextData(data)
  context["isMobule"] = (not istv and not isMobile) and isdev
  context["static_app"] += "jsbin/"
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
def MainConstructor_playerOverlays(playerData):
  title = playerData.get("title")
  return{
    "videoDetalis":{
      "title": title
    }
  }
## get - data player -
def getVideoPlayerData():
    try:
      resp = [["@"]]#SQL(f"""SELECT title FROM video LIMIT 1;""")
      if resp:
        data = resp[0]
        return {
          "title": data[0]  # Acessar o título (primeiro elemento da tupla)
        }
      else:
        print("Nenhum vídeo encontrado.")
        return None
    except Exception as e:
        print(f"Erro ao buscar dados do vídeo: {e}")
        return None


def NEXT(context, self_):
  return {
    "data":b"{ ?? }"
  }
def Y(arr):
  if(arr):
    return arr[0].split(",")
## API



## API MANAGER
APIS = {
  "watchtime": WATCHTIME
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