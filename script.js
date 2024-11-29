const mainContainer = document.getElementById("container");
const contractName = "nantes";

const apiKey = "8048d90702b5859e190abdbd151ac624a54be2ff"

async function fetchData() { 
    const requestUrl = `https://api.jcdecaux.com/vls/v1/stations?contract=${contractName}&apiKey=${apiKey}`;
    const res = await fetch(requestUrl);
	const data = await res.json();
	
	distanceToAda(data)

}

fetchData()

function distanceToAda(data) { 
    for (station in data) {
		const distance = calculateDistance(
			data[station].position.lat,
			data[station].position.lng
		);
		data[station].distance = distance; 
		if (data[station].distance <= 1) {
			setMarkersOnStations(data[station]);
		}
    }
    
    data.sort((a, b) => a.distance - b.distance);
	
	for (station in data) {
		if (data[station].distance <= 1) {
			displayResults(data[station]);
		}
	}

}

// CALCUL DE LA DISTANCE //
function calculateDistance(lat, lng) {
	const R = 6371; // Radius of the earth in km
	const dLat = deg2rad(lat - adaLocation.lat); // deg2rad below
	const dLng = deg2rad(lng - adaLocation.lng);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(adaLocation.lat)) *
			Math.cos(deg2rad(lat)) *
			Math.sin(dLng / 2) *
			Math.sin(dLng / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const d = R * c; // Distance in km
	return d; // distance returned
}

function deg2rad(deg) {
	return deg * (Math.PI / 180);
}

function displayResults(station) { 
    const stationInfos = document.createElement("button");
    stationInfos.className = "stations-infos"
    stationInfos.setAttribute("id", station.number);

    stationInfos.innerHTML = `
    <strong>${station.name.slice(4)}</strong> - ${station.distance.toFixed(2).replace(".", ",")} Km<br>
        📍 ${station.address} <br>
        🚲 : <strong>${station.available_bikes}</strong>
    `;

    mainContainer.appendChild(stationInfos)
}