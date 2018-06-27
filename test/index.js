const { readdir, readdirAsync, uidToName, getStat, chmod } = require('../');
const path = require('path');

readdir('/').then((files) => {
  files.map((Stats) => {
    console.log('Statss:1', Stats);
  });
})

getStat('/var').then((Stats) => {
  console.log('Stats', Stats.isDirectory());
  console.log('Stats', Stats);
})

readdirAsync('/var').then((files) => {
  console.log('files:', files);
})

uidToName().then((names) => {
  console.log('names:', names);
})

const file = path.join(__dirname, 'test.sh');

chmod(file, 777);

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