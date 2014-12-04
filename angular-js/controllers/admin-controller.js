var adminControllers = angular.module('adminControllers', ['ui.bootstrap']);

adminControllers.controller(
  'AdminCtrl',
  [
  '$scope',
  '$http',
  '$location',
  function ($scope, $http, $location) {

    $http.get('/api/1.0/types/activity').success(function (items) {
      $scope.typesActivity = items
    });

  }
  ]
);


adminControllers.controller(
  'ActivityTypesFormCtrl',
  [
  '$scope',
  '$http',
  '$location',
  function ($scope, $http, $location) {

    $http.get('/api/1.0/types/activity').success(function (items) {
      $scope.typesActivity = items
    });

  }
  ]
);
