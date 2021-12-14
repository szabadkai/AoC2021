import { readFile } from "fs";

function readInput(input) {
    const [template, pairs] = input.split("\n\n");
    const cookbook = {};
    pairs
        .split("\n")
        .map((x) => x.split(" -> "))
        .forEach(([pattern, insert]) => {
            cookbook[pattern] = insert;
        });
    const start = {};
    for (let i = 0; i < template.length - 1; i++) {
        const key = template.slice(i, i + 2);
        if (start[key] === undefined) {
            start[key] = 1;
        } else {
            start[key]++;
        }
    }
    return [cookbook, start, template[template.length - 1]];
}

function grow(template, cookbook) {
    const molecule = {};
    for (let [pair, count] of Object.entries(template)) {
        const [first, second] = pair.split("");

        for (let item of [first + cookbook[pair], cookbook[pair] + second]) {
            if (molecule[item] === undefined) {
                molecule[item] = count;
            } else {
                molecule[item] += count;
            }
        }
    }
    return molecule;
}

readFile("./data.txt", "utf8", (err, data) => {
    let [pairs, template] = readInput(data);
    for (let i = 0; i < 40; i++) {
        template = grow(template, pairs);
        const counter = { K: 1, B: 1 };
        for (let [key, value] of Object.entries(template)) {
            for (let char of key.split("")) {
                if (counter[char] === undefined) {
                    counter[char] = value;
                } else {
                    counter[char] += value;
                }
            }
        }

        console.log(
            i,
            template,
            counter,
            Math.max(...Object.values(counter)) / 2 -
                Math.min(...Object.values(counter)) / 2
        );
    }
});
