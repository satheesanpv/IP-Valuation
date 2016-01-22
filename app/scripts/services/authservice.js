'use strict';

/**
 * @ngdoc service
 * @name ipValuationApp.AuthService
 * @description
 * # AuthService
 * Service in the ipValuationApp.
 */
angular.module('ipValuationApp')
  .factory('AuthService', function ($http, Session) {
  var authService = {};
   
  authService.login = function (credentials) {
    return $http
      .post('http://localhost/api/login.php', credentials)
      .then(function (res) {
        Session.create(res.data);
        return res.data.user;
      });
  };
 
  authService.isAuthenticated = function () {
    return !!Session.userId;
  };
 
  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
  };
 
  authService.logout = function() {
    Session.destroy();
  };
  
  return authService;
});