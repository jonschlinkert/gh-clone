'use strict';

var clone = require('..');

clone('isobject', function(err, res) {
  if (err) console.log(err);
  console.log(res);
});
