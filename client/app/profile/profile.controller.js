'use strict';

angular.module('eblaAppApp')
  .controller('ProfileCtrl', function ($scope, _, $location, $routeParams, socket, Auth, mainSvc) {

    $scope.currentUser = Auth.getCurrentUser();

    $scope.trades = [
      'Painting/Drawing',
      'Printmaking',
      'Photography',
      'Metalwork',
      'Jewelry',
      'Textiles',
      'Woodwork',
      'Graphics'
    ];

    mainSvc.getSingleProfile($routeParams.idx).success(function(profile){
      $scope.singleProfile = profile;
      mainSvc.getItems().success(function(items){
        $scope.items = items;
        $scope.userItems = _.filter(items, function(item){
          return $scope.singleProfile._id === item.profile._id;
        })
        socket.syncUpdates('item', $scope.userItems);

    });
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

      $scope.myItems = _.filter(items, function(item){
        return $scope.currentUser._id === item.profile.user;
      });

      socket.syncUpdates('item', $scope.myItems);
      socket.syncUpdates('item', $scope.userItems);
      socket.syncUpdates('item', $scope.items);
      return $scope.myItems;
    });

    mainSvc.getPings().success(function(pings){
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

    $scope.editProfile = function(profile){
      mainSvc.editProfile(profile);
    };

    $scope.addProfile = function(profile){
      mainSvc.addProfile({
        user: $scope.currentUser._id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        image: profile.image,
        trade: $scope.myTrades,
        location: {
          city: profile.location.city,
          state: profile.location.state
        },
        messages: [],
        about: profile.about,
        friends:[],
        active: true
      });
      $location.path("/");
    };
    $scope.myTrades = [];
    $scope.addTrade = function(trade){

      $scope.myTrades.push(trade);
      console.log($scope.myTrades);
    };
    //
    // $scope.submitTrades = function () {
    //   mainSvc.editProfile($scope.Profile);
    // }


    $scope.addItem = function(item){
      mainSvc.addItem({
        profile: $scope.myProfile._id,
        title: item.title,
        price: item.price,
        image: item.image,
        tradeStat: item.tradeStat,
        active: true
      });
      socket.syncUpdates('item', $scope.items);
      $scope.item = {};
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
