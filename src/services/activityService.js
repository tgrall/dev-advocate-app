'use strict';


var ActivityService = function() {
  // collection names
  var COLL  = "activities";
  var mongoDbConnection = require("./mongoConnection.js");



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
      collection.find({}, {sort : [["eventDate" , "desc"]] } ).toArray(function(err,items){
        if (err) throw new Error(err);
        callback(items);
      });
    });
  }


  var _create = function(activity, callback) {
    mongoDbConnection(function(connection){
      var collection = connection.collection(COLL);
        collection.insert(activity, function (err, result) {
          if (err) throw new Error(err);
          callback({ "_id" : result[0]._id });
        });
    });
  }

  var _update = function(id, activity, callback) {
    mongoDbConnection(function(connection){
      var collection = connection.collection(COLL);
      collection.update( { "_id" : id} , { "$set" : activity }, function (err, result) {
        if (err) throw new Error(err);
        callback({ "_id" : id});
      });
    });
  }



  var _getStatsByCategory = function(level, callback){
    mongoDbConnection(function(connection){
      var collection = connection.collection(COLL);

      var agg = [
        {$group:{_id:"$_id",type:{$first:"$type"} , master_talk:{$push: {talk_title :  "$title" , talk_attendees :  "$attendees"} }, talks : { $first : "$talks"}  }}
      , {$project : { _id : 0, category :  "$type.category"  ,  talks : { $ifNull : [ "$talks" , "$master_talk"  ] }  } }
      , {$unwind : "$talks"  }
      , {$group : {   _id : "$category",
                      attendees : { $sum : "$talks.talk_attendees" },
                      count : {$sum :1}}
                  }
      , {$project : { _id : 0 , category : "$_id", count :1 , attendees : 1 }  }
      ];

      collection.aggregate(
        agg,
        function(err, result) {
          if (err) throw new Error(err);
          callback(result);
        }

      );

    });
  }


    var _getStatsByRegion = function(level, callback){
      mongoDbConnection(function(connection){
        var collection = connection.collection(COLL);

        var agg = [
          {$group:{_id:"$_id", region : {$first : "$region"} , master_talk:{$push: {talk_title :  "$title" , talk_attendees :  "$attendees"} }, talks : { $first : "$talks"}  }}
        , {$project : { _id : 0, region : 1,   talks : { $ifNull : [ "$talks" , "$master_talk"  ] }  } }
        , {$unwind : "$talks"  }
        , {$group : {   _id : "$region" ,
                        attendees : { $sum : "$talks.talk_attendees" },
                        count : {$sum :1}
                    }
          }
        , {$project : { group : "$_id" , _id : 0, attendees : 1, count : 1 }  }
        , {$sort : { "group" : 1  } }
        ];

        collection.aggregate(
          agg,
          function(err, result) {
            if (err) throw new Error(err);
            callback(result);
          }

        );

      });
    }


    var _getStatsByRegionAndCategory = function(level, callback){
      mongoDbConnection(function(connection){
        var collection = connection.collection(COLL);

        var agg = [
          {$group:{_id:"$_id",type:{$first:"$type"}, region : {$first : "$region"} , master_talk:{$push: {talk_title :  "$title" , talk_attendees :  "$attendees"} }, talks : { $first : "$talks"}  }}
        , {$project : { _id : 0, category :  "$type.category"  , region : 1,   talks : { $ifNull : [ "$talks" , "$master_talk"  ] }  } }
        , {$unwind : "$talks"  }
        , {$group : {   _id : { region : "$region" , category : "$category" } ,
                        attendees : { $sum : "$talks.talk_attendees" },
                        count : {$sum :1}
                    }
          }
        , {$project : { group : "$_id" , _id : 0, attendees : 1, count : 1 }  }
        , {$sort : { "group.region" : 1, "group.category" : 1 }  }
        ];


        collection.aggregate(
          agg,
          function(err, result) {
            if (err) throw new Error(err);
            callback(result);
          }

        );

      });
    }



  var _getstatsBySpeaker = function(level, callback) {
      mongoDbConnection(function(connection){
        var collection = connection.collection(COLL);

        var agg = [
          { $unwind : "$speakers" }
        , {$group: {
                _id:"$_id",
                speaker : { $first : "$speakers" } ,
                talks : { $first : "$talks"},
                master_talk:{$push: {talk_title :  "$title" , talk_attendees :  "$attendees"} }
              }
            }
        , {$project : { _id : 0, speaker : 1  ,  talks : { $ifNull : [ "$talks" , "$master_talk"  ] }  } }
        , {$unwind : "$talks"  }
        , {$group : {   _id :  "$speaker",
                        attendees : { $sum : "$talks.talk_attendees" },
                        count : {$sum :1}}
                    }
        , {$project : { _id : 0 , group : "$_id", count :1 , attendees : 1 }  }
        , {$sort : { "group.speaker.displayName" : 1 }}
        ];

        collection.aggregate(
          agg,
          function(err, result) {
            if (err) throw new Error(err);
            callback(result);
          }
        );


      });

  }


  var _getStatsBySpeakerAndCategory = function(level, callback){
    mongoDbConnection(function(connection){
      var collection = connection.collection(COLL);

      var agg = [
        { $unwind : "$speakers" }
      , {$group: {
              _id:"$_id",
              type:{$first:"$type"},
              speaker : { $first : "$speakers" } ,
              talks : { $first : "$talks"},
              master_talk:{$push: {talk_title :  "$title" , talk_attendees :  "$attendees"} }
            }
          }
      , {$project : { _id : 0, speaker : 1, category :  "$type.category"  ,  talks : { $ifNull : [ "$talks" , "$master_talk"  ] }  } }
      , {$unwind : "$talks"  }
      , {$group : {   _id : { speaker : "$speaker" , category : "$category" },
                      attendees : { $sum : "$talks.talk_attendees" },
                      count : {$sum :1}}
                  }
      , {$project : { _id : 0 , group : "$_id", count :1 , attendees : 1 }  }
      , {$sort : { "group.speaker" : 1 , "group.category" : 1 }}
      ];

      collection.aggregate(
        agg,
        function(err, result) {
          if (err) throw new Error(err);
          callback(result);
        }
      );

    });
  }


  return {
    get: _get,
    getById: _getById,
    create: _create,
    update: _update,
    getStatsByCategory : _getStatsByCategory,
    getStatsByRegionAndCategory : _getStatsByRegionAndCategory,
    getStatsByRegion : _getStatsByRegion,
    getStatsBySpeakerAndCategory : _getStatsBySpeakerAndCategory,
    getstatsBySpeaker : _getstatsBySpeaker
  };

}

module.exports = ActivityService;
