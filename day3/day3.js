import { createReadStream } from "fs";
import { createInterface } from "readline";

const readInterface = createInterface({
    input: createReadStream("data.txt"),
    output: process.stdout,
    terminal: false,
});

let counter = Array(12).fill(0);
let len = 0;
readInterface.on("line", (line) => {
    for (let i = 0; i < line.length; i++) {
        counter[i] += parseInt(line[i], 2);
    }
    len++;
    console.log(counter);
});

readInterface.on("close", () => {
    const gamma = counter.map((x) => +(x > len / 2));
    const epsilon = parseInt(gamma.map((x) => (x ? 0 : 1)).join(""), 2);
    console.log(parseInt(gamma.join(""), 2), epsilon);

    console.log(parseInt(gamma.join(""), 2) * epsilon);
});
