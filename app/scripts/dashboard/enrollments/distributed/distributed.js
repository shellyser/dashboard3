angular.module('dashboard.enrollments.distributed', [])

	.config(function($stateProvider){
		$stateProvider
			.state('dashApp.dashboard.enrollment.distributed', {
			    url: "",
			    views: {
			        'distributed@dashboard.enrollment': {
			            templateUrl: 'app/dashboard/enrollment/distributed/distributed.html',
			            controller: 'DistributedCtrl'
			        }
			    }           
			})
	})
;