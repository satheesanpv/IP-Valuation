'use strict';

/**
 * @ngdoc function
 * @name ipValuationApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the ipValuationApp
 */
angular.module('ipValuationApp')
  .controller('HeaderCtrl', ['$scope', 'Session', 'AuthService', '$location', function ($scope, Session, AuthService, $location) {
    
    $scope.isLoggedIn = false;
    
    //Watch for event about cart & user info updated and update the above variables.
    $scope.$on('auth-login-success', function() {
      $scope.user = Session.getUser();
      $scope.isLoggedIn = true;
    });
    
    $scope.logout = function(){
      //signout the user
       AuthService.logout();
        //we don't need to worry whether it's success or failure
         //$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
         $scope.isLoggedIn = false;
        $location.path('/home');
    };

    
  }]);
