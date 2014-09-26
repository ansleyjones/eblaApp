'use strict';

describe('Service: profileSvc', function () {

  // load the service's module
  beforeEach(module('eblaAppApp'));

  // instantiate service
  var profileSvc;
  beforeEach(inject(function (_profileSvc_) {
    profileSvc = _profileSvc_;
  }));

  it('should do something', function () {
    expect(!!profileSvc).toBe(true);
  });

});
