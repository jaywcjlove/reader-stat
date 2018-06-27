const fs = require('fs');
const path = require('path');
const nicki = require('nicki');
const Mode = require('stat-mode');

exports.getStat = async (currentPath, names) => {
  if (!names) names = await this.uidToName();
  return new Promise((resolve, reject) => {
    fs.lstat(currentPath, (err, stat) => {
      if (err) reject(err);
      else {
        const mode = new Mode(stat);
        if (names && names[stat.uid]) {
          stat.uidToName = names[stat.uid];
        }
        stat.mode = {
          number: stat.mode,
          isSymbolicLink: mode.isSymbolicLink(),
          string: mode.toString(),
          owner: { ...mode.owner },
          group: { ...mode.group },
          others: { ...mode.others },
        };
        // stat.modeStr = mode.toString();
        stat.path = currentPath;
        stat.basename = path.basename(currentPath);
        stat.extname = path.extname(stat.basename);
        resolve(stat);
      };
    })
  });
}
exports.readdirAsync = (dirPath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, filenames) => {
      if (err) reject(err);
      else resolve(filenames);
    });
  });
}
exports.uidToName = (id) => {
  return new Promise((resolve, reject) => {
    nicki((err, names) => {
      if (err) reject(err);
      else if (id || id === 0) {
        resolve(names[id]);
      } else resolve(names);
    });
  });
}
exports.readdir = (dirPath) => {
  return this.readdirAsync(dirPath).then(async (filenames) => {
    const names = await this.uidToName();
    return Promise.all(filenames.map((filename) => {
      return this.getStat(path.join(dirPath, filename), names);
    }));
  })
}