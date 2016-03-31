'use strict';

/**
 * @ngdoc service
 * @name ipValuationApp.userService
 * @description
 * # userService
 * Service in the ipValuationApp.
 */
angular.module('ipValuationApp')
    .service('userService', ['$http', 'authService', '$window', '$rootScope', 'AUTH_EVENTS', '$timeout', 'configuration', function ($http, authService, $window, $rootScope, AUTH_EVENTS, $timeout, config) {

        var _user = {};
        var self = this;
        var baseURL = config.apiBase;

        function autoLogin() {
            console.log('Auto login');
            if (authService.isAuthed()) {
                _user = authService.getSavedUser();
                $timeout(function () {
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                }, 0);
            }
        }

        autoLogin();

        // AngularJS will instantiate a singleton by calling "new" on this function
        self.login = function (credentials) {
            return $http
                .post(baseURL + '/login.php', credentials)
                .then(function (res) {
                    _user = res.data.user;
                    //$window.sessionStorage.userInfo = JSON.stringify(user);
                    return res.data.user;
                });
        };

        self.createUser = function (user) {
            return $http
                .post(baseURL + '/create_user.php', user)
                .then(function (res) {
                    //$window.sessionStorage.userInfo = JSON.stringify(user);
                    return res.data;
                });
        };

        self.fetch = function (id) {
            var url = baseURL + '/get_user.php';
            if (id) {
                url += '?id=' + id;
            }
            return $http
                .get(url)
                .then(function (res) {
                    //$window.sessionStorage.userInfo = JSON.stringify(user);
                    return res.data;
                });
        };

        self.changePassword = function (user) {
            return $http
                .post(baseURL + '/change_password.php', user)
                .then(function (res) {
                    //$window.sessionStorage.userInfo = JSON.stringify(user);
                    return res.data;
                });
        };

        self.approveUser = function (userId) {
            var user = {}
            user.userId = userId;
            return $http
                .post(baseURL + '/approve_user.php', user)
                .then(function (res) {
                    //$window.sessionStorage.userInfo = JSON.stringify(user);
                    return res.data;
                });
        };

        self.deleteUser = function (userId) {
            var user = {}
            user.userId = userId;
            return $http
                .post(baseURL + '/delete_user.php', user)
                .then(function (res) {
                    //$window.sessionStorage.userInfo = JSON.stringify(user);
                    return res.data;
                });
        };

        self.updateProfile = function (user) {
            return $http
                .post(baseURL + '/update_profile.php', user)
                .then(function (res) {
                    //$window.sessionStorage.userInfo = JSON.stringify(user);
                    if (user.iduser === _user.iduser) {
                        _user = user;
                    }
                    return res.data;
                });
        };

        self.getUser = function () {
            return _user;
        };

        self.getRole = function () {
            return _user.role;
        };

        self.getId = function () {
            return _user.iduser;
        };

        self.getName = function () {
            return _user.name;
        };

        self.logout = function () {

        };

        self.isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }

            return (authService.isAuthed() &&
                authorizedRoles.indexOf(self.getRole().toLowerCase()) !== -1);
        };
}]);