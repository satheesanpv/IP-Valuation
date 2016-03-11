'use strict';

/**
 * @ngdoc function
 * @name ipValuationApp.controller:ViewCtrl
 * @description
 * # ViewCtrl
 * Controller of the ipValuationApp
 */
angular.module('ipValuationApp')
    .controller('ViewCtrl', ['$routeParams', 'dataService', '$window', '$location', 'configuration', '$filter', 'userService', function ($routeParams, dataService, $window, $location, config, $filter, userService) {

        var self = this;
        var $ = $window.jQuery;
        var user = userService.getUser();

        self.id = $routeParams.id;
        self.inputFields = config.inputFields;

        if (!self.id) {
            self.errMsg = 'No Id found!!';
            self.showError = true;
        }

        self.selectFields = function () {

            if (self.data.valuationMethod.toLocaleLowerCase() === 'all') {
                self.selectedFields = [];
                angular.forEach(self.inputFields, function (o) {
                    self.selectedFields = self.selectedFields.concat(o);
                });
            } else {

                var commonFields = $filter('filter')(self.inputFields.common, {
                    methods: self.data.valuationMethod.toLocaleLowerCase()
                }, true);

                self.selectedFields = angular.copy(commonFields);
                self.selectedFields = self.selectedFields.concat(self.inputFields[self.data.valuationMethod.toLocaleLowerCase()]);

            }
        };


        dataService.getData(self.id).then(function (data) {
            self.data = data;
            console.log(data);
            self.showResult = true;
            self.selectFields();

            console.log(self.data.userId);

            self.showEdit = (self.data.userId === user.iduser);

            if (!self.data) {
                self.errMsg = 'Unable to get Valuation data!!';
                self.showError = true;
            }

        }, function () {
            self.errMsg = 'Unable to get valuation data!!';
            self.showError = true;
        });

        self.editValuation = function () {
            $location.path('/valuation');
        };

        self.downloadPdf = function () {

            var doc = new $window.jsPDF('p', 'pt', 'letter');
            var text = 'Decision Support System for IP Valuation';

            doc.setFontSize(22);
            doc.setTextColor(60, 118, 61);
            doc.setFontType('bold');
            var textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            var textOffset = (doc.internal.pageSize.width - textWidth) / 2;
            doc.text(textOffset, 58, text);
            doc.setTextColor(0);
            // We'll make our own renderer to skip this editor
            var specialElementHandlers = {
                '#editor': function (element, renderer) {
                    return true;
                }
            };

            var source = $('#pdfResult').html();
            var margins = {
                top: 70,
                bottom: 10,
                left: 40,
                width: 522
            };
            // All units are in the set measurement for the document
            // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
            doc.fromHTML(source, margins.left, margins.top, {
                'width': 522,
                'elementHandlers': specialElementHandlers
            }, function (dispose) {
                doc.save('valuation.pdf');
            }, margins);



        };


    }]);