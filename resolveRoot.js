'use strict';

var path = require('path'),
    root = process.env.NODE_ENV === 'production' ? './' : './.tmp';

module.exports = function () {
  return path.resolve(root, path.join.apply(null, arguments));
};
