angular.module('dashboard.drevents', [
	'dashApp.models.dashboard',
	'dashApp.models.drevents',
	'dashboard.drevents.create',
	// 'dashboard.drevents.edit'
])
	.config(function($stateProvider){
		$stateProvider
		.state('dashApp.dashboard.drevents', {
			url: 'drevents',
			views: {
				'content@': {
					templateUrl: 'scripts/dash-app/dashboard/drevents/drevents.tmpl.html',
					controller: 'DreventsListCtrl as dreventsListCtrl'
				}
			}
		})
	})

	.controller('DreventsListCtrl',  function (DreventsModel) {
		var dreventsListCtrl = this;

		// DreventsModel.getDrevents()
		// 	.then(function(drevents){
		// 		dreventsListCtrl.drevents = drevents;
		// 	})

	})
;
   
