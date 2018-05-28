'use strict';

require('mocha');
const fs = require('fs');
const util = require('util');
const path = require('path');
const del = require('delete');
const assert = require('assert');
const stat = util.promisify(fs.stat);
const clone = require('../');

const actual = path.resolve.bind(path, __dirname, 'actual');
const cwd = process.cwd();
process.on('exit', function() {
  process.chdir(cwd);
});

function exists(name) {
  const dir = actual(name);

  return function() {
    return stat(dir)
      .then(function(stats) {
        assert(stats);
      });
  };
}

describe('gh-clone', function() {
  this.timeout(20000);

  beforeEach(function(cb) {
    process.chdir(__dirname);
    fs.mkdir(actual(), function(err) {
      if (err) {
        cb(err);
      } else {
        cb();
      }
    });
  });

  afterEach(function() {
    return del(actual());
  });

  it('should work async', function(cb) {
    clone('jonschlinkert/isobject', {cwd: actual(), silent: true}, function(err) {
      if (err) {
        cb(err);
        return;
      }

      exists('isobject')()
        .then(function() {
          cb();
        })
        .catch(cb);
    });
  });

  it('should clone a repo with a specified org/repo', function() {
    return clone('jonschlinkert/isobject', {cwd: actual(), silent: true})
      .then(exists('isobject'));
  });

  it('should clone a repo when specified on options.repo', function() {
    return clone({repo: 'jonschlinkert/isobject', cwd: actual(), silent: true})
      .then(exists('isobject'));
  });

  it('should clone a repo by just the repo name', function() {
    return clone({repo: 'isobject', cwd: actual(), silent: true})
      .then(exists('isobject'));
  });

  it('should clone multiple repos', function() {
    return clone(['isobject', 'kind-of'], {cwd: actual(), silent: true})
      .then(exists('isobject'))
      .then(exists('kind-of'));
  });

  it('should clone a specified branch', function() {
    return clone('isobject', {branch: '2.0.0', cwd: actual(), silent: true})
      .then(exists('isobject'));
  });
});
