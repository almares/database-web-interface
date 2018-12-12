var path = require('path'),
    express = require('express'),
    sqlite3 = require('sqlite3').verbose(),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    listingsRouter = require('../routes/listings.server.routes');

module.exports.init = function() {

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware
  app.use(bodyParser.json());

  //Serve static files
  app.use(express.static('client'));

  //Use the listings router for requests to the api
  app.use('/api', listingsRouter);

  //Go to homepage for all routes not specified
  app.all('*', function (req, res) {
    res.redirect('/');
  });


  return app;
};
