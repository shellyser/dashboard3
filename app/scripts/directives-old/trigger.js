'use strict';
/*global $:false */

/**
 * @ngdoc directive
 * @name dashApp.directive:trigger
 * @description
 * # trigger
 * This directive shows or hides an element (the "target") based on its current state.
 * When the animation is finished, the 'closed' class is added to the target, which can be used to further customize appearance.
 * target's ID must be indicated on trigger element by using attribute 'trigger-target'.
 */
angular.module('dashApp')
  .directive('trigger', function () {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs){
          if (attrs.triggerClosedClass && attrs.triggerOpenClass){
              var classes = [attrs.triggerClosedClass, attrs.triggerOpenClass];
          }
          $(elem).on('click', function(){
            var target = $('#' + attrs.triggerTarget);
              if (target.hasClass('closed')){
                  if (classes){
                      $(elem).removeClass(classes[0]);
                      $(elem).addClass(classes[1]);
                  }
                  target.css('display', 'none');
                   target.slideDown(200, function(){
                       target.css('display', '');
                       $(target).removeClass('closed');
                   });
               }
               else{
                   if (classes){
                       $(elem).removeClass(classes[1]);
                       $(elem).addClass(classes[0]);
                   }
                   target.slideUp(150, function(){
                       target.css('display', '');
                       target.addClass('closed');
                   });
               }
          });
      }
    };
  });