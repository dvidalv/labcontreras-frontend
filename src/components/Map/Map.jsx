import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import './map.css';
import config from '../../../config.js';



function Map() {
	// let apiKey = process.env.REACT_APP_MAP_KEY;
	let apiKey = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_MAP_KEY : config.MAP_KEY;
	useEffect(() => {
		const loader = new Loader({
			apiKey: config.MAP_KEY,
			version: 'weekly',
			libraries: ['marker'], // Asegúrate de incluir la biblioteca 'marker' necesaria para AdvancedMarkerElement
		});

		loader.load().then(() => {
			const position = { lat: 19.460590382146453, lng: -70.68068279690394 };
			const map = new google.maps.Map(document.getElementById('map'), {
				zoom: 16,
				center: position,
				mapId: 'DEMO_MAP_ID',
			});

			// Actualización: Usar AdvancedMarkerElement en lugar de Marker
			const marker = new google.maps.marker.AdvancedMarkerElement({
				position: position,
				map: map,
				title: 'Lab Conteras',
				// Aquí puedes agregar opciones adicionales específicas de AdvancedMarkerElement según sea necesario.
			});
		});
	}, []);

	return <div id="map"></div>;
}

export default Map;
