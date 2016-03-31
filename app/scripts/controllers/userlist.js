'use strict';

/**
 * @ngdoc function
 * @name ipValuationApp.controller:UserlistCtrl
 * @description
 * # UserlistCtrl
 * Controller of the ipValuationApp
 */
angular.module('ipValuationApp')
    .controller('UserlistCtrl', ['userService', '$filter', '$window', function (userService, $filter, $window) {

        var self = this;
        var $ = $window.jQuery;

        self.userList = [];

        self.loading = true;
        self.showList = false;
        self.pendingCount = 0;

        userService.fetch().then(function (data) {

            self.userList = data;

            if (!self.userList) {
                self.showError = true;
                self.errMsg = 'No user found!!';

            } else {
                self.showList = true;
                self.updatePendingCount();
            }

        }, function () {
            self.showError = true;
            self.errMsg = 'Unable to get user information!!';
        }).finally(function () {
            self.loading = false;
        });

        self.approve = function (userId) {
            var selectedUser = $filter('filter')(self.userList, {
                iduser: userId
            })[0];
            selectedUser.loading = 'true';
            userService.approveUser(userId).then(function (result) {
                console.log(result);
                if (result === 'SUCCESS') {
                    selectedUser.status = 'Approved';
                    self.updatePendingCount();
                }
            }).finally(function () {
                selectedUser.loading = 'false';
            });

        };

        self.updatePendingCount = function () {
            self.pendingCount = $filter('filter')(self.userList, {
                status: 'Pending'
            }).length;
        };

        self.showDelete = function (userId) {
            var selectedUser = $filter('filter')(self.userList, {
                iduser: userId
            })[0];

            self.deleteUsername = selectedUser.username;
            self.deleteUserId = userId;
            self.deleteMsg = 'Do you want to delete this user?';
            $('#myModal').modal('show');
        };

        self.deleteUser = function () {
            var userId = self.deleteUserId;
            if (!userId) {
                return;
            }

            userService.deleteUser(userId).then(function (result) {
                console.log(result);
                if (result === 'SUCCESS') {
                    self.userList = $filter('filter')(self.userList, {
                        iduser: '!' + userId
                    });
                    $('#myModal').modal('hide');
                    self.updatePendingCount();
                } else {
                    self.deleteMsg = 'Error: Delete failed!! ';
                }
            }, function (err) {
                self.deleteMsg = 'Error: Delete failed!! ' + err;
            });


        };

    }]);