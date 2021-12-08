import { readFile } from "fs";

function readInput(input) {
    return input.split("\n").map((x) => x.split(" | ")[1]);
}

readFile("./data.txt", "utf8", (err, data) => {
    const uniqueNumbers = [2, 3, 4, 7];
    const input = readInput(data);
    console.log(input);
    let acc = 0;
    for (let i = 0; i < input.length; i++) {
        for (let segment of input[i].split(" ")) {
            console.log(segment);
            if (uniqueNumbers.includes(segment.length)) {
                acc++;
            }
        }
    }
    console.log(acc);
});
