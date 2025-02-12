import { WPGPXMAPS } from '../Utils/Utils';
import { MapboxStyleDefinition, MapboxStyleSwitcherOptions, MapboxStyleSwitcherControl } from "mapbox-gl-style-switcher";
import mapboxgl, { ControlPosition, GeoJSONSource, IControl, LngLatBounds, Map, Marker } from 'mapbox-gl';
import * as turf from '@turf/turf';

import 'mapbox-gl/dist/mapbox-gl.css';
import "mapbox-gl-style-switcher/styles.css";

class AnumationControl implements IControl {

    container: HTMLElement;

    start: number = 0.0;
    animationDuration: number = 80000;
    cameraAltitude: number = 1000;

    targetRoute: Array<number[]> = [];
    cameraRoute: Array<number[]> = [];

    map: Map;

    iconDefault: string = '/wp-content/plugins/wp-gpx-maps/img/map-play-svgrepo-com.svg';
    iconStop: string = '/wp-content/plugins/wp-gpx-maps/img/stop-svgrepo-com.svg';

    routeDistance: number = 0.0;
    cameraRouteDistance: number = 0.0;

    isPlaying: boolean = false;

    onAdd(map: Map): HTMLElement {

        this.map = map;

        this.container = document.createElement('div');
        this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group mapboxgl-wp-gpx-maps';
        this.container.innerHTML = `<button style='background-image: url(${this.iconDefault});'>&nbsp;</div>`;
        this.container.onclick = () => {
            // Your custom logic here

            if (this.isPlaying == false) {
                this.isPlaying = true;
                this._playAnimation();
            }
            else {
                this.isPlaying = false;
            }
        };
        return this.container;
    }

    _animationFrame(time) {

        if (this.isPlaying == false) {
            this.start = 0.0;
            return;
        }

        if (!this.start) this.start = time;
        // phase determines how far through the animation we are
        const phase = (time - this.start) / this.animationDuration;

        // phase is normalized between 0 and 1
        // when the animation is finished, reset start to loop the animation
        if (phase > 1) {
            // wait 1.5 seconds before looping
            setTimeout(() => {
                this.start = 0.0;
            }, 1500);
        }

        // use the phase to get a point that is the appropriate distance along the route
        // this approach syncs the camera and route positions ensuring they move
        // at roughly equal rates even if they don't contain the same number of points
        const alongRoute = turf.along(
            turf.lineString(this.targetRoute),
            this.routeDistance * phase
        ).geometry.coordinates;

        const alongCamera = turf.along(
            turf.lineString(this.cameraRoute),
            this.cameraRouteDistance * phase
        ).geometry.coordinates;

        const camera = this.map.getFreeCameraOptions();

        // set the position and altitude of the camera
        camera.position = mapboxgl.MercatorCoordinate.fromLngLat(
            {
                lng: alongCamera[0],
                lat: alongCamera[1]
            },
            this.cameraAltitude
        );

        // tell the camera to look at a point along the route
        camera.lookAtPoint({
            lng: alongRoute[0],
            lat: alongRoute[1]
        });

        this.map.setFreeCameraOptions(camera);

        window.requestAnimationFrame((time) => this._animationFrame(time));
    }

    _stopAnimation() {

    }

    _playAnimation() {

        this.cameraRouteDistance = turf.lineDistance(
            turf.lineString(this.cameraRoute)
        );

        this.routeDistance = turf.lineDistance(
            turf.lineString(this.targetRoute)
        );

        window.requestAnimationFrame((time) => this._animationFrame(time));
    }

    onRemove(map: Map) {
        this.container.remove();
    }

    getDefaultPosition?: () => ControlPosition;
    _setLanguage?: (language?: string | string[]) => void;


}

export class MapBoxMapEngine implements MapEngine<Map> {

    map: Map;
    Bounds: Array<number[]> = [];
    EventSelectChart: null | Function = null;
    CurrentLocationMarker: mapboxgl.Marker | null = null;

    animationControl: AnumationControl | null = null;
    otherParams: any;

    animateLineOptions: any = {
        SpeedFactor: 30, // number of frames per longitude degree
        Animation: null, // to store and cancel the animation
        StartTime: 0,
        Progress: 0, // progress = timestamp - startTime
        ResetTime: false // indicator of whether time reset is needed for the animation
    }

    init(targetElement: HTMLElement, mapType: string, scrollWheelZoom: boolean, MapBoxApiKey: string | null | undefined, otherParams: any): void {

        this.otherParams = otherParams;

        this.map = new mapboxgl.Map({
            container: targetElement,
            style: 'mapbox://styles/mapbox/streets-v11',
            accessToken: "pk.eyJ1Ijoic2VjdXJjdWJlbWF4IiwiYSI6ImNsbW94MzRodjE4YjEya3BuM3liZXl6MXYifQ.db3c6nnAcFwFm5jD2NCg6w", // MapBoxApiKey ?? 
            center: [0, 0],
            zoom: 1,
            scrollZoom: scrollWheelZoom
        });

        this.animationControl = new AnumationControl();

        this.map.addControl(new mapboxgl.NavigationControl());
        this.map.addControl(new mapboxgl.FullscreenControl());

        const styles: MapboxStyleDefinition[] = [
            { uri: 'mapbox://styles/mapbox/standard', title: 'Standard' },
            { uri: 'mapbox://styles/mapbox/standard-satellite', title: 'Standard Satelite' },
            { uri: 'mapbox://styles/mapbox/streets-v12', title: 'Streets' },
            { uri: 'mapbox://styles/mapbox/outdoors-v12', title: 'Outdoors' },
            { uri: 'mapbox://styles/mapbox/light-v11', title: 'Light' },
            { uri: 'mapbox://styles/mapbox/dark-v11', title: 'Dark' },
            { uri: 'mapbox://styles/mapbox/satellite-v9', title: 'Satellite' },
            { uri: 'mapbox://styles/mapbox/satellite-streets-v12', title: 'Satellite Streets' },
            { uri: 'mapbox://styles/mapbox/navigation-day-v1', title: 'Navigation Day' },
            { uri: 'mapbox://styles/mapbox/navigation-night-v1', title: 'Navigation Night' }
        ];

        // Pass options (optional)
        const options: MapboxStyleSwitcherOptions = {
            defaultStyle: "Satellite Streets",
            eventListeners: {
                // return true if you want to stop execution
                //           onOpen: (event: MouseEvent) => boolean;
                //           onSelect: (event: MouseEvent) => boolean;
                //           onChange: (event: MouseEvent, style: string) => boolean;
            }
        };

        this.map.addControl(new MapboxStyleSwitcherControl() as IControl, 'top-left');
        this.map.addControl(this.animationControl);

        this.map.on('style.load', async () => {

            if (otherParams.MapBoxFog) {

                // Add daytime fog
                this.map.setFog({
                    'range': [-1, 2],
                    'horizon-blend': 0.3,
                    'color': 'white',
                    'high-color': '#add8e6',
                    'space-color': '#d8f2ff',
                    'star-intensity': 0.0
                });

            }

            if (otherParams.MapBox3dTerrain) {

                // 3d terrain
                this.map.addSource('mapbox-dem', {
                    'type': 'raster-dem',
                    'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
                    'tileSize': 512,
                    'maxzoom': 14
                });

                // add the DEM source as a terrain layer with exaggerated height
                this.map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

            }

        });

    }

    _addMarker(ll: [number, number], icon: string | null, popup: Function | null): Marker {

        // Create a DOM element for each marker.
        const el = document.createElement('div');
        const width = 32;
        const height = 32;
        el.className = 'marker';
        el.style.backgroundImage = `url(${icon})`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = '100%';

        el.addEventListener('click', (e) => {
            popup?.call(this, e);
        });

        return new mapboxgl.Marker(el).setLngLat([ll[1], ll[0]]).addTo(this.map);

    }

    AppPolylines(mapData: Array<[number, number] | null>, colors: string[], currentIcon: string | null, startIcon: string | null, endIcon: string | null): void {

        this.Bounds = mapData.filter(o => o != null);

        this.map.on('style.load', async () => {

            const pointsArray = WPGPXMAPS.Utils.DividePolylinesPoints(mapData);

            const LngLatRute = this.Bounds.map((point) => [point[1], point[0]]);
            this.animationControl.cameraRoute = LngLatRute;
            this.animationControl.targetRoute = LngLatRute;

            this.map.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': pointsArray.map((points, i) => {

                        return ({
                            'type': 'Feature',
                            'properties': {
                                color: (i < colors.length ? colors[i] : colors[colors.length - 1])
                            },
                            'geometry': {
                                'type': 'LineString',
                                'coordinates': points.map((point) => [point[1], point[0]])
                            }
                        });
                    })

                }
            });

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

            if ('' == currentIcon || null == currentIcon) {
                currentIcon = 'https://maps.google.com/mapfiles/kml/pal4/icon25.png';
            }

            this.CurrentLocationMarker = this._addMarker(mapData[0], currentIcon, (e) => {


            });


            if (startIcon != '') {

                let ll = mapData[0];

                if (ll != null) {
                    this._addMarker(ll, startIcon, null);
                }

            }

            if (endIcon != '' && mapData[mapData.length - 1] != null) {

                let ll = mapData[mapData.length - 1];

                if (ll != null) {
                    this._addMarker(ll, endIcon, null);
                }

            }

            this.CenterMap();


            if (this.otherParams.MapBoxAnimateOnLoading == '1') {

                this.animateLineOptions.StartTime = performance.now();
                this.animateLine();
            }

        });

    }
    AddWaypoints(waypoints: any, waypointIcon: string | null): void {
        //throw new Error('Method not implemented.');
    }
    MoveMarkerToPosition(LatLon: [number, number], updateChart: boolean): void {

        this.CurrentLocationMarker?.setLngLat([LatLon[1], LatLon[0]]);

        //throw new Error('Method not implemented.');
    }
    SetCurrentGPSPosition(LatLon: [number, number], currentpositioncon: string, lng: LangTranslation): void {
        ///throw new Error('Method not implemented.');
    }
    CenterMap(): void {

        try {

            if (this.Bounds && this.Bounds.length > 0) {

                let bounds = {
                    minLat: Number.POSITIVE_INFINITY,
                    maxLat: Number.NEGATIVE_INFINITY,
                    minLng: Number.POSITIVE_INFINITY,
                    maxLng: Number.NEGATIVE_INFINITY
                };

                this.Bounds.forEach(coord => {
                    if (!Array.isArray(coord) || coord.length !== 2) {
                        throw new Error("Each coordinate must be an array with [latitude, longitude].");
                    }

                    const [lat, lng] = coord;
                    bounds.minLat = Math.min(bounds.minLat, lat);
                    bounds.maxLat = Math.max(bounds.maxLat, lat);
                    bounds.minLng = Math.min(bounds.minLng, lng);
                    bounds.maxLng = Math.max(bounds.maxLng, lng);
                });

                const sw = new mapboxgl.LngLat(bounds.minLng, bounds.minLat);
                const ne = new mapboxgl.LngLat(bounds.maxLng, bounds.maxLat);

                this.map?.fitBounds(new mapboxgl.LngLatBounds(sw, ne), { padding: 30, animate: false });

            }

        } catch (error) {
            console.log(error);
        }

        //throw new Error('Method not implemented.');        
    }

    AddPhotos(photos: any[]): void {

        const width = 40;
        const height = 40;

        for (const photo of photos) {
            let _m = this._addMarker([photo.lat, photo.lng], photo.thumbnail, (e) => {
                let _selector = `a[data-image-id='${photo.image_id}']`;
                let galleryEl = document.querySelector(_selector);
                (galleryEl as HTMLAnchorElement)?.click()
            });
            _m._element.classList.add('wp-gpx-maps-photo-marker');
            _m._element.style.width = `${width}px`;
            _m._element.style.height = `${height}px`;
            //_m.setPopup(new mapboxgl.Popup({ maxWidth: "900px"}).setHTML(`<img src='${photo.url}' alt='${photo.name}' />`));

        }

        //new ClusterPhotos(this.map).populate(photos)
    }

    // animated in a circle as a sine wave along the map.
    animateLine(timestamp: number | null = null) {

        if (timestamp == null) {
            // fist call
            var geojson = (this.map.getSource('route') as GeoJSONSource)._data;
            this.animateLineOptions.ruteJeoJson = geojson;
            this.animateLineOptions.ruteCoordinates = (geojson as any).features[0].geometry.coordinates;
            (geojson as any).features[0].geometry.coordinates = [];
        }

        if (this.animateLineOptions.ResetTime) {
            // resume previous progress
            this.animateLineOptions.sta = performance.now() - this.animateLineOptions.Progress;
            this.animateLineOptions.ResetTime = false;
        } else {
            this.animateLineOptions.Progress = timestamp - this.animateLineOptions.StartTime;
        }

        if (this.animateLineOptions.Progress < 0)
            this.animateLineOptions.Progress = 0;

        // restart if it finishes a loop
        if (this.animateLineOptions.Progress > this.animateLineOptions.SpeedFactor * 360) {
            this.animateLineOptions.startTime = timestamp;

            // stop the animation 
            return;

        } else {

            let len = this.animateLineOptions.ruteCoordinates.length;
            let slice = Math.floor(len * this.animateLineOptions.Progress / (this.animateLineOptions.SpeedFactor * 360));

            this.animateLineOptions.ruteJeoJson.features[0].geometry.coordinates =
                this.animateLineOptions.ruteCoordinates.slice(0, slice);

            // then update the map
            var s = (this.map.getSource('route') as GeoJSONSource).setData(this.animateLineOptions.ruteJeoJson);
        }
        // Request the next frame of the animation.
        this.animateLineOptions.animation = requestAnimationFrame((time) => this.animateLine(time));
    }



}