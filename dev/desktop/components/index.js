let y;
export default(
  function(t, e) {
    return y || (y = e())
  }(window, (function() {
      return function(t) {
        var e = {};
        function r(i) {
          if (e[i])return e[i].exports;
          var n = e[i] = {
            i: i,
            l: !1,
            exports: {}}; return t[i].call(n.exports, n, n.exports, r),
          n.l=!0,
          n.exports
        }return r.m = t,
        r.c = e,
        r.d = function(t, e, i) {
          r.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0, get: i
          })},
        r.r = function(t) {
          "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
          }),
          Object.defineProperty(t, "__esModule", {
            value: !0
          })},
        r.t = function(t, e) {
          if (1&e && (t = r(t)), 8&e)return t; if (4&e && "object" === typeof t && t && t.__esModule)return t; var i = Object.create(null); if (r.r(i), Object.defineProperty(i, "default", {
            enumerable: !0, value: t
          }), 2&e && "string" != typeof t)for (var n in t)r.d(i, n, function(e) {
            return t[e]}.bind(null, n)); return i
        },
        r.n = function(t) {
          var e = t && t.__esModule?function() {
            return t.default
          }:function() {
            return t
          }; return r.d(e, "a", e),
          e
        },
        r.o = function(t, e) {
          return Object.prototype.hasOwnProperty.call(t, e)},
        r.p = "/",
        r(r.s = 0)}([function(t, e, r) {
          t.exports = r(1)}, function(t, e, r) {
          "use strict"; r.r(e), r.d(e, "JTF", (function() {
            return o
          })); var i = function() {
            for (var t = 0, e = 0, r = arguments.length; e < r; e++)t += arguments[e].length; var i = Array(t),
            n = 0; for (e = 0; e < r; e++)for (var o = arguments[e], s = 0, a = o.length; s < a; s++, n++)i[n] = o[s]; return i
          },
          n = function(t, e) {
            var r,
            i = function(t, e) {
              return t.length < e?i("0"+t, e): t
            }; return(r = i(t.toString(), e), r.split("").map(Number)).reverse()},
          o = function() {
            function t(t) {
              var e,
              r,
              i = this,
              n = t.node,
              o = t.from,
              s = void 0 === o?0: o,
              a = t.to,
              h = t.duration,
              l = void 0 === h?.5: h,
              c = t.delay,
              d = t.easeFn,
              f = void 0 === d?function(t) {
                return(t /= .5) < 1?.5*Math.pow(t, 3): .5*(Math.pow(t-2, 3)+2)}: d,
              u = t.systemArr,
              p = void 0 === u?[0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9]: u,
              m = t.direct,
              v = void 0 === m || m,
              y = t.separator,
              g = t.separateOnly,
              b = void 0 === g?0: g,
              A = t.separateEvery,
              N = void 0 === A?3: A,
              w = t.containerClassName,
              _ = void 0 === w?"ctnr": w,
              C = t.digitClassName,
              S = void 0 === C?"digit": C,
              j = t.separatorClassName,
              x = void 0 === j?"sprtr": j; this._resizeHandler = this._resize.bind(this),
              this.beforeArr = [],
              this.afterArr = [],
              this.ctnrArr = [],
              this.duration = 1e3*l,
              this.systemArr = p,
              this.easeFn = f,
              this.from = s,
              this.to = a || 0,
              this.node = n,
              this.direct = v,
              this.separator = y,
              this.separateOnly = b,
              this.separateEvery = b?0: N,
              this.containerClassName = _,
              this.digitClassName = S,
              this.separatorClassName = x,
              this._initHTML((e = this.from, r = this.to, (e > r?e: r).toString().length)),
              this.setSelect(this.from),
              void 0 !== a && (c?setTimeout((function() {
                return i.flipTo({
                  to: i.to
                })}), 1e3*c): this.flipTo({
                to: this.to
              }))}return t.prototype._initHTML = function(t) {
              var e = this; this.node.classList.add("number-flip"),
              this.node.style.position = "relative",
              this.node.style.overflow = "hidden"; for (var r = function(r) {
                var o = document.createElement("div"); if (o.className = n.containerClassName+" "+n.containerClassName+r, o.style.position = "relative", o.style.display = "inline-block", o.style.verticalAlign = "top", i(n.systemArr, [n.systemArr[0]]).forEach((function(t) {
                  var r = document.createElement("div"); r.className = e.digitClassName, r.innerHTML = ""+t, o.appendChild(r)})), n.ctnrArr.unshift(o), n.node.appendChild(o), n.beforeArr.push(0), !n.separator||!n.separateEvery&&!n.separateOnly || r === t-1 || (t-r)%n.separateEvery != 1 && t-r-n.separateOnly != 1)return"continue"; var s,
                a = (s = n.separator, "[object String]" === Object.prototype.toString.call(s)?n.separator: n.separator.shift()),
                h = document.createElement("div"); h.className = n.separatorClassName,
                h.style.display = "inline-block",
                h.innerHTML = a,
                n.node.appendChild(h)},
                n = this,
                o = 0; o < t; o += 1)r(o); this._resize(), window.addEventListener("resize",
                this._resizeHandler)}, t.prototype._draw = function(t) {
              var e = t.per, r = t.alter, i = t.digit, n = this.ctnrArr[0].clientHeight/(this.systemArr.length+1); n && this.height !== n && (this.height = n); var o = "translateY("+-(((e*r+this.beforeArr[i])%10+10)%10)*(this.height || 0)+"px)"; this.ctnrArr[i].style.webkitTransform = o, this.ctnrArr[i].style.transform = o
            }, t.prototype._resize = function() {
              if (this.height = this.ctnrArr[0].clientHeight/(this.systemArr.length+1), this.node.style.height = this.height+"px", this.afterArr.length)this.frame(1); else for (var t = 0, e = this.ctnrArr.length; t < e; t += 1)this._draw({
                digit: t, per: 1, alter: ~~(this.from/Math.pow(10, t))})},
            t.prototype.frame = function(t) {
              for (var e = 0, r = this.ctnrArr.length-1; r >= 0; r -= 1) {
                var i = this.afterArr[r]-this.beforeArr[r]; e += i,
                this._draw({
                  digit: r, per: this.easeFn(t), alter: this.direct?i: e
                }),
                e *= 10
              }},
            t.prototype.flipTo = function(t) {
              var e = this,
              r = t.to,
              i = t.duration,
              o = void 0 === i?0: i,
              s = t.easeFn,
              a = t.direct; s && (this.easeFn = s),
              void 0 !== a && (this.direct = a),
              this.setSelect(r); var h = this.ctnrArr.length; this.beforeArr = n(this.from, h),
              this.afterArr = n(r, h); var l = Date.now(),
              c = 1e3*o || this.duration,
              d = function() {
                var t = Date.now()-l; e.frame(t/c),
                t < c?requestAnimationFrame(d): (e.from = r, e.frame(1))}; requestAnimationFrame(d)},
            t.prototype.setSelect = function(t) {
              var e = this,
              r = this.ctnrArr.length; n(t, r).forEach((function(t, r) {
                for (var i = 0; i < e.ctnrArr[r].childNodes.length; i += 1) {
                  e.ctnrArr[r].childNodes[i].style.userSelect = i === t?"auto": "none"
                }}))}, t.prototype.destroy = function() {
              window.removeEventListener("resize", this._resizeHandler)}, t
          }()}])})))