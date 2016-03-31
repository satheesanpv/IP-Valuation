'use strict';

/**
 * @ngdoc function
 * @name ipValuationApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ipValuationApp
 */
angular.module('ipValuationApp')
    .controller('LoginCtrl', ['$scope', '$rootScope', 'AUTH_EVENTS', 'userService', '$location', 'authService', function ($scope, $rootScope, AUTH_EVENTS, userService, $location, authService) {
        $scope.credentials = {
            username: '',
            password: ''
        };

        if (authService.isAuthed()) {
            $location.path('#/home');
        }

        $scope.login = function () {
            $scope.loginFailed = false;
            $scope.showError = false;
            userService.login($scope.credentials).then(function (user) {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                console.log('Login success');
                $location.path('#/home');
                console.log($location.path())
                    //$scope.setCurrentUser(user);
            }, function (response) {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);

                var data = response.data;
                console.log(data);
                if (data.message) {
                    $scope.showError = true;
                    $scope.errMsg = data.message;
                } else {
                    $scope.loginFailed = true;
                }
            });
        };
}]);