angular.module('dashboard.enrollments.online', [])

	.config(function($stateProvider){
		$stateProvider
			.state('dashApp.dashboard.enrollment.online', {
			    url: "",
			    views: {
			        'online@dashboard.enrollment': {
			            templateUrl: 'app/dashboard/enrollment/online/online.html',
			            controller: 'OnlineCtrl'
			        }
			    }           
			})
	})
;