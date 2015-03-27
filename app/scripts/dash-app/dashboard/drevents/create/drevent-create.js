angular.module('dashboard.drevents.create', [

])

	.config(function($stateProvider){
		$stateProvider
		.state('dashApp.dashboard.drevents.create', {
			url: '/create',
			views: {
				'content@': {
					templateUrl: 'scripts/dash-app/dashboard/drevents/create/drevent-create.tmpl.html',
					controller: 'CreateDreventCtrl as createDreventCtrl'
				}
			}
		})
	})

	.controller('CreateDreventCtrl', function(){

	})
;