'use strict';
/*global $:false */
// /*global Chart:false */


/**
 * @ngdoc directive
 * @name dashApp.directive:module
 * @description
 */
angular.module('dashApp')
  .directive('module', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, elt) {
          var body,
              curr = $(elt);
          if (!(curr.is(':first-child'))){
              body = curr.find('.module-body');
              curr.addClass('module-closed');
              body.css('display', '');
          }
          else{
              curr.addClass('module-open');
              curr.find('.module-expand-button')
                .removeClass('fa-expand')
                .addClass('fa-compress');
          }
          curr.find('.module-expand-button').on('click', function(){
              if (curr.hasClass('module-open')){
                  hideModule(curr);
              }
              else{
                  hideModule($('.module-open'));
                  curr.find('.module-expand-button').removeClass('fa-expand').addClass('fa-compress');
                  curr.find('.module-body').slideDown(200, function(){
                      curr.removeClass('module-closed');
                      curr.addClass('module-open');
                      curr.find('.module-body').css('display', '');
                      if (scope.drawGraph !== undefined){
                        scope.drawGraph(elt.closest('.module').attr('id'));
                      }
                  });
              }
          });

          if ($('html').hasClass('no-cssanimations')){
            var loader = elt.find('.module-loading');
            if (!(loader.hasClass('replaced'))){
              loader.find('.loading-icon').remove();
              loader.append('<h3>Loading...</h3><h4>Refresh page if graph does not appear</h4>');
              loader.addClass('replaced');
            }
          }

          function hideModule(module){
              module.find('.module-expand-button').removeClass('fa-compress').addClass('fa-expand');
              module.find('.module-body').slideUp(150, function(){
                  module.removeClass('module-open');
                  module.addClass('module-closed');
                  module.find('.module-body').css('display', '');
              });
          }
      }
    };
  });