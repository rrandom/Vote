'use strict';

angular.module('voteAppApp')
  .controller('MainCtrl', function ($scope, $http, $location, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.page = "newPoll";
    $scope.placeholders = ["Coke", "Pepsi"];
    $scope.pollName = {
      name: ""
    };
    $scope.pollOptions = [];
    $scope.pollResults = [];
    $scope.currentUser = Auth.getCurrentUser().name;

    $scope.loadPoll = function (userName, pollName, e) {
      $http.get("/api/polls/" + userName + "/" + pollName).success(function (b, c) {
        if (b[0]) {
          console.log(b[0].poll_results);
          console.log(b[0].poll_options);
          var d = [];
          d.push(b[0].poll_results);
          $scope.data = d;
          $scope.labels = b[0].poll_options;
          $scope.pollName = b[0].poll_name;
          $scope.pollCreator = b[0].user_name;
          $scope.pollOptions = b[0].poll_options;
          $scope._id = b[0]._id;
        }
        $scope.page = e;
        if ("results" === e) {
          $(".results").css({
            display: "block",
            visibility: "visible",
            backgroundColor: "pink"
          });
        }
      }).error(function (a, b) {
        console.log(b)
      });
    };

    $scope.addPoll = function () {
      console.log("Submitting poll for " + Auth.getCurrentUser().name + "...");
      $scope.pollName = $scope.pollName.name.split("").map(function (a) {
        return /[\w\s]/.test(a) ? a : void 0;
      }).join("");
      $http.post("/api/polls", {
        user_name: Auth.getCurrentUser().name,
        poll_name: $scope.pollName,
        poll_options: $scope.pollOptions,
        poll_results: $scope.makeArr($scope.pollOptions.length)
      }).success(function () {
        console.log("New poll posted");
        $scope.page = "newPollPosted";
        $scope.pollName = {
          name: ""
        };
        $scope.pollOptions = [];
      });
      $scope.url = "";
      $scope.url = window.location + Auth.getCurrentUser().name + "/" + $scope.pollName;
    };

    $scope.loadNewPoll = function () {
      $(".results").css("display", "none");
      $scope.page = "newPoll";
      $scope.pollName = {
        name: ""
      };
      $scope.pollOptions = [];
      $location.path("/");
    };

    $scope.addVote = function () {
      var optionNumber = $("input[type = radio]:checked").val();
      console.log("Submitting " + Auth.getCurrentUser().name + "'s vote for poll id: " + $scope._id);
      optionNumber = Number(optionNumber);
      $http.put("api/polls/" + $scope._id + "/" + optionNumber).success(function (data) {
        console.log("Vote submitted");
        $scope.loadPoll($scope.pollCreator, $scope.pollName, "results");
      });
    };

    $scope.loadAllPolls = function () {
      $http.get("api/polls/" + Auth.getCurrentUser().name)
        .success(function (data) {
          $scope.polls = data;
          $(".results").css("display", "none");
          $scope.page = "allPolls";
        })
    };

    $scope.deletePoll = function (poll) {
      $http.delete("api/polls/" + poll).success(function () {
        var b = poll;
        b = "#" + b.split(" ")[0];
        $(b).remove();
      });
    };

    $scope.addOption = function () {
      $scope.placeholders.push("New Option");
    };

    $scope.makeArr = function (length) {
      for (var data = [], c = 0; c < length; c++) {
        data.push(0);
      }
      return data;
    };

    if (/[^\/].*(?=\/)/.test($location.path())) {
      $scope.page = "";
      var path = $location.path(),
        userName = path.match(/[^\/].*(?=\/)/),
        pollName = path.match(/.\/.*(?=$)/);
      pollName = pollName[0].substr(2, pollName[0].length);
      $scope.loadPoll(pollName, pollName, "vote")
    }

  });
