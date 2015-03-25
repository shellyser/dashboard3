'use strict';

/**
 * @ngdoc filter
 * @name dashApp.filter:capitalize
 * @function
 * @description
 * # capitalize
 * Filter in the dashApp.
 */
angular.module('dashApp')
  .filter('capitalize', function () {
    return function (input) {
      return input.substring(0,1).toUpperCase()+input.substring(1);
    };
  });

