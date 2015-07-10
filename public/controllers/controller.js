angular.module('dashboardApp', [])
  .controller('LogfileCtrl', ["$scope", "$http", LogfileCtrl]);

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
