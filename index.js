const fs = require('fs');
const path = require('path');
const nicki = require('nicki');
const Mode = require('stat-mode');
const deepExtend = require('deep-extend');

exports.readLink = (currentPath) => {
  return new Promise((resolve, reject) => {
    fs.readlink(currentPath, (err, stat) => {
      if (err) reject(err);
      else {
        resolve(stat);
      }
    })
  });
}

exports.getStat = async (currentPath, names) => {
  if (!names) names = await this.uidToName();
  return new Promise((resolve, reject) => {
    fs.lstat(currentPath, async (err, stat) => {
      if (err) reject(err);
      else {
        const mode = new Mode(stat);
        stat.extend = {
          modeNum: stat.mode,
          modeStr: mode.toString(),
          isSymbolicLink: mode.isSymbolicLink(),
          owner: { ...mode.owner },
          group: { ...mode.group },
          others: { ...mode.others },
        }
        if (mode.isSymbolicLink()) {
          const link = await this.readLink(currentPath);
          if (link) stat.extend.symbolicLinkPath = link;
        }
        if (names && names[stat.uid]) {
          stat.extend.uidToName = names[stat.uid];
        }
        stat.extend.path = currentPath;
        stat.extend.basename = path.basename(currentPath);
        stat.extend.extname = path.extname(stat.extend.basename);
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

exports.chmod = async (file, mode) => {
  if (typeof mode !== 'number' && typeof mode !== 'object') {
    throw new TypeError('Expected a number or object');
  }
  const stat = await this.getStat(file);
  delete stat.extend;
  let newMode;

  if (typeof mode === 'object') {
    const statMode = new Mode(stat);
    deepExtend(statMode, normalize(mode));
    newMode = statMode.stat.mode;
  } else {
    newMode = parseInt(mode, 8);
  }
  return new Promise((resolve, reject) => {
    fs.chmod(file, newMode, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function normalize(mode) {
  var called = false, newOne = {
    owner: {},
    group: {},
    others: {}
  };
  ['read', 'write', 'execute'].forEach(function (key) {
    if (typeof mode[key] === 'boolean') {
      newOne.owner[key] = mode[key];
      newOne.group[key] = mode[key];
      newOne.others[key] = mode[key];
      called = true;
    }
  });
  return called ? newOne : mode;
}