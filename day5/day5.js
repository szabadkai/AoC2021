import { readFile } from "fs";
import { deflateRaw } from "zlib";

function readInput(input) {
    return input
        .split("\n")
        .map((x) =>
            x.split(" -> ").map((x) => x.split(",").map((x) => parseInt(x)))
        );
}

const isStraight = ([x, y], [x2, y2]) => x === x2 || y === y2;

function walkLine([x, y], [x2, y2]) {
    const dx = x2 - x;
    const dy = y2 - y;
    const points = [];
    if (dx === 0) {
        if (dy > 0) {
            for (let i = y; i <= y2; i++) {
                points.push([x, i]);
            }
        } else {
            for (let i = y; i >= y2; i--) {
                points.push([x, i]);
            }
        }
    } else {
        if (dx > 0) {
            for (let i = x; i <= x2; i++) {
                points.push([i, y]);
            }
        } else {
            for (let i = x; i >= x2; i--) {
                points.push([i, y]);
            }
        }
    }

    return points;
}
/**
 * @param {Map} dictionary
 * @param {Array} points
 */
const merge = (dictionary, points) => {
    points.forEach(([x, y]) => {
        if (!dictionary[[x, y]]) {
            dictionary[[x, y]] = 1;
        } else {
            dictionary[[x, y]]++;
        }
    });
};

function draw(dictionary) {
    const minX = Math.min(
        ...Object.keys(dictionary).map((x) => x.split(",")[0])
    );
    const maxX = Math.max(
        ...Object.keys(dictionary).map((x) => x.split(",")[0])
    );
    const minY = Math.min(
        ...Object.keys(dictionary).map((x) => x.split(",")[1])
    );
    const maxY = Math.max(
        ...Object.keys(dictionary).map((x) => x.split(",")[1])
    );

    for (let y = minY; y <= maxY; y++) {
        const line = [];
        for (let x = minX; x <= maxX; x++) {
            line.push(dictionary[[x, y]] || ".");
        }
        console.log(line.join(""));
    }
}

readFile("./data.txt", "utf8", (err, data) => {
    const input = readInput(data);
    const coordinates = {};
    for (const [[x, y], [x2, y2]] of input) {
        if (isStraight([x, y], [x2, y2])) {
            const points = walkLine([x, y], [x2, y2]);
            merge(coordinates, points);
        }
    }
    console.log(
        Object.keys(coordinates).length,
        Object.values(coordinates).filter((x) => x > 1).length
    );
});
