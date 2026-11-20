/**
 * Elementor editor preview of the "GPX Map" widget (wp-gpx-maps-elementor.php).
 *
 * In the editor Elementor builds the HTML of a widget in the editor window and moves it into this preview
 * frame. Those elements are not HTMLElements of this frame (Mapbox and MapLibre refuse them as map container)
 * and the inline module script that starts the map does not run. So the widget HTML is parsed again here,
 * and every map script is copied into a real script element, as the block does.
 * Loaded only in the preview of the editor; on the published page the browser runs the script itself.
 */
( function () {
	function runMapScripts( scope ) {
		/* Wait a moment: Elementor can render the same widget again right away */
		window.setTimeout( function () {
			if ( ! scope.isConnected || ! scope.querySelector( 'script[type="module"]:not([data-wpgpxmaps-done])' ) ) {
				return;
			}
			var content = scope.querySelector( '.elementor-widget-container' ) || scope;
			if ( ! ( content.firstElementChild instanceof window.HTMLElement ) ) {
				content.innerHTML = content.innerHTML;
			}
			content.querySelectorAll( 'script[type="module"]:not([data-wpgpxmaps-done])' ).forEach( function ( original ) {
				original.setAttribute( 'data-wpgpxmaps-done', '1' );
				var script = document.createElement( 'script' );
				script.type = 'module';
				script.setAttribute( 'data-wpgpxmaps-done', '1' );
				script.textContent = original.textContent;
				original.after( script );
			} );
		}, 100 );
	}

	window.addEventListener( 'elementor/frontend/init', function () {
		window.elementorFrontend.hooks.addAction( 'frontend/element_ready/wpgpxmaps-map.default', function ( $scope ) {
			if ( window.elementorFrontend.isEditMode() && $scope && $scope[ 0 ] ) {
				runMapScripts( $scope[ 0 ] );
			}
		} );
	} );
} )();
