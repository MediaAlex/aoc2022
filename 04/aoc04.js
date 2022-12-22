const fs = require('fs');
const sourcePath = './source.txt';

const calcOneRangeFullyContainsOther = (elvesSections) => {
  let count = 0;

  elvesSections.forEach(ep => {
    const split = ep.split(',')
      .map(se => {
        return se.split('-')
      })

    if (Number(split[0][0]) <= Number(split[1][0]) && Number(split[0][1]) >= Number(split[1][1])) {
      console.log('2nd contains in 1st', split);
      count++;
    } else if (Number(split[1][0]) <= Number(split[0][0]) && Number(split[1][1]) >= Number(split[0][1])) {
      console.log('1st contains in 2nd', split);
      count++;
    }
  });

  return count;
}

const calcOneRangePartlyContainsOther = (elvesSections) => {
  let count = 0;

  elvesSections.forEach(ep => {
    const split = ep.split(',')
      .map(se => {
        return se.split('-')
      })

    if (inRange(Number(split[1][0]), Number(split[0][0]), Number(split[0][1]))) {
      console.log('1st num in 2nd range contains in 1st range', split);
      count++;
    } else if (inRange(Number(split[1][1]), Number(split[0][0]), Number(split[0][1]))) {
      console.log('2nd num in 2nd range contains in 1st range', split);
      count++;
    } else if (inRange(Number(split[0][0]), Number(split[1][0]), Number(split[1][1]))) {
      console.log('1st num in 1st range contains in 2nd range', split);
      count++;
    } else if (inRange(Number(split[0][1]), Number(split[1][0]), Number(split[1][1]))) {
      console.log('2nd num in 1st range contains in 2nd range', split);
      count++;
    }
  });

  return count;
}

function inRange(x, min, max) {
  return x >= min && x <= max;
}

fs.readFile(sourcePath, 'utf8', (err, fileData) => {
  if (err) {
    console.error(err);
  }

  try {
    const elvesSections = fileData.trim().split(/\r?\n/);
    const countFullyContained = calcOneRangeFullyContainsOther(elvesSections);
    const countPartlyContained = calcOneRangePartlyContainsOther(elvesSections);

    console.log('Count one range fully contain the other: ', countFullyContained);
    console.log('Count one range partly contain the other: ', countPartlyContained);
  } catch (err) {
    console.error(err);
  }
});
