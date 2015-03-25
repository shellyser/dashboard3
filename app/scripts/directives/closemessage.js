'use strict';
/*global $:false */

/**
 * @ngdoc directive
 * @name dashApp.directive:closeMessage
 * @description
 * # closeMessage
 */
angular.module('dashApp')
  .directive('closeMessage', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        element.on('click', function(){
            var message = $(element).closest('.message');
            message.animate({
                opacity: 0,
                height: 0,
                padding: 0,
                margin: 0
            }, 300, function(){
                message.css({
                    opacity: '',
                    height: '',
                    padding: '',
                    margin: '',
                    display: 'none'
                });
            });
        });
      }
    };
  });
