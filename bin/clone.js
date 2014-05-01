#!/usr/bin/env node

const log = require('verbalize');
const relative = require('relative');
const argv = require('minimist')(process.argv.slice(2));
const spawn = require('../lib/spawn');

log.runner = 'clone-repo';

// Optionally run with verbose logging
log.mode.verbose = argv.v || argv.verbose || false;

var repo    = argv._[0] || argv.r || argv.repo,
    dest    = argv._[1] || argv.d || argv.dest,
    branch  = argv._[2] || argv.b || argv.branch;


// Empty line
log.writeln();

if (!repo) {
  log.error('Please provide a source file, either as a first argument or with \'-r\'');
}

log.run('repo', repo);

if (!dest) {
  dest = relative(process.cwd(), repo.split('/')[1]);
}

log.run('dest', dest + '/');

if (branch) {
  log.run('branch', branch);
}


var clone = function(repository, destination, branch) {
  var url = 'https://github.com/' + repository + '.git';
  var command = 'git clone ' + url + ' ' + destination;

  if(branch) {
    command = ['git clone -b', branch, ' ', url, ' ', destination];
  }

  return command;
};

log.writeln();
spawn([clone(repo, dest, branch)]);