import { readFile } from "fs";

function checkWin(table) {
    for (let i = 0; i < 5; i++) {
        if (table.slice(i * 5, i * 5 + 5).every((x) => x === null)) {
            return true;
        }
        if (
            table
                .slice(i)
                .filter((e, i) => i % 5 === 0)
                .every((x) => x === null)
        ) {
            return true;
        }
    }
    return false;
}

function checkTable(table, number) {
    if (!table.includes(number)) {
        return;
    }
    table[table.indexOf(number)] = null;
    return checkWin(table);
}

function scoreTable(table) {
    const score = table.reduce((acc, curr) => {
        return acc + curr;
    });
    return score;
}

readFile("./data.txt", "utf8", (err, data) => {
    const input = data.split("\n\n");
    const draws = input[0].split(",").map((x) => parseInt(x));
    const wonTables = [];
    const tables = input.slice(1).map((x) =>
        x
            .trim()
            .split(/\D+/)
            .map((x) => parseInt(x))
    );

    drawLoop: for (let draw of draws) {
        tableLoop: for (let table of tables) {
            if (!wonTables.includes(table) && checkTable(table, draw)) {
                wonTables.push(table);
                console.log("Won", draw, table, draw * scoreTable(table));
            }
        }
    }
});
