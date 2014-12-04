'use strict';

var appControllers = angular.module('appControllers', ['ui.bootstrap']);

appControllers.controller(
    'AppCtrl',
    [
        '$scope',
        '$http',
        '$location',
        function ($scope, $http, $location) {
        	$scope.user = null;
        	$http.get('/api/1.0/user/is_loggedin').success(function(data) {
        		$scope.authenticated = data.authenticated;
        		$scope.user = data;
        	});


        }
    ]
);
