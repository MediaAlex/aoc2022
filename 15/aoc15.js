const fs = require('fs');
const sourcePath = './source.txt';

fs.readFile(sourcePath, 'utf8', (err, fileData) => {
  if (err) {
    console.error(err);
  }

  try {
    const sourceRows = fileData.trim().split(/\r?\n/);

    console.log('crates: ', sourceRows);
  } catch (err) {
    console.error(err);
  }
});
