import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import './map.css';
const MAP_KEY = import.meta.env.MAP_KEY;

function Map() {
	useEffect(() => {
		const loader = new Loader({
			apiKey: MAP_KEY,
			version: 'weekly',
			libraries: ['marker'], // Asegúrate de incluir la biblioteca 'marker'
		});

		loader.load().then(() => {
			const position = { lat: 19.460590382146453, lng: -70.68068279690394 };
			const map = new google.maps.Map(document.getElementById('map'), {
				zoom: 16,
				center: position,
				mapId: 'DEMO_MAP_ID',
			});

			// Usar AdvancedMarkerElement en lugar de Marker
			const marker = new google.maps.marker.AdvancedMarkerElement({
				position: position,
				map: map,
				title: 'Uluru',
			});
		});
	}, []);

	return (

			<div id="map"></div>

	);
}

export default Map;
