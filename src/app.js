var express = require('express');
var expressValidation = require('express-validation');
var emailAddresses = require("email-addresses");
var mimelib = require("mimelib");
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({type: 'application/json'}));

var routes = require('./api/routes/apiRoutes'); //importing route
routes(app); //register the route
  
app.use(methodOverride());
app.use(function (req, res, next) {
  res.status(404).send({error: req.originalUrl + ' not found'});
});
app.use(function (err, req, res, next) {
  if (err instanceof expressValidation.ValidationError) {
    res.status(err.status).json(err);
  } 
  else {
    console.error(err);
    res.status(500)
      .json({
        status: err.status,
        message: err.message
      });
  }
});

app.listen(port);

console.log('RESTful API server started on: ' + port);
