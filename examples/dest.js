'use strict';

var path = require('path');
var clone = require('..');

clone('isobject', {dest: path.join(__dirname, 'foo')})
  .catch(console.error);
