'use strict';

angular.module('paymenttype', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/paymenttype', {
      templateUrl: 'paymenttype/paymenttype.html',
      controller: 'paymenttypeCtrl'
    });
  }])

  .controller('paymenttypeCtrl', function ($scope, $http, $location, $window, $rootScope) {





$scope.name= localStorage.getItem("pay_name");

$scope.paymenttypeinit = function(){

$http({
        method: 'GET',
        url: $rootScope.api_url + 'api/v1/payment?id=' +$rootScope.payment_enquery_id
      })
        .then(function (response) {
          $scope.paydetails= response.data;

        // console.log($scope.paydetails);
        })




}


  })