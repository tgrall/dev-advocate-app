'use strict';


var ListOfValuesService = function() {
    // collection names
    var ACTIVITY_TYPES  = "activity_types";
    var COUNTRIES  = "countries";
    var CONFERENCES  = "conferences";
    var TECHNOLOGIES  = "technologies";
    var TOPICS  = "topics";
    var LINK_TYPES  = "link_types";
    var PAPER_STATUS = "paper_status";
    var mongoDbConnection = require("./mongoConnection.js");


    var _getAllActivities = function(callback) {
      mongoDbConnection(function(connection){
        var collection = connection.collection(ACTIVITY_TYPES);
        collection.find({} , { "sort" : "label" }).toArray(function(err,items){
            if (err) throw new Error(err);
            callback(items);
        });
      });
    }

    var _getAllCountries = function(callback) {
      _getCountries(COUNTRIES, callback);
    }

    var _getCountries = function(collectionName , callback) {
      mongoDbConnection(function(connection){

        if (collectionName ==  COUNTRIES) {
          var collection = connection.collection(COUNTRIES);
          collection.find({} , { "sort" : "name" }).toArray(function(err,items){
            if (err) throw new Error(err);
            callback(items);
          });
        } else {
          var collection = connection.collection(collectionName);

          collection.distinct( "country", function(err, values) {
            var items = [];
            for(var i in values) {
              items.push( { "name" : values[i] });
            }
            callback(items);
          });
        }
      });
    }

    var _getAllTechnologies = function(callback) {
      mongoDbConnection(function(connection){
        var collection = connection.collection(TECHNOLOGIES);
        collection.find({} , { "sort" : [ ['category','asc'] , ['label' , 'asc'] ] }).toArray(function(err,items){
          if (err) throw new Error(err);
          callback(items);
        });
      });
    }

    var _getAllLinkTypes = function(callback) {
      mongoDbConnection(function(connection){
        var collection = connection.collection(LINK_TYPES);
        collection.find({}).toArray(function(err,items){
          if (err) throw new Error(err);
          callback(items);
        });
      });
    }

    var _getAllPaperStatus = function(callback) {
      mongoDbConnection(function(connection){
        var collection = connection.collection(PAPER_STATUS);
        collection.find({}).toArray(function(err,items){
          if (err) throw new Error(err);
          callback(items);
        });
      });
    }

    var _getAllTopics = function(callback) {
      mongoDbConnection(function(connection){
        var collection = connection.collection(TOPICS);
        collection.find({} , { "sort" : [ ['category','asc'] , ['label' , 'asc'] ] }).toArray(function(err,items){
          if (err) throw new Error(err);
          callback(items);
        });
      });
    }


    return {
        getAllActivities: _getAllActivities,
        getAllCountries: _getAllCountries,
        getCountries: _getCountries,
        getAllTechnologies: _getAllTechnologies,
        getAllLinkTypes: _getAllLinkTypes,
        getAllPaperStatus: _getAllPaperStatus,
        getAllTopics: _getAllTopics
      };

}

module.exports = ListOfValuesService;
