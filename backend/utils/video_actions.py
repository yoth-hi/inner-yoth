from config.apis import LIKE_API, DESLIKE_API 
from utils.utils import getI18n


T = {
    "LIKE":["like", LIKE_API,"number"],
    "DESLIKE":["delike", DESLIKE_API,"number"],
}
def get_action(ctx, lang, type_, title=None):
  isLogged = not not ctx["user"];
  typed = T.get(type_,["","",""])
  title = getI18n(typed[0],lang) or typed[0]
  action = None;
  if isLogged:
    action = {
      "api":typed[1]
    }
  else:
    action = {
      "action":"VIDEO.MENU.SHOW"
    }
  return{
    "accessibility":title,
    "title":title,
    "action":action,
    "renderType":typed[2],
    "actionNumberShow": 0,
    "type":typed[0]
  }
def get_menu(lang):
  l_cancel = getI18n("cancel",lang)
  l_sign_up = getI18n("sign_up",lang)
  return {
    "type":"MINI_MODAL",
    "title":l_sign_up,
    "subtitle":"",
    "actions":[
      {
        "accessibility":l_cancel,
        "title":l_cancel,
        "actions":{
          "execute":":CLOSE"
        }
      },
      {
        "accessibility":l_sign_up,
        "actions":{
          "execute":"SIGN_UP"
        }
      },
    ]
  }
def get_video_actions(ctx):
  isLogged = not not ctx["user"];
  lang = ctx["lang"]
  menu = None;
  if not isLogged:
    menu = get_menu(lang)
  return {
    "menu": menu,
    "actions": [
      get_action(ctx, lang, "LIKE","?"),
      get_action(ctx, lang, "DESLIKE"),
    ]
  }