import { createReadStream } from "fs";
import { createInterface } from "readline";

const readInterface = createInterface({
    input: createReadStream("data.txt"),
    output: process.stdout,
    terminal: false,
});

let counter = 0;
let [aim, x, y] = [0, 0, 0];

readInterface.on("line", (line) => {
    const [direction, steps] = line.split(" ");
    if (direction === "forward") {
        x += parseInt(steps);
        y += aim * parseInt(steps);
    } else if (direction === "down") {
        aim += parseInt(steps);
    } else if (direction === "up") {
        aim -= parseInt(steps);
    }
    console.log(`x:${x} y:${y} aim:${aim}`);
});

readInterface.on("close", () => {
    console.log(x * y);
});
