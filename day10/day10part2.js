import { readFile } from "fs";

function readInput(input) {
    return input.split("\n").map((x) => x.split(""));
}

function validateLine(line) {
    const code = { "<": ">", "{": "}", "[": "]", "(": ")" };
    const reverseCode = { ">": "<", "}": "{", "]": "[", ")": "(" };
    const stack = [];
    const score = {
        "(": 1,
        "[": 2,
        "{": 3,
        "<": 4,
    };

    for (let char of line) {
        if (["<", "{", "[", "("].includes(char)) {
            stack.push(char);
        } else {
            const closeThis = stack.pop();
            if (closeThis !== reverseCode[char]) {
                return 0;
            }
        }
    }
    console.log(stack.join(""));
    const points = stack
        .reverse()
        .map((x) => score[x])
        .reduce((a, b) => a * 5 + b, 0);
    return points;
}

readFile("./data.txt", "utf8", (err, data) => {
    const input = readInput(data);
    const score = input
        .map((line) => validateLine(line))
        .filter((x) => x > 0)
        .sort((a, b) => b - a);
    console.log(score[Math.floor(score.length / 2)]);
});
