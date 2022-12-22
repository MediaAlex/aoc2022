const fs = require('fs');
const sourcePath = './source.txt';

function alphabetPosition(char) {
  const code = char.charCodeAt(0)
  if (code > 64 && code < 91) {
    return code - 64 + 26;
  }
  if (code > 96 && code < 123) {
    return code - 96;
  }

  return null;
}

function getAllItemTypesInBothCompartments(rucksacks) {
  return rucksacks.flatMap(r => {
    const c1 = r[0].split('');
    const c2 = r[1].split('');
    const typesBuffer = []

    c1.forEach((ch, index) => {
      const idx = c2.indexOf(ch);
      if (idx > -1) {
        typesBuffer.push(ch)
      }
    })

    console.log('itemTypesInBothCompartments: ', [...new Set(typesBuffer)]);

    return [...new Set(typesBuffer)];
  })
}

function getAllItemTypesAsBages(rucksacks) {
  const itemTypeBuffer = [];
  for (let i = 0; i < rucksacks.length; i = i + 3) {
    const group = rucksacks.slice(i, i + 3).map(it => it.join(''));
    const e1 = group[0].split('');
    const e2 = group[1];
    const e3 = group[2];
    const itemTypeGroupBuffer = [];

    e1.forEach((it => {
      if (e2.includes(it) && e3.includes(it)) {
        itemTypeGroupBuffer.push(it);
      }
    }));

    itemTypeBuffer.push(... new Set(itemTypeGroupBuffer));

    console.log('itemTypeGroupBuffer',itemTypeGroupBuffer);
  }

  console.log('itemTypeBuffer', itemTypeBuffer);

  return itemTypeBuffer;
}

fs.readFile(sourcePath, 'utf8', (err, fileData) => {
  if (err) {
    console.error(err);
  }

  try {
    const rucksacks = fileData.trim().split(/\r?\n/).map(r => [r.substring(0, r.length / 2), r.substring(r.length / 2)]);

    const itemTypesInBothCompartments = getAllItemTypesInBothCompartments(rucksacks);
    const itemTypesAsBadges = getAllItemTypesAsBages(rucksacks);

    const priorities = itemTypesInBothCompartments.map(c => alphabetPosition(c));
    const prioritiesAsBadges = itemTypesAsBadges.map(c => alphabetPosition(c));

    console.log('prioritiesAsBadges: ', prioritiesAsBadges);
    console.log('sum of prioritiesAsBadges: ', prioritiesAsBadges.reduce((acc, currentValue) => acc + currentValue, 0));

    console.log('priorities: ', priorities);
    console.log('sum of priorities: ', priorities.reduce((acc, currentValue) => acc + currentValue, 0));

  } catch (err) {
    console.error(err);
  }
});
