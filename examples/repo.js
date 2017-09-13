'use strict';

var clone = require('..');

clone('isobject')
  .then(function() {
    console.log(arguments);
  })
  .catch(console.error);
