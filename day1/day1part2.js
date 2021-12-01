import { createReadStream } from "fs";
import { createInterface } from "readline";

const readInterface = createInterface({
    input: createReadStream("data.dat"),
    output: process.stdout,
    terminal: false,
});

let [a, b, c] = Array(3).fill(null);
let counter = 0;

readInterface.on("line", (line) => {
    if (a && b && c) {
        if (a + b + c < b + c + parseInt(line)) {
            counter++;
        }
    }
    [a, b, c] = [b, c, parseInt(line)];
});

readInterface.on("close", () => {
    console.log(counter);
});
