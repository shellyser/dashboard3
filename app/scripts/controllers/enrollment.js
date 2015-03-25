'use strict';
/*global $:false */

/**
 * @ngdoc function
 * @name dashApp.controller:BaseCtrl
 * @description
 * # BaseCtrl
 * Controller of the dashApp
 */
angular.module('dashApp')
.controller('EnrollmentCtrl',  function ($scope, enrollmentData, user, $rootScope, $cacheFactory) {
	var cache = $cacheFactory('enrollmentCache');

	if (cache.get('params') === undefined) {
		
	
	var date = 7;

	$scope.enrollment = enrollmentData;
	$('#loading').fadeOut();        

	if (enrollmentData.DateSpan === undefined){
	$scope.enrollment.DateSpan = date;
	}
	else{
	date = enrollmentData.DateSpan;
	}

		var endDate = moment().endOf('day').subtract(1, 'days').format("MM/DD/YYYY"),
			   startDate = moment().startOf('day').subtract(7, 'days').format("MM/DD/YYYY");
		
		$scope.dates = {};
		$scope.dates = {
			endDate:  endDate,
			startDate: startDate,
		};

		var communication = $scope.enrollment.CommunicationTypes;
		$scope.year = $scope.enrollment.TimePeriods[0];
		$scope.params = {};
		$scope.params.viewtype = $scope.enrollment.ViewTypes[0];
		$scope.params.product = $scope.enrollment.Products[0];
		$scope.radiobutton = $scope.enrollment.ViewForms[0];
		$scope.params.commTypeSelected = [];
		$scope.params.dates = $scope.dates;

		for (var i in communication){
			$scope.params.commTypeSelected.push(communication[i]);
		}

		var updateSelected = function(action, communicationType) {
		  if (action === 'add' && $scope.params.commTypeSelected.indexOf(communicationType) === -1) {
		    $scope.params.commTypeSelected.push(communicationType);
		  }
		  if (action === 'remove' && $scope.params.commTypeSelected.indexOf(communicationType) !== -1) {
		    $scope.params.commTypeSelected.splice($scope.params.commTypeSelected.indexOf(communicationType), 1);
		  }
		};

		$scope.updateSelection = function($event, communicationType) {
		  var checkbox = $event.target;
		  var action = (checkbox.checked ? 'add' : 'remove');
		  updateSelected(action, communicationType);
		};

		$scope.isSelected = function(communicationType) {
	  	return $scope.params.commTypeSelected.indexOf(communicationType) >= 0;
		};

		if ($scope.enrollment.Products.indexOf('Customer') < 0 && $scope.enrollment.Products.indexOf('customer') < 0){
			$scope.enrollment.Products.push('Customer');
		 }
	  
		$scope.drawGraph = {};

	}
	else{
		cache.put('params', $scope.params);
	}
	

});