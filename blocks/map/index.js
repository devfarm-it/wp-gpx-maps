/**
 * Editor script of the "GPX Map" block (wp-gpx-maps/map).
 *
 * Plain JavaScript on the wp.* globals, no build step. The block is dynamic: the preview is the real map
 * rendered by the server (ServerSideRender), the same HTML used on the front end.
 */
( function ( blocks, element, blockEditor, components, i18n, apiFetch, ServerSideRender ) {
	const el = element.createElement;
	const { useState, useEffect, useRef, Fragment } = element;
	const { InspectorControls, useBlockProps } = blockEditor;
	const { PanelBody, SelectControl, TextControl, ToggleControl, Placeholder, Button, Spinner, Notice, ComboboxControl } = components;
	const __ = ( text ) => i18n.__( text, 'wp-gpx-maps' );

	const data = window.wpgpxmapsBlock || { defaults: {}, tracksUrl: '', canUpload: false, hasMapBoxKey: false };

	const MAP_TYPES = [
		{ value: 'OSM1', label: 'Open Street Map' },
		{ value: 'OSM2', label: 'Open Cycle Map (Thunderforest API key)' },
		{ value: 'OSM3', label: 'Thunderforest Outdoors (API key)' },
		{ value: 'OSM4', label: 'Thunderforest Transport (API key)' },
		{ value: 'OSM5', label: 'Thunderforest Landscape (API key)' },
		{ value: 'OSM7', label: 'Open Street Map - Humanitarian' },
		{ value: 'OSM9', label: 'Hike & Bike' },
		{ value: 'OSM10', label: 'Open Sea Map' },
		{ value: 'OSM11', label: 'GSI Map (Japan)' },
	];

	const UNITS = [
		{ value: '0', label: 'meters / meters' },
		{ value: '1', label: 'feet / miles' },
		{ value: '2', label: 'meters / kilometers' },
		{ value: '3', label: 'meters / nautical miles' },
		{ value: '4', label: 'meters / miles' },
		{ value: '5', label: 'feet / nautical miles' },
	];

	const COLOR_BY = [
		{ value: 'none', label: 'One color' },
		{ value: 'grade', label: 'Grade (climb / descent)' },
		{ value: 'speed', label: 'Speed' },
		{ value: 'hr', label: 'Heart rate' },
		{ value: 'elevation', label: 'Elevation' },
	];

	const SPEED_UNITS = [
		{ value: '0', label: 'm/s' },
		{ value: '1', label: 'km/h' },
		{ value: '2', label: 'miles/h' },
		{ value: '3', label: 'min/km' },
		{ value: '4', label: 'min/miles' },
		{ value: '5', label: 'knots' },
		{ value: '6', label: 'min/100 meters' },
	];

	const isOn = ( value ) => value === true || value === 'true' || value === '1' || value === 1;

	/* Value shown in the editor: the block attribute when set, otherwise the plugin setting */
	const effective = ( attributes, name ) => ( attributes[ name ] !== undefined ? attributes[ name ] : data.defaults[ name ] );

	/* GPX files uploaded in WP GPX Maps (uploads/gpx), newest first */
	function useTracks() {
		const [ tracks, setTracks ] = useState( null );
		useEffect( () => {
			apiFetch( { path: '/wp-gpx-maps/v1/tracks' } )
				.then( setTracks )
				.catch( () => setTracks( [] ) );
		}, [] );
		return tracks;
	}

	/*
	 * The server-rendered map contains an inline module script: scripts added with innerHTML do not run,
	 * so every new one is copied into a real script element (also inside the editor iframe).
	 */
	function useRunMapScripts( ref, hasPreview ) {
		useEffect( () => {
			const node = ref.current;
			if ( ! node ) {
				return;
			}
			const run = () => {
				node.querySelectorAll( 'script[type="module"]:not([data-wpgpxmaps-done])' ).forEach( ( original ) => {
					original.setAttribute( 'data-wpgpxmaps-done', '1' );
					const script = node.ownerDocument.createElement( 'script' );
					script.type = 'module';
					script.setAttribute( 'data-wpgpxmaps-done', '1' );
					script.textContent = original.textContent;
					original.after( script );
				} );
			};
			const observer = new node.ownerDocument.defaultView.MutationObserver( run );
			observer.observe( node, { childList: true, subtree: true } );
			run();
			return () => observer.disconnect();
		}, [ hasPreview ] );
	}

	function GpxPicker( { attributes, setAttributes, tracks } ) {
		const options = ( tracks || [] ).map( ( t ) => ( { value: t.value, label: t.label } ) );
		return el(
			Fragment,
			null,
			tracks === null
				? el( Spinner )
				: el( ComboboxControl, {
					label: __( 'Uploaded GPX file' ),
					value: options.some( ( o ) => o.value === attributes.gpx ) ? attributes.gpx : null,
					options: options,
					onChange: ( value ) => setAttributes( { gpx: value || '' } ),
					help: options.length ? null : __( 'No GPX file uploaded yet.' ),
				} ),
			el( TextControl, {
				label: __( 'Or GPX path / URL' ),
				value: attributes.gpx,
				placeholder: '/wp-content/uploads/gpx/track.gpx',
				help: __( 'Path from the site root, or the URL of a GPX file.' ),
				onChange: ( value ) => setAttributes( { gpx: value.trim() } ),
			} ),
			data.canUpload && data.tracksUrl
				? el( Button, { variant: 'link', href: data.tracksUrl, target: '_blank' }, __( 'Upload GPX files' ) )
				: null
		);
	}

	function Toggle( { attributes, setAttributes, name, label } ) {
		return el( ToggleControl, {
			__nextHasNoMarginBottom: true,
			label: label,
			checked: isOn( effective( attributes, name ) ),
			onChange: ( value ) => setAttributes( { [ name ]: value } ),
		} );
	}

	function Edit( props ) {
		const { attributes, setAttributes, isSelected } = props;
		const tracks = useTracks();
		const previewRef = useRef();
		useRunMapScripts( previewRef, !! attributes.gpx );

		const blockProps = useBlockProps();
		const toggle = ( name, label ) => el( Toggle, { attributes, setAttributes, name, label } );
		const text = ( name, label, help ) =>
			el( TextControl, {
				label: label,
				help: help,
				value: attributes[ name ] !== undefined ? attributes[ name ] : '',
				placeholder: data.defaults[ name ] || '',
				onChange: ( value ) => setAttributes( { [ name ]: value === '' ? undefined : value } ),
			} );
		const color = ( name, label ) =>
			el( TextControl, {
				type: 'color',
				label: label,
				value: effective( attributes, name ) || '#3366cc',
				onChange: ( value ) => setAttributes( { [ name ]: value } ),
			} );
		const select = ( name, label, options ) =>
			el( SelectControl, {
				label: label,
				value: String( effective( attributes, name ) ?? '' ),
				options: options,
				onChange: ( value ) => setAttributes( { [ name ]: value } ),
			} );

		const summaryOn = isOn( effective( attributes, 'summary' ) );

		const inspector = el(
			InspectorControls,
			null,
			el( PanelBody, { title: __( 'GPX file' ), initialOpen: true }, el( GpxPicker, { attributes, setAttributes, tracks } ) ),
			el(
				PanelBody,
				{ title: __( 'Map' ), initialOpen: false },
				data.hasMapBoxKey
					? el( Notice, { status: 'info', isDismissible: false }, __( 'A MapBox API key is set: maps use MapBox and the MapBox style from the plugin settings.' ) )
					: select( 'mtype', __( 'Map type' ), MAP_TYPES ),
				text( 'mheight', __( 'Map height' ), __( 'For example 450px' ) ),
				select( 'colorby', __( 'Color the track by' ), COLOR_BY ),
				effective( attributes, 'colorby' ) === 'none' ? color( 'mlinecolor', __( 'Track color' ) ) : null,
				toggle( 'waypoints', __( 'Show waypoints' ) ),
				toggle( 'zoomonscrollwheel', __( 'Zoom with the mouse wheel' ) ),
				toggle( 'download', __( 'GPX download link' ) )
			),
			el(
				PanelBody,
				{ title: __( 'Chart' ), initialOpen: false },
				text( 'gheight', __( 'Chart height' ), __( '0px hides the chart' ) ),
				toggle( 'showele', __( 'Altitude' ) ),
				color( 'glinecolor', __( 'Altitude line color' ) ),
				toggle( 'showspeed', __( 'Speed' ) ),
				toggle( 'showhr', __( 'Heart rate' ) ),
				toggle( 'showcad', __( 'Cadence' ) ),
				toggle( 'showatemp', __( 'Temperature' ) ),
				toggle( 'showgrade', __( 'Grade' ) ),
				select( 'uom', __( 'Unit of measure' ), UNITS ),
				select( 'uomspeed', __( 'Speed unit' ), SPEED_UNITS )
			),
			el(
				PanelBody,
				{ title: __( 'Summary' ), initialOpen: false },
				toggle( 'summary', __( 'Show summary table' ) ),
				summaryOn ? toggle( 'summarytotlen', __( 'Total distance' ) ) : null,
				summaryOn ? toggle( 'summarymaxele', __( 'Max elevation' ) ) : null,
				summaryOn ? toggle( 'summaryminele', __( 'Min elevation' ) ) : null,
				summaryOn ? toggle( 'summaryeleup', __( 'Total climbing' ) ) : null,
				summaryOn ? toggle( 'summaryeledown', __( 'Total descent' ) ) : null,
				summaryOn ? toggle( 'summaryavgspeed', __( 'Average speed' ) ) : null,
				summaryOn ? toggle( 'summarytotaltime', __( 'Total time' ) ) : null
			),
			el(
				PanelBody,
				{ title: __( 'Reset' ), initialOpen: false },
				el( 'p', null, __( 'Options not changed here use the values of Settings > WP GPX Maps.' ) ),
				el(
					Button,
					{
						variant: 'secondary',
						onClick: () => {
							const reset = {};
							Object.keys( attributes ).forEach( ( key ) => {
								if ( key !== 'gpx' && key !== 'align' && key !== 'className' && key !== 'style' && key !== 'metadata' ) {
									reset[ key ] = undefined;
								}
							} );
							setAttributes( reset );
						},
					},
					__( 'Use plugin settings for all options' )
				)
			)
		);

		if ( ! attributes.gpx ) {
			return el(
				'div',
				blockProps,
				inspector,
				el(
					Placeholder,
					{ icon: 'location-alt', label: __( 'GPX Map' ), instructions: __( 'Choose a GPX file to show the track on a map.' ) },
					el( 'div', { style: { width: '100%' } }, el( GpxPicker, { attributes, setAttributes, tracks } ) )
				)
			);
		}

		return el(
			'div',
			blockProps,
			inspector,
			el(
				'div',
				// Until the block is selected, a click selects it instead of moving the map
				{ ref: previewRef, style: { pointerEvents: isSelected ? 'auto' : 'none' } },
				el( ServerSideRender, { block: 'wp-gpx-maps/map', attributes: attributes } )
			)
		);
	}

	blocks.registerBlockType( 'wp-gpx-maps/map', {
		edit: Edit,
		save: () => null,
	} );
} )( window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components, window.wp.i18n, window.wp.apiFetch, window.wp.serverSideRender );
