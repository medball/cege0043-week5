function loadW3HTML(){
	w3.includeHTML();
}

function startup(){
	document.addEventListener('DOMContentLoaded',function(){
		zoomOnMap();
	},false);
	document.addEventListener('DOMContentLoaded',function(){
		trackLocation();
	},false);
	document.addEventListener('DOMContentLoaded',function(){
		loadW3HTML();
	},false);
	document.addEventListener('DOMContentLoaded',function(){
		getFormData();
	},false);
}

