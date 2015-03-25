angular.module('dashboard.enrollments.setups', [])

	.config(function($stateProvider){
		$stateProvider
			.state('dashApp.dashboard.enrollment.setups', {
			    url: "",
			    views: {
			        'setups@dashboard.enrollment': {
			            templateUrl: 'app/dashboard/enrollment/setups/setups.html',
			            controller: 'SetupCtrl'
			        }
			    }           
			})
	})
;