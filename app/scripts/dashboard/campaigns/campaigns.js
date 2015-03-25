angular.module('dashboard.campaigns', [
	'dashApp.models.dashboard',
	'dashApp.models.campaigns'
])

	.config(function($stateProvider){
		$stateProvider
            .state('dashApp.dashboard.campaigns', {
                url: 'campaigns',
                    views: {
                        'content@dashboard': {
                            templateUrl: 'app/scripts/dashboard/campaigns/campaigns.html',
                            // controller: 'CampaignsCtrl'
                        }
                    }
            })
    })
;
   
