import { readFile } from "fs";

function readInput(input) {
    return input.split("\n").map((x) => x.split("").map(Number));
}

const increaseEnergy = (grid) => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] !== "*") grid[i][j] += 1;
        }
    }
};

const detectFlashes = (grid) => {
    let flashes = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] > 9) {
                grid[i][j] = "*";
                flashes += 1;
                incrementAdjacent([i, j], grid);
            }
        }
    }
    return flashes;
};

const incrementAdjacent = ([x, y], grid) => {
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            try {
                if (grid[i][j] === +grid[i][j]) grid[i][j] += 1;
            } catch {
                //pass
            }
        }
    }
};

const sumGrid = (grid) => {
    let acc = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] !== "*") acc += grid[i][j];
        }
    }
    return acc;
};

const resetFlashed = (grid) => {
    return grid.map((x) => x.map((y) => (y === "*" ? 0 : y)));
};

readFile("./data.txt", "utf8", (err, data) => {
    let input = readInput(data);
    let flashes = 0;
    for (let i = 0; i < 100; i++) {
        increaseEnergy(input); // step 1 - increase energy by 1
        let sum = sumGrid(input); // step 2 - sum all cells
        flashes += detectFlashes(input); // step 2 - find flashes
        while (sumGrid(input) !== sum) {
            sum = sumGrid(input);
            flashes += detectFlashes(input); // step 3 - find flashes
        }
        console.log(flashes);

        input = resetFlashed(input); // step 4 - reset flashes
    }
});
