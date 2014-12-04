'use strict';


var reportsControllers = angular.module('reportsControllers', ['ui.bootstrap']);

reportsControllers.controller(
    'reportsSearchCtrl',
    [
        '$scope',
        '$http',
        function ($scope, $http) {

          $scope.statsByRegionAndCategory = [];
          $scope.statsByCategory = [];
          $scope.statsBySpeaker = [];
          $scope.statsBySpeakerAndCategory = [];
          $scope.statsByRegion = [];

          $http.get('/api/1.0/stats/activity').success(function(items){
              $scope.statsByCategory = items;
          });

          $http.get('/api/1.0/stats/speaker/').success(function(items){
              $scope.statsBySpeaker = items;
          });

          $http.get('/api/1.0/stats/speaker/by_category').success(function(items){
              $scope.statsBySpeakerAndCategory = items;
          });

          $http.get('/api/1.0/stats/region/activity').success(function(items){
              $scope.statsByRegionAndCategory = items;
          });

          $http.get('/api/1.0/stats/region').success(function(items){
              $scope.statsByRegion = items;
          });

        }
    ]
);

activityControllers.controller(
    'reportsDetailsCtrl',
    [
        '$scope',
        '$http',
        '$routeParams',
        function ($scope, $http, $routeParams) {



        }
    ]
);
