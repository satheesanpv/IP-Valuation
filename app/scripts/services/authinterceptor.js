'use strict';

/**
 * @ngdoc service
 * @name ipValuationApp.authInterceptor
 * @description
 * # authInterceptor
 * Factory in the ipValuationApp.
 */
angular.module('ipValuationApp')
    .factory('authInterceptor', ['authService', 'API', '$location', '$q', '$injector', '$rootScope', function (authService, API, $location, $q, $injector, $rootScope) {
        // Service logic
        // ...



        // Public API here
        return {
            // automatically attach Authorization header
            response: function (res) {
                console.log(res.config.url);
                console.log(API);
                if (res.config.url.indexOf(API) > 0 && res.data.token) {
                    authService.saveToken(res.data.token);
                }
                return res;
            },
            request: function (config) {
                var token = authService.getToken();

                if (config.url.indexOf(API) > 0 && token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                console.log(token);

                return config;
            },
            'responseError': function (response) {
                if (response.status === 401 || response.status === 403) {
                    var $route = $injector.get('$route');

                    if ($location.path() !== '/login') {
                        $rootScope.storedRoute.returnToNext = $route.current;
                        $rootScope.storedRoute.returnToUrl = $location.url();
                    }

                    authService.logout();
                    $location.path('/login');
                }
                return $q.reject(response);
            }

        };

  }]);