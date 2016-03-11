'use strict';

/**
 * @ngdoc service
 * @name ipValuationApp.Session
 * @description
 * # Session
 * Service in the ipValuationApp.
 */
angular.module('ipValuationApp')
    .service('authService', ['$window', '$timeout', 'AUTH_EVENTS', '$rootScope', function ($window, $timeout, AUTH_EVENTS, $rootScope) {

        var self = this;

        self.parseJwt = function (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        };

        self.saveToken = function (token) {
            console.log('save token: ' + token)
            $window.sessionStorage.jwtToken = token;
        };

        self.getToken = function () {
            return $window.sessionStorage.jwtToken;
        };

        self.isAuthed = function () {
            var token = self.getToken();
            if (token) {
                var params = self.parseJwt(token);
                return Math.round(new Date().getTime() / 1000) <= params.exp;
            } else {
                return false;
            }
        };

        self.logout = function () {
            $window.sessionStorage.removeItem('jwtToken');
            //$window.sessionStorage.removeItem('userInfo');
            $timeout(function () {
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
            }, 0);
        };

        self.getSavedUser = function () {
            if (self.isAuthed()) {
                var user = {};
                var token = self.getToken();
                if (token) {
                    var params = self.parseJwt(token);
                    console.log(params);
                    user = params.data;
                }

                return user;
            }
        };


}]);