'use strict';

/**
 * @ngdoc function
 * @name ipValuationApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the ipValuationApp
 */
angular.module('ipValuationApp')
    .controller('ProfileCtrl', ['userService', '$location', 'dataService', '$timeout', '$window', '$routeParams', function (userService, $location, dataService, $timeout, $window, $routeParams) {

        var self = this;
        var $ = $window.jQuery;

        self.showProfile = true;
        self.showEdit = false;
        self.user = userService.getUser();
        self.isAdmin = self.user.role === 'Admin';
        self.loading = false;

        var id = $routeParams.id || self.user.iduser;
        self.action = $routeParams.action;

        console.log(self.action);

        if (!self.isAdmin && id !== self.user.iduser) {
            self.showProfile = false;
            self.showEdit = false;
            self.showError = true;
            self.errMsg = 'Sorry you do not have permission to edit this user!!!';
            return;
        }

        if (id !== self.user.iduser) {
            self.user = {};
            self.loading = true;
            self.showProfile = false;
            self.showEdit = false;

            userService.fetch(id).then(function (data) {

                self.user = data;

                if (!self.user) {
                    self.showError = true;
                    self.errMsg = 'No user found!!';
                } else {
                    self.showProfile = true;
                    if (self.action === 'edit') {
                        self.edit();
                    }
                }

            }, function () {
                self.showError = true;
                self.errMsg = 'Unable to get user information!!';
            }).finally(function () {
                self.loading = false;
            });
        }



        self.instituteList = [];
        dataService.getConfig('institutes').then(function (data) {
            angular.forEach(data, function (obj) {
                var institute = $.grep([obj.name, obj.location, obj.district, obj.state], Boolean).join(', ');
                //console.log(institute);
                self.instituteList.push(institute);
            });
        });

        self.edit = function () {
            self.showProfile = false;
            self.showEdit = true;
        };


        if (self.action === 'edit') {
            self.edit();
        }

        self.changePassword = function () {
            $location.path('/changePassword');
        };

        self.cancel = function () {
            self.showProfile = true;
            self.showEdit = false;
        };

        self.save = function () {
            userService.updateProfile(self.user).then(function (data) {

                if (data.message === 'SUCCESS') {
                    self.cancel();
                    $timeout(function () {
                        self.showSuccess = false;
                    }, 5000);
                } else {
                    self.showError = true;
                    self.errMsg = 'Update Failed';
                    $timeout(function () {
                        self.showError = false;
                    }, 5000);
                }

            }, function (err) {
                self.showError = true;
                self.errMsg = err;
                $timeout(function () {
                    self.showError = false;
                }, 5000);
            });
        };

            }]);