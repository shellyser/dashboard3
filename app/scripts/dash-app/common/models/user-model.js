'use strict';

/**
 * @ngdoc service
 * @name dashApp.user
 * @description
 * # user
 * Factory in the dashApp.
 */
angular.module('dashApp')
  .factory('user', function ($http, $rootScope) {
    return {
        getUser: function(callback){
          $rootScope.user = {
            'firstName': 'coolNYC',
            'lastName': 'Admin',
            'email': 'coolnycprogram@thinkecoinc.com'
          };
          if (callback){
            callback();
          }
        },
        updateUser: function(firstName, lastName, callback){
          if (callback){
              callback();
          }
        }
    };
  });