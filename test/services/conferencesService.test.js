'use strict';

var assert = require("assert");
var _ = require("lodash");

var Util = require("../../src/util/util.js");


var ConferencesService = require('../../src/services/conferencesService');
var conferencesService = new ConferencesService();

describe('ConferencesService', function () {

  var util = new Util();
  var comment_id_to_delete = util.getNewObjectId();

  var confTestValue = {
    "_id" : "test-conference-ignore",
    "name" : "Test Conference to Ignore/Delete in case....",
    "attendees" : 1500,
    "region" : "EMEA",
    "country" : "France",
    "informations" : "Delete me if you can !!!!",
    "doc_info" : {
      "created_by" : "tgrall",
      "author_name" : "Tugdual Grall",
      "created_at" : new Date()
    }
  };



  describe('#create()', function(){
    it('create a new conferen', function(done){
      conferencesService.create(confTestValue, function(){
        done();
      });
    });
  });



  describe('#getById()', function () {
    it('get the conference that as been created', function (done) {
      conferencesService.getById( "test-conference-ignore" ,function(item){
        assert.equal( confTestValue._id , item._id  );
        done();
      });
    });
  });



  describe('#addComment()', function () {
    it("add a comment to a conference", function (done) {

      var comment =  {
        "comment" : "This is cool",
        "vote" : 5 ,
        "created_by" : "tgrall",
        "author_name" : "Tugdual Grall",
        "created_at" : new Date()
      };

      conferencesService.addComment( "test-conference-ignore", comment ,function(item){
        //assert.equal( confTestValue._id , item._id  );
      });


      // adding another comment that will be deleted later
      var comment2 =  {
        "comment" : "This is not cool",
        "vote" : 1 ,
        "created_by" : "tgrall",
        "author_name" : "Tugdual Grall",
        "id" : comment_id_to_delete,
        "created_at" : new Date()
      };

      conferencesService.addComment( "test-conference-ignore", comment2 ,function(item){
      });


      conferencesService.getById( "test-conference-ignore" ,function(item){
        assert( item.comments.length , 2  );
        assert( item.nb_of_comments , 2  );
        assert( item.total_votes , 6  );
      });

      done();


    });
  });

  describe('#removeComment()', function(){

    it('Delete one comment', function(done){
      var comment_id_has_string = comment_id_to_delete.toHexString();

      conferencesService.deleteComment( "test-conference-ignore", comment_id_has_string, function(result){
        console.log(result);
      });


      conferencesService.getById( "test-conference-ignore" ,function(item){
        assert( item.comments.length , 1  );
        assert( item.nb_of_comments , 2  );
      });

      done();

    });
  });


  describe('#delete()', function(){
    it('should delete conference', function(done){
      conferencesService.delete(confTestValue._id, function(){
        done();
      });
    });
  });



});
