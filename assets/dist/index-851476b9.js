var v = 63710088e-1, C = {
  centimeters: v * 100,
  centimetres: v * 100,
  degrees: v / 111325,
  feet: v * 3.28084,
  inches: v * 39.37,
  kilometers: v / 1e3,
  kilometres: v / 1e3,
  meters: v,
  metres: v,
  miles: v / 1609.344,
  millimeters: v * 1e3,
  millimetres: v * 1e3,
  nauticalmiles: v / 1852,
  radians: 1,
  yards: v * 1.0936
};
function E(r, a, e) {
  e === void 0 && (e = {});
  var t = { type: "Feature" };
  return (e.id === 0 || e.id) && (t.id = e.id), e.bbox && (t.bbox = e.bbox), t.properties = a || {}, t.geometry = r, t;
}
function G(r, a, e) {
  if (e === void 0 && (e = {}), !r)
    throw new Error("coordinates is required");
  if (!Array.isArray(r))
    throw new Error("coordinates must be an Array");
  if (r.length < 2)
    throw new Error("coordinates must be at least 2 numbers long");
  if (!S(r[0]) || !S(r[1]))
    throw new Error("coordinates must contain numbers");
  var t = {
    type: "Point",
    coordinates: r
  };
  return E(t, a, e);
}
function B(r, a, e) {
  if (e === void 0 && (e = {}), r.length < 2)
    throw new Error("coordinates must be an array of two or more positions");
  var t = {
    type: "LineString",
    coordinates: r
  };
  return E(t, a, e);
}
function U(r, a) {
  a === void 0 && (a = "kilometers");
  var e = C[a];
  if (!e)
    throw new Error(a + " units is invalid");
  return r * e;
}
function D(r, a) {
  a === void 0 && (a = "kilometers");
  var e = C[a];
  if (!e)
    throw new Error(a + " units is invalid");
  return r / e;
}
function L(r) {
  var a = r % (2 * Math.PI);
  return a * 180 / Math.PI;
}
function y(r) {
  var a = r % 360;
  return a * Math.PI / 180;
}
function S(r) {
  return !isNaN(r) && r !== null && !Array.isArray(r);
}
function R(r, a, e) {
  if (r !== null)
    for (var t, i, s, o, l, n, f, c = 0, u = 0, h, d = r.type, g = d === "FeatureCollection", w = d === "Feature", A = g ? r.features.length : 1, m = 0; m < A; m++) {
      f = g ? r.features[m].geometry : w ? r.geometry : r, h = f ? f.type === "GeometryCollection" : !1, l = h ? f.geometries.length : 1;
      for (var k = 0; k < l; k++) {
        var M = 0, P = 0;
        if (o = h ? f.geometries[k] : f, o !== null) {
          n = o.coordinates;
          var b = o.type;
          switch (c = e && (b === "Polygon" || b === "MultiPolygon") ? 1 : 0, b) {
            case null:
              break;
            case "Point":
              if (a(
                n,
                u,
                m,
                M,
                P
              ) === !1)
                return !1;
              u++, M++;
              break;
            case "LineString":
            case "MultiPoint":
              for (t = 0; t < n.length; t++) {
                if (a(
                  n[t],
                  u,
                  m,
                  M,
                  P
                ) === !1)
                  return !1;
                u++, b === "MultiPoint" && M++;
              }
              b === "LineString" && M++;
              break;
            case "Polygon":
            case "MultiLineString":
              for (t = 0; t < n.length; t++) {
                for (i = 0; i < n[t].length - c; i++) {
                  if (a(
                    n[t][i],
                    u,
                    m,
                    M,
                    P
                  ) === !1)
                    return !1;
                  u++;
                }
                b === "MultiLineString" && M++, b === "Polygon" && P++;
              }
              b === "Polygon" && M++;
              break;
            case "MultiPolygon":
              for (t = 0; t < n.length; t++) {
                for (P = 0, i = 0; i < n[t].length; i++) {
                  for (s = 0; s < n[t][i].length - c; s++) {
                    if (a(
                      n[t][i][s],
                      u,
                      m,
                      M,
                      P
                    ) === !1)
                      return !1;
                    u++;
                  }
                  P++;
                }
                M++;
              }
              break;
            case "GeometryCollection":
              for (t = 0; t < o.geometries.length; t++)
                if (R(o.geometries[t], a, e) === !1)
                  return !1;
              break;
            default:
              throw new Error("Unknown Geometry Type");
          }
        }
      }
    }
}
function F(r, a) {
  var e, t, i, s, o, l, n, f, c, u, h = 0, d = r.type === "FeatureCollection", g = r.type === "Feature", w = d ? r.features.length : 1;
  for (e = 0; e < w; e++) {
    for (l = d ? r.features[e].geometry : g ? r.geometry : r, f = d ? r.features[e].properties : g ? r.properties : {}, c = d ? r.features[e].bbox : g ? r.bbox : void 0, u = d ? r.features[e].id : g ? r.id : void 0, n = l ? l.type === "GeometryCollection" : !1, o = n ? l.geometries.length : 1, i = 0; i < o; i++) {
      if (s = n ? l.geometries[i] : l, s === null) {
        if (a(
          null,
          h,
          f,
          c,
          u
        ) === !1)
          return !1;
        continue;
      }
      switch (s.type) {
        case "Point":
        case "LineString":
        case "MultiPoint":
        case "Polygon":
        case "MultiLineString":
        case "MultiPolygon": {
          if (a(
            s,
            h,
            f,
            c,
            u
          ) === !1)
            return !1;
          break;
        }
        case "GeometryCollection": {
          for (t = 0; t < s.geometries.length; t++)
            if (a(
              s.geometries[t],
              h,
              f,
              c,
              u
            ) === !1)
              return !1;
          break;
        }
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
    h++;
  }
}
function J(r, a) {
  F(r, function(e, t, i, s, o) {
    var l = e === null ? null : e.type;
    switch (l) {
      case null:
      case "Point":
      case "LineString":
      case "Polygon":
        return a(
          E(e, i, { bbox: s, id: o }),
          t,
          0
        ) === !1 ? !1 : void 0;
    }
    var n;
    switch (l) {
      case "MultiPoint":
        n = "Point";
        break;
      case "MultiLineString":
        n = "LineString";
        break;
      case "MultiPolygon":
        n = "Polygon";
        break;
    }
    for (var f = 0; f < e.coordinates.length; f++) {
      var c = e.coordinates[f], u = {
        type: n,
        coordinates: c
      };
      if (a(E(u, i), t, f) === !1)
        return !1;
    }
  });
}
function O(r, a) {
  J(r, function(e, t, i) {
    var s = 0;
    if (e.geometry) {
      var o = e.geometry.type;
      if (!(o === "Point" || o === "MultiPoint")) {
        var l, n = 0, f = 0, c = 0;
        if (R(
          e,
          function(u, h, d, g, w) {
            if (l === void 0 || t > n || g > f || w > c) {
              l = u, n = t, f = g, c = w, s = 0;
              return;
            }
            var A = B(
              [l, u],
              e.properties
            );
            if (a(
              A,
              t,
              i,
              w,
              s
            ) === !1)
              return !1;
            s++, l = u;
          }
        ) === !1)
          return !1;
      }
    }
  });
}
function z(r, a, e) {
  var t = e, i = !1;
  return O(
    r,
    function(s, o, l, n, f) {
      i === !1 && e === void 0 ? t = s : t = a(
        t,
        s,
        o,
        l,
        n,
        f
      ), i = !0;
    }
  ), t;
}
function p(r) {
  if (!r)
    throw new Error("coord is required");
  if (!Array.isArray(r)) {
    if (r.type === "Feature" && r.geometry !== null && r.geometry.type === "Point")
      return r.geometry.coordinates;
    if (r.type === "Point")
      return r.coordinates;
  }
  if (Array.isArray(r) && r.length >= 2 && !Array.isArray(r[0]) && !Array.isArray(r[1]))
    return r;
  throw new Error("coord must be GeoJSON Point or an Array of numbers");
}
function H(r) {
  return r.type === "Feature" ? r.geometry : r;
}
function q(r, a, e) {
  e === void 0 && (e = {});
  var t = p(r), i = p(a), s = y(i[1] - t[1]), o = y(i[0] - t[0]), l = y(t[1]), n = y(i[1]), f = Math.pow(Math.sin(s / 2), 2) + Math.pow(Math.sin(o / 2), 2) * Math.cos(l) * Math.cos(n);
  return U(2 * Math.atan2(Math.sqrt(f), Math.sqrt(1 - f)), e.units);
}
function K(r, a, e, t) {
  t === void 0 && (t = {});
  var i = p(r), s = y(i[0]), o = y(i[1]), l = y(e), n = D(a, t.units), f = Math.asin(Math.sin(o) * Math.cos(n) + Math.cos(o) * Math.sin(n) * Math.cos(l)), c = s + Math.atan2(Math.sin(l) * Math.sin(n) * Math.cos(o), Math.cos(n) - Math.sin(o) * Math.sin(f)), u = L(c), h = L(f);
  return G([u, h], t.properties);
}
function N(r, a, e) {
  if (e === void 0 && (e = {}), e.final === !0)
    return Q(r, a);
  var t = p(r), i = p(a), s = y(t[0]), o = y(i[0]), l = y(t[1]), n = y(i[1]), f = Math.sin(o - s) * Math.cos(n), c = Math.cos(l) * Math.sin(n) - Math.sin(l) * Math.cos(n) * Math.cos(o - s);
  return L(Math.atan2(f, c));
}
function Q(r, a) {
  var e = N(a, r);
  return e = (e + 180) % 360, e;
}
function T(r, a, e) {
  e === void 0 && (e = {});
  for (var t = H(r), i = t.coordinates, s = 0, o = 0; o < i.length && !(a >= s && o === i.length - 1); o++)
    if (s >= a) {
      var l = a - s;
      if (l) {
        var n = N(i[o], i[o - 1]) - 180, f = K(i[o], l, n, e);
        return f;
      } else
        return G(i[o]);
    } else
      s += q(i[o], i[o + 1], e);
  return G(i[i.length - 1]);
}
function V(r, a) {
  return a === void 0 && (a = {}), z(r, function(e, t) {
    var i = t.geometry.coordinates;
    return e + q(i[0], i[1], a);
  }, 0);
}
export {
  T as a,
  V as b,
  B as l
};
