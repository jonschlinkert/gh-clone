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
    branch  = argv._[2] || argv.b || argv.branch,
    ssh     = argv._[3] || argv.s || argv.ssh;


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


var clone = function(ssh, repository, destination, branch) {
  var url = ssh ? 'git@github.com:' : 'https://github.com/'
  url = url + repository + '.git';

  var command = ['clone', url];

  if (destination) {command.push(destination)}
  if (branch) {command.concat(['-b', branch])}

  return command;
};

log.writeln();
spawn(clone(ssh, repo, dest, branch));
