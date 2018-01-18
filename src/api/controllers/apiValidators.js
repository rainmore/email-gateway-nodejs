'use strict';

var Joi = require('joi');

exports.sendValidator = {
  body: {
    form: Joi.string().required(),
    replyTo: Joi.string().optional(),
    to: Joi.string().optional(),
    cc: Joi.string().optional(),
    bcc: Joi.string().optional(),
    subject: Joi.string().required(),
    content: Joi.string().required(),
  }
};
