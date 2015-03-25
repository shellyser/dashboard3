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
  .controller('BaseCtrl', function ($scope, program, user, $rootScope, $cacheFactory) {
    $rootScope.page = '';
    user.getUser();
    var cache = $cacheFactory('programCache');
    if (cache.get('defaults') === undefined){
      program.getProgram(function(data){
        $('#loading').fadeOut();
        $rootScope.program = data;
        console.log(data);
        $rootScope.logo = '/assets/img/logo-' + data.ProgramName.toLowerCase() + '.svg';
      });
    }
    else{
      $scope.$broadcast('defaults', cache.get('defaults'));
    }
    //event emitter on sidebar button in header
    $rootScope.changeToggle = function(){
      if ($rootScope.toggle === "collapse")
        $rootScope.toggle = "expand";
      else
        $rootScope.toggle = "collapse";
    };
  });