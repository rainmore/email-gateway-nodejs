var express = require('express');
var emailAddresses = require("email-addresses");
var bodyParser = require('body-parser');
var mimelib = require("mimelib");
var app = express();
var port = process.env.PORT || 3000;
  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});


var routes = require('./api/routes/apiRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('RESTful API server started on: ' + port);
