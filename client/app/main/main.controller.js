'use strict';

angular.module('eblaAppApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth) {
    $scope.awesomeThings = [];
    $scope.currentUser = Auth.getCurrentUser();

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      // socket.syncUpdates('thing', $scope.awesomeThings);
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

    // $scope.$on('$destroy', function () {
    //   socket.unsyncUpdates('thing');
    // });
  });

  //
  //   $http.get('/api/things').success(function(awesomeThings) {
  //     $scope.awesomeThings = awesomeThings;
  //   });
  //
  //   $scope.addThing = function() {
  //     if($scope.newThing === '') {
  //       return;
  //     }
  //       var thing = {
  //           title: $scope.newThing.title,
  //           info: $scope.newThing.info,
  //           active: true,
  //           user: $scope.currentUser._id
  //       };
  //     $http.post('/api/things',thing);
  //     $scope.newThing = '';
  //   };
  //
  //   $scope.deleteThing = function(thing) {
  //     $http.delete('/api/things/' + thing._id);
  //   };
  // });
