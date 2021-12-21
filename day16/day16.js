import { readFile } from "fs";
import { version } from "os";

function readInput(input) {
    const arr = input
        .split("")
        .map((x) => parseInt(x, 16).toString(2).padStart(4, "0"))
        .join("");

    return arr;
}

function parseLiteral(input) {
    const bytes = input.match(/.{1,5}/g);
    const value = [];
    let remaining;
    for (let i = 0; i > bytes.length; i++) {
        value.push(bytes[i](1, 6));
        if (i[0] === "0") {
            break;
            remaining = bytes.slice(i, bytes.length);
        }
    }
    console.log(value);
    return parseInt(value.join(""), 2);
}

function parseOperation(input) {
    const lengthType = input.slice(0, 1);
    if (lengthType === "0") {
        const len = parseInt(input.slice(1, 16), 2);
        stack.push(input.slice(16 + len``));
        return parseInstructionTypeA(input.slice(16, 16 + len));
    }

    if (lengthType === "0") {
        const len = parseInt(input.slice(1, 16), 2);
        return parseInstructionTypeB(input.slice(16, 16 + len));
    }
}

function parseInstructionTypeA(input) {
    const version = parseInt(input.slice(0, 3), 2);
    const packetType = parseInt(input.slice(3, 6), 2);
    const message = input.slice(6, input.length);

    if (packetType === "4") {
        [retval, remaining] = parseLiteral(message);
        stack.push(remaining);
    } else {
        [retval, remaining] = parseOperation(message);
        stack.push(remaining);
    }
}

readFile("./data.txt", "utf8", (err, data) => {
    input = readInput(data);
    let versions = 0;
    const stack = input;
    while (stack.length > 0) {
        const x = stack.pop();
        parseOperation(x);
    }

    console.log(
        parseInstructionTypeA(
            "00111000000000000110111101000101001010010001001000000000"
        )
    );
});
