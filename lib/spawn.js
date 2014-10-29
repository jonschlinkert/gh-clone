const spawn = require('child_process').spawn;
const win32 = process.platform === 'win32';
const _ = require('lodash');

module.exports = function spawnCommand(args) {
  var cmd = win32 ? 'cmd git' : 'git';
  var winArgs = win32 ? _.union(['/c'], args) : args;

  return spawn(cmd, winArgs, {
    stdio: 'inherit'
  });
};
