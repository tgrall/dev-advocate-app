var activityControllers = angular.module('activityControllers', ['ui.bootstrap',  'ngCookies', 'activity.utils']);

activityControllers.controller(
  'ActivityListCtrl',
  [
  '$scope',
  '$http',
  '$location',
  '$cookies',
  function ($scope, $http, $location, $cookies) {

    $http.get('/api/1.0/activity').success(function (items) {
      $scope.items = items;
    });


  }
  ]
);

activityControllers.controller(
  'ActivityDetailsCtrl',
  [
  '$scope',
  '$http',
  '$routeParams',
  function ($scope, $http, $routeParams) {
    $scope.activity = null;
    if ($routeParams.id ) {
      $http.get('/api/1.0/activity/'+ $routeParams.id).success(function (item) {
        $scope.activity = item
      });
    }



  }
  ]
);

activityControllers.controller(
  'ActivityCreateCtrl',
  [
  '$scope',
  '$http',
  '$location',
  '$routeParams',
  function ($scope, $http, $location, $routeParams) {

    $scope.typesActivity = null;
    $scope.speakerList = null;
    $scope.speakers = [{}];


    $http.get('/api/1.0/speakers/').success(function (items) {
      $scope.speakerList = items
    });

    $http.get('/api/1.0/types/activity').success(function (items) {
      $scope.typesActivity = items;


    });


    $scope.speakingSource = ["CFP Accepted", "Invited to Speak", "Sales Proposal", "BBL", "Sponsored Speak"];
    $scope.regions = ["AMERICAS", "APAC", "EMEA", "LATAM"];


    if ($routeParams.id ) {
      $http.get('/api/1.0/activity/'+ $routeParams.id).success(function (item) {
        $scope.entry = item;
        $scope.speakers = [];

        console.log( $scope.entry.speakers);

        for (i in $scope.entry.speakers) {
          $scope.speakers.push( { "userName" : $scope.entry.speakers[i].speaker.userName }  );
        }

        //hack the type to use the _id

        $scope.entry.type = $scope.entry.type._id;

        // TODO : chek how to be able to select the object (not the id)
        //<select ng-model="entry.type" ng-options="(value.label +' ('+ value.type +')')  group by value.category for value in typesActivity " class="form-control" required>
        // vs
        //<select ng-model="entry.type" ng-options=" value._id as (value.label +' ('+ value.type +')')   group by value.category for value in typesActivity " class="form-control" required>


      });
    }


    $scope.addSpeaker = function($event){
      $scope.speakers.push({});
      $event.preventDefault();
    }


    $scope.addSession = function($event){
      if ($scope.talks == undefined) {
        $scope.talks = [];
      }
      $scope.talks.push({"talk_title":"", "talk_attendees" : 0});
      $event.preventDefault();
    }




    $scope.save = function() {

      // create variable?
      $scope.entry.type = getItemById( "_id" , $scope.entry.type, $scope.typesActivity );
      //get speaker profile
      for ( i in  $scope.speakers ) {
        $scope.speakers[i] = { "speaker" : getItemById( "userName" , $scope.speakers[i].userName, $scope.speakerList ) };
      }
      $scope.entry.speakers = $scope.speakers;

      // set sessions
      if ( $scope.talks != undefined && $scope.talks.length != 0 ) {
        $scope.entry.talks = $scope.talks;
      }

      if ( $scope.entry._id ) {
        $http.put('/api/1.0/activity/'+ $scope.entry._id, $scope.entry ).success(function (data) {
          $location.path("/activity/"+ data._id);
        });
      } else {
        $http.put('/api/1.0/activity/', $scope.entry ).success(function (data) {
          $location.path("/activity/"+ data._id);
        });
      }
    }
  }
  ]);
