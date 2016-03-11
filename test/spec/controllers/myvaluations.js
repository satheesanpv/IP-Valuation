'use strict';

describe('Controller: MyvaluationsCtrl', function () {

  // load the controller's module
  beforeEach(module('ipValuationApp'));

  var MyvaluationsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyvaluationsCtrl = $controller('MyvaluationsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MyvaluationsCtrl.awesomeThings.length).toBe(3);
  });
});
