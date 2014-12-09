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
    description : "This is a test paper that should be delete"
  }

  var idTest = util.convertToSlug( paperTest.title );


  describe('#create()', function(){
    it('create a new paper', function(done){
      papersService.create(paperTest, function(){
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
        done();
      });
    });
  });



});
