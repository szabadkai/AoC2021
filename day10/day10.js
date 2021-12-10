import { readFile } from "fs";

function readInput(input) {
    return input.split("\n").map((x) => x.split(""));
}

function validateLine(line) {
    const code = { "<": ">", "{": "}", "[": "]", "(": ")" };
    const reverseCode = { ">": "<", "}": "{", "]": "[", ")": "(" };
    const stack = [];
    const score = {
        ")": 3,
        "]": 57,
        "}": 1197,
        ">": 25137,
    };

    for (let char of line) {
        if (["<", "{", "[", "("].includes(char)) {
            stack.push(char);
        } else {
            const closeThis = stack.pop();
            if (closeThis !== reverseCode[char]) {
                console.log(` No worky ${closeThis} ${char}`);
                return score[char];
            }
        }
    }
    return 0;
}

readFile("./data.txt", "utf8", (err, data) => {
    const input = readInput(data);
    const score = input
        .map((line) => validateLine(line))
        .reduce((a, b) => a + b);
    console.log(score);
});
