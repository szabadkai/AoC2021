import { readFile } from "fs";

function readInput(input) {
    const [sample, data] = [
        input.split("\n\n")[0],
        input
            .split("\n\n")[1]
            .split("\n")
            .map((x) => x.split("")),
    ];
    return [sample, data];
}

function getCoord(input, x, y) {
    const pixels = [];
    for (let k = -1; k < 2; k++) {
        for (let l = -1; l < 2; l++) {
            if (
                input[y + k] !== undefined &&
                input[y + k][x + l] !== undefined
            ) {
                pixels.push(input[y + k][x + l] === "." ? 0 : 1);
            } else {
                pixels.push(0);
            }
        }
    }
    // console.log("pixels ", x, y, pixels, parseInt(pixels.join(""), 2));
    return parseInt(pixels.join(""), 2);
}

function enhance(input, sample, grow) {
    const [mX, mY] = [input[0].length, input.length];
    const output = [];
    if (grow) {
        for (let y = -grow; y < mY + grow; y++) {
            output.push([]);
            for (let x = -grow; x < mX + grow; x++) {
                const coord = getCoord(input, x, y);
                output[y + grow].push(sample[coord]);
            }
        }
    } else {
        for (let y = 1; y < mY - 1; y++) {
            output.push([]);
            for (let x = 1; x < mX - 1; x++) {
                const coord = getCoord(input, x, y);
                output[y - 1].push(sample[coord]);
            }
        }
    }

    return output;
}

readFile("./data.txt", "utf8", (err, data) => {
    let [sample, input] = readInput(data);

    for (let i = 1; i <= 50; i++) {
        input = enhance(input, sample, (i % 2) * 10);
    }
    console.log(input.map((x) => x.join("")).join("\n"));
    console.log(
        input
            .map((y) =>
                y.map((x) => (x === "#" ? 1 : 0)).reduce((a, b) => a + b)
            )
            .reduce((a, b) => a + b)
    );
});
