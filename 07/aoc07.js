const fs = require('fs');
const sourcePath = './source.txt';

const commandStart = '$';
const goTo = 'cd';
const listDir = 'ls';
const rootDir = '/';
const parentDir = '..';
const dir = 'dir';

const fileStructure = {};

let currentPath = [];
let currentDirectory = fileStructure;

let directorySizes = {};

const commands = {
  cd(path) {
    console.log('cd', path);
    if (path === rootDir) {
      currentDirectory = fileStructure;
      currentPath = [];
    } else if (path === parentDir) {
      currentDirectory = getParentDir();
    } else if (!!path) {
      const newDirectory = currentDirectory[path];
      if (newDirectory) {
        currentPath.push(path);
        currentDirectory = newDirectory;
      }
    }
    console.log(' ');
  },
  ls() {
    for (const prop in fileStructure) {
      const value = fileStructure[prop];
      if (typeof value === 'object') {
        console.log('dir ', value);
      }
      if (typeof value === 'number') {
        console.log(value, prop);
      }
    }
    console.log(' ');
  }
}

function getParentDir() {
  currentPath.pop();
  if (!currentPath.length) {
    return fileStructure
  }

  return currentPath.reduce((acc, currentKey) => {
    if (typeof acc[currentKey] === 'object') {
      return acc[currentKey];
    }
    return null;
  }, fileStructure);
}

function buildFileStructure(sourceRows) {
  sourceRows.forEach((row) => {
    const rowList = row.split(' ');
    if (rowList[0] === commandStart && rowList[1] === goTo && !!rowList[2]) {
      if (rowList[2] === rootDir) {
        commands.cd(rootDir);
      } else if (rowList[2] === parentDir) {
        commands.cd(parentDir);
      } else if (!!rowList[2]) {
        commands.cd(rowList[2]);
      }
    } else if (rowList[0] === dir && !!rowList[1] && !currentDirectory[rowList[1]]) {
      console.log('create dir: ', rowList[1]);
      currentDirectory[rowList[1]] = {};
    } else if (!isNaN(Number(rowList[0])) && !!rowList[1]) {
      console.log('create file: ', rowList[0], rowList[1]);
      currentDirectory[rowList[1]] = Number(rowList[0]);
    }
  })
}

function setTotalSizesForDirs(dir, key) {
  const size = Object.entries(dir).reduce((acc, [key, value]) => {
    if (typeof value === 'object') {
      return acc + setTotalSizesForDirs(value, key);
    } else if (typeof value === 'number') {
      return acc + value;
    }
    return acc;
    console.error('Not valid value to sum total dir size.');
  }, 0);

  // because file tree is buggy, dirs are set multiple times
  if (directorySizes[key]) {
    console.error('Directory already exists:', key);
    directorySizes[`${key}_${size}`] = size;
  } else {
    directorySizes[key] = size;
  }

  return size;
}

fs.readFile(sourcePath, 'utf8', (err, fileData) => {
  if (err) {
    console.error(err);
  }

  try {
    const sourceRows = fileData.trim().split(/\r?\n/);
    buildFileStructure(sourceRows); // is buggy, need to be fixed
    commands.cd(rootDir);
    setTotalSizesForDirs(fileStructure, 'root');
    const fileSystemSize = 70000000;
    const requiredSize = 30000000;

    const sumOfDirSizesLessThanHoundretThousend = Object.values(directorySizes).reduce((acc, currentValue) => {
      if (currentValue <= 100000) {
        return acc + currentValue;
      }
      return acc;
    }, 0);

    const sizesBiggerNeededfreeSpace = Object.values(directorySizes).filter(it => it >= (requiredSize - (fileSystemSize - directorySizes['root'])));
    sizesBiggerNeededfreeSpace.sort((a, b) => a - b);

    console.log(' ');
    console.log(' ');
    console.log('fileStructure: ', fileStructure);
    console.log(' ');
    console.log('directorySizes: ', directorySizes);
    console.log(' ');
    console.log('sumOfDirSizesLessThanHoundretThousend: ', sumOfDirSizesLessThanHoundretThousend);
    console.log(' ');
    console.log('sizesBiggerNeededfreeSpace ', sizesBiggerNeededfreeSpace);
    console.log(' ');
    console.log('smallest size above needed free space: ', sizesBiggerNeededfreeSpace[0]);
    // console.log('currentDirectory: ', currentDirectory);
  } catch (err) {
    console.error(err);
  }
});
