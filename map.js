const adaLocation = {
	lat: 47.21987236142364,
	lng: -1.5334652313567714,
};


// SET VIEW // 
var map = L.map("map").setView([adaLocation.lat, adaLocation.lng], 14);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 19,
	attribution:
		'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// SET CIRCLE //
var circle = L.circle([adaLocation.lat, adaLocation.lng], {
	color: "red",
	fillColor: "#f03",
	fillOpacity: 0.5,
	radius: 500,
}).addTo(map);

// STAND-ALONE POPUP //
var popup = L.popup()
	.setLatLng([adaLocation.lat, adaLocation.lng])
	.setContent("Ada Tech School - Nantes")
	.openOn(map);

// POP-UP DESCRIPTION ON MARKER //
function setMarkersOnStations(station) {
	var marker = L.marker([station.position.lat, station.position.lng]).addTo(map);
	marker.bindPopup(`
		<strong>${station.name.slice(4)}</strong><br>
		🚲 : <strong>${station.available_bikes}</strong> 
	`);
}


