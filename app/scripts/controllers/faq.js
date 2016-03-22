'use strict';

/**
 * @ngdoc function
 * @name ipValuationApp.controller:FaqCtrl
 * @description
 * # FaqCtrl
 * Controller of the ipValuationApp
 */
angular.module('ipValuationApp')
    .controller('FaqCtrl', ['dataService', 'userService', '$timeout', function (dataService, userService, $timeout) {

        var self = this;
        self.showEdit = false;
        self.loading = true;
        self.showError = false;
        self.showSuccess = false;

        self.user = userService.getUser();
        self.isAdmin = self.user.role === 'Admin';


        dataService.getConfig('faq').then(function (data) {
            self.faq = data;
            console.log(data);
        }).finally(function () {
            self.loading = false;
        });

        self.editFAQ = function () {
            self.showEdit = true;
        };

        self.cancel = function () {
            self.showEdit = false;
        };

        self.save = function () {
            self.showEdit = false;
            self.loading = true;
            dataService.updateConfig('faq', self.faq).then(function (data) {
                console.log(data);
                self.showSuccess = true;
                if (data === 'SUCCESS') {
                    $timeout(function () {
                        self.showSuccess = false;
                    }, 5000);
                } else {
                    self.showError = true;
                    self.errMsg = 'Update Failed: ' + data;
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
            }).finally(function () {
                self.loading = false;
            });
        };
    }]);