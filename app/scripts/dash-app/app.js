'use strict';

/**
 * @ngdoc overview
 * @name dashApp
 * @description
 * # dashApp
 *
 * Main module of the application.
 */

 angular.module('dashApp', [
     'FormErrors', 
     'ui.router', 
     'ngResource', 
     'ui.bootstrap',
     'dashboard', 
     'dashboard.enrollments',
     'dashboard.drevents' 
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
    

    // .config(function($stateProvider, $urlRouterProvider){
    //     // $locationProvider.html5Mode(true);

    //     $stateProvider
    //         .state('dashApp',{
    //             url: '/',
    //             // abstract: true,
    //             views: {
    //                 'header@' : {
    //                     templateUrl: 'scripts/dash-app/common/header.tmpl.html'
    //                 },
    //                 'content@' : {
    //                                         // templateUrl: 'scripts/dash-app/dashoverview/overview.tmpl.html',
    //                                         //  // controller: 'OverviewCtrl'
    //                                     },
    //                 'sidebar@' : {
    //                     templateUrl: 'scripts/dash-app/common/sidebar.tmpl.html',
    //                     controller: 'SidebarCtrl'
    //                 }
    //             }
    //         });

    //     $urlRouterProvider.otherwise('/');
      
    // })

   

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
            }
        }
    })

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
    })

   
;