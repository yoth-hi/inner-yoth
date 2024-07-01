import json
from urllib.parse import parse_qs
from .database import SQL

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
    try:
      resp = None#SQL(f"""SELECT title FROM video LIMIT 1;""")
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


def Y(arr):
  if(arr):
    return arr[0].split(",")
## API
def NEXT(context, self_):
  return b"{ ?? }"
def WATCHTIME(context, self_):
    # Parse dos parâmetros da consulta HTTP
    q = parse_qs(context["parsed_path"].query)
    video_id = q.get('vid', [])[0]
    startList = Y(q.get('st', []))
    endList = Y(q.get('ed', []))
    len_ = float(q.get('len', [])[0])
    session = q.get('sid', [0])[0]  # Obter a sessão (assume que é um único valor)
    used_seek = 0;
    
    # Verificar se há uma sessão válida
    if not session:
        self_.send_error(403, "")
        return b""

    # Preparar os dados para inserção/atualização no banco de dados
    data = []
    for index in range(len(startList)):
        start = float(startList[index])
        end = float(endList[index])
        duration = end - start
        id_ = int((start/len_)*100)
        # Incluir os dados formatados na lista de dados
        data.append((video_id, start, end, id_))
    u = 0
    # Executar as consultas SQL para cada conjunto de dados de watchtime
    for entry in data:
        video_id, start, end, time_id = entry
        if len(startList) > 1 and u > 0:
          used_seek = 1
        u += 1

        # Verificar se já existe um registro de watchtime com timeId = 5 para o vídeo específico
        sql_query = """
        DO $$
DECLARE
    watchtime_id INT;
BEGIN
    -- Verificar se existe um registro de watchtime com timeId = 5 para o vídeo específico
    SELECT id INTO watchtime_id FROM watchtime
    WHERE video_id = %s
    AND time_id = %s
    LIMIT 1;

    -- Se existe, incrementar o contador 'used'
    IF found THEN
        UPDATE watchtime
        SET used = used + 1, used_seek = used_seek + %s
        WHERE id = watchtime_id;
    ELSE
        -- Se não existe, inserir um novo registro de watchtime
        INSERT INTO watchtime (video_id, time_start, time_end, time_id)
        VALUES (%s, %s, %s, %s);
    END IF;
END $$;

        """
        SQL(sql_query, (video_id, time_id, used_seek, video_id, start, end, time_id))

    return b"OK"

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
  path = path[3:]
  context["path"] = path
  context["parsed_path"] = parsed_path
  call = APIS[path[1:]]
  self_.send_response(status)
  self_.send_header('Content-type', 'text/plain')
  self_.end_headers()
  data = call(context, self_)
  self_.wfile.write(data)
  return 