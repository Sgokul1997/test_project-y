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
        $scope.myLoader = false;

                                                                              //chart2
        $http({
            method: 'GET',
            url: $rootScope.api_url_report + 'api/v1/hour_parts_count_chart?machine_id='+$scope.MachineID+'&shift_id='+$scope.ShiftID+'&tenant_id='+$scope.tenant_id+'&date='+$scope.from_date
          })
          .then(function (response) {
            $scope.myLoader = false;
            $scope.hour_parts = response.data;
           console.log( $scope.hour_parts);
          

    Highcharts.chart('partwithhour', {
      chart: {
        type: 'bar'
    },
    title: {
        text: 'Parts Count with Hour'
    },
    xAxis: {
        categories: $scope.hour_parts.time
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total fruit consumption'
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
    series: [{
        name: 'Parts Count',
        data: $scope.hour_parts.parts_count
    }]
  });
          })


                                                                            //chart1

        $http({
            method: 'GET',
            url: $rootScope.api_url_report + 'api/v1/all_cycle_time_chart?machine_id='+$scope.MachineID+'&shift_id='+$scope.ShiftID+'&tenant_id='+$scope.tenant_id+'&date='+$scope.from_date
          })
          .then(function (response) {
            $scope.myLoader = false;                                                                     
        $scope.allcycletime=response.data;

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
            categories: $scope.allcycletime.parts_count,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Time (min)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} sec</b></td></tr>',
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
        colors: ['#d9534f'],
        series: [{
            name: 'Cycle Time',
            data:$scope.allcycletime.time
    
        }]
    })
  })


  //chart3
  $http({
    method: 'GET',
    url: $rootScope.api_url_report + 'api/v1/hour_machine_status_chart?machine_id='+$scope.MachineID+'&shift_id='+$scope.ShiftID+'&tenant_id='+$scope.tenant_id+'&date='+$scope.from_date
  })
  .then(function (response) {
    $scope.myLoader = false;  
    $scope.hourwisemachine=response.data;

    Highcharts.chart('hourwise', {
      chart: {
        type: 'bar'
    },
    title: {
        text: 'Time'
    },
    xAxis: {
        categories: $scope.hourwisemachine.time
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total fruit consumption'
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
    series: [{
        name: 'Stop',
        data: $scope.hourwisemachine.stop_time
    }, {
        name: 'Idle',
        data: $scope.hourwisemachine.idle_time    
    }, {
        name: 'Run',
        data: $scope.hourwisemachine.run_time
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

Highcharts.chart('utilization', {
  chart: {
    type: 'bar'
},
title: {
    text: 'Utilization'
},
xAxis: {
    categories: $scope.hourutilization.time
},
yAxis: {
    min: 0,
    title: {
        text: 'Total fruit consumption'
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
        // dataLabels: {
        //     enabled: true,
        //     color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
        // }
    }
     
},
colors: ['#ec5550','#e8a249','#2cbe63'],
series: [{
    name: 'John',
    data: $scope.hourutilization.stop_time
}, {
    name: 'Jane',
    data: $scope.hourutilization.idle_time
}, {
    name: 'Joe',
    data: $scope.hourutilization.run_time
}]
})

  })
  }
});


  