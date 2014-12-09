'use strict';

var Util = require("../util/util.js");

var PapersRoutes = function(papersService) {

  var util = new Util();

  var _get = function(req, res) {
    var country = req.query.country;
    var filter = {};

    if (country) {
      filter.country = country;
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
    var country = req.query.country;
    var filter = {};

    if (country) {
      filter.country = country;
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


  return {
    get : _get,
    getById: _getById,
    search: _search,
    create: _create,
    update: _update
  }

}

module.exports = PapersRoutes;
