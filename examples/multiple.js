'use strict';

var clone = require('..');

clone(['kind-of', 'isobject'])
  .then(function() {
    console.log(arguments);
  })
  .catch(console.error);
