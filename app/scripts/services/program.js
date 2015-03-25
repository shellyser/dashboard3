'use strict';
/*global $:false */
/*global alert:false */

/**
 * @ngdoc service
 * @name dashApp.program
 * @description
 * # program
 * Factory in the dashApp.
 */
var debug = "http://10.0.0.52:4444/api/",
    prod = "http://utility-webapi.cloudapp.net:5555/api/";
    // url = debug;
    // url = prod;
    // url = 'data/program.json' ;

angular.module('dashApp')
  .factory('program', function ($http) {
      return {
          getProgram: function(callback){
            // $http.get(url + 'program', { timeout: timeout })
            $http.get('data/dashboard.json', { timeout: timeout })
            .success(callback)
            .error(function(){
              $('#loading').hide();
              alert('There was an error getting program data. Try refreshing the page.');
            });
          }
      };
  });