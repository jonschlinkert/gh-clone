#!/usr/bin/env node

var chalk = require('chalk');
var symbol = require('log-symbols');
var relative = require('relative');
var argv = require('minimist')(process.argv.slice(2));
var cmd = require('spawn-commands');

// args
var repo    = argv._[0] || argv.r || argv.repo;
var dest    = argv._[1] || argv.d || argv.dest;
var branch  = argv._[2] || argv.b || argv.branch;

// Empty line
console.log();

if (!repo) {
  console.error(chalk.red('Please provide a `repo` either as a first argument or with `-r`'));
}

inform('cloned', repo);

if (!dest) {
  dest = relative(process.cwd(), repo.split('/')[1]);
}

if (branch) {
  inform('branch', branch);
}

inform('to', dest + '/', '\t\t');

function launch(opts) {
  opts = opts || {};
  var res = {cmd: 'git', args: ['clone']};
  if (opts.branch) {
    res.args.push('-b');
    res.args.push(opts.branch);
  }
  res.args.push('https://github.com/' + opts.repo + '.git');
  if (opts.dest) {
    res.args.push(opts.dest);
  }
  return [res];
}


// Empty line
console.log();
console.log(chalk.green('Cloning.'));
console.log();

cmd(launch({repo: repo, dest: dest, branch: branch }), function (err) {
  console.log();
  if (typeof err === 'number') {
    console.log(chalk.red('Cloning was unsuccessful.'));
    console.log();
    process.exit(1);
  } else {
    console.log(chalk.green('Done.'));
    console.log();
    process.exit(0);
  }
});

/**
 * Formatting
 */

function format(msg) {
  return chalk.gray('gh-clone ') + msg;
}

function inform(type, msg, pad) {
  var prefix = format('[' + type + ']' + (pad || '\t') + '· ');
  return console.log(prefix + chalk.bold(msg) + ' ' + symbol.success);
}
