'use strict';

var spawn = require('cross-spawn');
var once = require('once');

module.exports = function(command, args, options, callback) {
  if (typeof args === 'function') {
    callback = args;
    args = options = null;
  }

  if (typeof options === 'function') {
    callback = options;
    options = null;
  }

  var cb = once(callback);
  var opts = Object.assign({}, options);
  if (!opts.silent) {
    opts = Object.assign({}, { stdio: 'inherit' }, opts);
  }

  var cp = spawn(command, args, opts);
  var stderr = '';
  var stdout = '';

  cp.stdout && cp.stdout.on('data', function(buf) {
    stdout += buf.toString();
  });

  cp.stderr && cp.stderr.on('data', function(buf) {
    stderr += buf.toString();
  });

  cp.on('error', cb);
  cp.on('close', function(code) {
    if (code !== 0 && stderr) {
      cb(stderr);
      return;
    }
    cb(null, stdout, code);
  });
};
