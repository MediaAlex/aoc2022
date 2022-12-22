const fs = require('fs');
const sourcePath = './source.txt';

const countVisibleTreesWithinGrid = (grid) => {
    const highestInRowLeft = [];
    const highestInColTop = [];
    const highestInRowRight = [];
    const highestInColBottom = [];

    for (let indexRow = 0; indexRow < grid.length; indexRow++) {
        const row = grid[indexRow];
        highestInRowLeft[indexRow] = [];
        for (let indexCol = 0; indexCol < row.length; indexCol++) {
            if (!Array.isArray(highestInColTop[indexCol])) {
                highestInColTop[indexCol] = [];
            }
            const currentTree = {
                x: indexCol,
                y: indexRow,
                height: row[indexCol],
            };
            const foundIndexForColTop = highestInColTop[indexCol].findIndex(t => t.height >= currentTree.height);
            const foundIndexForRowLeft = highestInRowLeft[indexRow].findIndex(t => t.height >= currentTree.height);

            if (foundIndexForColTop === -1) {
                highestInColTop[indexCol].push(currentTree);
            }

            if (foundIndexForRowLeft === -1) {
                highestInRowLeft[indexRow].push(currentTree);
            }
        }
    }

    for (let indexRow = grid.length -1; indexRow >= 0; indexRow--) {
        const row = grid[indexRow];
        highestInRowRight[indexRow] = [];
        for (let indexCol = row.length -1; indexCol >= 0; indexCol--) {
            const currentTree = {
                x: indexCol,
                y: indexRow,
                height: row[indexCol],
            };
            if (!Array.isArray(highestInColBottom[indexCol])) {
                highestInColBottom[indexCol] = [];
            }
            const foundIndexForColBottom = highestInColBottom[indexCol].findIndex(t => t.height >= currentTree.height);
            const foundIndexForRowRight = highestInRowRight[indexRow].findIndex(t => t.height >= currentTree.height);

            if (foundIndexForColBottom === -1) {
                highestInColBottom[indexCol].push(currentTree)
            }

            if (foundIndexForRowRight === -1) {
                highestInRowRight[indexRow].push(currentTree);
            }
        }
    }

    const cleanedHighestInColTop = highestInColTop.flatMap(it => it);
    const cleanedHighestInColBottom = highestInColBottom.flatMap(it => it);
    const cleanedHighestInRowLeft = highestInRowLeft.flatMap(it => it);
    const cleanedHighestInRowRight = highestInRowRight.flatMap(it => it);

    const allHeighestList = [...cleanedHighestInColTop, ...cleanedHighestInColBottom, ...cleanedHighestInRowLeft, ...cleanedHighestInRowRight];

    const uniqueHighestTrees = [...new Set(allHeighestList.map(item => `${item.x}_${item.y}`))];

    return uniqueHighestTrees;
}

const calcHighestScenicScore = (visibleTrees, grid) => {
  let score = 0;

    visibleTrees.forEach((t) => {
        const [x, y] = t.split('_').map(it => Number(it));
        const height = grid[y][x];
        const row = grid[y];
        const col = grid.map(r => r[x]);
        let scoreToTop = 0;
        let scoreToRight = 0;
        let scoreToBottom = 0;
        let scoreToLeft = 0;

        for (let i = x - 1; i >= 0; i--) {
            if (row[i] <= height) {
                scoreToLeft++;
            }
            if (row[i] === height) {
                break;
            }
        }

        for (let i = x + 1; i < row.length; i++) {
            if (row[i] <= height) {
                scoreToRight++;
            }
            if (row[i] === height) {
                break;
            }
        }

        for (let i = y - 1; i >= 0; i--) {
            if (col[i] <= height) {
                scoreToTop++;
            }
            if (col[i] === height) {
                break;
            }
        }

        for (let i = y + 1; i < col.length; i++) {
            if (col[i] <= height) {
                scoreToBottom++;
            }
            if (col[i] === height) {
                break;
            }
        }

        const totalScoreCurrentTree = scoreToTop * scoreToRight * scoreToBottom * scoreToLeft;

        if (score < totalScoreCurrentTree) {
            score = totalScoreCurrentTree;
        }
    });

  return score;
}

fs.readFile(sourcePath, 'utf8', (err, fileData) => {
    if (err) {
        console.error(err);
    }

    try {
        const fileRows = fileData.trim().split(/\r?\n/);
        const grid = fileRows.map(row => row.split(''));
        const visibleTrees = countVisibleTreesWithinGrid(grid);
        const countVisibleTrees = visibleTrees.length;
        const highestScenicScore = calcHighestScenicScore(visibleTrees, grid);

        console.log('countVisibleTrees', countVisibleTrees);
        console.log('highestScenicScore', highestScenicScore);
    } catch (err) {
        console.error(err);
    }
});
