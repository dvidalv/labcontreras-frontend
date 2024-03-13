import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './map.css';

function Map() {
	const position = {
		lat: 19.460610613258446,
		lng: -70.68062915211819
	};

	return <div className="map">
		<MapContainer center={position} zoom={18} scrollWheelZoom={false} className="map">
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        Laboratorio de Patología Contreras Robledo
      </Popup>
    </Marker>
  </MapContainer>
	</div>;
}

export default Map;
19.460610613258446, -70.68062915211819