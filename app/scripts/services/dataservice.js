'use strict';

/**
 * @ngdoc service
 * @name ipValuationApp.dataService
 * @description
 * # dataService
 * Service in the ipValuationApp.
 */
angular.module('ipValuationApp')
    .service('dataService', ['$http', '$q', 'configuration', function ($http, $q, config) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var _valuationData = null;

        var self = this;
        var baseURL = config.apiBase;

        self.getData = function (id) {
            var deferred = $q.defer();

            if (!id) {
                deferred.resolve(_valuationData);
            } else if (_valuationData && id === _valuationData.idvaluation) {
                deferred.resolve(_valuationData);
                return deferred.promise;
            } else {

                self.fetchValuation(id).then(function (data) {
                    _valuationData = data[0];
                    //_valuationData.idvaluation = data[0].idvaluation;
                    //_valuationData.userName = data[0].userName;
                    //_valuationData.createdDate = data[0].createdDate;
                    deferred.resolve(_valuationData);
                }, function (e) {
                    deferred.reject(e);
                });
            }

            return deferred.promise;
        };

        self.fetch = function (input) {

            return $http
                .post(baseURL + '/get_valuation.php', input)
                .then(function (res) {
                    //valuationData = res.data;
                    //$window.sessionStorage.userInfo = JSON.stringify(user);
                    return res.data;
                });
        };

        self.fetchValuations = function (type, userId) {
            if (type === 'All') {
                return self.fetchAllValuations();
            } else {
                return self.fetchMyValuations(userId);
            }
        };

        self.fetchMyValuations = function (userId) {
            var input = {
                userId: userId
            };

            return self.fetch(input);

        };

        self.fetchValuation = function (id) {
            var input = {
                id: id
            };

            return self.fetch(input);
        };

        self.fetchAllValuations = function () {
            var input = {};
            return self.fetch(input);
        };

        self.save = function (data) {

            data.action = 'SAVE';

            return $http
                .post(baseURL + '/valuation.php', data)
                .then(function (res) {
                    _valuationData = res.data;
                    //$window.sessionStorage.userInfo = JSON.stringify(user);
                    return res.data;
                });
        };

        self.valuate = function (data) {

            //data.action = 'VALUATION';
            _valuationData = data;

            return $http
                .post(baseURL + '/valuation.php', data)
                .then(function (res) {
                    _valuationData = res.data;
                    //$window.sessionStorage.userInfo = JSON.stringify(user);
                    return res.data;
                });
        };

        self.getConfig = function (name) {
            var deferred = $q.defer();
            $http.post(baseURL + '/get_config.php?name=' + name)
                .then(function (res) {
                    var data;
                    if (name) {
                        data = res.data[0].data;
                    } else {
                        data = res.data;
                    }
                    //valuationData = res.data;
                    //$window.sessionStorage.userInfo = JSON.stringify(user);
                    deferred.resolve(data);
                }, function (err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        self.updateConfig = function (name, value) {
            var deferred = $q.defer();
            var data = {};
            data.key = name;
            data.value = value;

            $http.post(baseURL + '/update_config.php', data)
                .then(function () {
                    deferred.resolve('SUCCESS');
                }, function (err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

            }]);