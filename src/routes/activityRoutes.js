'use strict';

var Util = require("../util/util.js");

var ActivityRoutes = function(activityService) {

  var util = new Util();

  var _get = function(req, res) {
    activityService.get( function(items){
      res.status(200).send(items);
    });
  }


  var _getById = function(req, res) {
    var id = req.params.id;
    activityService.getById(id, function(document){
      res.status(200).send(document);
    });
  }


  var _create = function(req, res) {
      var body = req.body;
      var user = req.user;
  		if (req.body.id == null) {
	  		req.body._id = util.convertToSlug( req.body.title );
			}
      activityService.create( body , function(result){
        res.status(201).send(result);
      });
  }

  var _update = function(req, res) {
    var body = req.body;
    var user = req.user;
    activityService.update(req.body._id, body , function(result){
      console.log(result);
      res.status(201).send(result);
    });
  }


  var _getStatsByRegionAndCategory = function(req, res) {
    var body = req.body;
    activityService.getStatsByRegionAndCategory( null , function(result){
      res.status(200).send(result);
    });
  }


  var _getStatsByCategory = function(req, res){
    var body = req.body;
    activityService.getStatsByCategory( null , function(result){
      res.status(200).send(result);
    });
  }

  var _getStatsBySpeaker = function(req, res){
    var body = req.body;
    activityService.getstatsBySpeaker( null , function(result){
      res.status(200).send(result);
    });
  }

  var _getStatsByRegion = function(req, res) {
    var body = req.body;
    activityService.getStatsByRegion( null , function(result){
      res.status(200).send(result);
    });
  }

  var _getStatsBySpeakerAndCategory = function(req, res){
    var body = req.body;
    activityService.getStatsBySpeakerAndCategory( null , function(result){
      res.status(200).send(result);
    });
  }

  return {
    get : _get,
    getById: _getById,
    create: _create,
    update: _update,
    getStatsByCategory : _getStatsByCategory,
    getStatsByRegionAndCategory : _getStatsByRegionAndCategory,
    getStatsByRegion : _getStatsByRegion,
    getStatsBySpeakerAndCategory : _getStatsBySpeakerAndCategory,
    getStatsBySpeaker : _getStatsBySpeaker
  }

}

module.exports = ActivityRoutes;
