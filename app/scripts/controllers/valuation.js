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
        self.data = {};
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

        self.technologyValues = {
            'Agriculture Engineering & ICT': {
                'Irrigation and Water Management Equipments': {
                    'd': 10,
                    'it': 30,
                    'ry': 5,
                    'g': 18,
                    'adc': 10,
                    'psh': 25,
                    'dr': 12
                },
                'Machinery and Farm Equipments': {
                    'd': 10,
                    'it': 30,
                    'ry': 2.5,
                    'g': 11,
                    'adc': 10,
                    'psh': 20,
                    'dr': 12
                },
                'Post Harvest processes and Products': {
                    'd': 10,
                    'it': 30,
                    'ry': 3,
                    'g': 7,
                    'adc': 10,
                    'psh': 15,
                    'dr': 12
                },
                'Renewable Energy Gadgets': {
                    'd': 10,
                    'it': 30,
                    'ry': 2.67,
                    'g': 15,
                    'adc': 10,
                    'psh': 25,
                    'dr': 12
                },
                'Electronics*': {
                    'd': 10,
                    'it': 30,
                    'ry': 2,
                    'g': 6.8,
                    'adc': 10,
                    'psh': 25,
                    'dr': 12
                },
                'Softwares and DSS*': {
                    'd': 10,
                    'it': 30,
                    'ry': 2,
                    'g': 5,
                    'adc': 10,
                    'psh': 25,
                    'dr': 12
                }
            },
            'Animal Science': {
                'Animal Genetic Resources': {
                    'd': 10,
                    'it': 30,
                    'ry': 5,
                    'g': 8,
                    'adc': 10,
                    'psh': 25,
                    'dr': 12
                },
                'Animal Production and Health': {
                    'd': 10,
                    'it': 30,
                    'ry': 20,
                    'g': 6.1,
                    'adc': 10,
                    'psh': 25,
                    'dr': 12
                },
                'Diagnostics and Vaccines': {
                    'd': 10,
                    'it': 30,
                    'ry': 12.5,
                    'g': 7.5,
                    'adc': 10,
                    'psh': 10,
                    'dr': 12
                },
                'Animal Products Technology': {
                    'd': 10,
                    'it': 30,
                    'ry': 5,
                    'g': 15,
                    'adc': 10,
                    'psh': 25,
                    'dr': 12
                }
            },
            'Crop Science': {
                'Crop Production and Propagation Technologies': {
                    'd': 10,
                    'it': 30,
                    'ry': 2.5,
                    'g': 8,
                    'adc': 10,
                    'psh': 25,
                    'dr': 12
                },
                'Crop Protection technologies': {
                    'd': 10,
                    'it': 30,
                    'ry': 2,
                    'g': 5.4,
                    'adc': 10,
                    'psh': 25,
                    'dr': 12
                },
                'Plant varieties': {
                    'd': 10,
                    'it': 30,
                    'ry': 13,
                    'g': 8,
                    'adc': 10,
                    'psh': 15,
                    'dr': 12
                },
                'Post Harvest and processing Technology': {
                    'd': 10,
                    'it': 30,
                    'ry': 3,
                    'g': 8,
                    'adc': 10,
                    'psh': 25,
                    'dr': 12
                }
            },
            'Fisheries': {
                'Fish based Biochemistry technologies': {
                    'd': 10,
                    'it': 30,
                    'ry': 2.5,
                    'g': 8,
                    'adc': 10,
                    'psh': 25,
                    'dr': 12
                },
                'Fish based food products': {
                    'd': 10,
                    'it': 30,
                    'ry': 2.5,
                    'g': 6,
                    'adc': 10,
                    'p': 25,
                    'dr': 12
                },
                'Fish seed Production': {
                    'd': 10,
                    'it': 30,
                    'ry': 2.5,
                    'g': 5.72,
                    'adc': 10,
                    'psh': 25,
                    'dr': 12
                },
                'Fish Nutrition': {
                    'd': 10,
                    'it': 30,
                    'ry': 2.5,
                    'g': 6,
                    'adc': 10,
                    'psh': 25,
                    'dr': 12
                }
            },
            'Horticulture': {
                'Plant varieties': {
                    'd': 10,
                    'it': 30,
                    'ry': 2.5,
                    'g': 8,
                    'adc': 10,
                    'psh': 25,
                    'dr': 12
                },
                'Crop Production and Propagation Technologies': {
                    'd': 10,
                    'it': 30,
                    'ry': 3,
                    'g': 12.5,
                    'adc': 10,
                    'psh': 25,
                    'dr': 12
                },
                'Crop Protection technologies': {
                    'd': 10,
                    'it': 30,
                    'ry': 3,
                    'g': 5.4,
                    'adc': 10,
                    'psh': 25,
                    'dr': 12
                },
                'Post Harvest and processing Technology': {
                    'd': 10,
                    'it': 30,
                    'ry': 5,
                    'g': 7.5,
                    'adc': 10,
                    'psh': 25,
                    'dr': 12
                }
            },
            'Other': {
                'Other': {
                    'd': 10,
                    'it': 30,
                    'ry': 5,
                    'g': 1,
                    'adc': 10,
                    'psh': 25,
                    'dr': 12
                }
            }
        };

        self.techNames = Object.keys(self.technologyValues);
        self.techTypes = Object.keys(self.technologyValues[self.techNames[0]]);
        self.techTypes.push('Other');


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
                self.data.g = 100 + self.defaultValues.g;
                elem.focus();
            }
        };

        self.updateRevenue = function () {

            self.data.r = self.data.pp * self.data.sv;
            self.data.rm = self.data.ppm * self.data.svm;

            if (self.data.r > 0) {
                $('#r').prop('disabled', true);
            } else {
                $('#r').prop('disabled', false);
            }

            if (self.data.rm > 0) {
                $('#rm').prop('disabled', true);
            } else {
                $('#rm').prop('disabled', false);
            }
        };

        $scope.$watch(function () {
            return self.data.ppm;
        }, self.updateRevenue);

        $scope.$watch(function () {
            return self.data.sv;
        }, self.updateRevenue);


        $scope.$watch(function () {
            return self.data.svm;
        }, self.updateRevenue);

        $scope.$watch(function () {
            return self.data.pp;
        }, self.updateRevenue);


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
                self.setDefaultValues();


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

            self.techTypes = Object.keys(self.technologyValues[self.data.technology]);

            if (self.data.technology !== 'Other') {
                self.techTypes.push('Other');
            }
            self.data.techType = self.techTypes[0];
        };

        self.setDefaultValues = function () {

            if (self.data.techType === 'Other') {
                self.defaultValues = self.technologyValues.Other[self.data.techType];
            } else {
                self.defaultValues = self.technologyValues[self.data.technology][self.data.techType];
            }

            angular.forEach(self.defaultValues, function (value, key) {

                if (key !== 'g') {
                    self.data[key] = value;
                }
            });

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