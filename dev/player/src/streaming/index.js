import Load from "./preFetch.js";
let rn = 0;
import _URL from "../controllers/URL.js"
export class Renge {
    constructor(start, end) {
        this._start = start;
        this._end = end;
        this._length = end - start + 1;
    }
    toString() {
        return this._start + "-" + (this._end ?? "");
    }
}
// export  class JJJ {
//     _statusText = "";
//     constructor(sc, rengeSE, onEnded, data, id) {
//         this._onEnded = onEnded;
//         this._r = new Load(
//             getDataS(sc, rengeSE, data),
//             a => {
//                 let type = "OK";
//                 if (a._errorMensager) {
//                     type = "ERROR";
//                 } else {
//                 }
//                 this._onEnded(this, type, a);
//             },
//             Yf(sc),
//             id
//         );
//     }
//     _onDone() {
//         this._onEnded?.(null, this._statusText);
//     }
// }

// class URL_ {
//     constructor(url) {
//         const url_ = new URL(url);
//         this._origin = url_.origin;
//         this._path = url_.pathname;
//         this._list = getAllSearchParams(url_.searchParams);
//     }
//     _getUrl() {
//         return this._origin + this._path + "?" + JFe(this._list);
//     }
//     _set(key, value) {
//         this._list[key] = value;
//     }
//     _get(key) {
//         return this._list[key];
//     }
// }
// const JFe = function (arr = {}) {
//     const arrs = Object.entries(arr);
//     let t = "";
//     arrs.forEach(([key, value]) => {
//         t += key + "=" + encodeURIComponent(value) + "&";
//     });
//     return t;
// };
// function getDataS(sc, [start_, end_], data) {
//     const B = data?.bitrate;
//     const start = (start_ / 1000) * B;
//     const end = (end_ / 1000) * B;
//     const _renge = new Renge(parseInt(start), parseInt(end));
//     sc._requestNumber = ++rn;
//     const _url = new URL_(data.url);
//     _url._set("rn", sc._requestNumber);
//     return {
//         _url,
//         _renge,
//         _requestNumber: rn
//     };
// }
// function getAllSearchParams(params) {
//     const paramObj = {};

//     params.forEach((value, key) => {
//         paramObj[key] = value;
//     });

//     return paramObj;
// }
  class Timing {
      _list = [];
      _dataVideo = []
      constructor(scope) {
          this._scope = scope;
      }
      _load(buff, type) {
          let element;
          switch (type) {
            case "VIDEO":
              element = this._dataVideo
              break;
            default:
              break
          }
          if(element!==void 0){
            element.push(buff)
            this._scope._loadedBuffer(this._dataVideo,type)
          } 
          if(element.length==0){
            this._scope["_loaded_" + type] = true;
          }
      }
  }
  const Yf = function (a) {
      return a._timing || (a._timing = new Timing(a));
  };


export default function(sc, data){
  var f = "VIDEO"
  sc["_loaded_"+f] ??= true
  if(
!sc["_loaded_"+f] 
  )return;
  sc._settingLoadChunk ??= 5;
  const timeStartSecord = sc._getMediaTimeToLoad()
  let { _mbps = 1, _bitrate, url } = sc._videoData.videoTrack || {}
  console.log(_mbps)
  _bitrate = parseInt(_bitrate /= 100)
  const y = sc._mediaTimeToLoad * _bitrate 
  // const range = (new Renge(parseInt(y), parseInt(y+(_bitrate*)*sc._settingLoadChunk))).toString()
  
  sc.j ??= 0;
  const range = (new Renge(sc.j, (sc.j = (sc._mediaTimeToLoad||1)*parseInt(_bitrate*8)) - 1 )).toString()
  sc._mediaTimeToLoad += sc._settingLoadChunk

  
  UF(sc,{
    range,
  },url,"VIDEO")
}

function UF(scope, obj,url,y){
  
  const g = new  _URL(url,obj)

  scope["_loaded_"+y] = false;
  const j = Date.now()
  return new Load(g,(a)=>{
    const length = a._length;
    
    const timeTaken = (Date.now() - j) / 1000;
    const k = (length / timeTaken) / 8;
    scope._videoData.videoTrack._mbps = k;
  } ,Yf(scope),y)
}