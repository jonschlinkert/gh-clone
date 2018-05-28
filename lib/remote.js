'use strict';

const isGitUrl = require('is-git-url');
const getRepositoryUrl = require('get-repository-url');

module.exports = function(repo) {
  return new Promise(function(resolve, reject) {
    if (repo == null) {
      reject(new Error('Expected repository to be a string or array. Example: "micromatch"'));
      return;
    }

    if (isGitUrl(repo)) {
      resolve(repo);
      return;
    }

    if (isGitUrl(repo + '.git')) {
      resolve(repo + '.git');
      return;
    }

    if (isNameOnly(repo)) {
      getRepositoryUrl(repo, function(err, url) {
        if (err) {
          reject(err);
        } else {
          resolve(url + '.git');
        }
      });
      return;
    }

    if (!isValidRepoName(repo)) {
      reject(new Error('Expected options.repo to be in the format of "owner/name".'));
      return;
    }

    resolve(toRepository(repo));
  });
};

function toRepository(str) {
  return 'https://github.com/' + str + '.git';
}

function isNameOnly(str) {
  return !/\//.test(str);
}

function isValidRepoName(str) {
  return str.split('/').length === 2;
}
