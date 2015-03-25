angular.module('dashApp')
.controller('DistributedCtrl',  function ($scope, DistributedModel) {
	var distributedModule = 'distributed';
	$scope.deliveries = ["Total", "ViaInstaller", "ViaPost"];
	$scope.distributedparams = {};
	$scope.distributedparams.deliverySelected = $scope.deliveries[0];
	$scope.statuses = ['delivered', 'shipped'];
	$scope.statusSelected = ['delivered', 'shipped'];
	$scope.count = { total: 0 };
	$scope.noData = false;
	$scope.displayData = function(){
		if ($scope.noData){
			$scope.count = {total: '—'}
		}
		return $scope.noData;
	};

	var dailyTotal = 0,
		cumulativeTotal = 0;


    var updateSelected = function(action, status) {
		if (action === 'add' && $scope.statusSelected.indexOf(status) === -1) {
			$scope.statusSelected.push(status);
		}
		if (action === 'remove' && $scope.statusSelected.indexOf(status) !== -1) {
			$scope.statusSelected.splice($scope.statusSelected.indexOf(status), 1);
		}
   		$scope.graph = [];
 		var dailyTotal = 0;	
		
 		var params1 = {
 			param1: null, //$scope.params.startDate,
 			param2: null, //$scope.params.endDate,
 			param3: null, //$scope.params.product
 			param3: null, //$scope.deliveries,
 			param4: null //$scope.statuses[0],
 		}
 		var config1 = {
 			params: params1
 		}
 		var params2 = {
 			param1: null, //$scope.params.startDate,
 			param2: null, //$scope.params.endDate,
 			param3: null, //$scope.params.product
 			param4: null, //$scope.deliveries,
 			param5: null //$scope.statuses[1]
 		}
 		var config2 = {
 			params: params2
 		}
  		if ($scope.statusSelected.length === 1){
  			if ($scope.statusSelected[0] === "delivered"){
  				DistributedModel.getDistributedDelivered(config1)
  					.then(function(result){
  						console.log(result);
	  					var cumulativeTotal = 0,
	  					dailyTotal = 0,
				 		graphDataArray = [];
  						parseGraphData(result, graphDataArray, dailyTotal, cumulativeTotal);
  						parseMapData(result);
  						$scope.noData = false;
  				})
  			} else {
  				DistributedModel.getDistributedShipped(config2)
  					.then(function(result){
  						console.log(result);
	  					var cumulativeTotal = 0,
	  					dailyTotal = 0,
				 		graphDataArray = [];
  						parseGraphData(result, graphDataArray, dailyTotal, cumulativeTotal);
  						parseMapData(result);
  						$scope.noData = false;
  				})
  			}
  		}
  		else if ($scope.statusSelected.length === 2){
  			DistributedModel.getDistributedStatuses(config1, config2)
  				.then(function(result){
  					console.log(result);
  					var cumulativeTotal = 0,
  					dailyTotal = 0,
			 		graphDataArray = [];
  					parseGraphData(result, graphDataArray, dailyTotal, cumulativeTotal);
  					parseMapData(result);
  					$scope.noData = false;
  			})
  		} 
  		else {
  			$scope.noData = true;
  		}
	};

	$scope.updateStatusSelection = function($event, status) {
	  var checkbox = $event.target;
	  var action = (checkbox.checked ? 'add' : 'remove');
	  updateSelected(action, status);
	};

	$scope.isStatusSelected = function(status) {
	  	return $scope.statusSelected.indexOf(status) >= 0;
	};

	$scope.$watch('distributedparams', function(newValue, oldValue) {
      	if (newValue){
      		$scope.graph = [];
	 		var dailyTotal = 0,
			cumulativeTotal = 0,
	 		graphDataArray = [];
 	 		var params1 = {
 	 			param1: null, //$scope.params.startDate,
 	 			param2: null, //$scope.params.endDate,
 	 			param3: null, //$scope.params.product
 	 			param4: null, //$scope.deliveries,
 	 			param5: null  //$scope.statuses[0],
 	 		}
 	 		var config1 = {
 	 			params: params1
 	 		}
 	 		var params2 = {
 	 			param1: null, //$scope.params.startDate,
 	 			param2: null, //$scope.params.endDate,
 	 			param3: null, //$scope.params.product
 	 			param4: null, //$scope.deliveries,
 	 			param5: null  //$scope.statuses[1]
 	 		}
 	 		var config2 = {
 	 			params: params2
 	 		}
 	 		var params = {
 	 			param1: null, //$scope.params.startDate,
 	 			param2: null, //$scope.params.endDate,
 	 			param3: null, //$scope.params.product,
 				param4: null, //$scope.deliveries,
 	 		};
 	 		var config = {
 	 			params: params
 	 		};

 	 		if ($scope.distributedparams.deliverySelected === 'ViaPost'){
	  			DistributedModel.getDistributedStatuses(config1, config2)
	  				.then(function(result){
	  					console.log(result);
	  					var cumulativeTotal = 0,
	  					dailyTotal = 0,
					 		graphDataArray = [];
	  					parseGraphData(result, graphDataArray, dailyTotal, cumulativeTotal);
	  					parseMapData(result);
	  					$scope.noData = false;
	  			})
 	 		} else {
 	 			DistributedModel.getDistributed(config)
 	 				.then(function(result){
 	 					console.log(result);
	  					var cumulativeTotal = 0,
	  					dailyTotal = 0,
					 		graphDataArray = [];
 	 					parseGraphData(result, graphDataArray, dailyTotal, cumulativeTotal);
 	 					parseMapData(result);
 	 					$scope.noData = false;
 				})
 	 		}
 		};             
	}, true);

	$scope.$watch('params', function(newValue, oldValue) {
      	if (newValue){
      		$scope.graph = [];
	 		var dailyTotal = 0,
			cumulativeTotal = 0,
	 		graphDataArray = [];
 	 		// var params1 = {
 	 		// 	param1: null, //$scope.params.startDate,
 	 		// 	param2: null, //$scope.params.endDate,
 	 		// 	param3: null, //$scope.params.product
 	 		// 	param4: null, //$scope.deliveries,
 	 		// 	param5: null  //$scope.statuses[0],
 	 		// }
 	 		// var config1 = {
 	 		// 	params: params1
 	 		// }
 	 		// var params2 = {
 	 		// 	param1: null, //$scope.params.startDate,
 	 		// 	param2: null, //$scope.params.endDate,
 	 		// 	param3: null, //$scope.params.product
 	 		// 	param4: null, //$scope.deliveries,
 	 		// 	param5: null  //$scope.statuses[1]
 	 		// }
 	 		// var config2 = {
 	 		// 	params: params2
 	 		// }
 	 		var params = {
 	 			param1: null, //$scope.params.startDate,
 	 			param2: null, //$scope.params.endDate,
 	 			param3: null, //$scope.params.product,
 				param4: null, //$scope.deliveries,
 	 		};
 	 		var config = {
 	 			params: params
 	 		};
 	 			DistributedModel.getDistributed(config)
 	 				.then(function(result){
 	 					console.log(result);
	  					var cumulativeTotal = 0,
	  					dailyTotal = 0,
					 		graphDataArray = [];
 	 					parseGraphData(result, graphDataArray, dailyTotal, cumulativeTotal);
 	 					parseMapData(result);
 	 					$scope.noData = false;
 	 				})
 		};             
	}, true);
	
	function parseGraphData(data, graphDataArray, dailyTotal, cumulativeTotal){
		if (data.length !== 2){
			data = [data];
			console.log(data);
		}
		for (var dataset in data){

			var params = $scope.params,
				dates = [],
				labels = [],
				pointsDayByDay = [],
				pointsCum = [],
				distributedData = {},
				graphData = {},
				dataPointsDayByDay = {},
				dataPointsCum = {},
				counter = 0,
				cumulativeCounter = 0,
				selectedYear = $scope.year;
			if (params.commTypeSelected.length == 0){
				$scope.noData = true;
			}
			else{
				$scope.noData = false;
				//add selected communication types to distributedData and set their values
				for (var i in params.commTypeSelected){
					var list = params.commTypeSelected[i].toLowerCase();
					distributedData[list] = data[dataset].years[selectedYear].data.GraphingData[list];
				}

				//track # of undefined lists within distributedData
				var undefinedListsCount = 0,
				definedlistsCount = 0;
				for (var distributedList in distributedData){
					if (!distributedData[distributedList]){
						undefinedListsCount++;
					}
					else{
						if(definedlistsCount === 0){
							dates = Object.keys(distributedData[distributedList].data);
						}
						definedlistsCount++;
					}
				}

				// make sure distributedData has at least one defined communication list
				if (definedlistsCount > 0) {
					numberOfPoints = dates.length;
					//   init daybyday view graphPoints array with 0s
					pointsDayByDay = Array.apply(null, new Array(numberOfPoints)).map(Number.prototype.valueOf,0);
					//   init cumulative view graphPoints array with cumulativeTotal
					pointsCum = Array.apply(null, new Array(numberOfPoints)).map(Number.prototype.valueOf,0);

					for (var distributedList in distributedData){
						if (distributedData[distributedList] !== undefined){
							var eltCounter = 0;
							cumulativeCounter += distributedData[distributedList].cumulativeTotal;
							for (var elt in distributedData[distributedList].data){
								// add this value to the y-value of the relevant point
								var value = distributedData[distributedList].data[elt];
								cumulativeCounter += value;
								counter += value;
								pointsDayByDay[eltCounter] += value;
								pointsCum[eltCounter] = cumulativeCounter;
								eltCounter ++;
							}
						}
					}
					dailyTotal += counter,
					cumulativeTotal += cumulativeCounter;
					
					for (var i in dates){
						labels.push(dates[i].slice(0, -5));
					}

					dataPointsDayByDay = {
						data: pointsDayByDay
					}

					dataPointsCumulative = {
						data: pointsCum
					}

					graphData.labels = labels;
					
					//add to scope graph data depending on the viewtype
					if ($scope.params.viewtype === "DayByDay"){
						graphData.datasets = dataPointsDayByDay;
						$scope.count = { total: dailyTotal};
					} else {
						graphData.datasets = dataPointsCumulative;
						$scope.count = { total: cumulativeTotal};	
					}
					graphDataArray.push(graphData);
				}
			}
		}
		$scope.graph = graphDataArray;

	}

	function parseMapData(data){
			var markers = [],
				points = [],
				cumulativeTotal = 0;

			if (data.length !== 2){
				data = [data];
			}

			for (var dataset in data){
				var params = $scope.params,
					mapData = {},		
					devices = [],
					deviceData = [],
					tempMapData = {},
					selectedYear = $scope.year;
					tempMapData = data[dataset].years[selectedYear].data.MappingData;
			
				for (var device in tempMapData) {
					if (devices.indexOf(device) > -1 ){
						devices.push(device);
					}
					deviceData.push(tempMapData[device].data);
					cumulativeTotal += tempMapData[device].cumulativeTotal;
				} 

				for (var device in deviceData){
					var i = 0;
					for (var key in deviceData[device]){
						if ((device === "0" ) && (dataset === "0")){
							markers = Object.keys(deviceData[device]);
							points.push(deviceData[device][key]);
						}
						else{
							points[i].value += deviceData[device][key].value;
							points[i].cumulativeTotal += deviceData[device][key].cumulativeTotal;
							i++;
						}
					}
				} 

				mapData = {
					'markers': markers,
				 	'points': points
				}

			}
			$scope.map = mapData;
		}
});