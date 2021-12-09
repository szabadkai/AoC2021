import { readFile } from "fs";

function readInput(input) {
    return input.split("\n").map((x) => x.split("").map(Number));
}

// coordinate exists in the 2D array
function exists(input, y, x) {
    return input[y] && input[y][x] !== undefined;
}

function expandBasin(input, coordinate) {
    console.log(`Expanding basin at ${coordinate}`);
    const basin = new Set();
    const checkNext = [coordinate];
    while (checkNext.length > 0) {
        const [y, x] = checkNext.pop();
        if (
            exists(input, y, x + 1) &&
            input[y][x + 1] !== 9 &&
            !basin.has(`${y} ${x + 1}`)
        ) {
            basin.add(`${y} ${x + 1}`);
            checkNext.push([y, x + 1]);
        }
        if (
            exists(input, y, x - 1) &&
            input[y][x - 1] !== 9 &&
            !basin.has(`${y} ${x - 1}`)
        ) {
            basin.add(`${y} ${x - 1}`);
            checkNext.push([y, x - 1]);
        }
        if (
            exists(input, y + 1, x) &&
            input[y + 1][x] !== 9 &&
            !basin.has(`${y + 1} ${x}`)
        ) {
            basin.add(`${y + 1} ${x}`);
            checkNext.push([y + 1, x]);
        }
        if (
            exists(input, y - 1, x) &&
            input[y - 1][x] !== 9 &&
            !basin.has(`${y - 1} ${x}`)
        ) {
            basin.add(`${y - 1} ${x}`);
            checkNext.push([y - 1, x]);
        }
    }
    return basin;
}

// finds the local minimum values in a 2D array
function findLocalMin(input) {
    const minimums = [];
    const coordinates = [];
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (
                (!exists(input, y, x + 1) || input[y][x] < input[y][x + 1]) &&
                (!exists(input, y, x - 1) || input[y][x] < input[y][x - 1]) &&
                (!exists(input, y + 1, x) || input[y][x] < input[y + 1][x]) &&
                (!exists(input, y - 1, x) || input[y][x] < input[y - 1][x])
            ) {
                minimums.push(input[y][x]);
                coordinates.push([y, x]);
            }
        }
    }
    return coordinates;
}

readFile("./data.txt", "utf8", (err, data) => {
    const input = readInput(data);
    const checkedBasins = new Set();
    for (let min of findLocalMin(input)) {
        const basin = expandBasin(input, min);
        const basintag = [...basin].sort().join(" | ");
        if (!checkedBasins.has(basintag)) {
            checkedBasins.add(basintag);
        }
    }
    console.log(checkedBasins);
    console.log(
        [...checkedBasins]
            .map((x) => x.split(" | ").length)
            .sort((a, b) => b - a)
            .slice(0, 3)
            .reduce((a, b) => a * b)
    );
});
