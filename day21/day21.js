import { readFile } from "fs";

function readInput(input) {
    return input.split("\n");
}

function* rollDDice() {
    let i = -1;
    while (true) {
        yield [(++i % 100) + 1, (++i % 100) + 1, (++i % 100) + 1];
    }
}

readFile("./data.txt", "utf8", (err, data) => {
    const input = readInput(data);
    let first = 0;
    let firstPosition = 10;
    let second = 0;
    let secondPosition = 9;
    let rolls = 0;
    for (let i of rollDDice()) {
        rolls = rolls + 3;
        const add = i.reduce((a, b) => a + b);
        console.log(first, second, rolls);

        if (i[0] % 2 === 0) {
            secondPosition = ((secondPosition + add - 1) % 10) + 1;
            second = second + secondPosition;
        } else {
            firstPosition = ((firstPosition + add - 1) % 10) + 1;
            first = first + firstPosition;
        }
        if (first >= 1000 || second >= 1000) {
            break;
        }
    }
    console.log(first, second, rolls, second * rolls);
});
