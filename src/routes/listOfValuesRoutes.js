'use strict';


var ListOfValuesRoutes = function(listOfValuesService) {


  var _getAllActivities = function(req, res) {
    listOfValuesService.getAllActivities( function(items){
      res.status(200).send(items);
    });
  }

  var _getCountries = function(req, res) {
    var collectionName = req.query.type;
    if (collectionName == undefined ) {
      collectionName = "countries";
    }
    listOfValuesService.getCountries(collectionName, function(items){
      res.status(200).send(items);
    });
  }

  var _getAllTechnologies = function(req, res) {
    listOfValuesService.getAllTechnologies( function(items){
      res.status(200).send(items);
    });
  }

  var _getAllTopics = function(req, res) {
    listOfValuesService.getAllTopics( function(items){
      res.status(200).send(items);
    });
  }

  var _getAllLinkTypes = function(req, res) {
    listOfValuesService.getAllLinkTypes( function(items){
      res.status(200).send(items);
    });
  }

  var _getAllPaperStatus = function(req, res) {
    listOfValuesService.getAllPaperStatus( function(items){
      res.status(200).send(items);
    });
  }

  var _isAuthenticated = function(req, res) {
    if ( req.isAuthenticated() ) {
      var user = {
        id : req.user.id,
        displayName : req.user.displayName,
        name : req.user.userName,
        photo : req.user.photo,
        authenticated : true
      }
      res.status(200).send(  user  );

    } else {
      res.status(200).send(  { authenticated : false }  );
    }

  }

  return {
    getAllActivities : _getAllActivities,
    getCountries : _getCountries,
    getAllTechnologies : _getAllTechnologies,
    getAllTopics : _getAllTopics,
    getAllLinkTypes : _getAllLinkTypes,
    getAllPaperStatus: _getAllPaperStatus,
    isAuthenticated : _isAuthenticated
  }

}

module.exports = ListOfValuesRoutes;
