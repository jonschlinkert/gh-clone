'use strict';

require('mocha');
var assert = require('assert');
var normalize = require('./');

describe('normalize config', function() {
  it('should create a git url from the given repo', function(cb) {
    normalize({repo: 'jonschlinkert/micromatch'}, function(err, config) {
      var args = config[0].args;
      assert.equal(args[1], 'https://github.com/jonschlinkert/micromatch.git');
      cb();
    });
  });

  it('should get a git url from npm when only the repo name is given', function(cb) {
    normalize({repo: 'micromatch'}, function(err, config) {
      var args = config[0].args;
      assert.equal(args[1], 'git://github.com/jonschlinkert/micromatch.git');
      cb();
    });
  });
});
