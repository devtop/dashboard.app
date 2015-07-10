var App = angular.module('dashboardApp', []);
App.controller('LogfileCtrl', ["$scope", "$http", LogfileCtrl]);

function LogfileCtrl($scope, $http) {
  console.log("LogfileCtrl is in charge");

  var refresh = function () {
    $http.get('/logfile/domainstats.json').success(function (response) {
      console.log("I got the domain data I requested");
      $scope.domainstats = response.splice(0,5);
    });

    $http.get('/logfile/filestats.json').success(function (response) {
      console.log("I got the file data I requested");
      $scope.filestats = response.splice(0,5);
    });
  }
  refresh();
}

App.controller('RssfeedCtrl', ["$scope", "FeedService", RssfeedCtrl]);

function RssfeedCtrl($scope, FeedService) {
  var vg = 'http://www.vg.no/rss/nyfront.php?frontId=1';
  $scope.loadButonText = "Load";
  function loadFeed(url) {
    FeedService.parseFeed(url).then(function (res) {
      $scope.feeds = res.data.responseData.feed.entries;
      $scope.feeds.sort(function (a,b){
        a = new Date(a.publishedDate);
        b = new Date(b.publishedDate);
        if (a < b)
          return 1;
        if (a > b)
          return -1;
        return 0;
      })
    });
  }
  loadFeed(vg);
}


App.factory('FeedService', ['$http', FeedService]);

function FeedService($http) {
  return {
    parseFeed: function (url) {
      return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
    }
  }
}
