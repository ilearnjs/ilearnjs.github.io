/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SOURCES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return SOURCES_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HEADLINES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return HEADLINES_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APIKEY; });
const MAIN_URL = 'https://newsapi.org/v2';
const SOURCES = 'sources';
const SOURCES_URL = `${MAIN_URL}/${SOURCES}`;
const HEADLINES = 'top-headlines';
const HEADLINES_URL = `${MAIN_URL}/${HEADLINES}`;
const APIKEY = '89b192969337425eb66621910ff1f9e8';



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Template {
    getElement() {
        const template = document.createElement('template');
        template.innerHTML = this.getHtml();

        return template.content;
    }

    $if(condition, result) {
        return condition ? result : '';
    }

    getHtml() {
        throw new Error('The method must be overriden');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Template;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_news_data_service__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_news_rendering_service__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_news_routing_service__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__news_constants__ = __webpack_require__(0);





const dataService = new __WEBPACK_IMPORTED_MODULE_0__services_news_data_service__["a" /* NewsDataService */]();
const renderingService = new __WEBPACK_IMPORTED_MODULE_1__services_news_rendering_service__["a" /* NewsRenderingService */]();

const routes = [
    {
        url: __WEBPACK_IMPORTED_MODULE_3__news_constants__["d" /* SOURCES */],
        action: () => {
            dataService.getSources()
                .then(sources => renderingService.renderContent(sources, 'sources'))
                .catch(ex => alert(ex));
        },
    },
    {
        url: __WEBPACK_IMPORTED_MODULE_3__news_constants__["b" /* HEADLINES */],
        action: (params) => {
            dataService.getHeadlines(params)
                .then(headLines => renderingService.renderContent(headLines, 'headlines'))
                .catch(ex => alert(ex));
        },
    },
];

const routingService = new __WEBPACK_IMPORTED_MODULE_2__services_news_routing_service__["a" /* NewsRoutingService */](routes);
const route = () => routingService.route(location.hash);

window.addEventListener('hashchange', route);
window.addEventListener('load', route);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__news_constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_source_model__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_headline_model__ = __webpack_require__(5);




class NewsDataService {
    getSources() {
        const url = new URL(__WEBPACK_IMPORTED_MODULE_0__news_constants__["e" /* SOURCES_URL */]);

        return this.request(url)
            .then(json => json.sources.map(s => new __WEBPACK_IMPORTED_MODULE_1__models_source_model__["a" /* Source */](s)));
    };

    getHeadlines(params) {
        const url = new URL(__WEBPACK_IMPORTED_MODULE_0__news_constants__["c" /* HEADLINES_URL */]);

        return this.request(url, params)
            .then(json => json.articles.map(a => new __WEBPACK_IMPORTED_MODULE_2__models_headline_model__["a" /* Headline */](a)));
    };

    request(url, params = {}) {
        Object.assign(params, { APIKEY: __WEBPACK_IMPORTED_MODULE_0__news_constants__["a" /* APIKEY */] });
        Object.keys(params)
            .forEach(key => url.searchParams.append(key, params[key]));

        return fetch(url)
            .then(data => data.json());
    };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = NewsDataService;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template_model__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__news_constants__ = __webpack_require__(0);



class Source extends __WEBPACK_IMPORTED_MODULE_0__template_model__["a" /* Template */] {
    constructor(source) {
        super();
        this.id = source.id;
        this.name = source.name;
        this.url = source.url;
    }

    getHtml() {
        return `
        <div class="source">
            <a 
                href="#${__WEBPACK_IMPORTED_MODULE_1__news_constants__["b" /* HEADLINES */]}?sources=${this.id}" 
                style="background-image:url(${this.getLink()})" 
                title=" ${this.name}">
            </a>
        </div>
        `;
    }

    getLink() {
        return `https://icons.better-idea.org/icon?url=${this.url}&size=70..120..200`;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Source;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template_model__ = __webpack_require__(1);


class Headline extends __WEBPACK_IMPORTED_MODULE_0__template_model__["a" /* Template */] {
    constructor(headline) {
        super();
        this.title = headline.title;
        this.url = headline.url;
        this.urlToImage = headline.urlToImage;
        this.publishedAt = headline.publishedAt;
        this.description = headline.description;
    }

    getHtml() {
        return `
        <div class="headline">
            <span class="title">
                ${this.title}
            </span>
            <span class="publishedAt">
                Published at ${this.getDateString(this.publishedAt)}
            </span>
            ${this.$if(this.urlToImage, `
                <div class="image">
                    <img src="${this.urlToImage}">
                </div>
            `)} 
            <div class="article">
                <span class="description">
                    ${this.description}
                </span>
                <span class="link">
                    <a href="${this.url}" target="_blank">
                        Go to article
                    </a>
                </span>
            </div>
        </div>
        `;
    }

    getDateString(d) {
        let date = new Date(d);
        return date.toLocaleString();
    };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Headline;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_container_model__ = __webpack_require__(7);


class NewsRenderingService {
    constructor() {
        this.contentElement = document.getElementById('content');
    }

    renderContent(items, id) {
        this.clearContent();
        const container = new __WEBPACK_IMPORTED_MODULE_0__models_container_model__["a" /* Container */](id).getElement().firstElementChild;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const element = item.getElement();
            container.appendChild(element);
        }
        this.addContent(container);
    }

    addContent(element) {
        this.contentElement.appendChild(element);
    }

    clearContent() {
        this.contentElement.innerHTML = '';
    };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = NewsRenderingService;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template_model__ = __webpack_require__(1);


class Container extends __WEBPACK_IMPORTED_MODULE_0__template_model__["a" /* Template */] {
    constructor(id) {
        super();
        this.id = id;
    }

    getHtml() {
        return `
        <div id="${this.id}">
        </div>
        `;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Container;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class NewsRoutingService {
    constructor(routes) {
        this.routes = routes;
    }

    route(hash) {
        const parsedHash = this.parseHash(hash);
        const route = this.getRoute(parsedHash.routeUrl);
        route.action(parsedHash.params);
    }

    parseHash(hash) {
        const hashParts = (location.hash.slice(1) || '').split('?');
        const parsed = {};
        parsed.routeUrl = hashParts[0];
        parsed.params = {};

        if (hashParts.length > 1) {
            const params = hashParts[1].split('&');
            for (let i = 0, param; i < params.length; i++) {
                param = params[i].split('=')
                parsed.params[param[0]] = param[1];
            }
        }

        return parsed;
    };

    getRoute(routeUrl) {
        return this.routes.find(r => r.url.toLowerCase() === routeUrl.toLowerCase()) 
            || this.routes[0];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = NewsRoutingService;


/***/ })
/******/ ]);