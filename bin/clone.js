#!/usr/bin/env node

var clone = require('..');
var utils = require('log-utils');

var argv = require('yargs-parser')(process.argv.slice(2), {
  alias: {
    r: 'repo',
    d: 'dest',
    b: 'branch'
  }
});

// args
var repo = argv._[0] || argv.repo;
var dest = argv._[1] || argv.dest;
var branch = argv._[2] || argv.branch;

// Empty line
console.log();

if (!repo) {
  console.error(utils.timestamp, utils.red('Please provide a `repo` either as a first argument or with `-r`'));
}

log('repo', repo);
if (branch) log('branch', branch);
if (dest) log('dest', dest + '/');
console.log();
console.log(utils.timestamp, utils.green('Cloning.'));
console.log();

/**
 * Normalize config and clone
 */

var options = {repo: repo, dest: dest, branch: branch};

clone(options, function(err) {
  console.log();
  if (typeof err === 'number') {
    console.log(utils.timestamp, utils.red('Cloning was unsuccessful.'));
    console.log();
    process.exit(1);
  }

  if (err) {
    console.log(utils.timestamp, utils.red(err.message));
    process.exit(1);
  }

  console.log(utils.timestamp, utils.green('Done.'));
  console.log();
  process.exit(0);
});

/**
 * Formatting
 */

function format(msg) {
  return utils.gray('gh-clone') + ' ' + msg;
}

function log(type, msg, pad) {
  var prefix = format('[' + type + ']' + (pad || '\t') + '· ');
  return console.log(utils.timestamp, prefix + utils.bold(msg) + ' ' + utils.green(utils.symbol.success));
}
