'use strict';

describe('Directive: customDirective', function () {

  // load the directive's module
  beforeEach(module('ipValuationApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<custom-directive></custom-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the customDirective directive');
  }));
});
