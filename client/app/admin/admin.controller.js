'use strict';

angular.module('eblaAppApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, mainSvc) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    mainSvc.getProfiles().success(function(profiles){
      $scope.profiles = profiles;
    });

    mainSvc.getItems().success(function(items){
      $scope.items = items;
    });

    mainSvc.getPings().success(function(pings){
      $scope.pings = pings;
    });

    mainSvc.getMessages().success(function(messages){
      $scope.messages = messages;
    });

    $scope.deleteProfile = function(id){
      mainSvc.deleteProfile(id);
    };

    $scope.deleteItem = function(id){
      mainSvc.deleteItem(id);
    };

    $scope.deletePing = function(id){
      mainSvc.deletePing(id);
    };

    $scope.deleteMessage = function(id){
      mainSvc.deleteMessage(id);
    };
    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  });
