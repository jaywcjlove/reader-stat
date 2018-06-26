const fs = require('fs');
const path = require('path');
const nicki = require('nicki');

exports.getStat = async (currentPath, names) => {
  if (!names) names = await this.uidToName();
  return new Promise((resolve, reject) => {
    fs.stat(currentPath, (err, data) => {
      if (err) reject(err);
      else {
        if (names && names[data.uid]) {
          data.uidToName = names[data.uid];
        }
        data.path = currentPath;
        data.basename = path.basename(currentPath);
        data.extname = path.extname(data.basename);
        resolve(data);
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