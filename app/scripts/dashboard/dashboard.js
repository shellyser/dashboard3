angular.module('dashboard', [
	'dashApp.models.dashboard'
])
	.config(function($stateProvider){
		$stateProvider
			.state('dashApp.dashboard', {
				url: '/',
				views: {
					// "master@":{
					//     templateUrl: 'scripts/dashboard/dashboard.tmpl.html'

					// },
					'header@' : {
					    templateUrl: 'scripts/dashboard/header.tmpl.html'
					},
					'content@' : {
					    templateUrl: 'scripts/dashboard/dashboard-overview.tmpl.html',
					     controller: 'OverviewCtrl'
					},
					'sidebar@' : {
					    templateUrl: 'scripts/dashboard/sidebar.tmpl.html',
					    controller: 'SidebarCtrl'
					}
				}
			})
	})

	.controller('OverviewCtrl', function ($scope, program, user, $rootScope, $cacheFactory) {
	    $rootScope.page = '';
	    user.getUser();
		program.getProgram(function(data){
			$('#loading').fadeOut();
			$rootScope.program = data;
		    $scope.logo = '/assets/img/logo-' + data.ProgramName.toLowerCase() + '.svg';
		});
	})

	.controller('SidebarCtrl', function ($scope, $location, program) {
	    $scope.isActive = function(route) {
	        return route === $location.path();
	        console.log($location.path());
	    }

	})
;

