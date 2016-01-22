'use strict';

/**
 * @ngdoc overview
 * @name ipValuationApp
 * @description
 * # ipValuationApp
 *
 * Main module of the application.
 */
angular
  .module('ipValuationApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/valuation', {
        templateUrl: 'views/valuation.html',
        controller: 'ValuationCtrl',
        requireLogin: false
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  editor: 'editor',
  guest: 'guest'
})
.run(   ['$rootScope', '$location', 'AuthService',
     function($rootScope ,  $location , AuthService/*, prefetchTmpl*/) {

      $rootScope.storedRoute = {returnToNext:{}, returnToUrl:''};

      // gets called whenever route changes
      $rootScope.$on('$routeChangeStart', function(event, next, current) {

       // if requires login, remember route and take to login page
       if (next && next.requireLogin && !AuthService.isAuthenticated() ) {

          $rootScope.storedRoute.returnToNext = next;
          $rootScope.storedRoute.returnToUrl = $location.url();
          //MyPoints promo users shd be sent to signup page instead.
          $location.path('/login');
          return;
        }
        // after successful login, if remember route exists, take to remembered route
        else if (current && next &&
                 next.originalPath !== current.originalPath &&
                 AuthService.isAuthenticated() ) {

          // if remember route exists
          if ( $rootScope.storedRoute.returnToUrl.length ) {
            var redirectTo = $rootScope.storedRoute.returnToUrl;
            $rootScope.storedRoute.returnToNext = {};
            $rootScope.storedRoute.returnToUrl = '';
            //since we are storing URL, let's restore it back
            $location.url(redirectTo);
            return;
          }
        }

      });
    }
  ])
.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    if (input) {
      return $filter('number')(input, decimals) + '%';
    }
  };
}]);
;
