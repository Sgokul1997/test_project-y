'use strict';

angular.module('faq_question', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/faq_question', {
            templateUrl: 'faq_question/faq_question.html',
            controller: 'faq_questionCtrl'
        });
    }])

    .controller('faq_questionCtrl', function ($scope, $http, $location, $window, $rootScope) {

	

    })