'use strict';

var extend = require('extend-shallow');
var pkg = require('get-pkg');

function normalize(options, cb) {
  var opts = extend({}, options);
  var res = {cmd: 'git', args: ['clone']};

  if (opts.branch) {
    res.args.push('-b', opts.branch);
  }
  if (opts.dest) {
    res.args.push(opts.dest);
  }

  if (typeof opts.repo === 'undefined') {
    return cb(new Error('expected `repo` to be a string. Example: `jonschlinkert/generate`'));
  }

  if (!/\//.test(opts.repo)) {
    return pkg(opts.repo, function(err, pkg) {
      if (err) return cb(err);

      res.args.push(pkg.repository.url);
      cb(null, [res]);
    });
  }

  res.args.push('https://github.com/' + opts.repo + '.git');
  cb(null, [res]);
}

/**
 * Expose `normalize`
 */

module.exports = normalize;
