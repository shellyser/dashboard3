angular.module('dashboard.enrollments', [
	'dashboard.enrollments.distributed',
	'dashboard.enrollments.signups',
	'dashboard.enrollments.setups',
	'dashboard.enrollments.online',
	'dashApp.models.dashboard',
	'dashApp.models.enrollments'
])

	.config(function($stateProvider){
		$stateProvider
			.state('dashApp.dashboard.enrollments', {
			    url: 'enrollments',
			    views: {
			        'content@': {
			            templateUrl: 'scripts/dashboard/enrollments/enrollments.tmpl.html',
			            controller: 'EnrollmentCtrl',
			            resolve: {
			                enrollmentData: function(Enrollmentdata){
			                        var EnrollmentData = Enrollmentdata.get();
			                        return EnrollmentData.$promise;
			                }
			            }              
			        }
			    }           
			})
	})

	.factory('Enrollmentdata', ['$resource', function ($resource) {
    return $resource('/data/enrollment/:enrollmentController'+'.json', 
      {
        enrollmentController: "@enrollmentController",
        startDate: "@startDate",
        endDate: "@endDate",
        communicationType: "@communicationType",
        product: "@product",
        device: "@device",
        delivery: "@delivery",
        status: "@status"
        
      },
      {
        'enrollment': { 
          method: 'GET', 
          params:{
            enrollmentController: "enrollment"
          },
          isArray: false
        },
        'signup': {
          method: "GET",
          isArray: false,
          params: {
            enrollmentController: "signup",
            startDate: "startDate",
            endDate: "endDate",
            product: "product"
          }
        },
        'distributed': {
          method: "GET",
          params: {
            enrollmentController: "distributed",
            startDate: "startDate",
            endDate: "endDate",
            delivery: "delivery",
            product: "product",
            status: "status"
          },
          isArray: false
        },
        'setup': {
          method: "GET",
          params: {
            enrollmentController: "setup",
            startDate: "startDate",
            endDate: "endDate",
            product: "product",
            device: "device"
          },
          isArray: false
        },
        'online': {
          method: "GET",
          params: {
            enrollmentController: "online",
            startDate: "startDate",
            endDate: "endDate",
            device: "device",
            product: "product"
          },
          isArray: false
        }
      });
}])      



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
		

	})
;
