angular.module('dashboard.enrollments', [
	'dashboard.enrollments.distributed',
	'dashboard.enrollments.setups',
	'dashboard.enrollments.online',
	'dashboard.enrollments.signups',
	'dashApp.models.enrollments',
	'dashApp.models.dashboard'
])

	.config(function($stateProvider){
		$stateProvider
			.state('dashApp.dashboard.enrollments', {
			    url: 'enrollments',
			    views: {
			        'content@': {
			            templateUrl: 'scripts/dash-app/dashboard/enrollments/enrollments.tmpl.html',
			            controller: 'EnrollmentCtrl',
			            resolve: {
			                enrollmentData: function(Enrollmentdata){
			                        var EnrollmentData = Enrollmentdata.get();
			                        return EnrollmentData.$promise;
			                }
			            }              
			        },
			        'signups@dashApp.dashboard.enrollments':{
			        	templateUrl: 'scripts/dash-app/dashboard/enrollments/signups/signups.html',
			        	controller: 'SignupCtrl'
			        },
			        'setups@dashApp.dashboard.enrollments':{
			        	templateUrl: 'scripts/dash-app/dashboard/enrollments/setups/setups.html',
			        	controller: 'SetupCtrl'
			        },
			        'distributed@dashApp.dashboard.enrollments':{
			        	templateUrl: 'scripts/dash-app/dashboard/enrollments/distributed/distributed.html',
			        	controller: 'DistributedCtrl'
			        },
			        'online@dashApp.dashboard.enrollments':{
			        	templateUrl: 'scripts/dash-app/dashboard/enrollments/online/online.html',
			        	controller: 'OnlineCtrl'
			        }
			    }           
			})
	})

	.controller('EnrollmentCtrl',  function ($scope, enrollmentData, user, $rootScope, $cacheFactory, $state) {
		// var cache = $cacheFactory('enrollmentCache');

		// if (cache.get('params') === undefined) {
			
		
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
		  	return ($scope.params.commTypeSelected.indexOf(communicationType) >= 0);
			};

			if ($scope.enrollment.Products.indexOf('Customer') < 0 && $scope.enrollment.Products.indexOf('customer') < 0){
				$scope.enrollment.Products.push('Customer');
			 }
		  
			$scope.drawGraph = {};

		// }
		// else{
		// 	cache.put('params', $scope.params);
		// }
		

	})

	.directive('dateRangeInput', function ($timeout,  $interval) {
		return {
		  restrict: 'A',
		  link: function postLink(scope, elt, attrs) {
		    elt.find('span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
		     
		    elt.daterangepicker({
		        format: 'MM/DD/YYYY',
		        startDate: scope.dates.startDate,
		        endDate: scope.dates.endDate,
		        minDate: '01/01/2012',
		        maxDate: moment(),
		        dateLimit: { days: 60 },
		        showDropdowns: true,
		        showWeekNumbers: true,
		        timePicker: false,
		        timePickerIncrement: 1,
		        timePicker12Hour: true,
		        ranges: {
		           'Today': [moment(), moment()],
		           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
		           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
		           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
		           'This Month': [moment().startOf('month'), moment().endOf('month')],
		           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
		        },
		        opens: 'left',
		        buttonClasses: ['btn', 'btn-sm'],
		        applyClass: 'btn-primary',
		        cancelClass: 'btn-default',
		        separator: ' to ',
		        locale: {
		            applyLabel: 'Submit',
		            cancelLabel: 'Cancel',
		            fromLabel: 'From',
		            toLabel: 'To',
		            customRangeLabel: 'Custom',
		            daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr','Sa'],
		            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		            firstDay: 1
		        }
		    }, function(start, end, label) {
		        if ((scope.dates.startDate !== start.format('MM/DD/YYYY')) || (scope.dates.endDate !== end.format('MM/DD/YYYY'))){
		          $timeout(function(){
		            if (scope.dates.startDate !== start.format('MM/DD/YYYY')){
		              scope.dates.startDate = start.format('MM/DD/YYYY');
		            }
		            if (scope.dates.endDate !== end.format('MM/DD/YYYY')){
		              scope.dates.endDate = end.format('MM/DD/YYYY');
		            }
		          });
		        }
		        console.log(start.toISOString(), end.toISOString(), label);
		        elt.find('span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
		    });

		  }
		};
  })  
;
