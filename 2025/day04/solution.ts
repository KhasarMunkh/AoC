import fs from "fs";

const path = "input";

function getInput(path: string) {
    const data = fs.readFileSync(path, "utf8");
    const input = data
        .trim()
        .split("\n")
        .map((line) => line.split(""));
    return input;
}

function part1() {
    const data = getInput(path);
    const cols = data[0]!.length;
    const rows = data.length;

    const diagram = makeDiagram(rows, cols);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (data[i]![j] === "@") {
                diagram[i]![j] = 1;
            }
        }
    }

    let rollsCount = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (diagram[i]![j] !== 1) {
                continue;
            }
            let sum = findAdjacentSum(diagram, i, j);
            if (sum < 4) {
                rollsCount++;
            }
        }
    }
    console.log(rollsCount);
}

function part2() {
    const data = getInput(path);
    const cols = data[0]!.length;
    const rows = data.length;

    const diagram = makeDiagram(rows, cols);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (data[i]![j] === "@") {
                diagram[i]![j] = 1;
            }
        }
    }

    let removed = 0;
    let flag = true;
    while (flag) {
        let x = remove(diagram);
        if (x === 0) {
            flag = false;
        }
        removed += x;
    }
    console.log(removed);
}

function remove(diagram: number[][]) {
    const cols = diagram[0]!.length;
    const rows = diagram.length;
    let rollsCount = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (diagram[i]![j] !== 1) {
                continue;
            }
            let sum = findAdjacentSum(diagram, i, j);
            if (sum < 4) {
                rollsCount++;
                diagram[i]![j] = 0;
            }
        }
    }
    return rollsCount;
}

function makeDiagram(rows: number, cols: number, fill = 0) {
    return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => fill),
    );
}

function findAdjacentSum(diagram: number[][], i: number, j: number): number {
    let rows = diagram.length;
    let cols = diagram[0]!.length;
    let sum = 0;
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            if (i + x < 0 || j + y < 0 || i + x >= rows || j + y >= cols) {
                continue;
            }
            if (x === 0 && y === 0) {
                continue;
            }
            sum += diagram[i + x]![j + y]!;
        }
    }
    return sum;
}

part1();
part2();
