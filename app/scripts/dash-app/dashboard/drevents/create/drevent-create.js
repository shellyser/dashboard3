angular.module('dashboard.drevents.create', [

])

	.config(function($stateProvider){
		$stateProvider
		.state('dashApp.dashboard.drevents.create', {
			url: 'drevents/create',
			views: {
				'content@': {
					templateUrl: 'scripts/dash-app/dashboard/drevents/create/drevents-create.tmpl.html',
					controller: 'CreateDreventCtrl as createDreventCtrl'
				}
			}
		})
	})

	.controller('CreateDreventCtrl', function(){

	})
;