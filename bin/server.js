#!/usr/bin/env node
var debug = require('debug')('dev-advocate-app');
var app = require('../src/app.js');

app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
  console.log('Express server listening on port ' + server.address().port);
});
