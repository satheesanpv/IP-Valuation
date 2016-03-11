'use strict';

describe('Controller: EditinstitutesCtrl', function () {

  // load the controller's module
  beforeEach(module('ipValuationApp'));

  var EditinstitutesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditinstitutesCtrl = $controller('EditinstitutesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditinstitutesCtrl.awesomeThings.length).toBe(3);
  });
});
