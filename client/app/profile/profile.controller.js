'use strict';

angular.module('eblaAppApp')
  .controller('ProfileCtrl', function ($scope, $location, socket, Auth, mainSvc, profileSvc) {

    $scope.currentUser = Auth.getCurrentUser();

    $scope.myProfile = profileSvc.getMe();

    $scope.editProfile = function(profile){
      profileSvc.changeProfile(profile);
    };

    $scope.addProfile = function(profile){
      mainSvc.addProfile(profile);
      $location.path("/");
    };

  });
