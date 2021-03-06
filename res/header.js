! function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = "function" == typeof require && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }
    for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) s(r[o]);
    return s
}({
    1: [function(require, module, exports) {
        "use strict";

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }

        function setup(base) {
            var manifest = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
            if (!document.body) return void _utilsDomReady2["default"](setup.bind(null, base, manifest));
            manifest.favicon = _utilsDomMeta2["default"]("favicon") || _utilsRURL2["default"](manifest.favicon, base) || "/favicon.ico", manifest.author = _utilsDomMeta2["default"]("author") || manifest.author, manifest.root = _utilsRURL2["default"](manifest.root || "/", base), _componentsToolbar2["default"](manifest), _componentsFooter2["default"](manifest);
            var tracking = _utilsDomMeta2["default"]("ga:tracking") || manifest["ga:tracking"];
            tracking && _servicesAnalytics2["default"](tracking)
        }
        var _utilsJson = require("./utils/json"),
            _utilsJson2 = _interopRequireDefault(_utilsJson),
            _utilsRURL = require("./utils/rURL"),
            _utilsRURL2 = _interopRequireDefault(_utilsRURL),
            _utilsDomMeta = require("./utils/dom/meta"),
            _utilsDomMeta2 = _interopRequireDefault(_utilsDomMeta),
            _utilsDomReady = require("./utils/dom/ready"),
            _utilsDomReady2 = _interopRequireDefault(_utilsDomReady);
        require("./utils/detect/touch"), require("./utils/polyfill/html5"), require("./utils/polyfill/viewport");
        var _servicesAnalytics = require("./services/analytics"),
            _servicesAnalytics2 = _interopRequireDefault(_servicesAnalytics),
            _componentsHelpers = require("./components/helpers"),
            _componentsHelpers2 = _interopRequireDefault(_componentsHelpers),
            _componentsToolbar = require("./components/toolbar"),
            _componentsToolbar2 = _interopRequireDefault(_componentsToolbar),
            _componentsFooter = require("./components/footer"),
            _componentsFooter2 = _interopRequireDefault(_componentsFooter);
        _utilsDomReady2["default"](_componentsHelpers2["default"]);
        var manifest_json = _utilsDomMeta2["default"]("manifest") || "/manifest.json";
        _utilsJson2["default"](manifest_json, setup.bind(null, manifest_json))
    }, {
        "./components/footer": 2,
        "./components/helpers": 3,
        "./components/toolbar": 4,
        "./services/analytics": 5,
        "./utils/detect/touch": 6,
        "./utils/dom/meta": 14,
        "./utils/dom/ready": 15,
        "./utils/json": 17,
        "./utils/polyfill/html5": 19,
        "./utils/polyfill/viewport": 20,
        "./utils/rURL": 21
    }],
    2: [function(require, module, exports) {
        "use strict";

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _utilsDomReady = require("../utils/dom/ready"),
            _utilsDomReady2 = _interopRequireDefault(_utilsDomReady),
            _utilsDomCreate = require("../utils/dom/create"),
            _utilsDomCreate2 = _interopRequireDefault(_utilsDomCreate);
        exports["default"] = function(manifest) {
            manifest.author && _utilsDomReady2["default"](function() {
                var author = manifest.author.split(/\s*,\s*/);
                author && document.body.appendChild(_utilsDomCreate2["default"]("footer", {
                    html: "Authored by " + (author[1] ? '<a href="' + author[1] + '" rel="author">' + author[0] + "</a>" : author[0])
                }))
            })
        }, module.exports = exports["default"]
    }, {
        "../utils/dom/create": 9,
        "../utils/dom/ready": 15
    }],
    3: [function(require, module, exports) {
        "use strict";

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }

        function tryitButton(pre, func) {
            var btn = _utilsDomCreate2["default"]("button", {
                html: "tryit",
                "class": "tryit"
            });
            _utilsDomInsertAfter2["default"](btn, pre), _utilsDomAddEvent2["default"](btn, "click", function() {
                if (func) func();
                else {
                    if ("function" == typeof tryit && !tryit(pre.innerText)) return;
                    setTimeout(function() {
                        eval(pre.innerText)
                    }, 100)
                }
            }), func || pre.setAttribute("contenteditable", !0)
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _utilsEach = require("../utils/each"),
            _utilsEach2 = _interopRequireDefault(_utilsEach),
            _utilsDomAddEvent = require("../utils/dom/addEvent"),
            _utilsDomAddEvent2 = _interopRequireDefault(_utilsDomAddEvent),
            _utilsDomCreate = require("../utils/dom/create"),
            _utilsDomCreate2 = _interopRequireDefault(_utilsDomCreate),
            _utilsDomInsertAfter = require("../utils/dom/insertAfter"),
            _utilsDomInsertAfter2 = _interopRequireDefault(_utilsDomInsertAfter);
        exports["default"] = function() {
            _utilsEach2["default"]("pre", function(pre) {
                ("tryit" === pre.className || "tryitoffline" === pre.className) && tryitButton(pre)
            }), _utilsEach2["default"]("script", function(script) {
                var func = script.getAttribute("data-tryit");
                func && tryitButton(script, window[func]), script.getAttribute("src") && _utilsDomAddEvent2["default"](script, "click", function() {
                    window.open(script.getAttribute("src"), "_blank")
                })
            }), _utilsEach2["default"]("link", function(script) {
                script.getAttribute("href") && _utilsDomAddEvent2["default"](script, "click", function() {
                    window.open(script.getAttribute("href"), "_blank")
                })
            })
        }, module.exports = exports["default"]
    }, {
        "../utils/dom/addEvent": 8,
        "../utils/dom/create": 9,
        "../utils/dom/insertAfter": 12,
        "../utils/each": 16
    }],
    4: [function(require, module, exports) {
        "use strict";

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }

        function buildNav() {
            function hashChange() {
                select.selectedIndex = options.indexOf(window.location.hash.substr(1))
            }
            var headings = _utilsEach2["default"]("h1,h2");
            if (document.querySelector && !(document.documentElement.className || "").match(/adorn-(nav|toc)-off/) && (_utilsEach2["default"](headings, function(tag) {
                    var ref = _utilsDomId2["default"](tag);
                    tag.insertBefore(_utilsDomCreate2["default"]("a", {
                        name: ref,
                        href: "#" + ref,
                        "class": "adorn-anchor"
                    }), tag.firstChild)
                }), !(headings.length < 2))) {
                var toc = _utilsDomCreate2["default"]("div", {
                    "class": "adorn-toc"
                });
                document.querySelector(".adorn-breadcrumbs").appendChild(toc);
                var select = _utilsDomCreate2["default"]("select"),
                    options = [];
                _utilsDomAddEvent2["default"](select, "change", function() {
                    window.location.hash = select.options[select.selectedIndex].value
                }), toc.appendChild(select);
                var _group = select;
                _utilsEach2["default"](headings, function(tag) {
                    var depth = parseInt(tag.tagName.match(/[0-9]/)[0], 10),
                        text = tag.innerText || tag.textContent || tag.innerHTML,
                        ref = _utilsDomId2["default"](tag);
                    1 === depth && (_group = _utilsDomCreate2["default"]("optgroup", {
                        label: text
                    }), select.appendChild(_group)), _group.appendChild(_utilsDomCreate2["default"]("option", {
                        html: text,
                        value: ref
                    })), options.push(ref)
                }), toc && setTimeout(function() {
                    _utilsDomAddClass2["default"](document.documentElement, "adorn-toc-on")
                }), _utilsDomAddEvent2["default"](window, "hashchange", hashChange);
                var toolbar_height = document.querySelector(".adorn-toolbar").offsetHeight || 50;
                if (_utilsDomAddEvent2["default"](window, "scroll", function(e) {
                        {
                            var tag, T = window.scrollY || window.pageYOffset;
                            "screen" in window ? window.screen.availHeight : 500
                        }
                        if (_utilsUntil2["default"](headings, function(anchor) {
                                var t = _utilsDomFindPos2["default"](anchor)[1] - toolbar_height;
                                return t > T ? !0 : void(tag = anchor)
                            }), tag) {
                            var ref = (tag.innerText || tag.innerHTML, tag.getElementsByTagName("a")[0]);
                            ref && (ref = ref.getAttribute("href").replace(/^#/, "")), "history" in window && "replaceState" in window.history && window.location.hash !== "#" + ref && history.replaceState({}, document.title, "#" + ref), hashChange()
                        }
                    }), toc) {
                    var clist = toc.classList;
                    if (clist) {
                        var tocY = _utilsDomFindPos2["default"](toc)[1];
                        _utilsDomAddEvent2["default"](window, "scroll", function(e) {
                            var sY = window.scrollY || window.pageYOffset;
                            sY > tocY ? clist.add("adorn-float") : clist.remove("adorn-float")
                        })
                    }
                }
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _utilsEach = require("../utils/each"),
            _utilsEach2 = _interopRequireDefault(_utilsEach),
            _utilsJsonp = require("../utils/jsonp"),
            _utilsJsonp2 = _interopRequireDefault(_utilsJsonp),
            _utilsUntil = require("../utils/until"),
            _utilsUntil2 = _interopRequireDefault(_utilsUntil),
            _utilsDomAddClass = require("../utils/dom/addClass"),
            _utilsDomAddClass2 = _interopRequireDefault(_utilsDomAddClass),
            _utilsDomAddEvent = require("../utils/dom/addEvent"),
            _utilsDomAddEvent2 = _interopRequireDefault(_utilsDomAddEvent),
            _utilsDomCreate = require("../utils/dom/create"),
            _utilsDomCreate2 = _interopRequireDefault(_utilsDomCreate),
            _utilsDomFindPos = require("../utils/dom/findPos"),
            _utilsDomFindPos2 = _interopRequireDefault(_utilsDomFindPos),
            _utilsDomId = require("../utils/dom/id"),
            _utilsDomId2 = _interopRequireDefault(_utilsDomId),
            _utilsDomInsertBefore = require("../utils/dom/insertBefore"),
            _utilsDomInsertBefore2 = _interopRequireDefault(_utilsDomInsertBefore),
            _utilsDomInsertAfter = require("../utils/dom/insertAfter"),
            _utilsDomMeta = (_interopRequireDefault(_utilsDomInsertAfter), require("../utils/dom/meta")),
            _utilsDomMeta2 = _interopRequireDefault(_utilsDomMeta),
            _utilsDomReady = require("../utils/dom/ready"),
            _utilsDomReady2 = _interopRequireDefault(_utilsDomReady);
        exports["default"] = function(manifest) {
            var repo_path, paths = (window.location.pathname || "").replace(/^\//g, "").split(/([^\/]+\/?)/).filter(function(s) {
                    return !!s
                }),
                url = window.location.href,
                social_btns = [],
                breadcrumbs = ['<a href="' + manifest.root + '"><img src="' + manifest.favicon + '" alt="' + window.location.hostname + '" title="' + manifest.name + '"/></a>'];
            if (_utilsEach2["default"](paths, function(val, index) {
                    breadcrumbs.push('<a href="/' + paths.slice(0, index + 1).join("") + '">' + val.replace(/\.(html?)$/, "") + "</a>")
                }), manifest.github && paths.length) {
                var repo_file = (window.location.pathname || "").replace(/^\/?([^\/]+)/g, "").replace(/\/$/, "/index.html"),
                    repo = paths[0].replace(/\/$/, "");
                repo_path = "https://github.com/" + manifest.github + "/" + repo, social_btns = ['<a href="' + repo_path + "/blob/master" + repo_file + '" target="_blank" id="adorn-edit">Edit this page</a>', '<a href="' + repo_path + '" class="adorn-github-button" target="_blank" title="Stars"><i class="adorn-icon-github"></i><span class="adorn-speeach-bubble"></span></a>'], _utilsJsonp2["default"]("https://api.github.com/repos/" + manifest.github + "/" + repo + "?", function(r) {
                    _utilsEach2["default"](".adorn-github-button span.adorn-speeach-bubble", function() {
                        this.innerHTML = r.data.watchers || ""
                    })
                })
            }
            var twitter_creator = manifest["twitter:creator"] || _utilsDomMeta2["default"]("twitter:creator");
            twitter_creator && (social_btns.push(['<a href="https://twitter.com/share" class="adorn-twitter-button" target="_blank" data-via="' + twitter_creator.replace("@", "") + '" title="Tweet"><i class="adorn-icon-twitter"></i></a>', '<a href="https://twitter.com/search?ref_src=twsrc%5Etfw&q=' + encodeURIComponent(url) + '" class="adorn-twitter-count" target="_blank"><span class="adorn-speeach-bubble"></span></a>'].join("")), _utilsJsonp2["default"]("https://cdn.syndication.twitter.com/widgets/tweetbutton/count.json?url=" + encodeURIComponent(url), function(r) {
                _utilsEach2["default"](".adorn-twitter-count span.adorn-speeach-bubble", function() {
                    this.innerHTML = r.count || "", this.title = "This page has been shared " + r.count + " times, view these tweets"
                })
            })), _utilsDomInsertBefore2["default"](_utilsDomCreate2["default"]("aside", {
                "class": "adorn-toolbar",
                html: '<div class="adorn-breadcrumbs"> ' + breadcrumbs.join(" ") + '</div> <div class="adorn-links">' + social_btns.join("<span></span>") + ' <div class="clearfix"></div></div>'
            }), document.body.firstElementChild || document.body.firstChild), _utilsDomAddEvent2["default"](".adorn-twitter-button", "click", function(e) {
                var hashtag;
                e.preventDefault();
                var w = 550,
                    h = 250,
                    l = screen.width / 2 - w / 2,
                    t = screen.height / 2 - h / 2,
                    hashtag = _utilsDomMeta2["default"]("twitter:hashtag") || manifest["twitter:hashtag"];
                window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(document.title) + (hashtag ? "&hashtags=" + hashtag : "") + "&via=" + this.getAttribute("data-via") + "&url=" + encodeURIComponent(window.location.href.replace(/#.*/, "")), "twitter", "width=" + w + ",height=" + h + ",left=" + l + "px,top=" + t + "px")
            }), _utilsDomReady2["default"](buildNav)
        }, module.exports = exports["default"]
    }, {
        "../utils/dom/addClass": 7,
        "../utils/dom/addEvent": 8,
        "../utils/dom/create": 9,
        "../utils/dom/findPos": 10,
        "../utils/dom/id": 11,
        "../utils/dom/insertAfter": 12,
        "../utils/dom/insertBefore": 13,
        "../utils/dom/meta": 14,
        "../utils/dom/ready": 15,
        "../utils/each": 16,
        "../utils/jsonp": 18,
        "../utils/until": 22
    }],
    5: [function(require, module, exports) {
        "use strict";

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _utilsDomInsertBefore = require("../utils/dom/insertBefore"),
            _utilsDomInsertBefore2 = _interopRequireDefault(_utilsDomInsertBefore);
        exports["default"] = function(tracking) {
            window._gaq = window._gaq || [], _gaq.push(["_setAccount", tracking]), _gaq.push(["_trackPageview"]);
            var ga = document.createElement("script");
            ga.type = "text/javascript", ga.async = !0, ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js", _utilsDomInsertBefore2["default"](ga, document.getElementsByTagName("script")[0])
        }, module.exports = exports["default"]
    }, {
        "../utils/dom/insertBefore": 13
    }],
    6: [function(require, module, exports) {
        "use strict";

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        var _domAddClass = require("../dom/addClass"),
            _domAddClass2 = _interopRequireDefault(_domAddClass);
        _domAddClass2["default"](document.documentElement, " " + ("ontouchstart" in window ? "" : "no-") + "touch")
    }, {
        "../dom/addClass": 7
    }],
    7: [function(require, module, exports) {
        "use strict";

        function addClass(elm, className) {
            var reg = new RegExp("(^|\\s)" + className + "($|\\s)", "i");
            elm.className.match(reg) || (elm.className += " " + className)
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports["default"] = addClass, module.exports = exports["default"]
    }, {}],
    8: [function(require, module, exports) {
        "use strict";

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }

        function addEvent(obj, eventName, listener) {
            return obj instanceof window.NodeList || "string" == typeof obj ? void _each2["default"](obj, function(elm) {
                addEvent(elm, eventName, listener)
            }) : eventName === !0 ? void listener() : void(obj && (obj.addEventListener ? obj.addEventListener(eventName, listener, !1) : obj.attachEvent && ("DOMContentLoaded" === eventName && (eventName = "readystatechange", _listener = listener, listener = function() {
                "complete" === obj.readyState && _listener()
            }), obj.attachEvent("on" + eventName, listener))))
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports["default"] = addEvent;
        var _each = require("../each"),
            _each2 = _interopRequireDefault(_each);
        module.exports = exports["default"]
    }, {
        "../each": 16
    }],
    9: [function(require, module, exports) {
        "use strict";

        function create(node, attr) {
            var n = "string" == typeof node ? document.createElement(node) : node;
            if ("object" == typeof attr)
                if ("tagName" in attr) target = attr;
                else
                    for (var x in attr)
                        if (attr.hasOwnProperty(x))
                            if ("text" === x) n.appendChild(document.createTextNode(attr[x]));
                            else if ("html" === x) "string" == typeof attr[x] ? n.innerHTML = attr[x] : n.appendChild(attr[x]);
            else if ("object" == typeof attr[x])
                for (var y in attr[x]) attr[x].hasOwnProperty(y) && (n[x][y] = attr[x][y]);
            else n.setAttribute(x, attr[x]);
            return n
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports["default"] = create, module.exports = exports["default"]
    }, {}],
    10: [function(require, module, exports) {
        "use strict";

        function findPos(obj) {
            var curleft = 0,
                curtop = 0;
            if (obj.offsetParent)
                do curleft += obj.offsetLeft, curtop += obj.offsetTop; while (obj = obj.offsetParent);
            return [curleft, curtop]
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports["default"] = findPos, module.exports = exports["default"]
    }, {}],
    11: [function(require, module, exports) {
        "use strict";

        function id(tag) {
            if (tag.id) return tag.id;
            var text = tag.innerText || tag.textContent || tag.innerHTML,
                ref = text.toLowerCase().replace(/\s/g, "-").replace(/[^a-z0-9\_\-]/g, "");
            return tag.id = ref, ref
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports["default"] = id, module.exports = exports["default"]
    }, {}],
    12: [function(require, module, exports) {
        "use strict";

        function insertAfter(el, ref) {
            ref.nextSibling ? ref.parentNode.insertBefore(el, ref.nextSibling) : ref.parentNode.appendChild(el)
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports["default"] = insertAfter, module.exports = exports["default"]
    }, {}],
    13: [function(require, module, exports) {
        "use strict";

        function insertBefore(el, ref) {
            ref.parentNode.insertBefore(el, ref)
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports["default"] = insertBefore, module.exports = exports["default"]
    }, {}],
    14: [function(require, module, exports) {
        "use strict";

        function meta(name) {
            var content;
            try {
                content = document.querySelector('meta[name="' + name + '"]').content
            } catch (e) {}
            return content
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports["default"] = meta, module.exports = exports["default"]
    }, {}],
    15: [function(require, module, exports) {
        "use strict";

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }

        function ready(callback) {
            "loading" !== document.readyState && document.body ? callback() : _addEvent2["default"](document, "DOMContentLoaded", callback)
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports["default"] = ready;
        var _addEvent = require("./addEvent"),
            _addEvent2 = _interopRequireDefault(_addEvent);
        module.exports = exports["default"]
    }, {
        "./addEvent": 8
    }],
    16: [function(require, module, exports) {
        "use strict";

        function each(matches, callback) {
            if ("string" == typeof matches && (matches = document.querySelectorAll(matches)), callback)
                for (var i = 0; i < matches.length; i++) callback.call(matches[i], matches[i], i);
            return matches || []
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports["default"] = each, module.exports = exports["default"]
    }, {}],
    17: [function(require, module, exports) {
        "use strict";

        function json(url, callback) {
            var x = new XMLHttpRequest;
            x.onload = function() {
                var v;
                try {
                    v = JSON.parse(x.response)
                } catch (e) {}
                callback(v)
            }, x.onerror = callback, x.open("GET", url), x.send()
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports["default"] = json, module.exports = exports["default"]
    }, {}],
    18: [function(require, module, exports) {
        "use strict";

        function jsonp(url, callback) {
            var callback_name = "jsonp_document_" + counter++;
            window[callback_name] = callback;
            var sibling = document.getElementsByTagName("script")[0],
                script = document.createElement("script");
            script.src = url + "&callback=" + callback_name, script.async = !0, sibling.parentNode.insertBefore(script, sibling)
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports["default"] = jsonp;
        var counter = 0;
        module.exports = exports["default"]
    }, {}],
    19: [function(require, module, exports) {
        "use strict";

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        var _each = require("../each"),
            _each2 = _interopRequireDefault(_each);
        _each2["default"]("header,section,datalist,option,footer,nav,menu,aside,article,style,script".split(","), function(tag) {
            return document.createElement(tag)
        })
    }, {
        "../each": 16
    }],
    20: [function(require, module, exports) {
        "use strict";

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        var _domInsertBefore = require("../dom/insertBefore"),
            _domInsertBefore2 = _interopRequireDefault(_domInsertBefore),
            _domCreate = require("../dom/create"),
            _domCreate2 = _interopRequireDefault(_domCreate);
        _domInsertBefore2["default"](_domCreate2["default"]("meta", {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        }), document.getElementsByTagName("script")[0])
    }, {
        "../dom/create": 9,
        "../dom/insertBefore": 13
    }],
    21: [function(require, module, exports) {
        "use strict";

        function rURL(path, relative) {
            if (!path) return "";
            try {
                return new URL(path, new URL(relative, window.location)).href
            } catch (e) {
                return path
            }
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports["default"] = rURL, module.exports = exports["default"]
    }, {}],
    22: [function(require, module, exports) {
        "use strict";

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }

        function until(matches, callback) {
            var b = !1;
            _each2["default"](matches, function(item) {
                b || (b = callback.call(item, item))
            })
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports["default"] = until;
        var _each = require("./each"),
            _each2 = _interopRequireDefault(_each);
        module.exports = exports["default"]
    }, {
        "./each": 16
    }]
}, {}, [1]);
//# sourceMappingURL=adorn.js.map
