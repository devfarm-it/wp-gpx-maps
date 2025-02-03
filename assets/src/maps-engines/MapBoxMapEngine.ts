import { Colors } from 'chart.js';
import { WPGPXMAPS } from '../Utils/Utils';
import { MapboxStyleDefinition, MapboxStyleSwitcherControl } from "mapbox-gl-style-switcher";
import mapboxgl, { LngLatBounds, Map, Marker } from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import "mapbox-gl-style-switcher/styles.css";

export class MapBoxMapEngine implements MapEngine<Map> {

    map: Map;
    Bounds: Array<number[]> = [];
    EventSelectChart: null | Function = null;
    CurrentLocationMarker: mapboxgl.Marker | null = null;

    init(targetElement: HTMLElement, mapType: string, scrollWheelZoom: boolean, MapBoxApiKey: string | null | undefined): void {

        this.map = new mapboxgl.Map({
            container: targetElement,
            style: 'mapbox://styles/mapbox/streets-v11',
            accessToken: "pk.eyJ1Ijoic2VjdXJjdWJlbWF4IiwiYSI6ImNsbW94MzRodjE4YjEya3BuM3liZXl6MXYifQ.db3c6nnAcFwFm5jD2NCg6w", // MapBoxApiKey ?? 
            center: [0, 0],
            zoom: 1,
            scrollZoom: scrollWheelZoom
        });

        //this.map.addControl(new MapboxStyleSwitcherControl());
        this.map.addControl(new mapboxgl.NavigationControl());
        this.map.addControl(new mapboxgl.FullscreenControl());

        // 3d terrain
        this.map.on('style.load', () => {
            this.map.addSource('mapbox-dem', {
                'type': 'raster-dem',
                'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
                'tileSize': 512,
                'maxzoom': 14
            });
            // add the DEM source as a terrain layer with exaggerated height
            this.map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
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

        return new mapboxgl.Marker().setLngLat([ll[1], ll[0]]).addTo(this.map);

    }

    AppPolylines(mapData: Array<[number, number] | null>, colors: string[], currentIcon: string | null, startIcon: string | null, endIcon: string | null): void {

        this.Bounds = mapData.filter(o => o != null);

        this.map.on('load', () => {

            const pointsArray = WPGPXMAPS.Utils.DividePolylinesPoints(mapData);

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
                    this._addMarker(ll, startIcon,null);
                }

            }

            if (endIcon != '' && mapData[mapData.length - 1] != null) {

                let ll = mapData[mapData.length - 1];

                if (ll != null) {
                    this._addMarker(ll, endIcon,null);
                }

            }

            this.CenterMap();

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

                this.map?.fitBounds(new mapboxgl.LngLatBounds(sw, ne), { padding: 20, animate: false });

            }

        } catch (error) {
            console.log(error);
        }

        //throw new Error('Method not implemented.');        
    }

    AddPhotos(photos: any[]): void {

        //new ClusterPhotos(this.map).populate(photos)
    }

}