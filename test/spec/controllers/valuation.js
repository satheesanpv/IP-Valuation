'use strict';

describe('Controller: ValuationCtrl', function () {

  // load the controller's module
  beforeEach(module('ipValuationApp'));

  var ValuationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ValuationCtrl = $controller('ValuationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
