import { readFile } from "fs";

function readInput(input) {
    return input.split("\n");
}

readFile("./data.txt", "utf8", (err, data) => {
    const input = readInput(data);

    console.log(input);
});
