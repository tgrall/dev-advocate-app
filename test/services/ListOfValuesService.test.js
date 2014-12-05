'use strict';

var assert = require("assert");
var _ = require("lodash");

var ListOfValuesService = require('../../src/services/listOfValuesService');
var listOfValuesService = new ListOfValuesService();

describe('ListOfValuesService', function () {


  describe('#getAllTypes()', function () {
    it('should return some types', function (done) {
      listOfValuesService.getAllActivities(function(items){
        assert.notStrictEqual(items.length, 0);
        done();
      });
    });
  });


  describe('#getAllCountries()', function () {
    it('check number of countries', function (done) {
      listOfValuesService.getAllCountries(function(items){
        assert.equal(items.length, 243);
        done();
      });
    });
  });


});
