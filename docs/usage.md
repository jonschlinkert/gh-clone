
Let's say you want to clone [Assemble](https://github.com/assemble/assemble):

```bash
clone assemble/assemble
```

### flags

* `-r`|`--repo`: the repository to clone
* `-b`|`--brach`: the branch to clone
* `-d`|`--dest`: the local destination

Flags can be used in any order. If you want the v0.5.0 branch of Assemble:

```bash
clone assemble/assemble -b v0.5.0
```

If you want to save it to the `foo` directory

```bash
clone assemble/assemble -b v0.5.0 -d foo
```