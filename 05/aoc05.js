const fs = require('fs');
const sourcePath = './source.txt';

function transpose(arr) {
  const buffer = {};
  for (let i = 0; i < arr.length; i++) {
    const row = [];
    for (let j = 0; j < arr[i].length; j++) {
      const tmp = arr[i][j];
      if (/^[a-zA-Z]*$/.test(tmp)) {
        row.unshift({[j]: tmp});
      }
    }
    row.forEach((it => {
      const key = Object.keys(it)[0];
      const value = Object.values(it)[0];
      !!buffer[key] ? buffer[key].push(value) : buffer[key] = [value];
    }))
  }

  return [...Object.values(buffer)];
}

function transpileMoveCommand(moveText) {
  const parts = moveText.split(' ');
  return {count: parts[1], fromIndex: parts[3] - 1, toIndex: parts[5] - 1}
}

function moveWithCrateMover9000(crates, moveText) {
  const moveCommand = transpileMoveCommand(moveText);
  const movedCrates = crates[moveCommand.fromIndex].splice(0, moveCommand.count);
  crates[moveCommand.toIndex].unshift(...movedCrates.reverse());
}

function moveWithCrateMover9001(crates, moveText) {
  const moveCommand = transpileMoveCommand(moveText);
  const movedCrates = crates[moveCommand.fromIndex].splice(0, moveCommand.count);
  crates[moveCommand.toIndex].unshift(...movedCrates);
}

fs.readFile(sourcePath, 'utf8', (err, fileData) => {
  if (err) {
    console.error(err);
  }

  try {
    const sourceRows = fileData.trim().split(/\r?\n/);
    const sourceFirstRows = sourceRows.splice(0, 10);
    const crates = transpose(sourceFirstRows.map(it => it.split('')));
    // sourceRows.forEach(mt => moveWithCrateMover9000(crates, mt));
    sourceRows.forEach(mt => moveWithCrateMover9001(crates, mt));
    console.log('crates: ', crates.map(c => c[0]).join(''));
  } catch (err) {
    console.error(err);
  }
});
