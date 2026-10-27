
export const WPGPXMAPS = {
    Utils: {
        // Splits the points on the null separators between tracks; never returns null points or empty tracks
        DividePolylinesPoints(mapData: any[]): any[] {
            const result: any[] = [];
            let current: any[] = [];

            for (const point of mapData) {
                if (point === null) {
                    if (current.length > 0) result.push(current);
                    current = [];
                } else {
                    current.push(point);
                }
            }
            if (current.length > 0) result.push(current);
            return result;
        },

        /*
         * Color scale for the track. Grade has fixed stops (descent blue, flat green, climb yellow to red);
         * speed, heart rate and elevation go from blue to red between the 5th and 95th percentile,
         * so a single GPS spike does not flatten the scale.
         */
        TrackColorScale(colorBy: string, values: Array<number | null>): { colorOf: (v: number | null) => string, stops: Array<[number, string]>, min: number, max: number } {

            let stops: Array<[number, string]>;
            let min: number;
            let max: number;

            if (colorBy === 'grade') {
                stops = [[-12, '#1d4ed8'], [-6, '#38bdf8'], [0, '#22c55e'], [4, '#eab308'], [8, '#f97316'], [12, '#dc2626'], [18, '#7f1d1d']];
                min = -12;
                max = 18;
            } else {
                const sorted = values.filter((v): v is number => v !== null && !isNaN(v)).sort((a, b) => a - b);
                min = sorted.length ? sorted[Math.floor(sorted.length * 0.05)] : 0;
                max = sorted.length ? sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95))] : 1;
                if (max <= min) max = min + 1;
                const colors = ['#2563eb', '#22c55e', '#eab308', '#dc2626'];
                stops = colors.map((c, i) => [min + (max - min) * i / (colors.length - 1), c] as [number, string]);
            }

            const toRgb = (hex: string) => [1, 3, 5].map(i => parseInt(hex.substring(i, i + 2), 16));

            const colorOf = (v: number | null): string => {
                if (v === null || isNaN(v)) return '#888888';
                // Few color steps: neighbouring points with the same color are drawn as one line
                const step = colorBy === 'grade' ? 1 : (max - min) / 20;
                v = Math.round(v / step) * step;
                if (v <= stops[0][0]) return stops[0][1];
                if (v >= stops[stops.length - 1][0]) return stops[stops.length - 1][1];
                for (let i = 0; i < stops.length - 1; i++) {
                    if (v <= stops[i + 1][0]) {
                        const f = (v - stops[i][0]) / (stops[i + 1][0] - stops[i][0]);
                        const a = toRgb(stops[i][1]);
                        const b = toRgb(stops[i + 1][1]);
                        return '#' + a.map((c, j) => Math.round(c + f * (b[j] - c)).toString(16).padStart(2, '0')).join('');
                    }
                }
                return stops[stops.length - 1][1];
            };

            return { colorOf, stops, min, max };
        },

        /*
         * Splits the track in pieces of the same color. The map engines draw each piece between null separators
         * with its own color; consecutive pieces share their boundary point, so the line has no gaps.
         */
        SplitTrackByColor(mapData: Array<[number, number] | null>, values: Array<number | null>, colorOf: (v: number | null) => string): { mapData: Array<[number, number] | null>, colors: string[] } {

            const outData: Array<[number, number] | null> = [];
            const colors: string[] = [];
            let current: Array<[number, number]> = [];
            let currentColor = '';

            const close = () => {
                if (current.length > 1) {
                    if (outData.length > 0) outData.push(null);
                    outData.push(...current);
                    colors.push(currentColor);
                }
                current = [];
            };

            for (let i = 0; i < mapData.length; i++) {
                const point = mapData[i];
                if (point === null) {
                    close();
                    continue;
                }
                // The segment that ends at this point takes the color of this point
                const color = colorOf(values[i] ?? null);
                if (current.length === 0) {
                    current = [point];
                    currentColor = color;
                } else if (color === currentColor || current.length === 1) {
                    if (current.length === 1) currentColor = color;
                    current.push(point);
                } else {
                    const last = current[current.length - 1];
                    close();
                    current = [last, point];
                    currentColor = color;
                }
            }
            close();

            return { mapData: outData, colors: colors };
        },

        /* Distance in meters between two [lat, lon] points (haversine) */
        Distance(a: [number, number], b: [number, number]): number {
            const r = Math.PI / 180;
            const dLat = (b[0] - a[0]) * r;
            const dLon = (b[1] - a[1]) * r;
            const h = Math.sin(dLat / 2) ** 2 + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(dLon / 2) ** 2;
            return 2 * 6371000 * Math.asin(Math.min(1, Math.sqrt(h)));
        },

        /*
         * Points every `interval` units along the track (the gap between two tracks adds no distance).
         * unitMeters: 1000 for km, 1609.344 for miles, 1852 for nautical miles.
         */
        DistanceMarkers(mapData: Array<[number, number] | null>, interval: number, unitMeters: number): Array<{ point: [number, number], value: number }> {
            const result: Array<{ point: [number, number], value: number }> = [];
            if (!(interval > 0)) return result;
            const step = interval * unitMeters;
            let total = 0;
            let next = step;
            let prev: [number, number] | null = null;
            for (const point of mapData) {
                if (point === null) { prev = null; continue; }
                if (prev !== null) {
                    const d = WPGPXMAPS.Utils.Distance(prev, point);
                    while (d > 0 && total + d >= next) {
                        const f = (next - total) / d;
                        result.push({ point: [prev[0] + (point[0] - prev[0]) * f, prev[1] + (point[1] - prev[1]) * f], value: Math.round(next / unitMeters * 100) / 100 });
                        next += step;
                    }
                    total += d;
                }
                prev = point;
            }
            return result;
        },

        /* Round label for start / end / distance markers */
        MarkerElement(text: string, background: string, size: number = 18): HTMLElement {
            const el = document.createElement('div');
            el.className = 'wpgpxmaps-marker';
            el.textContent = text;
            el.style.cssText = `width:${size}px;height:${size}px;line-height:${size - 4}px;border-radius:50%;background:${background};color:#fff;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.4);font:bold ${text.length > 2 ? 8 : 10}px sans-serif;text-align:center;box-sizing:border-box;`;
            return el;
        },

        /* Legend of the GPX files shown in the same map (name and color of each one) */
        AddTracksLegend(container: HTMLElement, names: string[], colors: string[]): void {
            const legend = document.createElement('div');
            legend.className = 'wpgpxmaps-legend wpgpxmaps-tracks-legend';
            legend.style.cssText = 'position:absolute;left:8px;bottom:30px;z-index:1000;background:rgba(255,255,255,.9);padding:4px 8px;border-radius:4px;font:11px/1.5 sans-serif;color:#222;box-shadow:0 1px 3px rgba(0,0,0,.3);pointer-events:none;max-width:60%';
            names.forEach((name, i) => {
                const row = document.createElement('div');
                const swatch = document.createElement('span');
                swatch.style.cssText = `display:inline-block;width:14px;height:4px;margin-right:6px;vertical-align:middle;border-radius:2px;background:${colors[i % colors.length]}`;
                row.append(swatch, document.createTextNode(name));
                legend.appendChild(row);
            });
            container.appendChild(legend);
        },

        /* Small legend with the color bar, added on top of the map (works with Leaflet and MapBox) */
        AddTrackLegend(container: HTMLElement, title: string, stops: Array<[number, string]>, minLabel: string, maxLabel: string): void {
            const min = stops[0][0];
            const max = stops[stops.length - 1][0];
            const gradient = stops.map(s => `${s[1]} ${Math.round((s[0] - min) / (max - min) * 100)}%`).join(', ');
            const legend = document.createElement('div');
            legend.className = 'wpgpxmaps-legend';
            legend.style.cssText = 'position:absolute;left:8px;bottom:30px;z-index:1000;background:rgba(255,255,255,.9);padding:4px 8px;border-radius:4px;font:11px/1.3 sans-serif;color:#222;box-shadow:0 1px 3px rgba(0,0,0,.3);pointer-events:none';
            const titleEl = document.createElement('div');
            titleEl.textContent = title;
            const bar = document.createElement('div');
            bar.style.cssText = `width:140px;height:8px;margin:3px 0;border-radius:2px;background:linear-gradient(to right, ${gradient})`;
            const labels = document.createElement('div');
            labels.style.cssText = 'display:flex;justify-content:space-between';
            const minEl = document.createElement('span');
            minEl.textContent = minLabel;
            const maxEl = document.createElement('span');
            maxEl.textContent = maxLabel;
            labels.append(minEl, maxEl);
            legend.append(titleEl, bar, labels);
            container.appendChild(legend);
        },

        GetItemFromArray(arr: Array<[number,number]|null>, index: number): [number,number] | null {
            try {
                return arr[index];
            } catch (e) {
                return [0, 0];
            }
        },

        calculateGrade(altitudes : number[], distances: number[]): number[] {
            if (altitudes.length !== distances.length + 1) {
                throw new Error("The number of altitude points must be one more than the number of distances.");
            }
        
            const grades = [];
            for (let i = 0; i < distances.length; i++) {
                const elevationChange = altitudes[i + 1] - altitudes[i];
                const grade = (elevationChange / distances[i]) * 100;
                grades.push(grade);
            }
        
            return grades;
        },
        
         getGradientColor(grade) {
            // Define the color stops
            const colorStops = [
                { grade: 0, color: [0, 255, 0] },      // Green: 0%
                { grade: 5, color: [255, 255, 0] },    // Yellow: 5%
                { grade: 15, color: [255, 0, 0] }      // Red: 15%
            ];
        
            // Function to interpolate between two colors
            function interpolateColor(color1, color2, factor) {
                const result = color1.map((c, i) => Math.round(c + factor * (color2[i] - c)));
                return `rgb(${result.join(",")})`;
            }
        
            // Find the appropriate color range
            let startStop, endStop;
            for (let i = 0; i < colorStops.length - 1; i++) {
                if (grade <= colorStops[i + 1].grade) {
                    startStop = colorStops[i];
                    endStop = colorStops[i + 1];
                    break;
                }
            }
            
            // Calculate the interpolation factor
            const factor = (grade - startStop.grade) / (endStop.grade - startStop.grade);
        
            // Return the interpolated color
            return interpolateColor(startStop.color, endStop.color, factor);
        },
        

    },

};