import { n as e, t } from "./rolldown-runtime-CYdcPHCu.js";
import { n, r, t as i } from "./Icons-B9o8nLm0.js";
// node_modules/@kurkle/color/dist/color.esm.js
function a(e) {
	return e + .5 | 0;
}
var o = (e, t, n) => Math.max(Math.min(e, n), t);
function s(e) {
	return o(a(e * 2.55), 0, 255);
}
function c(e) {
	return o(a(e * 255), 0, 255);
}
function l(e) {
	return o(a(e / 2.55) / 100, 0, 1);
}
function u(e) {
	return o(a(e * 100), 0, 100);
}
var d = {
	0: 0,
	1: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	A: 10,
	B: 11,
	C: 12,
	D: 13,
	E: 14,
	F: 15,
	a: 10,
	b: 11,
	c: 12,
	d: 13,
	e: 14,
	f: 15
}, f = [..."0123456789ABCDEF"], p = (e) => f[e & 15], m = (e) => f[(e & 240) >> 4] + f[e & 15], h = (e) => (e & 240) >> 4 == (e & 15), g = (e) => h(e.r) && h(e.g) && h(e.b) && h(e.a);
function _(e) {
	var t = e.length, n;
	return e[0] === "#" && (t === 4 || t === 5 ? n = {
		r: 255 & d[e[1]] * 17,
		g: 255 & d[e[2]] * 17,
		b: 255 & d[e[3]] * 17,
		a: t === 5 ? d[e[4]] * 17 : 255
	} : (t === 7 || t === 9) && (n = {
		r: d[e[1]] << 4 | d[e[2]],
		g: d[e[3]] << 4 | d[e[4]],
		b: d[e[5]] << 4 | d[e[6]],
		a: t === 9 ? d[e[7]] << 4 | d[e[8]] : 255
	})), n;
}
var v = (e, t) => e < 255 ? t(e) : "";
function y(e) {
	var t = g(e) ? p : m;
	return e ? "#" + t(e.r) + t(e.g) + t(e.b) + v(e.a, t) : void 0;
}
var b = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function x(e, t, n) {
	let r = t * Math.min(n, 1 - n), i = (t, i = (t + e / 30) % 12) => n - r * Math.max(Math.min(i - 3, 9 - i, 1), -1);
	return [
		i(0),
		i(8),
		i(4)
	];
}
function S(e, t, n) {
	let r = (r, i = (r + e / 60) % 6) => n - n * t * Math.max(Math.min(i, 4 - i, 1), 0);
	return [
		r(5),
		r(3),
		r(1)
	];
}
function C(e, t, n) {
	let r = x(e, 1, .5), i;
	for (t + n > 1 && (i = 1 / (t + n), t *= i, n *= i), i = 0; i < 3; i++) r[i] *= 1 - t - n, r[i] += t;
	return r;
}
function w(e, t, n, r, i) {
	return e === i ? (t - n) / r + (t < n ? 6 : 0) : t === i ? (n - e) / r + 2 : (e - t) / r + 4;
}
function T(e) {
	let t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.max(t, n, r), a = Math.min(t, n, r), o = (i + a) / 2, s, c, l;
	return i !== a && (l = i - a, c = o > .5 ? l / (2 - i - a) : l / (i + a), s = w(t, n, r, l, i), s = s * 60 + .5), [
		s | 0,
		c || 0,
		o
	];
}
function E(e, t, n, r) {
	return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, r)).map(c);
}
function ee(e, t, n) {
	return E(x, e, t, n);
}
function te(e, t, n) {
	return E(C, e, t, n);
}
function ne(e, t, n) {
	return E(S, e, t, n);
}
function D(e) {
	return (e % 360 + 360) % 360;
}
function re(e) {
	let t = b.exec(e), n = 255, r;
	if (!t) return;
	t[5] !== r && (n = t[6] ? s(+t[5]) : c(+t[5]));
	let i = D(+t[2]), a = t[3] / 100, o = t[4] / 100;
	return r = t[1] === "hwb" ? te(i, a, o) : t[1] === "hsv" ? ne(i, a, o) : ee(i, a, o), {
		r: r[0],
		g: r[1],
		b: r[2],
		a: n
	};
}
function O(e, t) {
	var n = T(e);
	n[0] = D(n[0] + t), n = ee(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function ie(e) {
	if (!e) return;
	let t = T(e), n = t[0], r = u(t[1]), i = u(t[2]);
	return e.a < 255 ? `hsla(${n}, ${r}%, ${i}%, ${l(e.a)})` : `hsl(${n}, ${r}%, ${i}%)`;
}
var k = {
	x: "dark",
	Z: "light",
	Y: "re",
	X: "blu",
	W: "gr",
	V: "medium",
	U: "slate",
	A: "ee",
	T: "ol",
	S: "or",
	B: "ra",
	C: "lateg",
	D: "ights",
	R: "in",
	Q: "turquois",
	E: "hi",
	P: "ro",
	O: "al",
	N: "le",
	M: "de",
	L: "yello",
	F: "en",
	K: "ch",
	G: "arks",
	H: "ea",
	I: "ightg",
	J: "wh"
}, A = {
	OiceXe: "f0f8ff",
	antiquewEte: "faebd7",
	aqua: "ffff",
	aquamarRe: "7fffd4",
	azuY: "f0ffff",
	beige: "f5f5dc",
	bisque: "ffe4c4",
	black: "0",
	blanKedOmond: "ffebcd",
	Xe: "ff",
	XeviTet: "8a2be2",
	bPwn: "a52a2a",
	burlywood: "deb887",
	caMtXe: "5f9ea0",
	KartYuse: "7fff00",
	KocTate: "d2691e",
	cSO: "ff7f50",
	cSnflowerXe: "6495ed",
	cSnsilk: "fff8dc",
	crimson: "dc143c",
	cyan: "ffff",
	xXe: "8b",
	xcyan: "8b8b",
	xgTMnPd: "b8860b",
	xWay: "a9a9a9",
	xgYF: "6400",
	xgYy: "a9a9a9",
	xkhaki: "bdb76b",
	xmagFta: "8b008b",
	xTivegYF: "556b2f",
	xSange: "ff8c00",
	xScEd: "9932cc",
	xYd: "8b0000",
	xsOmon: "e9967a",
	xsHgYF: "8fbc8f",
	xUXe: "483d8b",
	xUWay: "2f4f4f",
	xUgYy: "2f4f4f",
	xQe: "ced1",
	xviTet: "9400d3",
	dAppRk: "ff1493",
	dApskyXe: "bfff",
	dimWay: "696969",
	dimgYy: "696969",
	dodgerXe: "1e90ff",
	fiYbrick: "b22222",
	flSOwEte: "fffaf0",
	foYstWAn: "228b22",
	fuKsia: "ff00ff",
	gaRsbSo: "dcdcdc",
	ghostwEte: "f8f8ff",
	gTd: "ffd700",
	gTMnPd: "daa520",
	Way: "808080",
	gYF: "8000",
	gYFLw: "adff2f",
	gYy: "808080",
	honeyMw: "f0fff0",
	hotpRk: "ff69b4",
	RdianYd: "cd5c5c",
	Rdigo: "4b0082",
	ivSy: "fffff0",
	khaki: "f0e68c",
	lavFMr: "e6e6fa",
	lavFMrXsh: "fff0f5",
	lawngYF: "7cfc00",
	NmoncEffon: "fffacd",
	ZXe: "add8e6",
	ZcSO: "f08080",
	Zcyan: "e0ffff",
	ZgTMnPdLw: "fafad2",
	ZWay: "d3d3d3",
	ZgYF: "90ee90",
	ZgYy: "d3d3d3",
	ZpRk: "ffb6c1",
	ZsOmon: "ffa07a",
	ZsHgYF: "20b2aa",
	ZskyXe: "87cefa",
	ZUWay: "778899",
	ZUgYy: "778899",
	ZstAlXe: "b0c4de",
	ZLw: "ffffe0",
	lime: "ff00",
	limegYF: "32cd32",
	lRF: "faf0e6",
	magFta: "ff00ff",
	maPon: "800000",
	VaquamarRe: "66cdaa",
	VXe: "cd",
	VScEd: "ba55d3",
	VpurpN: "9370db",
	VsHgYF: "3cb371",
	VUXe: "7b68ee",
	VsprRggYF: "fa9a",
	VQe: "48d1cc",
	VviTetYd: "c71585",
	midnightXe: "191970",
	mRtcYam: "f5fffa",
	mistyPse: "ffe4e1",
	moccasR: "ffe4b5",
	navajowEte: "ffdead",
	navy: "80",
	Tdlace: "fdf5e6",
	Tive: "808000",
	TivedBb: "6b8e23",
	Sange: "ffa500",
	SangeYd: "ff4500",
	ScEd: "da70d6",
	pOegTMnPd: "eee8aa",
	pOegYF: "98fb98",
	pOeQe: "afeeee",
	pOeviTetYd: "db7093",
	papayawEp: "ffefd5",
	pHKpuff: "ffdab9",
	peru: "cd853f",
	pRk: "ffc0cb",
	plum: "dda0dd",
	powMrXe: "b0e0e6",
	purpN: "800080",
	YbeccapurpN: "663399",
	Yd: "ff0000",
	Psybrown: "bc8f8f",
	PyOXe: "4169e1",
	saddNbPwn: "8b4513",
	sOmon: "fa8072",
	sandybPwn: "f4a460",
	sHgYF: "2e8b57",
	sHshell: "fff5ee",
	siFna: "a0522d",
	silver: "c0c0c0",
	skyXe: "87ceeb",
	UXe: "6a5acd",
	UWay: "708090",
	UgYy: "708090",
	snow: "fffafa",
	sprRggYF: "ff7f",
	stAlXe: "4682b4",
	tan: "d2b48c",
	teO: "8080",
	tEstN: "d8bfd8",
	tomato: "ff6347",
	Qe: "40e0d0",
	viTet: "ee82ee",
	JHt: "f5deb3",
	wEte: "ffffff",
	wEtesmoke: "f5f5f5",
	Lw: "ffff00",
	LwgYF: "9acd32"
};
function ae() {
	let e = {}, t = Object.keys(A), n = Object.keys(k), r, i, a, o, s;
	for (r = 0; r < t.length; r++) {
		for (o = s = t[r], i = 0; i < n.length; i++) a = n[i], s = s.replace(a, k[a]);
		a = parseInt(A[o], 16), e[s] = [
			a >> 16 & 255,
			a >> 8 & 255,
			a & 255
		];
	}
	return e;
}
var j;
function M(e) {
	j || (j = ae(), j.transparent = [
		0,
		0,
		0,
		0
	]);
	let t = j[e.toLowerCase()];
	return t && {
		r: t[0],
		g: t[1],
		b: t[2],
		a: t.length === 4 ? t[3] : 255
	};
}
var N = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function P(e) {
	let t = N.exec(e), n = 255, r, i, a;
	if (t) {
		if (t[7] !== r) {
			let e = +t[7];
			n = t[8] ? s(e) : o(e * 255, 0, 255);
		}
		return r = +t[1], i = +t[3], a = +t[5], r = 255 & (t[2] ? s(r) : o(r, 0, 255)), i = 255 & (t[4] ? s(i) : o(i, 0, 255)), a = 255 & (t[6] ? s(a) : o(a, 0, 255)), {
			r,
			g: i,
			b: a,
			a: n
		};
	}
}
function oe(e) {
	return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${l(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
var se = (e) => e <= .0031308 ? e * 12.92 : e ** (1 / 2.4) * 1.055 - .055, ce = (e) => e <= .04045 ? e / 12.92 : ((e + .055) / 1.055) ** 2.4;
function le(e, t, n) {
	let r = ce(l(e.r)), i = ce(l(e.g)), a = ce(l(e.b));
	return {
		r: c(se(r + n * (ce(l(t.r)) - r))),
		g: c(se(i + n * (ce(l(t.g)) - i))),
		b: c(se(a + n * (ce(l(t.b)) - a))),
		a: e.a + n * (t.a - e.a)
	};
}
function ue(e, t, n) {
	if (e) {
		let r = T(e);
		r[t] = Math.max(0, Math.min(r[t] + r[t] * n, t === 0 ? 360 : 1)), r = ee(r), e.r = r[0], e.g = r[1], e.b = r[2];
	}
}
function de(e, t) {
	return e && Object.assign(t || {}, e);
}
function fe(e) {
	var t = {
		r: 0,
		g: 0,
		b: 0,
		a: 255
	};
	return Array.isArray(e) ? e.length >= 3 && (t = {
		r: e[0],
		g: e[1],
		b: e[2],
		a: 255
	}, e.length > 3 && (t.a = c(e[3]))) : (t = de(e, {
		r: 0,
		g: 0,
		b: 0,
		a: 1
	}), t.a = c(t.a)), t;
}
function pe(e) {
	return e.charAt(0) === "r" ? P(e) : re(e);
}
var me = class e {
	constructor(t) {
		if (t instanceof e) return t;
		let n = typeof t, r;
		n === "object" ? r = fe(t) : n === "string" && (r = _(t) || M(t) || pe(t)), this._rgb = r, this._valid = !!r;
	}
	get valid() {
		return this._valid;
	}
	get rgb() {
		var e = de(this._rgb);
		return e && (e.a = l(e.a)), e;
	}
	set rgb(e) {
		this._rgb = fe(e);
	}
	rgbString() {
		return this._valid ? oe(this._rgb) : void 0;
	}
	hexString() {
		return this._valid ? y(this._rgb) : void 0;
	}
	hslString() {
		return this._valid ? ie(this._rgb) : void 0;
	}
	mix(e, t) {
		if (e) {
			let n = this.rgb, r = e.rgb, i, a = t === i ? .5 : t, o = 2 * a - 1, s = n.a - r.a, c = ((o * s === -1 ? o : (o + s) / (1 + o * s)) + 1) / 2;
			i = 1 - c, n.r = 255 & c * n.r + i * r.r + .5, n.g = 255 & c * n.g + i * r.g + .5, n.b = 255 & c * n.b + i * r.b + .5, n.a = a * n.a + (1 - a) * r.a, this.rgb = n;
		}
		return this;
	}
	interpolate(e, t) {
		return e && (this._rgb = le(this._rgb, e._rgb, t)), this;
	}
	clone() {
		return new e(this.rgb);
	}
	alpha(e) {
		return this._rgb.a = c(e), this;
	}
	clearer(e) {
		let t = this._rgb;
		return t.a *= 1 - e, this;
	}
	greyscale() {
		let e = this._rgb;
		return e.r = e.g = e.b = a(e.r * .3 + e.g * .59 + e.b * .11), this;
	}
	opaquer(e) {
		let t = this._rgb;
		return t.a *= 1 + e, this;
	}
	negate() {
		let e = this._rgb;
		return e.r = 255 - e.r, e.g = 255 - e.g, e.b = 255 - e.b, this;
	}
	lighten(e) {
		return ue(this._rgb, 2, e), this;
	}
	darken(e) {
		return ue(this._rgb, 2, -e), this;
	}
	saturate(e) {
		return ue(this._rgb, 1, e), this;
	}
	desaturate(e) {
		return ue(this._rgb, 1, -e), this;
	}
	rotate(e) {
		return O(this._rgb, e), this;
	}
};
// node_modules/chart.js/dist/chunks/helpers.segment.js
function he() {}
var ge = (() => {
	let e = 0;
	return () => e++;
})();
function F(e) {
	return e == null;
}
function I(e) {
	if (Array.isArray && Array.isArray(e)) return !0;
	let t = Object.prototype.toString.call(e);
	return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function R(e) {
	return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function z(e) {
	return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function _e(e, t) {
	return z(e) ? e : t;
}
function B(e, t) {
	return e === void 0 ? t : e;
}
var ve = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, ye = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function V(e, t, n) {
	if (e && typeof e.call == "function") return e.apply(n, t);
}
function H(e, t, n, r) {
	let i, a, o;
	if (I(e)) {
		if (a = e.length, r) for (i = a - 1; i >= 0; i--) t.call(n, e[i], i);
		else for (i = 0; i < a; i++) t.call(n, e[i], i);
	} else if (R(e)) for (o = Object.keys(e), a = o.length, i = 0; i < a; i++) t.call(n, e[o[i]], o[i]);
}
function be(e, t) {
	let n, r, i, a;
	if (!e || !t || e.length !== t.length) return !1;
	for (n = 0, r = e.length; n < r; ++n) if (i = e[n], a = t[n], i.datasetIndex !== a.datasetIndex || i.index !== a.index) return !1;
	return !0;
}
function xe(e) {
	if (I(e)) return e.map(xe);
	if (R(e)) {
		let t = Object.create(null), n = Object.keys(e), r = n.length, i = 0;
		for (; i < r; ++i) t[n[i]] = xe(e[n[i]]);
		return t;
	}
	return e;
}
function Se(e) {
	return [
		"__proto__",
		"prototype",
		"constructor"
	].indexOf(e) === -1;
}
function Ce(e, t, n, r) {
	if (!Se(e)) return;
	let i = t[e], a = n[e];
	R(i) && R(a) ? we(i, a, r) : t[e] = xe(a);
}
function we(e, t, n) {
	let r = I(t) ? t : [t], i = r.length;
	if (!R(e)) return e;
	n ||= {};
	let a = n.merger || Ce, o;
	for (let t = 0; t < i; ++t) {
		if (o = r[t], !R(o)) continue;
		let i = Object.keys(o);
		for (let t = 0, r = i.length; t < r; ++t) a(i[t], e, o, n);
	}
	return e;
}
function Te(e, t) {
	return we(e, t, { merger: Ee });
}
function Ee(e, t, n) {
	if (!Se(e)) return;
	let r = t[e], i = n[e];
	R(r) && R(i) ? Te(r, i) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = xe(i));
}
var De = {
	"": (e) => e,
	x: (e) => e.x,
	y: (e) => e.y
};
function Oe(e) {
	let t = e.split("."), n = [], r = "";
	for (let e of t) r += e, r.endsWith("\\") ? r = r.slice(0, -1) + "." : (n.push(r), r = "");
	return n;
}
function ke(e) {
	let t = Oe(e);
	return (e) => {
		for (let n of t) {
			if (n === "") break;
			e &&= e[n];
		}
		return e;
	};
}
function Ae(e, t) {
	return (De[t] || (De[t] = ke(t)))(e);
}
function je(e) {
	return e.charAt(0).toUpperCase() + e.slice(1);
}
var Me = (e) => e !== void 0, Ne = (e) => typeof e == "function", Pe = (e, t) => {
	if (e.size !== t.size) return !1;
	for (let n of e) if (!t.has(n)) return !1;
	return !0;
};
function Fe(e) {
	return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
var U = Math.PI, W = 2 * U, Ie = W + U, Le = Infinity, Re = U / 180, ze = U / 2, Be = U / 4, Ve = U * 2 / 3, He = Math.log10, Ue = Math.sign;
function We(e, t, n) {
	return Math.abs(e - t) < n;
}
function G(e) {
	let t = Math.round(e);
	e = We(e, t, e / 1e3) ? t : e;
	let n = 10 ** Math.floor(He(e)), r = e / n;
	return (r <= 1 ? 1 : r <= 2 ? 2 : r <= 5 ? 5 : 10) * n;
}
function Ge(e) {
	let t = [], n = Math.sqrt(e), r = 1;
	for (; r < n; r++) e % r === 0 && (t.push(r), t.push(e / r));
	return n === (n | 0) && t.push(n), t.sort((e, t) => e - t).pop(), t;
}
function Ke(e) {
	return !isNaN(parseFloat(e)) && isFinite(e);
}
function qe(e, t) {
	let n = Math.round(e);
	return n - t <= e && n + t >= e;
}
function Je(e, t, n) {
	let r, i, a;
	for (r = 0, i = e.length; r < i; r++) a = e[r][n], isNaN(a) || (t.min = Math.min(t.min, a), t.max = Math.max(t.max, a));
}
function Ye(e) {
	return U / 180 * e;
}
function Xe(e) {
	return 180 / U * e;
}
function Ze(e) {
	if (!z(e)) return;
	let t = 1, n = 0;
	for (; Math.round(e * t) / t !== e;) t *= 10, n++;
	return n;
}
function Qe(e, t) {
	let n = t.x - e.x, r = t.y - e.y, i = Math.sqrt(n * n + r * r), a = Math.atan2(r, n);
	return a < -.5 * U && (a += W), {
		angle: a,
		distance: i
	};
}
function $e(e, t) {
	return Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2);
}
function et(e, t) {
	return (e - t + Ie) % W - U;
}
function tt(e) {
	return (e % W + W) % W;
}
function nt(e, t, n, r) {
	let i = tt(e), a = tt(t), o = tt(n), s = tt(a - i), c = tt(o - i), l = tt(i - a), u = tt(i - o);
	return i === a || i === o || r && a === o || s > c && l < u;
}
function rt(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function it(e) {
	return rt(e, -32768, 32767);
}
function at(e, t, n, r = 1e-6) {
	return e >= Math.min(t, n) - r && e <= Math.max(t, n) + r;
}
function ot(e, t, n) {
	n ||= ((n) => e[n] < t);
	let r = e.length - 1, i = 0, a;
	for (; r - i > 1;) a = i + r >> 1, n(a) ? i = a : r = a;
	return {
		lo: i,
		hi: r
	};
}
var st = (e, t, n, r) => ot(e, n, r ? (r) => {
	let i = e[r][t];
	return i < n || i === n && e[r + 1][t] === n;
} : (r) => e[r][t] < n), ct = (e, t, n) => ot(e, n, (r) => e[r][t] >= n);
function lt(e, t, n) {
	let r = 0, i = e.length;
	for (; r < i && e[r] < t;) r++;
	for (; i > r && e[i - 1] > n;) i--;
	return r > 0 || i < e.length ? e.slice(r, i) : e;
}
var ut = [
	"push",
	"pop",
	"shift",
	"splice",
	"unshift"
];
function dt(e, t) {
	e._chartjs ? e._chartjs.listeners.push(t) : (Object.defineProperty(e, "_chartjs", {
		configurable: !0,
		enumerable: !1,
		value: { listeners: [t] }
	}), ut.forEach((t) => {
		let n = "_onData" + je(t), r = e[t];
		Object.defineProperty(e, t, {
			configurable: !0,
			enumerable: !1,
			value(...t) {
				let i = r.apply(this, t);
				return e._chartjs.listeners.forEach((e) => {
					typeof e[n] == "function" && e[n](...t);
				}), i;
			}
		});
	}));
}
function ft(e, t) {
	let n = e._chartjs;
	if (!n) return;
	let r = n.listeners, i = r.indexOf(t);
	i !== -1 && r.splice(i, 1), r.length > 0 || (ut.forEach((t) => {
		delete e[t];
	}), delete e._chartjs);
}
function pt(e) {
	let t = new Set(e);
	return t.size === e.length ? e : Array.from(t);
}
var mt = function() {
	return typeof window > "u" ? function(e) {
		return e();
	} : window.requestAnimationFrame;
}();
function ht(e, t) {
	let n = [], r = !1;
	return function(...i) {
		n = i, r || (r = !0, mt.call(window, () => {
			r = !1, e.apply(t, n);
		}));
	};
}
function K(e, t) {
	let n;
	return function(...r) {
		return t ? (clearTimeout(n), n = setTimeout(e, t, r)) : e.apply(this, r), t;
	};
}
var q = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", gt = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2, _t = (e, t, n, r) => e === (r ? "left" : "right") ? n : e === "center" ? (t + n) / 2 : t;
function vt(e, t, n) {
	let r = t.length, i = 0, a = r;
	if (e._sorted) {
		let { iScale: o, _parsed: s } = e, c = o.axis, { min: l, max: u, minDefined: d, maxDefined: f } = o.getUserBounds();
		d && (i = rt(Math.min(st(s, c, l).lo, n ? r : st(t, c, o.getPixelForValue(l)).lo), 0, r - 1)), a = f ? rt(Math.max(st(s, o.axis, u, !0).hi + 1, n ? 0 : st(t, c, o.getPixelForValue(u), !0).hi + 1), i, r) - i : r - i;
	}
	return {
		start: i,
		count: a
	};
}
function yt(e) {
	let { xScale: t, yScale: n, _scaleRanges: r } = e, i = {
		xmin: t.min,
		xmax: t.max,
		ymin: n.min,
		ymax: n.max
	};
	if (!r) return e._scaleRanges = i, !0;
	let a = r.xmin !== t.min || r.xmax !== t.max || r.ymin !== n.min || r.ymax !== n.max;
	return Object.assign(r, i), a;
}
var J = (e) => e === 0 || e === 1, bt = (e, t, n) => -(2 ** (10 * --e) * Math.sin((e - t) * W / n)), xt = (e, t, n) => 2 ** (-10 * e) * Math.sin((e - t) * W / n) + 1, St = {
	linear: (e) => e,
	easeInQuad: (e) => e * e,
	easeOutQuad: (e) => -e * (e - 2),
	easeInOutQuad: (e) => (e /= .5) < 1 ? .5 * e * e : -.5 * (--e * (e - 2) - 1),
	easeInCubic: (e) => e * e * e,
	easeOutCubic: (e) => --e * e * e + 1,
	easeInOutCubic: (e) => (e /= .5) < 1 ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2),
	easeInQuart: (e) => e * e * e * e,
	easeOutQuart: (e) => -(--e * e * e * e - 1),
	easeInOutQuart: (e) => (e /= .5) < 1 ? .5 * e * e * e * e : -.5 * ((e -= 2) * e * e * e - 2),
	easeInQuint: (e) => e * e * e * e * e,
	easeOutQuint: (e) => --e * e * e * e * e + 1,
	easeInOutQuint: (e) => (e /= .5) < 1 ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2),
	easeInSine: (e) => -Math.cos(e * ze) + 1,
	easeOutSine: (e) => Math.sin(e * ze),
	easeInOutSine: (e) => -.5 * (Math.cos(U * e) - 1),
	easeInExpo: (e) => e === 0 ? 0 : 2 ** (10 * (e - 1)),
	easeOutExpo: (e) => e === 1 ? 1 : -(2 ** (-10 * e)) + 1,
	easeInOutExpo: (e) => J(e) ? e : e < .5 ? .5 * 2 ** (10 * (e * 2 - 1)) : .5 * (-(2 ** (-10 * (e * 2 - 1))) + 2),
	easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
	easeOutCirc: (e) => Math.sqrt(1 - --e * e),
	easeInOutCirc: (e) => (e /= .5) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
	easeInElastic: (e) => J(e) ? e : bt(e, .075, .3),
	easeOutElastic: (e) => J(e) ? e : xt(e, .075, .3),
	easeInOutElastic(e) {
		let t = .1125, n = .45;
		return J(e) ? e : e < .5 ? .5 * bt(e * 2, t, n) : .5 + .5 * xt(e * 2 - 1, t, n);
	},
	easeInBack(e) {
		return e * e * (2.70158 * e - 1.70158);
	},
	easeOutBack(e) {
		return --e * e * (2.70158 * e + 1.70158) + 1;
	},
	easeInOutBack(e) {
		let t = 1.70158;
		return (e /= .5) < 1 ? .5 * (e * e * (((t *= 1.525) + 1) * e - t)) : .5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
	},
	easeInBounce: (e) => 1 - St.easeOutBounce(1 - e),
	easeOutBounce(e) {
		let t = 7.5625, n = 2.75;
		return e < 1 / n ? t * e * e : e < 2 / n ? t * (e -= 1.5 / n) * e + .75 : e < 2.5 / n ? t * (e -= 2.25 / n) * e + .9375 : t * (e -= 2.625 / n) * e + .984375;
	},
	easeInOutBounce: (e) => e < .5 ? St.easeInBounce(e * 2) * .5 : St.easeOutBounce(e * 2 - 1) * .5 + .5
};
function Ct(e) {
	if (e && typeof e == "object") {
		let t = e.toString();
		return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
	}
	return !1;
}
function wt(e) {
	return Ct(e) ? e : new me(e);
}
function Tt(e) {
	return Ct(e) ? e : new me(e).saturate(.5).darken(.1).hexString();
}
var Et = [
	"x",
	"y",
	"borderWidth",
	"radius",
	"tension"
], Dt = [
	"color",
	"borderColor",
	"backgroundColor"
];
function Ot(e) {
	e.set("animation", {
		delay: void 0,
		duration: 1e3,
		easing: "easeOutQuart",
		fn: void 0,
		from: void 0,
		loop: void 0,
		to: void 0,
		type: void 0
	}), e.describe("animation", {
		_fallback: !1,
		_indexable: !1,
		_scriptable: (e) => e !== "onProgress" && e !== "onComplete" && e !== "fn"
	}), e.set("animations", {
		colors: {
			type: "color",
			properties: Dt
		},
		numbers: {
			type: "number",
			properties: Et
		}
	}), e.describe("animations", { _fallback: "animation" }), e.set("transitions", {
		active: { animation: { duration: 400 } },
		resize: { animation: { duration: 0 } },
		show: { animations: {
			colors: { from: "transparent" },
			visible: {
				type: "boolean",
				duration: 0
			}
		} },
		hide: { animations: {
			colors: { to: "transparent" },
			visible: {
				type: "boolean",
				easing: "linear",
				fn: (e) => e | 0
			}
		} }
	});
}
function kt(e) {
	e.set("layout", {
		autoPadding: !0,
		padding: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		}
	});
}
var At = /* @__PURE__ */ new Map();
function jt(e, t) {
	t ||= {};
	let n = e + JSON.stringify(t), r = At.get(n);
	return r || (r = new Intl.NumberFormat(e, t), At.set(n, r)), r;
}
function Mt(e, t, n) {
	return jt(t, n).format(e);
}
var Nt = {
	values(e) {
		return I(e) ? e : "" + e;
	},
	numeric(e, t, n) {
		if (e === 0) return "0";
		let r = this.chart.options.locale, i, a = e;
		if (n.length > 1) {
			let t = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
			(t < 1e-4 || t > 0x38d7ea4c68000) && (i = "scientific"), a = Pt(e, n);
		}
		let o = He(Math.abs(a)), s = isNaN(o) ? 1 : Math.max(Math.min(-1 * Math.floor(o), 20), 0), c = {
			notation: i,
			minimumFractionDigits: s,
			maximumFractionDigits: s
		};
		return Object.assign(c, this.options.ticks.format), Mt(e, r, c);
	},
	logarithmic(e, t, n) {
		if (e === 0) return "0";
		let r = n[t].significand || e / 10 ** Math.floor(He(e));
		return [
			1,
			2,
			3,
			5,
			10,
			15
		].includes(r) || t > .8 * n.length ? Nt.numeric.call(this, e, t, n) : "";
	}
};
function Pt(e, t) {
	let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
	return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var Ft = { formatters: Nt };
function It(e) {
	e.set("scale", {
		display: !0,
		offset: !1,
		reverse: !1,
		beginAtZero: !1,
		bounds: "ticks",
		clip: !0,
		grace: 0,
		grid: {
			display: !0,
			lineWidth: 1,
			drawOnChartArea: !0,
			drawTicks: !0,
			tickLength: 8,
			tickWidth: (e, t) => t.lineWidth,
			tickColor: (e, t) => t.color,
			offset: !1
		},
		border: {
			display: !0,
			dash: [],
			dashOffset: 0,
			width: 1
		},
		title: {
			display: !1,
			text: "",
			padding: {
				top: 4,
				bottom: 4
			}
		},
		ticks: {
			minRotation: 0,
			maxRotation: 50,
			mirror: !1,
			textStrokeWidth: 0,
			textStrokeColor: "",
			padding: 3,
			display: !0,
			autoSkip: !0,
			autoSkipPadding: 3,
			labelOffset: 0,
			callback: Ft.formatters.values,
			minor: {},
			major: {},
			align: "center",
			crossAlign: "near",
			showLabelBackdrop: !1,
			backdropColor: "rgba(255, 255, 255, 0.75)",
			backdropPadding: 2
		}
	}), e.route("scale.ticks", "color", "", "color"), e.route("scale.grid", "color", "", "borderColor"), e.route("scale.border", "color", "", "borderColor"), e.route("scale.title", "color", "", "color"), e.describe("scale", {
		_fallback: !1,
		_scriptable: (e) => !e.startsWith("before") && !e.startsWith("after") && e !== "callback" && e !== "parser",
		_indexable: (e) => e !== "borderDash" && e !== "tickBorderDash" && e !== "dash"
	}), e.describe("scales", { _fallback: "scale" }), e.describe("scale.ticks", {
		_scriptable: (e) => e !== "backdropPadding" && e !== "callback",
		_indexable: (e) => e !== "backdropPadding"
	});
}
var Lt = Object.create(null), Rt = Object.create(null);
function zt(e, t) {
	if (!t) return e;
	let n = t.split(".");
	for (let t = 0, r = n.length; t < r; ++t) {
		let r = n[t];
		e = e[r] || (e[r] = Object.create(null));
	}
	return e;
}
function Bt(e, t, n) {
	return typeof t == "string" ? we(zt(e, t), n) : we(zt(e, ""), t);
}
var Y = /* #__PURE__ */ new class {
	constructor(e, t) {
		this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (e) => e.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
			"mousemove",
			"mouseout",
			"click",
			"touchstart",
			"touchmove"
		], this.font = {
			family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
			size: 12,
			style: "normal",
			lineHeight: 1.2,
			weight: null
		}, this.hover = {}, this.hoverBackgroundColor = (e, t) => Tt(t.backgroundColor), this.hoverBorderColor = (e, t) => Tt(t.borderColor), this.hoverColor = (e, t) => Tt(t.color), this.indexAxis = "x", this.interaction = {
			mode: "nearest",
			intersect: !0,
			includeInvisible: !1
		}, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(e), this.apply(t);
	}
	set(e, t) {
		return Bt(this, e, t);
	}
	get(e) {
		return zt(this, e);
	}
	describe(e, t) {
		return Bt(Rt, e, t);
	}
	override(e, t) {
		return Bt(Lt, e, t);
	}
	route(e, t, n, r) {
		let i = zt(this, e), a = zt(this, n), o = "_" + t;
		Object.defineProperties(i, {
			[o]: {
				value: i[t],
				writable: !0
			},
			[t]: {
				enumerable: !0,
				get() {
					let e = this[o], t = a[r];
					return R(e) ? Object.assign({}, t, e) : B(e, t);
				},
				set(e) {
					this[o] = e;
				}
			}
		});
	}
	apply(e) {
		e.forEach((e) => e(this));
	}
}({
	_scriptable: (e) => !e.startsWith("on"),
	_indexable: (e) => e !== "events",
	hover: { _fallback: "interaction" },
	interaction: {
		_scriptable: !1,
		_indexable: !1
	}
}, [
	Ot,
	kt,
	It
]);
function X(e) {
	return !e || F(e.size) || F(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function Vt(e, t, n, r, i) {
	let a = t[i];
	return a || (a = t[i] = e.measureText(i).width, n.push(i)), a > r && (r = a), r;
}
function Z(e, t, n, r) {
	r ||= {};
	let i = r.data = r.data || {}, a = r.garbageCollect = r.garbageCollect || [];
	r.font !== t && (i = r.data = {}, a = r.garbageCollect = [], r.font = t), e.save(), e.font = t;
	let o = 0, s = n.length, c, l, u, d, f;
	for (c = 0; c < s; c++) if (d = n[c], d != null && !I(d)) o = Vt(e, i, a, o, d);
	else if (I(d)) for (l = 0, u = d.length; l < u; l++) f = d[l], f != null && !I(f) && (o = Vt(e, i, a, o, f));
	e.restore();
	let p = a.length / 2;
	if (p > n.length) {
		for (c = 0; c < p; c++) delete i[a[c]];
		a.splice(0, p);
	}
	return o;
}
function Ht(e, t, n) {
	let r = e.currentDevicePixelRatio, i = n === 0 ? 0 : Math.max(n / 2, .5);
	return Math.round((t - i) * r) / r + i;
}
function Ut(e, t) {
	(t || e) && (t ||= e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Wt(e, t, n, r) {
	Gt(e, t, n, r, null);
}
function Gt(e, t, n, r, i) {
	let a, o, s, c, l, u, d, f, p = t.pointStyle, m = t.rotation, h = t.radius, g = (m || 0) * Re;
	if (p && typeof p == "object" && (a = p.toString(), a === "[object HTMLImageElement]" || a === "[object HTMLCanvasElement]")) e.save(), e.translate(n, r), e.rotate(g), e.drawImage(p, -p.width / 2, -p.height / 2, p.width, p.height), e.restore();
	else if (!(isNaN(h) || h <= 0)) {
		switch (e.beginPath(), p) {
			default:
				i ? e.ellipse(n, r, i / 2, h, 0, 0, W) : e.arc(n, r, h, 0, W), e.closePath();
				break;
			case "triangle":
				u = i ? i / 2 : h, e.moveTo(n + Math.sin(g) * u, r - Math.cos(g) * h), g += Ve, e.lineTo(n + Math.sin(g) * u, r - Math.cos(g) * h), g += Ve, e.lineTo(n + Math.sin(g) * u, r - Math.cos(g) * h), e.closePath();
				break;
			case "rectRounded":
				l = h * .516, c = h - l, o = Math.cos(g + Be) * c, d = Math.cos(g + Be) * (i ? i / 2 - l : c), s = Math.sin(g + Be) * c, f = Math.sin(g + Be) * (i ? i / 2 - l : c), e.arc(n - d, r - s, l, g - U, g - ze), e.arc(n + f, r - o, l, g - ze, g), e.arc(n + d, r + s, l, g, g + ze), e.arc(n - f, r + o, l, g + ze, g + U), e.closePath();
				break;
			case "rect":
				if (!m) {
					c = Math.SQRT1_2 * h, u = i ? i / 2 : c, e.rect(n - u, r - c, 2 * u, 2 * c);
					break;
				}
				g += Be;
			case "rectRot":
				d = Math.cos(g) * (i ? i / 2 : h), o = Math.cos(g) * h, s = Math.sin(g) * h, f = Math.sin(g) * (i ? i / 2 : h), e.moveTo(n - d, r - s), e.lineTo(n + f, r - o), e.lineTo(n + d, r + s), e.lineTo(n - f, r + o), e.closePath();
				break;
			case "crossRot": g += Be;
			case "cross":
				d = Math.cos(g) * (i ? i / 2 : h), o = Math.cos(g) * h, s = Math.sin(g) * h, f = Math.sin(g) * (i ? i / 2 : h), e.moveTo(n - d, r - s), e.lineTo(n + d, r + s), e.moveTo(n + f, r - o), e.lineTo(n - f, r + o);
				break;
			case "star":
				d = Math.cos(g) * (i ? i / 2 : h), o = Math.cos(g) * h, s = Math.sin(g) * h, f = Math.sin(g) * (i ? i / 2 : h), e.moveTo(n - d, r - s), e.lineTo(n + d, r + s), e.moveTo(n + f, r - o), e.lineTo(n - f, r + o), g += Be, d = Math.cos(g) * (i ? i / 2 : h), o = Math.cos(g) * h, s = Math.sin(g) * h, f = Math.sin(g) * (i ? i / 2 : h), e.moveTo(n - d, r - s), e.lineTo(n + d, r + s), e.moveTo(n + f, r - o), e.lineTo(n - f, r + o);
				break;
			case "line":
				o = i ? i / 2 : Math.cos(g) * h, s = Math.sin(g) * h, e.moveTo(n - o, r - s), e.lineTo(n + o, r + s);
				break;
			case "dash":
				e.moveTo(n, r), e.lineTo(n + Math.cos(g) * (i ? i / 2 : h), r + Math.sin(g) * h);
				break;
			case !1: e.closePath();
		}
		e.fill(), t.borderWidth > 0 && e.stroke();
	}
}
function Kt(e, t, n) {
	return n ||= .5, !t || e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n;
}
function qt(e, t) {
	e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function Jt(e) {
	e.restore();
}
function Yt(e, t, n, r, i) {
	if (!t) return e.lineTo(n.x, n.y);
	if (i === "middle") {
		let r = (t.x + n.x) / 2;
		e.lineTo(r, t.y), e.lineTo(r, n.y);
	} else i === "after" == !!r ? e.lineTo(n.x, t.y) : e.lineTo(t.x, n.y);
	e.lineTo(n.x, n.y);
}
function Xt(e, t, n, r) {
	if (!t) return e.lineTo(n.x, n.y);
	e.bezierCurveTo(r ? t.cp1x : t.cp2x, r ? t.cp1y : t.cp2y, r ? n.cp2x : n.cp1x, r ? n.cp2y : n.cp1y, n.x, n.y);
}
function Zt(e, t) {
	t.translation && e.translate(t.translation[0], t.translation[1]), F(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function Qt(e, t, n, r, i) {
	if (i.strikethrough || i.underline) {
		let a = e.measureText(r), o = t - a.actualBoundingBoxLeft, s = t + a.actualBoundingBoxRight, c = n - a.actualBoundingBoxAscent, l = n + a.actualBoundingBoxDescent, u = i.strikethrough ? (c + l) / 2 : l;
		e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = i.decorationWidth || 2, e.moveTo(o, u), e.lineTo(s, u), e.stroke();
	}
}
function $t(e, t) {
	let n = e.fillStyle;
	e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function en(e, t, n, r, i, a = {}) {
	let o = I(t) ? t : [t], s = a.strokeWidth > 0 && a.strokeColor !== "", c, l;
	for (e.save(), e.font = i.string, Zt(e, a), c = 0; c < o.length; ++c) l = o[c], a.backdrop && $t(e, a.backdrop), s && (a.strokeColor && (e.strokeStyle = a.strokeColor), F(a.strokeWidth) || (e.lineWidth = a.strokeWidth), e.strokeText(l, n, r, a.maxWidth)), e.fillText(l, n, r, a.maxWidth), Qt(e, n, r, l, a), r += Number(i.lineHeight);
	e.restore();
}
function tn(e, t) {
	let { x: n, y: r, w: i, h: a, radius: o } = t;
	e.arc(n + o.topLeft, r + o.topLeft, o.topLeft, 1.5 * U, U, !0), e.lineTo(n, r + a - o.bottomLeft), e.arc(n + o.bottomLeft, r + a - o.bottomLeft, o.bottomLeft, U, ze, !0), e.lineTo(n + i - o.bottomRight, r + a), e.arc(n + i - o.bottomRight, r + a - o.bottomRight, o.bottomRight, ze, 0, !0), e.lineTo(n + i, r + o.topRight), e.arc(n + i - o.topRight, r + o.topRight, o.topRight, 0, -ze, !0), e.lineTo(n + o.topLeft, r);
}
var nn = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, rn = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Q(e, t) {
	let n = ("" + e).match(nn);
	if (!n || n[1] === "normal") return t * 1.2;
	switch (e = +n[2], n[3]) {
		case "px": return e;
		case "%": e /= 100;
	}
	return t * e;
}
var an = (e) => +e || 0;
function on(e, t) {
	let n = {}, r = R(t), i = r ? Object.keys(t) : t, a = R(e) ? r ? (n) => B(e[n], e[t[n]]) : (t) => e[t] : () => e;
	for (let e of i) n[e] = an(a(e));
	return n;
}
function sn(e) {
	return on(e, {
		top: "y",
		right: "x",
		bottom: "y",
		left: "x"
	});
}
function cn(e) {
	return on(e, [
		"topLeft",
		"topRight",
		"bottomLeft",
		"bottomRight"
	]);
}
function ln(e) {
	let t = sn(e);
	return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function un(e, t) {
	e ||= {}, t ||= Y.font;
	let n = B(e.size, t.size);
	typeof n == "string" && (n = parseInt(n, 10));
	let r = B(e.style, t.style);
	r && !("" + r).match(rn) && (console.warn("Invalid font style specified: \"" + r + "\""), r = void 0);
	let i = {
		family: B(e.family, t.family),
		lineHeight: Q(B(e.lineHeight, t.lineHeight), n),
		size: n,
		style: r,
		weight: B(e.weight, t.weight),
		string: ""
	};
	return i.string = X(i), i;
}
function dn(e, t, n, r) {
	let i = !0, a, o, s;
	for (a = 0, o = e.length; a < o; ++a) if (s = e[a], s !== void 0 && (t !== void 0 && typeof s == "function" && (s = s(t), i = !1), n !== void 0 && I(s) && (s = s[n % s.length], i = !1), s !== void 0)) return r && !i && (r.cacheable = !1), s;
}
function fn(e, t, n) {
	let { min: r, max: i } = e, a = ye(t, (i - r) / 2), o = (e, t) => n && e === 0 ? 0 : e + t;
	return {
		min: o(r, -Math.abs(a)),
		max: o(i, a)
	};
}
function pn(e, t) {
	return Object.assign(Object.create(e), t);
}
function mn(e, t = [""], n, r, i = () => e[0]) {
	let a = n || e;
	return r === void 0 && (r = An("_fallback", e)), new Proxy({
		[Symbol.toStringTag]: "Object",
		_cacheable: !0,
		_scopes: e,
		_rootScopes: a,
		_fallback: r,
		_getTarget: i,
		override: (n) => mn([n, ...e], t, a, r)
	}, {
		deleteProperty(t, n) {
			return delete t[n], delete t._keys, delete e[0][n], !0;
		},
		get(n, r) {
			return yn(n, r, () => kn(r, t, e, n));
		},
		getOwnPropertyDescriptor(e, t) {
			return Reflect.getOwnPropertyDescriptor(e._scopes[0], t);
		},
		getPrototypeOf() {
			return Reflect.getPrototypeOf(e[0]);
		},
		has(e, t) {
			return jn(e).includes(t);
		},
		ownKeys(e) {
			return jn(e);
		},
		set(e, t, n) {
			let r = e._storage ||= i();
			return e[t] = r[t] = n, delete e._keys, !0;
		}
	});
}
function hn(e, t, n, r) {
	let i = {
		_cacheable: !1,
		_proxy: e,
		_context: t,
		_subProxy: n,
		_stack: /* @__PURE__ */ new Set(),
		_descriptors: gn(e, r),
		setContext: (t) => hn(e, t, n, r),
		override: (i) => hn(e.override(i), t, n, r)
	};
	return new Proxy(i, {
		deleteProperty(t, n) {
			return delete t[n], delete e[n], !0;
		},
		get(e, t, n) {
			return yn(e, t, () => bn(e, t, n));
		},
		getOwnPropertyDescriptor(t, n) {
			return t._descriptors.allKeys ? Reflect.has(e, n) ? {
				enumerable: !0,
				configurable: !0
			} : void 0 : Reflect.getOwnPropertyDescriptor(e, n);
		},
		getPrototypeOf() {
			return Reflect.getPrototypeOf(e);
		},
		has(t, n) {
			return Reflect.has(e, n);
		},
		ownKeys() {
			return Reflect.ownKeys(e);
		},
		set(t, n, r) {
			return e[n] = r, delete t[n], !0;
		}
	});
}
function gn(e, t = {
	scriptable: !0,
	indexable: !0
}) {
	let { _scriptable: n = t.scriptable, _indexable: r = t.indexable, _allKeys: i = t.allKeys } = e;
	return {
		allKeys: i,
		scriptable: n,
		indexable: r,
		isScriptable: Ne(n) ? n : () => n,
		isIndexable: Ne(r) ? r : () => r
	};
}
var _n = (e, t) => e ? e + je(t) : t, vn = (e, t) => R(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function yn(e, t, n) {
	if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor") return e[t];
	let r = n();
	return e[t] = r, r;
}
function bn(e, t, n) {
	let { _proxy: r, _context: i, _subProxy: a, _descriptors: o } = e, s = r[t];
	return Ne(s) && o.isScriptable(t) && (s = xn(t, s, e, n)), I(s) && s.length && (s = Sn(t, s, e, o.isIndexable)), vn(t, s) && (s = hn(s, i, a && a[t], o)), s;
}
function xn(e, t, n, r) {
	let { _proxy: i, _context: a, _subProxy: o, _stack: s } = n;
	if (s.has(e)) throw Error("Recursion detected: " + Array.from(s).join("->") + "->" + e);
	s.add(e);
	let c = t(a, o || r);
	return s.delete(e), vn(e, c) && (c = En(i._scopes, i, e, c)), c;
}
function Sn(e, t, n, r) {
	let { _proxy: i, _context: a, _subProxy: o, _descriptors: s } = n;
	if (a.index !== void 0 && r(e)) return t[a.index % t.length];
	if (R(t[0])) {
		let n = t, r = i._scopes.filter((e) => e !== n);
		t = [];
		for (let c of n) {
			let n = En(r, i, e, c);
			t.push(hn(n, a, o && o[e], s));
		}
	}
	return t;
}
function Cn(e, t, n) {
	return Ne(e) ? e(t, n) : e;
}
var wn = (e, t) => e === !0 ? t : typeof e == "string" ? Ae(t, e) : void 0;
function Tn(e, t, n, r, i) {
	for (let a of t) {
		let t = wn(n, a);
		if (t) {
			e.add(t);
			let a = Cn(t._fallback, n, i);
			if (a !== void 0 && a !== n && a !== r) return a;
		} else if (t === !1 && r !== void 0 && n !== r) return null;
	}
	return !1;
}
function En(e, t, n, r) {
	let i = t._rootScopes, a = Cn(t._fallback, n, r), o = [...e, ...i], s = /* @__PURE__ */ new Set();
	s.add(r);
	let c = Dn(s, o, n, a || n, r);
	return c === null || a !== void 0 && a !== n && (c = Dn(s, o, a, c, r), c === null) ? !1 : mn(Array.from(s), [""], i, a, () => On(t, n, r));
}
function Dn(e, t, n, r, i) {
	for (; n;) n = Tn(e, t, n, r, i);
	return n;
}
function On(e, t, n) {
	let r = e._getTarget();
	t in r || (r[t] = {});
	let i = r[t];
	return I(i) && R(n) ? n : i || {};
}
function kn(e, t, n, r) {
	let i;
	for (let a of t) if (i = An(_n(a, e), n), i !== void 0) return vn(e, i) ? En(n, r, e, i) : i;
}
function An(e, t) {
	for (let n of t) {
		if (!n) continue;
		let t = n[e];
		if (t !== void 0) return t;
	}
}
function jn(e) {
	let t = e._keys;
	return t ||= e._keys = Mn(e._scopes), t;
}
function Mn(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) for (let e of Object.keys(n).filter((e) => !e.startsWith("_"))) t.add(e);
	return Array.from(t);
}
function Nn(e, t, n, r) {
	let { iScale: i } = e, { key: a = "r" } = this._parsing, o = Array(r), s, c, l, u;
	for (s = 0, c = r; s < c; ++s) l = s + n, u = t[l], o[s] = { r: i.parse(Ae(u, a), l) };
	return o;
}
var Pn = 2 ** -52 || 1e-14, Fn = (e, t) => t < e.length && !e[t].skip && e[t], In = (e) => e === "x" ? "y" : "x";
function Ln(e, t, n, r) {
	let i = e.skip ? t : e, a = t, o = n.skip ? t : n, s = $e(a, i), c = $e(o, a), l = s / (s + c), u = c / (s + c);
	l = isNaN(l) ? 0 : l, u = isNaN(u) ? 0 : u;
	let d = r * l, f = r * u;
	return {
		previous: {
			x: a.x - d * (o.x - i.x),
			y: a.y - d * (o.y - i.y)
		},
		next: {
			x: a.x + f * (o.x - i.x),
			y: a.y + f * (o.y - i.y)
		}
	};
}
function Rn(e, t, n) {
	let r = e.length, i, a, o, s, c, l = Fn(e, 0);
	for (let u = 0; u < r - 1; ++u) c = l, l = Fn(e, u + 1), c && l && (We(t[u], 0, Pn) ? n[u] = n[u + 1] = 0 : (i = n[u] / t[u], a = n[u + 1] / t[u], s = i ** 2 + a ** 2, s <= 9 || (o = 3 / Math.sqrt(s), n[u] = i * o * t[u], n[u + 1] = a * o * t[u])));
}
function zn(e, t, n = "x") {
	let r = In(n), i = e.length, a, o, s, c = Fn(e, 0);
	for (let l = 0; l < i; ++l) {
		if (o = s, s = c, c = Fn(e, l + 1), !s) continue;
		let i = s[n], u = s[r];
		o && (a = (i - o[n]) / 3, s[`cp1${n}`] = i - a, s[`cp1${r}`] = u - a * t[l]), c && (a = (c[n] - i) / 3, s[`cp2${n}`] = i + a, s[`cp2${r}`] = u + a * t[l]);
	}
}
function Bn(e, t = "x") {
	let n = In(t), r = e.length, i = Array(r).fill(0), a = Array(r), o, s, c, l = Fn(e, 0);
	for (o = 0; o < r; ++o) if (s = c, c = l, l = Fn(e, o + 1), c) {
		if (l) {
			let e = l[t] - c[t];
			i[o] = e === 0 ? 0 : (l[n] - c[n]) / e;
		}
		a[o] = s ? l ? Ue(i[o - 1]) === Ue(i[o]) ? (i[o - 1] + i[o]) / 2 : 0 : i[o - 1] : i[o];
	}
	Rn(e, i, a), zn(e, a, t);
}
function Vn(e, t, n) {
	return Math.max(Math.min(e, n), t);
}
function Hn(e, t) {
	let n, r, i, a, o, s = Kt(e[0], t);
	for (n = 0, r = e.length; n < r; ++n) o = a, a = s, s = n < r - 1 && Kt(e[n + 1], t), a && (i = e[n], o && (i.cp1x = Vn(i.cp1x, t.left, t.right), i.cp1y = Vn(i.cp1y, t.top, t.bottom)), s && (i.cp2x = Vn(i.cp2x, t.left, t.right), i.cp2y = Vn(i.cp2y, t.top, t.bottom)));
}
function Un(e, t, n, r, i) {
	let a, o, s, c;
	if (t.spanGaps && (e = e.filter((e) => !e.skip)), t.cubicInterpolationMode === "monotone") Bn(e, i);
	else {
		let n = r ? e[e.length - 1] : e[0];
		for (a = 0, o = e.length; a < o; ++a) s = e[a], c = Ln(n, s, e[Math.min(a + 1, o - +!r) % o], t.tension), s.cp1x = c.previous.x, s.cp1y = c.previous.y, s.cp2x = c.next.x, s.cp2y = c.next.y, n = s;
	}
	t.capBezierPoints && Hn(e, n);
}
function Wn() {
	return typeof window < "u" && typeof document < "u";
}
function Gn(e) {
	let t = e.parentNode;
	return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function Kn(e, t, n) {
	let r;
	return typeof e == "string" ? (r = parseInt(e, 10), e.indexOf("%") !== -1 && (r = r / 100 * t.parentNode[n])) : r = e, r;
}
var qn = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Jn(e, t) {
	return qn(e).getPropertyValue(t);
}
var Yn = [
	"top",
	"right",
	"bottom",
	"left"
];
function Xn(e, t, n) {
	let r = {};
	n = n ? "-" + n : "";
	for (let i = 0; i < 4; i++) {
		let a = Yn[i];
		r[a] = parseFloat(e[t + "-" + a + n]) || 0;
	}
	return r.width = r.left + r.right, r.height = r.top + r.bottom, r;
}
var Zn = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function Qn(e, t) {
	let n = e.touches, r = n && n.length ? n[0] : e, { offsetX: i, offsetY: a } = r, o = !1, s, c;
	if (Zn(i, a, e.target)) s = i, c = a;
	else {
		let e = t.getBoundingClientRect();
		s = r.clientX - e.left, c = r.clientY - e.top, o = !0;
	}
	return {
		x: s,
		y: c,
		box: o
	};
}
function $n(e, t) {
	if ("native" in e) return e;
	let { canvas: n, currentDevicePixelRatio: r } = t, i = qn(n), a = i.boxSizing === "border-box", o = Xn(i, "padding"), s = Xn(i, "border", "width"), { x: c, y: l, box: u } = Qn(e, n), d = o.left + (u && s.left), f = o.top + (u && s.top), { width: p, height: m } = t;
	return a && (p -= o.width + s.width, m -= o.height + s.height), {
		x: Math.round((c - d) / p * n.width / r),
		y: Math.round((l - f) / m * n.height / r)
	};
}
function er(e, t, n) {
	let r, i;
	if (t === void 0 || n === void 0) {
		let a = e && Gn(e);
		if (!a) t = e.clientWidth, n = e.clientHeight;
		else {
			let e = a.getBoundingClientRect(), o = qn(a), s = Xn(o, "border", "width"), c = Xn(o, "padding");
			t = e.width - c.width - s.width, n = e.height - c.height - s.height, r = Kn(o.maxWidth, a, "clientWidth"), i = Kn(o.maxHeight, a, "clientHeight");
		}
	}
	return {
		width: t,
		height: n,
		maxWidth: r || Le,
		maxHeight: i || Le
	};
}
var tr = (e) => Math.round(e * 10) / 10;
function nr(e, t, n, r) {
	let i = qn(e), a = Xn(i, "margin"), o = Kn(i.maxWidth, e, "clientWidth") || Le, s = Kn(i.maxHeight, e, "clientHeight") || Le, c = er(e, t, n), { width: l, height: u } = c;
	if (i.boxSizing === "content-box") {
		let e = Xn(i, "border", "width"), t = Xn(i, "padding");
		l -= t.width + e.width, u -= t.height + e.height;
	}
	return l = Math.max(0, l - a.width), u = Math.max(0, r ? l / r : u - a.height), l = tr(Math.min(l, o, c.maxWidth)), u = tr(Math.min(u, s, c.maxHeight)), l && !u && (u = tr(l / 2)), (t !== void 0 || n !== void 0) && r && c.height && u > c.height && (u = c.height, l = tr(Math.floor(u * r))), {
		width: l,
		height: u
	};
}
function rr(e, t, n) {
	let r = t || 1, i = Math.floor(e.height * r), a = Math.floor(e.width * r);
	e.height = Math.floor(e.height), e.width = Math.floor(e.width);
	let o = e.canvas;
	return o.style && (n || !o.style.height && !o.style.width) && (o.style.height = `${e.height}px`, o.style.width = `${e.width}px`), e.currentDevicePixelRatio !== r || o.height !== i || o.width !== a ? (e.currentDevicePixelRatio = r, o.height = i, o.width = a, e.ctx.setTransform(r, 0, 0, r, 0, 0), !0) : !1;
}
var ir = function() {
	let e = !1;
	try {
		let t = { get passive() {
			return e = !0, !1;
		} };
		Wn() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
	} catch {}
	return e;
}();
function ar(e, t) {
	let n = Jn(e, t), r = n && n.match(/^(\d+)(\.\d+)?px$/);
	return r ? +r[1] : void 0;
}
function or(e, t, n, r) {
	return {
		x: e.x + n * (t.x - e.x),
		y: e.y + n * (t.y - e.y)
	};
}
function sr(e, t, n, r) {
	return {
		x: e.x + n * (t.x - e.x),
		y: r === "middle" ? n < .5 ? e.y : t.y : r === "after" ? n < 1 ? e.y : t.y : n > 0 ? t.y : e.y
	};
}
function cr(e, t, n, r) {
	let i = {
		x: e.cp2x,
		y: e.cp2y
	}, a = {
		x: t.cp1x,
		y: t.cp1y
	}, o = or(e, i, n), s = or(i, a, n), c = or(a, t, n);
	return or(or(o, s, n), or(s, c, n), n);
}
var lr = function(e, t) {
	return {
		x(n) {
			return e + e + t - n;
		},
		setWidth(e) {
			t = e;
		},
		textAlign(e) {
			return e === "center" ? e : e === "right" ? "left" : "right";
		},
		xPlus(e, t) {
			return e - t;
		},
		leftForLtr(e, t) {
			return e - t;
		}
	};
}, ur = function() {
	return {
		x(e) {
			return e;
		},
		setWidth(e) {},
		textAlign(e) {
			return e;
		},
		xPlus(e, t) {
			return e + t;
		},
		leftForLtr(e, t) {
			return e;
		}
	};
};
function dr(e, t, n) {
	return e ? lr(t, n) : ur();
}
function fr(e, t) {
	let n, r;
	(t === "ltr" || t === "rtl") && (n = e.canvas.style, r = [n.getPropertyValue("direction"), n.getPropertyPriority("direction")], n.setProperty("direction", t, "important"), e.prevTextDirection = r);
}
function pr(e, t) {
	t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function mr(e) {
	return e === "angle" ? {
		between: nt,
		compare: et,
		normalize: tt
	} : {
		between: at,
		compare: (e, t) => e - t,
		normalize: (e) => e
	};
}
function hr({ start: e, end: t, count: n, loop: r, style: i }) {
	return {
		start: e % n,
		end: t % n,
		loop: r && (t - e + 1) % n === 0,
		style: i
	};
}
function gr(e, t, n) {
	let { property: r, start: i, end: a } = n, { between: o, normalize: s } = mr(r), c = t.length, { start: l, end: u, loop: d } = e, f, p;
	if (d) {
		for (l += c, u += c, f = 0, p = c; f < p && o(s(t[l % c][r]), i, a); ++f) l--, u--;
		l %= c, u %= c;
	}
	return u < l && (u += c), {
		start: l,
		end: u,
		loop: d,
		style: e.style
	};
}
function _r(e, t, n) {
	if (!n) return [e];
	let { property: r, start: i, end: a } = n, o = t.length, { compare: s, between: c, normalize: l } = mr(r), { start: u, end: d, loop: f, style: p } = gr(e, t, n), m = [], h = !1, g = null, _, v, y, b = () => c(i, y, _) && s(i, y) !== 0, x = () => s(a, _) === 0 || c(a, y, _), S = () => h || b(), C = () => !h || x();
	for (let e = u, n = u; e <= d; ++e) v = t[e % o], v.skip || (_ = l(v[r]), _ !== y && (h = c(_, i, a), g === null && S() && (g = s(_, i) === 0 ? e : n), g !== null && C() && (m.push(hr({
		start: g,
		end: e,
		loop: f,
		count: o,
		style: p
	})), g = null), n = e, y = _));
	return g !== null && m.push(hr({
		start: g,
		end: d,
		loop: f,
		count: o,
		style: p
	})), m;
}
function vr(e, t) {
	let n = [], r = e.segments;
	for (let i = 0; i < r.length; i++) {
		let a = _r(r[i], e.points, t);
		a.length && n.push(...a);
	}
	return n;
}
function yr(e, t, n, r) {
	let i = 0, a = t - 1;
	if (n && !r) for (; i < t && !e[i].skip;) i++;
	for (; i < t && e[i].skip;) i++;
	for (i %= t, n && (a += i); a > i && e[a % t].skip;) a--;
	return a %= t, {
		start: i,
		end: a
	};
}
function br(e, t, n, r) {
	let i = e.length, a = [], o = t, s = e[t], c;
	for (c = t + 1; c <= n; ++c) {
		let n = e[c % i];
		n.skip || n.stop ? s.skip || (r = !1, a.push({
			start: t % i,
			end: (c - 1) % i,
			loop: r
		}), t = o = n.stop ? c : null) : (o = c, s.skip && (t = c)), s = n;
	}
	return o !== null && a.push({
		start: t % i,
		end: o % i,
		loop: r
	}), a;
}
function xr(e, t) {
	let n = e.points, r = e.options.spanGaps, i = n.length;
	if (!i) return [];
	let a = !!e._loop, { start: o, end: s } = yr(n, i, a, r);
	return r === !0 ? Sr(e, [{
		start: o,
		end: s,
		loop: a
	}], n, t) : Sr(e, br(n, o, s < o ? s + i : s, !!e._fullLoop && o === 0 && s === i - 1), n, t);
}
function Sr(e, t, n, r) {
	return !r || !r.setContext || !n ? t : Cr(e, t, n, r);
}
function Cr(e, t, n, r) {
	let i = e._chart.getContext(), a = wr(e.options), { _datasetIndex: o, options: { spanGaps: s } } = e, c = n.length, l = [], u = a, d = t[0].start, f = d;
	function p(e, t, r, i) {
		let a = s ? -1 : 1;
		if (e !== t) {
			for (e += c; n[e % c].skip;) e -= a;
			for (; n[t % c].skip;) t += a;
			e % c !== t % c && (l.push({
				start: e % c,
				end: t % c,
				loop: r,
				style: i
			}), u = i, d = t % c);
		}
	}
	for (let e of t) {
		d = s ? d : e.start;
		let t = n[d % c], a;
		for (f = d + 1; f <= e.end; f++) {
			let s = n[f % c];
			a = wr(r.setContext(pn(i, {
				type: "segment",
				p0: t,
				p1: s,
				p0DataIndex: (f - 1) % c,
				p1DataIndex: f % c,
				datasetIndex: o
			}))), Tr(a, u) && p(d, f - 1, e.loop, u), t = s, u = a;
		}
		d < f - 1 && p(d, f - 1, e.loop, u);
	}
	return l;
}
function wr(e) {
	return {
		backgroundColor: e.backgroundColor,
		borderCapStyle: e.borderCapStyle,
		borderDash: e.borderDash,
		borderDashOffset: e.borderDashOffset,
		borderJoinStyle: e.borderJoinStyle,
		borderWidth: e.borderWidth,
		borderColor: e.borderColor
	};
}
function Tr(e, t) {
	if (!t) return !1;
	let n = [], r = function(e, t) {
		return Ct(t) ? (n.includes(t) || n.push(t), n.indexOf(t)) : t;
	};
	return JSON.stringify(e, r) !== JSON.stringify(t, r);
}
var Er = /* #__PURE__ */ new class {
	constructor() {
		this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
	}
	_notify(e, t, n, r) {
		let i = t.listeners[r], a = t.duration;
		i.forEach((r) => r({
			chart: e,
			initial: t.initial,
			numSteps: a,
			currentStep: Math.min(n - t.start, a)
		}));
	}
	_refresh() {
		this._request ||= (this._running = !0, mt.call(window, () => {
			this._update(), this._request = null, this._running && this._refresh();
		}));
	}
	_update(e = Date.now()) {
		let t = 0;
		this._charts.forEach((n, r) => {
			if (!n.running || !n.items.length) return;
			let i = n.items, a = i.length - 1, o = !1, s;
			for (; a >= 0; --a) s = i[a], s._active ? (s._total > n.duration && (n.duration = s._total), s.tick(e), o = !0) : (i[a] = i[i.length - 1], i.pop());
			o && (r.draw(), this._notify(r, n, e, "progress")), i.length || (n.running = !1, this._notify(r, n, e, "complete"), n.initial = !1), t += i.length;
		}), this._lastDate = e, t === 0 && (this._running = !1);
	}
	_getAnims(e) {
		let t = this._charts, n = t.get(e);
		return n || (n = {
			running: !1,
			initial: !0,
			items: [],
			listeners: {
				complete: [],
				progress: []
			}
		}, t.set(e, n)), n;
	}
	listen(e, t, n) {
		this._getAnims(e).listeners[t].push(n);
	}
	add(e, t) {
		t && t.length && this._getAnims(e).items.push(...t);
	}
	has(e) {
		return this._getAnims(e).items.length > 0;
	}
	start(e) {
		let t = this._charts.get(e);
		t && (t.running = !0, t.start = Date.now(), t.duration = t.items.reduce((e, t) => Math.max(e, t._duration), 0), this._refresh());
	}
	running(e) {
		if (!this._running) return !1;
		let t = this._charts.get(e);
		return !(!t || !t.running || !t.items.length);
	}
	stop(e) {
		let t = this._charts.get(e);
		if (!t || !t.items.length) return;
		let n = t.items, r = n.length - 1;
		for (; r >= 0; --r) n[r].cancel();
		t.items = [], this._notify(e, t, Date.now(), "complete");
	}
	remove(e) {
		return this._charts.delete(e);
	}
}(), Dr = "transparent", Or = {
	boolean(e, t, n) {
		return n > .5 ? t : e;
	},
	color(e, t, n) {
		let r = wt(e || Dr), i = r.valid && wt(t || Dr);
		return i && i.valid ? i.mix(r, n).hexString() : t;
	},
	number(e, t, n) {
		return e + (t - e) * n;
	}
}, kr = class {
	constructor(e, t, n, r) {
		let i = t[n];
		r = dn([
			e.to,
			r,
			i,
			e.from
		]);
		let a = dn([
			e.from,
			i,
			r
		]);
		this._active = !0, this._fn = e.fn || Or[e.type || typeof a], this._easing = St[e.easing] || St.linear, this._start = Math.floor(Date.now() + (e.delay || 0)), this._duration = this._total = Math.floor(e.duration), this._loop = !!e.loop, this._target = t, this._prop = n, this._from = a, this._to = r, this._promises = void 0;
	}
	active() {
		return this._active;
	}
	update(e, t, n) {
		if (this._active) {
			this._notify(!1);
			let r = this._target[this._prop], i = n - this._start, a = this._duration - i;
			this._start = n, this._duration = Math.floor(Math.max(a, e.duration)), this._total += i, this._loop = !!e.loop, this._to = dn([
				e.to,
				t,
				r,
				e.from
			]), this._from = dn([
				e.from,
				r,
				t
			]);
		}
	}
	cancel() {
		this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
	}
	tick(e) {
		let t = e - this._start, n = this._duration, r = this._prop, i = this._from, a = this._loop, o = this._to, s;
		this._active = i !== o && (a || t < n), this._active ? t < 0 ? this._target[r] = i : (s = t / n % 2, s = a && s > 1 ? 2 - s : s, s = this._easing(Math.min(1, Math.max(0, s))), this._target[r] = this._fn(i, o, s)) : (this._target[r] = o, this._notify(!0));
	}
	wait() {
		let e = this._promises ||= [];
		return new Promise((t, n) => {
			e.push({
				res: t,
				rej: n
			});
		});
	}
	_notify(e) {
		let t = e ? "res" : "rej", n = this._promises || [];
		for (let e = 0; e < n.length; e++) n[e][t]();
	}
}, Ar = class {
	constructor(e, t) {
		this._chart = e, this._properties = /* @__PURE__ */ new Map(), this.configure(t);
	}
	configure(e) {
		if (!R(e)) return;
		let t = Object.keys(Y.animation), n = this._properties;
		Object.getOwnPropertyNames(e).forEach((r) => {
			let i = e[r];
			if (!R(i)) return;
			let a = {};
			for (let e of t) a[e] = i[e];
			(I(i.properties) && i.properties || [r]).forEach((e) => {
				e !== r && n.has(e) || n.set(e, a);
			});
		});
	}
	_animateOptions(e, t) {
		let n = t.options, r = Mr(e, n);
		if (!r) return [];
		let i = this._createAnimations(r, n);
		return n.$shared && jr(e.options.$animations, n).then(() => {
			e.options = n;
		}, () => {}), i;
	}
	_createAnimations(e, t) {
		let n = this._properties, r = [], i = e.$animations ||= {}, a = Object.keys(t), o = Date.now(), s;
		for (s = a.length - 1; s >= 0; --s) {
			let c = a[s];
			if (c.charAt(0) === "$") continue;
			if (c === "options") {
				r.push(...this._animateOptions(e, t));
				continue;
			}
			let l = t[c], u = i[c], d = n.get(c);
			if (u) {
				if (d && u.active()) {
					u.update(d, l, o);
					continue;
				}
				u.cancel();
			}
			!d || !d.duration ? e[c] = l : (i[c] = u = new kr(d, e, c, l), r.push(u));
		}
		return r;
	}
	update(e, t) {
		if (this._properties.size === 0) {
			Object.assign(e, t);
			return;
		}
		let n = this._createAnimations(e, t);
		if (n.length) return Er.add(this._chart, n), !0;
	}
};
function jr(e, t) {
	let n = [], r = Object.keys(t);
	for (let t = 0; t < r.length; t++) {
		let i = e[r[t]];
		i && i.active() && n.push(i.wait());
	}
	return Promise.all(n);
}
function Mr(e, t) {
	if (!t) return;
	let n = e.options;
	if (!n) e.options = t;
	else return n.$shared && (e.options = n = Object.assign({}, n, {
		$shared: !1,
		$animations: {}
	})), n;
}
function Nr(e, t) {
	let n = e && e.options || {}, r = n.reverse, i = n.min === void 0 ? t : 0, a = n.max === void 0 ? t : 0;
	return {
		start: r ? a : i,
		end: r ? i : a
	};
}
function Pr(e, t, n) {
	if (n === !1) return !1;
	let r = Nr(e, n), i = Nr(t, n);
	return {
		top: i.end,
		right: r.end,
		bottom: i.start,
		left: r.start
	};
}
function Fr(e) {
	let t, n, r, i;
	return R(e) ? (t = e.top, n = e.right, r = e.bottom, i = e.left) : t = n = r = i = e, {
		top: t,
		right: n,
		bottom: r,
		left: i,
		disabled: e === !1
	};
}
function Ir(e, t) {
	let n = [], r = e._getSortedDatasetMetas(t), i, a;
	for (i = 0, a = r.length; i < a; ++i) n.push(r[i].index);
	return n;
}
function Lr(e, t, n, r = {}) {
	let i = e.keys, a = r.mode === "single", o, s, c, l;
	if (t === null) return;
	let u = !1;
	for (o = 0, s = i.length; o < s; ++o) {
		if (c = +i[o], c === n) {
			if (u = !0, r.all) continue;
			break;
		}
		l = e.values[c], z(l) && (a || t === 0 || Ue(t) === Ue(l)) && (t += l);
	}
	return !u && !r.all ? 0 : t;
}
function Rr(e, t) {
	let { iScale: n, vScale: r } = t, i = n.axis === "x" ? "x" : "y", a = r.axis === "x" ? "x" : "y", o = Object.keys(e), s = Array(o.length), c, l, u;
	for (c = 0, l = o.length; c < l; ++c) u = o[c], s[c] = {
		[i]: u,
		[a]: e[u]
	};
	return s;
}
function zr(e, t) {
	let n = e && e.options.stacked;
	return n || n === void 0 && t.stack !== void 0;
}
function Br(e, t, n) {
	return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function Vr(e) {
	let { min: t, max: n, minDefined: r, maxDefined: i } = e.getUserBounds();
	return {
		min: r ? t : -Infinity,
		max: i ? n : Infinity
	};
}
function Hr(e, t, n) {
	let r = e[t] || (e[t] = {});
	return r[n] || (r[n] = {});
}
function Ur(e, t, n, r) {
	for (let i of t.getMatchingVisibleMetas(r).reverse()) {
		let t = e[i.index];
		if (n && t > 0 || !n && t < 0) return i.index;
	}
	return null;
}
function Wr(e, t) {
	let { chart: n, _cachedMeta: r } = e, i = n._stacks ||= {}, { iScale: a, vScale: o, index: s } = r, c = a.axis, l = o.axis, u = Br(a, o, r), d = t.length, f;
	for (let e = 0; e < d; ++e) {
		let n = t[e], { [c]: a, [l]: d } = n, p = n._stacks ||= {};
		f = p[l] = Hr(i, u, a), f[s] = d, f._top = Ur(f, o, !0, r.type), f._bottom = Ur(f, o, !1, r.type);
		let m = f._visualValues || (f._visualValues = {});
		m[s] = d;
	}
}
function Gr(e, t) {
	let n = e.scales;
	return Object.keys(n).filter((e) => n[e].axis === t).shift();
}
function Kr(e, t) {
	return pn(e, {
		active: !1,
		dataset: void 0,
		datasetIndex: t,
		index: t,
		mode: "default",
		type: "dataset"
	});
}
function qr(e, t, n) {
	return pn(e, {
		active: !1,
		dataIndex: t,
		parsed: void 0,
		raw: void 0,
		element: n,
		index: t,
		mode: "default",
		type: "data"
	});
}
function Jr(e, t) {
	let n = e.controller.index, r = e.vScale && e.vScale.axis;
	if (r) {
		t ||= e._parsed;
		for (let e of t) {
			let t = e._stacks;
			if (!t || t[r] === void 0 || t[r][n] === void 0) return;
			delete t[r][n], t[r]._visualValues !== void 0 && t[r]._visualValues[n] !== void 0 && delete t[r]._visualValues[n];
		}
	}
}
var Yr = (e) => e === "reset" || e === "none", Xr = (e, t) => t ? e : Object.assign({}, e), Zr = (e, t, n) => e && !t.hidden && t._stacked && {
	keys: Ir(n, !0),
	values: null
}, Qr = class {
	static defaults = {};
	static datasetElementType = null;
	static dataElementType = null;
	constructor(e, t) {
		this.chart = e, this._ctx = e.ctx, this.index = t, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
	}
	initialize() {
		let e = this._cachedMeta;
		this.configure(), this.linkScales(), e._stacked = zr(e.vScale, e), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
	}
	updateIndex(e) {
		this.index !== e && Jr(this._cachedMeta), this.index = e;
	}
	linkScales() {
		let e = this.chart, t = this._cachedMeta, n = this.getDataset(), r = (e, t, n, r) => e === "x" ? t : e === "r" ? r : n, i = t.xAxisID = B(n.xAxisID, Gr(e, "x")), a = t.yAxisID = B(n.yAxisID, Gr(e, "y")), o = t.rAxisID = B(n.rAxisID, Gr(e, "r")), s = t.indexAxis, c = t.iAxisID = r(s, i, a, o), l = t.vAxisID = r(s, a, i, o);
		t.xScale = this.getScaleForId(i), t.yScale = this.getScaleForId(a), t.rScale = this.getScaleForId(o), t.iScale = this.getScaleForId(c), t.vScale = this.getScaleForId(l);
	}
	getDataset() {
		return this.chart.data.datasets[this.index];
	}
	getMeta() {
		return this.chart.getDatasetMeta(this.index);
	}
	getScaleForId(e) {
		return this.chart.scales[e];
	}
	_getOtherScale(e) {
		let t = this._cachedMeta;
		return e === t.iScale ? t.vScale : t.iScale;
	}
	reset() {
		this._update("reset");
	}
	_destroy() {
		let e = this._cachedMeta;
		this._data && ft(this._data, this), e._stacked && Jr(e);
	}
	_dataCheck() {
		let e = this.getDataset(), t = e.data ||= [], n = this._data;
		if (R(t)) {
			let e = this._cachedMeta;
			this._data = Rr(t, e);
		} else if (n !== t) {
			if (n) {
				ft(n, this);
				let e = this._cachedMeta;
				Jr(e), e._parsed = [];
			}
			t && Object.isExtensible(t) && dt(t, this), this._syncList = [], this._data = t;
		}
	}
	addElements() {
		let e = this._cachedMeta;
		this._dataCheck(), this.datasetElementType && (e.dataset = new this.datasetElementType());
	}
	buildOrUpdateElements(e) {
		let t = this._cachedMeta, n = this.getDataset(), r = !1;
		this._dataCheck();
		let i = t._stacked;
		t._stacked = zr(t.vScale, t), t.stack !== n.stack && (r = !0, Jr(t), t.stack = n.stack), this._resyncElements(e), (r || i !== t._stacked) && (Wr(this, t._parsed), t._stacked = zr(t.vScale, t));
	}
	configure() {
		let e = this.chart.config, t = e.datasetScopeKeys(this._type), n = e.getOptionScopes(this.getDataset(), t, !0);
		this.options = e.createResolver(n, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
	}
	parse(e, t) {
		let { _cachedMeta: n, _data: r } = this, { iScale: i, _stacked: a } = n, o = i.axis, s = e === 0 && t === r.length || n._sorted, c = e > 0 && n._parsed[e - 1], l, u, d;
		if (this._parsing === !1) n._parsed = r, n._sorted = !0, d = r;
		else {
			d = I(r[e]) ? this.parseArrayData(n, r, e, t) : R(r[e]) ? this.parseObjectData(n, r, e, t) : this.parsePrimitiveData(n, r, e, t);
			let i = () => u[o] === null || c && u[o] < c[o];
			for (l = 0; l < t; ++l) n._parsed[l + e] = u = d[l], s && (i() && (s = !1), c = u);
			n._sorted = s;
		}
		a && Wr(this, d);
	}
	parsePrimitiveData(e, t, n, r) {
		let { iScale: i, vScale: a } = e, o = i.axis, s = a.axis, c = i.getLabels(), l = i === a, u = Array(r), d, f, p;
		for (d = 0, f = r; d < f; ++d) p = d + n, u[d] = {
			[o]: l || i.parse(c[p], p),
			[s]: a.parse(t[p], p)
		};
		return u;
	}
	parseArrayData(e, t, n, r) {
		let { xScale: i, yScale: a } = e, o = Array(r), s, c, l, u;
		for (s = 0, c = r; s < c; ++s) l = s + n, u = t[l], o[s] = {
			x: i.parse(u[0], l),
			y: a.parse(u[1], l)
		};
		return o;
	}
	parseObjectData(e, t, n, r) {
		let { xScale: i, yScale: a } = e, { xAxisKey: o = "x", yAxisKey: s = "y" } = this._parsing, c = Array(r), l, u, d, f;
		for (l = 0, u = r; l < u; ++l) d = l + n, f = t[d], c[l] = {
			x: i.parse(Ae(f, o), d),
			y: a.parse(Ae(f, s), d)
		};
		return c;
	}
	getParsed(e) {
		return this._cachedMeta._parsed[e];
	}
	getDataElement(e) {
		return this._cachedMeta.data[e];
	}
	applyStack(e, t, n) {
		let r = this.chart, i = this._cachedMeta, a = t[e.axis];
		return Lr({
			keys: Ir(r, !0),
			values: t._stacks[e.axis]._visualValues
		}, a, i.index, { mode: n });
	}
	updateRangeFromParsed(e, t, n, r) {
		let i = n[t.axis], a = i === null ? NaN : i, o = r && n._stacks[t.axis];
		r && o && (r.values = o, a = Lr(r, i, this._cachedMeta.index)), e.min = Math.min(e.min, a), e.max = Math.max(e.max, a);
	}
	getMinMax(e, t) {
		let n = this._cachedMeta, r = n._parsed, i = n._sorted && e === n.iScale, a = r.length, o = this._getOtherScale(e), s = Zr(t, n, this.chart), c = {
			min: Infinity,
			max: -Infinity
		}, { min: l, max: u } = Vr(o), d, f;
		function p() {
			f = r[d];
			let t = f[o.axis];
			return !z(f[e.axis]) || l > t || u < t;
		}
		for (d = 0; d < a && !(!p() && (this.updateRangeFromParsed(c, e, f, s), i)); ++d);
		if (i) {
			for (d = a - 1; d >= 0; --d) if (!p()) {
				this.updateRangeFromParsed(c, e, f, s);
				break;
			}
		}
		return c;
	}
	getAllParsedValues(e) {
		let t = this._cachedMeta._parsed, n = [], r, i, a;
		for (r = 0, i = t.length; r < i; ++r) a = t[r][e.axis], z(a) && n.push(a);
		return n;
	}
	getMaxOverflow() {
		return !1;
	}
	getLabelAndValue(e) {
		let t = this._cachedMeta, n = t.iScale, r = t.vScale, i = this.getParsed(e);
		return {
			label: n ? "" + n.getLabelForValue(i[n.axis]) : "",
			value: r ? "" + r.getLabelForValue(i[r.axis]) : ""
		};
	}
	_update(e) {
		let t = this._cachedMeta;
		this.update(e || "default"), t._clip = Fr(B(this.options.clip, Pr(t.xScale, t.yScale, this.getMaxOverflow())));
	}
	update(e) {}
	draw() {
		let e = this._ctx, t = this.chart, n = this._cachedMeta, r = n.data || [], i = t.chartArea, a = [], o = this._drawStart || 0, s = this._drawCount || r.length - o, c = this.options.drawActiveElementsOnTop, l;
		for (n.dataset && n.dataset.draw(e, i, o, s), l = o; l < o + s; ++l) {
			let t = r[l];
			t.hidden || (t.active && c ? a.push(t) : t.draw(e, i));
		}
		for (l = 0; l < a.length; ++l) a[l].draw(e, i);
	}
	getStyle(e, t) {
		let n = t ? "active" : "default";
		return e === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(n) : this.resolveDataElementOptions(e || 0, n);
	}
	getContext(e, t, n) {
		let r = this.getDataset(), i;
		if (e >= 0 && e < this._cachedMeta.data.length) {
			let t = this._cachedMeta.data[e];
			i = t.$context ||= qr(this.getContext(), e, t), i.parsed = this.getParsed(e), i.raw = r.data[e], i.index = i.dataIndex = e;
		} else i = this.$context ||= Kr(this.chart.getContext(), this.index), i.dataset = r, i.index = i.datasetIndex = this.index;
		return i.active = !!t, i.mode = n, i;
	}
	resolveDatasetElementOptions(e) {
		return this._resolveElementOptions(this.datasetElementType.id, e);
	}
	resolveDataElementOptions(e, t) {
		return this._resolveElementOptions(this.dataElementType.id, t, e);
	}
	_resolveElementOptions(e, t = "default", n) {
		let r = t === "active", i = this._cachedDataOpts, a = e + "-" + t, o = i[a], s = this.enableOptionSharing && Me(n);
		if (o) return Xr(o, s);
		let c = this.chart.config, l = c.datasetElementScopeKeys(this._type, e), u = r ? [
			`${e}Hover`,
			"hover",
			e,
			""
		] : [e, ""], d = c.getOptionScopes(this.getDataset(), l), f = Object.keys(Y.elements[e]), p = c.resolveNamedOptions(d, f, () => this.getContext(n, r, t), u);
		return p.$shared && (p.$shared = s, i[a] = Object.freeze(Xr(p, s))), p;
	}
	_resolveAnimations(e, t, n) {
		let r = this.chart, i = this._cachedDataOpts, a = `animation-${t}`, o = i[a];
		if (o) return o;
		let s;
		if (r.options.animation !== !1) {
			let r = this.chart.config, i = r.datasetAnimationScopeKeys(this._type, t), a = r.getOptionScopes(this.getDataset(), i);
			s = r.createResolver(a, this.getContext(e, n, t));
		}
		let c = new Ar(r, s && s.animations);
		return s && s._cacheable && (i[a] = Object.freeze(c)), c;
	}
	getSharedOptions(e) {
		if (e.$shared) return this._sharedOptions ||= Object.assign({}, e);
	}
	includeOptions(e, t) {
		return !t || Yr(e) || this.chart._animationsDisabled;
	}
	_getSharedOptions(e, t) {
		let n = this.resolveDataElementOptions(e, t), r = this._sharedOptions, i = this.getSharedOptions(n), a = this.includeOptions(t, i) || i !== r;
		return this.updateSharedOptions(i, t, n), {
			sharedOptions: i,
			includeOptions: a
		};
	}
	updateElement(e, t, n, r) {
		Yr(r) ? Object.assign(e, n) : this._resolveAnimations(t, r).update(e, n);
	}
	updateSharedOptions(e, t, n) {
		e && !Yr(t) && this._resolveAnimations(void 0, t).update(e, n);
	}
	_setStyle(e, t, n, r) {
		e.active = r;
		let i = this.getStyle(t, r);
		this._resolveAnimations(t, n, r).update(e, { options: !r && this.getSharedOptions(i) || i });
	}
	removeHoverStyle(e, t, n) {
		this._setStyle(e, n, "active", !1);
	}
	setHoverStyle(e, t, n) {
		this._setStyle(e, n, "active", !0);
	}
	_removeDatasetHoverStyle() {
		let e = this._cachedMeta.dataset;
		e && this._setStyle(e, void 0, "active", !1);
	}
	_setDatasetHoverStyle() {
		let e = this._cachedMeta.dataset;
		e && this._setStyle(e, void 0, "active", !0);
	}
	_resyncElements(e) {
		let t = this._data, n = this._cachedMeta.data;
		for (let [e, t, n] of this._syncList) this[e](t, n);
		this._syncList = [];
		let r = n.length, i = t.length, a = Math.min(i, r);
		a && this.parse(0, a), i > r ? this._insertElements(r, i - r, e) : i < r && this._removeElements(i, r - i);
	}
	_insertElements(e, t, n = !0) {
		let r = this._cachedMeta, i = r.data, a = e + t, o, s = (e) => {
			for (e.length += t, o = e.length - 1; o >= a; o--) e[o] = e[o - t];
		};
		for (s(i), o = e; o < a; ++o) i[o] = new this.dataElementType();
		this._parsing && s(r._parsed), this.parse(e, t), n && this.updateElements(i, e, t, "reset");
	}
	updateElements(e, t, n, r) {}
	_removeElements(e, t) {
		let n = this._cachedMeta;
		if (this._parsing) {
			let r = n._parsed.splice(e, t);
			n._stacked && Jr(n, r);
		}
		n.data.splice(e, t);
	}
	_sync(e) {
		if (this._parsing) this._syncList.push(e);
		else {
			let [t, n, r] = e;
			this[t](n, r);
		}
		this.chart._dataChanges.push([this.index, ...e]);
	}
	_onDataPush() {
		let e = arguments.length;
		this._sync([
			"_insertElements",
			this.getDataset().data.length - e,
			e
		]);
	}
	_onDataPop() {
		this._sync([
			"_removeElements",
			this._cachedMeta.data.length - 1,
			1
		]);
	}
	_onDataShift() {
		this._sync([
			"_removeElements",
			0,
			1
		]);
	}
	_onDataSplice(e, t) {
		t && this._sync([
			"_removeElements",
			e,
			t
		]);
		let n = arguments.length - 2;
		n && this._sync([
			"_insertElements",
			e,
			n
		]);
	}
	_onDataUnshift() {
		this._sync([
			"_insertElements",
			0,
			arguments.length
		]);
	}
};
function $r(e, t) {
	if (!e._cache.$bar) {
		let n = e.getMatchingVisibleMetas(t), r = [];
		for (let t = 0, i = n.length; t < i; t++) r = r.concat(n[t].controller.getAllParsedValues(e));
		e._cache.$bar = pt(r.sort((e, t) => e - t));
	}
	return e._cache.$bar;
}
function ei(e) {
	let t = e.iScale, n = $r(t, e.type), r = t._length, i, a, o, s, c = () => {
		o !== 32767 && o !== -32768 && (Me(s) && (r = Math.min(r, Math.abs(o - s) || r)), s = o);
	};
	for (i = 0, a = n.length; i < a; ++i) o = t.getPixelForValue(n[i]), c();
	for (s = void 0, i = 0, a = t.ticks.length; i < a; ++i) o = t.getPixelForTick(i), c();
	return r;
}
function ti(e, t, n, r) {
	let i = n.barThickness, a, o;
	return F(i) ? (a = t.min * n.categoryPercentage, o = n.barPercentage) : (a = i * r, o = 1), {
		chunk: a / r,
		ratio: o,
		start: t.pixels[e] - a / 2
	};
}
function ni(e, t, n, r) {
	let i = t.pixels, a = i[e], o = e > 0 ? i[e - 1] : null, s = e < i.length - 1 ? i[e + 1] : null, c = n.categoryPercentage;
	o === null && (o = a - (s === null ? t.end - t.start : s - a)), s === null && (s = a + a - o);
	let l = a - (a - Math.min(o, s)) / 2 * c;
	return {
		chunk: Math.abs(s - o) / 2 * c / r,
		ratio: n.barPercentage,
		start: l
	};
}
function ri(e, t, n, r) {
	let i = n.parse(e[0], r), a = n.parse(e[1], r), o = Math.min(i, a), s = Math.max(i, a), c = o, l = s;
	Math.abs(o) > Math.abs(s) && (c = s, l = o), t[n.axis] = l, t._custom = {
		barStart: c,
		barEnd: l,
		start: i,
		end: a,
		min: o,
		max: s
	};
}
function ii(e, t, n, r) {
	return I(e) ? ri(e, t, n, r) : t[n.axis] = n.parse(e, r), t;
}
function ai(e, t, n, r) {
	let i = e.iScale, a = e.vScale, o = i.getLabels(), s = i === a, c = [], l, u, d, f;
	for (l = n, u = n + r; l < u; ++l) f = t[l], d = {}, d[i.axis] = s || i.parse(o[l], l), c.push(ii(f, d, a, l));
	return c;
}
function oi(e) {
	return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function si(e, t, n) {
	return e === 0 ? (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1) : Ue(e);
}
function ci(e) {
	let t, n, r, i, a;
	return e.horizontal ? (t = e.base > e.x, n = "left", r = "right") : (t = e.base < e.y, n = "bottom", r = "top"), t ? (i = "end", a = "start") : (i = "start", a = "end"), {
		start: n,
		end: r,
		reverse: t,
		top: i,
		bottom: a
	};
}
function li(e, t, n, r) {
	let i = t.borderSkipped, a = {};
	if (!i) {
		e.borderSkipped = a;
		return;
	}
	if (i === !0) {
		e.borderSkipped = {
			top: !0,
			right: !0,
			bottom: !0,
			left: !0
		};
		return;
	}
	let { start: o, end: s, reverse: c, top: l, bottom: u } = ci(e);
	i === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === r ? i = l : (n._bottom || 0) === r ? i = u : (a[ui(u, o, s, c)] = !0, i = l)), a[ui(i, o, s, c)] = !0, e.borderSkipped = a;
}
function ui(e, t, n, r) {
	return r ? (e = di(e, t, n), e = fi(e, n, t)) : e = fi(e, t, n), e;
}
function di(e, t, n) {
	return e === t ? n : e === n ? t : e;
}
function fi(e, t, n) {
	return e === "start" ? t : e === "end" ? n : e;
}
function pi(e, { inflateAmount: t }, n) {
	e.inflateAmount = t === "auto" ? n === 1 ? .33 : 0 : t;
}
var mi = class extends Qr {
	static id = "bar";
	static defaults = {
		datasetElementType: !1,
		dataElementType: "bar",
		categoryPercentage: .8,
		barPercentage: .9,
		grouped: !0,
		animations: { numbers: {
			type: "number",
			properties: [
				"x",
				"y",
				"base",
				"width",
				"height"
			]
		} }
	};
	static overrides = { scales: {
		_index_: {
			type: "category",
			offset: !0,
			grid: { offset: !0 }
		},
		_value_: {
			type: "linear",
			beginAtZero: !0
		}
	} };
	parsePrimitiveData(e, t, n, r) {
		return ai(e, t, n, r);
	}
	parseArrayData(e, t, n, r) {
		return ai(e, t, n, r);
	}
	parseObjectData(e, t, n, r) {
		let { iScale: i, vScale: a } = e, { xAxisKey: o = "x", yAxisKey: s = "y" } = this._parsing, c = i.axis === "x" ? o : s, l = a.axis === "x" ? o : s, u = [], d, f, p, m;
		for (d = n, f = n + r; d < f; ++d) m = t[d], p = {}, p[i.axis] = i.parse(Ae(m, c), d), u.push(ii(Ae(m, l), p, a, d));
		return u;
	}
	updateRangeFromParsed(e, t, n, r) {
		super.updateRangeFromParsed(e, t, n, r);
		let i = n._custom;
		i && t === this._cachedMeta.vScale && (e.min = Math.min(e.min, i.min), e.max = Math.max(e.max, i.max));
	}
	getMaxOverflow() {
		return 0;
	}
	getLabelAndValue(e) {
		let { iScale: t, vScale: n } = this._cachedMeta, r = this.getParsed(e), i = r._custom, a = oi(i) ? "[" + i.start + ", " + i.end + "]" : "" + n.getLabelForValue(r[n.axis]);
		return {
			label: "" + t.getLabelForValue(r[t.axis]),
			value: a
		};
	}
	initialize() {
		this.enableOptionSharing = !0, super.initialize();
		let e = this._cachedMeta;
		e.stack = this.getDataset().stack;
	}
	update(e) {
		let t = this._cachedMeta;
		this.updateElements(t.data, 0, t.data.length, e);
	}
	updateElements(e, t, n, r) {
		let i = r === "reset", { index: a, _cachedMeta: { vScale: o } } = this, s = o.getBasePixel(), c = o.isHorizontal(), l = this._getRuler(), { sharedOptions: u, includeOptions: d } = this._getSharedOptions(t, r);
		for (let f = t; f < t + n; f++) {
			let t = this.getParsed(f), n = i || F(t[o.axis]) ? {
				base: s,
				head: s
			} : this._calculateBarValuePixels(f), p = this._calculateBarIndexPixels(f, l), m = (t._stacks || {})[o.axis], h = {
				horizontal: c,
				base: n.base,
				enableBorderRadius: !m || oi(t._custom) || a === m._top || a === m._bottom,
				x: c ? n.head : p.center,
				y: c ? p.center : n.head,
				height: c ? p.size : Math.abs(n.size),
				width: c ? Math.abs(n.size) : p.size
			};
			d && (h.options = u || this.resolveDataElementOptions(f, e[f].active ? "active" : r));
			let g = h.options || e[f].options;
			li(h, g, m, a), pi(h, g, l.ratio), this.updateElement(e[f], f, h, r);
		}
	}
	_getStacks(e, t) {
		let { iScale: n } = this._cachedMeta, r = n.getMatchingVisibleMetas(this._type).filter((e) => e.controller.options.grouped), i = n.options.stacked, a = [], o = this._cachedMeta.controller.getParsed(t), s = o && o[n.axis], c = (e) => {
			let t = e._parsed.find((e) => e[n.axis] === s), r = t && t[e.vScale.axis];
			if (F(r) || isNaN(r)) return !0;
		};
		for (let n of r) if (!(t !== void 0 && c(n)) && ((i === !1 || a.indexOf(n.stack) === -1 || i === void 0 && n.stack === void 0) && a.push(n.stack), n.index === e)) break;
		return a.length || a.push(void 0), a;
	}
	_getStackCount(e) {
		return this._getStacks(void 0, e).length;
	}
	_getStackIndex(e, t, n) {
		let r = this._getStacks(e, n), i = t === void 0 ? -1 : r.indexOf(t);
		return i === -1 ? r.length - 1 : i;
	}
	_getRuler() {
		let e = this.options, t = this._cachedMeta, n = t.iScale, r = [], i, a;
		for (i = 0, a = t.data.length; i < a; ++i) r.push(n.getPixelForValue(this.getParsed(i)[n.axis], i));
		let o = e.barThickness;
		return {
			min: o || ei(t),
			pixels: r,
			start: n._startPixel,
			end: n._endPixel,
			stackCount: this._getStackCount(),
			scale: n,
			grouped: e.grouped,
			ratio: o ? 1 : e.categoryPercentage * e.barPercentage
		};
	}
	_calculateBarValuePixels(e) {
		let { _cachedMeta: { vScale: t, _stacked: n, index: r }, options: { base: i, minBarLength: a } } = this, o = i || 0, s = this.getParsed(e), c = s._custom, l = oi(c), u = s[t.axis], d = 0, f = n ? this.applyStack(t, s, n) : u, p, m;
		f !== u && (d = f - u, f = u), l && (u = c.barStart, f = c.barEnd - c.barStart, u !== 0 && Ue(u) !== Ue(c.barEnd) && (d = 0), d += u);
		let h = !F(i) && !l ? i : d, g = t.getPixelForValue(h);
		if (p = this.chart.getDataVisibility(e) ? t.getPixelForValue(d + f) : g, m = p - g, Math.abs(m) < a) {
			m = si(m, t, o) * a, u === o && (g -= m / 2);
			let e = t.getPixelForDecimal(0), i = t.getPixelForDecimal(1);
			g = Math.max(Math.min(g, Math.max(e, i)), Math.min(e, i)), p = g + m, n && !l && (s._stacks[t.axis]._visualValues[r] = t.getValueForPixel(p) - t.getValueForPixel(g));
		}
		if (g === t.getPixelForValue(o)) {
			let e = Ue(m) * t.getLineWidthForValue(o) / 2;
			g += e, m -= e;
		}
		return {
			size: m,
			base: g,
			head: p,
			center: p + m / 2
		};
	}
	_calculateBarIndexPixels(e, t) {
		let n = t.scale, r = this.options, i = r.skipNull, a = B(r.maxBarThickness, Infinity), o, s;
		if (t.grouped) {
			let n = i ? this._getStackCount(e) : t.stackCount, c = r.barThickness === "flex" ? ni(e, t, r, n) : ti(e, t, r, n), l = this._getStackIndex(this.index, this._cachedMeta.stack, i ? e : void 0);
			o = c.start + c.chunk * l + c.chunk / 2, s = Math.min(a, c.chunk * c.ratio);
		} else o = n.getPixelForValue(this.getParsed(e)[n.axis], e), s = Math.min(a, t.min * t.ratio);
		return {
			base: o - s / 2,
			head: o + s / 2,
			center: o,
			size: s
		};
	}
	draw() {
		let e = this._cachedMeta, t = e.vScale, n = e.data, r = n.length, i = 0;
		for (; i < r; ++i) this.getParsed(i)[t.axis] !== null && !n[i].hidden && n[i].draw(this._ctx);
	}
}, hi = class extends Qr {
	static id = "bubble";
	static defaults = {
		datasetElementType: !1,
		dataElementType: "point",
		animations: { numbers: {
			type: "number",
			properties: [
				"x",
				"y",
				"borderWidth",
				"radius"
			]
		} }
	};
	static overrides = { scales: {
		x: { type: "linear" },
		y: { type: "linear" }
	} };
	initialize() {
		this.enableOptionSharing = !0, super.initialize();
	}
	parsePrimitiveData(e, t, n, r) {
		let i = super.parsePrimitiveData(e, t, n, r);
		for (let e = 0; e < i.length; e++) i[e]._custom = this.resolveDataElementOptions(e + n).radius;
		return i;
	}
	parseArrayData(e, t, n, r) {
		let i = super.parseArrayData(e, t, n, r);
		for (let e = 0; e < i.length; e++) {
			let r = t[n + e];
			i[e]._custom = B(r[2], this.resolveDataElementOptions(e + n).radius);
		}
		return i;
	}
	parseObjectData(e, t, n, r) {
		let i = super.parseObjectData(e, t, n, r);
		for (let e = 0; e < i.length; e++) {
			let r = t[n + e];
			i[e]._custom = B(r && r.r && +r.r, this.resolveDataElementOptions(e + n).radius);
		}
		return i;
	}
	getMaxOverflow() {
		let e = this._cachedMeta.data, t = 0;
		for (let n = e.length - 1; n >= 0; --n) t = Math.max(t, e[n].size(this.resolveDataElementOptions(n)) / 2);
		return t > 0 && t;
	}
	getLabelAndValue(e) {
		let t = this._cachedMeta, n = this.chart.data.labels || [], { xScale: r, yScale: i } = t, a = this.getParsed(e), o = r.getLabelForValue(a.x), s = i.getLabelForValue(a.y), c = a._custom;
		return {
			label: n[e] || "",
			value: "(" + o + ", " + s + (c ? ", " + c : "") + ")"
		};
	}
	update(e) {
		let t = this._cachedMeta.data;
		this.updateElements(t, 0, t.length, e);
	}
	updateElements(e, t, n, r) {
		let i = r === "reset", { iScale: a, vScale: o } = this._cachedMeta, { sharedOptions: s, includeOptions: c } = this._getSharedOptions(t, r), l = a.axis, u = o.axis;
		for (let d = t; d < t + n; d++) {
			let t = e[d], n = !i && this.getParsed(d), f = {}, p = f[l] = i ? a.getPixelForDecimal(.5) : a.getPixelForValue(n[l]), m = f[u] = i ? o.getBasePixel() : o.getPixelForValue(n[u]);
			f.skip = isNaN(p) || isNaN(m), c && (f.options = s || this.resolveDataElementOptions(d, t.active ? "active" : r), i && (f.options.radius = 0)), this.updateElement(t, d, f, r);
		}
	}
	resolveDataElementOptions(e, t) {
		let n = this.getParsed(e), r = super.resolveDataElementOptions(e, t);
		r.$shared && (r = Object.assign({}, r, { $shared: !1 }));
		let i = r.radius;
		return t !== "active" && (r.radius = 0), r.radius += B(n && n._custom, i), r;
	}
};
function gi(e, t, n) {
	let r = 1, i = 1, a = 0, o = 0;
	if (t < W) {
		let s = e, c = s + t, l = Math.cos(s), u = Math.sin(s), d = Math.cos(c), f = Math.sin(c), p = (e, t, r) => nt(e, s, c, !0) ? 1 : Math.max(t, t * n, r, r * n), m = (e, t, r) => nt(e, s, c, !0) ? -1 : Math.min(t, t * n, r, r * n), h = p(0, l, d), g = p(ze, u, f), _ = m(U, l, d), v = m(U + ze, u, f);
		r = (h - _) / 2, i = (g - v) / 2, a = -(h + _) / 2, o = -(g + v) / 2;
	}
	return {
		ratioX: r,
		ratioY: i,
		offsetX: a,
		offsetY: o
	};
}
var _i = class extends Qr {
	static id = "doughnut";
	static defaults = {
		datasetElementType: !1,
		dataElementType: "arc",
		animation: {
			animateRotate: !0,
			animateScale: !1
		},
		animations: { numbers: {
			type: "number",
			properties: [
				"circumference",
				"endAngle",
				"innerRadius",
				"outerRadius",
				"startAngle",
				"x",
				"y",
				"offset",
				"borderWidth",
				"spacing"
			]
		} },
		cutout: "50%",
		rotation: 0,
		circumference: 360,
		radius: "100%",
		spacing: 0,
		indexAxis: "r"
	};
	static descriptors = {
		_scriptable: (e) => e !== "spacing",
		_indexable: (e) => e !== "spacing" && !e.startsWith("borderDash") && !e.startsWith("hoverBorderDash")
	};
	static overrides = {
		aspectRatio: 1,
		plugins: { legend: {
			labels: { generateLabels(e) {
				let t = e.data;
				if (t.labels.length && t.datasets.length) {
					let { labels: { pointStyle: n, color: r } } = e.legend.options;
					return t.labels.map((t, i) => {
						let a = e.getDatasetMeta(0).controller.getStyle(i);
						return {
							text: t,
							fillStyle: a.backgroundColor,
							strokeStyle: a.borderColor,
							fontColor: r,
							lineWidth: a.borderWidth,
							pointStyle: n,
							hidden: !e.getDataVisibility(i),
							index: i
						};
					});
				}
				return [];
			} },
			onClick(e, t, n) {
				n.chart.toggleDataVisibility(t.index), n.chart.update();
			}
		} }
	};
	constructor(e, t) {
		super(e, t), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
	}
	linkScales() {}
	parse(e, t) {
		let n = this.getDataset().data, r = this._cachedMeta;
		if (this._parsing === !1) r._parsed = n;
		else {
			let i = (e) => +n[e];
			if (R(n[e])) {
				let { key: e = "value" } = this._parsing;
				i = (t) => +Ae(n[t], e);
			}
			let a, o;
			for (a = e, o = e + t; a < o; ++a) r._parsed[a] = i(a);
		}
	}
	_getRotation() {
		return Ye(this.options.rotation - 90);
	}
	_getCircumference() {
		return Ye(this.options.circumference);
	}
	_getRotationExtents() {
		let e = W, t = -W;
		for (let n = 0; n < this.chart.data.datasets.length; ++n) if (this.chart.isDatasetVisible(n) && this.chart.getDatasetMeta(n).type === this._type) {
			let r = this.chart.getDatasetMeta(n).controller, i = r._getRotation(), a = r._getCircumference();
			e = Math.min(e, i), t = Math.max(t, i + a);
		}
		return {
			rotation: e,
			circumference: t - e
		};
	}
	update(e) {
		let { chartArea: t } = this.chart, n = this._cachedMeta, r = n.data, i = this.getMaxBorderWidth() + this.getMaxOffset(r) + this.options.spacing, a = Math.max((Math.min(t.width, t.height) - i) / 2, 0), o = Math.min(ve(this.options.cutout, a), 1), s = this._getRingWeight(this.index), { circumference: c, rotation: l } = this._getRotationExtents(), { ratioX: u, ratioY: d, offsetX: f, offsetY: p } = gi(l, c, o), m = (t.width - i) / u, h = (t.height - i) / d, g = Math.max(Math.min(m, h) / 2, 0), _ = ye(this.options.radius, g), v = (_ - Math.max(_ * o, 0)) / this._getVisibleDatasetWeightTotal();
		this.offsetX = f * _, this.offsetY = p * _, n.total = this.calculateTotal(), this.outerRadius = _ - v * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - v * s, 0), this.updateElements(r, 0, r.length, e);
	}
	_circumference(e, t) {
		let n = this.options, r = this._cachedMeta, i = this._getCircumference();
		return t && n.animation.animateRotate || !this.chart.getDataVisibility(e) || r._parsed[e] === null || r.data[e].hidden ? 0 : this.calculateCircumference(r._parsed[e] * i / W);
	}
	updateElements(e, t, n, r) {
		let i = r === "reset", a = this.chart, o = a.chartArea, s = a.options.animation, c = (o.left + o.right) / 2, l = (o.top + o.bottom) / 2, u = i && s.animateScale, d = u ? 0 : this.innerRadius, f = u ? 0 : this.outerRadius, { sharedOptions: p, includeOptions: m } = this._getSharedOptions(t, r), h = this._getRotation(), g = 0;
		for (; g < t; ++g) h += this._circumference(g, i);
		for (g = t; g < t + n; ++g) {
			let t = this._circumference(g, i), n = e[g], a = {
				x: c + this.offsetX,
				y: l + this.offsetY,
				startAngle: h,
				endAngle: h + t,
				circumference: t,
				outerRadius: f,
				innerRadius: d
			};
			m && (a.options = p || this.resolveDataElementOptions(g, n.active ? "active" : r)), h += t, this.updateElement(n, g, a, r);
		}
	}
	calculateTotal() {
		let e = this._cachedMeta, t = e.data, n = 0, r = 0;
		for (; r < t.length; r++) {
			let i = e._parsed[r];
			i !== null && !isNaN(i) && this.chart.getDataVisibility(r) && !t[r].hidden && (n += Math.abs(i));
		}
		return n;
	}
	calculateCircumference(e) {
		let t = this._cachedMeta.total;
		return t > 0 && !isNaN(e) ? Math.abs(e) / t * W : 0;
	}
	getLabelAndValue(e) {
		let t = this._cachedMeta, n = this.chart, r = n.data.labels || [], i = Mt(t._parsed[e], n.options.locale);
		return {
			label: r[e] || "",
			value: i
		};
	}
	getMaxBorderWidth(e) {
		let t = 0, n = this.chart, r, i, a, o, s;
		if (!e) {
			for (r = 0, i = n.data.datasets.length; r < i; ++r) if (n.isDatasetVisible(r)) {
				a = n.getDatasetMeta(r), e = a.data, o = a.controller;
				break;
			}
		}
		if (!e) return 0;
		for (r = 0, i = e.length; r < i; ++r) s = o.resolveDataElementOptions(r), s.borderAlign !== "inner" && (t = Math.max(t, s.borderWidth || 0, s.hoverBorderWidth || 0));
		return t;
	}
	getMaxOffset(e) {
		let t = 0;
		for (let n = 0, r = e.length; n < r; ++n) {
			let e = this.resolveDataElementOptions(n);
			t = Math.max(t, e.offset || 0, e.hoverOffset || 0);
		}
		return t;
	}
	_getRingWeightOffset(e) {
		let t = 0;
		for (let n = 0; n < e; ++n) this.chart.isDatasetVisible(n) && (t += this._getRingWeight(n));
		return t;
	}
	_getRingWeight(e) {
		return Math.max(B(this.chart.data.datasets[e].weight, 1), 0);
	}
	_getVisibleDatasetWeightTotal() {
		return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
	}
}, vi = class extends Qr {
	static id = "line";
	static defaults = {
		datasetElementType: "line",
		dataElementType: "point",
		showLine: !0,
		spanGaps: !1
	};
	static overrides = { scales: {
		_index_: { type: "category" },
		_value_: { type: "linear" }
	} };
	initialize() {
		this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
	}
	update(e) {
		let t = this._cachedMeta, { dataset: n, data: r = [], _dataset: i } = t, a = this.chart._animationsDisabled, { start: o, count: s } = vt(t, r, a);
		this._drawStart = o, this._drawCount = s, yt(t) && (o = 0, s = r.length), n._chart = this.chart, n._datasetIndex = this.index, n._decimated = !!i._decimated, n.points = r;
		let c = this.resolveDatasetElementOptions(e);
		this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(n, void 0, {
			animated: !a,
			options: c
		}, e), this.updateElements(r, o, s, e);
	}
	updateElements(e, t, n, r) {
		let i = r === "reset", { iScale: a, vScale: o, _stacked: s, _dataset: c } = this._cachedMeta, { sharedOptions: l, includeOptions: u } = this._getSharedOptions(t, r), d = a.axis, f = o.axis, { spanGaps: p, segment: m } = this.options, h = Ke(p) ? p : Infinity, g = this.chart._animationsDisabled || i || r === "none", _ = t + n, v = e.length, y = t > 0 && this.getParsed(t - 1);
		for (let n = 0; n < v; ++n) {
			let p = e[n], v = g ? p : {};
			if (n < t || n >= _) {
				v.skip = !0;
				continue;
			}
			let b = this.getParsed(n), x = F(b[f]), S = v[d] = a.getPixelForValue(b[d], n), C = v[f] = i || x ? o.getBasePixel() : o.getPixelForValue(s ? this.applyStack(o, b, s) : b[f], n);
			v.skip = isNaN(S) || isNaN(C) || x, v.stop = n > 0 && Math.abs(b[d] - y[d]) > h, m && (v.parsed = b, v.raw = c.data[n]), u && (v.options = l || this.resolveDataElementOptions(n, p.active ? "active" : r)), g || this.updateElement(p, n, v, r), y = b;
		}
	}
	getMaxOverflow() {
		let e = this._cachedMeta, t = e.dataset, n = t.options && t.options.borderWidth || 0, r = e.data || [];
		if (!r.length) return n;
		let i = r[0].size(this.resolveDataElementOptions(0)), a = r[r.length - 1].size(this.resolveDataElementOptions(r.length - 1));
		return Math.max(n, i, a) / 2;
	}
	draw() {
		let e = this._cachedMeta;
		e.dataset.updateControlPoints(this.chart.chartArea, e.iScale.axis), super.draw();
	}
}, yi = class extends Qr {
	static id = "polarArea";
	static defaults = {
		dataElementType: "arc",
		animation: {
			animateRotate: !0,
			animateScale: !0
		},
		animations: { numbers: {
			type: "number",
			properties: [
				"x",
				"y",
				"startAngle",
				"endAngle",
				"innerRadius",
				"outerRadius"
			]
		} },
		indexAxis: "r",
		startAngle: 0
	};
	static overrides = {
		aspectRatio: 1,
		plugins: { legend: {
			labels: { generateLabels(e) {
				let t = e.data;
				if (t.labels.length && t.datasets.length) {
					let { labels: { pointStyle: n, color: r } } = e.legend.options;
					return t.labels.map((t, i) => {
						let a = e.getDatasetMeta(0).controller.getStyle(i);
						return {
							text: t,
							fillStyle: a.backgroundColor,
							strokeStyle: a.borderColor,
							fontColor: r,
							lineWidth: a.borderWidth,
							pointStyle: n,
							hidden: !e.getDataVisibility(i),
							index: i
						};
					});
				}
				return [];
			} },
			onClick(e, t, n) {
				n.chart.toggleDataVisibility(t.index), n.chart.update();
			}
		} },
		scales: { r: {
			type: "radialLinear",
			angleLines: { display: !1 },
			beginAtZero: !0,
			grid: { circular: !0 },
			pointLabels: { display: !1 },
			startAngle: 0
		} }
	};
	constructor(e, t) {
		super(e, t), this.innerRadius = void 0, this.outerRadius = void 0;
	}
	getLabelAndValue(e) {
		let t = this._cachedMeta, n = this.chart, r = n.data.labels || [], i = Mt(t._parsed[e].r, n.options.locale);
		return {
			label: r[e] || "",
			value: i
		};
	}
	parseObjectData(e, t, n, r) {
		return Nn.bind(this)(e, t, n, r);
	}
	update(e) {
		let t = this._cachedMeta.data;
		this._updateRadius(), this.updateElements(t, 0, t.length, e);
	}
	getMinMax() {
		let e = this._cachedMeta, t = {
			min: Infinity,
			max: -Infinity
		};
		return e.data.forEach((e, n) => {
			let r = this.getParsed(n).r;
			!isNaN(r) && this.chart.getDataVisibility(n) && (r < t.min && (t.min = r), r > t.max && (t.max = r));
		}), t;
	}
	_updateRadius() {
		let e = this.chart, t = e.chartArea, n = e.options, r = Math.min(t.right - t.left, t.bottom - t.top), i = Math.max(r / 2, 0), a = (i - Math.max(n.cutoutPercentage ? i / 100 * n.cutoutPercentage : 1, 0)) / e.getVisibleDatasetCount();
		this.outerRadius = i - a * this.index, this.innerRadius = this.outerRadius - a;
	}
	updateElements(e, t, n, r) {
		let i = r === "reset", a = this.chart, o = a.options.animation, s = this._cachedMeta.rScale, c = s.xCenter, l = s.yCenter, u = s.getIndexAngle(0) - .5 * U, d = u, f, p = 360 / this.countVisibleElements();
		for (f = 0; f < t; ++f) d += this._computeAngle(f, r, p);
		for (f = t; f < t + n; f++) {
			let t = e[f], n = d, m = d + this._computeAngle(f, r, p), h = a.getDataVisibility(f) ? s.getDistanceFromCenterForValue(this.getParsed(f).r) : 0;
			d = m, i && (o.animateScale && (h = 0), o.animateRotate && (n = m = u));
			let g = {
				x: c,
				y: l,
				innerRadius: 0,
				outerRadius: h,
				startAngle: n,
				endAngle: m,
				options: this.resolveDataElementOptions(f, t.active ? "active" : r)
			};
			this.updateElement(t, f, g, r);
		}
	}
	countVisibleElements() {
		let e = this._cachedMeta, t = 0;
		return e.data.forEach((e, n) => {
			!isNaN(this.getParsed(n).r) && this.chart.getDataVisibility(n) && t++;
		}), t;
	}
	_computeAngle(e, t, n) {
		return this.chart.getDataVisibility(e) ? Ye(this.resolveDataElementOptions(e, t).angle || n) : 0;
	}
}, bi = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	BarController: mi,
	BubbleController: hi,
	DoughnutController: _i,
	LineController: vi,
	PieController: class extends _i {
		static id = "pie";
		static defaults = {
			cutout: 0,
			rotation: 0,
			circumference: 360,
			radius: "100%"
		};
	},
	PolarAreaController: yi,
	RadarController: class extends Qr {
		static id = "radar";
		static defaults = {
			datasetElementType: "line",
			dataElementType: "point",
			indexAxis: "r",
			showLine: !0,
			elements: { line: { fill: "start" } }
		};
		static overrides = {
			aspectRatio: 1,
			scales: { r: { type: "radialLinear" } }
		};
		getLabelAndValue(e) {
			let t = this._cachedMeta.vScale, n = this.getParsed(e);
			return {
				label: t.getLabels()[e],
				value: "" + t.getLabelForValue(n[t.axis])
			};
		}
		parseObjectData(e, t, n, r) {
			return Nn.bind(this)(e, t, n, r);
		}
		update(e) {
			let t = this._cachedMeta, n = t.dataset, r = t.data || [], i = t.iScale.getLabels();
			if (n.points = r, e !== "resize") {
				let t = this.resolveDatasetElementOptions(e);
				this.options.showLine || (t.borderWidth = 0);
				let a = {
					_loop: !0,
					_fullLoop: i.length === r.length,
					options: t
				};
				this.updateElement(n, void 0, a, e);
			}
			this.updateElements(r, 0, r.length, e);
		}
		updateElements(e, t, n, r) {
			let i = this._cachedMeta.rScale, a = r === "reset";
			for (let o = t; o < t + n; o++) {
				let t = e[o], n = this.resolveDataElementOptions(o, t.active ? "active" : r), s = i.getPointPositionForValue(o, this.getParsed(o).r), c = a ? i.xCenter : s.x, l = a ? i.yCenter : s.y, u = {
					x: c,
					y: l,
					angle: s.angle,
					skip: isNaN(c) || isNaN(l),
					options: n
				};
				this.updateElement(t, o, u, r);
			}
		}
	},
	ScatterController: class extends Qr {
		static id = "scatter";
		static defaults = {
			datasetElementType: !1,
			dataElementType: "point",
			showLine: !1,
			fill: !1
		};
		static overrides = {
			interaction: { mode: "point" },
			scales: {
				x: { type: "linear" },
				y: { type: "linear" }
			}
		};
		getLabelAndValue(e) {
			let t = this._cachedMeta, n = this.chart.data.labels || [], { xScale: r, yScale: i } = t, a = this.getParsed(e), o = r.getLabelForValue(a.x), s = i.getLabelForValue(a.y);
			return {
				label: n[e] || "",
				value: "(" + o + ", " + s + ")"
			};
		}
		update(e) {
			let t = this._cachedMeta, { data: n = [] } = t, r = this.chart._animationsDisabled, { start: i, count: a } = vt(t, n, r);
			if (this._drawStart = i, this._drawCount = a, yt(t) && (i = 0, a = n.length), this.options.showLine) {
				this.datasetElementType || this.addElements();
				let { dataset: i, _dataset: a } = t;
				i._chart = this.chart, i._datasetIndex = this.index, i._decimated = !!a._decimated, i.points = n;
				let o = this.resolveDatasetElementOptions(e);
				o.segment = this.options.segment, this.updateElement(i, void 0, {
					animated: !r,
					options: o
				}, e);
			} else this.datasetElementType &&= (delete t.dataset, !1);
			this.updateElements(n, i, a, e);
		}
		addElements() {
			let { showLine: e } = this.options;
			!this.datasetElementType && e && (this.datasetElementType = this.chart.registry.getElement("line")), super.addElements();
		}
		updateElements(e, t, n, r) {
			let i = r === "reset", { iScale: a, vScale: o, _stacked: s, _dataset: c } = this._cachedMeta, l = this.resolveDataElementOptions(t, r), u = this.getSharedOptions(l), d = this.includeOptions(r, u), f = a.axis, p = o.axis, { spanGaps: m, segment: h } = this.options, g = Ke(m) ? m : Infinity, _ = this.chart._animationsDisabled || i || r === "none", v = t > 0 && this.getParsed(t - 1);
			for (let l = t; l < t + n; ++l) {
				let t = e[l], n = this.getParsed(l), m = _ ? t : {}, y = F(n[p]), b = m[f] = a.getPixelForValue(n[f], l), x = m[p] = i || y ? o.getBasePixel() : o.getPixelForValue(s ? this.applyStack(o, n, s) : n[p], l);
				m.skip = isNaN(b) || isNaN(x) || y, m.stop = l > 0 && Math.abs(n[f] - v[f]) > g, h && (m.parsed = n, m.raw = c.data[l]), d && (m.options = u || this.resolveDataElementOptions(l, t.active ? "active" : r)), _ || this.updateElement(t, l, m, r), v = n;
			}
			this.updateSharedOptions(u, r, l);
		}
		getMaxOverflow() {
			let e = this._cachedMeta, t = e.data || [];
			if (!this.options.showLine) {
				let e = 0;
				for (let n = t.length - 1; n >= 0; --n) e = Math.max(e, t[n].size(this.resolveDataElementOptions(n)) / 2);
				return e > 0 && e;
			}
			let n = e.dataset, r = n.options && n.options.borderWidth || 0;
			if (!t.length) return r;
			let i = t[0].size(this.resolveDataElementOptions(0)), a = t[t.length - 1].size(this.resolveDataElementOptions(t.length - 1));
			return Math.max(r, i, a) / 2;
		}
	}
});
function xi() {
	throw Error("This method is not implemented: Check that a complete date adapter is provided.");
}
var Si = { _date: class e {
	static override(t) {
		Object.assign(e.prototype, t);
	}
	options;
	constructor(e) {
		this.options = e || {};
	}
	init() {}
	formats() {
		return xi();
	}
	parse() {
		return xi();
	}
	format() {
		return xi();
	}
	add() {
		return xi();
	}
	diff() {
		return xi();
	}
	startOf() {
		return xi();
	}
	endOf() {
		return xi();
	}
} };
function Ci(e, t, n, r) {
	let { controller: i, data: a, _sorted: o } = e, s = i._cachedMeta.iScale;
	if (s && t === s.axis && t !== "r" && o && a.length) {
		let e = s._reversePixels ? ct : st;
		if (!r) return e(a, t, n);
		if (i._sharedOptions) {
			let r = a[0], i = typeof r.getRange == "function" && r.getRange(t);
			if (i) {
				let r = e(a, t, n - i), o = e(a, t, n + i);
				return {
					lo: r.lo,
					hi: o.hi
				};
			}
		}
	}
	return {
		lo: 0,
		hi: a.length - 1
	};
}
function wi(e, t, n, r, i) {
	let a = e.getSortedVisibleDatasetMetas(), o = n[t];
	for (let e = 0, n = a.length; e < n; ++e) {
		let { index: n, data: s } = a[e], { lo: c, hi: l } = Ci(a[e], t, o, i);
		for (let e = c; e <= l; ++e) {
			let t = s[e];
			t.skip || r(t, n, e);
		}
	}
}
function Ti(e) {
	let t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
	return function(e, r) {
		let i = t ? Math.abs(e.x - r.x) : 0, a = n ? Math.abs(e.y - r.y) : 0;
		return Math.sqrt(i ** 2 + a ** 2);
	};
}
function Ei(e, t, n, r, i) {
	let a = [];
	return !i && !e.isPointInArea(t) || wi(e, n, t, function(n, o, s) {
		(i || Kt(n, e.chartArea, 0)) && n.inRange(t.x, t.y, r) && a.push({
			element: n,
			datasetIndex: o,
			index: s
		});
	}, !0), a;
}
function Di(e, t, n, r) {
	let i = [];
	function a(e, n, a) {
		let { startAngle: o, endAngle: s } = e.getProps(["startAngle", "endAngle"], r), { angle: c } = Qe(e, {
			x: t.x,
			y: t.y
		});
		nt(c, o, s) && i.push({
			element: e,
			datasetIndex: n,
			index: a
		});
	}
	return wi(e, n, t, a), i;
}
function Oi(e, t, n, r, i, a) {
	let o = [], s = Ti(n), c = Infinity;
	function l(n, l, u) {
		let d = n.inRange(t.x, t.y, i);
		if (r && !d) return;
		let f = n.getCenterPoint(i);
		if (!(a || e.isPointInArea(f)) && !d) return;
		let p = s(t, f);
		p < c ? (o = [{
			element: n,
			datasetIndex: l,
			index: u
		}], c = p) : p === c && o.push({
			element: n,
			datasetIndex: l,
			index: u
		});
	}
	return wi(e, n, t, l), o;
}
function ki(e, t, n, r, i, a) {
	return !a && !e.isPointInArea(t) ? [] : n === "r" && !r ? Di(e, t, n, i) : Oi(e, t, n, r, i, a);
}
function Ai(e, t, n, r, i) {
	let a = [], o = n === "x" ? "inXRange" : "inYRange", s = !1;
	return wi(e, n, t, (e, r, c) => {
		e[o] && e[o](t[n], i) && (a.push({
			element: e,
			datasetIndex: r,
			index: c
		}), s ||= e.inRange(t.x, t.y, i));
	}), r && !s ? [] : a;
}
var ji = {
	evaluateInteractionItems: wi,
	modes: {
		index(e, t, n, r) {
			let i = $n(t, e), a = n.axis || "x", o = n.includeInvisible || !1, s = n.intersect ? Ei(e, i, a, r, o) : ki(e, i, a, !1, r, o), c = [];
			return s.length ? (e.getSortedVisibleDatasetMetas().forEach((e) => {
				let t = s[0].index, n = e.data[t];
				n && !n.skip && c.push({
					element: n,
					datasetIndex: e.index,
					index: t
				});
			}), c) : [];
		},
		dataset(e, t, n, r) {
			let i = $n(t, e), a = n.axis || "xy", o = n.includeInvisible || !1, s = n.intersect ? Ei(e, i, a, r, o) : ki(e, i, a, !1, r, o);
			if (s.length > 0) {
				let t = s[0].datasetIndex, n = e.getDatasetMeta(t).data;
				s = [];
				for (let e = 0; e < n.length; ++e) s.push({
					element: n[e],
					datasetIndex: t,
					index: e
				});
			}
			return s;
		},
		point(e, t, n, r) {
			return Ei(e, $n(t, e), n.axis || "xy", r, n.includeInvisible || !1);
		},
		nearest(e, t, n, r) {
			let i = $n(t, e), a = n.axis || "xy", o = n.includeInvisible || !1;
			return ki(e, i, a, n.intersect, r, o);
		},
		x(e, t, n, r) {
			return Ai(e, $n(t, e), "x", n.intersect, r);
		},
		y(e, t, n, r) {
			return Ai(e, $n(t, e), "y", n.intersect, r);
		}
	}
}, Mi = [
	"left",
	"top",
	"right",
	"bottom"
];
function Ni(e, t) {
	return e.filter((e) => e.pos === t);
}
function Pi(e, t) {
	return e.filter((e) => Mi.indexOf(e.pos) === -1 && e.box.axis === t);
}
function Fi(e, t) {
	return e.sort((e, n) => {
		let r = t ? n : e, i = t ? e : n;
		return r.weight === i.weight ? r.index - i.index : r.weight - i.weight;
	});
}
function Ii(e) {
	let t = [], n, r, i, a, o, s;
	for (n = 0, r = (e || []).length; n < r; ++n) i = e[n], {position: a, options: {stack: o, stackWeight: s = 1}} = i, t.push({
		index: n,
		box: i,
		pos: a,
		horizontal: i.isHorizontal(),
		weight: i.weight,
		stack: o && a + o,
		stackWeight: s
	});
	return t;
}
function Li(e) {
	let t = {};
	for (let n of e) {
		let { stack: e, pos: r, stackWeight: i } = n;
		if (!e || !Mi.includes(r)) continue;
		let a = t[e] || (t[e] = {
			count: 0,
			placed: 0,
			weight: 0,
			size: 0
		});
		a.count++, a.weight += i;
	}
	return t;
}
function Ri(e, t) {
	let n = Li(e), { vBoxMaxWidth: r, hBoxMaxHeight: i } = t, a, o, s;
	for (a = 0, o = e.length; a < o; ++a) {
		s = e[a];
		let { fullSize: o } = s.box, c = n[s.stack], l = c && s.stackWeight / c.weight;
		s.horizontal ? (s.width = l ? l * r : o && t.availableWidth, s.height = i) : (s.width = r, s.height = l ? l * i : o && t.availableHeight);
	}
	return n;
}
function zi(e) {
	let t = Ii(e), n = Fi(t.filter((e) => e.box.fullSize), !0), r = Fi(Ni(t, "left"), !0), i = Fi(Ni(t, "right")), a = Fi(Ni(t, "top"), !0), o = Fi(Ni(t, "bottom")), s = Pi(t, "x"), c = Pi(t, "y");
	return {
		fullSize: n,
		leftAndTop: r.concat(a),
		rightAndBottom: i.concat(c).concat(o).concat(s),
		chartArea: Ni(t, "chartArea"),
		vertical: r.concat(i).concat(c),
		horizontal: a.concat(o).concat(s)
	};
}
function Bi(e, t, n, r) {
	return Math.max(e[n], t[n]) + Math.max(e[r], t[r]);
}
function Vi(e, t) {
	e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Hi(e, t, n, r) {
	let { pos: i, box: a } = n, o = e.maxPadding;
	if (!R(i)) {
		n.size && (e[i] -= n.size);
		let t = r[n.stack] || {
			size: 0,
			count: 1
		};
		t.size = Math.max(t.size, n.horizontal ? a.height : a.width), n.size = t.size / t.count, e[i] += n.size;
	}
	a.getPadding && Vi(o, a.getPadding());
	let s = Math.max(0, t.outerWidth - Bi(o, e, "left", "right")), c = Math.max(0, t.outerHeight - Bi(o, e, "top", "bottom")), l = s !== e.w, u = c !== e.h;
	return e.w = s, e.h = c, n.horizontal ? {
		same: l,
		other: u
	} : {
		same: u,
		other: l
	};
}
function Ui(e) {
	let t = e.maxPadding;
	function n(n) {
		let r = Math.max(t[n] - e[n], 0);
		return e[n] += r, r;
	}
	e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function Wi(e, t) {
	let n = t.maxPadding;
	function r(e) {
		let r = {
			left: 0,
			top: 0,
			right: 0,
			bottom: 0
		};
		return e.forEach((e) => {
			r[e] = Math.max(t[e], n[e]);
		}), r;
	}
	return r(e ? ["left", "right"] : ["top", "bottom"]);
}
function Gi(e, t, n, r) {
	let i = [], a, o, s, c, l, u;
	for (a = 0, o = e.length, l = 0; a < o; ++a) {
		s = e[a], c = s.box, c.update(s.width || t.w, s.height || t.h, Wi(s.horizontal, t));
		let { same: o, other: d } = Hi(t, n, s, r);
		l |= o && i.length, u ||= d, c.fullSize || i.push(s);
	}
	return l && Gi(i, t, n, r) || u;
}
function Ki(e, t, n, r, i) {
	e.top = n, e.left = t, e.right = t + r, e.bottom = n + i, e.width = r, e.height = i;
}
function qi(e, t, n, r) {
	let i = n.padding, { x: a, y: o } = t;
	for (let s of e) {
		let e = s.box, c = r[s.stack] || {
			count: 1,
			placed: 0,
			weight: 1
		}, l = s.stackWeight / c.weight || 1;
		if (s.horizontal) {
			let r = t.w * l, a = c.size || e.height;
			Me(c.start) && (o = c.start), e.fullSize ? Ki(e, i.left, o, n.outerWidth - i.right - i.left, a) : Ki(e, t.left + c.placed, o, r, a), c.start = o, c.placed += r, o = e.bottom;
		} else {
			let r = t.h * l, o = c.size || e.width;
			Me(c.start) && (a = c.start), e.fullSize ? Ki(e, a, i.top, o, n.outerHeight - i.bottom - i.top) : Ki(e, a, t.top + c.placed, o, r), c.start = a, c.placed += r, a = e.right;
		}
	}
	t.x = a, t.y = o;
}
var Ji = {
	addBox(e, t) {
		e.boxes ||= [], t.fullSize = t.fullSize || !1, t.position = t.position || "top", t.weight = t.weight || 0, t._layers = t._layers || function() {
			return [{
				z: 0,
				draw(e) {
					t.draw(e);
				}
			}];
		}, e.boxes.push(t);
	},
	removeBox(e, t) {
		let n = e.boxes ? e.boxes.indexOf(t) : -1;
		n !== -1 && e.boxes.splice(n, 1);
	},
	configure(e, t, n) {
		t.fullSize = n.fullSize, t.position = n.position, t.weight = n.weight;
	},
	update(e, t, n, r) {
		if (!e) return;
		let i = ln(e.options.layout.padding), a = Math.max(t - i.width, 0), o = Math.max(n - i.height, 0), s = zi(e.boxes), c = s.vertical, l = s.horizontal;
		H(e.boxes, (e) => {
			typeof e.beforeLayout == "function" && e.beforeLayout();
		});
		let u = c.reduce((e, t) => t.box.options && t.box.options.display === !1 ? e : e + 1, 0) || 1, d = Object.freeze({
			outerWidth: t,
			outerHeight: n,
			padding: i,
			availableWidth: a,
			availableHeight: o,
			vBoxMaxWidth: a / 2 / u,
			hBoxMaxHeight: o / 2
		}), f = Object.assign({}, i);
		Vi(f, ln(r));
		let p = Object.assign({
			maxPadding: f,
			w: a,
			h: o,
			x: i.left,
			y: i.top
		}, i), m = Ri(c.concat(l), d);
		Gi(s.fullSize, p, d, m), Gi(c, p, d, m), Gi(l, p, d, m) && Gi(c, p, d, m), Ui(p), qi(s.leftAndTop, p, d, m), p.x += p.w, p.y += p.h, qi(s.rightAndBottom, p, d, m), e.chartArea = {
			left: p.left,
			top: p.top,
			right: p.left + p.w,
			bottom: p.top + p.h,
			height: p.h,
			width: p.w
		}, H(s.chartArea, (t) => {
			let n = t.box;
			Object.assign(n, e.chartArea), n.update(p.w, p.h, {
				left: 0,
				top: 0,
				right: 0,
				bottom: 0
			});
		});
	}
}, Yi = class {
	acquireContext(e, t) {}
	releaseContext(e) {
		return !1;
	}
	addEventListener(e, t, n) {}
	removeEventListener(e, t, n) {}
	getDevicePixelRatio() {
		return 1;
	}
	getMaximumSize(e, t, n, r) {
		return t = Math.max(0, t || e.width), n ||= e.height, {
			width: t,
			height: Math.max(0, r ? Math.floor(t / r) : n)
		};
	}
	isAttached(e) {
		return !0;
	}
	updateConfig(e) {}
}, Xi = class extends Yi {
	acquireContext(e) {
		return e && e.getContext && e.getContext("2d") || null;
	}
	updateConfig(e) {
		e.options.animation = !1;
	}
}, Zi = "$chartjs", Qi = {
	touchstart: "mousedown",
	touchmove: "mousemove",
	touchend: "mouseup",
	pointerenter: "mouseenter",
	pointerdown: "mousedown",
	pointermove: "mousemove",
	pointerup: "mouseup",
	pointerleave: "mouseout",
	pointerout: "mouseout"
}, $i = (e) => e === null || e === "";
function ea(e, t) {
	let n = e.style, r = e.getAttribute("height"), i = e.getAttribute("width");
	if (e[Zi] = { initial: {
		height: r,
		width: i,
		style: {
			display: n.display,
			height: n.height,
			width: n.width
		}
	} }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", $i(i)) {
		let t = ar(e, "width");
		t !== void 0 && (e.width = t);
	}
	if ($i(r)) {
		if (e.style.height === "") e.height = e.width / (t || 2);
		else {
			let t = ar(e, "height");
			t !== void 0 && (e.height = t);
		}
	}
	return e;
}
var ta = ir ? { passive: !0 } : !1;
function na(e, t, n) {
	e && e.addEventListener(t, n, ta);
}
function ra(e, t, n) {
	e && e.canvas && e.canvas.removeEventListener(t, n, ta);
}
function ia(e, t) {
	let n = Qi[e.type] || e.type, { x: r, y: i } = $n(e, t);
	return {
		type: n,
		chart: t,
		native: e,
		x: r === void 0 ? null : r,
		y: i === void 0 ? null : i
	};
}
function aa(e, t) {
	for (let n of e) if (n === t || n.contains(t)) return !0;
}
function oa(e, t, n) {
	let r = e.canvas, i = new MutationObserver((e) => {
		let t = !1;
		for (let n of e) t ||= aa(n.addedNodes, r), t &&= !aa(n.removedNodes, r);
		t && n();
	});
	return i.observe(document, {
		childList: !0,
		subtree: !0
	}), i;
}
function sa(e, t, n) {
	let r = e.canvas, i = new MutationObserver((e) => {
		let t = !1;
		for (let n of e) t ||= aa(n.removedNodes, r), t &&= !aa(n.addedNodes, r);
		t && n();
	});
	return i.observe(document, {
		childList: !0,
		subtree: !0
	}), i;
}
var ca = /* @__PURE__ */ new Map(), la = 0;
function ua() {
	let e = window.devicePixelRatio;
	e !== la && (la = e, ca.forEach((t, n) => {
		n.currentDevicePixelRatio !== e && t();
	}));
}
function da(e, t) {
	ca.size || window.addEventListener("resize", ua), ca.set(e, t);
}
function fa(e) {
	ca.delete(e), ca.size || window.removeEventListener("resize", ua);
}
function pa(e, t, n) {
	let r = e.canvas, i = r && Gn(r);
	if (!i) return;
	let a = ht((e, t) => {
		let r = i.clientWidth;
		n(e, t), r < i.clientWidth && n();
	}, window), o = new ResizeObserver((e) => {
		let t = e[0], n = t.contentRect.width, r = t.contentRect.height;
		(n !== 0 || r !== 0) && a(n, r);
	});
	return o.observe(i), da(e, a), o;
}
function ma(e, t, n) {
	n && n.disconnect(), t === "resize" && fa(e);
}
function ha(e, t, n) {
	let r = e.canvas, i = ht((t) => {
		e.ctx !== null && n(ia(t, e));
	}, e);
	return na(r, t, i), i;
}
var ga = class extends Yi {
	acquireContext(e, t) {
		let n = e && e.getContext && e.getContext("2d");
		return n && n.canvas === e ? (ea(e, t), n) : null;
	}
	releaseContext(e) {
		let t = e.canvas;
		if (!t[Zi]) return !1;
		let n = t[Zi].initial;
		["height", "width"].forEach((e) => {
			let r = n[e];
			F(r) ? t.removeAttribute(e) : t.setAttribute(e, r);
		});
		let r = n.style || {};
		return Object.keys(r).forEach((e) => {
			t.style[e] = r[e];
		}), t.width = t.width, delete t[Zi], !0;
	}
	addEventListener(e, t, n) {
		this.removeEventListener(e, t);
		let r = e.$proxies ||= {};
		r[t] = ({
			attach: oa,
			detach: sa,
			resize: pa
		}[t] || ha)(e, t, n);
	}
	removeEventListener(e, t) {
		let n = e.$proxies ||= {}, r = n[t];
		r && (({
			attach: ma,
			detach: ma,
			resize: ma
		}[t] || ra)(e, t, r), n[t] = void 0);
	}
	getDevicePixelRatio() {
		return window.devicePixelRatio;
	}
	getMaximumSize(e, t, n, r) {
		return nr(e, t, n, r);
	}
	isAttached(e) {
		let t = e && Gn(e);
		return !!(t && t.isConnected);
	}
};
function _a(e) {
	return !Wn() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Xi : ga;
}
var va = class {
	static defaults = {};
	static defaultRoutes = void 0;
	x;
	y;
	active = !1;
	options;
	$animations;
	tooltipPosition(e) {
		let { x: t, y: n } = this.getProps(["x", "y"], e);
		return {
			x: t,
			y: n
		};
	}
	hasValue() {
		return Ke(this.x) && Ke(this.y);
	}
	getProps(e, t) {
		let n = this.$animations;
		if (!t || !n) return this;
		let r = {};
		return e.forEach((e) => {
			r[e] = n[e] && n[e].active() ? n[e]._to : this[e];
		}), r;
	}
};
function ya(e, t) {
	let n = e.options.ticks, r = ba(e), i = Math.min(n.maxTicksLimit || r, r), a = n.major.enabled ? Sa(t) : [], o = a.length, s = a[0], c = a[o - 1], l = [];
	if (o > i) return Ca(t, l, a, o / i), l;
	let u = xa(a, t, i);
	if (o > 0) {
		let e, n, r = o > 1 ? Math.round((c - s) / (o - 1)) : null;
		for (wa(t, l, u, F(r) ? 0 : s - r, s), e = 0, n = o - 1; e < n; e++) wa(t, l, u, a[e], a[e + 1]);
		return wa(t, l, u, c, F(r) ? t.length : c + r), l;
	}
	return wa(t, l, u), l;
}
function ba(e) {
	let t = e.options.offset, n = e._tickSize(), r = e._length / n + +!t, i = e._maxLength / n;
	return Math.floor(Math.min(r, i));
}
function xa(e, t, n) {
	let r = Ta(e), i = t.length / n;
	if (!r) return Math.max(i, 1);
	let a = Ge(r);
	for (let e = 0, t = a.length - 1; e < t; e++) {
		let t = a[e];
		if (t > i) return t;
	}
	return Math.max(i, 1);
}
function Sa(e) {
	let t = [], n, r;
	for (n = 0, r = e.length; n < r; n++) e[n].major && t.push(n);
	return t;
}
function Ca(e, t, n, r) {
	let i = 0, a = n[0], o;
	for (r = Math.ceil(r), o = 0; o < e.length; o++) o === a && (t.push(e[o]), i++, a = n[i * r]);
}
function wa(e, t, n, r, i) {
	let a = B(r, 0), o = Math.min(B(i, e.length), e.length), s = 0, c, l, u;
	for (n = Math.ceil(n), i && (c = i - r, n = c / Math.floor(c / n)), u = a; u < 0;) s++, u = Math.round(a + s * n);
	for (l = Math.max(a, 0); l < o; l++) l === u && (t.push(e[l]), s++, u = Math.round(a + s * n));
}
function Ta(e) {
	let t = e.length, n, r;
	if (t < 2) return !1;
	for (r = e[0], n = 1; n < t; ++n) if (e[n] - e[n - 1] !== r) return !1;
	return r;
}
var Ea = (e) => e === "left" ? "right" : e === "right" ? "left" : e, Da = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, Oa = (e, t) => Math.min(t || e, e);
function ka(e, t) {
	let n = [], r = e.length / t, i = e.length, a = 0;
	for (; a < i; a += r) n.push(e[Math.floor(a)]);
	return n;
}
function Aa(e, t, n) {
	let r = e.ticks.length, i = Math.min(t, r - 1), a = e._startPixel, o = e._endPixel, s = 1e-6, c = e.getPixelForTick(i), l;
	if (!(n && (l = r === 1 ? Math.max(c - a, o - c) : t === 0 ? (e.getPixelForTick(1) - c) / 2 : (c - e.getPixelForTick(i - 1)) / 2, c += i < t ? l : -l, c < a - s || c > o + s))) return c;
}
function ja(e, t) {
	H(e, (e) => {
		let n = e.gc, r = n.length / 2, i;
		if (r > t) {
			for (i = 0; i < r; ++i) delete e.data[n[i]];
			n.splice(0, r);
		}
	});
}
function Ma(e) {
	return e.drawTicks ? e.tickLength : 0;
}
function Na(e, t) {
	if (!e.display) return 0;
	let n = un(e.font, t), r = ln(e.padding);
	return (I(e.text) ? e.text.length : 1) * n.lineHeight + r.height;
}
function Pa(e, t) {
	return pn(e, {
		scale: t,
		type: "scale"
	});
}
function Fa(e, t, n) {
	return pn(e, {
		tick: n,
		index: t,
		type: "tick"
	});
}
function Ia(e, t, n) {
	let r = q(e);
	return (n && t !== "right" || !n && t === "right") && (r = Ea(r)), r;
}
function La(e, t, n, r) {
	let { top: i, left: a, bottom: o, right: s, chart: c } = e, { chartArea: l, scales: u } = c, d = 0, f, p, m, h = o - i, g = s - a;
	if (e.isHorizontal()) {
		if (p = gt(r, a, s), R(n)) {
			let e = Object.keys(n)[0], r = n[e];
			m = u[e].getPixelForValue(r) + h - t;
		} else m = n === "center" ? (l.bottom + l.top) / 2 + h - t : Da(e, n, t);
		f = s - a;
	} else {
		if (R(n)) {
			let e = Object.keys(n)[0], r = n[e];
			p = u[e].getPixelForValue(r) - g + t;
		} else p = n === "center" ? (l.left + l.right) / 2 - g + t : Da(e, n, t);
		m = gt(r, o, i), d = n === "left" ? -ze : ze;
	}
	return {
		titleX: p,
		titleY: m,
		maxWidth: f,
		rotation: d
	};
}
var Ra = class e extends va {
	constructor(e) {
		super(), this.id = e.id, this.type = e.type, this.options = void 0, this.ctx = e.ctx, this.chart = e.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
			left: 0,
			right: 0,
			top: 0,
			bottom: 0
		}, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0;
	}
	init(e) {
		this.options = e.setContext(this.getContext()), this.axis = e.axis, this._userMin = this.parse(e.min), this._userMax = this.parse(e.max), this._suggestedMin = this.parse(e.suggestedMin), this._suggestedMax = this.parse(e.suggestedMax);
	}
	parse(e, t) {
		return e;
	}
	getUserBounds() {
		let { _userMin: e, _userMax: t, _suggestedMin: n, _suggestedMax: r } = this;
		return e = _e(e, Infinity), t = _e(t, -Infinity), n = _e(n, Infinity), r = _e(r, -Infinity), {
			min: _e(e, n),
			max: _e(t, r),
			minDefined: z(e),
			maxDefined: z(t)
		};
	}
	getMinMax(e) {
		let { min: t, max: n, minDefined: r, maxDefined: i } = this.getUserBounds(), a;
		if (r && i) return {
			min: t,
			max: n
		};
		let o = this.getMatchingVisibleMetas();
		for (let s = 0, c = o.length; s < c; ++s) a = o[s].controller.getMinMax(this, e), r || (t = Math.min(t, a.min)), i || (n = Math.max(n, a.max));
		return t = i && t > n ? n : t, n = r && t > n ? t : n, {
			min: _e(t, _e(n, t)),
			max: _e(n, _e(t, n))
		};
	}
	getPadding() {
		return {
			left: this.paddingLeft || 0,
			top: this.paddingTop || 0,
			right: this.paddingRight || 0,
			bottom: this.paddingBottom || 0
		};
	}
	getTicks() {
		return this.ticks;
	}
	getLabels() {
		let e = this.chart.data;
		return this.options.labels || (this.isHorizontal() ? e.xLabels : e.yLabels) || e.labels || [];
	}
	getLabelItems(e = this.chart.chartArea) {
		return this._labelItems ||= this._computeLabelItems(e);
	}
	beforeLayout() {
		this._cache = {}, this._dataLimitsCached = !1;
	}
	beforeUpdate() {
		V(this.options.beforeUpdate, [this]);
	}
	update(e, t, n) {
		let { beginAtZero: r, grace: i, ticks: a } = this.options, o = a.sampleSize;
		this.beforeUpdate(), this.maxWidth = e, this.maxHeight = t, this._margins = n = Object.assign({
			left: 0,
			right: 0,
			top: 0,
			bottom: 0
		}, n), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + n.left + n.right : this.height + n.top + n.bottom, this._dataLimitsCached ||= (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = fn(this, i, r), !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
		let s = o < this.ticks.length;
		this._convertTicksToLabels(s ? ka(this.ticks, o) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), a.display && (a.autoSkip || a.source === "auto") && (this.ticks = ya(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), s && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
	}
	configure() {
		let e = this.options.reverse, t, n;
		this.isHorizontal() ? (t = this.left, n = this.right) : (t = this.top, n = this.bottom, e = !e), this._startPixel = t, this._endPixel = n, this._reversePixels = e, this._length = n - t, this._alignToPixels = this.options.alignToPixels;
	}
	afterUpdate() {
		V(this.options.afterUpdate, [this]);
	}
	beforeSetDimensions() {
		V(this.options.beforeSetDimensions, [this]);
	}
	setDimensions() {
		this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
	}
	afterSetDimensions() {
		V(this.options.afterSetDimensions, [this]);
	}
	_callHooks(e) {
		this.chart.notifyPlugins(e, this.getContext()), V(this.options[e], [this]);
	}
	beforeDataLimits() {
		this._callHooks("beforeDataLimits");
	}
	determineDataLimits() {}
	afterDataLimits() {
		this._callHooks("afterDataLimits");
	}
	beforeBuildTicks() {
		this._callHooks("beforeBuildTicks");
	}
	buildTicks() {
		return [];
	}
	afterBuildTicks() {
		this._callHooks("afterBuildTicks");
	}
	beforeTickToLabelConversion() {
		V(this.options.beforeTickToLabelConversion, [this]);
	}
	generateTickLabels(e) {
		let t = this.options.ticks, n, r, i;
		for (n = 0, r = e.length; n < r; n++) i = e[n], i.label = V(t.callback, [
			i.value,
			n,
			e
		], this);
	}
	afterTickToLabelConversion() {
		V(this.options.afterTickToLabelConversion, [this]);
	}
	beforeCalculateLabelRotation() {
		V(this.options.beforeCalculateLabelRotation, [this]);
	}
	calculateLabelRotation() {
		let e = this.options, t = e.ticks, n = Oa(this.ticks.length, e.ticks.maxTicksLimit), r = t.minRotation || 0, i = t.maxRotation, a = r, o, s, c;
		if (!this._isVisible() || !t.display || r >= i || n <= 1 || !this.isHorizontal()) {
			this.labelRotation = r;
			return;
		}
		let l = this._getLabelSizes(), u = l.widest.width, d = l.highest.height, f = rt(this.chart.width - u, 0, this.maxWidth);
		o = e.offset ? this.maxWidth / n : f / (n - 1), u + 6 > o && (o = f / (n - (e.offset ? .5 : 1)), s = this.maxHeight - Ma(e.grid) - t.padding - Na(e.title, this.chart.options.font), c = Math.sqrt(u * u + d * d), a = Xe(Math.min(Math.asin(rt((l.highest.height + 6) / o, -1, 1)), Math.asin(rt(s / c, -1, 1)) - Math.asin(rt(d / c, -1, 1)))), a = Math.max(r, Math.min(i, a))), this.labelRotation = a;
	}
	afterCalculateLabelRotation() {
		V(this.options.afterCalculateLabelRotation, [this]);
	}
	afterAutoSkip() {}
	beforeFit() {
		V(this.options.beforeFit, [this]);
	}
	fit() {
		let e = {
			width: 0,
			height: 0
		}, { chart: t, options: { ticks: n, title: r, grid: i } } = this, a = this._isVisible(), o = this.isHorizontal();
		if (a) {
			let a = Na(r, t.options.font);
			if (o ? (e.width = this.maxWidth, e.height = Ma(i) + a) : (e.height = this.maxHeight, e.width = Ma(i) + a), n.display && this.ticks.length) {
				let { first: t, last: r, widest: i, highest: a } = this._getLabelSizes(), s = n.padding * 2, c = Ye(this.labelRotation), l = Math.cos(c), u = Math.sin(c);
				if (o) {
					let t = n.mirror ? 0 : u * i.width + l * a.height;
					e.height = Math.min(this.maxHeight, e.height + t + s);
				} else {
					let t = n.mirror ? 0 : l * i.width + u * a.height;
					e.width = Math.min(this.maxWidth, e.width + t + s);
				}
				this._calculatePadding(t, r, u, l);
			}
		}
		this._handleMargins(), o ? (this.width = this._length = t.width - this._margins.left - this._margins.right, this.height = e.height) : (this.width = e.width, this.height = this._length = t.height - this._margins.top - this._margins.bottom);
	}
	_calculatePadding(e, t, n, r) {
		let { ticks: { align: i, padding: a }, position: o } = this.options, s = this.labelRotation !== 0, c = o !== "top" && this.axis === "x";
		if (this.isHorizontal()) {
			let o = this.getPixelForTick(0) - this.left, l = this.right - this.getPixelForTick(this.ticks.length - 1), u = 0, d = 0;
			s ? c ? (u = r * e.width, d = n * t.height) : (u = n * e.height, d = r * t.width) : i === "start" ? d = t.width : i === "end" ? u = e.width : i !== "inner" && (u = e.width / 2, d = t.width / 2), this.paddingLeft = Math.max((u - o + a) * this.width / (this.width - o), 0), this.paddingRight = Math.max((d - l + a) * this.width / (this.width - l), 0);
		} else {
			let n = t.height / 2, r = e.height / 2;
			i === "start" ? (n = 0, r = e.height) : i === "end" && (n = t.height, r = 0), this.paddingTop = n + a, this.paddingBottom = r + a;
		}
	}
	_handleMargins() {
		this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
	}
	afterFit() {
		V(this.options.afterFit, [this]);
	}
	isHorizontal() {
		let { axis: e, position: t } = this.options;
		return t === "top" || t === "bottom" || e === "x";
	}
	isFullSize() {
		return this.options.fullSize;
	}
	_convertTicksToLabels(e) {
		this.beforeTickToLabelConversion(), this.generateTickLabels(e);
		let t, n;
		for (t = 0, n = e.length; t < n; t++) F(e[t].label) && (e.splice(t, 1), n--, t--);
		this.afterTickToLabelConversion();
	}
	_getLabelSizes() {
		let e = this._labelSizes;
		if (!e) {
			let t = this.options.ticks.sampleSize, n = this.ticks;
			t < n.length && (n = ka(n, t)), this._labelSizes = e = this._computeLabelSizes(n, n.length, this.options.ticks.maxTicksLimit);
		}
		return e;
	}
	_computeLabelSizes(e, t, n) {
		let { ctx: r, _longestTextCache: i } = this, a = [], o = [], s = Math.floor(t / Oa(t, n)), c = 0, l = 0, u, d, f, p, m, h, g, _, v, y, b;
		for (u = 0; u < t; u += s) {
			if (p = e[u].label, m = this._resolveTickFontOptions(u), r.font = h = m.string, g = i[h] = i[h] || {
				data: {},
				gc: []
			}, _ = m.lineHeight, v = y = 0, !F(p) && !I(p)) v = Vt(r, g.data, g.gc, v, p), y = _;
			else if (I(p)) for (d = 0, f = p.length; d < f; ++d) b = p[d], !F(b) && !I(b) && (v = Vt(r, g.data, g.gc, v, b), y += _);
			a.push(v), o.push(y), c = Math.max(v, c), l = Math.max(y, l);
		}
		ja(i, t);
		let x = a.indexOf(c), S = o.indexOf(l), C = (e) => ({
			width: a[e] || 0,
			height: o[e] || 0
		});
		return {
			first: C(0),
			last: C(t - 1),
			widest: C(x),
			highest: C(S),
			widths: a,
			heights: o
		};
	}
	getLabelForValue(e) {
		return e;
	}
	getPixelForValue(e, t) {
		return NaN;
	}
	getValueForPixel(e) {}
	getPixelForTick(e) {
		let t = this.ticks;
		return e < 0 || e > t.length - 1 ? null : this.getPixelForValue(t[e].value);
	}
	getPixelForDecimal(e) {
		this._reversePixels && (e = 1 - e);
		let t = this._startPixel + e * this._length;
		return it(this._alignToPixels ? Ht(this.chart, t, 0) : t);
	}
	getDecimalForPixel(e) {
		let t = (e - this._startPixel) / this._length;
		return this._reversePixels ? 1 - t : t;
	}
	getBasePixel() {
		return this.getPixelForValue(this.getBaseValue());
	}
	getBaseValue() {
		let { min: e, max: t } = this;
		return e < 0 && t < 0 ? t : e > 0 && t > 0 ? e : 0;
	}
	getContext(e) {
		let t = this.ticks || [];
		if (e >= 0 && e < t.length) {
			let n = t[e];
			return n.$context ||= Fa(this.getContext(), e, n);
		}
		return this.$context ||= Pa(this.chart.getContext(), this);
	}
	_tickSize() {
		let e = this.options.ticks, t = Ye(this.labelRotation), n = Math.abs(Math.cos(t)), r = Math.abs(Math.sin(t)), i = this._getLabelSizes(), a = e.autoSkipPadding || 0, o = i ? i.widest.width + a : 0, s = i ? i.highest.height + a : 0;
		return this.isHorizontal() ? s * n > o * r ? o / n : s / r : s * r < o * n ? s / n : o / r;
	}
	_isVisible() {
		let e = this.options.display;
		return e === "auto" ? this.getMatchingVisibleMetas().length > 0 : !!e;
	}
	_computeGridLineItems(e) {
		let t = this.axis, n = this.chart, r = this.options, { grid: i, position: a, border: o } = r, s = i.offset, c = this.isHorizontal(), l = this.ticks.length + +!!s, u = Ma(i), d = [], f = o.setContext(this.getContext()), p = f.display ? f.width : 0, m = p / 2, h = function(e) {
			return Ht(n, e, p);
		}, g, _, v, y, b, x, S, C, w, T, E, ee;
		if (a === "top") g = h(this.bottom), x = this.bottom - u, C = g - m, T = h(e.top) + m, ee = e.bottom;
		else if (a === "bottom") g = h(this.top), T = e.top, ee = h(e.bottom) - m, x = g + m, C = this.top + u;
		else if (a === "left") g = h(this.right), b = this.right - u, S = g - m, w = h(e.left) + m, E = e.right;
		else if (a === "right") g = h(this.left), w = e.left, E = h(e.right) - m, b = g + m, S = this.left + u;
		else if (t === "x") {
			if (a === "center") g = h((e.top + e.bottom) / 2 + .5);
			else if (R(a)) {
				let e = Object.keys(a)[0], t = a[e];
				g = h(this.chart.scales[e].getPixelForValue(t));
			}
			T = e.top, ee = e.bottom, x = g + m, C = x + u;
		} else if (t === "y") {
			if (a === "center") g = h((e.left + e.right) / 2);
			else if (R(a)) {
				let e = Object.keys(a)[0], t = a[e];
				g = h(this.chart.scales[e].getPixelForValue(t));
			}
			b = g - m, S = b - u, w = e.left, E = e.right;
		}
		let te = B(r.ticks.maxTicksLimit, l), ne = Math.max(1, Math.ceil(l / te));
		for (_ = 0; _ < l; _ += ne) {
			let e = this.getContext(_), t = i.setContext(e), r = o.setContext(e), a = t.lineWidth, l = t.color, u = r.dash || [], f = r.dashOffset, p = t.tickWidth, m = t.tickColor, h = t.tickBorderDash || [], g = t.tickBorderDashOffset;
			v = Aa(this, _, s), v !== void 0 && (y = Ht(n, v, a), c ? b = S = w = E = y : x = C = T = ee = y, d.push({
				tx1: b,
				ty1: x,
				tx2: S,
				ty2: C,
				x1: w,
				y1: T,
				x2: E,
				y2: ee,
				width: a,
				color: l,
				borderDash: u,
				borderDashOffset: f,
				tickWidth: p,
				tickColor: m,
				tickBorderDash: h,
				tickBorderDashOffset: g
			}));
		}
		return this._ticksLength = l, this._borderValue = g, d;
	}
	_computeLabelItems(e) {
		let t = this.axis, n = this.options, { position: r, ticks: i } = n, a = this.isHorizontal(), o = this.ticks, { align: s, crossAlign: c, padding: l, mirror: u } = i, d = Ma(n.grid), f = d + l, p = u ? -l : f, m = -Ye(this.labelRotation), h = [], g, _, v, y, b, x, S, C, w, T, E, ee, te = "middle";
		if (r === "top") x = this.bottom - p, S = this._getXAxisLabelAlignment();
		else if (r === "bottom") x = this.top + p, S = this._getXAxisLabelAlignment();
		else if (r === "left") {
			let e = this._getYAxisLabelAlignment(d);
			S = e.textAlign, b = e.x;
		} else if (r === "right") {
			let e = this._getYAxisLabelAlignment(d);
			S = e.textAlign, b = e.x;
		} else if (t === "x") {
			if (r === "center") x = (e.top + e.bottom) / 2 + f;
			else if (R(r)) {
				let e = Object.keys(r)[0], t = r[e];
				x = this.chart.scales[e].getPixelForValue(t) + f;
			}
			S = this._getXAxisLabelAlignment();
		} else if (t === "y") {
			if (r === "center") b = (e.left + e.right) / 2 - f;
			else if (R(r)) {
				let e = Object.keys(r)[0], t = r[e];
				b = this.chart.scales[e].getPixelForValue(t);
			}
			S = this._getYAxisLabelAlignment(d).textAlign;
		}
		t === "y" && (s === "start" ? te = "top" : s === "end" && (te = "bottom"));
		let ne = this._getLabelSizes();
		for (g = 0, _ = o.length; g < _; ++g) {
			v = o[g], y = v.label;
			let e = i.setContext(this.getContext(g));
			C = this.getPixelForTick(g) + i.labelOffset, w = this._resolveTickFontOptions(g), T = w.lineHeight, E = I(y) ? y.length : 1;
			let t = E / 2, n = e.color, s = e.textStrokeColor, l = e.textStrokeWidth, d = S;
			a ? (b = C, S === "inner" && (d = g === _ - 1 ? this.options.reverse ? "left" : "right" : g === 0 ? this.options.reverse ? "right" : "left" : "center"), ee = r === "top" ? c === "near" || m !== 0 ? -E * T + T / 2 : c === "center" ? -ne.highest.height / 2 - t * T + T : -ne.highest.height + T / 2 : c === "near" || m !== 0 ? T / 2 : c === "center" ? ne.highest.height / 2 - t * T : ne.highest.height - E * T, u && (ee *= -1), m !== 0 && !e.showLabelBackdrop && (b += T / 2 * Math.sin(m))) : (x = C, ee = (1 - E) * T / 2);
			let f;
			if (e.showLabelBackdrop) {
				let t = ln(e.backdropPadding), n = ne.heights[g], r = ne.widths[g], i = ee - t.top, a = 0 - t.left;
				switch (te) {
					case "middle":
						i -= n / 2;
						break;
					case "bottom": i -= n;
				}
				switch (S) {
					case "center":
						a -= r / 2;
						break;
					case "right":
						a -= r;
						break;
					case "inner": g === _ - 1 ? a -= r : g > 0 && (a -= r / 2);
				}
				f = {
					left: a,
					top: i,
					width: r + t.width,
					height: n + t.height,
					color: e.backdropColor
				};
			}
			h.push({
				label: y,
				font: w,
				textOffset: ee,
				options: {
					rotation: m,
					color: n,
					strokeColor: s,
					strokeWidth: l,
					textAlign: d,
					textBaseline: te,
					translation: [b, x],
					backdrop: f
				}
			});
		}
		return h;
	}
	_getXAxisLabelAlignment() {
		let { position: e, ticks: t } = this.options;
		if (-Ye(this.labelRotation)) return e === "top" ? "left" : "right";
		let n = "center";
		return t.align === "start" ? n = "left" : t.align === "end" ? n = "right" : t.align === "inner" && (n = "inner"), n;
	}
	_getYAxisLabelAlignment(e) {
		let { position: t, ticks: { crossAlign: n, mirror: r, padding: i } } = this.options, a = this._getLabelSizes(), o = e + i, s = a.widest.width, c, l;
		return t === "left" ? r ? (l = this.right + i, n === "near" ? c = "left" : n === "center" ? (c = "center", l += s / 2) : (c = "right", l += s)) : (l = this.right - o, n === "near" ? c = "right" : n === "center" ? (c = "center", l -= s / 2) : (c = "left", l = this.left)) : t === "right" ? r ? (l = this.left + i, n === "near" ? c = "right" : n === "center" ? (c = "center", l -= s / 2) : (c = "left", l -= s)) : (l = this.left + o, n === "near" ? c = "left" : n === "center" ? (c = "center", l += s / 2) : (c = "right", l = this.right)) : c = "right", {
			textAlign: c,
			x: l
		};
	}
	_computeLabelArea() {
		if (this.options.ticks.mirror) return;
		let e = this.chart, t = this.options.position;
		if (t === "left" || t === "right") return {
			top: 0,
			left: this.left,
			bottom: e.height,
			right: this.right
		};
		if (t === "top" || t === "bottom") return {
			top: this.top,
			left: 0,
			bottom: this.bottom,
			right: e.width
		};
	}
	drawBackground() {
		let { ctx: e, options: { backgroundColor: t }, left: n, top: r, width: i, height: a } = this;
		t && (e.save(), e.fillStyle = t, e.fillRect(n, r, i, a), e.restore());
	}
	getLineWidthForValue(e) {
		let t = this.options.grid;
		if (!this._isVisible() || !t.display) return 0;
		let n = this.ticks.findIndex((t) => t.value === e);
		return n >= 0 ? t.setContext(this.getContext(n)).lineWidth : 0;
	}
	drawGrid(e) {
		let t = this.options.grid, n = this.ctx, r = this._gridLineItems ||= this._computeGridLineItems(e), i, a, o = (e, t, r) => {
			r.width && r.color && (n.save(), n.lineWidth = r.width, n.strokeStyle = r.color, n.setLineDash(r.borderDash || []), n.lineDashOffset = r.borderDashOffset, n.beginPath(), n.moveTo(e.x, e.y), n.lineTo(t.x, t.y), n.stroke(), n.restore());
		};
		if (t.display) for (i = 0, a = r.length; i < a; ++i) {
			let e = r[i];
			t.drawOnChartArea && o({
				x: e.x1,
				y: e.y1
			}, {
				x: e.x2,
				y: e.y2
			}, e), t.drawTicks && o({
				x: e.tx1,
				y: e.ty1
			}, {
				x: e.tx2,
				y: e.ty2
			}, {
				color: e.tickColor,
				width: e.tickWidth,
				borderDash: e.tickBorderDash,
				borderDashOffset: e.tickBorderDashOffset
			});
		}
	}
	drawBorder() {
		let { chart: e, ctx: t, options: { border: n, grid: r } } = this, i = n.setContext(this.getContext()), a = n.display ? i.width : 0;
		if (!a) return;
		let o = r.setContext(this.getContext(0)).lineWidth, s = this._borderValue, c, l, u, d;
		this.isHorizontal() ? (c = Ht(e, this.left, a) - a / 2, l = Ht(e, this.right, o) + o / 2, u = d = s) : (u = Ht(e, this.top, a) - a / 2, d = Ht(e, this.bottom, o) + o / 2, c = l = s), t.save(), t.lineWidth = i.width, t.strokeStyle = i.color, t.beginPath(), t.moveTo(c, u), t.lineTo(l, d), t.stroke(), t.restore();
	}
	drawLabels(e) {
		if (!this.options.ticks.display) return;
		let t = this.ctx, n = this._computeLabelArea();
		n && qt(t, n);
		let r = this.getLabelItems(e);
		for (let e of r) {
			let n = e.options, r = e.font, i = e.label, a = e.textOffset;
			en(t, i, 0, a, r, n);
		}
		n && Jt(t);
	}
	drawTitle() {
		let { ctx: e, options: { position: t, title: n, reverse: r } } = this;
		if (!n.display) return;
		let i = un(n.font), a = ln(n.padding), o = n.align, s = i.lineHeight / 2;
		t === "bottom" || t === "center" || R(t) ? (s += a.bottom, I(n.text) && (s += i.lineHeight * (n.text.length - 1))) : s += a.top;
		let { titleX: c, titleY: l, maxWidth: u, rotation: d } = La(this, s, t, o);
		en(e, n.text, 0, 0, i, {
			color: n.color,
			maxWidth: u,
			rotation: d,
			textAlign: Ia(o, t, r),
			textBaseline: "middle",
			translation: [c, l]
		});
	}
	draw(e) {
		this._isVisible() && (this.drawBackground(), this.drawGrid(e), this.drawBorder(), this.drawTitle(), this.drawLabels(e));
	}
	_layers() {
		let t = this.options, n = t.ticks && t.ticks.z || 0, r = B(t.grid && t.grid.z, -1), i = B(t.border && t.border.z, 0);
		return !this._isVisible() || this.draw !== e.prototype.draw ? [{
			z: n,
			draw: (e) => {
				this.draw(e);
			}
		}] : [
			{
				z: r,
				draw: (e) => {
					this.drawBackground(), this.drawGrid(e), this.drawTitle();
				}
			},
			{
				z: i,
				draw: () => {
					this.drawBorder();
				}
			},
			{
				z: n,
				draw: (e) => {
					this.drawLabels(e);
				}
			}
		];
	}
	getMatchingVisibleMetas(e) {
		let t = this.chart.getSortedVisibleDatasetMetas(), n = this.axis + "AxisID", r = [], i, a;
		for (i = 0, a = t.length; i < a; ++i) {
			let a = t[i];
			a[n] !== this.id || e && a.type !== e || r.push(a);
		}
		return r;
	}
	_resolveTickFontOptions(e) {
		return un(this.options.ticks.setContext(this.getContext(e)).font);
	}
	_maxDigits() {
		let e = this._resolveTickFontOptions(0).lineHeight;
		return (this.isHorizontal() ? this.width : this.height) / e;
	}
}, za = class {
	constructor(e, t, n) {
		this.type = e, this.scope = t, this.override = n, this.items = Object.create(null);
	}
	isForType(e) {
		return Object.prototype.isPrototypeOf.call(this.type.prototype, e.prototype);
	}
	register(e) {
		let t = Object.getPrototypeOf(e), n;
		Ha(t) && (n = this.register(t));
		let r = this.items, i = e.id, a = this.scope + "." + i;
		if (!i) throw Error("class does not have id: " + e);
		return i in r || (r[i] = e, Ba(e, a, n), this.override && Y.override(e.id, e.overrides)), a;
	}
	get(e) {
		return this.items[e];
	}
	unregister(e) {
		let t = this.items, n = e.id, r = this.scope;
		n in t && delete t[n], r && n in Y[r] && (delete Y[r][n], this.override && delete Lt[n]);
	}
};
function Ba(e, t, n) {
	let r = we(Object.create(null), [
		n ? Y.get(n) : {},
		Y.get(t),
		e.defaults
	]);
	Y.set(t, r), e.defaultRoutes && Va(t, e.defaultRoutes), e.descriptors && Y.describe(t, e.descriptors);
}
function Va(e, t) {
	Object.keys(t).forEach((n) => {
		let r = n.split("."), i = r.pop(), a = [e].concat(r).join("."), o = t[n].split("."), s = o.pop(), c = o.join(".");
		Y.route(a, i, c, s);
	});
}
function Ha(e) {
	return "id" in e && "defaults" in e;
}
var Ua = /* #__PURE__ */ new class {
	constructor() {
		this.controllers = new za(Qr, "datasets", !0), this.elements = new za(va, "elements"), this.plugins = new za(Object, "plugins"), this.scales = new za(Ra, "scales"), this._typedRegistries = [
			this.controllers,
			this.scales,
			this.elements
		];
	}
	add(...e) {
		this._each("register", e);
	}
	remove(...e) {
		this._each("unregister", e);
	}
	addControllers(...e) {
		this._each("register", e, this.controllers);
	}
	addElements(...e) {
		this._each("register", e, this.elements);
	}
	addPlugins(...e) {
		this._each("register", e, this.plugins);
	}
	addScales(...e) {
		this._each("register", e, this.scales);
	}
	getController(e) {
		return this._get(e, this.controllers, "controller");
	}
	getElement(e) {
		return this._get(e, this.elements, "element");
	}
	getPlugin(e) {
		return this._get(e, this.plugins, "plugin");
	}
	getScale(e) {
		return this._get(e, this.scales, "scale");
	}
	removeControllers(...e) {
		this._each("unregister", e, this.controllers);
	}
	removeElements(...e) {
		this._each("unregister", e, this.elements);
	}
	removePlugins(...e) {
		this._each("unregister", e, this.plugins);
	}
	removeScales(...e) {
		this._each("unregister", e, this.scales);
	}
	_each(e, t, n) {
		[...t].forEach((t) => {
			let r = n || this._getRegistryForType(t);
			n || r.isForType(t) || r === this.plugins && t.id ? this._exec(e, r, t) : H(t, (t) => {
				let r = n || this._getRegistryForType(t);
				this._exec(e, r, t);
			});
		});
	}
	_exec(e, t, n) {
		let r = je(e);
		V(n["before" + r], [], n), t[e](n), V(n["after" + r], [], n);
	}
	_getRegistryForType(e) {
		for (let t = 0; t < this._typedRegistries.length; t++) {
			let n = this._typedRegistries[t];
			if (n.isForType(e)) return n;
		}
		return this.plugins;
	}
	_get(e, t, n) {
		let r = t.get(e);
		if (r === void 0) throw Error("\"" + e + "\" is not a registered " + n + ".");
		return r;
	}
}(), Wa = class {
	constructor() {
		this._init = [];
	}
	notify(e, t, n, r) {
		t === "beforeInit" && (this._init = this._createDescriptors(e, !0), this._notify(this._init, e, "install"));
		let i = r ? this._descriptors(e).filter(r) : this._descriptors(e), a = this._notify(i, e, t, n);
		return t === "afterDestroy" && (this._notify(i, e, "stop"), this._notify(this._init, e, "uninstall")), a;
	}
	_notify(e, t, n, r) {
		r ||= {};
		for (let i of e) {
			let e = i.plugin, a = e[n];
			if (V(a, [
				t,
				r,
				i.options
			], e) === !1 && r.cancelable) return !1;
		}
		return !0;
	}
	invalidate() {
		F(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
	}
	_descriptors(e) {
		if (this._cache) return this._cache;
		let t = this._cache = this._createDescriptors(e);
		return this._notifyStateChanges(e), t;
	}
	_createDescriptors(e, t) {
		let n = e && e.config, r = B(n.options && n.options.plugins, {}), i = Ga(n);
		return r === !1 && !t ? [] : qa(e, i, r, t);
	}
	_notifyStateChanges(e) {
		let t = this._oldCache || [], n = this._cache, r = (e, t) => e.filter((e) => !t.some((t) => e.plugin.id === t.plugin.id));
		this._notify(r(t, n), e, "stop"), this._notify(r(n, t), e, "start");
	}
};
function Ga(e) {
	let t = {}, n = [], r = Object.keys(Ua.plugins.items);
	for (let e = 0; e < r.length; e++) n.push(Ua.getPlugin(r[e]));
	let i = e.plugins || [];
	for (let e = 0; e < i.length; e++) {
		let r = i[e];
		n.indexOf(r) === -1 && (n.push(r), t[r.id] = !0);
	}
	return {
		plugins: n,
		localIds: t
	};
}
function Ka(e, t) {
	return !t && e === !1 ? null : e === !0 ? {} : e;
}
function qa(e, { plugins: t, localIds: n }, r, i) {
	let a = [], o = e.getContext();
	for (let s of t) {
		let t = s.id, c = Ka(r[t], i);
		c !== null && a.push({
			plugin: s,
			options: Ja(e.config, {
				plugin: s,
				local: n[t]
			}, c, o)
		});
	}
	return a;
}
function Ja(e, { plugin: t, local: n }, r, i) {
	let a = e.pluginScopeKeys(t), o = e.getOptionScopes(r, a);
	return n && t.defaults && o.push(t.defaults), e.createResolver(o, i, [""], {
		scriptable: !1,
		indexable: !1,
		allKeys: !0
	});
}
function Ya(e, t) {
	let n = Y.datasets[e] || {};
	return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || "x";
}
function Xa(e, t) {
	let n = e;
	return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function Za(e, t) {
	return e === t ? "_index_" : "_value_";
}
function Qa(e) {
	if (e === "x" || e === "y" || e === "r") return e;
}
function $a(e) {
	if (e === "top" || e === "bottom") return "x";
	if (e === "left" || e === "right") return "y";
}
function eo(e, ...t) {
	if (Qa(e)) return e;
	for (let n of t) {
		let t = n.axis || $a(n.position) || e.length > 1 && Qa(e[0].toLowerCase());
		if (t) return t;
	}
	throw Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function to(e, t, n) {
	if (n[t + "AxisID"] === e) return { axis: t };
}
function no(e, t) {
	if (t.data && t.data.datasets) {
		let n = t.data.datasets.filter((t) => t.xAxisID === e || t.yAxisID === e);
		if (n.length) return to(e, "x", n[0]) || to(e, "y", n[0]);
	}
	return {};
}
function ro(e, t) {
	let n = Lt[e.type] || { scales: {} }, r = t.scales || {}, i = Ya(e.type, t), a = Object.create(null);
	return Object.keys(r).forEach((t) => {
		let o = r[t];
		if (!R(o)) return console.error(`Invalid scale configuration for scale: ${t}`);
		if (o._proxy) return console.warn(`Ignoring resolver passed as options for scale: ${t}`);
		let s = eo(t, o, no(t, e), Y.scales[o.type]), c = Za(s, i), l = n.scales || {};
		a[t] = Te(Object.create(null), [
			{ axis: s },
			o,
			l[s],
			l[c]
		]);
	}), e.data.datasets.forEach((n) => {
		let i = n.type || e.type, o = n.indexAxis || Ya(i, t), s = (Lt[i] || {}).scales || {};
		Object.keys(s).forEach((e) => {
			let t = Xa(e, o), i = n[t + "AxisID"] || t;
			a[i] = a[i] || Object.create(null), Te(a[i], [
				{ axis: t },
				r[i],
				s[e]
			]);
		});
	}), Object.keys(a).forEach((e) => {
		let t = a[e];
		Te(t, [Y.scales[t.type], Y.scale]);
	}), a;
}
function io(e) {
	let t = e.options ||= {};
	t.plugins = B(t.plugins, {}), t.scales = ro(e, t);
}
function ao(e) {
	return e ||= {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function oo(e) {
	return e ||= {}, e.data = ao(e.data), io(e), e;
}
var so = /* @__PURE__ */ new Map(), co = /* @__PURE__ */ new Set();
function lo(e, t) {
	let n = so.get(e);
	return n || (n = t(), so.set(e, n), co.add(n)), n;
}
var uo = (e, t, n) => {
	let r = Ae(t, n);
	r !== void 0 && e.add(r);
}, fo = class {
	constructor(e) {
		this._config = oo(e), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
	}
	get platform() {
		return this._config.platform;
	}
	get type() {
		return this._config.type;
	}
	set type(e) {
		this._config.type = e;
	}
	get data() {
		return this._config.data;
	}
	set data(e) {
		this._config.data = ao(e);
	}
	get options() {
		return this._config.options;
	}
	set options(e) {
		this._config.options = e;
	}
	get plugins() {
		return this._config.plugins;
	}
	update() {
		let e = this._config;
		this.clearCache(), io(e);
	}
	clearCache() {
		this._scopeCache.clear(), this._resolverCache.clear();
	}
	datasetScopeKeys(e) {
		return lo(e, () => [[`datasets.${e}`, ""]]);
	}
	datasetAnimationScopeKeys(e, t) {
		return lo(`${e}.transition.${t}`, () => [[`datasets.${e}.transitions.${t}`, `transitions.${t}`], [`datasets.${e}`, ""]]);
	}
	datasetElementScopeKeys(e, t) {
		return lo(`${e}-${t}`, () => [[
			`datasets.${e}.elements.${t}`,
			`datasets.${e}`,
			`elements.${t}`,
			""
		]]);
	}
	pluginScopeKeys(e) {
		let t = e.id, n = this.type;
		return lo(`${n}-plugin-${t}`, () => [[`plugins.${t}`, ...e.additionalOptionScopes || []]]);
	}
	_cachedScopes(e, t) {
		let n = this._scopeCache, r = n.get(e);
		return (!r || t) && (r = /* @__PURE__ */ new Map(), n.set(e, r)), r;
	}
	getOptionScopes(e, t, n) {
		let { options: r, type: i } = this, a = this._cachedScopes(e, n), o = a.get(t);
		if (o) return o;
		let s = /* @__PURE__ */ new Set();
		t.forEach((t) => {
			e && (s.add(e), t.forEach((t) => uo(s, e, t))), t.forEach((e) => uo(s, r, e)), t.forEach((e) => uo(s, Lt[i] || {}, e)), t.forEach((e) => uo(s, Y, e)), t.forEach((e) => uo(s, Rt, e));
		});
		let c = Array.from(s);
		return c.length === 0 && c.push(Object.create(null)), co.has(t) && a.set(t, c), c;
	}
	chartOptionScopes() {
		let { options: e, type: t } = this;
		return [
			e,
			Lt[t] || {},
			Y.datasets[t] || {},
			{ type: t },
			Y,
			Rt
		];
	}
	resolveNamedOptions(e, t, n, r = [""]) {
		let i = { $shared: !0 }, { resolver: a, subPrefixes: o } = po(this._resolverCache, e, r), s = a;
		if (ho(a, t)) {
			i.$shared = !1, n = Ne(n) ? n() : n;
			let t = this.createResolver(e, n, o);
			s = hn(a, n, t);
		}
		for (let e of t) i[e] = s[e];
		return i;
	}
	createResolver(e, t, n = [""], r) {
		let { resolver: i } = po(this._resolverCache, e, n);
		return R(t) ? hn(i, t, void 0, r) : i;
	}
};
function po(e, t, n) {
	let r = e.get(t);
	r || (r = /* @__PURE__ */ new Map(), e.set(t, r));
	let i = n.join(), a = r.get(i);
	return a || (a = {
		resolver: mn(t, n),
		subPrefixes: n.filter((e) => !e.toLowerCase().includes("hover"))
	}, r.set(i, a)), a;
}
var mo = (e) => R(e) && Object.getOwnPropertyNames(e).some((t) => Ne(e[t]));
function ho(e, t) {
	let { isScriptable: n, isIndexable: r } = gn(e);
	for (let i of t) {
		let t = n(i), a = r(i), o = (a || t) && e[i];
		if (t && (Ne(o) || mo(o)) || a && I(o)) return !0;
	}
	return !1;
}
var go = "4.4.7", _o = [
	"top",
	"bottom",
	"left",
	"right",
	"chartArea"
];
function vo(e, t) {
	return e === "top" || e === "bottom" || _o.indexOf(e) === -1 && t === "x";
}
function yo(e, t) {
	return function(n, r) {
		return n[e] === r[e] ? n[t] - r[t] : n[e] - r[e];
	};
}
function bo(e) {
	let t = e.chart, n = t.options.animation;
	t.notifyPlugins("afterRender"), V(n && n.onComplete, [e], t);
}
function xo(e) {
	let t = e.chart, n = t.options.animation;
	V(n && n.onProgress, [e], t);
}
function So(e) {
	return Wn() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
var Co = {}, wo = (e) => {
	let t = So(e);
	return Object.values(Co).filter((e) => e.canvas === t).pop();
};
function To(e, t, n) {
	let r = Object.keys(e);
	for (let i of r) {
		let r = +i;
		if (r >= t) {
			let a = e[i];
			delete e[i], (n > 0 || r > t) && (e[r + n] = a);
		}
	}
}
function Eo(e, t, n, r) {
	return !n || e.type === "mouseout" ? null : r ? t : e;
}
function Do(e, t, n) {
	return e.options.clip ? e[n] : t[n];
}
function Oo(e, t) {
	let { xScale: n, yScale: r } = e;
	return n && r ? {
		left: Do(n, t, "left"),
		right: Do(n, t, "right"),
		top: Do(r, t, "top"),
		bottom: Do(r, t, "bottom")
	} : t;
}
var ko = class {
	static defaults = Y;
	static instances = Co;
	static overrides = Lt;
	static registry = Ua;
	static version = go;
	static getChart = wo;
	static register(...e) {
		Ua.add(...e), Ao();
	}
	static unregister(...e) {
		Ua.remove(...e), Ao();
	}
	constructor(e, t) {
		let n = this.config = new fo(t), r = So(e), i = wo(r);
		if (i) throw Error("Canvas is already in use. Chart with ID '" + i.id + "' must be destroyed before the canvas with ID '" + i.canvas.id + "' can be reused.");
		let a = n.createResolver(n.chartOptionScopes(), this.getContext());
		this.platform = new (n.platform || (_a(r)))(), this.platform.updateConfig(n);
		let o = this.platform.acquireContext(r, a.aspectRatio), s = o && o.canvas, c = s && s.height, l = s && s.width;
		this.id = ge(), this.ctx = o, this.canvas = s, this.width = l, this.height = c, this._options = a, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Wa(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = K((e) => this.update(e), a.resizeDelay || 0), this._dataChanges = [], Co[this.id] = this, !o || !s ? console.error("Failed to create chart: can't acquire context from the given item") : (Er.listen(this, "complete", bo), Er.listen(this, "progress", xo), this._initialize(), this.attached && this.update());
	}
	get aspectRatio() {
		let { options: { aspectRatio: e, maintainAspectRatio: t }, width: n, height: r, _aspectRatio: i } = this;
		return F(e) ? t && i ? i : r ? n / r : null : e;
	}
	get data() {
		return this.config.data;
	}
	set data(e) {
		this.config.data = e;
	}
	get options() {
		return this._options;
	}
	set options(e) {
		this.config.options = e;
	}
	get registry() {
		return Ua;
	}
	_initialize() {
		return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : rr(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
	}
	clear() {
		return Ut(this.canvas, this.ctx), this;
	}
	stop() {
		return Er.stop(this), this;
	}
	resize(e, t) {
		Er.running(this) ? this._resizeBeforeDraw = {
			width: e,
			height: t
		} : this._resize(e, t);
	}
	_resize(e, t) {
		let n = this.options, r = this.canvas, i = n.maintainAspectRatio && this.aspectRatio, a = this.platform.getMaximumSize(r, e, t, i), o = n.devicePixelRatio || this.platform.getDevicePixelRatio(), s = this.width ? "resize" : "attach";
		this.width = a.width, this.height = a.height, this._aspectRatio = this.aspectRatio, rr(this, o, !0) && (this.notifyPlugins("resize", { size: a }), V(n.onResize, [this, a], this), this.attached && this._doResize(s) && this.render());
	}
	ensureScalesHaveIDs() {
		H(this.options.scales || {}, (e, t) => {
			e.id = t;
		});
	}
	buildOrUpdateScales() {
		let e = this.options, t = e.scales, n = this.scales, r = Object.keys(n).reduce((e, t) => (e[t] = !1, e), {}), i = [];
		t && (i = i.concat(Object.keys(t).map((e) => {
			let n = t[e], r = eo(e, n), i = r === "r", a = r === "x";
			return {
				options: n,
				dposition: i ? "chartArea" : a ? "bottom" : "left",
				dtype: i ? "radialLinear" : a ? "category" : "linear"
			};
		}))), H(i, (t) => {
			let i = t.options, a = i.id, o = eo(a, i), s = B(i.type, t.dtype);
			(i.position === void 0 || vo(i.position, o) !== vo(t.dposition)) && (i.position = t.dposition), r[a] = !0;
			let c = null;
			a in n && n[a].type === s ? c = n[a] : (c = new (Ua.getScale(s))({
				id: a,
				type: s,
				ctx: this.ctx,
				chart: this
			}), n[c.id] = c), c.init(i, e);
		}), H(r, (e, t) => {
			e || delete n[t];
		}), H(n, (e) => {
			Ji.configure(this, e, e.options), Ji.addBox(this, e);
		});
	}
	_updateMetasets() {
		let e = this._metasets, t = this.data.datasets.length, n = e.length;
		if (e.sort((e, t) => e.index - t.index), n > t) {
			for (let e = t; e < n; ++e) this._destroyDatasetMeta(e);
			e.splice(t, n - t);
		}
		this._sortedMetasets = e.slice(0).sort(yo("order", "index"));
	}
	_removeUnreferencedMetasets() {
		let { _metasets: e, data: { datasets: t } } = this;
		e.length > t.length && delete this._stacks, e.forEach((e, n) => {
			t.filter((t) => t === e._dataset).length === 0 && this._destroyDatasetMeta(n);
		});
	}
	buildOrUpdateControllers() {
		let e = [], t = this.data.datasets, n, r;
		for (this._removeUnreferencedMetasets(), n = 0, r = t.length; n < r; n++) {
			let r = t[n], i = this.getDatasetMeta(n), a = r.type || this.config.type;
			if (i.type && i.type !== a && (this._destroyDatasetMeta(n), i = this.getDatasetMeta(n)), i.type = a, i.indexAxis = r.indexAxis || Ya(a, this.options), i.order = r.order || 0, i.index = n, i.label = "" + r.label, i.visible = this.isDatasetVisible(n), i.controller) i.controller.updateIndex(n), i.controller.linkScales();
			else {
				let t = Ua.getController(a), { datasetElementType: r, dataElementType: o } = Y.datasets[a];
				Object.assign(t, {
					dataElementType: Ua.getElement(o),
					datasetElementType: r && Ua.getElement(r)
				}), i.controller = new t(this, n), e.push(i.controller);
			}
		}
		return this._updateMetasets(), e;
	}
	_resetElements() {
		H(this.data.datasets, (e, t) => {
			this.getDatasetMeta(t).controller.reset();
		}, this);
	}
	reset() {
		this._resetElements(), this.notifyPlugins("reset");
	}
	update(e) {
		let t = this.config;
		t.update();
		let n = this._options = t.createResolver(t.chartOptionScopes(), this.getContext()), r = this._animationsDisabled = !n.animation;
		if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
			mode: e,
			cancelable: !0
		}) === !1) return;
		let i = this.buildOrUpdateControllers();
		this.notifyPlugins("beforeElementsUpdate");
		let a = 0;
		for (let e = 0, t = this.data.datasets.length; e < t; e++) {
			let { controller: t } = this.getDatasetMeta(e), n = !r && i.indexOf(t) === -1;
			t.buildOrUpdateElements(n), a = Math.max(+t.getMaxOverflow(), a);
		}
		a = this._minPadding = n.layout.autoPadding ? a : 0, this._updateLayout(a), r || H(i, (e) => {
			e.reset();
		}), this._updateDatasets(e), this.notifyPlugins("afterUpdate", { mode: e }), this._layers.sort(yo("z", "_idx"));
		let { _active: o, _lastEvent: s } = this;
		s ? this._eventHandler(s, !0) : o.length && this._updateHoverStyles(o, o, !0), this.render();
	}
	_updateScales() {
		H(this.scales, (e) => {
			Ji.removeBox(this, e);
		}), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
	}
	_checkEventBindings() {
		let e = this.options;
		Pe(new Set(Object.keys(this._listeners)), new Set(e.events)) && !!this._responsiveListeners === e.responsive || (this.unbindEvents(), this.bindEvents());
	}
	_updateHiddenIndices() {
		let { _hiddenIndices: e } = this, t = this._getUniformDataChanges() || [];
		for (let { method: n, start: r, count: i } of t) To(e, r, n === "_removeElements" ? -i : i);
	}
	_getUniformDataChanges() {
		let e = this._dataChanges;
		if (!e || !e.length) return;
		this._dataChanges = [];
		let t = this.data.datasets.length, n = (t) => new Set(e.filter((e) => e[0] === t).map((e, t) => t + "," + e.splice(1).join(","))), r = n(0);
		for (let e = 1; e < t; e++) if (!Pe(r, n(e))) return;
		return Array.from(r).map((e) => e.split(",")).map((e) => ({
			method: e[1],
			start: +e[2],
			count: +e[3]
		}));
	}
	_updateLayout(e) {
		if (this.notifyPlugins("beforeLayout", { cancelable: !0 }) === !1) return;
		Ji.update(this, this.width, this.height, e);
		let t = this.chartArea, n = t.width <= 0 || t.height <= 0;
		this._layers = [], H(this.boxes, (e) => {
			n && e.position === "chartArea" || (e.configure && e.configure(), this._layers.push(...e._layers()));
		}, this), this._layers.forEach((e, t) => {
			e._idx = t;
		}), this.notifyPlugins("afterLayout");
	}
	_updateDatasets(e) {
		if (this.notifyPlugins("beforeDatasetsUpdate", {
			mode: e,
			cancelable: !0
		}) !== !1) {
			for (let e = 0, t = this.data.datasets.length; e < t; ++e) this.getDatasetMeta(e).controller.configure();
			for (let t = 0, n = this.data.datasets.length; t < n; ++t) this._updateDataset(t, Ne(e) ? e({ datasetIndex: t }) : e);
			this.notifyPlugins("afterDatasetsUpdate", { mode: e });
		}
	}
	_updateDataset(e, t) {
		let n = this.getDatasetMeta(e), r = {
			meta: n,
			index: e,
			mode: t,
			cancelable: !0
		};
		this.notifyPlugins("beforeDatasetUpdate", r) !== !1 && (n.controller._update(t), r.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", r));
	}
	render() {
		this.notifyPlugins("beforeRender", { cancelable: !0 }) !== !1 && (Er.has(this) ? this.attached && !Er.running(this) && Er.start(this) : (this.draw(), bo({ chart: this })));
	}
	draw() {
		let e;
		if (this._resizeBeforeDraw) {
			let { width: e, height: t } = this._resizeBeforeDraw;
			this._resizeBeforeDraw = null, this._resize(e, t);
		}
		if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", { cancelable: !0 }) === !1) return;
		let t = this._layers;
		for (e = 0; e < t.length && t[e].z <= 0; ++e) t[e].draw(this.chartArea);
		for (this._drawDatasets(); e < t.length; ++e) t[e].draw(this.chartArea);
		this.notifyPlugins("afterDraw");
	}
	_getSortedDatasetMetas(e) {
		let t = this._sortedMetasets, n = [], r, i;
		for (r = 0, i = t.length; r < i; ++r) {
			let i = t[r];
			(!e || i.visible) && n.push(i);
		}
		return n;
	}
	getSortedVisibleDatasetMetas() {
		return this._getSortedDatasetMetas(!0);
	}
	_drawDatasets() {
		if (this.notifyPlugins("beforeDatasetsDraw", { cancelable: !0 }) === !1) return;
		let e = this.getSortedVisibleDatasetMetas();
		for (let t = e.length - 1; t >= 0; --t) this._drawDataset(e[t]);
		this.notifyPlugins("afterDatasetsDraw");
	}
	_drawDataset(e) {
		let t = this.ctx, n = e._clip, r = !n.disabled, i = Oo(e, this.chartArea), a = {
			meta: e,
			index: e.index,
			cancelable: !0
		};
		this.notifyPlugins("beforeDatasetDraw", a) !== !1 && (r && qt(t, {
			left: n.left === !1 ? 0 : i.left - n.left,
			right: n.right === !1 ? this.width : i.right + n.right,
			top: n.top === !1 ? 0 : i.top - n.top,
			bottom: n.bottom === !1 ? this.height : i.bottom + n.bottom
		}), e.controller.draw(), r && Jt(t), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a));
	}
	isPointInArea(e) {
		return Kt(e, this.chartArea, this._minPadding);
	}
	getElementsAtEventForMode(e, t, n, r) {
		let i = ji.modes[t];
		return typeof i == "function" ? i(this, e, n, r) : [];
	}
	getDatasetMeta(e) {
		let t = this.data.datasets[e], n = this._metasets, r = n.filter((e) => e && e._dataset === t).pop();
		return r || (r = {
			type: null,
			data: [],
			dataset: null,
			controller: null,
			hidden: null,
			xAxisID: null,
			yAxisID: null,
			order: t && t.order || 0,
			index: e,
			_dataset: t,
			_parsed: [],
			_sorted: !1
		}, n.push(r)), r;
	}
	getContext() {
		return this.$context ||= pn(null, {
			chart: this,
			type: "chart"
		});
	}
	getVisibleDatasetCount() {
		return this.getSortedVisibleDatasetMetas().length;
	}
	isDatasetVisible(e) {
		let t = this.data.datasets[e];
		if (!t) return !1;
		let n = this.getDatasetMeta(e);
		return typeof n.hidden == "boolean" ? !n.hidden : !t.hidden;
	}
	setDatasetVisibility(e, t) {
		let n = this.getDatasetMeta(e);
		n.hidden = !t;
	}
	toggleDataVisibility(e) {
		this._hiddenIndices[e] = !this._hiddenIndices[e];
	}
	getDataVisibility(e) {
		return !this._hiddenIndices[e];
	}
	_updateVisibility(e, t, n) {
		let r = n ? "show" : "hide", i = this.getDatasetMeta(e), a = i.controller._resolveAnimations(void 0, r);
		Me(t) ? (i.data[t].hidden = !n, this.update()) : (this.setDatasetVisibility(e, n), a.update(i, { visible: n }), this.update((t) => t.datasetIndex === e ? r : void 0));
	}
	hide(e, t) {
		this._updateVisibility(e, t, !1);
	}
	show(e, t) {
		this._updateVisibility(e, t, !0);
	}
	_destroyDatasetMeta(e) {
		let t = this._metasets[e];
		t && t.controller && t.controller._destroy(), delete this._metasets[e];
	}
	_stop() {
		let e, t;
		for (this.stop(), Er.remove(this), e = 0, t = this.data.datasets.length; e < t; ++e) this._destroyDatasetMeta(e);
	}
	destroy() {
		this.notifyPlugins("beforeDestroy");
		let { canvas: e, ctx: t } = this;
		this._stop(), this.config.clearCache(), e && (this.unbindEvents(), Ut(e, t), this.platform.releaseContext(t), this.canvas = null, this.ctx = null), delete Co[this.id], this.notifyPlugins("afterDestroy");
	}
	toBase64Image(...e) {
		return this.canvas.toDataURL(...e);
	}
	bindEvents() {
		this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
	}
	bindUserEvents() {
		let e = this._listeners, t = this.platform, n = (n, r) => {
			t.addEventListener(this, n, r), e[n] = r;
		}, r = (e, t, n) => {
			e.offsetX = t, e.offsetY = n, this._eventHandler(e);
		};
		H(this.options.events, (e) => n(e, r));
	}
	bindResponsiveEvents() {
		this._responsiveListeners ||= {};
		let e = this._responsiveListeners, t = this.platform, n = (n, r) => {
			t.addEventListener(this, n, r), e[n] = r;
		}, r = (n, r) => {
			e[n] && (t.removeEventListener(this, n, r), delete e[n]);
		}, i = (e, t) => {
			this.canvas && this.resize(e, t);
		}, a, o = () => {
			r("attach", o), this.attached = !0, this.resize(), n("resize", i), n("detach", a);
		};
		a = () => {
			this.attached = !1, r("resize", i), this._stop(), this._resize(0, 0), n("attach", o);
		}, t.isAttached(this.canvas) ? o() : a();
	}
	unbindEvents() {
		H(this._listeners, (e, t) => {
			this.platform.removeEventListener(this, t, e);
		}), this._listeners = {}, H(this._responsiveListeners, (e, t) => {
			this.platform.removeEventListener(this, t, e);
		}), this._responsiveListeners = void 0;
	}
	updateHoverStyle(e, t, n) {
		let r = n ? "set" : "remove", i, a, o, s;
		for (t === "dataset" && (i = this.getDatasetMeta(e[0].datasetIndex), i.controller["_" + r + "DatasetHoverStyle"]()), o = 0, s = e.length; o < s; ++o) {
			a = e[o];
			let t = a && this.getDatasetMeta(a.datasetIndex).controller;
			t && t[r + "HoverStyle"](a.element, a.datasetIndex, a.index);
		}
	}
	getActiveElements() {
		return this._active || [];
	}
	setActiveElements(e) {
		let t = this._active || [], n = e.map(({ datasetIndex: e, index: t }) => {
			let n = this.getDatasetMeta(e);
			if (!n) throw Error("No dataset found at index " + e);
			return {
				datasetIndex: e,
				element: n.data[t],
				index: t
			};
		});
		be(n, t) || (this._active = n, this._lastEvent = null, this._updateHoverStyles(n, t));
	}
	notifyPlugins(e, t, n) {
		return this._plugins.notify(this, e, t, n);
	}
	isPluginEnabled(e) {
		return this._plugins._cache.filter((t) => t.plugin.id === e).length === 1;
	}
	_updateHoverStyles(e, t, n) {
		let r = this.options.hover, i = (e, t) => e.filter((e) => !t.some((t) => e.datasetIndex === t.datasetIndex && e.index === t.index)), a = i(t, e), o = n ? e : i(e, t);
		a.length && this.updateHoverStyle(a, r.mode, !1), o.length && r.mode && this.updateHoverStyle(o, r.mode, !0);
	}
	_eventHandler(e, t) {
		let n = {
			event: e,
			replay: t,
			cancelable: !0,
			inChartArea: this.isPointInArea(e)
		}, r = (t) => (t.options.events || this.options.events).includes(e.native.type);
		if (this.notifyPlugins("beforeEvent", n, r) === !1) return;
		let i = this._handleEvent(e, t, n.inChartArea);
		return n.cancelable = !1, this.notifyPlugins("afterEvent", n, r), (i || n.changed) && this.render(), this;
	}
	_handleEvent(e, t, n) {
		let { _active: r = [], options: i } = this, a = t, o = this._getActiveElements(e, r, n, a), s = Fe(e), c = Eo(e, this._lastEvent, n, s);
		n && (this._lastEvent = null, V(i.onHover, [
			e,
			o,
			this
		], this), s && V(i.onClick, [
			e,
			o,
			this
		], this));
		let l = !be(o, r);
		return (l || t) && (this._active = o, this._updateHoverStyles(o, r, t)), this._lastEvent = c, l;
	}
	_getActiveElements(e, t, n, r) {
		if (e.type === "mouseout") return [];
		if (!n) return t;
		let i = this.options.hover;
		return this.getElementsAtEventForMode(e, i.mode, i, r);
	}
};
function Ao() {
	return H(ko.instances, (e) => e._plugins.invalidate());
}
function jo(e, t, n) {
	let { startAngle: r, pixelMargin: i, x: a, y: o, outerRadius: s, innerRadius: c } = t, l = i / s;
	e.beginPath(), e.arc(a, o, s, r - l, n + l), c > i ? (l = i / c, e.arc(a, o, c, n + l, r - l, !0)) : e.arc(a, o, i, n + ze, r - ze), e.closePath(), e.clip();
}
function Mo(e) {
	return on(e, [
		"outerStart",
		"outerEnd",
		"innerStart",
		"innerEnd"
	]);
}
function No(e, t, n, r) {
	let i = Mo(e.options.borderRadius), a = (n - t) / 2, o = Math.min(a, r * t / 2), s = (e) => {
		let t = (n - Math.min(a, e)) * r / 2;
		return rt(e, 0, Math.min(a, t));
	};
	return {
		outerStart: s(i.outerStart),
		outerEnd: s(i.outerEnd),
		innerStart: rt(i.innerStart, 0, o),
		innerEnd: rt(i.innerEnd, 0, o)
	};
}
function Po(e, t, n, r) {
	return {
		x: n + e * Math.cos(t),
		y: r + e * Math.sin(t)
	};
}
function Fo(e, t, n, r, i, a) {
	let { x: o, y: s, startAngle: c, pixelMargin: l, innerRadius: u } = t, d = Math.max(t.outerRadius + r + n - l, 0), f = u > 0 ? u + r + n + l : 0, p = 0, m = i - c;
	if (r) {
		let e = ((u > 0 ? u - r : 0) + (d > 0 ? d - r : 0)) / 2;
		p = (m - (e === 0 ? m : m * e / (e + r))) / 2;
	}
	let h = (m - Math.max(.001, m * d - n / U) / d) / 2, g = c + h + p, _ = i - h - p, { outerStart: v, outerEnd: y, innerStart: b, innerEnd: x } = No(t, f, d, _ - g), S = d - v, C = d - y, w = g + v / S, T = _ - y / C, E = f + b, ee = f + x, te = g + b / E, ne = _ - x / ee;
	if (e.beginPath(), a) {
		let t = (w + T) / 2;
		if (e.arc(o, s, d, w, t), e.arc(o, s, d, t, T), y > 0) {
			let t = Po(C, T, o, s);
			e.arc(t.x, t.y, y, T, _ + ze);
		}
		let n = Po(ee, _, o, s);
		if (e.lineTo(n.x, n.y), x > 0) {
			let t = Po(ee, ne, o, s);
			e.arc(t.x, t.y, x, _ + ze, ne + Math.PI);
		}
		let r = (_ - x / f + (g + b / f)) / 2;
		if (e.arc(o, s, f, _ - x / f, r, !0), e.arc(o, s, f, r, g + b / f, !0), b > 0) {
			let t = Po(E, te, o, s);
			e.arc(t.x, t.y, b, te + Math.PI, g - ze);
		}
		let i = Po(S, g, o, s);
		if (e.lineTo(i.x, i.y), v > 0) {
			let t = Po(S, w, o, s);
			e.arc(t.x, t.y, v, g - ze, w);
		}
	} else {
		e.moveTo(o, s);
		let t = Math.cos(w) * d + o, n = Math.sin(w) * d + s;
		e.lineTo(t, n);
		let r = Math.cos(T) * d + o, i = Math.sin(T) * d + s;
		e.lineTo(r, i);
	}
	e.closePath();
}
function Io(e, t, n, r, i) {
	let { fullCircles: a, startAngle: o, circumference: s } = t, c = t.endAngle;
	if (a) {
		Fo(e, t, n, r, c, i);
		for (let t = 0; t < a; ++t) e.fill();
		isNaN(s) || (c = o + (s % W || W));
	}
	return Fo(e, t, n, r, c, i), e.fill(), c;
}
function Lo(e, t, n, r, i) {
	let { fullCircles: a, startAngle: o, circumference: s, options: c } = t, { borderWidth: l, borderJoinStyle: u, borderDash: d, borderDashOffset: f } = c, p = c.borderAlign === "inner";
	if (!l) return;
	e.setLineDash(d || []), e.lineDashOffset = f, p ? (e.lineWidth = l * 2, e.lineJoin = u || "round") : (e.lineWidth = l, e.lineJoin = u || "bevel");
	let m = t.endAngle;
	if (a) {
		Fo(e, t, n, r, m, i);
		for (let t = 0; t < a; ++t) e.stroke();
		isNaN(s) || (m = o + (s % W || W));
	}
	p && jo(e, t, m), a || (Fo(e, t, n, r, m, i), e.stroke());
}
var Ro = class extends va {
	static id = "arc";
	static defaults = {
		borderAlign: "center",
		borderColor: "#fff",
		borderDash: [],
		borderDashOffset: 0,
		borderJoinStyle: void 0,
		borderRadius: 0,
		borderWidth: 2,
		offset: 0,
		spacing: 0,
		angle: void 0,
		circular: !0
	};
	static defaultRoutes = { backgroundColor: "backgroundColor" };
	static descriptors = {
		_scriptable: !0,
		_indexable: (e) => e !== "borderDash"
	};
	circumference;
	endAngle;
	fullCircles;
	innerRadius;
	outerRadius;
	pixelMargin;
	startAngle;
	constructor(e) {
		super(), this.options = void 0, this.circumference = void 0, this.startAngle = void 0, this.endAngle = void 0, this.innerRadius = void 0, this.outerRadius = void 0, this.pixelMargin = 0, this.fullCircles = 0, e && Object.assign(this, e);
	}
	inRange(e, t, n) {
		let { angle: r, distance: i } = Qe(this.getProps(["x", "y"], n), {
			x: e,
			y: t
		}), { startAngle: a, endAngle: o, innerRadius: s, outerRadius: c, circumference: l } = this.getProps([
			"startAngle",
			"endAngle",
			"innerRadius",
			"outerRadius",
			"circumference"
		], n), u = (this.options.spacing + this.options.borderWidth) / 2, d = B(l, o - a), f = nt(r, a, o) && a !== o, p = d >= W || f, m = at(i, s + u, c + u);
		return p && m;
	}
	getCenterPoint(e) {
		let { x: t, y: n, startAngle: r, endAngle: i, innerRadius: a, outerRadius: o } = this.getProps([
			"x",
			"y",
			"startAngle",
			"endAngle",
			"innerRadius",
			"outerRadius"
		], e), { offset: s, spacing: c } = this.options, l = (r + i) / 2, u = (a + o + c + s) / 2;
		return {
			x: t + Math.cos(l) * u,
			y: n + Math.sin(l) * u
		};
	}
	tooltipPosition(e) {
		return this.getCenterPoint(e);
	}
	draw(e) {
		let { options: t, circumference: n } = this, r = (t.offset || 0) / 4, i = (t.spacing || 0) / 2, a = t.circular;
		if (this.pixelMargin = t.borderAlign === "inner" ? .33 : 0, this.fullCircles = n > W ? Math.floor(n / W) : 0, n === 0 || this.innerRadius < 0 || this.outerRadius < 0) return;
		e.save();
		let o = (this.startAngle + this.endAngle) / 2;
		e.translate(Math.cos(o) * r, Math.sin(o) * r);
		let s = r * (1 - Math.sin(Math.min(U, n || 0)));
		e.fillStyle = t.backgroundColor, e.strokeStyle = t.borderColor, Io(e, this, s, i, a), Lo(e, this, s, i, a), e.restore();
	}
};
function zo(e, t, n = t) {
	e.lineCap = B(n.borderCapStyle, t.borderCapStyle), e.setLineDash(B(n.borderDash, t.borderDash)), e.lineDashOffset = B(n.borderDashOffset, t.borderDashOffset), e.lineJoin = B(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = B(n.borderWidth, t.borderWidth), e.strokeStyle = B(n.borderColor, t.borderColor);
}
function Bo(e, t, n) {
	e.lineTo(n.x, n.y);
}
function Vo(e) {
	return e.stepped ? Yt : e.tension || e.cubicInterpolationMode === "monotone" ? Xt : Bo;
}
function Ho(e, t, n = {}) {
	let r = e.length, { start: i = 0, end: a = r - 1 } = n, { start: o, end: s } = t, c = Math.max(i, o), l = Math.min(a, s), u = i < o && a < o || i > s && a > s;
	return {
		count: r,
		start: c,
		loop: t.loop,
		ilen: l < c && !u ? r + l - c : l - c
	};
}
function Uo(e, t, n, r) {
	let { points: i, options: a } = t, { count: o, start: s, loop: c, ilen: l } = Ho(i, n, r), u = Vo(a), { move: d = !0, reverse: f } = r || {}, p, m, h;
	for (p = 0; p <= l; ++p) m = i[(s + (f ? l - p : p)) % o], m.skip || (d ? (e.moveTo(m.x, m.y), d = !1) : u(e, h, m, f, a.stepped), h = m);
	return c && (m = i[(s + (f ? l : 0)) % o], u(e, h, m, f, a.stepped)), !!c;
}
function Wo(e, t, n, r) {
	let i = t.points, { count: a, start: o, ilen: s } = Ho(i, n, r), { move: c = !0, reverse: l } = r || {}, u = 0, d = 0, f, p, m, h, g, _, v = (e) => (o + (l ? s - e : e)) % a, y = () => {
		h !== g && (e.lineTo(u, g), e.lineTo(u, h), e.lineTo(u, _));
	};
	for (c && (p = i[v(0)], e.moveTo(p.x, p.y)), f = 0; f <= s; ++f) {
		if (p = i[v(f)], p.skip) continue;
		let t = p.x, n = p.y, r = t | 0;
		r === m ? (n < h ? h = n : n > g && (g = n), u = (d * u + t) / ++d) : (y(), e.lineTo(t, n), m = r, d = 0, h = g = n), _ = n;
	}
	y();
}
function Go(e) {
	let t = e.options, n = t.borderDash && t.borderDash.length;
	return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? Wo : Uo;
}
function Ko(e) {
	return e.stepped ? sr : e.tension || e.cubicInterpolationMode === "monotone" ? cr : or;
}
function qo(e, t, n, r) {
	let i = t._path;
	i || (i = t._path = new Path2D(), t.path(i, n, r) && i.closePath()), zo(e, t.options), e.stroke(i);
}
function Jo(e, t, n, r) {
	let { segments: i, options: a } = t, o = Go(t);
	for (let s of i) zo(e, a, s.style), e.beginPath(), o(e, t, s, {
		start: n,
		end: n + r - 1
	}) && e.closePath(), e.stroke();
}
var Yo = typeof Path2D == "function";
function Xo(e, t, n, r) {
	Yo && !t.options.segment ? qo(e, t, n, r) : Jo(e, t, n, r);
}
var Zo = class extends va {
	static id = "line";
	static defaults = {
		borderCapStyle: "butt",
		borderDash: [],
		borderDashOffset: 0,
		borderJoinStyle: "miter",
		borderWidth: 3,
		capBezierPoints: !0,
		cubicInterpolationMode: "default",
		fill: !1,
		spanGaps: !1,
		stepped: !1,
		tension: 0
	};
	static defaultRoutes = {
		backgroundColor: "backgroundColor",
		borderColor: "borderColor"
	};
	static descriptors = {
		_scriptable: !0,
		_indexable: (e) => e !== "borderDash" && e !== "fill"
	};
	constructor(e) {
		super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, e && Object.assign(this, e);
	}
	updateControlPoints(e, t) {
		let n = this.options;
		if ((n.tension || n.cubicInterpolationMode === "monotone") && !n.stepped && !this._pointsUpdated) {
			let r = n.spanGaps ? this._loop : this._fullLoop;
			Un(this._points, n, e, r, t), this._pointsUpdated = !0;
		}
	}
	set points(e) {
		this._points = e, delete this._segments, delete this._path, this._pointsUpdated = !1;
	}
	get points() {
		return this._points;
	}
	get segments() {
		return this._segments ||= xr(this, this.options.segment);
	}
	first() {
		let e = this.segments, t = this.points;
		return e.length && t[e[0].start];
	}
	last() {
		let e = this.segments, t = this.points, n = e.length;
		return n && t[e[n - 1].end];
	}
	interpolate(e, t) {
		let n = this.options, r = e[t], i = this.points, a = vr(this, {
			property: t,
			start: r,
			end: r
		});
		if (!a.length) return;
		let o = [], s = Ko(n), c, l;
		for (c = 0, l = a.length; c < l; ++c) {
			let { start: l, end: u } = a[c], d = i[l], f = i[u];
			if (d === f) {
				o.push(d);
				continue;
			}
			let p = s(d, f, Math.abs((r - d[t]) / (f[t] - d[t])), n.stepped);
			p[t] = e[t], o.push(p);
		}
		return o.length === 1 ? o[0] : o;
	}
	pathSegment(e, t, n) {
		return Go(this)(e, this, t, n);
	}
	path(e, t, n) {
		let r = this.segments, i = Go(this), a = this._loop;
		t ||= 0, n ||= this.points.length - t;
		for (let o of r) a &= i(e, this, o, {
			start: t,
			end: t + n - 1
		});
		return !!a;
	}
	draw(e, t, n, r) {
		let i = this.options || {};
		(this.points || []).length && i.borderWidth && (e.save(), Xo(e, this, n, r), e.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
	}
};
function Qo(e, t, n, r) {
	let i = e.options, { [n]: a } = e.getProps([n], r);
	return Math.abs(t - a) < i.radius + i.hitRadius;
}
var $o = class extends va {
	static id = "point";
	parsed;
	skip;
	stop;
	static defaults = {
		borderWidth: 1,
		hitRadius: 1,
		hoverBorderWidth: 1,
		hoverRadius: 4,
		pointStyle: "circle",
		radius: 3,
		rotation: 0
	};
	static defaultRoutes = {
		backgroundColor: "backgroundColor",
		borderColor: "borderColor"
	};
	constructor(e) {
		super(), this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, e && Object.assign(this, e);
	}
	inRange(e, t, n) {
		let r = this.options, { x: i, y: a } = this.getProps(["x", "y"], n);
		return (e - i) ** 2 + (t - a) ** 2 < (r.hitRadius + r.radius) ** 2;
	}
	inXRange(e, t) {
		return Qo(this, e, "x", t);
	}
	inYRange(e, t) {
		return Qo(this, e, "y", t);
	}
	getCenterPoint(e) {
		let { x: t, y: n } = this.getProps(["x", "y"], e);
		return {
			x: t,
			y: n
		};
	}
	size(e) {
		e = e || this.options || {};
		let t = e.radius || 0;
		t = Math.max(t, t && e.hoverRadius || 0);
		let n = t && e.borderWidth || 0;
		return (t + n) * 2;
	}
	draw(e, t) {
		let n = this.options;
		this.skip || n.radius < .1 || !Kt(this, t, this.size(n) / 2) || (e.strokeStyle = n.borderColor, e.lineWidth = n.borderWidth, e.fillStyle = n.backgroundColor, Wt(e, n, this.x, this.y));
	}
	getRange() {
		let e = this.options || {};
		return e.radius + e.hitRadius;
	}
};
function es(e, t) {
	let { x: n, y: r, base: i, width: a, height: o } = e.getProps([
		"x",
		"y",
		"base",
		"width",
		"height"
	], t), s, c, l, u, d;
	return e.horizontal ? (d = o / 2, s = Math.min(n, i), c = Math.max(n, i), l = r - d, u = r + d) : (d = a / 2, s = n - d, c = n + d, l = Math.min(r, i), u = Math.max(r, i)), {
		left: s,
		top: l,
		right: c,
		bottom: u
	};
}
function ts(e, t, n, r) {
	return e ? 0 : rt(t, n, r);
}
function ns(e, t, n) {
	let r = e.options.borderWidth, i = e.borderSkipped, a = sn(r);
	return {
		t: ts(i.top, a.top, 0, n),
		r: ts(i.right, a.right, 0, t),
		b: ts(i.bottom, a.bottom, 0, n),
		l: ts(i.left, a.left, 0, t)
	};
}
function rs(e, t, n) {
	let { enableBorderRadius: r } = e.getProps(["enableBorderRadius"]), i = e.options.borderRadius, a = cn(i), o = Math.min(t, n), s = e.borderSkipped, c = r || R(i);
	return {
		topLeft: ts(!c || s.top || s.left, a.topLeft, 0, o),
		topRight: ts(!c || s.top || s.right, a.topRight, 0, o),
		bottomLeft: ts(!c || s.bottom || s.left, a.bottomLeft, 0, o),
		bottomRight: ts(!c || s.bottom || s.right, a.bottomRight, 0, o)
	};
}
function is(e) {
	let t = es(e), n = t.right - t.left, r = t.bottom - t.top, i = ns(e, n / 2, r / 2), a = rs(e, n / 2, r / 2);
	return {
		outer: {
			x: t.left,
			y: t.top,
			w: n,
			h: r,
			radius: a
		},
		inner: {
			x: t.left + i.l,
			y: t.top + i.t,
			w: n - i.l - i.r,
			h: r - i.t - i.b,
			radius: {
				topLeft: Math.max(0, a.topLeft - Math.max(i.t, i.l)),
				topRight: Math.max(0, a.topRight - Math.max(i.t, i.r)),
				bottomLeft: Math.max(0, a.bottomLeft - Math.max(i.b, i.l)),
				bottomRight: Math.max(0, a.bottomRight - Math.max(i.b, i.r))
			}
		}
	};
}
function as(e, t, n, r) {
	let i = t === null, a = n === null, o = e && !(i && a) && es(e, r);
	return o && (i || at(t, o.left, o.right)) && (a || at(n, o.top, o.bottom));
}
function os(e) {
	return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function ss(e, t) {
	e.rect(t.x, t.y, t.w, t.h);
}
function cs(e, t, n = {}) {
	let r = e.x === n.x ? 0 : -t, i = e.y === n.y ? 0 : -t, a = (e.x + e.w === n.x + n.w ? 0 : t) - r, o = (e.y + e.h === n.y + n.h ? 0 : t) - i;
	return {
		x: e.x + r,
		y: e.y + i,
		w: e.w + a,
		h: e.h + o,
		radius: e.radius
	};
}
var ls = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	ArcElement: Ro,
	BarElement: class extends va {
		static id = "bar";
		static defaults = {
			borderSkipped: "start",
			borderWidth: 0,
			borderRadius: 0,
			inflateAmount: "auto",
			pointStyle: void 0
		};
		static defaultRoutes = {
			backgroundColor: "backgroundColor",
			borderColor: "borderColor"
		};
		constructor(e) {
			super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, e && Object.assign(this, e);
		}
		draw(e) {
			let { inflateAmount: t, options: { borderColor: n, backgroundColor: r } } = this, { inner: i, outer: a } = is(this), o = os(a.radius) ? tn : ss;
			e.save(), (a.w !== i.w || a.h !== i.h) && (e.beginPath(), o(e, cs(a, t, i)), e.clip(), o(e, cs(i, -t, a)), e.fillStyle = n, e.fill("evenodd")), e.beginPath(), o(e, cs(i, t)), e.fillStyle = r, e.fill(), e.restore();
		}
		inRange(e, t, n) {
			return as(this, e, t, n);
		}
		inXRange(e, t) {
			return as(this, e, null, t);
		}
		inYRange(e, t) {
			return as(this, null, e, t);
		}
		getCenterPoint(e) {
			let { x: t, y: n, base: r, horizontal: i } = this.getProps([
				"x",
				"y",
				"base",
				"horizontal"
			], e);
			return {
				x: i ? (t + r) / 2 : t,
				y: i ? n : (n + r) / 2
			};
		}
		getRange(e) {
			return e === "x" ? this.width / 2 : this.height / 2;
		}
	},
	LineElement: Zo,
	PointElement: $o
}), us = [
	"rgb(54, 162, 235)",
	"rgb(255, 99, 132)",
	"rgb(255, 159, 64)",
	"rgb(255, 205, 86)",
	"rgb(75, 192, 192)",
	"rgb(153, 102, 255)",
	"rgb(201, 203, 207)"
], ds = /* #__PURE__ */ us.map((e) => e.replace("rgb(", "rgba(").replace(")", ", 0.5)"));
function fs(e) {
	return us[e % us.length];
}
function ps(e) {
	return ds[e % ds.length];
}
function ms(e, t) {
	return e.borderColor = fs(t), e.backgroundColor = ps(t), ++t;
}
function hs(e, t) {
	return e.backgroundColor = e.data.map(() => fs(t++)), t;
}
function gs(e, t) {
	return e.backgroundColor = e.data.map(() => ps(t++)), t;
}
function _s(e) {
	let t = 0;
	return (n, r) => {
		let i = e.getDatasetMeta(r).controller;
		i instanceof _i ? t = hs(n, t) : i instanceof yi ? t = gs(n, t) : i && (t = ms(n, t));
	};
}
function vs(e) {
	let t;
	for (t in e) if (e[t].borderColor || e[t].backgroundColor) return !0;
	return !1;
}
function ys(e) {
	return e && (e.borderColor || e.backgroundColor);
}
function bs() {
	return Y.borderColor !== "rgba(0,0,0,0.1)" || Y.backgroundColor !== "rgba(0,0,0,0.1)";
}
var xs = {
	id: "colors",
	defaults: {
		enabled: !0,
		forceOverride: !1
	},
	beforeLayout(e, t, n) {
		if (!n.enabled) return;
		let { data: { datasets: r }, options: i } = e.config, { elements: a } = i, o = vs(r) || ys(i) || a && vs(a) || bs();
		if (!n.forceOverride && o) return;
		let s = _s(e);
		r.forEach(s);
	}
};
function Ss(e, t, n, r, i) {
	let a = i.samples || r;
	if (a >= n) return e.slice(t, t + n);
	let o = [], s = (n - 2) / (a - 2), c = 0, l = t + n - 1, u = t, d, f, p, m, h;
	for (o[c++] = e[u], d = 0; d < a - 2; d++) {
		let r = 0, i = 0, a, l = Math.floor((d + 1) * s) + 1 + t, g = Math.min(Math.floor((d + 2) * s) + 1, n) + t, _ = g - l;
		for (a = l; a < g; a++) r += e[a].x, i += e[a].y;
		r /= _, i /= _;
		let v = Math.floor(d * s) + 1 + t, y = Math.min(Math.floor((d + 1) * s) + 1, n) + t, { x: b, y: x } = e[u];
		for (p = m = -1, a = v; a < y; a++) m = .5 * Math.abs((b - r) * (e[a].y - x) - (b - e[a].x) * (i - x)), m > p && (p = m, f = e[a], h = a);
		o[c++] = f, u = h;
	}
	return o[c++] = e[l], o;
}
function Cs(e, t, n, r) {
	let i = 0, a = 0, o, s, c, l, u, d, f, p, m, h, g = [], _ = t + n - 1, v = e[t].x, y = e[_].x - v;
	for (o = t; o < t + n; ++o) {
		s = e[o], c = (s.x - v) / y * r, l = s.y;
		let t = c | 0;
		if (t === u) l < m ? (m = l, d = o) : l > h && (h = l, f = o), i = (a * i + s.x) / ++a;
		else {
			let n = o - 1;
			if (!F(d) && !F(f)) {
				let t = Math.min(d, f), r = Math.max(d, f);
				t !== p && t !== n && g.push({
					...e[t],
					x: i
				}), r !== p && r !== n && g.push({
					...e[r],
					x: i
				});
			}
			o > 0 && n !== p && g.push(e[n]), g.push(s), u = t, a = 0, m = h = l, d = f = p = o;
		}
	}
	return g;
}
function ws(e) {
	if (e._decimated) {
		let t = e._data;
		delete e._decimated, delete e._data, Object.defineProperty(e, "data", {
			configurable: !0,
			enumerable: !0,
			writable: !0,
			value: t
		});
	}
}
function Ts(e) {
	e.data.datasets.forEach((e) => {
		ws(e);
	});
}
function Es(e, t) {
	let n = t.length, r = 0, i, { iScale: a } = e, { min: o, max: s, minDefined: c, maxDefined: l } = a.getUserBounds();
	return c && (r = rt(st(t, a.axis, o).lo, 0, n - 1)), i = l ? rt(st(t, a.axis, s).hi + 1, r, n) - r : n - r, {
		start: r,
		count: i
	};
}
var Ds = {
	id: "decimation",
	defaults: {
		algorithm: "min-max",
		enabled: !1
	},
	beforeElementsUpdate: (e, t, n) => {
		if (!n.enabled) {
			Ts(e);
			return;
		}
		let r = e.width;
		e.data.datasets.forEach((t, i) => {
			let { _data: a, indexAxis: o } = t, s = e.getDatasetMeta(i), c = a || t.data;
			if (dn([o, e.options.indexAxis]) === "y" || !s.controller.supportsDecimation) return;
			let l = e.scales[s.xAxisID];
			if (l.type !== "linear" && l.type !== "time" || e.options.parsing) return;
			let { start: u, count: d } = Es(s, c);
			if (d <= (n.threshold || 4 * r)) {
				ws(t);
				return;
			}
			F(a) && (t._data = c, delete t.data, Object.defineProperty(t, "data", {
				configurable: !0,
				enumerable: !0,
				get: function() {
					return this._decimated;
				},
				set: function(e) {
					this._data = e;
				}
			}));
			let f;
			switch (n.algorithm) {
				case "lttb":
					f = Ss(c, u, d, r, n);
					break;
				case "min-max":
					f = Cs(c, u, d, r);
					break;
				default: throw Error(`Unsupported decimation algorithm '${n.algorithm}'`);
			}
			t._decimated = f;
		});
	},
	destroy(e) {
		Ts(e);
	}
};
function Os(e, t, n) {
	let r = e.segments, i = e.points, a = t.points, o = [];
	for (let e of r) {
		let { start: r, end: s } = e;
		s = js(r, s, i);
		let c = ks(n, i[r], i[s], e.loop);
		if (!t.segments) {
			o.push({
				source: e,
				target: c,
				start: i[r],
				end: i[s]
			});
			continue;
		}
		let l = vr(t, c);
		for (let t of l) {
			let r = ks(n, a[t.start], a[t.end], t.loop), s = _r(e, i, r);
			for (let e of s) o.push({
				source: e,
				target: t,
				start: { [n]: Ms(c, r, "start", Math.max) },
				end: { [n]: Ms(c, r, "end", Math.min) }
			});
		}
	}
	return o;
}
function ks(e, t, n, r) {
	if (r) return;
	let i = t[e], a = n[e];
	return e === "angle" && (i = tt(i), a = tt(a)), {
		property: e,
		start: i,
		end: a
	};
}
function As(e, t) {
	let { x: n = null, y: r = null } = e || {}, i = t.points, a = [];
	return t.segments.forEach(({ start: e, end: t }) => {
		t = js(e, t, i);
		let o = i[e], s = i[t];
		r === null ? n !== null && (a.push({
			x: n,
			y: o.y
		}), a.push({
			x: n,
			y: s.y
		})) : (a.push({
			x: o.x,
			y: r
		}), a.push({
			x: s.x,
			y: r
		}));
	}), a;
}
function js(e, t, n) {
	for (; t > e; t--) {
		let e = n[t];
		if (!isNaN(e.x) && !isNaN(e.y)) break;
	}
	return t;
}
function Ms(e, t, n, r) {
	return e && t ? r(e[n], t[n]) : e ? e[n] : t ? t[n] : 0;
}
function Ns(e, t) {
	let n = [], r = !1;
	return I(e) ? (r = !0, n = e) : n = As(e, t), n.length ? new Zo({
		points: n,
		options: { tension: 0 },
		_loop: r,
		_fullLoop: r
	}) : null;
}
function Ps(e) {
	return e && e.fill !== !1;
}
function Fs(e, t, n) {
	let r = e[t].fill, i = [t], a;
	if (!n) return r;
	for (; r !== !1 && i.indexOf(r) === -1;) {
		if (!z(r)) return r;
		if (a = e[r], !a) return !1;
		if (a.visible) return r;
		i.push(r), r = a.fill;
	}
	return !1;
}
function Is(e, t, n) {
	let r = Bs(e);
	if (R(r)) return !isNaN(r.value) && r;
	let i = parseFloat(r);
	return z(i) && Math.floor(i) === i ? Ls(r[0], t, i, n) : [
		"origin",
		"start",
		"end",
		"stack",
		"shape"
	].indexOf(r) >= 0 && r;
}
function Ls(e, t, n, r) {
	return (e === "-" || e === "+") && (n = t + n), n === t || n < 0 || n >= r ? !1 : n;
}
function Rs(e, t) {
	let n = null;
	return e === "start" ? n = t.bottom : e === "end" ? n = t.top : R(e) ? n = t.getPixelForValue(e.value) : t.getBasePixel && (n = t.getBasePixel()), n;
}
function zs(e, t, n) {
	let r;
	return r = e === "start" ? n : e === "end" ? t.options.reverse ? t.min : t.max : R(e) ? e.value : t.getBaseValue(), r;
}
function Bs(e) {
	let t = e.options, n = t.fill, r = B(n && n.target, n);
	return r === void 0 && (r = !!t.backgroundColor), r === !1 || r === null ? !1 : r === !0 ? "origin" : r;
}
function Vs(e) {
	let { scale: t, index: n, line: r } = e, i = [], a = r.segments, o = r.points, s = Hs(t, n);
	s.push(Ns({
		x: null,
		y: t.bottom
	}, r));
	for (let e = 0; e < a.length; e++) {
		let t = a[e];
		for (let e = t.start; e <= t.end; e++) Us(i, o[e], s);
	}
	return new Zo({
		points: i,
		options: {}
	});
}
function Hs(e, t) {
	let n = [], r = e.getMatchingVisibleMetas("line");
	for (let e = 0; e < r.length; e++) {
		let i = r[e];
		if (i.index === t) break;
		i.hidden || n.unshift(i.dataset);
	}
	return n;
}
function Us(e, t, n) {
	let r = [];
	for (let i = 0; i < n.length; i++) {
		let a = n[i], { first: o, last: s, point: c } = Ws(a, t, "x");
		if (!(!c || o && s)) {
			if (o) r.unshift(c);
			else if (e.push(c), !s) break;
		}
	}
	e.push(...r);
}
function Ws(e, t, n) {
	let r = e.interpolate(t, n);
	if (!r) return {};
	let i = r[n], a = e.segments, o = e.points, s = !1, c = !1;
	for (let e = 0; e < a.length; e++) {
		let t = a[e], r = o[t.start][n], l = o[t.end][n];
		if (at(i, r, l)) {
			s = i === r, c = i === l;
			break;
		}
	}
	return {
		first: s,
		last: c,
		point: r
	};
}
var Gs = class {
	constructor(e) {
		this.x = e.x, this.y = e.y, this.radius = e.radius;
	}
	pathSegment(e, t, n) {
		let { x: r, y: i, radius: a } = this;
		return t ||= {
			start: 0,
			end: W
		}, e.arc(r, i, a, t.end, t.start, !0), !n.bounds;
	}
	interpolate(e) {
		let { x: t, y: n, radius: r } = this, i = e.angle;
		return {
			x: t + Math.cos(i) * r,
			y: n + Math.sin(i) * r,
			angle: i
		};
	}
};
function Ks(e) {
	let { chart: t, fill: n, line: r } = e;
	if (z(n)) return qs(t, n);
	if (n === "stack") return Vs(e);
	if (n === "shape") return !0;
	let i = Js(e);
	return i instanceof Gs ? i : Ns(i, r);
}
function qs(e, t) {
	let n = e.getDatasetMeta(t);
	return n && e.isDatasetVisible(t) ? n.dataset : null;
}
function Js(e) {
	return (e.scale || {}).getPointPositionForValue ? Xs(e) : Ys(e);
}
function Ys(e) {
	let { scale: t = {}, fill: n } = e, r = Rs(n, t);
	if (z(r)) {
		let e = t.isHorizontal();
		return {
			x: e ? r : null,
			y: e ? null : r
		};
	}
	return null;
}
function Xs(e) {
	let { scale: t, fill: n } = e, r = t.options, i = t.getLabels().length, a = r.reverse ? t.max : t.min, o = zs(n, t, a), s = [];
	if (r.grid.circular) {
		let e = t.getPointPositionForValue(0, a);
		return new Gs({
			x: e.x,
			y: e.y,
			radius: t.getDistanceFromCenterForValue(o)
		});
	}
	for (let e = 0; e < i; ++e) s.push(t.getPointPositionForValue(e, o));
	return s;
}
function Zs(e, t, n) {
	let r = Ks(t), { line: i, scale: a, axis: o } = t, s = i.options, c = s.fill, l = s.backgroundColor, { above: u = l, below: d = l } = c || {};
	r && i.points.length && (qt(e, n), Qs(e, {
		line: i,
		target: r,
		above: u,
		below: d,
		area: n,
		scale: a,
		axis: o
	}), Jt(e));
}
function Qs(e, t) {
	let { line: n, target: r, above: i, below: a, area: o, scale: s } = t, c = n._loop ? "angle" : t.axis;
	e.save(), c === "x" && a !== i && ($s(e, r, o.top), ec(e, {
		line: n,
		target: r,
		color: i,
		scale: s,
		property: c
	}), e.restore(), e.save(), $s(e, r, o.bottom)), ec(e, {
		line: n,
		target: r,
		color: a,
		scale: s,
		property: c
	}), e.restore();
}
function $s(e, t, n) {
	let { segments: r, points: i } = t, a = !0, o = !1;
	e.beginPath();
	for (let s of r) {
		let { start: r, end: c } = s, l = i[r], u = i[js(r, c, i)];
		a ? (e.moveTo(l.x, l.y), a = !1) : (e.lineTo(l.x, n), e.lineTo(l.x, l.y)), o = !!t.pathSegment(e, s, { move: o }), o ? e.closePath() : e.lineTo(u.x, n);
	}
	e.lineTo(t.first().x, n), e.closePath(), e.clip();
}
function ec(e, t) {
	let { line: n, target: r, property: i, color: a, scale: o } = t, s = Os(n, r, i);
	for (let { source: t, target: c, start: l, end: u } of s) {
		let { style: { backgroundColor: s = a } = {} } = t, d = r !== !0;
		e.save(), e.fillStyle = s, tc(e, o, d && ks(i, l, u)), e.beginPath();
		let f = !!n.pathSegment(e, t), p;
		if (d) {
			f ? e.closePath() : nc(e, r, u, i);
			let t = !!r.pathSegment(e, c, {
				move: f,
				reverse: !0
			});
			p = f && t, p || nc(e, r, l, i);
		}
		e.closePath(), e.fill(p ? "evenodd" : "nonzero"), e.restore();
	}
}
function tc(e, t, n) {
	let { top: r, bottom: i } = t.chart.chartArea, { property: a, start: o, end: s } = n || {};
	a === "x" && (e.beginPath(), e.rect(o, r, s - o, i - r), e.clip());
}
function nc(e, t, n, r) {
	let i = t.interpolate(n, r);
	i && e.lineTo(i.x, i.y);
}
var rc = {
	id: "filler",
	afterDatasetsUpdate(e, t, n) {
		let r = (e.data.datasets || []).length, i = [], a, o, s, c;
		for (o = 0; o < r; ++o) a = e.getDatasetMeta(o), s = a.dataset, c = null, s && s.options && s instanceof Zo && (c = {
			visible: e.isDatasetVisible(o),
			index: o,
			fill: Is(s, o, r),
			chart: e,
			axis: a.controller.options.indexAxis,
			scale: a.vScale,
			line: s
		}), a.$filler = c, i.push(c);
		for (o = 0; o < r; ++o) c = i[o], c && c.fill !== !1 && (c.fill = Fs(i, o, n.propagate));
	},
	beforeDraw(e, t, n) {
		let r = n.drawTime === "beforeDraw", i = e.getSortedVisibleDatasetMetas(), a = e.chartArea;
		for (let t = i.length - 1; t >= 0; --t) {
			let n = i[t].$filler;
			n && (n.line.updateControlPoints(a, n.axis), r && n.fill && Zs(e.ctx, n, a));
		}
	},
	beforeDatasetsDraw(e, t, n) {
		if (n.drawTime !== "beforeDatasetsDraw") return;
		let r = e.getSortedVisibleDatasetMetas();
		for (let t = r.length - 1; t >= 0; --t) {
			let n = r[t].$filler;
			Ps(n) && Zs(e.ctx, n, e.chartArea);
		}
	},
	beforeDatasetDraw(e, t, n) {
		let r = t.meta.$filler;
		Ps(r) && n.drawTime === "beforeDatasetDraw" && Zs(e.ctx, r, e.chartArea);
	},
	defaults: {
		propagate: !0,
		drawTime: "beforeDatasetDraw"
	}
}, ic = (e, t) => {
	let { boxHeight: n = t, boxWidth: r = t } = e;
	return e.usePointStyle && (n = Math.min(n, t), r = e.pointStyleWidth || Math.min(r, t)), {
		boxWidth: r,
		boxHeight: n,
		itemHeight: Math.max(t, n)
	};
}, ac = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index, oc = class extends va {
	constructor(e) {
		super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = e.chart, this.options = e.options, this.ctx = e.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
	}
	update(e, t, n) {
		this.maxWidth = e, this.maxHeight = t, this._margins = n, this.setDimensions(), this.buildLabels(), this.fit();
	}
	setDimensions() {
		this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
	}
	buildLabels() {
		let e = this.options.labels || {}, t = V(e.generateLabels, [this.chart], this) || [];
		e.filter && (t = t.filter((t) => e.filter(t, this.chart.data))), e.sort && (t = t.sort((t, n) => e.sort(t, n, this.chart.data))), this.options.reverse && t.reverse(), this.legendItems = t;
	}
	fit() {
		let { options: e, ctx: t } = this;
		if (!e.display) {
			this.width = this.height = 0;
			return;
		}
		let n = e.labels, r = un(n.font), i = r.size, a = this._computeTitleHeight(), { boxWidth: o, itemHeight: s } = ic(n, i), c, l;
		t.font = r.string, this.isHorizontal() ? (c = this.maxWidth, l = this._fitRows(a, i, o, s) + 10) : (l = this.maxHeight, c = this._fitCols(a, r, o, s) + 10), this.width = Math.min(c, e.maxWidth || this.maxWidth), this.height = Math.min(l, e.maxHeight || this.maxHeight);
	}
	_fitRows(e, t, n, r) {
		let { ctx: i, maxWidth: a, options: { labels: { padding: o } } } = this, s = this.legendHitBoxes = [], c = this.lineWidths = [0], l = r + o, u = e;
		i.textAlign = "left", i.textBaseline = "middle";
		let d = -1, f = -l;
		return this.legendItems.forEach((e, p) => {
			let m = n + t / 2 + i.measureText(e.text).width;
			(p === 0 || c[c.length - 1] + m + 2 * o > a) && (u += l, c[c.length - (p > 0 ? 0 : 1)] = 0, f += l, d++), s[p] = {
				left: 0,
				top: f,
				row: d,
				width: m,
				height: r
			}, c[c.length - 1] += m + o;
		}), u;
	}
	_fitCols(e, t, n, r) {
		let { ctx: i, maxHeight: a, options: { labels: { padding: o } } } = this, s = this.legendHitBoxes = [], c = this.columnSizes = [], l = a - e, u = o, d = 0, f = 0, p = 0, m = 0;
		return this.legendItems.forEach((e, a) => {
			let { itemWidth: h, itemHeight: g } = sc(n, t, i, e, r);
			a > 0 && f + g + 2 * o > l && (u += d + o, c.push({
				width: d,
				height: f
			}), p += d + o, m++, d = f = 0), s[a] = {
				left: p,
				top: f,
				col: m,
				width: h,
				height: g
			}, d = Math.max(d, h), f += g + o;
		}), u += d, c.push({
			width: d,
			height: f
		}), u;
	}
	adjustHitBoxes() {
		if (!this.options.display) return;
		let e = this._computeTitleHeight(), { legendHitBoxes: t, options: { align: n, labels: { padding: r }, rtl: i } } = this, a = dr(i, this.left, this.width);
		if (this.isHorizontal()) {
			let i = 0, o = gt(n, this.left + r, this.right - this.lineWidths[i]);
			for (let s of t) i !== s.row && (i = s.row, o = gt(n, this.left + r, this.right - this.lineWidths[i])), s.top += this.top + e + r, s.left = a.leftForLtr(a.x(o), s.width), o += s.width + r;
		} else {
			let i = 0, o = gt(n, this.top + e + r, this.bottom - this.columnSizes[i].height);
			for (let s of t) s.col !== i && (i = s.col, o = gt(n, this.top + e + r, this.bottom - this.columnSizes[i].height)), s.top = o, s.left += this.left + r, s.left = a.leftForLtr(a.x(s.left), s.width), o += s.height + r;
		}
	}
	isHorizontal() {
		return this.options.position === "top" || this.options.position === "bottom";
	}
	draw() {
		if (this.options.display) {
			let e = this.ctx;
			qt(e, this), this._draw(), Jt(e);
		}
	}
	_draw() {
		let { options: e, columnSizes: t, lineWidths: n, ctx: r } = this, { align: i, labels: a } = e, o = Y.color, s = dr(e.rtl, this.left, this.width), c = un(a.font), { padding: l } = a, u = c.size, d = u / 2, f;
		this.drawTitle(), r.textAlign = s.textAlign("left"), r.textBaseline = "middle", r.lineWidth = .5, r.font = c.string;
		let { boxWidth: p, boxHeight: m, itemHeight: h } = ic(a, u), g = function(e, t, n) {
			if (isNaN(p) || p <= 0 || isNaN(m) || m < 0) return;
			r.save();
			let i = B(n.lineWidth, 1);
			if (r.fillStyle = B(n.fillStyle, o), r.lineCap = B(n.lineCap, "butt"), r.lineDashOffset = B(n.lineDashOffset, 0), r.lineJoin = B(n.lineJoin, "miter"), r.lineWidth = i, r.strokeStyle = B(n.strokeStyle, o), r.setLineDash(B(n.lineDash, [])), a.usePointStyle) {
				let o = {
					radius: m * Math.SQRT2 / 2,
					pointStyle: n.pointStyle,
					rotation: n.rotation,
					borderWidth: i
				}, c = s.xPlus(e, p / 2), l = t + d;
				Gt(r, o, c, l, a.pointStyleWidth && p);
			} else {
				let a = t + Math.max((u - m) / 2, 0), o = s.leftForLtr(e, p), c = cn(n.borderRadius);
				r.beginPath(), Object.values(c).some((e) => e !== 0) ? tn(r, {
					x: o,
					y: a,
					w: p,
					h: m,
					radius: c
				}) : r.rect(o, a, p, m), r.fill(), i !== 0 && r.stroke();
			}
			r.restore();
		}, _ = function(e, t, n) {
			en(r, n.text, e, t + h / 2, c, {
				strikethrough: n.hidden,
				textAlign: s.textAlign(n.textAlign)
			});
		}, v = this.isHorizontal(), y = this._computeTitleHeight();
		f = v ? {
			x: gt(i, this.left + l, this.right - n[0]),
			y: this.top + l + y,
			line: 0
		} : {
			x: this.left + l,
			y: gt(i, this.top + y + l, this.bottom - t[0].height),
			line: 0
		}, fr(this.ctx, e.textDirection);
		let b = h + l;
		this.legendItems.forEach((o, u) => {
			r.strokeStyle = o.fontColor, r.fillStyle = o.fontColor;
			let m = r.measureText(o.text).width, h = s.textAlign(o.textAlign ||= a.textAlign), x = p + d + m, S = f.x, C = f.y;
			s.setWidth(this.width), v ? u > 0 && S + x + l > this.right && (C = f.y += b, f.line++, S = f.x = gt(i, this.left + l, this.right - n[f.line])) : u > 0 && C + b > this.bottom && (S = f.x = S + t[f.line].width + l, f.line++, C = f.y = gt(i, this.top + y + l, this.bottom - t[f.line].height));
			let w = s.x(S);
			if (g(w, C, o), S = _t(h, S + p + d, v ? S + x : this.right, e.rtl), _(s.x(S), C, o), v) f.x += x + l;
			else if (typeof o.text != "string") {
				let e = c.lineHeight;
				f.y += uc(o, e) + l;
			} else f.y += b;
		}), pr(this.ctx, e.textDirection);
	}
	drawTitle() {
		let e = this.options, t = e.title, n = un(t.font), r = ln(t.padding);
		if (!t.display) return;
		let i = dr(e.rtl, this.left, this.width), a = this.ctx, o = t.position, s = n.size / 2, c = r.top + s, l, u = this.left, d = this.width;
		if (this.isHorizontal()) d = Math.max(...this.lineWidths), l = this.top + c, u = gt(e.align, u, this.right - d);
		else {
			let t = this.columnSizes.reduce((e, t) => Math.max(e, t.height), 0);
			l = c + gt(e.align, this.top, this.bottom - t - e.labels.padding - this._computeTitleHeight());
		}
		let f = gt(o, u, u + d);
		a.textAlign = i.textAlign(q(o)), a.textBaseline = "middle", a.strokeStyle = t.color, a.fillStyle = t.color, a.font = n.string, en(a, t.text, f, l, n);
	}
	_computeTitleHeight() {
		let e = this.options.title, t = un(e.font), n = ln(e.padding);
		return e.display ? t.lineHeight + n.height : 0;
	}
	_getLegendItemAt(e, t) {
		let n, r, i;
		if (at(e, this.left, this.right) && at(t, this.top, this.bottom)) {
			for (i = this.legendHitBoxes, n = 0; n < i.length; ++n) if (r = i[n], at(e, r.left, r.left + r.width) && at(t, r.top, r.top + r.height)) return this.legendItems[n];
		}
		return null;
	}
	handleEvent(e) {
		let t = this.options;
		if (!dc(e.type, t)) return;
		let n = this._getLegendItemAt(e.x, e.y);
		if (e.type === "mousemove" || e.type === "mouseout") {
			let r = this._hoveredItem, i = ac(r, n);
			r && !i && V(t.onLeave, [
				e,
				r,
				this
			], this), this._hoveredItem = n, n && !i && V(t.onHover, [
				e,
				n,
				this
			], this);
		} else n && V(t.onClick, [
			e,
			n,
			this
		], this);
	}
};
function sc(e, t, n, r, i) {
	return {
		itemWidth: cc(r, e, t, n),
		itemHeight: lc(i, r, t.lineHeight)
	};
}
function cc(e, t, n, r) {
	let i = e.text;
	return i && typeof i != "string" && (i = i.reduce((e, t) => e.length > t.length ? e : t)), t + n.size / 2 + r.measureText(i).width;
}
function lc(e, t, n) {
	let r = e;
	return typeof t.text != "string" && (r = uc(t, n)), r;
}
function uc(e, t) {
	return t * (e.text ? e.text.length : 0);
}
function dc(e, t) {
	return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var fc = {
	id: "legend",
	_element: oc,
	start(e, t, n) {
		let r = e.legend = new oc({
			ctx: e.ctx,
			options: n,
			chart: e
		});
		Ji.configure(e, r, n), Ji.addBox(e, r);
	},
	stop(e) {
		Ji.removeBox(e, e.legend), delete e.legend;
	},
	beforeUpdate(e, t, n) {
		let r = e.legend;
		Ji.configure(e, r, n), r.options = n;
	},
	afterUpdate(e) {
		let t = e.legend;
		t.buildLabels(), t.adjustHitBoxes();
	},
	afterEvent(e, t) {
		t.replay || e.legend.handleEvent(t.event);
	},
	defaults: {
		display: !0,
		position: "top",
		align: "center",
		fullSize: !0,
		reverse: !1,
		weight: 1e3,
		onClick(e, t, n) {
			let r = t.datasetIndex, i = n.chart;
			i.isDatasetVisible(r) ? (i.hide(r), t.hidden = !0) : (i.show(r), t.hidden = !1);
		},
		onHover: null,
		onLeave: null,
		labels: {
			color: (e) => e.chart.options.color,
			boxWidth: 40,
			padding: 10,
			generateLabels(e) {
				let t = e.data.datasets, { labels: { usePointStyle: n, pointStyle: r, textAlign: i, color: a, useBorderRadius: o, borderRadius: s } } = e.legend.options;
				return e._getSortedDatasetMetas().map((e) => {
					let c = e.controller.getStyle(n ? 0 : void 0), l = ln(c.borderWidth);
					return {
						text: t[e.index].label,
						fillStyle: c.backgroundColor,
						fontColor: a,
						hidden: !e.visible,
						lineCap: c.borderCapStyle,
						lineDash: c.borderDash,
						lineDashOffset: c.borderDashOffset,
						lineJoin: c.borderJoinStyle,
						lineWidth: (l.width + l.height) / 4,
						strokeStyle: c.borderColor,
						pointStyle: r || c.pointStyle,
						rotation: c.rotation,
						textAlign: i || c.textAlign,
						borderRadius: o && (s || c.borderRadius),
						datasetIndex: e.index
					};
				}, this);
			}
		},
		title: {
			color: (e) => e.chart.options.color,
			display: !1,
			position: "center",
			text: ""
		}
	},
	descriptors: {
		_scriptable: (e) => !e.startsWith("on"),
		labels: { _scriptable: (e) => ![
			"generateLabels",
			"filter",
			"sort"
		].includes(e) }
	}
}, pc = class extends va {
	constructor(e) {
		super(), this.chart = e.chart, this.options = e.options, this.ctx = e.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
	}
	update(e, t) {
		let n = this.options;
		if (this.left = 0, this.top = 0, !n.display) {
			this.width = this.height = this.right = this.bottom = 0;
			return;
		}
		this.width = this.right = e, this.height = this.bottom = t;
		let r = I(n.text) ? n.text.length : 1;
		this._padding = ln(n.padding);
		let i = r * un(n.font).lineHeight + this._padding.height;
		this.isHorizontal() ? this.height = i : this.width = i;
	}
	isHorizontal() {
		let e = this.options.position;
		return e === "top" || e === "bottom";
	}
	_drawArgs(e) {
		let { top: t, left: n, bottom: r, right: i, options: a } = this, o = a.align, s = 0, c, l, u;
		return this.isHorizontal() ? (l = gt(o, n, i), u = t + e, c = i - n) : (a.position === "left" ? (l = n + e, u = gt(o, r, t), s = U * -.5) : (l = i - e, u = gt(o, t, r), s = U * .5), c = r - t), {
			titleX: l,
			titleY: u,
			maxWidth: c,
			rotation: s
		};
	}
	draw() {
		let e = this.ctx, t = this.options;
		if (!t.display) return;
		let n = un(t.font), r = n.lineHeight / 2 + this._padding.top, { titleX: i, titleY: a, maxWidth: o, rotation: s } = this._drawArgs(r);
		en(e, t.text, 0, 0, n, {
			color: t.color,
			maxWidth: o,
			rotation: s,
			textAlign: q(t.align),
			textBaseline: "middle",
			translation: [i, a]
		});
	}
};
function mc(e, t) {
	let n = new pc({
		ctx: e.ctx,
		options: t,
		chart: e
	});
	Ji.configure(e, n, t), Ji.addBox(e, n), e.titleBlock = n;
}
var hc = {
	id: "title",
	_element: pc,
	start(e, t, n) {
		mc(e, n);
	},
	stop(e) {
		let t = e.titleBlock;
		Ji.removeBox(e, t), delete e.titleBlock;
	},
	beforeUpdate(e, t, n) {
		let r = e.titleBlock;
		Ji.configure(e, r, n), r.options = n;
	},
	defaults: {
		align: "center",
		display: !1,
		font: { weight: "bold" },
		fullSize: !0,
		padding: 10,
		position: "top",
		text: "",
		weight: 2e3
	},
	defaultRoutes: { color: "color" },
	descriptors: {
		_scriptable: !0,
		_indexable: !1
	}
}, gc = /* @__PURE__ */ new WeakMap(), _c = {
	id: "subtitle",
	start(e, t, n) {
		let r = new pc({
			ctx: e.ctx,
			options: n,
			chart: e
		});
		Ji.configure(e, r, n), Ji.addBox(e, r), gc.set(e, r);
	},
	stop(e) {
		Ji.removeBox(e, gc.get(e)), gc.delete(e);
	},
	beforeUpdate(e, t, n) {
		let r = gc.get(e);
		Ji.configure(e, r, n), r.options = n;
	},
	defaults: {
		align: "center",
		display: !1,
		font: { weight: "normal" },
		fullSize: !0,
		padding: 0,
		position: "top",
		text: "",
		weight: 1500
	},
	defaultRoutes: { color: "color" },
	descriptors: {
		_scriptable: !0,
		_indexable: !1
	}
}, vc = {
	average(e) {
		if (!e.length) return !1;
		let t, n, r = /* @__PURE__ */ new Set(), i = 0, a = 0;
		for (t = 0, n = e.length; t < n; ++t) {
			let n = e[t].element;
			if (n && n.hasValue()) {
				let e = n.tooltipPosition();
				r.add(e.x), i += e.y, ++a;
			}
		}
		return a === 0 || r.size === 0 ? !1 : {
			x: [...r].reduce((e, t) => e + t) / r.size,
			y: i / a
		};
	},
	nearest(e, t) {
		if (!e.length) return !1;
		let n = t.x, r = t.y, i = Infinity, a, o, s;
		for (a = 0, o = e.length; a < o; ++a) {
			let n = e[a].element;
			if (n && n.hasValue()) {
				let e = $e(t, n.getCenterPoint());
				e < i && (i = e, s = n);
			}
		}
		if (s) {
			let e = s.tooltipPosition();
			n = e.x, r = e.y;
		}
		return {
			x: n,
			y: r
		};
	}
};
function yc(e, t) {
	return t && (I(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function bc(e) {
	return (typeof e == "string" || e instanceof String) && e.indexOf("\n") > -1 ? e.split("\n") : e;
}
function xc(e, t) {
	let { element: n, datasetIndex: r, index: i } = t, a = e.getDatasetMeta(r).controller, { label: o, value: s } = a.getLabelAndValue(i);
	return {
		chart: e,
		label: o,
		parsed: a.getParsed(i),
		raw: e.data.datasets[r].data[i],
		formattedValue: s,
		dataset: a.getDataset(),
		dataIndex: i,
		datasetIndex: r,
		element: n
	};
}
function Sc(e, t) {
	let n = e.chart.ctx, { body: r, footer: i, title: a } = e, { boxWidth: o, boxHeight: s } = t, c = un(t.bodyFont), l = un(t.titleFont), u = un(t.footerFont), d = a.length, f = i.length, p = r.length, m = ln(t.padding), h = m.height, g = 0, _ = r.reduce((e, t) => e + t.before.length + t.lines.length + t.after.length, 0);
	if (_ += e.beforeBody.length + e.afterBody.length, d && (h += d * l.lineHeight + (d - 1) * t.titleSpacing + t.titleMarginBottom), _) {
		let e = t.displayColors ? Math.max(s, c.lineHeight) : c.lineHeight;
		h += p * e + (_ - p) * c.lineHeight + (_ - 1) * t.bodySpacing;
	}
	f && (h += t.footerMarginTop + f * u.lineHeight + (f - 1) * t.footerSpacing);
	let v = 0, y = function(e) {
		g = Math.max(g, n.measureText(e).width + v);
	};
	return n.save(), n.font = l.string, H(e.title, y), n.font = c.string, H(e.beforeBody.concat(e.afterBody), y), v = t.displayColors ? o + 2 + t.boxPadding : 0, H(r, (e) => {
		H(e.before, y), H(e.lines, y), H(e.after, y);
	}), v = 0, n.font = u.string, H(e.footer, y), n.restore(), g += m.width, {
		width: g,
		height: h
	};
}
function Cc(e, t) {
	let { y: n, height: r } = t;
	return n < r / 2 ? "top" : n > e.height - r / 2 ? "bottom" : "center";
}
function wc(e, t, n, r) {
	let { x: i, width: a } = r, o = n.caretSize + n.caretPadding;
	if (e === "left" && i + a + o > t.width || e === "right" && i - a - o < 0) return !0;
}
function Tc(e, t, n, r) {
	let { x: i, width: a } = n, { width: o, chartArea: { left: s, right: c } } = e, l = "center";
	return r === "center" ? l = i <= (s + c) / 2 ? "left" : "right" : i <= a / 2 ? l = "left" : i >= o - a / 2 && (l = "right"), wc(l, e, t, n) && (l = "center"), l;
}
function Ec(e, t, n) {
	let r = n.yAlign || t.yAlign || Cc(e, n);
	return {
		xAlign: n.xAlign || t.xAlign || Tc(e, t, n, r),
		yAlign: r
	};
}
function Dc(e, t) {
	let { x: n, width: r } = e;
	return t === "right" ? n -= r : t === "center" && (n -= r / 2), n;
}
function Oc(e, t, n) {
	let { y: r, height: i } = e;
	return t === "top" ? r += n : r -= t === "bottom" ? i + n : i / 2, r;
}
function kc(e, t, n, r) {
	let { caretSize: i, caretPadding: a, cornerRadius: o } = e, { xAlign: s, yAlign: c } = n, l = i + a, { topLeft: u, topRight: d, bottomLeft: f, bottomRight: p } = cn(o), m = Dc(t, s), h = Oc(t, c, l);
	return c === "center" ? s === "left" ? m += l : s === "right" && (m -= l) : s === "left" ? m -= Math.max(u, f) + i : s === "right" && (m += Math.max(d, p) + i), {
		x: rt(m, 0, r.width - t.width),
		y: rt(h, 0, r.height - t.height)
	};
}
function Ac(e, t, n) {
	let r = ln(n.padding);
	return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - r.right : e.x + r.left;
}
function jc(e) {
	return yc([], bc(e));
}
function Mc(e, t, n) {
	return pn(e, {
		tooltip: t,
		tooltipItems: n,
		type: "tooltip"
	});
}
function Nc(e, t) {
	let n = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
	return n ? e.override(n) : e;
}
var Pc = {
	beforeTitle: he,
	title(e) {
		if (e.length > 0) {
			let t = e[0], n = t.chart.data.labels, r = n ? n.length : 0;
			if (this && this.options && this.options.mode === "dataset") return t.dataset.label || "";
			if (t.label) return t.label;
			if (r > 0 && t.dataIndex < r) return n[t.dataIndex];
		}
		return "";
	},
	afterTitle: he,
	beforeBody: he,
	beforeLabel: he,
	label(e) {
		if (this && this.options && this.options.mode === "dataset") return e.label + ": " + e.formattedValue || e.formattedValue;
		let t = e.dataset.label || "";
		t && (t += ": ");
		let n = e.formattedValue;
		return F(n) || (t += n), t;
	},
	labelColor(e) {
		let t = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
		return {
			borderColor: t.borderColor,
			backgroundColor: t.backgroundColor,
			borderWidth: t.borderWidth,
			borderDash: t.borderDash,
			borderDashOffset: t.borderDashOffset,
			borderRadius: 0
		};
	},
	labelTextColor() {
		return this.options.bodyColor;
	},
	labelPointStyle(e) {
		let t = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
		return {
			pointStyle: t.pointStyle,
			rotation: t.rotation
		};
	},
	afterLabel: he,
	afterBody: he,
	beforeFooter: he,
	footer: he,
	afterFooter: he
};
function Fc(e, t, n, r) {
	let i = e[t].call(n, r);
	return i === void 0 ? Pc[t].call(n, r) : i;
}
var Ic = class extends va {
	static positioners = vc;
	constructor(e) {
		super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = e.chart, this.options = e.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
	}
	initialize(e) {
		this.options = e, this._cachedAnimations = void 0, this.$context = void 0;
	}
	_resolveAnimations() {
		let e = this._cachedAnimations;
		if (e) return e;
		let t = this.chart, n = this.options.setContext(this.getContext()), r = n.enabled && t.options.animation && n.animations, i = new Ar(this.chart, r);
		return r._cacheable && (this._cachedAnimations = Object.freeze(i)), i;
	}
	getContext() {
		return this.$context ||= Mc(this.chart.getContext(), this, this._tooltipItems);
	}
	getTitle(e, t) {
		let { callbacks: n } = t, r = Fc(n, "beforeTitle", this, e), i = Fc(n, "title", this, e), a = Fc(n, "afterTitle", this, e), o = [];
		return o = yc(o, bc(r)), o = yc(o, bc(i)), o = yc(o, bc(a)), o;
	}
	getBeforeBody(e, t) {
		return jc(Fc(t.callbacks, "beforeBody", this, e));
	}
	getBody(e, t) {
		let { callbacks: n } = t, r = [];
		return H(e, (e) => {
			let t = {
				before: [],
				lines: [],
				after: []
			}, i = Nc(n, e);
			yc(t.before, bc(Fc(i, "beforeLabel", this, e))), yc(t.lines, Fc(i, "label", this, e)), yc(t.after, bc(Fc(i, "afterLabel", this, e))), r.push(t);
		}), r;
	}
	getAfterBody(e, t) {
		return jc(Fc(t.callbacks, "afterBody", this, e));
	}
	getFooter(e, t) {
		let { callbacks: n } = t, r = Fc(n, "beforeFooter", this, e), i = Fc(n, "footer", this, e), a = Fc(n, "afterFooter", this, e), o = [];
		return o = yc(o, bc(r)), o = yc(o, bc(i)), o = yc(o, bc(a)), o;
	}
	_createItems(e) {
		let t = this._active, n = this.chart.data, r = [], i = [], a = [], o = [], s, c;
		for (s = 0, c = t.length; s < c; ++s) o.push(xc(this.chart, t[s]));
		return e.filter && (o = o.filter((t, r, i) => e.filter(t, r, i, n))), e.itemSort && (o = o.sort((t, r) => e.itemSort(t, r, n))), H(o, (t) => {
			let n = Nc(e.callbacks, t);
			r.push(Fc(n, "labelColor", this, t)), i.push(Fc(n, "labelPointStyle", this, t)), a.push(Fc(n, "labelTextColor", this, t));
		}), this.labelColors = r, this.labelPointStyles = i, this.labelTextColors = a, this.dataPoints = o, o;
	}
	update(e, t) {
		let n = this.options.setContext(this.getContext()), r = this._active, i, a = [];
		if (!r.length) this.opacity !== 0 && (i = { opacity: 0 });
		else {
			let e = vc[n.position].call(this, r, this._eventPosition);
			a = this._createItems(n), this.title = this.getTitle(a, n), this.beforeBody = this.getBeforeBody(a, n), this.body = this.getBody(a, n), this.afterBody = this.getAfterBody(a, n), this.footer = this.getFooter(a, n);
			let t = this._size = Sc(this, n), o = Object.assign({}, e, t), s = Ec(this.chart, n, o), c = kc(n, o, s, this.chart);
			this.xAlign = s.xAlign, this.yAlign = s.yAlign, i = {
				opacity: 1,
				x: c.x,
				y: c.y,
				width: t.width,
				height: t.height,
				caretX: e.x,
				caretY: e.y
			};
		}
		this._tooltipItems = a, this.$context = void 0, i && this._resolveAnimations().update(this, i), e && n.external && n.external.call(this, {
			chart: this.chart,
			tooltip: this,
			replay: t
		});
	}
	drawCaret(e, t, n, r) {
		let i = this.getCaretPosition(e, n, r);
		t.lineTo(i.x1, i.y1), t.lineTo(i.x2, i.y2), t.lineTo(i.x3, i.y3);
	}
	getCaretPosition(e, t, n) {
		let { xAlign: r, yAlign: i } = this, { caretSize: a, cornerRadius: o } = n, { topLeft: s, topRight: c, bottomLeft: l, bottomRight: u } = cn(o), { x: d, y: f } = e, { width: p, height: m } = t, h, g, _, v, y, b;
		return i === "center" ? (y = f + m / 2, r === "left" ? (h = d, g = h - a, v = y + a, b = y - a) : (h = d + p, g = h + a, v = y - a, b = y + a), _ = h) : (g = r === "left" ? d + Math.max(s, l) + a : r === "right" ? d + p - Math.max(c, u) - a : this.caretX, i === "top" ? (v = f, y = v - a, h = g - a, _ = g + a) : (v = f + m, y = v + a, h = g + a, _ = g - a), b = v), {
			x1: h,
			x2: g,
			x3: _,
			y1: v,
			y2: y,
			y3: b
		};
	}
	drawTitle(e, t, n) {
		let r = this.title, i = r.length, a, o, s;
		if (i) {
			let c = dr(n.rtl, this.x, this.width);
			for (e.x = Ac(this, n.titleAlign, n), t.textAlign = c.textAlign(n.titleAlign), t.textBaseline = "middle", a = un(n.titleFont), o = n.titleSpacing, t.fillStyle = n.titleColor, t.font = a.string, s = 0; s < i; ++s) t.fillText(r[s], c.x(e.x), e.y + a.lineHeight / 2), e.y += a.lineHeight + o, s + 1 === i && (e.y += n.titleMarginBottom - o);
		}
	}
	_drawColorBox(e, t, n, r, i) {
		let a = this.labelColors[n], o = this.labelPointStyles[n], { boxHeight: s, boxWidth: c } = i, l = un(i.bodyFont), u = Ac(this, "left", i), d = r.x(u), f = s < l.lineHeight ? (l.lineHeight - s) / 2 : 0, p = t.y + f;
		if (i.usePointStyle) {
			let t = {
				radius: Math.min(c, s) / 2,
				pointStyle: o.pointStyle,
				rotation: o.rotation,
				borderWidth: 1
			}, n = r.leftForLtr(d, c) + c / 2, l = p + s / 2;
			e.strokeStyle = i.multiKeyBackground, e.fillStyle = i.multiKeyBackground, Wt(e, t, n, l), e.strokeStyle = a.borderColor, e.fillStyle = a.backgroundColor, Wt(e, t, n, l);
		} else {
			e.lineWidth = R(a.borderWidth) ? Math.max(...Object.values(a.borderWidth)) : a.borderWidth || 1, e.strokeStyle = a.borderColor, e.setLineDash(a.borderDash || []), e.lineDashOffset = a.borderDashOffset || 0;
			let t = r.leftForLtr(d, c), n = r.leftForLtr(r.xPlus(d, 1), c - 2), o = cn(a.borderRadius);
			Object.values(o).some((e) => e !== 0) ? (e.beginPath(), e.fillStyle = i.multiKeyBackground, tn(e, {
				x: t,
				y: p,
				w: c,
				h: s,
				radius: o
			}), e.fill(), e.stroke(), e.fillStyle = a.backgroundColor, e.beginPath(), tn(e, {
				x: n,
				y: p + 1,
				w: c - 2,
				h: s - 2,
				radius: o
			}), e.fill()) : (e.fillStyle = i.multiKeyBackground, e.fillRect(t, p, c, s), e.strokeRect(t, p, c, s), e.fillStyle = a.backgroundColor, e.fillRect(n, p + 1, c - 2, s - 2));
		}
		e.fillStyle = this.labelTextColors[n];
	}
	drawBody(e, t, n) {
		let { body: r } = this, { bodySpacing: i, bodyAlign: a, displayColors: o, boxHeight: s, boxWidth: c, boxPadding: l } = n, u = un(n.bodyFont), d = u.lineHeight, f = 0, p = dr(n.rtl, this.x, this.width), m = function(n) {
			t.fillText(n, p.x(e.x + f), e.y + d / 2), e.y += d + i;
		}, h = p.textAlign(a), g, _, v, y, b, x, S;
		for (t.textAlign = a, t.textBaseline = "middle", t.font = u.string, e.x = Ac(this, h, n), t.fillStyle = n.bodyColor, H(this.beforeBody, m), f = o && h !== "right" ? a === "center" ? c / 2 + l : c + 2 + l : 0, y = 0, x = r.length; y < x; ++y) {
			for (g = r[y], _ = this.labelTextColors[y], t.fillStyle = _, H(g.before, m), v = g.lines, o && v.length && (this._drawColorBox(t, e, y, p, n), d = Math.max(u.lineHeight, s)), b = 0, S = v.length; b < S; ++b) m(v[b]), d = u.lineHeight;
			H(g.after, m);
		}
		f = 0, d = u.lineHeight, H(this.afterBody, m), e.y -= i;
	}
	drawFooter(e, t, n) {
		let r = this.footer, i = r.length, a, o;
		if (i) {
			let s = dr(n.rtl, this.x, this.width);
			for (e.x = Ac(this, n.footerAlign, n), e.y += n.footerMarginTop, t.textAlign = s.textAlign(n.footerAlign), t.textBaseline = "middle", a = un(n.footerFont), t.fillStyle = n.footerColor, t.font = a.string, o = 0; o < i; ++o) t.fillText(r[o], s.x(e.x), e.y + a.lineHeight / 2), e.y += a.lineHeight + n.footerSpacing;
		}
	}
	drawBackground(e, t, n, r) {
		let { xAlign: i, yAlign: a } = this, { x: o, y: s } = e, { width: c, height: l } = n, { topLeft: u, topRight: d, bottomLeft: f, bottomRight: p } = cn(r.cornerRadius);
		t.fillStyle = r.backgroundColor, t.strokeStyle = r.borderColor, t.lineWidth = r.borderWidth, t.beginPath(), t.moveTo(o + u, s), a === "top" && this.drawCaret(e, t, n, r), t.lineTo(o + c - d, s), t.quadraticCurveTo(o + c, s, o + c, s + d), a === "center" && i === "right" && this.drawCaret(e, t, n, r), t.lineTo(o + c, s + l - p), t.quadraticCurveTo(o + c, s + l, o + c - p, s + l), a === "bottom" && this.drawCaret(e, t, n, r), t.lineTo(o + f, s + l), t.quadraticCurveTo(o, s + l, o, s + l - f), a === "center" && i === "left" && this.drawCaret(e, t, n, r), t.lineTo(o, s + u), t.quadraticCurveTo(o, s, o + u, s), t.closePath(), t.fill(), r.borderWidth > 0 && t.stroke();
	}
	_updateAnimationTarget(e) {
		let t = this.chart, n = this.$animations, r = n && n.x, i = n && n.y;
		if (r || i) {
			let n = vc[e.position].call(this, this._active, this._eventPosition);
			if (!n) return;
			let a = this._size = Sc(this, e), o = Object.assign({}, n, this._size), s = Ec(t, e, o), c = kc(e, o, s, t);
			(r._to !== c.x || i._to !== c.y) && (this.xAlign = s.xAlign, this.yAlign = s.yAlign, this.width = a.width, this.height = a.height, this.caretX = n.x, this.caretY = n.y, this._resolveAnimations().update(this, c));
		}
	}
	_willRender() {
		return !!this.opacity;
	}
	draw(e) {
		let t = this.options.setContext(this.getContext()), n = this.opacity;
		if (!n) return;
		this._updateAnimationTarget(t);
		let r = {
			width: this.width,
			height: this.height
		}, i = {
			x: this.x,
			y: this.y
		};
		n = Math.abs(n) < .001 ? 0 : n;
		let a = ln(t.padding), o = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
		t.enabled && o && (e.save(), e.globalAlpha = n, this.drawBackground(i, e, r, t), fr(e, t.textDirection), i.y += a.top, this.drawTitle(i, e, t), this.drawBody(i, e, t), this.drawFooter(i, e, t), pr(e, t.textDirection), e.restore());
	}
	getActiveElements() {
		return this._active || [];
	}
	setActiveElements(e, t) {
		let n = this._active, r = e.map(({ datasetIndex: e, index: t }) => {
			let n = this.chart.getDatasetMeta(e);
			if (!n) throw Error("Cannot find a dataset at index " + e);
			return {
				datasetIndex: e,
				element: n.data[t],
				index: t
			};
		}), i = !be(n, r), a = this._positionChanged(r, t);
		(i || a) && (this._active = r, this._eventPosition = t, this._ignoreReplayEvents = !0, this.update(!0));
	}
	handleEvent(e, t, n = !0) {
		if (t && this._ignoreReplayEvents) return !1;
		this._ignoreReplayEvents = !1;
		let r = this.options, i = this._active || [], a = this._getActiveElements(e, i, t, n), o = this._positionChanged(a, e), s = t || !be(a, i) || o;
		return s && (this._active = a, (r.enabled || r.external) && (this._eventPosition = {
			x: e.x,
			y: e.y
		}, this.update(!0, t))), s;
	}
	_getActiveElements(e, t, n, r) {
		let i = this.options;
		if (e.type === "mouseout") return [];
		if (!r) return t.filter((e) => this.chart.data.datasets[e.datasetIndex] && this.chart.getDatasetMeta(e.datasetIndex).controller.getParsed(e.index) !== void 0);
		let a = this.chart.getElementsAtEventForMode(e, i.mode, i, n);
		return i.reverse && a.reverse(), a;
	}
	_positionChanged(e, t) {
		let { caretX: n, caretY: r, options: i } = this, a = vc[i.position].call(this, e, t);
		return a !== !1 && (n !== a.x || r !== a.y);
	}
}, Lc = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	Colors: xs,
	Decimation: Ds,
	Filler: rc,
	Legend: fc,
	SubTitle: _c,
	Title: hc,
	Tooltip: {
		id: "tooltip",
		_element: Ic,
		positioners: vc,
		afterInit(e, t, n) {
			n && (e.tooltip = new Ic({
				chart: e,
				options: n
			}));
		},
		beforeUpdate(e, t, n) {
			e.tooltip && e.tooltip.initialize(n);
		},
		reset(e, t, n) {
			e.tooltip && e.tooltip.initialize(n);
		},
		afterDraw(e) {
			let t = e.tooltip;
			if (t && t._willRender()) {
				let n = { tooltip: t };
				if (e.notifyPlugins("beforeTooltipDraw", {
					...n,
					cancelable: !0
				}) === !1) return;
				t.draw(e.ctx), e.notifyPlugins("afterTooltipDraw", n);
			}
		},
		afterEvent(e, t) {
			if (e.tooltip) {
				let n = t.replay;
				e.tooltip.handleEvent(t.event, n, t.inChartArea) && (t.changed = !0);
			}
		},
		defaults: {
			enabled: !0,
			external: null,
			position: "average",
			backgroundColor: "rgba(0,0,0,0.8)",
			titleColor: "#fff",
			titleFont: { weight: "bold" },
			titleSpacing: 2,
			titleMarginBottom: 6,
			titleAlign: "left",
			bodyColor: "#fff",
			bodySpacing: 2,
			bodyFont: {},
			bodyAlign: "left",
			footerColor: "#fff",
			footerSpacing: 2,
			footerMarginTop: 6,
			footerFont: { weight: "bold" },
			footerAlign: "left",
			padding: 6,
			caretPadding: 2,
			caretSize: 5,
			cornerRadius: 6,
			boxHeight: (e, t) => t.bodyFont.size,
			boxWidth: (e, t) => t.bodyFont.size,
			multiKeyBackground: "#fff",
			displayColors: !0,
			boxPadding: 0,
			borderColor: "rgba(0,0,0,0)",
			borderWidth: 0,
			animation: {
				duration: 400,
				easing: "easeOutQuart"
			},
			animations: {
				numbers: {
					type: "number",
					properties: [
						"x",
						"y",
						"width",
						"height",
						"caretX",
						"caretY"
					]
				},
				opacity: {
					easing: "linear",
					duration: 200
				}
			},
			callbacks: Pc
		},
		defaultRoutes: {
			bodyFont: "font",
			footerFont: "font",
			titleFont: "font"
		},
		descriptors: {
			_scriptable: (e) => e !== "filter" && e !== "itemSort" && e !== "external",
			_indexable: !1,
			callbacks: {
				_scriptable: !1,
				_indexable: !1
			},
			animation: { _fallback: !1 },
			animations: { _fallback: "animation" }
		},
		additionalOptionScopes: ["interaction"]
	}
}), Rc = (e, t, n, r) => (typeof t == "string" ? (n = e.push(t) - 1, r.unshift({
	index: n,
	label: t
})) : isNaN(t) && (n = null), n);
function zc(e, t, n, r) {
	let i = e.indexOf(t);
	return i === -1 ? Rc(e, t, n, r) : i === e.lastIndexOf(t) ? i : n;
}
var Bc = (e, t) => e === null ? null : rt(Math.round(e), 0, t);
function Vc(e) {
	let t = this.getLabels();
	return e >= 0 && e < t.length ? t[e] : e;
}
var Hc = class extends Ra {
	static id = "category";
	static defaults = { ticks: { callback: Vc } };
	constructor(e) {
		super(e), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
	}
	init(e) {
		let t = this._addedLabels;
		if (t.length) {
			let e = this.getLabels();
			for (let { index: n, label: r } of t) e[n] === r && e.splice(n, 1);
			this._addedLabels = [];
		}
		super.init(e);
	}
	parse(e, t) {
		if (F(e)) return null;
		let n = this.getLabels();
		return t = isFinite(t) && n[t] === e ? t : zc(n, e, B(t, e), this._addedLabels), Bc(t, n.length - 1);
	}
	determineDataLimits() {
		let { minDefined: e, maxDefined: t } = this.getUserBounds(), { min: n, max: r } = this.getMinMax(!0);
		this.options.bounds === "ticks" && (e || (n = 0), t || (r = this.getLabels().length - 1)), this.min = n, this.max = r;
	}
	buildTicks() {
		let e = this.min, t = this.max, n = this.options.offset, r = [], i = this.getLabels();
		i = e === 0 && t === i.length - 1 ? i : i.slice(e, t + 1), this._valueRange = Math.max(i.length - +!n, 1), this._startValue = this.min - (n ? .5 : 0);
		for (let n = e; n <= t; n++) r.push({ value: n });
		return r;
	}
	getLabelForValue(e) {
		return Vc.call(this, e);
	}
	configure() {
		super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
	}
	getPixelForValue(e) {
		return typeof e != "number" && (e = this.parse(e)), e === null ? NaN : this.getPixelForDecimal((e - this._startValue) / this._valueRange);
	}
	getPixelForTick(e) {
		let t = this.ticks;
		return e < 0 || e > t.length - 1 ? null : this.getPixelForValue(t[e].value);
	}
	getValueForPixel(e) {
		return Math.round(this._startValue + this.getDecimalForPixel(e) * this._valueRange);
	}
	getBasePixel() {
		return this.bottom;
	}
};
function Uc(e, t) {
	let n = [], { bounds: r, step: i, min: a, max: o, precision: s, count: c, maxTicks: l, maxDigits: u, includeBounds: d } = e, f = i || 1, p = l - 1, { min: m, max: h } = t, g = !F(a), _ = !F(o), v = !F(c), y = (h - m) / (u + 1), b = G((h - m) / p / f) * f, x, S, C, w;
	if (b < 1e-14 && !g && !_) return [{ value: m }, { value: h }];
	w = Math.ceil(h / b) - Math.floor(m / b), w > p && (b = G(w * b / p / f) * f), F(s) || (x = 10 ** s, b = Math.ceil(b * x) / x), r === "ticks" ? (S = Math.floor(m / b) * b, C = Math.ceil(h / b) * b) : (S = m, C = h), g && _ && i && qe((o - a) / i, b / 1e3) ? (w = Math.round(Math.min((o - a) / b, l)), b = (o - a) / w, S = a, C = o) : v ? (S = g ? a : S, C = _ ? o : C, w = c - 1, b = (C - S) / w) : (w = (C - S) / b, w = We(w, Math.round(w), b / 1e3) ? Math.round(w) : Math.ceil(w));
	let T = Math.max(Ze(b), Ze(S));
	x = 10 ** (F(s) ? T : s), S = Math.round(S * x) / x, C = Math.round(C * x) / x;
	let E = 0;
	for (g && (d && S !== a ? (n.push({ value: a }), S < a && E++, We(Math.round((S + E * b) * x) / x, a, Wc(a, y, e)) && E++) : S < a && E++); E < w; ++E) {
		let e = Math.round((S + E * b) * x) / x;
		if (_ && e > o) break;
		n.push({ value: e });
	}
	return _ && d && C !== o ? n.length && We(n[n.length - 1].value, o, Wc(o, y, e)) ? n[n.length - 1].value = o : n.push({ value: o }) : _ && C !== o || n.push({ value: C }), n;
}
function Wc(e, t, { horizontal: n, minRotation: r }) {
	let i = Ye(r), a = (n ? Math.sin(i) : Math.cos(i)) || .001, o = .75 * t * ("" + e).length;
	return Math.min(t / a, o);
}
var Gc = class extends Ra {
	constructor(e) {
		super(e), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
	}
	parse(e, t) {
		return F(e) || (typeof e == "number" || e instanceof Number) && !isFinite(+e) ? null : +e;
	}
	handleTickRangeOptions() {
		let { beginAtZero: e } = this.options, { minDefined: t, maxDefined: n } = this.getUserBounds(), { min: r, max: i } = this, a = (e) => r = t ? r : e, o = (e) => i = n ? i : e;
		if (e) {
			let e = Ue(r), t = Ue(i);
			e < 0 && t < 0 ? o(0) : e > 0 && t > 0 && a(0);
		}
		if (r === i) {
			let t = i === 0 ? 1 : Math.abs(i * .05);
			o(i + t), e || a(r - t);
		}
		this.min = r, this.max = i;
	}
	getTickLimit() {
		let { maxTicksLimit: e, stepSize: t } = this.options.ticks, n;
		return t ? (n = Math.ceil(this.max / t) - Math.floor(this.min / t) + 1, n > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${t} would result generating up to ${n} ticks. Limiting to 1000.`), n = 1e3)) : (n = this.computeTickLimit(), e ||= 11), e && (n = Math.min(e, n)), n;
	}
	computeTickLimit() {
		return Infinity;
	}
	buildTicks() {
		let e = this.options, t = e.ticks, n = this.getTickLimit();
		n = Math.max(2, n);
		let r = Uc({
			maxTicks: n,
			bounds: e.bounds,
			min: e.min,
			max: e.max,
			precision: t.precision,
			step: t.stepSize,
			count: t.count,
			maxDigits: this._maxDigits(),
			horizontal: this.isHorizontal(),
			minRotation: t.minRotation || 0,
			includeBounds: t.includeBounds !== !1
		}, this._range || this);
		return e.bounds === "ticks" && Je(r, this, "value"), e.reverse ? (r.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), r;
	}
	configure() {
		let e = this.ticks, t = this.min, n = this.max;
		if (super.configure(), this.options.offset && e.length) {
			let r = (n - t) / Math.max(e.length - 1, 1) / 2;
			t -= r, n += r;
		}
		this._startValue = t, this._endValue = n, this._valueRange = n - t;
	}
	getLabelForValue(e) {
		return Mt(e, this.chart.options.locale, this.options.ticks.format);
	}
}, Kc = class extends Gc {
	static id = "linear";
	static defaults = { ticks: { callback: Ft.formatters.numeric } };
	determineDataLimits() {
		let { min: e, max: t } = this.getMinMax(!0);
		this.min = z(e) ? e : 0, this.max = z(t) ? t : 1, this.handleTickRangeOptions();
	}
	computeTickLimit() {
		let e = this.isHorizontal(), t = e ? this.width : this.height, n = Ye(this.options.ticks.minRotation), r = (e ? Math.sin(n) : Math.cos(n)) || .001, i = this._resolveTickFontOptions(0);
		return Math.ceil(t / Math.min(40, i.lineHeight / r));
	}
	getPixelForValue(e) {
		return e === null ? NaN : this.getPixelForDecimal((e - this._startValue) / this._valueRange);
	}
	getValueForPixel(e) {
		return this._startValue + this.getDecimalForPixel(e) * this._valueRange;
	}
}, qc = (e) => Math.floor(He(e)), Jc = (e, t) => 10 ** (qc(e) + t);
function Yc(e) {
	return e / 10 ** qc(e) == 1;
}
function Xc(e, t, n) {
	let r = 10 ** n, i = Math.floor(e / r);
	return Math.ceil(t / r) - i;
}
function Zc(e, t) {
	let n = qc(t - e);
	for (; Xc(e, t, n) > 10;) n++;
	for (; Xc(e, t, n) < 10;) n--;
	return Math.min(n, qc(e));
}
function Qc(e, { min: t, max: n }) {
	t = _e(e.min, t);
	let r = [], i = qc(t), a = Zc(t, n), o = a < 0 ? 10 ** Math.abs(a) : 1, s = 10 ** a, c = i > a ? 10 ** i : 0, l = Math.round((t - c) * o) / o, u = Math.floor((t - c) / s / 10) * s * 10, d = Math.floor((l - u) / 10 ** a), f = _e(e.min, Math.round((c + u + d * 10 ** a) * o) / o);
	for (; f < n;) r.push({
		value: f,
		major: Yc(f),
		significand: d
	}), d >= 10 ? d = d < 15 ? 15 : 20 : d++, d >= 20 && (a++, d = 2, o = a >= 0 ? 1 : o), f = Math.round((c + u + d * 10 ** a) * o) / o;
	let p = _e(e.max, f);
	return r.push({
		value: p,
		major: Yc(p),
		significand: d
	}), r;
}
var $c = class extends Ra {
	static id = "logarithmic";
	static defaults = { ticks: {
		callback: Ft.formatters.logarithmic,
		major: { enabled: !0 }
	} };
	constructor(e) {
		super(e), this.start = void 0, this.end = void 0, this._startValue = void 0, this._valueRange = 0;
	}
	parse(e, t) {
		let n = Gc.prototype.parse.apply(this, [e, t]);
		if (n === 0) this._zero = !0;
		else return z(n) && n > 0 ? n : null;
	}
	determineDataLimits() {
		let { min: e, max: t } = this.getMinMax(!0);
		this.min = z(e) ? Math.max(0, e) : null, this.max = z(t) ? Math.max(0, t) : null, this.options.beginAtZero && (this._zero = !0), this._zero && this.min !== this._suggestedMin && !z(this._userMin) && (this.min = e === Jc(this.min, 0) ? Jc(this.min, -1) : Jc(this.min, 0)), this.handleTickRangeOptions();
	}
	handleTickRangeOptions() {
		let { minDefined: e, maxDefined: t } = this.getUserBounds(), n = this.min, r = this.max, i = (t) => n = e ? n : t, a = (e) => r = t ? r : e;
		n === r && (n <= 0 ? (i(1), a(10)) : (i(Jc(n, -1)), a(Jc(r, 1)))), n <= 0 && i(Jc(r, -1)), r <= 0 && a(Jc(n, 1)), this.min = n, this.max = r;
	}
	buildTicks() {
		let e = this.options, t = Qc({
			min: this._userMin,
			max: this._userMax
		}, this);
		return e.bounds === "ticks" && Je(t, this, "value"), e.reverse ? (t.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), t;
	}
	getLabelForValue(e) {
		return e === void 0 ? "0" : Mt(e, this.chart.options.locale, this.options.ticks.format);
	}
	configure() {
		let e = this.min;
		super.configure(), this._startValue = He(e), this._valueRange = He(this.max) - He(e);
	}
	getPixelForValue(e) {
		return (e === void 0 || e === 0) && (e = this.min), e === null || isNaN(e) ? NaN : this.getPixelForDecimal(e === this.min ? 0 : (He(e) - this._startValue) / this._valueRange);
	}
	getValueForPixel(e) {
		let t = this.getDecimalForPixel(e);
		return 10 ** (this._startValue + t * this._valueRange);
	}
};
function el(e) {
	let t = e.ticks;
	if (t.display && e.display) {
		let e = ln(t.backdropPadding);
		return B(t.font && t.font.size, Y.font.size) + e.height;
	}
	return 0;
}
function tl(e, t, n) {
	return n = I(n) ? n : [n], {
		w: Z(e, t.string, n),
		h: n.length * t.lineHeight
	};
}
function nl(e, t, n, r, i) {
	return e === r || e === i ? {
		start: t - n / 2,
		end: t + n / 2
	} : e < r || e > i ? {
		start: t - n,
		end: t
	} : {
		start: t,
		end: t + n
	};
}
function rl(e) {
	let t = {
		l: e.left + e._padding.left,
		r: e.right - e._padding.right,
		t: e.top + e._padding.top,
		b: e.bottom - e._padding.bottom
	}, n = Object.assign({}, t), r = [], i = [], a = e._pointLabels.length, o = e.options.pointLabels, s = o.centerPointLabels ? U / a : 0;
	for (let c = 0; c < a; c++) {
		let a = o.setContext(e.getPointLabelContext(c));
		i[c] = a.padding;
		let l = e.getPointPosition(c, e.drawingArea + i[c], s), u = un(a.font), d = tl(e.ctx, u, e._pointLabels[c]);
		r[c] = d;
		let f = tt(e.getIndexAngle(c) + s), p = Math.round(Xe(f));
		il(n, t, f, nl(p, l.x, d.w, 0, 180), nl(p, l.y, d.h, 90, 270));
	}
	e.setCenterPoint(t.l - n.l, n.r - t.r, t.t - n.t, n.b - t.b), e._pointLabelItems = sl(e, r, i);
}
function il(e, t, n, r, i) {
	let a = Math.abs(Math.sin(n)), o = Math.abs(Math.cos(n)), s = 0, c = 0;
	r.start < t.l ? (s = (t.l - r.start) / a, e.l = Math.min(e.l, t.l - s)) : r.end > t.r && (s = (r.end - t.r) / a, e.r = Math.max(e.r, t.r + s)), i.start < t.t ? (c = (t.t - i.start) / o, e.t = Math.min(e.t, t.t - c)) : i.end > t.b && (c = (i.end - t.b) / o, e.b = Math.max(e.b, t.b + c));
}
function al(e, t, n) {
	let r = e.drawingArea, { extra: i, additionalAngle: a, padding: o, size: s } = n, c = e.getPointPosition(t, r + i + o, a), l = Math.round(Xe(tt(c.angle + ze))), u = ul(c.y, s.h, l), d = cl(l), f = ll(c.x, s.w, d);
	return {
		visible: !0,
		x: c.x,
		y: u,
		textAlign: d,
		left: f,
		top: u,
		right: f + s.w,
		bottom: u + s.h
	};
}
function ol(e, t) {
	if (!t) return !0;
	let { left: n, top: r, right: i, bottom: a } = e;
	return !(Kt({
		x: n,
		y: r
	}, t) || Kt({
		x: n,
		y: a
	}, t) || Kt({
		x: i,
		y: r
	}, t) || Kt({
		x: i,
		y: a
	}, t));
}
function sl(e, t, n) {
	let r = [], i = e._pointLabels.length, a = e.options, { centerPointLabels: o, display: s } = a.pointLabels, c = {
		extra: el(a) / 2,
		additionalAngle: o ? U / i : 0
	}, l;
	for (let a = 0; a < i; a++) {
		c.padding = n[a], c.size = t[a];
		let i = al(e, a, c);
		r.push(i), s === "auto" && (i.visible = ol(i, l), i.visible && (l = i));
	}
	return r;
}
function cl(e) {
	return e === 0 || e === 180 ? "center" : e < 180 ? "left" : "right";
}
function ll(e, t, n) {
	return n === "right" ? e -= t : n === "center" && (e -= t / 2), e;
}
function ul(e, t, n) {
	return n === 90 || n === 270 ? e -= t / 2 : (n > 270 || n < 90) && (e -= t), e;
}
function dl(e, t, n) {
	let { left: r, top: i, right: a, bottom: o } = n, { backdropColor: s } = t;
	if (!F(s)) {
		let n = cn(t.borderRadius), c = ln(t.backdropPadding);
		e.fillStyle = s;
		let l = r - c.left, u = i - c.top, d = a - r + c.width, f = o - i + c.height;
		Object.values(n).some((e) => e !== 0) ? (e.beginPath(), tn(e, {
			x: l,
			y: u,
			w: d,
			h: f,
			radius: n
		}), e.fill()) : e.fillRect(l, u, d, f);
	}
}
function fl(e, t) {
	let { ctx: n, options: { pointLabels: r } } = e;
	for (let i = t - 1; i >= 0; i--) {
		let t = e._pointLabelItems[i];
		if (!t.visible) continue;
		let a = r.setContext(e.getPointLabelContext(i));
		dl(n, a, t);
		let o = un(a.font), { x: s, y: c, textAlign: l } = t;
		en(n, e._pointLabels[i], s, c + o.lineHeight / 2, o, {
			color: a.color,
			textAlign: l,
			textBaseline: "middle"
		});
	}
}
function pl(e, t, n, r) {
	let { ctx: i } = e;
	if (n) i.arc(e.xCenter, e.yCenter, t, 0, W);
	else {
		let n = e.getPointPosition(0, t);
		i.moveTo(n.x, n.y);
		for (let a = 1; a < r; a++) n = e.getPointPosition(a, t), i.lineTo(n.x, n.y);
	}
}
function ml(e, t, n, r, i) {
	let a = e.ctx, o = t.circular, { color: s, lineWidth: c } = t;
	!o && !r || !s || !c || n < 0 || (a.save(), a.strokeStyle = s, a.lineWidth = c, a.setLineDash(i.dash || []), a.lineDashOffset = i.dashOffset, a.beginPath(), pl(e, n, o, r), a.closePath(), a.stroke(), a.restore());
}
function hl(e, t, n) {
	return pn(e, {
		label: n,
		index: t,
		type: "pointLabel"
	});
}
var gl = class extends Gc {
	static id = "radialLinear";
	static defaults = {
		display: !0,
		animate: !0,
		position: "chartArea",
		angleLines: {
			display: !0,
			lineWidth: 1,
			borderDash: [],
			borderDashOffset: 0
		},
		grid: { circular: !1 },
		startAngle: 0,
		ticks: {
			showLabelBackdrop: !0,
			callback: Ft.formatters.numeric
		},
		pointLabels: {
			backdropColor: void 0,
			backdropPadding: 2,
			display: !0,
			font: { size: 10 },
			callback(e) {
				return e;
			},
			padding: 5,
			centerPointLabels: !1
		}
	};
	static defaultRoutes = {
		"angleLines.color": "borderColor",
		"pointLabels.color": "color",
		"ticks.color": "color"
	};
	static descriptors = { angleLines: { _fallback: "grid" } };
	constructor(e) {
		super(e), this.xCenter = void 0, this.yCenter = void 0, this.drawingArea = void 0, this._pointLabels = [], this._pointLabelItems = [];
	}
	setDimensions() {
		let e = this._padding = ln(el(this.options) / 2), t = this.width = this.maxWidth - e.width, n = this.height = this.maxHeight - e.height;
		this.xCenter = Math.floor(this.left + t / 2 + e.left), this.yCenter = Math.floor(this.top + n / 2 + e.top), this.drawingArea = Math.floor(Math.min(t, n) / 2);
	}
	determineDataLimits() {
		let { min: e, max: t } = this.getMinMax(!1);
		this.min = z(e) && !isNaN(e) ? e : 0, this.max = z(t) && !isNaN(t) ? t : 0, this.handleTickRangeOptions();
	}
	computeTickLimit() {
		return Math.ceil(this.drawingArea / el(this.options));
	}
	generateTickLabels(e) {
		Gc.prototype.generateTickLabels.call(this, e), this._pointLabels = this.getLabels().map((e, t) => {
			let n = V(this.options.pointLabels.callback, [e, t], this);
			return n || n === 0 ? n : "";
		}).filter((e, t) => this.chart.getDataVisibility(t));
	}
	fit() {
		let e = this.options;
		e.display && e.pointLabels.display ? rl(this) : this.setCenterPoint(0, 0, 0, 0);
	}
	setCenterPoint(e, t, n, r) {
		this.xCenter += Math.floor((e - t) / 2), this.yCenter += Math.floor((n - r) / 2), this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(e, t, n, r));
	}
	getIndexAngle(e) {
		let t = W / (this._pointLabels.length || 1), n = this.options.startAngle || 0;
		return tt(e * t + Ye(n));
	}
	getDistanceFromCenterForValue(e) {
		if (F(e)) return NaN;
		let t = this.drawingArea / (this.max - this.min);
		return this.options.reverse ? (this.max - e) * t : (e - this.min) * t;
	}
	getValueForDistanceFromCenter(e) {
		if (F(e)) return NaN;
		let t = e / (this.drawingArea / (this.max - this.min));
		return this.options.reverse ? this.max - t : this.min + t;
	}
	getPointLabelContext(e) {
		let t = this._pointLabels || [];
		if (e >= 0 && e < t.length) {
			let n = t[e];
			return hl(this.getContext(), e, n);
		}
	}
	getPointPosition(e, t, n = 0) {
		let r = this.getIndexAngle(e) - ze + n;
		return {
			x: Math.cos(r) * t + this.xCenter,
			y: Math.sin(r) * t + this.yCenter,
			angle: r
		};
	}
	getPointPositionForValue(e, t) {
		return this.getPointPosition(e, this.getDistanceFromCenterForValue(t));
	}
	getBasePosition(e) {
		return this.getPointPositionForValue(e || 0, this.getBaseValue());
	}
	getPointLabelPosition(e) {
		let { left: t, top: n, right: r, bottom: i } = this._pointLabelItems[e];
		return {
			left: t,
			top: n,
			right: r,
			bottom: i
		};
	}
	drawBackground() {
		let { backgroundColor: e, grid: { circular: t } } = this.options;
		if (e) {
			let n = this.ctx;
			n.save(), n.beginPath(), pl(this, this.getDistanceFromCenterForValue(this._endValue), t, this._pointLabels.length), n.closePath(), n.fillStyle = e, n.fill(), n.restore();
		}
	}
	drawGrid() {
		let e = this.ctx, t = this.options, { angleLines: n, grid: r, border: i } = t, a = this._pointLabels.length, o, s, c;
		if (t.pointLabels.display && fl(this, a), r.display && this.ticks.forEach((e, t) => {
			if (t !== 0 || t === 0 && this.min < 0) {
				s = this.getDistanceFromCenterForValue(e.value);
				let n = this.getContext(t), o = r.setContext(n), c = i.setContext(n);
				ml(this, o, s, a, c);
			}
		}), n.display) {
			for (e.save(), o = a - 1; o >= 0; o--) {
				let r = n.setContext(this.getPointLabelContext(o)), { color: i, lineWidth: a } = r;
				a && i && (e.lineWidth = a, e.strokeStyle = i, e.setLineDash(r.borderDash), e.lineDashOffset = r.borderDashOffset, s = this.getDistanceFromCenterForValue(t.reverse ? this.min : this.max), c = this.getPointPosition(o, s), e.beginPath(), e.moveTo(this.xCenter, this.yCenter), e.lineTo(c.x, c.y), e.stroke());
			}
			e.restore();
		}
	}
	drawBorder() {}
	drawLabels() {
		let e = this.ctx, t = this.options, n = t.ticks;
		if (!n.display) return;
		let r = this.getIndexAngle(0), i, a;
		e.save(), e.translate(this.xCenter, this.yCenter), e.rotate(r), e.textAlign = "center", e.textBaseline = "middle", this.ticks.forEach((r, o) => {
			if (o === 0 && this.min >= 0 && !t.reverse) return;
			let s = n.setContext(this.getContext(o)), c = un(s.font);
			if (i = this.getDistanceFromCenterForValue(this.ticks[o].value), s.showLabelBackdrop) {
				e.font = c.string, a = e.measureText(r.label).width, e.fillStyle = s.backdropColor;
				let t = ln(s.backdropPadding);
				e.fillRect(-a / 2 - t.left, -i - c.size / 2 - t.top, a + t.width, c.size + t.height);
			}
			en(e, r.label, 0, -i, c, {
				color: s.color,
				strokeColor: s.textStrokeColor,
				strokeWidth: s.textStrokeWidth
			});
		}), e.restore();
	}
	drawTitle() {}
}, _l = {
	millisecond: {
		common: !0,
		size: 1,
		steps: 1e3
	},
	second: {
		common: !0,
		size: 1e3,
		steps: 60
	},
	minute: {
		common: !0,
		size: 6e4,
		steps: 60
	},
	hour: {
		common: !0,
		size: 36e5,
		steps: 24
	},
	day: {
		common: !0,
		size: 864e5,
		steps: 30
	},
	week: {
		common: !1,
		size: 6048e5,
		steps: 4
	},
	month: {
		common: !0,
		size: 2628e6,
		steps: 12
	},
	quarter: {
		common: !1,
		size: 7884e6,
		steps: 4
	},
	year: {
		common: !0,
		size: 3154e7
	}
}, vl = /* #__PURE__ */ Object.keys(_l);
function yl(e, t) {
	return e - t;
}
function bl(e, t) {
	if (F(t)) return null;
	let n = e._adapter, { parser: r, round: i, isoWeekday: a } = e._parseOpts, o = t;
	return typeof r == "function" && (o = r(o)), z(o) || (o = typeof r == "string" ? n.parse(o, r) : n.parse(o)), o === null ? null : (i && (o = i === "week" && (Ke(a) || a === !0) ? n.startOf(o, "isoWeek", a) : n.startOf(o, i)), +o);
}
function xl(e, t, n, r) {
	let i = vl.length;
	for (let a = vl.indexOf(e); a < i - 1; ++a) {
		let e = _l[vl[a]], i = e.steps ? e.steps : 2 ** 53 - 1;
		if (e.common && Math.ceil((n - t) / (i * e.size)) <= r) return vl[a];
	}
	return vl[i - 1];
}
function Sl(e, t, n, r, i) {
	for (let a = vl.length - 1; a >= vl.indexOf(n); a--) {
		let n = vl[a];
		if (_l[n].common && e._adapter.diff(i, r, n) >= t - 1) return n;
	}
	return vl[n ? vl.indexOf(n) : 0];
}
function Cl(e) {
	for (let t = vl.indexOf(e) + 1, n = vl.length; t < n; ++t) if (_l[vl[t]].common) return vl[t];
}
function wl(e, t, n) {
	if (!n) e[t] = !0;
	else if (n.length) {
		let { lo: r, hi: i } = ot(n, t), a = n[r] >= t ? n[r] : n[i];
		e[a] = !0;
	}
}
function Tl(e, t, n, r) {
	let i = e._adapter, a = +i.startOf(t[0].value, r), o = t[t.length - 1].value, s, c;
	for (s = a; s <= o; s = +i.add(s, 1, r)) c = n[s], c >= 0 && (t[c].major = !0);
	return t;
}
function El(e, t, n) {
	let r = [], i = {}, a = t.length, o, s;
	for (o = 0; o < a; ++o) s = t[o], i[s] = o, r.push({
		value: s,
		major: !1
	});
	return a === 0 || !n ? r : Tl(e, r, i, n);
}
var Dl = class extends Ra {
	static id = "time";
	static defaults = {
		bounds: "data",
		adapters: {},
		time: {
			parser: !1,
			unit: !1,
			round: !1,
			isoWeekday: !1,
			minUnit: "millisecond",
			displayFormats: {}
		},
		ticks: {
			source: "auto",
			callback: !1,
			major: { enabled: !1 }
		}
	};
	constructor(e) {
		super(e), this._cache = {
			data: [],
			labels: [],
			all: []
		}, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
	}
	init(e, t = {}) {
		let n = e.time ||= {}, r = this._adapter = new Si._date(e.adapters.date);
		r.init(t), Te(n.displayFormats, r.formats()), this._parseOpts = {
			parser: n.parser,
			round: n.round,
			isoWeekday: n.isoWeekday
		}, super.init(e), this._normalized = t.normalized;
	}
	parse(e, t) {
		return e === void 0 ? null : bl(this, e);
	}
	beforeLayout() {
		super.beforeLayout(), this._cache = {
			data: [],
			labels: [],
			all: []
		};
	}
	determineDataLimits() {
		let e = this.options, t = this._adapter, n = e.time.unit || "day", { min: r, max: i, minDefined: a, maxDefined: o } = this.getUserBounds();
		function s(e) {
			!a && !isNaN(e.min) && (r = Math.min(r, e.min)), !o && !isNaN(e.max) && (i = Math.max(i, e.max));
		}
		a && o || (s(this._getLabelBounds()), (e.bounds !== "ticks" || e.ticks.source !== "labels") && s(this.getMinMax(!1))), r = z(r) && !isNaN(r) ? r : +t.startOf(Date.now(), n), i = z(i) && !isNaN(i) ? i : +t.endOf(Date.now(), n) + 1, this.min = Math.min(r, i - 1), this.max = Math.max(r + 1, i);
	}
	_getLabelBounds() {
		let e = this.getLabelTimestamps(), t = Infinity, n = -Infinity;
		return e.length && (t = e[0], n = e[e.length - 1]), {
			min: t,
			max: n
		};
	}
	buildTicks() {
		let e = this.options, t = e.time, n = e.ticks, r = n.source === "labels" ? this.getLabelTimestamps() : this._generate();
		e.bounds === "ticks" && r.length && (this.min = this._userMin || r[0], this.max = this._userMax || r[r.length - 1]);
		let i = this.min, a = this.max, o = lt(r, i, a);
		return this._unit = t.unit || (n.autoSkip ? xl(t.minUnit, this.min, this.max, this._getLabelCapacity(i)) : Sl(this, o.length, t.minUnit, this.min, this.max)), this._majorUnit = !n.major.enabled || this._unit === "year" ? void 0 : Cl(this._unit), this.initOffsets(r), e.reverse && o.reverse(), El(this, o, this._majorUnit);
	}
	afterAutoSkip() {
		this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((e) => +e.value));
	}
	initOffsets(e = []) {
		let t = 0, n = 0, r, i;
		this.options.offset && e.length && (r = this.getDecimalForValue(e[0]), t = e.length === 1 ? 1 - r : (this.getDecimalForValue(e[1]) - r) / 2, i = this.getDecimalForValue(e[e.length - 1]), n = e.length === 1 ? i : (i - this.getDecimalForValue(e[e.length - 2])) / 2);
		let a = e.length < 3 ? .5 : .25;
		t = rt(t, 0, a), n = rt(n, 0, a), this._offsets = {
			start: t,
			end: n,
			factor: 1 / (t + 1 + n)
		};
	}
	_generate() {
		let e = this._adapter, t = this.min, n = this.max, r = this.options, i = r.time, a = i.unit || xl(i.minUnit, t, n, this._getLabelCapacity(t)), o = B(r.ticks.stepSize, 1), s = a === "week" && i.isoWeekday, c = Ke(s) || s === !0, l = {}, u = t, d, f;
		if (c && (u = +e.startOf(u, "isoWeek", s)), u = +e.startOf(u, c ? "day" : a), e.diff(n, t, a) > 1e5 * o) throw Error(t + " and " + n + " are too far apart with stepSize of " + o + " " + a);
		let p = r.ticks.source === "data" && this.getDataTimestamps();
		for (d = u, f = 0; d < n; d = +e.add(d, o, a), f++) wl(l, d, p);
		return (d === n || r.bounds === "ticks" || f === 1) && wl(l, d, p), Object.keys(l).sort(yl).map((e) => +e);
	}
	getLabelForValue(e) {
		let t = this._adapter, n = this.options.time;
		return n.tooltipFormat ? t.format(e, n.tooltipFormat) : t.format(e, n.displayFormats.datetime);
	}
	format(e, t) {
		let n = this.options.time.displayFormats, r = this._unit, i = t || n[r];
		return this._adapter.format(e, i);
	}
	_tickFormatFunction(e, t, n, r) {
		let i = this.options, a = i.ticks.callback;
		if (a) return V(a, [
			e,
			t,
			n
		], this);
		let o = i.time.displayFormats, s = this._unit, c = this._majorUnit, l = s && o[s], u = c && o[c], d = n[t], f = c && u && d && d.major;
		return this._adapter.format(e, r || (f ? u : l));
	}
	generateTickLabels(e) {
		let t, n, r;
		for (t = 0, n = e.length; t < n; ++t) r = e[t], r.label = this._tickFormatFunction(r.value, t, e);
	}
	getDecimalForValue(e) {
		return e === null ? NaN : (e - this.min) / (this.max - this.min);
	}
	getPixelForValue(e) {
		let t = this._offsets, n = this.getDecimalForValue(e);
		return this.getPixelForDecimal((t.start + n) * t.factor);
	}
	getValueForPixel(e) {
		let t = this._offsets, n = this.getDecimalForPixel(e) / t.factor - t.end;
		return this.min + n * (this.max - this.min);
	}
	_getLabelSize(e) {
		let t = this.options.ticks, n = this.ctx.measureText(e).width, r = Ye(this.isHorizontal() ? t.maxRotation : t.minRotation), i = Math.cos(r), a = Math.sin(r), o = this._resolveTickFontOptions(0).size;
		return {
			w: n * i + o * a,
			h: n * a + o * i
		};
	}
	_getLabelCapacity(e) {
		let t = this.options.time, n = t.displayFormats, r = n[t.unit] || n.millisecond, i = this._tickFormatFunction(e, 0, El(this, [e], this._majorUnit), r), a = this._getLabelSize(i), o = Math.floor(this.isHorizontal() ? this.width / a.w : this.height / a.h) - 1;
		return o > 0 ? o : 1;
	}
	getDataTimestamps() {
		let e = this._cache.data || [], t, n;
		if (e.length) return e;
		let r = this.getMatchingVisibleMetas();
		if (this._normalized && r.length) return this._cache.data = r[0].controller.getAllParsedValues(this);
		for (t = 0, n = r.length; t < n; ++t) e = e.concat(r[t].controller.getAllParsedValues(this));
		return this._cache.data = this.normalize(e);
	}
	getLabelTimestamps() {
		let e = this._cache.labels || [], t, n;
		if (e.length) return e;
		let r = this.getLabels();
		for (t = 0, n = r.length; t < n; ++t) e.push(bl(this, r[t]));
		return this._cache.labels = this._normalized ? e : this.normalize(e);
	}
	normalize(e) {
		return pt(e.sort(yl));
	}
};
function Ol(e, t, n) {
	let r = 0, i = e.length - 1, a, o, s, c;
	n ? (t >= e[r].pos && t <= e[i].pos && ({lo: r, hi: i} = st(e, "pos", t)), {pos: a, time: s} = e[r], {pos: o, time: c} = e[i]) : (t >= e[r].time && t <= e[i].time && ({lo: r, hi: i} = st(e, "time", t)), {time: a, pos: s} = e[r], {time: o, pos: c} = e[i]);
	let l = o - a;
	return l ? s + (c - s) * (t - a) / l : s;
}
var kl = class extends Dl {
	static id = "timeseries";
	static defaults = Dl.defaults;
	constructor(e) {
		super(e), this._table = [], this._minPos = void 0, this._tableRange = void 0;
	}
	initOffsets() {
		let e = this._getTimestampsForTable(), t = this._table = this.buildLookupTable(e);
		this._minPos = Ol(t, this.min), this._tableRange = Ol(t, this.max) - this._minPos, super.initOffsets(e);
	}
	buildLookupTable(e) {
		let { min: t, max: n } = this, r = [], i = [], a, o, s, c, l;
		for (a = 0, o = e.length; a < o; ++a) c = e[a], c >= t && c <= n && r.push(c);
		if (r.length < 2) return [{
			time: t,
			pos: 0
		}, {
			time: n,
			pos: 1
		}];
		for (a = 0, o = r.length; a < o; ++a) l = r[a + 1], s = r[a - 1], c = r[a], Math.round((l + s) / 2) !== c && i.push({
			time: c,
			pos: a / (o - 1)
		});
		return i;
	}
	_generate() {
		let e = this.min, t = this.max, n = super.getDataTimestamps();
		return n.includes(e) && n.length || n.splice(0, 0, e), n.includes(t) && n.length !== 1 || n.push(t), n.sort((e, t) => e - t);
	}
	_getTimestampsForTable() {
		let e = this._cache.all || [];
		if (e.length) return e;
		let t = this.getDataTimestamps(), n = this.getLabelTimestamps();
		return e = t.length && n.length ? this.normalize(t.concat(n)) : t.length ? t : n, e = this._cache.all = e, e;
	}
	getDecimalForValue(e) {
		return (Ol(this._table, e) - this._minPos) / this._tableRange;
	}
	getValueForPixel(e) {
		let t = this._offsets, n = this.getDecimalForPixel(e) / t.factor - t.end;
		return Ol(this._table, n * this._tableRange + this._minPos, !0);
	}
}, Al = [
	bi,
	ls,
	Lc,
	/* @__PURE__ */ Object.freeze({
		__proto__: null,
		CategoryScale: Hc,
		LinearScale: Kc,
		LogarithmicScale: $c,
		RadialLinearScale: gl,
		TimeScale: Dl,
		TimeSeriesScale: kl
	})
], jl = /* @__PURE__ */ t(((e, t, n) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? r(e) : typeof define == "function" && define.amd ? define(["exports"], r) : (n = typeof globalThis < "u" ? globalThis : n || self, r(n.leaflet = {}));
	})(n, (function(e) {
		var t = "1.9.4";
		function n(e) {
			for (var t, n = 1, r = arguments.length, i; n < r; n++) for (t in i = arguments[n], i) e[t] = i[t];
			return e;
		}
		var r = Object.create || (function() {
			function e() {}
			return function(t) {
				return e.prototype = t, new e();
			};
		})();
		function i(e, t) {
			var n = Array.prototype.slice;
			if (e.bind) return e.bind.apply(e, n.call(arguments, 1));
			var r = n.call(arguments, 2);
			return function() {
				return e.apply(t, r.length ? r.concat(n.call(arguments)) : arguments);
			};
		}
		var a = 0;
		function o(e) {
			return "_leaflet_id" in e || (e._leaflet_id = ++a), e._leaflet_id;
		}
		function s(e, t, n) {
			var r, i, a, o = function() {
				r = !1, i &&= (a.apply(n, i), !1);
			};
			return a = function() {
				r ? i = arguments : (e.apply(n, arguments), setTimeout(o, t), r = !0);
			}, a;
		}
		function c(e, t, n) {
			var r = t[1], i = t[0], a = r - i;
			return e === r && n ? e : ((e - i) % a + a) % a + i;
		}
		function l() {
			return !1;
		}
		function u(e, t) {
			if (t === !1) return e;
			var n = 10 ** (t === void 0 ? 6 : t);
			return Math.round(e * n) / n;
		}
		function d(e) {
			return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
		}
		function f(e) {
			return d(e).split(/\s+/);
		}
		function p(e, t) {
			for (var n in Object.prototype.hasOwnProperty.call(e, "options") || (e.options = e.options ? r(e.options) : {}), t) e.options[n] = t[n];
			return e.options;
		}
		function m(e, t, n) {
			var r = [];
			for (var i in e) r.push(encodeURIComponent(n ? i.toUpperCase() : i) + "=" + encodeURIComponent(e[i]));
			return (!t || t.indexOf("?") === -1 ? "?" : "&") + r.join("&");
		}
		var h = /\{ *([\w_ -]+) *\}/g;
		function g(e, t) {
			return e.replace(h, function(e, n) {
				var r = t[n];
				if (r === void 0) throw Error("No value provided for variable " + e);
				return typeof r == "function" && (r = r(t)), r;
			});
		}
		var _ = Array.isArray || function(e) {
			return Object.prototype.toString.call(e) === "[object Array]";
		};
		function v(e, t) {
			for (var n = 0; n < e.length; n++) if (e[n] === t) return n;
			return -1;
		}
		var y = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
		function b(e) {
			return window["webkit" + e] || window["moz" + e] || window["ms" + e];
		}
		var x = 0;
		function S(e) {
			var t = +/* @__PURE__ */ new Date(), n = Math.max(0, 16 - (t - x));
			return x = t + n, window.setTimeout(e, n);
		}
		var C = window.requestAnimationFrame || b("RequestAnimationFrame") || S, w = window.cancelAnimationFrame || b("CancelAnimationFrame") || b("CancelRequestAnimationFrame") || function(e) {
			window.clearTimeout(e);
		};
		function T(e, t, n) {
			if (n && C === S) e.call(t);
			else return C.call(window, i(e, t));
		}
		function E(e) {
			e && w.call(window, e);
		}
		var ee = {
			__proto__: null,
			extend: n,
			create: r,
			bind: i,
			get lastId() {
				return a;
			},
			stamp: o,
			throttle: s,
			wrapNum: c,
			falseFn: l,
			formatNum: u,
			trim: d,
			splitWords: f,
			setOptions: p,
			getParamString: m,
			template: g,
			isArray: _,
			indexOf: v,
			emptyImageUrl: y,
			requestFn: C,
			cancelFn: w,
			requestAnimFrame: T,
			cancelAnimFrame: E
		};
		function te() {}
		te.extend = function(e) {
			var t = function() {
				p(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
			}, i = t.__super__ = this.prototype, a = r(i);
			for (var o in a.constructor = t, t.prototype = a, this) Object.prototype.hasOwnProperty.call(this, o) && o !== "prototype" && o !== "__super__" && (t[o] = this[o]);
			return e.statics && n(t, e.statics), e.includes && (ne(e.includes), n.apply(null, [a].concat(e.includes))), n(a, e), delete a.statics, delete a.includes, a.options && (a.options = i.options ? r(i.options) : {}, n(a.options, e.options)), a._initHooks = [], a.callInitHooks = function() {
				if (!this._initHooksCalled) {
					i.callInitHooks && i.callInitHooks.call(this), this._initHooksCalled = !0;
					for (var e = 0, t = a._initHooks.length; e < t; e++) a._initHooks[e].call(this);
				}
			}, t;
		}, te.include = function(e) {
			var t = this.prototype.options;
			return n(this.prototype, e), e.options && (this.prototype.options = t, this.mergeOptions(e.options)), this;
		}, te.mergeOptions = function(e) {
			return n(this.prototype.options, e), this;
		}, te.addInitHook = function(e) {
			var t = Array.prototype.slice.call(arguments, 1), n = typeof e == "function" ? e : function() {
				this[e].apply(this, t);
			};
			return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(n), this;
		};
		function ne(e) {
			if (typeof L < "u" && L && L.Mixin) {
				e = _(e) ? e : [e];
				for (var t = 0; t < e.length; t++) e[t] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", (/* @__PURE__ */ Error()).stack);
			}
		}
		var D = {
			on: function(e, t, n) {
				if (typeof e == "object") for (var r in e) this._on(r, e[r], t);
				else {
					e = f(e);
					for (var i = 0, a = e.length; i < a; i++) this._on(e[i], t, n);
				}
				return this;
			},
			off: function(e, t, n) {
				if (!arguments.length) delete this._events;
				else if (typeof e == "object") for (var r in e) this._off(r, e[r], t);
				else {
					e = f(e);
					for (var i = arguments.length === 1, a = 0, o = e.length; a < o; a++) i ? this._off(e[a]) : this._off(e[a], t, n);
				}
				return this;
			},
			_on: function(e, t, n, r) {
				if (typeof t != "function") console.warn("wrong listener type: " + typeof t);
				else if (this._listens(e, t, n) === !1) {
					n === this && (n = void 0);
					var i = {
						fn: t,
						ctx: n
					};
					r && (i.once = !0), this._events = this._events || {}, this._events[e] = this._events[e] || [], this._events[e].push(i);
				}
			},
			_off: function(e, t, n) {
				var r, i, a;
				if (this._events && (r = this._events[e], r)) {
					if (arguments.length === 1) {
						if (this._firingCount) for (i = 0, a = r.length; i < a; i++) r[i].fn = l;
						delete this._events[e];
					} else if (typeof t != "function") console.warn("wrong listener type: " + typeof t);
					else {
						var o = this._listens(e, t, n);
						if (o !== !1) {
							var s = r[o];
							this._firingCount && (s.fn = l, this._events[e] = r = r.slice()), r.splice(o, 1);
						}
					}
				}
			},
			fire: function(e, t, r) {
				if (!this.listens(e, r)) return this;
				var i = n({}, t, {
					type: e,
					target: this,
					sourceTarget: t && t.sourceTarget || this
				});
				if (this._events) {
					var a = this._events[e];
					if (a) {
						this._firingCount = this._firingCount + 1 || 1;
						for (var o = 0, s = a.length; o < s; o++) {
							var c = a[o], l = c.fn;
							c.once && this.off(e, l, c.ctx), l.call(c.ctx || this, i);
						}
						this._firingCount--;
					}
				}
				return r && this._propagateEvent(i), this;
			},
			listens: function(e, t, n, r) {
				typeof e != "string" && console.warn("\"string\" type argument expected");
				var i = t;
				typeof t != "function" && (r = !!t, i = void 0, n = void 0);
				var a = this._events && this._events[e];
				if (a && a.length && this._listens(e, i, n) !== !1) return !0;
				if (r) {
					for (var o in this._eventParents) if (this._eventParents[o].listens(e, t, n, r)) return !0;
				}
				return !1;
			},
			_listens: function(e, t, n) {
				if (!this._events) return !1;
				var r = this._events[e] || [];
				if (!t) return !!r.length;
				n === this && (n = void 0);
				for (var i = 0, a = r.length; i < a; i++) if (r[i].fn === t && r[i].ctx === n) return i;
				return !1;
			},
			once: function(e, t, n) {
				if (typeof e == "object") for (var r in e) this._on(r, e[r], t, !0);
				else {
					e = f(e);
					for (var i = 0, a = e.length; i < a; i++) this._on(e[i], t, n, !0);
				}
				return this;
			},
			addEventParent: function(e) {
				return this._eventParents = this._eventParents || {}, this._eventParents[o(e)] = e, this;
			},
			removeEventParent: function(e) {
				return this._eventParents && delete this._eventParents[o(e)], this;
			},
			_propagateEvent: function(e) {
				for (var t in this._eventParents) this._eventParents[t].fire(e.type, n({
					layer: e.target,
					propagatedFrom: e.target
				}, e), !0);
			}
		};
		D.addEventListener = D.on, D.removeEventListener = D.clearAllEventListeners = D.off, D.addOneTimeEventListener = D.once, D.fireEvent = D.fire, D.hasEventListeners = D.listens;
		var re = te.extend(D);
		function O(e, t, n) {
			this.x = n ? Math.round(e) : e, this.y = n ? Math.round(t) : t;
		}
		var ie = Math.trunc || function(e) {
			return e > 0 ? Math.floor(e) : Math.ceil(e);
		};
		O.prototype = {
			clone: function() {
				return new O(this.x, this.y);
			},
			add: function(e) {
				return this.clone()._add(k(e));
			},
			_add: function(e) {
				return this.x += e.x, this.y += e.y, this;
			},
			subtract: function(e) {
				return this.clone()._subtract(k(e));
			},
			_subtract: function(e) {
				return this.x -= e.x, this.y -= e.y, this;
			},
			divideBy: function(e) {
				return this.clone()._divideBy(e);
			},
			_divideBy: function(e) {
				return this.x /= e, this.y /= e, this;
			},
			multiplyBy: function(e) {
				return this.clone()._multiplyBy(e);
			},
			_multiplyBy: function(e) {
				return this.x *= e, this.y *= e, this;
			},
			scaleBy: function(e) {
				return new O(this.x * e.x, this.y * e.y);
			},
			unscaleBy: function(e) {
				return new O(this.x / e.x, this.y / e.y);
			},
			round: function() {
				return this.clone()._round();
			},
			_round: function() {
				return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
			},
			floor: function() {
				return this.clone()._floor();
			},
			_floor: function() {
				return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
			},
			ceil: function() {
				return this.clone()._ceil();
			},
			_ceil: function() {
				return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
			},
			trunc: function() {
				return this.clone()._trunc();
			},
			_trunc: function() {
				return this.x = ie(this.x), this.y = ie(this.y), this;
			},
			distanceTo: function(e) {
				e = k(e);
				var t = e.x - this.x, n = e.y - this.y;
				return Math.sqrt(t * t + n * n);
			},
			equals: function(e) {
				return e = k(e), e.x === this.x && e.y === this.y;
			},
			contains: function(e) {
				return e = k(e), Math.abs(e.x) <= Math.abs(this.x) && Math.abs(e.y) <= Math.abs(this.y);
			},
			toString: function() {
				return "Point(" + u(this.x) + ", " + u(this.y) + ")";
			}
		};
		function k(e, t, n) {
			return e instanceof O ? e : _(e) ? new O(e[0], e[1]) : e == null ? e : typeof e == "object" && "x" in e && "y" in e ? new O(e.x, e.y) : new O(e, t, n);
		}
		function A(e, t) {
			if (e) for (var n = t ? [e, t] : e, r = 0, i = n.length; r < i; r++) this.extend(n[r]);
		}
		A.prototype = {
			extend: function(e) {
				var t, n;
				if (!e) return this;
				if (e instanceof O || typeof e[0] == "number" || "x" in e) t = n = k(e);
				else if (e = ae(e), t = e.min, n = e.max, !t || !n) return this;
				return !this.min && !this.max ? (this.min = t.clone(), this.max = n.clone()) : (this.min.x = Math.min(t.x, this.min.x), this.max.x = Math.max(n.x, this.max.x), this.min.y = Math.min(t.y, this.min.y), this.max.y = Math.max(n.y, this.max.y)), this;
			},
			getCenter: function(e) {
				return k((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, e);
			},
			getBottomLeft: function() {
				return k(this.min.x, this.max.y);
			},
			getTopRight: function() {
				return k(this.max.x, this.min.y);
			},
			getTopLeft: function() {
				return this.min;
			},
			getBottomRight: function() {
				return this.max;
			},
			getSize: function() {
				return this.max.subtract(this.min);
			},
			contains: function(e) {
				var t, n;
				return e = typeof e[0] == "number" || e instanceof O ? k(e) : ae(e), e instanceof A ? (t = e.min, n = e.max) : t = n = e, t.x >= this.min.x && n.x <= this.max.x && t.y >= this.min.y && n.y <= this.max.y;
			},
			intersects: function(e) {
				e = ae(e);
				var t = this.min, n = this.max, r = e.min, i = e.max, a = i.x >= t.x && r.x <= n.x, o = i.y >= t.y && r.y <= n.y;
				return a && o;
			},
			overlaps: function(e) {
				e = ae(e);
				var t = this.min, n = this.max, r = e.min, i = e.max, a = i.x > t.x && r.x < n.x, o = i.y > t.y && r.y < n.y;
				return a && o;
			},
			isValid: function() {
				return !!(this.min && this.max);
			},
			pad: function(e) {
				var t = this.min, n = this.max, r = Math.abs(t.x - n.x) * e, i = Math.abs(t.y - n.y) * e;
				return ae(k(t.x - r, t.y - i), k(n.x + r, n.y + i));
			},
			equals: function(e) {
				return e ? (e = ae(e), this.min.equals(e.getTopLeft()) && this.max.equals(e.getBottomRight())) : !1;
			}
		};
		function ae(e, t) {
			return !e || e instanceof A ? e : new A(e, t);
		}
		function j(e, t) {
			if (e) for (var n = t ? [e, t] : e, r = 0, i = n.length; r < i; r++) this.extend(n[r]);
		}
		j.prototype = {
			extend: function(e) {
				var t = this._southWest, n = this._northEast, r, i;
				if (e instanceof N) r = e, i = e;
				else if (e instanceof j) {
					if (r = e._southWest, i = e._northEast, !r || !i) return this;
				} else return e ? this.extend(P(e) || M(e)) : this;
				return !t && !n ? (this._southWest = new N(r.lat, r.lng), this._northEast = new N(i.lat, i.lng)) : (t.lat = Math.min(r.lat, t.lat), t.lng = Math.min(r.lng, t.lng), n.lat = Math.max(i.lat, n.lat), n.lng = Math.max(i.lng, n.lng)), this;
			},
			pad: function(e) {
				var t = this._southWest, n = this._northEast, r = Math.abs(t.lat - n.lat) * e, i = Math.abs(t.lng - n.lng) * e;
				return new j(new N(t.lat - r, t.lng - i), new N(n.lat + r, n.lng + i));
			},
			getCenter: function() {
				return new N((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2);
			},
			getSouthWest: function() {
				return this._southWest;
			},
			getNorthEast: function() {
				return this._northEast;
			},
			getNorthWest: function() {
				return new N(this.getNorth(), this.getWest());
			},
			getSouthEast: function() {
				return new N(this.getSouth(), this.getEast());
			},
			getWest: function() {
				return this._southWest.lng;
			},
			getSouth: function() {
				return this._southWest.lat;
			},
			getEast: function() {
				return this._northEast.lng;
			},
			getNorth: function() {
				return this._northEast.lat;
			},
			contains: function(e) {
				e = typeof e[0] == "number" || e instanceof N || "lat" in e ? P(e) : M(e);
				var t = this._southWest, n = this._northEast, r, i;
				return e instanceof j ? (r = e.getSouthWest(), i = e.getNorthEast()) : r = i = e, r.lat >= t.lat && i.lat <= n.lat && r.lng >= t.lng && i.lng <= n.lng;
			},
			intersects: function(e) {
				e = M(e);
				var t = this._southWest, n = this._northEast, r = e.getSouthWest(), i = e.getNorthEast(), a = i.lat >= t.lat && r.lat <= n.lat, o = i.lng >= t.lng && r.lng <= n.lng;
				return a && o;
			},
			overlaps: function(e) {
				e = M(e);
				var t = this._southWest, n = this._northEast, r = e.getSouthWest(), i = e.getNorthEast(), a = i.lat > t.lat && r.lat < n.lat, o = i.lng > t.lng && r.lng < n.lng;
				return a && o;
			},
			toBBoxString: function() {
				return [
					this.getWest(),
					this.getSouth(),
					this.getEast(),
					this.getNorth()
				].join(",");
			},
			equals: function(e, t) {
				return e ? (e = M(e), this._southWest.equals(e.getSouthWest(), t) && this._northEast.equals(e.getNorthEast(), t)) : !1;
			},
			isValid: function() {
				return !!(this._southWest && this._northEast);
			}
		};
		function M(e, t) {
			return e instanceof j ? e : new j(e, t);
		}
		function N(e, t, n) {
			if (isNaN(e) || isNaN(t)) throw Error("Invalid LatLng object: (" + e + ", " + t + ")");
			this.lat = +e, this.lng = +t, n !== void 0 && (this.alt = +n);
		}
		N.prototype = {
			equals: function(e, t) {
				return e ? (e = P(e), Math.max(Math.abs(this.lat - e.lat), Math.abs(this.lng - e.lng)) <= (t === void 0 ? 1e-9 : t)) : !1;
			},
			toString: function(e) {
				return "LatLng(" + u(this.lat, e) + ", " + u(this.lng, e) + ")";
			},
			distanceTo: function(e) {
				return se.distance(this, P(e));
			},
			wrap: function() {
				return se.wrapLatLng(this);
			},
			toBounds: function(e) {
				var t = 180 * e / 40075017, n = t / Math.cos(Math.PI / 180 * this.lat);
				return M([this.lat - t, this.lng - n], [this.lat + t, this.lng + n]);
			},
			clone: function() {
				return new N(this.lat, this.lng, this.alt);
			}
		};
		function P(e, t, n) {
			return e instanceof N ? e : _(e) && typeof e[0] != "object" ? e.length === 3 ? new N(e[0], e[1], e[2]) : e.length === 2 ? new N(e[0], e[1]) : null : e == null ? e : typeof e == "object" && "lat" in e ? new N(e.lat, "lng" in e ? e.lng : e.lon, e.alt) : t === void 0 ? null : new N(e, t, n);
		}
		var oe = {
			latLngToPoint: function(e, t) {
				var n = this.projection.project(e), r = this.scale(t);
				return this.transformation._transform(n, r);
			},
			pointToLatLng: function(e, t) {
				var n = this.scale(t), r = this.transformation.untransform(e, n);
				return this.projection.unproject(r);
			},
			project: function(e) {
				return this.projection.project(e);
			},
			unproject: function(e) {
				return this.projection.unproject(e);
			},
			scale: function(e) {
				return 256 * 2 ** e;
			},
			zoom: function(e) {
				return Math.log(e / 256) / Math.LN2;
			},
			getProjectedBounds: function(e) {
				if (this.infinite) return null;
				var t = this.projection.bounds, n = this.scale(e);
				return new A(this.transformation.transform(t.min, n), this.transformation.transform(t.max, n));
			},
			infinite: !1,
			wrapLatLng: function(e) {
				var t = this.wrapLng ? c(e.lng, this.wrapLng, !0) : e.lng, n = this.wrapLat ? c(e.lat, this.wrapLat, !0) : e.lat, r = e.alt;
				return new N(n, t, r);
			},
			wrapLatLngBounds: function(e) {
				var t = e.getCenter(), n = this.wrapLatLng(t), r = t.lat - n.lat, i = t.lng - n.lng;
				if (r === 0 && i === 0) return e;
				var a = e.getSouthWest(), o = e.getNorthEast();
				return new j(new N(a.lat - r, a.lng - i), new N(o.lat - r, o.lng - i));
			}
		}, se = n({}, oe, {
			wrapLng: [-180, 180],
			R: 6371e3,
			distance: function(e, t) {
				var n = Math.PI / 180, r = e.lat * n, i = t.lat * n, a = Math.sin((t.lat - e.lat) * n / 2), o = Math.sin((t.lng - e.lng) * n / 2), s = a * a + Math.cos(r) * Math.cos(i) * o * o, c = 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
				return this.R * c;
			}
		}), ce = 6378137, le = {
			R: ce,
			MAX_LATITUDE: 85.0511287798,
			project: function(e) {
				var t = Math.PI / 180, n = this.MAX_LATITUDE, r = Math.max(Math.min(n, e.lat), -n), i = Math.sin(r * t);
				return new O(this.R * e.lng * t, this.R * Math.log((1 + i) / (1 - i)) / 2);
			},
			unproject: function(e) {
				var t = 180 / Math.PI;
				return new N((2 * Math.atan(Math.exp(e.y / this.R)) - Math.PI / 2) * t, e.x * t / this.R);
			},
			bounds: (function() {
				var e = ce * Math.PI;
				return new A([-e, -e], [e, e]);
			})()
		};
		function ue(e, t, n, r) {
			_(e) ? (this._a = e[0], this._b = e[1], this._c = e[2], this._d = e[3]) : (this._a = e, this._b = t, this._c = n, this._d = r);
		}
		ue.prototype = {
			transform: function(e, t) {
				return this._transform(e.clone(), t);
			},
			_transform: function(e, t) {
				return t ||= 1, e.x = t * (this._a * e.x + this._b), e.y = t * (this._c * e.y + this._d), e;
			},
			untransform: function(e, t) {
				return t ||= 1, new O((e.x / t - this._b) / this._a, (e.y / t - this._d) / this._c);
			}
		};
		function de(e, t, n, r) {
			return new ue(e, t, n, r);
		}
		var fe = n({}, se, {
			code: "EPSG:3857",
			projection: le,
			transformation: function() {
				var e = .5 / (Math.PI * le.R);
				return de(e, .5, -e, .5);
			}()
		}), pe = n({}, fe, { code: "EPSG:900913" });
		function me(e) {
			return document.createElementNS("http://www.w3.org/2000/svg", e);
		}
		function he(e, t) {
			for (var n = "", r = 0, i, a = e.length, o, s, c; r < a; r++) {
				for (s = e[r], i = 0, o = s.length; i < o; i++) c = s[i], n += (i ? "L" : "M") + c.x + " " + c.y;
				n += t ? G.svg ? "z" : "x" : "";
			}
			return n || "M0 0";
		}
		var ge = document.documentElement.style, F = "ActiveXObject" in window, I = F && !document.addEventListener, R = "msLaunchUri" in navigator && !("documentMode" in document), z = We("webkit"), _e = We("android"), B = We("android 2") || We("android 3"), ve = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), ye = _e && We("Google") && ve < 537 && !("AudioNode" in window), V = !!window.opera, H = !R && We("chrome"), be = We("gecko") && !z && !V && !F, xe = !H && We("safari"), Se = We("phantom"), Ce = "OTransition" in ge, we = navigator.platform.indexOf("Win") === 0, Te = F && "transition" in ge, Ee = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !B, De = "MozPerspective" in ge, Oe = !window.L_DISABLE_3D && (Te || Ee || De) && !Ce && !Se, ke = typeof orientation < "u" || We("mobile"), Ae = ke && z, je = ke && Ee, Me = !window.PointerEvent && window.MSPointerEvent, Ne = !!(window.PointerEvent || Me), Pe = "ontouchstart" in window || !!window.TouchEvent, Fe = !window.L_NO_TOUCH && (Pe || Ne), U = ke && V, W = ke && be, Ie = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, Le = function() {
			var e = !1;
			try {
				var t = Object.defineProperty({}, "passive", { get: function() {
					e = !0;
				} });
				window.addEventListener("testPassiveEventSupport", l, t), window.removeEventListener("testPassiveEventSupport", l, t);
			} catch {}
			return e;
		}(), Re = function() {
			return !!document.createElement("canvas").getContext;
		}(), ze = !!(document.createElementNS && me("svg").createSVGRect), Be = !!ze && (function() {
			var e = document.createElement("div");
			return e.innerHTML = "<svg/>", (e.firstChild && e.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
		})(), Ve = !ze && function() {
			try {
				var e = document.createElement("div");
				e.innerHTML = "<v:shape adj=\"1\"/>";
				var t = e.firstChild;
				return t.style.behavior = "url(#default#VML)", t && typeof t.adj == "object";
			} catch {
				return !1;
			}
		}(), He = navigator.platform.indexOf("Mac") === 0, Ue = navigator.platform.indexOf("Linux") === 0;
		function We(e) {
			return navigator.userAgent.toLowerCase().indexOf(e) >= 0;
		}
		var G = {
			ie: F,
			ielt9: I,
			edge: R,
			webkit: z,
			android: _e,
			android23: B,
			androidStock: ye,
			opera: V,
			chrome: H,
			gecko: be,
			safari: xe,
			phantom: Se,
			opera12: Ce,
			win: we,
			ie3d: Te,
			webkit3d: Ee,
			gecko3d: De,
			any3d: Oe,
			mobile: ke,
			mobileWebkit: Ae,
			mobileWebkit3d: je,
			msPointer: Me,
			pointer: Ne,
			touch: Fe,
			touchNative: Pe,
			mobileOpera: U,
			mobileGecko: W,
			retina: Ie,
			passiveEvents: Le,
			canvas: Re,
			svg: ze,
			vml: Ve,
			inlineSvg: Be,
			mac: He,
			linux: Ue
		}, Ge = G.msPointer ? "MSPointerDown" : "pointerdown", Ke = G.msPointer ? "MSPointerMove" : "pointermove", qe = G.msPointer ? "MSPointerUp" : "pointerup", Je = G.msPointer ? "MSPointerCancel" : "pointercancel", Ye = {
			touchstart: Ge,
			touchmove: Ke,
			touchend: qe,
			touchcancel: Je
		}, Xe = {
			touchstart: ot,
			touchmove: at,
			touchend: at,
			touchcancel: at
		}, Ze = {}, Qe = !1;
		function $e(e, t, n) {
			return t === "touchstart" && it(), Xe[t] ? (n = Xe[t].bind(this, n), e.addEventListener(Ye[t], n, !1), n) : (console.warn("wrong event specified:", t), l);
		}
		function et(e, t, n) {
			Ye[t] ? e.removeEventListener(Ye[t], n, !1) : console.warn("wrong event specified:", t);
		}
		function tt(e) {
			Ze[e.pointerId] = e;
		}
		function nt(e) {
			Ze[e.pointerId] && (Ze[e.pointerId] = e);
		}
		function rt(e) {
			delete Ze[e.pointerId];
		}
		function it() {
			Qe ||= (document.addEventListener(Ge, tt, !0), document.addEventListener(Ke, nt, !0), document.addEventListener(qe, rt, !0), document.addEventListener(Je, rt, !0), !0);
		}
		function at(e, t) {
			if (t.pointerType !== (t.MSPOINTER_TYPE_MOUSE || "mouse")) {
				for (var n in t.touches = [], Ze) t.touches.push(Ze[n]);
				t.changedTouches = [t], e(t);
			}
		}
		function ot(e, t) {
			t.MSPOINTER_TYPE_TOUCH && t.pointerType === t.MSPOINTER_TYPE_TOUCH && Yt(t), at(e, t);
		}
		function st(e) {
			var t = {}, n, r;
			for (r in e) n = e[r], t[r] = n && n.bind ? n.bind(e) : n;
			return e = t, t.type = "dblclick", t.detail = 2, t.isTrusted = !1, t._simulated = !0, t;
		}
		var ct = 200;
		function lt(e, t) {
			e.addEventListener("dblclick", t);
			var n = 0, r;
			function i(e) {
				if (e.detail !== 1) r = e.detail;
				else if (!(e.pointerType === "mouse" || e.sourceCapabilities && !e.sourceCapabilities.firesTouchEvents)) {
					var i = Zt(e);
					if (!i.some(function(e) {
						return e instanceof HTMLLabelElement && e.attributes.for;
					}) || i.some(function(e) {
						return e instanceof HTMLInputElement || e instanceof HTMLSelectElement;
					})) {
						var a = Date.now();
						a - n <= ct ? (r++, r === 2 && t(st(e))) : r = 1, n = a;
					}
				}
			}
			return e.addEventListener("click", i), {
				dblclick: t,
				simDblclick: i
			};
		}
		function ut(e, t) {
			e.removeEventListener("dblclick", t.dblclick), e.removeEventListener("click", t.simDblclick);
		}
		var dt = Tt([
			"transform",
			"webkitTransform",
			"OTransform",
			"MozTransform",
			"msTransform"
		]), ft = Tt([
			"webkitTransition",
			"transition",
			"OTransition",
			"MozTransition",
			"msTransition"
		]), pt = ft === "webkitTransition" || ft === "OTransition" ? ft + "End" : "transitionend";
		function mt(e) {
			return typeof e == "string" ? document.getElementById(e) : e;
		}
		function ht(e, t) {
			var n = e.style[t] || e.currentStyle && e.currentStyle[t];
			if ((!n || n === "auto") && document.defaultView) {
				var r = document.defaultView.getComputedStyle(e, null);
				n = r ? r[t] : null;
			}
			return n === "auto" ? null : n;
		}
		function K(e, t, n) {
			var r = document.createElement(e);
			return r.className = t || "", n && n.appendChild(r), r;
		}
		function q(e) {
			var t = e.parentNode;
			t && t.removeChild(e);
		}
		function gt(e) {
			for (; e.firstChild;) e.removeChild(e.firstChild);
		}
		function _t(e) {
			var t = e.parentNode;
			t && t.lastChild !== e && t.appendChild(e);
		}
		function vt(e) {
			var t = e.parentNode;
			t && t.firstChild !== e && t.insertBefore(e, t.firstChild);
		}
		function yt(e, t) {
			if (e.classList !== void 0) return e.classList.contains(t);
			var n = St(e);
			return n.length > 0 && RegExp("(^|\\s)" + t + "(\\s|$)").test(n);
		}
		function J(e, t) {
			if (e.classList !== void 0) for (var n = f(t), r = 0, i = n.length; r < i; r++) e.classList.add(n[r]);
			else if (!yt(e, t)) {
				var a = St(e);
				xt(e, (a ? a + " " : "") + t);
			}
		}
		function bt(e, t) {
			e.classList === void 0 ? xt(e, d((" " + St(e) + " ").replace(" " + t + " ", " "))) : e.classList.remove(t);
		}
		function xt(e, t) {
			e.className.baseVal === void 0 ? e.className = t : e.className.baseVal = t;
		}
		function St(e) {
			return e.correspondingElement && (e = e.correspondingElement), e.className.baseVal === void 0 ? e.className : e.className.baseVal;
		}
		function Ct(e, t) {
			"opacity" in e.style ? e.style.opacity = t : "filter" in e.style && wt(e, t);
		}
		function wt(e, t) {
			var n = !1, r = "DXImageTransform.Microsoft.Alpha";
			try {
				n = e.filters.item(r);
			} catch {
				if (t === 1) return;
			}
			t = Math.round(t * 100), n ? (n.Enabled = t !== 100, n.Opacity = t) : e.style.filter += " progid:" + r + "(opacity=" + t + ")";
		}
		function Tt(e) {
			for (var t = document.documentElement.style, n = 0; n < e.length; n++) if (e[n] in t) return e[n];
			return !1;
		}
		function Et(e, t, n) {
			var r = t || new O(0, 0);
			e.style[dt] = (G.ie3d ? "translate(" + r.x + "px," + r.y + "px)" : "translate3d(" + r.x + "px," + r.y + "px,0)") + (n ? " scale(" + n + ")" : "");
		}
		function Dt(e, t) {
			e._leaflet_pos = t, G.any3d ? Et(e, t) : (e.style.left = t.x + "px", e.style.top = t.y + "px");
		}
		function Ot(e) {
			return e._leaflet_pos || new O(0, 0);
		}
		var kt, At, jt;
		if ("onselectstart" in document) kt = function() {
			X(window, "selectstart", Yt);
		}, At = function() {
			Z(window, "selectstart", Yt);
		};
		else {
			var Mt = Tt([
				"userSelect",
				"WebkitUserSelect",
				"OUserSelect",
				"MozUserSelect",
				"msUserSelect"
			]);
			kt = function() {
				if (Mt) {
					var e = document.documentElement.style;
					jt = e[Mt], e[Mt] = "none";
				}
			}, At = function() {
				Mt && (document.documentElement.style[Mt] = jt, jt = void 0);
			};
		}
		function Nt() {
			X(window, "dragstart", Yt);
		}
		function Pt() {
			Z(window, "dragstart", Yt);
		}
		var Ft, It;
		function Lt(e) {
			for (; e.tabIndex === -1;) e = e.parentNode;
			e.style && (Rt(), Ft = e, It = e.style.outlineStyle, e.style.outlineStyle = "none", X(window, "keydown", Rt));
		}
		function Rt() {
			Ft && (Ft.style.outlineStyle = It, Ft = void 0, It = void 0, Z(window, "keydown", Rt));
		}
		function zt(e) {
			do
				e = e.parentNode;
			while ((!e.offsetWidth || !e.offsetHeight) && e !== document.body);
			return e;
		}
		function Bt(e) {
			var t = e.getBoundingClientRect();
			return {
				x: t.width / e.offsetWidth || 1,
				y: t.height / e.offsetHeight || 1,
				boundingClientRect: t
			};
		}
		var Y = {
			__proto__: null,
			TRANSFORM: dt,
			TRANSITION: ft,
			TRANSITION_END: pt,
			get: mt,
			getStyle: ht,
			create: K,
			remove: q,
			empty: gt,
			toFront: _t,
			toBack: vt,
			hasClass: yt,
			addClass: J,
			removeClass: bt,
			setClass: xt,
			getClass: St,
			setOpacity: Ct,
			testProp: Tt,
			setTransform: Et,
			setPosition: Dt,
			getPosition: Ot,
			get disableTextSelection() {
				return kt;
			},
			get enableTextSelection() {
				return At;
			},
			disableImageDrag: Nt,
			enableImageDrag: Pt,
			preventOutline: Lt,
			restoreOutline: Rt,
			getSizedParentNode: zt,
			getScale: Bt
		};
		function X(e, t, n, r) {
			if (t && typeof t == "object") for (var i in t) Wt(e, i, t[i], n);
			else {
				t = f(t);
				for (var a = 0, o = t.length; a < o; a++) Wt(e, t[a], n, r);
			}
			return this;
		}
		var Vt = "_leaflet_events";
		function Z(e, t, n, r) {
			if (arguments.length === 1) Ht(e), delete e[Vt];
			else if (t && typeof t == "object") for (var i in t) Gt(e, i, t[i], n);
			else if (t = f(t), arguments.length === 2) Ht(e, function(e) {
				return v(t, e) !== -1;
			});
			else for (var a = 0, o = t.length; a < o; a++) Gt(e, t[a], n, r);
			return this;
		}
		function Ht(e, t) {
			for (var n in e[Vt]) {
				var r = n.split(/\d/)[0];
				(!t || t(r)) && Gt(e, r, null, null, n);
			}
		}
		var Ut = {
			mouseenter: "mouseover",
			mouseleave: "mouseout",
			wheel: !("onwheel" in window) && "mousewheel"
		};
		function Wt(e, t, n, r) {
			var i = t + o(n) + (r ? "_" + o(r) : "");
			if (e[Vt] && e[Vt][i]) return this;
			var a = function(t) {
				return n.call(r || e, t || window.event);
			}, s = a;
			!G.touchNative && G.pointer && t.indexOf("touch") === 0 ? a = $e(e, t, a) : G.touch && t === "dblclick" ? a = lt(e, a) : "addEventListener" in e ? t === "touchstart" || t === "touchmove" || t === "wheel" || t === "mousewheel" ? e.addEventListener(Ut[t] || t, a, G.passiveEvents ? { passive: !1 } : !1) : t === "mouseenter" || t === "mouseleave" ? (a = function(t) {
				t ||= window.event, tn(e, t) && s(t);
			}, e.addEventListener(Ut[t], a, !1)) : e.addEventListener(t, s, !1) : e.attachEvent("on" + t, a), e[Vt] = e[Vt] || {}, e[Vt][i] = a;
		}
		function Gt(e, t, n, r, i) {
			i ||= t + o(n) + (r ? "_" + o(r) : "");
			var a = e[Vt] && e[Vt][i];
			if (!a) return this;
			!G.touchNative && G.pointer && t.indexOf("touch") === 0 ? et(e, t, a) : G.touch && t === "dblclick" ? ut(e, a) : "removeEventListener" in e ? e.removeEventListener(Ut[t] || t, a, !1) : e.detachEvent("on" + t, a), e[Vt][i] = null;
		}
		function Kt(e) {
			return e.stopPropagation ? e.stopPropagation() : e.originalEvent ? e.originalEvent._stopped = !0 : e.cancelBubble = !0, this;
		}
		function qt(e) {
			return Wt(e, "wheel", Kt), this;
		}
		function Jt(e) {
			return X(e, "mousedown touchstart dblclick contextmenu", Kt), e._leaflet_disable_click = !0, this;
		}
		function Yt(e) {
			return e.preventDefault ? e.preventDefault() : e.returnValue = !1, this;
		}
		function Xt(e) {
			return Yt(e), Kt(e), this;
		}
		function Zt(e) {
			if (e.composedPath) return e.composedPath();
			for (var t = [], n = e.target; n;) t.push(n), n = n.parentNode;
			return t;
		}
		function Qt(e, t) {
			if (!t) return new O(e.clientX, e.clientY);
			var n = Bt(t), r = n.boundingClientRect;
			return new O((e.clientX - r.left) / n.x - t.clientLeft, (e.clientY - r.top) / n.y - t.clientTop);
		}
		var $t = G.linux && G.chrome ? window.devicePixelRatio : G.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
		function en(e) {
			return G.edge ? e.wheelDeltaY / 2 : e.deltaY && e.deltaMode === 0 ? -e.deltaY / $t : e.deltaY && e.deltaMode === 1 ? -e.deltaY * 20 : e.deltaY && e.deltaMode === 2 ? -e.deltaY * 60 : e.deltaX || e.deltaZ ? 0 : e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 : e.detail && Math.abs(e.detail) < 32765 ? -e.detail * 20 : e.detail ? e.detail / -32765 * 60 : 0;
		}
		function tn(e, t) {
			var n = t.relatedTarget;
			if (!n) return !0;
			try {
				for (; n && n !== e;) n = n.parentNode;
			} catch {
				return !1;
			}
			return n !== e;
		}
		var nn = {
			__proto__: null,
			on: X,
			off: Z,
			stopPropagation: Kt,
			disableScrollPropagation: qt,
			disableClickPropagation: Jt,
			preventDefault: Yt,
			stop: Xt,
			getPropagationPath: Zt,
			getMousePosition: Qt,
			getWheelDelta: en,
			isExternalTarget: tn,
			addListener: X,
			removeListener: Z
		}, rn = re.extend({
			run: function(e, t, n, r) {
				this.stop(), this._el = e, this._inProgress = !0, this._duration = n || .25, this._easeOutPower = 1 / Math.max(r || .5, .2), this._startPos = Ot(e), this._offset = t.subtract(this._startPos), this._startTime = +/* @__PURE__ */ new Date(), this.fire("start"), this._animate();
			},
			stop: function() {
				this._inProgress && (this._step(!0), this._complete());
			},
			_animate: function() {
				this._animId = T(this._animate, this), this._step();
			},
			_step: function(e) {
				var t = +/* @__PURE__ */ new Date() - this._startTime, n = this._duration * 1e3;
				t < n ? this._runFrame(this._easeOut(t / n), e) : (this._runFrame(1), this._complete());
			},
			_runFrame: function(e, t) {
				var n = this._startPos.add(this._offset.multiplyBy(e));
				t && n._round(), Dt(this._el, n), this.fire("step");
			},
			_complete: function() {
				E(this._animId), this._inProgress = !1, this.fire("end");
			},
			_easeOut: function(e) {
				return 1 - (1 - e) ** this._easeOutPower;
			}
		}), Q = re.extend({
			options: {
				crs: fe,
				center: void 0,
				zoom: void 0,
				minZoom: void 0,
				maxZoom: void 0,
				layers: [],
				maxBounds: void 0,
				renderer: void 0,
				zoomAnimation: !0,
				zoomAnimationThreshold: 4,
				fadeAnimation: !0,
				markerZoomAnimation: !0,
				transform3DLimit: 8388608,
				zoomSnap: 1,
				zoomDelta: 1,
				trackResize: !0
			},
			initialize: function(e, t) {
				t = p(this, t), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(e), this._initLayout(), this._onResize = i(this._onResize, this), this._initEvents(), t.maxBounds && this.setMaxBounds(t.maxBounds), t.zoom !== void 0 && (this._zoom = this._limitZoom(t.zoom)), t.center && t.zoom !== void 0 && this.setView(P(t.center), t.zoom, { reset: !0 }), this.callInitHooks(), this._zoomAnimated = ft && G.any3d && !G.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), X(this._proxy, pt, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
			},
			setView: function(e, t, r) {
				return t = t === void 0 ? this._zoom : this._limitZoom(t), e = this._limitCenter(P(e), t, this.options.maxBounds), r ||= {}, this._stop(), this._loaded && !r.reset && r !== !0 && (r.animate !== void 0 && (r.zoom = n({ animate: r.animate }, r.zoom), r.pan = n({
					animate: r.animate,
					duration: r.duration
				}, r.pan)), this._zoom === t ? this._tryAnimatedPan(e, r.pan) : this._tryAnimatedZoom && this._tryAnimatedZoom(e, t, r.zoom)) ? (clearTimeout(this._sizeTimer), this) : (this._resetView(e, t, r.pan && r.pan.noMoveStart), this);
			},
			setZoom: function(e, t) {
				return this._loaded ? this.setView(this.getCenter(), e, { zoom: t }) : (this._zoom = e, this);
			},
			zoomIn: function(e, t) {
				return e ||= G.any3d ? this.options.zoomDelta : 1, this.setZoom(this._zoom + e, t);
			},
			zoomOut: function(e, t) {
				return e ||= G.any3d ? this.options.zoomDelta : 1, this.setZoom(this._zoom - e, t);
			},
			setZoomAround: function(e, t, n) {
				var r = this.getZoomScale(t), i = this.getSize().divideBy(2), a = (e instanceof O ? e : this.latLngToContainerPoint(e)).subtract(i).multiplyBy(1 - 1 / r), o = this.containerPointToLatLng(i.add(a));
				return this.setView(o, t, { zoom: n });
			},
			_getBoundsCenterZoom: function(e, t) {
				t ||= {}, e = e.getBounds ? e.getBounds() : M(e);
				var n = k(t.paddingTopLeft || t.padding || [0, 0]), r = k(t.paddingBottomRight || t.padding || [0, 0]), i = this.getBoundsZoom(e, !1, n.add(r));
				if (i = typeof t.maxZoom == "number" ? Math.min(t.maxZoom, i) : i, i === Infinity) return {
					center: e.getCenter(),
					zoom: i
				};
				var a = r.subtract(n).divideBy(2), o = this.project(e.getSouthWest(), i), s = this.project(e.getNorthEast(), i);
				return {
					center: this.unproject(o.add(s).divideBy(2).add(a), i),
					zoom: i
				};
			},
			fitBounds: function(e, t) {
				if (e = M(e), !e.isValid()) throw Error("Bounds are not valid.");
				var n = this._getBoundsCenterZoom(e, t);
				return this.setView(n.center, n.zoom, t);
			},
			fitWorld: function(e) {
				return this.fitBounds([[-90, -180], [90, 180]], e);
			},
			panTo: function(e, t) {
				return this.setView(e, this._zoom, { pan: t });
			},
			panBy: function(e, t) {
				if (e = k(e).round(), t ||= {}, !e.x && !e.y) return this.fire("moveend");
				if (t.animate !== !0 && !this.getSize().contains(e)) return this._resetView(this.unproject(this.project(this.getCenter()).add(e)), this.getZoom()), this;
				if (this._panAnim || (this._panAnim = new rn(), this._panAnim.on({
					step: this._onPanTransitionStep,
					end: this._onPanTransitionEnd
				}, this)), t.noMoveStart || this.fire("movestart"), t.animate !== !1) {
					J(this._mapPane, "leaflet-pan-anim");
					var n = this._getMapPanePos().subtract(e).round();
					this._panAnim.run(this._mapPane, n, t.duration || .25, t.easeLinearity);
				} else this._rawPanBy(e), this.fire("move").fire("moveend");
				return this;
			},
			flyTo: function(e, t, n) {
				if (n ||= {}, n.animate === !1 || !G.any3d) return this.setView(e, t, n);
				this._stop();
				var r = this.project(this.getCenter()), i = this.project(e), a = this.getSize(), o = this._zoom;
				e = P(e), t = t === void 0 ? o : t;
				var s = Math.max(a.x, a.y), c = s * this.getZoomScale(o, t), l = i.distanceTo(r) || 1, u = 1.42, d = u * u;
				function f(e) {
					var t = e ? -1 : 1, n = e ? c : s, r = (c * c - s * s + t * d * d * l * l) / (2 * n * d * l), i = Math.sqrt(r * r + 1) - r;
					return i < 1e-9 ? -18 : Math.log(i);
				}
				function p(e) {
					return (Math.exp(e) - Math.exp(-e)) / 2;
				}
				function m(e) {
					return (Math.exp(e) + Math.exp(-e)) / 2;
				}
				function h(e) {
					return p(e) / m(e);
				}
				var g = f(0);
				function _(e) {
					return s * (m(g) / m(g + u * e));
				}
				function v(e) {
					return s * (m(g) * h(g + u * e) - p(g)) / d;
				}
				function y(e) {
					return 1 - (1 - e) ** 1.5;
				}
				var b = Date.now(), x = (f(1) - g) / u, S = n.duration ? 1e3 * n.duration : 1e3 * x * .8;
				function C() {
					var n = (Date.now() - b) / S, a = y(n) * x;
					n <= 1 ? (this._flyToFrame = T(C, this), this._move(this.unproject(r.add(i.subtract(r).multiplyBy(v(a) / l)), o), this.getScaleZoom(s / _(a), o), { flyTo: !0 })) : this._move(e, t)._moveEnd(!0);
				}
				return this._moveStart(!0, n.noMoveStart), C.call(this), this;
			},
			flyToBounds: function(e, t) {
				var n = this._getBoundsCenterZoom(e, t);
				return this.flyTo(n.center, n.zoom, t);
			},
			setMaxBounds: function(e) {
				return e = M(e), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), e.isValid() ? (this.options.maxBounds = e, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this);
			},
			setMinZoom: function(e) {
				var t = this.options.minZoom;
				return this.options.minZoom = e, this._loaded && t !== e && (this.fire("zoomlevelschange"), this.getZoom() < this.options.minZoom) ? this.setZoom(e) : this;
			},
			setMaxZoom: function(e) {
				var t = this.options.maxZoom;
				return this.options.maxZoom = e, this._loaded && t !== e && (this.fire("zoomlevelschange"), this.getZoom() > this.options.maxZoom) ? this.setZoom(e) : this;
			},
			panInsideBounds: function(e, t) {
				this._enforcingBounds = !0;
				var n = this.getCenter(), r = this._limitCenter(n, this._zoom, M(e));
				return n.equals(r) || this.panTo(r, t), this._enforcingBounds = !1, this;
			},
			panInside: function(e, t) {
				t ||= {};
				var n = k(t.paddingTopLeft || t.padding || [0, 0]), r = k(t.paddingBottomRight || t.padding || [0, 0]), i = this.project(this.getCenter()), a = this.project(e), o = this.getPixelBounds(), s = ae([o.min.add(n), o.max.subtract(r)]), c = s.getSize();
				if (!s.contains(a)) {
					this._enforcingBounds = !0;
					var l = a.subtract(s.getCenter()), u = s.extend(a).getSize().subtract(c);
					i.x += l.x < 0 ? -u.x : u.x, i.y += l.y < 0 ? -u.y : u.y, this.panTo(this.unproject(i), t), this._enforcingBounds = !1;
				}
				return this;
			},
			invalidateSize: function(e) {
				if (!this._loaded) return this;
				e = n({
					animate: !1,
					pan: !0
				}, e === !0 ? { animate: !0 } : e);
				var t = this.getSize();
				this._sizeChanged = !0, this._lastCenter = null;
				var r = this.getSize(), a = t.divideBy(2).round(), o = r.divideBy(2).round(), s = a.subtract(o);
				return !s.x && !s.y ? this : (e.animate && e.pan ? this.panBy(s) : (e.pan && this._rawPanBy(s), this.fire("move"), e.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(i(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
					oldSize: t,
					newSize: r
				}));
			},
			stop: function() {
				return this.setZoom(this._limitZoom(this._zoom)), this.options.zoomSnap || this.fire("viewreset"), this._stop();
			},
			locate: function(e) {
				if (e = this._locateOptions = n({
					timeout: 1e4,
					watch: !1
				}, e), !("geolocation" in navigator)) return this._handleGeolocationError({
					code: 0,
					message: "Geolocation not supported."
				}), this;
				var t = i(this._handleGeolocationResponse, this), r = i(this._handleGeolocationError, this);
				return e.watch ? this._locationWatchId = navigator.geolocation.watchPosition(t, r, e) : navigator.geolocation.getCurrentPosition(t, r, e), this;
			},
			stopLocate: function() {
				return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this;
			},
			_handleGeolocationError: function(e) {
				if (this._container._leaflet_id) {
					var t = e.code, n = e.message || (t === 1 ? "permission denied" : t === 2 ? "position unavailable" : "timeout");
					this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
						code: t,
						message: "Geolocation error: " + n + "."
					});
				}
			},
			_handleGeolocationResponse: function(e) {
				if (this._container._leaflet_id) {
					var t = e.coords.latitude, n = e.coords.longitude, r = new N(t, n), i = r.toBounds(e.coords.accuracy * 2), a = this._locateOptions;
					if (a.setView) {
						var o = this.getBoundsZoom(i);
						this.setView(r, a.maxZoom ? Math.min(o, a.maxZoom) : o);
					}
					var s = {
						latlng: r,
						bounds: i,
						timestamp: e.timestamp
					};
					for (var c in e.coords) typeof e.coords[c] == "number" && (s[c] = e.coords[c]);
					this.fire("locationfound", s);
				}
			},
			addHandler: function(e, t) {
				if (!t) return this;
				var n = this[e] = new t(this);
				return this._handlers.push(n), this.options[e] && n.enable(), this;
			},
			remove: function() {
				if (this._initEvents(!0), this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds), this._containerId !== this._container._leaflet_id) throw Error("Map container is being reused by another instance");
				try {
					delete this._container._leaflet_id, delete this._containerId;
				} catch {
					this._container._leaflet_id = void 0, this._containerId = void 0;
				}
				for (var e in this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), q(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest &&= (E(this._resizeRequest), null), this._clearHandlers(), this._loaded && this.fire("unload"), this._layers) this._layers[e].remove();
				for (e in this._panes) q(this._panes[e]);
				return this._layers = [], this._panes = [], delete this._mapPane, delete this._renderer, this;
			},
			createPane: function(e, t) {
				var n = K("div", "leaflet-pane" + (e ? " leaflet-" + e.replace("Pane", "") + "-pane" : ""), t || this._mapPane);
				return e && (this._panes[e] = n), n;
			},
			getCenter: function() {
				return this._checkIfLoaded(), this._lastCenter && !this._moved() ? this._lastCenter.clone() : this.layerPointToLatLng(this._getCenterLayerPoint());
			},
			getZoom: function() {
				return this._zoom;
			},
			getBounds: function() {
				var e = this.getPixelBounds();
				return new j(this.unproject(e.getBottomLeft()), this.unproject(e.getTopRight()));
			},
			getMinZoom: function() {
				return this.options.minZoom === void 0 ? this._layersMinZoom || 0 : this.options.minZoom;
			},
			getMaxZoom: function() {
				return this.options.maxZoom === void 0 ? this._layersMaxZoom === void 0 ? Infinity : this._layersMaxZoom : this.options.maxZoom;
			},
			getBoundsZoom: function(e, t, n) {
				e = M(e), n = k(n || [0, 0]);
				var r = this.getZoom() || 0, i = this.getMinZoom(), a = this.getMaxZoom(), o = e.getNorthWest(), s = e.getSouthEast(), c = this.getSize().subtract(n), l = ae(this.project(s, r), this.project(o, r)).getSize(), u = G.any3d ? this.options.zoomSnap : 1, d = c.x / l.x, f = c.y / l.y, p = t ? Math.max(d, f) : Math.min(d, f);
				return r = this.getScaleZoom(p, r), u && (r = Math.round(r / (u / 100)) * (u / 100), r = t ? Math.ceil(r / u) * u : Math.floor(r / u) * u), Math.max(i, Math.min(a, r));
			},
			getSize: function() {
				return (!this._size || this._sizeChanged) && (this._size = new O(this._container.clientWidth || 0, this._container.clientHeight || 0), this._sizeChanged = !1), this._size.clone();
			},
			getPixelBounds: function(e, t) {
				var n = this._getTopLeftPoint(e, t);
				return new A(n, n.add(this.getSize()));
			},
			getPixelOrigin: function() {
				return this._checkIfLoaded(), this._pixelOrigin;
			},
			getPixelWorldBounds: function(e) {
				return this.options.crs.getProjectedBounds(e === void 0 ? this.getZoom() : e);
			},
			getPane: function(e) {
				return typeof e == "string" ? this._panes[e] : e;
			},
			getPanes: function() {
				return this._panes;
			},
			getContainer: function() {
				return this._container;
			},
			getZoomScale: function(e, t) {
				var n = this.options.crs;
				return t = t === void 0 ? this._zoom : t, n.scale(e) / n.scale(t);
			},
			getScaleZoom: function(e, t) {
				var n = this.options.crs;
				t = t === void 0 ? this._zoom : t;
				var r = n.zoom(e * n.scale(t));
				return isNaN(r) ? Infinity : r;
			},
			project: function(e, t) {
				return t = t === void 0 ? this._zoom : t, this.options.crs.latLngToPoint(P(e), t);
			},
			unproject: function(e, t) {
				return t = t === void 0 ? this._zoom : t, this.options.crs.pointToLatLng(k(e), t);
			},
			layerPointToLatLng: function(e) {
				var t = k(e).add(this.getPixelOrigin());
				return this.unproject(t);
			},
			latLngToLayerPoint: function(e) {
				return this.project(P(e))._round()._subtract(this.getPixelOrigin());
			},
			wrapLatLng: function(e) {
				return this.options.crs.wrapLatLng(P(e));
			},
			wrapLatLngBounds: function(e) {
				return this.options.crs.wrapLatLngBounds(M(e));
			},
			distance: function(e, t) {
				return this.options.crs.distance(P(e), P(t));
			},
			containerPointToLayerPoint: function(e) {
				return k(e).subtract(this._getMapPanePos());
			},
			layerPointToContainerPoint: function(e) {
				return k(e).add(this._getMapPanePos());
			},
			containerPointToLatLng: function(e) {
				var t = this.containerPointToLayerPoint(k(e));
				return this.layerPointToLatLng(t);
			},
			latLngToContainerPoint: function(e) {
				return this.layerPointToContainerPoint(this.latLngToLayerPoint(P(e)));
			},
			mouseEventToContainerPoint: function(e) {
				return Qt(e, this._container);
			},
			mouseEventToLayerPoint: function(e) {
				return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
			},
			mouseEventToLatLng: function(e) {
				return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
			},
			_initContainer: function(e) {
				var t = this._container = mt(e);
				if (!t) throw Error("Map container not found.");
				if (t._leaflet_id) throw Error("Map container is already initialized.");
				X(t, "scroll", this._onScroll, this), this._containerId = o(t);
			},
			_initLayout: function() {
				var e = this._container;
				this._fadeAnimated = this.options.fadeAnimation && G.any3d, J(e, "leaflet-container" + (G.touch ? " leaflet-touch" : "") + (G.retina ? " leaflet-retina" : "") + (G.ielt9 ? " leaflet-oldie" : "") + (G.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
				var t = ht(e, "position");
				t !== "absolute" && t !== "relative" && t !== "fixed" && t !== "sticky" && (e.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
			},
			_initPanes: function() {
				var e = this._panes = {};
				this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), Dt(this._mapPane, new O(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (J(e.markerPane, "leaflet-zoom-hide"), J(e.shadowPane, "leaflet-zoom-hide"));
			},
			_resetView: function(e, t, n) {
				Dt(this._mapPane, new O(0, 0));
				var r = !this._loaded;
				this._loaded = !0, t = this._limitZoom(t), this.fire("viewprereset");
				var i = this._zoom !== t;
				this._moveStart(i, n)._move(e, t)._moveEnd(i), this.fire("viewreset"), r && this.fire("load");
			},
			_moveStart: function(e, t) {
				return e && this.fire("zoomstart"), t || this.fire("movestart"), this;
			},
			_move: function(e, t, n, r) {
				t === void 0 && (t = this._zoom);
				var i = this._zoom !== t;
				return this._zoom = t, this._lastCenter = e, this._pixelOrigin = this._getNewPixelOrigin(e), r ? n && n.pinch && this.fire("zoom", n) : ((i || n && n.pinch) && this.fire("zoom", n), this.fire("move", n)), this;
			},
			_moveEnd: function(e) {
				return e && this.fire("zoomend"), this.fire("moveend");
			},
			_stop: function() {
				return E(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
			},
			_rawPanBy: function(e) {
				Dt(this._mapPane, this._getMapPanePos().subtract(e));
			},
			_getZoomSpan: function() {
				return this.getMaxZoom() - this.getMinZoom();
			},
			_panInsideMaxBounds: function() {
				this._enforcingBounds || this.panInsideBounds(this.options.maxBounds);
			},
			_checkIfLoaded: function() {
				if (!this._loaded) throw Error("Set map center and zoom first.");
			},
			_initEvents: function(e) {
				this._targets = {}, this._targets[o(this._container)] = this;
				var t = e ? Z : X;
				t(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && t(window, "resize", this._onResize, this), G.any3d && this.options.transform3DLimit && (e ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
			},
			_onResize: function() {
				E(this._resizeRequest), this._resizeRequest = T(function() {
					this.invalidateSize({ debounceMoveend: !0 });
				}, this);
			},
			_onScroll: function() {
				this._container.scrollTop = 0, this._container.scrollLeft = 0;
			},
			_onMoveEnd: function() {
				var e = this._getMapPanePos();
				Math.max(Math.abs(e.x), Math.abs(e.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom());
			},
			_findEventTargets: function(e, t) {
				for (var n = [], r, i = t === "mouseout" || t === "mouseover", a = e.target || e.srcElement, s = !1; a;) {
					if (r = this._targets[o(a)], r && (t === "click" || t === "preclick") && this._draggableMoved(r)) {
						s = !0;
						break;
					}
					if (r && r.listens(t, !0) && (i && !tn(a, e) || (n.push(r), i)) || a === this._container) break;
					a = a.parentNode;
				}
				return !n.length && !s && !i && this.listens(t, !0) && (n = [this]), n;
			},
			_isClickDisabled: function(e) {
				for (; e && e !== this._container;) {
					if (e._leaflet_disable_click) return !0;
					e = e.parentNode;
				}
			},
			_handleDOMEvent: function(e) {
				var t = e.target || e.srcElement;
				if (!(!this._loaded || t._leaflet_disable_events || e.type === "click" && this._isClickDisabled(t))) {
					var n = e.type;
					n === "mousedown" && Lt(t), this._fireDOMEvent(e, n);
				}
			},
			_mouseEvents: [
				"click",
				"dblclick",
				"mouseover",
				"mouseout",
				"contextmenu"
			],
			_fireDOMEvent: function(e, t, r) {
				if (e.type === "click") {
					var i = n({}, e);
					i.type = "preclick", this._fireDOMEvent(i, i.type, r);
				}
				var a = this._findEventTargets(e, t);
				if (r) {
					for (var o = [], s = 0; s < r.length; s++) r[s].listens(t, !0) && o.push(r[s]);
					a = o.concat(a);
				}
				if (a.length) {
					t === "contextmenu" && Yt(e);
					var c = a[0], l = { originalEvent: e };
					if (e.type !== "keypress" && e.type !== "keydown" && e.type !== "keyup") {
						var u = c.getLatLng && (!c._radius || c._radius <= 10);
						l.containerPoint = u ? this.latLngToContainerPoint(c.getLatLng()) : this.mouseEventToContainerPoint(e), l.layerPoint = this.containerPointToLayerPoint(l.containerPoint), l.latlng = u ? c.getLatLng() : this.layerPointToLatLng(l.layerPoint);
					}
					for (s = 0; s < a.length; s++) if (a[s].fire(t, l, !0), l.originalEvent._stopped || a[s].options.bubblingMouseEvents === !1 && v(this._mouseEvents, t) !== -1) return;
				}
			},
			_draggableMoved: function(e) {
				return e = e.dragging && e.dragging.enabled() ? e : this, e.dragging && e.dragging.moved() || this.boxZoom && this.boxZoom.moved();
			},
			_clearHandlers: function() {
				for (var e = 0, t = this._handlers.length; e < t; e++) this._handlers[e].disable();
			},
			whenReady: function(e, t) {
				return this._loaded ? e.call(t || this, { target: this }) : this.on("load", e, t), this;
			},
			_getMapPanePos: function() {
				return Ot(this._mapPane) || new O(0, 0);
			},
			_moved: function() {
				var e = this._getMapPanePos();
				return e && !e.equals([0, 0]);
			},
			_getTopLeftPoint: function(e, t) {
				return (e && t !== void 0 ? this._getNewPixelOrigin(e, t) : this.getPixelOrigin()).subtract(this._getMapPanePos());
			},
			_getNewPixelOrigin: function(e, t) {
				var n = this.getSize()._divideBy(2);
				return this.project(e, t)._subtract(n)._add(this._getMapPanePos())._round();
			},
			_latLngToNewLayerPoint: function(e, t, n) {
				var r = this._getNewPixelOrigin(n, t);
				return this.project(e, t)._subtract(r);
			},
			_latLngBoundsToNewLayerBounds: function(e, t, n) {
				var r = this._getNewPixelOrigin(n, t);
				return ae([
					this.project(e.getSouthWest(), t)._subtract(r),
					this.project(e.getNorthWest(), t)._subtract(r),
					this.project(e.getSouthEast(), t)._subtract(r),
					this.project(e.getNorthEast(), t)._subtract(r)
				]);
			},
			_getCenterLayerPoint: function() {
				return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
			},
			_getCenterOffset: function(e) {
				return this.latLngToLayerPoint(e).subtract(this._getCenterLayerPoint());
			},
			_limitCenter: function(e, t, n) {
				if (!n) return e;
				var r = this.project(e, t), i = this.getSize().divideBy(2), a = new A(r.subtract(i), r.add(i)), o = this._getBoundsOffset(a, n, t);
				return Math.abs(o.x) <= 1 && Math.abs(o.y) <= 1 ? e : this.unproject(r.add(o), t);
			},
			_limitOffset: function(e, t) {
				if (!t) return e;
				var n = this.getPixelBounds(), r = new A(n.min.add(e), n.max.add(e));
				return e.add(this._getBoundsOffset(r, t));
			},
			_getBoundsOffset: function(e, t, n) {
				var r = ae(this.project(t.getNorthEast(), n), this.project(t.getSouthWest(), n)), i = r.min.subtract(e.min), a = r.max.subtract(e.max);
				return new O(this._rebound(i.x, -a.x), this._rebound(i.y, -a.y));
			},
			_rebound: function(e, t) {
				return e + t > 0 ? Math.round(e - t) / 2 : Math.max(0, Math.ceil(e)) - Math.max(0, Math.floor(t));
			},
			_limitZoom: function(e) {
				var t = this.getMinZoom(), n = this.getMaxZoom(), r = G.any3d ? this.options.zoomSnap : 1;
				return r && (e = Math.round(e / r) * r), Math.max(t, Math.min(n, e));
			},
			_onPanTransitionStep: function() {
				this.fire("move");
			},
			_onPanTransitionEnd: function() {
				bt(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
			},
			_tryAnimatedPan: function(e, t) {
				var n = this._getCenterOffset(e)._trunc();
				return (t && t.animate) !== !0 && !this.getSize().contains(n) ? !1 : (this.panBy(n, t), !0);
			},
			_createAnimProxy: function() {
				var e = this._proxy = K("div", "leaflet-proxy leaflet-zoom-animated");
				this._panes.mapPane.appendChild(e), this.on("zoomanim", function(e) {
					var t = dt, n = this._proxy.style[t];
					Et(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1)), n === this._proxy.style[t] && this._animatingZoom && this._onZoomTransitionEnd();
				}, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
			},
			_destroyAnimProxy: function() {
				q(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
			},
			_animMoveEnd: function() {
				var e = this.getCenter(), t = this.getZoom();
				Et(this._proxy, this.project(e, t), this.getZoomScale(t, 1));
			},
			_catchTransitionEnd: function(e) {
				this._animatingZoom && e.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd();
			},
			_nothingToAnimate: function() {
				return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
			},
			_tryAnimatedZoom: function(e, t, n) {
				if (this._animatingZoom) return !0;
				if (n ||= {}, !this._zoomAnimated || n.animate === !1 || this._nothingToAnimate() || Math.abs(t - this._zoom) > this.options.zoomAnimationThreshold) return !1;
				var r = this.getZoomScale(t), i = this._getCenterOffset(e)._divideBy(1 - 1 / r);
				return n.animate !== !0 && !this.getSize().contains(i) ? !1 : (T(function() {
					this._moveStart(!0, n.noMoveStart || !1)._animateZoom(e, t, !0);
				}, this), !0);
			},
			_animateZoom: function(e, t, n, r) {
				this._mapPane && (n && (this._animatingZoom = !0, this._animateToCenter = e, this._animateToZoom = t, J(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
					center: e,
					zoom: t,
					noUpdate: r
				}), this._tempFireZoomEvent ||= this._zoom !== this._animateToZoom, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(i(this._onZoomTransitionEnd, this), 250));
			},
			_onZoomTransitionEnd: function() {
				this._animatingZoom && (this._mapPane && bt(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
			}
		});
		function an(e, t) {
			return new Q(e, t);
		}
		var on = te.extend({
			options: { position: "topright" },
			initialize: function(e) {
				p(this, e);
			},
			getPosition: function() {
				return this.options.position;
			},
			setPosition: function(e) {
				var t = this._map;
				return t && t.removeControl(this), this.options.position = e, t && t.addControl(this), this;
			},
			getContainer: function() {
				return this._container;
			},
			addTo: function(e) {
				this.remove(), this._map = e;
				var t = this._container = this.onAdd(e), n = this.getPosition(), r = e._controlCorners[n];
				return J(t, "leaflet-control"), n.indexOf("bottom") === -1 ? r.appendChild(t) : r.insertBefore(t, r.firstChild), this._map.on("unload", this.remove, this), this;
			},
			remove: function() {
				return this._map &&= (q(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), null), this;
			},
			_refocusOnMap: function(e) {
				this._map && e && e.screenX > 0 && e.screenY > 0 && this._map.getContainer().focus();
			}
		}), sn = function(e) {
			return new on(e);
		};
		Q.include({
			addControl: function(e) {
				return e.addTo(this), this;
			},
			removeControl: function(e) {
				return e.remove(), this;
			},
			_initControlPos: function() {
				var e = this._controlCorners = {}, t = "leaflet-", n = this._controlContainer = K("div", t + "control-container", this._container);
				function r(r, i) {
					var a = t + r + " " + t + i;
					e[r + i] = K("div", a, n);
				}
				r("top", "left"), r("top", "right"), r("bottom", "left"), r("bottom", "right");
			},
			_clearControlPos: function() {
				for (var e in this._controlCorners) q(this._controlCorners[e]);
				q(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
			}
		});
		var cn = on.extend({
			options: {
				collapsed: !0,
				position: "topright",
				autoZIndex: !0,
				hideSingleBase: !1,
				sortLayers: !1,
				sortFunction: function(e, t, n, r) {
					return n < r ? -1 : +(r < n);
				}
			},
			initialize: function(e, t, n) {
				for (var r in p(this, n), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, this._preventClick = !1, e) this._addLayer(e[r], r);
				for (r in t) this._addLayer(t[r], r, !0);
			},
			onAdd: function(e) {
				this._initLayout(), this._update(), this._map = e, e.on("zoomend", this._checkDisabledLayers, this);
				for (var t = 0; t < this._layers.length; t++) this._layers[t].layer.on("add remove", this._onLayerChange, this);
				return this._container;
			},
			addTo: function(e) {
				return on.prototype.addTo.call(this, e), this._expandIfNotCollapsed();
			},
			onRemove: function() {
				this._map.off("zoomend", this._checkDisabledLayers, this);
				for (var e = 0; e < this._layers.length; e++) this._layers[e].layer.off("add remove", this._onLayerChange, this);
			},
			addBaseLayer: function(e, t) {
				return this._addLayer(e, t), this._map ? this._update() : this;
			},
			addOverlay: function(e, t) {
				return this._addLayer(e, t, !0), this._map ? this._update() : this;
			},
			removeLayer: function(e) {
				e.off("add remove", this._onLayerChange, this);
				var t = this._getLayer(o(e));
				return t && this._layers.splice(this._layers.indexOf(t), 1), this._map ? this._update() : this;
			},
			expand: function() {
				J(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
				var e = this._map.getSize().y - (this._container.offsetTop + 50);
				return e < this._section.clientHeight ? (J(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = e + "px") : bt(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
			},
			collapse: function() {
				return bt(this._container, "leaflet-control-layers-expanded"), this;
			},
			_initLayout: function() {
				var e = "leaflet-control-layers", t = this._container = K("div", e), n = this.options.collapsed;
				t.setAttribute("aria-haspopup", !0), Jt(t), qt(t);
				var r = this._section = K("section", e + "-list");
				n && (this._map.on("click", this.collapse, this), X(t, {
					mouseenter: this._expandSafely,
					mouseleave: this.collapse
				}, this));
				var i = this._layersLink = K("a", e + "-toggle", t);
				i.href = "#", i.title = "Layers", i.setAttribute("role", "button"), X(i, {
					keydown: function(e) {
						e.keyCode === 13 && this._expandSafely();
					},
					click: function(e) {
						Yt(e), this._expandSafely();
					}
				}, this), n || this.expand(), this._baseLayersList = K("div", e + "-base", r), this._separator = K("div", e + "-separator", r), this._overlaysList = K("div", e + "-overlays", r), t.appendChild(r);
			},
			_getLayer: function(e) {
				for (var t = 0; t < this._layers.length; t++) if (this._layers[t] && o(this._layers[t].layer) === e) return this._layers[t];
			},
			_addLayer: function(e, t, n) {
				this._map && e.on("add remove", this._onLayerChange, this), this._layers.push({
					layer: e,
					name: t,
					overlay: n
				}), this.options.sortLayers && this._layers.sort(i(function(e, t) {
					return this.options.sortFunction(e.layer, t.layer, e.name, t.name);
				}, this)), this.options.autoZIndex && e.setZIndex && (this._lastZIndex++, e.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed();
			},
			_update: function() {
				if (!this._container) return this;
				gt(this._baseLayersList), gt(this._overlaysList), this._layerControlInputs = [];
				var e, t, n, r, i = 0;
				for (n = 0; n < this._layers.length; n++) r = this._layers[n], this._addItem(r), t ||= r.overlay, e ||= !r.overlay, i += +!r.overlay;
				return this.options.hideSingleBase && (e &&= i > 1, this._baseLayersList.style.display = e ? "" : "none"), this._separator.style.display = t && e ? "" : "none", this;
			},
			_onLayerChange: function(e) {
				this._handlingClick || this._update();
				var t = this._getLayer(o(e.target)), n = t.overlay ? e.type === "add" ? "overlayadd" : "overlayremove" : e.type === "add" ? "baselayerchange" : null;
				n && this._map.fire(n, t);
			},
			_createRadioElement: function(e, t) {
				var n = "<input type=\"radio\" class=\"leaflet-control-layers-selector\" name=\"" + e + "\"" + (t ? " checked=\"checked\"" : "") + "/>", r = document.createElement("div");
				return r.innerHTML = n, r.firstChild;
			},
			_addItem: function(e) {
				var t = document.createElement("label"), n = this._map.hasLayer(e.layer), r;
				e.overlay ? (r = document.createElement("input"), r.type = "checkbox", r.className = "leaflet-control-layers-selector", r.defaultChecked = n) : r = this._createRadioElement("leaflet-base-layers_" + o(this), n), this._layerControlInputs.push(r), r.layerId = o(e.layer), X(r, "click", this._onInputClick, this);
				var i = document.createElement("span");
				i.innerHTML = " " + e.name;
				var a = document.createElement("span");
				return t.appendChild(a), a.appendChild(r), a.appendChild(i), (e.overlay ? this._overlaysList : this._baseLayersList).appendChild(t), this._checkDisabledLayers(), t;
			},
			_onInputClick: function() {
				if (!this._preventClick) {
					var e = this._layerControlInputs, t, n, r = [], i = [];
					this._handlingClick = !0;
					for (var a = e.length - 1; a >= 0; a--) t = e[a], n = this._getLayer(t.layerId).layer, t.checked ? r.push(n) : t.checked || i.push(n);
					for (a = 0; a < i.length; a++) this._map.hasLayer(i[a]) && this._map.removeLayer(i[a]);
					for (a = 0; a < r.length; a++) this._map.hasLayer(r[a]) || this._map.addLayer(r[a]);
					this._handlingClick = !1, this._refocusOnMap();
				}
			},
			_checkDisabledLayers: function() {
				for (var e = this._layerControlInputs, t, n, r = this._map.getZoom(), i = e.length - 1; i >= 0; i--) t = e[i], n = this._getLayer(t.layerId).layer, t.disabled = n.options.minZoom !== void 0 && r < n.options.minZoom || n.options.maxZoom !== void 0 && r > n.options.maxZoom;
			},
			_expandIfNotCollapsed: function() {
				return this._map && !this.options.collapsed && this.expand(), this;
			},
			_expandSafely: function() {
				var e = this._section;
				this._preventClick = !0, X(e, "click", Yt), this.expand();
				var t = this;
				setTimeout(function() {
					Z(e, "click", Yt), t._preventClick = !1;
				});
			}
		}), ln = function(e, t, n) {
			return new cn(e, t, n);
		}, un = on.extend({
			options: {
				position: "topleft",
				zoomInText: "<span aria-hidden=\"true\">+</span>",
				zoomInTitle: "Zoom in",
				zoomOutText: "<span aria-hidden=\"true\">&#x2212;</span>",
				zoomOutTitle: "Zoom out"
			},
			onAdd: function(e) {
				var t = "leaflet-control-zoom", n = K("div", t + " leaflet-bar"), r = this.options;
				return this._zoomInButton = this._createButton(r.zoomInText, r.zoomInTitle, t + "-in", n, this._zoomIn), this._zoomOutButton = this._createButton(r.zoomOutText, r.zoomOutTitle, t + "-out", n, this._zoomOut), this._updateDisabled(), e.on("zoomend zoomlevelschange", this._updateDisabled, this), n;
			},
			onRemove: function(e) {
				e.off("zoomend zoomlevelschange", this._updateDisabled, this);
			},
			disable: function() {
				return this._disabled = !0, this._updateDisabled(), this;
			},
			enable: function() {
				return this._disabled = !1, this._updateDisabled(), this;
			},
			_zoomIn: function(e) {
				!this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
			},
			_zoomOut: function(e) {
				!this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
			},
			_createButton: function(e, t, n, r, i) {
				var a = K("a", n, r);
				return a.innerHTML = e, a.href = "#", a.title = t, a.setAttribute("role", "button"), a.setAttribute("aria-label", t), Jt(a), X(a, "click", Xt), X(a, "click", i, this), X(a, "click", this._refocusOnMap, this), a;
			},
			_updateDisabled: function() {
				var e = this._map, t = "leaflet-disabled";
				bt(this._zoomInButton, t), bt(this._zoomOutButton, t), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || e._zoom === e.getMinZoom()) && (J(this._zoomOutButton, t), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || e._zoom === e.getMaxZoom()) && (J(this._zoomInButton, t), this._zoomInButton.setAttribute("aria-disabled", "true"));
			}
		});
		Q.mergeOptions({ zoomControl: !0 }), Q.addInitHook(function() {
			this.options.zoomControl && (this.zoomControl = new un(), this.addControl(this.zoomControl));
		});
		var dn = function(e) {
			return new un(e);
		}, fn = on.extend({
			options: {
				position: "bottomleft",
				maxWidth: 100,
				metric: !0,
				imperial: !0
			},
			onAdd: function(e) {
				var t = "leaflet-control-scale", n = K("div", t), r = this.options;
				return this._addScales(r, t + "-line", n), e.on(r.updateWhenIdle ? "moveend" : "move", this._update, this), e.whenReady(this._update, this), n;
			},
			onRemove: function(e) {
				e.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
			},
			_addScales: function(e, t, n) {
				e.metric && (this._mScale = K("div", t, n)), e.imperial && (this._iScale = K("div", t, n));
			},
			_update: function() {
				var e = this._map, t = e.getSize().y / 2, n = e.distance(e.containerPointToLatLng([0, t]), e.containerPointToLatLng([this.options.maxWidth, t]));
				this._updateScales(n);
			},
			_updateScales: function(e) {
				this.options.metric && e && this._updateMetric(e), this.options.imperial && e && this._updateImperial(e);
			},
			_updateMetric: function(e) {
				var t = this._getRoundNum(e), n = t < 1e3 ? t + " m" : t / 1e3 + " km";
				this._updateScale(this._mScale, n, t / e);
			},
			_updateImperial: function(e) {
				var t = e * 3.2808399, n, r, i;
				t > 5280 ? (n = t / 5280, r = this._getRoundNum(n), this._updateScale(this._iScale, r + " mi", r / n)) : (i = this._getRoundNum(t), this._updateScale(this._iScale, i + " ft", i / t));
			},
			_updateScale: function(e, t, n) {
				e.style.width = Math.round(this.options.maxWidth * n) + "px", e.innerHTML = t;
			},
			_getRoundNum: function(e) {
				var t = 10 ** ((Math.floor(e) + "").length - 1), n = e / t;
				return n = n >= 10 ? 10 : n >= 5 ? 5 : n >= 3 ? 3 : n >= 2 ? 2 : 1, t * n;
			}
		}), pn = function(e) {
			return new fn(e);
		}, mn = on.extend({
			options: {
				position: "bottomright",
				prefix: "<a href=\"https://leafletjs.com\" title=\"A JavaScript library for interactive maps\">" + (G.inlineSvg ? "<svg aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"8\" viewBox=\"0 0 12 8\" class=\"leaflet-attribution-flag\"><path fill=\"#4C7BE1\" d=\"M0 0h12v4H0z\"/><path fill=\"#FFD500\" d=\"M0 4h12v3H0z\"/><path fill=\"#E0BC00\" d=\"M0 7h12v1H0z\"/></svg> " : "") + "Leaflet</a>"
			},
			initialize: function(e) {
				p(this, e), this._attributions = {};
			},
			onAdd: function(e) {
				for (var t in e.attributionControl = this, this._container = K("div", "leaflet-control-attribution"), Jt(this._container), e._layers) e._layers[t].getAttribution && this.addAttribution(e._layers[t].getAttribution());
				return this._update(), e.on("layeradd", this._addAttribution, this), this._container;
			},
			onRemove: function(e) {
				e.off("layeradd", this._addAttribution, this);
			},
			_addAttribution: function(e) {
				e.layer.getAttribution && (this.addAttribution(e.layer.getAttribution()), e.layer.once("remove", function() {
					this.removeAttribution(e.layer.getAttribution());
				}, this));
			},
			setPrefix: function(e) {
				return this.options.prefix = e, this._update(), this;
			},
			addAttribution: function(e) {
				return e && (this._attributions[e] || (this._attributions[e] = 0), this._attributions[e]++, this._update()), this;
			},
			removeAttribution: function(e) {
				return e && this._attributions[e] && (this._attributions[e]--, this._update()), this;
			},
			_update: function() {
				if (this._map) {
					var e = [];
					for (var t in this._attributions) this._attributions[t] && e.push(t);
					var n = [];
					this.options.prefix && n.push(this.options.prefix), e.length && n.push(e.join(", ")), this._container.innerHTML = n.join(" <span aria-hidden=\"true\">|</span> ");
				}
			}
		});
		Q.mergeOptions({ attributionControl: !0 }), Q.addInitHook(function() {
			this.options.attributionControl && new mn().addTo(this);
		}), on.Layers = cn, on.Zoom = un, on.Scale = fn, on.Attribution = mn, sn.layers = ln, sn.zoom = dn, sn.scale = pn, sn.attribution = function(e) {
			return new mn(e);
		};
		var hn = te.extend({
			initialize: function(e) {
				this._map = e;
			},
			enable: function() {
				return this._enabled || (this._enabled = !0, this.addHooks()), this;
			},
			disable: function() {
				return this._enabled && (this._enabled = !1, this.removeHooks()), this;
			},
			enabled: function() {
				return !!this._enabled;
			}
		});
		hn.addTo = function(e, t) {
			return e.addHandler(t, this), this;
		};
		var gn = { Events: D }, _n = G.touch ? "touchstart mousedown" : "mousedown", vn = re.extend({
			options: { clickTolerance: 3 },
			initialize: function(e, t, n, r) {
				p(this, r), this._element = e, this._dragStartTarget = t || e, this._preventOutline = n;
			},
			enable: function() {
				this._enabled ||= (X(this._dragStartTarget, _n, this._onDown, this), !0);
			},
			disable: function() {
				this._enabled && (vn._dragging === this && this.finishDrag(!0), Z(this._dragStartTarget, _n, this._onDown, this), this._enabled = !1, this._moved = !1);
			},
			_onDown: function(e) {
				if (this._enabled && (this._moved = !1, !yt(this._element, "leaflet-zoom-anim"))) {
					if (e.touches && e.touches.length !== 1) vn._dragging === this && this.finishDrag();
					else if (!(vn._dragging || e.shiftKey || e.which !== 1 && e.button !== 1 && !e.touches) && (vn._dragging = this, this._preventOutline && Lt(this._element), Nt(), kt(), !this._moving)) {
						this.fire("down");
						var t = e.touches ? e.touches[0] : e, n = zt(this._element);
						this._startPoint = new O(t.clientX, t.clientY), this._startPos = Ot(this._element), this._parentScale = Bt(n);
						var r = e.type === "mousedown";
						X(document, r ? "mousemove" : "touchmove", this._onMove, this), X(document, r ? "mouseup" : "touchend touchcancel", this._onUp, this);
					}
				}
			},
			_onMove: function(e) {
				if (this._enabled) {
					if (e.touches && e.touches.length > 1) this._moved = !0;
					else {
						var t = e.touches && e.touches.length === 1 ? e.touches[0] : e, n = new O(t.clientX, t.clientY)._subtract(this._startPoint);
						(n.x || n.y) && (Math.abs(n.x) + Math.abs(n.y) < this.options.clickTolerance || (n.x /= this._parentScale.x, n.y /= this._parentScale.y, Yt(e), this._moved || (this.fire("dragstart"), this._moved = !0, J(document.body, "leaflet-dragging"), this._lastTarget = e.target || e.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), J(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(n), this._moving = !0, this._lastEvent = e, this._updatePosition()));
					}
				}
			},
			_updatePosition: function() {
				var e = { originalEvent: this._lastEvent };
				this.fire("predrag", e), Dt(this._element, this._newPos), this.fire("drag", e);
			},
			_onUp: function() {
				this._enabled && this.finishDrag();
			},
			finishDrag: function(e) {
				bt(document.body, "leaflet-dragging"), this._lastTarget &&= (bt(this._lastTarget, "leaflet-drag-target"), null), Z(document, "mousemove touchmove", this._onMove, this), Z(document, "mouseup touchend touchcancel", this._onUp, this), Pt(), At();
				var t = this._moved && this._moving;
				this._moving = !1, vn._dragging = !1, t && this.fire("dragend", {
					noInertia: e,
					distance: this._newPos.distanceTo(this._startPos)
				});
			}
		});
		function yn(e, t, n) {
			for (var r, i = [
				1,
				4,
				2,
				8
			], a = 0, o, s, c, l, u = e.length, d, f; a < u; a++) e[a]._code = Mn(e[a], t);
			for (s = 0; s < 4; s++) {
				for (d = i[s], r = [], a = 0, u = e.length, o = u - 1; a < u; o = a++) c = e[a], l = e[o], c._code & d ? l._code & d || (f = jn(l, c, d, t, n), f._code = Mn(f, t), r.push(f)) : (l._code & d && (f = jn(l, c, d, t, n), f._code = Mn(f, t), r.push(f)), r.push(c));
				e = r;
			}
			return e;
		}
		function bn(e, t) {
			var n, r, i, a, o, s, c, l, u;
			if (!e || e.length === 0) throw Error("latlngs not passed");
			Fn(e) || (console.warn("latlngs are not flat! Only the first ring will be used"), e = e[0]);
			var d = P([0, 0]), f = M(e);
			f.getNorthWest().distanceTo(f.getSouthWest()) * f.getNorthEast().distanceTo(f.getNorthWest()) < 1700 && (d = xn(e));
			var p = e.length, m = [];
			for (n = 0; n < p; n++) {
				var h = P(e[n]);
				m.push(t.project(P([h.lat - d.lat, h.lng - d.lng])));
			}
			for (s = c = l = 0, n = 0, r = p - 1; n < p; r = n++) i = m[n], a = m[r], o = i.y * a.x - a.y * i.x, c += (i.x + a.x) * o, l += (i.y + a.y) * o, s += o * 3;
			u = s === 0 ? m[0] : [c / s, l / s];
			var g = t.unproject(k(u));
			return P([g.lat + d.lat, g.lng + d.lng]);
		}
		function xn(e) {
			for (var t = 0, n = 0, r = 0, i = 0; i < e.length; i++) {
				var a = P(e[i]);
				t += a.lat, n += a.lng, r++;
			}
			return P([t / r, n / r]);
		}
		var Sn = {
			__proto__: null,
			clipPolygon: yn,
			polygonCenter: bn,
			centroid: xn
		};
		function Cn(e, t) {
			if (!t || !e.length) return e.slice();
			var n = t * t;
			return e = On(e, n), e = En(e, n), e;
		}
		function wn(e, t, n) {
			return Math.sqrt(Pn(e, t, n, !0));
		}
		function Tn(e, t, n) {
			return Pn(e, t, n);
		}
		function En(e, t) {
			var n = e.length, r = new (typeof Uint8Array < "u" ? Uint8Array : Array)(n);
			r[0] = r[n - 1] = 1, Dn(e, r, t, 0, n - 1);
			var i, a = [];
			for (i = 0; i < n; i++) r[i] && a.push(e[i]);
			return a;
		}
		function Dn(e, t, n, r, i) {
			for (var a = 0, o, s = r + 1, c; s <= i - 1; s++) c = Pn(e[s], e[r], e[i], !0), c > a && (o = s, a = c);
			a > n && (t[o] = 1, Dn(e, t, n, r, o), Dn(e, t, n, o, i));
		}
		function On(e, t) {
			for (var n = [e[0]], r = 1, i = 0, a = e.length; r < a; r++) Nn(e[r], e[i]) > t && (n.push(e[r]), i = r);
			return i < a - 1 && n.push(e[a - 1]), n;
		}
		var kn;
		function An(e, t, n, r, i) {
			var a = r ? kn : Mn(e, n), o = Mn(t, n), s, c, l;
			for (kn = o;;) {
				if (!(a | o)) return [e, t];
				if (a & o) return !1;
				s = a || o, c = jn(e, t, s, n, i), l = Mn(c, n), s === a ? (e = c, a = l) : (t = c, o = l);
			}
		}
		function jn(e, t, n, r, i) {
			var a = t.x - e.x, o = t.y - e.y, s = r.min, c = r.max, l, u;
			return n & 8 ? (l = e.x + a * (c.y - e.y) / o, u = c.y) : n & 4 ? (l = e.x + a * (s.y - e.y) / o, u = s.y) : n & 2 ? (l = c.x, u = e.y + o * (c.x - e.x) / a) : n & 1 && (l = s.x, u = e.y + o * (s.x - e.x) / a), new O(l, u, i);
		}
		function Mn(e, t) {
			var n = 0;
			return e.x < t.min.x ? n |= 1 : e.x > t.max.x && (n |= 2), e.y < t.min.y ? n |= 4 : e.y > t.max.y && (n |= 8), n;
		}
		function Nn(e, t) {
			var n = t.x - e.x, r = t.y - e.y;
			return n * n + r * r;
		}
		function Pn(e, t, n, r) {
			var i = t.x, a = t.y, o = n.x - i, s = n.y - a, c = o * o + s * s, l;
			return c > 0 && (l = ((e.x - i) * o + (e.y - a) * s) / c, l > 1 ? (i = n.x, a = n.y) : l > 0 && (i += o * l, a += s * l)), o = e.x - i, s = e.y - a, r ? o * o + s * s : new O(i, a);
		}
		function Fn(e) {
			return !_(e[0]) || typeof e[0][0] != "object" && e[0][0] !== void 0;
		}
		function In(e) {
			return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), Fn(e);
		}
		function Ln(e, t) {
			var n, r, i, a, o, s, c, l;
			if (!e || e.length === 0) throw Error("latlngs not passed");
			Fn(e) || (console.warn("latlngs are not flat! Only the first ring will be used"), e = e[0]);
			var u = P([0, 0]), d = M(e);
			d.getNorthWest().distanceTo(d.getSouthWest()) * d.getNorthEast().distanceTo(d.getNorthWest()) < 1700 && (u = xn(e));
			var f = e.length, p = [];
			for (n = 0; n < f; n++) {
				var m = P(e[n]);
				p.push(t.project(P([m.lat - u.lat, m.lng - u.lng])));
			}
			for (n = 0, r = 0; n < f - 1; n++) r += p[n].distanceTo(p[n + 1]) / 2;
			if (r === 0) l = p[0];
			else for (n = 0, a = 0; n < f - 1; n++) if (o = p[n], s = p[n + 1], i = o.distanceTo(s), a += i, a > r) {
				c = (a - r) / i, l = [s.x - c * (s.x - o.x), s.y - c * (s.y - o.y)];
				break;
			}
			var h = t.unproject(k(l));
			return P([h.lat + u.lat, h.lng + u.lng]);
		}
		var Rn = {
			__proto__: null,
			simplify: Cn,
			pointToSegmentDistance: wn,
			closestPointOnSegment: Tn,
			clipSegment: An,
			_getEdgeIntersection: jn,
			_getBitCode: Mn,
			_sqClosestPointOnSegment: Pn,
			isFlat: Fn,
			_flat: In,
			polylineCenter: Ln
		}, zn = {
			project: function(e) {
				return new O(e.lng, e.lat);
			},
			unproject: function(e) {
				return new N(e.y, e.x);
			},
			bounds: new A([-180, -90], [180, 90])
		}, Bn = {
			R: 6378137,
			R_MINOR: 6356752.314245179,
			bounds: new A([-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]),
			project: function(e) {
				var t = Math.PI / 180, n = this.R, r = e.lat * t, i = this.R_MINOR / n, a = Math.sqrt(1 - i * i), o = a * Math.sin(r), s = Math.tan(Math.PI / 4 - r / 2) / ((1 - o) / (1 + o)) ** (a / 2);
				return r = -n * Math.log(Math.max(s, 1e-10)), new O(e.lng * t * n, r);
			},
			unproject: function(e) {
				for (var t = 180 / Math.PI, n = this.R, r = this.R_MINOR / n, i = Math.sqrt(1 - r * r), a = Math.exp(-e.y / n), o = Math.PI / 2 - 2 * Math.atan(a), s = 0, c = .1, l; s < 15 && Math.abs(c) > 1e-7; s++) l = i * Math.sin(o), l = ((1 - l) / (1 + l)) ** (i / 2), c = Math.PI / 2 - 2 * Math.atan(a * l) - o, o += c;
				return new N(o * t, e.x * t / n);
			}
		}, Vn = {
			__proto__: null,
			LonLat: zn,
			Mercator: Bn,
			SphericalMercator: le
		}, Hn = n({}, se, {
			code: "EPSG:3395",
			projection: Bn,
			transformation: function() {
				var e = .5 / (Math.PI * Bn.R);
				return de(e, .5, -e, .5);
			}()
		}), Un = n({}, se, {
			code: "EPSG:4326",
			projection: zn,
			transformation: de(1 / 180, 1, -1 / 180, .5)
		}), Wn = n({}, oe, {
			projection: zn,
			transformation: de(1, 0, -1, 0),
			scale: function(e) {
				return 2 ** e;
			},
			zoom: function(e) {
				return Math.log(e) / Math.LN2;
			},
			distance: function(e, t) {
				var n = t.lng - e.lng, r = t.lat - e.lat;
				return Math.sqrt(n * n + r * r);
			},
			infinite: !0
		});
		oe.Earth = se, oe.EPSG3395 = Hn, oe.EPSG3857 = fe, oe.EPSG900913 = pe, oe.EPSG4326 = Un, oe.Simple = Wn;
		var Gn = re.extend({
			options: {
				pane: "overlayPane",
				attribution: null,
				bubblingMouseEvents: !0
			},
			addTo: function(e) {
				return e.addLayer(this), this;
			},
			remove: function() {
				return this.removeFrom(this._map || this._mapToAdd);
			},
			removeFrom: function(e) {
				return e && e.removeLayer(this), this;
			},
			getPane: function(e) {
				return this._map.getPane(e ? this.options[e] || e : this.options.pane);
			},
			addInteractiveTarget: function(e) {
				return this._map._targets[o(e)] = this, this;
			},
			removeInteractiveTarget: function(e) {
				return delete this._map._targets[o(e)], this;
			},
			getAttribution: function() {
				return this.options.attribution;
			},
			_layerAdd: function(e) {
				var t = e.target;
				if (t.hasLayer(this)) {
					if (this._map = t, this._zoomAnimated = t._zoomAnimated, this.getEvents) {
						var n = this.getEvents();
						t.on(n, this), this.once("remove", function() {
							t.off(n, this);
						}, this);
					}
					this.onAdd(t), this.fire("add"), t.fire("layeradd", { layer: this });
				}
			}
		});
		Q.include({
			addLayer: function(e) {
				if (!e._layerAdd) throw Error("The provided object is not a Layer.");
				var t = o(e);
				return this._layers[t] || (this._layers[t] = e, e._mapToAdd = this, e.beforeAdd && e.beforeAdd(this), this.whenReady(e._layerAdd, e)), this;
			},
			removeLayer: function(e) {
				var t = o(e);
				return this._layers[t] && (this._loaded && e.onRemove(this), delete this._layers[t], this._loaded && (this.fire("layerremove", { layer: e }), e.fire("remove")), e._map = e._mapToAdd = null), this;
			},
			hasLayer: function(e) {
				return o(e) in this._layers;
			},
			eachLayer: function(e, t) {
				for (var n in this._layers) e.call(t, this._layers[n]);
				return this;
			},
			_addLayers: function(e) {
				e = e ? _(e) ? e : [e] : [];
				for (var t = 0, n = e.length; t < n; t++) this.addLayer(e[t]);
			},
			_addZoomLimit: function(e) {
				isNaN(e.options.maxZoom) && isNaN(e.options.minZoom) || (this._zoomBoundLayers[o(e)] = e, this._updateZoomLevels());
			},
			_removeZoomLimit: function(e) {
				var t = o(e);
				this._zoomBoundLayers[t] && (delete this._zoomBoundLayers[t], this._updateZoomLevels());
			},
			_updateZoomLevels: function() {
				var e = Infinity, t = -Infinity, n = this._getZoomSpan();
				for (var r in this._zoomBoundLayers) {
					var i = this._zoomBoundLayers[r].options;
					e = i.minZoom === void 0 ? e : Math.min(e, i.minZoom), t = i.maxZoom === void 0 ? t : Math.max(t, i.maxZoom);
				}
				this._layersMaxZoom = t === -Infinity ? void 0 : t, this._layersMinZoom = e === Infinity ? void 0 : e, n !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
			}
		});
		var Kn = Gn.extend({
			initialize: function(e, t) {
				p(this, t), this._layers = {};
				var n, r;
				if (e) for (n = 0, r = e.length; n < r; n++) this.addLayer(e[n]);
			},
			addLayer: function(e) {
				var t = this.getLayerId(e);
				return this._layers[t] = e, this._map && this._map.addLayer(e), this;
			},
			removeLayer: function(e) {
				var t = e in this._layers ? e : this.getLayerId(e);
				return this._map && this._layers[t] && this._map.removeLayer(this._layers[t]), delete this._layers[t], this;
			},
			hasLayer: function(e) {
				return (typeof e == "number" ? e : this.getLayerId(e)) in this._layers;
			},
			clearLayers: function() {
				return this.eachLayer(this.removeLayer, this);
			},
			invoke: function(e) {
				var t = Array.prototype.slice.call(arguments, 1), n, r;
				for (n in this._layers) r = this._layers[n], r[e] && r[e].apply(r, t);
				return this;
			},
			onAdd: function(e) {
				this.eachLayer(e.addLayer, e);
			},
			onRemove: function(e) {
				this.eachLayer(e.removeLayer, e);
			},
			eachLayer: function(e, t) {
				for (var n in this._layers) e.call(t, this._layers[n]);
				return this;
			},
			getLayer: function(e) {
				return this._layers[e];
			},
			getLayers: function() {
				var e = [];
				return this.eachLayer(e.push, e), e;
			},
			setZIndex: function(e) {
				return this.invoke("setZIndex", e);
			},
			getLayerId: function(e) {
				return o(e);
			}
		}), qn = function(e, t) {
			return new Kn(e, t);
		}, Jn = Kn.extend({
			addLayer: function(e) {
				return this.hasLayer(e) ? this : (e.addEventParent(this), Kn.prototype.addLayer.call(this, e), this.fire("layeradd", { layer: e }));
			},
			removeLayer: function(e) {
				return this.hasLayer(e) ? (e in this._layers && (e = this._layers[e]), e.removeEventParent(this), Kn.prototype.removeLayer.call(this, e), this.fire("layerremove", { layer: e })) : this;
			},
			setStyle: function(e) {
				return this.invoke("setStyle", e);
			},
			bringToFront: function() {
				return this.invoke("bringToFront");
			},
			bringToBack: function() {
				return this.invoke("bringToBack");
			},
			getBounds: function() {
				var e = new j();
				for (var t in this._layers) {
					var n = this._layers[t];
					e.extend(n.getBounds ? n.getBounds() : n.getLatLng());
				}
				return e;
			}
		}), Yn = function(e, t) {
			return new Jn(e, t);
		}, Xn = te.extend({
			options: {
				popupAnchor: [0, 0],
				tooltipAnchor: [0, 0],
				crossOrigin: !1
			},
			initialize: function(e) {
				p(this, e);
			},
			createIcon: function(e) {
				return this._createIcon("icon", e);
			},
			createShadow: function(e) {
				return this._createIcon("shadow", e);
			},
			_createIcon: function(e, t) {
				var n = this._getIconUrl(e);
				if (!n) {
					if (e === "icon") throw Error("iconUrl not set in Icon options (see the docs).");
					return null;
				}
				var r = this._createImg(n, t && t.tagName === "IMG" ? t : null);
				return this._setIconStyles(r, e), (this.options.crossOrigin || this.options.crossOrigin === "") && (r.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), r;
			},
			_setIconStyles: function(e, t) {
				var n = this.options, r = n[t + "Size"];
				typeof r == "number" && (r = [r, r]);
				var i = k(r), a = k(t === "shadow" && n.shadowAnchor || n.iconAnchor || i && i.divideBy(2, !0));
				e.className = "leaflet-marker-" + t + " " + (n.className || ""), a && (e.style.marginLeft = -a.x + "px", e.style.marginTop = -a.y + "px"), i && (e.style.width = i.x + "px", e.style.height = i.y + "px");
			},
			_createImg: function(e, t) {
				return t ||= document.createElement("img"), t.src = e, t;
			},
			_getIconUrl: function(e) {
				return G.retina && this.options[e + "RetinaUrl"] || this.options[e + "Url"];
			}
		});
		function Zn(e) {
			return new Xn(e);
		}
		var Qn = Xn.extend({
			options: {
				iconUrl: "marker-icon.png",
				iconRetinaUrl: "marker-icon-2x.png",
				shadowUrl: "marker-shadow.png",
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
				tooltipAnchor: [16, -28],
				shadowSize: [41, 41]
			},
			_getIconUrl: function(e) {
				return typeof Qn.imagePath != "string" && (Qn.imagePath = this._detectIconPath()), (this.options.imagePath || Qn.imagePath) + Xn.prototype._getIconUrl.call(this, e);
			},
			_stripUrl: function(e) {
				var t = function(e, t, n) {
					var r = t.exec(e);
					return r && r[n];
				};
				return e = t(e, /^url\((['"])?(.+)\1\)$/, 2), e && t(e, /^(.*)marker-icon\.png$/, 1);
			},
			_detectIconPath: function() {
				var e = K("div", "leaflet-default-icon-path", document.body), t = ht(e, "background-image") || ht(e, "backgroundImage");
				if (document.body.removeChild(e), t = this._stripUrl(t), t) return t;
				var n = document.querySelector("link[href$=\"leaflet.css\"]");
				return n ? n.href.substring(0, n.href.length - 11 - 1) : "";
			}
		}), $n = hn.extend({
			initialize: function(e) {
				this._marker = e;
			},
			addHooks: function() {
				var e = this._marker._icon;
				this._draggable ||= new vn(e, e, !0), this._draggable.on({
					dragstart: this._onDragStart,
					predrag: this._onPreDrag,
					drag: this._onDrag,
					dragend: this._onDragEnd
				}, this).enable(), J(e, "leaflet-marker-draggable");
			},
			removeHooks: function() {
				this._draggable.off({
					dragstart: this._onDragStart,
					predrag: this._onPreDrag,
					drag: this._onDrag,
					dragend: this._onDragEnd
				}, this).disable(), this._marker._icon && bt(this._marker._icon, "leaflet-marker-draggable");
			},
			moved: function() {
				return this._draggable && this._draggable._moved;
			},
			_adjustPan: function(e) {
				var t = this._marker, n = t._map, r = this._marker.options.autoPanSpeed, i = this._marker.options.autoPanPadding, a = Ot(t._icon), o = n.getPixelBounds(), s = n.getPixelOrigin(), c = ae(o.min._subtract(s).add(i), o.max._subtract(s).subtract(i));
				if (!c.contains(a)) {
					var l = k((Math.max(c.max.x, a.x) - c.max.x) / (o.max.x - c.max.x) - (Math.min(c.min.x, a.x) - c.min.x) / (o.min.x - c.min.x), (Math.max(c.max.y, a.y) - c.max.y) / (o.max.y - c.max.y) - (Math.min(c.min.y, a.y) - c.min.y) / (o.min.y - c.min.y)).multiplyBy(r);
					n.panBy(l, { animate: !1 }), this._draggable._newPos._add(l), this._draggable._startPos._add(l), Dt(t._icon, this._draggable._newPos), this._onDrag(e), this._panRequest = T(this._adjustPan.bind(this, e));
				}
			},
			_onDragStart: function() {
				this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
			},
			_onPreDrag: function(e) {
				this._marker.options.autoPan && (E(this._panRequest), this._panRequest = T(this._adjustPan.bind(this, e)));
			},
			_onDrag: function(e) {
				var t = this._marker, n = t._shadow, r = Ot(t._icon), i = t._map.layerPointToLatLng(r);
				n && Dt(n, r), t._latlng = i, e.latlng = i, e.oldLatLng = this._oldLatLng, t.fire("move", e).fire("drag", e);
			},
			_onDragEnd: function(e) {
				E(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", e);
			}
		}), er = Gn.extend({
			options: {
				icon: new Qn(),
				interactive: !0,
				keyboard: !0,
				title: "",
				alt: "Marker",
				zIndexOffset: 0,
				opacity: 1,
				riseOnHover: !1,
				riseOffset: 250,
				pane: "markerPane",
				shadowPane: "shadowPane",
				bubblingMouseEvents: !1,
				autoPanOnFocus: !0,
				draggable: !1,
				autoPan: !1,
				autoPanPadding: [50, 50],
				autoPanSpeed: 10
			},
			initialize: function(e, t) {
				p(this, t), this._latlng = P(e);
			},
			onAdd: function(e) {
				this._zoomAnimated = this._zoomAnimated && e.options.markerZoomAnimation, this._zoomAnimated && e.on("zoomanim", this._animateZoom, this), this._initIcon(), this.update();
			},
			onRemove: function(e) {
				this.dragging && this.dragging.enabled() && (this.options.draggable = !0, this.dragging.removeHooks()), delete this.dragging, this._zoomAnimated && e.off("zoomanim", this._animateZoom, this), this._removeIcon(), this._removeShadow();
			},
			getEvents: function() {
				return {
					zoom: this.update,
					viewreset: this.update
				};
			},
			getLatLng: function() {
				return this._latlng;
			},
			setLatLng: function(e) {
				var t = this._latlng;
				return this._latlng = P(e), this.update(), this.fire("move", {
					oldLatLng: t,
					latlng: this._latlng
				});
			},
			setZIndexOffset: function(e) {
				return this.options.zIndexOffset = e, this.update();
			},
			getIcon: function() {
				return this.options.icon;
			},
			setIcon: function(e) {
				return this.options.icon = e, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup, this._popup.options), this;
			},
			getElement: function() {
				return this._icon;
			},
			update: function() {
				if (this._icon && this._map) {
					var e = this._map.latLngToLayerPoint(this._latlng).round();
					this._setPos(e);
				}
				return this;
			},
			_initIcon: function() {
				var e = this.options, t = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"), n = e.icon.createIcon(this._icon), r = !1;
				n !== this._icon && (this._icon && this._removeIcon(), r = !0, e.title && (n.title = e.title), n.tagName === "IMG" && (n.alt = e.alt || "")), J(n, t), e.keyboard && (n.tabIndex = "0", n.setAttribute("role", "button")), this._icon = n, e.riseOnHover && this.on({
					mouseover: this._bringToFront,
					mouseout: this._resetZIndex
				}), this.options.autoPanOnFocus && X(n, "focus", this._panOnFocus, this);
				var i = e.icon.createShadow(this._shadow), a = !1;
				i !== this._shadow && (this._removeShadow(), a = !0), i && (J(i, t), i.alt = ""), this._shadow = i, e.opacity < 1 && this._updateOpacity(), r && this.getPane().appendChild(this._icon), this._initInteraction(), i && a && this.getPane(e.shadowPane).appendChild(this._shadow);
			},
			_removeIcon: function() {
				this.options.riseOnHover && this.off({
					mouseover: this._bringToFront,
					mouseout: this._resetZIndex
				}), this.options.autoPanOnFocus && Z(this._icon, "focus", this._panOnFocus, this), q(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
			},
			_removeShadow: function() {
				this._shadow && q(this._shadow), this._shadow = null;
			},
			_setPos: function(e) {
				this._icon && Dt(this._icon, e), this._shadow && Dt(this._shadow, e), this._zIndex = e.y + this.options.zIndexOffset, this._resetZIndex();
			},
			_updateZIndex: function(e) {
				this._icon && (this._icon.style.zIndex = this._zIndex + e);
			},
			_animateZoom: function(e) {
				var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center).round();
				this._setPos(t);
			},
			_initInteraction: function() {
				if (this.options.interactive && (J(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), $n)) {
					var e = this.options.draggable;
					this.dragging && (e = this.dragging.enabled(), this.dragging.disable()), this.dragging = new $n(this), e && this.dragging.enable();
				}
			},
			setOpacity: function(e) {
				return this.options.opacity = e, this._map && this._updateOpacity(), this;
			},
			_updateOpacity: function() {
				var e = this.options.opacity;
				this._icon && Ct(this._icon, e), this._shadow && Ct(this._shadow, e);
			},
			_bringToFront: function() {
				this._updateZIndex(this.options.riseOffset);
			},
			_resetZIndex: function() {
				this._updateZIndex(0);
			},
			_panOnFocus: function() {
				var e = this._map;
				if (e) {
					var t = this.options.icon.options, n = t.iconSize ? k(t.iconSize) : k(0, 0), r = t.iconAnchor ? k(t.iconAnchor) : k(0, 0);
					e.panInside(this._latlng, {
						paddingTopLeft: r,
						paddingBottomRight: n.subtract(r)
					});
				}
			},
			_getPopupAnchor: function() {
				return this.options.icon.options.popupAnchor;
			},
			_getTooltipAnchor: function() {
				return this.options.icon.options.tooltipAnchor;
			}
		});
		function tr(e, t) {
			return new er(e, t);
		}
		var nr = Gn.extend({
			options: {
				stroke: !0,
				color: "#3388ff",
				weight: 3,
				opacity: 1,
				lineCap: "round",
				lineJoin: "round",
				dashArray: null,
				dashOffset: null,
				fill: !1,
				fillColor: null,
				fillOpacity: .2,
				fillRule: "evenodd",
				interactive: !0,
				bubblingMouseEvents: !0
			},
			beforeAdd: function(e) {
				this._renderer = e.getRenderer(this);
			},
			onAdd: function() {
				this._renderer._initPath(this), this._reset(), this._renderer._addPath(this);
			},
			onRemove: function() {
				this._renderer._removePath(this);
			},
			redraw: function() {
				return this._map && this._renderer._updatePath(this), this;
			},
			setStyle: function(e) {
				return p(this, e), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && e && Object.prototype.hasOwnProperty.call(e, "weight") && this._updateBounds()), this;
			},
			bringToFront: function() {
				return this._renderer && this._renderer._bringToFront(this), this;
			},
			bringToBack: function() {
				return this._renderer && this._renderer._bringToBack(this), this;
			},
			getElement: function() {
				return this._path;
			},
			_reset: function() {
				this._project(), this._update();
			},
			_clickTolerance: function() {
				return (this.options.stroke ? this.options.weight / 2 : 0) + (this._renderer.options.tolerance || 0);
			}
		}), rr = nr.extend({
			options: {
				fill: !0,
				radius: 10
			},
			initialize: function(e, t) {
				p(this, t), this._latlng = P(e), this._radius = this.options.radius;
			},
			setLatLng: function(e) {
				var t = this._latlng;
				return this._latlng = P(e), this.redraw(), this.fire("move", {
					oldLatLng: t,
					latlng: this._latlng
				});
			},
			getLatLng: function() {
				return this._latlng;
			},
			setRadius: function(e) {
				return this.options.radius = this._radius = e, this.redraw();
			},
			getRadius: function() {
				return this._radius;
			},
			setStyle: function(e) {
				var t = e && e.radius || this._radius;
				return nr.prototype.setStyle.call(this, e), this.setRadius(t), this;
			},
			_project: function() {
				this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds();
			},
			_updateBounds: function() {
				var e = this._radius, t = this._radiusY || e, n = this._clickTolerance(), r = [e + n, t + n];
				this._pxBounds = new A(this._point.subtract(r), this._point.add(r));
			},
			_update: function() {
				this._map && this._updatePath();
			},
			_updatePath: function() {
				this._renderer._updateCircle(this);
			},
			_empty: function() {
				return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
			},
			_containsPoint: function(e) {
				return e.distanceTo(this._point) <= this._radius + this._clickTolerance();
			}
		});
		function ir(e, t) {
			return new rr(e, t);
		}
		var ar = rr.extend({
			initialize: function(e, t, r) {
				if (typeof t == "number" && (t = n({}, r, { radius: t })), p(this, t), this._latlng = P(e), isNaN(this.options.radius)) throw Error("Circle radius cannot be NaN");
				this._mRadius = this.options.radius;
			},
			setRadius: function(e) {
				return this._mRadius = e, this.redraw();
			},
			getRadius: function() {
				return this._mRadius;
			},
			getBounds: function() {
				var e = [this._radius, this._radiusY || this._radius];
				return new j(this._map.layerPointToLatLng(this._point.subtract(e)), this._map.layerPointToLatLng(this._point.add(e)));
			},
			setStyle: nr.prototype.setStyle,
			_project: function() {
				var e = this._latlng.lng, t = this._latlng.lat, n = this._map, r = n.options.crs;
				if (r.distance === se.distance) {
					var i = Math.PI / 180, a = this._mRadius / se.R / i, o = n.project([t + a, e]), s = n.project([t - a, e]), c = o.add(s).divideBy(2), l = n.unproject(c).lat, u = Math.acos((Math.cos(a * i) - Math.sin(t * i) * Math.sin(l * i)) / (Math.cos(t * i) * Math.cos(l * i))) / i;
					(isNaN(u) || u === 0) && (u = a / Math.cos(Math.PI / 180 * t)), this._point = c.subtract(n.getPixelOrigin()), this._radius = isNaN(u) ? 0 : c.x - n.project([l, e - u]).x, this._radiusY = c.y - o.y;
				} else {
					var d = r.unproject(r.project(this._latlng).subtract([this._mRadius, 0]));
					this._point = n.latLngToLayerPoint(this._latlng), this._radius = this._point.x - n.latLngToLayerPoint(d).x;
				}
				this._updateBounds();
			}
		});
		function or(e, t, n) {
			return new ar(e, t, n);
		}
		var sr = nr.extend({
			options: {
				smoothFactor: 1,
				noClip: !1
			},
			initialize: function(e, t) {
				p(this, t), this._setLatLngs(e);
			},
			getLatLngs: function() {
				return this._latlngs;
			},
			setLatLngs: function(e) {
				return this._setLatLngs(e), this.redraw();
			},
			isEmpty: function() {
				return !this._latlngs.length;
			},
			closestLayerPoint: function(e) {
				for (var t = Infinity, n = null, r = Pn, i, a, o = 0, s = this._parts.length; o < s; o++) for (var c = this._parts[o], l = 1, u = c.length; l < u; l++) {
					i = c[l - 1], a = c[l];
					var d = r(e, i, a, !0);
					d < t && (t = d, n = r(e, i, a));
				}
				return n && (n.distance = Math.sqrt(t)), n;
			},
			getCenter: function() {
				if (!this._map) throw Error("Must add layer to map before using getCenter()");
				return Ln(this._defaultShape(), this._map.options.crs);
			},
			getBounds: function() {
				return this._bounds;
			},
			addLatLng: function(e, t) {
				return t ||= this._defaultShape(), e = P(e), t.push(e), this._bounds.extend(e), this.redraw();
			},
			_setLatLngs: function(e) {
				this._bounds = new j(), this._latlngs = this._convertLatLngs(e);
			},
			_defaultShape: function() {
				return Fn(this._latlngs) ? this._latlngs : this._latlngs[0];
			},
			_convertLatLngs: function(e) {
				for (var t = [], n = Fn(e), r = 0, i = e.length; r < i; r++) n ? (t[r] = P(e[r]), this._bounds.extend(t[r])) : t[r] = this._convertLatLngs(e[r]);
				return t;
			},
			_project: function() {
				var e = new A();
				this._rings = [], this._projectLatlngs(this._latlngs, this._rings, e), this._bounds.isValid() && e.isValid() && (this._rawPxBounds = e, this._updateBounds());
			},
			_updateBounds: function() {
				var e = this._clickTolerance(), t = new O(e, e);
				this._rawPxBounds && (this._pxBounds = new A([this._rawPxBounds.min.subtract(t), this._rawPxBounds.max.add(t)]));
			},
			_projectLatlngs: function(e, t, n) {
				var r = e[0] instanceof N, i = e.length, a, o;
				if (r) {
					for (o = [], a = 0; a < i; a++) o[a] = this._map.latLngToLayerPoint(e[a]), n.extend(o[a]);
					t.push(o);
				} else for (a = 0; a < i; a++) this._projectLatlngs(e[a], t, n);
			},
			_clipPoints: function() {
				var e = this._renderer._bounds;
				if (this._parts = [], this._pxBounds && this._pxBounds.intersects(e)) {
					if (this.options.noClip) this._parts = this._rings;
					else for (var t = this._parts, n = 0, r, i = 0, a = this._rings.length, o, s, c; n < a; n++) for (c = this._rings[n], r = 0, o = c.length; r < o - 1; r++) s = An(c[r], c[r + 1], e, r, !0), s && (t[i] = t[i] || [], t[i].push(s[0]), (s[1] !== c[r + 1] || r === o - 2) && (t[i].push(s[1]), i++));
				}
			},
			_simplifyPoints: function() {
				for (var e = this._parts, t = this.options.smoothFactor, n = 0, r = e.length; n < r; n++) e[n] = Cn(e[n], t);
			},
			_update: function() {
				this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
			},
			_updatePath: function() {
				this._renderer._updatePoly(this);
			},
			_containsPoint: function(e, t) {
				var n, r, i, a, o, s, c = this._clickTolerance();
				if (!this._pxBounds || !this._pxBounds.contains(e)) return !1;
				for (n = 0, a = this._parts.length; n < a; n++) for (s = this._parts[n], r = 0, o = s.length, i = o - 1; r < o; i = r++) if ((t || r !== 0) && wn(e, s[i], s[r]) <= c) return !0;
				return !1;
			}
		});
		function cr(e, t) {
			return new sr(e, t);
		}
		sr._flat = In;
		var lr = sr.extend({
			options: { fill: !0 },
			isEmpty: function() {
				return !this._latlngs.length || !this._latlngs[0].length;
			},
			getCenter: function() {
				if (!this._map) throw Error("Must add layer to map before using getCenter()");
				return bn(this._defaultShape(), this._map.options.crs);
			},
			_convertLatLngs: function(e) {
				var t = sr.prototype._convertLatLngs.call(this, e), n = t.length;
				return n >= 2 && t[0] instanceof N && t[0].equals(t[n - 1]) && t.pop(), t;
			},
			_setLatLngs: function(e) {
				sr.prototype._setLatLngs.call(this, e), Fn(this._latlngs) && (this._latlngs = [this._latlngs]);
			},
			_defaultShape: function() {
				return Fn(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
			},
			_clipPoints: function() {
				var e = this._renderer._bounds, t = this.options.weight, n = new O(t, t);
				if (e = new A(e.min.subtract(n), e.max.add(n)), this._parts = [], this._pxBounds && this._pxBounds.intersects(e)) {
					if (this.options.noClip) this._parts = this._rings;
					else for (var r = 0, i = this._rings.length, a; r < i; r++) a = yn(this._rings[r], e, !0), a.length && this._parts.push(a);
				}
			},
			_updatePath: function() {
				this._renderer._updatePoly(this, !0);
			},
			_containsPoint: function(e) {
				var t = !1, n, r, i, a, o, s, c, l;
				if (!this._pxBounds || !this._pxBounds.contains(e)) return !1;
				for (a = 0, c = this._parts.length; a < c; a++) for (n = this._parts[a], o = 0, l = n.length, s = l - 1; o < l; s = o++) r = n[o], i = n[s], r.y > e.y != i.y > e.y && e.x < (i.x - r.x) * (e.y - r.y) / (i.y - r.y) + r.x && (t = !t);
				return t || sr.prototype._containsPoint.call(this, e, !0);
			}
		});
		function ur(e, t) {
			return new lr(e, t);
		}
		var dr = Jn.extend({
			initialize: function(e, t) {
				p(this, t), this._layers = {}, e && this.addData(e);
			},
			addData: function(e) {
				var t = _(e) ? e : e.features, n, r, i;
				if (t) {
					for (n = 0, r = t.length; n < r; n++) i = t[n], (i.geometries || i.geometry || i.features || i.coordinates) && this.addData(i);
					return this;
				}
				var a = this.options;
				if (a.filter && !a.filter(e)) return this;
				var o = fr(e, a);
				return o ? (o.feature = yr(e), o.defaultOptions = o.options, this.resetStyle(o), a.onEachFeature && a.onEachFeature(e, o), this.addLayer(o)) : this;
			},
			resetStyle: function(e) {
				return e === void 0 ? this.eachLayer(this.resetStyle, this) : (e.options = n({}, e.defaultOptions), this._setLayerStyle(e, this.options.style), this);
			},
			setStyle: function(e) {
				return this.eachLayer(function(t) {
					this._setLayerStyle(t, e);
				}, this);
			},
			_setLayerStyle: function(e, t) {
				e.setStyle && (typeof t == "function" && (t = t(e.feature)), e.setStyle(t));
			}
		});
		function fr(e, t) {
			var n = e.type === "Feature" ? e.geometry : e, r = n ? n.coordinates : null, i = [], a = t && t.pointToLayer, o = t && t.coordsToLatLng || mr, s, c, l, u;
			if (!r && !n) return null;
			switch (n.type) {
				case "Point": return s = o(r), pr(a, e, s, t);
				case "MultiPoint":
					for (l = 0, u = r.length; l < u; l++) s = o(r[l]), i.push(pr(a, e, s, t));
					return new Jn(i);
				case "LineString":
				case "MultiLineString": return c = hr(r, n.type === "LineString" ? 0 : 1, o), new sr(c, t);
				case "Polygon":
				case "MultiPolygon": return c = hr(r, n.type === "Polygon" ? 1 : 2, o), new lr(c, t);
				case "GeometryCollection":
					for (l = 0, u = n.geometries.length; l < u; l++) {
						var d = fr({
							geometry: n.geometries[l],
							type: "Feature",
							properties: e.properties
						}, t);
						d && i.push(d);
					}
					return new Jn(i);
				case "FeatureCollection":
					for (l = 0, u = n.features.length; l < u; l++) {
						var f = fr(n.features[l], t);
						f && i.push(f);
					}
					return new Jn(i);
				default: throw Error("Invalid GeoJSON object.");
			}
		}
		function pr(e, t, n, r) {
			return e ? e(t, n) : new er(n, r && r.markersInheritOptions && r);
		}
		function mr(e) {
			return new N(e[1], e[0], e[2]);
		}
		function hr(e, t, n) {
			for (var r = [], i = 0, a = e.length, o; i < a; i++) o = t ? hr(e[i], t - 1, n) : (n || mr)(e[i]), r.push(o);
			return r;
		}
		function gr(e, t) {
			return e = P(e), e.alt === void 0 ? [u(e.lng, t), u(e.lat, t)] : [
				u(e.lng, t),
				u(e.lat, t),
				u(e.alt, t)
			];
		}
		function _r(e, t, n, r) {
			for (var i = [], a = 0, o = e.length; a < o; a++) i.push(t ? _r(e[a], Fn(e[a]) ? 0 : t - 1, n, r) : gr(e[a], r));
			return !t && n && i.length > 0 && i.push(i[0].slice()), i;
		}
		function vr(e, t) {
			return e.feature ? n({}, e.feature, { geometry: t }) : yr(t);
		}
		function yr(e) {
			return e.type === "Feature" || e.type === "FeatureCollection" ? e : {
				type: "Feature",
				properties: {},
				geometry: e
			};
		}
		var br = { toGeoJSON: function(e) {
			return vr(this, {
				type: "Point",
				coordinates: gr(this.getLatLng(), e)
			});
		} };
		er.include(br), ar.include(br), rr.include(br), sr.include({ toGeoJSON: function(e) {
			var t = !Fn(this._latlngs), n = _r(this._latlngs, +!!t, !1, e);
			return vr(this, {
				type: (t ? "Multi" : "") + "LineString",
				coordinates: n
			});
		} }), lr.include({ toGeoJSON: function(e) {
			var t = !Fn(this._latlngs), n = t && !Fn(this._latlngs[0]), r = _r(this._latlngs, n ? 2 : +!!t, !0, e);
			return t || (r = [r]), vr(this, {
				type: (n ? "Multi" : "") + "Polygon",
				coordinates: r
			});
		} }), Kn.include({
			toMultiPoint: function(e) {
				var t = [];
				return this.eachLayer(function(n) {
					t.push(n.toGeoJSON(e).geometry.coordinates);
				}), vr(this, {
					type: "MultiPoint",
					coordinates: t
				});
			},
			toGeoJSON: function(e) {
				var t = this.feature && this.feature.geometry && this.feature.geometry.type;
				if (t === "MultiPoint") return this.toMultiPoint(e);
				var n = t === "GeometryCollection", r = [];
				return this.eachLayer(function(t) {
					if (t.toGeoJSON) {
						var i = t.toGeoJSON(e);
						if (n) r.push(i.geometry);
						else {
							var a = yr(i);
							a.type === "FeatureCollection" ? r.push.apply(r, a.features) : r.push(a);
						}
					}
				}), n ? vr(this, {
					geometries: r,
					type: "GeometryCollection"
				}) : {
					type: "FeatureCollection",
					features: r
				};
			}
		});
		function xr(e, t) {
			return new dr(e, t);
		}
		var Sr = xr, Cr = Gn.extend({
			options: {
				opacity: 1,
				alt: "",
				interactive: !1,
				crossOrigin: !1,
				errorOverlayUrl: "",
				zIndex: 1,
				className: ""
			},
			initialize: function(e, t, n) {
				this._url = e, this._bounds = M(t), p(this, n);
			},
			onAdd: function() {
				this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (J(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
			},
			onRemove: function() {
				q(this._image), this.options.interactive && this.removeInteractiveTarget(this._image);
			},
			setOpacity: function(e) {
				return this.options.opacity = e, this._image && this._updateOpacity(), this;
			},
			setStyle: function(e) {
				return e.opacity && this.setOpacity(e.opacity), this;
			},
			bringToFront: function() {
				return this._map && _t(this._image), this;
			},
			bringToBack: function() {
				return this._map && vt(this._image), this;
			},
			setUrl: function(e) {
				return this._url = e, this._image && (this._image.src = e), this;
			},
			setBounds: function(e) {
				return this._bounds = M(e), this._map && this._reset(), this;
			},
			getEvents: function() {
				var e = {
					zoom: this._reset,
					viewreset: this._reset
				};
				return this._zoomAnimated && (e.zoomanim = this._animateZoom), e;
			},
			setZIndex: function(e) {
				return this.options.zIndex = e, this._updateZIndex(), this;
			},
			getBounds: function() {
				return this._bounds;
			},
			getElement: function() {
				return this._image;
			},
			_initImage: function() {
				var e = this._url.tagName === "IMG", t = this._image = e ? this._url : K("img");
				J(t, "leaflet-image-layer"), this._zoomAnimated && J(t, "leaflet-zoom-animated"), this.options.className && J(t, this.options.className), t.onselectstart = l, t.onmousemove = l, t.onload = i(this.fire, this, "load"), t.onerror = i(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (t.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), e ? this._url = t.src : (t.src = this._url, t.alt = this.options.alt);
			},
			_animateZoom: function(e) {
				var t = this._map.getZoomScale(e.zoom), n = this._map._latLngBoundsToNewLayerBounds(this._bounds, e.zoom, e.center).min;
				Et(this._image, n, t);
			},
			_reset: function() {
				var e = this._image, t = new A(this._map.latLngToLayerPoint(this._bounds.getNorthWest()), this._map.latLngToLayerPoint(this._bounds.getSouthEast())), n = t.getSize();
				Dt(e, t.min), e.style.width = n.x + "px", e.style.height = n.y + "px";
			},
			_updateOpacity: function() {
				Ct(this._image, this.options.opacity);
			},
			_updateZIndex: function() {
				this._image && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._image.style.zIndex = this.options.zIndex);
			},
			_overlayOnError: function() {
				this.fire("error");
				var e = this.options.errorOverlayUrl;
				e && this._url !== e && (this._url = e, this._image.src = e);
			},
			getCenter: function() {
				return this._bounds.getCenter();
			}
		}), wr = function(e, t, n) {
			return new Cr(e, t, n);
		}, Tr = Cr.extend({
			options: {
				autoplay: !0,
				loop: !0,
				keepAspectRatio: !0,
				muted: !1,
				playsInline: !0
			},
			_initImage: function() {
				var e = this._url.tagName === "VIDEO", t = this._image = e ? this._url : K("video");
				if (J(t, "leaflet-image-layer"), this._zoomAnimated && J(t, "leaflet-zoom-animated"), this.options.className && J(t, this.options.className), t.onselectstart = l, t.onmousemove = l, t.onloadeddata = i(this.fire, this, "load"), e) {
					for (var n = t.getElementsByTagName("source"), r = [], a = 0; a < n.length; a++) r.push(n[a].src);
					this._url = n.length > 0 ? r : [t.src];
				} else {
					_(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(t.style, "objectFit") && (t.style.objectFit = "fill"), t.autoplay = !!this.options.autoplay, t.loop = !!this.options.loop, t.muted = !!this.options.muted, t.playsInline = !!this.options.playsInline;
					for (var o = 0; o < this._url.length; o++) {
						var s = K("source");
						s.src = this._url[o], t.appendChild(s);
					}
				}
			}
		});
		function Er(e, t, n) {
			return new Tr(e, t, n);
		}
		var Dr = Cr.extend({ _initImage: function() {
			var e = this._image = this._url;
			J(e, "leaflet-image-layer"), this._zoomAnimated && J(e, "leaflet-zoom-animated"), this.options.className && J(e, this.options.className), e.onselectstart = l, e.onmousemove = l;
		} });
		function Or(e, t, n) {
			return new Dr(e, t, n);
		}
		var kr = Gn.extend({
			options: {
				interactive: !1,
				offset: [0, 0],
				className: "",
				pane: void 0,
				content: ""
			},
			initialize: function(e, t) {
				e && (e instanceof N || _(e)) ? (this._latlng = P(e), p(this, t)) : (p(this, e), this._source = t), this.options.content && (this._content = this.options.content);
			},
			openOn: function(e) {
				return e = arguments.length ? e : this._source._map, e.hasLayer(this) || e.addLayer(this), this;
			},
			close: function() {
				return this._map && this._map.removeLayer(this), this;
			},
			toggle: function(e) {
				return this._map ? this.close() : (arguments.length ? this._source = e : e = this._source, this._prepareOpen(), this.openOn(e._map)), this;
			},
			onAdd: function(e) {
				this._zoomAnimated = e._zoomAnimated, this._container || this._initLayout(), e._fadeAnimated && Ct(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), e._fadeAnimated && Ct(this._container, 1), this.bringToFront(), this.options.interactive && (J(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
			},
			onRemove: function(e) {
				e._fadeAnimated ? (Ct(this._container, 0), this._removeTimeout = setTimeout(i(q, void 0, this._container), 200)) : q(this._container), this.options.interactive && (bt(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
			},
			getLatLng: function() {
				return this._latlng;
			},
			setLatLng: function(e) {
				return this._latlng = P(e), this._map && (this._updatePosition(), this._adjustPan()), this;
			},
			getContent: function() {
				return this._content;
			},
			setContent: function(e) {
				return this._content = e, this.update(), this;
			},
			getElement: function() {
				return this._container;
			},
			update: function() {
				this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan());
			},
			getEvents: function() {
				var e = {
					zoom: this._updatePosition,
					viewreset: this._updatePosition
				};
				return this._zoomAnimated && (e.zoomanim = this._animateZoom), e;
			},
			isOpen: function() {
				return !!this._map && this._map.hasLayer(this);
			},
			bringToFront: function() {
				return this._map && _t(this._container), this;
			},
			bringToBack: function() {
				return this._map && vt(this._container), this;
			},
			_prepareOpen: function(e) {
				var t = this._source;
				if (!t._map) return !1;
				if (t instanceof Jn) {
					t = null;
					var n = this._source._layers;
					for (var r in n) if (n[r]._map) {
						t = n[r];
						break;
					}
					if (!t) return !1;
					this._source = t;
				}
				if (!e) {
					if (t.getCenter) e = t.getCenter();
					else if (t.getLatLng) e = t.getLatLng();
					else if (t.getBounds) e = t.getBounds().getCenter();
					else throw Error("Unable to get source layer LatLng.");
				}
				return this.setLatLng(e), this._map && this.update(), !0;
			},
			_updateContent: function() {
				if (this._content) {
					var e = this._contentNode, t = typeof this._content == "function" ? this._content(this._source || this) : this._content;
					if (typeof t == "string") e.innerHTML = t;
					else {
						for (; e.hasChildNodes();) e.removeChild(e.firstChild);
						e.appendChild(t);
					}
					this.fire("contentupdate");
				}
			},
			_updatePosition: function() {
				if (this._map) {
					var e = this._map.latLngToLayerPoint(this._latlng), t = k(this.options.offset), n = this._getAnchor();
					this._zoomAnimated ? Dt(this._container, e.add(n)) : t = t.add(e).add(n);
					var r = this._containerBottom = -t.y, i = this._containerLeft = -Math.round(this._containerWidth / 2) + t.x;
					this._container.style.bottom = r + "px", this._container.style.left = i + "px";
				}
			},
			_getAnchor: function() {
				return [0, 0];
			}
		});
		Q.include({ _initOverlay: function(e, t, n, r) {
			var i = t;
			return i instanceof e || (i = new e(r).setContent(t)), n && i.setLatLng(n), i;
		} }), Gn.include({ _initOverlay: function(e, t, n, r) {
			var i = n;
			return i instanceof e ? (p(i, r), i._source = this) : (i = t && !r ? t : new e(r, this), i.setContent(n)), i;
		} });
		var Ar = kr.extend({
			options: {
				pane: "popupPane",
				offset: [0, 7],
				maxWidth: 300,
				minWidth: 50,
				maxHeight: null,
				autoPan: !0,
				autoPanPaddingTopLeft: null,
				autoPanPaddingBottomRight: null,
				autoPanPadding: [5, 5],
				keepInView: !1,
				closeButton: !0,
				autoClose: !0,
				closeOnEscapeKey: !0,
				className: ""
			},
			openOn: function(e) {
				return e = arguments.length ? e : this._source._map, !e.hasLayer(this) && e._popup && e._popup.options.autoClose && e.removeLayer(e._popup), e._popup = this, kr.prototype.openOn.call(this, e);
			},
			onAdd: function(e) {
				kr.prototype.onAdd.call(this, e), e.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof nr || this._source.on("preclick", Kt));
			},
			onRemove: function(e) {
				kr.prototype.onRemove.call(this, e), e.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof nr || this._source.off("preclick", Kt));
			},
			getEvents: function() {
				var e = kr.prototype.getEvents.call(this);
				return (this.options.closeOnClick === void 0 ? this._map.options.closePopupOnClick : this.options.closeOnClick) && (e.preclick = this.close), this.options.keepInView && (e.moveend = this._adjustPan), e;
			},
			_initLayout: function() {
				var e = "leaflet-popup", t = this._container = K("div", e + " " + (this.options.className || "") + " leaflet-zoom-animated"), n = this._wrapper = K("div", e + "-content-wrapper", t);
				if (this._contentNode = K("div", e + "-content", n), Jt(t), qt(this._contentNode), X(t, "contextmenu", Kt), this._tipContainer = K("div", e + "-tip-container", t), this._tip = K("div", e + "-tip", this._tipContainer), this.options.closeButton) {
					var r = this._closeButton = K("a", e + "-close-button", t);
					r.setAttribute("role", "button"), r.setAttribute("aria-label", "Close popup"), r.href = "#close", r.innerHTML = "<span aria-hidden=\"true\">&#215;</span>", X(r, "click", function(e) {
						Yt(e), this.close();
					}, this);
				}
			},
			_updateLayout: function() {
				var e = this._contentNode, t = e.style;
				t.width = "", t.whiteSpace = "nowrap";
				var n = e.offsetWidth;
				n = Math.min(n, this.options.maxWidth), n = Math.max(n, this.options.minWidth), t.width = n + 1 + "px", t.whiteSpace = "", t.height = "";
				var r = e.offsetHeight, i = this.options.maxHeight, a = "leaflet-popup-scrolled";
				i && r > i ? (t.height = i + "px", J(e, a)) : bt(e, a), this._containerWidth = this._container.offsetWidth;
			},
			_animateZoom: function(e) {
				var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center), n = this._getAnchor();
				Dt(this._container, t.add(n));
			},
			_adjustPan: function() {
				if (this.options.autoPan) {
					if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning) this._autopanning = !1;
					else {
						var e = this._map, t = parseInt(ht(this._container, "marginBottom"), 10) || 0, n = this._container.offsetHeight + t, r = this._containerWidth, i = new O(this._containerLeft, -n - this._containerBottom);
						i._add(Ot(this._container));
						var a = e.layerPointToContainerPoint(i), o = k(this.options.autoPanPadding), s = k(this.options.autoPanPaddingTopLeft || o), c = k(this.options.autoPanPaddingBottomRight || o), l = e.getSize(), u = 0, d = 0;
						a.x + r + c.x > l.x && (u = a.x + r - l.x + c.x), a.x - u - s.x < 0 && (u = a.x - s.x), a.y + n + c.y > l.y && (d = a.y + n - l.y + c.y), a.y - d - s.y < 0 && (d = a.y - s.y), (u || d) && (this.options.keepInView && (this._autopanning = !0), e.fire("autopanstart").panBy([u, d]));
					}
				}
			},
			_getAnchor: function() {
				return k(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
			}
		}), jr = function(e, t) {
			return new Ar(e, t);
		};
		Q.mergeOptions({ closePopupOnClick: !0 }), Q.include({
			openPopup: function(e, t, n) {
				return this._initOverlay(Ar, e, t, n).openOn(this), this;
			},
			closePopup: function(e) {
				return e = arguments.length ? e : this._popup, e && e.close(), this;
			}
		}), Gn.include({
			bindPopup: function(e, t) {
				return this._popup = this._initOverlay(Ar, this._popup, e, t), this._popupHandlersAdded ||= (this.on({
					click: this._openPopup,
					keypress: this._onKeyPress,
					remove: this.closePopup,
					move: this._movePopup
				}), !0), this;
			},
			unbindPopup: function() {
				return this._popup &&= (this.off({
					click: this._openPopup,
					keypress: this._onKeyPress,
					remove: this.closePopup,
					move: this._movePopup
				}), this._popupHandlersAdded = !1, null), this;
			},
			openPopup: function(e) {
				return this._popup && (this instanceof Jn || (this._popup._source = this), this._popup._prepareOpen(e || this._latlng) && this._popup.openOn(this._map)), this;
			},
			closePopup: function() {
				return this._popup && this._popup.close(), this;
			},
			togglePopup: function() {
				return this._popup && this._popup.toggle(this), this;
			},
			isPopupOpen: function() {
				return this._popup ? this._popup.isOpen() : !1;
			},
			setPopupContent: function(e) {
				return this._popup && this._popup.setContent(e), this;
			},
			getPopup: function() {
				return this._popup;
			},
			_openPopup: function(e) {
				if (this._popup && this._map) {
					Xt(e);
					var t = e.layer || e.target;
					this._popup._source === t && !(t instanceof nr) ? this._map.hasLayer(this._popup) ? this.closePopup() : this.openPopup(e.latlng) : (this._popup._source = t, this.openPopup(e.latlng));
				}
			},
			_movePopup: function(e) {
				this._popup.setLatLng(e.latlng);
			},
			_onKeyPress: function(e) {
				e.originalEvent.keyCode === 13 && this._openPopup(e);
			}
		});
		var Mr = kr.extend({
			options: {
				pane: "tooltipPane",
				offset: [0, 0],
				direction: "auto",
				permanent: !1,
				sticky: !1,
				opacity: .9
			},
			onAdd: function(e) {
				kr.prototype.onAdd.call(this, e), this.setOpacity(this.options.opacity), e.fire("tooltipopen", { tooltip: this }), this._source && (this.addEventParent(this._source), this._source.fire("tooltipopen", { tooltip: this }, !0));
			},
			onRemove: function(e) {
				kr.prototype.onRemove.call(this, e), e.fire("tooltipclose", { tooltip: this }), this._source && (this.removeEventParent(this._source), this._source.fire("tooltipclose", { tooltip: this }, !0));
			},
			getEvents: function() {
				var e = kr.prototype.getEvents.call(this);
				return this.options.permanent || (e.preclick = this.close), e;
			},
			_initLayout: function() {
				var e = "leaflet-tooltip " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
				this._contentNode = this._container = K("div", e), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + o(this));
			},
			_updateLayout: function() {},
			_adjustPan: function() {},
			_setPosition: function(e) {
				var t, n, r = this._map, i = this._container, a = r.latLngToContainerPoint(r.getCenter()), o = r.layerPointToContainerPoint(e), s = this.options.direction, c = i.offsetWidth, l = i.offsetHeight, u = k(this.options.offset), d = this._getAnchor();
				s === "top" ? (t = c / 2, n = l) : s === "bottom" ? (t = c / 2, n = 0) : s === "center" ? (t = c / 2, n = l / 2) : s === "right" ? (t = 0, n = l / 2) : s === "left" ? (t = c, n = l / 2) : o.x < a.x ? (s = "right", t = 0, n = l / 2) : (s = "left", t = c + (u.x + d.x) * 2, n = l / 2), e = e.subtract(k(t, n, !0)).add(u).add(d), bt(i, "leaflet-tooltip-right"), bt(i, "leaflet-tooltip-left"), bt(i, "leaflet-tooltip-top"), bt(i, "leaflet-tooltip-bottom"), J(i, "leaflet-tooltip-" + s), Dt(i, e);
			},
			_updatePosition: function() {
				var e = this._map.latLngToLayerPoint(this._latlng);
				this._setPosition(e);
			},
			setOpacity: function(e) {
				this.options.opacity = e, this._container && Ct(this._container, e);
			},
			_animateZoom: function(e) {
				var t = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
				this._setPosition(t);
			},
			_getAnchor: function() {
				return k(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
			}
		}), Nr = function(e, t) {
			return new Mr(e, t);
		};
		Q.include({
			openTooltip: function(e, t, n) {
				return this._initOverlay(Mr, e, t, n).openOn(this), this;
			},
			closeTooltip: function(e) {
				return e.close(), this;
			}
		}), Gn.include({
			bindTooltip: function(e, t) {
				return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(Mr, this._tooltip, e, t), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
			},
			unbindTooltip: function() {
				return this._tooltip &&= (this._initTooltipInteractions(!0), this.closeTooltip(), null), this;
			},
			_initTooltipInteractions: function(e) {
				if (e || !this._tooltipHandlersAdded) {
					var t = e ? "off" : "on", n = {
						remove: this.closeTooltip,
						move: this._moveTooltip
					};
					this._tooltip.options.permanent ? n.add = this._openTooltip : (n.mouseover = this._openTooltip, n.mouseout = this.closeTooltip, n.click = this._openTooltip, this._map ? this._addFocusListeners() : n.add = this._addFocusListeners), this._tooltip.options.sticky && (n.mousemove = this._moveTooltip), this[t](n), this._tooltipHandlersAdded = !e;
				}
			},
			openTooltip: function(e) {
				return this._tooltip && (this instanceof Jn || (this._tooltip._source = this), this._tooltip._prepareOpen(e) && (this._tooltip.openOn(this._map), this.getElement ? this._setAriaDescribedByOnLayer(this) : this.eachLayer && this.eachLayer(this._setAriaDescribedByOnLayer, this))), this;
			},
			closeTooltip: function() {
				if (this._tooltip) return this._tooltip.close();
			},
			toggleTooltip: function() {
				return this._tooltip && this._tooltip.toggle(this), this;
			},
			isTooltipOpen: function() {
				return this._tooltip.isOpen();
			},
			setTooltipContent: function(e) {
				return this._tooltip && this._tooltip.setContent(e), this;
			},
			getTooltip: function() {
				return this._tooltip;
			},
			_addFocusListeners: function() {
				this.getElement ? this._addFocusListenersOnLayer(this) : this.eachLayer && this.eachLayer(this._addFocusListenersOnLayer, this);
			},
			_addFocusListenersOnLayer: function(e) {
				var t = typeof e.getElement == "function" && e.getElement();
				t && (X(t, "focus", function() {
					this._tooltip._source = e, this.openTooltip();
				}, this), X(t, "blur", this.closeTooltip, this));
			},
			_setAriaDescribedByOnLayer: function(e) {
				var t = typeof e.getElement == "function" && e.getElement();
				t && t.setAttribute("aria-describedby", this._tooltip._container.id);
			},
			_openTooltip: function(e) {
				if (this._tooltip && this._map) {
					if (this._map.dragging && this._map.dragging.moving() && !this._openOnceFlag) {
						this._openOnceFlag = !0;
						var t = this;
						this._map.once("moveend", function() {
							t._openOnceFlag = !1, t._openTooltip(e);
						});
					} else this._tooltip._source = e.layer || e.target, this.openTooltip(this._tooltip.options.sticky ? e.latlng : void 0);
				}
			},
			_moveTooltip: function(e) {
				var t = e.latlng, n, r;
				this._tooltip.options.sticky && e.originalEvent && (n = this._map.mouseEventToContainerPoint(e.originalEvent), r = this._map.containerPointToLayerPoint(n), t = this._map.layerPointToLatLng(r)), this._tooltip.setLatLng(t);
			}
		});
		var Pr = Xn.extend({
			options: {
				iconSize: [12, 12],
				html: !1,
				bgPos: null,
				className: "leaflet-div-icon"
			},
			createIcon: function(e) {
				var t = e && e.tagName === "DIV" ? e : document.createElement("div"), n = this.options;
				if (n.html instanceof Element ? (gt(t), t.appendChild(n.html)) : t.innerHTML = n.html === !1 ? "" : n.html, n.bgPos) {
					var r = k(n.bgPos);
					t.style.backgroundPosition = -r.x + "px " + -r.y + "px";
				}
				return this._setIconStyles(t, "icon"), t;
			},
			createShadow: function() {
				return null;
			}
		});
		function Fr(e) {
			return new Pr(e);
		}
		Xn.Default = Qn;
		var Ir = Gn.extend({
			options: {
				tileSize: 256,
				opacity: 1,
				updateWhenIdle: G.mobile,
				updateWhenZooming: !0,
				updateInterval: 200,
				zIndex: 1,
				bounds: null,
				minZoom: 0,
				maxZoom: void 0,
				maxNativeZoom: void 0,
				minNativeZoom: void 0,
				noWrap: !1,
				pane: "tilePane",
				className: "",
				keepBuffer: 2
			},
			initialize: function(e) {
				p(this, e);
			},
			onAdd: function() {
				this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView();
			},
			beforeAdd: function(e) {
				e._addZoomLimit(this);
			},
			onRemove: function(e) {
				this._removeAllTiles(), q(this._container), e._removeZoomLimit(this), this._container = null, this._tileZoom = void 0;
			},
			bringToFront: function() {
				return this._map && (_t(this._container), this._setAutoZIndex(Math.max)), this;
			},
			bringToBack: function() {
				return this._map && (vt(this._container), this._setAutoZIndex(Math.min)), this;
			},
			getContainer: function() {
				return this._container;
			},
			setOpacity: function(e) {
				return this.options.opacity = e, this._updateOpacity(), this;
			},
			setZIndex: function(e) {
				return this.options.zIndex = e, this._updateZIndex(), this;
			},
			isLoading: function() {
				return this._loading;
			},
			redraw: function() {
				if (this._map) {
					this._removeAllTiles();
					var e = this._clampZoom(this._map.getZoom());
					e !== this._tileZoom && (this._tileZoom = e, this._updateLevels()), this._update();
				}
				return this;
			},
			getEvents: function() {
				var e = {
					viewprereset: this._invalidateAll,
					viewreset: this._resetView,
					zoom: this._resetView,
					moveend: this._onMoveEnd
				};
				return this.options.updateWhenIdle || (this._onMove ||= s(this._onMoveEnd, this.options.updateInterval, this), e.move = this._onMove), this._zoomAnimated && (e.zoomanim = this._animateZoom), e;
			},
			createTile: function() {
				return document.createElement("div");
			},
			getTileSize: function() {
				var e = this.options.tileSize;
				return e instanceof O ? e : new O(e, e);
			},
			_updateZIndex: function() {
				this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._container.style.zIndex = this.options.zIndex);
			},
			_setAutoZIndex: function(e) {
				for (var t = this.getPane().children, n = -e(-Infinity, Infinity), r = 0, i = t.length, a; r < i; r++) a = t[r].style.zIndex, t[r] !== this._container && a && (n = e(n, +a));
				isFinite(n) && (this.options.zIndex = n + e(-1, 1), this._updateZIndex());
			},
			_updateOpacity: function() {
				if (this._map && !G.ielt9) {
					Ct(this._container, this.options.opacity);
					var e = +/* @__PURE__ */ new Date(), t = !1, n = !1;
					for (var r in this._tiles) {
						var i = this._tiles[r];
						if (i.current && i.loaded) {
							var a = Math.min(1, (e - i.loaded) / 200);
							Ct(i.el, a), a < 1 ? t = !0 : (i.active ? n = !0 : this._onOpaqueTile(i), i.active = !0);
						}
					}
					n && !this._noPrune && this._pruneTiles(), t && (E(this._fadeFrame), this._fadeFrame = T(this._updateOpacity, this));
				}
			},
			_onOpaqueTile: l,
			_initContainer: function() {
				this._container || (this._container = K("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
			},
			_updateLevels: function() {
				var e = this._tileZoom, t = this.options.maxZoom;
				if (e !== void 0) {
					for (var n in this._levels) n = Number(n), this._levels[n].el.children.length || n === e ? (this._levels[n].el.style.zIndex = t - Math.abs(e - n), this._onUpdateLevel(n)) : (q(this._levels[n].el), this._removeTilesAtZoom(n), this._onRemoveLevel(n), delete this._levels[n]);
					var r = this._levels[e], i = this._map;
					return r || (r = this._levels[e] = {}, r.el = K("div", "leaflet-tile-container leaflet-zoom-animated", this._container), r.el.style.zIndex = t, r.origin = i.project(i.unproject(i.getPixelOrigin()), e).round(), r.zoom = e, this._setZoomTransform(r, i.getCenter(), i.getZoom()), r.el.offsetWidth, this._onCreateLevel(r)), this._level = r, r;
				}
			},
			_onUpdateLevel: l,
			_onRemoveLevel: l,
			_onCreateLevel: l,
			_pruneTiles: function() {
				if (this._map) {
					var e, t, n = this._map.getZoom();
					if (n > this.options.maxZoom || n < this.options.minZoom) this._removeAllTiles();
					else {
						for (e in this._tiles) t = this._tiles[e], t.retain = t.current;
						for (e in this._tiles) if (t = this._tiles[e], t.current && !t.active) {
							var r = t.coords;
							this._retainParent(r.x, r.y, r.z, r.z - 5) || this._retainChildren(r.x, r.y, r.z, r.z + 2);
						}
						for (e in this._tiles) this._tiles[e].retain || this._removeTile(e);
					}
				}
			},
			_removeTilesAtZoom: function(e) {
				for (var t in this._tiles) this._tiles[t].coords.z === e && this._removeTile(t);
			},
			_removeAllTiles: function() {
				for (var e in this._tiles) this._removeTile(e);
			},
			_invalidateAll: function() {
				for (var e in this._levels) q(this._levels[e].el), this._onRemoveLevel(Number(e)), delete this._levels[e];
				this._removeAllTiles(), this._tileZoom = void 0;
			},
			_retainParent: function(e, t, n, r) {
				var i = Math.floor(e / 2), a = Math.floor(t / 2), o = n - 1, s = new O(+i, +a);
				s.z = +o;
				var c = this._tileCoordsToKey(s), l = this._tiles[c];
				return l && l.active ? (l.retain = !0, !0) : (l && l.loaded && (l.retain = !0), o > r && this._retainParent(i, a, o, r));
			},
			_retainChildren: function(e, t, n, r) {
				for (var i = 2 * e; i < 2 * e + 2; i++) for (var a = 2 * t; a < 2 * t + 2; a++) {
					var o = new O(i, a);
					o.z = n + 1;
					var s = this._tileCoordsToKey(o), c = this._tiles[s];
					c && c.active ? c.retain = !0 : (c && c.loaded && (c.retain = !0), n + 1 < r && this._retainChildren(i, a, n + 1, r));
				}
			},
			_resetView: function(e) {
				var t = e && (e.pinch || e.flyTo);
				this._setView(this._map.getCenter(), this._map.getZoom(), t, t);
			},
			_animateZoom: function(e) {
				this._setView(e.center, e.zoom, !0, e.noUpdate);
			},
			_clampZoom: function(e) {
				var t = this.options;
				return t.minNativeZoom !== void 0 && e < t.minNativeZoom ? t.minNativeZoom : t.maxNativeZoom !== void 0 && t.maxNativeZoom < e ? t.maxNativeZoom : e;
			},
			_setView: function(e, t, n, r) {
				var i = Math.round(t);
				i = this.options.maxZoom !== void 0 && i > this.options.maxZoom || this.options.minZoom !== void 0 && i < this.options.minZoom ? void 0 : this._clampZoom(i);
				var a = this.options.updateWhenZooming && i !== this._tileZoom;
				(!r || a) && (this._tileZoom = i, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), i !== void 0 && this._update(e), n || this._pruneTiles(), this._noPrune = !!n), this._setZoomTransforms(e, t);
			},
			_setZoomTransforms: function(e, t) {
				for (var n in this._levels) this._setZoomTransform(this._levels[n], e, t);
			},
			_setZoomTransform: function(e, t, n) {
				var r = this._map.getZoomScale(n, e.zoom), i = e.origin.multiplyBy(r).subtract(this._map._getNewPixelOrigin(t, n)).round();
				G.any3d ? Et(e.el, i, r) : Dt(e.el, i);
			},
			_resetGrid: function() {
				var e = this._map, t = e.options.crs, n = this._tileSize = this.getTileSize(), r = this._tileZoom, i = this._map.getPixelWorldBounds(this._tileZoom);
				i && (this._globalTileRange = this._pxBoundsToTileRange(i)), this._wrapX = t.wrapLng && !this.options.noWrap && [Math.floor(e.project([0, t.wrapLng[0]], r).x / n.x), Math.ceil(e.project([0, t.wrapLng[1]], r).x / n.y)], this._wrapY = t.wrapLat && !this.options.noWrap && [Math.floor(e.project([t.wrapLat[0], 0], r).y / n.x), Math.ceil(e.project([t.wrapLat[1], 0], r).y / n.y)];
			},
			_onMoveEnd: function() {
				this._map && !this._map._animatingZoom && this._update();
			},
			_getTiledPixelBounds: function(e) {
				var t = this._map, n = t._animatingZoom ? Math.max(t._animateToZoom, t.getZoom()) : t.getZoom(), r = t.getZoomScale(n, this._tileZoom), i = t.project(e, this._tileZoom).floor(), a = t.getSize().divideBy(r * 2);
				return new A(i.subtract(a), i.add(a));
			},
			_update: function(e) {
				var t = this._map;
				if (t) {
					var n = this._clampZoom(t.getZoom());
					if (e === void 0 && (e = t.getCenter()), this._tileZoom !== void 0) {
						var r = this._getTiledPixelBounds(e), i = this._pxBoundsToTileRange(r), a = i.getCenter(), o = [], s = this.options.keepBuffer, c = new A(i.getBottomLeft().subtract([s, -s]), i.getTopRight().add([s, -s]));
						if (!(isFinite(i.min.x) && isFinite(i.min.y) && isFinite(i.max.x) && isFinite(i.max.y))) throw Error("Attempted to load an infinite number of tiles");
						for (var l in this._tiles) {
							var u = this._tiles[l].coords;
							u.z === this._tileZoom && c.contains(new O(u.x, u.y)) || (this._tiles[l].current = !1);
						}
						if (Math.abs(n - this._tileZoom) > 1) this._setView(e, n);
						else {
							for (var d = i.min.y; d <= i.max.y; d++) for (var f = i.min.x; f <= i.max.x; f++) {
								var p = new O(f, d);
								if (p.z = this._tileZoom, this._isValidTile(p)) {
									var m = this._tiles[this._tileCoordsToKey(p)];
									m ? m.current = !0 : o.push(p);
								}
							}
							if (o.sort(function(e, t) {
								return e.distanceTo(a) - t.distanceTo(a);
							}), o.length !== 0) {
								this._loading || (this._loading = !0, this.fire("loading"));
								var h = document.createDocumentFragment();
								for (f = 0; f < o.length; f++) this._addTile(o[f], h);
								this._level.el.appendChild(h);
							}
						}
					}
				}
			},
			_isValidTile: function(e) {
				var t = this._map.options.crs;
				if (!t.infinite) {
					var n = this._globalTileRange;
					if (!t.wrapLng && (e.x < n.min.x || e.x > n.max.x) || !t.wrapLat && (e.y < n.min.y || e.y > n.max.y)) return !1;
				}
				if (!this.options.bounds) return !0;
				var r = this._tileCoordsToBounds(e);
				return M(this.options.bounds).overlaps(r);
			},
			_keyToBounds: function(e) {
				return this._tileCoordsToBounds(this._keyToTileCoords(e));
			},
			_tileCoordsToNwSe: function(e) {
				var t = this._map, n = this.getTileSize(), r = e.scaleBy(n), i = r.add(n);
				return [t.unproject(r, e.z), t.unproject(i, e.z)];
			},
			_tileCoordsToBounds: function(e) {
				var t = this._tileCoordsToNwSe(e), n = new j(t[0], t[1]);
				return this.options.noWrap || (n = this._map.wrapLatLngBounds(n)), n;
			},
			_tileCoordsToKey: function(e) {
				return e.x + ":" + e.y + ":" + e.z;
			},
			_keyToTileCoords: function(e) {
				var t = e.split(":"), n = new O(+t[0], +t[1]);
				return n.z = +t[2], n;
			},
			_removeTile: function(e) {
				var t = this._tiles[e];
				t && (q(t.el), delete this._tiles[e], this.fire("tileunload", {
					tile: t.el,
					coords: this._keyToTileCoords(e)
				}));
			},
			_initTile: function(e) {
				J(e, "leaflet-tile");
				var t = this.getTileSize();
				e.style.width = t.x + "px", e.style.height = t.y + "px", e.onselectstart = l, e.onmousemove = l, G.ielt9 && this.options.opacity < 1 && Ct(e, this.options.opacity);
			},
			_addTile: function(e, t) {
				var n = this._getTilePos(e), r = this._tileCoordsToKey(e), a = this.createTile(this._wrapCoords(e), i(this._tileReady, this, e));
				this._initTile(a), this.createTile.length < 2 && T(i(this._tileReady, this, e, null, a)), Dt(a, n), this._tiles[r] = {
					el: a,
					coords: e,
					current: !0
				}, t.appendChild(a), this.fire("tileloadstart", {
					tile: a,
					coords: e
				});
			},
			_tileReady: function(e, t, n) {
				t && this.fire("tileerror", {
					error: t,
					tile: n,
					coords: e
				});
				var r = this._tileCoordsToKey(e);
				n = this._tiles[r], n && (n.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (Ct(n.el, 0), E(this._fadeFrame), this._fadeFrame = T(this._updateOpacity, this)) : (n.active = !0, this._pruneTiles()), t || (J(n.el, "leaflet-tile-loaded"), this.fire("tileload", {
					tile: n.el,
					coords: e
				})), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), G.ielt9 || !this._map._fadeAnimated ? T(this._pruneTiles, this) : setTimeout(i(this._pruneTiles, this), 250)));
			},
			_getTilePos: function(e) {
				return e.scaleBy(this.getTileSize()).subtract(this._level.origin);
			},
			_wrapCoords: function(e) {
				var t = new O(this._wrapX ? c(e.x, this._wrapX) : e.x, this._wrapY ? c(e.y, this._wrapY) : e.y);
				return t.z = e.z, t;
			},
			_pxBoundsToTileRange: function(e) {
				var t = this.getTileSize();
				return new A(e.min.unscaleBy(t).floor(), e.max.unscaleBy(t).ceil().subtract([1, 1]));
			},
			_noTilesToLoad: function() {
				for (var e in this._tiles) if (!this._tiles[e].loaded) return !1;
				return !0;
			}
		});
		function Lr(e) {
			return new Ir(e);
		}
		var Rr = Ir.extend({
			options: {
				minZoom: 0,
				maxZoom: 18,
				subdomains: "abc",
				errorTileUrl: "",
				zoomOffset: 0,
				tms: !1,
				zoomReverse: !1,
				detectRetina: !1,
				crossOrigin: !1,
				referrerPolicy: !1
			},
			initialize: function(e, t) {
				this._url = e, t = p(this, t), t.detectRetina && G.retina && t.maxZoom > 0 ? (t.tileSize = Math.floor(t.tileSize / 2), t.zoomReverse ? (t.zoomOffset--, t.minZoom = Math.min(t.maxZoom, t.minZoom + 1)) : (t.zoomOffset++, t.maxZoom = Math.max(t.minZoom, t.maxZoom - 1)), t.minZoom = Math.max(0, t.minZoom)) : t.zoomReverse ? t.minZoom = Math.min(t.maxZoom, t.minZoom) : t.maxZoom = Math.max(t.minZoom, t.maxZoom), typeof t.subdomains == "string" && (t.subdomains = t.subdomains.split("")), this.on("tileunload", this._onTileRemove);
			},
			setUrl: function(e, t) {
				return this._url === e && t === void 0 && (t = !0), this._url = e, t || this.redraw(), this;
			},
			createTile: function(e, t) {
				var n = document.createElement("img");
				return X(n, "load", i(this._tileOnLoad, this, t, n)), X(n, "error", i(this._tileOnError, this, t, n)), (this.options.crossOrigin || this.options.crossOrigin === "") && (n.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (n.referrerPolicy = this.options.referrerPolicy), n.alt = "", n.src = this.getTileUrl(e), n;
			},
			getTileUrl: function(e) {
				var t = {
					r: G.retina ? "@2x" : "",
					s: this._getSubdomain(e),
					x: e.x,
					y: e.y,
					z: this._getZoomForUrl()
				};
				if (this._map && !this._map.options.crs.infinite) {
					var r = this._globalTileRange.max.y - e.y;
					this.options.tms && (t.y = r), t["-y"] = r;
				}
				return g(this._url, n(t, this.options));
			},
			_tileOnLoad: function(e, t) {
				G.ielt9 ? setTimeout(i(e, this, null, t), 0) : e(null, t);
			},
			_tileOnError: function(e, t, n) {
				var r = this.options.errorTileUrl;
				r && t.getAttribute("src") !== r && (t.src = r), e(n, t);
			},
			_onTileRemove: function(e) {
				e.tile.onload = null;
			},
			_getZoomForUrl: function() {
				var e = this._tileZoom, t = this.options.maxZoom, n = this.options.zoomReverse, r = this.options.zoomOffset;
				return n && (e = t - e), e + r;
			},
			_getSubdomain: function(e) {
				var t = Math.abs(e.x + e.y) % this.options.subdomains.length;
				return this.options.subdomains[t];
			},
			_abortLoading: function() {
				var e, t;
				for (e in this._tiles) if (this._tiles[e].coords.z !== this._tileZoom && (t = this._tiles[e].el, t.onload = l, t.onerror = l, !t.complete)) {
					t.src = y;
					var n = this._tiles[e].coords;
					q(t), delete this._tiles[e], this.fire("tileabort", {
						tile: t,
						coords: n
					});
				}
			},
			_removeTile: function(e) {
				var t = this._tiles[e];
				if (t) return t.el.setAttribute("src", y), Ir.prototype._removeTile.call(this, e);
			},
			_tileReady: function(e, t, n) {
				if (!(!this._map || n && n.getAttribute("src") === y)) return Ir.prototype._tileReady.call(this, e, t, n);
			}
		});
		function zr(e, t) {
			return new Rr(e, t);
		}
		var Br = Rr.extend({
			defaultWmsParams: {
				service: "WMS",
				request: "GetMap",
				layers: "",
				styles: "",
				format: "image/jpeg",
				transparent: !1,
				version: "1.1.1"
			},
			options: {
				crs: null,
				uppercase: !1
			},
			initialize: function(e, t) {
				this._url = e;
				var r = n({}, this.defaultWmsParams);
				for (var i in t) i in this.options || (r[i] = t[i]);
				t = p(this, t);
				var a = t.detectRetina && G.retina ? 2 : 1, o = this.getTileSize();
				r.width = o.x * a, r.height = o.y * a, this.wmsParams = r;
			},
			onAdd: function(e) {
				this._crs = this.options.crs || e.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
				var t = this._wmsVersion >= 1.3 ? "crs" : "srs";
				this.wmsParams[t] = this._crs.code, Rr.prototype.onAdd.call(this, e);
			},
			getTileUrl: function(e) {
				var t = this._tileCoordsToNwSe(e), n = this._crs, r = ae(n.project(t[0]), n.project(t[1])), i = r.min, a = r.max, o = (this._wmsVersion >= 1.3 && this._crs === Un ? [
					i.y,
					i.x,
					a.y,
					a.x
				] : [
					i.x,
					i.y,
					a.x,
					a.y
				]).join(","), s = Rr.prototype.getTileUrl.call(this, e);
				return s + m(this.wmsParams, s, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + o;
			},
			setParams: function(e, t) {
				return n(this.wmsParams, e), t || this.redraw(), this;
			}
		});
		function Vr(e, t) {
			return new Br(e, t);
		}
		Rr.WMS = Br, zr.wms = Vr;
		var Hr = Gn.extend({
			options: { padding: .1 },
			initialize: function(e) {
				p(this, e), o(this), this._layers = this._layers || {};
			},
			onAdd: function() {
				this._container || (this._initContainer(), J(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
			},
			onRemove: function() {
				this.off("update", this._updatePaths, this), this._destroyContainer();
			},
			getEvents: function() {
				var e = {
					viewreset: this._reset,
					zoom: this._onZoom,
					moveend: this._update,
					zoomend: this._onZoomEnd
				};
				return this._zoomAnimated && (e.zoomanim = this._onAnimZoom), e;
			},
			_onAnimZoom: function(e) {
				this._updateTransform(e.center, e.zoom);
			},
			_onZoom: function() {
				this._updateTransform(this._map.getCenter(), this._map.getZoom());
			},
			_updateTransform: function(e, t) {
				var n = this._map.getZoomScale(t, this._zoom), r = this._map.getSize().multiplyBy(.5 + this.options.padding), i = this._map.project(this._center, t), a = r.multiplyBy(-n).add(i).subtract(this._map._getNewPixelOrigin(e, t));
				G.any3d ? Et(this._container, a, n) : Dt(this._container, a);
			},
			_reset: function() {
				for (var e in this._update(), this._updateTransform(this._center, this._zoom), this._layers) this._layers[e]._reset();
			},
			_onZoomEnd: function() {
				for (var e in this._layers) this._layers[e]._project();
			},
			_updatePaths: function() {
				for (var e in this._layers) this._layers[e]._update();
			},
			_update: function() {
				var e = this.options.padding, t = this._map.getSize(), n = this._map.containerPointToLayerPoint(t.multiplyBy(-e)).round();
				this._bounds = new A(n, n.add(t.multiplyBy(1 + e * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
			}
		}), Ur = Hr.extend({
			options: { tolerance: 0 },
			getEvents: function() {
				var e = Hr.prototype.getEvents.call(this);
				return e.viewprereset = this._onViewPreReset, e;
			},
			_onViewPreReset: function() {
				this._postponeUpdatePaths = !0;
			},
			onAdd: function() {
				Hr.prototype.onAdd.call(this), this._draw();
			},
			_initContainer: function() {
				var e = this._container = document.createElement("canvas");
				X(e, "mousemove", this._onMouseMove, this), X(e, "click dblclick mousedown mouseup contextmenu", this._onClick, this), X(e, "mouseout", this._handleMouseOut, this), e._leaflet_disable_events = !0, this._ctx = e.getContext("2d");
			},
			_destroyContainer: function() {
				E(this._redrawRequest), delete this._ctx, q(this._container), Z(this._container), delete this._container;
			},
			_updatePaths: function() {
				if (!this._postponeUpdatePaths) {
					var e;
					for (var t in this._redrawBounds = null, this._layers) e = this._layers[t], e._update();
					this._redraw();
				}
			},
			_update: function() {
				if (!(this._map._animatingZoom && this._bounds)) {
					Hr.prototype._update.call(this);
					var e = this._bounds, t = this._container, n = e.getSize(), r = G.retina ? 2 : 1;
					Dt(t, e.min), t.width = r * n.x, t.height = r * n.y, t.style.width = n.x + "px", t.style.height = n.y + "px", G.retina && this._ctx.scale(2, 2), this._ctx.translate(-e.min.x, -e.min.y), this.fire("update");
				}
			},
			_reset: function() {
				Hr.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
			},
			_initPath: function(e) {
				this._updateDashArray(e), this._layers[o(e)] = e;
				var t = e._order = {
					layer: e,
					prev: this._drawLast,
					next: null
				};
				this._drawLast && (this._drawLast.next = t), this._drawLast = t, this._drawFirst = this._drawFirst || this._drawLast;
			},
			_addPath: function(e) {
				this._requestRedraw(e);
			},
			_removePath: function(e) {
				var t = e._order, n = t.next, r = t.prev;
				n ? n.prev = r : this._drawLast = r, r ? r.next = n : this._drawFirst = n, delete e._order, delete this._layers[o(e)], this._requestRedraw(e);
			},
			_updatePath: function(e) {
				this._extendRedrawBounds(e), e._project(), e._update(), this._requestRedraw(e);
			},
			_updateStyle: function(e) {
				this._updateDashArray(e), this._requestRedraw(e);
			},
			_updateDashArray: function(e) {
				if (typeof e.options.dashArray == "string") {
					for (var t = e.options.dashArray.split(/[, ]+/), n = [], r, i = 0; i < t.length; i++) {
						if (r = Number(t[i]), isNaN(r)) return;
						n.push(r);
					}
					e.options._dashArray = n;
				} else e.options._dashArray = e.options.dashArray;
			},
			_requestRedraw: function(e) {
				this._map && (this._extendRedrawBounds(e), this._redrawRequest = this._redrawRequest || T(this._redraw, this));
			},
			_extendRedrawBounds: function(e) {
				if (e._pxBounds) {
					var t = (e.options.weight || 0) + 1;
					this._redrawBounds = this._redrawBounds || new A(), this._redrawBounds.extend(e._pxBounds.min.subtract([t, t])), this._redrawBounds.extend(e._pxBounds.max.add([t, t]));
				}
			},
			_redraw: function() {
				this._redrawRequest = null, this._redrawBounds && (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()), this._clear(), this._draw(), this._redrawBounds = null;
			},
			_clear: function() {
				var e = this._redrawBounds;
				if (e) {
					var t = e.getSize();
					this._ctx.clearRect(e.min.x, e.min.y, t.x, t.y);
				} else this._ctx.save(), this._ctx.setTransform(1, 0, 0, 1, 0, 0), this._ctx.clearRect(0, 0, this._container.width, this._container.height), this._ctx.restore();
			},
			_draw: function() {
				var e, t = this._redrawBounds;
				if (this._ctx.save(), t) {
					var n = t.getSize();
					this._ctx.beginPath(), this._ctx.rect(t.min.x, t.min.y, n.x, n.y), this._ctx.clip();
				}
				this._drawing = !0;
				for (var r = this._drawFirst; r; r = r.next) e = r.layer, (!t || e._pxBounds && e._pxBounds.intersects(t)) && e._updatePath();
				this._drawing = !1, this._ctx.restore();
			},
			_updatePoly: function(e, t) {
				if (this._drawing) {
					var n, r, i, a, o = e._parts, s = o.length, c = this._ctx;
					if (s) {
						for (c.beginPath(), n = 0; n < s; n++) {
							for (r = 0, i = o[n].length; r < i; r++) a = o[n][r], c[r ? "lineTo" : "moveTo"](a.x, a.y);
							t && c.closePath();
						}
						this._fillStroke(c, e);
					}
				}
			},
			_updateCircle: function(e) {
				if (this._drawing && !e._empty()) {
					var t = e._point, n = this._ctx, r = Math.max(Math.round(e._radius), 1), i = (Math.max(Math.round(e._radiusY), 1) || r) / r;
					i !== 1 && (n.save(), n.scale(1, i)), n.beginPath(), n.arc(t.x, t.y / i, r, 0, Math.PI * 2, !1), i !== 1 && n.restore(), this._fillStroke(n, e);
				}
			},
			_fillStroke: function(e, t) {
				var n = t.options;
				n.fill && (e.globalAlpha = n.fillOpacity, e.fillStyle = n.fillColor || n.color, e.fill(n.fillRule || "evenodd")), n.stroke && n.weight !== 0 && (e.setLineDash && e.setLineDash(t.options && t.options._dashArray || []), e.globalAlpha = n.opacity, e.lineWidth = n.weight, e.strokeStyle = n.color, e.lineCap = n.lineCap, e.lineJoin = n.lineJoin, e.stroke());
			},
			_onClick: function(e) {
				for (var t = this._map.mouseEventToLayerPoint(e), n, r, i = this._drawFirst; i; i = i.next) n = i.layer, n.options.interactive && n._containsPoint(t) && (e.type !== "click" && e.type !== "preclick" || !this._map._draggableMoved(n)) && (r = n);
				this._fireEvent(r ? [r] : !1, e);
			},
			_onMouseMove: function(e) {
				if (!(!this._map || this._map.dragging.moving() || this._map._animatingZoom)) {
					var t = this._map.mouseEventToLayerPoint(e);
					this._handleMouseHover(e, t);
				}
			},
			_handleMouseOut: function(e) {
				var t = this._hoveredLayer;
				t && (bt(this._container, "leaflet-interactive"), this._fireEvent([t], e, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
			},
			_handleMouseHover: function(e, t) {
				if (!this._mouseHoverThrottled) {
					for (var n, r, a = this._drawFirst; a; a = a.next) n = a.layer, n.options.interactive && n._containsPoint(t) && (r = n);
					r !== this._hoveredLayer && (this._handleMouseOut(e), r && (J(this._container, "leaflet-interactive"), this._fireEvent([r], e, "mouseover"), this._hoveredLayer = r)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, e), this._mouseHoverThrottled = !0, setTimeout(i(function() {
						this._mouseHoverThrottled = !1;
					}, this), 32);
				}
			},
			_fireEvent: function(e, t, n) {
				this._map._fireDOMEvent(t, n || t.type, e);
			},
			_bringToFront: function(e) {
				var t = e._order;
				if (t) {
					var n = t.next, r = t.prev;
					if (n) n.prev = r;
					else return;
					r ? r.next = n : n && (this._drawFirst = n), t.prev = this._drawLast, this._drawLast.next = t, t.next = null, this._drawLast = t, this._requestRedraw(e);
				}
			},
			_bringToBack: function(e) {
				var t = e._order;
				if (t) {
					var n = t.next, r = t.prev;
					if (r) r.next = n;
					else return;
					n ? n.prev = r : r && (this._drawLast = r), t.prev = null, t.next = this._drawFirst, this._drawFirst.prev = t, this._drawFirst = t, this._requestRedraw(e);
				}
			}
		});
		function Wr(e) {
			return G.canvas ? new Ur(e) : null;
		}
		var Gr = (function() {
			try {
				return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(e) {
					return document.createElement("<lvml:" + e + " class=\"lvml\">");
				};
			} catch {}
			return function(e) {
				return document.createElement("<" + e + " xmlns=\"urn:schemas-microsoft.com:vml\" class=\"lvml\">");
			};
		})(), Kr = {
			_initContainer: function() {
				this._container = K("div", "leaflet-vml-container");
			},
			_update: function() {
				this._map._animatingZoom || (Hr.prototype._update.call(this), this.fire("update"));
			},
			_initPath: function(e) {
				var t = e._container = Gr("shape");
				J(t, "leaflet-vml-shape " + (this.options.className || "")), t.coordsize = "1 1", e._path = Gr("path"), t.appendChild(e._path), this._updateStyle(e), this._layers[o(e)] = e;
			},
			_addPath: function(e) {
				var t = e._container;
				this._container.appendChild(t), e.options.interactive && e.addInteractiveTarget(t);
			},
			_removePath: function(e) {
				var t = e._container;
				q(t), e.removeInteractiveTarget(t), delete this._layers[o(e)];
			},
			_updateStyle: function(e) {
				var t = e._stroke, n = e._fill, r = e.options, i = e._container;
				i.stroked = !!r.stroke, i.filled = !!r.fill, r.stroke ? (t ||= e._stroke = Gr("stroke"), i.appendChild(t), t.weight = r.weight + "px", t.color = r.color, t.opacity = r.opacity, r.dashArray ? t.dashStyle = _(r.dashArray) ? r.dashArray.join(" ") : r.dashArray.replace(/( *, *)/g, " ") : t.dashStyle = "", t.endcap = r.lineCap.replace("butt", "flat"), t.joinstyle = r.lineJoin) : t && (i.removeChild(t), e._stroke = null), r.fill ? (n ||= e._fill = Gr("fill"), i.appendChild(n), n.color = r.fillColor || r.color, n.opacity = r.fillOpacity) : n && (i.removeChild(n), e._fill = null);
			},
			_updateCircle: function(e) {
				var t = e._point.round(), n = Math.round(e._radius), r = Math.round(e._radiusY || n);
				this._setPath(e, e._empty() ? "M0 0" : "AL " + t.x + "," + t.y + " " + n + "," + r + " 0,23592600");
			},
			_setPath: function(e, t) {
				e._path.v = t;
			},
			_bringToFront: function(e) {
				_t(e._container);
			},
			_bringToBack: function(e) {
				vt(e._container);
			}
		}, qr = G.vml ? Gr : me, Jr = Hr.extend({
			_initContainer: function() {
				this._container = qr("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = qr("g"), this._container.appendChild(this._rootGroup);
			},
			_destroyContainer: function() {
				q(this._container), Z(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
			},
			_update: function() {
				if (!(this._map._animatingZoom && this._bounds)) {
					Hr.prototype._update.call(this);
					var e = this._bounds, t = e.getSize(), n = this._container;
					this._svgSize && this._svgSize.equals(t) || (this._svgSize = t, n.setAttribute("width", t.x), n.setAttribute("height", t.y)), Dt(n, e.min), n.setAttribute("viewBox", [
						e.min.x,
						e.min.y,
						t.x,
						t.y
					].join(" ")), this.fire("update");
				}
			},
			_initPath: function(e) {
				var t = e._path = qr("path");
				e.options.className && J(t, e.options.className), e.options.interactive && J(t, "leaflet-interactive"), this._updateStyle(e), this._layers[o(e)] = e;
			},
			_addPath: function(e) {
				this._rootGroup || this._initContainer(), this._rootGroup.appendChild(e._path), e.addInteractiveTarget(e._path);
			},
			_removePath: function(e) {
				q(e._path), e.removeInteractiveTarget(e._path), delete this._layers[o(e)];
			},
			_updatePath: function(e) {
				e._project(), e._update();
			},
			_updateStyle: function(e) {
				var t = e._path, n = e.options;
				t && (n.stroke ? (t.setAttribute("stroke", n.color), t.setAttribute("stroke-opacity", n.opacity), t.setAttribute("stroke-width", n.weight), t.setAttribute("stroke-linecap", n.lineCap), t.setAttribute("stroke-linejoin", n.lineJoin), n.dashArray ? t.setAttribute("stroke-dasharray", n.dashArray) : t.removeAttribute("stroke-dasharray"), n.dashOffset ? t.setAttribute("stroke-dashoffset", n.dashOffset) : t.removeAttribute("stroke-dashoffset")) : t.setAttribute("stroke", "none"), n.fill ? (t.setAttribute("fill", n.fillColor || n.color), t.setAttribute("fill-opacity", n.fillOpacity), t.setAttribute("fill-rule", n.fillRule || "evenodd")) : t.setAttribute("fill", "none"));
			},
			_updatePoly: function(e, t) {
				this._setPath(e, he(e._parts, t));
			},
			_updateCircle: function(e) {
				var t = e._point, n = Math.max(Math.round(e._radius), 1), r = Math.max(Math.round(e._radiusY), 1) || n, i = "a" + n + "," + r + " 0 1,0 ", a = e._empty() ? "M0 0" : "M" + (t.x - n) + "," + t.y + i + n * 2 + ",0 " + i + -n * 2 + ",0 ";
				this._setPath(e, a);
			},
			_setPath: function(e, t) {
				e._path.setAttribute("d", t);
			},
			_bringToFront: function(e) {
				_t(e._path);
			},
			_bringToBack: function(e) {
				vt(e._path);
			}
		});
		G.vml && Jr.include(Kr);
		function Yr(e) {
			return G.svg || G.vml ? new Jr(e) : null;
		}
		Q.include({
			getRenderer: function(e) {
				var t = e.options.renderer || this._getPaneRenderer(e.options.pane) || this.options.renderer || this._renderer;
				return t ||= this._renderer = this._createRenderer(), this.hasLayer(t) || this.addLayer(t), t;
			},
			_getPaneRenderer: function(e) {
				if (e === "overlayPane" || e === void 0) return !1;
				var t = this._paneRenderers[e];
				return t === void 0 && (t = this._createRenderer({ pane: e }), this._paneRenderers[e] = t), t;
			},
			_createRenderer: function(e) {
				return this.options.preferCanvas && Wr(e) || Yr(e);
			}
		});
		var Xr = lr.extend({
			initialize: function(e, t) {
				lr.prototype.initialize.call(this, this._boundsToLatLngs(e), t);
			},
			setBounds: function(e) {
				return this.setLatLngs(this._boundsToLatLngs(e));
			},
			_boundsToLatLngs: function(e) {
				return e = M(e), [
					e.getSouthWest(),
					e.getNorthWest(),
					e.getNorthEast(),
					e.getSouthEast()
				];
			}
		});
		function Zr(e, t) {
			return new Xr(e, t);
		}
		Jr.create = qr, Jr.pointsToPath = he, dr.geometryToLayer = fr, dr.coordsToLatLng = mr, dr.coordsToLatLngs = hr, dr.latLngToCoords = gr, dr.latLngsToCoords = _r, dr.getFeature = vr, dr.asFeature = yr, Q.mergeOptions({ boxZoom: !0 });
		var Qr = hn.extend({
			initialize: function(e) {
				this._map = e, this._container = e._container, this._pane = e._panes.overlayPane, this._resetStateTimeout = 0, e.on("unload", this._destroy, this);
			},
			addHooks: function() {
				X(this._container, "mousedown", this._onMouseDown, this);
			},
			removeHooks: function() {
				Z(this._container, "mousedown", this._onMouseDown, this);
			},
			moved: function() {
				return this._moved;
			},
			_destroy: function() {
				q(this._pane), delete this._pane;
			},
			_resetState: function() {
				this._resetStateTimeout = 0, this._moved = !1;
			},
			_clearDeferredResetState: function() {
				this._resetStateTimeout !== 0 && (clearTimeout(this._resetStateTimeout), this._resetStateTimeout = 0);
			},
			_onMouseDown: function(e) {
				if (!e.shiftKey || e.which !== 1 && e.button !== 1) return !1;
				this._clearDeferredResetState(), this._resetState(), kt(), Nt(), this._startPoint = this._map.mouseEventToContainerPoint(e), X(document, {
					contextmenu: Xt,
					mousemove: this._onMouseMove,
					mouseup: this._onMouseUp,
					keydown: this._onKeyDown
				}, this);
			},
			_onMouseMove: function(e) {
				this._moved || (this._moved = !0, this._box = K("div", "leaflet-zoom-box", this._container), J(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(e);
				var t = new A(this._point, this._startPoint), n = t.getSize();
				Dt(this._box, t.min), this._box.style.width = n.x + "px", this._box.style.height = n.y + "px";
			},
			_finish: function() {
				this._moved && (q(this._box), bt(this._container, "leaflet-crosshair")), At(), Pt(), Z(document, {
					contextmenu: Xt,
					mousemove: this._onMouseMove,
					mouseup: this._onMouseUp,
					keydown: this._onKeyDown
				}, this);
			},
			_onMouseUp: function(e) {
				if ((e.which === 1 || e.button === 1) && (this._finish(), this._moved)) {
					this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(i(this._resetState, this), 0);
					var t = new j(this._map.containerPointToLatLng(this._startPoint), this._map.containerPointToLatLng(this._point));
					this._map.fitBounds(t).fire("boxzoomend", { boxZoomBounds: t });
				}
			},
			_onKeyDown: function(e) {
				e.keyCode === 27 && (this._finish(), this._clearDeferredResetState(), this._resetState());
			}
		});
		Q.addInitHook("addHandler", "boxZoom", Qr), Q.mergeOptions({ doubleClickZoom: !0 });
		var $r = hn.extend({
			addHooks: function() {
				this._map.on("dblclick", this._onDoubleClick, this);
			},
			removeHooks: function() {
				this._map.off("dblclick", this._onDoubleClick, this);
			},
			_onDoubleClick: function(e) {
				var t = this._map, n = t.getZoom(), r = t.options.zoomDelta, i = e.originalEvent.shiftKey ? n - r : n + r;
				t.options.doubleClickZoom === "center" ? t.setZoom(i) : t.setZoomAround(e.containerPoint, i);
			}
		});
		Q.addInitHook("addHandler", "doubleClickZoom", $r), Q.mergeOptions({
			dragging: !0,
			inertia: !0,
			inertiaDeceleration: 3400,
			inertiaMaxSpeed: Infinity,
			easeLinearity: .2,
			worldCopyJump: !1,
			maxBoundsViscosity: 0
		});
		var ei = hn.extend({
			addHooks: function() {
				if (!this._draggable) {
					var e = this._map;
					this._draggable = new vn(e._mapPane, e._container), this._draggable.on({
						dragstart: this._onDragStart,
						drag: this._onDrag,
						dragend: this._onDragEnd
					}, this), this._draggable.on("predrag", this._onPreDragLimit, this), e.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), e.on("zoomend", this._onZoomEnd, this), e.whenReady(this._onZoomEnd, this));
				}
				J(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
			},
			removeHooks: function() {
				bt(this._map._container, "leaflet-grab"), bt(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
			},
			moved: function() {
				return this._draggable && this._draggable._moved;
			},
			moving: function() {
				return this._draggable && this._draggable._moving;
			},
			_onDragStart: function() {
				var e = this._map;
				if (e._stop(), this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
					var t = M(this._map.options.maxBounds);
					this._offsetLimit = ae(this._map.latLngToContainerPoint(t.getNorthWest()).multiplyBy(-1), this._map.latLngToContainerPoint(t.getSouthEast()).multiplyBy(-1).add(this._map.getSize())), this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
				} else this._offsetLimit = null;
				e.fire("movestart").fire("dragstart"), e.options.inertia && (this._positions = [], this._times = []);
			},
			_onDrag: function(e) {
				if (this._map.options.inertia) {
					var t = this._lastTime = +/* @__PURE__ */ new Date(), n = this._lastPos = this._draggable._absPos || this._draggable._newPos;
					this._positions.push(n), this._times.push(t), this._prunePositions(t);
				}
				this._map.fire("move", e).fire("drag", e);
			},
			_prunePositions: function(e) {
				for (; this._positions.length > 1 && e - this._times[0] > 50;) this._positions.shift(), this._times.shift();
			},
			_onZoomEnd: function() {
				var e = this._map.getSize().divideBy(2), t = this._map.latLngToLayerPoint([0, 0]);
				this._initialWorldOffset = t.subtract(e).x, this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
			},
			_viscousLimit: function(e, t) {
				return e - (e - t) * this._viscosity;
			},
			_onPreDragLimit: function() {
				if (this._viscosity && this._offsetLimit) {
					var e = this._draggable._newPos.subtract(this._draggable._startPos), t = this._offsetLimit;
					e.x < t.min.x && (e.x = this._viscousLimit(e.x, t.min.x)), e.y < t.min.y && (e.y = this._viscousLimit(e.y, t.min.y)), e.x > t.max.x && (e.x = this._viscousLimit(e.x, t.max.x)), e.y > t.max.y && (e.y = this._viscousLimit(e.y, t.max.y)), this._draggable._newPos = this._draggable._startPos.add(e);
				}
			},
			_onPreDragWrap: function() {
				var e = this._worldWidth, t = Math.round(e / 2), n = this._initialWorldOffset, r = this._draggable._newPos.x, i = (r - t + n) % e + t - n, a = (r + t + n) % e - t - n, o = Math.abs(i + n) < Math.abs(a + n) ? i : a;
				this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = o;
			},
			_onDragEnd: function(e) {
				var t = this._map, n = t.options, r = !n.inertia || e.noInertia || this._times.length < 2;
				if (t.fire("dragend", e), r) t.fire("moveend");
				else {
					this._prunePositions(+/* @__PURE__ */ new Date());
					var i = this._lastPos.subtract(this._positions[0]), a = (this._lastTime - this._times[0]) / 1e3, o = n.easeLinearity, s = i.multiplyBy(o / a), c = s.distanceTo([0, 0]), l = Math.min(n.inertiaMaxSpeed, c), u = s.multiplyBy(l / c), d = l / (n.inertiaDeceleration * o), f = u.multiplyBy(-d / 2).round();
					!f.x && !f.y ? t.fire("moveend") : (f = t._limitOffset(f, t.options.maxBounds), T(function() {
						t.panBy(f, {
							duration: d,
							easeLinearity: o,
							noMoveStart: !0,
							animate: !0
						});
					}));
				}
			}
		});
		Q.addInitHook("addHandler", "dragging", ei), Q.mergeOptions({
			keyboard: !0,
			keyboardPanDelta: 80
		});
		var ti = hn.extend({
			keyCodes: {
				left: [37],
				right: [39],
				down: [40],
				up: [38],
				zoomIn: [
					187,
					107,
					61,
					171
				],
				zoomOut: [
					189,
					109,
					54,
					173
				]
			},
			initialize: function(e) {
				this._map = e, this._setPanDelta(e.options.keyboardPanDelta), this._setZoomDelta(e.options.zoomDelta);
			},
			addHooks: function() {
				var e = this._map._container;
				e.tabIndex <= 0 && (e.tabIndex = "0"), X(e, {
					focus: this._onFocus,
					blur: this._onBlur,
					mousedown: this._onMouseDown
				}, this), this._map.on({
					focus: this._addHooks,
					blur: this._removeHooks
				}, this);
			},
			removeHooks: function() {
				this._removeHooks(), Z(this._map._container, {
					focus: this._onFocus,
					blur: this._onBlur,
					mousedown: this._onMouseDown
				}, this), this._map.off({
					focus: this._addHooks,
					blur: this._removeHooks
				}, this);
			},
			_onMouseDown: function() {
				if (!this._focused) {
					var e = document.body, t = document.documentElement, n = e.scrollTop || t.scrollTop, r = e.scrollLeft || t.scrollLeft;
					this._map._container.focus(), window.scrollTo(r, n);
				}
			},
			_onFocus: function() {
				this._focused = !0, this._map.fire("focus");
			},
			_onBlur: function() {
				this._focused = !1, this._map.fire("blur");
			},
			_setPanDelta: function(e) {
				for (var t = this._panKeys = {}, n = this.keyCodes, r = 0, i = n.left.length; r < i; r++) t[n.left[r]] = [-1 * e, 0];
				for (r = 0, i = n.right.length; r < i; r++) t[n.right[r]] = [e, 0];
				for (r = 0, i = n.down.length; r < i; r++) t[n.down[r]] = [0, e];
				for (r = 0, i = n.up.length; r < i; r++) t[n.up[r]] = [0, -1 * e];
			},
			_setZoomDelta: function(e) {
				for (var t = this._zoomKeys = {}, n = this.keyCodes, r = 0, i = n.zoomIn.length; r < i; r++) t[n.zoomIn[r]] = e;
				for (r = 0, i = n.zoomOut.length; r < i; r++) t[n.zoomOut[r]] = -e;
			},
			_addHooks: function() {
				X(document, "keydown", this._onKeyDown, this);
			},
			_removeHooks: function() {
				Z(document, "keydown", this._onKeyDown, this);
			},
			_onKeyDown: function(e) {
				if (!(e.altKey || e.ctrlKey || e.metaKey)) {
					var t = e.keyCode, n = this._map, r;
					if (t in this._panKeys) {
						if (!n._panAnim || !n._panAnim._inProgress) {
							if (r = this._panKeys[t], e.shiftKey && (r = k(r).multiplyBy(3)), n.options.maxBounds && (r = n._limitOffset(k(r), n.options.maxBounds)), n.options.worldCopyJump) {
								var i = n.wrapLatLng(n.unproject(n.project(n.getCenter()).add(r)));
								n.panTo(i);
							} else n.panBy(r);
						}
					} else if (t in this._zoomKeys) n.setZoom(n.getZoom() + (e.shiftKey ? 3 : 1) * this._zoomKeys[t]);
					else if (t === 27 && n._popup && n._popup.options.closeOnEscapeKey) n.closePopup();
					else return;
					Xt(e);
				}
			}
		});
		Q.addInitHook("addHandler", "keyboard", ti), Q.mergeOptions({
			scrollWheelZoom: !0,
			wheelDebounceTime: 40,
			wheelPxPerZoomLevel: 60
		});
		var ni = hn.extend({
			addHooks: function() {
				X(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
			},
			removeHooks: function() {
				Z(this._map._container, "wheel", this._onWheelScroll, this);
			},
			_onWheelScroll: function(e) {
				var t = en(e), n = this._map.options.wheelDebounceTime;
				this._delta += t, this._lastMousePos = this._map.mouseEventToContainerPoint(e), this._startTime ||= +/* @__PURE__ */ new Date();
				var r = Math.max(n - (+/* @__PURE__ */ new Date() - this._startTime), 0);
				clearTimeout(this._timer), this._timer = setTimeout(i(this._performZoom, this), r), Xt(e);
			},
			_performZoom: function() {
				var e = this._map, t = e.getZoom(), n = this._map.options.zoomSnap || 0;
				e._stop();
				var r = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), i = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(r)))) / Math.LN2, a = n ? Math.ceil(i / n) * n : i, o = e._limitZoom(t + (this._delta > 0 ? a : -a)) - t;
				this._delta = 0, this._startTime = null, o && (e.options.scrollWheelZoom === "center" ? e.setZoom(t + o) : e.setZoomAround(this._lastMousePos, t + o));
			}
		});
		Q.addInitHook("addHandler", "scrollWheelZoom", ni);
		var ri = 600;
		Q.mergeOptions({
			tapHold: G.touchNative && G.safari && G.mobile,
			tapTolerance: 15
		});
		var ii = hn.extend({
			addHooks: function() {
				X(this._map._container, "touchstart", this._onDown, this);
			},
			removeHooks: function() {
				Z(this._map._container, "touchstart", this._onDown, this);
			},
			_onDown: function(e) {
				if (clearTimeout(this._holdTimeout), e.touches.length === 1) {
					var t = e.touches[0];
					this._startPos = this._newPos = new O(t.clientX, t.clientY), this._holdTimeout = setTimeout(i(function() {
						this._cancel(), this._isTapValid() && (X(document, "touchend", Yt), X(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", t));
					}, this), ri), X(document, "touchend touchcancel contextmenu", this._cancel, this), X(document, "touchmove", this._onMove, this);
				}
			},
			_cancelClickPrevent: function e() {
				Z(document, "touchend", Yt), Z(document, "touchend touchcancel", e);
			},
			_cancel: function() {
				clearTimeout(this._holdTimeout), Z(document, "touchend touchcancel contextmenu", this._cancel, this), Z(document, "touchmove", this._onMove, this);
			},
			_onMove: function(e) {
				var t = e.touches[0];
				this._newPos = new O(t.clientX, t.clientY);
			},
			_isTapValid: function() {
				return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
			},
			_simulateEvent: function(e, t) {
				var n = new MouseEvent(e, {
					bubbles: !0,
					cancelable: !0,
					view: window,
					screenX: t.screenX,
					screenY: t.screenY,
					clientX: t.clientX,
					clientY: t.clientY
				});
				n._simulated = !0, t.target.dispatchEvent(n);
			}
		});
		Q.addInitHook("addHandler", "tapHold", ii), Q.mergeOptions({
			touchZoom: G.touch,
			bounceAtZoomLimits: !0
		});
		var ai = hn.extend({
			addHooks: function() {
				J(this._map._container, "leaflet-touch-zoom"), X(this._map._container, "touchstart", this._onTouchStart, this);
			},
			removeHooks: function() {
				bt(this._map._container, "leaflet-touch-zoom"), Z(this._map._container, "touchstart", this._onTouchStart, this);
			},
			_onTouchStart: function(e) {
				var t = this._map;
				if (!(!e.touches || e.touches.length !== 2 || t._animatingZoom || this._zooming)) {
					var n = t.mouseEventToContainerPoint(e.touches[0]), r = t.mouseEventToContainerPoint(e.touches[1]);
					this._centerPoint = t.getSize()._divideBy(2), this._startLatLng = t.containerPointToLatLng(this._centerPoint), t.options.touchZoom !== "center" && (this._pinchStartLatLng = t.containerPointToLatLng(n.add(r)._divideBy(2))), this._startDist = n.distanceTo(r), this._startZoom = t.getZoom(), this._moved = !1, this._zooming = !0, t._stop(), X(document, "touchmove", this._onTouchMove, this), X(document, "touchend touchcancel", this._onTouchEnd, this), Yt(e);
				}
			},
			_onTouchMove: function(e) {
				if (e.touches && e.touches.length === 2 && this._zooming) {
					var t = this._map, n = t.mouseEventToContainerPoint(e.touches[0]), r = t.mouseEventToContainerPoint(e.touches[1]), a = n.distanceTo(r) / this._startDist;
					if (this._zoom = t.getScaleZoom(a, this._startZoom), !t.options.bounceAtZoomLimits && (this._zoom < t.getMinZoom() && a < 1 || this._zoom > t.getMaxZoom() && a > 1) && (this._zoom = t._limitZoom(this._zoom)), t.options.touchZoom === "center") {
						if (this._center = this._startLatLng, a === 1) return;
					} else {
						var o = n._add(r)._divideBy(2)._subtract(this._centerPoint);
						if (a === 1 && o.x === 0 && o.y === 0) return;
						this._center = t.unproject(t.project(this._pinchStartLatLng, this._zoom).subtract(o), this._zoom);
					}
					this._moved ||= (t._moveStart(!0, !1), !0), E(this._animRequest);
					var s = i(t._move, t, this._center, this._zoom, {
						pinch: !0,
						round: !1
					}, void 0);
					this._animRequest = T(s, this, !0), Yt(e);
				}
			},
			_onTouchEnd: function() {
				!this._moved || !this._zooming ? this._zooming = !1 : (this._zooming = !1, E(this._animRequest), Z(document, "touchmove", this._onTouchMove, this), Z(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom)));
			}
		});
		Q.addInitHook("addHandler", "touchZoom", ai), Q.BoxZoom = Qr, Q.DoubleClickZoom = $r, Q.Drag = ei, Q.Keyboard = ti, Q.ScrollWheelZoom = ni, Q.TapHold = ii, Q.TouchZoom = ai, e.Bounds = A, e.Browser = G, e.CRS = oe, e.Canvas = Ur, e.Circle = ar, e.CircleMarker = rr, e.Class = te, e.Control = on, e.DivIcon = Pr, e.DivOverlay = kr, e.DomEvent = nn, e.DomUtil = Y, e.Draggable = vn, e.Evented = re, e.FeatureGroup = Jn, e.GeoJSON = dr, e.GridLayer = Ir, e.Handler = hn, e.Icon = Xn, e.ImageOverlay = Cr, e.LatLng = N, e.LatLngBounds = j, e.Layer = Gn, e.LayerGroup = Kn, e.LineUtil = Rn, e.Map = Q, e.Marker = er, e.Mixin = gn, e.Path = nr, e.Point = O, e.PolyUtil = Sn, e.Polygon = lr, e.Polyline = sr, e.Popup = Ar, e.PosAnimation = rn, e.Projection = Vn, e.Rectangle = Xr, e.Renderer = Hr, e.SVG = Jr, e.SVGOverlay = Dr, e.TileLayer = Rr, e.Tooltip = Mr, e.Transformation = ue, e.Util = ee, e.VideoOverlay = Tr, e.bind = i, e.bounds = ae, e.canvas = Wr, e.circle = or, e.circleMarker = ir, e.control = sn, e.divIcon = Fr, e.extend = n, e.featureGroup = Yn, e.geoJSON = xr, e.geoJson = Sr, e.gridLayer = Lr, e.icon = Zn, e.imageOverlay = wr, e.latLng = P, e.latLngBounds = M, e.layerGroup = qn, e.map = an, e.marker = tr, e.point = k, e.polygon = ur, e.polyline = cr, e.popup = jr, e.rectangle = Zr, e.setOptions = p, e.stamp = o, e.svg = Yr, e.svgOverlay = Or, e.tileLayer = zr, e.tooltip = Nr, e.transformation = de, e.version = t, e.videoOverlay = Er;
		var oi = window.L;
		e.noConflict = function() {
			return window.L = oi, this;
		}, window.L = e;
	}));
})), Ml = /* @__PURE__ */ t(((e, t, n) => {
	(function(e, n) {
		typeof define == "function" && define.amd ? define("leafletFullScreen", ["leaflet"], n) : typeof t == "object" && t.exports ? t.exports = n(jl()) : n(e.L);
	})(typeof self < "u" ? self : n, (e) => {
		if (typeof document > "u") return console.warn("\"window.document\" is undefined; leaflet.fullscreen requires this object to access the DOM"), !1;
		let t = (() => {
			let e = [[
				"requestFullscreen",
				"exitFullscreen",
				"fullscreenElement",
				"fullscreenEnabled",
				"fullscreenchange",
				"fullscreenerror"
			], [
				"webkitRequestFullscreen",
				"webkitExitFullscreen",
				"webkitFullscreenElement",
				"webkitFullscreenEnabled",
				"webkitfullscreenchange",
				"webkitfullscreenerror"
			]], t = e[0], n = {};
			for (let r of e) if (r[1] in document) {
				for (let e = 0; e < r.length; e++) n[t[e]] = r[e];
				return n;
			}
			return !1;
		})(), n = {
			change: t.fullscreenchange,
			error: t.fullscreenerror
		}, r = {
			request(e, n) {
				return new Promise((r, i) => {
					let a = function() {
						this.off("change", a), r();
					}.bind(this);
					this.on("change", a), e ||= document.documentElement;
					let o = e[t.requestFullscreen](n);
					o instanceof Promise && o.then(a).catch(i);
				});
			},
			exit() {
				return new Promise((e, n) => {
					if (!this.isFullscreen) {
						e();
						return;
					}
					let r = function() {
						this.off("change", r), e();
					}.bind(this);
					this.on("change", r);
					let i = document[t.exitFullscreen]();
					i instanceof Promise && i.then(r).catch(n);
				});
			},
			on(e, t) {
				let r = n[e];
				r && document.addEventListener(r, t, !1);
			},
			off(e, t) {
				let r = n[e];
				r && document.removeEventListener(r, t, !1);
			},
			nativeAPI: t
		};
		return Object.defineProperties(r, {
			isFullscreen: { get() {
				return !!document[t.fullscreenElement];
			} },
			isEnabled: {
				enumerable: !0,
				get() {
					return !!document[t.fullscreenEnabled];
				}
			}
		}), e.Control.FullScreen = e.Control.extend({
			options: {
				position: "topleft",
				title: "Full Screen",
				titleCancel: "Exit Full Screen",
				forceSeparateButton: !1,
				forcePseudoFullscreen: !1,
				fullscreenElement: !1
			},
			_screenfull: r,
			onAdd(t) {
				let n = "leaflet-control-zoom-fullscreen", r, i = "";
				return r = t.zoomControl && !this.options.forceSeparateButton ? t.zoomControl._container : e.DomUtil.create("div", "leaflet-bar"), this.options.content ? i = this.options.content : n += " fullscreen-icon", this._createButton(this.options.title, n, i, r, this.toggleFullScreen, this), this._map.fullscreenControl = this, this._map.on("enterFullscreen exitFullscreen", this._toggleState, this), r;
			},
			onRemove() {
				e.DomEvent.off(this.link, "click", e.DomEvent.stop).off(this.link, "click", this.toggleFullScreen, this), this._screenfull.isEnabled && (e.DomEvent.off(this._container, this._screenfull.nativeAPI.fullscreenchange, e.DomEvent.stop).off(this._container, this._screenfull.nativeAPI.fullscreenchange, this._handleFullscreenChange, this), e.DomEvent.off(document, this._screenfull.nativeAPI.fullscreenchange, e.DomEvent.stop).off(document, this._screenfull.nativeAPI.fullscreenchange, this._handleFullscreenChange, this));
			},
			_createButton(t, n, r, i, a, o) {
				return this.link = e.DomUtil.create("a", n, i), this.link.href = "#", this.link.title = t, this.link.innerHTML = r, this.link.setAttribute("role", "button"), this.link.setAttribute("aria-label", t), L.DomEvent.disableClickPropagation(i), e.DomEvent.on(this.link, "click", e.DomEvent.stop).on(this.link, "click", a, o), this._screenfull.isEnabled && (e.DomEvent.on(i, this._screenfull.nativeAPI.fullscreenchange, e.DomEvent.stop).on(i, this._screenfull.nativeAPI.fullscreenchange, this._handleFullscreenChange, o), e.DomEvent.on(document, this._screenfull.nativeAPI.fullscreenchange, e.DomEvent.stop).on(document, this._screenfull.nativeAPI.fullscreenchange, this._handleFullscreenChange, o)), this.link;
			},
			toggleFullScreen() {
				let t = this._map;
				t._exitFired = !1, t._isFullscreen ? (this._screenfull.isEnabled && !this.options.forcePseudoFullscreen ? this._screenfull.exit().then(() => t.invalidateSize()) : (e.DomUtil.removeClass(this.options.fullscreenElement ? this.options.fullscreenElement : t._container, "leaflet-pseudo-fullscreen"), t.invalidateSize()), t.fire("exitFullscreen"), t._exitFired = !0, t._isFullscreen = !1) : (this._screenfull.isEnabled && !this.options.forcePseudoFullscreen ? this._screenfull.request(this.options.fullscreenElement ? this.options.fullscreenElement : t._container).then(() => t.invalidateSize()) : (e.DomUtil.addClass(this.options.fullscreenElement ? this.options.fullscreenElement : t._container, "leaflet-pseudo-fullscreen"), t.invalidateSize()), t.fire("enterFullscreen"), t._isFullscreen = !0);
			},
			_toggleState() {
				this.link.title = this._map._isFullscreen ? this.options.title : this.options.titleCancel, this._map._isFullscreen ? L.DomUtil.removeClass(this.link, "leaflet-fullscreen-on") : L.DomUtil.addClass(this.link, "leaflet-fullscreen-on");
			},
			_handleFullscreenChange(e) {
				let t = this._map;
				e.target === t.getContainer() && !this._screenfull.isFullscreen && !t._exitFired && (this._screenfull.exit().then(() => t.invalidateSize()), t.fire("exitFullscreen"), t._exitFired = !0, t._isFullscreen = !1);
			}
		}), e.Map.include({ toggleFullscreen() {
			this.fullscreenControl.toggleFullScreen();
		} }), e.Map.addInitHook(function() {
			this.options.fullscreenControl && this.addControl(e.control.fullscreen(this.options.fullscreenControlOptions));
		}), e.control.fullscreen = function(t) {
			return new e.Control.FullScreen(t);
		}, { leaflet: e };
	});
})), Nl = /* @__PURE__ */ t(((e, t, n) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? r(e) : typeof define == "function" && define.amd ? define(["exports"], r) : (n ||= self, r((n.Leaflet = n.Leaflet || {}, n.Leaflet.markercluster = {})));
	})(n, function(e) {
		var t = L.MarkerClusterGroup = L.FeatureGroup.extend({
			options: {
				maxClusterRadius: 80,
				iconCreateFunction: null,
				clusterPane: L.Marker.prototype.options.pane,
				spiderfyOnEveryZoom: !1,
				spiderfyOnMaxZoom: !0,
				showCoverageOnHover: !0,
				zoomToBoundsOnClick: !0,
				singleMarkerMode: !1,
				disableClusteringAtZoom: null,
				removeOutsideVisibleBounds: !0,
				animate: !0,
				animateAddingMarkers: !1,
				spiderfyShapePositions: null,
				spiderfyDistanceMultiplier: 1,
				spiderLegPolylineOptions: {
					weight: 1.5,
					color: "#222",
					opacity: .5
				},
				chunkedLoading: !1,
				chunkInterval: 200,
				chunkDelay: 50,
				chunkProgress: null,
				polygonOptions: {}
			},
			initialize: function(e) {
				L.Util.setOptions(this, e), this.options.iconCreateFunction || (this.options.iconCreateFunction = this._defaultIconCreateFunction), this._featureGroup = L.featureGroup(), this._featureGroup.addEventParent(this), this._nonPointGroup = L.featureGroup(), this._nonPointGroup.addEventParent(this), this._inZoomAnimation = 0, this._needsClustering = [], this._needsRemoving = [], this._currentShownBounds = null, this._queue = [], this._childMarkerEventHandlers = {
					dragstart: this._childMarkerDragStart,
					move: this._childMarkerMoved,
					dragend: this._childMarkerDragEnd
				};
				var t = L.DomUtil.TRANSITION && this.options.animate;
				L.extend(this, t ? this._withAnimation : this._noAnimation), this._markerCluster = t ? L.MarkerCluster : L.MarkerClusterNonAnimated;
			},
			addLayer: function(e) {
				if (e instanceof L.LayerGroup) return this.addLayers([e]);
				if (!e.getLatLng) return this._nonPointGroup.addLayer(e), this.fire("layeradd", { layer: e }), this;
				if (!this._map) return this._needsClustering.push(e), this.fire("layeradd", { layer: e }), this;
				if (this.hasLayer(e)) return this;
				this._unspiderfy && this._unspiderfy(), this._addLayer(e, this._maxZoom), this.fire("layeradd", { layer: e }), this._topClusterLevel._recalculateBounds(), this._refreshClustersIcons();
				var t = e, n = this._zoom;
				if (e.__parent) for (; t.__parent._zoom >= n;) t = t.__parent;
				return this._currentShownBounds.contains(t.getLatLng()) && (this.options.animateAddingMarkers ? this._animationAddLayer(e, t) : this._animationAddLayerNonAnimated(e, t)), this;
			},
			removeLayer: function(e) {
				return e instanceof L.LayerGroup ? this.removeLayers([e]) : e.getLatLng ? this._map ? (e.__parent && (this._unspiderfy && (this._unspiderfy(), this._unspiderfyLayer(e)), this._removeLayer(e, !0), this.fire("layerremove", { layer: e }), this._topClusterLevel._recalculateBounds(), this._refreshClustersIcons(), e.off(this._childMarkerEventHandlers, this), this._featureGroup.hasLayer(e) && (this._featureGroup.removeLayer(e), e.clusterShow && e.clusterShow())), this) : (!this._arraySplice(this._needsClustering, e) && this.hasLayer(e) && this._needsRemoving.push({
					layer: e,
					latlng: e._latlng
				}), this.fire("layerremove", { layer: e }), this) : (this._nonPointGroup.removeLayer(e), this.fire("layerremove", { layer: e }), this);
			},
			addLayers: function(e, t) {
				if (!L.Util.isArray(e)) return this.addLayer(e);
				var n = this._featureGroup, r = this._nonPointGroup, i = this.options.chunkedLoading, a = this.options.chunkInterval, o = this.options.chunkProgress, s = e.length, c = 0, l = !0, u;
				if (this._map) {
					var d = (/* @__PURE__ */ new Date()).getTime(), f = L.bind(function() {
						var p = (/* @__PURE__ */ new Date()).getTime();
						for (this._map && this._unspiderfy && this._unspiderfy(); c < s && !(i && c % 200 == 0 && (/* @__PURE__ */ new Date()).getTime() - p > a); c++) if (u = e[c], u instanceof L.LayerGroup) l &&= (e = e.slice(), !1), this._extractNonGroupLayers(u, e), s = e.length;
						else if (!u.getLatLng) r.addLayer(u), t || this.fire("layeradd", { layer: u });
						else if (!this.hasLayer(u) && (this._addLayer(u, this._maxZoom), t || this.fire("layeradd", { layer: u }), u.__parent && u.__parent.getChildCount() === 2)) {
							var m = u.__parent.getAllChildMarkers(), h = m[0] === u ? m[1] : m[0];
							n.removeLayer(h);
						}
						o && o(c, s, (/* @__PURE__ */ new Date()).getTime() - d), c === s ? (this._topClusterLevel._recalculateBounds(), this._refreshClustersIcons(), this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds)) : setTimeout(f, this.options.chunkDelay);
					}, this);
					f();
				} else for (var p = this._needsClustering; c < s; c++) u = e[c], u instanceof L.LayerGroup ? (l &&= (e = e.slice(), !1), this._extractNonGroupLayers(u, e), s = e.length) : u.getLatLng ? this.hasLayer(u) || p.push(u) : r.addLayer(u);
				return this;
			},
			removeLayers: function(e) {
				var t, n, r = e.length, i = this._featureGroup, a = this._nonPointGroup, o = !0;
				if (!this._map) {
					for (t = 0; t < r; t++) n = e[t], n instanceof L.LayerGroup ? (o &&= (e = e.slice(), !1), this._extractNonGroupLayers(n, e), r = e.length) : (this._arraySplice(this._needsClustering, n), a.removeLayer(n), this.hasLayer(n) && this._needsRemoving.push({
						layer: n,
						latlng: n._latlng
					}), this.fire("layerremove", { layer: n }));
					return this;
				}
				if (this._unspiderfy) {
					this._unspiderfy();
					var s = e.slice(), c = r;
					for (t = 0; t < c; t++) n = s[t], n instanceof L.LayerGroup ? (this._extractNonGroupLayers(n, s), c = s.length) : this._unspiderfyLayer(n);
				}
				for (t = 0; t < r; t++) n = e[t], n instanceof L.LayerGroup ? (o &&= (e = e.slice(), !1), this._extractNonGroupLayers(n, e), r = e.length) : n.__parent ? (this._removeLayer(n, !0, !0), this.fire("layerremove", { layer: n }), i.hasLayer(n) && (i.removeLayer(n), n.clusterShow && n.clusterShow())) : (a.removeLayer(n), this.fire("layerremove", { layer: n }));
				return this._topClusterLevel._recalculateBounds(), this._refreshClustersIcons(), this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds), this;
			},
			clearLayers: function() {
				return this._map || (this._needsClustering = [], this._needsRemoving = [], delete this._gridClusters, delete this._gridUnclustered), this._noanimationUnspiderfy && this._noanimationUnspiderfy(), this._featureGroup.clearLayers(), this._nonPointGroup.clearLayers(), this.eachLayer(function(e) {
					e.off(this._childMarkerEventHandlers, this), delete e.__parent;
				}, this), this._map && this._generateInitialClusters(), this;
			},
			getBounds: function() {
				var e = new L.LatLngBounds();
				this._topClusterLevel && e.extend(this._topClusterLevel._bounds);
				for (var t = this._needsClustering.length - 1; t >= 0; t--) e.extend(this._needsClustering[t].getLatLng());
				return e.extend(this._nonPointGroup.getBounds()), e;
			},
			eachLayer: function(e, t) {
				var n = this._needsClustering.slice(), r = this._needsRemoving, i, a, o;
				for (this._topClusterLevel && this._topClusterLevel.getAllChildMarkers(n), a = n.length - 1; a >= 0; a--) {
					for (i = !0, o = r.length - 1; o >= 0; o--) if (r[o].layer === n[a]) {
						i = !1;
						break;
					}
					i && e.call(t, n[a]);
				}
				this._nonPointGroup.eachLayer(e, t);
			},
			getLayers: function() {
				var e = [];
				return this.eachLayer(function(t) {
					e.push(t);
				}), e;
			},
			getLayer: function(e) {
				var t = null;
				return e = parseInt(e, 10), this.eachLayer(function(n) {
					L.stamp(n) === e && (t = n);
				}), t;
			},
			hasLayer: function(e) {
				if (!e) return !1;
				var t, n = this._needsClustering;
				for (t = n.length - 1; t >= 0; t--) if (n[t] === e) return !0;
				for (n = this._needsRemoving, t = n.length - 1; t >= 0; t--) if (n[t].layer === e) return !1;
				return !!(e.__parent && e.__parent._group === this) || this._nonPointGroup.hasLayer(e);
			},
			zoomToShowLayer: function(e, t) {
				var n = this._map;
				typeof t != "function" && (t = function() {});
				var r = function() {
					(n.hasLayer(e) || n.hasLayer(e.__parent)) && !this._inZoomAnimation && (this._map.off("moveend", r, this), this.off("animationend", r, this), n.hasLayer(e) ? t() : e.__parent._icon && (this.once("spiderfied", t, this), e.__parent.spiderfy()));
				};
				e._icon && this._map.getBounds().contains(e.getLatLng()) ? t() : e.__parent._zoom < Math.round(this._map._zoom) ? (this._map.on("moveend", r, this), this._map.panTo(e.getLatLng())) : (this._map.on("moveend", r, this), this.on("animationend", r, this), e.__parent.zoomToBounds());
			},
			onAdd: function(e) {
				this._map = e;
				var t, n, r;
				if (!isFinite(this._map.getMaxZoom())) throw "Map has no maxZoom specified";
				for (this._featureGroup.addTo(e), this._nonPointGroup.addTo(e), this._gridClusters || this._generateInitialClusters(), this._maxLat = e.options.crs.projection.MAX_LATITUDE, t = 0, n = this._needsRemoving.length; t < n; t++) r = this._needsRemoving[t], r.newlatlng = r.layer._latlng, r.layer._latlng = r.latlng;
				for (t = 0, n = this._needsRemoving.length; t < n; t++) r = this._needsRemoving[t], this._removeLayer(r.layer, !0), r.layer._latlng = r.newlatlng;
				this._needsRemoving = [], this._zoom = Math.round(this._map._zoom), this._currentShownBounds = this._getExpandedVisibleBounds(), this._map.on("zoomend", this._zoomEnd, this), this._map.on("moveend", this._moveEnd, this), this._spiderfierOnAdd && this._spiderfierOnAdd(), this._bindEvents(), n = this._needsClustering, this._needsClustering = [], this.addLayers(n, !0);
			},
			onRemove: function(e) {
				e.off("zoomend", this._zoomEnd, this), e.off("moveend", this._moveEnd, this), this._unbindEvents(), this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", ""), this._spiderfierOnRemove && this._spiderfierOnRemove(), delete this._maxLat, this._hideCoverage(), this._featureGroup.remove(), this._nonPointGroup.remove(), this._featureGroup.clearLayers(), this._map = null;
			},
			getVisibleParent: function(e) {
				for (var t = e; t && !t._icon;) t = t.__parent;
				return t || null;
			},
			_arraySplice: function(e, t) {
				for (var n = e.length - 1; n >= 0; n--) if (e[n] === t) return e.splice(n, 1), !0;
			},
			_removeFromGridUnclustered: function(e, t) {
				for (var n = this._map, r = this._gridUnclustered, i = Math.floor(this._map.getMinZoom()); t >= i && r[t].removeObject(e, n.project(e.getLatLng(), t)); t--);
			},
			_childMarkerDragStart: function(e) {
				e.target.__dragStart = e.target._latlng;
			},
			_childMarkerMoved: function(e) {
				if (!this._ignoreMove && !e.target.__dragStart) {
					var t = e.target._popup && e.target._popup.isOpen();
					this._moveChild(e.target, e.oldLatLng, e.latlng), t && e.target.openPopup();
				}
			},
			_moveChild: function(e, t, n) {
				e._latlng = t, this.removeLayer(e), e._latlng = n, this.addLayer(e);
			},
			_childMarkerDragEnd: function(e) {
				var t = e.target.__dragStart;
				delete e.target.__dragStart, t && this._moveChild(e.target, t, e.target._latlng);
			},
			_removeLayer: function(e, t, n) {
				var r = this._gridClusters, i = this._gridUnclustered, a = this._featureGroup, o = this._map, s = Math.floor(this._map.getMinZoom());
				t && this._removeFromGridUnclustered(e, this._maxZoom);
				var c = e.__parent, l = c._markers, u;
				for (this._arraySplice(l, e); c && (c._childCount--, c._boundsNeedUpdate = !0, !(c._zoom < s));) t && c._childCount <= 1 ? (u = c._markers[0] === e ? c._markers[1] : c._markers[0], r[c._zoom].removeObject(c, o.project(c._cLatLng, c._zoom)), i[c._zoom].addObject(u, o.project(u.getLatLng(), c._zoom)), this._arraySplice(c.__parent._childClusters, c), c.__parent._markers.push(u), u.__parent = c.__parent, c._icon && (a.removeLayer(c), n || a.addLayer(u))) : c._iconNeedsUpdate = !0, c = c.__parent;
				delete e.__parent;
			},
			_isOrIsParent: function(e, t) {
				for (; t;) {
					if (e === t) return !0;
					t = t.parentNode;
				}
				return !1;
			},
			fire: function(e, t, n) {
				if (t && t.layer instanceof L.MarkerCluster) {
					if (t.originalEvent && this._isOrIsParent(t.layer._icon, t.originalEvent.relatedTarget)) return;
					e = "cluster" + e;
				}
				L.FeatureGroup.prototype.fire.call(this, e, t, n);
			},
			listens: function(e, t) {
				return L.FeatureGroup.prototype.listens.call(this, e, t) || L.FeatureGroup.prototype.listens.call(this, "cluster" + e, t);
			},
			_defaultIconCreateFunction: function(e) {
				var t = e.getChildCount(), n = " marker-cluster-";
				return n += t < 10 ? "small" : t < 100 ? "medium" : "large", new L.DivIcon({
					html: "<div><span>" + t + "</span></div>",
					className: "marker-cluster" + n,
					iconSize: new L.Point(40, 40)
				});
			},
			_bindEvents: function() {
				var e = this._map, t = this.options.spiderfyOnMaxZoom, n = this.options.showCoverageOnHover, r = this.options.zoomToBoundsOnClick, i = this.options.spiderfyOnEveryZoom;
				(t || r || i) && this.on("clusterclick clusterkeypress", this._zoomOrSpiderfy, this), n && (this.on("clustermouseover", this._showCoverage, this), this.on("clustermouseout", this._hideCoverage, this), e.on("zoomend", this._hideCoverage, this));
			},
			_zoomOrSpiderfy: function(e) {
				var t = e.layer, n = t;
				if (!(e.type === "clusterkeypress" && e.originalEvent && e.originalEvent.keyCode !== 13)) {
					for (; n._childClusters.length === 1;) n = n._childClusters[0];
					n._zoom === this._maxZoom && n._childCount === t._childCount && this.options.spiderfyOnMaxZoom ? t.spiderfy() : this.options.zoomToBoundsOnClick && t.zoomToBounds(), this.options.spiderfyOnEveryZoom && t.spiderfy(), e.originalEvent && e.originalEvent.keyCode === 13 && this._map._container.focus();
				}
			},
			_showCoverage: function(e) {
				var t = this._map;
				this._inZoomAnimation || (this._shownPolygon && t.removeLayer(this._shownPolygon), e.layer.getChildCount() > 2 && e.layer !== this._spiderfied && (this._shownPolygon = new L.Polygon(e.layer.getConvexHull(), this.options.polygonOptions), t.addLayer(this._shownPolygon)));
			},
			_hideCoverage: function() {
				this._shownPolygon &&= (this._map.removeLayer(this._shownPolygon), null);
			},
			_unbindEvents: function() {
				var e = this.options.spiderfyOnMaxZoom, t = this.options.showCoverageOnHover, n = this.options.zoomToBoundsOnClick, r = this.options.spiderfyOnEveryZoom, i = this._map;
				(e || n || r) && this.off("clusterclick clusterkeypress", this._zoomOrSpiderfy, this), t && (this.off("clustermouseover", this._showCoverage, this), this.off("clustermouseout", this._hideCoverage, this), i.off("zoomend", this._hideCoverage, this));
			},
			_zoomEnd: function() {
				this._map && (this._mergeSplitClusters(), this._zoom = Math.round(this._map._zoom), this._currentShownBounds = this._getExpandedVisibleBounds());
			},
			_moveEnd: function() {
				if (!this._inZoomAnimation) {
					var e = this._getExpandedVisibleBounds();
					this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), this._zoom, e), this._topClusterLevel._recursivelyAddChildrenToMap(null, Math.round(this._map._zoom), e), this._currentShownBounds = e;
				}
			},
			_generateInitialClusters: function() {
				var e = Math.ceil(this._map.getMaxZoom()), t = Math.floor(this._map.getMinZoom()), n = this.options.maxClusterRadius, r = n;
				typeof n != "function" && (r = function() {
					return n;
				}), this.options.disableClusteringAtZoom !== null && (e = this.options.disableClusteringAtZoom - 1), this._maxZoom = e, this._gridClusters = {}, this._gridUnclustered = {};
				for (var i = e; i >= t; i--) this._gridClusters[i] = new L.DistanceGrid(r(i)), this._gridUnclustered[i] = new L.DistanceGrid(r(i));
				this._topClusterLevel = new this._markerCluster(this, t - 1);
			},
			_addLayer: function(e, t) {
				var n = this._gridClusters, r = this._gridUnclustered, i = Math.floor(this._map.getMinZoom()), a, o;
				for (this.options.singleMarkerMode && this._overrideMarkerIcon(e), e.on(this._childMarkerEventHandlers, this); t >= i; t--) {
					a = this._map.project(e.getLatLng(), t);
					var s = n[t].getNearObject(a);
					if (s) {
						s._addChild(e), e.__parent = s;
						return;
					}
					if (s = r[t].getNearObject(a), s) {
						var c = s.__parent;
						c && this._removeLayer(s, !1);
						var l = new this._markerCluster(this, t, s, e);
						n[t].addObject(l, this._map.project(l._cLatLng, t)), s.__parent = l, e.__parent = l;
						var u = l;
						for (o = t - 1; o > c._zoom; o--) u = new this._markerCluster(this, o, u), n[o].addObject(u, this._map.project(s.getLatLng(), o));
						c._addChild(u), this._removeFromGridUnclustered(s, t);
						return;
					}
					r[t].addObject(e, a);
				}
				this._topClusterLevel._addChild(e), e.__parent = this._topClusterLevel;
			},
			_refreshClustersIcons: function() {
				this._featureGroup.eachLayer(function(e) {
					e instanceof L.MarkerCluster && e._iconNeedsUpdate && e._updateIcon();
				});
			},
			_enqueue: function(e) {
				this._queue.push(e), this._queueTimeout ||= setTimeout(L.bind(this._processQueue, this), 300);
			},
			_processQueue: function() {
				for (var e = 0; e < this._queue.length; e++) this._queue[e].call(this);
				this._queue.length = 0, clearTimeout(this._queueTimeout), this._queueTimeout = null;
			},
			_mergeSplitClusters: function() {
				var e = Math.round(this._map._zoom);
				this._processQueue(), this._zoom < e && this._currentShownBounds.intersects(this._getExpandedVisibleBounds()) ? (this._animationStart(), this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), this._zoom, this._getExpandedVisibleBounds()), this._animationZoomIn(this._zoom, e)) : this._zoom > e ? (this._animationStart(), this._animationZoomOut(this._zoom, e)) : this._moveEnd();
			},
			_getExpandedVisibleBounds: function() {
				return this.options.removeOutsideVisibleBounds ? L.Browser.mobile ? this._checkBoundsMaxLat(this._map.getBounds()) : this._checkBoundsMaxLat(this._map.getBounds().pad(1)) : this._mapBoundsInfinite;
			},
			_checkBoundsMaxLat: function(e) {
				var t = this._maxLat;
				return t !== void 0 && (e.getNorth() >= t && (e._northEast.lat = Infinity), e.getSouth() <= -t && (e._southWest.lat = -Infinity)), e;
			},
			_animationAddLayerNonAnimated: function(e, t) {
				if (t === e) this._featureGroup.addLayer(e);
				else if (t._childCount === 2) {
					t._addToMap();
					var n = t.getAllChildMarkers();
					this._featureGroup.removeLayer(n[0]), this._featureGroup.removeLayer(n[1]);
				} else t._updateIcon();
			},
			_extractNonGroupLayers: function(e, t) {
				var n = e.getLayers(), r = 0, i;
				for (t ||= []; r < n.length; r++) i = n[r], i instanceof L.LayerGroup ? this._extractNonGroupLayers(i, t) : t.push(i);
				return t;
			},
			_overrideMarkerIcon: function(e) {
				return e.options.icon = this.options.iconCreateFunction({
					getChildCount: function() {
						return 1;
					},
					getAllChildMarkers: function() {
						return [e];
					}
				});
			}
		});
		L.MarkerClusterGroup.include({ _mapBoundsInfinite: new L.LatLngBounds(new L.LatLng(-Infinity, -Infinity), new L.LatLng(Infinity, Infinity)) }), L.MarkerClusterGroup.include({
			_noAnimation: {
				_animationStart: function() {},
				_animationZoomIn: function(e, t) {
					this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), e), this._topClusterLevel._recursivelyAddChildrenToMap(null, t, this._getExpandedVisibleBounds()), this.fire("animationend");
				},
				_animationZoomOut: function(e, t) {
					this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), e), this._topClusterLevel._recursivelyAddChildrenToMap(null, t, this._getExpandedVisibleBounds()), this.fire("animationend");
				},
				_animationAddLayer: function(e, t) {
					this._animationAddLayerNonAnimated(e, t);
				}
			},
			_withAnimation: {
				_animationStart: function() {
					this._map._mapPane.className += " leaflet-cluster-anim", this._inZoomAnimation++;
				},
				_animationZoomIn: function(e, t) {
					var n = this._getExpandedVisibleBounds(), r = this._featureGroup, i = Math.floor(this._map.getMinZoom()), a;
					this._ignoreMove = !0, this._topClusterLevel._recursively(n, e, i, function(i) {
						var o = i._latlng, s = i._markers, c;
						for (n.contains(o) || (o = null), i._isSingleParent() && e + 1 === t ? (r.removeLayer(i), i._recursivelyAddChildrenToMap(null, t, n)) : (i.clusterHide(), i._recursivelyAddChildrenToMap(o, t, n)), a = s.length - 1; a >= 0; a--) c = s[a], n.contains(c._latlng) || r.removeLayer(c);
					}), this._forceLayout(), this._topClusterLevel._recursivelyBecomeVisible(n, t), r.eachLayer(function(e) {
						!(e instanceof L.MarkerCluster) && e._icon && e.clusterShow();
					}), this._topClusterLevel._recursively(n, e, t, function(e) {
						e._recursivelyRestoreChildPositions(t);
					}), this._ignoreMove = !1, this._enqueue(function() {
						this._topClusterLevel._recursively(n, e, i, function(e) {
							r.removeLayer(e), e.clusterShow();
						}), this._animationEnd();
					});
				},
				_animationZoomOut: function(e, t) {
					this._animationZoomOutSingle(this._topClusterLevel, e - 1, t), this._topClusterLevel._recursivelyAddChildrenToMap(null, t, this._getExpandedVisibleBounds()), this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), e, this._getExpandedVisibleBounds());
				},
				_animationAddLayer: function(e, t) {
					var n = this, r = this._featureGroup;
					r.addLayer(e), t !== e && (t._childCount > 2 ? (t._updateIcon(), this._forceLayout(), this._animationStart(), e._setPos(this._map.latLngToLayerPoint(t.getLatLng())), e.clusterHide(), this._enqueue(function() {
						r.removeLayer(e), e.clusterShow(), n._animationEnd();
					})) : (this._forceLayout(), n._animationStart(), n._animationZoomOutSingle(t, this._map.getMaxZoom(), this._zoom)));
				}
			},
			_animationZoomOutSingle: function(e, t, n) {
				var r = this._getExpandedVisibleBounds(), i = Math.floor(this._map.getMinZoom());
				e._recursivelyAnimateChildrenInAndAddSelfToMap(r, i, t + 1, n);
				var a = this;
				this._forceLayout(), e._recursivelyBecomeVisible(r, n), this._enqueue(function() {
					if (e._childCount === 1) {
						var o = e._markers[0];
						this._ignoreMove = !0, o.setLatLng(o.getLatLng()), this._ignoreMove = !1, o.clusterShow && o.clusterShow();
					} else e._recursively(r, n, i, function(e) {
						e._recursivelyRemoveChildrenFromMap(r, i, t + 1);
					});
					a._animationEnd();
				});
			},
			_animationEnd: function() {
				this._map && (this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", "")), this._inZoomAnimation--, this.fire("animationend");
			},
			_forceLayout: function() {
				L.Util.falseFn(document.body.offsetWidth);
			}
		}), L.markerClusterGroup = function(e) {
			return new L.MarkerClusterGroup(e);
		};
		var n = L.MarkerCluster = L.Marker.extend({
			options: L.Icon.prototype.options,
			initialize: function(e, t, n, r) {
				L.Marker.prototype.initialize.call(this, n ? n._cLatLng || n.getLatLng() : new L.LatLng(0, 0), {
					icon: this,
					pane: e.options.clusterPane
				}), this._group = e, this._zoom = t, this._markers = [], this._childClusters = [], this._childCount = 0, this._iconNeedsUpdate = !0, this._boundsNeedUpdate = !0, this._bounds = new L.LatLngBounds(), n && this._addChild(n), r && this._addChild(r);
			},
			getAllChildMarkers: function(e, t) {
				e ||= [];
				for (var n = this._childClusters.length - 1; n >= 0; n--) this._childClusters[n].getAllChildMarkers(e, t);
				for (var r = this._markers.length - 1; r >= 0; r--) t && this._markers[r].__dragStart || e.push(this._markers[r]);
				return e;
			},
			getChildCount: function() {
				return this._childCount;
			},
			zoomToBounds: function(e) {
				for (var t = this._childClusters.slice(), n = this._group._map, r = n.getBoundsZoom(this._bounds), i = this._zoom + 1, a = n.getZoom(), o; t.length > 0 && r > i;) {
					i++;
					var s = [];
					for (o = 0; o < t.length; o++) s = s.concat(t[o]._childClusters);
					t = s;
				}
				r > i ? this._group._map.setView(this._latlng, i) : r <= a ? this._group._map.setView(this._latlng, a + 1) : this._group._map.fitBounds(this._bounds, e);
			},
			getBounds: function() {
				var e = new L.LatLngBounds();
				return e.extend(this._bounds), e;
			},
			_updateIcon: function() {
				this._iconNeedsUpdate = !0, this._icon && this.setIcon(this);
			},
			createIcon: function() {
				return this._iconNeedsUpdate &&= (this._iconObj = this._group.options.iconCreateFunction(this), !1), this._iconObj.createIcon();
			},
			createShadow: function() {
				return this._iconObj.createShadow();
			},
			_addChild: function(e, t) {
				this._iconNeedsUpdate = !0, this._boundsNeedUpdate = !0, this._setClusterCenter(e), e instanceof L.MarkerCluster ? (t || (this._childClusters.push(e), e.__parent = this), this._childCount += e._childCount) : (t || this._markers.push(e), this._childCount++), this.__parent && this.__parent._addChild(e, !0);
			},
			_setClusterCenter: function(e) {
				this._cLatLng ||= e._cLatLng || e._latlng;
			},
			_resetBounds: function() {
				var e = this._bounds;
				e._southWest && (e._southWest.lat = Infinity, e._southWest.lng = Infinity), e._northEast && (e._northEast.lat = -Infinity, e._northEast.lng = -Infinity);
			},
			_recalculateBounds: function() {
				var e = this._markers, t = this._childClusters, n = 0, r = 0, i = this._childCount, a, o, s, c;
				if (i !== 0) {
					for (this._resetBounds(), a = 0; a < e.length; a++) s = e[a]._latlng, this._bounds.extend(s), n += s.lat, r += s.lng;
					for (a = 0; a < t.length; a++) o = t[a], o._boundsNeedUpdate && o._recalculateBounds(), this._bounds.extend(o._bounds), s = o._wLatLng, c = o._childCount, n += s.lat * c, r += s.lng * c;
					this._latlng = this._wLatLng = new L.LatLng(n / i, r / i), this._boundsNeedUpdate = !1;
				}
			},
			_addToMap: function(e) {
				e && (this._backupLatlng = this._latlng, this.setLatLng(e)), this._group._featureGroup.addLayer(this);
			},
			_recursivelyAnimateChildrenIn: function(e, t, n) {
				this._recursively(e, this._group._map.getMinZoom(), n - 1, function(e) {
					for (var n = e._markers, r = n.length - 1, i; r >= 0; r--) i = n[r], i._icon && (i._setPos(t), i.clusterHide());
				}, function(e) {
					for (var n = e._childClusters, r = n.length - 1, i; r >= 0; r--) i = n[r], i._icon && (i._setPos(t), i.clusterHide());
				});
			},
			_recursivelyAnimateChildrenInAndAddSelfToMap: function(e, t, n, r) {
				this._recursively(e, r, t, function(i) {
					i._recursivelyAnimateChildrenIn(e, i._group._map.latLngToLayerPoint(i.getLatLng()).round(), n), i._isSingleParent() && n - 1 === r ? (i.clusterShow(), i._recursivelyRemoveChildrenFromMap(e, t, n)) : i.clusterHide(), i._addToMap();
				});
			},
			_recursivelyBecomeVisible: function(e, t) {
				this._recursively(e, this._group._map.getMinZoom(), t, null, function(e) {
					e.clusterShow();
				});
			},
			_recursivelyAddChildrenToMap: function(e, t, n) {
				this._recursively(n, this._group._map.getMinZoom() - 1, t, function(r) {
					if (t !== r._zoom) for (var i = r._markers.length - 1; i >= 0; i--) {
						var a = r._markers[i];
						n.contains(a._latlng) && (e && (a._backupLatlng = a.getLatLng(), a.setLatLng(e), a.clusterHide && a.clusterHide()), r._group._featureGroup.addLayer(a));
					}
				}, function(t) {
					t._addToMap(e);
				});
			},
			_recursivelyRestoreChildPositions: function(e) {
				for (var t = this._markers.length - 1; t >= 0; t--) {
					var n = this._markers[t];
					n._backupLatlng && (n.setLatLng(n._backupLatlng), delete n._backupLatlng);
				}
				if (e - 1 === this._zoom) for (var r = this._childClusters.length - 1; r >= 0; r--) this._childClusters[r]._restorePosition();
				else for (var i = this._childClusters.length - 1; i >= 0; i--) this._childClusters[i]._recursivelyRestoreChildPositions(e);
			},
			_restorePosition: function() {
				this._backupLatlng && (this.setLatLng(this._backupLatlng), delete this._backupLatlng);
			},
			_recursivelyRemoveChildrenFromMap: function(e, t, n, r) {
				var i, a;
				this._recursively(e, t - 1, n - 1, function(e) {
					for (a = e._markers.length - 1; a >= 0; a--) i = e._markers[a], r && r.contains(i._latlng) || (e._group._featureGroup.removeLayer(i), i.clusterShow && i.clusterShow());
				}, function(e) {
					for (a = e._childClusters.length - 1; a >= 0; a--) i = e._childClusters[a], r && r.contains(i._latlng) || (e._group._featureGroup.removeLayer(i), i.clusterShow && i.clusterShow());
				});
			},
			_recursively: function(e, t, n, r, i) {
				var a = this._childClusters, o = this._zoom, s, c;
				if (t <= o && (r && r(this), i && o === n && i(this)), o < t || o < n) for (s = a.length - 1; s >= 0; s--) c = a[s], c._boundsNeedUpdate && c._recalculateBounds(), e.intersects(c._bounds) && c._recursively(e, t, n, r, i);
			},
			_isSingleParent: function() {
				return this._childClusters.length > 0 && this._childClusters[0]._childCount === this._childCount;
			}
		});
		L.Marker.include({
			clusterHide: function() {
				var e = this.options.opacity;
				return this.setOpacity(0), this.options.opacity = e, this;
			},
			clusterShow: function() {
				return this.setOpacity(this.options.opacity);
			}
		}), L.DistanceGrid = function(e) {
			this._cellSize = e, this._sqCellSize = e * e, this._grid = {}, this._objectPoint = {};
		}, L.DistanceGrid.prototype = {
			addObject: function(e, t) {
				var n = this._getCoord(t.x), r = this._getCoord(t.y), i = this._grid, a = i[r] = i[r] || {}, o = a[n] = a[n] || [], s = L.Util.stamp(e);
				this._objectPoint[s] = t, o.push(e);
			},
			updateObject: function(e, t) {
				this.removeObject(e), this.addObject(e, t);
			},
			removeObject: function(e, t) {
				var n = this._getCoord(t.x), r = this._getCoord(t.y), i = this._grid, a = i[r] = i[r] || {}, o = a[n] = a[n] || [], s, c;
				for (delete this._objectPoint[L.Util.stamp(e)], s = 0, c = o.length; s < c; s++) if (o[s] === e) return o.splice(s, 1), c === 1 && delete a[n], !0;
			},
			eachObject: function(e, t) {
				var n, r, i, a, o, s, c, l = this._grid;
				for (n in l) for (r in o = l[n], o) for (s = o[r], i = 0, a = s.length; i < a; i++) c = e.call(t, s[i]), c && (i--, a--);
			},
			getNearObject: function(e) {
				var t = this._getCoord(e.x), n = this._getCoord(e.y), r, i, a, o, s, c, l, u, d = this._objectPoint, f = this._sqCellSize, p = null;
				for (r = n - 1; r <= n + 1; r++) if (o = this._grid[r], o) {
					for (i = t - 1; i <= t + 1; i++) if (s = o[i], s) for (a = 0, c = s.length; a < c; a++) l = s[a], u = this._sqDist(d[L.Util.stamp(l)], e), (u < f || u <= f && p === null) && (f = u, p = l);
				}
				return p;
			},
			_getCoord: function(e) {
				var t = Math.floor(e / this._cellSize);
				return isFinite(t) ? t : e;
			},
			_sqDist: function(e, t) {
				var n = t.x - e.x, r = t.y - e.y;
				return n * n + r * r;
			}
		}, (function() {
			L.QuickHull = {
				getDistant: function(e, t) {
					var n = t[1].lat - t[0].lat;
					return (t[0].lng - t[1].lng) * (e.lat - t[0].lat) + n * (e.lng - t[0].lng);
				},
				findMostDistantPointFromBaseLine: function(e, t) {
					for (var n = 0, r = null, i = [], a = t.length - 1, o, s; a >= 0; a--) {
						if (o = t[a], s = this.getDistant(o, e), s > 0) i.push(o);
						else continue;
						s > n && (n = s, r = o);
					}
					return {
						maxPoint: r,
						newPoints: i
					};
				},
				buildConvexHull: function(e, t) {
					var n = [], r = this.findMostDistantPointFromBaseLine(e, t);
					return r.maxPoint ? (n = n.concat(this.buildConvexHull([e[0], r.maxPoint], r.newPoints)), n = n.concat(this.buildConvexHull([r.maxPoint, e[1]], r.newPoints)), n) : [e[0]];
				},
				getConvexHull: function(e) {
					for (var t = !1, n = !1, r = !1, i = !1, a = null, o = null, s = null, c = null, l = null, u = null, d = e.length - 1; d >= 0; d--) {
						var f = e[d];
						(t === !1 || f.lat > t) && (a = f, t = f.lat), (n === !1 || f.lat < n) && (o = f, n = f.lat), (r === !1 || f.lng > r) && (s = f, r = f.lng), (i === !1 || f.lng < i) && (c = f, i = f.lng);
					}
					return n === t ? (u = c, l = s) : (u = o, l = a), [].concat(this.buildConvexHull([u, l], e), this.buildConvexHull([l, u], e));
				}
			};
		})(), L.MarkerCluster.include({ getConvexHull: function() {
			for (var e = this.getAllChildMarkers(), t = [], n, r = e.length - 1; r >= 0; r--) n = e[r].getLatLng(), t.push(n);
			return L.QuickHull.getConvexHull(t);
		} }), L.MarkerCluster.include({
			_2PI: Math.PI * 2,
			_circleFootSeparation: 25,
			_circleStartAngle: 0,
			_spiralFootSeparation: 28,
			_spiralLengthStart: 11,
			_spiralLengthFactor: 5,
			_circleSpiralSwitchover: 9,
			spiderfy: function() {
				if (!(this._group._spiderfied === this || this._group._inZoomAnimation)) {
					var e = this.getAllChildMarkers(null, !0), t = this._group._map.latLngToLayerPoint(this._latlng), n;
					this._group._unspiderfy(), this._group._spiderfied = this, this._group.options.spiderfyShapePositions ? n = this._group.options.spiderfyShapePositions(e.length, t) : e.length >= this._circleSpiralSwitchover ? n = this._generatePointsSpiral(e.length, t) : (t.y += 10, n = this._generatePointsCircle(e.length, t)), this._animationSpiderfy(e, n);
				}
			},
			unspiderfy: function(e) {
				this._group._inZoomAnimation || (this._animationUnspiderfy(e), this._group._spiderfied = null);
			},
			_generatePointsCircle: function(e, t) {
				var n = this._group.options.spiderfyDistanceMultiplier * this._circleFootSeparation * (2 + e) / this._2PI, r = this._2PI / e, i = [], a, o;
				for (n = Math.max(n, 35), i.length = e, a = 0; a < e; a++) o = this._circleStartAngle + a * r, i[a] = new L.Point(t.x + n * Math.cos(o), t.y + n * Math.sin(o))._round();
				return i;
			},
			_generatePointsSpiral: function(e, t) {
				var n = this._group.options.spiderfyDistanceMultiplier, r = n * this._spiralLengthStart, i = n * this._spiralFootSeparation, a = n * this._spiralLengthFactor * this._2PI, o = 0, s = [], c;
				for (s.length = e, c = e; c >= 0; c--) c < e && (s[c] = new L.Point(t.x + r * Math.cos(o), t.y + r * Math.sin(o))._round()), o += i / r + c * 5e-4, r += a / o;
				return s;
			},
			_noanimationUnspiderfy: function() {
				var e = this._group, t = e._map, n = e._featureGroup, r = this.getAllChildMarkers(null, !0), i, a;
				for (e._ignoreMove = !0, this.setOpacity(1), a = r.length - 1; a >= 0; a--) i = r[a], n.removeLayer(i), i._preSpiderfyLatlng && (i.setLatLng(i._preSpiderfyLatlng), delete i._preSpiderfyLatlng), i.setZIndexOffset && i.setZIndexOffset(0), i._spiderLeg && (t.removeLayer(i._spiderLeg), delete i._spiderLeg);
				e.fire("unspiderfied", {
					cluster: this,
					markers: r
				}), e._ignoreMove = !1, e._spiderfied = null;
			}
		}), L.MarkerClusterNonAnimated = L.MarkerCluster.extend({
			_animationSpiderfy: function(e, t) {
				var n = this._group, r = n._map, i = n._featureGroup, a = this._group.options.spiderLegPolylineOptions, o, s, c, l;
				for (n._ignoreMove = !0, o = 0; o < e.length; o++) l = r.layerPointToLatLng(t[o]), s = e[o], c = new L.Polyline([this._latlng, l], a), r.addLayer(c), s._spiderLeg = c, s._preSpiderfyLatlng = s._latlng, s.setLatLng(l), s.setZIndexOffset && s.setZIndexOffset(1e6), i.addLayer(s);
				this.setOpacity(.3), n._ignoreMove = !1, n.fire("spiderfied", {
					cluster: this,
					markers: e
				});
			},
			_animationUnspiderfy: function() {
				this._noanimationUnspiderfy();
			}
		}), L.MarkerCluster.include({
			_animationSpiderfy: function(e, t) {
				var n = this, r = this._group, i = r._map, a = r._featureGroup, o = this._latlng, s = i.latLngToLayerPoint(o), c = L.Path.SVG, l = L.extend({}, this._group.options.spiderLegPolylineOptions), u = l.opacity, d, f, p, m, h, g;
				for (u === void 0 && (u = L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity), c ? (l.opacity = 0, l.className = (l.className || "") + " leaflet-cluster-spider-leg") : l.opacity = u, r._ignoreMove = !0, d = 0; d < e.length; d++) f = e[d], g = i.layerPointToLatLng(t[d]), p = new L.Polyline([o, g], l), i.addLayer(p), f._spiderLeg = p, c && (m = p._path, h = m.getTotalLength() + .1, m.style.strokeDasharray = h, m.style.strokeDashoffset = h), f.setZIndexOffset && f.setZIndexOffset(1e6), f.clusterHide && f.clusterHide(), a.addLayer(f), f._setPos && f._setPos(s);
				for (r._forceLayout(), r._animationStart(), d = e.length - 1; d >= 0; d--) g = i.layerPointToLatLng(t[d]), f = e[d], f._preSpiderfyLatlng = f._latlng, f.setLatLng(g), f.clusterShow && f.clusterShow(), c && (p = f._spiderLeg, m = p._path, m.style.strokeDashoffset = 0, p.setStyle({ opacity: u }));
				this.setOpacity(.3), r._ignoreMove = !1, setTimeout(function() {
					r._animationEnd(), r.fire("spiderfied", {
						cluster: n,
						markers: e
					});
				}, 200);
			},
			_animationUnspiderfy: function(e) {
				var t = this, n = this._group, r = n._map, i = n._featureGroup, a = e ? r._latLngToNewLayerPoint(this._latlng, e.zoom, e.center) : r.latLngToLayerPoint(this._latlng), o = this.getAllChildMarkers(null, !0), s = L.Path.SVG, c, l, u, d, f, p;
				for (n._ignoreMove = !0, n._animationStart(), this.setOpacity(1), l = o.length - 1; l >= 0; l--) c = o[l], c._preSpiderfyLatlng && (c.closePopup(), c.setLatLng(c._preSpiderfyLatlng), delete c._preSpiderfyLatlng, p = !0, c._setPos && (c._setPos(a), p = !1), c.clusterHide && (c.clusterHide(), p = !1), p && i.removeLayer(c), s && (u = c._spiderLeg, d = u._path, f = d.getTotalLength() + .1, d.style.strokeDashoffset = f, u.setStyle({ opacity: 0 })));
				n._ignoreMove = !1, setTimeout(function() {
					var e = 0;
					for (l = o.length - 1; l >= 0; l--) c = o[l], c._spiderLeg && e++;
					for (l = o.length - 1; l >= 0; l--) c = o[l], c._spiderLeg && (c.clusterShow && c.clusterShow(), c.setZIndexOffset && c.setZIndexOffset(0), e > 1 && i.removeLayer(c), r.removeLayer(c._spiderLeg), delete c._spiderLeg);
					n._animationEnd(), n.fire("unspiderfied", {
						cluster: t,
						markers: o
					});
				}, 200);
			}
		}), L.MarkerClusterGroup.include({
			_spiderfied: null,
			unspiderfy: function() {
				this._unspiderfy.apply(this, arguments);
			},
			_spiderfierOnAdd: function() {
				this._map.on("click", this._unspiderfyWrapper, this), this._map.options.zoomAnimation && this._map.on("zoomstart", this._unspiderfyZoomStart, this), this._map.on("zoomend", this._noanimationUnspiderfy, this), L.Browser.touch || this._map.getRenderer(this);
			},
			_spiderfierOnRemove: function() {
				this._map.off("click", this._unspiderfyWrapper, this), this._map.off("zoomstart", this._unspiderfyZoomStart, this), this._map.off("zoomanim", this._unspiderfyZoomAnim, this), this._map.off("zoomend", this._noanimationUnspiderfy, this), this._noanimationUnspiderfy();
			},
			_unspiderfyZoomStart: function() {
				this._map && this._map.on("zoomanim", this._unspiderfyZoomAnim, this);
			},
			_unspiderfyZoomAnim: function(e) {
				L.DomUtil.hasClass(this._map._mapPane, "leaflet-touching") || (this._map.off("zoomanim", this._unspiderfyZoomAnim, this), this._unspiderfy(e));
			},
			_unspiderfyWrapper: function() {
				this._unspiderfy();
			},
			_unspiderfy: function(e) {
				this._spiderfied && this._spiderfied.unspiderfy(e);
			},
			_noanimationUnspiderfy: function() {
				this._spiderfied && this._spiderfied._noanimationUnspiderfy();
			},
			_unspiderfyLayer: function(e) {
				e._spiderLeg && (this._featureGroup.removeLayer(e), e.clusterShow && e.clusterShow(), e.setZIndexOffset && e.setZIndexOffset(0), this._map.removeLayer(e._spiderLeg), delete e._spiderLeg);
			}
		}), L.MarkerClusterGroup.include({
			refreshClusters: function(e) {
				return e ? e instanceof L.MarkerClusterGroup ? e = e._topClusterLevel.getAllChildMarkers() : e instanceof L.LayerGroup ? e = e._layers : e instanceof L.MarkerCluster ? e = e.getAllChildMarkers() : e instanceof L.Marker && (e = [e]) : e = this._topClusterLevel.getAllChildMarkers(), this._flagParentsIconsNeedUpdate(e), this._refreshClustersIcons(), this.options.singleMarkerMode && this._refreshSingleMarkerModeMarkers(e), this;
			},
			_flagParentsIconsNeedUpdate: function(e) {
				var t, n;
				for (t in e) for (n = e[t].__parent; n;) n._iconNeedsUpdate = !0, n = n.__parent;
			},
			_refreshSingleMarkerModeMarkers: function(e) {
				var t, n;
				for (t in e) n = e[t], this.hasLayer(n) && n.setIcon(this._overrideMarkerIcon(n));
			}
		}), L.Marker.include({ refreshIconOptions: function(e, t) {
			var n = this.options.icon;
			return L.setOptions(n, e), this.setIcon(n), t && this.__parent && this.__parent._group.refreshClusters(this), this;
		} }), e.MarkerClusterGroup = t, e.MarkerCluster = n, Object.defineProperty(e, "__esModule", { value: !0 });
	});
})), $ = /* @__PURE__ */ e(jl(), 1);
Ml(), Nl();
// assets/src/maps-engines/LeafletMapEngine.ts
var Pl = $.default.TileLayer.extend({ createTile: function(e, t) {
	let n = document.createElement("img");
	return n.alt = "", n.setAttribute("role", "presentation"), fetch(this.getTileUrl(e), { referrer: location.origin + "/" }).then((e) => {
		if (!e.ok) throw Error("Tile " + e.status);
		return e.blob();
	}).then((e) => {
		n.onload = () => {
			URL.revokeObjectURL(n.src), t(void 0, n);
		}, n.src = URL.createObjectURL(e);
	}).catch((e) => t(e, n)), n;
} });
function Fl(e, t) {
	return /^https?:$/.test(location.protocol) ? $.default.tileLayer(e, t) : new Pl(e, t);
}
var Il = class {
	constructor() {
		this.Bounds = [], this.lng = null, this.map = null, this.EventSelectChart = null, this.Polylines = [], this.CurrentPositionMarker = null, this.CurrentGPSPositionMarker = null;
	}
	init(e, t, n, r, i) {
		this.map = $.default.map(e, {
			scrollWheelZoom: n,
			zoomControl: !1
		}), $.default.control.zoom({ position: "topright" }).addTo(this.map), this.map.addControl(new $.default.Control.FullScreen({ position: "topright" })), this.map.on("enterFullscreen", () => this.map?.scrollWheelZoom.enable()), this.map.on("exitFullscreen", () => n ? this.map?.scrollWheelZoom.enable() : this.map?.scrollWheelZoom.disable());
		let a = "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors", o = r != null && (r + "").length > 0, s = {
			OSM1: {
				name: "Open Street Map",
				url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
				attribution: a,
				maxZoom: 19
			},
			OSM7: {
				name: "Humanitarian Map Style",
				url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
				attribution: a + ", tiles by <a href=\"https://www.hotosm.org/\">HOT</a>"
			},
			OSM9: {
				name: "OpenTopoMap",
				url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
				attribution: a + ", <a href=\"https://opentopomap.org\">OpenTopoMap</a> (CC-BY-SA)",
				maxZoom: 17
			},
			OSM11: {
				name: "GSI Map (Japan)",
				url: "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
				attribution: "&copy; <a href=\"https://maps.gsi.go.jp/development/ichiran.html\">国土地理院</a>"
			},
			OSM12: {
				name: "CyclOSM",
				url: "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
				attribution: a + ", <a href=\"https://www.cyclosm.org\">CyclOSM</a>"
			}
		}, c = {
			OSM2: "OSM12",
			OSM3: "OSM1",
			OSM4: "OSM1",
			OSM5: "OSM1",
			OSM6: "OSM1",
			OSM10: "OSM1"
		};
		if (o) {
			let e = encodeURIComponent(r + "");
			[
				[
					"OSM2",
					"Thunderforest - Cycle",
					"cycle"
				],
				[
					"OSM3",
					"Thunderforest - Outdoors",
					"outdoors"
				],
				[
					"OSM4",
					"Thunderforest - Transport",
					"transport"
				],
				[
					"OSM5",
					"Thunderforest - Landscape",
					"landscape"
				]
			].forEach(([t, n, r]) => {
				s[t] = {
					name: n,
					url: "https://tile.thunderforest.com/" + r + "/{z}/{x}/{y}.png?apikey=" + e,
					attribution: "Maps &copy; <a href=\"https://www.thunderforest.com/\">Thunderforest</a>, &copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors",
					maxZoom: 22
				}, delete c[t];
			});
		}
		let l = {};
		Object.keys(s).forEach((e) => {
			let t = s[e];
			l[t.name] = Fl(t.url, {
				maxZoom: t.maxZoom || 18,
				attribution: t.attribution
			});
		});
		let u = Fl("https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png", {
			maxZoom: 18,
			attribution: "Sea marks &copy; <a href=\"https://www.openseamap.org/\">OpenSeaMap</a> contributors"
		}), d = { "Open Sea Map": u };
		l[s[s[t] ? t : c[t] || "OSM1"].name].addTo(this.map), t == "OSM10" && u.addTo(this.map), $.default.control.layers(l, d, { position: "topright" }).addTo(this.map);
	}
	AppPolylines(e, t, n, a, o) {
		if (this.map != null) {
			var s = r.Utils.GetItemFromArray(e, 0);
			if (s != null) {
				(n == "" || n == null) && (n = i);
				var c = $.default.marker($.default.latLng(s), {
					icon: $.default.icon({
						iconUrl: n,
						iconSize: [32, 32],
						iconAnchor: [16, 16]
					}),
					title: this.lng?.currentPosition
				});
				c.addTo(this.map), this.CurrentPositionMarker = c;
				var l = r.Utils.DividePolylinesPoints(e);
				this.lng, this.EventSelectChart, this.Bounds = e.filter((e) => e != null), this.CenterMap();
				for (let e = 0; e < l.length; e++) {
					let n = "";
					n = e < t.length ? t[e] : t[t.length - 1];
					try {
						let t = $.default.polyline(l[e], { color: n }).addTo(this.map);
						this.Polylines.push(t);
						let r = this;
						this.Polylines[e].on("mousemove", function(e) {
							r.MoveMarkerToPosition([e.latlng.lat, e.latlng.lng], !0);
						});
					} catch {}
				}
				if (a != "") {
					let t = e[0];
					t != null && $.default.marker($.default.latLng(t), {
						icon: $.default.icon({
							iconUrl: a + "",
							iconSize: [32, 32],
							iconAnchor: [16, 16]
						}),
						title: "Start"
					}).addTo(this.map);
				}
				if (o != "" && e[e.length - 1] != null) {
					let t = e[e.length - 1];
					t != null && $.default.marker($.default.latLng(t), {
						icon: $.default.icon({
							iconUrl: o + "",
							iconSize: [32, 32],
							iconAnchor: [16, 16]
						}),
						title: "End"
					}).addTo(this.map);
				}
			}
		}
	}
	SetCurrentGPSPosition(e, t, n) {
		this.CurrentGPSPositionMarker == null ? (t == "" && (t = i), this.map != null && (this.CurrentGPSPositionMarker = $.default.marker(e, { icon: $.default.icon({
			iconUrl: t,
			iconSize: [32, 32],
			iconAnchor: [16, 16]
		}) }).addTo(this.map).bindPopup(n.currentPosition).openPopup())) : this.CurrentGPSPositionMarker.setLatLng(e), this.Bounds.push(e), this.CenterMap();
	}
	AddWaypoints(e, t) {
		var r = $.default.icon({
			iconUrl: n,
			iconSize: [32, 32],
			iconAnchor: [16, 16]
		});
		t && (r = $.default.icon({
			iconUrl: t,
			iconSize: [32, 32],
			iconAnchor: [16, 16]
		}));
		for (let t = 0; t < e.length; t++) {
			var i = e[t];
			this.Bounds.push([i.lat, i.lon]);
			var a = i.lat, o = i.lon;
			i.sym, i.type, i.img && (r.iconUrl = i.img + "");
			var s = $.default.marker([a, o], { icon: r }), c = "";
			c = i.name == "" ? "<div>" + i.desc + "</div>" : "<div><b>" + i.name + "</b><br />" + i.desc + "</div>", c += "<br /><p><a href='https://maps.google.com?daddr=" + a + "," + o + "' target='_blank'>Itin&eacute;raire</a></p>", this.map != null && s.addTo(this.map).bindPopup(c);
		}
		this.CenterMap();
	}
	MoveMarkerToPosition(e, t) {
		this.CurrentPositionMarker != null && (this.CurrentPositionMarker.setLatLng(e), this.lng && this.CurrentPositionMarker.setTooltipContent(this.lng.currentPosition), t == 1 && this.EventSelectChart && this.EventSelectChart(e));
	}
	AddHtmlMarker(e, t, n) {
		if (this.map == null) return;
		let r = t.offsetWidth || parseInt(t.style.width) || 16;
		$.default.marker($.default.latLng(e), {
			icon: $.default.divIcon({
				html: t,
				className: "wpgpxmaps-html-marker",
				iconSize: [r, r],
				iconAnchor: [r / 2, r / 2]
			}),
			title: n ?? "",
			interactive: !!n
		}).addTo(this.map);
	}
	CenterMap() {
		try {
			if (this.Bounds && this.Bounds.length > 0) {
				let n = {
					minLat: Infinity,
					maxLat: -Infinity,
					minLng: Infinity,
					maxLng: -Infinity
				};
				this.Bounds.forEach((e) => {
					if (!Array.isArray(e) || e.length !== 2) throw Error("Each coordinate must be an array with [latitude, longitude].");
					let [t, r] = e;
					n.minLat = Math.min(n.minLat, t), n.maxLat = Math.max(n.maxLat, t), n.minLng = Math.min(n.minLng, r), n.maxLng = Math.max(n.maxLng, r);
				});
				var e = new $.default.LatLng(n.minLat, n.minLng), t = new $.default.LatLng(n.maxLat, n.maxLng);
				this.map?.fitBounds(new $.default.LatLngBounds(e, t));
			}
		} catch (e) {
			console.log(e);
		}
	}
	AddPhotos(e) {
		for (let t of e) {
			let e = $.default.marker(t, {
				icon: $.default.divIcon($.default.extend({
					html: "<div style=\"background-image: url(&quot;" + r.Utils.SafeImageUrl(t.thumbnail) + "&quot;);\"></div>",
					className: "leaflet-marker-photo"
				}, t, { iconSize: [40, 40] })),
				title: t.caption || ""
			});
			e.bindPopup("<img src=\"" + r.Utils.SafeImageUrl(t.url) + "\" alt=\"\" /><p>" + r.Utils.EscapeHtml(t.name) + "</p>", { minWidth: 500 }), e.addTo(this.map);
		}
	}
}, Ll = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=", Rl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABSCAMAAAAhFXfZAAAC91BMVEVMaXEzeak2f7I4g7g3g7cua5gzeKg8hJo3grY4g7c3grU0gLI2frE0daAubJc2gbQwd6QzeKk2gLMtd5sxdKIua5g1frA2f7IydaM0e6w2fq41fK01eqo3grgubJgta5cxdKI1f7AydaQydaMxc6EubJgvbJkwcZ4ubZkwcJwubZgubJcydqUydKIxapgubJctbJcubZcubJcvbJYubJcvbZkubJctbJctbZcubJg2f7AubJcrbZcubJcubJcua5g3grY0fq8ubJcubJdEkdEwhsw6i88vhswuhcsuhMtBjMgthMsrg8srgss6is8qgcs8i9A9iMYtg8spgcoogMo7hcMngMonf8olfso4gr8kfck5iM8jfMk4iM8he8k1fro7itAgesk2hs8eecgzfLcofssdeMg0hc4cd8g2hcsxeLQbdsgZdcgxeLImfcszhM0vda4xgckzhM4xg84wf8Yxgs4udKsvfcQucqhUndROmdM1fK0wcZ8vb5w0eqpQm9MzeKhXoNVcpdYydKNWn9VZotVKltJFjsIwcJ1Rms9OlslLmtH///8+kc9epdYzd6dbo9VHkMM2f7FHmNBClM8ydqVcpNY9hro3gLM9hLczealQmcw3fa46f7A8gLMxc6I3eagyc6FIldJMl9JSnNRSntNNl9JPnNJFi75UnM9ZodVKksg8kM45jc09e6ZHltFBk883gbRBh7pDk9EwcaBzn784g7dKkcY2i81Om9M7j85Llc81is09g7Q4grY/j9A0eqxKmdFFltBEjcXf6fFImdBCiLxJl9FGlNFBi78yiMxVndEvbpo6js74+vx+psPP3+o/ks5HkcpGmNCjwdZCkNDM3ehYoNJEls+lxNkxh8xHks0+jdC1zd5Lg6r+/v/H2ufz9/o3jM3t8/edvdM/k89Th61OiLBSjbZklbaTt9BfptdjmL1AicBHj8hGk9FAgK1dkLNTjLRekrdClc/k7fM0icy0y9tgp9c4jc2NtM9Dlc8zicxeXZn3AAAAQ3RSTlMAHDdTb4yPA+LtnEQmC4L2EmHqB7XA0d0sr478x4/Yd5i1zOfyPkf1sLVq4Nh3FvjxopQ2/STNuFzUwFIwxKaejILpIBEV9wAABhVJREFUeF6s1NdyFEcYBeBeoQIhRAkLlRDGrhIgY3BJL8CVeKzuyXFzzjkn5ZxzzuScg3PO8cKzu70JkO0LfxdTU//pM9vTu7Xgf6KqOVTb9X7toRrVEfBf1HTVjZccrT/2by1VV928Yty9ZbVuucdz90frG8DBjl9pVApbOstvmMuvVgaNXSfAAd6pGxpy6yxf5ph43pS/4f3uoaGm2rdu72S9xzOvMymkZFq/ptDrk90mhW7e4zl7HLzhxGWPR20xmSxJ/VqldG5m9XhaVOA1DadsNh3Pu5L2N6QtPO/32JpqQBVVk20oy/Pi2s23WEvyfHbe1thadVQttvm7Llf65gGmXK67XtupyoM7HQhmXdLS8oGWJNeOJ3C5fG5XCEJnkez3/oFdsvgJ4l2ANZwhrJKk/7OSXa+3Vw2WJMlKnGkobouYk6T0TyX30klOUnTD9HJ5qpckL3EW/w4XF3Xd0FGywXUrstrclVsqz5Pd/sXFYyDnPdrLcQODmGOK47IZb4CmibmMn+MYRzFZ5jg33ZL/EJrWcszHmANy3ARBK/IXtciJy8VsitPSdE3uuHxzougojcUdr8/32atnz/ev3f/K5wtpxUTpcaI45zusVDpYtZi+jg0oU9b3x74h7+n9ABvYEZeKaVq0sh0AtLKsFtqNBdeT0MrSzwwlq9+x6xAO4tgOtSzbCjrNQQiNvQUbUEubvzBUeGw26yDCsRHCoLkTHDa7IdOLIThs/gHvChszh2CimE8peRs47cxANI0lYNB5y1DljpOF0IhzBDPOZnDOqYYbeGKECbPzWnXludPphw5c2YBq5zlwXphIbO4VDCZ0gnPfUO1TwZoYwAs2ExPCedAu9DAjfQUjzITQb3jNj0KG2Sgt6BHaQUdYzWz+XmBktOHwanXjaSTcwwziBcuMOtwBmqPrTOxFQR/DRKKPqyur0aiW6cULYsx6tBm0jXpR/AUWR6HRq9WVW6MRhIq5jLyjbaCTDCijyYJNpCajdyobP/eTw0iexBAKkJ3gA5KcQb2zBXsIBckn+xVv8jkZSaEFHE+jFEleAEfayRU0MouNoBmB/L50Ai/HSLIHxcrpCvnhSQAuakKp2C/YbCylJjXRVy/z3+Kv/RrNcCo+WUzlVEhzKffnTQnxeN9fWF88fiNCUdSTsaufaChKWInHeysygfpIqagoakW+vV20J8uyl6TyNKEZWV4oRSPyCkWpgOLSbkCObT8o2r6tlG58HQquf6O0v50tB7JM7F4EORd2dx/K0w/KHsVkLPaoYrwgP/y7krr3SSMA4zj+OBgmjYkxcdIJQyQRKgg2viX9Hddi9UBb29LrKR7CVVEEEXWojUkXNyfTNDE14W9gbHJNuhjDettN3ZvbOvdOqCD3Jp/9l+/wJE+9PkYGjx/fqkys3S2rMozM/o2106rfMUINo6hVqz+eu/hd1c4xTg0TAfy5kV+4UG6+IthHTU9woWmxuKNbTfuCSfovBCxq7EtHqvYL4Sm6F8GVxsSXHMQ07TOi1DKtZxjWaaIyi4CXWjxPccUw8WVbMYY5wxC1mzEyXMJWkllpRloi+Kkoq69sxBTlElF6aAxYUbjXNlhlDZilDnM4U5SlN5biRsRHnbx3mbeWjEh4mEyiuJDl5XcWVmX5GvNkFgLWZM5qwsop4/AWfLhU1cR7k1VVvcYCWRkOI6Xy5gmnphCYIkvzuNYzHzosq2oNk2RtSs8khfUOfHIDgR6ysYBaMpl4uEgk2U/oJTs9AaTSwma7dT69geAE2ZpEjUsn2ieJNHeKfrI3EcAGJ2ZaNgVuC8EBctCLc57P5u5led6IOBkIYkuQMrmmjChs4VkfOerHqSBkPzZlhe06RslZ3zMjk2sscqKwY0RcjKK+LWbzd7KiHhkncs/siFJ+V5eXxD34B8nVuJEpGJNmxN2gH3vSvp7J70tF+D1Ej8qUJD1TkErAND2GZwTFg/LubvmgiBG3SOvdlsqFQrkEzJCL1rstlnVFROixZoDDSuXQFHESwVGlcuQcMb/b42NgjLowh5MTDFE3vNB5qStRIErdCQEh6pLPR92anSUb/wAIhldAaDMpGgAAAABJRU5ErkJggg==", zl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC", Bl = {};
async function Vl(e) {
	e == "mapbox" && !Bl.mapbox ? Bl.mapbox = (await import("./MapBoxMapEngine-BWld3jZ0.js")).MapBoxMapEngine : e == "maplibre" && !Bl.maplibre && (Bl.maplibre = (await import("./MapLibreMapEngine-DaIQt6gi.js")).MapLibreMapEngine);
}
delete $.default.Icon.Default.prototype._getIconUrl, $.default.Icon.Default.mergeOptions({
	iconUrl: Ll,
	iconRetinaUrl: Rl,
	shadowUrl: zl
});
var Hl = "1", Ul = "2", Wl = "3", Gl = "4", Kl = "5", ql = "6", Jl = "5", Yl = "4", Xl = "3", Zl = "2", Ql = "1", $l = class {
	constructor(e) {
		this.map = null, this.myChart = null, this.params = e, this.init();
	}
	init() {
		let { targetId: e, mapType: t, mapData: n, graphDist: i, graphEle: a, graphSpeed: o, graphHr: s, graphAtemp: c, graphCad: l, graphGrade: u, waypoints: d, unit: f, unitspeed: p, color1: m, color2: h, color3: g, color4: _, color5: v, color6: y, color7: b, chartFrom1: x, chartTo1: S, chartFrom2: C, chartTo2: w, startIcon: T, waypointIcon: E, endIcon: ee, currentIcon: te, zoomOnScrollWheel: ne, langs: D, pluginUrl: re, usegpsposition: O, currentpositioncon: ie, TFApiKey: k } = this.params;
		var A = [], ae = {
			suf: "",
			dec: 0
		}, j = {
			suf: "",
			dec: 0
		}, M = {
			suf: "",
			dec: 0
		}, N = {
			suf: "%",
			dec: 1
		}, P = {
			suf: "",
			dec: 0
		}, oe = {
			suf: "",
			dec: 0
		}, se = document.getElementById("wpgpxmaps_" + e), ce = document.getElementById("map_" + e), le = document.getElementById("myChart_" + e);
		if (document.getElementById("report_" + e), document.getElementById("wpgpxmaps_" + e + "_osm_footer"), ce == null) return;
		let ue = this, de = Bl[this.params.MapEngine] ? this.params.MapEngine : "leaflet";
		this.map = de == "leaflet" ? new Il() : new Bl[de](), this.map.init(ce, t, ne == "true", k, this.params), this.map.EventSelectChart = function(e) {
			let t = ue.myChart;
			if (t) {
				let r = ue.getClosestIndex(n, e[0], e[1]), i = t.data.datasets.map((e, t) => ({
					datasetIndex: t,
					index: r
				})).filter((e) => {
					let n = t.getDatasetMeta(e.datasetIndex).data[r];
					return n && !isNaN(n.x) && !isNaN(n.y);
				});
				if (i.length > 0) {
					let e = t.getDatasetMeta(i[0].datasetIndex).data[r];
					t.setActiveElements(i), t.tooltip?.setActiveElements(i, {
						x: e.x,
						y: e.y
					}), t.update("none");
				}
			}
		}, O == "true" && navigator.geolocation && navigator.geolocation.watchPosition(function(e) {
			e.coords.accuracy / 2;
			var t = [e.coords.latitude, e.coords.longitude];
			this.map.SetCurrentGPSPosition([t[0], t[1]], ie, D);
		}, function(e) {}, {
			enableHighAccuracy: !1,
			timeout: 5e3,
			maximumAge: 0
		}), d != null && d.length > 0 && this.map.AddWaypoints(d, E);
		let fe = document.getElementById("ngimages_" + e);
		fe?.setAttribute("style", "display:block;position:absolute;left:-50000px");
		var pe = fe?.querySelectorAll("span");
		if (pe && pe.length > 0) {
			for (var me = [], he = 0; he < pe.length; he++) {
				var ge = pe[he], F = ge.children[0], I = [Number(ge.getAttribute("lat")), Number(ge.getAttribute("lon"))];
				this.map.Bounds.push(I), me.push({
					lat: I[0],
					lng: I[1],
					name: F.children[0].getAttribute("alt"),
					image_id: F.getAttribute("data-image-id"),
					url: F.getAttribute("href"),
					thumbnail: F.children[0].getAttribute("src")
				});
			}
			me.length > 0 && this.map.AddPhotos(me);
		}
		let { colorBy: R, colorData: z } = this.params;
		if (n && R && z && z.length === n.length) {
			let t = r.Utils.TrackColorScale(R, z), i = r.Utils.SplitTrackByColor(n, z, t.colorOf);
			this.map.AppPolylines(i.mapData, i.colors, te, T, ee);
			let [a, o] = {
				grade: [D.grade, "%"],
				speed: [D.speed, " " + ({
					0: "m/s",
					1: "km/h",
					2: "mi/h",
					3: "min/km",
					4: "min/mi",
					5: "knots",
					6: "min/100m"
				}[p] ?? "m/s")],
				hr: [D.heartRate, " bpm"],
				elevation: [D.altitude, f === Hl || f === Kl ? " ft" : " m"]
			}[R] ?? [R, ""], s = +(R === "speed"), c = document.getElementById("map_" + e + "_cont");
			c && r.Utils.AddTrackLegend(c, a, t.stops, (R === "grade" ? "≤" : "") + t.min.toFixed(s) + o, (R === "grade" ? "≥" : "") + t.max.toFixed(s) + o);
		} else if (n) {
			this.map.AppPolylines(n, m, te, T, ee);
			let { trackNames: t, trackColors: i } = this.params, a = document.getElementById("map_" + e + "_cont");
			a && t && t.length > 1 && i && i.length && r.Utils.AddTracksLegend(a, t, i);
		}
		let _e = (n || []).filter((e) => e !== null);
		if (_e.length > 1) {
			this.params.startEnd !== !1 && !T && this.map.AddHtmlMarker(_e[0], r.Utils.MarkerElement("", "#16a34a", 16), D.start ?? "Start"), this.params.startEnd !== !1 && !ee && this.map.AddHtmlMarker(_e[_e.length - 1], r.Utils.MarkerElement("", "#dc2626", 16), D.finish ?? "Finish");
			let e = Number(this.params.kmMarkers) || 0;
			if (e > 0) {
				let t = f === Hl || f === Gl, i = f === Wl || f === Kl, a = t ? 1609.344 : i ? 1852 : 1e3, o = t ? " mi" : i ? " NM" : " km";
				for (let t of r.Utils.DistanceMarkers(n, e, a)) this.map.AddHtmlMarker(t.point, r.Utils.MarkerElement(String(t.value), "#1f2937", 22), t.value + o);
			}
		}
		var B = this.map;
		let ve = null, ye = se?.parentElement;
		for (; ye != null;) {
			if (ye.classList.contains("wordpress-post-tabs") && ye.classList.contains("tab-pane")) {
				ve = ye;
				break;
			}
			ye = ye.parentElement;
		}
		if (ve) {
			var V = function(e) {
				setTimeout(function(e) {
					B.map?.invalidateSize(), B.CenterMap();
				}, 300);
			};
			document.querySelector(".wpsm_nav-tabs a")?.addEventListener("click", V, !1), ve.querySelector("div > ul > li > a")?.addEventListener("click", V, !1);
		}
		var H = le?.style.height;
		let be = (e) => Array.isArray(e) && e.length > 0;
		if (be(i) && (be(a) || be(o) || be(s) || be(c) || be(l) || be(u)) && H != "0px" && H != "0") {
			i.length, Hl == f ? (j = {
				suf: "mi",
				dec: 1
			}, M = {
				suf: "ft",
				dec: 0
			}) : Ul == f ? (j = {
				suf: "km",
				dec: 1
			}, M = {
				suf: "m",
				dec: 0
			}) : Wl == f ? (j = {
				suf: "NM",
				dec: 1
			}, M = {
				suf: "m",
				dec: 0
			}) : Gl == f ? (j = {
				suf: "mi",
				dec: 1
			}, M = {
				suf: "m",
				dec: 0
			}) : Kl == f ? (j = {
				suf: "NM",
				dec: 1
			}, M = {
				suf: "ft",
				dec: 0
			}) : (j = {
				suf: "m",
				dec: 0
			}, M = {
				suf: "m",
				dec: 0
			});
			var xe = 1111.1.toLocaleString(), Se = xe.length, Ce = xe.substring(Se - 2, Se - 1), we = xe.substring(1, 2);
			Ce == "1" && (Ce = "."), we == "1" && (we = ""), ko.register(...Al);
			var Te = {
				type: "line",
				data: { datasets: [] },
				options: {
					animation: {},
					hover: {},
					interaction: {
						intersect: !1,
						mode: "index"
					},
					scales: { xAxe: {
						type: "linear",
						min: 0,
						max: i[i.length - 1],
						ticks: { callback: function(e, t, n) {
							return parseFloat(e + "").toFixed(j.dec) + j.suf;
						} }
					} },
					plugins: { tooltip: {
						position: "average",
						mode: "index",
						intersect: !1,
						callbacks: {
							title: function(e) {
								return e[0].parsed.x.toFixed(j.dec) + " " + j.suf;
							},
							label: function(e) {
								var t = A[e.datasetIndex].label_y, n = e.parsed.y;
								return n === null || isNaN(n) ? "" : (e.dataset.label || "") + ": " + n.toFixed(t.dec) + " " + t.suf;
							},
							footer: function(e) {
								var t = e[0].dataIndex, i = r.Utils.GetItemFromArray(n, t);
								i && B.MoveMarkerToPosition(i, !1);
							}
						}
					} }
				}
			};
			let t = 1;
			if (a && a.length > 0) {
				var Ee = this.mergeArrayForChart(i, a);
				let e, n;
				e = x == "" ? Ee.Min : parseFloat(x), n = S == "" ? Ee.Max : parseFloat(S);
				var De = "yaxis" + t++, Oe = {
					type: "linear",
					max: n,
					min: e,
					ticks: { callback(e, t, n) {
						return parseFloat(e + "").toFixed(M.dec) + M.suf;
					} }
				};
				(Te.options?.scales)[De] = Oe, A.push({
					label_x: j,
					label_y: M
				}), Te.data.datasets.push({
					...this.wpgpxmapsGetDataset(D.altitude, Ee.Items, h, De),
					fill: "start"
				});
			}
			if (o && o.length > 0) {
				ae = ql == p ? {
					suf: "min/100m",
					dec: 2
				} : Jl == p ? {
					suf: "knots",
					dec: 2
				} : Yl == p ? {
					suf: "min/mi",
					dec: 2
				} : Xl == p ? {
					suf: "min/km",
					dec: 2
				} : Zl == p ? {
					suf: "mi/h",
					dec: 0
				} : Ql == p ? {
					suf: "km/h",
					dec: 0
				} : {
					suf: "m/s",
					dec: 0
				};
				var Ee = this.mergeArrayForChart(i, o);
				let e = {
					type: "linear",
					ticks: { callback(e, t, n) {
						return parseFloat(e + "").toFixed(ae.dec) + ae.suf;
					} },
					position: "right"
				};
				e.min = C == "" ? Ee.Min : parseFloat(C), e.max = w == "" ? Ee.Max : parseFloat(w), A.push({
					label_x: j,
					label_y: ae
				});
				var De = "yaxis" + t++;
				(Te.options?.scales)[De] = e, Te.data.datasets.push(this.wpgpxmapsGetDataset(D.speed, Ee.Items, g, De));
			}
			if (s && s.length > 0) {
				var Ee = this.mergeArrayForChart(i, s), Oe = {
					type: "linear",
					ticks: { callback(e, t, n) {
						return parseFloat(e + "").toFixed(P.dec) + P.suf;
					} },
					position: "right"
				}, De = "yaxis" + t++;
				(Te.options?.scales)[De] = Oe, Te.data.datasets.push(this.wpgpxmapsGetDataset(D.heartRate, Ee.Items, _, De)), A.push({
					label_x: j,
					label_y: P
				});
			}
			if (c && c.length > 0) {
				var Ee = this.mergeArrayForChart(i, c), Oe = {
					type: "linear",
					ticks: { callback(e, t, n) {
						return parseFloat(e + "").toFixed(1) + "°C";
					} },
					position: "right"
				}, De = "yaxis" + t++;
				(Te.options?.scales)[De] = Oe, Te.data.datasets.push(this.wpgpxmapsGetDataset(D.atemp, Ee.Items, b, De)), A.push({
					label_x: j,
					label_y: {
						suf: "°C",
						dec: 1
					}
				});
			}
			if (l && l.length > 0) {
				var Ee = this.mergeArrayForChart(i, l, !0), Oe = {
					type: "linear",
					ticks: { callback(e, t, n) {
						return parseFloat(e + "").toFixed(oe.dec) + oe.suf;
					} },
					position: "right"
				}, De = "yaxis" + t++;
				(Te.options?.scales)[De] = Oe, Te.data.datasets.push(this.wpgpxmapsGetDataset(D.cadence, Ee.Items, v, De)), A.push({
					label_x: j,
					label_y: oe
				});
			}
			if (u && u.length > 0 && r.Utils.calculateGrade(a, i.slice(1)), u && u.length > 0) {
				var Ee = this.mergeArrayForChart(i, u), Oe = {
					type: "linear",
					ticks: { callback: function(e, t, n) {
						return parseFloat(e + "").toFixed(N.dec) + N.suf;
					} },
					position: "right"
				};
				A.push({
					label_x: j,
					label_y: N
				});
				var De = "yaxis" + t++;
				(Te.options?.scales)[De] = Oe, Te.data.datasets.push(this.wpgpxmapsGetDataset(D.grade, Ee.Items, y, De));
			}
			Te.plugins = [{
				id: "wpgpxmapsCrosshair",
				afterDatasetsDraw(e) {
					let t = e.tooltip?.getActiveElements();
					if (!t || t.length === 0) return;
					let n = t[0].element.x, { top: r, bottom: i } = e.chartArea, a = e.ctx;
					a.save(), a.strokeStyle = "rgba(0, 0, 0, 0.35)", a.lineWidth = 1, a.beginPath(), a.moveTo(n, r), a.lineTo(n, i), a.stroke(), a.restore();
				}
			}];
			var ke = document.getElementById("myChart_" + e)?.getContext("2d");
			ke && (this.myChart = new ko(ke, Te));
		} else le?.style.setProperty("display", "none");
		return ce.ownerDocument.dispatchEvent(new CustomEvent("wpgpxmaps:ready", { detail: {
			apiVersion: 1,
			instance: this,
			targetId: e,
			engine: de,
			map: this.map?.map ?? null,
			chart: this.myChart,
			container: se,
			params: this.params
		} })), this;
	}
	mergeArrayForChart(e, t, n) {
		let r = e.length, i = Array(r), a = 1e4, o = -1e4, s = 0;
		for (let c = 0; c < r; c++) if (e[c] != null) {
			let r = t[c];
			n === !0 && r === 0 && (r = null), i[c] = {
				x: e[c],
				y: r
			}, s = e[c], r > o && (o = r), r < a && (a = r);
		} else i[c] = {
			x: s,
			y: null
		};
		return {
			Items: i,
			Min: a,
			Max: o
		};
	}
	wpgpxmapsGetDataset(e, t, n, r) {
		return {
			label: e,
			data: t,
			borderColor: n,
			backgroundColor: this.hexToRgbA(n, .3),
			pointRadius: 0,
			borderWidth: 1,
			pointHoverRadius: 1,
			yAxisID: r
		};
	}
	hexToRgbA(e, t) {
		let n;
		if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(e)) return n = e.substring(1).split(""), n.length == 3 && (n = [
			n[0],
			n[0],
			n[1],
			n[1],
			n[2],
			n[2]
		]), n = "0x" + n.join(""), "rgba(" + [
			n >> 16 & 255,
			n >> 8 & 255,
			n & 255
		].join(",") + "," + t + ")";
		throw Error("Bad Hex");
	}
	getItemFromArray(e, t) {
		try {
			return e[t];
		} catch {
			return [0, 0];
		}
	}
	getClosestIndex(e, t, n) {
		let r = 1e4, i = 0;
		for (let a = 0; a < e.length; a++) {
			if (e[a] === null) continue;
			let o = this.wpgpxmapsDist(e[a][0], e[a][1], t, n);
			o < r && (i = a, r = o);
		}
		return i;
	}
	getClosestImage(e, t, n) {
		let r = 1e4, i, a = document.getElementById("ngimages_" + n);
		if (a == null) return;
		let o = a.getElementsByTagName("span");
		for (let n = 0; n < o.length; n++) {
			let a = o[n].getAttribute("lat"), s = o[n].getAttribute("lon");
			if (a == null || s == null) return;
			a = a.replace(",", "."), s = s.replace(",", ".");
			let c = this.wpgpxmapsDist(parseFloat(a), parseFloat(s), e, t);
			c < r && (i = o[n], r = c);
		}
		return i;
	}
	isNumeric(e) {
		return /^-{0,1}\d*\.{0,1}\d+$/.test(e);
	}
	wpgpxmapsDist(e, t, n, r) {
		let i = n - e, a = r - t;
		return Math.sqrt(i * i + a * a);
	}
}, eu = $.default;
export { eu as Leaflet, $l as WPGPXMaps, Vl as loadMapEngine };
