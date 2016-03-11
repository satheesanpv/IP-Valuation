'use strict';

/**
 * @ngdoc function
 * @name ipValuationApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the ipValuationApp
 */
angular.module('ipValuationApp')
    .controller('HeaderCtrl', ['$scope', 'userService', 'authService', '$location', 'AUTH_EVENTS', function ($scope, userService, authService, $location, AUTH_EVENTS) {

        $scope.isLoggedIn = false;

        //console.log('Header init');

        //Watch for event about user login
        $scope.$on(AUTH_EVENTS.loginSuccess, function () {
            console.log('User logged in ');
            $scope.user = userService.getUser();
            //console.log($scope.user);
            $scope.isLoggedIn = true;
        });

        //Watch for event about user logout
        $scope.$on(AUTH_EVENTS.logoutSuccess, function () {
            console.log('User logged out');
            $scope.isLoggedIn = false;
        });


        $scope.logout = function () {
            //signout the user
            authService.logout();
            //we don't need to worry whether it's success or failure
            //$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
            $scope.isLoggedIn = false;
            $location.path('/home');
        };

        $scope.isAdmin = function () {
            return $scope.user.role.toLowerCase() === 'admin' ? true : false;
        };

  }]);