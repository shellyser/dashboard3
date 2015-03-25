angular.module('dashApp.drevents', [
	// 'dashApp.models.dashboard',
	'dashApp.models.drevents'
])

	.config(function($stateProvider){
		$stateProvider
            .state('dashApp.drevents', {
                url: 'drevents',
                    views: {
                        'content@': {
                            templateUrl: 'scripts/dashApp/drevents/drevents.html',
                            // controller: 'DreventsCtrl'
                        }
                    }
            })
    })
;
   
