'use strict';

require('mocha');
var assert = require('assert');
var remote = require('../lib/remote');

describe('remote URL', function() {
  it('should throw an error when invalid', function() {
    return remote()
      .catch(function(err) {
        assert(err);
      })
  });

  it('should return a formatted remote URL', function() {
    var fixture = 'https://github.com/jonschlinkert/isobject.git';
    return remote(fixture)
      .then(function(res) {
        assert.equal(res, fixture);
      });
  });

  it('should format a remote URL from a GitHub URL', function() {
    var fixture = 'https://github.com/jonschlinkert/isobject';
    return remote(fixture)
      .then(function(res) {
        assert.equal(res, fixture + '.git');
      });
  });

  it('should format a remote URL from "username/name"', function() {
    var fixture = 'jonschlinkert/isobject';
    return remote(fixture)
      .then(function(res) {
        assert.equal(res, 'https://github.com/' + fixture + '.git');
      });
  });

  it('should format a remote URL from "name"', function() {
    return remote('isobject')
      .then(function(res) {
        assert.equal(res, 'https://github.com/jonschlinkert/isobject.git');
      });
  });
});
