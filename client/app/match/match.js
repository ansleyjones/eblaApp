'use strict';

angular.module('eblaAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/:idx/match', {
        templateUrl: 'app/match/match.html',
        controller: 'MatchCtrl'
      });
  });
