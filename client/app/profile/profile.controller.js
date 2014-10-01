'use strict';

angular.module('eblaAppApp')
  .controller('ProfileCtrl', function ($scope, $location, $routeParams, socket, Auth, mainSvc) {

    $scope.currentUser = Auth.getCurrentUser();


    mainSvc.getSingleProfile($routeParams.idx).success(function(profile){
      $scope.singleProfile = profile;
    });


    mainSvc.getProfiles().success(function(profiles){
      $scope.profiles = profiles;
      for (var i = 0; i < $scope.profiles.length; i++) {
        if ($scope.currentUser._id === $scope.profiles[i].user._id) {
          $scope.myProfile = $scope.profiles[i];
        }
      };
    });

    mainSvc.getItems().success(function(items){
      $scope.items = items;
      $scope.myItems = [];
      for (var i = 0; i < $scope.items.length; i++) {
        if ($scope.currentUser._id === $scope.items[i].profile.user) {
          $scope.myItems.push($scope.items[i]);
        }
      };
      socket.syncUpdates('item', $scope.myItems);
      return $scope.myItems;
    });

    mainSvc.getItems().success(function(items){
      $scope.items = items;
      $scope.userItems = [];
      for (var i = 0; i < $scope.items.length; i++) {
        if ($scope.singleProfile._id === $scope.items[i].profile._id) {
          $scope.userItems.push($scope.items[i]);
        }
      };
      return $scope.userItems;
    });


    mainSvc.getPings().success(function(pings){
      $scope.pings = pings;
      $scope.myPings = [];
      $scope.unreadPings = [];
      for (var i = 0; i < $scope.pings.length; i++) {
        if ($scope.currentUser._id === $scope.pings[i].recipient.user) {
          $scope.myPings.push($scope.pings[i]);
          if ($scope.pings[i].read === false) {
            $scope.unreadPings.push($scope.pings[i]);
            console.log($scope.unreadPings);
            socket.syncUpdates('ping', $scope.unreadPings);
          }
        }
      };
      socket.syncUpdates('ping', $scope.myPings);
      socket.syncUpdates('ping', $scope.pings);

      return [$scope.myPings, $scope.unreadPings];
    });

    $scope.editProfile = function(profile){
      mainSvc.editProfile(profile);
    };

    $scope.addProfile = function(profile){
      mainSvc.addProfile(profile);
      $location.path("/");
    };

    $scope.addItem = function(item){
      mainSvc.addItem({
        profile: $scope.myProfile._id,
        title: item.title,
        price: item.price,
        image: item.image,
        tradeStat: item.tradeStat,
        active: true
      });
    };

    $scope.addPing = function(ping, item){
      var newPing = {
        sender: $scope.myProfile._id,
        recipient: $scope.singleProfile._id,
        item: this.item._id,
        date: new Date(),
        read: false
      }
      mainSvc.addPing(newPing);
    };

    $scope.editPing = function(ping){
      socket.syncUpdates('ping', $scope.pings);
      mainSvc.editPing(ping);
    };

    $scope.deletePing = function(id){
      mainSvc.deletePing(id);
    };
  });
