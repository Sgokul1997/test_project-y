'use strict';

angular.module('payment', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/payment', {
            templateUrl: 'payment/payment.html',
            controller: 'paymentCtrl'
        });
    }])

    .controller('paymentCtrl', function ($scope, $http, $location, $window, $rootScope) {
        


$scope.registerpay = {id:null,payment_date:"",paied_mode:"",amount:"",reference_no:"",next_payment:""
    };


$scope.paid_id= function(){
    
    var savefile = {payment_enquery_id: $scope.payment_id, payment_date:$scope.registerpay.payment_date,next_payment:$scope.registerpay.next_payment,
        paied_mode:$scope.paied_mode,amount:$scope.registerpay.amount,
        reference_no:$scope.registerpay.reference_no}
        
    $http
                    ({
                        method: 'post',
                        url: $rootScope.api_url + 'api/v1/payments',
                        data: savefile
                    })

                    .success(function (data) {
                        if (data) {
                            alert("Registration completed");
                            $http({
        method: 'GET',
        url: $rootScope.api_url + 'api/v1/payment_enqueries?id=' + $scope.payment_enquery_id 
      })
        .then(function (response) {
          $scope.pay= response.data;

        // console.log($scope.pay);
        })

                 
                            $(document).ready(function () {
                                $('#exampleModalLabel').modal('hide');
                            });
                        } else {
                            alert('Registration Failed');
                        }
                    });




}




$scope.paymentdetails = function(enquery_id){
/*
var i;
for(i in $scope.pay){
    if($scope.pay[i].id =$scope.payment_id){
        var pay_id = $scope.pay[i];
        $scope.registerpay=angular.copy(pay_en_id);
    }
}
*/
$rootScope.payment_id = enquery_id; 






}

$scope.registerpay = function(name){

$scope.paied_mode = name;

//console.log($scope.paied_mode)


}





 $http({
        method: 'GET',
        url: $rootScope.api_url + 'api/v1/payments'
      })
        .then(function (response) {
          $scope.paymentslist = response.data;

       //  console.log($scope.paymentslist);
        })

    	
    	$http({
        method: 'GET',
        url: $rootScope.api_url + 'api/v1/payment_enqueries' 
      })
        .then(function (response) {
          $scope.pay= response.data;

        // console.log($scope.pay);
        })

  $http({
        method: 'GET',
        url: $rootScope.api_url + 'api/v1/payment_enqueries?id=' + $scope.payment_enquery_id 
      })
        .then(function (response) {
          $scope.pay= response.data;

        // console.log($scope.pay);
        })



$scope.paymentdetailspage = function(id,name){


$rootScope.payment_enquery_id = id; 

localStorage.setItem("pay_name",name);


$window.location = "/#!/paymenttype"


}







    })