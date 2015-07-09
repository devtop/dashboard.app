angular.module('dashboardApp', [])
  .controller('LogfileCtrl', ["$scope", LogfileCtrl]);

function LogfileCtrl($scope) {
    console.log("LogfileCtrl is in charge");
}
