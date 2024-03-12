import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import './map.css';
// const MAP_KEY = 'AIzaSyBYj9ECOYBlQofzPND0STunyu5Glxx8iw8';

function Map() {
	useEffect(() => {
		const loader = new Loader({
			apiKey: import.meta.env.VITE_MAP_KEY,
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
				title: 'Uluru',
				// Aquí puedes agregar opciones adicionales específicas de AdvancedMarkerElement según sea necesario.
			});
		});
	}, []);

	return <div id="map"></div>;
}

export default Map;
