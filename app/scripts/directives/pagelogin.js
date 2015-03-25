'use strict';
/*global $:false */

/**
 * @ngdoc directive
 * @name dashApp.directive:pageLogin
 * @description
 * # pageLogin
 */
angular.module('dashApp')
  .directive('pageLogin', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
          var elt = $(element);
          elt.on('click', function(){
              if ($('#login-int').css('margin-left')==='0px'){
                  $('#login-int').animate({
                      'margin-left': '-100%'
                  }, 300);
                  $('#login-2').animate({
                      opacity: 1
                  }, 500);
                  $('#login-1').animate({
                      opacity: 0
                  }, 200);
              }
              else{
                 $('#login-int').animate({
                     'margin-left': '0px'
                 }, 300);
                 $('#login-1').animate({
                     opacity: 1
                 }, 500);
                 $('#login-2').animate({
                     opacity: 0
                 }, 200);
             }
          });
      }
    };
  });