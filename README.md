# gh-clone [![NPM version](https://badge.fury.io/js/gh-clone.svg)](http://badge.fury.io/js/gh-clone)  [![Build Status](https://travis-ci.org/jonschlinkert/gh-clone.svg)](https://travis-ci.org/jonschlinkert/gh-clone)

> git clone a repo with only username/repo.

## Install

Install globally with [npm](https://www.npmjs.com/)

```sh
$ npm i -g gh-clone
```

## Usage

Let's say you want to clone [micromatch](https://github.com/jonschlinker/micromatch):

```sh
$ gh-clone [owner/repo] <commands>
```

### Examples

**owner/repo**

You can pass github owner name/repo:

```sh
$ gh-clone jonschlinkert/micromatch
```

**repo**

If you pass the repository name only, `gh-clone` will resolve the git url from the `package.json` hosted on npm.

```sh
$ gh-clone micromatch
```

### flags

* `-r`|`--repo`: the repository to clone
* `-b`|`--branch`: the branch to clone
* `-d`|`--dest`: the local destination

**Example: branch**

Flags can be used in any order. If you want the `dev` branch of micromatch (when one exists):

```sh
$ gh-clone jonschlinker/micromatch -b dev
```

**Example: destination**

If you want to save to the `foo` directory

```sh
$ gh-clone jonschlinker/micromatch -d foo
```

**Example: branch and destination**

If you want to save the `dev` branch to the `foo` directory

```sh
$ gh-clone jonschlinker/micromatch -b dev -d foo
```

## Related

* [first-commit-date](https://www.npmjs.com/package/first-commit-date): Returns a JavaScript date object with the date and time of a git repository's first… [more](https://www.npmjs.com/package/first-commit-date) | [homepage](https://github.com/jonschlinkert/first-commit-date)
* [get-first-commit](https://www.npmjs.com/package/get-first-commit): Returns a git repository's first commit as a JavaScript object. | [homepage](https://github.com/jonschlinkert/get-first-commit)
* [github-base](https://www.npmjs.com/package/github-base): Base methods for creating node.js apps that work with the GitHub API. | [homepage](https://github.com/jonschlinkert/github-base)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/gh-clone/issues/new).

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2015 Jon Schlinkert
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on November 22, 2015._