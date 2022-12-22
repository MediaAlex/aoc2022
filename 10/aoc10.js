const fs = require('fs');
const sourcePath = './source.txt';

const spriteStr = '###.....................................';

const getInstructionProps = (instruction) => {
    const [type, value] = instruction.split(' ');
    switch (type) {
        case 'noop':
            return {
                executions: 1,
                value: 0,
            };
        case 'addx':
            return {
                executions: 2,
                value: Number(value),
            };
        default:
            return null;
    }
}

function calcSignalStrengthSum(instructions) {
    let cycleNum = 0;
    let x = 1;
    let signalStrengthSum = 0;
    const spriteRow = spriteStr.split('');
    const crt = [];

    instructions.forEach(inst => {
        const instructionProps = getInstructionProps(inst);
        if (instructionProps) {
            for (let i = 0; i < instructionProps.executions; i++) {
                crt.push(spriteRow[cycleNum % 40]);
                cycleNum++;

                if (cycleNum % 40 === 20) {
                    signalStrengthSum = signalStrengthSum + (x * cycleNum);
                }
            }

            spriteRow.splice(x - 1, 3);
            x += instructionProps.value;
            spriteRow.splice(x - 1, 0, '#', '#', '#');
        }
    });

    for (let i = 0; i < crt.length; i += 40) {
        const crtRow = crt.slice(i, i + 40);
        console.log(crtRow.join(''));
    }

    return signalStrengthSum;
}

fs.readFile(sourcePath, 'utf8', (err, fileData) => {
    if (err) {
        console.error(err);
    }

    try {
        const fileRows = fileData.trim().split(/\r?\n/);
        const signalStrengthSum = calcSignalStrengthSum(fileRows);

        console.log('signalStrengthSum', signalStrengthSum);

    } catch (err) {
        console.error(err);
    }
});
