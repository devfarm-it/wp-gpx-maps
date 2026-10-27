/*
Plugin Name: WP-GPX-Maps
Plugin URI: http://www.devfarm.it/
Description: Draws a gpx track with altitude graph
Version: 1.6.02
Author: Bastianon Massimo
Author URI: http://www.devfarm.it/
*/

import './../../css/admin-style.css';
import './../../css/bootstrap-table.css';
import './../../css/wp-gpx-maps-output.css';

import { ActiveElement, Chart, ScaleOptions, LinearScale, ChartConfiguration, registerables, ActiveDataPoint } from 'chart.js'
import { WPGPXMAPS } from './Utils/Utils';

import { LeafletMapEngine } from './maps-engines/LeafletMapEngine';

import { MapBoxMapEngine } from './maps-engines/MapBoxMapEngine';

/* Public API for add-ons (version 1): the bundled Leaflet (with MarkerCluster and FullScreen), to draw extra maps */
import L from 'leaflet';
export { L as Leaflet };

/*
 * Default Leaflet marker icons. Leaflet looks for them next to leaflet.css, which does not work once bundled
 * (the browser asked for "marker-icon.png" relative to the page): use the images inlined in the bundle.
 */
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl: markerIcon, iconRetinaUrl: markerIcon2x, shadowUrl: markerShadow });

const wpgpxmaps_FEET_MILES = "1";
const wpgpxmaps_METERS_KILOMETERS = "2";
const wpgpxmaps_METERS_NAUTICALMILES = "3";
const wpgpxmaps_METER_MILES = "4";
const wpgpxmaps_FEET_NAUTICALMILES = "5";
const wpgpxmaps_MINUTES_PER_100METERS = "6";
const wpgpxmaps_KNOTS = "5";
const wpgpxmaps_MINUTES_PER_MILES = "4";
const wpgpxmaps_MINUTES_PER_KM = "3";
const wpgpxmaps_MILES_PER_HOURS = "2";
const wpgpxmaps_KM_PER_HOURS = "1";

export class WPGPXMaps {
	private params: Params;

	public map : MapEngine<any>|null = null;

	public myChart: Chart|null = null;

	constructor(params: Params) {
		this.params = params;
		this.init();
	}

	private init() {
		let {
			targetId,
			mapType,
			mapData,
			graphDist,
			graphEle,
			graphSpeed,
			graphHr,
			graphAtemp,
			graphCad,
			graphGrade,
			waypoints,
			unit,
			unitspeed,
			color1,
			color2,
			color3,
			color4,
			color5,
			color6,
			color7,
			chartFrom1,
			chartTo1,
			chartFrom2,
			chartTo2,
			startIcon,
			waypointIcon,
			endIcon,
			currentIcon,
			zoomOnScrollWheel,
			langs,
			pluginUrl,
			usegpsposition,
			currentpositioncon,
			TFApiKey,
		} = this.params;

		var _formats: ChartLabels[] = [];

		/* Unit of measure settings. */
		var l_s: ChartUom = { suf: '', dec: 0 };
		var label_x: ChartUom = { suf: '', dec: 0 };
		var label_y: ChartUom = { suf: '', dec: 0 };
		var l_grade: ChartUom = { suf: '%', dec: 1 };
		var l_hr: ChartUom = { suf: '', dec: 0 };
		var l_cad: ChartUom = { suf: '', dec: 0 };

		var el = document.getElementById('wpgpxmaps_' + targetId);
		var el_map = document.getElementById('map_' + targetId);
		var el_chart = document.getElementById('chart_' + targetId);
		var el_report = document.getElementById('report_' + targetId);
		var el_osm_credits = document.getElementById('wpgpxmaps_' + targetId + '_osm_footer');

		if (el_map == null)
			return;

		let _this = this;

		if (this.params.MapBoxApiKey &&  this.params.MapBoxApiKey.length>20)
		{
			this.map = new MapBoxMapEngine();
		}
		else
		{
			this.map = new LeafletMapEngine();
		}

		//map.lng = lng;
		this.map.init(
			el_map,
			mapType,
			('true' == zoomOnScrollWheel),
			TFApiKey,
			this.params
		);

		this.map.EventSelectChart = function (LatLon: LatLng) {

			const chart = _this.myChart;
			if (chart) {
				const ci = _this.getClosestIndex(mapData, LatLon[0], LatLon[1]);
				/* Chart.js 4 wants { datasetIndex, index } references, only for points that exist */
				const active = chart.data.datasets
					.map((_ds: any, datasetIndex: number) => ({ datasetIndex, index: ci }))
					.filter((a: any) => {
						const el: any = chart.getDatasetMeta(a.datasetIndex).data[ci];
						return el && !isNaN(el.x) && !isNaN(el.y);
					});
				if (active.length > 0) {
					const el: any = chart.getDatasetMeta(active[0].datasetIndex).data[ci];
					chart.setActiveElements(active);
					chart.tooltip?.setActiveElements(active, { x: el.x, y: el.y });
					chart.update('none');
				}
			}
		};

		// var bounds = new google.maps.LatLngBounds();

		if ('true' == usegpsposition) {

			/* Try HTML5 geolocation. */
			if (navigator.geolocation) {
				navigator.geolocation.watchPosition(function (position) {
					var radius = position.coords.accuracy / 2;

					/* User position. */
					var pos = [position.coords.latitude, position.coords.longitude];

					this.map.SetCurrentGPSPosition([pos[0], pos[1]], currentpositioncon, langs);


				},
					function (e) {

						// Some errors.

					},
					{
						enableHighAccuracy: false,
						timeout: 5000,
						maximumAge: 0
					});
			}
		}

		/* Print WayPoints. */
		if (waypoints != null && waypoints.length > 0) {
			this.map.AddWaypoints(waypoints, waypointIcon);
		}

		/* Print Images. */

		let nggEl = document.getElementById("ngimages_" + targetId);

		nggEl?.setAttribute("style", "display:block;position:absolute;left:-50000px");

		var nggImages = nggEl?.querySelectorAll("span");

		if (nggImages && nggImages.length > 0) {
			var photos = [];

			for (var i = 0; i < nggImages.length; i++) {

				var ngg_span = nggImages[i];
				var ngg_span_a = ngg_span.children[0];

				var pos = [
					Number(ngg_span.getAttribute('lat')),
					Number(ngg_span.getAttribute('lon'))
				];

				this.map.Bounds.push(pos);

				photos.push({
					'lat': pos[0],
					'lng': pos[1],
					'name': ngg_span_a.children[0].getAttribute('alt'),
					'image_id': ngg_span_a.getAttribute('data-image-id'),
					'url': ngg_span_a.getAttribute('href'),
					'thumbnail': ngg_span_a.children[0].getAttribute('src')
				});

			}

			if (photos.length > 0) {

				this.map.AddPhotos(photos);

				/*
				var showHideImagesCustomControl = L.Control.extend({

					options: {
						position: 'topleft'
						//control position - allowed: 'topleft', 'topright', 'bottomleft', 'bottomright'
					},

				  onAdd: function (map) {

					var container = document.createElement('img');
					container.class= "leaflet-bar leaflet-control leaflet-control-custom"
					container.style.backgroundColor = 'white';
					container.style.width = '30px';
					container.style.height = '30px';
					container.src = pluginUrl + "/wp-gpx-maps/img/hideImages.png";
					container.style.cursor = 'pointer';
					container.title = lng.hideImages;

					container.onclick = function(){

						var isImagesHidden = (controlUIhi.isImagesHidden == true);
						var mapDiv = map.getDiv();
						var center = map.getCenter();

						if (isImagesHidden)
						{
							for (var i=0; i<ngImageMarkers.length; i++) {
								ngImageMarkers[i].setMap(map);
							}
							controlUIhi.src = pluginUrl + "/wp-gpx-maps/img/hideImages.png";
							controlUIhi.title = lng.hideImages;
						}
						else
						{
							for (var i=0; i<ngImageMarkers.length; i++) {
								ngImageMarkers[i].setMap(null);
			}
							controlUIhi.src = pluginUrl + "/wp-gpx-maps/img/showImages.png";
							controlUIhi.title = lng.showImages;
						}
						controlUIhi.isImagesHidden = !isImagesHidden;
						return false;

					}

					return container;
				  },

				});

				map.map.addControl(new showHideImagesCustomControl());
				*/

			}

		}

		/*

		// Nextgen Pro Lightbox FIX
		var _xx = jQuery("#ngimages_" + targetId + " .nextgen_pro_lightbox");
		if (_xx.length > 0)
		{

			var rnd1 = Math.random().toString(36).substring(7);
			var rnd2 = Math.random().toString(36).substring(7);

			//get first gallery without images
			for (var _temp in galleries) {
				var _gal = galleries[_temp];

				if (_gal.source == "random_images" && _gal.wpgpxmaps != true )
				{

					_gal.source == "galleries";
					_gal.wpgpxmaps = true;
					_transient_id = _temp.replace("gallery_","")
					_gal["entity_ids"] = [];
					_gal["image_ids"] = [];
					_gal["gallery_ids"] = [96];
					for (var i=0;i<_xx.length;i++)
					{
						var __xx = jQuery(_xx[i]);
						__xx.attr("data-nplmodal-gallery-id", _transient_id);
						_gal["image_ids"].push(__xx.attr("data-image-id"));
					}
					break;
				}
			}
		}
		*/

		/* Print Track. */
		const { colorBy, colorData } = this.params;

		if (mapData && colorBy && colorData && colorData.length === mapData.length) {

			/* Track colored by grade, speed, heart rate or elevation, with a legend */
			const scale = WPGPXMAPS.Utils.TrackColorScale(colorBy, colorData);
			const colored = WPGPXMAPS.Utils.SplitTrackByColor(mapData, colorData, scale.colorOf);
			this.map.AppPolylines(colored.mapData, colored.colors, currentIcon, startIcon, endIcon);

			const speedUnits: { [key: string]: string } = { '0': 'm/s', '1': 'km/h', '2': 'mi/h', '3': 'min/km', '4': 'min/mi', '5': 'knots', '6': 'min/100m' };
			const legend: { [key: string]: [string, string] } = {
				grade: [langs.grade, '%'],
				speed: [langs.speed, ' ' + (speedUnits[unitspeed] ?? 'm/s')],
				hr: [langs.heartRate, ' bpm'],
				elevation: [langs.altitude, (unit === wpgpxmaps_FEET_MILES || unit === wpgpxmaps_FEET_NAUTICALMILES) ? ' ft' : ' m'],
			};
			const [title, suffix] = legend[colorBy] ?? [colorBy, ''];
			const dec = colorBy === 'speed' ? 1 : 0;
			const container = document.getElementById('map_' + targetId + '_cont');
			if (container) {
				WPGPXMAPS.Utils.AddTrackLegend(container, title, scale.stops,
					(colorBy === 'grade' ? '≤' : '') + scale.min.toFixed(dec) + suffix,
					(colorBy === 'grade' ? '≥' : '') + scale.max.toFixed(dec) + suffix);
			}

		} else if (mapData) {
			this.map.AppPolylines(mapData, color1, currentIcon, startIcon, endIcon);

			/* Several GPX files: legend with the name and color of each file */
			const { trackNames, trackColors } = this.params;
			const container = document.getElementById('map_' + targetId + '_cont');
			if (container && trackNames && trackNames.length > 1 && trackColors && trackColors.length) {
				WPGPXMAPS.Utils.AddTracksLegend(container, trackNames, trackColors);
			}
		}

		/* Default start / end markers (when no custom icon is set) and distance markers */
		const realPoints = (mapData || []).filter((p: any) => p !== null) as Array<[number, number]>;
		if (realPoints.length > 1) {
			if (this.params.startEnd !== false && !startIcon) {
				this.map.AddHtmlMarker(realPoints[0], WPGPXMAPS.Utils.MarkerElement('', '#16a34a', 16), langs.start ?? 'Start');
			}
			if (this.params.startEnd !== false && !endIcon) {
				this.map.AddHtmlMarker(realPoints[realPoints.length - 1], WPGPXMAPS.Utils.MarkerElement('', '#dc2626', 16), langs.finish ?? 'Finish');
			}
			const kmMarkers = Number(this.params.kmMarkers) || 0;
			if (kmMarkers > 0) {
				const miles = unit === wpgpxmaps_FEET_MILES || unit === wpgpxmaps_METER_MILES;
				const nautical = unit === wpgpxmaps_METERS_NAUTICALMILES || unit === wpgpxmaps_FEET_NAUTICALMILES;
				const unitMeters = miles ? 1609.344 : (nautical ? 1852 : 1000);
				const suffix = miles ? ' mi' : (nautical ? ' NM' : ' km');
				for (const m of WPGPXMAPS.Utils.DistanceMarkers(mapData, kmMarkers, unitMeters)) {
					this.map.AddHtmlMarker(m.point, WPGPXMAPS.Utils.MarkerElement(String(m.value), '#1f2937', 22), m.value + suffix);
				}
			}
		}

		/*
		map.setCenter(bounds.getCenter());
		map.fitBounds(bounds);
		*/

		var contextMap = this.map;

		// Fix post tabs. */
		let _tab: HTMLElement | null = null;
		let _p = el?.parentElement;
		while (_p != null) {
			if (_p.classList.contains("wordpress-post-tabs") && _p.classList.contains("tab-pane")) {
				_tab = _p;
				break;
			}
			_p = _p.parentElement;
		}

		if (_tab) {
			var tabResized = false;

			var FixMapSize = function (e: any) {
				setTimeout(function (e: any) {

					// google.maps.event.trigger(map, 'resize');
					contextMap.map?.invalidateSize();
					contextMap.CenterMap();
					tabResized = true;
				}, 300);
			};

			document.querySelector(".wpsm_nav-tabs a")?.addEventListener("click", FixMapSize, false);
			_tab.querySelector("div > ul > li > a")?.addEventListener("click", FixMapSize, false);
		}

		var graphh = el_chart?.style.height;

		if (graphDist && (graphEle || graphSpeed || graphHr || graphAtemp || graphCad) && graphh != '0px') {

			var valLen = graphDist.length;

			if (wpgpxmaps_FEET_MILES == unit) {

				/* feet / miles */
				label_x = { suf: 'mi', dec: 1 };
				label_y = { suf: 'ft', dec: 0 };

			} else if (wpgpxmaps_METERS_KILOMETERS == unit) {

				/* meters / kilometers */
				label_x = { suf: 'km', dec: 1 };
				label_y = { suf: 'm', dec: 2 };

			} else if (wpgpxmaps_METERS_NAUTICALMILES == unit) {

				/* meters / nautical miles */
				label_x = { suf: 'NM', dec: 1 };
				label_y = { suf: 'm', dec: 0 };

			} else if (wpgpxmaps_METER_MILES == unit) {

				/* meters / miles */
				label_x = { suf: 'mi', dec: 1 };
				label_y = { suf: 'm', dec: 0 };

			} else if (wpgpxmaps_FEET_NAUTICALMILES == unit) {

				/* feet / nautical miles */
				label_x = { suf: 'NM', dec: 1 };
				label_y = { suf: 'ft', dec: 0 };

			} else {

				/* meters / meters */
				label_x = { suf: 'm', dec: 0 };
				label_y = { suf: 'm', dec: 0 };

			}

			var nn = 1111.1;
			var _nn = nn.toLocaleString();
			var _nnLen = _nn.length;
			var decPoint = _nn.substring(_nnLen - 2, _nnLen - 1);
			var thousandsSep = _nn.substring(1, 2);

			if ('1' == decPoint)
				decPoint = '.';

			if ('1' == thousandsSep)
				thousandsSep = '';

			// trik per caricare tutti imoduli di chart.js
			Chart.register(...registerables);

			/* Define the options. */
			var hoptions: ChartConfiguration = {
				type: 'line',
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
						intersect: false,
						mode: 'index',
					},
					// responsiveAnimationDuration: 0,
					// animation duration after a resize
					//customLine: {
					//	color: 'gray'
					//},
					scales: {
						xAxe: {
							type: 'linear',
							min: 0,
							max: graphDist[graphDist.length - 1],
							ticks: {

								/* Include a dollar sign in the ticks. */
								callback: function (value, index, values) {
									return parseFloat(value + "").toFixed(label_x.dec) + label_x.suf;
								}
							}
						}
					},
					plugins: {

						tooltip: {
							position: 'average',
							mode: 'index',
							intersect: false,
							callbacks: {
								title: function (tooltipItems) {

									/* Distance of the point (data value, not the pixel position) */
									var x_pos = tooltipItems[0].parsed.x as number;
									return x_pos.toFixed(label_x.dec) + ' ' + label_x.suf;
								},
								label: function (tooltipItem) {

									/* Series name and value of the point */
									var label_y = _formats[tooltipItem.datasetIndex].label_y;
									var y_pos = tooltipItem.parsed.y as number;
									if (y_pos === null || isNaN(y_pos)) {
										return '';
									}
									return (tooltipItem.dataset.label || '') + ': ' + y_pos.toFixed(label_y.dec) + ' ' + label_y.suf;
								},
								footer: function (tooltipItem: any) {

									/* Move the point in map. */
									var i = tooltipItem[0].dataIndex;
									var point = WPGPXMAPS.Utils.GetItemFromArray(mapData, i);
									if (point)
										contextMap.MoveMarkerToPosition(point, false);
								}
							}
						},




						

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
					},
				},

				//labels: graphDist
			};

			let yAxeCount = 1;

			if (graphEle && graphEle.length > 0) {
				var myData = this.mergeArrayForChart(graphDist, graphEle);

				let _min: number, _max: number

				if (chartFrom1 != '') {

					_min = parseFloat(chartFrom1);
					//yaxe.startOnTick = false;

				} else {

					_min = myData.Min;

				}

				if (chartTo1 != '') {

					_max = parseFloat(chartTo1);
					//yaxe.endOnTick = false;

				} else {

					_max = myData.Max;
				}
				var _id = 'yaxis' + yAxeCount++;

				var yaxe: ScaleOptions = {
					type: 'linear',
					max: _max,
					min: _min,
					ticks: {
						callback(tickValue, index, ticks) {
							return parseFloat(tickValue + "").toFixed(label_y.dec) + label_y.suf;
						}
					},
				};

				(hoptions.options?.scales as any)[_id] = yaxe;
				_formats.push({ "label_x": label_x, "label_y": label_y });
				/* Altitude drawn as a filled profile */
				hoptions.data.datasets.push({ ...this.wpgpxmapsGetDataset(langs.altitude, myData.Items, color2, _id), fill: 'start' } as any);

			}

			if (graphSpeed && graphSpeed.length > 0) {

				if (wpgpxmaps_MINUTES_PER_100METERS == unitspeed) {

					/* min/100 meters */
					l_s = { suf: 'min/100m', dec: 2 };

				} else if (wpgpxmaps_KNOTS == unitspeed) {

					/* knots */
					l_s = { suf: 'knots', dec: 2 };

				} else if (wpgpxmaps_MINUTES_PER_MILES == unitspeed) {

					/* min/miles */
					l_s = { suf: 'min/mi', dec: 2 };

				} else if (wpgpxmaps_MINUTES_PER_KM == unitspeed) {

					/* min/km */
					l_s = { suf: 'min/km', dec: 2 };

				} else if (wpgpxmaps_MILES_PER_HOURS == unitspeed) {

					/* miles/h */
					l_s = { suf: 'mi/h', dec: 0 };

				} else if (wpgpxmaps_KM_PER_HOURS == unitspeed) {

					/* km/h */
					l_s = { suf: 'km/h', dec: 0 };

				} else {

					/* dafault m/s */
					l_s = { suf: 'm/s', dec: 0 };

				}

				var myData = this.mergeArrayForChart(graphDist, graphSpeed);
				let yaxe: ScaleOptions = {
					type: 'linear',
					ticks: {

						/* Include a dollar sign in the ticks. */
						callback(tickValue, index, ticks) {
							return parseFloat(tickValue + "").toFixed(l_s.dec) + l_s.suf;
						}
					},
					position: 'right',
					//scalePositionLeft: false,
				};

				if (chartFrom2 != '') {

					yaxe.min = parseFloat(chartFrom2);
					//yaxe.startOnTick = false;

				} else {
					yaxe.min = myData.Min;
				}

				if (chartTo2 != '') {

					yaxe.max = parseFloat(chartTo2);
					//yaxe.endOnTick = false;

				} else {
					yaxe.max = myData.Max;
				}

				_formats.push( { label_x: label_x , label_y :   l_s});

				var _id = 'yaxis' + yAxeCount++;
				(hoptions.options?.scales as any)[_id] = yaxe;

				hoptions.data.datasets.push(this.wpgpxmapsGetDataset(langs.speed, myData.Items, color3, _id));
			}

			if (graphHr && graphHr.length > 0) {
				var myData = this.mergeArrayForChart(graphDist, graphHr);
				var yaxe: ScaleOptions = {
					type: 'linear',
					ticks: {

						/* Include a dollar sign in the ticks. */
						callback(tickValue, index, ticks) {
							return parseFloat(tickValue + "").toFixed(l_hr.dec) + l_hr.suf;
						}
					},
					position: 'right',
					//scalePositionLeft: false,
				};
				var _id = 'yaxis' + yAxeCount++;
				(hoptions.options?.scales as any)[_id] = yaxe;
				hoptions.data.datasets.push(this.wpgpxmapsGetDataset(langs.heartRate, myData.Items, color4, _id));
				_formats.push( { label_x: label_x , label_y : l_hr});

			}

			if (graphAtemp && graphAtemp.length > 0) {
				var myData = this.mergeArrayForChart(graphDist, graphAtemp);
				var yaxe: ScaleOptions = {
					type: 'linear',
					ticks: {

						/* Include a dollar sign in the ticks. */
						callback(tickValue, index, ticks) {
							return parseFloat(tickValue + "").toFixed(1) + "°C";
						}
					},
					position: 'right',
					//scalePositionLeft: false,
				};
				var _id = 'yaxis' + yAxeCount++;
				(hoptions.options?.scales as any)[_id] = yaxe;
				hoptions.data.datasets.push(this.wpgpxmapsGetDataset(langs.atemp, myData.Items, color7, _id));
				_formats.push( { label_x: label_x , label_y :   { suf: '°C', dec: 1 }});
			}


			if (graphCad && graphCad.length > 0) {

				var myData = this.mergeArrayForChart(graphDist, graphCad, true);
				var yaxe: ScaleOptions = {
					type: 'linear',
					ticks: {

						// Include a dollar sign in the ticks.
						callback(tickValue, index, ticks) {
							return parseFloat(tickValue + "").toFixed(l_cad.dec) + l_cad.suf;
						}
					},
					position: 'right',
					//scalePositionLeft: false,
				};

				var _id = 'yaxis' + yAxeCount++;
				(hoptions.options?.scales as any)[_id] = yaxe;
								hoptions.data.datasets.push(this.wpgpxmapsGetDataset(langs.cadence, myData.Items, color5, _id));
								_formats.push( { label_x: label_x , label_y : l_cad});

			}

			if (graphGrade && graphGrade.length > 0) 
			{
				var myGrade = WPGPXMAPS.Utils.calculateGrade( graphEle, graphDist.slice(1));
			}

			if (graphGrade && graphGrade.length > 0) {

				var myData = this.mergeArrayForChart(graphDist, graphGrade);
				var yaxe : ScaleOptions = {
					type: 'linear',
					ticks: {

						// Include a dollar sign in the ticks.
						callback: function (value, index, values) {
							return parseFloat(value+"").toFixed(l_grade.dec) + l_grade.suf;
						}
					},
					position: 'right',
					//scalePositionLeft: false,

				};

				_formats.push( { label_x: label_x , label_y : l_grade});

				var _id = 'yaxis' + yAxeCount++;
				(hoptions.options?.scales as any)[_id] = yaxe;
				hoptions.data.datasets.push(this.wpgpxmapsGetDataset(langs.grade, myData.Items, color6, _id));
			}

			/* Vertical line on the point shown in the tooltip (mouse on the chart or on the track) */
			hoptions.plugins = [{
				id: 'wpgpxmapsCrosshair',
				afterDatasetsDraw(chart: Chart) {
					const active = chart.tooltip?.getActiveElements();
					if (!active || active.length === 0) return;
					const x = active[0].element.x;
					const { top, bottom } = chart.chartArea;
					const c = chart.ctx;
					c.save();
					c.strokeStyle = 'rgba(0, 0, 0, 0.35)';
					c.lineWidth = 1;
					c.beginPath();
					c.moveTo(x, top);
					c.lineTo(x, bottom);
					c.stroke();
					c.restore();
				}
			}];

			var ctx = (document.getElementById('myChart_' + targetId) as HTMLCanvasElement)?.getContext('2d');
			if (ctx)
				this.myChart = new Chart(ctx, hoptions);

		} else {
			el_chart?.style.setProperty("display", "none");
		}

		/*
		 * Public event for add-ons (WP GPX Maps Pro), API version 1:
		 * document.addEventListener('wpgpxmaps:ready', e => { e.detail.map, e.detail.chart, e.detail.params.extra, ... })
		 */
		el_map.ownerDocument.dispatchEvent(new CustomEvent('wpgpxmaps:ready', {
			detail: {
				apiVersion: 1,
				instance: this,
				targetId: targetId,
				engine: this.map instanceof MapBoxMapEngine ? 'mapbox' : 'leaflet',
				map: this.map?.map ?? null,
				chart: this.myChart,
				container: el,
				params: this.params,
			}
		}));

		return this;

	};

	private mergeArrayForChart(distArr: any[], dataArr: any[], setZerosAsNull?: boolean) {
		const l = distArr.length;
		const items = new Array(l);
		let min = 10000;
		let max = -10000;

		let lastX = 0;

		for (let i = 0; i < l; i++) {
			if (distArr[i] != null) {
				let _item = dataArr[i];

				if (setZerosAsNull === true && _item === 0) {
					_item = null;
				}

				items[i] = {
					x: distArr[i],
					y: _item
				};
				lastX = distArr[i];
				if (_item > max) max = _item;
				if (_item < min) min = _item;
			} else {
				// Gap between two tracks: keep the index aligned with mapData and break the line
				items[i] = {
					x: lastX,
					y: null
				};
			}
		}
		return {
			Items: items,
			Min: min,
			Max: max
		};
	}

	private wpgpxmapsGetDataset(name: string, data: any[], color: string, id: string) {
		return {
			label: name,
			data: data,
			borderColor: color,
			backgroundColor: this.hexToRgbA(color, 0.3),
			pointRadius: 0,
			borderWidth: 1,
			pointHoverRadius: 1,
			yAxisID: id
		};
	}

	private hexToRgbA(hex: string, a: number) {
		let c: any;
		if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
			c = hex.substring(1).split('');
			if (c.length == 3) {
				c = [c[0], c[0], c[1], c[1], c[2], c[2]];
			}
			c = '0x' + c.join('');
			return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + a + ')';
		}
		throw new Error('Bad Hex');
	}

	private getItemFromArray(arr: any[], index: number) {
		try {
			return arr[index];
		} catch (e) {
			return [0, 0];
		}
	}

	private getClosestIndex(points: any[], lat: number, lon: number) {
		let dd = 10000;
		let ii = 0;
		for (let i = 0; i < points.length; i++) {
			if (points[i] === null) continue;

			const d = this.wpgpxmapsDist(points[i][0], points[i][1], lat, lon);
			if (d < dd) {
				ii = i;
				dd = d;
			}
		}
		return ii;
	}

	private getClosestImage(lat: number, lon: number, targetId: string) {
		let dd = 10000;
		let img;
		const divImages = document.getElementById("ngimages_" + targetId);
		if (divImages == null)
			return;
		const img_spans = divImages.getElementsByTagName("span");
		for (let i = 0; i < img_spans.length; i++) {
			let imageLat = img_spans[i].getAttribute('lat');
			let imageLon = img_spans[i].getAttribute('lon');

			if (imageLat == null || imageLon == null)
				return;

			imageLat = imageLat.replace(",", ".");
			imageLon = imageLon.replace(",", ".");

			const d = this.wpgpxmapsDist(parseFloat(imageLat), parseFloat(imageLon), lat, lon);
			if (d < dd) {
				img = img_spans[i];
				dd = d;
			}
		}
		return img;
	}

	private isNumeric(input: string) {
		const RE = /^-{0,1}\d*\.{0,1}\d+$/;
		return RE.test(input);
	}

	private wpgpxmapsDist(lat1: number, lon1: number, lat2: number, lon2: number) {
		const dLat = (lat2 - lat1);
		const dLon = (lon2 - lon1);
		return Math.sqrt(dLat * dLat + dLon * dLon);
	}

}