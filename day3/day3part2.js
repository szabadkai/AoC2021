import { createReadStream } from "fs";
import { get } from "http";
import { createInterface } from "readline";

const readInterface = createInterface({
    input: createReadStream("data.txt"),
    output: process.stdout,
    terminal: false,
});
let input = [];
let counter = Array(12).fill(0);
let len = 0;

readInterface.on("line", (line) => {
    input.push(line);
    for (let i = 0; i < line.length; i++) {
        counter[i] += parseInt(line[i], 2);
    }
    len++;
});

function getGamma(input) {
    const counter = Array(12).fill(0);
    input.forEach((item) => {
        for (let i = 0; i < item.length; i++) {
            counter[i] += parseInt(item[i], 2);
        }
    });
    return counter.map((x) => +(x >= input.length - x)).join("");
}
function getEpsilon(input) {
    const counter = Array(input[0].length).fill(0);
    input.forEach((item) => {
        for (let i = 0; i < item.length; i++) {
            counter[i] += parseInt(item[i], 2);
        }
    });
    console.log(
        input,
        counter,
        counter.map((x) => +(x <= input.length - x)).join("")
    );
    return counter.map((x) => +(x < input.length - x)).join("");
}

function filterO(input) {
    let _gamma = getGamma(input);
    let oxygen = input;
    for (let i = 0; i < input[0].length; i++) {
        oxygen = oxygen.filter((item) => item[i] === _gamma[i]);
        if (oxygen.length === 1) {
            console.log("found it ", oxygen, _gamma);
            return oxygen[0];
        } else {
            _gamma = getGamma(oxygen);
        }
    }
}

function filterCO(input) {
    let _gamma = getEpsilon(input);
    let oxygen = input;
    for (let i = 0; i < input[0].length; i++) {
        console.log(oxygen, _gamma);
        oxygen = oxygen.filter((item) => item[i] === _gamma[i]);
        if (oxygen.length === 1) {
            console.log("found it ", oxygen, _gamma);
            return oxygen[0];
        } else {
            _gamma = getEpsilon(oxygen);
        }
    }
}

readInterface.on("close", () => {
    const gamma = counter.map((x) => +(x >= len / 2));
    const epsilon = gamma.map((x) => (x ? 0 : 1)).join("");

    const oxygen = filterO(input);
    const co = filterCO(input);
    console.log(parseInt(oxygen, 2) * parseInt(co, 2));
});
