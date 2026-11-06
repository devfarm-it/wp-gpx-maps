// node_modules/@turf/helpers/dist/es/index.js
var e = 6371008.8, t = {
	centimeters: e * 100,
	centimetres: e * 100,
	degrees: e / 111325,
	feet: e * 3.28084,
	inches: e * 39.37,
	kilometers: e / 1e3,
	kilometres: e / 1e3,
	meters: e,
	metres: e,
	miles: e / 1609.344,
	millimeters: e * 1e3,
	millimetres: e * 1e3,
	nauticalmiles: e / 1852,
	radians: 1,
	yards: e * 1.0936
};
1 / e;
function n(e, t, n) {
	n === void 0 && (n = {});
	var r = { type: "Feature" };
	return (n.id === 0 || n.id) && (r.id = n.id), n.bbox && (r.bbox = n.bbox), r.properties = t || {}, r.geometry = e, r;
}
function r(e, t, r) {
	if (r === void 0 && (r = {}), !e) throw Error("coordinates is required");
	if (!Array.isArray(e)) throw Error("coordinates must be an Array");
	if (e.length < 2) throw Error("coordinates must be at least 2 numbers long");
	if (!l(e[0]) || !l(e[1])) throw Error("coordinates must contain numbers");
	return n({
		type: "Point",
		coordinates: e
	}, t, r);
}
function i(e, t, r) {
	if (r === void 0 && (r = {}), e.length < 2) throw Error("coordinates must be an array of two or more positions");
	return n({
		type: "LineString",
		coordinates: e
	}, t, r);
}
function a(e, n) {
	n === void 0 && (n = "kilometers");
	var r = t[n];
	if (!r) throw Error(n + " units is invalid");
	return e * r;
}
function o(e, n) {
	n === void 0 && (n = "kilometers");
	var r = t[n];
	if (!r) throw Error(n + " units is invalid");
	return e / r;
}
function s(e) {
	return e % (2 * Math.PI) * 180 / Math.PI;
}
function c(e) {
	return e % 360 * Math.PI / 180;
}
function l(e) {
	return !isNaN(e) && e !== null && !Array.isArray(e);
}
// node_modules/@turf/meta/dist/es/index.js
function u(e, t, n) {
	if (e !== null) for (var r, i, a, o, s, c, l, d = 0, f = 0, p, m = e.type, h = m === "FeatureCollection", g = m === "Feature", _ = h ? e.features.length : 1, v = 0; v < _; v++) {
		l = h ? e.features[v].geometry : g ? e.geometry : e, p = l ? l.type === "GeometryCollection" : !1, s = p ? l.geometries.length : 1;
		for (var y = 0; y < s; y++) {
			var b = 0, x = 0;
			if (o = p ? l.geometries[y] : l, o !== null) {
				c = o.coordinates;
				var S = o.type;
				switch (d = n && (S === "Polygon" || S === "MultiPolygon") ? 1 : 0, S) {
					case null: break;
					case "Point":
						if (t(c, f, v, b, x) === !1) return !1;
						f++, b++;
						break;
					case "LineString":
					case "MultiPoint":
						for (r = 0; r < c.length; r++) {
							if (t(c[r], f, v, b, x) === !1) return !1;
							f++, S === "MultiPoint" && b++;
						}
						S === "LineString" && b++;
						break;
					case "Polygon":
					case "MultiLineString":
						for (r = 0; r < c.length; r++) {
							for (i = 0; i < c[r].length - d; i++) {
								if (t(c[r][i], f, v, b, x) === !1) return !1;
								f++;
							}
							S === "MultiLineString" && b++, S === "Polygon" && x++;
						}
						S === "Polygon" && b++;
						break;
					case "MultiPolygon":
						for (r = 0; r < c.length; r++) {
							for (x = 0, i = 0; i < c[r].length; i++) {
								for (a = 0; a < c[r][i].length - d; a++) {
									if (t(c[r][i][a], f, v, b, x) === !1) return !1;
									f++;
								}
								x++;
							}
							b++;
						}
						break;
					case "GeometryCollection":
						for (r = 0; r < o.geometries.length; r++) if (u(o.geometries[r], t, n) === !1) return !1;
						break;
					default: throw Error("Unknown Geometry Type");
				}
			}
		}
	}
}
function d(e, t) {
	var n, r, i, a, o, s, c, l, u, d, f = 0, p = e.type === "FeatureCollection", m = e.type === "Feature", h = p ? e.features.length : 1;
	for (n = 0; n < h; n++) {
		for (s = p ? e.features[n].geometry : m ? e.geometry : e, l = p ? e.features[n].properties : m ? e.properties : {}, u = p ? e.features[n].bbox : m ? e.bbox : void 0, d = p ? e.features[n].id : m ? e.id : void 0, c = s ? s.type === "GeometryCollection" : !1, o = c ? s.geometries.length : 1, i = 0; i < o; i++) if (a = c ? s.geometries[i] : s, a === null) {
			if (t(null, f, l, u, d) === !1) return !1;
		} else switch (a.type) {
			case "Point":
			case "LineString":
			case "MultiPoint":
			case "Polygon":
			case "MultiLineString":
			case "MultiPolygon":
				if (t(a, f, l, u, d) === !1) return !1;
				break;
			case "GeometryCollection":
				for (r = 0; r < a.geometries.length; r++) if (t(a.geometries[r], f, l, u, d) === !1) return !1;
				break;
			default: throw Error("Unknown Geometry Type");
		}
		f++;
	}
}
function f(e, t) {
	d(e, function(e, r, i, a, o) {
		var s = e === null ? null : e.type;
		switch (s) {
			case null:
			case "Point":
			case "LineString":
			case "Polygon": return t(n(e, i, {
				bbox: a,
				id: o
			}), r, 0) !== !1 && void 0;
		}
		var c;
		switch (s) {
			case "MultiPoint":
				c = "Point";
				break;
			case "MultiLineString":
				c = "LineString";
				break;
			case "MultiPolygon": c = "Polygon";
		}
		for (var l = 0; l < e.coordinates.length; l++) {
			var u = e.coordinates[l];
			if (t(n({
				type: c,
				coordinates: u
			}, i), r, l) === !1) return !1;
		}
	});
}
function p(e, t) {
	f(e, function(e, n, r) {
		var a = 0;
		if (e.geometry) {
			var o = e.geometry.type;
			if (o !== "Point" && o !== "MultiPoint") {
				var s, c = 0, l = 0, d = 0;
				if (u(e, function(o, u, f, p, m) {
					if (s === void 0 || n > c || p > l || m > d) s = o, c = n, l = p, d = m, a = 0;
					else {
						if (t(i([s, o], e.properties), n, r, m, a) === !1) return !1;
						a++, s = o;
					}
				}) === !1) return !1;
			}
		}
	});
}
function m(e, t, n) {
	var r = n, i = !1;
	return p(e, function(e, a, o, s, c) {
		r = i === !1 && n === void 0 ? e : t(r, e, a, o, s, c), i = !0;
	}), r;
}
// node_modules/@turf/invariant/dist/es/index.js
function h(e) {
	if (!e) throw Error("coord is required");
	if (!Array.isArray(e)) {
		if (e.type === "Feature" && e.geometry !== null && e.geometry.type === "Point") return e.geometry.coordinates;
		if (e.type === "Point") return e.coordinates;
	}
	if (Array.isArray(e) && e.length >= 2 && !Array.isArray(e[0]) && !Array.isArray(e[1])) return e;
	throw Error("coord must be GeoJSON Point or an Array of numbers");
}
function g(e) {
	return e.type === "Feature" ? e.geometry : e;
}
// node_modules/@turf/distance/dist/es/index.js
function _(e, t, n) {
	n === void 0 && (n = {});
	var r = h(e), i = h(t), o = c(i[1] - r[1]), s = c(i[0] - r[0]), l = c(r[1]), u = c(i[1]), d = Math.sin(o / 2) ** 2 + Math.sin(s / 2) ** 2 * Math.cos(l) * Math.cos(u);
	return a(2 * Math.atan2(Math.sqrt(d), Math.sqrt(1 - d)), n.units);
}
// node_modules/@turf/destination/dist/es/index.js
function v(e, t, n, i) {
	i === void 0 && (i = {});
	var a = h(e), l = c(a[0]), u = c(a[1]), d = c(n), f = o(t, i.units), p = Math.asin(Math.sin(u) * Math.cos(f) + Math.cos(u) * Math.sin(f) * Math.cos(d));
	return r([s(l + Math.atan2(Math.sin(d) * Math.sin(f) * Math.cos(u), Math.cos(f) - Math.sin(u) * Math.sin(p))), s(p)], i.properties);
}
// node_modules/@turf/bearing/dist/es/index.js
function y(e, t, n) {
	if (n === void 0 && (n = {}), n.final === !0) return b(e, t);
	var r = h(e), i = h(t), a = c(r[0]), o = c(i[0]), l = c(r[1]), u = c(i[1]), d = Math.sin(o - a) * Math.cos(u), f = Math.cos(l) * Math.sin(u) - Math.sin(l) * Math.cos(u) * Math.cos(o - a);
	return s(Math.atan2(d, f));
}
function b(e, t) {
	var n = y(t, e);
	return n = (n + 180) % 360, n;
}
// node_modules/@turf/along/dist/es/index.js
function x(e, t, n) {
	n === void 0 && (n = {});
	for (var i = g(e).coordinates, a = 0, o = 0; o < i.length && !(t >= a && o === i.length - 1); o++) if (a >= t) {
		var s = t - a;
		if (s) {
			var c = y(i[o], i[o - 1]) - 180;
			return v(i[o], s, c, n);
		}
		return r(i[o]);
	} else a += _(i[o], i[o + 1], n);
	return r(i[i.length - 1]);
}
// node_modules/@turf/length/dist/es/index.js
function S(e, t) {
	return t === void 0 && (t = {}), m(e, function(e, n) {
		var r = n.geometry.coordinates;
		return e + _(r[0], r[1], t);
	}, 0);
}
// assets/src/Utils/MapControls.ts
var C = "<svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linejoin=\"round\"><path d=\"M12 3 2 8l10 5 10-5-10-5Z\"/><path d=\"m2 13 10 5 10-5\"/></svg>";
function w(e, t, n, r) {
	let i = document.createElement("div");
	i.className = `${e}-ctrl ${e}-ctrl-group wpgpxmaps-style-menu`;
	let a = document.createElement("button");
	a.type = "button", a.className = "wpgpxmaps-style-menu-button", a.title = "Map style", a.setAttribute("aria-label", "Map style"), a.setAttribute("aria-expanded", "false"), a.innerHTML = C;
	let o = document.createElement("div");
	o.className = "wpgpxmaps-style-menu-list", o.hidden = !0;
	let s = () => {
		o.innerHTML = "";
		for (let e of t) {
			let t = document.createElement("button");
			t.type = "button", t.textContent = e.title, t.setAttribute("aria-pressed", e.key === n ? "true" : "false"), t.onclick = () => {
				n = e.key, l(), r(e.key);
			}, o.appendChild(t);
		}
	}, c = () => {
		s(), o.hidden = !1, a.setAttribute("aria-expanded", "true"), document.addEventListener("pointerdown", u, !0), document.addEventListener("keydown", d, !0);
	}, l = () => {
		o.hidden = !0, a.setAttribute("aria-expanded", "false"), document.removeEventListener("pointerdown", u, !0), document.removeEventListener("keydown", d, !0);
	}, u = (e) => {
		i.contains(e.target) || l();
	}, d = (e) => {
		e.key === "Escape" && (l(), a.focus());
	};
	return a.onclick = () => o.hidden ? c() : l(), i.appendChild(a), i.appendChild(o), i;
}
function T(e, t, n) {
	let r = e.ownerDocument, i = () => {
		let i = r.fullscreenElement ?? r.webkitFullscreenElement;
		t(i && (i === e || i.contains(e)) ? !0 : n);
	};
	r.addEventListener("fullscreenchange", i), r.addEventListener("webkitfullscreenchange", i);
}
export { i as a, x as i, T as n, S as r, w as t };
