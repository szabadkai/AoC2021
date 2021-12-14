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
    return [cookbook, template];
}

function grow(template, cookbook) {
    const molecule = [];
    for (let i = 0; i < template.length; i++) {
        molecule.push(template[i]);
        molecule.push(cookbook[template.slice(i, i + 2)]);
    }
    return molecule.join("");
}

readFile("./data.txt", "utf8", (err, data) => {
    let [pairs, template] = readInput(data);
    console.log(template, pairs);
    for (let i = 0; i < 10; i++) {
        template = grow(template, pairs);
        console.log(i, template.length);
    }

    const counter = {};
    for (let i = 0; i < template.length; i++) {
        let key = template[i];
        if (counter.hasOwnProperty(key)) {
            counter[key]++;
        } else {
            counter[key] = 1;
        }
    }
    console.log(counter);
    console.log(
        Math.max(Object.values(counter)) - Math.min(Object.values(counter))
    );
});
