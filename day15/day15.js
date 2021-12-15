import { readFile } from "fs";

function cycle(num, max) {
    return num > max ? num % max : num;
}

function convert(row) {
    let newRow = [];
    for (let i = 0; i < 5; i++) {
        newRow = [...newRow, ...row.map((x) => cycle(x + i, 9))];
        console.log(...row.map((x) => cycle(x + i, 9)));
    }
    console.log();

    return newRow;
}

function readInput(input) {
    const basetile = input.split("\n").map((x) => x.split("").map(Number));
    const long_rows = basetile.map((row) => convert(row));
    const new_rows = [];
    [0, 1, 2, 3, 4].forEach((i) => {
        for (let j = 0; j < long_rows.length; j++) {
            new_rows.push(long_rows[j].map((x) => cycle(x + i, 9)));
        }
        console.log(new_rows.length);
    });

    return new_rows;
}

function printGrid(grid) {
    for (let i = 0; i < grid.length; i++) {
        console.log(grid[i].join(""));
    }
}

function getDangerLevel(path, input) {
    return path.reduce((acc, key) => {
        const [x, y] = key.split("-").map(Number);
        return acc + input[y][x];
    }, 0);
}
function getValue(key, input) {
    const [x, y] = key.split("-").map(Number);
    return input[y][x];
}

function findPaths(input) {
    let todos = [["0-0"]];
    const done = [];
    let minLen = Number.MAX_SAFE_INTEGER;
    const dangerLevels = {};
    while (todos.length) {
        console.log(todos.length);
        const newTodos = [];
        for (let todo of todos) {
            for (let dir of [
                [0, 1],
                [1, 0],
                [0, -1],
                [-1, 0],
            ]) {
                let [dx, dy] = dir;
                let [x, y] = todo[todo.length - 1].split("-").map(Number);
                let [nx, ny] = [x + dx, y + dy];
                const key = [nx, ny].join("-");
                if (
                    !todo.includes(key) &&
                    input[ny] &&
                    input[ny][nx] !== undefined
                ) {
                    if (
                        ny === input.length - 1 &&
                        nx === input[input.length - 1].length - 1
                    ) {
                        if (getDangerLevel(todo, input) < minLen) {
                            done.push([...todo, key]);
                            console.log(
                                "found one",
                                todo,
                                getDangerLevel(todo, input)
                            );
                            minLen = getDangerLevel(todo, input);
                        }
                    } else {
                        const dangerLevel = getDangerLevel(
                            [...todo, key],
                            input
                        );
                        if (minLen > dangerLevel) {
                            if (
                                dangerLevels[key] &&
                                dangerLevels[key] <= dangerLevel
                            ) {
                            } else {
                                dangerLevels[key] = dangerLevel;
                                newTodos[key] = [...todo, key];
                            }
                        }
                    }
                }
            }
        }
        todos = Object.keys(newTodos).map((key) => newTodos[key]);
    }

    return done;
}

readFile("./data.txt", "utf8", (err, data) => {
    let input = readInput(data);
    printGrid(input);

    console.log(
        // findPaths(input).map((x) => x.map((y) => getValue(y, input))),
        findPaths(input)
            .map((x) => getDangerLevel(x, input) - input[0][0])
            .sort((a, b) => a - b)
    );
});
