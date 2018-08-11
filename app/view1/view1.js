'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'view1Ctrl'
  });
}])

.controller('view1Ctrl', ['$scope','$http','$location','$rootScope','$timeout','$window', function($scope,$http,$location,$rootScope,$timeout,$window) {
$scope.percentageValue = 39;
$scope.MachineID;
$scope.ShiftID;
  $scope.tenant_id=localStorage.getItem("tenant_id");
$scope.username=localStorage.getItem("username");
$scope.roleforpage=localStorage.getItem("role_id");
$scope.useridforedit=localStorage.getItem("userid");
$scope.JobID;
$scope.dateday=new Date();

$scope.from_date;
$scope.to_date;
$scope.report_list=[];

  /*$http({
    method:'GET',
    url:$rootScope.api_url+'api/v1/month_reports?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
   console.log(response,"ssss")
   $scope.reportDate=response.data.date;
   
   $scope.reportUrl="http://dp.yantra24x7.com"+response.data.file_path.url;
    })
*/

$http({
    method:'GET',
    url:$rootScope.api_url+'api/v1/month_reports?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
   $scope.reportDate=response.data;
   
   //$scope.reportUrl="http://dp.yantra24x7.com"+reportDate.data.file_path.url;
    })

  $http({

    method:'GET',
    url:$rootScope.api_url+'api/v1/operators?tenant_id='+$scope.tenant_id
  })
  .then(function(response){
   $rootScope.operators = response.data; 
   
    })

    
  $scope.exportData = function (){
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Report.xls");
  };

$scope.typewise=["Shiftwise","Operatorwise"]

 $scope.mychange=function(man){
      //$scope.operator_id='';
     
     // $scope.ShiftID = undefined;
     $rootScope.wise= man;
     console.log($rootScope.wise);
}
$scope.checkingmachineid=function(){
if($scope.MachineID == null){
  $scope.MachineID=undefined;
}
//alert($scope.MachineID);

}
$scope.checkingshiftid=function(){
  $scope.operator_id=undefined;
  if($scope.ShiftID == null){
  $scope.ShiftID=undefined;
}
 //alert($scope.ShiftID);
}

$scope.checkingopid=function(){
   $scope.ShiftID=undefined;
  if($scope.operator_id == null){
  $scope.operator_id=undefined;
}
 //alert($scope.operator_id);
}

/* ----------------new code ------------*/

$scope.generate_report=function(gd,opid){
 if (!$('nav.side-navbar').hasClass('shrink')) {
     
        $('nav.side-navbar').toggleClass('shrink');
        $('.page').toggleClass('active');
    }


  if($rootScope.wise == 'Operatorwise' && $scope.operator_id==undefined){
  alert("please select operator")
  return;
}
$scope.myLoader = true;
 if($scope.MachineID ==undefined && $rootScope.wise=="Shiftwise" && $scope.ShiftID == undefined){
 
$http({
    method:'GET',
    url:$rootScope.api_url_report+'api/v1/machines/reports_page?tenant_id='+$scope.tenant_id+'&start_date='+$scope.from_date+'&end_date='+$scope.to_date+'&report_type='+ $rootScope.wise
  }).then(function(response){
  $scope.myLoader = false;
   $scope.items = response.data;
   console.log($scope.items); 
   $scope.isdisabled=false;
    })

}else if($scope.MachineID ==undefined && $rootScope.wise=="Shiftwise" && $scope.ShiftID != undefined){

$http({
    method:'GET',
    url:$rootScope.api_url_report+'api/v1/machines/reports_page?tenant_id='+$scope.tenant_id+'&start_date='+$scope.from_date+'&end_date='+$scope.to_date+'&shift_id='+$scope.ShiftID+'&report_type='+ $rootScope.wise
  }).then(function(response){
  $scope.myLoader = false;
   $scope.items = response.data;
   console.log($scope.items); 
   $scope.isdisabled=false;
    })
}else if($scope.MachineID !=undefined && $rootScope.wise=="Shiftwise" && $scope.ShiftID != undefined){ 

$http({
    method:'GET',
    url:$rootScope.api_url_report+'api/v1/machines/reports_page?tenant_id='+$scope.tenant_id+'&start_date='+$scope.from_date+'&end_date='+$scope.to_date+'&machine_id='+$scope.MachineID+'&shift_id='+$scope.ShiftID+'&report_type='+ $rootScope.wise
  })
  .then(function(response){
    $scope.myLoader = false;
   $scope.items = response.data; 
 $scope.isdisabled=false;
    })
}else if($scope.MachineID !=undefined && $rootScope.wise=="Shiftwise" && $scope.ShiftID == undefined){ 
$http({
    method:'GET',
    url:$rootScope.api_url_report+'api/v1/machines/reports_page?tenant_id='+$scope.tenant_id+'&start_date='+$scope.from_date+'&end_date='+$scope.to_date+'&machine_id='+$scope.MachineID+'&report_type='+ $rootScope.wise
  })
  .then(function(response){
    $scope.myLoader = false;
   $scope.items = response.data; 
 $scope.isdisabled=false;
    })
}



//datewise


if($scope.MachineID ==undefined && $rootScope.wise=="Datewise" && $scope.ShiftID == undefined){
 
$http({
    method:'GET',
    url:$rootScope.api_url_report+'api/v1/machines/reports_page?tenant_id='+$scope.tenant_id+'&start_date='+$scope.from_date+'&end_date='+$scope.to_date+'&report_type='+ $rootScope.wise
  }).then(function(response){
  $scope.myLoader = false;
   $scope.items = response.data;
   console.log($scope.items); 
   $scope.isdisabled=false;
    })

}else if($scope.MachineID ==undefined && $rootScope.wise=="Datewise" && $scope.ShiftID != undefined){

$http({
    method:'GET',
    url:$rootScope.api_url_report+'api/v1/machines/reports_page?tenant_id='+$scope.tenant_id+'&start_date='+$scope.from_date+'&end_date='+$scope.to_date+'&shift_id='+$scope.ShiftID+'&report_type='+ $rootScope.wise
  }).then(function(response){
  $scope.myLoader = false;
   $scope.items = response.data;
   console.log($scope.items); 
   $scope.isdisabled=false;
    })
}else if($scope.MachineID !=undefined && $rootScope.wise=="Datewise" && $scope.ShiftID != undefined){ 

$http({
    method:'GET',
    url:$rootScope.api_url_report+'api/v1/machines/reports_page?tenant_id='+$scope.tenant_id+'&start_date='+$scope.from_date+'&end_date='+$scope.to_date+'&machine_id='+$scope.MachineID+'&shift_id='+$scope.ShiftID+'&report_type='+ $rootScope.wise
  })
  .then(function(response){
    $scope.myLoader = false;
   $scope.items = response.data; 
 $scope.isdisabled=false;
    })
}else if($scope.MachineID !=undefined && $rootScope.wise=="Datewise" && $scope.ShiftID == undefined){ 
$http({
    method:'GET',
    url:$rootScope.api_url_report+'api/v1/machines/reports_page?tenant_id='+$scope.tenant_id+'&start_date='+$scope.from_date+'&end_date='+$scope.to_date+'&machine_id='+$scope.MachineID+'&report_type='+ $rootScope.wise
  })
  .then(function(response){
    $scope.myLoader = false;
   $scope.items = response.data; 
 $scope.isdisabled=false;
    })
}



//oop
if($scope.MachineID ==undefined && $rootScope.wise=="Operatorwise" && $scope.operator_id == undefined){
 
$http({
    method:'GET',
    url:$rootScope.api_url_report+'api/v1/machines/reports_page?tenant_id='+$scope.tenant_id+'&start_date='+$scope.from_date+'&end_date='+$scope.to_date+'&report_type='+ $rootScope.wise
  }).then(function(response){
  $scope.myLoader = false;
   $scope.items = response.data;
   console.log($scope.items); 
   $scope.isdisabled=false;
    })

}else if($scope.MachineID ==undefined && $rootScope.wise=="Operatorwise" && $scope.operator_id != undefined){

$http({
    method:'GET',
    url:$rootScope.api_url_report+'api/v1/machines/reports_page?tenant_id='+$scope.tenant_id+'&start_date='+$scope.from_date+'&end_date='+$scope.to_date+'&operator_id='+$scope.operator_id+'&report_type='+ $rootScope.wise
  }).then(function(response){
  $scope.myLoader = false;
   $scope.items = response.data;
   console.log($scope.items); 
   $scope.isdisabled=false;
    })
}else if($scope.MachineID !=undefined && $rootScope.wise=="Operatorwise" && $scope.operator_id != undefined){ 

$http({
    method:'GET',
    url:$rootScope.api_url_report+'api/v1/machines/reports_page?tenant_id='+$scope.tenant_id+'&start_date='+$scope.from_date+'&end_date='+$scope.to_date+'&machine_id='+$scope.MachineID+'&operator_id='+$scope.operator_id+'&report_type='+ $rootScope.wise
  })
  .then(function(response){
    $scope.myLoader = false;
   $scope.items = response.data; 
 $scope.isdisabled=false;
    })
}else if($scope.MachineID !=undefined && $rootScope.wise=="Operatorwise" && $scope.operator_id == undefined){ 
$http({
    method:'GET',
    url:$rootScope.api_url_report+'api/v1/machines/reports_page?tenant_id='+$scope.tenant_id+'&start_date='+$scope.from_date+'&end_date='+$scope.to_date+'&machine_id='+$scope.MachineID+'&report_type='+ $rootScope.wise
  })
  .then(function(response){
    $scope.myLoader = false;
   $scope.items = response.data; 
 $scope.isdisabled=false;
    })
}

}

/* -----------------end ------*/

$scope.generate_report1=function(gd,opid){
  $scope.operator_id=opid;
if($rootScope.wise == 'Operatorwise' && $scope.operator_id==undefined){
  alert("please select operator")
  return;
}

  console.log(gd);
 $scope.myLoader = true;
  $scope.isdisabled=true;
//alert($scope.operator_id);
 if($scope.MachineID ==undefined && $scope.operator_id != null){

 
$http({
    method:'GET',
    url:$rootScope.api_url_report+'api/v1/machines/reports_page?tenant_id='+$scope.tenant_id+'&start_date='+$scope.from_date+'&end_date='+$scope.to_date+'&report_type='+ $rootScope.wise+'&operator_id='+$scope.operator_id
  }).then(function(response){
  $scope.myLoader = false;
   $scope.items = response.data;
   console.log($scope.items); 
   $scope.isdisabled=false;
    })

}else if($scope.MachineID !=undefined && $scope.operator_id != null){
   
$http({
    method:'GET',
    url:$rootScope.api_url_report+'api/v1/machines/reports_page?tenant_id='+$scope.tenant_id+'&start_date='+$scope.from_date+'&end_date='+$scope.to_date+'&report_type='+ $rootScope.wise+'&operator_id='+$scope.operator_id
  }).then(function(response){
  $scope.myLoader = false;
   $scope.items = response.data;
   console.log($scope.items); 
   $scope.isdisabled=false;
    })
}else if ($scope.MachineID ==undefined && $scope.ShiftID !=undefined){

 $http({
    method:'GET',
    url:$rootScope.api_url_report+'api/v1/machines/reports_page?tenant_id='+$scope.tenant_id+'&start_date='+$scope.from_date+'&end_date='+$scope.to_date+'&shift_id='+$scope.ShiftID+'&report_type='+ $rootScope.wise
  }).then(function(response){
  $scope.myLoader = false;
   $scope.items = response.data;
   console.log($scope.items); 
   $scope.isdisabled=false;
    })
}
else if($scope.MachineID != undefined && $scope.ShiftID == undefined){

$http({
    method:'GET',
    url:$rootScope.api_url_report+'api/v1/machines/reports_page?tenant_id='+$scope.tenant_id+'&start_date='+$scope.from_date+'&end_date='+$scope.to_date+'&machine_id='+$scope.MachineID+'&report_type='+ $rootScope.wise
  })
  .then(function(response){
    $scope.myLoader = false;
   $scope.items = response.data; 
 $scope.isdisabled=false;
    })}
else if($scope.MachineID == undefined && $scope.ShiftID == undefined){
 
$http({
    method:'GET',
    url:$rootScope.api_url_report+'api/v1/machines/reports_page?tenant_id='+$scope.tenant_id+'&start_date='+$scope.from_date+'&end_date='+$scope.to_date+'&report_type='+ $rootScope.wise
  })
  .then(function(response){
    $scope.myLoader = false;
   $scope.items = response.data; 
 $scope.isdisabled=false;
    })
}
else{
  
$http({
    method:'GET',
    url:$rootScope.api_url_report+'api/v1/machines/reports_page?tenant_id='+$scope.tenant_id+'&start_date='+$scope.from_date+'&end_date='+$scope.to_date+'&machine_id='+$scope.MachineID+'&shift_id='+$scope.ShiftID+'&report_type='+ $rootScope.wise
  })
  .then(function(response){
    $scope.myLoader = false;
   $scope.items = response.data; 
 $scope.isdisabled=false;
    })

}

};





                 
                $http({
                method:'GET',
                url:$rootScope.api_url+'api/v1/machines?tenant_id='+$scope.tenant_id
                })
                .then(function(response){
                $rootScope.allmachines = response.data;    
                })

                $http({
                method:'GET',
                url:$rootScope.api_url+'api/v1/cncjobs?tenant_id='+$scope.tenant_id
                })
                .then(function(response){
                $rootScope.alljobs = response.data; 
                })

                $http({
                method:'GET',
                url:$rootScope.api_url+'api/v1/shifts?tenant_id='+$scope.tenant_id
                })
                .then(function(response){
                $scope.shiftdetailfordrop= response.data; 

                $http({
                method:'GET',
                url:$rootScope.api_url+'api/v1/shifttransactions?shift_id='+ $scope.shiftdetailfordrop.id
                })
                .then(function(response){
                $rootScope.shiftstransfordrop = response.data; 

                })
})
}]);
