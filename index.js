'use strict';

const getArgs = require('./lib/args');
const spawn = require('./lib/spawn');

/**
 * Clone one or more repositories with the given options.
 *
 * ```js
 * const clone = require('gh-clone');
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

async function clone(repos, options = {}, cb) {
  if (typeof repos !== 'string' && !Array.isArray(repos)) {
    options = repos;
    repos = options.repos || options.repo;
  }

  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  const opts = Object.assign({ repos }, options);
  const pending = [];

  for (const repo of [].concat(repos)) {
    pending.push(cloneRepo(repo, opts));
  }

  const promise = Promise.all(pending);
  if (typeof cb === 'function') {
    promise.then(res => cb(null, res)).catch(cb);
    return;
  }

  return promise;
}

/**
 * Clone the given repository
 */

function cloneRepo(repo, options) {
  const opts = Object.assign({ cwd: process.cwd(), maxBuffer: 204800 }, options);
  return getArgs(Object.assign({}, opts, { repo }))
    .then(function(args) {
      return new Promise(function(resolve, reject) {
        spawn('git', args, opts, function(err, stdout, stderr) {
          if (err) {
            reject(err);
          } else {
            resolve({ stdout, stderr });
          }
        });
      });
    });
}

/**
 * Expose `clone`
 */

module.exports = clone;
