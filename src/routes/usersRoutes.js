'use strict';


var UsersRoutes = function(usersService) {


  var _get = function(req, res) {
    usersService.get( function(items){
      res.status(200).send(items);
    });
  }

  var _getSpeakers = function(req, res) {
    usersService.getSpeakers({}, function(items){
      res.status(200).send(items);
    });
  }

  var _getSpeakersByNames = function(req, res) {
    var names = req.query.names;
    var namesAsArray = names.split(",");
    usersService.getSpeakers({userName : { $in : namesAsArray  }}, function(items){
      res.status(200).send(items);
    });
  }


  return {
    get : _get,
    getSpeakers: _getSpeakers,
    getSpeakersByNames : _getSpeakersByNames
  }

}

module.exports = UsersRoutes;
