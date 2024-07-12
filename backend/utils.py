from http.cookies import SimpleCookie
import secrets
import json
import base64
from urllib.parse import parse_qs
def getConfig(ctx, self_):
  ip_ = getIp(self_)
  cookieSesion = getCookieSession(self_)
  headers = self_.headers
  isLogged = False;
  CLIENT_NAME = "DESKTOP";
  if(ctx["isMobile"]):
    CLIENT_NAME = "MWEB";
    
  TT = (ctx["hl"][0][0] or "en")
  MX = TT.split("-")
  HL = MX[0]
  return{
    "HL":HL,
    "CLIENT_NAME":CLIENT_NAME,
    "IS_LOGGAD":isLogged,
    "REMOTE_IP":ip_,
    "CONTEXT":{
      "client":{
        "hl":HL,
        "name":CLIENT_NAME,
        "userAgent": headers.get("User-Agent"),
        "visitor": cookieSesion
      }
    },
    "VISITOR_DATA": cookieSesion
  }
def getCookieSession(self_):
  visitor_id = getCookie(self_, "visitor_id");
  if visitor_id is None:
    random_bytes = secrets.token_bytes(62)  # Generate 12 random bytes
    visitor_id = base64.b64encode(random_bytes).decode('utf-8')
    visitor_id = visitor_id[:64] + '=='
    # cookie = SimpleCookie()
    # cookie['visitor_id'] = visitor_id
    # cookie['visitor_id']['path'] = '/'
    # self_.send_header('Set-Cookie', cookie.output(header='', sep=''))
  return visitor_id;

def getCookie(self_, key):
    if 'Cookie' in self_.headers:
        cookies = SimpleCookie(self_.headers['Cookie'])
        if key in cookies:
            return cookies[key].value
def parse_accept_language_header(header):
    languages = header.replace(' ', '').split(',')
    
    # Parse languages and their priorities
    language_preferences = []
    for language in languages:
        parts = language.split(';q=')
        lang = parts[0]
        priority = float(parts[1]) if len(parts) > 1 else 1.0
        language_preferences.append((lang, priority))
    
    # Sort by priority descending
    return language_preferences
def getIp(self_):
  return self_.client_address[0]
def getViewFormate(number, lang):
  t = getTypeNumberI18n(number);
  h = getI18n(f"$COUNT_view{t}",lang,COUNT=number)
  return h
def getTypeNumberI18n(number):
  with_ = ""
  if number > 1:
    with_ = "s"  
  return with_
  
translations = {}

with open('backend/translations.json', 'r') as f:
  translations = json.load(f)
  
def getI18n(key,lang="en",**kwargs):
  t = translations.get(lang) or translations.get(lang.split("-")[0])  or translations["en"]
  return t.get(key,"").format(**kwargs)