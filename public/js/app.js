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

App.controller('RssfeedCtrl', ["$scope", "RssfeedService", RssfeedCtrl]);

function RssfeedCtrl($scope, RssfeedService) {
  console.log("RssfeedCtrl is in charge");
  var feedUrl = 'http://www.vg.no/rss/nyfront.php?frontId=1';
  var loadFeed = function(url) {
    RssfeedService.parseFeed(url).then(function (res) {
      console.log("I got the rssfeed data I requested");
      $scope.feeds = res.data.responseData.feed.entries;
      $scope.feeds.sort(function (a,b){
        a = new Date(a.publishedDate);
        b = new Date(b.publishedDate);
        if (a < b)
          return 1;
        if (a > b)
          return -1;
        return 0;
      });
    });
  }
  loadFeed(feedUrl);
}

App.controller('JsonfeedCtrl', ["$scope", "$http", JsonfeedCtrl]);
function JsonfeedCtrl($scope, $http) {
  console.log("JsonfeedCtrl is in charge");
  var feedUrl = '/jsonfeed.json';

  var loadFeed = function(url) {
    $http.get(url).success(function (res) {
      var monthNames = new Array("Januar", "Februar", "Mars",
        "April", "May", "Juni", "Juli", "August", "September",
        "Oktober", "November", "December");
      console.log("I got the jsonfeed data I requested");

      var month;
      var numberDate;
      for (var index=0; index < res.length; index++) {
        for (month=1; month <= 12; month++) {
          numberDate = res[index].date.replace(' '+monthNames[month-1]+' ', '.'+month+'.');
          res[index].dateObj = new Date(numberDate+' '+ res[index].time);
        }
      }
      $scope.feeds = res;
      $scope.feeds.sort(feedCompareDateDesc)
    });
  };

  var feedCompareDateDesc = function(a,b) {
    if (a.dateObj < b.dateObj)
      return 1;
    if (a.dateObj > b.dateObj)
      return -1;
    return 0;
  }
  loadFeed(feedUrl);
}


App.factory('RssfeedService', ['$http', RssfeedService]);

function RssfeedService($http) {
  return {
    parseFeed: function (url) {
      return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
    }
  }
}
