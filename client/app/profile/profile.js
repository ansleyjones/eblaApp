'use strict';

angular.module('eblaAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/profile', {
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/profileform', {
        templateUrl: 'app/profile/profileForm.html',
        controller: 'ProfileCtrl'
      });
  });
