'use strict';

var each = require('each-series-async');
var isObject = require('isobject');
var getArgs = require('./lib/args');
var spawn = require('./lib/spawn');

/**
 * Clone one or more repositories with the given options.
 *
 * ```js
 * var clone = require('gh-clone');
 * clone('kind-of', function(err) {
 *   if (err) console.error(err);
 * });
 *
 * // or
 * clone(['isobject', 'kind-of'])
 *   .then(function() {
 *     // do stuff
 *   })
 *   .catch(console.error)
 * ```
 * @param {String|Array} `repos`
 * @param {Object} `options`
 * @param {Function} `callback` Optional, returns a promise if the callback is not passed.
 * @return {Promise} if a callback is not passed.
 * @api public
 */

function clone(repos, options, cb) {
  if (isObject(repos)) {
    cb = options;
    options = repos;
    repos = options.repos || options.repo;
  }

  if (typeof options === 'function') {
    cb = options;
    options = null;
  }

  var opts = Object.assign({repos: repos}, options);

  if (typeof cb !== 'function') {
    return clone.promise(repos, opts);
  }

  each(arrayify(repos), function(repo, next) {
    cloneRepo(repo, opts)
      .then(function(args) {
        setImmediate(function() {
          next(null, ...args);
        });
      })
      .catch(next);
  }, cb);
}

/**
 * Called by the main export when a callback is not passed.
 *
 * ```js
 * clone.promise(['isobject', 'kind-of'])
 *   .then(function() {
 *     // do stuff
 *   })
 *   .catch(console.error)
 * ```
 * @param {String|Array} `repos`
 * @param {Object} `options`
 * @return {Promise}
 * @api public
 */

clone.promise = function(repos, options) {
  return new Promise(function(resolve, reject) {
    each(arrayify(repos), function(repo, next) {
      cloneRepo(repo, options)
        .then(function(args) {
          setImmediate(function() {
            next(null, ...args);
          });
        })
        .catch(next);
    }, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

/**
 * Clone the given repository
 */

function cloneRepo(repo, options) {
  var opts = Object.assign({cwd: process.cwd(), maxBuffer: 204800}, options);
  return getArgs(Object.assign({}, opts, {repo: repo}))
    .then(function(args) {
      return new Promise(function(resolve, reject) {
        spawn('git', args, opts, function(err, stdout, stderr) {
          if (err) {
            reject(err);
          } else {
            resolve(stdout, stderr);
          }
        });
      });
    });
}

function arrayify(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
}

/**
 * Expose `clone`
 */

module.exports = clone;
