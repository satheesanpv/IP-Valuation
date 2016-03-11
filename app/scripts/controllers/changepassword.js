'use strict';

/**
 * @ngdoc function
 * @name ipValuationApp.controller:ChangepasswordCtrl
 * @description
 * # ChangepasswordCtrl
 * Controller of the ipValuationApp
 */
angular.module('ipValuationApp')
    .controller('ChangepasswordCtrl', ['$window', 'userService', function ($window, userService) {

        var self = this;
        var $ = $window.jQuery;

        self.user = userService.getUser();
        self.showForm = true;
        self.showError = false;
        self.showSuccess = false;



        self.scrollTo = function (element) {
            if (element.offset().top - $(window).scrollTop() < 80) {
                $('html, body').animate({
                    scrollTop: element.offset().top - 80 /* 80 is height of navbar + input label */
                }, 0);
            }
        };

        self.updatePassword = function () {
            userService.changePassword(self.user).then(function (data) {
                if (data.message === 'SUCCESS') {
                    self.showSuccess = true;
                    self.showError = false;
                } else {
                    self.errMsg = data.message;
                    self.showError = true;
                    self.showSuccess = false;
                    self.scrollTo($('body'));
                }

            }, function () {
                self.errMsg = 'Unable to process the request now. Please try again later';
                self.showError = true;
                self.scrollTo($('body'));
            });
        };
    }]);