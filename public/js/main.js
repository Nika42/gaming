!function() {
    "use strict";
    function i(e) {
        return "object" == typeof window.Node ? e instanceof window.Node : null !== e && "object" == typeof e && "number" == typeof e.nodeType && "string" == typeof e.nodeName;
    }
    function d(e, t) {
        if (void 0 === t && (t = document), e instanceof Array) return e.filter(i);
        if (i(e)) return [ e ];
        if (function(e) {
            var t = Object.prototype.toString.call(e);
            return "object" == typeof window.NodeList ? e instanceof window.NodeList : null !== e && "object" == typeof e && "number" == typeof e.length && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(t) && (0 === e.length || i(e[0]));
        }(e)) return Array.prototype.slice.call(e);
        if ("string" == typeof e) try {
            var n = t.querySelectorAll(e);
            return Array.prototype.slice.call(n);
        } catch (e) {
            return [];
        }
        return [];
    }
    function E(e) {
        if (e.constructor !== Array) throw new TypeError("Expected array.");
        if (16 === e.length) return e;
        if (6 !== e.length) throw new RangeError("Expected array with either 6 or 16 values.");
        var t = T();
        return t[0] = e[0], t[1] = e[1], t[4] = e[2], t[5] = e[3], t[12] = e[4], t[13] = e[5], 
        t;
    }
    function T() {
        for (var e = [], t = 0; t < 16; t++) t % 5 == 0 ? e.push(1) : e.push(0);
        return e;
    }
    function j(e, t) {
        for (var n = E(e), i = E(t), r = [], o = 0; o < 4; o++) for (var s = [ n[o], n[o + 4], n[o + 8], n[o + 12] ], a = 0; a < 4; a++) {
            var c = 4 * a, l = [ i[c], i[1 + c], i[2 + c], i[3 + c] ], u = s[0] * l[0] + s[1] * l[1] + s[2] * l[2] + s[3] * l[3];
            r[o + c] = u;
        }
        return r;
    }
    function x(e, t) {
        var n = T();
        return n[0] = e, n[5] = "number" == typeof t ? t : e, n;
    }
    var n, r = (n = Date.now(), function(e) {
        var t = Date.now();
        16 < t - n ? e(n = t) : setTimeout(function() {
            return r(e);
        }, 0);
    }), o = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || r, s = {
        delay: 0,
        distance: "0",
        duration: 600,
        easing: "cubic-bezier(0.5, 0, 0, 1)",
        interval: 0,
        opacity: 0,
        origin: "bottom",
        rotate: {
            x: 0,
            y: 0,
            z: 0
        },
        scale: 1,
        cleanup: !1,
        container: document.documentElement,
        desktop: !0,
        mobile: !0,
        reset: !1,
        useDelay: "always",
        viewFactor: 0,
        viewOffset: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        afterReset: function() {},
        afterReveal: function() {},
        beforeReset: function() {},
        beforeReveal: function() {}
    };
    var a = {
        success: function() {
            document.documentElement.classList.add("sr"), document.body ? document.body.style.height = "100%" : document.addEventListener("DOMContentLoaded", function() {
                document.body.style.height = "100%";
            });
        },
        failure: function() {
            return document.documentElement.classList.remove("sr"), {
                clean: function() {},
                destroy: function() {},
                reveal: function() {},
                sync: function() {},
                get noop() {
                    return !0;
                }
            };
        }
    };
    function c(e) {
        return null !== e && e instanceof Object && (e.constructor === Object || "[object Object]" === Object.prototype.toString.call(e));
    }
    function f(n, i) {
        if (c(n)) return Object.keys(n).forEach(function(e) {
            return i(n[e], e, n);
        });
        if (n instanceof Array) return n.forEach(function(e, t) {
            return i(e, t, n);
        });
        throw new TypeError("Expected either an array or object literal.");
    }
    function h(e) {
        for (var t = [], n = arguments.length - 1; 0 < n--; ) t[n] = arguments[n + 1];
        if (this.constructor.debug && console) {
            var i = "%cScrollReveal: " + e;
            t.forEach(function(e) {
                return i += "\n — " + e;
            }), console.log(i, "color: #ea654b;");
        }
    }
    function t() {
        var n = this, i = {
            active: [],
            stale: []
        }, t = {
            active: [],
            stale: []
        }, r = {
            active: [],
            stale: []
        };
        try {
            f(d("[data-sr-id]"), function(e) {
                var t = parseInt(e.getAttribute("data-sr-id"));
                i.active.push(t);
            });
        } catch (e) {
            throw e;
        }
        f(this.store.elements, function(e) {
            -1 === i.active.indexOf(e.id) && i.stale.push(e.id);
        }), f(i.stale, function(e) {
            return delete n.store.elements[e];
        }), f(this.store.elements, function(e) {
            -1 === r.active.indexOf(e.containerId) && r.active.push(e.containerId), e.hasOwnProperty("sequence") && -1 === t.active.indexOf(e.sequence.id) && t.active.push(e.sequence.id);
        }), f(this.store.containers, function(e) {
            -1 === r.active.indexOf(e.id) && r.stale.push(e.id);
        }), f(r.stale, function(e) {
            var t = n.store.containers[e].node;
            t.removeEventListener("scroll", n.delegate), t.removeEventListener("resize", n.delegate), 
            delete n.store.containers[e];
        }), f(this.store.sequences, function(e) {
            -1 === t.active.indexOf(e.id) && t.stale.push(e.id);
        }), f(t.stale, function(e) {
            return delete n.store.sequences[e];
        });
    }
    function p(e) {
        var i, r = this;
        try {
            f(d(e), function(e) {
                var t = e.getAttribute("data-sr-id");
                if (null !== t) {
                    i = !0;
                    var n = r.store.elements[t];
                    n.callbackTimer && window.clearTimeout(n.callbackTimer.clock), e.setAttribute("style", n.styles.inline.generated), 
                    e.removeAttribute("data-sr-id"), delete r.store.elements[t];
                }
            });
        } catch (e) {
            return h.call(this, "Clean failed.", e.message);
        }
        if (i) try {
            t.call(this);
        } catch (e) {
            return h.call(this, "Clean failed.", e.message);
        }
    }
    var l, u, k = (l = {}, u = document.documentElement.style, e.clearCache = function() {
        return l = {};
    }, e);
    function e(e, t) {
        if (void 0 === t && (t = u), e && "string" == typeof e) {
            if (l[e]) return l[e];
            if ("string" == typeof t[e]) return l[e] = e;
            if ("string" == typeof t["-webkit-" + e]) return l[e] = "-webkit-" + e;
            throw new RangeError('Unable to find "' + e + '" style property.');
        }
        throw new TypeError("Expected a string.");
    }
    function m(e) {
        var t = window.getComputedStyle(e.node), n = t.position, i = e.config, r = {}, o = (e.node.getAttribute("style") || "").match(/[\w-]+\s*:\s*[^;]+\s*/gi) || [];
        r.computed = o ? o.map(function(e) {
            return e.trim();
        }).join("; ") + ";" : "", r.generated = o.some(function(e) {
            return e.match(/visibility\s?:\s?visible/i);
        }) ? r.computed : o.concat([ "visibility: visible" ]).map(function(e) {
            return e.trim();
        }).join("; ") + ";";
        var s = parseFloat(t.opacity), a = isNaN(parseFloat(i.opacity)) ? parseFloat(t.opacity) : parseFloat(i.opacity), c = {
            computed: s !== a ? "opacity: " + s + ";" : "",
            generated: s !== a ? "opacity: " + a + ";" : ""
        }, l = [];
        if (parseFloat(i.distance)) {
            var u = "top" === i.origin || "bottom" === i.origin ? "Y" : "X", d = i.distance;
            "top" !== i.origin && "left" !== i.origin || (d = /^-/.test(d) ? d.substr(1) : "-" + d);
            var f = d.match(/(^-?\d+\.?\d?)|(em$|px$|%$)/g), h = f[0];
            switch (f[1]) {
              case "em":
                d = parseInt(t.fontSize) * h;
                break;

              case "px":
                d = h;
                break;

              case "%":
                d = "Y" == u ? e.node.getBoundingClientRect().height * h / 100 : e.node.getBoundingClientRect().width * h / 100;
                break;

              default:
                throw new RangeError("Unrecognized or missing distance unit.");
            }
            "Y" == u ? l.push(function(e) {
                var t = T();
                return t[13] = e, t;
            }(d)) : l.push(function(e) {
                var t = T();
                return t[12] = e, t;
            }(d));
        }
        i.rotate.x && l.push(function(e) {
            var t = Math.PI / 180 * e, n = T();
            return n[5] = n[10] = Math.cos(t), n[6] = n[9] = Math.sin(t), n[9] *= -1, n;
        }(i.rotate.x)), i.rotate.y && l.push(function(e) {
            var t = Math.PI / 180 * e, n = T();
            return n[0] = n[10] = Math.cos(t), n[2] = n[8] = Math.sin(t), n[2] *= -1, n;
        }(i.rotate.y)), i.rotate.z && l.push(function(e) {
            var t = Math.PI / 180 * e, n = T();
            return n[0] = n[5] = Math.cos(t), n[1] = n[4] = Math.sin(t), n[4] *= -1, n;
        }(i.rotate.z)), 1 !== i.scale && (0 === i.scale ? l.push(x(2e-4)) : l.push(x(i.scale)));
        var p = {};
        if (l.length) {
            p.property = k("transform"), p.computed = {
                raw: t[p.property],
                matrix: function(e) {
                    if ("string" == typeof e) {
                        var t = e.match(/matrix(3d)?\(([^)]+)\)/);
                        if (t) return E(t[2].split(", ").map(parseFloat));
                    }
                    return T();
                }(t[p.property])
            }, l.unshift(p.computed.matrix);
            var m = l.reduce(j);
            p.generated = {
                initial: p.property + ": matrix3d(" + m.join(", ") + ");",
                final: p.property + ": matrix3d(" + p.computed.matrix.join(", ") + ");"
            };
        } else p.generated = {
            initial: "",
            final: ""
        };
        var v = {};
        if (c.generated || p.generated.initial) {
            v.property = k("transition"), v.computed = t[v.property], v.fragments = [];
            var y = i.delay, g = i.duration, b = i.easing;
            c.generated && v.fragments.push({
                delayed: "opacity " + g / 1e3 + "s " + b + " " + y / 1e3 + "s",
                instant: "opacity " + g / 1e3 + "s " + b + " 0s"
            }), p.generated.initial && v.fragments.push({
                delayed: p.property + " " + g / 1e3 + "s " + b + " " + y / 1e3 + "s",
                instant: p.property + " " + g / 1e3 + "s " + b + " 0s"
            }), v.computed && !v.computed.match(/all 0s/) && v.fragments.unshift({
                delayed: v.computed,
                instant: v.computed
            });
            var w = v.fragments.reduce(function(e, t, n) {
                return e.delayed += 0 === n ? t.delayed : ", " + t.delayed, e.instant += 0 === n ? t.instant : ", " + t.instant, 
                e;
            }, {
                delayed: "",
                instant: ""
            });
            v.generated = {
                delayed: v.property + ": " + w.delayed + ";",
                instant: v.property + ": " + w.instant + ";"
            };
        } else v.generated = {
            delayed: "",
            instant: ""
        };
        return {
            inline: r,
            opacity: c,
            position: n,
            transform: p,
            transition: v
        };
    }
    function v(e, t) {
        void 0 === t && (t = {});
        var n = t.pristine || this.pristine, i = "always" === e.config.useDelay || "onload" === e.config.useDelay && n || "once" === e.config.useDelay && !e.seen, r = e.visible && !e.revealed, o = !e.visible && e.revealed && e.config.reset;
        return t.reveal || r ? function(e, t) {
            var n = [ e.styles.inline.generated, e.styles.opacity.computed, e.styles.transform.generated.final ];
            t ? n.push(e.styles.transition.generated.delayed) : n.push(e.styles.transition.generated.instant);
            e.revealed = e.seen = !0, e.node.setAttribute("style", n.filter(function(e) {
                return "" !== e;
            }).join(" ")), y.call(this, e, t);
        }.call(this, e, i) : t.reset || o ? function(e) {
            var t = [ e.styles.inline.generated, e.styles.opacity.generated, e.styles.transform.generated.initial, e.styles.transition.generated.instant ];
            e.revealed = !1, e.node.setAttribute("style", t.filter(function(e) {
                return "" !== e;
            }).join(" ")), y.call(this, e);
        }.call(this, e) : void 0;
    }
    function y(e, t) {
        var n = this, i = t ? e.config.duration + e.config.delay : e.config.duration, r = e.revealed ? e.config.beforeReveal : e.config.beforeReset, o = e.revealed ? e.config.afterReveal : e.config.afterReset, s = 0;
        e.callbackTimer && (s = Date.now() - e.callbackTimer.start, window.clearTimeout(e.callbackTimer.clock)), 
        r(e.node), e.callbackTimer = {
            start: Date.now(),
            clock: window.setTimeout(function() {
                o(e.node), e.callbackTimer = null, e.revealed && !e.config.reset && e.config.cleanup && p.call(n, e.node);
            }, i - s)
        };
    }
    var g, b = (g = 0, function() {
        return g++;
    });
    function w(e, t) {
        if (void 0 === t && (t = this.pristine), !e.visible && e.revealed && e.config.reset) return v.call(this, e, {
            reset: !0
        });
        var n = this.store.sequences[e.sequence.id], i = e.sequence.index;
        if (n) {
            var r = new A(n, "visible", this.store), o = new A(n, "revealed", this.store);
            if (n.models = {
                visible: r,
                revealed: o
            }, !o.body.length) {
                var s = n.members[r.body[0]], a = this.store.elements[s];
                if (a) return L.call(this, n, r.body[0], -1, t), L.call(this, n, r.body[0], 1, t), 
                v.call(this, a, {
                    reveal: !0,
                    pristine: t
                });
            }
            if (!n.blocked.head && i === [].concat(o.head).pop() && i >= [].concat(r.body).shift()) return L.call(this, n, i, -1, t), 
            v.call(this, e, {
                reveal: !0,
                pristine: t
            });
            if (!n.blocked.foot && i === [].concat(o.foot).shift() && i <= [].concat(r.body).pop()) return L.call(this, n, i, 1, t), 
            v.call(this, e, {
                reveal: !0,
                pristine: t
            });
        }
    }
    function O(e) {
        var t = Math.abs(e);
        if (isNaN(t)) throw new RangeError("Invalid sequence interval.");
        this.id = b(), this.interval = Math.max(t, 16), this.members = [], this.models = {}, 
        this.blocked = {
            head: !1,
            foot: !1
        };
    }
    function A(e, i, r) {
        var o = this;
        this.head = [], this.body = [], this.foot = [], f(e.members, function(e, t) {
            var n = r.elements[e];
            n && n[i] && o.body.push(t);
        }), this.body.length && f(e.members, function(e, t) {
            var n = r.elements[e];
            n && !n[i] && (t < o.body[0] ? o.head.push(t) : o.foot.push(t));
        });
    }
    function L(e, t, n, i) {
        var r = this, o = [ "head", null, "foot" ][1 + n], s = e.members[t + n], a = this.store.elements[s];
        e.blocked[o] = !0, setTimeout(function() {
            e.blocked[o] = !1, a && w.call(r, a, i);
        }, e.interval);
    }
    function q() {
        var n = this;
        t.call(this), f(this.store.elements, function(e) {
            var t = [ e.styles.inline.generated ];
            e.visible ? (t.push(e.styles.opacity.computed), t.push(e.styles.transform.generated.final), 
            e.revealed = !0) : (t.push(e.styles.opacity.generated), t.push(e.styles.transform.generated.initial), 
            e.revealed = !1), e.node.setAttribute("style", t.filter(function(e) {
                return "" !== e;
            }).join(" "));
        }), f(this.store.containers, function(e) {
            var t = e.node === document.documentElement ? window : e.node;
            t.addEventListener("scroll", n.delegate), t.addEventListener("resize", n.delegate);
        }), this.delegate(), this.initTimeout = null;
    }
    function P(e) {
        return void 0 === e && (e = navigator.userAgent), /Android|iPhone|iPad|iPod/i.test(e);
    }
    function R(n) {
        for (var e = [], t = arguments.length - 1; 0 < t--; ) e[t] = arguments[t + 1];
        if (c(n)) return f(e, function(e) {
            f(e, function(e, t) {
                c(e) ? (n[t] && c(n[t]) || (n[t] = {}), R(n[t], e)) : n[t] = e;
            });
        }), n;
        throw new TypeError("Target must be an object literal.");
    }
    function M(e, a, t) {
        var c = this;
        void 0 === a && (a = {}), void 0 === t && (t = !1);
        var l, u = [], n = a.interval || s.interval;
        try {
            n && (l = new O(n));
            var i = d(e);
            if (!i.length) throw new Error("Invalid reveal target.");
            f(i.reduce(function(e, t) {
                var n = {}, i = t.getAttribute("data-sr-id");
                i ? (R(n, c.store.elements[i]), n.node.setAttribute("style", n.styles.inline.computed)) : (n.id = b(), 
                n.node = t, n.seen = !1, n.revealed = !1, n.visible = !1);
                var r = R({}, n.config || c.defaults, a);
                if (!r.mobile && P() || !r.desktop && !P()) return i && p.call(c, n), e;
                var o, s = d(r.container)[0];
                if (!s) throw new Error("Invalid container.");
                return s.contains(t) && (null === (o = function(t) {
                    var e = [], n = arguments.length - 1;
                    for (;0 < n--; ) e[n] = arguments[n + 1];
                    var i = null;
                    return f(e, function(e) {
                        f(e, function(e) {
                            null === i && e.node === t && (i = e.id);
                        });
                    }), i;
                }(s, u, c.store.containers)) && (o = b(), u.push({
                    id: o,
                    node: s
                })), n.config = r, n.containerId = o, n.styles = m(n), l && (n.sequence = {
                    id: l.id,
                    index: l.members.length
                }, l.members.push(n.id)), e.push(n)), e;
            }, []), function(e) {
                (c.store.elements[e.id] = e).node.setAttribute("data-sr-id", e.id);
            });
        } catch (e) {
            return h.call(this, "Reveal failed.", e.message);
        }
        f(u, function(e) {
            c.store.containers[e.id] = {
                id: e.id,
                node: e.node
            };
        }), l && (this.store.sequences[l.id] = l), !0 !== t && (this.store.history.push({
            target: e,
            options: a
        }), this.initTimeout && window.clearTimeout(this.initTimeout), this.initTimeout = window.setTimeout(q.bind(this), 0));
    }
    var I = Math.sign || function(e) {
        return (0 < e) - (e < 0) || +e;
    };
    function N(e, t) {
        for (var n = t ? e.node.clientHeight : e.node.offsetHeight, i = t ? e.node.clientWidth : e.node.offsetWidth, r = 0, o = 0, s = e.node; isNaN(s.offsetTop) || (r += s.offsetTop), 
        isNaN(s.offsetLeft) || (o += s.offsetLeft), s = s.offsetParent; ) ;
        return {
            bounds: {
                top: r,
                right: o + i,
                bottom: r + n,
                left: o
            },
            height: n,
            width: i
        };
    }
    function z(e, t) {
        var i = this;
        void 0 === e && (e = {
            type: "init"
        }), void 0 === t && (t = this.store.elements), o(function() {
            var n = "init" === e.type || "resize" === e.type;
            f(i.store.containers, function(e) {
                n && (e.geometry = N.call(i, e, !0));
                var t = function(e) {
                    var t, n;
                    return n = e.node === document.documentElement ? (t = window.pageYOffset, window.pageXOffset) : (t = e.node.scrollTop, 
                    e.node.scrollLeft), {
                        top: t,
                        left: n
                    };
                }.call(i, e);
                e.scroll && (e.direction = {
                    x: I(t.left - e.scroll.left),
                    y: I(t.top - e.scroll.top)
                }), e.scroll = t;
            }), f(t, function(e) {
                n && (e.geometry = N.call(i, e)), e.visible = function(e) {
                    void 0 === e && (e = {});
                    var t = this.store.containers[e.containerId];
                    if (t) {
                        var n = Math.max(0, Math.min(1, e.config.viewFactor)), i = e.config.viewOffset, r = e.geometry.bounds.top + e.geometry.height * n, o = e.geometry.bounds.right - e.geometry.width * n, s = e.geometry.bounds.bottom - e.geometry.height * n, a = e.geometry.bounds.left + e.geometry.width * n, c = t.geometry.bounds.top + t.scroll.top + i.top, l = t.geometry.bounds.right + t.scroll.left - i.right, u = t.geometry.bounds.bottom + t.scroll.top - i.bottom, d = t.geometry.bounds.left + t.scroll.left + i.left;
                        return r < u && d < o && c < s && a < l || "fixed" === e.styles.position;
                    }
                }.call(i, e);
            }), f(t, function(e) {
                e.sequence ? w.call(i, e) : v.call(i, e);
            }), i.pristine = !1;
        });
    }
    var F, C, D, S, W, Y, H, B, U = "4.0.5";
    function X(e) {
        var t;
        if (void 0 === e && (e = {}), void 0 === this || Object.getPrototypeOf(this) !== X.prototype) return new X(e);
        if (!X.isSupported()) return h.call(this, "Instantiation failed.", "This browser is not supported."), 
        a.failure();
        try {
            t = R({}, Y || s, e);
        } catch (e) {
            return h.call(this, "Invalid configuration.", e.message), a.failure();
        }
        try {
            if (!d(t.container)[0]) throw new Error("Invalid container.");
        } catch (e) {
            return h.call(this, e.message), a.failure();
        }
        return !(Y = t).mobile && P() || !Y.desktop && !P() ? (h.call(this, "This device is disabled.", "desktop: " + Y.desktop, "mobile: " + Y.mobile), 
        a.failure()) : (a.success(), this.store = {
            containers: {},
            elements: {},
            history: [],
            sequences: {}
        }, this.pristine = !0, F = F || z.bind(this), C = C || function() {
            var n = this;
            f(this.store.elements, function(e) {
                e.node.setAttribute("style", e.styles.inline.generated), e.node.removeAttribute("data-sr-id");
            }), f(this.store.containers, function(e) {
                var t = e.node === document.documentElement ? window : e.node;
                t.removeEventListener("scroll", n.delegate), t.removeEventListener("resize", n.delegate);
            }), this.store = {
                containers: {},
                elements: {},
                history: [],
                sequences: {}
            };
        }.bind(this), D = D || M.bind(this), S = S || p.bind(this), W = W || function() {
            var t = this;
            f(this.store.history, function(e) {
                M.call(t, e.target, e.options, !0);
            }), q.call(this);
        }.bind(this), Object.defineProperty(this, "delegate", {
            get: function() {
                return F;
            }
        }), Object.defineProperty(this, "destroy", {
            get: function() {
                return C;
            }
        }), Object.defineProperty(this, "reveal", {
            get: function() {
                return D;
            }
        }), Object.defineProperty(this, "clean", {
            get: function() {
                return S;
            }
        }), Object.defineProperty(this, "sync", {
            get: function() {
                return W;
            }
        }), Object.defineProperty(this, "defaults", {
            get: function() {
                return Y;
            }
        }), Object.defineProperty(this, "version", {
            get: function() {
                return U;
            }
        }), Object.defineProperty(this, "noop", {
            get: function() {
                return !1;
            }
        }), B || (B = this));
    }
    X.isSupported = function() {
        return function() {
            var e = document.documentElement.style;
            return "transform" in e || "WebkitTransform" in e;
        }() && function() {
            var e = document.documentElement.style;
            return "transition" in e || "WebkitTransition" in e;
        }();
    }, Object.defineProperty(X, "debug", {
        get: function() {
            return H || !1;
        },
        set: function(e) {
            return H = "boolean" == typeof e ? e : H;
        }
    }), X(), $(function() {
        var e = X({
            duration: 1e3
        });
        e.reveal("nav"), e.reveal(".slider-title"), e.reveal(".popular-games .switcher-container"), 
        e.reveal(".card"), e.reveal(".news"), e.reveal(".ad"), e.reveal(".owl-carousel"), 
        e.reveal(".section-3 .col-3"), e.reveal(".section-4 .container"), $(".card-t2 .card-title").each(function(e, t) {
            !function(e) {
                38 < $(e).text().length && $(e).text($(e).text().slice(0, -Number($(e).text().length - 38)) + "...");
            }(t);
        }), $(".owl-carousel").owlCarousel({
            items: 1,
            loop: !1,
            margin: 0,
            dots: !0,
            lazyLoad: !0
        });
    }), $(window).on("load", function() {
        setTimeout(function() {
            $(".onLoading").remove(), $("html, body").css({
                overflow: "auto",
                height: "auto"
            });
        }, 2500);
    });
}();
//# sourceMappingURL=main.js.map
