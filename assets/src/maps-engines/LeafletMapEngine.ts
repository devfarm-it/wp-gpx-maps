import L, { Layer, Map, Marker, Polyline, Polygon } from 'leaflet';
import 'leaflet.fullscreen/Control.FullScreen.js';
import 'leaflet.fullscreen';
import 'leaflet.markercluster';
import { WPGPXMAPS } from '../Utils/Utils';

import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet.fullscreen/Control.FullScreen.css';

class ClusterPhotos {

    map: Map | null = null;

    shownLayer: Layer | null = null;
    polygon: Polygon | null = null;
    markers: any | null = null;

    options: {
        icon: {
            iconSize: [40, 40],
        },
    };


    constructor(map: Map) {

        this.map = map;

        //Custom radius and icon create function
        this.markers = (L as any).markerClusterGroup({
            maxClusterRadius: 120,
            iconCreateFunction: function (cluster) {
                return new L.DivIcon(
                    L.extend(
                        {
                            className: "leaflet-marker-photo",
                            html:
                                '<div style="background-image: url(' +
                                cluster.getAllChildMarkers()[0].photo.thumbnail +
                                ');"></div>​<b>' +
                                cluster.getChildCount() +
                                "</b>",
                        },
                        this.icon
                    )
                );
            },
            //Disable all of the defaults:
            spiderfyOnMaxZoom: false, showCoverageOnHover: false, zoomToBoundsOnClick: false
        });

        this.markers.on('click', function (evt: any) {
            var photo = evt.layer.photo;
            var template = '<img src="{url}" /></a><p>{name}</p>';
            evt.layer.bindPopup(L.Util.template(template, photo), {
                minWidth: 'auto'
            }).openPopup();
        });

        this.markers.on('clustermouseover', function (a) {
            this.removePolygon();

            a.layer.setOpacity(0.2);
            this.shownLayer = a.layer;
            this.polygon = L.polygon(a.layer.getConvexHull());
            this.map.addLayer(this.polygon);
        });
        this.markers.on('clustermouseout', this.removePolygon);
        this.map.on('zoomend', this.removePolygon);

        this.map.addLayer(this.markers);

    }

    populate(images: any[]) {

        for (const photo of images) {

            var m = L.marker(L.latLng(photo.lat, photo.lng), {
                icon: L.divIcon(
                    L.extend(
                        {
                            html:
                                '<div style="background-image: url(' +
                                photo.thumbnail +
                                ');"></div>',
                            className: "leaflet-marker-photo",
                        },
                        photo,
                        {
                            iconSize: [40, 40],
                        }
                    )
                ),
                title: photo.caption || "",
            });
            this.markers.addLayer(m);
        }

        return false;
    }


    private removePolygon() {
        if (this.shownLayer) {
            (this.shownLayer as any).setOpacity(1);
            this.shownLayer = null;
        }
        if (this.polygon) {
            this.map.removeLayer(this.polygon);
            this.polygon = null;
        }
    };


}

export class LeafletMapEngine implements MapEngine<Map> {

    Bounds: Array<number[]> = [];
    lng: LangTranslation | null = null;
    map: Map | null = null;
    EventSelectChart: null | Function = null;
    Polylines: Array<Polyline> = [];
    CurrentPositionMarker: Marker | null = null;
    CurrentGPSPositionMarker: Marker | null = null;

    constructor() {
    }

    init(targetElement: HTMLElement, mapType: string, scrollWheelZoom: boolean, ThunderforestApiKey: string | null | undefined): void {

        this.map = L.map(targetElement,
            {
                scrollWheelZoom: scrollWheelZoom
            }
        );

        // create fullscreen control. 
        var fsControl = new (L as any).Control.FullScreen();

        // Add fullscreen control to the map. 
        this.map.addControl(fsControl);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        var hasThunderforestApiKey = (ThunderforestApiKey + '').length > 0;

        var baseMaps: any = {};

        var overlayMaps = {};

        var defaultMpaLayer = null;

        if (hasThunderforestApiKey) {

            /* Map type: Thunderforest - OpenCycleMap with API key */
            baseMaps['Thunderforest - Cycle'] = L.tileLayer('https://a.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=' + ThunderforestApiKey, {
                maxZoom: 18,
                attribution: 'Maps &copy; <a href="https://www.thunderforest.com/">Thunderforest</a> contributors, ' +
                    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            });

        } else {

            /* Map type: Open Cycle Map - Cycle */
            baseMaps['Open Cycle Map'] = L.tileLayer('http://a.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: 'Maps &copy; <a href="https://www.thunderforest.com/">Thunderforest</a> contributors, ' +
                    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            });

        }

        /* Map type: Thunderforest - Outdoors with API key */
        baseMaps['Thunderforest - Outdoors'] = L.tileLayer('https://a.tile.thunderforest.com/outddors/{z}/{x}/{y}.png?apikey=' + ThunderforestApiKey, {
            maxZoom: 18,
            attribution: 'Maps &copy; <a href="https://www.thunderforest.com/">Thunderforest</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        });

        /* Map type: Thunderforest - Transport with API key */
        baseMaps['Thunderforest - Transport'] = L.tileLayer('https://a.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=' + ThunderforestApiKey, {
            maxZoom: 18,
            attribution: 'Maps &copy; <a href="https://www.thunderforest.com/">Thunderforest</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        });

        /* Map type: Thunderforest - Landscape with API key */
        baseMaps['Thunderforest - Landscape'] = L.tileLayer('https://a.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=' + ThunderforestApiKey, {
            maxZoom: 18,
            attribution: 'Maps &copy; <a href="https://www.thunderforest.com/">Thunderforest</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        });

        /* Map type: Open Street Map */
        baseMaps['Open Street Map'] = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Maps &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        });

        ///* Map type: MapToolKit - Terrain */
        //baseMaps['MapToolKit - Terrain'] = L.tileLayer( 'https://tile2.maptoolkit.net/terrain/{z}/{x}/{y}.png', {
        //	maxZoom: 18,
        //	attribution: 'Maps &copy; <a href="https://www.maptoolkit.net/">Maptoolkit</a> contributors, ' +
        //		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        //		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        //});

        /* Map type: Open Street Map - Humanitarian Map Style */
        baseMaps['Humanitarian Map Style'] = L.tileLayer('https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Maps &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        });

        /*
        Map type: Open Ski Map
        baseMaps['Open Ski Map'] = L.tileLayer( 'http://tiles.skimap.org/openskimap/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        });
        */

        /* Map type: Hike & Bike */
        baseMaps['Hike & Bike'] = L.tileLayer('http://toolserver.org/tiles/hikebike/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Maps &copy; <a href="https://hikebikemap.org/">Hike & Bike Map</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        });

        /* Map type: Open Sea Map */
        baseMaps['Open Sea Map'] = L.tileLayer('http://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Maps &copy; <a href="https://www.openseamap.org/">OpenSeaMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        });

        baseMaps['GSI Map (Japan)'] = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">国土地理院</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        });

        switch (mapType) {

            /* Map type: Open Street Map */
            case 'OSM1': {
                baseMaps['Open Street Map'].addTo(this.map);
                break;
            }

            /* Map type: Thunderforest - Open Cycle Maps with API key */
            case 'OSM2': {
                baseMaps['Thunderforest - Cycle'].addTo(this.map);
                break;
            }

            /* Map type: Thunderforest - Outdoors with API key */
            case 'OSM3': {
                baseMaps['Thunderforest - Outdoors'].addTo(this.map);
                break;
            }

            /* Map type: Thunderforest - Landscape with API key */
            case 'OSM4': {
                baseMaps['Thunderforest - Transport'].addTo(this.map);
                break;
            }

            /* Map type: Thunderforest - Landscape with API key */
            case 'OSM5': {
                baseMaps['Thunderforest - Landscape'].addTo(this.map);
                break;
            }

            ///* Map type: MapToolKit - Terrain */
            //case 'OSM6': {
            //	baseMaps['MapToolKit - Terrain'].addTo( this.map );
            //	break;
            //}

            /* Map type: Open Street Map - Humanitarian Map Style*/
            case 'OSM7': {
                baseMaps['Humanitarian Map Style'].addTo(this.map);
                break;
            }

            /*
            Map type: Open Ski Map
            case 'OSM8': {
                baseMaps['Open Ski Map'].addTo( this.map );
                break;
            }
            */

            /* Map type: Hike & Bike */
            case 'OSM9': {
                baseMaps['Hike & Bike'].addTo(this.map);
                break;
            }

            /* Map type: Open Sea Map */
            case 'OSM10': {
                baseMaps['Open Sea Map'].addTo(this.map);
                break;
            }

            case 'OSM11': {
                baseMaps['GSI Map (Japan)'].addTo(this.map);
                break;
            }

            /* Map type: Open Street Map */
            default: {
                baseMaps['Open Street Map'].addTo(this.map);
            }

        }

        L.control.layers(baseMaps, overlayMaps).addTo(this.map);

    }

    AppPolylines(mapData: Array<[number, number] | null>, colors: string[], currentIcon: string | null, startIcon: string | null, endIcon: string | null): void {

        if (null == this.map) {
            return;
        }

        var first = WPGPXMAPS.Utils.GetItemFromArray(mapData, 0);

        if (null == first) {
            return;
        }

        if ('' == currentIcon || null == currentIcon) {
            currentIcon = 'https://maps.google.com/mapfiles/kml/pal4/icon25.png';
        }

        var CurrentPositionMarker = L.marker(L.latLng(first), {
            icon: L.icon({
                iconUrl: currentIcon,
                iconSize: [32, 32], // Size of the icon.
                iconAnchor: [16, 16] // Point of the icon which will correspond to marker's location.
            }),
            title: this.lng?.currentPosition

        });
        CurrentPositionMarker.addTo(this.map);

        this.CurrentPositionMarker = CurrentPositionMarker;

        var pointsArray = WPGPXMAPS.Utils.DividePolylinesPoints(mapData);

        var lng = this.lng;
        var EventSelectChart = this.EventSelectChart;

        this.Bounds = mapData.filter(o => o != null);

        this.CenterMap();

        for (let i = 0; i < pointsArray.length; i++) {
            let color = '';
            if (i < colors.length) {
                color = colors[i];
            } else {
                color = colors[colors.length - 1];
            }
            try {
                let polyline = L.polyline(pointsArray[i], { color: color }).addTo(this.map);
                this.Polylines.push(polyline);

                let context = this;

                this.Polylines[i].on('mousemove', function (e: any) {
                    context.MoveMarkerToPosition([e.latlng.lat, e.latlng.lng], true);
                });
            } catch (err) {
            }
        }

        if (startIcon != '') {

            let ll = mapData[0];

            if (ll != null) {

                let startMarker = L.marker(L.latLng(ll), {
                    icon: L.icon({
                        iconUrl: startIcon + "",
                        iconSize: [32, 32], // Size of the icon.
                        iconAnchor: [16, 16] // Point of the icon which will correspond to marker's location.
                    }),
                    title: 'Start'
                });

                startMarker.addTo(this.map);

            }

        }

        if (endIcon != '' && mapData[mapData.length - 1] != null) {

            let ll = mapData[mapData.length - 1];

            if (ll != null) {

                var endMarker = L.marker(L.latLng(ll), {
                    icon: L.icon({
                        iconUrl: endIcon + "",
                        iconSize: [32, 32], // size of the icon
                        iconAnchor: [16, 16] // point of the icon which will correspond to marker's location
                    }),
                    title: 'End'
                });
                endMarker.addTo(this.map);
            }

        }

    }

    SetCurrentGPSPosition(pos: [number, number], currentpositioncon: string, lng: LangTranslation): void {

        if (null == this.CurrentGPSPositionMarker) {
            if ('' == currentpositioncon) {
                currentpositioncon = 'https://maps.google.com/mapfiles/kml/pal4/icon25.png';
            }

            if (this.map != null) {

                this.CurrentGPSPositionMarker = L.marker(pos, {
                    icon: L.icon({
                        iconUrl: currentpositioncon,
                        iconSize: [32, 32], // Size of the icon.
                        iconAnchor: [16, 16] // Point of the icon which will correspond to marker's location.
                    })
                })
                    .addTo(this.map)
                    .bindPopup(lng.currentPosition)
                    .openPopup();

            }


        } else {
            this.CurrentGPSPositionMarker.setLatLng(pos);
        }
        this.Bounds.push(pos);
        this.CenterMap();

    }

    AddWaypoints(waypoints: any, waypointIcon: string | null): void {

        var icon = L.icon({
            iconUrl: 'https://maps.google.com/mapfiles/ms/micons/flag.png',
            iconSize: [32, 32], // Size of the icon.
            iconAnchor: [16, 16] // Point of the icon which will correspond to marker's location.
        });

        if (waypointIcon != '') {
            icon = L.icon({
                iconUrl: 'waypointIcon',
                iconSize: [32, 32], // Size of the icon.
                iconAnchor: [16, 16] // Point of the icon which will correspond to marker's location.
            });
        }

        for (let i = 0; i < waypoints.length; i++) {
            var wpt = waypoints[i];

            this.Bounds.push([wpt.lat, wpt.lon]);

            var lat = wpt.lat;
            var lon = wpt.lon;
            var sym = wpt.sym;
            var typ = wpt.type;

            if (wpt.img) {
                (icon as any).iconUrl = wpt.img + "";
                //wsh = '';
            }
            var marker = L.marker([lat, lon], { icon: icon });
            var cnt = '';

            if (wpt.name == '') {
                cnt = "<div>" + unescape(wpt.desc) + "</div>";
            } else {
                cnt = "<div><b>" + wpt.name + "</b><br />" + unescape(wpt.desc) + "</div>";
            }
            cnt += "<br /><p><a href='https://maps.google.com?daddr=" + lat + "," + lon + "' target='_blank'>Itin&eacute;raire</a></p>";

            if (this.map != null)
                marker.addTo(this.map).bindPopup(cnt);
        }
        this.CenterMap();
    }

    MoveMarkerToPosition(LatLon: [number, number], updateChart: boolean): void {
        if (null == this.CurrentPositionMarker)
            return;

        this.CurrentPositionMarker.setLatLng(LatLon);

        if (this.lng)
            this.CurrentPositionMarker.setTooltipContent(this.lng.currentPosition);
        //this.CurrentPositionMarker.title = this.lng.currentPosition;

        if (true == updateChart && this.EventSelectChart)
            this.EventSelectChart(LatLon);
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

                var southWest = new L.LatLng(bounds.minLat, bounds.minLng),
                    northEast = new L.LatLng(bounds.maxLat, bounds.maxLng);

                this.map?.fitBounds(new L.LatLngBounds(southWest, northEast));

            }


        } catch (error) {
            console.log(error);
        }
    }

    AddPhotos(photos: any[]): void {

        for (const photo of photos) {
            let m = L.marker(photo, {
                icon: L.divIcon(
                    L.extend(
                        {
                            html:
                                '<div style="background-image: url(' +
                                photo.thumbnail +
                                ');"></div>',
                            className: "leaflet-marker-photo",
                        },
                        photo,
                        {
                            iconSize: [40, 40],
                        }
                    )
                ),
                title: photo.caption || "",
            });

            m.bindPopup('<img src="' + photo.url + '" /></a><p>' + photo.name + '</p>', { minWidth: 500 });

            m.addTo(this.map);
            //this.map.addLayer(m);
        }

        //new ClusterPhotos(this.map).populate(photos)
    }

}

export default LeafletMapEngine;    