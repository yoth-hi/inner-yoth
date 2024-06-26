import { createElement } from "./utils.js"
import { Media } from "../manager/media.js"
const listPre = [];
export function StartPrepareInitialPlayback(app){
  StartInitializeApplicationPlayback(app)
} 
export function StartInitializeApplicationPlayback(app){
  CreateMediaElement(app)
  app._controller._setMediaElement(app._mediaElement)
  app._mediaElement._setSrc("https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4")
 app._mediaElement._setMuted(true)
  // app._mediaElement._play()
}
export function CreateMediaElement(app){
  app._mediaElement = app._playerContextConfig._deviceIsAudioOnly ? new Media(createElement("Audio")) : listPre.pop() || new Media(createElement("Video"))
  const video = app._mediaElement._getElement()
  app._template._videoContenter.appendChild(video)
  video.controls = true;
}
