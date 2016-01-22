'use strict';

/**
 * @ngdoc function
 * @name ipValuationApp.controller:ValuationCtrl
 * @description
 * # ValuationCtrl
 * Controller of the ipValuationApp
 */
angular.module('ipValuationApp')
  .controller('ValuationCtrl', ['$scope', '$window', function ($scope, $window) {
      
    var self = this;
    $ = $window.jQuery;
   $('input').focus(function () {
      var element = $(this);
      if (element.offset().top - $(window).scrollTop() < 80)
      {
         $('html, body').animate({
            scrollTop: element.offset().top - 80 /* 80 is height of navbar + input label */
        }, 0);
      }
   });
    
    self.techTypes = ['Agriculture/Seed', 'Vetenary', 'Fishery'];
    self.ipCategoryValues = ['Product Patent', 'Process Patent', 'Copyright'];
    self.ipStateValues = ['Patent Granted', 'Patent Filed', 'Discussion Started'];
    self.methodValues = ['All', 'Cost Method', 'Market Method', 'Income Method', 'Profit Split Method', 'Royalty Method', 'None'];
    self.pricingStratagy = [ 'Same as competing product', 'Skimming', 'Penetrating', 'NA'];
    self.expectedGrowth = [ 'Business as Usual', 'Slow pace of technology adoption', 'Upside scenario', 'NA'];

    
    self.data = {};
    
    self.data.techType = self.techTypes[0];
    self.data.similarProduct  = "No";
    self.data.ipCategory = self.ipCategoryValues[0];
    self.data.ipState = self.ipStateValues[0];
    self.data.valuationMethod = self.methodValues[5];
    self.data.expectedGrowth = self.expectedGrowth[0];
    self.data.pricingStratagy = self.pricingStratagy[0];
    
    self.showForm = true;
    self.showResult = false;
    
    console.log(self.type);
    
    self.submitForm = function (isValid) {
      if (isValid) {
        self.showForm = false;
        self.showResult = true;
        self.result = {};
        self.result.valuation = 1000000;  
      } else {
        self.submitted = true;  
      }
      
      self.editValuation = function() {
        self.showForm = true;
        self.showResult = false;
      }
      
    }
  }]);
