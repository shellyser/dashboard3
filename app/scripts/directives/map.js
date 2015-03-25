angular.module('dashApp')
.directive('map', function (module) {
	return {
		restrict: 'A',
<<<<<<< HEAD
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
=======
		link: function postLink(scope, elt, attrs) {
	     	 // step 1: when view parameters are modified,
	       	// redraw/repopulate everything in the module.
	     	scope.$watch('viewParameters', function(newValue, oldValue){
		      	if (newValue){
		      		showLoading();
		      		if ((newValue.startDate !== oldValue.startDate) || (newValue.endDate !== oldValue.endDate)){
			       	     // otherwise, start date is exclusive, and we want it to be inclusive.
			            var startDateMinusOne = new Date(
			            	newValue.startDate.split('-')[2],
			              newValue.startDate.split('-')[0] - 1,//1-12
			              newValue.startDate.split('-')[1]
			              );

			       	     startDateMinusOne.setDate(startDateMinusOne.getDate()-1);
			       	     startDateMinusOne = (startDateMinusOne.getMonth() + 1) + '-' + startDateMinusOne.getDate() + '-' + startDateMinusOne.getFullYear();
			       	     module.getModule(attrs.mapContent, startDateMinusOne, newValue.endDate, populateMap, noData);
			       }
			       	else{
			        	module.getModule(attrs.mapContent, null, null, populateMap, noData);
			       }
	     		}
     		 }, true);

	     	var dataMultipleSets = {
	     	  marker: [],
	     	  points: []
	     	};

	      	function populateMap(moduleName, data){
	      		console.log("I'm in populate map!")
	      		var params = scope.viewParameters,
	      			dataProducts = data["Map"][params.timespan][params.view][params.unit],
	      			mapData = {},
	      			markers = [],
	      			points = [],
	      			mapProducts = [],
	      			productsCounter = 0,
	      			concurrent;
      				mapData[moduleName] = {};
      			//   loop over list of every communicationType to be included
      			for ( var i in params.communication) {
      				//product exists for the current module
      				if (mapProducts.indexOf(params.communication[i]) >= 0){
      					var product =params.communication[i] ;
      					var mapProduct = dataProducts[product];
      					var concurrentlyChecker = false;
      					mapData[moduleName][product] = {};
      					//check if product has subproducts
      					for (var key in mapProduct){ 
	      					if (key === "viewChildrenConcurrently"){
	      						console.log(mapProduct);
	      						concurrentlyChecker = true;
	      						concurrent = mapProduct[key];
	      					}
	      				}
	      				// no subproducts
      					if (!(concurrentlyChecker)){
	      					for (var key in mapProduct) {
      							markers.push(key);
      							points.push(mapProduct[key]);
	      					} 
	      					mapData[moduleName][product] = {
	      						'markers': markers,
	      					 	'points': points
	      					 }
	      				}
	      				//case in which there's sub products
	      				else {
	      					var options = [];
	      					var subconcurrent;
	      					var subconcurrentlyChecker = false;
	      					 for (var subProduct in mapProduct){
	      					 	if (subProduct !== "viewChildrenConcurrently"){
	      					 		for (var key in subProduct){
	      					 			if (key === "viewChildrenConcurrently") {
	      					 				subconcurrentlyChecker = true;
	      					 				subconcurrent = subProduct[key];
	      					 			}
	      					 		}
	      					 	}
	      	      					 if (!(subconcurrentlyChecker)){
	      	      					 	if (subProduct !== "viewChildrenConcurrently"){
		      					 		mapData[moduleName][product][subProduct] = {};
		      					 		options.push(subProduct);
		      					 		var mapsubProduct = mapProduct[subProduct];
		      							for (var zipcode in mapsubProduct){
			      							markers.push(zipcode);
			      							points.push(mapsubProduct[zipcode]);
				      					} 
				      					mapData[moduleName][product][subProduct] = {
				      						'markers': markers,
				      					 	'points': points,
				      					 	'options': options
				      					}
				      				}
				      				else {
				      					mapData[moduleName][product]["concurrent"]= mapProduct[subProduct];
				      				}
		      					//case in which there's sub sub products
		      					} else {
	    							var suboptions = [];
	    							for (var supersubproduct in subProduct){
	    								if( supersubproduct !== "viewChildrenConcurrently"){
	    									for (var zipcode in supersubproduct){
				      							markers.push(zipcode);
				      							points.push(supersubproduct[zipcode]);
				      						} 
					      					mapData[moduleName][product][subProduct][supersubproduct] = {
					      						'markers': markers,
					      					 	'points': points,
					      					 	'options': suboptions
    										}
    									}
    									else {
    										mapData[moduleName][product][subProduct]["concurrent"] = subProduct[supersubproduct];
    									}
		      						}
		      					}	
      						}
      					} 
				}
				else{
					productsCounter++;
      					i++;
      				}
      				//no products exists such as signup module
      				if (productsCounter === params.communication.length){
      					var keys =  Object.keys(dataProducts);
      					if(jQuery.type(Number(keys[0])) !== 'number'){
      						noData();
      					}
      					else{
      						markers = Object.keys(dataProducts);
      						for (var key in dataProducts){
      							points.push(dataProducts[key]);
      						}
      						mapData[moduleName] = {
      							'markers': markers,
      							'points': points
      						}
      					}
      				}
      			}
      			console.log(mapData);
    			scope.mapData = mapData; 
    			setUpMap();
		}

	      	function setUpMap(){
	      		// case 1: the graph's info exists in the scope
	      		// and graph DOES NOT HAVE subgraphs
	      		if (attrs.mapContent in scope.mapData && !('concurrent' in scope.mapData[attrs.mapContent])){
	      		  	console.log(scope.mapData[attrs.mapContent]);
	      		  	elt.closest('.module').find('.module-view-options').hide();
	      		 	 // go straight to drawing the graph -- we don't need to do anything else
	      		  	showMapArea(scope.mapData);
	      		}
	      		// case 2: graph's info DOES NOT EXIST in scope
	      		// we should never hit this point, since this condition
	      		// is already tested for and handled in getModule()
	      		else if (!(attrs.mapContent in scope.mapData)){
	      		  	noData();
	      		}
	      		// case 3: graph's info exists in scope
	      		// and graph DOES HAVE subgraphs
	      		else{
	      		  // we need to render graph controls
	      		  // and pick a dataset to turn into the graph
	      		 	dataMultipleSets.markers.length = 0;
	      		 	dataMultipleSets.points.length = 0;
	      		  	var module = elt.closest('.module'),
	      		    	thisMap = scope
	      		    	.mapData[attrs.mapContent],
	      		   	renderControls = module.find('.module-controls').children().length <= 1;
	      		  // render a place for module's controls
	      		  	if (renderControls){
	      		    		module.find('.module-controls')
	      		    		.append('<div class="module-view-options"></div>');
	      		  	}
	      		  	module.find('.module-view-options').show();
	      		  	// if graphs are shown concurrently, render checkboxes
	      		  	var option, temp;
	      		  	console.log(thisMap);
	      		 	 if (thisMap.concurrent){
	      		    		var checkboxes = '<div class="module-view-options-checkboxes">';
	      		    		for (option in thisMap.options){
		      		      		temp = thisMap.options[option];
		      		      		checkboxes = checkboxes + '<div class="module-view-options-checkbox"><input type="checkbox" class="checkbox-option" checked id="' + temp + '-option" name="' + temp + '-option" attr-dataset="' + temp + '"><label for="' + temp + '-option">' + temp + '</label></div>';
		      		      		if (option === '0'){
		      		        		dataMultipleSets.labels = thisMap[temp].labels;
		      		      		}
		      		     		 dataMultipleSets.points.push(thisMap[temp].points);
		      		    	}
		      		       	checkboxes = checkboxes + '</div>';
		      		   	 module.find('.module-view-options').empty();
		      		    	module.find('.module-view-options').append(checkboxes);
		      		    	checkboxControls(module.find('.module-view-options'));
		      		    	drawMap(elt, dataMultipleSets, true);
	      		  	}
	      		  	// if Maps are shown separately, render a dropdown
	      		  	else{
	      		    		var dropdown = '<select class="module-view-options-dropdown">';
	      		    		for (option in thisMap.options){
	      		      			temp = thisMap.options[option];
	      		      			dropdown = dropdown + '<option value="' + temp + '">' + temp.charAt(0).toUpperCase() + temp.slice(1) + '</option>';
	      		    		}	
	      		    		dropdown = dropdown + '</select>';
	      		   		 module.find('.module-view-options').empty();
	      		    		module.find('.module-view-options').append(dropdown);
	      		   		 dropdownControls(module.find('.module-view-options'));
	      		   		 drawMap(elt, thisMap[thisMap.options[0]]);
	      		  	}
	      		}
	      }

	      	function drawMap(canvas, data, multipleDatasets, hiddenIndices, showYoDawgNav){
	      			// canvas.next().hide();
	      		 //    // sets canvas width in px based on width of module header (can't use module body, since this is hidden at smaller resolutions)
	      		 //    var canvasId = canvas.attr('id'),
	      		 //    animate = ANIMATE_GRAPH,
	      		 //    allOptionsUnchecked = false,
	      		 //    width = canvas
	      		 //    .closest('li')
	      		 //    .find('.module')
	      		 //    .css('width');
	      		 console.log(canvas);
	      		 var heatMapData = [],
	      		 	heatmap;

	      		 for (var i in data.points){
	      		 	var point = data.points[i];
	      		 	var lat = point["lat"],
	      		 	lng = point["long"],
	      		 	weight = point["value"],
	      		 	location = new google.maps.LatLng(lat , lng),
	      		 	googleMapPoint = {};
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
		      			google.maps.event.addDomListener(window, 'load', drawMap(elt, scope.mapData[attrs.mapContent]));
		      		}
		      		if (data === false || data === undefined){
		      			elt.parent().next().fadeIn();
		      		}
		      	}
>>>>>>> fdf006905a21e8070bc3f3fe9802dbf9b1a971be
		 }
    	}
});
