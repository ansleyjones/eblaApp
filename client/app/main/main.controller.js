'use strict';

angular.module('eblaAppApp')
  .controller('MainCtrl', function ($scope, $http, $routeParams, socket, Auth, mainSvc) {
    $scope.awesomeThings = [];
    $scope.currentUser = Auth.getCurrentUser();

    mainSvc.getProfiles().success(function(profiles){
      $scope.profiles = profiles;
    });

    mainSvc.getSingleProfile($routeParams.idx).success(function(profile){
      console.log(profile);
      $scope.singleProfile = profile;
    });

    mainSvc.getItems().success(function(items){
      $scope.items = items;
    });

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', {
        user: $scope.currentUser._id,
        info: $scope.newThing,
        active: true
        });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

  $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  $scope.addSlide = function() {
    var newWidth = 600 + slides.length;
    slides.push({
      image: ['http://www.rosairus.com/wp-content/uploads/2013/08/2144858237261_kjtk8kVC_l.jpg' , 'http://thefreshexchangeblog.com/assets/Studio_Inspiration_01.jpg','http://www.artrabbit.com/images/dataobjects/images/54fed77bbdc056048241e24cd7d1aac1_0.jpg'][slides.length % 3],
      text: ['More','Extra','Lots of','Surplus'][slides.length % 3] + ' ' +
        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 3]
    });
  };
  for (var i=0; i<3; i++) {
    $scope.addSlide();
  }
  });
