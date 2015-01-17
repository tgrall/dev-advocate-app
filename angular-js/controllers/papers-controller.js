'use strict';


var papersControllers = angular.module('papersControllers', ['ui.bootstrap',  'ngCookies']);

papersControllers.controller(
  'PapersListCtrl',
  [
  '$scope',
  '$http',
  '$location',
  '$cookies',
  function ($scope, $http, $location, $cookies) {

    $scope.items = [];
    $scope.technologies = [];
    $scope.technology = "All";
    $scope.topics = [];
    $scope.topic = "All";
    $scope.searchQuery = "";



    // TODO ; see how to do a better job with this
    var buildQueryParameter = function(technology , topic) {
      var returnValue = "";
      if (technology != "All") {
        returnValue = "technology="+ technology;
      }
      if (topic != "All") {
        if (returnValue == "") {
          returnValue = returnValue + "&"
        }
        returnValue = "topic="+ topic;
      }
      return returnValue;
    }

    $http.get('/api/1.0/types/technologies').success(function (items) {
      $scope.technologies = items
      $scope.technologies.unshift( {  "_id" : "All"  }  );
      $scope.technology = "All";
    });

    $http.get('/api/1.0/types/topics').success(function (items) {
      $scope.topics = items
      $scope.topics.unshift( {  "_id" : "All"  }  );
    });


    $http.get('/api/1.0/papers').success(function (items) {
      $scope.items = items;
    });

    $scope.selectTopic = function(topic){
      $scope.topic = topic;
      $scope.advanced = true;
      $scope.search();
    }
    $scope.selectTechnology = function(technology){
      $scope.technology = technology;
      $scope.advanced = true;
      $scope.search();
    }


    $scope.search = function () {
      var query = "";
      if ($scope.topic != undefined && $scope.topic != "All") {
        query = "topic="+ $scope.topic;
      }
      if ($scope.technology != undefined && $scope.technology != "All") {
        if (query != "") {
          query = query + "&";
        }
        query = query + "technology="+ $scope.technology;
      }
      if (query == undefined) {
        query = "";
      }


      if ($scope.searchQuery.length === 0) {
        $http.get('/api/1.0/papers?'+ query).success(function (items) {
          $scope.items = items;
        });
      }
      else {
        $http.get('/api/1.0/papers/search?q='+ $scope.searchQuery +"&"+ query ).success(function (items) {
          $scope.items = items;
        });
      }

    };



  }
  ]
);

papersControllers.controller(
  'PapersDetailCtrl',
  [
  '$scope',
  '$http',
  '$routeParams',
  '$window',
  '$modal',
  '$log',
  function ($scope, $http, $routeParams, $window, $modal, $log) {

    $scope.conferences = [];
    $scope.submitted_at = [];


    if ($routeParams.id ) {
      $http.get('/api/1.0/papers/'+ $routeParams.id).success(function (item) {
        $scope.paper = item;
      });
    }


    // open model window
    $scope.open = function (size) {

      // if no year, select by default current year
      // TODO : put next year if last quarter
      $scope.editedSubmission.year = new Date().getFullYear();
      // TODO : should be dynamic
      $scope.editedSubmission.status = "Submitted";

      var modalInstance = $modal.open({
        templateUrl: 'submissionModalForm.html',
        controller: 'ModalSubmissionFormCtrl',
        size: size,
        resolve: {
          editedSubmission: function () {
            return $scope.editedSubmission;
          }
        }
      });

      modalInstance.result.then(function (editedSubmission) {
        $scope.editedSubmission = editedSubmission;

        if ( editedSubmission.id ) {

          // copy the data / if not only updated fields are sent
          var commentToUpdate = {
            comment: editedSubmission.comment,
            attended: editedSubmission.attended,
            spoke_there: editedSubmission.spoke_there,
            should_speak: editedSubmission.should_speak,
            should_sponsor: editedSubmission.should_sponsor,
            vote: editedSubmission.vote
          };

          // $http.put('/api/1.0/conferences/comment/'+ $scope.conference._id +"/"+  $scope.editedSubmission.id  , commentToUpdate ).success(function (data) {
          //   // for simplicity reason refresh page
          //   $window.location.reload();
          // });

        } else {


          var submissionInfo = {};
          submissionInfo.conf_id = editedSubmission.conference._id;
          submissionInfo.conf_name = editedSubmission.conference.name;
          submissionInfo.year = editedSubmission.year;
          submissionInfo.status = editedSubmission.status;

          // add new comment to the conference
          $http.put('/api/1.0/papers/submission/'+ $scope.paper._id , submissionInfo ).success(function (data) {
            if (data != undefined) {
              if ($scope.paper.submissions == undefined) {
                $scope.paper.submissions = [];
              }
              $scope.paper.submissions.unshift( data  );
            }
          });


        }

      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.editComment = function(index) {
      indexOfeditedSubmission = index;
      // copy object to controle save
      var submissionToEdit =  Object.create($scope.conference.comments[index]);
      $scope.editedSubmission = submissionToEdit;
      $scope.open();
    }

    $scope.addSubmission = function() {
      var submissionToEdit =  {};
      $scope.editedSubmission = submissionToEdit;
      $scope.open();
    }


  }
  ]
);

papersControllers.controller(
  'ModalSubmissionFormCtrl',
  [
  '$scope',
  '$http',
  '$modalInstance',
  'editedSubmission',
  function($scope, $http, $modalInstance, editedSubmission ) {

    $scope.conferences = [];
    $scope.paperStatus = [];
    $scope.authorList = [{}];

    $http.get('/api/1.0/types/paper_status').success(function (items) {
      $scope.paperStatus = items;
    });

    $http.get('/api/1.0/speakers/').success(function (items) {
      $scope.authorList = items
    });


    // TODO : see if we can load that only once
    $http.get('/api/1.0/conferences?get_comments=false').success(function (items) {
      $scope.conferences = items;
    });

    $scope.editedSubmission = editedSubmission;
    $scope.ok = function () {
          $modalInstance.close($scope.editedSubmission);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
  ]
);

papersControllers.controller(
  'PapersCreateCtrl',
  [
  '$scope',
  '$http',
  '$routeParams',
  '$location',
  function ($scope, $http, $routeParams, $location) {

    $scope.entry = {};
    $scope.technologies = [];
    $scope.topics = [];
    $scope.authorList = null;
    $scope.links = [];
    $scope.linkTypes = [];

    $http.get('/api/1.0/types/links').success(function (items) {
      $scope.linkTypes = items
    });


    $http.get('/api/1.0/types/technologies').success(function (items) {
      $scope.technologies = items
    });

    $http.get('/api/1.0/types/topics').success(function (items) {
      $scope.topics = items
    });

    // load paper
    if ($routeParams.id ) {
      $http.get('/api/1.0/papers/'+ $routeParams.id).success(function (item) {
        $scope.entry = item;
        $scope.authors = [];
        for (var i in $scope.entry.authors) {
          $scope.authors.push( { "userName" : $scope.entry.authors[i].author.userName }  );
        }
        for (var i in $scope.entry.links) {
          $scope.links.push(  $scope.entry.links[i]  );
        }


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
    } else {
      // create, so set the author to the current user
      $scope.authors = [{ "userName" : $scope.user.name }];

    }


    $scope.addAuthor = function($event){
      $scope.authors.push({});
      $event.preventDefault();
    }

    $scope.addLink = function($event){
      if ($scope.links == undefined) {
        $scope.links = [];
      }
      $scope.links.push({"type":"", "url" : ""});
      $event.preventDefault();
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

      //get author profile
      for (var i in  $scope.authors ) {
        $scope.authors[i] = { "author" : getItemById( "userName" , $scope.authors[i].userName, $scope.authorList ) };
      }
      $scope.entry.authors = $scope.authors;

      // set links
      $scope.entry.links = [];
      if ( $scope.links != undefined && $scope.links.length != 0 ) {
        $scope.entry.links = $scope.links;
      }


      if ( $scope.entry._id ) {
        $http.put('/api/1.0/papers/'+ $scope.entry._id, $scope.entry ).success(function (data) {
          $location.path("/papers/"+ data._id);
        });
      } else {
        $http.put('/api/1.0/papers/', $scope.entry ).success(function (data) {
          $location.path("/papers/"+ data._id);
        });
      }
    }

    $scope.cancel = function() {
      if ( $scope.entry._id ) {
        $location.path("/papers/"+ $scope.entry._id);
      } else {
        $location.path("/papers/");
      }
    }



  }
  ]);
