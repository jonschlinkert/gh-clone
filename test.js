'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var del = require('delete');
var assert = require('assert');
var clone = require('./');

var cwd = path.resolve.bind(path, __dirname, 'actual');

function exists(name, cb) {
  var dir = cwd(name);

  return function(err) {
    if (typeof err === 'number') {
      return cb(new Error('Cloning error: ' + err));
    }
    if (err) return cb(err);

    fs.stat(dir, function(err, stat) {
      del(dir, function() {
        if (err) return cb(err);
        assert(stat);
        cb();
      });
    });
  };
}

describe('gh-clone', function() {
  describe('normalize', function() {
    it('should create a git url from the given repo', function(cb) {
      clone.normalize({repo: 'jonschlinkert/micromatch'}, function(err, config) {
        var args = config[0].args;
        assert.equal(args[1], 'https://github.com/jonschlinkert/micromatch.git');
        cb();
      });
    });

    it('should get a git url from npm when only the repo name is given', function(cb) {
      clone.normalize({repo: 'micromatch'}, function(err, config) {
        var args = config[0].args;
        assert.equal(args[1], 'git://github.com/jonschlinkert/micromatch.git');
        cb();
      });
    });
  });

  describe('clone', function() {
    this.timeout(20000);
    afterEach(del.bind(del, cwd()));

    it('should clone a repo with a specified org/repo', function(cb) {
      clone({repo: 'jonschlinkert/micromatch'}, exists('../micromatch', cb));
    });

    it('should clone a repo by just the repo name', function(cb) {
      clone({repo: 'micromatch'}, exists('../micromatch', cb));
    });

    it('should clone a repo to the specified destination', function(cb) {
      clone({repo: 'micromatch', dest: 'actual/micromatch'}, exists('micromatch', cb));
    });

    it('should clone a specified branch', function(cb) {
      clone({repo: 'micromatch', branch: '1.0.0', dest: 'actual/micromatch'}, exists('micromatch', cb));
    });
  });
});
