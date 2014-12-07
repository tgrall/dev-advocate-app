'use strict';

var Util = require("../util/util.js");

var ConferencesRoutes = function(conferencesService) {

  var util = new Util();

  var _get = function(req, res) {
    var country = req.query.country;
    var filter = {};

    if (country) {
      filter.country = country;
    }

    conferencesService.get( filter,  function(items){
      res.status(200).send(items);
    });
  }


  var _getById = function(req, res) {
    var id = req.params.id;
    var get_comments = req.query.get_comments;
    if (get_comments == undefined || get_comments === "true") {
      get_comments = true;
    } else {
      get_comments = false;
    }
    conferencesService.getById(id, get_comments, function(document){
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

    conferencesService.search(q, filter, function(documents){
      res.status(200).send(documents);
    });
  }

  var _create = function(req, res) {
      var body = req.body;
      var user = req.user;
  		if (req.body.id == null) {
	  		req.body._id = util.convertToSlug( req.body.name );
			}

      // user should alway be present (except durin debugging)
      if (user != undefined) {
        var doc_info = {
          created_by : user.userName,
          author_name : user.displayName,
          created_at : new Date(),
        };
        body.doc_info = doc_info;
      }

      conferencesService.create( body , function(result){
        res.status(201).send(result);
      });
  }

  var _update = function(req, res) {
    var update_fields = req.body;
    conferencesService.update(req.body._id , update_fields , function(result){
      res.status(201).send(result);
    } );
  }

  // *********** Comments/Votes Methods **********
  var _addComment = function(req, res) {
    var id = req.params.id; // id of the conference
    var comment = req.body;
    var user = req.user;

    if (user == undefined) {
      res.status(401).send();
    } else {
      comment.user = user.userName;
      comment.author_name = user.displayName;
      comment.date= new Date();
      conferencesService.addComment(id, comment , function(result){
        res.status(201).send(result);
      });
    }
  }

  var _updateComment = function(req, res) {
    var conf_id = req.params.conf_id; // id of the conference
    var comment_id = req.params.comment_id; // id of the comment to delete
    var comment = req.body;
    var user = req.user;

    if (user == undefined) {
      res.status(401).send();
    } else {
      comment.user = user.userName;
      comment.author_name = user.displayName;
      comment.date= new Date();
      conferencesService.updateComment(conf_id, comment_id, comment , function(result){
        res.status(201).send(result);
      });
    }

  }

  var _deleteComment = function(req, res) {
    var conf_id = req.params.conf_id; // id of the conference
    var comment_id = req.params.comment_id; // id of the comment to delete
    conferencesService.deleteComment(conf_id, comment_id , function(result){
      res.status(201).send(result);
    });

  }

  return {
    get : _get,
    getById: _getById,
    search: _search,
    create: _create,
    update: _update,
    addComment: _addComment,
    updateComment: _updateComment,
    deleteComment: _deleteComment

  }

}

module.exports = ConferencesRoutes;
