'use strict';

angular.module('eblaAppApp')
  .factory('profileSvc', function ($resource) {

    return $resource('/api/profiles/:id/:controller', {
      id: '@_id'
    },
    {
      changeProfile: {
        method: 'PUT',
        params: {
          id:'me'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
    });
  });