'use strict';

describe('Service: matchSvc', function () {

  // load the service's module
  beforeEach(module('eblaAppApp'));

  // instantiate service
  var matchSvc;
  beforeEach(inject(function (_matchSvc_) {
    matchSvc = _matchSvc_;
  }));

  it('should do something', function () {
    expect(!!matchSvc).toBe(true);
  });

});
