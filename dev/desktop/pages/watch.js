import { Register, html } from "../components/DOM.js";
import { get as storeGet } from "../components/config.store.js";
import { 
    getEventNameFullScreenChange, 
    getQueryParameter, 
    getFullScreenElement 
} from "../components/utils.js";
import { Load, loadNextPage } from "../components/loadDataPage.js";
import { 
    EVENT_NAME_ON_NAVEGATE_START, 
    EVENT_NAME_ON_NAVEGATE_FINISH 
} from "../components/vars.js";

const _template = html`
<div id="container">
    <div id="full-player"></div>
    <div id="column">
        <div id="primaty">
            <div id="player--c">
                <app-player get-player="{{getPlayer}}"></app-player>
            </div>
            <div id="primaty-detalis">
                <div class="skeleton-info">
                    <div class="color-skeleton title" hidden="[[data.playerOverlays.videoDetalis.title]]"></div>
                </div>
                <div id="primaty-information-v2">
                    <h2 role="text" class="video-information-title">
                        {{title}}
                    </h2>
                    <span class="text-information">
                        <app-text-number number="{{viewCount}}"></app-text-number>
                        <span> • </span>
                        <span>Viewers</span>
                    </span>
                </div>
            </div>
            <div id="primaty-information">
                <app-card-owner data="{{data.playerOverlays.owner}}"></app-card-owner>
            </div>
            <app-description></app-description>
            <div id="column-mode-content"></div>
            <div>...</div>
        </div>
        <div id="secondary">
            <div id="secondary-content">
                <list-card-video-column data="{{data.content.results}}"></list-card-video-column>
            </div>
        </div>
    </div>
</div>
`;

const fetchPlayerData = async (videoId) => {
    return await Load({ videoId }, "/v1/player");
};
const updateded = function(scope,callback){
  window.clearTimeout(scope._intervalUpdated);
  scope._intervalUpdated = setTimeout(function Updated(){
    scope._intervalUpdated = void 0;
    callback(()=>{
      updateded(scope,callback)
    });
  },60*1000)
}
class Watch {
    constructor() {
        this.resizeObserver = new ResizeObserver((entries) => this.resize(entries));
        this.listen(document, getEventNameFullScreenChange(document), () => {
            this.fullscreen = !!getFullScreenElement(false);
        });
        this.listen(document, EVENT_NAME_ON_NAVEGATE_FINISH, this.onFinishNavegate.bind(this));
    }

    async onFinishNavegate() {
        const id = getQueryParameter(location.href, "v");
        if (this.videoId !== id) {
            this.videoId = id;
        }
    }

    ready() {
        this.resize();
    }

    attached() {
        this.resizeObserver.observe(this.hostElement);
    }

    detached() {
        this.resizeObserver.unobserve(this.hostElement);
    }

    static get properties() {
        return {
            isRow: { type: Boolean, reflectToAttribute: true },
            videoId: { type: String, reflectToAttribute: true, observer: "onChangeVideoId" },
            fullscreen: { type: Boolean, reflectToAttribute: true },
            data: { type: Object, observer: "onChangeData" },
            prodata: { type: Object, observer: "onChangeProData" },
            fullPlayerActive: { type: Boolean, reflectToAttribute: true, computed: "computedIsFullMode(fullscreen)", observer: "toFullPlayer" },
            isStart: Boolean,
            onLoadData: Function,
            title: String,
            viewCount: String,
        };
    }

    async onChangeVideoId(newId, oldId) {
        if (!this.data?.playerOverlays?.videoId|| ((newId || this.videoId) && this.data?.playerOverlays?.videoId !== (newId || this.videoId))) {
            const data = await fetchPlayerData(this.videoId);
            this.updateDataPlayer(data);

            if ((/^\/live\//.test(location.pathname) || location.pathname === "/watch") && newId) {
                const nextPageData = await loadNextPage(newId);
                this.can__ = true;
                this.data = nextPageData;
                this.onLoadData?.();
            }
        }
    }

    onChangeData(data) {
      
      this.title = data?.playerOverlays?.videoDetalis?.title
      this.viewCount = data?.playerOverlays?.viewCount?.count
        if (this.can__) {
            this.can__ = false;
            return;
        }
        updateded(this,async (newCall) => {
          const videoId = this.videoId
          if(!this.active)return;
          const { updated } = await Load({ videoId }, "/v1/updatedata");
          if(!this.active)return;
          this.title = updated?.title
          this.viewCount = updated?.viewCount?.count
          newCall()
        })
        if (!this.videoId) {
            this.can = false;
            this.videoId = data.playerOverlays?.videoId;
        }

        if (data.playerOverlays?.videoId === this.videoId) {
            this.prodata = data;
        } else {
            this.videoId = data.playerOverlays?.videoId;
            // fetch next data if needed
        }
    }

    toFullPlayer(isFull) {
        const playerFull = this.hostElement.querySelector("#full-player");
        const playerContent = this.hostElement.querySelector("#player--c");
        const primaryColumn = this.hostElement.querySelector("#column>#primaty");
        
        if (isFull) {
            playerFull.appendChild(playerContent);
        } else {
            primaryColumn.insertBefore(playerContent, primaryColumn.firstChild);
        }
    }

    computedIsFullMode(full, tha) {
        return full || tha;
    }

    resize() {
        const isRow = this.hostElement.clientWidth < 800;
        
        if (this.isRow === isRow) return;

        const columnContent = this.hostElement.querySelector("#column-mode-content");
        const leftContent = this.hostElement.querySelector("#secondary-content");
        const secondary = this.hostElement.querySelector("#secondary");

        if (leftContent && secondary && columnContent) {
            if (isRow) {
                columnContent.appendChild(leftContent);
            } else {
                secondary.appendChild(leftContent);
            }
            this.isRow = isRow;
        }
    }

    getPlayer(M = this) {
        const _get = () => {
            let element = lsd ?? (lsd = document.querySelector(".html5-video-player"));
            if (!element) {
                const player = window.player.create(M.hostElement, {}, {});
                lsd = M.hostElement.querySelector(".html5-video-player");
                element = lsd;
            }
            return element ? { element } : null;
        };
        return _get();
    }

    updateDataPlayer(data) {
        const { element } = this.getPlayer();
        element.updateData(data);
    }
}

let lsd = void 0;
Register(Watch, "app-watch", _template);
