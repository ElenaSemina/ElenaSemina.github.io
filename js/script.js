// var uluru = {lat: 37.2939808, lng: 127.2014506};
//
// function initMap() {
// 	geocoder = new google.maps.Geocoder();
//   var map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 15,
// 				center: uluru
//     });
// 		var marker = new google.maps.Marker({
//           position: uluru,
//           map: map
//         });
//
// 		for (var city in uluru) {
// 			// Add the circle for this city to the map.
// 			var cityCircle = new google.maps.Circle({
// 				strokeColor: '#b3b5b3',
// 				strokeOpacity: 0.8,
// 				strokeWeight: 1,
// 				fillColor: '#b3b5b3',
// 				fillOpacity: 0.25,
// 				map: map,
// 				center: uluru,
// 				radius:600,
// 				// draggable: true,
// 				// geodesic: true,
// 				editable: true
// 			});
// 		}
// 		geocoder.geocode( {}, function(results, status){
// 			console.log(results);
// 		});
// }

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: 40.731, lng: -73.997}
  });
  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;

  document.getElementById('submit').addEventListener('click', function() {
    geocodeLatLng(geocoder, map, infowindow);
  });
}

function geocodeLatLng(geocoder, map, infowindow) {
  var input = document.getElementById('latlng').value;
	var radius_value = document.getElementById('radius').value;
	var radis_num = parseInt(radius_value);
  var latlngStr = input.split(',', 2);
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};

	console.log("радиус:" + radis_num);
	console.log("координаты:" +  latlngStr);

  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[1]) {
        map.setZoom(11);

				var map_ico = 'img/marker.png';

        var marker = new google.maps.Marker({
          position: latlng,
					icon:map_ico,
          map: map
        });

				var circle = new google.maps.Circle({
					strokeColor: '#b3b5b3',
					strokeOpacity: 0.8,
					strokeWeight: 1,
					fillColor: '#b3b5b3',
					fillOpacity: 0.42,
					map: map,
					center: latlng,
					radius: radis_num,
					// draggable: true,
					// geodesic: true,
					editable: true
				});


        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, marker, circle);
				console.log("адрес:" + results[0].formatted_address);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}
