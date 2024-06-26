import Disposable from "../utils/Disposable.js";
export class PlayerContextConfigManager extends Disposable {
    userAge = NaN;
    controlsType = "0";
    constructor(args, contextConfig) {
        super();
        this.webPlayerContextConfig = contextConfig;
        let url;
        try {
            url = document.location.toString();
        } catch (_) {
            url = "";
        }
        this._url = url;
        let ancestorOrigins = window.location.ancestorOrigins;
        if (ancestorOrigins) {
            this.ancestorOrigins = Array.from(ancestorOrigins);
        }
        else {
            this.ancestorOrigins = [];
        }
        this.protocol = 0 === this._url.indexOf("http:") ? "http" : "https";
        this._hl = 'en_US'//contextConfig ? contextConfig.hl || "en_US" : DC("en_US", a.hl);
        this._region = "US"
        this._hostLanguage = "en"
        this._controlsType = "0"
        this._config = {
          _hl: this._hl,
          _region: this._region,
          _hostLanguage: this._hostLanguage,
        }
        ;
    }
}
