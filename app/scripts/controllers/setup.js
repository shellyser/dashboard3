angular.module('dashApp')
.controller('SetupCtrl',  function ($scope, SetupModel) {
    var setupModule = 'setup';
    $scope.devices = ['modlets', 'thermostats'];
    $scope.deviceSelected = ['modlets', 'thermostats'];
    $scope.noData = false;
    $scope.displayData = function(){
    	if ($scope.noData){
    		$scope.count = {total: '—'}
    	}
    	return $scope.noData;
    };
	var dailyTotal = 0,
		cumulativeTotal = 0;


    var updateSelected = function(action, deviceType) {
		if (action === 'add' && $scope.deviceSelected.indexOf(deviceType) === -1) {
			$scope.deviceSelected.push(deviceType);
		}
		if (action === 'remove' && $scope.deviceSelected.indexOf(deviceType) !== -1) {
			$scope.deviceSelected.splice($scope.deviceSelected.indexOf(deviceType), 1);
		}
 		$scope.graph = [];
		var params1 = {
			param1: null, //$scope.params.startDate,
			param2: null, //$scope.params.endDate,
			param3: null, //$scope.params.product,
			param4: null //$scope.devices[0],
		}
		var config1 = {
			params: params1
		}
		var params2 = {
			param1: null, //$scope.params.startDate,
			param2: null, //$scope.params.endDate,
			param3: null, //$scope.params.product,
			param4: null //$scope.devices[1]
		}
		var config2 = {
			params: params2
		}
		var params = {
			param1: null, //$scope.params.startDate,
			param2: null, //$scope.params.endDate,
			param3: null, //$scope.params.product,
		};
		var config = {
			params: params
		}
		if ($scope.deviceSelected.length === 1){
			if ($scope.deviceSelected[0] === "modlets"){
				SetupModel.getSetupsModlets(config1)
					.then(function(result){
						console.log(result);
				 		var dailyTotal = 0,
						cumulativeTotal = 0,
				 		graphDataArray = [];
						parseGraphData(result, graphDataArray, dailyTotal, cumulativeTotal);
						$scope.noData = false;
				})
			} else {
				SetupModel.getSetupsThermostats(config2)
					.then(function(result){
						console.log(result);
				 		var dailyTotal = 0,
						cumulativeTotal = 0,
				 		graphDataArray = [];
						parseGraphData(result, graphDataArray, dailyTotal, cumulativeTotal);
						$scope.noData = false;
				})
			}
		}
		else if ($scope.deviceSelected.length === 2){
			SetupModel.getSetupsDevices(config1, config2)
				.then(function(result){
					console.log(result);
			 		var dailyTotal = 0,
					cumulativeTotal = 0,
			 		graphDataArray = [];
					parseGraphData(result, graphDataArray, dailyTotal, cumulativeTotal);
			})
		} 
		else {
			$scope.noData = true;
		}
	};

	$scope.updateDeviceSelection = function($event, deviceType) {
		var checkbox = $event.target;
		var action = (checkbox.checked ? 'add' : 'remove');
		updateSelected(action, deviceType);
	};

	$scope.isDeviceSelected = function(deviceType) {
  		return $scope.deviceSelected.indexOf(deviceType) >= 0;
	};


     $scope.$watch('params', function(newValue, oldValue) {
     	if (newValue){
     		$scope.graph = [];
	 		var params1 = {
	 			param1: null, //$scope.params.startDate,
	 			param2: null, //$scope.params.endDate,
	 			param3: null, //$scope.params.product,
	 			param4: null //$scope.devices[0],
	 		}
	 		var config1 = {
	 			params: params1
	 		}
	 		var params2 = {
	 			param1: null, //$scope.params.startDate,
	 			param2: null, //$scope.params.endDate,
	 			param3: null, //$scope.params.product,
	 			param4: null //$scope.devices[1]
	 		}
	 		var config2 = {
	 			params: params2
	 		}
	 		var params = {
	 			param1: null, //$scope.params.startDate,
	 			param2: null, //$scope.params.endDate,
	 			param3: null, //$scope.params.product,
	 		};
	 		var config = {
	 			params: params
	 		};
		 	if ($scope.params.product === "AC"){
		 	
		 		SetupModel.getSetupsDevices(config1, config2)
		 			.then(function(result){
		 				console.log(result);
 				 		var dailyTotal = 0,
 						cumulativeTotal = 0,
 				 		graphDataArray = [];
		 				parseGraphData(result, graphDataArray, dailyTotal, cumulativeTotal);
<<<<<<< HEAD
		 				parseMapData(result);

=======
>>>>>>> fdf006905a21e8070bc3f3fe9802dbf9b1a971be
		 			})
	 		} else {
	 			
	 			SetupModel.getSetups(config)
	 				.then(function(result){
	 					console.log(result);
				 		var dailyTotal = 0,
						cumulativeTotal = 0,
				 		graphDataArray = [];
	 					parseGraphData(result, graphDataArray, dailyTotal, cumulativeTotal);
<<<<<<< HEAD
	 					parseMapData(result);
=======
>>>>>>> fdf006905a21e8070bc3f3fe9802dbf9b1a971be
	 				})
		 	}
		};
	}, true);

	
	
	function parseGraphData(data, graphDataArray, dailyTotal, cumulativeTotal){
		if (data.length !== 2){
			data = [data];
			console.log(data);
		}
		for (var dataset in data){

		var params = $scope.params,
			graphData = {},
			dates = [],
			labels = [],
			pointsDayByDay = [],
			pointsCum = [],
			setupData = {},
			dataPointsDayByDay = {},
			dataPointsCum = {},
			counter = 0,
			cumulativeCounter = 0,
			selectedYear = $scope.year;
		
		
			if (params.commTypeSelected.length === 0){
				$scope.noData = true;
			}
			else{
				$scope.noData = false;
				//add selected communication types to setupData and set their values
				for (var i in params.commTypeSelected){
					var list = params.commTypeSelected[i].toLowerCase();
					setupData[list] = data[dataset].years[selectedYear].data.GraphingData[list];
				}

				//track # of undefined lists within setupData
				var undefinedListsCount = 0,
				definedlistsCount = 0;
				for (var setupList in setupData){
					if (!setupData[setupList]){
						undefinedListsCount++;
					}
					else{
						if(definedlistsCount === 0){
							dates = Object.keys(setupData[setupList].data);
						}
						definedlistsCount++;
					}
				}

				// make sure setupData has at least one defined communication list
				if (definedlistsCount > 0) {
					numberOfPoints = dates.length;
					//   init daybyday view graphPoints array with 0s
					pointsDayByDay = Array.apply(null, new Array(numberOfPoints)).map(Number.prototype.valueOf,0);
					//   init cumulative view graphPoints array with cumulativeTotal
					pointsCum = Array.apply(null, new Array(numberOfPoints)).map(Number.prototype.valueOf,0);

					for (var setupList in setupData){
						if (setupData[setupList] !== undefined){
							var eltCounter = 0;
							cumulativeCounter += setupData[setupList].cumulativeTotal;
							for (var elt in setupData[setupList].data){
								// add this value to the y-value of the relevant point
								var value = setupData[setupList].data[elt];
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
					
					if ($scope.params.viewtype === "DayByDay"){
						graphData.datasets= dataPointsDayByDay;
						$scope.count = { total: dailyTotal};
					} else {
						graphData.datasets= dataPointsCumulative;
						$scope.count = { total: cumulativeTotal};	
					}
					graphDataArray.push(graphData);
				}
			}
		}	
		$scope.graph = graphDataArray;
	}
<<<<<<< HEAD

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

	
=======
>>>>>>> fdf006905a21e8070bc3f3fe9802dbf9b1a971be
});