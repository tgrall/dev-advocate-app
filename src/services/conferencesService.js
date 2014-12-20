'use strict';

var Util = require("../util/util.js");


var ConferencesService = function() {
  // collection names
  var COLL  = "conferences";
  var mongoDbConnection = require("./mongoConnection.js");

  var util = new Util();


  var _getById = function(id, get_comments, callback) {
    mongoDbConnection(function(connection){
      var collection = connection.collection(COLL);

      var projection = { };
      if ( ! get_comments ) {
        projection.comments = 0,
        projection.nb_of_comments = 0,
        projection.total_votes = 0,
        projection.doc_info = 0
      }


      collection.findOne({_id : id } , projection,  function(err, document) {
        if (err) throw new Error(err);
        callback(document);
      });
    });
  }


  var _get = function(filter, get_comments, callback) {
    mongoDbConnection(function(connection){
      var collection = connection.collection(COLL);

      var projection = { };
      if ( ! get_comments ) {
        projection.comments = 0,
        projection.nb_of_comments = 0,
        projection.total_votes = 0,
        projection.doc_info = 0
      }

      collection.find(filter, projection,  {sort : [["name" , "asc"]] } ).toArray(function(err,items){
        if (err) throw new Error(err);
        callback(items);
      });
    });
  }


  var _search = function(q, filter,  callback) {
    filter["$text"] =  { "$search" : q };
    mongoDbConnection(function(connection){
      var collection = connection.collection(COLL);
      collection.find( filter ).toArray(function(err,items){
        if (err) throw new Error(err);
        callback(items);
      });
    });
  }


  // ********** Create / Update / Deletes ********
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

  var _update = function(id, conference, callback) {
    mongoDbConnection(function(connection){
      var collection = connection.collection(COLL);
      collection.update( { "_id" : id} , { "$set" : conference }, function (err, result) {
        if (err) throw new Error(err);
        callback({ "_id" : id});
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


  var _updateComment = function( conf_id, comment_id, comment, callback ) {
    mongoDbConnection(function(connection){
      var collection = connection.collection(COLL);
      var comment_obj_id = util.getObjectId(comment_id);
      comment.id = comment_obj_id;

      // Swtich to findOne?
      collection.find(
        { "_id" : conf_id , "comments" : {"$elemMatch" : {"id" : comment_obj_id} } } ,
        { "comments.$" : true, _id :false }
      ).toArray(function(err,items){
        if (err) throw new Error(err);

        var old_comment = items[0].comments[0];
        if (old_comment.vote == undefined) {
          old_comment.vote = 0;
        }

        collection.update(
          { "_id" : conf_id , "comments.id": comment_obj_id } ,
          { $set : { "comments.$" : comment  } , "$inc" : { "total_votes" : ( comment.vote - old_comment.vote  )  } } , function (err, result) {
            if (err) throw new Error(err);
            callback({"status" : "comment "+ comment_id + " updated"});
          });
      });

    });
  }


  var _deleteComment = function( conf_id, comment_id, callback ) {
      mongoDbConnection(function(connection){
        var collection = connection.collection(COLL);
        var comment_obj_id = util.getObjectId(comment_id);


        // Swtich to findOne?
        collection.find(
          { "_id" : conf_id , "comments" : {"$elemMatch" : {"id" : comment_obj_id} } } ,
          { "comments.$" : true, _id :false }
        ).toArray(function(err,items){
          if (err) throw new Error(err);

          var old_comment = items[0].comments[0];
          if (old_comment.vote == undefined) {
            old_comment.vote = 0;
          }

          //TODO : remove the vote value too
          collection.update( { _id : conf_id }, { $pull : { "comments" : { id : comment_obj_id  }  } , $inc : { nb_of_comments : -1 , total_votes : -old_comment.vote  }  }  , function (err, result) {
            if (err) throw new Error(err);
            callback({"status" : "comment removed"});
          });


        });

      });
    }




  return {
    get: _get,
    getById: _getById,
    search: _search,
    create: _create,
    update: _update,
    delete: _delete,
    addComment: _addComment,
    updateComment: _updateComment,
    deleteComment: _deleteComment
  };

}

module.exports = ConferencesService;
