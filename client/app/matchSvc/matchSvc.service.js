'use strict';

angular.module('eblaAppApp')
  .factory('matchSvc', function ($http, $log, $rootScope, $route, Auth, User) {

    var usersUrl = "/api/users";

    var getUsers = function(){
      return $http.get(usersUrl);
    };

    var getSingleUser = function(id){
      return $http.get(usersUrl + "/" + id);
    };

    var profilesUrl = "/api/profiles";

    var getProfiles = function (){
      return $http.get(profilesUrl);
    };

    var getSingleProfile = function(id){
      return $http.get(profilesUrl + "/" + id);
    };

    var itemsUrl = "/api/items";

    var getItems = function(){
      return $http.get(itemsUrl);
    };

    var getSingleItem = function(id){
      return $http.get(itemsUrl + "/" + id);
    };

    var pingsUrl = "/api/pings";

    var getPings = function(){
      return $http.get(pingsUrl);
    };

    var getSinglePing = function(id){
      return $http.get(pingsUrl + "/" + id);
    };

    var messagesUrl = "/api/messages";

    var getMessages = function(){
      return $http.get(messagesUrl);
    };

    var getSingleMessage = function(id){
      return $http.get(messagesUrl + "/" + id);
    };

    var addMessage = function(message){
      $http.post(messagesUrl, message).then(function(response){
        $rootScope.$broadcast("new message:added");
      });
    };

    var editMessage = function(message){
      $http.put(messagesUrl + "/" + message._id, message).then(function(response){
        $rootScope.$broadcast("message:updated");
      });
    };


    return{
      getUsers: getUsers,
      getSingleUser: getSingleUser,
      getProfiles: getProfiles,
      getSingleProfile: getSingleProfile,
      getItems: getItems,
      getSingleItem: getSingleItem,
      getPings: getPings,
      getSinglePing: getSinglePing,
      getMessages: getMessages,
      getSingleMessage: getSingleMessage,
      addMessage: addMessage,
      editMessage: editMessage
    }
  });
