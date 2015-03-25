// (function(){"use strict";if(!window.XDomainRequest){return}if("withCredentials"in new window.XMLHttpRequest){return}if(window.XMLHttpRequest.supportsXDR===true){return}var e=window.XMLHttpRequest;var t=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/;var n=/^https?:\/\//i;var r=/^get|post$/i;var i=new RegExp("^"+location.protocol,"i");var s=function(e,s,o){var u=s;var a;var f;var l;var c;try{if(u&&u.indexOf("://")<0&&document.getElementsByTagName("base").length>0){a=document.getElementsByTagName("base")[0].href;if(a){u=a+u}}f=t.exec(location.href);l=t.exec(u);c=f[2].toLowerCase()!==l[2].toLowerCase();return c&&o&&r.test(e)&&n.test(u)&&i.test(u)}catch(h){return false}};window.XMLHttpRequest=function(){var e=this;this._setReadyState=function(t){if(e.readyState!==t){e.readyState=t;if(typeof e.onreadystatechange==="function"){e.onreadystatechange()}}};this.readyState=0;this.responseText="";this.status=0;this.statusText="";this.withCredentials=false};window.XMLHttpRequest.prototype.open=function(t,n,r){var i=this;var o;if(s(t,n,r)){o=new XDomainRequest;o.onerror=function(){i.status=400;i.statusText="Error";i._setReadyState(0);if(i.onerror){i.onerror()}};o.ontimeout=function(){i.status=408;i.statusText="Timeout";i._setReadyState(2);if(i.ontimeout){i.ontimeout()}};o.onload=function(){i.responseText=o.responseText;i.status=200;i.statusText="OK";i._setReadyState(4);if(i.onload){i.onload()}}}else{o=new e;o.withCredentials=this.withCredentials;o.onreadystatechange=function(){if(o.readyState===4){i.status=o.status;i.statusText=o.statusText;i.responseText=o.responseText;i.responseXML=o.responseXML}i._setReadyState(o.readyState)};o.onabort=function(){if(i.onabort){i.onabort.apply(i,arguments)}};o.onerror=function(){if(i.onerror){i.onerror.apply(i,arguments)}};o.onload=function(){if(i.onload){i.onload.apply(i,arguments)}};o.onloadend=function(){if(i.onloadend){i.onloadend.apply(i,arguments)}};o.onloadstart=function(){if(i.onloadstart){i.onloadstart.apply(i,arguments)}};o.onprogress=function(){if(i.onprogress){i.onprogress.apply(i,arguments)}}}this._request=o;o.open.apply(o,arguments);this._setReadyState(1)};window.XMLHttpRequest.prototype.abort=function(){this._request.abort();this._setReadyState(0);this.onreadystatechange=null};window.XMLHttpRequest.prototype.send=function(e){this._request.withCredentials=this.withCredentials;this._request.send(e);if(this._request.readyState===4){this.status=this._request.status;this.statusText=this._request.statusText;this.responseText=this._request.responseText;this.readyState=this._request.readyState}else{this._setReadyState(2)}};window.XMLHttpRequest.prototype.setRequestHeader=function(){if(this._request.setRequestHeader){this._request.setRequestHeader.apply(this._request,arguments)}};window.XMLHttpRequest.prototype.getAllResponseHeaders=function(){if(this._request.getAllResponseHeaders){return this._request.getAllResponseHeaders()}else{return"Content-Length: "+this.responseText.length+"\r\nContent-Type:"+this._request.contentType}};window.XMLHttpRequest.prototype.getResponseHeader=function(e){if(this._request.getResponseHeader){return this._request.getResponseHeader.apply(this._request,arguments)}if(typeof e!=="string"){return}e=e.toLowerCase();if(e==="content-type"){return this._request.contentType}else if(e==="content-length"){return this.responseText.length}};window.XMLHttpRequest.supportsXDR=true})();!function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=b.elements;return"string"==typeof e?e.split(" "):e}function i(e,t){var n=b.elements;"string"!=typeof n&&(n=n.join(" ")),"string"!=typeof e&&(e=e.join(" ")),b.elements=n+" "+e,f(t)}function s(e){var t=y[e[m]];return t||(t={},g++,e[m]=g,y[g]=t),t}function o(e,n,r){if(n||(n=t),c)return n.createElement(e);r||(r=s(n));var i;return i=r.cache[e]?r.cache[e].cloneNode():v.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),!i.canHaveChildren||d.test(e)||i.tagUrn?i:r.frag.appendChild(i)}function u(e,n){if(e||(e=t),c)return e.createDocumentFragment();n=n||s(e);for(var i=n.frag.cloneNode(),o=0,u=r(),a=u.length;a>o;o++)i.createElement(u[o]);return i}function a(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return b.shivMethods?o(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-:]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(b,t.frag)}function f(e){e||(e=t);var r=s(e);return!b.shivCSS||l||r.hasCSS||(r.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),c||a(e,r),e}var l,c,h="3.7.2",p=e.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,v=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,m="_html5shiv",g=0,y={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",l="hidden"in e,c=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){l=!0,c=!0}}();var b={elements:p.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:h,shivCSS:p.shivCSS!==!1,supportsUnknownElements:c,shivMethods:p.shivMethods!==!1,type:"default",shivDocument:f,createElement:o,createDocumentFragment:u,addElements:i};e.html5=b,f(t)}(this,document)

(function() {
    "use strict";
    if (!window.XDomainRequest) {
        return
    }
    if ("withCredentials" in new window.XMLHttpRequest) {
        return
    }
    if (window.XMLHttpRequest.supportsXDR === true) {
        return
    }
    var e = window.XMLHttpRequest;
    var t = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/;
    var n = /^https?:\/\//i;
    var r = /^get|post$/i;
    var i = new RegExp("^" + location.protocol, "i");
    var s = function(e, s, o) {
        var u = s;
        var a;
        var f;
        var l;
        var c;
        try {
            if (u && u.indexOf("://") < 0 && document.getElementsByTagName("base").length > 0) {
                a = document.getElementsByTagName("base")[0].href;
                if (a) {
                    u = a + u
                }
            }
            f = t.exec(location.href);
            l = t.exec(u);
            c = f[2].toLowerCase() !== l[2].toLowerCase();
            return c && o && r.test(e) && n.test(u) && i.test(u)
        } catch (h) {
            return false
        }
    };
    window.XMLHttpRequest = function() {
        var e = this;
        this._setReadyState = function(t) {
            if (e.readyState !== t) {
                e.readyState = t;
                if (typeof e.onreadystatechange === "function") {
                    e.onreadystatechange()
                }
            }
        };
        this.readyState = 0;
        this.responseText = "";
        this.status = 0;
        this.statusText = "";
        this.withCredentials = false
    };
    window.XMLHttpRequest.prototype.open = function(t, n, r) {
        var i = this;
        var o;
        if (s(t, n, r)) {
            o = new XDomainRequest;
            o.onerror = function() {
                i.status = 400;
                i.statusText = "Error";
                i._setReadyState(0);
                if (i.onerror) {
                    i.onerror()
                }
            };
            o.ontimeout = function() {
                i.status = 408;
                i.statusText = "Timeout";
                i._setReadyState(2);
                if (i.ontimeout) {
                    i.ontimeout()
                }
            };
            o.onload = function() {
                i.responseText = o.responseText;
                i.status = 200;
                i.statusText = "OK";
                i._setReadyState(4);
                if (i.onload) {
                    i.onload()
                }
            }
        } else {
            o = new e;
            o.withCredentials = this.withCredentials;
            o.onreadystatechange = function() {
                if (o.readyState === 4) {
                    i.status = o.status;
                    i.statusText = o.statusText;
                    i.responseText = o.responseText;
                    i.responseXML = o.responseXML
                }
                i._setReadyState(o.readyState)
            };
            o.onabort = function() {
                if (i.onabort) {
                    i.onabort.apply(i, arguments)
                }
            };
            o.onerror = function() {
                if (i.onerror) {
                    i.onerror.apply(i, arguments)
                }
            };
            o.onload = function() {
                if (i.onload) {
                    i.onload.apply(i, arguments)
                }
            };
            o.onloadend = function() {
                if (i.onloadend) {
                    i.onloadend.apply(i, arguments)
                }
            };
            o.onloadstart = function() {
                if (i.onloadstart) {
                    i.onloadstart.apply(i, arguments)
                }
            };
            o.onprogress = function() {
                if (i.onprogress) {
                    i.onprogress.apply(i, arguments)
                }
            }
        }
        this._request = o;
        o.open.apply(o, arguments);
        this._setReadyState(1)
    };
    window.XMLHttpRequest.prototype.abort = function() {
        this._request.abort();
        this._setReadyState(0);
        this.onreadystatechange = null
    };
    window.XMLHttpRequest.prototype.send = function(e) {
        this._request.withCredentials = this.withCredentials;
        this._request.send(e);
        if (this._request.readyState === 4) {
            this.status = this._request.status;
            this.statusText = this._request.statusText;
            this.responseText = this._request.responseText;
            this.readyState = this._request.readyState
        } else {
            this._setReadyState(2)
        }
    };
    window.XMLHttpRequest.prototype.setRequestHeader = function() {
        if (this._request.setRequestHeader) {
            this._request.setRequestHeader.apply(this._request, arguments)
        }
    };
    window.XMLHttpRequest.prototype.getAllResponseHeaders = function() {
        if (this._request.getAllResponseHeaders) {
            return this._request.getAllResponseHeaders()
        } else {
            return "Content-Length: " + this.responseText.length + "\r\nContent-Type:" + this._request.contentType
        }
    };
    window.XMLHttpRequest.prototype.getResponseHeader = function(e) {
        if (this._request.getResponseHeader) {
            return this._request.getResponseHeader.apply(this._request, arguments)
        }
        if (typeof e !== "string") {
            return
        }
        e = e.toLowerCase();
        if (e === "content-type") {
            return this._request.contentType
        } else if (e === "content-length") {
            return this.responseText.length
        }
    };
    window.XMLHttpRequest.supportsXDR = true
})();
! function(e, t) {
    function n(e, t) {
        var n = e.createElement("p"),
            r = e.getElementsByTagName("head")[0] || e.documentElement;
        return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild)
    }

    function r() {
        var e = b.elements;
        return "string" == typeof e ? e.split(" ") : e
    }

    function i(e, t) {
        var n = b.elements;
        "string" != typeof n && (n = n.join(" ")), "string" != typeof e && (e = e.join(" ")), b.elements = n + " " + e, f(t)
    }

    function s(e) {
        var t = y[e[m]];
        return t || (t = {}, g++, e[m] = g, y[g] = t), t
    }

    function o(e, n, r) {
        if (n || (n = t), c) return n.createElement(e);
        r || (r = s(n));
        var i;
        return i = r.cache[e] ? r.cache[e].cloneNode() : v.test(e) ? (r.cache[e] = r.createElem(e)).cloneNode() : r.createElem(e), !i.canHaveChildren || d.test(e) || i.tagUrn ? i : r.frag.appendChild(i)
    }

    function u(e, n) {
        if (e || (e = t), c) return e.createDocumentFragment();
        n = n || s(e);
        for (var i = n.frag.cloneNode(), o = 0, u = r(), a = u.length; a > o; o++) i.createElement(u[o]);
        return i
    }

    function a(e, t) {
        t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function(n) {
            return b.shivMethods ? o(n, e, t) : t.createElem(n)
        }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + r().join().replace(/[\w\-:]+/g, function(e) {
            return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
        }) + ");return n}")(b, t.frag)
    }

    function f(e) {
        e || (e = t);
        var r = s(e);
        return !b.shivCSS || l || r.hasCSS || (r.hasCSS = !!n(e, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), c || a(e, r), e
    }
    var l, c, h = "3.7.2",
        p = e.html5 || {},
        d = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
        v = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
        m = "_html5shiv",
        g = 0,
        y = {};
    ! function() {
        try {
            var e = t.createElement("a");
            e.innerHTML = "<xyz></xyz>", l = "hidden" in e, c = 1 == e.childNodes.length || function() {
                t.createElement("a");
                var e = t.createDocumentFragment();
                return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement
            }()
        } catch (n) {
            l = !0, c = !0
        }
    }();
    var b = {
        elements: p.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
        version: h,
        shivCSS: p.shivCSS !== !1,
        supportsUnknownElements: c,
        shivMethods: p.shivMethods !== !1,
        type: "default",
        shivDocument: f,
        createElement: o,
        createDocumentFragment: u,
        addElements: i
    };
    e.html5 = b, f(t)
}(this, document)
