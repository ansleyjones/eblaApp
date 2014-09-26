'use strict';

angular.module('eblaAppApp')
  .factory('mainSvc', function ($http, $log, $rootScope, $route, Auth, profileSvc) {

    var currentUser = Auth.getCurrentUser();

// USER METHODS
    var usersUrl = "/api/users";

    var getUsers = function(){
      return $http.get(usersUrl);
    };

    var getSingleUser = function(id){
      return $http.get(usersUrl + "/" + id);
    };

// PROFILE METHODS
    // var currentProfile = profileSvc.get();

    var profilesUrl = "/api/profiles";

    var getProfiles = function (){
      return $http.get(profilesUrl);
    };

    var getSingleProfile = function(id){
      return $http.get(profilesUrl + "/" + id);
    };

    var addProfile = function(profile){
      var newProfile = {
        user: currentUser._id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        image: profile.image,
        trade: profile.trade,
        location: {
          city: profile.city,
          state: profile.state
        },
        about: profile.about,
        tradeStat: false,
        friends:[],
        active: true
      }
      $http.post(profilesUrl, newProfile).then(function(response){
        $rootScope.$broadcast("profile:added");
      });
    };

    var editProfile = function(id){

    };

    var deleteProfile = function(id){

    };

// MESSAGE METHODS
    var messagesUrl = "/api/messages";

    var getMessages = function(){
      return $http.get(messagesUrl);
    };

    var getSingleMessage = function(id){
      return $http.get(messagesUrl + "/" + id);
    };

    var deleteMessage = function(id){

    };

// ITEM METHODS
    var itemsUrl = "/api/items";

    var getItems = function(){
      return $http.get(itemsUrl);
    };

    var getSingleItem = function(id){
      return $http.get(itemsUrl + "/" + id);
    };

    return{
      getUsers: getUsers,
      getSingleUser: getSingleUser,
      getProfiles: getProfiles,
      getSingleProfile: getSingleProfile,
      addProfile: addProfile,
      editProfile: editProfile,
      deleteProfile: deleteProfile,
      getMessages: getMessages,
      getSingleMessage: getSingleMessage,
      deleteMessage: deleteMessage,
      getItems: getItems,
      getSingleItem: getSingleItem
    }

  });
