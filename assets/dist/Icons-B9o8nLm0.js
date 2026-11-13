// assets/src/Utils/Utils.ts
var e = { Utils: {
	EscapeHtml(e) {
		return String(e ?? "").replace(/[&<>"']/g, (e) => ({
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			"\"": "&quot;",
			"'": "&#39;"
		})[e]);
	},
	SafeImageUrl(t) {
		let n = String(t ?? "").trim();
		return /^(https?:)?\/\//i.test(n) || /^\/(?!\/)/.test(n) ? e.Utils.EscapeHtml(n) : "";
	},
	DividePolylinesPoints(e) {
		let t = [], n = [];
		for (let r of e) r === null ? (n.length > 0 && t.push(n), n = []) : n.push(r);
		return n.length > 0 && t.push(n), t;
	},
	TrackColorScale(e, t) {
		let n, r, i;
		if (e === "grade") n = [
			[-12, "#1d4ed8"],
			[-6, "#38bdf8"],
			[0, "#22c55e"],
			[4, "#eab308"],
			[8, "#f97316"],
			[12, "#dc2626"],
			[18, "#7f1d1d"]
		], r = -12, i = 18;
		else {
			let e = t.filter((e) => e !== null && !isNaN(e)).sort((e, t) => e - t);
			r = e.length ? e[Math.floor(e.length * .05)] : 0, i = e.length ? e[Math.min(e.length - 1, Math.floor(e.length * .95))] : 1, i <= r && (i = r + 1);
			let a = [
				"#2563eb",
				"#22c55e",
				"#eab308",
				"#dc2626"
			];
			n = a.map((e, t) => [r + (i - r) * t / (a.length - 1), e]);
		}
		let a = (e) => [
			1,
			3,
			5
		].map((t) => parseInt(e.substring(t, t + 2), 16));
		return {
			colorOf: (t) => {
				if (t === null || isNaN(t)) return "#888888";
				let o = e === "grade" ? 1 : (i - r) / 20;
				if (t = Math.round(t / o) * o, t <= n[0][0]) return n[0][1];
				if (t >= n[n.length - 1][0]) return n[n.length - 1][1];
				for (let e = 0; e < n.length - 1; e++) if (t <= n[e + 1][0]) {
					let r = (t - n[e][0]) / (n[e + 1][0] - n[e][0]), i = a(n[e][1]), o = a(n[e + 1][1]);
					return "#" + i.map((e, t) => Math.round(e + r * (o[t] - e)).toString(16).padStart(2, "0")).join("");
				}
				return n[n.length - 1][1];
			},
			stops: n,
			min: r,
			max: i
		};
	},
	SplitTrackByColor(e, t, n) {
		let r = [], i = [], a = [], o = "", s = () => {
			a.length > 1 && (r.length > 0 && r.push(null), r.push(...a), i.push(o)), a = [];
		};
		for (let r = 0; r < e.length; r++) {
			let i = e[r];
			if (i === null) {
				s();
				continue;
			}
			let c = n(t[r] ?? null);
			if (a.length === 0) a = [i], o = c;
			else if (c === o || a.length === 1) a.length === 1 && (o = c), a.push(i);
			else {
				let e = a[a.length - 1];
				s(), a = [e, i], o = c;
			}
		}
		return s(), {
			mapData: r,
			colors: i
		};
	},
	Distance(e, t) {
		let n = Math.PI / 180, r = (t[0] - e[0]) * n, i = (t[1] - e[1]) * n, a = Math.sin(r / 2) ** 2 + Math.cos(e[0] * n) * Math.cos(t[0] * n) * Math.sin(i / 2) ** 2;
		return 12742e3 * Math.asin(Math.min(1, Math.sqrt(a)));
	},
	DistanceMarkers(t, n, r) {
		let i = [];
		if (!(n > 0)) return i;
		let a = n * r, o = 0, s = a, c = null;
		for (let n of t) if (n === null) c = null;
		else {
			if (c !== null) {
				let t = e.Utils.Distance(c, n);
				for (; t > 0 && o + t >= s;) {
					let e = (s - o) / t;
					i.push({
						point: [c[0] + (n[0] - c[0]) * e, c[1] + (n[1] - c[1]) * e],
						value: Math.round(s / r * 100) / 100
					}), s += a;
				}
				o += t;
			}
			c = n;
		}
		return i;
	},
	MarkerElement(e, t, n = 18) {
		let r = document.createElement("div");
		return r.className = "wpgpxmaps-marker", r.textContent = e, r.style.cssText = `display:flex;align-items:center;justify-content:center;width:${n}px;height:${n}px;margin:0;padding:0;border-radius:50%;background:${t};color:#fff;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.4);font:bold ${e.length > 2 ? 8 : 10}px/1 Arial, Helvetica, sans-serif;letter-spacing:0;font-variant-numeric:tabular-nums;text-align:center;box-sizing:border-box;`, r;
	},
	AddTracksLegend(e, t, n) {
		let r = document.createElement("div");
		r.className = "wpgpxmaps-legend wpgpxmaps-tracks-legend", r.style.cssText = "position:absolute;left:8px;bottom:30px;z-index:1000;background:rgba(255,255,255,.9);padding:4px 8px;border-radius:4px;font:11px/1.5 sans-serif;color:#222;box-shadow:0 1px 3px rgba(0,0,0,.3);pointer-events:none;max-width:60%", t.forEach((e, t) => {
			let i = document.createElement("div"), a = document.createElement("span");
			a.style.cssText = `display:inline-block;width:14px;height:4px;margin-right:6px;vertical-align:middle;border-radius:2px;background:${n[t % n.length]}`, i.append(a, document.createTextNode(e)), r.appendChild(i);
		}), e.appendChild(r);
	},
	AddTrackLegend(e, t, n, r, i) {
		let a = n[0][0], o = n[n.length - 1][0], s = n.map((e) => `${e[1]} ${Math.round((e[0] - a) / (o - a) * 100)}%`).join(", "), c = document.createElement("div");
		c.className = "wpgpxmaps-legend", c.style.cssText = "position:absolute;left:8px;bottom:30px;z-index:1000;background:rgba(255,255,255,.9);padding:4px 8px;border-radius:4px;font:11px/1.3 sans-serif;color:#222;box-shadow:0 1px 3px rgba(0,0,0,.3);pointer-events:none";
		let l = document.createElement("div");
		l.textContent = t;
		let u = document.createElement("div");
		u.style.cssText = `width:140px;height:8px;margin:3px 0;border-radius:2px;background:linear-gradient(to right, ${s})`;
		let d = document.createElement("div");
		d.style.cssText = "display:flex;justify-content:space-between";
		let f = document.createElement("span");
		f.textContent = r;
		let p = document.createElement("span");
		p.textContent = i, d.append(f, p), c.append(l, u, d), e.appendChild(c);
	},
	GetItemFromArray(e, t) {
		try {
			return e[t];
		} catch {
			return [0, 0];
		}
	},
	calculateGrade(e, t) {
		if (e.length !== t.length + 1) throw Error("The number of altitude points must be one more than the number of distances.");
		let n = [];
		for (let r = 0; r < t.length; r++) {
			let i = (e[r + 1] - e[r]) / t[r] * 100;
			n.push(i);
		}
		return n;
	},
	getGradientColor(e) {
		let t = [
			{
				grade: 0,
				color: [
					0,
					255,
					0
				]
			},
			{
				grade: 5,
				color: [
					255,
					255,
					0
				]
			},
			{
				grade: 15,
				color: [
					255,
					0,
					0
				]
			}
		];
		function n(e, t, n) {
			return `rgb(${e.map((e, r) => Math.round(e + n * (t[r] - e))).join(",")})`;
		}
		let r, i;
		for (let n = 0; n < t.length - 1; n++) if (e <= t[n + 1].grade) {
			r = t[n], i = t[n + 1];
			break;
		}
		let a = (e - r.grade) / (i.grade - r.grade);
		return n(r.color, i.color, a);
	}
} }, t = (e) => "data:image/svg+xml," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">${e}</svg>`), n = t("<path d=\"M9 3v27\" stroke=\"#4b5563\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><path d=\"M10 4h16l-4 5.5 4 5.5H10z\" fill=\"#dc2626\" stroke=\"#7f1d1d\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/>"), r = t("<circle cx=\"16\" cy=\"16\" r=\"13\" fill=\"#2563eb\" fill-opacity=\"0.25\"/><circle cx=\"16\" cy=\"16\" r=\"7.5\" fill=\"#2563eb\" stroke=\"#fff\" stroke-width=\"3\"/>");
export { n, e as r, r as t };
