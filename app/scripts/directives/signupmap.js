angular.module('dashApp')
.directive('signupMap', function (module) {
	return {
		restrict: 'A',
		link: function postLink(scope, elt, attrs) {
	     	 // step 1: when view parameters are modified,
	       	// redraw/repopulate everything in the module.
	     	scope.$watch('map', function(newValue, oldValue){
		      	if (newValue){

		      		setUpMap();
	     		}
     		 }, true);


	      	function setUpMap(){
	      		// // case 1: the graph's info exists in the scope
	      		// // and graph DOES NOT HAVE subgraphs
	      		// if (attrs.mapContent in scope.map && !('concurrent' in scope.map[attrs.mapContent])){
	      		//   	elt.closest('.module').find('.module-view-options').hide();
	      		//  	 // go straight to drawing the graph -- we don't need to do anything else
	      		  	showMapArea(scope.map);
	      		// }
	      	}

	      	function drawMap(canvas, data){
	      		 var heatMapData = [],
	      		 	heatmap;
	      		// if (heatmap !=== 'undefined'){
	      		// 	heatmap.setMap(null);
	      		// }
				for (var i in data.points){
	      		 	var point = data.points[i];
	      		 	var lat = point["latitude"],
	      		 	lng = point["longitude"],
	      		 	weight = 0,
	      		 	location = new google.maps.LatLng(lat , lng),
	      		 	googleMapPoint = {};
	      		 	if (scope.params.viewtype === "DayByDay"){
	      		 		weight = point["value"];
	      		 	} else {
	      		 		weight = point["cumulativeTotal"];
	      		 	}
	      		 	googleMapPoint["location"] = location;
	      		 	googleMapPoint["weight"] = weight;
	      		 	heatMapData.push(googleMapPoint);
				}
	      		 	console.log(heatMapData);

	      		    var mapOptions = {
	      		     	zoom: 10,
	      		      	center: new google.maps.LatLng(40.7127, -74.0059)

	    		    };
	    		    var height = $('#map-canvas').parent().css('height');
	    		    $('#map-canvas').css('height', height);
	      		    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	      		    var pointArray = new google.maps.MVCArray(heatMapData);
	      		    heatmap = new google.maps.visualization.HeatmapLayer({
	      		      data: pointArray
	      		    });
	      		    		// elt.closest('.module-body').find('.module-loading').fadeOut();
	      			heatmap.setMap(map);
	      	}

		      	function showLoading(){
			      	elt.closest('.module-body').find('.module-loading').fadeIn();
			      	elt.parent().fadeOut();
			      	elt.parent().next().fadeOut();
		      	}

		      	function noData(){
				      	// elt.parent().hide();
				      	// // showMapArea(false);
				      	// elt.closest('.module-body').find('.module-body-stat').text('\u2014');
				      	// elt.closest('.module-body').prev().find('.module-stat').text('\u2014');
		      	}

		      	function showMapArea(data){
		      		elt.closest('.module-body').find('.module-loading').fadeOut();
		      		if (data ===  true || data != undefined){
		      			elt.parent().fadeIn();
		      			google.maps.event.addDomListener(window, 'load', drawMap(elt, scope.map));
		      		}
		      		if (data === false || data === undefined){
		      			elt.parent().next().fadeIn();
		      		}
		      	}
		 }
    	}
});
