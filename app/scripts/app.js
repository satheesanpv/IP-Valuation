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
    'ngTouch',
    'autocomplete',
    'ngWYSIWYG'
  ])
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })
    .constant('API', 'api')
    .constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        editor: 'editor',
        guest: 'guest'
    })
    .config(function ($routeProvider, USER_ROLES) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .when('/valuation/', {
                templateUrl: 'views/valuation.html',
                controller: 'ValuationCtrl',
                controllerAs: 'ctrl',
                requireLogin: true
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .when('/createUser/', {
                templateUrl: 'views/createuser.html',
                controller: 'CreateuserCtrl',
                controllerAs: 'ctrl',
            })
            .when('/myValuations', {
                templateUrl: 'views/myvaluations.html',
                controller: 'MyvaluationsCtrl',
                requireLogin: true
            })
            .when('/allValuations', {
                templateUrl: 'views/myvaluations.html',
                controller: 'MyvaluationsCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin],
                    type: 'All'
                }
            })
            .when('/view/:id', {
                templateUrl: 'views/view.html',
                controller: 'ViewCtrl',
                requireLogin: true
            })
            .when('/changePassword', {
                templateUrl: 'views/changepassword.html',
                controller: 'ChangepasswordCtrl',
                controllerAs: 'ctrl',
                requireLogin: true
            })
            .when('/editInstitutes', {
                templateUrl: 'views/editinstitutes.html',
                controller: 'EditinstitutesCtrl',
                requireLogin: true,
                controllerAs: 'ctrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin],
                    type: 'All'
                }
            })
            .when('/profile/:id?/:action?', {
                templateUrl: 'views/profile.html',
                controller: 'ProfileCtrl',
                controllerAs: 'ctrl',
                requireLogin: true,
            })
            .when('/userList', {
                templateUrl: 'views/userlist.html',
                controller: 'UserlistCtrl',
                controllerAs: 'ctrl',
                requireLogin: true,
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .when('/faq', {
                templateUrl: 'views/faq.html',
                controller: 'FaqCtrl',
                controllerAs: 'ctrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    })
    .run(['$rootScope', '$location', 'authService', 'userService',
     function ($rootScope, $location, authService, userService) {

            $rootScope.storedRoute = {
                returnToNext: {},
                returnToUrl: ''
            };

            // gets called whenever route changes
            $rootScope.$on('$routeChangeStart', function (event, next, current) {

                // if requires login, remember route and take to login page
                if (next && next.requireLogin && !authService.isAuthed()) {

                    $rootScope.storedRoute.returnToNext = next;
                    $rootScope.storedRoute.returnToUrl = $location.url();
                    //MyPoints promo users shd be sent to signup page instead.
                    $location.path('/login');
                    return;
                }
                // after successful login, if remember route exists, take to remembered route
                else if (current && next &&
                    next.originalPath !== current.originalPath &&
                    authService.isAuthed()) {

                    // if remember route exists
                    if ($rootScope.storedRoute.returnToUrl.length) {
                        var redirectTo = $rootScope.storedRoute.returnToUrl;
                        $rootScope.storedRoute.returnToNext = {};
                        $rootScope.storedRoute.returnToUrl = '';
                        //since we are storing URL, let's restore it back
                        $location.url(redirectTo);
                        return;
                    }
                }

                if (next.data && next.data.authorizedRoles) {
                    var authorizedRoles = next.data.authorizedRoles;
                    if (!userService.isAuthorized(authorizedRoles)) {
                        event.preventDefault();
                        console.log('Not authroised to view this');
                        $location.path('/login');
                    }
                }

            });
    }])
    .filter('percentage', ['$filter', function ($filter) {
        return function (input, decimals) {
            if (input) {
                return $filter('number')(input, decimals) + '%';
            }
        };
}])
    .filter('useFilter', function ($filter) {
        return function () {
            var filterName = [].splice.call(arguments, 1, 1)[0] || 'filter';
            var filter = filterName.split(':');
            if (filterName === 'currency') {
                //console.log('currency');
                [].push.call(arguments, '');
                return $filter(filterName).apply(null, arguments);
            }

            if (filter.length > 1) {
                filterName = filter[0];
                for (var i = 1, k = filter.length; i < k; i++) {
                        [].push.call(arguments, filter[i]);
                }
            }
            try {
                return $filter(filterName).apply(null, arguments);
            } catch (e) {
                console.log(e);
                return $filter('filter').apply(null, arguments);
            }

        };
    });