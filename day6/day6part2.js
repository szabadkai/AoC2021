import { readFile } from "fs";

const cycle = { 8: 7, 7: 6, 6: 5, 5: 4, 4: 3, 3: 2, 2: 1, 1: 0, 0: 6 };

function readInput(input) {
    const sizes = { 8: 0, 7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: 0 };
    const tmp = input.split(",").map((x) => parseInt(x, 10));
    for (let i = 0; i < tmp.length; i++) {
        sizes[tmp[i]]++;
    }
    return sizes;
}

function runCycle(fish) {
    const newFish = { 8: 0, 7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: 0 };

    for (let i = 0; i <= 8; i++) {
        newFish[cycle[i]] = newFish[cycle[i]] + fish[i];
    }
    if (fish[0] > 0) {
        newFish[8] = fish[0];
        console.log(`Fish are being born ${fish[0]}`);
    }

    return newFish;
}

readFile("./data.txt", "utf8", (err, data) => {
    let fish = readInput(data);
    for (let i = 0; i < 256; i++) {
        console.log(fish);
        fish = runCycle(fish);
    }
    console.log(Object.values(fish).reduce((a, b) => a + b));
});
