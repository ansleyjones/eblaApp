'use strict';

angular.module('eblaAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/match', {
        templateUrl: 'app/match/match.html',
        controller: 'MatchCtrl'
      });
  });
