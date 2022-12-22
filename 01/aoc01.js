const fs = require('fs');
const sourcePath = './source.txt';

fs.readFile(sourcePath, 'utf8', (err, fileData) => {
    if (err) {
        console.error(err);
    }

    try {
    const rows = fileData.trim().split(/\r?\n/);
    const group = [];
    const elfsCalories = [];

    rows.forEach(row => {
        if (row.trim().length) {
            const cal =  Number(row.trim());
            if (isNaN(cal)) {
                console.warn('cal is not a number:', cal);
            } else {
                group.push(cal);
            }
        } else if (group.length) {
            elfsCalories.push(group.reduce((acc, curr) => {
                    acc += curr;
                return acc;
            }, 0))
            group.length = 0;
        }
    });

    elfsCalories.sort((a, b) => b - a)

    console.log('elfs calories:', elfsCalories);
    console.log('elfs top 3 max calories sum:', elfsCalories[0] + elfsCalories[1] + elfsCalories[2]);
    console.log('elfs max calories:', elfsCalories[0]);
    } catch (err) {
    console.error(err);
    }
});
