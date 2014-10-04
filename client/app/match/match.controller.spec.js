'use strict';

describe('Controller: MatchCtrl', function () {

  // load the controller's module
  beforeEach(module('eblaAppApp'));

  var MatchCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MatchCtrl = $controller('MatchCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
