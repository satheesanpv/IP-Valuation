'use strict';

/**
 * @ngdoc function
 * @name ipValuationApp.controller:CreateuserCtrl
 * @description
 * # CreateuserCtrl
 * Controller of the ipValuationApp
 */
angular.module('ipValuationApp')
    .controller('CreateuserCtrl', ['userService', '$window', '$route', 'dataService', function (userService, $window, $route, dataService) {
        var self = this;
        var $ = $window.jQuery;
        var loggedUser = userService.getUser();


        if (self.showResult) {
            self.showResult = false;
            $route.reload();
            return;
        }

        self.user = {};
        self.showForm = true;
        self.showError = false;
        self.showResult = false;
        self.user.role = 'User';
        self.instituteList = [];

        if (loggedUser.role === 'Admin') {
            self.isAdmin = true;
        }

        dataService.getConfig('institutes').then(function (data) {
            angular.forEach(data, function (obj) {
                var institute = $.grep([obj.name, obj.location, obj.district, obj.state], Boolean).join(', ');
                //console.log(institute);
                self.instituteList.push(institute);
            });
        });

        self.scrollTo = function (element) {
            if (element.offset().top - $(window).scrollTop() < 80) {
                $('html, body').animate({
                    scrollTop: element.offset().top - 80 /* 80 is height of navbar + input label */
                }, 0);
            }
        };

        self.createUser = function () {
            self.showError = false;
            self.loading = true;

            userService.createUser(self.user).then(function (data) {
                if (data.message === 'SUCCESS') {
                    self.showForm = false;
                    self.showResult = true;
                    self.user = data.user;
                } else {
                    self.errMsg = data.message;
                    self.showError = true;
                    self.scrollTo($('body'));
                }

            }, function () {
                self.errMsg = 'Unable to process the request now. Please try again later';
                self.showError = true;
                self.scrollTo($('body'));
            }).finally(function () {
                self.loading = false;
            });
        };

}]);