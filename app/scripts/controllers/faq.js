'use strict';

/**
 * @ngdoc function
 * @name ipValuationApp.controller:FaqCtrl
 * @description
 * # FaqCtrl
 * Controller of the ipValuationApp
 */
angular.module('ipValuationApp')
    .controller('FaqCtrl', ['dataService', 'userService', '$timeout', '$scope', '$q', '$window', function (dataService, userService, $timeout, $scope, $q, $window) {

        var self = this;
        var $ = $window.jQuery;

        self.showEdit = false;
        self.loading = true;
        self.showError = false;
        self.showSuccess = false;

        self.user = userService.getUser();
        self.isAdmin = self.user.role === 'Admin';

        self.editorConfig = {
            sanitize: false,
            toolbar: [
                {
                    name: 'basicStyling',
                    items: ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', '-', 'leftAlign', 'centerAlign', 'rightAlign', 'blockJustify', '-']
                },
                {
                    name: 'paragraph',
                    items: ['orderedList', 'unorderedList', 'outdent', 'indent', '-']
                },
                {
                    name: 'doers',
                    items: ['removeFormatting', 'undo', 'redo', '-']
                },
                {
                    name: 'colors',
                    items: ['fontColor', 'backgroundColor', '-']
                },
                {
                    name: 'links',
                    items: ['image', 'hr', 'symbols', 'link', 'unlink', '-']
                },
                {
                    name: 'tools',
                    items: ['print', '-']
                },
                {
                    name: 'styling',
                    items: ['font', 'size', 'format']
                },
		]
        };

        $timeout(function () {
            $('[ng-model="font"] option[value="?"]').text('Font');
            $('[ng-model="fontsize"] option[value="?"]').text('Size');
            $('[ng-model="textstyle"] option[value="?"]').text('Style');
        }, 5);


        dataService.getConfig('faq').then(function (data) {
            self.faq = data;
            console.log(data);
            //$('[ng-model="font"] option[value="?"]').prepend('<option value="" selected >Font</option>');

            console.log($('[ng-model="font"]'));
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