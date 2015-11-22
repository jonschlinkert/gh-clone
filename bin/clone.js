#!/usr/bin/env node

var chalk = require('chalk');
var success = require('success-symbol');
var relative = require('relative');
var cmd = require('spawn-commands');
var normalize = require('..');
var argv = require('minimist')(process.argv.slice(2), {
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
  console.error(chalk.red('Please provide a `repo` either as a first argument or with `-r`'));
}

if (!dest) {
  dest = relative(process.cwd(), repo.split('/')[1]);
}

log('cloned', repo);

if (branch) {
  log('branch', branch);
}

log('to', dest + '/', '\t\t');

console.log();
console.log(chalk.green('Cloning.'));
console.log();

/**
 * Normalize config and clone
 */

var options = {repo: repo, dest: dest, branch: branch};

normalize(options, function(err, config) {
  if (err) {
    console.log(chalk.red(err.message));
    process.exit(1);
  }

  cmd(config, function(err) {
    console.log();

    if (typeof err === 'number') {
      console.log(chalk.red('Cloning was unsuccessful.'));
      console.log();
      process.exit(1);
    }

    console.log(chalk.green('Done.'));
    console.log();
    process.exit(0);
  });
});

/**
 * Formatting
 */

function format(msg) {
  return chalk.gray('gh-clone') + ' ' + msg;
}

function log(type, msg, pad) {
  var prefix = format('[' + type + ']' + (pad || '\t') + '· ');
  return console.log(prefix + chalk.bold(msg) + ' ' + success);
}
