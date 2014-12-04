'use strict';

var Util = require("../util/util.js");


var ConferencesService = function() {
  // collection names
  var COLL  = "conferences";
  var mongoDbConnection = require("./mongoConnection.js");

  var util = new Util();


  var _getById = function(id, callback) {
    mongoDbConnection(function(connection){
      var collection = connection.collection(COLL);
      collection.findOne({_id : id }, function(err, document) {
        if (err) throw new Error(err);
        callback(document);
      });
    });
  }


  var _get = function(callback) {
    mongoDbConnection(function(connection){
      var collection = connection.collection(COLL);
      collection.find({}, {sort : [["name" , "asc"]] } ).toArray(function(err,items){
        if (err) throw new Error(err);
        callback(items);
      });
    });
  }


  var _create = function(conference, callback) {
    mongoDbConnection(function(connection){
      var collection = connection.collection(COLL);

      conference.comments = [];
      conference.nb_of_comments = 0;
      conference.total_votes = 0;


      collection.insert(conference, function (err, result) {
        if (err) throw new Error(err);
        callback({ _id : result[0]._id });
      });
    });
  }


  var _delete = function(id, callback) {
    mongoDbConnection(function(connection){
      var collection = connection.collection(COLL);
      collection.remove({_id : id }, function(err, document) {
        if (err) throw new Error(err);
        callback({_id : id , status : "deleted"});
      });
    });
  }


  // ******** Comments/Votes Management *********
  var _addComment  = function(id, comment, callback) {
    mongoDbConnection(function(connection){
      var collection = connection.collection(COLL);

      // add an id to the comment to ease the delete/pop
      // TODO : move that to the root
      if (comment.id == undefined) {
        comment.id = util.getNewObjectId();
      }

      collection.update(  { _id : id },
                          { $push : {
                              "comments" :  { $each : [comment] , $position : 0 }
                            },
                            $inc : { nb_of_comments : 1 , total_votes : comment.vote }
                          },
                          function (err, result) {
        if (err) throw new Error(err);
        callback(comment);
      });
    });
  }


  var _deleteComment = function( conf_id, comment_id, callback ) {
      mongoDbConnection(function(connection){
        var collection = connection.collection(COLL);
        var comment_obj_id = util.getObjectId(comment_id);

        //TODO : remove the vote value too


        collection.update( { _id : conf_id }, { $pull : { "comments" : { id : comment_obj_id  }  } , $inc : { nb_of_comments : -1  }  }  , function (err, result) {
          if (err) throw new Error(err);
          callback({"status" : "comment removed"});
        });
      });
    }




  return {
    get: _get,
    getById: _getById,
    create: _create,
    delete: _delete,
    addComment: _addComment,
    deleteComment: _deleteComment
  };

}

module.exports = ConferencesService;
