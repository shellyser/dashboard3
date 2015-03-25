angular.module('dashboard', [
	'dashApp.models.dashboard',
	// 'dashApp.models.enrollment',

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
					    templateUrl: 'scripts/dash-app/common/header.tmpl.html'
					},
					'content@' : {
					    templateUrl: 'scripts/dash-app/dashboard/dashoverview/dashboard.tmpl.html',
					     controller: 'OverviewCtrl'
					},
					'sidebar@' : {
					    templateUrl: 'scripts/dash-app/common/sidebar.tmpl.html',
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

	.directive('icon', function () {
	    return {
	            restrict: 'A',
	            link: function postLink($scope, elt) {
	                $scope.$watch('$viewContentLoaded', function(){
	                    var icon = document.createElement('i'),
	                        curr = elt;
	                    if (curr.hasClass('dashboard')){
	                        curr.find('em').before(icon);
	                            curr.find('i').addClass('fa fa-tachometer');
	                    }
	                    if (curr.hasClass('enrollments')){
	                             curr.find('em').before(icon);
	                            curr.find('i').addClass('fa fa-plus-square-o');
	                    }
	                    if (curr.hasClass('drevents')){
	                             curr.find('em').before(icon);
	                            curr.find('i').addClass('fa fa-bullhorn');
	                    }
	                    if (curr.hasClass('analytics')){
	                             curr.find('em').before(icon);
	                            curr.find('i').addClass('fa fa-bar-chart');
	                    }
	                if (curr.hasClass('campaigns')){
	                         curr.find('em').before(icon);
	                             curr.find('i').addClass('fa fa-file-text-o');
	                }
	            });
	        }
	    };
	})
	
;

