const FETCH = class {
    _disposed = false;
    _errorMensager = "";
    _status = 0;
    _length = 0;
    __arr = [];
    constructor(a,b,c, id) {
      this._callback = c
      this._timing = b
        const url = a._getUrl();
        
      /*  this.ra = function(f) {
    
			if (f)
				if (e.status = f.status, f.ok && f.body && 204 !== e.status) e.status = e.status || 242, e.C = f.body.getReader(), e.isDisposed() ? e.C.cancel().catch(function() {}) : (e.G = f.headers, e.Gb.Kw(), w4a(e));
				else e.onDone();
			else e.onError(Error("null_response"))
		};  */
		    this._load = (response) => {
		      if(response){
		        this._status = response.status
		        if(
		          response.ok &&
		          response.body &&
		          this._status !== 204
		        ){
		          this._status = response.status || 242
		          this._reader = response.body.getReader();
		          if(this._isDisposed()){
		            this._reader.cancel().catch(function() {}) 
		          } else {
		            wa(this)
		          }
		        }
		        else {
		          this._onDone()
		        }
		      } else {
		        this._onError(Error("null_response"))
		      }
		    }
		    this._readerChunk = (a) => {
		      // now
		      if(!this._isDisposed()){
		        if(a.done){
		          this._reader = void 0;
		          this._onDone();
		        } else {
		          const buffer = a.value;
		          this._length += buffer.length
		          this.__arr.push(buffer)
		          // now
		          this._timing._load(buffer, id)
		          wa(this)
		        }
		      }
		    }
		    this._error = (err) => {
		      this._onError(err)
		    }
        this._start(url)
    }
    _start(url) {
      const request = new Request(url);
      //return fetch(request).then(this._load, this._error)
    }
    _onError(a){
      this._errorMensager = a;
      this._onDone("ERROR")
    }
    _onDone(a){
      this._callback(this, a ?? "OK")
    }
    _isDisposed(){
      return this._disposed
    }
};
const XHR = class {
    _disposed = false;
};

const useFetch = true
export default function(){
  useFetch ? 
   new FETCH(...arguments):
    new XHR(...arguments)
}
const wa = function(a){
  a._reader.read().then(a._readerChunk, a._error).then(void 0)
}