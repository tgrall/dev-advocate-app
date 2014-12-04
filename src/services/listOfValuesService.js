'use strict';


var ListOfValuesService = function() {
    // collection names
    var ACTIVITY_TYPES  = "activity_types";
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


    return {
        getAllActivities: _getAllActivities
    };

}

module.exports = ListOfValuesService;
