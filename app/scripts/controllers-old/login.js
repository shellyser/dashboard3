'use strict';
/*global $:false */
/*global alert:false */



/**
 * @ngdoc function
 * @name dashApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the dashApp
 */
angular.module('dashApp')
  .controller('LoginCtrl', function ($scope, user, program, validate, showErrorsOrSuccess, $rootScope) {
      $rootScope.page = 'login';
      $scope.pageType = 'login';
      $scope.showLoginError = false;
      $scope.showError = false;
      $scope.showSuccess = false;
      $scope.validate = validate.validate;
      $scope.submitted = false;
      $scope.loginForm = '';
      $scope.forgotForm = '';
      $scope.forgotEmail = '';
      $scope.yes = function(){
          $scope.submitted = true;
          $scope.showError = false;
          $scope.showSuccess = true;
      };
      $scope.no = function(){
          $scope.showSuccess = false;
          $scope.showError = true;
          showErrorsOrSuccess.show($('#login-forgot'), false);
      };
      $scope.noLogin = function(){
          $scope.showLoginError = true;
          showErrorsOrSuccess.show($('#login-form'), false);
      };
      $scope.sendForgot = function(){
        alert('We\'re going to have to communicate with the server to send a message populated with the user\'s email (' + $scope.email + ') to the support email.');
        $scope.yes();
      };
      $scope.checkForgotThenValidate = function(form, email){
          $scope.forgotForm = form;
          $scope.forgotEmail = email;
          if (!$scope.submitted){
              $scope.validate(form, $scope.sendForgot, $scope.no);
          }
      };
      $scope.submitLogin = function(form, yes, no){
          $scope.loginForm = form;
          $scope.validate(form, yes, no);
      };
      $scope.finishLogin = function(){
          $scope.showLoginError = false;
          user.getUser(function(){
            window.location.replace('/#/dash');
          });
      };
    });