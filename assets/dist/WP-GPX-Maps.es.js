var Mc = Object.defineProperty;
var Pc = (n, t, e) => t in n ? Mc(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var z = (n, t, e) => (Pc(n, typeof t != "symbol" ? t + "" : t, e), e);
/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */
function vn(n) {
  return n + 0.5 | 0;
}
const ze = (n, t, e) => Math.max(Math.min(n, e), t);
function Ji(n) {
  return ze(vn(n * 2.55), 0, 255);
}
function Ne(n) {
  return ze(vn(n * 255), 0, 255);
}
function Me(n) {
  return ze(vn(n / 2.55) / 100, 0, 1);
}
function qr(n) {
  return ze(vn(n * 100), 0, 100);
}
const ee = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, vo = [..."0123456789ABCDEF"], kc = (n) => vo[n & 15], Sc = (n) => vo[(n & 240) >> 4] + vo[n & 15], qn = (n) => (n & 240) >> 4 === (n & 15), Cc = (n) => qn(n.r) && qn(n.g) && qn(n.b) && qn(n.a);
function Tc(n) {
  var t = n.length, e;
  return n[0] === "#" && (t === 4 || t === 5 ? e = {
    r: 255 & ee[n[1]] * 17,
    g: 255 & ee[n[2]] * 17,
    b: 255 & ee[n[3]] * 17,
    a: t === 5 ? ee[n[4]] * 17 : 255
  } : (t === 7 || t === 9) && (e = {
    r: ee[n[1]] << 4 | ee[n[2]],
    g: ee[n[3]] << 4 | ee[n[4]],
    b: ee[n[5]] << 4 | ee[n[6]],
    a: t === 9 ? ee[n[7]] << 4 | ee[n[8]] : 255
  })), e;
}
const Oc = (n, t) => n < 255 ? t(n) : "";
function Ac(n) {
  var t = Cc(n) ? kc : Sc;
  return n ? "#" + t(n.r) + t(n.g) + t(n.b) + Oc(n.a, t) : void 0;
}
const Ec = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function vl(n, t, e) {
  const s = t * Math.min(e, 1 - e), r = (o, l = (o + n / 30) % 12) => e - s * Math.max(Math.min(l - 3, 9 - l, 1), -1);
  return [r(0), r(8), r(4)];
}
function Ic(n, t, e) {
  const s = (r, o = (r + n / 60) % 6) => e - e * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [s(5), s(3), s(1)];
}
function Dc(n, t, e) {
  const s = vl(n, 1, 0.5);
  let r;
  for (t + e > 1 && (r = 1 / (t + e), t *= r, e *= r), r = 0; r < 3; r++)
    s[r] *= 1 - t - e, s[r] += t;
  return s;
}
function zc(n, t, e, s, r) {
  return n === r ? (t - e) / s + (t < e ? 6 : 0) : t === r ? (e - n) / s + 2 : (n - t) / s + 4;
}
function zo(n) {
  const e = n.r / 255, s = n.g / 255, r = n.b / 255, o = Math.max(e, s, r), l = Math.min(e, s, r), h = (o + l) / 2;
  let c, d, p;
  return o !== l && (p = o - l, d = h > 0.5 ? p / (2 - o - l) : p / (o + l), c = zc(e, s, r, p, o), c = c * 60 + 0.5), [c | 0, d || 0, h];
}
function Bo(n, t, e, s) {
  return (Array.isArray(t) ? n(t[0], t[1], t[2]) : n(t, e, s)).map(Ne);
}
function Ro(n, t, e) {
  return Bo(vl, n, t, e);
}
function Bc(n, t, e) {
  return Bo(Dc, n, t, e);
}
function Rc(n, t, e) {
  return Bo(Ic, n, t, e);
}
function yl(n) {
  return (n % 360 + 360) % 360;
}
function Fc(n) {
  const t = Ec.exec(n);
  let e = 255, s;
  if (!t)
    return;
  t[5] !== s && (e = t[6] ? Ji(+t[5]) : Ne(+t[5]));
  const r = yl(+t[2]), o = +t[3] / 100, l = +t[4] / 100;
  return t[1] === "hwb" ? s = Bc(r, o, l) : t[1] === "hsv" ? s = Rc(r, o, l) : s = Ro(r, o, l), {
    r: s[0],
    g: s[1],
    b: s[2],
    a: e
  };
}
function Nc(n, t) {
  var e = zo(n);
  e[0] = yl(e[0] + t), e = Ro(e), n.r = e[0], n.g = e[1], n.b = e[2];
}
function Zc(n) {
  if (!n)
    return;
  const t = zo(n), e = t[0], s = qr(t[1]), r = qr(t[2]);
  return n.a < 255 ? `hsla(${e}, ${s}%, ${r}%, ${Me(n.a)})` : `hsl(${e}, ${s}%, ${r}%)`;
}
const $r = {
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
}, Xr = {
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
function Hc() {
  const n = {}, t = Object.keys(Xr), e = Object.keys($r);
  let s, r, o, l, h;
  for (s = 0; s < t.length; s++) {
    for (l = h = t[s], r = 0; r < e.length; r++)
      o = e[r], h = h.replace(o, $r[o]);
    o = parseInt(Xr[l], 16), n[h] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return n;
}
let $n;
function Wc(n) {
  $n || ($n = Hc(), $n.transparent = [0, 0, 0, 0]);
  const t = $n[n.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const Vc = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function jc(n) {
  const t = Vc.exec(n);
  let e = 255, s, r, o;
  if (t) {
    if (t[7] !== s) {
      const l = +t[7];
      e = t[8] ? Ji(l) : ze(l * 255, 0, 255);
    }
    return s = +t[1], r = +t[3], o = +t[5], s = 255 & (t[2] ? Ji(s) : ze(s, 0, 255)), r = 255 & (t[4] ? Ji(r) : ze(r, 0, 255)), o = 255 & (t[6] ? Ji(o) : ze(o, 0, 255)), {
      r: s,
      g: r,
      b: o,
      a: e
    };
  }
}
function Uc(n) {
  return n && (n.a < 255 ? `rgba(${n.r}, ${n.g}, ${n.b}, ${Me(n.a)})` : `rgb(${n.r}, ${n.g}, ${n.b})`);
}
const so = (n) => n <= 31308e-7 ? n * 12.92 : Math.pow(n, 1 / 2.4) * 1.055 - 0.055, wi = (n) => n <= 0.04045 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
function Gc(n, t, e) {
  const s = wi(Me(n.r)), r = wi(Me(n.g)), o = wi(Me(n.b));
  return {
    r: Ne(so(s + e * (wi(Me(t.r)) - s))),
    g: Ne(so(r + e * (wi(Me(t.g)) - r))),
    b: Ne(so(o + e * (wi(Me(t.b)) - o))),
    a: n.a + e * (t.a - n.a)
  };
}
function Xn(n, t, e) {
  if (n) {
    let s = zo(n);
    s[t] = Math.max(0, Math.min(s[t] + s[t] * e, t === 0 ? 360 : 1)), s = Ro(s), n.r = s[0], n.g = s[1], n.b = s[2];
  }
}
function bl(n, t) {
  return n && Object.assign(t || {}, n);
}
function Kr(n) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(n) ? n.length >= 3 && (t = { r: n[0], g: n[1], b: n[2], a: 255 }, n.length > 3 && (t.a = Ne(n[3]))) : (t = bl(n, { r: 0, g: 0, b: 0, a: 1 }), t.a = Ne(t.a)), t;
}
function Yc(n) {
  return n.charAt(0) === "r" ? jc(n) : Fc(n);
}
class cn {
  constructor(t) {
    if (t instanceof cn)
      return t;
    const e = typeof t;
    let s;
    e === "object" ? s = Kr(t) : e === "string" && (s = Tc(t) || Wc(t) || Yc(t)), this._rgb = s, this._valid = !!s;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = bl(this._rgb);
    return t && (t.a = Me(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Kr(t);
  }
  rgbString() {
    return this._valid ? Uc(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? Ac(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Zc(this._rgb) : void 0;
  }
  mix(t, e) {
    if (t) {
      const s = this.rgb, r = t.rgb;
      let o;
      const l = e === o ? 0.5 : e, h = 2 * l - 1, c = s.a - r.a, d = ((h * c === -1 ? h : (h + c) / (1 + h * c)) + 1) / 2;
      o = 1 - d, s.r = 255 & d * s.r + o * r.r + 0.5, s.g = 255 & d * s.g + o * r.g + 0.5, s.b = 255 & d * s.b + o * r.b + 0.5, s.a = l * s.a + (1 - l) * r.a, this.rgb = s;
    }
    return this;
  }
  interpolate(t, e) {
    return t && (this._rgb = Gc(this._rgb, t._rgb, e)), this;
  }
  clone() {
    return new cn(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = Ne(t), this;
  }
  clearer(t) {
    const e = this._rgb;
    return e.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, e = vn(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return Xn(this._rgb, 2, t), this;
  }
  darken(t) {
    return Xn(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return Xn(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return Xn(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return Nc(this._rgb, t), this;
  }
}
/*!
 * Chart.js v4.4.7
 * https://www.chartjs.org
 * (c) 2024 Chart.js Contributors
 * Released under the MIT License
 */
function xe() {
}
const qc = (() => {
  let n = 0;
  return () => n++;
})();
function st(n) {
  return n == null;
}
function _t(n) {
  if (Array.isArray && Array.isArray(n))
    return !0;
  const t = Object.prototype.toString.call(n);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function tt(n) {
  return n !== null && Object.prototype.toString.call(n) === "[object Object]";
}
function Lt(n) {
  return (typeof n == "number" || n instanceof Number) && isFinite(+n);
}
function $t(n, t) {
  return Lt(n) ? n : t;
}
function q(n, t) {
  return typeof n > "u" ? t : n;
}
const $c = (n, t) => typeof n == "string" && n.endsWith("%") ? parseFloat(n) / 100 : +n / t, xl = (n, t) => typeof n == "string" && n.endsWith("%") ? parseFloat(n) / 100 * t : +n;
function pt(n, t, e) {
  if (n && typeof n.call == "function")
    return n.apply(e, t);
}
function ut(n, t, e, s) {
  let r, o, l;
  if (_t(n))
    if (o = n.length, s)
      for (r = o - 1; r >= 0; r--)
        t.call(e, n[r], r);
    else
      for (r = 0; r < o; r++)
        t.call(e, n[r], r);
  else if (tt(n))
    for (l = Object.keys(n), o = l.length, r = 0; r < o; r++)
      t.call(e, n[l[r]], l[r]);
}
function ys(n, t) {
  let e, s, r, o;
  if (!n || !t || n.length !== t.length)
    return !1;
  for (e = 0, s = n.length; e < s; ++e)
    if (r = n[e], o = t[e], r.datasetIndex !== o.datasetIndex || r.index !== o.index)
      return !1;
  return !0;
}
function bs(n) {
  if (_t(n))
    return n.map(bs);
  if (tt(n)) {
    const t = /* @__PURE__ */ Object.create(null), e = Object.keys(n), s = e.length;
    let r = 0;
    for (; r < s; ++r)
      t[e[r]] = bs(n[e[r]]);
    return t;
  }
  return n;
}
function wl(n) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(n) === -1;
}
function Xc(n, t, e, s) {
  if (!wl(n))
    return;
  const r = t[n], o = e[n];
  tt(r) && tt(o) ? un(r, o, s) : t[n] = bs(o);
}
function un(n, t, e) {
  const s = _t(t) ? t : [
    t
  ], r = s.length;
  if (!tt(n))
    return n;
  e = e || {};
  const o = e.merger || Xc;
  let l;
  for (let h = 0; h < r; ++h) {
    if (l = s[h], !tt(l))
      continue;
    const c = Object.keys(l);
    for (let d = 0, p = c.length; d < p; ++d)
      o(c[d], n, l, e);
  }
  return n;
}
function on(n, t) {
  return un(n, t, {
    merger: Kc
  });
}
function Kc(n, t, e) {
  if (!wl(n))
    return;
  const s = t[n], r = e[n];
  tt(s) && tt(r) ? on(s, r) : Object.prototype.hasOwnProperty.call(t, n) || (t[n] = bs(r));
}
const Jr = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (n) => n,
  // default resolvers
  x: (n) => n.x,
  y: (n) => n.y
};
function Jc(n) {
  const t = n.split("."), e = [];
  let s = "";
  for (const r of t)
    s += r, s.endsWith("\\") ? s = s.slice(0, -1) + "." : (e.push(s), s = "");
  return e;
}
function Qc(n) {
  const t = Jc(n);
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
  return (Jr[t] || (Jr[t] = Qc(t)))(n);
}
function Fo(n) {
  return n.charAt(0).toUpperCase() + n.slice(1);
}
const dn = (n) => typeof n < "u", He = (n) => typeof n == "function", Qr = (n, t) => {
  if (n.size !== t.size)
    return !1;
  for (const e of n)
    if (!t.has(e))
      return !1;
  return !0;
};
function tu(n) {
  return n.type === "mouseup" || n.type === "click" || n.type === "contextmenu";
}
const gt = Math.PI, mt = 2 * gt, eu = mt + gt, xs = Number.POSITIVE_INFINITY, iu = gt / 180, kt = gt / 2, Xe = gt / 4, ta = gt * 2 / 3, Be = Math.log10, me = Math.sign;
function rn(n, t, e) {
  return Math.abs(n - t) < e;
}
function ea(n) {
  const t = Math.round(n);
  n = rn(n, t, n / 1e3) ? t : n;
  const e = Math.pow(10, Math.floor(Be(n))), s = n / e;
  return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 5 ? 5 : 10) * e;
}
function nu(n) {
  const t = [], e = Math.sqrt(n);
  let s;
  for (s = 1; s < e; s++)
    n % s === 0 && (t.push(s), t.push(n / s));
  return e === (e | 0) && t.push(e), t.sort((r, o) => r - o).pop(), t;
}
function Pi(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function su(n, t) {
  const e = Math.round(n);
  return e - t <= n && e + t >= n;
}
function Ll(n, t, e) {
  let s, r, o;
  for (s = 0, r = n.length; s < r; s++)
    o = n[s][e], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function re(n) {
  return n * (gt / 180);
}
function No(n) {
  return n * (180 / gt);
}
function ia(n) {
  if (!Lt(n))
    return;
  let t = 1, e = 0;
  for (; Math.round(n * t) / t !== n; )
    t *= 10, e++;
  return e;
}
function Ml(n, t) {
  const e = t.x - n.x, s = t.y - n.y, r = Math.sqrt(e * e + s * s);
  let o = Math.atan2(s, e);
  return o < -0.5 * gt && (o += mt), {
    angle: o,
    distance: r
  };
}
function yo(n, t) {
  return Math.sqrt(Math.pow(t.x - n.x, 2) + Math.pow(t.y - n.y, 2));
}
function ou(n, t) {
  return (n - t + eu) % mt - gt;
}
function Xt(n) {
  return (n % mt + mt) % mt;
}
function fn(n, t, e, s) {
  const r = Xt(n), o = Xt(t), l = Xt(e), h = Xt(o - r), c = Xt(l - r), d = Xt(r - o), p = Xt(r - l);
  return r === o || r === l || s && o === l || h > c && d < p;
}
function Dt(n, t, e) {
  return Math.max(t, Math.min(e, n));
}
function ru(n) {
  return Dt(n, -32768, 32767);
}
function ke(n, t, e, s = 1e-6) {
  return n >= Math.min(t, e) - s && n <= Math.max(t, e) + s;
}
function Zo(n, t, e) {
  e = e || ((l) => n[l] < t);
  let s = n.length - 1, r = 0, o;
  for (; s - r > 1; )
    o = r + s >> 1, e(o) ? r = o : s = o;
  return {
    lo: r,
    hi: s
  };
}
const Se = (n, t, e, s) => Zo(n, e, s ? (r) => {
  const o = n[r][t];
  return o < e || o === e && n[r + 1][t] === e;
} : (r) => n[r][t] < e), au = (n, t, e) => Zo(n, e, (s) => n[s][t] >= e);
function lu(n, t, e) {
  let s = 0, r = n.length;
  for (; s < r && n[s] < t; )
    s++;
  for (; r > s && n[r - 1] > e; )
    r--;
  return s > 0 || r < n.length ? n.slice(s, r) : n;
}
const Pl = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function hu(n, t) {
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
  }), Pl.forEach((e) => {
    const s = "_onData" + Fo(e), r = n[e];
    Object.defineProperty(n, e, {
      configurable: !0,
      enumerable: !1,
      value(...o) {
        const l = r.apply(this, o);
        return n._chartjs.listeners.forEach((h) => {
          typeof h[s] == "function" && h[s](...o);
        }), l;
      }
    });
  });
}
function na(n, t) {
  const e = n._chartjs;
  if (!e)
    return;
  const s = e.listeners, r = s.indexOf(t);
  r !== -1 && s.splice(r, 1), !(s.length > 0) && (Pl.forEach((o) => {
    delete n[o];
  }), delete n._chartjs);
}
function kl(n) {
  const t = new Set(n);
  return t.size === n.length ? n : Array.from(t);
}
const Sl = function() {
  return typeof window > "u" ? function(n) {
    return n();
  } : window.requestAnimationFrame;
}();
function Cl(n, t) {
  let e = [], s = !1;
  return function(...r) {
    e = r, s || (s = !0, Sl.call(window, () => {
      s = !1, n.apply(t, e);
    }));
  };
}
function cu(n, t) {
  let e;
  return function(...s) {
    return t ? (clearTimeout(e), e = setTimeout(n, t, s)) : n.apply(this, s), t;
  };
}
const Ho = (n) => n === "start" ? "left" : n === "end" ? "right" : "center", Rt = (n, t, e) => n === "start" ? t : n === "end" ? e : (t + e) / 2, uu = (n, t, e, s) => n === (s ? "left" : "right") ? e : n === "center" ? (t + e) / 2 : t;
function Tl(n, t, e) {
  const s = t.length;
  let r = 0, o = s;
  if (n._sorted) {
    const { iScale: l, _parsed: h } = n, c = l.axis, { min: d, max: p, minDefined: _, maxDefined: g } = l.getUserBounds();
    _ && (r = Dt(Math.min(
      // @ts-expect-error Need to type _parsed
      Se(h, c, d).lo,
      // @ts-expect-error Need to fix types on _lookupByKey
      e ? s : Se(t, c, l.getPixelForValue(d)).lo
    ), 0, s - 1)), g ? o = Dt(Math.max(
      // @ts-expect-error Need to type _parsed
      Se(h, l.axis, p, !0).hi + 1,
      // @ts-expect-error Need to fix types on _lookupByKey
      e ? 0 : Se(t, c, l.getPixelForValue(p), !0).hi + 1
    ), r, s) - r : o = s - r;
  }
  return {
    start: r,
    count: o
  };
}
function Ol(n) {
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
const Kn = (n) => n === 0 || n === 1, sa = (n, t, e) => -(Math.pow(2, 10 * (n -= 1)) * Math.sin((n - t) * mt / e)), oa = (n, t, e) => Math.pow(2, -10 * n) * Math.sin((n - t) * mt / e) + 1, an = {
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
  easeInSine: (n) => -Math.cos(n * kt) + 1,
  easeOutSine: (n) => Math.sin(n * kt),
  easeInOutSine: (n) => -0.5 * (Math.cos(gt * n) - 1),
  easeInExpo: (n) => n === 0 ? 0 : Math.pow(2, 10 * (n - 1)),
  easeOutExpo: (n) => n === 1 ? 1 : -Math.pow(2, -10 * n) + 1,
  easeInOutExpo: (n) => Kn(n) ? n : n < 0.5 ? 0.5 * Math.pow(2, 10 * (n * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (n * 2 - 1)) + 2),
  easeInCirc: (n) => n >= 1 ? n : -(Math.sqrt(1 - n * n) - 1),
  easeOutCirc: (n) => Math.sqrt(1 - (n -= 1) * n),
  easeInOutCirc: (n) => (n /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - n * n) - 1) : 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1),
  easeInElastic: (n) => Kn(n) ? n : sa(n, 0.075, 0.3),
  easeOutElastic: (n) => Kn(n) ? n : oa(n, 0.075, 0.3),
  easeInOutElastic(n) {
    return Kn(n) ? n : n < 0.5 ? 0.5 * sa(n * 2, 0.1125, 0.45) : 0.5 + 0.5 * oa(n * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (n) => 1 - an.easeOutBounce(1 - n),
  easeOutBounce(n) {
    return n < 1 / 2.75 ? 7.5625 * n * n : n < 2 / 2.75 ? 7.5625 * (n -= 1.5 / 2.75) * n + 0.75 : n < 2.5 / 2.75 ? 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375 : 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375;
  },
  easeInOutBounce: (n) => n < 0.5 ? an.easeInBounce(n * 2) * 0.5 : an.easeOutBounce(n * 2 - 1) * 0.5 + 0.5
};
function Wo(n) {
  if (n && typeof n == "object") {
    const t = n.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function ra(n) {
  return Wo(n) ? n : new cn(n);
}
function oo(n) {
  return Wo(n) ? n : new cn(n).saturate(0.5).darken(0.1).hexString();
}
const du = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], fu = [
  "color",
  "borderColor",
  "backgroundColor"
];
function pu(n) {
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
      properties: fu
    },
    numbers: {
      type: "number",
      properties: du
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
function _u(n) {
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
const aa = /* @__PURE__ */ new Map();
function mu(n, t) {
  t = t || {};
  const e = n + JSON.stringify(t);
  let s = aa.get(e);
  return s || (s = new Intl.NumberFormat(n, t), aa.set(e, s)), s;
}
function yn(n, t, e) {
  return mu(t, e).format(n);
}
const Al = {
  values(n) {
    return _t(n) ? n : "" + n;
  },
  numeric(n, t, e) {
    if (n === 0)
      return "0";
    const s = this.chart.options.locale;
    let r, o = n;
    if (e.length > 1) {
      const d = Math.max(Math.abs(e[0].value), Math.abs(e[e.length - 1].value));
      (d < 1e-4 || d > 1e15) && (r = "scientific"), o = gu(n, e);
    }
    const l = Be(Math.abs(o)), h = isNaN(l) ? 1 : Math.max(Math.min(-1 * Math.floor(l), 20), 0), c = {
      notation: r,
      minimumFractionDigits: h,
      maximumFractionDigits: h
    };
    return Object.assign(c, this.options.ticks.format), yn(n, s, c);
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
    ].includes(s) || t > 0.8 * e.length ? Al.numeric.call(this, n, t, e) : "";
  }
};
function gu(n, t) {
  let e = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(e) >= 1 && n !== Math.floor(n) && (e = n - Math.floor(n)), e;
}
var Ss = {
  formatters: Al
};
function vu(n) {
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
      callback: Ss.formatters.values,
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
const oi = /* @__PURE__ */ Object.create(null), bo = /* @__PURE__ */ Object.create(null);
function ln(n, t) {
  if (!t)
    return n;
  const e = t.split(".");
  for (let s = 0, r = e.length; s < r; ++s) {
    const o = e[s];
    n = n[o] || (n[o] = /* @__PURE__ */ Object.create(null));
  }
  return n;
}
function ro(n, t, e) {
  return typeof t == "string" ? un(ln(n, t), e) : un(ln(n, ""), t);
}
class yu {
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
    }, this.hover = {}, this.hoverBackgroundColor = (s, r) => oo(r.backgroundColor), this.hoverBorderColor = (s, r) => oo(r.borderColor), this.hoverColor = (s, r) => oo(r.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(e);
  }
  set(t, e) {
    return ro(this, t, e);
  }
  get(t) {
    return ln(this, t);
  }
  describe(t, e) {
    return ro(bo, t, e);
  }
  override(t, e) {
    return ro(oi, t, e);
  }
  route(t, e, s, r) {
    const o = ln(this, t), l = ln(this, s), h = "_" + e;
    Object.defineProperties(o, {
      [h]: {
        value: o[e],
        writable: !0
      },
      [e]: {
        enumerable: !0,
        get() {
          const c = this[h], d = l[r];
          return tt(c) ? Object.assign({}, d, c) : q(c, d);
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
var yt = /* @__PURE__ */ new yu({
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
  pu,
  _u,
  vu
]);
function bu(n) {
  return !n || st(n.size) || st(n.family) ? null : (n.style ? n.style + " " : "") + (n.weight ? n.weight + " " : "") + n.size + "px " + n.family;
}
function ws(n, t, e, s, r) {
  let o = t[r];
  return o || (o = t[r] = n.measureText(r).width, e.push(r)), o > s && (s = o), s;
}
function xu(n, t, e, s) {
  s = s || {};
  let r = s.data = s.data || {}, o = s.garbageCollect = s.garbageCollect || [];
  s.font !== t && (r = s.data = {}, o = s.garbageCollect = [], s.font = t), n.save(), n.font = t;
  let l = 0;
  const h = e.length;
  let c, d, p, _, g;
  for (c = 0; c < h; c++)
    if (_ = e[c], _ != null && !_t(_))
      l = ws(n, r, o, l, _);
    else if (_t(_))
      for (d = 0, p = _.length; d < p; d++)
        g = _[d], g != null && !_t(g) && (l = ws(n, r, o, l, g));
  n.restore();
  const v = o.length / 2;
  if (v > e.length) {
    for (c = 0; c < v; c++)
      delete r[o[c]];
    o.splice(0, v);
  }
  return l;
}
function Ke(n, t, e) {
  const s = n.currentDevicePixelRatio, r = e !== 0 ? Math.max(e / 2, 0.5) : 0;
  return Math.round((t - r) * s) / s + r;
}
function la(n, t) {
  !t && !n || (t = t || n.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, n.width, n.height), t.restore());
}
function xo(n, t, e, s) {
  El(n, t, e, s, null);
}
function El(n, t, e, s, r) {
  let o, l, h, c, d, p, _, g;
  const v = t.pointStyle, x = t.rotation, b = t.radius;
  let M = (x || 0) * iu;
  if (v && typeof v == "object" && (o = v.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    n.save(), n.translate(e, s), n.rotate(M), n.drawImage(v, -v.width / 2, -v.height / 2, v.width, v.height), n.restore();
    return;
  }
  if (!(isNaN(b) || b <= 0)) {
    switch (n.beginPath(), v) {
      default:
        r ? n.ellipse(e, s, r / 2, b, 0, 0, mt) : n.arc(e, s, b, 0, mt), n.closePath();
        break;
      case "triangle":
        p = r ? r / 2 : b, n.moveTo(e + Math.sin(M) * p, s - Math.cos(M) * b), M += ta, n.lineTo(e + Math.sin(M) * p, s - Math.cos(M) * b), M += ta, n.lineTo(e + Math.sin(M) * p, s - Math.cos(M) * b), n.closePath();
        break;
      case "rectRounded":
        d = b * 0.516, c = b - d, l = Math.cos(M + Xe) * c, _ = Math.cos(M + Xe) * (r ? r / 2 - d : c), h = Math.sin(M + Xe) * c, g = Math.sin(M + Xe) * (r ? r / 2 - d : c), n.arc(e - _, s - h, d, M - gt, M - kt), n.arc(e + g, s - l, d, M - kt, M), n.arc(e + _, s + h, d, M, M + kt), n.arc(e - g, s + l, d, M + kt, M + gt), n.closePath();
        break;
      case "rect":
        if (!x) {
          c = Math.SQRT1_2 * b, p = r ? r / 2 : c, n.rect(e - p, s - c, 2 * p, 2 * c);
          break;
        }
        M += Xe;
      case "rectRot":
        _ = Math.cos(M) * (r ? r / 2 : b), l = Math.cos(M) * b, h = Math.sin(M) * b, g = Math.sin(M) * (r ? r / 2 : b), n.moveTo(e - _, s - h), n.lineTo(e + g, s - l), n.lineTo(e + _, s + h), n.lineTo(e - g, s + l), n.closePath();
        break;
      case "crossRot":
        M += Xe;
      case "cross":
        _ = Math.cos(M) * (r ? r / 2 : b), l = Math.cos(M) * b, h = Math.sin(M) * b, g = Math.sin(M) * (r ? r / 2 : b), n.moveTo(e - _, s - h), n.lineTo(e + _, s + h), n.moveTo(e + g, s - l), n.lineTo(e - g, s + l);
        break;
      case "star":
        _ = Math.cos(M) * (r ? r / 2 : b), l = Math.cos(M) * b, h = Math.sin(M) * b, g = Math.sin(M) * (r ? r / 2 : b), n.moveTo(e - _, s - h), n.lineTo(e + _, s + h), n.moveTo(e + g, s - l), n.lineTo(e - g, s + l), M += Xe, _ = Math.cos(M) * (r ? r / 2 : b), l = Math.cos(M) * b, h = Math.sin(M) * b, g = Math.sin(M) * (r ? r / 2 : b), n.moveTo(e - _, s - h), n.lineTo(e + _, s + h), n.moveTo(e + g, s - l), n.lineTo(e - g, s + l);
        break;
      case "line":
        l = r ? r / 2 : Math.cos(M) * b, h = Math.sin(M) * b, n.moveTo(e - l, s - h), n.lineTo(e + l, s + h);
        break;
      case "dash":
        n.moveTo(e, s), n.lineTo(e + Math.cos(M) * (r ? r / 2 : b), s + Math.sin(M) * b);
        break;
      case !1:
        n.closePath();
        break;
    }
    n.fill(), t.borderWidth > 0 && n.stroke();
  }
}
function Ce(n, t, e) {
  return e = e || 0.5, !t || n && n.x > t.left - e && n.x < t.right + e && n.y > t.top - e && n.y < t.bottom + e;
}
function Cs(n, t) {
  n.save(), n.beginPath(), n.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), n.clip();
}
function Ts(n) {
  n.restore();
}
function wu(n, t, e, s, r) {
  if (!t)
    return n.lineTo(e.x, e.y);
  if (r === "middle") {
    const o = (t.x + e.x) / 2;
    n.lineTo(o, t.y), n.lineTo(o, e.y);
  } else
    r === "after" != !!s ? n.lineTo(t.x, e.y) : n.lineTo(e.x, t.y);
  n.lineTo(e.x, e.y);
}
function Lu(n, t, e, s) {
  if (!t)
    return n.lineTo(e.x, e.y);
  n.bezierCurveTo(s ? t.cp1x : t.cp2x, s ? t.cp1y : t.cp2y, s ? e.cp2x : e.cp1x, s ? e.cp2y : e.cp1y, e.x, e.y);
}
function Mu(n, t) {
  t.translation && n.translate(t.translation[0], t.translation[1]), st(t.rotation) || n.rotate(t.rotation), t.color && (n.fillStyle = t.color), t.textAlign && (n.textAlign = t.textAlign), t.textBaseline && (n.textBaseline = t.textBaseline);
}
function Pu(n, t, e, s, r) {
  if (r.strikethrough || r.underline) {
    const o = n.measureText(s), l = t - o.actualBoundingBoxLeft, h = t + o.actualBoundingBoxRight, c = e - o.actualBoundingBoxAscent, d = e + o.actualBoundingBoxDescent, p = r.strikethrough ? (c + d) / 2 : d;
    n.strokeStyle = n.fillStyle, n.beginPath(), n.lineWidth = r.decorationWidth || 2, n.moveTo(l, p), n.lineTo(h, p), n.stroke();
  }
}
function ku(n, t) {
  const e = n.fillStyle;
  n.fillStyle = t.color, n.fillRect(t.left, t.top, t.width, t.height), n.fillStyle = e;
}
function ri(n, t, e, s, r, o = {}) {
  const l = _t(t) ? t : [
    t
  ], h = o.strokeWidth > 0 && o.strokeColor !== "";
  let c, d;
  for (n.save(), n.font = r.string, Mu(n, o), c = 0; c < l.length; ++c)
    d = l[c], o.backdrop && ku(n, o.backdrop), h && (o.strokeColor && (n.strokeStyle = o.strokeColor), st(o.strokeWidth) || (n.lineWidth = o.strokeWidth), n.strokeText(d, e, s, o.maxWidth)), n.fillText(d, e, s, o.maxWidth), Pu(n, e, s, d, o), s += Number(r.lineHeight);
  n.restore();
}
function pn(n, t) {
  const { x: e, y: s, w: r, h: o, radius: l } = t;
  n.arc(e + l.topLeft, s + l.topLeft, l.topLeft, 1.5 * gt, gt, !0), n.lineTo(e, s + o - l.bottomLeft), n.arc(e + l.bottomLeft, s + o - l.bottomLeft, l.bottomLeft, gt, kt, !0), n.lineTo(e + r - l.bottomRight, s + o), n.arc(e + r - l.bottomRight, s + o - l.bottomRight, l.bottomRight, kt, 0, !0), n.lineTo(e + r, s + l.topRight), n.arc(e + r - l.topRight, s + l.topRight, l.topRight, 0, -kt, !0), n.lineTo(e + l.topLeft, s);
}
const Su = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Cu = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Tu(n, t) {
  const e = ("" + n).match(Su);
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
const Ou = (n) => +n || 0;
function Vo(n, t) {
  const e = {}, s = tt(t), r = s ? Object.keys(t) : t, o = tt(n) ? s ? (l) => q(n[l], n[t[l]]) : (l) => n[l] : () => n;
  for (const l of r)
    e[l] = Ou(o(l));
  return e;
}
function Il(n) {
  return Vo(n, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function ni(n) {
  return Vo(n, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function Nt(n) {
  const t = Il(n);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function Ot(n, t) {
  n = n || {}, t = t || yt.font;
  let e = q(n.size, t.size);
  typeof e == "string" && (e = parseInt(e, 10));
  let s = q(n.style, t.style);
  s && !("" + s).match(Cu) && (console.warn('Invalid font style specified: "' + s + '"'), s = void 0);
  const r = {
    family: q(n.family, t.family),
    lineHeight: Tu(q(n.lineHeight, t.lineHeight), e),
    size: e,
    style: s,
    weight: q(n.weight, t.weight),
    string: ""
  };
  return r.string = bu(r), r;
}
function Qi(n, t, e, s) {
  let r = !0, o, l, h;
  for (o = 0, l = n.length; o < l; ++o)
    if (h = n[o], h !== void 0 && (t !== void 0 && typeof h == "function" && (h = h(t), r = !1), e !== void 0 && _t(h) && (h = h[e % h.length], r = !1), h !== void 0))
      return s && !r && (s.cacheable = !1), h;
}
function Au(n, t, e) {
  const { min: s, max: r } = n, o = xl(t, (r - s) / 2), l = (h, c) => e && h === 0 ? 0 : h + c;
  return {
    min: l(s, -Math.abs(o)),
    max: l(r, o)
  };
}
function We(n, t) {
  return Object.assign(Object.create(n), t);
}
function jo(n, t = [
  ""
], e, s, r = () => n[0]) {
  const o = e || n;
  typeof s > "u" && (s = Rl("_fallback", n));
  const l = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: n,
    _rootScopes: o,
    _fallback: s,
    _getTarget: r,
    override: (h) => jo([
      h,
      ...n
    ], t, o, s)
  };
  return new Proxy(l, {
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
      return zl(h, c, () => Nu(c, t, n, h));
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
      return ca(h).includes(c);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(h) {
      return ca(h);
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
function ki(n, t, e, s) {
  const r = {
    _cacheable: !1,
    _proxy: n,
    _context: t,
    _subProxy: e,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Dl(n, s),
    setContext: (o) => ki(n, o, e, s),
    override: (o) => ki(n.override(o), t, e, s)
  };
  return new Proxy(r, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(o, l) {
      return delete o[l], delete n[l], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(o, l, h) {
      return zl(o, l, () => Iu(o, l, h));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(o, l) {
      return o._descriptors.allKeys ? Reflect.has(n, l) ? {
        enumerable: !0,
        configurable: !0
      } : void 0 : Reflect.getOwnPropertyDescriptor(n, l);
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
    has(o, l) {
      return Reflect.has(n, l);
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
    set(o, l, h) {
      return n[l] = h, delete o[l], !0;
    }
  });
}
function Dl(n, t = {
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
const Eu = (n, t) => n ? n + Fo(t) : t, Uo = (n, t) => tt(t) && n !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function zl(n, t, e) {
  if (Object.prototype.hasOwnProperty.call(n, t) || t === "constructor")
    return n[t];
  const s = e();
  return n[t] = s, s;
}
function Iu(n, t, e) {
  const { _proxy: s, _context: r, _subProxy: o, _descriptors: l } = n;
  let h = s[t];
  return He(h) && l.isScriptable(t) && (h = Du(t, h, n, e)), _t(h) && h.length && (h = zu(t, h, n, l.isIndexable)), Uo(t, h) && (h = ki(h, r, o && o[t], l)), h;
}
function Du(n, t, e, s) {
  const { _proxy: r, _context: o, _subProxy: l, _stack: h } = e;
  if (h.has(n))
    throw new Error("Recursion detected: " + Array.from(h).join("->") + "->" + n);
  h.add(n);
  let c = t(o, l || s);
  return h.delete(n), Uo(n, c) && (c = Go(r._scopes, r, n, c)), c;
}
function zu(n, t, e, s) {
  const { _proxy: r, _context: o, _subProxy: l, _descriptors: h } = e;
  if (typeof o.index < "u" && s(n))
    return t[o.index % t.length];
  if (tt(t[0])) {
    const c = t, d = r._scopes.filter((p) => p !== c);
    t = [];
    for (const p of c) {
      const _ = Go(d, r, n, p);
      t.push(ki(_, o, l && l[n], h));
    }
  }
  return t;
}
function Bl(n, t, e) {
  return He(n) ? n(t, e) : n;
}
const Bu = (n, t) => n === !0 ? t : typeof n == "string" ? Ze(t, n) : void 0;
function Ru(n, t, e, s, r) {
  for (const o of t) {
    const l = Bu(e, o);
    if (l) {
      n.add(l);
      const h = Bl(l._fallback, e, r);
      if (typeof h < "u" && h !== e && h !== s)
        return h;
    } else if (l === !1 && typeof s < "u" && e !== s)
      return null;
  }
  return !1;
}
function Go(n, t, e, s) {
  const r = t._rootScopes, o = Bl(t._fallback, e, s), l = [
    ...n,
    ...r
  ], h = /* @__PURE__ */ new Set();
  h.add(s);
  let c = ha(h, l, e, o || e, s);
  return c === null || typeof o < "u" && o !== e && (c = ha(h, l, o, c, s), c === null) ? !1 : jo(Array.from(h), [
    ""
  ], r, o, () => Fu(t, e, s));
}
function ha(n, t, e, s, r) {
  for (; e; )
    e = Ru(n, t, e, s, r);
  return e;
}
function Fu(n, t, e) {
  const s = n._getTarget();
  t in s || (s[t] = {});
  const r = s[t];
  return _t(r) && tt(e) ? e : r || {};
}
function Nu(n, t, e, s) {
  let r;
  for (const o of t)
    if (r = Rl(Eu(o, n), e), typeof r < "u")
      return Uo(n, r) ? Go(e, s, n, r) : r;
}
function Rl(n, t) {
  for (const e of t) {
    if (!e)
      continue;
    const s = e[n];
    if (typeof s < "u")
      return s;
  }
}
function ca(n) {
  let t = n._keys;
  return t || (t = n._keys = Zu(n._scopes)), t;
}
function Zu(n) {
  const t = /* @__PURE__ */ new Set();
  for (const e of n)
    for (const s of Object.keys(e).filter((r) => !r.startsWith("_")))
      t.add(s);
  return Array.from(t);
}
function Fl(n, t, e, s) {
  const { iScale: r } = n, { key: o = "r" } = this._parsing, l = new Array(s);
  let h, c, d, p;
  for (h = 0, c = s; h < c; ++h)
    d = h + e, p = t[d], l[h] = {
      r: r.parse(Ze(p, o), d)
    };
  return l;
}
const Hu = Number.EPSILON || 1e-14, Si = (n, t) => t < n.length && !n[t].skip && n[t], Nl = (n) => n === "x" ? "y" : "x";
function Wu(n, t, e, s) {
  const r = n.skip ? t : n, o = t, l = e.skip ? t : e, h = yo(o, r), c = yo(l, o);
  let d = h / (h + c), p = c / (h + c);
  d = isNaN(d) ? 0 : d, p = isNaN(p) ? 0 : p;
  const _ = s * d, g = s * p;
  return {
    previous: {
      x: o.x - _ * (l.x - r.x),
      y: o.y - _ * (l.y - r.y)
    },
    next: {
      x: o.x + g * (l.x - r.x),
      y: o.y + g * (l.y - r.y)
    }
  };
}
function Vu(n, t, e) {
  const s = n.length;
  let r, o, l, h, c, d = Si(n, 0);
  for (let p = 0; p < s - 1; ++p)
    if (c = d, d = Si(n, p + 1), !(!c || !d)) {
      if (rn(t[p], 0, Hu)) {
        e[p] = e[p + 1] = 0;
        continue;
      }
      r = e[p] / t[p], o = e[p + 1] / t[p], h = Math.pow(r, 2) + Math.pow(o, 2), !(h <= 9) && (l = 3 / Math.sqrt(h), e[p] = r * l * t[p], e[p + 1] = o * l * t[p]);
    }
}
function ju(n, t, e = "x") {
  const s = Nl(e), r = n.length;
  let o, l, h, c = Si(n, 0);
  for (let d = 0; d < r; ++d) {
    if (l = h, h = c, c = Si(n, d + 1), !h)
      continue;
    const p = h[e], _ = h[s];
    l && (o = (p - l[e]) / 3, h[`cp1${e}`] = p - o, h[`cp1${s}`] = _ - o * t[d]), c && (o = (c[e] - p) / 3, h[`cp2${e}`] = p + o, h[`cp2${s}`] = _ + o * t[d]);
  }
}
function Uu(n, t = "x") {
  const e = Nl(t), s = n.length, r = Array(s).fill(0), o = Array(s);
  let l, h, c, d = Si(n, 0);
  for (l = 0; l < s; ++l)
    if (h = c, c = d, d = Si(n, l + 1), !!c) {
      if (d) {
        const p = d[t] - c[t];
        r[l] = p !== 0 ? (d[e] - c[e]) / p : 0;
      }
      o[l] = h ? d ? me(r[l - 1]) !== me(r[l]) ? 0 : (r[l - 1] + r[l]) / 2 : r[l - 1] : r[l];
    }
  Vu(n, r, o), ju(n, o, t);
}
function Jn(n, t, e) {
  return Math.max(Math.min(n, e), t);
}
function Gu(n, t) {
  let e, s, r, o, l, h = Ce(n[0], t);
  for (e = 0, s = n.length; e < s; ++e)
    l = o, o = h, h = e < s - 1 && Ce(n[e + 1], t), o && (r = n[e], l && (r.cp1x = Jn(r.cp1x, t.left, t.right), r.cp1y = Jn(r.cp1y, t.top, t.bottom)), h && (r.cp2x = Jn(r.cp2x, t.left, t.right), r.cp2y = Jn(r.cp2y, t.top, t.bottom)));
}
function Yu(n, t, e, s, r) {
  let o, l, h, c;
  if (t.spanGaps && (n = n.filter((d) => !d.skip)), t.cubicInterpolationMode === "monotone")
    Uu(n, r);
  else {
    let d = s ? n[n.length - 1] : n[0];
    for (o = 0, l = n.length; o < l; ++o)
      h = n[o], c = Wu(d, h, n[Math.min(o + 1, l - (s ? 0 : 1)) % l], t.tension), h.cp1x = c.previous.x, h.cp1y = c.previous.y, h.cp2x = c.next.x, h.cp2y = c.next.y, d = h;
  }
  t.capBezierPoints && Gu(n, e);
}
function Yo() {
  return typeof window < "u" && typeof document < "u";
}
function qo(n) {
  let t = n.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function Ls(n, t, e) {
  let s;
  return typeof n == "string" ? (s = parseInt(n, 10), n.indexOf("%") !== -1 && (s = s / 100 * t.parentNode[e])) : s = n, s;
}
const Os = (n) => n.ownerDocument.defaultView.getComputedStyle(n, null);
function qu(n, t) {
  return Os(n).getPropertyValue(t);
}
const $u = [
  "top",
  "right",
  "bottom",
  "left"
];
function si(n, t, e) {
  const s = {};
  e = e ? "-" + e : "";
  for (let r = 0; r < 4; r++) {
    const o = $u[r];
    s[o] = parseFloat(n[t + "-" + o + e]) || 0;
  }
  return s.width = s.left + s.right, s.height = s.top + s.bottom, s;
}
const Xu = (n, t, e) => (n > 0 || t > 0) && (!e || !e.shadowRoot);
function Ku(n, t) {
  const e = n.touches, s = e && e.length ? e[0] : n, { offsetX: r, offsetY: o } = s;
  let l = !1, h, c;
  if (Xu(r, o, n.target))
    h = r, c = o;
  else {
    const d = t.getBoundingClientRect();
    h = s.clientX - d.left, c = s.clientY - d.top, l = !0;
  }
  return {
    x: h,
    y: c,
    box: l
  };
}
function ti(n, t) {
  if ("native" in n)
    return n;
  const { canvas: e, currentDevicePixelRatio: s } = t, r = Os(e), o = r.boxSizing === "border-box", l = si(r, "padding"), h = si(r, "border", "width"), { x: c, y: d, box: p } = Ku(n, e), _ = l.left + (p && h.left), g = l.top + (p && h.top);
  let { width: v, height: x } = t;
  return o && (v -= l.width + h.width, x -= l.height + h.height), {
    x: Math.round((c - _) / v * e.width / s),
    y: Math.round((d - g) / x * e.height / s)
  };
}
function Ju(n, t, e) {
  let s, r;
  if (t === void 0 || e === void 0) {
    const o = n && qo(n);
    if (!o)
      t = n.clientWidth, e = n.clientHeight;
    else {
      const l = o.getBoundingClientRect(), h = Os(o), c = si(h, "border", "width"), d = si(h, "padding");
      t = l.width - d.width - c.width, e = l.height - d.height - c.height, s = Ls(h.maxWidth, o, "clientWidth"), r = Ls(h.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: e,
    maxWidth: s || xs,
    maxHeight: r || xs
  };
}
const Qn = (n) => Math.round(n * 10) / 10;
function Qu(n, t, e, s) {
  const r = Os(n), o = si(r, "margin"), l = Ls(r.maxWidth, n, "clientWidth") || xs, h = Ls(r.maxHeight, n, "clientHeight") || xs, c = Ju(n, t, e);
  let { width: d, height: p } = c;
  if (r.boxSizing === "content-box") {
    const g = si(r, "border", "width"), v = si(r, "padding");
    d -= v.width + g.width, p -= v.height + g.height;
  }
  return d = Math.max(0, d - o.width), p = Math.max(0, s ? d / s : p - o.height), d = Qn(Math.min(d, l, c.maxWidth)), p = Qn(Math.min(p, h, c.maxHeight)), d && !p && (p = Qn(d / 2)), (t !== void 0 || e !== void 0) && s && c.height && p > c.height && (p = c.height, d = Qn(Math.floor(p * s))), {
    width: d,
    height: p
  };
}
function ua(n, t, e) {
  const s = t || 1, r = Math.floor(n.height * s), o = Math.floor(n.width * s);
  n.height = Math.floor(n.height), n.width = Math.floor(n.width);
  const l = n.canvas;
  return l.style && (e || !l.style.height && !l.style.width) && (l.style.height = `${n.height}px`, l.style.width = `${n.width}px`), n.currentDevicePixelRatio !== s || l.height !== r || l.width !== o ? (n.currentDevicePixelRatio = s, l.height = r, l.width = o, n.ctx.setTransform(s, 0, 0, s, 0, 0), !0) : !1;
}
const td = function() {
  let n = !1;
  try {
    const t = {
      get passive() {
        return n = !0, !1;
      }
    };
    Yo() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return n;
}();
function da(n, t) {
  const e = qu(n, t), s = e && e.match(/^(\d+)(\.\d+)?px$/);
  return s ? +s[1] : void 0;
}
function ei(n, t, e, s) {
  return {
    x: n.x + e * (t.x - n.x),
    y: n.y + e * (t.y - n.y)
  };
}
function ed(n, t, e, s) {
  return {
    x: n.x + e * (t.x - n.x),
    y: s === "middle" ? e < 0.5 ? n.y : t.y : s === "after" ? e < 1 ? n.y : t.y : e > 0 ? t.y : n.y
  };
}
function id(n, t, e, s) {
  const r = {
    x: n.cp2x,
    y: n.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, l = ei(n, r, e), h = ei(r, o, e), c = ei(o, t, e), d = ei(l, h, e), p = ei(h, c, e);
  return ei(d, p, e);
}
const nd = function(n, t) {
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
}, sd = function() {
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
function Mi(n, t, e) {
  return n ? nd(t, e) : sd();
}
function Zl(n, t) {
  let e, s;
  (t === "ltr" || t === "rtl") && (e = n.canvas.style, s = [
    e.getPropertyValue("direction"),
    e.getPropertyPriority("direction")
  ], e.setProperty("direction", t, "important"), n.prevTextDirection = s);
}
function Hl(n, t) {
  t !== void 0 && (delete n.prevTextDirection, n.canvas.style.setProperty("direction", t[0], t[1]));
}
function Wl(n) {
  return n === "angle" ? {
    between: fn,
    compare: ou,
    normalize: Xt
  } : {
    between: ke,
    compare: (t, e) => t - e,
    normalize: (t) => t
  };
}
function fa({ start: n, end: t, count: e, loop: s, style: r }) {
  return {
    start: n % e,
    end: t % e,
    loop: s && (t - n + 1) % e === 0,
    style: r
  };
}
function od(n, t, e) {
  const { property: s, start: r, end: o } = e, { between: l, normalize: h } = Wl(s), c = t.length;
  let { start: d, end: p, loop: _ } = n, g, v;
  if (_) {
    for (d += c, p += c, g = 0, v = c; g < v && l(h(t[d % c][s]), r, o); ++g)
      d--, p--;
    d %= c, p %= c;
  }
  return p < d && (p += c), {
    start: d,
    end: p,
    loop: _,
    style: n.style
  };
}
function Vl(n, t, e) {
  if (!e)
    return [
      n
    ];
  const { property: s, start: r, end: o } = e, l = t.length, { compare: h, between: c, normalize: d } = Wl(s), { start: p, end: _, loop: g, style: v } = od(n, t, e), x = [];
  let b = !1, M = null, P, S, O;
  const A = () => c(r, O, P) && h(r, O) !== 0, T = () => h(o, P) === 0 || c(o, O, P), I = () => b || A(), D = () => !b || T();
  for (let B = p, N = p; B <= _; ++B)
    S = t[B % l], !S.skip && (P = d(S[s]), P !== O && (b = c(P, r, o), M === null && I() && (M = h(P, r) === 0 ? B : N), M !== null && D() && (x.push(fa({
      start: M,
      end: B,
      loop: g,
      count: l,
      style: v
    })), M = null), N = B, O = P));
  return M !== null && x.push(fa({
    start: M,
    end: _,
    loop: g,
    count: l,
    style: v
  })), x;
}
function jl(n, t) {
  const e = [], s = n.segments;
  for (let r = 0; r < s.length; r++) {
    const o = Vl(s[r], n.points, t);
    o.length && e.push(...o);
  }
  return e;
}
function rd(n, t, e, s) {
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
function ad(n, t, e, s) {
  const r = n.length, o = [];
  let l = t, h = n[t], c;
  for (c = t + 1; c <= e; ++c) {
    const d = n[c % r];
    d.skip || d.stop ? h.skip || (s = !1, o.push({
      start: t % r,
      end: (c - 1) % r,
      loop: s
    }), t = l = d.stop ? c : null) : (l = c, h.skip && (t = c)), h = d;
  }
  return l !== null && o.push({
    start: t % r,
    end: l % r,
    loop: s
  }), o;
}
function ld(n, t) {
  const e = n.points, s = n.options.spanGaps, r = e.length;
  if (!r)
    return [];
  const o = !!n._loop, { start: l, end: h } = rd(e, r, o, s);
  if (s === !0)
    return pa(n, [
      {
        start: l,
        end: h,
        loop: o
      }
    ], e, t);
  const c = h < l ? h + r : h, d = !!n._fullLoop && l === 0 && h === r - 1;
  return pa(n, ad(e, l, c, d), e, t);
}
function pa(n, t, e, s) {
  return !s || !s.setContext || !e ? t : hd(n, t, e, s);
}
function hd(n, t, e, s) {
  const r = n._chart.getContext(), o = _a(n.options), { _datasetIndex: l, options: { spanGaps: h } } = n, c = e.length, d = [];
  let p = o, _ = t[0].start, g = _;
  function v(x, b, M, P) {
    const S = h ? -1 : 1;
    if (x !== b) {
      for (x += c; e[x % c].skip; )
        x -= S;
      for (; e[b % c].skip; )
        b += S;
      x % c !== b % c && (d.push({
        start: x % c,
        end: b % c,
        loop: M,
        style: P
      }), p = P, _ = b % c);
    }
  }
  for (const x of t) {
    _ = h ? _ : x.start;
    let b = e[_ % c], M;
    for (g = _ + 1; g <= x.end; g++) {
      const P = e[g % c];
      M = _a(s.setContext(We(r, {
        type: "segment",
        p0: b,
        p1: P,
        p0DataIndex: (g - 1) % c,
        p1DataIndex: g % c,
        datasetIndex: l
      }))), cd(M, p) && v(_, g - 1, x.loop, p), b = P, p = M;
    }
    _ < g - 1 && v(_, g - 1, x.loop, p);
  }
  return d;
}
function _a(n) {
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
function cd(n, t) {
  if (!t)
    return !1;
  const e = [], s = function(r, o) {
    return Wo(o) ? (e.includes(o) || e.push(o), e.indexOf(o)) : o;
  };
  return JSON.stringify(n, s) !== JSON.stringify(t, s);
}
/*!
 * Chart.js v4.4.7
 * https://www.chartjs.org
 * (c) 2024 Chart.js Contributors
 * Released under the MIT License
 */
class ud {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, e, s, r) {
    const o = e.listeners[r], l = e.duration;
    o.forEach((h) => h({
      chart: t,
      initial: e.initial,
      numSteps: l,
      currentStep: Math.min(s - e.start, l)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = Sl.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let e = 0;
    this._charts.forEach((s, r) => {
      if (!s.running || !s.items.length)
        return;
      const o = s.items;
      let l = o.length - 1, h = !1, c;
      for (; l >= 0; --l)
        c = o[l], c._active ? (c._total > s.duration && (s.duration = c._total), c.tick(t), h = !0) : (o[l] = o[o.length - 1], o.pop());
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
var we = /* @__PURE__ */ new ud();
const ma = "transparent", dd = {
  boolean(n, t, e) {
    return e > 0.5 ? t : n;
  },
  color(n, t, e) {
    const s = ra(n || ma), r = s.valid && ra(t || ma);
    return r && r.valid ? r.mix(s, e).hexString() : t;
  },
  number(n, t, e) {
    return n + (t - n) * e;
  }
};
class fd {
  constructor(t, e, s, r) {
    const o = e[s];
    r = Qi([
      t.to,
      r,
      o,
      t.from
    ]);
    const l = Qi([
      t.from,
      o,
      r
    ]);
    this._active = !0, this._fn = t.fn || dd[t.type || typeof l], this._easing = an[t.easing] || an.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = e, this._prop = s, this._from = l, this._to = r, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, e, s) {
    if (this._active) {
      this._notify(!1);
      const r = this._target[this._prop], o = s - this._start, l = this._duration - o;
      this._start = s, this._duration = Math.floor(Math.max(l, t.duration)), this._total += o, this._loop = !!t.loop, this._to = Qi([
        t.to,
        e,
        r,
        t.from
      ]), this._from = Qi([
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
    const e = t - this._start, s = this._duration, r = this._prop, o = this._from, l = this._loop, h = this._to;
    let c;
    if (this._active = o !== h && (l || e < s), !this._active) {
      this._target[r] = h, this._notify(!0);
      return;
    }
    if (e < 0) {
      this._target[r] = o;
      return;
    }
    c = e / s % 2, c = l && c > 1 ? 2 - c : c, c = this._easing(Math.min(1, Math.max(0, c))), this._target[r] = this._fn(o, h, c);
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
class Ul {
  constructor(t, e) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(e);
  }
  configure(t) {
    if (!tt(t))
      return;
    const e = Object.keys(yt.animation), s = this._properties;
    Object.getOwnPropertyNames(t).forEach((r) => {
      const o = t[r];
      if (!tt(o))
        return;
      const l = {};
      for (const h of e)
        l[h] = o[h];
      (_t(o.properties) && o.properties || [
        r
      ]).forEach((h) => {
        (h === r || !s.has(h)) && s.set(h, l);
      });
    });
  }
  _animateOptions(t, e) {
    const s = e.options, r = _d(t, s);
    if (!r)
      return [];
    const o = this._createAnimations(r, s);
    return s.$shared && pd(t.options.$animations, s).then(() => {
      t.options = s;
    }, () => {
    }), o;
  }
  _createAnimations(t, e) {
    const s = this._properties, r = [], o = t.$animations || (t.$animations = {}), l = Object.keys(e), h = Date.now();
    let c;
    for (c = l.length - 1; c >= 0; --c) {
      const d = l[c];
      if (d.charAt(0) === "$")
        continue;
      if (d === "options") {
        r.push(...this._animateOptions(t, e));
        continue;
      }
      const p = e[d];
      let _ = o[d];
      const g = s.get(d);
      if (_)
        if (g && _.active()) {
          _.update(g, p, h);
          continue;
        } else
          _.cancel();
      if (!g || !g.duration) {
        t[d] = p;
        continue;
      }
      o[d] = _ = new fd(g, t, d, p), r.push(_);
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
      return we.add(this._chart, s), !0;
  }
}
function pd(n, t) {
  const e = [], s = Object.keys(t);
  for (let r = 0; r < s.length; r++) {
    const o = n[s[r]];
    o && o.active() && e.push(o.wait());
  }
  return Promise.all(e);
}
function _d(n, t) {
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
function ga(n, t) {
  const e = n && n.options || {}, s = e.reverse, r = e.min === void 0 ? t : 0, o = e.max === void 0 ? t : 0;
  return {
    start: s ? o : r,
    end: s ? r : o
  };
}
function md(n, t, e) {
  if (e === !1)
    return !1;
  const s = ga(n, e), r = ga(t, e);
  return {
    top: r.end,
    right: s.end,
    bottom: r.start,
    left: s.start
  };
}
function gd(n) {
  let t, e, s, r;
  return tt(n) ? (t = n.top, e = n.right, s = n.bottom, r = n.left) : t = e = s = r = n, {
    top: t,
    right: e,
    bottom: s,
    left: r,
    disabled: n === !1
  };
}
function Gl(n, t) {
  const e = [], s = n._getSortedDatasetMetas(t);
  let r, o;
  for (r = 0, o = s.length; r < o; ++r)
    e.push(s[r].index);
  return e;
}
function va(n, t, e, s = {}) {
  const r = n.keys, o = s.mode === "single";
  let l, h, c, d;
  if (t === null)
    return;
  let p = !1;
  for (l = 0, h = r.length; l < h; ++l) {
    if (c = +r[l], c === e) {
      if (p = !0, s.all)
        continue;
      break;
    }
    d = n.values[c], Lt(d) && (o || t === 0 || me(t) === me(d)) && (t += d);
  }
  return !p && !s.all ? 0 : t;
}
function vd(n, t) {
  const { iScale: e, vScale: s } = t, r = e.axis === "x" ? "x" : "y", o = s.axis === "x" ? "x" : "y", l = Object.keys(n), h = new Array(l.length);
  let c, d, p;
  for (c = 0, d = l.length; c < d; ++c)
    p = l[c], h[c] = {
      [r]: p,
      [o]: n[p]
    };
  return h;
}
function ao(n, t) {
  const e = n && n.options.stacked;
  return e || e === void 0 && t.stack !== void 0;
}
function yd(n, t, e) {
  return `${n.id}.${t.id}.${e.stack || e.type}`;
}
function bd(n) {
  const { min: t, max: e, minDefined: s, maxDefined: r } = n.getUserBounds();
  return {
    min: s ? t : Number.NEGATIVE_INFINITY,
    max: r ? e : Number.POSITIVE_INFINITY
  };
}
function xd(n, t, e) {
  const s = n[t] || (n[t] = {});
  return s[e] || (s[e] = {});
}
function ya(n, t, e, s) {
  for (const r of t.getMatchingVisibleMetas(s).reverse()) {
    const o = n[r.index];
    if (e && o > 0 || !e && o < 0)
      return r.index;
  }
  return null;
}
function ba(n, t) {
  const { chart: e, _cachedMeta: s } = n, r = e._stacks || (e._stacks = {}), { iScale: o, vScale: l, index: h } = s, c = o.axis, d = l.axis, p = yd(o, l, s), _ = t.length;
  let g;
  for (let v = 0; v < _; ++v) {
    const x = t[v], { [c]: b, [d]: M } = x, P = x._stacks || (x._stacks = {});
    g = P[d] = xd(r, p, b), g[h] = M, g._top = ya(g, l, !0, s.type), g._bottom = ya(g, l, !1, s.type);
    const S = g._visualValues || (g._visualValues = {});
    S[h] = M;
  }
}
function lo(n, t) {
  const e = n.scales;
  return Object.keys(e).filter((s) => e[s].axis === t).shift();
}
function wd(n, t) {
  return We(n, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function Ld(n, t, e) {
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
function Yi(n, t) {
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
const ho = (n) => n === "reset" || n === "none", xa = (n, t) => t ? n : Object.assign({}, n), Md = (n, t, e) => n && !t.hidden && t._stacked && {
  keys: Gl(e, !0),
  values: null
};
class ae {
  constructor(t, e) {
    this.chart = t, this._ctx = t.ctx, this.index = e, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = ao(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && Yi(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, e = this._cachedMeta, s = this.getDataset(), r = (_, g, v, x) => _ === "x" ? g : _ === "r" ? x : v, o = e.xAxisID = q(s.xAxisID, lo(t, "x")), l = e.yAxisID = q(s.yAxisID, lo(t, "y")), h = e.rAxisID = q(s.rAxisID, lo(t, "r")), c = e.indexAxis, d = e.iAxisID = r(c, o, l, h), p = e.vAxisID = r(c, l, o, h);
    e.xScale = this.getScaleForId(o), e.yScale = this.getScaleForId(l), e.rScale = this.getScaleForId(h), e.iScale = this.getScaleForId(d), e.vScale = this.getScaleForId(p);
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
    this._data && na(this._data, this), t._stacked && Yi(t);
  }
  _dataCheck() {
    const t = this.getDataset(), e = t.data || (t.data = []), s = this._data;
    if (tt(e)) {
      const r = this._cachedMeta;
      this._data = vd(e, r);
    } else if (s !== e) {
      if (s) {
        na(s, this);
        const r = this._cachedMeta;
        Yi(r), r._parsed = [];
      }
      e && Object.isExtensible(e) && hu(e, this), this._syncList = [], this._data = e;
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
    e._stacked = ao(e.vScale, e), e.stack !== s.stack && (r = !0, Yi(e), e.stack = s.stack), this._resyncElements(t), (r || o !== e._stacked) && (ba(this, e._parsed), e._stacked = ao(e.vScale, e));
  }
  configure() {
    const t = this.chart.config, e = t.datasetScopeKeys(this._type), s = t.getOptionScopes(this.getDataset(), e, !0);
    this.options = t.createResolver(s, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, e) {
    const { _cachedMeta: s, _data: r } = this, { iScale: o, _stacked: l } = s, h = o.axis;
    let c = t === 0 && e === r.length ? !0 : s._sorted, d = t > 0 && s._parsed[t - 1], p, _, g;
    if (this._parsing === !1)
      s._parsed = r, s._sorted = !0, g = r;
    else {
      _t(r[t]) ? g = this.parseArrayData(s, r, t, e) : tt(r[t]) ? g = this.parseObjectData(s, r, t, e) : g = this.parsePrimitiveData(s, r, t, e);
      const v = () => _[h] === null || d && _[h] < d[h];
      for (p = 0; p < e; ++p)
        s._parsed[p + t] = _ = g[p], c && (v() && (c = !1), d = _);
      s._sorted = c;
    }
    l && ba(this, g);
  }
  parsePrimitiveData(t, e, s, r) {
    const { iScale: o, vScale: l } = t, h = o.axis, c = l.axis, d = o.getLabels(), p = o === l, _ = new Array(r);
    let g, v, x;
    for (g = 0, v = r; g < v; ++g)
      x = g + s, _[g] = {
        [h]: p || o.parse(d[x], x),
        [c]: l.parse(e[x], x)
      };
    return _;
  }
  parseArrayData(t, e, s, r) {
    const { xScale: o, yScale: l } = t, h = new Array(r);
    let c, d, p, _;
    for (c = 0, d = r; c < d; ++c)
      p = c + s, _ = e[p], h[c] = {
        x: o.parse(_[0], p),
        y: l.parse(_[1], p)
      };
    return h;
  }
  parseObjectData(t, e, s, r) {
    const { xScale: o, yScale: l } = t, { xAxisKey: h = "x", yAxisKey: c = "y" } = this._parsing, d = new Array(r);
    let p, _, g, v;
    for (p = 0, _ = r; p < _; ++p)
      g = p + s, v = e[g], d[p] = {
        x: o.parse(Ze(v, h), g),
        y: l.parse(Ze(v, c), g)
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
    const r = this.chart, o = this._cachedMeta, l = e[t.axis], h = {
      keys: Gl(r, !0),
      values: e._stacks[t.axis]._visualValues
    };
    return va(h, l, o.index, {
      mode: s
    });
  }
  updateRangeFromParsed(t, e, s, r) {
    const o = s[e.axis];
    let l = o === null ? NaN : o;
    const h = r && s._stacks[e.axis];
    r && h && (r.values = h, l = va(r, o, this._cachedMeta.index)), t.min = Math.min(t.min, l), t.max = Math.max(t.max, l);
  }
  getMinMax(t, e) {
    const s = this._cachedMeta, r = s._parsed, o = s._sorted && t === s.iScale, l = r.length, h = this._getOtherScale(t), c = Md(e, s, this.chart), d = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: p, max: _ } = bd(h);
    let g, v;
    function x() {
      v = r[g];
      const b = v[h.axis];
      return !Lt(v[t.axis]) || p > b || _ < b;
    }
    for (g = 0; g < l && !(!x() && (this.updateRangeFromParsed(d, t, v, c), o)); ++g)
      ;
    if (o) {
      for (g = l - 1; g >= 0; --g)
        if (!x()) {
          this.updateRangeFromParsed(d, t, v, c);
          break;
        }
    }
    return d;
  }
  getAllParsedValues(t) {
    const e = this._cachedMeta._parsed, s = [];
    let r, o, l;
    for (r = 0, o = e.length; r < o; ++r)
      l = e[r][t.axis], Lt(l) && s.push(l);
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
    this.update(t || "default"), e._clip = gd(q(this.options.clip, md(e.xScale, e.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, e = this.chart, s = this._cachedMeta, r = s.data || [], o = e.chartArea, l = [], h = this._drawStart || 0, c = this._drawCount || r.length - h, d = this.options.drawActiveElementsOnTop;
    let p;
    for (s.dataset && s.dataset.draw(t, o, h, c), p = h; p < h + c; ++p) {
      const _ = r[p];
      _.hidden || (_.active && d ? l.push(_) : _.draw(t, o));
    }
    for (p = 0; p < l.length; ++p)
      l[p].draw(t, o);
  }
  getStyle(t, e) {
    const s = e ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(s) : this.resolveDataElementOptions(t || 0, s);
  }
  getContext(t, e, s) {
    const r = this.getDataset();
    let o;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const l = this._cachedMeta.data[t];
      o = l.$context || (l.$context = Ld(this.getContext(), t, l)), o.parsed = this.getParsed(t), o.raw = r.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = wd(this.chart.getContext(), this.index)), o.dataset = r, o.index = o.datasetIndex = this.index;
    return o.active = !!e, o.mode = s, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, e) {
    return this._resolveElementOptions(this.dataElementType.id, e, t);
  }
  _resolveElementOptions(t, e = "default", s) {
    const r = e === "active", o = this._cachedDataOpts, l = t + "-" + e, h = o[l], c = this.enableOptionSharing && dn(s);
    if (h)
      return xa(h, c);
    const d = this.chart.config, p = d.datasetElementScopeKeys(this._type, t), _ = r ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], g = d.getOptionScopes(this.getDataset(), p), v = Object.keys(yt.elements[t]), x = () => this.getContext(s, r, e), b = d.resolveNamedOptions(g, v, x, _);
    return b.$shared && (b.$shared = c, o[l] = Object.freeze(xa(b, c))), b;
  }
  _resolveAnimations(t, e, s) {
    const r = this.chart, o = this._cachedDataOpts, l = `animation-${e}`, h = o[l];
    if (h)
      return h;
    let c;
    if (r.options.animation !== !1) {
      const p = this.chart.config, _ = p.datasetAnimationScopeKeys(this._type, e), g = p.getOptionScopes(this.getDataset(), _);
      c = p.createResolver(g, this.getContext(t, s, e));
    }
    const d = new Ul(r, c && c.animations);
    return c && c._cacheable && (o[l] = Object.freeze(d)), d;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, e) {
    return !e || ho(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, e) {
    const s = this.resolveDataElementOptions(t, e), r = this._sharedOptions, o = this.getSharedOptions(s), l = this.includeOptions(e, o) || o !== r;
    return this.updateSharedOptions(o, e, s), {
      sharedOptions: o,
      includeOptions: l
    };
  }
  updateElement(t, e, s, r) {
    ho(r) ? Object.assign(t, s) : this._resolveAnimations(e, r).update(t, s);
  }
  updateSharedOptions(t, e, s) {
    t && !ho(e) && this._resolveAnimations(void 0, e).update(t, s);
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
    const r = s.length, o = e.length, l = Math.min(o, r);
    l && this.parse(0, l), o > r ? this._insertElements(r, o - r, t) : o < r && this._removeElements(o, r - o);
  }
  _insertElements(t, e, s = !0) {
    const r = this._cachedMeta, o = r.data, l = t + e;
    let h;
    const c = (d) => {
      for (d.length += e, h = d.length - 1; h >= l; h--)
        d[h] = d[h - e];
    };
    for (c(o), h = t; h < l; ++h)
      o[h] = new this.dataElementType();
    this._parsing && c(r._parsed), this.parse(t, e), s && this.updateElements(o, t, e, "reset");
  }
  updateElements(t, e, s, r) {
  }
  _removeElements(t, e) {
    const s = this._cachedMeta;
    if (this._parsing) {
      const r = s._parsed.splice(t, e);
      s._stacked && Yi(s, r);
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
z(ae, "defaults", {}), z(ae, "datasetElementType", null), z(ae, "dataElementType", null);
function Pd(n, t) {
  if (!n._cache.$bar) {
    const e = n.getMatchingVisibleMetas(t);
    let s = [];
    for (let r = 0, o = e.length; r < o; r++)
      s = s.concat(e[r].controller.getAllParsedValues(n));
    n._cache.$bar = kl(s.sort((r, o) => r - o));
  }
  return n._cache.$bar;
}
function kd(n) {
  const t = n.iScale, e = Pd(t, n.type);
  let s = t._length, r, o, l, h;
  const c = () => {
    l === 32767 || l === -32768 || (dn(h) && (s = Math.min(s, Math.abs(l - h) || s)), h = l);
  };
  for (r = 0, o = e.length; r < o; ++r)
    l = t.getPixelForValue(e[r]), c();
  for (h = void 0, r = 0, o = t.ticks.length; r < o; ++r)
    l = t.getPixelForTick(r), c();
  return s;
}
function Sd(n, t, e, s) {
  const r = e.barThickness;
  let o, l;
  return st(r) ? (o = t.min * e.categoryPercentage, l = e.barPercentage) : (o = r * s, l = 1), {
    chunk: o / s,
    ratio: l,
    start: t.pixels[n] - o / 2
  };
}
function Cd(n, t, e, s) {
  const r = t.pixels, o = r[n];
  let l = n > 0 ? r[n - 1] : null, h = n < r.length - 1 ? r[n + 1] : null;
  const c = e.categoryPercentage;
  l === null && (l = o - (h === null ? t.end - t.start : h - o)), h === null && (h = o + o - l);
  const d = o - (o - Math.min(l, h)) / 2 * c;
  return {
    chunk: Math.abs(h - l) / 2 * c / s,
    ratio: e.barPercentage,
    start: d
  };
}
function Td(n, t, e, s) {
  const r = e.parse(n[0], s), o = e.parse(n[1], s), l = Math.min(r, o), h = Math.max(r, o);
  let c = l, d = h;
  Math.abs(l) > Math.abs(h) && (c = h, d = l), t[e.axis] = d, t._custom = {
    barStart: c,
    barEnd: d,
    start: r,
    end: o,
    min: l,
    max: h
  };
}
function Yl(n, t, e, s) {
  return _t(n) ? Td(n, t, e, s) : t[e.axis] = e.parse(n, s), t;
}
function wa(n, t, e, s) {
  const r = n.iScale, o = n.vScale, l = r.getLabels(), h = r === o, c = [];
  let d, p, _, g;
  for (d = e, p = e + s; d < p; ++d)
    g = t[d], _ = {}, _[r.axis] = h || r.parse(l[d], d), c.push(Yl(g, _, o, d));
  return c;
}
function co(n) {
  return n && n.barStart !== void 0 && n.barEnd !== void 0;
}
function Od(n, t, e) {
  return n !== 0 ? me(n) : (t.isHorizontal() ? 1 : -1) * (t.min >= e ? 1 : -1);
}
function Ad(n) {
  let t, e, s, r, o;
  return n.horizontal ? (t = n.base > n.x, e = "left", s = "right") : (t = n.base < n.y, e = "bottom", s = "top"), t ? (r = "end", o = "start") : (r = "start", o = "end"), {
    start: e,
    end: s,
    reverse: t,
    top: r,
    bottom: o
  };
}
function Ed(n, t, e, s) {
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
  const { start: l, end: h, reverse: c, top: d, bottom: p } = Ad(n);
  r === "middle" && e && (n.enableBorderRadius = !0, (e._top || 0) === s ? r = d : (e._bottom || 0) === s ? r = p : (o[La(p, l, h, c)] = !0, r = d)), o[La(r, l, h, c)] = !0, n.borderSkipped = o;
}
function La(n, t, e, s) {
  return s ? (n = Id(n, t, e), n = Ma(n, e, t)) : n = Ma(n, t, e), n;
}
function Id(n, t, e) {
  return n === t ? e : n === e ? t : n;
}
function Ma(n, t, e) {
  return n === "start" ? t : n === "end" ? e : n;
}
function Dd(n, { inflateAmount: t }, e) {
  n.inflateAmount = t === "auto" ? e === 1 ? 0.33 : 0 : t;
}
class cs extends ae {
  parsePrimitiveData(t, e, s, r) {
    return wa(t, e, s, r);
  }
  parseArrayData(t, e, s, r) {
    return wa(t, e, s, r);
  }
  parseObjectData(t, e, s, r) {
    const { iScale: o, vScale: l } = t, { xAxisKey: h = "x", yAxisKey: c = "y" } = this._parsing, d = o.axis === "x" ? h : c, p = l.axis === "x" ? h : c, _ = [];
    let g, v, x, b;
    for (g = s, v = s + r; g < v; ++g)
      b = e[g], x = {}, x[o.axis] = o.parse(Ze(b, d), g), _.push(Yl(Ze(b, p), x, l, g));
    return _;
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
    const e = this._cachedMeta, { iScale: s, vScale: r } = e, o = this.getParsed(t), l = o._custom, h = co(l) ? "[" + l.start + ", " + l.end + "]" : "" + r.getLabelForValue(o[r.axis]);
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
    const o = r === "reset", { index: l, _cachedMeta: { vScale: h } } = this, c = h.getBasePixel(), d = h.isHorizontal(), p = this._getRuler(), { sharedOptions: _, includeOptions: g } = this._getSharedOptions(e, r);
    for (let v = e; v < e + s; v++) {
      const x = this.getParsed(v), b = o || st(x[h.axis]) ? {
        base: c,
        head: c
      } : this._calculateBarValuePixels(v), M = this._calculateBarIndexPixels(v, p), P = (x._stacks || {})[h.axis], S = {
        horizontal: d,
        base: b.base,
        enableBorderRadius: !P || co(x._custom) || l === P._top || l === P._bottom,
        x: d ? b.head : M.center,
        y: d ? M.center : b.head,
        height: d ? M.size : Math.abs(b.size),
        width: d ? Math.abs(b.size) : M.size
      };
      g && (S.options = _ || this.resolveDataElementOptions(v, t[v].active ? "active" : r));
      const O = S.options || t[v].options;
      Ed(S, O, P, l), Dd(S, O, p.ratio), this.updateElement(t[v], v, S, r);
    }
  }
  _getStacks(t, e) {
    const { iScale: s } = this._cachedMeta, r = s.getMatchingVisibleMetas(this._type).filter((p) => p.controller.options.grouped), o = s.options.stacked, l = [], h = this._cachedMeta.controller.getParsed(e), c = h && h[s.axis], d = (p) => {
      const _ = p._parsed.find((v) => v[s.axis] === c), g = _ && _[p.vScale.axis];
      if (st(g) || isNaN(g))
        return !0;
    };
    for (const p of r)
      if (!(e !== void 0 && d(p)) && ((o === !1 || l.indexOf(p.stack) === -1 || o === void 0 && p.stack === void 0) && l.push(p.stack), p.index === t))
        break;
    return l.length || l.push(void 0), l;
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
    let o, l;
    for (o = 0, l = e.data.length; o < l; ++o)
      r.push(s.getPixelForValue(this.getParsed(o)[s.axis], o));
    const h = t.barThickness;
    return {
      min: h || kd(e),
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
    const { _cachedMeta: { vScale: e, _stacked: s, index: r }, options: { base: o, minBarLength: l } } = this, h = o || 0, c = this.getParsed(t), d = c._custom, p = co(d);
    let _ = c[e.axis], g = 0, v = s ? this.applyStack(e, c, s) : _, x, b;
    v !== _ && (g = v - _, v = _), p && (_ = d.barStart, v = d.barEnd - d.barStart, _ !== 0 && me(_) !== me(d.barEnd) && (g = 0), g += _);
    const M = !st(o) && !p ? o : g;
    let P = e.getPixelForValue(M);
    if (this.chart.getDataVisibility(t) ? x = e.getPixelForValue(g + v) : x = P, b = x - P, Math.abs(b) < l) {
      b = Od(b, e, h) * l, _ === h && (P -= b / 2);
      const S = e.getPixelForDecimal(0), O = e.getPixelForDecimal(1), A = Math.min(S, O), T = Math.max(S, O);
      P = Math.max(Math.min(P, T), A), x = P + b, s && !p && (c._stacks[e.axis]._visualValues[r] = e.getValueForPixel(x) - e.getValueForPixel(P));
    }
    if (P === e.getPixelForValue(h)) {
      const S = me(b) * e.getLineWidthForValue(h) / 2;
      P += S, b -= S;
    }
    return {
      size: b,
      base: P,
      head: x,
      center: x + b / 2
    };
  }
  _calculateBarIndexPixels(t, e) {
    const s = e.scale, r = this.options, o = r.skipNull, l = q(r.maxBarThickness, 1 / 0);
    let h, c;
    if (e.grouped) {
      const d = o ? this._getStackCount(t) : e.stackCount, p = r.barThickness === "flex" ? Cd(t, e, r, d) : Sd(t, e, r, d), _ = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0);
      h = p.start + p.chunk * _ + p.chunk / 2, c = Math.min(l, p.chunk * p.ratio);
    } else
      h = s.getPixelForValue(this.getParsed(t)[s.axis], t), c = Math.min(l, e.min * e.ratio);
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
z(cs, "id", "bar"), z(cs, "defaults", {
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
}), z(cs, "overrides", {
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
class us extends ae {
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
  }
  parsePrimitiveData(t, e, s, r) {
    const o = super.parsePrimitiveData(t, e, s, r);
    for (let l = 0; l < o.length; l++)
      o[l]._custom = this.resolveDataElementOptions(l + s).radius;
    return o;
  }
  parseArrayData(t, e, s, r) {
    const o = super.parseArrayData(t, e, s, r);
    for (let l = 0; l < o.length; l++) {
      const h = e[s + l];
      o[l]._custom = q(h[2], this.resolveDataElementOptions(l + s).radius);
    }
    return o;
  }
  parseObjectData(t, e, s, r) {
    const o = super.parseObjectData(t, e, s, r);
    for (let l = 0; l < o.length; l++) {
      const h = e[s + l];
      o[l]._custom = q(h && h.r && +h.r, this.resolveDataElementOptions(l + s).radius);
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
    const e = this._cachedMeta, s = this.chart.data.labels || [], { xScale: r, yScale: o } = e, l = this.getParsed(t), h = r.getLabelForValue(l.x), c = o.getLabelForValue(l.y), d = l._custom;
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
    const o = r === "reset", { iScale: l, vScale: h } = this._cachedMeta, { sharedOptions: c, includeOptions: d } = this._getSharedOptions(e, r), p = l.axis, _ = h.axis;
    for (let g = e; g < e + s; g++) {
      const v = t[g], x = !o && this.getParsed(g), b = {}, M = b[p] = o ? l.getPixelForDecimal(0.5) : l.getPixelForValue(x[p]), P = b[_] = o ? h.getBasePixel() : h.getPixelForValue(x[_]);
      b.skip = isNaN(M) || isNaN(P), d && (b.options = c || this.resolveDataElementOptions(g, v.active ? "active" : r), o && (b.options.radius = 0)), this.updateElement(v, g, b, r);
    }
  }
  resolveDataElementOptions(t, e) {
    const s = this.getParsed(t);
    let r = super.resolveDataElementOptions(t, e);
    r.$shared && (r = Object.assign({}, r, {
      $shared: !1
    }));
    const o = r.radius;
    return e !== "active" && (r.radius = 0), r.radius += q(s && s._custom, o), r;
  }
}
z(us, "id", "bubble"), z(us, "defaults", {
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
}), z(us, "overrides", {
  scales: {
    x: {
      type: "linear"
    },
    y: {
      type: "linear"
    }
  }
});
function zd(n, t, e) {
  let s = 1, r = 1, o = 0, l = 0;
  if (t < mt) {
    const h = n, c = h + t, d = Math.cos(h), p = Math.sin(h), _ = Math.cos(c), g = Math.sin(c), v = (O, A, T) => fn(O, h, c, !0) ? 1 : Math.max(A, A * e, T, T * e), x = (O, A, T) => fn(O, h, c, !0) ? -1 : Math.min(A, A * e, T, T * e), b = v(0, d, _), M = v(kt, p, g), P = x(gt, d, _), S = x(gt + kt, p, g);
    s = (b - P) / 2, r = (M - S) / 2, o = -(b + P) / 2, l = -(M + S) / 2;
  }
  return {
    ratioX: s,
    ratioY: r,
    offsetX: o,
    offsetY: l
  };
}
class ii extends ae {
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
      if (tt(s[t])) {
        const { key: c = "value" } = this._parsing;
        o = (d) => +Ze(s[d], c);
      }
      let l, h;
      for (l = t, h = t + e; l < h; ++l)
        r._parsed[l] = o(l);
    }
  }
  _getRotation() {
    return re(this.options.rotation - 90);
  }
  _getCircumference() {
    return re(this.options.circumference);
  }
  _getRotationExtents() {
    let t = mt, e = -mt;
    for (let s = 0; s < this.chart.data.datasets.length; ++s)
      if (this.chart.isDatasetVisible(s) && this.chart.getDatasetMeta(s).type === this._type) {
        const r = this.chart.getDatasetMeta(s).controller, o = r._getRotation(), l = r._getCircumference();
        t = Math.min(t, o), e = Math.max(e, o + l);
      }
    return {
      rotation: t,
      circumference: e - t
    };
  }
  update(t) {
    const e = this.chart, { chartArea: s } = e, r = this._cachedMeta, o = r.data, l = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, h = Math.max((Math.min(s.width, s.height) - l) / 2, 0), c = Math.min($c(this.options.cutout, h), 1), d = this._getRingWeight(this.index), { circumference: p, rotation: _ } = this._getRotationExtents(), { ratioX: g, ratioY: v, offsetX: x, offsetY: b } = zd(_, p, c), M = (s.width - l) / g, P = (s.height - l) / v, S = Math.max(Math.min(M, P) / 2, 0), O = xl(this.options.radius, S), A = Math.max(O * c, 0), T = (O - A) / this._getVisibleDatasetWeightTotal();
    this.offsetX = x * O, this.offsetY = b * O, r.total = this.calculateTotal(), this.outerRadius = O - T * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - T * d, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, e) {
    const s = this.options, r = this._cachedMeta, o = this._getCircumference();
    return e && s.animation.animateRotate || !this.chart.getDataVisibility(t) || r._parsed[t] === null || r.data[t].hidden ? 0 : this.calculateCircumference(r._parsed[t] * o / mt);
  }
  updateElements(t, e, s, r) {
    const o = r === "reset", l = this.chart, h = l.chartArea, d = l.options.animation, p = (h.left + h.right) / 2, _ = (h.top + h.bottom) / 2, g = o && d.animateScale, v = g ? 0 : this.innerRadius, x = g ? 0 : this.outerRadius, { sharedOptions: b, includeOptions: M } = this._getSharedOptions(e, r);
    let P = this._getRotation(), S;
    for (S = 0; S < e; ++S)
      P += this._circumference(S, o);
    for (S = e; S < e + s; ++S) {
      const O = this._circumference(S, o), A = t[S], T = {
        x: p + this.offsetX,
        y: _ + this.offsetY,
        startAngle: P,
        endAngle: P + O,
        circumference: O,
        outerRadius: x,
        innerRadius: v
      };
      M && (T.options = b || this.resolveDataElementOptions(S, A.active ? "active" : r)), P += O, this.updateElement(A, S, T, r);
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
    return e > 0 && !isNaN(t) ? mt * (Math.abs(t) / e) : 0;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = this.chart, r = s.data.labels || [], o = yn(e._parsed[t], s.options.locale);
    return {
      label: r[t] || "",
      value: o
    };
  }
  getMaxBorderWidth(t) {
    let e = 0;
    const s = this.chart;
    let r, o, l, h, c;
    if (!t) {
      for (r = 0, o = s.data.datasets.length; r < o; ++r)
        if (s.isDatasetVisible(r)) {
          l = s.getDatasetMeta(r), t = l.data, h = l.controller;
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
    return Math.max(q(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
z(ii, "id", "doughnut"), z(ii, "defaults", {
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
}), z(ii, "descriptors", {
  _scriptable: (t) => t !== "spacing",
  _indexable: (t) => t !== "spacing" && !t.startsWith("borderDash") && !t.startsWith("hoverBorderDash")
}), z(ii, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(t) {
          const e = t.data;
          if (e.labels.length && e.datasets.length) {
            const { labels: { pointStyle: s, color: r } } = t.legend.options;
            return e.labels.map((o, l) => {
              const c = t.getDatasetMeta(0).controller.getStyle(l);
              return {
                text: o,
                fillStyle: c.backgroundColor,
                strokeStyle: c.borderColor,
                fontColor: r,
                lineWidth: c.borderWidth,
                pointStyle: s,
                hidden: !t.getDataVisibility(l),
                index: l
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
class ds extends ae {
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(t) {
    const e = this._cachedMeta, { dataset: s, data: r = [], _dataset: o } = e, l = this.chart._animationsDisabled;
    let { start: h, count: c } = Tl(e, r, l);
    this._drawStart = h, this._drawCount = c, Ol(e) && (h = 0, c = r.length), s._chart = this.chart, s._datasetIndex = this.index, s._decimated = !!o._decimated, s.points = r;
    const d = this.resolveDatasetElementOptions(t);
    this.options.showLine || (d.borderWidth = 0), d.segment = this.options.segment, this.updateElement(s, void 0, {
      animated: !l,
      options: d
    }, t), this.updateElements(r, h, c, t);
  }
  updateElements(t, e, s, r) {
    const o = r === "reset", { iScale: l, vScale: h, _stacked: c, _dataset: d } = this._cachedMeta, { sharedOptions: p, includeOptions: _ } = this._getSharedOptions(e, r), g = l.axis, v = h.axis, { spanGaps: x, segment: b } = this.options, M = Pi(x) ? x : Number.POSITIVE_INFINITY, P = this.chart._animationsDisabled || o || r === "none", S = e + s, O = t.length;
    let A = e > 0 && this.getParsed(e - 1);
    for (let T = 0; T < O; ++T) {
      const I = t[T], D = P ? I : {};
      if (T < e || T >= S) {
        D.skip = !0;
        continue;
      }
      const B = this.getParsed(T), N = st(B[v]), G = D[g] = l.getPixelForValue(B[g], T), Z = D[v] = o || N ? h.getBasePixel() : h.getPixelForValue(c ? this.applyStack(h, B, c) : B[v], T);
      D.skip = isNaN(G) || isNaN(Z) || N, D.stop = T > 0 && Math.abs(B[g] - A[g]) > M, b && (D.parsed = B, D.raw = d.data[T]), _ && (D.options = p || this.resolveDataElementOptions(T, I.active ? "active" : r)), P || this.updateElement(I, T, D, r), A = B;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, e = t.dataset, s = e.options && e.options.borderWidth || 0, r = t.data || [];
    if (!r.length)
      return s;
    const o = r[0].size(this.resolveDataElementOptions(0)), l = r[r.length - 1].size(this.resolveDataElementOptions(r.length - 1));
    return Math.max(s, o, l) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
z(ds, "id", "line"), z(ds, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  showLine: !0,
  spanGaps: !1
}), z(ds, "overrides", {
  scales: {
    _index_: {
      type: "category"
    },
    _value_: {
      type: "linear"
    }
  }
});
class hn extends ae {
  constructor(t, e) {
    super(t, e), this.innerRadius = void 0, this.outerRadius = void 0;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = this.chart, r = s.data.labels || [], o = yn(e._parsed[t].r, s.options.locale);
    return {
      label: r[t] || "",
      value: o
    };
  }
  parseObjectData(t, e, s, r) {
    return Fl.bind(this)(t, e, s, r);
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
    const t = this.chart, e = t.chartArea, s = t.options, r = Math.min(e.right - e.left, e.bottom - e.top), o = Math.max(r / 2, 0), l = Math.max(s.cutoutPercentage ? o / 100 * s.cutoutPercentage : 1, 0), h = (o - l) / t.getVisibleDatasetCount();
    this.outerRadius = o - h * this.index, this.innerRadius = this.outerRadius - h;
  }
  updateElements(t, e, s, r) {
    const o = r === "reset", l = this.chart, c = l.options.animation, d = this._cachedMeta.rScale, p = d.xCenter, _ = d.yCenter, g = d.getIndexAngle(0) - 0.5 * gt;
    let v = g, x;
    const b = 360 / this.countVisibleElements();
    for (x = 0; x < e; ++x)
      v += this._computeAngle(x, r, b);
    for (x = e; x < e + s; x++) {
      const M = t[x];
      let P = v, S = v + this._computeAngle(x, r, b), O = l.getDataVisibility(x) ? d.getDistanceFromCenterForValue(this.getParsed(x).r) : 0;
      v = S, o && (c.animateScale && (O = 0), c.animateRotate && (P = S = g));
      const A = {
        x: p,
        y: _,
        innerRadius: 0,
        outerRadius: O,
        startAngle: P,
        endAngle: S,
        options: this.resolveDataElementOptions(x, M.active ? "active" : r)
      };
      this.updateElement(M, x, A, r);
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
    return this.chart.getDataVisibility(t) ? re(this.resolveDataElementOptions(t, e).angle || s) : 0;
  }
}
z(hn, "id", "polarArea"), z(hn, "defaults", {
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
}), z(hn, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(t) {
          const e = t.data;
          if (e.labels.length && e.datasets.length) {
            const { labels: { pointStyle: s, color: r } } = t.legend.options;
            return e.labels.map((o, l) => {
              const c = t.getDatasetMeta(0).controller.getStyle(l);
              return {
                text: o,
                fillStyle: c.backgroundColor,
                strokeStyle: c.borderColor,
                fontColor: r,
                lineWidth: c.borderWidth,
                pointStyle: s,
                hidden: !t.getDataVisibility(l),
                index: l
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
class wo extends ii {
}
z(wo, "id", "pie"), z(wo, "defaults", {
  cutout: 0,
  rotation: 0,
  circumference: 360,
  radius: "100%"
});
class fs extends ae {
  getLabelAndValue(t) {
    const e = this._cachedMeta.vScale, s = this.getParsed(t);
    return {
      label: e.getLabels()[t],
      value: "" + e.getLabelForValue(s[e.axis])
    };
  }
  parseObjectData(t, e, s, r) {
    return Fl.bind(this)(t, e, s, r);
  }
  update(t) {
    const e = this._cachedMeta, s = e.dataset, r = e.data || [], o = e.iScale.getLabels();
    if (s.points = r, t !== "resize") {
      const l = this.resolveDatasetElementOptions(t);
      this.options.showLine || (l.borderWidth = 0);
      const h = {
        _loop: !0,
        _fullLoop: o.length === r.length,
        options: l
      };
      this.updateElement(s, void 0, h, t);
    }
    this.updateElements(r, 0, r.length, t);
  }
  updateElements(t, e, s, r) {
    const o = this._cachedMeta.rScale, l = r === "reset";
    for (let h = e; h < e + s; h++) {
      const c = t[h], d = this.resolveDataElementOptions(h, c.active ? "active" : r), p = o.getPointPositionForValue(h, this.getParsed(h).r), _ = l ? o.xCenter : p.x, g = l ? o.yCenter : p.y, v = {
        x: _,
        y: g,
        angle: p.angle,
        skip: isNaN(_) || isNaN(g),
        options: d
      };
      this.updateElement(c, h, v, r);
    }
  }
}
z(fs, "id", "radar"), z(fs, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  indexAxis: "r",
  showLine: !0,
  elements: {
    line: {
      fill: "start"
    }
  }
}), z(fs, "overrides", {
  aspectRatio: 1,
  scales: {
    r: {
      type: "radialLinear"
    }
  }
});
class ps extends ae {
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = this.chart.data.labels || [], { xScale: r, yScale: o } = e, l = this.getParsed(t), h = r.getLabelForValue(l.x), c = o.getLabelForValue(l.y);
    return {
      label: s[t] || "",
      value: "(" + h + ", " + c + ")"
    };
  }
  update(t) {
    const e = this._cachedMeta, { data: s = [] } = e, r = this.chart._animationsDisabled;
    let { start: o, count: l } = Tl(e, s, r);
    if (this._drawStart = o, this._drawCount = l, Ol(e) && (o = 0, l = s.length), this.options.showLine) {
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
    this.updateElements(s, o, l, t);
  }
  addElements() {
    const { showLine: t } = this.options;
    !this.datasetElementType && t && (this.datasetElementType = this.chart.registry.getElement("line")), super.addElements();
  }
  updateElements(t, e, s, r) {
    const o = r === "reset", { iScale: l, vScale: h, _stacked: c, _dataset: d } = this._cachedMeta, p = this.resolveDataElementOptions(e, r), _ = this.getSharedOptions(p), g = this.includeOptions(r, _), v = l.axis, x = h.axis, { spanGaps: b, segment: M } = this.options, P = Pi(b) ? b : Number.POSITIVE_INFINITY, S = this.chart._animationsDisabled || o || r === "none";
    let O = e > 0 && this.getParsed(e - 1);
    for (let A = e; A < e + s; ++A) {
      const T = t[A], I = this.getParsed(A), D = S ? T : {}, B = st(I[x]), N = D[v] = l.getPixelForValue(I[v], A), G = D[x] = o || B ? h.getBasePixel() : h.getPixelForValue(c ? this.applyStack(h, I, c) : I[x], A);
      D.skip = isNaN(N) || isNaN(G) || B, D.stop = A > 0 && Math.abs(I[v] - O[v]) > P, M && (D.parsed = I, D.raw = d.data[A]), g && (D.options = _ || this.resolveDataElementOptions(A, T.active ? "active" : r)), S || this.updateElement(T, A, D, r), O = I;
    }
    this.updateSharedOptions(_, r, p);
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
    const o = e[0].size(this.resolveDataElementOptions(0)), l = e[e.length - 1].size(this.resolveDataElementOptions(e.length - 1));
    return Math.max(r, o, l) / 2;
  }
}
z(ps, "id", "scatter"), z(ps, "defaults", {
  datasetElementType: !1,
  dataElementType: "point",
  showLine: !1,
  fill: !1
}), z(ps, "overrides", {
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
var Bd = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  BarController: cs,
  BubbleController: us,
  DoughnutController: ii,
  LineController: ds,
  PieController: wo,
  PolarAreaController: hn,
  RadarController: fs,
  ScatterController: ps
});
function Je() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class $o {
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
    Object.assign($o.prototype, t);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return Je();
  }
  parse() {
    return Je();
  }
  format() {
    return Je();
  }
  add() {
    return Je();
  }
  diff() {
    return Je();
  }
  startOf() {
    return Je();
  }
  endOf() {
    return Je();
  }
}
var Rd = {
  _date: $o
};
function Fd(n, t, e, s) {
  const { controller: r, data: o, _sorted: l } = n, h = r._cachedMeta.iScale;
  if (h && t === h.axis && t !== "r" && l && o.length) {
    const c = h._reversePixels ? au : Se;
    if (s) {
      if (r._sharedOptions) {
        const d = o[0], p = typeof d.getRange == "function" && d.getRange(t);
        if (p) {
          const _ = c(o, t, e - p), g = c(o, t, e + p);
          return {
            lo: _.lo,
            hi: g.hi
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
function bn(n, t, e, s, r) {
  const o = n.getSortedVisibleDatasetMetas(), l = e[t];
  for (let h = 0, c = o.length; h < c; ++h) {
    const { index: d, data: p } = o[h], { lo: _, hi: g } = Fd(o[h], t, l, r);
    for (let v = _; v <= g; ++v) {
      const x = p[v];
      x.skip || s(x, d, v);
    }
  }
}
function Nd(n) {
  const t = n.indexOf("x") !== -1, e = n.indexOf("y") !== -1;
  return function(s, r) {
    const o = t ? Math.abs(s.x - r.x) : 0, l = e ? Math.abs(s.y - r.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(l, 2));
  };
}
function uo(n, t, e, s, r) {
  const o = [];
  return !r && !n.isPointInArea(t) || bn(n, e, t, function(h, c, d) {
    !r && !Ce(h, n.chartArea, 0) || h.inRange(t.x, t.y, s) && o.push({
      element: h,
      datasetIndex: c,
      index: d
    });
  }, !0), o;
}
function Zd(n, t, e, s) {
  let r = [];
  function o(l, h, c) {
    const { startAngle: d, endAngle: p } = l.getProps([
      "startAngle",
      "endAngle"
    ], s), { angle: _ } = Ml(l, {
      x: t.x,
      y: t.y
    });
    fn(_, d, p) && r.push({
      element: l,
      datasetIndex: h,
      index: c
    });
  }
  return bn(n, e, t, o), r;
}
function Hd(n, t, e, s, r, o) {
  let l = [];
  const h = Nd(e);
  let c = Number.POSITIVE_INFINITY;
  function d(p, _, g) {
    const v = p.inRange(t.x, t.y, r);
    if (s && !v)
      return;
    const x = p.getCenterPoint(r);
    if (!(!!o || n.isPointInArea(x)) && !v)
      return;
    const M = h(t, x);
    M < c ? (l = [
      {
        element: p,
        datasetIndex: _,
        index: g
      }
    ], c = M) : M === c && l.push({
      element: p,
      datasetIndex: _,
      index: g
    });
  }
  return bn(n, e, t, d), l;
}
function fo(n, t, e, s, r, o) {
  return !o && !n.isPointInArea(t) ? [] : e === "r" && !s ? Zd(n, t, e, r) : Hd(n, t, e, s, r, o);
}
function Pa(n, t, e, s, r) {
  const o = [], l = e === "x" ? "inXRange" : "inYRange";
  let h = !1;
  return bn(n, e, t, (c, d, p) => {
    c[l] && c[l](t[e], r) && (o.push({
      element: c,
      datasetIndex: d,
      index: p
    }), h = h || c.inRange(t.x, t.y, r));
  }), s && !h ? [] : o;
}
var Wd = {
  evaluateInteractionItems: bn,
  modes: {
    index(n, t, e, s) {
      const r = ti(t, n), o = e.axis || "x", l = e.includeInvisible || !1, h = e.intersect ? uo(n, r, o, s, l) : fo(n, r, o, !1, s, l), c = [];
      return h.length ? (n.getSortedVisibleDatasetMetas().forEach((d) => {
        const p = h[0].index, _ = d.data[p];
        _ && !_.skip && c.push({
          element: _,
          datasetIndex: d.index,
          index: p
        });
      }), c) : [];
    },
    dataset(n, t, e, s) {
      const r = ti(t, n), o = e.axis || "xy", l = e.includeInvisible || !1;
      let h = e.intersect ? uo(n, r, o, s, l) : fo(n, r, o, !1, s, l);
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
      const r = ti(t, n), o = e.axis || "xy", l = e.includeInvisible || !1;
      return uo(n, r, o, s, l);
    },
    nearest(n, t, e, s) {
      const r = ti(t, n), o = e.axis || "xy", l = e.includeInvisible || !1;
      return fo(n, r, o, e.intersect, s, l);
    },
    x(n, t, e, s) {
      const r = ti(t, n);
      return Pa(n, r, "x", e.intersect, s);
    },
    y(n, t, e, s) {
      const r = ti(t, n);
      return Pa(n, r, "y", e.intersect, s);
    }
  }
};
const ql = [
  "left",
  "top",
  "right",
  "bottom"
];
function qi(n, t) {
  return n.filter((e) => e.pos === t);
}
function ka(n, t) {
  return n.filter((e) => ql.indexOf(e.pos) === -1 && e.box.axis === t);
}
function $i(n, t) {
  return n.sort((e, s) => {
    const r = t ? s : e, o = t ? e : s;
    return r.weight === o.weight ? r.index - o.index : r.weight - o.weight;
  });
}
function Vd(n) {
  const t = [];
  let e, s, r, o, l, h;
  for (e = 0, s = (n || []).length; e < s; ++e)
    r = n[e], { position: o, options: { stack: l, stackWeight: h = 1 } } = r, t.push({
      index: e,
      box: r,
      pos: o,
      horizontal: r.isHorizontal(),
      weight: r.weight,
      stack: l && o + l,
      stackWeight: h
    });
  return t;
}
function jd(n) {
  const t = {};
  for (const e of n) {
    const { stack: s, pos: r, stackWeight: o } = e;
    if (!s || !ql.includes(r))
      continue;
    const l = t[s] || (t[s] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    l.count++, l.weight += o;
  }
  return t;
}
function Ud(n, t) {
  const e = jd(n), { vBoxMaxWidth: s, hBoxMaxHeight: r } = t;
  let o, l, h;
  for (o = 0, l = n.length; o < l; ++o) {
    h = n[o];
    const { fullSize: c } = h.box, d = e[h.stack], p = d && h.stackWeight / d.weight;
    h.horizontal ? (h.width = p ? p * s : c && t.availableWidth, h.height = r) : (h.width = s, h.height = p ? p * r : c && t.availableHeight);
  }
  return e;
}
function Gd(n) {
  const t = Vd(n), e = $i(t.filter((d) => d.box.fullSize), !0), s = $i(qi(t, "left"), !0), r = $i(qi(t, "right")), o = $i(qi(t, "top"), !0), l = $i(qi(t, "bottom")), h = ka(t, "x"), c = ka(t, "y");
  return {
    fullSize: e,
    leftAndTop: s.concat(o),
    rightAndBottom: r.concat(c).concat(l).concat(h),
    chartArea: qi(t, "chartArea"),
    vertical: s.concat(r).concat(c),
    horizontal: o.concat(l).concat(h)
  };
}
function Sa(n, t, e, s) {
  return Math.max(n[e], t[e]) + Math.max(n[s], t[s]);
}
function $l(n, t) {
  n.top = Math.max(n.top, t.top), n.left = Math.max(n.left, t.left), n.bottom = Math.max(n.bottom, t.bottom), n.right = Math.max(n.right, t.right);
}
function Yd(n, t, e, s) {
  const { pos: r, box: o } = e, l = n.maxPadding;
  if (!tt(r)) {
    e.size && (n[r] -= e.size);
    const _ = s[e.stack] || {
      size: 0,
      count: 1
    };
    _.size = Math.max(_.size, e.horizontal ? o.height : o.width), e.size = _.size / _.count, n[r] += e.size;
  }
  o.getPadding && $l(l, o.getPadding());
  const h = Math.max(0, t.outerWidth - Sa(l, n, "left", "right")), c = Math.max(0, t.outerHeight - Sa(l, n, "top", "bottom")), d = h !== n.w, p = c !== n.h;
  return n.w = h, n.h = c, e.horizontal ? {
    same: d,
    other: p
  } : {
    same: p,
    other: d
  };
}
function qd(n) {
  const t = n.maxPadding;
  function e(s) {
    const r = Math.max(t[s] - n[s], 0);
    return n[s] += r, r;
  }
  n.y += e("top"), n.x += e("left"), e("right"), e("bottom");
}
function $d(n, t) {
  const e = t.maxPadding;
  function s(r) {
    const o = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return r.forEach((l) => {
      o[l] = Math.max(t[l], e[l]);
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
function tn(n, t, e, s) {
  const r = [];
  let o, l, h, c, d, p;
  for (o = 0, l = n.length, d = 0; o < l; ++o) {
    h = n[o], c = h.box, c.update(h.width || t.w, h.height || t.h, $d(h.horizontal, t));
    const { same: _, other: g } = Yd(t, e, h, s);
    d |= _ && r.length, p = p || g, c.fullSize || r.push(h);
  }
  return d && tn(r, t, e, s) || p;
}
function ts(n, t, e, s, r) {
  n.top = e, n.left = t, n.right = t + s, n.bottom = e + r, n.width = s, n.height = r;
}
function Ca(n, t, e, s) {
  const r = e.padding;
  let { x: o, y: l } = t;
  for (const h of n) {
    const c = h.box, d = s[h.stack] || {
      count: 1,
      placed: 0,
      weight: 1
    }, p = h.stackWeight / d.weight || 1;
    if (h.horizontal) {
      const _ = t.w * p, g = d.size || c.height;
      dn(d.start) && (l = d.start), c.fullSize ? ts(c, r.left, l, e.outerWidth - r.right - r.left, g) : ts(c, t.left + d.placed, l, _, g), d.start = l, d.placed += _, l = c.bottom;
    } else {
      const _ = t.h * p, g = d.size || c.width;
      dn(d.start) && (o = d.start), c.fullSize ? ts(c, o, r.top, g, e.outerHeight - r.bottom - r.top) : ts(c, o, t.top + d.placed, g, _), d.start = o, d.placed += _, o = c.right;
    }
  }
  t.x = o, t.y = l;
}
var Ft = {
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
    const r = Nt(n.options.layout.padding), o = Math.max(t - r.width, 0), l = Math.max(e - r.height, 0), h = Gd(n.boxes), c = h.vertical, d = h.horizontal;
    ut(n.boxes, (b) => {
      typeof b.beforeLayout == "function" && b.beforeLayout();
    });
    const p = c.reduce((b, M) => M.box.options && M.box.options.display === !1 ? b : b + 1, 0) || 1, _ = Object.freeze({
      outerWidth: t,
      outerHeight: e,
      padding: r,
      availableWidth: o,
      availableHeight: l,
      vBoxMaxWidth: o / 2 / p,
      hBoxMaxHeight: l / 2
    }), g = Object.assign({}, r);
    $l(g, Nt(s));
    const v = Object.assign({
      maxPadding: g,
      w: o,
      h: l,
      x: r.left,
      y: r.top
    }, r), x = Ud(c.concat(d), _);
    tn(h.fullSize, v, _, x), tn(c, v, _, x), tn(d, v, _, x) && tn(c, v, _, x), qd(v), Ca(h.leftAndTop, v, _, x), v.x += v.w, v.y += v.h, Ca(h.rightAndBottom, v, _, x), n.chartArea = {
      left: v.left,
      top: v.top,
      right: v.left + v.w,
      bottom: v.top + v.h,
      height: v.h,
      width: v.w
    }, ut(h.chartArea, (b) => {
      const M = b.box;
      Object.assign(M, n.chartArea), M.update(v.w, v.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class Xl {
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
class Xd extends Xl {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const _s = "$chartjs", Kd = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Ta = (n) => n === null || n === "";
function Jd(n, t) {
  const e = n.style, s = n.getAttribute("height"), r = n.getAttribute("width");
  if (n[_s] = {
    initial: {
      height: s,
      width: r,
      style: {
        display: e.display,
        height: e.height,
        width: e.width
      }
    }
  }, e.display = e.display || "block", e.boxSizing = e.boxSizing || "border-box", Ta(r)) {
    const o = da(n, "width");
    o !== void 0 && (n.width = o);
  }
  if (Ta(s))
    if (n.style.height === "")
      n.height = n.width / (t || 2);
    else {
      const o = da(n, "height");
      o !== void 0 && (n.height = o);
    }
  return n;
}
const Kl = td ? {
  passive: !0
} : !1;
function Qd(n, t, e) {
  n && n.addEventListener(t, e, Kl);
}
function tf(n, t, e) {
  n && n.canvas && n.canvas.removeEventListener(t, e, Kl);
}
function ef(n, t) {
  const e = Kd[n.type] || n.type, { x: s, y: r } = ti(n, t);
  return {
    type: e,
    chart: t,
    native: n,
    x: s !== void 0 ? s : null,
    y: r !== void 0 ? r : null
  };
}
function Ms(n, t) {
  for (const e of n)
    if (e === t || e.contains(t))
      return !0;
}
function nf(n, t, e) {
  const s = n.canvas, r = new MutationObserver((o) => {
    let l = !1;
    for (const h of o)
      l = l || Ms(h.addedNodes, s), l = l && !Ms(h.removedNodes, s);
    l && e();
  });
  return r.observe(document, {
    childList: !0,
    subtree: !0
  }), r;
}
function sf(n, t, e) {
  const s = n.canvas, r = new MutationObserver((o) => {
    let l = !1;
    for (const h of o)
      l = l || Ms(h.removedNodes, s), l = l && !Ms(h.addedNodes, s);
    l && e();
  });
  return r.observe(document, {
    childList: !0,
    subtree: !0
  }), r;
}
const _n = /* @__PURE__ */ new Map();
let Oa = 0;
function Jl() {
  const n = window.devicePixelRatio;
  n !== Oa && (Oa = n, _n.forEach((t, e) => {
    e.currentDevicePixelRatio !== n && t();
  }));
}
function of(n, t) {
  _n.size || window.addEventListener("resize", Jl), _n.set(n, t);
}
function rf(n) {
  _n.delete(n), _n.size || window.removeEventListener("resize", Jl);
}
function af(n, t, e) {
  const s = n.canvas, r = s && qo(s);
  if (!r)
    return;
  const o = Cl((h, c) => {
    const d = r.clientWidth;
    e(h, c), d < r.clientWidth && e();
  }, window), l = new ResizeObserver((h) => {
    const c = h[0], d = c.contentRect.width, p = c.contentRect.height;
    d === 0 && p === 0 || o(d, p);
  });
  return l.observe(r), of(n, o), l;
}
function po(n, t, e) {
  e && e.disconnect(), t === "resize" && rf(n);
}
function lf(n, t, e) {
  const s = n.canvas, r = Cl((o) => {
    n.ctx !== null && e(ef(o, n));
  }, n);
  return Qd(s, t, r), r;
}
class hf extends Xl {
  acquireContext(t, e) {
    const s = t && t.getContext && t.getContext("2d");
    return s && s.canvas === t ? (Jd(t, e), s) : null;
  }
  releaseContext(t) {
    const e = t.canvas;
    if (!e[_s])
      return !1;
    const s = e[_s].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const l = s[o];
      st(l) ? e.removeAttribute(o) : e.setAttribute(o, l);
    });
    const r = s.style || {};
    return Object.keys(r).forEach((o) => {
      e.style[o] = r[o];
    }), e.width = e.width, delete e[_s], !0;
  }
  addEventListener(t, e, s) {
    this.removeEventListener(t, e);
    const r = t.$proxies || (t.$proxies = {}), l = {
      attach: nf,
      detach: sf,
      resize: af
    }[e] || lf;
    r[e] = l(t, e, s);
  }
  removeEventListener(t, e) {
    const s = t.$proxies || (t.$proxies = {}), r = s[e];
    if (!r)
      return;
    ({
      attach: po,
      detach: po,
      resize: po
    }[e] || tf)(t, e, r), s[e] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, e, s, r) {
    return Qu(t, e, s, r);
  }
  isAttached(t) {
    const e = t && qo(t);
    return !!(e && e.isConnected);
  }
}
function cf(n) {
  return !Yo() || typeof OffscreenCanvas < "u" && n instanceof OffscreenCanvas ? Xd : hf;
}
var hs;
let Te = (hs = class {
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
    return Pi(this.x) && Pi(this.y);
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
}, z(hs, "defaults", {}), z(hs, "defaultRoutes"), hs);
function uf(n, t) {
  const e = n.options.ticks, s = df(n), r = Math.min(e.maxTicksLimit || s, s), o = e.major.enabled ? pf(t) : [], l = o.length, h = o[0], c = o[l - 1], d = [];
  if (l > r)
    return _f(t, d, o, l / r), d;
  const p = ff(o, t, r);
  if (l > 0) {
    let _, g;
    const v = l > 1 ? Math.round((c - h) / (l - 1)) : null;
    for (es(t, d, p, st(v) ? 0 : h - v, h), _ = 0, g = l - 1; _ < g; _++)
      es(t, d, p, o[_], o[_ + 1]);
    return es(t, d, p, c, st(v) ? t.length : c + v), d;
  }
  return es(t, d, p), d;
}
function df(n) {
  const t = n.options.offset, e = n._tickSize(), s = n._length / e + (t ? 0 : 1), r = n._maxLength / e;
  return Math.floor(Math.min(s, r));
}
function ff(n, t, e) {
  const s = mf(n), r = t.length / e;
  if (!s)
    return Math.max(r, 1);
  const o = nu(s);
  for (let l = 0, h = o.length - 1; l < h; l++) {
    const c = o[l];
    if (c > r)
      return c;
  }
  return Math.max(r, 1);
}
function pf(n) {
  const t = [];
  let e, s;
  for (e = 0, s = n.length; e < s; e++)
    n[e].major && t.push(e);
  return t;
}
function _f(n, t, e, s) {
  let r = 0, o = e[0], l;
  for (s = Math.ceil(s), l = 0; l < n.length; l++)
    l === o && (t.push(n[l]), r++, o = e[r * s]);
}
function es(n, t, e, s, r) {
  const o = q(s, 0), l = Math.min(q(r, n.length), n.length);
  let h = 0, c, d, p;
  for (e = Math.ceil(e), r && (c = r - s, e = c / Math.floor(c / e)), p = o; p < 0; )
    h++, p = Math.round(o + h * e);
  for (d = Math.max(o, 0); d < l; d++)
    d === p && (t.push(n[d]), h++, p = Math.round(o + h * e));
}
function mf(n) {
  const t = n.length;
  let e, s;
  if (t < 2)
    return !1;
  for (s = n[0], e = 1; e < t; ++e)
    if (n[e] - n[e - 1] !== s)
      return !1;
  return s;
}
const gf = (n) => n === "left" ? "right" : n === "right" ? "left" : n, Aa = (n, t, e) => t === "top" || t === "left" ? n[t] + e : n[t] - e, Ea = (n, t) => Math.min(t || n, n);
function Ia(n, t) {
  const e = [], s = n.length / t, r = n.length;
  let o = 0;
  for (; o < r; o += s)
    e.push(n[Math.floor(o)]);
  return e;
}
function vf(n, t, e) {
  const s = n.ticks.length, r = Math.min(t, s - 1), o = n._startPixel, l = n._endPixel, h = 1e-6;
  let c = n.getPixelForTick(r), d;
  if (!(e && (s === 1 ? d = Math.max(c - o, l - c) : t === 0 ? d = (n.getPixelForTick(1) - c) / 2 : d = (c - n.getPixelForTick(r - 1)) / 2, c += r < t ? d : -d, c < o - h || c > l + h)))
    return c;
}
function yf(n, t) {
  ut(n, (e) => {
    const s = e.gc, r = s.length / 2;
    let o;
    if (r > t) {
      for (o = 0; o < r; ++o)
        delete e.data[s[o]];
      s.splice(0, r);
    }
  });
}
function Xi(n) {
  return n.drawTicks ? n.tickLength : 0;
}
function Da(n, t) {
  if (!n.display)
    return 0;
  const e = Ot(n.font, t), s = Nt(n.padding);
  return (_t(n.text) ? n.text.length : 1) * e.lineHeight + s.height;
}
function bf(n, t) {
  return We(n, {
    scale: t,
    type: "scale"
  });
}
function xf(n, t, e) {
  return We(n, {
    tick: e,
    index: t,
    type: "tick"
  });
}
function wf(n, t, e) {
  let s = Ho(n);
  return (e && t !== "right" || !e && t === "right") && (s = gf(s)), s;
}
function Lf(n, t, e, s) {
  const { top: r, left: o, bottom: l, right: h, chart: c } = n, { chartArea: d, scales: p } = c;
  let _ = 0, g, v, x;
  const b = l - r, M = h - o;
  if (n.isHorizontal()) {
    if (v = Rt(s, o, h), tt(e)) {
      const P = Object.keys(e)[0], S = e[P];
      x = p[P].getPixelForValue(S) + b - t;
    } else
      e === "center" ? x = (d.bottom + d.top) / 2 + b - t : x = Aa(n, e, t);
    g = h - o;
  } else {
    if (tt(e)) {
      const P = Object.keys(e)[0], S = e[P];
      v = p[P].getPixelForValue(S) - M + t;
    } else
      e === "center" ? v = (d.left + d.right) / 2 - M + t : v = Aa(n, e, t);
    x = Rt(s, l, r), _ = e === "left" ? -kt : kt;
  }
  return {
    titleX: v,
    titleY: x,
    maxWidth: g,
    rotation: _
  };
}
class ai extends Te {
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
    return t = $t(t, Number.POSITIVE_INFINITY), e = $t(e, Number.NEGATIVE_INFINITY), s = $t(s, Number.POSITIVE_INFINITY), r = $t(r, Number.NEGATIVE_INFINITY), {
      min: $t(t, s),
      max: $t(e, r),
      minDefined: Lt(t),
      maxDefined: Lt(e)
    };
  }
  getMinMax(t) {
    let { min: e, max: s, minDefined: r, maxDefined: o } = this.getUserBounds(), l;
    if (r && o)
      return {
        min: e,
        max: s
      };
    const h = this.getMatchingVisibleMetas();
    for (let c = 0, d = h.length; c < d; ++c)
      l = h[c].controller.getMinMax(this, t), r || (e = Math.min(e, l.min)), o || (s = Math.max(s, l.max));
    return e = o && e > s ? s : e, s = r && e > s ? e : s, {
      min: $t(e, $t(s, e)),
      max: $t(s, $t(e, s))
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
    pt(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, e, s) {
    const { beginAtZero: r, grace: o, ticks: l } = this.options, h = l.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = e, this._margins = s = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, s), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + s.left + s.right : this.height + s.top + s.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Au(this, o, r), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const c = h < this.ticks.length;
    this._convertTicksToLabels(c ? Ia(this.ticks, h) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), l.display && (l.autoSkip || l.source === "auto") && (this.ticks = uf(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), c && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, e, s;
    this.isHorizontal() ? (e = this.left, s = this.right) : (e = this.top, s = this.bottom, t = !t), this._startPixel = e, this._endPixel = s, this._reversePixels = t, this._length = s - e, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    pt(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    pt(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    pt(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), pt(this.options[t], [
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
    pt(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const e = this.options.ticks;
    let s, r, o;
    for (s = 0, r = t.length; s < r; s++)
      o = t[s], o.label = pt(e.callback, [
        o.value,
        s,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    pt(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    pt(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, e = t.ticks, s = Ea(this.ticks.length, t.ticks.maxTicksLimit), r = e.minRotation || 0, o = e.maxRotation;
    let l = r, h, c, d;
    if (!this._isVisible() || !e.display || r >= o || s <= 1 || !this.isHorizontal()) {
      this.labelRotation = r;
      return;
    }
    const p = this._getLabelSizes(), _ = p.widest.width, g = p.highest.height, v = Dt(this.chart.width - _, 0, this.maxWidth);
    h = t.offset ? this.maxWidth / s : v / (s - 1), _ + 6 > h && (h = v / (s - (t.offset ? 0.5 : 1)), c = this.maxHeight - Xi(t.grid) - e.padding - Da(t.title, this.chart.options.font), d = Math.sqrt(_ * _ + g * g), l = No(Math.min(Math.asin(Dt((p.highest.height + 6) / h, -1, 1)), Math.asin(Dt(c / d, -1, 1)) - Math.asin(Dt(g / d, -1, 1)))), l = Math.max(r, Math.min(o, l))), this.labelRotation = l;
  }
  afterCalculateLabelRotation() {
    pt(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    pt(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: e, options: { ticks: s, title: r, grid: o } } = this, l = this._isVisible(), h = this.isHorizontal();
    if (l) {
      const c = Da(r, e.options.font);
      if (h ? (t.width = this.maxWidth, t.height = Xi(o) + c) : (t.height = this.maxHeight, t.width = Xi(o) + c), s.display && this.ticks.length) {
        const { first: d, last: p, widest: _, highest: g } = this._getLabelSizes(), v = s.padding * 2, x = re(this.labelRotation), b = Math.cos(x), M = Math.sin(x);
        if (h) {
          const P = s.mirror ? 0 : M * _.width + b * g.height;
          t.height = Math.min(this.maxHeight, t.height + P + v);
        } else {
          const P = s.mirror ? 0 : b * _.width + M * g.height;
          t.width = Math.min(this.maxWidth, t.width + P + v);
        }
        this._calculatePadding(d, p, M, b);
      }
    }
    this._handleMargins(), h ? (this.width = this._length = e.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = e.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, e, s, r) {
    const { ticks: { align: o, padding: l }, position: h } = this.options, c = this.labelRotation !== 0, d = h !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const p = this.getPixelForTick(0) - this.left, _ = this.right - this.getPixelForTick(this.ticks.length - 1);
      let g = 0, v = 0;
      c ? d ? (g = r * t.width, v = s * e.height) : (g = s * t.height, v = r * e.width) : o === "start" ? v = e.width : o === "end" ? g = t.width : o !== "inner" && (g = t.width / 2, v = e.width / 2), this.paddingLeft = Math.max((g - p + l) * this.width / (this.width - p), 0), this.paddingRight = Math.max((v - _ + l) * this.width / (this.width - _), 0);
    } else {
      let p = e.height / 2, _ = t.height / 2;
      o === "start" ? (p = 0, _ = t.height) : o === "end" && (p = e.height, _ = 0), this.paddingTop = p + l, this.paddingBottom = _ + l;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    pt(this.options.afterFit, [
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
      st(t[e].label) && (t.splice(e, 1), s--, e--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const e = this.options.ticks.sampleSize;
      let s = this.ticks;
      e < s.length && (s = Ia(s, e)), this._labelSizes = t = this._computeLabelSizes(s, s.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, e, s) {
    const { ctx: r, _longestTextCache: o } = this, l = [], h = [], c = Math.floor(e / Ea(e, s));
    let d = 0, p = 0, _, g, v, x, b, M, P, S, O, A, T;
    for (_ = 0; _ < e; _ += c) {
      if (x = t[_].label, b = this._resolveTickFontOptions(_), r.font = M = b.string, P = o[M] = o[M] || {
        data: {},
        gc: []
      }, S = b.lineHeight, O = A = 0, !st(x) && !_t(x))
        O = ws(r, P.data, P.gc, O, x), A = S;
      else if (_t(x))
        for (g = 0, v = x.length; g < v; ++g)
          T = x[g], !st(T) && !_t(T) && (O = ws(r, P.data, P.gc, O, T), A += S);
      l.push(O), h.push(A), d = Math.max(O, d), p = Math.max(A, p);
    }
    yf(o, e);
    const I = l.indexOf(d), D = h.indexOf(p), B = (N) => ({
      width: l[N] || 0,
      height: h[N] || 0
    });
    return {
      first: B(0),
      last: B(e - 1),
      widest: B(I),
      highest: B(D),
      widths: l,
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
    return ru(this._alignToPixels ? Ke(this.chart, e, 0) : e);
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
      return s.$context || (s.$context = xf(this.getContext(), t, s));
    }
    return this.$context || (this.$context = bf(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, e = re(this.labelRotation), s = Math.abs(Math.cos(e)), r = Math.abs(Math.sin(e)), o = this._getLabelSizes(), l = t.autoSkipPadding || 0, h = o ? o.widest.width + l : 0, c = o ? o.highest.height + l : 0;
    return this.isHorizontal() ? c * s > h * r ? h / s : c / r : c * r < h * s ? c / s : h / r;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const e = this.axis, s = this.chart, r = this.options, { grid: o, position: l, border: h } = r, c = o.offset, d = this.isHorizontal(), _ = this.ticks.length + (c ? 1 : 0), g = Xi(o), v = [], x = h.setContext(this.getContext()), b = x.display ? x.width : 0, M = b / 2, P = function($) {
      return Ke(s, $, b);
    };
    let S, O, A, T, I, D, B, N, G, Z, V, Mt;
    if (l === "top")
      S = P(this.bottom), D = this.bottom - g, N = S - M, Z = P(t.top) + M, Mt = t.bottom;
    else if (l === "bottom")
      S = P(this.top), Z = t.top, Mt = P(t.bottom) - M, D = S + M, N = this.top + g;
    else if (l === "left")
      S = P(this.right), I = this.right - g, B = S - M, G = P(t.left) + M, V = t.right;
    else if (l === "right")
      S = P(this.left), G = t.left, V = P(t.right) - M, I = S + M, B = this.left + g;
    else if (e === "x") {
      if (l === "center")
        S = P((t.top + t.bottom) / 2 + 0.5);
      else if (tt(l)) {
        const $ = Object.keys(l)[0], ct = l[$];
        S = P(this.chart.scales[$].getPixelForValue(ct));
      }
      Z = t.top, Mt = t.bottom, D = S + M, N = D + g;
    } else if (e === "y") {
      if (l === "center")
        S = P((t.left + t.right) / 2);
      else if (tt(l)) {
        const $ = Object.keys(l)[0], ct = l[$];
        S = P(this.chart.scales[$].getPixelForValue(ct));
      }
      I = S - M, B = I - g, G = t.left, V = t.right;
    }
    const at = q(r.ticks.maxTicksLimit, _), lt = Math.max(1, Math.ceil(_ / at));
    for (O = 0; O < _; O += lt) {
      const $ = this.getContext(O), ct = o.setContext($), H = h.setContext($), nt = ct.lineWidth, F = ct.color, K = H.dash || [], ht = H.dashOffset, vt = ct.tickWidth, ot = ct.tickColor, J = ct.tickBorderDash || [], U = ct.tickBorderDashOffset;
      A = vf(this, O, c), A !== void 0 && (T = Ke(s, A, nt), d ? I = B = G = V = T : D = N = Z = Mt = T, v.push({
        tx1: I,
        ty1: D,
        tx2: B,
        ty2: N,
        x1: G,
        y1: Z,
        x2: V,
        y2: Mt,
        width: nt,
        color: F,
        borderDash: K,
        borderDashOffset: ht,
        tickWidth: vt,
        tickColor: ot,
        tickBorderDash: J,
        tickBorderDashOffset: U
      }));
    }
    return this._ticksLength = _, this._borderValue = S, v;
  }
  _computeLabelItems(t) {
    const e = this.axis, s = this.options, { position: r, ticks: o } = s, l = this.isHorizontal(), h = this.ticks, { align: c, crossAlign: d, padding: p, mirror: _ } = o, g = Xi(s.grid), v = g + p, x = _ ? -p : v, b = -re(this.labelRotation), M = [];
    let P, S, O, A, T, I, D, B, N, G, Z, V, Mt = "middle";
    if (r === "top")
      I = this.bottom - x, D = this._getXAxisLabelAlignment();
    else if (r === "bottom")
      I = this.top + x, D = this._getXAxisLabelAlignment();
    else if (r === "left") {
      const lt = this._getYAxisLabelAlignment(g);
      D = lt.textAlign, T = lt.x;
    } else if (r === "right") {
      const lt = this._getYAxisLabelAlignment(g);
      D = lt.textAlign, T = lt.x;
    } else if (e === "x") {
      if (r === "center")
        I = (t.top + t.bottom) / 2 + v;
      else if (tt(r)) {
        const lt = Object.keys(r)[0], $ = r[lt];
        I = this.chart.scales[lt].getPixelForValue($) + v;
      }
      D = this._getXAxisLabelAlignment();
    } else if (e === "y") {
      if (r === "center")
        T = (t.left + t.right) / 2 - v;
      else if (tt(r)) {
        const lt = Object.keys(r)[0], $ = r[lt];
        T = this.chart.scales[lt].getPixelForValue($);
      }
      D = this._getYAxisLabelAlignment(g).textAlign;
    }
    e === "y" && (c === "start" ? Mt = "top" : c === "end" && (Mt = "bottom"));
    const at = this._getLabelSizes();
    for (P = 0, S = h.length; P < S; ++P) {
      O = h[P], A = O.label;
      const lt = o.setContext(this.getContext(P));
      B = this.getPixelForTick(P) + o.labelOffset, N = this._resolveTickFontOptions(P), G = N.lineHeight, Z = _t(A) ? A.length : 1;
      const $ = Z / 2, ct = lt.color, H = lt.textStrokeColor, nt = lt.textStrokeWidth;
      let F = D;
      l ? (T = B, D === "inner" && (P === S - 1 ? F = this.options.reverse ? "left" : "right" : P === 0 ? F = this.options.reverse ? "right" : "left" : F = "center"), r === "top" ? d === "near" || b !== 0 ? V = -Z * G + G / 2 : d === "center" ? V = -at.highest.height / 2 - $ * G + G : V = -at.highest.height + G / 2 : d === "near" || b !== 0 ? V = G / 2 : d === "center" ? V = at.highest.height / 2 - $ * G : V = at.highest.height - Z * G, _ && (V *= -1), b !== 0 && !lt.showLabelBackdrop && (T += G / 2 * Math.sin(b))) : (I = B, V = (1 - Z) * G / 2);
      let K;
      if (lt.showLabelBackdrop) {
        const ht = Nt(lt.backdropPadding), vt = at.heights[P], ot = at.widths[P];
        let J = V - ht.top, U = 0 - ht.left;
        switch (Mt) {
          case "middle":
            J -= vt / 2;
            break;
          case "bottom":
            J -= vt;
            break;
        }
        switch (D) {
          case "center":
            U -= ot / 2;
            break;
          case "right":
            U -= ot;
            break;
          case "inner":
            P === S - 1 ? U -= ot : P > 0 && (U -= ot / 2);
            break;
        }
        K = {
          left: U,
          top: J,
          width: ot + ht.width,
          height: vt + ht.height,
          color: lt.backdropColor
        };
      }
      M.push({
        label: A,
        font: N,
        textOffset: V,
        options: {
          rotation: b,
          color: ct,
          strokeColor: H,
          strokeWidth: nt,
          textAlign: F,
          textBaseline: Mt,
          translation: [
            T,
            I
          ],
          backdrop: K
        }
      });
    }
    return M;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: e } = this.options;
    if (-re(this.labelRotation))
      return t === "top" ? "left" : "right";
    let r = "center";
    return e.align === "start" ? r = "left" : e.align === "end" ? r = "right" : e.align === "inner" && (r = "inner"), r;
  }
  _getYAxisLabelAlignment(t) {
    const { position: e, ticks: { crossAlign: s, mirror: r, padding: o } } = this.options, l = this._getLabelSizes(), h = t + o, c = l.widest.width;
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
    const { ctx: t, options: { backgroundColor: e }, left: s, top: r, width: o, height: l } = this;
    e && (t.save(), t.fillStyle = e, t.fillRect(s, r, o, l), t.restore());
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
    let o, l;
    const h = (c, d, p) => {
      !p.width || !p.color || (s.save(), s.lineWidth = p.width, s.strokeStyle = p.color, s.setLineDash(p.borderDash || []), s.lineDashOffset = p.borderDashOffset, s.beginPath(), s.moveTo(c.x, c.y), s.lineTo(d.x, d.y), s.stroke(), s.restore());
    };
    if (e.display)
      for (o = 0, l = r.length; o < l; ++o) {
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
    const { chart: t, ctx: e, options: { border: s, grid: r } } = this, o = s.setContext(this.getContext()), l = s.display ? o.width : 0;
    if (!l)
      return;
    const h = r.setContext(this.getContext(0)).lineWidth, c = this._borderValue;
    let d, p, _, g;
    this.isHorizontal() ? (d = Ke(t, this.left, l) - l / 2, p = Ke(t, this.right, h) + h / 2, _ = g = c) : (_ = Ke(t, this.top, l) - l / 2, g = Ke(t, this.bottom, h) + h / 2, d = p = c), e.save(), e.lineWidth = o.width, e.strokeStyle = o.color, e.beginPath(), e.moveTo(d, _), e.lineTo(p, g), e.stroke(), e.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const s = this.ctx, r = this._computeLabelArea();
    r && Cs(s, r);
    const o = this.getLabelItems(t);
    for (const l of o) {
      const h = l.options, c = l.font, d = l.label, p = l.textOffset;
      ri(s, d, 0, p, c, h);
    }
    r && Ts(s);
  }
  drawTitle() {
    const { ctx: t, options: { position: e, title: s, reverse: r } } = this;
    if (!s.display)
      return;
    const o = Ot(s.font), l = Nt(s.padding), h = s.align;
    let c = o.lineHeight / 2;
    e === "bottom" || e === "center" || tt(e) ? (c += l.bottom, _t(s.text) && (c += o.lineHeight * (s.text.length - 1))) : c += l.top;
    const { titleX: d, titleY: p, maxWidth: _, rotation: g } = Lf(this, c, e, h);
    ri(t, s.text, 0, 0, o, {
      color: s.color,
      maxWidth: _,
      rotation: g,
      textAlign: wf(h, e, r),
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
    const t = this.options, e = t.ticks && t.ticks.z || 0, s = q(t.grid && t.grid.z, -1), r = q(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== ai.prototype.draw ? [
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
    let o, l;
    for (o = 0, l = e.length; o < l; ++o) {
      const h = e[o];
      h[s] === this.id && (!t || h.type === t) && r.push(h);
    }
    return r;
  }
  _resolveTickFontOptions(t) {
    const e = this.options.ticks.setContext(this.getContext(t));
    return Ot(e.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class is {
  constructor(t, e, s) {
    this.type = t, this.scope = e, this.override = s, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const e = Object.getPrototypeOf(t);
    let s;
    kf(e) && (s = this.register(e));
    const r = this.items, o = t.id, l = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in r || (r[o] = t, Mf(t, l, s), this.override && yt.override(t.id, t.overrides)), l;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const e = this.items, s = t.id, r = this.scope;
    s in e && delete e[s], r && s in yt[r] && (delete yt[r][s], this.override && delete oi[s]);
  }
}
function Mf(n, t, e) {
  const s = un(/* @__PURE__ */ Object.create(null), [
    e ? yt.get(e) : {},
    yt.get(t),
    n.defaults
  ]);
  yt.set(t, s), n.defaultRoutes && Pf(t, n.defaultRoutes), n.descriptors && yt.describe(t, n.descriptors);
}
function Pf(n, t) {
  Object.keys(t).forEach((e) => {
    const s = e.split("."), r = s.pop(), o = [
      n
    ].concat(s).join("."), l = t[e].split("."), h = l.pop(), c = l.join(".");
    yt.route(o, r, c, h);
  });
}
function kf(n) {
  return "id" in n && "defaults" in n;
}
class Sf {
  constructor() {
    this.controllers = new is(ae, "datasets", !0), this.elements = new is(Te, "elements"), this.plugins = new is(Object, "plugins"), this.scales = new is(ai, "scales"), this._typedRegistries = [
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
      s || o.isForType(r) || o === this.plugins && r.id ? this._exec(t, o, r) : ut(r, (l) => {
        const h = s || this._getRegistryForType(l);
        this._exec(t, h, l);
      });
    });
  }
  _exec(t, e, s) {
    const r = Fo(t);
    pt(s["before" + r], [], s), e[t](s), pt(s["after" + r], [], s);
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
var _e = /* @__PURE__ */ new Sf();
class Cf {
  constructor() {
    this._init = [];
  }
  notify(t, e, s, r) {
    e === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install"));
    const o = r ? this._descriptors(t).filter(r) : this._descriptors(t), l = this._notify(o, t, e, s);
    return e === "afterDestroy" && (this._notify(o, t, "stop"), this._notify(this._init, t, "uninstall")), l;
  }
  _notify(t, e, s, r) {
    r = r || {};
    for (const o of t) {
      const l = o.plugin, h = l[s], c = [
        e,
        r,
        o.options
      ];
      if (pt(h, c, l) === !1 && r.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    st(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const e = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), e;
  }
  _createDescriptors(t, e) {
    const s = t && t.config, r = q(s.options && s.options.plugins, {}), o = Tf(s);
    return r === !1 && !e ? [] : Af(t, o, r, e);
  }
  _notifyStateChanges(t) {
    const e = this._oldCache || [], s = this._cache, r = (o, l) => o.filter((h) => !l.some((c) => h.plugin.id === c.plugin.id));
    this._notify(r(e, s), t, "stop"), this._notify(r(s, e), t, "start");
  }
}
function Tf(n) {
  const t = {}, e = [], s = Object.keys(_e.plugins.items);
  for (let o = 0; o < s.length; o++)
    e.push(_e.getPlugin(s[o]));
  const r = n.plugins || [];
  for (let o = 0; o < r.length; o++) {
    const l = r[o];
    e.indexOf(l) === -1 && (e.push(l), t[l.id] = !0);
  }
  return {
    plugins: e,
    localIds: t
  };
}
function Of(n, t) {
  return !t && n === !1 ? null : n === !0 ? {} : n;
}
function Af(n, { plugins: t, localIds: e }, s, r) {
  const o = [], l = n.getContext();
  for (const h of t) {
    const c = h.id, d = Of(s[c], r);
    d !== null && o.push({
      plugin: h,
      options: Ef(n.config, {
        plugin: h,
        local: e[c]
      }, d, l)
    });
  }
  return o;
}
function Ef(n, { plugin: t, local: e }, s, r) {
  const o = n.pluginScopeKeys(t), l = n.getOptionScopes(s, o);
  return e && t.defaults && l.push(t.defaults), n.createResolver(l, r, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Lo(n, t) {
  const e = yt.datasets[n] || {};
  return ((t.datasets || {})[n] || {}).indexAxis || t.indexAxis || e.indexAxis || "x";
}
function If(n, t) {
  let e = n;
  return n === "_index_" ? e = t : n === "_value_" && (e = t === "x" ? "y" : "x"), e;
}
function Df(n, t) {
  return n === t ? "_index_" : "_value_";
}
function za(n) {
  if (n === "x" || n === "y" || n === "r")
    return n;
}
function zf(n) {
  if (n === "top" || n === "bottom")
    return "x";
  if (n === "left" || n === "right")
    return "y";
}
function Mo(n, ...t) {
  if (za(n))
    return n;
  for (const e of t) {
    const s = e.axis || zf(e.position) || n.length > 1 && za(n[0].toLowerCase());
    if (s)
      return s;
  }
  throw new Error(`Cannot determine type of '${n}' axis. Please provide 'axis' or 'position' option.`);
}
function Ba(n, t, e) {
  if (e[t + "AxisID"] === n)
    return {
      axis: t
    };
}
function Bf(n, t) {
  if (t.data && t.data.datasets) {
    const e = t.data.datasets.filter((s) => s.xAxisID === n || s.yAxisID === n);
    if (e.length)
      return Ba(n, "x", e[0]) || Ba(n, "y", e[0]);
  }
  return {};
}
function Rf(n, t) {
  const e = oi[n.type] || {
    scales: {}
  }, s = t.scales || {}, r = Lo(n.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(s).forEach((l) => {
    const h = s[l];
    if (!tt(h))
      return console.error(`Invalid scale configuration for scale: ${l}`);
    if (h._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${l}`);
    const c = Mo(l, h, Bf(l, n), yt.scales[h.type]), d = Df(c, r), p = e.scales || {};
    o[l] = on(/* @__PURE__ */ Object.create(null), [
      {
        axis: c
      },
      h,
      p[c],
      p[d]
    ]);
  }), n.data.datasets.forEach((l) => {
    const h = l.type || n.type, c = l.indexAxis || Lo(h, t), p = (oi[h] || {}).scales || {};
    Object.keys(p).forEach((_) => {
      const g = If(_, c), v = l[g + "AxisID"] || g;
      o[v] = o[v] || /* @__PURE__ */ Object.create(null), on(o[v], [
        {
          axis: g
        },
        s[v],
        p[_]
      ]);
    });
  }), Object.keys(o).forEach((l) => {
    const h = o[l];
    on(h, [
      yt.scales[h.type],
      yt.scale
    ]);
  }), o;
}
function Ql(n) {
  const t = n.options || (n.options = {});
  t.plugins = q(t.plugins, {}), t.scales = Rf(n, t);
}
function th(n) {
  return n = n || {}, n.datasets = n.datasets || [], n.labels = n.labels || [], n;
}
function Ff(n) {
  return n = n || {}, n.data = th(n.data), Ql(n), n;
}
const Ra = /* @__PURE__ */ new Map(), eh = /* @__PURE__ */ new Set();
function ns(n, t) {
  let e = Ra.get(n);
  return e || (e = t(), Ra.set(n, e), eh.add(e)), e;
}
const Ki = (n, t, e) => {
  const s = Ze(t, e);
  s !== void 0 && n.add(s);
};
class Nf {
  constructor(t) {
    this._config = Ff(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = th(t);
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
    this.clearCache(), Ql(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return ns(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, e) {
    return ns(`${t}.transition.${e}`, () => [
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
    return ns(`${t}-${e}`, () => [
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
    return ns(`${s}-plugin-${e}`, () => [
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
    const { options: r, type: o } = this, l = this._cachedScopes(t, s), h = l.get(e);
    if (h)
      return h;
    const c = /* @__PURE__ */ new Set();
    e.forEach((p) => {
      t && (c.add(t), p.forEach((_) => Ki(c, t, _))), p.forEach((_) => Ki(c, r, _)), p.forEach((_) => Ki(c, oi[o] || {}, _)), p.forEach((_) => Ki(c, yt, _)), p.forEach((_) => Ki(c, bo, _));
    });
    const d = Array.from(c);
    return d.length === 0 && d.push(/* @__PURE__ */ Object.create(null)), eh.has(e) && l.set(e, d), d;
  }
  chartOptionScopes() {
    const { options: t, type: e } = this;
    return [
      t,
      oi[e] || {},
      yt.datasets[e] || {},
      {
        type: e
      },
      yt,
      bo
    ];
  }
  resolveNamedOptions(t, e, s, r = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: l, subPrefixes: h } = Fa(this._resolverCache, t, r);
    let c = l;
    if (Hf(l, e)) {
      o.$shared = !1, s = He(s) ? s() : s;
      const d = this.createResolver(t, s, h);
      c = ki(l, s, d);
    }
    for (const d of e)
      o[d] = c[d];
    return o;
  }
  createResolver(t, e, s = [
    ""
  ], r) {
    const { resolver: o } = Fa(this._resolverCache, t, s);
    return tt(e) ? ki(o, e, void 0, r) : o;
  }
}
function Fa(n, t, e) {
  let s = n.get(t);
  s || (s = /* @__PURE__ */ new Map(), n.set(t, s));
  const r = e.join();
  let o = s.get(r);
  return o || (o = {
    resolver: jo(t, e),
    subPrefixes: e.filter((h) => !h.toLowerCase().includes("hover"))
  }, s.set(r, o)), o;
}
const Zf = (n) => tt(n) && Object.getOwnPropertyNames(n).some((t) => He(n[t]));
function Hf(n, t) {
  const { isScriptable: e, isIndexable: s } = Dl(n);
  for (const r of t) {
    const o = e(r), l = s(r), h = (l || o) && n[r];
    if (o && (He(h) || Zf(h)) || l && _t(h))
      return !0;
  }
  return !1;
}
var Wf = "4.4.7";
const Vf = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Na(n, t) {
  return n === "top" || n === "bottom" || Vf.indexOf(n) === -1 && t === "x";
}
function Za(n, t) {
  return function(e, s) {
    return e[n] === s[n] ? e[t] - s[t] : e[n] - s[n];
  };
}
function Ha(n) {
  const t = n.chart, e = t.options.animation;
  t.notifyPlugins("afterRender"), pt(e && e.onComplete, [
    n
  ], t);
}
function jf(n) {
  const t = n.chart, e = t.options.animation;
  pt(e && e.onProgress, [
    n
  ], t);
}
function ih(n) {
  return Yo() && typeof n == "string" ? n = document.getElementById(n) : n && n.length && (n = n[0]), n && n.canvas && (n = n.canvas), n;
}
const ms = {}, Wa = (n) => {
  const t = ih(n);
  return Object.values(ms).filter((e) => e.canvas === t).pop();
};
function Uf(n, t, e) {
  const s = Object.keys(n);
  for (const r of s) {
    const o = +r;
    if (o >= t) {
      const l = n[r];
      delete n[r], (e > 0 || o > t) && (n[o + e] = l);
    }
  }
}
function Gf(n, t, e, s) {
  return !e || n.type === "mouseout" ? null : s ? t : n;
}
function ss(n, t, e) {
  return n.options.clip ? n[e] : t[e];
}
function Yf(n, t) {
  const { xScale: e, yScale: s } = n;
  return e && s ? {
    left: ss(e, t, "left"),
    right: ss(e, t, "right"),
    top: ss(s, t, "top"),
    bottom: ss(s, t, "bottom")
  } : t;
}
class Pe {
  static register(...t) {
    _e.add(...t), Va();
  }
  static unregister(...t) {
    _e.remove(...t), Va();
  }
  constructor(t, e) {
    const s = this.config = new Nf(e), r = ih(t), o = Wa(r);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const l = s.createResolver(s.chartOptionScopes(), this.getContext());
    this.platform = new (s.platform || cf(r))(), this.platform.updateConfig(s);
    const h = this.platform.acquireContext(r, l.aspectRatio), c = h && h.canvas, d = c && c.height, p = c && c.width;
    if (this.id = qc(), this.ctx = h, this.canvas = c, this.width = p, this.height = d, this._options = l, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Cf(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = cu((_) => this.update(_), l.resizeDelay || 0), this._dataChanges = [], ms[this.id] = this, !h || !c) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    we.listen(this, "complete", Ha), we.listen(this, "progress", jf), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: e }, width: s, height: r, _aspectRatio: o } = this;
    return st(t) ? e && o ? o : r ? s / r : null : t;
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
    return _e;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : ua(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return la(this.canvas, this.ctx), this;
  }
  stop() {
    return we.stop(this), this;
  }
  resize(t, e) {
    we.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: e
    } : this._resize(t, e);
  }
  _resize(t, e) {
    const s = this.options, r = this.canvas, o = s.maintainAspectRatio && this.aspectRatio, l = this.platform.getMaximumSize(r, t, e, o), h = s.devicePixelRatio || this.platform.getDevicePixelRatio(), c = this.width ? "resize" : "attach";
    this.width = l.width, this.height = l.height, this._aspectRatio = this.aspectRatio, ua(this, h, !0) && (this.notifyPlugins("resize", {
      size: l
    }), pt(s.onResize, [
      this,
      l
    ], this), this.attached && this._doResize(c) && this.render());
  }
  ensureScalesHaveIDs() {
    const e = this.options.scales || {};
    ut(e, (s, r) => {
      s.id = r;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, e = t.scales, s = this.scales, r = Object.keys(s).reduce((l, h) => (l[h] = !1, l), {});
    let o = [];
    e && (o = o.concat(Object.keys(e).map((l) => {
      const h = e[l], c = Mo(l, h), d = c === "r", p = c === "x";
      return {
        options: h,
        dposition: d ? "chartArea" : p ? "bottom" : "left",
        dtype: d ? "radialLinear" : p ? "category" : "linear"
      };
    }))), ut(o, (l) => {
      const h = l.options, c = h.id, d = Mo(c, h), p = q(h.type, l.dtype);
      (h.position === void 0 || Na(h.position, d) !== Na(l.dposition)) && (h.position = l.dposition), r[c] = !0;
      let _ = null;
      if (c in s && s[c].type === p)
        _ = s[c];
      else {
        const g = _e.getScale(p);
        _ = new g({
          id: c,
          type: p,
          ctx: this.ctx,
          chart: this
        }), s[_.id] = _;
      }
      _.init(h, t);
    }), ut(r, (l, h) => {
      l || delete s[h];
    }), ut(s, (l) => {
      Ft.configure(this, l, l.options), Ft.addBox(this, l);
    });
  }
  _updateMetasets() {
    const t = this._metasets, e = this.data.datasets.length, s = t.length;
    if (t.sort((r, o) => r.index - o.index), s > e) {
      for (let r = e; r < s; ++r)
        this._destroyDatasetMeta(r);
      t.splice(e, s - e);
    }
    this._sortedMetasets = t.slice(0).sort(Za("order", "index"));
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
      let l = this.getDatasetMeta(s);
      const h = o.type || this.config.type;
      if (l.type && l.type !== h && (this._destroyDatasetMeta(s), l = this.getDatasetMeta(s)), l.type = h, l.indexAxis = o.indexAxis || Lo(h, this.options), l.order = o.order || 0, l.index = s, l.label = "" + o.label, l.visible = this.isDatasetVisible(s), l.controller)
        l.controller.updateIndex(s), l.controller.linkScales();
      else {
        const c = _e.getController(h), { datasetElementType: d, dataElementType: p } = yt.datasets[h];
        Object.assign(c, {
          dataElementType: _e.getElement(p),
          datasetElementType: d && _e.getElement(d)
        }), l.controller = new c(this, s), t.push(l.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    ut(this.data.datasets, (t, e) => {
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
    let l = 0;
    for (let d = 0, p = this.data.datasets.length; d < p; d++) {
      const { controller: _ } = this.getDatasetMeta(d), g = !r && o.indexOf(_) === -1;
      _.buildOrUpdateElements(g), l = Math.max(+_.getMaxOverflow(), l);
    }
    l = this._minPadding = s.layout.autoPadding ? l : 0, this._updateLayout(l), r || ut(o, (d) => {
      d.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(Za("z", "_idx"));
    const { _active: h, _lastEvent: c } = this;
    c ? this._eventHandler(c, !0) : h.length && this._updateHoverStyles(h, h, !0), this.render();
  }
  _updateScales() {
    ut(this.scales, (t) => {
      Ft.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, e = new Set(Object.keys(this._listeners)), s = new Set(t.events);
    (!Qr(e, s) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, e = this._getUniformDataChanges() || [];
    for (const { method: s, start: r, count: o } of e) {
      const l = s === "_removeElements" ? -o : o;
      Uf(t, r, l);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const e = this.data.datasets.length, s = (o) => new Set(t.filter((l) => l[0] === o).map((l, h) => h + "," + l.splice(1).join(","))), r = s(0);
    for (let o = 1; o < e; o++)
      if (!Qr(r, s(o)))
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
    Ft.update(this, this.width, this.height, t);
    const e = this.chartArea, s = e.width <= 0 || e.height <= 0;
    this._layers = [], ut(this.boxes, (r) => {
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
    }) !== !1 && (we.has(this) ? this.attached && !we.running(this) && we.start(this) : (this.draw(), Ha({
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
      const l = e[r];
      (!t || l.visible) && s.push(l);
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
    const e = this.ctx, s = t._clip, r = !s.disabled, o = Yf(t, this.chartArea), l = {
      meta: t,
      index: t.index,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetDraw", l) !== !1 && (r && Cs(e, {
      left: s.left === !1 ? 0 : o.left - s.left,
      right: s.right === !1 ? this.width : o.right + s.right,
      top: s.top === !1 ? 0 : o.top - s.top,
      bottom: s.bottom === !1 ? this.height : o.bottom + s.bottom
    }), t.controller.draw(), r && Ts(e), l.cancelable = !1, this.notifyPlugins("afterDatasetDraw", l));
  }
  isPointInArea(t) {
    return Ce(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, e, s, r) {
    const o = Wd.modes[e];
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
    const r = s ? "show" : "hide", o = this.getDatasetMeta(t), l = o.controller._resolveAnimations(void 0, r);
    dn(e) ? (o.data[e].hidden = !s, this.update()) : (this.setDatasetVisibility(t, s), l.update(o, {
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
    for (this.stop(), we.remove(this), t = 0, e = this.data.datasets.length; t < e; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: e } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), la(t, e), this.platform.releaseContext(e), this.canvas = null, this.ctx = null), delete ms[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, e = this.platform, s = (o, l) => {
      e.addEventListener(this, o, l), t[o] = l;
    }, r = (o, l, h) => {
      o.offsetX = l, o.offsetY = h, this._eventHandler(o);
    };
    ut(this.options.events, (o) => s(o, r));
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
    let l;
    const h = () => {
      r("attach", h), this.attached = !0, this.resize(), s("resize", o), s("detach", l);
    };
    l = () => {
      this.attached = !1, r("resize", o), this._stop(), this._resize(0, 0), s("attach", h);
    }, e.isAttached(this.canvas) ? h() : l();
  }
  unbindEvents() {
    ut(this._listeners, (t, e) => {
      this.platform.removeEventListener(this, e, t);
    }), this._listeners = {}, ut(this._responsiveListeners, (t, e) => {
      this.platform.removeEventListener(this, e, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, e, s) {
    const r = s ? "set" : "remove";
    let o, l, h, c;
    for (e === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + r + "DatasetHoverStyle"]()), h = 0, c = t.length; h < c; ++h) {
      l = t[h];
      const d = l && this.getDatasetMeta(l.datasetIndex).controller;
      d && d[r + "HoverStyle"](l.element, l.datasetIndex, l.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const e = this._active || [], s = t.map(({ datasetIndex: o, index: l }) => {
      const h = this.getDatasetMeta(o);
      if (!h)
        throw new Error("No dataset found at index " + o);
      return {
        datasetIndex: o,
        element: h.data[l],
        index: l
      };
    });
    !ys(s, e) && (this._active = s, this._lastEvent = null, this._updateHoverStyles(s, e));
  }
  notifyPlugins(t, e, s) {
    return this._plugins.notify(this, t, e, s);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((e) => e.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, e, s) {
    const r = this.options.hover, o = (c, d) => c.filter((p) => !d.some((_) => p.datasetIndex === _.datasetIndex && p.index === _.index)), l = o(e, t), h = s ? t : o(t, e);
    l.length && this.updateHoverStyle(l, r.mode, !1), h.length && r.mode && this.updateHoverStyle(h, r.mode, !0);
  }
  _eventHandler(t, e) {
    const s = {
      event: t,
      replay: e,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, r = (l) => (l.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", s, r) === !1)
      return;
    const o = this._handleEvent(t, e, s.inChartArea);
    return s.cancelable = !1, this.notifyPlugins("afterEvent", s, r), (o || s.changed) && this.render(), this;
  }
  _handleEvent(t, e, s) {
    const { _active: r = [], options: o } = this, l = e, h = this._getActiveElements(t, r, s, l), c = tu(t), d = Gf(t, this._lastEvent, s, c);
    s && (this._lastEvent = null, pt(o.onHover, [
      t,
      h,
      this
    ], this), c && pt(o.onClick, [
      t,
      h,
      this
    ], this));
    const p = !ys(h, r);
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
z(Pe, "defaults", yt), z(Pe, "instances", ms), z(Pe, "overrides", oi), z(Pe, "registry", _e), z(Pe, "version", Wf), z(Pe, "getChart", Wa);
function Va() {
  return ut(Pe.instances, (n) => n._plugins.invalidate());
}
function qf(n, t, e) {
  const { startAngle: s, pixelMargin: r, x: o, y: l, outerRadius: h, innerRadius: c } = t;
  let d = r / h;
  n.beginPath(), n.arc(o, l, h, s - d, e + d), c > r ? (d = r / c, n.arc(o, l, c, e + d, s - d, !0)) : n.arc(o, l, r, e + kt, s - kt), n.closePath(), n.clip();
}
function $f(n) {
  return Vo(n, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Xf(n, t, e, s) {
  const r = $f(n.options.borderRadius), o = (e - t) / 2, l = Math.min(o, s * t / 2), h = (c) => {
    const d = (e - Math.min(o, c)) * s / 2;
    return Dt(c, 0, Math.min(o, d));
  };
  return {
    outerStart: h(r.outerStart),
    outerEnd: h(r.outerEnd),
    innerStart: Dt(r.innerStart, 0, l),
    innerEnd: Dt(r.innerEnd, 0, l)
  };
}
function Li(n, t, e, s) {
  return {
    x: e + n * Math.cos(t),
    y: s + n * Math.sin(t)
  };
}
function Ps(n, t, e, s, r, o) {
  const { x: l, y: h, startAngle: c, pixelMargin: d, innerRadius: p } = t, _ = Math.max(t.outerRadius + s + e - d, 0), g = p > 0 ? p + s + e + d : 0;
  let v = 0;
  const x = r - c;
  if (s) {
    const lt = p > 0 ? p - s : 0, $ = _ > 0 ? _ - s : 0, ct = (lt + $) / 2, H = ct !== 0 ? x * ct / (ct + s) : x;
    v = (x - H) / 2;
  }
  const b = Math.max(1e-3, x * _ - e / gt) / _, M = (x - b) / 2, P = c + M + v, S = r - M - v, { outerStart: O, outerEnd: A, innerStart: T, innerEnd: I } = Xf(t, g, _, S - P), D = _ - O, B = _ - A, N = P + O / D, G = S - A / B, Z = g + T, V = g + I, Mt = P + T / Z, at = S - I / V;
  if (n.beginPath(), o) {
    const lt = (N + G) / 2;
    if (n.arc(l, h, _, N, lt), n.arc(l, h, _, lt, G), A > 0) {
      const nt = Li(B, G, l, h);
      n.arc(nt.x, nt.y, A, G, S + kt);
    }
    const $ = Li(V, S, l, h);
    if (n.lineTo($.x, $.y), I > 0) {
      const nt = Li(V, at, l, h);
      n.arc(nt.x, nt.y, I, S + kt, at + Math.PI);
    }
    const ct = (S - I / g + (P + T / g)) / 2;
    if (n.arc(l, h, g, S - I / g, ct, !0), n.arc(l, h, g, ct, P + T / g, !0), T > 0) {
      const nt = Li(Z, Mt, l, h);
      n.arc(nt.x, nt.y, T, Mt + Math.PI, P - kt);
    }
    const H = Li(D, P, l, h);
    if (n.lineTo(H.x, H.y), O > 0) {
      const nt = Li(D, N, l, h);
      n.arc(nt.x, nt.y, O, P - kt, N);
    }
  } else {
    n.moveTo(l, h);
    const lt = Math.cos(N) * _ + l, $ = Math.sin(N) * _ + h;
    n.lineTo(lt, $);
    const ct = Math.cos(G) * _ + l, H = Math.sin(G) * _ + h;
    n.lineTo(ct, H);
  }
  n.closePath();
}
function Kf(n, t, e, s, r) {
  const { fullCircles: o, startAngle: l, circumference: h } = t;
  let c = t.endAngle;
  if (o) {
    Ps(n, t, e, s, c, r);
    for (let d = 0; d < o; ++d)
      n.fill();
    isNaN(h) || (c = l + (h % mt || mt));
  }
  return Ps(n, t, e, s, c, r), n.fill(), c;
}
function Jf(n, t, e, s, r) {
  const { fullCircles: o, startAngle: l, circumference: h, options: c } = t, { borderWidth: d, borderJoinStyle: p, borderDash: _, borderDashOffset: g } = c, v = c.borderAlign === "inner";
  if (!d)
    return;
  n.setLineDash(_ || []), n.lineDashOffset = g, v ? (n.lineWidth = d * 2, n.lineJoin = p || "round") : (n.lineWidth = d, n.lineJoin = p || "bevel");
  let x = t.endAngle;
  if (o) {
    Ps(n, t, e, s, x, r);
    for (let b = 0; b < o; ++b)
      n.stroke();
    isNaN(h) || (x = l + (h % mt || mt));
  }
  v && qf(n, t, x), o || (Ps(n, t, e, s, x, r), n.stroke());
}
class en extends Te {
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
    ], r), { angle: l, distance: h } = Ml(o, {
      x: e,
      y: s
    }), { startAngle: c, endAngle: d, innerRadius: p, outerRadius: _, circumference: g } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], r), v = (this.options.spacing + this.options.borderWidth) / 2, x = q(g, d - c), b = fn(l, c, d) && c !== d, M = x >= mt || b, P = ke(h, p + v, _ + v);
    return M && P;
  }
  getCenterPoint(e) {
    const { x: s, y: r, startAngle: o, endAngle: l, innerRadius: h, outerRadius: c } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], e), { offset: d, spacing: p } = this.options, _ = (o + l) / 2, g = (h + c + p + d) / 2;
    return {
      x: s + Math.cos(_) * g,
      y: r + Math.sin(_) * g
    };
  }
  tooltipPosition(e) {
    return this.getCenterPoint(e);
  }
  draw(e) {
    const { options: s, circumference: r } = this, o = (s.offset || 0) / 4, l = (s.spacing || 0) / 2, h = s.circular;
    if (this.pixelMargin = s.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = r > mt ? Math.floor(r / mt) : 0, r === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    e.save();
    const c = (this.startAngle + this.endAngle) / 2;
    e.translate(Math.cos(c) * o, Math.sin(c) * o);
    const d = 1 - Math.sin(Math.min(gt, r || 0)), p = o * d;
    e.fillStyle = s.backgroundColor, e.strokeStyle = s.borderColor, Kf(e, this, p, l, h), Jf(e, this, p, l, h), e.restore();
  }
}
z(en, "id", "arc"), z(en, "defaults", {
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
}), z(en, "defaultRoutes", {
  backgroundColor: "backgroundColor"
}), z(en, "descriptors", {
  _scriptable: !0,
  _indexable: (e) => e !== "borderDash"
});
function nh(n, t, e = t) {
  n.lineCap = q(e.borderCapStyle, t.borderCapStyle), n.setLineDash(q(e.borderDash, t.borderDash)), n.lineDashOffset = q(e.borderDashOffset, t.borderDashOffset), n.lineJoin = q(e.borderJoinStyle, t.borderJoinStyle), n.lineWidth = q(e.borderWidth, t.borderWidth), n.strokeStyle = q(e.borderColor, t.borderColor);
}
function Qf(n, t, e) {
  n.lineTo(e.x, e.y);
}
function tp(n) {
  return n.stepped ? wu : n.tension || n.cubicInterpolationMode === "monotone" ? Lu : Qf;
}
function sh(n, t, e = {}) {
  const s = n.length, { start: r = 0, end: o = s - 1 } = e, { start: l, end: h } = t, c = Math.max(r, l), d = Math.min(o, h), p = r < l && o < l || r > h && o > h;
  return {
    count: s,
    start: c,
    loop: t.loop,
    ilen: d < c && !p ? s + d - c : d - c
  };
}
function ep(n, t, e, s) {
  const { points: r, options: o } = t, { count: l, start: h, loop: c, ilen: d } = sh(r, e, s), p = tp(o);
  let { move: _ = !0, reverse: g } = s || {}, v, x, b;
  for (v = 0; v <= d; ++v)
    x = r[(h + (g ? d - v : v)) % l], !x.skip && (_ ? (n.moveTo(x.x, x.y), _ = !1) : p(n, b, x, g, o.stepped), b = x);
  return c && (x = r[(h + (g ? d : 0)) % l], p(n, b, x, g, o.stepped)), !!c;
}
function ip(n, t, e, s) {
  const r = t.points, { count: o, start: l, ilen: h } = sh(r, e, s), { move: c = !0, reverse: d } = s || {};
  let p = 0, _ = 0, g, v, x, b, M, P;
  const S = (A) => (l + (d ? h - A : A)) % o, O = () => {
    b !== M && (n.lineTo(p, M), n.lineTo(p, b), n.lineTo(p, P));
  };
  for (c && (v = r[S(0)], n.moveTo(v.x, v.y)), g = 0; g <= h; ++g) {
    if (v = r[S(g)], v.skip)
      continue;
    const A = v.x, T = v.y, I = A | 0;
    I === x ? (T < b ? b = T : T > M && (M = T), p = (_ * p + A) / ++_) : (O(), n.lineTo(A, T), x = I, _ = 0, b = M = T), P = T;
  }
  O();
}
function Po(n) {
  const t = n.options, e = t.borderDash && t.borderDash.length;
  return !n._decimated && !n._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !e ? ip : ep;
}
function np(n) {
  return n.stepped ? ed : n.tension || n.cubicInterpolationMode === "monotone" ? id : ei;
}
function sp(n, t, e, s) {
  let r = t._path;
  r || (r = t._path = new Path2D(), t.path(r, e, s) && r.closePath()), nh(n, t.options), n.stroke(r);
}
function op(n, t, e, s) {
  const { segments: r, options: o } = t, l = Po(t);
  for (const h of r)
    nh(n, o, h.style), n.beginPath(), l(n, t, h, {
      start: e,
      end: e + s - 1
    }) && n.closePath(), n.stroke();
}
const rp = typeof Path2D == "function";
function ap(n, t, e, s) {
  rp && !t.options.segment ? sp(n, t, e, s) : op(n, t, e, s);
}
class Re extends Te {
  constructor(t) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, t && Object.assign(this, t);
  }
  updateControlPoints(t, e) {
    const s = this.options;
    if ((s.tension || s.cubicInterpolationMode === "monotone") && !s.stepped && !this._pointsUpdated) {
      const r = s.spanGaps ? this._loop : this._fullLoop;
      Yu(this._points, s, t, r, e), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = ld(this, this.options.segment));
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
    const s = this.options, r = t[e], o = this.points, l = jl(this, {
      property: e,
      start: r,
      end: r
    });
    if (!l.length)
      return;
    const h = [], c = np(s);
    let d, p;
    for (d = 0, p = l.length; d < p; ++d) {
      const { start: _, end: g } = l[d], v = o[_], x = o[g];
      if (v === x) {
        h.push(v);
        continue;
      }
      const b = Math.abs((r - v[e]) / (x[e] - v[e])), M = c(v, x, b, s.stepped);
      M[e] = t[e], h.push(M);
    }
    return h.length === 1 ? h[0] : h;
  }
  pathSegment(t, e, s) {
    return Po(this)(t, this, e, s);
  }
  path(t, e, s) {
    const r = this.segments, o = Po(this);
    let l = this._loop;
    e = e || 0, s = s || this.points.length - e;
    for (const h of r)
      l &= o(t, this, h, {
        start: e,
        end: e + s - 1
      });
    return !!l;
  }
  draw(t, e, s, r) {
    const o = this.options || {};
    (this.points || []).length && o.borderWidth && (t.save(), ap(t, this, s, r), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
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
function ja(n, t, e, s) {
  const r = n.options, { [e]: o } = n.getProps([
    e
  ], s);
  return Math.abs(t - o) < r.radius + r.hitRadius;
}
class gs extends Te {
  constructor(e) {
    super();
    z(this, "parsed");
    z(this, "skip");
    z(this, "stop");
    this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, e && Object.assign(this, e);
  }
  inRange(e, s, r) {
    const o = this.options, { x: l, y: h } = this.getProps([
      "x",
      "y"
    ], r);
    return Math.pow(e - l, 2) + Math.pow(s - h, 2) < Math.pow(o.hitRadius + o.radius, 2);
  }
  inXRange(e, s) {
    return ja(this, e, "x", s);
  }
  inYRange(e, s) {
    return ja(this, e, "y", s);
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
    this.skip || r.radius < 0.1 || !Ce(this, s, this.size(r) / 2) || (e.strokeStyle = r.borderColor, e.lineWidth = r.borderWidth, e.fillStyle = r.backgroundColor, xo(e, r, this.x, this.y));
  }
  getRange() {
    const e = this.options || {};
    return e.radius + e.hitRadius;
  }
}
z(gs, "id", "point"), /**
* @type {any}
*/
z(gs, "defaults", {
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
z(gs, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
function oh(n, t) {
  const { x: e, y: s, base: r, width: o, height: l } = n.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let h, c, d, p, _;
  return n.horizontal ? (_ = l / 2, h = Math.min(e, r), c = Math.max(e, r), d = s - _, p = s + _) : (_ = o / 2, h = e - _, c = e + _, d = Math.min(s, r), p = Math.max(s, r)), {
    left: h,
    top: d,
    right: c,
    bottom: p
  };
}
function Fe(n, t, e, s) {
  return n ? 0 : Dt(t, e, s);
}
function lp(n, t, e) {
  const s = n.options.borderWidth, r = n.borderSkipped, o = Il(s);
  return {
    t: Fe(r.top, o.top, 0, e),
    r: Fe(r.right, o.right, 0, t),
    b: Fe(r.bottom, o.bottom, 0, e),
    l: Fe(r.left, o.left, 0, t)
  };
}
function hp(n, t, e) {
  const { enableBorderRadius: s } = n.getProps([
    "enableBorderRadius"
  ]), r = n.options.borderRadius, o = ni(r), l = Math.min(t, e), h = n.borderSkipped, c = s || tt(r);
  return {
    topLeft: Fe(!c || h.top || h.left, o.topLeft, 0, l),
    topRight: Fe(!c || h.top || h.right, o.topRight, 0, l),
    bottomLeft: Fe(!c || h.bottom || h.left, o.bottomLeft, 0, l),
    bottomRight: Fe(!c || h.bottom || h.right, o.bottomRight, 0, l)
  };
}
function cp(n) {
  const t = oh(n), e = t.right - t.left, s = t.bottom - t.top, r = lp(n, e / 2, s / 2), o = hp(n, e / 2, s / 2);
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
function _o(n, t, e, s) {
  const r = t === null, o = e === null, h = n && !(r && o) && oh(n, s);
  return h && (r || ke(t, h.left, h.right)) && (o || ke(e, h.top, h.bottom));
}
function up(n) {
  return n.topLeft || n.topRight || n.bottomLeft || n.bottomRight;
}
function dp(n, t) {
  n.rect(t.x, t.y, t.w, t.h);
}
function mo(n, t, e = {}) {
  const s = n.x !== e.x ? -t : 0, r = n.y !== e.y ? -t : 0, o = (n.x + n.w !== e.x + e.w ? t : 0) - s, l = (n.y + n.h !== e.y + e.h ? t : 0) - r;
  return {
    x: n.x + s,
    y: n.y + r,
    w: n.w + o,
    h: n.h + l,
    radius: n.radius
  };
}
class vs extends Te {
  constructor(t) {
    super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, t && Object.assign(this, t);
  }
  draw(t) {
    const { inflateAmount: e, options: { borderColor: s, backgroundColor: r } } = this, { inner: o, outer: l } = cp(this), h = up(l.radius) ? pn : dp;
    t.save(), (l.w !== o.w || l.h !== o.h) && (t.beginPath(), h(t, mo(l, e, o)), t.clip(), h(t, mo(o, -e, l)), t.fillStyle = s, t.fill("evenodd")), t.beginPath(), h(t, mo(o, e)), t.fillStyle = r, t.fill(), t.restore();
  }
  inRange(t, e, s) {
    return _o(this, t, e, s);
  }
  inXRange(t, e) {
    return _o(this, t, null, e);
  }
  inYRange(t, e) {
    return _o(this, null, t, e);
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
z(vs, "id", "bar"), z(vs, "defaults", {
  borderSkipped: "start",
  borderWidth: 0,
  borderRadius: 0,
  inflateAmount: "auto",
  pointStyle: void 0
}), z(vs, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
var fp = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcElement: en,
  BarElement: vs,
  LineElement: Re,
  PointElement: gs
});
const ko = [
  "rgb(54, 162, 235)",
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)"
  // grey
], Ua = /* @__PURE__ */ ko.map((n) => n.replace("rgb(", "rgba(").replace(")", ", 0.5)"));
function rh(n) {
  return ko[n % ko.length];
}
function ah(n) {
  return Ua[n % Ua.length];
}
function pp(n, t) {
  return n.borderColor = rh(t), n.backgroundColor = ah(t), ++t;
}
function _p(n, t) {
  return n.backgroundColor = n.data.map(() => rh(t++)), t;
}
function mp(n, t) {
  return n.backgroundColor = n.data.map(() => ah(t++)), t;
}
function gp(n) {
  let t = 0;
  return (e, s) => {
    const r = n.getDatasetMeta(s).controller;
    r instanceof ii ? t = _p(e, t) : r instanceof hn ? t = mp(e, t) : r && (t = pp(e, t));
  };
}
function Ga(n) {
  let t;
  for (t in n)
    if (n[t].borderColor || n[t].backgroundColor)
      return !0;
  return !1;
}
function vp(n) {
  return n && (n.borderColor || n.backgroundColor);
}
function yp() {
  return yt.borderColor !== "rgba(0,0,0,0.1)" || yt.backgroundColor !== "rgba(0,0,0,0.1)";
}
var bp = {
  id: "colors",
  defaults: {
    enabled: !0,
    forceOverride: !1
  },
  beforeLayout(n, t, e) {
    if (!e.enabled)
      return;
    const { data: { datasets: s }, options: r } = n.config, { elements: o } = r, l = Ga(s) || vp(r) || o && Ga(o) || yp();
    if (!e.forceOverride && l)
      return;
    const h = gp(n);
    s.forEach(h);
  }
};
function xp(n, t, e, s, r) {
  const o = r.samples || s;
  if (o >= e)
    return n.slice(t, t + e);
  const l = [], h = (e - 2) / (o - 2);
  let c = 0;
  const d = t + e - 1;
  let p = t, _, g, v, x, b;
  for (l[c++] = n[p], _ = 0; _ < o - 2; _++) {
    let M = 0, P = 0, S;
    const O = Math.floor((_ + 1) * h) + 1 + t, A = Math.min(Math.floor((_ + 2) * h) + 1, e) + t, T = A - O;
    for (S = O; S < A; S++)
      M += n[S].x, P += n[S].y;
    M /= T, P /= T;
    const I = Math.floor(_ * h) + 1 + t, D = Math.min(Math.floor((_ + 1) * h) + 1, e) + t, { x: B, y: N } = n[p];
    for (v = x = -1, S = I; S < D; S++)
      x = 0.5 * Math.abs((B - M) * (n[S].y - N) - (B - n[S].x) * (P - N)), x > v && (v = x, g = n[S], b = S);
    l[c++] = g, p = b;
  }
  return l[c++] = n[d], l;
}
function wp(n, t, e, s) {
  let r = 0, o = 0, l, h, c, d, p, _, g, v, x, b;
  const M = [], P = t + e - 1, S = n[t].x, A = n[P].x - S;
  for (l = t; l < t + e; ++l) {
    h = n[l], c = (h.x - S) / A * s, d = h.y;
    const T = c | 0;
    if (T === p)
      d < x ? (x = d, _ = l) : d > b && (b = d, g = l), r = (o * r + h.x) / ++o;
    else {
      const I = l - 1;
      if (!st(_) && !st(g)) {
        const D = Math.min(_, g), B = Math.max(_, g);
        D !== v && D !== I && M.push({
          ...n[D],
          x: r
        }), B !== v && B !== I && M.push({
          ...n[B],
          x: r
        });
      }
      l > 0 && I !== v && M.push(n[I]), M.push(h), p = T, o = 0, x = b = d, _ = g = v = l;
    }
  }
  return M;
}
function lh(n) {
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
function Ya(n) {
  n.data.datasets.forEach((t) => {
    lh(t);
  });
}
function Lp(n, t) {
  const e = t.length;
  let s = 0, r;
  const { iScale: o } = n, { min: l, max: h, minDefined: c, maxDefined: d } = o.getUserBounds();
  return c && (s = Dt(Se(t, o.axis, l).lo, 0, e - 1)), d ? r = Dt(Se(t, o.axis, h).hi + 1, s, e) - s : r = e - s, {
    start: s,
    count: r
  };
}
var Mp = {
  id: "decimation",
  defaults: {
    algorithm: "min-max",
    enabled: !1
  },
  beforeElementsUpdate: (n, t, e) => {
    if (!e.enabled) {
      Ya(n);
      return;
    }
    const s = n.width;
    n.data.datasets.forEach((r, o) => {
      const { _data: l, indexAxis: h } = r, c = n.getDatasetMeta(o), d = l || r.data;
      if (Qi([
        h,
        n.options.indexAxis
      ]) === "y" || !c.controller.supportsDecimation)
        return;
      const p = n.scales[c.xAxisID];
      if (p.type !== "linear" && p.type !== "time" || n.options.parsing)
        return;
      let { start: _, count: g } = Lp(c, d);
      const v = e.threshold || 4 * s;
      if (g <= v) {
        lh(r);
        return;
      }
      st(l) && (r._data = d, delete r.data, Object.defineProperty(r, "data", {
        configurable: !0,
        enumerable: !0,
        get: function() {
          return this._decimated;
        },
        set: function(b) {
          this._data = b;
        }
      }));
      let x;
      switch (e.algorithm) {
        case "lttb":
          x = xp(d, _, g, s, e);
          break;
        case "min-max":
          x = wp(d, _, g, s);
          break;
        default:
          throw new Error(`Unsupported decimation algorithm '${e.algorithm}'`);
      }
      r._decimated = x;
    });
  },
  destroy(n) {
    Ya(n);
  }
};
function Pp(n, t, e) {
  const s = n.segments, r = n.points, o = t.points, l = [];
  for (const h of s) {
    let { start: c, end: d } = h;
    d = Xo(c, d, r);
    const p = So(e, r[c], r[d], h.loop);
    if (!t.segments) {
      l.push({
        source: h,
        target: p,
        start: r[c],
        end: r[d]
      });
      continue;
    }
    const _ = jl(t, p);
    for (const g of _) {
      const v = So(e, o[g.start], o[g.end], g.loop), x = Vl(h, r, v);
      for (const b of x)
        l.push({
          source: b,
          target: g,
          start: {
            [e]: qa(p, v, "start", Math.max)
          },
          end: {
            [e]: qa(p, v, "end", Math.min)
          }
        });
    }
  }
  return l;
}
function So(n, t, e, s) {
  if (s)
    return;
  let r = t[n], o = e[n];
  return n === "angle" && (r = Xt(r), o = Xt(o)), {
    property: n,
    start: r,
    end: o
  };
}
function kp(n, t) {
  const { x: e = null, y: s = null } = n || {}, r = t.points, o = [];
  return t.segments.forEach(({ start: l, end: h }) => {
    h = Xo(l, h, r);
    const c = r[l], d = r[h];
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
function Xo(n, t, e) {
  for (; t > n; t--) {
    const s = e[t];
    if (!isNaN(s.x) && !isNaN(s.y))
      break;
  }
  return t;
}
function qa(n, t, e, s) {
  return n && t ? s(n[e], t[e]) : n ? n[e] : t ? t[e] : 0;
}
function hh(n, t) {
  let e = [], s = !1;
  return _t(n) ? (s = !0, e = n) : e = kp(n, t), e.length ? new Re({
    points: e,
    options: {
      tension: 0
    },
    _loop: s,
    _fullLoop: s
  }) : null;
}
function $a(n) {
  return n && n.fill !== !1;
}
function Sp(n, t, e) {
  let r = n[t].fill;
  const o = [
    t
  ];
  let l;
  if (!e)
    return r;
  for (; r !== !1 && o.indexOf(r) === -1; ) {
    if (!Lt(r))
      return r;
    if (l = n[r], !l)
      return !1;
    if (l.visible)
      return r;
    o.push(r), r = l.fill;
  }
  return !1;
}
function Cp(n, t, e) {
  const s = Ep(n);
  if (tt(s))
    return isNaN(s.value) ? !1 : s;
  let r = parseFloat(s);
  return Lt(r) && Math.floor(r) === r ? Tp(s[0], t, r, e) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(s) >= 0 && s;
}
function Tp(n, t, e, s) {
  return (n === "-" || n === "+") && (e = t + e), e === t || e < 0 || e >= s ? !1 : e;
}
function Op(n, t) {
  let e = null;
  return n === "start" ? e = t.bottom : n === "end" ? e = t.top : tt(n) ? e = t.getPixelForValue(n.value) : t.getBasePixel && (e = t.getBasePixel()), e;
}
function Ap(n, t, e) {
  let s;
  return n === "start" ? s = e : n === "end" ? s = t.options.reverse ? t.min : t.max : tt(n) ? s = n.value : s = t.getBaseValue(), s;
}
function Ep(n) {
  const t = n.options, e = t.fill;
  let s = q(e && e.target, e);
  return s === void 0 && (s = !!t.backgroundColor), s === !1 || s === null ? !1 : s === !0 ? "origin" : s;
}
function Ip(n) {
  const { scale: t, index: e, line: s } = n, r = [], o = s.segments, l = s.points, h = Dp(t, e);
  h.push(hh({
    x: null,
    y: t.bottom
  }, s));
  for (let c = 0; c < o.length; c++) {
    const d = o[c];
    for (let p = d.start; p <= d.end; p++)
      zp(r, l[p], h);
  }
  return new Re({
    points: r,
    options: {}
  });
}
function Dp(n, t) {
  const e = [], s = n.getMatchingVisibleMetas("line");
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (o.index === t)
      break;
    o.hidden || e.unshift(o.dataset);
  }
  return e;
}
function zp(n, t, e) {
  const s = [];
  for (let r = 0; r < e.length; r++) {
    const o = e[r], { first: l, last: h, point: c } = Bp(o, t, "x");
    if (!(!c || l && h)) {
      if (l)
        s.unshift(c);
      else if (n.push(c), !h)
        break;
    }
  }
  n.push(...s);
}
function Bp(n, t, e) {
  const s = n.interpolate(t, e);
  if (!s)
    return {};
  const r = s[e], o = n.segments, l = n.points;
  let h = !1, c = !1;
  for (let d = 0; d < o.length; d++) {
    const p = o[d], _ = l[p.start][e], g = l[p.end][e];
    if (ke(r, _, g)) {
      h = r === _, c = r === g;
      break;
    }
  }
  return {
    first: h,
    last: c,
    point: s
  };
}
class ch {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, e, s) {
    const { x: r, y: o, radius: l } = this;
    return e = e || {
      start: 0,
      end: mt
    }, t.arc(r, o, l, e.end, e.start, !0), !s.bounds;
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
function Rp(n) {
  const { chart: t, fill: e, line: s } = n;
  if (Lt(e))
    return Fp(t, e);
  if (e === "stack")
    return Ip(n);
  if (e === "shape")
    return !0;
  const r = Np(n);
  return r instanceof ch ? r : hh(r, s);
}
function Fp(n, t) {
  const e = n.getDatasetMeta(t);
  return e && n.isDatasetVisible(t) ? e.dataset : null;
}
function Np(n) {
  return (n.scale || {}).getPointPositionForValue ? Hp(n) : Zp(n);
}
function Zp(n) {
  const { scale: t = {}, fill: e } = n, s = Op(e, t);
  if (Lt(s)) {
    const r = t.isHorizontal();
    return {
      x: r ? s : null,
      y: r ? null : s
    };
  }
  return null;
}
function Hp(n) {
  const { scale: t, fill: e } = n, s = t.options, r = t.getLabels().length, o = s.reverse ? t.max : t.min, l = Ap(e, t, o), h = [];
  if (s.grid.circular) {
    const c = t.getPointPositionForValue(0, o);
    return new ch({
      x: c.x,
      y: c.y,
      radius: t.getDistanceFromCenterForValue(l)
    });
  }
  for (let c = 0; c < r; ++c)
    h.push(t.getPointPositionForValue(c, l));
  return h;
}
function go(n, t, e) {
  const s = Rp(t), { line: r, scale: o, axis: l } = t, h = r.options, c = h.fill, d = h.backgroundColor, { above: p = d, below: _ = d } = c || {};
  s && r.points.length && (Cs(n, e), Wp(n, {
    line: r,
    target: s,
    above: p,
    below: _,
    area: e,
    scale: o,
    axis: l
  }), Ts(n));
}
function Wp(n, t) {
  const { line: e, target: s, above: r, below: o, area: l, scale: h } = t, c = e._loop ? "angle" : t.axis;
  n.save(), c === "x" && o !== r && (Xa(n, s, l.top), Ka(n, {
    line: e,
    target: s,
    color: r,
    scale: h,
    property: c
  }), n.restore(), n.save(), Xa(n, s, l.bottom)), Ka(n, {
    line: e,
    target: s,
    color: o,
    scale: h,
    property: c
  }), n.restore();
}
function Xa(n, t, e) {
  const { segments: s, points: r } = t;
  let o = !0, l = !1;
  n.beginPath();
  for (const h of s) {
    const { start: c, end: d } = h, p = r[c], _ = r[Xo(c, d, r)];
    o ? (n.moveTo(p.x, p.y), o = !1) : (n.lineTo(p.x, e), n.lineTo(p.x, p.y)), l = !!t.pathSegment(n, h, {
      move: l
    }), l ? n.closePath() : n.lineTo(_.x, e);
  }
  n.lineTo(t.first().x, e), n.closePath(), n.clip();
}
function Ka(n, t) {
  const { line: e, target: s, property: r, color: o, scale: l } = t, h = Pp(e, s, r);
  for (const { source: c, target: d, start: p, end: _ } of h) {
    const { style: { backgroundColor: g = o } = {} } = c, v = s !== !0;
    n.save(), n.fillStyle = g, Vp(n, l, v && So(r, p, _)), n.beginPath();
    const x = !!e.pathSegment(n, c);
    let b;
    if (v) {
      x ? n.closePath() : Ja(n, s, _, r);
      const M = !!s.pathSegment(n, d, {
        move: x,
        reverse: !0
      });
      b = x && M, b || Ja(n, s, p, r);
    }
    n.closePath(), n.fill(b ? "evenodd" : "nonzero"), n.restore();
  }
}
function Vp(n, t, e) {
  const { top: s, bottom: r } = t.chart.chartArea, { property: o, start: l, end: h } = e || {};
  o === "x" && (n.beginPath(), n.rect(l, s, h - l, r - s), n.clip());
}
function Ja(n, t, e, s) {
  const r = t.interpolate(e, s);
  r && n.lineTo(r.x, r.y);
}
var jp = {
  id: "filler",
  afterDatasetsUpdate(n, t, e) {
    const s = (n.data.datasets || []).length, r = [];
    let o, l, h, c;
    for (l = 0; l < s; ++l)
      o = n.getDatasetMeta(l), h = o.dataset, c = null, h && h.options && h instanceof Re && (c = {
        visible: n.isDatasetVisible(l),
        index: l,
        fill: Cp(h, l, s),
        chart: n,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: h
      }), o.$filler = c, r.push(c);
    for (l = 0; l < s; ++l)
      c = r[l], !(!c || c.fill === !1) && (c.fill = Sp(r, l, e.propagate));
  },
  beforeDraw(n, t, e) {
    const s = e.drawTime === "beforeDraw", r = n.getSortedVisibleDatasetMetas(), o = n.chartArea;
    for (let l = r.length - 1; l >= 0; --l) {
      const h = r[l].$filler;
      h && (h.line.updateControlPoints(o, h.axis), s && h.fill && go(n.ctx, h, o));
    }
  },
  beforeDatasetsDraw(n, t, e) {
    if (e.drawTime !== "beforeDatasetsDraw")
      return;
    const s = n.getSortedVisibleDatasetMetas();
    for (let r = s.length - 1; r >= 0; --r) {
      const o = s[r].$filler;
      $a(o) && go(n.ctx, o, n.chartArea);
    }
  },
  beforeDatasetDraw(n, t, e) {
    const s = t.meta.$filler;
    !$a(s) || e.drawTime !== "beforeDatasetDraw" || go(n.ctx, s, n.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const Qa = (n, t) => {
  let { boxHeight: e = t, boxWidth: s = t } = n;
  return n.usePointStyle && (e = Math.min(e, t), s = n.pointStyleWidth || Math.min(s, t)), {
    boxWidth: s,
    boxHeight: e,
    itemHeight: Math.max(t, e)
  };
}, Up = (n, t) => n !== null && t !== null && n.datasetIndex === t.datasetIndex && n.index === t.index;
class tl extends Te {
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
    let e = pt(t.generateLabels, [
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
    const s = t.labels, r = Ot(s.font), o = r.size, l = this._computeTitleHeight(), { boxWidth: h, itemHeight: c } = Qa(s, o);
    let d, p;
    e.font = r.string, this.isHorizontal() ? (d = this.maxWidth, p = this._fitRows(l, o, h, c) + 10) : (p = this.maxHeight, d = this._fitCols(l, r, h, c) + 10), this.width = Math.min(d, t.maxWidth || this.maxWidth), this.height = Math.min(p, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, e, s, r) {
    const { ctx: o, maxWidth: l, options: { labels: { padding: h } } } = this, c = this.legendHitBoxes = [], d = this.lineWidths = [
      0
    ], p = r + h;
    let _ = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let g = -1, v = -p;
    return this.legendItems.forEach((x, b) => {
      const M = s + e / 2 + o.measureText(x.text).width;
      (b === 0 || d[d.length - 1] + M + 2 * h > l) && (_ += p, d[d.length - (b > 0 ? 0 : 1)] = 0, v += p, g++), c[b] = {
        left: 0,
        top: v,
        row: g,
        width: M,
        height: r
      }, d[d.length - 1] += M + h;
    }), _;
  }
  _fitCols(t, e, s, r) {
    const { ctx: o, maxHeight: l, options: { labels: { padding: h } } } = this, c = this.legendHitBoxes = [], d = this.columnSizes = [], p = l - t;
    let _ = h, g = 0, v = 0, x = 0, b = 0;
    return this.legendItems.forEach((M, P) => {
      const { itemWidth: S, itemHeight: O } = Gp(s, e, o, M, r);
      P > 0 && v + O + 2 * h > p && (_ += g + h, d.push({
        width: g,
        height: v
      }), x += g + h, b++, g = v = 0), c[P] = {
        left: x,
        top: v,
        col: b,
        width: S,
        height: O
      }, g = Math.max(g, S), v += O + h;
    }), _ += g, d.push({
      width: g,
      height: v
    }), _;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: e, options: { align: s, labels: { padding: r }, rtl: o } } = this, l = Mi(o, this.left, this.width);
    if (this.isHorizontal()) {
      let h = 0, c = Rt(s, this.left + r, this.right - this.lineWidths[h]);
      for (const d of e)
        h !== d.row && (h = d.row, c = Rt(s, this.left + r, this.right - this.lineWidths[h])), d.top += this.top + t + r, d.left = l.leftForLtr(l.x(c), d.width), c += d.width + r;
    } else {
      let h = 0, c = Rt(s, this.top + t + r, this.bottom - this.columnSizes[h].height);
      for (const d of e)
        d.col !== h && (h = d.col, c = Rt(s, this.top + t + r, this.bottom - this.columnSizes[h].height)), d.top = c, d.left += this.left + r, d.left = l.leftForLtr(l.x(d.left), d.width), c += d.height + r;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      Cs(t, this), this._draw(), Ts(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: e, lineWidths: s, ctx: r } = this, { align: o, labels: l } = t, h = yt.color, c = Mi(t.rtl, this.left, this.width), d = Ot(l.font), { padding: p } = l, _ = d.size, g = _ / 2;
    let v;
    this.drawTitle(), r.textAlign = c.textAlign("left"), r.textBaseline = "middle", r.lineWidth = 0.5, r.font = d.string;
    const { boxWidth: x, boxHeight: b, itemHeight: M } = Qa(l, _), P = function(I, D, B) {
      if (isNaN(x) || x <= 0 || isNaN(b) || b < 0)
        return;
      r.save();
      const N = q(B.lineWidth, 1);
      if (r.fillStyle = q(B.fillStyle, h), r.lineCap = q(B.lineCap, "butt"), r.lineDashOffset = q(B.lineDashOffset, 0), r.lineJoin = q(B.lineJoin, "miter"), r.lineWidth = N, r.strokeStyle = q(B.strokeStyle, h), r.setLineDash(q(B.lineDash, [])), l.usePointStyle) {
        const G = {
          radius: b * Math.SQRT2 / 2,
          pointStyle: B.pointStyle,
          rotation: B.rotation,
          borderWidth: N
        }, Z = c.xPlus(I, x / 2), V = D + g;
        El(r, G, Z, V, l.pointStyleWidth && x);
      } else {
        const G = D + Math.max((_ - b) / 2, 0), Z = c.leftForLtr(I, x), V = ni(B.borderRadius);
        r.beginPath(), Object.values(V).some((Mt) => Mt !== 0) ? pn(r, {
          x: Z,
          y: G,
          w: x,
          h: b,
          radius: V
        }) : r.rect(Z, G, x, b), r.fill(), N !== 0 && r.stroke();
      }
      r.restore();
    }, S = function(I, D, B) {
      ri(r, B.text, I, D + M / 2, d, {
        strikethrough: B.hidden,
        textAlign: c.textAlign(B.textAlign)
      });
    }, O = this.isHorizontal(), A = this._computeTitleHeight();
    O ? v = {
      x: Rt(o, this.left + p, this.right - s[0]),
      y: this.top + p + A,
      line: 0
    } : v = {
      x: this.left + p,
      y: Rt(o, this.top + A + p, this.bottom - e[0].height),
      line: 0
    }, Zl(this.ctx, t.textDirection);
    const T = M + p;
    this.legendItems.forEach((I, D) => {
      r.strokeStyle = I.fontColor, r.fillStyle = I.fontColor;
      const B = r.measureText(I.text).width, N = c.textAlign(I.textAlign || (I.textAlign = l.textAlign)), G = x + g + B;
      let Z = v.x, V = v.y;
      c.setWidth(this.width), O ? D > 0 && Z + G + p > this.right && (V = v.y += T, v.line++, Z = v.x = Rt(o, this.left + p, this.right - s[v.line])) : D > 0 && V + T > this.bottom && (Z = v.x = Z + e[v.line].width + p, v.line++, V = v.y = Rt(o, this.top + A + p, this.bottom - e[v.line].height));
      const Mt = c.x(Z);
      if (P(Mt, V, I), Z = uu(N, Z + x + g, O ? Z + G : this.right, t.rtl), S(c.x(Z), V, I), O)
        v.x += G + p;
      else if (typeof I.text != "string") {
        const at = d.lineHeight;
        v.y += uh(I, at) + p;
      } else
        v.y += T;
    }), Hl(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, e = t.title, s = Ot(e.font), r = Nt(e.padding);
    if (!e.display)
      return;
    const o = Mi(t.rtl, this.left, this.width), l = this.ctx, h = e.position, c = s.size / 2, d = r.top + c;
    let p, _ = this.left, g = this.width;
    if (this.isHorizontal())
      g = Math.max(...this.lineWidths), p = this.top + d, _ = Rt(t.align, _, this.right - g);
    else {
      const x = this.columnSizes.reduce((b, M) => Math.max(b, M.height), 0);
      p = d + Rt(t.align, this.top, this.bottom - x - t.labels.padding - this._computeTitleHeight());
    }
    const v = Rt(h, _, _ + g);
    l.textAlign = o.textAlign(Ho(h)), l.textBaseline = "middle", l.strokeStyle = e.color, l.fillStyle = e.color, l.font = s.string, ri(l, e.text, v, p, s);
  }
  _computeTitleHeight() {
    const t = this.options.title, e = Ot(t.font), s = Nt(t.padding);
    return t.display ? e.lineHeight + s.height : 0;
  }
  _getLegendItemAt(t, e) {
    let s, r, o;
    if (ke(t, this.left, this.right) && ke(e, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, s = 0; s < o.length; ++s)
        if (r = o[s], ke(t, r.left, r.left + r.width) && ke(e, r.top, r.top + r.height))
          return this.legendItems[s];
    }
    return null;
  }
  handleEvent(t) {
    const e = this.options;
    if (!$p(t.type, e))
      return;
    const s = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const r = this._hoveredItem, o = Up(r, s);
      r && !o && pt(e.onLeave, [
        t,
        r,
        this
      ], this), this._hoveredItem = s, s && !o && pt(e.onHover, [
        t,
        s,
        this
      ], this);
    } else
      s && pt(e.onClick, [
        t,
        s,
        this
      ], this);
  }
}
function Gp(n, t, e, s, r) {
  const o = Yp(s, n, t, e), l = qp(r, s, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: l
  };
}
function Yp(n, t, e, s) {
  let r = n.text;
  return r && typeof r != "string" && (r = r.reduce((o, l) => o.length > l.length ? o : l)), t + e.size / 2 + s.measureText(r).width;
}
function qp(n, t, e) {
  let s = n;
  return typeof t.text != "string" && (s = uh(t, e)), s;
}
function uh(n, t) {
  const e = n.text ? n.text.length : 0;
  return t * e;
}
function $p(n, t) {
  return !!((n === "mousemove" || n === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (n === "click" || n === "mouseup"));
}
var Xp = {
  id: "legend",
  _element: tl,
  start(n, t, e) {
    const s = n.legend = new tl({
      ctx: n.ctx,
      options: e,
      chart: n
    });
    Ft.configure(n, s, e), Ft.addBox(n, s);
  },
  stop(n) {
    Ft.removeBox(n, n.legend), delete n.legend;
  },
  beforeUpdate(n, t, e) {
    const s = n.legend;
    Ft.configure(n, s, e), s.options = e;
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
        const t = n.data.datasets, { labels: { usePointStyle: e, pointStyle: s, textAlign: r, color: o, useBorderRadius: l, borderRadius: h } } = n.legend.options;
        return n._getSortedDatasetMetas().map((c) => {
          const d = c.controller.getStyle(e ? 0 : void 0), p = Nt(d.borderWidth);
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
            borderRadius: l && (h || d.borderRadius),
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
class Ko extends Te {
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
    const r = _t(s.text) ? s.text.length : 1;
    this._padding = Nt(s.padding);
    const o = r * Ot(s.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: e, left: s, bottom: r, right: o, options: l } = this, h = l.align;
    let c = 0, d, p, _;
    return this.isHorizontal() ? (p = Rt(h, s, o), _ = e + t, d = o - s) : (l.position === "left" ? (p = s + t, _ = Rt(h, r, e), c = gt * -0.5) : (p = o - t, _ = Rt(h, e, r), c = gt * 0.5), d = r - e), {
      titleX: p,
      titleY: _,
      maxWidth: d,
      rotation: c
    };
  }
  draw() {
    const t = this.ctx, e = this.options;
    if (!e.display)
      return;
    const s = Ot(e.font), o = s.lineHeight / 2 + this._padding.top, { titleX: l, titleY: h, maxWidth: c, rotation: d } = this._drawArgs(o);
    ri(t, e.text, 0, 0, s, {
      color: e.color,
      maxWidth: c,
      rotation: d,
      textAlign: Ho(e.align),
      textBaseline: "middle",
      translation: [
        l,
        h
      ]
    });
  }
}
function Kp(n, t) {
  const e = new Ko({
    ctx: n.ctx,
    options: t,
    chart: n
  });
  Ft.configure(n, e, t), Ft.addBox(n, e), n.titleBlock = e;
}
var Jp = {
  id: "title",
  _element: Ko,
  start(n, t, e) {
    Kp(n, e);
  },
  stop(n) {
    const t = n.titleBlock;
    Ft.removeBox(n, t), delete n.titleBlock;
  },
  beforeUpdate(n, t, e) {
    const s = n.titleBlock;
    Ft.configure(n, s, e), s.options = e;
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
const os = /* @__PURE__ */ new WeakMap();
var Qp = {
  id: "subtitle",
  start(n, t, e) {
    const s = new Ko({
      ctx: n.ctx,
      options: e,
      chart: n
    });
    Ft.configure(n, s, e), Ft.addBox(n, s), os.set(n, s);
  },
  stop(n) {
    Ft.removeBox(n, os.get(n)), os.delete(n);
  },
  beforeUpdate(n, t, e) {
    const s = os.get(n);
    Ft.configure(n, s, e), s.options = e;
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
const nn = {
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
    let e = t.x, s = t.y, r = Number.POSITIVE_INFINITY, o, l, h;
    for (o = 0, l = n.length; o < l; ++o) {
      const c = n[o].element;
      if (c && c.hasValue()) {
        const d = c.getCenterPoint(), p = yo(t, d);
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
function pe(n, t) {
  return t && (_t(t) ? Array.prototype.push.apply(n, t) : n.push(t)), n;
}
function Le(n) {
  return (typeof n == "string" || n instanceof String) && n.indexOf(`
`) > -1 ? n.split(`
`) : n;
}
function t_(n, t) {
  const { element: e, datasetIndex: s, index: r } = t, o = n.getDatasetMeta(s).controller, { label: l, value: h } = o.getLabelAndValue(r);
  return {
    chart: n,
    label: l,
    parsed: o.getParsed(r),
    raw: n.data.datasets[s].data[r],
    formattedValue: h,
    dataset: o.getDataset(),
    dataIndex: r,
    datasetIndex: s,
    element: e
  };
}
function el(n, t) {
  const e = n.chart.ctx, { body: s, footer: r, title: o } = n, { boxWidth: l, boxHeight: h } = t, c = Ot(t.bodyFont), d = Ot(t.titleFont), p = Ot(t.footerFont), _ = o.length, g = r.length, v = s.length, x = Nt(t.padding);
  let b = x.height, M = 0, P = s.reduce((A, T) => A + T.before.length + T.lines.length + T.after.length, 0);
  if (P += n.beforeBody.length + n.afterBody.length, _ && (b += _ * d.lineHeight + (_ - 1) * t.titleSpacing + t.titleMarginBottom), P) {
    const A = t.displayColors ? Math.max(h, c.lineHeight) : c.lineHeight;
    b += v * A + (P - v) * c.lineHeight + (P - 1) * t.bodySpacing;
  }
  g && (b += t.footerMarginTop + g * p.lineHeight + (g - 1) * t.footerSpacing);
  let S = 0;
  const O = function(A) {
    M = Math.max(M, e.measureText(A).width + S);
  };
  return e.save(), e.font = d.string, ut(n.title, O), e.font = c.string, ut(n.beforeBody.concat(n.afterBody), O), S = t.displayColors ? l + 2 + t.boxPadding : 0, ut(s, (A) => {
    ut(A.before, O), ut(A.lines, O), ut(A.after, O);
  }), S = 0, e.font = p.string, ut(n.footer, O), e.restore(), M += x.width, {
    width: M,
    height: b
  };
}
function e_(n, t) {
  const { y: e, height: s } = t;
  return e < s / 2 ? "top" : e > n.height - s / 2 ? "bottom" : "center";
}
function i_(n, t, e, s) {
  const { x: r, width: o } = s, l = e.caretSize + e.caretPadding;
  if (n === "left" && r + o + l > t.width || n === "right" && r - o - l < 0)
    return !0;
}
function n_(n, t, e, s) {
  const { x: r, width: o } = e, { width: l, chartArea: { left: h, right: c } } = n;
  let d = "center";
  return s === "center" ? d = r <= (h + c) / 2 ? "left" : "right" : r <= o / 2 ? d = "left" : r >= l - o / 2 && (d = "right"), i_(d, n, t, e) && (d = "center"), d;
}
function il(n, t, e) {
  const s = e.yAlign || t.yAlign || e_(n, e);
  return {
    xAlign: e.xAlign || t.xAlign || n_(n, t, e, s),
    yAlign: s
  };
}
function s_(n, t) {
  let { x: e, width: s } = n;
  return t === "right" ? e -= s : t === "center" && (e -= s / 2), e;
}
function o_(n, t, e) {
  let { y: s, height: r } = n;
  return t === "top" ? s += e : t === "bottom" ? s -= r + e : s -= r / 2, s;
}
function nl(n, t, e, s) {
  const { caretSize: r, caretPadding: o, cornerRadius: l } = n, { xAlign: h, yAlign: c } = e, d = r + o, { topLeft: p, topRight: _, bottomLeft: g, bottomRight: v } = ni(l);
  let x = s_(t, h);
  const b = o_(t, c, d);
  return c === "center" ? h === "left" ? x += d : h === "right" && (x -= d) : h === "left" ? x -= Math.max(p, g) + r : h === "right" && (x += Math.max(_, v) + r), {
    x: Dt(x, 0, s.width - t.width),
    y: Dt(b, 0, s.height - t.height)
  };
}
function rs(n, t, e) {
  const s = Nt(e.padding);
  return t === "center" ? n.x + n.width / 2 : t === "right" ? n.x + n.width - s.right : n.x + s.left;
}
function sl(n) {
  return pe([], Le(n));
}
function r_(n, t, e) {
  return We(n, {
    tooltip: t,
    tooltipItems: e,
    type: "tooltip"
  });
}
function ol(n, t) {
  const e = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return e ? n.override(e) : n;
}
const dh = {
  beforeTitle: xe,
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
  afterTitle: xe,
  beforeBody: xe,
  beforeLabel: xe,
  label(n) {
    if (this && this.options && this.options.mode === "dataset")
      return n.label + ": " + n.formattedValue || n.formattedValue;
    let t = n.dataset.label || "";
    t && (t += ": ");
    const e = n.formattedValue;
    return st(e) || (t += e), t;
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
  afterLabel: xe,
  afterBody: xe,
  beforeFooter: xe,
  footer: xe,
  afterFooter: xe
};
function jt(n, t, e, s) {
  const r = n[t].call(e, s);
  return typeof r > "u" ? dh[t].call(e, s) : r;
}
class Co extends Te {
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
    const e = this.chart, s = this.options.setContext(this.getContext()), r = s.enabled && e.options.animation && s.animations, o = new Ul(this.chart, r);
    return r._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = r_(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, e) {
    const { callbacks: s } = e, r = jt(s, "beforeTitle", this, t), o = jt(s, "title", this, t), l = jt(s, "afterTitle", this, t);
    let h = [];
    return h = pe(h, Le(r)), h = pe(h, Le(o)), h = pe(h, Le(l)), h;
  }
  getBeforeBody(t, e) {
    return sl(jt(e.callbacks, "beforeBody", this, t));
  }
  getBody(t, e) {
    const { callbacks: s } = e, r = [];
    return ut(t, (o) => {
      const l = {
        before: [],
        lines: [],
        after: []
      }, h = ol(s, o);
      pe(l.before, Le(jt(h, "beforeLabel", this, o))), pe(l.lines, jt(h, "label", this, o)), pe(l.after, Le(jt(h, "afterLabel", this, o))), r.push(l);
    }), r;
  }
  getAfterBody(t, e) {
    return sl(jt(e.callbacks, "afterBody", this, t));
  }
  getFooter(t, e) {
    const { callbacks: s } = e, r = jt(s, "beforeFooter", this, t), o = jt(s, "footer", this, t), l = jt(s, "afterFooter", this, t);
    let h = [];
    return h = pe(h, Le(r)), h = pe(h, Le(o)), h = pe(h, Le(l)), h;
  }
  _createItems(t) {
    const e = this._active, s = this.chart.data, r = [], o = [], l = [];
    let h = [], c, d;
    for (c = 0, d = e.length; c < d; ++c)
      h.push(t_(this.chart, e[c]));
    return t.filter && (h = h.filter((p, _, g) => t.filter(p, _, g, s))), t.itemSort && (h = h.sort((p, _) => t.itemSort(p, _, s))), ut(h, (p) => {
      const _ = ol(t.callbacks, p);
      r.push(jt(_, "labelColor", this, p)), o.push(jt(_, "labelPointStyle", this, p)), l.push(jt(_, "labelTextColor", this, p));
    }), this.labelColors = r, this.labelPointStyles = o, this.labelTextColors = l, this.dataPoints = h, h;
  }
  update(t, e) {
    const s = this.options.setContext(this.getContext()), r = this._active;
    let o, l = [];
    if (!r.length)
      this.opacity !== 0 && (o = {
        opacity: 0
      });
    else {
      const h = nn[s.position].call(this, r, this._eventPosition);
      l = this._createItems(s), this.title = this.getTitle(l, s), this.beforeBody = this.getBeforeBody(l, s), this.body = this.getBody(l, s), this.afterBody = this.getAfterBody(l, s), this.footer = this.getFooter(l, s);
      const c = this._size = el(this, s), d = Object.assign({}, h, c), p = il(this.chart, s, d), _ = nl(s, d, p, this.chart);
      this.xAlign = p.xAlign, this.yAlign = p.yAlign, o = {
        opacity: 1,
        x: _.x,
        y: _.y,
        width: c.width,
        height: c.height,
        caretX: h.x,
        caretY: h.y
      };
    }
    this._tooltipItems = l, this.$context = void 0, o && this._resolveAnimations().update(this, o), t && s.external && s.external.call(this, {
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
    const { xAlign: r, yAlign: o } = this, { caretSize: l, cornerRadius: h } = s, { topLeft: c, topRight: d, bottomLeft: p, bottomRight: _ } = ni(h), { x: g, y: v } = t, { width: x, height: b } = e;
    let M, P, S, O, A, T;
    return o === "center" ? (A = v + b / 2, r === "left" ? (M = g, P = M - l, O = A + l, T = A - l) : (M = g + x, P = M + l, O = A - l, T = A + l), S = M) : (r === "left" ? P = g + Math.max(c, p) + l : r === "right" ? P = g + x - Math.max(d, _) - l : P = this.caretX, o === "top" ? (O = v, A = O - l, M = P - l, S = P + l) : (O = v + b, A = O + l, M = P + l, S = P - l), T = O), {
      x1: M,
      x2: P,
      x3: S,
      y1: O,
      y2: A,
      y3: T
    };
  }
  drawTitle(t, e, s) {
    const r = this.title, o = r.length;
    let l, h, c;
    if (o) {
      const d = Mi(s.rtl, this.x, this.width);
      for (t.x = rs(this, s.titleAlign, s), e.textAlign = d.textAlign(s.titleAlign), e.textBaseline = "middle", l = Ot(s.titleFont), h = s.titleSpacing, e.fillStyle = s.titleColor, e.font = l.string, c = 0; c < o; ++c)
        e.fillText(r[c], d.x(t.x), t.y + l.lineHeight / 2), t.y += l.lineHeight + h, c + 1 === o && (t.y += s.titleMarginBottom - h);
    }
  }
  _drawColorBox(t, e, s, r, o) {
    const l = this.labelColors[s], h = this.labelPointStyles[s], { boxHeight: c, boxWidth: d } = o, p = Ot(o.bodyFont), _ = rs(this, "left", o), g = r.x(_), v = c < p.lineHeight ? (p.lineHeight - c) / 2 : 0, x = e.y + v;
    if (o.usePointStyle) {
      const b = {
        radius: Math.min(d, c) / 2,
        pointStyle: h.pointStyle,
        rotation: h.rotation,
        borderWidth: 1
      }, M = r.leftForLtr(g, d) + d / 2, P = x + c / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, xo(t, b, M, P), t.strokeStyle = l.borderColor, t.fillStyle = l.backgroundColor, xo(t, b, M, P);
    } else {
      t.lineWidth = tt(l.borderWidth) ? Math.max(...Object.values(l.borderWidth)) : l.borderWidth || 1, t.strokeStyle = l.borderColor, t.setLineDash(l.borderDash || []), t.lineDashOffset = l.borderDashOffset || 0;
      const b = r.leftForLtr(g, d), M = r.leftForLtr(r.xPlus(g, 1), d - 2), P = ni(l.borderRadius);
      Object.values(P).some((S) => S !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, pn(t, {
        x: b,
        y: x,
        w: d,
        h: c,
        radius: P
      }), t.fill(), t.stroke(), t.fillStyle = l.backgroundColor, t.beginPath(), pn(t, {
        x: M,
        y: x + 1,
        w: d - 2,
        h: c - 2,
        radius: P
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(b, x, d, c), t.strokeRect(b, x, d, c), t.fillStyle = l.backgroundColor, t.fillRect(M, x + 1, d - 2, c - 2));
    }
    t.fillStyle = this.labelTextColors[s];
  }
  drawBody(t, e, s) {
    const { body: r } = this, { bodySpacing: o, bodyAlign: l, displayColors: h, boxHeight: c, boxWidth: d, boxPadding: p } = s, _ = Ot(s.bodyFont);
    let g = _.lineHeight, v = 0;
    const x = Mi(s.rtl, this.x, this.width), b = function(B) {
      e.fillText(B, x.x(t.x + v), t.y + g / 2), t.y += g + o;
    }, M = x.textAlign(l);
    let P, S, O, A, T, I, D;
    for (e.textAlign = l, e.textBaseline = "middle", e.font = _.string, t.x = rs(this, M, s), e.fillStyle = s.bodyColor, ut(this.beforeBody, b), v = h && M !== "right" ? l === "center" ? d / 2 + p : d + 2 + p : 0, A = 0, I = r.length; A < I; ++A) {
      for (P = r[A], S = this.labelTextColors[A], e.fillStyle = S, ut(P.before, b), O = P.lines, h && O.length && (this._drawColorBox(e, t, A, x, s), g = Math.max(_.lineHeight, c)), T = 0, D = O.length; T < D; ++T)
        b(O[T]), g = _.lineHeight;
      ut(P.after, b);
    }
    v = 0, g = _.lineHeight, ut(this.afterBody, b), t.y -= o;
  }
  drawFooter(t, e, s) {
    const r = this.footer, o = r.length;
    let l, h;
    if (o) {
      const c = Mi(s.rtl, this.x, this.width);
      for (t.x = rs(this, s.footerAlign, s), t.y += s.footerMarginTop, e.textAlign = c.textAlign(s.footerAlign), e.textBaseline = "middle", l = Ot(s.footerFont), e.fillStyle = s.footerColor, e.font = l.string, h = 0; h < o; ++h)
        e.fillText(r[h], c.x(t.x), t.y + l.lineHeight / 2), t.y += l.lineHeight + s.footerSpacing;
    }
  }
  drawBackground(t, e, s, r) {
    const { xAlign: o, yAlign: l } = this, { x: h, y: c } = t, { width: d, height: p } = s, { topLeft: _, topRight: g, bottomLeft: v, bottomRight: x } = ni(r.cornerRadius);
    e.fillStyle = r.backgroundColor, e.strokeStyle = r.borderColor, e.lineWidth = r.borderWidth, e.beginPath(), e.moveTo(h + _, c), l === "top" && this.drawCaret(t, e, s, r), e.lineTo(h + d - g, c), e.quadraticCurveTo(h + d, c, h + d, c + g), l === "center" && o === "right" && this.drawCaret(t, e, s, r), e.lineTo(h + d, c + p - x), e.quadraticCurveTo(h + d, c + p, h + d - x, c + p), l === "bottom" && this.drawCaret(t, e, s, r), e.lineTo(h + v, c + p), e.quadraticCurveTo(h, c + p, h, c + p - v), l === "center" && o === "left" && this.drawCaret(t, e, s, r), e.lineTo(h, c + _), e.quadraticCurveTo(h, c, h + _, c), e.closePath(), e.fill(), r.borderWidth > 0 && e.stroke();
  }
  _updateAnimationTarget(t) {
    const e = this.chart, s = this.$animations, r = s && s.x, o = s && s.y;
    if (r || o) {
      const l = nn[t.position].call(this, this._active, this._eventPosition);
      if (!l)
        return;
      const h = this._size = el(this, t), c = Object.assign({}, l, this._size), d = il(e, t, c), p = nl(t, c, d, e);
      (r._to !== p.x || o._to !== p.y) && (this.xAlign = d.xAlign, this.yAlign = d.yAlign, this.width = h.width, this.height = h.height, this.caretX = l.x, this.caretY = l.y, this._resolveAnimations().update(this, p));
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
    const l = Nt(e.padding), h = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    e.enabled && h && (t.save(), t.globalAlpha = s, this.drawBackground(o, t, r, e), Zl(t, e.textDirection), o.y += l.top, this.drawTitle(o, t, e), this.drawBody(o, t, e), this.drawFooter(o, t, e), Hl(t, e.textDirection), t.restore());
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
    }), o = !ys(s, r), l = this._positionChanged(r, e);
    (o || l) && (this._active = r, this._eventPosition = e, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, e, s = !0) {
    if (e && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const r = this.options, o = this._active || [], l = this._getActiveElements(t, o, e, s), h = this._positionChanged(l, t), c = e || !ys(l, o) || h;
    return c && (this._active = l, (r.enabled || r.external) && (this._eventPosition = {
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
    const l = this.chart.getElementsAtEventForMode(t, o.mode, o, s);
    return o.reverse && l.reverse(), l;
  }
  _positionChanged(t, e) {
    const { caretX: s, caretY: r, options: o } = this, l = nn[o.position].call(this, t, e);
    return l !== !1 && (s !== l.x || r !== l.y);
  }
}
z(Co, "positioners", nn);
var a_ = {
  id: "tooltip",
  _element: Co,
  positioners: nn,
  afterInit(n, t, e) {
    e && (n.tooltip = new Co({
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
    callbacks: dh
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
}, l_ = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Colors: bp,
  Decimation: Mp,
  Filler: jp,
  Legend: Xp,
  SubTitle: Qp,
  Title: Jp,
  Tooltip: a_
});
const h_ = (n, t, e, s) => (typeof t == "string" ? (e = n.push(t) - 1, s.unshift({
  index: e,
  label: t
})) : isNaN(t) && (e = null), e);
function c_(n, t, e, s) {
  const r = n.indexOf(t);
  if (r === -1)
    return h_(n, t, e, s);
  const o = n.lastIndexOf(t);
  return r !== o ? e : r;
}
const u_ = (n, t) => n === null ? null : Dt(Math.round(n), 0, t);
function rl(n) {
  const t = this.getLabels();
  return n >= 0 && n < t.length ? t[n] : n;
}
class To extends ai {
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
    if (st(t))
      return null;
    const s = this.getLabels();
    return e = isFinite(e) && s[e] === t ? e : c_(s, t, q(e, t), this._addedLabels), u_(e, s.length - 1);
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
    for (let l = t; l <= e; l++)
      r.push({
        value: l
      });
    return r;
  }
  getLabelForValue(t) {
    return rl.call(this, t);
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
z(To, "id", "category"), z(To, "defaults", {
  ticks: {
    callback: rl
  }
});
function d_(n, t) {
  const e = [], { bounds: r, step: o, min: l, max: h, precision: c, count: d, maxTicks: p, maxDigits: _, includeBounds: g } = n, v = o || 1, x = p - 1, { min: b, max: M } = t, P = !st(l), S = !st(h), O = !st(d), A = (M - b) / (_ + 1);
  let T = ea((M - b) / x / v) * v, I, D, B, N;
  if (T < 1e-14 && !P && !S)
    return [
      {
        value: b
      },
      {
        value: M
      }
    ];
  N = Math.ceil(M / T) - Math.floor(b / T), N > x && (T = ea(N * T / x / v) * v), st(c) || (I = Math.pow(10, c), T = Math.ceil(T * I) / I), r === "ticks" ? (D = Math.floor(b / T) * T, B = Math.ceil(M / T) * T) : (D = b, B = M), P && S && o && su((h - l) / o, T / 1e3) ? (N = Math.round(Math.min((h - l) / T, p)), T = (h - l) / N, D = l, B = h) : O ? (D = P ? l : D, B = S ? h : B, N = d - 1, T = (B - D) / N) : (N = (B - D) / T, rn(N, Math.round(N), T / 1e3) ? N = Math.round(N) : N = Math.ceil(N));
  const G = Math.max(ia(T), ia(D));
  I = Math.pow(10, st(c) ? G : c), D = Math.round(D * I) / I, B = Math.round(B * I) / I;
  let Z = 0;
  for (P && (g && D !== l ? (e.push({
    value: l
  }), D < l && Z++, rn(Math.round((D + Z * T) * I) / I, l, al(l, A, n)) && Z++) : D < l && Z++); Z < N; ++Z) {
    const V = Math.round((D + Z * T) * I) / I;
    if (S && V > h)
      break;
    e.push({
      value: V
    });
  }
  return S && g && B !== h ? e.length && rn(e[e.length - 1].value, h, al(h, A, n)) ? e[e.length - 1].value = h : e.push({
    value: h
  }) : (!S || B === h) && e.push({
    value: B
  }), e;
}
function al(n, t, { horizontal: e, minRotation: s }) {
  const r = re(s), o = (e ? Math.sin(r) : Math.cos(r)) || 1e-3, l = 0.75 * t * ("" + n).length;
  return Math.min(t / o, l);
}
class ks extends ai {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, e) {
    return st(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: e, maxDefined: s } = this.getUserBounds();
    let { min: r, max: o } = this;
    const l = (c) => r = e ? r : c, h = (c) => o = s ? o : c;
    if (t) {
      const c = me(r), d = me(o);
      c < 0 && d < 0 ? h(0) : c > 0 && d > 0 && l(0);
    }
    if (r === o) {
      let c = o === 0 ? 1 : Math.abs(o * 0.05);
      h(o + c), t || l(r - c);
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
    }, o = this._range || this, l = d_(r, o);
    return t.bounds === "ticks" && Ll(l, this, "value"), t.reverse ? (l.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), l;
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
    return yn(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Oo extends ks {
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!0);
    this.min = Lt(t) ? t : 0, this.max = Lt(e) ? e : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), e = t ? this.width : this.height, s = re(this.options.ticks.minRotation), r = (t ? Math.sin(s) : Math.cos(s)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(e / Math.min(40, o.lineHeight / r));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
z(Oo, "id", "linear"), z(Oo, "defaults", {
  ticks: {
    callback: Ss.formatters.numeric
  }
});
const mn = (n) => Math.floor(Be(n)), Qe = (n, t) => Math.pow(10, mn(n) + t);
function ll(n) {
  return n / Math.pow(10, mn(n)) === 1;
}
function hl(n, t, e) {
  const s = Math.pow(10, e), r = Math.floor(n / s);
  return Math.ceil(t / s) - r;
}
function f_(n, t) {
  const e = t - n;
  let s = mn(e);
  for (; hl(n, t, s) > 10; )
    s++;
  for (; hl(n, t, s) < 10; )
    s--;
  return Math.min(s, mn(n));
}
function p_(n, { min: t, max: e }) {
  t = $t(n.min, t);
  const s = [], r = mn(t);
  let o = f_(t, e), l = o < 0 ? Math.pow(10, Math.abs(o)) : 1;
  const h = Math.pow(10, o), c = r > o ? Math.pow(10, r) : 0, d = Math.round((t - c) * l) / l, p = Math.floor((t - c) / h / 10) * h * 10;
  let _ = Math.floor((d - p) / Math.pow(10, o)), g = $t(n.min, Math.round((c + p + _ * Math.pow(10, o)) * l) / l);
  for (; g < e; )
    s.push({
      value: g,
      major: ll(g),
      significand: _
    }), _ >= 10 ? _ = _ < 15 ? 15 : 20 : _++, _ >= 20 && (o++, _ = 2, l = o >= 0 ? 1 : l), g = Math.round((c + p + _ * Math.pow(10, o)) * l) / l;
  const v = $t(n.max, g);
  return s.push({
    value: v,
    major: ll(v),
    significand: _
  }), s;
}
class Ao extends ai {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._valueRange = 0;
  }
  parse(t, e) {
    const s = ks.prototype.parse.apply(this, [
      t,
      e
    ]);
    if (s === 0) {
      this._zero = !0;
      return;
    }
    return Lt(s) && s > 0 ? s : null;
  }
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!0);
    this.min = Lt(t) ? Math.max(0, t) : null, this.max = Lt(e) ? Math.max(0, e) : null, this.options.beginAtZero && (this._zero = !0), this._zero && this.min !== this._suggestedMin && !Lt(this._userMin) && (this.min = t === Qe(this.min, 0) ? Qe(this.min, -1) : Qe(this.min, 0)), this.handleTickRangeOptions();
  }
  handleTickRangeOptions() {
    const { minDefined: t, maxDefined: e } = this.getUserBounds();
    let s = this.min, r = this.max;
    const o = (h) => s = t ? s : h, l = (h) => r = e ? r : h;
    s === r && (s <= 0 ? (o(1), l(10)) : (o(Qe(s, -1)), l(Qe(r, 1)))), s <= 0 && o(Qe(r, -1)), r <= 0 && l(Qe(s, 1)), this.min = s, this.max = r;
  }
  buildTicks() {
    const t = this.options, e = {
      min: this._userMin,
      max: this._userMax
    }, s = p_(e, this);
    return t.bounds === "ticks" && Ll(s, this, "value"), t.reverse ? (s.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), s;
  }
  getLabelForValue(t) {
    return t === void 0 ? "0" : yn(t, this.chart.options.locale, this.options.ticks.format);
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
z(Ao, "id", "logarithmic"), z(Ao, "defaults", {
  ticks: {
    callback: Ss.formatters.logarithmic,
    major: {
      enabled: !0
    }
  }
});
function Eo(n) {
  const t = n.ticks;
  if (t.display && n.display) {
    const e = Nt(t.backdropPadding);
    return q(t.font && t.font.size, yt.font.size) + e.height;
  }
  return 0;
}
function __(n, t, e) {
  return e = _t(e) ? e : [
    e
  ], {
    w: xu(n, t.string, e),
    h: e.length * t.lineHeight
  };
}
function cl(n, t, e, s, r) {
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
function m_(n) {
  const t = {
    l: n.left + n._padding.left,
    r: n.right - n._padding.right,
    t: n.top + n._padding.top,
    b: n.bottom - n._padding.bottom
  }, e = Object.assign({}, t), s = [], r = [], o = n._pointLabels.length, l = n.options.pointLabels, h = l.centerPointLabels ? gt / o : 0;
  for (let c = 0; c < o; c++) {
    const d = l.setContext(n.getPointLabelContext(c));
    r[c] = d.padding;
    const p = n.getPointPosition(c, n.drawingArea + r[c], h), _ = Ot(d.font), g = __(n.ctx, _, n._pointLabels[c]);
    s[c] = g;
    const v = Xt(n.getIndexAngle(c) + h), x = Math.round(No(v)), b = cl(x, p.x, g.w, 0, 180), M = cl(x, p.y, g.h, 90, 270);
    g_(e, t, v, b, M);
  }
  n.setCenterPoint(t.l - e.l, e.r - t.r, t.t - e.t, e.b - t.b), n._pointLabelItems = b_(n, s, r);
}
function g_(n, t, e, s, r) {
  const o = Math.abs(Math.sin(e)), l = Math.abs(Math.cos(e));
  let h = 0, c = 0;
  s.start < t.l ? (h = (t.l - s.start) / o, n.l = Math.min(n.l, t.l - h)) : s.end > t.r && (h = (s.end - t.r) / o, n.r = Math.max(n.r, t.r + h)), r.start < t.t ? (c = (t.t - r.start) / l, n.t = Math.min(n.t, t.t - c)) : r.end > t.b && (c = (r.end - t.b) / l, n.b = Math.max(n.b, t.b + c));
}
function v_(n, t, e) {
  const s = n.drawingArea, { extra: r, additionalAngle: o, padding: l, size: h } = e, c = n.getPointPosition(t, s + r + l, o), d = Math.round(No(Xt(c.angle + kt))), p = L_(c.y, h.h, d), _ = x_(d), g = w_(c.x, h.w, _);
  return {
    visible: !0,
    x: c.x,
    y: p,
    textAlign: _,
    left: g,
    top: p,
    right: g + h.w,
    bottom: p + h.h
  };
}
function y_(n, t) {
  if (!t)
    return !0;
  const { left: e, top: s, right: r, bottom: o } = n;
  return !(Ce({
    x: e,
    y: s
  }, t) || Ce({
    x: e,
    y: o
  }, t) || Ce({
    x: r,
    y: s
  }, t) || Ce({
    x: r,
    y: o
  }, t));
}
function b_(n, t, e) {
  const s = [], r = n._pointLabels.length, o = n.options, { centerPointLabels: l, display: h } = o.pointLabels, c = {
    extra: Eo(o) / 2,
    additionalAngle: l ? gt / r : 0
  };
  let d;
  for (let p = 0; p < r; p++) {
    c.padding = e[p], c.size = t[p];
    const _ = v_(n, p, c);
    s.push(_), h === "auto" && (_.visible = y_(_, d), _.visible && (d = _));
  }
  return s;
}
function x_(n) {
  return n === 0 || n === 180 ? "center" : n < 180 ? "left" : "right";
}
function w_(n, t, e) {
  return e === "right" ? n -= t : e === "center" && (n -= t / 2), n;
}
function L_(n, t, e) {
  return e === 90 || e === 270 ? n -= t / 2 : (e > 270 || e < 90) && (n -= t), n;
}
function M_(n, t, e) {
  const { left: s, top: r, right: o, bottom: l } = e, { backdropColor: h } = t;
  if (!st(h)) {
    const c = ni(t.borderRadius), d = Nt(t.backdropPadding);
    n.fillStyle = h;
    const p = s - d.left, _ = r - d.top, g = o - s + d.width, v = l - r + d.height;
    Object.values(c).some((x) => x !== 0) ? (n.beginPath(), pn(n, {
      x: p,
      y: _,
      w: g,
      h: v,
      radius: c
    }), n.fill()) : n.fillRect(p, _, g, v);
  }
}
function P_(n, t) {
  const { ctx: e, options: { pointLabels: s } } = n;
  for (let r = t - 1; r >= 0; r--) {
    const o = n._pointLabelItems[r];
    if (!o.visible)
      continue;
    const l = s.setContext(n.getPointLabelContext(r));
    M_(e, l, o);
    const h = Ot(l.font), { x: c, y: d, textAlign: p } = o;
    ri(e, n._pointLabels[r], c, d + h.lineHeight / 2, h, {
      color: l.color,
      textAlign: p,
      textBaseline: "middle"
    });
  }
}
function fh(n, t, e, s) {
  const { ctx: r } = n;
  if (e)
    r.arc(n.xCenter, n.yCenter, t, 0, mt);
  else {
    let o = n.getPointPosition(0, t);
    r.moveTo(o.x, o.y);
    for (let l = 1; l < s; l++)
      o = n.getPointPosition(l, t), r.lineTo(o.x, o.y);
  }
}
function k_(n, t, e, s, r) {
  const o = n.ctx, l = t.circular, { color: h, lineWidth: c } = t;
  !l && !s || !h || !c || e < 0 || (o.save(), o.strokeStyle = h, o.lineWidth = c, o.setLineDash(r.dash || []), o.lineDashOffset = r.dashOffset, o.beginPath(), fh(n, e, l, s), o.closePath(), o.stroke(), o.restore());
}
function S_(n, t, e) {
  return We(n, {
    label: e,
    index: t,
    type: "pointLabel"
  });
}
class sn extends ks {
  constructor(t) {
    super(t), this.xCenter = void 0, this.yCenter = void 0, this.drawingArea = void 0, this._pointLabels = [], this._pointLabelItems = [];
  }
  setDimensions() {
    const t = this._padding = Nt(Eo(this.options) / 2), e = this.width = this.maxWidth - t.width, s = this.height = this.maxHeight - t.height;
    this.xCenter = Math.floor(this.left + e / 2 + t.left), this.yCenter = Math.floor(this.top + s / 2 + t.top), this.drawingArea = Math.floor(Math.min(e, s) / 2);
  }
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!1);
    this.min = Lt(t) && !isNaN(t) ? t : 0, this.max = Lt(e) && !isNaN(e) ? e : 0, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    return Math.ceil(this.drawingArea / Eo(this.options));
  }
  generateTickLabels(t) {
    ks.prototype.generateTickLabels.call(this, t), this._pointLabels = this.getLabels().map((e, s) => {
      const r = pt(this.options.pointLabels.callback, [
        e,
        s
      ], this);
      return r || r === 0 ? r : "";
    }).filter((e, s) => this.chart.getDataVisibility(s));
  }
  fit() {
    const t = this.options;
    t.display && t.pointLabels.display ? m_(this) : this.setCenterPoint(0, 0, 0, 0);
  }
  setCenterPoint(t, e, s, r) {
    this.xCenter += Math.floor((t - e) / 2), this.yCenter += Math.floor((s - r) / 2), this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(t, e, s, r));
  }
  getIndexAngle(t) {
    const e = mt / (this._pointLabels.length || 1), s = this.options.startAngle || 0;
    return Xt(t * e + re(s));
  }
  getDistanceFromCenterForValue(t) {
    if (st(t))
      return NaN;
    const e = this.drawingArea / (this.max - this.min);
    return this.options.reverse ? (this.max - t) * e : (t - this.min) * e;
  }
  getValueForDistanceFromCenter(t) {
    if (st(t))
      return NaN;
    const e = t / (this.drawingArea / (this.max - this.min));
    return this.options.reverse ? this.max - e : this.min + e;
  }
  getPointLabelContext(t) {
    const e = this._pointLabels || [];
    if (t >= 0 && t < e.length) {
      const s = e[t];
      return S_(this.getContext(), t, s);
    }
  }
  getPointPosition(t, e, s = 0) {
    const r = this.getIndexAngle(t) - kt + s;
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
      s.save(), s.beginPath(), fh(this, this.getDistanceFromCenterForValue(this._endValue), e, this._pointLabels.length), s.closePath(), s.fillStyle = t, s.fill(), s.restore();
    }
  }
  drawGrid() {
    const t = this.ctx, e = this.options, { angleLines: s, grid: r, border: o } = e, l = this._pointLabels.length;
    let h, c, d;
    if (e.pointLabels.display && P_(this, l), r.display && this.ticks.forEach((p, _) => {
      if (_ !== 0 || _ === 0 && this.min < 0) {
        c = this.getDistanceFromCenterForValue(p.value);
        const g = this.getContext(_), v = r.setContext(g), x = o.setContext(g);
        k_(this, v, c, l, x);
      }
    }), s.display) {
      for (t.save(), h = l - 1; h >= 0; h--) {
        const p = s.setContext(this.getPointLabelContext(h)), { color: _, lineWidth: g } = p;
        !g || !_ || (t.lineWidth = g, t.strokeStyle = _, t.setLineDash(p.borderDash), t.lineDashOffset = p.borderDashOffset, c = this.getDistanceFromCenterForValue(e.reverse ? this.min : this.max), d = this.getPointPosition(h, c), t.beginPath(), t.moveTo(this.xCenter, this.yCenter), t.lineTo(d.x, d.y), t.stroke());
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
    let o, l;
    t.save(), t.translate(this.xCenter, this.yCenter), t.rotate(r), t.textAlign = "center", t.textBaseline = "middle", this.ticks.forEach((h, c) => {
      if (c === 0 && this.min >= 0 && !e.reverse)
        return;
      const d = s.setContext(this.getContext(c)), p = Ot(d.font);
      if (o = this.getDistanceFromCenterForValue(this.ticks[c].value), d.showLabelBackdrop) {
        t.font = p.string, l = t.measureText(h.label).width, t.fillStyle = d.backdropColor;
        const _ = Nt(d.backdropPadding);
        t.fillRect(-l / 2 - _.left, -o - p.size / 2 - _.top, l + _.width, p.size + _.height);
      }
      ri(t, h.label, 0, -o, p, {
        color: d.color,
        strokeColor: d.textStrokeColor,
        strokeWidth: d.textStrokeWidth
      });
    }), t.restore();
  }
  drawTitle() {
  }
}
z(sn, "id", "radialLinear"), z(sn, "defaults", {
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
    callback: Ss.formatters.numeric
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
}), z(sn, "defaultRoutes", {
  "angleLines.color": "borderColor",
  "pointLabels.color": "color",
  "ticks.color": "color"
}), z(sn, "descriptors", {
  angleLines: {
    _fallback: "grid"
  }
});
const As = {
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
}, Ut = /* @__PURE__ */ Object.keys(As);
function ul(n, t) {
  return n - t;
}
function dl(n, t) {
  if (st(t))
    return null;
  const e = n._adapter, { parser: s, round: r, isoWeekday: o } = n._parseOpts;
  let l = t;
  return typeof s == "function" && (l = s(l)), Lt(l) || (l = typeof s == "string" ? e.parse(l, s) : e.parse(l)), l === null ? null : (r && (l = r === "week" && (Pi(o) || o === !0) ? e.startOf(l, "isoWeek", o) : e.startOf(l, r)), +l);
}
function fl(n, t, e, s) {
  const r = Ut.length;
  for (let o = Ut.indexOf(n); o < r - 1; ++o) {
    const l = As[Ut[o]], h = l.steps ? l.steps : Number.MAX_SAFE_INTEGER;
    if (l.common && Math.ceil((e - t) / (h * l.size)) <= s)
      return Ut[o];
  }
  return Ut[r - 1];
}
function C_(n, t, e, s, r) {
  for (let o = Ut.length - 1; o >= Ut.indexOf(e); o--) {
    const l = Ut[o];
    if (As[l].common && n._adapter.diff(r, s, l) >= t - 1)
      return l;
  }
  return Ut[e ? Ut.indexOf(e) : 0];
}
function T_(n) {
  for (let t = Ut.indexOf(n) + 1, e = Ut.length; t < e; ++t)
    if (As[Ut[t]].common)
      return Ut[t];
}
function pl(n, t, e) {
  if (!e)
    n[t] = !0;
  else if (e.length) {
    const { lo: s, hi: r } = Zo(e, t), o = e[s] >= t ? e[s] : e[r];
    n[o] = !0;
  }
}
function O_(n, t, e, s) {
  const r = n._adapter, o = +r.startOf(t[0].value, s), l = t[t.length - 1].value;
  let h, c;
  for (h = o; h <= l; h = +r.add(h, 1, s))
    c = e[h], c >= 0 && (t[c].major = !0);
  return t;
}
function _l(n, t, e) {
  const s = [], r = {}, o = t.length;
  let l, h;
  for (l = 0; l < o; ++l)
    h = t[l], r[h] = l, s.push({
      value: h,
      major: !1
    });
  return o === 0 || !e ? s : O_(n, s, r, e);
}
class gn extends ai {
  constructor(t) {
    super(t), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(t, e = {}) {
    const s = t.time || (t.time = {}), r = this._adapter = new Rd._date(t.adapters.date);
    r.init(e), on(s.displayFormats, r.formats()), this._parseOpts = {
      parser: s.parser,
      round: s.round,
      isoWeekday: s.isoWeekday
    }, super.init(t), this._normalized = e.normalized;
  }
  parse(t, e) {
    return t === void 0 ? null : dl(this, t);
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
    let { min: r, max: o, minDefined: l, maxDefined: h } = this.getUserBounds();
    function c(d) {
      !l && !isNaN(d.min) && (r = Math.min(r, d.min)), !h && !isNaN(d.max) && (o = Math.max(o, d.max));
    }
    (!l || !h) && (c(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && c(this.getMinMax(!1))), r = Lt(r) && !isNaN(r) ? r : +e.startOf(Date.now(), s), o = Lt(o) && !isNaN(o) ? o : +e.endOf(Date.now(), s) + 1, this.min = Math.min(r, o - 1), this.max = Math.max(r + 1, o);
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
    const o = this.min, l = this.max, h = lu(r, o, l);
    return this._unit = e.unit || (s.autoSkip ? fl(e.minUnit, this.min, this.max, this._getLabelCapacity(o)) : C_(this, h.length, e.minUnit, this.min, this.max)), this._majorUnit = !s.major.enabled || this._unit === "year" ? void 0 : T_(this._unit), this.initOffsets(r), t.reverse && h.reverse(), _l(this, h, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let e = 0, s = 0, r, o;
    this.options.offset && t.length && (r = this.getDecimalForValue(t[0]), t.length === 1 ? e = 1 - r : e = (this.getDecimalForValue(t[1]) - r) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? s = o : s = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const l = t.length < 3 ? 0.5 : 0.25;
    e = Dt(e, 0, l), s = Dt(s, 0, l), this._offsets = {
      start: e,
      end: s,
      factor: 1 / (e + 1 + s)
    };
  }
  _generate() {
    const t = this._adapter, e = this.min, s = this.max, r = this.options, o = r.time, l = o.unit || fl(o.minUnit, e, s, this._getLabelCapacity(e)), h = q(r.ticks.stepSize, 1), c = l === "week" ? o.isoWeekday : !1, d = Pi(c) || c === !0, p = {};
    let _ = e, g, v;
    if (d && (_ = +t.startOf(_, "isoWeek", c)), _ = +t.startOf(_, d ? "day" : l), t.diff(s, e, l) > 1e5 * h)
      throw new Error(e + " and " + s + " are too far apart with stepSize of " + h + " " + l);
    const x = r.ticks.source === "data" && this.getDataTimestamps();
    for (g = _, v = 0; g < s; g = +t.add(g, h, l), v++)
      pl(p, g, x);
    return (g === s || r.bounds === "ticks" || v === 1) && pl(p, g, x), Object.keys(p).sort(ul).map((b) => +b);
  }
  getLabelForValue(t) {
    const e = this._adapter, s = this.options.time;
    return s.tooltipFormat ? e.format(t, s.tooltipFormat) : e.format(t, s.displayFormats.datetime);
  }
  format(t, e) {
    const r = this.options.time.displayFormats, o = this._unit, l = e || r[o];
    return this._adapter.format(t, l);
  }
  _tickFormatFunction(t, e, s, r) {
    const o = this.options, l = o.ticks.callback;
    if (l)
      return pt(l, [
        t,
        e,
        s
      ], this);
    const h = o.time.displayFormats, c = this._unit, d = this._majorUnit, p = c && h[c], _ = d && h[d], g = s[e], v = d && _ && g && g.major;
    return this._adapter.format(t, r || (v ? _ : p));
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
    const e = this.options.ticks, s = this.ctx.measureText(t).width, r = re(this.isHorizontal() ? e.maxRotation : e.minRotation), o = Math.cos(r), l = Math.sin(r), h = this._resolveTickFontOptions(0).size;
    return {
      w: s * o + h * l,
      h: s * l + h * o
    };
  }
  _getLabelCapacity(t) {
    const e = this.options.time, s = e.displayFormats, r = s[e.unit] || s.millisecond, o = this._tickFormatFunction(t, 0, _l(this, [
      t
    ], this._majorUnit), r), l = this._getLabelSize(o), h = Math.floor(this.isHorizontal() ? this.width / l.w : this.height / l.h) - 1;
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
      t.push(dl(this, r[e]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return kl(t.sort(ul));
  }
}
z(gn, "id", "time"), z(gn, "defaults", {
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
function as(n, t, e) {
  let s = 0, r = n.length - 1, o, l, h, c;
  e ? (t >= n[s].pos && t <= n[r].pos && ({ lo: s, hi: r } = Se(n, "pos", t)), { pos: o, time: h } = n[s], { pos: l, time: c } = n[r]) : (t >= n[s].time && t <= n[r].time && ({ lo: s, hi: r } = Se(n, "time", t)), { time: o, pos: h } = n[s], { time: l, pos: c } = n[r]);
  const d = l - o;
  return d ? h + (c - h) * (t - o) / d : h;
}
class Io extends gn {
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), e = this._table = this.buildLookupTable(t);
    this._minPos = as(e, this.min), this._tableRange = as(e, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: e, max: s } = this, r = [], o = [];
    let l, h, c, d, p;
    for (l = 0, h = t.length; l < h; ++l)
      d = t[l], d >= e && d <= s && r.push(d);
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
    for (l = 0, h = r.length; l < h; ++l)
      p = r[l + 1], c = r[l - 1], d = r[l], Math.round((p + c) / 2) !== d && o.push({
        time: d,
        pos: l / (h - 1)
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
    return (as(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const e = this._offsets, s = this.getDecimalForPixel(t) / e.factor - e.end;
    return as(this._table, s * this._tableRange + this._minPos, !0);
  }
}
z(Io, "id", "timeseries"), z(Io, "defaults", gn.defaults);
var A_ = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  CategoryScale: To,
  LinearScale: Oo,
  LogarithmicScale: Ao,
  RadialLinearScale: sn,
  TimeScale: gn,
  TimeSeriesScale: Io
});
const E_ = [
  Bd,
  fp,
  l_,
  A_
];
var Jo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function I_(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var ls = { exports: {} };
/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */
var ml;
function ph() {
  return ml || (ml = 1, function(n, t) {
    (function(e, s) {
      s(t);
    })(Jo, function(e) {
      var s = "1.9.4";
      function r(i) {
        var a, u, f, m;
        for (u = 1, f = arguments.length; u < f; u++) {
          m = arguments[u];
          for (a in m)
            i[a] = m[a];
        }
        return i;
      }
      var o = Object.create || function() {
        function i() {
        }
        return function(a) {
          return i.prototype = a, new i();
        };
      }();
      function l(i, a) {
        var u = Array.prototype.slice;
        if (i.bind)
          return i.bind.apply(i, u.call(arguments, 1));
        var f = u.call(arguments, 2);
        return function() {
          return i.apply(a, f.length ? f.concat(u.call(arguments)) : arguments);
        };
      }
      var h = 0;
      function c(i) {
        return "_leaflet_id" in i || (i._leaflet_id = ++h), i._leaflet_id;
      }
      function d(i, a, u) {
        var f, m, y, w;
        return w = function() {
          f = !1, m && (y.apply(u, m), m = !1);
        }, y = function() {
          f ? m = arguments : (i.apply(u, arguments), setTimeout(w, a), f = !0);
        }, y;
      }
      function p(i, a, u) {
        var f = a[1], m = a[0], y = f - m;
        return i === f && u ? i : ((i - m) % y + y) % y + m;
      }
      function _() {
        return !1;
      }
      function g(i, a) {
        if (a === !1)
          return i;
        var u = Math.pow(10, a === void 0 ? 6 : a);
        return Math.round(i * u) / u;
      }
      function v(i) {
        return i.trim ? i.trim() : i.replace(/^\s+|\s+$/g, "");
      }
      function x(i) {
        return v(i).split(/\s+/);
      }
      function b(i, a) {
        Object.prototype.hasOwnProperty.call(i, "options") || (i.options = i.options ? o(i.options) : {});
        for (var u in a)
          i.options[u] = a[u];
        return i.options;
      }
      function M(i, a, u) {
        var f = [];
        for (var m in i)
          f.push(encodeURIComponent(u ? m.toUpperCase() : m) + "=" + encodeURIComponent(i[m]));
        return (!a || a.indexOf("?") === -1 ? "?" : "&") + f.join("&");
      }
      var P = /\{ *([\w_ -]+) *\}/g;
      function S(i, a) {
        return i.replace(P, function(u, f) {
          var m = a[f];
          if (m === void 0)
            throw new Error("No value provided for variable " + u);
          return typeof m == "function" && (m = m(a)), m;
        });
      }
      var O = Array.isArray || function(i) {
        return Object.prototype.toString.call(i) === "[object Array]";
      };
      function A(i, a) {
        for (var u = 0; u < i.length; u++)
          if (i[u] === a)
            return u;
        return -1;
      }
      var T = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
      function I(i) {
        return window["webkit" + i] || window["moz" + i] || window["ms" + i];
      }
      var D = 0;
      function B(i) {
        var a = +/* @__PURE__ */ new Date(), u = Math.max(0, 16 - (a - D));
        return D = a + u, window.setTimeout(i, u);
      }
      var N = window.requestAnimationFrame || I("RequestAnimationFrame") || B, G = window.cancelAnimationFrame || I("CancelAnimationFrame") || I("CancelRequestAnimationFrame") || function(i) {
        window.clearTimeout(i);
      };
      function Z(i, a, u) {
        if (u && N === B)
          i.call(a);
        else
          return N.call(window, l(i, a));
      }
      function V(i) {
        i && G.call(window, i);
      }
      var Mt = {
        __proto__: null,
        extend: r,
        create: o,
        bind: l,
        get lastId() {
          return h;
        },
        stamp: c,
        throttle: d,
        wrapNum: p,
        falseFn: _,
        formatNum: g,
        trim: v,
        splitWords: x,
        setOptions: b,
        getParamString: M,
        template: S,
        isArray: O,
        indexOf: A,
        emptyImageUrl: T,
        requestFn: N,
        cancelFn: G,
        requestAnimFrame: Z,
        cancelAnimFrame: V
      };
      function at() {
      }
      at.extend = function(i) {
        var a = function() {
          b(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
        }, u = a.__super__ = this.prototype, f = o(u);
        f.constructor = a, a.prototype = f;
        for (var m in this)
          Object.prototype.hasOwnProperty.call(this, m) && m !== "prototype" && m !== "__super__" && (a[m] = this[m]);
        return i.statics && r(a, i.statics), i.includes && (lt(i.includes), r.apply(null, [f].concat(i.includes))), r(f, i), delete f.statics, delete f.includes, f.options && (f.options = u.options ? o(u.options) : {}, r(f.options, i.options)), f._initHooks = [], f.callInitHooks = function() {
          if (!this._initHooksCalled) {
            u.callInitHooks && u.callInitHooks.call(this), this._initHooksCalled = !0;
            for (var y = 0, w = f._initHooks.length; y < w; y++)
              f._initHooks[y].call(this);
          }
        }, a;
      }, at.include = function(i) {
        var a = this.prototype.options;
        return r(this.prototype, i), i.options && (this.prototype.options = a, this.mergeOptions(i.options)), this;
      }, at.mergeOptions = function(i) {
        return r(this.prototype.options, i), this;
      }, at.addInitHook = function(i) {
        var a = Array.prototype.slice.call(arguments, 1), u = typeof i == "function" ? i : function() {
          this[i].apply(this, a);
        };
        return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(u), this;
      };
      function lt(i) {
        if (!(typeof L > "u" || !L || !L.Mixin)) {
          i = O(i) ? i : [i];
          for (var a = 0; a < i.length; a++)
            i[a] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
        }
      }
      var $ = {
        /* @method on(type: String, fn: Function, context?: Object): this
         * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
         *
         * @alternative
         * @method on(eventMap: Object): this
         * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
         */
        on: function(i, a, u) {
          if (typeof i == "object")
            for (var f in i)
              this._on(f, i[f], a);
          else {
            i = x(i);
            for (var m = 0, y = i.length; m < y; m++)
              this._on(i[m], a, u);
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
        off: function(i, a, u) {
          if (!arguments.length)
            delete this._events;
          else if (typeof i == "object")
            for (var f in i)
              this._off(f, i[f], a);
          else {
            i = x(i);
            for (var m = arguments.length === 1, y = 0, w = i.length; y < w; y++)
              m ? this._off(i[y]) : this._off(i[y], a, u);
          }
          return this;
        },
        // attach listener (without syntactic sugar now)
        _on: function(i, a, u, f) {
          if (typeof a != "function") {
            console.warn("wrong listener type: " + typeof a);
            return;
          }
          if (this._listens(i, a, u) === !1) {
            u === this && (u = void 0);
            var m = { fn: a, ctx: u };
            f && (m.once = !0), this._events = this._events || {}, this._events[i] = this._events[i] || [], this._events[i].push(m);
          }
        },
        _off: function(i, a, u) {
          var f, m, y;
          if (this._events && (f = this._events[i], !!f)) {
            if (arguments.length === 1) {
              if (this._firingCount)
                for (m = 0, y = f.length; m < y; m++)
                  f[m].fn = _;
              delete this._events[i];
              return;
            }
            if (typeof a != "function") {
              console.warn("wrong listener type: " + typeof a);
              return;
            }
            var w = this._listens(i, a, u);
            if (w !== !1) {
              var k = f[w];
              this._firingCount && (k.fn = _, this._events[i] = f = f.slice()), f.splice(w, 1);
            }
          }
        },
        // @method fire(type: String, data?: Object, propagate?: Boolean): this
        // Fires an event of the specified type. You can optionally provide a data
        // object — the first argument of the listener function will contain its
        // properties. The event can optionally be propagated to event parents.
        fire: function(i, a, u) {
          if (!this.listens(i, u))
            return this;
          var f = r({}, a, {
            type: i,
            target: this,
            sourceTarget: a && a.sourceTarget || this
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
        listens: function(i, a, u, f) {
          typeof i != "string" && console.warn('"string" type argument expected');
          var m = a;
          typeof a != "function" && (f = !!a, m = void 0, u = void 0);
          var y = this._events && this._events[i];
          if (y && y.length && this._listens(i, m, u) !== !1)
            return !0;
          if (f) {
            for (var w in this._eventParents)
              if (this._eventParents[w].listens(i, a, u, f))
                return !0;
          }
          return !1;
        },
        // returns the index (number) or false
        _listens: function(i, a, u) {
          if (!this._events)
            return !1;
          var f = this._events[i] || [];
          if (!a)
            return !!f.length;
          u === this && (u = void 0);
          for (var m = 0, y = f.length; m < y; m++)
            if (f[m].fn === a && f[m].ctx === u)
              return m;
          return !1;
        },
        // @method once(…): this
        // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
        once: function(i, a, u) {
          if (typeof i == "object")
            for (var f in i)
              this._on(f, i[f], a, !0);
          else {
            i = x(i);
            for (var m = 0, y = i.length; m < y; m++)
              this._on(i[m], a, u, !0);
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
          for (var a in this._eventParents)
            this._eventParents[a].fire(i.type, r({
              layer: i.target,
              propagatedFrom: i.target
            }, i), !0);
        }
      };
      $.addEventListener = $.on, $.removeEventListener = $.clearAllEventListeners = $.off, $.addOneTimeEventListener = $.once, $.fireEvent = $.fire, $.hasEventListeners = $.listens;
      var ct = at.extend($);
      function H(i, a, u) {
        this.x = u ? Math.round(i) : i, this.y = u ? Math.round(a) : a;
      }
      var nt = Math.trunc || function(i) {
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
          return this.x = nt(this.x), this.y = nt(this.y), this;
        },
        // @method distanceTo(otherPoint: Point): Number
        // Returns the cartesian distance between the current and the given points.
        distanceTo: function(i) {
          i = F(i);
          var a = i.x - this.x, u = i.y - this.y;
          return Math.sqrt(a * a + u * u);
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
          return "Point(" + g(this.x) + ", " + g(this.y) + ")";
        }
      };
      function F(i, a, u) {
        return i instanceof H ? i : O(i) ? new H(i[0], i[1]) : i == null ? i : typeof i == "object" && "x" in i && "y" in i ? new H(i.x, i.y) : new H(i, a, u);
      }
      function K(i, a) {
        if (i)
          for (var u = a ? [i, a] : i, f = 0, m = u.length; f < m; f++)
            this.extend(u[f]);
      }
      K.prototype = {
        // @method extend(point: Point): this
        // Extends the bounds to contain the given point.
        // @alternative
        // @method extend(otherBounds: Bounds): this
        // Extend the bounds to contain the given bounds
        extend: function(i) {
          var a, u;
          if (!i)
            return this;
          if (i instanceof H || typeof i[0] == "number" || "x" in i)
            a = u = F(i);
          else if (i = ht(i), a = i.min, u = i.max, !a || !u)
            return this;
          return !this.min && !this.max ? (this.min = a.clone(), this.max = u.clone()) : (this.min.x = Math.min(a.x, this.min.x), this.max.x = Math.max(u.x, this.max.x), this.min.y = Math.min(a.y, this.min.y), this.max.y = Math.max(u.y, this.max.y)), this;
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
          var a, u;
          return typeof i[0] == "number" || i instanceof H ? i = F(i) : i = ht(i), i instanceof K ? (a = i.min, u = i.max) : a = u = i, a.x >= this.min.x && u.x <= this.max.x && a.y >= this.min.y && u.y <= this.max.y;
        },
        // @method intersects(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle intersects the given bounds. Two bounds
        // intersect if they have at least one point in common.
        intersects: function(i) {
          i = ht(i);
          var a = this.min, u = this.max, f = i.min, m = i.max, y = m.x >= a.x && f.x <= u.x, w = m.y >= a.y && f.y <= u.y;
          return y && w;
        },
        // @method overlaps(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle overlaps the given bounds. Two bounds
        // overlap if their intersection is an area.
        overlaps: function(i) {
          i = ht(i);
          var a = this.min, u = this.max, f = i.min, m = i.max, y = m.x > a.x && f.x < u.x, w = m.y > a.y && f.y < u.y;
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
          var a = this.min, u = this.max, f = Math.abs(a.x - u.x) * i, m = Math.abs(a.y - u.y) * i;
          return ht(
            F(a.x - f, a.y - m),
            F(u.x + f, u.y + m)
          );
        },
        // @method equals(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle is equivalent to the given bounds.
        equals: function(i) {
          return i ? (i = ht(i), this.min.equals(i.getTopLeft()) && this.max.equals(i.getBottomRight())) : !1;
        }
      };
      function ht(i, a) {
        return !i || i instanceof K ? i : new K(i, a);
      }
      function vt(i, a) {
        if (i)
          for (var u = a ? [i, a] : i, f = 0, m = u.length; f < m; f++)
            this.extend(u[f]);
      }
      vt.prototype = {
        // @method extend(latlng: LatLng): this
        // Extend the bounds to contain the given point
        // @alternative
        // @method extend(otherBounds: LatLngBounds): this
        // Extend the bounds to contain the given bounds
        extend: function(i) {
          var a = this._southWest, u = this._northEast, f, m;
          if (i instanceof J)
            f = i, m = i;
          else if (i instanceof vt) {
            if (f = i._southWest, m = i._northEast, !f || !m)
              return this;
          } else
            return i ? this.extend(U(i) || ot(i)) : this;
          return !a && !u ? (this._southWest = new J(f.lat, f.lng), this._northEast = new J(m.lat, m.lng)) : (a.lat = Math.min(f.lat, a.lat), a.lng = Math.min(f.lng, a.lng), u.lat = Math.max(m.lat, u.lat), u.lng = Math.max(m.lng, u.lng)), this;
        },
        // @method pad(bufferRatio: Number): LatLngBounds
        // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
        // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
        // Negative values will retract the bounds.
        pad: function(i) {
          var a = this._southWest, u = this._northEast, f = Math.abs(a.lat - u.lat) * i, m = Math.abs(a.lng - u.lng) * i;
          return new vt(
            new J(a.lat - f, a.lng - m),
            new J(u.lat + f, u.lng + m)
          );
        },
        // @method getCenter(): LatLng
        // Returns the center point of the bounds.
        getCenter: function() {
          return new J(
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
          return new J(this.getNorth(), this.getWest());
        },
        // @method getSouthEast(): LatLng
        // Returns the south-east point of the bounds.
        getSouthEast: function() {
          return new J(this.getSouth(), this.getEast());
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
          typeof i[0] == "number" || i instanceof J || "lat" in i ? i = U(i) : i = ot(i);
          var a = this._southWest, u = this._northEast, f, m;
          return i instanceof vt ? (f = i.getSouthWest(), m = i.getNorthEast()) : f = m = i, f.lat >= a.lat && m.lat <= u.lat && f.lng >= a.lng && m.lng <= u.lng;
        },
        // @method intersects(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
        intersects: function(i) {
          i = ot(i);
          var a = this._southWest, u = this._northEast, f = i.getSouthWest(), m = i.getNorthEast(), y = m.lat >= a.lat && f.lat <= u.lat, w = m.lng >= a.lng && f.lng <= u.lng;
          return y && w;
        },
        // @method overlaps(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
        overlaps: function(i) {
          i = ot(i);
          var a = this._southWest, u = this._northEast, f = i.getSouthWest(), m = i.getNorthEast(), y = m.lat > a.lat && f.lat < u.lat, w = m.lng > a.lng && f.lng < u.lng;
          return y && w;
        },
        // @method toBBoxString(): String
        // Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
        toBBoxString: function() {
          return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
        },
        // @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
        // Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
        equals: function(i, a) {
          return i ? (i = ot(i), this._southWest.equals(i.getSouthWest(), a) && this._northEast.equals(i.getNorthEast(), a)) : !1;
        },
        // @method isValid(): Boolean
        // Returns `true` if the bounds are properly initialized.
        isValid: function() {
          return !!(this._southWest && this._northEast);
        }
      };
      function ot(i, a) {
        return i instanceof vt ? i : new vt(i, a);
      }
      function J(i, a, u) {
        if (isNaN(i) || isNaN(a))
          throw new Error("Invalid LatLng object: (" + i + ", " + a + ")");
        this.lat = +i, this.lng = +a, u !== void 0 && (this.alt = +u);
      }
      J.prototype = {
        // @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
        // Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
        equals: function(i, a) {
          if (!i)
            return !1;
          i = U(i);
          var u = Math.max(
            Math.abs(this.lat - i.lat),
            Math.abs(this.lng - i.lng)
          );
          return u <= (a === void 0 ? 1e-9 : a);
        },
        // @method toString(): String
        // Returns a string representation of the point (for debugging purposes).
        toString: function(i) {
          return "LatLng(" + g(this.lat, i) + ", " + g(this.lng, i) + ")";
        },
        // @method distanceTo(otherLatLng: LatLng): Number
        // Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
        distanceTo: function(i) {
          return Zt.distance(this, U(i));
        },
        // @method wrap(): LatLng
        // Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
        wrap: function() {
          return Zt.wrapLatLng(this);
        },
        // @method toBounds(sizeInMeters: Number): LatLngBounds
        // Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
        toBounds: function(i) {
          var a = 180 * i / 40075017, u = a / Math.cos(Math.PI / 180 * this.lat);
          return ot(
            [this.lat - a, this.lng - u],
            [this.lat + a, this.lng + u]
          );
        },
        clone: function() {
          return new J(this.lat, this.lng, this.alt);
        }
      };
      function U(i, a, u) {
        return i instanceof J ? i : O(i) && typeof i[0] != "object" ? i.length === 3 ? new J(i[0], i[1], i[2]) : i.length === 2 ? new J(i[0], i[1]) : null : i == null ? i : typeof i == "object" && "lat" in i ? new J(i.lat, "lng" in i ? i.lng : i.lon, i.alt) : a === void 0 ? null : new J(i, a, u);
      }
      var Gt = {
        // @method latLngToPoint(latlng: LatLng, zoom: Number): Point
        // Projects geographical coordinates into pixel coordinates for a given zoom.
        latLngToPoint: function(i, a) {
          var u = this.projection.project(i), f = this.scale(a);
          return this.transformation._transform(u, f);
        },
        // @method pointToLatLng(point: Point, zoom: Number): LatLng
        // The inverse of `latLngToPoint`. Projects pixel coordinates on a given
        // zoom into geographical coordinates.
        pointToLatLng: function(i, a) {
          var u = this.scale(a), f = this.transformation.untransform(i, u);
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
          var a = this.projection.bounds, u = this.scale(i), f = this.transformation.transform(a.min, u), m = this.transformation.transform(a.max, u);
          return new K(f, m);
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
          var a = this.wrapLng ? p(i.lng, this.wrapLng, !0) : i.lng, u = this.wrapLat ? p(i.lat, this.wrapLat, !0) : i.lat, f = i.alt;
          return new J(u, a, f);
        },
        // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
        // Returns a `LatLngBounds` with the same size as the given one, ensuring
        // that its center is within the CRS's bounds.
        // Only accepts actual `L.LatLngBounds` instances, not arrays.
        wrapLatLngBounds: function(i) {
          var a = i.getCenter(), u = this.wrapLatLng(a), f = a.lat - u.lat, m = a.lng - u.lng;
          if (f === 0 && m === 0)
            return i;
          var y = i.getSouthWest(), w = i.getNorthEast(), k = new J(y.lat - f, y.lng - m), C = new J(w.lat - f, w.lng - m);
          return new vt(k, C);
        }
      }, Zt = r({}, Gt, {
        wrapLng: [-180, 180],
        // Mean Earth Radius, as recommended for use by
        // the International Union of Geodesy and Geophysics,
        // see https://rosettacode.org/wiki/Haversine_formula
        R: 6371e3,
        // distance between two geographical points using spherical law of cosines approximation
        distance: function(i, a) {
          var u = Math.PI / 180, f = i.lat * u, m = a.lat * u, y = Math.sin((a.lat - i.lat) * u / 2), w = Math.sin((a.lng - i.lng) * u / 2), k = y * y + Math.cos(f) * Math.cos(m) * w * w, C = 2 * Math.atan2(Math.sqrt(k), Math.sqrt(1 - k));
          return this.R * C;
        }
      }), ie = 6378137, Yt = {
        R: ie,
        MAX_LATITUDE: 85.0511287798,
        project: function(i) {
          var a = Math.PI / 180, u = this.MAX_LATITUDE, f = Math.max(Math.min(u, i.lat), -u), m = Math.sin(f * a);
          return new H(
            this.R * i.lng * a,
            this.R * Math.log((1 + m) / (1 - m)) / 2
          );
        },
        unproject: function(i) {
          var a = 180 / Math.PI;
          return new J(
            (2 * Math.atan(Math.exp(i.y / this.R)) - Math.PI / 2) * a,
            i.x * a / this.R
          );
        },
        bounds: function() {
          var i = ie * Math.PI;
          return new K([-i, -i], [i, i]);
        }()
      };
      function le(i, a, u, f) {
        if (O(i)) {
          this._a = i[0], this._b = i[1], this._c = i[2], this._d = i[3];
          return;
        }
        this._a = i, this._b = a, this._c = u, this._d = f;
      }
      le.prototype = {
        // @method transform(point: Point, scale?: Number): Point
        // Returns a transformed point, optionally multiplied by the given scale.
        // Only accepts actual `L.Point` instances, not arrays.
        transform: function(i, a) {
          return this._transform(i.clone(), a);
        },
        // destructive transform (faster)
        _transform: function(i, a) {
          return a = a || 1, i.x = a * (this._a * i.x + this._b), i.y = a * (this._c * i.y + this._d), i;
        },
        // @method untransform(point: Point, scale?: Number): Point
        // Returns the reverse transformation of the given point, optionally divided
        // by the given scale. Only accepts actual `L.Point` instances, not arrays.
        untransform: function(i, a) {
          return a = a || 1, new H(
            (i.x / a - this._b) / this._a,
            (i.y / a - this._d) / this._c
          );
        }
      };
      function he(i, a, u, f) {
        return new le(i, a, u, f);
      }
      var Ve = r({}, Zt, {
        code: "EPSG:3857",
        projection: Yt,
        transformation: function() {
          var i = 0.5 / (Math.PI * Yt.R);
          return he(i, 0.5, -i, 0.5);
        }()
      }), Ci = r({}, Ve, {
        code: "EPSG:900913"
      });
      function li(i) {
        return document.createElementNS("http://www.w3.org/2000/svg", i);
      }
      function hi(i, a) {
        var u = "", f, m, y, w, k, C;
        for (f = 0, y = i.length; f < y; f++) {
          for (k = i[f], m = 0, w = k.length; m < w; m++)
            C = k[m], u += (m ? "L" : "M") + C.x + " " + C.y;
          u += a ? W.svg ? "z" : "x" : "";
        }
        return u || "M0 0";
      }
      var je = document.documentElement.style, Oe = "ActiveXObject" in window, Ae = Oe && !document.addEventListener, Ti = "msLaunchUri" in navigator && !("documentMode" in document), ci = ce("webkit"), xn = ce("android"), wn = ce("android 2") || ce("android 3"), Oi = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), Ln = xn && ce("Google") && Oi < 537 && !("AudioNode" in window), zt = !!window.opera, At = !Ti && ce("chrome"), St = ce("gecko") && !ci && !zt && !Oe, ne = !At && ce("safari"), Ai = ce("phantom"), Ei = "OTransition" in je, Mn = navigator.platform.indexOf("Win") === 0, Ii = Oe && "transition" in je, ui = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !wn, Di = "MozPerspective" in je, Pn = !window.L_DISABLE_3D && (Ii || ui || Di) && !Ei && !Ai, Ee = typeof orientation < "u" || ce("mobile"), kn = Ee && ci, Sn = Ee && ui, Et = !window.PointerEvent && window.MSPointerEvent, xt = !!(window.PointerEvent || Et), dt = "ontouchstart" in window || !!window.TouchEvent, Ht = !window.L_NO_TOUCH && (dt || xt), wt = Ee && zt, qt = Ee && St, Kt = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, Cn = function() {
        var i = !1;
        try {
          var a = Object.defineProperty({}, "passive", {
            get: function() {
              i = !0;
            }
          });
          window.addEventListener("testPassiveEventSupport", _, a), window.removeEventListener("testPassiveEventSupport", _, a);
        } catch {
        }
        return i;
      }(), Tn = function() {
        return !!document.createElement("canvas").getContext;
      }(), di = !!(document.createElementNS && li("svg").createSVGRect), _h = !!di && function() {
        var i = document.createElement("div");
        return i.innerHTML = "<svg/>", (i.firstChild && i.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
      }(), mh = !di && function() {
        try {
          var i = document.createElement("div");
          i.innerHTML = '<v:shape adj="1"/>';
          var a = i.firstChild;
          return a.style.behavior = "url(#default#VML)", a && typeof a.adj == "object";
        } catch {
          return !1;
        }
      }(), gh = navigator.platform.indexOf("Mac") === 0, vh = navigator.platform.indexOf("Linux") === 0;
      function ce(i) {
        return navigator.userAgent.toLowerCase().indexOf(i) >= 0;
      }
      var W = {
        ie: Oe,
        ielt9: Ae,
        edge: Ti,
        webkit: ci,
        android: xn,
        android23: wn,
        androidStock: Ln,
        opera: zt,
        chrome: At,
        gecko: St,
        safari: ne,
        phantom: Ai,
        opera12: Ei,
        win: Mn,
        ie3d: Ii,
        webkit3d: ui,
        gecko3d: Di,
        any3d: Pn,
        mobile: Ee,
        mobileWebkit: kn,
        mobileWebkit3d: Sn,
        msPointer: Et,
        pointer: xt,
        touch: Ht,
        touchNative: dt,
        mobileOpera: wt,
        mobileGecko: qt,
        retina: Kt,
        passiveEvents: Cn,
        canvas: Tn,
        svg: di,
        vml: mh,
        inlineSvg: _h,
        mac: gh,
        linux: vh
      }, Qo = W.msPointer ? "MSPointerDown" : "pointerdown", tr = W.msPointer ? "MSPointerMove" : "pointermove", er = W.msPointer ? "MSPointerUp" : "pointerup", ir = W.msPointer ? "MSPointerCancel" : "pointercancel", Es = {
        touchstart: Qo,
        touchmove: tr,
        touchend: er,
        touchcancel: ir
      }, nr = {
        touchstart: Mh,
        touchmove: On,
        touchend: On,
        touchcancel: On
      }, fi = {}, sr = !1;
      function yh(i, a, u) {
        return a === "touchstart" && Lh(), nr[a] ? (u = nr[a].bind(this, u), i.addEventListener(Es[a], u, !1), u) : (console.warn("wrong event specified:", a), _);
      }
      function bh(i, a, u) {
        if (!Es[a]) {
          console.warn("wrong event specified:", a);
          return;
        }
        i.removeEventListener(Es[a], u, !1);
      }
      function xh(i) {
        fi[i.pointerId] = i;
      }
      function wh(i) {
        fi[i.pointerId] && (fi[i.pointerId] = i);
      }
      function or(i) {
        delete fi[i.pointerId];
      }
      function Lh() {
        sr || (document.addEventListener(Qo, xh, !0), document.addEventListener(tr, wh, !0), document.addEventListener(er, or, !0), document.addEventListener(ir, or, !0), sr = !0);
      }
      function On(i, a) {
        if (a.pointerType !== (a.MSPOINTER_TYPE_MOUSE || "mouse")) {
          a.touches = [];
          for (var u in fi)
            a.touches.push(fi[u]);
          a.changedTouches = [a], i(a);
        }
      }
      function Mh(i, a) {
        a.MSPOINTER_TYPE_TOUCH && a.pointerType === a.MSPOINTER_TYPE_TOUCH && Bt(a), On(i, a);
      }
      function Ph(i) {
        var a = {}, u, f;
        for (f in i)
          u = i[f], a[f] = u && u.bind ? u.bind(i) : u;
        return i = a, a.type = "dblclick", a.detail = 2, a.isTrusted = !1, a._simulated = !0, a;
      }
      var kh = 200;
      function Sh(i, a) {
        i.addEventListener("dblclick", a);
        var u = 0, f;
        function m(y) {
          if (y.detail !== 1) {
            f = y.detail;
            return;
          }
          if (!(y.pointerType === "mouse" || y.sourceCapabilities && !y.sourceCapabilities.firesTouchEvents)) {
            var w = cr(y);
            if (!(w.some(function(C) {
              return C instanceof HTMLLabelElement && C.attributes.for;
            }) && !w.some(function(C) {
              return C instanceof HTMLInputElement || C instanceof HTMLSelectElement;
            }))) {
              var k = Date.now();
              k - u <= kh ? (f++, f === 2 && a(Ph(y))) : f = 1, u = k;
            }
          }
        }
        return i.addEventListener("click", m), {
          dblclick: a,
          simDblclick: m
        };
      }
      function Ch(i, a) {
        i.removeEventListener("dblclick", a.dblclick), i.removeEventListener("click", a.simDblclick);
      }
      var Is = In(
        ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
      ), zi = In(
        ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
      ), rr = zi === "webkitTransition" || zi === "OTransition" ? zi + "End" : "transitionend";
      function ar(i) {
        return typeof i == "string" ? document.getElementById(i) : i;
      }
      function Bi(i, a) {
        var u = i.style[a] || i.currentStyle && i.currentStyle[a];
        if ((!u || u === "auto") && document.defaultView) {
          var f = document.defaultView.getComputedStyle(i, null);
          u = f ? f[a] : null;
        }
        return u === "auto" ? null : u;
      }
      function rt(i, a, u) {
        var f = document.createElement(i);
        return f.className = a || "", u && u.appendChild(f), f;
      }
      function bt(i) {
        var a = i.parentNode;
        a && a.removeChild(i);
      }
      function An(i) {
        for (; i.firstChild; )
          i.removeChild(i.firstChild);
      }
      function pi(i) {
        var a = i.parentNode;
        a && a.lastChild !== i && a.appendChild(i);
      }
      function _i(i) {
        var a = i.parentNode;
        a && a.firstChild !== i && a.insertBefore(i, a.firstChild);
      }
      function Ds(i, a) {
        if (i.classList !== void 0)
          return i.classList.contains(a);
        var u = En(i);
        return u.length > 0 && new RegExp("(^|\\s)" + a + "(\\s|$)").test(u);
      }
      function X(i, a) {
        if (i.classList !== void 0)
          for (var u = x(a), f = 0, m = u.length; f < m; f++)
            i.classList.add(u[f]);
        else if (!Ds(i, a)) {
          var y = En(i);
          zs(i, (y ? y + " " : "") + a);
        }
      }
      function Pt(i, a) {
        i.classList !== void 0 ? i.classList.remove(a) : zs(i, v((" " + En(i) + " ").replace(" " + a + " ", " ")));
      }
      function zs(i, a) {
        i.className.baseVal === void 0 ? i.className = a : i.className.baseVal = a;
      }
      function En(i) {
        return i.correspondingElement && (i = i.correspondingElement), i.className.baseVal === void 0 ? i.className : i.className.baseVal;
      }
      function Jt(i, a) {
        "opacity" in i.style ? i.style.opacity = a : "filter" in i.style && Th(i, a);
      }
      function Th(i, a) {
        var u = !1, f = "DXImageTransform.Microsoft.Alpha";
        try {
          u = i.filters.item(f);
        } catch {
          if (a === 1)
            return;
        }
        a = Math.round(a * 100), u ? (u.Enabled = a !== 100, u.Opacity = a) : i.style.filter += " progid:" + f + "(opacity=" + a + ")";
      }
      function In(i) {
        for (var a = document.documentElement.style, u = 0; u < i.length; u++)
          if (i[u] in a)
            return i[u];
        return !1;
      }
      function Ue(i, a, u) {
        var f = a || new H(0, 0);
        i.style[Is] = (W.ie3d ? "translate(" + f.x + "px," + f.y + "px)" : "translate3d(" + f.x + "px," + f.y + "px,0)") + (u ? " scale(" + u + ")" : "");
      }
      function Ct(i, a) {
        i._leaflet_pos = a, W.any3d ? Ue(i, a) : (i.style.left = a.x + "px", i.style.top = a.y + "px");
      }
      function Ge(i) {
        return i._leaflet_pos || new H(0, 0);
      }
      var Ri, Fi, Bs;
      if ("onselectstart" in document)
        Ri = function() {
          Y(window, "selectstart", Bt);
        }, Fi = function() {
          ft(window, "selectstart", Bt);
        };
      else {
        var Ni = In(
          ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
        );
        Ri = function() {
          if (Ni) {
            var i = document.documentElement.style;
            Bs = i[Ni], i[Ni] = "none";
          }
        }, Fi = function() {
          Ni && (document.documentElement.style[Ni] = Bs, Bs = void 0);
        };
      }
      function Rs() {
        Y(window, "dragstart", Bt);
      }
      function Fs() {
        ft(window, "dragstart", Bt);
      }
      var Dn, Ns;
      function Zs(i) {
        for (; i.tabIndex === -1; )
          i = i.parentNode;
        i.style && (zn(), Dn = i, Ns = i.style.outlineStyle, i.style.outlineStyle = "none", Y(window, "keydown", zn));
      }
      function zn() {
        Dn && (Dn.style.outlineStyle = Ns, Dn = void 0, Ns = void 0, ft(window, "keydown", zn));
      }
      function lr(i) {
        do
          i = i.parentNode;
        while ((!i.offsetWidth || !i.offsetHeight) && i !== document.body);
        return i;
      }
      function Hs(i) {
        var a = i.getBoundingClientRect();
        return {
          x: a.width / i.offsetWidth || 1,
          y: a.height / i.offsetHeight || 1,
          boundingClientRect: a
        };
      }
      var Oh = {
        __proto__: null,
        TRANSFORM: Is,
        TRANSITION: zi,
        TRANSITION_END: rr,
        get: ar,
        getStyle: Bi,
        create: rt,
        remove: bt,
        empty: An,
        toFront: pi,
        toBack: _i,
        hasClass: Ds,
        addClass: X,
        removeClass: Pt,
        setClass: zs,
        getClass: En,
        setOpacity: Jt,
        testProp: In,
        setTransform: Ue,
        setPosition: Ct,
        getPosition: Ge,
        get disableTextSelection() {
          return Ri;
        },
        get enableTextSelection() {
          return Fi;
        },
        disableImageDrag: Rs,
        enableImageDrag: Fs,
        preventOutline: Zs,
        restoreOutline: zn,
        getSizedParentNode: lr,
        getScale: Hs
      };
      function Y(i, a, u, f) {
        if (a && typeof a == "object")
          for (var m in a)
            Vs(i, m, a[m], u);
        else {
          a = x(a);
          for (var y = 0, w = a.length; y < w; y++)
            Vs(i, a[y], u, f);
        }
        return this;
      }
      var ue = "_leaflet_events";
      function ft(i, a, u, f) {
        if (arguments.length === 1)
          hr(i), delete i[ue];
        else if (a && typeof a == "object")
          for (var m in a)
            js(i, m, a[m], u);
        else if (a = x(a), arguments.length === 2)
          hr(i, function(k) {
            return A(a, k) !== -1;
          });
        else
          for (var y = 0, w = a.length; y < w; y++)
            js(i, a[y], u, f);
        return this;
      }
      function hr(i, a) {
        for (var u in i[ue]) {
          var f = u.split(/\d/)[0];
          (!a || a(f)) && js(i, f, null, null, u);
        }
      }
      var Ws = {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        wheel: !("onwheel" in window) && "mousewheel"
      };
      function Vs(i, a, u, f) {
        var m = a + c(u) + (f ? "_" + c(f) : "");
        if (i[ue] && i[ue][m])
          return this;
        var y = function(k) {
          return u.call(f || i, k || window.event);
        }, w = y;
        !W.touchNative && W.pointer && a.indexOf("touch") === 0 ? y = yh(i, a, y) : W.touch && a === "dblclick" ? y = Sh(i, y) : "addEventListener" in i ? a === "touchstart" || a === "touchmove" || a === "wheel" || a === "mousewheel" ? i.addEventListener(Ws[a] || a, y, W.passiveEvents ? { passive: !1 } : !1) : a === "mouseenter" || a === "mouseleave" ? (y = function(k) {
          k = k || window.event, Gs(i, k) && w(k);
        }, i.addEventListener(Ws[a], y, !1)) : i.addEventListener(a, w, !1) : i.attachEvent("on" + a, y), i[ue] = i[ue] || {}, i[ue][m] = y;
      }
      function js(i, a, u, f, m) {
        m = m || a + c(u) + (f ? "_" + c(f) : "");
        var y = i[ue] && i[ue][m];
        if (!y)
          return this;
        !W.touchNative && W.pointer && a.indexOf("touch") === 0 ? bh(i, a, y) : W.touch && a === "dblclick" ? Ch(i, y) : "removeEventListener" in i ? i.removeEventListener(Ws[a] || a, y, !1) : i.detachEvent("on" + a, y), i[ue][m] = null;
      }
      function Ye(i) {
        return i.stopPropagation ? i.stopPropagation() : i.originalEvent ? i.originalEvent._stopped = !0 : i.cancelBubble = !0, this;
      }
      function Us(i) {
        return Vs(i, "wheel", Ye), this;
      }
      function Zi(i) {
        return Y(i, "mousedown touchstart dblclick contextmenu", Ye), i._leaflet_disable_click = !0, this;
      }
      function Bt(i) {
        return i.preventDefault ? i.preventDefault() : i.returnValue = !1, this;
      }
      function qe(i) {
        return Bt(i), Ye(i), this;
      }
      function cr(i) {
        if (i.composedPath)
          return i.composedPath();
        for (var a = [], u = i.target; u; )
          a.push(u), u = u.parentNode;
        return a;
      }
      function ur(i, a) {
        if (!a)
          return new H(i.clientX, i.clientY);
        var u = Hs(a), f = u.boundingClientRect;
        return new H(
          // offset.left/top values are in page scale (like clientX/Y),
          // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
          (i.clientX - f.left) / u.x - a.clientLeft,
          (i.clientY - f.top) / u.y - a.clientTop
        );
      }
      var Ah = W.linux && W.chrome ? window.devicePixelRatio : W.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
      function dr(i) {
        return W.edge ? i.wheelDeltaY / 2 : (
          // Don't trust window-geometry-based delta
          i.deltaY && i.deltaMode === 0 ? -i.deltaY / Ah : (
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
      function Gs(i, a) {
        var u = a.relatedTarget;
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
      var Eh = {
        __proto__: null,
        on: Y,
        off: ft,
        stopPropagation: Ye,
        disableScrollPropagation: Us,
        disableClickPropagation: Zi,
        preventDefault: Bt,
        stop: qe,
        getPropagationPath: cr,
        getMousePosition: ur,
        getWheelDelta: dr,
        isExternalTarget: Gs,
        addListener: Y,
        removeListener: ft
      }, fr = ct.extend({
        // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
        // Run an animation of a given element to a new position, optionally setting
        // duration in seconds (`0.25` by default) and easing linearity factor (3rd
        // argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
        // `0.5` by default).
        run: function(i, a, u, f) {
          this.stop(), this._el = i, this._inProgress = !0, this._duration = u || 0.25, this._easeOutPower = 1 / Math.max(f || 0.5, 0.2), this._startPos = Ge(i), this._offset = a.subtract(this._startPos), this._startTime = +/* @__PURE__ */ new Date(), this.fire("start"), this._animate();
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
          var a = +/* @__PURE__ */ new Date() - this._startTime, u = this._duration * 1e3;
          a < u ? this._runFrame(this._easeOut(a / u), i) : (this._runFrame(1), this._complete());
        },
        _runFrame: function(i, a) {
          var u = this._startPos.add(this._offset.multiplyBy(i));
          a && u._round(), Ct(this._el, u), this.fire("step");
        },
        _complete: function() {
          V(this._animId), this._inProgress = !1, this.fire("end");
        },
        _easeOut: function(i) {
          return 1 - Math.pow(1 - i, this._easeOutPower);
        }
      }), it = ct.extend({
        options: {
          // @section Map State Options
          // @option crs: CRS = L.CRS.EPSG3857
          // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
          // sure what it means.
          crs: Ve,
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
        initialize: function(i, a) {
          a = b(this, a), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(i), this._initLayout(), this._onResize = l(this._onResize, this), this._initEvents(), a.maxBounds && this.setMaxBounds(a.maxBounds), a.zoom !== void 0 && (this._zoom = this._limitZoom(a.zoom)), a.center && a.zoom !== void 0 && this.setView(U(a.center), a.zoom, { reset: !0 }), this.callInitHooks(), this._zoomAnimated = zi && W.any3d && !W.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), Y(this._proxy, rr, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
        },
        // @section Methods for modifying map state
        // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
        // Sets the view of the map (geographical center and zoom) with the given
        // animation options.
        setView: function(i, a, u) {
          if (a = a === void 0 ? this._zoom : this._limitZoom(a), i = this._limitCenter(U(i), a, this.options.maxBounds), u = u || {}, this._stop(), this._loaded && !u.reset && u !== !0) {
            u.animate !== void 0 && (u.zoom = r({ animate: u.animate }, u.zoom), u.pan = r({ animate: u.animate, duration: u.duration }, u.pan));
            var f = this._zoom !== a ? this._tryAnimatedZoom && this._tryAnimatedZoom(i, a, u.zoom) : this._tryAnimatedPan(i, u.pan);
            if (f)
              return clearTimeout(this._sizeTimer), this;
          }
          return this._resetView(i, a, u.pan && u.pan.noMoveStart), this;
        },
        // @method setZoom(zoom: Number, options?: Zoom/pan options): this
        // Sets the zoom of the map.
        setZoom: function(i, a) {
          return this._loaded ? this.setView(this.getCenter(), i, { zoom: a }) : (this._zoom = i, this);
        },
        // @method zoomIn(delta?: Number, options?: Zoom options): this
        // Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
        zoomIn: function(i, a) {
          return i = i || (W.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom + i, a);
        },
        // @method zoomOut(delta?: Number, options?: Zoom options): this
        // Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
        zoomOut: function(i, a) {
          return i = i || (W.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom - i, a);
        },
        // @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
        // Zooms the map while keeping a specified geographical point on the map
        // stationary (e.g. used internally for scroll zoom and double-click zoom).
        // @alternative
        // @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
        // Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
        setZoomAround: function(i, a, u) {
          var f = this.getZoomScale(a), m = this.getSize().divideBy(2), y = i instanceof H ? i : this.latLngToContainerPoint(i), w = y.subtract(m).multiplyBy(1 - 1 / f), k = this.containerPointToLatLng(m.add(w));
          return this.setView(k, a, { zoom: u });
        },
        _getBoundsCenterZoom: function(i, a) {
          a = a || {}, i = i.getBounds ? i.getBounds() : ot(i);
          var u = F(a.paddingTopLeft || a.padding || [0, 0]), f = F(a.paddingBottomRight || a.padding || [0, 0]), m = this.getBoundsZoom(i, !1, u.add(f));
          if (m = typeof a.maxZoom == "number" ? Math.min(a.maxZoom, m) : m, m === 1 / 0)
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
        fitBounds: function(i, a) {
          if (i = ot(i), !i.isValid())
            throw new Error("Bounds are not valid.");
          var u = this._getBoundsCenterZoom(i, a);
          return this.setView(u.center, u.zoom, a);
        },
        // @method fitWorld(options?: fitBounds options): this
        // Sets a map view that mostly contains the whole world with the maximum
        // zoom level possible.
        fitWorld: function(i) {
          return this.fitBounds([[-90, -180], [90, 180]], i);
        },
        // @method panTo(latlng: LatLng, options?: Pan options): this
        // Pans the map to a given center.
        panTo: function(i, a) {
          return this.setView(i, this._zoom, { pan: a });
        },
        // @method panBy(offset: Point, options?: Pan options): this
        // Pans the map by a given number of pixels (animated).
        panBy: function(i, a) {
          if (i = F(i).round(), a = a || {}, !i.x && !i.y)
            return this.fire("moveend");
          if (a.animate !== !0 && !this.getSize().contains(i))
            return this._resetView(this.unproject(this.project(this.getCenter()).add(i)), this.getZoom()), this;
          if (this._panAnim || (this._panAnim = new fr(), this._panAnim.on({
            step: this._onPanTransitionStep,
            end: this._onPanTransitionEnd
          }, this)), a.noMoveStart || this.fire("movestart"), a.animate !== !1) {
            X(this._mapPane, "leaflet-pan-anim");
            var u = this._getMapPanePos().subtract(i).round();
            this._panAnim.run(this._mapPane, u, a.duration || 0.25, a.easeLinearity);
          } else
            this._rawPanBy(i), this.fire("move").fire("moveend");
          return this;
        },
        // @method flyTo(latlng: LatLng, zoom?: Number, options?: Zoom/pan options): this
        // Sets the view of the map (geographical center and zoom) performing a smooth
        // pan-zoom animation.
        flyTo: function(i, a, u) {
          if (u = u || {}, u.animate === !1 || !W.any3d)
            return this.setView(i, a, u);
          this._stop();
          var f = this.project(this.getCenter()), m = this.project(i), y = this.getSize(), w = this._zoom;
          i = U(i), a = a === void 0 ? w : a;
          var k = Math.max(y.x, y.y), C = k * this.getZoomScale(w, a), E = m.distanceTo(f) || 1, R = 1.42, j = R * R;
          function Q(Tt) {
            var Yn = Tt ? -1 : 1, bc = Tt ? C : k, xc = C * C - k * k + Yn * j * j * E * E, wc = 2 * bc * j * E, no = xc / wc, Yr = Math.sqrt(no * no + 1) - no, Lc = Yr < 1e-9 ? -18 : Math.log(Yr);
            return Lc;
          }
          function Wt(Tt) {
            return (Math.exp(Tt) - Math.exp(-Tt)) / 2;
          }
          function It(Tt) {
            return (Math.exp(Tt) + Math.exp(-Tt)) / 2;
          }
          function te(Tt) {
            return Wt(Tt) / It(Tt);
          }
          var Vt = Q(0);
          function xi(Tt) {
            return k * (It(Vt) / It(Vt + R * Tt));
          }
          function mc(Tt) {
            return k * (It(Vt) * te(Vt + R * Tt) - Wt(Vt)) / j;
          }
          function gc(Tt) {
            return 1 - Math.pow(1 - Tt, 1.5);
          }
          var vc = Date.now(), Ur = (Q(1) - Vt) / R, yc = u.duration ? 1e3 * u.duration : 1e3 * Ur * 0.8;
          function Gr() {
            var Tt = (Date.now() - vc) / yc, Yn = gc(Tt) * Ur;
            Tt <= 1 ? (this._flyToFrame = Z(Gr, this), this._move(
              this.unproject(f.add(m.subtract(f).multiplyBy(mc(Yn) / E)), w),
              this.getScaleZoom(k / xi(Yn), w),
              { flyTo: !0 }
            )) : this._move(i, a)._moveEnd(!0);
          }
          return this._moveStart(!0, u.noMoveStart), Gr.call(this), this;
        },
        // @method flyToBounds(bounds: LatLngBounds, options?: fitBounds options): this
        // Sets the view of the map with a smooth animation like [`flyTo`](#map-flyto),
        // but takes a bounds parameter like [`fitBounds`](#map-fitbounds).
        flyToBounds: function(i, a) {
          var u = this._getBoundsCenterZoom(i, a);
          return this.flyTo(u.center, u.zoom, a);
        },
        // @method setMaxBounds(bounds: LatLngBounds): this
        // Restricts the map view to the given bounds (see the [maxBounds](#map-maxbounds) option).
        setMaxBounds: function(i) {
          return i = ot(i), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), i.isValid() ? (this.options.maxBounds = i, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this);
        },
        // @method setMinZoom(zoom: Number): this
        // Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
        setMinZoom: function(i) {
          var a = this.options.minZoom;
          return this.options.minZoom = i, this._loaded && a !== i && (this.fire("zoomlevelschange"), this.getZoom() < this.options.minZoom) ? this.setZoom(i) : this;
        },
        // @method setMaxZoom(zoom: Number): this
        // Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
        setMaxZoom: function(i) {
          var a = this.options.maxZoom;
          return this.options.maxZoom = i, this._loaded && a !== i && (this.fire("zoomlevelschange"), this.getZoom() > this.options.maxZoom) ? this.setZoom(i) : this;
        },
        // @method panInsideBounds(bounds: LatLngBounds, options?: Pan options): this
        // Pans the map to the closest view that would lie inside the given bounds (if it's not already), controlling the animation using the options specific, if any.
        panInsideBounds: function(i, a) {
          this._enforcingBounds = !0;
          var u = this.getCenter(), f = this._limitCenter(u, this._zoom, ot(i));
          return u.equals(f) || this.panTo(f, a), this._enforcingBounds = !1, this;
        },
        // @method panInside(latlng: LatLng, options?: padding options): this
        // Pans the map the minimum amount to make the `latlng` visible. Use
        // padding options to fit the display to more restricted bounds.
        // If `latlng` is already within the (optionally padded) display bounds,
        // the map will not be panned.
        panInside: function(i, a) {
          a = a || {};
          var u = F(a.paddingTopLeft || a.padding || [0, 0]), f = F(a.paddingBottomRight || a.padding || [0, 0]), m = this.project(this.getCenter()), y = this.project(i), w = this.getPixelBounds(), k = ht([w.min.add(u), w.max.subtract(f)]), C = k.getSize();
          if (!k.contains(y)) {
            this._enforcingBounds = !0;
            var E = y.subtract(k.getCenter()), R = k.extend(y).getSize().subtract(C);
            m.x += E.x < 0 ? -R.x : R.x, m.y += E.y < 0 ? -R.y : R.y, this.panTo(this.unproject(m), a), this._enforcingBounds = !1;
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
          var a = this.getSize();
          this._sizeChanged = !0, this._lastCenter = null;
          var u = this.getSize(), f = a.divideBy(2).round(), m = u.divideBy(2).round(), y = f.subtract(m);
          return !y.x && !y.y ? this : (i.animate && i.pan ? this.panBy(y) : (i.pan && this._rawPanBy(y), this.fire("move"), i.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(l(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
            oldSize: a,
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
          var a = l(this._handleGeolocationResponse, this), u = l(this._handleGeolocationError, this);
          return i.watch ? this._locationWatchId = navigator.geolocation.watchPosition(a, u, i) : navigator.geolocation.getCurrentPosition(a, u, i), this;
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
            var a = i.code, u = i.message || (a === 1 ? "permission denied" : a === 2 ? "position unavailable" : "timeout");
            this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
              code: a,
              message: "Geolocation error: " + u + "."
            });
          }
        },
        _handleGeolocationResponse: function(i) {
          if (this._container._leaflet_id) {
            var a = i.coords.latitude, u = i.coords.longitude, f = new J(a, u), m = f.toBounds(i.coords.accuracy * 2), y = this._locateOptions;
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
        addHandler: function(i, a) {
          if (!a)
            return this;
          var u = this[i] = new a(this);
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
          this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), bt(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest && (V(this._resizeRequest), this._resizeRequest = null), this._clearHandlers(), this._loaded && this.fire("unload");
          var i;
          for (i in this._layers)
            this._layers[i].remove();
          for (i in this._panes)
            bt(this._panes[i]);
          return this._layers = [], this._panes = [], delete this._mapPane, delete this._renderer, this;
        },
        // @section Other Methods
        // @method createPane(name: String, container?: HTMLElement): HTMLElement
        // Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
        // then returns it. The pane is created as a child of `container`, or
        // as a child of the main map pane if not set.
        createPane: function(i, a) {
          var u = "leaflet-pane" + (i ? " leaflet-" + i.replace("Pane", "") + "-pane" : ""), f = rt("div", u, a || this._mapPane);
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
          var i = this.getPixelBounds(), a = this.unproject(i.getBottomLeft()), u = this.unproject(i.getTopRight());
          return new vt(a, u);
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
        getBoundsZoom: function(i, a, u) {
          i = ot(i), u = F(u || [0, 0]);
          var f = this.getZoom() || 0, m = this.getMinZoom(), y = this.getMaxZoom(), w = i.getNorthWest(), k = i.getSouthEast(), C = this.getSize().subtract(u), E = ht(this.project(k, f), this.project(w, f)).getSize(), R = W.any3d ? this.options.zoomSnap : 1, j = C.x / E.x, Q = C.y / E.y, Wt = a ? Math.max(j, Q) : Math.min(j, Q);
          return f = this.getScaleZoom(Wt, f), R && (f = Math.round(f / (R / 100)) * (R / 100), f = a ? Math.ceil(f / R) * R : Math.floor(f / R) * R), Math.max(m, Math.min(y, f));
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
        getPixelBounds: function(i, a) {
          var u = this._getTopLeftPoint(i, a);
          return new K(u, u.add(this.getSize()));
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
        getZoomScale: function(i, a) {
          var u = this.options.crs;
          return a = a === void 0 ? this._zoom : a, u.scale(i) / u.scale(a);
        },
        // @method getScaleZoom(scale: Number, fromZoom: Number): Number
        // Returns the zoom level that the map would end up at, if it is at `fromZoom`
        // level and everything is scaled by a factor of `scale`. Inverse of
        // [`getZoomScale`](#map-getZoomScale).
        getScaleZoom: function(i, a) {
          var u = this.options.crs;
          a = a === void 0 ? this._zoom : a;
          var f = u.zoom(i * u.scale(a));
          return isNaN(f) ? 1 / 0 : f;
        },
        // @method project(latlng: LatLng, zoom: Number): Point
        // Projects a geographical coordinate `LatLng` according to the projection
        // of the map's CRS, then scales it according to `zoom` and the CRS's
        // `Transformation`. The result is pixel coordinate relative to
        // the CRS origin.
        project: function(i, a) {
          return a = a === void 0 ? this._zoom : a, this.options.crs.latLngToPoint(U(i), a);
        },
        // @method unproject(point: Point, zoom: Number): LatLng
        // Inverse of [`project`](#map-project).
        unproject: function(i, a) {
          return a = a === void 0 ? this._zoom : a, this.options.crs.pointToLatLng(F(i), a);
        },
        // @method layerPointToLatLng(point: Point): LatLng
        // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
        // returns the corresponding geographical coordinate (for the current zoom level).
        layerPointToLatLng: function(i) {
          var a = F(i).add(this.getPixelOrigin());
          return this.unproject(a);
        },
        // @method latLngToLayerPoint(latlng: LatLng): Point
        // Given a geographical coordinate, returns the corresponding pixel coordinate
        // relative to the [origin pixel](#map-getpixelorigin).
        latLngToLayerPoint: function(i) {
          var a = this.project(U(i))._round();
          return a._subtract(this.getPixelOrigin());
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
          return this.options.crs.wrapLatLngBounds(ot(i));
        },
        // @method distance(latlng1: LatLng, latlng2: LatLng): Number
        // Returns the distance between two geographical coordinates according to
        // the map's CRS. By default this measures distance in meters.
        distance: function(i, a) {
          return this.options.crs.distance(U(i), U(a));
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
          var a = this.containerPointToLayerPoint(F(i));
          return this.layerPointToLatLng(a);
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
          return ur(i, this._container);
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
          var a = this._container = ar(i);
          if (a) {
            if (a._leaflet_id)
              throw new Error("Map container is already initialized.");
          } else
            throw new Error("Map container not found.");
          Y(a, "scroll", this._onScroll, this), this._containerId = c(a);
        },
        _initLayout: function() {
          var i = this._container;
          this._fadeAnimated = this.options.fadeAnimation && W.any3d, X(i, "leaflet-container" + (W.touch ? " leaflet-touch" : "") + (W.retina ? " leaflet-retina" : "") + (W.ielt9 ? " leaflet-oldie" : "") + (W.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
          var a = Bi(i, "position");
          a !== "absolute" && a !== "relative" && a !== "fixed" && a !== "sticky" && (i.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
        },
        _initPanes: function() {
          var i = this._panes = {};
          this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), Ct(this._mapPane, new H(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (X(i.markerPane, "leaflet-zoom-hide"), X(i.shadowPane, "leaflet-zoom-hide"));
        },
        // private methods that modify map state
        // @section Map state change events
        _resetView: function(i, a, u) {
          Ct(this._mapPane, new H(0, 0));
          var f = !this._loaded;
          this._loaded = !0, a = this._limitZoom(a), this.fire("viewprereset");
          var m = this._zoom !== a;
          this._moveStart(m, u)._move(i, a)._moveEnd(m), this.fire("viewreset"), f && this.fire("load");
        },
        _moveStart: function(i, a) {
          return i && this.fire("zoomstart"), a || this.fire("movestart"), this;
        },
        _move: function(i, a, u, f) {
          a === void 0 && (a = this._zoom);
          var m = this._zoom !== a;
          return this._zoom = a, this._lastCenter = i, this._pixelOrigin = this._getNewPixelOrigin(i), f ? u && u.pinch && this.fire("zoom", u) : ((m || u && u.pinch) && this.fire("zoom", u), this.fire("move", u)), this;
        },
        _moveEnd: function(i) {
          return i && this.fire("zoomend"), this.fire("moveend");
        },
        _stop: function() {
          return V(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
        },
        _rawPanBy: function(i) {
          Ct(this._mapPane, this._getMapPanePos().subtract(i));
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
          var a = i ? ft : Y;
          a(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && a(window, "resize", this._onResize, this), W.any3d && this.options.transform3DLimit && (i ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
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
        _findEventTargets: function(i, a) {
          for (var u = [], f, m = a === "mouseout" || a === "mouseover", y = i.target || i.srcElement, w = !1; y; ) {
            if (f = this._targets[c(y)], f && (a === "click" || a === "preclick") && this._draggableMoved(f)) {
              w = !0;
              break;
            }
            if (f && f.listens(a, !0) && (m && !Gs(y, i) || (u.push(f), m)) || y === this._container)
              break;
            y = y.parentNode;
          }
          return !u.length && !w && !m && this.listens(a, !0) && (u = [this]), u;
        },
        _isClickDisabled: function(i) {
          for (; i && i !== this._container; ) {
            if (i._leaflet_disable_click)
              return !0;
            i = i.parentNode;
          }
        },
        _handleDOMEvent: function(i) {
          var a = i.target || i.srcElement;
          if (!(!this._loaded || a._leaflet_disable_events || i.type === "click" && this._isClickDisabled(a))) {
            var u = i.type;
            u === "mousedown" && Zs(a), this._fireDOMEvent(i, u);
          }
        },
        _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
        _fireDOMEvent: function(i, a, u) {
          if (i.type === "click") {
            var f = r({}, i);
            f.type = "preclick", this._fireDOMEvent(f, f.type, u);
          }
          var m = this._findEventTargets(i, a);
          if (u) {
            for (var y = [], w = 0; w < u.length; w++)
              u[w].listens(a, !0) && y.push(u[w]);
            m = y.concat(m);
          }
          if (m.length) {
            a === "contextmenu" && Bt(i);
            var k = m[0], C = {
              originalEvent: i
            };
            if (i.type !== "keypress" && i.type !== "keydown" && i.type !== "keyup") {
              var E = k.getLatLng && (!k._radius || k._radius <= 10);
              C.containerPoint = E ? this.latLngToContainerPoint(k.getLatLng()) : this.mouseEventToContainerPoint(i), C.layerPoint = this.containerPointToLayerPoint(C.containerPoint), C.latlng = E ? k.getLatLng() : this.layerPointToLatLng(C.layerPoint);
            }
            for (w = 0; w < m.length; w++)
              if (m[w].fire(a, C, !0), C.originalEvent._stopped || m[w].options.bubblingMouseEvents === !1 && A(this._mouseEvents, a) !== -1)
                return;
          }
        },
        _draggableMoved: function(i) {
          return i = i.dragging && i.dragging.enabled() ? i : this, i.dragging && i.dragging.moved() || this.boxZoom && this.boxZoom.moved();
        },
        _clearHandlers: function() {
          for (var i = 0, a = this._handlers.length; i < a; i++)
            this._handlers[i].disable();
        },
        // @section Other Methods
        // @method whenReady(fn: Function, context?: Object): this
        // Runs the given function `fn` when the map gets initialized with
        // a view (center and zoom) and at least one layer, or immediately
        // if it's already initialized, optionally passing a function context.
        whenReady: function(i, a) {
          return this._loaded ? i.call(a || this, { target: this }) : this.on("load", i, a), this;
        },
        // private methods for getting map state
        _getMapPanePos: function() {
          return Ge(this._mapPane) || new H(0, 0);
        },
        _moved: function() {
          var i = this._getMapPanePos();
          return i && !i.equals([0, 0]);
        },
        _getTopLeftPoint: function(i, a) {
          var u = i && a !== void 0 ? this._getNewPixelOrigin(i, a) : this.getPixelOrigin();
          return u.subtract(this._getMapPanePos());
        },
        _getNewPixelOrigin: function(i, a) {
          var u = this.getSize()._divideBy(2);
          return this.project(i, a)._subtract(u)._add(this._getMapPanePos())._round();
        },
        _latLngToNewLayerPoint: function(i, a, u) {
          var f = this._getNewPixelOrigin(u, a);
          return this.project(i, a)._subtract(f);
        },
        _latLngBoundsToNewLayerBounds: function(i, a, u) {
          var f = this._getNewPixelOrigin(u, a);
          return ht([
            this.project(i.getSouthWest(), a)._subtract(f),
            this.project(i.getNorthWest(), a)._subtract(f),
            this.project(i.getSouthEast(), a)._subtract(f),
            this.project(i.getNorthEast(), a)._subtract(f)
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
        _limitCenter: function(i, a, u) {
          if (!u)
            return i;
          var f = this.project(i, a), m = this.getSize().divideBy(2), y = new K(f.subtract(m), f.add(m)), w = this._getBoundsOffset(y, u, a);
          return Math.abs(w.x) <= 1 && Math.abs(w.y) <= 1 ? i : this.unproject(f.add(w), a);
        },
        // adjust offset for view to get inside bounds
        _limitOffset: function(i, a) {
          if (!a)
            return i;
          var u = this.getPixelBounds(), f = new K(u.min.add(i), u.max.add(i));
          return i.add(this._getBoundsOffset(f, a));
        },
        // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
        _getBoundsOffset: function(i, a, u) {
          var f = ht(
            this.project(a.getNorthEast(), u),
            this.project(a.getSouthWest(), u)
          ), m = f.min.subtract(i.min), y = f.max.subtract(i.max), w = this._rebound(m.x, -y.x), k = this._rebound(m.y, -y.y);
          return new H(w, k);
        },
        _rebound: function(i, a) {
          return i + a > 0 ? Math.round(i - a) / 2 : Math.max(0, Math.ceil(i)) - Math.max(0, Math.floor(a));
        },
        _limitZoom: function(i) {
          var a = this.getMinZoom(), u = this.getMaxZoom(), f = W.any3d ? this.options.zoomSnap : 1;
          return f && (i = Math.round(i / f) * f), Math.max(a, Math.min(u, i));
        },
        _onPanTransitionStep: function() {
          this.fire("move");
        },
        _onPanTransitionEnd: function() {
          Pt(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
        },
        _tryAnimatedPan: function(i, a) {
          var u = this._getCenterOffset(i)._trunc();
          return (a && a.animate) !== !0 && !this.getSize().contains(u) ? !1 : (this.panBy(u, a), !0);
        },
        _createAnimProxy: function() {
          var i = this._proxy = rt("div", "leaflet-proxy leaflet-zoom-animated");
          this._panes.mapPane.appendChild(i), this.on("zoomanim", function(a) {
            var u = Is, f = this._proxy.style[u];
            Ue(this._proxy, this.project(a.center, a.zoom), this.getZoomScale(a.zoom, 1)), f === this._proxy.style[u] && this._animatingZoom && this._onZoomTransitionEnd();
          }, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
        },
        _destroyAnimProxy: function() {
          bt(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
        },
        _animMoveEnd: function() {
          var i = this.getCenter(), a = this.getZoom();
          Ue(this._proxy, this.project(i, a), this.getZoomScale(a, 1));
        },
        _catchTransitionEnd: function(i) {
          this._animatingZoom && i.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd();
        },
        _nothingToAnimate: function() {
          return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
        },
        _tryAnimatedZoom: function(i, a, u) {
          if (this._animatingZoom)
            return !0;
          if (u = u || {}, !this._zoomAnimated || u.animate === !1 || this._nothingToAnimate() || Math.abs(a - this._zoom) > this.options.zoomAnimationThreshold)
            return !1;
          var f = this.getZoomScale(a), m = this._getCenterOffset(i)._divideBy(1 - 1 / f);
          return u.animate !== !0 && !this.getSize().contains(m) ? !1 : (Z(function() {
            this._moveStart(!0, u.noMoveStart || !1)._animateZoom(i, a, !0);
          }, this), !0);
        },
        _animateZoom: function(i, a, u, f) {
          this._mapPane && (u && (this._animatingZoom = !0, this._animateToCenter = i, this._animateToZoom = a, X(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
            center: i,
            zoom: a,
            noUpdate: f
          }), this._tempFireZoomEvent || (this._tempFireZoomEvent = this._zoom !== this._animateToZoom), this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(l(this._onZoomTransitionEnd, this), 250));
        },
        _onZoomTransitionEnd: function() {
          this._animatingZoom && (this._mapPane && Pt(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
        }
      });
      function Ih(i, a) {
        return new it(i, a);
      }
      var se = at.extend({
        // @section
        // @aka Control Options
        options: {
          // @option position: String = 'topright'
          // The position of the control (one of the map corners). Possible values are `'topleft'`,
          // `'topright'`, `'bottomleft'` or `'bottomright'`
          position: "topright"
        },
        initialize: function(i) {
          b(this, i);
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
          var a = this._map;
          return a && a.removeControl(this), this.options.position = i, a && a.addControl(this), this;
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
          var a = this._container = this.onAdd(i), u = this.getPosition(), f = i._controlCorners[u];
          return X(a, "leaflet-control"), u.indexOf("bottom") !== -1 ? f.insertBefore(a, f.firstChild) : f.appendChild(a), this._map.on("unload", this.remove, this), this;
        },
        // @method remove: this
        // Removes the control from the map it is currently active on.
        remove: function() {
          return this._map ? (bt(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), this._map = null, this) : this;
        },
        _refocusOnMap: function(i) {
          this._map && i && i.screenX > 0 && i.screenY > 0 && this._map.getContainer().focus();
        }
      }), Hi = function(i) {
        return new se(i);
      };
      it.include({
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
          var i = this._controlCorners = {}, a = "leaflet-", u = this._controlContainer = rt("div", a + "control-container", this._container);
          function f(m, y) {
            var w = a + m + " " + a + y;
            i[m + y] = rt("div", w, u);
          }
          f("top", "left"), f("top", "right"), f("bottom", "left"), f("bottom", "right");
        },
        _clearControlPos: function() {
          for (var i in this._controlCorners)
            bt(this._controlCorners[i]);
          bt(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
        }
      });
      var pr = se.extend({
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
          sortFunction: function(i, a, u, f) {
            return u < f ? -1 : f < u ? 1 : 0;
          }
        },
        initialize: function(i, a, u) {
          b(this, u), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, this._preventClick = !1;
          for (var f in i)
            this._addLayer(i[f], f);
          for (f in a)
            this._addLayer(a[f], f, !0);
        },
        onAdd: function(i) {
          this._initLayout(), this._update(), this._map = i, i.on("zoomend", this._checkDisabledLayers, this);
          for (var a = 0; a < this._layers.length; a++)
            this._layers[a].layer.on("add remove", this._onLayerChange, this);
          return this._container;
        },
        addTo: function(i) {
          return se.prototype.addTo.call(this, i), this._expandIfNotCollapsed();
        },
        onRemove: function() {
          this._map.off("zoomend", this._checkDisabledLayers, this);
          for (var i = 0; i < this._layers.length; i++)
            this._layers[i].layer.off("add remove", this._onLayerChange, this);
        },
        // @method addBaseLayer(layer: Layer, name: String): this
        // Adds a base layer (radio button entry) with the given name to the control.
        addBaseLayer: function(i, a) {
          return this._addLayer(i, a), this._map ? this._update() : this;
        },
        // @method addOverlay(layer: Layer, name: String): this
        // Adds an overlay (checkbox entry) with the given name to the control.
        addOverlay: function(i, a) {
          return this._addLayer(i, a, !0), this._map ? this._update() : this;
        },
        // @method removeLayer(layer: Layer): this
        // Remove the given layer from the control.
        removeLayer: function(i) {
          i.off("add remove", this._onLayerChange, this);
          var a = this._getLayer(c(i));
          return a && this._layers.splice(this._layers.indexOf(a), 1), this._map ? this._update() : this;
        },
        // @method expand(): this
        // Expand the control container if collapsed.
        expand: function() {
          X(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
          var i = this._map.getSize().y - (this._container.offsetTop + 50);
          return i < this._section.clientHeight ? (X(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = i + "px") : Pt(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
        },
        // @method collapse(): this
        // Collapse the control container if expanded.
        collapse: function() {
          return Pt(this._container, "leaflet-control-layers-expanded"), this;
        },
        _initLayout: function() {
          var i = "leaflet-control-layers", a = this._container = rt("div", i), u = this.options.collapsed;
          a.setAttribute("aria-haspopup", !0), Zi(a), Us(a);
          var f = this._section = rt("section", i + "-list");
          u && (this._map.on("click", this.collapse, this), Y(a, {
            mouseenter: this._expandSafely,
            mouseleave: this.collapse
          }, this));
          var m = this._layersLink = rt("a", i + "-toggle", a);
          m.href = "#", m.title = "Layers", m.setAttribute("role", "button"), Y(m, {
            keydown: function(y) {
              y.keyCode === 13 && this._expandSafely();
            },
            // Certain screen readers intercept the key event and instead send a click event
            click: function(y) {
              Bt(y), this._expandSafely();
            }
          }, this), u || this.expand(), this._baseLayersList = rt("div", i + "-base", f), this._separator = rt("div", i + "-separator", f), this._overlaysList = rt("div", i + "-overlays", f), a.appendChild(f);
        },
        _getLayer: function(i) {
          for (var a = 0; a < this._layers.length; a++)
            if (this._layers[a] && c(this._layers[a].layer) === i)
              return this._layers[a];
        },
        _addLayer: function(i, a, u) {
          this._map && i.on("add remove", this._onLayerChange, this), this._layers.push({
            layer: i,
            name: a,
            overlay: u
          }), this.options.sortLayers && this._layers.sort(l(function(f, m) {
            return this.options.sortFunction(f.layer, m.layer, f.name, m.name);
          }, this)), this.options.autoZIndex && i.setZIndex && (this._lastZIndex++, i.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed();
        },
        _update: function() {
          if (!this._container)
            return this;
          An(this._baseLayersList), An(this._overlaysList), this._layerControlInputs = [];
          var i, a, u, f, m = 0;
          for (u = 0; u < this._layers.length; u++)
            f = this._layers[u], this._addItem(f), a = a || f.overlay, i = i || !f.overlay, m += f.overlay ? 0 : 1;
          return this.options.hideSingleBase && (i = i && m > 1, this._baseLayersList.style.display = i ? "" : "none"), this._separator.style.display = a && i ? "" : "none", this;
        },
        _onLayerChange: function(i) {
          this._handlingClick || this._update();
          var a = this._getLayer(c(i.target)), u = a.overlay ? i.type === "add" ? "overlayadd" : "overlayremove" : i.type === "add" ? "baselayerchange" : null;
          u && this._map.fire(u, a);
        },
        // IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see https://stackoverflow.com/a/119079)
        _createRadioElement: function(i, a) {
          var u = '<input type="radio" class="leaflet-control-layers-selector" name="' + i + '"' + (a ? ' checked="checked"' : "") + "/>", f = document.createElement("div");
          return f.innerHTML = u, f.firstChild;
        },
        _addItem: function(i) {
          var a = document.createElement("label"), u = this._map.hasLayer(i.layer), f;
          i.overlay ? (f = document.createElement("input"), f.type = "checkbox", f.className = "leaflet-control-layers-selector", f.defaultChecked = u) : f = this._createRadioElement("leaflet-base-layers_" + c(this), u), this._layerControlInputs.push(f), f.layerId = c(i.layer), Y(f, "click", this._onInputClick, this);
          var m = document.createElement("span");
          m.innerHTML = " " + i.name;
          var y = document.createElement("span");
          a.appendChild(y), y.appendChild(f), y.appendChild(m);
          var w = i.overlay ? this._overlaysList : this._baseLayersList;
          return w.appendChild(a), this._checkDisabledLayers(), a;
        },
        _onInputClick: function() {
          if (!this._preventClick) {
            var i = this._layerControlInputs, a, u, f = [], m = [];
            this._handlingClick = !0;
            for (var y = i.length - 1; y >= 0; y--)
              a = i[y], u = this._getLayer(a.layerId).layer, a.checked ? f.push(u) : a.checked || m.push(u);
            for (y = 0; y < m.length; y++)
              this._map.hasLayer(m[y]) && this._map.removeLayer(m[y]);
            for (y = 0; y < f.length; y++)
              this._map.hasLayer(f[y]) || this._map.addLayer(f[y]);
            this._handlingClick = !1, this._refocusOnMap();
          }
        },
        _checkDisabledLayers: function() {
          for (var i = this._layerControlInputs, a, u, f = this._map.getZoom(), m = i.length - 1; m >= 0; m--)
            a = i[m], u = this._getLayer(a.layerId).layer, a.disabled = u.options.minZoom !== void 0 && f < u.options.minZoom || u.options.maxZoom !== void 0 && f > u.options.maxZoom;
        },
        _expandIfNotCollapsed: function() {
          return this._map && !this.options.collapsed && this.expand(), this;
        },
        _expandSafely: function() {
          var i = this._section;
          this._preventClick = !0, Y(i, "click", Bt), this.expand();
          var a = this;
          setTimeout(function() {
            ft(i, "click", Bt), a._preventClick = !1;
          });
        }
      }), Dh = function(i, a, u) {
        return new pr(i, a, u);
      }, Ys = se.extend({
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
          var a = "leaflet-control-zoom", u = rt("div", a + " leaflet-bar"), f = this.options;
          return this._zoomInButton = this._createButton(
            f.zoomInText,
            f.zoomInTitle,
            a + "-in",
            u,
            this._zoomIn
          ), this._zoomOutButton = this._createButton(
            f.zoomOutText,
            f.zoomOutTitle,
            a + "-out",
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
        _createButton: function(i, a, u, f, m) {
          var y = rt("a", u, f);
          return y.innerHTML = i, y.href = "#", y.title = a, y.setAttribute("role", "button"), y.setAttribute("aria-label", a), Zi(y), Y(y, "click", qe), Y(y, "click", m, this), Y(y, "click", this._refocusOnMap, this), y;
        },
        _updateDisabled: function() {
          var i = this._map, a = "leaflet-disabled";
          Pt(this._zoomInButton, a), Pt(this._zoomOutButton, a), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || i._zoom === i.getMinZoom()) && (X(this._zoomOutButton, a), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || i._zoom === i.getMaxZoom()) && (X(this._zoomInButton, a), this._zoomInButton.setAttribute("aria-disabled", "true"));
        }
      });
      it.mergeOptions({
        zoomControl: !0
      }), it.addInitHook(function() {
        this.options.zoomControl && (this.zoomControl = new Ys(), this.addControl(this.zoomControl));
      });
      var zh = function(i) {
        return new Ys(i);
      }, _r = se.extend({
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
          var a = "leaflet-control-scale", u = rt("div", a), f = this.options;
          return this._addScales(f, a + "-line", u), i.on(f.updateWhenIdle ? "moveend" : "move", this._update, this), i.whenReady(this._update, this), u;
        },
        onRemove: function(i) {
          i.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
        },
        _addScales: function(i, a, u) {
          i.metric && (this._mScale = rt("div", a, u)), i.imperial && (this._iScale = rt("div", a, u));
        },
        _update: function() {
          var i = this._map, a = i.getSize().y / 2, u = i.distance(
            i.containerPointToLatLng([0, a]),
            i.containerPointToLatLng([this.options.maxWidth, a])
          );
          this._updateScales(u);
        },
        _updateScales: function(i) {
          this.options.metric && i && this._updateMetric(i), this.options.imperial && i && this._updateImperial(i);
        },
        _updateMetric: function(i) {
          var a = this._getRoundNum(i), u = a < 1e3 ? a + " m" : a / 1e3 + " km";
          this._updateScale(this._mScale, u, a / i);
        },
        _updateImperial: function(i) {
          var a = i * 3.2808399, u, f, m;
          a > 5280 ? (u = a / 5280, f = this._getRoundNum(u), this._updateScale(this._iScale, f + " mi", f / u)) : (m = this._getRoundNum(a), this._updateScale(this._iScale, m + " ft", m / a));
        },
        _updateScale: function(i, a, u) {
          i.style.width = Math.round(this.options.maxWidth * u) + "px", i.innerHTML = a;
        },
        _getRoundNum: function(i) {
          var a = Math.pow(10, (Math.floor(i) + "").length - 1), u = i / a;
          return u = u >= 10 ? 10 : u >= 5 ? 5 : u >= 3 ? 3 : u >= 2 ? 2 : 1, a * u;
        }
      }), Bh = function(i) {
        return new _r(i);
      }, Rh = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>', qs = se.extend({
        // @section
        // @aka Control.Attribution options
        options: {
          position: "bottomright",
          // @option prefix: String|false = 'Leaflet'
          // The HTML text shown before the attributions. Pass `false` to disable.
          prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (W.inlineSvg ? Rh + " " : "") + "Leaflet</a>"
        },
        initialize: function(i) {
          b(this, i), this._attributions = {};
        },
        onAdd: function(i) {
          i.attributionControl = this, this._container = rt("div", "leaflet-control-attribution"), Zi(this._container);
          for (var a in i._layers)
            i._layers[a].getAttribution && this.addAttribution(i._layers[a].getAttribution());
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
            for (var a in this._attributions)
              this._attributions[a] && i.push(a);
            var u = [];
            this.options.prefix && u.push(this.options.prefix), i.length && u.push(i.join(", ")), this._container.innerHTML = u.join(' <span aria-hidden="true">|</span> ');
          }
        }
      });
      it.mergeOptions({
        attributionControl: !0
      }), it.addInitHook(function() {
        this.options.attributionControl && new qs().addTo(this);
      });
      var Fh = function(i) {
        return new qs(i);
      };
      se.Layers = pr, se.Zoom = Ys, se.Scale = _r, se.Attribution = qs, Hi.layers = Dh, Hi.zoom = zh, Hi.scale = Bh, Hi.attribution = Fh;
      var de = at.extend({
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
      de.addTo = function(i, a) {
        return i.addHandler(a, this), this;
      };
      var Nh = { Events: $ }, mr = W.touch ? "touchstart mousedown" : "mousedown", Ie = ct.extend({
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
        initialize: function(i, a, u, f) {
          b(this, f), this._element = i, this._dragStartTarget = a || i, this._preventOutline = u;
        },
        // @method enable()
        // Enables the dragging ability
        enable: function() {
          this._enabled || (Y(this._dragStartTarget, mr, this._onDown, this), this._enabled = !0);
        },
        // @method disable()
        // Disables the dragging ability
        disable: function() {
          this._enabled && (Ie._dragging === this && this.finishDrag(!0), ft(this._dragStartTarget, mr, this._onDown, this), this._enabled = !1, this._moved = !1);
        },
        _onDown: function(i) {
          if (this._enabled && (this._moved = !1, !Ds(this._element, "leaflet-zoom-anim"))) {
            if (i.touches && i.touches.length !== 1) {
              Ie._dragging === this && this.finishDrag();
              return;
            }
            if (!(Ie._dragging || i.shiftKey || i.which !== 1 && i.button !== 1 && !i.touches) && (Ie._dragging = this, this._preventOutline && Zs(this._element), Rs(), Ri(), !this._moving)) {
              this.fire("down");
              var a = i.touches ? i.touches[0] : i, u = lr(this._element);
              this._startPoint = new H(a.clientX, a.clientY), this._startPos = Ge(this._element), this._parentScale = Hs(u);
              var f = i.type === "mousedown";
              Y(document, f ? "mousemove" : "touchmove", this._onMove, this), Y(document, f ? "mouseup" : "touchend touchcancel", this._onUp, this);
            }
          }
        },
        _onMove: function(i) {
          if (this._enabled) {
            if (i.touches && i.touches.length > 1) {
              this._moved = !0;
              return;
            }
            var a = i.touches && i.touches.length === 1 ? i.touches[0] : i, u = new H(a.clientX, a.clientY)._subtract(this._startPoint);
            !u.x && !u.y || Math.abs(u.x) + Math.abs(u.y) < this.options.clickTolerance || (u.x /= this._parentScale.x, u.y /= this._parentScale.y, Bt(i), this._moved || (this.fire("dragstart"), this._moved = !0, X(document.body, "leaflet-dragging"), this._lastTarget = i.target || i.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), X(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(u), this._moving = !0, this._lastEvent = i, this._updatePosition());
          }
        },
        _updatePosition: function() {
          var i = { originalEvent: this._lastEvent };
          this.fire("predrag", i), Ct(this._element, this._newPos), this.fire("drag", i);
        },
        _onUp: function() {
          this._enabled && this.finishDrag();
        },
        finishDrag: function(i) {
          Pt(document.body, "leaflet-dragging"), this._lastTarget && (Pt(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null), ft(document, "mousemove touchmove", this._onMove, this), ft(document, "mouseup touchend touchcancel", this._onUp, this), Fs(), Fi();
          var a = this._moved && this._moving;
          this._moving = !1, Ie._dragging = !1, a && this.fire("dragend", {
            noInertia: i,
            distance: this._newPos.distanceTo(this._startPos)
          });
        }
      });
      function gr(i, a, u) {
        var f, m = [1, 4, 2, 8], y, w, k, C, E, R, j, Q;
        for (y = 0, R = i.length; y < R; y++)
          i[y]._code = $e(i[y], a);
        for (k = 0; k < 4; k++) {
          for (j = m[k], f = [], y = 0, R = i.length, w = R - 1; y < R; w = y++)
            C = i[y], E = i[w], C._code & j ? E._code & j || (Q = Bn(E, C, j, a, u), Q._code = $e(Q, a), f.push(Q)) : (E._code & j && (Q = Bn(E, C, j, a, u), Q._code = $e(Q, a), f.push(Q)), f.push(C));
          i = f;
        }
        return i;
      }
      function vr(i, a) {
        var u, f, m, y, w, k, C, E, R;
        if (!i || i.length === 0)
          throw new Error("latlngs not passed");
        Qt(i) || (console.warn("latlngs are not flat! Only the first ring will be used"), i = i[0]);
        var j = U([0, 0]), Q = ot(i), Wt = Q.getNorthWest().distanceTo(Q.getSouthWest()) * Q.getNorthEast().distanceTo(Q.getNorthWest());
        Wt < 1700 && (j = $s(i));
        var It = i.length, te = [];
        for (u = 0; u < It; u++) {
          var Vt = U(i[u]);
          te.push(a.project(U([Vt.lat - j.lat, Vt.lng - j.lng])));
        }
        for (k = C = E = 0, u = 0, f = It - 1; u < It; f = u++)
          m = te[u], y = te[f], w = m.y * y.x - y.y * m.x, C += (m.x + y.x) * w, E += (m.y + y.y) * w, k += w * 3;
        k === 0 ? R = te[0] : R = [C / k, E / k];
        var xi = a.unproject(F(R));
        return U([xi.lat + j.lat, xi.lng + j.lng]);
      }
      function $s(i) {
        for (var a = 0, u = 0, f = 0, m = 0; m < i.length; m++) {
          var y = U(i[m]);
          a += y.lat, u += y.lng, f++;
        }
        return U([a / f, u / f]);
      }
      var Zh = {
        __proto__: null,
        clipPolygon: gr,
        polygonCenter: vr,
        centroid: $s
      };
      function yr(i, a) {
        if (!a || !i.length)
          return i.slice();
        var u = a * a;
        return i = Vh(i, u), i = Wh(i, u), i;
      }
      function br(i, a, u) {
        return Math.sqrt(Wi(i, a, u, !0));
      }
      function Hh(i, a, u) {
        return Wi(i, a, u);
      }
      function Wh(i, a) {
        var u = i.length, f = typeof Uint8Array != void 0 + "" ? Uint8Array : Array, m = new f(u);
        m[0] = m[u - 1] = 1, Xs(i, m, a, 0, u - 1);
        var y, w = [];
        for (y = 0; y < u; y++)
          m[y] && w.push(i[y]);
        return w;
      }
      function Xs(i, a, u, f, m) {
        var y = 0, w, k, C;
        for (k = f + 1; k <= m - 1; k++)
          C = Wi(i[k], i[f], i[m], !0), C > y && (w = k, y = C);
        y > u && (a[w] = 1, Xs(i, a, u, f, w), Xs(i, a, u, w, m));
      }
      function Vh(i, a) {
        for (var u = [i[0]], f = 1, m = 0, y = i.length; f < y; f++)
          jh(i[f], i[m]) > a && (u.push(i[f]), m = f);
        return m < y - 1 && u.push(i[y - 1]), u;
      }
      var xr;
      function wr(i, a, u, f, m) {
        var y = f ? xr : $e(i, u), w = $e(a, u), k, C, E;
        for (xr = w; ; ) {
          if (!(y | w))
            return [i, a];
          if (y & w)
            return !1;
          k = y || w, C = Bn(i, a, k, u, m), E = $e(C, u), k === y ? (i = C, y = E) : (a = C, w = E);
        }
      }
      function Bn(i, a, u, f, m) {
        var y = a.x - i.x, w = a.y - i.y, k = f.min, C = f.max, E, R;
        return u & 8 ? (E = i.x + y * (C.y - i.y) / w, R = C.y) : u & 4 ? (E = i.x + y * (k.y - i.y) / w, R = k.y) : u & 2 ? (E = C.x, R = i.y + w * (C.x - i.x) / y) : u & 1 && (E = k.x, R = i.y + w * (k.x - i.x) / y), new H(E, R, m);
      }
      function $e(i, a) {
        var u = 0;
        return i.x < a.min.x ? u |= 1 : i.x > a.max.x && (u |= 2), i.y < a.min.y ? u |= 4 : i.y > a.max.y && (u |= 8), u;
      }
      function jh(i, a) {
        var u = a.x - i.x, f = a.y - i.y;
        return u * u + f * f;
      }
      function Wi(i, a, u, f) {
        var m = a.x, y = a.y, w = u.x - m, k = u.y - y, C = w * w + k * k, E;
        return C > 0 && (E = ((i.x - m) * w + (i.y - y) * k) / C, E > 1 ? (m = u.x, y = u.y) : E > 0 && (m += w * E, y += k * E)), w = i.x - m, k = i.y - y, f ? w * w + k * k : new H(m, y);
      }
      function Qt(i) {
        return !O(i[0]) || typeof i[0][0] != "object" && typeof i[0][0] < "u";
      }
      function Lr(i) {
        return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), Qt(i);
      }
      function Mr(i, a) {
        var u, f, m, y, w, k, C, E;
        if (!i || i.length === 0)
          throw new Error("latlngs not passed");
        Qt(i) || (console.warn("latlngs are not flat! Only the first ring will be used"), i = i[0]);
        var R = U([0, 0]), j = ot(i), Q = j.getNorthWest().distanceTo(j.getSouthWest()) * j.getNorthEast().distanceTo(j.getNorthWest());
        Q < 1700 && (R = $s(i));
        var Wt = i.length, It = [];
        for (u = 0; u < Wt; u++) {
          var te = U(i[u]);
          It.push(a.project(U([te.lat - R.lat, te.lng - R.lng])));
        }
        for (u = 0, f = 0; u < Wt - 1; u++)
          f += It[u].distanceTo(It[u + 1]) / 2;
        if (f === 0)
          E = It[0];
        else
          for (u = 0, y = 0; u < Wt - 1; u++)
            if (w = It[u], k = It[u + 1], m = w.distanceTo(k), y += m, y > f) {
              C = (y - f) / m, E = [
                k.x - C * (k.x - w.x),
                k.y - C * (k.y - w.y)
              ];
              break;
            }
        var Vt = a.unproject(F(E));
        return U([Vt.lat + R.lat, Vt.lng + R.lng]);
      }
      var Uh = {
        __proto__: null,
        simplify: yr,
        pointToSegmentDistance: br,
        closestPointOnSegment: Hh,
        clipSegment: wr,
        _getEdgeIntersection: Bn,
        _getBitCode: $e,
        _sqClosestPointOnSegment: Wi,
        isFlat: Qt,
        _flat: Lr,
        polylineCenter: Mr
      }, Ks = {
        project: function(i) {
          return new H(i.lng, i.lat);
        },
        unproject: function(i) {
          return new J(i.y, i.x);
        },
        bounds: new K([-180, -90], [180, 90])
      }, Js = {
        R: 6378137,
        R_MINOR: 6356752314245179e-9,
        bounds: new K([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
        project: function(i) {
          var a = Math.PI / 180, u = this.R, f = i.lat * a, m = this.R_MINOR / u, y = Math.sqrt(1 - m * m), w = y * Math.sin(f), k = Math.tan(Math.PI / 4 - f / 2) / Math.pow((1 - w) / (1 + w), y / 2);
          return f = -u * Math.log(Math.max(k, 1e-10)), new H(i.lng * a * u, f);
        },
        unproject: function(i) {
          for (var a = 180 / Math.PI, u = this.R, f = this.R_MINOR / u, m = Math.sqrt(1 - f * f), y = Math.exp(-i.y / u), w = Math.PI / 2 - 2 * Math.atan(y), k = 0, C = 0.1, E; k < 15 && Math.abs(C) > 1e-7; k++)
            E = m * Math.sin(w), E = Math.pow((1 - E) / (1 + E), m / 2), C = Math.PI / 2 - 2 * Math.atan(y * E) - w, w += C;
          return new J(w * a, i.x * a / u);
        }
      }, Gh = {
        __proto__: null,
        LonLat: Ks,
        Mercator: Js,
        SphericalMercator: Yt
      }, Yh = r({}, Zt, {
        code: "EPSG:3395",
        projection: Js,
        transformation: function() {
          var i = 0.5 / (Math.PI * Js.R);
          return he(i, 0.5, -i, 0.5);
        }()
      }), Pr = r({}, Zt, {
        code: "EPSG:4326",
        projection: Ks,
        transformation: he(1 / 180, 1, -1 / 180, 0.5)
      }), qh = r({}, Gt, {
        projection: Ks,
        transformation: he(1, 0, -1, 0),
        scale: function(i) {
          return Math.pow(2, i);
        },
        zoom: function(i) {
          return Math.log(i) / Math.LN2;
        },
        distance: function(i, a) {
          var u = a.lng - i.lng, f = a.lat - i.lat;
          return Math.sqrt(u * u + f * f);
        },
        infinite: !0
      });
      Gt.Earth = Zt, Gt.EPSG3395 = Yh, Gt.EPSG3857 = Ve, Gt.EPSG900913 = Ci, Gt.EPSG4326 = Pr, Gt.Simple = qh;
      var oe = ct.extend({
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
          var a = i.target;
          if (a.hasLayer(this)) {
            if (this._map = a, this._zoomAnimated = a._zoomAnimated, this.getEvents) {
              var u = this.getEvents();
              a.on(u, this), this.once("remove", function() {
                a.off(u, this);
              }, this);
            }
            this.onAdd(a), this.fire("add"), a.fire("layeradd", { layer: this });
          }
        }
      });
      it.include({
        // @method addLayer(layer: Layer): this
        // Adds the given layer to the map
        addLayer: function(i) {
          if (!i._layerAdd)
            throw new Error("The provided object is not a Layer.");
          var a = c(i);
          return this._layers[a] ? this : (this._layers[a] = i, i._mapToAdd = this, i.beforeAdd && i.beforeAdd(this), this.whenReady(i._layerAdd, i), this);
        },
        // @method removeLayer(layer: Layer): this
        // Removes the given layer from the map.
        removeLayer: function(i) {
          var a = c(i);
          return this._layers[a] ? (this._loaded && i.onRemove(this), delete this._layers[a], this._loaded && (this.fire("layerremove", { layer: i }), i.fire("remove")), i._map = i._mapToAdd = null, this) : this;
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
        eachLayer: function(i, a) {
          for (var u in this._layers)
            i.call(a, this._layers[u]);
          return this;
        },
        _addLayers: function(i) {
          i = i ? O(i) ? i : [i] : [];
          for (var a = 0, u = i.length; a < u; a++)
            this.addLayer(i[a]);
        },
        _addZoomLimit: function(i) {
          (!isNaN(i.options.maxZoom) || !isNaN(i.options.minZoom)) && (this._zoomBoundLayers[c(i)] = i, this._updateZoomLevels());
        },
        _removeZoomLimit: function(i) {
          var a = c(i);
          this._zoomBoundLayers[a] && (delete this._zoomBoundLayers[a], this._updateZoomLevels());
        },
        _updateZoomLevels: function() {
          var i = 1 / 0, a = -1 / 0, u = this._getZoomSpan();
          for (var f in this._zoomBoundLayers) {
            var m = this._zoomBoundLayers[f].options;
            i = m.minZoom === void 0 ? i : Math.min(i, m.minZoom), a = m.maxZoom === void 0 ? a : Math.max(a, m.maxZoom);
          }
          this._layersMaxZoom = a === -1 / 0 ? void 0 : a, this._layersMinZoom = i === 1 / 0 ? void 0 : i, u !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
        }
      });
      var mi = oe.extend({
        initialize: function(i, a) {
          b(this, a), this._layers = {};
          var u, f;
          if (i)
            for (u = 0, f = i.length; u < f; u++)
              this.addLayer(i[u]);
        },
        // @method addLayer(layer: Layer): this
        // Adds the given layer to the group.
        addLayer: function(i) {
          var a = this.getLayerId(i);
          return this._layers[a] = i, this._map && this._map.addLayer(i), this;
        },
        // @method removeLayer(layer: Layer): this
        // Removes the given layer from the group.
        // @alternative
        // @method removeLayer(id: Number): this
        // Removes the layer with the given internal ID from the group.
        removeLayer: function(i) {
          var a = i in this._layers ? i : this.getLayerId(i);
          return this._map && this._layers[a] && this._map.removeLayer(this._layers[a]), delete this._layers[a], this;
        },
        // @method hasLayer(layer: Layer): Boolean
        // Returns `true` if the given layer is currently added to the group.
        // @alternative
        // @method hasLayer(id: Number): Boolean
        // Returns `true` if the given internal ID is currently added to the group.
        hasLayer: function(i) {
          var a = typeof i == "number" ? i : this.getLayerId(i);
          return a in this._layers;
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
          var a = Array.prototype.slice.call(arguments, 1), u, f;
          for (u in this._layers)
            f = this._layers[u], f[i] && f[i].apply(f, a);
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
        eachLayer: function(i, a) {
          for (var u in this._layers)
            i.call(a, this._layers[u]);
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
      }), $h = function(i, a) {
        return new mi(i, a);
      }, ge = mi.extend({
        addLayer: function(i) {
          return this.hasLayer(i) ? this : (i.addEventParent(this), mi.prototype.addLayer.call(this, i), this.fire("layeradd", { layer: i }));
        },
        removeLayer: function(i) {
          return this.hasLayer(i) ? (i in this._layers && (i = this._layers[i]), i.removeEventParent(this), mi.prototype.removeLayer.call(this, i), this.fire("layerremove", { layer: i })) : this;
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
          var i = new vt();
          for (var a in this._layers) {
            var u = this._layers[a];
            i.extend(u.getBounds ? u.getBounds() : u.getLatLng());
          }
          return i;
        }
      }), Xh = function(i, a) {
        return new ge(i, a);
      }, gi = at.extend({
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
          b(this, i);
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
        _createIcon: function(i, a) {
          var u = this._getIconUrl(i);
          if (!u) {
            if (i === "icon")
              throw new Error("iconUrl not set in Icon options (see the docs).");
            return null;
          }
          var f = this._createImg(u, a && a.tagName === "IMG" ? a : null);
          return this._setIconStyles(f, i), (this.options.crossOrigin || this.options.crossOrigin === "") && (f.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), f;
        },
        _setIconStyles: function(i, a) {
          var u = this.options, f = u[a + "Size"];
          typeof f == "number" && (f = [f, f]);
          var m = F(f), y = F(a === "shadow" && u.shadowAnchor || u.iconAnchor || m && m.divideBy(2, !0));
          i.className = "leaflet-marker-" + a + " " + (u.className || ""), y && (i.style.marginLeft = -y.x + "px", i.style.marginTop = -y.y + "px"), m && (i.style.width = m.x + "px", i.style.height = m.y + "px");
        },
        _createImg: function(i, a) {
          return a = a || document.createElement("img"), a.src = i, a;
        },
        _getIconUrl: function(i) {
          return W.retina && this.options[i + "RetinaUrl"] || this.options[i + "Url"];
        }
      });
      function Kh(i) {
        return new gi(i);
      }
      var Vi = gi.extend({
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
          return typeof Vi.imagePath != "string" && (Vi.imagePath = this._detectIconPath()), (this.options.imagePath || Vi.imagePath) + gi.prototype._getIconUrl.call(this, i);
        },
        _stripUrl: function(i) {
          var a = function(u, f, m) {
            var y = f.exec(u);
            return y && y[m];
          };
          return i = a(i, /^url\((['"])?(.+)\1\)$/, 2), i && a(i, /^(.*)marker-icon\.png$/, 1);
        },
        _detectIconPath: function() {
          var i = rt("div", "leaflet-default-icon-path", document.body), a = Bi(i, "background-image") || Bi(i, "backgroundImage");
          if (document.body.removeChild(i), a = this._stripUrl(a), a)
            return a;
          var u = document.querySelector('link[href$="leaflet.css"]');
          return u ? u.href.substring(0, u.href.length - 11 - 1) : "";
        }
      }), kr = de.extend({
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
          }, this).enable(), X(i, "leaflet-marker-draggable");
        },
        removeHooks: function() {
          this._draggable.off({
            dragstart: this._onDragStart,
            predrag: this._onPreDrag,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this).disable(), this._marker._icon && Pt(this._marker._icon, "leaflet-marker-draggable");
        },
        moved: function() {
          return this._draggable && this._draggable._moved;
        },
        _adjustPan: function(i) {
          var a = this._marker, u = a._map, f = this._marker.options.autoPanSpeed, m = this._marker.options.autoPanPadding, y = Ge(a._icon), w = u.getPixelBounds(), k = u.getPixelOrigin(), C = ht(
            w.min._subtract(k).add(m),
            w.max._subtract(k).subtract(m)
          );
          if (!C.contains(y)) {
            var E = F(
              (Math.max(C.max.x, y.x) - C.max.x) / (w.max.x - C.max.x) - (Math.min(C.min.x, y.x) - C.min.x) / (w.min.x - C.min.x),
              (Math.max(C.max.y, y.y) - C.max.y) / (w.max.y - C.max.y) - (Math.min(C.min.y, y.y) - C.min.y) / (w.min.y - C.min.y)
            ).multiplyBy(f);
            u.panBy(E, { animate: !1 }), this._draggable._newPos._add(E), this._draggable._startPos._add(E), Ct(a._icon, this._draggable._newPos), this._onDrag(i), this._panRequest = Z(this._adjustPan.bind(this, i));
          }
        },
        _onDragStart: function() {
          this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
        },
        _onPreDrag: function(i) {
          this._marker.options.autoPan && (V(this._panRequest), this._panRequest = Z(this._adjustPan.bind(this, i)));
        },
        _onDrag: function(i) {
          var a = this._marker, u = a._shadow, f = Ge(a._icon), m = a._map.layerPointToLatLng(f);
          u && Ct(u, f), a._latlng = m, i.latlng = m, i.oldLatLng = this._oldLatLng, a.fire("move", i).fire("drag", i);
        },
        _onDragEnd: function(i) {
          V(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", i);
        }
      }), Rn = oe.extend({
        // @section
        // @aka Marker options
        options: {
          // @option icon: Icon = *
          // Icon instance to use for rendering the marker.
          // See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
          // If not specified, a common instance of `L.Icon.Default` is used.
          icon: new Vi(),
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
        initialize: function(i, a) {
          b(this, a), this._latlng = U(i);
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
          var a = this._latlng;
          return this._latlng = U(i), this.update(), this.fire("move", { oldLatLng: a, latlng: this._latlng });
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
          var i = this.options, a = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"), u = i.icon.createIcon(this._icon), f = !1;
          u !== this._icon && (this._icon && this._removeIcon(), f = !0, i.title && (u.title = i.title), u.tagName === "IMG" && (u.alt = i.alt || "")), X(u, a), i.keyboard && (u.tabIndex = "0", u.setAttribute("role", "button")), this._icon = u, i.riseOnHover && this.on({
            mouseover: this._bringToFront,
            mouseout: this._resetZIndex
          }), this.options.autoPanOnFocus && Y(u, "focus", this._panOnFocus, this);
          var m = i.icon.createShadow(this._shadow), y = !1;
          m !== this._shadow && (this._removeShadow(), y = !0), m && (X(m, a), m.alt = ""), this._shadow = m, i.opacity < 1 && this._updateOpacity(), f && this.getPane().appendChild(this._icon), this._initInteraction(), m && y && this.getPane(i.shadowPane).appendChild(this._shadow);
        },
        _removeIcon: function() {
          this.options.riseOnHover && this.off({
            mouseover: this._bringToFront,
            mouseout: this._resetZIndex
          }), this.options.autoPanOnFocus && ft(this._icon, "focus", this._panOnFocus, this), bt(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
        },
        _removeShadow: function() {
          this._shadow && bt(this._shadow), this._shadow = null;
        },
        _setPos: function(i) {
          this._icon && Ct(this._icon, i), this._shadow && Ct(this._shadow, i), this._zIndex = i.y + this.options.zIndexOffset, this._resetZIndex();
        },
        _updateZIndex: function(i) {
          this._icon && (this._icon.style.zIndex = this._zIndex + i);
        },
        _animateZoom: function(i) {
          var a = this._map._latLngToNewLayerPoint(this._latlng, i.zoom, i.center).round();
          this._setPos(a);
        },
        _initInteraction: function() {
          if (this.options.interactive && (X(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), kr)) {
            var i = this.options.draggable;
            this.dragging && (i = this.dragging.enabled(), this.dragging.disable()), this.dragging = new kr(this), i && this.dragging.enable();
          }
        },
        // @method setOpacity(opacity: Number): this
        // Changes the opacity of the marker.
        setOpacity: function(i) {
          return this.options.opacity = i, this._map && this._updateOpacity(), this;
        },
        _updateOpacity: function() {
          var i = this.options.opacity;
          this._icon && Jt(this._icon, i), this._shadow && Jt(this._shadow, i);
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
            var a = this.options.icon.options, u = a.iconSize ? F(a.iconSize) : F(0, 0), f = a.iconAnchor ? F(a.iconAnchor) : F(0, 0);
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
      function Jh(i, a) {
        return new Rn(i, a);
      }
      var De = oe.extend({
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
          return b(this, i), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && i && Object.prototype.hasOwnProperty.call(i, "weight") && this._updateBounds()), this;
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
      }), Fn = De.extend({
        // @section
        // @aka CircleMarker options
        options: {
          fill: !0,
          // @option radius: Number = 10
          // Radius of the circle marker, in pixels
          radius: 10
        },
        initialize: function(i, a) {
          b(this, a), this._latlng = U(i), this._radius = this.options.radius;
        },
        // @method setLatLng(latLng: LatLng): this
        // Sets the position of a circle marker to a new location.
        setLatLng: function(i) {
          var a = this._latlng;
          return this._latlng = U(i), this.redraw(), this.fire("move", { oldLatLng: a, latlng: this._latlng });
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
          var a = i && i.radius || this._radius;
          return De.prototype.setStyle.call(this, i), this.setRadius(a), this;
        },
        _project: function() {
          this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds();
        },
        _updateBounds: function() {
          var i = this._radius, a = this._radiusY || i, u = this._clickTolerance(), f = [i + u, a + u];
          this._pxBounds = new K(this._point.subtract(f), this._point.add(f));
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
      function Qh(i, a) {
        return new Fn(i, a);
      }
      var Qs = Fn.extend({
        initialize: function(i, a, u) {
          if (typeof a == "number" && (a = r({}, u, { radius: a })), b(this, a), this._latlng = U(i), isNaN(this.options.radius))
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
          return new vt(
            this._map.layerPointToLatLng(this._point.subtract(i)),
            this._map.layerPointToLatLng(this._point.add(i))
          );
        },
        setStyle: De.prototype.setStyle,
        _project: function() {
          var i = this._latlng.lng, a = this._latlng.lat, u = this._map, f = u.options.crs;
          if (f.distance === Zt.distance) {
            var m = Math.PI / 180, y = this._mRadius / Zt.R / m, w = u.project([a + y, i]), k = u.project([a - y, i]), C = w.add(k).divideBy(2), E = u.unproject(C).lat, R = Math.acos((Math.cos(y * m) - Math.sin(a * m) * Math.sin(E * m)) / (Math.cos(a * m) * Math.cos(E * m))) / m;
            (isNaN(R) || R === 0) && (R = y / Math.cos(Math.PI / 180 * a)), this._point = C.subtract(u.getPixelOrigin()), this._radius = isNaN(R) ? 0 : C.x - u.project([E, i - R]).x, this._radiusY = C.y - w.y;
          } else {
            var j = f.unproject(f.project(this._latlng).subtract([this._mRadius, 0]));
            this._point = u.latLngToLayerPoint(this._latlng), this._radius = this._point.x - u.latLngToLayerPoint(j).x;
          }
          this._updateBounds();
        }
      });
      function tc(i, a, u) {
        return new Qs(i, a, u);
      }
      var ve = De.extend({
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
        initialize: function(i, a) {
          b(this, a), this._setLatLngs(i);
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
          for (var a = 1 / 0, u = null, f = Wi, m, y, w = 0, k = this._parts.length; w < k; w++)
            for (var C = this._parts[w], E = 1, R = C.length; E < R; E++) {
              m = C[E - 1], y = C[E];
              var j = f(i, m, y, !0);
              j < a && (a = j, u = f(i, m, y));
            }
          return u && (u.distance = Math.sqrt(a)), u;
        },
        // @method getCenter(): LatLng
        // Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
        getCenter: function() {
          if (!this._map)
            throw new Error("Must add layer to map before using getCenter()");
          return Mr(this._defaultShape(), this._map.options.crs);
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
        addLatLng: function(i, a) {
          return a = a || this._defaultShape(), i = U(i), a.push(i), this._bounds.extend(i), this.redraw();
        },
        _setLatLngs: function(i) {
          this._bounds = new vt(), this._latlngs = this._convertLatLngs(i);
        },
        _defaultShape: function() {
          return Qt(this._latlngs) ? this._latlngs : this._latlngs[0];
        },
        // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
        _convertLatLngs: function(i) {
          for (var a = [], u = Qt(i), f = 0, m = i.length; f < m; f++)
            u ? (a[f] = U(i[f]), this._bounds.extend(a[f])) : a[f] = this._convertLatLngs(i[f]);
          return a;
        },
        _project: function() {
          var i = new K();
          this._rings = [], this._projectLatlngs(this._latlngs, this._rings, i), this._bounds.isValid() && i.isValid() && (this._rawPxBounds = i, this._updateBounds());
        },
        _updateBounds: function() {
          var i = this._clickTolerance(), a = new H(i, i);
          this._rawPxBounds && (this._pxBounds = new K([
            this._rawPxBounds.min.subtract(a),
            this._rawPxBounds.max.add(a)
          ]));
        },
        // recursively turns latlngs into a set of rings with projected coordinates
        _projectLatlngs: function(i, a, u) {
          var f = i[0] instanceof J, m = i.length, y, w;
          if (f) {
            for (w = [], y = 0; y < m; y++)
              w[y] = this._map.latLngToLayerPoint(i[y]), u.extend(w[y]);
            a.push(w);
          } else
            for (y = 0; y < m; y++)
              this._projectLatlngs(i[y], a, u);
        },
        // clip polyline by renderer bounds so that we have less to render for performance
        _clipPoints: function() {
          var i = this._renderer._bounds;
          if (this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(i))) {
            if (this.options.noClip) {
              this._parts = this._rings;
              return;
            }
            var a = this._parts, u, f, m, y, w, k, C;
            for (u = 0, m = 0, y = this._rings.length; u < y; u++)
              for (C = this._rings[u], f = 0, w = C.length; f < w - 1; f++)
                k = wr(C[f], C[f + 1], i, f, !0), k && (a[m] = a[m] || [], a[m].push(k[0]), (k[1] !== C[f + 1] || f === w - 2) && (a[m].push(k[1]), m++));
          }
        },
        // simplify each clipped part of the polyline for performance
        _simplifyPoints: function() {
          for (var i = this._parts, a = this.options.smoothFactor, u = 0, f = i.length; u < f; u++)
            i[u] = yr(i[u], a);
        },
        _update: function() {
          this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
        },
        _updatePath: function() {
          this._renderer._updatePoly(this);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(i, a) {
          var u, f, m, y, w, k, C = this._clickTolerance();
          if (!this._pxBounds || !this._pxBounds.contains(i))
            return !1;
          for (u = 0, y = this._parts.length; u < y; u++)
            for (k = this._parts[u], f = 0, w = k.length, m = w - 1; f < w; m = f++)
              if (!(!a && f === 0) && br(i, k[m], k[f]) <= C)
                return !0;
          return !1;
        }
      });
      function ec(i, a) {
        return new ve(i, a);
      }
      ve._flat = Lr;
      var vi = ve.extend({
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
          return vr(this._defaultShape(), this._map.options.crs);
        },
        _convertLatLngs: function(i) {
          var a = ve.prototype._convertLatLngs.call(this, i), u = a.length;
          return u >= 2 && a[0] instanceof J && a[0].equals(a[u - 1]) && a.pop(), a;
        },
        _setLatLngs: function(i) {
          ve.prototype._setLatLngs.call(this, i), Qt(this._latlngs) && (this._latlngs = [this._latlngs]);
        },
        _defaultShape: function() {
          return Qt(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
        },
        _clipPoints: function() {
          var i = this._renderer._bounds, a = this.options.weight, u = new H(a, a);
          if (i = new K(i.min.subtract(u), i.max.add(u)), this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(i))) {
            if (this.options.noClip) {
              this._parts = this._rings;
              return;
            }
            for (var f = 0, m = this._rings.length, y; f < m; f++)
              y = gr(this._rings[f], i, !0), y.length && this._parts.push(y);
          }
        },
        _updatePath: function() {
          this._renderer._updatePoly(this, !0);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(i) {
          var a = !1, u, f, m, y, w, k, C, E;
          if (!this._pxBounds || !this._pxBounds.contains(i))
            return !1;
          for (y = 0, C = this._parts.length; y < C; y++)
            for (u = this._parts[y], w = 0, E = u.length, k = E - 1; w < E; k = w++)
              f = u[w], m = u[k], f.y > i.y != m.y > i.y && i.x < (m.x - f.x) * (i.y - f.y) / (m.y - f.y) + f.x && (a = !a);
          return a || ve.prototype._containsPoint.call(this, i, !0);
        }
      });
      function ic(i, a) {
        return new vi(i, a);
      }
      var ye = ge.extend({
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
        initialize: function(i, a) {
          b(this, a), this._layers = {}, i && this.addData(i);
        },
        // @method addData( <GeoJSON> data ): this
        // Adds a GeoJSON object to the layer.
        addData: function(i) {
          var a = O(i) ? i : i.features, u, f, m;
          if (a) {
            for (u = 0, f = a.length; u < f; u++)
              m = a[u], (m.geometries || m.geometry || m.features || m.coordinates) && this.addData(m);
            return this;
          }
          var y = this.options;
          if (y.filter && !y.filter(i))
            return this;
          var w = Nn(i, y);
          return w ? (w.feature = Wn(i), w.defaultOptions = w.options, this.resetStyle(w), y.onEachFeature && y.onEachFeature(i, w), this.addLayer(w)) : this;
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
          return this.eachLayer(function(a) {
            this._setLayerStyle(a, i);
          }, this);
        },
        _setLayerStyle: function(i, a) {
          i.setStyle && (typeof a == "function" && (a = a(i.feature)), i.setStyle(a));
        }
      });
      function Nn(i, a) {
        var u = i.type === "Feature" ? i.geometry : i, f = u ? u.coordinates : null, m = [], y = a && a.pointToLayer, w = a && a.coordsToLatLng || to, k, C, E, R;
        if (!f && !u)
          return null;
        switch (u.type) {
          case "Point":
            return k = w(f), Sr(y, i, k, a);
          case "MultiPoint":
            for (E = 0, R = f.length; E < R; E++)
              k = w(f[E]), m.push(Sr(y, i, k, a));
            return new ge(m);
          case "LineString":
          case "MultiLineString":
            return C = Zn(f, u.type === "LineString" ? 0 : 1, w), new ve(C, a);
          case "Polygon":
          case "MultiPolygon":
            return C = Zn(f, u.type === "Polygon" ? 1 : 2, w), new vi(C, a);
          case "GeometryCollection":
            for (E = 0, R = u.geometries.length; E < R; E++) {
              var j = Nn({
                geometry: u.geometries[E],
                type: "Feature",
                properties: i.properties
              }, a);
              j && m.push(j);
            }
            return new ge(m);
          case "FeatureCollection":
            for (E = 0, R = u.features.length; E < R; E++) {
              var Q = Nn(u.features[E], a);
              Q && m.push(Q);
            }
            return new ge(m);
          default:
            throw new Error("Invalid GeoJSON object.");
        }
      }
      function Sr(i, a, u, f) {
        return i ? i(a, u) : new Rn(u, f && f.markersInheritOptions && f);
      }
      function to(i) {
        return new J(i[1], i[0], i[2]);
      }
      function Zn(i, a, u) {
        for (var f = [], m = 0, y = i.length, w; m < y; m++)
          w = a ? Zn(i[m], a - 1, u) : (u || to)(i[m]), f.push(w);
        return f;
      }
      function eo(i, a) {
        return i = U(i), i.alt !== void 0 ? [g(i.lng, a), g(i.lat, a), g(i.alt, a)] : [g(i.lng, a), g(i.lat, a)];
      }
      function Hn(i, a, u, f) {
        for (var m = [], y = 0, w = i.length; y < w; y++)
          m.push(a ? Hn(i[y], Qt(i[y]) ? 0 : a - 1, u, f) : eo(i[y], f));
        return !a && u && m.length > 0 && m.push(m[0].slice()), m;
      }
      function yi(i, a) {
        return i.feature ? r({}, i.feature, { geometry: a }) : Wn(a);
      }
      function Wn(i) {
        return i.type === "Feature" || i.type === "FeatureCollection" ? i : {
          type: "Feature",
          properties: {},
          geometry: i
        };
      }
      var io = {
        toGeoJSON: function(i) {
          return yi(this, {
            type: "Point",
            coordinates: eo(this.getLatLng(), i)
          });
        }
      };
      Rn.include(io), Qs.include(io), Fn.include(io), ve.include({
        toGeoJSON: function(i) {
          var a = !Qt(this._latlngs), u = Hn(this._latlngs, a ? 1 : 0, !1, i);
          return yi(this, {
            type: (a ? "Multi" : "") + "LineString",
            coordinates: u
          });
        }
      }), vi.include({
        toGeoJSON: function(i) {
          var a = !Qt(this._latlngs), u = a && !Qt(this._latlngs[0]), f = Hn(this._latlngs, u ? 2 : a ? 1 : 0, !0, i);
          return a || (f = [f]), yi(this, {
            type: (u ? "Multi" : "") + "Polygon",
            coordinates: f
          });
        }
      }), mi.include({
        toMultiPoint: function(i) {
          var a = [];
          return this.eachLayer(function(u) {
            a.push(u.toGeoJSON(i).geometry.coordinates);
          }), yi(this, {
            type: "MultiPoint",
            coordinates: a
          });
        },
        // @method toGeoJSON(precision?: Number|false): Object
        // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
        // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the layer group (as a GeoJSON `FeatureCollection`, `GeometryCollection`, or `MultiPoint`).
        toGeoJSON: function(i) {
          var a = this.feature && this.feature.geometry && this.feature.geometry.type;
          if (a === "MultiPoint")
            return this.toMultiPoint(i);
          var u = a === "GeometryCollection", f = [];
          return this.eachLayer(function(m) {
            if (m.toGeoJSON) {
              var y = m.toGeoJSON(i);
              if (u)
                f.push(y.geometry);
              else {
                var w = Wn(y);
                w.type === "FeatureCollection" ? f.push.apply(f, w.features) : f.push(w);
              }
            }
          }), u ? yi(this, {
            geometries: f,
            type: "GeometryCollection"
          }) : {
            type: "FeatureCollection",
            features: f
          };
        }
      });
      function Cr(i, a) {
        return new ye(i, a);
      }
      var nc = Cr, Vn = oe.extend({
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
        initialize: function(i, a, u) {
          this._url = i, this._bounds = ot(a), b(this, u);
        },
        onAdd: function() {
          this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (X(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
        },
        onRemove: function() {
          bt(this._image), this.options.interactive && this.removeInteractiveTarget(this._image);
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
          return this._map && pi(this._image), this;
        },
        // @method bringToBack(): this
        // Brings the layer to the bottom of all overlays.
        bringToBack: function() {
          return this._map && _i(this._image), this;
        },
        // @method setUrl(url: String): this
        // Changes the URL of the image.
        setUrl: function(i) {
          return this._url = i, this._image && (this._image.src = i), this;
        },
        // @method setBounds(bounds: LatLngBounds): this
        // Update the bounds that this ImageOverlay covers
        setBounds: function(i) {
          return this._bounds = ot(i), this._map && this._reset(), this;
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
          var i = this._url.tagName === "IMG", a = this._image = i ? this._url : rt("img");
          if (X(a, "leaflet-image-layer"), this._zoomAnimated && X(a, "leaflet-zoom-animated"), this.options.className && X(a, this.options.className), a.onselectstart = _, a.onmousemove = _, a.onload = l(this.fire, this, "load"), a.onerror = l(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (a.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), i) {
            this._url = a.src;
            return;
          }
          a.src = this._url, a.alt = this.options.alt;
        },
        _animateZoom: function(i) {
          var a = this._map.getZoomScale(i.zoom), u = this._map._latLngBoundsToNewLayerBounds(this._bounds, i.zoom, i.center).min;
          Ue(this._image, u, a);
        },
        _reset: function() {
          var i = this._image, a = new K(
            this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
            this._map.latLngToLayerPoint(this._bounds.getSouthEast())
          ), u = a.getSize();
          Ct(i, a.min), i.style.width = u.x + "px", i.style.height = u.y + "px";
        },
        _updateOpacity: function() {
          Jt(this._image, this.options.opacity);
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
      }), sc = function(i, a, u) {
        return new Vn(i, a, u);
      }, Tr = Vn.extend({
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
          var i = this._url.tagName === "VIDEO", a = this._image = i ? this._url : rt("video");
          if (X(a, "leaflet-image-layer"), this._zoomAnimated && X(a, "leaflet-zoom-animated"), this.options.className && X(a, this.options.className), a.onselectstart = _, a.onmousemove = _, a.onloadeddata = l(this.fire, this, "load"), i) {
            for (var u = a.getElementsByTagName("source"), f = [], m = 0; m < u.length; m++)
              f.push(u[m].src);
            this._url = u.length > 0 ? f : [a.src];
            return;
          }
          O(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(a.style, "objectFit") && (a.style.objectFit = "fill"), a.autoplay = !!this.options.autoplay, a.loop = !!this.options.loop, a.muted = !!this.options.muted, a.playsInline = !!this.options.playsInline;
          for (var y = 0; y < this._url.length; y++) {
            var w = rt("source");
            w.src = this._url[y], a.appendChild(w);
          }
        }
        // @method getElement(): HTMLVideoElement
        // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
        // used by this overlay.
      });
      function oc(i, a, u) {
        return new Tr(i, a, u);
      }
      var Or = Vn.extend({
        _initImage: function() {
          var i = this._image = this._url;
          X(i, "leaflet-image-layer"), this._zoomAnimated && X(i, "leaflet-zoom-animated"), this.options.className && X(i, this.options.className), i.onselectstart = _, i.onmousemove = _;
        }
        // @method getElement(): SVGElement
        // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
        // used by this overlay.
      });
      function rc(i, a, u) {
        return new Or(i, a, u);
      }
      var fe = oe.extend({
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
        initialize: function(i, a) {
          i && (i instanceof J || O(i)) ? (this._latlng = U(i), b(this, a)) : (b(this, i), this._source = a), this.options.content && (this._content = this.options.content);
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
          this._zoomAnimated = i._zoomAnimated, this._container || this._initLayout(), i._fadeAnimated && Jt(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), i._fadeAnimated && Jt(this._container, 1), this.bringToFront(), this.options.interactive && (X(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
        },
        onRemove: function(i) {
          i._fadeAnimated ? (Jt(this._container, 0), this._removeTimeout = setTimeout(l(bt, void 0, this._container), 200)) : bt(this._container), this.options.interactive && (Pt(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
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
          return this._map && pi(this._container), this;
        },
        // @method bringToBack: this
        // Brings this overlay to the back of other overlays (in the same map pane).
        bringToBack: function() {
          return this._map && _i(this._container), this;
        },
        // prepare bound overlay to open: update latlng pos / content source (for FeatureGroup)
        _prepareOpen: function(i) {
          var a = this._source;
          if (!a._map)
            return !1;
          if (a instanceof ge) {
            a = null;
            var u = this._source._layers;
            for (var f in u)
              if (u[f]._map) {
                a = u[f];
                break;
              }
            if (!a)
              return !1;
            this._source = a;
          }
          if (!i)
            if (a.getCenter)
              i = a.getCenter();
            else if (a.getLatLng)
              i = a.getLatLng();
            else if (a.getBounds)
              i = a.getBounds().getCenter();
            else
              throw new Error("Unable to get source layer LatLng.");
          return this.setLatLng(i), this._map && this.update(), !0;
        },
        _updateContent: function() {
          if (this._content) {
            var i = this._contentNode, a = typeof this._content == "function" ? this._content(this._source || this) : this._content;
            if (typeof a == "string")
              i.innerHTML = a;
            else {
              for (; i.hasChildNodes(); )
                i.removeChild(i.firstChild);
              i.appendChild(a);
            }
            this.fire("contentupdate");
          }
        },
        _updatePosition: function() {
          if (this._map) {
            var i = this._map.latLngToLayerPoint(this._latlng), a = F(this.options.offset), u = this._getAnchor();
            this._zoomAnimated ? Ct(this._container, i.add(u)) : a = a.add(i).add(u);
            var f = this._containerBottom = -a.y, m = this._containerLeft = -Math.round(this._containerWidth / 2) + a.x;
            this._container.style.bottom = f + "px", this._container.style.left = m + "px";
          }
        },
        _getAnchor: function() {
          return [0, 0];
        }
      });
      it.include({
        _initOverlay: function(i, a, u, f) {
          var m = a;
          return m instanceof i || (m = new i(f).setContent(a)), u && m.setLatLng(u), m;
        }
      }), oe.include({
        _initOverlay: function(i, a, u, f) {
          var m = u;
          return m instanceof i ? (b(m, f), m._source = this) : (m = a && !f ? a : new i(f, this), m.setContent(u)), m;
        }
      });
      var jn = fe.extend({
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
          return i = arguments.length ? i : this._source._map, !i.hasLayer(this) && i._popup && i._popup.options.autoClose && i.removeLayer(i._popup), i._popup = this, fe.prototype.openOn.call(this, i);
        },
        onAdd: function(i) {
          fe.prototype.onAdd.call(this, i), i.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof De || this._source.on("preclick", Ye));
        },
        onRemove: function(i) {
          fe.prototype.onRemove.call(this, i), i.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof De || this._source.off("preclick", Ye));
        },
        getEvents: function() {
          var i = fe.prototype.getEvents.call(this);
          return (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (i.preclick = this.close), this.options.keepInView && (i.moveend = this._adjustPan), i;
        },
        _initLayout: function() {
          var i = "leaflet-popup", a = this._container = rt(
            "div",
            i + " " + (this.options.className || "") + " leaflet-zoom-animated"
          ), u = this._wrapper = rt("div", i + "-content-wrapper", a);
          if (this._contentNode = rt("div", i + "-content", u), Zi(a), Us(this._contentNode), Y(a, "contextmenu", Ye), this._tipContainer = rt("div", i + "-tip-container", a), this._tip = rt("div", i + "-tip", this._tipContainer), this.options.closeButton) {
            var f = this._closeButton = rt("a", i + "-close-button", a);
            f.setAttribute("role", "button"), f.setAttribute("aria-label", "Close popup"), f.href = "#close", f.innerHTML = '<span aria-hidden="true">&#215;</span>', Y(f, "click", function(m) {
              Bt(m), this.close();
            }, this);
          }
        },
        _updateLayout: function() {
          var i = this._contentNode, a = i.style;
          a.width = "", a.whiteSpace = "nowrap";
          var u = i.offsetWidth;
          u = Math.min(u, this.options.maxWidth), u = Math.max(u, this.options.minWidth), a.width = u + 1 + "px", a.whiteSpace = "", a.height = "";
          var f = i.offsetHeight, m = this.options.maxHeight, y = "leaflet-popup-scrolled";
          m && f > m ? (a.height = m + "px", X(i, y)) : Pt(i, y), this._containerWidth = this._container.offsetWidth;
        },
        _animateZoom: function(i) {
          var a = this._map._latLngToNewLayerPoint(this._latlng, i.zoom, i.center), u = this._getAnchor();
          Ct(this._container, a.add(u));
        },
        _adjustPan: function() {
          if (this.options.autoPan) {
            if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning) {
              this._autopanning = !1;
              return;
            }
            var i = this._map, a = parseInt(Bi(this._container, "marginBottom"), 10) || 0, u = this._container.offsetHeight + a, f = this._containerWidth, m = new H(this._containerLeft, -u - this._containerBottom);
            m._add(Ge(this._container));
            var y = i.layerPointToContainerPoint(m), w = F(this.options.autoPanPadding), k = F(this.options.autoPanPaddingTopLeft || w), C = F(this.options.autoPanPaddingBottomRight || w), E = i.getSize(), R = 0, j = 0;
            y.x + f + C.x > E.x && (R = y.x + f - E.x + C.x), y.x - R - k.x < 0 && (R = y.x - k.x), y.y + u + C.y > E.y && (j = y.y + u - E.y + C.y), y.y - j - k.y < 0 && (j = y.y - k.y), (R || j) && (this.options.keepInView && (this._autopanning = !0), i.fire("autopanstart").panBy([R, j]));
          }
        },
        _getAnchor: function() {
          return F(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
        }
      }), ac = function(i, a) {
        return new jn(i, a);
      };
      it.mergeOptions({
        closePopupOnClick: !0
      }), it.include({
        // @method openPopup(popup: Popup): this
        // Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
        // @alternative
        // @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
        // Creates a popup with the specified content and options and opens it in the given point on a map.
        openPopup: function(i, a, u) {
          return this._initOverlay(jn, i, a, u).openOn(this), this;
        },
        // @method closePopup(popup?: Popup): this
        // Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
        closePopup: function(i) {
          return i = arguments.length ? i : this._popup, i && i.close(), this;
        }
      }), oe.include({
        // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
        // Binds a popup to the layer with the passed `content` and sets up the
        // necessary event listeners. If a `Function` is passed it will receive
        // the layer as the first argument and should return a `String` or `HTMLElement`.
        bindPopup: function(i, a) {
          return this._popup = this._initOverlay(jn, this._popup, i, a), this._popupHandlersAdded || (this.on({
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
          return this._popup && (this instanceof ge || (this._popup._source = this), this._popup._prepareOpen(i || this._latlng) && this._popup.openOn(this._map)), this;
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
            qe(i);
            var a = i.layer || i.target;
            if (this._popup._source === a && !(a instanceof De)) {
              this._map.hasLayer(this._popup) ? this.closePopup() : this.openPopup(i.latlng);
              return;
            }
            this._popup._source = a, this.openPopup(i.latlng);
          }
        },
        _movePopup: function(i) {
          this._popup.setLatLng(i.latlng);
        },
        _onKeyPress: function(i) {
          i.originalEvent.keyCode === 13 && this._openPopup(i);
        }
      });
      var Un = fe.extend({
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
          fe.prototype.onAdd.call(this, i), this.setOpacity(this.options.opacity), i.fire("tooltipopen", { tooltip: this }), this._source && (this.addEventParent(this._source), this._source.fire("tooltipopen", { tooltip: this }, !0));
        },
        onRemove: function(i) {
          fe.prototype.onRemove.call(this, i), i.fire("tooltipclose", { tooltip: this }), this._source && (this.removeEventParent(this._source), this._source.fire("tooltipclose", { tooltip: this }, !0));
        },
        getEvents: function() {
          var i = fe.prototype.getEvents.call(this);
          return this.options.permanent || (i.preclick = this.close), i;
        },
        _initLayout: function() {
          var i = "leaflet-tooltip", a = i + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
          this._contentNode = this._container = rt("div", a), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + c(this));
        },
        _updateLayout: function() {
        },
        _adjustPan: function() {
        },
        _setPosition: function(i) {
          var a, u, f = this._map, m = this._container, y = f.latLngToContainerPoint(f.getCenter()), w = f.layerPointToContainerPoint(i), k = this.options.direction, C = m.offsetWidth, E = m.offsetHeight, R = F(this.options.offset), j = this._getAnchor();
          k === "top" ? (a = C / 2, u = E) : k === "bottom" ? (a = C / 2, u = 0) : k === "center" ? (a = C / 2, u = E / 2) : k === "right" ? (a = 0, u = E / 2) : k === "left" ? (a = C, u = E / 2) : w.x < y.x ? (k = "right", a = 0, u = E / 2) : (k = "left", a = C + (R.x + j.x) * 2, u = E / 2), i = i.subtract(F(a, u, !0)).add(R).add(j), Pt(m, "leaflet-tooltip-right"), Pt(m, "leaflet-tooltip-left"), Pt(m, "leaflet-tooltip-top"), Pt(m, "leaflet-tooltip-bottom"), X(m, "leaflet-tooltip-" + k), Ct(m, i);
        },
        _updatePosition: function() {
          var i = this._map.latLngToLayerPoint(this._latlng);
          this._setPosition(i);
        },
        setOpacity: function(i) {
          this.options.opacity = i, this._container && Jt(this._container, i);
        },
        _animateZoom: function(i) {
          var a = this._map._latLngToNewLayerPoint(this._latlng, i.zoom, i.center);
          this._setPosition(a);
        },
        _getAnchor: function() {
          return F(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
        }
      }), lc = function(i, a) {
        return new Un(i, a);
      };
      it.include({
        // @method openTooltip(tooltip: Tooltip): this
        // Opens the specified tooltip.
        // @alternative
        // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
        // Creates a tooltip with the specified content and options and open it.
        openTooltip: function(i, a, u) {
          return this._initOverlay(Un, i, a, u).openOn(this), this;
        },
        // @method closeTooltip(tooltip: Tooltip): this
        // Closes the tooltip given as parameter.
        closeTooltip: function(i) {
          return i.close(), this;
        }
      }), oe.include({
        // @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
        // Binds a tooltip to the layer with the passed `content` and sets up the
        // necessary event listeners. If a `Function` is passed it will receive
        // the layer as the first argument and should return a `String` or `HTMLElement`.
        bindTooltip: function(i, a) {
          return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(Un, this._tooltip, i, a), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
        },
        // @method unbindTooltip(): this
        // Removes the tooltip previously bound with `bindTooltip`.
        unbindTooltip: function() {
          return this._tooltip && (this._initTooltipInteractions(!0), this.closeTooltip(), this._tooltip = null), this;
        },
        _initTooltipInteractions: function(i) {
          if (!(!i && this._tooltipHandlersAdded)) {
            var a = i ? "off" : "on", u = {
              remove: this.closeTooltip,
              move: this._moveTooltip
            };
            this._tooltip.options.permanent ? u.add = this._openTooltip : (u.mouseover = this._openTooltip, u.mouseout = this.closeTooltip, u.click = this._openTooltip, this._map ? this._addFocusListeners() : u.add = this._addFocusListeners), this._tooltip.options.sticky && (u.mousemove = this._moveTooltip), this[a](u), this._tooltipHandlersAdded = !i;
          }
        },
        // @method openTooltip(latlng?: LatLng): this
        // Opens the bound tooltip at the specified `latlng` or at the default tooltip anchor if no `latlng` is passed.
        openTooltip: function(i) {
          return this._tooltip && (this instanceof ge || (this._tooltip._source = this), this._tooltip._prepareOpen(i) && (this._tooltip.openOn(this._map), this.getElement ? this._setAriaDescribedByOnLayer(this) : this.eachLayer && this.eachLayer(this._setAriaDescribedByOnLayer, this))), this;
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
          var a = typeof i.getElement == "function" && i.getElement();
          a && (Y(a, "focus", function() {
            this._tooltip._source = i, this.openTooltip();
          }, this), Y(a, "blur", this.closeTooltip, this));
        },
        _setAriaDescribedByOnLayer: function(i) {
          var a = typeof i.getElement == "function" && i.getElement();
          a && a.setAttribute("aria-describedby", this._tooltip._container.id);
        },
        _openTooltip: function(i) {
          if (!(!this._tooltip || !this._map)) {
            if (this._map.dragging && this._map.dragging.moving() && !this._openOnceFlag) {
              this._openOnceFlag = !0;
              var a = this;
              this._map.once("moveend", function() {
                a._openOnceFlag = !1, a._openTooltip(i);
              });
              return;
            }
            this._tooltip._source = i.layer || i.target, this.openTooltip(this._tooltip.options.sticky ? i.latlng : void 0);
          }
        },
        _moveTooltip: function(i) {
          var a = i.latlng, u, f;
          this._tooltip.options.sticky && i.originalEvent && (u = this._map.mouseEventToContainerPoint(i.originalEvent), f = this._map.containerPointToLayerPoint(u), a = this._map.layerPointToLatLng(f)), this._tooltip.setLatLng(a);
        }
      });
      var Ar = gi.extend({
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
          var a = i && i.tagName === "DIV" ? i : document.createElement("div"), u = this.options;
          if (u.html instanceof Element ? (An(a), a.appendChild(u.html)) : a.innerHTML = u.html !== !1 ? u.html : "", u.bgPos) {
            var f = F(u.bgPos);
            a.style.backgroundPosition = -f.x + "px " + -f.y + "px";
          }
          return this._setIconStyles(a, "icon"), a;
        },
        createShadow: function() {
          return null;
        }
      });
      function hc(i) {
        return new Ar(i);
      }
      gi.Default = Vi;
      var ji = oe.extend({
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
          b(this, i);
        },
        onAdd: function() {
          this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView();
        },
        beforeAdd: function(i) {
          i._addZoomLimit(this);
        },
        onRemove: function(i) {
          this._removeAllTiles(), bt(this._container), i._removeZoomLimit(this), this._container = null, this._tileZoom = void 0;
        },
        // @method bringToFront: this
        // Brings the tile layer to the top of all tile layers.
        bringToFront: function() {
          return this._map && (pi(this._container), this._setAutoZIndex(Math.max)), this;
        },
        // @method bringToBack: this
        // Brings the tile layer to the bottom of all tile layers.
        bringToBack: function() {
          return this._map && (_i(this._container), this._setAutoZIndex(Math.min)), this;
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
          for (var a = this.getPane().children, u = -i(-1 / 0, 1 / 0), f = 0, m = a.length, y; f < m; f++)
            y = a[f].style.zIndex, a[f] !== this._container && y && (u = i(u, +y));
          isFinite(u) && (this.options.zIndex = u + i(-1, 1), this._updateZIndex());
        },
        _updateOpacity: function() {
          if (this._map && !W.ielt9) {
            Jt(this._container, this.options.opacity);
            var i = +/* @__PURE__ */ new Date(), a = !1, u = !1;
            for (var f in this._tiles) {
              var m = this._tiles[f];
              if (!(!m.current || !m.loaded)) {
                var y = Math.min(1, (i - m.loaded) / 200);
                Jt(m.el, y), y < 1 ? a = !0 : (m.active ? u = !0 : this._onOpaqueTile(m), m.active = !0);
              }
            }
            u && !this._noPrune && this._pruneTiles(), a && (V(this._fadeFrame), this._fadeFrame = Z(this._updateOpacity, this));
          }
        },
        _onOpaqueTile: _,
        _initContainer: function() {
          this._container || (this._container = rt("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
        },
        _updateLevels: function() {
          var i = this._tileZoom, a = this.options.maxZoom;
          if (i !== void 0) {
            for (var u in this._levels)
              u = Number(u), this._levels[u].el.children.length || u === i ? (this._levels[u].el.style.zIndex = a - Math.abs(i - u), this._onUpdateLevel(u)) : (bt(this._levels[u].el), this._removeTilesAtZoom(u), this._onRemoveLevel(u), delete this._levels[u]);
            var f = this._levels[i], m = this._map;
            return f || (f = this._levels[i] = {}, f.el = rt("div", "leaflet-tile-container leaflet-zoom-animated", this._container), f.el.style.zIndex = a, f.origin = m.project(m.unproject(m.getPixelOrigin()), i).round(), f.zoom = i, this._setZoomTransform(f, m.getCenter(), m.getZoom()), _(f.el.offsetWidth), this._onCreateLevel(f)), this._level = f, f;
          }
        },
        _onUpdateLevel: _,
        _onRemoveLevel: _,
        _onCreateLevel: _,
        _pruneTiles: function() {
          if (this._map) {
            var i, a, u = this._map.getZoom();
            if (u > this.options.maxZoom || u < this.options.minZoom) {
              this._removeAllTiles();
              return;
            }
            for (i in this._tiles)
              a = this._tiles[i], a.retain = a.current;
            for (i in this._tiles)
              if (a = this._tiles[i], a.current && !a.active) {
                var f = a.coords;
                this._retainParent(f.x, f.y, f.z, f.z - 5) || this._retainChildren(f.x, f.y, f.z, f.z + 2);
              }
            for (i in this._tiles)
              this._tiles[i].retain || this._removeTile(i);
          }
        },
        _removeTilesAtZoom: function(i) {
          for (var a in this._tiles)
            this._tiles[a].coords.z === i && this._removeTile(a);
        },
        _removeAllTiles: function() {
          for (var i in this._tiles)
            this._removeTile(i);
        },
        _invalidateAll: function() {
          for (var i in this._levels)
            bt(this._levels[i].el), this._onRemoveLevel(Number(i)), delete this._levels[i];
          this._removeAllTiles(), this._tileZoom = void 0;
        },
        _retainParent: function(i, a, u, f) {
          var m = Math.floor(i / 2), y = Math.floor(a / 2), w = u - 1, k = new H(+m, +y);
          k.z = +w;
          var C = this._tileCoordsToKey(k), E = this._tiles[C];
          return E && E.active ? (E.retain = !0, !0) : (E && E.loaded && (E.retain = !0), w > f ? this._retainParent(m, y, w, f) : !1);
        },
        _retainChildren: function(i, a, u, f) {
          for (var m = 2 * i; m < 2 * i + 2; m++)
            for (var y = 2 * a; y < 2 * a + 2; y++) {
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
          var a = i && (i.pinch || i.flyTo);
          this._setView(this._map.getCenter(), this._map.getZoom(), a, a);
        },
        _animateZoom: function(i) {
          this._setView(i.center, i.zoom, !0, i.noUpdate);
        },
        _clampZoom: function(i) {
          var a = this.options;
          return a.minNativeZoom !== void 0 && i < a.minNativeZoom ? a.minNativeZoom : a.maxNativeZoom !== void 0 && a.maxNativeZoom < i ? a.maxNativeZoom : i;
        },
        _setView: function(i, a, u, f) {
          var m = Math.round(a);
          this.options.maxZoom !== void 0 && m > this.options.maxZoom || this.options.minZoom !== void 0 && m < this.options.minZoom ? m = void 0 : m = this._clampZoom(m);
          var y = this.options.updateWhenZooming && m !== this._tileZoom;
          (!f || y) && (this._tileZoom = m, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), m !== void 0 && this._update(i), u || this._pruneTiles(), this._noPrune = !!u), this._setZoomTransforms(i, a);
        },
        _setZoomTransforms: function(i, a) {
          for (var u in this._levels)
            this._setZoomTransform(this._levels[u], i, a);
        },
        _setZoomTransform: function(i, a, u) {
          var f = this._map.getZoomScale(u, i.zoom), m = i.origin.multiplyBy(f).subtract(this._map._getNewPixelOrigin(a, u)).round();
          W.any3d ? Ue(i.el, m, f) : Ct(i.el, m);
        },
        _resetGrid: function() {
          var i = this._map, a = i.options.crs, u = this._tileSize = this.getTileSize(), f = this._tileZoom, m = this._map.getPixelWorldBounds(this._tileZoom);
          m && (this._globalTileRange = this._pxBoundsToTileRange(m)), this._wrapX = a.wrapLng && !this.options.noWrap && [
            Math.floor(i.project([0, a.wrapLng[0]], f).x / u.x),
            Math.ceil(i.project([0, a.wrapLng[1]], f).x / u.y)
          ], this._wrapY = a.wrapLat && !this.options.noWrap && [
            Math.floor(i.project([a.wrapLat[0], 0], f).y / u.x),
            Math.ceil(i.project([a.wrapLat[1], 0], f).y / u.y)
          ];
        },
        _onMoveEnd: function() {
          !this._map || this._map._animatingZoom || this._update();
        },
        _getTiledPixelBounds: function(i) {
          var a = this._map, u = a._animatingZoom ? Math.max(a._animateToZoom, a.getZoom()) : a.getZoom(), f = a.getZoomScale(u, this._tileZoom), m = a.project(i, this._tileZoom).floor(), y = a.getSize().divideBy(f * 2);
          return new K(m.subtract(y), m.add(y));
        },
        // Private method to load tiles in the grid's active zoom level according to map bounds
        _update: function(i) {
          var a = this._map;
          if (a) {
            var u = this._clampZoom(a.getZoom());
            if (i === void 0 && (i = a.getCenter()), this._tileZoom !== void 0) {
              var f = this._getTiledPixelBounds(i), m = this._pxBoundsToTileRange(f), y = m.getCenter(), w = [], k = this.options.keepBuffer, C = new K(
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
                for (var Q = m.min.x; Q <= m.max.x; Q++) {
                  var Wt = new H(Q, j);
                  if (Wt.z = this._tileZoom, !!this._isValidTile(Wt)) {
                    var It = this._tiles[this._tileCoordsToKey(Wt)];
                    It ? It.current = !0 : w.push(Wt);
                  }
                }
              if (w.sort(function(Vt, xi) {
                return Vt.distanceTo(y) - xi.distanceTo(y);
              }), w.length !== 0) {
                this._loading || (this._loading = !0, this.fire("loading"));
                var te = document.createDocumentFragment();
                for (Q = 0; Q < w.length; Q++)
                  this._addTile(w[Q], te);
                this._level.el.appendChild(te);
              }
            }
          }
        },
        _isValidTile: function(i) {
          var a = this._map.options.crs;
          if (!a.infinite) {
            var u = this._globalTileRange;
            if (!a.wrapLng && (i.x < u.min.x || i.x > u.max.x) || !a.wrapLat && (i.y < u.min.y || i.y > u.max.y))
              return !1;
          }
          if (!this.options.bounds)
            return !0;
          var f = this._tileCoordsToBounds(i);
          return ot(this.options.bounds).overlaps(f);
        },
        _keyToBounds: function(i) {
          return this._tileCoordsToBounds(this._keyToTileCoords(i));
        },
        _tileCoordsToNwSe: function(i) {
          var a = this._map, u = this.getTileSize(), f = i.scaleBy(u), m = f.add(u), y = a.unproject(f, i.z), w = a.unproject(m, i.z);
          return [y, w];
        },
        // converts tile coordinates to its geographical bounds
        _tileCoordsToBounds: function(i) {
          var a = this._tileCoordsToNwSe(i), u = new vt(a[0], a[1]);
          return this.options.noWrap || (u = this._map.wrapLatLngBounds(u)), u;
        },
        // converts tile coordinates to key for the tile cache
        _tileCoordsToKey: function(i) {
          return i.x + ":" + i.y + ":" + i.z;
        },
        // converts tile cache key to coordinates
        _keyToTileCoords: function(i) {
          var a = i.split(":"), u = new H(+a[0], +a[1]);
          return u.z = +a[2], u;
        },
        _removeTile: function(i) {
          var a = this._tiles[i];
          a && (bt(a.el), delete this._tiles[i], this.fire("tileunload", {
            tile: a.el,
            coords: this._keyToTileCoords(i)
          }));
        },
        _initTile: function(i) {
          X(i, "leaflet-tile");
          var a = this.getTileSize();
          i.style.width = a.x + "px", i.style.height = a.y + "px", i.onselectstart = _, i.onmousemove = _, W.ielt9 && this.options.opacity < 1 && Jt(i, this.options.opacity);
        },
        _addTile: function(i, a) {
          var u = this._getTilePos(i), f = this._tileCoordsToKey(i), m = this.createTile(this._wrapCoords(i), l(this._tileReady, this, i));
          this._initTile(m), this.createTile.length < 2 && Z(l(this._tileReady, this, i, null, m)), Ct(m, u), this._tiles[f] = {
            el: m,
            coords: i,
            current: !0
          }, a.appendChild(m), this.fire("tileloadstart", {
            tile: m,
            coords: i
          });
        },
        _tileReady: function(i, a, u) {
          a && this.fire("tileerror", {
            error: a,
            tile: u,
            coords: i
          });
          var f = this._tileCoordsToKey(i);
          u = this._tiles[f], u && (u.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (Jt(u.el, 0), V(this._fadeFrame), this._fadeFrame = Z(this._updateOpacity, this)) : (u.active = !0, this._pruneTiles()), a || (X(u.el, "leaflet-tile-loaded"), this.fire("tileload", {
            tile: u.el,
            coords: i
          })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), W.ielt9 || !this._map._fadeAnimated ? Z(this._pruneTiles, this) : setTimeout(l(this._pruneTiles, this), 250)));
        },
        _getTilePos: function(i) {
          return i.scaleBy(this.getTileSize()).subtract(this._level.origin);
        },
        _wrapCoords: function(i) {
          var a = new H(
            this._wrapX ? p(i.x, this._wrapX) : i.x,
            this._wrapY ? p(i.y, this._wrapY) : i.y
          );
          return a.z = i.z, a;
        },
        _pxBoundsToTileRange: function(i) {
          var a = this.getTileSize();
          return new K(
            i.min.unscaleBy(a).floor(),
            i.max.unscaleBy(a).ceil().subtract([1, 1])
          );
        },
        _noTilesToLoad: function() {
          for (var i in this._tiles)
            if (!this._tiles[i].loaded)
              return !1;
          return !0;
        }
      });
      function cc(i) {
        return new ji(i);
      }
      var bi = ji.extend({
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
        initialize: function(i, a) {
          this._url = i, a = b(this, a), a.detectRetina && W.retina && a.maxZoom > 0 ? (a.tileSize = Math.floor(a.tileSize / 2), a.zoomReverse ? (a.zoomOffset--, a.minZoom = Math.min(a.maxZoom, a.minZoom + 1)) : (a.zoomOffset++, a.maxZoom = Math.max(a.minZoom, a.maxZoom - 1)), a.minZoom = Math.max(0, a.minZoom)) : a.zoomReverse ? a.minZoom = Math.min(a.maxZoom, a.minZoom) : a.maxZoom = Math.max(a.minZoom, a.maxZoom), typeof a.subdomains == "string" && (a.subdomains = a.subdomains.split("")), this.on("tileunload", this._onTileRemove);
        },
        // @method setUrl(url: String, noRedraw?: Boolean): this
        // Updates the layer's URL template and redraws it (unless `noRedraw` is set to `true`).
        // If the URL does not change, the layer will not be redrawn unless
        // the noRedraw parameter is set to false.
        setUrl: function(i, a) {
          return this._url === i && a === void 0 && (a = !0), this._url = i, a || this.redraw(), this;
        },
        // @method createTile(coords: Object, done?: Function): HTMLElement
        // Called only internally, overrides GridLayer's [`createTile()`](#gridlayer-createtile)
        // to return an `<img>` HTML element with the appropriate image URL given `coords`. The `done`
        // callback is called when the tile has been loaded.
        createTile: function(i, a) {
          var u = document.createElement("img");
          return Y(u, "load", l(this._tileOnLoad, this, a, u)), Y(u, "error", l(this._tileOnError, this, a, u)), (this.options.crossOrigin || this.options.crossOrigin === "") && (u.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (u.referrerPolicy = this.options.referrerPolicy), u.alt = "", u.src = this.getTileUrl(i), u;
        },
        // @section Extension methods
        // @uninheritable
        // Layers extending `TileLayer` might reimplement the following method.
        // @method getTileUrl(coords: Object): String
        // Called only internally, returns the URL for a tile given its coordinates.
        // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
        getTileUrl: function(i) {
          var a = {
            r: W.retina ? "@2x" : "",
            s: this._getSubdomain(i),
            x: i.x,
            y: i.y,
            z: this._getZoomForUrl()
          };
          if (this._map && !this._map.options.crs.infinite) {
            var u = this._globalTileRange.max.y - i.y;
            this.options.tms && (a.y = u), a["-y"] = u;
          }
          return S(this._url, r(a, this.options));
        },
        _tileOnLoad: function(i, a) {
          W.ielt9 ? setTimeout(l(i, this, null, a), 0) : i(null, a);
        },
        _tileOnError: function(i, a, u) {
          var f = this.options.errorTileUrl;
          f && a.getAttribute("src") !== f && (a.src = f), i(u, a);
        },
        _onTileRemove: function(i) {
          i.tile.onload = null;
        },
        _getZoomForUrl: function() {
          var i = this._tileZoom, a = this.options.maxZoom, u = this.options.zoomReverse, f = this.options.zoomOffset;
          return u && (i = a - i), i + f;
        },
        _getSubdomain: function(i) {
          var a = Math.abs(i.x + i.y) % this.options.subdomains.length;
          return this.options.subdomains[a];
        },
        // stops loading all tiles in the background layer
        _abortLoading: function() {
          var i, a;
          for (i in this._tiles)
            if (this._tiles[i].coords.z !== this._tileZoom && (a = this._tiles[i].el, a.onload = _, a.onerror = _, !a.complete)) {
              a.src = T;
              var u = this._tiles[i].coords;
              bt(a), delete this._tiles[i], this.fire("tileabort", {
                tile: a,
                coords: u
              });
            }
        },
        _removeTile: function(i) {
          var a = this._tiles[i];
          if (a)
            return a.el.setAttribute("src", T), ji.prototype._removeTile.call(this, i);
        },
        _tileReady: function(i, a, u) {
          if (!(!this._map || u && u.getAttribute("src") === T))
            return ji.prototype._tileReady.call(this, i, a, u);
        }
      });
      function Er(i, a) {
        return new bi(i, a);
      }
      var Ir = bi.extend({
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
        initialize: function(i, a) {
          this._url = i;
          var u = r({}, this.defaultWmsParams);
          for (var f in a)
            f in this.options || (u[f] = a[f]);
          a = b(this, a);
          var m = a.detectRetina && W.retina ? 2 : 1, y = this.getTileSize();
          u.width = y.x * m, u.height = y.y * m, this.wmsParams = u;
        },
        onAdd: function(i) {
          this._crs = this.options.crs || i.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
          var a = this._wmsVersion >= 1.3 ? "crs" : "srs";
          this.wmsParams[a] = this._crs.code, bi.prototype.onAdd.call(this, i);
        },
        getTileUrl: function(i) {
          var a = this._tileCoordsToNwSe(i), u = this._crs, f = ht(u.project(a[0]), u.project(a[1])), m = f.min, y = f.max, w = (this._wmsVersion >= 1.3 && this._crs === Pr ? [m.y, m.x, y.y, y.x] : [m.x, m.y, y.x, y.y]).join(","), k = bi.prototype.getTileUrl.call(this, i);
          return k + M(this.wmsParams, k, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + w;
        },
        // @method setParams(params: Object, noRedraw?: Boolean): this
        // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
        setParams: function(i, a) {
          return r(this.wmsParams, i), a || this.redraw(), this;
        }
      });
      function uc(i, a) {
        return new Ir(i, a);
      }
      bi.WMS = Ir, Er.wms = uc;
      var be = oe.extend({
        // @section
        // @aka Renderer options
        options: {
          // @option padding: Number = 0.1
          // How much to extend the clip area around the map view (relative to its size)
          // e.g. 0.1 would be 10% of map view in each direction
          padding: 0.1
        },
        initialize: function(i) {
          b(this, i), c(this), this._layers = this._layers || {};
        },
        onAdd: function() {
          this._container || (this._initContainer(), X(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
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
        _updateTransform: function(i, a) {
          var u = this._map.getZoomScale(a, this._zoom), f = this._map.getSize().multiplyBy(0.5 + this.options.padding), m = this._map.project(this._center, a), y = f.multiplyBy(-u).add(m).subtract(this._map._getNewPixelOrigin(i, a));
          W.any3d ? Ue(this._container, y, u) : Ct(this._container, y);
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
          var i = this.options.padding, a = this._map.getSize(), u = this._map.containerPointToLayerPoint(a.multiplyBy(-i)).round();
          this._bounds = new K(u, u.add(a.multiplyBy(1 + i * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
        }
      }), Dr = be.extend({
        // @section
        // @aka Canvas options
        options: {
          // @option tolerance: Number = 0
          // How much to extend the click tolerance around a path/object on the map.
          tolerance: 0
        },
        getEvents: function() {
          var i = be.prototype.getEvents.call(this);
          return i.viewprereset = this._onViewPreReset, i;
        },
        _onViewPreReset: function() {
          this._postponeUpdatePaths = !0;
        },
        onAdd: function() {
          be.prototype.onAdd.call(this), this._draw();
        },
        _initContainer: function() {
          var i = this._container = document.createElement("canvas");
          Y(i, "mousemove", this._onMouseMove, this), Y(i, "click dblclick mousedown mouseup contextmenu", this._onClick, this), Y(i, "mouseout", this._handleMouseOut, this), i._leaflet_disable_events = !0, this._ctx = i.getContext("2d");
        },
        _destroyContainer: function() {
          V(this._redrawRequest), delete this._ctx, bt(this._container), ft(this._container), delete this._container;
        },
        _updatePaths: function() {
          if (!this._postponeUpdatePaths) {
            var i;
            this._redrawBounds = null;
            for (var a in this._layers)
              i = this._layers[a], i._update();
            this._redraw();
          }
        },
        _update: function() {
          if (!(this._map._animatingZoom && this._bounds)) {
            be.prototype._update.call(this);
            var i = this._bounds, a = this._container, u = i.getSize(), f = W.retina ? 2 : 1;
            Ct(a, i.min), a.width = f * u.x, a.height = f * u.y, a.style.width = u.x + "px", a.style.height = u.y + "px", W.retina && this._ctx.scale(2, 2), this._ctx.translate(-i.min.x, -i.min.y), this.fire("update");
          }
        },
        _reset: function() {
          be.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
        },
        _initPath: function(i) {
          this._updateDashArray(i), this._layers[c(i)] = i;
          var a = i._order = {
            layer: i,
            prev: this._drawLast,
            next: null
          };
          this._drawLast && (this._drawLast.next = a), this._drawLast = a, this._drawFirst = this._drawFirst || this._drawLast;
        },
        _addPath: function(i) {
          this._requestRedraw(i);
        },
        _removePath: function(i) {
          var a = i._order, u = a.next, f = a.prev;
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
            var a = i.options.dashArray.split(/[, ]+/), u = [], f, m;
            for (m = 0; m < a.length; m++) {
              if (f = Number(a[m]), isNaN(f))
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
            var a = (i.options.weight || 0) + 1;
            this._redrawBounds = this._redrawBounds || new K(), this._redrawBounds.extend(i._pxBounds.min.subtract([a, a])), this._redrawBounds.extend(i._pxBounds.max.add([a, a]));
          }
        },
        _redraw: function() {
          this._redrawRequest = null, this._redrawBounds && (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()), this._clear(), this._draw(), this._redrawBounds = null;
        },
        _clear: function() {
          var i = this._redrawBounds;
          if (i) {
            var a = i.getSize();
            this._ctx.clearRect(i.min.x, i.min.y, a.x, a.y);
          } else
            this._ctx.save(), this._ctx.setTransform(1, 0, 0, 1, 0, 0), this._ctx.clearRect(0, 0, this._container.width, this._container.height), this._ctx.restore();
        },
        _draw: function() {
          var i, a = this._redrawBounds;
          if (this._ctx.save(), a) {
            var u = a.getSize();
            this._ctx.beginPath(), this._ctx.rect(a.min.x, a.min.y, u.x, u.y), this._ctx.clip();
          }
          this._drawing = !0;
          for (var f = this._drawFirst; f; f = f.next)
            i = f.layer, (!a || i._pxBounds && i._pxBounds.intersects(a)) && i._updatePath();
          this._drawing = !1, this._ctx.restore();
        },
        _updatePoly: function(i, a) {
          if (this._drawing) {
            var u, f, m, y, w = i._parts, k = w.length, C = this._ctx;
            if (k) {
              for (C.beginPath(), u = 0; u < k; u++) {
                for (f = 0, m = w[u].length; f < m; f++)
                  y = w[u][f], C[f ? "lineTo" : "moveTo"](y.x, y.y);
                a && C.closePath();
              }
              this._fillStroke(C, i);
            }
          }
        },
        _updateCircle: function(i) {
          if (!(!this._drawing || i._empty())) {
            var a = i._point, u = this._ctx, f = Math.max(Math.round(i._radius), 1), m = (Math.max(Math.round(i._radiusY), 1) || f) / f;
            m !== 1 && (u.save(), u.scale(1, m)), u.beginPath(), u.arc(a.x, a.y / m, f, 0, Math.PI * 2, !1), m !== 1 && u.restore(), this._fillStroke(u, i);
          }
        },
        _fillStroke: function(i, a) {
          var u = a.options;
          u.fill && (i.globalAlpha = u.fillOpacity, i.fillStyle = u.fillColor || u.color, i.fill(u.fillRule || "evenodd")), u.stroke && u.weight !== 0 && (i.setLineDash && i.setLineDash(a.options && a.options._dashArray || []), i.globalAlpha = u.opacity, i.lineWidth = u.weight, i.strokeStyle = u.color, i.lineCap = u.lineCap, i.lineJoin = u.lineJoin, i.stroke());
        },
        // Canvas obviously doesn't have mouse events for individual drawn objects,
        // so we emulate that by calculating what's under the mouse on mousemove/click manually
        _onClick: function(i) {
          for (var a = this._map.mouseEventToLayerPoint(i), u, f, m = this._drawFirst; m; m = m.next)
            u = m.layer, u.options.interactive && u._containsPoint(a) && (!(i.type === "click" || i.type === "preclick") || !this._map._draggableMoved(u)) && (f = u);
          this._fireEvent(f ? [f] : !1, i);
        },
        _onMouseMove: function(i) {
          if (!(!this._map || this._map.dragging.moving() || this._map._animatingZoom)) {
            var a = this._map.mouseEventToLayerPoint(i);
            this._handleMouseHover(i, a);
          }
        },
        _handleMouseOut: function(i) {
          var a = this._hoveredLayer;
          a && (Pt(this._container, "leaflet-interactive"), this._fireEvent([a], i, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
        },
        _handleMouseHover: function(i, a) {
          if (!this._mouseHoverThrottled) {
            for (var u, f, m = this._drawFirst; m; m = m.next)
              u = m.layer, u.options.interactive && u._containsPoint(a) && (f = u);
            f !== this._hoveredLayer && (this._handleMouseOut(i), f && (X(this._container, "leaflet-interactive"), this._fireEvent([f], i, "mouseover"), this._hoveredLayer = f)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, i), this._mouseHoverThrottled = !0, setTimeout(l(function() {
              this._mouseHoverThrottled = !1;
            }, this), 32);
          }
        },
        _fireEvent: function(i, a, u) {
          this._map._fireDOMEvent(a, u || a.type, i);
        },
        _bringToFront: function(i) {
          var a = i._order;
          if (a) {
            var u = a.next, f = a.prev;
            if (u)
              u.prev = f;
            else
              return;
            f ? f.next = u : u && (this._drawFirst = u), a.prev = this._drawLast, this._drawLast.next = a, a.next = null, this._drawLast = a, this._requestRedraw(i);
          }
        },
        _bringToBack: function(i) {
          var a = i._order;
          if (a) {
            var u = a.next, f = a.prev;
            if (f)
              f.next = u;
            else
              return;
            u ? u.prev = f : f && (this._drawLast = f), a.prev = null, a.next = this._drawFirst, this._drawFirst.prev = a, this._drawFirst = a, this._requestRedraw(i);
          }
        }
      });
      function zr(i) {
        return W.canvas ? new Dr(i) : null;
      }
      var Ui = function() {
        try {
          return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(i) {
            return document.createElement("<lvml:" + i + ' class="lvml">');
          };
        } catch {
        }
        return function(i) {
          return document.createElement("<" + i + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
        };
      }(), dc = {
        _initContainer: function() {
          this._container = rt("div", "leaflet-vml-container");
        },
        _update: function() {
          this._map._animatingZoom || (be.prototype._update.call(this), this.fire("update"));
        },
        _initPath: function(i) {
          var a = i._container = Ui("shape");
          X(a, "leaflet-vml-shape " + (this.options.className || "")), a.coordsize = "1 1", i._path = Ui("path"), a.appendChild(i._path), this._updateStyle(i), this._layers[c(i)] = i;
        },
        _addPath: function(i) {
          var a = i._container;
          this._container.appendChild(a), i.options.interactive && i.addInteractiveTarget(a);
        },
        _removePath: function(i) {
          var a = i._container;
          bt(a), i.removeInteractiveTarget(a), delete this._layers[c(i)];
        },
        _updateStyle: function(i) {
          var a = i._stroke, u = i._fill, f = i.options, m = i._container;
          m.stroked = !!f.stroke, m.filled = !!f.fill, f.stroke ? (a || (a = i._stroke = Ui("stroke")), m.appendChild(a), a.weight = f.weight + "px", a.color = f.color, a.opacity = f.opacity, f.dashArray ? a.dashStyle = O(f.dashArray) ? f.dashArray.join(" ") : f.dashArray.replace(/( *, *)/g, " ") : a.dashStyle = "", a.endcap = f.lineCap.replace("butt", "flat"), a.joinstyle = f.lineJoin) : a && (m.removeChild(a), i._stroke = null), f.fill ? (u || (u = i._fill = Ui("fill")), m.appendChild(u), u.color = f.fillColor || f.color, u.opacity = f.fillOpacity) : u && (m.removeChild(u), i._fill = null);
        },
        _updateCircle: function(i) {
          var a = i._point.round(), u = Math.round(i._radius), f = Math.round(i._radiusY || u);
          this._setPath(i, i._empty() ? "M0 0" : "AL " + a.x + "," + a.y + " " + u + "," + f + " 0," + 65535 * 360);
        },
        _setPath: function(i, a) {
          i._path.v = a;
        },
        _bringToFront: function(i) {
          pi(i._container);
        },
        _bringToBack: function(i) {
          _i(i._container);
        }
      }, Gn = W.vml ? Ui : li, Gi = be.extend({
        _initContainer: function() {
          this._container = Gn("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = Gn("g"), this._container.appendChild(this._rootGroup);
        },
        _destroyContainer: function() {
          bt(this._container), ft(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
        },
        _update: function() {
          if (!(this._map._animatingZoom && this._bounds)) {
            be.prototype._update.call(this);
            var i = this._bounds, a = i.getSize(), u = this._container;
            (!this._svgSize || !this._svgSize.equals(a)) && (this._svgSize = a, u.setAttribute("width", a.x), u.setAttribute("height", a.y)), Ct(u, i.min), u.setAttribute("viewBox", [i.min.x, i.min.y, a.x, a.y].join(" ")), this.fire("update");
          }
        },
        // methods below are called by vector layers implementations
        _initPath: function(i) {
          var a = i._path = Gn("path");
          i.options.className && X(a, i.options.className), i.options.interactive && X(a, "leaflet-interactive"), this._updateStyle(i), this._layers[c(i)] = i;
        },
        _addPath: function(i) {
          this._rootGroup || this._initContainer(), this._rootGroup.appendChild(i._path), i.addInteractiveTarget(i._path);
        },
        _removePath: function(i) {
          bt(i._path), i.removeInteractiveTarget(i._path), delete this._layers[c(i)];
        },
        _updatePath: function(i) {
          i._project(), i._update();
        },
        _updateStyle: function(i) {
          var a = i._path, u = i.options;
          a && (u.stroke ? (a.setAttribute("stroke", u.color), a.setAttribute("stroke-opacity", u.opacity), a.setAttribute("stroke-width", u.weight), a.setAttribute("stroke-linecap", u.lineCap), a.setAttribute("stroke-linejoin", u.lineJoin), u.dashArray ? a.setAttribute("stroke-dasharray", u.dashArray) : a.removeAttribute("stroke-dasharray"), u.dashOffset ? a.setAttribute("stroke-dashoffset", u.dashOffset) : a.removeAttribute("stroke-dashoffset")) : a.setAttribute("stroke", "none"), u.fill ? (a.setAttribute("fill", u.fillColor || u.color), a.setAttribute("fill-opacity", u.fillOpacity), a.setAttribute("fill-rule", u.fillRule || "evenodd")) : a.setAttribute("fill", "none"));
        },
        _updatePoly: function(i, a) {
          this._setPath(i, hi(i._parts, a));
        },
        _updateCircle: function(i) {
          var a = i._point, u = Math.max(Math.round(i._radius), 1), f = Math.max(Math.round(i._radiusY), 1) || u, m = "a" + u + "," + f + " 0 1,0 ", y = i._empty() ? "M0 0" : "M" + (a.x - u) + "," + a.y + m + u * 2 + ",0 " + m + -u * 2 + ",0 ";
          this._setPath(i, y);
        },
        _setPath: function(i, a) {
          i._path.setAttribute("d", a);
        },
        // SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
        _bringToFront: function(i) {
          pi(i._path);
        },
        _bringToBack: function(i) {
          _i(i._path);
        }
      });
      W.vml && Gi.include(dc);
      function Br(i) {
        return W.svg || W.vml ? new Gi(i) : null;
      }
      it.include({
        // @namespace Map; @method getRenderer(layer: Path): Renderer
        // Returns the instance of `Renderer` that should be used to render the given
        // `Path`. It will ensure that the `renderer` options of the map and paths
        // are respected, and that the renderers do exist on the map.
        getRenderer: function(i) {
          var a = i.options.renderer || this._getPaneRenderer(i.options.pane) || this.options.renderer || this._renderer;
          return a || (a = this._renderer = this._createRenderer()), this.hasLayer(a) || this.addLayer(a), a;
        },
        _getPaneRenderer: function(i) {
          if (i === "overlayPane" || i === void 0)
            return !1;
          var a = this._paneRenderers[i];
          return a === void 0 && (a = this._createRenderer({ pane: i }), this._paneRenderers[i] = a), a;
        },
        _createRenderer: function(i) {
          return this.options.preferCanvas && zr(i) || Br(i);
        }
      });
      var Rr = vi.extend({
        initialize: function(i, a) {
          vi.prototype.initialize.call(this, this._boundsToLatLngs(i), a);
        },
        // @method setBounds(latLngBounds: LatLngBounds): this
        // Redraws the rectangle with the passed bounds.
        setBounds: function(i) {
          return this.setLatLngs(this._boundsToLatLngs(i));
        },
        _boundsToLatLngs: function(i) {
          return i = ot(i), [
            i.getSouthWest(),
            i.getNorthWest(),
            i.getNorthEast(),
            i.getSouthEast()
          ];
        }
      });
      function fc(i, a) {
        return new Rr(i, a);
      }
      Gi.create = Gn, Gi.pointsToPath = hi, ye.geometryToLayer = Nn, ye.coordsToLatLng = to, ye.coordsToLatLngs = Zn, ye.latLngToCoords = eo, ye.latLngsToCoords = Hn, ye.getFeature = yi, ye.asFeature = Wn, it.mergeOptions({
        // @option boxZoom: Boolean = true
        // Whether the map can be zoomed to a rectangular area specified by
        // dragging the mouse while pressing the shift key.
        boxZoom: !0
      });
      var Fr = de.extend({
        initialize: function(i) {
          this._map = i, this._container = i._container, this._pane = i._panes.overlayPane, this._resetStateTimeout = 0, i.on("unload", this._destroy, this);
        },
        addHooks: function() {
          Y(this._container, "mousedown", this._onMouseDown, this);
        },
        removeHooks: function() {
          ft(this._container, "mousedown", this._onMouseDown, this);
        },
        moved: function() {
          return this._moved;
        },
        _destroy: function() {
          bt(this._pane), delete this._pane;
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
          this._clearDeferredResetState(), this._resetState(), Ri(), Rs(), this._startPoint = this._map.mouseEventToContainerPoint(i), Y(document, {
            contextmenu: qe,
            mousemove: this._onMouseMove,
            mouseup: this._onMouseUp,
            keydown: this._onKeyDown
          }, this);
        },
        _onMouseMove: function(i) {
          this._moved || (this._moved = !0, this._box = rt("div", "leaflet-zoom-box", this._container), X(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(i);
          var a = new K(this._point, this._startPoint), u = a.getSize();
          Ct(this._box, a.min), this._box.style.width = u.x + "px", this._box.style.height = u.y + "px";
        },
        _finish: function() {
          this._moved && (bt(this._box), Pt(this._container, "leaflet-crosshair")), Fi(), Fs(), ft(document, {
            contextmenu: qe,
            mousemove: this._onMouseMove,
            mouseup: this._onMouseUp,
            keydown: this._onKeyDown
          }, this);
        },
        _onMouseUp: function(i) {
          if (!(i.which !== 1 && i.button !== 1) && (this._finish(), !!this._moved)) {
            this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(l(this._resetState, this), 0);
            var a = new vt(
              this._map.containerPointToLatLng(this._startPoint),
              this._map.containerPointToLatLng(this._point)
            );
            this._map.fitBounds(a).fire("boxzoomend", { boxZoomBounds: a });
          }
        },
        _onKeyDown: function(i) {
          i.keyCode === 27 && (this._finish(), this._clearDeferredResetState(), this._resetState());
        }
      });
      it.addInitHook("addHandler", "boxZoom", Fr), it.mergeOptions({
        // @option doubleClickZoom: Boolean|String = true
        // Whether the map can be zoomed in by double clicking on it and
        // zoomed out by double clicking while holding shift. If passed
        // `'center'`, double-click zoom will zoom to the center of the
        //  view regardless of where the mouse was.
        doubleClickZoom: !0
      });
      var Nr = de.extend({
        addHooks: function() {
          this._map.on("dblclick", this._onDoubleClick, this);
        },
        removeHooks: function() {
          this._map.off("dblclick", this._onDoubleClick, this);
        },
        _onDoubleClick: function(i) {
          var a = this._map, u = a.getZoom(), f = a.options.zoomDelta, m = i.originalEvent.shiftKey ? u - f : u + f;
          a.options.doubleClickZoom === "center" ? a.setZoom(m) : a.setZoomAround(i.containerPoint, m);
        }
      });
      it.addInitHook("addHandler", "doubleClickZoom", Nr), it.mergeOptions({
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
      var Zr = de.extend({
        addHooks: function() {
          if (!this._draggable) {
            var i = this._map;
            this._draggable = new Ie(i._mapPane, i._container), this._draggable.on({
              dragstart: this._onDragStart,
              drag: this._onDrag,
              dragend: this._onDragEnd
            }, this), this._draggable.on("predrag", this._onPreDragLimit, this), i.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), i.on("zoomend", this._onZoomEnd, this), i.whenReady(this._onZoomEnd, this));
          }
          X(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
        },
        removeHooks: function() {
          Pt(this._map._container, "leaflet-grab"), Pt(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
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
            var a = ot(this._map.options.maxBounds);
            this._offsetLimit = ht(
              this._map.latLngToContainerPoint(a.getNorthWest()).multiplyBy(-1),
              this._map.latLngToContainerPoint(a.getSouthEast()).multiplyBy(-1).add(this._map.getSize())
            ), this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
          } else
            this._offsetLimit = null;
          i.fire("movestart").fire("dragstart"), i.options.inertia && (this._positions = [], this._times = []);
        },
        _onDrag: function(i) {
          if (this._map.options.inertia) {
            var a = this._lastTime = +/* @__PURE__ */ new Date(), u = this._lastPos = this._draggable._absPos || this._draggable._newPos;
            this._positions.push(u), this._times.push(a), this._prunePositions(a);
          }
          this._map.fire("move", i).fire("drag", i);
        },
        _prunePositions: function(i) {
          for (; this._positions.length > 1 && i - this._times[0] > 50; )
            this._positions.shift(), this._times.shift();
        },
        _onZoomEnd: function() {
          var i = this._map.getSize().divideBy(2), a = this._map.latLngToLayerPoint([0, 0]);
          this._initialWorldOffset = a.subtract(i).x, this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
        },
        _viscousLimit: function(i, a) {
          return i - (i - a) * this._viscosity;
        },
        _onPreDragLimit: function() {
          if (!(!this._viscosity || !this._offsetLimit)) {
            var i = this._draggable._newPos.subtract(this._draggable._startPos), a = this._offsetLimit;
            i.x < a.min.x && (i.x = this._viscousLimit(i.x, a.min.x)), i.y < a.min.y && (i.y = this._viscousLimit(i.y, a.min.y)), i.x > a.max.x && (i.x = this._viscousLimit(i.x, a.max.x)), i.y > a.max.y && (i.y = this._viscousLimit(i.y, a.max.y)), this._draggable._newPos = this._draggable._startPos.add(i);
          }
        },
        _onPreDragWrap: function() {
          var i = this._worldWidth, a = Math.round(i / 2), u = this._initialWorldOffset, f = this._draggable._newPos.x, m = (f - a + u) % i + a - u, y = (f + a + u) % i - a - u, w = Math.abs(m + u) < Math.abs(y + u) ? m : y;
          this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = w;
        },
        _onDragEnd: function(i) {
          var a = this._map, u = a.options, f = !u.inertia || i.noInertia || this._times.length < 2;
          if (a.fire("dragend", i), f)
            a.fire("moveend");
          else {
            this._prunePositions(+/* @__PURE__ */ new Date());
            var m = this._lastPos.subtract(this._positions[0]), y = (this._lastTime - this._times[0]) / 1e3, w = u.easeLinearity, k = m.multiplyBy(w / y), C = k.distanceTo([0, 0]), E = Math.min(u.inertiaMaxSpeed, C), R = k.multiplyBy(E / C), j = E / (u.inertiaDeceleration * w), Q = R.multiplyBy(-j / 2).round();
            !Q.x && !Q.y ? a.fire("moveend") : (Q = a._limitOffset(Q, a.options.maxBounds), Z(function() {
              a.panBy(Q, {
                duration: j,
                easeLinearity: w,
                noMoveStart: !0,
                animate: !0
              });
            }));
          }
        }
      });
      it.addInitHook("addHandler", "dragging", Zr), it.mergeOptions({
        // @option keyboard: Boolean = true
        // Makes the map focusable and allows users to navigate the map with keyboard
        // arrows and `+`/`-` keys.
        keyboard: !0,
        // @option keyboardPanDelta: Number = 80
        // Amount of pixels to pan when pressing an arrow key.
        keyboardPanDelta: 80
      });
      var Hr = de.extend({
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
          i.tabIndex <= 0 && (i.tabIndex = "0"), Y(i, {
            focus: this._onFocus,
            blur: this._onBlur,
            mousedown: this._onMouseDown
          }, this), this._map.on({
            focus: this._addHooks,
            blur: this._removeHooks
          }, this);
        },
        removeHooks: function() {
          this._removeHooks(), ft(this._map._container, {
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
            var i = document.body, a = document.documentElement, u = i.scrollTop || a.scrollTop, f = i.scrollLeft || a.scrollLeft;
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
          var a = this._panKeys = {}, u = this.keyCodes, f, m;
          for (f = 0, m = u.left.length; f < m; f++)
            a[u.left[f]] = [-1 * i, 0];
          for (f = 0, m = u.right.length; f < m; f++)
            a[u.right[f]] = [i, 0];
          for (f = 0, m = u.down.length; f < m; f++)
            a[u.down[f]] = [0, i];
          for (f = 0, m = u.up.length; f < m; f++)
            a[u.up[f]] = [0, -1 * i];
        },
        _setZoomDelta: function(i) {
          var a = this._zoomKeys = {}, u = this.keyCodes, f, m;
          for (f = 0, m = u.zoomIn.length; f < m; f++)
            a[u.zoomIn[f]] = i;
          for (f = 0, m = u.zoomOut.length; f < m; f++)
            a[u.zoomOut[f]] = -i;
        },
        _addHooks: function() {
          Y(document, "keydown", this._onKeyDown, this);
        },
        _removeHooks: function() {
          ft(document, "keydown", this._onKeyDown, this);
        },
        _onKeyDown: function(i) {
          if (!(i.altKey || i.ctrlKey || i.metaKey)) {
            var a = i.keyCode, u = this._map, f;
            if (a in this._panKeys) {
              if (!u._panAnim || !u._panAnim._inProgress)
                if (f = this._panKeys[a], i.shiftKey && (f = F(f).multiplyBy(3)), u.options.maxBounds && (f = u._limitOffset(F(f), u.options.maxBounds)), u.options.worldCopyJump) {
                  var m = u.wrapLatLng(u.unproject(u.project(u.getCenter()).add(f)));
                  u.panTo(m);
                } else
                  u.panBy(f);
            } else if (a in this._zoomKeys)
              u.setZoom(u.getZoom() + (i.shiftKey ? 3 : 1) * this._zoomKeys[a]);
            else if (a === 27 && u._popup && u._popup.options.closeOnEscapeKey)
              u.closePopup();
            else
              return;
            qe(i);
          }
        }
      });
      it.addInitHook("addHandler", "keyboard", Hr), it.mergeOptions({
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
      var Wr = de.extend({
        addHooks: function() {
          Y(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
        },
        removeHooks: function() {
          ft(this._map._container, "wheel", this._onWheelScroll, this);
        },
        _onWheelScroll: function(i) {
          var a = dr(i), u = this._map.options.wheelDebounceTime;
          this._delta += a, this._lastMousePos = this._map.mouseEventToContainerPoint(i), this._startTime || (this._startTime = +/* @__PURE__ */ new Date());
          var f = Math.max(u - (+/* @__PURE__ */ new Date() - this._startTime), 0);
          clearTimeout(this._timer), this._timer = setTimeout(l(this._performZoom, this), f), qe(i);
        },
        _performZoom: function() {
          var i = this._map, a = i.getZoom(), u = this._map.options.zoomSnap || 0;
          i._stop();
          var f = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), m = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(f)))) / Math.LN2, y = u ? Math.ceil(m / u) * u : m, w = i._limitZoom(a + (this._delta > 0 ? y : -y)) - a;
          this._delta = 0, this._startTime = null, w && (i.options.scrollWheelZoom === "center" ? i.setZoom(a + w) : i.setZoomAround(this._lastMousePos, a + w));
        }
      });
      it.addInitHook("addHandler", "scrollWheelZoom", Wr);
      var pc = 600;
      it.mergeOptions({
        // @section Touch interaction options
        // @option tapHold: Boolean
        // Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
        tapHold: W.touchNative && W.safari && W.mobile,
        // @option tapTolerance: Number = 15
        // The max number of pixels a user can shift his finger during touch
        // for it to be considered a valid tap.
        tapTolerance: 15
      });
      var Vr = de.extend({
        addHooks: function() {
          Y(this._map._container, "touchstart", this._onDown, this);
        },
        removeHooks: function() {
          ft(this._map._container, "touchstart", this._onDown, this);
        },
        _onDown: function(i) {
          if (clearTimeout(this._holdTimeout), i.touches.length === 1) {
            var a = i.touches[0];
            this._startPos = this._newPos = new H(a.clientX, a.clientY), this._holdTimeout = setTimeout(l(function() {
              this._cancel(), this._isTapValid() && (Y(document, "touchend", Bt), Y(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", a));
            }, this), pc), Y(document, "touchend touchcancel contextmenu", this._cancel, this), Y(document, "touchmove", this._onMove, this);
          }
        },
        _cancelClickPrevent: function i() {
          ft(document, "touchend", Bt), ft(document, "touchend touchcancel", i);
        },
        _cancel: function() {
          clearTimeout(this._holdTimeout), ft(document, "touchend touchcancel contextmenu", this._cancel, this), ft(document, "touchmove", this._onMove, this);
        },
        _onMove: function(i) {
          var a = i.touches[0];
          this._newPos = new H(a.clientX, a.clientY);
        },
        _isTapValid: function() {
          return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
        },
        _simulateEvent: function(i, a) {
          var u = new MouseEvent(i, {
            bubbles: !0,
            cancelable: !0,
            view: window,
            // detail: 1,
            screenX: a.screenX,
            screenY: a.screenY,
            clientX: a.clientX,
            clientY: a.clientY
            // button: 2,
            // buttons: 2
          });
          u._simulated = !0, a.target.dispatchEvent(u);
        }
      });
      it.addInitHook("addHandler", "tapHold", Vr), it.mergeOptions({
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
      var jr = de.extend({
        addHooks: function() {
          X(this._map._container, "leaflet-touch-zoom"), Y(this._map._container, "touchstart", this._onTouchStart, this);
        },
        removeHooks: function() {
          Pt(this._map._container, "leaflet-touch-zoom"), ft(this._map._container, "touchstart", this._onTouchStart, this);
        },
        _onTouchStart: function(i) {
          var a = this._map;
          if (!(!i.touches || i.touches.length !== 2 || a._animatingZoom || this._zooming)) {
            var u = a.mouseEventToContainerPoint(i.touches[0]), f = a.mouseEventToContainerPoint(i.touches[1]);
            this._centerPoint = a.getSize()._divideBy(2), this._startLatLng = a.containerPointToLatLng(this._centerPoint), a.options.touchZoom !== "center" && (this._pinchStartLatLng = a.containerPointToLatLng(u.add(f)._divideBy(2))), this._startDist = u.distanceTo(f), this._startZoom = a.getZoom(), this._moved = !1, this._zooming = !0, a._stop(), Y(document, "touchmove", this._onTouchMove, this), Y(document, "touchend touchcancel", this._onTouchEnd, this), Bt(i);
          }
        },
        _onTouchMove: function(i) {
          if (!(!i.touches || i.touches.length !== 2 || !this._zooming)) {
            var a = this._map, u = a.mouseEventToContainerPoint(i.touches[0]), f = a.mouseEventToContainerPoint(i.touches[1]), m = u.distanceTo(f) / this._startDist;
            if (this._zoom = a.getScaleZoom(m, this._startZoom), !a.options.bounceAtZoomLimits && (this._zoom < a.getMinZoom() && m < 1 || this._zoom > a.getMaxZoom() && m > 1) && (this._zoom = a._limitZoom(this._zoom)), a.options.touchZoom === "center") {
              if (this._center = this._startLatLng, m === 1)
                return;
            } else {
              var y = u._add(f)._divideBy(2)._subtract(this._centerPoint);
              if (m === 1 && y.x === 0 && y.y === 0)
                return;
              this._center = a.unproject(a.project(this._pinchStartLatLng, this._zoom).subtract(y), this._zoom);
            }
            this._moved || (a._moveStart(!0, !1), this._moved = !0), V(this._animRequest);
            var w = l(a._move, a, this._center, this._zoom, { pinch: !0, round: !1 }, void 0);
            this._animRequest = Z(w, this, !0), Bt(i);
          }
        },
        _onTouchEnd: function() {
          if (!this._moved || !this._zooming) {
            this._zooming = !1;
            return;
          }
          this._zooming = !1, V(this._animRequest), ft(document, "touchmove", this._onTouchMove, this), ft(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom));
        }
      });
      it.addInitHook("addHandler", "touchZoom", jr), it.BoxZoom = Fr, it.DoubleClickZoom = Nr, it.Drag = Zr, it.Keyboard = Hr, it.ScrollWheelZoom = Wr, it.TapHold = Vr, it.TouchZoom = jr, e.Bounds = K, e.Browser = W, e.CRS = Gt, e.Canvas = Dr, e.Circle = Qs, e.CircleMarker = Fn, e.Class = at, e.Control = se, e.DivIcon = Ar, e.DivOverlay = fe, e.DomEvent = Eh, e.DomUtil = Oh, e.Draggable = Ie, e.Evented = ct, e.FeatureGroup = ge, e.GeoJSON = ye, e.GridLayer = ji, e.Handler = de, e.Icon = gi, e.ImageOverlay = Vn, e.LatLng = J, e.LatLngBounds = vt, e.Layer = oe, e.LayerGroup = mi, e.LineUtil = Uh, e.Map = it, e.Marker = Rn, e.Mixin = Nh, e.Path = De, e.Point = H, e.PolyUtil = Zh, e.Polygon = vi, e.Polyline = ve, e.Popup = jn, e.PosAnimation = fr, e.Projection = Gh, e.Rectangle = Rr, e.Renderer = be, e.SVG = Gi, e.SVGOverlay = Or, e.TileLayer = bi, e.Tooltip = Un, e.Transformation = le, e.Util = Mt, e.VideoOverlay = Tr, e.bind = l, e.bounds = ht, e.canvas = zr, e.circle = tc, e.circleMarker = Qh, e.control = Hi, e.divIcon = hc, e.extend = r, e.featureGroup = Xh, e.geoJSON = Cr, e.geoJson = nc, e.gridLayer = cc, e.icon = Kh, e.imageOverlay = sc, e.latLng = U, e.latLngBounds = ot, e.layerGroup = $h, e.map = Ih, e.marker = Jh, e.point = F, e.polygon = ic, e.polyline = ec, e.popup = ac, e.rectangle = fc, e.setOptions = b, e.stamp = c, e.svg = Br, e.svgOverlay = rc, e.tileLayer = Er, e.tooltip = lc, e.transformation = he, e.version = s, e.videoOverlay = oc;
      var _c = window.L;
      e.noConflict = function() {
        return window.L = _c, this;
      }, window.L = e;
    });
  }(ls, ls.exports)), ls.exports;
}
var D_ = ph();
const et = /* @__PURE__ */ I_(D_);
var z_ = { exports: {} };
(function(n) {
  (function(t, e) {
    n.exports ? n.exports = e(ph()) : e(t.L);
  })(typeof self < "u" ? self : Jo, (t) => {
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
      ], l = o[0], h = {};
      for (const c of o)
        if (c[1] in document) {
          for (let d = 0; d < c.length; d++)
            h[l[d]] = c[d];
          return h;
        }
      return !1;
    })(), s = {
      change: e.fullscreenchange,
      error: e.fullscreenerror
    }, r = {
      request(o, l) {
        return new Promise((h, c) => {
          const d = (function() {
            this.off("change", d), h();
          }).bind(this);
          this.on("change", d), o = o || document.documentElement;
          const p = o[e.requestFullscreen](l);
          p instanceof Promise && p.then(d).catch(c);
        });
      },
      exit() {
        return new Promise((o, l) => {
          if (!this.isFullscreen) {
            o();
            return;
          }
          const h = (function() {
            this.off("change", h), o();
          }).bind(this);
          this.on("change", h);
          const c = document[e.exitFullscreen]();
          c instanceof Promise && c.then(h).catch(l);
        });
      },
      on(o, l) {
        const h = s[o];
        h && document.addEventListener(h, l, !1);
      },
      off(o, l) {
        const h = s[o];
        h && document.removeEventListener(h, l, !1);
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
        let l = "leaflet-control-zoom-fullscreen", h, c = "";
        return o.zoomControl && !this.options.forceSeparateButton ? h = o.zoomControl._container : h = t.DomUtil.create("div", "leaflet-bar"), this.options.content ? c = this.options.content : l += " fullscreen-icon", this._createButton(this.options.title, l, c, h, this.toggleFullScreen, this), this._map.fullscreenControl = this, this._map.on("enterFullscreen exitFullscreen", this._toggleState, this), h;
      },
      onRemove() {
        t.DomEvent.off(this.link, "click", t.DomEvent.stop).off(this.link, "click", this.toggleFullScreen, this), this._screenfull.isEnabled && (t.DomEvent.off(this._container, this._screenfull.nativeAPI.fullscreenchange, t.DomEvent.stop).off(this._container, this._screenfull.nativeAPI.fullscreenchange, this._handleFullscreenChange, this), t.DomEvent.off(document, this._screenfull.nativeAPI.fullscreenchange, t.DomEvent.stop).off(document, this._screenfull.nativeAPI.fullscreenchange, this._handleFullscreenChange, this));
      },
      _createButton(o, l, h, c, d, p) {
        return this.link = t.DomUtil.create("a", l, c), this.link.href = "#", this.link.title = o, this.link.innerHTML = h, this.link.setAttribute("role", "button"), this.link.setAttribute("aria-label", o), L.DomEvent.disableClickPropagation(c), t.DomEvent.on(this.link, "click", t.DomEvent.stop).on(this.link, "click", d, p), this._screenfull.isEnabled && (t.DomEvent.on(c, this._screenfull.nativeAPI.fullscreenchange, t.DomEvent.stop).on(c, this._screenfull.nativeAPI.fullscreenchange, this._handleFullscreenChange, p), t.DomEvent.on(document, this._screenfull.nativeAPI.fullscreenchange, t.DomEvent.stop).on(document, this._screenfull.nativeAPI.fullscreenchange, this._handleFullscreenChange, p)), this.link;
      },
      toggleFullScreen() {
        const o = this._map;
        o._exitFired = !1, o._isFullscreen ? (this._screenfull.isEnabled && !this.options.forcePseudoFullscreen ? this._screenfull.exit().then(() => o.invalidateSize()) : (t.DomUtil.removeClass(this.options.fullscreenElement ? this.options.fullscreenElement : o._container, "leaflet-pseudo-fullscreen"), o.invalidateSize()), o.fire("exitFullscreen"), o._exitFired = !0, o._isFullscreen = !1) : (this._screenfull.isEnabled && !this.options.forcePseudoFullscreen ? this._screenfull.request(this.options.fullscreenElement ? this.options.fullscreenElement : o._container).then(() => o.invalidateSize()) : (t.DomUtil.addClass(this.options.fullscreenElement ? this.options.fullscreenElement : o._container, "leaflet-pseudo-fullscreen"), o.invalidateSize()), o.fire("enterFullscreen"), o._isFullscreen = !0);
      },
      _toggleState() {
        this.link.title = this._map._isFullscreen ? this.options.title : this.options.titleCancel, this._map._isFullscreen ? L.DomUtil.removeClass(this.link, "leaflet-fullscreen-on") : L.DomUtil.addClass(this.link, "leaflet-fullscreen-on");
      },
      _handleFullscreenChange(o) {
        const l = this._map;
        o.target === l.getContainer() && !this._screenfull.isFullscreen && !l._exitFired && (this._screenfull.exit().then(() => l.invalidateSize()), l.fire("exitFullscreen"), l._exitFired = !0, l._isFullscreen = !1);
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
})(z_);
var gl = { exports: {} };
(function(n, t) {
  (function(e, s) {
    s(t);
  })(Jo, function(e) {
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
        var l = L.DomUtil.TRANSITION && this.options.animate;
        L.extend(this, l ? this._withAnimation : this._noAnimation), this._markerCluster = l ? L.MarkerCluster : L.MarkerClusterNonAnimated;
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
        var l = o, h = this._zoom;
        if (o.__parent)
          for (; l.__parent._zoom >= h; )
            l = l.__parent;
        return this._currentShownBounds.contains(l.getLatLng()) && (this.options.animateAddingMarkers ? this._animationAddLayer(o, l) : this._animationAddLayerNonAnimated(o, l)), this;
      },
      removeLayer: function(o) {
        return o instanceof L.LayerGroup ? this.removeLayers([o]) : o.getLatLng ? this._map ? o.__parent ? (this._unspiderfy && (this._unspiderfy(), this._unspiderfyLayer(o)), this._removeLayer(o, !0), this.fire("layerremove", { layer: o }), this._topClusterLevel._recalculateBounds(), this._refreshClustersIcons(), o.off(this._childMarkerEventHandlers, this), this._featureGroup.hasLayer(o) && (this._featureGroup.removeLayer(o), o.clusterShow && o.clusterShow()), this) : this : (!this._arraySplice(this._needsClustering, o) && this.hasLayer(o) && this._needsRemoving.push({ layer: o, latlng: o._latlng }), this.fire("layerremove", { layer: o }), this) : (this._nonPointGroup.removeLayer(o), this.fire("layerremove", { layer: o }), this);
      },
      //Takes an array of markers and adds them in bulk
      addLayers: function(o, l) {
        if (!L.Util.isArray(o))
          return this.addLayer(o);
        var h = this._featureGroup, c = this._nonPointGroup, d = this.options.chunkedLoading, p = this.options.chunkInterval, _ = this.options.chunkProgress, g = o.length, v = 0, x = !0, b;
        if (this._map) {
          var M = (/* @__PURE__ */ new Date()).getTime(), P = L.bind(function() {
            var O = (/* @__PURE__ */ new Date()).getTime();
            for (this._map && this._unspiderfy && this._unspiderfy(); v < g; v++) {
              if (d && v % 200 === 0) {
                var A = (/* @__PURE__ */ new Date()).getTime() - O;
                if (A > p)
                  break;
              }
              if (b = o[v], b instanceof L.LayerGroup) {
                x && (o = o.slice(), x = !1), this._extractNonGroupLayers(b, o), g = o.length;
                continue;
              }
              if (!b.getLatLng) {
                c.addLayer(b), l || this.fire("layeradd", { layer: b });
                continue;
              }
              if (!this.hasLayer(b) && (this._addLayer(b, this._maxZoom), l || this.fire("layeradd", { layer: b }), b.__parent && b.__parent.getChildCount() === 2)) {
                var T = b.__parent.getAllChildMarkers(), I = T[0] === b ? T[1] : T[0];
                h.removeLayer(I);
              }
            }
            _ && _(v, g, (/* @__PURE__ */ new Date()).getTime() - M), v === g ? (this._topClusterLevel._recalculateBounds(), this._refreshClustersIcons(), this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds)) : setTimeout(P, this.options.chunkDelay);
          }, this);
          P();
        } else
          for (var S = this._needsClustering; v < g; v++) {
            if (b = o[v], b instanceof L.LayerGroup) {
              x && (o = o.slice(), x = !1), this._extractNonGroupLayers(b, o), g = o.length;
              continue;
            }
            if (!b.getLatLng) {
              c.addLayer(b);
              continue;
            }
            this.hasLayer(b) || S.push(b);
          }
        return this;
      },
      //Takes an array of markers and removes them in bulk
      removeLayers: function(o) {
        var l, h, c = o.length, d = this._featureGroup, p = this._nonPointGroup, _ = !0;
        if (!this._map) {
          for (l = 0; l < c; l++) {
            if (h = o[l], h instanceof L.LayerGroup) {
              _ && (o = o.slice(), _ = !1), this._extractNonGroupLayers(h, o), c = o.length;
              continue;
            }
            this._arraySplice(this._needsClustering, h), p.removeLayer(h), this.hasLayer(h) && this._needsRemoving.push({ layer: h, latlng: h._latlng }), this.fire("layerremove", { layer: h });
          }
          return this;
        }
        if (this._unspiderfy) {
          this._unspiderfy();
          var g = o.slice(), v = c;
          for (l = 0; l < v; l++) {
            if (h = g[l], h instanceof L.LayerGroup) {
              this._extractNonGroupLayers(h, g), v = g.length;
              continue;
            }
            this._unspiderfyLayer(h);
          }
        }
        for (l = 0; l < c; l++) {
          if (h = o[l], h instanceof L.LayerGroup) {
            _ && (o = o.slice(), _ = !1), this._extractNonGroupLayers(h, o), c = o.length;
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
        for (var l = this._needsClustering.length - 1; l >= 0; l--)
          o.extend(this._needsClustering[l].getLatLng());
        return o.extend(this._nonPointGroup.getBounds()), o;
      },
      //Overrides LayerGroup.eachLayer
      eachLayer: function(o, l) {
        var h = this._needsClustering.slice(), c = this._needsRemoving, d, p, _;
        for (this._topClusterLevel && this._topClusterLevel.getAllChildMarkers(h), p = h.length - 1; p >= 0; p--) {
          for (d = !0, _ = c.length - 1; _ >= 0; _--)
            if (c[_].layer === h[p]) {
              d = !1;
              break;
            }
          d && o.call(l, h[p]);
        }
        this._nonPointGroup.eachLayer(o, l);
      },
      //Overrides LayerGroup.getLayers
      getLayers: function() {
        var o = [];
        return this.eachLayer(function(l) {
          o.push(l);
        }), o;
      },
      //Overrides LayerGroup.getLayer, WARNING: Really bad performance
      getLayer: function(o) {
        var l = null;
        return o = parseInt(o, 10), this.eachLayer(function(h) {
          L.stamp(h) === o && (l = h);
        }), l;
      },
      //Returns true if the given layer is in this MarkerClusterGroup
      hasLayer: function(o) {
        if (!o)
          return !1;
        var l, h = this._needsClustering;
        for (l = h.length - 1; l >= 0; l--)
          if (h[l] === o)
            return !0;
        for (h = this._needsRemoving, l = h.length - 1; l >= 0; l--)
          if (h[l].layer === o)
            return !1;
        return !!(o.__parent && o.__parent._group === this) || this._nonPointGroup.hasLayer(o);
      },
      //Zoom down to show the given layer (spiderfying if necessary) then calls the callback
      zoomToShowLayer: function(o, l) {
        var h = this._map;
        typeof l != "function" && (l = function() {
        });
        var c = function() {
          (h.hasLayer(o) || h.hasLayer(o.__parent)) && !this._inZoomAnimation && (this._map.off("moveend", c, this), this.off("animationend", c, this), h.hasLayer(o) ? l() : o.__parent._icon && (this.once("spiderfied", l, this), o.__parent.spiderfy()));
        };
        o._icon && this._map.getBounds().contains(o.getLatLng()) ? l() : o.__parent._zoom < Math.round(this._map._zoom) ? (this._map.on("moveend", c, this), this._map.panTo(o.getLatLng())) : (this._map.on("moveend", c, this), this.on("animationend", c, this), o.__parent.zoomToBounds());
      },
      //Overrides FeatureGroup.onAdd
      onAdd: function(o) {
        this._map = o;
        var l, h, c;
        if (!isFinite(this._map.getMaxZoom()))
          throw "Map has no maxZoom specified";
        for (this._featureGroup.addTo(o), this._nonPointGroup.addTo(o), this._gridClusters || this._generateInitialClusters(), this._maxLat = o.options.crs.projection.MAX_LATITUDE, l = 0, h = this._needsRemoving.length; l < h; l++)
          c = this._needsRemoving[l], c.newlatlng = c.layer._latlng, c.layer._latlng = c.latlng;
        for (l = 0, h = this._needsRemoving.length; l < h; l++)
          c = this._needsRemoving[l], this._removeLayer(c.layer, !0), c.layer._latlng = c.newlatlng;
        this._needsRemoving = [], this._zoom = Math.round(this._map._zoom), this._currentShownBounds = this._getExpandedVisibleBounds(), this._map.on("zoomend", this._zoomEnd, this), this._map.on("moveend", this._moveEnd, this), this._spiderfierOnAdd && this._spiderfierOnAdd(), this._bindEvents(), h = this._needsClustering, this._needsClustering = [], this.addLayers(h, !0);
      },
      //Overrides FeatureGroup.onRemove
      onRemove: function(o) {
        o.off("zoomend", this._zoomEnd, this), o.off("moveend", this._moveEnd, this), this._unbindEvents(), this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", ""), this._spiderfierOnRemove && this._spiderfierOnRemove(), delete this._maxLat, this._hideCoverage(), this._featureGroup.remove(), this._nonPointGroup.remove(), this._featureGroup.clearLayers(), this._map = null;
      },
      getVisibleParent: function(o) {
        for (var l = o; l && !l._icon; )
          l = l.__parent;
        return l || null;
      },
      //Remove the given object from the given array
      _arraySplice: function(o, l) {
        for (var h = o.length - 1; h >= 0; h--)
          if (o[h] === l)
            return o.splice(h, 1), !0;
      },
      /**
       * Removes a marker from all _gridUnclustered zoom levels, starting at the supplied zoom.
       * @param marker to be removed from _gridUnclustered.
       * @param z integer bottom start zoom level (included)
       * @private
       */
      _removeFromGridUnclustered: function(o, l) {
        for (var h = this._map, c = this._gridUnclustered, d = Math.floor(this._map.getMinZoom()); l >= d && c[l].removeObject(o, h.project(o.getLatLng(), l)); l--)
          ;
      },
      _childMarkerDragStart: function(o) {
        o.target.__dragStart = o.target._latlng;
      },
      _childMarkerMoved: function(o) {
        if (!this._ignoreMove && !o.target.__dragStart) {
          var l = o.target._popup && o.target._popup.isOpen();
          this._moveChild(o.target, o.oldLatLng, o.latlng), l && o.target.openPopup();
        }
      },
      _moveChild: function(o, l, h) {
        o._latlng = l, this.removeLayer(o), o._latlng = h, this.addLayer(o);
      },
      _childMarkerDragEnd: function(o) {
        var l = o.target.__dragStart;
        delete o.target.__dragStart, l && this._moveChild(o.target, l, o.target._latlng);
      },
      //Internal function for removing a marker from everything.
      //dontUpdateMap: set to true if you will handle updating the map manually (for bulk functions)
      _removeLayer: function(o, l, h) {
        var c = this._gridClusters, d = this._gridUnclustered, p = this._featureGroup, _ = this._map, g = Math.floor(this._map.getMinZoom());
        l && this._removeFromGridUnclustered(o, this._maxZoom);
        var v = o.__parent, x = v._markers, b;
        for (this._arraySplice(x, o); v && (v._childCount--, v._boundsNeedUpdate = !0, !(v._zoom < g)); )
          l && v._childCount <= 1 ? (b = v._markers[0] === o ? v._markers[1] : v._markers[0], c[v._zoom].removeObject(v, _.project(v._cLatLng, v._zoom)), d[v._zoom].addObject(b, _.project(b.getLatLng(), v._zoom)), this._arraySplice(v.__parent._childClusters, v), v.__parent._markers.push(b), b.__parent = v.__parent, v._icon && (p.removeLayer(v), h || p.addLayer(b))) : v._iconNeedsUpdate = !0, v = v.__parent;
        delete o.__parent;
      },
      _isOrIsParent: function(o, l) {
        for (; l; ) {
          if (o === l)
            return !0;
          l = l.parentNode;
        }
        return !1;
      },
      //Override L.Evented.fire
      fire: function(o, l, h) {
        if (l && l.layer instanceof L.MarkerCluster) {
          if (l.originalEvent && this._isOrIsParent(l.layer._icon, l.originalEvent.relatedTarget))
            return;
          o = "cluster" + o;
        }
        L.FeatureGroup.prototype.fire.call(this, o, l, h);
      },
      //Override L.Evented.listens
      listens: function(o, l) {
        return L.FeatureGroup.prototype.listens.call(this, o, l) || L.FeatureGroup.prototype.listens.call(this, "cluster" + o, l);
      },
      //Default functionality
      _defaultIconCreateFunction: function(o) {
        var l = o.getChildCount(), h = " marker-cluster-";
        return l < 10 ? h += "small" : l < 100 ? h += "medium" : h += "large", new L.DivIcon({ html: "<div><span>" + l + "</span></div>", className: "marker-cluster" + h, iconSize: new L.Point(40, 40) });
      },
      _bindEvents: function() {
        var o = this._map, l = this.options.spiderfyOnMaxZoom, h = this.options.showCoverageOnHover, c = this.options.zoomToBoundsOnClick, d = this.options.spiderfyOnEveryZoom;
        (l || c || d) && this.on("clusterclick clusterkeypress", this._zoomOrSpiderfy, this), h && (this.on("clustermouseover", this._showCoverage, this), this.on("clustermouseout", this._hideCoverage, this), o.on("zoomend", this._hideCoverage, this));
      },
      _zoomOrSpiderfy: function(o) {
        var l = o.layer, h = l;
        if (!(o.type === "clusterkeypress" && o.originalEvent && o.originalEvent.keyCode !== 13)) {
          for (; h._childClusters.length === 1; )
            h = h._childClusters[0];
          h._zoom === this._maxZoom && h._childCount === l._childCount && this.options.spiderfyOnMaxZoom ? l.spiderfy() : this.options.zoomToBoundsOnClick && l.zoomToBounds(), this.options.spiderfyOnEveryZoom && l.spiderfy(), o.originalEvent && o.originalEvent.keyCode === 13 && this._map._container.focus();
        }
      },
      _showCoverage: function(o) {
        var l = this._map;
        this._inZoomAnimation || (this._shownPolygon && l.removeLayer(this._shownPolygon), o.layer.getChildCount() > 2 && o.layer !== this._spiderfied && (this._shownPolygon = new L.Polygon(o.layer.getConvexHull(), this.options.polygonOptions), l.addLayer(this._shownPolygon)));
      },
      _hideCoverage: function() {
        this._shownPolygon && (this._map.removeLayer(this._shownPolygon), this._shownPolygon = null);
      },
      _unbindEvents: function() {
        var o = this.options.spiderfyOnMaxZoom, l = this.options.showCoverageOnHover, h = this.options.zoomToBoundsOnClick, c = this.options.spiderfyOnEveryZoom, d = this._map;
        (o || h || c) && this.off("clusterclick clusterkeypress", this._zoomOrSpiderfy, this), l && (this.off("clustermouseover", this._showCoverage, this), this.off("clustermouseout", this._hideCoverage, this), d.off("zoomend", this._hideCoverage, this));
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
        var o = Math.ceil(this._map.getMaxZoom()), l = Math.floor(this._map.getMinZoom()), h = this.options.maxClusterRadius, c = h;
        typeof h != "function" && (c = function() {
          return h;
        }), this.options.disableClusteringAtZoom !== null && (o = this.options.disableClusteringAtZoom - 1), this._maxZoom = o, this._gridClusters = {}, this._gridUnclustered = {};
        for (var d = o; d >= l; d--)
          this._gridClusters[d] = new L.DistanceGrid(c(d)), this._gridUnclustered[d] = new L.DistanceGrid(c(d));
        this._topClusterLevel = new this._markerCluster(this, l - 1);
      },
      //Zoom: Zoom to start adding at (Pass this._maxZoom to start at the bottom)
      _addLayer: function(o, l) {
        var h = this._gridClusters, c = this._gridUnclustered, d = Math.floor(this._map.getMinZoom()), p, _;
        for (this.options.singleMarkerMode && this._overrideMarkerIcon(o), o.on(this._childMarkerEventHandlers, this); l >= d; l--) {
          p = this._map.project(o.getLatLng(), l);
          var g = h[l].getNearObject(p);
          if (g) {
            g._addChild(o), o.__parent = g;
            return;
          }
          if (g = c[l].getNearObject(p), g) {
            var v = g.__parent;
            v && this._removeLayer(g, !1);
            var x = new this._markerCluster(this, l, g, o);
            h[l].addObject(x, this._map.project(x._cLatLng, l)), g.__parent = x, o.__parent = x;
            var b = x;
            for (_ = l - 1; _ > v._zoom; _--)
              b = new this._markerCluster(this, _, b), h[_].addObject(b, this._map.project(g.getLatLng(), _));
            v._addChild(b), this._removeFromGridUnclustered(g, l);
            return;
          }
          c[l].addObject(o, p);
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
        var l = this._maxLat;
        return l !== void 0 && (o.getNorth() >= l && (o._northEast.lat = 1 / 0), o.getSouth() <= -l && (o._southWest.lat = -1 / 0)), o;
      },
      //Shared animation code
      _animationAddLayerNonAnimated: function(o, l) {
        if (l === o)
          this._featureGroup.addLayer(o);
        else if (l._childCount === 2) {
          l._addToMap();
          var h = l.getAllChildMarkers();
          this._featureGroup.removeLayer(h[0]), this._featureGroup.removeLayer(h[1]);
        } else
          l._updateIcon();
      },
      /**
       * Extracts individual (i.e. non-group) layers from a Layer Group.
       * @param group to extract layers from.
       * @param output {Array} in which to store the extracted layers.
       * @returns {*|Array}
       * @private
       */
      _extractNonGroupLayers: function(o, l) {
        var h = o.getLayers(), c = 0, d;
        for (l = l || []; c < h.length; c++) {
          if (d = h[c], d instanceof L.LayerGroup) {
            this._extractNonGroupLayers(d, l);
            continue;
          }
          l.push(d);
        }
        return l;
      },
      /**
       * Implements the singleMarkerMode option.
       * @param layer Marker to re-style using the Clusters iconCreateFunction.
       * @returns {L.Icon} The newly created icon.
       * @private
       */
      _overrideMarkerIcon: function(o) {
        var l = o.options.icon = this.options.iconCreateFunction({
          getChildCount: function() {
            return 1;
          },
          getAllChildMarkers: function() {
            return [o];
          }
        });
        return l;
      }
    });
    L.MarkerClusterGroup.include({
      _mapBoundsInfinite: new L.LatLngBounds(new L.LatLng(-1 / 0, -1 / 0), new L.LatLng(1 / 0, 1 / 0))
    }), L.MarkerClusterGroup.include({
      _noAnimation: {
        //Non Animated versions of everything
        _animationStart: function() {
        },
        _animationZoomIn: function(o, l) {
          this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), o), this._topClusterLevel._recursivelyAddChildrenToMap(null, l, this._getExpandedVisibleBounds()), this.fire("animationend");
        },
        _animationZoomOut: function(o, l) {
          this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), o), this._topClusterLevel._recursivelyAddChildrenToMap(null, l, this._getExpandedVisibleBounds()), this.fire("animationend");
        },
        _animationAddLayer: function(o, l) {
          this._animationAddLayerNonAnimated(o, l);
        }
      },
      _withAnimation: {
        //Animated versions here
        _animationStart: function() {
          this._map._mapPane.className += " leaflet-cluster-anim", this._inZoomAnimation++;
        },
        _animationZoomIn: function(o, l) {
          var h = this._getExpandedVisibleBounds(), c = this._featureGroup, d = Math.floor(this._map.getMinZoom()), p;
          this._ignoreMove = !0, this._topClusterLevel._recursively(h, o, d, function(_) {
            var g = _._latlng, v = _._markers, x;
            for (h.contains(g) || (g = null), _._isSingleParent() && o + 1 === l ? (c.removeLayer(_), _._recursivelyAddChildrenToMap(null, l, h)) : (_.clusterHide(), _._recursivelyAddChildrenToMap(g, l, h)), p = v.length - 1; p >= 0; p--)
              x = v[p], h.contains(x._latlng) || c.removeLayer(x);
          }), this._forceLayout(), this._topClusterLevel._recursivelyBecomeVisible(h, l), c.eachLayer(function(_) {
            !(_ instanceof L.MarkerCluster) && _._icon && _.clusterShow();
          }), this._topClusterLevel._recursively(h, o, l, function(_) {
            _._recursivelyRestoreChildPositions(l);
          }), this._ignoreMove = !1, this._enqueue(function() {
            this._topClusterLevel._recursively(h, o, d, function(_) {
              c.removeLayer(_), _.clusterShow();
            }), this._animationEnd();
          });
        },
        _animationZoomOut: function(o, l) {
          this._animationZoomOutSingle(this._topClusterLevel, o - 1, l), this._topClusterLevel._recursivelyAddChildrenToMap(null, l, this._getExpandedVisibleBounds()), this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), o, this._getExpandedVisibleBounds());
        },
        _animationAddLayer: function(o, l) {
          var h = this, c = this._featureGroup;
          c.addLayer(o), l !== o && (l._childCount > 2 ? (l._updateIcon(), this._forceLayout(), this._animationStart(), o._setPos(this._map.latLngToLayerPoint(l.getLatLng())), o.clusterHide(), this._enqueue(function() {
            c.removeLayer(o), o.clusterShow(), h._animationEnd();
          })) : (this._forceLayout(), h._animationStart(), h._animationZoomOutSingle(l, this._map.getMaxZoom(), this._zoom)));
        }
      },
      // Private methods for animated versions.
      _animationZoomOutSingle: function(o, l, h) {
        var c = this._getExpandedVisibleBounds(), d = Math.floor(this._map.getMinZoom());
        o._recursivelyAnimateChildrenInAndAddSelfToMap(c, d, l + 1, h);
        var p = this;
        this._forceLayout(), o._recursivelyBecomeVisible(c, h), this._enqueue(function() {
          if (o._childCount === 1) {
            var _ = o._markers[0];
            this._ignoreMove = !0, _.setLatLng(_.getLatLng()), this._ignoreMove = !1, _.clusterShow && _.clusterShow();
          } else
            o._recursively(c, h, d, function(g) {
              g._recursivelyRemoveChildrenFromMap(c, d, l + 1);
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
      initialize: function(o, l, h, c) {
        L.Marker.prototype.initialize.call(
          this,
          h ? h._cLatLng || h.getLatLng() : new L.LatLng(0, 0),
          { icon: this, pane: o.options.clusterPane }
        ), this._group = o, this._zoom = l, this._markers = [], this._childClusters = [], this._childCount = 0, this._iconNeedsUpdate = !0, this._boundsNeedUpdate = !0, this._bounds = new L.LatLngBounds(), h && this._addChild(h), c && this._addChild(c);
      },
      //Recursively retrieve all child markers of this cluster
      getAllChildMarkers: function(o, l) {
        o = o || [];
        for (var h = this._childClusters.length - 1; h >= 0; h--)
          this._childClusters[h].getAllChildMarkers(o, l);
        for (var c = this._markers.length - 1; c >= 0; c--)
          l && this._markers[c].__dragStart || o.push(this._markers[c]);
        return o;
      },
      //Returns the count of how many child markers we have
      getChildCount: function() {
        return this._childCount;
      },
      //Zoom to the minimum of showing all of the child markers, or the extents of this cluster
      zoomToBounds: function(o) {
        for (var l = this._childClusters.slice(), h = this._group._map, c = h.getBoundsZoom(this._bounds), d = this._zoom + 1, p = h.getZoom(), _; l.length > 0 && c > d; ) {
          d++;
          var g = [];
          for (_ = 0; _ < l.length; _++)
            g = g.concat(l[_]._childClusters);
          l = g;
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
      _addChild: function(o, l) {
        this._iconNeedsUpdate = !0, this._boundsNeedUpdate = !0, this._setClusterCenter(o), o instanceof L.MarkerCluster ? (l || (this._childClusters.push(o), o.__parent = this), this._childCount += o._childCount) : (l || this._markers.push(o), this._childCount++), this.__parent && this.__parent._addChild(o, !0);
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
        var o = this._markers, l = this._childClusters, h = 0, c = 0, d = this._childCount, p, _, g, v;
        if (d !== 0) {
          for (this._resetBounds(), p = 0; p < o.length; p++)
            g = o[p]._latlng, this._bounds.extend(g), h += g.lat, c += g.lng;
          for (p = 0; p < l.length; p++)
            _ = l[p], _._boundsNeedUpdate && _._recalculateBounds(), this._bounds.extend(_._bounds), g = _._wLatLng, v = _._childCount, h += g.lat * v, c += g.lng * v;
          this._latlng = this._wLatLng = new L.LatLng(h / d, c / d), this._boundsNeedUpdate = !1;
        }
      },
      //Set our markers position as given and add it to the map
      _addToMap: function(o) {
        o && (this._backupLatlng = this._latlng, this.setLatLng(o)), this._group._featureGroup.addLayer(this);
      },
      _recursivelyAnimateChildrenIn: function(o, l, h) {
        this._recursively(
          o,
          this._group._map.getMinZoom(),
          h - 1,
          function(c) {
            var d = c._markers, p, _;
            for (p = d.length - 1; p >= 0; p--)
              _ = d[p], _._icon && (_._setPos(l), _.clusterHide());
          },
          function(c) {
            var d = c._childClusters, p, _;
            for (p = d.length - 1; p >= 0; p--)
              _ = d[p], _._icon && (_._setPos(l), _.clusterHide());
          }
        );
      },
      _recursivelyAnimateChildrenInAndAddSelfToMap: function(o, l, h, c) {
        this._recursively(
          o,
          c,
          l,
          function(d) {
            d._recursivelyAnimateChildrenIn(o, d._group._map.latLngToLayerPoint(d.getLatLng()).round(), h), d._isSingleParent() && h - 1 === c ? (d.clusterShow(), d._recursivelyRemoveChildrenFromMap(o, l, h)) : d.clusterHide(), d._addToMap();
          }
        );
      },
      _recursivelyBecomeVisible: function(o, l) {
        this._recursively(o, this._group._map.getMinZoom(), l, null, function(h) {
          h.clusterShow();
        });
      },
      _recursivelyAddChildrenToMap: function(o, l, h) {
        this._recursively(
          h,
          this._group._map.getMinZoom() - 1,
          l,
          function(c) {
            if (l !== c._zoom)
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
        for (var l = this._markers.length - 1; l >= 0; l--) {
          var h = this._markers[l];
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
      _recursivelyRemoveChildrenFromMap: function(o, l, h, c) {
        var d, p;
        this._recursively(
          o,
          l - 1,
          h - 1,
          function(_) {
            for (p = _._markers.length - 1; p >= 0; p--)
              d = _._markers[p], (!c || !c.contains(d._latlng)) && (_._group._featureGroup.removeLayer(d), d.clusterShow && d.clusterShow());
          },
          function(_) {
            for (p = _._childClusters.length - 1; p >= 0; p--)
              d = _._childClusters[p], (!c || !c.contains(d._latlng)) && (_._group._featureGroup.removeLayer(d), d.clusterShow && d.clusterShow());
          }
        );
      },
      //Run the given functions recursively to this and child clusters
      // boundsToApplyTo: a L.LatLngBounds representing the bounds of what clusters to recurse in to
      // zoomLevelToStart: zoom level to start running functions (inclusive)
      // zoomLevelToStop: zoom level to stop running functions (inclusive)
      // runAtEveryLevel: function that takes an L.MarkerCluster as an argument that should be applied on every level
      // runAtBottomLevel: function that takes an L.MarkerCluster as an argument that should be applied at only the bottom level
      _recursively: function(o, l, h, c, d) {
        var p = this._childClusters, _ = this._zoom, g, v;
        if (l <= _ && (c && c(this), d && _ === h && d(this)), _ < l || _ < h)
          for (g = p.length - 1; g >= 0; g--)
            v = p[g], v._boundsNeedUpdate && v._recalculateBounds(), o.intersects(v._bounds) && v._recursively(o, l, h, c, d);
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
      addObject: function(o, l) {
        var h = this._getCoord(l.x), c = this._getCoord(l.y), d = this._grid, p = d[c] = d[c] || {}, _ = p[h] = p[h] || [], g = L.Util.stamp(o);
        this._objectPoint[g] = l, _.push(o);
      },
      updateObject: function(o, l) {
        this.removeObject(o), this.addObject(o, l);
      },
      //Returns true if the object was found
      removeObject: function(o, l) {
        var h = this._getCoord(l.x), c = this._getCoord(l.y), d = this._grid, p = d[c] = d[c] || {}, _ = p[h] = p[h] || [], g, v;
        for (delete this._objectPoint[L.Util.stamp(o)], g = 0, v = _.length; g < v; g++)
          if (_[g] === o)
            return _.splice(g, 1), v === 1 && delete p[h], !0;
      },
      eachObject: function(o, l) {
        var h, c, d, p, _, g, v, x = this._grid;
        for (h in x) {
          _ = x[h];
          for (c in _)
            for (g = _[c], d = 0, p = g.length; d < p; d++)
              v = o.call(l, g[d]), v && (d--, p--);
        }
      },
      getNearObject: function(o) {
        var l = this._getCoord(o.x), h = this._getCoord(o.y), c, d, p, _, g, v, x, b, M = this._objectPoint, P = this._sqCellSize, S = null;
        for (c = h - 1; c <= h + 1; c++)
          if (_ = this._grid[c], _) {
            for (d = l - 1; d <= l + 1; d++)
              if (g = _[d], g)
                for (p = 0, v = g.length; p < v; p++)
                  x = g[p], b = this._sqDist(M[L.Util.stamp(x)], o), (b < P || b <= P && S === null) && (P = b, S = x);
          }
        return S;
      },
      _getCoord: function(o) {
        var l = Math.floor(o / this._cellSize);
        return isFinite(l) ? l : o;
      },
      _sqDist: function(o, l) {
        var h = l.x - o.x, c = l.y - o.y;
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
        getDistant: function(o, l) {
          var h = l[1].lat - l[0].lat, c = l[0].lng - l[1].lng;
          return c * (o.lat - l[0].lat) + h * (o.lng - l[0].lng);
        },
        /*
         * @param {Array} baseLine a two-element array of latlng objects
         *   representing the baseline to project from
         * @param {Array} latLngs an array of latlng objects
         * @returns {Object} the maximum point and all new points to stay
         *   in consideration for the hull.
         */
        findMostDistantPointFromBaseLine: function(o, l) {
          var h = 0, c = null, d = [], p, _, g;
          for (p = l.length - 1; p >= 0; p--) {
            if (_ = l[p], g = this.getDistant(_, o), g > 0)
              d.push(_);
            else
              continue;
            g > h && (h = g, c = _);
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
        buildConvexHull: function(o, l) {
          var h = [], c = this.findMostDistantPointFromBaseLine(o, l);
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
          var l = !1, h = !1, c = !1, d = !1, p = null, _ = null, g = null, v = null, x = null, b = null, M;
          for (M = o.length - 1; M >= 0; M--) {
            var P = o[M];
            (l === !1 || P.lat > l) && (p = P, l = P.lat), (h === !1 || P.lat < h) && (_ = P, h = P.lat), (c === !1 || P.lng > c) && (g = P, c = P.lng), (d === !1 || P.lng < d) && (v = P, d = P.lng);
          }
          h !== l ? (b = _, x = p) : (b = v, x = g);
          var S = [].concat(
            this.buildConvexHull([b, x], o),
            this.buildConvexHull([x, b], o)
          );
          return S;
        }
      };
    }(), L.MarkerCluster.include({
      getConvexHull: function() {
        var o = this.getAllChildMarkers(), l = [], h, c;
        for (c = o.length - 1; c >= 0; c--)
          h = o[c].getLatLng(), l.push(h);
        return L.QuickHull.getConvexHull(l);
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
          var o = this.getAllChildMarkers(null, !0), l = this._group, h = l._map, c = h.latLngToLayerPoint(this._latlng), d;
          this._group._unspiderfy(), this._group._spiderfied = this, this._group.options.spiderfyShapePositions ? d = this._group.options.spiderfyShapePositions(o.length, c) : o.length >= this._circleSpiralSwitchover ? d = this._generatePointsSpiral(o.length, c) : (c.y += 10, d = this._generatePointsCircle(o.length, c)), this._animationSpiderfy(o, d);
        }
      },
      unspiderfy: function(o) {
        this._group._inZoomAnimation || (this._animationUnspiderfy(o), this._group._spiderfied = null);
      },
      _generatePointsCircle: function(o, l) {
        var h = this._group.options.spiderfyDistanceMultiplier * this._circleFootSeparation * (2 + o), c = h / this._2PI, d = this._2PI / o, p = [], _, g;
        for (c = Math.max(c, 35), p.length = o, _ = 0; _ < o; _++)
          g = this._circleStartAngle + _ * d, p[_] = new L.Point(l.x + c * Math.cos(g), l.y + c * Math.sin(g))._round();
        return p;
      },
      _generatePointsSpiral: function(o, l) {
        var h = this._group.options.spiderfyDistanceMultiplier, c = h * this._spiralLengthStart, d = h * this._spiralFootSeparation, p = h * this._spiralLengthFactor * this._2PI, _ = 0, g = [], v;
        for (g.length = o, v = o; v >= 0; v--)
          v < o && (g[v] = new L.Point(l.x + c * Math.cos(_), l.y + c * Math.sin(_))._round()), _ += d / c + v * 5e-4, c += p / _;
        return g;
      },
      _noanimationUnspiderfy: function() {
        var o = this._group, l = o._map, h = o._featureGroup, c = this.getAllChildMarkers(null, !0), d, p;
        for (o._ignoreMove = !0, this.setOpacity(1), p = c.length - 1; p >= 0; p--)
          d = c[p], h.removeLayer(d), d._preSpiderfyLatlng && (d.setLatLng(d._preSpiderfyLatlng), delete d._preSpiderfyLatlng), d.setZIndexOffset && d.setZIndexOffset(0), d._spiderLeg && (l.removeLayer(d._spiderLeg), delete d._spiderLeg);
        o.fire("unspiderfied", {
          cluster: this,
          markers: c
        }), o._ignoreMove = !1, o._spiderfied = null;
      }
    }), L.MarkerClusterNonAnimated = L.MarkerCluster.extend({
      _animationSpiderfy: function(o, l) {
        var h = this._group, c = h._map, d = h._featureGroup, p = this._group.options.spiderLegPolylineOptions, _, g, v, x;
        for (h._ignoreMove = !0, _ = 0; _ < o.length; _++)
          x = c.layerPointToLatLng(l[_]), g = o[_], v = new L.Polyline([this._latlng, x], p), c.addLayer(v), g._spiderLeg = v, g._preSpiderfyLatlng = g._latlng, g.setLatLng(x), g.setZIndexOffset && g.setZIndexOffset(1e6), d.addLayer(g);
        this.setOpacity(0.3), h._ignoreMove = !1, h.fire("spiderfied", {
          cluster: this,
          markers: o
        });
      },
      _animationUnspiderfy: function() {
        this._noanimationUnspiderfy();
      }
    }), L.MarkerCluster.include({
      _animationSpiderfy: function(o, l) {
        var h = this, c = this._group, d = c._map, p = c._featureGroup, _ = this._latlng, g = d.latLngToLayerPoint(_), v = L.Path.SVG, x = L.extend({}, this._group.options.spiderLegPolylineOptions), b = x.opacity, M, P, S, O, A, T;
        for (b === void 0 && (b = L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity), v ? (x.opacity = 0, x.className = (x.className || "") + " leaflet-cluster-spider-leg") : x.opacity = b, c._ignoreMove = !0, M = 0; M < o.length; M++)
          P = o[M], T = d.layerPointToLatLng(l[M]), S = new L.Polyline([_, T], x), d.addLayer(S), P._spiderLeg = S, v && (O = S._path, A = O.getTotalLength() + 0.1, O.style.strokeDasharray = A, O.style.strokeDashoffset = A), P.setZIndexOffset && P.setZIndexOffset(1e6), P.clusterHide && P.clusterHide(), p.addLayer(P), P._setPos && P._setPos(g);
        for (c._forceLayout(), c._animationStart(), M = o.length - 1; M >= 0; M--)
          T = d.layerPointToLatLng(l[M]), P = o[M], P._preSpiderfyLatlng = P._latlng, P.setLatLng(T), P.clusterShow && P.clusterShow(), v && (S = P._spiderLeg, O = S._path, O.style.strokeDashoffset = 0, S.setStyle({ opacity: b }));
        this.setOpacity(0.3), c._ignoreMove = !1, setTimeout(function() {
          c._animationEnd(), c.fire("spiderfied", {
            cluster: h,
            markers: o
          });
        }, 200);
      },
      _animationUnspiderfy: function(o) {
        var l = this, h = this._group, c = h._map, d = h._featureGroup, p = o ? c._latLngToNewLayerPoint(this._latlng, o.zoom, o.center) : c.latLngToLayerPoint(this._latlng), _ = this.getAllChildMarkers(null, !0), g = L.Path.SVG, v, x, b, M, P, S;
        for (h._ignoreMove = !0, h._animationStart(), this.setOpacity(1), x = _.length - 1; x >= 0; x--)
          v = _[x], v._preSpiderfyLatlng && (v.closePopup(), v.setLatLng(v._preSpiderfyLatlng), delete v._preSpiderfyLatlng, S = !0, v._setPos && (v._setPos(p), S = !1), v.clusterHide && (v.clusterHide(), S = !1), S && d.removeLayer(v), g && (b = v._spiderLeg, M = b._path, P = M.getTotalLength() + 0.1, M.style.strokeDashoffset = P, b.setStyle({ opacity: 0 })));
        h._ignoreMove = !1, setTimeout(function() {
          var O = 0;
          for (x = _.length - 1; x >= 0; x--)
            v = _[x], v._spiderLeg && O++;
          for (x = _.length - 1; x >= 0; x--)
            v = _[x], v._spiderLeg && (v.clusterShow && v.clusterShow(), v.setZIndexOffset && v.setZIndexOffset(0), O > 1 && d.removeLayer(v), c.removeLayer(v._spiderLeg), delete v._spiderLeg);
          h._animationEnd(), h.fire("unspiderfied", {
            cluster: l,
            markers: _
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
        var l, h;
        for (l in o)
          for (h = o[l].__parent; h; )
            h._iconNeedsUpdate = !0, h = h.__parent;
      },
      /**
       * Re-draws the icon of the supplied markers.
       * To be used in singleMarkerMode only.
       * @param layers Array(L.Marker)|Map(L.Marker) list of markers.
       * @private
       */
      _refreshSingleMarkerModeMarkers: function(o) {
        var l, h;
        for (l in o)
          h = o[l], this.hasLayer(h) && h.setIcon(this._overrideMarkerIcon(h));
      }
    }), L.Marker.include({
      /**
       * Updates the given options in the marker's icon and refreshes the marker.
       * @param options map object of icon options.
       * @param directlyRefreshClusters boolean (optional) true to trigger
       * MCG.refreshClustersOf() right away with this single marker.
       * @returns {L.Marker}
       */
      refreshIconOptions: function(o, l) {
        var h = this.options.icon;
        return L.setOptions(h, o), this.setIcon(h), l && this.__parent && this.__parent._group.refreshClusters(this), this;
      }
    }), e.MarkerClusterGroup = s, e.MarkerCluster = r, Object.defineProperty(e, "__esModule", { value: !0 });
  });
})(gl, gl.exports);
const Do = {
  Utils: {
    DividePolylinesPoints(n) {
      let t = 0;
      const e = [], s = n.length;
      for (let r = 0; r < s; r++)
        n[r] === null && (e.push(n.slice(t === 0 ? 0 : t + 1, r)), t = r);
      return s - 1 !== t && e.push(n.slice(t)), e;
    },
    GetItemFromArray(n, t) {
      try {
        return n[t];
      } catch {
        return [0, 0];
      }
    }
  }
};
class B_ {
  constructor() {
    this.Bounds = [], this.lng = null, this.map = null, this.EventSelectChart = null, this.Polylines = [], this.CurrentPositionMarker = null, this.CurrentGPSPositionMarker = null;
  }
  init(t, e, s, r) {
    this.map = et.map(
      t,
      {
        scrollWheelZoom: s
      }
    );
    var o = new et.Control.FullScreen();
    this.map.addControl(o), et.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: 'Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    var l = (r + "").length > 0, h = {}, c = {};
    switch (l ? h["Thunderforest - Cycle"] = et.tileLayer("https://a.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=" + r, {
      maxZoom: 18,
      attribution: 'Maps &copy; <a href="https://www.thunderforest.com/">Thunderforest</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
    }) : h["Open Cycle Map"] = et.tileLayer("http://a.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: 'Maps &copy; <a href="https://www.thunderforest.com/">Thunderforest</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
    }), h["Thunderforest - Outdoors"] = et.tileLayer("https://a.tile.thunderforest.com/outddors/{z}/{x}/{y}.png?apikey=" + r, {
      maxZoom: 18,
      attribution: 'Maps &copy; <a href="https://www.thunderforest.com/">Thunderforest</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
    }), h["Thunderforest - Transport"] = et.tileLayer("https://a.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=" + r, {
      maxZoom: 18,
      attribution: 'Maps &copy; <a href="https://www.thunderforest.com/">Thunderforest</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
    }), h["Thunderforest - Landscape"] = et.tileLayer("https://a.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=" + r, {
      maxZoom: 18,
      attribution: 'Maps &copy; <a href="https://www.thunderforest.com/">Thunderforest</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
    }), h["Open Street Map"] = et.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: 'Maps &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
    }), h["Humanitarian Map Style"] = et.tileLayer("https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: 'Maps &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
    }), h["Hike & Bike"] = et.tileLayer("http://toolserver.org/tiles/hikebike/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: 'Maps &copy; <a href="https://hikebikemap.org/">Hike & Bike Map</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
    }), h["Open Sea Map"] = et.tileLayer("http://tiles.openseamap.org/seamark/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: 'Maps &copy; <a href="https://www.openseamap.org/">OpenSeaMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
    }), h["GSI Map (Japan)"] = et.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">国土地理院</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
    }), e) {
      case "OSM1": {
        h["Open Street Map"].addTo(this.map);
        break;
      }
      case "OSM2": {
        h["Thunderforest - Cycle"].addTo(this.map);
        break;
      }
      case "OSM3": {
        h["Thunderforest - Outdoors"].addTo(this.map);
        break;
      }
      case "OSM4": {
        h["Thunderforest - Transport"].addTo(this.map);
        break;
      }
      case "OSM5": {
        h["Thunderforest - Landscape"].addTo(this.map);
        break;
      }
      case "OSM7": {
        h["Humanitarian Map Style"].addTo(this.map);
        break;
      }
      case "OSM9": {
        h["Hike & Bike"].addTo(this.map);
        break;
      }
      case "OSM10": {
        h["Open Sea Map"].addTo(this.map);
        break;
      }
      case "OSM11": {
        h["GSI Map (Japan)"].addTo(this.map);
        break;
      }
      default:
        h["Open Street Map"].addTo(this.map);
    }
    et.control.layers(h, c).addTo(this.map);
  }
  AppPolylines(t, e, s, r, o) {
    var p;
    if (this.map != null) {
      var l = Do.Utils.GetItemFromArray(t, 0);
      if (l != null) {
        (s == "" || s == null) && (s = "https://maps.google.com/mapfiles/kml/pal4/icon25.png");
        var h = et.marker(et.latLng(l), {
          icon: et.icon({
            iconUrl: s,
            iconSize: [32, 32],
            // Size of the icon.
            iconAnchor: [16, 16]
            // Point of the icon which will correspond to marker's location.
          }),
          title: (p = this.lng) == null ? void 0 : p.currentPosition
        });
        h.addTo(this.map), this.CurrentPositionMarker = h;
        var c = Do.Utils.DividePolylinesPoints(t);
        this.lng, this.EventSelectChart, this.Bounds = t.filter((_) => _ != null), this.CenterMap();
        for (let _ = 0; _ < c.length; _++) {
          let g = "";
          _ < e.length ? g = e[_] : g = e[e.length - 1];
          try {
            let v = et.polyline(c[_], { color: g }).addTo(this.map);
            this.Polylines.push(v);
            let x = this;
            this.Polylines[_].on("mousemove", function(b) {
              x.MoveMarkerToPosition([b.latlng.lat, b.latlng.lng], !0);
            });
          } catch {
          }
        }
        if (r != "") {
          let _ = t[0];
          _ != null && et.marker(et.latLng(_), {
            icon: et.icon({
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
          let _ = t[t.length - 1];
          if (_ != null) {
            var d = et.marker(et.latLng(_), {
              icon: et.icon({
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
    this.CurrentGPSPositionMarker == null ? (e == "" && (e = "https://maps.google.com/mapfiles/kml/pal4/icon25.png"), this.map != null && (this.CurrentGPSPositionMarker = et.marker(t, {
      icon: et.icon({
        iconUrl: e,
        iconSize: [32, 32],
        // Size of the icon.
        iconAnchor: [16, 16]
        // Point of the icon which will correspond to marker's location.
      })
    }).addTo(this.map).bindPopup(s.currentPosition).openPopup())) : this.CurrentGPSPositionMarker.setLatLng(t), this.Bounds.push(t), this.CenterMap();
  }
  AddWaypoints(t, e) {
    var s = et.icon({
      iconUrl: "https://maps.google.com/mapfiles/ms/micons/flag.png",
      iconSize: [32, 32],
      // Size of the icon.
      iconAnchor: [16, 16]
      // Point of the icon which will correspond to marker's location.
    });
    e != "" && (s = et.icon({
      iconUrl: "waypointIcon",
      iconSize: [32, 32],
      // Size of the icon.
      iconAnchor: [16, 16]
      // Point of the icon which will correspond to marker's location.
    }));
    for (let d = 0; d < t.length; d++) {
      var r = t[d];
      this.Bounds.push([r.lat, r.lon]);
      var o = r.lat, l = r.lon;
      r.sym, r.type, r.img && (s.iconUrl = r.img + "");
      var h = et.marker([o, l], { icon: s }), c = "";
      r.name == "" ? c = "<div>" + unescape(r.desc) + "</div>" : c = "<div><b>" + r.name + "</b><br />" + unescape(r.desc) + "</div>", c += "<br /><p><a href='https://maps.google.com?daddr=" + o + "," + l + "' target='_blank'>Itin&eacute;raire</a></p>", this.map != null && h.addTo(this.map).bindPopup(c);
    }
    this.CenterMap();
  }
  MoveMarkerToPosition(t, e) {
    this.CurrentPositionMarker != null && (this.CurrentPositionMarker.setLatLng(t), this.lng && this.CurrentPositionMarker.setTooltipContent(this.lng.currentPosition), e == !0 && this.EventSelectChart && this.EventSelectChart(t));
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
          const [l, h] = o;
          r.minLat = Math.min(r.minLat, l), r.maxLat = Math.max(r.maxLat, l), r.minLng = Math.min(r.minLng, h), r.maxLng = Math.max(r.maxLng, h);
        });
        var t = new et.LatLng(r.minLat, r.minLng), e = new et.LatLng(r.maxLat, r.maxLng);
        (s = this.map) == null || s.fitBounds(new et.LatLngBounds(t, e));
      }
    } catch (r) {
      console.log(r);
    }
  }
  AddPhotos(t) {
    for (const e of t) {
      let s = et.marker(e, {
        icon: et.divIcon(
          et.extend(
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
const R_ = "1", F_ = "2", N_ = "3", Z_ = "4", H_ = "5", W_ = "6", V_ = "5", j_ = "4", U_ = "3", G_ = "2", Y_ = "1";
class X_ {
  constructor(t) {
    this.myChart = null, this.params = t, this.init();
  }
  init() {
    var Ei, Mn, Ii, ui, Di, Pn, Ee, kn, Sn;
    let {
      targetId: t,
      mapType: e,
      mapData: s,
      graphDist: r,
      graphEle: o,
      graphSpeed: l,
      graphHr: h,
      graphAtemp: c,
      graphCad: d,
      graphGrade: p,
      waypoints: _,
      unit: g,
      unitspeed: v,
      color1: x,
      color2: b,
      color3: M,
      color4: P,
      color5: S,
      color6: O,
      color7: A,
      chartFrom1: T,
      chartTo1: I,
      chartFrom2: D,
      chartTo2: B,
      startIcon: N,
      waypointIcon: G,
      endIcon: Z,
      currentIcon: V,
      zoomOnScrollWheel: Mt,
      langs: at,
      pluginUrl: lt,
      usegpsposition: $,
      currentpositioncon: ct,
      TFApiKey: H
    } = this.params;
    var nt = [], F = { suf: "", dec: 0 }, K = { suf: "", dec: 0 }, ht = { suf: "", dec: 0 }, vt = { suf: "%", dec: 1 }, ot = { suf: "", dec: 0 }, J = { suf: "", dec: 0 }, U = document.getElementById("wpgpxmaps_" + t), Gt = document.getElementById("map_" + t), Zt = document.getElementById("chart_" + t);
    if (document.getElementById("report_" + t), document.getElementById("wpgpxmaps_" + t + "_osm_footer"), Gt == null)
      return;
    let ie = this;
    Gt.style.width;
    var Yt = new B_();
    Yt.init(
      Gt,
      e,
      Mt == "true",
      H
    ), Yt.EventSelectChart = function(Et) {
      var Cn, Tn;
      if (ie.myChart) {
        for (var xt = Et[0], dt = Et[1], Ht = ie.getClosestIndex(s, xt, dt), wt = [], qt = ie.myChart.data.datasets.length, Kt = 0; Kt < qt; Kt++)
          wt.push(ie.myChart.data.datasets[Kt].data[Ht]);
        if (wt.length > 0) {
          let di = (Cn = ie.myChart.tooltip) == null ? void 0 : Cn.getActiveElements();
          (di == null || di.length == 0) && ((Tn = ie.myChart.tooltip) == null || Tn.setActiveElements([{
            datasetIndex: 0,
            index: Ht
          }], {
            x: wt[0].x,
            y: wt[0].y
          })), ie.myChart.tooltip.setActiveElements(wt), ie.myChart.draw();
        }
      }
    }, $ == "true" && navigator.geolocation && navigator.geolocation.watchPosition(
      function(Et) {
        Et.coords.accuracy / 2;
        var xt = [Et.coords.latitude, Et.coords.longitude];
        Yt.SetCurrentGPSPosition([xt[0], xt[1]], ct, at);
      },
      function(Et) {
      },
      {
        enableHighAccuracy: !1,
        timeout: 5e3,
        maximumAge: 0
      }
    ), _ != null && _.length > 0 && Yt.AddWaypoints(_, G);
    let le = document.getElementById("ngimages_" + t);
    le == null || le.setAttribute("style", "display:block;position:absolute;left:-50000px");
    var he = le == null ? void 0 : le.querySelectorAll("span");
    if (he && he.length > 0) {
      for (var Ve = [], Ci = 0; Ci < he.length; Ci++) {
        var li = he[Ci], hi = li.children[0], je = [
          Number(li.getAttribute("lat")),
          Number(li.getAttribute("lon"))
        ];
        Yt.Bounds.push(je), Ve.push({
          lat: je[0],
          lng: je[1],
          name: hi.children[0].getAttribute("alt"),
          url: hi.children[0].getAttribute("src"),
          thumbnail: hi.children[0].getAttribute("src")
        });
      }
      Ve.length > 0 && Yt.AddPhotos(Ve);
    }
    s && Yt.AppPolylines(s, x, V, N, Z);
    let Oe = null, Ae = U == null ? void 0 : U.parentElement;
    for (; Ae != null; ) {
      if (Ae.classList.contains("wordpress-post-tabs") && Ae.classList.contains("tab-pane")) {
        Oe = Ae;
        break;
      }
      Ae = Ae.parentElement;
    }
    if (Oe) {
      var Ti = Yt, ci = function(Et) {
        setTimeout(function(xt) {
          var dt;
          (dt = Ti.map) == null || dt.invalidateSize(), Ti.CenterMap();
        }, 300);
      };
      (Ei = document.querySelector(".wpsm_nav-tabs a")) == null || Ei.addEventListener("click", ci, !1), (Mn = Oe.querySelector("div > ul > li > a")) == null || Mn.addEventListener("click", ci, !1);
    }
    var xn = Zt == null ? void 0 : Zt.style.height;
    if (r && (o || l || h || c || d) && xn != "0px") {
      r.length, R_ == g ? (K = { suf: "mi", dec: 1 }, ht = { suf: "ft", dec: 0 }) : F_ == g ? (K = { suf: "km", dec: 1 }, ht = { suf: "m", dec: 2 }) : N_ == g ? (K = { suf: "NM", dec: 1 }, ht = { suf: "m", dec: 0 }) : Z_ == g ? (K = { suf: "mi", dec: 1 }, ht = { suf: "m", dec: 0 }) : H_ == g ? (K = { suf: "NM", dec: 1 }, ht = { suf: "ft", dec: 0 }) : (K = { suf: "m", dec: 0 }, ht = { suf: "m", dec: 0 });
      var wn = 1111.1, Oi = wn.toLocaleString(), Ln = Oi.length;
      Oi.substring(Ln - 2, Ln - 1), Oi.substring(1, 2), Pe.register(...E_);
      var zt = {
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
                callback: function(xt, dt, Ht) {
                  return parseFloat(xt + "").toFixed(K.dec) + K.suf;
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
                title: function(xt) {
                  var dt = nt[0].label_x, Ht = xt[0].element.x, wt = dt.dec, qt = dt.suf;
                  return Ht.toFixed(wt) + qt;
                },
                label: function(xt) {
                  var dt = xt.label || "", Ht = nt[xt.datasetIndex].label_y, wt = Ht.dec, qt = Ht.suf, Kt = xt.element.y;
                  return dt && (dt += ": "), dt += Kt.toFixed(wt) + qt, dt;
                },
                footer: function(xt) {
                  var dt = xt[0].dataIndex, Ht = Do.Utils.GetItemFromArray(s, dt);
                  Ht && Yt.MoveMarkerToPosition(Ht, !1);
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
      let Et = 1;
      if (o && o.length > 0) {
        var At = this.mergeArrayForChart(r, o);
        let xt, dt;
        T != "" ? xt = parseFloat(T) : xt = At.Min, I != "" ? dt = parseFloat(I) : dt = At.Max;
        var St = "yaxis" + Et++, ne = {
          type: "linear",
          max: dt,
          min: xt,
          ticks: {
            callback(Ht, wt, qt) {
              return parseFloat(Ht + "").toFixed(ht.dec) + ht.suf;
            }
          }
        };
        ((Ii = zt.options) == null ? void 0 : Ii.scales)[St] = ne, nt.push({ label_x: K, label_y: ht }), zt.data.datasets.push(this.wpgpxmapsGetDataset(at.altitude, At.Items, b, St));
      }
      if (l && l.length > 0) {
        W_ == v ? F = { suf: "min/100m", dec: 2 } : V_ == v ? F = { suf: "knots", dec: 2 } : j_ == v ? F = { suf: "min/mi", dec: 2 } : U_ == v ? F = { suf: "min/km", dec: 2 } : G_ == v ? F = { suf: "mi/h", dec: 0 } : Y_ == v ? F = { suf: "km/h", dec: 0 } : F = { suf: "m/s", dec: 0 };
        var At = this.mergeArrayForChart(r, l);
        let dt = {
          type: "linear",
          ticks: {
            /* Include a dollar sign in the ticks. */
            callback(wt, qt, Kt) {
              return parseFloat(wt + "").toFixed(F.dec) + F.suf;
            }
          },
          position: "right"
          //scalePositionLeft: false,
        };
        D != "" ? dt.min = parseFloat(D) : dt.min = At.Min, B != "" ? dt.max = parseFloat(B) : dt.max = At.Max, nt.push({ label_x: nt[0].label_x, label_y: F });
        var St = "yaxis" + Et++;
        ((ui = zt.options) == null ? void 0 : ui.scales)[St] = dt, zt.data.datasets.push(this.wpgpxmapsGetDataset(at.speed, At.Items, M, St));
      }
      if (h && h.length > 0) {
        var At = this.mergeArrayForChart(r, h), ne = {
          type: "linear",
          ticks: {
            /* Include a dollar sign in the ticks. */
            callback(wt, qt, Kt) {
              return parseFloat(wt + "").toFixed(ot.dec) + ot.suf;
            }
          },
          position: "right"
          //scalePositionLeft: false,
        }, St = "yaxis" + Et++;
        ((Di = zt.options) == null ? void 0 : Di.scales)[St] = ne, zt.data.datasets.push(this.wpgpxmapsGetDataset(at.heartRate, At.Items, P, St)), nt.push({ label_x: nt[0].label_x, label_y: ot });
      }
      if (c && c.length > 0) {
        var At = this.mergeArrayForChart(r, c), ne = {
          type: "linear",
          ticks: {
            /* Include a dollar sign in the ticks. */
            callback(wt, qt, Kt) {
              return parseFloat(wt + "").toFixed(1) + "°C";
            }
          },
          position: "right"
          //scalePositionLeft: false,
        }, St = "yaxis" + Et++;
        ((Pn = zt.options) == null ? void 0 : Pn.scales)[St] = ne, zt.data.datasets.push(this.wpgpxmapsGetDataset(at.atemp, At.Items, A, St)), nt.push({ label_x: nt[0].label_x, label_y: { suf: "°C", dec: 1 } });
      }
      if (d && d.length > 0) {
        var At = this.mergeArrayForChart(r, d, !0), ne = {
          type: "linear",
          ticks: {
            // Include a dollar sign in the ticks.
            callback(wt, qt, Kt) {
              return parseFloat(wt + "").toFixed(J.dec) + J.suf;
            }
          },
          position: "right"
          //scalePositionLeft: false,
        }, St = "yaxis" + Et++;
        ((Ee = zt.options) == null ? void 0 : Ee.scales)[St] = ne, zt.data.datasets.push(this.wpgpxmapsGetDataset(at.cadence, At.Items, S, St)), nt.push({ label_x: nt[0].label_x, label_y: J });
      }
      if (p && p.length > 0) {
        var At = this.mergeArrayForChart(r, p), ne = {
          type: "linear",
          ticks: {
            // Include a dollar sign in the ticks.
            callback: function(wt, qt, Kt) {
              return parseFloat(wt + "").toFixed(vt.dec) + vt.suf;
            }
          },
          position: "right"
          //scalePositionLeft: false,
        };
        nt.push({ label_x: nt[0].label_x, label_y: vt });
        var St = "yaxis" + Et++;
        ((kn = zt.options) == null ? void 0 : kn.scales)[St] = ne, zt.data.datasets.push(this.wpgpxmapsGetDataset(at.grade, At.Items, O, St));
      }
      var Ai = (Sn = document.getElementById("myChart_" + t)) == null ? void 0 : Sn.getContext("2d");
      Ai && (this.myChart = new Pe(Ai, zt));
    } else
      Zt == null || Zt.style.setProperty("display", "none");
    return this;
  }
  mergeArrayForChart(t, e, s) {
    const r = t.length, o = new Array(r);
    let l = 1e4, h = -1e4;
    for (let c = 0; c < r; c++)
      if (t[c] != null) {
        let d = e[c];
        s === !0 && d === 0 && (d = null), o[c] = {
          x: t[c],
          y: d
        }, d > h && (h = d), d < l && (l = d);
      }
    return {
      Items: o,
      Min: l,
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
    for (let l = 0; l < t.length; l++) {
      if (t[l] === null)
        continue;
      const h = this.wpgpxmapsDist(t[l][0], t[l][1], e, s);
      h < r && (o = l, r = h);
    }
    return o;
  }
  getClosestImage(t, e, s) {
    let r = 1e4, o;
    const l = document.getElementById("ngimages_" + s);
    if (l == null)
      return;
    const h = l.getElementsByTagName("span");
    for (let c = 0; c < h.length; c++) {
      let d = h[c].getAttribute("lat"), p = h[c].getAttribute("lon");
      if (d == null || p == null)
        return;
      d = d.replace(",", "."), p = p.replace(",", ".");
      const _ = this.wpgpxmapsDist(parseFloat(d), parseFloat(p), t, e);
      _ < r && (o = h[c], r = _);
    }
    return o;
  }
  isNumeric(t) {
    return /^-{0,1}\d*\.{0,1}\d+$/.test(t);
  }
  wpgpxmapsDist(t, e, s, r) {
    const o = s - t, l = r - e;
    return Math.sqrt(o * o + l * l);
  }
}
export {
  X_ as WPGPXMaps
};
//# sourceMappingURL=WP-GPX-Maps.es.js.map
