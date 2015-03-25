'use strict';
// /*global alert:false */
/*global $:false */

/**
 * @ngdoc function
 * @name dashApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the dashApp
 */
angular.module('dashApp')
  .controller('SettingsCtrl', function ($scope, $rootScope, program, user, showErrorsOrSuccess, validate) {
    $rootScope.page = 'account settings';
    $scope.template = 'views/account.html';
    $scope.validate = validate.validate;
    $scope.showNameSuccess = false;
    $scope.showNameError = false;
    $scope.showPasswordSuccess = false;
    $scope.showPasswordError = false;
    $scope.submitChangeName = function(){
        $scope.showNameSuccess = false;
        $scope.showNameError = false;
        if (this.changeName.$valid){
            user.updateUser($('#firstName').val(), $('#lastName').val(), function(){
                showErrorsOrSuccess.show($('#changeName'), true);
                $scope.showNameSuccess = true;
            });
        }
        else{
            showErrorsOrSuccess.show($('#changeName'), false);
            $scope.showNameError = true;
        }
    };
    $scope.submitPassword = function(){
        $scope.showPasswordSuccess = false;
        $scope.showPasswordError = false;
        if(this.changePassword.$valid){
            showErrorsOrSuccess.show($('#changePassword'), true);
            $scope.showPasswordSuccess = true;
            $('#changePassword input[type="password"]').each(function(){
                $(this)[0].value = '';
            });
        }
        else{
            showErrorsOrSuccess.show($('#changePassword'), false);
            $scope.showPasswordError = true;
        }
    };
  });