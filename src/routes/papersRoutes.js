'use strict';

var Util = require("../util/util.js");

var PapersRoutes = function(papersService) {

  var util = new Util();

  var _get = function(req, res) {
    var filter = {};
    if (req.query.technology) {
      filter.technologies = req.query.technology;
    }
    if (req.query.topic) {
      filter.topics = req.query.topic;
    }

    papersService.get( filter,  function(items){
      res.status(200).send(items);
    });
  }


  var _getById = function(req, res) {
    var id = req.params.id;
    papersService.getById(id, function(document){
      res.status(200).send(document);
    });
  }


  var _search = function(req, res) {
    var q = req.query.q;
    var filter = {};
    if (req.query.technology) {
      filter.technologies = req.query.technology;
    }
    if (req.query.topic) {
      filter.topics = req.query.topic;
    }

    papersService.search(q, filter, function(documents){
      res.status(200).send(documents);
    });
  }

  var _create = function(req, res) {
    var body = req.body;
    var user = req.user;

    // user should alway be present (except durin debugging)
    if (user != undefined) {
      var doc_info = {
        created_by : user.userName,
        author_name : user.displayName,
        created_at : new Date(),
      };
      body.doc_info = doc_info;
    }

    papersService.create( body , function(result){
      res.status(201).send(result);
    });
  }

  var _update = function(req, res) {
    var update_fields = req.body;
    papersService.update(req.body._id , update_fields , function(result){
      res.status(201).send(result);
    } );
  }


  var _addSubmission = function(req, res) {
    var id = req.params.id; // id of the conference
    var submission = req.body;
    var user = req.user;

    if (user == undefined) {
      res.status(401).send();
    } else {
      submission.user = user.userName;
      submission.author_name = user.displayName;
      submission.date= new Date();
      papersService.addSubmission(id, submission , function(result){
        res.status(201).send(result);
      });
    }
  }



  return {
    get : _get,
    getById: _getById,
    search: _search,
    create: _create,
    update: _update,
    addSubmission: _addSubmission
  }

}

module.exports = PapersRoutes;
