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
    if (node === "start") return false;
    if (node.toUpperCase() === node) return true;
    const p = path.split("->");
    const counter = {};
    for (let n of p) {
        if (counter[n]) counter[n]++;
        else counter[n] = 1;
    }
    const visitedTwice = Object.keys(counter).filter(
        (n) => n === n.toLowerCase() && counter[n] > 1
    );
    return counter[node] === undefined || !visitedTwice.length;
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
