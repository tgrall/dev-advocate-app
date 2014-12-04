'use strict';

var Util = require("../util/util.js");

var ConferencesRoutes = function(conferencesService) {

  var util = new Util();

  var _get = function(req, res) {
    conferencesService.get( function(items){
      res.status(200).send(items);
    });
  }


  var _getById = function(req, res) {
    var id = req.params.id;
    conferencesService.getById(id, function(document){
      res.status(200).send(document);
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


  // *********** Comments/Votes Methods **********
  var _addComment = function(req, res) {
    var id = req.params.id; // id of the conference
    var comment = req.body;
    var user = req.user;

    console.log(user);

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

  var _removeComment = function(req, res) {
    var conf_id = req.params.conf_id; // id of the conference
    var comment_id = req.params.conf_id; // id of the comment to delete
    conferencesService.removeComment(conf_id, comment_id , function(result){
      res.status(201).send(result);
    });

  }

  return {
    get : _get,
    getById: _getById,
    create: _create,
    addComment: _addComment,
    removeComment: _removeComment

  }

}

module.exports = ConferencesRoutes;
