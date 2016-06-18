'use strict';

var spawn = require('cross-spawn');
var extend = require('extend-shallow');
var pkg = require('get-pkg');
var relative = require('relative');

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
  normalize(options, function(err, config) {
    if (err) return cb(err);
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
 * @name .clone.normalize
 * @param {Object} `options` Options
 * @param {String} `repo` Repository to clone.
 * @param {String} `branch` Branch on repository to clone.
 * @param {String} `dest` Destination folder to clone to.
 * @param {Function} `cb` Callback
 * @api public
 */

function normalize(options, cb) {
  var opts = extend({}, options);
  var res = {cmd: 'git', args: ['clone']};

  if (opts.branch) {
    res.args.push('-b', opts.branch);
  }

  if (typeof opts.repo === 'undefined') {
    return cb(new Error('expected `repo` to be a string. Example: `jonschlinkert/generate`'));
  }

  if (!/\//.test(opts.repo)) {
    return pkg(opts.repo, function(err, pkg) {
      if (err) return cb(err);

      var url = pkg.repository.url.split('git+https').join('git');
      res.args.push(url);
      res = dest(opts.repo, res, opts);
      cb(null, [res]);
    });
  }

  var repoName = opts.repo.split('/')[1];
  res.args.push('https://github.com/' + opts.repo + '.git');
  res = dest(repoName, res, opts);
  cb(null, [res]);
}

/**
 * Calculates the destination folder.
 */

function dest(repoName, res, opts) {
  if (opts.dest) {
    res.args.push(opts.dest);
    return res;
  }
  var dest = relative(process.cwd(), repoName);
  res.args.push(dest);
  return res;
}

/**
 * Run the command from the normalized config.
 */

function cmd(config, cb) {
  if (Array.isArray(config)) {
    config = config[0];
  }

  if (typeof config !== 'object') {
    throw new Error('expected "config" to be an object');
  }

  var spawned = spawn(config.cmd, config.args);
  spawned.on('error', cb);
  spawned.on('close', function(code) {
    if (typeof code === 'number' && code === 0) {
      return cb();
    } else if (code) {
      return cb(code);
    }
    cb();
  });
}

/**
 * Expose `clone`
 */

clone.normalize = normalize;
module.exports = clone;
