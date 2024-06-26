import anime from "./svg_animate.js";
import { Element } from "../utils/Dom.js";
export const play = function () {
    return {
        _tag: "svg",
        _attrs: {
            height: "100%",
            version: "1.1",
            viewBox: "0 0 36 36",
            width: "100%"
        },
        _childs: [
            {
                _tag: "path",
                zc: !0,
                _className: "app-svg-fill",
                _attrs: {
                    d: "M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z"
                }
            }
        ]
    };
};
export const pause = function () {
    return {
        _tag: "svg",
        _attrs: {
            height: "100%",
            version: "1.1",
            viewBox: "0 0 36 36",
            width: "100%"
        },
        _childs: [
            {
                _tag: "path",
                zc: !0,
                _className: "app-svg-fill",
                _attrs: {
                    d: "M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z"
                }
            }
        ]
    };
};
export const getSwitchIconPlay = function SIP(status) {
    let icon;
    switch (status) {
        case 1:
            icon = play();
            break;
        case 2:
            icon = pause();
            break;
    }
    return icon;
};
export const Anime = function AN(_this, el, newPathData, isS) {
    const svg = el.querySelector("svg") || createSvg(newPathData, el);
    const path = svg?.querySelector("path");
    newPathData = newPathData._childs[0]._attrs.d;
    if (isS) {
        path?.setAttribute("d", newPathData);
        return;
    }
    const newPath = path?.cloneNode(true);
    if (!newPath) return;
    newPath.setAttribute("id", "newPath");
    newPath.setAttribute("d", newPathData);
    svg.appendChild(newPath);

    anime.set(newPath, {
        opacity: 0
    });

    anime({
        targets: path,
        d: newPathData,
        easing: "easeInOutQuad",
        duration: _this.duration || 250,
        complete: function () {
            anime.set(newPath, {
                opacity: 1
            });
            svg.removeChild(newPath);
        }
    });
};
function createSvg(data,parent){
  const svg = new Element(data);
  svg._appendTo(parent);
  return svg.element
}