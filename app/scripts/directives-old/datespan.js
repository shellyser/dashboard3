'use strict';


/**
 * @ngdoc directive
 * @name dashApp.directive:dateSpan
 * @description
 * # dateSpan
 */
angular.module('dashApp')
  .directive('dateSpan', function ($timeout) {
    return {
      restrict: 'A',
      link: function postLink($scope, elt, attrs) {
        elt.on('click', function(){
          if (!(elt.hasClass('disabled'))){
            var newStartParam = $('#start-date-input').val(),
                newEndParam = $('#end-date-input').val();
            if (($scope.viewParameters.startDate !== newStartParam) || ($scope.viewParameters.endDate !== newEndParam)){
              $timeout(function(){
                if ($scope.viewParameters.startDate !== newStartParam){
                  $scope.viewParameters.startDate = newStartParam;
                }
                if ($scope.viewParameters.endDate !== newEndParam){
                  $scope.viewParameters.endDate = newEndParam;
                }
                $('#date-range-trigger').click();
              });
            }
          }
        });
      }
    };
  });