import { readFile } from "fs";

function readInput(input) {
    return input.split("\n").map((x) => x.split(" | "));
}

const code = {};

function decode(line) {
    const code = {};

    for (let word of line.split(" ")) {
        word = word.split("").sort().join("");
        switch (word.length) {
            case 2:
                code[1] = word;
                break;
            case 3:
                code[7] = word;
                break;

            case 4:
                code[4] = word;
                break;

            case 7:
                code[8] = word;
                break;

            case 5: // 2|5|3
            case 6: // 9|6|0
        }
    }
    for (let word of line.split(" ")) {
        word = word.split("").sort().join("");

        switch (word.length) {
            case 6: // 9|6|0
                if (code[4].split("").every((x) => word.includes(x))) {
                    code[9] = word;
                } else {
                    if (
                        word.includes(code[1][1]) &&
                        word.includes(code[1][0])
                    ) {
                        code[0] = word;
                    } else {
                        code[6] = word;
                    }
                }

                break;

            case 5: // 2|5|3
                if (word.includes(code[1][1]) && word.includes(code[1][0])) {
                    code[3] = word;
                } else {
                    const five = code[4]
                        .split("")
                        .filter((x) => !code[1].includes(x));
                    if (five.every((x) => word.includes(x))) {
                        code[5] = word;
                    } else {
                        code[2] = word;
                    }
                }
        }
    }
    const flipped = {};
    for (let key in code) {
        flipped[code[key]] = key;
    }
    return flipped;
}

function translate(word, code) {
    const key = word.split("").sort().join("");
    return code[key];
}

readFile("./data.txt", "utf8", (err, data) => {
    const input = readInput(data);
    let acc = 0;
    for (let line of input) {
        const code = decode(line[0]);

        acc =
            acc +
            parseInt(
                line[1]
                    .split(" ")
                    .map((word) => translate(word, code))
                    .join("")
            );
    }
    console.log(acc);
});
