'use strict';

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var passport = require('passport');
var flash    = require('connect-flash');

var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');


var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

var UserService = require('./services/usersService');
var UsersRoutes = require('./routes/usersRoutes');

var ConferencesService = require('./services/conferencesService');
var ConferencesRoutes = require('./routes/conferencesRoutes');

var PapersService = require('./services/papersService');
var PapersRoutes = require('./routes/papersRoutes');

var ListOfValuesRoutes = require('./routes/listOfValuesRoutes');
var ListOfValuesService = require('./services/listOfValuesService');

var ActivityRoutes = require('./routes/activityRoutes');
var ActivityService = require('./services/activityService');


var userService = new UserService();
var usersRoutes = new UsersRoutes(userService);

var activityService = new ActivityService();
var activityRoutes = new ActivityRoutes(activityService);

var conferencesService = new ConferencesService();
var conferencesRoutes = new ConferencesRoutes(conferencesService);

var papersService = new PapersService();
var papersRoutes = new PapersRoutes(papersService);

var listOfValuesService = new ListOfValuesService();
var listOfValuesRoutes = new ListOfValuesRoutes(listOfValuesService);

var user = new Object();


var execMode = process.env.MODE;
var isProduction = (execMode == "production");
var oauthRedirect = process.env.OAUTH_REDIRECT || "http://localhost:8080/";

var consumerKey = process.env.TW_CONS_KEY;
var consumerSecret = process.env.TW_CONS_SECRET;


if ( consumerKey == undefined || consumerSecret == undefined ) {
  console.log("ERROR -  You must set the Twitter Application Keys ( TW_CONS_KEY & TW_CONS_SECRET )");
}

passport.use(new TwitterStrategy({
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    callbackURL: oauthRedirect + "auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    user.id = profile.id;
    user.token = token;
    user.displayName = profile.displayName;
    user.userName = profile.username;
    user.photo = profile.photos[0].value;

    userService.save(user, function(){
      done(null, user);
    });
  }));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


/*
 * Check if user is authenticated and call next function
 */
function isAuthenticated(req, res, next) {


  if (isProduction) {
    if (!req.isAuthenticated()) {
      res.status(403).send("Not authorized");
    }
  } else {
    console.log("-- not production mode -- NOT SECURITY!!!!!");
  }
  return next();

}


var api_version = "/api/1.0"


// // Bootstrap Express application
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({ secret: 'thisismyapp' , cookie: { httpOnly: false } })); // session secret
app.use(passport.initialize());
app.use(passport.session( { resave : true, saveUninitialized : true } )); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// Configure static content to render Angular.js application
app.use('/', express.static(__dirname + '/../angular-js'));


// ***** Users and Speakers Routes *****
app.get(api_version + '/users/',isAuthenticated, usersRoutes.get);
app.get(api_version + '/speakers',isAuthenticated, usersRoutes.getSpeakers);
app.get(api_version + '/speakers/by_names',isAuthenticated, usersRoutes.getSpeakersByNames);



// ***** Conferences Routes *****
app.get(api_version + '/conferences/search', isAuthenticated, conferencesRoutes.search );
app.get(api_version + '/conferences/:id', isAuthenticated, conferencesRoutes.getById);
app.put(api_version + '/conferences/:id', isAuthenticated, conferencesRoutes.update );
app.get(api_version + '/conferences', isAuthenticated, conferencesRoutes.get);

app.put(api_version + '/conferences/comment/:id', isAuthenticated, conferencesRoutes.addComment );
app.put(api_version + '/conferences/comment/:conf_id/:comment_id', isAuthenticated, conferencesRoutes.updateComment );
app.delete(api_version + '/conferences/comment/:conf_id/:comment_id', isAuthenticated, conferencesRoutes.deleteComment );
app.put(api_version + '/conferences', isAuthenticated, conferencesRoutes.create );


// ***** Paper Routes *****
app.get(api_version + '/papers/search', isAuthenticated, papersRoutes.search );
app.get(api_version + '/papers/:id', isAuthenticated, papersRoutes.getById);
app.put(api_version + '/papers/:id', isAuthenticated, papersRoutes.update );
app.get(api_version + '/papers', isAuthenticated, papersRoutes.get);
app.put(api_version + '/papers', isAuthenticated, papersRoutes.create );


// ***** Activities Routes *****
app.get(api_version + '/activity/:id', isAuthenticated, activityRoutes.getById);
app.put(api_version + '/activity/:id', isAuthenticated, activityRoutes.update );

app.get(api_version + '/activity', isAuthenticated, activityRoutes.get);
app.put(api_version + '/activity', isAuthenticated, activityRoutes.create );

// ***** Reporting *****
app.get(api_version + '/stats/speaker/by_category', isAuthenticated, activityRoutes.getStatsBySpeakerAndCategory );
app.get(api_version + '/stats/speaker', isAuthenticated, activityRoutes.getStatsBySpeaker );
app.get(api_version + '/stats/activity', isAuthenticated, activityRoutes.getStatsByCategory );
app.get(api_version + '/stats/region/activity', isAuthenticated, activityRoutes.getStatsByRegionAndCategory );
app.get(api_version + '/stats/region', isAuthenticated, activityRoutes.getStatsByRegion );


// **** Passport Twitter Authentication ****
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/' }));
app.get(api_version + '/user/is_loggedin', listOfValuesRoutes.isAuthenticated );
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


// ***** List of Values *****
app.get(api_version + '/types/activity', listOfValuesRoutes.getAllActivities);
app.get(api_version + '/types/activities', listOfValuesRoutes.getAllActivities);
app.get(api_version + '/types/country', listOfValuesRoutes.getCountries);
app.get(api_version + '/types/countries', listOfValuesRoutes.getCountries);
app.get(api_version + '/types/technologies', listOfValuesRoutes.getAllTechnologies);
app.get(api_version + '/types/topics', listOfValuesRoutes.getAllTopics);
app.get(api_version + '/types/links', listOfValuesRoutes.getAllLinkTypes);
app.get(api_version + '/types/paper_status', listOfValuesRoutes.getAllPaperStatus);




module.exports = app;
