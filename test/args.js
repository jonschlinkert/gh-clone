'use strict';

require('mocha');
var assert = require('assert');
var args = require('../lib/args');

function expected(res) {
  assert(Array.isArray(res));
  assert.equal(res[0], ['clone']);
  assert.equal(res[1], ['https://github.com/jonschlinkert/isobject.git']);
  assert.equal(res[2], ['isobject']);
}

describe('args', function() {
  it('should throw an error when invalid', function() {
    return args()
      .catch(function(err) {
        assert(err);
      });
  });

  it('should return a formatted remote URL', function() {
    return args({repo: 'https://github.com/jonschlinkert/isobject.git'})
      .then(expected);
  });

  it('should format a remote URL from a GitHub URL', function() {
    return args({repo: 'https://github.com/jonschlinkert/isobject'})
      .then(expected);
  });

  it('should format a remote URL from "username/name"', function() {
    return args({repo: 'jonschlinkert/isobject'})
      .then(expected);
  });

  it('should format a remote URL from "name"', function() {
    return args({repo: 'isobject'})
      .then(expected);
  });
});
