'use strict';

angular.module('item', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/item', {
      templateUrl: 'item/item.html',
      controller: 'itemCtrl'
    });
  }])

  .controller('itemCtrl', function ($scope, $http, $location, $window, $rootScope) {




  	$scope.item={item_name:"",item_unit_id:""}

$scope.itemsave = function(){
	var item_save = {item_name:$scope.item.item_name,item_unit_id:$scope.item_unit}

 $http
                    ({
                        method: 'post',
                        url: $rootScope.api_url + 'api/v1/items',
                        data: item_save
                    })

                    .success(function (data) {
                        if (data) {
                            alert("Registration completed");
                            $scope.iteminit();

                            $(document).ready(function () {
                                $('#exampleModalLabel').modal('hide');
                            });
                        } else {
                            alert('Registration Failed');
                        }
                    });

	}


$scope.purchase={purchase_date:"",quantity:"",amount:""}

  $scope.buysave = function(){

var save_item = {item_id:$scope.item_id,purchase_date:$scope.purchase.purchase_date,
    quantity:$scope.purchase.quantity,amount:$scope.purchase.amount}

 $http
                    ({
                        method: 'post',
                        url: $rootScope.api_url + 'api/v1/purchase_item',
                        data: save_item
                    })

                    .success(function (data) {
                        if (data) {
                            alert("Registration completed");
                            $scope.iteminit();

                            $(document).ready(function () {
                                $('#exampleModalLabel').modal('hide');
                            });
                        } else {
                            alert('Registration Failed');
                        }
                    });



  }



$scope.outstanding= {date:"",quantity:""}

$scope.changeAmt=function(){
    if($scope.balanceamt < $scope.outstanding.quantity){
        alert("You have only "+$scope.balanceamt+" items");
        return;
    }
}

  $scope.outstandingsave = function(){
  console.log($scope.balanceamt,$scope.outstanding.quantity);
    
    
    var out_standingdetails={tenant_id:$scope.id.id,item_id:$scope.item_id, 
      date:$scope.outstanding.date,quantity:$scope.outstanding.quantity

    }


 $http
                    ({
                        method: 'post',
                        url: $rootScope.api_url + 'api/v1/outstanding_details',
                        data: out_standingdetails
                    })

                    .success(function (data) {
                        if (data) {
                            alert("Registration completed");
                            $scope.iteminit();

                            $(document).ready(function () {
                                $('#exampleModalLabel').modal('hide');
                            });
                        } else {
                            alert('Registration Failed');
                        }
                    });

  }



$scope.iteminit = function(){
 $http({
        method: 'GET',
        url: $rootScope.api_url + 'api/v1/items'
      })
        .then(function (response) {
          $scope.iteam_details = response.data;

      //console.log($scope.iteam_details);
        })
}


$scope.itemmode = function(name){

$scope.item_unit = name;


}


$scope.buyitem = function(data){

$scope.balanceamt=data.balance_quantity ;
//alert($scope.balanceamt);

$scope.item_id = data.id;


}

            $http({

                    method: 'GET',
                    url: $rootScope.api_url + 'api/v1/active_tenant'
                })
                .then(function (response) {

                    $scope.tenant_id = response.data;
     //console.log($scope.tenant_id);

                })



$scope.changed = function(tenantid){
//alert(tenantid.tenant_name);

$scope.id = tenantid;

console.log($scope.id.tenant_name);


}


$scope.viewdetails = function(data){


localStorage.setItem("view_name",data.name);

$rootScope.purchase_id = data.id;


$window.location = "/#!/itemdetails"

}
$scope.outview = function(id,name){
  

localStorage.setItem("outview_name",name);

$rootScope.outview_id = id;

$window.location = "/#!/outviewdetails"

}

  })