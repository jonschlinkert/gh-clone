const exec = require('child_process').exec;

module.exports = function(repo, dest, branch, callback) {
  var url = 'https://github.com/' + repo + '.git';
  var command = 'git clone ' + url + ' ' + dest;

  if(typeof branch === 'function') {
    callback = branch;
    branch = undefined;
  }

  if(branch) {
    command = 'git clone -b' + branch + ' ' + url + ' ' + dest;
  }

  exec(command, function (err) {
    if (err) {
      console.log(err);
    }

    callback();
  });
};