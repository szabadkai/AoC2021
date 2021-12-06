import { readFile } from "fs";

const cycle = { 8: 7, 7: 6, 6: 5, 5: 4, 4: 3, 3: 2, 2: 1, 1: 0, 0: 6 };

function readInput(input) {
    return input.split(",").map((x) => parseInt(x, 10));
}

function runCycle(fish) {
    const newFish = [];
    return [
        ...fish.map((x) => {
            if (x === 0) {
                newFish.push(8);
            }
            return cycle[x];
        }),
        ...newFish,
    ];
}

readFile("./data.txt", "utf8", (err, data) => {
    const input = readInput(data);
    let fish = [...input];
    for (let i = 0; i < 80; i++) {
        fish = runCycle(fish);
    }
    console.log(fish.length);
});
