'use strict';

angular.module('eblaAppApp')
  .controller('MainCtrl', function ($scope, $http, $routeParams, socket, Auth, mainSvc) {
    $scope.awesomeThings = [];
    $scope.currentUser = Auth.getCurrentUser();

    mainSvc.getProfiles().success(function(profiles){
      $scope.profiles = profiles;
    });

    mainSvc.getSingleProfile($routeParams.idx).success(function(profile){
      console.log(profile);
      $scope.singleProfile = profile;
    });

    mainSvc.getItems().success(function(items){
      $scope.items = items;
    });

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', {
        user: $scope.currentUser._id,
        info: $scope.newThing,
        active: true
        });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

  });
