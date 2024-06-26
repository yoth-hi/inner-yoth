export const stote = new Map;
export const removeChildAll = function (parent) {
    for (var el; (el = parent.firstChild); ) parent.removeChild(el);
};
export const insertBefore = function (parent, child, index) {
    parent.insertBefore(child, parent.childNodes[index] || null);
};
export const createElement = function (node) {
    return document.createElement(String(node).toLowerCase());
};
export const createTextNode = function (text) {
    return document.createTextNode(String(text));
};
export const binSearch = function (a, b) {
    return internalBinarySearch(a, b, !0);
};
export const internalBinarySearch = function (a, b, c, d) {
    for (var e = 0, f = a.length, h; e < f; ) {
        var l = e + ((f - e) >>> 1),
            m = void 0;
        c ? (m = b.call(void 0, a[l], l, a)) : (m = b(d, a[l]));
        0 < m ? (e = l + 1) : ((f = l), (h = !m));
    }
    return h ? e : -e - 1;
};
export const getIsRtl = function () {};
export const formatTextWithKey = function (sc, value, key) {
    const t = document.dir == "rtl" ? 1 : 0;
    let text = value;
    switch (t) {
        case 0:
            text = `${value} (${key})`;
            break;
        case 1:
            text = `(${key}) ${value}`;
            break;
    }
    return text;
};
export const getEventNameFullScreenChange = function (a) {
    return filterOne(
        [
            "fullscreenchange",
            "webkitfullscreenchange",
            "mozfullscreenchange",
            "MSFullscreenChange"
        ],
        function (b) {
            return "on" + b.toLowerCase() in a;
        }
    );
};

export const getFullScreenElement =  function(a = false) {
		var b = IC(["fullscreenElement", "webkitFullscreenElement", "mozFullScreenElement", "msFullscreenElement"], document);
		if (a)
			for (; b && b.shadowRoot;) b = b.shadowRoot.fullscreenElement;
		return b ? b : null
	};
export const getEventNameFullScreenError = function () {
    var a = document;
    return filterOne(
        [
            "fullscreenerror",
            "webkitfullscreenerror",
            "mozfullscreenerror",
            "MSFullscreenError"
        ],
        function (b) {
            return "on" + b.toLowerCase() in a;
        }
    );
};
export const exitFullscreen = function(a) {
		var b;
		isFullscreenEnabled() ? getFullScreenElement() == a && (b = document) : b = a;
		return b && (a = IC(["exitFullscreen", "webkitExitFullscreen", "mozCancelFullScreen", "msExitFullscreen"], b)) ? (b = a.call(b), b instanceof Promise ? b : Promise.resolve()) : Promise.resolve()
	};
const filterOne = function(a,b){
  for (let i = 0; i < a.length; i++) {
    const is = b(a[i]);
    if(is){
      return a[i]
      break;
    }
  }
}
const IC = function(a,b){
  for (let i = 0; i < a.length; i++) {
    const is = a[i] in b
    if(is){
      return b[a[i]]
      break;
    }
  }
}
export const requestFullscreen = function(a) {
		if (a.requestFullscreen) a = a.requestFullscreen(void 0);
		else if (a.webkitRequestFullscreen) a = a.webkitRequestFullscreen();
		else if (a.mozRequestFullScreen) a = a.mozRequestFullScreen();
		else if (a.msRequestFullscreen) a = a.msRequestFullscreen();
		else if (a.webkitEnterFullscreen) a = a.webkitEnterFullscreen();
		else return Promise.reject(Error("Fullscreen API unavailable"));
		return a instanceof Promise ? a : Promise.resolve()
	};
	export const isFullscreenEnabled = function() {
		return !!IC(["fullscreenEnabled", "webkitFullscreenEnabled", "mozFullScreenEnabled", "msFullscreenEnabled"], document)
	};