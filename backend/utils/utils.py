from http.cookies import SimpleCookie
import secrets
import json
from urllib.parse import parse_qs
from Crypto.Cipher import AES
from Crypto.Protocol.KDF import scrypt
from Crypto.Random import get_random_bytes
from config.env import PASSWORD_CHANNAL_CRIPT
import base64

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


def getMainLanguage(self):
  return self.headers.get('Accept-Language', 'en-US').split(",")[0]

def getFullUrl(self):
  schame = "https"
  if self.headers['Host'] == "localhost:8080":
    schame = "http"
  return  f"{schame}://{self.headers['Host']}{self.path}"

def isHTMLPage(path):
  return (
    path == "/" or
    path == "/watch" or
    path == "/results" or
    path == "/feed/trending" 
  )

def getThambnail(vid,type_="VERTICAL"):
  return[
    {
      "width":600,
      "url":f"https://katiebeachphotography.com/wp-content/themes/photoform/images/no.image.600x300.png",
      "height":300,
    }
  ]


def getButtonRequireLoginAcion(user, isMenuOpen):
  
  return ;
def createTokenSubscriveChannel(channel_id:str ) -> str:
  return encrypt_data(PASSWORD_CHANNAL_CRIPT.encode('utf-8'), channel_id.encode('utf-8'))
def getChannelIdByToken(data: str) -> str:
  return decrypt_data(PASSWORD_CHANNAL_CRIPT.encode('utf-8'), data)
  
def getBodyRequest(self_):
  content_length = int(self_.headers['Content-Length'])
  post_data = self_.rfile.read(content_length)
  return json.loads(post_data)
  
  


# Função para gerar uma chave a partir de uma senha
def generate_key(password: bytes, salt: bytes) -> bytes:
    # Deriva uma chave usando scrypt
    key = scrypt(password, salt, 32, N=2**14, r=8, p=1)
    return key

def encrypt_data(password: bytes, data: bytes) -> str:
    salt = get_random_bytes(16)
    key = generate_key(password, salt)
    iv = get_random_bytes(16)
    cipher = AES.new(key, AES.MODE_CFB, iv)
    encrypted_data = cipher.encrypt(data)
    return base64.b64encode(salt + iv + encrypted_data).decode('utf-8')


def decrypt_data(password: bytes, encrypted_data_b64: str) -> bytes:
    encrypted_data = base64.b64decode(encrypted_data_b64)
    salt = encrypted_data[:16]
    iv = encrypted_data[16:32]
    encrypted_data = encrypted_data[32:]
    key = generate_key(password, salt)
    cipher = AES.new(key, AES.MODE_CFB, iv)
    decrypted_data = cipher.decrypt(encrypted_data)
    return decrypted_data