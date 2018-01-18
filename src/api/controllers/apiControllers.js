'use strict';

exports.send = function(req, res) {
  console.log(req.body)
  res.json(req.body)
};

exports.sendMailGun = function(req, res) {
  console.log(req.body)
  res.json(req.body)
};

exports.sendSendGrid = function(req, res) {
  console.log(req.body)
  res.json(req.body)
};
