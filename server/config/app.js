var express = require('./express');
var port = process.env.PORT || 8080;

module.exports.start = function() {
  var app = express.init();
  app.listen(port, function() {
    console.log('App listening on port ' + port);
  });
};
