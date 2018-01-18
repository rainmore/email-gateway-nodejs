'use strict';

module.exports = function(app) {
  var defaultApiPrefix = '/api/v1';
  
  var expressValidation = require('express-validation');
  var apiControllers = require('../controllers/apiControllers');
  var apiValidators = require('../controllers/apiValidators');

  // todoList Routes
  app.route(defaultApiPrefix + '/mail/send')
    .post(expressValidation(apiValidators.sendValidator), apiControllers.send);
    
  app.route(defaultApiPrefix + '/mail/send/mail-gun')
    .post(expressValidation(apiValidators.sendValidator), apiControllers.sendMailGun);  
  
  app.route(defaultApiPrefix + '/mail/send/send-grid')
    .post(expressValidation(apiValidators.sendValidator), apiControllers.sendSendGrid);

};
