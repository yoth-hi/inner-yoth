import json
from urllib.parse import parse_qs


def renderContextPage(parsed_path, self_):
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
  if not istv or not isembed:
    data = {"data":1}
  
  context["title"] = title
  context["isMobile"] = isMobile
  context["data"] = toTextData(data)
  
  context["isdev"] = host == "localhost:8080"
  context["static_app"] = "/s/desktop/";
  # if(istv):
  #   context["static_app"] = "/s/tv/"
  # if(not istv and isMobile):
  context["static_app"] = "/s/mobile/"
  context["static_app"] = context["static_app"] + "jsbin/"
  #print(path, context)
  return context;

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
  return path == "/watchtime"
def parseQuery(query_string = ""):
  query_params = parse_qs(query_string)
  return {key: value[0] for key, value in query_params.items()}