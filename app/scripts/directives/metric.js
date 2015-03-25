'use strict';

/**
 * @ngdoc directive
 * @name dashApp.directive:metric
 * @description
 * # metric
 */
angular.module('dashApp')
  .directive('metric', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, elt) {
        elt.on('click change', function(){
          scope.viewParameters.unit = elt.val();
          scope.$apply();
        });
      }
    };
  });
