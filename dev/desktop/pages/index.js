import Logger from "../components/logger/signals.js";
import { Register, html } from "../components/DOM.js";
import toLoad from "../components/loadDataPage.js";

const _template = html`<div id="content"></div>`;

import "./home.js";
import "./watch.js";
import "./channel.js";
import "./search.js";
import { dispatch } from "../components/Event.js";
import { EVENT_NAME_ON_NAVEGATE_START, EVENT_NAME_ON_NAVEGATE_FINISH } from "../components/vars.js";
import { get as storeGet } from "../components/config.store.js";

const getPage = (arr, pageId) => {
    let element = arr.get(pageId);
    if (!element) {
        const pageNames = {
            "WATCH": "app-watch",
            "FEED_HOME": "app-home",
            "SEARCH": "app-results",
            "CHANNEL": "app-channel"
        };

        const name = pageNames[pageId];
        if (name) {
            element = document.createElement(name);
            if (!element.inst) {
                element.innerHTML = "<span>This page is in development</span>";
            }
            arr.set(pageId, element);
        }
    }
    return element;
};

class App {
    currentPage = void 0;
    pages = new Map();

    constructor() {}

    attached() {
        // Initialization logic if needed
    }

    static get properties() {
        return {
            data: {
                type: Object,
                observer: "updatePageData"
            },
            pageId: {
                type: String,
                observer: "renderPage"
            }
        };
    }

    renderPage(pageId) {
        if (!pageId) return;

        const hasCurrentPage = !!this.currentPage;

        if (pageId === "WATCH") {
            dispatch(document, EVENT_NAME_ON_NAVEGATE_START);
            this.setPage(pageId);
            this.currentPage.isStart = hasCurrentPage;

            if (!hasCurrentPage && !this.currentPage.data) {
                this.currentPage.data = this.data;
            }
            dispatch(document, EVENT_NAME_ON_NAVEGATE_FINISH);
            this.currentPage.isStart = !hasCurrentPage;

        } else {
            if (this.is2pg) {
                toLoad(pageId, (data) => {
                    this.setPage(pageId);
                    this.data = data;
                    this.currentPage.data = this.data;
                });
            } else {
                this.setPage(pageId);
                this.currentPage.data = this.data;
            }
        }
        this.is2pg = true;
        storeGet("root").isWatchPage = (pageId === "WATCH");
    }

    setPage(pageId) {
        this.setActivePage(getPage(this.pages, pageId));
    }

    isOnWatch() {
        return this.currentPage?.is === "app-watch";
    }

    async updatePageData() {
        const data = this.data;
        Logger().processSignal("cr");
        
        return new Promise((resolve, reject) => {
            const load = () => {
                if (this.currentPage) {
                    this.currentPage.data = data;
                    resolve([this.currentPage, data]);
                } else {
                    setTimeout(load, 16);
                }
            };
            load();
        });
    }

    setActivePage(page) {
        if (!page) return;

        const currentPage = this.currentPage;
        if (page !== currentPage) {
            if (currentPage) {
                currentPage.hidden = true;
                currentPage.active = false;
                currentPage.removeAttribute("role");
            }
            this.currentPage = page;
            page.hidden = false;
            this.attachPage(page);
            page.active = true;
            page.setAttribute("role", "main");
        }
    }

    attachPage(page) {
        this.hostElement.appendChild(page);
    }
}

Register(App, "page-manager", _template);
