'use strict';

var pkg = require('../package.json');

module.exports = function (req, res, next) {
  res.locals =  {
    appVersion: pkg.version,
    baseUrl: process.env.BASE_URL || ''
  };

  next();
};
