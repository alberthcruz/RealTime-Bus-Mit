

  mapboxgl.accessToken = 'pk.eyJ1IjoiYWxiZXJ0aGNydXoiLCJhIjoiY2xjbW4xMG5pMGt3dDNub2EyNjV3b3E3aSJ9.1AWh4HhtsED2Nl_M5pNVkw';

  var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-71.091350, 42.354618],
      zoom: 13
  });

  

  let counter = 0;
	function moveBuses(){
    	setTimeout(() => {
      	if (counter >= busCoordinates.length) {
       	 counter = 0; 
       	 return};
      	
		marker = new mapboxgl.Marker()
			.setLngLat(busCoordinates[counter])
			.addTo(map);
            counter++;
      	moveBuses();
      	}, 500);
  	  }




var busCoordinates = []; 

async function run(){
    const busLocations = [];
    busCoordinates = [];
    const locations = await getBusLocations();
   console.log(new Date());
   console.log(locations);

   let numLocations = locations.length;
   for(let bus =0; bus < numLocations; bus++){
    busLocations.push(locations[bus].attributes);
   }

   let busData = busLocations.length;
    for (let bus = 0; bus < busData; bus++) {
        busCoordinates.push([busLocations[bus].longitude, busLocations[bus].latitude]);
        
    }
    moveBuses();
    setTimeout(run,15000);
}

async function getBusLocations(){
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await  fetch(url);
    const json = await response.json();
    return json.data;
}
















