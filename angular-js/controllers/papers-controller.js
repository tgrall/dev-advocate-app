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

    if ($routeParams.id ) {
      $http.get('/api/1.0/papers/'+ $routeParams.id).success(function (item) {
        $scope.paper = item;
      });
    }


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
    $scope.authors = [{}];
    $scope.links = [];
    $scope.linkTypes = [];
    $scope.paperStatus = [];

    $http.get('/api/1.0/types/links').success(function (items) {
      $scope.linkTypes = items
    });

    $http.get('/api/1.0/types/paper_status').success(function (items) {
      $scope.paperStatus = items
    });

    $http.get('/api/1.0/speakers/').success(function (items) {
      $scope.authorList = items
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
