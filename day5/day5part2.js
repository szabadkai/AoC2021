import { readFile } from "fs";
import { deflateRaw } from "zlib";

function readInput(input) {
    return input
        .split("\n")
        .map((x) =>
            x.split(" -> ").map((x) => x.split(",").map((x) => parseInt(x)))
        );
}

function walkLine([x, y], [x2, y2]) {
    const dx = x2 - x;
    const dy = y2 - y;
    const points = [];

    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    for (let i = 0; i <= steps; i++) {
        const xStep = dx / steps;
        const yStep = dy / steps;
        points.push([x + xStep * i, y + yStep * i]);
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
        const points = walkLine([x, y], [x2, y2]);
        merge(coordinates, points);
    }
    // draw(coordinates);
    console.log(
        Object.keys(coordinates).length,
        Object.values(coordinates).filter((x) => x > 1).length
    );
});
