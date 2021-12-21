import { readFile } from "fs";

function readInput(input) {
    const arr = input.split("\n\n");

    return arr;
}

readFile("./data.txt", "utf8", (err, data) => {
    const input = readInput(data);
    console.log(input);
});
