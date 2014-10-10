'use strict';

angular.module('eblaAppApp')
  .controller('MatchCtrl', function ($scope, _, $location, $routeParams, matchSvc, mainSvc, socket, Auth) {

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
      // $scope.matches = [];
      $scope.matchesPinged = [];

      $scope.pinged = _.filter(pings, function(ping){
        return ping.sender.user === $scope.currentUser._id;
      });
      $scope.myPings = _.filter(pings, function(ping){
        return ping.recipient.user === $scope.currentUser._id;
      });
      $scope.unreadPings = _.filter($scope.myPings, function(ping){
        return ping.read === false;
      });

      // for (var i = 0; i < $scope.pinged.length; i++) {
      //   for (var j = 0; j < $scope.myPings.length; j++) {
      //     if ($scope.pinged[i].recipient._id === $scope.myPings[j].sender._id) {
      //       $scope.matches.push($scope.myPings[j]);
      //     }
      //   }
      // }


      for (var i = 0; i < $scope.myPings.length; i++) {
        for (var j = 0; j < $scope.pinged.length; j++) {
          if ($scope.myPings[i].sender._id === $scope.pinged[j].recipient._id) {
            $scope.matchesPinged.push($scope.pinged[j]);
          }
        }
      }
      $scope.matchesPinged = _.uniq($scope.matchesPinged);

      // for (var i = 0; i < $scope.myPings.length; i++) {
      //   if ($scope.myPings[i].sender._id === $scope.tradeOpts[0].recipient._id) {
      //     $scope.matches.push($scope.myPings[i])
      //   }
      // }
      // $scope.matches = _.uniq($scope.matches);
      socket.syncUpdates('ping', $scope.matches);
      socket.syncUpdates('ping', $scope.pinged);
      socket.syncUpdates('ping', $scope.myPings);
      socket.syncUpdates('ping', $scope.pings);
      return $scope.matchesPinged;


    });

    $scope.tradeOpts = [];
    $scope.yourPing = [];
    $scope.myPing = [];

    $scope.addTradeOpt = function(ping){
      $scope.tradeOpts.push(ping);
      $scope.matches = [];
      $scope.myPing = _.find($scope.tradeOpts, function(ping){
        return ping.sender.user === $scope.currentUser._id;
      });
      console.log('my ping');
      console.log($scope.myPing);
      $scope.yourPing = _.find($scope.tradeOpts, function(ping){
        return ping.sender.user != $scope.currentUser._id;
      });
      console.log('your ping');
      console.log($scope.yourPing);

      for (var i = 0; i < $scope.myPings.length; i++) {
        if ($scope.myPings[i].sender._id === $scope.tradeOpts[0].recipient._id) {
          $scope.matches.push($scope.myPings[i])
        }
      }
      $scope.matches = _.uniq($scope.matches);
      return $scope.matches;

    };

    $scope.removeTradeOpt = function(idx){
      var myId = idx;
      $scope.myPing = _.find($scope.tradeOpts, function(ping){
        return ping._id === myId;
      })
      $scope.tradeOpts.splice($scope.tradeOpts.indexOf($scope.myPing), 1);
    };

    $scope.tradeStats = function(){
      $scope.stats = $scope.yourPing.item.price - $scope.myPing.item.price;
        console.log($scope.stats);

    };

    $scope.addMessage = function(newMessage){
      matchSvc.addMessage({
        sender: $scope.myProfile._id,
        user: $scope.currentUser._id,
        pingItems: $scope.tradeOpts,
        recReq: $scope.yourPing.sender.user,
        subject: newMessage.subject,
        message: newMessage.message,
        accepted: "pending",
        date: new Date(),
        active: true
      });
      $location.path('/profile');
    }
  });
