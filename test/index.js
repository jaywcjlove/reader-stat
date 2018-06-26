const { readdir, readdirAsync, uidToName, getStat } = require('../');

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