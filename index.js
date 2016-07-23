'use strict';

var spawn = require('cross-spawn');
var extend = require('extend-shallow');
var relative = require('relative');
var repo = require('get-repository-url');

/**
 * Clone a repo with the given options:
 *
 * ```js
 * clone({repo: 'jonschlinkert/micromatch'}, function(err) {
 *   if (err) return console.error(err);
 * });
 * ```
 * @param {Object} `options` Options
 * @param {String} `repo` Repository to clone.
 * @param {String} `branch` Branch on repository to clone.
 * @param {String} `dest` Destination folder to clone to.
 * @param {Function} `cb` Callback
 * @api public
 */

function clone(options, cb) {
  clone.normalize(options, function(err, config) {
    if (err) {
      cb(err);
      return;
    }
    cmd(config, cb);
  });
}

/**
 * Normalizes options into a configuration object.
 *
 * ```js
 * clone.normalize({repo: 'jonschlinkert/micromatch'}, function(err, config) {
 *   if (err) return console.error(err);
 *   console.log(config);
 * });
 * ```
 * @param {Object} `options` Options
 * @param {String} `repo` Repository to clone.
 * @param {String} `branch` Branch on repository to clone.
 * @param {String} `dest` Destination folder to clone to.
 * @param {Function} `cb` Callback
 */

clone.normalize = function normalize(options, cb) {
  var opts = extend({}, options);
  var res = {cmd: 'git', args: ['clone']};

  if (opts.branch) {
    res.args.push('-b', opts.branch);
  }

  if (typeof opts.repo === 'undefined') {
    cb(new Error('expected `repo` to be a string. Example: `owner/name`'));
    return;
  }

  if (!/\//.test(opts.repo)) {
    return repo(opts.repo, function(err, url) {
      if (err) return cb(err);
      res.args.push(url + '.git');
      res = dest(opts.repo, res, opts);
      cb(null, [res]);
    });
  }

  res.args.push('https://github.com/' + opts.repo + '.git');
  var segs = opts.repo.split('/');
  if (segs.length !== 2) {
    cb(new Error('expected options.repo to be in the format of `owner/name`'));
    return;
  }

  cb(null, [dest(segs[1], res, opts)]);
}

/**
 * Calculates the destination folder.
 */

function dest(repoName, res, opts) {
  res.args.push(opts.dest || relative(process.cwd(), repoName));
  return res;
}

/**
 * Run the command from the normalized config.
 */

function cmd(config, cb) {
  if (Array.isArray(config)) {
    config = config[0];
  }

  if (typeof cb !== 'function') {
    throw new TypeError('expected callback to be a function');
  }

  if (typeof config !== 'object') {
    cb(new Error('expected "config" to be an object'));
    return;
  }

  spawn(config.cmd, config.args, { stdio: 'inherit' })
    .on('error', cb)
    .on('close', function(code) {
      if (code && typeof code !== 'number' && code !== 0) {
        cb(code);
      } else {
        cb();
      }
    });
}

/**
 * Expose `clone`
 */

module.exports = clone;
