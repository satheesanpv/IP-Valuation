'use strict';

/**
 * @ngdoc function
 * @name ipValuationApp.controller:UserlistCtrl
 * @description
 * # UserlistCtrl
 * Controller of the ipValuationApp
 */
angular.module('ipValuationApp')
    .controller('UserlistCtrl', ['userService', function (userService) {

        var self = this;

        self.userList = [];

        self.loading = true;
        self.showList = false;

        userService.fetch().then(function (data) {

            self.userList = data;
            console.log(data);

            if (!self.userList) {
                self.showError = true;
                self.errMsg = 'No user found!!';
            } else {
                self.showList = true;
            }

        }, function () {
            self.showError = true;
            self.errMsg = 'Unable to get user information!!';
        }).finally(function () {
            self.loading = false;
        });



    }]);