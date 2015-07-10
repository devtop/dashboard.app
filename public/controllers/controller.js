angular.module('dashboardApp', [])
  .controller('LogfileCtrl', ["$scope", "$http", LogfileCtrl]);

function LogfileCtrl($scope, $http) {
  console.log("LogfileCtrl is in charge");

  var refresh = function () {
    $http.get('/logfile/domainstats.json').success(function (response) {
      console.log("I got the data I requested");
      $scope.domainstats = response;
    });
  }
  refresh();
}
