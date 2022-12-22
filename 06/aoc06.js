const fs = require('fs');
const sourcePath = './source.txt';

function getFirstIndexOfDistinctChars(text, charsCount) {
  for (let i = 0; i < text.length; i++) {
    const charsSubset = text.substring(i, i + charsCount);
    const uniqueChars = [...new Set(charsSubset)];

    if (uniqueChars.length === charsCount) {
      return i + charsCount;
    }
  }
}

fs.readFile(sourcePath, 'utf8', (err, fileData) => {
  if (err) {
    console.error(err);
  }

  try {
    const sourceRow = fileData.trim();
    const firstIndexOfFourDistinctChars = getFirstIndexOfDistinctChars(sourceRow, 4);
    const firstIndexOfFourteenDistinctChars = getFirstIndexOfDistinctChars(sourceRow, 14);
    console.log('firstIndexOfFourDistinctChars: ', firstIndexOfFourDistinctChars);
    console.log('firstIndexOfFourteenDistinctChars: ', firstIndexOfFourteenDistinctChars);
  } catch (err) {
    console.error(err);
  }
});
