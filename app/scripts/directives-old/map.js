angular.module('dashApp')
.directive('map', function (module) {
	return {
		restrict: 'A',
		// scope: {
		// 	content: "="
		// },
		link: function postLink(scope, element, attrs) {
	     	 // step 1: when view parameters are modified,
	       	// redraw/repopulate everything in the module.
	     	scope.$watch('map', function(newValue, oldValue){
		      	if (newValue){
		      		// if (geoData !== undefined){
		      		// 	geoData.remove();
		      		// }
		      		drawMap(scope);
	     		}
     		 }, true);


	      	// function drawMap(canvas, attrs.content){
	   //    		 var heatMapData = [],
	   //    		 	pointArray = [].
	   //    		 	heatmap;
	   //    		// if (heatmap !=== 'undefined'){
	   //    		// 	heatmap.setMap(null);
	   //    		// }
				// for (var i in data.points){
	   //    		 	var point = data.points[i];
	   //    		 	var lat = point["latitude"],
	   //    		 	lng = point["longitude"],
	   //    		 	weight = 0,
	   //    		 	location = new google.maps.LatLng(lat , lng),
	   //    		 	googleMapPoint = {};
	   //    		 	if (scope.params.viewtype === "DayByDay"){
	   //    		 		weight = point["value"];
	   //    		 	} else {
	   //    		 		weight = point["cumulativeTotal"];
	   //    		 	}
	   //    		 	googleMapPoint["location"] = location;
	   //    		 	googleMapPoint["weight"] = weight;
	   //    		 	heatMapData.push(googleMapPoint);
				// }
	   //    		 	console.log(heatMapData);

	   //    		    var mapOptions = {
	   //    		     	zoom: 10,
	   //    		      	center: new google.maps.LatLng(40.7127, -74.0059)

	   //  		    };
	   				function drawMap(scope){
			 		    var height = $('#map-canvas').parent().css('height');
			 		    $('#map-canvas').css('height', height);
			//    		    if (!map){
			//    		    	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
			//    		    }
			//    		    pointArray = new google.maps.MVCArray(heatMapData);
			//    		    heatmap = new google.maps.visualization.HeatmapLayer({
			//    		      data: pointArray
			//    		    });
			//    		    		// element.closest('.module-body').find('.module-loading').fadeOut();
			//    			heatmap.setMap(map);
			 	  		$.getJSON('data/enrollment/map.json', renderMap);

			 	  		function renderMap(geoData){
			 	  			
			 	  			if (map != undefined) { map.remove(); }
			 	  			var map = L.map('map-canvas'),
			 	  				osm = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

			 	  			L.tileLayer(osm).addTo(map);

			 	  			var geoJson = L.geoJson(geoData, {
			 	  				style: function (feature){
			 	  					return {
			 	  						weight: 1,
			 	  						opacity: 0.5,
			 	  						color: '#ff0000',
			 	  						fillColor: "#00dd00",
			 	  						fillOpacity: 0.2
			 	  					}
			 	  				}
			 	  			}).addTo(map);
			 	  			map.fitBounds(geoJson.getBounds());
			 	  		}
			 	  		
	   				}
	    		  
	    	  	// }


		      	// function showLoading(){
			      // 	element.closest('.module-body').find('.module-loading').fadeIn();
			      // 	element.parent().fadeOut();
			      // 	element.parent().next().fadeOut();
		      	// }

		      	// function noData(){
				     //  	// element.parent().hide();
				     //  	// // showMapArea(false);
				     //  	// element.closest('.module-body').find('.module-body-stat').text('\u2014');
				     //  	// element.closest('.module-body').prev().find('.module-stat').text('\u2014');
		      	// }

		      	// function showMapArea(data){
		      	// 	element.closest('.module-body').find('.module-loading').fadeOut();
		      	// 	if (data ===  true || data != undefined){
		      	// 		element.parent().fadeIn();
		      	// 		google.maps.event.addDomListener(window, 'load', drawMap(element, scope.map));
		      	// 	}
		      	// 	if (data === false || data === undefined){
		      	// 		element.parent().next().fadeIn();
		      	// 	}
		      	// }

		 }
    	}
});
