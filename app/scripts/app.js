'use strict';

/**
 * @ngdoc overview
 * @name dashApp
 * @description
 * # dashApp
 *
 * Main module of the application.
 */

<<<<<<< HEAD
angular.module('dashApp', [
    'FormErrors', 
    'ui.router', 
    'ngResource', 
    'ui.bootstrap',
    'dashboard', 
    'dashboard.enrollments', 
])

    .config(function($stateProvider, $urlRouterProvider){
        // $locationProvider.html5Mode(true);

        $stateProvider
            .state('dashApp',{
                url: '',
                abstract: true,
                template: '<ui-view/>',
            });

        $urlRouterProvider.otherwise('/');
      
    })

    .factory('program', function ($http) {
        return {
            getProgram: function(callback){
                // $http.get(url + 'program', { timeout: timeout })
                $http.get('data/dashboard.json')
                .success(callback)
                .error(function(){
                    $('#loading').hide();
                    alert('There was an error getting program data. Try refreshing the page.');
                });
=======
angular.module('dashApp', ['FormErrors', 'ui.router', 'ngResource', 'ui.bootstrap'])

.config(function($stateProvider, $urlRouterProvider){
    // $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('dashboard', {
        url: '/',
        views: {
            "master":{
                templateUrl: '/views/dashboard.html'

            },
            'header@dashboard' : {
                templateUrl: '/views/header.html'
            },
            'content@dashboard' : {
                templateUrl: '/views/dashoverview.html',
                 controller: 'OverviewCtrl'
               
            },
            'sidebar@dashboard' : {
                templateUrl: '/views/sidebar.html',
                controller: 'SidebarCtrl'
            }
        }
    })
    .state('dashboard.enrollment', {
        url: 'enrollment',
        views: {
            'content@dashboard': {
                templateUrl: '/views/enrollment.html',
                controller: 'EnrollmentCtrl',
                resolve: {
                    enrollmentData: function(Enrollmentdata){
                            var EnrollmentData = Enrollmentdata.get();
                            return EnrollmentData.$promise;
                    }
                }              
            }
        }           
    })

    // .state('dashboard.enrollment.setup', {
    //     url: 'setup',
    //     views: {
    //         'setup':{
    //             templateUrl: '/views/enrollment/setup.html',
    //             controller: 'SetupCtrl'
    //         }
    //     }
    // })

    .state('dashboard.drevents', {
        url: 'drevents',
        views: {
            'content@dashboard': {
                templateUrl: '/views/drevents.html',
                // controller: 'EventsCtrl'
>>>>>>> fdf006905a21e8070bc3f3fe9802dbf9b1a971be
            }
        }
    })

<<<<<<< HEAD
    .factory('user', function ($http, $rootScope) {
        return {
            getUser: function(callback){
                $rootScope.user = {
                    'firstName': 'coolNYC',
                    'lastName': 'Admin',
                    'email': 'coolnycprogram@thinkecoinc.com'
                };
                if (callback){
                    callback();
                }
            },
            updateUser: function(firstName, lastName, callback){
                if (callback){
                    callback();
                }
            }
        };
    })

    .controller('BaseCtrl', function ($scope, program, user, $rootScope, $cacheFactory) {
        $rootScope.page = '';
        user.getUser();
        var cache = $cacheFactory('programCache');
        if (cache.get('defaults') === undefined){
          program.getProgram(function(data){
            $('#loading').fadeOut();
            $rootScope.program = data;
            console.log(data);
            $rootScope.logo = '/assets/img/logo-' + data.ProgramName.toLowerCase() + '.svg';
          });
        }
        else{
          $scope.$broadcast('defaults', cache.get('defaults'));
        }
        //event emitter on sidebar button in header
        $rootScope.changeToggle = function(){
            if ($rootScope.toggle === "collapse")
                $rootScope.toggle = "expand";
            else
                $rootScope.toggle = "collapse";
        };
=======
    .state('dashboard.analytics', {
        url: 'analytics',
        views: {
            'content@dashboard': {
                templateUrl: '/views/analytics.html',
                // controller: 'AnalyticsCtrl'
            }
        }
    })

    .state('dashboard.campaigns', {
        url: 'campaigns',
        views: {
            'content@dashboard': {
                templateUrl: '/views/campaigns.html',
                // controller: 'CampaignsCtrl'
            }
        }
    })

    .state('dashboard.settings', {
        url: 'settings',
        views: {
            'content@dashboard': {
                templateUrl: '/views/settings.html',
                controller: 'SettingsCtrl'
            }
        }
    })
    .state('dashboard.reports', {
       url: 'reports',
       views: {
        'content@dashboard': {
              templateUrl: '/views/reports.html',
              // controller: 'ReportsCtrl'
          }
        }
    })
      .state('dashboard.help', {
       url: 'help',
       views: {
            'content@dashboard': {
              templateUrl: '/views/help.html',
              // controller: 'ReportsCtrl'
            }
        }
    })

    .state('login', {
       url: 'login',
       views: {
          templateUrl: '/views/login.html',
          controller: 'LoginCtrl'
        }
    })
    .state('404', {
        templateUrl: '/views/error.html'
    })
    
>>>>>>> fdf006905a21e8070bc3f3fe9802dbf9b1a971be
});