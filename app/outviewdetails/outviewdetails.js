'use strict';

angular.module('outviewdetails', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/outviewdetails', {
      templateUrl: 'outviewdetails/outviewdetails.html',
      controller: 'outviewdetailsCtrl'
    });
  }])

  .controller('outviewdetailsCtrl', function ($scope, $http, $location, $window, $rootScope) {


  	$scope.viewname=localStorage.getItem("outview_name");



$scope.outstandingviewinit= function(){
$http({
        method: 'GET',
        url: $rootScope.api_url + 'api/v1/outstanding_items?id=' +$rootScope.outview_id
      })
        .then(function (response) {
          $scope.outstandingview = response.data;
console.log($scope.outstandingview);
    
        })
}






  })