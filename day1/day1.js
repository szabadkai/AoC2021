import { createReadStream } from "fs";
import { createInterface } from "readline";

const readInterface = createInterface({
    input: createReadStream("data.dat"),
    output: process.stdout,
    terminal: false,
});

let before = null;
let counter = 0;

readInterface.on("line", (line) => {
    if (before !== null && before < parseInt(line)) {
        counter++;
    }
    before = parseInt(line);
});

readInterface.on("close", () => {
    console.log(counter);
});
