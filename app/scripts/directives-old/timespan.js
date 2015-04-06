'use strict';

/**
 * @ngdoc directive
 * @name dashApp.directive:timespan
 * @description
 * # timespan
 */
angular.module('dashApp')
  .directive('timespan', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, elt, attrs) {
        elt.on('click', function(){
          scope.viewParameters.timespan = attrs.timespanVal;
          scope.$apply();
        });
      }
    };
  });