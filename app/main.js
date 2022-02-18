var coords
var coordsData = []
var interval
var statusInterval = false
var distance = []
var a, c, lat1, lat2, lon1, lon2, dist, d
var coords0Lat = 0, coords0Lon = 0, coords1Lat = 0, coords1Lon = 0
var newPoint = new GeoLocation()
var row, cell1, cell2, cell3, row
var table = document.getElementById('coordsTable')
var totalDistance = 0
var totalTime = 0
var speed = 0
var totalTimeMinutes = 0
var totalTimeSeconds = 0

function showPosition() {
    if (!statusInterval) {
        interval = setInterval(GetSetCoords, 1000);
        statusInterval = true
    } else {
        localStorage.setItem('route', JSON.stringify(coordsData))
        clearInterval(interval)
        statusInterval = false
    }
}

function GetSetCoords() {
    coords = newPoint.getCoordinates()
    coords0Lat = coords.latitude
    coords0Lon = coords.longitude

    if (coords0Lat !== coords1Lat || coords0Lon !== coords1Lon) {
        row = table.insertRow();
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell3 = row.insertCell(2);
        cell1.innerHTML = coords.latitude;
        cell2.innerHTML = coords.longitude;
        cell3.innerHTML = coords.date;
        coords['time'] = new Date()
        coordsData.push(coords)
        d = 0
        totalDistance = 0
        coords1Lat = coords.latitude
        coords1Lon = coords.longitude
        console.log(coordsData)
        getDistance()
    }
}

function getDistance() {
    for (i = 0; i < coordsData.length - 1; i++) {
        console.log(coordsData[i].latitude, coordsData[i].longitude, coordsData[1 + i].latitude, coordsData[1 + i].longitude);
        dist = distanceInKmBetweenEarthCoordinates(coordsData[i].latitude, coordsData[i].longitude, coordsData[1 + i].latitude, coordsData[1 + i].longitude)
        distance.push({ 'coords1': coordsData[i], 'coords2': coordsData[i + 1], 'distance': dist })
        totalDistance = totalDistance + dist
        totalTime += (coordsData[1 + i].time - coordsData[i].time) * 0.001
        totalTimeMinutes = Math.floor(totalTime / 60)
        totalTimeSeconds = Math.floor(totalTime - (totalTimeMinutes * 60))
        console.log('totalTime = ', totalTime)
        console.log('totalTimeMinutes = ', totalTimeMinutes)
        console.log('totalTimeSeconds = ', totalTimeSeconds)
        speed = totalDistance / totalTime
        console.log('averageSpeed = ', speed)
        // time not correct
    }
    console.log(`Distance Coords List\n`, distance);
    document.getElementById('totalDistance').innerText = totalDistance.toFixed(3)
    document.getElementById('totalTimeMinutes').innerText = totalTimeMinutes
    document.getElementById('totalTimeSeconds').innerText = totalTimeSeconds
    document.getElementById('speedAverage').innerText = speed.toFixed(3)

    // clearInterval(interval)
    // tatusInterval = false
}

function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var piNumber = Math.PI / 180;    // Math.PI / 180
    var result = 0.5 - Math.cos((lat2 - lat1) * piNumber) / 2 + Math.cos(lat1 * piNumber) * Math.cos(lat2 * piNumber) * (1 - Math.cos((lon2 - lon1) * piNumber)) / 2;

    return (12742 * Math.asin(Math.sqrt(result))) * 1000; // 2 * R; R = 6371 km
}

$(document).ready(function () {
    console.log('User Call Service', newPoint.user)
});

function getCoordsToClip() {
    navigator.clipboard.writeText(JSON.stringify(coordsData));
}