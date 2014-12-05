'use strict';


var conferencesControllers = angular.module('conferencesControllers', ['ui.bootstrap',  'ngCookies']);

conferencesControllers.controller(
  'ConferencesListCtrl',
  [
  '$scope',
  '$http',
  '$location',
  '$cookies',
  function ($scope, $http, $location, $cookies) {

    $scope.countries = [];
    $scope.items = [];
    $scope.searchQuery = "";


    $http.get('/api/1.0/conferences').success(function (items) {
      $scope.items = items;
    });


    $http.get('/api/1.0/types/countries?type=conferences').success(function (items) {
      $scope.countries = items;
      $scope.countries.unshift( {  "name" : "All Countries"  }  );
    });

    $scope.search = function () {

      var queryString = "";

      if ($scope.advanced) {

        if ($scope.country != undefined && $scope.country != "All Countries" ) {
          queryString = "country="+ $scope.country;
        }

      }


     if ($scope.searchQuery.length === 0) {
        $http.get('/api/1.0/conferences?'+ queryString ).success(function (items) {
          $scope.items = items;
        });
      }
      else {
        $http.get('/api/1.0/conferences/search?q='+ $scope.searchQuery +"&"+ queryString ).success(function (items) {
          $scope.items = items;
        });
      }
    };

  }
  ]
);

conferencesControllers.controller(
  'ConferencesDetailCtrl',
  [
  '$scope',
  '$http',
  '$routeParams',
  '$modal',
  '$log',
  function ($scope, $http, $routeParams, $modal, $log) {
    $scope.conference = null;
    $scope.editedComment = {
      attended : false,
      spoke_there: false,
      should_sponsor: false,
      should_speak: false
    };


    if ($routeParams.id ) {
      $http.get('/api/1.0/conferences/'+ $routeParams.id).success(function (item) {
        console.log(item);
        $scope.conference = item
      });
    }


    $scope.open = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'commentModalForm.html',
        controller: 'ModalCommentFormCtrl',
        size: size,
        resolve: {
          editedComment: function () {
            return $scope.editedComment;
          }
        }
      });

      modalInstance.result.then(function (editedComment) {
        $scope.editedComment = editedComment;

        // add new comment to the conference
        $http.put('/api/1.0/conferences/comment/'+ $scope.conference._id , $scope.editedComment ).success(function (data) {

          console.log(data);
          if (data != undefined) {
            if ($scope.conference.comments == undefined) {
              $scope.conference.comments = [];
            }
            $scope.conference.comments.unshift( data  );
            $scope.conference.nb_of_comments = $scope.nb_of_comments + 1;
            $scope.conference.total_votes = $scope.total_votes + data.vote;
          }
        });


      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.saveComment = function() {
    }


    $scope.range = function(n){
      return new Array(n);
    }

  }
  ]
);


conferencesControllers.controller(
  'ModalCommentFormCtrl',
  [
  '$scope',
  '$modalInstance',
  'editedComment',
  function($scope, $modalInstance, editedComment ) {

    // TODO :move vote options as dblist
    $scope.vote_options = [
    { value : 5 , label : "The place to be! Cannot miss it!"},
    { value : 4 , label : "Very nice, we should be there."},
    { value : 3 , label : "We can try, it is ok if we miss it."},
    { value : 2 , label : "Only if we are invited"},
    { value : 1 , label : "Only if we are invited, and they pay us!"},
    { value : 0 , label : "No interest!"}
    ];


    $scope.editedComment = editedComment;



    $scope.ok = function () {
      $modalInstance.close($scope.editedComment);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  }
  ]
);


conferencesControllers.controller(
  'ConferencesCreateCtrl',
  [
  '$scope',
  '$http',
  '$routeParams',
  '$location',
  function ($scope, $http, $routeParams, $location) {

    $scope.entry = {};
    $scope.countries = [];

    if ($routeParams.id ) {
      $http.get('/api/1.0/conferences/'+ $routeParams.id +"?get_comments=false").success(function (item) {
        $scope.entry = item;
      });
    } 

    $http.get('/api/1.0/types/countries').success(function (items) {
      $scope.countries = items;
    });
    $http.get('/api/1.0/speakers/').success(function (items) {
      $scope.speakerList = items
    });

    //TODO : move regions as DB lists
    $scope.regions = ["AMERICAS", "APAC", "EMEA", "LATAM"];



    $scope.save = function() {
      if ( $scope.entry._id ) {
        $http.put('/api/1.0/conferences/'+ $scope.entry._id, $scope.entry ).success(function (data) {
          $location.path("/conferences/"+ data._id);
        });
      } else {
        $http.put('/api/1.0/conferences/', $scope.entry ).success(function (data) {
          $location.path("/conferences/"+ data._id);
        });
      }
    }
  }
  ]);
