import json
from urllib.parse import parse_qs

## host
def renderContextPage(parsed_path, self_):
  lang = "en"
  title = "Yoth"
  host = self_.headers.get('Host')
  data = None
  context = {};
  path = parsed_path.path
  query = parseQuery(parsed_path.query)
  isMobile = True# query.get("app") == "mobile"
  context["pageId"] = getPageIdByPath(path)
  istv = context["pageId"] == "LAYOUT_TV"
  isembed = context["pageId"] == "EMBED"
  iswatch = context["pageId"] == "WATCH"
  context["iswatch"] = iswatch
  context["istv"] = istv
  context["path"] = path
  context["host"] = host
  context["lang"] = lang
  if not istv or not isembed:
    notificationCount = 0
    data = {};
    playerData = getVideoPlayerData()
    data["content"] = MainConstructor_contentPage()
    data["playerOverlays"] = MainConstructor_playerOverlays(playerData)
    title += " - "
    title += playerData.get("title")
    if isMobile:
      data["header"] = HeaderMobileWeb()
    elif notificationCount != 0:
      title += " (" + notificationCount + ")"
  context["title"] = title
  context["isMobile"] = isMobile
  
  context["isdev"] = host == "localhost:8080"
  context["static_app"] = "/s/desktop/";
  # if(istv):
  #   context["static_app"] = "/s/tv/"
  # if(not istv and isMobile):
  context["static_app"] = "/s/mobile/"
  context["static_app"] = context["static_app"] + "jsbin/"
  context["data"] = toTextData(data)
  #print(path, context)
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
  print(path)
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
  img = None
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
  ##sql get data video
  return{
    "title": "123jdjdtytttth yy3"
  }


## API
def NEXT(context, self_):
  return b"{ ?? }"
def WATCHTIME(context, self_):
  return b"OK"

## API MANAGER
APIS = {
  "watchtime": WATCHTIME
}

def RenderApi(path, self_):
  if not path.startswith("/v1/"):
    self_.send_response(404)
    self_.send_header('Content-type', 'text/plain')
    self_.end_headers()
    return False
  context = {}
  status = 200
  path = path[3:]
  call = APIS[path[1:]]
  self_.send_response(status)
  self_.send_header('Content-type', 'text/plain')
  self_.end_headers()
  data = call(context, self_)
  self_.wfile.write(data)
  return 