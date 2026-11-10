import { WPGPXMAPS } from '../Utils/Utils';
import * as maplibregl from 'maplibre-gl';
import { ControlPosition, GeoJSONSource, IControl, LngLat, Map, Marker, StyleSpecification } from 'maplibre-gl';
import * as turf from '@turf/turf';
import { fallbackWithoutBaseMap, styleMenu, wheelZoomInFullscreen } from '../Utils/MapControls';

import 'maplibre-gl/dist/maplibre-gl.css';

/*
 * MapLibre GL JS: open source (BSD) vector maps and 3D terrain, without an API key.
 * Same features of the Mapbox engine, with free map styles (OpenFreeMap vector maps, OpenStreetMap raster maps).
 */

// The worker is copied next to this file by the build (vite.config.ts), with the MapLibre version in its name.
// import.meta.url is in a variable: Vite rewrites new URL('...', import.meta.url) as relative to the page.
declare const __MAPLIBRE_WORKER__: string;
const moduleUrl = import.meta.url;
const workerUrl = new URL(__MAPLIBRE_WORKER__, moduleUrl).href;
// Started from a blob of the page, the worker belongs to the page: a service worker of the page (a page saved for
// offline use) also answers its downloads (the worker file, tiles, fonts), which a worker at its own address would not get
let workerStart = workerUrl;
try {
    workerStart = URL.createObjectURL(new Blob([`import ${JSON.stringify(workerUrl)};`], { type: 'text/javascript' }));
} catch (e) {
    workerStart = workerUrl;
}
maplibregl.setWorkerUrl(workerStart);

const osm = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

/* Raster map (the same tiles of the Leaflet maps) as a MapLibre style */
function rasterStyle(tiles: string[], attribution: string, maxzoom: number = 19): StyleSpecification {
    return {
        version: 8,
        sources: {
            raster: { type: 'raster', tiles: tiles, tileSize: 256, attribution: attribution, maxzoom: maxzoom }
        },
        layers: [{ id: 'raster', type: 'raster', source: 'raster' }]
    };
}

/*
 * Styles of the switcher: the key is the value of the setting / shortcode (maplibrestyle).
 * Only tile servers that allow CORS: MapLibre fetches the tiles (CyclOSM does not allow it, a map with it stays empty).
 */
export const MapLibreStyles: { [key: string]: { title: string, style: () => string | StyleSpecification } } = {
    liberty: { title: 'Liberty', style: () => 'https://tiles.openfreemap.org/styles/liberty' },
    bright: { title: 'Bright', style: () => 'https://tiles.openfreemap.org/styles/bright' },
    positron: { title: 'Positron', style: () => 'https://tiles.openfreemap.org/styles/positron' },
    osm: { title: 'OpenStreetMap', style: () => rasterStyle(['https://tile.openstreetmap.org/{z}/{x}/{y}.png'], osm) },
    topo: { title: 'OpenTopoMap', style: () => rasterStyle(['a', 'b', 'c'].map(s => `https://${s}.tile.opentopomap.org/{z}/{x}/{y}.png`), osm + ', <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)', 17) },
};

/* Free elevation tiles (Mapterhorn, open data) for the 3D terrain */
const terrainTileJson = 'https://tiles.mapterhorn.com/tilejson.json';

/* Height of the 3D terrain: 1 is real, the default 1.5 makes small hills visible */
export function terrainExaggeration(params: any): number {
    const value = Number(params?.MapTerrainExaggeration);
    return value > 0 ? Math.min(3, value) : 1.5;
}

/* Map style menu (MapControls.ts), with "Custom" first when the style is the URL of a style.json */
class StyleSwitcherControl implements IControl {

    container: HTMLElement;

    constructor(private current: string, private onChange: (key: string) => void) { }

    onAdd(map: Map): HTMLElement {
        const items = Object.keys(MapLibreStyles).map(key => ({ key: key, title: MapLibreStyles[key].title }));
        if (!MapLibreStyles[this.current]) {
            items.unshift({ key: this.current, title: 'Custom' });
        }
        this.container = styleMenu('maplibregl', items, this.current, this.onChange);
        return this.container;
    }

    onRemove(map: Map) {
        this.container.remove();
    }
}

class FlyoverControl implements IControl {

    container: HTMLElement;

    start: number = 0.0;
    animationDuration: number = 80000;
    cameraAltitude: number = 1000;

    route: Array<number[]> = [];
    routeDistance: number = 0.0;

    map: Map;

    iconDefault: string;

    isPlaying: boolean = false;

    constructor(pluginUrl: string) {
        // pluginUrl is plugins_url(): works also when WordPress is installed in a subfolder
        this.iconDefault = pluginUrl + '/wp-gpx-maps/img/map-play-svgrepo-com.svg';
    }

    onAdd(map: Map): HTMLElement {

        this.map = map;

        this.container = document.createElement('div');
        this.container.className = 'maplibregl-ctrl maplibregl-ctrl-group mapboxgl-wp-gpx-maps';
        this.container.innerHTML = `<button type='button' style='background: url(${this.iconDefault}) center / 70% no-repeat;'>&nbsp;</button>`;
        this.container.onclick = () => {
            this.isPlaying = !this.isPlaying;
            if (this.isPlaying) {
                this.routeDistance = turf.length(turf.lineString(this.route));
                window.requestAnimationFrame((time) => this._animationFrame(time));
            }
        };
        return this.container;
    }

    _pointAt(distance: number): LngLat {
        const c = turf.along(turf.lineString(this.route), Math.max(0, Math.min(this.routeDistance, distance))).geometry.coordinates;
        return new LngLat(c[0], c[1]);
    }

    _animationFrame(time: number) {

        if (this.isPlaying == false) {
            this.start = 0.0;
            return;
        }

        if (!this.start) this.start = time;
        // phase is normalized between 0 and 1, then the animation starts again
        const phase = (time - this.start) / this.animationDuration;
        if (phase > 1) {
            this.start = 0.0;
        }

        // The camera follows the track, 1 km behind the point it looks at
        const distance = this.routeDistance * Math.min(phase, 1);
        const target = this._pointAt(distance);
        const camera = this._pointAt(distance - 1);
        const ground = Math.max(this.map.queryTerrainElevation(target) ?? 0, this.map.queryTerrainElevation(camera) ?? 0);

        this.map.jumpTo(this.map.calculateCameraOptionsFromTo(camera, ground + this.cameraAltitude, target, ground));

        window.requestAnimationFrame((time) => this._animationFrame(time));
    }

    onRemove(map: Map) {
        this.container.remove();
    }

    getDefaultPosition?: () => ControlPosition;
}

export class MapLibreMapEngine implements MapEngine<Map> {

    map: Map;
    Bounds: Array<number[]> = [];
    EventSelectChart: null | Function = null;
    CurrentLocationMarker: Marker | null = null;

    flyoverControl: FlyoverControl | null = null;
    otherParams: any;
    markersAdded: boolean = false;
    routeData: any = null;

    animateLineOptions: any = {
        SpeedFactor: 30, // number of frames per longitude degree
        StartTime: 0,
        Progress: 0
    }

    init(targetElement: HTMLElement, mapType: string, scrollWheelZoom: boolean, TFApiKey: string | null | undefined, otherParams: any): void {

        this.otherParams = otherParams;

        // Style from the shortcode / block or from the settings: one of MapLibreStyles or the URL of a style.json
        let styleKey = otherParams?.MapLibreStyle || 'liberty';
        if (!MapLibreStyles[styleKey] && !/^https:\/\//.test(styleKey)) {
            styleKey = 'liberty';
        }
        const styleOf = (key: string) => MapLibreStyles[key] ? MapLibreStyles[key].style() : key;

        this.map = new maplibregl.Map({
            container: targetElement,
            style: styleOf(styleKey),
            center: [0, 0],
            zoom: 1,
            maxPitch: 85,
            scrollZoom: scrollWheelZoom
        });
        fallbackWithoutBaseMap(this.map);

        this.flyoverControl = new FlyoverControl(otherParams?.pluginUrl ?? '/wp-content/plugins');

        // All the controls on the right, in this order: zoom and compass, full screen, map style, flyover
        this.map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');
        this.map.addControl(new maplibregl.FullscreenControl(), 'top-right');
        // Without diff the whole style is loaded again and 'style.load' adds the track and the terrain again
        this.map.addControl(new StyleSwitcherControl(styleKey, (key) => this.map.setStyle(styleOf(key), { diff: false })), 'top-right');
        this.map.addControl(this.flyoverControl, 'top-right');

        wheelZoomInFullscreen(targetElement, (enabled) => enabled ? this.map.scrollZoom.enable() : this.map.scrollZoom.disable(), scrollWheelZoom);

        this.map.on('style.load', () => {

            if (otherParams.MapBoxFog) {
                this.map.setSky({
                    'sky-color': '#add8e6',
                    'horizon-color': '#ffffff',
                    'fog-color': '#ffffff',
                    'sky-horizon-blend': 0.5,
                    'horizon-fog-blend': 0.3,
                    'fog-ground-blend': 0.6
                });
            }

            if (otherParams.MapBox3dTerrain) {
                this.map.addSource('wpgpxmaps-dem', {
                    'type': 'raster-dem',
                    'url': terrainTileJson
                });
                this.map.setTerrain({ 'source': 'wpgpxmaps-dem', 'exaggeration': terrainExaggeration(otherParams) });
            }

            /* Shaded relief, also without 3D terrain: under the labels of the vector styles (a separate source renders better) */
            if (otherParams.MapHillshade) {
                this.map.addSource('wpgpxmaps-hillshade', {
                    'type': 'raster-dem',
                    'url': terrainTileJson
                });
                const firstSymbol = this.map.getStyle().layers.find(layer => layer.type == 'symbol');
                this.map.addLayer({
                    'id': 'wpgpxmaps-hillshade',
                    'type': 'hillshade',
                    'source': 'wpgpxmaps-hillshade',
                    'paint': { 'hillshade-shadow-color': '#473B24', 'hillshade-exaggeration': 0.4 }
                }, firstSymbol?.id);
            }

        });

    }

    _addMarker(ll: [number, number], icon: string | null, popup: Function | null): Marker {

        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = `url(${icon})`;
        el.style.width = '32px';
        el.style.height = '32px';
        el.style.backgroundSize = '100%';

        el.addEventListener('click', (e) => {
            popup?.call(this, e);
        });

        return new maplibregl.Marker({ element: el }).setLngLat([ll[1], ll[0]]).addTo(this.map);
    }

    AppPolylines(mapData: Array<[number, number] | null>, colors: string[], currentIcon: string | null, startIcon: string | null, endIcon: string | null): void {

        this.Bounds = mapData.filter(o => o != null);

        this.map.on('style.load', () => {

            const pointsArray = WPGPXMAPS.Utils.DividePolylinesPoints(mapData);

            this.flyoverControl.route = this.Bounds.map((point) => [point[1], point[0]]);

            this.routeData = {
                'type': 'FeatureCollection',
                'features': pointsArray.map((points, i) => ({
                    'type': 'Feature',
                    'properties': {
                        color: (i < colors.length ? colors[i] : colors[colors.length - 1])
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': points.map((point) => [point[1], point[0]])
                    }
                }))
            };

            this.map.addSource('route', { 'type': 'geojson', 'data': this.routeData });

            this.map.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': ['get', 'color'],
                    'line-width': 3
                }
            });

            // 'style.load' runs again every time the style is changed: the route layer must be added again, the markers not
            if (this.markersAdded || !mapData.some(o => o != null)) {
                return;
            }
            this.markersAdded = true;

            /* Hover on the track: move the marker and show the point in the chart (handlers stay when the style changes) */
            this.map.on('mousemove', 'route', (e) => {
                this.map.getCanvas().style.cursor = 'pointer';
                this.MoveMarkerToPosition([e.lngLat.lat, e.lngLat.lng], true);
            });
            this.map.on('mouseleave', 'route', () => {
                this.map.getCanvas().style.cursor = '';
            });

            if ('' == currentIcon || null == currentIcon) {
                currentIcon = 'https://maps.google.com/mapfiles/kml/pal4/icon25.png';
            }

            this.CurrentLocationMarker = this._addMarker(this.Bounds[0] as [number, number], currentIcon, null);

            if (startIcon) {
                this._addMarker(this.Bounds[0] as [number, number], startIcon, null);
            }

            if (endIcon) {
                this._addMarker(this.Bounds[this.Bounds.length - 1] as [number, number], endIcon, null);
            }

            this.CenterMap();

            if (this.otherParams.MapBoxAnimateOnLoading == '1') {
                this.animateLineOptions.StartTime = performance.now();
                this.animateLine();
            }

        });

    }

    AddWaypoints(waypoints: any, waypointIcon: string | null): void {

        const defaultIcon = waypointIcon ? waypointIcon : 'https://maps.google.com/mapfiles/ms/micons/flag.png';

        for (const wpt of waypoints) {

            this.Bounds.push([wpt.lat, wpt.lon]);

            // name and desc are already HTML-escaped by PHP (esc_html)
            let cnt = wpt.name == '' ? `<div>${wpt.desc}</div>` : `<div><b>${wpt.name}</b><br />${wpt.desc}</div>`;
            cnt += `<p><a href='https://maps.google.com?daddr=${wpt.lat},${wpt.lon}' target='_blank' rel='noopener noreferrer'>Itin&eacute;raire</a></p>`;

            const marker = this._addMarker([wpt.lat, wpt.lon], wpt.img ? wpt.img : defaultIcon, null);
            marker.setPopup(new maplibregl.Popup({ offset: 16 }).setHTML(cnt));
        }

        this.CenterMap();
    }

    MoveMarkerToPosition(LatLon: [number, number], updateChart: boolean): void {

        this.CurrentLocationMarker?.setLngLat([LatLon[1], LatLon[0]]);

        if (true == updateChart && this.EventSelectChart) {
            this.EventSelectChart(LatLon);
        }
    }

    SetCurrentGPSPosition(LatLon: [number, number], currentpositioncon: string, lng: LangTranslation): void {
    }

    AddHtmlMarker(LatLon: [number, number], element: HTMLElement, title?: string): void {
        if (title) {
            element.title = title;
        }
        new maplibregl.Marker({ element: element }).setLngLat([LatLon[1], LatLon[0]]).addTo(this.map);
    }

    CenterMap(): void {

        if (!this.map || !this.Bounds || this.Bounds.length == 0) {
            return;
        }

        const bounds = new maplibregl.LngLatBounds();
        for (const [lat, lng] of this.Bounds) {
            bounds.extend([lng, lat]);
        }

        /* Initial 3D view: tilt (pitch) and rotation (bearing) set in the shortcode / block */
        const pitch = Number(this.otherParams?.MapBoxPitch) || 0;
        const bearing = Number(this.otherParams?.MapBoxBearing) || 0;
        this.map.fitBounds(bounds, { padding: pitch > 0 ? 60 : 30, animate: false, pitch: pitch, bearing: bearing });
    }

    AddPhotos(photos: any[]): void {

        for (const photo of photos) {
            const marker = this._addMarker([photo.lat, photo.lng], photo.thumbnail, () => {
                const galleryEl = document.querySelector(`a[data-image-id='${photo.image_id}']`);
                (galleryEl as HTMLAnchorElement)?.click();
            });
            const el = marker.getElement();
            el.classList.add('wp-gpx-maps-photo-marker');
            el.style.width = '40px';
            el.style.height = '40px';
        }
    }

    /* Animation on load: the track is drawn from the start to the end */
    animateLine(timestamp: number | null = null) {

        const source = this.map.getSource('route') as GeoJSONSource;

        if (timestamp == null) {
            // first call: a copy of the track that starts empty (the first segment is drawn, as in the Mapbox engine)
            this.animateLineOptions.Data = JSON.parse(JSON.stringify(this.routeData));
            this.animateLineOptions.Coordinates = this.routeData.features[0].geometry.coordinates;
        } else {
            this.animateLineOptions.Progress = timestamp - this.animateLineOptions.StartTime;
        }

        const duration = this.animateLineOptions.SpeedFactor * 360;
        const len = this.animateLineOptions.Coordinates.length;
        const slice = Math.min(len, Math.floor(len * Math.max(0, this.animateLineOptions.Progress) / duration));

        this.animateLineOptions.Data.features[0].geometry.coordinates = this.animateLineOptions.Coordinates.slice(0, slice);
        source.setData(this.animateLineOptions.Data);

        if (slice < len) {
            requestAnimationFrame((time) => this.animateLine(time));
        }
    }

}
