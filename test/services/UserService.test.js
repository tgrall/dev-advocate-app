'use strict';

var assert = require("assert");
var _ = require("lodash");

var UserService = require('../../src/services/usersService');
var userService = new UserService();

describe('UserService', function () {

  var user = {
    id : 'demoTestUser',
    displayName: 'This is a test user',
    name: 'myusername'
  };


  describe('#create()', function(){
    it('should create a new user', function(done){
      userService.create(user, function(){
        done();
      });
    });
  });


  describe('#findById()', function () {
    it('should return some users', function (done) {
        userService.findById( user.id ,function(item){
          assert.equal( user.id , item._id  );
          done();
        });
    });
  });


  describe('#getAllUsers()', function () {
    it('should return some users', function (done) {
        userService.get(function(items){
        assert.notStrictEqual(items.length, 0);
        done();
      });
    });
  });




  describe('#delete()', function(){
    it('should delete user', function(done){
      userService.delete(user.id, function(){
        done();
      });
    });
  });



});
