angular.module('dashboard.drevents', [
	'dashApp.models.dashboard',
	'dashApp.models.drevents'
])

	.config(function($stateProvider){
		$stateProvider
            .state('dashApp.dashboard.drevents', {
                url: 'drevents',
                    views: {
                        'content@dashboard': {
                            templateUrl: 'app/scripts/dashboard/drevents/drevents.html',
                            // controller: 'DreventsCtrl'
                        }
                    }
            })
    })
;
   
