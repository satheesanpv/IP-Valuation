'use strict';

/**
 * @ngdoc function
 * @name ipValuationApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ipValuationApp
 */
angular.module('ipValuationApp')
  .controller('LoginCtrl', ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', '$location', function ($scope, $rootScope, AUTH_EVENTS, AuthService, $location) {
  $scope.credentials = {
    username: '',
    password: ''
  };
  
  $scope.login = function () {
    $scope.loginFailed = false;
    AuthService.login($scope.credentials).then(function (user) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $location.path('/home');
      //$scope.setCurrentUser(user);
    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      $scope.loginFailed = true;
    });
  };
}]);