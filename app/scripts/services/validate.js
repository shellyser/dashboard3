'use strict';

/**
 * @ngdoc service
 * @name dashApp.validate
 * @description
 * # validate
 * Service in the dashApp.
 */
angular.module('dashApp')
  .service('validate', function validate() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
        validate: function(form, success, failure){
            if (form.$valid){
                success();
            }
            else{
                failure();
            }
        }
    };
  });