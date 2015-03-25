angular.module('dashboard.enrollments.signups', [])

	.config(function($stateProvider){
		$stateProvider
			.state('dashApp.dashboard.enrollments.signups', {
			    url: "",
			    views: {
			        'signups@': {
			            templateUrl: 'scripts/dashboard/enrollments/signups/signups.html',
			            controller: 'SignupCtrl'
			        }
			    }           
			})
	})

	.service('SignupModel', function ($http, $q) {
		var model = this,
			URLS = {
				FETCH: '/data/enrollment/signup'+'.json',
			},
			signups;

			function extract(result){
					return result.data;
			}

			function cacheSignups(result){
				signups = extract(result);
				return signups;
			}

			model.getSignups = function(params){
				return (signups) ? $q.when(signups) : $http.get(URLS.FETCH, params, {cache:true}).then(cacheSignups);
			}
	})

	.controller('SignupCtrl',  function ($scope, SignupModel) {
	    
	    // var $scope = this;
	    $scope.count = { total: 0 };
	    $scope.noData = false;
	    $scope.displayData = function(){
	    	if ($scope.noData){
	    		$scope.count = {total: '—'}
	    	}
	    	return $scope.noData;
	    };

		$scope.$watch('params', function(newValue, oldValue) {
	        if (newValue){
	        	var params = {
	        		param1: $scope.params.startDate,
	        		param2: $scope.params.endDate,
	        		param3: $scope.params.product,
	        	};
	        	var config = {
	        		params: params
	        	}

	            SignupModel.getSignups(config)
	            	.then(function(result){
	            		parseGraphData(result);
	            		parseMapData(result);
	            	})
	        }
	    }, true);
		
		function parseGraphData(data){

			var params = $scope.params,
				dates = [],
				labels = [],
				pointsDayByDay = [],
				pointsCum = [],
				signupData = {},
				graphData = {},
				dataPointsDayByDay = {},
				dataPointsCum = {},
				counter = 0,
				cumCounter = 0,
				selectedYear = $scope.year;
			
			//grab data for graphing
			signupData = data.years[selectedYear].data.GraphingData;

			//get cumulative total
			cumCounter = data.years[selectedYear].cumulativeTotal;
			
			//keys of graphing data are the dates
			dates = Object.keys(signupData);

			//take the year out of all the dates to shorten the labels
			for (var i in dates){
				labels.push(dates[i].slice(0, -5));
			}


			for (var key in signupData){
				//insert value for each key into the pointDayByDay area
				pointsDayByDay.push(signupData[key]);
				//keep track of the total values
				counter = counter + signupData[key];
				//keep track of the cumulative total
				cumCounter = cumCounter + signupData[key];
				//insert the cumulative total for each day into the pointCum array
				pointsCum.push(cumCounter);
			}
			//set the data for graphing for daybyday view
			dataPointsDayByDay = {
				label: "DayByDay",
				data: pointsDayByDay
			}
			//set the data for graphing for cumulative view
			dataPointsCumulative = {
				label: "Cumulative",
				data: pointsCum
			}
			//store labels in the graphData labels object
			graphData.labels = labels;
			graphData.datasets = [];
			
			if ($scope.params.viewtype === "DayByDay"){
				graphData.datasets.push(dataPointsDayByDay);
				$scope.count = { total: counter};
			} else {
				graphData.datasets.push(dataPointsCumulative);
				$scope.count = { total: cumCounter};	
			}
			if (graphData === undefined){
				$scope.noData = true;
			}
			else {
				$scope.graph = graphData;
			}
		}

		function parseMapData(data){
	  		var params = $scope.params,
	  			mapData = {},
	  			markers = [],
	  			points = [],
				tempMapData = {},
				selectedYear = $scope.year;

			tempMapData = data.years[selectedYear].data.MappingData;
			
			for (var key in tempMapData) {
				markers.push(key);
				points.push(tempMapData[key]);
			} 

			mapData = {
				'markers': markers,
			 	'points': points
			}
			$scope.map = mapData;
		}

		function noData(){
		  	elt.parent().hide();
		  	showGraphArea(false);
		  	elt.closest('.module-body').find('.module-body-stat').text('\u2014');
		  	elt.closest('.module-body').prev().find('.module-stat').text('\u2014');
	  	}
	})
;