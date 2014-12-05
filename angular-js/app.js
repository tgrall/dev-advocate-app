var mongodbWorkshopApp = angular.module('mongodbWorkshopApp', [
'ngCookies',
'ngRoute',
'activityControllers',
'conferencesControllers',
'adminControllers',
'appControllers',
'reportsControllers',
'mongodbWorkshopFilters'
]);


mongodbWorkshopApp.config(['$routeProvider',
function ($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'partials/home.html'
  }).
  when('/activity', {
    templateUrl: 'partials/activity-list.html',
    controller: 'ActivityListCtrl'
  }).
  when('/activity/create', {
    templateUrl: 'partials/activity-create.html',
    controller: 'ActivityCreateCtrl'
  }).
  when('/activity/:id', {
    templateUrl: 'partials/activity-details.html',
    controller: 'ActivityDetailsCtrl'
  }).
  when('/activity/:id/edit', {
    templateUrl: 'partials/activity-create.html',
    controller: 'ActivityCreateCtrl'
  }).
  when('/conferences', {
    templateUrl: 'partials/conferences-list.html',
    controller: 'ConferencesListCtrl'
  }).
  when('/conferences/create', {
    templateUrl: 'partials/conferences-create.html',
    controller: 'ConferencesCreateCtrl'
  }).
  when('/conferences/:id', {
    templateUrl: 'partials/conferences-details.html',
    controller: 'ConferencesDetailCtrl'
  }).
  when('/conferences/:id/edit', {
    templateUrl: 'partials/conferences-create.html',
    controller: 'ConferencesCreateCtrl'
  }).
  when('/reports', {
    templateUrl: 'partials/reports.html',
    controller: 'reportsSearchCtrl'
  }).
  when('/reports/:reportId', {
    templateUrl: 'partials/reports-details.html',
    controller: 'reportsDetailsCtrl'
  }).
  when('/admin/activity_types', {
    templateUrl: 'partials/admin/activity-type-form.html',
    controller: 'ActivityTypesFormCtrl'
  }).
  when('/admin/', {
      templateUrl: 'partials/admin.html',
      controller: 'AdminCtrl'
  }).
  otherwise({
    redirectTo: '/'
  });
}]);
