'use strict';

/**
 * @ngdoc function
 * @name ipValuationApp.controller:EditinstitutesCtrl
 * @description
 * # EditinstitutesCtrl
 * Controller of the ipValuationApp
 */
angular.module('ipValuationApp')
    .controller('EditinstitutesCtrl', ['dataService', '$filter', '$scope', function (dataService, $filter, $scope) {

        var self = this;
        self.isAdd = false;

        self.institutes = [];
        self.selected = {};
        self.showError = false;
        self.showSuccess = false;

        dataService.getConfig('institutes').then(function (data) {
            self.institutes = data;
        });

        // gets the template to ng-include for a table row / item
        self.getTemplate = function (institute) {
            if (!institute) {
                return 'add';
            }
            if (institute.action === 'edit') {
                return 'edit';
            }

            if (institute.action === 'remove') {
                return 'remove';
            }

            return 'display';
        };

        self.edit = function (idx) {
            self.showError = false;
            self.showSuccess = false;

            self.selected = angular.copy(self.institutes[idx]);
            self.institutes[idx].action = 'edit';
        };

        self.save = function (idx) {
            //console.log("Saving contact");
            self.enableSave = true;
            self.institutes[idx] = angular.copy(self.selected);
            self.reset(idx);
        };

        self.reset = function (idx) {
            self.isAdd = false;
            console.log(idx);
            if (idx + 1) {
                delete self.institutes[idx].action;
            }

            self.selected = {};
        };

        self.showAdd = function () {
            self.isAdd = true;
        };

        self.add = function () {
            self.showError = false;
            self.showSuccess = false;
            self.enableSave = true;
            self.institutes.unshift(angular.copy(self.selected));
            self.reset();
        };

        self.remove = function (idx) {
            self.enableSave = true;
            self.institutes[idx].action = 'remove';
        };

        self.undoRemove = function (idx) {
            console.log(idx);
            delete self.institutes[idx].action;
        };

        self.saveChanges = function () {
            self.updateList = $filter('filter')(self.institutes, {
                action: '!remove'
            });

            self.updateList = $filter('orderBy')(self.updateList, '+name');

            dataService.updateConfig('institutes', self.updateList).then(function () {
                self.institutes = self.updateList;
                self.showSuccess = true;
                self.showError = false;
                self.enableSave = false;

            }, function () {
                self.errMsg = 'Unable to update institute list';
                self.showError = true;
                self.showSuccess = false;
            });
        };

        $scope.$on('$locationChangeStart', function (event) {
            if (self.enableSave) {
                var answer = window.confirm('Do you want to save your changes before leave this page?');
                if (!answer) {
                    event.preventDefault();
                    self.saveChanges();
                }
            }

        });
    }]);