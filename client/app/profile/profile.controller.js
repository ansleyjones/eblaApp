'use strict';

angular.module('eblaAppApp')
  .controller('ProfileCtrl', function ($scope, $location, socket, Auth, mainSvc, profileSvc) {

    $scope.currentUser = Auth.getCurrentUser();

    profileSvc.get().success(function(profile){
      $scope.myProfile = profile;
    });

    $scope.editProfile = function(id){
      profileSvc.put(id)
    }

    $scope.addProfile = function(profile){
      mainSvc.addProfile(profile);
      $location.path("/");
    };

  });
