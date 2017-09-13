'use strict';

var path = require('path');
var url = require('url');
var esc = require('any-shell-escape');
var remote = require('./remote');

/**
 * Create the arguments array to pass to exec
 */

module.exports = function(options) {
  var opts = Object.assign({cwd: process.cwd()}, options);

  return remote(opts.repo)
    .then(function(repo) {
      var args = ['clone'];

      if (opts.branch) {
        args.push('-b', opts.branch);
      }

      args.push(repo);
      args.push(dest(repo, opts));
      return args;
    });
};

/**
 * Get the destination folder to use
 */

function dest(repo, options) {
  if (options.dest && typeof options.dest === 'string') {
    if (Array.isArray(options.repos) && options.repos.length > 1) {
      return path.join(options.dest, repoName(repo));
    }
    return options.dest;
  }
  return repoName(repo);
}

function repoName(repo) {
  var obj = url.parse(repo);
  var name = obj.pathname.split('/').pop();
  return name.replace(/\.git$/, '');
}
