var Ac = Object.defineProperty;
var Oc = (n, t, e) => t in n ? Ac(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var z = (n, t, e) => (Oc(n, typeof t != "symbol" ? t + "" : t, e), e);
/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */
function Ln(n) {
  return n + 0.5 | 0;
}
const ze = (n, t, e) => Math.max(Math.min(n, e), t);
function sn(n) {
  return ze(Ln(n * 2.55), 0, 255);
}
function Ne(n) {
  return ze(Ln(n * 255), 0, 255);
}
function ke(n) {
  return ze(Ln(n / 2.55) / 100, 0, 1);
}
function ta(n) {
  return ze(Ln(n * 100), 0, 100);
}
const ne = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Po = [..."0123456789ABCDEF"], Ec = (n) => Po[n & 15], Ic = (n) => Po[(n & 240) >> 4] + Po[n & 15], Qn = (n) => (n & 240) >> 4 === (n & 15), Dc = (n) => Qn(n.r) && Qn(n.g) && Qn(n.b) && Qn(n.a);
function zc(n) {
  var t = n.length, e;
  return n[0] === "#" && (t === 4 || t === 5 ? e = {
    r: 255 & ne[n[1]] * 17,
    g: 255 & ne[n[2]] * 17,
    b: 255 & ne[n[3]] * 17,
    a: t === 5 ? ne[n[4]] * 17 : 255
  } : (t === 7 || t === 9) && (e = {
    r: ne[n[1]] << 4 | ne[n[2]],
    g: ne[n[3]] << 4 | ne[n[4]],
    b: ne[n[5]] << 4 | ne[n[6]],
    a: t === 9 ? ne[n[7]] << 4 | ne[n[8]] : 255
  })), e;
}
const Bc = (n, t) => n < 255 ? t(n) : "";
function Rc(n) {
  var t = Dc(n) ? Ec : Ic;
  return n ? "#" + t(n.r) + t(n.g) + t(n.b) + Bc(n.a, t) : void 0;
}
const Fc = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Sl(n, t, e) {
  const s = t * Math.min(e, 1 - e), r = (o, a = (o + n / 30) % 12) => e - s * Math.max(Math.min(a - 3, 9 - a, 1), -1);
  return [r(0), r(8), r(4)];
}
function Nc(n, t, e) {
  const s = (r, o = (r + n / 60) % 6) => e - e * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [s(5), s(3), s(1)];
}
function Zc(n, t, e) {
  const s = Sl(n, 1, 0.5);
  let r;
  for (t + e > 1 && (r = 1 / (t + e), t *= r, e *= r), r = 0; r < 3; r++)
    s[r] *= 1 - t - e, s[r] += t;
  return s;
}
function Hc(n, t, e, s, r) {
  return n === r ? (t - e) / s + (t < e ? 6 : 0) : t === r ? (e - n) / s + 2 : (n - t) / s + 4;
}
function Ho(n) {
  const e = n.r / 255, s = n.g / 255, r = n.b / 255, o = Math.max(e, s, r), a = Math.min(e, s, r), h = (o + a) / 2;
  let c, d, p;
  return o !== a && (p = o - a, d = h > 0.5 ? p / (2 - o - a) : p / (o + a), c = Hc(e, s, r, p, o), c = c * 60 + 0.5), [c | 0, d || 0, h];
}
function Wo(n, t, e, s) {
  return (Array.isArray(t) ? n(t[0], t[1], t[2]) : n(t, e, s)).map(Ne);
}
function Vo(n, t, e) {
  return Wo(Sl, n, t, e);
}
function Wc(n, t, e) {
  return Wo(Zc, n, t, e);
}
function Vc(n, t, e) {
  return Wo(Nc, n, t, e);
}
function Cl(n) {
  return (n % 360 + 360) % 360;
}
function jc(n) {
  const t = Fc.exec(n);
  let e = 255, s;
  if (!t)
    return;
  t[5] !== s && (e = t[6] ? sn(+t[5]) : Ne(+t[5]));
  const r = Cl(+t[2]), o = +t[3] / 100, a = +t[4] / 100;
  return t[1] === "hwb" ? s = Wc(r, o, a) : t[1] === "hsv" ? s = Vc(r, o, a) : s = Vo(r, o, a), {
    r: s[0],
    g: s[1],
    b: s[2],
    a: e
  };
}
function Uc(n, t) {
  var e = Ho(n);
  e[0] = Cl(e[0] + t), e = Vo(e), n.r = e[0], n.g = e[1], n.b = e[2];
}
function Gc(n) {
  if (!n)
    return;
  const t = Ho(n), e = t[0], s = ta(t[1]), r = ta(t[2]);
  return n.a < 255 ? `hsla(${e}, ${s}%, ${r}%, ${ke(n.a)})` : `hsl(${e}, ${s}%, ${r}%)`;
}
const ea = {
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
}, ia = {
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
function Yc() {
  const n = {}, t = Object.keys(ia), e = Object.keys(ea);
  let s, r, o, a, h;
  for (s = 0; s < t.length; s++) {
    for (a = h = t[s], r = 0; r < e.length; r++)
      o = e[r], h = h.replace(o, ea[o]);
    o = parseInt(ia[a], 16), n[h] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return n;
}
let ts;
function qc(n) {
  ts || (ts = Yc(), ts.transparent = [0, 0, 0, 0]);
  const t = ts[n.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const Xc = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Kc(n) {
  const t = Xc.exec(n);
  let e = 255, s, r, o;
  if (t) {
    if (t[7] !== s) {
      const a = +t[7];
      e = t[8] ? sn(a) : ze(a * 255, 0, 255);
    }
    return s = +t[1], r = +t[3], o = +t[5], s = 255 & (t[2] ? sn(s) : ze(s, 0, 255)), r = 255 & (t[4] ? sn(r) : ze(r, 0, 255)), o = 255 & (t[6] ? sn(o) : ze(o, 0, 255)), {
      r: s,
      g: r,
      b: o,
      a: e
    };
  }
}
function Jc(n) {
  return n && (n.a < 255 ? `rgba(${n.r}, ${n.g}, ${n.b}, ${ke(n.a)})` : `rgb(${n.r}, ${n.g}, ${n.b})`);
}
const ho = (n) => n <= 31308e-7 ? n * 12.92 : Math.pow(n, 1 / 2.4) * 1.055 - 0.055, Si = (n) => n <= 0.04045 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
function $c(n, t, e) {
  const s = Si(ke(n.r)), r = Si(ke(n.g)), o = Si(ke(n.b));
  return {
    r: Ne(ho(s + e * (Si(ke(t.r)) - s))),
    g: Ne(ho(r + e * (Si(ke(t.g)) - r))),
    b: Ne(ho(o + e * (Si(ke(t.b)) - o))),
    a: n.a + e * (t.a - n.a)
  };
}
function es(n, t, e) {
  if (n) {
    let s = Ho(n);
    s[t] = Math.max(0, Math.min(s[t] + s[t] * e, t === 0 ? 360 : 1)), s = Vo(s), n.r = s[0], n.g = s[1], n.b = s[2];
  }
}
function Tl(n, t) {
  return n && Object.assign(t || {}, n);
}
function na(n) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(n) ? n.length >= 3 && (t = { r: n[0], g: n[1], b: n[2], a: 255 }, n.length > 3 && (t.a = Ne(n[3]))) : (t = Tl(n, { r: 0, g: 0, b: 0, a: 1 }), t.a = Ne(t.a)), t;
}
function Qc(n) {
  return n.charAt(0) === "r" ? Kc(n) : jc(n);
}
class gn {
  constructor(t) {
    if (t instanceof gn)
      return t;
    const e = typeof t;
    let s;
    e === "object" ? s = na(t) : e === "string" && (s = zc(t) || qc(t) || Qc(t)), this._rgb = s, this._valid = !!s;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Tl(this._rgb);
    return t && (t.a = ke(t.a)), t;
  }
  set rgb(t) {
    this._rgb = na(t);
  }
  rgbString() {
    return this._valid ? Jc(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? Rc(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Gc(this._rgb) : void 0;
  }
  mix(t, e) {
    if (t) {
      const s = this.rgb, r = t.rgb;
      let o;
      const a = e === o ? 0.5 : e, h = 2 * a - 1, c = s.a - r.a, d = ((h * c === -1 ? h : (h + c) / (1 + h * c)) + 1) / 2;
      o = 1 - d, s.r = 255 & d * s.r + o * r.r + 0.5, s.g = 255 & d * s.g + o * r.g + 0.5, s.b = 255 & d * s.b + o * r.b + 0.5, s.a = a * s.a + (1 - a) * r.a, this.rgb = s;
    }
    return this;
  }
  interpolate(t, e) {
    return t && (this._rgb = $c(this._rgb, t._rgb, e)), this;
  }
  clone() {
    return new gn(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = Ne(t), this;
  }
  clearer(t) {
    const e = this._rgb;
    return e.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, e = Ln(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
    return t.r = t.g = t.b = e, this;
  }
  opaquer(t) {
    const e = this._rgb;
    return e.a *= 1 + t, this;
  }
  negate() {
    const t = this._rgb;
    return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this;
  }
  lighten(t) {
    return es(this._rgb, 2, t), this;
  }
  darken(t) {
    return es(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return es(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return es(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return Uc(this._rgb, t), this;
  }
}
/*!
 * Chart.js v4.4.7
 * https://www.chartjs.org
 * (c) 2024 Chart.js Contributors
 * Released under the MIT License
 */
function Le() {
}
const tu = (() => {
  let n = 0;
  return () => n++;
})();
function rt(n) {
  return n == null;
}
function vt(n) {
  if (Array.isArray && Array.isArray(n))
    return !0;
  const t = Object.prototype.toString.call(n);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function nt(n) {
  return n !== null && Object.prototype.toString.call(n) === "[object Object]";
}
function St(n) {
  return (typeof n == "number" || n instanceof Number) && isFinite(+n);
}
function Xt(n, t) {
  return St(n) ? n : t;
}
function X(n, t) {
  return typeof n > "u" ? t : n;
}
const eu = (n, t) => typeof n == "string" && n.endsWith("%") ? parseFloat(n) / 100 : +n / t, Al = (n, t) => typeof n == "string" && n.endsWith("%") ? parseFloat(n) / 100 * t : +n;
function mt(n, t, e) {
  if (n && typeof n.call == "function")
    return n.apply(e, t);
}
function ft(n, t, e, s) {
  let r, o, a;
  if (vt(n))
    if (o = n.length, s)
      for (r = o - 1; r >= 0; r--)
        t.call(e, n[r], r);
    else
      for (r = 0; r < o; r++)
        t.call(e, n[r], r);
  else if (nt(n))
    for (a = Object.keys(n), o = a.length, r = 0; r < o; r++)
      t.call(e, n[a[r]], a[r]);
}
function Ms(n, t) {
  let e, s, r, o;
  if (!n || !t || n.length !== t.length)
    return !1;
  for (e = 0, s = n.length; e < s; ++e)
    if (r = n[e], o = t[e], r.datasetIndex !== o.datasetIndex || r.index !== o.index)
      return !1;
  return !0;
}
function Ps(n) {
  if (vt(n))
    return n.map(Ps);
  if (nt(n)) {
    const t = /* @__PURE__ */ Object.create(null), e = Object.keys(n), s = e.length;
    let r = 0;
    for (; r < s; ++r)
      t[e[r]] = Ps(n[e[r]]);
    return t;
  }
  return n;
}
function Ol(n) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(n) === -1;
}
function iu(n, t, e, s) {
  if (!Ol(n))
    return;
  const r = t[n], o = e[n];
  nt(r) && nt(o) ? mn(r, o, s) : t[n] = Ps(o);
}
function mn(n, t, e) {
  const s = vt(t) ? t : [
    t
  ], r = s.length;
  if (!nt(n))
    return n;
  e = e || {};
  const o = e.merger || iu;
  let a;
  for (let h = 0; h < r; ++h) {
    if (a = s[h], !nt(a))
      continue;
    const c = Object.keys(a);
    for (let d = 0, p = c.length; d < p; ++d)
      o(c[d], n, a, e);
  }
  return n;
}
function cn(n, t) {
  return mn(n, t, {
    merger: nu
  });
}
function nu(n, t, e) {
  if (!Ol(n))
    return;
  const s = t[n], r = e[n];
  nt(s) && nt(r) ? cn(s, r) : Object.prototype.hasOwnProperty.call(t, n) || (t[n] = Ps(r));
}
const sa = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (n) => n,
  // default resolvers
  x: (n) => n.x,
  y: (n) => n.y
};
function su(n) {
  const t = n.split("."), e = [];
  let s = "";
  for (const r of t)
    s += r, s.endsWith("\\") ? s = s.slice(0, -1) + "." : (e.push(s), s = "");
  return e;
}
function ou(n) {
  const t = su(n);
  return (e) => {
    for (const s of t) {
      if (s === "")
        break;
      e = e && e[s];
    }
    return e;
  };
}
function Ze(n, t) {
  return (sa[t] || (sa[t] = ou(t)))(n);
}
function jo(n) {
  return n.charAt(0).toUpperCase() + n.slice(1);
}
const _n = (n) => typeof n < "u", He = (n) => typeof n == "function", oa = (n, t) => {
  if (n.size !== t.size)
    return !1;
  for (const e of n)
    if (!t.has(e))
      return !1;
  return !0;
};
function ru(n) {
  return n.type === "mouseup" || n.type === "click" || n.type === "contextmenu";
}
const bt = Math.PI, yt = 2 * bt, au = yt + bt, ks = Number.POSITIVE_INFINITY, lu = bt / 180, At = bt / 2, ei = bt / 4, ra = bt * 2 / 3, Be = Math.log10, _e = Math.sign;
function un(n, t, e) {
  return Math.abs(n - t) < e;
}
function aa(n) {
  const t = Math.round(n);
  n = un(n, t, n / 1e3) ? t : n;
  const e = Math.pow(10, Math.floor(Be(n))), s = n / e;
  return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 5 ? 5 : 10) * e;
}
function hu(n) {
  const t = [], e = Math.sqrt(n);
  let s;
  for (s = 1; s < e; s++)
    n % s === 0 && (t.push(s), t.push(n / s));
  return e === (e | 0) && t.push(e), t.sort((r, o) => r - o).pop(), t;
}
function Oi(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function cu(n, t) {
  const e = Math.round(n);
  return e - t <= n && e + t >= n;
}
function El(n, t, e) {
  let s, r, o;
  for (s = 0, r = n.length; s < r; s++)
    o = n[s][e], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function ae(n) {
  return n * (bt / 180);
}
function Uo(n) {
  return n * (180 / bt);
}
function la(n) {
  if (!St(n))
    return;
  let t = 1, e = 0;
  for (; Math.round(n * t) / t !== n; )
    t *= 10, e++;
  return e;
}
function Il(n, t) {
  const e = t.x - n.x, s = t.y - n.y, r = Math.sqrt(e * e + s * s);
  let o = Math.atan2(s, e);
  return o < -0.5 * bt && (o += yt), {
    angle: o,
    distance: r
  };
}
function ko(n, t) {
  return Math.sqrt(Math.pow(t.x - n.x, 2) + Math.pow(t.y - n.y, 2));
}
function uu(n, t) {
  return (n - t + au) % yt - bt;
}
function Jt(n) {
  return (n % yt + yt) % yt;
}
function vn(n, t, e, s) {
  const r = Jt(n), o = Jt(t), a = Jt(e), h = Jt(o - r), c = Jt(a - r), d = Jt(r - o), p = Jt(r - a);
  return r === o || r === a || s && o === a || h > c && d < p;
}
function Rt(n, t, e) {
  return Math.max(t, Math.min(e, n));
}
function du(n) {
  return Rt(n, -32768, 32767);
}
function Ce(n, t, e, s = 1e-6) {
  return n >= Math.min(t, e) - s && n <= Math.max(t, e) + s;
}
function Go(n, t, e) {
  e = e || ((a) => n[a] < t);
  let s = n.length - 1, r = 0, o;
  for (; s - r > 1; )
    o = r + s >> 1, e(o) ? r = o : s = o;
  return {
    lo: r,
    hi: s
  };
}
const Te = (n, t, e, s) => Go(n, e, s ? (r) => {
  const o = n[r][t];
  return o < e || o === e && n[r + 1][t] === e;
} : (r) => n[r][t] < e), fu = (n, t, e) => Go(n, e, (s) => n[s][t] >= e);
function pu(n, t, e) {
  let s = 0, r = n.length;
  for (; s < r && n[s] < t; )
    s++;
  for (; r > s && n[r - 1] > e; )
    r--;
  return s > 0 || r < n.length ? n.slice(s, r) : n;
}
const Dl = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function gu(n, t) {
  if (n._chartjs) {
    n._chartjs.listeners.push(t);
    return;
  }
  Object.defineProperty(n, "_chartjs", {
    configurable: !0,
    enumerable: !1,
    value: {
      listeners: [
        t
      ]
    }
  }), Dl.forEach((e) => {
    const s = "_onData" + jo(e), r = n[e];
    Object.defineProperty(n, e, {
      configurable: !0,
      enumerable: !1,
      value(...o) {
        const a = r.apply(this, o);
        return n._chartjs.listeners.forEach((h) => {
          typeof h[s] == "function" && h[s](...o);
        }), a;
      }
    });
  });
}
function ha(n, t) {
  const e = n._chartjs;
  if (!e)
    return;
  const s = e.listeners, r = s.indexOf(t);
  r !== -1 && s.splice(r, 1), !(s.length > 0) && (Dl.forEach((o) => {
    delete n[o];
  }), delete n._chartjs);
}
function zl(n) {
  const t = new Set(n);
  return t.size === n.length ? n : Array.from(t);
}
const Bl = function() {
  return typeof window > "u" ? function(n) {
    return n();
  } : window.requestAnimationFrame;
}();
function Rl(n, t) {
  let e = [], s = !1;
  return function(...r) {
    e = r, s || (s = !0, Bl.call(window, () => {
      s = !1, n.apply(t, e);
    }));
  };
}
function mu(n, t) {
  let e;
  return function(...s) {
    return t ? (clearTimeout(e), e = setTimeout(n, t, s)) : n.apply(this, s), t;
  };
}
const Yo = (n) => n === "start" ? "left" : n === "end" ? "right" : "center", Zt = (n, t, e) => n === "start" ? t : n === "end" ? e : (t + e) / 2, _u = (n, t, e, s) => n === (s ? "left" : "right") ? e : n === "center" ? (t + e) / 2 : t;
function Fl(n, t, e) {
  const s = t.length;
  let r = 0, o = s;
  if (n._sorted) {
    const { iScale: a, _parsed: h } = n, c = a.axis, { min: d, max: p, minDefined: g, maxDefined: _ } = a.getUserBounds();
    g && (r = Rt(Math.min(
      // @ts-expect-error Need to type _parsed
      Te(h, c, d).lo,
      // @ts-expect-error Need to fix types on _lookupByKey
      e ? s : Te(t, c, a.getPixelForValue(d)).lo
    ), 0, s - 1)), _ ? o = Rt(Math.max(
      // @ts-expect-error Need to type _parsed
      Te(h, a.axis, p, !0).hi + 1,
      // @ts-expect-error Need to fix types on _lookupByKey
      e ? 0 : Te(t, c, a.getPixelForValue(p), !0).hi + 1
    ), r, s) - r : o = s - r;
  }
  return {
    start: r,
    count: o
  };
}
function Nl(n) {
  const { xScale: t, yScale: e, _scaleRanges: s } = n, r = {
    xmin: t.min,
    xmax: t.max,
    ymin: e.min,
    ymax: e.max
  };
  if (!s)
    return n._scaleRanges = r, !0;
  const o = s.xmin !== t.min || s.xmax !== t.max || s.ymin !== e.min || s.ymax !== e.max;
  return Object.assign(s, r), o;
}
const is = (n) => n === 0 || n === 1, ca = (n, t, e) => -(Math.pow(2, 10 * (n -= 1)) * Math.sin((n - t) * yt / e)), ua = (n, t, e) => Math.pow(2, -10 * n) * Math.sin((n - t) * yt / e) + 1, dn = {
  linear: (n) => n,
  easeInQuad: (n) => n * n,
  easeOutQuad: (n) => -n * (n - 2),
  easeInOutQuad: (n) => (n /= 0.5) < 1 ? 0.5 * n * n : -0.5 * (--n * (n - 2) - 1),
  easeInCubic: (n) => n * n * n,
  easeOutCubic: (n) => (n -= 1) * n * n + 1,
  easeInOutCubic: (n) => (n /= 0.5) < 1 ? 0.5 * n * n * n : 0.5 * ((n -= 2) * n * n + 2),
  easeInQuart: (n) => n * n * n * n,
  easeOutQuart: (n) => -((n -= 1) * n * n * n - 1),
  easeInOutQuart: (n) => (n /= 0.5) < 1 ? 0.5 * n * n * n * n : -0.5 * ((n -= 2) * n * n * n - 2),
  easeInQuint: (n) => n * n * n * n * n,
  easeOutQuint: (n) => (n -= 1) * n * n * n * n + 1,
  easeInOutQuint: (n) => (n /= 0.5) < 1 ? 0.5 * n * n * n * n * n : 0.5 * ((n -= 2) * n * n * n * n + 2),
  easeInSine: (n) => -Math.cos(n * At) + 1,
  easeOutSine: (n) => Math.sin(n * At),
  easeInOutSine: (n) => -0.5 * (Math.cos(bt * n) - 1),
  easeInExpo: (n) => n === 0 ? 0 : Math.pow(2, 10 * (n - 1)),
  easeOutExpo: (n) => n === 1 ? 1 : -Math.pow(2, -10 * n) + 1,
  easeInOutExpo: (n) => is(n) ? n : n < 0.5 ? 0.5 * Math.pow(2, 10 * (n * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (n * 2 - 1)) + 2),
  easeInCirc: (n) => n >= 1 ? n : -(Math.sqrt(1 - n * n) - 1),
  easeOutCirc: (n) => Math.sqrt(1 - (n -= 1) * n),
  easeInOutCirc: (n) => (n /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - n * n) - 1) : 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1),
  easeInElastic: (n) => is(n) ? n : ca(n, 0.075, 0.3),
  easeOutElastic: (n) => is(n) ? n : ua(n, 0.075, 0.3),
  easeInOutElastic(n) {
    return is(n) ? n : n < 0.5 ? 0.5 * ca(n * 2, 0.1125, 0.45) : 0.5 + 0.5 * ua(n * 2 - 1, 0.1125, 0.45);
  },
  easeInBack(n) {
    return n * n * ((1.70158 + 1) * n - 1.70158);
  },
  easeOutBack(n) {
    return (n -= 1) * n * ((1.70158 + 1) * n + 1.70158) + 1;
  },
  easeInOutBack(n) {
    let t = 1.70158;
    return (n /= 0.5) < 1 ? 0.5 * (n * n * (((t *= 1.525) + 1) * n - t)) : 0.5 * ((n -= 2) * n * (((t *= 1.525) + 1) * n + t) + 2);
  },
  easeInBounce: (n) => 1 - dn.easeOutBounce(1 - n),
  easeOutBounce(n) {
    return n < 1 / 2.75 ? 7.5625 * n * n : n < 2 / 2.75 ? 7.5625 * (n -= 1.5 / 2.75) * n + 0.75 : n < 2.5 / 2.75 ? 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375 : 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375;
  },
  easeInOutBounce: (n) => n < 0.5 ? dn.easeInBounce(n * 2) * 0.5 : dn.easeOutBounce(n * 2 - 1) * 0.5 + 0.5
};
function qo(n) {
  if (n && typeof n == "object") {
    const t = n.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function da(n) {
  return qo(n) ? n : new gn(n);
}
function co(n) {
  return qo(n) ? n : new gn(n).saturate(0.5).darken(0.1).hexString();
}
const vu = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], yu = [
  "color",
  "borderColor",
  "backgroundColor"
];
function bu(n) {
  n.set("animation", {
    delay: void 0,
    duration: 1e3,
    easing: "easeOutQuart",
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0
  }), n.describe("animation", {
    _fallback: !1,
    _indexable: !1,
    _scriptable: (t) => t !== "onProgress" && t !== "onComplete" && t !== "fn"
  }), n.set("animations", {
    colors: {
      type: "color",
      properties: yu
    },
    numbers: {
      type: "number",
      properties: vu
    }
  }), n.describe("animations", {
    _fallback: "animation"
  }), n.set("transitions", {
    active: {
      animation: {
        duration: 400
      }
    },
    resize: {
      animation: {
        duration: 0
      }
    },
    show: {
      animations: {
        colors: {
          from: "transparent"
        },
        visible: {
          type: "boolean",
          duration: 0
        }
      }
    },
    hide: {
      animations: {
        colors: {
          to: "transparent"
        },
        visible: {
          type: "boolean",
          easing: "linear",
          fn: (t) => t | 0
        }
      }
    }
  });
}
function xu(n) {
  n.set("layout", {
    autoPadding: !0,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
}
const fa = /* @__PURE__ */ new Map();
function wu(n, t) {
  t = t || {};
  const e = n + JSON.stringify(t);
  let s = fa.get(e);
  return s || (s = new Intl.NumberFormat(n, t), fa.set(e, s)), s;
}
function Mn(n, t, e) {
  return wu(t, e).format(n);
}
const Zl = {
  values(n) {
    return vt(n) ? n : "" + n;
  },
  numeric(n, t, e) {
    if (n === 0)
      return "0";
    const s = this.chart.options.locale;
    let r, o = n;
    if (e.length > 1) {
      const d = Math.max(Math.abs(e[0].value), Math.abs(e[e.length - 1].value));
      (d < 1e-4 || d > 1e15) && (r = "scientific"), o = Lu(n, e);
    }
    const a = Be(Math.abs(o)), h = isNaN(a) ? 1 : Math.max(Math.min(-1 * Math.floor(a), 20), 0), c = {
      notation: r,
      minimumFractionDigits: h,
      maximumFractionDigits: h
    };
    return Object.assign(c, this.options.ticks.format), Mn(n, s, c);
  },
  logarithmic(n, t, e) {
    if (n === 0)
      return "0";
    const s = e[t].significand || n / Math.pow(10, Math.floor(Be(n)));
    return [
      1,
      2,
      3,
      5,
      10,
      15
    ].includes(s) || t > 0.8 * e.length ? Zl.numeric.call(this, n, t, e) : "";
  }
};
function Lu(n, t) {
  let e = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(e) >= 1 && n !== Math.floor(n) && (e = n - Math.floor(n)), e;
}
var Es = {
  formatters: Zl
};
function Mu(n) {
  n.set("scale", {
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
      tickWidth: (t, e) => e.lineWidth,
      tickColor: (t, e) => e.color,
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
      callback: Es.formatters.values,
      minor: {},
      major: {},
      align: "center",
      crossAlign: "near",
      showLabelBackdrop: !1,
      backdropColor: "rgba(255, 255, 255, 0.75)",
      backdropPadding: 2
    }
  }), n.route("scale.ticks", "color", "", "color"), n.route("scale.grid", "color", "", "borderColor"), n.route("scale.border", "color", "", "borderColor"), n.route("scale.title", "color", "", "color"), n.describe("scale", {
    _fallback: !1,
    _scriptable: (t) => !t.startsWith("before") && !t.startsWith("after") && t !== "callback" && t !== "parser",
    _indexable: (t) => t !== "borderDash" && t !== "tickBorderDash" && t !== "dash"
  }), n.describe("scales", {
    _fallback: "scale"
  }), n.describe("scale.ticks", {
    _scriptable: (t) => t !== "backdropPadding" && t !== "callback",
    _indexable: (t) => t !== "backdropPadding"
  });
}
const ci = /* @__PURE__ */ Object.create(null), So = /* @__PURE__ */ Object.create(null);
function fn(n, t) {
  if (!t)
    return n;
  const e = t.split(".");
  for (let s = 0, r = e.length; s < r; ++s) {
    const o = e[s];
    n = n[o] || (n[o] = /* @__PURE__ */ Object.create(null));
  }
  return n;
}
function uo(n, t, e) {
  return typeof t == "string" ? mn(fn(n, t), e) : mn(fn(n, ""), t);
}
class Pu {
  constructor(t, e) {
    this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (s) => s.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
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
    }, this.hover = {}, this.hoverBackgroundColor = (s, r) => co(r.backgroundColor), this.hoverBorderColor = (s, r) => co(r.borderColor), this.hoverColor = (s, r) => co(r.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(e);
  }
  set(t, e) {
    return uo(this, t, e);
  }
  get(t) {
    return fn(this, t);
  }
  describe(t, e) {
    return uo(So, t, e);
  }
  override(t, e) {
    return uo(ci, t, e);
  }
  route(t, e, s, r) {
    const o = fn(this, t), a = fn(this, s), h = "_" + e;
    Object.defineProperties(o, {
      [h]: {
        value: o[e],
        writable: !0
      },
      [e]: {
        enumerable: !0,
        get() {
          const c = this[h], d = a[r];
          return nt(c) ? Object.assign({}, d, c) : X(c, d);
        },
        set(c) {
          this[h] = c;
        }
      }
    });
  }
  apply(t) {
    t.forEach((e) => e(this));
  }
}
var Lt = /* @__PURE__ */ new Pu({
  _scriptable: (n) => !n.startsWith("on"),
  _indexable: (n) => n !== "events",
  hover: {
    _fallback: "interaction"
  },
  interaction: {
    _scriptable: !1,
    _indexable: !1
  }
}, [
  bu,
  xu,
  Mu
]);
function ku(n) {
  return !n || rt(n.size) || rt(n.family) ? null : (n.style ? n.style + " " : "") + (n.weight ? n.weight + " " : "") + n.size + "px " + n.family;
}
function Ss(n, t, e, s, r) {
  let o = t[r];
  return o || (o = t[r] = n.measureText(r).width, e.push(r)), o > s && (s = o), s;
}
function Su(n, t, e, s) {
  s = s || {};
  let r = s.data = s.data || {}, o = s.garbageCollect = s.garbageCollect || [];
  s.font !== t && (r = s.data = {}, o = s.garbageCollect = [], s.font = t), n.save(), n.font = t;
  let a = 0;
  const h = e.length;
  let c, d, p, g, _;
  for (c = 0; c < h; c++)
    if (g = e[c], g != null && !vt(g))
      a = Ss(n, r, o, a, g);
    else if (vt(g))
      for (d = 0, p = g.length; d < p; d++)
        _ = g[d], _ != null && !vt(_) && (a = Ss(n, r, o, a, _));
  n.restore();
  const v = o.length / 2;
  if (v > e.length) {
    for (c = 0; c < v; c++)
      delete r[o[c]];
    o.splice(0, v);
  }
  return a;
}
function ii(n, t, e) {
  const s = n.currentDevicePixelRatio, r = e !== 0 ? Math.max(e / 2, 0.5) : 0;
  return Math.round((t - r) * s) / s + r;
}
function pa(n, t) {
  !t && !n || (t = t || n.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, n.width, n.height), t.restore());
}
function Co(n, t, e, s) {
  Hl(n, t, e, s, null);
}
function Hl(n, t, e, s, r) {
  let o, a, h, c, d, p, g, _;
  const v = t.pointStyle, b = t.rotation, x = t.radius;
  let M = (b || 0) * lu;
  if (v && typeof v == "object" && (o = v.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    n.save(), n.translate(e, s), n.rotate(M), n.drawImage(v, -v.width / 2, -v.height / 2, v.width, v.height), n.restore();
    return;
  }
  if (!(isNaN(x) || x <= 0)) {
    switch (n.beginPath(), v) {
      default:
        r ? n.ellipse(e, s, r / 2, x, 0, 0, yt) : n.arc(e, s, x, 0, yt), n.closePath();
        break;
      case "triangle":
        p = r ? r / 2 : x, n.moveTo(e + Math.sin(M) * p, s - Math.cos(M) * x), M += ra, n.lineTo(e + Math.sin(M) * p, s - Math.cos(M) * x), M += ra, n.lineTo(e + Math.sin(M) * p, s - Math.cos(M) * x), n.closePath();
        break;
      case "rectRounded":
        d = x * 0.516, c = x - d, a = Math.cos(M + ei) * c, g = Math.cos(M + ei) * (r ? r / 2 - d : c), h = Math.sin(M + ei) * c, _ = Math.sin(M + ei) * (r ? r / 2 - d : c), n.arc(e - g, s - h, d, M - bt, M - At), n.arc(e + _, s - a, d, M - At, M), n.arc(e + g, s + h, d, M, M + At), n.arc(e - _, s + a, d, M + At, M + bt), n.closePath();
        break;
      case "rect":
        if (!b) {
          c = Math.SQRT1_2 * x, p = r ? r / 2 : c, n.rect(e - p, s - c, 2 * p, 2 * c);
          break;
        }
        M += ei;
      case "rectRot":
        g = Math.cos(M) * (r ? r / 2 : x), a = Math.cos(M) * x, h = Math.sin(M) * x, _ = Math.sin(M) * (r ? r / 2 : x), n.moveTo(e - g, s - h), n.lineTo(e + _, s - a), n.lineTo(e + g, s + h), n.lineTo(e - _, s + a), n.closePath();
        break;
      case "crossRot":
        M += ei;
      case "cross":
        g = Math.cos(M) * (r ? r / 2 : x), a = Math.cos(M) * x, h = Math.sin(M) * x, _ = Math.sin(M) * (r ? r / 2 : x), n.moveTo(e - g, s - h), n.lineTo(e + g, s + h), n.moveTo(e + _, s - a), n.lineTo(e - _, s + a);
        break;
      case "star":
        g = Math.cos(M) * (r ? r / 2 : x), a = Math.cos(M) * x, h = Math.sin(M) * x, _ = Math.sin(M) * (r ? r / 2 : x), n.moveTo(e - g, s - h), n.lineTo(e + g, s + h), n.moveTo(e + _, s - a), n.lineTo(e - _, s + a), M += ei, g = Math.cos(M) * (r ? r / 2 : x), a = Math.cos(M) * x, h = Math.sin(M) * x, _ = Math.sin(M) * (r ? r / 2 : x), n.moveTo(e - g, s - h), n.lineTo(e + g, s + h), n.moveTo(e + _, s - a), n.lineTo(e - _, s + a);
        break;
      case "line":
        a = r ? r / 2 : Math.cos(M) * x, h = Math.sin(M) * x, n.moveTo(e - a, s - h), n.lineTo(e + a, s + h);
        break;
      case "dash":
        n.moveTo(e, s), n.lineTo(e + Math.cos(M) * (r ? r / 2 : x), s + Math.sin(M) * x);
        break;
      case !1:
        n.closePath();
        break;
    }
    n.fill(), t.borderWidth > 0 && n.stroke();
  }
}
function Ae(n, t, e) {
  return e = e || 0.5, !t || n && n.x > t.left - e && n.x < t.right + e && n.y > t.top - e && n.y < t.bottom + e;
}
function Is(n, t) {
  n.save(), n.beginPath(), n.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), n.clip();
}
function Ds(n) {
  n.restore();
}
function Cu(n, t, e, s, r) {
  if (!t)
    return n.lineTo(e.x, e.y);
  if (r === "middle") {
    const o = (t.x + e.x) / 2;
    n.lineTo(o, t.y), n.lineTo(o, e.y);
  } else
    r === "after" != !!s ? n.lineTo(t.x, e.y) : n.lineTo(e.x, t.y);
  n.lineTo(e.x, e.y);
}
function Tu(n, t, e, s) {
  if (!t)
    return n.lineTo(e.x, e.y);
  n.bezierCurveTo(s ? t.cp1x : t.cp2x, s ? t.cp1y : t.cp2y, s ? e.cp2x : e.cp1x, s ? e.cp2y : e.cp1y, e.x, e.y);
}
function Au(n, t) {
  t.translation && n.translate(t.translation[0], t.translation[1]), rt(t.rotation) || n.rotate(t.rotation), t.color && (n.fillStyle = t.color), t.textAlign && (n.textAlign = t.textAlign), t.textBaseline && (n.textBaseline = t.textBaseline);
}
function Ou(n, t, e, s, r) {
  if (r.strikethrough || r.underline) {
    const o = n.measureText(s), a = t - o.actualBoundingBoxLeft, h = t + o.actualBoundingBoxRight, c = e - o.actualBoundingBoxAscent, d = e + o.actualBoundingBoxDescent, p = r.strikethrough ? (c + d) / 2 : d;
    n.strokeStyle = n.fillStyle, n.beginPath(), n.lineWidth = r.decorationWidth || 2, n.moveTo(a, p), n.lineTo(h, p), n.stroke();
  }
}
function Eu(n, t) {
  const e = n.fillStyle;
  n.fillStyle = t.color, n.fillRect(t.left, t.top, t.width, t.height), n.fillStyle = e;
}
function ui(n, t, e, s, r, o = {}) {
  const a = vt(t) ? t : [
    t
  ], h = o.strokeWidth > 0 && o.strokeColor !== "";
  let c, d;
  for (n.save(), n.font = r.string, Au(n, o), c = 0; c < a.length; ++c)
    d = a[c], o.backdrop && Eu(n, o.backdrop), h && (o.strokeColor && (n.strokeStyle = o.strokeColor), rt(o.strokeWidth) || (n.lineWidth = o.strokeWidth), n.strokeText(d, e, s, o.maxWidth)), n.fillText(d, e, s, o.maxWidth), Ou(n, e, s, d, o), s += Number(r.lineHeight);
  n.restore();
}
function yn(n, t) {
  const { x: e, y: s, w: r, h: o, radius: a } = t;
  n.arc(e + a.topLeft, s + a.topLeft, a.topLeft, 1.5 * bt, bt, !0), n.lineTo(e, s + o - a.bottomLeft), n.arc(e + a.bottomLeft, s + o - a.bottomLeft, a.bottomLeft, bt, At, !0), n.lineTo(e + r - a.bottomRight, s + o), n.arc(e + r - a.bottomRight, s + o - a.bottomRight, a.bottomRight, At, 0, !0), n.lineTo(e + r, s + a.topRight), n.arc(e + r - a.topRight, s + a.topRight, a.topRight, 0, -At, !0), n.lineTo(e + a.topLeft, s);
}
const Iu = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Du = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function zu(n, t) {
  const e = ("" + n).match(Iu);
  if (!e || e[1] === "normal")
    return t * 1.2;
  switch (n = +e[2], e[3]) {
    case "px":
      return n;
    case "%":
      n /= 100;
      break;
  }
  return t * n;
}
const Bu = (n) => +n || 0;
function Xo(n, t) {
  const e = {}, s = nt(t), r = s ? Object.keys(t) : t, o = nt(n) ? s ? (a) => X(n[a], n[t[a]]) : (a) => n[a] : () => n;
  for (const a of r)
    e[a] = Bu(o(a));
  return e;
}
function Wl(n) {
  return Xo(n, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function li(n) {
  return Xo(n, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function Wt(n) {
  const t = Wl(n);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function Dt(n, t) {
  n = n || {}, t = t || Lt.font;
  let e = X(n.size, t.size);
  typeof e == "string" && (e = parseInt(e, 10));
  let s = X(n.style, t.style);
  s && !("" + s).match(Du) && (console.warn('Invalid font style specified: "' + s + '"'), s = void 0);
  const r = {
    family: X(n.family, t.family),
    lineHeight: zu(X(n.lineHeight, t.lineHeight), e),
    size: e,
    style: s,
    weight: X(n.weight, t.weight),
    string: ""
  };
  return r.string = ku(r), r;
}
function on(n, t, e, s) {
  let r = !0, o, a, h;
  for (o = 0, a = n.length; o < a; ++o)
    if (h = n[o], h !== void 0 && (t !== void 0 && typeof h == "function" && (h = h(t), r = !1), e !== void 0 && vt(h) && (h = h[e % h.length], r = !1), h !== void 0))
      return s && !r && (s.cacheable = !1), h;
}
function Ru(n, t, e) {
  const { min: s, max: r } = n, o = Al(t, (r - s) / 2), a = (h, c) => e && h === 0 ? 0 : h + c;
  return {
    min: a(s, -Math.abs(o)),
    max: a(r, o)
  };
}
function We(n, t) {
  return Object.assign(Object.create(n), t);
}
function Ko(n, t = [
  ""
], e, s, r = () => n[0]) {
  const o = e || n;
  typeof s > "u" && (s = Gl("_fallback", n));
  const a = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: n,
    _rootScopes: o,
    _fallback: s,
    _getTarget: r,
    override: (h) => Ko([
      h,
      ...n
    ], t, o, s)
  };
  return new Proxy(a, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(h, c) {
      return delete h[c], delete h._keys, delete n[0][c], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(h, c) {
      return jl(h, c, () => Uu(c, t, n, h));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(h, c) {
      return Reflect.getOwnPropertyDescriptor(h._scopes[0], c);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(n[0]);
    },
    /**
    * A trap for the in operator.
    */
    has(h, c) {
      return ma(h).includes(c);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(h) {
      return ma(h);
    },
    /**
    * A trap for setting property values.
    */
    set(h, c, d) {
      const p = h._storage || (h._storage = r());
      return h[c] = p[c] = d, delete h._keys, !0;
    }
  });
}
function Ei(n, t, e, s) {
  const r = {
    _cacheable: !1,
    _proxy: n,
    _context: t,
    _subProxy: e,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Vl(n, s),
    setContext: (o) => Ei(n, o, e, s),
    override: (o) => Ei(n.override(o), t, e, s)
  };
  return new Proxy(r, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(o, a) {
      return delete o[a], delete n[a], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(o, a, h) {
      return jl(o, a, () => Nu(o, a, h));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(o, a) {
      return o._descriptors.allKeys ? Reflect.has(n, a) ? {
        enumerable: !0,
        configurable: !0
      } : void 0 : Reflect.getOwnPropertyDescriptor(n, a);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(n);
    },
    /**
    * A trap for the in operator.
    */
    has(o, a) {
      return Reflect.has(n, a);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys() {
      return Reflect.ownKeys(n);
    },
    /**
    * A trap for setting property values.
    */
    set(o, a, h) {
      return n[a] = h, delete o[a], !0;
    }
  });
}
function Vl(n, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: e = t.scriptable, _indexable: s = t.indexable, _allKeys: r = t.allKeys } = n;
  return {
    allKeys: r,
    scriptable: e,
    indexable: s,
    isScriptable: He(e) ? e : () => e,
    isIndexable: He(s) ? s : () => s
  };
}
const Fu = (n, t) => n ? n + jo(t) : t, Jo = (n, t) => nt(t) && n !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function jl(n, t, e) {
  if (Object.prototype.hasOwnProperty.call(n, t) || t === "constructor")
    return n[t];
  const s = e();
  return n[t] = s, s;
}
function Nu(n, t, e) {
  const { _proxy: s, _context: r, _subProxy: o, _descriptors: a } = n;
  let h = s[t];
  return He(h) && a.isScriptable(t) && (h = Zu(t, h, n, e)), vt(h) && h.length && (h = Hu(t, h, n, a.isIndexable)), Jo(t, h) && (h = Ei(h, r, o && o[t], a)), h;
}
function Zu(n, t, e, s) {
  const { _proxy: r, _context: o, _subProxy: a, _stack: h } = e;
  if (h.has(n))
    throw new Error("Recursion detected: " + Array.from(h).join("->") + "->" + n);
  h.add(n);
  let c = t(o, a || s);
  return h.delete(n), Jo(n, c) && (c = $o(r._scopes, r, n, c)), c;
}
function Hu(n, t, e, s) {
  const { _proxy: r, _context: o, _subProxy: a, _descriptors: h } = e;
  if (typeof o.index < "u" && s(n))
    return t[o.index % t.length];
  if (nt(t[0])) {
    const c = t, d = r._scopes.filter((p) => p !== c);
    t = [];
    for (const p of c) {
      const g = $o(d, r, n, p);
      t.push(Ei(g, o, a && a[n], h));
    }
  }
  return t;
}
function Ul(n, t, e) {
  return He(n) ? n(t, e) : n;
}
const Wu = (n, t) => n === !0 ? t : typeof n == "string" ? Ze(t, n) : void 0;
function Vu(n, t, e, s, r) {
  for (const o of t) {
    const a = Wu(e, o);
    if (a) {
      n.add(a);
      const h = Ul(a._fallback, e, r);
      if (typeof h < "u" && h !== e && h !== s)
        return h;
    } else if (a === !1 && typeof s < "u" && e !== s)
      return null;
  }
  return !1;
}
function $o(n, t, e, s) {
  const r = t._rootScopes, o = Ul(t._fallback, e, s), a = [
    ...n,
    ...r
  ], h = /* @__PURE__ */ new Set();
  h.add(s);
  let c = ga(h, a, e, o || e, s);
  return c === null || typeof o < "u" && o !== e && (c = ga(h, a, o, c, s), c === null) ? !1 : Ko(Array.from(h), [
    ""
  ], r, o, () => ju(t, e, s));
}
function ga(n, t, e, s, r) {
  for (; e; )
    e = Vu(n, t, e, s, r);
  return e;
}
function ju(n, t, e) {
  const s = n._getTarget();
  t in s || (s[t] = {});
  const r = s[t];
  return vt(r) && nt(e) ? e : r || {};
}
function Uu(n, t, e, s) {
  let r;
  for (const o of t)
    if (r = Gl(Fu(o, n), e), typeof r < "u")
      return Jo(n, r) ? $o(e, s, n, r) : r;
}
function Gl(n, t) {
  for (const e of t) {
    if (!e)
      continue;
    const s = e[n];
    if (typeof s < "u")
      return s;
  }
}
function ma(n) {
  let t = n._keys;
  return t || (t = n._keys = Gu(n._scopes)), t;
}
function Gu(n) {
  const t = /* @__PURE__ */ new Set();
  for (const e of n)
    for (const s of Object.keys(e).filter((r) => !r.startsWith("_")))
      t.add(s);
  return Array.from(t);
}
function Yl(n, t, e, s) {
  const { iScale: r } = n, { key: o = "r" } = this._parsing, a = new Array(s);
  let h, c, d, p;
  for (h = 0, c = s; h < c; ++h)
    d = h + e, p = t[d], a[h] = {
      r: r.parse(Ze(p, o), d)
    };
  return a;
}
const Yu = Number.EPSILON || 1e-14, Ii = (n, t) => t < n.length && !n[t].skip && n[t], ql = (n) => n === "x" ? "y" : "x";
function qu(n, t, e, s) {
  const r = n.skip ? t : n, o = t, a = e.skip ? t : e, h = ko(o, r), c = ko(a, o);
  let d = h / (h + c), p = c / (h + c);
  d = isNaN(d) ? 0 : d, p = isNaN(p) ? 0 : p;
  const g = s * d, _ = s * p;
  return {
    previous: {
      x: o.x - g * (a.x - r.x),
      y: o.y - g * (a.y - r.y)
    },
    next: {
      x: o.x + _ * (a.x - r.x),
      y: o.y + _ * (a.y - r.y)
    }
  };
}
function Xu(n, t, e) {
  const s = n.length;
  let r, o, a, h, c, d = Ii(n, 0);
  for (let p = 0; p < s - 1; ++p)
    if (c = d, d = Ii(n, p + 1), !(!c || !d)) {
      if (un(t[p], 0, Yu)) {
        e[p] = e[p + 1] = 0;
        continue;
      }
      r = e[p] / t[p], o = e[p + 1] / t[p], h = Math.pow(r, 2) + Math.pow(o, 2), !(h <= 9) && (a = 3 / Math.sqrt(h), e[p] = r * a * t[p], e[p + 1] = o * a * t[p]);
    }
}
function Ku(n, t, e = "x") {
  const s = ql(e), r = n.length;
  let o, a, h, c = Ii(n, 0);
  for (let d = 0; d < r; ++d) {
    if (a = h, h = c, c = Ii(n, d + 1), !h)
      continue;
    const p = h[e], g = h[s];
    a && (o = (p - a[e]) / 3, h[`cp1${e}`] = p - o, h[`cp1${s}`] = g - o * t[d]), c && (o = (c[e] - p) / 3, h[`cp2${e}`] = p + o, h[`cp2${s}`] = g + o * t[d]);
  }
}
function Ju(n, t = "x") {
  const e = ql(t), s = n.length, r = Array(s).fill(0), o = Array(s);
  let a, h, c, d = Ii(n, 0);
  for (a = 0; a < s; ++a)
    if (h = c, c = d, d = Ii(n, a + 1), !!c) {
      if (d) {
        const p = d[t] - c[t];
        r[a] = p !== 0 ? (d[e] - c[e]) / p : 0;
      }
      o[a] = h ? d ? _e(r[a - 1]) !== _e(r[a]) ? 0 : (r[a - 1] + r[a]) / 2 : r[a - 1] : r[a];
    }
  Xu(n, r, o), Ku(n, o, t);
}
function ns(n, t, e) {
  return Math.max(Math.min(n, e), t);
}
function $u(n, t) {
  let e, s, r, o, a, h = Ae(n[0], t);
  for (e = 0, s = n.length; e < s; ++e)
    a = o, o = h, h = e < s - 1 && Ae(n[e + 1], t), o && (r = n[e], a && (r.cp1x = ns(r.cp1x, t.left, t.right), r.cp1y = ns(r.cp1y, t.top, t.bottom)), h && (r.cp2x = ns(r.cp2x, t.left, t.right), r.cp2y = ns(r.cp2y, t.top, t.bottom)));
}
function Qu(n, t, e, s, r) {
  let o, a, h, c;
  if (t.spanGaps && (n = n.filter((d) => !d.skip)), t.cubicInterpolationMode === "monotone")
    Ju(n, r);
  else {
    let d = s ? n[n.length - 1] : n[0];
    for (o = 0, a = n.length; o < a; ++o)
      h = n[o], c = qu(d, h, n[Math.min(o + 1, a - (s ? 0 : 1)) % a], t.tension), h.cp1x = c.previous.x, h.cp1y = c.previous.y, h.cp2x = c.next.x, h.cp2y = c.next.y, d = h;
  }
  t.capBezierPoints && $u(n, e);
}
function Qo() {
  return typeof window < "u" && typeof document < "u";
}
function tr(n) {
  let t = n.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function Cs(n, t, e) {
  let s;
  return typeof n == "string" ? (s = parseInt(n, 10), n.indexOf("%") !== -1 && (s = s / 100 * t.parentNode[e])) : s = n, s;
}
const zs = (n) => n.ownerDocument.defaultView.getComputedStyle(n, null);
function td(n, t) {
  return zs(n).getPropertyValue(t);
}
const ed = [
  "top",
  "right",
  "bottom",
  "left"
];
function hi(n, t, e) {
  const s = {};
  e = e ? "-" + e : "";
  for (let r = 0; r < 4; r++) {
    const o = ed[r];
    s[o] = parseFloat(n[t + "-" + o + e]) || 0;
  }
  return s.width = s.left + s.right, s.height = s.top + s.bottom, s;
}
const id = (n, t, e) => (n > 0 || t > 0) && (!e || !e.shadowRoot);
function nd(n, t) {
  const e = n.touches, s = e && e.length ? e[0] : n, { offsetX: r, offsetY: o } = s;
  let a = !1, h, c;
  if (id(r, o, n.target))
    h = r, c = o;
  else {
    const d = t.getBoundingClientRect();
    h = s.clientX - d.left, c = s.clientY - d.top, a = !0;
  }
  return {
    x: h,
    y: c,
    box: a
  };
}
function oi(n, t) {
  if ("native" in n)
    return n;
  const { canvas: e, currentDevicePixelRatio: s } = t, r = zs(e), o = r.boxSizing === "border-box", a = hi(r, "padding"), h = hi(r, "border", "width"), { x: c, y: d, box: p } = nd(n, e), g = a.left + (p && h.left), _ = a.top + (p && h.top);
  let { width: v, height: b } = t;
  return o && (v -= a.width + h.width, b -= a.height + h.height), {
    x: Math.round((c - g) / v * e.width / s),
    y: Math.round((d - _) / b * e.height / s)
  };
}
function sd(n, t, e) {
  let s, r;
  if (t === void 0 || e === void 0) {
    const o = n && tr(n);
    if (!o)
      t = n.clientWidth, e = n.clientHeight;
    else {
      const a = o.getBoundingClientRect(), h = zs(o), c = hi(h, "border", "width"), d = hi(h, "padding");
      t = a.width - d.width - c.width, e = a.height - d.height - c.height, s = Cs(h.maxWidth, o, "clientWidth"), r = Cs(h.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: e,
    maxWidth: s || ks,
    maxHeight: r || ks
  };
}
const ss = (n) => Math.round(n * 10) / 10;
function od(n, t, e, s) {
  const r = zs(n), o = hi(r, "margin"), a = Cs(r.maxWidth, n, "clientWidth") || ks, h = Cs(r.maxHeight, n, "clientHeight") || ks, c = sd(n, t, e);
  let { width: d, height: p } = c;
  if (r.boxSizing === "content-box") {
    const _ = hi(r, "border", "width"), v = hi(r, "padding");
    d -= v.width + _.width, p -= v.height + _.height;
  }
  return d = Math.max(0, d - o.width), p = Math.max(0, s ? d / s : p - o.height), d = ss(Math.min(d, a, c.maxWidth)), p = ss(Math.min(p, h, c.maxHeight)), d && !p && (p = ss(d / 2)), (t !== void 0 || e !== void 0) && s && c.height && p > c.height && (p = c.height, d = ss(Math.floor(p * s))), {
    width: d,
    height: p
  };
}
function _a(n, t, e) {
  const s = t || 1, r = Math.floor(n.height * s), o = Math.floor(n.width * s);
  n.height = Math.floor(n.height), n.width = Math.floor(n.width);
  const a = n.canvas;
  return a.style && (e || !a.style.height && !a.style.width) && (a.style.height = `${n.height}px`, a.style.width = `${n.width}px`), n.currentDevicePixelRatio !== s || a.height !== r || a.width !== o ? (n.currentDevicePixelRatio = s, a.height = r, a.width = o, n.ctx.setTransform(s, 0, 0, s, 0, 0), !0) : !1;
}
const rd = function() {
  let n = !1;
  try {
    const t = {
      get passive() {
        return n = !0, !1;
      }
    };
    Qo() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return n;
}();
function va(n, t) {
  const e = td(n, t), s = e && e.match(/^(\d+)(\.\d+)?px$/);
  return s ? +s[1] : void 0;
}
function ri(n, t, e, s) {
  return {
    x: n.x + e * (t.x - n.x),
    y: n.y + e * (t.y - n.y)
  };
}
function ad(n, t, e, s) {
  return {
    x: n.x + e * (t.x - n.x),
    y: s === "middle" ? e < 0.5 ? n.y : t.y : s === "after" ? e < 1 ? n.y : t.y : e > 0 ? t.y : n.y
  };
}
function ld(n, t, e, s) {
  const r = {
    x: n.cp2x,
    y: n.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, a = ri(n, r, e), h = ri(r, o, e), c = ri(o, t, e), d = ri(a, h, e), p = ri(h, c, e);
  return ri(d, p, e);
}
const hd = function(n, t) {
  return {
    x(e) {
      return n + n + t - e;
    },
    setWidth(e) {
      t = e;
    },
    textAlign(e) {
      return e === "center" ? e : e === "right" ? "left" : "right";
    },
    xPlus(e, s) {
      return e - s;
    },
    leftForLtr(e, s) {
      return e - s;
    }
  };
}, cd = function() {
  return {
    x(n) {
      return n;
    },
    setWidth(n) {
    },
    textAlign(n) {
      return n;
    },
    xPlus(n, t) {
      return n + t;
    },
    leftForLtr(n, t) {
      return n;
    }
  };
};
function Ai(n, t, e) {
  return n ? hd(t, e) : cd();
}
function Xl(n, t) {
  let e, s;
  (t === "ltr" || t === "rtl") && (e = n.canvas.style, s = [
    e.getPropertyValue("direction"),
    e.getPropertyPriority("direction")
  ], e.setProperty("direction", t, "important"), n.prevTextDirection = s);
}
function Kl(n, t) {
  t !== void 0 && (delete n.prevTextDirection, n.canvas.style.setProperty("direction", t[0], t[1]));
}
function Jl(n) {
  return n === "angle" ? {
    between: vn,
    compare: uu,
    normalize: Jt
  } : {
    between: Ce,
    compare: (t, e) => t - e,
    normalize: (t) => t
  };
}
function ya({ start: n, end: t, count: e, loop: s, style: r }) {
  return {
    start: n % e,
    end: t % e,
    loop: s && (t - n + 1) % e === 0,
    style: r
  };
}
function ud(n, t, e) {
  const { property: s, start: r, end: o } = e, { between: a, normalize: h } = Jl(s), c = t.length;
  let { start: d, end: p, loop: g } = n, _, v;
  if (g) {
    for (d += c, p += c, _ = 0, v = c; _ < v && a(h(t[d % c][s]), r, o); ++_)
      d--, p--;
    d %= c, p %= c;
  }
  return p < d && (p += c), {
    start: d,
    end: p,
    loop: g,
    style: n.style
  };
}
function $l(n, t, e) {
  if (!e)
    return [
      n
    ];
  const { property: s, start: r, end: o } = e, a = t.length, { compare: h, between: c, normalize: d } = Jl(s), { start: p, end: g, loop: _, style: v } = ud(n, t, e), b = [];
  let x = !1, M = null, P, S, A;
  const O = () => c(r, A, P) && h(r, A) !== 0, T = () => h(o, P) === 0 || c(o, A, P), I = () => x || O(), D = () => !x || T();
  for (let B = p, N = p; B <= g; ++B)
    S = t[B % a], !S.skip && (P = d(S[s]), P !== A && (x = c(P, r, o), M === null && I() && (M = h(P, r) === 0 ? B : N), M !== null && D() && (b.push(ya({
      start: M,
      end: B,
      loop: _,
      count: a,
      style: v
    })), M = null), N = B, A = P));
  return M !== null && b.push(ya({
    start: M,
    end: g,
    loop: _,
    count: a,
    style: v
  })), b;
}
function Ql(n, t) {
  const e = [], s = n.segments;
  for (let r = 0; r < s.length; r++) {
    const o = $l(s[r], n.points, t);
    o.length && e.push(...o);
  }
  return e;
}
function dd(n, t, e, s) {
  let r = 0, o = t - 1;
  if (e && !s)
    for (; r < t && !n[r].skip; )
      r++;
  for (; r < t && n[r].skip; )
    r++;
  for (r %= t, e && (o += r); o > r && n[o % t].skip; )
    o--;
  return o %= t, {
    start: r,
    end: o
  };
}
function fd(n, t, e, s) {
  const r = n.length, o = [];
  let a = t, h = n[t], c;
  for (c = t + 1; c <= e; ++c) {
    const d = n[c % r];
    d.skip || d.stop ? h.skip || (s = !1, o.push({
      start: t % r,
      end: (c - 1) % r,
      loop: s
    }), t = a = d.stop ? c : null) : (a = c, h.skip && (t = c)), h = d;
  }
  return a !== null && o.push({
    start: t % r,
    end: a % r,
    loop: s
  }), o;
}
function pd(n, t) {
  const e = n.points, s = n.options.spanGaps, r = e.length;
  if (!r)
    return [];
  const o = !!n._loop, { start: a, end: h } = dd(e, r, o, s);
  if (s === !0)
    return ba(n, [
      {
        start: a,
        end: h,
        loop: o
      }
    ], e, t);
  const c = h < a ? h + r : h, d = !!n._fullLoop && a === 0 && h === r - 1;
  return ba(n, fd(e, a, c, d), e, t);
}
function ba(n, t, e, s) {
  return !s || !s.setContext || !e ? t : gd(n, t, e, s);
}
function gd(n, t, e, s) {
  const r = n._chart.getContext(), o = xa(n.options), { _datasetIndex: a, options: { spanGaps: h } } = n, c = e.length, d = [];
  let p = o, g = t[0].start, _ = g;
  function v(b, x, M, P) {
    const S = h ? -1 : 1;
    if (b !== x) {
      for (b += c; e[b % c].skip; )
        b -= S;
      for (; e[x % c].skip; )
        x += S;
      b % c !== x % c && (d.push({
        start: b % c,
        end: x % c,
        loop: M,
        style: P
      }), p = P, g = x % c);
    }
  }
  for (const b of t) {
    g = h ? g : b.start;
    let x = e[g % c], M;
    for (_ = g + 1; _ <= b.end; _++) {
      const P = e[_ % c];
      M = xa(s.setContext(We(r, {
        type: "segment",
        p0: x,
        p1: P,
        p0DataIndex: (_ - 1) % c,
        p1DataIndex: _ % c,
        datasetIndex: a
      }))), md(M, p) && v(g, _ - 1, b.loop, p), x = P, p = M;
    }
    g < _ - 1 && v(g, _ - 1, b.loop, p);
  }
  return d;
}
function xa(n) {
  return {
    backgroundColor: n.backgroundColor,
    borderCapStyle: n.borderCapStyle,
    borderDash: n.borderDash,
    borderDashOffset: n.borderDashOffset,
    borderJoinStyle: n.borderJoinStyle,
    borderWidth: n.borderWidth,
    borderColor: n.borderColor
  };
}
function md(n, t) {
  if (!t)
    return !1;
  const e = [], s = function(r, o) {
    return qo(o) ? (e.includes(o) || e.push(o), e.indexOf(o)) : o;
  };
  return JSON.stringify(n, s) !== JSON.stringify(t, s);
}
/*!
 * Chart.js v4.4.7
 * https://www.chartjs.org
 * (c) 2024 Chart.js Contributors
 * Released under the MIT License
 */
class _d {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, e, s, r) {
    const o = e.listeners[r], a = e.duration;
    o.forEach((h) => h({
      chart: t,
      initial: e.initial,
      numSteps: a,
      currentStep: Math.min(s - e.start, a)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = Bl.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let e = 0;
    this._charts.forEach((s, r) => {
      if (!s.running || !s.items.length)
        return;
      const o = s.items;
      let a = o.length - 1, h = !1, c;
      for (; a >= 0; --a)
        c = o[a], c._active ? (c._total > s.duration && (s.duration = c._total), c.tick(t), h = !0) : (o[a] = o[o.length - 1], o.pop());
      h && (r.draw(), this._notify(r, s, t, "progress")), o.length || (s.running = !1, this._notify(r, s, t, "complete"), s.initial = !1), e += o.length;
    }), this._lastDate = t, e === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const e = this._charts;
    let s = e.get(t);
    return s || (s = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, e.set(t, s)), s;
  }
  listen(t, e, s) {
    this._getAnims(t).listeners[e].push(s);
  }
  add(t, e) {
    !e || !e.length || this._getAnims(t).items.push(...e);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const e = this._charts.get(t);
    e && (e.running = !0, e.start = Date.now(), e.duration = e.items.reduce((s, r) => Math.max(s, r._duration), 0), this._refresh());
  }
  running(t) {
    if (!this._running)
      return !1;
    const e = this._charts.get(t);
    return !(!e || !e.running || !e.items.length);
  }
  stop(t) {
    const e = this._charts.get(t);
    if (!e || !e.items.length)
      return;
    const s = e.items;
    let r = s.length - 1;
    for (; r >= 0; --r)
      s[r].cancel();
    e.items = [], this._notify(t, e, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var Me = /* @__PURE__ */ new _d();
const wa = "transparent", vd = {
  boolean(n, t, e) {
    return e > 0.5 ? t : n;
  },
  color(n, t, e) {
    const s = da(n || wa), r = s.valid && da(t || wa);
    return r && r.valid ? r.mix(s, e).hexString() : t;
  },
  number(n, t, e) {
    return n + (t - n) * e;
  }
};
class yd {
  constructor(t, e, s, r) {
    const o = e[s];
    r = on([
      t.to,
      r,
      o,
      t.from
    ]);
    const a = on([
      t.from,
      o,
      r
    ]);
    this._active = !0, this._fn = t.fn || vd[t.type || typeof a], this._easing = dn[t.easing] || dn.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = e, this._prop = s, this._from = a, this._to = r, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, e, s) {
    if (this._active) {
      this._notify(!1);
      const r = this._target[this._prop], o = s - this._start, a = this._duration - o;
      this._start = s, this._duration = Math.floor(Math.max(a, t.duration)), this._total += o, this._loop = !!t.loop, this._to = on([
        t.to,
        e,
        r,
        t.from
      ]), this._from = on([
        t.from,
        r,
        e
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const e = t - this._start, s = this._duration, r = this._prop, o = this._from, a = this._loop, h = this._to;
    let c;
    if (this._active = o !== h && (a || e < s), !this._active) {
      this._target[r] = h, this._notify(!0);
      return;
    }
    if (e < 0) {
      this._target[r] = o;
      return;
    }
    c = e / s % 2, c = a && c > 1 ? 2 - c : c, c = this._easing(Math.min(1, Math.max(0, c))), this._target[r] = this._fn(o, h, c);
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((e, s) => {
      t.push({
        res: e,
        rej: s
      });
    });
  }
  _notify(t) {
    const e = t ? "res" : "rej", s = this._promises || [];
    for (let r = 0; r < s.length; r++)
      s[r][e]();
  }
}
class th {
  constructor(t, e) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(e);
  }
  configure(t) {
    if (!nt(t))
      return;
    const e = Object.keys(Lt.animation), s = this._properties;
    Object.getOwnPropertyNames(t).forEach((r) => {
      const o = t[r];
      if (!nt(o))
        return;
      const a = {};
      for (const h of e)
        a[h] = o[h];
      (vt(o.properties) && o.properties || [
        r
      ]).forEach((h) => {
        (h === r || !s.has(h)) && s.set(h, a);
      });
    });
  }
  _animateOptions(t, e) {
    const s = e.options, r = xd(t, s);
    if (!r)
      return [];
    const o = this._createAnimations(r, s);
    return s.$shared && bd(t.options.$animations, s).then(() => {
      t.options = s;
    }, () => {
    }), o;
  }
  _createAnimations(t, e) {
    const s = this._properties, r = [], o = t.$animations || (t.$animations = {}), a = Object.keys(e), h = Date.now();
    let c;
    for (c = a.length - 1; c >= 0; --c) {
      const d = a[c];
      if (d.charAt(0) === "$")
        continue;
      if (d === "options") {
        r.push(...this._animateOptions(t, e));
        continue;
      }
      const p = e[d];
      let g = o[d];
      const _ = s.get(d);
      if (g)
        if (_ && g.active()) {
          g.update(_, p, h);
          continue;
        } else
          g.cancel();
      if (!_ || !_.duration) {
        t[d] = p;
        continue;
      }
      o[d] = g = new yd(_, t, d, p), r.push(g);
    }
    return r;
  }
  update(t, e) {
    if (this._properties.size === 0) {
      Object.assign(t, e);
      return;
    }
    const s = this._createAnimations(t, e);
    if (s.length)
      return Me.add(this._chart, s), !0;
  }
}
function bd(n, t) {
  const e = [], s = Object.keys(t);
  for (let r = 0; r < s.length; r++) {
    const o = n[s[r]];
    o && o.active() && e.push(o.wait());
  }
  return Promise.all(e);
}
function xd(n, t) {
  if (!t)
    return;
  let e = n.options;
  if (!e) {
    n.options = t;
    return;
  }
  return e.$shared && (n.options = e = Object.assign({}, e, {
    $shared: !1,
    $animations: {}
  })), e;
}
function La(n, t) {
  const e = n && n.options || {}, s = e.reverse, r = e.min === void 0 ? t : 0, o = e.max === void 0 ? t : 0;
  return {
    start: s ? o : r,
    end: s ? r : o
  };
}
function wd(n, t, e) {
  if (e === !1)
    return !1;
  const s = La(n, e), r = La(t, e);
  return {
    top: r.end,
    right: s.end,
    bottom: r.start,
    left: s.start
  };
}
function Ld(n) {
  let t, e, s, r;
  return nt(n) ? (t = n.top, e = n.right, s = n.bottom, r = n.left) : t = e = s = r = n, {
    top: t,
    right: e,
    bottom: s,
    left: r,
    disabled: n === !1
  };
}
function eh(n, t) {
  const e = [], s = n._getSortedDatasetMetas(t);
  let r, o;
  for (r = 0, o = s.length; r < o; ++r)
    e.push(s[r].index);
  return e;
}
function Ma(n, t, e, s = {}) {
  const r = n.keys, o = s.mode === "single";
  let a, h, c, d;
  if (t === null)
    return;
  let p = !1;
  for (a = 0, h = r.length; a < h; ++a) {
    if (c = +r[a], c === e) {
      if (p = !0, s.all)
        continue;
      break;
    }
    d = n.values[c], St(d) && (o || t === 0 || _e(t) === _e(d)) && (t += d);
  }
  return !p && !s.all ? 0 : t;
}
function Md(n, t) {
  const { iScale: e, vScale: s } = t, r = e.axis === "x" ? "x" : "y", o = s.axis === "x" ? "x" : "y", a = Object.keys(n), h = new Array(a.length);
  let c, d, p;
  for (c = 0, d = a.length; c < d; ++c)
    p = a[c], h[c] = {
      [r]: p,
      [o]: n[p]
    };
  return h;
}
function fo(n, t) {
  const e = n && n.options.stacked;
  return e || e === void 0 && t.stack !== void 0;
}
function Pd(n, t, e) {
  return `${n.id}.${t.id}.${e.stack || e.type}`;
}
function kd(n) {
  const { min: t, max: e, minDefined: s, maxDefined: r } = n.getUserBounds();
  return {
    min: s ? t : Number.NEGATIVE_INFINITY,
    max: r ? e : Number.POSITIVE_INFINITY
  };
}
function Sd(n, t, e) {
  const s = n[t] || (n[t] = {});
  return s[e] || (s[e] = {});
}
function Pa(n, t, e, s) {
  for (const r of t.getMatchingVisibleMetas(s).reverse()) {
    const o = n[r.index];
    if (e && o > 0 || !e && o < 0)
      return r.index;
  }
  return null;
}
function ka(n, t) {
  const { chart: e, _cachedMeta: s } = n, r = e._stacks || (e._stacks = {}), { iScale: o, vScale: a, index: h } = s, c = o.axis, d = a.axis, p = Pd(o, a, s), g = t.length;
  let _;
  for (let v = 0; v < g; ++v) {
    const b = t[v], { [c]: x, [d]: M } = b, P = b._stacks || (b._stacks = {});
    _ = P[d] = Sd(r, p, x), _[h] = M, _._top = Pa(_, a, !0, s.type), _._bottom = Pa(_, a, !1, s.type);
    const S = _._visualValues || (_._visualValues = {});
    S[h] = M;
  }
}
function po(n, t) {
  const e = n.scales;
  return Object.keys(e).filter((s) => e[s].axis === t).shift();
}
function Cd(n, t) {
  return We(n, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function Td(n, t, e) {
  return We(n, {
    active: !1,
    dataIndex: t,
    parsed: void 0,
    raw: void 0,
    element: e,
    index: t,
    mode: "default",
    type: "data"
  });
}
function $i(n, t) {
  const e = n.controller.index, s = n.vScale && n.vScale.axis;
  if (s) {
    t = t || n._parsed;
    for (const r of t) {
      const o = r._stacks;
      if (!o || o[s] === void 0 || o[s][e] === void 0)
        return;
      delete o[s][e], o[s]._visualValues !== void 0 && o[s]._visualValues[e] !== void 0 && delete o[s]._visualValues[e];
    }
  }
}
const go = (n) => n === "reset" || n === "none", Sa = (n, t) => t ? n : Object.assign({}, n), Ad = (n, t, e) => n && !t.hidden && t._stacked && {
  keys: eh(e, !0),
  values: null
};
class le {
  constructor(t, e) {
    this.chart = t, this._ctx = t.ctx, this.index = e, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = fo(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && $i(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, e = this._cachedMeta, s = this.getDataset(), r = (g, _, v, b) => g === "x" ? _ : g === "r" ? b : v, o = e.xAxisID = X(s.xAxisID, po(t, "x")), a = e.yAxisID = X(s.yAxisID, po(t, "y")), h = e.rAxisID = X(s.rAxisID, po(t, "r")), c = e.indexAxis, d = e.iAxisID = r(c, o, a, h), p = e.vAxisID = r(c, a, o, h);
    e.xScale = this.getScaleForId(o), e.yScale = this.getScaleForId(a), e.rScale = this.getScaleForId(h), e.iScale = this.getScaleForId(d), e.vScale = this.getScaleForId(p);
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(t) {
    return this.chart.scales[t];
  }
  _getOtherScale(t) {
    const e = this._cachedMeta;
    return t === e.iScale ? e.vScale : e.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const t = this._cachedMeta;
    this._data && ha(this._data, this), t._stacked && $i(t);
  }
  _dataCheck() {
    const t = this.getDataset(), e = t.data || (t.data = []), s = this._data;
    if (nt(e)) {
      const r = this._cachedMeta;
      this._data = Md(e, r);
    } else if (s !== e) {
      if (s) {
        ha(s, this);
        const r = this._cachedMeta;
        $i(r), r._parsed = [];
      }
      e && Object.isExtensible(e) && gu(e, this), this._syncList = [], this._data = e;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const e = this._cachedMeta, s = this.getDataset();
    let r = !1;
    this._dataCheck();
    const o = e._stacked;
    e._stacked = fo(e.vScale, e), e.stack !== s.stack && (r = !0, $i(e), e.stack = s.stack), this._resyncElements(t), (r || o !== e._stacked) && (ka(this, e._parsed), e._stacked = fo(e.vScale, e));
  }
  configure() {
    const t = this.chart.config, e = t.datasetScopeKeys(this._type), s = t.getOptionScopes(this.getDataset(), e, !0);
    this.options = t.createResolver(s, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, e) {
    const { _cachedMeta: s, _data: r } = this, { iScale: o, _stacked: a } = s, h = o.axis;
    let c = t === 0 && e === r.length ? !0 : s._sorted, d = t > 0 && s._parsed[t - 1], p, g, _;
    if (this._parsing === !1)
      s._parsed = r, s._sorted = !0, _ = r;
    else {
      vt(r[t]) ? _ = this.parseArrayData(s, r, t, e) : nt(r[t]) ? _ = this.parseObjectData(s, r, t, e) : _ = this.parsePrimitiveData(s, r, t, e);
      const v = () => g[h] === null || d && g[h] < d[h];
      for (p = 0; p < e; ++p)
        s._parsed[p + t] = g = _[p], c && (v() && (c = !1), d = g);
      s._sorted = c;
    }
    a && ka(this, _);
  }
  parsePrimitiveData(t, e, s, r) {
    const { iScale: o, vScale: a } = t, h = o.axis, c = a.axis, d = o.getLabels(), p = o === a, g = new Array(r);
    let _, v, b;
    for (_ = 0, v = r; _ < v; ++_)
      b = _ + s, g[_] = {
        [h]: p || o.parse(d[b], b),
        [c]: a.parse(e[b], b)
      };
    return g;
  }
  parseArrayData(t, e, s, r) {
    const { xScale: o, yScale: a } = t, h = new Array(r);
    let c, d, p, g;
    for (c = 0, d = r; c < d; ++c)
      p = c + s, g = e[p], h[c] = {
        x: o.parse(g[0], p),
        y: a.parse(g[1], p)
      };
    return h;
  }
  parseObjectData(t, e, s, r) {
    const { xScale: o, yScale: a } = t, { xAxisKey: h = "x", yAxisKey: c = "y" } = this._parsing, d = new Array(r);
    let p, g, _, v;
    for (p = 0, g = r; p < g; ++p)
      _ = p + s, v = e[_], d[p] = {
        x: o.parse(Ze(v, h), _),
        y: a.parse(Ze(v, c), _)
      };
    return d;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, e, s) {
    const r = this.chart, o = this._cachedMeta, a = e[t.axis], h = {
      keys: eh(r, !0),
      values: e._stacks[t.axis]._visualValues
    };
    return Ma(h, a, o.index, {
      mode: s
    });
  }
  updateRangeFromParsed(t, e, s, r) {
    const o = s[e.axis];
    let a = o === null ? NaN : o;
    const h = r && s._stacks[e.axis];
    r && h && (r.values = h, a = Ma(r, o, this._cachedMeta.index)), t.min = Math.min(t.min, a), t.max = Math.max(t.max, a);
  }
  getMinMax(t, e) {
    const s = this._cachedMeta, r = s._parsed, o = s._sorted && t === s.iScale, a = r.length, h = this._getOtherScale(t), c = Ad(e, s, this.chart), d = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: p, max: g } = kd(h);
    let _, v;
    function b() {
      v = r[_];
      const x = v[h.axis];
      return !St(v[t.axis]) || p > x || g < x;
    }
    for (_ = 0; _ < a && !(!b() && (this.updateRangeFromParsed(d, t, v, c), o)); ++_)
      ;
    if (o) {
      for (_ = a - 1; _ >= 0; --_)
        if (!b()) {
          this.updateRangeFromParsed(d, t, v, c);
          break;
        }
    }
    return d;
  }
  getAllParsedValues(t) {
    const e = this._cachedMeta._parsed, s = [];
    let r, o, a;
    for (r = 0, o = e.length; r < o; ++r)
      a = e[r][t.axis], St(a) && s.push(a);
    return s;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = e.iScale, r = e.vScale, o = this.getParsed(t);
    return {
      label: s ? "" + s.getLabelForValue(o[s.axis]) : "",
      value: r ? "" + r.getLabelForValue(o[r.axis]) : ""
    };
  }
  _update(t) {
    const e = this._cachedMeta;
    this.update(t || "default"), e._clip = Ld(X(this.options.clip, wd(e.xScale, e.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, e = this.chart, s = this._cachedMeta, r = s.data || [], o = e.chartArea, a = [], h = this._drawStart || 0, c = this._drawCount || r.length - h, d = this.options.drawActiveElementsOnTop;
    let p;
    for (s.dataset && s.dataset.draw(t, o, h, c), p = h; p < h + c; ++p) {
      const g = r[p];
      g.hidden || (g.active && d ? a.push(g) : g.draw(t, o));
    }
    for (p = 0; p < a.length; ++p)
      a[p].draw(t, o);
  }
  getStyle(t, e) {
    const s = e ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(s) : this.resolveDataElementOptions(t || 0, s);
  }
  getContext(t, e, s) {
    const r = this.getDataset();
    let o;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const a = this._cachedMeta.data[t];
      o = a.$context || (a.$context = Td(this.getContext(), t, a)), o.parsed = this.getParsed(t), o.raw = r.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = Cd(this.chart.getContext(), this.index)), o.dataset = r, o.index = o.datasetIndex = this.index;
    return o.active = !!e, o.mode = s, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, e) {
    return this._resolveElementOptions(this.dataElementType.id, e, t);
  }
  _resolveElementOptions(t, e = "default", s) {
    const r = e === "active", o = this._cachedDataOpts, a = t + "-" + e, h = o[a], c = this.enableOptionSharing && _n(s);
    if (h)
      return Sa(h, c);
    const d = this.chart.config, p = d.datasetElementScopeKeys(this._type, t), g = r ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], _ = d.getOptionScopes(this.getDataset(), p), v = Object.keys(Lt.elements[t]), b = () => this.getContext(s, r, e), x = d.resolveNamedOptions(_, v, b, g);
    return x.$shared && (x.$shared = c, o[a] = Object.freeze(Sa(x, c))), x;
  }
  _resolveAnimations(t, e, s) {
    const r = this.chart, o = this._cachedDataOpts, a = `animation-${e}`, h = o[a];
    if (h)
      return h;
    let c;
    if (r.options.animation !== !1) {
      const p = this.chart.config, g = p.datasetAnimationScopeKeys(this._type, e), _ = p.getOptionScopes(this.getDataset(), g);
      c = p.createResolver(_, this.getContext(t, s, e));
    }
    const d = new th(r, c && c.animations);
    return c && c._cacheable && (o[a] = Object.freeze(d)), d;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, e) {
    return !e || go(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, e) {
    const s = this.resolveDataElementOptions(t, e), r = this._sharedOptions, o = this.getSharedOptions(s), a = this.includeOptions(e, o) || o !== r;
    return this.updateSharedOptions(o, e, s), {
      sharedOptions: o,
      includeOptions: a
    };
  }
  updateElement(t, e, s, r) {
    go(r) ? Object.assign(t, s) : this._resolveAnimations(e, r).update(t, s);
  }
  updateSharedOptions(t, e, s) {
    t && !go(e) && this._resolveAnimations(void 0, e).update(t, s);
  }
  _setStyle(t, e, s, r) {
    t.active = r;
    const o = this.getStyle(e, r);
    this._resolveAnimations(e, s, r).update(t, {
      options: !r && this.getSharedOptions(o) || o
    });
  }
  removeHoverStyle(t, e, s) {
    this._setStyle(t, s, "active", !1);
  }
  setHoverStyle(t, e, s) {
    this._setStyle(t, s, "active", !0);
  }
  _removeDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !1);
  }
  _setDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !0);
  }
  _resyncElements(t) {
    const e = this._data, s = this._cachedMeta.data;
    for (const [h, c, d] of this._syncList)
      this[h](c, d);
    this._syncList = [];
    const r = s.length, o = e.length, a = Math.min(o, r);
    a && this.parse(0, a), o > r ? this._insertElements(r, o - r, t) : o < r && this._removeElements(o, r - o);
  }
  _insertElements(t, e, s = !0) {
    const r = this._cachedMeta, o = r.data, a = t + e;
    let h;
    const c = (d) => {
      for (d.length += e, h = d.length - 1; h >= a; h--)
        d[h] = d[h - e];
    };
    for (c(o), h = t; h < a; ++h)
      o[h] = new this.dataElementType();
    this._parsing && c(r._parsed), this.parse(t, e), s && this.updateElements(o, t, e, "reset");
  }
  updateElements(t, e, s, r) {
  }
  _removeElements(t, e) {
    const s = this._cachedMeta;
    if (this._parsing) {
      const r = s._parsed.splice(t, e);
      s._stacked && $i(s, r);
    }
    s.data.splice(t, e);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [e, s, r] = t;
      this[e](s, r);
    }
    this.chart._dataChanges.push([
      this.index,
      ...t
    ]);
  }
  _onDataPush() {
    const t = arguments.length;
    this._sync([
      "_insertElements",
      this.getDataset().data.length - t,
      t
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
  _onDataSplice(t, e) {
    e && this._sync([
      "_removeElements",
      t,
      e
    ]);
    const s = arguments.length - 2;
    s && this._sync([
      "_insertElements",
      t,
      s
    ]);
  }
  _onDataUnshift() {
    this._sync([
      "_insertElements",
      0,
      arguments.length
    ]);
  }
}
z(le, "defaults", {}), z(le, "datasetElementType", null), z(le, "dataElementType", null);
function Od(n, t) {
  if (!n._cache.$bar) {
    const e = n.getMatchingVisibleMetas(t);
    let s = [];
    for (let r = 0, o = e.length; r < o; r++)
      s = s.concat(e[r].controller.getAllParsedValues(n));
    n._cache.$bar = zl(s.sort((r, o) => r - o));
  }
  return n._cache.$bar;
}
function Ed(n) {
  const t = n.iScale, e = Od(t, n.type);
  let s = t._length, r, o, a, h;
  const c = () => {
    a === 32767 || a === -32768 || (_n(h) && (s = Math.min(s, Math.abs(a - h) || s)), h = a);
  };
  for (r = 0, o = e.length; r < o; ++r)
    a = t.getPixelForValue(e[r]), c();
  for (h = void 0, r = 0, o = t.ticks.length; r < o; ++r)
    a = t.getPixelForTick(r), c();
  return s;
}
function Id(n, t, e, s) {
  const r = e.barThickness;
  let o, a;
  return rt(r) ? (o = t.min * e.categoryPercentage, a = e.barPercentage) : (o = r * s, a = 1), {
    chunk: o / s,
    ratio: a,
    start: t.pixels[n] - o / 2
  };
}
function Dd(n, t, e, s) {
  const r = t.pixels, o = r[n];
  let a = n > 0 ? r[n - 1] : null, h = n < r.length - 1 ? r[n + 1] : null;
  const c = e.categoryPercentage;
  a === null && (a = o - (h === null ? t.end - t.start : h - o)), h === null && (h = o + o - a);
  const d = o - (o - Math.min(a, h)) / 2 * c;
  return {
    chunk: Math.abs(h - a) / 2 * c / s,
    ratio: e.barPercentage,
    start: d
  };
}
function zd(n, t, e, s) {
  const r = e.parse(n[0], s), o = e.parse(n[1], s), a = Math.min(r, o), h = Math.max(r, o);
  let c = a, d = h;
  Math.abs(a) > Math.abs(h) && (c = h, d = a), t[e.axis] = d, t._custom = {
    barStart: c,
    barEnd: d,
    start: r,
    end: o,
    min: a,
    max: h
  };
}
function ih(n, t, e, s) {
  return vt(n) ? zd(n, t, e, s) : t[e.axis] = e.parse(n, s), t;
}
function Ca(n, t, e, s) {
  const r = n.iScale, o = n.vScale, a = r.getLabels(), h = r === o, c = [];
  let d, p, g, _;
  for (d = e, p = e + s; d < p; ++d)
    _ = t[d], g = {}, g[r.axis] = h || r.parse(a[d], d), c.push(ih(_, g, o, d));
  return c;
}
function mo(n) {
  return n && n.barStart !== void 0 && n.barEnd !== void 0;
}
function Bd(n, t, e) {
  return n !== 0 ? _e(n) : (t.isHorizontal() ? 1 : -1) * (t.min >= e ? 1 : -1);
}
function Rd(n) {
  let t, e, s, r, o;
  return n.horizontal ? (t = n.base > n.x, e = "left", s = "right") : (t = n.base < n.y, e = "bottom", s = "top"), t ? (r = "end", o = "start") : (r = "start", o = "end"), {
    start: e,
    end: s,
    reverse: t,
    top: r,
    bottom: o
  };
}
function Fd(n, t, e, s) {
  let r = t.borderSkipped;
  const o = {};
  if (!r) {
    n.borderSkipped = o;
    return;
  }
  if (r === !0) {
    n.borderSkipped = {
      top: !0,
      right: !0,
      bottom: !0,
      left: !0
    };
    return;
  }
  const { start: a, end: h, reverse: c, top: d, bottom: p } = Rd(n);
  r === "middle" && e && (n.enableBorderRadius = !0, (e._top || 0) === s ? r = d : (e._bottom || 0) === s ? r = p : (o[Ta(p, a, h, c)] = !0, r = d)), o[Ta(r, a, h, c)] = !0, n.borderSkipped = o;
}
function Ta(n, t, e, s) {
  return s ? (n = Nd(n, t, e), n = Aa(n, e, t)) : n = Aa(n, t, e), n;
}
function Nd(n, t, e) {
  return n === t ? e : n === e ? t : n;
}
function Aa(n, t, e) {
  return n === "start" ? t : n === "end" ? e : n;
}
function Zd(n, { inflateAmount: t }, e) {
  n.inflateAmount = t === "auto" ? e === 1 ? 0.33 : 0 : t;
}
class gs extends le {
  parsePrimitiveData(t, e, s, r) {
    return Ca(t, e, s, r);
  }
  parseArrayData(t, e, s, r) {
    return Ca(t, e, s, r);
  }
  parseObjectData(t, e, s, r) {
    const { iScale: o, vScale: a } = t, { xAxisKey: h = "x", yAxisKey: c = "y" } = this._parsing, d = o.axis === "x" ? h : c, p = a.axis === "x" ? h : c, g = [];
    let _, v, b, x;
    for (_ = s, v = s + r; _ < v; ++_)
      x = e[_], b = {}, b[o.axis] = o.parse(Ze(x, d), _), g.push(ih(Ze(x, p), b, a, _));
    return g;
  }
  updateRangeFromParsed(t, e, s, r) {
    super.updateRangeFromParsed(t, e, s, r);
    const o = s._custom;
    o && e === this._cachedMeta.vScale && (t.min = Math.min(t.min, o.min), t.max = Math.max(t.max, o.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, { iScale: s, vScale: r } = e, o = this.getParsed(t), a = o._custom, h = mo(a) ? "[" + a.start + ", " + a.end + "]" : "" + r.getLabelForValue(o[r.axis]);
    return {
      label: "" + s.getLabelForValue(o[s.axis]),
      value: h
    };
  }
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
    const t = this._cachedMeta;
    t.stack = this.getDataset().stack;
  }
  update(t) {
    const e = this._cachedMeta;
    this.updateElements(e.data, 0, e.data.length, t);
  }
  updateElements(t, e, s, r) {
    const o = r === "reset", { index: a, _cachedMeta: { vScale: h } } = this, c = h.getBasePixel(), d = h.isHorizontal(), p = this._getRuler(), { sharedOptions: g, includeOptions: _ } = this._getSharedOptions(e, r);
    for (let v = e; v < e + s; v++) {
      const b = this.getParsed(v), x = o || rt(b[h.axis]) ? {
        base: c,
        head: c
      } : this._calculateBarValuePixels(v), M = this._calculateBarIndexPixels(v, p), P = (b._stacks || {})[h.axis], S = {
        horizontal: d,
        base: x.base,
        enableBorderRadius: !P || mo(b._custom) || a === P._top || a === P._bottom,
        x: d ? x.head : M.center,
        y: d ? M.center : x.head,
        height: d ? M.size : Math.abs(x.size),
        width: d ? Math.abs(x.size) : M.size
      };
      _ && (S.options = g || this.resolveDataElementOptions(v, t[v].active ? "active" : r));
      const A = S.options || t[v].options;
      Fd(S, A, P, a), Zd(S, A, p.ratio), this.updateElement(t[v], v, S, r);
    }
  }
  _getStacks(t, e) {
    const { iScale: s } = this._cachedMeta, r = s.getMatchingVisibleMetas(this._type).filter((p) => p.controller.options.grouped), o = s.options.stacked, a = [], h = this._cachedMeta.controller.getParsed(e), c = h && h[s.axis], d = (p) => {
      const g = p._parsed.find((v) => v[s.axis] === c), _ = g && g[p.vScale.axis];
      if (rt(_) || isNaN(_))
        return !0;
    };
    for (const p of r)
      if (!(e !== void 0 && d(p)) && ((o === !1 || a.indexOf(p.stack) === -1 || o === void 0 && p.stack === void 0) && a.push(p.stack), p.index === t))
        break;
    return a.length || a.push(void 0), a;
  }
  _getStackCount(t) {
    return this._getStacks(void 0, t).length;
  }
  _getStackIndex(t, e, s) {
    const r = this._getStacks(t, s), o = e !== void 0 ? r.indexOf(e) : -1;
    return o === -1 ? r.length - 1 : o;
  }
  _getRuler() {
    const t = this.options, e = this._cachedMeta, s = e.iScale, r = [];
    let o, a;
    for (o = 0, a = e.data.length; o < a; ++o)
      r.push(s.getPixelForValue(this.getParsed(o)[s.axis], o));
    const h = t.barThickness;
    return {
      min: h || Ed(e),
      pixels: r,
      start: s._startPixel,
      end: s._endPixel,
      stackCount: this._getStackCount(),
      scale: s,
      grouped: t.grouped,
      ratio: h ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: e, _stacked: s, index: r }, options: { base: o, minBarLength: a } } = this, h = o || 0, c = this.getParsed(t), d = c._custom, p = mo(d);
    let g = c[e.axis], _ = 0, v = s ? this.applyStack(e, c, s) : g, b, x;
    v !== g && (_ = v - g, v = g), p && (g = d.barStart, v = d.barEnd - d.barStart, g !== 0 && _e(g) !== _e(d.barEnd) && (_ = 0), _ += g);
    const M = !rt(o) && !p ? o : _;
    let P = e.getPixelForValue(M);
    if (this.chart.getDataVisibility(t) ? b = e.getPixelForValue(_ + v) : b = P, x = b - P, Math.abs(x) < a) {
      x = Bd(x, e, h) * a, g === h && (P -= x / 2);
      const S = e.getPixelForDecimal(0), A = e.getPixelForDecimal(1), O = Math.min(S, A), T = Math.max(S, A);
      P = Math.max(Math.min(P, T), O), b = P + x, s && !p && (c._stacks[e.axis]._visualValues[r] = e.getValueForPixel(b) - e.getValueForPixel(P));
    }
    if (P === e.getPixelForValue(h)) {
      const S = _e(x) * e.getLineWidthForValue(h) / 2;
      P += S, x -= S;
    }
    return {
      size: x,
      base: P,
      head: b,
      center: b + x / 2
    };
  }
  _calculateBarIndexPixels(t, e) {
    const s = e.scale, r = this.options, o = r.skipNull, a = X(r.maxBarThickness, 1 / 0);
    let h, c;
    if (e.grouped) {
      const d = o ? this._getStackCount(t) : e.stackCount, p = r.barThickness === "flex" ? Dd(t, e, r, d) : Id(t, e, r, d), g = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0);
      h = p.start + p.chunk * g + p.chunk / 2, c = Math.min(a, p.chunk * p.ratio);
    } else
      h = s.getPixelForValue(this.getParsed(t)[s.axis], t), c = Math.min(a, e.min * e.ratio);
    return {
      base: h - c / 2,
      head: h + c / 2,
      center: h,
      size: c
    };
  }
  draw() {
    const t = this._cachedMeta, e = t.vScale, s = t.data, r = s.length;
    let o = 0;
    for (; o < r; ++o)
      this.getParsed(o)[e.axis] !== null && !s[o].hidden && s[o].draw(this._ctx);
  }
}
z(gs, "id", "bar"), z(gs, "defaults", {
  datasetElementType: !1,
  dataElementType: "bar",
  categoryPercentage: 0.8,
  barPercentage: 0.9,
  grouped: !0,
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "base",
        "width",
        "height"
      ]
    }
  }
}), z(gs, "overrides", {
  scales: {
    _index_: {
      type: "category",
      offset: !0,
      grid: {
        offset: !0
      }
    },
    _value_: {
      type: "linear",
      beginAtZero: !0
    }
  }
});
class ms extends le {
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
  }
  parsePrimitiveData(t, e, s, r) {
    const o = super.parsePrimitiveData(t, e, s, r);
    for (let a = 0; a < o.length; a++)
      o[a]._custom = this.resolveDataElementOptions(a + s).radius;
    return o;
  }
  parseArrayData(t, e, s, r) {
    const o = super.parseArrayData(t, e, s, r);
    for (let a = 0; a < o.length; a++) {
      const h = e[s + a];
      o[a]._custom = X(h[2], this.resolveDataElementOptions(a + s).radius);
    }
    return o;
  }
  parseObjectData(t, e, s, r) {
    const o = super.parseObjectData(t, e, s, r);
    for (let a = 0; a < o.length; a++) {
      const h = e[s + a];
      o[a]._custom = X(h && h.r && +h.r, this.resolveDataElementOptions(a + s).radius);
    }
    return o;
  }
  getMaxOverflow() {
    const t = this._cachedMeta.data;
    let e = 0;
    for (let s = t.length - 1; s >= 0; --s)
      e = Math.max(e, t[s].size(this.resolveDataElementOptions(s)) / 2);
    return e > 0 && e;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = this.chart.data.labels || [], { xScale: r, yScale: o } = e, a = this.getParsed(t), h = r.getLabelForValue(a.x), c = o.getLabelForValue(a.y), d = a._custom;
    return {
      label: s[t] || "",
      value: "(" + h + ", " + c + (d ? ", " + d : "") + ")"
    };
  }
  update(t) {
    const e = this._cachedMeta.data;
    this.updateElements(e, 0, e.length, t);
  }
  updateElements(t, e, s, r) {
    const o = r === "reset", { iScale: a, vScale: h } = this._cachedMeta, { sharedOptions: c, includeOptions: d } = this._getSharedOptions(e, r), p = a.axis, g = h.axis;
    for (let _ = e; _ < e + s; _++) {
      const v = t[_], b = !o && this.getParsed(_), x = {}, M = x[p] = o ? a.getPixelForDecimal(0.5) : a.getPixelForValue(b[p]), P = x[g] = o ? h.getBasePixel() : h.getPixelForValue(b[g]);
      x.skip = isNaN(M) || isNaN(P), d && (x.options = c || this.resolveDataElementOptions(_, v.active ? "active" : r), o && (x.options.radius = 0)), this.updateElement(v, _, x, r);
    }
  }
  resolveDataElementOptions(t, e) {
    const s = this.getParsed(t);
    let r = super.resolveDataElementOptions(t, e);
    r.$shared && (r = Object.assign({}, r, {
      $shared: !1
    }));
    const o = r.radius;
    return e !== "active" && (r.radius = 0), r.radius += X(s && s._custom, o), r;
  }
}
z(ms, "id", "bubble"), z(ms, "defaults", {
  datasetElementType: !1,
  dataElementType: "point",
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "borderWidth",
        "radius"
      ]
    }
  }
}), z(ms, "overrides", {
  scales: {
    x: {
      type: "linear"
    },
    y: {
      type: "linear"
    }
  }
});
function Hd(n, t, e) {
  let s = 1, r = 1, o = 0, a = 0;
  if (t < yt) {
    const h = n, c = h + t, d = Math.cos(h), p = Math.sin(h), g = Math.cos(c), _ = Math.sin(c), v = (A, O, T) => vn(A, h, c, !0) ? 1 : Math.max(O, O * e, T, T * e), b = (A, O, T) => vn(A, h, c, !0) ? -1 : Math.min(O, O * e, T, T * e), x = v(0, d, g), M = v(At, p, _), P = b(bt, d, g), S = b(bt + At, p, _);
    s = (x - P) / 2, r = (M - S) / 2, o = -(x + P) / 2, a = -(M + S) / 2;
  }
  return {
    ratioX: s,
    ratioY: r,
    offsetX: o,
    offsetY: a
  };
}
class ai extends le {
  constructor(t, e) {
    super(t, e), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
  }
  linkScales() {
  }
  parse(t, e) {
    const s = this.getDataset().data, r = this._cachedMeta;
    if (this._parsing === !1)
      r._parsed = s;
    else {
      let o = (c) => +s[c];
      if (nt(s[t])) {
        const { key: c = "value" } = this._parsing;
        o = (d) => +Ze(s[d], c);
      }
      let a, h;
      for (a = t, h = t + e; a < h; ++a)
        r._parsed[a] = o(a);
    }
  }
  _getRotation() {
    return ae(this.options.rotation - 90);
  }
  _getCircumference() {
    return ae(this.options.circumference);
  }
  _getRotationExtents() {
    let t = yt, e = -yt;
    for (let s = 0; s < this.chart.data.datasets.length; ++s)
      if (this.chart.isDatasetVisible(s) && this.chart.getDatasetMeta(s).type === this._type) {
        const r = this.chart.getDatasetMeta(s).controller, o = r._getRotation(), a = r._getCircumference();
        t = Math.min(t, o), e = Math.max(e, o + a);
      }
    return {
      rotation: t,
      circumference: e - t
    };
  }
  update(t) {
    const e = this.chart, { chartArea: s } = e, r = this._cachedMeta, o = r.data, a = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, h = Math.max((Math.min(s.width, s.height) - a) / 2, 0), c = Math.min(eu(this.options.cutout, h), 1), d = this._getRingWeight(this.index), { circumference: p, rotation: g } = this._getRotationExtents(), { ratioX: _, ratioY: v, offsetX: b, offsetY: x } = Hd(g, p, c), M = (s.width - a) / _, P = (s.height - a) / v, S = Math.max(Math.min(M, P) / 2, 0), A = Al(this.options.radius, S), O = Math.max(A * c, 0), T = (A - O) / this._getVisibleDatasetWeightTotal();
    this.offsetX = b * A, this.offsetY = x * A, r.total = this.calculateTotal(), this.outerRadius = A - T * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - T * d, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, e) {
    const s = this.options, r = this._cachedMeta, o = this._getCircumference();
    return e && s.animation.animateRotate || !this.chart.getDataVisibility(t) || r._parsed[t] === null || r.data[t].hidden ? 0 : this.calculateCircumference(r._parsed[t] * o / yt);
  }
  updateElements(t, e, s, r) {
    const o = r === "reset", a = this.chart, h = a.chartArea, d = a.options.animation, p = (h.left + h.right) / 2, g = (h.top + h.bottom) / 2, _ = o && d.animateScale, v = _ ? 0 : this.innerRadius, b = _ ? 0 : this.outerRadius, { sharedOptions: x, includeOptions: M } = this._getSharedOptions(e, r);
    let P = this._getRotation(), S;
    for (S = 0; S < e; ++S)
      P += this._circumference(S, o);
    for (S = e; S < e + s; ++S) {
      const A = this._circumference(S, o), O = t[S], T = {
        x: p + this.offsetX,
        y: g + this.offsetY,
        startAngle: P,
        endAngle: P + A,
        circumference: A,
        outerRadius: b,
        innerRadius: v
      };
      M && (T.options = x || this.resolveDataElementOptions(S, O.active ? "active" : r)), P += A, this.updateElement(O, S, T, r);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, e = t.data;
    let s = 0, r;
    for (r = 0; r < e.length; r++) {
      const o = t._parsed[r];
      o !== null && !isNaN(o) && this.chart.getDataVisibility(r) && !e[r].hidden && (s += Math.abs(o));
    }
    return s;
  }
  calculateCircumference(t) {
    const e = this._cachedMeta.total;
    return e > 0 && !isNaN(t) ? yt * (Math.abs(t) / e) : 0;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = this.chart, r = s.data.labels || [], o = Mn(e._parsed[t], s.options.locale);
    return {
      label: r[t] || "",
      value: o
    };
  }
  getMaxBorderWidth(t) {
    let e = 0;
    const s = this.chart;
    let r, o, a, h, c;
    if (!t) {
      for (r = 0, o = s.data.datasets.length; r < o; ++r)
        if (s.isDatasetVisible(r)) {
          a = s.getDatasetMeta(r), t = a.data, h = a.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (r = 0, o = t.length; r < o; ++r)
      c = h.resolveDataElementOptions(r), c.borderAlign !== "inner" && (e = Math.max(e, c.borderWidth || 0, c.hoverBorderWidth || 0));
    return e;
  }
  getMaxOffset(t) {
    let e = 0;
    for (let s = 0, r = t.length; s < r; ++s) {
      const o = this.resolveDataElementOptions(s);
      e = Math.max(e, o.offset || 0, o.hoverOffset || 0);
    }
    return e;
  }
  _getRingWeightOffset(t) {
    let e = 0;
    for (let s = 0; s < t; ++s)
      this.chart.isDatasetVisible(s) && (e += this._getRingWeight(s));
    return e;
  }
  _getRingWeight(t) {
    return Math.max(X(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
z(ai, "id", "doughnut"), z(ai, "defaults", {
  datasetElementType: !1,
  dataElementType: "arc",
  animation: {
    animateRotate: !0,
    animateScale: !1
  },
  animations: {
    numbers: {
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
    }
  },
  cutout: "50%",
  rotation: 0,
  circumference: 360,
  radius: "100%",
  spacing: 0,
  indexAxis: "r"
}), z(ai, "descriptors", {
  _scriptable: (t) => t !== "spacing",
  _indexable: (t) => t !== "spacing" && !t.startsWith("borderDash") && !t.startsWith("hoverBorderDash")
}), z(ai, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(t) {
          const e = t.data;
          if (e.labels.length && e.datasets.length) {
            const { labels: { pointStyle: s, color: r } } = t.legend.options;
            return e.labels.map((o, a) => {
              const c = t.getDatasetMeta(0).controller.getStyle(a);
              return {
                text: o,
                fillStyle: c.backgroundColor,
                strokeStyle: c.borderColor,
                fontColor: r,
                lineWidth: c.borderWidth,
                pointStyle: s,
                hidden: !t.getDataVisibility(a),
                index: a
              };
            });
          }
          return [];
        }
      },
      onClick(t, e, s) {
        s.chart.toggleDataVisibility(e.index), s.chart.update();
      }
    }
  }
});
class _s extends le {
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(t) {
    const e = this._cachedMeta, { dataset: s, data: r = [], _dataset: o } = e, a = this.chart._animationsDisabled;
    let { start: h, count: c } = Fl(e, r, a);
    this._drawStart = h, this._drawCount = c, Nl(e) && (h = 0, c = r.length), s._chart = this.chart, s._datasetIndex = this.index, s._decimated = !!o._decimated, s.points = r;
    const d = this.resolveDatasetElementOptions(t);
    this.options.showLine || (d.borderWidth = 0), d.segment = this.options.segment, this.updateElement(s, void 0, {
      animated: !a,
      options: d
    }, t), this.updateElements(r, h, c, t);
  }
  updateElements(t, e, s, r) {
    const o = r === "reset", { iScale: a, vScale: h, _stacked: c, _dataset: d } = this._cachedMeta, { sharedOptions: p, includeOptions: g } = this._getSharedOptions(e, r), _ = a.axis, v = h.axis, { spanGaps: b, segment: x } = this.options, M = Oi(b) ? b : Number.POSITIVE_INFINITY, P = this.chart._animationsDisabled || o || r === "none", S = e + s, A = t.length;
    let O = e > 0 && this.getParsed(e - 1);
    for (let T = 0; T < A; ++T) {
      const I = t[T], D = P ? I : {};
      if (T < e || T >= S) {
        D.skip = !0;
        continue;
      }
      const B = this.getParsed(T), N = rt(B[v]), Y = D[_] = a.getPixelForValue(B[_], T), Z = D[v] = o || N ? h.getBasePixel() : h.getPixelForValue(c ? this.applyStack(h, B, c) : B[v], T);
      D.skip = isNaN(Y) || isNaN(Z) || N, D.stop = T > 0 && Math.abs(B[_] - O[_]) > M, x && (D.parsed = B, D.raw = d.data[T]), g && (D.options = p || this.resolveDataElementOptions(T, I.active ? "active" : r)), P || this.updateElement(I, T, D, r), O = B;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, e = t.dataset, s = e.options && e.options.borderWidth || 0, r = t.data || [];
    if (!r.length)
      return s;
    const o = r[0].size(this.resolveDataElementOptions(0)), a = r[r.length - 1].size(this.resolveDataElementOptions(r.length - 1));
    return Math.max(s, o, a) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
z(_s, "id", "line"), z(_s, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  showLine: !0,
  spanGaps: !1
}), z(_s, "overrides", {
  scales: {
    _index_: {
      type: "category"
    },
    _value_: {
      type: "linear"
    }
  }
});
class pn extends le {
  constructor(t, e) {
    super(t, e), this.innerRadius = void 0, this.outerRadius = void 0;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = this.chart, r = s.data.labels || [], o = Mn(e._parsed[t].r, s.options.locale);
    return {
      label: r[t] || "",
      value: o
    };
  }
  parseObjectData(t, e, s, r) {
    return Yl.bind(this)(t, e, s, r);
  }
  update(t) {
    const e = this._cachedMeta.data;
    this._updateRadius(), this.updateElements(e, 0, e.length, t);
  }
  getMinMax() {
    const t = this._cachedMeta, e = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    };
    return t.data.forEach((s, r) => {
      const o = this.getParsed(r).r;
      !isNaN(o) && this.chart.getDataVisibility(r) && (o < e.min && (e.min = o), o > e.max && (e.max = o));
    }), e;
  }
  _updateRadius() {
    const t = this.chart, e = t.chartArea, s = t.options, r = Math.min(e.right - e.left, e.bottom - e.top), o = Math.max(r / 2, 0), a = Math.max(s.cutoutPercentage ? o / 100 * s.cutoutPercentage : 1, 0), h = (o - a) / t.getVisibleDatasetCount();
    this.outerRadius = o - h * this.index, this.innerRadius = this.outerRadius - h;
  }
  updateElements(t, e, s, r) {
    const o = r === "reset", a = this.chart, c = a.options.animation, d = this._cachedMeta.rScale, p = d.xCenter, g = d.yCenter, _ = d.getIndexAngle(0) - 0.5 * bt;
    let v = _, b;
    const x = 360 / this.countVisibleElements();
    for (b = 0; b < e; ++b)
      v += this._computeAngle(b, r, x);
    for (b = e; b < e + s; b++) {
      const M = t[b];
      let P = v, S = v + this._computeAngle(b, r, x), A = a.getDataVisibility(b) ? d.getDistanceFromCenterForValue(this.getParsed(b).r) : 0;
      v = S, o && (c.animateScale && (A = 0), c.animateRotate && (P = S = _));
      const O = {
        x: p,
        y: g,
        innerRadius: 0,
        outerRadius: A,
        startAngle: P,
        endAngle: S,
        options: this.resolveDataElementOptions(b, M.active ? "active" : r)
      };
      this.updateElement(M, b, O, r);
    }
  }
  countVisibleElements() {
    const t = this._cachedMeta;
    let e = 0;
    return t.data.forEach((s, r) => {
      !isNaN(this.getParsed(r).r) && this.chart.getDataVisibility(r) && e++;
    }), e;
  }
  _computeAngle(t, e, s) {
    return this.chart.getDataVisibility(t) ? ae(this.resolveDataElementOptions(t, e).angle || s) : 0;
  }
}
z(pn, "id", "polarArea"), z(pn, "defaults", {
  dataElementType: "arc",
  animation: {
    animateRotate: !0,
    animateScale: !0
  },
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "startAngle",
        "endAngle",
        "innerRadius",
        "outerRadius"
      ]
    }
  },
  indexAxis: "r",
  startAngle: 0
}), z(pn, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(t) {
          const e = t.data;
          if (e.labels.length && e.datasets.length) {
            const { labels: { pointStyle: s, color: r } } = t.legend.options;
            return e.labels.map((o, a) => {
              const c = t.getDatasetMeta(0).controller.getStyle(a);
              return {
                text: o,
                fillStyle: c.backgroundColor,
                strokeStyle: c.borderColor,
                fontColor: r,
                lineWidth: c.borderWidth,
                pointStyle: s,
                hidden: !t.getDataVisibility(a),
                index: a
              };
            });
          }
          return [];
        }
      },
      onClick(t, e, s) {
        s.chart.toggleDataVisibility(e.index), s.chart.update();
      }
    }
  },
  scales: {
    r: {
      type: "radialLinear",
      angleLines: {
        display: !1
      },
      beginAtZero: !0,
      grid: {
        circular: !0
      },
      pointLabels: {
        display: !1
      },
      startAngle: 0
    }
  }
});
class To extends ai {
}
z(To, "id", "pie"), z(To, "defaults", {
  cutout: 0,
  rotation: 0,
  circumference: 360,
  radius: "100%"
});
class vs extends le {
  getLabelAndValue(t) {
    const e = this._cachedMeta.vScale, s = this.getParsed(t);
    return {
      label: e.getLabels()[t],
      value: "" + e.getLabelForValue(s[e.axis])
    };
  }
  parseObjectData(t, e, s, r) {
    return Yl.bind(this)(t, e, s, r);
  }
  update(t) {
    const e = this._cachedMeta, s = e.dataset, r = e.data || [], o = e.iScale.getLabels();
    if (s.points = r, t !== "resize") {
      const a = this.resolveDatasetElementOptions(t);
      this.options.showLine || (a.borderWidth = 0);
      const h = {
        _loop: !0,
        _fullLoop: o.length === r.length,
        options: a
      };
      this.updateElement(s, void 0, h, t);
    }
    this.updateElements(r, 0, r.length, t);
  }
  updateElements(t, e, s, r) {
    const o = this._cachedMeta.rScale, a = r === "reset";
    for (let h = e; h < e + s; h++) {
      const c = t[h], d = this.resolveDataElementOptions(h, c.active ? "active" : r), p = o.getPointPositionForValue(h, this.getParsed(h).r), g = a ? o.xCenter : p.x, _ = a ? o.yCenter : p.y, v = {
        x: g,
        y: _,
        angle: p.angle,
        skip: isNaN(g) || isNaN(_),
        options: d
      };
      this.updateElement(c, h, v, r);
    }
  }
}
z(vs, "id", "radar"), z(vs, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  indexAxis: "r",
  showLine: !0,
  elements: {
    line: {
      fill: "start"
    }
  }
}), z(vs, "overrides", {
  aspectRatio: 1,
  scales: {
    r: {
      type: "radialLinear"
    }
  }
});
class ys extends le {
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = this.chart.data.labels || [], { xScale: r, yScale: o } = e, a = this.getParsed(t), h = r.getLabelForValue(a.x), c = o.getLabelForValue(a.y);
    return {
      label: s[t] || "",
      value: "(" + h + ", " + c + ")"
    };
  }
  update(t) {
    const e = this._cachedMeta, { data: s = [] } = e, r = this.chart._animationsDisabled;
    let { start: o, count: a } = Fl(e, s, r);
    if (this._drawStart = o, this._drawCount = a, Nl(e) && (o = 0, a = s.length), this.options.showLine) {
      this.datasetElementType || this.addElements();
      const { dataset: h, _dataset: c } = e;
      h._chart = this.chart, h._datasetIndex = this.index, h._decimated = !!c._decimated, h.points = s;
      const d = this.resolveDatasetElementOptions(t);
      d.segment = this.options.segment, this.updateElement(h, void 0, {
        animated: !r,
        options: d
      }, t);
    } else
      this.datasetElementType && (delete e.dataset, this.datasetElementType = !1);
    this.updateElements(s, o, a, t);
  }
  addElements() {
    const { showLine: t } = this.options;
    !this.datasetElementType && t && (this.datasetElementType = this.chart.registry.getElement("line")), super.addElements();
  }
  updateElements(t, e, s, r) {
    const o = r === "reset", { iScale: a, vScale: h, _stacked: c, _dataset: d } = this._cachedMeta, p = this.resolveDataElementOptions(e, r), g = this.getSharedOptions(p), _ = this.includeOptions(r, g), v = a.axis, b = h.axis, { spanGaps: x, segment: M } = this.options, P = Oi(x) ? x : Number.POSITIVE_INFINITY, S = this.chart._animationsDisabled || o || r === "none";
    let A = e > 0 && this.getParsed(e - 1);
    for (let O = e; O < e + s; ++O) {
      const T = t[O], I = this.getParsed(O), D = S ? T : {}, B = rt(I[b]), N = D[v] = a.getPixelForValue(I[v], O), Y = D[b] = o || B ? h.getBasePixel() : h.getPixelForValue(c ? this.applyStack(h, I, c) : I[b], O);
      D.skip = isNaN(N) || isNaN(Y) || B, D.stop = O > 0 && Math.abs(I[v] - A[v]) > P, M && (D.parsed = I, D.raw = d.data[O]), _ && (D.options = g || this.resolveDataElementOptions(O, T.active ? "active" : r)), S || this.updateElement(T, O, D, r), A = I;
    }
    this.updateSharedOptions(g, r, p);
  }
  getMaxOverflow() {
    const t = this._cachedMeta, e = t.data || [];
    if (!this.options.showLine) {
      let h = 0;
      for (let c = e.length - 1; c >= 0; --c)
        h = Math.max(h, e[c].size(this.resolveDataElementOptions(c)) / 2);
      return h > 0 && h;
    }
    const s = t.dataset, r = s.options && s.options.borderWidth || 0;
    if (!e.length)
      return r;
    const o = e[0].size(this.resolveDataElementOptions(0)), a = e[e.length - 1].size(this.resolveDataElementOptions(e.length - 1));
    return Math.max(r, o, a) / 2;
  }
}
z(ys, "id", "scatter"), z(ys, "defaults", {
  datasetElementType: !1,
  dataElementType: "point",
  showLine: !1,
  fill: !1
}), z(ys, "overrides", {
  interaction: {
    mode: "point"
  },
  scales: {
    x: {
      type: "linear"
    },
    y: {
      type: "linear"
    }
  }
});
var Wd = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  BarController: gs,
  BubbleController: ms,
  DoughnutController: ai,
  LineController: _s,
  PieController: To,
  PolarAreaController: pn,
  RadarController: vs,
  ScatterController: ys
});
function ni() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class er {
  constructor(t) {
    z(this, "options");
    this.options = t || {};
  }
  /**
  * Override default date adapter methods.
  * Accepts type parameter to define options type.
  * @example
  * Chart._adapters._date.override<{myAdapterOption: string}>({
  *   init() {
  *     console.log(this.options.myAdapterOption);
  *   }
  * })
  */
  static override(t) {
    Object.assign(er.prototype, t);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return ni();
  }
  parse() {
    return ni();
  }
  format() {
    return ni();
  }
  add() {
    return ni();
  }
  diff() {
    return ni();
  }
  startOf() {
    return ni();
  }
  endOf() {
    return ni();
  }
}
var Vd = {
  _date: er
};
function jd(n, t, e, s) {
  const { controller: r, data: o, _sorted: a } = n, h = r._cachedMeta.iScale;
  if (h && t === h.axis && t !== "r" && a && o.length) {
    const c = h._reversePixels ? fu : Te;
    if (s) {
      if (r._sharedOptions) {
        const d = o[0], p = typeof d.getRange == "function" && d.getRange(t);
        if (p) {
          const g = c(o, t, e - p), _ = c(o, t, e + p);
          return {
            lo: g.lo,
            hi: _.hi
          };
        }
      }
    } else
      return c(o, t, e);
  }
  return {
    lo: 0,
    hi: o.length - 1
  };
}
function Pn(n, t, e, s, r) {
  const o = n.getSortedVisibleDatasetMetas(), a = e[t];
  for (let h = 0, c = o.length; h < c; ++h) {
    const { index: d, data: p } = o[h], { lo: g, hi: _ } = jd(o[h], t, a, r);
    for (let v = g; v <= _; ++v) {
      const b = p[v];
      b.skip || s(b, d, v);
    }
  }
}
function Ud(n) {
  const t = n.indexOf("x") !== -1, e = n.indexOf("y") !== -1;
  return function(s, r) {
    const o = t ? Math.abs(s.x - r.x) : 0, a = e ? Math.abs(s.y - r.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(a, 2));
  };
}
function _o(n, t, e, s, r) {
  const o = [];
  return !r && !n.isPointInArea(t) || Pn(n, e, t, function(h, c, d) {
    !r && !Ae(h, n.chartArea, 0) || h.inRange(t.x, t.y, s) && o.push({
      element: h,
      datasetIndex: c,
      index: d
    });
  }, !0), o;
}
function Gd(n, t, e, s) {
  let r = [];
  function o(a, h, c) {
    const { startAngle: d, endAngle: p } = a.getProps([
      "startAngle",
      "endAngle"
    ], s), { angle: g } = Il(a, {
      x: t.x,
      y: t.y
    });
    vn(g, d, p) && r.push({
      element: a,
      datasetIndex: h,
      index: c
    });
  }
  return Pn(n, e, t, o), r;
}
function Yd(n, t, e, s, r, o) {
  let a = [];
  const h = Ud(e);
  let c = Number.POSITIVE_INFINITY;
  function d(p, g, _) {
    const v = p.inRange(t.x, t.y, r);
    if (s && !v)
      return;
    const b = p.getCenterPoint(r);
    if (!(!!o || n.isPointInArea(b)) && !v)
      return;
    const M = h(t, b);
    M < c ? (a = [
      {
        element: p,
        datasetIndex: g,
        index: _
      }
    ], c = M) : M === c && a.push({
      element: p,
      datasetIndex: g,
      index: _
    });
  }
  return Pn(n, e, t, d), a;
}
function vo(n, t, e, s, r, o) {
  return !o && !n.isPointInArea(t) ? [] : e === "r" && !s ? Gd(n, t, e, r) : Yd(n, t, e, s, r, o);
}
function Oa(n, t, e, s, r) {
  const o = [], a = e === "x" ? "inXRange" : "inYRange";
  let h = !1;
  return Pn(n, e, t, (c, d, p) => {
    c[a] && c[a](t[e], r) && (o.push({
      element: c,
      datasetIndex: d,
      index: p
    }), h = h || c.inRange(t.x, t.y, r));
  }), s && !h ? [] : o;
}
var qd = {
  evaluateInteractionItems: Pn,
  modes: {
    index(n, t, e, s) {
      const r = oi(t, n), o = e.axis || "x", a = e.includeInvisible || !1, h = e.intersect ? _o(n, r, o, s, a) : vo(n, r, o, !1, s, a), c = [];
      return h.length ? (n.getSortedVisibleDatasetMetas().forEach((d) => {
        const p = h[0].index, g = d.data[p];
        g && !g.skip && c.push({
          element: g,
          datasetIndex: d.index,
          index: p
        });
      }), c) : [];
    },
    dataset(n, t, e, s) {
      const r = oi(t, n), o = e.axis || "xy", a = e.includeInvisible || !1;
      let h = e.intersect ? _o(n, r, o, s, a) : vo(n, r, o, !1, s, a);
      if (h.length > 0) {
        const c = h[0].datasetIndex, d = n.getDatasetMeta(c).data;
        h = [];
        for (let p = 0; p < d.length; ++p)
          h.push({
            element: d[p],
            datasetIndex: c,
            index: p
          });
      }
      return h;
    },
    point(n, t, e, s) {
      const r = oi(t, n), o = e.axis || "xy", a = e.includeInvisible || !1;
      return _o(n, r, o, s, a);
    },
    nearest(n, t, e, s) {
      const r = oi(t, n), o = e.axis || "xy", a = e.includeInvisible || !1;
      return vo(n, r, o, e.intersect, s, a);
    },
    x(n, t, e, s) {
      const r = oi(t, n);
      return Oa(n, r, "x", e.intersect, s);
    },
    y(n, t, e, s) {
      const r = oi(t, n);
      return Oa(n, r, "y", e.intersect, s);
    }
  }
};
const nh = [
  "left",
  "top",
  "right",
  "bottom"
];
function Qi(n, t) {
  return n.filter((e) => e.pos === t);
}
function Ea(n, t) {
  return n.filter((e) => nh.indexOf(e.pos) === -1 && e.box.axis === t);
}
function tn(n, t) {
  return n.sort((e, s) => {
    const r = t ? s : e, o = t ? e : s;
    return r.weight === o.weight ? r.index - o.index : r.weight - o.weight;
  });
}
function Xd(n) {
  const t = [];
  let e, s, r, o, a, h;
  for (e = 0, s = (n || []).length; e < s; ++e)
    r = n[e], { position: o, options: { stack: a, stackWeight: h = 1 } } = r, t.push({
      index: e,
      box: r,
      pos: o,
      horizontal: r.isHorizontal(),
      weight: r.weight,
      stack: a && o + a,
      stackWeight: h
    });
  return t;
}
function Kd(n) {
  const t = {};
  for (const e of n) {
    const { stack: s, pos: r, stackWeight: o } = e;
    if (!s || !nh.includes(r))
      continue;
    const a = t[s] || (t[s] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    a.count++, a.weight += o;
  }
  return t;
}
function Jd(n, t) {
  const e = Kd(n), { vBoxMaxWidth: s, hBoxMaxHeight: r } = t;
  let o, a, h;
  for (o = 0, a = n.length; o < a; ++o) {
    h = n[o];
    const { fullSize: c } = h.box, d = e[h.stack], p = d && h.stackWeight / d.weight;
    h.horizontal ? (h.width = p ? p * s : c && t.availableWidth, h.height = r) : (h.width = s, h.height = p ? p * r : c && t.availableHeight);
  }
  return e;
}
function $d(n) {
  const t = Xd(n), e = tn(t.filter((d) => d.box.fullSize), !0), s = tn(Qi(t, "left"), !0), r = tn(Qi(t, "right")), o = tn(Qi(t, "top"), !0), a = tn(Qi(t, "bottom")), h = Ea(t, "x"), c = Ea(t, "y");
  return {
    fullSize: e,
    leftAndTop: s.concat(o),
    rightAndBottom: r.concat(c).concat(a).concat(h),
    chartArea: Qi(t, "chartArea"),
    vertical: s.concat(r).concat(c),
    horizontal: o.concat(a).concat(h)
  };
}
function Ia(n, t, e, s) {
  return Math.max(n[e], t[e]) + Math.max(n[s], t[s]);
}
function sh(n, t) {
  n.top = Math.max(n.top, t.top), n.left = Math.max(n.left, t.left), n.bottom = Math.max(n.bottom, t.bottom), n.right = Math.max(n.right, t.right);
}
function Qd(n, t, e, s) {
  const { pos: r, box: o } = e, a = n.maxPadding;
  if (!nt(r)) {
    e.size && (n[r] -= e.size);
    const g = s[e.stack] || {
      size: 0,
      count: 1
    };
    g.size = Math.max(g.size, e.horizontal ? o.height : o.width), e.size = g.size / g.count, n[r] += e.size;
  }
  o.getPadding && sh(a, o.getPadding());
  const h = Math.max(0, t.outerWidth - Ia(a, n, "left", "right")), c = Math.max(0, t.outerHeight - Ia(a, n, "top", "bottom")), d = h !== n.w, p = c !== n.h;
  return n.w = h, n.h = c, e.horizontal ? {
    same: d,
    other: p
  } : {
    same: p,
    other: d
  };
}
function tf(n) {
  const t = n.maxPadding;
  function e(s) {
    const r = Math.max(t[s] - n[s], 0);
    return n[s] += r, r;
  }
  n.y += e("top"), n.x += e("left"), e("right"), e("bottom");
}
function ef(n, t) {
  const e = t.maxPadding;
  function s(r) {
    const o = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return r.forEach((a) => {
      o[a] = Math.max(t[a], e[a]);
    }), o;
  }
  return s(n ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function rn(n, t, e, s) {
  const r = [];
  let o, a, h, c, d, p;
  for (o = 0, a = n.length, d = 0; o < a; ++o) {
    h = n[o], c = h.box, c.update(h.width || t.w, h.height || t.h, ef(h.horizontal, t));
    const { same: g, other: _ } = Qd(t, e, h, s);
    d |= g && r.length, p = p || _, c.fullSize || r.push(h);
  }
  return d && rn(r, t, e, s) || p;
}
function os(n, t, e, s, r) {
  n.top = e, n.left = t, n.right = t + s, n.bottom = e + r, n.width = s, n.height = r;
}
function Da(n, t, e, s) {
  const r = e.padding;
  let { x: o, y: a } = t;
  for (const h of n) {
    const c = h.box, d = s[h.stack] || {
      count: 1,
      placed: 0,
      weight: 1
    }, p = h.stackWeight / d.weight || 1;
    if (h.horizontal) {
      const g = t.w * p, _ = d.size || c.height;
      _n(d.start) && (a = d.start), c.fullSize ? os(c, r.left, a, e.outerWidth - r.right - r.left, _) : os(c, t.left + d.placed, a, g, _), d.start = a, d.placed += g, a = c.bottom;
    } else {
      const g = t.h * p, _ = d.size || c.width;
      _n(d.start) && (o = d.start), c.fullSize ? os(c, o, r.top, _, e.outerHeight - r.bottom - r.top) : os(c, o, t.top + d.placed, _, g), d.start = o, d.placed += g, o = c.right;
    }
  }
  t.x = o, t.y = a;
}
var Ht = {
  addBox(n, t) {
    n.boxes || (n.boxes = []), t.fullSize = t.fullSize || !1, t.position = t.position || "top", t.weight = t.weight || 0, t._layers = t._layers || function() {
      return [
        {
          z: 0,
          draw(e) {
            t.draw(e);
          }
        }
      ];
    }, n.boxes.push(t);
  },
  removeBox(n, t) {
    const e = n.boxes ? n.boxes.indexOf(t) : -1;
    e !== -1 && n.boxes.splice(e, 1);
  },
  configure(n, t, e) {
    t.fullSize = e.fullSize, t.position = e.position, t.weight = e.weight;
  },
  update(n, t, e, s) {
    if (!n)
      return;
    const r = Wt(n.options.layout.padding), o = Math.max(t - r.width, 0), a = Math.max(e - r.height, 0), h = $d(n.boxes), c = h.vertical, d = h.horizontal;
    ft(n.boxes, (x) => {
      typeof x.beforeLayout == "function" && x.beforeLayout();
    });
    const p = c.reduce((x, M) => M.box.options && M.box.options.display === !1 ? x : x + 1, 0) || 1, g = Object.freeze({
      outerWidth: t,
      outerHeight: e,
      padding: r,
      availableWidth: o,
      availableHeight: a,
      vBoxMaxWidth: o / 2 / p,
      hBoxMaxHeight: a / 2
    }), _ = Object.assign({}, r);
    sh(_, Wt(s));
    const v = Object.assign({
      maxPadding: _,
      w: o,
      h: a,
      x: r.left,
      y: r.top
    }, r), b = Jd(c.concat(d), g);
    rn(h.fullSize, v, g, b), rn(c, v, g, b), rn(d, v, g, b) && rn(c, v, g, b), tf(v), Da(h.leftAndTop, v, g, b), v.x += v.w, v.y += v.h, Da(h.rightAndBottom, v, g, b), n.chartArea = {
      left: v.left,
      top: v.top,
      right: v.left + v.w,
      bottom: v.top + v.h,
      height: v.h,
      width: v.w
    }, ft(h.chartArea, (x) => {
      const M = x.box;
      Object.assign(M, n.chartArea), M.update(v.w, v.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class oh {
  acquireContext(t, e) {
  }
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, e, s) {
  }
  removeEventListener(t, e, s) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, e, s, r) {
    return e = Math.max(0, e || t.width), s = s || t.height, {
      width: e,
      height: Math.max(0, r ? Math.floor(e / r) : s)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class nf extends oh {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const bs = "$chartjs", sf = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, za = (n) => n === null || n === "";
function of(n, t) {
  const e = n.style, s = n.getAttribute("height"), r = n.getAttribute("width");
  if (n[bs] = {
    initial: {
      height: s,
      width: r,
      style: {
        display: e.display,
        height: e.height,
        width: e.width
      }
    }
  }, e.display = e.display || "block", e.boxSizing = e.boxSizing || "border-box", za(r)) {
    const o = va(n, "width");
    o !== void 0 && (n.width = o);
  }
  if (za(s))
    if (n.style.height === "")
      n.height = n.width / (t || 2);
    else {
      const o = va(n, "height");
      o !== void 0 && (n.height = o);
    }
  return n;
}
const rh = rd ? {
  passive: !0
} : !1;
function rf(n, t, e) {
  n && n.addEventListener(t, e, rh);
}
function af(n, t, e) {
  n && n.canvas && n.canvas.removeEventListener(t, e, rh);
}
function lf(n, t) {
  const e = sf[n.type] || n.type, { x: s, y: r } = oi(n, t);
  return {
    type: e,
    chart: t,
    native: n,
    x: s !== void 0 ? s : null,
    y: r !== void 0 ? r : null
  };
}
function Ts(n, t) {
  for (const e of n)
    if (e === t || e.contains(t))
      return !0;
}
function hf(n, t, e) {
  const s = n.canvas, r = new MutationObserver((o) => {
    let a = !1;
    for (const h of o)
      a = a || Ts(h.addedNodes, s), a = a && !Ts(h.removedNodes, s);
    a && e();
  });
  return r.observe(document, {
    childList: !0,
    subtree: !0
  }), r;
}
function cf(n, t, e) {
  const s = n.canvas, r = new MutationObserver((o) => {
    let a = !1;
    for (const h of o)
      a = a || Ts(h.removedNodes, s), a = a && !Ts(h.addedNodes, s);
    a && e();
  });
  return r.observe(document, {
    childList: !0,
    subtree: !0
  }), r;
}
const bn = /* @__PURE__ */ new Map();
let Ba = 0;
function ah() {
  const n = window.devicePixelRatio;
  n !== Ba && (Ba = n, bn.forEach((t, e) => {
    e.currentDevicePixelRatio !== n && t();
  }));
}
function uf(n, t) {
  bn.size || window.addEventListener("resize", ah), bn.set(n, t);
}
function df(n) {
  bn.delete(n), bn.size || window.removeEventListener("resize", ah);
}
function ff(n, t, e) {
  const s = n.canvas, r = s && tr(s);
  if (!r)
    return;
  const o = Rl((h, c) => {
    const d = r.clientWidth;
    e(h, c), d < r.clientWidth && e();
  }, window), a = new ResizeObserver((h) => {
    const c = h[0], d = c.contentRect.width, p = c.contentRect.height;
    d === 0 && p === 0 || o(d, p);
  });
  return a.observe(r), uf(n, o), a;
}
function yo(n, t, e) {
  e && e.disconnect(), t === "resize" && df(n);
}
function pf(n, t, e) {
  const s = n.canvas, r = Rl((o) => {
    n.ctx !== null && e(lf(o, n));
  }, n);
  return rf(s, t, r), r;
}
class gf extends oh {
  acquireContext(t, e) {
    const s = t && t.getContext && t.getContext("2d");
    return s && s.canvas === t ? (of(t, e), s) : null;
  }
  releaseContext(t) {
    const e = t.canvas;
    if (!e[bs])
      return !1;
    const s = e[bs].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const a = s[o];
      rt(a) ? e.removeAttribute(o) : e.setAttribute(o, a);
    });
    const r = s.style || {};
    return Object.keys(r).forEach((o) => {
      e.style[o] = r[o];
    }), e.width = e.width, delete e[bs], !0;
  }
  addEventListener(t, e, s) {
    this.removeEventListener(t, e);
    const r = t.$proxies || (t.$proxies = {}), a = {
      attach: hf,
      detach: cf,
      resize: ff
    }[e] || pf;
    r[e] = a(t, e, s);
  }
  removeEventListener(t, e) {
    const s = t.$proxies || (t.$proxies = {}), r = s[e];
    if (!r)
      return;
    ({
      attach: yo,
      detach: yo,
      resize: yo
    }[e] || af)(t, e, r), s[e] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, e, s, r) {
    return od(t, e, s, r);
  }
  isAttached(t) {
    const e = t && tr(t);
    return !!(e && e.isConnected);
  }
}
function mf(n) {
  return !Qo() || typeof OffscreenCanvas < "u" && n instanceof OffscreenCanvas ? nf : gf;
}
var ps;
let Oe = (ps = class {
  constructor() {
    z(this, "x");
    z(this, "y");
    z(this, "active", !1);
    z(this, "options");
    z(this, "$animations");
  }
  tooltipPosition(t) {
    const { x: e, y: s } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: e,
      y: s
    };
  }
  hasValue() {
    return Oi(this.x) && Oi(this.y);
  }
  getProps(t, e) {
    const s = this.$animations;
    if (!e || !s)
      return this;
    const r = {};
    return t.forEach((o) => {
      r[o] = s[o] && s[o].active() ? s[o]._to : this[o];
    }), r;
  }
}, z(ps, "defaults", {}), z(ps, "defaultRoutes"), ps);
function _f(n, t) {
  const e = n.options.ticks, s = vf(n), r = Math.min(e.maxTicksLimit || s, s), o = e.major.enabled ? bf(t) : [], a = o.length, h = o[0], c = o[a - 1], d = [];
  if (a > r)
    return xf(t, d, o, a / r), d;
  const p = yf(o, t, r);
  if (a > 0) {
    let g, _;
    const v = a > 1 ? Math.round((c - h) / (a - 1)) : null;
    for (rs(t, d, p, rt(v) ? 0 : h - v, h), g = 0, _ = a - 1; g < _; g++)
      rs(t, d, p, o[g], o[g + 1]);
    return rs(t, d, p, c, rt(v) ? t.length : c + v), d;
  }
  return rs(t, d, p), d;
}
function vf(n) {
  const t = n.options.offset, e = n._tickSize(), s = n._length / e + (t ? 0 : 1), r = n._maxLength / e;
  return Math.floor(Math.min(s, r));
}
function yf(n, t, e) {
  const s = wf(n), r = t.length / e;
  if (!s)
    return Math.max(r, 1);
  const o = hu(s);
  for (let a = 0, h = o.length - 1; a < h; a++) {
    const c = o[a];
    if (c > r)
      return c;
  }
  return Math.max(r, 1);
}
function bf(n) {
  const t = [];
  let e, s;
  for (e = 0, s = n.length; e < s; e++)
    n[e].major && t.push(e);
  return t;
}
function xf(n, t, e, s) {
  let r = 0, o = e[0], a;
  for (s = Math.ceil(s), a = 0; a < n.length; a++)
    a === o && (t.push(n[a]), r++, o = e[r * s]);
}
function rs(n, t, e, s, r) {
  const o = X(s, 0), a = Math.min(X(r, n.length), n.length);
  let h = 0, c, d, p;
  for (e = Math.ceil(e), r && (c = r - s, e = c / Math.floor(c / e)), p = o; p < 0; )
    h++, p = Math.round(o + h * e);
  for (d = Math.max(o, 0); d < a; d++)
    d === p && (t.push(n[d]), h++, p = Math.round(o + h * e));
}
function wf(n) {
  const t = n.length;
  let e, s;
  if (t < 2)
    return !1;
  for (s = n[0], e = 1; e < t; ++e)
    if (n[e] - n[e - 1] !== s)
      return !1;
  return s;
}
const Lf = (n) => n === "left" ? "right" : n === "right" ? "left" : n, Ra = (n, t, e) => t === "top" || t === "left" ? n[t] + e : n[t] - e, Fa = (n, t) => Math.min(t || n, n);
function Na(n, t) {
  const e = [], s = n.length / t, r = n.length;
  let o = 0;
  for (; o < r; o += s)
    e.push(n[Math.floor(o)]);
  return e;
}
function Mf(n, t, e) {
  const s = n.ticks.length, r = Math.min(t, s - 1), o = n._startPixel, a = n._endPixel, h = 1e-6;
  let c = n.getPixelForTick(r), d;
  if (!(e && (s === 1 ? d = Math.max(c - o, a - c) : t === 0 ? d = (n.getPixelForTick(1) - c) / 2 : d = (c - n.getPixelForTick(r - 1)) / 2, c += r < t ? d : -d, c < o - h || c > a + h)))
    return c;
}
function Pf(n, t) {
  ft(n, (e) => {
    const s = e.gc, r = s.length / 2;
    let o;
    if (r > t) {
      for (o = 0; o < r; ++o)
        delete e.data[s[o]];
      s.splice(0, r);
    }
  });
}
function en(n) {
  return n.drawTicks ? n.tickLength : 0;
}
function Za(n, t) {
  if (!n.display)
    return 0;
  const e = Dt(n.font, t), s = Wt(n.padding);
  return (vt(n.text) ? n.text.length : 1) * e.lineHeight + s.height;
}
function kf(n, t) {
  return We(n, {
    scale: t,
    type: "scale"
  });
}
function Sf(n, t, e) {
  return We(n, {
    tick: e,
    index: t,
    type: "tick"
  });
}
function Cf(n, t, e) {
  let s = Yo(n);
  return (e && t !== "right" || !e && t === "right") && (s = Lf(s)), s;
}
function Tf(n, t, e, s) {
  const { top: r, left: o, bottom: a, right: h, chart: c } = n, { chartArea: d, scales: p } = c;
  let g = 0, _, v, b;
  const x = a - r, M = h - o;
  if (n.isHorizontal()) {
    if (v = Zt(s, o, h), nt(e)) {
      const P = Object.keys(e)[0], S = e[P];
      b = p[P].getPixelForValue(S) + x - t;
    } else
      e === "center" ? b = (d.bottom + d.top) / 2 + x - t : b = Ra(n, e, t);
    _ = h - o;
  } else {
    if (nt(e)) {
      const P = Object.keys(e)[0], S = e[P];
      v = p[P].getPixelForValue(S) - M + t;
    } else
      e === "center" ? v = (d.left + d.right) / 2 - M + t : v = Ra(n, e, t);
    b = Zt(s, a, r), g = e === "left" ? -At : At;
  }
  return {
    titleX: v,
    titleY: b,
    maxWidth: _,
    rotation: g
  };
}
class di extends Oe {
  constructor(t) {
    super(), this.id = t.id, this.type = t.type, this.options = void 0, this.ctx = t.ctx, this.chart = t.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0;
  }
  init(t) {
    this.options = t.setContext(this.getContext()), this.axis = t.axis, this._userMin = this.parse(t.min), this._userMax = this.parse(t.max), this._suggestedMin = this.parse(t.suggestedMin), this._suggestedMax = this.parse(t.suggestedMax);
  }
  parse(t, e) {
    return t;
  }
  getUserBounds() {
    let { _userMin: t, _userMax: e, _suggestedMin: s, _suggestedMax: r } = this;
    return t = Xt(t, Number.POSITIVE_INFINITY), e = Xt(e, Number.NEGATIVE_INFINITY), s = Xt(s, Number.POSITIVE_INFINITY), r = Xt(r, Number.NEGATIVE_INFINITY), {
      min: Xt(t, s),
      max: Xt(e, r),
      minDefined: St(t),
      maxDefined: St(e)
    };
  }
  getMinMax(t) {
    let { min: e, max: s, minDefined: r, maxDefined: o } = this.getUserBounds(), a;
    if (r && o)
      return {
        min: e,
        max: s
      };
    const h = this.getMatchingVisibleMetas();
    for (let c = 0, d = h.length; c < d; ++c)
      a = h[c].controller.getMinMax(this, t), r || (e = Math.min(e, a.min)), o || (s = Math.max(s, a.max));
    return e = o && e > s ? s : e, s = r && e > s ? e : s, {
      min: Xt(e, Xt(s, e)),
      max: Xt(s, Xt(e, s))
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
    const t = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || [];
  }
  getLabelItems(t = this.chart.chartArea) {
    return this._labelItems || (this._labelItems = this._computeLabelItems(t));
  }
  beforeLayout() {
    this._cache = {}, this._dataLimitsCached = !1;
  }
  beforeUpdate() {
    mt(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, e, s) {
    const { beginAtZero: r, grace: o, ticks: a } = this.options, h = a.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = e, this._margins = s = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, s), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + s.left + s.right : this.height + s.top + s.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Ru(this, o, r), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const c = h < this.ticks.length;
    this._convertTicksToLabels(c ? Na(this.ticks, h) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), a.display && (a.autoSkip || a.source === "auto") && (this.ticks = _f(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), c && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, e, s;
    this.isHorizontal() ? (e = this.left, s = this.right) : (e = this.top, s = this.bottom, t = !t), this._startPixel = e, this._endPixel = s, this._reversePixels = t, this._length = s - e, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    mt(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    mt(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    mt(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), mt(this.options[t], [
      this
    ]);
  }
  beforeDataLimits() {
    this._callHooks("beforeDataLimits");
  }
  determineDataLimits() {
  }
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
    mt(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const e = this.options.ticks;
    let s, r, o;
    for (s = 0, r = t.length; s < r; s++)
      o = t[s], o.label = mt(e.callback, [
        o.value,
        s,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    mt(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    mt(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, e = t.ticks, s = Fa(this.ticks.length, t.ticks.maxTicksLimit), r = e.minRotation || 0, o = e.maxRotation;
    let a = r, h, c, d;
    if (!this._isVisible() || !e.display || r >= o || s <= 1 || !this.isHorizontal()) {
      this.labelRotation = r;
      return;
    }
    const p = this._getLabelSizes(), g = p.widest.width, _ = p.highest.height, v = Rt(this.chart.width - g, 0, this.maxWidth);
    h = t.offset ? this.maxWidth / s : v / (s - 1), g + 6 > h && (h = v / (s - (t.offset ? 0.5 : 1)), c = this.maxHeight - en(t.grid) - e.padding - Za(t.title, this.chart.options.font), d = Math.sqrt(g * g + _ * _), a = Uo(Math.min(Math.asin(Rt((p.highest.height + 6) / h, -1, 1)), Math.asin(Rt(c / d, -1, 1)) - Math.asin(Rt(_ / d, -1, 1)))), a = Math.max(r, Math.min(o, a))), this.labelRotation = a;
  }
  afterCalculateLabelRotation() {
    mt(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    mt(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: e, options: { ticks: s, title: r, grid: o } } = this, a = this._isVisible(), h = this.isHorizontal();
    if (a) {
      const c = Za(r, e.options.font);
      if (h ? (t.width = this.maxWidth, t.height = en(o) + c) : (t.height = this.maxHeight, t.width = en(o) + c), s.display && this.ticks.length) {
        const { first: d, last: p, widest: g, highest: _ } = this._getLabelSizes(), v = s.padding * 2, b = ae(this.labelRotation), x = Math.cos(b), M = Math.sin(b);
        if (h) {
          const P = s.mirror ? 0 : M * g.width + x * _.height;
          t.height = Math.min(this.maxHeight, t.height + P + v);
        } else {
          const P = s.mirror ? 0 : x * g.width + M * _.height;
          t.width = Math.min(this.maxWidth, t.width + P + v);
        }
        this._calculatePadding(d, p, M, x);
      }
    }
    this._handleMargins(), h ? (this.width = this._length = e.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = e.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, e, s, r) {
    const { ticks: { align: o, padding: a }, position: h } = this.options, c = this.labelRotation !== 0, d = h !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const p = this.getPixelForTick(0) - this.left, g = this.right - this.getPixelForTick(this.ticks.length - 1);
      let _ = 0, v = 0;
      c ? d ? (_ = r * t.width, v = s * e.height) : (_ = s * t.height, v = r * e.width) : o === "start" ? v = e.width : o === "end" ? _ = t.width : o !== "inner" && (_ = t.width / 2, v = e.width / 2), this.paddingLeft = Math.max((_ - p + a) * this.width / (this.width - p), 0), this.paddingRight = Math.max((v - g + a) * this.width / (this.width - g), 0);
    } else {
      let p = e.height / 2, g = t.height / 2;
      o === "start" ? (p = 0, g = t.height) : o === "end" && (p = e.height, g = 0), this.paddingTop = p + a, this.paddingBottom = g + a;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    mt(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis: t, position: e } = this.options;
    return e === "top" || e === "bottom" || t === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(t) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(t);
    let e, s;
    for (e = 0, s = t.length; e < s; e++)
      rt(t[e].label) && (t.splice(e, 1), s--, e--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const e = this.options.ticks.sampleSize;
      let s = this.ticks;
      e < s.length && (s = Na(s, e)), this._labelSizes = t = this._computeLabelSizes(s, s.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, e, s) {
    const { ctx: r, _longestTextCache: o } = this, a = [], h = [], c = Math.floor(e / Fa(e, s));
    let d = 0, p = 0, g, _, v, b, x, M, P, S, A, O, T;
    for (g = 0; g < e; g += c) {
      if (b = t[g].label, x = this._resolveTickFontOptions(g), r.font = M = x.string, P = o[M] = o[M] || {
        data: {},
        gc: []
      }, S = x.lineHeight, A = O = 0, !rt(b) && !vt(b))
        A = Ss(r, P.data, P.gc, A, b), O = S;
      else if (vt(b))
        for (_ = 0, v = b.length; _ < v; ++_)
          T = b[_], !rt(T) && !vt(T) && (A = Ss(r, P.data, P.gc, A, T), O += S);
      a.push(A), h.push(O), d = Math.max(A, d), p = Math.max(O, p);
    }
    Pf(o, e);
    const I = a.indexOf(d), D = h.indexOf(p), B = (N) => ({
      width: a[N] || 0,
      height: h[N] || 0
    });
    return {
      first: B(0),
      last: B(e - 1),
      widest: B(I),
      highest: B(D),
      widths: a,
      heights: h
    };
  }
  getLabelForValue(t) {
    return t;
  }
  getPixelForValue(t, e) {
    return NaN;
  }
  getValueForPixel(t) {
  }
  getPixelForTick(t) {
    const e = this.ticks;
    return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
  }
  getPixelForDecimal(t) {
    this._reversePixels && (t = 1 - t);
    const e = this._startPixel + t * this._length;
    return du(this._alignToPixels ? ii(this.chart, e, 0) : e);
  }
  getDecimalForPixel(t) {
    const e = (t - this._startPixel) / this._length;
    return this._reversePixels ? 1 - e : e;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: t, max: e } = this;
    return t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0;
  }
  getContext(t) {
    const e = this.ticks || [];
    if (t >= 0 && t < e.length) {
      const s = e[t];
      return s.$context || (s.$context = Sf(this.getContext(), t, s));
    }
    return this.$context || (this.$context = kf(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, e = ae(this.labelRotation), s = Math.abs(Math.cos(e)), r = Math.abs(Math.sin(e)), o = this._getLabelSizes(), a = t.autoSkipPadding || 0, h = o ? o.widest.width + a : 0, c = o ? o.highest.height + a : 0;
    return this.isHorizontal() ? c * s > h * r ? h / s : c / r : c * r < h * s ? c / s : h / r;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const e = this.axis, s = this.chart, r = this.options, { grid: o, position: a, border: h } = r, c = o.offset, d = this.isHorizontal(), g = this.ticks.length + (c ? 1 : 0), _ = en(o), v = [], b = h.setContext(this.getContext()), x = b.display ? b.width : 0, M = x / 2, P = function(J) {
      return ii(s, J, x);
    };
    let S, A, O, T, I, D, B, N, Y, Z, V, Ct;
    if (a === "top")
      S = P(this.bottom), D = this.bottom - _, N = S - M, Z = P(t.top) + M, Ct = t.bottom;
    else if (a === "bottom")
      S = P(this.top), Z = t.top, Ct = P(t.bottom) - M, D = S + M, N = this.top + _;
    else if (a === "left")
      S = P(this.right), I = this.right - _, B = S - M, Y = P(t.left) + M, V = t.right;
    else if (a === "right")
      S = P(this.left), Y = t.left, V = P(t.right) - M, I = S + M, B = this.left + _;
    else if (e === "x") {
      if (a === "center")
        S = P((t.top + t.bottom) / 2 + 0.5);
      else if (nt(a)) {
        const J = Object.keys(a)[0], dt = a[J];
        S = P(this.chart.scales[J].getPixelForValue(dt));
      }
      Z = t.top, Ct = t.bottom, D = S + M, N = D + _;
    } else if (e === "y") {
      if (a === "center")
        S = P((t.left + t.right) / 2);
      else if (nt(a)) {
        const J = Object.keys(a)[0], dt = a[J];
        S = P(this.chart.scales[J].getPixelForValue(dt));
      }
      I = S - M, B = I - _, Y = t.left, V = t.right;
    }
    const et = X(r.ticks.maxTicksLimit, g), ht = Math.max(1, Math.ceil(g / et));
    for (A = 0; A < g; A += ht) {
      const J = this.getContext(A), dt = o.setContext(J), H = h.setContext(J), pt = dt.lineWidth, F = dt.color, G = H.dash || [], ct = H.dashOffset, xt = dt.tickWidth, at = dt.tickColor, Q = dt.tickBorderDash || [], U = dt.tickBorderDashOffset;
      O = Mf(this, A, c), O !== void 0 && (T = ii(s, O, pt), d ? I = B = Y = V = T : D = N = Z = Ct = T, v.push({
        tx1: I,
        ty1: D,
        tx2: B,
        ty2: N,
        x1: Y,
        y1: Z,
        x2: V,
        y2: Ct,
        width: pt,
        color: F,
        borderDash: G,
        borderDashOffset: ct,
        tickWidth: xt,
        tickColor: at,
        tickBorderDash: Q,
        tickBorderDashOffset: U
      }));
    }
    return this._ticksLength = g, this._borderValue = S, v;
  }
  _computeLabelItems(t) {
    const e = this.axis, s = this.options, { position: r, ticks: o } = s, a = this.isHorizontal(), h = this.ticks, { align: c, crossAlign: d, padding: p, mirror: g } = o, _ = en(s.grid), v = _ + p, b = g ? -p : v, x = -ae(this.labelRotation), M = [];
    let P, S, A, O, T, I, D, B, N, Y, Z, V, Ct = "middle";
    if (r === "top")
      I = this.bottom - b, D = this._getXAxisLabelAlignment();
    else if (r === "bottom")
      I = this.top + b, D = this._getXAxisLabelAlignment();
    else if (r === "left") {
      const ht = this._getYAxisLabelAlignment(_);
      D = ht.textAlign, T = ht.x;
    } else if (r === "right") {
      const ht = this._getYAxisLabelAlignment(_);
      D = ht.textAlign, T = ht.x;
    } else if (e === "x") {
      if (r === "center")
        I = (t.top + t.bottom) / 2 + v;
      else if (nt(r)) {
        const ht = Object.keys(r)[0], J = r[ht];
        I = this.chart.scales[ht].getPixelForValue(J) + v;
      }
      D = this._getXAxisLabelAlignment();
    } else if (e === "y") {
      if (r === "center")
        T = (t.left + t.right) / 2 - v;
      else if (nt(r)) {
        const ht = Object.keys(r)[0], J = r[ht];
        T = this.chart.scales[ht].getPixelForValue(J);
      }
      D = this._getYAxisLabelAlignment(_).textAlign;
    }
    e === "y" && (c === "start" ? Ct = "top" : c === "end" && (Ct = "bottom"));
    const et = this._getLabelSizes();
    for (P = 0, S = h.length; P < S; ++P) {
      A = h[P], O = A.label;
      const ht = o.setContext(this.getContext(P));
      B = this.getPixelForTick(P) + o.labelOffset, N = this._resolveTickFontOptions(P), Y = N.lineHeight, Z = vt(O) ? O.length : 1;
      const J = Z / 2, dt = ht.color, H = ht.textStrokeColor, pt = ht.textStrokeWidth;
      let F = D;
      a ? (T = B, D === "inner" && (P === S - 1 ? F = this.options.reverse ? "left" : "right" : P === 0 ? F = this.options.reverse ? "right" : "left" : F = "center"), r === "top" ? d === "near" || x !== 0 ? V = -Z * Y + Y / 2 : d === "center" ? V = -et.highest.height / 2 - J * Y + Y : V = -et.highest.height + Y / 2 : d === "near" || x !== 0 ? V = Y / 2 : d === "center" ? V = et.highest.height / 2 - J * Y : V = et.highest.height - Z * Y, g && (V *= -1), x !== 0 && !ht.showLabelBackdrop && (T += Y / 2 * Math.sin(x))) : (I = B, V = (1 - Z) * Y / 2);
      let G;
      if (ht.showLabelBackdrop) {
        const ct = Wt(ht.backdropPadding), xt = et.heights[P], at = et.widths[P];
        let Q = V - ct.top, U = 0 - ct.left;
        switch (Ct) {
          case "middle":
            Q -= xt / 2;
            break;
          case "bottom":
            Q -= xt;
            break;
        }
        switch (D) {
          case "center":
            U -= at / 2;
            break;
          case "right":
            U -= at;
            break;
          case "inner":
            P === S - 1 ? U -= at : P > 0 && (U -= at / 2);
            break;
        }
        G = {
          left: U,
          top: Q,
          width: at + ct.width,
          height: xt + ct.height,
          color: ht.backdropColor
        };
      }
      M.push({
        label: O,
        font: N,
        textOffset: V,
        options: {
          rotation: x,
          color: dt,
          strokeColor: H,
          strokeWidth: pt,
          textAlign: F,
          textBaseline: Ct,
          translation: [
            T,
            I
          ],
          backdrop: G
        }
      });
    }
    return M;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: e } = this.options;
    if (-ae(this.labelRotation))
      return t === "top" ? "left" : "right";
    let r = "center";
    return e.align === "start" ? r = "left" : e.align === "end" ? r = "right" : e.align === "inner" && (r = "inner"), r;
  }
  _getYAxisLabelAlignment(t) {
    const { position: e, ticks: { crossAlign: s, mirror: r, padding: o } } = this.options, a = this._getLabelSizes(), h = t + o, c = a.widest.width;
    let d, p;
    return e === "left" ? r ? (p = this.right + o, s === "near" ? d = "left" : s === "center" ? (d = "center", p += c / 2) : (d = "right", p += c)) : (p = this.right - h, s === "near" ? d = "right" : s === "center" ? (d = "center", p -= c / 2) : (d = "left", p = this.left)) : e === "right" ? r ? (p = this.left + o, s === "near" ? d = "right" : s === "center" ? (d = "center", p -= c / 2) : (d = "left", p -= c)) : (p = this.left + h, s === "near" ? d = "left" : s === "center" ? (d = "center", p += c / 2) : (d = "right", p = this.right)) : d = "right", {
      textAlign: d,
      x: p
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const t = this.chart, e = this.options.position;
    if (e === "left" || e === "right")
      return {
        top: 0,
        left: this.left,
        bottom: t.height,
        right: this.right
      };
    if (e === "top" || e === "bottom")
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: t.width
      };
  }
  drawBackground() {
    const { ctx: t, options: { backgroundColor: e }, left: s, top: r, width: o, height: a } = this;
    e && (t.save(), t.fillStyle = e, t.fillRect(s, r, o, a), t.restore());
  }
  getLineWidthForValue(t) {
    const e = this.options.grid;
    if (!this._isVisible() || !e.display)
      return 0;
    const r = this.ticks.findIndex((o) => o.value === t);
    return r >= 0 ? e.setContext(this.getContext(r)).lineWidth : 0;
  }
  drawGrid(t) {
    const e = this.options.grid, s = this.ctx, r = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let o, a;
    const h = (c, d, p) => {
      !p.width || !p.color || (s.save(), s.lineWidth = p.width, s.strokeStyle = p.color, s.setLineDash(p.borderDash || []), s.lineDashOffset = p.borderDashOffset, s.beginPath(), s.moveTo(c.x, c.y), s.lineTo(d.x, d.y), s.stroke(), s.restore());
    };
    if (e.display)
      for (o = 0, a = r.length; o < a; ++o) {
        const c = r[o];
        e.drawOnChartArea && h({
          x: c.x1,
          y: c.y1
        }, {
          x: c.x2,
          y: c.y2
        }, c), e.drawTicks && h({
          x: c.tx1,
          y: c.ty1
        }, {
          x: c.tx2,
          y: c.ty2
        }, {
          color: c.tickColor,
          width: c.tickWidth,
          borderDash: c.tickBorderDash,
          borderDashOffset: c.tickBorderDashOffset
        });
      }
  }
  drawBorder() {
    const { chart: t, ctx: e, options: { border: s, grid: r } } = this, o = s.setContext(this.getContext()), a = s.display ? o.width : 0;
    if (!a)
      return;
    const h = r.setContext(this.getContext(0)).lineWidth, c = this._borderValue;
    let d, p, g, _;
    this.isHorizontal() ? (d = ii(t, this.left, a) - a / 2, p = ii(t, this.right, h) + h / 2, g = _ = c) : (g = ii(t, this.top, a) - a / 2, _ = ii(t, this.bottom, h) + h / 2, d = p = c), e.save(), e.lineWidth = o.width, e.strokeStyle = o.color, e.beginPath(), e.moveTo(d, g), e.lineTo(p, _), e.stroke(), e.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const s = this.ctx, r = this._computeLabelArea();
    r && Is(s, r);
    const o = this.getLabelItems(t);
    for (const a of o) {
      const h = a.options, c = a.font, d = a.label, p = a.textOffset;
      ui(s, d, 0, p, c, h);
    }
    r && Ds(s);
  }
  drawTitle() {
    const { ctx: t, options: { position: e, title: s, reverse: r } } = this;
    if (!s.display)
      return;
    const o = Dt(s.font), a = Wt(s.padding), h = s.align;
    let c = o.lineHeight / 2;
    e === "bottom" || e === "center" || nt(e) ? (c += a.bottom, vt(s.text) && (c += o.lineHeight * (s.text.length - 1))) : c += a.top;
    const { titleX: d, titleY: p, maxWidth: g, rotation: _ } = Tf(this, c, e, h);
    ui(t, s.text, 0, 0, o, {
      color: s.color,
      maxWidth: g,
      rotation: _,
      textAlign: Cf(h, e, r),
      textBaseline: "middle",
      translation: [
        d,
        p
      ]
    });
  }
  draw(t) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t));
  }
  _layers() {
    const t = this.options, e = t.ticks && t.ticks.z || 0, s = X(t.grid && t.grid.z, -1), r = X(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== di.prototype.draw ? [
      {
        z: e,
        draw: (o) => {
          this.draw(o);
        }
      }
    ] : [
      {
        z: s,
        draw: (o) => {
          this.drawBackground(), this.drawGrid(o), this.drawTitle();
        }
      },
      {
        z: r,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: e,
        draw: (o) => {
          this.drawLabels(o);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const e = this.chart.getSortedVisibleDatasetMetas(), s = this.axis + "AxisID", r = [];
    let o, a;
    for (o = 0, a = e.length; o < a; ++o) {
      const h = e[o];
      h[s] === this.id && (!t || h.type === t) && r.push(h);
    }
    return r;
  }
  _resolveTickFontOptions(t) {
    const e = this.options.ticks.setContext(this.getContext(t));
    return Dt(e.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class as {
  constructor(t, e, s) {
    this.type = t, this.scope = e, this.override = s, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const e = Object.getPrototypeOf(t);
    let s;
    Ef(e) && (s = this.register(e));
    const r = this.items, o = t.id, a = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in r || (r[o] = t, Af(t, a, s), this.override && Lt.override(t.id, t.overrides)), a;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const e = this.items, s = t.id, r = this.scope;
    s in e && delete e[s], r && s in Lt[r] && (delete Lt[r][s], this.override && delete ci[s]);
  }
}
function Af(n, t, e) {
  const s = mn(/* @__PURE__ */ Object.create(null), [
    e ? Lt.get(e) : {},
    Lt.get(t),
    n.defaults
  ]);
  Lt.set(t, s), n.defaultRoutes && Of(t, n.defaultRoutes), n.descriptors && Lt.describe(t, n.descriptors);
}
function Of(n, t) {
  Object.keys(t).forEach((e) => {
    const s = e.split("."), r = s.pop(), o = [
      n
    ].concat(s).join("."), a = t[e].split("."), h = a.pop(), c = a.join(".");
    Lt.route(o, r, c, h);
  });
}
function Ef(n) {
  return "id" in n && "defaults" in n;
}
class If {
  constructor() {
    this.controllers = new as(le, "datasets", !0), this.elements = new as(Oe, "elements"), this.plugins = new as(Object, "plugins"), this.scales = new as(di, "scales"), this._typedRegistries = [
      this.controllers,
      this.scales,
      this.elements
    ];
  }
  add(...t) {
    this._each("register", t);
  }
  remove(...t) {
    this._each("unregister", t);
  }
  addControllers(...t) {
    this._each("register", t, this.controllers);
  }
  addElements(...t) {
    this._each("register", t, this.elements);
  }
  addPlugins(...t) {
    this._each("register", t, this.plugins);
  }
  addScales(...t) {
    this._each("register", t, this.scales);
  }
  getController(t) {
    return this._get(t, this.controllers, "controller");
  }
  getElement(t) {
    return this._get(t, this.elements, "element");
  }
  getPlugin(t) {
    return this._get(t, this.plugins, "plugin");
  }
  getScale(t) {
    return this._get(t, this.scales, "scale");
  }
  removeControllers(...t) {
    this._each("unregister", t, this.controllers);
  }
  removeElements(...t) {
    this._each("unregister", t, this.elements);
  }
  removePlugins(...t) {
    this._each("unregister", t, this.plugins);
  }
  removeScales(...t) {
    this._each("unregister", t, this.scales);
  }
  _each(t, e, s) {
    [
      ...e
    ].forEach((r) => {
      const o = s || this._getRegistryForType(r);
      s || o.isForType(r) || o === this.plugins && r.id ? this._exec(t, o, r) : ft(r, (a) => {
        const h = s || this._getRegistryForType(a);
        this._exec(t, h, a);
      });
    });
  }
  _exec(t, e, s) {
    const r = jo(t);
    mt(s["before" + r], [], s), e[t](s), mt(s["after" + r], [], s);
  }
  _getRegistryForType(t) {
    for (let e = 0; e < this._typedRegistries.length; e++) {
      const s = this._typedRegistries[e];
      if (s.isForType(t))
        return s;
    }
    return this.plugins;
  }
  _get(t, e, s) {
    const r = e.get(t);
    if (r === void 0)
      throw new Error('"' + t + '" is not a registered ' + s + ".");
    return r;
  }
}
var me = /* @__PURE__ */ new If();
class Df {
  constructor() {
    this._init = [];
  }
  notify(t, e, s, r) {
    e === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install"));
    const o = r ? this._descriptors(t).filter(r) : this._descriptors(t), a = this._notify(o, t, e, s);
    return e === "afterDestroy" && (this._notify(o, t, "stop"), this._notify(this._init, t, "uninstall")), a;
  }
  _notify(t, e, s, r) {
    r = r || {};
    for (const o of t) {
      const a = o.plugin, h = a[s], c = [
        e,
        r,
        o.options
      ];
      if (mt(h, c, a) === !1 && r.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    rt(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const e = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), e;
  }
  _createDescriptors(t, e) {
    const s = t && t.config, r = X(s.options && s.options.plugins, {}), o = zf(s);
    return r === !1 && !e ? [] : Rf(t, o, r, e);
  }
  _notifyStateChanges(t) {
    const e = this._oldCache || [], s = this._cache, r = (o, a) => o.filter((h) => !a.some((c) => h.plugin.id === c.plugin.id));
    this._notify(r(e, s), t, "stop"), this._notify(r(s, e), t, "start");
  }
}
function zf(n) {
  const t = {}, e = [], s = Object.keys(me.plugins.items);
  for (let o = 0; o < s.length; o++)
    e.push(me.getPlugin(s[o]));
  const r = n.plugins || [];
  for (let o = 0; o < r.length; o++) {
    const a = r[o];
    e.indexOf(a) === -1 && (e.push(a), t[a.id] = !0);
  }
  return {
    plugins: e,
    localIds: t
  };
}
function Bf(n, t) {
  return !t && n === !1 ? null : n === !0 ? {} : n;
}
function Rf(n, { plugins: t, localIds: e }, s, r) {
  const o = [], a = n.getContext();
  for (const h of t) {
    const c = h.id, d = Bf(s[c], r);
    d !== null && o.push({
      plugin: h,
      options: Ff(n.config, {
        plugin: h,
        local: e[c]
      }, d, a)
    });
  }
  return o;
}
function Ff(n, { plugin: t, local: e }, s, r) {
  const o = n.pluginScopeKeys(t), a = n.getOptionScopes(s, o);
  return e && t.defaults && a.push(t.defaults), n.createResolver(a, r, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Ao(n, t) {
  const e = Lt.datasets[n] || {};
  return ((t.datasets || {})[n] || {}).indexAxis || t.indexAxis || e.indexAxis || "x";
}
function Nf(n, t) {
  let e = n;
  return n === "_index_" ? e = t : n === "_value_" && (e = t === "x" ? "y" : "x"), e;
}
function Zf(n, t) {
  return n === t ? "_index_" : "_value_";
}
function Ha(n) {
  if (n === "x" || n === "y" || n === "r")
    return n;
}
function Hf(n) {
  if (n === "top" || n === "bottom")
    return "x";
  if (n === "left" || n === "right")
    return "y";
}
function Oo(n, ...t) {
  if (Ha(n))
    return n;
  for (const e of t) {
    const s = e.axis || Hf(e.position) || n.length > 1 && Ha(n[0].toLowerCase());
    if (s)
      return s;
  }
  throw new Error(`Cannot determine type of '${n}' axis. Please provide 'axis' or 'position' option.`);
}
function Wa(n, t, e) {
  if (e[t + "AxisID"] === n)
    return {
      axis: t
    };
}
function Wf(n, t) {
  if (t.data && t.data.datasets) {
    const e = t.data.datasets.filter((s) => s.xAxisID === n || s.yAxisID === n);
    if (e.length)
      return Wa(n, "x", e[0]) || Wa(n, "y", e[0]);
  }
  return {};
}
function Vf(n, t) {
  const e = ci[n.type] || {
    scales: {}
  }, s = t.scales || {}, r = Ao(n.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(s).forEach((a) => {
    const h = s[a];
    if (!nt(h))
      return console.error(`Invalid scale configuration for scale: ${a}`);
    if (h._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${a}`);
    const c = Oo(a, h, Wf(a, n), Lt.scales[h.type]), d = Zf(c, r), p = e.scales || {};
    o[a] = cn(/* @__PURE__ */ Object.create(null), [
      {
        axis: c
      },
      h,
      p[c],
      p[d]
    ]);
  }), n.data.datasets.forEach((a) => {
    const h = a.type || n.type, c = a.indexAxis || Ao(h, t), p = (ci[h] || {}).scales || {};
    Object.keys(p).forEach((g) => {
      const _ = Nf(g, c), v = a[_ + "AxisID"] || _;
      o[v] = o[v] || /* @__PURE__ */ Object.create(null), cn(o[v], [
        {
          axis: _
        },
        s[v],
        p[g]
      ]);
    });
  }), Object.keys(o).forEach((a) => {
    const h = o[a];
    cn(h, [
      Lt.scales[h.type],
      Lt.scale
    ]);
  }), o;
}
function lh(n) {
  const t = n.options || (n.options = {});
  t.plugins = X(t.plugins, {}), t.scales = Vf(n, t);
}
function hh(n) {
  return n = n || {}, n.datasets = n.datasets || [], n.labels = n.labels || [], n;
}
function jf(n) {
  return n = n || {}, n.data = hh(n.data), lh(n), n;
}
const Va = /* @__PURE__ */ new Map(), ch = /* @__PURE__ */ new Set();
function ls(n, t) {
  let e = Va.get(n);
  return e || (e = t(), Va.set(n, e), ch.add(e)), e;
}
const nn = (n, t, e) => {
  const s = Ze(t, e);
  s !== void 0 && n.add(s);
};
class Uf {
  constructor(t) {
    this._config = jf(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(t) {
    this._config.type = t;
  }
  get data() {
    return this._config.data;
  }
  set data(t) {
    this._config.data = hh(t);
  }
  get options() {
    return this._config.options;
  }
  set options(t) {
    this._config.options = t;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const t = this._config;
    this.clearCache(), lh(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return ls(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, e) {
    return ls(`${t}.transition.${e}`, () => [
      [
        `datasets.${t}.transitions.${e}`,
        `transitions.${e}`
      ],
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(t, e) {
    return ls(`${t}-${e}`, () => [
      [
        `datasets.${t}.elements.${e}`,
        `datasets.${t}`,
        `elements.${e}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(t) {
    const e = t.id, s = this.type;
    return ls(`${s}-plugin-${e}`, () => [
      [
        `plugins.${e}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, e) {
    const s = this._scopeCache;
    let r = s.get(t);
    return (!r || e) && (r = /* @__PURE__ */ new Map(), s.set(t, r)), r;
  }
  getOptionScopes(t, e, s) {
    const { options: r, type: o } = this, a = this._cachedScopes(t, s), h = a.get(e);
    if (h)
      return h;
    const c = /* @__PURE__ */ new Set();
    e.forEach((p) => {
      t && (c.add(t), p.forEach((g) => nn(c, t, g))), p.forEach((g) => nn(c, r, g)), p.forEach((g) => nn(c, ci[o] || {}, g)), p.forEach((g) => nn(c, Lt, g)), p.forEach((g) => nn(c, So, g));
    });
    const d = Array.from(c);
    return d.length === 0 && d.push(/* @__PURE__ */ Object.create(null)), ch.has(e) && a.set(e, d), d;
  }
  chartOptionScopes() {
    const { options: t, type: e } = this;
    return [
      t,
      ci[e] || {},
      Lt.datasets[e] || {},
      {
        type: e
      },
      Lt,
      So
    ];
  }
  resolveNamedOptions(t, e, s, r = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: a, subPrefixes: h } = ja(this._resolverCache, t, r);
    let c = a;
    if (Yf(a, e)) {
      o.$shared = !1, s = He(s) ? s() : s;
      const d = this.createResolver(t, s, h);
      c = Ei(a, s, d);
    }
    for (const d of e)
      o[d] = c[d];
    return o;
  }
  createResolver(t, e, s = [
    ""
  ], r) {
    const { resolver: o } = ja(this._resolverCache, t, s);
    return nt(e) ? Ei(o, e, void 0, r) : o;
  }
}
function ja(n, t, e) {
  let s = n.get(t);
  s || (s = /* @__PURE__ */ new Map(), n.set(t, s));
  const r = e.join();
  let o = s.get(r);
  return o || (o = {
    resolver: Ko(t, e),
    subPrefixes: e.filter((h) => !h.toLowerCase().includes("hover"))
  }, s.set(r, o)), o;
}
const Gf = (n) => nt(n) && Object.getOwnPropertyNames(n).some((t) => He(n[t]));
function Yf(n, t) {
  const { isScriptable: e, isIndexable: s } = Vl(n);
  for (const r of t) {
    const o = e(r), a = s(r), h = (a || o) && n[r];
    if (o && (He(h) || Gf(h)) || a && vt(h))
      return !0;
  }
  return !1;
}
var qf = "4.4.7";
const Xf = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Ua(n, t) {
  return n === "top" || n === "bottom" || Xf.indexOf(n) === -1 && t === "x";
}
function Ga(n, t) {
  return function(e, s) {
    return e[n] === s[n] ? e[t] - s[t] : e[n] - s[n];
  };
}
function Ya(n) {
  const t = n.chart, e = t.options.animation;
  t.notifyPlugins("afterRender"), mt(e && e.onComplete, [
    n
  ], t);
}
function Kf(n) {
  const t = n.chart, e = t.options.animation;
  mt(e && e.onProgress, [
    n
  ], t);
}
function uh(n) {
  return Qo() && typeof n == "string" ? n = document.getElementById(n) : n && n.length && (n = n[0]), n && n.canvas && (n = n.canvas), n;
}
const xs = {}, qa = (n) => {
  const t = uh(n);
  return Object.values(xs).filter((e) => e.canvas === t).pop();
};
function Jf(n, t, e) {
  const s = Object.keys(n);
  for (const r of s) {
    const o = +r;
    if (o >= t) {
      const a = n[r];
      delete n[r], (e > 0 || o > t) && (n[o + e] = a);
    }
  }
}
function $f(n, t, e, s) {
  return !e || n.type === "mouseout" ? null : s ? t : n;
}
function hs(n, t, e) {
  return n.options.clip ? n[e] : t[e];
}
function Qf(n, t) {
  const { xScale: e, yScale: s } = n;
  return e && s ? {
    left: hs(e, t, "left"),
    right: hs(e, t, "right"),
    top: hs(s, t, "top"),
    bottom: hs(s, t, "bottom")
  } : t;
}
class Se {
  static register(...t) {
    me.add(...t), Xa();
  }
  static unregister(...t) {
    me.remove(...t), Xa();
  }
  constructor(t, e) {
    const s = this.config = new Uf(e), r = uh(t), o = qa(r);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const a = s.createResolver(s.chartOptionScopes(), this.getContext());
    this.platform = new (s.platform || mf(r))(), this.platform.updateConfig(s);
    const h = this.platform.acquireContext(r, a.aspectRatio), c = h && h.canvas, d = c && c.height, p = c && c.width;
    if (this.id = tu(), this.ctx = h, this.canvas = c, this.width = p, this.height = d, this._options = a, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Df(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = mu((g) => this.update(g), a.resizeDelay || 0), this._dataChanges = [], xs[this.id] = this, !h || !c) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Me.listen(this, "complete", Ya), Me.listen(this, "progress", Kf), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: e }, width: s, height: r, _aspectRatio: o } = this;
    return rt(t) ? e && o ? o : r ? s / r : null : t;
  }
  get data() {
    return this.config.data;
  }
  set data(t) {
    this.config.data = t;
  }
  get options() {
    return this._options;
  }
  set options(t) {
    this.config.options = t;
  }
  get registry() {
    return me;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : _a(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return pa(this.canvas, this.ctx), this;
  }
  stop() {
    return Me.stop(this), this;
  }
  resize(t, e) {
    Me.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: e
    } : this._resize(t, e);
  }
  _resize(t, e) {
    const s = this.options, r = this.canvas, o = s.maintainAspectRatio && this.aspectRatio, a = this.platform.getMaximumSize(r, t, e, o), h = s.devicePixelRatio || this.platform.getDevicePixelRatio(), c = this.width ? "resize" : "attach";
    this.width = a.width, this.height = a.height, this._aspectRatio = this.aspectRatio, _a(this, h, !0) && (this.notifyPlugins("resize", {
      size: a
    }), mt(s.onResize, [
      this,
      a
    ], this), this.attached && this._doResize(c) && this.render());
  }
  ensureScalesHaveIDs() {
    const e = this.options.scales || {};
    ft(e, (s, r) => {
      s.id = r;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, e = t.scales, s = this.scales, r = Object.keys(s).reduce((a, h) => (a[h] = !1, a), {});
    let o = [];
    e && (o = o.concat(Object.keys(e).map((a) => {
      const h = e[a], c = Oo(a, h), d = c === "r", p = c === "x";
      return {
        options: h,
        dposition: d ? "chartArea" : p ? "bottom" : "left",
        dtype: d ? "radialLinear" : p ? "category" : "linear"
      };
    }))), ft(o, (a) => {
      const h = a.options, c = h.id, d = Oo(c, h), p = X(h.type, a.dtype);
      (h.position === void 0 || Ua(h.position, d) !== Ua(a.dposition)) && (h.position = a.dposition), r[c] = !0;
      let g = null;
      if (c in s && s[c].type === p)
        g = s[c];
      else {
        const _ = me.getScale(p);
        g = new _({
          id: c,
          type: p,
          ctx: this.ctx,
          chart: this
        }), s[g.id] = g;
      }
      g.init(h, t);
    }), ft(r, (a, h) => {
      a || delete s[h];
    }), ft(s, (a) => {
      Ht.configure(this, a, a.options), Ht.addBox(this, a);
    });
  }
  _updateMetasets() {
    const t = this._metasets, e = this.data.datasets.length, s = t.length;
    if (t.sort((r, o) => r.index - o.index), s > e) {
      for (let r = e; r < s; ++r)
        this._destroyDatasetMeta(r);
      t.splice(e, s - e);
    }
    this._sortedMetasets = t.slice(0).sort(Ga("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: e } } = this;
    t.length > e.length && delete this._stacks, t.forEach((s, r) => {
      e.filter((o) => o === s._dataset).length === 0 && this._destroyDatasetMeta(r);
    });
  }
  buildOrUpdateControllers() {
    const t = [], e = this.data.datasets;
    let s, r;
    for (this._removeUnreferencedMetasets(), s = 0, r = e.length; s < r; s++) {
      const o = e[s];
      let a = this.getDatasetMeta(s);
      const h = o.type || this.config.type;
      if (a.type && a.type !== h && (this._destroyDatasetMeta(s), a = this.getDatasetMeta(s)), a.type = h, a.indexAxis = o.indexAxis || Ao(h, this.options), a.order = o.order || 0, a.index = s, a.label = "" + o.label, a.visible = this.isDatasetVisible(s), a.controller)
        a.controller.updateIndex(s), a.controller.linkScales();
      else {
        const c = me.getController(h), { datasetElementType: d, dataElementType: p } = Lt.datasets[h];
        Object.assign(c, {
          dataElementType: me.getElement(p),
          datasetElementType: d && me.getElement(d)
        }), a.controller = new c(this, s), t.push(a.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    ft(this.data.datasets, (t, e) => {
      this.getDatasetMeta(e).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const e = this.config;
    e.update();
    const s = this._options = e.createResolver(e.chartOptionScopes(), this.getContext()), r = this._animationsDisabled = !s.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const o = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let a = 0;
    for (let d = 0, p = this.data.datasets.length; d < p; d++) {
      const { controller: g } = this.getDatasetMeta(d), _ = !r && o.indexOf(g) === -1;
      g.buildOrUpdateElements(_), a = Math.max(+g.getMaxOverflow(), a);
    }
    a = this._minPadding = s.layout.autoPadding ? a : 0, this._updateLayout(a), r || ft(o, (d) => {
      d.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(Ga("z", "_idx"));
    const { _active: h, _lastEvent: c } = this;
    c ? this._eventHandler(c, !0) : h.length && this._updateHoverStyles(h, h, !0), this.render();
  }
  _updateScales() {
    ft(this.scales, (t) => {
      Ht.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, e = new Set(Object.keys(this._listeners)), s = new Set(t.events);
    (!oa(e, s) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, e = this._getUniformDataChanges() || [];
    for (const { method: s, start: r, count: o } of e) {
      const a = s === "_removeElements" ? -o : o;
      Jf(t, r, a);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const e = this.data.datasets.length, s = (o) => new Set(t.filter((a) => a[0] === o).map((a, h) => h + "," + a.splice(1).join(","))), r = s(0);
    for (let o = 1; o < e; o++)
      if (!oa(r, s(o)))
        return;
    return Array.from(r).map((o) => o.split(",")).map((o) => ({
      method: o[1],
      start: +o[2],
      count: +o[3]
    }));
  }
  _updateLayout(t) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: !0
    }) === !1)
      return;
    Ht.update(this, this.width, this.height, t);
    const e = this.chartArea, s = e.width <= 0 || e.height <= 0;
    this._layers = [], ft(this.boxes, (r) => {
      s && r.position === "chartArea" || (r.configure && r.configure(), this._layers.push(...r._layers()));
    }, this), this._layers.forEach((r, o) => {
      r._idx = o;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: t,
      cancelable: !0
    }) !== !1) {
      for (let e = 0, s = this.data.datasets.length; e < s; ++e)
        this.getDatasetMeta(e).controller.configure();
      for (let e = 0, s = this.data.datasets.length; e < s; ++e)
        this._updateDataset(e, He(t) ? t({
          datasetIndex: e
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, e) {
    const s = this.getDatasetMeta(t), r = {
      meta: s,
      index: t,
      mode: e,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", r) !== !1 && (s.controller._update(e), r.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", r));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (Me.has(this) ? this.attached && !Me.running(this) && Me.start(this) : (this.draw(), Ya({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: s, height: r } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(s, r);
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
      cancelable: !0
    }) === !1)
      return;
    const e = this._layers;
    for (t = 0; t < e.length && e[t].z <= 0; ++t)
      e[t].draw(this.chartArea);
    for (this._drawDatasets(); t < e.length; ++t)
      e[t].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(t) {
    const e = this._sortedMetasets, s = [];
    let r, o;
    for (r = 0, o = e.length; r < o; ++r) {
      const a = e[r];
      (!t || a.visible) && s.push(a);
    }
    return s;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(!0);
  }
  _drawDatasets() {
    if (this.notifyPlugins("beforeDatasetsDraw", {
      cancelable: !0
    }) === !1)
      return;
    const t = this.getSortedVisibleDatasetMetas();
    for (let e = t.length - 1; e >= 0; --e)
      this._drawDataset(t[e]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(t) {
    const e = this.ctx, s = t._clip, r = !s.disabled, o = Qf(t, this.chartArea), a = {
      meta: t,
      index: t.index,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetDraw", a) !== !1 && (r && Is(e, {
      left: s.left === !1 ? 0 : o.left - s.left,
      right: s.right === !1 ? this.width : o.right + s.right,
      top: s.top === !1 ? 0 : o.top - s.top,
      bottom: s.bottom === !1 ? this.height : o.bottom + s.bottom
    }), t.controller.draw(), r && Ds(e), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a));
  }
  isPointInArea(t) {
    return Ae(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, e, s, r) {
    const o = qd.modes[e];
    return typeof o == "function" ? o(this, t, s, r) : [];
  }
  getDatasetMeta(t) {
    const e = this.data.datasets[t], s = this._metasets;
    let r = s.filter((o) => o && o._dataset === e).pop();
    return r || (r = {
      type: null,
      data: [],
      dataset: null,
      controller: null,
      hidden: null,
      xAxisID: null,
      yAxisID: null,
      order: e && e.order || 0,
      index: t,
      _dataset: e,
      _parsed: [],
      _sorted: !1
    }, s.push(r)), r;
  }
  getContext() {
    return this.$context || (this.$context = We(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(t) {
    const e = this.data.datasets[t];
    if (!e)
      return !1;
    const s = this.getDatasetMeta(t);
    return typeof s.hidden == "boolean" ? !s.hidden : !e.hidden;
  }
  setDatasetVisibility(t, e) {
    const s = this.getDatasetMeta(t);
    s.hidden = !e;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, e, s) {
    const r = s ? "show" : "hide", o = this.getDatasetMeta(t), a = o.controller._resolveAnimations(void 0, r);
    _n(e) ? (o.data[e].hidden = !s, this.update()) : (this.setDatasetVisibility(t, s), a.update(o, {
      visible: s
    }), this.update((h) => h.datasetIndex === t ? r : void 0));
  }
  hide(t, e) {
    this._updateVisibility(t, e, !1);
  }
  show(t, e) {
    this._updateVisibility(t, e, !0);
  }
  _destroyDatasetMeta(t) {
    const e = this._metasets[t];
    e && e.controller && e.controller._destroy(), delete this._metasets[t];
  }
  _stop() {
    let t, e;
    for (this.stop(), Me.remove(this), t = 0, e = this.data.datasets.length; t < e; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: e } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), pa(t, e), this.platform.releaseContext(e), this.canvas = null, this.ctx = null), delete xs[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, e = this.platform, s = (o, a) => {
      e.addEventListener(this, o, a), t[o] = a;
    }, r = (o, a, h) => {
      o.offsetX = a, o.offsetY = h, this._eventHandler(o);
    };
    ft(this.options.events, (o) => s(o, r));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, e = this.platform, s = (c, d) => {
      e.addEventListener(this, c, d), t[c] = d;
    }, r = (c, d) => {
      t[c] && (e.removeEventListener(this, c, d), delete t[c]);
    }, o = (c, d) => {
      this.canvas && this.resize(c, d);
    };
    let a;
    const h = () => {
      r("attach", h), this.attached = !0, this.resize(), s("resize", o), s("detach", a);
    };
    a = () => {
      this.attached = !1, r("resize", o), this._stop(), this._resize(0, 0), s("attach", h);
    }, e.isAttached(this.canvas) ? h() : a();
  }
  unbindEvents() {
    ft(this._listeners, (t, e) => {
      this.platform.removeEventListener(this, e, t);
    }), this._listeners = {}, ft(this._responsiveListeners, (t, e) => {
      this.platform.removeEventListener(this, e, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, e, s) {
    const r = s ? "set" : "remove";
    let o, a, h, c;
    for (e === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + r + "DatasetHoverStyle"]()), h = 0, c = t.length; h < c; ++h) {
      a = t[h];
      const d = a && this.getDatasetMeta(a.datasetIndex).controller;
      d && d[r + "HoverStyle"](a.element, a.datasetIndex, a.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const e = this._active || [], s = t.map(({ datasetIndex: o, index: a }) => {
      const h = this.getDatasetMeta(o);
      if (!h)
        throw new Error("No dataset found at index " + o);
      return {
        datasetIndex: o,
        element: h.data[a],
        index: a
      };
    });
    !Ms(s, e) && (this._active = s, this._lastEvent = null, this._updateHoverStyles(s, e));
  }
  notifyPlugins(t, e, s) {
    return this._plugins.notify(this, t, e, s);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((e) => e.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, e, s) {
    const r = this.options.hover, o = (c, d) => c.filter((p) => !d.some((g) => p.datasetIndex === g.datasetIndex && p.index === g.index)), a = o(e, t), h = s ? t : o(t, e);
    a.length && this.updateHoverStyle(a, r.mode, !1), h.length && r.mode && this.updateHoverStyle(h, r.mode, !0);
  }
  _eventHandler(t, e) {
    const s = {
      event: t,
      replay: e,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, r = (a) => (a.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", s, r) === !1)
      return;
    const o = this._handleEvent(t, e, s.inChartArea);
    return s.cancelable = !1, this.notifyPlugins("afterEvent", s, r), (o || s.changed) && this.render(), this;
  }
  _handleEvent(t, e, s) {
    const { _active: r = [], options: o } = this, a = e, h = this._getActiveElements(t, r, s, a), c = ru(t), d = $f(t, this._lastEvent, s, c);
    s && (this._lastEvent = null, mt(o.onHover, [
      t,
      h,
      this
    ], this), c && mt(o.onClick, [
      t,
      h,
      this
    ], this));
    const p = !Ms(h, r);
    return (p || e) && (this._active = h, this._updateHoverStyles(h, r, e)), this._lastEvent = d, p;
  }
  _getActiveElements(t, e, s, r) {
    if (t.type === "mouseout")
      return [];
    if (!s)
      return e;
    const o = this.options.hover;
    return this.getElementsAtEventForMode(t, o.mode, o, r);
  }
}
z(Se, "defaults", Lt), z(Se, "instances", xs), z(Se, "overrides", ci), z(Se, "registry", me), z(Se, "version", qf), z(Se, "getChart", qa);
function Xa() {
  return ft(Se.instances, (n) => n._plugins.invalidate());
}
function tp(n, t, e) {
  const { startAngle: s, pixelMargin: r, x: o, y: a, outerRadius: h, innerRadius: c } = t;
  let d = r / h;
  n.beginPath(), n.arc(o, a, h, s - d, e + d), c > r ? (d = r / c, n.arc(o, a, c, e + d, s - d, !0)) : n.arc(o, a, r, e + At, s - At), n.closePath(), n.clip();
}
function ep(n) {
  return Xo(n, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function ip(n, t, e, s) {
  const r = ep(n.options.borderRadius), o = (e - t) / 2, a = Math.min(o, s * t / 2), h = (c) => {
    const d = (e - Math.min(o, c)) * s / 2;
    return Rt(c, 0, Math.min(o, d));
  };
  return {
    outerStart: h(r.outerStart),
    outerEnd: h(r.outerEnd),
    innerStart: Rt(r.innerStart, 0, a),
    innerEnd: Rt(r.innerEnd, 0, a)
  };
}
function Ci(n, t, e, s) {
  return {
    x: e + n * Math.cos(t),
    y: s + n * Math.sin(t)
  };
}
function As(n, t, e, s, r, o) {
  const { x: a, y: h, startAngle: c, pixelMargin: d, innerRadius: p } = t, g = Math.max(t.outerRadius + s + e - d, 0), _ = p > 0 ? p + s + e + d : 0;
  let v = 0;
  const b = r - c;
  if (s) {
    const ht = p > 0 ? p - s : 0, J = g > 0 ? g - s : 0, dt = (ht + J) / 2, H = dt !== 0 ? b * dt / (dt + s) : b;
    v = (b - H) / 2;
  }
  const x = Math.max(1e-3, b * g - e / bt) / g, M = (b - x) / 2, P = c + M + v, S = r - M - v, { outerStart: A, outerEnd: O, innerStart: T, innerEnd: I } = ip(t, _, g, S - P), D = g - A, B = g - O, N = P + A / D, Y = S - O / B, Z = _ + T, V = _ + I, Ct = P + T / Z, et = S - I / V;
  if (n.beginPath(), o) {
    const ht = (N + Y) / 2;
    if (n.arc(a, h, g, N, ht), n.arc(a, h, g, ht, Y), O > 0) {
      const pt = Ci(B, Y, a, h);
      n.arc(pt.x, pt.y, O, Y, S + At);
    }
    const J = Ci(V, S, a, h);
    if (n.lineTo(J.x, J.y), I > 0) {
      const pt = Ci(V, et, a, h);
      n.arc(pt.x, pt.y, I, S + At, et + Math.PI);
    }
    const dt = (S - I / _ + (P + T / _)) / 2;
    if (n.arc(a, h, _, S - I / _, dt, !0), n.arc(a, h, _, dt, P + T / _, !0), T > 0) {
      const pt = Ci(Z, Ct, a, h);
      n.arc(pt.x, pt.y, T, Ct + Math.PI, P - At);
    }
    const H = Ci(D, P, a, h);
    if (n.lineTo(H.x, H.y), A > 0) {
      const pt = Ci(D, N, a, h);
      n.arc(pt.x, pt.y, A, P - At, N);
    }
  } else {
    n.moveTo(a, h);
    const ht = Math.cos(N) * g + a, J = Math.sin(N) * g + h;
    n.lineTo(ht, J);
    const dt = Math.cos(Y) * g + a, H = Math.sin(Y) * g + h;
    n.lineTo(dt, H);
  }
  n.closePath();
}
function np(n, t, e, s, r) {
  const { fullCircles: o, startAngle: a, circumference: h } = t;
  let c = t.endAngle;
  if (o) {
    As(n, t, e, s, c, r);
    for (let d = 0; d < o; ++d)
      n.fill();
    isNaN(h) || (c = a + (h % yt || yt));
  }
  return As(n, t, e, s, c, r), n.fill(), c;
}
function sp(n, t, e, s, r) {
  const { fullCircles: o, startAngle: a, circumference: h, options: c } = t, { borderWidth: d, borderJoinStyle: p, borderDash: g, borderDashOffset: _ } = c, v = c.borderAlign === "inner";
  if (!d)
    return;
  n.setLineDash(g || []), n.lineDashOffset = _, v ? (n.lineWidth = d * 2, n.lineJoin = p || "round") : (n.lineWidth = d, n.lineJoin = p || "bevel");
  let b = t.endAngle;
  if (o) {
    As(n, t, e, s, b, r);
    for (let x = 0; x < o; ++x)
      n.stroke();
    isNaN(h) || (b = a + (h % yt || yt));
  }
  v && tp(n, t, b), o || (As(n, t, e, s, b, r), n.stroke());
}
class an extends Oe {
  constructor(e) {
    super();
    z(this, "circumference");
    z(this, "endAngle");
    z(this, "fullCircles");
    z(this, "innerRadius");
    z(this, "outerRadius");
    z(this, "pixelMargin");
    z(this, "startAngle");
    this.options = void 0, this.circumference = void 0, this.startAngle = void 0, this.endAngle = void 0, this.innerRadius = void 0, this.outerRadius = void 0, this.pixelMargin = 0, this.fullCircles = 0, e && Object.assign(this, e);
  }
  inRange(e, s, r) {
    const o = this.getProps([
      "x",
      "y"
    ], r), { angle: a, distance: h } = Il(o, {
      x: e,
      y: s
    }), { startAngle: c, endAngle: d, innerRadius: p, outerRadius: g, circumference: _ } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], r), v = (this.options.spacing + this.options.borderWidth) / 2, b = X(_, d - c), x = vn(a, c, d) && c !== d, M = b >= yt || x, P = Ce(h, p + v, g + v);
    return M && P;
  }
  getCenterPoint(e) {
    const { x: s, y: r, startAngle: o, endAngle: a, innerRadius: h, outerRadius: c } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], e), { offset: d, spacing: p } = this.options, g = (o + a) / 2, _ = (h + c + p + d) / 2;
    return {
      x: s + Math.cos(g) * _,
      y: r + Math.sin(g) * _
    };
  }
  tooltipPosition(e) {
    return this.getCenterPoint(e);
  }
  draw(e) {
    const { options: s, circumference: r } = this, o = (s.offset || 0) / 4, a = (s.spacing || 0) / 2, h = s.circular;
    if (this.pixelMargin = s.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = r > yt ? Math.floor(r / yt) : 0, r === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    e.save();
    const c = (this.startAngle + this.endAngle) / 2;
    e.translate(Math.cos(c) * o, Math.sin(c) * o);
    const d = 1 - Math.sin(Math.min(bt, r || 0)), p = o * d;
    e.fillStyle = s.backgroundColor, e.strokeStyle = s.borderColor, np(e, this, p, a, h), sp(e, this, p, a, h), e.restore();
  }
}
z(an, "id", "arc"), z(an, "defaults", {
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
}), z(an, "defaultRoutes", {
  backgroundColor: "backgroundColor"
}), z(an, "descriptors", {
  _scriptable: !0,
  _indexable: (e) => e !== "borderDash"
});
function dh(n, t, e = t) {
  n.lineCap = X(e.borderCapStyle, t.borderCapStyle), n.setLineDash(X(e.borderDash, t.borderDash)), n.lineDashOffset = X(e.borderDashOffset, t.borderDashOffset), n.lineJoin = X(e.borderJoinStyle, t.borderJoinStyle), n.lineWidth = X(e.borderWidth, t.borderWidth), n.strokeStyle = X(e.borderColor, t.borderColor);
}
function op(n, t, e) {
  n.lineTo(e.x, e.y);
}
function rp(n) {
  return n.stepped ? Cu : n.tension || n.cubicInterpolationMode === "monotone" ? Tu : op;
}
function fh(n, t, e = {}) {
  const s = n.length, { start: r = 0, end: o = s - 1 } = e, { start: a, end: h } = t, c = Math.max(r, a), d = Math.min(o, h), p = r < a && o < a || r > h && o > h;
  return {
    count: s,
    start: c,
    loop: t.loop,
    ilen: d < c && !p ? s + d - c : d - c
  };
}
function ap(n, t, e, s) {
  const { points: r, options: o } = t, { count: a, start: h, loop: c, ilen: d } = fh(r, e, s), p = rp(o);
  let { move: g = !0, reverse: _ } = s || {}, v, b, x;
  for (v = 0; v <= d; ++v)
    b = r[(h + (_ ? d - v : v)) % a], !b.skip && (g ? (n.moveTo(b.x, b.y), g = !1) : p(n, x, b, _, o.stepped), x = b);
  return c && (b = r[(h + (_ ? d : 0)) % a], p(n, x, b, _, o.stepped)), !!c;
}
function lp(n, t, e, s) {
  const r = t.points, { count: o, start: a, ilen: h } = fh(r, e, s), { move: c = !0, reverse: d } = s || {};
  let p = 0, g = 0, _, v, b, x, M, P;
  const S = (O) => (a + (d ? h - O : O)) % o, A = () => {
    x !== M && (n.lineTo(p, M), n.lineTo(p, x), n.lineTo(p, P));
  };
  for (c && (v = r[S(0)], n.moveTo(v.x, v.y)), _ = 0; _ <= h; ++_) {
    if (v = r[S(_)], v.skip)
      continue;
    const O = v.x, T = v.y, I = O | 0;
    I === b ? (T < x ? x = T : T > M && (M = T), p = (g * p + O) / ++g) : (A(), n.lineTo(O, T), b = I, g = 0, x = M = T), P = T;
  }
  A();
}
function Eo(n) {
  const t = n.options, e = t.borderDash && t.borderDash.length;
  return !n._decimated && !n._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !e ? lp : ap;
}
function hp(n) {
  return n.stepped ? ad : n.tension || n.cubicInterpolationMode === "monotone" ? ld : ri;
}
function cp(n, t, e, s) {
  let r = t._path;
  r || (r = t._path = new Path2D(), t.path(r, e, s) && r.closePath()), dh(n, t.options), n.stroke(r);
}
function up(n, t, e, s) {
  const { segments: r, options: o } = t, a = Eo(t);
  for (const h of r)
    dh(n, o, h.style), n.beginPath(), a(n, t, h, {
      start: e,
      end: e + s - 1
    }) && n.closePath(), n.stroke();
}
const dp = typeof Path2D == "function";
function fp(n, t, e, s) {
  dp && !t.options.segment ? cp(n, t, e, s) : up(n, t, e, s);
}
class Re extends Oe {
  constructor(t) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, t && Object.assign(this, t);
  }
  updateControlPoints(t, e) {
    const s = this.options;
    if ((s.tension || s.cubicInterpolationMode === "monotone") && !s.stepped && !this._pointsUpdated) {
      const r = s.spanGaps ? this._loop : this._fullLoop;
      Qu(this._points, s, t, r, e), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = pd(this, this.options.segment));
  }
  first() {
    const t = this.segments, e = this.points;
    return t.length && e[t[0].start];
  }
  last() {
    const t = this.segments, e = this.points, s = t.length;
    return s && e[t[s - 1].end];
  }
  interpolate(t, e) {
    const s = this.options, r = t[e], o = this.points, a = Ql(this, {
      property: e,
      start: r,
      end: r
    });
    if (!a.length)
      return;
    const h = [], c = hp(s);
    let d, p;
    for (d = 0, p = a.length; d < p; ++d) {
      const { start: g, end: _ } = a[d], v = o[g], b = o[_];
      if (v === b) {
        h.push(v);
        continue;
      }
      const x = Math.abs((r - v[e]) / (b[e] - v[e])), M = c(v, b, x, s.stepped);
      M[e] = t[e], h.push(M);
    }
    return h.length === 1 ? h[0] : h;
  }
  pathSegment(t, e, s) {
    return Eo(this)(t, this, e, s);
  }
  path(t, e, s) {
    const r = this.segments, o = Eo(this);
    let a = this._loop;
    e = e || 0, s = s || this.points.length - e;
    for (const h of r)
      a &= o(t, this, h, {
        start: e,
        end: e + s - 1
      });
    return !!a;
  }
  draw(t, e, s, r) {
    const o = this.options || {};
    (this.points || []).length && o.borderWidth && (t.save(), fp(t, this, s, r), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
z(Re, "id", "line"), z(Re, "defaults", {
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
}), z(Re, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
}), z(Re, "descriptors", {
  _scriptable: !0,
  _indexable: (t) => t !== "borderDash" && t !== "fill"
});
function Ka(n, t, e, s) {
  const r = n.options, { [e]: o } = n.getProps([
    e
  ], s);
  return Math.abs(t - o) < r.radius + r.hitRadius;
}
class ws extends Oe {
  constructor(e) {
    super();
    z(this, "parsed");
    z(this, "skip");
    z(this, "stop");
    this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, e && Object.assign(this, e);
  }
  inRange(e, s, r) {
    const o = this.options, { x: a, y: h } = this.getProps([
      "x",
      "y"
    ], r);
    return Math.pow(e - a, 2) + Math.pow(s - h, 2) < Math.pow(o.hitRadius + o.radius, 2);
  }
  inXRange(e, s) {
    return Ka(this, e, "x", s);
  }
  inYRange(e, s) {
    return Ka(this, e, "y", s);
  }
  getCenterPoint(e) {
    const { x: s, y: r } = this.getProps([
      "x",
      "y"
    ], e);
    return {
      x: s,
      y: r
    };
  }
  size(e) {
    e = e || this.options || {};
    let s = e.radius || 0;
    s = Math.max(s, s && e.hoverRadius || 0);
    const r = s && e.borderWidth || 0;
    return (s + r) * 2;
  }
  draw(e, s) {
    const r = this.options;
    this.skip || r.radius < 0.1 || !Ae(this, s, this.size(r) / 2) || (e.strokeStyle = r.borderColor, e.lineWidth = r.borderWidth, e.fillStyle = r.backgroundColor, Co(e, r, this.x, this.y));
  }
  getRange() {
    const e = this.options || {};
    return e.radius + e.hitRadius;
  }
}
z(ws, "id", "point"), /**
* @type {any}
*/
z(ws, "defaults", {
  borderWidth: 1,
  hitRadius: 1,
  hoverBorderWidth: 1,
  hoverRadius: 4,
  pointStyle: "circle",
  radius: 3,
  rotation: 0
}), /**
* @type {any}
*/
z(ws, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
function ph(n, t) {
  const { x: e, y: s, base: r, width: o, height: a } = n.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let h, c, d, p, g;
  return n.horizontal ? (g = a / 2, h = Math.min(e, r), c = Math.max(e, r), d = s - g, p = s + g) : (g = o / 2, h = e - g, c = e + g, d = Math.min(s, r), p = Math.max(s, r)), {
    left: h,
    top: d,
    right: c,
    bottom: p
  };
}
function Fe(n, t, e, s) {
  return n ? 0 : Rt(t, e, s);
}
function pp(n, t, e) {
  const s = n.options.borderWidth, r = n.borderSkipped, o = Wl(s);
  return {
    t: Fe(r.top, o.top, 0, e),
    r: Fe(r.right, o.right, 0, t),
    b: Fe(r.bottom, o.bottom, 0, e),
    l: Fe(r.left, o.left, 0, t)
  };
}
function gp(n, t, e) {
  const { enableBorderRadius: s } = n.getProps([
    "enableBorderRadius"
  ]), r = n.options.borderRadius, o = li(r), a = Math.min(t, e), h = n.borderSkipped, c = s || nt(r);
  return {
    topLeft: Fe(!c || h.top || h.left, o.topLeft, 0, a),
    topRight: Fe(!c || h.top || h.right, o.topRight, 0, a),
    bottomLeft: Fe(!c || h.bottom || h.left, o.bottomLeft, 0, a),
    bottomRight: Fe(!c || h.bottom || h.right, o.bottomRight, 0, a)
  };
}
function mp(n) {
  const t = ph(n), e = t.right - t.left, s = t.bottom - t.top, r = pp(n, e / 2, s / 2), o = gp(n, e / 2, s / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: e,
      h: s,
      radius: o
    },
    inner: {
      x: t.left + r.l,
      y: t.top + r.t,
      w: e - r.l - r.r,
      h: s - r.t - r.b,
      radius: {
        topLeft: Math.max(0, o.topLeft - Math.max(r.t, r.l)),
        topRight: Math.max(0, o.topRight - Math.max(r.t, r.r)),
        bottomLeft: Math.max(0, o.bottomLeft - Math.max(r.b, r.l)),
        bottomRight: Math.max(0, o.bottomRight - Math.max(r.b, r.r))
      }
    }
  };
}
function bo(n, t, e, s) {
  const r = t === null, o = e === null, h = n && !(r && o) && ph(n, s);
  return h && (r || Ce(t, h.left, h.right)) && (o || Ce(e, h.top, h.bottom));
}
function _p(n) {
  return n.topLeft || n.topRight || n.bottomLeft || n.bottomRight;
}
function vp(n, t) {
  n.rect(t.x, t.y, t.w, t.h);
}
function xo(n, t, e = {}) {
  const s = n.x !== e.x ? -t : 0, r = n.y !== e.y ? -t : 0, o = (n.x + n.w !== e.x + e.w ? t : 0) - s, a = (n.y + n.h !== e.y + e.h ? t : 0) - r;
  return {
    x: n.x + s,
    y: n.y + r,
    w: n.w + o,
    h: n.h + a,
    radius: n.radius
  };
}
class Ls extends Oe {
  constructor(t) {
    super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, t && Object.assign(this, t);
  }
  draw(t) {
    const { inflateAmount: e, options: { borderColor: s, backgroundColor: r } } = this, { inner: o, outer: a } = mp(this), h = _p(a.radius) ? yn : vp;
    t.save(), (a.w !== o.w || a.h !== o.h) && (t.beginPath(), h(t, xo(a, e, o)), t.clip(), h(t, xo(o, -e, a)), t.fillStyle = s, t.fill("evenodd")), t.beginPath(), h(t, xo(o, e)), t.fillStyle = r, t.fill(), t.restore();
  }
  inRange(t, e, s) {
    return bo(this, t, e, s);
  }
  inXRange(t, e) {
    return bo(this, t, null, e);
  }
  inYRange(t, e) {
    return bo(this, null, t, e);
  }
  getCenterPoint(t) {
    const { x: e, y: s, base: r, horizontal: o } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: o ? (e + r) / 2 : e,
      y: o ? s : (s + r) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
z(Ls, "id", "bar"), z(Ls, "defaults", {
  borderSkipped: "start",
  borderWidth: 0,
  borderRadius: 0,
  inflateAmount: "auto",
  pointStyle: void 0
}), z(Ls, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
var yp = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcElement: an,
  BarElement: Ls,
  LineElement: Re,
  PointElement: ws
});
const Io = [
  "rgb(54, 162, 235)",
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)"
  // grey
], Ja = /* @__PURE__ */ Io.map((n) => n.replace("rgb(", "rgba(").replace(")", ", 0.5)"));
function gh(n) {
  return Io[n % Io.length];
}
function mh(n) {
  return Ja[n % Ja.length];
}
function bp(n, t) {
  return n.borderColor = gh(t), n.backgroundColor = mh(t), ++t;
}
function xp(n, t) {
  return n.backgroundColor = n.data.map(() => gh(t++)), t;
}
function wp(n, t) {
  return n.backgroundColor = n.data.map(() => mh(t++)), t;
}
function Lp(n) {
  let t = 0;
  return (e, s) => {
    const r = n.getDatasetMeta(s).controller;
    r instanceof ai ? t = xp(e, t) : r instanceof pn ? t = wp(e, t) : r && (t = bp(e, t));
  };
}
function $a(n) {
  let t;
  for (t in n)
    if (n[t].borderColor || n[t].backgroundColor)
      return !0;
  return !1;
}
function Mp(n) {
  return n && (n.borderColor || n.backgroundColor);
}
function Pp() {
  return Lt.borderColor !== "rgba(0,0,0,0.1)" || Lt.backgroundColor !== "rgba(0,0,0,0.1)";
}
var kp = {
  id: "colors",
  defaults: {
    enabled: !0,
    forceOverride: !1
  },
  beforeLayout(n, t, e) {
    if (!e.enabled)
      return;
    const { data: { datasets: s }, options: r } = n.config, { elements: o } = r, a = $a(s) || Mp(r) || o && $a(o) || Pp();
    if (!e.forceOverride && a)
      return;
    const h = Lp(n);
    s.forEach(h);
  }
};
function Sp(n, t, e, s, r) {
  const o = r.samples || s;
  if (o >= e)
    return n.slice(t, t + e);
  const a = [], h = (e - 2) / (o - 2);
  let c = 0;
  const d = t + e - 1;
  let p = t, g, _, v, b, x;
  for (a[c++] = n[p], g = 0; g < o - 2; g++) {
    let M = 0, P = 0, S;
    const A = Math.floor((g + 1) * h) + 1 + t, O = Math.min(Math.floor((g + 2) * h) + 1, e) + t, T = O - A;
    for (S = A; S < O; S++)
      M += n[S].x, P += n[S].y;
    M /= T, P /= T;
    const I = Math.floor(g * h) + 1 + t, D = Math.min(Math.floor((g + 1) * h) + 1, e) + t, { x: B, y: N } = n[p];
    for (v = b = -1, S = I; S < D; S++)
      b = 0.5 * Math.abs((B - M) * (n[S].y - N) - (B - n[S].x) * (P - N)), b > v && (v = b, _ = n[S], x = S);
    a[c++] = _, p = x;
  }
  return a[c++] = n[d], a;
}
function Cp(n, t, e, s) {
  let r = 0, o = 0, a, h, c, d, p, g, _, v, b, x;
  const M = [], P = t + e - 1, S = n[t].x, O = n[P].x - S;
  for (a = t; a < t + e; ++a) {
    h = n[a], c = (h.x - S) / O * s, d = h.y;
    const T = c | 0;
    if (T === p)
      d < b ? (b = d, g = a) : d > x && (x = d, _ = a), r = (o * r + h.x) / ++o;
    else {
      const I = a - 1;
      if (!rt(g) && !rt(_)) {
        const D = Math.min(g, _), B = Math.max(g, _);
        D !== v && D !== I && M.push({
          ...n[D],
          x: r
        }), B !== v && B !== I && M.push({
          ...n[B],
          x: r
        });
      }
      a > 0 && I !== v && M.push(n[I]), M.push(h), p = T, o = 0, b = x = d, g = _ = v = a;
    }
  }
  return M;
}
function _h(n) {
  if (n._decimated) {
    const t = n._data;
    delete n._decimated, delete n._data, Object.defineProperty(n, "data", {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: t
    });
  }
}
function Qa(n) {
  n.data.datasets.forEach((t) => {
    _h(t);
  });
}
function Tp(n, t) {
  const e = t.length;
  let s = 0, r;
  const { iScale: o } = n, { min: a, max: h, minDefined: c, maxDefined: d } = o.getUserBounds();
  return c && (s = Rt(Te(t, o.axis, a).lo, 0, e - 1)), d ? r = Rt(Te(t, o.axis, h).hi + 1, s, e) - s : r = e - s, {
    start: s,
    count: r
  };
}
var Ap = {
  id: "decimation",
  defaults: {
    algorithm: "min-max",
    enabled: !1
  },
  beforeElementsUpdate: (n, t, e) => {
    if (!e.enabled) {
      Qa(n);
      return;
    }
    const s = n.width;
    n.data.datasets.forEach((r, o) => {
      const { _data: a, indexAxis: h } = r, c = n.getDatasetMeta(o), d = a || r.data;
      if (on([
        h,
        n.options.indexAxis
      ]) === "y" || !c.controller.supportsDecimation)
        return;
      const p = n.scales[c.xAxisID];
      if (p.type !== "linear" && p.type !== "time" || n.options.parsing)
        return;
      let { start: g, count: _ } = Tp(c, d);
      const v = e.threshold || 4 * s;
      if (_ <= v) {
        _h(r);
        return;
      }
      rt(a) && (r._data = d, delete r.data, Object.defineProperty(r, "data", {
        configurable: !0,
        enumerable: !0,
        get: function() {
          return this._decimated;
        },
        set: function(x) {
          this._data = x;
        }
      }));
      let b;
      switch (e.algorithm) {
        case "lttb":
          b = Sp(d, g, _, s, e);
          break;
        case "min-max":
          b = Cp(d, g, _, s);
          break;
        default:
          throw new Error(`Unsupported decimation algorithm '${e.algorithm}'`);
      }
      r._decimated = b;
    });
  },
  destroy(n) {
    Qa(n);
  }
};
function Op(n, t, e) {
  const s = n.segments, r = n.points, o = t.points, a = [];
  for (const h of s) {
    let { start: c, end: d } = h;
    d = ir(c, d, r);
    const p = Do(e, r[c], r[d], h.loop);
    if (!t.segments) {
      a.push({
        source: h,
        target: p,
        start: r[c],
        end: r[d]
      });
      continue;
    }
    const g = Ql(t, p);
    for (const _ of g) {
      const v = Do(e, o[_.start], o[_.end], _.loop), b = $l(h, r, v);
      for (const x of b)
        a.push({
          source: x,
          target: _,
          start: {
            [e]: tl(p, v, "start", Math.max)
          },
          end: {
            [e]: tl(p, v, "end", Math.min)
          }
        });
    }
  }
  return a;
}
function Do(n, t, e, s) {
  if (s)
    return;
  let r = t[n], o = e[n];
  return n === "angle" && (r = Jt(r), o = Jt(o)), {
    property: n,
    start: r,
    end: o
  };
}
function Ep(n, t) {
  const { x: e = null, y: s = null } = n || {}, r = t.points, o = [];
  return t.segments.forEach(({ start: a, end: h }) => {
    h = ir(a, h, r);
    const c = r[a], d = r[h];
    s !== null ? (o.push({
      x: c.x,
      y: s
    }), o.push({
      x: d.x,
      y: s
    })) : e !== null && (o.push({
      x: e,
      y: c.y
    }), o.push({
      x: e,
      y: d.y
    }));
  }), o;
}
function ir(n, t, e) {
  for (; t > n; t--) {
    const s = e[t];
    if (!isNaN(s.x) && !isNaN(s.y))
      break;
  }
  return t;
}
function tl(n, t, e, s) {
  return n && t ? s(n[e], t[e]) : n ? n[e] : t ? t[e] : 0;
}
function vh(n, t) {
  let e = [], s = !1;
  return vt(n) ? (s = !0, e = n) : e = Ep(n, t), e.length ? new Re({
    points: e,
    options: {
      tension: 0
    },
    _loop: s,
    _fullLoop: s
  }) : null;
}
function el(n) {
  return n && n.fill !== !1;
}
function Ip(n, t, e) {
  let r = n[t].fill;
  const o = [
    t
  ];
  let a;
  if (!e)
    return r;
  for (; r !== !1 && o.indexOf(r) === -1; ) {
    if (!St(r))
      return r;
    if (a = n[r], !a)
      return !1;
    if (a.visible)
      return r;
    o.push(r), r = a.fill;
  }
  return !1;
}
function Dp(n, t, e) {
  const s = Fp(n);
  if (nt(s))
    return isNaN(s.value) ? !1 : s;
  let r = parseFloat(s);
  return St(r) && Math.floor(r) === r ? zp(s[0], t, r, e) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(s) >= 0 && s;
}
function zp(n, t, e, s) {
  return (n === "-" || n === "+") && (e = t + e), e === t || e < 0 || e >= s ? !1 : e;
}
function Bp(n, t) {
  let e = null;
  return n === "start" ? e = t.bottom : n === "end" ? e = t.top : nt(n) ? e = t.getPixelForValue(n.value) : t.getBasePixel && (e = t.getBasePixel()), e;
}
function Rp(n, t, e) {
  let s;
  return n === "start" ? s = e : n === "end" ? s = t.options.reverse ? t.min : t.max : nt(n) ? s = n.value : s = t.getBaseValue(), s;
}
function Fp(n) {
  const t = n.options, e = t.fill;
  let s = X(e && e.target, e);
  return s === void 0 && (s = !!t.backgroundColor), s === !1 || s === null ? !1 : s === !0 ? "origin" : s;
}
function Np(n) {
  const { scale: t, index: e, line: s } = n, r = [], o = s.segments, a = s.points, h = Zp(t, e);
  h.push(vh({
    x: null,
    y: t.bottom
  }, s));
  for (let c = 0; c < o.length; c++) {
    const d = o[c];
    for (let p = d.start; p <= d.end; p++)
      Hp(r, a[p], h);
  }
  return new Re({
    points: r,
    options: {}
  });
}
function Zp(n, t) {
  const e = [], s = n.getMatchingVisibleMetas("line");
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (o.index === t)
      break;
    o.hidden || e.unshift(o.dataset);
  }
  return e;
}
function Hp(n, t, e) {
  const s = [];
  for (let r = 0; r < e.length; r++) {
    const o = e[r], { first: a, last: h, point: c } = Wp(o, t, "x");
    if (!(!c || a && h)) {
      if (a)
        s.unshift(c);
      else if (n.push(c), !h)
        break;
    }
  }
  n.push(...s);
}
function Wp(n, t, e) {
  const s = n.interpolate(t, e);
  if (!s)
    return {};
  const r = s[e], o = n.segments, a = n.points;
  let h = !1, c = !1;
  for (let d = 0; d < o.length; d++) {
    const p = o[d], g = a[p.start][e], _ = a[p.end][e];
    if (Ce(r, g, _)) {
      h = r === g, c = r === _;
      break;
    }
  }
  return {
    first: h,
    last: c,
    point: s
  };
}
class yh {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, e, s) {
    const { x: r, y: o, radius: a } = this;
    return e = e || {
      start: 0,
      end: yt
    }, t.arc(r, o, a, e.end, e.start, !0), !s.bounds;
  }
  interpolate(t) {
    const { x: e, y: s, radius: r } = this, o = t.angle;
    return {
      x: e + Math.cos(o) * r,
      y: s + Math.sin(o) * r,
      angle: o
    };
  }
}
function Vp(n) {
  const { chart: t, fill: e, line: s } = n;
  if (St(e))
    return jp(t, e);
  if (e === "stack")
    return Np(n);
  if (e === "shape")
    return !0;
  const r = Up(n);
  return r instanceof yh ? r : vh(r, s);
}
function jp(n, t) {
  const e = n.getDatasetMeta(t);
  return e && n.isDatasetVisible(t) ? e.dataset : null;
}
function Up(n) {
  return (n.scale || {}).getPointPositionForValue ? Yp(n) : Gp(n);
}
function Gp(n) {
  const { scale: t = {}, fill: e } = n, s = Bp(e, t);
  if (St(s)) {
    const r = t.isHorizontal();
    return {
      x: r ? s : null,
      y: r ? null : s
    };
  }
  return null;
}
function Yp(n) {
  const { scale: t, fill: e } = n, s = t.options, r = t.getLabels().length, o = s.reverse ? t.max : t.min, a = Rp(e, t, o), h = [];
  if (s.grid.circular) {
    const c = t.getPointPositionForValue(0, o);
    return new yh({
      x: c.x,
      y: c.y,
      radius: t.getDistanceFromCenterForValue(a)
    });
  }
  for (let c = 0; c < r; ++c)
    h.push(t.getPointPositionForValue(c, a));
  return h;
}
function wo(n, t, e) {
  const s = Vp(t), { line: r, scale: o, axis: a } = t, h = r.options, c = h.fill, d = h.backgroundColor, { above: p = d, below: g = d } = c || {};
  s && r.points.length && (Is(n, e), qp(n, {
    line: r,
    target: s,
    above: p,
    below: g,
    area: e,
    scale: o,
    axis: a
  }), Ds(n));
}
function qp(n, t) {
  const { line: e, target: s, above: r, below: o, area: a, scale: h } = t, c = e._loop ? "angle" : t.axis;
  n.save(), c === "x" && o !== r && (il(n, s, a.top), nl(n, {
    line: e,
    target: s,
    color: r,
    scale: h,
    property: c
  }), n.restore(), n.save(), il(n, s, a.bottom)), nl(n, {
    line: e,
    target: s,
    color: o,
    scale: h,
    property: c
  }), n.restore();
}
function il(n, t, e) {
  const { segments: s, points: r } = t;
  let o = !0, a = !1;
  n.beginPath();
  for (const h of s) {
    const { start: c, end: d } = h, p = r[c], g = r[ir(c, d, r)];
    o ? (n.moveTo(p.x, p.y), o = !1) : (n.lineTo(p.x, e), n.lineTo(p.x, p.y)), a = !!t.pathSegment(n, h, {
      move: a
    }), a ? n.closePath() : n.lineTo(g.x, e);
  }
  n.lineTo(t.first().x, e), n.closePath(), n.clip();
}
function nl(n, t) {
  const { line: e, target: s, property: r, color: o, scale: a } = t, h = Op(e, s, r);
  for (const { source: c, target: d, start: p, end: g } of h) {
    const { style: { backgroundColor: _ = o } = {} } = c, v = s !== !0;
    n.save(), n.fillStyle = _, Xp(n, a, v && Do(r, p, g)), n.beginPath();
    const b = !!e.pathSegment(n, c);
    let x;
    if (v) {
      b ? n.closePath() : sl(n, s, g, r);
      const M = !!s.pathSegment(n, d, {
        move: b,
        reverse: !0
      });
      x = b && M, x || sl(n, s, p, r);
    }
    n.closePath(), n.fill(x ? "evenodd" : "nonzero"), n.restore();
  }
}
function Xp(n, t, e) {
  const { top: s, bottom: r } = t.chart.chartArea, { property: o, start: a, end: h } = e || {};
  o === "x" && (n.beginPath(), n.rect(a, s, h - a, r - s), n.clip());
}
function sl(n, t, e, s) {
  const r = t.interpolate(e, s);
  r && n.lineTo(r.x, r.y);
}
var Kp = {
  id: "filler",
  afterDatasetsUpdate(n, t, e) {
    const s = (n.data.datasets || []).length, r = [];
    let o, a, h, c;
    for (a = 0; a < s; ++a)
      o = n.getDatasetMeta(a), h = o.dataset, c = null, h && h.options && h instanceof Re && (c = {
        visible: n.isDatasetVisible(a),
        index: a,
        fill: Dp(h, a, s),
        chart: n,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: h
      }), o.$filler = c, r.push(c);
    for (a = 0; a < s; ++a)
      c = r[a], !(!c || c.fill === !1) && (c.fill = Ip(r, a, e.propagate));
  },
  beforeDraw(n, t, e) {
    const s = e.drawTime === "beforeDraw", r = n.getSortedVisibleDatasetMetas(), o = n.chartArea;
    for (let a = r.length - 1; a >= 0; --a) {
      const h = r[a].$filler;
      h && (h.line.updateControlPoints(o, h.axis), s && h.fill && wo(n.ctx, h, o));
    }
  },
  beforeDatasetsDraw(n, t, e) {
    if (e.drawTime !== "beforeDatasetsDraw")
      return;
    const s = n.getSortedVisibleDatasetMetas();
    for (let r = s.length - 1; r >= 0; --r) {
      const o = s[r].$filler;
      el(o) && wo(n.ctx, o, n.chartArea);
    }
  },
  beforeDatasetDraw(n, t, e) {
    const s = t.meta.$filler;
    !el(s) || e.drawTime !== "beforeDatasetDraw" || wo(n.ctx, s, n.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const ol = (n, t) => {
  let { boxHeight: e = t, boxWidth: s = t } = n;
  return n.usePointStyle && (e = Math.min(e, t), s = n.pointStyleWidth || Math.min(s, t)), {
    boxWidth: s,
    boxHeight: e,
    itemHeight: Math.max(t, e)
  };
}, Jp = (n, t) => n !== null && t !== null && n.datasetIndex === t.datasetIndex && n.index === t.index;
class rl extends Oe {
  constructor(t) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, e, s) {
    this.maxWidth = t, this.maxHeight = e, this._margins = s, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const t = this.options.labels || {};
    let e = mt(t.generateLabels, [
      this.chart
    ], this) || [];
    t.filter && (e = e.filter((s) => t.filter(s, this.chart.data))), t.sort && (e = e.sort((s, r) => t.sort(s, r, this.chart.data))), this.options.reverse && e.reverse(), this.legendItems = e;
  }
  fit() {
    const { options: t, ctx: e } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const s = t.labels, r = Dt(s.font), o = r.size, a = this._computeTitleHeight(), { boxWidth: h, itemHeight: c } = ol(s, o);
    let d, p;
    e.font = r.string, this.isHorizontal() ? (d = this.maxWidth, p = this._fitRows(a, o, h, c) + 10) : (p = this.maxHeight, d = this._fitCols(a, r, h, c) + 10), this.width = Math.min(d, t.maxWidth || this.maxWidth), this.height = Math.min(p, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, e, s, r) {
    const { ctx: o, maxWidth: a, options: { labels: { padding: h } } } = this, c = this.legendHitBoxes = [], d = this.lineWidths = [
      0
    ], p = r + h;
    let g = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let _ = -1, v = -p;
    return this.legendItems.forEach((b, x) => {
      const M = s + e / 2 + o.measureText(b.text).width;
      (x === 0 || d[d.length - 1] + M + 2 * h > a) && (g += p, d[d.length - (x > 0 ? 0 : 1)] = 0, v += p, _++), c[x] = {
        left: 0,
        top: v,
        row: _,
        width: M,
        height: r
      }, d[d.length - 1] += M + h;
    }), g;
  }
  _fitCols(t, e, s, r) {
    const { ctx: o, maxHeight: a, options: { labels: { padding: h } } } = this, c = this.legendHitBoxes = [], d = this.columnSizes = [], p = a - t;
    let g = h, _ = 0, v = 0, b = 0, x = 0;
    return this.legendItems.forEach((M, P) => {
      const { itemWidth: S, itemHeight: A } = $p(s, e, o, M, r);
      P > 0 && v + A + 2 * h > p && (g += _ + h, d.push({
        width: _,
        height: v
      }), b += _ + h, x++, _ = v = 0), c[P] = {
        left: b,
        top: v,
        col: x,
        width: S,
        height: A
      }, _ = Math.max(_, S), v += A + h;
    }), g += _, d.push({
      width: _,
      height: v
    }), g;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: e, options: { align: s, labels: { padding: r }, rtl: o } } = this, a = Ai(o, this.left, this.width);
    if (this.isHorizontal()) {
      let h = 0, c = Zt(s, this.left + r, this.right - this.lineWidths[h]);
      for (const d of e)
        h !== d.row && (h = d.row, c = Zt(s, this.left + r, this.right - this.lineWidths[h])), d.top += this.top + t + r, d.left = a.leftForLtr(a.x(c), d.width), c += d.width + r;
    } else {
      let h = 0, c = Zt(s, this.top + t + r, this.bottom - this.columnSizes[h].height);
      for (const d of e)
        d.col !== h && (h = d.col, c = Zt(s, this.top + t + r, this.bottom - this.columnSizes[h].height)), d.top = c, d.left += this.left + r, d.left = a.leftForLtr(a.x(d.left), d.width), c += d.height + r;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      Is(t, this), this._draw(), Ds(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: e, lineWidths: s, ctx: r } = this, { align: o, labels: a } = t, h = Lt.color, c = Ai(t.rtl, this.left, this.width), d = Dt(a.font), { padding: p } = a, g = d.size, _ = g / 2;
    let v;
    this.drawTitle(), r.textAlign = c.textAlign("left"), r.textBaseline = "middle", r.lineWidth = 0.5, r.font = d.string;
    const { boxWidth: b, boxHeight: x, itemHeight: M } = ol(a, g), P = function(I, D, B) {
      if (isNaN(b) || b <= 0 || isNaN(x) || x < 0)
        return;
      r.save();
      const N = X(B.lineWidth, 1);
      if (r.fillStyle = X(B.fillStyle, h), r.lineCap = X(B.lineCap, "butt"), r.lineDashOffset = X(B.lineDashOffset, 0), r.lineJoin = X(B.lineJoin, "miter"), r.lineWidth = N, r.strokeStyle = X(B.strokeStyle, h), r.setLineDash(X(B.lineDash, [])), a.usePointStyle) {
        const Y = {
          radius: x * Math.SQRT2 / 2,
          pointStyle: B.pointStyle,
          rotation: B.rotation,
          borderWidth: N
        }, Z = c.xPlus(I, b / 2), V = D + _;
        Hl(r, Y, Z, V, a.pointStyleWidth && b);
      } else {
        const Y = D + Math.max((g - x) / 2, 0), Z = c.leftForLtr(I, b), V = li(B.borderRadius);
        r.beginPath(), Object.values(V).some((Ct) => Ct !== 0) ? yn(r, {
          x: Z,
          y: Y,
          w: b,
          h: x,
          radius: V
        }) : r.rect(Z, Y, b, x), r.fill(), N !== 0 && r.stroke();
      }
      r.restore();
    }, S = function(I, D, B) {
      ui(r, B.text, I, D + M / 2, d, {
        strikethrough: B.hidden,
        textAlign: c.textAlign(B.textAlign)
      });
    }, A = this.isHorizontal(), O = this._computeTitleHeight();
    A ? v = {
      x: Zt(o, this.left + p, this.right - s[0]),
      y: this.top + p + O,
      line: 0
    } : v = {
      x: this.left + p,
      y: Zt(o, this.top + O + p, this.bottom - e[0].height),
      line: 0
    }, Xl(this.ctx, t.textDirection);
    const T = M + p;
    this.legendItems.forEach((I, D) => {
      r.strokeStyle = I.fontColor, r.fillStyle = I.fontColor;
      const B = r.measureText(I.text).width, N = c.textAlign(I.textAlign || (I.textAlign = a.textAlign)), Y = b + _ + B;
      let Z = v.x, V = v.y;
      c.setWidth(this.width), A ? D > 0 && Z + Y + p > this.right && (V = v.y += T, v.line++, Z = v.x = Zt(o, this.left + p, this.right - s[v.line])) : D > 0 && V + T > this.bottom && (Z = v.x = Z + e[v.line].width + p, v.line++, V = v.y = Zt(o, this.top + O + p, this.bottom - e[v.line].height));
      const Ct = c.x(Z);
      if (P(Ct, V, I), Z = _u(N, Z + b + _, A ? Z + Y : this.right, t.rtl), S(c.x(Z), V, I), A)
        v.x += Y + p;
      else if (typeof I.text != "string") {
        const et = d.lineHeight;
        v.y += bh(I, et) + p;
      } else
        v.y += T;
    }), Kl(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, e = t.title, s = Dt(e.font), r = Wt(e.padding);
    if (!e.display)
      return;
    const o = Ai(t.rtl, this.left, this.width), a = this.ctx, h = e.position, c = s.size / 2, d = r.top + c;
    let p, g = this.left, _ = this.width;
    if (this.isHorizontal())
      _ = Math.max(...this.lineWidths), p = this.top + d, g = Zt(t.align, g, this.right - _);
    else {
      const b = this.columnSizes.reduce((x, M) => Math.max(x, M.height), 0);
      p = d + Zt(t.align, this.top, this.bottom - b - t.labels.padding - this._computeTitleHeight());
    }
    const v = Zt(h, g, g + _);
    a.textAlign = o.textAlign(Yo(h)), a.textBaseline = "middle", a.strokeStyle = e.color, a.fillStyle = e.color, a.font = s.string, ui(a, e.text, v, p, s);
  }
  _computeTitleHeight() {
    const t = this.options.title, e = Dt(t.font), s = Wt(t.padding);
    return t.display ? e.lineHeight + s.height : 0;
  }
  _getLegendItemAt(t, e) {
    let s, r, o;
    if (Ce(t, this.left, this.right) && Ce(e, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, s = 0; s < o.length; ++s)
        if (r = o[s], Ce(t, r.left, r.left + r.width) && Ce(e, r.top, r.top + r.height))
          return this.legendItems[s];
    }
    return null;
  }
  handleEvent(t) {
    const e = this.options;
    if (!eg(t.type, e))
      return;
    const s = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const r = this._hoveredItem, o = Jp(r, s);
      r && !o && mt(e.onLeave, [
        t,
        r,
        this
      ], this), this._hoveredItem = s, s && !o && mt(e.onHover, [
        t,
        s,
        this
      ], this);
    } else
      s && mt(e.onClick, [
        t,
        s,
        this
      ], this);
  }
}
function $p(n, t, e, s, r) {
  const o = Qp(s, n, t, e), a = tg(r, s, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: a
  };
}
function Qp(n, t, e, s) {
  let r = n.text;
  return r && typeof r != "string" && (r = r.reduce((o, a) => o.length > a.length ? o : a)), t + e.size / 2 + s.measureText(r).width;
}
function tg(n, t, e) {
  let s = n;
  return typeof t.text != "string" && (s = bh(t, e)), s;
}
function bh(n, t) {
  const e = n.text ? n.text.length : 0;
  return t * e;
}
function eg(n, t) {
  return !!((n === "mousemove" || n === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (n === "click" || n === "mouseup"));
}
var ig = {
  id: "legend",
  _element: rl,
  start(n, t, e) {
    const s = n.legend = new rl({
      ctx: n.ctx,
      options: e,
      chart: n
    });
    Ht.configure(n, s, e), Ht.addBox(n, s);
  },
  stop(n) {
    Ht.removeBox(n, n.legend), delete n.legend;
  },
  beforeUpdate(n, t, e) {
    const s = n.legend;
    Ht.configure(n, s, e), s.options = e;
  },
  afterUpdate(n) {
    const t = n.legend;
    t.buildLabels(), t.adjustHitBoxes();
  },
  afterEvent(n, t) {
    t.replay || n.legend.handleEvent(t.event);
  },
  defaults: {
    display: !0,
    position: "top",
    align: "center",
    fullSize: !0,
    reverse: !1,
    weight: 1e3,
    onClick(n, t, e) {
      const s = t.datasetIndex, r = e.chart;
      r.isDatasetVisible(s) ? (r.hide(s), t.hidden = !0) : (r.show(s), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (n) => n.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(n) {
        const t = n.data.datasets, { labels: { usePointStyle: e, pointStyle: s, textAlign: r, color: o, useBorderRadius: a, borderRadius: h } } = n.legend.options;
        return n._getSortedDatasetMetas().map((c) => {
          const d = c.controller.getStyle(e ? 0 : void 0), p = Wt(d.borderWidth);
          return {
            text: t[c.index].label,
            fillStyle: d.backgroundColor,
            fontColor: o,
            hidden: !c.visible,
            lineCap: d.borderCapStyle,
            lineDash: d.borderDash,
            lineDashOffset: d.borderDashOffset,
            lineJoin: d.borderJoinStyle,
            lineWidth: (p.width + p.height) / 4,
            strokeStyle: d.borderColor,
            pointStyle: s || d.pointStyle,
            rotation: d.rotation,
            textAlign: r || d.textAlign,
            borderRadius: a && (h || d.borderRadius),
            datasetIndex: c.index
          };
        }, this);
      }
    },
    title: {
      color: (n) => n.chart.options.color,
      display: !1,
      position: "center",
      text: ""
    }
  },
  descriptors: {
    _scriptable: (n) => !n.startsWith("on"),
    labels: {
      _scriptable: (n) => ![
        "generateLabels",
        "filter",
        "sort"
      ].includes(n)
    }
  }
};
class nr extends Oe {
  constructor(t) {
    super(), this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, e) {
    const s = this.options;
    if (this.left = 0, this.top = 0, !s.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = t, this.height = this.bottom = e;
    const r = vt(s.text) ? s.text.length : 1;
    this._padding = Wt(s.padding);
    const o = r * Dt(s.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: e, left: s, bottom: r, right: o, options: a } = this, h = a.align;
    let c = 0, d, p, g;
    return this.isHorizontal() ? (p = Zt(h, s, o), g = e + t, d = o - s) : (a.position === "left" ? (p = s + t, g = Zt(h, r, e), c = bt * -0.5) : (p = o - t, g = Zt(h, e, r), c = bt * 0.5), d = r - e), {
      titleX: p,
      titleY: g,
      maxWidth: d,
      rotation: c
    };
  }
  draw() {
    const t = this.ctx, e = this.options;
    if (!e.display)
      return;
    const s = Dt(e.font), o = s.lineHeight / 2 + this._padding.top, { titleX: a, titleY: h, maxWidth: c, rotation: d } = this._drawArgs(o);
    ui(t, e.text, 0, 0, s, {
      color: e.color,
      maxWidth: c,
      rotation: d,
      textAlign: Yo(e.align),
      textBaseline: "middle",
      translation: [
        a,
        h
      ]
    });
  }
}
function ng(n, t) {
  const e = new nr({
    ctx: n.ctx,
    options: t,
    chart: n
  });
  Ht.configure(n, e, t), Ht.addBox(n, e), n.titleBlock = e;
}
var sg = {
  id: "title",
  _element: nr,
  start(n, t, e) {
    ng(n, e);
  },
  stop(n) {
    const t = n.titleBlock;
    Ht.removeBox(n, t), delete n.titleBlock;
  },
  beforeUpdate(n, t, e) {
    const s = n.titleBlock;
    Ht.configure(n, s, e), s.options = e;
  },
  defaults: {
    align: "center",
    display: !1,
    font: {
      weight: "bold"
    },
    fullSize: !0,
    padding: 10,
    position: "top",
    text: "",
    weight: 2e3
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: !0,
    _indexable: !1
  }
};
const cs = /* @__PURE__ */ new WeakMap();
var og = {
  id: "subtitle",
  start(n, t, e) {
    const s = new nr({
      ctx: n.ctx,
      options: e,
      chart: n
    });
    Ht.configure(n, s, e), Ht.addBox(n, s), cs.set(n, s);
  },
  stop(n) {
    Ht.removeBox(n, cs.get(n)), cs.delete(n);
  },
  beforeUpdate(n, t, e) {
    const s = cs.get(n);
    Ht.configure(n, s, e), s.options = e;
  },
  defaults: {
    align: "center",
    display: !1,
    font: {
      weight: "normal"
    },
    fullSize: !0,
    padding: 0,
    position: "top",
    text: "",
    weight: 1500
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: !0,
    _indexable: !1
  }
};
const ln = {
  average(n) {
    if (!n.length)
      return !1;
    let t, e, s = /* @__PURE__ */ new Set(), r = 0, o = 0;
    for (t = 0, e = n.length; t < e; ++t) {
      const h = n[t].element;
      if (h && h.hasValue()) {
        const c = h.tooltipPosition();
        s.add(c.x), r += c.y, ++o;
      }
    }
    return o === 0 || s.size === 0 ? !1 : {
      x: [
        ...s
      ].reduce((h, c) => h + c) / s.size,
      y: r / o
    };
  },
  nearest(n, t) {
    if (!n.length)
      return !1;
    let e = t.x, s = t.y, r = Number.POSITIVE_INFINITY, o, a, h;
    for (o = 0, a = n.length; o < a; ++o) {
      const c = n[o].element;
      if (c && c.hasValue()) {
        const d = c.getCenterPoint(), p = ko(t, d);
        p < r && (r = p, h = c);
      }
    }
    if (h) {
      const c = h.tooltipPosition();
      e = c.x, s = c.y;
    }
    return {
      x: e,
      y: s
    };
  }
};
function ge(n, t) {
  return t && (vt(t) ? Array.prototype.push.apply(n, t) : n.push(t)), n;
}
function Pe(n) {
  return (typeof n == "string" || n instanceof String) && n.indexOf(`
`) > -1 ? n.split(`
`) : n;
}
function rg(n, t) {
  const { element: e, datasetIndex: s, index: r } = t, o = n.getDatasetMeta(s).controller, { label: a, value: h } = o.getLabelAndValue(r);
  return {
    chart: n,
    label: a,
    parsed: o.getParsed(r),
    raw: n.data.datasets[s].data[r],
    formattedValue: h,
    dataset: o.getDataset(),
    dataIndex: r,
    datasetIndex: s,
    element: e
  };
}
function al(n, t) {
  const e = n.chart.ctx, { body: s, footer: r, title: o } = n, { boxWidth: a, boxHeight: h } = t, c = Dt(t.bodyFont), d = Dt(t.titleFont), p = Dt(t.footerFont), g = o.length, _ = r.length, v = s.length, b = Wt(t.padding);
  let x = b.height, M = 0, P = s.reduce((O, T) => O + T.before.length + T.lines.length + T.after.length, 0);
  if (P += n.beforeBody.length + n.afterBody.length, g && (x += g * d.lineHeight + (g - 1) * t.titleSpacing + t.titleMarginBottom), P) {
    const O = t.displayColors ? Math.max(h, c.lineHeight) : c.lineHeight;
    x += v * O + (P - v) * c.lineHeight + (P - 1) * t.bodySpacing;
  }
  _ && (x += t.footerMarginTop + _ * p.lineHeight + (_ - 1) * t.footerSpacing);
  let S = 0;
  const A = function(O) {
    M = Math.max(M, e.measureText(O).width + S);
  };
  return e.save(), e.font = d.string, ft(n.title, A), e.font = c.string, ft(n.beforeBody.concat(n.afterBody), A), S = t.displayColors ? a + 2 + t.boxPadding : 0, ft(s, (O) => {
    ft(O.before, A), ft(O.lines, A), ft(O.after, A);
  }), S = 0, e.font = p.string, ft(n.footer, A), e.restore(), M += b.width, {
    width: M,
    height: x
  };
}
function ag(n, t) {
  const { y: e, height: s } = t;
  return e < s / 2 ? "top" : e > n.height - s / 2 ? "bottom" : "center";
}
function lg(n, t, e, s) {
  const { x: r, width: o } = s, a = e.caretSize + e.caretPadding;
  if (n === "left" && r + o + a > t.width || n === "right" && r - o - a < 0)
    return !0;
}
function hg(n, t, e, s) {
  const { x: r, width: o } = e, { width: a, chartArea: { left: h, right: c } } = n;
  let d = "center";
  return s === "center" ? d = r <= (h + c) / 2 ? "left" : "right" : r <= o / 2 ? d = "left" : r >= a - o / 2 && (d = "right"), lg(d, n, t, e) && (d = "center"), d;
}
function ll(n, t, e) {
  const s = e.yAlign || t.yAlign || ag(n, e);
  return {
    xAlign: e.xAlign || t.xAlign || hg(n, t, e, s),
    yAlign: s
  };
}
function cg(n, t) {
  let { x: e, width: s } = n;
  return t === "right" ? e -= s : t === "center" && (e -= s / 2), e;
}
function ug(n, t, e) {
  let { y: s, height: r } = n;
  return t === "top" ? s += e : t === "bottom" ? s -= r + e : s -= r / 2, s;
}
function hl(n, t, e, s) {
  const { caretSize: r, caretPadding: o, cornerRadius: a } = n, { xAlign: h, yAlign: c } = e, d = r + o, { topLeft: p, topRight: g, bottomLeft: _, bottomRight: v } = li(a);
  let b = cg(t, h);
  const x = ug(t, c, d);
  return c === "center" ? h === "left" ? b += d : h === "right" && (b -= d) : h === "left" ? b -= Math.max(p, _) + r : h === "right" && (b += Math.max(g, v) + r), {
    x: Rt(b, 0, s.width - t.width),
    y: Rt(x, 0, s.height - t.height)
  };
}
function us(n, t, e) {
  const s = Wt(e.padding);
  return t === "center" ? n.x + n.width / 2 : t === "right" ? n.x + n.width - s.right : n.x + s.left;
}
function cl(n) {
  return ge([], Pe(n));
}
function dg(n, t, e) {
  return We(n, {
    tooltip: t,
    tooltipItems: e,
    type: "tooltip"
  });
}
function ul(n, t) {
  const e = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return e ? n.override(e) : n;
}
const xh = {
  beforeTitle: Le,
  title(n) {
    if (n.length > 0) {
      const t = n[0], e = t.chart.data.labels, s = e ? e.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return t.dataset.label || "";
      if (t.label)
        return t.label;
      if (s > 0 && t.dataIndex < s)
        return e[t.dataIndex];
    }
    return "";
  },
  afterTitle: Le,
  beforeBody: Le,
  beforeLabel: Le,
  label(n) {
    if (this && this.options && this.options.mode === "dataset")
      return n.label + ": " + n.formattedValue || n.formattedValue;
    let t = n.dataset.label || "";
    t && (t += ": ");
    const e = n.formattedValue;
    return rt(e) || (t += e), t;
  },
  labelColor(n) {
    const e = n.chart.getDatasetMeta(n.datasetIndex).controller.getStyle(n.dataIndex);
    return {
      borderColor: e.borderColor,
      backgroundColor: e.backgroundColor,
      borderWidth: e.borderWidth,
      borderDash: e.borderDash,
      borderDashOffset: e.borderDashOffset,
      borderRadius: 0
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(n) {
    const e = n.chart.getDatasetMeta(n.datasetIndex).controller.getStyle(n.dataIndex);
    return {
      pointStyle: e.pointStyle,
      rotation: e.rotation
    };
  },
  afterLabel: Le,
  afterBody: Le,
  beforeFooter: Le,
  footer: Le,
  afterFooter: Le
};
function Gt(n, t, e, s) {
  const r = n[t].call(e, s);
  return typeof r > "u" ? xh[t].call(e, s) : r;
}
class zo extends Oe {
  constructor(t) {
    super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = t.chart, this.options = t.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
  }
  initialize(t) {
    this.options = t, this._cachedAnimations = void 0, this.$context = void 0;
  }
  _resolveAnimations() {
    const t = this._cachedAnimations;
    if (t)
      return t;
    const e = this.chart, s = this.options.setContext(this.getContext()), r = s.enabled && e.options.animation && s.animations, o = new th(this.chart, r);
    return r._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = dg(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, e) {
    const { callbacks: s } = e, r = Gt(s, "beforeTitle", this, t), o = Gt(s, "title", this, t), a = Gt(s, "afterTitle", this, t);
    let h = [];
    return h = ge(h, Pe(r)), h = ge(h, Pe(o)), h = ge(h, Pe(a)), h;
  }
  getBeforeBody(t, e) {
    return cl(Gt(e.callbacks, "beforeBody", this, t));
  }
  getBody(t, e) {
    const { callbacks: s } = e, r = [];
    return ft(t, (o) => {
      const a = {
        before: [],
        lines: [],
        after: []
      }, h = ul(s, o);
      ge(a.before, Pe(Gt(h, "beforeLabel", this, o))), ge(a.lines, Gt(h, "label", this, o)), ge(a.after, Pe(Gt(h, "afterLabel", this, o))), r.push(a);
    }), r;
  }
  getAfterBody(t, e) {
    return cl(Gt(e.callbacks, "afterBody", this, t));
  }
  getFooter(t, e) {
    const { callbacks: s } = e, r = Gt(s, "beforeFooter", this, t), o = Gt(s, "footer", this, t), a = Gt(s, "afterFooter", this, t);
    let h = [];
    return h = ge(h, Pe(r)), h = ge(h, Pe(o)), h = ge(h, Pe(a)), h;
  }
  _createItems(t) {
    const e = this._active, s = this.chart.data, r = [], o = [], a = [];
    let h = [], c, d;
    for (c = 0, d = e.length; c < d; ++c)
      h.push(rg(this.chart, e[c]));
    return t.filter && (h = h.filter((p, g, _) => t.filter(p, g, _, s))), t.itemSort && (h = h.sort((p, g) => t.itemSort(p, g, s))), ft(h, (p) => {
      const g = ul(t.callbacks, p);
      r.push(Gt(g, "labelColor", this, p)), o.push(Gt(g, "labelPointStyle", this, p)), a.push(Gt(g, "labelTextColor", this, p));
    }), this.labelColors = r, this.labelPointStyles = o, this.labelTextColors = a, this.dataPoints = h, h;
  }
  update(t, e) {
    const s = this.options.setContext(this.getContext()), r = this._active;
    let o, a = [];
    if (!r.length)
      this.opacity !== 0 && (o = {
        opacity: 0
      });
    else {
      const h = ln[s.position].call(this, r, this._eventPosition);
      a = this._createItems(s), this.title = this.getTitle(a, s), this.beforeBody = this.getBeforeBody(a, s), this.body = this.getBody(a, s), this.afterBody = this.getAfterBody(a, s), this.footer = this.getFooter(a, s);
      const c = this._size = al(this, s), d = Object.assign({}, h, c), p = ll(this.chart, s, d), g = hl(s, d, p, this.chart);
      this.xAlign = p.xAlign, this.yAlign = p.yAlign, o = {
        opacity: 1,
        x: g.x,
        y: g.y,
        width: c.width,
        height: c.height,
        caretX: h.x,
        caretY: h.y
      };
    }
    this._tooltipItems = a, this.$context = void 0, o && this._resolveAnimations().update(this, o), t && s.external && s.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: e
    });
  }
  drawCaret(t, e, s, r) {
    const o = this.getCaretPosition(t, s, r);
    e.lineTo(o.x1, o.y1), e.lineTo(o.x2, o.y2), e.lineTo(o.x3, o.y3);
  }
  getCaretPosition(t, e, s) {
    const { xAlign: r, yAlign: o } = this, { caretSize: a, cornerRadius: h } = s, { topLeft: c, topRight: d, bottomLeft: p, bottomRight: g } = li(h), { x: _, y: v } = t, { width: b, height: x } = e;
    let M, P, S, A, O, T;
    return o === "center" ? (O = v + x / 2, r === "left" ? (M = _, P = M - a, A = O + a, T = O - a) : (M = _ + b, P = M + a, A = O - a, T = O + a), S = M) : (r === "left" ? P = _ + Math.max(c, p) + a : r === "right" ? P = _ + b - Math.max(d, g) - a : P = this.caretX, o === "top" ? (A = v, O = A - a, M = P - a, S = P + a) : (A = v + x, O = A + a, M = P + a, S = P - a), T = A), {
      x1: M,
      x2: P,
      x3: S,
      y1: A,
      y2: O,
      y3: T
    };
  }
  drawTitle(t, e, s) {
    const r = this.title, o = r.length;
    let a, h, c;
    if (o) {
      const d = Ai(s.rtl, this.x, this.width);
      for (t.x = us(this, s.titleAlign, s), e.textAlign = d.textAlign(s.titleAlign), e.textBaseline = "middle", a = Dt(s.titleFont), h = s.titleSpacing, e.fillStyle = s.titleColor, e.font = a.string, c = 0; c < o; ++c)
        e.fillText(r[c], d.x(t.x), t.y + a.lineHeight / 2), t.y += a.lineHeight + h, c + 1 === o && (t.y += s.titleMarginBottom - h);
    }
  }
  _drawColorBox(t, e, s, r, o) {
    const a = this.labelColors[s], h = this.labelPointStyles[s], { boxHeight: c, boxWidth: d } = o, p = Dt(o.bodyFont), g = us(this, "left", o), _ = r.x(g), v = c < p.lineHeight ? (p.lineHeight - c) / 2 : 0, b = e.y + v;
    if (o.usePointStyle) {
      const x = {
        radius: Math.min(d, c) / 2,
        pointStyle: h.pointStyle,
        rotation: h.rotation,
        borderWidth: 1
      }, M = r.leftForLtr(_, d) + d / 2, P = b + c / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, Co(t, x, M, P), t.strokeStyle = a.borderColor, t.fillStyle = a.backgroundColor, Co(t, x, M, P);
    } else {
      t.lineWidth = nt(a.borderWidth) ? Math.max(...Object.values(a.borderWidth)) : a.borderWidth || 1, t.strokeStyle = a.borderColor, t.setLineDash(a.borderDash || []), t.lineDashOffset = a.borderDashOffset || 0;
      const x = r.leftForLtr(_, d), M = r.leftForLtr(r.xPlus(_, 1), d - 2), P = li(a.borderRadius);
      Object.values(P).some((S) => S !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, yn(t, {
        x,
        y: b,
        w: d,
        h: c,
        radius: P
      }), t.fill(), t.stroke(), t.fillStyle = a.backgroundColor, t.beginPath(), yn(t, {
        x: M,
        y: b + 1,
        w: d - 2,
        h: c - 2,
        radius: P
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(x, b, d, c), t.strokeRect(x, b, d, c), t.fillStyle = a.backgroundColor, t.fillRect(M, b + 1, d - 2, c - 2));
    }
    t.fillStyle = this.labelTextColors[s];
  }
  drawBody(t, e, s) {
    const { body: r } = this, { bodySpacing: o, bodyAlign: a, displayColors: h, boxHeight: c, boxWidth: d, boxPadding: p } = s, g = Dt(s.bodyFont);
    let _ = g.lineHeight, v = 0;
    const b = Ai(s.rtl, this.x, this.width), x = function(B) {
      e.fillText(B, b.x(t.x + v), t.y + _ / 2), t.y += _ + o;
    }, M = b.textAlign(a);
    let P, S, A, O, T, I, D;
    for (e.textAlign = a, e.textBaseline = "middle", e.font = g.string, t.x = us(this, M, s), e.fillStyle = s.bodyColor, ft(this.beforeBody, x), v = h && M !== "right" ? a === "center" ? d / 2 + p : d + 2 + p : 0, O = 0, I = r.length; O < I; ++O) {
      for (P = r[O], S = this.labelTextColors[O], e.fillStyle = S, ft(P.before, x), A = P.lines, h && A.length && (this._drawColorBox(e, t, O, b, s), _ = Math.max(g.lineHeight, c)), T = 0, D = A.length; T < D; ++T)
        x(A[T]), _ = g.lineHeight;
      ft(P.after, x);
    }
    v = 0, _ = g.lineHeight, ft(this.afterBody, x), t.y -= o;
  }
  drawFooter(t, e, s) {
    const r = this.footer, o = r.length;
    let a, h;
    if (o) {
      const c = Ai(s.rtl, this.x, this.width);
      for (t.x = us(this, s.footerAlign, s), t.y += s.footerMarginTop, e.textAlign = c.textAlign(s.footerAlign), e.textBaseline = "middle", a = Dt(s.footerFont), e.fillStyle = s.footerColor, e.font = a.string, h = 0; h < o; ++h)
        e.fillText(r[h], c.x(t.x), t.y + a.lineHeight / 2), t.y += a.lineHeight + s.footerSpacing;
    }
  }
  drawBackground(t, e, s, r) {
    const { xAlign: o, yAlign: a } = this, { x: h, y: c } = t, { width: d, height: p } = s, { topLeft: g, topRight: _, bottomLeft: v, bottomRight: b } = li(r.cornerRadius);
    e.fillStyle = r.backgroundColor, e.strokeStyle = r.borderColor, e.lineWidth = r.borderWidth, e.beginPath(), e.moveTo(h + g, c), a === "top" && this.drawCaret(t, e, s, r), e.lineTo(h + d - _, c), e.quadraticCurveTo(h + d, c, h + d, c + _), a === "center" && o === "right" && this.drawCaret(t, e, s, r), e.lineTo(h + d, c + p - b), e.quadraticCurveTo(h + d, c + p, h + d - b, c + p), a === "bottom" && this.drawCaret(t, e, s, r), e.lineTo(h + v, c + p), e.quadraticCurveTo(h, c + p, h, c + p - v), a === "center" && o === "left" && this.drawCaret(t, e, s, r), e.lineTo(h, c + g), e.quadraticCurveTo(h, c, h + g, c), e.closePath(), e.fill(), r.borderWidth > 0 && e.stroke();
  }
  _updateAnimationTarget(t) {
    const e = this.chart, s = this.$animations, r = s && s.x, o = s && s.y;
    if (r || o) {
      const a = ln[t.position].call(this, this._active, this._eventPosition);
      if (!a)
        return;
      const h = this._size = al(this, t), c = Object.assign({}, a, this._size), d = ll(e, t, c), p = hl(t, c, d, e);
      (r._to !== p.x || o._to !== p.y) && (this.xAlign = d.xAlign, this.yAlign = d.yAlign, this.width = h.width, this.height = h.height, this.caretX = a.x, this.caretY = a.y, this._resolveAnimations().update(this, p));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const e = this.options.setContext(this.getContext());
    let s = this.opacity;
    if (!s)
      return;
    this._updateAnimationTarget(e);
    const r = {
      width: this.width,
      height: this.height
    }, o = {
      x: this.x,
      y: this.y
    };
    s = Math.abs(s) < 1e-3 ? 0 : s;
    const a = Wt(e.padding), h = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    e.enabled && h && (t.save(), t.globalAlpha = s, this.drawBackground(o, t, r, e), Xl(t, e.textDirection), o.y += a.top, this.drawTitle(o, t, e), this.drawBody(o, t, e), this.drawFooter(o, t, e), Kl(t, e.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, e) {
    const s = this._active, r = t.map(({ datasetIndex: h, index: c }) => {
      const d = this.chart.getDatasetMeta(h);
      if (!d)
        throw new Error("Cannot find a dataset at index " + h);
      return {
        datasetIndex: h,
        element: d.data[c],
        index: c
      };
    }), o = !Ms(s, r), a = this._positionChanged(r, e);
    (o || a) && (this._active = r, this._eventPosition = e, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, e, s = !0) {
    if (e && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const r = this.options, o = this._active || [], a = this._getActiveElements(t, o, e, s), h = this._positionChanged(a, t), c = e || !Ms(a, o) || h;
    return c && (this._active = a, (r.enabled || r.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, e))), c;
  }
  _getActiveElements(t, e, s, r) {
    const o = this.options;
    if (t.type === "mouseout")
      return [];
    if (!r)
      return e.filter((h) => this.chart.data.datasets[h.datasetIndex] && this.chart.getDatasetMeta(h.datasetIndex).controller.getParsed(h.index) !== void 0);
    const a = this.chart.getElementsAtEventForMode(t, o.mode, o, s);
    return o.reverse && a.reverse(), a;
  }
  _positionChanged(t, e) {
    const { caretX: s, caretY: r, options: o } = this, a = ln[o.position].call(this, t, e);
    return a !== !1 && (s !== a.x || r !== a.y);
  }
}
z(zo, "positioners", ln);
var fg = {
  id: "tooltip",
  _element: zo,
  positioners: ln,
  afterInit(n, t, e) {
    e && (n.tooltip = new zo({
      chart: n,
      options: e
    }));
  },
  beforeUpdate(n, t, e) {
    n.tooltip && n.tooltip.initialize(e);
  },
  reset(n, t, e) {
    n.tooltip && n.tooltip.initialize(e);
  },
  afterDraw(n) {
    const t = n.tooltip;
    if (t && t._willRender()) {
      const e = {
        tooltip: t
      };
      if (n.notifyPlugins("beforeTooltipDraw", {
        ...e,
        cancelable: !0
      }) === !1)
        return;
      t.draw(n.ctx), n.notifyPlugins("afterTooltipDraw", e);
    }
  },
  afterEvent(n, t) {
    if (n.tooltip) {
      const e = t.replay;
      n.tooltip.handleEvent(t.event, e, t.inChartArea) && (t.changed = !0);
    }
  },
  defaults: {
    enabled: !0,
    external: null,
    position: "average",
    backgroundColor: "rgba(0,0,0,0.8)",
    titleColor: "#fff",
    titleFont: {
      weight: "bold"
    },
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
    footerFont: {
      weight: "bold"
    },
    footerAlign: "left",
    padding: 6,
    caretPadding: 2,
    caretSize: 5,
    cornerRadius: 6,
    boxHeight: (n, t) => t.bodyFont.size,
    boxWidth: (n, t) => t.bodyFont.size,
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
    callbacks: xh
  },
  defaultRoutes: {
    bodyFont: "font",
    footerFont: "font",
    titleFont: "font"
  },
  descriptors: {
    _scriptable: (n) => n !== "filter" && n !== "itemSort" && n !== "external",
    _indexable: !1,
    callbacks: {
      _scriptable: !1,
      _indexable: !1
    },
    animation: {
      _fallback: !1
    },
    animations: {
      _fallback: "animation"
    }
  },
  additionalOptionScopes: [
    "interaction"
  ]
}, pg = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Colors: kp,
  Decimation: Ap,
  Filler: Kp,
  Legend: ig,
  SubTitle: og,
  Title: sg,
  Tooltip: fg
});
const gg = (n, t, e, s) => (typeof t == "string" ? (e = n.push(t) - 1, s.unshift({
  index: e,
  label: t
})) : isNaN(t) && (e = null), e);
function mg(n, t, e, s) {
  const r = n.indexOf(t);
  if (r === -1)
    return gg(n, t, e, s);
  const o = n.lastIndexOf(t);
  return r !== o ? e : r;
}
const _g = (n, t) => n === null ? null : Rt(Math.round(n), 0, t);
function dl(n) {
  const t = this.getLabels();
  return n >= 0 && n < t.length ? t[n] : n;
}
class Bo extends di {
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const e = this._addedLabels;
    if (e.length) {
      const s = this.getLabels();
      for (const { index: r, label: o } of e)
        s[r] === o && s.splice(r, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, e) {
    if (rt(t))
      return null;
    const s = this.getLabels();
    return e = isFinite(e) && s[e] === t ? e : mg(s, t, X(e, t), this._addedLabels), _g(e, s.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: e } = this.getUserBounds();
    let { min: s, max: r } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (s = 0), e || (r = this.getLabels().length - 1)), this.min = s, this.max = r;
  }
  buildTicks() {
    const t = this.min, e = this.max, s = this.options.offset, r = [];
    let o = this.getLabels();
    o = t === 0 && e === o.length - 1 ? o : o.slice(t, e + 1), this._valueRange = Math.max(o.length - (s ? 0 : 1), 1), this._startValue = this.min - (s ? 0.5 : 0);
    for (let a = t; a <= e; a++)
      r.push({
        value: a
      });
    return r;
  }
  getLabelForValue(t) {
    return dl.call(this, t);
  }
  configure() {
    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(t) {
    return typeof t != "number" && (t = this.parse(t)), t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getPixelForTick(t) {
    const e = this.ticks;
    return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
  }
  getValueForPixel(t) {
    return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
}
z(Bo, "id", "category"), z(Bo, "defaults", {
  ticks: {
    callback: dl
  }
});
function vg(n, t) {
  const e = [], { bounds: r, step: o, min: a, max: h, precision: c, count: d, maxTicks: p, maxDigits: g, includeBounds: _ } = n, v = o || 1, b = p - 1, { min: x, max: M } = t, P = !rt(a), S = !rt(h), A = !rt(d), O = (M - x) / (g + 1);
  let T = aa((M - x) / b / v) * v, I, D, B, N;
  if (T < 1e-14 && !P && !S)
    return [
      {
        value: x
      },
      {
        value: M
      }
    ];
  N = Math.ceil(M / T) - Math.floor(x / T), N > b && (T = aa(N * T / b / v) * v), rt(c) || (I = Math.pow(10, c), T = Math.ceil(T * I) / I), r === "ticks" ? (D = Math.floor(x / T) * T, B = Math.ceil(M / T) * T) : (D = x, B = M), P && S && o && cu((h - a) / o, T / 1e3) ? (N = Math.round(Math.min((h - a) / T, p)), T = (h - a) / N, D = a, B = h) : A ? (D = P ? a : D, B = S ? h : B, N = d - 1, T = (B - D) / N) : (N = (B - D) / T, un(N, Math.round(N), T / 1e3) ? N = Math.round(N) : N = Math.ceil(N));
  const Y = Math.max(la(T), la(D));
  I = Math.pow(10, rt(c) ? Y : c), D = Math.round(D * I) / I, B = Math.round(B * I) / I;
  let Z = 0;
  for (P && (_ && D !== a ? (e.push({
    value: a
  }), D < a && Z++, un(Math.round((D + Z * T) * I) / I, a, fl(a, O, n)) && Z++) : D < a && Z++); Z < N; ++Z) {
    const V = Math.round((D + Z * T) * I) / I;
    if (S && V > h)
      break;
    e.push({
      value: V
    });
  }
  return S && _ && B !== h ? e.length && un(e[e.length - 1].value, h, fl(h, O, n)) ? e[e.length - 1].value = h : e.push({
    value: h
  }) : (!S || B === h) && e.push({
    value: B
  }), e;
}
function fl(n, t, { horizontal: e, minRotation: s }) {
  const r = ae(s), o = (e ? Math.sin(r) : Math.cos(r)) || 1e-3, a = 0.75 * t * ("" + n).length;
  return Math.min(t / o, a);
}
class Os extends di {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, e) {
    return rt(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: e, maxDefined: s } = this.getUserBounds();
    let { min: r, max: o } = this;
    const a = (c) => r = e ? r : c, h = (c) => o = s ? o : c;
    if (t) {
      const c = _e(r), d = _e(o);
      c < 0 && d < 0 ? h(0) : c > 0 && d > 0 && a(0);
    }
    if (r === o) {
      let c = o === 0 ? 1 : Math.abs(o * 0.05);
      h(o + c), t || a(r - c);
    }
    this.min = r, this.max = o;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: e, stepSize: s } = t, r;
    return s ? (r = Math.ceil(this.max / s) - Math.floor(this.min / s) + 1, r > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${r} ticks. Limiting to 1000.`), r = 1e3)) : (r = this.computeTickLimit(), e = e || 11), e && (r = Math.min(e, r)), r;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, e = t.ticks;
    let s = this.getTickLimit();
    s = Math.max(2, s);
    const r = {
      maxTicks: s,
      bounds: t.bounds,
      min: t.min,
      max: t.max,
      precision: e.precision,
      step: e.stepSize,
      count: e.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: e.minRotation || 0,
      includeBounds: e.includeBounds !== !1
    }, o = this._range || this, a = vg(r, o);
    return t.bounds === "ticks" && El(a, this, "value"), t.reverse ? (a.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), a;
  }
  configure() {
    const t = this.ticks;
    let e = this.min, s = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const r = (s - e) / Math.max(t.length - 1, 1) / 2;
      e -= r, s += r;
    }
    this._startValue = e, this._endValue = s, this._valueRange = s - e;
  }
  getLabelForValue(t) {
    return Mn(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Ro extends Os {
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!0);
    this.min = St(t) ? t : 0, this.max = St(e) ? e : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), e = t ? this.width : this.height, s = ae(this.options.ticks.minRotation), r = (t ? Math.sin(s) : Math.cos(s)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(e / Math.min(40, o.lineHeight / r));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
z(Ro, "id", "linear"), z(Ro, "defaults", {
  ticks: {
    callback: Es.formatters.numeric
  }
});
const xn = (n) => Math.floor(Be(n)), si = (n, t) => Math.pow(10, xn(n) + t);
function pl(n) {
  return n / Math.pow(10, xn(n)) === 1;
}
function gl(n, t, e) {
  const s = Math.pow(10, e), r = Math.floor(n / s);
  return Math.ceil(t / s) - r;
}
function yg(n, t) {
  const e = t - n;
  let s = xn(e);
  for (; gl(n, t, s) > 10; )
    s++;
  for (; gl(n, t, s) < 10; )
    s--;
  return Math.min(s, xn(n));
}
function bg(n, { min: t, max: e }) {
  t = Xt(n.min, t);
  const s = [], r = xn(t);
  let o = yg(t, e), a = o < 0 ? Math.pow(10, Math.abs(o)) : 1;
  const h = Math.pow(10, o), c = r > o ? Math.pow(10, r) : 0, d = Math.round((t - c) * a) / a, p = Math.floor((t - c) / h / 10) * h * 10;
  let g = Math.floor((d - p) / Math.pow(10, o)), _ = Xt(n.min, Math.round((c + p + g * Math.pow(10, o)) * a) / a);
  for (; _ < e; )
    s.push({
      value: _,
      major: pl(_),
      significand: g
    }), g >= 10 ? g = g < 15 ? 15 : 20 : g++, g >= 20 && (o++, g = 2, a = o >= 0 ? 1 : a), _ = Math.round((c + p + g * Math.pow(10, o)) * a) / a;
  const v = Xt(n.max, _);
  return s.push({
    value: v,
    major: pl(v),
    significand: g
  }), s;
}
class Fo extends di {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._valueRange = 0;
  }
  parse(t, e) {
    const s = Os.prototype.parse.apply(this, [
      t,
      e
    ]);
    if (s === 0) {
      this._zero = !0;
      return;
    }
    return St(s) && s > 0 ? s : null;
  }
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!0);
    this.min = St(t) ? Math.max(0, t) : null, this.max = St(e) ? Math.max(0, e) : null, this.options.beginAtZero && (this._zero = !0), this._zero && this.min !== this._suggestedMin && !St(this._userMin) && (this.min = t === si(this.min, 0) ? si(this.min, -1) : si(this.min, 0)), this.handleTickRangeOptions();
  }
  handleTickRangeOptions() {
    const { minDefined: t, maxDefined: e } = this.getUserBounds();
    let s = this.min, r = this.max;
    const o = (h) => s = t ? s : h, a = (h) => r = e ? r : h;
    s === r && (s <= 0 ? (o(1), a(10)) : (o(si(s, -1)), a(si(r, 1)))), s <= 0 && o(si(r, -1)), r <= 0 && a(si(s, 1)), this.min = s, this.max = r;
  }
  buildTicks() {
    const t = this.options, e = {
      min: this._userMin,
      max: this._userMax
    }, s = bg(e, this);
    return t.bounds === "ticks" && El(s, this, "value"), t.reverse ? (s.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), s;
  }
  getLabelForValue(t) {
    return t === void 0 ? "0" : Mn(t, this.chart.options.locale, this.options.ticks.format);
  }
  configure() {
    const t = this.min;
    super.configure(), this._startValue = Be(t), this._valueRange = Be(this.max) - Be(t);
  }
  getPixelForValue(t) {
    return (t === void 0 || t === 0) && (t = this.min), t === null || isNaN(t) ? NaN : this.getPixelForDecimal(t === this.min ? 0 : (Be(t) - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    const e = this.getDecimalForPixel(t);
    return Math.pow(10, this._startValue + e * this._valueRange);
  }
}
z(Fo, "id", "logarithmic"), z(Fo, "defaults", {
  ticks: {
    callback: Es.formatters.logarithmic,
    major: {
      enabled: !0
    }
  }
});
function No(n) {
  const t = n.ticks;
  if (t.display && n.display) {
    const e = Wt(t.backdropPadding);
    return X(t.font && t.font.size, Lt.font.size) + e.height;
  }
  return 0;
}
function xg(n, t, e) {
  return e = vt(e) ? e : [
    e
  ], {
    w: Su(n, t.string, e),
    h: e.length * t.lineHeight
  };
}
function ml(n, t, e, s, r) {
  return n === s || n === r ? {
    start: t - e / 2,
    end: t + e / 2
  } : n < s || n > r ? {
    start: t - e,
    end: t
  } : {
    start: t,
    end: t + e
  };
}
function wg(n) {
  const t = {
    l: n.left + n._padding.left,
    r: n.right - n._padding.right,
    t: n.top + n._padding.top,
    b: n.bottom - n._padding.bottom
  }, e = Object.assign({}, t), s = [], r = [], o = n._pointLabels.length, a = n.options.pointLabels, h = a.centerPointLabels ? bt / o : 0;
  for (let c = 0; c < o; c++) {
    const d = a.setContext(n.getPointLabelContext(c));
    r[c] = d.padding;
    const p = n.getPointPosition(c, n.drawingArea + r[c], h), g = Dt(d.font), _ = xg(n.ctx, g, n._pointLabels[c]);
    s[c] = _;
    const v = Jt(n.getIndexAngle(c) + h), b = Math.round(Uo(v)), x = ml(b, p.x, _.w, 0, 180), M = ml(b, p.y, _.h, 90, 270);
    Lg(e, t, v, x, M);
  }
  n.setCenterPoint(t.l - e.l, e.r - t.r, t.t - e.t, e.b - t.b), n._pointLabelItems = kg(n, s, r);
}
function Lg(n, t, e, s, r) {
  const o = Math.abs(Math.sin(e)), a = Math.abs(Math.cos(e));
  let h = 0, c = 0;
  s.start < t.l ? (h = (t.l - s.start) / o, n.l = Math.min(n.l, t.l - h)) : s.end > t.r && (h = (s.end - t.r) / o, n.r = Math.max(n.r, t.r + h)), r.start < t.t ? (c = (t.t - r.start) / a, n.t = Math.min(n.t, t.t - c)) : r.end > t.b && (c = (r.end - t.b) / a, n.b = Math.max(n.b, t.b + c));
}
function Mg(n, t, e) {
  const s = n.drawingArea, { extra: r, additionalAngle: o, padding: a, size: h } = e, c = n.getPointPosition(t, s + r + a, o), d = Math.round(Uo(Jt(c.angle + At))), p = Tg(c.y, h.h, d), g = Sg(d), _ = Cg(c.x, h.w, g);
  return {
    visible: !0,
    x: c.x,
    y: p,
    textAlign: g,
    left: _,
    top: p,
    right: _ + h.w,
    bottom: p + h.h
  };
}
function Pg(n, t) {
  if (!t)
    return !0;
  const { left: e, top: s, right: r, bottom: o } = n;
  return !(Ae({
    x: e,
    y: s
  }, t) || Ae({
    x: e,
    y: o
  }, t) || Ae({
    x: r,
    y: s
  }, t) || Ae({
    x: r,
    y: o
  }, t));
}
function kg(n, t, e) {
  const s = [], r = n._pointLabels.length, o = n.options, { centerPointLabels: a, display: h } = o.pointLabels, c = {
    extra: No(o) / 2,
    additionalAngle: a ? bt / r : 0
  };
  let d;
  for (let p = 0; p < r; p++) {
    c.padding = e[p], c.size = t[p];
    const g = Mg(n, p, c);
    s.push(g), h === "auto" && (g.visible = Pg(g, d), g.visible && (d = g));
  }
  return s;
}
function Sg(n) {
  return n === 0 || n === 180 ? "center" : n < 180 ? "left" : "right";
}
function Cg(n, t, e) {
  return e === "right" ? n -= t : e === "center" && (n -= t / 2), n;
}
function Tg(n, t, e) {
  return e === 90 || e === 270 ? n -= t / 2 : (e > 270 || e < 90) && (n -= t), n;
}
function Ag(n, t, e) {
  const { left: s, top: r, right: o, bottom: a } = e, { backdropColor: h } = t;
  if (!rt(h)) {
    const c = li(t.borderRadius), d = Wt(t.backdropPadding);
    n.fillStyle = h;
    const p = s - d.left, g = r - d.top, _ = o - s + d.width, v = a - r + d.height;
    Object.values(c).some((b) => b !== 0) ? (n.beginPath(), yn(n, {
      x: p,
      y: g,
      w: _,
      h: v,
      radius: c
    }), n.fill()) : n.fillRect(p, g, _, v);
  }
}
function Og(n, t) {
  const { ctx: e, options: { pointLabels: s } } = n;
  for (let r = t - 1; r >= 0; r--) {
    const o = n._pointLabelItems[r];
    if (!o.visible)
      continue;
    const a = s.setContext(n.getPointLabelContext(r));
    Ag(e, a, o);
    const h = Dt(a.font), { x: c, y: d, textAlign: p } = o;
    ui(e, n._pointLabels[r], c, d + h.lineHeight / 2, h, {
      color: a.color,
      textAlign: p,
      textBaseline: "middle"
    });
  }
}
function wh(n, t, e, s) {
  const { ctx: r } = n;
  if (e)
    r.arc(n.xCenter, n.yCenter, t, 0, yt);
  else {
    let o = n.getPointPosition(0, t);
    r.moveTo(o.x, o.y);
    for (let a = 1; a < s; a++)
      o = n.getPointPosition(a, t), r.lineTo(o.x, o.y);
  }
}
function Eg(n, t, e, s, r) {
  const o = n.ctx, a = t.circular, { color: h, lineWidth: c } = t;
  !a && !s || !h || !c || e < 0 || (o.save(), o.strokeStyle = h, o.lineWidth = c, o.setLineDash(r.dash || []), o.lineDashOffset = r.dashOffset, o.beginPath(), wh(n, e, a, s), o.closePath(), o.stroke(), o.restore());
}
function Ig(n, t, e) {
  return We(n, {
    label: e,
    index: t,
    type: "pointLabel"
  });
}
class hn extends Os {
  constructor(t) {
    super(t), this.xCenter = void 0, this.yCenter = void 0, this.drawingArea = void 0, this._pointLabels = [], this._pointLabelItems = [];
  }
  setDimensions() {
    const t = this._padding = Wt(No(this.options) / 2), e = this.width = this.maxWidth - t.width, s = this.height = this.maxHeight - t.height;
    this.xCenter = Math.floor(this.left + e / 2 + t.left), this.yCenter = Math.floor(this.top + s / 2 + t.top), this.drawingArea = Math.floor(Math.min(e, s) / 2);
  }
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!1);
    this.min = St(t) && !isNaN(t) ? t : 0, this.max = St(e) && !isNaN(e) ? e : 0, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    return Math.ceil(this.drawingArea / No(this.options));
  }
  generateTickLabels(t) {
    Os.prototype.generateTickLabels.call(this, t), this._pointLabels = this.getLabels().map((e, s) => {
      const r = mt(this.options.pointLabels.callback, [
        e,
        s
      ], this);
      return r || r === 0 ? r : "";
    }).filter((e, s) => this.chart.getDataVisibility(s));
  }
  fit() {
    const t = this.options;
    t.display && t.pointLabels.display ? wg(this) : this.setCenterPoint(0, 0, 0, 0);
  }
  setCenterPoint(t, e, s, r) {
    this.xCenter += Math.floor((t - e) / 2), this.yCenter += Math.floor((s - r) / 2), this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(t, e, s, r));
  }
  getIndexAngle(t) {
    const e = yt / (this._pointLabels.length || 1), s = this.options.startAngle || 0;
    return Jt(t * e + ae(s));
  }
  getDistanceFromCenterForValue(t) {
    if (rt(t))
      return NaN;
    const e = this.drawingArea / (this.max - this.min);
    return this.options.reverse ? (this.max - t) * e : (t - this.min) * e;
  }
  getValueForDistanceFromCenter(t) {
    if (rt(t))
      return NaN;
    const e = t / (this.drawingArea / (this.max - this.min));
    return this.options.reverse ? this.max - e : this.min + e;
  }
  getPointLabelContext(t) {
    const e = this._pointLabels || [];
    if (t >= 0 && t < e.length) {
      const s = e[t];
      return Ig(this.getContext(), t, s);
    }
  }
  getPointPosition(t, e, s = 0) {
    const r = this.getIndexAngle(t) - At + s;
    return {
      x: Math.cos(r) * e + this.xCenter,
      y: Math.sin(r) * e + this.yCenter,
      angle: r
    };
  }
  getPointPositionForValue(t, e) {
    return this.getPointPosition(t, this.getDistanceFromCenterForValue(e));
  }
  getBasePosition(t) {
    return this.getPointPositionForValue(t || 0, this.getBaseValue());
  }
  getPointLabelPosition(t) {
    const { left: e, top: s, right: r, bottom: o } = this._pointLabelItems[t];
    return {
      left: e,
      top: s,
      right: r,
      bottom: o
    };
  }
  drawBackground() {
    const { backgroundColor: t, grid: { circular: e } } = this.options;
    if (t) {
      const s = this.ctx;
      s.save(), s.beginPath(), wh(this, this.getDistanceFromCenterForValue(this._endValue), e, this._pointLabels.length), s.closePath(), s.fillStyle = t, s.fill(), s.restore();
    }
  }
  drawGrid() {
    const t = this.ctx, e = this.options, { angleLines: s, grid: r, border: o } = e, a = this._pointLabels.length;
    let h, c, d;
    if (e.pointLabels.display && Og(this, a), r.display && this.ticks.forEach((p, g) => {
      if (g !== 0 || g === 0 && this.min < 0) {
        c = this.getDistanceFromCenterForValue(p.value);
        const _ = this.getContext(g), v = r.setContext(_), b = o.setContext(_);
        Eg(this, v, c, a, b);
      }
    }), s.display) {
      for (t.save(), h = a - 1; h >= 0; h--) {
        const p = s.setContext(this.getPointLabelContext(h)), { color: g, lineWidth: _ } = p;
        !_ || !g || (t.lineWidth = _, t.strokeStyle = g, t.setLineDash(p.borderDash), t.lineDashOffset = p.borderDashOffset, c = this.getDistanceFromCenterForValue(e.reverse ? this.min : this.max), d = this.getPointPosition(h, c), t.beginPath(), t.moveTo(this.xCenter, this.yCenter), t.lineTo(d.x, d.y), t.stroke());
      }
      t.restore();
    }
  }
  drawBorder() {
  }
  drawLabels() {
    const t = this.ctx, e = this.options, s = e.ticks;
    if (!s.display)
      return;
    const r = this.getIndexAngle(0);
    let o, a;
    t.save(), t.translate(this.xCenter, this.yCenter), t.rotate(r), t.textAlign = "center", t.textBaseline = "middle", this.ticks.forEach((h, c) => {
      if (c === 0 && this.min >= 0 && !e.reverse)
        return;
      const d = s.setContext(this.getContext(c)), p = Dt(d.font);
      if (o = this.getDistanceFromCenterForValue(this.ticks[c].value), d.showLabelBackdrop) {
        t.font = p.string, a = t.measureText(h.label).width, t.fillStyle = d.backdropColor;
        const g = Wt(d.backdropPadding);
        t.fillRect(-a / 2 - g.left, -o - p.size / 2 - g.top, a + g.width, p.size + g.height);
      }
      ui(t, h.label, 0, -o, p, {
        color: d.color,
        strokeColor: d.textStrokeColor,
        strokeWidth: d.textStrokeWidth
      });
    }), t.restore();
  }
  drawTitle() {
  }
}
z(hn, "id", "radialLinear"), z(hn, "defaults", {
  display: !0,
  animate: !0,
  position: "chartArea",
  angleLines: {
    display: !0,
    lineWidth: 1,
    borderDash: [],
    borderDashOffset: 0
  },
  grid: {
    circular: !1
  },
  startAngle: 0,
  ticks: {
    showLabelBackdrop: !0,
    callback: Es.formatters.numeric
  },
  pointLabels: {
    backdropColor: void 0,
    backdropPadding: 2,
    display: !0,
    font: {
      size: 10
    },
    callback(t) {
      return t;
    },
    padding: 5,
    centerPointLabels: !1
  }
}), z(hn, "defaultRoutes", {
  "angleLines.color": "borderColor",
  "pointLabels.color": "color",
  "ticks.color": "color"
}), z(hn, "descriptors", {
  angleLines: {
    _fallback: "grid"
  }
});
const Bs = {
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
}, Yt = /* @__PURE__ */ Object.keys(Bs);
function _l(n, t) {
  return n - t;
}
function vl(n, t) {
  if (rt(t))
    return null;
  const e = n._adapter, { parser: s, round: r, isoWeekday: o } = n._parseOpts;
  let a = t;
  return typeof s == "function" && (a = s(a)), St(a) || (a = typeof s == "string" ? e.parse(a, s) : e.parse(a)), a === null ? null : (r && (a = r === "week" && (Oi(o) || o === !0) ? e.startOf(a, "isoWeek", o) : e.startOf(a, r)), +a);
}
function yl(n, t, e, s) {
  const r = Yt.length;
  for (let o = Yt.indexOf(n); o < r - 1; ++o) {
    const a = Bs[Yt[o]], h = a.steps ? a.steps : Number.MAX_SAFE_INTEGER;
    if (a.common && Math.ceil((e - t) / (h * a.size)) <= s)
      return Yt[o];
  }
  return Yt[r - 1];
}
function Dg(n, t, e, s, r) {
  for (let o = Yt.length - 1; o >= Yt.indexOf(e); o--) {
    const a = Yt[o];
    if (Bs[a].common && n._adapter.diff(r, s, a) >= t - 1)
      return a;
  }
  return Yt[e ? Yt.indexOf(e) : 0];
}
function zg(n) {
  for (let t = Yt.indexOf(n) + 1, e = Yt.length; t < e; ++t)
    if (Bs[Yt[t]].common)
      return Yt[t];
}
function bl(n, t, e) {
  if (!e)
    n[t] = !0;
  else if (e.length) {
    const { lo: s, hi: r } = Go(e, t), o = e[s] >= t ? e[s] : e[r];
    n[o] = !0;
  }
}
function Bg(n, t, e, s) {
  const r = n._adapter, o = +r.startOf(t[0].value, s), a = t[t.length - 1].value;
  let h, c;
  for (h = o; h <= a; h = +r.add(h, 1, s))
    c = e[h], c >= 0 && (t[c].major = !0);
  return t;
}
function xl(n, t, e) {
  const s = [], r = {}, o = t.length;
  let a, h;
  for (a = 0; a < o; ++a)
    h = t[a], r[h] = a, s.push({
      value: h,
      major: !1
    });
  return o === 0 || !e ? s : Bg(n, s, r, e);
}
class wn extends di {
  constructor(t) {
    super(t), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(t, e = {}) {
    const s = t.time || (t.time = {}), r = this._adapter = new Vd._date(t.adapters.date);
    r.init(e), cn(s.displayFormats, r.formats()), this._parseOpts = {
      parser: s.parser,
      round: s.round,
      isoWeekday: s.isoWeekday
    }, super.init(t), this._normalized = e.normalized;
  }
  parse(t, e) {
    return t === void 0 ? null : vl(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const t = this.options, e = this._adapter, s = t.time.unit || "day";
    let { min: r, max: o, minDefined: a, maxDefined: h } = this.getUserBounds();
    function c(d) {
      !a && !isNaN(d.min) && (r = Math.min(r, d.min)), !h && !isNaN(d.max) && (o = Math.max(o, d.max));
    }
    (!a || !h) && (c(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && c(this.getMinMax(!1))), r = St(r) && !isNaN(r) ? r : +e.startOf(Date.now(), s), o = St(o) && !isNaN(o) ? o : +e.endOf(Date.now(), s) + 1, this.min = Math.min(r, o - 1), this.max = Math.max(r + 1, o);
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let e = Number.POSITIVE_INFINITY, s = Number.NEGATIVE_INFINITY;
    return t.length && (e = t[0], s = t[t.length - 1]), {
      min: e,
      max: s
    };
  }
  buildTicks() {
    const t = this.options, e = t.time, s = t.ticks, r = s.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && r.length && (this.min = this._userMin || r[0], this.max = this._userMax || r[r.length - 1]);
    const o = this.min, a = this.max, h = pu(r, o, a);
    return this._unit = e.unit || (s.autoSkip ? yl(e.minUnit, this.min, this.max, this._getLabelCapacity(o)) : Dg(this, h.length, e.minUnit, this.min, this.max)), this._majorUnit = !s.major.enabled || this._unit === "year" ? void 0 : zg(this._unit), this.initOffsets(r), t.reverse && h.reverse(), xl(this, h, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let e = 0, s = 0, r, o;
    this.options.offset && t.length && (r = this.getDecimalForValue(t[0]), t.length === 1 ? e = 1 - r : e = (this.getDecimalForValue(t[1]) - r) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? s = o : s = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const a = t.length < 3 ? 0.5 : 0.25;
    e = Rt(e, 0, a), s = Rt(s, 0, a), this._offsets = {
      start: e,
      end: s,
      factor: 1 / (e + 1 + s)
    };
  }
  _generate() {
    const t = this._adapter, e = this.min, s = this.max, r = this.options, o = r.time, a = o.unit || yl(o.minUnit, e, s, this._getLabelCapacity(e)), h = X(r.ticks.stepSize, 1), c = a === "week" ? o.isoWeekday : !1, d = Oi(c) || c === !0, p = {};
    let g = e, _, v;
    if (d && (g = +t.startOf(g, "isoWeek", c)), g = +t.startOf(g, d ? "day" : a), t.diff(s, e, a) > 1e5 * h)
      throw new Error(e + " and " + s + " are too far apart with stepSize of " + h + " " + a);
    const b = r.ticks.source === "data" && this.getDataTimestamps();
    for (_ = g, v = 0; _ < s; _ = +t.add(_, h, a), v++)
      bl(p, _, b);
    return (_ === s || r.bounds === "ticks" || v === 1) && bl(p, _, b), Object.keys(p).sort(_l).map((x) => +x);
  }
  getLabelForValue(t) {
    const e = this._adapter, s = this.options.time;
    return s.tooltipFormat ? e.format(t, s.tooltipFormat) : e.format(t, s.displayFormats.datetime);
  }
  format(t, e) {
    const r = this.options.time.displayFormats, o = this._unit, a = e || r[o];
    return this._adapter.format(t, a);
  }
  _tickFormatFunction(t, e, s, r) {
    const o = this.options, a = o.ticks.callback;
    if (a)
      return mt(a, [
        t,
        e,
        s
      ], this);
    const h = o.time.displayFormats, c = this._unit, d = this._majorUnit, p = c && h[c], g = d && h[d], _ = s[e], v = d && g && _ && _.major;
    return this._adapter.format(t, r || (v ? g : p));
  }
  generateTickLabels(t) {
    let e, s, r;
    for (e = 0, s = t.length; e < s; ++e)
      r = t[e], r.label = this._tickFormatFunction(r.value, e, t);
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const e = this._offsets, s = this.getDecimalForValue(t);
    return this.getPixelForDecimal((e.start + s) * e.factor);
  }
  getValueForPixel(t) {
    const e = this._offsets, s = this.getDecimalForPixel(t) / e.factor - e.end;
    return this.min + s * (this.max - this.min);
  }
  _getLabelSize(t) {
    const e = this.options.ticks, s = this.ctx.measureText(t).width, r = ae(this.isHorizontal() ? e.maxRotation : e.minRotation), o = Math.cos(r), a = Math.sin(r), h = this._resolveTickFontOptions(0).size;
    return {
      w: s * o + h * a,
      h: s * a + h * o
    };
  }
  _getLabelCapacity(t) {
    const e = this.options.time, s = e.displayFormats, r = s[e.unit] || s.millisecond, o = this._tickFormatFunction(t, 0, xl(this, [
      t
    ], this._majorUnit), r), a = this._getLabelSize(o), h = Math.floor(this.isHorizontal() ? this.width / a.w : this.height / a.h) - 1;
    return h > 0 ? h : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], e, s;
    if (t.length)
      return t;
    const r = this.getMatchingVisibleMetas();
    if (this._normalized && r.length)
      return this._cache.data = r[0].controller.getAllParsedValues(this);
    for (e = 0, s = r.length; e < s; ++e)
      t = t.concat(r[e].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let e, s;
    if (t.length)
      return t;
    const r = this.getLabels();
    for (e = 0, s = r.length; e < s; ++e)
      t.push(vl(this, r[e]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return zl(t.sort(_l));
  }
}
z(wn, "id", "time"), z(wn, "defaults", {
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
    major: {
      enabled: !1
    }
  }
});
function ds(n, t, e) {
  let s = 0, r = n.length - 1, o, a, h, c;
  e ? (t >= n[s].pos && t <= n[r].pos && ({ lo: s, hi: r } = Te(n, "pos", t)), { pos: o, time: h } = n[s], { pos: a, time: c } = n[r]) : (t >= n[s].time && t <= n[r].time && ({ lo: s, hi: r } = Te(n, "time", t)), { time: o, pos: h } = n[s], { time: a, pos: c } = n[r]);
  const d = a - o;
  return d ? h + (c - h) * (t - o) / d : h;
}
class Zo extends wn {
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), e = this._table = this.buildLookupTable(t);
    this._minPos = ds(e, this.min), this._tableRange = ds(e, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: e, max: s } = this, r = [], o = [];
    let a, h, c, d, p;
    for (a = 0, h = t.length; a < h; ++a)
      d = t[a], d >= e && d <= s && r.push(d);
    if (r.length < 2)
      return [
        {
          time: e,
          pos: 0
        },
        {
          time: s,
          pos: 1
        }
      ];
    for (a = 0, h = r.length; a < h; ++a)
      p = r[a + 1], c = r[a - 1], d = r[a], Math.round((p + c) / 2) !== d && o.push({
        time: d,
        pos: a / (h - 1)
      });
    return o;
  }
  _generate() {
    const t = this.min, e = this.max;
    let s = super.getDataTimestamps();
    return (!s.includes(t) || !s.length) && s.splice(0, 0, t), (!s.includes(e) || s.length === 1) && s.push(e), s.sort((r, o) => r - o);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const e = this.getDataTimestamps(), s = this.getLabelTimestamps();
    return e.length && s.length ? t = this.normalize(e.concat(s)) : t = e.length ? e : s, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (ds(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const e = this._offsets, s = this.getDecimalForPixel(t) / e.factor - e.end;
    return ds(this._table, s * this._tableRange + this._minPos, !0);
  }
}
z(Zo, "id", "timeseries"), z(Zo, "defaults", wn.defaults);
var Rg = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  CategoryScale: Bo,
  LinearScale: Ro,
  LogarithmicScale: Fo,
  RadialLinearScale: hn,
  TimeScale: wn,
  TimeSeriesScale: Zo
});
const Fg = [
  Wd,
  yp,
  pg,
  Rg
], Kt = {
  Utils: {
    // Splits the points on the null separators between tracks; never returns null points or empty tracks
    DividePolylinesPoints(n) {
      const t = [];
      let e = [];
      for (const s of n)
        s === null ? (e.length > 0 && t.push(e), e = []) : e.push(s);
      return e.length > 0 && t.push(e), t;
    },
    /*
     * Color scale for the track. Grade has fixed stops (descent blue, flat green, climb yellow to red);
     * speed, heart rate and elevation go from blue to red between the 5th and 95th percentile,
     * so a single GPS spike does not flatten the scale.
     */
    TrackColorScale(n, t) {
      let e, s, r;
      if (n === "grade")
        e = [[-12, "#1d4ed8"], [-6, "#38bdf8"], [0, "#22c55e"], [4, "#eab308"], [8, "#f97316"], [12, "#dc2626"], [18, "#7f1d1d"]], s = -12, r = 18;
      else {
        const h = t.filter((d) => d !== null && !isNaN(d)).sort((d, p) => d - p);
        s = h.length ? h[Math.floor(h.length * 0.05)] : 0, r = h.length ? h[Math.min(h.length - 1, Math.floor(h.length * 0.95))] : 1, r <= s && (r = s + 1);
        const c = ["#2563eb", "#22c55e", "#eab308", "#dc2626"];
        e = c.map((d, p) => [s + (r - s) * p / (c.length - 1), d]);
      }
      const o = (h) => [1, 3, 5].map((c) => parseInt(h.substring(c, c + 2), 16));
      return { colorOf: (h) => {
        if (h === null || isNaN(h))
          return "#888888";
        const c = n === "grade" ? 1 : (r - s) / 20;
        if (h = Math.round(h / c) * c, h <= e[0][0])
          return e[0][1];
        if (h >= e[e.length - 1][0])
          return e[e.length - 1][1];
        for (let d = 0; d < e.length - 1; d++)
          if (h <= e[d + 1][0]) {
            const p = (h - e[d][0]) / (e[d + 1][0] - e[d][0]), g = o(e[d][1]), _ = o(e[d + 1][1]);
            return "#" + g.map((v, b) => Math.round(v + p * (_[b] - v)).toString(16).padStart(2, "0")).join("");
          }
        return e[e.length - 1][1];
      }, stops: e, min: s, max: r };
    },
    /*
     * Splits the track in pieces of the same color. The map engines draw each piece between null separators
     * with its own color; consecutive pieces share their boundary point, so the line has no gaps.
     */
    SplitTrackByColor(n, t, e) {
      const s = [], r = [];
      let o = [], a = "";
      const h = () => {
        o.length > 1 && (s.length > 0 && s.push(null), s.push(...o), r.push(a)), o = [];
      };
      for (let c = 0; c < n.length; c++) {
        const d = n[c];
        if (d === null) {
          h();
          continue;
        }
        const p = e(t[c] ?? null);
        if (o.length === 0)
          o = [d], a = p;
        else if (p === a || o.length === 1)
          o.length === 1 && (a = p), o.push(d);
        else {
          const g = o[o.length - 1];
          h(), o = [g, d], a = p;
        }
      }
      return h(), { mapData: s, colors: r };
    },
    /* Distance in meters between two [lat, lon] points (haversine) */
    Distance(n, t) {
      const e = Math.PI / 180, s = (t[0] - n[0]) * e, r = (t[1] - n[1]) * e, o = Math.sin(s / 2) ** 2 + Math.cos(n[0] * e) * Math.cos(t[0] * e) * Math.sin(r / 2) ** 2;
      return 2 * 6371e3 * Math.asin(Math.min(1, Math.sqrt(o)));
    },
    /*
     * Points every `interval` units along the track (the gap between two tracks adds no distance).
     * unitMeters: 1000 for km, 1609.344 for miles, 1852 for nautical miles.
     */
    DistanceMarkers(n, t, e) {
      const s = [];
      if (!(t > 0))
        return s;
      const r = t * e;
      let o = 0, a = r, h = null;
      for (const c of n) {
        if (c === null) {
          h = null;
          continue;
        }
        if (h !== null) {
          const d = Kt.Utils.Distance(h, c);
          for (; d > 0 && o + d >= a; ) {
            const p = (a - o) / d;
            s.push({ point: [h[0] + (c[0] - h[0]) * p, h[1] + (c[1] - h[1]) * p], value: Math.round(a / e * 100) / 100 }), a += r;
          }
          o += d;
        }
        h = c;
      }
      return s;
    },
    /* Round label for start / end / distance markers */
    MarkerElement(n, t, e = 18) {
      const s = document.createElement("div");
      return s.className = "wpgpxmaps-marker", s.textContent = n, s.style.cssText = `display:flex;align-items:center;justify-content:center;width:${e}px;height:${e}px;margin:0;padding:0;border-radius:50%;background:${t};color:#fff;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.4);font:bold ${n.length > 2 ? 8 : 10}px/1 Arial, Helvetica, sans-serif;letter-spacing:0;font-variant-numeric:tabular-nums;text-align:center;box-sizing:border-box;`, s;
    },
    /* Legend of the GPX files shown in the same map (name and color of each one) */
    AddTracksLegend(n, t, e) {
      const s = document.createElement("div");
      s.className = "wpgpxmaps-legend wpgpxmaps-tracks-legend", s.style.cssText = "position:absolute;left:8px;bottom:30px;z-index:1000;background:rgba(255,255,255,.9);padding:4px 8px;border-radius:4px;font:11px/1.5 sans-serif;color:#222;box-shadow:0 1px 3px rgba(0,0,0,.3);pointer-events:none;max-width:60%", t.forEach((r, o) => {
        const a = document.createElement("div"), h = document.createElement("span");
        h.style.cssText = `display:inline-block;width:14px;height:4px;margin-right:6px;vertical-align:middle;border-radius:2px;background:${e[o % e.length]}`, a.append(h, document.createTextNode(r)), s.appendChild(a);
      }), n.appendChild(s);
    },
    /* Small legend with the color bar, added on top of the map (works with Leaflet and MapBox) */
    AddTrackLegend(n, t, e, s, r) {
      const o = e[0][0], a = e[e.length - 1][0], h = e.map((b) => `${b[1]} ${Math.round((b[0] - o) / (a - o) * 100)}%`).join(", "), c = document.createElement("div");
      c.className = "wpgpxmaps-legend", c.style.cssText = "position:absolute;left:8px;bottom:30px;z-index:1000;background:rgba(255,255,255,.9);padding:4px 8px;border-radius:4px;font:11px/1.3 sans-serif;color:#222;box-shadow:0 1px 3px rgba(0,0,0,.3);pointer-events:none";
      const d = document.createElement("div");
      d.textContent = t;
      const p = document.createElement("div");
      p.style.cssText = `width:140px;height:8px;margin:3px 0;border-radius:2px;background:linear-gradient(to right, ${h})`;
      const g = document.createElement("div");
      g.style.cssText = "display:flex;justify-content:space-between";
      const _ = document.createElement("span");
      _.textContent = s;
      const v = document.createElement("span");
      v.textContent = r, g.append(_, v), c.append(d, p, g), n.appendChild(c);
    },
    GetItemFromArray(n, t) {
      try {
        return n[t];
      } catch {
        return [0, 0];
      }
    },
    calculateGrade(n, t) {
      if (n.length !== t.length + 1)
        throw new Error("The number of altitude points must be one more than the number of distances.");
      const e = [];
      for (let s = 0; s < t.length; s++) {
        const o = (n[s + 1] - n[s]) / t[s] * 100;
        e.push(o);
      }
      return e;
    },
    getGradientColor(n) {
      const t = [
        { grade: 0, color: [0, 255, 0] },
        // Green: 0%
        { grade: 5, color: [255, 255, 0] },
        // Yellow: 5%
        { grade: 15, color: [255, 0, 0] }
        // Red: 15%
      ];
      function e(a, h, c) {
        return `rgb(${a.map((p, g) => Math.round(p + c * (h[g] - p))).join(",")})`;
      }
      let s, r;
      for (let a = 0; a < t.length - 1; a++)
        if (n <= t[a + 1].grade) {
          s = t[a], r = t[a + 1];
          break;
        }
      const o = (n - s.grade) / (r.grade - s.grade);
      return e(s.color, r.color, o);
    }
  }
};
var sr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ng(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var fs = { exports: {} };
/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */
var wl;
function Lh() {
  return wl || (wl = 1, function(n, t) {
    (function(e, s) {
      s(t);
    })(sr, function(e) {
      var s = "1.9.4";
      function r(i) {
        var l, u, f, m;
        for (u = 1, f = arguments.length; u < f; u++) {
          m = arguments[u];
          for (l in m)
            i[l] = m[l];
        }
        return i;
      }
      var o = Object.create || function() {
        function i() {
        }
        return function(l) {
          return i.prototype = l, new i();
        };
      }();
      function a(i, l) {
        var u = Array.prototype.slice;
        if (i.bind)
          return i.bind.apply(i, u.call(arguments, 1));
        var f = u.call(arguments, 2);
        return function() {
          return i.apply(l, f.length ? f.concat(u.call(arguments)) : arguments);
        };
      }
      var h = 0;
      function c(i) {
        return "_leaflet_id" in i || (i._leaflet_id = ++h), i._leaflet_id;
      }
      function d(i, l, u) {
        var f, m, y, w;
        return w = function() {
          f = !1, m && (y.apply(u, m), m = !1);
        }, y = function() {
          f ? m = arguments : (i.apply(u, arguments), setTimeout(w, l), f = !0);
        }, y;
      }
      function p(i, l, u) {
        var f = l[1], m = l[0], y = f - m;
        return i === f && u ? i : ((i - m) % y + y) % y + m;
      }
      function g() {
        return !1;
      }
      function _(i, l) {
        if (l === !1)
          return i;
        var u = Math.pow(10, l === void 0 ? 6 : l);
        return Math.round(i * u) / u;
      }
      function v(i) {
        return i.trim ? i.trim() : i.replace(/^\s+|\s+$/g, "");
      }
      function b(i) {
        return v(i).split(/\s+/);
      }
      function x(i, l) {
        Object.prototype.hasOwnProperty.call(i, "options") || (i.options = i.options ? o(i.options) : {});
        for (var u in l)
          i.options[u] = l[u];
        return i.options;
      }
      function M(i, l, u) {
        var f = [];
        for (var m in i)
          f.push(encodeURIComponent(u ? m.toUpperCase() : m) + "=" + encodeURIComponent(i[m]));
        return (!l || l.indexOf("?") === -1 ? "?" : "&") + f.join("&");
      }
      var P = /\{ *([\w_ -]+) *\}/g;
      function S(i, l) {
        return i.replace(P, function(u, f) {
          var m = l[f];
          if (m === void 0)
            throw new Error("No value provided for variable " + u);
          return typeof m == "function" && (m = m(l)), m;
        });
      }
      var A = Array.isArray || function(i) {
        return Object.prototype.toString.call(i) === "[object Array]";
      };
      function O(i, l) {
        for (var u = 0; u < i.length; u++)
          if (i[u] === l)
            return u;
        return -1;
      }
      var T = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
      function I(i) {
        return window["webkit" + i] || window["moz" + i] || window["ms" + i];
      }
      var D = 0;
      function B(i) {
        var l = +/* @__PURE__ */ new Date(), u = Math.max(0, 16 - (l - D));
        return D = l + u, window.setTimeout(i, u);
      }
      var N = window.requestAnimationFrame || I("RequestAnimationFrame") || B, Y = window.cancelAnimationFrame || I("CancelAnimationFrame") || I("CancelRequestAnimationFrame") || function(i) {
        window.clearTimeout(i);
      };
      function Z(i, l, u) {
        if (u && N === B)
          i.call(l);
        else
          return N.call(window, a(i, l));
      }
      function V(i) {
        i && Y.call(window, i);
      }
      var Ct = {
        __proto__: null,
        extend: r,
        create: o,
        bind: a,
        get lastId() {
          return h;
        },
        stamp: c,
        throttle: d,
        wrapNum: p,
        falseFn: g,
        formatNum: _,
        trim: v,
        splitWords: b,
        setOptions: x,
        getParamString: M,
        template: S,
        isArray: A,
        indexOf: O,
        emptyImageUrl: T,
        requestFn: N,
        cancelFn: Y,
        requestAnimFrame: Z,
        cancelAnimFrame: V
      };
      function et() {
      }
      et.extend = function(i) {
        var l = function() {
          x(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
        }, u = l.__super__ = this.prototype, f = o(u);
        f.constructor = l, l.prototype = f;
        for (var m in this)
          Object.prototype.hasOwnProperty.call(this, m) && m !== "prototype" && m !== "__super__" && (l[m] = this[m]);
        return i.statics && r(l, i.statics), i.includes && (ht(i.includes), r.apply(null, [f].concat(i.includes))), r(f, i), delete f.statics, delete f.includes, f.options && (f.options = u.options ? o(u.options) : {}, r(f.options, i.options)), f._initHooks = [], f.callInitHooks = function() {
          if (!this._initHooksCalled) {
            u.callInitHooks && u.callInitHooks.call(this), this._initHooksCalled = !0;
            for (var y = 0, w = f._initHooks.length; y < w; y++)
              f._initHooks[y].call(this);
          }
        }, l;
      }, et.include = function(i) {
        var l = this.prototype.options;
        return r(this.prototype, i), i.options && (this.prototype.options = l, this.mergeOptions(i.options)), this;
      }, et.mergeOptions = function(i) {
        return r(this.prototype.options, i), this;
      }, et.addInitHook = function(i) {
        var l = Array.prototype.slice.call(arguments, 1), u = typeof i == "function" ? i : function() {
          this[i].apply(this, l);
        };
        return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(u), this;
      };
      function ht(i) {
        if (!(typeof L > "u" || !L || !L.Mixin)) {
          i = A(i) ? i : [i];
          for (var l = 0; l < i.length; l++)
            i[l] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
        }
      }
      var J = {
        /* @method on(type: String, fn: Function, context?: Object): this
         * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
         *
         * @alternative
         * @method on(eventMap: Object): this
         * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
         */
        on: function(i, l, u) {
          if (typeof i == "object")
            for (var f in i)
              this._on(f, i[f], l);
          else {
            i = b(i);
            for (var m = 0, y = i.length; m < y; m++)
              this._on(i[m], l, u);
          }
          return this;
        },
        /* @method off(type: String, fn?: Function, context?: Object): this
         * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
         *
         * @alternative
         * @method off(eventMap: Object): this
         * Removes a set of type/listener pairs.
         *
         * @alternative
         * @method off: this
         * Removes all listeners to all events on the object. This includes implicitly attached events.
         */
        off: function(i, l, u) {
          if (!arguments.length)
            delete this._events;
          else if (typeof i == "object")
            for (var f in i)
              this._off(f, i[f], l);
          else {
            i = b(i);
            for (var m = arguments.length === 1, y = 0, w = i.length; y < w; y++)
              m ? this._off(i[y]) : this._off(i[y], l, u);
          }
          return this;
        },
        // attach listener (without syntactic sugar now)
        _on: function(i, l, u, f) {
          if (typeof l != "function") {
            console.warn("wrong listener type: " + typeof l);
            return;
          }
          if (this._listens(i, l, u) === !1) {
            u === this && (u = void 0);
            var m = { fn: l, ctx: u };
            f && (m.once = !0), this._events = this._events || {}, this._events[i] = this._events[i] || [], this._events[i].push(m);
          }
        },
        _off: function(i, l, u) {
          var f, m, y;
          if (this._events && (f = this._events[i], !!f)) {
            if (arguments.length === 1) {
              if (this._firingCount)
                for (m = 0, y = f.length; m < y; m++)
                  f[m].fn = g;
              delete this._events[i];
              return;
            }
            if (typeof l != "function") {
              console.warn("wrong listener type: " + typeof l);
              return;
            }
            var w = this._listens(i, l, u);
            if (w !== !1) {
              var k = f[w];
              this._firingCount && (k.fn = g, this._events[i] = f = f.slice()), f.splice(w, 1);
            }
          }
        },
        // @method fire(type: String, data?: Object, propagate?: Boolean): this
        // Fires an event of the specified type. You can optionally provide a data
        // object — the first argument of the listener function will contain its
        // properties. The event can optionally be propagated to event parents.
        fire: function(i, l, u) {
          if (!this.listens(i, u))
            return this;
          var f = r({}, l, {
            type: i,
            target: this,
            sourceTarget: l && l.sourceTarget || this
          });
          if (this._events) {
            var m = this._events[i];
            if (m) {
              this._firingCount = this._firingCount + 1 || 1;
              for (var y = 0, w = m.length; y < w; y++) {
                var k = m[y], C = k.fn;
                k.once && this.off(i, C, k.ctx), C.call(k.ctx || this, f);
              }
              this._firingCount--;
            }
          }
          return u && this._propagateEvent(f), this;
        },
        // @method listens(type: String, propagate?: Boolean): Boolean
        // @method listens(type: String, fn: Function, context?: Object, propagate?: Boolean): Boolean
        // Returns `true` if a particular event type has any listeners attached to it.
        // The verification can optionally be propagated, it will return `true` if parents have the listener attached to it.
        listens: function(i, l, u, f) {
          typeof i != "string" && console.warn('"string" type argument expected');
          var m = l;
          typeof l != "function" && (f = !!l, m = void 0, u = void 0);
          var y = this._events && this._events[i];
          if (y && y.length && this._listens(i, m, u) !== !1)
            return !0;
          if (f) {
            for (var w in this._eventParents)
              if (this._eventParents[w].listens(i, l, u, f))
                return !0;
          }
          return !1;
        },
        // returns the index (number) or false
        _listens: function(i, l, u) {
          if (!this._events)
            return !1;
          var f = this._events[i] || [];
          if (!l)
            return !!f.length;
          u === this && (u = void 0);
          for (var m = 0, y = f.length; m < y; m++)
            if (f[m].fn === l && f[m].ctx === u)
              return m;
          return !1;
        },
        // @method once(…): this
        // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
        once: function(i, l, u) {
          if (typeof i == "object")
            for (var f in i)
              this._on(f, i[f], l, !0);
          else {
            i = b(i);
            for (var m = 0, y = i.length; m < y; m++)
              this._on(i[m], l, u, !0);
          }
          return this;
        },
        // @method addEventParent(obj: Evented): this
        // Adds an event parent - an `Evented` that will receive propagated events
        addEventParent: function(i) {
          return this._eventParents = this._eventParents || {}, this._eventParents[c(i)] = i, this;
        },
        // @method removeEventParent(obj: Evented): this
        // Removes an event parent, so it will stop receiving propagated events
        removeEventParent: function(i) {
          return this._eventParents && delete this._eventParents[c(i)], this;
        },
        _propagateEvent: function(i) {
          for (var l in this._eventParents)
            this._eventParents[l].fire(i.type, r({
              layer: i.target,
              propagatedFrom: i.target
            }, i), !0);
        }
      };
      J.addEventListener = J.on, J.removeEventListener = J.clearAllEventListeners = J.off, J.addOneTimeEventListener = J.once, J.fireEvent = J.fire, J.hasEventListeners = J.listens;
      var dt = et.extend(J);
      function H(i, l, u) {
        this.x = u ? Math.round(i) : i, this.y = u ? Math.round(l) : l;
      }
      var pt = Math.trunc || function(i) {
        return i > 0 ? Math.floor(i) : Math.ceil(i);
      };
      H.prototype = {
        // @method clone(): Point
        // Returns a copy of the current point.
        clone: function() {
          return new H(this.x, this.y);
        },
        // @method add(otherPoint: Point): Point
        // Returns the result of addition of the current and the given points.
        add: function(i) {
          return this.clone()._add(F(i));
        },
        _add: function(i) {
          return this.x += i.x, this.y += i.y, this;
        },
        // @method subtract(otherPoint: Point): Point
        // Returns the result of subtraction of the given point from the current.
        subtract: function(i) {
          return this.clone()._subtract(F(i));
        },
        _subtract: function(i) {
          return this.x -= i.x, this.y -= i.y, this;
        },
        // @method divideBy(num: Number): Point
        // Returns the result of division of the current point by the given number.
        divideBy: function(i) {
          return this.clone()._divideBy(i);
        },
        _divideBy: function(i) {
          return this.x /= i, this.y /= i, this;
        },
        // @method multiplyBy(num: Number): Point
        // Returns the result of multiplication of the current point by the given number.
        multiplyBy: function(i) {
          return this.clone()._multiplyBy(i);
        },
        _multiplyBy: function(i) {
          return this.x *= i, this.y *= i, this;
        },
        // @method scaleBy(scale: Point): Point
        // Multiply each coordinate of the current point by each coordinate of
        // `scale`. In linear algebra terms, multiply the point by the
        // [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
        // defined by `scale`.
        scaleBy: function(i) {
          return new H(this.x * i.x, this.y * i.y);
        },
        // @method unscaleBy(scale: Point): Point
        // Inverse of `scaleBy`. Divide each coordinate of the current point by
        // each coordinate of `scale`.
        unscaleBy: function(i) {
          return new H(this.x / i.x, this.y / i.y);
        },
        // @method round(): Point
        // Returns a copy of the current point with rounded coordinates.
        round: function() {
          return this.clone()._round();
        },
        _round: function() {
          return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
        },
        // @method floor(): Point
        // Returns a copy of the current point with floored coordinates (rounded down).
        floor: function() {
          return this.clone()._floor();
        },
        _floor: function() {
          return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
        },
        // @method ceil(): Point
        // Returns a copy of the current point with ceiled coordinates (rounded up).
        ceil: function() {
          return this.clone()._ceil();
        },
        _ceil: function() {
          return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
        },
        // @method trunc(): Point
        // Returns a copy of the current point with truncated coordinates (rounded towards zero).
        trunc: function() {
          return this.clone()._trunc();
        },
        _trunc: function() {
          return this.x = pt(this.x), this.y = pt(this.y), this;
        },
        // @method distanceTo(otherPoint: Point): Number
        // Returns the cartesian distance between the current and the given points.
        distanceTo: function(i) {
          i = F(i);
          var l = i.x - this.x, u = i.y - this.y;
          return Math.sqrt(l * l + u * u);
        },
        // @method equals(otherPoint: Point): Boolean
        // Returns `true` if the given point has the same coordinates.
        equals: function(i) {
          return i = F(i), i.x === this.x && i.y === this.y;
        },
        // @method contains(otherPoint: Point): Boolean
        // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
        contains: function(i) {
          return i = F(i), Math.abs(i.x) <= Math.abs(this.x) && Math.abs(i.y) <= Math.abs(this.y);
        },
        // @method toString(): String
        // Returns a string representation of the point for debugging purposes.
        toString: function() {
          return "Point(" + _(this.x) + ", " + _(this.y) + ")";
        }
      };
      function F(i, l, u) {
        return i instanceof H ? i : A(i) ? new H(i[0], i[1]) : i == null ? i : typeof i == "object" && "x" in i && "y" in i ? new H(i.x, i.y) : new H(i, l, u);
      }
      function G(i, l) {
        if (i)
          for (var u = l ? [i, l] : i, f = 0, m = u.length; f < m; f++)
            this.extend(u[f]);
      }
      G.prototype = {
        // @method extend(point: Point): this
        // Extends the bounds to contain the given point.
        // @alternative
        // @method extend(otherBounds: Bounds): this
        // Extend the bounds to contain the given bounds
        extend: function(i) {
          var l, u;
          if (!i)
            return this;
          if (i instanceof H || typeof i[0] == "number" || "x" in i)
            l = u = F(i);
          else if (i = ct(i), l = i.min, u = i.max, !l || !u)
            return this;
          return !this.min && !this.max ? (this.min = l.clone(), this.max = u.clone()) : (this.min.x = Math.min(l.x, this.min.x), this.max.x = Math.max(u.x, this.max.x), this.min.y = Math.min(l.y, this.min.y), this.max.y = Math.max(u.y, this.max.y)), this;
        },
        // @method getCenter(round?: Boolean): Point
        // Returns the center point of the bounds.
        getCenter: function(i) {
          return F(
            (this.min.x + this.max.x) / 2,
            (this.min.y + this.max.y) / 2,
            i
          );
        },
        // @method getBottomLeft(): Point
        // Returns the bottom-left point of the bounds.
        getBottomLeft: function() {
          return F(this.min.x, this.max.y);
        },
        // @method getTopRight(): Point
        // Returns the top-right point of the bounds.
        getTopRight: function() {
          return F(this.max.x, this.min.y);
        },
        // @method getTopLeft(): Point
        // Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
        getTopLeft: function() {
          return this.min;
        },
        // @method getBottomRight(): Point
        // Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
        getBottomRight: function() {
          return this.max;
        },
        // @method getSize(): Point
        // Returns the size of the given bounds
        getSize: function() {
          return this.max.subtract(this.min);
        },
        // @method contains(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle contains the given one.
        // @alternative
        // @method contains(point: Point): Boolean
        // Returns `true` if the rectangle contains the given point.
        contains: function(i) {
          var l, u;
          return typeof i[0] == "number" || i instanceof H ? i = F(i) : i = ct(i), i instanceof G ? (l = i.min, u = i.max) : l = u = i, l.x >= this.min.x && u.x <= this.max.x && l.y >= this.min.y && u.y <= this.max.y;
        },
        // @method intersects(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle intersects the given bounds. Two bounds
        // intersect if they have at least one point in common.
        intersects: function(i) {
          i = ct(i);
          var l = this.min, u = this.max, f = i.min, m = i.max, y = m.x >= l.x && f.x <= u.x, w = m.y >= l.y && f.y <= u.y;
          return y && w;
        },
        // @method overlaps(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle overlaps the given bounds. Two bounds
        // overlap if their intersection is an area.
        overlaps: function(i) {
          i = ct(i);
          var l = this.min, u = this.max, f = i.min, m = i.max, y = m.x > l.x && f.x < u.x, w = m.y > l.y && f.y < u.y;
          return y && w;
        },
        // @method isValid(): Boolean
        // Returns `true` if the bounds are properly initialized.
        isValid: function() {
          return !!(this.min && this.max);
        },
        // @method pad(bufferRatio: Number): Bounds
        // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
        // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
        // Negative values will retract the bounds.
        pad: function(i) {
          var l = this.min, u = this.max, f = Math.abs(l.x - u.x) * i, m = Math.abs(l.y - u.y) * i;
          return ct(
            F(l.x - f, l.y - m),
            F(u.x + f, u.y + m)
          );
        },
        // @method equals(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle is equivalent to the given bounds.
        equals: function(i) {
          return i ? (i = ct(i), this.min.equals(i.getTopLeft()) && this.max.equals(i.getBottomRight())) : !1;
        }
      };
      function ct(i, l) {
        return !i || i instanceof G ? i : new G(i, l);
      }
      function xt(i, l) {
        if (i)
          for (var u = l ? [i, l] : i, f = 0, m = u.length; f < m; f++)
            this.extend(u[f]);
      }
      xt.prototype = {
        // @method extend(latlng: LatLng): this
        // Extend the bounds to contain the given point
        // @alternative
        // @method extend(otherBounds: LatLngBounds): this
        // Extend the bounds to contain the given bounds
        extend: function(i) {
          var l = this._southWest, u = this._northEast, f, m;
          if (i instanceof Q)
            f = i, m = i;
          else if (i instanceof xt) {
            if (f = i._southWest, m = i._northEast, !f || !m)
              return this;
          } else
            return i ? this.extend(U(i) || at(i)) : this;
          return !l && !u ? (this._southWest = new Q(f.lat, f.lng), this._northEast = new Q(m.lat, m.lng)) : (l.lat = Math.min(f.lat, l.lat), l.lng = Math.min(f.lng, l.lng), u.lat = Math.max(m.lat, u.lat), u.lng = Math.max(m.lng, u.lng)), this;
        },
        // @method pad(bufferRatio: Number): LatLngBounds
        // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
        // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
        // Negative values will retract the bounds.
        pad: function(i) {
          var l = this._southWest, u = this._northEast, f = Math.abs(l.lat - u.lat) * i, m = Math.abs(l.lng - u.lng) * i;
          return new xt(
            new Q(l.lat - f, l.lng - m),
            new Q(u.lat + f, u.lng + m)
          );
        },
        // @method getCenter(): LatLng
        // Returns the center point of the bounds.
        getCenter: function() {
          return new Q(
            (this._southWest.lat + this._northEast.lat) / 2,
            (this._southWest.lng + this._northEast.lng) / 2
          );
        },
        // @method getSouthWest(): LatLng
        // Returns the south-west point of the bounds.
        getSouthWest: function() {
          return this._southWest;
        },
        // @method getNorthEast(): LatLng
        // Returns the north-east point of the bounds.
        getNorthEast: function() {
          return this._northEast;
        },
        // @method getNorthWest(): LatLng
        // Returns the north-west point of the bounds.
        getNorthWest: function() {
          return new Q(this.getNorth(), this.getWest());
        },
        // @method getSouthEast(): LatLng
        // Returns the south-east point of the bounds.
        getSouthEast: function() {
          return new Q(this.getSouth(), this.getEast());
        },
        // @method getWest(): Number
        // Returns the west longitude of the bounds
        getWest: function() {
          return this._southWest.lng;
        },
        // @method getSouth(): Number
        // Returns the south latitude of the bounds
        getSouth: function() {
          return this._southWest.lat;
        },
        // @method getEast(): Number
        // Returns the east longitude of the bounds
        getEast: function() {
          return this._northEast.lng;
        },
        // @method getNorth(): Number
        // Returns the north latitude of the bounds
        getNorth: function() {
          return this._northEast.lat;
        },
        // @method contains(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle contains the given one.
        // @alternative
        // @method contains (latlng: LatLng): Boolean
        // Returns `true` if the rectangle contains the given point.
        contains: function(i) {
          typeof i[0] == "number" || i instanceof Q || "lat" in i ? i = U(i) : i = at(i);
          var l = this._southWest, u = this._northEast, f, m;
          return i instanceof xt ? (f = i.getSouthWest(), m = i.getNorthEast()) : f = m = i, f.lat >= l.lat && m.lat <= u.lat && f.lng >= l.lng && m.lng <= u.lng;
        },
        // @method intersects(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
        intersects: function(i) {
          i = at(i);
          var l = this._southWest, u = this._northEast, f = i.getSouthWest(), m = i.getNorthEast(), y = m.lat >= l.lat && f.lat <= u.lat, w = m.lng >= l.lng && f.lng <= u.lng;
          return y && w;
        },
        // @method overlaps(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
        overlaps: function(i) {
          i = at(i);
          var l = this._southWest, u = this._northEast, f = i.getSouthWest(), m = i.getNorthEast(), y = m.lat > l.lat && f.lat < u.lat, w = m.lng > l.lng && f.lng < u.lng;
          return y && w;
        },
        // @method toBBoxString(): String
        // Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
        toBBoxString: function() {
          return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
        },
        // @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
        // Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
        equals: function(i, l) {
          return i ? (i = at(i), this._southWest.equals(i.getSouthWest(), l) && this._northEast.equals(i.getNorthEast(), l)) : !1;
        },
        // @method isValid(): Boolean
        // Returns `true` if the bounds are properly initialized.
        isValid: function() {
          return !!(this._southWest && this._northEast);
        }
      };
      function at(i, l) {
        return i instanceof xt ? i : new xt(i, l);
      }
      function Q(i, l, u) {
        if (isNaN(i) || isNaN(l))
          throw new Error("Invalid LatLng object: (" + i + ", " + l + ")");
        this.lat = +i, this.lng = +l, u !== void 0 && (this.alt = +u);
      }
      Q.prototype = {
        // @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
        // Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
        equals: function(i, l) {
          if (!i)
            return !1;
          i = U(i);
          var u = Math.max(
            Math.abs(this.lat - i.lat),
            Math.abs(this.lng - i.lng)
          );
          return u <= (l === void 0 ? 1e-9 : l);
        },
        // @method toString(): String
        // Returns a string representation of the point (for debugging purposes).
        toString: function(i) {
          return "LatLng(" + _(this.lat, i) + ", " + _(this.lng, i) + ")";
        },
        // @method distanceTo(otherLatLng: LatLng): Number
        // Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
        distanceTo: function(i) {
          return Vt.distance(this, U(i));
        },
        // @method wrap(): LatLng
        // Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
        wrap: function() {
          return Vt.wrapLatLng(this);
        },
        // @method toBounds(sizeInMeters: Number): LatLngBounds
        // Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
        toBounds: function(i) {
          var l = 180 * i / 40075017, u = l / Math.cos(Math.PI / 180 * this.lat);
          return at(
            [this.lat - l, this.lng - u],
            [this.lat + l, this.lng + u]
          );
        },
        clone: function() {
          return new Q(this.lat, this.lng, this.alt);
        }
      };
      function U(i, l, u) {
        return i instanceof Q ? i : A(i) && typeof i[0] != "object" ? i.length === 3 ? new Q(i[0], i[1], i[2]) : i.length === 2 ? new Q(i[0], i[1]) : null : i == null ? i : typeof i == "object" && "lat" in i ? new Q(i.lat, "lng" in i ? i.lng : i.lon, i.alt) : l === void 0 ? null : new Q(i, l, u);
      }
      var qt = {
        // @method latLngToPoint(latlng: LatLng, zoom: Number): Point
        // Projects geographical coordinates into pixel coordinates for a given zoom.
        latLngToPoint: function(i, l) {
          var u = this.projection.project(i), f = this.scale(l);
          return this.transformation._transform(u, f);
        },
        // @method pointToLatLng(point: Point, zoom: Number): LatLng
        // The inverse of `latLngToPoint`. Projects pixel coordinates on a given
        // zoom into geographical coordinates.
        pointToLatLng: function(i, l) {
          var u = this.scale(l), f = this.transformation.untransform(i, u);
          return this.projection.unproject(f);
        },
        // @method project(latlng: LatLng): Point
        // Projects geographical coordinates into coordinates in units accepted for
        // this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
        project: function(i) {
          return this.projection.project(i);
        },
        // @method unproject(point: Point): LatLng
        // Given a projected coordinate returns the corresponding LatLng.
        // The inverse of `project`.
        unproject: function(i) {
          return this.projection.unproject(i);
        },
        // @method scale(zoom: Number): Number
        // Returns the scale used when transforming projected coordinates into
        // pixel coordinates for a particular zoom. For example, it returns
        // `256 * 2^zoom` for Mercator-based CRS.
        scale: function(i) {
          return 256 * Math.pow(2, i);
        },
        // @method zoom(scale: Number): Number
        // Inverse of `scale()`, returns the zoom level corresponding to a scale
        // factor of `scale`.
        zoom: function(i) {
          return Math.log(i / 256) / Math.LN2;
        },
        // @method getProjectedBounds(zoom: Number): Bounds
        // Returns the projection's bounds scaled and transformed for the provided `zoom`.
        getProjectedBounds: function(i) {
          if (this.infinite)
            return null;
          var l = this.projection.bounds, u = this.scale(i), f = this.transformation.transform(l.min, u), m = this.transformation.transform(l.max, u);
          return new G(f, m);
        },
        // @method distance(latlng1: LatLng, latlng2: LatLng): Number
        // Returns the distance between two geographical coordinates.
        // @property code: String
        // Standard code name of the CRS passed into WMS services (e.g. `'EPSG:3857'`)
        //
        // @property wrapLng: Number[]
        // An array of two numbers defining whether the longitude (horizontal) coordinate
        // axis wraps around a given range and how. Defaults to `[-180, 180]` in most
        // geographical CRSs. If `undefined`, the longitude axis does not wrap around.
        //
        // @property wrapLat: Number[]
        // Like `wrapLng`, but for the latitude (vertical) axis.
        // wrapLng: [min, max],
        // wrapLat: [min, max],
        // @property infinite: Boolean
        // If true, the coordinate space will be unbounded (infinite in both axes)
        infinite: !1,
        // @method wrapLatLng(latlng: LatLng): LatLng
        // Returns a `LatLng` where lat and lng has been wrapped according to the
        // CRS's `wrapLat` and `wrapLng` properties, if they are outside the CRS's bounds.
        wrapLatLng: function(i) {
          var l = this.wrapLng ? p(i.lng, this.wrapLng, !0) : i.lng, u = this.wrapLat ? p(i.lat, this.wrapLat, !0) : i.lat, f = i.alt;
          return new Q(u, l, f);
        },
        // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
        // Returns a `LatLngBounds` with the same size as the given one, ensuring
        // that its center is within the CRS's bounds.
        // Only accepts actual `L.LatLngBounds` instances, not arrays.
        wrapLatLngBounds: function(i) {
          var l = i.getCenter(), u = this.wrapLatLng(l), f = l.lat - u.lat, m = l.lng - u.lng;
          if (f === 0 && m === 0)
            return i;
          var y = i.getSouthWest(), w = i.getNorthEast(), k = new Q(y.lat - f, y.lng - m), C = new Q(w.lat - f, w.lng - m);
          return new xt(k, C);
        }
      }, Vt = r({}, qt, {
        wrapLng: [-180, 180],
        // Mean Earth Radius, as recommended for use by
        // the International Union of Geodesy and Geophysics,
        // see https://rosettacode.org/wiki/Haversine_formula
        R: 6371e3,
        // distance between two geographical points using spherical law of cosines approximation
        distance: function(i, l) {
          var u = Math.PI / 180, f = i.lat * u, m = l.lat * u, y = Math.sin((l.lat - i.lat) * u / 2), w = Math.sin((l.lng - i.lng) * u / 2), k = y * y + Math.cos(f) * Math.cos(m) * w * w, C = 2 * Math.atan2(Math.sqrt(k), Math.sqrt(1 - k));
          return this.R * C;
        }
      }), Di = 6378137, Ve = {
        R: Di,
        MAX_LATITUDE: 85.0511287798,
        project: function(i) {
          var l = Math.PI / 180, u = this.MAX_LATITUDE, f = Math.max(Math.min(u, i.lat), -u), m = Math.sin(f * l);
          return new H(
            this.R * i.lng * l,
            this.R * Math.log((1 + m) / (1 - m)) / 2
          );
        },
        unproject: function(i) {
          var l = 180 / Math.PI;
          return new Q(
            (2 * Math.atan(Math.exp(i.y / this.R)) - Math.PI / 2) * l,
            i.x * l / this.R
          );
        },
        bounds: function() {
          var i = Di * Math.PI;
          return new G([-i, -i], [i, i]);
        }()
      };
      function he(i, l, u, f) {
        if (A(i)) {
          this._a = i[0], this._b = i[1], this._c = i[2], this._d = i[3];
          return;
        }
        this._a = i, this._b = l, this._c = u, this._d = f;
      }
      he.prototype = {
        // @method transform(point: Point, scale?: Number): Point
        // Returns a transformed point, optionally multiplied by the given scale.
        // Only accepts actual `L.Point` instances, not arrays.
        transform: function(i, l) {
          return this._transform(i.clone(), l);
        },
        // destructive transform (faster)
        _transform: function(i, l) {
          return l = l || 1, i.x = l * (this._a * i.x + this._b), i.y = l * (this._c * i.y + this._d), i;
        },
        // @method untransform(point: Point, scale?: Number): Point
        // Returns the reverse transformation of the given point, optionally divided
        // by the given scale. Only accepts actual `L.Point` instances, not arrays.
        untransform: function(i, l) {
          return l = l || 1, new H(
            (i.x / l - this._b) / this._a,
            (i.y / l - this._d) / this._c
          );
        }
      };
      function ce(i, l, u, f) {
        return new he(i, l, u, f);
      }
      var je = r({}, Vt, {
        code: "EPSG:3857",
        projection: Ve,
        transformation: function() {
          var i = 0.5 / (Math.PI * Ve.R);
          return ce(i, 0.5, -i, 0.5);
        }()
      }), zi = r({}, je, {
        code: "EPSG:900913"
      });
      function fi(i) {
        return document.createElementNS("http://www.w3.org/2000/svg", i);
      }
      function Ue(i, l) {
        var u = "", f, m, y, w, k, C;
        for (f = 0, y = i.length; f < y; f++) {
          for (k = i[f], m = 0, w = k.length; m < w; m++)
            C = k[m], u += (m ? "L" : "M") + C.x + " " + C.y;
          u += l ? W.svg ? "z" : "x" : "";
        }
        return u || "M0 0";
      }
      var Ge = document.documentElement.style, $t = "ActiveXObject" in window, pi = $t && !document.addEventListener, Ye = "msLaunchUri" in navigator && !("documentMode" in document), qe = ue("webkit"), gi = ue("android"), ve = ue("android 2") || ue("android 3"), kn = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), Sn = gi && ue("Google") && kn < 537 && !("AudioNode" in window), se = !!window.opera, Cn = !Ye && ue("chrome"), mi = ue("gecko") && !qe && !se && !$t, Tn = !Cn && ue("safari"), Ft = ue("phantom"), zt = "OTransition" in Ge, It = navigator.platform.indexOf("Win") === 0, Qt = $t && "transition" in Ge, _i = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !ve, Bi = "MozPerspective" in Ge, An = !window.L_DISABLE_3D && (Qt || _i || Bi) && !zt && !Ft, Ee = typeof orientation < "u" || ue("mobile"), On = Ee && qe, En = Ee && _i, Ri = !window.PointerEvent && window.MSPointerEvent, Fi = !!(window.PointerEvent || Ri), Ni = "ontouchstart" in window || !!window.TouchEvent, In = !window.L_NO_TOUCH && (Ni || Fi), Dn = Ee && se, st = Ee && mi, K = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, it = function() {
        var i = !1;
        try {
          var l = Object.defineProperty({}, "passive", {
            get: function() {
              i = !0;
            }
          });
          window.addEventListener("testPassiveEventSupport", g, l), window.removeEventListener("testPassiveEventSupport", g, l);
        } catch {
        }
        return i;
      }(), Pt = function() {
        return !!document.createElement("canvas").getContext;
      }(), _t = !!(document.createElementNS && fi("svg").createSVGRect), kt = !!_t && function() {
        var i = document.createElement("div");
        return i.innerHTML = "<svg/>", (i.firstChild && i.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
      }(), wt = !_t && function() {
        try {
          var i = document.createElement("div");
          i.innerHTML = '<v:shape adj="1"/>';
          var l = i.firstChild;
          return l.style.behavior = "url(#default#VML)", l && typeof l.adj == "object";
        } catch {
          return !1;
        }
      }(), Xe = navigator.platform.indexOf("Mac") === 0, Mh = navigator.platform.indexOf("Linux") === 0;
      function ue(i) {
        return navigator.userAgent.toLowerCase().indexOf(i) >= 0;
      }
      var W = {
        ie: $t,
        ielt9: pi,
        edge: Ye,
        webkit: qe,
        android: gi,
        android23: ve,
        androidStock: Sn,
        opera: se,
        chrome: Cn,
        gecko: mi,
        safari: Tn,
        phantom: Ft,
        opera12: zt,
        win: It,
        ie3d: Qt,
        webkit3d: _i,
        gecko3d: Bi,
        any3d: An,
        mobile: Ee,
        mobileWebkit: On,
        mobileWebkit3d: En,
        msPointer: Ri,
        pointer: Fi,
        touch: In,
        touchNative: Ni,
        mobileOpera: Dn,
        mobileGecko: st,
        retina: K,
        passiveEvents: it,
        canvas: Pt,
        svg: _t,
        vml: wt,
        inlineSvg: kt,
        mac: Xe,
        linux: Mh
      }, or = W.msPointer ? "MSPointerDown" : "pointerdown", rr = W.msPointer ? "MSPointerMove" : "pointermove", ar = W.msPointer ? "MSPointerUp" : "pointerup", lr = W.msPointer ? "MSPointerCancel" : "pointercancel", Rs = {
        touchstart: or,
        touchmove: rr,
        touchend: ar,
        touchcancel: lr
      }, hr = {
        touchstart: Ah,
        touchmove: zn,
        touchend: zn,
        touchcancel: zn
      }, vi = {}, cr = !1;
      function Ph(i, l, u) {
        return l === "touchstart" && Th(), hr[l] ? (u = hr[l].bind(this, u), i.addEventListener(Rs[l], u, !1), u) : (console.warn("wrong event specified:", l), g);
      }
      function kh(i, l, u) {
        if (!Rs[l]) {
          console.warn("wrong event specified:", l);
          return;
        }
        i.removeEventListener(Rs[l], u, !1);
      }
      function Sh(i) {
        vi[i.pointerId] = i;
      }
      function Ch(i) {
        vi[i.pointerId] && (vi[i.pointerId] = i);
      }
      function ur(i) {
        delete vi[i.pointerId];
      }
      function Th() {
        cr || (document.addEventListener(or, Sh, !0), document.addEventListener(rr, Ch, !0), document.addEventListener(ar, ur, !0), document.addEventListener(lr, ur, !0), cr = !0);
      }
      function zn(i, l) {
        if (l.pointerType !== (l.MSPOINTER_TYPE_MOUSE || "mouse")) {
          l.touches = [];
          for (var u in vi)
            l.touches.push(vi[u]);
          l.changedTouches = [l], i(l);
        }
      }
      function Ah(i, l) {
        l.MSPOINTER_TYPE_TOUCH && l.pointerType === l.MSPOINTER_TYPE_TOUCH && Nt(l), zn(i, l);
      }
      function Oh(i) {
        var l = {}, u, f;
        for (f in i)
          u = i[f], l[f] = u && u.bind ? u.bind(i) : u;
        return i = l, l.type = "dblclick", l.detail = 2, l.isTrusted = !1, l._simulated = !0, l;
      }
      var Eh = 200;
      function Ih(i, l) {
        i.addEventListener("dblclick", l);
        var u = 0, f;
        function m(y) {
          if (y.detail !== 1) {
            f = y.detail;
            return;
          }
          if (!(y.pointerType === "mouse" || y.sourceCapabilities && !y.sourceCapabilities.firesTouchEvents)) {
            var w = mr(y);
            if (!(w.some(function(C) {
              return C instanceof HTMLLabelElement && C.attributes.for;
            }) && !w.some(function(C) {
              return C instanceof HTMLInputElement || C instanceof HTMLSelectElement;
            }))) {
              var k = Date.now();
              k - u <= Eh ? (f++, f === 2 && l(Oh(y))) : f = 1, u = k;
            }
          }
        }
        return i.addEventListener("click", m), {
          dblclick: l,
          simDblclick: m
        };
      }
      function Dh(i, l) {
        i.removeEventListener("dblclick", l.dblclick), i.removeEventListener("click", l.simDblclick);
      }
      var Fs = Fn(
        ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
      ), Zi = Fn(
        ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
      ), dr = Zi === "webkitTransition" || Zi === "OTransition" ? Zi + "End" : "transitionend";
      function fr(i) {
        return typeof i == "string" ? document.getElementById(i) : i;
      }
      function Hi(i, l) {
        var u = i.style[l] || i.currentStyle && i.currentStyle[l];
        if ((!u || u === "auto") && document.defaultView) {
          var f = document.defaultView.getComputedStyle(i, null);
          u = f ? f[l] : null;
        }
        return u === "auto" ? null : u;
      }
      function lt(i, l, u) {
        var f = document.createElement(i);
        return f.className = l || "", u && u.appendChild(f), f;
      }
      function Mt(i) {
        var l = i.parentNode;
        l && l.removeChild(i);
      }
      function Bn(i) {
        for (; i.firstChild; )
          i.removeChild(i.firstChild);
      }
      function yi(i) {
        var l = i.parentNode;
        l && l.lastChild !== i && l.appendChild(i);
      }
      function bi(i) {
        var l = i.parentNode;
        l && l.firstChild !== i && l.insertBefore(i, l.firstChild);
      }
      function Ns(i, l) {
        if (i.classList !== void 0)
          return i.classList.contains(l);
        var u = Rn(i);
        return u.length > 0 && new RegExp("(^|\\s)" + l + "(\\s|$)").test(u);
      }
      function $(i, l) {
        if (i.classList !== void 0)
          for (var u = b(l), f = 0, m = u.length; f < m; f++)
            i.classList.add(u[f]);
        else if (!Ns(i, l)) {
          var y = Rn(i);
          Zs(i, (y ? y + " " : "") + l);
        }
      }
      function Tt(i, l) {
        i.classList !== void 0 ? i.classList.remove(l) : Zs(i, v((" " + Rn(i) + " ").replace(" " + l + " ", " ")));
      }
      function Zs(i, l) {
        i.className.baseVal === void 0 ? i.className = l : i.className.baseVal = l;
      }
      function Rn(i) {
        return i.correspondingElement && (i = i.correspondingElement), i.className.baseVal === void 0 ? i.className : i.className.baseVal;
      }
      function te(i, l) {
        "opacity" in i.style ? i.style.opacity = l : "filter" in i.style && zh(i, l);
      }
      function zh(i, l) {
        var u = !1, f = "DXImageTransform.Microsoft.Alpha";
        try {
          u = i.filters.item(f);
        } catch {
          if (l === 1)
            return;
        }
        l = Math.round(l * 100), u ? (u.Enabled = l !== 100, u.Opacity = l) : i.style.filter += " progid:" + f + "(opacity=" + l + ")";
      }
      function Fn(i) {
        for (var l = document.documentElement.style, u = 0; u < i.length; u++)
          if (i[u] in l)
            return i[u];
        return !1;
      }
      function Ke(i, l, u) {
        var f = l || new H(0, 0);
        i.style[Fs] = (W.ie3d ? "translate(" + f.x + "px," + f.y + "px)" : "translate3d(" + f.x + "px," + f.y + "px,0)") + (u ? " scale(" + u + ")" : "");
      }
      function Ot(i, l) {
        i._leaflet_pos = l, W.any3d ? Ke(i, l) : (i.style.left = l.x + "px", i.style.top = l.y + "px");
      }
      function Je(i) {
        return i._leaflet_pos || new H(0, 0);
      }
      var Wi, Vi, Hs;
      if ("onselectstart" in document)
        Wi = function() {
          q(window, "selectstart", Nt);
        }, Vi = function() {
          gt(window, "selectstart", Nt);
        };
      else {
        var ji = Fn(
          ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
        );
        Wi = function() {
          if (ji) {
            var i = document.documentElement.style;
            Hs = i[ji], i[ji] = "none";
          }
        }, Vi = function() {
          ji && (document.documentElement.style[ji] = Hs, Hs = void 0);
        };
      }
      function Ws() {
        q(window, "dragstart", Nt);
      }
      function Vs() {
        gt(window, "dragstart", Nt);
      }
      var Nn, js;
      function Us(i) {
        for (; i.tabIndex === -1; )
          i = i.parentNode;
        i.style && (Zn(), Nn = i, js = i.style.outlineStyle, i.style.outlineStyle = "none", q(window, "keydown", Zn));
      }
      function Zn() {
        Nn && (Nn.style.outlineStyle = js, Nn = void 0, js = void 0, gt(window, "keydown", Zn));
      }
      function pr(i) {
        do
          i = i.parentNode;
        while ((!i.offsetWidth || !i.offsetHeight) && i !== document.body);
        return i;
      }
      function Gs(i) {
        var l = i.getBoundingClientRect();
        return {
          x: l.width / i.offsetWidth || 1,
          y: l.height / i.offsetHeight || 1,
          boundingClientRect: l
        };
      }
      var Bh = {
        __proto__: null,
        TRANSFORM: Fs,
        TRANSITION: Zi,
        TRANSITION_END: dr,
        get: fr,
        getStyle: Hi,
        create: lt,
        remove: Mt,
        empty: Bn,
        toFront: yi,
        toBack: bi,
        hasClass: Ns,
        addClass: $,
        removeClass: Tt,
        setClass: Zs,
        getClass: Rn,
        setOpacity: te,
        testProp: Fn,
        setTransform: Ke,
        setPosition: Ot,
        getPosition: Je,
        get disableTextSelection() {
          return Wi;
        },
        get enableTextSelection() {
          return Vi;
        },
        disableImageDrag: Ws,
        enableImageDrag: Vs,
        preventOutline: Us,
        restoreOutline: Zn,
        getSizedParentNode: pr,
        getScale: Gs
      };
      function q(i, l, u, f) {
        if (l && typeof l == "object")
          for (var m in l)
            qs(i, m, l[m], u);
        else {
          l = b(l);
          for (var y = 0, w = l.length; y < w; y++)
            qs(i, l[y], u, f);
        }
        return this;
      }
      var de = "_leaflet_events";
      function gt(i, l, u, f) {
        if (arguments.length === 1)
          gr(i), delete i[de];
        else if (l && typeof l == "object")
          for (var m in l)
            Xs(i, m, l[m], u);
        else if (l = b(l), arguments.length === 2)
          gr(i, function(k) {
            return O(l, k) !== -1;
          });
        else
          for (var y = 0, w = l.length; y < w; y++)
            Xs(i, l[y], u, f);
        return this;
      }
      function gr(i, l) {
        for (var u in i[de]) {
          var f = u.split(/\d/)[0];
          (!l || l(f)) && Xs(i, f, null, null, u);
        }
      }
      var Ys = {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        wheel: !("onwheel" in window) && "mousewheel"
      };
      function qs(i, l, u, f) {
        var m = l + c(u) + (f ? "_" + c(f) : "");
        if (i[de] && i[de][m])
          return this;
        var y = function(k) {
          return u.call(f || i, k || window.event);
        }, w = y;
        !W.touchNative && W.pointer && l.indexOf("touch") === 0 ? y = Ph(i, l, y) : W.touch && l === "dblclick" ? y = Ih(i, y) : "addEventListener" in i ? l === "touchstart" || l === "touchmove" || l === "wheel" || l === "mousewheel" ? i.addEventListener(Ys[l] || l, y, W.passiveEvents ? { passive: !1 } : !1) : l === "mouseenter" || l === "mouseleave" ? (y = function(k) {
          k = k || window.event, Js(i, k) && w(k);
        }, i.addEventListener(Ys[l], y, !1)) : i.addEventListener(l, w, !1) : i.attachEvent("on" + l, y), i[de] = i[de] || {}, i[de][m] = y;
      }
      function Xs(i, l, u, f, m) {
        m = m || l + c(u) + (f ? "_" + c(f) : "");
        var y = i[de] && i[de][m];
        if (!y)
          return this;
        !W.touchNative && W.pointer && l.indexOf("touch") === 0 ? kh(i, l, y) : W.touch && l === "dblclick" ? Dh(i, y) : "removeEventListener" in i ? i.removeEventListener(Ys[l] || l, y, !1) : i.detachEvent("on" + l, y), i[de][m] = null;
      }
      function $e(i) {
        return i.stopPropagation ? i.stopPropagation() : i.originalEvent ? i.originalEvent._stopped = !0 : i.cancelBubble = !0, this;
      }
      function Ks(i) {
        return qs(i, "wheel", $e), this;
      }
      function Ui(i) {
        return q(i, "mousedown touchstart dblclick contextmenu", $e), i._leaflet_disable_click = !0, this;
      }
      function Nt(i) {
        return i.preventDefault ? i.preventDefault() : i.returnValue = !1, this;
      }
      function Qe(i) {
        return Nt(i), $e(i), this;
      }
      function mr(i) {
        if (i.composedPath)
          return i.composedPath();
        for (var l = [], u = i.target; u; )
          l.push(u), u = u.parentNode;
        return l;
      }
      function _r(i, l) {
        if (!l)
          return new H(i.clientX, i.clientY);
        var u = Gs(l), f = u.boundingClientRect;
        return new H(
          // offset.left/top values are in page scale (like clientX/Y),
          // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
          (i.clientX - f.left) / u.x - l.clientLeft,
          (i.clientY - f.top) / u.y - l.clientTop
        );
      }
      var Rh = W.linux && W.chrome ? window.devicePixelRatio : W.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
      function vr(i) {
        return W.edge ? i.wheelDeltaY / 2 : (
          // Don't trust window-geometry-based delta
          i.deltaY && i.deltaMode === 0 ? -i.deltaY / Rh : (
            // Pixels
            i.deltaY && i.deltaMode === 1 ? -i.deltaY * 20 : (
              // Lines
              i.deltaY && i.deltaMode === 2 ? -i.deltaY * 60 : (
                // Pages
                i.deltaX || i.deltaZ ? 0 : (
                  // Skip horizontal/depth wheel events
                  i.wheelDelta ? (i.wheelDeltaY || i.wheelDelta) / 2 : (
                    // Legacy IE pixels
                    i.detail && Math.abs(i.detail) < 32765 ? -i.detail * 20 : (
                      // Legacy Moz lines
                      i.detail ? i.detail / -32765 * 60 : (
                        // Legacy Moz pages
                        0
                      )
                    )
                  )
                )
              )
            )
          )
        );
      }
      function Js(i, l) {
        var u = l.relatedTarget;
        if (!u)
          return !0;
        try {
          for (; u && u !== i; )
            u = u.parentNode;
        } catch {
          return !1;
        }
        return u !== i;
      }
      var Fh = {
        __proto__: null,
        on: q,
        off: gt,
        stopPropagation: $e,
        disableScrollPropagation: Ks,
        disableClickPropagation: Ui,
        preventDefault: Nt,
        stop: Qe,
        getPropagationPath: mr,
        getMousePosition: _r,
        getWheelDelta: vr,
        isExternalTarget: Js,
        addListener: q,
        removeListener: gt
      }, yr = dt.extend({
        // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
        // Run an animation of a given element to a new position, optionally setting
        // duration in seconds (`0.25` by default) and easing linearity factor (3rd
        // argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
        // `0.5` by default).
        run: function(i, l, u, f) {
          this.stop(), this._el = i, this._inProgress = !0, this._duration = u || 0.25, this._easeOutPower = 1 / Math.max(f || 0.5, 0.2), this._startPos = Je(i), this._offset = l.subtract(this._startPos), this._startTime = +/* @__PURE__ */ new Date(), this.fire("start"), this._animate();
        },
        // @method stop()
        // Stops the animation (if currently running).
        stop: function() {
          this._inProgress && (this._step(!0), this._complete());
        },
        _animate: function() {
          this._animId = Z(this._animate, this), this._step();
        },
        _step: function(i) {
          var l = +/* @__PURE__ */ new Date() - this._startTime, u = this._duration * 1e3;
          l < u ? this._runFrame(this._easeOut(l / u), i) : (this._runFrame(1), this._complete());
        },
        _runFrame: function(i, l) {
          var u = this._startPos.add(this._offset.multiplyBy(i));
          l && u._round(), Ot(this._el, u), this.fire("step");
        },
        _complete: function() {
          V(this._animId), this._inProgress = !1, this.fire("end");
        },
        _easeOut: function(i) {
          return 1 - Math.pow(1 - i, this._easeOutPower);
        }
      }), ot = dt.extend({
        options: {
          // @section Map State Options
          // @option crs: CRS = L.CRS.EPSG3857
          // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
          // sure what it means.
          crs: je,
          // @option center: LatLng = undefined
          // Initial geographic center of the map
          center: void 0,
          // @option zoom: Number = undefined
          // Initial map zoom level
          zoom: void 0,
          // @option minZoom: Number = *
          // Minimum zoom level of the map.
          // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
          // the lowest of their `minZoom` options will be used instead.
          minZoom: void 0,
          // @option maxZoom: Number = *
          // Maximum zoom level of the map.
          // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
          // the highest of their `maxZoom` options will be used instead.
          maxZoom: void 0,
          // @option layers: Layer[] = []
          // Array of layers that will be added to the map initially
          layers: [],
          // @option maxBounds: LatLngBounds = null
          // When this option is set, the map restricts the view to the given
          // geographical bounds, bouncing the user back if the user tries to pan
          // outside the view. To set the restriction dynamically, use
          // [`setMaxBounds`](#map-setmaxbounds) method.
          maxBounds: void 0,
          // @option renderer: Renderer = *
          // The default method for drawing vector layers on the map. `L.SVG`
          // or `L.Canvas` by default depending on browser support.
          renderer: void 0,
          // @section Animation Options
          // @option zoomAnimation: Boolean = true
          // Whether the map zoom animation is enabled. By default it's enabled
          // in all browsers that support CSS3 Transitions except Android.
          zoomAnimation: !0,
          // @option zoomAnimationThreshold: Number = 4
          // Won't animate zoom if the zoom difference exceeds this value.
          zoomAnimationThreshold: 4,
          // @option fadeAnimation: Boolean = true
          // Whether the tile fade animation is enabled. By default it's enabled
          // in all browsers that support CSS3 Transitions except Android.
          fadeAnimation: !0,
          // @option markerZoomAnimation: Boolean = true
          // Whether markers animate their zoom with the zoom animation, if disabled
          // they will disappear for the length of the animation. By default it's
          // enabled in all browsers that support CSS3 Transitions except Android.
          markerZoomAnimation: !0,
          // @option transform3DLimit: Number = 2^23
          // Defines the maximum size of a CSS translation transform. The default
          // value should not be changed unless a web browser positions layers in
          // the wrong place after doing a large `panBy`.
          transform3DLimit: 8388608,
          // Precision limit of a 32-bit float
          // @section Interaction Options
          // @option zoomSnap: Number = 1
          // Forces the map's zoom level to always be a multiple of this, particularly
          // right after a [`fitBounds()`](#map-fitbounds) or a pinch-zoom.
          // By default, the zoom level snaps to the nearest integer; lower values
          // (e.g. `0.5` or `0.1`) allow for greater granularity. A value of `0`
          // means the zoom level will not be snapped after `fitBounds` or a pinch-zoom.
          zoomSnap: 1,
          // @option zoomDelta: Number = 1
          // Controls how much the map's zoom level will change after a
          // [`zoomIn()`](#map-zoomin), [`zoomOut()`](#map-zoomout), pressing `+`
          // or `-` on the keyboard, or using the [zoom controls](#control-zoom).
          // Values smaller than `1` (e.g. `0.5`) allow for greater granularity.
          zoomDelta: 1,
          // @option trackResize: Boolean = true
          // Whether the map automatically handles browser window resize to update itself.
          trackResize: !0
        },
        initialize: function(i, l) {
          l = x(this, l), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(i), this._initLayout(), this._onResize = a(this._onResize, this), this._initEvents(), l.maxBounds && this.setMaxBounds(l.maxBounds), l.zoom !== void 0 && (this._zoom = this._limitZoom(l.zoom)), l.center && l.zoom !== void 0 && this.setView(U(l.center), l.zoom, { reset: !0 }), this.callInitHooks(), this._zoomAnimated = Zi && W.any3d && !W.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), q(this._proxy, dr, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
        },
        // @section Methods for modifying map state
        // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
        // Sets the view of the map (geographical center and zoom) with the given
        // animation options.
        setView: function(i, l, u) {
          if (l = l === void 0 ? this._zoom : this._limitZoom(l), i = this._limitCenter(U(i), l, this.options.maxBounds), u = u || {}, this._stop(), this._loaded && !u.reset && u !== !0) {
            u.animate !== void 0 && (u.zoom = r({ animate: u.animate }, u.zoom), u.pan = r({ animate: u.animate, duration: u.duration }, u.pan));
            var f = this._zoom !== l ? this._tryAnimatedZoom && this._tryAnimatedZoom(i, l, u.zoom) : this._tryAnimatedPan(i, u.pan);
            if (f)
              return clearTimeout(this._sizeTimer), this;
          }
          return this._resetView(i, l, u.pan && u.pan.noMoveStart), this;
        },
        // @method setZoom(zoom: Number, options?: Zoom/pan options): this
        // Sets the zoom of the map.
        setZoom: function(i, l) {
          return this._loaded ? this.setView(this.getCenter(), i, { zoom: l }) : (this._zoom = i, this);
        },
        // @method zoomIn(delta?: Number, options?: Zoom options): this
        // Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
        zoomIn: function(i, l) {
          return i = i || (W.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom + i, l);
        },
        // @method zoomOut(delta?: Number, options?: Zoom options): this
        // Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
        zoomOut: function(i, l) {
          return i = i || (W.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom - i, l);
        },
        // @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
        // Zooms the map while keeping a specified geographical point on the map
        // stationary (e.g. used internally for scroll zoom and double-click zoom).
        // @alternative
        // @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
        // Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
        setZoomAround: function(i, l, u) {
          var f = this.getZoomScale(l), m = this.getSize().divideBy(2), y = i instanceof H ? i : this.latLngToContainerPoint(i), w = y.subtract(m).multiplyBy(1 - 1 / f), k = this.containerPointToLatLng(m.add(w));
          return this.setView(k, l, { zoom: u });
        },
        _getBoundsCenterZoom: function(i, l) {
          l = l || {}, i = i.getBounds ? i.getBounds() : at(i);
          var u = F(l.paddingTopLeft || l.padding || [0, 0]), f = F(l.paddingBottomRight || l.padding || [0, 0]), m = this.getBoundsZoom(i, !1, u.add(f));
          if (m = typeof l.maxZoom == "number" ? Math.min(l.maxZoom, m) : m, m === 1 / 0)
            return {
              center: i.getCenter(),
              zoom: m
            };
          var y = f.subtract(u).divideBy(2), w = this.project(i.getSouthWest(), m), k = this.project(i.getNorthEast(), m), C = this.unproject(w.add(k).divideBy(2).add(y), m);
          return {
            center: C,
            zoom: m
          };
        },
        // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
        // Sets a map view that contains the given geographical bounds with the
        // maximum zoom level possible.
        fitBounds: function(i, l) {
          if (i = at(i), !i.isValid())
            throw new Error("Bounds are not valid.");
          var u = this._getBoundsCenterZoom(i, l);
          return this.setView(u.center, u.zoom, l);
        },
        // @method fitWorld(options?: fitBounds options): this
        // Sets a map view that mostly contains the whole world with the maximum
        // zoom level possible.
        fitWorld: function(i) {
          return this.fitBounds([[-90, -180], [90, 180]], i);
        },
        // @method panTo(latlng: LatLng, options?: Pan options): this
        // Pans the map to a given center.
        panTo: function(i, l) {
          return this.setView(i, this._zoom, { pan: l });
        },
        // @method panBy(offset: Point, options?: Pan options): this
        // Pans the map by a given number of pixels (animated).
        panBy: function(i, l) {
          if (i = F(i).round(), l = l || {}, !i.x && !i.y)
            return this.fire("moveend");
          if (l.animate !== !0 && !this.getSize().contains(i))
            return this._resetView(this.unproject(this.project(this.getCenter()).add(i)), this.getZoom()), this;
          if (this._panAnim || (this._panAnim = new yr(), this._panAnim.on({
            step: this._onPanTransitionStep,
            end: this._onPanTransitionEnd
          }, this)), l.noMoveStart || this.fire("movestart"), l.animate !== !1) {
            $(this._mapPane, "leaflet-pan-anim");
            var u = this._getMapPanePos().subtract(i).round();
            this._panAnim.run(this._mapPane, u, l.duration || 0.25, l.easeLinearity);
          } else
            this._rawPanBy(i), this.fire("move").fire("moveend");
          return this;
        },
        // @method flyTo(latlng: LatLng, zoom?: Number, options?: Zoom/pan options): this
        // Sets the view of the map (geographical center and zoom) performing a smooth
        // pan-zoom animation.
        flyTo: function(i, l, u) {
          if (u = u || {}, u.animate === !1 || !W.any3d)
            return this.setView(i, l, u);
          this._stop();
          var f = this.project(this.getCenter()), m = this.project(i), y = this.getSize(), w = this._zoom;
          i = U(i), l = l === void 0 ? w : l;
          var k = Math.max(y.x, y.y), C = k * this.getZoomScale(w, l), E = m.distanceTo(f) || 1, R = 1.42, j = R * R;
          function tt(Et) {
            var $n = Et ? -1 : 1, kc = Et ? C : k, Sc = C * C - k * k + $n * j * j * E * E, Cc = 2 * kc * j * E, lo = Sc / Cc, Qr = Math.sqrt(lo * lo + 1) - lo, Tc = Qr < 1e-9 ? -18 : Math.log(Qr);
            return Tc;
          }
          function jt(Et) {
            return (Math.exp(Et) - Math.exp(-Et)) / 2;
          }
          function Bt(Et) {
            return (Math.exp(Et) + Math.exp(-Et)) / 2;
          }
          function ie(Et) {
            return jt(Et) / Bt(Et);
          }
          var Ut = tt(0);
          function ki(Et) {
            return k * (Bt(Ut) / Bt(Ut + R * Et));
          }
          function wc(Et) {
            return k * (Bt(Ut) * ie(Ut + R * Et) - jt(Ut)) / j;
          }
          function Lc(Et) {
            return 1 - Math.pow(1 - Et, 1.5);
          }
          var Mc = Date.now(), Jr = (tt(1) - Ut) / R, Pc = u.duration ? 1e3 * u.duration : 1e3 * Jr * 0.8;
          function $r() {
            var Et = (Date.now() - Mc) / Pc, $n = Lc(Et) * Jr;
            Et <= 1 ? (this._flyToFrame = Z($r, this), this._move(
              this.unproject(f.add(m.subtract(f).multiplyBy(wc($n) / E)), w),
              this.getScaleZoom(k / ki($n), w),
              { flyTo: !0 }
            )) : this._move(i, l)._moveEnd(!0);
          }
          return this._moveStart(!0, u.noMoveStart), $r.call(this), this;
        },
        // @method flyToBounds(bounds: LatLngBounds, options?: fitBounds options): this
        // Sets the view of the map with a smooth animation like [`flyTo`](#map-flyto),
        // but takes a bounds parameter like [`fitBounds`](#map-fitbounds).
        flyToBounds: function(i, l) {
          var u = this._getBoundsCenterZoom(i, l);
          return this.flyTo(u.center, u.zoom, l);
        },
        // @method setMaxBounds(bounds: LatLngBounds): this
        // Restricts the map view to the given bounds (see the [maxBounds](#map-maxbounds) option).
        setMaxBounds: function(i) {
          return i = at(i), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), i.isValid() ? (this.options.maxBounds = i, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this);
        },
        // @method setMinZoom(zoom: Number): this
        // Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
        setMinZoom: function(i) {
          var l = this.options.minZoom;
          return this.options.minZoom = i, this._loaded && l !== i && (this.fire("zoomlevelschange"), this.getZoom() < this.options.minZoom) ? this.setZoom(i) : this;
        },
        // @method setMaxZoom(zoom: Number): this
        // Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
        setMaxZoom: function(i) {
          var l = this.options.maxZoom;
          return this.options.maxZoom = i, this._loaded && l !== i && (this.fire("zoomlevelschange"), this.getZoom() > this.options.maxZoom) ? this.setZoom(i) : this;
        },
        // @method panInsideBounds(bounds: LatLngBounds, options?: Pan options): this
        // Pans the map to the closest view that would lie inside the given bounds (if it's not already), controlling the animation using the options specific, if any.
        panInsideBounds: function(i, l) {
          this._enforcingBounds = !0;
          var u = this.getCenter(), f = this._limitCenter(u, this._zoom, at(i));
          return u.equals(f) || this.panTo(f, l), this._enforcingBounds = !1, this;
        },
        // @method panInside(latlng: LatLng, options?: padding options): this
        // Pans the map the minimum amount to make the `latlng` visible. Use
        // padding options to fit the display to more restricted bounds.
        // If `latlng` is already within the (optionally padded) display bounds,
        // the map will not be panned.
        panInside: function(i, l) {
          l = l || {};
          var u = F(l.paddingTopLeft || l.padding || [0, 0]), f = F(l.paddingBottomRight || l.padding || [0, 0]), m = this.project(this.getCenter()), y = this.project(i), w = this.getPixelBounds(), k = ct([w.min.add(u), w.max.subtract(f)]), C = k.getSize();
          if (!k.contains(y)) {
            this._enforcingBounds = !0;
            var E = y.subtract(k.getCenter()), R = k.extend(y).getSize().subtract(C);
            m.x += E.x < 0 ? -R.x : R.x, m.y += E.y < 0 ? -R.y : R.y, this.panTo(this.unproject(m), l), this._enforcingBounds = !1;
          }
          return this;
        },
        // @method invalidateSize(options: Zoom/pan options): this
        // Checks if the map container size changed and updates the map if so —
        // call it after you've changed the map size dynamically, also animating
        // pan by default. If `options.pan` is `false`, panning will not occur.
        // If `options.debounceMoveend` is `true`, it will delay `moveend` event so
        // that it doesn't happen often even if the method is called many
        // times in a row.
        // @alternative
        // @method invalidateSize(animate: Boolean): this
        // Checks if the map container size changed and updates the map if so —
        // call it after you've changed the map size dynamically, also animating
        // pan by default.
        invalidateSize: function(i) {
          if (!this._loaded)
            return this;
          i = r({
            animate: !1,
            pan: !0
          }, i === !0 ? { animate: !0 } : i);
          var l = this.getSize();
          this._sizeChanged = !0, this._lastCenter = null;
          var u = this.getSize(), f = l.divideBy(2).round(), m = u.divideBy(2).round(), y = f.subtract(m);
          return !y.x && !y.y ? this : (i.animate && i.pan ? this.panBy(y) : (i.pan && this._rawPanBy(y), this.fire("move"), i.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(a(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
            oldSize: l,
            newSize: u
          }));
        },
        // @section Methods for modifying map state
        // @method stop(): this
        // Stops the currently running `panTo` or `flyTo` animation, if any.
        stop: function() {
          return this.setZoom(this._limitZoom(this._zoom)), this.options.zoomSnap || this.fire("viewreset"), this._stop();
        },
        // @section Geolocation methods
        // @method locate(options?: Locate options): this
        // Tries to locate the user using the Geolocation API, firing a [`locationfound`](#map-locationfound)
        // event with location data on success or a [`locationerror`](#map-locationerror) event on failure,
        // and optionally sets the map view to the user's location with respect to
        // detection accuracy (or to the world view if geolocation failed).
        // Note that, if your page doesn't use HTTPS, this method will fail in
        // modern browsers ([Chrome 50 and newer](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins))
        // See `Locate options` for more details.
        locate: function(i) {
          if (i = this._locateOptions = r({
            timeout: 1e4,
            watch: !1
            // setView: false
            // maxZoom: <Number>
            // maximumAge: 0
            // enableHighAccuracy: false
          }, i), !("geolocation" in navigator))
            return this._handleGeolocationError({
              code: 0,
              message: "Geolocation not supported."
            }), this;
          var l = a(this._handleGeolocationResponse, this), u = a(this._handleGeolocationError, this);
          return i.watch ? this._locationWatchId = navigator.geolocation.watchPosition(l, u, i) : navigator.geolocation.getCurrentPosition(l, u, i), this;
        },
        // @method stopLocate(): this
        // Stops watching location previously initiated by `map.locate({watch: true})`
        // and aborts resetting the map view if map.locate was called with
        // `{setView: true}`.
        stopLocate: function() {
          return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this;
        },
        _handleGeolocationError: function(i) {
          if (this._container._leaflet_id) {
            var l = i.code, u = i.message || (l === 1 ? "permission denied" : l === 2 ? "position unavailable" : "timeout");
            this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
              code: l,
              message: "Geolocation error: " + u + "."
            });
          }
        },
        _handleGeolocationResponse: function(i) {
          if (this._container._leaflet_id) {
            var l = i.coords.latitude, u = i.coords.longitude, f = new Q(l, u), m = f.toBounds(i.coords.accuracy * 2), y = this._locateOptions;
            if (y.setView) {
              var w = this.getBoundsZoom(m);
              this.setView(f, y.maxZoom ? Math.min(w, y.maxZoom) : w);
            }
            var k = {
              latlng: f,
              bounds: m,
              timestamp: i.timestamp
            };
            for (var C in i.coords)
              typeof i.coords[C] == "number" && (k[C] = i.coords[C]);
            this.fire("locationfound", k);
          }
        },
        // TODO Appropriate docs section?
        // @section Other Methods
        // @method addHandler(name: String, HandlerClass: Function): this
        // Adds a new `Handler` to the map, given its name and constructor function.
        addHandler: function(i, l) {
          if (!l)
            return this;
          var u = this[i] = new l(this);
          return this._handlers.push(u), this.options[i] && u.enable(), this;
        },
        // @method remove(): this
        // Destroys the map and clears all related event listeners.
        remove: function() {
          if (this._initEvents(!0), this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds), this._containerId !== this._container._leaflet_id)
            throw new Error("Map container is being reused by another instance");
          try {
            delete this._container._leaflet_id, delete this._containerId;
          } catch {
            this._container._leaflet_id = void 0, this._containerId = void 0;
          }
          this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), Mt(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest && (V(this._resizeRequest), this._resizeRequest = null), this._clearHandlers(), this._loaded && this.fire("unload");
          var i;
          for (i in this._layers)
            this._layers[i].remove();
          for (i in this._panes)
            Mt(this._panes[i]);
          return this._layers = [], this._panes = [], delete this._mapPane, delete this._renderer, this;
        },
        // @section Other Methods
        // @method createPane(name: String, container?: HTMLElement): HTMLElement
        // Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
        // then returns it. The pane is created as a child of `container`, or
        // as a child of the main map pane if not set.
        createPane: function(i, l) {
          var u = "leaflet-pane" + (i ? " leaflet-" + i.replace("Pane", "") + "-pane" : ""), f = lt("div", u, l || this._mapPane);
          return i && (this._panes[i] = f), f;
        },
        // @section Methods for Getting Map State
        // @method getCenter(): LatLng
        // Returns the geographical center of the map view
        getCenter: function() {
          return this._checkIfLoaded(), this._lastCenter && !this._moved() ? this._lastCenter.clone() : this.layerPointToLatLng(this._getCenterLayerPoint());
        },
        // @method getZoom(): Number
        // Returns the current zoom level of the map view
        getZoom: function() {
          return this._zoom;
        },
        // @method getBounds(): LatLngBounds
        // Returns the geographical bounds visible in the current map view
        getBounds: function() {
          var i = this.getPixelBounds(), l = this.unproject(i.getBottomLeft()), u = this.unproject(i.getTopRight());
          return new xt(l, u);
        },
        // @method getMinZoom(): Number
        // Returns the minimum zoom level of the map (if set in the `minZoom` option of the map or of any layers), or `0` by default.
        getMinZoom: function() {
          return this.options.minZoom === void 0 ? this._layersMinZoom || 0 : this.options.minZoom;
        },
        // @method getMaxZoom(): Number
        // Returns the maximum zoom level of the map (if set in the `maxZoom` option of the map or of any layers).
        getMaxZoom: function() {
          return this.options.maxZoom === void 0 ? this._layersMaxZoom === void 0 ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom;
        },
        // @method getBoundsZoom(bounds: LatLngBounds, inside?: Boolean, padding?: Point): Number
        // Returns the maximum zoom level on which the given bounds fit to the map
        // view in its entirety. If `inside` (optional) is set to `true`, the method
        // instead returns the minimum zoom level on which the map view fits into
        // the given bounds in its entirety.
        getBoundsZoom: function(i, l, u) {
          i = at(i), u = F(u || [0, 0]);
          var f = this.getZoom() || 0, m = this.getMinZoom(), y = this.getMaxZoom(), w = i.getNorthWest(), k = i.getSouthEast(), C = this.getSize().subtract(u), E = ct(this.project(k, f), this.project(w, f)).getSize(), R = W.any3d ? this.options.zoomSnap : 1, j = C.x / E.x, tt = C.y / E.y, jt = l ? Math.max(j, tt) : Math.min(j, tt);
          return f = this.getScaleZoom(jt, f), R && (f = Math.round(f / (R / 100)) * (R / 100), f = l ? Math.ceil(f / R) * R : Math.floor(f / R) * R), Math.max(m, Math.min(y, f));
        },
        // @method getSize(): Point
        // Returns the current size of the map container (in pixels).
        getSize: function() {
          return (!this._size || this._sizeChanged) && (this._size = new H(
            this._container.clientWidth || 0,
            this._container.clientHeight || 0
          ), this._sizeChanged = !1), this._size.clone();
        },
        // @method getPixelBounds(): Bounds
        // Returns the bounds of the current map view in projected pixel
        // coordinates (sometimes useful in layer and overlay implementations).
        getPixelBounds: function(i, l) {
          var u = this._getTopLeftPoint(i, l);
          return new G(u, u.add(this.getSize()));
        },
        // TODO: Check semantics - isn't the pixel origin the 0,0 coord relative to
        // the map pane? "left point of the map layer" can be confusing, specially
        // since there can be negative offsets.
        // @method getPixelOrigin(): Point
        // Returns the projected pixel coordinates of the top left point of
        // the map layer (useful in custom layer and overlay implementations).
        getPixelOrigin: function() {
          return this._checkIfLoaded(), this._pixelOrigin;
        },
        // @method getPixelWorldBounds(zoom?: Number): Bounds
        // Returns the world's bounds in pixel coordinates for zoom level `zoom`.
        // If `zoom` is omitted, the map's current zoom level is used.
        getPixelWorldBounds: function(i) {
          return this.options.crs.getProjectedBounds(i === void 0 ? this.getZoom() : i);
        },
        // @section Other Methods
        // @method getPane(pane: String|HTMLElement): HTMLElement
        // Returns a [map pane](#map-pane), given its name or its HTML element (its identity).
        getPane: function(i) {
          return typeof i == "string" ? this._panes[i] : i;
        },
        // @method getPanes(): Object
        // Returns a plain object containing the names of all [panes](#map-pane) as keys and
        // the panes as values.
        getPanes: function() {
          return this._panes;
        },
        // @method getContainer: HTMLElement
        // Returns the HTML element that contains the map.
        getContainer: function() {
          return this._container;
        },
        // @section Conversion Methods
        // @method getZoomScale(toZoom: Number, fromZoom: Number): Number
        // Returns the scale factor to be applied to a map transition from zoom level
        // `fromZoom` to `toZoom`. Used internally to help with zoom animations.
        getZoomScale: function(i, l) {
          var u = this.options.crs;
          return l = l === void 0 ? this._zoom : l, u.scale(i) / u.scale(l);
        },
        // @method getScaleZoom(scale: Number, fromZoom: Number): Number
        // Returns the zoom level that the map would end up at, if it is at `fromZoom`
        // level and everything is scaled by a factor of `scale`. Inverse of
        // [`getZoomScale`](#map-getZoomScale).
        getScaleZoom: function(i, l) {
          var u = this.options.crs;
          l = l === void 0 ? this._zoom : l;
          var f = u.zoom(i * u.scale(l));
          return isNaN(f) ? 1 / 0 : f;
        },
        // @method project(latlng: LatLng, zoom: Number): Point
        // Projects a geographical coordinate `LatLng` according to the projection
        // of the map's CRS, then scales it according to `zoom` and the CRS's
        // `Transformation`. The result is pixel coordinate relative to
        // the CRS origin.
        project: function(i, l) {
          return l = l === void 0 ? this._zoom : l, this.options.crs.latLngToPoint(U(i), l);
        },
        // @method unproject(point: Point, zoom: Number): LatLng
        // Inverse of [`project`](#map-project).
        unproject: function(i, l) {
          return l = l === void 0 ? this._zoom : l, this.options.crs.pointToLatLng(F(i), l);
        },
        // @method layerPointToLatLng(point: Point): LatLng
        // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
        // returns the corresponding geographical coordinate (for the current zoom level).
        layerPointToLatLng: function(i) {
          var l = F(i).add(this.getPixelOrigin());
          return this.unproject(l);
        },
        // @method latLngToLayerPoint(latlng: LatLng): Point
        // Given a geographical coordinate, returns the corresponding pixel coordinate
        // relative to the [origin pixel](#map-getpixelorigin).
        latLngToLayerPoint: function(i) {
          var l = this.project(U(i))._round();
          return l._subtract(this.getPixelOrigin());
        },
        // @method wrapLatLng(latlng: LatLng): LatLng
        // Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
        // map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
        // CRS's bounds.
        // By default this means longitude is wrapped around the dateline so its
        // value is between -180 and +180 degrees.
        wrapLatLng: function(i) {
          return this.options.crs.wrapLatLng(U(i));
        },
        // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
        // Returns a `LatLngBounds` with the same size as the given one, ensuring that
        // its center is within the CRS's bounds.
        // By default this means the center longitude is wrapped around the dateline so its
        // value is between -180 and +180 degrees, and the majority of the bounds
        // overlaps the CRS's bounds.
        wrapLatLngBounds: function(i) {
          return this.options.crs.wrapLatLngBounds(at(i));
        },
        // @method distance(latlng1: LatLng, latlng2: LatLng): Number
        // Returns the distance between two geographical coordinates according to
        // the map's CRS. By default this measures distance in meters.
        distance: function(i, l) {
          return this.options.crs.distance(U(i), U(l));
        },
        // @method containerPointToLayerPoint(point: Point): Point
        // Given a pixel coordinate relative to the map container, returns the corresponding
        // pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
        containerPointToLayerPoint: function(i) {
          return F(i).subtract(this._getMapPanePos());
        },
        // @method layerPointToContainerPoint(point: Point): Point
        // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
        // returns the corresponding pixel coordinate relative to the map container.
        layerPointToContainerPoint: function(i) {
          return F(i).add(this._getMapPanePos());
        },
        // @method containerPointToLatLng(point: Point): LatLng
        // Given a pixel coordinate relative to the map container, returns
        // the corresponding geographical coordinate (for the current zoom level).
        containerPointToLatLng: function(i) {
          var l = this.containerPointToLayerPoint(F(i));
          return this.layerPointToLatLng(l);
        },
        // @method latLngToContainerPoint(latlng: LatLng): Point
        // Given a geographical coordinate, returns the corresponding pixel coordinate
        // relative to the map container.
        latLngToContainerPoint: function(i) {
          return this.layerPointToContainerPoint(this.latLngToLayerPoint(U(i)));
        },
        // @method mouseEventToContainerPoint(ev: MouseEvent): Point
        // Given a MouseEvent object, returns the pixel coordinate relative to the
        // map container where the event took place.
        mouseEventToContainerPoint: function(i) {
          return _r(i, this._container);
        },
        // @method mouseEventToLayerPoint(ev: MouseEvent): Point
        // Given a MouseEvent object, returns the pixel coordinate relative to
        // the [origin pixel](#map-getpixelorigin) where the event took place.
        mouseEventToLayerPoint: function(i) {
          return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(i));
        },
        // @method mouseEventToLatLng(ev: MouseEvent): LatLng
        // Given a MouseEvent object, returns geographical coordinate where the
        // event took place.
        mouseEventToLatLng: function(i) {
          return this.layerPointToLatLng(this.mouseEventToLayerPoint(i));
        },
        // map initialization methods
        _initContainer: function(i) {
          var l = this._container = fr(i);
          if (l) {
            if (l._leaflet_id)
              throw new Error("Map container is already initialized.");
          } else
            throw new Error("Map container not found.");
          q(l, "scroll", this._onScroll, this), this._containerId = c(l);
        },
        _initLayout: function() {
          var i = this._container;
          this._fadeAnimated = this.options.fadeAnimation && W.any3d, $(i, "leaflet-container" + (W.touch ? " leaflet-touch" : "") + (W.retina ? " leaflet-retina" : "") + (W.ielt9 ? " leaflet-oldie" : "") + (W.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
          var l = Hi(i, "position");
          l !== "absolute" && l !== "relative" && l !== "fixed" && l !== "sticky" && (i.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
        },
        _initPanes: function() {
          var i = this._panes = {};
          this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), Ot(this._mapPane, new H(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || ($(i.markerPane, "leaflet-zoom-hide"), $(i.shadowPane, "leaflet-zoom-hide"));
        },
        // private methods that modify map state
        // @section Map state change events
        _resetView: function(i, l, u) {
          Ot(this._mapPane, new H(0, 0));
          var f = !this._loaded;
          this._loaded = !0, l = this._limitZoom(l), this.fire("viewprereset");
          var m = this._zoom !== l;
          this._moveStart(m, u)._move(i, l)._moveEnd(m), this.fire("viewreset"), f && this.fire("load");
        },
        _moveStart: function(i, l) {
          return i && this.fire("zoomstart"), l || this.fire("movestart"), this;
        },
        _move: function(i, l, u, f) {
          l === void 0 && (l = this._zoom);
          var m = this._zoom !== l;
          return this._zoom = l, this._lastCenter = i, this._pixelOrigin = this._getNewPixelOrigin(i), f ? u && u.pinch && this.fire("zoom", u) : ((m || u && u.pinch) && this.fire("zoom", u), this.fire("move", u)), this;
        },
        _moveEnd: function(i) {
          return i && this.fire("zoomend"), this.fire("moveend");
        },
        _stop: function() {
          return V(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
        },
        _rawPanBy: function(i) {
          Ot(this._mapPane, this._getMapPanePos().subtract(i));
        },
        _getZoomSpan: function() {
          return this.getMaxZoom() - this.getMinZoom();
        },
        _panInsideMaxBounds: function() {
          this._enforcingBounds || this.panInsideBounds(this.options.maxBounds);
        },
        _checkIfLoaded: function() {
          if (!this._loaded)
            throw new Error("Set map center and zoom first.");
        },
        // DOM event handling
        // @section Interaction events
        _initEvents: function(i) {
          this._targets = {}, this._targets[c(this._container)] = this;
          var l = i ? gt : q;
          l(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && l(window, "resize", this._onResize, this), W.any3d && this.options.transform3DLimit && (i ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
        },
        _onResize: function() {
          V(this._resizeRequest), this._resizeRequest = Z(
            function() {
              this.invalidateSize({ debounceMoveend: !0 });
            },
            this
          );
        },
        _onScroll: function() {
          this._container.scrollTop = 0, this._container.scrollLeft = 0;
        },
        _onMoveEnd: function() {
          var i = this._getMapPanePos();
          Math.max(Math.abs(i.x), Math.abs(i.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom());
        },
        _findEventTargets: function(i, l) {
          for (var u = [], f, m = l === "mouseout" || l === "mouseover", y = i.target || i.srcElement, w = !1; y; ) {
            if (f = this._targets[c(y)], f && (l === "click" || l === "preclick") && this._draggableMoved(f)) {
              w = !0;
              break;
            }
            if (f && f.listens(l, !0) && (m && !Js(y, i) || (u.push(f), m)) || y === this._container)
              break;
            y = y.parentNode;
          }
          return !u.length && !w && !m && this.listens(l, !0) && (u = [this]), u;
        },
        _isClickDisabled: function(i) {
          for (; i && i !== this._container; ) {
            if (i._leaflet_disable_click)
              return !0;
            i = i.parentNode;
          }
        },
        _handleDOMEvent: function(i) {
          var l = i.target || i.srcElement;
          if (!(!this._loaded || l._leaflet_disable_events || i.type === "click" && this._isClickDisabled(l))) {
            var u = i.type;
            u === "mousedown" && Us(l), this._fireDOMEvent(i, u);
          }
        },
        _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
        _fireDOMEvent: function(i, l, u) {
          if (i.type === "click") {
            var f = r({}, i);
            f.type = "preclick", this._fireDOMEvent(f, f.type, u);
          }
          var m = this._findEventTargets(i, l);
          if (u) {
            for (var y = [], w = 0; w < u.length; w++)
              u[w].listens(l, !0) && y.push(u[w]);
            m = y.concat(m);
          }
          if (m.length) {
            l === "contextmenu" && Nt(i);
            var k = m[0], C = {
              originalEvent: i
            };
            if (i.type !== "keypress" && i.type !== "keydown" && i.type !== "keyup") {
              var E = k.getLatLng && (!k._radius || k._radius <= 10);
              C.containerPoint = E ? this.latLngToContainerPoint(k.getLatLng()) : this.mouseEventToContainerPoint(i), C.layerPoint = this.containerPointToLayerPoint(C.containerPoint), C.latlng = E ? k.getLatLng() : this.layerPointToLatLng(C.layerPoint);
            }
            for (w = 0; w < m.length; w++)
              if (m[w].fire(l, C, !0), C.originalEvent._stopped || m[w].options.bubblingMouseEvents === !1 && O(this._mouseEvents, l) !== -1)
                return;
          }
        },
        _draggableMoved: function(i) {
          return i = i.dragging && i.dragging.enabled() ? i : this, i.dragging && i.dragging.moved() || this.boxZoom && this.boxZoom.moved();
        },
        _clearHandlers: function() {
          for (var i = 0, l = this._handlers.length; i < l; i++)
            this._handlers[i].disable();
        },
        // @section Other Methods
        // @method whenReady(fn: Function, context?: Object): this
        // Runs the given function `fn` when the map gets initialized with
        // a view (center and zoom) and at least one layer, or immediately
        // if it's already initialized, optionally passing a function context.
        whenReady: function(i, l) {
          return this._loaded ? i.call(l || this, { target: this }) : this.on("load", i, l), this;
        },
        // private methods for getting map state
        _getMapPanePos: function() {
          return Je(this._mapPane) || new H(0, 0);
        },
        _moved: function() {
          var i = this._getMapPanePos();
          return i && !i.equals([0, 0]);
        },
        _getTopLeftPoint: function(i, l) {
          var u = i && l !== void 0 ? this._getNewPixelOrigin(i, l) : this.getPixelOrigin();
          return u.subtract(this._getMapPanePos());
        },
        _getNewPixelOrigin: function(i, l) {
          var u = this.getSize()._divideBy(2);
          return this.project(i, l)._subtract(u)._add(this._getMapPanePos())._round();
        },
        _latLngToNewLayerPoint: function(i, l, u) {
          var f = this._getNewPixelOrigin(u, l);
          return this.project(i, l)._subtract(f);
        },
        _latLngBoundsToNewLayerBounds: function(i, l, u) {
          var f = this._getNewPixelOrigin(u, l);
          return ct([
            this.project(i.getSouthWest(), l)._subtract(f),
            this.project(i.getNorthWest(), l)._subtract(f),
            this.project(i.getSouthEast(), l)._subtract(f),
            this.project(i.getNorthEast(), l)._subtract(f)
          ]);
        },
        // layer point of the current center
        _getCenterLayerPoint: function() {
          return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
        },
        // offset of the specified place to the current center in pixels
        _getCenterOffset: function(i) {
          return this.latLngToLayerPoint(i).subtract(this._getCenterLayerPoint());
        },
        // adjust center for view to get inside bounds
        _limitCenter: function(i, l, u) {
          if (!u)
            return i;
          var f = this.project(i, l), m = this.getSize().divideBy(2), y = new G(f.subtract(m), f.add(m)), w = this._getBoundsOffset(y, u, l);
          return Math.abs(w.x) <= 1 && Math.abs(w.y) <= 1 ? i : this.unproject(f.add(w), l);
        },
        // adjust offset for view to get inside bounds
        _limitOffset: function(i, l) {
          if (!l)
            return i;
          var u = this.getPixelBounds(), f = new G(u.min.add(i), u.max.add(i));
          return i.add(this._getBoundsOffset(f, l));
        },
        // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
        _getBoundsOffset: function(i, l, u) {
          var f = ct(
            this.project(l.getNorthEast(), u),
            this.project(l.getSouthWest(), u)
          ), m = f.min.subtract(i.min), y = f.max.subtract(i.max), w = this._rebound(m.x, -y.x), k = this._rebound(m.y, -y.y);
          return new H(w, k);
        },
        _rebound: function(i, l) {
          return i + l > 0 ? Math.round(i - l) / 2 : Math.max(0, Math.ceil(i)) - Math.max(0, Math.floor(l));
        },
        _limitZoom: function(i) {
          var l = this.getMinZoom(), u = this.getMaxZoom(), f = W.any3d ? this.options.zoomSnap : 1;
          return f && (i = Math.round(i / f) * f), Math.max(l, Math.min(u, i));
        },
        _onPanTransitionStep: function() {
          this.fire("move");
        },
        _onPanTransitionEnd: function() {
          Tt(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
        },
        _tryAnimatedPan: function(i, l) {
          var u = this._getCenterOffset(i)._trunc();
          return (l && l.animate) !== !0 && !this.getSize().contains(u) ? !1 : (this.panBy(u, l), !0);
        },
        _createAnimProxy: function() {
          var i = this._proxy = lt("div", "leaflet-proxy leaflet-zoom-animated");
          this._panes.mapPane.appendChild(i), this.on("zoomanim", function(l) {
            var u = Fs, f = this._proxy.style[u];
            Ke(this._proxy, this.project(l.center, l.zoom), this.getZoomScale(l.zoom, 1)), f === this._proxy.style[u] && this._animatingZoom && this._onZoomTransitionEnd();
          }, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
        },
        _destroyAnimProxy: function() {
          Mt(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
        },
        _animMoveEnd: function() {
          var i = this.getCenter(), l = this.getZoom();
          Ke(this._proxy, this.project(i, l), this.getZoomScale(l, 1));
        },
        _catchTransitionEnd: function(i) {
          this._animatingZoom && i.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd();
        },
        _nothingToAnimate: function() {
          return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
        },
        _tryAnimatedZoom: function(i, l, u) {
          if (this._animatingZoom)
            return !0;
          if (u = u || {}, !this._zoomAnimated || u.animate === !1 || this._nothingToAnimate() || Math.abs(l - this._zoom) > this.options.zoomAnimationThreshold)
            return !1;
          var f = this.getZoomScale(l), m = this._getCenterOffset(i)._divideBy(1 - 1 / f);
          return u.animate !== !0 && !this.getSize().contains(m) ? !1 : (Z(function() {
            this._moveStart(!0, u.noMoveStart || !1)._animateZoom(i, l, !0);
          }, this), !0);
        },
        _animateZoom: function(i, l, u, f) {
          this._mapPane && (u && (this._animatingZoom = !0, this._animateToCenter = i, this._animateToZoom = l, $(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
            center: i,
            zoom: l,
            noUpdate: f
          }), this._tempFireZoomEvent || (this._tempFireZoomEvent = this._zoom !== this._animateToZoom), this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(a(this._onZoomTransitionEnd, this), 250));
        },
        _onZoomTransitionEnd: function() {
          this._animatingZoom && (this._mapPane && Tt(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
        }
      });
      function Nh(i, l) {
        return new ot(i, l);
      }
      var oe = et.extend({
        // @section
        // @aka Control Options
        options: {
          // @option position: String = 'topright'
          // The position of the control (one of the map corners). Possible values are `'topleft'`,
          // `'topright'`, `'bottomleft'` or `'bottomright'`
          position: "topright"
        },
        initialize: function(i) {
          x(this, i);
        },
        /* @section
         * Classes extending L.Control will inherit the following methods:
         *
         * @method getPosition: string
         * Returns the position of the control.
         */
        getPosition: function() {
          return this.options.position;
        },
        // @method setPosition(position: string): this
        // Sets the position of the control.
        setPosition: function(i) {
          var l = this._map;
          return l && l.removeControl(this), this.options.position = i, l && l.addControl(this), this;
        },
        // @method getContainer: HTMLElement
        // Returns the HTMLElement that contains the control.
        getContainer: function() {
          return this._container;
        },
        // @method addTo(map: Map): this
        // Adds the control to the given map.
        addTo: function(i) {
          this.remove(), this._map = i;
          var l = this._container = this.onAdd(i), u = this.getPosition(), f = i._controlCorners[u];
          return $(l, "leaflet-control"), u.indexOf("bottom") !== -1 ? f.insertBefore(l, f.firstChild) : f.appendChild(l), this._map.on("unload", this.remove, this), this;
        },
        // @method remove: this
        // Removes the control from the map it is currently active on.
        remove: function() {
          return this._map ? (Mt(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), this._map = null, this) : this;
        },
        _refocusOnMap: function(i) {
          this._map && i && i.screenX > 0 && i.screenY > 0 && this._map.getContainer().focus();
        }
      }), Gi = function(i) {
        return new oe(i);
      };
      ot.include({
        // @method addControl(control: Control): this
        // Adds the given control to the map
        addControl: function(i) {
          return i.addTo(this), this;
        },
        // @method removeControl(control: Control): this
        // Removes the given control from the map
        removeControl: function(i) {
          return i.remove(), this;
        },
        _initControlPos: function() {
          var i = this._controlCorners = {}, l = "leaflet-", u = this._controlContainer = lt("div", l + "control-container", this._container);
          function f(m, y) {
            var w = l + m + " " + l + y;
            i[m + y] = lt("div", w, u);
          }
          f("top", "left"), f("top", "right"), f("bottom", "left"), f("bottom", "right");
        },
        _clearControlPos: function() {
          for (var i in this._controlCorners)
            Mt(this._controlCorners[i]);
          Mt(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
        }
      });
      var br = oe.extend({
        // @section
        // @aka Control.Layers options
        options: {
          // @option collapsed: Boolean = true
          // If `true`, the control will be collapsed into an icon and expanded on mouse hover, touch, or keyboard activation.
          collapsed: !0,
          position: "topright",
          // @option autoZIndex: Boolean = true
          // If `true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.
          autoZIndex: !0,
          // @option hideSingleBase: Boolean = false
          // If `true`, the base layers in the control will be hidden when there is only one.
          hideSingleBase: !1,
          // @option sortLayers: Boolean = false
          // Whether to sort the layers. When `false`, layers will keep the order
          // in which they were added to the control.
          sortLayers: !1,
          // @option sortFunction: Function = *
          // A [compare function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
          // that will be used for sorting the layers, when `sortLayers` is `true`.
          // The function receives both the `L.Layer` instances and their names, as in
          // `sortFunction(layerA, layerB, nameA, nameB)`.
          // By default, it sorts layers alphabetically by their name.
          sortFunction: function(i, l, u, f) {
            return u < f ? -1 : f < u ? 1 : 0;
          }
        },
        initialize: function(i, l, u) {
          x(this, u), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, this._preventClick = !1;
          for (var f in i)
            this._addLayer(i[f], f);
          for (f in l)
            this._addLayer(l[f], f, !0);
        },
        onAdd: function(i) {
          this._initLayout(), this._update(), this._map = i, i.on("zoomend", this._checkDisabledLayers, this);
          for (var l = 0; l < this._layers.length; l++)
            this._layers[l].layer.on("add remove", this._onLayerChange, this);
          return this._container;
        },
        addTo: function(i) {
          return oe.prototype.addTo.call(this, i), this._expandIfNotCollapsed();
        },
        onRemove: function() {
          this._map.off("zoomend", this._checkDisabledLayers, this);
          for (var i = 0; i < this._layers.length; i++)
            this._layers[i].layer.off("add remove", this._onLayerChange, this);
        },
        // @method addBaseLayer(layer: Layer, name: String): this
        // Adds a base layer (radio button entry) with the given name to the control.
        addBaseLayer: function(i, l) {
          return this._addLayer(i, l), this._map ? this._update() : this;
        },
        // @method addOverlay(layer: Layer, name: String): this
        // Adds an overlay (checkbox entry) with the given name to the control.
        addOverlay: function(i, l) {
          return this._addLayer(i, l, !0), this._map ? this._update() : this;
        },
        // @method removeLayer(layer: Layer): this
        // Remove the given layer from the control.
        removeLayer: function(i) {
          i.off("add remove", this._onLayerChange, this);
          var l = this._getLayer(c(i));
          return l && this._layers.splice(this._layers.indexOf(l), 1), this._map ? this._update() : this;
        },
        // @method expand(): this
        // Expand the control container if collapsed.
        expand: function() {
          $(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
          var i = this._map.getSize().y - (this._container.offsetTop + 50);
          return i < this._section.clientHeight ? ($(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = i + "px") : Tt(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
        },
        // @method collapse(): this
        // Collapse the control container if expanded.
        collapse: function() {
          return Tt(this._container, "leaflet-control-layers-expanded"), this;
        },
        _initLayout: function() {
          var i = "leaflet-control-layers", l = this._container = lt("div", i), u = this.options.collapsed;
          l.setAttribute("aria-haspopup", !0), Ui(l), Ks(l);
          var f = this._section = lt("section", i + "-list");
          u && (this._map.on("click", this.collapse, this), q(l, {
            mouseenter: this._expandSafely,
            mouseleave: this.collapse
          }, this));
          var m = this._layersLink = lt("a", i + "-toggle", l);
          m.href = "#", m.title = "Layers", m.setAttribute("role", "button"), q(m, {
            keydown: function(y) {
              y.keyCode === 13 && this._expandSafely();
            },
            // Certain screen readers intercept the key event and instead send a click event
            click: function(y) {
              Nt(y), this._expandSafely();
            }
          }, this), u || this.expand(), this._baseLayersList = lt("div", i + "-base", f), this._separator = lt("div", i + "-separator", f), this._overlaysList = lt("div", i + "-overlays", f), l.appendChild(f);
        },
        _getLayer: function(i) {
          for (var l = 0; l < this._layers.length; l++)
            if (this._layers[l] && c(this._layers[l].layer) === i)
              return this._layers[l];
        },
        _addLayer: function(i, l, u) {
          this._map && i.on("add remove", this._onLayerChange, this), this._layers.push({
            layer: i,
            name: l,
            overlay: u
          }), this.options.sortLayers && this._layers.sort(a(function(f, m) {
            return this.options.sortFunction(f.layer, m.layer, f.name, m.name);
          }, this)), this.options.autoZIndex && i.setZIndex && (this._lastZIndex++, i.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed();
        },
        _update: function() {
          if (!this._container)
            return this;
          Bn(this._baseLayersList), Bn(this._overlaysList), this._layerControlInputs = [];
          var i, l, u, f, m = 0;
          for (u = 0; u < this._layers.length; u++)
            f = this._layers[u], this._addItem(f), l = l || f.overlay, i = i || !f.overlay, m += f.overlay ? 0 : 1;
          return this.options.hideSingleBase && (i = i && m > 1, this._baseLayersList.style.display = i ? "" : "none"), this._separator.style.display = l && i ? "" : "none", this;
        },
        _onLayerChange: function(i) {
          this._handlingClick || this._update();
          var l = this._getLayer(c(i.target)), u = l.overlay ? i.type === "add" ? "overlayadd" : "overlayremove" : i.type === "add" ? "baselayerchange" : null;
          u && this._map.fire(u, l);
        },
        // IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see https://stackoverflow.com/a/119079)
        _createRadioElement: function(i, l) {
          var u = '<input type="radio" class="leaflet-control-layers-selector" name="' + i + '"' + (l ? ' checked="checked"' : "") + "/>", f = document.createElement("div");
          return f.innerHTML = u, f.firstChild;
        },
        _addItem: function(i) {
          var l = document.createElement("label"), u = this._map.hasLayer(i.layer), f;
          i.overlay ? (f = document.createElement("input"), f.type = "checkbox", f.className = "leaflet-control-layers-selector", f.defaultChecked = u) : f = this._createRadioElement("leaflet-base-layers_" + c(this), u), this._layerControlInputs.push(f), f.layerId = c(i.layer), q(f, "click", this._onInputClick, this);
          var m = document.createElement("span");
          m.innerHTML = " " + i.name;
          var y = document.createElement("span");
          l.appendChild(y), y.appendChild(f), y.appendChild(m);
          var w = i.overlay ? this._overlaysList : this._baseLayersList;
          return w.appendChild(l), this._checkDisabledLayers(), l;
        },
        _onInputClick: function() {
          if (!this._preventClick) {
            var i = this._layerControlInputs, l, u, f = [], m = [];
            this._handlingClick = !0;
            for (var y = i.length - 1; y >= 0; y--)
              l = i[y], u = this._getLayer(l.layerId).layer, l.checked ? f.push(u) : l.checked || m.push(u);
            for (y = 0; y < m.length; y++)
              this._map.hasLayer(m[y]) && this._map.removeLayer(m[y]);
            for (y = 0; y < f.length; y++)
              this._map.hasLayer(f[y]) || this._map.addLayer(f[y]);
            this._handlingClick = !1, this._refocusOnMap();
          }
        },
        _checkDisabledLayers: function() {
          for (var i = this._layerControlInputs, l, u, f = this._map.getZoom(), m = i.length - 1; m >= 0; m--)
            l = i[m], u = this._getLayer(l.layerId).layer, l.disabled = u.options.minZoom !== void 0 && f < u.options.minZoom || u.options.maxZoom !== void 0 && f > u.options.maxZoom;
        },
        _expandIfNotCollapsed: function() {
          return this._map && !this.options.collapsed && this.expand(), this;
        },
        _expandSafely: function() {
          var i = this._section;
          this._preventClick = !0, q(i, "click", Nt), this.expand();
          var l = this;
          setTimeout(function() {
            gt(i, "click", Nt), l._preventClick = !1;
          });
        }
      }), Zh = function(i, l, u) {
        return new br(i, l, u);
      }, $s = oe.extend({
        // @section
        // @aka Control.Zoom options
        options: {
          position: "topleft",
          // @option zoomInText: String = '<span aria-hidden="true">+</span>'
          // The text set on the 'zoom in' button.
          zoomInText: '<span aria-hidden="true">+</span>',
          // @option zoomInTitle: String = 'Zoom in'
          // The title set on the 'zoom in' button.
          zoomInTitle: "Zoom in",
          // @option zoomOutText: String = '<span aria-hidden="true">&#x2212;</span>'
          // The text set on the 'zoom out' button.
          zoomOutText: '<span aria-hidden="true">&#x2212;</span>',
          // @option zoomOutTitle: String = 'Zoom out'
          // The title set on the 'zoom out' button.
          zoomOutTitle: "Zoom out"
        },
        onAdd: function(i) {
          var l = "leaflet-control-zoom", u = lt("div", l + " leaflet-bar"), f = this.options;
          return this._zoomInButton = this._createButton(
            f.zoomInText,
            f.zoomInTitle,
            l + "-in",
            u,
            this._zoomIn
          ), this._zoomOutButton = this._createButton(
            f.zoomOutText,
            f.zoomOutTitle,
            l + "-out",
            u,
            this._zoomOut
          ), this._updateDisabled(), i.on("zoomend zoomlevelschange", this._updateDisabled, this), u;
        },
        onRemove: function(i) {
          i.off("zoomend zoomlevelschange", this._updateDisabled, this);
        },
        disable: function() {
          return this._disabled = !0, this._updateDisabled(), this;
        },
        enable: function() {
          return this._disabled = !1, this._updateDisabled(), this;
        },
        _zoomIn: function(i) {
          !this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (i.shiftKey ? 3 : 1));
        },
        _zoomOut: function(i) {
          !this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (i.shiftKey ? 3 : 1));
        },
        _createButton: function(i, l, u, f, m) {
          var y = lt("a", u, f);
          return y.innerHTML = i, y.href = "#", y.title = l, y.setAttribute("role", "button"), y.setAttribute("aria-label", l), Ui(y), q(y, "click", Qe), q(y, "click", m, this), q(y, "click", this._refocusOnMap, this), y;
        },
        _updateDisabled: function() {
          var i = this._map, l = "leaflet-disabled";
          Tt(this._zoomInButton, l), Tt(this._zoomOutButton, l), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || i._zoom === i.getMinZoom()) && ($(this._zoomOutButton, l), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || i._zoom === i.getMaxZoom()) && ($(this._zoomInButton, l), this._zoomInButton.setAttribute("aria-disabled", "true"));
        }
      });
      ot.mergeOptions({
        zoomControl: !0
      }), ot.addInitHook(function() {
        this.options.zoomControl && (this.zoomControl = new $s(), this.addControl(this.zoomControl));
      });
      var Hh = function(i) {
        return new $s(i);
      }, xr = oe.extend({
        // @section
        // @aka Control.Scale options
        options: {
          position: "bottomleft",
          // @option maxWidth: Number = 100
          // Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).
          maxWidth: 100,
          // @option metric: Boolean = True
          // Whether to show the metric scale line (m/km).
          metric: !0,
          // @option imperial: Boolean = True
          // Whether to show the imperial scale line (mi/ft).
          imperial: !0
          // @option updateWhenIdle: Boolean = false
          // If `true`, the control is updated on [`moveend`](#map-moveend), otherwise it's always up-to-date (updated on [`move`](#map-move)).
        },
        onAdd: function(i) {
          var l = "leaflet-control-scale", u = lt("div", l), f = this.options;
          return this._addScales(f, l + "-line", u), i.on(f.updateWhenIdle ? "moveend" : "move", this._update, this), i.whenReady(this._update, this), u;
        },
        onRemove: function(i) {
          i.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
        },
        _addScales: function(i, l, u) {
          i.metric && (this._mScale = lt("div", l, u)), i.imperial && (this._iScale = lt("div", l, u));
        },
        _update: function() {
          var i = this._map, l = i.getSize().y / 2, u = i.distance(
            i.containerPointToLatLng([0, l]),
            i.containerPointToLatLng([this.options.maxWidth, l])
          );
          this._updateScales(u);
        },
        _updateScales: function(i) {
          this.options.metric && i && this._updateMetric(i), this.options.imperial && i && this._updateImperial(i);
        },
        _updateMetric: function(i) {
          var l = this._getRoundNum(i), u = l < 1e3 ? l + " m" : l / 1e3 + " km";
          this._updateScale(this._mScale, u, l / i);
        },
        _updateImperial: function(i) {
          var l = i * 3.2808399, u, f, m;
          l > 5280 ? (u = l / 5280, f = this._getRoundNum(u), this._updateScale(this._iScale, f + " mi", f / u)) : (m = this._getRoundNum(l), this._updateScale(this._iScale, m + " ft", m / l));
        },
        _updateScale: function(i, l, u) {
          i.style.width = Math.round(this.options.maxWidth * u) + "px", i.innerHTML = l;
        },
        _getRoundNum: function(i) {
          var l = Math.pow(10, (Math.floor(i) + "").length - 1), u = i / l;
          return u = u >= 10 ? 10 : u >= 5 ? 5 : u >= 3 ? 3 : u >= 2 ? 2 : 1, l * u;
        }
      }), Wh = function(i) {
        return new xr(i);
      }, Vh = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>', Qs = oe.extend({
        // @section
        // @aka Control.Attribution options
        options: {
          position: "bottomright",
          // @option prefix: String|false = 'Leaflet'
          // The HTML text shown before the attributions. Pass `false` to disable.
          prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (W.inlineSvg ? Vh + " " : "") + "Leaflet</a>"
        },
        initialize: function(i) {
          x(this, i), this._attributions = {};
        },
        onAdd: function(i) {
          i.attributionControl = this, this._container = lt("div", "leaflet-control-attribution"), Ui(this._container);
          for (var l in i._layers)
            i._layers[l].getAttribution && this.addAttribution(i._layers[l].getAttribution());
          return this._update(), i.on("layeradd", this._addAttribution, this), this._container;
        },
        onRemove: function(i) {
          i.off("layeradd", this._addAttribution, this);
        },
        _addAttribution: function(i) {
          i.layer.getAttribution && (this.addAttribution(i.layer.getAttribution()), i.layer.once("remove", function() {
            this.removeAttribution(i.layer.getAttribution());
          }, this));
        },
        // @method setPrefix(prefix: String|false): this
        // The HTML text shown before the attributions. Pass `false` to disable.
        setPrefix: function(i) {
          return this.options.prefix = i, this._update(), this;
        },
        // @method addAttribution(text: String): this
        // Adds an attribution text (e.g. `'&copy; OpenStreetMap contributors'`).
        addAttribution: function(i) {
          return i ? (this._attributions[i] || (this._attributions[i] = 0), this._attributions[i]++, this._update(), this) : this;
        },
        // @method removeAttribution(text: String): this
        // Removes an attribution text.
        removeAttribution: function(i) {
          return i ? (this._attributions[i] && (this._attributions[i]--, this._update()), this) : this;
        },
        _update: function() {
          if (this._map) {
            var i = [];
            for (var l in this._attributions)
              this._attributions[l] && i.push(l);
            var u = [];
            this.options.prefix && u.push(this.options.prefix), i.length && u.push(i.join(", ")), this._container.innerHTML = u.join(' <span aria-hidden="true">|</span> ');
          }
        }
      });
      ot.mergeOptions({
        attributionControl: !0
      }), ot.addInitHook(function() {
        this.options.attributionControl && new Qs().addTo(this);
      });
      var jh = function(i) {
        return new Qs(i);
      };
      oe.Layers = br, oe.Zoom = $s, oe.Scale = xr, oe.Attribution = Qs, Gi.layers = Zh, Gi.zoom = Hh, Gi.scale = Wh, Gi.attribution = jh;
      var fe = et.extend({
        initialize: function(i) {
          this._map = i;
        },
        // @method enable(): this
        // Enables the handler
        enable: function() {
          return this._enabled ? this : (this._enabled = !0, this.addHooks(), this);
        },
        // @method disable(): this
        // Disables the handler
        disable: function() {
          return this._enabled ? (this._enabled = !1, this.removeHooks(), this) : this;
        },
        // @method enabled(): Boolean
        // Returns `true` if the handler is enabled
        enabled: function() {
          return !!this._enabled;
        }
        // @section Extension methods
        // Classes inheriting from `Handler` must implement the two following methods:
        // @method addHooks()
        // Called when the handler is enabled, should add event hooks.
        // @method removeHooks()
        // Called when the handler is disabled, should remove the event hooks added previously.
      });
      fe.addTo = function(i, l) {
        return i.addHandler(l, this), this;
      };
      var Uh = { Events: J }, wr = W.touch ? "touchstart mousedown" : "mousedown", Ie = dt.extend({
        options: {
          // @section
          // @aka Draggable options
          // @option clickTolerance: Number = 3
          // The max number of pixels a user can shift the mouse pointer during a click
          // for it to be considered a valid click (as opposed to a mouse drag).
          clickTolerance: 3
        },
        // @constructor L.Draggable(el: HTMLElement, dragHandle?: HTMLElement, preventOutline?: Boolean, options?: Draggable options)
        // Creates a `Draggable` object for moving `el` when you start dragging the `dragHandle` element (equals `el` itself by default).
        initialize: function(i, l, u, f) {
          x(this, f), this._element = i, this._dragStartTarget = l || i, this._preventOutline = u;
        },
        // @method enable()
        // Enables the dragging ability
        enable: function() {
          this._enabled || (q(this._dragStartTarget, wr, this._onDown, this), this._enabled = !0);
        },
        // @method disable()
        // Disables the dragging ability
        disable: function() {
          this._enabled && (Ie._dragging === this && this.finishDrag(!0), gt(this._dragStartTarget, wr, this._onDown, this), this._enabled = !1, this._moved = !1);
        },
        _onDown: function(i) {
          if (this._enabled && (this._moved = !1, !Ns(this._element, "leaflet-zoom-anim"))) {
            if (i.touches && i.touches.length !== 1) {
              Ie._dragging === this && this.finishDrag();
              return;
            }
            if (!(Ie._dragging || i.shiftKey || i.which !== 1 && i.button !== 1 && !i.touches) && (Ie._dragging = this, this._preventOutline && Us(this._element), Ws(), Wi(), !this._moving)) {
              this.fire("down");
              var l = i.touches ? i.touches[0] : i, u = pr(this._element);
              this._startPoint = new H(l.clientX, l.clientY), this._startPos = Je(this._element), this._parentScale = Gs(u);
              var f = i.type === "mousedown";
              q(document, f ? "mousemove" : "touchmove", this._onMove, this), q(document, f ? "mouseup" : "touchend touchcancel", this._onUp, this);
            }
          }
        },
        _onMove: function(i) {
          if (this._enabled) {
            if (i.touches && i.touches.length > 1) {
              this._moved = !0;
              return;
            }
            var l = i.touches && i.touches.length === 1 ? i.touches[0] : i, u = new H(l.clientX, l.clientY)._subtract(this._startPoint);
            !u.x && !u.y || Math.abs(u.x) + Math.abs(u.y) < this.options.clickTolerance || (u.x /= this._parentScale.x, u.y /= this._parentScale.y, Nt(i), this._moved || (this.fire("dragstart"), this._moved = !0, $(document.body, "leaflet-dragging"), this._lastTarget = i.target || i.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), $(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(u), this._moving = !0, this._lastEvent = i, this._updatePosition());
          }
        },
        _updatePosition: function() {
          var i = { originalEvent: this._lastEvent };
          this.fire("predrag", i), Ot(this._element, this._newPos), this.fire("drag", i);
        },
        _onUp: function() {
          this._enabled && this.finishDrag();
        },
        finishDrag: function(i) {
          Tt(document.body, "leaflet-dragging"), this._lastTarget && (Tt(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null), gt(document, "mousemove touchmove", this._onMove, this), gt(document, "mouseup touchend touchcancel", this._onUp, this), Vs(), Vi();
          var l = this._moved && this._moving;
          this._moving = !1, Ie._dragging = !1, l && this.fire("dragend", {
            noInertia: i,
            distance: this._newPos.distanceTo(this._startPos)
          });
        }
      });
      function Lr(i, l, u) {
        var f, m = [1, 4, 2, 8], y, w, k, C, E, R, j, tt;
        for (y = 0, R = i.length; y < R; y++)
          i[y]._code = ti(i[y], l);
        for (k = 0; k < 4; k++) {
          for (j = m[k], f = [], y = 0, R = i.length, w = R - 1; y < R; w = y++)
            C = i[y], E = i[w], C._code & j ? E._code & j || (tt = Hn(E, C, j, l, u), tt._code = ti(tt, l), f.push(tt)) : (E._code & j && (tt = Hn(E, C, j, l, u), tt._code = ti(tt, l), f.push(tt)), f.push(C));
          i = f;
        }
        return i;
      }
      function Mr(i, l) {
        var u, f, m, y, w, k, C, E, R;
        if (!i || i.length === 0)
          throw new Error("latlngs not passed");
        ee(i) || (console.warn("latlngs are not flat! Only the first ring will be used"), i = i[0]);
        var j = U([0, 0]), tt = at(i), jt = tt.getNorthWest().distanceTo(tt.getSouthWest()) * tt.getNorthEast().distanceTo(tt.getNorthWest());
        jt < 1700 && (j = to(i));
        var Bt = i.length, ie = [];
        for (u = 0; u < Bt; u++) {
          var Ut = U(i[u]);
          ie.push(l.project(U([Ut.lat - j.lat, Ut.lng - j.lng])));
        }
        for (k = C = E = 0, u = 0, f = Bt - 1; u < Bt; f = u++)
          m = ie[u], y = ie[f], w = m.y * y.x - y.y * m.x, C += (m.x + y.x) * w, E += (m.y + y.y) * w, k += w * 3;
        k === 0 ? R = ie[0] : R = [C / k, E / k];
        var ki = l.unproject(F(R));
        return U([ki.lat + j.lat, ki.lng + j.lng]);
      }
      function to(i) {
        for (var l = 0, u = 0, f = 0, m = 0; m < i.length; m++) {
          var y = U(i[m]);
          l += y.lat, u += y.lng, f++;
        }
        return U([l / f, u / f]);
      }
      var Gh = {
        __proto__: null,
        clipPolygon: Lr,
        polygonCenter: Mr,
        centroid: to
      };
      function Pr(i, l) {
        if (!l || !i.length)
          return i.slice();
        var u = l * l;
        return i = Xh(i, u), i = qh(i, u), i;
      }
      function kr(i, l, u) {
        return Math.sqrt(Yi(i, l, u, !0));
      }
      function Yh(i, l, u) {
        return Yi(i, l, u);
      }
      function qh(i, l) {
        var u = i.length, f = typeof Uint8Array != void 0 + "" ? Uint8Array : Array, m = new f(u);
        m[0] = m[u - 1] = 1, eo(i, m, l, 0, u - 1);
        var y, w = [];
        for (y = 0; y < u; y++)
          m[y] && w.push(i[y]);
        return w;
      }
      function eo(i, l, u, f, m) {
        var y = 0, w, k, C;
        for (k = f + 1; k <= m - 1; k++)
          C = Yi(i[k], i[f], i[m], !0), C > y && (w = k, y = C);
        y > u && (l[w] = 1, eo(i, l, u, f, w), eo(i, l, u, w, m));
      }
      function Xh(i, l) {
        for (var u = [i[0]], f = 1, m = 0, y = i.length; f < y; f++)
          Kh(i[f], i[m]) > l && (u.push(i[f]), m = f);
        return m < y - 1 && u.push(i[y - 1]), u;
      }
      var Sr;
      function Cr(i, l, u, f, m) {
        var y = f ? Sr : ti(i, u), w = ti(l, u), k, C, E;
        for (Sr = w; ; ) {
          if (!(y | w))
            return [i, l];
          if (y & w)
            return !1;
          k = y || w, C = Hn(i, l, k, u, m), E = ti(C, u), k === y ? (i = C, y = E) : (l = C, w = E);
        }
      }
      function Hn(i, l, u, f, m) {
        var y = l.x - i.x, w = l.y - i.y, k = f.min, C = f.max, E, R;
        return u & 8 ? (E = i.x + y * (C.y - i.y) / w, R = C.y) : u & 4 ? (E = i.x + y * (k.y - i.y) / w, R = k.y) : u & 2 ? (E = C.x, R = i.y + w * (C.x - i.x) / y) : u & 1 && (E = k.x, R = i.y + w * (k.x - i.x) / y), new H(E, R, m);
      }
      function ti(i, l) {
        var u = 0;
        return i.x < l.min.x ? u |= 1 : i.x > l.max.x && (u |= 2), i.y < l.min.y ? u |= 4 : i.y > l.max.y && (u |= 8), u;
      }
      function Kh(i, l) {
        var u = l.x - i.x, f = l.y - i.y;
        return u * u + f * f;
      }
      function Yi(i, l, u, f) {
        var m = l.x, y = l.y, w = u.x - m, k = u.y - y, C = w * w + k * k, E;
        return C > 0 && (E = ((i.x - m) * w + (i.y - y) * k) / C, E > 1 ? (m = u.x, y = u.y) : E > 0 && (m += w * E, y += k * E)), w = i.x - m, k = i.y - y, f ? w * w + k * k : new H(m, y);
      }
      function ee(i) {
        return !A(i[0]) || typeof i[0][0] != "object" && typeof i[0][0] < "u";
      }
      function Tr(i) {
        return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), ee(i);
      }
      function Ar(i, l) {
        var u, f, m, y, w, k, C, E;
        if (!i || i.length === 0)
          throw new Error("latlngs not passed");
        ee(i) || (console.warn("latlngs are not flat! Only the first ring will be used"), i = i[0]);
        var R = U([0, 0]), j = at(i), tt = j.getNorthWest().distanceTo(j.getSouthWest()) * j.getNorthEast().distanceTo(j.getNorthWest());
        tt < 1700 && (R = to(i));
        var jt = i.length, Bt = [];
        for (u = 0; u < jt; u++) {
          var ie = U(i[u]);
          Bt.push(l.project(U([ie.lat - R.lat, ie.lng - R.lng])));
        }
        for (u = 0, f = 0; u < jt - 1; u++)
          f += Bt[u].distanceTo(Bt[u + 1]) / 2;
        if (f === 0)
          E = Bt[0];
        else
          for (u = 0, y = 0; u < jt - 1; u++)
            if (w = Bt[u], k = Bt[u + 1], m = w.distanceTo(k), y += m, y > f) {
              C = (y - f) / m, E = [
                k.x - C * (k.x - w.x),
                k.y - C * (k.y - w.y)
              ];
              break;
            }
        var Ut = l.unproject(F(E));
        return U([Ut.lat + R.lat, Ut.lng + R.lng]);
      }
      var Jh = {
        __proto__: null,
        simplify: Pr,
        pointToSegmentDistance: kr,
        closestPointOnSegment: Yh,
        clipSegment: Cr,
        _getEdgeIntersection: Hn,
        _getBitCode: ti,
        _sqClosestPointOnSegment: Yi,
        isFlat: ee,
        _flat: Tr,
        polylineCenter: Ar
      }, io = {
        project: function(i) {
          return new H(i.lng, i.lat);
        },
        unproject: function(i) {
          return new Q(i.y, i.x);
        },
        bounds: new G([-180, -90], [180, 90])
      }, no = {
        R: 6378137,
        R_MINOR: 6356752314245179e-9,
        bounds: new G([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
        project: function(i) {
          var l = Math.PI / 180, u = this.R, f = i.lat * l, m = this.R_MINOR / u, y = Math.sqrt(1 - m * m), w = y * Math.sin(f), k = Math.tan(Math.PI / 4 - f / 2) / Math.pow((1 - w) / (1 + w), y / 2);
          return f = -u * Math.log(Math.max(k, 1e-10)), new H(i.lng * l * u, f);
        },
        unproject: function(i) {
          for (var l = 180 / Math.PI, u = this.R, f = this.R_MINOR / u, m = Math.sqrt(1 - f * f), y = Math.exp(-i.y / u), w = Math.PI / 2 - 2 * Math.atan(y), k = 0, C = 0.1, E; k < 15 && Math.abs(C) > 1e-7; k++)
            E = m * Math.sin(w), E = Math.pow((1 - E) / (1 + E), m / 2), C = Math.PI / 2 - 2 * Math.atan(y * E) - w, w += C;
          return new Q(w * l, i.x * l / u);
        }
      }, $h = {
        __proto__: null,
        LonLat: io,
        Mercator: no,
        SphericalMercator: Ve
      }, Qh = r({}, Vt, {
        code: "EPSG:3395",
        projection: no,
        transformation: function() {
          var i = 0.5 / (Math.PI * no.R);
          return ce(i, 0.5, -i, 0.5);
        }()
      }), Or = r({}, Vt, {
        code: "EPSG:4326",
        projection: io,
        transformation: ce(1 / 180, 1, -1 / 180, 0.5)
      }), tc = r({}, qt, {
        projection: io,
        transformation: ce(1, 0, -1, 0),
        scale: function(i) {
          return Math.pow(2, i);
        },
        zoom: function(i) {
          return Math.log(i) / Math.LN2;
        },
        distance: function(i, l) {
          var u = l.lng - i.lng, f = l.lat - i.lat;
          return Math.sqrt(u * u + f * f);
        },
        infinite: !0
      });
      qt.Earth = Vt, qt.EPSG3395 = Qh, qt.EPSG3857 = je, qt.EPSG900913 = zi, qt.EPSG4326 = Or, qt.Simple = tc;
      var re = dt.extend({
        // Classes extending `L.Layer` will inherit the following options:
        options: {
          // @option pane: String = 'overlayPane'
          // By default the layer will be added to the map's [overlay pane](#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default.
          pane: "overlayPane",
          // @option attribution: String = null
          // String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers.
          attribution: null,
          bubblingMouseEvents: !0
        },
        /* @section
         * Classes extending `L.Layer` will inherit the following methods:
         *
         * @method addTo(map: Map|LayerGroup): this
         * Adds the layer to the given map or layer group.
         */
        addTo: function(i) {
          return i.addLayer(this), this;
        },
        // @method remove: this
        // Removes the layer from the map it is currently active on.
        remove: function() {
          return this.removeFrom(this._map || this._mapToAdd);
        },
        // @method removeFrom(map: Map): this
        // Removes the layer from the given map
        //
        // @alternative
        // @method removeFrom(group: LayerGroup): this
        // Removes the layer from the given `LayerGroup`
        removeFrom: function(i) {
          return i && i.removeLayer(this), this;
        },
        // @method getPane(name? : String): HTMLElement
        // Returns the `HTMLElement` representing the named pane on the map. If `name` is omitted, returns the pane for this layer.
        getPane: function(i) {
          return this._map.getPane(i ? this.options[i] || i : this.options.pane);
        },
        addInteractiveTarget: function(i) {
          return this._map._targets[c(i)] = this, this;
        },
        removeInteractiveTarget: function(i) {
          return delete this._map._targets[c(i)], this;
        },
        // @method getAttribution: String
        // Used by the `attribution control`, returns the [attribution option](#gridlayer-attribution).
        getAttribution: function() {
          return this.options.attribution;
        },
        _layerAdd: function(i) {
          var l = i.target;
          if (l.hasLayer(this)) {
            if (this._map = l, this._zoomAnimated = l._zoomAnimated, this.getEvents) {
              var u = this.getEvents();
              l.on(u, this), this.once("remove", function() {
                l.off(u, this);
              }, this);
            }
            this.onAdd(l), this.fire("add"), l.fire("layeradd", { layer: this });
          }
        }
      });
      ot.include({
        // @method addLayer(layer: Layer): this
        // Adds the given layer to the map
        addLayer: function(i) {
          if (!i._layerAdd)
            throw new Error("The provided object is not a Layer.");
          var l = c(i);
          return this._layers[l] ? this : (this._layers[l] = i, i._mapToAdd = this, i.beforeAdd && i.beforeAdd(this), this.whenReady(i._layerAdd, i), this);
        },
        // @method removeLayer(layer: Layer): this
        // Removes the given layer from the map.
        removeLayer: function(i) {
          var l = c(i);
          return this._layers[l] ? (this._loaded && i.onRemove(this), delete this._layers[l], this._loaded && (this.fire("layerremove", { layer: i }), i.fire("remove")), i._map = i._mapToAdd = null, this) : this;
        },
        // @method hasLayer(layer: Layer): Boolean
        // Returns `true` if the given layer is currently added to the map
        hasLayer: function(i) {
          return c(i) in this._layers;
        },
        /* @method eachLayer(fn: Function, context?: Object): this
         * Iterates over the layers of the map, optionally specifying context of the iterator function.
         * ```
         * map.eachLayer(function(layer){
         *     layer.bindPopup('Hello');
         * });
         * ```
         */
        eachLayer: function(i, l) {
          for (var u in this._layers)
            i.call(l, this._layers[u]);
          return this;
        },
        _addLayers: function(i) {
          i = i ? A(i) ? i : [i] : [];
          for (var l = 0, u = i.length; l < u; l++)
            this.addLayer(i[l]);
        },
        _addZoomLimit: function(i) {
          (!isNaN(i.options.maxZoom) || !isNaN(i.options.minZoom)) && (this._zoomBoundLayers[c(i)] = i, this._updateZoomLevels());
        },
        _removeZoomLimit: function(i) {
          var l = c(i);
          this._zoomBoundLayers[l] && (delete this._zoomBoundLayers[l], this._updateZoomLevels());
        },
        _updateZoomLevels: function() {
          var i = 1 / 0, l = -1 / 0, u = this._getZoomSpan();
          for (var f in this._zoomBoundLayers) {
            var m = this._zoomBoundLayers[f].options;
            i = m.minZoom === void 0 ? i : Math.min(i, m.minZoom), l = m.maxZoom === void 0 ? l : Math.max(l, m.maxZoom);
          }
          this._layersMaxZoom = l === -1 / 0 ? void 0 : l, this._layersMinZoom = i === 1 / 0 ? void 0 : i, u !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
        }
      });
      var xi = re.extend({
        initialize: function(i, l) {
          x(this, l), this._layers = {};
          var u, f;
          if (i)
            for (u = 0, f = i.length; u < f; u++)
              this.addLayer(i[u]);
        },
        // @method addLayer(layer: Layer): this
        // Adds the given layer to the group.
        addLayer: function(i) {
          var l = this.getLayerId(i);
          return this._layers[l] = i, this._map && this._map.addLayer(i), this;
        },
        // @method removeLayer(layer: Layer): this
        // Removes the given layer from the group.
        // @alternative
        // @method removeLayer(id: Number): this
        // Removes the layer with the given internal ID from the group.
        removeLayer: function(i) {
          var l = i in this._layers ? i : this.getLayerId(i);
          return this._map && this._layers[l] && this._map.removeLayer(this._layers[l]), delete this._layers[l], this;
        },
        // @method hasLayer(layer: Layer): Boolean
        // Returns `true` if the given layer is currently added to the group.
        // @alternative
        // @method hasLayer(id: Number): Boolean
        // Returns `true` if the given internal ID is currently added to the group.
        hasLayer: function(i) {
          var l = typeof i == "number" ? i : this.getLayerId(i);
          return l in this._layers;
        },
        // @method clearLayers(): this
        // Removes all the layers from the group.
        clearLayers: function() {
          return this.eachLayer(this.removeLayer, this);
        },
        // @method invoke(methodName: String, …): this
        // Calls `methodName` on every layer contained in this group, passing any
        // additional parameters. Has no effect if the layers contained do not
        // implement `methodName`.
        invoke: function(i) {
          var l = Array.prototype.slice.call(arguments, 1), u, f;
          for (u in this._layers)
            f = this._layers[u], f[i] && f[i].apply(f, l);
          return this;
        },
        onAdd: function(i) {
          this.eachLayer(i.addLayer, i);
        },
        onRemove: function(i) {
          this.eachLayer(i.removeLayer, i);
        },
        // @method eachLayer(fn: Function, context?: Object): this
        // Iterates over the layers of the group, optionally specifying context of the iterator function.
        // ```js
        // group.eachLayer(function (layer) {
        // 	layer.bindPopup('Hello');
        // });
        // ```
        eachLayer: function(i, l) {
          for (var u in this._layers)
            i.call(l, this._layers[u]);
          return this;
        },
        // @method getLayer(id: Number): Layer
        // Returns the layer with the given internal ID.
        getLayer: function(i) {
          return this._layers[i];
        },
        // @method getLayers(): Layer[]
        // Returns an array of all the layers added to the group.
        getLayers: function() {
          var i = [];
          return this.eachLayer(i.push, i), i;
        },
        // @method setZIndex(zIndex: Number): this
        // Calls `setZIndex` on every layer contained in this group, passing the z-index.
        setZIndex: function(i) {
          return this.invoke("setZIndex", i);
        },
        // @method getLayerId(layer: Layer): Number
        // Returns the internal ID for a layer
        getLayerId: function(i) {
          return c(i);
        }
      }), ec = function(i, l) {
        return new xi(i, l);
      }, ye = xi.extend({
        addLayer: function(i) {
          return this.hasLayer(i) ? this : (i.addEventParent(this), xi.prototype.addLayer.call(this, i), this.fire("layeradd", { layer: i }));
        },
        removeLayer: function(i) {
          return this.hasLayer(i) ? (i in this._layers && (i = this._layers[i]), i.removeEventParent(this), xi.prototype.removeLayer.call(this, i), this.fire("layerremove", { layer: i })) : this;
        },
        // @method setStyle(style: Path options): this
        // Sets the given path options to each layer of the group that has a `setStyle` method.
        setStyle: function(i) {
          return this.invoke("setStyle", i);
        },
        // @method bringToFront(): this
        // Brings the layer group to the top of all other layers
        bringToFront: function() {
          return this.invoke("bringToFront");
        },
        // @method bringToBack(): this
        // Brings the layer group to the back of all other layers
        bringToBack: function() {
          return this.invoke("bringToBack");
        },
        // @method getBounds(): LatLngBounds
        // Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).
        getBounds: function() {
          var i = new xt();
          for (var l in this._layers) {
            var u = this._layers[l];
            i.extend(u.getBounds ? u.getBounds() : u.getLatLng());
          }
          return i;
        }
      }), ic = function(i, l) {
        return new ye(i, l);
      }, wi = et.extend({
        /* @section
         * @aka Icon options
         *
         * @option iconUrl: String = null
         * **(required)** The URL to the icon image (absolute or relative to your script path).
         *
         * @option iconRetinaUrl: String = null
         * The URL to a retina sized version of the icon image (absolute or relative to your
         * script path). Used for Retina screen devices.
         *
         * @option iconSize: Point = null
         * Size of the icon image in pixels.
         *
         * @option iconAnchor: Point = null
         * The coordinates of the "tip" of the icon (relative to its top left corner). The icon
         * will be aligned so that this point is at the marker's geographical location. Centered
         * by default if size is specified, also can be set in CSS with negative margins.
         *
         * @option popupAnchor: Point = [0, 0]
         * The coordinates of the point from which popups will "open", relative to the icon anchor.
         *
         * @option tooltipAnchor: Point = [0, 0]
         * The coordinates of the point from which tooltips will "open", relative to the icon anchor.
         *
         * @option shadowUrl: String = null
         * The URL to the icon shadow image. If not specified, no shadow image will be created.
         *
         * @option shadowRetinaUrl: String = null
         *
         * @option shadowSize: Point = null
         * Size of the shadow image in pixels.
         *
         * @option shadowAnchor: Point = null
         * The coordinates of the "tip" of the shadow (relative to its top left corner) (the same
         * as iconAnchor if not specified).
         *
         * @option className: String = ''
         * A custom class name to assign to both icon and shadow images. Empty by default.
         */
        options: {
          popupAnchor: [0, 0],
          tooltipAnchor: [0, 0],
          // @option crossOrigin: Boolean|String = false
          // Whether the crossOrigin attribute will be added to the tiles.
          // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
          // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
          crossOrigin: !1
        },
        initialize: function(i) {
          x(this, i);
        },
        // @method createIcon(oldIcon?: HTMLElement): HTMLElement
        // Called internally when the icon has to be shown, returns a `<img>` HTML element
        // styled according to the options.
        createIcon: function(i) {
          return this._createIcon("icon", i);
        },
        // @method createShadow(oldIcon?: HTMLElement): HTMLElement
        // As `createIcon`, but for the shadow beneath it.
        createShadow: function(i) {
          return this._createIcon("shadow", i);
        },
        _createIcon: function(i, l) {
          var u = this._getIconUrl(i);
          if (!u) {
            if (i === "icon")
              throw new Error("iconUrl not set in Icon options (see the docs).");
            return null;
          }
          var f = this._createImg(u, l && l.tagName === "IMG" ? l : null);
          return this._setIconStyles(f, i), (this.options.crossOrigin || this.options.crossOrigin === "") && (f.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), f;
        },
        _setIconStyles: function(i, l) {
          var u = this.options, f = u[l + "Size"];
          typeof f == "number" && (f = [f, f]);
          var m = F(f), y = F(l === "shadow" && u.shadowAnchor || u.iconAnchor || m && m.divideBy(2, !0));
          i.className = "leaflet-marker-" + l + " " + (u.className || ""), y && (i.style.marginLeft = -y.x + "px", i.style.marginTop = -y.y + "px"), m && (i.style.width = m.x + "px", i.style.height = m.y + "px");
        },
        _createImg: function(i, l) {
          return l = l || document.createElement("img"), l.src = i, l;
        },
        _getIconUrl: function(i) {
          return W.retina && this.options[i + "RetinaUrl"] || this.options[i + "Url"];
        }
      });
      function nc(i) {
        return new wi(i);
      }
      var qi = wi.extend({
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
        _getIconUrl: function(i) {
          return typeof qi.imagePath != "string" && (qi.imagePath = this._detectIconPath()), (this.options.imagePath || qi.imagePath) + wi.prototype._getIconUrl.call(this, i);
        },
        _stripUrl: function(i) {
          var l = function(u, f, m) {
            var y = f.exec(u);
            return y && y[m];
          };
          return i = l(i, /^url\((['"])?(.+)\1\)$/, 2), i && l(i, /^(.*)marker-icon\.png$/, 1);
        },
        _detectIconPath: function() {
          var i = lt("div", "leaflet-default-icon-path", document.body), l = Hi(i, "background-image") || Hi(i, "backgroundImage");
          if (document.body.removeChild(i), l = this._stripUrl(l), l)
            return l;
          var u = document.querySelector('link[href$="leaflet.css"]');
          return u ? u.href.substring(0, u.href.length - 11 - 1) : "";
        }
      }), Er = fe.extend({
        initialize: function(i) {
          this._marker = i;
        },
        addHooks: function() {
          var i = this._marker._icon;
          this._draggable || (this._draggable = new Ie(i, i, !0)), this._draggable.on({
            dragstart: this._onDragStart,
            predrag: this._onPreDrag,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this).enable(), $(i, "leaflet-marker-draggable");
        },
        removeHooks: function() {
          this._draggable.off({
            dragstart: this._onDragStart,
            predrag: this._onPreDrag,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this).disable(), this._marker._icon && Tt(this._marker._icon, "leaflet-marker-draggable");
        },
        moved: function() {
          return this._draggable && this._draggable._moved;
        },
        _adjustPan: function(i) {
          var l = this._marker, u = l._map, f = this._marker.options.autoPanSpeed, m = this._marker.options.autoPanPadding, y = Je(l._icon), w = u.getPixelBounds(), k = u.getPixelOrigin(), C = ct(
            w.min._subtract(k).add(m),
            w.max._subtract(k).subtract(m)
          );
          if (!C.contains(y)) {
            var E = F(
              (Math.max(C.max.x, y.x) - C.max.x) / (w.max.x - C.max.x) - (Math.min(C.min.x, y.x) - C.min.x) / (w.min.x - C.min.x),
              (Math.max(C.max.y, y.y) - C.max.y) / (w.max.y - C.max.y) - (Math.min(C.min.y, y.y) - C.min.y) / (w.min.y - C.min.y)
            ).multiplyBy(f);
            u.panBy(E, { animate: !1 }), this._draggable._newPos._add(E), this._draggable._startPos._add(E), Ot(l._icon, this._draggable._newPos), this._onDrag(i), this._panRequest = Z(this._adjustPan.bind(this, i));
          }
        },
        _onDragStart: function() {
          this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
        },
        _onPreDrag: function(i) {
          this._marker.options.autoPan && (V(this._panRequest), this._panRequest = Z(this._adjustPan.bind(this, i)));
        },
        _onDrag: function(i) {
          var l = this._marker, u = l._shadow, f = Je(l._icon), m = l._map.layerPointToLatLng(f);
          u && Ot(u, f), l._latlng = m, i.latlng = m, i.oldLatLng = this._oldLatLng, l.fire("move", i).fire("drag", i);
        },
        _onDragEnd: function(i) {
          V(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", i);
        }
      }), Wn = re.extend({
        // @section
        // @aka Marker options
        options: {
          // @option icon: Icon = *
          // Icon instance to use for rendering the marker.
          // See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
          // If not specified, a common instance of `L.Icon.Default` is used.
          icon: new qi(),
          // Option inherited from "Interactive layer" abstract class
          interactive: !0,
          // @option keyboard: Boolean = true
          // Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.
          keyboard: !0,
          // @option title: String = ''
          // Text for the browser tooltip that appear on marker hover (no tooltip by default).
          // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
          title: "",
          // @option alt: String = 'Marker'
          // Text for the `alt` attribute of the icon image.
          // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
          alt: "Marker",
          // @option zIndexOffset: Number = 0
          // By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like `1000` (or high negative value, respectively).
          zIndexOffset: 0,
          // @option opacity: Number = 1.0
          // The opacity of the marker.
          opacity: 1,
          // @option riseOnHover: Boolean = false
          // If `true`, the marker will get on top of others when you hover the mouse over it.
          riseOnHover: !1,
          // @option riseOffset: Number = 250
          // The z-index offset used for the `riseOnHover` feature.
          riseOffset: 250,
          // @option pane: String = 'markerPane'
          // `Map pane` where the markers icon will be added.
          pane: "markerPane",
          // @option shadowPane: String = 'shadowPane'
          // `Map pane` where the markers shadow will be added.
          shadowPane: "shadowPane",
          // @option bubblingMouseEvents: Boolean = false
          // When `true`, a mouse event on this marker will trigger the same event on the map
          // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
          bubblingMouseEvents: !1,
          // @option autoPanOnFocus: Boolean = true
          // When `true`, the map will pan whenever the marker is focused (via
          // e.g. pressing `tab` on the keyboard) to ensure the marker is
          // visible within the map's bounds
          autoPanOnFocus: !0,
          // @section Draggable marker options
          // @option draggable: Boolean = false
          // Whether the marker is draggable with mouse/touch or not.
          draggable: !1,
          // @option autoPan: Boolean = false
          // Whether to pan the map when dragging this marker near its edge or not.
          autoPan: !1,
          // @option autoPanPadding: Point = Point(50, 50)
          // Distance (in pixels to the left/right and to the top/bottom) of the
          // map edge to start panning the map.
          autoPanPadding: [50, 50],
          // @option autoPanSpeed: Number = 10
          // Number of pixels the map should pan by.
          autoPanSpeed: 10
        },
        /* @section
         *
         * In addition to [shared layer methods](#Layer) like `addTo()` and `remove()` and [popup methods](#Popup) like bindPopup() you can also use the following methods:
         */
        initialize: function(i, l) {
          x(this, l), this._latlng = U(i);
        },
        onAdd: function(i) {
          this._zoomAnimated = this._zoomAnimated && i.options.markerZoomAnimation, this._zoomAnimated && i.on("zoomanim", this._animateZoom, this), this._initIcon(), this.update();
        },
        onRemove: function(i) {
          this.dragging && this.dragging.enabled() && (this.options.draggable = !0, this.dragging.removeHooks()), delete this.dragging, this._zoomAnimated && i.off("zoomanim", this._animateZoom, this), this._removeIcon(), this._removeShadow();
        },
        getEvents: function() {
          return {
            zoom: this.update,
            viewreset: this.update
          };
        },
        // @method getLatLng: LatLng
        // Returns the current geographical position of the marker.
        getLatLng: function() {
          return this._latlng;
        },
        // @method setLatLng(latlng: LatLng): this
        // Changes the marker position to the given point.
        setLatLng: function(i) {
          var l = this._latlng;
          return this._latlng = U(i), this.update(), this.fire("move", { oldLatLng: l, latlng: this._latlng });
        },
        // @method setZIndexOffset(offset: Number): this
        // Changes the [zIndex offset](#marker-zindexoffset) of the marker.
        setZIndexOffset: function(i) {
          return this.options.zIndexOffset = i, this.update();
        },
        // @method getIcon: Icon
        // Returns the current icon used by the marker
        getIcon: function() {
          return this.options.icon;
        },
        // @method setIcon(icon: Icon): this
        // Changes the marker icon.
        setIcon: function(i) {
          return this.options.icon = i, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup, this._popup.options), this;
        },
        getElement: function() {
          return this._icon;
        },
        update: function() {
          if (this._icon && this._map) {
            var i = this._map.latLngToLayerPoint(this._latlng).round();
            this._setPos(i);
          }
          return this;
        },
        _initIcon: function() {
          var i = this.options, l = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"), u = i.icon.createIcon(this._icon), f = !1;
          u !== this._icon && (this._icon && this._removeIcon(), f = !0, i.title && (u.title = i.title), u.tagName === "IMG" && (u.alt = i.alt || "")), $(u, l), i.keyboard && (u.tabIndex = "0", u.setAttribute("role", "button")), this._icon = u, i.riseOnHover && this.on({
            mouseover: this._bringToFront,
            mouseout: this._resetZIndex
          }), this.options.autoPanOnFocus && q(u, "focus", this._panOnFocus, this);
          var m = i.icon.createShadow(this._shadow), y = !1;
          m !== this._shadow && (this._removeShadow(), y = !0), m && ($(m, l), m.alt = ""), this._shadow = m, i.opacity < 1 && this._updateOpacity(), f && this.getPane().appendChild(this._icon), this._initInteraction(), m && y && this.getPane(i.shadowPane).appendChild(this._shadow);
        },
        _removeIcon: function() {
          this.options.riseOnHover && this.off({
            mouseover: this._bringToFront,
            mouseout: this._resetZIndex
          }), this.options.autoPanOnFocus && gt(this._icon, "focus", this._panOnFocus, this), Mt(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
        },
        _removeShadow: function() {
          this._shadow && Mt(this._shadow), this._shadow = null;
        },
        _setPos: function(i) {
          this._icon && Ot(this._icon, i), this._shadow && Ot(this._shadow, i), this._zIndex = i.y + this.options.zIndexOffset, this._resetZIndex();
        },
        _updateZIndex: function(i) {
          this._icon && (this._icon.style.zIndex = this._zIndex + i);
        },
        _animateZoom: function(i) {
          var l = this._map._latLngToNewLayerPoint(this._latlng, i.zoom, i.center).round();
          this._setPos(l);
        },
        _initInteraction: function() {
          if (this.options.interactive && ($(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), Er)) {
            var i = this.options.draggable;
            this.dragging && (i = this.dragging.enabled(), this.dragging.disable()), this.dragging = new Er(this), i && this.dragging.enable();
          }
        },
        // @method setOpacity(opacity: Number): this
        // Changes the opacity of the marker.
        setOpacity: function(i) {
          return this.options.opacity = i, this._map && this._updateOpacity(), this;
        },
        _updateOpacity: function() {
          var i = this.options.opacity;
          this._icon && te(this._icon, i), this._shadow && te(this._shadow, i);
        },
        _bringToFront: function() {
          this._updateZIndex(this.options.riseOffset);
        },
        _resetZIndex: function() {
          this._updateZIndex(0);
        },
        _panOnFocus: function() {
          var i = this._map;
          if (i) {
            var l = this.options.icon.options, u = l.iconSize ? F(l.iconSize) : F(0, 0), f = l.iconAnchor ? F(l.iconAnchor) : F(0, 0);
            i.panInside(this._latlng, {
              paddingTopLeft: f,
              paddingBottomRight: u.subtract(f)
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
      function sc(i, l) {
        return new Wn(i, l);
      }
      var De = re.extend({
        // @section
        // @aka Path options
        options: {
          // @option stroke: Boolean = true
          // Whether to draw stroke along the path. Set it to `false` to disable borders on polygons or circles.
          stroke: !0,
          // @option color: String = '#3388ff'
          // Stroke color
          color: "#3388ff",
          // @option weight: Number = 3
          // Stroke width in pixels
          weight: 3,
          // @option opacity: Number = 1.0
          // Stroke opacity
          opacity: 1,
          // @option lineCap: String= 'round'
          // A string that defines [shape to be used at the end](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) of the stroke.
          lineCap: "round",
          // @option lineJoin: String = 'round'
          // A string that defines [shape to be used at the corners](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin) of the stroke.
          lineJoin: "round",
          // @option dashArray: String = null
          // A string that defines the stroke [dash pattern](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
          dashArray: null,
          // @option dashOffset: String = null
          // A string that defines the [distance into the dash pattern to start the dash](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
          dashOffset: null,
          // @option fill: Boolean = depends
          // Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles.
          fill: !1,
          // @option fillColor: String = *
          // Fill color. Defaults to the value of the [`color`](#path-color) option
          fillColor: null,
          // @option fillOpacity: Number = 0.2
          // Fill opacity.
          fillOpacity: 0.2,
          // @option fillRule: String = 'evenodd'
          // A string that defines [how the inside of a shape](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule) is determined.
          fillRule: "evenodd",
          // className: '',
          // Option inherited from "Interactive layer" abstract class
          interactive: !0,
          // @option bubblingMouseEvents: Boolean = true
          // When `true`, a mouse event on this path will trigger the same event on the map
          // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
          bubblingMouseEvents: !0
        },
        beforeAdd: function(i) {
          this._renderer = i.getRenderer(this);
        },
        onAdd: function() {
          this._renderer._initPath(this), this._reset(), this._renderer._addPath(this);
        },
        onRemove: function() {
          this._renderer._removePath(this);
        },
        // @method redraw(): this
        // Redraws the layer. Sometimes useful after you changed the coordinates that the path uses.
        redraw: function() {
          return this._map && this._renderer._updatePath(this), this;
        },
        // @method setStyle(style: Path options): this
        // Changes the appearance of a Path based on the options in the `Path options` object.
        setStyle: function(i) {
          return x(this, i), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && i && Object.prototype.hasOwnProperty.call(i, "weight") && this._updateBounds()), this;
        },
        // @method bringToFront(): this
        // Brings the layer to the top of all path layers.
        bringToFront: function() {
          return this._renderer && this._renderer._bringToFront(this), this;
        },
        // @method bringToBack(): this
        // Brings the layer to the bottom of all path layers.
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
      }), Vn = De.extend({
        // @section
        // @aka CircleMarker options
        options: {
          fill: !0,
          // @option radius: Number = 10
          // Radius of the circle marker, in pixels
          radius: 10
        },
        initialize: function(i, l) {
          x(this, l), this._latlng = U(i), this._radius = this.options.radius;
        },
        // @method setLatLng(latLng: LatLng): this
        // Sets the position of a circle marker to a new location.
        setLatLng: function(i) {
          var l = this._latlng;
          return this._latlng = U(i), this.redraw(), this.fire("move", { oldLatLng: l, latlng: this._latlng });
        },
        // @method getLatLng(): LatLng
        // Returns the current geographical position of the circle marker
        getLatLng: function() {
          return this._latlng;
        },
        // @method setRadius(radius: Number): this
        // Sets the radius of a circle marker. Units are in pixels.
        setRadius: function(i) {
          return this.options.radius = this._radius = i, this.redraw();
        },
        // @method getRadius(): Number
        // Returns the current radius of the circle
        getRadius: function() {
          return this._radius;
        },
        setStyle: function(i) {
          var l = i && i.radius || this._radius;
          return De.prototype.setStyle.call(this, i), this.setRadius(l), this;
        },
        _project: function() {
          this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds();
        },
        _updateBounds: function() {
          var i = this._radius, l = this._radiusY || i, u = this._clickTolerance(), f = [i + u, l + u];
          this._pxBounds = new G(this._point.subtract(f), this._point.add(f));
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
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(i) {
          return i.distanceTo(this._point) <= this._radius + this._clickTolerance();
        }
      });
      function oc(i, l) {
        return new Vn(i, l);
      }
      var so = Vn.extend({
        initialize: function(i, l, u) {
          if (typeof l == "number" && (l = r({}, u, { radius: l })), x(this, l), this._latlng = U(i), isNaN(this.options.radius))
            throw new Error("Circle radius cannot be NaN");
          this._mRadius = this.options.radius;
        },
        // @method setRadius(radius: Number): this
        // Sets the radius of a circle. Units are in meters.
        setRadius: function(i) {
          return this._mRadius = i, this.redraw();
        },
        // @method getRadius(): Number
        // Returns the current radius of a circle. Units are in meters.
        getRadius: function() {
          return this._mRadius;
        },
        // @method getBounds(): LatLngBounds
        // Returns the `LatLngBounds` of the path.
        getBounds: function() {
          var i = [this._radius, this._radiusY || this._radius];
          return new xt(
            this._map.layerPointToLatLng(this._point.subtract(i)),
            this._map.layerPointToLatLng(this._point.add(i))
          );
        },
        setStyle: De.prototype.setStyle,
        _project: function() {
          var i = this._latlng.lng, l = this._latlng.lat, u = this._map, f = u.options.crs;
          if (f.distance === Vt.distance) {
            var m = Math.PI / 180, y = this._mRadius / Vt.R / m, w = u.project([l + y, i]), k = u.project([l - y, i]), C = w.add(k).divideBy(2), E = u.unproject(C).lat, R = Math.acos((Math.cos(y * m) - Math.sin(l * m) * Math.sin(E * m)) / (Math.cos(l * m) * Math.cos(E * m))) / m;
            (isNaN(R) || R === 0) && (R = y / Math.cos(Math.PI / 180 * l)), this._point = C.subtract(u.getPixelOrigin()), this._radius = isNaN(R) ? 0 : C.x - u.project([E, i - R]).x, this._radiusY = C.y - w.y;
          } else {
            var j = f.unproject(f.project(this._latlng).subtract([this._mRadius, 0]));
            this._point = u.latLngToLayerPoint(this._latlng), this._radius = this._point.x - u.latLngToLayerPoint(j).x;
          }
          this._updateBounds();
        }
      });
      function rc(i, l, u) {
        return new so(i, l, u);
      }
      var be = De.extend({
        // @section
        // @aka Polyline options
        options: {
          // @option smoothFactor: Number = 1.0
          // How much to simplify the polyline on each zoom level. More means
          // better performance and smoother look, and less means more accurate representation.
          smoothFactor: 1,
          // @option noClip: Boolean = false
          // Disable polyline clipping.
          noClip: !1
        },
        initialize: function(i, l) {
          x(this, l), this._setLatLngs(i);
        },
        // @method getLatLngs(): LatLng[]
        // Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
        getLatLngs: function() {
          return this._latlngs;
        },
        // @method setLatLngs(latlngs: LatLng[]): this
        // Replaces all the points in the polyline with the given array of geographical points.
        setLatLngs: function(i) {
          return this._setLatLngs(i), this.redraw();
        },
        // @method isEmpty(): Boolean
        // Returns `true` if the Polyline has no LatLngs.
        isEmpty: function() {
          return !this._latlngs.length;
        },
        // @method closestLayerPoint(p: Point): Point
        // Returns the point closest to `p` on the Polyline.
        closestLayerPoint: function(i) {
          for (var l = 1 / 0, u = null, f = Yi, m, y, w = 0, k = this._parts.length; w < k; w++)
            for (var C = this._parts[w], E = 1, R = C.length; E < R; E++) {
              m = C[E - 1], y = C[E];
              var j = f(i, m, y, !0);
              j < l && (l = j, u = f(i, m, y));
            }
          return u && (u.distance = Math.sqrt(l)), u;
        },
        // @method getCenter(): LatLng
        // Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
        getCenter: function() {
          if (!this._map)
            throw new Error("Must add layer to map before using getCenter()");
          return Ar(this._defaultShape(), this._map.options.crs);
        },
        // @method getBounds(): LatLngBounds
        // Returns the `LatLngBounds` of the path.
        getBounds: function() {
          return this._bounds;
        },
        // @method addLatLng(latlng: LatLng, latlngs?: LatLng[]): this
        // Adds a given point to the polyline. By default, adds to the first ring of
        // the polyline in case of a multi-polyline, but can be overridden by passing
        // a specific ring as a LatLng array (that you can earlier access with [`getLatLngs`](#polyline-getlatlngs)).
        addLatLng: function(i, l) {
          return l = l || this._defaultShape(), i = U(i), l.push(i), this._bounds.extend(i), this.redraw();
        },
        _setLatLngs: function(i) {
          this._bounds = new xt(), this._latlngs = this._convertLatLngs(i);
        },
        _defaultShape: function() {
          return ee(this._latlngs) ? this._latlngs : this._latlngs[0];
        },
        // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
        _convertLatLngs: function(i) {
          for (var l = [], u = ee(i), f = 0, m = i.length; f < m; f++)
            u ? (l[f] = U(i[f]), this._bounds.extend(l[f])) : l[f] = this._convertLatLngs(i[f]);
          return l;
        },
        _project: function() {
          var i = new G();
          this._rings = [], this._projectLatlngs(this._latlngs, this._rings, i), this._bounds.isValid() && i.isValid() && (this._rawPxBounds = i, this._updateBounds());
        },
        _updateBounds: function() {
          var i = this._clickTolerance(), l = new H(i, i);
          this._rawPxBounds && (this._pxBounds = new G([
            this._rawPxBounds.min.subtract(l),
            this._rawPxBounds.max.add(l)
          ]));
        },
        // recursively turns latlngs into a set of rings with projected coordinates
        _projectLatlngs: function(i, l, u) {
          var f = i[0] instanceof Q, m = i.length, y, w;
          if (f) {
            for (w = [], y = 0; y < m; y++)
              w[y] = this._map.latLngToLayerPoint(i[y]), u.extend(w[y]);
            l.push(w);
          } else
            for (y = 0; y < m; y++)
              this._projectLatlngs(i[y], l, u);
        },
        // clip polyline by renderer bounds so that we have less to render for performance
        _clipPoints: function() {
          var i = this._renderer._bounds;
          if (this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(i))) {
            if (this.options.noClip) {
              this._parts = this._rings;
              return;
            }
            var l = this._parts, u, f, m, y, w, k, C;
            for (u = 0, m = 0, y = this._rings.length; u < y; u++)
              for (C = this._rings[u], f = 0, w = C.length; f < w - 1; f++)
                k = Cr(C[f], C[f + 1], i, f, !0), k && (l[m] = l[m] || [], l[m].push(k[0]), (k[1] !== C[f + 1] || f === w - 2) && (l[m].push(k[1]), m++));
          }
        },
        // simplify each clipped part of the polyline for performance
        _simplifyPoints: function() {
          for (var i = this._parts, l = this.options.smoothFactor, u = 0, f = i.length; u < f; u++)
            i[u] = Pr(i[u], l);
        },
        _update: function() {
          this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
        },
        _updatePath: function() {
          this._renderer._updatePoly(this);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(i, l) {
          var u, f, m, y, w, k, C = this._clickTolerance();
          if (!this._pxBounds || !this._pxBounds.contains(i))
            return !1;
          for (u = 0, y = this._parts.length; u < y; u++)
            for (k = this._parts[u], f = 0, w = k.length, m = w - 1; f < w; m = f++)
              if (!(!l && f === 0) && kr(i, k[m], k[f]) <= C)
                return !0;
          return !1;
        }
      });
      function ac(i, l) {
        return new be(i, l);
      }
      be._flat = Tr;
      var Li = be.extend({
        options: {
          fill: !0
        },
        isEmpty: function() {
          return !this._latlngs.length || !this._latlngs[0].length;
        },
        // @method getCenter(): LatLng
        // Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the Polygon.
        getCenter: function() {
          if (!this._map)
            throw new Error("Must add layer to map before using getCenter()");
          return Mr(this._defaultShape(), this._map.options.crs);
        },
        _convertLatLngs: function(i) {
          var l = be.prototype._convertLatLngs.call(this, i), u = l.length;
          return u >= 2 && l[0] instanceof Q && l[0].equals(l[u - 1]) && l.pop(), l;
        },
        _setLatLngs: function(i) {
          be.prototype._setLatLngs.call(this, i), ee(this._latlngs) && (this._latlngs = [this._latlngs]);
        },
        _defaultShape: function() {
          return ee(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
        },
        _clipPoints: function() {
          var i = this._renderer._bounds, l = this.options.weight, u = new H(l, l);
          if (i = new G(i.min.subtract(u), i.max.add(u)), this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(i))) {
            if (this.options.noClip) {
              this._parts = this._rings;
              return;
            }
            for (var f = 0, m = this._rings.length, y; f < m; f++)
              y = Lr(this._rings[f], i, !0), y.length && this._parts.push(y);
          }
        },
        _updatePath: function() {
          this._renderer._updatePoly(this, !0);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(i) {
          var l = !1, u, f, m, y, w, k, C, E;
          if (!this._pxBounds || !this._pxBounds.contains(i))
            return !1;
          for (y = 0, C = this._parts.length; y < C; y++)
            for (u = this._parts[y], w = 0, E = u.length, k = E - 1; w < E; k = w++)
              f = u[w], m = u[k], f.y > i.y != m.y > i.y && i.x < (m.x - f.x) * (i.y - f.y) / (m.y - f.y) + f.x && (l = !l);
          return l || be.prototype._containsPoint.call(this, i, !0);
        }
      });
      function lc(i, l) {
        return new Li(i, l);
      }
      var xe = ye.extend({
        /* @section
         * @aka GeoJSON options
         *
         * @option pointToLayer: Function = *
         * A `Function` defining how GeoJSON points spawn Leaflet layers. It is internally
         * called when data is added, passing the GeoJSON point feature and its `LatLng`.
         * The default is to spawn a default `Marker`:
         * ```js
         * function(geoJsonPoint, latlng) {
         * 	return L.marker(latlng);
         * }
         * ```
         *
         * @option style: Function = *
         * A `Function` defining the `Path options` for styling GeoJSON lines and polygons,
         * called internally when data is added.
         * The default value is to not override any defaults:
         * ```js
         * function (geoJsonFeature) {
         * 	return {}
         * }
         * ```
         *
         * @option onEachFeature: Function = *
         * A `Function` that will be called once for each created `Feature`, after it has
         * been created and styled. Useful for attaching events and popups to features.
         * The default is to do nothing with the newly created layers:
         * ```js
         * function (feature, layer) {}
         * ```
         *
         * @option filter: Function = *
         * A `Function` that will be used to decide whether to include a feature or not.
         * The default is to include all features:
         * ```js
         * function (geoJsonFeature) {
         * 	return true;
         * }
         * ```
         * Note: dynamically changing the `filter` option will have effect only on newly
         * added data. It will _not_ re-evaluate already included features.
         *
         * @option coordsToLatLng: Function = *
         * A `Function` that will be used for converting GeoJSON coordinates to `LatLng`s.
         * The default is the `coordsToLatLng` static method.
         *
         * @option markersInheritOptions: Boolean = false
         * Whether default Markers for "Point" type Features inherit from group options.
         */
        initialize: function(i, l) {
          x(this, l), this._layers = {}, i && this.addData(i);
        },
        // @method addData( <GeoJSON> data ): this
        // Adds a GeoJSON object to the layer.
        addData: function(i) {
          var l = A(i) ? i : i.features, u, f, m;
          if (l) {
            for (u = 0, f = l.length; u < f; u++)
              m = l[u], (m.geometries || m.geometry || m.features || m.coordinates) && this.addData(m);
            return this;
          }
          var y = this.options;
          if (y.filter && !y.filter(i))
            return this;
          var w = jn(i, y);
          return w ? (w.feature = Yn(i), w.defaultOptions = w.options, this.resetStyle(w), y.onEachFeature && y.onEachFeature(i, w), this.addLayer(w)) : this;
        },
        // @method resetStyle( <Path> layer? ): this
        // Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
        // If `layer` is omitted, the style of all features in the current layer is reset.
        resetStyle: function(i) {
          return i === void 0 ? this.eachLayer(this.resetStyle, this) : (i.options = r({}, i.defaultOptions), this._setLayerStyle(i, this.options.style), this);
        },
        // @method setStyle( <Function> style ): this
        // Changes styles of GeoJSON vector layers with the given style function.
        setStyle: function(i) {
          return this.eachLayer(function(l) {
            this._setLayerStyle(l, i);
          }, this);
        },
        _setLayerStyle: function(i, l) {
          i.setStyle && (typeof l == "function" && (l = l(i.feature)), i.setStyle(l));
        }
      });
      function jn(i, l) {
        var u = i.type === "Feature" ? i.geometry : i, f = u ? u.coordinates : null, m = [], y = l && l.pointToLayer, w = l && l.coordsToLatLng || oo, k, C, E, R;
        if (!f && !u)
          return null;
        switch (u.type) {
          case "Point":
            return k = w(f), Ir(y, i, k, l);
          case "MultiPoint":
            for (E = 0, R = f.length; E < R; E++)
              k = w(f[E]), m.push(Ir(y, i, k, l));
            return new ye(m);
          case "LineString":
          case "MultiLineString":
            return C = Un(f, u.type === "LineString" ? 0 : 1, w), new be(C, l);
          case "Polygon":
          case "MultiPolygon":
            return C = Un(f, u.type === "Polygon" ? 1 : 2, w), new Li(C, l);
          case "GeometryCollection":
            for (E = 0, R = u.geometries.length; E < R; E++) {
              var j = jn({
                geometry: u.geometries[E],
                type: "Feature",
                properties: i.properties
              }, l);
              j && m.push(j);
            }
            return new ye(m);
          case "FeatureCollection":
            for (E = 0, R = u.features.length; E < R; E++) {
              var tt = jn(u.features[E], l);
              tt && m.push(tt);
            }
            return new ye(m);
          default:
            throw new Error("Invalid GeoJSON object.");
        }
      }
      function Ir(i, l, u, f) {
        return i ? i(l, u) : new Wn(u, f && f.markersInheritOptions && f);
      }
      function oo(i) {
        return new Q(i[1], i[0], i[2]);
      }
      function Un(i, l, u) {
        for (var f = [], m = 0, y = i.length, w; m < y; m++)
          w = l ? Un(i[m], l - 1, u) : (u || oo)(i[m]), f.push(w);
        return f;
      }
      function ro(i, l) {
        return i = U(i), i.alt !== void 0 ? [_(i.lng, l), _(i.lat, l), _(i.alt, l)] : [_(i.lng, l), _(i.lat, l)];
      }
      function Gn(i, l, u, f) {
        for (var m = [], y = 0, w = i.length; y < w; y++)
          m.push(l ? Gn(i[y], ee(i[y]) ? 0 : l - 1, u, f) : ro(i[y], f));
        return !l && u && m.length > 0 && m.push(m[0].slice()), m;
      }
      function Mi(i, l) {
        return i.feature ? r({}, i.feature, { geometry: l }) : Yn(l);
      }
      function Yn(i) {
        return i.type === "Feature" || i.type === "FeatureCollection" ? i : {
          type: "Feature",
          properties: {},
          geometry: i
        };
      }
      var ao = {
        toGeoJSON: function(i) {
          return Mi(this, {
            type: "Point",
            coordinates: ro(this.getLatLng(), i)
          });
        }
      };
      Wn.include(ao), so.include(ao), Vn.include(ao), be.include({
        toGeoJSON: function(i) {
          var l = !ee(this._latlngs), u = Gn(this._latlngs, l ? 1 : 0, !1, i);
          return Mi(this, {
            type: (l ? "Multi" : "") + "LineString",
            coordinates: u
          });
        }
      }), Li.include({
        toGeoJSON: function(i) {
          var l = !ee(this._latlngs), u = l && !ee(this._latlngs[0]), f = Gn(this._latlngs, u ? 2 : l ? 1 : 0, !0, i);
          return l || (f = [f]), Mi(this, {
            type: (u ? "Multi" : "") + "Polygon",
            coordinates: f
          });
        }
      }), xi.include({
        toMultiPoint: function(i) {
          var l = [];
          return this.eachLayer(function(u) {
            l.push(u.toGeoJSON(i).geometry.coordinates);
          }), Mi(this, {
            type: "MultiPoint",
            coordinates: l
          });
        },
        // @method toGeoJSON(precision?: Number|false): Object
        // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
        // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the layer group (as a GeoJSON `FeatureCollection`, `GeometryCollection`, or `MultiPoint`).
        toGeoJSON: function(i) {
          var l = this.feature && this.feature.geometry && this.feature.geometry.type;
          if (l === "MultiPoint")
            return this.toMultiPoint(i);
          var u = l === "GeometryCollection", f = [];
          return this.eachLayer(function(m) {
            if (m.toGeoJSON) {
              var y = m.toGeoJSON(i);
              if (u)
                f.push(y.geometry);
              else {
                var w = Yn(y);
                w.type === "FeatureCollection" ? f.push.apply(f, w.features) : f.push(w);
              }
            }
          }), u ? Mi(this, {
            geometries: f,
            type: "GeometryCollection"
          }) : {
            type: "FeatureCollection",
            features: f
          };
        }
      });
      function Dr(i, l) {
        return new xe(i, l);
      }
      var hc = Dr, qn = re.extend({
        // @section
        // @aka ImageOverlay options
        options: {
          // @option opacity: Number = 1.0
          // The opacity of the image overlay.
          opacity: 1,
          // @option alt: String = ''
          // Text for the `alt` attribute of the image (useful for accessibility).
          alt: "",
          // @option interactive: Boolean = false
          // If `true`, the image overlay will emit [mouse events](#interactive-layer) when clicked or hovered.
          interactive: !1,
          // @option crossOrigin: Boolean|String = false
          // Whether the crossOrigin attribute will be added to the image.
          // If a String is provided, the image will have its crossOrigin attribute set to the String provided. This is needed if you want to access image pixel data.
          // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
          crossOrigin: !1,
          // @option errorOverlayUrl: String = ''
          // URL to the overlay image to show in place of the overlay that failed to load.
          errorOverlayUrl: "",
          // @option zIndex: Number = 1
          // The explicit [zIndex](https://developer.mozilla.org/docs/Web/CSS/CSS_Positioning/Understanding_z_index) of the overlay layer.
          zIndex: 1,
          // @option className: String = ''
          // A custom class name to assign to the image. Empty by default.
          className: ""
        },
        initialize: function(i, l, u) {
          this._url = i, this._bounds = at(l), x(this, u);
        },
        onAdd: function() {
          this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && ($(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
        },
        onRemove: function() {
          Mt(this._image), this.options.interactive && this.removeInteractiveTarget(this._image);
        },
        // @method setOpacity(opacity: Number): this
        // Sets the opacity of the overlay.
        setOpacity: function(i) {
          return this.options.opacity = i, this._image && this._updateOpacity(), this;
        },
        setStyle: function(i) {
          return i.opacity && this.setOpacity(i.opacity), this;
        },
        // @method bringToFront(): this
        // Brings the layer to the top of all overlays.
        bringToFront: function() {
          return this._map && yi(this._image), this;
        },
        // @method bringToBack(): this
        // Brings the layer to the bottom of all overlays.
        bringToBack: function() {
          return this._map && bi(this._image), this;
        },
        // @method setUrl(url: String): this
        // Changes the URL of the image.
        setUrl: function(i) {
          return this._url = i, this._image && (this._image.src = i), this;
        },
        // @method setBounds(bounds: LatLngBounds): this
        // Update the bounds that this ImageOverlay covers
        setBounds: function(i) {
          return this._bounds = at(i), this._map && this._reset(), this;
        },
        getEvents: function() {
          var i = {
            zoom: this._reset,
            viewreset: this._reset
          };
          return this._zoomAnimated && (i.zoomanim = this._animateZoom), i;
        },
        // @method setZIndex(value: Number): this
        // Changes the [zIndex](#imageoverlay-zindex) of the image overlay.
        setZIndex: function(i) {
          return this.options.zIndex = i, this._updateZIndex(), this;
        },
        // @method getBounds(): LatLngBounds
        // Get the bounds that this ImageOverlay covers
        getBounds: function() {
          return this._bounds;
        },
        // @method getElement(): HTMLElement
        // Returns the instance of [`HTMLImageElement`](https://developer.mozilla.org/docs/Web/API/HTMLImageElement)
        // used by this overlay.
        getElement: function() {
          return this._image;
        },
        _initImage: function() {
          var i = this._url.tagName === "IMG", l = this._image = i ? this._url : lt("img");
          if ($(l, "leaflet-image-layer"), this._zoomAnimated && $(l, "leaflet-zoom-animated"), this.options.className && $(l, this.options.className), l.onselectstart = g, l.onmousemove = g, l.onload = a(this.fire, this, "load"), l.onerror = a(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (l.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), i) {
            this._url = l.src;
            return;
          }
          l.src = this._url, l.alt = this.options.alt;
        },
        _animateZoom: function(i) {
          var l = this._map.getZoomScale(i.zoom), u = this._map._latLngBoundsToNewLayerBounds(this._bounds, i.zoom, i.center).min;
          Ke(this._image, u, l);
        },
        _reset: function() {
          var i = this._image, l = new G(
            this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
            this._map.latLngToLayerPoint(this._bounds.getSouthEast())
          ), u = l.getSize();
          Ot(i, l.min), i.style.width = u.x + "px", i.style.height = u.y + "px";
        },
        _updateOpacity: function() {
          te(this._image, this.options.opacity);
        },
        _updateZIndex: function() {
          this._image && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._image.style.zIndex = this.options.zIndex);
        },
        _overlayOnError: function() {
          this.fire("error");
          var i = this.options.errorOverlayUrl;
          i && this._url !== i && (this._url = i, this._image.src = i);
        },
        // @method getCenter(): LatLng
        // Returns the center of the ImageOverlay.
        getCenter: function() {
          return this._bounds.getCenter();
        }
      }), cc = function(i, l, u) {
        return new qn(i, l, u);
      }, zr = qn.extend({
        // @section
        // @aka VideoOverlay options
        options: {
          // @option autoplay: Boolean = true
          // Whether the video starts playing automatically when loaded.
          // On some browsers autoplay will only work with `muted: true`
          autoplay: !0,
          // @option loop: Boolean = true
          // Whether the video will loop back to the beginning when played.
          loop: !0,
          // @option keepAspectRatio: Boolean = true
          // Whether the video will save aspect ratio after the projection.
          // Relevant for supported browsers. See [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
          keepAspectRatio: !0,
          // @option muted: Boolean = false
          // Whether the video starts on mute when loaded.
          muted: !1,
          // @option playsInline: Boolean = true
          // Mobile browsers will play the video right where it is instead of open it up in fullscreen mode.
          playsInline: !0
        },
        _initImage: function() {
          var i = this._url.tagName === "VIDEO", l = this._image = i ? this._url : lt("video");
          if ($(l, "leaflet-image-layer"), this._zoomAnimated && $(l, "leaflet-zoom-animated"), this.options.className && $(l, this.options.className), l.onselectstart = g, l.onmousemove = g, l.onloadeddata = a(this.fire, this, "load"), i) {
            for (var u = l.getElementsByTagName("source"), f = [], m = 0; m < u.length; m++)
              f.push(u[m].src);
            this._url = u.length > 0 ? f : [l.src];
            return;
          }
          A(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(l.style, "objectFit") && (l.style.objectFit = "fill"), l.autoplay = !!this.options.autoplay, l.loop = !!this.options.loop, l.muted = !!this.options.muted, l.playsInline = !!this.options.playsInline;
          for (var y = 0; y < this._url.length; y++) {
            var w = lt("source");
            w.src = this._url[y], l.appendChild(w);
          }
        }
        // @method getElement(): HTMLVideoElement
        // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
        // used by this overlay.
      });
      function uc(i, l, u) {
        return new zr(i, l, u);
      }
      var Br = qn.extend({
        _initImage: function() {
          var i = this._image = this._url;
          $(i, "leaflet-image-layer"), this._zoomAnimated && $(i, "leaflet-zoom-animated"), this.options.className && $(i, this.options.className), i.onselectstart = g, i.onmousemove = g;
        }
        // @method getElement(): SVGElement
        // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
        // used by this overlay.
      });
      function dc(i, l, u) {
        return new Br(i, l, u);
      }
      var pe = re.extend({
        // @section
        // @aka DivOverlay options
        options: {
          // @option interactive: Boolean = false
          // If true, the popup/tooltip will listen to the mouse events.
          interactive: !1,
          // @option offset: Point = Point(0, 0)
          // The offset of the overlay position.
          offset: [0, 0],
          // @option className: String = ''
          // A custom CSS class name to assign to the overlay.
          className: "",
          // @option pane: String = undefined
          // `Map pane` where the overlay will be added.
          pane: void 0,
          // @option content: String|HTMLElement|Function = ''
          // Sets the HTML content of the overlay while initializing. If a function is passed the source layer will be
          // passed to the function. The function should return a `String` or `HTMLElement` to be used in the overlay.
          content: ""
        },
        initialize: function(i, l) {
          i && (i instanceof Q || A(i)) ? (this._latlng = U(i), x(this, l)) : (x(this, i), this._source = l), this.options.content && (this._content = this.options.content);
        },
        // @method openOn(map: Map): this
        // Adds the overlay to the map.
        // Alternative to `map.openPopup(popup)`/`.openTooltip(tooltip)`.
        openOn: function(i) {
          return i = arguments.length ? i : this._source._map, i.hasLayer(this) || i.addLayer(this), this;
        },
        // @method close(): this
        // Closes the overlay.
        // Alternative to `map.closePopup(popup)`/`.closeTooltip(tooltip)`
        // and `layer.closePopup()`/`.closeTooltip()`.
        close: function() {
          return this._map && this._map.removeLayer(this), this;
        },
        // @method toggle(layer?: Layer): this
        // Opens or closes the overlay bound to layer depending on its current state.
        // Argument may be omitted only for overlay bound to layer.
        // Alternative to `layer.togglePopup()`/`.toggleTooltip()`.
        toggle: function(i) {
          return this._map ? this.close() : (arguments.length ? this._source = i : i = this._source, this._prepareOpen(), this.openOn(i._map)), this;
        },
        onAdd: function(i) {
          this._zoomAnimated = i._zoomAnimated, this._container || this._initLayout(), i._fadeAnimated && te(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), i._fadeAnimated && te(this._container, 1), this.bringToFront(), this.options.interactive && ($(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
        },
        onRemove: function(i) {
          i._fadeAnimated ? (te(this._container, 0), this._removeTimeout = setTimeout(a(Mt, void 0, this._container), 200)) : Mt(this._container), this.options.interactive && (Tt(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
        },
        // @namespace DivOverlay
        // @method getLatLng: LatLng
        // Returns the geographical point of the overlay.
        getLatLng: function() {
          return this._latlng;
        },
        // @method setLatLng(latlng: LatLng): this
        // Sets the geographical point where the overlay will open.
        setLatLng: function(i) {
          return this._latlng = U(i), this._map && (this._updatePosition(), this._adjustPan()), this;
        },
        // @method getContent: String|HTMLElement
        // Returns the content of the overlay.
        getContent: function() {
          return this._content;
        },
        // @method setContent(htmlContent: String|HTMLElement|Function): this
        // Sets the HTML content of the overlay. If a function is passed the source layer will be passed to the function.
        // The function should return a `String` or `HTMLElement` to be used in the overlay.
        setContent: function(i) {
          return this._content = i, this.update(), this;
        },
        // @method getElement: String|HTMLElement
        // Returns the HTML container of the overlay.
        getElement: function() {
          return this._container;
        },
        // @method update: null
        // Updates the overlay content, layout and position. Useful for updating the overlay after something inside changed, e.g. image loaded.
        update: function() {
          this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan());
        },
        getEvents: function() {
          var i = {
            zoom: this._updatePosition,
            viewreset: this._updatePosition
          };
          return this._zoomAnimated && (i.zoomanim = this._animateZoom), i;
        },
        // @method isOpen: Boolean
        // Returns `true` when the overlay is visible on the map.
        isOpen: function() {
          return !!this._map && this._map.hasLayer(this);
        },
        // @method bringToFront: this
        // Brings this overlay in front of other overlays (in the same map pane).
        bringToFront: function() {
          return this._map && yi(this._container), this;
        },
        // @method bringToBack: this
        // Brings this overlay to the back of other overlays (in the same map pane).
        bringToBack: function() {
          return this._map && bi(this._container), this;
        },
        // prepare bound overlay to open: update latlng pos / content source (for FeatureGroup)
        _prepareOpen: function(i) {
          var l = this._source;
          if (!l._map)
            return !1;
          if (l instanceof ye) {
            l = null;
            var u = this._source._layers;
            for (var f in u)
              if (u[f]._map) {
                l = u[f];
                break;
              }
            if (!l)
              return !1;
            this._source = l;
          }
          if (!i)
            if (l.getCenter)
              i = l.getCenter();
            else if (l.getLatLng)
              i = l.getLatLng();
            else if (l.getBounds)
              i = l.getBounds().getCenter();
            else
              throw new Error("Unable to get source layer LatLng.");
          return this.setLatLng(i), this._map && this.update(), !0;
        },
        _updateContent: function() {
          if (this._content) {
            var i = this._contentNode, l = typeof this._content == "function" ? this._content(this._source || this) : this._content;
            if (typeof l == "string")
              i.innerHTML = l;
            else {
              for (; i.hasChildNodes(); )
                i.removeChild(i.firstChild);
              i.appendChild(l);
            }
            this.fire("contentupdate");
          }
        },
        _updatePosition: function() {
          if (this._map) {
            var i = this._map.latLngToLayerPoint(this._latlng), l = F(this.options.offset), u = this._getAnchor();
            this._zoomAnimated ? Ot(this._container, i.add(u)) : l = l.add(i).add(u);
            var f = this._containerBottom = -l.y, m = this._containerLeft = -Math.round(this._containerWidth / 2) + l.x;
            this._container.style.bottom = f + "px", this._container.style.left = m + "px";
          }
        },
        _getAnchor: function() {
          return [0, 0];
        }
      });
      ot.include({
        _initOverlay: function(i, l, u, f) {
          var m = l;
          return m instanceof i || (m = new i(f).setContent(l)), u && m.setLatLng(u), m;
        }
      }), re.include({
        _initOverlay: function(i, l, u, f) {
          var m = u;
          return m instanceof i ? (x(m, f), m._source = this) : (m = l && !f ? l : new i(f, this), m.setContent(u)), m;
        }
      });
      var Xn = pe.extend({
        // @section
        // @aka Popup options
        options: {
          // @option pane: String = 'popupPane'
          // `Map pane` where the popup will be added.
          pane: "popupPane",
          // @option offset: Point = Point(0, 7)
          // The offset of the popup position.
          offset: [0, 7],
          // @option maxWidth: Number = 300
          // Max width of the popup, in pixels.
          maxWidth: 300,
          // @option minWidth: Number = 50
          // Min width of the popup, in pixels.
          minWidth: 50,
          // @option maxHeight: Number = null
          // If set, creates a scrollable container of the given height
          // inside a popup if its content exceeds it.
          // The scrollable container can be styled using the
          // `leaflet-popup-scrolled` CSS class selector.
          maxHeight: null,
          // @option autoPan: Boolean = true
          // Set it to `false` if you don't want the map to do panning animation
          // to fit the opened popup.
          autoPan: !0,
          // @option autoPanPaddingTopLeft: Point = null
          // The margin between the popup and the top left corner of the map
          // view after autopanning was performed.
          autoPanPaddingTopLeft: null,
          // @option autoPanPaddingBottomRight: Point = null
          // The margin between the popup and the bottom right corner of the map
          // view after autopanning was performed.
          autoPanPaddingBottomRight: null,
          // @option autoPanPadding: Point = Point(5, 5)
          // Equivalent of setting both top left and bottom right autopan padding to the same value.
          autoPanPadding: [5, 5],
          // @option keepInView: Boolean = false
          // Set it to `true` if you want to prevent users from panning the popup
          // off of the screen while it is open.
          keepInView: !1,
          // @option closeButton: Boolean = true
          // Controls the presence of a close button in the popup.
          closeButton: !0,
          // @option autoClose: Boolean = true
          // Set it to `false` if you want to override the default behavior of
          // the popup closing when another popup is opened.
          autoClose: !0,
          // @option closeOnEscapeKey: Boolean = true
          // Set it to `false` if you want to override the default behavior of
          // the ESC key for closing of the popup.
          closeOnEscapeKey: !0,
          // @option closeOnClick: Boolean = *
          // Set it if you want to override the default behavior of the popup closing when user clicks
          // on the map. Defaults to the map's [`closePopupOnClick`](#map-closepopuponclick) option.
          // @option className: String = ''
          // A custom CSS class name to assign to the popup.
          className: ""
        },
        // @namespace Popup
        // @method openOn(map: Map): this
        // Alternative to `map.openPopup(popup)`.
        // Adds the popup to the map and closes the previous one.
        openOn: function(i) {
          return i = arguments.length ? i : this._source._map, !i.hasLayer(this) && i._popup && i._popup.options.autoClose && i.removeLayer(i._popup), i._popup = this, pe.prototype.openOn.call(this, i);
        },
        onAdd: function(i) {
          pe.prototype.onAdd.call(this, i), i.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof De || this._source.on("preclick", $e));
        },
        onRemove: function(i) {
          pe.prototype.onRemove.call(this, i), i.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof De || this._source.off("preclick", $e));
        },
        getEvents: function() {
          var i = pe.prototype.getEvents.call(this);
          return (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (i.preclick = this.close), this.options.keepInView && (i.moveend = this._adjustPan), i;
        },
        _initLayout: function() {
          var i = "leaflet-popup", l = this._container = lt(
            "div",
            i + " " + (this.options.className || "") + " leaflet-zoom-animated"
          ), u = this._wrapper = lt("div", i + "-content-wrapper", l);
          if (this._contentNode = lt("div", i + "-content", u), Ui(l), Ks(this._contentNode), q(l, "contextmenu", $e), this._tipContainer = lt("div", i + "-tip-container", l), this._tip = lt("div", i + "-tip", this._tipContainer), this.options.closeButton) {
            var f = this._closeButton = lt("a", i + "-close-button", l);
            f.setAttribute("role", "button"), f.setAttribute("aria-label", "Close popup"), f.href = "#close", f.innerHTML = '<span aria-hidden="true">&#215;</span>', q(f, "click", function(m) {
              Nt(m), this.close();
            }, this);
          }
        },
        _updateLayout: function() {
          var i = this._contentNode, l = i.style;
          l.width = "", l.whiteSpace = "nowrap";
          var u = i.offsetWidth;
          u = Math.min(u, this.options.maxWidth), u = Math.max(u, this.options.minWidth), l.width = u + 1 + "px", l.whiteSpace = "", l.height = "";
          var f = i.offsetHeight, m = this.options.maxHeight, y = "leaflet-popup-scrolled";
          m && f > m ? (l.height = m + "px", $(i, y)) : Tt(i, y), this._containerWidth = this._container.offsetWidth;
        },
        _animateZoom: function(i) {
          var l = this._map._latLngToNewLayerPoint(this._latlng, i.zoom, i.center), u = this._getAnchor();
          Ot(this._container, l.add(u));
        },
        _adjustPan: function() {
          if (this.options.autoPan) {
            if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning) {
              this._autopanning = !1;
              return;
            }
            var i = this._map, l = parseInt(Hi(this._container, "marginBottom"), 10) || 0, u = this._container.offsetHeight + l, f = this._containerWidth, m = new H(this._containerLeft, -u - this._containerBottom);
            m._add(Je(this._container));
            var y = i.layerPointToContainerPoint(m), w = F(this.options.autoPanPadding), k = F(this.options.autoPanPaddingTopLeft || w), C = F(this.options.autoPanPaddingBottomRight || w), E = i.getSize(), R = 0, j = 0;
            y.x + f + C.x > E.x && (R = y.x + f - E.x + C.x), y.x - R - k.x < 0 && (R = y.x - k.x), y.y + u + C.y > E.y && (j = y.y + u - E.y + C.y), y.y - j - k.y < 0 && (j = y.y - k.y), (R || j) && (this.options.keepInView && (this._autopanning = !0), i.fire("autopanstart").panBy([R, j]));
          }
        },
        _getAnchor: function() {
          return F(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
        }
      }), fc = function(i, l) {
        return new Xn(i, l);
      };
      ot.mergeOptions({
        closePopupOnClick: !0
      }), ot.include({
        // @method openPopup(popup: Popup): this
        // Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
        // @alternative
        // @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
        // Creates a popup with the specified content and options and opens it in the given point on a map.
        openPopup: function(i, l, u) {
          return this._initOverlay(Xn, i, l, u).openOn(this), this;
        },
        // @method closePopup(popup?: Popup): this
        // Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
        closePopup: function(i) {
          return i = arguments.length ? i : this._popup, i && i.close(), this;
        }
      }), re.include({
        // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
        // Binds a popup to the layer with the passed `content` and sets up the
        // necessary event listeners. If a `Function` is passed it will receive
        // the layer as the first argument and should return a `String` or `HTMLElement`.
        bindPopup: function(i, l) {
          return this._popup = this._initOverlay(Xn, this._popup, i, l), this._popupHandlersAdded || (this.on({
            click: this._openPopup,
            keypress: this._onKeyPress,
            remove: this.closePopup,
            move: this._movePopup
          }), this._popupHandlersAdded = !0), this;
        },
        // @method unbindPopup(): this
        // Removes the popup previously bound with `bindPopup`.
        unbindPopup: function() {
          return this._popup && (this.off({
            click: this._openPopup,
            keypress: this._onKeyPress,
            remove: this.closePopup,
            move: this._movePopup
          }), this._popupHandlersAdded = !1, this._popup = null), this;
        },
        // @method openPopup(latlng?: LatLng): this
        // Opens the bound popup at the specified `latlng` or at the default popup anchor if no `latlng` is passed.
        openPopup: function(i) {
          return this._popup && (this instanceof ye || (this._popup._source = this), this._popup._prepareOpen(i || this._latlng) && this._popup.openOn(this._map)), this;
        },
        // @method closePopup(): this
        // Closes the popup bound to this layer if it is open.
        closePopup: function() {
          return this._popup && this._popup.close(), this;
        },
        // @method togglePopup(): this
        // Opens or closes the popup bound to this layer depending on its current state.
        togglePopup: function() {
          return this._popup && this._popup.toggle(this), this;
        },
        // @method isPopupOpen(): boolean
        // Returns `true` if the popup bound to this layer is currently open.
        isPopupOpen: function() {
          return this._popup ? this._popup.isOpen() : !1;
        },
        // @method setPopupContent(content: String|HTMLElement|Popup): this
        // Sets the content of the popup bound to this layer.
        setPopupContent: function(i) {
          return this._popup && this._popup.setContent(i), this;
        },
        // @method getPopup(): Popup
        // Returns the popup bound to this layer.
        getPopup: function() {
          return this._popup;
        },
        _openPopup: function(i) {
          if (!(!this._popup || !this._map)) {
            Qe(i);
            var l = i.layer || i.target;
            if (this._popup._source === l && !(l instanceof De)) {
              this._map.hasLayer(this._popup) ? this.closePopup() : this.openPopup(i.latlng);
              return;
            }
            this._popup._source = l, this.openPopup(i.latlng);
          }
        },
        _movePopup: function(i) {
          this._popup.setLatLng(i.latlng);
        },
        _onKeyPress: function(i) {
          i.originalEvent.keyCode === 13 && this._openPopup(i);
        }
      });
      var Kn = pe.extend({
        // @section
        // @aka Tooltip options
        options: {
          // @option pane: String = 'tooltipPane'
          // `Map pane` where the tooltip will be added.
          pane: "tooltipPane",
          // @option offset: Point = Point(0, 0)
          // Optional offset of the tooltip position.
          offset: [0, 0],
          // @option direction: String = 'auto'
          // Direction where to open the tooltip. Possible values are: `right`, `left`,
          // `top`, `bottom`, `center`, `auto`.
          // `auto` will dynamically switch between `right` and `left` according to the tooltip
          // position on the map.
          direction: "auto",
          // @option permanent: Boolean = false
          // Whether to open the tooltip permanently or only on mouseover.
          permanent: !1,
          // @option sticky: Boolean = false
          // If true, the tooltip will follow the mouse instead of being fixed at the feature center.
          sticky: !1,
          // @option opacity: Number = 0.9
          // Tooltip container opacity.
          opacity: 0.9
        },
        onAdd: function(i) {
          pe.prototype.onAdd.call(this, i), this.setOpacity(this.options.opacity), i.fire("tooltipopen", { tooltip: this }), this._source && (this.addEventParent(this._source), this._source.fire("tooltipopen", { tooltip: this }, !0));
        },
        onRemove: function(i) {
          pe.prototype.onRemove.call(this, i), i.fire("tooltipclose", { tooltip: this }), this._source && (this.removeEventParent(this._source), this._source.fire("tooltipclose", { tooltip: this }, !0));
        },
        getEvents: function() {
          var i = pe.prototype.getEvents.call(this);
          return this.options.permanent || (i.preclick = this.close), i;
        },
        _initLayout: function() {
          var i = "leaflet-tooltip", l = i + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
          this._contentNode = this._container = lt("div", l), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + c(this));
        },
        _updateLayout: function() {
        },
        _adjustPan: function() {
        },
        _setPosition: function(i) {
          var l, u, f = this._map, m = this._container, y = f.latLngToContainerPoint(f.getCenter()), w = f.layerPointToContainerPoint(i), k = this.options.direction, C = m.offsetWidth, E = m.offsetHeight, R = F(this.options.offset), j = this._getAnchor();
          k === "top" ? (l = C / 2, u = E) : k === "bottom" ? (l = C / 2, u = 0) : k === "center" ? (l = C / 2, u = E / 2) : k === "right" ? (l = 0, u = E / 2) : k === "left" ? (l = C, u = E / 2) : w.x < y.x ? (k = "right", l = 0, u = E / 2) : (k = "left", l = C + (R.x + j.x) * 2, u = E / 2), i = i.subtract(F(l, u, !0)).add(R).add(j), Tt(m, "leaflet-tooltip-right"), Tt(m, "leaflet-tooltip-left"), Tt(m, "leaflet-tooltip-top"), Tt(m, "leaflet-tooltip-bottom"), $(m, "leaflet-tooltip-" + k), Ot(m, i);
        },
        _updatePosition: function() {
          var i = this._map.latLngToLayerPoint(this._latlng);
          this._setPosition(i);
        },
        setOpacity: function(i) {
          this.options.opacity = i, this._container && te(this._container, i);
        },
        _animateZoom: function(i) {
          var l = this._map._latLngToNewLayerPoint(this._latlng, i.zoom, i.center);
          this._setPosition(l);
        },
        _getAnchor: function() {
          return F(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
        }
      }), pc = function(i, l) {
        return new Kn(i, l);
      };
      ot.include({
        // @method openTooltip(tooltip: Tooltip): this
        // Opens the specified tooltip.
        // @alternative
        // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
        // Creates a tooltip with the specified content and options and open it.
        openTooltip: function(i, l, u) {
          return this._initOverlay(Kn, i, l, u).openOn(this), this;
        },
        // @method closeTooltip(tooltip: Tooltip): this
        // Closes the tooltip given as parameter.
        closeTooltip: function(i) {
          return i.close(), this;
        }
      }), re.include({
        // @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
        // Binds a tooltip to the layer with the passed `content` and sets up the
        // necessary event listeners. If a `Function` is passed it will receive
        // the layer as the first argument and should return a `String` or `HTMLElement`.
        bindTooltip: function(i, l) {
          return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(Kn, this._tooltip, i, l), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
        },
        // @method unbindTooltip(): this
        // Removes the tooltip previously bound with `bindTooltip`.
        unbindTooltip: function() {
          return this._tooltip && (this._initTooltipInteractions(!0), this.closeTooltip(), this._tooltip = null), this;
        },
        _initTooltipInteractions: function(i) {
          if (!(!i && this._tooltipHandlersAdded)) {
            var l = i ? "off" : "on", u = {
              remove: this.closeTooltip,
              move: this._moveTooltip
            };
            this._tooltip.options.permanent ? u.add = this._openTooltip : (u.mouseover = this._openTooltip, u.mouseout = this.closeTooltip, u.click = this._openTooltip, this._map ? this._addFocusListeners() : u.add = this._addFocusListeners), this._tooltip.options.sticky && (u.mousemove = this._moveTooltip), this[l](u), this._tooltipHandlersAdded = !i;
          }
        },
        // @method openTooltip(latlng?: LatLng): this
        // Opens the bound tooltip at the specified `latlng` or at the default tooltip anchor if no `latlng` is passed.
        openTooltip: function(i) {
          return this._tooltip && (this instanceof ye || (this._tooltip._source = this), this._tooltip._prepareOpen(i) && (this._tooltip.openOn(this._map), this.getElement ? this._setAriaDescribedByOnLayer(this) : this.eachLayer && this.eachLayer(this._setAriaDescribedByOnLayer, this))), this;
        },
        // @method closeTooltip(): this
        // Closes the tooltip bound to this layer if it is open.
        closeTooltip: function() {
          if (this._tooltip)
            return this._tooltip.close();
        },
        // @method toggleTooltip(): this
        // Opens or closes the tooltip bound to this layer depending on its current state.
        toggleTooltip: function() {
          return this._tooltip && this._tooltip.toggle(this), this;
        },
        // @method isTooltipOpen(): boolean
        // Returns `true` if the tooltip bound to this layer is currently open.
        isTooltipOpen: function() {
          return this._tooltip.isOpen();
        },
        // @method setTooltipContent(content: String|HTMLElement|Tooltip): this
        // Sets the content of the tooltip bound to this layer.
        setTooltipContent: function(i) {
          return this._tooltip && this._tooltip.setContent(i), this;
        },
        // @method getTooltip(): Tooltip
        // Returns the tooltip bound to this layer.
        getTooltip: function() {
          return this._tooltip;
        },
        _addFocusListeners: function() {
          this.getElement ? this._addFocusListenersOnLayer(this) : this.eachLayer && this.eachLayer(this._addFocusListenersOnLayer, this);
        },
        _addFocusListenersOnLayer: function(i) {
          var l = typeof i.getElement == "function" && i.getElement();
          l && (q(l, "focus", function() {
            this._tooltip._source = i, this.openTooltip();
          }, this), q(l, "blur", this.closeTooltip, this));
        },
        _setAriaDescribedByOnLayer: function(i) {
          var l = typeof i.getElement == "function" && i.getElement();
          l && l.setAttribute("aria-describedby", this._tooltip._container.id);
        },
        _openTooltip: function(i) {
          if (!(!this._tooltip || !this._map)) {
            if (this._map.dragging && this._map.dragging.moving() && !this._openOnceFlag) {
              this._openOnceFlag = !0;
              var l = this;
              this._map.once("moveend", function() {
                l._openOnceFlag = !1, l._openTooltip(i);
              });
              return;
            }
            this._tooltip._source = i.layer || i.target, this.openTooltip(this._tooltip.options.sticky ? i.latlng : void 0);
          }
        },
        _moveTooltip: function(i) {
          var l = i.latlng, u, f;
          this._tooltip.options.sticky && i.originalEvent && (u = this._map.mouseEventToContainerPoint(i.originalEvent), f = this._map.containerPointToLayerPoint(u), l = this._map.layerPointToLatLng(f)), this._tooltip.setLatLng(l);
        }
      });
      var Rr = wi.extend({
        options: {
          // @section
          // @aka DivIcon options
          iconSize: [12, 12],
          // also can be set through CSS
          // iconAnchor: (Point),
          // popupAnchor: (Point),
          // @option html: String|HTMLElement = ''
          // Custom HTML code to put inside the div element, empty by default. Alternatively,
          // an instance of `HTMLElement`.
          html: !1,
          // @option bgPos: Point = [0, 0]
          // Optional relative position of the background, in pixels
          bgPos: null,
          className: "leaflet-div-icon"
        },
        createIcon: function(i) {
          var l = i && i.tagName === "DIV" ? i : document.createElement("div"), u = this.options;
          if (u.html instanceof Element ? (Bn(l), l.appendChild(u.html)) : l.innerHTML = u.html !== !1 ? u.html : "", u.bgPos) {
            var f = F(u.bgPos);
            l.style.backgroundPosition = -f.x + "px " + -f.y + "px";
          }
          return this._setIconStyles(l, "icon"), l;
        },
        createShadow: function() {
          return null;
        }
      });
      function gc(i) {
        return new Rr(i);
      }
      wi.Default = qi;
      var Xi = re.extend({
        // @section
        // @aka GridLayer options
        options: {
          // @option tileSize: Number|Point = 256
          // Width and height of tiles in the grid. Use a number if width and height are equal, or `L.point(width, height)` otherwise.
          tileSize: 256,
          // @option opacity: Number = 1.0
          // Opacity of the tiles. Can be used in the `createTile()` function.
          opacity: 1,
          // @option updateWhenIdle: Boolean = (depends)
          // Load new tiles only when panning ends.
          // `true` by default on mobile browsers, in order to avoid too many requests and keep smooth navigation.
          // `false` otherwise in order to display new tiles _during_ panning, since it is easy to pan outside the
          // [`keepBuffer`](#gridlayer-keepbuffer) option in desktop browsers.
          updateWhenIdle: W.mobile,
          // @option updateWhenZooming: Boolean = true
          // By default, a smooth zoom animation (during a [touch zoom](#map-touchzoom) or a [`flyTo()`](#map-flyto)) will update grid layers every integer zoom level. Setting this option to `false` will update the grid layer only when the smooth animation ends.
          updateWhenZooming: !0,
          // @option updateInterval: Number = 200
          // Tiles will not update more than once every `updateInterval` milliseconds when panning.
          updateInterval: 200,
          // @option zIndex: Number = 1
          // The explicit zIndex of the tile layer.
          zIndex: 1,
          // @option bounds: LatLngBounds = undefined
          // If set, tiles will only be loaded inside the set `LatLngBounds`.
          bounds: null,
          // @option minZoom: Number = 0
          // The minimum zoom level down to which this layer will be displayed (inclusive).
          minZoom: 0,
          // @option maxZoom: Number = undefined
          // The maximum zoom level up to which this layer will be displayed (inclusive).
          maxZoom: void 0,
          // @option maxNativeZoom: Number = undefined
          // Maximum zoom number the tile source has available. If it is specified,
          // the tiles on all zoom levels higher than `maxNativeZoom` will be loaded
          // from `maxNativeZoom` level and auto-scaled.
          maxNativeZoom: void 0,
          // @option minNativeZoom: Number = undefined
          // Minimum zoom number the tile source has available. If it is specified,
          // the tiles on all zoom levels lower than `minNativeZoom` will be loaded
          // from `minNativeZoom` level and auto-scaled.
          minNativeZoom: void 0,
          // @option noWrap: Boolean = false
          // Whether the layer is wrapped around the antimeridian. If `true`, the
          // GridLayer will only be displayed once at low zoom levels. Has no
          // effect when the [map CRS](#map-crs) doesn't wrap around. Can be used
          // in combination with [`bounds`](#gridlayer-bounds) to prevent requesting
          // tiles outside the CRS limits.
          noWrap: !1,
          // @option pane: String = 'tilePane'
          // `Map pane` where the grid layer will be added.
          pane: "tilePane",
          // @option className: String = ''
          // A custom class name to assign to the tile layer. Empty by default.
          className: "",
          // @option keepBuffer: Number = 2
          // When panning the map, keep this many rows and columns of tiles before unloading them.
          keepBuffer: 2
        },
        initialize: function(i) {
          x(this, i);
        },
        onAdd: function() {
          this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView();
        },
        beforeAdd: function(i) {
          i._addZoomLimit(this);
        },
        onRemove: function(i) {
          this._removeAllTiles(), Mt(this._container), i._removeZoomLimit(this), this._container = null, this._tileZoom = void 0;
        },
        // @method bringToFront: this
        // Brings the tile layer to the top of all tile layers.
        bringToFront: function() {
          return this._map && (yi(this._container), this._setAutoZIndex(Math.max)), this;
        },
        // @method bringToBack: this
        // Brings the tile layer to the bottom of all tile layers.
        bringToBack: function() {
          return this._map && (bi(this._container), this._setAutoZIndex(Math.min)), this;
        },
        // @method getContainer: HTMLElement
        // Returns the HTML element that contains the tiles for this layer.
        getContainer: function() {
          return this._container;
        },
        // @method setOpacity(opacity: Number): this
        // Changes the [opacity](#gridlayer-opacity) of the grid layer.
        setOpacity: function(i) {
          return this.options.opacity = i, this._updateOpacity(), this;
        },
        // @method setZIndex(zIndex: Number): this
        // Changes the [zIndex](#gridlayer-zindex) of the grid layer.
        setZIndex: function(i) {
          return this.options.zIndex = i, this._updateZIndex(), this;
        },
        // @method isLoading: Boolean
        // Returns `true` if any tile in the grid layer has not finished loading.
        isLoading: function() {
          return this._loading;
        },
        // @method redraw: this
        // Causes the layer to clear all the tiles and request them again.
        redraw: function() {
          if (this._map) {
            this._removeAllTiles();
            var i = this._clampZoom(this._map.getZoom());
            i !== this._tileZoom && (this._tileZoom = i, this._updateLevels()), this._update();
          }
          return this;
        },
        getEvents: function() {
          var i = {
            viewprereset: this._invalidateAll,
            viewreset: this._resetView,
            zoom: this._resetView,
            moveend: this._onMoveEnd
          };
          return this.options.updateWhenIdle || (this._onMove || (this._onMove = d(this._onMoveEnd, this.options.updateInterval, this)), i.move = this._onMove), this._zoomAnimated && (i.zoomanim = this._animateZoom), i;
        },
        // @section Extension methods
        // Layers extending `GridLayer` shall reimplement the following method.
        // @method createTile(coords: Object, done?: Function): HTMLElement
        // Called only internally, must be overridden by classes extending `GridLayer`.
        // Returns the `HTMLElement` corresponding to the given `coords`. If the `done` callback
        // is specified, it must be called when the tile has finished loading and drawing.
        createTile: function() {
          return document.createElement("div");
        },
        // @section
        // @method getTileSize: Point
        // Normalizes the [tileSize option](#gridlayer-tilesize) into a point. Used by the `createTile()` method.
        getTileSize: function() {
          var i = this.options.tileSize;
          return i instanceof H ? i : new H(i, i);
        },
        _updateZIndex: function() {
          this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._container.style.zIndex = this.options.zIndex);
        },
        _setAutoZIndex: function(i) {
          for (var l = this.getPane().children, u = -i(-1 / 0, 1 / 0), f = 0, m = l.length, y; f < m; f++)
            y = l[f].style.zIndex, l[f] !== this._container && y && (u = i(u, +y));
          isFinite(u) && (this.options.zIndex = u + i(-1, 1), this._updateZIndex());
        },
        _updateOpacity: function() {
          if (this._map && !W.ielt9) {
            te(this._container, this.options.opacity);
            var i = +/* @__PURE__ */ new Date(), l = !1, u = !1;
            for (var f in this._tiles) {
              var m = this._tiles[f];
              if (!(!m.current || !m.loaded)) {
                var y = Math.min(1, (i - m.loaded) / 200);
                te(m.el, y), y < 1 ? l = !0 : (m.active ? u = !0 : this._onOpaqueTile(m), m.active = !0);
              }
            }
            u && !this._noPrune && this._pruneTiles(), l && (V(this._fadeFrame), this._fadeFrame = Z(this._updateOpacity, this));
          }
        },
        _onOpaqueTile: g,
        _initContainer: function() {
          this._container || (this._container = lt("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
        },
        _updateLevels: function() {
          var i = this._tileZoom, l = this.options.maxZoom;
          if (i !== void 0) {
            for (var u in this._levels)
              u = Number(u), this._levels[u].el.children.length || u === i ? (this._levels[u].el.style.zIndex = l - Math.abs(i - u), this._onUpdateLevel(u)) : (Mt(this._levels[u].el), this._removeTilesAtZoom(u), this._onRemoveLevel(u), delete this._levels[u]);
            var f = this._levels[i], m = this._map;
            return f || (f = this._levels[i] = {}, f.el = lt("div", "leaflet-tile-container leaflet-zoom-animated", this._container), f.el.style.zIndex = l, f.origin = m.project(m.unproject(m.getPixelOrigin()), i).round(), f.zoom = i, this._setZoomTransform(f, m.getCenter(), m.getZoom()), g(f.el.offsetWidth), this._onCreateLevel(f)), this._level = f, f;
          }
        },
        _onUpdateLevel: g,
        _onRemoveLevel: g,
        _onCreateLevel: g,
        _pruneTiles: function() {
          if (this._map) {
            var i, l, u = this._map.getZoom();
            if (u > this.options.maxZoom || u < this.options.minZoom) {
              this._removeAllTiles();
              return;
            }
            for (i in this._tiles)
              l = this._tiles[i], l.retain = l.current;
            for (i in this._tiles)
              if (l = this._tiles[i], l.current && !l.active) {
                var f = l.coords;
                this._retainParent(f.x, f.y, f.z, f.z - 5) || this._retainChildren(f.x, f.y, f.z, f.z + 2);
              }
            for (i in this._tiles)
              this._tiles[i].retain || this._removeTile(i);
          }
        },
        _removeTilesAtZoom: function(i) {
          for (var l in this._tiles)
            this._tiles[l].coords.z === i && this._removeTile(l);
        },
        _removeAllTiles: function() {
          for (var i in this._tiles)
            this._removeTile(i);
        },
        _invalidateAll: function() {
          for (var i in this._levels)
            Mt(this._levels[i].el), this._onRemoveLevel(Number(i)), delete this._levels[i];
          this._removeAllTiles(), this._tileZoom = void 0;
        },
        _retainParent: function(i, l, u, f) {
          var m = Math.floor(i / 2), y = Math.floor(l / 2), w = u - 1, k = new H(+m, +y);
          k.z = +w;
          var C = this._tileCoordsToKey(k), E = this._tiles[C];
          return E && E.active ? (E.retain = !0, !0) : (E && E.loaded && (E.retain = !0), w > f ? this._retainParent(m, y, w, f) : !1);
        },
        _retainChildren: function(i, l, u, f) {
          for (var m = 2 * i; m < 2 * i + 2; m++)
            for (var y = 2 * l; y < 2 * l + 2; y++) {
              var w = new H(m, y);
              w.z = u + 1;
              var k = this._tileCoordsToKey(w), C = this._tiles[k];
              if (C && C.active) {
                C.retain = !0;
                continue;
              } else
                C && C.loaded && (C.retain = !0);
              u + 1 < f && this._retainChildren(m, y, u + 1, f);
            }
        },
        _resetView: function(i) {
          var l = i && (i.pinch || i.flyTo);
          this._setView(this._map.getCenter(), this._map.getZoom(), l, l);
        },
        _animateZoom: function(i) {
          this._setView(i.center, i.zoom, !0, i.noUpdate);
        },
        _clampZoom: function(i) {
          var l = this.options;
          return l.minNativeZoom !== void 0 && i < l.minNativeZoom ? l.minNativeZoom : l.maxNativeZoom !== void 0 && l.maxNativeZoom < i ? l.maxNativeZoom : i;
        },
        _setView: function(i, l, u, f) {
          var m = Math.round(l);
          this.options.maxZoom !== void 0 && m > this.options.maxZoom || this.options.minZoom !== void 0 && m < this.options.minZoom ? m = void 0 : m = this._clampZoom(m);
          var y = this.options.updateWhenZooming && m !== this._tileZoom;
          (!f || y) && (this._tileZoom = m, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), m !== void 0 && this._update(i), u || this._pruneTiles(), this._noPrune = !!u), this._setZoomTransforms(i, l);
        },
        _setZoomTransforms: function(i, l) {
          for (var u in this._levels)
            this._setZoomTransform(this._levels[u], i, l);
        },
        _setZoomTransform: function(i, l, u) {
          var f = this._map.getZoomScale(u, i.zoom), m = i.origin.multiplyBy(f).subtract(this._map._getNewPixelOrigin(l, u)).round();
          W.any3d ? Ke(i.el, m, f) : Ot(i.el, m);
        },
        _resetGrid: function() {
          var i = this._map, l = i.options.crs, u = this._tileSize = this.getTileSize(), f = this._tileZoom, m = this._map.getPixelWorldBounds(this._tileZoom);
          m && (this._globalTileRange = this._pxBoundsToTileRange(m)), this._wrapX = l.wrapLng && !this.options.noWrap && [
            Math.floor(i.project([0, l.wrapLng[0]], f).x / u.x),
            Math.ceil(i.project([0, l.wrapLng[1]], f).x / u.y)
          ], this._wrapY = l.wrapLat && !this.options.noWrap && [
            Math.floor(i.project([l.wrapLat[0], 0], f).y / u.x),
            Math.ceil(i.project([l.wrapLat[1], 0], f).y / u.y)
          ];
        },
        _onMoveEnd: function() {
          !this._map || this._map._animatingZoom || this._update();
        },
        _getTiledPixelBounds: function(i) {
          var l = this._map, u = l._animatingZoom ? Math.max(l._animateToZoom, l.getZoom()) : l.getZoom(), f = l.getZoomScale(u, this._tileZoom), m = l.project(i, this._tileZoom).floor(), y = l.getSize().divideBy(f * 2);
          return new G(m.subtract(y), m.add(y));
        },
        // Private method to load tiles in the grid's active zoom level according to map bounds
        _update: function(i) {
          var l = this._map;
          if (l) {
            var u = this._clampZoom(l.getZoom());
            if (i === void 0 && (i = l.getCenter()), this._tileZoom !== void 0) {
              var f = this._getTiledPixelBounds(i), m = this._pxBoundsToTileRange(f), y = m.getCenter(), w = [], k = this.options.keepBuffer, C = new G(
                m.getBottomLeft().subtract([k, -k]),
                m.getTopRight().add([k, -k])
              );
              if (!(isFinite(m.min.x) && isFinite(m.min.y) && isFinite(m.max.x) && isFinite(m.max.y)))
                throw new Error("Attempted to load an infinite number of tiles");
              for (var E in this._tiles) {
                var R = this._tiles[E].coords;
                (R.z !== this._tileZoom || !C.contains(new H(R.x, R.y))) && (this._tiles[E].current = !1);
              }
              if (Math.abs(u - this._tileZoom) > 1) {
                this._setView(i, u);
                return;
              }
              for (var j = m.min.y; j <= m.max.y; j++)
                for (var tt = m.min.x; tt <= m.max.x; tt++) {
                  var jt = new H(tt, j);
                  if (jt.z = this._tileZoom, !!this._isValidTile(jt)) {
                    var Bt = this._tiles[this._tileCoordsToKey(jt)];
                    Bt ? Bt.current = !0 : w.push(jt);
                  }
                }
              if (w.sort(function(Ut, ki) {
                return Ut.distanceTo(y) - ki.distanceTo(y);
              }), w.length !== 0) {
                this._loading || (this._loading = !0, this.fire("loading"));
                var ie = document.createDocumentFragment();
                for (tt = 0; tt < w.length; tt++)
                  this._addTile(w[tt], ie);
                this._level.el.appendChild(ie);
              }
            }
          }
        },
        _isValidTile: function(i) {
          var l = this._map.options.crs;
          if (!l.infinite) {
            var u = this._globalTileRange;
            if (!l.wrapLng && (i.x < u.min.x || i.x > u.max.x) || !l.wrapLat && (i.y < u.min.y || i.y > u.max.y))
              return !1;
          }
          if (!this.options.bounds)
            return !0;
          var f = this._tileCoordsToBounds(i);
          return at(this.options.bounds).overlaps(f);
        },
        _keyToBounds: function(i) {
          return this._tileCoordsToBounds(this._keyToTileCoords(i));
        },
        _tileCoordsToNwSe: function(i) {
          var l = this._map, u = this.getTileSize(), f = i.scaleBy(u), m = f.add(u), y = l.unproject(f, i.z), w = l.unproject(m, i.z);
          return [y, w];
        },
        // converts tile coordinates to its geographical bounds
        _tileCoordsToBounds: function(i) {
          var l = this._tileCoordsToNwSe(i), u = new xt(l[0], l[1]);
          return this.options.noWrap || (u = this._map.wrapLatLngBounds(u)), u;
        },
        // converts tile coordinates to key for the tile cache
        _tileCoordsToKey: function(i) {
          return i.x + ":" + i.y + ":" + i.z;
        },
        // converts tile cache key to coordinates
        _keyToTileCoords: function(i) {
          var l = i.split(":"), u = new H(+l[0], +l[1]);
          return u.z = +l[2], u;
        },
        _removeTile: function(i) {
          var l = this._tiles[i];
          l && (Mt(l.el), delete this._tiles[i], this.fire("tileunload", {
            tile: l.el,
            coords: this._keyToTileCoords(i)
          }));
        },
        _initTile: function(i) {
          $(i, "leaflet-tile");
          var l = this.getTileSize();
          i.style.width = l.x + "px", i.style.height = l.y + "px", i.onselectstart = g, i.onmousemove = g, W.ielt9 && this.options.opacity < 1 && te(i, this.options.opacity);
        },
        _addTile: function(i, l) {
          var u = this._getTilePos(i), f = this._tileCoordsToKey(i), m = this.createTile(this._wrapCoords(i), a(this._tileReady, this, i));
          this._initTile(m), this.createTile.length < 2 && Z(a(this._tileReady, this, i, null, m)), Ot(m, u), this._tiles[f] = {
            el: m,
            coords: i,
            current: !0
          }, l.appendChild(m), this.fire("tileloadstart", {
            tile: m,
            coords: i
          });
        },
        _tileReady: function(i, l, u) {
          l && this.fire("tileerror", {
            error: l,
            tile: u,
            coords: i
          });
          var f = this._tileCoordsToKey(i);
          u = this._tiles[f], u && (u.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (te(u.el, 0), V(this._fadeFrame), this._fadeFrame = Z(this._updateOpacity, this)) : (u.active = !0, this._pruneTiles()), l || ($(u.el, "leaflet-tile-loaded"), this.fire("tileload", {
            tile: u.el,
            coords: i
          })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), W.ielt9 || !this._map._fadeAnimated ? Z(this._pruneTiles, this) : setTimeout(a(this._pruneTiles, this), 250)));
        },
        _getTilePos: function(i) {
          return i.scaleBy(this.getTileSize()).subtract(this._level.origin);
        },
        _wrapCoords: function(i) {
          var l = new H(
            this._wrapX ? p(i.x, this._wrapX) : i.x,
            this._wrapY ? p(i.y, this._wrapY) : i.y
          );
          return l.z = i.z, l;
        },
        _pxBoundsToTileRange: function(i) {
          var l = this.getTileSize();
          return new G(
            i.min.unscaleBy(l).floor(),
            i.max.unscaleBy(l).ceil().subtract([1, 1])
          );
        },
        _noTilesToLoad: function() {
          for (var i in this._tiles)
            if (!this._tiles[i].loaded)
              return !1;
          return !0;
        }
      });
      function mc(i) {
        return new Xi(i);
      }
      var Pi = Xi.extend({
        // @section
        // @aka TileLayer options
        options: {
          // @option minZoom: Number = 0
          // The minimum zoom level down to which this layer will be displayed (inclusive).
          minZoom: 0,
          // @option maxZoom: Number = 18
          // The maximum zoom level up to which this layer will be displayed (inclusive).
          maxZoom: 18,
          // @option subdomains: String|String[] = 'abc'
          // Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
          subdomains: "abc",
          // @option errorTileUrl: String = ''
          // URL to the tile image to show in place of the tile that failed to load.
          errorTileUrl: "",
          // @option zoomOffset: Number = 0
          // The zoom number used in tile URLs will be offset with this value.
          zoomOffset: 0,
          // @option tms: Boolean = false
          // If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
          tms: !1,
          // @option zoomReverse: Boolean = false
          // If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
          zoomReverse: !1,
          // @option detectRetina: Boolean = false
          // If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
          detectRetina: !1,
          // @option crossOrigin: Boolean|String = false
          // Whether the crossOrigin attribute will be added to the tiles.
          // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
          // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
          crossOrigin: !1,
          // @option referrerPolicy: Boolean|String = false
          // Whether the referrerPolicy attribute will be added to the tiles.
          // If a String is provided, all tiles will have their referrerPolicy attribute set to the String provided.
          // This may be needed if your map's rendering context has a strict default but your tile provider expects a valid referrer
          // (e.g. to validate an API token).
          // Refer to [HTMLImageElement.referrerPolicy](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/referrerPolicy) for valid String values.
          referrerPolicy: !1
        },
        initialize: function(i, l) {
          this._url = i, l = x(this, l), l.detectRetina && W.retina && l.maxZoom > 0 ? (l.tileSize = Math.floor(l.tileSize / 2), l.zoomReverse ? (l.zoomOffset--, l.minZoom = Math.min(l.maxZoom, l.minZoom + 1)) : (l.zoomOffset++, l.maxZoom = Math.max(l.minZoom, l.maxZoom - 1)), l.minZoom = Math.max(0, l.minZoom)) : l.zoomReverse ? l.minZoom = Math.min(l.maxZoom, l.minZoom) : l.maxZoom = Math.max(l.minZoom, l.maxZoom), typeof l.subdomains == "string" && (l.subdomains = l.subdomains.split("")), this.on("tileunload", this._onTileRemove);
        },
        // @method setUrl(url: String, noRedraw?: Boolean): this
        // Updates the layer's URL template and redraws it (unless `noRedraw` is set to `true`).
        // If the URL does not change, the layer will not be redrawn unless
        // the noRedraw parameter is set to false.
        setUrl: function(i, l) {
          return this._url === i && l === void 0 && (l = !0), this._url = i, l || this.redraw(), this;
        },
        // @method createTile(coords: Object, done?: Function): HTMLElement
        // Called only internally, overrides GridLayer's [`createTile()`](#gridlayer-createtile)
        // to return an `<img>` HTML element with the appropriate image URL given `coords`. The `done`
        // callback is called when the tile has been loaded.
        createTile: function(i, l) {
          var u = document.createElement("img");
          return q(u, "load", a(this._tileOnLoad, this, l, u)), q(u, "error", a(this._tileOnError, this, l, u)), (this.options.crossOrigin || this.options.crossOrigin === "") && (u.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (u.referrerPolicy = this.options.referrerPolicy), u.alt = "", u.src = this.getTileUrl(i), u;
        },
        // @section Extension methods
        // @uninheritable
        // Layers extending `TileLayer` might reimplement the following method.
        // @method getTileUrl(coords: Object): String
        // Called only internally, returns the URL for a tile given its coordinates.
        // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
        getTileUrl: function(i) {
          var l = {
            r: W.retina ? "@2x" : "",
            s: this._getSubdomain(i),
            x: i.x,
            y: i.y,
            z: this._getZoomForUrl()
          };
          if (this._map && !this._map.options.crs.infinite) {
            var u = this._globalTileRange.max.y - i.y;
            this.options.tms && (l.y = u), l["-y"] = u;
          }
          return S(this._url, r(l, this.options));
        },
        _tileOnLoad: function(i, l) {
          W.ielt9 ? setTimeout(a(i, this, null, l), 0) : i(null, l);
        },
        _tileOnError: function(i, l, u) {
          var f = this.options.errorTileUrl;
          f && l.getAttribute("src") !== f && (l.src = f), i(u, l);
        },
        _onTileRemove: function(i) {
          i.tile.onload = null;
        },
        _getZoomForUrl: function() {
          var i = this._tileZoom, l = this.options.maxZoom, u = this.options.zoomReverse, f = this.options.zoomOffset;
          return u && (i = l - i), i + f;
        },
        _getSubdomain: function(i) {
          var l = Math.abs(i.x + i.y) % this.options.subdomains.length;
          return this.options.subdomains[l];
        },
        // stops loading all tiles in the background layer
        _abortLoading: function() {
          var i, l;
          for (i in this._tiles)
            if (this._tiles[i].coords.z !== this._tileZoom && (l = this._tiles[i].el, l.onload = g, l.onerror = g, !l.complete)) {
              l.src = T;
              var u = this._tiles[i].coords;
              Mt(l), delete this._tiles[i], this.fire("tileabort", {
                tile: l,
                coords: u
              });
            }
        },
        _removeTile: function(i) {
          var l = this._tiles[i];
          if (l)
            return l.el.setAttribute("src", T), Xi.prototype._removeTile.call(this, i);
        },
        _tileReady: function(i, l, u) {
          if (!(!this._map || u && u.getAttribute("src") === T))
            return Xi.prototype._tileReady.call(this, i, l, u);
        }
      });
      function Fr(i, l) {
        return new Pi(i, l);
      }
      var Nr = Pi.extend({
        // @section
        // @aka TileLayer.WMS options
        // If any custom options not documented here are used, they will be sent to the
        // WMS server as extra parameters in each request URL. This can be useful for
        // [non-standard vendor WMS parameters](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html).
        defaultWmsParams: {
          service: "WMS",
          request: "GetMap",
          // @option layers: String = ''
          // **(required)** Comma-separated list of WMS layers to show.
          layers: "",
          // @option styles: String = ''
          // Comma-separated list of WMS styles.
          styles: "",
          // @option format: String = 'image/jpeg'
          // WMS image format (use `'image/png'` for layers with transparency).
          format: "image/jpeg",
          // @option transparent: Boolean = false
          // If `true`, the WMS service will return images with transparency.
          transparent: !1,
          // @option version: String = '1.1.1'
          // Version of the WMS service to use
          version: "1.1.1"
        },
        options: {
          // @option crs: CRS = null
          // Coordinate Reference System to use for the WMS requests, defaults to
          // map CRS. Don't change this if you're not sure what it means.
          crs: null,
          // @option uppercase: Boolean = false
          // If `true`, WMS request parameter keys will be uppercase.
          uppercase: !1
        },
        initialize: function(i, l) {
          this._url = i;
          var u = r({}, this.defaultWmsParams);
          for (var f in l)
            f in this.options || (u[f] = l[f]);
          l = x(this, l);
          var m = l.detectRetina && W.retina ? 2 : 1, y = this.getTileSize();
          u.width = y.x * m, u.height = y.y * m, this.wmsParams = u;
        },
        onAdd: function(i) {
          this._crs = this.options.crs || i.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
          var l = this._wmsVersion >= 1.3 ? "crs" : "srs";
          this.wmsParams[l] = this._crs.code, Pi.prototype.onAdd.call(this, i);
        },
        getTileUrl: function(i) {
          var l = this._tileCoordsToNwSe(i), u = this._crs, f = ct(u.project(l[0]), u.project(l[1])), m = f.min, y = f.max, w = (this._wmsVersion >= 1.3 && this._crs === Or ? [m.y, m.x, y.y, y.x] : [m.x, m.y, y.x, y.y]).join(","), k = Pi.prototype.getTileUrl.call(this, i);
          return k + M(this.wmsParams, k, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + w;
        },
        // @method setParams(params: Object, noRedraw?: Boolean): this
        // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
        setParams: function(i, l) {
          return r(this.wmsParams, i), l || this.redraw(), this;
        }
      });
      function _c(i, l) {
        return new Nr(i, l);
      }
      Pi.WMS = Nr, Fr.wms = _c;
      var we = re.extend({
        // @section
        // @aka Renderer options
        options: {
          // @option padding: Number = 0.1
          // How much to extend the clip area around the map view (relative to its size)
          // e.g. 0.1 would be 10% of map view in each direction
          padding: 0.1
        },
        initialize: function(i) {
          x(this, i), c(this), this._layers = this._layers || {};
        },
        onAdd: function() {
          this._container || (this._initContainer(), $(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
        },
        onRemove: function() {
          this.off("update", this._updatePaths, this), this._destroyContainer();
        },
        getEvents: function() {
          var i = {
            viewreset: this._reset,
            zoom: this._onZoom,
            moveend: this._update,
            zoomend: this._onZoomEnd
          };
          return this._zoomAnimated && (i.zoomanim = this._onAnimZoom), i;
        },
        _onAnimZoom: function(i) {
          this._updateTransform(i.center, i.zoom);
        },
        _onZoom: function() {
          this._updateTransform(this._map.getCenter(), this._map.getZoom());
        },
        _updateTransform: function(i, l) {
          var u = this._map.getZoomScale(l, this._zoom), f = this._map.getSize().multiplyBy(0.5 + this.options.padding), m = this._map.project(this._center, l), y = f.multiplyBy(-u).add(m).subtract(this._map._getNewPixelOrigin(i, l));
          W.any3d ? Ke(this._container, y, u) : Ot(this._container, y);
        },
        _reset: function() {
          this._update(), this._updateTransform(this._center, this._zoom);
          for (var i in this._layers)
            this._layers[i]._reset();
        },
        _onZoomEnd: function() {
          for (var i in this._layers)
            this._layers[i]._project();
        },
        _updatePaths: function() {
          for (var i in this._layers)
            this._layers[i]._update();
        },
        _update: function() {
          var i = this.options.padding, l = this._map.getSize(), u = this._map.containerPointToLayerPoint(l.multiplyBy(-i)).round();
          this._bounds = new G(u, u.add(l.multiplyBy(1 + i * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
        }
      }), Zr = we.extend({
        // @section
        // @aka Canvas options
        options: {
          // @option tolerance: Number = 0
          // How much to extend the click tolerance around a path/object on the map.
          tolerance: 0
        },
        getEvents: function() {
          var i = we.prototype.getEvents.call(this);
          return i.viewprereset = this._onViewPreReset, i;
        },
        _onViewPreReset: function() {
          this._postponeUpdatePaths = !0;
        },
        onAdd: function() {
          we.prototype.onAdd.call(this), this._draw();
        },
        _initContainer: function() {
          var i = this._container = document.createElement("canvas");
          q(i, "mousemove", this._onMouseMove, this), q(i, "click dblclick mousedown mouseup contextmenu", this._onClick, this), q(i, "mouseout", this._handleMouseOut, this), i._leaflet_disable_events = !0, this._ctx = i.getContext("2d");
        },
        _destroyContainer: function() {
          V(this._redrawRequest), delete this._ctx, Mt(this._container), gt(this._container), delete this._container;
        },
        _updatePaths: function() {
          if (!this._postponeUpdatePaths) {
            var i;
            this._redrawBounds = null;
            for (var l in this._layers)
              i = this._layers[l], i._update();
            this._redraw();
          }
        },
        _update: function() {
          if (!(this._map._animatingZoom && this._bounds)) {
            we.prototype._update.call(this);
            var i = this._bounds, l = this._container, u = i.getSize(), f = W.retina ? 2 : 1;
            Ot(l, i.min), l.width = f * u.x, l.height = f * u.y, l.style.width = u.x + "px", l.style.height = u.y + "px", W.retina && this._ctx.scale(2, 2), this._ctx.translate(-i.min.x, -i.min.y), this.fire("update");
          }
        },
        _reset: function() {
          we.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
        },
        _initPath: function(i) {
          this._updateDashArray(i), this._layers[c(i)] = i;
          var l = i._order = {
            layer: i,
            prev: this._drawLast,
            next: null
          };
          this._drawLast && (this._drawLast.next = l), this._drawLast = l, this._drawFirst = this._drawFirst || this._drawLast;
        },
        _addPath: function(i) {
          this._requestRedraw(i);
        },
        _removePath: function(i) {
          var l = i._order, u = l.next, f = l.prev;
          u ? u.prev = f : this._drawLast = f, f ? f.next = u : this._drawFirst = u, delete i._order, delete this._layers[c(i)], this._requestRedraw(i);
        },
        _updatePath: function(i) {
          this._extendRedrawBounds(i), i._project(), i._update(), this._requestRedraw(i);
        },
        _updateStyle: function(i) {
          this._updateDashArray(i), this._requestRedraw(i);
        },
        _updateDashArray: function(i) {
          if (typeof i.options.dashArray == "string") {
            var l = i.options.dashArray.split(/[, ]+/), u = [], f, m;
            for (m = 0; m < l.length; m++) {
              if (f = Number(l[m]), isNaN(f))
                return;
              u.push(f);
            }
            i.options._dashArray = u;
          } else
            i.options._dashArray = i.options.dashArray;
        },
        _requestRedraw: function(i) {
          this._map && (this._extendRedrawBounds(i), this._redrawRequest = this._redrawRequest || Z(this._redraw, this));
        },
        _extendRedrawBounds: function(i) {
          if (i._pxBounds) {
            var l = (i.options.weight || 0) + 1;
            this._redrawBounds = this._redrawBounds || new G(), this._redrawBounds.extend(i._pxBounds.min.subtract([l, l])), this._redrawBounds.extend(i._pxBounds.max.add([l, l]));
          }
        },
        _redraw: function() {
          this._redrawRequest = null, this._redrawBounds && (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()), this._clear(), this._draw(), this._redrawBounds = null;
        },
        _clear: function() {
          var i = this._redrawBounds;
          if (i) {
            var l = i.getSize();
            this._ctx.clearRect(i.min.x, i.min.y, l.x, l.y);
          } else
            this._ctx.save(), this._ctx.setTransform(1, 0, 0, 1, 0, 0), this._ctx.clearRect(0, 0, this._container.width, this._container.height), this._ctx.restore();
        },
        _draw: function() {
          var i, l = this._redrawBounds;
          if (this._ctx.save(), l) {
            var u = l.getSize();
            this._ctx.beginPath(), this._ctx.rect(l.min.x, l.min.y, u.x, u.y), this._ctx.clip();
          }
          this._drawing = !0;
          for (var f = this._drawFirst; f; f = f.next)
            i = f.layer, (!l || i._pxBounds && i._pxBounds.intersects(l)) && i._updatePath();
          this._drawing = !1, this._ctx.restore();
        },
        _updatePoly: function(i, l) {
          if (this._drawing) {
            var u, f, m, y, w = i._parts, k = w.length, C = this._ctx;
            if (k) {
              for (C.beginPath(), u = 0; u < k; u++) {
                for (f = 0, m = w[u].length; f < m; f++)
                  y = w[u][f], C[f ? "lineTo" : "moveTo"](y.x, y.y);
                l && C.closePath();
              }
              this._fillStroke(C, i);
            }
          }
        },
        _updateCircle: function(i) {
          if (!(!this._drawing || i._empty())) {
            var l = i._point, u = this._ctx, f = Math.max(Math.round(i._radius), 1), m = (Math.max(Math.round(i._radiusY), 1) || f) / f;
            m !== 1 && (u.save(), u.scale(1, m)), u.beginPath(), u.arc(l.x, l.y / m, f, 0, Math.PI * 2, !1), m !== 1 && u.restore(), this._fillStroke(u, i);
          }
        },
        _fillStroke: function(i, l) {
          var u = l.options;
          u.fill && (i.globalAlpha = u.fillOpacity, i.fillStyle = u.fillColor || u.color, i.fill(u.fillRule || "evenodd")), u.stroke && u.weight !== 0 && (i.setLineDash && i.setLineDash(l.options && l.options._dashArray || []), i.globalAlpha = u.opacity, i.lineWidth = u.weight, i.strokeStyle = u.color, i.lineCap = u.lineCap, i.lineJoin = u.lineJoin, i.stroke());
        },
        // Canvas obviously doesn't have mouse events for individual drawn objects,
        // so we emulate that by calculating what's under the mouse on mousemove/click manually
        _onClick: function(i) {
          for (var l = this._map.mouseEventToLayerPoint(i), u, f, m = this._drawFirst; m; m = m.next)
            u = m.layer, u.options.interactive && u._containsPoint(l) && (!(i.type === "click" || i.type === "preclick") || !this._map._draggableMoved(u)) && (f = u);
          this._fireEvent(f ? [f] : !1, i);
        },
        _onMouseMove: function(i) {
          if (!(!this._map || this._map.dragging.moving() || this._map._animatingZoom)) {
            var l = this._map.mouseEventToLayerPoint(i);
            this._handleMouseHover(i, l);
          }
        },
        _handleMouseOut: function(i) {
          var l = this._hoveredLayer;
          l && (Tt(this._container, "leaflet-interactive"), this._fireEvent([l], i, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
        },
        _handleMouseHover: function(i, l) {
          if (!this._mouseHoverThrottled) {
            for (var u, f, m = this._drawFirst; m; m = m.next)
              u = m.layer, u.options.interactive && u._containsPoint(l) && (f = u);
            f !== this._hoveredLayer && (this._handleMouseOut(i), f && ($(this._container, "leaflet-interactive"), this._fireEvent([f], i, "mouseover"), this._hoveredLayer = f)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, i), this._mouseHoverThrottled = !0, setTimeout(a(function() {
              this._mouseHoverThrottled = !1;
            }, this), 32);
          }
        },
        _fireEvent: function(i, l, u) {
          this._map._fireDOMEvent(l, u || l.type, i);
        },
        _bringToFront: function(i) {
          var l = i._order;
          if (l) {
            var u = l.next, f = l.prev;
            if (u)
              u.prev = f;
            else
              return;
            f ? f.next = u : u && (this._drawFirst = u), l.prev = this._drawLast, this._drawLast.next = l, l.next = null, this._drawLast = l, this._requestRedraw(i);
          }
        },
        _bringToBack: function(i) {
          var l = i._order;
          if (l) {
            var u = l.next, f = l.prev;
            if (f)
              f.next = u;
            else
              return;
            u ? u.prev = f : f && (this._drawLast = f), l.prev = null, l.next = this._drawFirst, this._drawFirst.prev = l, this._drawFirst = l, this._requestRedraw(i);
          }
        }
      });
      function Hr(i) {
        return W.canvas ? new Zr(i) : null;
      }
      var Ki = function() {
        try {
          return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(i) {
            return document.createElement("<lvml:" + i + ' class="lvml">');
          };
        } catch {
        }
        return function(i) {
          return document.createElement("<" + i + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
        };
      }(), vc = {
        _initContainer: function() {
          this._container = lt("div", "leaflet-vml-container");
        },
        _update: function() {
          this._map._animatingZoom || (we.prototype._update.call(this), this.fire("update"));
        },
        _initPath: function(i) {
          var l = i._container = Ki("shape");
          $(l, "leaflet-vml-shape " + (this.options.className || "")), l.coordsize = "1 1", i._path = Ki("path"), l.appendChild(i._path), this._updateStyle(i), this._layers[c(i)] = i;
        },
        _addPath: function(i) {
          var l = i._container;
          this._container.appendChild(l), i.options.interactive && i.addInteractiveTarget(l);
        },
        _removePath: function(i) {
          var l = i._container;
          Mt(l), i.removeInteractiveTarget(l), delete this._layers[c(i)];
        },
        _updateStyle: function(i) {
          var l = i._stroke, u = i._fill, f = i.options, m = i._container;
          m.stroked = !!f.stroke, m.filled = !!f.fill, f.stroke ? (l || (l = i._stroke = Ki("stroke")), m.appendChild(l), l.weight = f.weight + "px", l.color = f.color, l.opacity = f.opacity, f.dashArray ? l.dashStyle = A(f.dashArray) ? f.dashArray.join(" ") : f.dashArray.replace(/( *, *)/g, " ") : l.dashStyle = "", l.endcap = f.lineCap.replace("butt", "flat"), l.joinstyle = f.lineJoin) : l && (m.removeChild(l), i._stroke = null), f.fill ? (u || (u = i._fill = Ki("fill")), m.appendChild(u), u.color = f.fillColor || f.color, u.opacity = f.fillOpacity) : u && (m.removeChild(u), i._fill = null);
        },
        _updateCircle: function(i) {
          var l = i._point.round(), u = Math.round(i._radius), f = Math.round(i._radiusY || u);
          this._setPath(i, i._empty() ? "M0 0" : "AL " + l.x + "," + l.y + " " + u + "," + f + " 0," + 65535 * 360);
        },
        _setPath: function(i, l) {
          i._path.v = l;
        },
        _bringToFront: function(i) {
          yi(i._container);
        },
        _bringToBack: function(i) {
          bi(i._container);
        }
      }, Jn = W.vml ? Ki : fi, Ji = we.extend({
        _initContainer: function() {
          this._container = Jn("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = Jn("g"), this._container.appendChild(this._rootGroup);
        },
        _destroyContainer: function() {
          Mt(this._container), gt(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
        },
        _update: function() {
          if (!(this._map._animatingZoom && this._bounds)) {
            we.prototype._update.call(this);
            var i = this._bounds, l = i.getSize(), u = this._container;
            (!this._svgSize || !this._svgSize.equals(l)) && (this._svgSize = l, u.setAttribute("width", l.x), u.setAttribute("height", l.y)), Ot(u, i.min), u.setAttribute("viewBox", [i.min.x, i.min.y, l.x, l.y].join(" ")), this.fire("update");
          }
        },
        // methods below are called by vector layers implementations
        _initPath: function(i) {
          var l = i._path = Jn("path");
          i.options.className && $(l, i.options.className), i.options.interactive && $(l, "leaflet-interactive"), this._updateStyle(i), this._layers[c(i)] = i;
        },
        _addPath: function(i) {
          this._rootGroup || this._initContainer(), this._rootGroup.appendChild(i._path), i.addInteractiveTarget(i._path);
        },
        _removePath: function(i) {
          Mt(i._path), i.removeInteractiveTarget(i._path), delete this._layers[c(i)];
        },
        _updatePath: function(i) {
          i._project(), i._update();
        },
        _updateStyle: function(i) {
          var l = i._path, u = i.options;
          l && (u.stroke ? (l.setAttribute("stroke", u.color), l.setAttribute("stroke-opacity", u.opacity), l.setAttribute("stroke-width", u.weight), l.setAttribute("stroke-linecap", u.lineCap), l.setAttribute("stroke-linejoin", u.lineJoin), u.dashArray ? l.setAttribute("stroke-dasharray", u.dashArray) : l.removeAttribute("stroke-dasharray"), u.dashOffset ? l.setAttribute("stroke-dashoffset", u.dashOffset) : l.removeAttribute("stroke-dashoffset")) : l.setAttribute("stroke", "none"), u.fill ? (l.setAttribute("fill", u.fillColor || u.color), l.setAttribute("fill-opacity", u.fillOpacity), l.setAttribute("fill-rule", u.fillRule || "evenodd")) : l.setAttribute("fill", "none"));
        },
        _updatePoly: function(i, l) {
          this._setPath(i, Ue(i._parts, l));
        },
        _updateCircle: function(i) {
          var l = i._point, u = Math.max(Math.round(i._radius), 1), f = Math.max(Math.round(i._radiusY), 1) || u, m = "a" + u + "," + f + " 0 1,0 ", y = i._empty() ? "M0 0" : "M" + (l.x - u) + "," + l.y + m + u * 2 + ",0 " + m + -u * 2 + ",0 ";
          this._setPath(i, y);
        },
        _setPath: function(i, l) {
          i._path.setAttribute("d", l);
        },
        // SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
        _bringToFront: function(i) {
          yi(i._path);
        },
        _bringToBack: function(i) {
          bi(i._path);
        }
      });
      W.vml && Ji.include(vc);
      function Wr(i) {
        return W.svg || W.vml ? new Ji(i) : null;
      }
      ot.include({
        // @namespace Map; @method getRenderer(layer: Path): Renderer
        // Returns the instance of `Renderer` that should be used to render the given
        // `Path`. It will ensure that the `renderer` options of the map and paths
        // are respected, and that the renderers do exist on the map.
        getRenderer: function(i) {
          var l = i.options.renderer || this._getPaneRenderer(i.options.pane) || this.options.renderer || this._renderer;
          return l || (l = this._renderer = this._createRenderer()), this.hasLayer(l) || this.addLayer(l), l;
        },
        _getPaneRenderer: function(i) {
          if (i === "overlayPane" || i === void 0)
            return !1;
          var l = this._paneRenderers[i];
          return l === void 0 && (l = this._createRenderer({ pane: i }), this._paneRenderers[i] = l), l;
        },
        _createRenderer: function(i) {
          return this.options.preferCanvas && Hr(i) || Wr(i);
        }
      });
      var Vr = Li.extend({
        initialize: function(i, l) {
          Li.prototype.initialize.call(this, this._boundsToLatLngs(i), l);
        },
        // @method setBounds(latLngBounds: LatLngBounds): this
        // Redraws the rectangle with the passed bounds.
        setBounds: function(i) {
          return this.setLatLngs(this._boundsToLatLngs(i));
        },
        _boundsToLatLngs: function(i) {
          return i = at(i), [
            i.getSouthWest(),
            i.getNorthWest(),
            i.getNorthEast(),
            i.getSouthEast()
          ];
        }
      });
      function yc(i, l) {
        return new Vr(i, l);
      }
      Ji.create = Jn, Ji.pointsToPath = Ue, xe.geometryToLayer = jn, xe.coordsToLatLng = oo, xe.coordsToLatLngs = Un, xe.latLngToCoords = ro, xe.latLngsToCoords = Gn, xe.getFeature = Mi, xe.asFeature = Yn, ot.mergeOptions({
        // @option boxZoom: Boolean = true
        // Whether the map can be zoomed to a rectangular area specified by
        // dragging the mouse while pressing the shift key.
        boxZoom: !0
      });
      var jr = fe.extend({
        initialize: function(i) {
          this._map = i, this._container = i._container, this._pane = i._panes.overlayPane, this._resetStateTimeout = 0, i.on("unload", this._destroy, this);
        },
        addHooks: function() {
          q(this._container, "mousedown", this._onMouseDown, this);
        },
        removeHooks: function() {
          gt(this._container, "mousedown", this._onMouseDown, this);
        },
        moved: function() {
          return this._moved;
        },
        _destroy: function() {
          Mt(this._pane), delete this._pane;
        },
        _resetState: function() {
          this._resetStateTimeout = 0, this._moved = !1;
        },
        _clearDeferredResetState: function() {
          this._resetStateTimeout !== 0 && (clearTimeout(this._resetStateTimeout), this._resetStateTimeout = 0);
        },
        _onMouseDown: function(i) {
          if (!i.shiftKey || i.which !== 1 && i.button !== 1)
            return !1;
          this._clearDeferredResetState(), this._resetState(), Wi(), Ws(), this._startPoint = this._map.mouseEventToContainerPoint(i), q(document, {
            contextmenu: Qe,
            mousemove: this._onMouseMove,
            mouseup: this._onMouseUp,
            keydown: this._onKeyDown
          }, this);
        },
        _onMouseMove: function(i) {
          this._moved || (this._moved = !0, this._box = lt("div", "leaflet-zoom-box", this._container), $(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(i);
          var l = new G(this._point, this._startPoint), u = l.getSize();
          Ot(this._box, l.min), this._box.style.width = u.x + "px", this._box.style.height = u.y + "px";
        },
        _finish: function() {
          this._moved && (Mt(this._box), Tt(this._container, "leaflet-crosshair")), Vi(), Vs(), gt(document, {
            contextmenu: Qe,
            mousemove: this._onMouseMove,
            mouseup: this._onMouseUp,
            keydown: this._onKeyDown
          }, this);
        },
        _onMouseUp: function(i) {
          if (!(i.which !== 1 && i.button !== 1) && (this._finish(), !!this._moved)) {
            this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(a(this._resetState, this), 0);
            var l = new xt(
              this._map.containerPointToLatLng(this._startPoint),
              this._map.containerPointToLatLng(this._point)
            );
            this._map.fitBounds(l).fire("boxzoomend", { boxZoomBounds: l });
          }
        },
        _onKeyDown: function(i) {
          i.keyCode === 27 && (this._finish(), this._clearDeferredResetState(), this._resetState());
        }
      });
      ot.addInitHook("addHandler", "boxZoom", jr), ot.mergeOptions({
        // @option doubleClickZoom: Boolean|String = true
        // Whether the map can be zoomed in by double clicking on it and
        // zoomed out by double clicking while holding shift. If passed
        // `'center'`, double-click zoom will zoom to the center of the
        //  view regardless of where the mouse was.
        doubleClickZoom: !0
      });
      var Ur = fe.extend({
        addHooks: function() {
          this._map.on("dblclick", this._onDoubleClick, this);
        },
        removeHooks: function() {
          this._map.off("dblclick", this._onDoubleClick, this);
        },
        _onDoubleClick: function(i) {
          var l = this._map, u = l.getZoom(), f = l.options.zoomDelta, m = i.originalEvent.shiftKey ? u - f : u + f;
          l.options.doubleClickZoom === "center" ? l.setZoom(m) : l.setZoomAround(i.containerPoint, m);
        }
      });
      ot.addInitHook("addHandler", "doubleClickZoom", Ur), ot.mergeOptions({
        // @option dragging: Boolean = true
        // Whether the map is draggable with mouse/touch or not.
        dragging: !0,
        // @section Panning Inertia Options
        // @option inertia: Boolean = *
        // If enabled, panning of the map will have an inertia effect where
        // the map builds momentum while dragging and continues moving in
        // the same direction for some time. Feels especially nice on touch
        // devices. Enabled by default.
        inertia: !0,
        // @option inertiaDeceleration: Number = 3000
        // The rate with which the inertial movement slows down, in pixels/second².
        inertiaDeceleration: 3400,
        // px/s^2
        // @option inertiaMaxSpeed: Number = Infinity
        // Max speed of the inertial movement, in pixels/second.
        inertiaMaxSpeed: 1 / 0,
        // px/s
        // @option easeLinearity: Number = 0.2
        easeLinearity: 0.2,
        // TODO refactor, move to CRS
        // @option worldCopyJump: Boolean = false
        // With this option enabled, the map tracks when you pan to another "copy"
        // of the world and seamlessly jumps to the original one so that all overlays
        // like markers and vector layers are still visible.
        worldCopyJump: !1,
        // @option maxBoundsViscosity: Number = 0.0
        // If `maxBounds` is set, this option will control how solid the bounds
        // are when dragging the map around. The default value of `0.0` allows the
        // user to drag outside the bounds at normal speed, higher values will
        // slow down map dragging outside bounds, and `1.0` makes the bounds fully
        // solid, preventing the user from dragging outside the bounds.
        maxBoundsViscosity: 0
      });
      var Gr = fe.extend({
        addHooks: function() {
          if (!this._draggable) {
            var i = this._map;
            this._draggable = new Ie(i._mapPane, i._container), this._draggable.on({
              dragstart: this._onDragStart,
              drag: this._onDrag,
              dragend: this._onDragEnd
            }, this), this._draggable.on("predrag", this._onPreDragLimit, this), i.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), i.on("zoomend", this._onZoomEnd, this), i.whenReady(this._onZoomEnd, this));
          }
          $(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
        },
        removeHooks: function() {
          Tt(this._map._container, "leaflet-grab"), Tt(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
        },
        moved: function() {
          return this._draggable && this._draggable._moved;
        },
        moving: function() {
          return this._draggable && this._draggable._moving;
        },
        _onDragStart: function() {
          var i = this._map;
          if (i._stop(), this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
            var l = at(this._map.options.maxBounds);
            this._offsetLimit = ct(
              this._map.latLngToContainerPoint(l.getNorthWest()).multiplyBy(-1),
              this._map.latLngToContainerPoint(l.getSouthEast()).multiplyBy(-1).add(this._map.getSize())
            ), this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
          } else
            this._offsetLimit = null;
          i.fire("movestart").fire("dragstart"), i.options.inertia && (this._positions = [], this._times = []);
        },
        _onDrag: function(i) {
          if (this._map.options.inertia) {
            var l = this._lastTime = +/* @__PURE__ */ new Date(), u = this._lastPos = this._draggable._absPos || this._draggable._newPos;
            this._positions.push(u), this._times.push(l), this._prunePositions(l);
          }
          this._map.fire("move", i).fire("drag", i);
        },
        _prunePositions: function(i) {
          for (; this._positions.length > 1 && i - this._times[0] > 50; )
            this._positions.shift(), this._times.shift();
        },
        _onZoomEnd: function() {
          var i = this._map.getSize().divideBy(2), l = this._map.latLngToLayerPoint([0, 0]);
          this._initialWorldOffset = l.subtract(i).x, this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
        },
        _viscousLimit: function(i, l) {
          return i - (i - l) * this._viscosity;
        },
        _onPreDragLimit: function() {
          if (!(!this._viscosity || !this._offsetLimit)) {
            var i = this._draggable._newPos.subtract(this._draggable._startPos), l = this._offsetLimit;
            i.x < l.min.x && (i.x = this._viscousLimit(i.x, l.min.x)), i.y < l.min.y && (i.y = this._viscousLimit(i.y, l.min.y)), i.x > l.max.x && (i.x = this._viscousLimit(i.x, l.max.x)), i.y > l.max.y && (i.y = this._viscousLimit(i.y, l.max.y)), this._draggable._newPos = this._draggable._startPos.add(i);
          }
        },
        _onPreDragWrap: function() {
          var i = this._worldWidth, l = Math.round(i / 2), u = this._initialWorldOffset, f = this._draggable._newPos.x, m = (f - l + u) % i + l - u, y = (f + l + u) % i - l - u, w = Math.abs(m + u) < Math.abs(y + u) ? m : y;
          this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = w;
        },
        _onDragEnd: function(i) {
          var l = this._map, u = l.options, f = !u.inertia || i.noInertia || this._times.length < 2;
          if (l.fire("dragend", i), f)
            l.fire("moveend");
          else {
            this._prunePositions(+/* @__PURE__ */ new Date());
            var m = this._lastPos.subtract(this._positions[0]), y = (this._lastTime - this._times[0]) / 1e3, w = u.easeLinearity, k = m.multiplyBy(w / y), C = k.distanceTo([0, 0]), E = Math.min(u.inertiaMaxSpeed, C), R = k.multiplyBy(E / C), j = E / (u.inertiaDeceleration * w), tt = R.multiplyBy(-j / 2).round();
            !tt.x && !tt.y ? l.fire("moveend") : (tt = l._limitOffset(tt, l.options.maxBounds), Z(function() {
              l.panBy(tt, {
                duration: j,
                easeLinearity: w,
                noMoveStart: !0,
                animate: !0
              });
            }));
          }
        }
      });
      ot.addInitHook("addHandler", "dragging", Gr), ot.mergeOptions({
        // @option keyboard: Boolean = true
        // Makes the map focusable and allows users to navigate the map with keyboard
        // arrows and `+`/`-` keys.
        keyboard: !0,
        // @option keyboardPanDelta: Number = 80
        // Amount of pixels to pan when pressing an arrow key.
        keyboardPanDelta: 80
      });
      var Yr = fe.extend({
        keyCodes: {
          left: [37],
          right: [39],
          down: [40],
          up: [38],
          zoomIn: [187, 107, 61, 171],
          zoomOut: [189, 109, 54, 173]
        },
        initialize: function(i) {
          this._map = i, this._setPanDelta(i.options.keyboardPanDelta), this._setZoomDelta(i.options.zoomDelta);
        },
        addHooks: function() {
          var i = this._map._container;
          i.tabIndex <= 0 && (i.tabIndex = "0"), q(i, {
            focus: this._onFocus,
            blur: this._onBlur,
            mousedown: this._onMouseDown
          }, this), this._map.on({
            focus: this._addHooks,
            blur: this._removeHooks
          }, this);
        },
        removeHooks: function() {
          this._removeHooks(), gt(this._map._container, {
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
            var i = document.body, l = document.documentElement, u = i.scrollTop || l.scrollTop, f = i.scrollLeft || l.scrollLeft;
            this._map._container.focus(), window.scrollTo(f, u);
          }
        },
        _onFocus: function() {
          this._focused = !0, this._map.fire("focus");
        },
        _onBlur: function() {
          this._focused = !1, this._map.fire("blur");
        },
        _setPanDelta: function(i) {
          var l = this._panKeys = {}, u = this.keyCodes, f, m;
          for (f = 0, m = u.left.length; f < m; f++)
            l[u.left[f]] = [-1 * i, 0];
          for (f = 0, m = u.right.length; f < m; f++)
            l[u.right[f]] = [i, 0];
          for (f = 0, m = u.down.length; f < m; f++)
            l[u.down[f]] = [0, i];
          for (f = 0, m = u.up.length; f < m; f++)
            l[u.up[f]] = [0, -1 * i];
        },
        _setZoomDelta: function(i) {
          var l = this._zoomKeys = {}, u = this.keyCodes, f, m;
          for (f = 0, m = u.zoomIn.length; f < m; f++)
            l[u.zoomIn[f]] = i;
          for (f = 0, m = u.zoomOut.length; f < m; f++)
            l[u.zoomOut[f]] = -i;
        },
        _addHooks: function() {
          q(document, "keydown", this._onKeyDown, this);
        },
        _removeHooks: function() {
          gt(document, "keydown", this._onKeyDown, this);
        },
        _onKeyDown: function(i) {
          if (!(i.altKey || i.ctrlKey || i.metaKey)) {
            var l = i.keyCode, u = this._map, f;
            if (l in this._panKeys) {
              if (!u._panAnim || !u._panAnim._inProgress)
                if (f = this._panKeys[l], i.shiftKey && (f = F(f).multiplyBy(3)), u.options.maxBounds && (f = u._limitOffset(F(f), u.options.maxBounds)), u.options.worldCopyJump) {
                  var m = u.wrapLatLng(u.unproject(u.project(u.getCenter()).add(f)));
                  u.panTo(m);
                } else
                  u.panBy(f);
            } else if (l in this._zoomKeys)
              u.setZoom(u.getZoom() + (i.shiftKey ? 3 : 1) * this._zoomKeys[l]);
            else if (l === 27 && u._popup && u._popup.options.closeOnEscapeKey)
              u.closePopup();
            else
              return;
            Qe(i);
          }
        }
      });
      ot.addInitHook("addHandler", "keyboard", Yr), ot.mergeOptions({
        // @section Mouse wheel options
        // @option scrollWheelZoom: Boolean|String = true
        // Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
        // it will zoom to the center of the view regardless of where the mouse was.
        scrollWheelZoom: !0,
        // @option wheelDebounceTime: Number = 40
        // Limits the rate at which a wheel can fire (in milliseconds). By default
        // user can't zoom via wheel more often than once per 40 ms.
        wheelDebounceTime: 40,
        // @option wheelPxPerZoomLevel: Number = 60
        // How many scroll pixels (as reported by [L.DomEvent.getWheelDelta](#domevent-getwheeldelta))
        // mean a change of one full zoom level. Smaller values will make wheel-zooming
        // faster (and vice versa).
        wheelPxPerZoomLevel: 60
      });
      var qr = fe.extend({
        addHooks: function() {
          q(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
        },
        removeHooks: function() {
          gt(this._map._container, "wheel", this._onWheelScroll, this);
        },
        _onWheelScroll: function(i) {
          var l = vr(i), u = this._map.options.wheelDebounceTime;
          this._delta += l, this._lastMousePos = this._map.mouseEventToContainerPoint(i), this._startTime || (this._startTime = +/* @__PURE__ */ new Date());
          var f = Math.max(u - (+/* @__PURE__ */ new Date() - this._startTime), 0);
          clearTimeout(this._timer), this._timer = setTimeout(a(this._performZoom, this), f), Qe(i);
        },
        _performZoom: function() {
          var i = this._map, l = i.getZoom(), u = this._map.options.zoomSnap || 0;
          i._stop();
          var f = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), m = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(f)))) / Math.LN2, y = u ? Math.ceil(m / u) * u : m, w = i._limitZoom(l + (this._delta > 0 ? y : -y)) - l;
          this._delta = 0, this._startTime = null, w && (i.options.scrollWheelZoom === "center" ? i.setZoom(l + w) : i.setZoomAround(this._lastMousePos, l + w));
        }
      });
      ot.addInitHook("addHandler", "scrollWheelZoom", qr);
      var bc = 600;
      ot.mergeOptions({
        // @section Touch interaction options
        // @option tapHold: Boolean
        // Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
        tapHold: W.touchNative && W.safari && W.mobile,
        // @option tapTolerance: Number = 15
        // The max number of pixels a user can shift his finger during touch
        // for it to be considered a valid tap.
        tapTolerance: 15
      });
      var Xr = fe.extend({
        addHooks: function() {
          q(this._map._container, "touchstart", this._onDown, this);
        },
        removeHooks: function() {
          gt(this._map._container, "touchstart", this._onDown, this);
        },
        _onDown: function(i) {
          if (clearTimeout(this._holdTimeout), i.touches.length === 1) {
            var l = i.touches[0];
            this._startPos = this._newPos = new H(l.clientX, l.clientY), this._holdTimeout = setTimeout(a(function() {
              this._cancel(), this._isTapValid() && (q(document, "touchend", Nt), q(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", l));
            }, this), bc), q(document, "touchend touchcancel contextmenu", this._cancel, this), q(document, "touchmove", this._onMove, this);
          }
        },
        _cancelClickPrevent: function i() {
          gt(document, "touchend", Nt), gt(document, "touchend touchcancel", i);
        },
        _cancel: function() {
          clearTimeout(this._holdTimeout), gt(document, "touchend touchcancel contextmenu", this._cancel, this), gt(document, "touchmove", this._onMove, this);
        },
        _onMove: function(i) {
          var l = i.touches[0];
          this._newPos = new H(l.clientX, l.clientY);
        },
        _isTapValid: function() {
          return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
        },
        _simulateEvent: function(i, l) {
          var u = new MouseEvent(i, {
            bubbles: !0,
            cancelable: !0,
            view: window,
            // detail: 1,
            screenX: l.screenX,
            screenY: l.screenY,
            clientX: l.clientX,
            clientY: l.clientY
            // button: 2,
            // buttons: 2
          });
          u._simulated = !0, l.target.dispatchEvent(u);
        }
      });
      ot.addInitHook("addHandler", "tapHold", Xr), ot.mergeOptions({
        // @section Touch interaction options
        // @option touchZoom: Boolean|String = *
        // Whether the map can be zoomed by touch-dragging with two fingers. If
        // passed `'center'`, it will zoom to the center of the view regardless of
        // where the touch events (fingers) were. Enabled for touch-capable web
        // browsers.
        touchZoom: W.touch,
        // @option bounceAtZoomLimits: Boolean = true
        // Set it to false if you don't want the map to zoom beyond min/max zoom
        // and then bounce back when pinch-zooming.
        bounceAtZoomLimits: !0
      });
      var Kr = fe.extend({
        addHooks: function() {
          $(this._map._container, "leaflet-touch-zoom"), q(this._map._container, "touchstart", this._onTouchStart, this);
        },
        removeHooks: function() {
          Tt(this._map._container, "leaflet-touch-zoom"), gt(this._map._container, "touchstart", this._onTouchStart, this);
        },
        _onTouchStart: function(i) {
          var l = this._map;
          if (!(!i.touches || i.touches.length !== 2 || l._animatingZoom || this._zooming)) {
            var u = l.mouseEventToContainerPoint(i.touches[0]), f = l.mouseEventToContainerPoint(i.touches[1]);
            this._centerPoint = l.getSize()._divideBy(2), this._startLatLng = l.containerPointToLatLng(this._centerPoint), l.options.touchZoom !== "center" && (this._pinchStartLatLng = l.containerPointToLatLng(u.add(f)._divideBy(2))), this._startDist = u.distanceTo(f), this._startZoom = l.getZoom(), this._moved = !1, this._zooming = !0, l._stop(), q(document, "touchmove", this._onTouchMove, this), q(document, "touchend touchcancel", this._onTouchEnd, this), Nt(i);
          }
        },
        _onTouchMove: function(i) {
          if (!(!i.touches || i.touches.length !== 2 || !this._zooming)) {
            var l = this._map, u = l.mouseEventToContainerPoint(i.touches[0]), f = l.mouseEventToContainerPoint(i.touches[1]), m = u.distanceTo(f) / this._startDist;
            if (this._zoom = l.getScaleZoom(m, this._startZoom), !l.options.bounceAtZoomLimits && (this._zoom < l.getMinZoom() && m < 1 || this._zoom > l.getMaxZoom() && m > 1) && (this._zoom = l._limitZoom(this._zoom)), l.options.touchZoom === "center") {
              if (this._center = this._startLatLng, m === 1)
                return;
            } else {
              var y = u._add(f)._divideBy(2)._subtract(this._centerPoint);
              if (m === 1 && y.x === 0 && y.y === 0)
                return;
              this._center = l.unproject(l.project(this._pinchStartLatLng, this._zoom).subtract(y), this._zoom);
            }
            this._moved || (l._moveStart(!0, !1), this._moved = !0), V(this._animRequest);
            var w = a(l._move, l, this._center, this._zoom, { pinch: !0, round: !1 }, void 0);
            this._animRequest = Z(w, this, !0), Nt(i);
          }
        },
        _onTouchEnd: function() {
          if (!this._moved || !this._zooming) {
            this._zooming = !1;
            return;
          }
          this._zooming = !1, V(this._animRequest), gt(document, "touchmove", this._onTouchMove, this), gt(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom));
        }
      });
      ot.addInitHook("addHandler", "touchZoom", Kr), ot.BoxZoom = jr, ot.DoubleClickZoom = Ur, ot.Drag = Gr, ot.Keyboard = Yr, ot.ScrollWheelZoom = qr, ot.TapHold = Xr, ot.TouchZoom = Kr, e.Bounds = G, e.Browser = W, e.CRS = qt, e.Canvas = Zr, e.Circle = so, e.CircleMarker = Vn, e.Class = et, e.Control = oe, e.DivIcon = Rr, e.DivOverlay = pe, e.DomEvent = Fh, e.DomUtil = Bh, e.Draggable = Ie, e.Evented = dt, e.FeatureGroup = ye, e.GeoJSON = xe, e.GridLayer = Xi, e.Handler = fe, e.Icon = wi, e.ImageOverlay = qn, e.LatLng = Q, e.LatLngBounds = xt, e.Layer = re, e.LayerGroup = xi, e.LineUtil = Jh, e.Map = ot, e.Marker = Wn, e.Mixin = Uh, e.Path = De, e.Point = H, e.PolyUtil = Gh, e.Polygon = Li, e.Polyline = be, e.Popup = Xn, e.PosAnimation = yr, e.Projection = $h, e.Rectangle = Vr, e.Renderer = we, e.SVG = Ji, e.SVGOverlay = Br, e.TileLayer = Pi, e.Tooltip = Kn, e.Transformation = he, e.Util = Ct, e.VideoOverlay = zr, e.bind = a, e.bounds = ct, e.canvas = Hr, e.circle = rc, e.circleMarker = oc, e.control = Gi, e.divIcon = gc, e.extend = r, e.featureGroup = ic, e.geoJSON = Dr, e.geoJson = hc, e.gridLayer = mc, e.icon = nc, e.imageOverlay = cc, e.latLng = U, e.latLngBounds = at, e.layerGroup = ec, e.map = Nh, e.marker = sc, e.point = F, e.polygon = lc, e.polyline = ac, e.popup = fc, e.rectangle = yc, e.setOptions = x, e.stamp = c, e.svg = Wr, e.svgOverlay = dc, e.tileLayer = Fr, e.tooltip = pc, e.transformation = ce, e.version = s, e.videoOverlay = uc;
      var xc = window.L;
      e.noConflict = function() {
        return window.L = xc, this;
      }, window.L = e;
    });
  }(fs, fs.exports)), fs.exports;
}
var Zg = Lh();
const ut = /* @__PURE__ */ Ng(Zg);
var Hg = { exports: {} };
(function(n) {
  (function(t, e) {
    n.exports ? n.exports = e(Lh()) : e(t.L);
  })(typeof self < "u" ? self : sr, (t) => {
    if (typeof document > "u")
      return console.warn('"window.document" is undefined; leaflet.fullscreen requires this object to access the DOM'), !1;
    const e = (() => {
      const o = [
        // Standard
        [
          "requestFullscreen",
          "exitFullscreen",
          "fullscreenElement",
          "fullscreenEnabled",
          "fullscreenchange",
          "fullscreenerror"
        ],
        // New WebKit
        [
          "webkitRequestFullscreen",
          "webkitExitFullscreen",
          "webkitFullscreenElement",
          "webkitFullscreenEnabled",
          "webkitfullscreenchange",
          "webkitfullscreenerror"
        ]
      ], a = o[0], h = {};
      for (const c of o)
        if (c[1] in document) {
          for (let d = 0; d < c.length; d++)
            h[a[d]] = c[d];
          return h;
        }
      return !1;
    })(), s = {
      change: e.fullscreenchange,
      error: e.fullscreenerror
    }, r = {
      request(o, a) {
        return new Promise((h, c) => {
          const d = (function() {
            this.off("change", d), h();
          }).bind(this);
          this.on("change", d), o = o || document.documentElement;
          const p = o[e.requestFullscreen](a);
          p instanceof Promise && p.then(d).catch(c);
        });
      },
      exit() {
        return new Promise((o, a) => {
          if (!this.isFullscreen) {
            o();
            return;
          }
          const h = (function() {
            this.off("change", h), o();
          }).bind(this);
          this.on("change", h);
          const c = document[e.exitFullscreen]();
          c instanceof Promise && c.then(h).catch(a);
        });
      },
      on(o, a) {
        const h = s[o];
        h && document.addEventListener(h, a, !1);
      },
      off(o, a) {
        const h = s[o];
        h && document.removeEventListener(h, a, !1);
      },
      nativeAPI: e
    };
    return Object.defineProperties(r, {
      isFullscreen: {
        get() {
          return !!document[e.fullscreenElement];
        }
      },
      isEnabled: {
        enumerable: !0,
        get() {
          return !!document[e.fullscreenEnabled];
        }
      }
    }), t.Control.FullScreen = t.Control.extend({
      options: {
        position: "topleft",
        title: "Full Screen",
        titleCancel: "Exit Full Screen",
        forceSeparateButton: !1,
        forcePseudoFullscreen: !1,
        fullscreenElement: !1
      },
      _screenfull: r,
      onAdd(o) {
        let a = "leaflet-control-zoom-fullscreen", h, c = "";
        return o.zoomControl && !this.options.forceSeparateButton ? h = o.zoomControl._container : h = t.DomUtil.create("div", "leaflet-bar"), this.options.content ? c = this.options.content : a += " fullscreen-icon", this._createButton(this.options.title, a, c, h, this.toggleFullScreen, this), this._map.fullscreenControl = this, this._map.on("enterFullscreen exitFullscreen", this._toggleState, this), h;
      },
      onRemove() {
        t.DomEvent.off(this.link, "click", t.DomEvent.stop).off(this.link, "click", this.toggleFullScreen, this), this._screenfull.isEnabled && (t.DomEvent.off(this._container, this._screenfull.nativeAPI.fullscreenchange, t.DomEvent.stop).off(this._container, this._screenfull.nativeAPI.fullscreenchange, this._handleFullscreenChange, this), t.DomEvent.off(document, this._screenfull.nativeAPI.fullscreenchange, t.DomEvent.stop).off(document, this._screenfull.nativeAPI.fullscreenchange, this._handleFullscreenChange, this));
      },
      _createButton(o, a, h, c, d, p) {
        return this.link = t.DomUtil.create("a", a, c), this.link.href = "#", this.link.title = o, this.link.innerHTML = h, this.link.setAttribute("role", "button"), this.link.setAttribute("aria-label", o), L.DomEvent.disableClickPropagation(c), t.DomEvent.on(this.link, "click", t.DomEvent.stop).on(this.link, "click", d, p), this._screenfull.isEnabled && (t.DomEvent.on(c, this._screenfull.nativeAPI.fullscreenchange, t.DomEvent.stop).on(c, this._screenfull.nativeAPI.fullscreenchange, this._handleFullscreenChange, p), t.DomEvent.on(document, this._screenfull.nativeAPI.fullscreenchange, t.DomEvent.stop).on(document, this._screenfull.nativeAPI.fullscreenchange, this._handleFullscreenChange, p)), this.link;
      },
      toggleFullScreen() {
        const o = this._map;
        o._exitFired = !1, o._isFullscreen ? (this._screenfull.isEnabled && !this.options.forcePseudoFullscreen ? this._screenfull.exit().then(() => o.invalidateSize()) : (t.DomUtil.removeClass(this.options.fullscreenElement ? this.options.fullscreenElement : o._container, "leaflet-pseudo-fullscreen"), o.invalidateSize()), o.fire("exitFullscreen"), o._exitFired = !0, o._isFullscreen = !1) : (this._screenfull.isEnabled && !this.options.forcePseudoFullscreen ? this._screenfull.request(this.options.fullscreenElement ? this.options.fullscreenElement : o._container).then(() => o.invalidateSize()) : (t.DomUtil.addClass(this.options.fullscreenElement ? this.options.fullscreenElement : o._container, "leaflet-pseudo-fullscreen"), o.invalidateSize()), o.fire("enterFullscreen"), o._isFullscreen = !0);
      },
      _toggleState() {
        this.link.title = this._map._isFullscreen ? this.options.title : this.options.titleCancel, this._map._isFullscreen ? L.DomUtil.removeClass(this.link, "leaflet-fullscreen-on") : L.DomUtil.addClass(this.link, "leaflet-fullscreen-on");
      },
      _handleFullscreenChange(o) {
        const a = this._map;
        o.target === a.getContainer() && !this._screenfull.isFullscreen && !a._exitFired && (this._screenfull.exit().then(() => a.invalidateSize()), a.fire("exitFullscreen"), a._exitFired = !0, a._isFullscreen = !1);
      }
    }), t.Map.include({
      toggleFullscreen() {
        this.fullscreenControl.toggleFullScreen();
      }
    }), t.Map.addInitHook(function() {
      this.options.fullscreenControl && this.addControl(t.control.fullscreen(this.options.fullscreenControlOptions));
    }), t.control.fullscreen = function(o) {
      return new t.Control.FullScreen(o);
    }, { leaflet: t };
  });
})(Hg);
var Ll = { exports: {} };
(function(n, t) {
  (function(e, s) {
    s(t);
  })(sr, function(e) {
    var s = L.MarkerClusterGroup = L.FeatureGroup.extend({
      options: {
        maxClusterRadius: 80,
        //A cluster will cover at most this many pixels from its center
        iconCreateFunction: null,
        clusterPane: L.Marker.prototype.options.pane,
        spiderfyOnEveryZoom: !1,
        spiderfyOnMaxZoom: !0,
        showCoverageOnHover: !0,
        zoomToBoundsOnClick: !0,
        singleMarkerMode: !1,
        disableClusteringAtZoom: null,
        // Setting this to false prevents the removal of any clusters outside of the viewpoint, which
        // is the default behaviour for performance reasons.
        removeOutsideVisibleBounds: !0,
        // Set to false to disable all animations (zoom and spiderfy).
        // If false, option animateAddingMarkers below has no effect.
        // If L.DomUtil.TRANSITION is falsy, this option has no effect.
        animate: !0,
        //Whether to animate adding markers after adding the MarkerClusterGroup to the map
        // If you are adding individual markers set to true, if adding bulk markers leave false for massive performance gains.
        animateAddingMarkers: !1,
        // Make it possible to provide custom function to calculate spiderfy shape positions
        spiderfyShapePositions: null,
        //Increase to increase the distance away that spiderfied markers appear from the center
        spiderfyDistanceMultiplier: 1,
        // Make it possible to specify a polyline options on a spider leg
        spiderLegPolylineOptions: { weight: 1.5, color: "#222", opacity: 0.5 },
        // When bulk adding layers, adds markers in chunks. Means addLayers may not add all the layers in the call, others will be loaded during setTimeouts
        chunkedLoading: !1,
        chunkInterval: 200,
        // process markers for a maximum of ~ n milliseconds (then trigger the chunkProgress callback)
        chunkDelay: 50,
        // at the end of each interval, give n milliseconds back to system/browser
        chunkProgress: null,
        // progress callback: function(processed, total, elapsed) (e.g. for a progress indicator)
        //Options to pass to the L.Polygon constructor
        polygonOptions: {}
      },
      initialize: function(o) {
        L.Util.setOptions(this, o), this.options.iconCreateFunction || (this.options.iconCreateFunction = this._defaultIconCreateFunction), this._featureGroup = L.featureGroup(), this._featureGroup.addEventParent(this), this._nonPointGroup = L.featureGroup(), this._nonPointGroup.addEventParent(this), this._inZoomAnimation = 0, this._needsClustering = [], this._needsRemoving = [], this._currentShownBounds = null, this._queue = [], this._childMarkerEventHandlers = {
          dragstart: this._childMarkerDragStart,
          move: this._childMarkerMoved,
          dragend: this._childMarkerDragEnd
        };
        var a = L.DomUtil.TRANSITION && this.options.animate;
        L.extend(this, a ? this._withAnimation : this._noAnimation), this._markerCluster = a ? L.MarkerCluster : L.MarkerClusterNonAnimated;
      },
      addLayer: function(o) {
        if (o instanceof L.LayerGroup)
          return this.addLayers([o]);
        if (!o.getLatLng)
          return this._nonPointGroup.addLayer(o), this.fire("layeradd", { layer: o }), this;
        if (!this._map)
          return this._needsClustering.push(o), this.fire("layeradd", { layer: o }), this;
        if (this.hasLayer(o))
          return this;
        this._unspiderfy && this._unspiderfy(), this._addLayer(o, this._maxZoom), this.fire("layeradd", { layer: o }), this._topClusterLevel._recalculateBounds(), this._refreshClustersIcons();
        var a = o, h = this._zoom;
        if (o.__parent)
          for (; a.__parent._zoom >= h; )
            a = a.__parent;
        return this._currentShownBounds.contains(a.getLatLng()) && (this.options.animateAddingMarkers ? this._animationAddLayer(o, a) : this._animationAddLayerNonAnimated(o, a)), this;
      },
      removeLayer: function(o) {
        return o instanceof L.LayerGroup ? this.removeLayers([o]) : o.getLatLng ? this._map ? o.__parent ? (this._unspiderfy && (this._unspiderfy(), this._unspiderfyLayer(o)), this._removeLayer(o, !0), this.fire("layerremove", { layer: o }), this._topClusterLevel._recalculateBounds(), this._refreshClustersIcons(), o.off(this._childMarkerEventHandlers, this), this._featureGroup.hasLayer(o) && (this._featureGroup.removeLayer(o), o.clusterShow && o.clusterShow()), this) : this : (!this._arraySplice(this._needsClustering, o) && this.hasLayer(o) && this._needsRemoving.push({ layer: o, latlng: o._latlng }), this.fire("layerremove", { layer: o }), this) : (this._nonPointGroup.removeLayer(o), this.fire("layerremove", { layer: o }), this);
      },
      //Takes an array of markers and adds them in bulk
      addLayers: function(o, a) {
        if (!L.Util.isArray(o))
          return this.addLayer(o);
        var h = this._featureGroup, c = this._nonPointGroup, d = this.options.chunkedLoading, p = this.options.chunkInterval, g = this.options.chunkProgress, _ = o.length, v = 0, b = !0, x;
        if (this._map) {
          var M = (/* @__PURE__ */ new Date()).getTime(), P = L.bind(function() {
            var A = (/* @__PURE__ */ new Date()).getTime();
            for (this._map && this._unspiderfy && this._unspiderfy(); v < _; v++) {
              if (d && v % 200 === 0) {
                var O = (/* @__PURE__ */ new Date()).getTime() - A;
                if (O > p)
                  break;
              }
              if (x = o[v], x instanceof L.LayerGroup) {
                b && (o = o.slice(), b = !1), this._extractNonGroupLayers(x, o), _ = o.length;
                continue;
              }
              if (!x.getLatLng) {
                c.addLayer(x), a || this.fire("layeradd", { layer: x });
                continue;
              }
              if (!this.hasLayer(x) && (this._addLayer(x, this._maxZoom), a || this.fire("layeradd", { layer: x }), x.__parent && x.__parent.getChildCount() === 2)) {
                var T = x.__parent.getAllChildMarkers(), I = T[0] === x ? T[1] : T[0];
                h.removeLayer(I);
              }
            }
            g && g(v, _, (/* @__PURE__ */ new Date()).getTime() - M), v === _ ? (this._topClusterLevel._recalculateBounds(), this._refreshClustersIcons(), this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds)) : setTimeout(P, this.options.chunkDelay);
          }, this);
          P();
        } else
          for (var S = this._needsClustering; v < _; v++) {
            if (x = o[v], x instanceof L.LayerGroup) {
              b && (o = o.slice(), b = !1), this._extractNonGroupLayers(x, o), _ = o.length;
              continue;
            }
            if (!x.getLatLng) {
              c.addLayer(x);
              continue;
            }
            this.hasLayer(x) || S.push(x);
          }
        return this;
      },
      //Takes an array of markers and removes them in bulk
      removeLayers: function(o) {
        var a, h, c = o.length, d = this._featureGroup, p = this._nonPointGroup, g = !0;
        if (!this._map) {
          for (a = 0; a < c; a++) {
            if (h = o[a], h instanceof L.LayerGroup) {
              g && (o = o.slice(), g = !1), this._extractNonGroupLayers(h, o), c = o.length;
              continue;
            }
            this._arraySplice(this._needsClustering, h), p.removeLayer(h), this.hasLayer(h) && this._needsRemoving.push({ layer: h, latlng: h._latlng }), this.fire("layerremove", { layer: h });
          }
          return this;
        }
        if (this._unspiderfy) {
          this._unspiderfy();
          var _ = o.slice(), v = c;
          for (a = 0; a < v; a++) {
            if (h = _[a], h instanceof L.LayerGroup) {
              this._extractNonGroupLayers(h, _), v = _.length;
              continue;
            }
            this._unspiderfyLayer(h);
          }
        }
        for (a = 0; a < c; a++) {
          if (h = o[a], h instanceof L.LayerGroup) {
            g && (o = o.slice(), g = !1), this._extractNonGroupLayers(h, o), c = o.length;
            continue;
          }
          if (!h.__parent) {
            p.removeLayer(h), this.fire("layerremove", { layer: h });
            continue;
          }
          this._removeLayer(h, !0, !0), this.fire("layerremove", { layer: h }), d.hasLayer(h) && (d.removeLayer(h), h.clusterShow && h.clusterShow());
        }
        return this._topClusterLevel._recalculateBounds(), this._refreshClustersIcons(), this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds), this;
      },
      //Removes all layers from the MarkerClusterGroup
      clearLayers: function() {
        return this._map || (this._needsClustering = [], this._needsRemoving = [], delete this._gridClusters, delete this._gridUnclustered), this._noanimationUnspiderfy && this._noanimationUnspiderfy(), this._featureGroup.clearLayers(), this._nonPointGroup.clearLayers(), this.eachLayer(function(o) {
          o.off(this._childMarkerEventHandlers, this), delete o.__parent;
        }, this), this._map && this._generateInitialClusters(), this;
      },
      //Override FeatureGroup.getBounds as it doesn't work
      getBounds: function() {
        var o = new L.LatLngBounds();
        this._topClusterLevel && o.extend(this._topClusterLevel._bounds);
        for (var a = this._needsClustering.length - 1; a >= 0; a--)
          o.extend(this._needsClustering[a].getLatLng());
        return o.extend(this._nonPointGroup.getBounds()), o;
      },
      //Overrides LayerGroup.eachLayer
      eachLayer: function(o, a) {
        var h = this._needsClustering.slice(), c = this._needsRemoving, d, p, g;
        for (this._topClusterLevel && this._topClusterLevel.getAllChildMarkers(h), p = h.length - 1; p >= 0; p--) {
          for (d = !0, g = c.length - 1; g >= 0; g--)
            if (c[g].layer === h[p]) {
              d = !1;
              break;
            }
          d && o.call(a, h[p]);
        }
        this._nonPointGroup.eachLayer(o, a);
      },
      //Overrides LayerGroup.getLayers
      getLayers: function() {
        var o = [];
        return this.eachLayer(function(a) {
          o.push(a);
        }), o;
      },
      //Overrides LayerGroup.getLayer, WARNING: Really bad performance
      getLayer: function(o) {
        var a = null;
        return o = parseInt(o, 10), this.eachLayer(function(h) {
          L.stamp(h) === o && (a = h);
        }), a;
      },
      //Returns true if the given layer is in this MarkerClusterGroup
      hasLayer: function(o) {
        if (!o)
          return !1;
        var a, h = this._needsClustering;
        for (a = h.length - 1; a >= 0; a--)
          if (h[a] === o)
            return !0;
        for (h = this._needsRemoving, a = h.length - 1; a >= 0; a--)
          if (h[a].layer === o)
            return !1;
        return !!(o.__parent && o.__parent._group === this) || this._nonPointGroup.hasLayer(o);
      },
      //Zoom down to show the given layer (spiderfying if necessary) then calls the callback
      zoomToShowLayer: function(o, a) {
        var h = this._map;
        typeof a != "function" && (a = function() {
        });
        var c = function() {
          (h.hasLayer(o) || h.hasLayer(o.__parent)) && !this._inZoomAnimation && (this._map.off("moveend", c, this), this.off("animationend", c, this), h.hasLayer(o) ? a() : o.__parent._icon && (this.once("spiderfied", a, this), o.__parent.spiderfy()));
        };
        o._icon && this._map.getBounds().contains(o.getLatLng()) ? a() : o.__parent._zoom < Math.round(this._map._zoom) ? (this._map.on("moveend", c, this), this._map.panTo(o.getLatLng())) : (this._map.on("moveend", c, this), this.on("animationend", c, this), o.__parent.zoomToBounds());
      },
      //Overrides FeatureGroup.onAdd
      onAdd: function(o) {
        this._map = o;
        var a, h, c;
        if (!isFinite(this._map.getMaxZoom()))
          throw "Map has no maxZoom specified";
        for (this._featureGroup.addTo(o), this._nonPointGroup.addTo(o), this._gridClusters || this._generateInitialClusters(), this._maxLat = o.options.crs.projection.MAX_LATITUDE, a = 0, h = this._needsRemoving.length; a < h; a++)
          c = this._needsRemoving[a], c.newlatlng = c.layer._latlng, c.layer._latlng = c.latlng;
        for (a = 0, h = this._needsRemoving.length; a < h; a++)
          c = this._needsRemoving[a], this._removeLayer(c.layer, !0), c.layer._latlng = c.newlatlng;
        this._needsRemoving = [], this._zoom = Math.round(this._map._zoom), this._currentShownBounds = this._getExpandedVisibleBounds(), this._map.on("zoomend", this._zoomEnd, this), this._map.on("moveend", this._moveEnd, this), this._spiderfierOnAdd && this._spiderfierOnAdd(), this._bindEvents(), h = this._needsClustering, this._needsClustering = [], this.addLayers(h, !0);
      },
      //Overrides FeatureGroup.onRemove
      onRemove: function(o) {
        o.off("zoomend", this._zoomEnd, this), o.off("moveend", this._moveEnd, this), this._unbindEvents(), this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", ""), this._spiderfierOnRemove && this._spiderfierOnRemove(), delete this._maxLat, this._hideCoverage(), this._featureGroup.remove(), this._nonPointGroup.remove(), this._featureGroup.clearLayers(), this._map = null;
      },
      getVisibleParent: function(o) {
        for (var a = o; a && !a._icon; )
          a = a.__parent;
        return a || null;
      },
      //Remove the given object from the given array
      _arraySplice: function(o, a) {
        for (var h = o.length - 1; h >= 0; h--)
          if (o[h] === a)
            return o.splice(h, 1), !0;
      },
      /**
       * Removes a marker from all _gridUnclustered zoom levels, starting at the supplied zoom.
       * @param marker to be removed from _gridUnclustered.
       * @param z integer bottom start zoom level (included)
       * @private
       */
      _removeFromGridUnclustered: function(o, a) {
        for (var h = this._map, c = this._gridUnclustered, d = Math.floor(this._map.getMinZoom()); a >= d && c[a].removeObject(o, h.project(o.getLatLng(), a)); a--)
          ;
      },
      _childMarkerDragStart: function(o) {
        o.target.__dragStart = o.target._latlng;
      },
      _childMarkerMoved: function(o) {
        if (!this._ignoreMove && !o.target.__dragStart) {
          var a = o.target._popup && o.target._popup.isOpen();
          this._moveChild(o.target, o.oldLatLng, o.latlng), a && o.target.openPopup();
        }
      },
      _moveChild: function(o, a, h) {
        o._latlng = a, this.removeLayer(o), o._latlng = h, this.addLayer(o);
      },
      _childMarkerDragEnd: function(o) {
        var a = o.target.__dragStart;
        delete o.target.__dragStart, a && this._moveChild(o.target, a, o.target._latlng);
      },
      //Internal function for removing a marker from everything.
      //dontUpdateMap: set to true if you will handle updating the map manually (for bulk functions)
      _removeLayer: function(o, a, h) {
        var c = this._gridClusters, d = this._gridUnclustered, p = this._featureGroup, g = this._map, _ = Math.floor(this._map.getMinZoom());
        a && this._removeFromGridUnclustered(o, this._maxZoom);
        var v = o.__parent, b = v._markers, x;
        for (this._arraySplice(b, o); v && (v._childCount--, v._boundsNeedUpdate = !0, !(v._zoom < _)); )
          a && v._childCount <= 1 ? (x = v._markers[0] === o ? v._markers[1] : v._markers[0], c[v._zoom].removeObject(v, g.project(v._cLatLng, v._zoom)), d[v._zoom].addObject(x, g.project(x.getLatLng(), v._zoom)), this._arraySplice(v.__parent._childClusters, v), v.__parent._markers.push(x), x.__parent = v.__parent, v._icon && (p.removeLayer(v), h || p.addLayer(x))) : v._iconNeedsUpdate = !0, v = v.__parent;
        delete o.__parent;
      },
      _isOrIsParent: function(o, a) {
        for (; a; ) {
          if (o === a)
            return !0;
          a = a.parentNode;
        }
        return !1;
      },
      //Override L.Evented.fire
      fire: function(o, a, h) {
        if (a && a.layer instanceof L.MarkerCluster) {
          if (a.originalEvent && this._isOrIsParent(a.layer._icon, a.originalEvent.relatedTarget))
            return;
          o = "cluster" + o;
        }
        L.FeatureGroup.prototype.fire.call(this, o, a, h);
      },
      //Override L.Evented.listens
      listens: function(o, a) {
        return L.FeatureGroup.prototype.listens.call(this, o, a) || L.FeatureGroup.prototype.listens.call(this, "cluster" + o, a);
      },
      //Default functionality
      _defaultIconCreateFunction: function(o) {
        var a = o.getChildCount(), h = " marker-cluster-";
        return a < 10 ? h += "small" : a < 100 ? h += "medium" : h += "large", new L.DivIcon({ html: "<div><span>" + a + "</span></div>", className: "marker-cluster" + h, iconSize: new L.Point(40, 40) });
      },
      _bindEvents: function() {
        var o = this._map, a = this.options.spiderfyOnMaxZoom, h = this.options.showCoverageOnHover, c = this.options.zoomToBoundsOnClick, d = this.options.spiderfyOnEveryZoom;
        (a || c || d) && this.on("clusterclick clusterkeypress", this._zoomOrSpiderfy, this), h && (this.on("clustermouseover", this._showCoverage, this), this.on("clustermouseout", this._hideCoverage, this), o.on("zoomend", this._hideCoverage, this));
      },
      _zoomOrSpiderfy: function(o) {
        var a = o.layer, h = a;
        if (!(o.type === "clusterkeypress" && o.originalEvent && o.originalEvent.keyCode !== 13)) {
          for (; h._childClusters.length === 1; )
            h = h._childClusters[0];
          h._zoom === this._maxZoom && h._childCount === a._childCount && this.options.spiderfyOnMaxZoom ? a.spiderfy() : this.options.zoomToBoundsOnClick && a.zoomToBounds(), this.options.spiderfyOnEveryZoom && a.spiderfy(), o.originalEvent && o.originalEvent.keyCode === 13 && this._map._container.focus();
        }
      },
      _showCoverage: function(o) {
        var a = this._map;
        this._inZoomAnimation || (this._shownPolygon && a.removeLayer(this._shownPolygon), o.layer.getChildCount() > 2 && o.layer !== this._spiderfied && (this._shownPolygon = new L.Polygon(o.layer.getConvexHull(), this.options.polygonOptions), a.addLayer(this._shownPolygon)));
      },
      _hideCoverage: function() {
        this._shownPolygon && (this._map.removeLayer(this._shownPolygon), this._shownPolygon = null);
      },
      _unbindEvents: function() {
        var o = this.options.spiderfyOnMaxZoom, a = this.options.showCoverageOnHover, h = this.options.zoomToBoundsOnClick, c = this.options.spiderfyOnEveryZoom, d = this._map;
        (o || h || c) && this.off("clusterclick clusterkeypress", this._zoomOrSpiderfy, this), a && (this.off("clustermouseover", this._showCoverage, this), this.off("clustermouseout", this._hideCoverage, this), d.off("zoomend", this._hideCoverage, this));
      },
      _zoomEnd: function() {
        this._map && (this._mergeSplitClusters(), this._zoom = Math.round(this._map._zoom), this._currentShownBounds = this._getExpandedVisibleBounds());
      },
      _moveEnd: function() {
        if (!this._inZoomAnimation) {
          var o = this._getExpandedVisibleBounds();
          this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), this._zoom, o), this._topClusterLevel._recursivelyAddChildrenToMap(null, Math.round(this._map._zoom), o), this._currentShownBounds = o;
        }
      },
      _generateInitialClusters: function() {
        var o = Math.ceil(this._map.getMaxZoom()), a = Math.floor(this._map.getMinZoom()), h = this.options.maxClusterRadius, c = h;
        typeof h != "function" && (c = function() {
          return h;
        }), this.options.disableClusteringAtZoom !== null && (o = this.options.disableClusteringAtZoom - 1), this._maxZoom = o, this._gridClusters = {}, this._gridUnclustered = {};
        for (var d = o; d >= a; d--)
          this._gridClusters[d] = new L.DistanceGrid(c(d)), this._gridUnclustered[d] = new L.DistanceGrid(c(d));
        this._topClusterLevel = new this._markerCluster(this, a - 1);
      },
      //Zoom: Zoom to start adding at (Pass this._maxZoom to start at the bottom)
      _addLayer: function(o, a) {
        var h = this._gridClusters, c = this._gridUnclustered, d = Math.floor(this._map.getMinZoom()), p, g;
        for (this.options.singleMarkerMode && this._overrideMarkerIcon(o), o.on(this._childMarkerEventHandlers, this); a >= d; a--) {
          p = this._map.project(o.getLatLng(), a);
          var _ = h[a].getNearObject(p);
          if (_) {
            _._addChild(o), o.__parent = _;
            return;
          }
          if (_ = c[a].getNearObject(p), _) {
            var v = _.__parent;
            v && this._removeLayer(_, !1);
            var b = new this._markerCluster(this, a, _, o);
            h[a].addObject(b, this._map.project(b._cLatLng, a)), _.__parent = b, o.__parent = b;
            var x = b;
            for (g = a - 1; g > v._zoom; g--)
              x = new this._markerCluster(this, g, x), h[g].addObject(x, this._map.project(_.getLatLng(), g));
            v._addChild(x), this._removeFromGridUnclustered(_, a);
            return;
          }
          c[a].addObject(o, p);
        }
        this._topClusterLevel._addChild(o), o.__parent = this._topClusterLevel;
      },
      /**
       * Refreshes the icon of all "dirty" visible clusters.
       * Non-visible "dirty" clusters will be updated when they are added to the map.
       * @private
       */
      _refreshClustersIcons: function() {
        this._featureGroup.eachLayer(function(o) {
          o instanceof L.MarkerCluster && o._iconNeedsUpdate && o._updateIcon();
        });
      },
      //Enqueue code to fire after the marker expand/contract has happened
      _enqueue: function(o) {
        this._queue.push(o), this._queueTimeout || (this._queueTimeout = setTimeout(L.bind(this._processQueue, this), 300));
      },
      _processQueue: function() {
        for (var o = 0; o < this._queue.length; o++)
          this._queue[o].call(this);
        this._queue.length = 0, clearTimeout(this._queueTimeout), this._queueTimeout = null;
      },
      //Merge and split any existing clusters that are too big or small
      _mergeSplitClusters: function() {
        var o = Math.round(this._map._zoom);
        this._processQueue(), this._zoom < o && this._currentShownBounds.intersects(this._getExpandedVisibleBounds()) ? (this._animationStart(), this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), this._zoom, this._getExpandedVisibleBounds()), this._animationZoomIn(this._zoom, o)) : this._zoom > o ? (this._animationStart(), this._animationZoomOut(this._zoom, o)) : this._moveEnd();
      },
      //Gets the maps visible bounds expanded in each direction by the size of the screen (so the user cannot see an area we do not cover in one pan)
      _getExpandedVisibleBounds: function() {
        if (this.options.removeOutsideVisibleBounds) {
          if (L.Browser.mobile)
            return this._checkBoundsMaxLat(this._map.getBounds());
        } else
          return this._mapBoundsInfinite;
        return this._checkBoundsMaxLat(this._map.getBounds().pad(1));
      },
      /**
       * Expands the latitude to Infinity (or -Infinity) if the input bounds reach the map projection maximum defined latitude
       * (in the case of Web/Spherical Mercator, it is 85.0511287798 / see https://en.wikipedia.org/wiki/Web_Mercator#Formulas).
       * Otherwise, the removeOutsideVisibleBounds option will remove markers beyond that limit, whereas the same markers without
       * this option (or outside MCG) will have their position floored (ceiled) by the projection and rendered at that limit,
       * making the user think that MCG "eats" them and never displays them again.
       * @param bounds L.LatLngBounds
       * @returns {L.LatLngBounds}
       * @private
       */
      _checkBoundsMaxLat: function(o) {
        var a = this._maxLat;
        return a !== void 0 && (o.getNorth() >= a && (o._northEast.lat = 1 / 0), o.getSouth() <= -a && (o._southWest.lat = -1 / 0)), o;
      },
      //Shared animation code
      _animationAddLayerNonAnimated: function(o, a) {
        if (a === o)
          this._featureGroup.addLayer(o);
        else if (a._childCount === 2) {
          a._addToMap();
          var h = a.getAllChildMarkers();
          this._featureGroup.removeLayer(h[0]), this._featureGroup.removeLayer(h[1]);
        } else
          a._updateIcon();
      },
      /**
       * Extracts individual (i.e. non-group) layers from a Layer Group.
       * @param group to extract layers from.
       * @param output {Array} in which to store the extracted layers.
       * @returns {*|Array}
       * @private
       */
      _extractNonGroupLayers: function(o, a) {
        var h = o.getLayers(), c = 0, d;
        for (a = a || []; c < h.length; c++) {
          if (d = h[c], d instanceof L.LayerGroup) {
            this._extractNonGroupLayers(d, a);
            continue;
          }
          a.push(d);
        }
        return a;
      },
      /**
       * Implements the singleMarkerMode option.
       * @param layer Marker to re-style using the Clusters iconCreateFunction.
       * @returns {L.Icon} The newly created icon.
       * @private
       */
      _overrideMarkerIcon: function(o) {
        var a = o.options.icon = this.options.iconCreateFunction({
          getChildCount: function() {
            return 1;
          },
          getAllChildMarkers: function() {
            return [o];
          }
        });
        return a;
      }
    });
    L.MarkerClusterGroup.include({
      _mapBoundsInfinite: new L.LatLngBounds(new L.LatLng(-1 / 0, -1 / 0), new L.LatLng(1 / 0, 1 / 0))
    }), L.MarkerClusterGroup.include({
      _noAnimation: {
        //Non Animated versions of everything
        _animationStart: function() {
        },
        _animationZoomIn: function(o, a) {
          this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), o), this._topClusterLevel._recursivelyAddChildrenToMap(null, a, this._getExpandedVisibleBounds()), this.fire("animationend");
        },
        _animationZoomOut: function(o, a) {
          this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), o), this._topClusterLevel._recursivelyAddChildrenToMap(null, a, this._getExpandedVisibleBounds()), this.fire("animationend");
        },
        _animationAddLayer: function(o, a) {
          this._animationAddLayerNonAnimated(o, a);
        }
      },
      _withAnimation: {
        //Animated versions here
        _animationStart: function() {
          this._map._mapPane.className += " leaflet-cluster-anim", this._inZoomAnimation++;
        },
        _animationZoomIn: function(o, a) {
          var h = this._getExpandedVisibleBounds(), c = this._featureGroup, d = Math.floor(this._map.getMinZoom()), p;
          this._ignoreMove = !0, this._topClusterLevel._recursively(h, o, d, function(g) {
            var _ = g._latlng, v = g._markers, b;
            for (h.contains(_) || (_ = null), g._isSingleParent() && o + 1 === a ? (c.removeLayer(g), g._recursivelyAddChildrenToMap(null, a, h)) : (g.clusterHide(), g._recursivelyAddChildrenToMap(_, a, h)), p = v.length - 1; p >= 0; p--)
              b = v[p], h.contains(b._latlng) || c.removeLayer(b);
          }), this._forceLayout(), this._topClusterLevel._recursivelyBecomeVisible(h, a), c.eachLayer(function(g) {
            !(g instanceof L.MarkerCluster) && g._icon && g.clusterShow();
          }), this._topClusterLevel._recursively(h, o, a, function(g) {
            g._recursivelyRestoreChildPositions(a);
          }), this._ignoreMove = !1, this._enqueue(function() {
            this._topClusterLevel._recursively(h, o, d, function(g) {
              c.removeLayer(g), g.clusterShow();
            }), this._animationEnd();
          });
        },
        _animationZoomOut: function(o, a) {
          this._animationZoomOutSingle(this._topClusterLevel, o - 1, a), this._topClusterLevel._recursivelyAddChildrenToMap(null, a, this._getExpandedVisibleBounds()), this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), o, this._getExpandedVisibleBounds());
        },
        _animationAddLayer: function(o, a) {
          var h = this, c = this._featureGroup;
          c.addLayer(o), a !== o && (a._childCount > 2 ? (a._updateIcon(), this._forceLayout(), this._animationStart(), o._setPos(this._map.latLngToLayerPoint(a.getLatLng())), o.clusterHide(), this._enqueue(function() {
            c.removeLayer(o), o.clusterShow(), h._animationEnd();
          })) : (this._forceLayout(), h._animationStart(), h._animationZoomOutSingle(a, this._map.getMaxZoom(), this._zoom)));
        }
      },
      // Private methods for animated versions.
      _animationZoomOutSingle: function(o, a, h) {
        var c = this._getExpandedVisibleBounds(), d = Math.floor(this._map.getMinZoom());
        o._recursivelyAnimateChildrenInAndAddSelfToMap(c, d, a + 1, h);
        var p = this;
        this._forceLayout(), o._recursivelyBecomeVisible(c, h), this._enqueue(function() {
          if (o._childCount === 1) {
            var g = o._markers[0];
            this._ignoreMove = !0, g.setLatLng(g.getLatLng()), this._ignoreMove = !1, g.clusterShow && g.clusterShow();
          } else
            o._recursively(c, h, d, function(_) {
              _._recursivelyRemoveChildrenFromMap(c, d, a + 1);
            });
          p._animationEnd();
        });
      },
      _animationEnd: function() {
        this._map && (this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", "")), this._inZoomAnimation--, this.fire("animationend");
      },
      //Force a browser layout of stuff in the map
      // Should apply the current opacity and location to all elements so we can update them again for an animation
      _forceLayout: function() {
        L.Util.falseFn(document.body.offsetWidth);
      }
    }), L.markerClusterGroup = function(o) {
      return new L.MarkerClusterGroup(o);
    };
    var r = L.MarkerCluster = L.Marker.extend({
      options: L.Icon.prototype.options,
      initialize: function(o, a, h, c) {
        L.Marker.prototype.initialize.call(
          this,
          h ? h._cLatLng || h.getLatLng() : new L.LatLng(0, 0),
          { icon: this, pane: o.options.clusterPane }
        ), this._group = o, this._zoom = a, this._markers = [], this._childClusters = [], this._childCount = 0, this._iconNeedsUpdate = !0, this._boundsNeedUpdate = !0, this._bounds = new L.LatLngBounds(), h && this._addChild(h), c && this._addChild(c);
      },
      //Recursively retrieve all child markers of this cluster
      getAllChildMarkers: function(o, a) {
        o = o || [];
        for (var h = this._childClusters.length - 1; h >= 0; h--)
          this._childClusters[h].getAllChildMarkers(o, a);
        for (var c = this._markers.length - 1; c >= 0; c--)
          a && this._markers[c].__dragStart || o.push(this._markers[c]);
        return o;
      },
      //Returns the count of how many child markers we have
      getChildCount: function() {
        return this._childCount;
      },
      //Zoom to the minimum of showing all of the child markers, or the extents of this cluster
      zoomToBounds: function(o) {
        for (var a = this._childClusters.slice(), h = this._group._map, c = h.getBoundsZoom(this._bounds), d = this._zoom + 1, p = h.getZoom(), g; a.length > 0 && c > d; ) {
          d++;
          var _ = [];
          for (g = 0; g < a.length; g++)
            _ = _.concat(a[g]._childClusters);
          a = _;
        }
        c > d ? this._group._map.setView(this._latlng, d) : c <= p ? this._group._map.setView(this._latlng, p + 1) : this._group._map.fitBounds(this._bounds, o);
      },
      getBounds: function() {
        var o = new L.LatLngBounds();
        return o.extend(this._bounds), o;
      },
      _updateIcon: function() {
        this._iconNeedsUpdate = !0, this._icon && this.setIcon(this);
      },
      //Cludge for Icon, we pretend to be an icon for performance
      createIcon: function() {
        return this._iconNeedsUpdate && (this._iconObj = this._group.options.iconCreateFunction(this), this._iconNeedsUpdate = !1), this._iconObj.createIcon();
      },
      createShadow: function() {
        return this._iconObj.createShadow();
      },
      _addChild: function(o, a) {
        this._iconNeedsUpdate = !0, this._boundsNeedUpdate = !0, this._setClusterCenter(o), o instanceof L.MarkerCluster ? (a || (this._childClusters.push(o), o.__parent = this), this._childCount += o._childCount) : (a || this._markers.push(o), this._childCount++), this.__parent && this.__parent._addChild(o, !0);
      },
      /**
       * Makes sure the cluster center is set. If not, uses the child center if it is a cluster, or the marker position.
       * @param child L.MarkerCluster|L.Marker that will be used as cluster center if not defined yet.
       * @private
       */
      _setClusterCenter: function(o) {
        this._cLatLng || (this._cLatLng = o._cLatLng || o._latlng);
      },
      /**
       * Assigns impossible bounding values so that the next extend entirely determines the new bounds.
       * This method avoids having to trash the previous L.LatLngBounds object and to create a new one, which is much slower for this class.
       * As long as the bounds are not extended, most other methods would probably fail, as they would with bounds initialized but not extended.
       * @private
       */
      _resetBounds: function() {
        var o = this._bounds;
        o._southWest && (o._southWest.lat = 1 / 0, o._southWest.lng = 1 / 0), o._northEast && (o._northEast.lat = -1 / 0, o._northEast.lng = -1 / 0);
      },
      _recalculateBounds: function() {
        var o = this._markers, a = this._childClusters, h = 0, c = 0, d = this._childCount, p, g, _, v;
        if (d !== 0) {
          for (this._resetBounds(), p = 0; p < o.length; p++)
            _ = o[p]._latlng, this._bounds.extend(_), h += _.lat, c += _.lng;
          for (p = 0; p < a.length; p++)
            g = a[p], g._boundsNeedUpdate && g._recalculateBounds(), this._bounds.extend(g._bounds), _ = g._wLatLng, v = g._childCount, h += _.lat * v, c += _.lng * v;
          this._latlng = this._wLatLng = new L.LatLng(h / d, c / d), this._boundsNeedUpdate = !1;
        }
      },
      //Set our markers position as given and add it to the map
      _addToMap: function(o) {
        o && (this._backupLatlng = this._latlng, this.setLatLng(o)), this._group._featureGroup.addLayer(this);
      },
      _recursivelyAnimateChildrenIn: function(o, a, h) {
        this._recursively(
          o,
          this._group._map.getMinZoom(),
          h - 1,
          function(c) {
            var d = c._markers, p, g;
            for (p = d.length - 1; p >= 0; p--)
              g = d[p], g._icon && (g._setPos(a), g.clusterHide());
          },
          function(c) {
            var d = c._childClusters, p, g;
            for (p = d.length - 1; p >= 0; p--)
              g = d[p], g._icon && (g._setPos(a), g.clusterHide());
          }
        );
      },
      _recursivelyAnimateChildrenInAndAddSelfToMap: function(o, a, h, c) {
        this._recursively(
          o,
          c,
          a,
          function(d) {
            d._recursivelyAnimateChildrenIn(o, d._group._map.latLngToLayerPoint(d.getLatLng()).round(), h), d._isSingleParent() && h - 1 === c ? (d.clusterShow(), d._recursivelyRemoveChildrenFromMap(o, a, h)) : d.clusterHide(), d._addToMap();
          }
        );
      },
      _recursivelyBecomeVisible: function(o, a) {
        this._recursively(o, this._group._map.getMinZoom(), a, null, function(h) {
          h.clusterShow();
        });
      },
      _recursivelyAddChildrenToMap: function(o, a, h) {
        this._recursively(
          h,
          this._group._map.getMinZoom() - 1,
          a,
          function(c) {
            if (a !== c._zoom)
              for (var d = c._markers.length - 1; d >= 0; d--) {
                var p = c._markers[d];
                h.contains(p._latlng) && (o && (p._backupLatlng = p.getLatLng(), p.setLatLng(o), p.clusterHide && p.clusterHide()), c._group._featureGroup.addLayer(p));
              }
          },
          function(c) {
            c._addToMap(o);
          }
        );
      },
      _recursivelyRestoreChildPositions: function(o) {
        for (var a = this._markers.length - 1; a >= 0; a--) {
          var h = this._markers[a];
          h._backupLatlng && (h.setLatLng(h._backupLatlng), delete h._backupLatlng);
        }
        if (o - 1 === this._zoom)
          for (var c = this._childClusters.length - 1; c >= 0; c--)
            this._childClusters[c]._restorePosition();
        else
          for (var d = this._childClusters.length - 1; d >= 0; d--)
            this._childClusters[d]._recursivelyRestoreChildPositions(o);
      },
      _restorePosition: function() {
        this._backupLatlng && (this.setLatLng(this._backupLatlng), delete this._backupLatlng);
      },
      //exceptBounds: If set, don't remove any markers/clusters in it
      _recursivelyRemoveChildrenFromMap: function(o, a, h, c) {
        var d, p;
        this._recursively(
          o,
          a - 1,
          h - 1,
          function(g) {
            for (p = g._markers.length - 1; p >= 0; p--)
              d = g._markers[p], (!c || !c.contains(d._latlng)) && (g._group._featureGroup.removeLayer(d), d.clusterShow && d.clusterShow());
          },
          function(g) {
            for (p = g._childClusters.length - 1; p >= 0; p--)
              d = g._childClusters[p], (!c || !c.contains(d._latlng)) && (g._group._featureGroup.removeLayer(d), d.clusterShow && d.clusterShow());
          }
        );
      },
      //Run the given functions recursively to this and child clusters
      // boundsToApplyTo: a L.LatLngBounds representing the bounds of what clusters to recurse in to
      // zoomLevelToStart: zoom level to start running functions (inclusive)
      // zoomLevelToStop: zoom level to stop running functions (inclusive)
      // runAtEveryLevel: function that takes an L.MarkerCluster as an argument that should be applied on every level
      // runAtBottomLevel: function that takes an L.MarkerCluster as an argument that should be applied at only the bottom level
      _recursively: function(o, a, h, c, d) {
        var p = this._childClusters, g = this._zoom, _, v;
        if (a <= g && (c && c(this), d && g === h && d(this)), g < a || g < h)
          for (_ = p.length - 1; _ >= 0; _--)
            v = p[_], v._boundsNeedUpdate && v._recalculateBounds(), o.intersects(v._bounds) && v._recursively(o, a, h, c, d);
      },
      //Returns true if we are the parent of only one cluster and that cluster is the same as us
      _isSingleParent: function() {
        return this._childClusters.length > 0 && this._childClusters[0]._childCount === this._childCount;
      }
    });
    L.Marker.include({
      clusterHide: function() {
        var o = this.options.opacity;
        return this.setOpacity(0), this.options.opacity = o, this;
      },
      clusterShow: function() {
        return this.setOpacity(this.options.opacity);
      }
    }), L.DistanceGrid = function(o) {
      this._cellSize = o, this._sqCellSize = o * o, this._grid = {}, this._objectPoint = {};
    }, L.DistanceGrid.prototype = {
      addObject: function(o, a) {
        var h = this._getCoord(a.x), c = this._getCoord(a.y), d = this._grid, p = d[c] = d[c] || {}, g = p[h] = p[h] || [], _ = L.Util.stamp(o);
        this._objectPoint[_] = a, g.push(o);
      },
      updateObject: function(o, a) {
        this.removeObject(o), this.addObject(o, a);
      },
      //Returns true if the object was found
      removeObject: function(o, a) {
        var h = this._getCoord(a.x), c = this._getCoord(a.y), d = this._grid, p = d[c] = d[c] || {}, g = p[h] = p[h] || [], _, v;
        for (delete this._objectPoint[L.Util.stamp(o)], _ = 0, v = g.length; _ < v; _++)
          if (g[_] === o)
            return g.splice(_, 1), v === 1 && delete p[h], !0;
      },
      eachObject: function(o, a) {
        var h, c, d, p, g, _, v, b = this._grid;
        for (h in b) {
          g = b[h];
          for (c in g)
            for (_ = g[c], d = 0, p = _.length; d < p; d++)
              v = o.call(a, _[d]), v && (d--, p--);
        }
      },
      getNearObject: function(o) {
        var a = this._getCoord(o.x), h = this._getCoord(o.y), c, d, p, g, _, v, b, x, M = this._objectPoint, P = this._sqCellSize, S = null;
        for (c = h - 1; c <= h + 1; c++)
          if (g = this._grid[c], g) {
            for (d = a - 1; d <= a + 1; d++)
              if (_ = g[d], _)
                for (p = 0, v = _.length; p < v; p++)
                  b = _[p], x = this._sqDist(M[L.Util.stamp(b)], o), (x < P || x <= P && S === null) && (P = x, S = b);
          }
        return S;
      },
      _getCoord: function(o) {
        var a = Math.floor(o / this._cellSize);
        return isFinite(a) ? a : o;
      },
      _sqDist: function(o, a) {
        var h = a.x - o.x, c = a.y - o.y;
        return h * h + c * c;
      }
    }, function() {
      L.QuickHull = {
        /*
         * @param {Object} cpt a point to be measured from the baseline
         * @param {Array} bl the baseline, as represented by a two-element
         *   array of latlng objects.
         * @returns {Number} an approximate distance measure
         */
        getDistant: function(o, a) {
          var h = a[1].lat - a[0].lat, c = a[0].lng - a[1].lng;
          return c * (o.lat - a[0].lat) + h * (o.lng - a[0].lng);
        },
        /*
         * @param {Array} baseLine a two-element array of latlng objects
         *   representing the baseline to project from
         * @param {Array} latLngs an array of latlng objects
         * @returns {Object} the maximum point and all new points to stay
         *   in consideration for the hull.
         */
        findMostDistantPointFromBaseLine: function(o, a) {
          var h = 0, c = null, d = [], p, g, _;
          for (p = a.length - 1; p >= 0; p--) {
            if (g = a[p], _ = this.getDistant(g, o), _ > 0)
              d.push(g);
            else
              continue;
            _ > h && (h = _, c = g);
          }
          return { maxPoint: c, newPoints: d };
        },
        /*
         * Given a baseline, compute the convex hull of latLngs as an array
         * of latLngs.
         *
         * @param {Array} latLngs
         * @returns {Array}
         */
        buildConvexHull: function(o, a) {
          var h = [], c = this.findMostDistantPointFromBaseLine(o, a);
          return c.maxPoint ? (h = h.concat(
            this.buildConvexHull([o[0], c.maxPoint], c.newPoints)
          ), h = h.concat(
            this.buildConvexHull([c.maxPoint, o[1]], c.newPoints)
          ), h) : [o[0]];
        },
        /*
         * Given an array of latlngs, compute a convex hull as an array
         * of latlngs
         *
         * @param {Array} latLngs
         * @returns {Array}
         */
        getConvexHull: function(o) {
          var a = !1, h = !1, c = !1, d = !1, p = null, g = null, _ = null, v = null, b = null, x = null, M;
          for (M = o.length - 1; M >= 0; M--) {
            var P = o[M];
            (a === !1 || P.lat > a) && (p = P, a = P.lat), (h === !1 || P.lat < h) && (g = P, h = P.lat), (c === !1 || P.lng > c) && (_ = P, c = P.lng), (d === !1 || P.lng < d) && (v = P, d = P.lng);
          }
          h !== a ? (x = g, b = p) : (x = v, b = _);
          var S = [].concat(
            this.buildConvexHull([x, b], o),
            this.buildConvexHull([b, x], o)
          );
          return S;
        }
      };
    }(), L.MarkerCluster.include({
      getConvexHull: function() {
        var o = this.getAllChildMarkers(), a = [], h, c;
        for (c = o.length - 1; c >= 0; c--)
          h = o[c].getLatLng(), a.push(h);
        return L.QuickHull.getConvexHull(a);
      }
    }), L.MarkerCluster.include({
      _2PI: Math.PI * 2,
      _circleFootSeparation: 25,
      //related to circumference of circle
      _circleStartAngle: 0,
      _spiralFootSeparation: 28,
      //related to size of spiral (experiment!)
      _spiralLengthStart: 11,
      _spiralLengthFactor: 5,
      _circleSpiralSwitchover: 9,
      //show spiral instead of circle from this marker count upwards.
      // 0 -> always spiral; Infinity -> always circle
      spiderfy: function() {
        if (!(this._group._spiderfied === this || this._group._inZoomAnimation)) {
          var o = this.getAllChildMarkers(null, !0), a = this._group, h = a._map, c = h.latLngToLayerPoint(this._latlng), d;
          this._group._unspiderfy(), this._group._spiderfied = this, this._group.options.spiderfyShapePositions ? d = this._group.options.spiderfyShapePositions(o.length, c) : o.length >= this._circleSpiralSwitchover ? d = this._generatePointsSpiral(o.length, c) : (c.y += 10, d = this._generatePointsCircle(o.length, c)), this._animationSpiderfy(o, d);
        }
      },
      unspiderfy: function(o) {
        this._group._inZoomAnimation || (this._animationUnspiderfy(o), this._group._spiderfied = null);
      },
      _generatePointsCircle: function(o, a) {
        var h = this._group.options.spiderfyDistanceMultiplier * this._circleFootSeparation * (2 + o), c = h / this._2PI, d = this._2PI / o, p = [], g, _;
        for (c = Math.max(c, 35), p.length = o, g = 0; g < o; g++)
          _ = this._circleStartAngle + g * d, p[g] = new L.Point(a.x + c * Math.cos(_), a.y + c * Math.sin(_))._round();
        return p;
      },
      _generatePointsSpiral: function(o, a) {
        var h = this._group.options.spiderfyDistanceMultiplier, c = h * this._spiralLengthStart, d = h * this._spiralFootSeparation, p = h * this._spiralLengthFactor * this._2PI, g = 0, _ = [], v;
        for (_.length = o, v = o; v >= 0; v--)
          v < o && (_[v] = new L.Point(a.x + c * Math.cos(g), a.y + c * Math.sin(g))._round()), g += d / c + v * 5e-4, c += p / g;
        return _;
      },
      _noanimationUnspiderfy: function() {
        var o = this._group, a = o._map, h = o._featureGroup, c = this.getAllChildMarkers(null, !0), d, p;
        for (o._ignoreMove = !0, this.setOpacity(1), p = c.length - 1; p >= 0; p--)
          d = c[p], h.removeLayer(d), d._preSpiderfyLatlng && (d.setLatLng(d._preSpiderfyLatlng), delete d._preSpiderfyLatlng), d.setZIndexOffset && d.setZIndexOffset(0), d._spiderLeg && (a.removeLayer(d._spiderLeg), delete d._spiderLeg);
        o.fire("unspiderfied", {
          cluster: this,
          markers: c
        }), o._ignoreMove = !1, o._spiderfied = null;
      }
    }), L.MarkerClusterNonAnimated = L.MarkerCluster.extend({
      _animationSpiderfy: function(o, a) {
        var h = this._group, c = h._map, d = h._featureGroup, p = this._group.options.spiderLegPolylineOptions, g, _, v, b;
        for (h._ignoreMove = !0, g = 0; g < o.length; g++)
          b = c.layerPointToLatLng(a[g]), _ = o[g], v = new L.Polyline([this._latlng, b], p), c.addLayer(v), _._spiderLeg = v, _._preSpiderfyLatlng = _._latlng, _.setLatLng(b), _.setZIndexOffset && _.setZIndexOffset(1e6), d.addLayer(_);
        this.setOpacity(0.3), h._ignoreMove = !1, h.fire("spiderfied", {
          cluster: this,
          markers: o
        });
      },
      _animationUnspiderfy: function() {
        this._noanimationUnspiderfy();
      }
    }), L.MarkerCluster.include({
      _animationSpiderfy: function(o, a) {
        var h = this, c = this._group, d = c._map, p = c._featureGroup, g = this._latlng, _ = d.latLngToLayerPoint(g), v = L.Path.SVG, b = L.extend({}, this._group.options.spiderLegPolylineOptions), x = b.opacity, M, P, S, A, O, T;
        for (x === void 0 && (x = L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity), v ? (b.opacity = 0, b.className = (b.className || "") + " leaflet-cluster-spider-leg") : b.opacity = x, c._ignoreMove = !0, M = 0; M < o.length; M++)
          P = o[M], T = d.layerPointToLatLng(a[M]), S = new L.Polyline([g, T], b), d.addLayer(S), P._spiderLeg = S, v && (A = S._path, O = A.getTotalLength() + 0.1, A.style.strokeDasharray = O, A.style.strokeDashoffset = O), P.setZIndexOffset && P.setZIndexOffset(1e6), P.clusterHide && P.clusterHide(), p.addLayer(P), P._setPos && P._setPos(_);
        for (c._forceLayout(), c._animationStart(), M = o.length - 1; M >= 0; M--)
          T = d.layerPointToLatLng(a[M]), P = o[M], P._preSpiderfyLatlng = P._latlng, P.setLatLng(T), P.clusterShow && P.clusterShow(), v && (S = P._spiderLeg, A = S._path, A.style.strokeDashoffset = 0, S.setStyle({ opacity: x }));
        this.setOpacity(0.3), c._ignoreMove = !1, setTimeout(function() {
          c._animationEnd(), c.fire("spiderfied", {
            cluster: h,
            markers: o
          });
        }, 200);
      },
      _animationUnspiderfy: function(o) {
        var a = this, h = this._group, c = h._map, d = h._featureGroup, p = o ? c._latLngToNewLayerPoint(this._latlng, o.zoom, o.center) : c.latLngToLayerPoint(this._latlng), g = this.getAllChildMarkers(null, !0), _ = L.Path.SVG, v, b, x, M, P, S;
        for (h._ignoreMove = !0, h._animationStart(), this.setOpacity(1), b = g.length - 1; b >= 0; b--)
          v = g[b], v._preSpiderfyLatlng && (v.closePopup(), v.setLatLng(v._preSpiderfyLatlng), delete v._preSpiderfyLatlng, S = !0, v._setPos && (v._setPos(p), S = !1), v.clusterHide && (v.clusterHide(), S = !1), S && d.removeLayer(v), _ && (x = v._spiderLeg, M = x._path, P = M.getTotalLength() + 0.1, M.style.strokeDashoffset = P, x.setStyle({ opacity: 0 })));
        h._ignoreMove = !1, setTimeout(function() {
          var A = 0;
          for (b = g.length - 1; b >= 0; b--)
            v = g[b], v._spiderLeg && A++;
          for (b = g.length - 1; b >= 0; b--)
            v = g[b], v._spiderLeg && (v.clusterShow && v.clusterShow(), v.setZIndexOffset && v.setZIndexOffset(0), A > 1 && d.removeLayer(v), c.removeLayer(v._spiderLeg), delete v._spiderLeg);
          h._animationEnd(), h.fire("unspiderfied", {
            cluster: a,
            markers: g
          });
        }, 200);
      }
    }), L.MarkerClusterGroup.include({
      //The MarkerCluster currently spiderfied (if any)
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
      //On zoom start we add a zoomanim handler so that we are guaranteed to be last (after markers are animated)
      //This means we can define the animation they do rather than Markers doing an animation to their actual location
      _unspiderfyZoomStart: function() {
        this._map && this._map.on("zoomanim", this._unspiderfyZoomAnim, this);
      },
      _unspiderfyZoomAnim: function(o) {
        L.DomUtil.hasClass(this._map._mapPane, "leaflet-touching") || (this._map.off("zoomanim", this._unspiderfyZoomAnim, this), this._unspiderfy(o));
      },
      _unspiderfyWrapper: function() {
        this._unspiderfy();
      },
      _unspiderfy: function(o) {
        this._spiderfied && this._spiderfied.unspiderfy(o);
      },
      _noanimationUnspiderfy: function() {
        this._spiderfied && this._spiderfied._noanimationUnspiderfy();
      },
      //If the given layer is currently being spiderfied then we unspiderfy it so it isn't on the map anymore etc
      _unspiderfyLayer: function(o) {
        o._spiderLeg && (this._featureGroup.removeLayer(o), o.clusterShow && o.clusterShow(), o.setZIndexOffset && o.setZIndexOffset(0), this._map.removeLayer(o._spiderLeg), delete o._spiderLeg);
      }
    }), L.MarkerClusterGroup.include({
      /**
       * Updates the icon of all clusters which are parents of the given marker(s).
       * In singleMarkerMode, also updates the given marker(s) icon.
       * @param layers L.MarkerClusterGroup|L.LayerGroup|Array(L.Marker)|Map(L.Marker)|
       * L.MarkerCluster|L.Marker (optional) list of markers (or single marker) whose parent
       * clusters need to be updated. If not provided, retrieves all child markers of this.
       * @returns {L.MarkerClusterGroup}
       */
      refreshClusters: function(o) {
        return o ? o instanceof L.MarkerClusterGroup ? o = o._topClusterLevel.getAllChildMarkers() : o instanceof L.LayerGroup ? o = o._layers : o instanceof L.MarkerCluster ? o = o.getAllChildMarkers() : o instanceof L.Marker && (o = [o]) : o = this._topClusterLevel.getAllChildMarkers(), this._flagParentsIconsNeedUpdate(o), this._refreshClustersIcons(), this.options.singleMarkerMode && this._refreshSingleMarkerModeMarkers(o), this;
      },
      /**
       * Simply flags all parent clusters of the given markers as having a "dirty" icon.
       * @param layers Array(L.Marker)|Map(L.Marker) list of markers.
       * @private
       */
      _flagParentsIconsNeedUpdate: function(o) {
        var a, h;
        for (a in o)
          for (h = o[a].__parent; h; )
            h._iconNeedsUpdate = !0, h = h.__parent;
      },
      /**
       * Re-draws the icon of the supplied markers.
       * To be used in singleMarkerMode only.
       * @param layers Array(L.Marker)|Map(L.Marker) list of markers.
       * @private
       */
      _refreshSingleMarkerModeMarkers: function(o) {
        var a, h;
        for (a in o)
          h = o[a], this.hasLayer(h) && h.setIcon(this._overrideMarkerIcon(h));
      }
    }), L.Marker.include({
      /**
       * Updates the given options in the marker's icon and refreshes the marker.
       * @param options map object of icon options.
       * @param directlyRefreshClusters boolean (optional) true to trigger
       * MCG.refreshClustersOf() right away with this single marker.
       * @returns {L.Marker}
       */
      refreshIconOptions: function(o, a) {
        var h = this.options.icon;
        return L.setOptions(h, o), this.setIcon(h), a && this.__parent && this.__parent._group.refreshClusters(this), this;
      }
    }), e.MarkerClusterGroup = s, e.MarkerCluster = r, Object.defineProperty(e, "__esModule", { value: !0 });
  });
})(Ll, Ll.exports);
const Wg = ut.TileLayer.extend({
  createTile: function(n, t) {
    const e = document.createElement("img");
    return e.alt = "", e.setAttribute("role", "presentation"), fetch(this.getTileUrl(n), { referrer: location.origin + "/" }).then((s) => {
      if (!s.ok)
        throw new Error("Tile " + s.status);
      return s.blob();
    }).then((s) => {
      e.onload = () => {
        URL.revokeObjectURL(e.src), t(void 0, e);
      }, e.src = URL.createObjectURL(s);
    }).catch((s) => t(s, e)), e;
  }
});
function Ml(n, t) {
  return /^https?:$/.test(location.protocol) ? ut.tileLayer(n, t) : new Wg(n, t);
}
class Vg {
  constructor() {
    this.Bounds = [], this.lng = null, this.map = null, this.EventSelectChart = null, this.Polylines = [], this.CurrentPositionMarker = null, this.CurrentGPSPositionMarker = null;
  }
  init(t, e, s, r, o) {
    this.map = ut.map(
      t,
      {
        scrollWheelZoom: s
      }
    );
    var a = new ut.Control.FullScreen();
    this.map.addControl(a);
    const h = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', c = 'Maps &copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, ' + h, d = r != null && (r + "").length > 0, p = {
      OSM1: { name: "Open Street Map", url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: h, maxZoom: 19 },
      OSM7: { name: "Humanitarian Map Style", url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", attribution: h + ', tiles by <a href="https://www.hotosm.org/">HOT</a>' },
      OSM9: { name: "OpenTopoMap", url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", attribution: h + ', <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)', maxZoom: 17 },
      OSM11: { name: "GSI Map (Japan)", url: "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", attribution: '&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>' },
      OSM12: { name: "CyclOSM", url: "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png", attribution: h + ', <a href="https://www.cyclosm.org">CyclOSM</a>' }
    }, g = { OSM2: "OSM12", OSM3: "OSM1", OSM4: "OSM1", OSM5: "OSM1", OSM6: "OSM1", OSM10: "OSM1" };
    if (d) {
      const M = encodeURIComponent(r + "");
      [["OSM2", "Thunderforest - Cycle", "cycle"], ["OSM3", "Thunderforest - Outdoors", "outdoors"], ["OSM4", "Thunderforest - Transport", "transport"], ["OSM5", "Thunderforest - Landscape", "landscape"]].forEach(([P, S, A]) => {
        p[P] = { name: S, url: "https://tile.thunderforest.com/" + A + "/{z}/{x}/{y}.png?apikey=" + M, attribution: c, maxZoom: 22 }, delete g[P];
      });
    }
    const _ = {};
    Object.keys(p).forEach((M) => {
      const P = p[M];
      _[P.name] = Ml(P.url, { maxZoom: P.maxZoom || 18, attribution: P.attribution });
    });
    const v = Ml("https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: 'Sea marks &copy; <a href="https://www.openseamap.org/">OpenSeaMap</a> contributors'
    }), b = { "Open Sea Map": v }, x = p[e] ? e : g[e] || "OSM1";
    _[p[x].name].addTo(this.map), e == "OSM10" && v.addTo(this.map), ut.control.layers(_, b).addTo(this.map);
  }
  AppPolylines(t, e, s, r, o) {
    var p;
    if (this.map != null) {
      var a = Kt.Utils.GetItemFromArray(t, 0);
      if (a != null) {
        (s == "" || s == null) && (s = "https://maps.google.com/mapfiles/kml/pal4/icon25.png");
        var h = ut.marker(ut.latLng(a), {
          icon: ut.icon({
            iconUrl: s,
            iconSize: [32, 32],
            // Size of the icon.
            iconAnchor: [16, 16]
            // Point of the icon which will correspond to marker's location.
          }),
          title: (p = this.lng) == null ? void 0 : p.currentPosition
        });
        h.addTo(this.map), this.CurrentPositionMarker = h;
        var c = Kt.Utils.DividePolylinesPoints(t);
        this.lng, this.EventSelectChart, this.Bounds = t.filter((g) => g != null), this.CenterMap();
        for (let g = 0; g < c.length; g++) {
          let _ = "";
          g < e.length ? _ = e[g] : _ = e[e.length - 1];
          try {
            let v = ut.polyline(c[g], { color: _ }).addTo(this.map);
            this.Polylines.push(v);
            let b = this;
            this.Polylines[g].on("mousemove", function(x) {
              b.MoveMarkerToPosition([x.latlng.lat, x.latlng.lng], !0);
            });
          } catch {
          }
        }
        if (r != "") {
          let g = t[0];
          g != null && ut.marker(ut.latLng(g), {
            icon: ut.icon({
              iconUrl: r + "",
              iconSize: [32, 32],
              // Size of the icon.
              iconAnchor: [16, 16]
              // Point of the icon which will correspond to marker's location.
            }),
            title: "Start"
          }).addTo(this.map);
        }
        if (o != "" && t[t.length - 1] != null) {
          let g = t[t.length - 1];
          if (g != null) {
            var d = ut.marker(ut.latLng(g), {
              icon: ut.icon({
                iconUrl: o + "",
                iconSize: [32, 32],
                // size of the icon
                iconAnchor: [16, 16]
                // point of the icon which will correspond to marker's location
              }),
              title: "End"
            });
            d.addTo(this.map);
          }
        }
      }
    }
  }
  SetCurrentGPSPosition(t, e, s) {
    this.CurrentGPSPositionMarker == null ? (e == "" && (e = "https://maps.google.com/mapfiles/kml/pal4/icon25.png"), this.map != null && (this.CurrentGPSPositionMarker = ut.marker(t, {
      icon: ut.icon({
        iconUrl: e,
        iconSize: [32, 32],
        // Size of the icon.
        iconAnchor: [16, 16]
        // Point of the icon which will correspond to marker's location.
      })
    }).addTo(this.map).bindPopup(s.currentPosition).openPopup())) : this.CurrentGPSPositionMarker.setLatLng(t), this.Bounds.push(t), this.CenterMap();
  }
  AddWaypoints(t, e) {
    var s = ut.icon({
      iconUrl: "https://maps.google.com/mapfiles/ms/micons/flag.png",
      iconSize: [32, 32],
      // Size of the icon.
      iconAnchor: [16, 16]
      // Point of the icon which will correspond to marker's location.
    });
    e && (s = ut.icon({
      iconUrl: e,
      iconSize: [32, 32],
      // Size of the icon.
      iconAnchor: [16, 16]
      // Point of the icon which will correspond to marker's location.
    }));
    for (let d = 0; d < t.length; d++) {
      var r = t[d];
      this.Bounds.push([r.lat, r.lon]);
      var o = r.lat, a = r.lon;
      r.sym, r.type, r.img && (s.iconUrl = r.img + "");
      var h = ut.marker([o, a], { icon: s }), c = "";
      r.name == "" ? c = "<div>" + unescape(r.desc) + "</div>" : c = "<div><b>" + r.name + "</b><br />" + unescape(r.desc) + "</div>", c += "<br /><p><a href='https://maps.google.com?daddr=" + o + "," + a + "' target='_blank'>Itin&eacute;raire</a></p>", this.map != null && h.addTo(this.map).bindPopup(c);
    }
    this.CenterMap();
  }
  MoveMarkerToPosition(t, e) {
    this.CurrentPositionMarker != null && (this.CurrentPositionMarker.setLatLng(t), this.lng && this.CurrentPositionMarker.setTooltipContent(this.lng.currentPosition), e == !0 && this.EventSelectChart && this.EventSelectChart(t));
  }
  AddHtmlMarker(t, e, s) {
    if (this.map == null)
      return;
    const r = e.offsetWidth || parseInt(e.style.width) || 16;
    ut.marker(ut.latLng(t), {
      icon: ut.divIcon({ html: e, className: "wpgpxmaps-html-marker", iconSize: [r, r], iconAnchor: [r / 2, r / 2] }),
      title: s ?? "",
      interactive: !!s
    }).addTo(this.map);
  }
  CenterMap() {
    var s;
    try {
      if (this.Bounds && this.Bounds.length > 0) {
        let r = {
          minLat: Number.POSITIVE_INFINITY,
          maxLat: Number.NEGATIVE_INFINITY,
          minLng: Number.POSITIVE_INFINITY,
          maxLng: Number.NEGATIVE_INFINITY
        };
        this.Bounds.forEach((o) => {
          if (!Array.isArray(o) || o.length !== 2)
            throw new Error("Each coordinate must be an array with [latitude, longitude].");
          const [a, h] = o;
          r.minLat = Math.min(r.minLat, a), r.maxLat = Math.max(r.maxLat, a), r.minLng = Math.min(r.minLng, h), r.maxLng = Math.max(r.maxLng, h);
        });
        var t = new ut.LatLng(r.minLat, r.minLng), e = new ut.LatLng(r.maxLat, r.maxLng);
        (s = this.map) == null || s.fitBounds(new ut.LatLngBounds(t, e));
      }
    } catch (r) {
      console.log(r);
    }
  }
  AddPhotos(t) {
    for (const e of t) {
      let s = ut.marker(e, {
        icon: ut.divIcon(
          ut.extend(
            {
              html: '<div style="background-image: url(' + e.thumbnail + ');"></div>',
              className: "leaflet-marker-photo"
            },
            e,
            {
              iconSize: [40, 40]
            }
          )
        ),
        title: e.caption || ""
      });
      s.bindPopup('<img src="' + e.url + '" /></a><p>' + e.name + "</p>", { minWidth: 500 }), s.addTo(this.map);
    }
  }
}
const jg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=", Ug = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABSCAMAAAAhFXfZAAAC91BMVEVMaXEzeak2f7I4g7g3g7cua5gzeKg8hJo3grY4g7c3grU0gLI2frE0daAubJc2gbQwd6QzeKk2gLMtd5sxdKIua5g1frA2f7IydaM0e6w2fq41fK01eqo3grgubJgta5cxdKI1f7AydaQydaMxc6EubJgvbJkwcZ4ubZkwcJwubZgubJcydqUydKIxapgubJctbJcubZcubJcvbJYubJcvbZkubJctbJctbZcubJg2f7AubJcrbZcubJcubJcua5g3grY0fq8ubJcubJdEkdEwhsw6i88vhswuhcsuhMtBjMgthMsrg8srgss6is8qgcs8i9A9iMYtg8spgcoogMo7hcMngMonf8olfso4gr8kfck5iM8jfMk4iM8he8k1fro7itAgesk2hs8eecgzfLcofssdeMg0hc4cd8g2hcsxeLQbdsgZdcgxeLImfcszhM0vda4xgckzhM4xg84wf8Yxgs4udKsvfcQucqhUndROmdM1fK0wcZ8vb5w0eqpQm9MzeKhXoNVcpdYydKNWn9VZotVKltJFjsIwcJ1Rms9OlslLmtH///8+kc9epdYzd6dbo9VHkMM2f7FHmNBClM8ydqVcpNY9hro3gLM9hLczealQmcw3fa46f7A8gLMxc6I3eagyc6FIldJMl9JSnNRSntNNl9JPnNJFi75UnM9ZodVKksg8kM45jc09e6ZHltFBk883gbRBh7pDk9EwcaBzn784g7dKkcY2i81Om9M7j85Llc81is09g7Q4grY/j9A0eqxKmdFFltBEjcXf6fFImdBCiLxJl9FGlNFBi78yiMxVndEvbpo6js74+vx+psPP3+o/ks5HkcpGmNCjwdZCkNDM3ehYoNJEls+lxNkxh8xHks0+jdC1zd5Lg6r+/v/H2ufz9/o3jM3t8/edvdM/k89Th61OiLBSjbZklbaTt9BfptdjmL1AicBHj8hGk9FAgK1dkLNTjLRekrdClc/k7fM0icy0y9tgp9c4jc2NtM9Dlc8zicxeXZn3AAAAQ3RSTlMAHDdTb4yPA+LtnEQmC4L2EmHqB7XA0d0sr478x4/Yd5i1zOfyPkf1sLVq4Nh3FvjxopQ2/STNuFzUwFIwxKaejILpIBEV9wAABhVJREFUeF6s1NdyFEcYBeBeoQIhRAkLlRDGrhIgY3BJL8CVeKzuyXFzzjkn5ZxzzuScg3PO8cKzu70JkO0LfxdTU//pM9vTu7Xgf6KqOVTb9X7toRrVEfBf1HTVjZccrT/2by1VV928Yty9ZbVuucdz90frG8DBjl9pVApbOstvmMuvVgaNXSfAAd6pGxpy6yxf5ph43pS/4f3uoaGm2rdu72S9xzOvMymkZFq/ptDrk90mhW7e4zl7HLzhxGWPR20xmSxJ/VqldG5m9XhaVOA1DadsNh3Pu5L2N6QtPO/32JpqQBVVk20oy/Pi2s23WEvyfHbe1thadVQttvm7Llf65gGmXK67XtupyoM7HQhmXdLS8oGWJNeOJ3C5fG5XCEJnkez3/oFdsvgJ4l2ANZwhrJKk/7OSXa+3Vw2WJMlKnGkobouYk6T0TyX30klOUnTD9HJ5qpckL3EW/w4XF3Xd0FGywXUrstrclVsqz5Pd/sXFYyDnPdrLcQODmGOK47IZb4CmibmMn+MYRzFZ5jg33ZL/EJrWcszHmANy3ARBK/IXtciJy8VsitPSdE3uuHxzougojcUdr8/32atnz/ev3f/K5wtpxUTpcaI45zusVDpYtZi+jg0oU9b3x74h7+n9ABvYEZeKaVq0sh0AtLKsFtqNBdeT0MrSzwwlq9+x6xAO4tgOtSzbCjrNQQiNvQUbUEubvzBUeGw26yDCsRHCoLkTHDa7IdOLIThs/gHvChszh2CimE8peRs47cxANI0lYNB5y1DljpOF0IhzBDPOZnDOqYYbeGKECbPzWnXludPphw5c2YBq5zlwXphIbO4VDCZ0gnPfUO1TwZoYwAs2ExPCedAu9DAjfQUjzITQb3jNj0KG2Sgt6BHaQUdYzWz+XmBktOHwanXjaSTcwwziBcuMOtwBmqPrTOxFQR/DRKKPqyur0aiW6cULYsx6tBm0jXpR/AUWR6HRq9WVW6MRhIq5jLyjbaCTDCijyYJNpCajdyobP/eTw0iexBAKkJ3gA5KcQb2zBXsIBckn+xVv8jkZSaEFHE+jFEleAEfayRU0MouNoBmB/L50Ai/HSLIHxcrpCvnhSQAuakKp2C/YbCylJjXRVy/z3+Kv/RrNcCo+WUzlVEhzKffnTQnxeN9fWF88fiNCUdSTsaufaChKWInHeysygfpIqagoakW+vV20J8uyl6TyNKEZWV4oRSPyCkWpgOLSbkCObT8o2r6tlG58HQquf6O0v50tB7JM7F4EORd2dx/K0w/KHsVkLPaoYrwgP/y7krr3SSMA4zj+OBgmjYkxcdIJQyQRKgg2viX9Hddi9UBb29LrKR7CVVEEEXWojUkXNyfTNDE14W9gbHJNuhjDettN3ZvbOvdOqCD3Jp/9l+/wJE+9PkYGjx/fqkys3S2rMozM/o2106rfMUINo6hVqz+eu/hd1c4xTg0TAfy5kV+4UG6+IthHTU9woWmxuKNbTfuCSfovBCxq7EtHqvYL4Sm6F8GVxsSXHMQ07TOi1DKtZxjWaaIyi4CXWjxPccUw8WVbMYY5wxC1mzEyXMJWkllpRloi+Kkoq69sxBTlElF6aAxYUbjXNlhlDZilDnM4U5SlN5biRsRHnbx3mbeWjEh4mEyiuJDl5XcWVmX5GvNkFgLWZM5qwsop4/AWfLhU1cR7k1VVvcYCWRkOI6Xy5gmnphCYIkvzuNYzHzosq2oNk2RtSs8khfUOfHIDgR6ysYBaMpl4uEgk2U/oJTs9AaTSwma7dT69geAE2ZpEjUsn2ieJNHeKfrI3EcAGJ2ZaNgVuC8EBctCLc57P5u5led6IOBkIYkuQMrmmjChs4VkfOerHqSBkPzZlhe06RslZ3zMjk2sscqKwY0RcjKK+LWbzd7KiHhkncs/siFJ+V5eXxD34B8nVuJEpGJNmxN2gH3vSvp7J70tF+D1Ej8qUJD1TkErAND2GZwTFg/LubvmgiBG3SOvdlsqFQrkEzJCL1rstlnVFROixZoDDSuXQFHESwVGlcuQcMb/b42NgjLowh5MTDFE3vNB5qStRIErdCQEh6pLPR92anSUb/wAIhldAaDMpGgAAAABJRU5ErkJggg==", Gg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC", Ti = {};
async function im(n) {
  n == "mapbox" && !Ti.mapbox ? Ti.mapbox = (await import("./MapBoxMapEngine-5f97c136.js")).MapBoxMapEngine : n == "maplibre" && !Ti.maplibre && (Ti.maplibre = (await import("./MapLibreMapEngine-655199ce.js")).MapLibreMapEngine);
}
delete ut.Icon.Default.prototype._getIconUrl;
ut.Icon.Default.mergeOptions({ iconUrl: jg, iconRetinaUrl: Ug, shadowUrl: Gg });
const Lo = "1", Yg = "2", Pl = "3", kl = "4", Mo = "5", qg = "6", Xg = "5", Kg = "4", Jg = "3", $g = "2", Qg = "1";
class nm {
  constructor(t) {
    this.map = null, this.myChart = null, this.params = t, this.init();
  }
  init() {
    var Bi, An, Ee, On, En, Ri, Fi, Ni, In, Dn;
    let {
      targetId: t,
      mapType: e,
      mapData: s,
      graphDist: r,
      graphEle: o,
      graphSpeed: a,
      graphHr: h,
      graphAtemp: c,
      graphCad: d,
      graphGrade: p,
      waypoints: g,
      unit: _,
      unitspeed: v,
      color1: b,
      color2: x,
      color3: M,
      color4: P,
      color5: S,
      color6: A,
      color7: O,
      chartFrom1: T,
      chartTo1: I,
      chartFrom2: D,
      chartTo2: B,
      startIcon: N,
      waypointIcon: Y,
      endIcon: Z,
      currentIcon: V,
      zoomOnScrollWheel: Ct,
      langs: et,
      pluginUrl: ht,
      usegpsposition: J,
      currentpositioncon: dt,
      TFApiKey: H
    } = this.params;
    var pt = [], F = { suf: "", dec: 0 }, G = { suf: "", dec: 0 }, ct = { suf: "", dec: 0 }, xt = { suf: "%", dec: 1 }, at = { suf: "", dec: 0 }, Q = { suf: "", dec: 0 }, U = document.getElementById("wpgpxmaps_" + t), qt = document.getElementById("map_" + t), Vt = document.getElementById("myChart_" + t);
    if (document.getElementById("report_" + t), document.getElementById("wpgpxmaps_" + t + "_osm_footer"), qt == null)
      return;
    let Di = this;
    const Ve = Ti[this.params.MapEngine] ? this.params.MapEngine : "leaflet";
    this.map = Ve == "leaflet" ? new Vg() : new Ti[Ve](), this.map.init(
      qt,
      e,
      Ct == "true",
      H,
      this.params
    ), this.map.EventSelectChart = function(st) {
      var it;
      const K = Di.myChart;
      if (K) {
        const Pt = Di.getClosestIndex(s, st[0], st[1]), _t = K.data.datasets.map((kt, wt) => ({ datasetIndex: wt, index: Pt })).filter((kt) => {
          const wt = K.getDatasetMeta(kt.datasetIndex).data[Pt];
          return wt && !isNaN(wt.x) && !isNaN(wt.y);
        });
        if (_t.length > 0) {
          const kt = K.getDatasetMeta(_t[0].datasetIndex).data[Pt];
          K.setActiveElements(_t), (it = K.tooltip) == null || it.setActiveElements(_t, { x: kt.x, y: kt.y }), K.update("none");
        }
      }
    }, J == "true" && navigator.geolocation && navigator.geolocation.watchPosition(
      function(st) {
        st.coords.accuracy / 2;
        var K = [st.coords.latitude, st.coords.longitude];
        this.map.SetCurrentGPSPosition([K[0], K[1]], dt, et);
      },
      function(st) {
      },
      {
        enableHighAccuracy: !1,
        timeout: 5e3,
        maximumAge: 0
      }
    ), g != null && g.length > 0 && this.map.AddWaypoints(g, Y);
    let he = document.getElementById("ngimages_" + t);
    he == null || he.setAttribute("style", "display:block;position:absolute;left:-50000px");
    var ce = he == null ? void 0 : he.querySelectorAll("span");
    if (ce && ce.length > 0) {
      for (var je = [], zi = 0; zi < ce.length; zi++) {
        var fi = ce[zi], Ue = fi.children[0], Ge = [
          Number(fi.getAttribute("lat")),
          Number(fi.getAttribute("lon"))
        ];
        this.map.Bounds.push(Ge), je.push({
          lat: Ge[0],
          lng: Ge[1],
          name: Ue.children[0].getAttribute("alt"),
          image_id: Ue.getAttribute("data-image-id"),
          url: Ue.getAttribute("href"),
          thumbnail: Ue.children[0].getAttribute("src")
        });
      }
      je.length > 0 && this.map.AddPhotos(je);
    }
    const { colorBy: $t, colorData: pi } = this.params;
    if (s && $t && pi && pi.length === s.length) {
      const st = Kt.Utils.TrackColorScale($t, pi), K = Kt.Utils.SplitTrackByColor(s, pi, st.colorOf);
      this.map.AppPolylines(K.mapData, K.colors, V, N, Z);
      const it = { 0: "m/s", 1: "km/h", 2: "mi/h", 3: "min/km", 4: "min/mi", 5: "knots", 6: "min/100m" }, Pt = {
        grade: [et.grade, "%"],
        speed: [et.speed, " " + (it[v] ?? "m/s")],
        hr: [et.heartRate, " bpm"],
        elevation: [et.altitude, _ === Lo || _ === Mo ? " ft" : " m"]
      }, [_t, kt] = Pt[$t] ?? [$t, ""], wt = $t === "speed" ? 1 : 0, Xe = document.getElementById("map_" + t + "_cont");
      Xe && Kt.Utils.AddTrackLegend(
        Xe,
        _t,
        st.stops,
        ($t === "grade" ? "≤" : "") + st.min.toFixed(wt) + kt,
        ($t === "grade" ? "≥" : "") + st.max.toFixed(wt) + kt
      );
    } else if (s) {
      this.map.AppPolylines(s, b, V, N, Z);
      const { trackNames: st, trackColors: K } = this.params, it = document.getElementById("map_" + t + "_cont");
      it && st && st.length > 1 && K && K.length && Kt.Utils.AddTracksLegend(it, st, K);
    }
    const Ye = (s || []).filter((st) => st !== null);
    if (Ye.length > 1) {
      this.params.startEnd !== !1 && !N && this.map.AddHtmlMarker(Ye[0], Kt.Utils.MarkerElement("", "#16a34a", 16), et.start ?? "Start"), this.params.startEnd !== !1 && !Z && this.map.AddHtmlMarker(Ye[Ye.length - 1], Kt.Utils.MarkerElement("", "#dc2626", 16), et.finish ?? "Finish");
      const st = Number(this.params.kmMarkers) || 0;
      if (st > 0) {
        const K = _ === Lo || _ === kl, it = _ === Pl || _ === Mo, Pt = K ? 1609.344 : it ? 1852 : 1e3, _t = K ? " mi" : it ? " NM" : " km";
        for (const kt of Kt.Utils.DistanceMarkers(s, st, Pt))
          this.map.AddHtmlMarker(kt.point, Kt.Utils.MarkerElement(String(kt.value), "#1f2937", 22), kt.value + _t);
      }
    }
    var qe = this.map;
    let gi = null, ve = U == null ? void 0 : U.parentElement;
    for (; ve != null; ) {
      if (ve.classList.contains("wordpress-post-tabs") && ve.classList.contains("tab-pane")) {
        gi = ve;
        break;
      }
      ve = ve.parentElement;
    }
    if (gi) {
      var kn = function(st) {
        setTimeout(function(K) {
          var it;
          (it = qe.map) == null || it.invalidateSize(), qe.CenterMap();
        }, 300);
      };
      (Bi = document.querySelector(".wpsm_nav-tabs a")) == null || Bi.addEventListener("click", kn, !1), (An = gi.querySelector("div > ul > li > a")) == null || An.addEventListener("click", kn, !1);
    }
    var Sn = Vt == null ? void 0 : Vt.style.height;
    const se = (st) => Array.isArray(st) && st.length > 0;
    if (se(r) && (se(o) || se(a) || se(h) || se(c) || se(d) || se(p)) && Sn != "0px" && Sn != "0") {
      r.length, Lo == _ ? (G = { suf: "mi", dec: 1 }, ct = { suf: "ft", dec: 0 }) : Yg == _ ? (G = { suf: "km", dec: 1 }, ct = { suf: "m", dec: 0 }) : Pl == _ ? (G = { suf: "NM", dec: 1 }, ct = { suf: "m", dec: 0 }) : kl == _ ? (G = { suf: "mi", dec: 1 }, ct = { suf: "m", dec: 0 }) : Mo == _ ? (G = { suf: "NM", dec: 1 }, ct = { suf: "ft", dec: 0 }) : (G = { suf: "m", dec: 0 }, ct = { suf: "m", dec: 0 });
      var Cn = 1111.1, mi = Cn.toLocaleString(), Tn = mi.length;
      mi.substring(Tn - 2, Tn - 1), mi.substring(1, 2), Se.register(...Fg);
      var Ft = {
        type: "line",
        data: {
          datasets: []
        },
        //borderWidth: 1,
        options: {
          animation: {
            // duration: 0,
            // general animation time
          },
          hover: {
            // animationDuration: 0,
            // duration of animations when hovering an item
          },
          interaction: {
            intersect: !1,
            mode: "index"
          },
          // responsiveAnimationDuration: 0,
          // animation duration after a resize
          //customLine: {
          //	color: 'gray'
          //},
          scales: {
            xAxe: {
              type: "linear",
              min: 0,
              max: r[r.length - 1],
              ticks: {
                /* Include a dollar sign in the ticks. */
                callback: function(K, it, Pt) {
                  return parseFloat(K + "").toFixed(G.dec) + G.suf;
                }
              }
            }
          },
          plugins: {
            tooltip: {
              position: "average",
              mode: "index",
              intersect: !1,
              callbacks: {
                title: function(K) {
                  var it = K[0].parsed.x;
                  return it.toFixed(G.dec) + " " + G.suf;
                },
                label: function(K) {
                  var it = pt[K.datasetIndex].label_y, Pt = K.parsed.y;
                  return Pt === null || isNaN(Pt) ? "" : (K.dataset.label || "") + ": " + Pt.toFixed(it.dec) + " " + it.suf;
                },
                footer: function(K) {
                  var it = K[0].dataIndex, Pt = Kt.Utils.GetItemFromArray(s, it);
                  Pt && qe.MoveMarkerToPosition(Pt, !1);
                }
              }
            }
            /*
            							decimation: {
            								beforeEvent: function (chart, args, options) {
            									if ((args.event.type === 'mousemove' && args.event.x)
            										&& (args.event.x >= chart.chartArea.left)
            										&& (args.event.x <= chart.chartArea.right)
            									) {
            										chart.options.customLine.x = args.event.x;
            									}
            								},
            								afterDraw: function (chart, args, opt) {
            									var ctx = chart.ctx;
            									var chartArea = chart.chartArea;
            									var x = chart.options.customLine.x;
            									if (!isNaN(x)) {
            										ctx.save();
            										ctx.strokeStyle = chart.options.customLine.color;
            										ctx.moveTo(chart.options.customLine.x, chartArea.bottom);
            										ctx.lineTo(chart.options.customLine.x, chartArea.top);
            										ctx.stroke();
            										ctx.restore();
            									}
            								}
            
            							}						
            						*/
          }
        }
        //labels: graphDist
      };
      let st = 1;
      if (o && o.length > 0) {
        var zt = this.mergeArrayForChart(r, o);
        let K, it;
        T != "" ? K = parseFloat(T) : K = zt.Min, I != "" ? it = parseFloat(I) : it = zt.Max;
        var It = "yaxis" + st++, Qt = {
          type: "linear",
          max: it,
          min: K,
          ticks: {
            callback(Pt, _t, kt) {
              return parseFloat(Pt + "").toFixed(ct.dec) + ct.suf;
            }
          }
        };
        ((Ee = Ft.options) == null ? void 0 : Ee.scales)[It] = Qt, pt.push({ label_x: G, label_y: ct }), Ft.data.datasets.push({ ...this.wpgpxmapsGetDataset(et.altitude, zt.Items, x, It), fill: "start" });
      }
      if (a && a.length > 0) {
        qg == v ? F = { suf: "min/100m", dec: 2 } : Xg == v ? F = { suf: "knots", dec: 2 } : Kg == v ? F = { suf: "min/mi", dec: 2 } : Jg == v ? F = { suf: "min/km", dec: 2 } : $g == v ? F = { suf: "mi/h", dec: 0 } : Qg == v ? F = { suf: "km/h", dec: 0 } : F = { suf: "m/s", dec: 0 };
        var zt = this.mergeArrayForChart(r, a);
        let it = {
          type: "linear",
          ticks: {
            /* Include a dollar sign in the ticks. */
            callback(_t, kt, wt) {
              return parseFloat(_t + "").toFixed(F.dec) + F.suf;
            }
          },
          position: "right"
          //scalePositionLeft: false,
        };
        D != "" ? it.min = parseFloat(D) : it.min = zt.Min, B != "" ? it.max = parseFloat(B) : it.max = zt.Max, pt.push({ label_x: G, label_y: F });
        var It = "yaxis" + st++;
        ((On = Ft.options) == null ? void 0 : On.scales)[It] = it, Ft.data.datasets.push(this.wpgpxmapsGetDataset(et.speed, zt.Items, M, It));
      }
      if (h && h.length > 0) {
        var zt = this.mergeArrayForChart(r, h), Qt = {
          type: "linear",
          ticks: {
            /* Include a dollar sign in the ticks. */
            callback(_t, kt, wt) {
              return parseFloat(_t + "").toFixed(at.dec) + at.suf;
            }
          },
          position: "right"
          //scalePositionLeft: false,
        }, It = "yaxis" + st++;
        ((En = Ft.options) == null ? void 0 : En.scales)[It] = Qt, Ft.data.datasets.push(this.wpgpxmapsGetDataset(et.heartRate, zt.Items, P, It)), pt.push({ label_x: G, label_y: at });
      }
      if (c && c.length > 0) {
        var zt = this.mergeArrayForChart(r, c), Qt = {
          type: "linear",
          ticks: {
            /* Include a dollar sign in the ticks. */
            callback(_t, kt, wt) {
              return parseFloat(_t + "").toFixed(1) + "°C";
            }
          },
          position: "right"
          //scalePositionLeft: false,
        }, It = "yaxis" + st++;
        ((Ri = Ft.options) == null ? void 0 : Ri.scales)[It] = Qt, Ft.data.datasets.push(this.wpgpxmapsGetDataset(et.atemp, zt.Items, O, It)), pt.push({ label_x: G, label_y: { suf: "°C", dec: 1 } });
      }
      if (d && d.length > 0) {
        var zt = this.mergeArrayForChart(r, d, !0), Qt = {
          type: "linear",
          ticks: {
            // Include a dollar sign in the ticks.
            callback(_t, kt, wt) {
              return parseFloat(_t + "").toFixed(Q.dec) + Q.suf;
            }
          },
          position: "right"
          //scalePositionLeft: false,
        }, It = "yaxis" + st++;
        ((Fi = Ft.options) == null ? void 0 : Fi.scales)[It] = Qt, Ft.data.datasets.push(this.wpgpxmapsGetDataset(et.cadence, zt.Items, S, It)), pt.push({ label_x: G, label_y: Q });
      }
      if (p && p.length > 0 && Kt.Utils.calculateGrade(o, r.slice(1)), p && p.length > 0) {
        var zt = this.mergeArrayForChart(r, p), Qt = {
          type: "linear",
          ticks: {
            // Include a dollar sign in the ticks.
            callback: function(_t, kt, wt) {
              return parseFloat(_t + "").toFixed(xt.dec) + xt.suf;
            }
          },
          position: "right"
          //scalePositionLeft: false,
        };
        pt.push({ label_x: G, label_y: xt });
        var It = "yaxis" + st++;
        ((Ni = Ft.options) == null ? void 0 : Ni.scales)[It] = Qt, Ft.data.datasets.push(this.wpgpxmapsGetDataset(et.grade, zt.Items, A, It));
      }
      Ft.plugins = [{
        id: "wpgpxmapsCrosshair",
        afterDatasetsDraw(K) {
          var Xe;
          const it = (Xe = K.tooltip) == null ? void 0 : Xe.getActiveElements();
          if (!it || it.length === 0)
            return;
          const Pt = it[0].element.x, { top: _t, bottom: kt } = K.chartArea, wt = K.ctx;
          wt.save(), wt.strokeStyle = "rgba(0, 0, 0, 0.35)", wt.lineWidth = 1, wt.beginPath(), wt.moveTo(Pt, _t), wt.lineTo(Pt, kt), wt.stroke(), wt.restore();
        }
      }];
      var _i = (In = document.getElementById("myChart_" + t)) == null ? void 0 : In.getContext("2d");
      _i && (this.myChart = new Se(_i, Ft));
    } else
      Vt == null || Vt.style.setProperty("display", "none");
    return qt.ownerDocument.dispatchEvent(new CustomEvent("wpgpxmaps:ready", {
      detail: {
        apiVersion: 1,
        instance: this,
        targetId: t,
        engine: Ve,
        map: ((Dn = this.map) == null ? void 0 : Dn.map) ?? null,
        chart: this.myChart,
        container: U,
        params: this.params
      }
    })), this;
  }
  mergeArrayForChart(t, e, s) {
    const r = t.length, o = new Array(r);
    let a = 1e4, h = -1e4, c = 0;
    for (let d = 0; d < r; d++)
      if (t[d] != null) {
        let p = e[d];
        s === !0 && p === 0 && (p = null), o[d] = {
          x: t[d],
          y: p
        }, c = t[d], p > h && (h = p), p < a && (a = p);
      } else
        o[d] = {
          x: c,
          y: null
        };
    return {
      Items: o,
      Min: a,
      Max: h
    };
  }
  wpgpxmapsGetDataset(t, e, s, r) {
    return {
      label: t,
      data: e,
      borderColor: s,
      backgroundColor: this.hexToRgbA(s, 0.3),
      pointRadius: 0,
      borderWidth: 1,
      pointHoverRadius: 1,
      yAxisID: r
    };
  }
  hexToRgbA(t, e) {
    let s;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(t))
      return s = t.substring(1).split(""), s.length == 3 && (s = [s[0], s[0], s[1], s[1], s[2], s[2]]), s = "0x" + s.join(""), "rgba(" + [s >> 16 & 255, s >> 8 & 255, s & 255].join(",") + "," + e + ")";
    throw new Error("Bad Hex");
  }
  getItemFromArray(t, e) {
    try {
      return t[e];
    } catch {
      return [0, 0];
    }
  }
  getClosestIndex(t, e, s) {
    let r = 1e4, o = 0;
    for (let a = 0; a < t.length; a++) {
      if (t[a] === null)
        continue;
      const h = this.wpgpxmapsDist(t[a][0], t[a][1], e, s);
      h < r && (o = a, r = h);
    }
    return o;
  }
  getClosestImage(t, e, s) {
    let r = 1e4, o;
    const a = document.getElementById("ngimages_" + s);
    if (a == null)
      return;
    const h = a.getElementsByTagName("span");
    for (let c = 0; c < h.length; c++) {
      let d = h[c].getAttribute("lat"), p = h[c].getAttribute("lon");
      if (d == null || p == null)
        return;
      d = d.replace(",", "."), p = p.replace(",", ".");
      const g = this.wpgpxmapsDist(parseFloat(d), parseFloat(p), t, e);
      g < r && (o = h[c], r = g);
    }
    return o;
  }
  isNumeric(t) {
    return /^-{0,1}\d*\.{0,1}\d+$/.test(t);
  }
  wpgpxmapsDist(t, e, s, r) {
    const o = s - t, a = r - e;
    return Math.sqrt(o * o + a * a);
  }
}
export {
  ut as L,
  Kt as W,
  nm as a,
  sr as c,
  Ng as g,
  im as l
};
