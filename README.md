# gh-clone [![NPM version](https://badge.fury.io/js/gh-clone.svg)](http://badge.fury.io/js/gh-clone)  [![Build Status](https://travis-ci.org/jonschlinkert/gh-clone.svg)](https://travis-ci.org/jonschlinkert/gh-clone) 

> git clone a repo with only username/repo.

## Install globally with [npm](npmjs.org):

```bash
npm i -g gh-clone
```

## Usage

Let's say you want to clone [micromatch](https://github.com/jonschlinkert/micromatch):

```bash
$ clone jonschlinkert/micromatch <commands>
```

### flags

* `-r`|`--repo`: the repository to clone
* `-b`|`--brach`: the branch to clone
* `-d`|`--dest`: the local destination

**Example: branch**

Flags can be used in any order. If you want the `dev` branch of micromatch (when one exists):

```bash
$ clone jonschlinkert/micromatch -b dev
```

**Example: destination**

If you want to save to the `foo` directory

```bash
$ clone jonschlinkert/micromatch -d foo
```

**Example: branch and destination**

If you want to save the `dev` branch to the `foo` directory

```bash
$ clone jonschlinkert/micromatch -b dev -d foo
```

## Run tests
Install dev dependencies.

```bash
npm i -d && npm test
```


## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/gh-clone/issues)


## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2015 Jon Schlinkert  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on March 04, 2015._
