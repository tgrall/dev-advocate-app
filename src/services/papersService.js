'use strict';

var Util = require("../util/util.js");


var PapersService = function() {
  // collection names
  var COLL  = "papers";
  var mongoDbConnection = require("./mongoConnection.js");

  var util = new Util();


  var _getById = function(id, callback) {
    mongoDbConnection(function(connection){
      var collection = connection.collection(COLL);

      collection.findOne({_id : id },  function(err, document) {
        if (err) throw new Error(err);
        callback(document);
      });
    });
  }


  var _get = function(filter, callback) {
    mongoDbConnection(function(connection){
      var collection = connection.collection(COLL);
      collection.find(filter, {sort : [["title" , "asc"]] } ).toArray(function(err,items){
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
  var _create = function(paper, callback) {
    mongoDbConnection(function(connection){
      var collection = connection.collection(COLL);

      if ( paper._id == undefined ) {
        paper._id = util.convertToSlug( paper.title );
      }

      // remove empty arrays
      if ( paper.topics && paper.topics.length == 0 ) {
        delete paper.topics;
      }
      if ( paper.technologies && paper.technologies.length == 0 ) {
        delete paper.technologies;
      }
      if ( paper.links && paper.links.length == 0 ) {
        delete paper.links;
      }

      collection.insert(paper, function (err, result) {
        if (err) throw new Error(err);
        callback({ _id : result[0]._id });
      });
    });
  }

  var _update = function(id, paper, callback) {
    mongoDbConnection(function(connection){
      var collection = connection.collection(COLL);

      var unsetCommand = null;

      // remove empty arrays
      if ( paper.topics && paper.topics.length == 0 ) {
        if (unsetCommand == null) {unsetCommand={};}
        unsetCommand.topics = "";
        delete paper.topics;
      }
      if ( paper.technologies && paper.technologies.length == 0 ) {
        if (unsetCommand == null) {unsetCommand={};}
          unsetCommand.technologies = "";
        delete paper.technologies;
      }
      if ( paper.links && paper.links.length == 0 ) {
        if (unsetCommand == null) {unsetCommand={};}
          unsetCommand.links = "";
        delete paper.links;
      }

      var updateCommand = {"$set" : paper};


      if (unsetCommand ) {
        updateCommand["$unset"] = unsetCommand;
      }





      collection.update( { "_id" : id} , updateCommand , function (err, result) {
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




    return {
      get: _get,
      getById: _getById,
      search: _search,
      create: _create,
      update: _update,
      delete: _delete
    };

  }

  module.exports = PapersService;
