'use strict';

angular.module('voteAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      }).when("/:user_name/:poll_name", {
        templateUrl: "app/main/main.html",
        controller: "MainCtrl"
      });
  });
