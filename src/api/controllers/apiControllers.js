'use strict';

exports.send = function(req, res) {
  console.log(req.body)
  res.json(req.body)
};
