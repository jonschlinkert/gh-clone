'use strict';

var cmd = require('spawn-commands');
var extend = require('extend-shallow');
var pkg = require('get-pkg');
var relative = require('relative');

function clone(options, cb) {
  normalize(options, function(err, config) {
    if (err) return cb(err);
    cmd(config, cb);
  });
}

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
 * Expose `clone`
 */

clone.normalize = normalize;
module.exports = clone;
