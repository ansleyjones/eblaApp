'use strict';

angular.module('eblaAppApp')
  .factory('mainSvc', function ($http, $log, $rootScope, $route, Auth, User) {

    var currentUser = Auth.getCurrentUser();
    var myUser = User.get();

// USER METHODS
    var usersUrl = "/api/users";

    var getUsers = function(){
      return $http.get(usersUrl);
    };

    var getSingleUser = function(id){
      return $http.get(usersUrl + "/" + id);
    };

// PROFILE METHODS

    var profilesUrl = "/api/profiles";

    var getProfiles = function (){
      return $http.get(profilesUrl);
    };

    var getSingleProfile = function(id){
      return $http.get(profilesUrl + "/" + id);
    };

    var addProfile = function(profile){
      // var newProfile = {
      //   user: currentUser._id,
      //   firstName: profile.firstName,
      //   lastName: profile.lastName,
      //   image: profile.image,
      //   trade: [],
      //   location: {
      //     city: profile.location.city,
      //     state: profile.location.state
      //   },
      //   messages: [],
      //   about: profile.about,
      //   friends:[],
      //   active: true
      // }
      $http.post(profilesUrl, profile).then(function(response){
        $rootScope.$broadcast("profile:added");
      });
    };

    var editProfile = function(profile){
      $http.put(profilesUrl + "/" + profile._id, profile).then(function(response){
        $rootScope.$broadcast("product:updated");
      })
    };

    var deleteProfile = function(id){
      $http.delete(profilesUrl + "/" + id).then(function(response){
        $rootScope.$broadcast("product:deleted");
      })
    };


// MESSAGE METHODS
    var pingsUrl = "/api/pings";

    var getPings = function(){
      return $http.get(pingsUrl);
    };

    var getSinglePing = function(id){
      return $http.get(pingsUrl + "/" + id);
    };

    var editPing = function(ping){
      $http.put(pingsUrl + "/" + ping._id, ping).then(function(response){
        $rootScope.$broadcast("ping:updated");
      });
    };
    var addPing = function(ping){
      $http.post(pingsUrl, ping).then(function(response){
        $rootScope.$broadcast("new ping:added");
      });
    };

    var deletePing = function(id){
      $http.delete(pingsUrl + "/" + id).then(function(response){
        $rootScope.$broadcast("ping:deleted")
      })
    };

// ITEM METHODS
    var itemsUrl = "/api/items";

    var getItems = function(){
      return $http.get(itemsUrl);
    };

    var getSingleItem = function(id){
      return $http.get(itemsUrl + "/" + id);
    };

    var addItem = function(item){
      $http.post(itemsUrl, item).then(function(response){
        $rootScope.$broadcast("new item:added");
      });
    };

    var editMessage = function(message){
      $http.put(messagesUrl + "/" + message._id, message).then(function(response){
        $rootScope.$broadcast("message:updated");
      });
    };


    var deleteItem = function(id){
      $http.delete(itemsUrl + "/" + id).then(function(response){
        $rootScope.$broadcast("item:deleted");
      });
    };

    var messagesUrl = "/api/messages";

    var getMessages = function(){
      return $http.get(messagesUrl);
    };
    var editItem = function(item){
      $http.put(itemsUrl + "/" + item._id, item).then(function(response){
        $rootScope.$broadcast("item:updated");
      });
    };
    var deleteMessage = function(id){
      $http.delete(messagesUrl + "/" + id).then(function(response){
        $rootScope.$broadcast("message:deleted");
      });
    };

    return{
      getUsers: getUsers,
      getSingleUser: getSingleUser,

      getProfiles: getProfiles,
      getSingleProfile: getSingleProfile,
      addProfile: addProfile,
      editProfile: editProfile,
      deleteProfile: deleteProfile,

      getPings: getPings,
      getSinglePing: getSinglePing,
      addPing: addPing,
      editPing: editPing,
      deletePing: deletePing,

      getItems: getItems,
      getSingleItem: getSingleItem,
      addItem: addItem,
      editItem: editItem,
      deleteItem: deleteItem,

      getMessages: getMessages,
      deleteMessage: deleteMessage,
      editMessage: editMessage
    }

  });
