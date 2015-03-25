'use strict';

/**
 * @ngdoc filter
 * @name dashApp.filter:yearify
 * @function
 * @description
 * # yearify
 * Filter in the dashApp.
 */
angular.module('dashApp')
  .filter('yearify', function () {
    return function (input) {
      if (input){
        return input.toString().substring(2, 4);
      }
      else{
        return
      }
    };
  });
