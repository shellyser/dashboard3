angular.module('dashboard.analytics', [
	'dashApp.models.dashboard',
	'dashApp.models.analytics'
])

	.config(function($stateProvider){
		$stateProvider
            .state('dashApp.dashboard.analytics', {
                url: 'analytics',
                    views: {
                        'content@dashboard': {
                            templateUrl: 'app/scripts/dashboard/analytics/analytics.html',
                            // controller: 'AnalyticsCtrl'
                        }
                    }
            })
    })
;
   