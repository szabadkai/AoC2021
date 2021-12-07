import { readFile } from "fs";

function readInput(input) {
    return input.split(",").map((x) => parseInt(x, 10));
}

readFile("./data.txt", "utf8", (err, data) => {
    const input = readInput(data);
    const minX = Math.min(...input);
    const maxX = Math.max(...input);
    console.log(`min: ${minX}, ${maxX}`);
    let minFuel = Number.POSITIVE_INFINITY;
    let minPlace = 0;
    for (let i = minX; i <= maxX; i++) {
        let sum = 0;
        for (let fish of input) {
            // console.log(i, fish, Math.abs(fish - i));
            sum += Math.abs(fish - i);
        }
        if (sum < minFuel) {
            minFuel = sum;
            minPlace = i;
        }
    }
    console.log("Found new min fuel: ", minFuel, minPlace);
});
