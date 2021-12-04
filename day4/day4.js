import { readFile } from "fs";

const every_nth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);

function checkWin(table) {
    for (let i = 0; i < 5; i++) {
        if (table.slice(i, i + 5).every((x) => x === 0)) {
            return true;
        }
        if (every_nth(table.slice(i), 5).every((x) => x === 0)) {
            return true;
        }
    }
    return false;
}

function checkTable(table, number) {
    if (!table.includes(number)) {
        return;
    }
    table[table.indexOf(number)] = 0;
    return checkWin(table);
}

function scoreTable(table) {
    const score = table.reduce((acc, curr) => {
        console.log(acc, curr);
        return acc + curr;
    });
    return score;
}

readFile("./data.txt", "utf8", (err, data) => {
    const input = data.split("\n\n");
    const draws = input[0].split(",").map((x) => parseInt(x));
    const tables = input
        .slice(1)
        .map((x) => x.split(/\D+/).map((x) => parseInt(x)));

    drawLoop: for (let draw of draws) {
        console.log(draw);
        tableLoop: for (let table of tables) {
            if (checkTable(table, draw)) {
                console.log("Won", draw * scoreTable(table));
                break drawLoop;
            }
        }
    }
});
