'use strict';

var clone = require('..');

clone('isobject', {branch: 'master', cwd: __dirname})
  .then(function() {
    console.log(arguments);
  })
  .catch(console.error);
