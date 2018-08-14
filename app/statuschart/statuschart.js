'use strict';

angular.module('statuschart', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/statuschart', {
      templateUrl: 'statuschart/statuschart.html',
      controller: 'StatuschartCtrl'
    });
  }])

  .controller('StatuschartCtrl',function ($scope, $http, $location, $window, $rootScope, $timeout, $interval,$filter) {


    $scope.MachineID;
  $scope.ShiftID;
  $scope.from_date;
  //$scope.tenant_id = localStorage.getItem("tenant_id");

  $scope.momentToday= moment(new Date()).format("YYYY-MM-DD");
  $scope.momentToday1=moment().subtract(1, 'day').format("YYYY-MM-DD");


    $http({
        method: 'GET',
        url: $rootScope.api_url + 'api/v1/machines?tenant_id=' + $scope.tenant_id
      })
      .then(function (response) {
        $rootScope.allmachines = response.data;
      })


      $http({
        method: 'GET',
        url: $rootScope.api_url + 'api/v1/shifts?tenant_id=' + $scope.tenant_id
      })
      .then(function (response) {
        $scope.shiftdetailfordrop = response.data;
  
        $http({
            method: 'GET',
            url: $rootScope.api_url + 'api/v1/shifttransactions?shift_id=' + $scope.shiftdetailfordrop.id
          })
          .then(function (response) {
            $rootScope.shiftstransfordrop = response.data;
  
          })
      })

    






      $scope.viewData=function(){
        $scope.myLoader = true;


                                                                           //chart1

        $http({
            method: 'GET',
            url: $rootScope.api_url_report + 'api/v1/all_cycle_time_chart?machine_id='+$scope.MachineID+'&shift_id='+$scope.ShiftID+'&tenant_id='+$scope.tenant_id+'&date='+$scope.from_date
          })
          .then(function (response) {
            $scope.myLoader = false;                                                                     
        $scope.allcycletime=response.data;
      $scope.parts=[];
      $scope.c_time=[];
      $scope.pro_number=[];
        for(var i in $scope.allcycletime){

            var part= i*1 + 1;
            $scope.parts.push(part);
            if($scope.allcycletime[i].cycle_time != 0){ 
                console.log($scope.allcycletime[i].cycle_time);
           
            var cycle=$scope.allcycletime[i].cycle_time / 60 ;
            //var cycle=Math.round(cycle1);
            var pro_number=$scope.allcycletime[i].program_number;
            $scope.c_time.push(cycle);
            $scope.pro_number.push(pro_number);
           
        }else{
            var part= i*1 - 1;
          //  $scope.parts.splice(i,1);
        }
        }
        console.log($scope.parts);

      Highcharts.chart('partcycle', {
        chart: {
          renderTo: 'container',
          type: 'column',
          options3d: {
              enabled: true,
              alpha: 15,
              beta: 15,
              depth: 50,
              viewDistance: 25
          }
        },
        title: {
            text: 'Cycle Time'
        },
       
        xAxis: {
           
            categories: $scope.parts,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Time (min)'
            }
        },
        tooltip: {
            headerFormat: '',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} Min</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        credits: {
            enabled: false
        },      
        colors: ['#f58632'],
        series: [{
            name: 'Cycle Time',
            data:$scope.c_time
    
        }]
    })
  })


                                                                              //chart2
        $http({
            method: 'GET',
            url: $rootScope.api_url_report + 'api/v1/hour_parts_count_chart?machine_id='+$scope.MachineID+'&shift_id='+$scope.ShiftID+'&tenant_id='+$scope.tenant_id+'&date='+$scope.from_date
          })
          .then(function (response) {
            $scope.myLoader = false;
            $scope.hour_parts = response.data;
          // console.log( $scope.hour_parts);
          

    Highcharts.chart('partwithhour', {
      chart: {
        type: 'bar'
    },
    title: {
        text: 'Hour wise parts count'
    },
    xAxis: {
        categories: $scope.hour_parts.time.reverse()
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }, stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            }
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal',
            dataLabels: {
                enabled: true,
                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
            }
        }
         
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Parts Count',
        data: $scope.hour_parts.parts_count.reverse()
    }]
  });
          })


         

  //chart3
  $http({
    method: 'GET',
    url: $rootScope.api_url_report + 'api/v1/hour_machine_status_chart?machine_id='+$scope.MachineID+'&shift_id='+$scope.ShiftID+'&tenant_id='+$scope.tenant_id+'&date='+$scope.from_date
  })
  .then(function (response) {
    $scope.myLoader = false;  
    $scope.hourwisemachine=response.data;
    console.log( $scope.hourwisemachine.run_time);
    $scope.runarry=[];
    for(var data in $scope.hourwisemachine.run_time){
     var ss1=$scope.hourwisemachine.run_time[data] / 60;
     var ss=Math.round(ss1);
     $scope.runarry.push(ss);
    }
    

    $scope.idlearry=[];
    for(var data in $scope.hourwisemachine.idle_time){
     var ss1=$scope.hourwisemachine.idle_time[data] / 60;
     var ss=Math.round(ss1);
     $scope.idlearry.push(ss);
    }
   

    $scope.stoparry=[];
    for(var data in $scope.hourwisemachine.stop_time){
     var ss1=$scope.hourwisemachine.stop_time[data] / 60;
     var ss=Math.round(ss1);
     $scope.stoparry.push(ss);
    }
  


    Highcharts.chart('hourwise', {
      chart: {
        type: 'bar'
    },
    title: {
        text: 'Machine Status'
    },
    xAxis: {
        categories: $scope.hourwisemachine.time.reverse()
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }, stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            }
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal',
            dataLabels: {
                enabled: true,
                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
            }
        }
         
    },
    colors: ['#ec5550','#e8a249','#2cbe63'],
    credits: {
        enabled: false
    },  
    series: [{
        name: 'Stop',
        data: $scope.stoparry.reverse()
    }, {
        name: 'Idle',
        data: $scope.idlearry.reverse()    
    }, {
        name: 'Run',
        data: $scope.runarry.reverse()
    }]
  });
  

  })
      

      

     
  

                                                                 //chart4

  $http({
    method: 'GET',
    url: $rootScope.api_url_report + 'api/v1/hour_machine_utliz_chart?machine_id='+$scope.MachineID+'&shift_id='+$scope.ShiftID+'&tenant_id='+$scope.tenant_id+'&date='+$scope.from_date
  })
  .then(function (response) {
    $scope.myLoader = false;  
    $scope.hourutilization=response.data;

    $scope.runarryul=[];
    for(var data in $scope.hourutilization.run_time){
     var ss1=$scope.hourutilization.run_time[data];
     var ss=Math.round(ss1);
     $scope.runarryul.push(ss);
    }
console.log($scope.runarryul);    

    $scope.idlearryul=[];
    for(var data in $scope.hourutilization.idle_time){
     var ss1=$scope.hourutilization.idle_time[data];
     var ss=Math.round(ss1);
     $scope.idlearryul.push(ss);
    }
   console.log($scope.idlearryul);

    $scope.stoparryul=[];
    for(var data in $scope.hourutilization.stop_time){
     var ss1=$scope.hourutilization.stop_time[data] ;
     var ss=Math.round(ss1);
     $scope.stoparryul.push(ss);
    }
    console.log($scope.stoparryul);

Highcharts.chart('utilization', {
  chart: {
    type: 'bar'
},
title: {
    text: 'Machine status with Utilization(%)'
},
xAxis: {
    categories: $scope.hourutilization.time.reverse()
},
yAxis: {
    min: 0,
    title: {
        text: ''
    }, stackLabels: {
        enabled: true,  
        style: {
            fontWeight: 'bold',
            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
        }
    }
},
legend: {
    reversed: true
},
plotOptions: {
    series: {
        stacking: 'normal',
        dataLabels: {
            enabled: true,
            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
        }
    }
     
},
colors: ['#ec5550','#e8a249','#2cbe63'],
credits: {
    enabled: false
},
series: [{
    name: 'Stop',
    data: $scope.stoparryul.reverse()
}, {
    name: 'idle',
    data: $scope.idlearryul.reverse()
}, {
    name: 'Run',
    data:  $scope.runarryul.reverse()
}]
})

  })
  }
});


  