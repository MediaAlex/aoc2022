const fs = require('fs');
const sourcePath = './source.txt';

const directions = {
    L: {
        x: -1,
        y: 0,
    },
    R: {
        x: 1,
        y: 0,
    },
    U: {
        x: 0,
        y: -1,
    },
    D: {
        x: 0,
        y: 1,
    },
}

class Knot {
    constructor() {
        this.x = 0;
        this.y = 0;
    };

    move(direction) {
        this.x += direction.x;
        this.y += direction.y;
    }

    get position() {
        return {x: this.x, y: this.y};
    }

    get positionStr() {
        return `${this.x}_${this.y}`;
    }
}

function moveRope(moveCommands, countKnots) {
    const knots = [];

    for (let i = 0; i < countKnots; i++) {
        knots.push(new Knot());
    }

    const head = knots[0];

    const visitedPositions = [knots[knots.length -1].positionStr];

    moveCommands.forEach(mc => {
        const [direction, steps] = mc.split(' ');

        for (let i = 0; i < Number(steps); i++) {
            head.move(directions[direction]);

            for (let j = 1; j < knots.length; j++) {
                const currentKnot = knots[j];
                const prevKnot = knots[j-1];
                const tailPos = currentKnot.position;
                const distanceY = prevKnot.y - tailPos.y;
                const distanceX = prevKnot.x - tailPos.x;

                if (Math.abs(distanceY) > 1 || Math.abs(distanceX) > 1) {
                    currentKnot.y = currentKnot.y + Math.sign(distanceY);
                    currentKnot.x = currentKnot.x + Math.sign(distanceX);
                }
            }

            visitedPositions.push(knots[knots.length -1].positionStr);
        }
    });

    return [...new Set(visitedPositions)];
}

fs.readFile(sourcePath, 'utf8', (err, fileData) => {
    if (err) {
        console.error(err);
    }

    try {
        const fileRows = fileData.trim().split(/\r?\n/);
        const allVisitedPositions2Knots = moveRope(fileRows, 2);
        const allVisitedPositions10Knots = moveRope(fileRows, 10);

        console.log('allVisitedPositions2Knots', allVisitedPositions2Knots);
        console.log('allVisitedPositions2Knots count', allVisitedPositions2Knots.length);
        console.log(' ');
        console.log('allVisitedPositions10Knots', allVisitedPositions10Knots);
        console.log('allVisitedPositions10Knots count', allVisitedPositions10Knots.length);
    } catch (err) {
        console.error(err);
    }
});
