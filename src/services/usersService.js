'use strict';


var UserService = function() {
    // collection names
    var COLL  = "users";
    var mongoDbConnection = require("./mongoConnection.js");


    var _getSpeakers = function(query,callback) {
      mongoDbConnection(function(connection){
        var collection = connection.collection(COLL);
        collection.find(query,{displayName:true, userName : true, _id:false},{sort:"displayName"}).toArray(function(err,items){
            if (err) throw new Error(err);
            callback(items);
        });
      });
    }


    var _get = function(callback) {
      mongoDbConnection(function(connection){
        var collection = connection.collection(COLL);
        collection.find({}).toArray(function(err,items){
            if (err) throw new Error(err);
            callback(items);
        });
      });
    }


    var _findById = function(id, callback){
      mongoDbConnection(function(connection){
        var collection = connection.collection(COLL);
        collection.findOne({_id : id} , function(err, item){
          if (err) throw new Error(err);
          callback(item)
        });
      });
    }

    var _create = function(user, callback) {
      mongoDbConnection(function(connection){
        var collection = connection.collection(COLL);
        user._id = user.id;

        collection.insert(user, function(err, result){
          if (err) throw new Error(err);
          callback(result);
        });

      })
    }

    var _save = function(user, callback) {
      mongoDbConnection(function(connection){
        var collection = connection.collection(COLL);
        user._id = user.id;

        collection.save(user, function(err, result){
          if (err) throw new Error(err);
          callback(result);
        });

      })
    }

    var _delete = function(id, callback) {
      mongoDbConnection(function(connection){
        var collection = connection.collection(COLL);

        collection.remove( { _id : id }  , function(err, result){
          if (err) throw new Error(err);
          callback(result);
        });

      })
    }


    return {
      findById: _findById,
      create: _create,
      save: _save,
      delete: _delete,
      get: _get,
      getSpeakers: _getSpeakers
    };

}

module.exports = UserService;
