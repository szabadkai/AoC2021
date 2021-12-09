import { readFile } from "fs";

function readInput(input) {
    return input.split("\n").map((x) => x.split("").map(Number));
}

// coordinate exists in the 2D array
function exists(input, y, x) {
    return input[y] && input[y][x] !== undefined;
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
    return minimums;
}

readFile("./data.txt", "utf8", (err, data) => {
    const input = readInput(data);
    console.log(
        findLocalMin(input)
            .map((x) => x + 1)
            .reduce((a, b) => a + b, 0)
    );
});
