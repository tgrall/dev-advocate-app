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

    // TODO : See what's the best alternative
    $scope.inTheFuture = function (theDate) {
      return  ( new Date(theDate) > new Date())  ;
    }
    $scope.range = function(n){
      if (n == undefined) {
        return 0;
      }

      return new Array( Math.round(n));
    }



  }
  ]
);

conferencesControllers.controller(
  'ConferencesDetailCtrl',
  [
  '$scope',
  '$http',
  '$routeParams',
  '$window',
  '$modal',
  '$log',
  function ($scope, $http, $routeParams, $window, $modal, $log) {

    var indexOfEditedComment = -1;

    $scope.avg_vote = null;
    $scope.conference = null;
    $scope.editedComment = {
      attended : false,
      spoke_there: false,
      should_sponsor: false,
      should_speak: false
    };


    if ($routeParams.id ) {
      $http.get('/api/1.0/conferences/'+ $routeParams.id).success(function (item) {
        $scope.conference = item;
        if ( item.nb_of_comments != null && item.nb_of_comments != 0  ) {
          $scope.avg_vote =  item.total_votes / item.nb_of_comments;
        }

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

        if ( editedComment.id ) {
          // copy the data / if not only updated fields are sent
          var commentToUpdate = {
            comment: editedComment.comment,
            attended: editedComment.attended,
            spoke_there: editedComment.spoke_there,
            should_speak: editedComment.should_speak,
            should_sponsor: editedComment.should_sponsor,
            vote: editedComment.vote
          };

          $http.put('/api/1.0/conferences/comment/'+ $scope.conference._id +"/"+  $scope.editedComment.id  , commentToUpdate ).success(function (data) {
            // for simplicity reason refresh page
            $window.location.reload();
          });

        } else {

          // add new comment to the conference
          $http.put('/api/1.0/conferences/comment/'+ $scope.conference._id , $scope.editedComment ).success(function (data) {
            if (data != undefined) {
              if ($scope.conference.comments == undefined) {
                $scope.conference.comments = [];
              }
              $scope.conference.comments.unshift( data  );
              $scope.conference.nb_of_comments = $scope.nb_of_comments + 1;
              $scope.conference.total_votes = $scope.total_votes + data.vote;
            }
          });


        }

      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.editComment = function(index) {
      indexOfEditedComment = index;
      // copy object to controle save
      var commentToEdit =  Object.create($scope.conference.comments[index]);
      $scope.editedComment = commentToEdit;
      $scope.open();
    }

    $scope.addComment = function() {
      var commentToEdit =  {};
      $scope.editedComment = commentToEdit;
      $scope.open();
    }


    $scope.range = function(n){
      if (n == undefined) {
        return 0;
      }
      return new Array( Math.round(n));
    }

    // TODO : See what's the best alternative
    $scope.inTheFuture = function (theDate) {
      return  ( new Date(theDate) > new Date())  ;
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
    $scope.technologies = [];
    $scope.topics = [];

    //TODO : move regions as DB lists
    $scope.regions = ["AMERICAS", "APAC", "EMEA", "LATAM"];

    // load lists
    $http.get('/api/1.0/types/countries').success(function (items) {
      $scope.countries = items;
    });

    $http.get('/api/1.0/types/technologies').success(function (items) {
      $scope.technologies = items
    });

    $http.get('/api/1.0/types/topics').success(function (items) {
      $scope.topics = items
    });


    // load conference
    if ($routeParams.id ) {
      $http.get('/api/1.0/conferences/'+ $routeParams.id +"?get_comments=false").success(function (item) {
        $scope.entry = item;
        $.each( $scope.technologies, function(index, technology){
          $.each($scope.entry.technologies, function(index, appTech) {
            if (appTech == technology._id) {
              technology.choose = true;
            }
          });
        } );

        $.each( $scope.topics, function(index, topic){
          $.each($scope.entry.topics, function(index, appTech) {
            if (appTech == topic._id) {
              topic.choose = true;
            }
          });
        } );


      });
    }


    $scope.updateTechnologies = function() {
      $scope.entry.technologies = [];
      $.each( $scope.technologies, function(index, technology){
        if (technology.choose) {
          $scope.entry.technologies.push(technology._id);
        }
      });
    }

    $scope.updateTopics = function() {
      $scope.entry.topics = [];
      $.each( $scope.topics, function(index, topic){
        if (topic.choose) {
          $scope.entry.topics.push(topic._id);
        }
      });
    }

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
