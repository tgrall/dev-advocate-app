'use strict';

var assert = require("assert");
var _ = require("lodash");

var ActivityService = require('../../src/services/activityService');
var activityService = new ActivityService();

describe('ActivityService', function () {


 var demoEvent = {
   "_id" : "demo-event",
   "title" : "DEMO EVENT",
   "eventDate" : "2014-10-08",
   "nb_of_days" : 3,
   "attendees" : 1500,
   "type" : {
     "_id" : "BCP",
     "label" : "Bootcamp",
     "category" : "Enable"
   },
   "region" : "APAC",
   "country" : "India",
   "url" : "",
   "report" : "This is the report",
   "speakers" : [
   {
     "speaker" : {
       "displayName" : "Tugdual Grall",
       "userName" : "tgrall"
     }
   }
   ]
 };





  describe('#getStatsByCategory()', function () {
    it('should return some stats', function (done) {
      activityService.getStatsByCategory(null, function(items){
        console.log(items);
        assert.notStrictEqual(items.length, 0);
        done();
      });
    });
  });


});
