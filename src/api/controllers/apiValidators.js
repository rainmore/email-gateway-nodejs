'use strict';

var Joi = require('joi');

exports.message = {
  body: {
    form: Joi.string().email().required(),
    subject: Joi.string().email().required(),
    content: Joi.string().email().required(),
  }
};
