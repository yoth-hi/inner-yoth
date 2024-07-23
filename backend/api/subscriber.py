from database import SQL
from http.cookies import SimpleCookie
from utils.utils import getChannelIdByToken, getBodyRequest

def subscribe(context, self_, createConn):
  cookie = SimpleCookie(self_.headers.get('Cookie'))
  Authorization = cookie.get('AUTH')
  data = getBodyRequest(self_) or {};
  if(Authorization):
    Authorization = Authorization.value.replace("Bearer ","")
  token = data.get("token");
  channel_id = None
  if token:
    channel_id = getChannelIdByToken(token).decode()
  print(channel_id, Authorization)
  if Authorization and channel_id:
    SQL("""DO $$
DECLARE
    v_user_id UUID;
    exists_record BOOLEAN;
BEGIN
    SELECT id INTO v_user_id FROM "main.user" WHERE "Authorization" = %s;

    SELECT EXISTS (
        SELECT 1
        FROM "video.subscribers" AS vs
        WHERE vs.user_id = v_user_id AND vs.channel_id = %s
    ) INTO exists_record;

    IF NOT exists_record THEN
        INSERT INTO "video.subscribers" (user_id, channel_id)
        VALUES (v_user_id, %s);
    END IF;
END $$;
""",(Authorization, channel_id, channel_id,),1)
    return {
      "status": 200,
      "contentType":"application/json; charset=UTF-8",
      "data": "{\"notWork\":true}".encode('utf-8')
    }
  return {
    "status": 403,
    "contentType":"application/json; charset=UTF-8",
    "data": "<div>403<div>".encode('utf-8')
  }

def unsubscribe(context, self_, createConn):
  pass