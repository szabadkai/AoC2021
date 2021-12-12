import { readFile } from "fs";

function readInput(input) {
    return input.split("\n").map((x) => x.split("-"));
}

function buildMap(input) {
    let map = {};
    input.forEach((x) => {
        let [start, end] = x;
        if (map[start] === undefined) {
            map[start] = [end];
        } else {
            map[start].push(end);
        }
        if (map[end] === undefined) {
            map[end] = [start];
        } else {
            map[end].push(start);
        }
    });
    return map;
}

function canVisit(node, path) {
    const p = path.split("->");
    if (node.toUpperCase() === node) return true;
    return p.every((x) => x !== node);
}

function visitNodes(map, start, visited) {
    visited.add(start);
    if (start === "end") {
        return 1;
    }
    for (let node of map[start].filter((node) => canVisit(node, visited))) {
    }
}

readFile("./data.txt", "utf8", (err, data) => {
    let input = readInput(data);
    const map = buildMap(input);
    const visited = new Set();
    visited.add("start");
    while (![...visited].every((path) => path.endsWith("end"))) {
        for (let path of visited) {
            if (!path.endsWith("end")) {
                const key = path.split("->").pop();
                for (let node of map[key].filter((node) =>
                    canVisit(node, path)
                )) {
                    visited.add(path + "->" + node);
                }
                visited.delete(path);
            }
        }
    }

    console.log(visited.size);
});
