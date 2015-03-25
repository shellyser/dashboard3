'use strict';

/**
 * @ngdoc directive
 * @name dashApp.directive:communicationType
 * @description
 * # communicationType
 */
angular.module('dashApp')
  .directive('communicationType', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, elt, attrs) {

        elt.on('click', function(){
          if (scope.params.communication.indexOf(attrs.communicationTypeName) > -1){
            scope.params.communication.splice(scope.params.communication.indexOf(attrs.communicationTypeName), 1);
          }
          else{
            scope.params.communication.push(attrs.communicationTypeName);
          }
          scope.$apply();
        });
      }
    };
  });