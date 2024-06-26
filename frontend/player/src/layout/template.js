import { Dom } from "../utils/Dom.js";
export default class Root extends Dom {
  constructor(app){
    super({
      _tag:"div",
      _className:"html5-video-player",
      _childs:[{
        _tag:"div",
        _className:"html5-video-contenter"
      }]
    })
    this._api = app
    this._videoContenter = this._getElementByClass("html5-video-contenter")
    this._api.addEventListener("playeresize", (a)=>this._resize(a))
  }
  _resize(){
    const { clientHeight, clientWidth }= this.element
    const videoElement = this._api._mediaElement._getElement()
    const { videoWidth, videoHeight } = videoElement
    const { left, top } = centralizeVideo(videoWidth, videoHeight, clientWidth, clientHeight);
    
    videoElement.style.left = left + "px"
    videoElement.style.top = top + "px"
    videoElement.style.width = (left > 0 ? (clientWidth - left*2) : clientWidth)+ "px"
    videoElement.style.height = (top > 0 ? (clientHeight - top*2) : clientHeight)+ "px"
  }
}
function centralizeVideo(videoWidth, videoHeight, clientWidth, clientHeight) {
    // Calcula a proporção do vídeo e do contêiner
    const videoRatio = videoWidth / videoHeight;
    const clientRatio = clientWidth / clientHeight;

    let displayWidth, displayHeight;

    // Ajusta as dimensões do vídeo de acordo com a proporção do contêiner
    if (videoRatio > clientRatio) {
        // O vídeo é mais largo que o contêiner, ajusta pela largura
        displayWidth = clientWidth;
        displayHeight = clientWidth / videoRatio;
    } else {
        // O vídeo é mais alto que o contêiner, ajusta pela altura
        displayHeight = clientHeight;
        displayWidth = clientHeight * videoRatio;
    }

    // Calcula as margens para centralizar o vídeo
    const left = (clientWidth - displayWidth) / 2;
    const top = (clientHeight - displayHeight) / 2;

    return { left, top };
}

