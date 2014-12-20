'use strict';

var assert = require("assert");
var _ = require("lodash");

var Util = require("../../src/util/util.js");


var PapersService = require('../../src/services/papersService');
var papersService = new PapersService();

describe('PapersService', function () {

  var util = new Util();

  var paperTest = {
    title : "MongoDB Paper To Test",
    description : "This is a test paper that should be delete",
    technologies : ["Hadoop", "Dummy"],
    topics : ["NoSQL", "MongoDB"]
  }

  var paperTest2 = {
    _id : "foo-bar",
    title : "foo bar",
    description : "This is a test paper that should be delete",
    technologies : ["Hadoop", "MongoDB"],
    topics : ["foo", "bar", "Dummy"]
  }

  var idTest = util.convertToSlug( paperTest.title );


  describe('#create()', function(){
    it('create a new paper', function(done){
      papersService.create(paperTest, function(){
        papersService.create(paperTest2, function(){
          done();
        });
      });
    });
  });


  describe('#get()', function () {
    it('get the list of paper', function (done) {
      papersService.get( {} , function(items){
        assert.ok( (items.length >= 2) , "We should at least have 2 items in the list!" );
        done();
      });
    });

    it ('get the list of paper with technologie of topics', function(done) {
      papersService.get( {'topics' : 'foo'} , function(items){
        assert.equal( 1,1, "Only one document should have 'foo' as topics or technologies" );
        done();
      });
    });


    it ('get the list of paper with technologie of topics', function(done) {
      papersService.get( { "$or":[ {"topics":"Dummy"} , {"technologies":"Dummy"}]  } , function(items){
        assert.equal( items.length,2, "We should find 2 documents with dummy in the technologies or topics" );
        done();
      });
    });

  });


  describe('#getById()', function () {
    it('get the paper that as been created', function ( done) {
      papersService.getById( idTest, function(item){
        assert.equal( idTest , item._id  );
        done();
      });
    });
  });


  describe('#update()', function(){
    it ('update paper', function( done){
      papersService.update(idTest , {"title" : "new_title_to_delete", "description" : "This is not a paper about trees, but documents"} , function(){
        papersService.getById( idTest ,function(item){
          assert.equal(  item.title , "new_title_to_delete"  );
          done();
        });
      });
    });
  });


  describe('#addSubmission()', function(){
    it ('Add Submission to Conference', function( done){
      var sub1 = { "conf_id" : "javaone" , "conf_name" : "JavaOne" , "year" : 2015  };
      var sub2 = { "conf_id" : "fosdem" , "conf_name" : "FOSDEM" , "year" : 2015  };
      papersService.addSubmission(idTest , sub1 , function(){
        papersService.getById( idTest ,function(item){
          assert.equal(  item.submissions[0].conf_id ,  sub1.conf_id );
          papersService.addSubmission(idTest , sub2 , function(){
            papersService.getById( idTest ,function(item){
              assert.equal(  item.submissions[1].conf_id ,  sub1.conf_id );
              done();
            });
          });
        });
      });
    });
  });

  describe('#search()', function () {
    it('search paper by name/information -fts search', function ( done) {
      papersService.search( "tree", {} ,function(items){
        assert.notStrictEqual(items.length, 0);
        done();
      });
    });
  });


  describe('#delete()', function(){
    it('should delete paper', function( done){
      papersService.delete(idTest, function(){
        papersService.delete( paperTest2._id , function(){
          done();
        } )
      });
    });
  });



});
