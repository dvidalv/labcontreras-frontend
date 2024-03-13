import React, { useEffect, useState } from 'react';

function Map() {
  let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: 19.460651078179666, lng: -70.68071498259943 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 16,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerView({
    map: map,
    position: position,
    title: "Uluru",
  });
}

initMap();

  return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
}

export default Map;

