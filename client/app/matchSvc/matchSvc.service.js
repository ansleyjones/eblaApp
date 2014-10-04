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

    return{
      getUsers: getUsers,
      getSingleUser: getSingleUser,
      getProfiles: getProfiles,
      getSingleProfile: getSingleProfile,
      getItems: getItems,
      getSingleItem: getSingleItem,
      getPings: getPings,
      getSinglePing: getSinglePing
    }
  });
