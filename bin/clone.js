#!/usr/bin/env node

var clone = require('..');
var ok = require('log-ok');
var opts = {alias: {d: 'dest', b: 'branch', c: 'cwd'}};
var argv = require('minimist')(process.argv.slice(2), opts);

clone(argv._, argv)
  .then(function() {
    ok('finished');
    process.exit();
  })
  .catch(function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
