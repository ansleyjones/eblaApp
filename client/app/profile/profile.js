'use strict';

angular.module('eblaAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/profile/:idx', {
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/profileform', {
        templateUrl: 'app/profile/profileForm.html',
        controller: 'ProfileCtrl'
      })
      .when('/profile', {
        templateUrl: 'app/profile/myProfile.html',
        controller: 'ProfileCtrl'
      })
      .when('/edit', {
        templateUrl: 'app/profile/editProfile.html',
        controller: 'ProfileCtrl'
      });

  });
