import { createReadStream } from "fs";
import { createInterface } from "readline";

const readInterface = createInterface({
    input: createReadStream("data.txt"),
    output: process.stdout,
    terminal: false,
});

let counter = 0;
let [x, y] = [0, 0];

readInterface.on("line", (line) => {
    const [direction, steps] = line.split(" ");
    if (direction === "forward") {
        x += parseInt(steps);
    } else if (direction === "down") {
        y += parseInt(steps);
    } else if (direction === "up") {
        y -= parseInt(steps);
    }
});

readInterface.on("close", () => {
    console.log(x * y);
});
