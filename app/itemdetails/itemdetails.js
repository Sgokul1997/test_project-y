'use strict';

angular.module('itemdetails', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/itemdetails', {
      templateUrl: 'itemdetails/itemdetails.html',
      controller: 'itemdetailsCtrl'
    });
  }])

  .controller('itemdetailsCtrl', function ($scope, $http, $location, $window, $rootScope) {



$scope.viewname=localStorage.getItem("view_name");



$scope.viewdetailsinit= function(){
$http({
        method: 'GET',
        url: $rootScope.api_url + 'api/v1/purchase_details?id='+$rootScope.purchase_id
      })
        .then(function (response) {
          $scope.view_details = response.data;

        })
}



  })