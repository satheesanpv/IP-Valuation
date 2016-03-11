'use strict';

/**
 * @ngdoc function
 * @name ipValuationApp.controller:ValuationCtrl
 * @description
 * # ValuationCtrl
 * Controller of the ipValuationApp
 */
angular.module('ipValuationApp')
    .controller('ValuationCtrl', ['$scope', '$window', 'dataService', '$filter', '$route', '$timeout', 'userService', 'configuration', '$location', function ($scope, $window, dataService, $filter, $route, $timeout, userService, config, $location) {

        var self = this;
        var $ = $window.jQuery;
        var user = userService.getUser();
        $('input').focus(function () {
            var element = $(this);
            self.scrollTo(element);
        });

        if (self.showResult) {
            self.showResult = false;
            $route.reload();
            return;
        }

        self.instituteList = [];

        self.technologies = config.technologies;
        self.growthRate = config.growthRate;
        self.priceRate = config.priceRate;
        self.inputFields = config.inputFields;

        self.scrollTo = function (element) {
            if (element.offset().top - $(window).scrollTop() < 80) {
                $('html, body').animate({
                    scrollTop: element.offset().top - 80 /* 80 is height of navbar + input label */
                }, 0);
            }
        };

        self.showError = false;
        self.techTypes = self.technologies[0].types;
        self.ipCategoryValues = ['Product Patent', 'Process Patent', 'Copyright'];
        self.ipStateValues = ['Patent Granted', 'Patent Filed', 'Discussion Started'];
        self.methodValues = ['All', 'Cost Method', 'Market Method', 'Profit Split Method', 'Royalty Method'];
        self.pricingStratagy = ['Same as competing product', 'Skimming', 'Penetrating', 'NA'];
        self.expectedGrowth = ['Business as Usual', 'Slow pace of technology adoption', 'Upside scenario', 'NA'];

        self.changeRate = function (field) {

            var elem;
            var value;
            if (field === 'pricingStratagy') {
                self.data.pr = self.priceRate[self.data.pricingStratagy];
                elem = $('#pr');
                value = self.data.pricingStratagy;
            }

            if (field === 'expectedGrowth') {
                self.data.g = self.growthRate[self.data.expectedGrowth];
                elem = $('#g');
                value = self.data.expectedGrowth;
            }


            if (value !== 'Manual') {
                elem.prop('disabled', true);
            } else {
                elem.prop('disabled', false);
                elem.focus();
            }
        };

        self.changeFields = function () {

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
                //angular.extend(self.selectedFields, self.inputFields.common);
                //console.log(self.inputFields.common);
                //console.log(self.data.valuationMethod);
                self.selectedFields = self.selectedFields.concat(self.inputFields[self.data.valuationMethod.toLocaleLowerCase()]);
                //console.log(self.selectedFields);
            }

            self.data.pricingStratagy = self.pricingStratagy[0];
            self.data.expectedGrowth = self.expectedGrowth[0];
            $timeout(function () {
                self.changeRate('pricingStratagy');
                self.changeRate('expectedGrowth');
            }, 0);
        };

        dataService.getData().then(function (data) {
            self.data = data;

            console.log(data);

            if (!self.data) {
                self.data = {};
                self.data.technology = self.technologies[0].name;
                self.data.techType = self.techTypes[0];
                self.data.ipCategory = self.ipCategoryValues[0];
                self.data.ipState = self.ipStateValues[0];
                self.data.valuationMethod = 'Royalty Method';
                self.selectedFields = self.inputFields.common;
                self.data.pricingStratagy = self.pricingStratagy[0];
                self.data.expectedGrowth = self.expectedGrowth[0];
                self.data.ry = 10;
                self.data.userId = userService.getId();
                self.data.idvaluation = null;
                self.data.developedBy = user.name;
                self.data.contactEmail = user.email;
                self.data.contactMobile = user.mobile;


                //self.changeRate('pricingStratagy');
            }
            self.changeFields();
        });

        dataService.getConfig('institutes').then(function (data) {
            angular.forEach(data, function (obj) {
                var institute = $.grep([obj.name, obj.location, obj.district, obj.state], Boolean).join(', ');
                //console.log(institute);
                self.instituteList.push(institute);
            });
        });

        //$('.typeahead').typeahead();

        self.showForm = true;
        self.showResult = false;

        self.changeTechTypes = function () {

            self.techTypes = $filter('filter')(self.technologies, {
                name: self.data.technology
            }, true)[0].types;

            self.techTypes.push('Other');

            self.data.techType = self.techTypes[0];
        };



        //self.changeFields();

        self.submitForm = function (isValid) {
            self.showError = false;
            if (isValid) {

                dataService.valuate(self.data).then(function (data) {
                    $location.path('/view/' + data.idvaluation);
                }, function () {
                    self.errMsg = 'Unable to process the request now. Please try again later';
                    self.showError = true;
                    self.scrollTo($('body'));
                });

            } else {
                self.submitted = true;
            }
        };

}]);