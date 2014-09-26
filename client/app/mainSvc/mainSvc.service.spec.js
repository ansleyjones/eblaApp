'use strict';

describe('Service: mainSvc', function () {

  // load the service's module
  beforeEach(module('eblaAppApp'));

  // instantiate service
  var mainSvc;
  beforeEach(inject(function (_mainSvc_) {
    mainSvc = _mainSvc_;
  }));

  it('should do something', function () {
    expect(!!mainSvc).toBe(true);
  });

});
