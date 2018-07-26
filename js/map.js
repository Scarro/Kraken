function initMap(){
	map = L.map('map',{
		center: [40.4175, -3.708],
		zoom: 11
	});
	
	L.tileLayer('https://api.tiles.mapbox.com/v4/scarro.ppial27m/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2NhcnJvIiwiYSI6ImNpbmhtdWdnaTAwMmd2ZGx5eHhsaWs5YzEifQ.FONk5Fvpiz12ehN8ByO2GA', {
    	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    	maxZoom: 18
	}).addTo(map);	
}