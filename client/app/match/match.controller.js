'use strict';

angular.module('eblaAppApp')
  .controller('MatchCtrl', function ($scope, $location, $routeParams, matchSvc, mainSvc, socket, Auth) {

    $scope.greeting = "BITCH";
    $scope.currentUser = Auth.getCurrentUser();
    matchSvc.getSingleProfile($routeParams.idx).success(function(profile){
      $scope.singleProfile = profile;
      matchSvc.getItems().success(function(items){
        $scope.items = items;
        $scope.userItems = _.filter(items, function(item){
          return $scope.singleProfile._id === item.profile._id;
        })
        socket.syncUpdates('item', $scope.userItems);

    });
  });


    matchSvc.getProfiles().success(function(profiles){
      $scope.profiles = profiles;
      for (var i = 0; i < $scope.profiles.length; i++) {
        if ($scope.currentUser._id === $scope.profiles[i].user._id) {
          $scope.myProfile = $scope.profiles[i];
        }
      };
    });

    matchSvc.getItems().success(function(items){
      $scope.items = items;

      $scope.myItems = _.filter(items, function(item){
        return $scope.currentUser._id === item.profile.user;
      });

      socket.syncUpdates('item', $scope.myItems);
      socket.syncUpdates('item', $scope.userItems);
      socket.syncUpdates('item', $scope.items);
      return $scope.myItems;
    });

    matchSvc.getPings().success(function(pings){
      $scope.pings = pings;
      $scope.matches = [];
      $scope.pinged = _.filter(pings, function(ping){
        return ping.sender.user === $scope.currentUser._id;
      });
      $scope.myPings = _.filter(pings, function(ping){
        return ping.recipient.user === $scope.currentUser._id;
      });
      $scope.unreadPings = _.filter($scope.myPings, function(ping){
        return ping.read === false;
      });

      for (var i = 0; i < $scope.myPings.length; i++) {
        for (var j = 0; j < $scope.pinged.length; j++) {
          if ($scope.myPings.sender === $scope.pinged.recipient) {
            $scope.matches.push($scope.myPings[i]);
          }
        }
      }
      return $scope.matches;

      socket.syncUpdates('ping', $scope.matches);
      socket.syncUpdates('ping', $scope.pinged);
      socket.syncUpdates('ping', $scope.myPings);
      socket.syncUpdates('ping', $scope.pings);
    });

    $scope.tradeOpts = [];
    $scope.addTradeOpt = function(ping){
      $scope.tradeOpts.push(ping);
    };

    $scope.removeTradeOpt = function(ping){
      $scope.tradeOpts.splice(this.ping, 1);
    };

    
  });
