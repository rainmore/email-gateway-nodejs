'use strict';

module.exports = function(app) {
  var defaultApiPrefix = '/api/v1';
  
  var validate = require('express-validation');
  var apiControllers = require('../controllers/apiControllers');
  var apiValidators = require('../controllers/apiValidators');

  // todoList Routes
  app.route(defaultApiPrefix + '/mail/send')
    .post(validate(apiValidators.message), apiControllers.send);
};
