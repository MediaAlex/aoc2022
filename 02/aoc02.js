const fs = require('fs');
const sourcePath = './source.txt';

const rockScore = 1;
const paperScore = 2;
const scissorsScore = 3;

const lostScore = 0;
const drawScore = 3;
const winScore = 6;

const handShapesOpponent = {
    A: rockScore,
    B: paperScore,
    C: scissorsScore,
}

const handShapesYou = {
    X: rockScore,
    Y: paperScore,
    Z: scissorsScore,
}

const rules = {
    A: {
        Z: lostScore,
        Y: winScore,
        X: drawScore,
    },
    B: {
        Z: winScore,
        Y: drawScore,
        X: lostScore,
    },
    C: {
        Z: drawScore,
        Y: lostScore,
        X: winScore,
    }
}

const rulesSecretStrategy = {
    A: {
        Z: winScore,
        Y: drawScore,
        X: lostScore,
    },
    B: {
        Z: winScore,
        Y: drawScore,
        X: lostScore,
    },
    C: {
        Z: winScore,
        Y: drawScore,
        X: lostScore,
    }
}

const chooseShapeSecretStrategy = {
    A: {
        Z: paperScore,
        Y: rockScore,
        X: scissorsScore,
    },
    B: {
        Z: scissorsScore,
        Y: paperScore,
        X: rockScore,
    },
    C: {
        Z: rockScore,
        Y: scissorsScore,
        X: paperScore,
    }
}

function play(round) {
    const chosenHandShapeYou = handShapesYou[round[1]];
    console.log('opponents choose:', round[0]);
    console.log('my choose:', round[1]);
    console.log('shape score', chosenHandShapeYou);
    console.log('result score', rules[round[0]][round[1]]);
    console.log('round score', rules[round[0]][round[1]] + chosenHandShapeYou);
    console.log("  ");
    return rules[round[0]][round[1]] + chosenHandShapeYou;
}

function playSecretStrategy(round) {
    const chosenHandShapeYou = handShapesYou[round[1]];
    console.log('sest_opponents choose:', round[0]);
    console.log('sest_my choose:', round[1]);
    console.log('sest_shape score', chooseShapeSecretStrategy[round[0]][round[1]]);
    console.log('sest_result score', rulesSecretStrategy[round[0]][round[1]]);
    console.log('sest_round score', rulesSecretStrategy[round[0]][round[1]] + chooseShapeSecretStrategy[round[0]][round[1]]);
    console.log("  ");
    return rulesSecretStrategy[round[0]][round[1]] + chooseShapeSecretStrategy[round[0]][round[1]];
}

fs.readFile(sourcePath, 'utf8', (err, fileData) => {
    if (err) {
        console.error(err);
    }

    try {
    const rows = fileData.trim().split(/\r?\n/);
    const strategyGuide = rows.map(r => r.split(' '));
    let scoreSum = 0;
    let scoreSumSecretStrategy = 0;

    for (let index = 0; index < strategyGuide.length; index++) {
        scoreSum += play(strategyGuide[index]);
        scoreSumSecretStrategy += playSecretStrategy(strategyGuide[index]);
    }

    console.log('  ');
    console.log('  ');
    console.log('score sum: ', scoreSum);
    console.log('  ');
    console.log('score sum secret strategy: ', scoreSumSecretStrategy);

    } catch (err) {
    console.error(err);
    }
});
