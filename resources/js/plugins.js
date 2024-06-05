! function(a, b) {
    if ("function" == typeof define && define.amd) define(["module", "exports"], b);
    else if ("undefined" != typeof exports) b(module, exports);
    else {
        var c = {
            exports: {}
        };
        b(c, c.exports), a.WOW = c.exports
    }
}(this, function(a, b) {
    "use strict";

    function c(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }

    function d(a, b) {
        return b.indexOf(a) >= 0
    }

    function e(a, b) {
        for (var c in b)
            if (null == a[c]) {
                var d = b[c];
                a[c] = d
            }
        return a
    }

    function f(a) {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)
    }

    function g(a) {
        var b = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1],
            c = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2],
            d = arguments.length <= 3 || void 0 === arguments[3] ? null : arguments[3],
            e = void 0;
        return null != document.createEvent ? (e = document.createEvent("CustomEvent"), e.initCustomEvent(a, b, c, d)) : null != document.createEventObject ? (e = document.createEventObject(), e.eventType = a) : e.eventName = a, e
    }

    function h(a, b) {
        null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : "on" + b in (null != a) && a["on" + b]()
    }

    function i(a, b, c) {
        null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : a[b] = c
    }

    function j(a, b, c) {
        null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b]
    }

    function k() {
        return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
    }
    Object.defineProperty(b, "__esModule", {
        value: !0
    });
    var l, m, n = function() {
            function a(a, b) {
                for (var c = 0; c < b.length; c++) {
                    var d = b[c];
                    d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
                }
            }
            return function(b, c, d) {
                return c && a(b.prototype, c), d && a(b, d), b
            }
        }(),
        o = window.WeakMap || window.MozWeakMap || function() {
            function a() {
                c(this, a), this.keys = [], this.values = []
            }
            return n(a, [{
                key: "get",
                value: function(a) {
                    for (var b = 0; b < this.keys.length; b++) {
                        var c = this.keys[b];
                        if (c === a) return this.values[b]
                    }
                }
            }, {
                key: "set",
                value: function(a, b) {
                    for (var c = 0; c < this.keys.length; c++) {
                        var d = this.keys[c];
                        if (d === a) return this.values[c] = b, this
                    }
                    return this.keys.push(a), this.values.push(b), this
                }
            }]), a
        }(),
        p = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver || (m = l = function() {
            function a() {
                c(this, a), "undefined" != typeof console && null !== console && (console.warn("MutationObserver is not supported by your browser."), console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content."))
            }
            return n(a, [{
                key: "observe",
                value: function() {}
            }]), a
        }(), l.notSupported = !0, m),
        q = window.getComputedStyle || function(a) {
            var b = /(\-([a-z]){1})/g;
            return {
                getPropertyValue: function(c) {
                    "float" === c && (c = "styleFloat"), b.test(c) && c.replace(b, function(a, b) {
                        return b.toUpperCase()
                    });
                    var d = a.currentStyle;
                    return (null != d ? d[c] : void 0) || null
                }
            }
        },
        r = function() {
            function a() {
                var b = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                c(this, a), this.defaults = {
                    boxClass: "wow",
                    animateClass: "animated",
                    offset: 0,
                    mobile: !0,
                    live: !0,
                    callback: null,
                    scrollContainer: null
                }, this.animate = function() {
                    return "requestAnimationFrame" in window ? function(a) {
                        return window.requestAnimationFrame(a)
                    } : function(a) {
                        return a()
                    }
                }(), this.vendors = ["moz", "webkit"], this.start = this.start.bind(this), this.resetAnimation = this.resetAnimation.bind(this), this.scrollHandler = this.scrollHandler.bind(this), this.scrollCallback = this.scrollCallback.bind(this), this.scrolled = !0, this.config = e(b, this.defaults), null != b.scrollContainer && (this.config.scrollContainer = document.querySelector(b.scrollContainer)), this.animationNameCache = new o, this.wowEvent = g(this.config.boxClass)
            }
            return n(a, [{
                key: "init",
                value: function() {
                    this.element = window.document.documentElement, d(document.readyState, ["interactive", "complete"]) ? this.start() : i(document, "DOMContentLoaded", this.start), this.finished = []
                }
            }, {
                key: "start",
                value: function() {
                    var a = this;
                    if (this.stopped = !1, this.boxes = [].slice.call(this.element.querySelectorAll("." + this.config.boxClass)), this.all = this.boxes.slice(0), this.boxes.length)
                        if (this.disabled()) this.resetStyle();
                        else
                            for (var b = 0; b < this.boxes.length; b++) {
                                var c = this.boxes[b];
                                this.applyStyle(c, !0)
                            }
                    if (this.disabled() || (i(this.config.scrollContainer || window, "scroll", this.scrollHandler), i(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live) {
                        var d = new p(function(b) {
                            for (var c = 0; c < b.length; c++)
                                for (var d = b[c], e = 0; e < d.addedNodes.length; e++) {
                                    var f = d.addedNodes[e];
                                    a.doSync(f)
                                }
                        });
                        d.observe(document.body, {
                            childList: !0,
                            subtree: !0
                        })
                    }
                }
            }, {
                key: "stop",
                value: function() {
                    this.stopped = !0, j(this.config.scrollContainer || window, "scroll", this.scrollHandler), j(window, "resize", this.scrollHandler), null != this.interval && clearInterval(this.interval)
                }
            }, {
                key: "sync",
                value: function() {
                    p.notSupported && this.doSync(this.element)
                }
            }, {
                key: "doSync",
                value: function(a) {
                    if ("undefined" != typeof a && null !== a || (a = this.element), 1 === a.nodeType) {
                        a = a.parentNode || a;
                        for (var b = a.querySelectorAll("." + this.config.boxClass), c = 0; c < b.length; c++) {
                            var e = b[c];
                            d(e, this.all) || (this.boxes.push(e), this.all.push(e), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(e, !0), this.scrolled = !0)
                        }
                    }
                }
            }, {
                key: "show",
                value: function(a) {
                    return this.applyStyle(a), a.className = a.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(a), h(a, this.wowEvent), i(a, "animationend", this.resetAnimation), i(a, "oanimationend", this.resetAnimation), i(a, "webkitAnimationEnd", this.resetAnimation), i(a, "MSAnimationEnd", this.resetAnimation), a
                }
            }, {
                key: "applyStyle",
                value: function(a, b) {
                    var c = this,
                        d = a.getAttribute("data-wow-duration"),
                        e = a.getAttribute("data-wow-delay"),
                        f = a.getAttribute("data-wow-iteration");
                    return this.animate(function() {
                        return c.customStyle(a, b, d, e, f)
                    })
                }
            }, {
                key: "resetStyle",
                value: function() {
                    for (var a = 0; a < this.boxes.length; a++) {
                        var b = this.boxes[a];
                        b.style.visibility = "visible"
                    }
                }
            }, {
                key: "resetAnimation",
                value: function(a) {
                    if (a.type.toLowerCase().indexOf("animationend") >= 0) {
                        var b = a.target || a.srcElement;
                        b.className = b.className.replace(this.config.animateClass, "").trim()
                    }
                }
            }, {
                key: "customStyle",
                value: function(a, b, c, d, e) {
                    return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible", c && this.vendorSet(a.style, {
                        animationDuration: c
                    }), d && this.vendorSet(a.style, {
                        animationDelay: d
                    }), e && this.vendorSet(a.style, {
                        animationIterationCount: e
                    }), this.vendorSet(a.style, {
                        animationName: b ? "none" : this.cachedAnimationName(a)
                    }), a
                }
            }, {
                key: "vendorSet",
                value: function(a, b) {
                    for (var c in b)
                        if (b.hasOwnProperty(c)) {
                            var d = b[c];
                            a["" + c] = d;
                            for (var e = 0; e < this.vendors.length; e++) {
                                var f = this.vendors[e];
                                a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = d
                            }
                        }
                }
            }, {
                key: "vendorCSS",
                value: function(a, b) {
                    for (var c = q(a), d = c.getPropertyCSSValue(b), e = 0; e < this.vendors.length; e++) {
                        var f = this.vendors[e];
                        d = d || c.getPropertyCSSValue("-" + f + "-" + b)
                    }
                    return d
                }
            }, {
                key: "animationName",
                value: function(a) {
                    var b = void 0;
                    try {
                        b = this.vendorCSS(a, "animation-name").cssText
                    } catch (c) {
                        b = q(a).getPropertyValue("animation-name")
                    }
                    return "none" === b ? "" : b
                }
            }, {
                key: "cacheAnimationName",
                value: function(a) {
                    return this.animationNameCache.set(a, this.animationName(a))
                }
            }, {
                key: "cachedAnimationName",
                value: function(a) {
                    return this.animationNameCache.get(a)
                }
            }, {
                key: "scrollHandler",
                value: function() {
                    this.scrolled = !0
                }
            }, {
                key: "scrollCallback",
                value: function() {
                    if (this.scrolled) {
                        this.scrolled = !1;
                        for (var a = [], b = 0; b < this.boxes.length; b++) {
                            var c = this.boxes[b];
                            if (c) {
                                if (this.isVisible(c)) {
                                    this.show(c);
                                    continue
                                }
                                a.push(c)
                            }
                        }
                        this.boxes = a, this.boxes.length || this.config.live || this.stop()
                    }
                }
            }, {
                key: "offsetTop",
                value: function(a) {
                    for (; void 0 === a.offsetTop;) a = a.parentNode;
                    for (var b = a.offsetTop; a.offsetParent;) a = a.offsetParent, b += a.offsetTop;
                    return b
                }
            }, {
                key: "isVisible",
                value: function(a) {
                    var b = a.getAttribute("data-wow-offset") || this.config.offset,
                        c = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset,
                        d = c + Math.min(this.element.clientHeight, k()) - b,
                        e = this.offsetTop(a),
                        f = e + a.clientHeight;
                    return d >= e && f >= c
                }
            }, {
                key: "disabled",
                value: function() {
                    return !this.config.mobile && f(navigator.userAgent)
                }
            }]), a
        }();
    b["default"] = r, a.exports = b["default"]
});
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    swing: function(x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function(x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function(x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function(x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function(x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function(x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function(x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function(x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function(x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function(x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function(x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function(x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function(x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function(x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function(x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    easeInOutBounce: function(x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});
(function($, k, m, i, d) {
    var e = $(i),
        g = "waypoint.reached",
        b = function(o, n) {
            o.element.trigger(g, n);
            if (o.options.triggerOnce) {
                o.element[k]("destroy")
            }
        },
        h = function(p, o) {
            if (!o) {
                return -1
            }
            var n = o.waypoints.length - 1;
            while (n >= 0 && o.waypoints[n].element[0] !== p[0]) {
                n -= 1
            }
            return n
        },
        f = [],
        l = function(n) {
            $.extend(this, {
                element: $(n),
                oldScroll: 0,
                waypoints: [],
                didScroll: false,
                didResize: false,
                doScroll: $.proxy(function() {
                    var q = this.element.scrollTop(),
                        p = q > this.oldScroll,
                        s = this,
                        r = $.grep(this.waypoints, function(u, t) {
                            return p ? (u.offset > s.oldScroll && u.offset <= q) : (u.offset <= s.oldScroll && u.offset > q)
                        }),
                        o = r.length;
                    if (!this.oldScroll || !q) {
                        $[m]("refresh")
                    }
                    this.oldScroll = q;
                    if (!o) {
                        return
                    }
                    if (!p) {
                        r.reverse()
                    }
                    $.each(r, function(u, t) {
                        if (t.options.continuous || u === o - 1) {
                            b(t, [p ? "down" : "up"])
                        }
                    })
                }, this)
            });
            $(n).bind("scroll.waypoints", $.proxy(function() {
                if (!this.didScroll) {
                    this.didScroll = true;
                    i.setTimeout($.proxy(function() {
                        this.doScroll();
                        this.didScroll = false
                    }, this), $[m].settings.scrollThrottle)
                }
            }, this)).bind("resize.waypoints", $.proxy(function() {
                if (!this.didResize) {
                    this.didResize = true;
                    i.setTimeout($.proxy(function() {
                        $[m]("refresh");
                        this.didResize = false
                    }, this), $[m].settings.resizeThrottle)
                }
            }, this));
            e.load($.proxy(function() {
                this.doScroll()
            }, this))
        },
        j = function(n) {
            var o = null;
            $.each(f, function(p, q) {
                if (q.element[0] === n) {
                    o = q;
                    return false
                }
            });
            return o
        },
        c = {
            init: function(o, n) {
                this.each(function() {
                    var u = $.fn[k].defaults.context,
                        q, t = $(this);
                    if (n && n.context) {
                        u = n.context
                    }
                    if (!$.isWindow(u)) {
                        u = t.closest(u)[0]
                    }
                    q = j(u);
                    if (!q) {
                        q = new l(u);
                        f.push(q)
                    }
                    var p = h(t, q),
                        s = p < 0 ? $.fn[k].defaults : q.waypoints[p].options,
                        r = $.extend({}, s, n);
                    r.offset = r.offset === "bottom-in-view" ? function() {
                        var v = $.isWindow(u) ? $[m]("viewportHeight") : $(u).height();
                        return v - $(this).outerHeight()
                    } : r.offset;
                    if (p < 0) {
                        q.waypoints.push({
                            element: t,
                            offset: null,
                            options: r
                        })
                    } else {
                        q.waypoints[p].options = r
                    }
                    if (o) {
                        t.bind(g, o)
                    }
                    if (n && n.handler) {
                        t.bind(g, n.handler)
                    }
                });
                $[m]("refresh");
                return this
            },
            remove: function() {
                return this.each(function(o, p) {
                    var n = $(p);
                    $.each(f, function(r, s) {
                        var q = h(n, s);
                        if (q >= 0) {
                            s.waypoints.splice(q, 1);
                            if (!s.waypoints.length) {
                                s.element.unbind("scroll.waypoints resize.waypoints");
                                f.splice(r, 1)
                            }
                        }
                    })
                })
            },
            destroy: function() {
                return this.unbind(g)[k]("remove")
            }
        },
        a = {
            refresh: function() {
                $.each(f, function(r, s) {
                    var q = $.isWindow(s.element[0]),
                        n = q ? 0 : s.element.offset().top,
                        p = q ? $[m]("viewportHeight") : s.element.height(),
                        o = q ? 0 : s.element.scrollTop();
                    $.each(s.waypoints, function(u, x) {
                        if (!x) {
                            return
                        }
                        var t = x.options.offset,
                            w = x.offset;
                        if (typeof x.options.offset === "function") {
                            t = x.options.offset.apply(x.element)
                        } else {
                            if (typeof x.options.offset === "string") {
                                var v = parseFloat(x.options.offset);
                                t = x.options.offset.indexOf("%") ? Math.ceil(p * (v / 100)) : v
                            }
                        }
                        x.offset = x.element.offset().top - n + o - t;
                        if (x.options.onlyOnScroll) {
                            return
                        }
                        if (w !== null && s.oldScroll > w && s.oldScroll <= x.offset) {
                            b(x, ["up"])
                        } else {
                            if (w !== null && s.oldScroll < w && s.oldScroll >= x.offset) {
                                b(x, ["down"])
                            } else {
                                if (!w && s.element.scrollTop() > x.offset) {
                                    b(x, ["down"])
                                }
                            }
                        }
                    });
                    s.waypoints.sort(function(u, t) {
                        return u.offset - t.offset
                    })
                })
            },
            viewportHeight: function() {
                return (i.innerHeight ? i.innerHeight : e.height())
            },
            aggregate: function() {
                var n = $();
                $.each(f, function(o, p) {
                    $.each(p.waypoints, function(q, r) {
                        n = n.add(r.element)
                    })
                });
                return n
            }
        };
    $.fn[k] = function(n) {
        if (c[n]) {
            return c[n].apply(this, Array.prototype.slice.call(arguments, 1))
        } else {
            if (typeof n === "function" || !n) {
                return c.init.apply(this, arguments)
            } else {
                if (typeof n === "object") {
                    return c.init.apply(this, [null, n])
                } else {
                    $.error("Method " + n + " does not exist on jQuery " + k)
                }
            }
        }
    };
    $.fn[k].defaults = {
        continuous: true,
        offset: 0,
        triggerOnce: false,
        context: i
    };
    $[m] = function(n) {
        if (a[n]) {
            return a[n].apply(this)
        } else {
            return a.aggregate()
        }
    };
    $[m].settings = {
        resizeThrottle: 200,
        scrollThrottle: 100
    };
    e.load(function() {
        $[m]("refresh")
    })
})(jQuery, "waypoint", "waypoints", window);
(function(f) {
    function A(a, b, d) {
        var c = a[0],
            g = /er/.test(d) ? _indeterminate : /bl/.test(d) ? n : k,
            e = d == _update ? {
                checked: c[k],
                disabled: c[n],
                indeterminate: "true" == a.attr(_indeterminate) || "false" == a.attr(_determinate)
            } : c[g];
        if (/^(ch|di|in)/.test(d) && !e) x(a, g);
        else if (/^(un|en|de)/.test(d) && e) q(a, g);
        else if (d == _update)
            for (var f in e) e[f] ? x(a, f, !0) : q(a, f, !0);
        else if (!b || "toggle" == d) {
            if (!b) a[_callback]("ifClicked");
            e ? c[_type] !== r && q(a, g) : x(a, g)
        }
    }

    function x(a, b, d) {
        var c = a[0],
            g = a.parent(),
            e = b == k,
            u = b == _indeterminate,
            v = b == n,
            s = u ? _determinate : e ? y : "enabled",
            F = l(a, s + t(c[_type])),
            B = l(a, b + t(c[_type]));
        if (!0 !== c[b]) {
            if (!d && b == k && c[_type] == r && c.name) {
                var w = a.closest("form"),
                    p = 'input[name="' + c.name + '"]',
                    p = w.length ? w.find(p) : f(p);
                p.each(function() {
                    this !== c && f(this).data(m) && q(f(this), b)
                })
            }
            u ? (c[b] = !0, c[k] && q(a, k, "force")) : (d || (c[b] = !0), e && c[_indeterminate] && q(a, _indeterminate, !1));
            D(a, e, b, d)
        }
        c[n] && l(a, _cursor, !0) && g.find("." + C).css(_cursor, "default");
        g[_add](B || l(a, b) || "");
        g.attr("role") && !u && g.attr("aria-" + (v ? n : k), "true");
        g[_remove](F || l(a, s) || "")
    }

    function q(a, b, d) {
        var c = a[0],
            g = a.parent(),
            e = b == k,
            f = b == _indeterminate,
            m = b == n,
            s = f ? _determinate : e ? y : "enabled",
            q = l(a, s + t(c[_type])),
            r = l(a, b + t(c[_type]));
        if (!1 !== c[b]) {
            if (f || !d || "force" == d) c[b] = !1;
            D(a, e, s, d)
        }!c[n] && l(a, _cursor, !0) && g.find("." + C).css(_cursor, "pointer");
        g[_remove](r || l(a, b) || "");
        g.attr("role") && !f && g.attr("aria-" + (m ? n : k), "false");
        g[_add](q || l(a, s) || "")
    }

    function E(a, b) {
        if (a.data(m)) {
            a.parent().html(a.attr("style", a.data(m).s || ""));
            if (b) a[_callback](b);
            a.off(".i").unwrap();
            f(_label + '[for="' + a[0].id + '"]').add(a.closest(_label)).off(".i")
        }
    }

    function l(a, b, f) {
        if (a.data(m)) return a.data(m).o[b + (f ? "" : "Class")]
    }

    function t(a) {
        return a.charAt(0).toUpperCase() + a.slice(1)
    }

    function D(a, b, f, c) {
        if (!c) {
            if (b) a[_callback]("ifToggled");
            a[_callback]("ifChanged")[_callback]("if" + t(f))
        }
    }
    var m = "iCheck",
        C = m + "-helper",
        r = "radio",
        k = "checked",
        y = "un" + k,
        n = "disabled";
    _determinate = "determinate";
    _indeterminate = "in" + _determinate;
    _update = "update";
    _type = "type";
    _click = "click";
    _touch = "touchbegin.i touchend.i";
    _add = "addClass";
    _remove = "removeClass";
    _callback = "trigger";
    _label = "label";
    _cursor = "cursor";
    _mobile = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);
    f.fn[m] = function(a, b) {
        var d = 'input[type="checkbox"], input[type="' + r + '"]',
            c = f(),
            g = function(a) {
                a.each(function() {
                    var a = f(this);
                    c = a.is(d) ? c.add(a) : c.add(a.find(d))
                })
            };
        if (/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(a)) return a = a.toLowerCase(), g(this), c.each(function() {
            var c = f(this);
            "destroy" == a ? E(c, "ifDestroyed") : A(c, !0, a);
            f.isFunction(b) && b()
        });
        if ("object" != typeof a && a) return this;
        var e = f.extend({
                checkedClass: k,
                disabledClass: n,
                indeterminateClass: _indeterminate,
                labelHover: !0
            }, a),
            l = e.handle,
            v = e.hoverClass || "hover",
            s = e.focusClass || "focus",
            t = e.activeClass || "active",
            B = !!e.labelHover,
            w = e.labelHoverClass || "hover",
            p = ("" + e.increaseArea).replace("%", "") | 0;
        if ("checkbox" == l || l == r) d = 'input[type="' + l + '"]'; - 50 > p && (p = -50);
        g(this);
        return c.each(function() {
            var a = f(this);
            E(a);
            var c = this,
                b = c.id,
                g = -p + "%",
                d = 100 + 2 * p + "%",
                d = {
                    position: "absolute",
                    top: g,
                    left: g,
                    display: "block",
                    width: d,
                    height: d,
                    margin: 0,
                    padding: 0,
                    background: "#fff",
                    border: 0,
                    opacity: 0
                },
                g = _mobile ? {
                    position: "absolute",
                    visibility: "hidden"
                } : p ? d : {
                    position: "absolute",
                    opacity: 0
                },
                l = "checkbox" == c[_type] ? e.checkboxClass || "icheckbox" : e.radioClass || "i" + r,
                z = f(_label + '[for="' + b + '"]').add(a.closest(_label)),
                u = !!e.aria,
                y = m + "-" + Math.random().toString(36).substr(2, 6),
                h = '<div class="' + l + '" ' + (u ? 'role="' + c[_type] + '" ' : "");
            u && z.each(function() {
                h += 'aria-labelledby="';
                this.id ? h += this.id : (this.id = y, h += y);
                h += '"'
            });
            h = a.wrap(h + "/>")[_callback]("ifCreated").parent().append(e.insert);
            d = f('<ins class="' + C + '"/>').css(d).appendTo(h);
            a.data(m, {
                o: e,
                s: a.attr("style")
            }).css(g);
            e.inheritClass && h[_add](c.className || "");
            e.inheritID && b && h.attr("id", m + "-" + b);
            "static" == h.css("position") && h.css("position", "relative");
            A(a, !0, _update);
            if (z.length) z.on(_click + ".i mouseover.i mouseout.i " + _touch, function(b) {
                var d = b[_type],
                    e = f(this);
                if (!c[n]) {
                    if (d == _click) {
                        if (f(b.target).is("a")) return;
                        A(a, !1, !0)
                    } else B && (/ut|nd/.test(d) ? (h[_remove](v), e[_remove](w)) : (h[_add](v), e[_add](w)));
                    if (_mobile) b.stopPropagation();
                    else return !1
                }
            });
            a.on(_click + ".i focus.i blur.i keyup.i keydown.i keypress.i", function(b) {
                var d = b[_type];
                b = b.keyCode;
                if (d == _click) return !1;
                if ("keydown" == d && 32 == b) return c[_type] == r && c[k] || (c[k] ? q(a, k) : x(a, k)), !1;
                if ("keyup" == d && c[_type] == r) !c[k] && x(a, k);
                else if (/us|ur/.test(d)) h["blur" == d ? _remove : _add](s)
            });
            d.on(_click + " mousedown mouseup mouseover mouseout " + _touch, function(b) {
                var d = b[_type],
                    e = /wn|up/.test(d) ? t : v;
                if (!c[n]) {
                    if (d == _click) A(a, !1, !0);
                    else {
                        if (/wn|er|in/.test(d)) h[_add](e);
                        else h[_remove](e + " " + t);
                        if (z.length && B && e == v) z[/ut|nd/.test(d) ? _remove : _add](w)
                    }
                    if (_mobile) b.stopPropagation();
                    else return !1
                }
            })
        })
    }
})(window.jQuery || window.Zepto);
(function(d) {
    var p = {},
        e, a, h = document,
        i = window,
        f = h.documentElement,
        j = d.expando;
    d.event.special.inview = {
        add: function(a) {
            p[a.guid + "-" + this[j]] = {
                data: a,
                $element: d(this)
            }
        },
        remove: function(a) {
            try {
                delete p[a.guid + "-" + this[j]]
            } catch (d) {}
        }
    };
    d(i).bind("scroll resize", function() {
        e = a = null
    });
    !f.addEventListener && f.attachEvent && f.attachEvent("onfocusin", function() {
        a = null
    });
    setInterval(function() {
        var k = d(),
            j, n = 0;
        d.each(p, function(a, b) {
            var c = b.data.selector,
                d = b.$element;
            k = k.add(c ? d.find(c) : d)
        });
        if (j = k.length) {
            var b;
            if (!(b = e)) {
                var g = {
                    height: i.innerHeight,
                    width: i.innerWidth
                };
                if (!g.height && ((b = h.compatMode) || !d.support.boxModel)) b = "CSS1Compat" === b ? f : h.body, g = {
                    height: b.clientHeight,
                    width: b.clientWidth
                };
                b = g
            }
            e = b;
            for (a = a || {
                    top: i.pageYOffset || f.scrollTop || h.body.scrollTop,
                    left: i.pageXOffset || f.scrollLeft || h.body.scrollLeft
                }; n < j; n++)
                if (d.contains(f, k[n])) {
                    b = d(k[n]);
                    var l = b.height(),
                        m = b.width(),
                        c = b.offset(),
                        g = b.data("inview");
                    if (!a || !e) break;
                    c.top + l > a.top && c.top < a.top + e.height && c.left + m > a.left && c.left < a.left + e.width ? (m = a.left > c.left ? "right" : a.left + e.width < c.left + m ? "left" : "both", l = a.top > c.top ? "bottom" : a.top + e.height < c.top + l ? "top" : "both", c = m + "-" + l, (!g || g !== c) && b.data("inview", c).trigger("inview", [!0, m, l])) : g && b.data("inview", !1).trigger("inview", [!1])
                }
        }
    }, 250)
})(jQuery);
! function(e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.ScrollMagic = t()
}(this, function() {
    "use strict";
    var _ = function() {};
    _.version = "2.0.7", window.addEventListener("mousewheel", function() {});
    var P = "data-scrollmagic-pin-spacer";
    _.Controller = function(e) {
        var n, r, i = "REVERSE",
            t = "PAUSED",
            o = z.defaults,
            s = this,
            a = R.extend({}, o, e),
            l = [],
            c = !1,
            f = 0,
            u = t,
            d = !0,
            h = 0,
            p = !0,
            g = function() {
                0 < a.refreshInterval && (r = window.setTimeout(E, a.refreshInterval))
            },
            v = function() {
                return a.vertical ? R.get.scrollTop(a.container) : R.get.scrollLeft(a.container)
            },
            m = function() {
                return a.vertical ? R.get.height(a.container) : R.get.width(a.container)
            },
            w = this._setScrollPos = function(e) {
                a.vertical ? d ? window.scrollTo(R.get.scrollLeft(), e) : a.container.scrollTop = e : d ? window.scrollTo(e, R.get.scrollTop()) : a.container.scrollLeft = e
            },
            y = function() {
                if (p && c) {
                    var e = R.type.Array(c) ? c : l.slice(0);
                    c = !1;
                    var t = f,
                        n = (f = s.scrollPos()) - t;
                    0 !== n && (u = 0 < n ? "FORWARD" : i), u === i && e.reverse(), e.forEach(function(e, t) {
                        e.update(!0)
                    })
                }
            },
            S = function() {
                n = R.rAF(y)
            },
            b = function(e) {
                "resize" == e.type && (h = m(), u = t), !0 !== c && (c = !0, S())
            },
            E = function() {
                if (!d && h != m()) {
                    var t;
                    try {
                        t = new Event("resize", {
                            bubbles: !1,
                            cancelable: !1
                        })
                    } catch (e) {
                        (t = document.createEvent("Event")).initEvent("resize", !1, !1)
                    }
                    a.container.dispatchEvent(t)
                }
                l.forEach(function(e, t) {
                    e.refresh()
                }), g()
            };
        this._options = a;
        var x = function(e) {
            if (e.length <= 1) return e;
            var t = e.slice(0);
            return t.sort(function(e, t) {
                return e.scrollOffset() > t.scrollOffset() ? 1 : -1
            }), t
        };
        return this.addScene = function(e) {
                if (R.type.Array(e)) e.forEach(function(e, t) {
                    s.addScene(e)
                });
                else if (e instanceof _.Scene)
                    if (e.controller() !== s) e.addTo(s);
                    else if (l.indexOf(e) < 0)
                    for (var t in l.push(e), l = x(l), e.on("shift.controller_sort", function() {
                            l = x(l)
                        }), a.globalSceneOptions) e[t] && e[t].call(e, a.globalSceneOptions[t]);
                return s
            }, this.removeScene = function(e) {
                if (R.type.Array(e)) e.forEach(function(e, t) {
                    s.removeScene(e)
                });
                else {
                    var t = l.indexOf(e); - 1 < t && (e.off("shift.controller_sort"), l.splice(t, 1), e.remove())
                }
                return s
            }, this.updateScene = function(e, n) {
                return R.type.Array(e) ? e.forEach(function(e, t) {
                    s.updateScene(e, n)
                }) : n ? e.update(!0) : !0 !== c && e instanceof _.Scene && (-1 == (c = c || []).indexOf(e) && c.push(e), c = x(c), S()), s
            }, this.update = function(e) {
                return b({
                    type: "resize"
                }), e && y(), s
            }, this.scrollTo = function(e, t) {
                if (R.type.Number(e)) w.call(a.container, e, t);
                else if (e instanceof _.Scene) e.controller() === s && s.scrollTo(e.scrollOffset(), t);
                else if (R.type.Function(e)) w = e;
                else {
                    var n = R.get.elements(e)[0];
                    if (n) {
                        for (; n.parentNode.hasAttribute(P);) n = n.parentNode;
                        var r = a.vertical ? "top" : "left",
                            i = R.get.offset(a.container),
                            o = R.get.offset(n);
                        d || (i[r] -= s.scrollPos()), s.scrollTo(o[r] - i[r], t)
                    }
                }
                return s
            }, this.scrollPos = function(e) {
                return arguments.length ? (R.type.Function(e) && (v = e), s) : v.call(s)
            }, this.info = function(e) {
                var t = {
                    size: h,
                    vertical: a.vertical,
                    scrollPos: f,
                    scrollDirection: u,
                    container: a.container,
                    isDocument: d
                };
                return arguments.length ? void 0 !== t[e] ? t[e] : void 0 : t
            }, this.loglevel = function(e) {
                return s
            }, this.enabled = function(e) {
                return arguments.length ? (p != e && (p = !!e, s.updateScene(l, !0)), s) : p
            }, this.destroy = function(e) {
                window.clearTimeout(r);
                for (var t = l.length; t--;) l[t].destroy(e);
                return a.container.removeEventListener("resize", b), a.container.removeEventListener("scroll", b), R.cAF(n), null
            },
            function() {
                for (var e in a) o.hasOwnProperty(e) || delete a[e];
                if (a.container = R.get.elements(a.container)[0], !a.container) throw "ScrollMagic.Controller init failed.";
                (d = a.container === window || a.container === document.body || !document.body.contains(a.container)) && (a.container = window), h = m(), a.container.addEventListener("resize", b), a.container.addEventListener("scroll", b);
                var t = parseInt(a.refreshInterval, 10);
                a.refreshInterval = R.type.Number(t) ? t : o.refreshInterval, g()
            }(), s
    };
    var z = {
        defaults: {
            container: window,
            vertical: !0,
            globalSceneOptions: {},
            loglevel: 2,
            refreshInterval: 100
        }
    };
    _.Controller.addOption = function(e, t) {
        z.defaults[e] = t
    }, _.Controller.extend = function(e) {
        var t = this;
        _.Controller = function() {
            return t.apply(this, arguments), this.$super = R.extend({}, this), e.apply(this, arguments) || this
        }, R.extend(_.Controller, t), _.Controller.prototype = t.prototype, _.Controller.prototype.constructor = _.Controller
    }, _.Scene = function(e) {
        var n, l, c = "BEFORE",
            f = "DURING",
            u = "AFTER",
            r = D.defaults,
            d = this,
            h = R.extend({}, r, e),
            p = c,
            g = 0,
            a = {
                start: 0,
                end: 0
            },
            v = 0,
            i = !0,
            s = {};
        this.on = function(e, i) {
            return R.type.Function(i) && (e = e.trim().split(" ")).forEach(function(e) {
                var t = e.split("."),
                    n = t[0],
                    r = t[1];
                "*" != n && (s[n] || (s[n] = []), s[n].push({
                    namespace: r || "",
                    callback: i
                }))
            }), d
        }, this.off = function(e, o) {
            return e && (e = e.trim().split(" ")).forEach(function(e, t) {
                var n = e.split("."),
                    r = n[0],
                    i = n[1] || "";
                ("*" === r ? Object.keys(s) : [r]).forEach(function(e) {
                    for (var t = s[e] || [], n = t.length; n--;) {
                        var r = t[n];
                        !r || i !== r.namespace && "*" !== i || o && o != r.callback || t.splice(n, 1)
                    }
                    t.length || delete s[e]
                })
            }), d
        }, this.trigger = function(e, n) {
            if (e) {
                var t = e.trim().split("."),
                    r = t[0],
                    i = t[1],
                    o = s[r];
                o && o.forEach(function(e, t) {
                    i && i !== e.namespace || e.callback.call(d, new _.Event(r, e.namespace, d, n))
                })
            }
            return d
        }, d.on("change.internal", function(e) {
            "loglevel" !== e.what && "tweenChanges" !== e.what && ("triggerElement" === e.what ? y() : "reverse" === e.what && d.update())
        }).on("shift.internal", function(e) {
            t(), d.update()
        }), this.addTo = function(e) {
            return e instanceof _.Controller && l != e && (l && l.removeScene(d), l = e, E(), o(!0), y(!0), t(), l.info("container").addEventListener("resize", S), e.addScene(d), d.trigger("add", {
                controller: l
            }), d.update()), d
        }, this.enabled = function(e) {
            return arguments.length ? (i != e && (i = !!e, d.update(!0)), d) : i
        }, this.remove = function() {
            if (l) {
                l.info("container").removeEventListener("resize", S);
                var e = l;
                l = void 0, e.removeScene(d), d.trigger("remove")
            }
            return d
        }, this.destroy = function(e) {
            return d.trigger("destroy", {
                reset: e
            }), d.remove(), d.off("*.*"), null
        }, this.update = function(e) {
            if (l)
                if (e)
                    if (l.enabled() && i) {
                        var t, n = l.info("scrollPos");
                        t = 0 < h.duration ? (n - a.start) / (a.end - a.start) : n >= a.start ? 1 : 0, d.trigger("update", {
                            startPos: a.start,
                            endPos: a.end,
                            scrollPos: n
                        }), d.progress(t)
                    } else m && p === f && C(!0);
            else l.updateScene(d, !1);
            return d
        }, this.refresh = function() {
            return o(), y(), d
        }, this.progress = function(e) {
            if (arguments.length) {
                var t = !1,
                    n = p,
                    r = l ? l.info("scrollDirection") : "PAUSED",
                    i = h.reverse || g <= e;
                if (0 === h.duration ? (t = g != e, p = 0 === (g = e < 1 && i ? 0 : 1) ? c : f) : e < 0 && p !== c && i ? (p = c, t = !(g = 0)) : 0 <= e && e < 1 && i ? (g = e, p = f, t = !0) : 1 <= e && p !== u ? (g = 1, p = u, t = !0) : p !== f || i || C(), t) {
                    var o = {
                            progress: g,
                            state: p,
                            scrollDirection: r
                        },
                        s = p != n,
                        a = function(e) {
                            d.trigger(e, o)
                        };
                    s && n !== f && (a("enter"), a(n === c ? "start" : "end")), a("progress"), s && p !== f && (a(p === c ? "start" : "end"), a("leave"))
                }
                return d
            }
            return g
        };
        var m, w, t = function() {
                a = {
                    start: v + h.offset
                }, l && h.triggerElement && (a.start -= l.info("size") * h.triggerHook), a.end = a.start + h.duration
            },
            o = function(e) {
                if (n) {
                    var t = "duration";
                    x(t, n.call(d)) && !e && (d.trigger("change", {
                        what: t,
                        newval: h[t]
                    }), d.trigger("shift", {
                        reason: t
                    }))
                }
            },
            y = function(e) {
                var t = 0,
                    n = h.triggerElement;
                if (l && (n || 0 < v)) {
                    if (n)
                        if (n.parentNode) {
                            for (var r = l.info(), i = R.get.offset(r.container), o = r.vertical ? "top" : "left"; n.parentNode.hasAttribute(P);) n = n.parentNode;
                            var s = R.get.offset(n);
                            r.isDocument || (i[o] -= l.scrollPos()), t = s[o] - i[o]
                        } else d.triggerElement(void 0);
                    var a = t != v;
                    v = t, a && !e && d.trigger("shift", {
                        reason: "triggerElementPosition"
                    })
                }
            },
            S = function(e) {
                0 < h.triggerHook && d.trigger("shift", {
                    reason: "containerResize"
                })
            },
            b = R.extend(D.validate, {
                duration: function(t) {
                    if (R.type.String(t) && t.match(/^(\.|\d)*\d+%$/)) {
                        var e = parseFloat(t) / 100;
                        t = function() {
                            return l ? l.info("size") * e : 0
                        }
                    }
                    if (R.type.Function(t)) {
                        n = t;
                        try {
                            t = parseFloat(n.call(d))
                        } catch (e) {
                            t = -1
                        }
                    }
                    if (t = parseFloat(t), !R.type.Number(t) || t < 0) throw n && (n = void 0), 0;
                    return t
                }
            }),
            E = function(e) {
                (e = arguments.length ? [e] : Object.keys(b)).forEach(function(t, e) {
                    var n;
                    if (b[t]) try {
                        n = b[t](h[t])
                    } catch (e) {
                        n = r[t]
                    } finally {
                        h[t] = n
                    }
                })
            },
            x = function(e, t) {
                var n = !1,
                    r = h[e];
                return h[e] != t && (h[e] = t, E(e), n = r != h[e]), n
            },
            z = function(t) {
                d[t] || (d[t] = function(e) {
                    return arguments.length ? ("duration" === t && (n = void 0), x(t, e) && (d.trigger("change", {
                        what: t,
                        newval: h[t]
                    }), -1 < D.shifts.indexOf(t) && d.trigger("shift", {
                        reason: t
                    })), d) : h[t]
                })
            };
        this.controller = function() {
            return l
        }, this.state = function() {
            return p
        }, this.scrollOffset = function() {
            return a.start
        }, this.triggerPosition = function() {
            var e = h.offset;
            return l && (h.triggerElement ? e += v : e += l.info("size") * d.triggerHook()), e
        }, d.on("shift.internal", function(e) {
            var t = "duration" === e.reason;
            (p === u && t || p === f && 0 === h.duration) && C(), t && F()
        }).on("progress.internal", function(e) {
            C()
        }).on("add.internal", function(e) {
            F()
        }).on("destroy.internal", function(e) {
            d.removePin(e.reset)
        });
        var C = function(e) {
                if (m && l) {
                    var t = l.info(),
                        n = w.spacer.firstChild;
                    if (e || p !== f) {
                        var r = {
                                position: w.inFlow ? "relative" : "absolute",
                                top: 0,
                                left: 0
                            },
                            i = R.css(n, "position") != r.position;
                        w.pushFollowers ? 0 < h.duration && (p === u && 0 === parseFloat(R.css(w.spacer, "padding-top")) ? i = !0 : p === c && 0 === parseFloat(R.css(w.spacer, "padding-bottom")) && (i = !0)) : r[t.vertical ? "top" : "left"] = h.duration * g, R.css(n, r), i && F()
                    } else {
                        "fixed" != R.css(n, "position") && (R.css(n, {
                            position: "fixed"
                        }), F());
                        var o = R.get.offset(w.spacer, !0),
                            s = h.reverse || 0 === h.duration ? t.scrollPos - a.start : Math.round(g * h.duration * 10) / 10;
                        o[t.vertical ? "top" : "left"] += s, R.css(w.spacer.firstChild, {
                            top: o.top,
                            left: o.left
                        })
                    }
                }
            },
            F = function() {
                if (m && l && w.inFlow) {
                    var e = p === f,
                        t = l.info("vertical"),
                        n = w.spacer.firstChild,
                        r = R.isMarginCollapseType(R.css(w.spacer, "display")),
                        i = {};
                    w.relSize.width || w.relSize.autoFullWidth ? e ? R.css(m, {
                        width: R.get.width(w.spacer)
                    }) : R.css(m, {
                        width: "100%"
                    }) : (i["min-width"] = R.get.width(t ? m : n, !0, !0), i.width = e ? i["min-width"] : "auto"), w.relSize.height ? e ? R.css(m, {
                        height: R.get.height(w.spacer) - (w.pushFollowers ? h.duration : 0)
                    }) : R.css(m, {
                        height: "100%"
                    }) : (i["min-height"] = R.get.height(t ? n : m, !0, !r), i.height = e ? i["min-height"] : "auto"), w.pushFollowers && (i["padding" + (t ? "Top" : "Left")] = h.duration * g, i["padding" + (t ? "Bottom" : "Right")] = h.duration * (1 - g)), R.css(w.spacer, i)
                }
            },
            L = function() {
                l && m && p === f && !l.info("isDocument") && C()
            },
            T = function() {
                l && m && p === f && ((w.relSize.width || w.relSize.autoFullWidth) && R.get.width(window) != R.get.width(w.spacer.parentNode) || w.relSize.height && R.get.height(window) != R.get.height(w.spacer.parentNode)) && F()
            },
            A = function(e) {
                l && m && p === f && !l.info("isDocument") && (e.preventDefault(), l._setScrollPos(l.info("scrollPos") - ((e.wheelDelta || e[l.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 || 30 * -e.detail)))
            };
        this.setPin = function(e, t) {
            if (t = R.extend({}, {
                    pushFollowers: !0,
                    spacerClass: "scrollmagic-pin-spacer"
                }, t), !(e = R.get.elements(e)[0])) return d;
            if ("fixed" === R.css(e, "position")) return d;
            if (m) {
                if (m === e) return d;
                d.removePin()
            }
            var n = (m = e).parentNode.style.display,
                r = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
            m.parentNode.style.display = "none";
            var i = "absolute" != R.css(m, "position"),
                o = R.css(m, r.concat(["display"])),
                s = R.css(m, ["width", "height"]);
            m.parentNode.style.display = n, !i && t.pushFollowers && (t.pushFollowers = !1);
            var a = m.parentNode.insertBefore(document.createElement("div"), m),
                l = R.extend(o, {
                    position: i ? "relative" : "absolute",
                    boxSizing: "content-box",
                    mozBoxSizing: "content-box",
                    webkitBoxSizing: "content-box"
                });
            if (i || R.extend(l, R.css(m, ["width", "height"])), R.css(a, l), a.setAttribute(P, ""), R.addClass(a, t.spacerClass), w = {
                    spacer: a,
                    relSize: {
                        width: "%" === s.width.slice(-1),
                        height: "%" === s.height.slice(-1),
                        autoFullWidth: "auto" === s.width && i && R.isMarginCollapseType(o.display)
                    },
                    pushFollowers: t.pushFollowers,
                    inFlow: i
                }, !m.___origStyle) {
                m.___origStyle = {};
                var c = m.style;
                r.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]).forEach(function(e) {
                    m.___origStyle[e] = c[e] || ""
                })
            }
            return w.relSize.width && R.css(a, {
                width: s.width
            }), w.relSize.height && R.css(a, {
                height: s.height
            }), a.appendChild(m), R.css(m, {
                position: i ? "relative" : "absolute",
                margin: "auto",
                top: "auto",
                left: "auto",
                bottom: "auto",
                right: "auto"
            }), (w.relSize.width || w.relSize.autoFullWidth) && R.css(m, {
                boxSizing: "border-box",
                mozBoxSizing: "border-box",
                webkitBoxSizing: "border-box"
            }), window.addEventListener("scroll", L), window.addEventListener("resize", L), window.addEventListener("resize", T), m.addEventListener("mousewheel", A), m.addEventListener("DOMMouseScroll", A), C(), d
        }, this.removePin = function(e) {
            if (m) {
                if (p === f && C(!0), e || !l) {
                    var t = w.spacer.firstChild;
                    if (t.hasAttribute(P)) {
                        var n = w.spacer.style,
                            r = {};
                        ["margin", "marginLeft", "marginRight", "marginTop", "marginBottom"].forEach(function(e) {
                            r[e] = n[e] || ""
                        }), R.css(t, r)
                    }
                    w.spacer.parentNode.insertBefore(t, w.spacer), w.spacer.parentNode.removeChild(w.spacer), m.parentNode.hasAttribute(P) || (R.css(m, m.___origStyle), delete m.___origStyle)
                }
                window.removeEventListener("scroll", L), window.removeEventListener("resize", L), window.removeEventListener("resize", T), m.removeEventListener("mousewheel", A), m.removeEventListener("DOMMouseScroll", A), m = void 0
            }
            return d
        };
        var N, O = [];
        return d.on("destroy.internal", function(e) {
                d.removeClassToggle(e.reset)
            }), this.setClassToggle = function(e, t) {
                var n = R.get.elements(e);
                return 0 !== n.length && R.type.String(t) && (0 < O.length && d.removeClassToggle(), N = t, O = n, d.on("enter.internal_class leave.internal_class", function(e) {
                    var n = "enter" === e.type ? R.addClass : R.removeClass;
                    O.forEach(function(e, t) {
                        n(e, N)
                    })
                })), d
            }, this.removeClassToggle = function(e) {
                return e && O.forEach(function(e, t) {
                    R.removeClass(e, N)
                }), d.off("start.internal_class end.internal_class"), N = void 0, O = [], d
            },
            function() {
                for (var e in h) r.hasOwnProperty(e) || delete h[e];
                for (var t in r) z(t);
                E()
            }(), d
    };
    var D = {
        defaults: {
            duration: 0,
            offset: 0,
            triggerElement: void 0,
            triggerHook: .5,
            reverse: !0,
            loglevel: 2
        },
        validate: {
            offset: function(e) {
                if (e = parseFloat(e), !R.type.Number(e)) throw 0;
                return e
            },
            triggerElement: function(e) {
                if (e = e || void 0) {
                    var t = R.get.elements(e)[0];
                    if (!t || !t.parentNode) throw 0;
                    e = t
                }
                return e
            },
            triggerHook: function(e) {
                var t = {
                    onCenter: .5,
                    onEnter: 1,
                    onLeave: 0
                };
                if (R.type.Number(e)) e = Math.max(0, Math.min(parseFloat(e), 1));
                else {
                    if (!(e in t)) throw 0;
                    e = t[e]
                }
                return e
            },
            reverse: function(e) {
                return !!e
            }
        },
        shifts: ["duration", "offset", "triggerHook"]
    };
    _.Scene.addOption = function(e, t, n, r) {
        e in D.defaults || (D.defaults[e] = t, D.validate[e] = n, r && D.shifts.push(e))
    }, _.Scene.extend = function(e) {
        var t = this;
        _.Scene = function() {
            return t.apply(this, arguments), this.$super = R.extend({}, this), e.apply(this, arguments) || this
        }, R.extend(_.Scene, t), _.Scene.prototype = t.prototype, _.Scene.prototype.constructor = _.Scene
    }, _.Event = function(e, t, n, r) {
        for (var i in r = r || {}) this[i] = r[i];
        return this.type = e, this.target = this.currentTarget = n, this.namespace = t || "", this.timeStamp = this.timestamp = Date.now(), this
    };
    var R = _._util = function(s) {
        var n, e = {},
            a = function(e) {
                return parseFloat(e) || 0
            },
            l = function(e) {
                return e.currentStyle ? e.currentStyle : s.getComputedStyle(e)
            },
            r = function(e, t, n, r) {
                if ((t = t === document ? s : t) === s) r = !1;
                else if (!u.DomElement(t)) return 0;
                e = e.charAt(0).toUpperCase() + e.substr(1).toLowerCase();
                var i = (n ? t["offset" + e] || t["outer" + e] : t["client" + e] || t["inner" + e]) || 0;
                if (n && r) {
                    var o = l(t);
                    i += "Height" === e ? a(o.marginTop) + a(o.marginBottom) : a(o.marginLeft) + a(o.marginRight)
                }
                return i
            },
            c = function(e) {
                return e.replace(/^[^a-z]+([a-z])/g, "$1").replace(/-([a-z])/g, function(e) {
                    return e[1].toUpperCase()
                })
            };
        e.extend = function(e) {
            for (e = e || {}, n = 1; n < arguments.length; n++)
                if (arguments[n])
                    for (var t in arguments[n]) arguments[n].hasOwnProperty(t) && (e[t] = arguments[n][t]);
            return e
        }, e.isMarginCollapseType = function(e) {
            return -1 < ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(e)
        };
        var i = 0,
            t = ["ms", "moz", "webkit", "o"],
            o = s.requestAnimationFrame,
            f = s.cancelAnimationFrame;
        for (n = 0; !o && n < 4; ++n) o = s[t[n] + "RequestAnimationFrame"], f = s[t[n] + "CancelAnimationFrame"] || s[t[n] + "CancelRequestAnimationFrame"];
        o || (o = function(e) {
            var t = (new Date).getTime(),
                n = Math.max(0, 16 - (t - i)),
                r = s.setTimeout(function() {
                    e(t + n)
                }, n);
            return i = t + n, r
        }), f || (f = function(e) {
            s.clearTimeout(e)
        }), e.rAF = o.bind(s), e.cAF = f.bind(s);
        var u = e.type = function(e) {
            return Object.prototype.toString.call(e).replace(/^\[object (.+)\]$/, "$1").toLowerCase()
        };
        u.String = function(e) {
            return "string" === u(e)
        }, u.Function = function(e) {
            return "function" === u(e)
        }, u.Array = function(e) {
            return Array.isArray(e)
        }, u.Number = function(e) {
            return !u.Array(e) && 0 <= e - parseFloat(e) + 1
        }, u.DomElement = function(e) {
            return "object" == typeof HTMLElement || "function" == typeof HTMLElement ? e instanceof HTMLElement || e instanceof SVGElement : e && "object" == typeof e && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName
        };
        var d = e.get = {};
        return d.elements = function(e) {
            var t = [];
            if (u.String(e)) try {
                e = document.querySelectorAll(e)
            } catch (e) {
                return t
            }
            if ("nodelist" === u(e) || u.Array(e) || e instanceof NodeList)
                for (var n = 0, r = t.length = e.length; n < r; n++) {
                    var i = e[n];
                    t[n] = u.DomElement(i) ? i : d.elements(i)
                } else(u.DomElement(e) || e === document || e === s) && (t = [e]);
            return t
        }, d.scrollTop = function(e) {
            return e && "number" == typeof e.scrollTop ? e.scrollTop : s.pageYOffset || 0
        }, d.scrollLeft = function(e) {
            return e && "number" == typeof e.scrollLeft ? e.scrollLeft : s.pageXOffset || 0
        }, d.width = function(e, t, n) {
            return r("width", e, t, n)
        }, d.height = function(e, t, n) {
            return r("height", e, t, n)
        }, d.offset = function(e, t) {
            var n = {
                top: 0,
                left: 0
            };
            if (e && e.getBoundingClientRect) {
                var r = e.getBoundingClientRect();
                n.top = r.top, n.left = r.left, t || (n.top += d.scrollTop(), n.left += d.scrollLeft())
            }
            return n
        }, e.addClass = function(e, t) {
            t && (e.classList ? e.classList.add(t) : e.className += " " + t)
        }, e.removeClass = function(e, t) {
            t && (e.classList ? e.classList.remove(t) : e.className = e.className.replace(RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"), " "))
        }, e.css = function(e, t) {
            if (u.String(t)) return l(e)[c(t)];
            if (u.Array(t)) {
                var n = {},
                    r = l(e);
                return t.forEach(function(e, t) {
                    n[e] = r[c(e)]
                }), n
            }
            for (var i in t) {
                var o = t[i];
                o == parseFloat(o) && (o += "px"), e.style[c(i)] = o
            }
        }, e
    }(window || {});
    return _
});
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        factory(jQuery);
    }
}(function($) {
    var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ('onwheel' in document || document.documentMode >= 9) ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;
    if ($.event.fixHooks) {
        for (var i = toFix.length; i;) {
            $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
        }
    }
    var special = $.event.special.mousewheel = {
        version: '3.1.11',
        setup: function() {
            if (this.addEventListener) {
                for (var i = toBind.length; i;) {
                    this.addEventListener(toBind[--i], handler, false);
                }
            } else {
                this.onmousewheel = handler;
            }
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },
        teardown: function() {
            if (this.removeEventListener) {
                for (var i = toBind.length; i;) {
                    this.removeEventListener(toBind[--i], handler, false);
                }
            } else {
                this.onmousewheel = null;
            }
            $.removeData(this, 'mousewheel-line-height');
            $.removeData(this, 'mousewheel-page-height');
        },
        getLineHeight: function(elem) {
            var $parent = $(elem)['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
            if (!$parent.length) {
                $parent = $('body');
            }
            return parseInt($parent.css('fontSize'), 10);
        },
        getPageHeight: function(elem) {
            return $(elem).height();
        },
        settings: {
            adjustOldDeltas: true,
            normalizeOffset: true
        }
    };
    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },
        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });

    function handler(event) {
        var orgEvent = event || window.event,
            args = slice.call(arguments, 1),
            delta = 0,
            deltaX = 0,
            deltaY = 0,
            absDelta = 0,
            offsetX = 0,
            offsetY = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';
        if ('detail' in orgEvent) {
            deltaY = orgEvent.detail * -1;
        }
        if ('wheelDelta' in orgEvent) {
            deltaY = orgEvent.wheelDelta;
        }
        if ('wheelDeltaY' in orgEvent) {
            deltaY = orgEvent.wheelDeltaY;
        }
        if ('wheelDeltaX' in orgEvent) {
            deltaX = orgEvent.wheelDeltaX * -1;
        }
        if ('axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }
        delta = deltaY === 0 ? deltaX : deltaY;
        if ('deltaY' in orgEvent) {
            deltaY = orgEvent.deltaY * -1;
            delta = deltaY;
        }
        if ('deltaX' in orgEvent) {
            deltaX = orgEvent.deltaX;
            if (deltaY === 0) {
                delta = deltaX * -1;
            }
        }
        if (deltaY === 0 && deltaX === 0) {
            return;
        }
        if (orgEvent.deltaMode === 1) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if (orgEvent.deltaMode === 2) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }
        absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));
        if (!lowestDelta || absDelta < lowestDelta) {
            lowestDelta = absDelta;
            if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
                lowestDelta /= 40;
            }
        }
        if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
            delta /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }
        delta = Math[delta >= 1 ? 'floor' : 'ceil'](delta / lowestDelta);
        deltaX = Math[deltaX >= 1 ? 'floor' : 'ceil'](deltaX / lowestDelta);
        deltaY = Math[deltaY >= 1 ? 'floor' : 'ceil'](deltaY / lowestDelta);
        if (special.settings.normalizeOffset && this.getBoundingClientRect) {
            var boundingRect = this.getBoundingClientRect();
            offsetX = event.clientX - boundingRect.left;
            offsetY = event.clientY - boundingRect.top;
        }
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        event.deltaMode = 0;
        args.unshift(event, delta, deltaX, deltaY);
        if (nullLowestDeltaTimeout) {
            clearTimeout(nullLowestDeltaTimeout);
        }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 20);
        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }
}));
! function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
    "use strict";
    var o = !1,
        t = !1,
        r = 0,
        i = 2e3,
        s = 0,
        n = e,
        l = document,
        a = window,
        c = n(a),
        d = [],
        u = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || !1,
        h = a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.mozCancelAnimationFrame || !1;
    if (u) a.cancelAnimationFrame || (h = function(e) {});
    else {
        var p = 0;
        u = function(e, o) {
            var t = (new Date).getTime(),
                r = Math.max(0, 16 - (t - p)),
                i = a.setTimeout(function() {
                    e(t + r)
                }, r);
            return p = t + r, i
        }, h = function(e) {
            a.clearTimeout(e)
        }
    }
    var m = a.MutationObserver || a.WebKitMutationObserver || !1,
        f = Date.now || function() {
            return (new Date).getTime()
        },
        g = {
            zindex: "auto",
            cursoropacitymin: 0,
            cursoropacitymax: 1,
            cursorcolor: "#424242",
            cursorwidth: "6px",
            cursorborder: "1px solid #fff",
            cursorborderradius: "5px",
            scrollspeed: 40,
            mousescrollstep: 27,
            touchbehavior: !1,
            emulatetouch: !1,
            hwacceleration: !0,
            usetransition: !0,
            boxzoom: !1,
            dblclickzoom: !0,
            gesturezoom: !0,
            grabcursorenabled: !0,
            autohidemode: !0,
            background: "",
            iframeautoresize: !0,
            cursorminheight: 32,
            preservenativescrolling: !0,
            railoffset: !1,
            railhoffset: !1,
            bouncescroll: !0,
            spacebarenabled: !0,
            railpadding: {
                top: 0,
                right: 0,
                left: 0,
                bottom: 0
            },
            disableoutline: !0,
            horizrailenabled: !0,
            railalign: "right",
            railvalign: "bottom",
            enabletranslate3d: !0,
            enablemousewheel: !0,
            enablekeyboard: !0,
            smoothscroll: !0,
            sensitiverail: !0,
            enablemouselockapi: !0,
            cursorfixedheight: !1,
            directionlockdeadzone: 6,
            hidecursordelay: 400,
            nativeparentscrolling: !0,
            enablescrollonselection: !0,
            overflowx: !0,
            overflowy: !0,
            cursordragspeed: .3,
            rtlmode: "auto",
            cursordragontouch: !1,
            oneaxismousemode: "auto",
            scriptpath: function() {
                var e = l.currentScript || function() {
                        var e = l.getElementsByTagName("script");
                        return !!e.length && e[e.length - 1]
                    }(),
                    o = e ? e.src.split("?")[0] : "";
                return o.split("/").length > 0 ? o.split("/").slice(0, -1).join("/") + "/" : ""
            }(),
            preventmultitouchscrolling: !0,
            disablemutationobserver: !1,
            enableobserver: !0,
            scrollbarid: !1
        },
        v = !1,
        w = function() {
            if (v) return v;
            var e = l.createElement("DIV"),
                o = e.style,
                t = navigator.userAgent,
                r = navigator.platform,
                i = {};
            return i.haspointerlock = "pointerLockElement" in l || "webkitPointerLockElement" in l || "mozPointerLockElement" in l, i.isopera = "opera" in a, i.isopera12 = i.isopera && "getUserMedia" in navigator, i.isoperamini = "[object OperaMini]" === Object.prototype.toString.call(a.operamini), i.isie = "all" in l && "attachEvent" in e && !i.isopera, i.isieold = i.isie && !("msInterpolationMode" in o), i.isie7 = i.isie && !i.isieold && (!("documentMode" in l) || 7 === l.documentMode), i.isie8 = i.isie && "documentMode" in l && 8 === l.documentMode, i.isie9 = i.isie && "performance" in a && 9 === l.documentMode, i.isie10 = i.isie && "performance" in a && 10 === l.documentMode, i.isie11 = "msRequestFullscreen" in e && l.documentMode >= 11, i.ismsedge = "msCredentials" in a, i.ismozilla = "MozAppearance" in o, i.iswebkit = !i.ismsedge && "WebkitAppearance" in o, i.ischrome = i.iswebkit && "chrome" in a, i.ischrome38 = i.ischrome && "touchAction" in o, i.ischrome22 = !i.ischrome38 && i.ischrome && i.haspointerlock, i.ischrome26 = !i.ischrome38 && i.ischrome && "transition" in o, i.cantouch = "ontouchstart" in l.documentElement || "ontouchstart" in a, i.hasw3ctouch = (a.PointerEvent || !1) && (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0), i.hasmstouch = !i.hasw3ctouch && (a.MSPointerEvent || !1), i.ismac = /^mac$/i.test(r), i.isios = i.cantouch && /iphone|ipad|ipod/i.test(r), i.isios4 = i.isios && !("seal" in Object), i.isios7 = i.isios && "webkitHidden" in l, i.isios8 = i.isios && "hidden" in l, i.isios10 = i.isios && a.Proxy, i.isandroid = /android/i.test(t), i.haseventlistener = "addEventListener" in e, i.trstyle = !1, i.hastransform = !1, i.hastranslate3d = !1, i.transitionstyle = !1, i.hastransition = !1, i.transitionend = !1, i.trstyle = "transform", i.hastransform = "transform" in o || function() {
                for (var e = ["msTransform", "webkitTransform", "MozTransform", "OTransform"], t = 0, r = e.length; t < r; t++)
                    if (void 0 !== o[e[t]]) {
                        i.trstyle = e[t];
                        break
                    }
                i.hastransform = !!i.trstyle
            }(), i.hastransform && (o[i.trstyle] = "translate3d(1px,2px,3px)", i.hastranslate3d = /translate3d/.test(o[i.trstyle])), i.transitionstyle = "transition", i.prefixstyle = "", i.transitionend = "transitionend", i.hastransition = "transition" in o || function() {
                i.transitionend = !1;
                for (var e = ["webkitTransition", "msTransition", "MozTransition", "OTransition", "OTransition", "KhtmlTransition"], t = ["-webkit-", "-ms-", "-moz-", "-o-", "-o", "-khtml-"], r = ["webkitTransitionEnd", "msTransitionEnd", "transitionend", "otransitionend", "oTransitionEnd", "KhtmlTransitionEnd"], s = 0, n = e.length; s < n; s++)
                    if (e[s] in o) {
                        i.transitionstyle = e[s], i.prefixstyle = t[s], i.transitionend = r[s];
                        break
                    }
                i.ischrome26 && (i.prefixstyle = t[1]), i.hastransition = i.transitionstyle
            }(), i.cursorgrabvalue = function() {
                var e = ["grab", "-webkit-grab", "-moz-grab"];
                (i.ischrome && !i.ischrome38 || i.isie) && (e = []);
                for (var t = 0, r = e.length; t < r; t++) {
                    var s = e[t];
                    if (o.cursor = s, o.cursor == s) return s
                }
                return "url(https://cdnjs.cloudflare.com/ajax/libs/slider-pro/1.3.0/css/images/openhand.cur),n-resize"
            }(), i.hasmousecapture = "setCapture" in e, i.hasMutationObserver = !1 !== m, e = null, v = i, i
        },
        b = function(e, p) {
            function v() {
                var e = T.doc.css(P.trstyle);
                return !(!e || "matrix" != e.substr(0, 6)) && e.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, "").split(/, +/)
            }

            function b() {
                var e = T.win;
                if ("zIndex" in e) return e.zIndex();
                for (; e.length > 0;) {
                    if (9 == e[0].nodeType) return !1;
                    var o = e.css("zIndex");
                    if (!isNaN(o) && 0 !== o) return parseInt(o);
                    e = e.parent()
                }
                return !1
            }

            function x(e, o, t) {
                var r = e.css(o),
                    i = parseFloat(r);
                if (isNaN(i)) {
                    var s = 3 == (i = I[r] || 0) ? t ? T.win.outerHeight() - T.win.innerHeight() : T.win.outerWidth() - T.win.innerWidth() : 1;
                    return T.isie8 && i && (i += 1), s ? i : 0
                }
                return i
            }

            function S(e, o, t, r) {
                T._bind(e, o, function(r) {
                    var i = {
                        original: r = r || a.event,
                        target: r.target || r.srcElement,
                        type: "wheel",
                        deltaMode: "MozMousePixelScroll" == r.type ? 0 : 1,
                        deltaX: 0,
                        deltaZ: 0,
                        preventDefault: function() {
                            return r.preventDefault ? r.preventDefault() : r.returnValue = !1, !1
                        },
                        stopImmediatePropagation: function() {
                            r.stopImmediatePropagation ? r.stopImmediatePropagation() : r.cancelBubble = !0
                        }
                    };
                    return "mousewheel" == o ? (r.wheelDeltaX && (i.deltaX = -.025 * r.wheelDeltaX), r.wheelDeltaY && (i.deltaY = -.025 * r.wheelDeltaY), !i.deltaY && !i.deltaX && (i.deltaY = -.025 * r.wheelDelta)) : i.deltaY = r.detail, t.call(e, i)
                }, r)
            }

            function z(e, o, t, r) {
                T.scrollrunning || (T.newscrolly = T.getScrollTop(), T.newscrollx = T.getScrollLeft(), D = f());
                var i = f() - D;
                if (D = f(), i > 350 ? A = 1 : A += (2 - A) / 10, e = e * A | 0, o = o * A | 0, e) {
                    if (r)
                        if (e < 0) {
                            if (T.getScrollLeft() >= T.page.maxw) return !0
                        } else if (T.getScrollLeft() <= 0) return !0;
                    var s = e > 0 ? 1 : -1;
                    X !== s && (T.scrollmom && T.scrollmom.stop(), T.newscrollx = T.getScrollLeft(), X = s), T.lastdeltax -= e
                }
                if (o) {
                    if (function() {
                            var e = T.getScrollTop();
                            if (o < 0) {
                                if (e >= T.page.maxh) return !0
                            } else if (e <= 0) return !0
                        }()) {
                        if (M.nativeparentscrolling && t && !T.ispage && !T.zoomactive) return !0;
                        var n = T.view.h >> 1;
                        T.newscrolly < -n ? (T.newscrolly = -n, o = -1) : T.newscrolly > T.page.maxh + n ? (T.newscrolly = T.page.maxh + n, o = 1) : o = 0
                    }
                    var l = o > 0 ? 1 : -1;
                    B !== l && (T.scrollmom && T.scrollmom.stop(), T.newscrolly = T.getScrollTop(), B = l), T.lastdeltay -= o
                }(o || e) && T.synched("relativexy", function() {
                    var e = T.lastdeltay + T.newscrolly;
                    T.lastdeltay = 0;
                    var o = T.lastdeltax + T.newscrollx;
                    T.lastdeltax = 0, T.rail.drag || T.doScrollPos(o, e)
                })
            }

            function k(e, o, t) {
                var r, i;
                return !(t || !q) || (0 === e.deltaMode ? (r = -e.deltaX * (M.mousescrollstep / 54) | 0, i = -e.deltaY * (M.mousescrollstep / 54) | 0) : 1 === e.deltaMode && (r = -e.deltaX * M.mousescrollstep * 50 / 80 | 0, i = -e.deltaY * M.mousescrollstep * 50 / 80 | 0), o && M.oneaxismousemode && 0 === r && i && (r = i, i = 0, t && (r < 0 ? T.getScrollLeft() >= T.page.maxw : T.getScrollLeft() <= 0) && (i = r, r = 0)), T.isrtlmode && (r = -r), z(r, i, t, !0) ? void(t && (q = !0)) : (q = !1, e.stopImmediatePropagation(), e.preventDefault()))
            }
            var T = this;
            this.version = "3.7.6", this.name = "nicescroll", this.me = p;
            var E = n("body"),
                M = this.opt = {
                    doc: E,
                    win: !1
                };
            if (n.extend(M, g), M.snapbackspeed = 80, e)
                for (var L in M) void 0 !== e[L] && (M[L] = e[L]);
            if (M.disablemutationobserver && (m = !1), this.doc = M.doc, this.iddoc = this.doc && this.doc[0] ? this.doc[0].id || "" : "", this.ispage = /^BODY|HTML/.test(M.win ? M.win[0].nodeName : this.doc[0].nodeName), this.haswrapper = !1 !== M.win, this.win = M.win || (this.ispage ? c : this.doc), this.docscroll = this.ispage && !this.haswrapper ? c : this.win, this.body = E, this.viewport = !1, this.isfixed = !1, this.iframe = !1, this.isiframe = "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName, this.istextarea = "TEXTAREA" == this.win[0].nodeName, this.forcescreen = !1, this.canshowonmouseevent = "scroll" != M.autohidemode, this.onmousedown = !1, this.onmouseup = !1, this.onmousemove = !1, this.onmousewheel = !1, this.onkeypress = !1, this.ongesturezoom = !1, this.onclick = !1, this.onscrollstart = !1, this.onscrollend = !1, this.onscrollcancel = !1, this.onzoomin = !1, this.onzoomout = !1, this.view = !1, this.page = !1, this.scroll = {
                    x: 0,
                    y: 0
                }, this.scrollratio = {
                    x: 0,
                    y: 0
                }, this.cursorheight = 20, this.scrollvaluemax = 0, "auto" == M.rtlmode) {
                var C = this.win[0] == a ? this.body : this.win,
                    N = C.css("writing-mode") || C.css("-webkit-writing-mode") || C.css("-ms-writing-mode") || C.css("-moz-writing-mode");
                "horizontal-tb" == N || "lr-tb" == N || "" === N ? (this.isrtlmode = "rtl" == C.css("direction"), this.isvertical = !1) : (this.isrtlmode = "vertical-rl" == N || "tb" == N || "tb-rl" == N || "rl-tb" == N, this.isvertical = "vertical-rl" == N || "tb" == N || "tb-rl" == N)
            } else this.isrtlmode = !0 === M.rtlmode, this.isvertical = !1;
            if (this.scrollrunning = !1, this.scrollmom = !1, this.observer = !1, this.observerremover = !1, this.observerbody = !1, !1 !== M.scrollbarid) this.id = M.scrollbarid;
            else
                do {
                    this.id = "ascrail" + i++
                } while (l.getElementById(this.id));
            this.rail = !1, this.cursor = !1, this.cursorfreezed = !1, this.selectiondrag = !1, this.zoom = !1, this.zoomactive = !1, this.hasfocus = !1, this.hasmousefocus = !1, this.railslocked = !1, this.locked = !1, this.hidden = !1, this.cursoractive = !0, this.wheelprevented = !1, this.overflowx = M.overflowx, this.overflowy = M.overflowy, this.nativescrollingarea = !1, this.checkarea = 0, this.events = [], this.saved = {}, this.delaylist = {}, this.synclist = {}, this.lastdeltax = 0, this.lastdeltay = 0, this.detected = w();
            var P = n.extend({}, this.detected);
            this.canhwscroll = P.hastransform && M.hwacceleration, this.ishwscroll = this.canhwscroll && T.haswrapper, this.isrtlmode ? this.isvertical ? this.hasreversehr = !(P.iswebkit || P.isie || P.isie11) : this.hasreversehr = !(P.iswebkit || P.isie && !P.isie10 && !P.isie11) : this.hasreversehr = !1, this.istouchcapable = !1, P.cantouch || !P.hasw3ctouch && !P.hasmstouch ? !P.cantouch || P.isios || P.isandroid || !P.iswebkit && !P.ismozilla || (this.istouchcapable = !0) : this.istouchcapable = !0, M.enablemouselockapi || (P.hasmousecapture = !1, P.haspointerlock = !1), this.debounced = function(e, o, t) {
                T && (T.delaylist[e] || !1 || (T.delaylist[e] = {
                    h: u(function() {
                        T.delaylist[e].fn.call(T), T.delaylist[e] = !1
                    }, t)
                }, o.call(T)), T.delaylist[e].fn = o)
            }, this.synched = function(e, o) {
                T.synclist[e] ? T.synclist[e] = o : (T.synclist[e] = o, u(function() {
                    T && (T.synclist[e] && T.synclist[e].call(T), T.synclist[e] = null)
                }))
            }, this.unsynched = function(e) {
                T.synclist[e] && (T.synclist[e] = !1)
            }, this.css = function(e, o) {
                for (var t in o) T.saved.css.push([e, t, e.css(t)]), e.css(t, o[t])
            }, this.scrollTop = function(e) {
                return void 0 === e ? T.getScrollTop() : T.setScrollTop(e)
            }, this.scrollLeft = function(e) {
                return void 0 === e ? T.getScrollLeft() : T.setScrollLeft(e)
            };
            var R = function(e, o, t, r, i, s, n) {
                this.st = e, this.ed = o, this.spd = t, this.p1 = r || 0, this.p2 = i || 1, this.p3 = s || 0, this.p4 = n || 1, this.ts = f(), this.df = o - e
            };
            if (R.prototype = {
                    B2: function(e) {
                        return 3 * (1 - e) * (1 - e) * e
                    },
                    B3: function(e) {
                        return 3 * (1 - e) * e * e
                    },
                    B4: function(e) {
                        return e * e * e
                    },
                    getPos: function() {
                        return (f() - this.ts) / this.spd
                    },
                    getNow: function() {
                        var e = (f() - this.ts) / this.spd,
                            o = this.B2(e) + this.B3(e) + this.B4(e);
                        return e >= 1 ? this.ed : this.st + this.df * o | 0
                    },
                    update: function(e, o) {
                        return this.st = this.getNow(), this.ed = e, this.spd = o, this.ts = f(), this.df = this.ed - this.st, this
                    }
                }, this.ishwscroll) {
                this.doc.translate = {
                    x: 0,
                    y: 0,
                    tx: "0px",
                    ty: "0px"
                }, P.hastranslate3d && P.isios && this.doc.css("-webkit-backface-visibility", "hidden"), this.getScrollTop = function(e) {
                    if (!e) {
                        var o = v();
                        if (o) return 16 == o.length ? -o[13] : -o[5];
                        if (T.timerscroll && T.timerscroll.bz) return T.timerscroll.bz.getNow()
                    }
                    return T.doc.translate.y
                }, this.getScrollLeft = function(e) {
                    if (!e) {
                        var o = v();
                        if (o) return 16 == o.length ? -o[12] : -o[4];
                        if (T.timerscroll && T.timerscroll.bh) return T.timerscroll.bh.getNow()
                    }
                    return T.doc.translate.x
                }, this.notifyScrollEvent = function(e) {
                    var o = l.createEvent("UIEvents");
                    o.initUIEvent("scroll", !1, !1, a, 1), o.niceevent = !0, e.dispatchEvent(o)
                };
                var _ = this.isrtlmode ? 1 : -1;
                P.hastranslate3d && M.enabletranslate3d ? (this.setScrollTop = function(e, o) {
                    T.doc.translate.y = e, T.doc.translate.ty = -1 * e + "px", T.doc.css(P.trstyle, "translate3d(" + T.doc.translate.tx + "," + T.doc.translate.ty + ",0)"), o || T.notifyScrollEvent(T.win[0])
                }, this.setScrollLeft = function(e, o) {
                    T.doc.translate.x = e, T.doc.translate.tx = e * _ + "px", T.doc.css(P.trstyle, "translate3d(" + T.doc.translate.tx + "," + T.doc.translate.ty + ",0)"), o || T.notifyScrollEvent(T.win[0])
                }) : (this.setScrollTop = function(e, o) {
                    T.doc.translate.y = e, T.doc.translate.ty = -1 * e + "px", T.doc.css(P.trstyle, "translate(" + T.doc.translate.tx + "," + T.doc.translate.ty + ")"), o || T.notifyScrollEvent(T.win[0])
                }, this.setScrollLeft = function(e, o) {
                    T.doc.translate.x = e, T.doc.translate.tx = e * _ + "px", T.doc.css(P.trstyle, "translate(" + T.doc.translate.tx + "," + T.doc.translate.ty + ")"), o || T.notifyScrollEvent(T.win[0])
                })
            } else this.getScrollTop = function() {
                return T.docscroll.scrollTop()
            }, this.setScrollTop = function(e) {
                T.docscroll.scrollTop(e)
            }, this.getScrollLeft = function() {
                return T.hasreversehr ? T.detected.ismozilla ? T.page.maxw - Math.abs(T.docscroll.scrollLeft()) : T.page.maxw - T.docscroll.scrollLeft() : T.docscroll.scrollLeft()
            }, this.setScrollLeft = function(e) {
                return setTimeout(function() {
                    if (T) return T.hasreversehr && (e = T.detected.ismozilla ? -(T.page.maxw - e) : T.page.maxw - e), T.docscroll.scrollLeft(e)
                }, 1)
            };
            this.getTarget = function(e) {
                return !!e && (e.target ? e.target : !!e.srcElement && e.srcElement)
            }, this.hasParent = function(e, o) {
                if (!e) return !1;
                for (var t = e.target || e.srcElement || e || !1; t && t.id != o;) t = t.parentNode || !1;
                return !1 !== t
            };
            var I = {
                thin: 1,
                medium: 3,
                thick: 5
            };
            this.getDocumentScrollOffset = function() {
                return {
                    top: a.pageYOffset || l.documentElement.scrollTop,
                    left: a.pageXOffset || l.documentElement.scrollLeft
                }
            }, this.getOffset = function() {
                if (T.isfixed) {
                    var e = T.win.offset(),
                        o = T.getDocumentScrollOffset();
                    return e.top -= o.top, e.left -= o.left, e
                }
                var t = T.win.offset();
                if (!T.viewport) return t;
                var r = T.viewport.offset();
                return {
                    top: t.top - r.top,
                    left: t.left - r.left
                }
            }, this.updateScrollBar = function(e) {
                var o, t;
                if (T.ishwscroll) T.rail.css({
                    height: T.win.innerHeight() - (M.railpadding.top + M.railpadding.bottom)
                }), T.railh && T.railh.css({
                    width: T.win.innerWidth() - (M.railpadding.left + M.railpadding.right)
                });
                else {
                    var r = T.getOffset();
                    if (o = {
                            top: r.top,
                            left: r.left - (M.railpadding.left + M.railpadding.right)
                        }, o.top += x(T.win, "border-top-width", !0), o.left += T.rail.align ? T.win.outerWidth() - x(T.win, "border-right-width") - T.rail.width : x(T.win, "border-left-width"), (t = M.railoffset) && (t.top && (o.top += t.top), t.left && (o.left += t.left)), T.railslocked || T.rail.css({
                            top: o.top,
                            left: o.left,
                            height: (e ? e.h : T.win.innerHeight()) - (M.railpadding.top + M.railpadding.bottom)
                        }), T.zoom && T.zoom.css({
                            top: o.top + 1,
                            left: 1 == T.rail.align ? o.left - 20 : o.left + T.rail.width + 4
                        }), T.railh && !T.railslocked) {
                        o = {
                            top: r.top,
                            left: r.left
                        }, (t = M.railhoffset) && (t.top && (o.top += t.top), t.left && (o.left += t.left));
                        var i = T.railh.align ? o.top + x(T.win, "border-top-width", !0) + T.win.innerHeight() - T.railh.height : o.top + x(T.win, "border-top-width", !0),
                            s = o.left + x(T.win, "border-left-width");
                        T.railh.css({
                            top: i - (M.railpadding.top + M.railpadding.bottom),
                            left: s,
                            width: T.railh.width
                        })
                    }
                }
            }, this.doRailClick = function(e, o, t) {
                var r, i, s, n;
                T.railslocked || (T.cancelEvent(e), "pageY" in e || (e.pageX = e.clientX + l.documentElement.scrollLeft, e.pageY = e.clientY + l.documentElement.scrollTop), o ? (r = t ? T.doScrollLeft : T.doScrollTop, s = t ? (e.pageX - T.railh.offset().left - T.cursorwidth / 2) * T.scrollratio.x : (e.pageY - T.rail.offset().top - T.cursorheight / 2) * T.scrollratio.y, T.unsynched("relativexy"), r(0 | s)) : (r = t ? T.doScrollLeftBy : T.doScrollBy, s = t ? T.scroll.x : T.scroll.y, n = t ? e.pageX - T.railh.offset().left : e.pageY - T.rail.offset().top, i = t ? T.view.w : T.view.h, r(s >= n ? i : -i)))
            }, T.newscrolly = T.newscrollx = 0, T.hasanimationframe = "requestAnimationFrame" in a, T.hascancelanimationframe = "cancelAnimationFrame" in a, T.hasborderbox = !1, this.init = function() {
                if (T.saved.css = [], P.isoperamini) return !0;
                if (P.isandroid && !("hidden" in l)) return !0;
                M.emulatetouch = M.emulatetouch || M.touchbehavior, T.hasborderbox = a.getComputedStyle && "border-box" === a.getComputedStyle(l.body)["box-sizing"];
                var e = {
                    "overflow-y": "hidden"
                };
                if ((P.isie11 || P.isie10) && (e["-ms-overflow-style"] = "none"), T.ishwscroll && (this.doc.css(P.transitionstyle, P.prefixstyle + "transform 0ms ease-out"), P.transitionend && T.bind(T.doc, P.transitionend, T.onScrollTransitionEnd, !1)), T.zindex = "auto", T.ispage || "auto" != M.zindex ? T.zindex = M.zindex : T.zindex = b() || "auto", !T.ispage && "auto" != T.zindex && T.zindex > s && (s = T.zindex), T.isie && 0 === T.zindex && "auto" == M.zindex && (T.zindex = "auto"), !T.ispage || !P.isieold) {
                    var i = T.docscroll;
                    T.ispage && (i = T.haswrapper ? T.win : T.doc), T.css(i, e), T.ispage && (P.isie11 || P.isie) && T.css(n("html"), e), !P.isios || T.ispage || T.haswrapper || T.css(E, {
                        "-webkit-overflow-scrolling": "touch"
                    });
                    var d = n(l.createElement("div"));
                    d.css({
                        position: "relative",
                        top: 0,
                        float: "right",
                        width: M.cursorwidth,
                        height: 0,
                        "background-color": M.cursorcolor,
                        border: M.cursorborder,
                        "background-clip": "padding-box",
                        "-webkit-border-radius": M.cursorborderradius,
                        "-moz-border-radius": M.cursorborderradius,
                        "border-radius": M.cursorborderradius
                    }), d.addClass("nicescroll-cursors"), T.cursor = d;
                    var u = n(l.createElement("div"));
                    u.attr("id", T.id), u.addClass("nicescroll-rails nicescroll-rails-vr");
                    var h, p, f = ["left", "right", "top", "bottom"];
                    for (var g in f) p = f[g], (h = M.railpadding[p] || 0) && u.css("padding-" + p, h + "px");
                    u.append(d), u.width = Math.max(parseFloat(M.cursorwidth), d.outerWidth()), u.css({
                        width: u.width + "px",
                        zIndex: T.zindex,
                        background: M.background,
                        cursor: "default"
                    }), u.visibility = !0, u.scrollable = !0, u.align = "left" == M.railalign ? 0 : 1, T.rail = u, T.rail.drag = !1;
                    var v = !1;
                    !M.boxzoom || T.ispage || P.isieold || (v = l.createElement("div"), T.bind(v, "click", T.doZoom), T.bind(v, "mouseenter", function() {
                        T.zoom.css("opacity", M.cursoropacitymax)
                    }), T.bind(v, "mouseleave", function() {
                        T.zoom.css("opacity", M.cursoropacitymin)
                    }), T.zoom = n(v), T.zoom.css({
                        cursor: "pointer",
                        zIndex: T.zindex,
                        backgroundImage: "url(" + M.scriptpath + "zoomico.png)",
                        height: 18,
                        width: 18,
                        backgroundPosition: "0 0"
                    }), M.dblclickzoom && T.bind(T.win, "dblclick", T.doZoom), P.cantouch && M.gesturezoom && (T.ongesturezoom = function(e) {
                        return e.scale > 1.5 && T.doZoomIn(e), e.scale < .8 && T.doZoomOut(e), T.cancelEvent(e)
                    }, T.bind(T.win, "gestureend", T.ongesturezoom))), T.railh = !1;
                    var w;
                    if (M.horizrailenabled && (T.css(i, {
                            overflowX: "hidden"
                        }), (d = n(l.createElement("div"))).css({
                            position: "absolute",
                            top: 0,
                            height: M.cursorwidth,
                            width: 0,
                            backgroundColor: M.cursorcolor,
                            border: M.cursorborder,
                            backgroundClip: "padding-box",
                            "-webkit-border-radius": M.cursorborderradius,
                            "-moz-border-radius": M.cursorborderradius,
                            "border-radius": M.cursorborderradius
                        }), P.isieold && d.css("overflow", "hidden"), d.addClass("nicescroll-cursors"), T.cursorh = d, (w = n(l.createElement("div"))).attr("id", T.id + "-hr"), w.addClass("nicescroll-rails nicescroll-rails-hr"), w.height = Math.max(parseFloat(M.cursorwidth), d.outerHeight()), w.css({
                            height: w.height + "px",
                            zIndex: T.zindex,
                            background: M.background
                        }), w.append(d), w.visibility = !0, w.scrollable = !0, w.align = "top" == M.railvalign ? 0 : 1, T.railh = w, T.railh.drag = !1), T.ispage) u.css({
                        position: "fixed",
                        top: 0,
                        height: "100%"
                    }), u.css(u.align ? {
                        right: 0
                    } : {
                        left: 0
                    }), T.body.append(u), T.railh && (w.css({
                        position: "fixed",
                        left: 0,
                        width: "100%"
                    }), w.css(w.align ? {
                        bottom: 0
                    } : {
                        top: 0
                    }), T.body.append(w));
                    else {
                        if (T.ishwscroll) {
                            "static" == T.win.css("position") && T.css(T.win, {
                                position: "relative"
                            });
                            var x = "HTML" == T.win[0].nodeName ? T.body : T.win;
                            n(x).scrollTop(0).scrollLeft(0), T.zoom && (T.zoom.css({
                                position: "absolute",
                                top: 1,
                                right: 0,
                                "margin-right": u.width + 4
                            }), x.append(T.zoom)), u.css({
                                position: "absolute",
                                top: 0
                            }), u.css(u.align ? {
                                right: 0
                            } : {
                                left: 0
                            }), x.append(u), w && (w.css({
                                position: "absolute",
                                left: 0,
                                bottom: 0
                            }), w.css(w.align ? {
                                bottom: 0
                            } : {
                                top: 0
                            }), x.append(w))
                        } else {
                            T.isfixed = "fixed" == T.win.css("position");
                            var S = T.isfixed ? "fixed" : "absolute";
                            T.isfixed || (T.viewport = T.getViewport(T.win[0])), T.viewport && (T.body = T.viewport, /fixed|absolute/.test(T.viewport.css("position")) || T.css(T.viewport, {
                                position: "relative"
                            })), u.css({
                                position: S
                            }), T.zoom && T.zoom.css({
                                position: S
                            }), T.updateScrollBar(), T.body.append(u), T.zoom && T.body.append(T.zoom), T.railh && (w.css({
                                position: S
                            }), T.body.append(w))
                        }
                        P.isios && T.css(T.win, {
                            "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                            "-webkit-touch-callout": "none"
                        }), M.disableoutline && (P.isie && T.win.attr("hideFocus", "true"), P.iswebkit && T.win.css("outline", "none"))
                    }
                    if (!1 === M.autohidemode ? (T.autohidedom = !1, T.rail.css({
                            opacity: M.cursoropacitymax
                        }), T.railh && T.railh.css({
                            opacity: M.cursoropacitymax
                        })) : !0 === M.autohidemode || "leave" === M.autohidemode ? (T.autohidedom = n().add(T.rail), P.isie8 && (T.autohidedom = T.autohidedom.add(T.cursor)), T.railh && (T.autohidedom = T.autohidedom.add(T.railh)), T.railh && P.isie8 && (T.autohidedom = T.autohidedom.add(T.cursorh))) : "scroll" == M.autohidemode ? (T.autohidedom = n().add(T.rail), T.railh && (T.autohidedom = T.autohidedom.add(T.railh))) : "cursor" == M.autohidemode ? (T.autohidedom = n().add(T.cursor), T.railh && (T.autohidedom = T.autohidedom.add(T.cursorh))) : "hidden" == M.autohidemode && (T.autohidedom = !1, T.hide(), T.railslocked = !1), P.cantouch || T.istouchcapable || M.emulatetouch || P.hasmstouch) {
                        T.scrollmom = new y(T);
                        T.ontouchstart = function(e) {
                            if (T.locked) return !1;
                            if (e.pointerType && ("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return !1;
                            if (T.hasmoving = !1, T.scrollmom.timer && (T.triggerScrollEnd(), T.scrollmom.stop()), !T.railslocked) {
                                var o = T.getTarget(e);
                                if (o && /INPUT/i.test(o.nodeName) && /range/i.test(o.type)) return T.stopPropagation(e);
                                var t = "mousedown" === e.type;
                                if (!("clientX" in e) && "changedTouches" in e && (e.clientX = e.changedTouches[0].clientX, e.clientY = e.changedTouches[0].clientY), T.forcescreen) {
                                    var r = e;
                                    (e = {
                                        original: e.original ? e.original : e
                                    }).clientX = r.screenX, e.clientY = r.screenY
                                }
                                if (T.rail.drag = {
                                        x: e.clientX,
                                        y: e.clientY,
                                        sx: T.scroll.x,
                                        sy: T.scroll.y,
                                        st: T.getScrollTop(),
                                        sl: T.getScrollLeft(),
                                        pt: 2,
                                        dl: !1,
                                        tg: o
                                    }, T.ispage || !M.directionlockdeadzone) T.rail.drag.dl = "f";
                                else {
                                    var i = {
                                            w: c.width(),
                                            h: c.height()
                                        },
                                        s = T.getContentSize(),
                                        l = s.h - i.h,
                                        a = s.w - i.w;
                                    T.rail.scrollable && !T.railh.scrollable ? T.rail.drag.ck = l > 0 && "v" : !T.rail.scrollable && T.railh.scrollable ? T.rail.drag.ck = a > 0 && "h" : T.rail.drag.ck = !1
                                }
                                if (M.emulatetouch && T.isiframe && P.isie) {
                                    var d = T.win.position();
                                    T.rail.drag.x += d.left, T.rail.drag.y += d.top
                                }
                                if (T.hasmoving = !1, T.lastmouseup = !1, T.scrollmom.reset(e.clientX, e.clientY), o && t) {
                                    if (!/INPUT|SELECT|BUTTON|TEXTAREA/i.test(o.nodeName)) return P.hasmousecapture && o.setCapture(), M.emulatetouch ? (o.onclick && !o._onclick && (o._onclick = o.onclick, o.onclick = function(e) {
                                        if (T.hasmoving) return !1;
                                        o._onclick.call(this, e)
                                    }), T.cancelEvent(e)) : T.stopPropagation(e);
                                    /SUBMIT|CANCEL|BUTTON/i.test(n(o).attr("type")) && (T.preventclick = {
                                        tg: o,
                                        click: !1
                                    })
                                }
                            }
                        }, T.ontouchend = function(e) {
                            if (!T.rail.drag) return !0;
                            if (2 == T.rail.drag.pt) {
                                if (e.pointerType && ("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return !1;
                                T.rail.drag = !1;
                                var o = "mouseup" === e.type;
                                if (T.hasmoving && (T.scrollmom.doMomentum(), T.lastmouseup = !0, T.hideCursor(), P.hasmousecapture && l.releaseCapture(), o)) return T.cancelEvent(e)
                            } else if (1 == T.rail.drag.pt) return T.onmouseup(e)
                        };
                        var z = M.emulatetouch && T.isiframe && !P.hasmousecapture,
                            k = .3 * M.directionlockdeadzone | 0;
                        T.ontouchmove = function(e, o) {
                            if (!T.rail.drag) return !0;
                            if (e.targetTouches && M.preventmultitouchscrolling && e.targetTouches.length > 1) return !0;
                            if (e.pointerType && ("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return !0;
                            if (2 == T.rail.drag.pt) {
                                "changedTouches" in e && (e.clientX = e.changedTouches[0].clientX, e.clientY = e.changedTouches[0].clientY);
                                var t, r;
                                if (r = t = 0, z && !o) {
                                    var i = T.win.position();
                                    r = -i.left, t = -i.top
                                }
                                var s = e.clientY + t,
                                    n = s - T.rail.drag.y,
                                    a = e.clientX + r,
                                    c = a - T.rail.drag.x,
                                    d = T.rail.drag.st - n;
                                if (T.ishwscroll && M.bouncescroll) d < 0 ? d = Math.round(d / 2) : d > T.page.maxh && (d = T.page.maxh + Math.round((d - T.page.maxh) / 2));
                                else if (d < 0 ? (d = 0, s = 0) : d > T.page.maxh && (d = T.page.maxh, s = 0), 0 === s && !T.hasmoving) return T.ispage || (T.rail.drag = !1), !0;
                                var u = T.getScrollLeft();
                                if (T.railh && T.railh.scrollable && (u = T.isrtlmode ? c - T.rail.drag.sl : T.rail.drag.sl - c, T.ishwscroll && M.bouncescroll ? u < 0 ? u = Math.round(u / 2) : u > T.page.maxw && (u = T.page.maxw + Math.round((u - T.page.maxw) / 2)) : (u < 0 && (u = 0, a = 0), u > T.page.maxw && (u = T.page.maxw, a = 0))), !T.hasmoving) {
                                    if (T.rail.drag.y === e.clientY && T.rail.drag.x === e.clientX) return T.cancelEvent(e);
                                    var h = Math.abs(n),
                                        p = Math.abs(c),
                                        m = M.directionlockdeadzone;
                                    if (T.rail.drag.ck ? "v" == T.rail.drag.ck ? p > m && h <= k ? T.rail.drag = !1 : h > m && (T.rail.drag.dl = "v") : "h" == T.rail.drag.ck && (h > m && p <= k ? T.rail.drag = !1 : p > m && (T.rail.drag.dl = "h")) : h > m && p > m ? T.rail.drag.dl = "f" : h > m ? T.rail.drag.dl = p > k ? "f" : "v" : p > m && (T.rail.drag.dl = h > k ? "f" : "h"), !T.rail.drag.dl) return T.cancelEvent(e);
                                    T.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0), T.hasmoving = !0
                                }
                                return T.preventclick && !T.preventclick.click && (T.preventclick.click = T.preventclick.tg.onclick || !1, T.preventclick.tg.onclick = T.onpreventclick), T.rail.drag.dl && ("v" == T.rail.drag.dl ? u = T.rail.drag.sl : "h" == T.rail.drag.dl && (d = T.rail.drag.st)), T.synched("touchmove", function() {
                                    T.rail.drag && 2 == T.rail.drag.pt && (T.prepareTransition && T.resetTransition(), T.rail.scrollable && T.setScrollTop(d), T.scrollmom.update(a, s), T.railh && T.railh.scrollable ? (T.setScrollLeft(u), T.showCursor(d, u)) : T.showCursor(d), P.isie10 && l.selection.clear())
                                }), T.cancelEvent(e)
                            }
                            return 1 == T.rail.drag.pt ? T.onmousemove(e) : void 0
                        }, T.ontouchstartCursor = function(e, o) {
                            if (!T.rail.drag || 3 == T.rail.drag.pt) {
                                if (T.locked) return T.cancelEvent(e);
                                T.cancelScroll(), T.rail.drag = {
                                    x: e.touches[0].clientX,
                                    y: e.touches[0].clientY,
                                    sx: T.scroll.x,
                                    sy: T.scroll.y,
                                    pt: 3,
                                    hr: !!o
                                };
                                var t = T.getTarget(e);
                                return !T.ispage && P.hasmousecapture && t.setCapture(), T.isiframe && !P.hasmousecapture && (T.saved.csspointerevents = T.doc.css("pointer-events"), T.css(T.doc, {
                                    "pointer-events": "none"
                                })), T.cancelEvent(e)
                            }
                        }, T.ontouchendCursor = function(e) {
                            if (T.rail.drag) {
                                if (P.hasmousecapture && l.releaseCapture(), T.isiframe && !P.hasmousecapture && T.doc.css("pointer-events", T.saved.csspointerevents), 3 != T.rail.drag.pt) return;
                                return T.rail.drag = !1, T.cancelEvent(e)
                            }
                        }, T.ontouchmoveCursor = function(e) {
                            if (T.rail.drag) {
                                if (3 != T.rail.drag.pt) return;
                                if (T.cursorfreezed = !0, T.rail.drag.hr) {
                                    T.scroll.x = T.rail.drag.sx + (e.touches[0].clientX - T.rail.drag.x), T.scroll.x < 0 && (T.scroll.x = 0);
                                    var o = T.scrollvaluemaxw;
                                    T.scroll.x > o && (T.scroll.x = o)
                                } else {
                                    T.scroll.y = T.rail.drag.sy + (e.touches[0].clientY - T.rail.drag.y), T.scroll.y < 0 && (T.scroll.y = 0);
                                    var t = T.scrollvaluemax;
                                    T.scroll.y > t && (T.scroll.y = t)
                                }
                                return T.synched("touchmove", function() {
                                    T.rail.drag && 3 == T.rail.drag.pt && (T.showCursor(), T.rail.drag.hr ? T.doScrollLeft(Math.round(T.scroll.x * T.scrollratio.x), M.cursordragspeed) : T.doScrollTop(Math.round(T.scroll.y * T.scrollratio.y), M.cursordragspeed))
                                }), T.cancelEvent(e)
                            }
                        }
                    }
                    if (T.onmousedown = function(e, o) {
                            if (!T.rail.drag || 1 == T.rail.drag.pt) {
                                if (T.railslocked) return T.cancelEvent(e);
                                T.cancelScroll(), T.rail.drag = {
                                    x: e.clientX,
                                    y: e.clientY,
                                    sx: T.scroll.x,
                                    sy: T.scroll.y,
                                    pt: 1,
                                    hr: o || !1
                                };
                                var t = T.getTarget(e);
                                return P.hasmousecapture && t.setCapture(), T.isiframe && !P.hasmousecapture && (T.saved.csspointerevents = T.doc.css("pointer-events"), T.css(T.doc, {
                                    "pointer-events": "none"
                                })), T.hasmoving = !1, T.cancelEvent(e)
                            }
                        }, T.onmouseup = function(e) {
                            if (T.rail.drag) return 1 != T.rail.drag.pt || (P.hasmousecapture && l.releaseCapture(), T.isiframe && !P.hasmousecapture && T.doc.css("pointer-events", T.saved.csspointerevents), T.rail.drag = !1, T.cursorfreezed = !1, T.hasmoving && T.triggerScrollEnd(), T.cancelEvent(e))
                        }, T.onmousemove = function(e) {
                            if (T.rail.drag) {
                                if (1 !== T.rail.drag.pt) return;
                                if (P.ischrome && 0 === e.which) return T.onmouseup(e);
                                if (T.cursorfreezed = !0, T.hasmoving || T.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0), T.hasmoving = !0, T.rail.drag.hr) {
                                    T.scroll.x = T.rail.drag.sx + (e.clientX - T.rail.drag.x), T.scroll.x < 0 && (T.scroll.x = 0);
                                    var o = T.scrollvaluemaxw;
                                    T.scroll.x > o && (T.scroll.x = o)
                                } else {
                                    T.scroll.y = T.rail.drag.sy + (e.clientY - T.rail.drag.y), T.scroll.y < 0 && (T.scroll.y = 0);
                                    var t = T.scrollvaluemax;
                                    T.scroll.y > t && (T.scroll.y = t)
                                }
                                return T.synched("mousemove", function() {
                                    T.cursorfreezed && (T.showCursor(), T.rail.drag.hr ? T.scrollLeft(Math.round(T.scroll.x * T.scrollratio.x)) : T.scrollTop(Math.round(T.scroll.y * T.scrollratio.y)))
                                }), T.cancelEvent(e)
                            }
                            T.checkarea = 0
                        }, P.cantouch || M.emulatetouch) T.onpreventclick = function(e) {
                        if (T.preventclick) return T.preventclick.tg.onclick = T.preventclick.click, T.preventclick = !1, T.cancelEvent(e)
                    }, T.onclick = !P.isios && function(e) {
                        return !T.lastmouseup || (T.lastmouseup = !1, T.cancelEvent(e))
                    }, M.grabcursorenabled && P.cursorgrabvalue && (T.css(T.ispage ? T.doc : T.win, {
                        cursor: P.cursorgrabvalue
                    }), T.css(T.rail, {
                        cursor: P.cursorgrabvalue
                    }));
                    else {
                        var L = function(e) {
                            if (T.selectiondrag) {
                                if (e) {
                                    var o = T.win.outerHeight(),
                                        t = e.pageY - T.selectiondrag.top;
                                    t > 0 && t < o && (t = 0), t >= o && (t -= o), T.selectiondrag.df = t
                                }
                                if (0 !== T.selectiondrag.df) {
                                    var r = -2 * T.selectiondrag.df / 6 | 0;
                                    T.doScrollBy(r), T.debounced("doselectionscroll", function() {
                                        L()
                                    }, 50)
                                }
                            }
                        };
                        T.hasTextSelected = "getSelection" in l ? function() {
                            return l.getSelection().rangeCount > 0
                        } : "selection" in l ? function() {
                            return "None" != l.selection.type
                        } : function() {
                            return !1
                        }, T.onselectionstart = function(e) {
                            T.ispage || (T.selectiondrag = T.win.offset())
                        }, T.onselectionend = function(e) {
                            T.selectiondrag = !1
                        }, T.onselectiondrag = function(e) {
                            T.selectiondrag && T.hasTextSelected() && T.debounced("selectionscroll", function() {
                                L(e)
                            }, 250)
                        }
                    }
                    if (P.hasw3ctouch ? (T.css(T.ispage ? n("html") : T.win, {
                            "touch-action": "none"
                        }), T.css(T.rail, {
                            "touch-action": "none"
                        }), T.css(T.cursor, {
                            "touch-action": "none"
                        }), T.bind(T.win, "pointerdown", T.ontouchstart), T.bind(l, "pointerup", T.ontouchend), T.delegate(l, "pointermove", T.ontouchmove)) : P.hasmstouch ? (T.css(T.ispage ? n("html") : T.win, {
                            "-ms-touch-action": "none"
                        }), T.css(T.rail, {
                            "-ms-touch-action": "none"
                        }), T.css(T.cursor, {
                            "-ms-touch-action": "none"
                        }), T.bind(T.win, "MSPointerDown", T.ontouchstart), T.bind(l, "MSPointerUp", T.ontouchend), T.delegate(l, "MSPointerMove", T.ontouchmove), T.bind(T.cursor, "MSGestureHold", function(e) {
                            e.preventDefault()
                        }), T.bind(T.cursor, "contextmenu", function(e) {
                            e.preventDefault()
                        })) : P.cantouch && (T.bind(T.win, "touchstart", T.ontouchstart, !1, !0), T.bind(l, "touchend", T.ontouchend, !1, !0), T.bind(l, "touchcancel", T.ontouchend, !1, !0), T.delegate(l, "touchmove", T.ontouchmove, !1, !0)), M.emulatetouch && (T.bind(T.win, "mousedown", T.ontouchstart, !1, !0), T.bind(l, "mouseup", T.ontouchend, !1, !0), T.bind(l, "mousemove", T.ontouchmove, !1, !0)), (M.cursordragontouch || !P.cantouch && !M.emulatetouch) && (T.rail.css({
                            cursor: "default"
                        }), T.railh && T.railh.css({
                            cursor: "default"
                        }), T.jqbind(T.rail, "mouseenter", function() {
                            if (!T.ispage && !T.win.is(":visible")) return !1;
                            T.canshowonmouseevent && T.showCursor(), T.rail.active = !0
                        }), T.jqbind(T.rail, "mouseleave", function() {
                            T.rail.active = !1, T.rail.drag || T.hideCursor()
                        }), M.sensitiverail && (T.bind(T.rail, "click", function(e) {
                            T.doRailClick(e, !1, !1)
                        }), T.bind(T.rail, "dblclick", function(e) {
                            T.doRailClick(e, !0, !1)
                        }), T.bind(T.cursor, "click", function(e) {
                            T.cancelEvent(e)
                        }), T.bind(T.cursor, "dblclick", function(e) {
                            T.cancelEvent(e)
                        })), T.railh && (T.jqbind(T.railh, "mouseenter", function() {
                            if (!T.ispage && !T.win.is(":visible")) return !1;
                            T.canshowonmouseevent && T.showCursor(), T.rail.active = !0
                        }), T.jqbind(T.railh, "mouseleave", function() {
                            T.rail.active = !1, T.rail.drag || T.hideCursor()
                        }), M.sensitiverail && (T.bind(T.railh, "click", function(e) {
                            T.doRailClick(e, !1, !0)
                        }), T.bind(T.railh, "dblclick", function(e) {
                            T.doRailClick(e, !0, !0)
                        }), T.bind(T.cursorh, "click", function(e) {
                            T.cancelEvent(e)
                        }), T.bind(T.cursorh, "dblclick", function(e) {
                            T.cancelEvent(e)
                        })))), M.cursordragontouch && (this.istouchcapable || P.cantouch) && (T.bind(T.cursor, "touchstart", T.ontouchstartCursor), T.bind(T.cursor, "touchmove", T.ontouchmoveCursor), T.bind(T.cursor, "touchend", T.ontouchendCursor), T.cursorh && T.bind(T.cursorh, "touchstart", function(e) {
                            T.ontouchstartCursor(e, !0)
                        }), T.cursorh && T.bind(T.cursorh, "touchmove", T.ontouchmoveCursor), T.cursorh && T.bind(T.cursorh, "touchend", T.ontouchendCursor)), M.emulatetouch || P.isandroid || P.isios ? (T.bind(P.hasmousecapture ? T.win : l, "mouseup", T.ontouchend), T.onclick && T.bind(l, "click", T.onclick), M.cursordragontouch ? (T.bind(T.cursor, "mousedown", T.onmousedown), T.bind(T.cursor, "mouseup", T.onmouseup), T.cursorh && T.bind(T.cursorh, "mousedown", function(e) {
                            T.onmousedown(e, !0)
                        }), T.cursorh && T.bind(T.cursorh, "mouseup", T.onmouseup)) : (T.bind(T.rail, "mousedown", function(e) {
                            e.preventDefault()
                        }), T.railh && T.bind(T.railh, "mousedown", function(e) {
                            e.preventDefault()
                        }))) : (T.bind(P.hasmousecapture ? T.win : l, "mouseup", T.onmouseup), T.bind(l, "mousemove", T.onmousemove), T.onclick && T.bind(l, "click", T.onclick), T.bind(T.cursor, "mousedown", T.onmousedown), T.bind(T.cursor, "mouseup", T.onmouseup), T.railh && (T.bind(T.cursorh, "mousedown", function(e) {
                            T.onmousedown(e, !0)
                        }), T.bind(T.cursorh, "mouseup", T.onmouseup)), !T.ispage && M.enablescrollonselection && (T.bind(T.win[0], "mousedown", T.onselectionstart), T.bind(l, "mouseup", T.onselectionend), T.bind(T.cursor, "mouseup", T.onselectionend), T.cursorh && T.bind(T.cursorh, "mouseup", T.onselectionend), T.bind(l, "mousemove", T.onselectiondrag)), T.zoom && (T.jqbind(T.zoom, "mouseenter", function() {
                            T.canshowonmouseevent && T.showCursor(), T.rail.active = !0
                        }), T.jqbind(T.zoom, "mouseleave", function() {
                            T.rail.active = !1, T.rail.drag || T.hideCursor()
                        }))), M.enablemousewheel && (T.isiframe || T.mousewheel(P.isie && T.ispage ? l : T.win, T.onmousewheel), T.mousewheel(T.rail, T.onmousewheel), T.railh && T.mousewheel(T.railh, T.onmousewheelhr)), T.ispage || P.cantouch || /HTML|^BODY/.test(T.win[0].nodeName) || (T.win.attr("tabindex") || T.win.attr({
                            tabindex: ++r
                        }), T.bind(T.win, "focus", function(e) {
                            o = T.getTarget(e).id || T.getTarget(e) || !1, T.hasfocus = !0, T.canshowonmouseevent && T.noticeCursor()
                        }), T.bind(T.win, "blur", function(e) {
                            o = !1, T.hasfocus = !1
                        }), T.bind(T.win, "mouseenter", function(e) {
                            t = T.getTarget(e).id || T.getTarget(e) || !1, T.hasmousefocus = !0, T.canshowonmouseevent && T.noticeCursor()
                        }), T.bind(T.win, "mouseleave", function(e) {
                            t = !1, T.hasmousefocus = !1, T.rail.drag || T.hideCursor()
                        })), T.onkeypress = function(e) {
                            if (T.railslocked && 0 === T.page.maxh) return !0;
                            e = e || a.event;
                            var r = T.getTarget(e);
                            if (r && /INPUT|TEXTAREA|SELECT|OPTION/.test(r.nodeName) && (!(r.getAttribute("type") || r.type || !1) || !/submit|button|cancel/i.tp)) return !0;
                            if (n(r).attr("contenteditable")) return !0;
                            if (T.hasfocus || T.hasmousefocus && !o || T.ispage && !o && !t) {
                                var i = e.keyCode;
                                if (T.railslocked && 27 != i) return T.cancelEvent(e);
                                var s = e.ctrlKey || !1,
                                    l = e.shiftKey || !1,
                                    c = !1;
                                switch (i) {
                                    case 38:
                                    case 63233:
                                        T.doScrollBy(72), c = !0;
                                        break;
                                    case 40:
                                    case 63235:
                                        T.doScrollBy(-72), c = !0;
                                        break;
                                    case 37:
                                    case 63232:
                                        T.railh && (s ? T.doScrollLeft(0) : T.doScrollLeftBy(72), c = !0);
                                        break;
                                    case 39:
                                    case 63234:
                                        T.railh && (s ? T.doScrollLeft(T.page.maxw) : T.doScrollLeftBy(-72), c = !0);
                                        break;
                                    case 33:
                                    case 63276:
                                        T.doScrollBy(T.view.h), c = !0;
                                        break;
                                    case 34:
                                    case 63277:
                                        T.doScrollBy(-T.view.h), c = !0;
                                        break;
                                    case 36:
                                    case 63273:
                                        T.railh && s ? T.doScrollPos(0, 0) : T.doScrollTo(0), c = !0;
                                        break;
                                    case 35:
                                    case 63275:
                                        T.railh && s ? T.doScrollPos(T.page.maxw, T.page.maxh) : T.doScrollTo(T.page.maxh), c = !0;
                                        break;
                                    case 32:
                                        M.spacebarenabled && (l ? T.doScrollBy(T.view.h) : T.doScrollBy(-T.view.h), c = !0);
                                        break;
                                    case 27:
                                        T.zoomactive && (T.doZoom(), c = !0)
                                }
                                if (c) return T.cancelEvent(e)
                            }
                        }, M.enablekeyboard && T.bind(l, P.isopera && !P.isopera12 ? "keypress" : "keydown", T.onkeypress), T.bind(l, "keydown", function(e) {
                            (e.ctrlKey || !1) && (T.wheelprevented = !0)
                        }), T.bind(l, "keyup", function(e) {
                            e.ctrlKey || !1 || (T.wheelprevented = !1)
                        }), T.bind(a, "blur", function(e) {
                            T.wheelprevented = !1
                        }), T.bind(a, "resize", T.onscreenresize), T.bind(a, "orientationchange", T.onscreenresize), T.bind(a, "load", T.lazyResize), P.ischrome && !T.ispage && !T.haswrapper) {
                        var C = T.win.attr("style"),
                            N = parseFloat(T.win.css("width")) + 1;
                        T.win.css("width", N), T.synched("chromefix", function() {
                            T.win.attr("style", C)
                        })
                    }
                    if (T.onAttributeChange = function(e) {
                            T.lazyResize(T.isieold ? 250 : 30)
                        }, M.enableobserver && (T.isie11 || !1 === m || (T.observerbody = new m(function(e) {
                            if (e.forEach(function(e) {
                                    if ("attributes" == e.type) return E.hasClass("modal-open") && E.hasClass("modal-dialog") && !n.contains(n(".modal-dialog")[0], T.doc[0]) ? T.hide() : T.show()
                                }), T.me.clientWidth != T.page.width || T.me.clientHeight != T.page.height) return T.lazyResize(30)
                        }), T.observerbody.observe(l.body, {
                            childList: !0,
                            subtree: !0,
                            characterData: !1,
                            attributes: !0,
                            attributeFilter: ["class"]
                        })), !T.ispage && !T.haswrapper)) {
                        var R = T.win[0];
                        !1 !== m ? (T.observer = new m(function(e) {
                            e.forEach(T.onAttributeChange)
                        }), T.observer.observe(R, {
                            childList: !0,
                            characterData: !1,
                            attributes: !0,
                            subtree: !1
                        }), T.observerremover = new m(function(e) {
                            e.forEach(function(e) {
                                if (e.removedNodes.length > 0)
                                    for (var o in e.removedNodes)
                                        if (T && e.removedNodes[o] === R) return T.remove()
                            })
                        }), T.observerremover.observe(R.parentNode, {
                            childList: !0,
                            characterData: !1,
                            attributes: !1,
                            subtree: !1
                        })) : (T.bind(R, P.isie && !P.isie9 ? "propertychange" : "DOMAttrModified", T.onAttributeChange), P.isie9 && R.attachEvent("onpropertychange", T.onAttributeChange), T.bind(R, "DOMNodeRemoved", function(e) {
                            e.target === R && T.remove()
                        }))
                    }!T.ispage && M.boxzoom && T.bind(a, "resize", T.resizeZoom), T.istextarea && (T.bind(T.win, "keydown", T.lazyResize), T.bind(T.win, "mouseup", T.lazyResize)), T.lazyResize(30)
                }
                if ("IFRAME" == this.doc[0].nodeName) {
                    var _ = function() {
                        T.iframexd = !1;
                        var o;
                        try {
                            (o = "contentDocument" in this ? this.contentDocument : this.contentWindow._doc).domain
                        } catch (e) {
                            T.iframexd = !0, o = !1
                        }
                        if (T.iframexd) return "console" in a && console.log("NiceScroll error: policy restriced iframe"), !0;
                        if (T.forcescreen = !0, T.isiframe && (T.iframe = {
                                doc: n(o),
                                html: T.doc.contents().find("html")[0],
                                body: T.doc.contents().find("body")[0]
                            }, T.getContentSize = function() {
                                return {
                                    w: Math.max(T.iframe.html.scrollWidth, T.iframe.body.scrollWidth),
                                    h: Math.max(T.iframe.html.scrollHeight, T.iframe.body.scrollHeight)
                                }
                            }, T.docscroll = n(T.iframe.body)), !P.isios && M.iframeautoresize && !T.isiframe) {
                            T.win.scrollTop(0), T.doc.height("");
                            var t = Math.max(o.getElementsByTagName("html")[0].scrollHeight, o.body.scrollHeight);
                            T.doc.height(t)
                        }
                        T.lazyResize(30), T.css(n(T.iframe.body), e), P.isios && T.haswrapper && T.css(n(o.body), {
                            "-webkit-transform": "translate3d(0,0,0)"
                        }), "contentWindow" in this ? T.bind(this.contentWindow, "scroll", T.onscroll) : T.bind(o, "scroll", T.onscroll), M.enablemousewheel && T.mousewheel(o, T.onmousewheel), M.enablekeyboard && T.bind(o, P.isopera ? "keypress" : "keydown", T.onkeypress), P.cantouch ? (T.bind(o, "touchstart", T.ontouchstart), T.bind(o, "touchmove", T.ontouchmove)) : M.emulatetouch && (T.bind(o, "mousedown", T.ontouchstart), T.bind(o, "mousemove", function(e) {
                            return T.ontouchmove(e, !0)
                        }), M.grabcursorenabled && P.cursorgrabvalue && T.css(n(o.body), {
                            cursor: P.cursorgrabvalue
                        })), T.bind(o, "mouseup", T.ontouchend), T.zoom && (M.dblclickzoom && T.bind(o, "dblclick", T.doZoom), T.ongesturezoom && T.bind(o, "gestureend", T.ongesturezoom))
                    };
                    this.doc[0].readyState && "complete" === this.doc[0].readyState && setTimeout(function() {
                        _.call(T.doc[0], !1)
                    }, 500), T.bind(this.doc, "load", _)
                }
            }, this.showCursor = function(e, o) {
                if (T.cursortimeout && (clearTimeout(T.cursortimeout), T.cursortimeout = 0), T.rail) {
                    if (T.autohidedom && (T.autohidedom.stop().css({
                            opacity: M.cursoropacitymax
                        }), T.cursoractive = !0), T.rail.drag && 1 == T.rail.drag.pt || (void 0 !== e && !1 !== e && (T.scroll.y = e / T.scrollratio.y | 0), void 0 !== o && (T.scroll.x = o / T.scrollratio.x | 0)), T.cursor.css({
                            height: T.cursorheight,
                            top: T.scroll.y
                        }), T.cursorh) {
                        var t = T.hasreversehr ? T.scrollvaluemaxw - T.scroll.x : T.scroll.x;
                        T.cursorh.css({
                            width: T.cursorwidth,
                            left: !T.rail.align && T.rail.visibility ? t + T.rail.width : t
                        }), T.cursoractive = !0
                    }
                    T.zoom && T.zoom.stop().css({
                        opacity: M.cursoropacitymax
                    })
                }
            }, this.hideCursor = function(e) {
                T.cursortimeout || T.rail && T.autohidedom && (T.hasmousefocus && "leave" === M.autohidemode || (T.cursortimeout = setTimeout(function() {
                    T.rail.active && T.showonmouseevent || (T.autohidedom.stop().animate({
                        opacity: M.cursoropacitymin
                    }), T.zoom && T.zoom.stop().animate({
                        opacity: M.cursoropacitymin
                    }), T.cursoractive = !1), T.cursortimeout = 0
                }, e || M.hidecursordelay)))
            }, this.noticeCursor = function(e, o, t) {
                T.showCursor(o, t), T.rail.active || T.hideCursor(e)
            }, this.getContentSize = T.ispage ? function() {
                return {
                    w: Math.max(l.body.scrollWidth, l.documentElement.scrollWidth),
                    h: Math.max(l.body.scrollHeight, l.documentElement.scrollHeight)
                }
            } : T.haswrapper ? function() {
                return {
                    w: T.doc[0].offsetWidth,
                    h: T.doc[0].offsetHeight
                }
            } : function() {
                return {
                    w: T.docscroll[0].scrollWidth,
                    h: T.docscroll[0].scrollHeight
                }
            }, this.onResize = function(e, o) {
                if (!T || !T.win) return !1;
                var t = T.page.maxh,
                    r = T.page.maxw,
                    i = T.view.h,
                    s = T.view.w;
                if (T.view = {
                        w: T.ispage ? T.win.width() : T.win[0].clientWidth,
                        h: T.ispage ? T.win.height() : T.win[0].clientHeight
                    }, T.page = o || T.getContentSize(), T.page.maxh = Math.max(0, T.page.h - T.view.h), T.page.maxw = Math.max(0, T.page.w - T.view.w), T.page.maxh == t && T.page.maxw == r && T.view.w == s && T.view.h == i) {
                    if (T.ispage) return T;
                    var n = T.win.offset();
                    if (T.lastposition) {
                        var l = T.lastposition;
                        if (l.top == n.top && l.left == n.left) return T
                    }
                    T.lastposition = n
                }
                return 0 === T.page.maxh ? (T.hideRail(), T.scrollvaluemax = 0, T.scroll.y = 0, T.scrollratio.y = 0, T.cursorheight = 0, T.setScrollTop(0), T.rail && (T.rail.scrollable = !1)) : (T.page.maxh -= M.railpadding.top + M.railpadding.bottom, T.rail.scrollable = !0), 0 === T.page.maxw ? (T.hideRailHr(), T.scrollvaluemaxw = 0, T.scroll.x = 0, T.scrollratio.x = 0, T.cursorwidth = 0, T.setScrollLeft(0), T.railh && (T.railh.scrollable = !1)) : (T.page.maxw -= M.railpadding.left + M.railpadding.right, T.railh && (T.railh.scrollable = M.horizrailenabled)), T.railslocked = T.locked || 0 === T.page.maxh && 0 === T.page.maxw, T.railslocked ? (T.ispage || T.updateScrollBar(T.view), !1) : (T.hidden || (T.rail.visibility || T.showRail(), T.railh && !T.railh.visibility && T.showRailHr()), T.istextarea && T.win.css("resize") && "none" != T.win.css("resize") && (T.view.h -= 20), T.cursorheight = Math.min(T.view.h, Math.round(T.view.h * (T.view.h / T.page.h))), T.cursorheight = M.cursorfixedheight ? M.cursorfixedheight : Math.max(M.cursorminheight, T.cursorheight), T.cursorwidth = Math.min(T.view.w, Math.round(T.view.w * (T.view.w / T.page.w))), T.cursorwidth = M.cursorfixedheight ? M.cursorfixedheight : Math.max(M.cursorminheight, T.cursorwidth), T.scrollvaluemax = T.view.h - T.cursorheight - (M.railpadding.top + M.railpadding.bottom), T.hasborderbox || (T.scrollvaluemax -= T.cursor[0].offsetHeight - T.cursor[0].clientHeight), T.railh && (T.railh.width = T.page.maxh > 0 ? T.view.w - T.rail.width : T.view.w, T.scrollvaluemaxw = T.railh.width - T.cursorwidth - (M.railpadding.left + M.railpadding.right)), T.ispage || T.updateScrollBar(T.view), T.scrollratio = {
                    x: T.page.maxw / T.scrollvaluemaxw,
                    y: T.page.maxh / T.scrollvaluemax
                }, T.getScrollTop() > T.page.maxh ? T.doScrollTop(T.page.maxh) : (T.scroll.y = T.getScrollTop() / T.scrollratio.y | 0, T.scroll.x = T.getScrollLeft() / T.scrollratio.x | 0, T.cursoractive && T.noticeCursor()), T.scroll.y && 0 === T.getScrollTop() && T.doScrollTo(T.scroll.y * T.scrollratio.y | 0), T)
            }, this.resize = T.onResize;
            var O = 0;
            this.onscreenresize = function(e) {
                clearTimeout(O);
                var o = !T.ispage && !T.haswrapper;
                o && T.hideRails(), O = setTimeout(function() {
                    T && (o && T.showRails(), T.resize()), O = 0
                }, 120)
            }, this.lazyResize = function(e) {
                return clearTimeout(O), e = isNaN(e) ? 240 : e, O = setTimeout(function() {
                    T && T.resize(), O = 0
                }, e), T
            }, this.jqbind = function(e, o, t) {
                T.events.push({
                    e: e,
                    n: o,
                    f: t,
                    q: !0
                }), n(e).on(o, t)
            }, this.mousewheel = function(e, o, t) {
                var r = "jquery" in e ? e[0] : e;
                if ("onwheel" in l.createElement("div")) T._bind(r, "wheel", o, t || !1);
                else {
                    var i = void 0 !== l.onmousewheel ? "mousewheel" : "DOMMouseScroll";
                    S(r, i, o, t || !1), "DOMMouseScroll" == i && S(r, "MozMousePixelScroll", o, t || !1)
                }
            };
            var Y = !1;
            if (P.haseventlistener) {
                try {
                    var H = Object.defineProperty({}, "passive", {
                        get: function() {
                            Y = !0
                        }
                    });
                    a.addEventListener("test", null, H)
                } catch (e) {}
                this.stopPropagation = function(e) {
                    return !!e && ((e = e.original ? e.original : e).stopPropagation(), !1)
                }, this.cancelEvent = function(e) {
                    return e.cancelable && e.preventDefault(), e.stopImmediatePropagation(), e.preventManipulation && e.preventManipulation(), !1
                }
            } else Event.prototype.preventDefault = function() {
                this.returnValue = !1
            }, Event.prototype.stopPropagation = function() {
                this.cancelBubble = !0
            }, a.constructor.prototype.addEventListener = l.constructor.prototype.addEventListener = Element.prototype.addEventListener = function(e, o, t) {
                this.attachEvent("on" + e, o)
            }, a.constructor.prototype.removeEventListener = l.constructor.prototype.removeEventListener = Element.prototype.removeEventListener = function(e, o, t) {
                this.detachEvent("on" + e, o)
            }, this.cancelEvent = function(e) {
                return (e = e || a.event) && (e.cancelBubble = !0, e.cancel = !0, e.returnValue = !1), !1
            }, this.stopPropagation = function(e) {
                return (e = e || a.event) && (e.cancelBubble = !0), !1
            };
            this.delegate = function(e, o, t, r, i) {
                var s = d[o] || !1;
                s || (s = {
                    a: [],
                    l: [],
                    f: function(e) {
                        for (var o = s.l, t = !1, r = o.length - 1; r >= 0; r--)
                            if (!1 === (t = o[r].call(e.target, e))) return !1;
                        return t
                    }
                }, T.bind(e, o, s.f, r, i), d[o] = s), T.ispage ? (s.a = [T.id].concat(s.a), s.l = [t].concat(s.l)) : (s.a.push(T.id), s.l.push(t))
            }, this.undelegate = function(e, o, t, r, i) {
                var s = d[o] || !1;
                if (s && s.l)
                    for (var n = 0, l = s.l.length; n < l; n++) s.a[n] === T.id && (s.a.splice(n), s.l.splice(n), 0 === s.a.length && (T._unbind(e, o, s.l.f), d[o] = null))
            }, this.bind = function(e, o, t, r, i) {
                var s = "jquery" in e ? e[0] : e;
                T._bind(s, o, t, r || !1, i || !1)
            }, this._bind = function(e, o, t, r, i) {
                T.events.push({
                    e: e,
                    n: o,
                    f: t,
                    b: r,
                    q: !1
                }), Y && i ? e.addEventListener(o, t, {
                    passive: !1,
                    capture: r
                }) : e.addEventListener(o, t, r || !1)
            }, this._unbind = function(e, o, t, r) {
                d[o] ? T.undelegate(e, o, t, r) : e.removeEventListener(o, t, r)
            }, this.unbindAll = function() {
                for (var e = 0; e < T.events.length; e++) {
                    var o = T.events[e];
                    o.q ? o.e.unbind(o.n, o.f) : T._unbind(o.e, o.n, o.f, o.b)
                }
            }, this.showRails = function() {
                return T.showRail().showRailHr()
            }, this.showRail = function() {
                return 0 === T.page.maxh || !T.ispage && "none" == T.win.css("display") || (T.rail.visibility = !0, T.rail.css("display", "block")), T
            }, this.showRailHr = function() {
                return T.railh && (0 === T.page.maxw || !T.ispage && "none" == T.win.css("display") || (T.railh.visibility = !0, T.railh.css("display", "block"))), T
            }, this.hideRails = function() {
                return T.hideRail().hideRailHr()
            }, this.hideRail = function() {
                return T.rail.visibility = !1, T.rail.css("display", "none"), T
            }, this.hideRailHr = function() {
                return T.railh && (T.railh.visibility = !1, T.railh.css("display", "none")), T
            }, this.show = function() {
                return T.hidden = !1, T.railslocked = !1, T.showRails()
            }, this.hide = function() {
                return T.hidden = !0, T.railslocked = !0, T.hideRails()
            }, this.toggle = function() {
                return T.hidden ? T.show() : T.hide()
            }, this.remove = function() {
                T.stop(), T.cursortimeout && clearTimeout(T.cursortimeout);
                for (var e in T.delaylist) T.delaylist[e] && h(T.delaylist[e].h);
                T.doZoomOut(), T.unbindAll(), P.isie9 && T.win[0].detachEvent("onpropertychange", T.onAttributeChange), !1 !== T.observer && T.observer.disconnect(), !1 !== T.observerremover && T.observerremover.disconnect(), !1 !== T.observerbody && T.observerbody.disconnect(), T.events = null, T.cursor && T.cursor.remove(), T.cursorh && T.cursorh.remove(), T.rail && T.rail.remove(), T.railh && T.railh.remove(), T.zoom && T.zoom.remove();
                for (var o = 0; o < T.saved.css.length; o++) {
                    var t = T.saved.css[o];
                    t[0].css(t[1], void 0 === t[2] ? "" : t[2])
                }
                T.saved = !1, T.me.data("__nicescroll", "");
                var r = n.nicescroll;
                r.each(function(e) {
                    if (this && this.id === T.id) {
                        delete r[e];
                        for (var o = ++e; o < r.length; o++, e++) r[e] = r[o];
                        --r.length && delete r[r.length]
                    }
                });
                for (var i in T) T[i] = null, delete T[i];
                T = null
            }, this.scrollstart = function(e) {
                return this.onscrollstart = e, T
            }, this.scrollend = function(e) {
                return this.onscrollend = e, T
            }, this.scrollcancel = function(e) {
                return this.onscrollcancel = e, T
            }, this.zoomin = function(e) {
                return this.onzoomin = e, T
            }, this.zoomout = function(e) {
                return this.onzoomout = e, T
            }, this.isScrollable = function(e) {
                var o = e.target ? e.target : e;
                if ("OPTION" == o.nodeName) return !0;
                for (; o && 1 == o.nodeType && o !== this.me[0] && !/^BODY|HTML/.test(o.nodeName);) {
                    var t = n(o),
                        r = t.css("overflowY") || t.css("overflowX") || t.css("overflow") || "";
                    if (/scroll|auto/.test(r)) return o.clientHeight != o.scrollHeight;
                    o = !!o.parentNode && o.parentNode
                }
                return !1
            }, this.getViewport = function(e) {
                for (var o = !(!e || !e.parentNode) && e.parentNode; o && 1 == o.nodeType && !/^BODY|HTML/.test(o.nodeName);) {
                    var t = n(o);
                    if (/fixed|absolute/.test(t.css("position"))) return t;
                    var r = t.css("overflowY") || t.css("overflowX") || t.css("overflow") || "";
                    if (/scroll|auto/.test(r) && o.clientHeight != o.scrollHeight) return t;
                    if (t.getNiceScroll().length > 0) return t;
                    o = !!o.parentNode && o.parentNode
                }
                return !1
            }, this.triggerScrollStart = function(e, o, t, r, i) {
                if (T.onscrollstart) {
                    var s = {
                        type: "scrollstart",
                        current: {
                            x: e,
                            y: o
                        },
                        request: {
                            x: t,
                            y: r
                        },
                        end: {
                            x: T.newscrollx,
                            y: T.newscrolly
                        },
                        speed: i
                    };
                    T.onscrollstart.call(T, s)
                }
            }, this.triggerScrollEnd = function() {
                if (T.onscrollend) {
                    var e = T.getScrollLeft(),
                        o = T.getScrollTop(),
                        t = {
                            type: "scrollend",
                            current: {
                                x: e,
                                y: o
                            },
                            end: {
                                x: e,
                                y: o
                            }
                        };
                    T.onscrollend.call(T, t)
                }
            };
            var B = 0,
                X = 0,
                D = 0,
                A = 1,
                q = !1;
            if (this.onmousewheel = function(e) {
                    if (T.wheelprevented || T.locked) return !1;
                    if (T.railslocked) return T.debounced("checkunlock", T.resize, 250), !1;
                    if (T.rail.drag) return T.cancelEvent(e);
                    if ("auto" === M.oneaxismousemode && 0 !== e.deltaX && (M.oneaxismousemode = !1), M.oneaxismousemode && 0 === e.deltaX && !T.rail.scrollable) return !T.railh || !T.railh.scrollable || T.onmousewheelhr(e);
                    var o = f(),
                        t = !1;
                    if (M.preservenativescrolling && T.checkarea + 600 < o && (T.nativescrollingarea = T.isScrollable(e), t = !0), T.checkarea = o, T.nativescrollingarea) return !0;
                    var r = k(e, !1, t);
                    return r && (T.checkarea = 0), r
                }, this.onmousewheelhr = function(e) {
                    if (!T.wheelprevented) {
                        if (T.railslocked || !T.railh.scrollable) return !0;
                        if (T.rail.drag) return T.cancelEvent(e);
                        var o = f(),
                            t = !1;
                        return M.preservenativescrolling && T.checkarea + 600 < o && (T.nativescrollingarea = T.isScrollable(e), t = !0), T.checkarea = o, !!T.nativescrollingarea || (T.railslocked ? T.cancelEvent(e) : k(e, !0, t))
                    }
                }, this.stop = function() {
                    return T.cancelScroll(), T.scrollmon && T.scrollmon.stop(), T.cursorfreezed = !1, T.scroll.y = Math.round(T.getScrollTop() * (1 / T.scrollratio.y)), T.noticeCursor(), T
                }, this.getTransitionSpeed = function(e) {
                    return 80 + e / 72 * M.scrollspeed | 0
                }, M.smoothscroll)
                if (T.ishwscroll && P.hastransition && M.usetransition && M.smoothscroll) {
                    var j = "";
                    this.resetTransition = function() {
                        j = "", T.doc.css(P.prefixstyle + "transition-duration", "0ms")
                    }, this.prepareTransition = function(e, o) {
                        var t = o ? e : T.getTransitionSpeed(e),
                            r = t + "ms";
                        return j !== r && (j = r, T.doc.css(P.prefixstyle + "transition-duration", r)), t
                    }, this.doScrollLeft = function(e, o) {
                        var t = T.scrollrunning ? T.newscrolly : T.getScrollTop();
                        T.doScrollPos(e, t, o)
                    }, this.doScrollTop = function(e, o) {
                        var t = T.scrollrunning ? T.newscrollx : T.getScrollLeft();
                        T.doScrollPos(t, e, o)
                    }, this.cursorupdate = {
                        running: !1,
                        start: function() {
                            var e = this;
                            if (!e.running) {
                                e.running = !0;
                                var o = function() {
                                    e.running && u(o), T.showCursor(T.getScrollTop(), T.getScrollLeft()), T.notifyScrollEvent(T.win[0])
                                };
                                u(o)
                            }
                        },
                        stop: function() {
                            this.running = !1
                        }
                    }, this.doScrollPos = function(e, o, t) {
                        var r = T.getScrollTop(),
                            i = T.getScrollLeft();
                        if (((T.newscrolly - r) * (o - r) < 0 || (T.newscrollx - i) * (e - i) < 0) && T.cancelScroll(), M.bouncescroll ? (o < 0 ? o = o / 2 | 0 : o > T.page.maxh && (o = T.page.maxh + (o - T.page.maxh) / 2 | 0), e < 0 ? e = e / 2 | 0 : e > T.page.maxw && (e = T.page.maxw + (e - T.page.maxw) / 2 | 0)) : (o < 0 ? o = 0 : o > T.page.maxh && (o = T.page.maxh), e < 0 ? e = 0 : e > T.page.maxw && (e = T.page.maxw)), T.scrollrunning && e == T.newscrollx && o == T.newscrolly) return !1;
                        T.newscrolly = o, T.newscrollx = e;
                        var s = T.getScrollTop(),
                            n = T.getScrollLeft(),
                            l = {};
                        l.x = e - n, l.y = o - s;
                        var a = 0 | Math.sqrt(l.x * l.x + l.y * l.y),
                            c = T.prepareTransition(a);
                        T.scrollrunning || (T.scrollrunning = !0, T.triggerScrollStart(n, s, e, o, c), T.cursorupdate.start()), T.scrollendtrapped = !0, P.transitionend || (T.scrollendtrapped && clearTimeout(T.scrollendtrapped), T.scrollendtrapped = setTimeout(T.onScrollTransitionEnd, c)), T.setScrollTop(T.newscrolly), T.setScrollLeft(T.newscrollx)
                    }, this.cancelScroll = function() {
                        if (!T.scrollendtrapped) return !0;
                        var e = T.getScrollTop(),
                            o = T.getScrollLeft();
                        return T.scrollrunning = !1, P.transitionend || clearTimeout(P.transitionend), T.scrollendtrapped = !1, T.resetTransition(), T.setScrollTop(e), T.railh && T.setScrollLeft(o), T.timerscroll && T.timerscroll.tm && clearInterval(T.timerscroll.tm), T.timerscroll = !1, T.cursorfreezed = !1, T.cursorupdate.stop(), T.showCursor(e, o), T
                    }, this.onScrollTransitionEnd = function() {
                        if (T.scrollendtrapped) {
                            var e = T.getScrollTop(),
                                o = T.getScrollLeft();
                            if (e < 0 ? e = 0 : e > T.page.maxh && (e = T.page.maxh), o < 0 ? o = 0 : o > T.page.maxw && (o = T.page.maxw), e != T.newscrolly || o != T.newscrollx) return T.doScrollPos(o, e, M.snapbackspeed);
                            T.scrollrunning && T.triggerScrollEnd(), T.scrollrunning = !1, T.scrollendtrapped = !1, T.resetTransition(), T.timerscroll = !1, T.setScrollTop(e), T.railh && T.setScrollLeft(o), T.cursorupdate.stop(), T.noticeCursor(!1, e, o), T.cursorfreezed = !1
                        }
                    }
                } else this.doScrollLeft = function(e, o) {
                    var t = T.scrollrunning ? T.newscrolly : T.getScrollTop();
                    T.doScrollPos(e, t, o)
                }, this.doScrollTop = function(e, o) {
                    var t = T.scrollrunning ? T.newscrollx : T.getScrollLeft();
                    T.doScrollPos(t, e, o)
                }, this.doScrollPos = function(e, o, t) {
                    var r = T.getScrollTop(),
                        i = T.getScrollLeft();
                    ((T.newscrolly - r) * (o - r) < 0 || (T.newscrollx - i) * (e - i) < 0) && T.cancelScroll();
                    var s = !1;
                    if (T.bouncescroll && T.rail.visibility || (o < 0 ? (o = 0, s = !0) : o > T.page.maxh && (o = T.page.maxh, s = !0)), T.bouncescroll && T.railh.visibility || (e < 0 ? (e = 0, s = !0) : e > T.page.maxw && (e = T.page.maxw, s = !0)), T.scrollrunning && T.newscrolly === o && T.newscrollx === e) return !0;
                    T.newscrolly = o, T.newscrollx = e, T.dst = {}, T.dst.x = e - i, T.dst.y = o - r, T.dst.px = i, T.dst.py = r;
                    var n = 0 | Math.sqrt(T.dst.x * T.dst.x + T.dst.y * T.dst.y),
                        l = T.getTransitionSpeed(n);
                    T.bzscroll = {};
                    var a = s ? 1 : .58;
                    T.bzscroll.x = new R(i, T.newscrollx, l, 0, 0, a, 1), T.bzscroll.y = new R(r, T.newscrolly, l, 0, 0, a, 1);
                    f();
                    var c = function() {
                        if (T.scrollrunning) {
                            var e = T.bzscroll.y.getPos();
                            T.setScrollLeft(T.bzscroll.x.getNow()), T.setScrollTop(T.bzscroll.y.getNow()), e <= 1 ? T.timer = u(c) : (T.scrollrunning = !1, T.timer = 0, T.triggerScrollEnd())
                        }
                    };
                    T.scrollrunning || (T.triggerScrollStart(i, r, e, o, l), T.scrollrunning = !0, T.timer = u(c))
                }, this.cancelScroll = function() {
                    return T.timer && h(T.timer), T.timer = 0, T.bzscroll = !1, T.scrollrunning = !1, T
                };
            else this.doScrollLeft = function(e, o) {
                var t = T.getScrollTop();
                T.doScrollPos(e, t, o)
            }, this.doScrollTop = function(e, o) {
                var t = T.getScrollLeft();
                T.doScrollPos(t, e, o)
            }, this.doScrollPos = function(e, o, t) {
                var r = e > T.page.maxw ? T.page.maxw : e;
                r < 0 && (r = 0);
                var i = o > T.page.maxh ? T.page.maxh : o;
                i < 0 && (i = 0), T.synched("scroll", function() {
                    T.setScrollTop(i), T.setScrollLeft(r)
                })
            }, this.cancelScroll = function() {};
            this.doScrollBy = function(e, o) {
                z(0, e)
            }, this.doScrollLeftBy = function(e, o) {
                z(e, 0)
            }, this.doScrollTo = function(e, o) {
                var t = o ? Math.round(e * T.scrollratio.y) : e;
                t < 0 ? t = 0 : t > T.page.maxh && (t = T.page.maxh), T.cursorfreezed = !1, T.doScrollTop(e)
            }, this.checkContentSize = function() {
                var e = T.getContentSize();
                e.h == T.page.h && e.w == T.page.w || T.resize(!1, e)
            }, T.onscroll = function(e) {
                T.rail.drag || T.cursorfreezed || T.synched("scroll", function() {
                    T.scroll.y = Math.round(T.getScrollTop() / T.scrollratio.y), T.railh && (T.scroll.x = Math.round(T.getScrollLeft() / T.scrollratio.x)), T.noticeCursor()
                })
            }, T.bind(T.docscroll, "scroll", T.onscroll), this.doZoomIn = function(e) {
                if (!T.zoomactive) {
                    T.zoomactive = !0, T.zoomrestore = {
                        style: {}
                    };
                    var o = ["position", "top", "left", "zIndex", "backgroundColor", "marginTop", "marginBottom", "marginLeft", "marginRight"],
                        t = T.win[0].style;
                    for (var r in o) {
                        var i = o[r];
                        T.zoomrestore.style[i] = void 0 !== t[i] ? t[i] : ""
                    }
                    T.zoomrestore.style.width = T.win.css("width"), T.zoomrestore.style.height = T.win.css("height"), T.zoomrestore.padding = {
                        w: T.win.outerWidth() - T.win.width(),
                        h: T.win.outerHeight() - T.win.height()
                    }, P.isios4 && (T.zoomrestore.scrollTop = c.scrollTop(), c.scrollTop(0)), T.win.css({
                        position: P.isios4 ? "absolute" : "fixed",
                        top: 0,
                        left: 0,
                        zIndex: s + 100,
                        margin: 0
                    });
                    var n = T.win.css("backgroundColor");
                    return ("" === n || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(n)) && T.win.css("backgroundColor", "#fff"), T.rail.css({
                        zIndex: s + 101
                    }), T.zoom.css({
                        zIndex: s + 102
                    }), T.zoom.css("backgroundPosition", "0 -18px"), T.resizeZoom(), T.onzoomin && T.onzoomin.call(T), T.cancelEvent(e)
                }
            }, this.doZoomOut = function(e) {
                if (T.zoomactive) return T.zoomactive = !1, T.win.css("margin", ""), T.win.css(T.zoomrestore.style), P.isios4 && c.scrollTop(T.zoomrestore.scrollTop), T.rail.css({
                    "z-index": T.zindex
                }), T.zoom.css({
                    "z-index": T.zindex
                }), T.zoomrestore = !1, T.zoom.css("backgroundPosition", "0 0"), T.onResize(), T.onzoomout && T.onzoomout.call(T), T.cancelEvent(e)
            }, this.doZoom = function(e) {
                return T.zoomactive ? T.doZoomOut(e) : T.doZoomIn(e)
            }, this.resizeZoom = function() {
                if (T.zoomactive) {
                    var e = T.getScrollTop();
                    T.win.css({
                        width: c.width() - T.zoomrestore.padding.w + "px",
                        height: c.height() - T.zoomrestore.padding.h + "px"
                    }), T.onResize(), T.setScrollTop(Math.min(T.page.maxh, e))
                }
            }, this.init(), n.nicescroll.push(this)
        },
        y = function(e) {
            var o = this;
            this.nc = e, this.lastx = 0, this.lasty = 0, this.speedx = 0, this.speedy = 0, this.lasttime = 0, this.steptime = 0, this.snapx = !1, this.snapy = !1, this.demulx = 0, this.demuly = 0, this.lastscrollx = -1, this.lastscrolly = -1, this.chkx = 0, this.chky = 0, this.timer = 0, this.reset = function(e, t) {
                o.stop(), o.steptime = 0, o.lasttime = f(), o.speedx = 0, o.speedy = 0, o.lastx = e, o.lasty = t, o.lastscrollx = -1, o.lastscrolly = -1
            }, this.update = function(e, t) {
                var r = f();
                o.steptime = r - o.lasttime, o.lasttime = r;
                var i = t - o.lasty,
                    s = e - o.lastx,
                    n = o.nc.getScrollTop() + i,
                    l = o.nc.getScrollLeft() + s;
                o.snapx = l < 0 || l > o.nc.page.maxw, o.snapy = n < 0 || n > o.nc.page.maxh, o.speedx = s, o.speedy = i, o.lastx = e, o.lasty = t
            }, this.stop = function() {
                o.nc.unsynched("domomentum2d"), o.timer && clearTimeout(o.timer), o.timer = 0, o.lastscrollx = -1, o.lastscrolly = -1
            }, this.doSnapy = function(e, t) {
                var r = !1;
                t < 0 ? (t = 0, r = !0) : t > o.nc.page.maxh && (t = o.nc.page.maxh, r = !0), e < 0 ? (e = 0, r = !0) : e > o.nc.page.maxw && (e = o.nc.page.maxw, r = !0), r ? o.nc.doScrollPos(e, t, o.nc.opt.snapbackspeed) : o.nc.triggerScrollEnd()
            }, this.doMomentum = function(e) {
                var t = f(),
                    r = e ? t + e : o.lasttime,
                    i = o.nc.getScrollLeft(),
                    s = o.nc.getScrollTop(),
                    n = o.nc.page.maxh,
                    l = o.nc.page.maxw;
                o.speedx = l > 0 ? Math.min(60, o.speedx) : 0, o.speedy = n > 0 ? Math.min(60, o.speedy) : 0;
                var a = r && t - r <= 60;
                (s < 0 || s > n || i < 0 || i > l) && (a = !1);
                var c = !(!o.speedy || !a) && o.speedy,
                    d = !(!o.speedx || !a) && o.speedx;
                if (c || d) {
                    var u = Math.max(16, o.steptime);
                    if (u > 50) {
                        var h = u / 50;
                        o.speedx *= h, o.speedy *= h, u = 50
                    }
                    o.demulxy = 0, o.lastscrollx = o.nc.getScrollLeft(), o.chkx = o.lastscrollx, o.lastscrolly = o.nc.getScrollTop(), o.chky = o.lastscrolly;
                    var p = o.lastscrollx,
                        m = o.lastscrolly,
                        g = function() {
                            var e = f() - t > 600 ? .04 : .02;
                            o.speedx && (p = Math.floor(o.lastscrollx - o.speedx * (1 - o.demulxy)), o.lastscrollx = p, (p < 0 || p > l) && (e = .1)), o.speedy && (m = Math.floor(o.lastscrolly - o.speedy * (1 - o.demulxy)), o.lastscrolly = m, (m < 0 || m > n) && (e = .1)), o.demulxy = Math.min(1, o.demulxy + e), o.nc.synched("domomentum2d", function() {
                                if (o.speedx) {
                                    o.nc.getScrollLeft();
                                    o.chkx = p, o.nc.setScrollLeft(p)
                                }
                                if (o.speedy) {
                                    o.nc.getScrollTop();
                                    o.chky = m, o.nc.setScrollTop(m)
                                }
                                o.timer || (o.nc.hideCursor(), o.doSnapy(p, m))
                            }), o.demulxy < 1 ? o.timer = setTimeout(g, u) : (o.stop(), o.nc.hideCursor(), o.doSnapy(p, m))
                        };
                    g()
                } else o.doSnapy(o.nc.getScrollLeft(), o.nc.getScrollTop())
            }
        },
        x = e.fn.scrollTop;
    e.cssHooks.pageYOffset = {
        get: function(e, o, t) {
            var r = n.data(e, "__nicescroll") || !1;
            return r && r.ishwscroll ? r.getScrollTop() : x.call(e)
        },
        set: function(e, o) {
            var t = n.data(e, "__nicescroll") || !1;
            return t && t.ishwscroll ? t.setScrollTop(parseInt(o)) : x.call(e, o), this
        }
    }, e.fn.scrollTop = function(e) {
        if (void 0 === e) {
            var o = !!this[0] && (n.data(this[0], "__nicescroll") || !1);
            return o && o.ishwscroll ? o.getScrollTop() : x.call(this)
        }
        return this.each(function() {
            var o = n.data(this, "__nicescroll") || !1;
            o && o.ishwscroll ? o.setScrollTop(parseInt(e)) : x.call(n(this), e)
        })
    };
    var S = e.fn.scrollLeft;
    n.cssHooks.pageXOffset = {
        get: function(e, o, t) {
            var r = n.data(e, "__nicescroll") || !1;
            return r && r.ishwscroll ? r.getScrollLeft() : S.call(e)
        },
        set: function(e, o) {
            var t = n.data(e, "__nicescroll") || !1;
            return t && t.ishwscroll ? t.setScrollLeft(parseInt(o)) : S.call(e, o), this
        }
    }, e.fn.scrollLeft = function(e) {
        if (void 0 === e) {
            var o = !!this[0] && (n.data(this[0], "__nicescroll") || !1);
            return o && o.ishwscroll ? o.getScrollLeft() : S.call(this)
        }
        return this.each(function() {
            var o = n.data(this, "__nicescroll") || !1;
            o && o.ishwscroll ? o.setScrollLeft(parseInt(e)) : S.call(n(this), e)
        })
    };
    var z = function(e) {
        var o = this;
        if (this.length = 0, this.name = "nicescrollarray", this.each = function(e) {
                return n.each(o, e), o
            }, this.push = function(e) {
                o[o.length] = e, o.length++
            }, this.eq = function(e) {
                return o[e]
            }, e)
            for (var t = 0; t < e.length; t++) {
                var r = n.data(e[t], "__nicescroll") || !1;
                r && (this[this.length] = r, this.length++)
            }
        return this
    };
    ! function(e, o, t) {
        for (var r = 0, i = o.length; r < i; r++) t(e, o[r])
    }(z.prototype, ["show", "hide", "toggle", "onResize", "resize", "remove", "stop", "doScrollPos"], function(e, o) {
        e[o] = function() {
            var e = arguments;
            return this.each(function() {
                this[o].apply(this, e)
            })
        }
    }), e.fn.getNiceScroll = function(e) {
        return void 0 === e ? new z(this) : this[e] && n.data(this[e], "__nicescroll") || !1
    }, (e.expr.pseudos || e.expr[":"]).nicescroll = function(e) {
        return void 0 !== n.data(e, "__nicescroll")
    }, n.fn.niceScroll = function(e, o) {
        void 0 !== o || "object" != typeof e || "jquery" in e || (o = e, e = !1);
        var t = new z;
        return this.each(function() {
            var r = n(this),
                i = n.extend({}, o);
            if (e) {
                var s = n(e);
                i.doc = s.length > 1 ? n(e, r) : s, i.win = r
            }!("doc" in i) || "win" in i || (i.win = r);
            var l = r.data("__nicescroll") || !1;
            l || (i.doc = i.doc || r, l = new b(i, r), r.data("__nicescroll", l)), t.push(l)
        }), 1 === t.length ? t[0] : t
    }, a.NiceScroll = {
        getjQuery: function() {
            return e
        }
    }, n.nicescroll || (n.nicescroll = new z, n.nicescroll.options = g)
});