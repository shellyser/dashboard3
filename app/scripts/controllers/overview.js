'use strict';
/*global $:false */

/**
 * @ngdoc function
 * @name dashApp.controller:BaseCtrl
 * @description
 * # BaseCtrl
 * Controller of the dashApp
 */
angular.module('dashApp')
  .controller('OverviewCtrl', function ($scope, program, user, $rootScope, $cacheFactory) {
    $rootScope.page = '';
    user.getUser();
      program.getProgram(function(data){
        $('#loading').fadeOut();
        $rootScope.program = data;
        $scope.logo = '/assets/img/logo-' + data.ProgramName.toLowerCase() + '.svg';
      });
});