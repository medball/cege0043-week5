var userMarker;

//zooming on the map where the user is by getting the user's position
//if the navigator does not support geolocation, an alert appears to let the user know
function zoomOnMap(){
	if(navigator.geolocation){
		alert('Zooming onto your position')
		navigator.geolocation.getCurrentPosition(getPosition);
	} 
	else{
		alert('Geolocation is not supported by this browser.');
	}
}

//setting the zooming scale and the map view to the user's position 
function getPosition(position){
	mymap.setView([position.coords.latitude, position.coords.longitude], 15);
}

function trackLocation(){
	if(navigator.geolocation){
		navigator.geolocation.watchPosition(showPosition);
	}
	else{
		alert('Geolocation is not supported by this browser.');
	}
}

function showPosition(position){
	if (userMarker){
		mymap.removeLayer(userMarker);
	}
	userMarker = L.marker([position.coords.latitude,position.coords.longitude]).addTo(mymap).bindPopup('Latitude: ' + position.coords.latitude + '<br>Longitude: ' + position.coords.longitude);
}

function getDistance(){
	alert('Getting distance');
	navigator.geolocation.getCurrentPosition(getDistanceFromMultiplePoints);
}

function getDistanceFromPoint(position){
	var lat = 51.524616;
	var lng = -0.13818;
	var distance = calculateDistance(position.coords.latitude, position.coords.longitude, lat, lng, 'K');
	if (distance <= 0.1){
		alert("Within proximity of UCL (100m)");
	}
}

function calculateDistance(lat1, lon1, lat2, lon2, unit){
			var radlat1 = Math.PI*lat1/180;
			var radlat2 = Math.PI*lat2/180;
			var radlon1 = Math.PI*lon1/180;
			var radlon2 = Math.PI*lon2/180;
			var theta = lon1-lon2;
			var radtheta = Math.PI*theta/180;
			var subAngle = Math.sin(radlat1)*Math.sin(radlat2) + Math.cos(radlat1)*Math.cos(radlat2)*Math.cos(radtheta);
			subAngle = Math.acos(subAngle);
			subAngle = subAngle*180/Math.PI;
			dist = (subAngle/360)*2*Math.PI*3956;

			if (unit == 'K'){dist = dist*1.609344;}
			if (unit == 'N'){dist = dist*0.8684;}
			return dist	
		}

function getDistanceFromMultiplePoints(position){
	var minDistance = 100000000000;
	var closestQuake = "";
	for(var i = 0; i < earthquakes.features.length; i++){
		var obj = earthquakes.features[i];
		var distance = calculateDistance(position.coords.latitude,position.coords.longitude,obj.geometry.coordinates[0], obj.geometry.coordinates[1], 'K');
		if (distance < minDistance){
			minDistance = distance;
			closestQuake = obj.properties.place;
		}
	}
	alert("Earthquake: " + closestQuake + " is " + minDistance + " km away");
}