'use strict';

angular.module('eblaAppApp')
  .controller('ModalInstanceCtrl', function ($scope, $modalInstance, item) {
    $scope.item = item;

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  })

  .controller('ProfileCtrl', function ($scope, _, $location, $routeParams, socket, Auth, mainSvc, matchSvc,  $modal, $log) {

    $scope.currentUser = Auth.getCurrentUser();
    $scope.oneAtATime = true;
    $scope.isLoggedIn = Auth.isLoggedIn;

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

// GET PROFILES
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


// GET ITEMS
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


// GET PINGS
    mainSvc.getPings().success(function(pings){
      $scope.pings = pings;
      $scope.matches=[];
      $scope.pinged = _.filter(pings, function(ping){
        return ping.sender.user === $scope.currentUser._id;
      });
      $scope.myPings = _.filter(pings, function(ping){
        return ping.recipient.user === $scope.currentUser._id;
      });
      $scope.unreadPings = _.filter($scope.myPings, function(ping){
        return ping.read === false;
      });

      for (var i = 0; i < $scope.pinged.length; i++) {
        for (var j = 0; j < $scope.myPings.length; j++) {
          if ($scope.pinged[i].recipient._id === $scope.myPings[j].sender._id) {
            $scope.matches.push($scope.myPings[j]);
          }
        }
      }
      $scope.matches = _.uniq($scope.matches);

      console.log("matches");
      console.log($scope.matches);
      return $scope.matches;
      socket.syncUpdates('ping', $scope.matches);
      socket.syncUpdates('ping', $scope.pinged);
      socket.syncUpdates('ping', $scope.myPings);
      socket.syncUpdates('ping', $scope.pings);
    });


// GET MESSAGES
    matchSvc.getMessages().success(function(messages){
      $scope.messages = messages;
      $scope.pendingTrades = [];
      $scope.mySentReqs = _.filter(messages, function(message){
        return message.user._id === $scope.currentUser._id;
      });
      $scope.myRecReqs = _.filter(messages, function(message){
        return message.recReq === $scope.currentUser._id;
      });
      $scope.acceptedReqs = _.filter($scope.myRecReqs, function(message){
        return message.accepted == "accepted";
      });
      $scope.acceptedSent = _.filter($scope.mySentReqs, function(message){
        return message.accepted == "accepted";
      });
      $scope.acceptedAll = $scope.acceptedReqs.concat($scope.acceptedSent);

      for (var i = 0; i < $scope.acceptedAll.length; i++) {
        if ($scope.acceptedAll[i].active===true) {
          $scope.pendingTrades.push($scope.acceptedAll[i]);
        }
      }
      return $scope.pendingTrades;
      console.log("sent messages");
      console.log($scope.mySentReqs);

      console.log("received messages");
      console.log($scope.myRecReqs);

      socket.syncUpdates($scope.acceptedAll);
      socket.syncUpdates($scope.myRecReqs);
      socket.syncUpdates($scope.mySentReqs);
      socket.syncUpdates($scope.pendingTrades);
    });

    $scope.accMessage = function(message){
      message.accepted = "accepted";
      mainSvc.editMessage(message);
    };

    $scope.decMessage= function(message){
      message.accepted = "declined";
      mainSvc.editMessage(message)
    };

    $scope.messActive = function(message){
      message.active = false;
      mainSvc.editMessage(message);
    }

    $scope.editProfile = function(profile){
      mainSvc.editProfile(profile)
      $location.path('/profile');
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
        address: profile.address,
        zip: profile.zip,
        phone: profile.phone,
        about: profile.about,
        active: true
      });
      $location.path("/");
    };

    $scope.myTrades = [];
    $scope.addTrade = function(trade){

      $scope.myTrades.push(trade);
      console.log($scope.myTrades);
    };


    $scope.addItem = function(item){
      mainSvc.addItem({
        profile: $scope.myProfile._id,
        title: item.title,
        price: item.price,
        image: item.image,
        tradeStat: item.tradeStat,
        likes: 0,
        active: true
      });
      socket.syncUpdates('item', $scope.items);
      $scope.newItem = {};
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
      $location.path('/profile')
    };

    $scope.editPing = function(ping){
      socket.syncUpdates('ping', $scope.pings);
      mainSvc.editPing(ping);
    };

    $scope.deletePing = function(id){
      mainSvc.deletePing(id);
    };

    $scope.addLike = function(item){
      item.likes = item.likes + 1;
      console.log(item.likes);
      mainSvc.editItem(item);
    };

  $scope.open = function (_item) {

    var modalInstance = $modal.open({
      templateUrl: 'imageShow.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
        item: function () {
          return _item;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  });
