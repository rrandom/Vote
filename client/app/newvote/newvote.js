'use strict';

angular.module('voteAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/newvote', {
        templateUrl: 'app/newvote/newvote.html',
        controller: 'NewvoteCtrl'
      });
  });
