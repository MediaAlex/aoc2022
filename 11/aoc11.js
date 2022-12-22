const fs = require('fs');
const sourcePath = './source.txt';

fs.readFile(sourcePath, 'utf8', (err, fileData) => {
    if (err) {
        console.error(err);
    }

    try {
        const fileRows = fileData.trim().split(/\r?\n/);

        console.log('fileRows', fileRows);

    } catch (err) {
        console.error(err);
    }
});
