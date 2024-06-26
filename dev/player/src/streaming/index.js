import Load from "./preFetch.js";
let rn = 0;
export default class {
    _statusText = "";
    constructor(sc, rengeSE, onEnded, data, id) {
        this._onEnded = onEnded;
        this._r = new Load(
            getDataS(sc, rengeSE, data),
            a => {
                let type = "OK";
                if (a._errorMensager) {
                    type = "ERROR";
                } else {
                }
                this._onEnded(this, type, a);
            },
            Yf(sc),
            id
        );
    }
    _onDone() {
        this._onEnded?.(null, this._statusText);
    }
}

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
class URL_ {
    constructor(url) {
        const url_ = new URL(url);
        this._origin = url_.origin;
        this._path = url_.pathname;
        this._list = getAllSearchParams(url_.searchParams);
    }
    _getUrl() {
        return this._origin + this._path + "?" + JFe(this._list);
    }
    _set(key, value) {
        this._list[key] = value;
    }
    _get(key) {
        return this._list[key];
    }
}
const JFe = function (arr = {}) {
    const arrs = Object.entries(arr);
    let t = "";
    arrs.forEach(([key, value]) => {
        t += key + "=" + encodeURIComponent(value) + "&";
    });
    return t;
};
function getDataS(sc, [start_, end_], data) {
    const B = data?.bitrate;
    const start = (start_ / 1000) * B;
    const end = (end_ / 1000) * B;
    const _renge = new Renge(parseInt(start), parseInt(end));
    sc._requestNumber = ++rn;
    const _url = new URL_(data.url);
    _url._set("rn", sc._requestNumber);
    return {
        _url,
        _renge,
        _requestNumber: rn
    };
}
function getAllSearchParams(params) {
    const paramObj = {};

    params.forEach((value, key) => {
        paramObj[key] = value;
    });

    return paramObj;
}
class Timing {
    _list = [];
    constructor(scope) {
        this._scope = scope;
    }
    _load(buff, type) {
        this._scope._appendBuffer(buff, type)
    }
}
const Yf = function (a) {
    return a._timing || (a._timing = new Timing(a));
};
