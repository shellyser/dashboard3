'use strict';
/*global $:false */


/**
 * @ngdoc service
 * @name dashApp.showErrorsOrSuccess
 * @description
 * # showErrorsOrSuccess
 * Service in the dashApp.
 */
angular.module('dashApp')
  .service('showErrorsOrSuccess', function showErrorsOrSuccess() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return{
        show: function(form, valid){
            if (!valid){
                var manual = form.find('.manual-errors'),
                    autogen = form.find('.autogen-errors');
                manual.empty();
                autogen.find('li').each(function(){
                    $('<li>' + $(this).text() + '</li>').appendTo(manual);
                });
            }
            else{
                form.find('.success-message').show();
            }
        }
    };
  });