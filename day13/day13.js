import { readFile } from "fs";

function readInput(input) {
    const [points, folds] = input.split("\n\n");
    return [
        points
            .split("\n")
            .filter((x) => x !== "\n")
            .map((x) => x.split(",").map(Number)),
        folds.split("\n").map((x) => x.split(" ")[2].split("=")),
    ];
}

function fold(points, fold) {
    const folded = [];
    let [axis, coordinate] = fold;
    coordinate = Number(coordinate);
    console.log(axis, coordinate);
    for (let point of points) {
        if (axis === "x") {
            if (point[0] > coordinate) {
                folded.push([coordinate - (point[0] - coordinate), point[1]]);
            } else {
                folded.push([point[0], point[1]]);
            }
        }
        if (axis === "y") {
            if (point[1] > coordinate) {
                folded.push([point[0], coordinate - (point[1] - coordinate)]);
            } else {
                folded.push([point[0], point[1]]);
            }
        }
    }
    return folded;
}

readFile("./data.txt", "utf8", (err, data) => {
    let [points, folds] = readInput(data);
    for (let f of folds) {
        points = fold(points, f);
        console.log(
            `folding in ${JSON.stringify(f)}`,
            new Set(points.map((x) => x.join("->"))).size
        );
    }
});
