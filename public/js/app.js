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
  function loadFeed(url) {
    RssfeedService.parseFeed(url).then(function (res) {
      console.log("I got the rssfeed data I requested");
      var entries = res.data.responseData.feed.entries;
      entries = addDateObjects(entries);
      entries = refineDateString(entries);
      entries.sort(feedCompareDateDesc);
      $scope.feeds = entries;
    });
  }

  function addDateObjects(list) {
    var numberDate;
    for (var index=0; index < list.length; index++) {
        list[index].dateObj = new Date(list[index].publishedDate);
    }
    return list;
  }

  function refineDateString(list) {
    var monthNames = [
      "Januar", "Februar", "Mars",
      "April", "May", "Juni",
      "Juli", "August", "September",
      "Oktober", "November", "December"];
    var date;

    for (var index=0; index < list.length; index++) {
      date = list[index].dateObj;
      list[index].publishedDate = date.getDate() + ' ';
      list[index].publishedDate += monthNames[date.getMonth()-1] + ' ';
      list[index].publishedDate += date.getFullYear() + ' ';
      list[index].publishedDate += date.getHours() + ':' + date.getMinutes();
    }

    return list;
  }

  function feedCompareDateDesc(a,b) {
    if (a.dateObj < b.dateObj)
      return 1;
    if (a.dateObj > b.dateObj)
      return -1;
    return 0;
  };

  loadFeed(feedUrl);
}

App.controller('JsonfeedCtrl', ["$scope", "$http", JsonfeedCtrl]);
function JsonfeedCtrl($scope, $http) {
  console.log("JsonfeedCtrl is in charge");
  var feedUrl = '/jsonfeed.json';

  var loadFeed = function(url) {
    $http.get(url).success(function (res) {
      console.log("I got the jsonfeed data I requested");
      res = addDateObjects(res);
      res = refineDateString(res);
      res.sort(feedCompareDateDesc);
      $scope.feeds = res;
    });
  };

  function addDateObjects(list) {
    var monthNames = [
      "Januar", "Februar", "Mars",
      "April", "May", "Juni",
      "Juli", "August", "September",
      "Oktober", "November", "December"];
    var month;
    var numberDate;
    for (var index=0; index < list.length; index++) {
      for (month=1; month <= 12; month++) {
        numberDate = list[index].date.replace(
          ' ' + monthNames[month-1] + ' ',
          '.' + month + '.'
        );
        list[index].dateObj = new Date(numberDate + ' ' + list[index].time);
      }
    }
    return list;
  }

  function refineDateString(list) {
    for (var index=0; index < list.length; index++) {
      list[index].publishedDate = list[index].date + ' ' + list[index].time;
    }
    return list;
  }

  function feedCompareDateDesc(a,b) {
    if (a.dateObj < b.dateObj)
      return 1;
    if (a.dateObj > b.dateObj)
      return -1;
    return 0;
  };
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
