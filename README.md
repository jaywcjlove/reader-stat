reader-stat
===
<!--rehype:style=display: flex; height: 230px; align-items: center; justify-content: center; font-size: 38px;-->

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-048754?logo=buymeacoffee)](https://jaywcjlove.github.io/#/sponsor)
[![Downloads](https://img.shields.io/npm/dm/reader-stat.svg?style=flat)](https://www.npmjs.com/package/reader-stat)
[![NPM version](https://img.shields.io/npm/v/reader-stat.svg?style=flat)](https://npmjs.org/package/reader-stat)
[![Build](https://github.com/jaywcjlove/reader-stat/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/reader-stat/actions/workflows/ci.yml)

Reads the directory files and adds the [stat](http://nodejs.cn/api/fs.html#fs_class_fs_stats) info.

## Install

```bash
npm install reader-stat --save
```

## Usage

### readdir

```js
const { readdir } = require('reader-stat');

readdir('/').then((files) => {
  files.map((Stats) => {
    console.log('Stats', Stats.isDirectory());
    // output => true
    console.log('Stats:', Stats);
    // output =>
    // Stats {
    //   dev: 16777220,
    //   mode: 41453,
    //   nlink: 26,
    //   uid: 0,
    //   gid: 0,
    //   rdev: 0,
    //   blksize: 4194304,
    //   ino: 18208078,
    //   size: 832,
    //   blocks: 0,
    //   atimeMs: 1529987103353.0234,
    //   mtimeMs: 1506403970873.939,
    //   ctimeMs: 1506403970873.939,
    //   birthtimeMs: 1506402494000,
    //   atime: 2018-06-26T04:25:03.353Z,
    //   mtime: 2017-09-26T05:32:50.874Z,
    //   ctime: 2017-09-26T05:32:50.874Z,
    //   birthtime: 2017-09-26T05:08:14.000Z,
    //   extend: { 
    //     modeNum: 41453,
    //     modeStr: 'lrwxr-xr-x',
    //     isSymbolicLink: true,
    //     isSymbolicLinkDir: true,
    //     isSymbolicLinkFile: false,
    //     symbolicLinkPath: 'private/var',
    //     owner: { read: true, write: true, execute: true },
    //     group: { read: true, write: false, execute: true },
    //     others: { read: true, write: false, execute: true },
    //     uidToName: 'root',
    //     path: '/var',
    //     fullpath: '/private/var',
    //     basename: 'var',
    //     extname: ''
    //   }
    // }  
  });
})
```

### getStat

Read a single directory or file the [stat](http://nodejs.cn/api/fs.html#fs_class_fs_stats) info.

```js
const { getStat } = require('reader-stat');

getStat('/var').then((Stats) => {
  console.log('Stats', Stats.isDirectory());
  console.log('Stats', Stats.isFile());
  // output => true
  console.log('Stats', Stats);
  // output =>
  // Stats {
  //   dev: 16777220,
  //   mode: 41453,
  //   nlink: 26,
  //   uid: 0,
  //   gid: 0,
  //   rdev: 0,
  //   blksize: 4194304,
  //   ino: 18208078,
  //   size: 832,
  //   blocks: 0,
  //   atimeMs: 1529987103353.0234,
  //   mtimeMs: 1506403970873.939,
  //   ctimeMs: 1506403970873.939,
  //   birthtimeMs: 1506402494000,
  //   atime: 2018-06-26T04:25:03.353Z,
  //   mtime: 2017-09-26T05:32:50.874Z,
  //   ctime: 2017-09-26T05:32:50.874Z,
  //   birthtime: 2017-09-26T05:08:14.000Z,
  //   extend: { 
  //     modeNum: 41453,
  //     modeStr: 'lrwxr-xr-x',
  //     isSymbolicLink: true,
  //     isSymbolicLinkDir: true,
  //     isSymbolicLinkFile: false,
  //     symbolicLinkPath: 'private/var',
  //     owner: { read: true, write: true, execute: true },
  //     group: { read: true, write: false, execute: true },
  //     others: { read: true, write: false, execute: true },
  //     uidToName: 'root',
  //     path: '/var',
  //     fullpath: '/private/var',
  //     basename: 'var',
  //     extname: ''
  //   }
  // }
})
```

### readdirAsync

Get all the file names in the directory.

```js
const { readdirAsync } = require('reader-stat');

readdirAsync('/var').then((Stats) => {
  console.log('Stats', Stats);
  // output =>
  // [
  //   'agentx',
  //   'at',
  //   'audit',
  //   'backups',
  //   'db',
  //   'empty',
  //   'folders',
  //   'install',
  //   'jabberd',
  //   ...
  // ]
})
```

### uidToName

```js
const { uidToName } = require('reader-stat');

uidToName().then((Users) => {
  console.log('Users:', Users);
  // output =>
  // {
  //   '0': 'root',
  //   '1': 'daemon',
  //   '4': '_uucp',
  //   '13': '_taskgated',
  //   '24': '_networkd',
  //   '25': '_installassistant',
  //   '26': '_lp',
  //   '27': '_postfix',
  //   ....
  // }
})


uidToName(0).then((User) => {
  console.log('User:', User);
  // output => root
})
```

### chmod

```js
const { chmod } = require('reader-stat');
const file = path.join(__dirname, 'test.sh');

chmod(file, 777);
```

Or you can use object instead of number, see [stat-mode](https://github.com/TooTallNate/stat-mode)

```js
chmod(file, {
  owner: {
    read: true,
    write: true,
    execute: true
  },
  group: {
    read: true,
    write: true,
    execute: true
  },
  others: {
    read: true,
    write: true,
    execute: true
  }
});
```

You can also write a object Simply when the same for each

```js
chmod(file, {
  read: true
});

// equals

chmod(file, {
  owner: {
    read: true
  },
  group: {
    read: true
  },
  others: {
    read: true
  }
});
```

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/jaywcjlove/reader-stat/graphs/contributors">
  <img src="https://jaywcjlove.github.io/reader-stat/CONTRIBUTORS.svg" />
</a>

Made with [github-action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

MIT licensed